// Private preview of the merged portfolio (Instagram archive + existing case studies). Never indexed, never linked from the live site.
import raw from "@/data/preview-work/preview-work.json";
import { editorialFor } from "@/data/case-studies/editorial";
import { portfolioClientFor, getCaseStudy } from "@/lib/case-studies";
import { toGalleryItem, type GalleryItem } from "@/lib/portfolio";

export interface PMedia { id: string; w?: number; h?: number; date: string }
export interface PProject {
  slug: string;
  name: string;
  kind: "client" | "project" | "collaboration";
  verification: "verified" | "evidenced" | "review";
  industry?: string;
  live: string | null;
  scope: string[];
  paras: string[];
  flags?: string[];
  evidence?: string[];
  callebaut_note?: string;
  images: PMedia[];
  callebaut: PMedia[];
  videos: PMedia[];
  stories: PMedia[];
  first: string;
  last: string;
  counts: { images: number; callebaut: number; videos: number; stories: number };
}
export interface POffice { id: string; kind: "reel" | "post"; date: string; reach: number | null; cap: string }
interface Data { projects: PProject[]; office: POffice[]; excluded: { item: string; reason: string; files: number }[]; stats: Record<string, number> }
const data = raw as unknown as Data;

/** Preview media is served from this app's own assets (copied in at deploy time), never from the live R2 bucket. */
export const PM = "/preview-media";
export const img = (id: string) => `${PM}/i/${id}.webp`;
export const thumb = (id: string) => `${PM}/t/${id}.webp`;
export const poster = (id: string) => `${PM}/p/${id}.webp`;
export const video = (id: string) => `${PM}/v/${id}.mp4`;
export const story = (id: string) => `${PM}/s/${id}.webp`;
export const office = (id: string) => `${PM}/o/${id}.webp`;

export const RESERVED = ["event-partners", "office-life"];
export const allProjects = () => data.projects;
export const getProject = (slug: string) => data.projects.find((p) => p.slug === slug);
export const officeItems = () => data.office;
export const excludedItems = () => data.excluded;
export const KIND_LABEL: Record<PProject["kind"], string> = { client: "Client project", project: "Project", collaboration: "Event collaboration" };
export const VERIFY_LABEL: Record<PProject["verification"], string> = {
  verified: "Named in our own client posts",
  evidenced: "Visible in our archive; scope not documented",
  review: "Needs review before any publication",
};

/** Lede and gallery already on the live site for this project, so the preview shows old and new side by side. */
export function siteContext(slug: string) {
  const ed = editorialFor(slug);
  const rec = getCaseStudy(slug);
  const c = portfolioClientFor(slug);
  const ids = c ? Array.from(new Set(c.sections.flatMap((s) => s.media))) : [];
  const gallery: GalleryItem[] = ids.map(toGalleryItem);
  return { lede: ed?.lede ?? null, h1: rec?.h1 ?? null, gallery };
}

export function fmtDate(d: string) {
  if (!d) return "";
  const [y, m] = d.split("-");
  const mo = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][Number(m) - 1];
  return `${mo} ${y}`;
}
export function span(p: Pick<PProject, "first" | "last">) {
  const a = fmtDate(p.first), b = fmtDate(p.last);
  return !a ? "" : a === b ? a : `${a} to ${b}`;
}
