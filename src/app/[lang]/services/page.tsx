import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { SOCIAL_URLS } from "@/lib/social";
import { QuoteForm } from "@/components/quote-form";
import {
  Search,
  Share2,
  Code,
  Palette,
  Video,
  Bot,
  Mail,
  TrendingUp,
  BarChart3,
  Megaphone,
  FileText,
  Briefcase,
  ShoppingCart,
  Camera,
  ArrowRight,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing Services | SEO, PPC, Web & Social",
  description:
    "Explore Markit Media services for SEO, Google Ads, Meta Ads, social media, web development, branding, video, AI, analytics, ecommerce and BPO.",
  keywords: [
    "digital marketing services",
    "digital marketing agency",
    "SEO services",
    "PPC management",
    "Google Ads management",
    "Meta Ads management",
    "social media marketing",
    "website development",
    "branding agency",
    "video production",
    "marketing analytics",
  ],
  alternates: {
    canonical: "https://themarkitmedia.com/en/services",
    languages: {
      "en": "https://themarkitmedia.com/en/services",
      "ar": "https://themarkitmedia.com/ar/services",
      "ur": "https://themarkitmedia.com/ur/services",
      "x-default": "https://themarkitmedia.com/en/services",
    },
  },
  openGraph: {
    title: "Digital Marketing Services",
    description:
      "SEO, paid media, social, websites, branding, video, AI, analytics and growth services built around measurable business goals.",
    url: "https://themarkitmedia.com/en/services",
    type: "website",
    images: [
      {
        url: "https://themarkitmedia.com/images/branding/og-image.png",
        width: 1200,
        height: 630,
        alt: "Markit Media digital marketing services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Services",
    description:
      "Explore SEO, PPC, social media, web development, branding, video, AI, analytics and ecommerce services.",
    images: ["https://themarkitmedia.com/images/branding/og-image.png"],
  },
  robots: { index: true, follow: true },
};

const serviceCategories = [
  {
    icon: Megaphone,
    title: "Performance Marketing",
    desc: "Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads and PPC management focused on qualified demand and measurable acquisition.",
    href: "/services/performance-marketing",
    image: "/images/services/analytics.jpg",
    subServices: ["Google Ads", "Meta Ads", "TikTok Ads", "LinkedIn Ads", "PPC Management", "Retargeting"],
  },
  {
    icon: Search,
    title: "SEO",
    desc: "Technical SEO, local SEO, content strategy, link building and AI search optimization built to increase qualified organic visibility.",
    href: "/services/seo",
    image: "/images/services/seo.jpg",
    subServices: ["Technical SEO", "Local SEO", "Content SEO", "Link Building", "SEO Audits", "AI SEO"],
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    desc: "Strategy, content creation, reels, community management, influencer support and paid social for brands that need a stronger feed and clearer growth system.",
    href: "/services/social-media",
    image: "/images/services/social-media.jpg",
    subServices: ["Social Strategy", "Content Creation", "Reels & Video", "Community Management", "Influencer Marketing", "Paid Social"],
  },
  {
    icon: Code,
    title: "Website Development",
    desc: "WordPress, Wix, Webflow, Squarespace, Next.js, landing pages and custom web builds designed around speed, search visibility and conversion.",
    href: "/services/website-development",
    image: "/images/services/web-dev.jpg",
    subServices: ["WordPress", "Wix", "Webflow", "Squarespace", "Next.js", "Custom Development"],
  },
  {
    icon: ShoppingCart,
    title: "Shopify",
    desc: "Shopify development and growth services covering storefronts, themes, integrations, migrations, conversion and ecommerce marketing.",
    href: "/services/shopify",
    image: "/images/services/ecommerce-marketing.jpg",
    subServices: ["Shopify Development", "Shopify Marketing", "Shopify Plus", "Store Migration", "CRO"],
  },
  {
    icon: Palette,
    title: "Branding & Design",
    desc: "Brand strategy, identity systems, logo design, brand books, packaging and campaign creative with practical rollout guidance.",
    href: "/services/branding",
    image: "/images/services/branding.jpg",
    subServices: ["Brand Strategy", "Logo Design", "Visual Identity", "Brand Guidelines", "Packaging"],
  },
  {
    icon: Video,
    title: "Video Production",
    desc: "Commercial production, editing, motion graphics, reels, testimonials and animation for paid media, social and brand storytelling.",
    href: "/services/video-production",
    image: "/images/services/video.jpg",
    subServices: ["Commercial Production", "Video Editing", "Motion Graphics", "Reels & Shorts", "Animation"],
  },
  {
    icon: Bot,
    title: "AI Solutions",
    desc: "AI chatbots, marketing automation, consulting and workflow optimization for teams that want practical AI adoption.",
    href: "/services/ai",
    image: "/images/services/ai.jpg",
    subServices: ["AI Chatbots", "Marketing Automation", "AI Consulting", "Predictive Analytics"],
  },
  {
    icon: Mail,
    title: "Email Marketing",
    desc: "Campaign strategy, automation, list management, testing and deliverability programs that improve retention and lifecycle performance.",
    href: "/services/email-marketing",
    image: "/images/services/email.jpg",
    subServices: ["Campaign Design", "Email Automation", "List Management", "A/B Testing", "Deliverability"],
  },
  {
    icon: FileText,
    title: "Content Marketing",
    desc: "Content strategy, copywriting, blogs, landing page copy, case studies and search-led editorial production.",
    href: "/services/content-marketing",
    image: "/images/services/content-marketing.jpg",
    subServices: ["Content Strategy", "Copywriting", "Blog Writing", "Case Studies", "SEO Content"],
  },
  {
    icon: TrendingUp,
    title: "Paid Advertising",
    desc: "Display, programmatic, native, media buying and cross-channel paid campaigns beyond standard search and social buying.",
    href: "/services/paid-advertising",
    image: "/images/services/paid-advertising.jpg",
    subServices: ["Programmatic", "Display Ads", "Native Advertising", "Media Buying"],
  },
  {
    icon: BarChart3,
    title: "Digital Marketing Strategy",
    desc: "Analytics, CRM consulting, reputation management, fractional CMO support and integrated marketing planning.",
    href: "/services/digital-marketing",
    image: "/images/services/digital-marketing.jpg",
    subServices: ["Analytics", "CRM Consulting", "ORM", "Fractional CMO", "Marketing Strategy"],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Marketing",
    desc: "Shopify marketing, product feeds, marketplace growth, paid acquisition and conversion work for ecommerce brands.",
    href: "/services/ecommerce-marketing",
    image: "/images/services/ecommerce-marketing.jpg",
    subServices: ["Amazon Ads", "Shopify Marketing", "Product Feeds", "Marketplace Management"],
  },
  {
    icon: Megaphone,
    title: "Public Relations",
    desc: "Media outreach, press releases, reputation support, event PR and crisis communications.",
    href: "/services/public-relations",
    image: "/images/services/pr.jpg",
    subServices: ["Media Outreach", "Press Releases", "Reputation Management", "Event PR", "Crisis Comms"],
  },
  {
    icon: Camera,
    title: "Professional Photography",
    desc: "Product, food, corporate, event, architectural and lifestyle photography for campaigns, websites and social content.",
    href: "/services/photography",
    image: "/images/services/photography.jpg",
    subServices: ["Product Photography", "Corporate Photos", "Event Coverage", "Architectural", "Lifestyle"],
  },
  {
    icon: Briefcase,
    title: "BPO Services",
    desc: "Customer support, appointment setting, virtual assistance, data operations and outsourced business processes.",
    href: "/services/bpo",
    image: "/images/services/bpo.jpg",
    subServices: ["Customer Support", "Appointment Setting", "Virtual Assistants", "Data Entry", "Operations"],
  },
  {
    icon: Code,
    title: "App Development",
    desc: "Web apps, MVPs, internal tools, customer portals and dashboards for businesses that need more than a marketing website.",
    href: "/services/app-development",
    image: "/images/services/web-dev.jpg",
    subServices: ["Web Apps", "MVP Development", "Portals", "Dashboards", "Custom Product Builds"],
  },
  {
    icon: BarChart3,
    title: "CRM Development",
    desc: "Custom CRM development, HubSpot, Salesforce, Zoho, CRM automation, integrations, migration and consulting.",
    href: "/services/crm-development",
    image: "/images/services/digital-marketing.jpg",
    subServices: ["Custom CRM", "HubSpot", "Salesforce", "Zoho", "CRM Automation"],
  },
  {
    icon: Briefcase,
    title: "White Label Services",
    desc: "Behind-the-scenes delivery for agencies across PPC, SEO, social, creative, web development and AI search.",
    href: "/services/white-label",
    image: "/images/services/digital-marketing.jpg",
    subServices: ["White Label PPC", "SEO", "Meta Ads", "Google Ads", "Social Media", "Web Development"],
  },
  {
    icon: BarChart3,
    title: "Marketing Analytics",
    desc: "Measurement planning, dashboards, attribution, conversion tracking and reporting systems across marketing channels.",
    href: "/services/marketing-analytics",
    image: "/images/services/analytics.jpg",
    subServices: ["Measurement", "Dashboards", "Attribution", "Conversion Tracking", "Reporting"],
  },
  {
    icon: Megaphone,
    title: "Media Planning & Buying",
    desc: "Media strategy, channel planning, budget allocation, buying, pacing and cross-channel performance review.",
    href: "/services/media-planning-buying",
    image: "/images/services/paid-advertising.jpg",
    subServices: ["Media Planning", "Budget Allocation", "Media Buying", "Pacing", "Cross-Channel Campaigns"],
  },
  {
    icon: Share2,
    title: "WhatsApp Business",
    desc: "Lead handling, automation, customer journeys, CRM handoff and support workflows through WhatsApp Business.",
    href: "/services/whatsapp-business",
    image: "/images/services/social-media.jpg",
    subServices: ["Lead Messaging", "Automation", "Customer Journeys", "CRM Handoff", "Support Workflows"],
  },
  {
    icon: Mail,
    title: "SMS Marketing",
    desc: "Permission-based promotional messaging, lifecycle communication, reminders and re-engagement campaigns.",
    href: "/services/sms-marketing",
    image: "/images/services/email.jpg",
    subServices: ["Campaigns", "Lifecycle SMS", "Promotions", "Reminders", "Re-engagement"],
  },
  {
    icon: TrendingUp,
    title: "Upwork Growth",
    desc: "Profile positioning, proposal strategy, portfolio presentation, agency bidding and client acquisition support.",
    href: "/services/upwork-growth",
    image: "/images/services/digital-marketing.jpg",
    subServices: ["Profile Optimization", "Proposal Strategy", "Agency Bidding", "Portfolio", "Client Acquisition"],
  },
  {
    icon: Palette,
    title: "Design Systems",
    desc: "Reusable UI foundations, components, design tokens and documentation for teams that need consistency across digital products.",
    href: "/services/design-systems",
    image: "/images/services/branding.jpg",
    subServices: ["UI Foundations", "Components", "Design Tokens", "Patterns", "Documentation"],
  },
];

const priorityServices = serviceCategories.slice(0, 6);

const serviceGroups = [
  {
    name: "Acquire",
    desc: "Reach people already searching, scrolling or comparing.",
    services: [
      ["Performance Marketing", "/services/performance-marketing"],
      ["SEO", "/services/seo"],
      ["Paid Advertising", "/services/paid-advertising"],
      ["Media Planning & Buying", "/services/media-planning-buying"],
      ["Public Relations", "/services/public-relations"],
    ],
  },
  {
    name: "Build",
    desc: "Create the digital products and brand systems customers interact with.",
    services: [
      ["Website Development", "/services/website-development"],
      ["App Development", "/services/app-development"],
      ["Branding & Design", "/services/branding"],
      ["Design Systems", "/services/design-systems"],
      ["Professional Photography", "/services/photography"],
      ["Video Production", "/services/video-production"],
    ],
  },
  {
    name: "Engage",
    desc: "Turn attention into ongoing customer relationships.",
    services: [
      ["Social Media Marketing", "/services/social-media"],
      ["Content Marketing", "/services/content-marketing"],
      ["Email Marketing", "/services/email-marketing"],
      ["WhatsApp Business", "/services/whatsapp-business"],
      ["SMS Marketing", "/services/sms-marketing"],
    ],
  },
  {
    name: "Scale",
    desc: "Connect marketing, measurement and operations as the business grows.",
    services: [
      ["Digital Marketing Strategy", "/services/digital-marketing"],
      ["Marketing Analytics", "/services/marketing-analytics"],
      ["E-commerce Marketing", "/services/ecommerce-marketing"],
      ["AI Solutions", "/services/ai"],
      ["BPO Services", "/services/bpo"],
      ["White Label Services", "/services/white-label"],
      ["Upwork Growth", "/services/upwork-growth"],
    ],
  },
];

const servicesFaqItems = [
  {
    q: "Which digital marketing services should we start with?",
    a: "Start with the business goal, not the channel. If you need demand now, paid media may be the fastest starting point. If you need durable search visibility, SEO and content are usually stronger. If conversion is the issue, the website and measurement setup may need attention first. We review the current setup before recommending scope.",
  },
  {
    q: "Can Markit Media manage several channels together?",
    a: "Yes. We can manage a single specialist service or combine SEO, paid media, social, content, website work, analytics and creative under one operating plan.",
  },
  {
    q: "Can we start with one service and expand later?",
    a: "Yes. Many engagements begin with one priority channel and expand after the measurement, creative and reporting systems are working properly.",
  },
  {
    q: "Do you offer fixed packages?",
    a: "Some projects have defined scopes, but ongoing marketing is usually priced around goals, channels, workload and media spend. We prefer a clear custom scope over forcing every business into the same package.",
  },
  {
    q: "How quickly can digital marketing produce results?",
    a: "Paid media can create measurable activity quickly when tracking and the offer are ready. SEO and content usually require a longer compounding period. Website, creative and analytics work can improve performance immediately but should be evaluated against a clear baseline.",
  },
  {
    q: "Which markets do you work in?",
    a: "We work with businesses across the United States, Canada, the United Arab Emirates, the United Kingdom, Australia, Saudi Arabia and other markets where our services are a fit.",
  },
];

export default function ServicesPage() {
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Digital Marketing Services by Markit Media",
    url: "https://themarkitmedia.com/en/services",
    description:
      "SEO, paid media, social media, website development, branding, video, AI, analytics, ecommerce and BPO services from Markit Media.",
    provider: {
      "@type": "Organization",
      name: "Markit Media",
      url: "https://themarkitmedia.com",
      sameAs: SOCIAL_URLS,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: serviceCategories.length,
      itemListElement: serviceCategories.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.title,
        url: `https://themarkitmedia.com/en${service.href}`,
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: servicesFaqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <article>
      <JsonLd data={servicesSchema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services" }]} />

      <section className="px-6 lg:px-12 pt-20 lg:pt-28 pb-12" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_.95fr] gap-12 lg:gap-20 items-end">
          <Animate animation="fade-up">
            <SectionLabel>Digital Marketing Services</SectionLabel>
            <h1
              id="services-heading"
              className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,6.5vw,5.6rem)] font-extrabold text-black tracking-[-0.045em] leading-[0.94] mt-4"
            >
              Strategy, creative and growth under one roof.
            </h1>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl">
              Markit Media brings paid media, SEO, social, websites, branding, video, AI and analytics into one practical growth system. Start with one service or build an integrated team around the channels that matter most.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Link
                href="#services-quote"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3.5 font-bold text-sm hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Discuss your project <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/services/finder"
                className="inline-flex items-center gap-2 border border-gray-300 text-black px-6 py-3.5 font-bold text-sm hover:border-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Find the right service
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-16" aria-label="Services overview">
        <div className="max-w-7xl mx-auto border-y border-gray-200 grid grid-cols-2 lg:grid-cols-4">
          {[
            ["25", "service categories"],
            ["100+", "specialist pages"],
            ["20+", "industries"],
            ["6+", "core markets"],
          ].map(([value, label], index) => (
            <div
              key={label}
              className={`py-6 lg:py-8 ${index % 2 === 0 ? "pr-5" : "pl-5"} lg:px-7 first:lg:pl-0 last:lg:pr-0 border-gray-200 ${index < 3 ? "lg:border-r" : ""}`}
            >
              <p className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-extrabold tracking-tight">{value}</p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 lg:py-24 bg-[#f5f5f3]" aria-labelledby="priority-services">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-8 lg:gap-16 items-end mb-10 lg:mb-14">
            <Animate animation="fade-up">
              <SectionLabel>Core Capabilities</SectionLabel>
              <SectionTitle>Where most growth plans start</SectionTitle>
            </Animate>
            <Animate animation="fade-up" delay={80}>
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-2xl lg:ml-auto">
                These are the services we most often combine to improve demand generation, organic visibility, brand consistency and conversion. Each has a dedicated page with deeper scope and sub-services.
              </p>
            </Animate>
          </div>

          <Stagger stagger={70} animation="fade-up" className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-300 border border-gray-300">
            {priorityServices.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group bg-white min-h-[420px] flex flex-col focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                    <Image
                      src={service.image}
                      alt={`${service.title} by Markit Media`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none"
                    />
                  </div>
                  <div className="p-6 lg:p-7 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-10 h-10 border border-gray-200 flex items-center justify-center">
                        <Icon size={19} aria-hidden="true" />
                      </div>
                      <ArrowRight size={18} className="text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all motion-reduce:transition-none" aria-hidden="true" />
                    </div>
                    <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold mt-6 tracking-tight">{service.title}</h2>
                    <p className="text-sm text-gray-600 leading-relaxed mt-3">{service.desc}</p>
                    <p className="text-xs text-gray-500 mt-auto pt-6 leading-relaxed">
                      {service.subServices.slice(0, 4).join(" · ")}
                    </p>
                  </div>
                </Link>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 lg:py-24" aria-labelledby="all-services">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Complete Service Directory</SectionLabel>
            <h2 id="all-services" className="font-[family-name:var(--font-display)] text-[clamp(1.9rem,4vw,3.2rem)] font-extrabold tracking-tight mt-3 max-w-3xl">
              Find the capability you need without digging through a wall of cards.
            </h2>
            <p className="text-base text-gray-600 leading-relaxed mt-4 max-w-2xl">
              We organize the full service stack around four jobs: acquiring demand, building digital experiences, engaging customers and scaling the system.
            </p>
          </Animate>

          <div className="mt-12 border-t border-gray-200">
            {serviceGroups.map((group) => (
              <div key={group.name} className="grid lg:grid-cols-[.32fr_.68fr] gap-5 lg:gap-10 py-9 border-b border-gray-200">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold">{group.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mt-2 max-w-xs">{group.desc}</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-x-8">
                  {group.services.map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="group flex items-center justify-between gap-4 py-3.5 border-b border-gray-100 text-sm font-semibold hover:border-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                    >
                      <span>{label}</span>
                      <ArrowRight size={15} className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all motion-reduce:transition-none" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 lg:py-24 bg-black text-white" aria-label="How services work together">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
          <Animate animation="fade-up">
            <SectionLabel>One Growth System</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.4rem)] font-extrabold tracking-tight leading-tight mt-3">
              The channel is not the strategy.
            </h2>
            <p className="text-base lg:text-lg text-gray-400 leading-relaxed mt-5 max-w-xl">
              Search, paid media, social, creative and web performance affect each other. We use shared measurement and one operating brief so decisions made in one channel improve the rest.
            </p>
            <Link href="/process" className="inline-flex items-center gap-2 mt-7 text-sm font-bold text-white border-b border-white/40 pb-1 hover:border-white">
              See our process <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </Animate>

          <Stagger stagger={70} animation="fade-up" className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
            {[
              ["Shared measurement", "Tracking, attribution and reporting use the same business goals across channels."],
              ["Creative feedback loops", "Paid and organic performance shows which messages deserve more investment."],
              ["Search intelligence", "Keyword and landing page data informs content, ads and website priorities."],
              ["Faster handoffs", "Strategy, design, media and development work from the same context instead of separate vendor briefs."],
            ].map(([title, copy]) => (
              <div key={title} className="border-t border-white/20 pt-5">
                <Check size={18} aria-hidden="true" className="mb-4" />
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mt-2">{copy}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 lg:py-24" aria-labelledby="industry-heading">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end">
            <Animate animation="fade-up">
              <SectionLabel>Industry Experience</SectionLabel>
              <h2 id="industry-heading" className="font-[family-name:var(--font-display)] text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-tight mt-3">
                Different markets need different acquisition logic.
              </h2>
            </Animate>
            <Animate animation="fade-up" delay={80}>
              <p className="text-base text-gray-600 leading-relaxed max-w-xl lg:ml-auto">
                We adapt channel mix, creative, lead handling and measurement to the way customers actually buy in each category.
              </p>
            </Animate>
          </div>

          <div className="mt-10 flex flex-wrap border-t border-l border-gray-200">
            {[
              ["Exterior Cleaning", "/industries/exterior-cleaning"],
              ["Rehab & Recovery", "/industries/rehab-recovery"],
              ["Restaurants", "/industries/restaurants"],
              ["E-commerce", "/industries/ecommerce"],
              ["Healthcare", "/industries/healthcare"],
              ["EV Chargers", "/industries/ev-chargers"],
              ["Real Estate", "/industries/real-estate"],
              ["Fashion", "/industries/fashion"],
              ["SaaS", "/industries/saas"],
              ["B2B", "/industries/b2b"],
              ["Construction", "/industries/construction"],
              ["Professional Services", "/industries/professional-services"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="group w-1/2 md:w-1/3 lg:w-1/4 border-r border-b border-gray-200 min-h-24 p-4 lg:p-5 flex items-end justify-between gap-3 text-sm font-semibold hover:bg-gray-50 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                <span>{label}</span>
                <ArrowRight size={14} className="text-gray-300 group-hover:text-black" aria-hidden="true" />
              </Link>
            ))}
          </div>
          <Link href="/industries" className="inline-flex items-center gap-2 mt-7 text-sm font-bold border-b border-black pb-1">
            Explore all industries <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 lg:py-24 bg-[#f5f5f3]" aria-label="Proof and resources">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-px bg-gray-300 border border-gray-300">
          {[
            ["See the work", "Browse real client projects across websites, social, branding, video and campaigns.", "/work"],
            ["Read case studies", "See the context behind selected client engagements and the services connected to them.", "/case-studies"],
            ["Use free tools", "Explore calculators, audits, generators and planners built for practical marketing decisions.", "/free-tools"],
          ].map(([title, copy, href]) => (
            <Link key={href} href={href} className="group bg-white p-7 lg:p-9 min-h-64 flex flex-col focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mt-3">{copy}</p>
              <span className="mt-auto pt-8 inline-flex items-center gap-2 text-sm font-bold">
                Explore <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform motion-reduce:transition-none" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="services-quote" className="px-6 lg:px-12 py-20 lg:py-28 scroll-mt-24" aria-label="Request a services quote">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[.85fr_1.15fr] gap-12 lg:gap-16 items-start">
          <Animate animation="fade-up">
            <SectionLabel>Request a Quote</SectionLabel>
            <SectionTitle>Tell us the business problem. We will map the right service mix.</SectionTitle>
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed mt-5">
              Share the goal, current setup, priority market, budget range and what your internal team already handles. We will recommend a practical starting scope rather than forcing a prebuilt package.
            </p>
            <div className="mt-7 space-y-3">
              {[
                "Paid growth and lead generation",
                "SEO and organic visibility",
                "Website, ecommerce or app work",
                "Social, creative and video",
                "Analytics, CRM and automation",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-semibold">
                  <Check size={16} aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Animate>
          <QuoteForm
            service="Digital Marketing Services"
            title="Tell Us What You Need"
            buttonText="Request Recommendation"
            messagePlaceholder="Your business, goals, current marketing, priority services, budget range, timeline, and what you want us to handle..."
          />
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-[#f5f5f3]" aria-labelledby="services-faq">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <h2 id="services-faq" className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-tight mt-3">
              Questions about working with a full-service digital agency
            </h2>
          </Animate>
          <div className="mt-10 border-t border-gray-300">
            {servicesFaqItems.map((item, index) => (
              <Animate key={item.q} animation="fade-up" delay={index * 40}>
                <details className="group border-b border-gray-300">
                  <summary className="flex justify-between items-center gap-5 py-5 cursor-pointer text-base font-bold text-black list-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                    {item.q}
                    <span className="text-xl text-gray-500 group-open:rotate-45 transition-transform motion-reduce:transition-none flex-shrink-0" aria-hidden="true">+</span>
                  </summary>
                  <div className="pb-6 text-base text-gray-600 leading-relaxed max-w-3xl">{item.a}</div>
                </details>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 lg:py-24 bg-black text-white" aria-label="Get started">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <Animate animation="fade-up">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-400 font-semibold">Start with the goal</p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,4.2rem)] font-extrabold tracking-tight leading-[1] mt-4 max-w-3xl">
              Need a clearer marketing plan?
            </h2>
          </Animate>
          <Animate animation="fade-up" delay={80}>
            <Link
              href="#services-quote"
              className="inline-flex items-center gap-3 bg-white text-black px-7 py-4 font-bold text-sm hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Request a recommendation <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
