// Demo-only content for the homepage and services page options.
// Everything here is either copied from the live site or is marked DRAFT. Draft copy is not approved.

export interface DemoCase {
  slug: string;
  name: string;
  href: string;
  image: string;
  imageAlt: string;
  scope: string[];
  line: string;
}

// Scope lines are limited to what the owner confirmed (QWENCH: website, social, reels, Meta ads; Everest: website, social,
// photography, AI photo enhancement, animation; MeezoTech: logo, identity, logo animation, social posts).
export const DEMO_CASES: DemoCase[] = [
  {
    slug: "qwench-juice-bar",
    name: "QWENCH Juice",
    href: "/work/qwench-juice-bar",
    image: "/images/demo/qwench.webp",
    imageAlt: "QWENCH Juice reel, still from the case study video",
    scope: ["Website", "Social media", "Reels", "Meta ads"],
    line: "Website, social media, reels and Meta ads, blended into one fresh brand.",
  },
  {
    slug: "everest-snacks",
    name: "Everest Snacks",
    href: "/work/everest-snacks",
    image: "/images/demo/everest-snacks.webp",
    imageAlt: "Everest Snacks website home page",
    scope: ["Website", "Social media", "Photography", "AI photo enhancement", "Animation"],
    line: "Website, social media and visual content for an energy bar brand.",
  },
  {
    slug: "meezotech",
    name: "MeezoTech",
    href: "/work/meezotech",
    image: "/images/demo/meezotech.webp",
    imageAlt: "MeezoTech brand identity board",
    scope: ["Logo", "Brand identity", "Logo animation", "Social posts"],
    line: "Logo, brand identity, logo animation and social media posts.",
  },
];

export const HOW_STEPS = [
  { n: "01", t: "Find the real opportunity", d: "We unpack your goals, audience, offer, competition, existing performance, and constraints before recommending a channel or tactic." },
  { n: "02", t: "Turn insight into a roadmap", d: "We prioritize the channels, creative, journeys, KPIs, and experiments most likely to move the business forward." },
  { n: "03", t: "Put the strategy to work", d: "Specialists turn the plan into campaigns, content, experiences, and systems, then launch with measurement in place." },
  { n: "04", t: "Improve what the data proves", d: "We review signals, test deliberately, cut waste, strengthen what performs, and keep the next move tied to evidence." },
];

export const DEMO_INDUSTRIES: [string, string][] = [
  ["Exterior Cleaning", "/industries/exterior-cleaning"],
  ["Rehab & Recovery", "/industries/rehab-recovery"],
  ["Personal Branding", "/industries/personal-branding"],
  ["Food Ingredients E-commerce", "/industries/food-ingredients-ecommerce"],
  ["Home Services", "/industries/home-services"],
  ["E-commerce", "/industries/ecommerce"],
  ["Healthcare", "/industries/healthcare"],
  ["Real Estate", "/industries/real-estate"],
];

export const DEMO_MARKETS: [string, string, string][] = [
  ["United States", "🇺🇸", "/locations/united-states"],
  ["Canada", "🇨🇦", "/locations/canada"],
  ["United Arab Emirates", "🇦🇪", "/locations/uae"],
  ["United Kingdom", "🇬🇧", "/locations/uk"],
  ["Australia", "🇦🇺", "/locations/australia"],
  ["Saudi Arabia", "🇸🇦", "/locations/saudi-arabia"],
  ["Pakistan", "🇵🇰", "/locations/karachi"],
];

export const DEMO_TOOLS: [string, string, string][] = [
  ["ROI Calculator", "Estimate marketing return from spend, revenue and campaign economics.", "/free-tools/free-roi-calculator"],
  ["Website Grader", "Review performance, SEO and UX signals in one practical scorecard.", "/free-tools/free-website-grader"],
  ["Headline Analyzer", "Pressure-test headlines for ads, landing pages, blogs and email.", "/free-tools/free-headline-analyzer"],
  ["SEO Audit Score", "Check key technical and on-page factors and identify optimization priorities.", "/free-tools/free-seo-audit-score"],
];

export const HOME_FAQ: [string, string][] = [
  ["What services does Markit Media offer?", "We offer full-stack digital marketing including SEO, paid advertising, social media, website development, branding, video production, AI solutions, content marketing, and email marketing."],
  ["Which industries do you work with?", "We work across exterior cleaning, rehab and recovery, EV charging, restaurants, e-commerce, food ingredients, fashion, executive personal branding, home services, healthcare, real estate, B2B, and more."],
  ["Can you manage both Google Ads and Meta Ads?", "Yes. We plan and manage Google Ads and Meta campaigns, then connect paid acquisition with landing pages, creative, CRM follow-up, and reporting where the client stack allows it."],
  ["How do you measure results?", "We use data-driven metrics including ROI, conversion rates, traffic growth, and engagement to measure and optimize campaign performance."],
  ["How long does it take to see results?", "Paid campaigns can show results within weeks. SEO and organic strategies typically show meaningful growth within 3-6 months."],
  ["How do I get started?", "Contact us for a free consultation. We will discuss your goals and recommend the best approach for your business."],
];

export const SERVICES_FAQ: [string, string][] = [
  ["Which digital marketing services should we start with?", "Start with the business goal, not the channel. If you need demand now, paid media may be the fastest starting point. If you need durable search visibility, SEO and content are usually stronger. If conversion is the issue, the website and measurement setup may need attention first. We review the current setup before recommending scope."],
  ["Can Markit Media manage several channels together?", "Yes. We can manage a single specialist service or combine SEO, paid media, social, content, website work, analytics and creative under one operating plan."],
  ["Can we start with one service and expand later?", "Yes. Many engagements begin with one priority channel and expand after the measurement, creative and reporting systems are working properly."],
  ["Do you offer fixed packages?", "Some projects have defined scopes, but ongoing marketing is usually priced around goals, channels, workload and media spend. We prefer a clear custom scope over forcing every business into the same package."],
  ["How quickly can digital marketing produce results?", "Paid media can create measurable activity quickly when tracking and the offer are ready. SEO and content usually require a longer compounding period. Website, creative and analytics work can improve performance immediately but should be evaluated against a clear baseline."],
];

export const SERVICES_TOGETHER: [string, string][] = [
  ["Shared measurement", "Tracking, attribution and reporting use the same business goals across channels."],
  ["Creative feedback loops", "Paid and organic performance shows which messages deserve more investment."],
  ["Search intelligence", "Keyword and landing page data informs content, ads and website priorities."],
  ["Faster handoffs", "Strategy, design, media and development work from the same context instead of separate vendor briefs."],
];

export const GROUP_DESC: Record<string, string> = {
  Acquire: "Reach people already searching, scrolling or comparing.",
  Build: "Create the digital products and brand systems customers interact with.",
  Engage: "Turn attention into ongoing customer relationships.",
  Scale: "Connect marketing, measurement and operations as the business grows.",
};

// DRAFT copy for option C of the services page (goal bundles). Not approved.
export const GOAL_BUNDLES = [
  { key: "leads", title: "Get leads now", line: "Paid media and messaging built around qualified leads." },
  { key: "found", title: "Be found", line: "Search, content and press that make you easy to find." },
  { key: "build", title: "Build the brand and site", line: "Websites, stores, apps and identity that look right and convert." },
  { key: "social", title: "Grow social and video", line: "Content, reels and email that keep your brand in the feed." },
  { key: "scale", title: "Scale and automate", line: "AI, CRM, analytics and operations behind the marketing." },
] as const;

// Own work that may stand in for a service visual (existing work already on the site).
export const SERVICE_WORK: Record<string, { image: string; alt: string; caption: string; href: string }> = {
  "social-media": { image: "/images/demo/north-charge.webp", alt: "North Charge social post", caption: "Example of our work: North Charge", href: "/work/north-charge" },
  "website-development": { image: "/images/demo/everest-snacks.webp", alt: "Everest Snacks website", caption: "Example of our work: Everest Snacks", href: "/work/everest-snacks" },
  branding: { image: "/images/demo/meezotech.webp", alt: "MeezoTech identity board", caption: "Example of our work: MeezoTech", href: "/work/meezotech" },
  "video-production": { image: "/images/demo/qwench.webp", alt: "QWENCH Juice reel", caption: "Example of our work: QWENCH Juice", href: "/work/qwench-juice-bar" },
};

// Goal router (homepage option B): chips map to a service and, only where verified work exists, a case.
export const GOAL_CHIPS = [
  { key: "leads", label: "Get more leads", service: "performance-marketing", caseSlug: "" },
  { key: "google", label: "Show up on Google", service: "seo", caseSlug: "" },
  { key: "site", label: "Get a new website", service: "website-development", caseSlug: "everest-snacks" },
  { key: "social", label: "Social and video", service: "social-media", caseSlug: "qwench-juice-bar" },
  { key: "online", label: "Sell more online", service: "ecommerce-marketing", caseSlug: "" },
] as const;
