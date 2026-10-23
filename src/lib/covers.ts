import { getClient, getMedia, mediaUrl, mediaVariant, srcSet } from "@/lib/portfolio";

/**
 * Case-study covers. A cover is always a real image of the work shown on the case study's own page:
 *  - clients with design work in the portfolio data use that artwork (the same pieces the inner page shows);
 *  - video-led case studies use a still from the project's own video (the one embedded on the inner page).
 */
export interface CoverImage {
  src: string;
  srcSet?: string;
  alt: string;
  w: number;
  h: number;
  bg: string;
  fit: "cover" | "contain";
  zoom?: number;
}

type Spec =
  | { client: string; pick: "board" | "hero" }
  | { yt: string; alt: string; zoom?: number }
  | { img: string; alt: string; w: number; h: number; bg: string };

const COVER_SPECS: Record<string, Spec> = {
  meezotech: { client: "meezotech", pick: "board" },
  "minhaz-couture": { client: "minhaz-couture", pick: "board" },
  "pur-health": { client: "pur-health", pick: "board" },
  "american-auto-parts": { client: "american-auto-parts", pick: "board" },
  "cambridge-electrical": { client: "cambridge", pick: "hero" },
  elite: { client: "elite", pick: "hero" },
  chefiality: { client: "chefiality", pick: "hero" },
  noorshad: { yt: "276ppothTQE", alt: "NoorShad property film, still from the project video" },
  vuse: { yt: "3a9vbqiNmAM", alt: "Vuse social reel, still from the project video" },
  hubco: { yt: "TGH1Rgpuzf4", alt: "HUBCO logo animation, still from the project video" },
  "one-homes": { yt: "Lntsa25Xsk4", alt: "One Homes film, still from the project video" },
  "my-fresh-fruits": { yt: "MLFuqpqidHQ", alt: "My Fresh Fruits logo animation, still from the project video", zoom: 1.22 },
  "everest-snacks": { img: "/images/work/everest-snacks/cover.webp", alt: "Everest Snacks home page on desktop: the headline Fuel your adventure beside a man holding an energy bar", w: 1440, h: 810, bg: "#3b7792" },
};

/** Display names used by existing case-study pages -> cover key. */
const NAME_TO_KEY: Record<string, string> = {
  MeezoTech: "meezotech",
  NoorShad: "noorshad",
  Vuse: "vuse",
  "Cambridge Electrical Appliances": "cambridge-electrical",
  "Minhaz Couture": "minhaz-couture",
  HUBCO: "hubco",
  "One Homes": "one-homes",
  Elite: "elite",
  "Pur Health": "pur-health",
  "American Auto Parts": "american-auto-parts",
  Chefiality: "chefiality",
  "My Fresh Fruits": "my-fresh-fruits",
  "Everest Snacks": "everest-snacks",
};

export function coverKeyForName(name: string): string | undefined {
  return NAME_TO_KEY[name];
}

export function coverFor(key: string | undefined): CoverImage | null {
  const spec = key ? COVER_SPECS[key] : undefined;
  if (!spec) return null;
  if ("yt" in spec) {
    return { src: `https://i.ytimg.com/vi/${spec.yt}/maxresdefault.jpg`, alt: spec.alt, w: 1280, h: 720, bg: "#111111", fit: "cover", zoom: spec.zoom };
  }
  if ("img" in spec) return { src: spec.img, alt: spec.alt, w: spec.w, h: spec.h, bg: spec.bg, fit: "cover" };
  const c = getClient(spec.client);
  if (!c) return null;
  const id = spec.pick === "board" ? (c.sections.find((s) => s.kind === "logo")?.media[0] ?? c.hero) : c.hero;
  if (!id) return null;
  const m = getMedia(id);
  const ratio = m.w / m.h;
  return {
    src: mediaUrl(id, mediaVariant(id, 960)),
    srcSet: srcSet(id),
    alt: m.a,
    w: m.w,
    h: m.h,
    bg: m.bg,
    fit: Math.abs(ratio - 16 / 9) < 0.25 ? "cover" : "contain",
  };
}

/** Category covers: each is a piece shown near the top of that category's own gallery page. */
export const CATEGORY_COVER = {
  fashion: "minhaz-couture-fashion-13",
  food: "elite-food-01",
  social: "texas-super-league-social-01",
  logo: "pakhlanze-logo-02",
} as const;

/** Homepage hero showcase: four real case studies, one per service line, each linking to its own case-study page. */
export const HERO_SHOWCASE = [
  { id: "north-charge-social-04", client: "north-charge", label: "Social Media", name: "North Charge", href: "/work/north-charge" },
  { id: "find-my-apparel-fashion-01", client: "find-my-apparel", label: "Fashion", name: "Find My Apparel", href: "/work/find-my-apparel" },
  { id: "tourao-brazilian-steakhouse-food-01", client: "tourao-brazilian-steakhouse", label: "Food & Beverage", name: "Tourão", href: "/work/tourao-brazilian-steakhouse" },
  { id: "meezotech-logo-02", client: "meezotech", label: "Branding", name: "MeezoTech", href: "/work/meezotech" },
] as const;
