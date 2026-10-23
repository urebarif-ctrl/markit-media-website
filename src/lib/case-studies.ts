import type { Metadata } from "next";
import raw from "@/data/case-studies/records.json";
import { editorialFor, type Editorial } from "@/data/case-studies/editorial";
import indexing from "@/data/case-studies/indexing.json";
import { CATEGORY_COVER, coverFor } from "@/lib/covers";
import { PORTFOLIO_NEW_PAGES_INDEXABLE, SITE_ORIGIN, absoluteMediaUrl, clientRoute, galleryItems, getClient, getMedia, mediaUrl, mediaVariant, srcSet } from "@/lib/portfolio";

/**
 * Case-study data source (single source of truth for SEO fields). The hub, the work pages, the sitemap,
 * the JSON-LD and the related-links block all read from here. Media (images, alt text, galleries) stays in
 * src/data/portfolio/site-data.json; editorial copy lives in src/data/case-studies/editorial.ts.
 *
 * Rule: a location or website is rendered/linked only when `locationVerified` / `websiteVerified` is true.
 * Everything else stays in the uncertainty ledger (docs/seo/uncertainty-ledger.csv) until the owner confirms it.
 */
export interface StructuredLocation {
  city?: string;
  region?: string;
  country?: string;
}

export interface CaseStudyRecord {
  slug: string;
  kind: "featured" | "client" | "inhouse" | "collection";
  name: string;
  routeType: "static" | "dynamic";
  industryLabel: string;
  servicesLabel: string[];
  serviceLinks: string[];
  industryLinks: string[];
  locationLinks: string[];
  related: string[];
  keywords: string[];
  title: string;
  h1: string;
  metaDescription: string;
  locationVerified: boolean;
  location: string | null;
  locations: StructuredLocation[];
  websiteVerified: boolean;
  website: string | null;
  dateModified: string | null;
  datePublished: string | null;
  datePublishedStatus: string;
}

const records = raw as unknown as CaseStudyRecord[];
const bySlug = new Map(records.map((r) => [r.slug, r]));

export const ORG_ID = `${SITE_ORIGIN}/#organization`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

export function allCaseStudies(): CaseStudyRecord[] {
  return records;
}

export function getCaseStudy(slug: string): CaseStudyRecord | undefined {
  return bySlug.get(slug);
}

/** Route slug -> portfolio client id (the Cambridge page keeps its old data id). */
const CLIENT_ID: Record<string, string> = { "cambridge-electrical": "cambridge" };
export function portfolioClientFor(slug: string) {
  return getClient(CLIENT_ID[slug] ?? slug);
}

export function caseStudyPath(slug: string, locale = "en"): string {
  return `/${locale}/work/${slug}`;
}

export function caseStudyUrl(slug: string, locale = "en"): string {
  return `${SITE_ORIGIN}${caseStudyPath(slug, locale)}`;
}

/**
 * Indexing decision per page, read from indexing.json (written by scripts/seo/indexing-readiness.mjs after an individual
 * readiness check; never inferred from a word count). Pages that are currently live as indexable keep that status.
 * `PORTFOLIO_NEW_PAGES_INDEXABLE` stays the global kill switch for the new client pages.
 */
export function isCaseStudyIndexable(slug: string): boolean {
  const r = bySlug.get(slug);
  if (!r) return false;
  const decision = (indexing as Record<string, { index: boolean }>)[slug];
  if (!decision?.index) return false;
  if (r.routeType === "static") return true;
  const c = portfolioClientFor(slug);
  return !!c && PORTFOLIO_NEW_PAGES_INDEXABLE;
}

export interface CardImage {
  src: string;
  srcSet?: string;
  alt: string;
  w: number;
  h: number;
  bg: string;
}

const CATEGORY_PAGES: Record<string, string> = {
  "fashion-feed": CATEGORY_COVER.fashion,
  "social-media-designs": CATEGORY_COVER.social,
  foodfolio: CATEGORY_COVER.food,
  "logo-folio": CATEGORY_COVER.logo,
};

function categoryCoverId(slug: string): string | null {
  if (CATEGORY_PAGES[slug]) return CATEGORY_PAGES[slug];
  if (slug === "branding-visual-identity") return galleryItems("branding")[0]?.id ?? null;
  return null;
}

/** Cover for cards and social sharing: always a real image of the work on that page. */
export function imageFor(slug: string, target = 960): CardImage | null {
  const cover = coverFor(slug);
  if (cover) return { src: cover.src, srcSet: cover.srcSet, alt: cover.alt, w: cover.w, h: cover.h, bg: cover.bg };
  const catId = categoryCoverId(slug);
  const c = portfolioClientFor(slug);
  const id = catId ?? c?.hero ?? null;
  if (!id) return null;
  const m = getMedia(id);
  return { src: mediaUrl(id, mediaVariant(id, target)), srcSet: srcSet(id), alt: m.a, w: m.w, h: m.h, bg: m.bg };
}

function ogImageFor(slug: string): { url: string; width: number; height: number; alt: string } | null {
  const cover = coverFor(slug);
  if (cover) {
    const url = cover.src.startsWith("http") ? cover.src : `${SITE_ORIGIN}${cover.src}`;
    return { url, width: cover.w, height: cover.h, alt: cover.alt };
  }
  const catId = categoryCoverId(slug);
  const id = catId ?? portfolioClientFor(slug)?.hero ?? null;
  if (!id) return null;
  const m = getMedia(id);
  return { url: absoluteMediaUrl(id, 1600), width: Math.min(m.w, 1600), height: Math.round((Math.min(m.w, 1600) / m.w) * m.h), alt: m.a };
}

export function caseStudyMetadata(slug: string, locale = "en"): Metadata {
  const r = bySlug.get(slug);
  if (!r) return {};
  const url = caseStudyUrl(slug, locale);
  const og = ogImageFor(slug);
  const indexable = locale === "en" && isCaseStudyIndexable(slug);
  return {
    title: { absolute: r.title },
    description: r.metaDescription,
    keywords: r.keywords,
    alternates: { canonical: url },
    // Leave `robots` unset when indexable so the root layout decides (production vs preview).
    ...(indexable ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      type: "article",
      url,
      title: r.title.replace(/ \| Markit Media$/, ""),
      description: r.metaDescription,
      siteName: "Markit Media",
      ...(r.dateModified ? { modifiedTime: r.dateModified } : {}),
      ...(r.datePublished ? { publishedTime: r.datePublished } : {}),
      ...(og ? { images: [{ url: og.url, width: og.width, height: og.height, alt: og.alt }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: r.title.replace(/ \| Markit Media$/, ""),
      description: r.metaDescription,
      ...(og ? { images: [og.url] } : {}),
    },
  };
}

/** Related case studies: the hand-picked list from the data source, resolved to records that exist. */
export function relatedCaseStudies(slug: string, max = 4): CaseStudyRecord[] {
  const r = bySlug.get(slug);
  if (!r) return [];
  return r.related.map((s) => bySlug.get(s)).filter((x): x is CaseStudyRecord => !!x && x.slug !== slug).slice(0, max);
}

const SERVICE_NAMES: Record<string, string> = {
  "/services/branding/logo-design": "Logo Design",
  "/services/branding/visual-identity": "Visual Identity",
  "/services/branding": "Branding",
  "/services/social-media": "Social Media Marketing",
  "/services/social-media/content-creation": "Content Creation",
  "/services/video-production": "Video Production",
  "/services/video-production/motion-graphics": "Motion Graphics",
  "/services/video-production/motion-design": "Motion Design",
  "/services/video-production/reels-short-form": "Reels and Short-Form Video",
  "/services/video-production/commercial-production": "Commercial Production",
  "/services/website-development": "Website Development",
  "/services/photography": "Photography",
  "/services/video-production/animation": "Animation",
};

export function serviceName(path: string): string {
  return SERVICE_NAMES[path] ?? path.split("/").filter(Boolean).slice(-1)[0].replace(/-/g, " ");
}

export function industryName(path: string): string {
  return path.split("/").filter(Boolean).slice(-1)[0].replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Client Organization node: url / sameAs / address only when verified. */
function clientNode(r: CaseStudyRecord) {
  const addr = r.locationVerified
    ? r.locations.map((l) => ({
        "@type": "PostalAddress",
        ...(l.city ? { addressLocality: l.city } : {}),
        ...(l.region ? { addressRegion: l.region } : {}),
        ...(l.country ? { addressCountry: l.country } : {}),
      }))
    : [];
  return {
    "@type": "Organization",
    "@id": `${caseStudyUrl(r.slug)}#client`,
    name: r.name,
    ...(r.websiteVerified && r.website ? { url: r.website } : {}),
    ...(addr.length ? { address: addr.length === 1 ? addr[0] : addr } : {}),
  };
}

/**
 * One JSON-LD @graph per work page: WebPage, Article, client Organization, hero ImageObject, BreadcrumbList,
 * Services mentioned, and VideoObjects (only for videos with complete, verified metadata).
 * Never emits Review/AggregateRating/FAQPage, and no field without real data behind it.
 */
export function caseStudyGraph(slug: string, locale = "en"): Record<string, unknown> | null {
  const r = bySlug.get(slug);
  if (!r) return null;
  const url = caseStudyUrl(slug, locale);
  const og = ogImageFor(slug);
  const ed = editorialFor(slug);
  const isPortfolioCollection = r.kind === "collection";
  const crumbs = isPortfolioCollection
    ? [
        { name: "Home", item: `${SITE_ORIGIN}/${locale}` },
        { name: "Work", item: `${SITE_ORIGIN}/${locale}/work` },
        { name: r.name },
      ]
    : [
        { name: "Home", item: `${SITE_ORIGIN}/${locale}` },
        { name: "Work", item: `${SITE_ORIGIN}/${locale}/work` },
        { name: "Case Studies", item: `${SITE_ORIGIN}/${locale}/case-studies` },
        { name: r.name },
      ];
  const graph: Record<string, unknown>[] = [
    {
      "@type": isPortfolioCollection ? "CollectionPage" : "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: r.title,
      description: r.metaDescription,
      inLanguage: locale,
      isPartOf: { "@id": WEBSITE_ID },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      ...(og ? { primaryImageOfPage: { "@id": `${url}#hero` } } : {}),
      ...(r.datePublished ? { datePublished: r.datePublished } : {}),
      ...(r.dateModified ? { dateModified: r.dateModified } : {}),
    },
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: r.h1,
      description: r.metaDescription,
      articleSection: isPortfolioCollection ? "Portfolio" : "Case Studies",
      keywords: r.keywords.join(", "),
      ...(og ? { image: [{ "@id": `${url}#hero` }] } : {}),
      ...(r.datePublished ? { datePublished: r.datePublished } : {}),
      ...(r.dateModified ? { dateModified: r.dateModified } : {}),
      author: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      mainEntityOfPage: { "@id": `${url}#webpage` },
      ...(isPortfolioCollection ? {} : { about: { "@id": `${url}#client` } }),
      ...(r.serviceLinks.length
        ? { mentions: r.serviceLinks.map((p) => ({ "@type": "Service", name: serviceName(p), url: `${SITE_ORIGIN}/${locale}${p}` })) }
        : {}),
    },
  ];
  if (!isPortfolioCollection) graph.push(clientNode(r));
  if (og) {
    graph.push({
      "@type": "ImageObject",
      "@id": `${url}#hero`,
      url: og.url,
      width: og.width,
      height: og.height,
      caption: og.alt,
      creator: { "@id": ORG_ID },
    });
  }
  for (const [i, v] of (ed?.videos ?? []).entries()) {
    if (!v.uploadDate || !v.duration || !v.description) continue; // incomplete: omit rather than guess
    graph.push({
      "@type": "VideoObject",
      "@id": `${url}#video-${i + 1}`,
      name: v.name,
      description: v.description,
      thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`,
      uploadDate: v.uploadDate,
      duration: v.duration,
      embedUrl: `https://www.youtube.com/embed/${v.id}`,
    });
  }
  graph.push({
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, ...("item" in c && c.item ? { item: c.item } : {}) })),
  });
  return { "@context": "https://schema.org", "@graph": graph };
}

export interface SitemapRow {
  url: string;
  lastModified?: Date;
  images: string[];
}

function galleryImages(slug: string): string[] {
  const c = portfolioClientFor(slug);
  const ids = c ? c.sections.flatMap((s) => s.media) : [];
  return Array.from(new Set(ids)).slice(0, 1000).map((id) => absoluteMediaUrl(id, 1600));
}

/** Work-page rows for the sitemap: every indexable page, with its real modification date and gallery images. */
export function caseStudySitemapRows(): SitemapRow[] {
  return records
    .filter((r) => isCaseStudyIndexable(r.slug))
    .map((r) => ({ url: caseStudyUrl(r.slug), lastModified: r.dateModified ? new Date(r.dateModified) : undefined, images: galleryImages(r.slug) }));
}

export function hubLastModified(): Date {
  const dates = records.map((r) => r.dateModified).filter((d): d is string => !!d).sort();
  return new Date(dates[dates.length - 1]);
}

export function caseStudyDisplayName(r: CaseStudyRecord): string {
  return r.name;
}

export function relatedAnchor(r: CaseStudyRecord): string {
  const first = r.servicesLabel[0];
  return first ? `${r.name} - ${first.toLowerCase()}` : r.name;
}

const INDUSTRY_GROUPS: Array<[string, RegExp]> = [
  ["Restaurants & food", /restaurant|steakhouse|lounge|pizza|bakery|juice|catering|jerky|chef|food|bake/i],
  ["Healthcare", /clinic|health|treatment|diagnostic|veterinar|pediatric|pain|wellness|addiction/i],
  ["Real estate", /real estate/i],
  ["Fashion & beauty", /fashion|apparel|sleepwear|beauty|salon|barber/i],
  ["Technology", /\bIT\b|technology|app brand|ev charging|saas/i],
  ["Nonprofit", /nonprofit/i],
  ["Retail & e-commerce", /retail|hardware|accessor|baby|household|consumer|appliance|fuel|flask|product|manufactur/i],
];

export function industryGroup(r: CaseStudyRecord): string {
  if (!r.industryLabel || /^confirm/i.test(r.industryLabel)) return "Other";
  const hit = INDUSTRY_GROUPS.find(([, re]) => re.test(r.industryLabel));
  return hit ? hit[0] : "Other";
}

export const INDUSTRY_FILTERS = ["Restaurants & food", "Healthcare", "Real estate", "Retail & e-commerce", "Technology", "Fashion & beauty", "Nonprofit"];

/** Region used by the Location filter. Only verified locations count; everything else is simply not filterable by place. */
export function locationRegion(r: CaseStudyRecord): "USA" | "Pakistan" | null {
  if (!r.locationVerified || !r.location) return null;
  if (/pakistan/i.test(r.location)) return "Pakistan";
  if (/texas|california/i.test(r.location)) return "USA";
  return null;
}

/** Counts used by the hub copy. Taken from the data source so the page can never drift from it. */
export function hubCounts() {
  const featured = records.filter((r) => r.kind === "featured").length;
  const client = records.filter((r) => r.kind === "client").length;
  const inhouse = records.filter((r) => r.kind === "inhouse").length;
  return { featured, client, inhouse, brands: featured + client };
}

export function hubMetadata(hub: "case-studies" | "work", locale = "en"): Metadata {
  const url = `${SITE_ORIGIN}/${locale}/${hub}`;
  const { brands } = hubCounts();
  const title =
    hub === "case-studies" ? "Case Studies: Branding, Social & Web Work | Markit Media" : "Portfolio: Design, Video & Web Projects | Markit Media";
  const description =
    hub === "case-studies"
      ? `${brands} client case studies by Markit Media: logos, social media, video and websites for brands in Houston, Sugar Land, Karachi, Lahore and beyond.`
      : "Markit Media's visual portfolio of logo design, branding, social media, video and website projects. For the written client stories, see our case studies.";
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    ...(locale === "en" ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      type: "website",
      url,
      title: title.replace(/ \| Markit Media$/, ""),
      description,
      siteName: "Markit Media",
      images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media: full-stack digital marketing agency" }],
    },
  };
}

/** CollectionPage + ItemList (every work page, in display order) + BreadcrumbList for /case-studies. */
export function hubGraph(locale = "en"): Record<string, unknown> {
  const url = `${SITE_ORIGIN}/${locale}/case-studies`;
  const featured = records.filter((r) => r.kind === "featured");
  const clients = records.filter((r) => r.kind === "client").sort((a, b) => a.name.localeCompare(b.name));
  const inhouse = records.filter((r) => r.kind === "inhouse");
  const collections = records.filter((r) => r.kind === "collection");
  const ordered = [...featured, ...clients, ...inhouse, ...collections];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: "Case Studies: Branding, Social & Web Work | Markit Media",
        inLanguage: locale,
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#list` },
        dateModified: hubLastModified().toISOString().slice(0, 10),
      },
      {
        "@type": "ItemList",
        "@id": `${url}#list`,
        numberOfItems: ordered.length,
        itemListElement: ordered.map((r, i) => ({ "@type": "ListItem", position: i + 1, name: r.name, url: caseStudyUrl(r.slug, locale) })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/${locale}` },
          { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_ORIGIN}/${locale}/work` },
          { "@type": "ListItem", position: 3, name: "Case Studies" },
        ],
      },
    ],
  };
}

export type ServiceGroup = { key: string; label: string; match: (path: string) => boolean };
export const SERVICE_GROUPS: ServiceGroup[] = [
  { key: "branding", label: "Branding and logo design", match: (p) => p.startsWith("/services/branding") },
  { key: "social", label: "Social media and content", match: (p) => p.startsWith("/services/social-media") },
  { key: "video", label: "Video production and motion", match: (p) => p.startsWith("/services/video-production") },
  { key: "web", label: "Website development", match: (p) => p.startsWith("/services/website-development") },
];

export type { Editorial };
export { titleCase, clientRoute };
