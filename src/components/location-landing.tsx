import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { QuoteForm } from "@/components/quote-form";

export type LocalServiceKey =
  | "marketing-agency"
  | "ppc-ads"
  | "seo-services"
  | "website-development"
  | "social-media-marketing"
  | "branding";

export type LocationProfile = {
  city: string;
  slug: string;
  country: string;
  countrySlug: string;
  region?: string;
  market: string;
  industries: string[];
  opportunity: string;
};

export const locationProfiles: Record<string, LocationProfile> = {
  karachi: {
    city: "Karachi", slug: "karachi", country: "Pakistan", countrySlug: "pakistan",
    market: "Pakistan's largest commercial center, with strong demand across retail, e-commerce, real estate, professional services, healthcare, food, manufacturing, technology, and B2B.",
    industries: ["E-commerce", "Real Estate", "Restaurants & Hospitality", "Healthcare", "Professional Services", "Manufacturing", "SaaS & Technology", "Retail"],
    opportunity: "Karachi brands compete in a mobile-first market where search, social media, paid acquisition, strong creative, fast websites, and WhatsApp-led customer journeys increasingly work together."
  },
  "new-york": {
    city: "New York", slug: "new-york", country: "United States", countrySlug: "united-states", region: "New York",
    market: "One of the world's most competitive business markets, spanning finance, professional services, hospitality, real estate, retail, technology, healthcare, and consumer brands.",
    industries: ["Financial Services", "Professional Services", "Real Estate", "Hospitality", "Healthcare", "Technology", "Retail", "E-commerce"],
    opportunity: "New York rewards brands that combine sharp positioning with measurable acquisition, high-quality content, technical search visibility, and conversion-focused digital experiences."
  },
  "los-angeles": {
    city: "Los Angeles", slug: "los-angeles", country: "United States", countrySlug: "united-states", region: "California",
    market: "A major center for entertainment, consumer brands, wellness, hospitality, e-commerce, real estate, professional services, and technology.",
    industries: ["Entertainment", "E-commerce", "Hospitality", "Wellness", "Real Estate", "Professional Services", "Technology", "Consumer Brands"],
    opportunity: "Los Angeles is creative-first but performance-driven. Strong visual content, paid social, search visibility, creator partnerships, and fast commerce experiences need to work as one system."
  },
  chicago: {
    city: "Chicago", slug: "chicago", country: "United States", countrySlug: "united-states", region: "Illinois",
    market: "A diversified Midwest business hub with deep strength in manufacturing, B2B, logistics, finance, healthcare, professional services, food, and real estate.",
    industries: ["Manufacturing", "B2B", "Logistics", "Healthcare", "Financial Services", "Professional Services", "Food & Beverage", "Real Estate"],
    opportunity: "Chicago businesses often need marketing that supports both local demand and wider regional or national growth, making SEO, paid media, content, analytics, and strong web infrastructure especially valuable."
  },
  houston: {
    city: "Houston", slug: "houston", country: "United States", countrySlug: "united-states", region: "Texas",
    market: "A large, fast-moving economy built around energy, healthcare, industrial services, real estate, construction, restaurants, logistics, and professional services.",
    industries: ["Energy", "Healthcare", "Industrial Services", "Real Estate", "Construction", "Restaurants", "Logistics", "Professional Services"],
    opportunity: "Houston businesses can win through strong local search coverage, disciplined paid acquisition, multilingual-friendly creative, lead-focused websites, and clear performance measurement."
  },
  miami: {
    city: "Miami", slug: "miami", country: "United States", countrySlug: "united-states", region: "Florida",
    market: "A high-growth gateway market for hospitality, real estate, luxury, finance, healthcare, consumer brands, international business, and e-commerce.",
    industries: ["Hospitality", "Real Estate", "Luxury", "Financial Services", "Healthcare", "E-commerce", "Professional Services", "Consumer Brands"],
    opportunity: "Miami's mix of local, national, and international audiences makes channel strategy, local SEO, creative differentiation, paid social, search advertising, and conversion design especially important."
  },
  "san-francisco": {
    city: "San Francisco", slug: "san-francisco", country: "United States", countrySlug: "united-states", region: "California",
    market: "A technology-heavy market shaped by SaaS, AI, startups, professional services, finance, healthcare, and high-value B2B buying journeys.",
    industries: ["SaaS", "AI & Technology", "Startups", "B2B", "Financial Services", "Healthcare", "Professional Services", "E-commerce"],
    opportunity: "San Francisco companies need credible positioning, sophisticated acquisition, content that supports complex buying journeys, technical SEO, strong analytics, and product-quality digital experiences."
  },
  dallas: {
    city: "Dallas", slug: "dallas", country: "United States", countrySlug: "united-states", region: "Texas",
    market: "A major Sun Belt business center spanning real estate, finance, B2B services, healthcare, technology, construction, hospitality, logistics, and home services.",
    industries: ["Real Estate", "Financial Services", "B2B", "Healthcare", "Technology", "Construction", "Hospitality", "Home Services"],
    opportunity: "Dallas-Fort Worth growth creates both opportunity and competitive pressure. Local SEO, paid lead generation, reputation, landing pages, and conversion tracking are central for many service businesses."
  },
  atlanta: {
    city: "Atlanta", slug: "atlanta", country: "United States", countrySlug: "united-states", region: "Georgia",
    market: "A regional business hub for logistics, fintech, healthcare, B2B, media, real estate, hospitality, technology, and professional services.",
    industries: ["Logistics", "Fintech", "Healthcare", "B2B", "Media", "Real Estate", "Hospitality", "Technology"],
    opportunity: "Atlanta's mix of enterprise and fast-growing local businesses favors integrated strategies that connect search, paid media, content, social, analytics, and conversion-focused web experiences."
  },
  boston: {
    city: "Boston", slug: "boston", country: "United States", countrySlug: "united-states", region: "Massachusetts",
    market: "A knowledge-intensive market with major strength in biotech, healthcare, education, financial services, SaaS, professional services, and B2B.",
    industries: ["Biotech", "Healthcare", "Education", "Financial Services", "SaaS", "B2B", "Professional Services", "Technology"],
    opportunity: "Boston audiences often research deeply before converting, increasing the value of authoritative content, technical SEO, credible design, paid search, LinkedIn, analytics, and thoughtful lead nurturing."
  },
  seattle: {
    city: "Seattle", slug: "seattle", country: "United States", countrySlug: "united-states", region: "Washington",
    market: "A technology and commerce hub with strong SaaS, cloud, e-commerce, B2B, healthcare, professional services, real estate, and consumer sectors.",
    industries: ["Technology", "SaaS", "Cloud", "E-commerce", "B2B", "Healthcare", "Professional Services", "Real Estate"],
    opportunity: "Seattle's digitally mature buyers expect fast websites, strong proof, useful content, precise targeting, and sophisticated measurement across the customer journey."
  },
  denver: {
    city: "Denver", slug: "denver", country: "United States", countrySlug: "united-states", region: "Colorado",
    market: "A growing market for technology, professional services, healthcare, real estate, outdoor and lifestyle brands, home services, hospitality, and B2B.",
    industries: ["Technology", "Professional Services", "Healthcare", "Real Estate", "Lifestyle Brands", "Home Services", "Hospitality", "B2B"],
    opportunity: "Denver combines strong local-service demand with a growing technology and lifestyle economy, creating opportunities across local SEO, paid media, e-commerce, content, and web conversion."
  },
  phoenix: {
    city: "Phoenix", slug: "phoenix", country: "United States", countrySlug: "united-states", region: "Arizona",
    market: "A fast-growing metro with major activity in real estate, home services, healthcare, technology, professional services, hospitality, construction, and e-commerce.",
    industries: ["Real Estate", "Home Services", "Healthcare", "Technology", "Professional Services", "Hospitality", "Construction", "E-commerce"],
    opportunity: "Rapid population and business growth increases competition across search and paid media. Strong location architecture, review strategy, landing pages, creative testing, and tracking help businesses scale efficiently."
  },
  austin: {
    city: "Austin", slug: "austin", country: "United States", countrySlug: "united-states", region: "Texas",
    market: "A high-growth technology and business market with SaaS, startups, professional services, real estate, hospitality, consumer brands, healthcare, and e-commerce.",
    industries: ["SaaS", "Technology", "Startups", "Professional Services", "Real Estate", "Hospitality", "Healthcare", "E-commerce"],
    opportunity: "Austin companies compete for digitally sophisticated buyers and talent. Strong positioning, paid acquisition, search visibility, content, conversion design, and analytics can create an efficient growth engine."
  },
  "san-diego": {
    city: "San Diego", slug: "san-diego", country: "United States", countrySlug: "united-states", region: "California",
    market: "A valuable Southern California market for biotech, healthcare, hospitality, real estate, professional services, consumer brands, technology, and e-commerce.",
    industries: ["Biotech", "Healthcare", "Hospitality", "Real Estate", "Professional Services", "Consumer Brands", "Technology", "E-commerce"],
    opportunity: "San Diego businesses benefit from combining local search strength with high-quality creative, paid acquisition, strong web experiences, and content that builds credibility in competitive categories."
  },
};

export const fullServiceCatalog = [
  ["Performance Marketing", "/services/performance-marketing", "Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads, PPC management and retargeting."],
  ["SEO", "/services/seo", "Technical SEO, local SEO, content SEO, link building, audits and keyword research."],
  ["Social Media Marketing", "/services/social-media", "Strategy, content creation, reels, community management, influencer marketing, paid social and analytics."],
  ["Website Development", "/services/website-development", "WordPress, Shopify, Next.js, custom development, landing pages, e-commerce and migrations."],
  ["Branding & Design", "/services/branding", "Brand strategy, logo design, visual identity, guidelines, creative systems and packaging."],
  ["Video Production", "/services/video-production", "Commercial production, editing, motion graphics, short-form video and animation."],
  ["AI Solutions", "/services/ai", "AI chatbots, marketing automation, consulting, workflow optimization and predictive analytics."],
  ["Email Marketing", "/services/email-marketing", "Campaigns, automation sequences, list management, testing and deliverability."],
  ["Content Marketing", "/services/content-marketing", "Content strategy, copywriting, blogs, whitepapers, case studies and SEO content."],
  ["Paid Advertising", "/services/paid-advertising", "Programmatic, display, native advertising, media buying and cross-channel campaigns."],
  ["Digital Marketing", "/services/digital-marketing", "Analytics, CRM consulting, reputation management, fractional CMO and marketing strategy."],
  ["E-commerce Marketing", "/services/ecommerce-marketing", "Amazon Ads, Shopify marketing, product feeds and marketplace growth."],
  ["Public Relations", "/services/public-relations", "Media outreach, press releases, reputation management, event PR and crisis communications."],
  ["Professional Photography", "/services/photography", "Product, corporate, event, architectural and lifestyle photography."],
  ["App Development", "/services/app-development", "Web apps, MVPs, portals, dashboards, internal tools and custom product builds."],
  ["White Label Services", "/services/white-label", "Agency fulfillment across PPC, SEO, social, creative, web development and AI SEO."],
  ["Marketing Analytics", "/services/marketing-analytics", "Dashboards, attribution, measurement planning, conversion tracking and reporting."],
  ["Media Planning & Buying", "/services/media-planning-buying", "Cross-channel planning, budget allocation, buying, pacing and performance review."],
  ["WhatsApp Business", "/services/whatsapp-business", "Lead messaging, automation, customer journeys, CRM handoff and support workflows."],
  ["SMS Marketing", "/services/sms-marketing", "Permission-based campaigns, lifecycle messaging, promotions, reminders and re-engagement."],
  ["Upwork Growth", "/services/upwork-growth", "Profile positioning, proposal strategy, agency bidding and client acquisition support."],
  ["Design Systems", "/services/design-systems", "Reusable UI foundations, components, design tokens, patterns and documentation."],
] as const;

const localServiceContent: Record<LocalServiceKey, {label:string; title:string; core:string; services:[string,string,string][]; parent:string}> = {
  "marketing-agency": {
    label: "Full-Service Marketing",
    title: "Digital Marketing Agency",
    core: "A connected growth system across strategy, media, search, social, content, creative, development and measurement.",
    parent: "/services",
    services: [
      ["Marketing Strategy", "Positioning, audience research, channel planning, offers, funnel strategy and campaign roadmaps.", "/services/digital-marketing"],
      ["Performance Marketing", "Google, Meta, TikTok, LinkedIn, retargeting and paid acquisition management.", "/services/performance-marketing"],
      ["SEO", "Technical, local, content and authority work designed for durable organic visibility.", "/services/seo"],
      ["Social Media", "Strategy, content, community, influencer activity, paid social and reporting.", "/services/social-media"],
      ["Website & App Development", "Conversion-focused sites, landing pages, e-commerce, portals and custom applications.", "/services/website-development"],
      ["Branding & Creative", "Identity, campaign creative, photography, video, design systems and production.", "/services/branding"],
      ["Content & Lifecycle", "Content marketing, email, SMS and WhatsApp journeys that support acquisition and retention.", "/services/content-marketing"],
      ["Analytics & Optimization", "Tracking, dashboards, attribution, reporting and ongoing performance improvement.", "/services/marketing-analytics"],
    ]
  },
  "ppc-ads": {
    label: "Paid Media",
    title: "PPC & Paid Advertising Agency",
    core: "Paid acquisition built around measurable leads, sales and revenue, not impressions alone.",
    parent: "/services/performance-marketing",
    services: [
      ["Google Ads", "Search, Performance Max, Shopping, YouTube and remarketing campaigns structured around commercial intent.", "/services/performance-marketing/google-ads"],
      ["Meta Ads", "Facebook and Instagram acquisition, retargeting, creative testing and funnel optimization.", "/services/performance-marketing/meta-ads"],
      ["TikTok Ads", "Native creative, audience testing and short-form paid acquisition.", "/services/performance-marketing/tiktok-ads"],
      ["LinkedIn Ads", "B2B lead generation, account-focused targeting and professional audience campaigns.", "/services/performance-marketing/linkedin-ads"],
      ["PPC Management", "Budget control, bidding, search-term management, testing, pacing and ongoing optimization.", "/services/performance-marketing/ppc-management"],
      ["Retargeting", "Cross-channel remarketing strategies for visitors, leads, customers and high-intent audiences.", "/services/performance-marketing"],
      ["Landing Pages", "Campaign-specific landing pages focused on message match, speed and conversion.", "/services/website-development/landing-pages"],
      ["Conversion Tracking", "GA4, pixels, events, call/form tracking, attribution and reporting you can actually use.", "/services/marketing-analytics"],
      ["Media Planning & Buying", "Budget allocation and cross-channel media planning when campaigns extend beyond standard PPC.", "/services/media-planning-buying"],
    ]
  },
  "seo-services": {
    label: "Organic Search",
    title: "SEO Agency",
    core: "Technical foundations, content, local visibility and authority-building tied to qualified organic demand.",
    parent: "/services/seo",
    services: [
      ["Technical SEO", "Crawlability, indexation, site architecture, Core Web Vitals, schema and technical diagnostics.", "/services/seo/technical-seo"],
      ["Local SEO", "Google Business Profile strategy, local landing pages, citations, reviews and map visibility.", "/services/seo/local-seo"],
      ["Content SEO", "Search-intent mapping, content optimization, topical coverage and internal linking.", "/services/seo/content-seo"],
      ["Keyword Research", "Commercial, informational and local keyword discovery mapped to the right pages.", "/services/seo/keyword-research"],
      ["SEO Audits", "Technical, on-page, content, internal-linking and indexation audits with prioritized actions.", "/services/seo/seo-audits"],
      ["Link Building", "Editorial outreach, digital PR and authority-building with quality controls.", "/services/seo/link-building"],
      ["On-Page SEO", "Titles, headings, copy structure, entities, internal links and conversion-aware optimization.", "/services/seo"],
      ["SEO Migrations", "Redirect planning, URL mapping, launch checks and post-migration monitoring.", "/services/website-development"],
      ["AI Search Visibility", "Content and entity improvements that support visibility across search and AI discovery experiences.", "/services/seo"],
    ]
  },
  "website-development": {
    label: "Web & Product",
    title: "Website Development Agency",
    core: "Fast, accessible, conversion-focused digital experiences built to support marketing, search and growth.",
    parent: "/services/website-development",
    services: [
      ["WordPress Development", "Custom WordPress builds, performance work, integrations, redesigns and ongoing improvements.", "/services/website-development/wordpress"],
      ["Shopify Development", "E-commerce storefronts, theme work, product architecture, integrations and conversion improvements.", "/services/website-development/shopify"],
      ["Next.js Development", "Modern, high-performance websites and applications using scalable React architecture.", "/services/website-development/nextjs"],
      ["Custom Development", "Purpose-built websites, portals, dashboards, integrations and business workflows.", "/services/website-development"],
      ["Landing Pages", "Campaign and lead-generation pages designed for speed, clarity and conversion.", "/services/website-development/landing-pages"],
      ["E-commerce", "Commerce architecture, product journeys, checkout optimization and supporting integrations.", "/services/website-development"],
      ["Website Migration", "Platform moves with content, analytics, performance and continuity planning.", "/services/website-development"],
      ["SEO Migration", "Redirect maps, canonical checks, metadata preservation and crawl validation during redesigns.", "/services/website-development"],
      ["Maintenance & Support", "Ongoing fixes, enhancements, performance tuning and development capacity.", "/services/website-development"],
      ["App Development", "MVPs, portals, dashboards and web applications when a standard marketing site is not enough.", "/services/app-development"],
    ]
  },
  "social-media-marketing": {
    label: "Social Media",
    title: "Social Media Marketing Agency",
    core: "Channel-native strategy, content, community, creators, paid social and reporting designed around business outcomes.",
    parent: "/services/social-media",
    services: [
      ["Social Strategy", "Audience, platform, content pillars, cadence, campaign themes and channel roles.", "/services/social-media"],
      ["Content Creation", "Static posts, carousels, stories, campaign creative, copy and platform-native formats.", "/services/social-media"],
      ["Reels & Short-Form Video", "Concepting, scripting, editing and repeatable short-form content systems.", "/services/video-production"],
      ["Instagram Marketing", "Organic content, reels, stories, creator collaboration and paid amplification.", "/services/social-media"],
      ["Facebook Marketing", "Content, community, campaign creative and Meta advertising support.", "/services/social-media"],
      ["LinkedIn Marketing", "B2B thought leadership, company-page content, executive positioning and paid distribution.", "/services/social-media"],
      ["TikTok Marketing", "Short-form concepts, creator-style content and paid social testing.", "/services/social-media"],
      ["Community Management", "Comment moderation, inbox workflows, response guidelines and proactive engagement.", "/services/social-media"],
      ["Influencer Marketing", "Creator selection, briefs, collaboration, approvals, amplification and reporting.", "/services/social-media"],
      ["Social Analytics", "Content, audience and campaign reporting connected to meaningful KPIs.", "/services/marketing-analytics"],
    ]
  },
  branding: {
    label: "Brand & Creative",
    title: "Branding Agency",
    core: "Strategy and visual systems that make a business clearer, more distinctive and more consistent across every touchpoint.",
    parent: "/services/branding",
    services: [
      ["Brand Strategy", "Positioning, audiences, value proposition, brand architecture and messaging direction.", "/services/branding"],
      ["Logo Design", "Distinctive identity concepts built for digital, print and real-world use.", "/services/branding"],
      ["Visual Identity", "Typography, color, imagery, iconography and reusable visual language.", "/services/branding"],
      ["Brand Guidelines", "Practical standards that keep internal teams and external partners consistent.", "/services/branding"],
      ["Campaign Creative", "Creative systems for paid media, social campaigns, launches and promotions.", "/services/branding"],
      ["Packaging", "Packaging concepts and design systems aligned with brand and customer experience.", "/services/branding"],
      ["Photography", "Product, corporate, event, architectural and lifestyle photography.", "/services/photography"],
      ["Video & Motion", "Brand films, commercials, short-form video, editing, motion graphics and animation.", "/services/video-production"],
      ["Design Systems", "Reusable digital UI foundations, components, tokens and patterns.", "/services/design-systems"],
    ]
  }
};

function localBase(p: LocationProfile) {
  return p.countrySlug === "united-states"
    ? `/locations/united-states/${p.slug}`
    : `/locations/${p.slug}`;
}

export function buildLocationMetadata(cityKey:string, serviceKey?:LocalServiceKey): Metadata {
  const p = locationProfiles[cityKey];
  const base = localBase(p);
  if (!serviceKey) {
    return {
      title: `Digital Marketing Agency in ${p.city} — Markit Media`,
      description: `Full-service digital marketing agency serving ${p.city}: SEO, PPC, social media, website development, branding, content, analytics, AI, email, video and more.`,
      alternates: { canonical: `https://themarkitmedia.com/en${base}` },
    };
  }
  const s = localServiceContent[serviceKey];
  return {
    title: `${s.title} in ${p.city} — Markit Media`,
    description: `${s.title} serving ${p.city}. ${s.core} Explore the complete service offering, process, related capabilities and local market approach.`,
    alternates: { canonical: `https://themarkitmedia.com/en${base}/${serviceKey}` },
  };
}

export function CityLocationLanding({ cityKey }: {cityKey:string}) {
  const p = locationProfiles[cityKey];
  const base = localBase(p);
  const localLinks: [string,string,string][] = p.countrySlug === "united-states"
    ? [
        ["Full-Service Marketing", `${base}/marketing-agency`, "Integrated strategy and execution across the full marketing stack."],
        ["PPC & Paid Advertising", `${base}/ppc-ads`, "Google, Meta, LinkedIn, TikTok, retargeting and performance media."],
        ["SEO Services", `${base}/seo-services`, "Technical, local, content and authority-focused organic search."],
        ["Website Development", `${base}/website-development`, "WordPress, Shopify, Next.js, landing pages, e-commerce and custom builds."],
      ]
    : [
        ["Full-Service Marketing", `${base}/marketing-agency`, "Integrated strategy and execution across the full marketing stack."],
        ["PPC & Paid Advertising", `${base}/ppc-ads`, "Google, Meta, LinkedIn, TikTok, retargeting and performance media."],
        ["SEO Services", `${base}/seo-services`, "Technical, local, content and authority-focused organic search."],
        ["Social Media Marketing", `${base}/social-media-marketing`, "Strategy, content, reels, community, creators and paid social."],
        ["Website Development", `${base}/website-development`, "WordPress, Shopify, Next.js, landing pages, e-commerce and custom builds."],
        ["Branding", `${base}/branding`, "Brand strategy, identity, guidelines, campaign creative and production."],
      ];
  const faqs = [
    ["What services does Markit Media offer in " + p.city + "?", "We provide a full-stack offering across performance marketing, SEO, social media, web and app development, branding, content, video, photography, email, analytics, AI, e-commerce, PR, media buying and lifecycle channels."],
    ["Can we hire Markit Media for one service only?", "Yes. You can engage us for one focused requirement such as SEO, Google Ads, Meta Ads, website development or social media, or combine services into one integrated growth plan."],
    ["Do you work with companies outside " + p.city + "?", "Yes. Our location pages explain how we support businesses competing in each market, while our delivery capability supports local, national and international campaigns."],
    ["How do you choose the right channels?", "We start with your business model, audience, margins, sales cycle, current data and competitive environment, then prioritize the channels most likely to create measurable business value."],
  ];
  const schema = {"@context":"https://schema.org","@type":"Service",name:`Digital Marketing Agency in ${p.city}`,provider:{"@type":"Organization",name:"Markit Media",url:"https://themarkitmedia.com"},areaServed:{"@type":"City",name:p.city},url:`https://themarkitmedia.com/en${base}`};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))};
  return <article>
    <JsonLd data={schema}/><JsonLd data={faqSchema}/>
    <Breadcrumb items={[{label:"Home",href:"/"},{label:"Locations",href:"/locations"},...(p.countrySlug==="united-states"?[{label:"United States",href:"/locations/united-states"}]:[]),{label:p.city}]}/>
    <section className="px-6 lg:px-12 pt-24 pb-16">
      <div className="max-w-5xl mx-auto">
        <Animate animation="fade-up"><SectionLabel>{p.city}{p.region ? `, ${p.region}` : `, ${p.country}`}</SectionLabel>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.75rem)] font-extrabold text-black tracking-tight leading-[1.08] mt-3">Digital Marketing Agency in {p.city}</h1>
          <p className="text-lg text-gray-600 leading-relaxed mt-6 max-w-4xl">{p.market}</p>
          <p className="text-lg text-gray-600 leading-relaxed mt-4 max-w-4xl">Markit Media brings the complete agency under one roof: paid media, SEO, social, content, websites, apps, branding, production, lifecycle marketing, analytics and growth strategy. The goal is not to sell disconnected deliverables. It is to build the combination of capabilities your business actually needs.</p>
          <div className="flex flex-wrap gap-4 mt-8"><Link href="/contact" className="bg-black text-white px-8 py-4 font-bold">Request a Quote →</Link><Link href="/work" className="border-2 border-black px-8 py-4 font-bold">View Our Work</Link></div>
        </Animate>
      </div>
    </section>
    <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label={`Local services in ${p.city}`}>
      <div className="max-w-7xl mx-auto"><Animate animation="fade-up"><SectionLabel>Local Service Hubs</SectionLabel><SectionTitle>Start with the service you need</SectionTitle></Animate>
        <Stagger stagger={50} animation="fade-up" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">{localLinks.map(([t,h,d])=><Link key={h} href={h} className="bg-white border border-gray-200 p-7 hover:border-black hover:shadow-lg transition-all"><h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold">{t}</h2><p className="text-base text-gray-500 leading-relaxed mt-3">{d}</p><span className="inline-block mt-5 font-bold">Explore {p.city} service →</span></Link>)}</Stagger>
      </div>
    </section>
    <section className="px-6 lg:px-12 py-20">
      <div className="max-w-7xl mx-auto"><Animate animation="fade-up"><SectionLabel>Everything We Do</SectionLabel><SectionTitle>Full-stack services available to {p.city} businesses</SectionTitle><p className="text-lg text-gray-600 mt-4 max-w-3xl">Our local landing pages should represent the whole organization. These are the capabilities we can combine around your goals, team and growth stage.</p></Animate>
        <Stagger stagger={35} animation="fade-up" className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">{fullServiceCatalog.map(([t,h,d])=><Link key={h} href={h} className="border border-gray-200 p-6 hover:border-black transition-colors"><h3 className="font-[family-name:var(--font-display)] font-bold text-lg">{t}</h3><p className="text-base text-gray-500 leading-relaxed mt-2">{d}</p></Link>)}</Stagger>
      </div>
    </section>
    <section className="px-6 lg:px-12 py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14">
        <div><Animate animation="fade-up"><SectionLabel>Market Context</SectionLabel><SectionTitle>Built around how {p.city} businesses compete</SectionTitle><p className="text-lg text-gray-600 leading-relaxed mt-5">{p.opportunity}</p></Animate></div>
        <div><Animate animation="fade-up"><SectionLabel>Industries</SectionLabel><div className="grid sm:grid-cols-2 gap-3 mt-5">{p.industries.map(x=><div key={x} className="bg-white border border-gray-200 px-5 py-4 font-semibold">{x}</div>)}</div></Animate></div>
      </div>
    </section>
    <section className="px-6 lg:px-12 py-20">
      <div className="max-w-7xl mx-auto"><Animate animation="fade-up"><SectionLabel>How We Work</SectionLabel><SectionTitle>One team from strategy through optimization</SectionTitle></Animate>
        <div className="grid md:grid-cols-4 gap-6 mt-10">{[["01","Discover","Goals, audience, economics, current performance and competitive context."],["02","Plan","Prioritize channels, offers, creative, technology, tracking and delivery."],["03","Execute","Specialists build, launch and manage the agreed work across channels."],["04","Optimize","Reporting, testing and iteration turn performance data into the next action."]].map(([n,t,d])=><div key={n} className="border border-gray-200 p-6"><span className="text-3xl font-extrabold text-gray-300">{n}</span><h3 className="font-bold text-lg mt-4">{t}</h3><p className="text-base text-gray-500 mt-2 leading-relaxed">{d}</p></div>)}</div>
      </div>
    </section>
    <section className="px-6 lg:px-12 py-20 bg-gray-50"><div className="max-w-4xl mx-auto"><Animate animation="fade-up"><SectionLabel>FAQ</SectionLabel><SectionTitle>Digital marketing in {p.city}</SectionTitle></Animate><div className="mt-8">{faqs.map(([q,a])=><details key={q} className="border-b border-gray-200 py-5"><summary className="font-bold cursor-pointer">{q}</summary><p className="text-base text-gray-600 leading-relaxed mt-3">{a}</p></details>)}</div></div></section>
    <section id="location-quote" className="px-6 lg:px-12 py-20"><div className="max-w-4xl mx-auto"><QuoteForm service={`Digital Marketing in ${p.city}`} title={`Request a ${p.city} Marketing Quote`} buttonText="Request Quote" /></div></section>
    <section className="px-6 lg:px-12 py-20 bg-black text-white text-center"><div className="max-w-3xl mx-auto"><h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold">Need a stronger growth plan for {p.city}?</h2><p className="text-lg text-gray-300 mt-4">Tell us what you are trying to grow. We will recommend the right mix of services rather than forcing your business into a fixed package.</p><Link href="/contact" className="inline-block mt-8 bg-white text-black px-9 py-4 font-bold">Request a Quote →</Link></div></section>
  </article>;
}

export function ServiceLocationLanding({ cityKey, serviceKey }: {cityKey:string; serviceKey:LocalServiceKey}) {
  const p=locationProfiles[cityKey], s=localServiceContent[serviceKey], base=localBase(p);
  const faqs = [
    [`What does your ${s.title.toLowerCase()} service in ${p.city} include?`, `It includes the complete capability set shown on this page. We scope the exact mix around your objectives instead of limiting the engagement to a generic package.`],
    [`Can you combine ${s.title.toLowerCase()} with other services?`, "Yes. Our location pages are connected to the wider Markit Media service ecosystem, so we can combine paid media, SEO, social, development, creative, content, analytics and lifecycle work where it makes sense."],
    [`Do you customize the strategy for ${p.city}?`, `Yes. We account for local competition, audience behavior, geography, business model and the channels that matter most for your category in ${p.city}.`],
    ["How do you measure success?", "We define KPIs before launch and connect delivery to measurable outcomes such as qualified leads, revenue, cost per acquisition, organic visibility, conversion rate, engagement quality or other business-relevant metrics."],
  ];
  const schema={"@context":"https://schema.org","@type":"Service",name:`${s.title} in ${p.city}`,provider:{"@type":"Organization",name:"Markit Media",url:"https://themarkitmedia.com"},areaServed:{"@type":"City",name:p.city},url:`https://themarkitmedia.com/en${base}/${serviceKey}`};
  return <article>
    <JsonLd data={schema}/>
    <Breadcrumb items={[{label:"Home",href:"/"},{label:"Locations",href:"/locations"},...(p.countrySlug==="united-states"?[{label:"United States",href:"/locations/united-states"}]:[]),{label:p.city,href:base},{label:s.title}]}/>
    <section className="px-6 lg:px-12 pt-24 pb-16"><div className="max-w-5xl mx-auto"><Animate animation="fade-up"><SectionLabel>{s.label} · {p.city}</SectionLabel><h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.6rem)] font-extrabold tracking-tight leading-[1.08] mt-3">{s.title} in {p.city}</h1><p className="text-lg text-gray-600 leading-relaxed mt-6 max-w-4xl">{s.core} We adapt the execution to {p.city}&apos;s competitive environment while keeping strategy, creative, technology and reporting connected.</p><div className="flex flex-wrap gap-4 mt-8"><Link href="/contact" className="bg-black text-white px-8 py-4 font-bold">Request a Quote →</Link><Link href={s.parent} className="border-2 border-black px-8 py-4 font-bold">View Core Service</Link></div></Animate></div></section>
    <section className="px-6 lg:px-12 py-20 bg-gray-50"><div className="max-w-7xl mx-auto"><Animate animation="fade-up"><SectionLabel>Complete Offering</SectionLabel><SectionTitle>What our {s.title.toLowerCase()} work can include</SectionTitle><p className="text-lg text-gray-600 mt-4 max-w-3xl">This page represents the full service family, not a shortened local summary. Your final scope can include one capability or a coordinated mix.</p></Animate><Stagger stagger={45} animation="fade-up" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">{s.services.map(([t,d,h])=><Link key={t} href={h} className="bg-white border border-gray-200 p-7 hover:border-black hover:shadow-lg transition-all"><h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">{t}</h2><p className="text-base text-gray-500 leading-relaxed mt-3">{d}</p><span className="inline-block mt-5 font-bold">Explore capability →</span></Link>)}</Stagger></div></section>
    <section className="px-6 lg:px-12 py-20"><div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14"><Animate animation="fade-up"><div><SectionLabel>Local Context</SectionLabel><SectionTitle>Designed for the {p.city} market</SectionTitle><p className="text-lg text-gray-600 leading-relaxed mt-5">{p.opportunity}</p><p className="text-base text-gray-500 leading-relaxed mt-4">{p.market}</p></div></Animate><Animate animation="fade-up"><div><SectionLabel>Relevant Industries</SectionLabel><div className="grid sm:grid-cols-2 gap-3 mt-5">{p.industries.map(x=><div key={x} className="border border-gray-200 px-5 py-4 font-semibold">{x}</div>)}</div></div></Animate></div></section>
    <section className="px-6 lg:px-12 py-20 bg-gray-50"><div className="max-w-7xl mx-auto"><Animate animation="fade-up"><SectionLabel>Connected Capabilities</SectionLabel><SectionTitle>Bring in the rest of Markit Media when needed</SectionTitle></Animate><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">{fullServiceCatalog.slice(0,8).map(([t,h,d])=><Link key={h} href={h} className="bg-white border border-gray-200 p-5 hover:border-black transition-colors"><h3 className="font-bold">{t}</h3><p className="text-sm text-gray-500 mt-2 leading-relaxed">{d}</p></Link>)}</div><Link href={base} className="inline-block mt-8 font-bold underline underline-offset-4">View all {p.city} marketing services →</Link></div></section>
    <section className="px-6 lg:px-12 py-20"><div className="max-w-7xl mx-auto"><Animate animation="fade-up"><SectionLabel>Process</SectionLabel><SectionTitle>From brief to measurable improvement</SectionTitle></Animate><div className="grid md:grid-cols-4 gap-6 mt-10">{[["01","Audit & Discovery","Understand goals, existing data, competitors and current performance."],["02","Strategy","Set priorities, channels, deliverables, measurement and timeline."],["03","Delivery","Build and launch with specialist execution and clear ownership."],["04","Optimization","Measure, test, improve and expand based on evidence."]].map(([n,t,d])=><div key={n} className="border border-gray-200 p-6"><span className="text-3xl font-extrabold text-gray-300">{n}</span><h3 className="font-bold mt-4">{t}</h3><p className="text-base text-gray-500 mt-2">{d}</p></div>)}</div></div></section>
    <section className="px-6 lg:px-12 py-20 bg-gray-50"><div className="max-w-4xl mx-auto"><Animate animation="fade-up"><SectionLabel>FAQ</SectionLabel><SectionTitle>{s.title} in {p.city}</SectionTitle></Animate><div className="mt-8">{faqs.map(([q,a])=><details key={q} className="border-b border-gray-200 py-5"><summary className="font-bold cursor-pointer">{q}</summary><p className="text-base text-gray-600 leading-relaxed mt-3">{a}</p></details>)}</div></div></section>
    <section id="service-quote" className="px-6 lg:px-12 py-20"><div className="max-w-4xl mx-auto"><QuoteForm service={`${s.title} in ${p.city}`} title={`Request a ${s.title} Quote`} buttonText="Request Quote" /></div></section>
    <section className="px-6 lg:px-12 py-20 bg-black text-white text-center"><div className="max-w-3xl mx-auto"><h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold">Need {s.title.toLowerCase()} in {p.city}?</h2><p className="text-lg text-gray-300 mt-4">Share your goals, current setup and priorities. We will recommend the right scope and show how it connects to the rest of your marketing.</p><Link href="/contact" className="inline-block mt-8 bg-white text-black px-9 py-4 font-bold">Request a Quote →</Link></div></section>
  </article>;
}

const countryProfiles: Record<string,{name:string;slug:string;desc:string;focus:string}> = {
  pakistan:{name:"Pakistan",slug:"pakistan",desc:"Full-stack digital marketing for businesses across Pakistan, with Karachi as our strongest local market hub.",focus:"Search, social, paid acquisition, web development, e-commerce, WhatsApp-led journeys and strong creative are increasingly central to growth in Pakistan's mobile-first digital economy."},
  "united-states":{name:"United States",slug:"united-states",desc:"Full-stack digital marketing for US businesses competing locally, regionally and nationally.",focus:"The US is highly competitive across paid media, local search, e-commerce, B2B and professional services. Strong measurement, differentiated creative, conversion-focused web experiences and disciplined channel strategy matter."},
  canada:{name:"Canada",slug:"canada",desc:"Integrated digital marketing services for Canadian businesses across search, paid media, social, web, content and analytics.",focus:"Canada combines national competition with strong regional and local markets, making clear geographic strategy, bilingual considerations where relevant, local search and precise media planning valuable."},
  uae:{name:"United Arab Emirates",slug:"uae",desc:"Full-service digital marketing for UAE businesses across performance, social, search, web, content and brand.",focus:"The UAE is a fast-moving, international market where premium creative, paid acquisition, multilingual audiences, mobile journeys and strong brand experiences often need to work together."},
  uk:{name:"United Kingdom",slug:"uk",desc:"Digital marketing services for UK businesses across paid media, SEO, social, content, development, brand and analytics.",focus:"The UK market rewards strong positioning, disciplined paid media, useful content, technical search performance, conversion design and privacy-aware measurement."},
  australia:{name:"Australia",slug:"australia",desc:"Full-stack digital marketing for Australian businesses across acquisition, search, social, content, web, brand and analytics.",focus:"Australia combines competitive metro markets with large service areas. Local SEO, paid media efficiency, strong landing pages, e-commerce and reliable tracking are important across many categories."},
  "saudi-arabia":{name:"Saudi Arabia",slug:"saudi-arabia",desc:"Integrated digital marketing services for Saudi businesses across paid media, social, search, web, branding and content.",focus:"Saudi Arabia's digital economy is expanding quickly, with strong opportunity for mobile-first creative, Arabic and English customer journeys, social commerce, paid acquisition and premium digital experiences."},
};

export function buildCountryMetadata(key:string):Metadata {
  const p=countryProfiles[key];
  return {title:`Digital Marketing Agency in ${p.name} — Markit Media`,description:`${p.desc} Explore Markit Media's complete service offering.`,alternates:{canonical:`https://themarkitmedia.com/en/locations/${p.slug}`}};
}

export function CountryLocationLanding({countryKey}:{countryKey:string}) {
  const p=countryProfiles[countryKey];
  const cities = countryKey==="united-states"
    ? ["new-york","los-angeles","chicago","houston","miami","san-francisco","dallas","atlanta","boston","seattle","denver","phoenix","austin","san-diego"]
    : countryKey==="pakistan" ? ["karachi"] : [];
  return <article>
    <Breadcrumb items={[{label:"Home",href:"/"},{label:"Locations",href:"/locations"},{label:p.name}]}/>
    <section className="px-6 lg:px-12 pt-24 pb-16"><div className="max-w-5xl mx-auto"><Animate animation="fade-up"><SectionLabel>{p.name}</SectionLabel><h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.6rem)] font-extrabold mt-3">Digital Marketing Agency in {p.name}</h1><p className="text-lg text-gray-600 leading-relaxed mt-6">{p.desc}</p><p className="text-lg text-gray-600 leading-relaxed mt-4">{p.focus}</p><div className="mt-8 flex gap-4 flex-wrap"><Link href="/contact" className="bg-black text-white px-8 py-4 font-bold">Request a Quote →</Link><Link href="/services" className="border-2 border-black px-8 py-4 font-bold">Explore All Services</Link></div></Animate></div></section>
    <section className="px-6 lg:px-12 py-20 bg-gray-50"><div className="max-w-7xl mx-auto"><Animate animation="fade-up"><SectionLabel>Full Service Offering</SectionLabel><SectionTitle>Everything Markit Media can support</SectionTitle><p className="text-lg text-gray-600 mt-4 max-w-3xl">Country pages now reflect the whole organization rather than a short list of generic capabilities.</p></Animate><Stagger stagger={35} animation="fade-up" className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">{fullServiceCatalog.map(([t,h,d])=><Link key={h} href={h} className="bg-white border border-gray-200 p-6 hover:border-black transition-colors"><h2 className="font-bold text-lg">{t}</h2><p className="text-base text-gray-500 mt-2 leading-relaxed">{d}</p></Link>)}</Stagger></div></section>
    {cities.length>0 && <section className="px-6 lg:px-12 py-20"><div className="max-w-7xl mx-auto"><Animate animation="fade-up"><SectionLabel>Local Markets</SectionLabel><SectionTitle>Explore city-specific marketing services</SectionTitle></Animate><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">{cities.map(k=>{const c=locationProfiles[k]; return <Link key={k} href={localBase(c)} className="border border-gray-200 p-6 hover:border-black hover:shadow-lg transition-all"><h3 className="font-bold text-lg">{c.city}</h3><p className="text-sm text-gray-500 mt-2">{c.market}</p><span className="inline-block mt-4 font-bold">Explore {c.city} →</span></Link>})}</div></div></section>}
    <section className="px-6 lg:px-12 py-20"><div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">{[["01","Discover","Business goals, audience, economics and current marketing."],["02","Prioritize","Choose the services and channels with the strongest case."],["03","Execute","Specialist delivery across strategy, media, creative, content and technology."],["04","Improve","Reporting, testing and iteration based on measurable performance."]].map(([n,t,d])=><div key={n} className="border border-gray-200 p-6"><span className="text-3xl font-extrabold text-gray-300">{n}</span><h3 className="font-bold mt-4">{t}</h3><p className="text-base text-gray-500 mt-2">{d}</p></div>)}</div></section>
    <section className="px-6 lg:px-12 py-20 bg-black text-white text-center"><div className="max-w-3xl mx-auto"><h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold">Build a stronger marketing system in {p.name}</h2><p className="text-lg text-gray-300 mt-4">Start with one service or bring multiple teams together under one strategy.</p><Link href="/contact" className="inline-block mt-8 bg-white text-black px-9 py-4 font-bold">Request a Quote →</Link></div></section>
  </article>;
}
