import { legacySeoAliases, retiredLegacyArticleRedirects } from "@/data/legacy-seo-pages";
import { getDb, isWorkersRuntime } from "./db";

type D1Like = { prepare(sql: string): { bind(...values: unknown[]): { all(): Promise<{ results: unknown[] }> } } };

async function queryAll<T>(sql: string, params: unknown[] = []): Promise<T[]> {
  if (isWorkersRuntime()) {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = await getCloudflareContext({ async: true });
    const d1 = (env as unknown as { DB: D1Like }).DB;
    const { results } = await d1.prepare(sql).bind(...params).all();
    return results as T[];
  }
  return getDb().prepare(sql).all(...params) as T[];
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  tags: string;
  author: string;
  status: string;
  meta_title: string;
  meta_description: string;
  og_image: string;
  reading_time: number;
  noindex: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

const LISTING_COLUMNS = "id, slug, title, excerpt, cover_image, category, tags, author, status, meta_title, meta_description, og_image, reading_time, noindex, published_at, created_at, updated_at";

// Listings, related-article modules and counts only show indexable posts (COALESCE(noindex, 0) = 0): linking to noindexed posts
// from indexable pages wastes crawl budget and link equity. Noindexed posts stay reachable by their own URL.
// Posts whose slug has a configured redirect must not be linked from lists (links would redirect).
const REDIRECTED_SLUGS = new Set(
  [...legacySeoAliases, ...retiredLegacyArticleRedirects]
    .map((r) => r.source.match(/^\/(?:en\/)?blog\/([^/]+)$/)?.[1])
    .filter((x): x is string => Boolean(x)),
);
const notRedirected = (rows: BlogPost[]) => rows.filter((p) => !REDIRECTED_SLUGS.has(p.slug));

export async function getPublishedPosts(limit = 50, offset = 0): Promise<BlogPost[]> {
  return notRedirected(await queryAll<BlogPost>(
    `SELECT ${LISTING_COLUMNS}, '' as content FROM blog_posts WHERE status = 'published' AND COALESCE(noindex, 0) = 0 AND published_at IS NOT NULL ORDER BY published_at DESC LIMIT ? OFFSET ?`,
    [limit, offset],
  ));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const rows = await queryAll<BlogPost>(
    `SELECT * FROM blog_posts WHERE slug = ? AND status = 'published' LIMIT 1`,
    [slug],
  );
  return rows[0] ?? null;
}

export async function getPostsByCategory(category: string, limit = 50): Promise<BlogPost[]> {
  return notRedirected(await queryAll<BlogPost>(
    `SELECT ${LISTING_COLUMNS}, '' as content FROM blog_posts WHERE status = 'published' AND COALESCE(noindex, 0) = 0 AND category = ? ORDER BY published_at DESC LIMIT ?`,
    [category, limit],
  ));
}

export async function getCategoryPostCount(category: string): Promise<number> {
  const rows = await queryAll<{ count: number }>(
    `SELECT COUNT(*) as count FROM blog_posts WHERE status = 'published' AND COALESCE(noindex, 0) = 0 AND category = ?`,
    [category],
  );
  return rows[0]?.count ?? 0;
}

export async function getRelatedPosts(slug: string, category: string, limit = 3): Promise<BlogPost[]> {
  return notRedirected(await queryAll<BlogPost>(
    `SELECT ${LISTING_COLUMNS}, '' as content FROM blog_posts WHERE status = 'published' AND COALESCE(noindex, 0) = 0 AND slug != ? AND category = ? ORDER BY published_at DESC LIMIT ?`,
    [slug, category, limit],
  ));
}

// Slugs of posts that are noindexed. Cached per isolate for 10 minutes: post bodies use it to avoid linking to them.
let noindexedCache: { at: number; slugs: Set<string> } | null = null;
export async function getNoindexedSlugs(): Promise<Set<string>> {
  if (noindexedCache && Date.now() - noindexedCache.at < 10 * 60 * 1000) return noindexedCache.slugs;
  try {
    const rows = await queryAll<{ slug: string }>(`SELECT slug FROM blog_posts WHERE status = 'published' AND COALESCE(noindex, 0) = 1`);
    noindexedCache = { at: Date.now(), slugs: new Set(rows.map((r) => r.slug)) };
    return noindexedCache.slugs;
  } catch {
    // Keep the last good set (or an empty one) and retry in about a minute instead of on every request.
    const slugs = noindexedCache?.slugs ?? new Set<string>();
    noindexedCache = { at: Date.now() - (10 * 60 * 1000 - 60 * 1000), slugs };
    return slugs;
  }
}

export async function getAllCategories(): Promise<string[]> {
  const rows = await queryAll<{ category: string }>(
    `SELECT DISTINCT category FROM blog_posts WHERE status = 'published' AND COALESCE(noindex, 0) = 0 AND category != '' ORDER BY category`,
  );
  return rows.map((r) => r.category);
}

export async function getPublishedPostCount(): Promise<number> {
  const rows = await queryAll<{ count: number }>(
    `SELECT COUNT(*) as count FROM blog_posts WHERE status = 'published' AND COALESCE(noindex, 0) = 0`,
  );
  return rows[0]?.count ?? 0;
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  const rows = await queryAll<{ slug: string }>(
    `SELECT slug FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC`,
  );
  return rows.map((r) => r.slug);
}

export async function getAllPublishedSlugsWithDates(): Promise<{ slug: string; updated_at: string; published_at: string | null }[]> {
  return queryAll(
    `SELECT slug, updated_at, published_at FROM blog_posts WHERE status = 'published' AND COALESCE(noindex, 0) = 0 ORDER BY published_at DESC`,
  );
}
