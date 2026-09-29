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

  const body = unique.map((entry) => {
    const lastmod = dateValue(entry.lastModified);
    return [
      "<url>",
      `<loc>${escapeXml(entry.url)}</loc>`,
      lastmod ? `<lastmod>${lastmod}</lastmod>` : "",
      entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : "",
      typeof entry.priority === "number" ? `<priority>${entry.priority}</priority>` : "",
      "</url>",
    ].join("");
  }).join("");

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
}

export function renderSitemapIndex(urls: string[]) {
  const lastmod = new Date("2026-09-29").toISOString();
  const body = urls.map((url) =>
    `<sitemap><loc>${escapeXml(url)}</loc><lastmod>${lastmod}</lastmod></sitemap>`
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
