import { getChatbotResponse } from "../lib/chatbotKnowledge.js";

const testQueries = [
  "what are the services you guys are providing ?",
  "tell me about your company and mission",
  "can I transfer from my current agency?",
  "do you serve Gettysburg or Harrisburg?",
  "how much does it cost and do you take Medicaid waiver?",
  "are your caregivers background checked and screened?",
  "what is the minimum number of hours?",
  "what is your phone number and office address?",
  "I am looking for a job as a caregiver",
  "my mother has dementia and wanders, can you help?",
];

console.log("==================================================");
console.log("TESTING BHH CHATBOT KNOWLEDGE BASE COMPREHENSIVENESS");
console.log("==================================================\n");

let passed = 0;
for (const q of testQueries) {
  const res = getChatbotResponse(q);
  console.log(`QUERY: "${q}"`);
  console.log(`RESPONSE PREVIEW:\n${res.text.slice(0, 160)}...\n`);
  if (res.text && res.text.length > 50) {
    passed++;
  }
}

console.log("==================================================");
console.log(`PASSED ${passed}/${testQueries.length} KNOWLEDGE TESTS`);
console.log("==================================================");
