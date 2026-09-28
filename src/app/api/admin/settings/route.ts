import { NextRequest, NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import { hashPassword, verifyPassword, verifyToken } from "@/lib/auth";

function auth(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value || request.headers.get("authorization")?.replace("Bearer ", "") || "";
  return verifyToken(token);
}

export async function PATCH(request: NextRequest) {
  const session = auth(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { email, currentPassword, newPassword } = await request.json();
    const db = await getMongoDb();
    const users = db.collection("admin_users");
    const user = await users.findOne({ email: session.email });
    if (!user) return NextResponse.json({ error: "Admin account not found" }, { status: 404 });

    if (!currentPassword || !(await verifyPassword(String(currentPassword), String(user.password_hash)))) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    }

    const updates: Record<string, unknown> = { updatedAt: new Date() };
    if (email) {
      const normalized = String(email).trim().toLowerCase();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(normalized)) return NextResponse.json({ error: "Enter a valid email" }, { status: 400 });
      const duplicate = await users.findOne({ email: normalized, _id: { $ne: user._id } });
      if (duplicate) return NextResponse.json({ error: "That email is already in use" }, { status: 409 });
      updates.email = normalized;
    }
    if (newPassword) {
      if (String(newPassword).length < 10) return NextResponse.json({ error: "New password must be at least 10 characters" }, { status: 400 });
      updates.password_hash = await hashPassword(String(newPassword));
    }
    await users.updateOne({ _id: user._id }, { $set: updates });
    return NextResponse.json({ ok: true, email: updates.email || user.email, reloginRequired: true });
  } catch (error) {
    console.error("Admin settings update failed", error);
    return NextResponse.json({ error: "Could not update admin account" }, { status: 500 });
  }
}
