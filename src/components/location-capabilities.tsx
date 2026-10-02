import Link from "next/link";

export type LocationCapabilityMode = "all" | "ppc" | "website" | "seo" | "social" | "branding";

type Capability = {
  title: string;
  href: string;
  description: string;
  items: string[];
};

const allCapabilities: Capability[] = [
  { title: "Performance Marketing", href: "/services/performance-marketing", description: "Conversion-focused paid media and acquisition strategy across major advertising platforms.", items: ["Google Ads", "Meta Ads", "TikTok Ads", "LinkedIn Ads", "PPC Management", "Retargeting"] },
  { title: "SEO", href: "/services/seo", description: "Technical, local and content-led SEO built for sustainable organic visibility.", items: ["Technical SEO", "AI SEO", "Local SEO", "Content SEO", "Link Building", "SEO Audits", "Keyword Research"] },
  { title: "Social Media Marketing", href: "/services/social-media", description: "Strategy, content, community management, influencer work and paid social.", items: ["Social Strategy", "Content Creation", "Reels & Video", "Community Management", "Influencer Marketing", "Paid Social", "Analytics"] },
  { title: "Website Development", href: "/services/website-development", description: "Fast, conversion-focused websites, stores and web applications.", items: ["WordPress", "Shopify", "Webflow", "Squarespace", "Next.js", "Custom Development", "Landing Pages", "E-commerce"] },
  { title: "Branding & Design", href: "/services/branding", description: "Positioning and visual systems that create a clear, consistent brand presence.", items: ["Brand Strategy", "Logo Design", "Visual Identity", "Brand Guidelines", "Packaging"] },
  { title: "Video Production", href: "/services/video-production", description: "Commercials, short-form video, editing, motion design and animation.", items: ["Commercial Production", "Video Editing", "Motion Graphics", "Reels & Shorts", "Animation"] },
  { title: "AI Solutions", href: "/services/ai", description: "Practical AI systems for marketing, customer experience, analytics and automation.", items: ["AI Chatbots", "Marketing Automation", "AI Consulting", "Predictive Analytics"] },
  { title: "Email Marketing", href: "/services/email-marketing", description: "Campaigns and lifecycle automation for nurturing, retention and repeat revenue.", items: ["Campaign Design", "Automation", "List Management", "A/B Testing", "Deliverability"] },
  { title: "Content Marketing", href: "/services/content-marketing", description: "Strategy and production for search, thought leadership and conversion.", items: ["Content Strategy", "Copywriting", "Blog Writing", "Whitepapers", "SEO Content"] },
  { title: "Paid Advertising", href: "/services/paid-advertising", description: "Cross-channel paid media beyond search and social.", items: ["Programmatic", "Display Ads", "Native Advertising", "Media Buying"] },
  { title: "Digital Marketing", href: "/services/digital-marketing", description: "Marketing strategy and operational support connecting channels, data and growth.", items: ["Analytics", "CRM Consulting", "ORM", "Fractional CMO", "Marketing Strategy"] },
  { title: "E-commerce Marketing", href: "/services/ecommerce-marketing", description: "Growth support for stores and marketplaces across media, feeds and platform strategy.", items: ["Amazon Ads", "Shopify Marketing", "Product Feeds", "Marketplace Management"] },
  { title: "Public Relations", href: "/services/public-relations", description: "Media, reputation and communications support that builds credible visibility.", items: ["Media Outreach", "Press Releases", "Reputation Management", "Event PR", "Crisis Communications"] },
  { title: "Professional Photography", href: "/services/photography", description: "Commercial photography for products, teams, spaces, events and campaigns.", items: ["Product Photography", "Corporate Photos", "Events", "Architectural", "Lifestyle"] },
  { title: "BPO Services", href: "/services/bpo", description: "Flexible operational support for businesses that need dependable execution capacity.", items: ["Virtual Assistants", "Data Entry", "Customer Support", "Operations"] },
  { title: "App Development", href: "/services/app-development", description: "Portals, dashboards, MVPs and custom applications for business workflows and products.", items: ["Web Apps", "MVP Development", "Portals", "Dashboards", "Custom Product Builds"] },
  { title: "White Label Services", href: "/services/white-label", description: "Behind-the-scenes specialist fulfillment for agencies and partner teams.", items: ["PPC", "SEO", "Meta Ads", "Google Ads", "Social Media", "Web Development"] },
  { title: "Marketing Analytics", href: "/services/marketing-analytics", description: "Measurement systems that connect activity with performance and attribution.", items: ["Measurement", "Dashboards", "Attribution", "Conversion Tracking", "Reporting"] },
  { title: "Media Planning & Buying", href: "/services/media-planning-buying", description: "Channel planning, budget allocation, buying and performance review.", items: ["Media Planning", "Budget Allocation", "Media Buying", "Pacing", "Cross-Channel Campaigns"] },
  { title: "WhatsApp Business", href: "/services/whatsapp-business", description: "Lead and customer communication workflows connected with your sales process.", items: ["Lead Messaging", "Automation", "Customer Journeys", "CRM Handoff", "Support Workflows"] },
  { title: "SMS Marketing", href: "/services/sms-marketing", description: "Permission-based messaging for promotions, lifecycle communication and re-engagement.", items: ["Campaigns", "Lifecycle SMS", "Promotions", "Reminders", "Re-engagement"] },
  { title: "Upwork Growth", href: "/services/upwork-growth", description: "Positioning and client acquisition support for freelancers and agencies on Upwork.", items: ["Profile Optimization", "Proposal Strategy", "Agency Bidding", "Portfolio", "Client Acquisition"] },
  { title: "Design Systems", href: "/services/design-systems", description: "Reusable UI foundations for consistency across websites and digital products.", items: ["UI Foundations", "Components", "Design Tokens", "Patterns", "Documentation"] }
];

const focusedCapabilities: Record<Exclude<LocationCapabilityMode, "all">, Capability[]> = {
  ppc: [
    { title: "Google Ads", href: "/services/performance-marketing/google-ads", description: "Search, Display, Shopping and YouTube campaigns optimized around conversion.", items: ["Search", "Display", "Shopping", "YouTube"] },
    { title: "Meta Ads", href: "/services/performance-marketing/meta-ads", description: "Facebook and Instagram campaigns with audience, creative and tracking strategy.", items: ["Facebook", "Instagram", "Lead Generation", "Conversions"] },
    { title: "Microsoft Ads", href: "/services/performance-marketing/microsoft-ads", description: "High-intent search acquisition across Bing and the Microsoft ecosystem.", items: ["Bing Search", "Search Partners", "Incremental Demand"] },
    { title: "YouTube Ads", href: "/services/performance-marketing/youtube-ads", description: "Video advertising for awareness, demand generation and remarketing.", items: ["Video Reach", "Demand Gen", "Remarketing"] },
    { title: "Pinterest Ads", href: "/services/performance-marketing/pinterest-ads", description: "Visual discovery campaigns for products and consideration-led journeys.", items: ["Discovery", "Shopping", "Consideration"] },
    { title: "X Ads", href: "/services/performance-marketing/x-ads", description: "Paid distribution on X when the audience and objective make it commercially relevant.", items: ["Audience Targeting", "Campaign Planning", "Distribution"] },
    { title: "TikTok Ads", href: "/services/performance-marketing/tiktok-ads", description: "Short-form performance creative and media buying built for TikTok behavior.", items: ["In-Feed", "Spark Ads", "Short-Form Creative"] },
    { title: "LinkedIn Ads", href: "/services/performance-marketing/linkedin-ads", description: "B2B lead generation with professional and company-level targeting.", items: ["B2B Leads", "ABM", "Lead Forms"] },
    { title: "PPC Management", href: "/services/performance-marketing/ppc-management", description: "End-to-end management covering structure, bidding, creative, tracking and optimization.", items: ["Strategy", "Bidding", "Testing", "Reporting"] },
    { title: "Retargeting", href: "/services/performance-marketing/retargeting", description: "Re-engagement campaigns for visitors, leads and customers across channels.", items: ["Remarketing", "Segments", "Lifecycle Ads"] }
  ],
  website: [
    { title: "WordPress Development", href: "/services/website-development/wordpress", description: "Custom WordPress websites and CMS experiences built for speed and usability.", items: ["Themes", "CMS", "Plugins"] },
    { title: "Shopify Development", href: "/services/website-development/shopify", description: "Shopify storefronts and commerce experiences designed around conversion.", items: ["Storefronts", "Themes", "Integrations"] },
    { title: "Webflow Development", href: "/services/website-development/webflow", description: "Responsive Webflow sites, CMS builds and reusable component systems.", items: ["Responsive Builds", "CMS", "Components"] },
    { title: "Squarespace Development", href: "/services/website-development/squarespace", description: "Polished Squarespace sites for services, portfolios and content-led brands.", items: ["Service Sites", "Portfolios", "Content Sites"] },
    { title: "Next.js Development", href: "/services/website-development/nextjs", description: "Modern Next.js websites and applications built for performance and scalability.", items: ["React", "SSR", "Static Generation"] },
    { title: "Custom Web Apps", href: "/services/website-development/custom-web-apps", description: "Purpose-built applications, workflows and customer-facing tools.", items: ["Portals", "Dashboards", "Workflows"] },
    { title: "Freelance Developers", href: "/services/website-development/freelance-developers", description: "Flexible specialist development capacity for businesses and agencies.", items: ["WordPress", "Shopify", "Next.js", "Front End"] },
    { title: "Landing Pages", href: "/services/website-development/landing-pages", description: "Campaign and lead-generation landing pages designed around conversion intent.", items: ["Lead Gen", "Campaigns", "CRO"] },
    { title: "E-commerce Solutions", href: "/services/website-development/ecommerce", description: "Online stores with checkout, payments, inventory and order processing.", items: ["Payments", "Inventory", "Checkout"] },
    { title: "Website Migration", href: "/services/website-development/website-migration", description: "Platform, hosting, CMS and domain migrations planned for continuity and QA.", items: ["Platform Migration", "Hosting", "QA"] },
    { title: "SEO Migration & Redirects", href: "/services/website-development/seo-migration-redirects", description: "Redirect maps, canonical checks, internal links and launch monitoring that protect SEO.", items: ["Redirects", "Canonicals", "Sitemaps", "Monitoring"] }
  ],
  seo: [
    { title: "Technical SEO", href: "/services/seo/technical-seo", description: "Crawlability, indexation, Core Web Vitals, schema and technical search health.", items: ["Crawl", "Indexation", "CWV", "Schema"] },
    { title: "AI SEO", href: "/services/seo/ai-seo", description: "Optimization for traditional search and AI-driven discovery.", items: ["AI Discovery", "Entity SEO", "Answer Engines"] },
    { title: "Local SEO", href: "/services/seo/local-seo", description: "Local visibility through Google Business Profile, citations and map-pack optimization.", items: ["GBP", "Citations", "Maps"] },
    { title: "Content SEO", href: "/services/seo/content-seo", description: "Search-led content planning and on-page optimization aligned with user intent.", items: ["On Page", "Content", "Intent"] },
    { title: "Link Building", href: "/services/seo/link-building", description: "Authority growth through editorial outreach, digital PR and relevant backlinks.", items: ["Outreach", "Digital PR", "Backlinks"] },
    { title: "SEO Audits", href: "/services/seo/seo-audits", description: "Technical and content audits turned into a prioritized implementation plan.", items: ["Technical Audit", "Content Audit", "Action Plan"] },
    { title: "Keyword Research", href: "/services/seo/keyword-research", description: "Search-demand analysis, intent mapping and keyword prioritization.", items: ["Intent", "Keyword Mapping", "Opportunity Analysis"] }
  ],
  social: [
    { title: "Social Strategy", href: "/services/social-media/social-strategy", description: "Channel selection, audience planning, content pillars and campaign direction.", items: ["Strategy", "Channels", "Content Pillars"] },
    { title: "Content Creation", href: "/services/social-media/content-creation", description: "Static, carousel and short-form creative built for consistent publishing.", items: ["Static", "Carousels", "Creative"] },
    { title: "Reels & Short-Form Video", href: "/services/video-production/reels-short-form", description: "Short-form video produced for social-first attention and engagement.", items: ["Reels", "Shorts", "TikTok"] },
    { title: "Video Editing", href: "/services/video-production/video-editing", description: "Editing for social, campaign and branded video across multiple formats.", items: ["Editing", "Captions", "Formats"] },
    { title: "Photography & Videography", href: "/services/photography", description: "Original visual content for campaigns, products, people and locations.", items: ["Photo", "Video", "Production"] },
    { title: "Copywriting & Captions", href: "/services/content-marketing/copywriting", description: "Brand-aligned social copy, hooks, captions and campaign messaging.", items: ["Captions", "Hooks", "CTA"] },
    { title: "Motion Graphics", href: "/services/video-production/motion-design", description: "Animated social creative, explainers and motion-led campaign assets.", items: ["Animation", "Motion", "Social Creative"] },
    { title: "AI-Assisted Content", href: "/services/ai/ai-marketing", description: "AI-assisted workflows that increase content velocity while keeping brand control.", items: ["AI Workflow", "Ideation", "Production"] },
    { title: "Community Management", href: "/services/social-media/community-management", description: "Comment, message and community workflows that keep brands responsive.", items: ["Comments", "DMs", "Engagement"] },
    { title: "Influencer Marketing", href: "/services/social-media/influencer-marketing", description: "Creator sourcing, campaign coordination and performance tracking.", items: ["Creators", "Campaigns", "Reporting"] },
    { title: "Meta Ads", href: "/services/performance-marketing/meta-ads", description: "Paid Facebook and Instagram campaigns connected to the wider social strategy.", items: ["Facebook Ads", "Instagram Ads", "Leads"] },
    { title: "TikTok Ads", href: "/services/performance-marketing/tiktok-ads", description: "Paid TikTok campaigns supported by platform-native short-form creative.", items: ["TikTok", "Spark Ads", "Creative"] },
    { title: "LinkedIn Ads", href: "/services/performance-marketing/linkedin-ads", description: "Professional audience targeting for B2B demand generation and lead capture.", items: ["B2B", "Lead Gen", "ABM"] },
    { title: "Social Analytics", href: "/services/social-media/social-analytics", description: "Reporting that connects reach, engagement and paid performance with business goals.", items: ["Reporting", "KPIs", "Insights"] }
  ],
  branding: [
    { title: "Brand Strategy", href: "/services/branding/brand-strategy", description: "Positioning, messaging and brand architecture built around differentiation.", items: ["Positioning", "Messaging", "Architecture"] },
    { title: "Logo Design", href: "/services/branding/logo-design", description: "Distinctive logo systems designed to work across digital and physical touchpoints.", items: ["Logo", "Variations", "Applications"] },
    { title: "Visual Identity", href: "/services/branding/visual-identity", description: "Color, typography, iconography and visual rules that make a brand recognizable.", items: ["Color", "Typography", "Iconography"] },
    { title: "Brand Guidelines", href: "/services/branding/brand-guidelines", description: "Practical brand books that keep creative execution consistent across teams.", items: ["Rules", "Templates", "Consistency"] },
    { title: "Packaging Design", href: "/services/branding/packaging-design", description: "Packaging systems built for shelf presence and ecommerce environments.", items: ["Packaging", "Retail", "E-commerce"] }
  ]
};

function heading(mode: LocationCapabilityMode, location: string) {
  if (mode === "ppc") return "Complete PPC & Paid Media Services in " + location;
  if (mode === "website") return "Website Development Services in " + location;
  if (mode === "seo") return "Complete SEO Services in " + location;
  if (mode === "social") return "Social Media Services in " + location;
  if (mode === "branding") return "Branding & Design Services in " + location;
  return "Full-Service Digital Marketing Capabilities in " + location;
}

export function LocationCapabilities({ location, mode = "all" }: { location: string; mode?: LocationCapabilityMode }) {
  const capabilities = mode === "all" ? allCapabilities : focusedCapabilities[mode];

  return (
    <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label={heading(mode, location)}>
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gray-500">Complete Capability Set</p>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold text-black tracking-tight leading-tight mt-3">
            {heading(mode, location)}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mt-5">
            {mode === "all"
              ? "Markit Media is not a single-channel vendor. Businesses in " + location + " can work with one team across strategy, acquisition, organic growth, creative, technology, analytics and customer communication."
              : "This local landing page represents the full depth of our " + (mode === "ppc" ? "performance marketing" : mode) + " practice, not a reduced city package. The same specialist teams behind our main service offering support this market."}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-12">
          {capabilities.map((capability) => (
            <Link key={capability.href} href={capability.href} className="group bg-white border border-gray-200 p-6 hover:border-black hover:shadow-lg transition-all focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline">{capability.title}</h3>
                <span className="text-lg text-gray-300 group-hover:text-black transition-colors" aria-hidden="true">↗</span>
              </div>
              <p className="text-base text-gray-600 leading-relaxed mt-3">{capability.description}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {capability.items.map((item) => (
                  <span key={item} className="text-xs font-semibold text-gray-700 bg-gray-100 px-2.5 py-1.5">{item}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 mt-10">
          <Link href="/services" className="inline-flex items-center bg-black text-white px-7 py-3.5 font-bold text-base hover:bg-gray-800 transition-colors">Explore All Services</Link>
          <Link href="/contact" className="inline-flex items-center border-2 border-black text-black px-7 py-3.5 font-bold text-base hover:bg-black hover:text-white transition-colors">Request a Quote</Link>
        </div>
      </div>
    </section>
  );
}
