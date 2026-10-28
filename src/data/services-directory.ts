// Service directory for the services hub: titles, descriptions, routes and top sub-services, copied from the original services page data (copy unchanged).
export type ServiceGroup = "Acquire" | "Build" | "Engage" | "Scale";
export type GoalKey = "leads" | "found" | "build" | "social" | "scale";
export interface DirectoryService { slug: string; title: string; desc: string; href: string; sub: string[]; group: ServiceGroup; goal: GoalKey; core: boolean }
export const SERVICE_DIRECTORY: DirectoryService[] = [
  {
    "slug": "performance-marketing",
    "title": "Performance Marketing",
    "desc": "Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads and PPC management focused on qualified demand and measurable acquisition.",
    "href": "/services/performance-marketing",
    "sub": [
      "Google Ads",
      "Meta Ads",
      "TikTok Ads",
      "LinkedIn Ads",
      "PPC Management",
      "Retargeting"
    ],
    "group": "Acquire",
    "goal": "leads",
    "core": true
  },
  {
    "slug": "seo",
    "title": "SEO",
    "desc": "Technical SEO, local SEO, content strategy, link building and AI search optimization built to increase qualified organic visibility.",
    "href": "/services/seo",
    "sub": [
      "Technical SEO",
      "Local SEO",
      "Content SEO",
      "Link Building",
      "SEO Audits",
      "AI SEO"
    ],
    "group": "Acquire",
    "goal": "found",
    "core": true
  },
  {
    "slug": "social-media",
    "title": "Social Media Marketing",
    "desc": "Strategy, content creation, reels, community management, influencer support and paid social for brands that need a stronger feed and clearer growth system.",
    "href": "/services/social-media",
    "sub": [
      "Social Strategy",
      "Content Creation",
      "Reels & Video",
      "Community Management",
      "Influencer Marketing",
      "Paid Social"
    ],
    "group": "Engage",
    "goal": "social",
    "core": true
  },
  {
    "slug": "website-development",
    "title": "Website Development",
    "desc": "WordPress, Wix, Webflow, Squarespace, Next.js, landing pages and custom web builds designed around speed, search visibility and conversion.",
    "href": "/services/website-development",
    "sub": [
      "WordPress",
      "Wix",
      "Webflow",
      "Squarespace",
      "Next.js",
      "Custom Development"
    ],
    "group": "Build",
    "goal": "build",
    "core": true
  },
  {
    "slug": "shopify",
    "title": "Shopify",
    "desc": "Shopify development and growth services covering storefronts, themes, integrations, migrations, conversion and ecommerce marketing.",
    "href": "/services/shopify",
    "sub": [
      "Shopify Development",
      "Shopify Marketing",
      "Shopify Plus",
      "Store Migration",
      "CRO"
    ],
    "group": "Build",
    "goal": "build",
    "core": true
  },
  {
    "slug": "branding",
    "title": "Branding & Design",
    "desc": "Brand strategy, identity systems, logo design, brand books, packaging and campaign creative with practical rollout guidance.",
    "href": "/services/branding",
    "sub": [
      "Brand Strategy",
      "Logo Design",
      "Visual Identity",
      "Brand Guidelines",
      "Packaging"
    ],
    "group": "Build",
    "goal": "build",
    "core": true
  },
  {
    "slug": "video-production",
    "title": "Video Production",
    "desc": "Commercial production, editing, motion graphics, reels, testimonials and animation for paid media, social and brand storytelling.",
    "href": "/services/video-production",
    "sub": [
      "Commercial Production",
      "Video Editing",
      "Motion Graphics",
      "Reels & Shorts",
      "Animation"
    ],
    "group": "Build",
    "goal": "social",
    "core": false
  },
  {
    "slug": "ai",
    "title": "AI Solutions",
    "desc": "AI chatbots, marketing automation, consulting and workflow optimization for teams that want practical AI adoption.",
    "href": "/services/ai",
    "sub": [
      "AI Chatbots",
      "Marketing Automation",
      "AI Consulting",
      "Predictive Analytics"
    ],
    "group": "Scale",
    "goal": "scale",
    "core": false
  },
  {
    "slug": "email-marketing",
    "title": "Email Marketing",
    "desc": "Campaign strategy, automation, list management, testing and deliverability programs that improve retention and lifecycle performance.",
    "href": "/services/email-marketing",
    "sub": [
      "Campaign Design",
      "Email Automation",
      "List Management",
      "A/B Testing",
      "Deliverability"
    ],
    "group": "Engage",
    "goal": "social",
    "core": false
  },
  {
    "slug": "content-marketing",
    "title": "Content Marketing",
    "desc": "Content strategy, copywriting, blogs, landing page copy, case studies and search-led editorial production.",
    "href": "/services/content-marketing",
    "sub": [
      "Content Strategy",
      "Copywriting",
      "Blog Writing",
      "Case Studies",
      "SEO Content"
    ],
    "group": "Engage",
    "goal": "found",
    "core": false
  },
  {
    "slug": "paid-advertising",
    "title": "Paid Advertising",
    "desc": "Display, programmatic, native, media buying and cross-channel paid campaigns beyond standard search and social buying.",
    "href": "/services/paid-advertising",
    "sub": [
      "Programmatic",
      "Display Ads",
      "Native Advertising",
      "Media Buying"
    ],
    "group": "Acquire",
    "goal": "leads",
    "core": false
  },
  {
    "slug": "digital-marketing",
    "title": "Digital Marketing Strategy",
    "desc": "Analytics, CRM consulting, reputation management, fractional CMO support and integrated marketing planning.",
    "href": "/services/digital-marketing",
    "sub": [
      "Analytics",
      "CRM Consulting",
      "ORM",
      "Fractional CMO",
      "Marketing Strategy"
    ],
    "group": "Scale",
    "goal": "found",
    "core": false
  },
  {
    "slug": "ecommerce-marketing",
    "title": "E-commerce Marketing",
    "desc": "Shopify marketing, product feeds, marketplace growth, paid acquisition and conversion work for ecommerce brands.",
    "href": "/services/ecommerce-marketing",
    "sub": [
      "Amazon Ads",
      "Shopify Marketing",
      "Product Feeds",
      "Marketplace Management"
    ],
    "group": "Scale",
    "goal": "scale",
    "core": false
  },
  {
    "slug": "public-relations",
    "title": "Public Relations",
    "desc": "Media outreach, press releases, reputation support, event PR and crisis communications.",
    "href": "/services/public-relations",
    "sub": [
      "Media Outreach",
      "Press Releases",
      "Reputation Management",
      "Event PR",
      "Crisis Comms"
    ],
    "group": "Acquire",
    "goal": "found",
    "core": false
  },
  {
    "slug": "photography",
    "title": "Professional Photography",
    "desc": "Product, food, corporate, event, architectural and lifestyle photography for campaigns, websites and social content.",
    "href": "/services/photography",
    "sub": [
      "Product Photography",
      "Corporate Photos",
      "Event Coverage",
      "Architectural",
      "Lifestyle"
    ],
    "group": "Build",
    "goal": "build",
    "core": false
  },
  {
    "slug": "bpo",
    "title": "BPO Services",
    "desc": "Customer support, appointment setting, virtual assistance, data operations and outsourced business processes.",
    "href": "/services/bpo",
    "sub": [
      "Customer Support",
      "Appointment Setting",
      "Virtual Assistants",
      "Data Entry",
      "Operations"
    ],
    "group": "Scale",
    "goal": "scale",
    "core": false
  },
  {
    "slug": "app-development",
    "title": "App Development",
    "desc": "Web apps, MVPs, internal tools, customer portals and dashboards for businesses that need more than a marketing website.",
    "href": "/services/app-development",
    "sub": [
      "Web Apps",
      "MVP Development",
      "Portals",
      "Dashboards",
      "Custom Product Builds"
    ],
    "group": "Build",
    "goal": "build",
    "core": false
  },
  {
    "slug": "crm-development",
    "title": "CRM Development",
    "desc": "Custom CRM development, HubSpot, Salesforce, Zoho, CRM automation, integrations, migration and consulting.",
    "href": "/services/crm-development",
    "sub": [
      "Custom CRM",
      "HubSpot",
      "Salesforce",
      "Zoho",
      "CRM Automation"
    ],
    "group": "Scale",
    "goal": "scale",
    "core": false
  },
  {
    "slug": "white-label",
    "title": "White Label Services",
    "desc": "Behind-the-scenes delivery for agencies across PPC, SEO, social, creative, web development and AI search.",
    "href": "/services/white-label",
    "sub": [
      "White Label PPC",
      "SEO",
      "Meta Ads",
      "Google Ads",
      "Social Media",
      "Web Development"
    ],
    "group": "Scale",
    "goal": "scale",
    "core": false
  },
  {
    "slug": "marketing-analytics",
    "title": "Marketing Analytics",
    "desc": "Measurement planning, dashboards, attribution, conversion tracking and reporting systems across marketing channels.",
    "href": "/services/marketing-analytics",
    "sub": [
      "Measurement",
      "Dashboards",
      "Attribution",
      "Conversion Tracking",
      "Reporting"
    ],
    "group": "Scale",
    "goal": "scale",
    "core": false
  },
  {
    "slug": "media-planning-buying",
    "title": "Media Planning & Buying",
    "desc": "Media strategy, channel planning, budget allocation, buying, pacing and cross-channel performance review.",
    "href": "/services/media-planning-buying",
    "sub": [
      "Media Planning",
      "Budget Allocation",
      "Media Buying",
      "Pacing",
      "Cross-Channel Campaigns"
    ],
    "group": "Acquire",
    "goal": "leads",
    "core": false
  },
  {
    "slug": "whatsapp-business",
    "title": "WhatsApp Business",
    "desc": "Lead handling, automation, customer journeys, CRM handoff and support workflows through WhatsApp Business.",
    "href": "/services/whatsapp-business",
    "sub": [
      "Lead Messaging",
      "Automation",
      "Customer Journeys",
      "CRM Handoff",
      "Support Workflows"
    ],
    "group": "Engage",
    "goal": "leads",
    "core": false
  },
  {
    "slug": "sms-marketing",
    "title": "SMS Marketing",
    "desc": "Permission-based promotional messaging, lifecycle communication, reminders and re-engagement campaigns.",
    "href": "/services/sms-marketing",
    "sub": [
      "Campaigns",
      "Lifecycle SMS",
      "Promotions",
      "Reminders",
      "Re-engagement"
    ],
    "group": "Engage",
    "goal": "leads",
    "core": false
  },
  {
    "slug": "upwork-growth",
    "title": "Upwork Growth",
    "desc": "Profile positioning, proposal strategy, portfolio presentation, agency bidding and client acquisition support.",
    "href": "/services/upwork-growth",
    "sub": [
      "Profile Optimization",
      "Proposal Strategy",
      "Agency Bidding",
      "Portfolio",
      "Client Acquisition"
    ],
    "group": "Scale",
    "goal": "scale",
    "core": false
  },
  {
    "slug": "design-systems",
    "title": "Design Systems",
    "desc": "Reusable UI foundations, components, design tokens and documentation for teams that need consistency across digital products.",
    "href": "/services/design-systems",
    "sub": [
      "UI Foundations",
      "Components",
      "Design Tokens",
      "Patterns",
      "Documentation"
    ],
    "group": "Build",
    "goal": "build",
    "core": false
  }
];
