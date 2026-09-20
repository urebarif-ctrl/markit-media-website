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
  openGraph: {
    title: "Our Platform Partnerships",
    description: "We work with leading advertising, analytics, and development platforms to deliver results.",
  },
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

const partnerFaqItems = [
  { q: "What types of businesses do you partner with?", a: "We work with agencies, consultancies, SaaS companies, and in-house marketing teams. Some partners bring us in for specific platform expertise they do not have internally. Others use us as an extension of their team for overflow or specialized projects. There is no minimum size requirement — what matters is that the work is a good fit for both sides." },
  { q: "How do you handle white-label work?", a: "For white-label engagements, all deliverables go out under your brand. We stay behind the scenes — your clients interact with you, not us. We can work within your existing reporting templates, communication tools, and processes. Confidentiality is standard, and we are happy to sign NDAs before any engagement begins." },
  { q: "What's the typical onboarding process for new partners?", a: "It usually starts with an introductory call to understand your business, your clients, and what you need from us. From there, we scope out a small initial project or trial engagement so both sides can evaluate the fit before committing to anything larger. We find that starting small and building from there leads to stronger long-term partnerships." },
  { q: "Do you offer referral programs?", a: "Yes, we have referral arrangements for partners who send work our way. The specifics depend on the nature of the referral and the scope of the engagement. If you are interested, reach out and we will walk through how it works and what makes sense for your situation." },
  { q: "How do you measure partnership success?", a: "We look at the outcomes that matter to you — whether that is campaign performance, client retention, revenue growth, or operational efficiency. We set expectations together at the start and review them regularly. If something is not working, we would rather have that conversation early than let it drift." },
];

export default function PartnersPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Platform Partnerships — Markit Media",
    description: "Advertising, analytics, and development platform partnerships.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: partnerFaqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <article>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema} />
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
              <div key={partner.name} className="border border-gray-200 p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
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
              <div key={item.title} className="bg-white p-8 border border-gray-200 hover:shadow-md transition-shadow duration-300 motion-reduce:transition-none">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">{item.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* How We Work With Partners */}
      <section className="px-6 lg:px-12 py-16" aria-label="How we work with partners">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Approach</SectionLabel>
            <SectionTitle>How We Work With Partners</SectionTitle>
            <SectionDesc>
              Every partnership is different, but our approach stays consistent — clear communication, shared goals, and a focus on outcomes that matter to both sides.
            </SectionDesc>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {[
              {
                title: "Joint Strategy Sessions",
                desc: "We align on goals and build a shared roadmap before any work begins. This means fewer surprises, clearer priorities, and campaigns that reflect both our expertise and your business context.",
              },
              {
                title: "Transparent Communication",
                desc: "Regular updates, shared dashboards, and open access to performance data. You always know where things stand — no waiting for a monthly report to find out what happened.",
              },
              {
                title: "Flexible Engagement Models",
                desc: "Project-based, retainer, or white-label arrangements — we structure the partnership around how you actually work, not the other way around.",
              },
              {
                title: "Mutual Growth Focus",
                desc: "We succeed when our partners succeed. That means we think beyond deliverables — we look for opportunities to expand what is working and flag what is not.",
              },
            ].map((item) => (
              <div key={item.title} className="border border-gray-200 p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">{item.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-12 py-16 bg-gray-50" aria-label="Frequently asked questions">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Common Questions About Partnering With Us</SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="mt-12 space-y-4">
            {partnerFaqItems.map((item) => (
              <details key={item.q} className="group border border-gray-200 bg-white">
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-base font-bold text-black select-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  {item.q}
                  <span className="ml-4 text-gray-400 group-open:rotate-45 transition-transform duration-200 motion-reduce:transition-none" aria-hidden="true">+</span>
                </summary>
                <div className="px-6 pb-6 text-base text-gray-500 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Cross-link cards */}
      <section className="px-6 lg:px-12 py-16" aria-label="Explore more">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Explore</SectionLabel>
            <SectionTitle>Learn More About How We Work</SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: "Our Services",
                desc: "See the full range of marketing, advertising, and development services we offer.",
                href: "/services",
              },
              {
                title: "Our Process",
                desc: "Understand how we plan, execute, and optimize — from kickoff to ongoing performance.",
                href: "/process",
              },
              {
                title: "Get in Touch",
                desc: "Ready to explore a partnership? Start a conversation with our team.",
                href: "/contact",
              },
            ].map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="block border border-gray-200 p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">{card.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{card.desc}</p>
                <span className="inline-block mt-4 text-base font-bold text-black">Learn more &rarr;</span>
              </Link>
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
