import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

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

async function seedAdmin() {
  console.log("=========================================================");
  console.log("SEEDING ADMIN CREDENTIALS INTO 'BHH-Admin-panel-pass'...");
  console.log("=========================================================");

  const defaultAdmin = {
    username: "admin@blessedheartshca.com",
    password: "BlessedHearts2026!",
    role: "Super Admin",
    organization: "Blessed Hearts Homecare",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  try {
    const docRef = doc(db, "BHH-Admin-panel-pass", "admin_credentials");
    await setDoc(docRef, defaultAdmin);
    console.log("✓ SUCCESS: Admin credentials stored in collection: BHH-Admin-panel-pass");
    console.log(`  Document: admin_credentials`);
    console.log(`  Username: ${defaultAdmin.username}`);
    console.log(`  Password: ${defaultAdmin.password}`);
  } catch (error) {
    if (error.code === "permission-denied") {
      console.log("[PERMISSION REQUIRED]: Update your Firebase Console security rules to allow read/write to BHH-Admin-panel-pass.");
    } else {
      console.error("Error seeding admin credentials:", error.message || error);
    }
  }
}

seedAdmin().then(() => process.exit(0));
