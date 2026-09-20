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

export default async function HomePage() {
  const t = await getDictionary();

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

      {/* Trust Bar */}
      <section className="border-y border-gray-200 py-6 overflow-hidden" aria-label="Capabilities">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-8 text-base font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap overflow-hidden">
            {["SEO", "Performance Marketing", "Social Media", "Web Development", "Branding", "Video Production", "AI Solutions", "Email Marketing", "Content Strategy", "Paid Advertising", "Analytics", "BPO"].map((item, i) => (
              <span key={i} className="flex items-center gap-8">
                <span>{item}</span>
                <span className="w-1.5 h-1.5 bg-black rounded-full flex-shrink-0" aria-hidden="true" />
              </span>
            ))}
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
                    <img src={post.cover_image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 motion-reduce:transition-none" />
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
            <SectionTitle>Tools to Help You Grow</SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {[
              { title: "Service Finder", desc: "Take a quick quiz and get personalized service recommendations.", href: "/services/finder" },
              { title: "Headline Analyzer", desc: "Test your blog titles, ad copy, and email subjects for impact.", href: "/resources/headline-analyzer" },
              { title: "ROI Calculator", desc: "Estimate your digital marketing return on investment.", href: "/resources/roi-calculator" },
              { title: "Website Grader", desc: "Score your website across performance, SEO, and UX.", href: "/resources/website-grader" },
              { title: "Marketing Stats 2026", desc: "35+ benchmarks across SEO, PPC, social, email, and AI.", href: "/resources/marketing-statistics-2026" },
              { title: "Meta Description Tool", desc: "Write and optimize meta descriptions for better CTR.", href: "/resources/meta-description-generator" },
              { title: "Social Share Preview", desc: "See how your links look on Facebook, Twitter, and LinkedIn.", href: "/resources/og-preview" },
              { title: "Budget Calculator", desc: "Get a recommended channel allocation for your budget.", href: "/resources/budget-calculator" },
              { title: "Ad Copy Generator", desc: "Generate ad copy for Google, Facebook, LinkedIn, and email.", href: "/resources/ad-copy-generator" },
              { title: "Email Subject Tester", desc: "Test your subject lines for deliverability and engagement.", href: "/resources/email-subject-tester" },
              { title: "Brand Name Generator", desc: "Get instant brand name ideas for your business.", href: "/resources/brand-name-generator" },
              { title: "Competitor Analysis", desc: "Map your competitive landscape with our interactive worksheet.", href: "/resources/competitor-analysis" },
              { title: "UTM Link Builder", desc: "Generate tracked URLs for your marketing campaigns.", href: "/resources/utm-builder" },
              { title: "Contrast Checker", desc: "Test color combinations for WCAG accessibility compliance.", href: "/resources/contrast-checker" },
              { title: "Marketing Trends 2026", desc: "10 shifts shaping digital marketing this year.", href: "/resources/marketing-trends-2026" },
              { title: "Speed Assessment", desc: "Score your website speed with prioritized recommendations.", href: "/resources/speed-test" },
              { title: "A/B Test Calculator", desc: "Calculate sample size and duration for statistically valid tests.", href: "/resources/ab-test-calculator" },
              { title: "Keyword Density", desc: "Analyze keyword frequency and density in your content.", href: "/resources/keyword-density-checker" },
              { title: "Readability Checker", desc: "Score your content's readability with Flesch Reading Ease.", href: "/resources/readability-checker" },
              { title: "CTA Generator", desc: "Generate call-to-action copy by business type, goal, and tone.", href: "/resources/cta-generator" },
              { title: "Schema Generator", desc: "Build JSON-LD structured data for 6 schema types.", href: "/resources/schema-generator" },
              { title: "Website Audit", desc: "25-point audit across 5 categories with instant scoring.", href: "/resources/website-audit" },
              { title: "Funnel Calculator", desc: "Find where you're losing revenue in your marketing funnel.", href: "/resources/funnel-calculator" },
              { title: "Landing Page Grader", desc: "Grade your landing page across 20 conversion factors.", href: "/resources/landing-page-grader" },
              { title: "Email Planner", desc: "Build complete email campaign sequences with templates.", href: "/resources/email-campaign-planner" },
              { title: "Hashtag Generator", desc: "Optimized hashtags for Instagram, TikTok, LinkedIn, and more.", href: "/resources/hashtag-generator" },
              { title: "Persona Builder", desc: "Build detailed buyer personas for your marketing strategy.", href: "/resources/persona-builder" },
              { title: "Color Palette", desc: "Generate brand color palettes with WCAG contrast ratios.", href: "/resources/color-palette-generator" },
              { title: "Content Calendar", desc: "Generate a weekly content calendar by industry and channels.", href: "/resources/content-calendar" },
              { title: "Social Media ROI", desc: "Calculate the ROI of your social media marketing investment.", href: "/resources/social-media-roi" },
              { title: "SWOT Analysis", desc: "Build a SWOT analysis with strategy recommendations.", href: "/resources/swot-analysis" },
              { title: "CLV Calculator", desc: "Calculate customer lifetime value and CLV:CAC ratio.", href: "/resources/clv-calculator" },
              { title: "Brand Voice", desc: "Generate a brand voice guide with tone, samples, and word bank.", href: "/resources/brand-voice-generator" },
              { title: "Google Ads Estimator", desc: "Estimate CPC, clicks, and conversions by industry.", href: "/resources/google-ads-estimator" },
              { title: "Migration Checklist", desc: "30-point checklist for website migrations.", href: "/resources/migration-checklist" },
              { title: "Social Media Audit", desc: "25-point social media audit with grading.", href: "/resources/social-media-audit" },
              { title: "Pricing Calculator", desc: "Estimate marketing costs by service, business size, and goals.", href: "/resources/pricing-calculator" },
              { title: "CRO Audit", desc: "20-point conversion rate optimization checklist.", href: "/resources/cro-audit" },
              { title: "Email Deliverability", desc: "Check your email deliverability across 20 key factors.", href: "/resources/email-deliverability" },
              { title: "Influencer ROI", desc: "Estimate influencer marketing campaign ROI.", href: "/resources/influencer-roi" },
              { title: "Competitive Gap", desc: "Analyze gaps vs your competitors across 10 dimensions.", href: "/resources/competitive-gap" },
              { title: "Marketing Maturity", desc: "24-question assessment of your marketing maturity.", href: "/resources/marketing-maturity" },
              { title: "Content Brief Generator", desc: "Generate SEO content briefs with heading structure and outlines.", href: "/resources/content-brief" },
              { title: "Social Proof Builder", desc: "Build a social proof strategy by business type.", href: "/resources/social-proof-guide" },
              { title: "KPI Dashboard Builder", desc: "Define the right KPIs for your marketing dashboard.", href: "/resources/kpi-dashboard" },
              { title: "Brand Positioning Canvas", desc: "Define positioning and generate a messaging framework.", href: "/resources/brand-positioning" },
              { title: "Channel Selector Quiz", desc: "Find the best marketing channels for your business.", href: "/resources/channel-selector" },
              { title: "Conversion Checklist", desc: "Score your website's conversion readiness across 30 items.", href: "/resources/conversion-checklist" },
              { title: "Buyer Persona Quiz", desc: "Build a detailed buyer persona with communication strategy.", href: "/resources/buyer-persona-quiz" },
              { title: "Content Gap Analyzer", desc: "Evaluate content across buyer journey stages.", href: "/resources/content-gap-analyzer" },
              { title: "Ad Spend Calculator", desc: "Evaluate your ad spend efficiency with ROAS benchmarks.", href: "/resources/ad-spend-calculator" },
              { title: "Email Sequence Planner", desc: "Plan email sequences with timing and subject line templates.", href: "/resources/email-sequence-planner" },
              { title: "Tech Stack Advisor", desc: "Find the right platform and tools for your website project.", href: "/resources/tech-stack-advisor" },
              { title: "Competitive SWOT", desc: "Compare your SWOT against competitors with strategic analysis.", href: "/resources/competitive-swot" },
              { title: "Social Calendar", desc: "Generate a 4-week social content calendar for your industry.", href: "/resources/social-calendar" },
              { title: "Funnel Visualizer", desc: "Analyze your marketing funnel with conversion rate insights.", href: "/resources/funnel-visualizer" },
              { title: "Launch Checklist", desc: "44-item pre-launch checklist with countdown and tracking.", href: "/resources/launch-countdown" },
              { title: "Lead Magnet Generator", desc: "Get lead magnet ideas tailored to your industry and funnel stage.", href: "/resources/lead-magnet-generator" },
              { title: "Pricing Page Optimizer", desc: "Audit your pricing page across 32 conversion factors.", href: "/resources/pricing-optimizer" },
              { title: "Email Health Checker", desc: "25-point audit of your email marketing practices.", href: "/resources/email-health-checker" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className="group bg-white border border-gray-200 hover:border-black/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 motion-reduce:transition-none p-6 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black group-hover:underline mb-2">{r.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{r.desc}</p>
              </Link>
            ))}
          </Stagger>
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
