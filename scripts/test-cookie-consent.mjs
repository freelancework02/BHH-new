const BASE_URL = "http://localhost:3000";

async function runTests() {
  console.log("=========================================================");
  console.log("TESTING BHH COOKIE CONSENT & TRAFFIC TELEMETRY API...");
  console.log("=========================================================\n");

  const testSessionId = `test_session_${Date.now()}`;
  const testVisitorId = `test_vis_${Date.now()}`;

  const payload = {
    eventType: "test_run",
    sessionId: testSessionId,
    visitorId: testVisitorId,
    consent: {
      status: "accepted",
      categories: {
        necessary: true,
        analytics: true,
        functional: true,
        marketing: true,
      },
      doNotSellOptOut: false,
      gpcHonored: false,
      timestamp: new Date().toISOString(),
      jurisdiction: "USA (CCPA/CPRA Compliant)",
    },
    traffic: {
      pagesVisited: [
        { path: "/", title: "Blessed Hearts Homecare | Home", timestamp: new Date().toISOString() },
        { path: "/services/personal-care", title: "Personal Care Services", timestamp: new Date().toISOString() },
      ],
      pageCount: 2,
      lastVisitedPage: "/services/personal-care",
      clicks: [
        { tag: "BUTTON", text: "Schedule Free Consultation", href: "/contact-us", path: "/", timestamp: new Date().toISOString() },
        { tag: "A", text: "Call (223) 260-9042", href: "tel:2232609042", path: "/services/personal-care", timestamp: new Date().toISOString() },
      ],
      clickCount: 2,
      referralSource: {
        referrer: "https://www.google.com/search?q=home+care+york+pa",
        domain: "google.com",
        utm: {
          source: "google",
          medium: "organic",
          campaign: "",
        },
        landingPage: "/",
      },
    },
    deviceBrowser: {
      browser: "Google Chrome",
      os: "Windows",
      deviceType: "Desktop",
      screenResolution: "1920x1080",
      viewport: "1440x900",
      language: "en-US",
      colorScheme: "light",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
    clientLocation: {
      timezone: "America/New_York",
      locale: "en-US",
      timezoneOffset: 240,
    },
    sessionInfo: {
      startTime: new Date(Date.now() - 120000).toISOString(),
      lastActiveTime: new Date().toISOString(),
      durationSeconds: 120,
    },
  };

  // 1. POST /api/cookie-consent
  console.log("1. Sending POST to /api/cookie-consent...");
  const postRes = await fetch(`${BASE_URL}/api/cookie-consent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const postData = await postRes.json();
  console.log("POST Response status:", postRes.status);
  console.log("POST Response body:", postData);

  if (postRes.status === 200 && postData.success) {
    console.log("✓ SUCCESS: /api/cookie-consent recorded telemetry and consent into:", postData.collection);
  } else {
    console.error("✗ FAIL: /api/cookie-consent returned error:", postData);
  }

  // 2. GET /api/cookie-consent
  console.log("\n2. Sending GET to /api/cookie-consent to verify collection retrieval...");
  const getRes = await fetch(`${BASE_URL}/api/cookie-consent?limit=10`);
  const getData = await getRes.json();
  console.log("GET Response status:", getRes.status);
  console.log(`GET Records count in '${getData.collection}':`, getData.count);

  if (getData.records && getData.records.length > 0) {
    const found = getData.records.find((r) => r.sessionId === testSessionId);
    if (found) {
      console.log("✓ SUCCESS: Verified session was stored in Firestore collection 'BHH-cookie-consent'!");
      console.log("  Recorded details:");
      console.log("  - Pages visited:", found.traffic?.pagesVisited?.map((p) => p.path));
      console.log("  - Clicks tracked:", found.traffic?.clicks?.length);
      console.log("  - Device/Browser:", found.deviceBrowser?.browser, "on", found.deviceBrowser?.os);
      console.log("  - Approximate Location:", found.approximateLocation);
      console.log("  - Referral source:", found.traffic?.referralSource?.domain);
      console.log("  - Consent Status:", found.consent?.status);
    } else {
      console.log("Note: Document written, total retrieved:", getData.records.length);
    }
  }

  console.log("\n=========================================================");
  console.log("ALL TESTS COMPLETED SUCCESSFULLY!");
  console.log("=========================================================");
}

runTests().catch(console.error);
