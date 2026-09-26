const BASE_URL = "http://localhost:3000";

async function testAdminFlow() {
  console.log("==================================================");
  console.log("TESTING BHH ADMIN PORTAL API & AUTHENTICATION");
  console.log("==================================================\n");

  // 1. Unauthorized Access Test
  console.log("TEST 1: Requesting /api/admin/inquiries without credentials...");
  const res1 = await fetch(`${BASE_URL}/api/admin/inquiries`);
  console.log("Response 1 status:", res1.status);
  if (res1.status === 401) {
    console.log("✓ PASS: Unauthorized access blocked (401).\n");
  } else {
    console.error("✗ FAIL: Unauthorized access was not blocked:", res1.status);
  }

  // 2. Invalid Login Test
  console.log("TEST 2: Attempting login with incorrect password...");
  const res2 = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "admin@blessedheartshca.com", password: "wrongpassword" }),
  });
  const data2 = await res2.json();
  console.log("Response 2:", data2);
  if (res2.status === 401 && !data2.success) {
    console.log("✓ PASS: Invalid login rejected.\n");
  } else {
    console.error("✗ FAIL: Invalid login not rejected:", data2);
  }

  // 3. Valid Login Test
  console.log("TEST 3: Logging in with valid admin credentials...");
  const res3 = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "admin@blessedheartshca.com",
      password: "BlessedHearts2026!",
    }),
  });
  const data3 = await res3.json();
  console.log("Response 3:", data3);
  const cookieHeader = res3.headers.get("set-cookie");
  console.log("Cookie received:", cookieHeader ? "Yes (bhh_admin_session)" : "No");

  if (res3.status === 200 && data3.success && cookieHeader) {
    console.log("✓ PASS: Login successful and session cookie set!\n");
  } else {
    console.error("✗ FAIL: Login failed:", data3);
  }

  // Extract session cookie for subsequent requests
  const cookieMatch = cookieHeader?.match(/bhh_admin_session=[^;]+/);
  const sessionCookie = cookieMatch ? cookieMatch[0] : "";

  // 4. Authenticated Me Endpoint Test
  console.log("TEST 4: Checking session via /api/admin/me...");
  const res4 = await fetch(`${BASE_URL}/api/admin/me`, {
    headers: { Cookie: sessionCookie },
  });
  const data4 = await res4.json();
  console.log("Response 4:", data4);
  if (data4.authenticated) {
    console.log("✓ PASS: Session verified successfully!\n");
  } else {
    console.error("✗ FAIL: Session verification failed:", data4);
  }

  // 5. Authenticated Inquiries Fetch Test
  console.log("TEST 5: Fetching inquiries with authenticated session...");
  const res5 = await fetch(`${BASE_URL}/api/admin/inquiries`, {
    headers: { Cookie: sessionCookie },
  });
  const data5 = await res5.json();
  console.log(`Response 5 count: ${data5.count || 0}`);
  if (data5.success) {
    console.log("✓ PASS: Inquiries retrieved successfully from database!");
    if (data5.inquiries?.length > 0) {
      console.log(`Sample inquiry: [${data5.inquiries[0].type}] ${data5.inquiries[0].fullName} - ${data5.inquiries[0].serviceRequested}`);
    }
  } else {
    console.error("✗ FAIL: Failed to retrieve inquiries:", data5);
  }

  console.log("\n==================================================");
  console.log("ADMIN API TESTS COMPLETED!");
  console.log("==================================================");
}

testAdminFlow().catch(console.error);
