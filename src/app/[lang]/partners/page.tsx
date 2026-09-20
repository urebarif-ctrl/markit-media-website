import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Platform Partnerships",
  description: "Markit Media works with leading advertising, analytics, and development platforms to deliver integrated digital marketing solutions.",
  alternates: { canonical: "https://themarkitmedia.com/en/partners" },
};

const platformPartners = [
  {
    name: "Google",
    platforms: ["Google Ads", "Google Analytics 4", "Google Tag Manager", "Google Search Console", "Looker Studio"],
    desc: "We manage search, display, YouTube, shopping, and performance max campaigns. Our team builds GA4 implementations, custom dashboards, and conversion tracking setups from scratch.",
  },
  {
    name: "Meta",
    platforms: ["Facebook Ads", "Instagram Ads", "Meta Business Suite", "Conversions API"],
    desc: "Full-funnel advertising on Facebook and Instagram. We handle creative, audience strategy, pixel and CAPI setup, and optimization for leads, purchases, and engagement.",
  },
  {
    name: "Shopify",
    platforms: ["Shopify Stores", "Shopify Plus", "Shopify Markets"],
    desc: "E-commerce development on Shopify and Shopify Plus. Theme customization, app integration, checkout optimization, and migration from other platforms.",
  },
  {
    name: "HubSpot",
    platforms: ["Marketing Hub", "Sales Hub", "CMS Hub", "Service Hub"],
    desc: "CRM setup and management, marketing automation workflows, lead scoring, email campaigns, and custom reporting across the full HubSpot ecosystem.",
  },
  {
    name: "WordPress",
    platforms: ["WordPress.org", "WooCommerce", "Elementor", "ACF"],
    desc: "Custom WordPress development, theme building, WooCommerce stores, plugin development, and performance optimization for content-driven sites.",
  },
  {
    name: "TikTok",
    platforms: ["TikTok Ads Manager", "TikTok Pixel", "Spark Ads"],
    desc: "Short-form video advertising for brand awareness, consideration, and conversion. We produce platform-native creative that feels organic.",
  },
  {
    name: "LinkedIn",
    platforms: ["LinkedIn Ads", "LinkedIn Campaign Manager", "Lead Gen Forms"],
    desc: "B2B lead generation through sponsored content, message ads, conversation ads, and dynamic ads. Audience targeting by job title, company size, and industry.",
  },
  {
    name: "Klaviyo",
    platforms: ["Klaviyo Email", "Klaviyo SMS", "Klaviyo CDP"],
    desc: "E-commerce email and SMS marketing with advanced segmentation, automated flows, abandoned cart sequences, and revenue attribution.",
  },
];

const integrationAreas = [
  { title: "Advertising", count: "6+ platforms", desc: "Google, Meta, TikTok, LinkedIn, Microsoft, Amazon" },
  { title: "Analytics", count: "5+ tools", desc: "GA4, GTM, Looker Studio, Hotjar, Clarity" },
  { title: "SEO", count: "4+ tools", desc: "SEMrush, Ahrefs, Screaming Frog, Moz" },
  { title: "Email & CRM", count: "5+ platforms", desc: "HubSpot, Klaviyo, Mailchimp, ActiveCampaign, Salesforce" },
  { title: "Development", count: "4+ frameworks", desc: "Next.js, WordPress, Shopify, Custom" },
  { title: "Creative", count: "5+ tools", desc: "Figma, Adobe CC, Premiere Pro, After Effects, Canva" },
];

export default function PartnersPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Platform Partnerships — Markit Media",
    description: "Advertising, analytics, and development platform partnerships.",
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Partners" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Partnerships</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Platform Partnerships
            </h1>
            <SectionDesc>
              We work directly with the advertising, analytics, and development platforms your business depends on — managing everything from setup to ongoing optimization.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12 bg-gray-50" aria-label="Platform coverage">
        <div className="max-w-7xl mx-auto">
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {integrationAreas.map((area) => (
              <div key={area.title} className="bg-white border border-gray-200 p-5 text-center">
                <div className="font-[family-name:var(--font-display)] text-base font-extrabold text-black">{area.count}</div>
                <div className="text-base font-bold text-black mt-1">{area.title}</div>
                <div className="text-base text-gray-400 mt-2">{area.desc}</div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16" aria-label="Platform partners">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Platforms</SectionLabel>
            <SectionTitle>Deep Expertise Across Major Platforms</SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {platformPartners.map((partner) => (
              <div key={partner.name} className="border border-gray-200 p-8">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">{partner.name}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {partner.platforms.map((p) => (
                    <span key={p} className="bg-gray-100 text-base text-gray-600 px-3 py-1 font-medium">{p}</span>
                  ))}
                </div>
                <p className="text-base text-gray-500 leading-relaxed">{partner.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-gray-50" aria-label="Integration approach">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Integration</SectionLabel>
            <SectionTitle>Everything Connected</SectionTitle>
            <SectionDesc>
              Platforms work best when they talk to each other. We build integrated stacks where your ad platforms, analytics, CRM, and website all share data for better targeting, measurement, and optimization.
            </SectionDesc>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { title: "Data Flows", desc: "Ad click data flows to your CRM. CRM data feeds back to your ad platforms for better targeting and lookalike audiences." },
              { title: "Unified Reporting", desc: "All channel performance in a single dashboard. No switching between platforms to understand how your marketing performs." },
              { title: "Server-Side Tracking", desc: "We implement server-side tracking and Conversions APIs to capture accurate data in a cookie-less world." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 border border-gray-200">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">{item.title}</h3>
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
              Need Help With a Specific Platform?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Whether you need setup, migration, or ongoing management — we can help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                Talk to Us &rarr;
              </Link>
              <Link href="/technology" className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                View Full Stack
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    </article>
  );
}
