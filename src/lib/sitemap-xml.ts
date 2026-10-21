import type { MetadataRoute } from "next";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function dateValue(value: string | Date | undefined) {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString();
}

export function renderUrlSet(entries: MetadataRoute.Sitemap) {
  const unique = Array.from(
    new Map(entries.map((entry) => [entry.url, entry])).values(),
  );

  const hasImages = unique.some((entry) => entry.images && entry.images.length > 0);
  const body = unique.map((entry) => {
    const lastmod = dateValue(entry.lastModified);
    const images = (entry.images ?? []).slice(0, 1000).map((src) => `<image:image><image:loc>${escapeXml(src)}</image:loc></image:image>`).join("");
    return [
      "<url>",
      `<loc>${escapeXml(entry.url)}</loc>`,
      lastmod ? `<lastmod>${lastmod}</lastmod>` : "",
      entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : "",
      typeof entry.priority === "number" ? `<priority>${entry.priority}</priority>` : "",
      images,
      "</url>",
    ].join("");
  }).join("");

  const ns = hasImages ? ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"' : "";
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${ns}>${body}</urlset>`;
}

export function renderSitemapIndex(urls: string[], lastmods: Record<string, Date> = {}) {
  const fallback = new Date("2026-10-13").toISOString();
  const body = urls.map((url) =>
    `<sitemap><loc>${escapeXml(url)}</loc><lastmod>${lastmods[url] ? lastmods[url].toISOString() : fallback}</lastmod></sitemap>`
  ).join("");

  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</sitemapindex>`;
}

export function xmlResponse(xml: string) {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
