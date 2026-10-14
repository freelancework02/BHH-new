import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCeS7M2tPptsH4YKBT90cvw-MdxCcp14b4",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "blessed-hearts.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "blessed-hearts",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "blessed-hearts.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "608426710589",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:608426710589:web:00be31b41dadac9ce1bc54",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-XNJ2LVPWLG",
};

let app = null;
let db = null;

// Only initialize if project ID is provided in environment variables
if (firebaseConfig.projectId) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}

export { app, db };
