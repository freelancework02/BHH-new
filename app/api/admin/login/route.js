import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

// Secret for signing admin sessions
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "bhh_luxury_secret_session_token_key_2026";
const DEFAULT_ADMIN_USER = "admin@blessedheartshca.com";
const DEFAULT_ADMIN_PASS = "BlessedHearts2026!";

export async function POST(request) {
  try {
    const { username = "", password = "" } = await request.json();

    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanUser || !cleanPass) {
      return NextResponse.json(
        { success: false, error: "Please provide both username and password." },
        { status: 400 }
      );
    }

    let isAuthenticated = false;
    let verifiedUsername = cleanUser;

    // 1. Check against Firestore collection: BHH-Admin-panel-pass
    if (db) {
      try {
        const credDocRef = doc(db, "BHH-Admin-panel-pass", "admin_credentials");
        const docSnap = await getDoc(credDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const dbUser = (data.username || "").trim().toLowerCase();
          const dbPass = (data.password || "").trim();

          if (dbUser === cleanUser && dbPass === cleanPass) {
            isAuthenticated = true;
            verifiedUsername = data.username;
          }
        } else {
          // If collection exists or allows write, seed initial default admin document
          try {
            await setDoc(credDocRef, {
              username: DEFAULT_ADMIN_USER,
              password: DEFAULT_ADMIN_PASS,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
            console.log("[BHH Admin] Seeded initial admin credentials into BHH-Admin-panel-pass");
          } catch (seedErr) {
            // Firestore rules might restrict write until published
          }

          if (
            (cleanUser === DEFAULT_ADMIN_USER.toLowerCase() || cleanUser === "admin") &&
            cleanPass === DEFAULT_ADMIN_PASS
          ) {
            isAuthenticated = true;
            verifiedUsername = DEFAULT_ADMIN_USER;
          }
        }
      } catch (fbError) {
        console.warn("Firestore BHH-Admin-panel-pass check error (falling back to secure default):", fbError.message);
        // Fallback to secure default admin credentials if rules are being updated
        if (
          (cleanUser === DEFAULT_ADMIN_USER.toLowerCase() || cleanUser === "admin") &&
          cleanPass === DEFAULT_ADMIN_PASS
        ) {
          isAuthenticated = true;
          verifiedUsername = DEFAULT_ADMIN_USER;
        }
      }
    } else {
      if (
        (cleanUser === DEFAULT_ADMIN_USER.toLowerCase() || cleanUser === "admin") &&
        cleanPass === DEFAULT_ADMIN_PASS
      ) {
        isAuthenticated = true;
        verifiedUsername = DEFAULT_ADMIN_USER;
      }
    }

    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: "Invalid username or password. Please try again." },
        { status: 401 }
      );
    }

    // 2. Generate secure signed session token
    const timestamp = Date.now();
    const signature = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(`${verifiedUsername}:${timestamp}`)
      .digest("hex");
    const sessionToken = `${Buffer.from(verifiedUsername).toString("base64")}.${timestamp}.${signature}`;

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful.",
        username: verifiedUsername,
      },
      { status: 200 }
    );

    // Set secure HTTP-only cookie (valid for 24 hours)
    response.cookies.set("bhh_admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred during authentication." },
      { status: 500 }
    );
  }
}
