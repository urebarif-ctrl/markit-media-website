import { NextRequest, NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";

/* ---------- predefined roles (seeded on first GET if collection empty) ---------- */

const SYSTEM_ROLES = [
  {
    name: "Master Admin",
    slug: "master_admin",
    is_system: true,
    permissions: { dashboard: "full", crm: "full", content: "full", finance: "full", seo: "full", admin: "full" },
  },
  {
    name: "Admin",
    slug: "admin",
    is_system: true,
    permissions: { dashboard: "full", crm: "full", content: "full", finance: "full", seo: "full", admin: "write" },
  },
  {
    name: "Manager",
    slug: "manager",
    is_system: true,
    permissions: { dashboard: "read", crm: "write", content: "write", finance: "write", seo: "none", admin: "none" },
  },
  {
    name: "Team Member",
    slug: "team_member",
    is_system: true,
    permissions: { dashboard: "read", crm: "read", content: "write", finance: "none", seo: "none", admin: "none" },
  },
  {
    name: "Client",
    slug: "client",
    is_system: true,
    permissions: { dashboard: "none", crm: "none", content: "none", finance: "read", seo: "none", admin: "none" },
  },
];

const PERM_LEVELS = ["none", "read", "write", "full"] as const;
const MODULE_KEYS = ["dashboard", "crm", "content", "finance", "seo", "admin"] as const;

/* ---------- helpers ---------- */

function session(request: NextRequest) {
  return verifyToken(request.cookies.get("admin_token")?.value || "");
}

function isMasterAdmin(role: string) {
  return role === "master_admin";
}

function validPermissions(p: unknown): p is Record<string, string> {
  if (!p || typeof p !== "object") return false;
  const obj = p as Record<string, unknown>;
  for (const key of MODULE_KEYS) {
    if (typeof obj[key] !== "string" || !(PERM_LEVELS as readonly string[]).includes(obj[key] as string)) return false;
  }
  return true;
}

/* ---------- GET: list all roles (seed if empty) ---------- */

export async function GET(request: NextRequest) {
  const s = session(request);
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const db = await getMongoDb();
    const col = db.collection("roles");

    const count = await col.countDocuments();
    if (count === 0) {
      await col.insertMany(SYSTEM_ROLES.map((r) => ({ ...r, createdAt: new Date() })));
    }

    const roles = await col.find({}).sort({ is_system: -1, name: 1 }).toArray();
    return NextResponse.json({
      roles: roles.map((r: any) => ({
        id: String(r._id),
        name: r.name,
        slug: r.slug,
        is_system: !!r.is_system,
        permissions: r.permissions,
      })),
    });
  } catch (error) {
    console.error("Roles GET failed", error);
    return NextResponse.json({ error: "Could not load roles." }, { status: 503 });
  }
}

/* ---------- POST: create custom role (master_admin only) ---------- */

export async function POST(request: NextRequest) {
  const s = session(request);
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isMasterAdmin(s.role)) return NextResponse.json({ error: "Master admin access required" }, { status: 403 });

  try {
    const body = await request.json();
    const name = String(body.name || "").trim().slice(0, 60);
    if (!name) return NextResponse.json({ error: "Role name is required." }, { status: 400 });

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
    if (!slug) return NextResponse.json({ error: "Invalid role name." }, { status: 400 });

    if (!validPermissions(body.permissions)) {
      return NextResponse.json({ error: "Invalid permissions. Each module must be none, read, write, or full." }, { status: 400 });
    }

    const db = await getMongoDb();
    const col = db.collection("roles");

    if (await col.findOne({ slug })) return NextResponse.json({ error: "A role with that name already exists." }, { status: 409 });

    const now = new Date();
    const result = await col.insertOne({
      name,
      slug,
      is_system: false,
      permissions: body.permissions,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({
      ok: true,
      role: { id: String(result.insertedId), name, slug, is_system: false, permissions: body.permissions },
    });
  } catch (error) {
    console.error("Role creation failed", error);
    return NextResponse.json({ error: "Could not create role." }, { status: 500 });
  }
}

/* ---------- PUT: update a role's permissions (master_admin only) ---------- */

export async function PUT(request: NextRequest) {
  const s = session(request);
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isMasterAdmin(s.role)) return NextResponse.json({ error: "Master admin access required" }, { status: 403 });

  try {
    const body = await request.json();
    const slug = String(body.slug || "").trim();
    if (!slug) return NextResponse.json({ error: "Role slug is required." }, { status: 400 });

    if (!validPermissions(body.permissions)) {
      return NextResponse.json({ error: "Invalid permissions. Each module must be none, read, write, or full." }, { status: 400 });
    }

    const db = await getMongoDb();
    const col = db.collection("roles");

    const existing = await col.findOne({ slug });
    if (!existing) return NextResponse.json({ error: "Role not found." }, { status: 404 });

    const update: Record<string, unknown> = { permissions: body.permissions, updatedAt: new Date() };
    if (body.name && !existing.is_system) update.name = String(body.name).trim().slice(0, 60);

    await col.updateOne({ slug }, { $set: update });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Role update failed", error);
    return NextResponse.json({ error: "Could not update role." }, { status: 500 });
  }
}

/* ---------- DELETE: delete a custom role (master_admin only, not system) ---------- */

export async function DELETE(request: NextRequest) {
  const s = session(request);
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isMasterAdmin(s.role)) return NextResponse.json({ error: "Master admin access required" }, { status: 403 });

  try {
    const body = await request.json();
    const slug = String(body.slug || "").trim();
    if (!slug) return NextResponse.json({ error: "Role slug is required." }, { status: 400 });

    const db = await getMongoDb();
    const col = db.collection("roles");

    const existing = await col.findOne({ slug });
    if (!existing) return NextResponse.json({ error: "Role not found." }, { status: 404 });
    if (existing.is_system) return NextResponse.json({ error: "System roles cannot be deleted." }, { status: 403 });

    await col.deleteOne({ slug });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Role deletion failed", error);
    return NextResponse.json({ error: "Could not delete role." }, { status: 500 });
  }
}
