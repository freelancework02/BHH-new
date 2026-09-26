import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

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

async function testInsert() {
  console.log("Checking Firestore insertion into table: BHH_inquiries...");
  try {
    const docRef = await addDoc(collection(db, "BHH_inquiries"), {
      brand: "BHH",
      organization: "Blessed Hearts Homecare",
      fullName: "Jane Doe",
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@example.com",
      phone: "(223) 260-9042",
      city: "Lancaster",
      zip: "17601",
      county: "Lancaster County",
      serviceRequested: "Companionship & Personal Care",
      preferredContact: "Phone",
      preferredTime: "Morning",
      message: "Hello! Testing inquiry insertion for BHH into the shared database.",
      source: "BHH - Verification Script",
      status: "new",
      createdAt: serverTimestamp(),
    });
    console.log("SUCCESS! Document created in 'BHH_inquiries' with ID:", docRef.id);
  } catch (error) {
    if (error.code === "permission-denied") {
      console.error("\n[PERMISSION DENIED]: Cloud Firestore security rules are currently blocking writes.");
      console.error("Please update your Firestore Rules in Firebase Console to allow write to BHH_inquiries.");
    } else {
      console.error("Firestore error:", error.message || error);
    }
  }
}

testInsert().then(() => process.exit(0));
