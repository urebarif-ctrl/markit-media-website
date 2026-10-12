import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();
  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const searchTerm = `%${q.replace(/[%_]/g, "")}%`;

  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = getCloudflareContext();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d1 = (env as any).DB as { prepare(sql: string): { bind(...values: unknown[]): { all(): Promise<{ results: unknown[] }> } } };

    const { results } = await d1
      .prepare(
        `SELECT slug, title, excerpt, category, reading_time, published_at
         FROM blog_posts
         WHERE status = 'published' AND (title LIKE ?1 OR excerpt LIKE ?1 OR category LIKE ?1 OR tags LIKE ?1)
         ORDER BY
           CASE WHEN title LIKE ?1 THEN 0 ELSE 1 END,
           published_at DESC
         LIMIT 12`,
      )
      .bind(searchTerm)
      .all();

    return NextResponse.json(
      { results },
      {
        headers: {
          "Cache-Control": "public, max-age=300, s-maxage=300",
        },
      },
    );
  } catch {
    try {
      const { getDb } = await import("@/lib/db");
      const db = getDb();

      const results = db
        .prepare(
          `SELECT slug, title, excerpt, category, reading_time, published_at
           FROM blog_posts
           WHERE status = 'published' AND (title LIKE ? OR excerpt LIKE ? OR category LIKE ? OR tags LIKE ?)
           ORDER BY
             CASE WHEN title LIKE ? THEN 0 ELSE 1 END,
             published_at DESC
           LIMIT 12`,
        )
        .all(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);

      return NextResponse.json(
        { results },
        {
          headers: {
            "Cache-Control": "public, max-age=300, s-maxage=300",
          },
        },
      );
    } catch {
      return NextResponse.json({ results: [] });
    }
  }
}
