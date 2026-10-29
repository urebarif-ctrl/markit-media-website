// Homepage V1.6 content. Every route below exists on the live site (checked against src/app).
// Copy is adapted from the live homepage and the live service pages; nothing here is a result, a metric or a quote.

export interface PlatformItem { label: string; href: string; svg?: string; brand?: string }
export interface PlatformGroup { title: string; blurb: string; items: PlatformItem[] }

export const PLATFORM_GROUPS: PlatformGroup[] = [
  {
    title: "Paid media",
    blurb: "Search, social and video platforms where budget turns into demand.",
    items: [
      { label: "Google Ads", href: "/services/performance-marketing/google-ads", svg: "/brand/google-ads.svg" },
      { label: "Meta", href: "/services/performance-marketing/meta-ads", svg: "/brand/meta.svg" },
      { label: "Instagram", href: "/services/performance-marketing/meta-ads", brand: "Instagram" },
      { label: "Facebook", href: "/services/performance-marketing/meta-ads", brand: "Facebook" },
      { label: "TikTok", href: "/services/performance-marketing/tiktok-ads", brand: "TikTok" },
      { label: "YouTube", href: "/services/performance-marketing/youtube-ads", brand: "YouTube" },
      { label: "LinkedIn", href: "/services/performance-marketing/linkedin-ads", svg: "/brand/linkedin.svg" },
      { label: "Microsoft Ads", href: "/services/performance-marketing/microsoft-ads", svg: "/brand/microsoft-ads.svg" },
    ],
  },
  {
    title: "Websites and commerce",
    blurb: "The systems customers browse and buy in.",
    items: [
      { label: "Shopify", href: "/services/shopify", brand: "Shopify" },
      { label: "WordPress", href: "/services/website-development/wordpress", brand: "WordPress" },
      { label: "Next.js", href: "/services/website-development/nextjs", brand: "Next.js" },
      { label: "Webflow", href: "/services/website-development/webflow", brand: "Webflow" },
      { label: "Wix", href: "/services/website-development/wix", brand: "Wix" },
    ],
  },
  {
    title: "CRM and email",
    blurb: "Where leads are followed up and customers are kept.",
    items: [
      { label: "HubSpot", href: "/services/crm-development/hubspot", brand: "HubSpot" },
      { label: "Salesforce", href: "/services/crm-development/salesforce", brand: "Salesforce" },
      { label: "Mailchimp", href: "/services/email-marketing/mailchimp", brand: "Mailchimp" },
    ],
  },
  {
    title: "Measurement",
    blurb: "How we know what is working.",
    items: [
      { label: "GA4", href: "/services/marketing-analytics", brand: "GA4" },
      { label: "Search Console", href: "/services/seo/technical-seo", brand: "Search Console" },
    ],
  },
];

export interface BuildLayer { n: string; title: string; line: string; logos: PlatformItem[]; extra?: string; href: string }
export const BUILD_LAYERS: BuildLayer[] = [
  { n: "01", title: "Ad platforms", line: "Account structure, creative tests, conversion tracking and budget moves, made inside the ad accounts themselves.", href: "/services/performance-marketing",
    logos: [{ label: "Google Ads", href: "", svg: "/brand/google-ads.svg" }, { label: "Meta", href: "", svg: "/brand/meta.svg" }, { label: "TikTok", href: "", brand: "TikTok" }, { label: "LinkedIn", href: "", svg: "/brand/linkedin.svg" }, { label: "Microsoft Ads", href: "", svg: "/brand/microsoft-ads.svg" }] },
  { n: "02", title: "Content management", line: "Themes, templates, landing pages, migrations and ongoing support on the CMS your team already uses.", href: "/services/website-development",
    logos: [{ label: "WordPress", href: "", brand: "WordPress" }, { label: "Webflow", href: "", brand: "Webflow" }, { label: "Wix", href: "", brand: "Wix" }] },
  { n: "03", title: "Ecommerce systems", line: "Storefronts, merchandising, product feeds and checkout journeys built around conversion.", href: "/services/shopify",
    logos: [{ label: "Shopify", href: "", brand: "Shopify" }] },
  { n: "04", title: "CRM", line: "Pipelines, forms, automations and reporting so a lead is never lost between marketing and sales.", href: "/services/crm-development",
    logos: [{ label: "HubSpot", href: "", brand: "HubSpot" }, { label: "Salesforce", href: "", brand: "Salesforce" }, { label: "Zoho", href: "", brand: "Zoho" }] },
  { n: "05", title: "Analytics", line: "Event plans, conversion measurement and reports a decision can actually be made from.", href: "/services/marketing-analytics",
    logos: [{ label: "GA4", href: "", brand: "GA4" }, { label: "Search Console", href: "", brand: "Search Console" }] },
  { n: "06", title: "Email platforms", line: "Campaigns, flows, list management and deliverability.", href: "/services/email-marketing", extra: "Also Klaviyo",
    logos: [{ label: "Mailchimp", href: "", brand: "Mailchimp" }] },
  { n: "07", title: "Development frameworks", line: "Fast sites and web apps with component systems, technical SEO, analytics and deployment workflows.", href: "/services/website-development/nextjs",
    logos: [{ label: "Next.js", href: "", brand: "Next.js" }, { label: "React", href: "", brand: "React" }] },
];

export const FEATURED_SERVICES = [
  { slug: "performance-marketing", flag: "Lead service", links: [["Google Ads", "/services/performance-marketing/google-ads"], ["Meta Ads", "/services/performance-marketing/meta-ads"], ["TikTok Ads", "/services/performance-marketing/tiktok-ads"], ["LinkedIn Ads", "/services/performance-marketing/linkedin-ads"], ["Microsoft Ads", "/services/performance-marketing/microsoft-ads"], ["PPC management", "/services/performance-marketing/ppc-management"], ["Retargeting", "/services/performance-marketing/retargeting"]] },
  { slug: "seo", flag: "Be found", links: [["Technical SEO", "/services/seo/technical-seo"], ["Local SEO", "/services/seo/local-seo"], ["Content SEO", "/services/seo/content-seo"], ["Link building", "/services/seo/link-building"], ["SEO audits", "/services/seo/seo-audits"], ["AI SEO", "/services/seo/ai-seo"]] },
  { slug: "website-development", flag: "Build", links: [["WordPress", "/services/website-development/wordpress"], ["Next.js", "/services/website-development/nextjs"], ["Webflow", "/services/website-development/webflow"], ["Wix", "/services/website-development/wix"], ["Landing pages", "/services/website-development/landing-pages"], ["Custom web apps", "/services/website-development/custom-web-apps"]] },
] as const;

export const REST_SERVICES = ["social-media", "shopify", "branding", "video-production", "content-marketing", "email-marketing", "ecommerce-marketing", "crm-development", "app-development", "ai", "bpo", "white-label"] as const;

export const FAMILY_STRIP: [string, string][] = [
  ["Performance Marketing", "/services/performance-marketing"], ["SEO", "/services/seo"], ["Social Media", "/services/social-media"], ["Website Development", "/services/website-development"],
  ["Shopify", "/services/shopify"], ["Branding", "/services/branding"], ["Video", "/services/video-production"], ["Content", "/services/content-marketing"],
  ["Email", "/services/email-marketing"], ["CRM", "/services/crm-development"], ["App Development", "/services/app-development"], ["AI", "/services/ai"], ["BPO", "/services/bpo"], ["White Label", "/services/white-label"],
];

// Cases: scope lines only as already confirmed on the live case-study pages. No outcome metric is shown because none is verified.
export const V15_CASES = [
  { slug: "qwench-juice-bar", name: "QWENCH Juice", href: "/work/qwench-juice-bar", discipline: "Social media, video and paid ads", image: "/images/demo/qwench.webp", alt: "QWENCH Juice reel, still from the case study video", scope: ["Website", "Social media", "Reels", "Meta ads"], line: "A juice bar's website, social feed, reels and Meta ads, blended into one fresh brand.", size: "tall" },
  { slug: "everest-snacks", name: "Everest Snacks", href: "/work/everest-snacks", discipline: "Website development", image: "/images/demo/everest-snacks.webp", alt: "Everest Snacks website home page", scope: ["5-page website", "Blog articles", "Social media", "Photography"], line: "Design and development of an energy bar brand's website, with the content around it.", size: "wide" },
  { slug: "north-charge", name: "North Charge", href: "/work/north-charge", discipline: "Social media design", image: "/images/demo/north-charge.webp", alt: "North Charge social post in orange and dark green", scope: ["Social posts", "Product-led creative"], line: "Orange and dark green social posts for an EV charger brand in Canada.", size: "square" },
  { slug: "meezotech", name: "MeezoTech", href: "/work/meezotech", discipline: "Branding", image: "/images/demo/meezotech.webp", alt: "MeezoTech brand identity board", scope: ["Logo", "Brand identity", "Logo animation", "Social posts"], line: "A red and black identity, logo animation and social posts for a technology company.", size: "wide" },
] as const;

export const V15_INDUSTRIES: [string, string][] = [
  ["Healthcare", "/industries/healthcare"], ["Restaurants and hospitality", "/industries/restaurants"], ["Ecommerce", "/industries/ecommerce"], ["Professional services", "/industries/professional-services"],
  ["Real estate", "/industries/real-estate"], ["Home services", "/industries/home-services"], ["Automotive", "/industries/automotive"], ["EV charging", "/industries/ev-chargers"],
  ["B2B", "/industries/b2b"], ["SaaS and technology", "/industries/saas"], ["Fashion", "/industries/fashion"], ["Food and beverage", "/industries/food-ingredients-ecommerce"],
  ["Exterior cleaning", "/industries/exterior-cleaning"], ["Rehab and recovery", "/industries/rehab-recovery"],
];

export const V16_PROCESS = [
  { n: "01", t: "Discover", c: "#5A3ED6", d: "Goals, audience, offer, competition and current performance, understood before any channel is chosen." },
  { n: "02", t: "Strategize", c: "#0FA593", d: "A roadmap of channels, creative, journeys and KPIs, ranked by what is most likely to move the business." },
  { n: "03", t: "Build", c: "#F5A524", d: "Specialists turn the plan into campaigns, content, websites and systems, inside the platforms you use." },
  { n: "04", t: "Launch", c: "#E8463A", d: "Go live with tracking and measurement already in place, so day one produces usable data." },
  { n: "05", t: "Measure", c: "#2F7BF6", d: "Reporting tied to the goals agreed at the start. One measurement plan across channels, so reports agree." },
  { n: "06", t: "Scale", c: "#111111", d: "Extend what the data proves across channels, markets and systems, and cut what does not work." },
] as const;

export const V15_ALSO: [string, string][] = [
  ["NoorShad", "/work/noorshad"], ["Vuse", "/work/vuse"], ["Cambridge Electrical", "/work/cambridge-electrical"], ["HUBCO", "/work/hubco"], ["Minhaz Couture", "/work/minhaz-couture"], ["Pur Health", "/work/pur-health"],
];

export const V15_QUOTE_SERVICES = ["Performance Marketing", "SEO", "Social Media", "Website Development", "Shopify / Ecommerce", "Branding & Design", "Video Production", "Content Marketing", "Email Marketing", "CRM Development", "App Development", "AI Services", "BPO", "White Label", "Not sure yet"];

export const V16_WHY = [
  ["Strategy and execution under one roof", "The people who plan the work also do it, so nothing is lost between a strategy deck and a campaign."],
  ["Marketing and development together", "Campaigns, landing pages, websites and apps are built by one team, so the click and the page agree."],
  ["Specialists across platforms", "Google Ads, Meta, Shopify, WordPress, Next.js, HubSpot and more, each handled by someone who works in it daily."],
  ["Creative informed by campaign data", "What the ads teach us about messages and audiences goes straight back into the creative."],
  ["Measurement built into execution", "Tracking and reporting are set up before launch, not bolted on afterwards."],
  ["One service or the full growth stack", "Start with a single channel and expand, or run several under one plan and one report."],
  ["Fewer handoffs between agencies", "One team means fewer briefs, fewer meetings and fewer places for context to get lost."],
  ["Experience across industries and markets", "Work for clients across many industries, serving the USA, Canada, UAE, UK, Australia, Saudi Arabia and Pakistan."],
] as const;

export const V16_TOOLS: [string, string, string, string][] = [
  ["Website Grader", "Review performance, SEO and UX signals in one practical scorecard.", "/free-tools/free-website-grader", "#0FA593"],
  ["ROI Calculator", "Estimate marketing return from spend, revenue and campaign economics.", "/free-tools/free-roi-calculator", "#F5A524"],
  ["SEO Audit Score", "Check key technical and on-page factors and see your optimization priorities.", "/free-tools/free-seo-audit-score", "#5A3ED6"],
];
