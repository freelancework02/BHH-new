/**
 * Blessed Hearts Homecare - Privacy & Traffic Telemetry Engine
 * 
 * Collects traffic insights in compliance with U.S. State Privacy Laws (CCPA/CPRA, VCDPA, etc.):
 * - Pages visited (path, title, navigation timeline)
 * - User interactions & key clicks (CTAs, phone numbers, contact forms, navigation)
 * - Device & browser attributes (screen, viewport, OS, browser, language)
 * - Approximate location (timezone, locale, region signals)
 * - Referral source & UTM attribution (campaign, medium, source)
 * - Session metrics (duration, active timestamps, unique anonymous session ID)
 * 
 * Stores data into Firebase collection: "BHH-cookie-consent" via /api/cookie-consent
 */

const SESSION_KEY = "bhh_telemetry_session_id";
const VISITOR_KEY = "bhh_telemetry_visitor_id";
const CONSENT_KEY = "bhh_cookie_consent_v1";

// Helper to generate anonymous unique identifiers
function generateUUID(prefix = "bhh") {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 9);
  return `${prefix}_${ts}_${rand}`;
}

// Get or initialize persistent visitor ID
export function getVisitorId() {
  if (typeof window === "undefined") return "";
  try {
    let vid = localStorage.getItem(VISITOR_KEY);
    if (!vid) {
      vid = generateUUID("vis");
      localStorage.setItem(VISITOR_KEY, vid);
    }
    return vid;
  } catch (e) {
    return generateUUID("vis_temp");
  }
}

// Get or initialize tab/session ID
export function getSessionId() {
  if (typeof window === "undefined") return "";
  try {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = generateUUID("sess");
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  } catch (e) {
    return generateUUID("sess_temp");
  }
}

// Retrieve stored consent preferences
export function getSavedConsent() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

// Save consent preferences to local storage
export function saveConsent(preferences) {
  if (typeof window === "undefined") return;
  try {
    const data = {
      status: preferences.status || "customized", // 'accepted' | 'declined' | 'customized'
      categories: {
        necessary: true,
        analytics: Boolean(preferences.categories?.analytics),
        functional: Boolean(preferences.categories?.functional),
        marketing: Boolean(preferences.categories?.marketing),
      },
      doNotSellOptOut: Boolean(preferences.doNotSellOptOut),
      timestamp: new Date().toISOString(),
      jurisdiction: "USA (CCPA/CPRA Compliant)",
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
    return data;
  } catch (e) {
    console.warn("Could not save consent to localStorage:", e);
    return null;
  }
}

// Detect Device, Browser & Operating System
export function getDeviceAndBrowserInfo() {
  if (typeof window === "undefined") {
    return {
      browser: "Unknown",
      os: "Unknown",
      deviceType: "Desktop",
      screenResolution: "N/A",
      viewport: "N/A",
      language: "en-US",
      userAgent: "",
    };
  }

  const ua = navigator.userAgent || "";
  let browser = "Unknown";
  let os = "Unknown";
  let deviceType = "Desktop";

  // Browser detection
  if (/Edg\//i.test(ua)) browser = "Microsoft Edge";
  else if (/Chrome\//i.test(ua) && !/Chromium\//i.test(ua)) browser = "Google Chrome";
  else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) browser = "Safari";
  else if (/Firefox\//i.test(ua)) browser = "Mozilla Firefox";
  else if (/MSIE|Trident/i.test(ua)) browser = "Internet Explorer";
  else if (/Opera|OPR\//i.test(ua)) browser = "Opera";

  // OS detection
  if (/Windows NT/i.test(ua)) os = "Windows";
  else if (/Macintosh|Mac OS X/i.test(ua)) os = "macOS";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/Linux/i.test(ua)) os = "Linux";
  else if (/CrOS/i.test(ua)) os = "ChromeOS";

  // Device type
  const width = window.innerWidth;
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (/Mobile|Android|iPhone/i.test(ua) || (isTouch && width < 768)) {
    deviceType = "Mobile";
  } else if (/iPad|Tablet/i.test(ua) || (isTouch && width >= 768 && width <= 1024)) {
    deviceType = "Tablet";
  } else {
    deviceType = "Desktop";
  }

  return {
    browser,
    os,
    deviceType,
    screenResolution: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    language: navigator.language || "en-US",
    colorScheme: window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    userAgent: ua.slice(0, 200),
  };
}

// Extract Referral Source & UTM Marketing Parameters
export function getReferralSource() {
  if (typeof window === "undefined") {
    return { referrer: "Direct / Bookmark", domain: "Direct", utm: {}, landingPage: "/" };
  }

  let referrer = document.referrer || "Direct / Bookmark";
  let domain = "Direct";

  try {
    if (referrer && referrer !== "Direct / Bookmark") {
      const parsed = new URL(referrer);
      domain = parsed.hostname;
    }
  } catch (e) {
    domain = "Unknown";
  }

  const searchParams = new URLSearchParams(window.location.search);
  const utm = {
    source: searchParams.get("utm_source") || "",
    medium: searchParams.get("utm_medium") || "",
    campaign: searchParams.get("utm_campaign") || "",
    term: searchParams.get("utm_term") || "",
    content: searchParams.get("utm_content") || "",
  };

  return {
    referrer,
    domain,
    utm,
    landingPage: window.location.pathname + window.location.search,
  };
}

// Extract Approximate Location Signals
export function getClientLocationSignals() {
  if (typeof window === "undefined") {
    return { timezone: "America/New_York", timezoneOffset: 0, locale: "en-US" };
  }

  let timezone = "America/New_York";
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York";
  } catch (e) {}

  return {
    timezone,
    timezoneOffset: new Date().getTimezoneOffset(),
    locale: navigator.language || "en-US",
  };
}

// In-memory session telemetry state
let sessionState = {
  initialized: false,
  startTime: null,
  pagesVisited: [],
  clicks: [],
  clickQueue: [],
  sendTimeout: null,
  doNotSellOptOut: false,
  gpcDetected: false,
};

// Main Telemetry Tracker Class
class TelemetryManager {
  constructor() {
    this.sessionId = "";
    this.visitorId = "";
    this.consent = null;
  }

  init() {
    if (typeof window === "undefined" || sessionState.initialized) return;
    sessionState.initialized = true;

    this.sessionId = getSessionId();
    this.visitorId = getVisitorId();
    this.consent = getSavedConsent();

    sessionState.startTime = new Date().toISOString();

    // Check Global Privacy Control (GPC) - US State Privacy Requirement
    if (typeof navigator !== "undefined" && navigator.globalPrivacyControl === true) {
      sessionState.gpcDetected = true;
      sessionState.doNotSellOptOut = true;
    }

    // Record initial landing page
    this.recordPageView(window.location.pathname, document.title);

    // Set up global click listener for interactions
    this.setupClickListener();

    // Set up beforeunload beacon to sync final session duration
    this.setupUnloadBeacon();

    // Initial sync to Firebase collection BHH-cookie-consent
    this.syncToFirebase("session_start");
  }

  // Record a page view (handles Next.js client-side navigation)
  recordPageView(path, title) {
    if (!path) return;
    const now = new Date().toISOString();

    // Prevent immediate duplicate entries for same route
    const lastPage = sessionState.pagesVisited[sessionState.pagesVisited.length - 1];
    if (lastPage && lastPage.path === path) {
      lastPage.timestamp = now;
      lastPage.title = title || lastPage.title;
      return;
    }

    sessionState.pagesVisited.push({
      path,
      title: title || document.title || "Blessed Hearts Homecare",
      timestamp: now,
    });

    // Cap history at 30 items per session
    if (sessionState.pagesVisited.length > 30) {
      sessionState.pagesVisited = sessionState.pagesVisited.slice(-30);
    }

    // Trigger sync
    this.debouncedSync();
  }

  // Setup click tracker for buttons, links, and interactions
  setupClickListener() {
    if (typeof window === "undefined") return;

    window.addEventListener(
      "click",
      (e) => {
        try {
          const target = e.target;
          if (!target) return;

          // Find closest interactive element
          const interactive = target.closest("a, button, [role='button'], input[type='submit']");
          if (!interactive) return;

          const text = (interactive.innerText || interactive.getAttribute("aria-label") || interactive.value || "").trim().slice(0, 60);
          const href = interactive.getAttribute("href") || "";
          const id = interactive.id || "";
          const tag = interactive.tagName;

          // Don't track clicks inside password inputs or sensitive fields
          if (interactive.type === "password") return;

          sessionState.clicks.push({
            tag,
            text: text || "[Icon/Element]",
            href: href.slice(0, 100),
            id: id.slice(0, 50),
            path: window.location.pathname,
            timestamp: new Date().toISOString(),
          });

          // Cap recent clicks at 30 items
          if (sessionState.clicks.length > 30) {
            sessionState.clicks = sessionState.clicks.slice(-30);
          }

          this.debouncedSync();
        } catch (err) {
          // Silent fallback
        }
      },
      { passive: true }
    );
  }

  // Debounced sync to avoid excessive network requests
  debouncedSync(delay = 3000) {
    if (sessionState.sendTimeout) {
      clearTimeout(sessionState.sendTimeout);
    }
    sessionState.sendTimeout = setTimeout(() => {
      this.syncToFirebase("telemetry_update");
    }, delay);
  }

  // Setup beacon on page unload
  setupUnloadBeacon() {
    if (typeof window === "undefined") return;

    const sendFinalBeacon = () => {
      const payload = this.buildPayload("session_end");
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
        navigator.sendBeacon("/api/cookie-consent", blob);
      }
    };

    window.addEventListener("pagehide", sendFinalBeacon, { passive: true });
    window.addEventListener("beforeunload", sendFinalBeacon, { passive: true });
  }

  // Update consent status and immediately sync
  updateConsent(preferences) {
    this.consent = saveConsent(preferences);
    this.syncToFirebase("consent_updated");
  }

  // Construct structured telemetry payload
  buildPayload(eventType = "heartbeat") {
    const savedConsent = this.consent || getSavedConsent() || {
      status: "pending",
      categories: { necessary: true, analytics: true, functional: true, marketing: false },
      doNotSellOptOut: sessionState.doNotSellOptOut,
      timestamp: new Date().toISOString(),
      jurisdiction: "USA (CCPA/CPRA Compliant)",
    };

    const deviceBrowser = getDeviceAndBrowserInfo();
    const referralSource = getReferralSource();
    const clientLocation = getClientLocationSignals();

    const now = Date.now();
    const startMs = sessionState.startTime ? new Date(sessionState.startTime).getTime() : now;
    const durationSeconds = Math.max(0, Math.floor((now - startMs) / 1000));

    return {
      eventType,
      sessionId: this.sessionId || getSessionId(),
      visitorId: this.visitorId || getVisitorId(),
      consent: {
        status: savedConsent.status,
        categories: savedConsent.categories,
        doNotSellOptOut: Boolean(savedConsent.doNotSellOptOut || sessionState.doNotSellOptOut),
        gpcHonored: Boolean(sessionState.gpcDetected),
        timestamp: savedConsent.timestamp,
        jurisdiction: "USA (CCPA/CPRA Compliant)",
      },
      traffic: {
        pagesVisited: sessionState.pagesVisited,
        pageCount: sessionState.pagesVisited.length,
        lastVisitedPage: window.location.pathname,
        clicks: sessionState.clicks,
        clickCount: sessionState.clicks.length,
        referralSource,
      },
      deviceBrowser,
      clientLocation,
      sessionInfo: {
        startTime: sessionState.startTime || new Date().toISOString(),
        lastActiveTime: new Date().toISOString(),
        durationSeconds,
      },
    };
  }

  // Dispatch network request to /api/cookie-consent
  async syncToFirebase(eventType = "heartbeat") {
    if (typeof window === "undefined") return;

    try {
      const payload = this.buildPayload(eventType);
      await fetch("/api/cookie-consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });
    } catch (err) {
      // Non-blocking telemetry sync error
    }
  }
}

export const telemetry = new TelemetryManager();
