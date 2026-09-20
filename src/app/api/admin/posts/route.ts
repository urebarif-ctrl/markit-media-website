import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

function getAuth(request: NextRequest) {
  const cookie = request.cookies.get("admin_token")?.value;
  const header = request.headers.get("authorization")?.replace("Bearer ", "");
  const token = cookie || header;
  if (!token) return null;
  return verifyToken(token);
}

export async function GET(request: NextRequest) {
  const auth = getAuth(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 20));
  const status = searchParams.get("status") || "";
  const search = searchParams.get("search") || "";
  const offset = (page - 1) * limit;

  let where = "1=1";
  const params: (string | number)[] = [];

  if (status) {
    where += " AND status = ?";
    params.push(status);
  }
  const category = searchParams.get("category") || "";
  if (category) {
    where += " AND category = ?";
    params.push(category);
  }
  if (search) {
    where += " AND (title LIKE ? OR slug LIKE ?)";
    const s = `%${search}%`;
    params.push(s, s);
  }

  const total = (db.prepare(`SELECT COUNT(*) as count FROM blog_posts WHERE ${where}`).get(...params) as { count: number }).count;
  const posts = db.prepare(`SELECT * FROM blog_posts WHERE ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`).all(...params, limit, offset);

  return NextResponse.json({ posts, total, page, limit, totalPages: Math.ceil(total / limit) });
}

export async function POST(request: NextRequest) {
  const auth = getAuth(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { slug, title, excerpt, content, cover_image, category, tags, author, status, meta_title, meta_description, og_image, reading_time } = body;

  if (!slug || !title) {
    return NextResponse.json({ error: "Slug and title are required" }, { status: 400 });
  }

  const db = getDb();
  const existing = db.prepare("SELECT id FROM blog_posts WHERE slug = ?").get(slug);
  if (existing) {
    return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
  }

  const result = db.prepare(`
    INSERT INTO blog_posts (slug, title, excerpt, content, cover_image, category, tags, author, status, meta_title, meta_description, og_image, reading_time, published_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    slug, title,
    excerpt || "", content || "", cover_image || "",
    category || "", JSON.stringify(tags || []), author || "Markit Media",
    status || "draft", meta_title || "", meta_description || "",
    og_image || "", reading_time || 5,
    status === "published" ? new Date().toISOString() : null,
  );

  return NextResponse.json({ id: result.lastInsertRowid, success: true }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const auth = getAuth(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: "Post ID required" }, { status: 400 });

  const db = getDb();
  const allowedFields = ["slug", "title", "excerpt", "content", "cover_image", "category", "tags", "author", "status", "meta_title", "meta_description", "og_image", "reading_time"];
  const sets: string[] = [];
  const values: (string | number)[] = [];

  for (const [key, value] of Object.entries(updates)) {
    if (allowedFields.includes(key)) {
      sets.push(`${key} = ?`);
      values.push(key === "tags" ? JSON.stringify(value) : (value as string | number));
    }
  }

  if (updates.status === "published") {
    const post = db.prepare("SELECT published_at FROM blog_posts WHERE id = ?").get(id) as { published_at: string | null } | undefined;
    if (post && !post.published_at) {
      sets.push("published_at = ?");
      values.push(new Date().toISOString());
    }
  }

  sets.push("updated_at = CURRENT_TIMESTAMP");
  values.push(id);

  db.prepare(`UPDATE blog_posts SET ${sets.join(", ")} WHERE id = ?`).run(...values);
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const auth = getAuth(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "Post ID required" }, { status: 400 });

  const db = getDb();
  db.prepare("DELETE FROM blog_posts WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}
