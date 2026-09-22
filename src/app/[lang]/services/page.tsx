import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { SOCIAL_URLS } from "@/lib/social";
import {
  Search, Share2, Code, Palette, Video, Bot, Mail, TrendingUp,
  BarChart3, Megaphone, FileText, Briefcase, ShoppingCart, Camera,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing Services — SEO, PPC, Web Development & More",
  description: "Explore Markit Media's full-stack digital marketing services: SEO, PPC, social media, web development, branding, video, AI, email, content, and more.",
  alternates: { canonical: "https://themarkitmedia.com/en/services" },
  openGraph: {
    title: "Digital Marketing Services",
    description:
      "Full-stack digital marketing: SEO, PPC, social media, web development, branding, video, AI, email, and content.",
  },
};

const serviceCategories = [
  {
    icon: Megaphone,
    title: "Performance Marketing",
    desc: "Meta Ads, Google Ads, TikTok Ads, LinkedIn Ads, and PPC campaign management that drives real conversions.",
    href: "/services/performance-marketing",
    image: "/images/services/analytics.jpg",
    subServices: ["Google Ads", "Meta Ads", "TikTok Ads", "LinkedIn Ads", "PPC Management", "Retargeting"],
  },
  {
    icon: Search,
    title: "SEO",
    desc: "Technical SEO, local SEO, content SEO, link building, and keyword research to dominate organic search.",
    href: "/services/seo",
    image: "/images/services/seo.jpg",
    subServices: ["Technical SEO", "Local SEO", "Content SEO", "Link Building", "SEO Audits", "Keyword Research"],
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    desc: "Strategy, content creation, community management, influencer marketing, and social analytics.",
    href: "/services/social-media",
    image: "/images/services/social-media.jpg",
    subServices: ["Social Strategy", "Content Creation", "Community Management", "Influencer Marketing", "Social Analytics"],
  },
  {
    icon: Code,
    title: "Website Development",
    desc: "WordPress, Shopify, Next.js, custom web apps, landing pages, and e-commerce solutions.",
    href: "/services/website-development",
    image: "/images/services/web-dev.jpg",
    subServices: ["WordPress", "Shopify", "Next.js", "Custom Development", "Landing Pages", "E-commerce"],
  },
  {
    icon: Palette,
    title: "Branding & Design",
    desc: "Brand strategy, logo design, visual identity, brand guidelines, and packaging design.",
    href: "/services/branding",
    image: "/images/services/branding.jpg",
    subServices: ["Brand Strategy", "Logo Design", "Visual Identity", "Brand Guidelines", "Packaging"],
  },
  {
    icon: Video,
    title: "Video Production",
    desc: "Commercial production, editing, motion graphics, reels, testimonial videos, and animation.",
    href: "/services/video-production",
    image: "/images/services/video.jpg",
    subServices: ["Commercial Production", "Video Editing", "Motion Graphics", "Reels & Shorts", "Animation"],
  },
  {
    icon: Bot,
    title: "AI Solutions",
    desc: "AI chatbots, marketing automation, AI consulting, predictive analytics, and workflow optimization.",
    href: "/services/ai",
    image: "/images/services/ai.jpg",
    subServices: ["AI Chatbots", "Marketing Automation", "AI Consulting", "Predictive Analytics"],
  },
  {
    icon: Mail,
    title: "Email Marketing",
    desc: "Campaign design, automation sequences, list management, A/B testing, and deliverability optimization.",
    href: "/services/email-marketing",
    image: "/images/services/email.jpg",
    subServices: ["Campaign Design", "Email Automation", "List Management", "A/B Testing", "Deliverability"],
  },
  {
    icon: FileText,
    title: "Content Marketing",
    desc: "Content strategy, copywriting, blog writing, whitepapers, case studies, and SEO content production.",
    href: "/services/content-marketing",
    image: "/images/services/content-marketing.jpg",
    subServices: ["Content Strategy", "Copywriting", "Blog Writing", "Whitepapers", "SEO Content"],
  },
  {
    icon: TrendingUp,
    title: "Paid Advertising",
    desc: "Programmatic advertising, display ads, native ads, media buying, and cross-channel campaigns.",
    href: "/services/paid-advertising",
    image: "/images/services/paid-advertising.jpg",
    subServices: ["Programmatic", "Display Ads", "Native Advertising", "Media Buying"],
  },
  {
    icon: BarChart3,
    title: "Digital Marketing",
    desc: "Analytics setup, CRM consulting, ORM, fractional CMO services, and marketing strategy.",
    href: "/services/digital-marketing",
    image: "/images/services/digital-marketing.jpg",
    subServices: ["Analytics", "CRM Consulting", "ORM", "Fractional CMO", "Marketing Strategy"],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Marketing",
    desc: "Amazon Ads, Shopify marketing, product feed optimization, and marketplace management.",
    href: "/services/ecommerce-marketing",
    image: "/images/services/ecommerce-marketing.jpg",
    subServices: ["Amazon Ads", "Shopify Marketing", "Product Feed Optimization", "Marketplace Management"],
  },
  {
    icon: Megaphone,
    title: "Public Relations",
    desc: "Media outreach, press releases, reputation management, event PR, and crisis communications.",
    href: "/services/public-relations",
    image: "/images/services/pr.jpg",
    subServices: ["Media Outreach", "Press Releases", "Reputation Management", "Event PR", "Crisis Comms"],
  },
  {
    icon: Camera,
    title: "Professional Photography",
    desc: "Product photography, corporate headshots, event coverage, architectural shoots, and lifestyle photography.",
    href: "/services/photography",
    image: "/images/services/photography.jpg",
    subServices: ["Product Photography", "Corporate Photos", "Event Coverage", "Architectural", "Lifestyle"],
  },
  {
    icon: Briefcase,
    title: "BPO Services",
    desc: "Business process outsourcing, virtual assistants, data entry, customer support, and operations.",
    href: "/services/bpo",
    image: "/images/services/bpo.jpg",
    subServices: ["Virtual Assistants", "Data Entry", "Customer Support", "Operations"],
  },
];

const servicesFaqItems = [
  { q: "How do I know which services I need?", a: "Start with a free consultation. We will analyze your business goals, current marketing efforts, and competitive landscape to recommend the channels and services that will have the highest impact. You can also take our Service Finder Quiz for instant recommendations." },
  { q: "Can I start with one service and add more later?", a: "Absolutely. Many clients start with one or two channels, see results, and expand from there. Our full-stack capability means you do not need to find another agency when you are ready to scale." },
  { q: "Do you offer packages or custom plans?", a: "We build custom plans based on your goals, budget, and competitive landscape. No two businesses are the same, so cookie-cutter packages rarely deliver optimal results. See our Pricing page for how we structure engagements." },
  { q: "How long does it take to see results?", a: "It depends on the channel. Paid advertising can generate results within the first week. SEO typically takes 3-6 months for meaningful organic growth. We set realistic expectations during strategy and provide interim metrics along the way." },
  { q: "Do you work with businesses outside the USA?", a: "Yes. We serve clients across the United States, Canada, United Arab Emirates, United Kingdom, Australia, and Saudi Arabia. Our team works across time zones to provide responsive support." },
];

export default function ServicesPage() {
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Markit Media Services",
    description: "Full-stack digital marketing services.",
    provider: {
      "@type": "Organization",
      name: "Markit Media",
      url: "https://themarkitmedia.com",
      sameAs: SOCIAL_URLS,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: serviceCategories.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.title,
        url: `https://themarkitmedia.com/en${s.href}`,
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

      <section className="px-6 lg:px-12 pt-24 pb-12" aria-label="Our services">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Services</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Full-Stack Digital Marketing
            </h1>
            <SectionDesc>
              From strategy to execution, we cover every digital marketing channel. Choose the services you need, or let us build a complete growth plan.
            </SectionDesc>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-bold text-base hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                Get a Free Consultation &rarr;
              </Link>
              <Link href="/services/finder" className="inline-flex items-center gap-3 border-2 border-black text-black px-8 py-4 font-bold text-base hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                Find the Right Service
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-8" aria-label="Service stats">
        <div className="max-w-7xl mx-auto">
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "13", label: "Service Categories" },
              { value: "60+", label: "Individual Services" },
              { value: "20", label: "Industries Served" },
              { value: "6", label: "Countries" },
            ].map((stat) => (
              <div key={stat.label} className="border border-gray-200 p-6 text-center">
                <p className="font-[family-name:var(--font-display)] text-2xl lg:text-3xl font-extrabold text-black">{stat.value}</p>
                <p className="text-base text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Service categories">
        <div className="max-w-7xl mx-auto">
          <Stagger stagger={60} animation="fade-up" className="space-y-8">
            {serviceCategories.map((s) => {
              const Icon = s.icon;
              return (
                <Link key={s.href} href={s.href} className="group grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-0 border border-gray-200 hover:border-black/30 hover:shadow-lg transition-all duration-300 motion-reduce:transition-none overflow-hidden focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  <div className="aspect-[16/9] md:aspect-auto md:h-full overflow-hidden">
                    <img src={s.image} alt={`${s.title} services`} className="w-full h-full object-cover group-hover:scale-105 transition-transform motion-reduce:transition-none duration-500" loading="lazy" />
                  </div>
                  <div className="p-6 md:p-8 flex-1">
                    <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-2">
                      {s.title}
                    </h2>
                    <p className="text-base text-gray-500 leading-relaxed mb-4">{s.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.subServices.map((sub) => (
                        <span key={sub} className="text-base font-medium text-gray-400 bg-gray-100 px-3 py-1">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-xl text-gray-400 group-hover:text-black transition-colors motion-reduce:transition-none flex-shrink-0 hidden md:flex items-center pr-8" aria-hidden="true">&rarr;</span>
                </Link>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Service Finder CTA */}
      <section className="px-6 lg:px-12 py-16 bg-gray-50" aria-label="Service finder">
        <div className="max-w-4xl mx-auto text-center">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
              Not Sure Where to Start?
            </h2>
            <p className="text-base text-gray-500 mb-6">
              Answer a few quick questions and get personalized service recommendations.
            </p>
            <Link href="/services/finder" className="inline-flex items-center gap-3 border-2 border-black text-black px-10 py-5 font-bold text-base hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              Take the Service Finder Quiz &rarr;
            </Link>
          </Animate>
        </div>
      </section>

      {/* Why Full-Service */}
      <section className="px-6 lg:px-12 py-16" aria-label="Full-service advantages">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Full-Service</SectionLabel>
            <SectionTitle>The Advantage of a Single Partner</SectionTitle>
            <SectionDesc>
              When every channel is managed under one roof, strategy compounds instead of fragmenting.
            </SectionDesc>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <rect x="4" y="4" width="10" height="10" stroke="black" strokeWidth="2" />
                    <rect x="18" y="4" width="10" height="10" stroke="black" strokeWidth="2" />
                    <rect x="4" y="18" width="10" height="10" stroke="black" strokeWidth="2" />
                    <rect x="18" y="18" width="10" height="10" stroke="black" strokeWidth="2" />
                    <line x1="14" y1="9" x2="18" y2="9" stroke="black" strokeWidth="2" />
                    <line x1="9" y1="14" x2="9" y2="18" stroke="black" strokeWidth="2" />
                    <line x1="23" y1="14" x2="23" y2="18" stroke="black" strokeWidth="2" />
                    <line x1="14" y1="23" x2="18" y2="23" stroke="black" strokeWidth="2" />
                  </svg>
                ),
                title: "Unified Strategy",
                desc: "SEO, paid ads, social, content, and design all work from the same brief — no conflicting priorities.",
              },
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <circle cx="16" cy="16" r="12" stroke="black" strokeWidth="2" />
                    <polyline points="10,18 14,12 18,16 24,8" stroke="black" strokeWidth="2" fill="none" />
                  </svg>
                ),
                title: "Cross-Channel Insights",
                desc: "Learnings from one channel feed into every other. Your PPC data improves your SEO. Your social insights sharpen your content.",
              },
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <rect x="6" y="6" width="20" height="20" stroke="black" strokeWidth="2" />
                    <line x1="6" y1="16" x2="26" y2="16" stroke="black" strokeWidth="2" />
                    <line x1="16" y1="6" x2="16" y2="26" stroke="black" strokeWidth="2" />
                    <circle cx="11" cy="11" r="2" fill="black" />
                    <circle cx="21" cy="21" r="2" fill="black" />
                  </svg>
                ),
                title: "Single Point of Contact",
                desc: "One account lead who knows your business. No repeating context to five different agencies.",
              },
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <path d="M8 24 L16 8 L24 24" stroke="black" strokeWidth="2" fill="none" />
                    <line x1="11" y1="19" x2="21" y2="19" stroke="black" strokeWidth="2" />
                    <circle cx="16" cy="8" r="3" stroke="black" strokeWidth="2" fill="none" />
                  </svg>
                ),
                title: "Faster Execution",
                desc: "No back-and-forth between vendors. Changes that take weeks with multiple agencies take days with one.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">{item.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Industries */}
      <section className="px-6 lg:px-12 py-16 bg-black text-white" aria-label="Industries served">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Industries</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight mt-3 mb-3">
              Specialized Experience Across 20 Verticals
            </h2>
            <p className="text-base text-gray-400 max-w-2xl mb-10">
              Every industry has unique buyer journeys, compliance requirements, and competitive dynamics. We build strategies that account for all of them.
            </p>
          </Animate>
          <Stagger stagger={40} animation="fade-up" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { label: "Home Services", href: "/industries/home-services" },
              { label: "E-commerce", href: "/industries/ecommerce" },
              { label: "Healthcare", href: "/industries/healthcare" },
              { label: "Real Estate", href: "/industries/real-estate" },
              { label: "Restaurants", href: "/industries/restaurants" },
              { label: "Fashion", href: "/industries/fashion" },
              { label: "B2B", href: "/industries/b2b" },
              { label: "EV Chargers", href: "/industries/ev-chargers" },
              { label: "Education", href: "/industries/education" },
              { label: "Legal", href: "/industries/legal" },
              { label: "SaaS", href: "/industries/saas" },
              { label: "Finance", href: "/industries/finance" },
              { label: "Hospitality", href: "/industries/hospitality" },
              { label: "Fitness", href: "/industries/fitness" },
              { label: "Automotive", href: "/industries/automotive" },
              { label: "Nonprofits", href: "/industries/nonprofits" },
              { label: "Construction", href: "/industries/construction" },
              { label: "Travel", href: "/industries/travel" },
              { label: "Professional Services", href: "/industries/professional-services" },
              { label: "Manufacturing", href: "/industries/manufacturing" },
            ].map((ind) => (
              <Link key={ind.href} href={ind.href} className="border border-white/20 px-4 py-4 text-base font-medium text-white hover:bg-white hover:text-black transition-colors duration-200 motion-reduce:transition-none text-center focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                {ind.label}
              </Link>
            ))}
          </Stagger>
          <Animate animation="fade-up">
            <p className="text-base text-gray-400 mt-8">
              Don&apos;t see your industry? <Link href="/contact" className="text-white underline hover:no-underline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Get in touch</Link> — most of what we do applies across verticals.
            </p>
          </Animate>
        </div>
      </section>

      {/* Cross-links */}
      <section className="px-6 lg:px-12 py-16" aria-label="Related pages">
        <div className="max-w-7xl mx-auto">
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/capabilities" className="group border border-gray-200 hover:border-black/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none p-8 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-2">Full Capabilities</h3>
              <p className="text-base text-gray-500">See the complete breakdown of what we offer and the advantage of working with a full-service agency.</p>
            </Link>
            <Link href="/results" className="group border border-gray-200 hover:border-black/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none p-8 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-2">How We Measure Results</h3>
              <p className="text-base text-gray-500">Our KPI framework, reporting cadence, and the analytics platforms behind every campaign.</p>
            </Link>
            <Link href="/process" className="group border border-gray-200 hover:border-black/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none p-8 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-2">Our Process</h3>
              <p className="text-base text-gray-500">From discovery to optimization — a proven 5-step process for every engagement.</p>
            </Link>
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Free tools">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-4">Free Tools to Get Started</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "ROI Calculator", href: "/resources/roi-calculator" },
                { label: "Service Finder Quiz", href: "/services/finder" },
                { label: "Budget Planner", href: "/resources/marketing-budget-planner" },
                { label: "SEO Health Check", href: "/resources/seo-checklist" },
                { label: "Google Ads Estimator", href: "/resources/google-ads-estimator" },
                { label: "Website Grader", href: "/resources/website-grader" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="border border-gray-200 px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  {link.label}
                </Link>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Services FAQ">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Common Questions About Our Services</SectionTitle>
          </Animate>
          <div className="mt-10">
            {servicesFaqItems.map((item, i) => (
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
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center" aria-label="Get started">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Talk Strategy?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Schedule a free consultation and we&apos;ll recommend the best approach for your business goals.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
