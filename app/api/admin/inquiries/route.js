import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/adminAuth";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

export async function GET(request) {
  // 1. Session verification
  const token = request.cookies.get("bhh_admin_session")?.value;
  const session = verifyAdminSession(token);
  if (!session.valid) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  if (!db) {
    return NextResponse.json(
      { success: false, error: "Firebase database not initialized." },
      { status: 500 }
    );
  }

  try {
    const allInquiries = [];

    // 2. Fetch Contact Form Inquiries (BHH_inquiries)
    try {
      const contactSnap = await getDocs(collection(db, "BHH_inquiries"));
      contactSnap.forEach((d) => {
        const data = d.data();
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
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt || null,
        });
      });
    } catch (contactErr) {
      console.warn("Error fetching BHH_inquiries (check Firestore rules):", contactErr.message);
    }

    // 3. Fetch Chatbot Inquiries (BHH-chatbot-inquiries)
    try {
      const chatSnap = await getDocs(collection(db, "BHH-chatbot-inquiries"));
      chatSnap.forEach((d) => {
        const data = d.data();
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
      console.warn("Error fetching BHH-chatbot-inquiries (check Firestore rules):", chatErr.message);
    }

    // Sort newest first
    allInquiries.sort((a, b) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeB - timeA;
    });

    return NextResponse.json({
      success: true,
      count: allInquiries.length,
      inquiries: allInquiries,
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

    const collectionName = type === "chatbot" ? "BHH-chatbot-inquiries" : "BHH_inquiries";
    const docRef = doc(db, collectionName, id);

    await updateDoc(docRef, { status });

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

    const collectionName = type === "chatbot" ? "BHH-chatbot-inquiries" : "BHH_inquiries";
    const docRef = doc(db, collectionName, id);

    await deleteDoc(docRef);

    return NextResponse.json({ success: true, message: "Inquiry deleted successfully." });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
