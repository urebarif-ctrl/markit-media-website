import data from "./editorial.json";

/**
 * Editorial copy for case-study pages (data in editorial.json). One entry per page that has been rewritten.
 *
 * Rules (owner decisions 21 Oct 2026): only verified facts, no invented results, quotes, deliverables, locations,
 * client relationships or dates, and no filler to hit a word count. `sources` records where each fact came from so the
 * copy can be re-checked. A page without an entry keeps its current copy and is listed in the uncertainty ledger.
 * Whether a page may be indexed is NOT decided here: see indexing.json and scripts/seo/indexing-readiness.mjs.
 */
export interface EditorialSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface EditorialVideo {
  id: string;
  name: string;
  /** Required for a VideoObject; leave out until verified from YouTube Studio. */
  description?: string;
  uploadDate?: string;
  duration?: string;
}

export interface Editorial {
  lede: string;
  /** Project year, only when the owner has confirmed it. */
  projectYear?: number;
  /** Short deliverables line for the snapshot box, e.g. "1 identity board, 12 posts". */
  deliverables?: string;
  sections: EditorialSection[];
  videos?: EditorialVideo[];
  /** Where each fact came from (kept in the repo so reviewers can re-check). */
  sources: string[];
}

const EDITORIAL = data as unknown as Record<string, Editorial>;

export function editorialFor(slug: string): Editorial | undefined {
  return EDITORIAL[slug];
}
