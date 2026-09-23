import { getDb } from "./db";

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
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export function getPublishedPosts(limit = 50, offset = 0): BlogPost[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT * FROM blog_posts WHERE status = 'published' AND published_at IS NOT NULL ORDER BY published_at DESC LIMIT ? OFFSET ?`
    )
    .all(limit, offset) as BlogPost[];
}

export function getPostBySlug(slug: string): BlogPost | null {
  const db = getDb();
  const post = db
    .prepare(`SELECT * FROM blog_posts WHERE slug = ? AND status = 'published'`)
    .get(slug) as BlogPost | undefined;
  return post ?? null;
}

export function getPostsByCategory(category: string, limit = 50): BlogPost[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT * FROM blog_posts WHERE status = 'published' AND category = ? ORDER BY published_at DESC LIMIT ?`
    )
    .all(category, limit) as BlogPost[];
}

export function getRelatedPosts(slug: string, category: string, limit = 3): BlogPost[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT * FROM blog_posts WHERE status = 'published' AND slug != ? AND category = ? ORDER BY published_at DESC LIMIT ?`
    )
    .all(slug, category, limit) as BlogPost[];
}

export function getAllCategories(): string[] {
  const db = getDb();
  const rows = db
    .prepare(
      `SELECT DISTINCT category FROM blog_posts WHERE status = 'published' AND category != '' ORDER BY category`
    )
    .all() as { category: string }[];
  return rows.map((r) => r.category);
}

export function getPublishedPostCount(): number {
  const db = getDb();
  const row = db
    .prepare(`SELECT COUNT(*) as count FROM blog_posts WHERE status = 'published'`)
    .get() as { count: number };
  return row.count;
}

export function getAllPublishedSlugs(): string[] {
  const db = getDb();
  const rows = db
    .prepare(`SELECT slug FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC`)
    .all() as { slug: string }[];
  return rows.map((r) => r.slug);
}

export function getAllPublishedSlugsWithDates(): { slug: string; updated_at: string; published_at: string | null }[] {
  const db = getDb();
  return db
    .prepare(`SELECT slug, updated_at, published_at FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC`)
    .all() as { slug: string; updated_at: string; published_at: string | null }[];
}
