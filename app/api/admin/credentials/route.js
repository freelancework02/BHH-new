import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/adminAuth";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const DEFAULT_ADMIN_USER = "admin@blessedheartshca.com";
const DEFAULT_ADMIN_PASS = "BlessedHearts2026!";

export async function GET(request) {
  const token = request.cookies.get("bhh_admin_session")?.value;
  const session = verifyAdminSession(token);
  if (!session.valid) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  let username = DEFAULT_ADMIN_USER;

  if (db) {
    try {
      const docRef = doc(db, "BHH-Admin-panel-pass", "admin_credentials");
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        username = snap.data().username || DEFAULT_ADMIN_USER;
      }
    } catch (e) {
      console.warn("Error reading credentials:", e.message);
    }
  }

  return NextResponse.json({ success: true, username });
}

export async function POST(request) {
  const token = request.cookies.get("bhh_admin_session")?.value;
  const session = verifyAdminSession(token);
  if (!session.valid) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { currentPassword, newUsername, newPassword } = await request.json();

    if (!currentPassword || !newUsername || !newPassword) {
      return NextResponse.json(
        { success: false, error: "Please fill in all credential fields." },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { success: false, error: "New password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    if (!db) {
      return NextResponse.json({ success: false, error: "Database not connected." }, { status: 500 });
    }

    const docRef = doc(db, "BHH-Admin-panel-pass", "admin_credentials");
    const snap = await getDoc(docRef);

    let activePass = DEFAULT_ADMIN_PASS;
    if (snap.exists()) {
      activePass = snap.data().password || DEFAULT_ADMIN_PASS;
    }

    if (currentPassword !== activePass) {
      return NextResponse.json(
        { success: false, error: "Current password does not match." },
        { status: 400 }
      );
    }

    // Save updated credentials to BHH-Admin-panel-pass
    await setDoc(docRef, {
      username: newUsername.trim(),
      password: newPassword.trim(),
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      message: "Admin credentials successfully updated in BHH-Admin-panel-pass.",
    });
  } catch (error) {
    console.error("Error updating credentials:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update credentials." },
      { status: 500 }
    );
  }
}
