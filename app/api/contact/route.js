import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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

    let firestoreSaved = false;

    // 3. Save to Firebase Firestore (if configured)
    if (db) {
      try {
        await addDoc(collection(db, "inquiries"), {
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
          source,
          status: "new",
          createdAt: serverTimestamp(),
        });
        firestoreSaved = true;
      } catch (fbError) {
        console.error("Error saving inquiry to Firebase Firestore:", fbError);
        // Do not crash, proceed to send email notification
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
