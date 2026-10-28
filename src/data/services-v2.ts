// Services page V2 demo content. Demo only. DRAFT = wording written for this demo, not approved copy.
// Service names, descriptions and routes come from the live services data (demo-services.ts, services-v2-subs.ts).
// Proof lines restate scope already confirmed on the live case-study pages. No metric appears because none is verified.
import type { GoalKey } from "@/data/demo-services";

export const OUTCOMES: { key: "Acquire" | "Build" | "Engage" | "Scale"; n: string; line: string; slugs: string[] }[] = [
  { key: "Acquire", n: "01", line: "Demand generation and customer acquisition.", slugs: ["performance-marketing", "seo", "paid-advertising", "media-planning-buying", "public-relations"] },
  { key: "Build", n: "02", line: "Websites, apps, brands and digital experiences.", slugs: ["website-development", "shopify", "app-development", "branding", "design-systems", "photography", "video-production"] },
  { key: "Engage", n: "03", line: "Ongoing relationships with your audience and customers.", slugs: ["social-media", "content-marketing", "email-marketing", "whatsapp-business", "sms-marketing"] },
  { key: "Scale", n: "04", line: "Measurement, automation and operational growth.", slugs: ["digital-marketing", "marketing-analytics", "ecommerce-marketing", "ai", "crm-development", "bpo", "white-label", "upwork-growth"] },
];

export const OUTCOME_OF: Record<string, string> = Object.fromEntries(OUTCOMES.flatMap((o) => o.slugs.map((s) => [s, o.key])));

export interface Platform { label: string; brand: string; href?: string; svg?: string }
export const PLATFORM_SETS: { title: string; line: string; items: Platform[] }[] = [
  { title: "Advertising", line: "Where budget meets intent.", items: [
    { label: "Google Ads", brand: "Google Ads", svg: "/brand/google-ads.svg", href: "/services/performance-marketing/google-ads" },
    { label: "Meta", brand: "Meta", svg: "/brand/meta.svg", href: "/services/performance-marketing/meta-ads" },
    { label: "TikTok Ads", brand: "TikTok", href: "/services/performance-marketing/tiktok-ads" },
    { label: "LinkedIn Ads", brand: "LinkedIn", svg: "/brand/linkedin.svg", href: "/services/performance-marketing/linkedin-ads" },
    { label: "Microsoft Ads", brand: "Microsoft Ads", svg: "/brand/microsoft-ads.svg", href: "/services/performance-marketing/microsoft-ads" },
  ] },
  { title: "Analytics", line: "How we know what works.", items: [
    { label: "GA4", brand: "GA4", href: "/services/marketing-analytics" },
    { label: "Tag Manager", brand: "Google Tag Manager", href: "/services/marketing-analytics" },
    { label: "Search Console", brand: "Search Console", href: "/services/seo/technical-seo" },
  ] },
  { title: "Development", line: "Sites and stores, built on the platform that fits.", items: [
    { label: "Next.js", brand: "Next.js", href: "/services/website-development/nextjs" },
    { label: "React", brand: "React" },
    { label: "WordPress", brand: "WordPress", href: "/services/website-development/wordpress" },
    { label: "Shopify", brand: "Shopify", href: "/services/shopify" },
    { label: "Wix", brand: "Wix", href: "/services/website-development/wix" },
    { label: "Webflow", brand: "Webflow", href: "/services/website-development/webflow" },
    { label: "Squarespace", brand: "Squarespace", href: "/services/website-development/squarespace" },
  ] },
  { title: "Email and CRM", line: "Follow-up that does not leak.", items: [
    { label: "Klaviyo", brand: "Klaviyo", href: "/services/email-marketing" },
    { label: "Mailchimp", brand: "Mailchimp", href: "/services/email-marketing/mailchimp" },
    { label: "SendGrid", brand: "SendGrid", href: "/services/email-marketing/deliverability" },
    { label: "HubSpot", brand: "HubSpot", href: "/services/crm-development/hubspot" },
    { label: "Salesforce", brand: "Salesforce", href: "/services/crm-development/salesforce" },
    { label: "Zoho", brand: "Zoho", href: "/services/crm-development/zoho" },
    { label: "GoHighLevel", brand: "GoHighLevel", href: "/services/crm-development" },
    { label: "Pipedrive", brand: "Pipedrive", href: "/services/crm-development" },
  ] },
  { title: "Creative", line: "Design, motion and edit tools.", items: [
    { label: "Adobe Creative Cloud", brand: "Adobe", href: "/services/branding" },
    { label: "Premiere Pro", brand: "Premiere Pro", href: "/services/video-production/video-editing" },
    { label: "After Effects", brand: "After Effects", href: "/services/video-production/motion-graphics" },
    { label: "Figma", brand: "Figma", href: "/services/design-systems" },
    { label: "DaVinci Resolve", brand: "DaVinci", href: "/services/video-production/video-editing" },
    { label: "Final Cut Pro", brand: "Final Cut", href: "/services/video-production/video-editing" },
    { label: "CapCut", brand: "CapCut", href: "/services/video-production/reels-short-form" },
  ] },
];

export const START_HERE: { need: string; mix: [string, string][]; }[] = [
  { need: "Need leads now?", mix: [["Performance Marketing", "/services/performance-marketing"], ["Landing pages", "/services/website-development/landing-pages"]] },
  { need: "Need durable organic demand?", mix: [["SEO", "/services/seo"], ["Content Marketing", "/services/content-marketing"]] },
  { need: "Need a stronger digital foundation?", mix: [["Website Development", "/services/website-development"], ["Marketing Analytics", "/services/marketing-analytics"]] },
  { need: "Need a consistent brand?", mix: [["Branding & Design", "/services/branding"], ["Social Media", "/services/social-media"], ["Content Marketing", "/services/content-marketing"]] },
  { need: "Need ecommerce growth?", mix: [["Shopify", "/services/shopify"], ["Paid Advertising", "/services/paid-advertising"], ["Email Marketing", "/services/email-marketing"]] },
  { need: "Need operational scale?", mix: [["CRM Development", "/services/crm-development"], ["AI Solutions", "/services/ai"], ["Marketing Analytics", "/services/marketing-analytics"]] },
];

export const SYSTEM_NODES = [
  { t: "Paid media", d: "Shows which messages and audiences deserve more budget, and feeds the creative team." },
  { t: "Search and content", d: "Search data shows what people ask, so content, ads and website pages answer it." },
  { t: "Website", d: "UX and speed decide how much of the traffic turns into enquiries." },
  { t: "Analytics", d: "One measurement plan across channels, so reports agree with each other." },
  { t: "CRM and email", d: "Follow-up turns leads into customers and customers into repeat buyers." },
  { t: "Brand", d: "A consistent identity makes every channel work harder." },
] as const;

export const ENGAGEMENTS = [
  { t: "One specialist service", d: "A single channel handled by the people who do it daily: paid media, SEO, social or a website." },
  { t: "Integrated monthly retainer", d: "Several disciplines under one plan, one set of goals and one report." },
  { t: "One-time project", d: "A defined build with a start and an end: a website, an identity, a campaign or a video." },
  { t: "Growth sprint", d: "A short, focused push on one goal, to prove what works before committing further." },
  { t: "White-label and partner support", d: "Delivery behind your own agency or team, under your name." },
] as const;

export const AUDIT_PROCESS = [
  { n: "01", t: "Discover", d: "Goals, audience, offer, market and what is already running." },
  { n: "02", t: "Audit", d: "Review of accounts, site, content and tracking to find what is working and what is wasted." },
  { n: "03", t: "Prioritize", d: "A short plan ranked by likely impact and effort." },
  { n: "04", t: "Build and launch", d: "Campaigns, pages, creative and systems go live with tracking in place." },
  { n: "05", t: "Measure", d: "Reporting tied to the goals agreed at the start." },
  { n: "06", t: "Improve", d: "Test deliberately, keep what performs, drop what does not." },
] as const;

export const SERVICES_V2_FAQ: [string, string][] = [
  ["Which service should I start with?", "Start from the business goal. If you need demand now, performance marketing is usually the fastest route. If you need durable search visibility, SEO and content. If conversion is the problem, the website and measurement setup. We review your current setup before recommending a scope."],
  ["Can Markit Media manage multiple channels together?", "Yes. We can manage a single specialist service or combine paid media, SEO, social, content, website work, analytics and creative under one plan and one report."],
  ["Can we start with one service and expand?", "Yes. Many engagements start with one priority channel and grow once measurement, creative and reporting are working."],
  ["Do you work on projects and retainers?", "Both. Defined builds such as a website or an identity run as projects. Ongoing channels such as paid media, SEO and social usually run monthly."],
  ["Can you work with our internal team?", "Yes. We can take over one channel, support your team on specific work, or run the whole programme, depending on what your team already handles."],
  ["Do you offer white-label delivery?", "Yes. See the white-label services page for the services we deliver behind another agency's name."],
  ["Which markets do you serve?", "The USA, Canada, UAE, UK, Australia and Saudi Arabia, plus our home market of Pakistan."],
  ["How do you measure results?", "Against the goals agreed at the start: for example return on spend, conversion rates, traffic growth and engagement, depending on the service."],
];

export const GOAL_KEYS: GoalKey[] = ["leads", "found", "build", "social", "scale"];
