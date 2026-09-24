import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { getDictionary } from "@/i18n/dictionaries";
import { getPublishedPosts } from "@/lib/blog";
import { SOCIAL_URLS } from "@/lib/social";
import {
  Search, Share2, Code, Palette, Video, Bot, Mail, TrendingUp,
  BarChart3, ShoppingCart, Megaphone, FileText, Briefcase,
  Building2, Utensils, Heart, Home, Shirt, Zap,
  GraduationCap, Scale, Cloud, Landmark,
  Hotel, Dumbbell, Car, HeartHandshake,
  Building, Plane, Factory,
} from "lucide-react";
import { HeroStats } from "@/components/hero-stats";
import { TypingEffect } from "@/components/typing-effect";
import { YouTubeEmbed } from "@/components/youtube-embed";

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
  { icon: Home, title: "Exterior Cleaning", href: "/industries/exterior-cleaning" },
  { icon: HeartHandshake, title: "Rehab & Recovery", href: "/industries/rehab-recovery" },
  { icon: Briefcase, title: "Personal Branding", href: "/industries/personal-branding" },
  { icon: ShoppingCart, title: "Food Ingredients E-commerce", href: "/industries/food-ingredients-ecommerce" },
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
  { q: "Which industries do you work with?", a: "We work across exterior cleaning, rehab and recovery, EV charging, restaurants, e-commerce, food ingredients, fashion, executive personal branding, home services, healthcare, real estate, B2B, and more." },
  { q: "Do you have specialist experience in exterior cleaning?", a: "Yes. Exterior cleaning is a specialist vertical for us, including window cleaning, pressure washing, soft washing, roof cleaning, gutter cleaning, commercial exterior cleaning, and related local-service growth systems." },
  { q: "Can you manage both Google Ads and Meta Ads?", a: "Yes. We plan and manage Google Ads and Meta campaigns, then connect paid acquisition with landing pages, creative, CRM follow-up, and reporting where the client stack allows it." },
  { q: "Do you work with Shopify stores?", a: "Yes. Our e-commerce work includes Shopify strategy, store development, product and feed optimization, paid acquisition, conversion improvement, and retention-oriented marketing." },
  { q: "Where are your clients based?", a: "We serve clients across the USA, Canada, UAE, UK, Australia, and Saudi Arabia." },
  { q: "Do you provide digital marketing services for businesses in the USA?", a: "Yes. We support U.S. businesses with Google Ads, Meta Ads, SEO, local SEO, website development, creative, analytics, and growth strategy, with scopes tailored to the market, industry, and acquisition goals." },
  { q: "How much does a digital marketing agency cost in the USA?", a: "Agency pricing in the USA varies by channels, media spend, competition, creative requirements, and reporting needs. We scope engagements around the services and operating requirements rather than using one package for every business." },
  { q: "Can you manage Google Ads and PPC for multi-location U.S. businesses?", a: "Yes. We can structure paid search and local acquisition around multiple locations, including location-specific campaigns, landing pages, conversion tracking, budget allocation, and reporting." },
  { q: "Do you provide white-label PPC services for U.S. agencies?", a: "Yes. Our white-label model can support agencies with Google Ads, Meta Ads, SEO, development, creative, and fulfillment while the partner agency retains its client relationship." },
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
    sameAs: SOCIAL_URLS,
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
      target: { "@type": "EntryPoint", urlTemplate: "https://themarkitmedia.com/en/blog?q={search_term_string}" },
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
    <article className="home-page">
      <JsonLd data={orgSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero */}
      <section className="home-hero relative bg-black overflow-hidden pt-20" aria-label="Hero">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <Animate animation="fade-up">
                <span className="inline-block text-base font-bold text-white/50 uppercase tracking-[0.2em] mb-6">Full-Stack Digital Agency</span>
                <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.5vw,4rem)] font-extrabold text-white tracking-tight leading-[1.08]">
                  {t.home.heroTitle}
                </h1>
              </Animate>
              <Animate animation="fade-up" delay={150}>
                <p className="text-xl text-gray-400 leading-relaxed mt-6 max-w-lg">
                  {t.home.heroSubtitle}
                </p>
              </Animate>
              <Animate animation="fade-up" delay={250}>
                <div className="mt-5 h-10 flex items-center">
                  <TypingEffect
                    phrases={[
                      "Performance Marketing",
                      "SEO That Ranks",
                      "Websites That Convert",
                      "Brands That Stand Out",
                      "Video Production",
                      "AI-Powered Solutions",
                    ]}
                    className="text-lg text-white/70 font-medium"
                  />
                </div>
              </Animate>
              <Animate animation="fade-up" delay={350}>
                <div className="flex flex-wrap gap-4 mt-8">
                  <Link href="/get-a-quote" className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                    Request a Quote &rarr;
                  </Link>
                  <Link href="/work" className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                    {t.cta.secondary}
                  </Link>
                </div>
              </Animate>
            </div>
            <div className="hidden lg:block relative">
              <Animate animation="fade-up" delay={200}>
                <div className="relative grid grid-cols-2 gap-3 p-3 border border-white/10 bg-white/[0.025]">
                  <div className="space-y-4">
                    <div className="bg-white/[0.06] border border-white/10 p-6 hover:bg-white/[0.09] transition-colors">
                      <div className="text-3xl font-extrabold text-white font-[family-name:var(--font-display)]">300+</div>
                      <div className="text-base text-gray-500 mt-1">Videos Produced</div>
                    </div>
                    <div className="bg-white/[0.06] border border-white/10 p-6 hover:bg-white/[0.09] transition-colors">
                      <div className="text-3xl font-extrabold text-white font-[family-name:var(--font-display)]">6</div>
                      <div className="text-base text-gray-500 mt-1">Countries Served</div>
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="bg-white/[0.06] border border-white/10 p-6 hover:bg-white/[0.09] transition-colors">
                      <div className="text-3xl font-extrabold text-white font-[family-name:var(--font-display)]">12+</div>
                      <div className="text-base text-gray-500 mt-1">Services Offered</div>
                    </div>
                    <div className="bg-white/[0.06] border border-white/10 p-6 hover:bg-white/[0.09] transition-colors">
                      <div className="text-3xl font-extrabold text-white font-[family-name:var(--font-display)]">155+</div>
                      <div className="text-base text-gray-500 mt-1">Free Marketing Tools</div>
                    </div>
                  </div>
                </div>
              </Animate>
            </div>
          </div>
          <Animate animation="fade-up" delay={450}>
            <div className="mt-14 lg:hidden">
              <HeroStats />
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Selected project proof"><div className="max-w-7xl mx-auto">
        <Animate animation="fade-up"><SectionLabel>Selected Work</SectionLabel><SectionTitle>Real Creative Work, Not Stock Case Studies</SectionTitle><SectionDesc>Selected portfolio assets already produced across fashion, food and beverage, social media, branding, and campaign creative.</SectionDesc></Animate>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">{[
          {src:"/images/portfolio/fashion-feed-hero.jpg",title:"Fashion & E-commerce",href:"/work/fashion-feed"},
          {src:"/images/portfolio/foodfolio-hero.jpg",title:"Food & Beverage",href:"/work/foodfolio"},
          {src:"/images/portfolio/social-media-hero.jpg",title:"Social Media Creative",href:"/work/social-media-designs"},
        ].map(item=><Link key={item.href} href={item.href} className="group bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"><div className="relative aspect-[4/3]"><Image src={item.src} alt={item.title+" project by Markit Media"} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover"/></div><div className="p-5 flex justify-between"><span className="font-bold">{item.title}</span><span>&rarr;</span></div></Link>)}</div>
        <div className="mt-8"><Link href="/case-studies" className="font-bold hover:underline">Explore case studies &rarr;</Link></div>
      </div></section>
      {/* Platform Logos */}
      <section className="border-y border-gray-200 py-8 bg-white" aria-label="Platform we work with">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-base font-bold text-gray-400 uppercase tracking-widest text-center mb-6">Platform we work with</p>
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-14">
            {/* Facebook */}
            <svg className="h-10 lg:h-11 text-gray-400 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="Facebook"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            {/* Instagram */}
            <svg className="h-10 lg:h-11 text-gray-400 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="Instagram"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            {/* Google */}
            <svg className="h-10 lg:h-11 text-gray-400 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="Google"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
            {/* LinkedIn */}
            <svg className="h-10 lg:h-11 text-gray-400 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="LinkedIn"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            {/* YouTube */}
            <svg className="h-10 lg:h-11 text-gray-400 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="YouTube"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            {/* TikTok */}
            <svg className="h-10 lg:h-11 text-gray-400 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="TikTok"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
            {/* X (Twitter) */}
            <svg className="h-9 lg:h-10 text-gray-400 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="X"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
            {/* Pinterest */}
            <svg className="h-10 lg:h-11 text-gray-400 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="Pinterest"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/></svg>
            {/* Snapchat */}
            <svg className="h-10 lg:h-11 text-gray-400 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="Snapchat"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301a.603.603 0 01.262-.052c.145 0 .33.037.515.2a.682.682 0 01.147.684c-.12.349-.396.57-.618.717a2.594 2.594 0 01-.36.209c-.075.038-.225.124-.255.18-.045.089.014.239.074.36.089.181.187.373.275.555 1.062 2.183 2.395 3.01 3.07 3.272.164.063.299.117.389.165a.522.522 0 01.277.47c0 .155-.059.314-.241.451-.3.221-.81.38-1.38.49-.089.018-.144.095-.165.177-.025.101-.06.261-.103.404a.59.59 0 01-.58.429 3.476 3.476 0 01-.535-.039c-.209-.033-.44-.065-.74-.065-.345 0-.674.04-1.003.12a4.66 4.66 0 00-.92.382c-.695.389-1.494.835-2.986.835-1.434 0-2.24-.434-2.952-.84a4.484 4.484 0 00-.91-.38 5.048 5.048 0 00-.999-.12c-.299 0-.526.029-.733.063a3.476 3.476 0 01-.538.039.586.586 0 01-.577-.423 7.92 7.92 0 01-.107-.414c-.019-.078-.073-.155-.163-.174-.567-.11-1.075-.268-1.379-.494a.466.466 0 01-.237-.442.52.52 0 01.279-.471c.09-.048.225-.1.389-.165.676-.263 2.009-1.089 3.072-3.272a9.26 9.26 0 00.275-.556c.06-.12.119-.271.074-.36-.03-.056-.18-.142-.255-.18-.225-.114-.54-.264-.795-.465-.24-.19-.355-.404-.345-.63a.649.649 0 01.48-.56c.114-.044.24-.064.36-.064.105 0 .209.015.299.045.379.121.717.225 1.033.301.196 0 .324-.044.399-.09a18.82 18.82 0 01-.033-.57c-.104-1.628-.23-3.654.3-4.847C7.854 1.069 11.213.793 12.206.793z"/></svg>
            {/* WhatsApp */}
            <svg className="h-10 lg:h-11 text-gray-400 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="WhatsApp"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            {/* Shopify */}
            <svg className="h-10 lg:h-11 text-gray-400 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="Shopify"><path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104zm-1.332-17.22c0-.136-.012-.26-.033-.381-.592-.304-1.248-.473-1.941-.473-.154 0-.32.017-.467.025.252-.544.685-.972 1.217-1.178.133-.052.271-.092.422-.11.14-.017.281-.017.403.009.275.059.533.199.748.401l-.349 1.707z"/></svg>
            {/* WordPress */}
            <svg className="h-10 lg:h-11 text-gray-400 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="WordPress"><path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.027-.78-.07-1.109m-7.981.105c.647-.034 1.233-.105 1.233-.105.58-.07.512-.921-.07-.892 0 0-1.744.14-2.87.14-1.058 0-2.835-.14-2.835-.14-.58-.029-.647.858-.068.892 0 0 .549.07 1.128.105l1.674 4.591-2.35 7.06L6.574 6.93c.648-.034 1.234-.105 1.234-.105.581-.07.513-.921-.069-.892 0 0-1.745.14-2.87.14-.202 0-.44-.006-.693-.015C5.88 3.528 8.739 2 12 2c2.426 0 4.636.885 6.332 2.349-.04-.003-.078-.01-.12-.01-1.057 0-1.807.921-1.807 1.91 0 .892.512 1.643 1.057 2.534.41.717.888 1.636.888 2.962 0 .921-.352 1.986-.82 3.473l-1.073 3.586-3.892-11.574m-3.726 1.31L7.18 16.66c-.07.172-.13.36-.172.557a7.96 7.96 0 01-4.008-6.9c0-1.37.347-2.66.955-3.787l4.795 11.61zM12 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10"/></svg>
            {/* Reddit */}
            <svg className="h-10 lg:h-11 text-gray-400 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="Reddit"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
            {/* Behance */}
            <svg className="h-9 lg:h-10 text-gray-400 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="Behance"><path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.62.16-1.26.24-1.93.24H0v-14.74h6.938zm-.34 6.058c.55 0 1.01-.15 1.36-.44.35-.296.527-.726.527-1.29 0-.326-.06-.6-.18-.82-.12-.22-.29-.39-.51-.51-.22-.12-.46-.2-.74-.24a4.377 4.377 0 0 0-.85-.08H3.59v3.38h2.998zm.18 6.372c.32 0 .63-.03.94-.1.31-.06.58-.17.82-.32.24-.15.43-.36.57-.63.14-.27.21-.6.21-.99 0-.78-.23-1.35-.68-1.7-.45-.36-1.03-.54-1.73-.54H3.59v4.28h3.18zm10.394-7.655c.57 0 1.09.1 1.56.3.47.2.88.49 1.22.87.34.37.6.82.78 1.35.18.52.27 1.1.27 1.73v.68H14.36c.04.89.33 1.55.87 2 .54.44 1.2.66 1.97.66.55 0 1.04-.12 1.48-.37.44-.25.73-.55.86-.92h2.55c-.36 1.08-.98 1.91-1.88 2.48-.9.57-1.94.85-3.14.85-.78 0-1.5-.13-2.15-.4-.65-.27-1.21-.65-1.67-1.14-.47-.49-.83-1.08-1.09-1.77-.26-.69-.39-1.45-.39-2.28 0-.79.13-1.53.39-2.22.26-.69.62-1.28 1.09-1.77.47-.49 1.03-.87 1.68-1.15.65-.28 1.37-.42 2.14-.42zm2.54 4.88c-.08-.65-.31-1.2-.7-1.64-.39-.44-.92-.66-1.58-.66-.42 0-.78.08-1.08.24-.3.16-.55.37-.74.62-.2.25-.34.53-.43.83-.09.3-.15.58-.17.86h4.7zM17.6 4.688h-5.3v1.5h5.3v-1.5z"/></svg>
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
          <Stagger stagger={60} animation="fade-up" className="service-mosaic mt-10">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Link key={s.href} href={s.href} className="service-tile group focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4">
                  <div className="service-tile-icon">
                    <Icon size={22} strokeWidth={2} aria-hidden="true" />
                  </div>
                  <h3 className="service-tile-title">
                    {s.title}
                  </h3>
                  <p className="service-tile-desc">{s.desc}</p><span className="service-tile-arrow" aria-hidden="true">↗</span>
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

      <section className="px-6 lg:px-12 py-16 bg-white border-b border-gray-200" aria-label="Credentials and proof">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up"><SectionLabel>Experience & Credentials</SectionLabel><SectionTitle>Platform Expertise Backed by Hands-On Execution</SectionTitle><SectionDesc>Strategy that works inside real ad accounts, stores, websites, creative workflows, CRMs, and reporting.</SectionDesc></Animate>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">{[
            { title: "Google Ads Certified", desc: "Search, paid acquisition, conversion strategy, measurement, and account optimization." },
            { title: "Meta Ads Certified", desc: "Facebook and Instagram strategy, creative testing, lead generation, and performance optimization." },
            { title: "Shopify Expertise", desc: "E-commerce strategy, Shopify builds, merchandising, paid growth, and conversion-focused customer journeys." },
          ].map(item=><div key={item.title} className="border border-gray-200 p-7 bg-gray-50"><div className="text-base font-bold uppercase tracking-[0.12em] text-gray-400">Platform credential</div><h2 className="text-xl font-extrabold mt-3">{item.title}</h2><p className="text-base text-gray-500 leading-relaxed mt-3">{item.desc}</p></div>)}</div>
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
                    <Image src={post.cover_image} alt={post.title} width={640} height={360} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 motion-reduce:transition-none" />
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
            <SectionTitle>155+ Free Marketing Tools</SectionTitle>
            <p className="text-lg text-gray-500 mt-4 max-w-2xl">Interactive calculators, audit scorecards, generators, and planners to help you grow.</p>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="resource-grid grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8">
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
              <Link key={r.href} href={r.href} className="resource-card group bg-white border border-gray-200 hover:border-black/30 hover:shadow-md transition-all duration-300 motion-reduce:transition-none p-4 sm:p-6 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black group-hover:underline mb-2">{r.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{r.desc}</p>
              </Link>
            ))}
          </Stagger>
          <Animate animation="fade-up" delay={200}>
            <div className="mt-8 text-center">
              <Link href="/free-tools" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                View All 155+ Free Tools &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* Selected Work / Client Showcase */}
      <section className="px-6 lg:px-12 py-16" aria-label="Selected work">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Selected Work</SectionLabel>
            <SectionTitle>Brands We&apos;ve Worked With</SectionTitle>
          </Animate>
          <Stagger stagger={40} animation="fade-up" className="flex flex-wrap justify-center gap-4 mt-10">
            {["NoorShad", "Vuse", "Cambridge Electrical", "HUBCO", "MeezoTech", "One Homes", "Minhaz Couture", "Pur Health", "American Auto Parts", "Yaar Bazaar"].map((name) => (
              <div key={name} className="bg-white border border-gray-200 px-6 py-4 text-base font-bold text-black/70">
                {name}
              </div>
            ))}
          </Stagger>
          <Animate animation="fade-up" delay={100}>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Link href="/work/noorshad" className="group bg-gray-50 border border-gray-200 hover:border-black/30 hover:shadow-md transition-all p-6 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <span className="text-base text-gray-400">Real Estate</span>
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black group-hover:underline mt-1">NoorShad</h3>
                <p className="text-base text-gray-500 mt-2">Video-first real estate branding with 9+ productions.</p>
              </Link>
              <Link href="/work/vuse" className="group bg-gray-50 border border-gray-200 hover:border-black/30 hover:shadow-md transition-all p-6 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <span className="text-base text-gray-400">Consumer Goods</span>
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black group-hover:underline mt-1">Vuse</h3>
                <p className="text-base text-gray-500 mt-2">Ongoing social media content for a global brand.</p>
              </Link>
              <Link href="/work/cambridge-electrical" className="group bg-gray-50 border border-gray-200 hover:border-black/30 hover:shadow-md transition-all p-6 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <span className="text-base text-gray-400">Consumer Electronics</span>
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black group-hover:underline mt-1">Cambridge Electrical</h3>
                <p className="text-base text-gray-500 mt-2">Seasonal campaigns driving engagement.</p>
              </Link>
            </div>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <div className="mt-8 text-center">
              <Link href="/work" className="inline-flex items-center gap-2 border-2 border-black text-black px-8 py-4 font-bold text-base hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                View All Projects &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* Creative Portfolio Preview */}
      <section className="px-6 lg:px-12 py-16 bg-gray-50" aria-label="Creative portfolio">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Creative Work</SectionLabel>
            <SectionTitle>Design &amp; Branding Portfolio</SectionTitle>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { src: "/images/portfolio/behance/fashion.jpg", alt: "Fashion social media design", href: "/work/fashion-feed" },
              { src: "/images/portfolio/behance/social-media-designs.jpg", alt: "Social media designs portfolio", href: "/work/social-media-designs" },
              { src: "/images/portfolio/behance/foodfolio.jpg", alt: "Food and beverage design portfolio", href: "/work/foodfolio" },
              { src: "/images/portfolio/behance/logofolio.jpg", alt: "Logo design portfolio", href: "/work/logo-folio" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="group relative aspect-[4/3] overflow-hidden bg-gray-100 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <Image src={item.src} alt={item.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-500 motion-reduce:transition-none" />
              </Link>
            ))}
          </Stagger>
          <Animate animation="fade-up" delay={100}>
            <div className="mt-8 text-center">
              <Link href="/work" className="inline-flex items-center gap-2 text-base font-bold text-black hover:underline">
                View Full Portfolio &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* Video Showreel */}
      <section className="px-6 lg:px-12 py-16 bg-black" aria-label="Video showreel">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <span className="text-base font-bold text-white/50 uppercase tracking-[0.15em]">Our Work in Motion</span>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-white tracking-tight mt-3">
              Watch What We Build
            </h2>
          </Animate>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <Animate animation="fade-up" delay={100}>
              <YouTubeEmbed videoId="jHv9-z58krE" title="NoorShad — Real Estate Video" />
              <p className="text-base text-gray-400 mt-3">NoorShad — Property Tour</p>
            </Animate>
            <Animate animation="fade-up" delay={200}>
              <YouTubeEmbed videoId="CIr1dFqvmfM" title="HUBCO — Logo Animation" />
              <p className="text-base text-gray-400 mt-3">HUBCO — Logo Animation</p>
            </Animate>
            <Animate animation="fade-up" delay={300}>
              <YouTubeEmbed videoId="TGH1Rgpuzf4" title="HUBCO — Commercial" />
              <p className="text-base text-gray-400 mt-3">HUBCO — Commercial</p>
            </Animate>
          </div>
          <Animate animation="fade-up" delay={350}>
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <Link href="/work" className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 text-base font-bold hover:bg-white hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                View All Projects &rarr;
              </Link>
              <a href="https://www.youtube.com/@themarkitmedia" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-base font-medium text-gray-400 hover:text-white transition-colors">
                300+ videos on YouTube &rarr;
              </a>
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

    </article>
  );
}
