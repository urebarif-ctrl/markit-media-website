// Featured videos: one YouTube Short per client, shown on its case-study page and, for QWENCH, on the homepage.
// The video facts (id, URLs, schema) live here once, so the player and its VideoObject schema cannot drift apart.

export interface FeaturedVideo {
  /** YouTube video id. */
  id: string;
  /** Accessible name of the player: iframe title and thumbnail alt text. */
  title: string;
  /** Sharp full-height 9:16 frame of the same video (the 4:3 hqdefault has black side bars). hqdefault is the fallback. */
  poster: string;
  /** Small heading above the player on the case-study page. */
  heading: string;
  /** One-line caption under the player on the case-study page. */
  caption: string;
  /** schema.org VideoObject properties (JSON-LD). */
  schema: {
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    duration: string;
    embedUrl: string;
    contentUrl: string;
  };
}

const QWENCH_ID = "i0M-9j-GK9c";

export const QWENCH_VIDEO: FeaturedVideo = {
  id: QWENCH_ID,
  title: "QWENCH Juice case study video by Markit Media",
  poster: `https://i.ytimg.com/vi/${QWENCH_ID}/oardefault.jpg`,
  heading: "Watch the QWENCH Juice case study",
  caption: "Website, social media, reels and Meta ads, blended into one fresh brand.",
  schema: {
    name: "QWENCH Juice Case Study | Markit Media",
    description: "See how Markit Media built the website, social media, reels and Meta ads for QWENCH Juice.",
    thumbnailUrl: `https://i.ytimg.com/vi/${QWENCH_ID}/hqdefault.jpg`,
    uploadDate: "2026-10-23",
    duration: "PT45S",
    embedUrl: `https://www.youtube.com/embed/${QWENCH_ID}`,
    contentUrl: `https://youtube.com/shorts/${QWENCH_ID}`,
  },
};

/** Case-study slug -> its featured video. A page without an entry renders exactly as before. */
const BY_SLUG = new Map<string, FeaturedVideo>([["qwench-juice-bar", QWENCH_VIDEO]]);

export function featuredVideoFor(slug: string): FeaturedVideo | undefined {
  return BY_SLUG.get(slug);
}

/** schema.org VideoObject, ready for <JsonLd data={...} />. */
export function videoObjectSchema(video: FeaturedVideo) {
  return { "@context": "https://schema.org", "@type": "VideoObject", ...video.schema };
}
