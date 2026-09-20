import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import {
  BarChart3, Search, Share2, Globe, Palette, Video,
  Bot, Mail, FileText, ShoppingCart, Megaphone, Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Capabilities — Full-Service Digital Marketing",
  description: "Explore Markit Media's full range of digital marketing capabilities: SEO, PPC, social media, branding, web development, AI marketing, video production, and more.",
  alternates: { canonical: "https://themarkitmedia.com/en/capabilities" },
};

const capabilities = [
  {
    icon: BarChart3,
    title: "Performance Marketing",
    desc: "Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads, PPC management, and retargeting campaigns that drive measurable ROI.",
    href: "/services/performance-marketing",
    tags: ["Google Ads", "Meta Ads", "PPC", "Retargeting"],
  },
  {
    icon: Search,
    title: "Search Engine Optimization",
    desc: "Technical SEO, local SEO, content SEO, link building, audits, and keyword research to grow your organic visibility.",
    href: "/services/seo",
    tags: ["Technical SEO", "Local SEO", "Link Building", "Audits"],
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    desc: "Strategy, content creation, community management, influencer marketing, and social analytics across all platforms.",
    href: "/services/social-media",
    tags: ["Strategy", "Content", "Influencers", "Analytics"],
  },
  {
    icon: Globe,
    title: "Website Development",
    desc: "WordPress, Shopify, Next.js, custom web apps, landing pages, and e-commerce stores built for speed and conversion.",
    href: "/services/website-development",
    tags: ["WordPress", "Shopify", "Next.js", "E-commerce"],
  },
  {
    icon: Palette,
    title: "Branding & Identity",
    desc: "Brand strategy, logo design, visual identity systems, brand guidelines, and packaging design that differentiates you.",
    href: "/services/branding",
    tags: ["Logo Design", "Brand Strategy", "Visual Identity", "Guidelines"],
  },
  {
    icon: Video,
    title: "Video Production",
    desc: "Commercial production, video editing, motion graphics, short-form content, and animation for every channel.",
    href: "/services/video-production",
    tags: ["Commercials", "Motion Graphics", "Reels", "Animation"],
  },
  {
    icon: Bot,
    title: "AI & Marketing Automation",
    desc: "AI chatbots, marketing automation, consulting, and predictive analytics that keep you ahead of the curve.",
    href: "/services/ai",
    tags: ["AI Chatbots", "Automation", "Predictive Analytics"],
  },
  {
    icon: Mail,
    title: "Email Marketing",
    desc: "Campaign design, automation workflows, list management, A/B testing, and deliverability optimization.",
    href: "/services/email-marketing",
    tags: ["Campaigns", "Automation", "A/B Testing", "Deliverability"],
  },
  {
    icon: FileText,
    title: "Content Marketing",
    desc: "Content strategy, copywriting, blog writing, whitepapers, and SEO content that builds authority and drives traffic.",
    href: "/services/content-marketing",
    tags: ["Copywriting", "Blogs", "Whitepapers", "SEO Content"],
  },
  {
    icon: Megaphone,
    title: "Paid Advertising",
    desc: "Programmatic, display ads, native advertising, and media buying across premium ad networks.",
    href: "/services/paid-advertising",
    tags: ["Programmatic", "Display", "Native Ads", "Media Buying"],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Marketing",
    desc: "Amazon Ads, Shopify marketing, product feed optimization, and marketplace management for online stores.",
    href: "/services/ecommerce-marketing",
    tags: ["Amazon", "Shopify", "Product Feeds", "Marketplaces"],
  },
  {
    icon: Users,
    title: "Digital Strategy & Consulting",
    desc: "Analytics setup, CRM consulting, online reputation management, fractional CMO, and full marketing strategy.",
    href: "/services/digital-marketing",
    tags: ["Analytics", "CRM", "ORM", "Fractional CMO"],
  },
];

export default function CapabilitiesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Capabilities — Markit Media",
    description: "Full-service digital marketing capabilities.",
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Capabilities" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Capabilities</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Everything You Need to Grow Online
            </h1>
            <SectionDesc>
              From strategy to execution, we deliver the full spectrum of digital marketing services. Every capability is backed by real expertise, not outsourced to freelancers.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="All capabilities">
        <div className="max-w-7xl mx-auto">
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <Link
                  key={cap.title}
                  href={cap.href}
                  className="group border border-gray-200 p-8 hover:border-black transition-colors flex flex-col focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  <Icon className="w-8 h-8 text-black mb-4" strokeWidth={1.5} aria-hidden="true" />
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2 group-hover:underline">
                    {cap.title}
                  </h2>
                  <p className="text-base text-gray-500 leading-relaxed flex-1 mb-4">{cap.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {cap.tags.map((tag) => (
                      <span key={tag} className="text-[13px] font-medium text-gray-400 bg-gray-50 px-2 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Why full service">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Full-Service Advantage</SectionLabel>
            <SectionTitle>Why Work With One Agency?</SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {[
              { title: "Unified Strategy", desc: "Every channel works together instead of operating in silos. Your SEO, paid ads, and social media reinforce each other." },
              { title: "Single Point of Contact", desc: "One team, one account manager, one strategy. No coordination overhead between multiple vendors." },
              { title: "Faster Execution", desc: "Cross-functional teams move faster than agency-to-agency handoffs. Need a landing page for a campaign? It is already in progress." },
              { title: "Better Data", desc: "When one team sees all your data, insights flow across channels. A PPC keyword win becomes an SEO content opportunity." },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-2">{item.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Let&apos;s Build Your Growth Plan
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Tell us your goals and we will map the right capabilities to your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors">
                Get a Free Consultation &rarr;
              </Link>
              <Link href="/services" className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors">
                Browse All Services
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    </article>
  );
}
