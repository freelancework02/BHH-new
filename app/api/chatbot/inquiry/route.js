import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// In-memory sliding cache to prevent duplicate chatbot inquiries (5 minute window)
const recentChatInquiries = new Map();
const DEDUPLICATION_WINDOW_MS = 5 * 60 * 1000;

function cleanOldInquiries() {
  const now = Date.now();
  for (const [key, timestamp] of recentChatInquiries.entries()) {
    if (now - timestamp > DEDUPLICATION_WINDOW_MS) {
      recentChatInquiries.delete(key);
    }
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      fullName = "",
      name = "",
      phone = "",
      email = "",
      serviceRequested = "General In-Home Care Inquiry",
      city = "",
      county = "",
      notes = "",
      message = "",
      chatTranscript = [],
    } = body;

    const contactName = (fullName || name || "Website Visitor").trim();
    const contactPhone = (phone || "").trim();
    const contactEmail = (email || "").trim();
    const additionalNotes = (notes || message || "").trim();

    // 1. Validation: Must have at least phone or email
    if (!contactPhone && !contactEmail) {
      return NextResponse.json(
        { success: false, error: "Please provide a phone number or email address." },
        { status: 400 }
      );
    }

    // 2. In-memory deduplication check (Layer 1)
    cleanOldInquiries();
    const cleanEmail = contactEmail.toLowerCase();
    const cleanPhone = contactPhone.replace(/\D/g, "");
    const fingerprint = `${cleanEmail}|${cleanPhone}|${serviceRequested.toLowerCase()}`;

    if (recentChatInquiries.has(fingerprint)) {
      const lastSeen = recentChatInquiries.get(fingerprint);
      if (Date.now() - lastSeen < DEDUPLICATION_WINDOW_MS) {
        console.log(`[BHH Chatbot Deduplication] Prevented duplicate inquiry for: ${cleanEmail || cleanPhone}`);
        return NextResponse.json(
          {
            success: true,
            message: "Thank you! We have already received your inquiry and our Care Coordinator will call you shortly.",
            firestoreSaved: false,
            duplicatePrevented: true,
          },
          { status: 200 }
        );
      }
    }

    recentChatInquiries.set(fingerprint, Date.now());

    let firestoreSaved = false;

    // 3. Save to Firebase Firestore: BHH-chatbot-inquiries (Layer 2 Database Deduplication)
    if (db) {
      const today = new Date().toISOString().slice(0, 10);
      const hashInput = `chat|${cleanEmail}|${cleanPhone}|${serviceRequested}|${today}`;
      const dedupeHash = crypto.createHash("sha256").update(hashInput).digest("hex").slice(0, 16);
      const docId = `bhh_chat_${dedupeHash}`;

      try {
        await setDoc(doc(db, "BHH-chatbot-inquiries", docId), {
          brand: "BHH",
          organization: "Blessed Hearts Homecare",
          collection: "BHH-chatbot-inquiries",
          fullName: contactName,
          phone: contactPhone,
          email: contactEmail,
          serviceRequested,
          city: city.trim(),
          county: county.trim(),
          notes: additionalNotes,
          chatTranscript: Array.isArray(chatTranscript) ? chatTranscript.slice(-10) : [],
          source: "BHH Interactive Website Chatbot",
          status: "new",
          createdAt: serverTimestamp(),
        });
        firestoreSaved = true;
      } catch (fbError) {
        if (fbError.code === "permission-denied") {
          console.log(`[BHH Chatbot] Firestore duplicate prevented or permission pending for ${docId}`);
        } else {
          console.error("Error saving chatbot inquiry to Firestore BHH-chatbot-inquiries:", fbError);
        }
      }
    } else {
      console.warn("Firebase db not initialized. Skipping BHH-chatbot-inquiries document save.");
    }

    // 4. Send Email Notification via Web3Forms (runs in parallel so agency owner receives instant email notification)
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (accessKey) {
      try {
        const transcriptText = Array.isArray(chatTranscript)
          ? chatTranscript.map((m) => `${m.sender === "user" ? "Visitor" : "Chatbot"}: ${m.text}`).join("\n\n")
          : "N/A";

        const emailFormData = new FormData();
        emailFormData.append("access_key", accessKey);
        emailFormData.append("subject", `[Chatbot Lead] New Consultation Request from ${contactName}`);
        emailFormData.append("from_name", "BHH Chatbot Assistant");
        emailFormData.append("name", contactName);
        emailFormData.append("phone", contactPhone || "Not provided");
        emailFormData.append("email", contactEmail || "Not provided");
        emailFormData.append("service_needed", serviceRequested);
        emailFormData.append("notes", additionalNotes || "None");
        emailFormData.append("source", "BHH Interactive Website Chatbot");
        emailFormData.append("chat_transcript", transcriptText);

        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: emailFormData,
        }).catch((err) => console.warn("Chatbot Web3Forms notification error:", err));
      } catch (e) {
        console.warn("Web3Forms email trigger error:", e);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `Thank you, ${contactName}! We have received your consultation request. A care coordinator will be in touch with you shortly.`,
        firestoreSaved,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error in /api/chatbot/inquiry:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
