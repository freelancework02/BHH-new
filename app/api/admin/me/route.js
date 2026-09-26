import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/adminAuth";

export async function GET(request) {
  const token = request.cookies.get("bhh_admin_session")?.value;
  const session = verifyAdminSession(token);

  if (!session.valid) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, username: session.username });
}
