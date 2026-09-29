import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDocs, collection, query, orderBy, limit as firestoreLimit, serverTimestamp } from "firebase/firestore";
import fs from "fs";
import path from "path";

const LOCAL_FALLBACK_FILE = path.join(process.cwd(), "data", "localCookieConsent.json");

// Helper to read local fallback sessions
function readLocalConsentStore() {
  try {
    if (!fs.existsSync(LOCAL_FALLBACK_FILE)) {
      return {};
    }
    const raw = fs.readFileSync(LOCAL_FALLBACK_FILE, "utf-8");
    return JSON.parse(raw || "{}");
  } catch (e) {
    return {};
  }
}

// Helper to save to local fallback store
function saveLocalConsentStore(store) {
  try {
    const dir = path.dirname(LOCAL_FALLBACK_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOCAL_FALLBACK_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (e) {
    console.warn("Failed to write to localCookieConsent.json:", e.message);
  }
}

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ success: false, error: "Invalid JSON payload" }, { status: 400 });
    }

    const {
      sessionId = "",
      visitorId = "",
      consent = {},
      traffic = {},
      deviceBrowser = {},
      clientLocation = {},
      sessionInfo = {},
      eventType = "update",
    } = body;

    if (!sessionId) {
      return NextResponse.json({ success: false, error: "sessionId is required" }, { status: 400 });
    }

    // 1. Resolve Server-Side Approximate Geolocation from Headers (Vercel / Cloudflare / Forwarded)
    const headers = request.headers;
    const vercelCountry = headers.get("x-vercel-ip-country");
    const vercelRegion = headers.get("x-vercel-ip-country-region");
    const vercelCity = headers.get("x-vercel-ip-city");
    const cfCountry = headers.get("cf-ipcountry");
    const cfCity = headers.get("cf-ipcity");
    const forwardedFor = headers.get("x-forwarded-for") || headers.get("x-real-ip") || "";

    const isLocalhost =
      forwardedFor.includes("127.0.0.1") ||
      forwardedFor.includes("::1") ||
      !forwardedFor ||
      process.env.NODE_ENV !== "production";

    // Country resolution
    const country = vercelCountry || cfCountry || (isLocalhost ? "United States (Dev)" : "United States");
    // State/Region resolution (Blessed Hearts is PA based)
    const region = vercelRegion || (clientLocation?.timezone?.includes("New_York") ? "Pennsylvania (PA)" : "Eastern US");
    // City resolution
    const city = vercelCity || cfCity || (isLocalhost ? "York / South Central PA" : "Approximate Region");

    const approximateLocation = {
      country,
      region,
      city,
      timezone: clientLocation?.timezone || "America/New_York",
      locale: clientLocation?.locale || "en-US",
      timezoneOffset: clientLocation?.timezoneOffset || 0,
      isLocalhost,
    };

    // 2. Structured Telemetry Document for Collection: BHH-cookie-consent
    const documentId = `session_${sessionId}`;

    const consentData = {
      status: consent.status || "pending",
      categories: {
        necessary: true,
        analytics: consent.categories?.analytics ?? true,
        functional: consent.categories?.functional ?? true,
        marketing: consent.categories?.marketing ?? false,
      },
      doNotSellOptOut: Boolean(consent.doNotSellOptOut),
      gpcHonored: Boolean(consent.gpcHonored),
      timestamp: consent.timestamp || new Date().toISOString(),
      jurisdiction: "USA (CCPA/CPRA Compliant)",
    };

    const telemetryRecord = {
      id: documentId,
      brand: "BHH",
      organization: "Blessed Hearts Homecare",
      collection: "BHH-cookie-consent",
      sessionId,
      visitorId,
      consent: consentData,
      traffic: {
        pagesVisited: Array.isArray(traffic.pagesVisited) ? traffic.pagesVisited.slice(-30) : [],
        pageCount: traffic.pageCount || (traffic.pagesVisited?.length || 1),
        lastVisitedPage: traffic.lastVisitedPage || "/",
        clicks: Array.isArray(traffic.clicks) ? traffic.clicks.slice(-30) : [],
        clickCount: traffic.clickCount || (traffic.clicks?.length || 0),
        referralSource: traffic.referralSource || { referrer: "Direct / Bookmark", domain: "Direct" },
      },
      deviceBrowser: {
        browser: deviceBrowser.browser || "Unknown",
        os: deviceBrowser.os || "Unknown",
        deviceType: deviceBrowser.deviceType || "Desktop",
        screenResolution: deviceBrowser.screenResolution || "N/A",
        viewport: deviceBrowser.viewport || "N/A",
        language: deviceBrowser.language || "en-US",
        colorScheme: deviceBrowser.colorScheme || "light",
      },
      approximateLocation,
      sessionInfo: {
        startTime: sessionInfo.startTime || new Date().toISOString(),
        lastActiveTime: sessionInfo.lastActiveTime || new Date().toISOString(),
        durationSeconds: sessionInfo.durationSeconds || 0,
        lastEventType: eventType,
      },
      updatedAt: new Date().toISOString(),
    };

    // 3. Mirror to local persistent store so data is NEVER lost
    try {
      const localStore = readLocalConsentStore();
      localStore[documentId] = {
        ...telemetryRecord,
        localSavedAt: new Date().toISOString(),
      };
      saveLocalConsentStore(localStore);
    } catch (localErr) {
      console.warn("Local storage mirror warning:", localErr.message);
    }

    // 4. Store into Firebase Firestore: BHH-cookie-consent
    let firestoreSaved = false;
    if (db) {
      try {
        const docRef = doc(db, "BHH-cookie-consent", documentId);
        await setDoc(
          docRef,
          {
            ...telemetryRecord,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
        firestoreSaved = true;
      } catch (fbError) {
        if (fbError.code === "permission-denied") {
          console.warn("[BHH Cookie Consent] Firestore permission note for BHH-cookie-consent (data preserved in local store)");
        } else {
          console.error("Error storing to BHH-cookie-consent collection:", fbError.message || fbError);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Telemetry and cookie consent recorded.",
      sessionId,
      firestoreSaved,
      collection: "BHH-cookie-consent",
    });
  } catch (error) {
    console.error("Unexpected error in /api/cookie-consent:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

// GET endpoint to retrieve recent consent & traffic sessions (for Admin panel)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const maxLimit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 100);

    let records = [];

    // 1. Try Firebase Firestore: BHH-cookie-consent
    if (db) {
      try {
        const consentCollection = collection(db, "BHH-cookie-consent");
        const q = query(consentCollection, orderBy("updatedAt", "desc"), firestoreLimit(maxLimit));
        const snapshot = await getDocs(q);

        snapshot.forEach((d) => {
          const data = d.data();
          records.push({
            id: d.id,
            ...data,
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt || null,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt || null,
          });
        });
      } catch (fbErr) {
        // Fallback to non-ordered fetch if index missing
        try {
          const snapshot = await getDocs(collection(db, "BHH-cookie-consent"));
          snapshot.forEach((d) => {
            records.push({ id: d.id, ...d.data() });
          });
        } catch (permErr) {
          // Fall through to local store
        }
      }
    }

    // 2. Fallback to local store if Firestore is empty or restricted by rules
    if (records.length === 0) {
      const localStore = readLocalConsentStore();
      records = Object.values(localStore).sort((a, b) => {
        return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
      });
      records = records.slice(0, maxLimit);
    }

    return NextResponse.json({
      success: true,
      count: records.length,
      collection: "BHH-cookie-consent",
      records,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
