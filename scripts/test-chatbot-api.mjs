const API_URL = "http://localhost:3000/api/chatbot/inquiry";

async function runChatbotTests() {
  console.log("==================================================");
  console.log("TESTING BHH CHATBOT INQUIRY API & FIRESTORE SAVE");
  console.log("==================================================\n");

  const sampleLead = {
    fullName: "Pam Beesly",
    phone: "(555) 345-6789",
    email: "pam.beesly@dundermifflin.com",
    serviceRequested: "Companion Care",
    notes: "Mom needs companionship 3 days a week in Scranton/York area.",
    chatTranscript: [
      { sender: "bot", text: "Hello! How can we support you today?" },
      { sender: "user", text: "what are the services you guys are providing ?" },
      { sender: "bot", text: "Hey! Thanks for your question. Here is the list of in-home care services..." },
      { sender: "user", text: "I need companion care for my mother" },
    ],
  };

  // TEST 1: Initial Chatbot Lead
  console.log("TEST 1: Submitting chatbot consultation inquiry...");
  const res1 = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sampleLead),
  });
  const data1 = await res1.json();
  console.log("Response 1:", data1);
  if (data1.success) {
    console.log("✓ PASS: Chatbot consultation inquiry submitted successfully!\n");
  } else {
    console.error("✗ FAIL: Chatbot inquiry failed:", data1);
  }

  // TEST 2: Duplicate Chatbot Lead
  console.log("TEST 2: Submitting identical chatbot lead immediately...");
  const res2 = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sampleLead),
  });
  const data2 = await res2.json();
  console.log("Response 2:", data2);
  if (data2.success && data2.duplicatePrevented) {
    console.log("✓ PASS: Duplicate chatbot submission recognized and blocked from re-writing!\n");
  } else {
    console.error("✗ FAIL: Duplicate prevention unexpected:", data2);
  }

  console.log("==================================================");
  console.log("CHATBOT API TESTS COMPLETE!");
  console.log("==================================================");
}

runChatbotTests().catch(console.error);
