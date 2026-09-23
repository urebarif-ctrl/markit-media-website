import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();
  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const { getDb } = await import("@/lib/db");
    const db = getDb();

    const searchTerm = `%${q.replace(/[%_]/g, "")}%`;
    const results = db
      .prepare(
        `SELECT slug, title, excerpt, category, reading_time, published_at
         FROM blog_posts
         WHERE status = 'published' AND (title LIKE ? OR excerpt LIKE ? OR category LIKE ?)
         ORDER BY
           CASE WHEN title LIKE ? THEN 0 ELSE 1 END,
           published_at DESC
         LIMIT 12`,
      )
      .all(searchTerm, searchTerm, searchTerm, searchTerm);

    return NextResponse.json(
      { results },
      {
        headers: {
          "Cache-Control": "public, max-age=300, s-maxage=300",
        },
      },
    );
  } catch {
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
