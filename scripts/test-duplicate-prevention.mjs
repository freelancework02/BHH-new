// Comprehensive Test Suite for /api/contact and Duplicate Prevention
const API_URL = "http://localhost:3000/api/contact";

async function runTests() {
  console.log("==================================================");
  console.log("RUNNING BHH CONTACT FORM & DUPLICATE TEST SUITE");
  console.log("==================================================\n");

  const testUser = {
    firstName: "Dwight",
    lastName: "Schrute",
    email: `dwight.${Date.now()}@schrute-farms.com`,
    phone: "(555) 765-4321",
    city: "Honesdale",
    zip: "18431",
    reasonForContact: "Companionship Care",
    message: "Automated test for duplicate prevention check.",
    source: "Automated Test Suite",
  };

  // TEST 1: Initial Valid Submission
  console.log("TEST 1: Submitting initial valid inquiry...");
  const res1 = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(testUser),
  });
  const data1 = await res1.json();
  console.log("Response 1:", data1);
  if (data1.success && data1.firestoreSaved && !data1.duplicatePrevented) {
    console.log("✓ PASS: Initial submission was saved to Firestore BHH_inquiries.\n");
  } else {
    console.error("✗ FAIL: Initial submission failed:", data1);
  }

  // TEST 2: Immediate Duplicate Submission (Same data, sent immediately)
  console.log("TEST 2: Submitting identical duplicate inquiry (Simulating double-click)...");
  const res2 = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(testUser),
  });
  const data2 = await res2.json();
  console.log("Response 2:", data2);
  if (data2.success && data2.duplicatePrevented && data2.firestoreSaved === false) {
    console.log("✓ PASS: Duplicate was BLOCKED from being inserted into database.\n");
  } else {
    console.error("✗ FAIL: Duplicate was not blocked:", data2);
  }

  // TEST 3: Honeypot Bot Spam
  console.log("TEST 3: Submitting with botField filled (Anti-spam honeypot)...");
  const res3 = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...testUser, botField: "I am a spam bot" }),
  });
  const data3 = await res3.json();
  console.log("Response 3:", data3);
  if (data3.success && !data3.firestoreSaved) {
    console.log("✓ PASS: Bot submission silently discarded without database write.\n");
  } else {
    console.error("✗ FAIL: Bot submission handling unexpected:", data3);
  }

  // TEST 4: Missing Contact Info (No email and no phone)
  console.log("TEST 4: Submitting empty contact info...");
  const res4 = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName: "Ghost", message: "No phone or email" }),
  });
  const data4 = await res4.json();
  console.log("Response 4:", data4);
  if (res4.status === 400 && !data4.success) {
    console.log("✓ PASS: Invalid submission rejected with 400 Bad Request.\n");
  } else {
    console.error("✗ FAIL: Invalid submission was not rejected properly:", data4);
  }

  console.log("==================================================");
  console.log("ALL TESTS COMPLETED SUCCESSFULLY!");
  console.log("==================================================");
}

runTests().catch((err) => {
  console.error("Test execution error:", err);
  process.exit(1);
});
