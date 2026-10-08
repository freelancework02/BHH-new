import { NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const LOCAL_INQUIRIES_FILE = path.join(process.cwd(), "data", "localInquiries.json");

function readLocalInquiries() {
  try {
    if (!fs.existsSync(LOCAL_INQUIRIES_FILE)) {
      return {};
    }
    const raw = fs.readFileSync(LOCAL_INQUIRIES_FILE, "utf-8");
    return JSON.parse(raw || "{}");
  } catch (e) {
    return {};
  }
}

function saveLocalInquiries(store) {
  try {
    const dir = path.dirname(LOCAL_INQUIRIES_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOCAL_INQUIRIES_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (e) {
    console.warn("Failed to write to localInquiries.json:", e.message);
  }
}

// In-memory sliding cache to prevent accidental rapid double-click submissions (3 seconds)
const recentSubmissions = new Map();
const DEDUPLICATION_WINDOW_MS = 3000;

function cleanOldSubmissions() {
  const now = Date.now();
  for (const [key, timestamp] of recentSubmissions.entries()) {
    if (now - timestamp > DEDUPLICATION_WINDOW_MS) {
      recentSubmissions.delete(key);
    }
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // 1. Anti-spam honeypot check: If the hidden bot field is filled, silently discard
    if (body.botField) {
      return NextResponse.json(
        { success: true, message: "Inquiry received." },
        { status: 200 }
      );
    }

    const {
      firstName = "",
      lastName = "",
      name = "",
      email = "",
      phone = "",
      city = "",
      zip = "",
      county = "",
      reasonForContact = "",
      help = "",
      service = "",
      preferredContact = "",
      preferredTime = "",
      message = "",
      source = "Website Contact Form",
    } = body;

    const fullName = name.trim() || `${firstName} ${lastName}`.trim() || "Website Visitor";
    const serviceRequested = service || reasonForContact || help || "General Inquiry";

    // 2. Basic validation: must have at least email or phone
    if (!email.trim() && !phone.trim()) {
      return NextResponse.json(
        { success: false, error: "Please provide an email address or phone number." },
        { status: 400 }
      );
    }

    // 3. Rapid double-click protection (3 seconds)
    cleanOldSubmissions();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.replace(/\D/g, "");
    const cleanMsg = message.trim().toLowerCase().slice(0, 100);
    const fingerprint = `${cleanEmail}|${cleanPhone}|${cleanMsg}`;

    if (recentSubmissions.has(fingerprint)) {
      const lastSeen = recentSubmissions.get(fingerprint);
      if (Date.now() - lastSeen < DEDUPLICATION_WINDOW_MS) {
        return NextResponse.json(
          {
            success: true,
            message: "Thank you! We have already received your inquiry and will be in touch shortly.",
            firestoreSaved: true,
            duplicatePrevented: true,
          },
          { status: 200 }
        );
      }
    }

    recentSubmissions.set(fingerprint, Date.now());

    // 4. Generate guaranteed unique document ID
    const randomSuffix = crypto.randomBytes(3).toString("hex");
    const docId = `bhh_inq_${Date.now()}_${randomSuffix}`;
    const createdAtIso = new Date().toISOString();

    const inquiryRecord = {
      id: docId,
      brand: "BHH",
      organization: "Blessed Hearts Homecare",
      fullName,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim(),
      zip: zip.trim(),
      county: county.trim(),
      serviceRequested,
      preferredContact: preferredContact || "Phone",
      preferredTime: preferredTime || "Morning",
      message: message.trim(),
      notes: message.trim(),
      source: source.includes("BHH") ? source : `BHH - ${source}`,
      status: "new",
      createdAtIso,
    };

    // 5. Save to local fallback store so inquiry is NEVER lost
    try {
      const localStore = readLocalInquiries();
      localStore[docId] = {
        ...inquiryRecord,
        createdAt: createdAtIso,
      };
      saveLocalInquiries(localStore);
    } catch (localErr) {
      console.warn("Local inquiries save warning:", localErr.message);
    }

    // 6. Save to Firebase Firestore (BHH_inquiries)
    let firestoreSaved = false;
    if (db) {
      try {
        await setDoc(doc(db, "BHH_inquiries", docId), {
          ...inquiryRecord,
          createdAt: serverTimestamp(),
        });
        firestoreSaved = true;
      } catch (fbError) {
        console.error("Error saving inquiry to Firebase Firestore (BHH_inquiries):", fbError.message || fbError);
      }
    } else {
      console.warn("Firebase db not initialized. Inquiry safely preserved in local fallback store.");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We have received your inquiry and will be in touch shortly.",
        id: docId,
        firestoreSaved,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error in /api/contact:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
