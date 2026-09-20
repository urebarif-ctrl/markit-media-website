import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import {
  Search, Share2, Code, Palette, Video, Bot, Mail, TrendingUp,
  BarChart3, Megaphone, FileText, Briefcase, ShoppingCart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore Markit Media's full-stack digital marketing services: SEO, PPC, social media, web development, branding, video, AI, email, content, and more.",
  alternates: { canonical: "https://themarkitmedia.com/en/services" },
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
    icon: Briefcase,
    title: "BPO Services",
    desc: "Business process outsourcing, virtual assistants, data entry, customer support, and operations.",
    href: "/services/bpo",
    image: "/images/services/bpo.jpg",
    subServices: ["Virtual Assistants", "Data Entry", "Customer Support", "Operations"],
  },
];

export default function ServicesPage() {
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Markit Media Services",
    description: "Full-stack digital marketing services.",
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

  return (
    <article>
      <JsonLd data={servicesSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Services</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Full-Stack Digital Marketing
            </h1>
            <SectionDesc>
              From strategy to execution, we cover every digital marketing channel. Choose the services you need, or let us build a complete growth plan.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Service categories">
        <div className="max-w-7xl mx-auto">
          <Stagger stagger={60} animation="fade-up" className="space-y-8">
            {serviceCategories.map((s) => {
              const Icon = s.icon;
              return (
                <Link key={s.href} href={s.href} className="group grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-0 border border-gray-200 hover:border-black/30 transition-all overflow-hidden focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  <div className="aspect-[16/9] md:aspect-auto md:h-full overflow-hidden">
                    <img src={s.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
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
                  <span className="text-xl text-gray-400 group-hover:text-black transition-colors flex-shrink-0 hidden md:flex items-center pr-8" aria-hidden="true">&rarr;</span>
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
            <Link href="/services/finder" className="inline-flex items-center gap-3 border-2 border-black text-black px-10 py-5 font-bold text-base hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              Take the Service Finder Quiz &rarr;
            </Link>
          </Animate>
        </div>
      </section>

      {/* Cross-links */}
      <section className="px-6 lg:px-12 py-16" aria-label="Related pages">
        <div className="max-w-7xl mx-auto">
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/capabilities" className="group border border-gray-200 hover:border-black/30 transition-all p-8 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-2">Full Capabilities</h3>
              <p className="text-base text-gray-500">See the complete breakdown of what we offer and the advantage of working with a full-service agency.</p>
            </Link>
            <Link href="/results" className="group border border-gray-200 hover:border-black/30 transition-all p-8 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-2">How We Measure Results</h3>
              <p className="text-base text-gray-500">Our KPI framework, reporting cadence, and the analytics platforms behind every campaign.</p>
            </Link>
            <Link href="/process" className="group border border-gray-200 hover:border-black/30 transition-all p-8 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-2">Our Process</h3>
              <p className="text-base text-gray-500">From discovery to optimization — a proven 5-step process for every engagement.</p>
            </Link>
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Talk Strategy?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Schedule a free consultation and we&apos;ll recommend the best approach for your business goals.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors">
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
