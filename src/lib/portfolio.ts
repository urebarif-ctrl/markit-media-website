import raw from "@/data/portfolio/site-data.json";

/**
 * Portfolio data layer (DRAFT). Single source of truth for client case studies and Our Work galleries.
 * Media records are canonical: one media id -> one set of image variants, referenced from any number of pages.
 * Image files are NOT in the repo: they are resolved from PORTFOLIO_MEDIA_BASE (local symlink in dev, R2 custom domain later).
 */
export type MediaKind = "social" | "fashion" | "food" | "logo";

export interface PortfolioMedia {
  c: string; // canonical client id
  k: MediaKind;
  r: string; // role: work | logo_board
  w: number;
  h: number;
  a: string; // alt text
  bg: string; // average colour (placeholder background)
  ws: number[]; // available variant widths
  d: string; // derivative key (first 16 hex of the original's SHA-256; client-independent, immutable)
  t: string[]; // gallery category tags
  f?: number; // featured rank (editorial shortlist)
  fl?: string[]; // review flags
}

export interface ClientSection {
  kind: MediaKind;
  label: string;
  gallery: string;
  media: string[];
}

export interface PortfolioClient {
  id: string;
  name: string;
  slug: string;
  type: "client" | "internal";
  aliases: string[];
  industry: string | null;
  summary: string;
  hero: string | null;
  status: "draft" | "held";
  hold_reason: string;
  existing_route: string | null;
  sections: ClientSection[];
  counts: { published: number; held: number };
  flags: string[];
  related: string[];
}

interface SiteData {
  media: Record<string, PortfolioMedia>;
  clients: PortfolioClient[];
  galleries: Record<string, string[]>;
}

const data = raw as unknown as SiteData;

/** New client pages stay noindex (and out of the sitemap) until the owner approves publication. */
export const PORTFOLIO_NEW_PAGES_INDEXABLE = false;

export const SITE_ORIGIN = "https://themarkitmedia.com";
export const MEDIA_BASE = (process.env.NEXT_PUBLIC_PORTFOLIO_MEDIA_BASE ?? "/portfolio-media").replace(/\/+$/, "");

export const CATEGORIES = {
  "logo-design": { label: "Logo Design", route: "/work/logo-folio" },
  branding: { label: "Branding & Visual Identity", route: "/work/branding-visual-identity" },
  "social-media": { label: "Social Media", route: "/work/social-media-designs" },
  "food-beverage": { label: "Food & Beverage", route: "/work/foodfolio" },
  fashion: { label: "Fashion & Apparel", route: "/work/fashion-feed" },
} as const;
export type CategorySlug = keyof typeof CATEGORIES;

export function getMedia(id: string): PortfolioMedia {
  const m = data.media[id];
  if (!m) throw new Error(`Unknown portfolio media id: ${id}`);
  return m;
}

export function allClients(): PortfolioClient[] {
  return data.clients;
}

export function getClient(slug: string): PortfolioClient | undefined {
  return data.clients.find((c) => c.slug === slug);
}

export function clientRoute(c: Pick<PortfolioClient, "slug" | "existing_route">): string {
  return c.existing_route ?? `/work/${c.slug}`;
}

/** Clients that get a page from the new dynamic route (no pre-existing /work/<slug> page). */
export function clientsWithNewPages(): PortfolioClient[] {
  return data.clients.filter((c) => c.status === "draft" && !c.existing_route);
}

export function publishedClients(): PortfolioClient[] {
  return data.clients.filter((c) => c.status === "draft");
}

export function mediaUrl(id: string, width: number): string {
  return `${MEDIA_BASE}/${getMedia(id).d}/${width}.webp`;
}

export function mediaVariant(id: string, target: number): number {
  const { ws } = getMedia(id);
  return ws.find((w) => w >= target) ?? ws[ws.length - 1];
}

export function srcSet(id: string): string {
  return getMedia(id).ws.map((w) => `${mediaUrl(id, w)} ${w}w`).join(", ");
}

export function absoluteMediaUrl(id: string, target = 1600): string {
  const u = mediaUrl(id, mediaVariant(id, target));
  return u.startsWith("http") ? u : `${SITE_ORIGIN}${u}`;
}

export interface GalleryItem {
  id: string;
  alt: string;
  w: number;
  h: number;
  bg: string;
  src: string;
  srcSet: string;
  full: string;
  client: string;
  clientName: string;
  href: string | null;
  cats: string[];
}

export function toGalleryItem(id: string): GalleryItem {
  const m = getMedia(id);
  const c = getClient(m.c);
  const page = c && c.status === "draft";
  return {
    id,
    alt: m.a,
    w: m.w,
    h: m.h,
    bg: m.bg,
    src: mediaUrl(id, mediaVariant(id, 960)),
    srcSet: srcSet(id),
    full: mediaUrl(id, mediaVariant(id, 1600)),
    client: m.c,
    clientName: c?.name ?? m.c,
    href: page && c ? clientRoute(c) : null,
    cats: m.t,
  };
}

export function galleryItems(slug: string): GalleryItem[] {
  return (data.galleries[slug] ?? []).map(toGalleryItem);
}

export function clientWorkTypes(c: PortfolioClient): string[] {
  return c.sections.map((s) => s.label);
}

export function trimDescription(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:]$/, "") + "…";
}
