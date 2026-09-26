import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// In-memory sliding cache to prevent duplicate database entries (5 minute window)
const recentSubmissions = new Map();
const DEDUPLICATION_WINDOW_MS = 5 * 60 * 1000;

function cleanOldSubmissions() {
  const now = Date.now();
  for (const [key, timestamp] of recentSubmissions.entries()) {
    if (now - timestamp > DEDUPLICATION_WINDOW_MS) {
      recentSubmissions.delete(key);
    }
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // 1. Anti-spam honeypot check: If the hidden bot field is filled, silently discard
    if (body.botField) {
      return NextResponse.json(
        { success: true, message: "Inquiry received." },
        { status: 200 }
      );
    }

    const {
      firstName = "",
      lastName = "",
      name = "",
      email = "",
      phone = "",
      city = "",
      zip = "",
      county = "",
      reasonForContact = "",
      help = "",
      service = "",
      preferredContact = "",
      preferredTime = "",
      message = "",
      source = "Website Contact Form",
    } = body;

    const fullName = name.trim() || `${firstName} ${lastName}`.trim() || "Website Visitor";
    const serviceRequested = service || reasonForContact || help || "General Inquiry";

    // 2. Basic validation: must have at least email or phone
    if (!email.trim() && !phone.trim()) {
      return NextResponse.json(
        { success: false, error: "Please provide an email address or phone number." },
        { status: 400 }
      );
    }

    // 3. In-memory deduplication check (Layer 1): prevents duplicate submissions within 5 minutes
    cleanOldSubmissions();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.replace(/\D/g, "");
    const cleanMsg = message.trim().toLowerCase().slice(0, 100);
    const fingerprint = `${cleanEmail}|${cleanPhone}|${cleanMsg}`;

    if (recentSubmissions.has(fingerprint)) {
      const lastSeen = recentSubmissions.get(fingerprint);
      if (Date.now() - lastSeen < DEDUPLICATION_WINDOW_MS) {
        console.log(`[BHH Deduplication] In-memory duplicate blocked for: ${cleanEmail || cleanPhone}`);
        return NextResponse.json(
          {
            success: true,
            message: "Thank you! We have already received your inquiry and will be in touch shortly.",
            firestoreSaved: false,
            duplicatePrevented: true,
          },
          { status: 200 }
        );
      }
    }

    // Register this submission fingerprint in memory
    recentSubmissions.set(fingerprint, Date.now());

    let firestoreSaved = false;

    // 4. Save to Firebase Firestore with Database-Level Deduplication (Layer 2)
    // Deterministic document ID based on normalized contact info + message snippet + current date.
    // Because Firestore security rules forbid updating existing documents, any duplicate write to the
    // same docId is physically blocked at the database engine level even if the server restarts.
    if (db) {
      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      const hashInput = `${cleanEmail}|${cleanPhone}|${cleanMsg}|${today}`;
      const dedupeHash = crypto
        .createHash("sha256")
        .update(hashInput)
        .digest("hex")
        .slice(0, 16);
      const docId = `bhh_${dedupeHash}`;

      try {
        await setDoc(doc(db, "BHH_inquiries", docId), {
          brand: "BHH",
          organization: "Blessed Hearts Homecare",
          fullName,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          city: city.trim(),
          zip: zip.trim(),
          county: county.trim(),
          serviceRequested,
          preferredContact,
          preferredTime,
          message: message.trim(),
          source: source.includes("BHH") ? source : `BHH - ${source}`,
          status: "new",
          createdAt: serverTimestamp(),
        });
        firestoreSaved = true;
      } catch (fbError) {
        if (fbError.code === "permission-denied") {
          // Document already exists! Firestore security rules (allow update: if false) blocked duplicate write
          console.log(`[BHH Firestore] Database-level duplicate blocked for ${docId}`);
          firestoreSaved = false;
        } else {
          console.error("Error saving inquiry to Firebase Firestore (BHH_inquiries):", fbError);
        }
      }
    } else {
      console.warn("Firebase is not initialized yet. Skipping Firestore document save.");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We have received your inquiry and will be in touch shortly.",
        firestoreSaved,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error in /api/contact:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
