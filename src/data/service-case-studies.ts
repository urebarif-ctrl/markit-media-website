/**
 * Verified case studies for service pages.
 *
 * Every project below is an existing page under /work. `services` copies the tags that the project's own page publishes
 * (`services={[...]}` in src/app/[lang]/work/<slug>/page.tsx) and `summary` only restates what that page says it delivered.
 * No project is attached to a service its own page does not evidence, and the build platform is never stated: none of the
 * project pages says which CMS a website was built on.
 */
export type CaseCover = { kind: "case"; key: string } | { kind: "media"; id: string };

export interface VerifiedProject {
  client: string;
  href: string;
  label: string;
  services: string[];
  summary: string;
  cover: CaseCover;
}

export const PROJECTS: Record<string, VerifiedProject> = {
  elite: {
    client: "Elite",
    href: "/work/elite",
    label: "Website, social and video",
    services: ["Website Development", "Social Media Marketing", "Video Production"],
    summary: "Website development and social media content delivered as one package, with a showcase reel for the site.",
    cover: { kind: "case", key: "elite" },
  },
  "pur-health": {
    client: "Pur Health",
    href: "/work/pur-health",
    label: "Website and social",
    services: ["Website Development", "Social Media Marketing"],
    summary: "Website development and social media content for a healthcare and wellness brand.",
    cover: { kind: "case", key: "pur-health" },
  },
  "minhaz-couture": {
    client: "Minhaz Couture",
    href: "/work/minhaz-couture",
    label: "Website, social and video",
    services: ["Website Development", "Social Media Marketing", "Video Production"],
    summary: "A custom website designed and developed for a fashion brand, with social media reels produced alongside it.",
    cover: { kind: "case", key: "minhaz-couture" },
  },
  noorshad: {
    client: "NoorShad",
    href: "/work/noorshad",
    label: "Video production",
    services: ["Video Production", "Property Tours", "Testimonial Videos", "Content Strategy"],
    summary: "A multi-video engagement for a real estate brand: property tours, client testimonials and home-buying guides.",
    cover: { kind: "case", key: "noorshad" },
  },
  "one-homes": {
    client: "One Homes",
    href: "/work/one-homes",
    label: "Video production",
    services: ["Video Production", "Property Walkthroughs"],
    summary: "A property walkthrough and commercial video for the Amaya Residences development, with professional editing and post-production.",
    cover: { kind: "case", key: "one-homes" },
  },
  "american-auto-parts": {
    client: "American Auto Parts",
    href: "/work/american-auto-parts",
    label: "Video production",
    services: ["Video Production", "Digital Content"],
    summary: "A long-running partnership producing video content for the automotive parts and accessories market.",
    cover: { kind: "case", key: "american-auto-parts" },
  },
  hubco: {
    client: "HUBCO",
    href: "/work/hubco",
    label: "Logo animation and video",
    services: ["Branding", "Logo Animation", "Video Production"],
    summary: "Logo animation and commercial video production for an energy company.",
    cover: { kind: "case", key: "hubco" },
  },
  vuse: {
    client: "Vuse",
    href: "/work/vuse",
    label: "Social content and video",
    services: ["Social Media Marketing", "Video Production", "Digital Content"],
    summary: "Social media reels and digital content produced as part of an ongoing creative partnership.",
    cover: { kind: "case", key: "vuse" },
  },
  "cambridge-electrical": {
    client: "Cambridge Electrical Appliances",
    href: "/work/cambridge-electrical",
    label: "Social campaigns and video",
    services: ["Social Media Marketing", "Video Production", "Content Strategy", "Seasonal Campaigns"],
    summary: "Seasonal social media campaigns with video reels for summer and winter product ranges.",
    cover: { kind: "case", key: "cambridge-electrical" },
  },
  meezotech: {
    client: "MeezoTech",
    href: "/work/meezotech",
    label: "Branding and motion",
    services: ["Branding", "Logo Animation", "Motion Design"],
    summary: "A technology brand identity presented through logo animation and motion design.",
    cover: { kind: "case", key: "meezotech" },
  },
  "social-media-designs": {
    client: "Social Media Designs",
    href: "/work/social-media-designs",
    label: "Social media design",
    services: ["Social Media Design"],
    summary: "A gallery of social media designs made for client brands.",
    cover: { kind: "media", id: "texas-super-league-social-01" },
  },
  "logo-folio": {
    client: "Logo Folio",
    href: "/work/logo-folio",
    label: "Logo design and animation",
    services: ["Logo Design", "Logo Animation"],
    summary: "A selection of logo design and logo animation work across energy, technology, food, fashion and agency brands.",
    cover: { kind: "media", id: "pakhlanze-logo-02" },
  },
  "branding-visual-identity": {
    client: "Branding & Visual Identity",
    href: "/work/branding-visual-identity",
    label: "Brand identity boards",
    services: ["Branding", "Visual Identity"],
    summary: "Brand identity boards showing marks, colour palettes, typography and applications.",
    cover: { kind: "media", id: "meezotech-logo-02" },
  },
};

interface CaseStudySet {
  heading: string;
  intro: string;
  ids: string[];
}

const WEBSITE_SET: CaseStudySet = {
  heading: "Website Development Case Studies",
  intro:
    "Selected website projects from our portfolio. The project pages describe the work we delivered; they do not state which platform each site was built on.",
  ids: ["elite", "pur-health", "minhaz-couture"],
};

/** Keyed by the service page path without the locale. A page with no entry shows no case-study section. */
export const SERVICE_CASE_STUDIES: Record<string, CaseStudySet> = {
  "/services/website-development/wordpress": WEBSITE_SET,
  "/services/website-development/wix": WEBSITE_SET,
  "/services/website-development/webflow": WEBSITE_SET,
  "/services/website-development/squarespace": WEBSITE_SET,
  "/services/website-development/nextjs": WEBSITE_SET,
  "/services/website-development/shopify": WEBSITE_SET,

  "/services/video-production/commercial-production": {
    heading: "Commercial Video Production Case Studies",
    intro: "Commercial and brand video projects from our portfolio.",
    ids: ["hubco", "one-homes", "american-auto-parts"],
  },
  "/services/video-production/video-editing": {
    heading: "Video Production Case Studies",
    intro: "Projects where we handled editing and post-production as part of the video work.",
    ids: ["noorshad", "one-homes"],
  },
  "/services/video-production/reels-short-form": {
    heading: "Reels and Short-Form Case Studies",
    intro: "Social reels we have produced for client brands.",
    ids: ["vuse", "cambridge-electrical", "elite"],
  },
  "/services/video-production/motion-graphics": {
    heading: "Motion Graphics Case Studies",
    intro: "Logo animation and motion design projects from our portfolio.",
    ids: ["meezotech", "hubco", "logo-folio"],
  },
  "/services/video-production/motion-design": {
    heading: "Motion Design Case Studies",
    intro: "Logo animation and motion design projects from our portfolio.",
    ids: ["meezotech", "hubco", "logo-folio"],
  },
  "/services/video-production/animation": {
    heading: "Animation Case Studies",
    intro: "Logo animation projects from our portfolio.",
    ids: ["meezotech", "hubco", "logo-folio"],
  },

  "/services/social-media/content-creation": {
    heading: "Social Content Case Studies",
    intro: "Social media content and design work from our portfolio.",
    ids: ["vuse", "cambridge-electrical", "social-media-designs"],
  },
  "/services/social-media/social-strategy": {
    heading: "Social Campaign Case Studies",
    intro: "A campaign-based social engagement from our portfolio.",
    ids: ["cambridge-electrical"],
  },

  "/services/branding/logo-design": {
    heading: "Logo and Identity Case Studies",
    intro: "Logo and brand identity work from our portfolio.",
    ids: ["logo-folio", "branding-visual-identity", "meezotech"],
  },
  "/services/branding/visual-identity": {
    heading: "Visual Identity Case Studies",
    intro: "Brand identity boards and identity presentations from our portfolio.",
    ids: ["branding-visual-identity", "meezotech", "logo-folio"],
  },
};

export function caseStudiesFor(servicePath: string) {
  const set = SERVICE_CASE_STUDIES[servicePath];
  if (!set) return null;
  const projects = set.ids.map((id) => PROJECTS[id]).filter(Boolean).slice(0, 3);
  return projects.length ? { heading: set.heading, intro: set.intro, projects } : null;
}
