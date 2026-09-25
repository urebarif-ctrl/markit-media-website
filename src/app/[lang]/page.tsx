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
  { icon: Home, title: "Exterior Cleaning Marketing", href: "/industries/exterior-cleaning", featured: true, desc: "Lead generation for window cleaning, pressure washing, soft washing, roof and gutter cleaning." },
  { icon: HeartHandshake, title: "Rehab & Recovery Center Marketing", href: "/industries/rehab-recovery", featured: true, desc: "Search, paid media, content and digital growth for treatment and recovery organizations." },
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

const markets = [
  { name: "United States", flag: "🇺🇸", href: "/locations/united-states" },
  { name: "Canada", flag: "🇨🇦", href: "/locations/canada" },
  { name: "United Arab Emirates", flag: "🇦🇪", href: "/locations/uae" },
  { name: "United Kingdom", flag: "🇬🇧", href: "/locations/uk" },
  { name: "Australia", flag: "🇦🇺", href: "/locations/australia" },
  { name: "Saudi Arabia", flag: "🇸🇦", href: "/locations/saudi-arabia" },
];

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

      <section className="px-6 lg:px-12 py-24 bg-gray-50" aria-label="Selected client work">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Selected Client Work</SectionLabel>
            <SectionTitle>Work You Can See. Craft You Can Judge.</SectionTitle>
            <SectionDesc>From brand systems and social campaigns to food, fashion and digital experiences — explore real work created by Markit Media for real client briefs.</SectionDesc>
          </Animate>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-12">
            {[
              {src:"/images/portfolio/fashion-feed-hero.jpg",eyebrow:"Fashion · E-commerce",title:"Fashion Feed",desc:"Campaign-ready visual direction and social creative built for a fast-moving fashion audience.",href:"/work/fashion-feed",span:"lg:col-span-7"},
              {src:"/images/portfolio/foodfolio-hero.jpg",eyebrow:"Food · Brand Creative",title:"FoodFolio",desc:"Food-focused creative spanning brand presentation, product storytelling and social content.",href:"/work/foodfolio",span:"lg:col-span-5"},
              {src:"/images/portfolio/social-media-hero.jpg",eyebrow:"Social · Campaigns",title:"Social Media Designs",desc:"A cross-industry selection of social creative designed to make brands look sharper in the feed.",href:"/work/social-media-designs",span:"lg:col-span-5"},
              {src:"/images/portfolio/logo-folio-hero.jpg",eyebrow:"Branding · Identity",title:"LogoFolio",desc:"Identity and logo work across technology, food, energy, retail and emerging brands.",href:"/work/logo-folio",span:"lg:col-span-7"},
            ].map((item,idx)=><Link key={item.href} href={item.href} className={`group relative overflow-hidden bg-black min-h-[360px] md:min-h-[430px] ${item.span}`}>
              <Image src={item.src} alt={item.title+" — selected work by Markit Media"} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.035] motion-reduce:transition-none"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"/>
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white">
                <div className="flex items-end justify-between gap-6">
                  <div className="max-w-xl">
                    <p className="text-xs md:text-sm font-bold uppercase tracking-[0.16em] text-white/70">{item.eyebrow}</p>
                    <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold mt-2">{item.title}</h3>
                    <p className="text-sm md:text-base text-white/75 leading-relaxed mt-2 max-w-lg">{item.desc}</p>
                  </div>
                  <span aria-hidden="true" className="shrink-0 w-11 h-11 rounded-full border border-white/40 flex items-center justify-center text-xl transition-transform group-hover:translate-x-1 motion-reduce:transition-none">&rarr;</span>
                </div>
              </div>
            </Link>)}
          </div>

          <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <Link href="/work" className="inline-flex items-center gap-2 font-bold hover:underline">Explore all work &rarr;</Link>
            <Link href="/case-studies" className="inline-flex items-center gap-2 text-gray-500 font-semibold hover:text-black transition-colors">View client case studies &rarr;</Link>
          </div>
        </div>
      </section>
      {/* Platform ecosystem */}
      <section className="border-y border-gray-200 py-12 bg-white" aria-label="Platforms and services we work with">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Animate animation="fade-up">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-[0.18em] text-center">Platforms & services we work with</p>
            <p className="text-base text-gray-500 text-center mt-2 mb-7">Explore the specialist service behind each platform.</p>
          </Animate>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-3">
            {[
              ["Meta Ads","/services/performance-marketing/meta-ads","https://cdn.simpleicons.org/meta"],
              ["Google Ads","/services/performance-marketing/google-ads","https://cdn.simpleicons.org/googleads"],
              ["Facebook","/services/performance-marketing/meta-ads","https://cdn.simpleicons.org/facebook"],
              ["Instagram","/services/performance-marketing/meta-ads","https://cdn.simpleicons.org/instagram"],
              ["Microsoft Ads","/services/performance-marketing/microsoft-ads","/brand/microsoft-ads.svg"],
              ["YouTube","/services/performance-marketing/youtube-ads","https://cdn.simpleicons.org/youtube"],
              ["TikTok","/services/performance-marketing/tiktok-ads","https://cdn.simpleicons.org/tiktok"],
              ["LinkedIn","/services/performance-marketing/linkedin-ads","/brand/linkedin.svg"],
              ["Shopify","/services/website-development/shopify","https://cdn.simpleicons.org/shopify"],
              ["WordPress","/services/website-development/wordpress","https://cdn.simpleicons.org/wordpress"],
            ].map(([label,href,src])=><Link key={label} href={href} aria-label={`Explore ${label} services`} className="group min-h-24 flex flex-col items-center justify-center gap-3 border border-gray-200 p-3 hover:border-black hover:shadow-md hover:-translate-y-0.5 transition-all">
              <img src={src} alt={`${label} logo`} width="34" height="34" loading="lazy" className="h-9 w-9 object-contain"/>
              <span className="text-[11px] font-bold text-gray-600 group-hover:text-black text-center">{label}</span>
            </Link>)}
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
          <div className="grid lg:grid-cols-2 gap-4 mt-10 mb-5">
            {industries.filter((ind) => "featured" in ind && ind.featured).map((ind) => {
              const Icon = ind.icon;
              return <Link key={ind.href} href={ind.href} className="group relative overflow-hidden bg-black text-white p-7 sm:p-8 min-h-56 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <div className="flex items-start justify-between"><div className="w-14 h-14 bg-white text-black flex items-center justify-center"><Icon size={27} strokeWidth={2} aria-hidden="true"/></div><span className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">Specialist Industry</span></div>
                <div className="mt-8"><h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold max-w-md">{ind.title}</h3><p className="text-gray-400 mt-3 max-w-xl leading-relaxed">{"desc" in ind ? ind.desc : ""}</p><span className="inline-block mt-5 font-bold">Explore industry expertise ↗</span></div>
              </Link>;
            })}
          </div>
          <Stagger stagger={45} animation="fade-up" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {industries.filter((ind) => !("featured" in ind && ind.featured)).slice(0,14).map((ind) => {
              const Icon = ind.icon;
              return <Link key={ind.href} href={ind.href} className="group bg-gray-50 border border-gray-200 hover:bg-white hover:border-black hover:shadow-md transition-all p-5 min-h-32 flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <div className="w-10 h-10 bg-white border border-gray-200 text-gray-600 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors"><Icon size={20} strokeWidth={2} aria-hidden="true"/></div>
                <div className="flex items-end justify-between gap-3 mt-5"><h3 className="font-[family-name:var(--font-display)] text-sm sm:text-base font-bold text-black">{ind.title}</h3><span className="text-gray-400 group-hover:text-black">↗</span></div>
              </Link>;
            })}
          </Stagger>
          <div className="mt-8 text-center"><Link href="/industries" className="inline-flex items-center gap-2 font-bold border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors">Explore All Industries →</Link></div>
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
      <section className="px-6 lg:px-12 py-24 bg-white" aria-label="How we work">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>How We Work</SectionLabel>
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end">
              <div className="lg:col-span-8">
                <SectionTitle>Less Guesswork. More Forward Motion.</SectionTitle>
              </div>
              <p className="lg:col-span-4 text-base md:text-lg text-gray-500 leading-relaxed lg:pb-2">A clear operating rhythm from the first conversation to ongoing growth — with decisions grounded in your goals, real performance data, and what customers actually do.</p>
            </div>
          </Animate>

          <Stagger stagger={90} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {[
              { num: "01", eyebrow: "Understand", title: "Find the Real Opportunity", desc: "We unpack your goals, audience, offer, competition, existing performance, and constraints before recommending a channel or tactic.", mark: "↘" },
              { num: "02", eyebrow: "Plan", title: "Turn Insight Into a Roadmap", desc: "We prioritize the channels, creative, journeys, KPIs, and experiments most likely to move the business forward.", mark: "◎" },
              { num: "03", eyebrow: "Build & Launch", title: "Put the Strategy to Work", desc: "Specialists turn the plan into campaigns, content, experiences, and systems — then launch with measurement in place.", mark: "→" },
              { num: "04", eyebrow: "Learn & Scale", title: "Improve What the Data Proves", desc: "We review signals, test deliberately, cut waste, strengthen what performs, and keep the next move tied to evidence.", mark: "↗" },
            ].map((step) => (
              <div key={step.num} className="group relative min-h-[370px] bg-gray-50 border border-gray-200 p-7 md:p-8 overflow-hidden hover:bg-black hover:border-black transition-colors duration-300 motion-reduce:transition-none">
                <div className="flex items-start justify-between">
                  <span className="font-[family-name:var(--font-display)] text-sm font-extrabold tracking-[0.18em] text-gray-400 group-hover:text-white/45">{step.num}</span>
                  <span aria-hidden="true" className="font-[family-name:var(--font-display)] text-4xl font-light text-gray-300 group-hover:text-white/70">{step.mark}</span>
                </div>
                <div className="mt-20">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400 group-hover:text-white/55">{step.eyebrow}</p>
                  <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-extrabold text-black group-hover:text-white tracking-tight leading-tight mt-3">{step.title}</h3>
                  <p className="text-sm md:text-base text-gray-500 group-hover:text-white/65 leading-relaxed mt-4">{step.desc}</p>
                </div>
              </div>
            ))}
          </Stagger>

          <Animate animation="fade-up" delay={180}>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border-t border-gray-200 pt-7">
              <p className="text-sm text-gray-500">No black-box process. You know what we&apos;re doing, why we&apos;re doing it, and what we&apos;re learning.</p>
              <Link href="/process" className="inline-flex items-center gap-3 font-bold text-black whitespace-nowrap group">See our full process <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span></Link>
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
              <Link key={m.name} href={m.href} className="group flex items-center gap-3 px-5 py-3.5 border border-white/20 text-base font-medium text-gray-300 hover:border-white/70 hover:bg-white hover:text-black transition-all motion-reduce:transition-none">
                <span className="text-2xl leading-none" aria-hidden="true">{m.flag}</span>
                <span>{m.name}</span>
                <span className="text-white/35 group-hover:text-black/50" aria-hidden="true">&rarr;</span>
              </Link>
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
          <Animate animation="fade-up"><SectionLabel>Platform Experience</SectionLabel><SectionTitle>Built Inside the Platforms That Drive Growth</SectionTitle><SectionDesc>Hands-on strategy and execution across paid media and commerce — from campaign structure and creative testing to storefronts, measurement, and optimization.</SectionDesc></Animate>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">{[
            { label: "Paid Search", title: "Google Ads", logo: "https://cdn.simpleicons.org/googleads", href: "/services/performance-marketing/google-ads", desc: "Search strategy, campaign structure, conversion measurement, account optimization, and scalable paid acquisition." },
            { label: "Paid Social", title: "Meta", logo: "https://cdn.simpleicons.org/meta", href: "/services/performance-marketing/meta-ads", desc: "Facebook and Instagram campaigns, creative testing, lead generation, audience strategy, and performance optimization." },
            { label: "E-commerce", title: "Shopify", logo: "https://cdn.simpleicons.org/shopify", href: "/services/website-development/shopify", desc: "Store strategy, Shopify builds, merchandising, paid growth, and conversion-focused customer journeys." },
          ].map(item=><Link key={item.title} href={item.href} className="group relative overflow-hidden border border-gray-200 bg-gray-50 p-7 md:p-8 hover:bg-white hover:border-gray-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
            <div className="flex items-start justify-between gap-5">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                <Image src={item.logo} alt="" width={36} height={36} className="w-9 h-9 object-contain"/>
              </div>
              <span className="text-sm font-bold text-gray-400 group-hover:text-black transition-colors">&rarr;</span>
            </div>
            <div className="mt-8 text-sm font-bold uppercase tracking-[0.14em] text-gray-400">{item.label}</div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold mt-2">{item.title}</h2>
            <p className="text-base text-gray-500 leading-relaxed mt-3">{item.desc}</p>
            <div className="mt-6 pt-5 border-t border-gray-200 text-sm font-bold">Explore our {item.title} work <span aria-hidden="true">&rarr;</span></div>
          </Link>)}</div>
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
          <Stagger stagger={50} animation="fade-up" className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-9">
            {[
              { title: "ROI Calculator", tag:"Performance", icon:"↗", desc: "Estimate marketing return from spend, revenue and campaign economics.", href: "/resources/roi-calculator" },
              { title: "Website Grader", tag:"Website", icon:"◎", desc: "Review performance, SEO and UX signals in one practical scorecard.", href: "/resources/website-grader" },
              { title: "Headline Analyzer", tag:"Content", icon:"Aa", desc: "Pressure-test headlines for ads, landing pages, blogs and email.", href: "/resources/headline-analyzer" },
              { title: "Budget Calculator", tag:"Media Planning", icon:"$", desc: "Build a starting channel allocation around your available marketing budget.", href: "/resources/budget-calculator" },
              { title: "SEO Audit Score", tag:"SEO", icon:"⌕", desc: "Check key technical and on-page factors and identify optimization priorities.", href: "/resources/seo-audit-score" },
              { title: "Persona Builder", tag:"Strategy", icon:"◉", desc: "Turn audience assumptions into a more structured buyer-persona brief.", href: "/resources/persona-builder" },
              { title: "Competitor Analysis", tag:"Research", icon:"◇", desc: "Organize competitor positioning, channels and market observations.", href: "/resources/competitor-analysis" },
              { title: "Service Finder Quiz", tag:"Start Here", icon:"→", desc: "Answer a few questions and find the Markit Media services most relevant to you.", href: "/services/finder" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className="group bg-white border border-gray-200 hover:border-black hover:-translate-y-1 hover:shadow-lg transition-all p-6 min-h-56 flex flex-col focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <div className="flex items-start justify-between gap-3"><span className="text-xs font-bold uppercase tracking-[0.14em] text-gray-400">{r.tag}</span><span className="w-10 h-10 bg-black text-white flex items-center justify-center font-extrabold text-lg">{r.icon}</span></div>
                <div className="mt-auto pt-8"><h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline">{r.title}</h3><p className="text-sm text-gray-500 leading-relaxed mt-3">{r.desc}</p><span className="inline-block mt-5 text-sm font-bold">Open free tool →</span></div>
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
