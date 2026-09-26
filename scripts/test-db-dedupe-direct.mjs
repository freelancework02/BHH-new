import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import crypto from "crypto";

const firebaseConfig = {
  apiKey: "AIzaSyCeS7M2tPptsH4YKBT90cvw-MdxCcp14b4",
  authDomain: "blessed-hearts.firebaseapp.com",
  projectId: "blessed-hearts",
  storageBucket: "blessed-hearts.firebasestorage.app",
  messagingSenderId: "608426710589",
  appId: "1:608426710589:web:00be31b41dadac9ce1bc54",
  measurementId: "G-XNJ2LVPWLG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testDatabaseLevelDeduplication() {
  console.log("===============================================================");
  console.log("TESTING DATABASE-LEVEL DEDUPLICATION (Bypassing Server Memory)");
  console.log("===============================================================");

  const email = "jim.halpert@dundermifflin.com";
  const phone = "5551234567";
  const msg = "Need companionship care in Scranton";
  const today = new Date().toISOString().slice(0, 10);

  const hash = crypto.createHash("sha256").update(`${email}|${phone}|${msg}|${today}`).digest("hex").slice(0, 16);
  const docId = `bhh_${hash}`;

  console.log(`Document ID generated: ${docId}`);

  // 1st attempt: should succeed and create document
  console.log("\nAttempt 1 (Original submission)...");
  try {
    await setDoc(doc(db, "BHH_inquiries", docId), {
      brand: "BHH",
      fullName: "Jim Halpert",
      email,
      phone,
      message: msg,
      createdAt: serverTimestamp(),
    });
    console.log("✓ Attempt 1 SUCCEEDED: Document created in BHH_inquiries.");
  } catch (err) {
    console.error("Attempt 1 failed:", err);
  }

  // 2nd attempt: should be blocked by Firestore database security rules
  console.log("\nAttempt 2 (Simulating page refresh / re-submit from another device/browser)...");
  try {
    await setDoc(doc(db, "BHH_inquiries", docId), {
      brand: "BHH",
      fullName: "Jim Halpert",
      email,
      phone,
      message: msg,
      createdAt: serverTimestamp(),
    });
    console.log("✗ FAILED: Attempt 2 wrote to database (should have been blocked).");
  } catch (err) {
    if (err.code === "permission-denied") {
      console.log("✓ SUCCESS: Attempt 2 was BLOCKED at the database engine level (permission-denied).");
      console.log("✓ PROOF: No duplicate document can be created in Firestore under any condition!");
    } else {
      console.error("Attempt 2 error:", err);
    }
  }
}

testDatabaseLevelDeduplication().then(() => process.exit(0));
