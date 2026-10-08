import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { verifyAdminSession } from "@/lib/adminAuth";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

const LOCAL_INQUIRIES_FILE = path.join(process.cwd(), "data", "localInquiries.json");

function readLocalInquiries() {
  try {
    if (!fs.existsSync(LOCAL_INQUIRIES_FILE)) {
      return {};
    }
    const raw = fs.readFileSync(LOCAL_INQUIRIES_FILE, "utf-8");
    return JSON.parse(raw || "{}");
  } catch (e) {
    return {};
  }
}

function saveLocalInquiries(store) {
  try {
    const dir = path.dirname(LOCAL_INQUIRIES_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOCAL_INQUIRIES_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (e) {
    console.warn("Failed to write to localInquiries.json:", e.message);
  }
}

export async function GET(request) {
  // 1. Session verification
  const token = request.cookies.get("bhh_admin_session")?.value;
  const session = verifyAdminSession(token);
  if (!session.valid) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const allInquiries = [];
    const seenIds = new Set();

    // 2. Fetch Contact Form Inquiries (BHH_inquiries) from Firestore
    if (db) {
      try {
        const contactSnap = await getDocs(collection(db, "BHH_inquiries"));
        contactSnap.forEach((d) => {
          const data = d.data();
          seenIds.add(d.id);
          allInquiries.push({
            id: d.id,
            type: "contact_form",
            sourceType: "Contact Form",
            fullName: data.fullName || `${data.firstName || ""} ${data.lastName || ""}`.trim() || "Website Visitor",
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            phone: data.phone || "",
            email: data.email || "",
            city: data.city || "",
            zip: data.zip || "",
            county: data.county || "",
            serviceRequested: data.serviceRequested || data.service || "General Inquiry",
            preferredContact: data.preferredContact || "",
            preferredTime: data.preferredTime || "",
            message: data.message || "",
            notes: data.notes || data.message || "",
            source: data.source || "Website Contact Form",
            status: data.status || "new",
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt || data.createdAtIso || null,
          });
        });
      } catch (contactErr) {
        console.warn("Error fetching BHH_inquiries from Firestore:", contactErr.message);
      }

      // 3. Fetch Chatbot Inquiries (BHH-chatbot-inquiries) from Firestore
      try {
        const chatSnap = await getDocs(collection(db, "BHH-chatbot-inquiries"));
        chatSnap.forEach((d) => {
          const data = d.data();
          seenIds.add(d.id);
          allInquiries.push({
            id: d.id,
            type: "chatbot",
            sourceType: "Chatbot Assistant",
            fullName: data.fullName || data.name || "Website Visitor",
            phone: data.phone || "",
            email: data.email || "",
            city: data.city || "",
            zip: data.zip || "",
            county: data.county || "",
            serviceRequested: data.serviceRequested || "General Inquiry",
            message: data.notes || data.message || "",
            notes: data.notes || "",
            chatTranscript: Array.isArray(data.chatTranscript) ? data.chatTranscript : [],
            source: data.source || "BHH Interactive Website Chatbot",
            status: data.status || "new",
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt || null,
          });
        });
      } catch (chatErr) {
        console.warn("Error fetching BHH-chatbot-inquiries from Firestore:", chatErr.message);
      }
    }

    // 4. Merge any local fallback store inquiries
    try {
      const localStore = readLocalInquiries();
      Object.values(localStore).forEach((item) => {
        if (!seenIds.has(item.id)) {
          allInquiries.push({
            id: item.id,
            type: "contact_form",
            sourceType: "Contact Form",
            fullName: item.fullName || `${item.firstName || ""} ${item.lastName || ""}`.trim() || "Website Visitor",
            firstName: item.firstName || "",
            lastName: item.lastName || "",
            phone: item.phone || "",
            email: item.email || "",
            city: item.city || "",
            zip: item.zip || "",
            county: item.county || "",
            serviceRequested: item.serviceRequested || "General Inquiry",
            preferredContact: item.preferredContact || "",
            preferredTime: item.preferredTime || "",
            message: item.message || "",
            notes: item.notes || item.message || "",
            source: item.source || "Website Contact Form",
            status: item.status || "new",
            createdAt: item.createdAt || item.createdAtIso || new Date().toISOString(),
          });
          seenIds.add(item.id);
        }
      });
    } catch (localErr) {
      console.warn("Error reading local inquiries store:", localErr.message);
    }

    // Filter out any dummy, fake, or automated test data
    const validInquiries = allInquiries.filter((item) => {
      if (item.test === true || item.isTest === true) return false;
      const email = (item.email || "").toLowerCase().trim();
      const name = (item.fullName || "").toLowerCase().trim();
      const source = (item.source || "").toLowerCase();
      const message = (item.message || item.notes || "").toLowerCase();

      // Block known test domains
      if (
        email.endsWith("@example.com") ||
        email.endsWith("@test.com") ||
        email.endsWith("@schrute-farms.com") ||
        email.endsWith("@dundermifflin.com") ||
        email.includes("test_")
      ) {
        return false;
      }

      // Block automated test tags
      if (
        source.includes("automated test") ||
        source.includes("verification script") ||
        message.includes("automated test")
      ) {
        return false;
      }

      // Must have at least a name or valid contact method
      if (!name && !email && !item.phone) return false;
      if (name === "test user" || name === "test") return false;

      return true;
    });

    // Sort newest first
    validInquiries.sort((a, b) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeB - timeA;
    });

    return NextResponse.json({
      success: true,
      count: validInquiries.length,
      inquiries: validInquiries,
    });
  } catch (error) {
    console.error("Error reading admin inquiries:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve inquiries from database." },
      { status: 500 }
    );
  }
}

// Update inquiry status
export async function PATCH(request) {
  const token = request.cookies.get("bhh_admin_session")?.value;
  const session = verifyAdminSession(token);
  if (!session.valid) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { id, type, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing inquiry ID or status." }, { status: 400 });
    }

    // 1. Update Firestore if db initialized
    if (db) {
      try {
        const collectionName = type === "chatbot" ? "BHH-chatbot-inquiries" : "BHH_inquiries";
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, { status });
      } catch (fbErr) {
        console.warn("Firestore status update note:", fbErr.message);
      }
    }

    // 2. Update local store
    try {
      const localStore = readLocalInquiries();
      if (localStore[id]) {
        localStore[id].status = status;
        saveLocalInquiries(localStore);
      }
    } catch (e) {
      console.warn("Local store update warning:", e.message);
    }

    return NextResponse.json({ success: true, message: `Status updated to ${status}.` });
  } catch (error) {
    console.error("Error updating inquiry status:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Delete inquiry
export async function DELETE(request) {
  const token = request.cookies.get("bhh_admin_session")?.value;
  const session = verifyAdminSession(token);
  if (!session.valid) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { id, type } = await request.json();

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing inquiry ID." }, { status: 400 });
    }

    // 1. Delete from Firestore if db initialized
    if (db) {
      try {
        const collectionName = type === "chatbot" ? "BHH-chatbot-inquiries" : "BHH_inquiries";
        const docRef = doc(db, collectionName, id);
        await deleteDoc(docRef);
      } catch (fbErr) {
        console.warn("Firestore delete note:", fbErr.message);
      }
    }

    // 2. Delete from local store
    try {
      const localStore = readLocalInquiries();
      if (localStore[id]) {
        delete localStore[id];
        saveLocalInquiries(localStore);
      }
    } catch (e) {
      console.warn("Local store delete warning:", e.message);
    }

    return NextResponse.json({ success: true, message: "Inquiry deleted successfully." });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
