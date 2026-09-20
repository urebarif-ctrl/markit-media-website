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
  const days = Math.min(365, Math.max(1, Number(searchParams.get("days")) || 30));
  const since = new Date(Date.now() - days * 86400000).toISOString();

  const leadsCount = (db.prepare("SELECT COUNT(*) as count FROM leads WHERE created_at >= ?").get(since) as { count: number }).count;
  const newLeads = (db.prepare("SELECT COUNT(*) as count FROM leads WHERE status = 'new' AND created_at >= ?").get(since) as { count: number }).count;
  const postsCount = (db.prepare("SELECT COUNT(*) as count FROM blog_posts").get() as { count: number }).count;
  const publishedPosts = (db.prepare("SELECT COUNT(*) as count FROM blog_posts WHERE status = 'published'").get() as { count: number }).count;
  const mediaCount = (db.prepare("SELECT COUNT(*) as count FROM media").get() as { count: number }).count;

  const leadsByDay = db.prepare(`
    SELECT DATE(created_at) as date, COUNT(*) as count
    FROM leads WHERE created_at >= ?
    GROUP BY DATE(created_at)
    ORDER BY date
  `).all(since);

  const leadsByService = db.prepare(`
    SELECT service, COUNT(*) as count
    FROM leads WHERE service != '' AND created_at >= ?
    GROUP BY service
    ORDER BY count DESC
  `).all(since);

  const leadsByStatus = db.prepare(`
    SELECT status, COUNT(*) as count
    FROM leads
    GROUP BY status
    ORDER BY count DESC
  `).all();

  const recentLeads = db.prepare(`
    SELECT id, name, email, service, status, created_at
    FROM leads
    ORDER BY created_at DESC
    LIMIT 10
  `).all();

  const draftPosts = (db.prepare("SELECT COUNT(*) as count FROM blog_posts WHERE status = 'draft'").get() as { count: number }).count;
  const categoriesCount = (db.prepare("SELECT COUNT(DISTINCT category) as count FROM blog_posts WHERE category != ''").get() as { count: number }).count;

  const postsByCategory = db.prepare(`
    SELECT category, COUNT(*) as count
    FROM blog_posts WHERE category != ''
    GROUP BY category
    ORDER BY count DESC
  `).all();

  const recentPosts = db.prepare(`
    SELECT id, title, category, status, published_at
    FROM blog_posts
    ORDER BY COALESCE(published_at, created_at) DESC
    LIMIT 8
  `).all();

  return NextResponse.json({
    summary: {
      totalLeads: leadsCount,
      newLeads,
      totalPosts: postsCount,
      publishedPosts,
      totalMedia: mediaCount,
      draftPosts,
      categories: categoriesCount,
    },
    leadsByDay,
    leadsByService,
    leadsByStatus,
    recentLeads,
    postsByCategory,
    recentPosts,
    period: `${days} days`,
  });
}
