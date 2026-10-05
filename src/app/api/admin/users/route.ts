import { NextRequest, NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import { hashPassword, verifyToken } from "@/lib/auth";

function session(request: NextRequest) {
  return verifyToken(request.cookies.get("admin_token")?.value || "");
}
function adminOnly(request: NextRequest) {
  const s = session(request);
  return s && s.role === "admin" ? s : null;
}

export async function GET(request: NextRequest) {
  const s = session(request);
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const db = await getMongoDb();
    const users = await db.collection("admin_users").find({}, { projection: { password_hash: 0 } }).sort({ createdAt: 1 }).toArray();
    return NextResponse.json({ users: users.map((u:any)=>({ id:String(u._id), name:String(u.name||"Team member"), email:String(u.email), role:String(u.role||"manager"), createdAt:u.createdAt })) });
  } catch (error) {
    console.error("Admin users lookup failed", error);
    return NextResponse.json({ error: "Could not load dashboard users." }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  const s = adminOnly(request);
  if (!s) return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  try {
    const { name, email, password, role } = await request.json();
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const cleanName = String(name || "").trim().slice(0, 100);
    const cleanRole = role === "admin" ? "admin" : "manager";
    if (!cleanName || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(normalizedEmail)) return NextResponse.json({ error: "Enter a valid name and email." }, { status: 400 });
    if (String(password || "").length < 12) return NextResponse.json({ error: "Temporary password must be at least 12 characters." }, { status: 400 });

    const db = await getMongoDb();
    const users = db.collection("admin_users");
    await users.createIndex({ email: 1 }, { unique: true }).catch(() => undefined);
    if (await users.findOne({ email: normalizedEmail })) return NextResponse.json({ error: "That user already exists." }, { status: 409 });

    const now = new Date();
    const result = await users.insertOne({ name: cleanName, email: normalizedEmail, password_hash: await hashPassword(String(password)), role: cleanRole, createdAt: now, updatedAt: now });
    await db.collection("activity_log").insertOne({ action:"admin.user_created", entityType:"admin_user", entityId:String(result.insertedId), actor:s.email, target:normalizedEmail, role:cleanRole, createdAt:now });
    return NextResponse.json({ ok:true, user:{ id:String(result.insertedId), name:cleanName, email:normalizedEmail, role:cleanRole } });
  } catch (error:any) {
    console.error("Admin user creation failed", error);
    if (error?.code === 11000) return NextResponse.json({ error: "That user already exists." }, { status: 409 });
    return NextResponse.json({ error: "Could not create dashboard user." }, { status: 500 });
  }
}
