// QA for Markit Media case-study pages. Node 18+, no dependencies.
//
//   node docs/seo/qa-case-studies.mjs https://themarkitmedia.com                 (production)
//   node docs/seo/qa-case-studies.mjs https://<preview-url> --preview            (skips the X-Robots-Tag check)
//   add --flagged=docs/seo/flagged-pages.json to hold known gaps (copy not written yet / facts missing):
//       only the problem kinds listed under "holdable" can be held, and only for the pages listed.
//   add --json=out.json to save every finding.
//
// Rebuilt and extended from the plan's section 12.4 (21 Oct 2026). Differences from the plan's script:
//  * checks every work page that exists (hub links + sitemap), not only URLs already in work.xml, so a page that
//    is missing from the sitemap is caught instead of silently skipped;
//  * flags pages that are indexable but absent from the sitemap, and pages in the sitemap that are noindex;
//  * checks robots.txt (/ar/ /ur/ must not be disallowed) and the /ar/ canonical + X-Robots-Tag;
//  * schema checks read the @graph (Article, BreadcrumbList, WebPage, ImageObject) and the hero image id;
//  * a page may be held (flagged) when the facts needed to reach the word count are not available.
import { readFileSync, writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const BASE = (args.find((a) => /^https?:/.test(a)) || "https://themarkitmedia.com").replace(/\/$/, "");
const PREVIEW = args.includes("--preview");
const flaggedPath = (args.find((a) => a.startsWith("--flagged=")) || "").slice(10);
const jsonOut = (args.find((a) => a.startsWith("--json=")) || "").slice(7);
// Flagged pages: only the problem kinds listed in "holdable" can be held (missing facts / copy not yet written);
// anything else (canonical, schema, sitemap, robots, titles...) still fails the run for a flagged page.
const flaggedFile = flaggedPath ? JSON.parse(readFileSync(flaggedPath, "utf8")) : { holdable: [], pages: [] };
const FLAGGED = new Set(flaggedFile.pages.map((x) => x.slug));
const HOLDABLE = (flaggedFile.holdable || []).map((x) => new RegExp(x, "i"));

const ORIGIN = "https://themarkitmedia.com";
const DEFAULT_OG = "/images/branding/og-image.png";
const GENERIC_ALT = /\b(design|piece|creative|image|post|photo)\s*\d+$/i;
const MIN_WORDS = { featured: 600, client: 300 };
const FEATURED = new Set([
  "everest-snacks", "meezotech", "noorshad", "vuse", "cambridge-electrical", "minhaz-couture",
  "hubco", "one-homes", "elite", "pur-health", "american-auto-parts",
]);
const NO_WORD_MIN = /folio|social-media-designs|fashion-feed|branding-visual-identity|markit-|ureb-/;
const UA = { "user-agent": "Mozilla/5.0 (compatible; MarkitQA/1.0)" };

const get = async (u) => {
  const r = await fetch(u, { redirect: "manual", headers: UA });
  return { status: r.status, headers: r.headers, text: await r.text() };
};
const one = (re, s) => (s.match(re) || [])[1] || "";
const dec = (t) =>
  t
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
    .replace(/&amp;/g, "&").replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const strip = (h) =>
  h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ").trim();
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`${name}=(?:"([^"]*)"|'([^']*)')`, "i"));
  return m ? (m[1] ?? m[2] ?? "") : "";
};
const metaContent = (h, key, val) => {
  for (const m of h.matchAll(/<meta\b[^>]*>/gi)) {
    if (new RegExp(`${key}=["']${val}["']`, "i").test(m[0])) return dec(attr(m[0], "content"));
  }
  return "";
};

const problems = [];
const add = (slug, msg) => problems.push({ slug, msg, held: FLAGGED.has(slug) && HOLDABLE.some((re) => re.test(msg)) });

// ---------- sitemap ----------
const idx = await get(`${BASE}/sitemaps/work.xml`);
const sitemapUrls = [...idx.text.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
  loc: one(/<loc>([^<]+)<\/loc>/, m[1]),
  lastmod: one(/<lastmod>([^<]+)<\/lastmod>/, m[1]),
  images: (m[1].match(/<image:loc>/g) || []).length,
}));
const workInSitemap = sitemapUrls.filter((u) => /\/en\/work\/[^/]+$/.test(u.loc));
const lastmods = new Set(sitemapUrls.map((u) => u.lastmod.slice(0, 10)));
if (idx.status !== 200) add("sitemap", `work.xml HTTP ${idx.status}`);
if (workInSitemap.length > 5 && lastmods.size === 1) add("sitemap", "every <lastmod> is identical: use each page's real update date");
if (!sitemapUrls.some((u) => u.loc.endsWith("/en/work")) || !sitemapUrls.some((u) => u.loc.endsWith("/en/case-studies"))) add("sitemap", "/en/work and /en/case-studies must both be in work.xml");

const hubLinks = new Set();
for (const hub of ["/en/case-studies", "/en/work"]) {
  const r = await get(BASE + hub);
  if (r.status !== 200) { add(hub, `HTTP ${r.status}`); continue; }
  for (const m of r.text.matchAll(/href="(?:https:\/\/themarkitmedia\.com)?\/en\/work\/([a-z0-9-]+)\/?"/g)) hubLinks.add(m[1]);
}
const sitemapSlugs = new Set(workInSitemap.map((u) => u.loc.split("/").pop()));
const slugs = [...new Set([...hubLinks, ...sitemapSlugs])].sort();

// ---------- robots.txt and the /ar/ copies ----------
const robots = await get(`${BASE}/robots.txt`);
if (!PREVIEW) {
  if (/Disallow:\s*\/(ar|ur)\//i.test(robots.text)) add("robots.txt", "still disallows /ar/ or /ur/ (Google cannot see their noindex)");
  if (!/sitemap-index\.xml/.test(robots.text)) add("robots.txt", "sitemap-index.xml is not referenced");
}
{
  const ar = await get(`${BASE}/ar/work/elite`);
  const xr = ar.headers.get("x-robots-tag") || "";
  const canon = one(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i, ar.text);
  if (ar.status === 200) {
    if (!PREVIEW && !/noindex/i.test(xr)) add("/ar/work/elite", `x-robots-tag "${xr}" should contain noindex`);
    if (/nofollow/i.test(xr)) add("/ar/work/elite", `x-robots-tag "${xr}" says nofollow but the meta tag says follow`);
    if (canon && canon !== `${ORIGIN}/ar/work/elite`) add("/ar/work/elite", `noindexed copy should be self-canonical, got "${canon}"`);
  }
}

// ---------- pages ----------
const results = [];
for (const slug of slugs) {
  const path = `/en/work/${slug}`;
  const p = await get(BASE + path);
  const A = (m) => add(slug, m);
  if (p.status !== 200) { A(`HTTP ${p.status}`); continue; }
  const h = p.text;
  const title = dec(one(/<title[^>]*>([^<]*)<\/title>/i, h));
  const desc = metaContent(h, "name", "description");
  const canon = one(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i, h);
  const robotsMeta = metaContent(h, "name", "robots");
  const og = metaContent(h, "property", "og:image");
  const ogType = metaContent(h, "property", "og:type");
  const twCard = metaContent(h, "name", "twitter:card");
  const h1s = [...h.matchAll(/<h1[\s>][\s\S]*?<\/h1>/gi)].length;
  const main = one(/<main[^>]*>([\s\S]*?)<\/main>/i, h) || h;
  const words = strip(main).split(" ").length;
  const imgTags = [...main.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const alts = imgTags.filter((t) => /\balt=/i.test(t)).map((t) => dec(attr(t, "alt")));
  const related = new Set([...main.matchAll(/href=["'](?:https:\/\/themarkitmedia\.com)?\/en\/work\/([^"'#?\/]+)["']/gi)].map((m) => m[1]).filter((s) => s !== slug));
  const lds = [...h.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  const types = new Set();
  const nodes = [];
  for (const raw of lds) {
    try {
      const j = JSON.parse(raw.replace(/\\u003c/g, "<"));
      (j["@graph"] || [j]).forEach((n) => { nodes.push(n); [].concat(n["@type"]).forEach((t) => types.add(t)); });
    } catch { A("JSON-LD does not parse"); }
  }
  const indexable = !/noindex|none/i.test(robotsMeta) && !/noindex|none/i.test(p.headers.get("x-robots-tag") || "");
  const inSitemap = sitemapSlugs.has(slug);

  if (title.length < 30 || title.length > 60) A(`title length ${title.length}: "${title}"`);
  if (desc.length < 120 || desc.length > 160) A(`meta description length ${desc.length}`);
  if (canon !== BASE + path && canon !== ORIGIN + path) A(`canonical is "${canon}"`);
  if (indexable && !inSitemap) A("indexable page is missing from sitemaps/work.xml");
  if (!indexable && inSitemap) A(`in sitemap but not indexable (robots "${robotsMeta}")`);
  const xr = p.headers.get("x-robots-tag") || "";
  if (!PREVIEW && /noindex|none/i.test(xr)) A(`x-robots-tag "${xr}"`);
  if (h1s !== 1) A(`${h1s} H1 tags`);
  if (!og || og.endsWith(DEFAULT_OG)) A("default or missing og:image");
  if (ogType !== "article") A(`og:type is "${ogType}" (expected article)`);
  if (twCard !== "summary_large_image") A(`twitter:card is "${twCard}"`);
  if (imgTags.length !== alts.length) A(`${imgTags.length - alts.length} images without alt attribute`);
  const gen = alts.filter((a) => GENERIC_ALT.test(a.trim())).length;
  if (gen) A(`${gen} generic alt texts`);
  // The same picture shown twice (cover + gallery, or a related card) may repeat its alt; two DIFFERENT pictures may not.
  const imgKey = (t) => { const src = attr(t, "src") + " " + attr(t, "srcset"); return one(/portfolio\/v1\/([0-9a-f]{16})\//, src) || one(/(\/[^\s"?]+)/, src); };
  const seen = new Map();
  let dupAlt = 0;
  for (const t of imgTags) {
    const a = dec(attr(t, "alt")).trim();
    if (!a) continue;
    const k = imgKey(t);
    if (seen.has(a) && seen.get(a) !== k) dupAlt++;
    if (!seen.has(a)) seen.set(a, k);
  }
  if (dupAlt) A(`${dupAlt} different images share the same alt text`);
  if (alts.some((a) => a.length > 125)) A("alt text over 125 characters");
  const kind = FEATURED.has(slug) ? "featured" : "client";
  if (indexable && !NO_WORD_MIN.test(slug) && words < MIN_WORDS[kind]) A(`${words} words (< ${MIN_WORDS[kind]})`);
  if (related.size < 4) A(`${related.size} related case-study links (< 4)`);
  for (const t of ["Article", "BreadcrumbList"]) if (!types.has(t)) A(`missing ${t} schema`);
  if (!types.has("WebPage") && !types.has("CollectionPage")) A("missing WebPage/CollectionPage schema");
  const crumbs = nodes.filter((n) => n["@type"] === "BreadcrumbList").length;
  if (crumbs > 1) A(`${crumbs} BreadcrumbList nodes (expected 1)`);
  const art = nodes.find((n) => n["@type"] === "Article");
  if (art) {
    if (art.headline && art.headline.length > 110) A("Article.headline over 110 characters");
    if (!art.author || !art.publisher) A("Article without author/publisher @id");
  }
  if (nodes.some((n) => ["Review", "AggregateRating", "FAQPage"].includes(n["@type"]))) A("schema type the plan forbids (Review/AggregateRating/FAQPage)");
  if (/<video|youtube\.com\/embed|player\.vimeo/i.test(main) && !types.has("VideoObject")) A("video without VideoObject (needs verified uploadDate and duration)");
  if (/\{\{TODO|TODO:|lorem ipsum|REPLACE_WITH|keep the existing/i.test(h)) A("placeholder text left on page");
  results.push({ slug, words, imgs: imgTags.length, indexable, inSitemap });
}

// ---------- report ----------
const by = {};
for (const x of problems) (by[x.slug] ||= []).push(x);
let hard = 0;
for (const [k, xs] of Object.entries(by)) {
  console.log(`\n${k}${xs.every((x) => x.held) ? "  [HELD: flagged, copy/facts pending]" : ""}\n${xs.map((x) => ` - ${x.held ? "[held] " : ""}${x.msg}`).join("\n")}`);
  hard += xs.filter((x) => !x.held).length;
}
const held = problems.length - hard;
console.log(`\nChecked ${slugs.length} work pages (${sitemapSlugs.size} in sitemap): ${hard} problems${held ? `, ${held} held` : ""}.`);
if (jsonOut) writeFileSync(jsonOut, JSON.stringify({ base: BASE, checked: slugs.length, problems, results }, null, 1));
process.exit(hard ? 1 : 0);
