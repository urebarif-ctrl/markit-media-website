import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { getDictionary } from "@/i18n/dictionaries";
import { getPublishedPosts } from "@/lib/blog";
import {
  Search, Share2, Code, Palette, Video, Bot, Mail, TrendingUp,
  BarChart3, ShoppingCart, Megaphone, FileText, Briefcase,
  Building2, Utensils, Heart, Home, Shirt, Zap,
  GraduationCap, Scale, Cloud, Landmark,
  Hotel, Dumbbell, Car, HeartHandshake,
  Building, Plane, Factory,
} from "lucide-react";
import { HeroStats } from "@/components/hero-stats";
import { HeroGraphic } from "@/components/hero-graphic";

export const metadata: Metadata = {
  title: "Markit Media — Full-Stack Digital Marketing Agency",
  description: "Full-stack digital marketing, website development, and creative services for businesses across the USA, Canada, UAE, UK, Australia, and Saudi Arabia.",
  alternates: { canonical: "https://themarkitmedia.com/en" },
  openGraph: {
    title: "Markit Media — Full-Stack Digital Marketing Agency",
    description: "Full-stack digital marketing, website development, and creative services for businesses across the USA, Canada, UAE, UK, Australia, and Saudi Arabia.",
    type: "website",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Markit Media — Full-Stack Digital Marketing Agency",
    description: "Full-stack digital marketing, website development, and creative services.",
  },
};

const services = [
  { icon: Megaphone, title: "Performance Marketing", desc: "Meta Ads, Google Ads, PPC campaigns that convert.", href: "/services/performance-marketing" },
  { icon: Search, title: "SEO", desc: "Technical, local, and content SEO to dominate search.", href: "/services/seo" },
  { icon: Share2, title: "Social Media", desc: "Strategy, content creation, and community management.", href: "/services/social-media" },
  { icon: Code, title: "Website Development", desc: "WordPress, Shopify, Next.js, and custom builds.", href: "/services/website-development" },
  { icon: Palette, title: "Branding", desc: "Brand strategy, logo design, and visual identity.", href: "/services/branding" },
  { icon: Video, title: "Video Production", desc: "Production, editing, reels, and motion graphics.", href: "/services/video-production" },
  { icon: Bot, title: "AI Solutions", desc: "Chatbots, marketing automation, and AI consulting.", href: "/services/ai" },
  { icon: Mail, title: "Email Marketing", desc: "Campaigns, automation, and list management.", href: "/services/email-marketing" },
  { icon: FileText, title: "Content Marketing", desc: "Copywriting, content strategy, and SEO content.", href: "/services/content-marketing" },
  { icon: TrendingUp, title: "Paid Advertising", desc: "Programmatic advertising and media buying.", href: "/services/paid-advertising" },
  { icon: BarChart3, title: "Digital Marketing", desc: "Analytics, CRM, ORM, and fractional CMO.", href: "/services/digital-marketing" },
  { icon: Briefcase, title: "BPO Services", desc: "Business process outsourcing and operations.", href: "/services/bpo" },
];

const industries = [
  { icon: Home, title: "Home Services", href: "/industries/home-services" },
  { icon: ShoppingCart, title: "E-commerce", href: "/industries/ecommerce" },
  { icon: Heart, title: "Healthcare", href: "/industries/healthcare" },
  { icon: Building2, title: "Real Estate", href: "/industries/real-estate" },
  { icon: Utensils, title: "Restaurants", href: "/industries/restaurants" },
  { icon: Shirt, title: "Fashion", href: "/industries/fashion" },
  { icon: Briefcase, title: "B2B", href: "/industries/b2b" },
  { icon: Zap, title: "EV Chargers", href: "/industries/ev-chargers" },
  { icon: GraduationCap, title: "Education", href: "/industries/education" },
  { icon: Scale, title: "Legal", href: "/industries/legal" },
  { icon: Cloud, title: "SaaS", href: "/industries/saas" },
  { icon: Landmark, title: "Finance", href: "/industries/finance" },
  { icon: Hotel, title: "Hospitality", href: "/industries/hospitality" },
  { icon: Dumbbell, title: "Fitness", href: "/industries/fitness" },
  { icon: Car, title: "Automotive", href: "/industries/automotive" },
  { icon: HeartHandshake, title: "Nonprofits", href: "/industries/nonprofits" },
  { icon: Building, title: "Construction", href: "/industries/construction" },
  { icon: Plane, title: "Travel", href: "/industries/travel" },
  { icon: Briefcase, title: "Professional Services", href: "/industries/professional-services" },
  { icon: Factory, title: "Manufacturing", href: "/industries/manufacturing" },
];

const markets = ["United States", "Canada", "United Arab Emirates", "United Kingdom", "Australia", "Saudi Arabia"];

const faqItems = [
  { q: "What services does Markit Media offer?", a: "We offer full-stack digital marketing including SEO, paid advertising, social media, website development, branding, video production, AI solutions, content marketing, and email marketing." },
  { q: "Which industries do you work with?", a: "We work with businesses across home services, e-commerce, healthcare, real estate, restaurants, fashion, B2B, and more." },
  { q: "Where are your clients based?", a: "We serve clients across the USA, Canada, UAE, UK, Australia, and Saudi Arabia." },
  { q: "How do you measure results?", a: "We use data-driven metrics including ROI, conversion rates, traffic growth, and engagement to measure and optimize campaign performance." },
  { q: "What makes Markit Media different from other agencies?", a: "We combine strategic thinking with hands-on execution. You work directly with senior marketers, not junior account managers." },
  { q: "How long does it take to see results?", a: "Paid campaigns can show results within weeks. SEO and organic strategies typically show meaningful growth within 3-6 months." },
  { q: "Do you offer custom packages?", a: "Yes. Every engagement starts with understanding your goals, and we build a strategy and pricing model tailored to your business." },
  { q: "How do I get started?", a: "Contact us for a free consultation. We will discuss your goals and recommend the best approach for your business." },
];

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (["en", "ar", "ur"].includes(lang) ? lang : "en") as "en" | "ar" | "ur";
  const t = await getDictionary(locale);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Markit Media",
    url: "https://themarkitmedia.com",
    logo: "https://themarkitmedia.com/images/branding/og-image.png",
    description: "Full-stack digital marketing agency serving businesses across the USA, Canada, UAE, UK, Australia, and Saudi Arabia.",
    email: "ciao@themarkitmedia.com",
    sameAs: ["https://www.linkedin.com/company/themarkitmedia", "https://www.instagram.com/themarkitmedia"],
    areaServed: markets.map((m) => ({ "@type": "Country", name: m })),
    knowsAbout: [
      "Search Engine Optimization", "Pay-Per-Click Advertising", "Social Media Marketing",
      "Website Development", "Branding", "Video Production", "Email Marketing",
      "Content Marketing", "AI Marketing Automation", "E-Commerce Marketing",
    ],
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 50 },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Markit Media",
    url: "https://themarkitmedia.com",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: "https://themarkitmedia.com/blog?q={search_term_string}" },
      "query-input": "required name=search_term_string",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <article>
      <JsonLd data={orgSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 lg:px-12 overflow-hidden" aria-label="Hero">
        <div className="hero-bg-dots absolute inset-0" />
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Animate animation="fade-up">
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,5rem)] font-extrabold text-black tracking-tight leading-[1.05]">
                {t.home.heroTitle}
              </h1>
            </Animate>
            <Animate animation="fade-up" delay={150}>
              <p className="text-xl lg:text-2xl text-gray-500 leading-relaxed mt-6 max-w-2xl">
                {t.home.heroSubtitle}
              </p>
            </Animate>
            <Animate animation="fade-up" delay={300}>
              <div className="flex flex-wrap gap-4 mt-10">
                <Link href="/contact" className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  {t.cta.primary} &rarr;
                </Link>
                <Link href="/work" className="inline-flex items-center gap-3 border-2 border-black text-black px-10 py-5 font-bold text-base hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  {t.cta.secondary}
                </Link>
              </div>
            </Animate>
            <Animate animation="fade-up" delay={450}>
              <HeroStats />
            </Animate>
          </div>
          <Animate animation="fade-in" delay={200}>
            <div className="hidden lg:block relative">
              <HeroGraphic className="w-full" />
            </div>
          </Animate>
        </div>
      </section>

      {/* Platform Logos */}
      <section className="border-y border-gray-200 py-8 bg-white" aria-label="Platforms we manage">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-base font-bold text-gray-400 uppercase tracking-widest text-center mb-6">Platforms We Manage</p>
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
            {/* Google */}
            <svg className="h-8 text-gray-400 hover:text-black transition-colors" viewBox="0 0 272 92" fill="currentColor" aria-label="Google"><path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/><path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/><path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/><path d="M225 3v65h-9.5V3h9.5z"/><path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/><path d="M35.29 41.19V32H68c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C17.57 69.36 2 54.21 2 35.68S17.57 2 36.3 2c10.41 0 17.81 4.07 23.36 9.37l-6.57 6.57c-3.95-3.7-9.33-6.57-16.79-6.57-13.69 0-24.4 11.04-24.4 24.68 0 13.65 10.71 24.68 24.4 24.68 8.91 0 13.94-3.58 17.22-6.86 2.64-2.64 4.37-6.43 5.06-11.59H35.29z"/></svg>
            {/* Meta */}
            <svg className="h-7 text-gray-400 hover:text-black transition-colors" viewBox="0 0 120 24" fill="currentColor" aria-label="Meta"><path d="M6.57 5.27c1.42 0 2.87.92 4.17 2.71 1.68 2.33 3.14 5.63 3.85 7.72.86-2.63 2.14-5.67 3.54-7.56 1.21-1.63 2.51-2.87 4.14-2.87 3.39 0 5.72 5.65 5.72 12.73S25.66 30.73 22.27 30.73c-1.63 0-2.93-1.24-4.14-2.87-1.4-1.89-2.68-4.93-3.54-7.56-.71 2.09-2.17 5.39-3.85 7.72-1.3 1.79-2.75 2.71-4.17 2.71C2.95 30.73 0 25.08 0 18 0 10.92 2.95 5.27 6.57 5.27z" transform="scale(.8) translate(0,0)"/><text x="30" y="19" fontFamily="Helvetica,Arial,sans-serif" fontSize="19" fontWeight="700">meta</text></svg>
            {/* Instagram */}
            <svg className="h-7 text-gray-400 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="Instagram"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            {/* LinkedIn */}
            <svg className="h-7 text-gray-400 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="LinkedIn"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            {/* TikTok */}
            <svg className="h-7 text-gray-400 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="TikTok"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
            {/* Shopify */}
            <svg className="h-8 text-gray-400 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="Shopify"><path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104zm-1.332-17.22c0-.136-.012-.26-.033-.381-.592-.304-1.248-.473-1.941-.473-.154 0-.32.017-.467.025.252-.544.685-.972 1.217-1.178.133-.052.271-.092.422-.11.14-.017.281-.017.403.009.275.059.533.199.748.401l-.349 1.707zm-1.699-.122c-.074.005-.146.015-.216.032-.66.152-1.168.673-1.375 1.37l-.467 2.272c-.645-.166-1.326-.266-2.037-.266-2.264 0-3.816 1.143-3.816 2.879 0 1.614 1.502 2.346 2.734 2.768.182.063.352.12.507.177 1.399.515 1.945.876 1.945 1.449 0 .723-.581 1.135-1.512 1.135-.914 0-1.802-.37-2.482-.838l-.607 2.108c.762.467 1.7.743 2.677.743 2.454 0 3.935-1.195 3.935-2.952 0-1.7-1.46-2.403-2.913-2.916-.159-.055-.313-.108-.458-.163-1.019-.387-1.53-.679-1.53-1.226 0-.535.476-.883 1.263-.883.655 0 1.295.176 1.889.415l.651-2.174c-.387-.167-.82-.304-1.29-.387l.143-1.584z"/></svg>
            {/* HubSpot */}
            <svg className="h-7 text-gray-400 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="HubSpot"><path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.984v-.066A2.198 2.198 0 0017.235.838h-.066a2.198 2.198 0 00-2.196 2.196v.066c0 .87.51 1.617 1.244 1.974v2.862a6.175 6.175 0 00-2.926 1.49l-7.85-6.1A2.605 2.605 0 005.44.87a2.614 2.614 0 00-2.611 2.611c0 1.107.69 2.05 1.664 2.428l.086 8.736a6.224 6.224 0 002.866 11.759c1.744 0 3.318-.722 4.445-1.88l3.527 2.64a2.352 2.352 0 00-.105.691 2.384 2.384 0 002.384 2.383 2.384 2.384 0 002.384-2.383 2.384 2.384 0 00-2.384-2.383c-.42 0-.812.112-1.153.305l-3.407-2.55a6.19 6.19 0 001.094-3.263h.003c0-1.946-.9-3.68-2.305-4.813l2.156-2.637a6.132 6.132 0 001.984.332z"/></svg>
            {/* WordPress */}
            <svg className="h-7 text-gray-400 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="WordPress"><path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.027-.78-.07-1.109m-7.981.105c.647-.034 1.233-.105 1.233-.105.58-.07.512-.921-.07-.892 0 0-1.744.14-2.87.14-1.058 0-2.835-.14-2.835-.14-.58-.029-.647.858-.068.892 0 0 .549.07 1.128.105l1.674 4.591-2.35 7.06L6.574 6.93c.648-.034 1.234-.105 1.234-.105.581-.07.513-.921-.069-.892 0 0-1.745.14-2.87.14-.202 0-.44-.006-.693-.015C5.88 3.528 8.739 2 12 2c2.426 0 4.636.885 6.332 2.349-.04-.003-.078-.01-.12-.01-1.057 0-1.807.921-1.807 1.91 0 .892.512 1.643 1.057 2.534.41.717.888 1.636.888 2.962 0 .921-.352 1.986-.82 3.473l-1.073 3.586-3.892-11.574m-3.726 1.31L7.18 16.66c-.07.172-.13.36-.172.557a7.96 7.96 0 01-4.008-6.9c0-1.37.347-2.66.955-3.787l4.795 11.61zM12 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10"/></svg>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Services">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>{t.home.servicesSubtitle}</SectionLabel>
            <SectionTitle>{t.home.servicesTitle}</SectionTitle>
            <SectionDesc>
              From strategy to execution, we handle every channel so you can focus on running your business.
            </SectionDesc>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Link key={s.href} href={s.href} className="group bg-white border border-gray-200 hover:border-black/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none p-6 flex flex-col focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-4">
                    <Icon size={22} strokeWidth={2} aria-hidden="true" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black uppercase tracking-wide mb-2 group-hover:underline">
                    {s.title}
                  </h3>
                  <p className="text-base text-gray-500 leading-relaxed flex-1">{s.desc}</p>
                </Link>
              );
            })}
          </Stagger>
          <Animate animation="fade-up" delay={200}>
            <div className="mt-12 text-center">
              <Link href="/services" className="inline-flex items-center gap-2 text-base font-bold text-black hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                View All Services &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* Industries */}
      <section className="px-6 lg:px-12 py-20" aria-label="Industries">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>{t.home.industriesSubtitle}</SectionLabel>
            <SectionTitle>{t.home.industriesTitle}</SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <Link key={ind.href} href={ind.href} className="group border border-gray-200 hover:border-black hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 motion-reduce:transition-none p-6 text-center focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  <div className="w-14 h-14 bg-gray-100 group-hover:bg-black group-hover:text-white text-gray-500 flex items-center justify-center mx-auto mb-4 transition-colors motion-reduce:transition-none">
                    <Icon size={24} strokeWidth={2} aria-hidden="true" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black group-hover:underline">{ind.title}</h3>
                </Link>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* What We Deliver */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white" aria-label="What we deliver">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Deliver</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight mt-3">
              Outcomes, Not Just Output
            </h2>
            <p className="text-lg text-gray-400 mt-4 max-w-2xl">
              We measure success by business results, not vanity metrics. Every strategy we build is designed to move the metrics that matter.
            </p>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { metric: "Traffic Growth", desc: "Organic and paid traffic that reaches the right audience at the right time." },
              { metric: "Lead Generation", desc: "Qualified leads from search, social, and content marketing funnels." },
              { metric: "Revenue Attribution", desc: "Clear line between marketing spend and revenue generated." },
              { metric: "Brand Visibility", desc: "Increased share of voice in your industry across all digital channels." },
            ].map((item) => (
              <div key={item.metric} className="p-6 border border-white/10 hover:border-white/30 transition-all duration-300 motion-reduce:transition-none">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-white uppercase tracking-wide mb-3">
                  {item.metric}
                </h3>
                <p className="text-base text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </Stagger>
          <Animate animation="fade-up" delay={200}>
            <div className="mt-10">
              <Link href="/results" className="inline-flex items-center gap-2 text-base font-bold text-white hover:underline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                See How We Measure Results &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Why choose Markit Media">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>Built for Businesses That Want to Grow</SectionTitle>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              { title: "Senior Talent, Not Juniors", desc: "You work directly with experienced strategists and specialists — not junior account managers learning on your budget." },
              { title: "Full-Stack Execution", desc: "SEO, paid ads, social, web development, branding, video — one team handling every channel means fewer gaps and faster results." },
              { title: "Data-Driven Decisions", desc: "Every recommendation is backed by data. We track what works, cut what doesn't, and optimize continuously." },
              { title: "Global Reach, Local Understanding", desc: "We serve businesses across the USA, Canada, UAE, UK, Australia, and Saudi Arabia with market-specific strategies." },
              { title: "Transparent Reporting", desc: "Clear dashboards and regular reports show exactly where your budget goes and what results it produces." },
              { title: "Flexible Engagements", desc: "No cookie-cutter packages. We build custom plans around your goals, budget, and timeline." },
            ].map((item) => (
              <div key={item.title} className="p-8 bg-white border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">{item.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 lg:px-12 py-20" aria-label="How it works">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>How It Works</SectionLabel>
            <SectionTitle>From Discovery to Results in 4 Steps</SectionTitle>
          </Animate>
          <Stagger stagger={100} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 mt-12">
            {[
              { num: "01", title: "Discovery", desc: "We learn your business, audience, competitors, and goals through a thorough discovery process." },
              { num: "02", title: "Strategy", desc: "We build a custom strategy with clear KPIs, channel recommendations, and a realistic timeline." },
              { num: "03", title: "Execution", desc: "Our specialists launch and manage campaigns across every channel in your plan." },
              { num: "04", title: "Optimization", desc: "We analyze performance data, optimize continuously, and scale what works." },
            ].map((step, i) => (
              <div key={step.num} className={`p-8 ${i < 3 ? "border-b lg:border-b-0 lg:border-r border-gray-200" : ""}`}>
                <div className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-gray-200 mb-4">{step.num}</div>
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black uppercase tracking-wide mb-3">{step.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </Stagger>
          <Animate animation="fade-up" delay={200}>
            <div className="mt-10 text-center">
              <Link href="/process" className="inline-flex items-center gap-2 text-base font-bold text-black hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                Learn More About Our Process &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* Markets */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white" aria-label="Markets we serve">
        <div className="max-w-7xl mx-auto text-center">
          <Animate animation="fade-up">
            <SectionLabel>Global Reach</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight mt-3">
              Markets We Serve
            </h2>
          </Animate>
          <Stagger stagger={100} animation="fade-up" className="flex flex-wrap justify-center gap-4 mt-12">
            {markets.map((m) => (
              <span key={m} className="px-6 py-3 border border-white/20 text-base font-medium text-gray-300 hover:border-white hover:text-white transition-colors motion-reduce:transition-none">
                {m}
              </span>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Common Engagements */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Common engagements">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>How Clients Work With Us</SectionLabel>
            <SectionTitle>Common Engagements</SectionTitle>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              { title: "Full-Stack Marketing", desc: "SEO, paid ads, social, email, and content managed as one integrated program. For businesses that want a single partner handling everything.", budget: "Ongoing retainer" },
              { title: "Google & Meta Ads Launch", desc: "Campaign setup, creative production, and ongoing optimization for businesses entering paid advertising or scaling existing campaigns.", budget: "Project or retainer" },
              { title: "Website Redesign + SEO", desc: "A new website built for performance, paired with technical SEO and content strategy to drive organic growth.", budget: "Project-based" },
              { title: "Brand Identity System", desc: "Logo, visual identity, brand guidelines, and messaging framework for startups or businesses going through a rebrand.", budget: "Project-based" },
              { title: "E-commerce Growth", desc: "Shopify or WooCommerce optimization, product feed management, Google Shopping, and conversion rate optimization.", budget: "Ongoing retainer" },
              { title: "Fractional CMO", desc: "Senior marketing leadership for businesses that need strategic direction without a full-time executive hire.", budget: "Monthly advisory" },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 motion-reduce:transition-none">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-2">{item.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed mb-3">{item.desc}</p>
                <span className="text-base font-medium text-gray-400">{item.budget}</span>
              </div>
            ))}
          </Stagger>
          <Animate animation="fade-up" delay={200}>
            <div className="mt-10 text-center">
              <Link href="/pricing" className="inline-flex items-center gap-2 text-base font-bold text-black hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                View Pricing Models &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* Latest Blog */}
      <section className="px-6 lg:px-12 py-20" aria-label="Latest insights">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex items-end justify-between mb-12">
              <div>
                <SectionLabel>Insights</SectionLabel>
                <SectionTitle>Latest from the Blog</SectionTitle>
              </div>
              <Link href="/blog" className="hidden md:inline-flex items-center gap-2 text-base font-bold text-black hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                View All &rarr;
              </Link>
            </div>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getPublishedPosts(3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group border border-gray-200 hover:border-black/30 hover:shadow-md transition-all duration-300 motion-reduce:transition-none flex flex-col focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
                  {post.cover_image ? (
                    <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 motion-reduce:transition-none" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-5xl text-gray-300" aria-hidden="true">&#9998;</span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-base font-bold text-black uppercase tracking-wide mb-2">{post.category}</span>
                  <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black group-hover:underline mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-base text-gray-500 leading-relaxed flex-1 line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </Stagger>
          <div className="mt-8 text-center md:hidden">
            <Link href="/blog" className="inline-flex items-center gap-2 text-base font-bold text-black hover:underline">View All Articles &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="px-6 lg:px-12 py-16 bg-gray-50" aria-label="Free resources">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Resources</SectionLabel>
            <SectionTitle>150+ Free Marketing Tools</SectionTitle>
            <p className="text-lg text-gray-500 mt-4 max-w-2xl">Interactive calculators, audit scorecards, generators, and planners to help you grow.</p>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {[
              { title: "ROI Calculator", desc: "Estimate your digital marketing return on investment.", href: "/resources/roi-calculator" },
              { title: "Website Grader", desc: "Score your website across performance, SEO, and UX.", href: "/resources/website-grader" },
              { title: "Headline Analyzer", desc: "Test your blog titles, ad copy, and email subjects.", href: "/resources/headline-analyzer" },
              { title: "Budget Calculator", desc: "Get a recommended channel allocation for your budget.", href: "/resources/budget-calculator" },
              { title: "SEO Audit Score", desc: "Check 40 SEO factors and get your site health score.", href: "/resources/seo-audit-score" },
              { title: "Persona Builder", desc: "Build detailed buyer personas for your strategy.", href: "/resources/persona-builder" },
              { title: "Competitor Analysis", desc: "Map your competitive landscape interactively.", href: "/resources/competitor-analysis" },
              { title: "Service Finder Quiz", desc: "Answer 5 questions, get personalized recommendations.", href: "/services/finder" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className="group bg-white border border-gray-200 hover:border-black/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 motion-reduce:transition-none p-6 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black group-hover:underline mb-2">{r.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{r.desc}</p>
              </Link>
            ))}
          </Stagger>
          <Animate animation="fade-up" delay={200}>
            <div className="mt-8 text-center">
              <Link href="/resources" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                View All 150+ Free Tools &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-12 py-20" aria-label="Frequently asked questions">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>{t.home.faqSubtitle}</SectionLabel>
            <SectionTitle>{t.home.faqTitle}</SectionTitle>
          </Animate>
          <div className="mt-10 space-y-0">
            {faqItems.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <details className="group border-b border-gray-200">
                  <summary className="flex justify-between items-center py-5 cursor-pointer text-base font-bold text-black list-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                    {item.q}
                    <span className="text-xl text-gray-500 group-open:rotate-45 transition-transform motion-reduce:transition-none flex-shrink-0 ml-4" aria-hidden="true">+</span>
                  </summary>
                  <div className="pb-5 text-base text-gray-500 leading-relaxed">{item.a}</div>
                </details>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-24 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold tracking-tight leading-[1.1]">
              Ready to Grow Your Business?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-10 leading-relaxed">
              Talk to our team about a strategy built around your goals. No pitch decks, no fluff — just a straightforward conversation about what will work.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                Start Your Project &rarr;
              </Link>
              <Link href="/work" className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                View Our Work
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    </article>
  );
}
