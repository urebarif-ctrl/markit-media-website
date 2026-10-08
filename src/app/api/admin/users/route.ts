import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getMongoDb } from "@/lib/mongodb";
import { hashPassword, verifyToken } from "@/lib/auth";

function session(request: NextRequest) {
  return verifyToken(request.cookies.get("admin_token")?.value || "");
}
function adminOnly(request: NextRequest) {
  const s = session(request);
  return s && (s.role === "admin" || s.role === "master_admin") ? s : null;
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
    const cleanRole = String(role || "manager").trim();
    if (cleanRole === "master_admin" && s.role !== "master_admin") return NextResponse.json({ error: "Only a master admin can assign the master_admin role." }, { status: 403 });
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

export async function DELETE(request: NextRequest) {
  const s = adminOnly(request);
  if (!s) return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  try {
    const { id } = await request.json();
    if (!id || !ObjectId.isValid(String(id))) return NextResponse.json({ error: "Invalid user ID." }, { status: 400 });

    if (String(s.userId) === String(id)) return NextResponse.json({ error: "You cannot delete your own account." }, { status: 400 });

    const db = await getMongoDb();
    const users = db.collection("admin_users");
    const target = await users.findOne({ _id: new ObjectId(String(id)) });
    if (!target) return NextResponse.json({ error: "User not found." }, { status: 404 });

    if (target.role === "admin" || target.role === "master_admin") {
      const adminCount = await users.countDocuments({ role: { $in: ["admin", "master_admin"] } });
      if (adminCount <= 1) return NextResponse.json({ error: "Cannot delete the last admin user." }, { status: 400 });
    }

    await users.deleteOne({ _id: new ObjectId(String(id)) });
    const now = new Date();
    await db.collection("activity_log").insertOne({ action:"admin.user_deleted", entityType:"admin_user", entityId:String(id), actor:s.email, target:String(target.email), createdAt:now });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin user deletion failed", error);
    return NextResponse.json({ error: "Could not delete user." }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const s = adminOnly(request);
  if (!s) return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  try {
    const { id, name, email, role } = await request.json();
    if (!id || !ObjectId.isValid(String(id))) return NextResponse.json({ error: "Invalid user ID." }, { status: 400 });

    const isSelf = String(s.userId) === String(id);
    if (isSelf && role !== undefined) return NextResponse.json({ error: "You cannot change your own role." }, { status: 400 });
    if (role === "master_admin" && s.role !== "master_admin") return NextResponse.json({ error: "Only a master admin can assign the master_admin role." }, { status: 403 });

    const db = await getMongoDb();
    const users = db.collection("admin_users");
    const target = await users.findOne({ _id: new ObjectId(String(id)) });
    if (!target) return NextResponse.json({ error: "User not found." }, { status: 404 });

    const updates: Record<string, any> = { updatedAt: new Date() };
    if (name !== undefined) updates.name = String(name).trim().slice(0, 100);
    if (email !== undefined) {
      const normalizedEmail = String(email).trim().toLowerCase();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(normalizedEmail)) return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
      const existing = await users.findOne({ email: normalizedEmail, _id: { $ne: new ObjectId(String(id)) } });
      if (existing) return NextResponse.json({ error: "That email is already in use." }, { status: 409 });
      updates.email = normalizedEmail;
    }
    if (role !== undefined) updates.role = String(role).trim();

    await users.updateOne({ _id: new ObjectId(String(id)) }, { $set: updates });
    await db.collection("activity_log").insertOne({ action:"admin.user_updated", entityType:"admin_user", entityId:String(id), actor:s.email, target:String(target.email), changes:Object.keys(updates).filter(k=>k!=="updatedAt"), createdAt:new Date() });

    const updated = await users.findOne({ _id: new ObjectId(String(id)) }, { projection: { password_hash: 0 } });
    return NextResponse.json({ ok: true, user: { id: String(updated!._id), name: String(updated!.name || "Team member"), email: String(updated!.email), role: String(updated!.role || "manager"), createdAt: updated!.createdAt } });
  } catch (error) {
    console.error("Admin user update failed", error);
    return NextResponse.json({ error: "Could not update user." }, { status: 500 });
  }
}
