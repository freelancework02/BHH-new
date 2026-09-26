import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/adminAuth";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(request) {
  // 1. Authenticate admin
  const token = request.cookies.get("bhh_admin_session")?.value;
  const session = verifyAdminSession(token);
  if (!session.valid) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Please sign in as an admin." },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { success: false, error: "No image file provided in upload request." },
        { status: 400 }
      );
    }

    const mimeType = file.type || "";
    if (!mimeType.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "Only image files (PNG, JPG, WebP, GIF) are allowed." },
        { status: 400 }
      );
    }

    // Limit size to 10MB
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: "Image file exceeds maximum allowed size (10MB)." },
        { status: 400 }
      );
    }

    // Get file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Extract safe extension
    let ext = path.extname(file.name || "").toLowerCase();
    if (!ext || ext.length > 5) {
      if (mimeType === "image/png") ext = ".png";
      else if (mimeType === "image/webp") ext = ".webp";
      else if (mimeType === "image/gif") ext = ".gif";
      else ext = ".jpg";
    }

    // Ensure upload directory exists in public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate clean unique filename
    const safeBaseName = (path.basename(file.name, ext) || "blog-image")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .slice(0, 30);
    const uniqueFileName = `${safeBaseName}-${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, uniqueFileName);

    // Write file to disk
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: uniqueFileName,
      size: file.size,
      mimeType,
      message: "Image uploaded successfully!",
    });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process image upload." },
      { status: 500 }
    );
  }
}
