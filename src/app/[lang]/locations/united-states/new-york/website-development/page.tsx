import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Website Development Agency in New York — Markit Media",
  description:
    "Website development agency serving businesses in New York. WordPress, Shopify, Next.js, and custom web applications built for performance and conversion.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/new-york/website-development",
  },
  openGraph: {
    title: "Website Development Agency in New York — Markit Media",
    description:
      "Website development agency serving businesses in New York. WordPress, Shopify, Next.js, and custom web applications built for performance and conversion.",
  },
};

const serviceItems = [
  {
    title: "WordPress Development",
    desc: "Custom WordPress themes, headless WordPress builds, plugin development, and WooCommerce stores — built for speed, security, and ease of content management.",
  },
  {
    title: "Shopify & E-Commerce",
    desc: "Shopify storefronts, custom theme development, app integrations, and checkout optimization for New York retailers and DTC brands selling online.",
  },
  {
    title: "Next.js & Custom Applications",
    desc: "Modern React-based web applications using Next.js, server-side rendering, and headless CMS architecture for businesses that need performance beyond what templates offer.",
  },
  {
    title: "UX & UI Design",
    desc: "User research, wireframing, visual design, and prototyping grounded in conversion best practices — not just aesthetics. Every design decision is tied to a business objective.",
  },
  {
    title: "Performance Optimization",
    desc: "Core Web Vitals audits, image optimization, code splitting, CDN configuration, and server-side improvements to ensure your site loads fast on every device.",
  },
  {
    title: "Ongoing Maintenance & Support",
    desc: "Security updates, plugin management, uptime monitoring, content updates, and technical support so your site stays fast, secure, and current after launch.",
  },
];

const reasons = [
  {
    title: "Design standards match the market",
    desc: "New York audiences interact with some of the most polished digital experiences in the world — from major media outlets to leading e-commerce brands. A generic template site signals that a business is behind. We build sites that meet the visual and functional expectations of a New York audience.",
  },
  {
    title: "Speed and performance are non-negotiable",
    desc: "New York users are fast-moving and impatient. A site that loads in four seconds loses visitors before they see your value proposition. We build with performance as a core requirement, not an afterthought — targeting sub-two-second load times on mobile.",
  },
  {
    title: "Built for conversion, not just appearance",
    desc: "A website that looks good but doesn&apos;t generate leads or sales is a cost center, not an asset. We structure every page around clear user journeys, strong calls to action, and measurable conversion points.",
  },
  {
    title: "SEO-ready architecture from day one",
    desc: "We build every site with clean semantic HTML, proper heading hierarchy, structured data, fast load times, and mobile responsiveness — so your site is positioned to rank from the moment it goes live.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Requirements & Discovery",
    desc: "We define the scope, business goals, technical requirements, and target audience. For New York businesses, this includes understanding your competitive positioning and what your audience expects from a digital experience.",
  },
  {
    step: "02",
    title: "Design & Prototyping",
    desc: "Wireframes and visual designs are developed, reviewed, and refined before a single line of code is written. You see exactly what your site will look like — on desktop and mobile — before we build it.",
  },
  {
    step: "03",
    title: "Development & QA",
    desc: "We build your site on the platform that fits your needs — WordPress for content-heavy sites, Shopify for e-commerce, Next.js for custom applications. Every build goes through cross-browser and cross-device testing.",
  },
  {
    step: "04",
    title: "Launch & Handoff",
    desc: "We handle DNS, hosting configuration, SSL, analytics setup, and search console submission. You receive full documentation and training so your team can manage day-to-day content independently.",
  },
];

export default function NewYorkWebsiteDevelopmentPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "Website development agency serving businesses in New York. WordPress, Shopify, Next.js, and custom web applications.",
    areaServed: { "@type": "City", name: "New York" },
    url: "https://themarkitmedia.com/en/locations/united-states/new-york/website-development",
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "United States", href: "/locations/united-states" },
          { label: "New York", href: "/locations/united-states/new-york" },
          { label: "Website Development" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>New York</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              Website Development Agency Serving Businesses in New York
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              In New York, your website competes for attention against brands with
              world-class digital experiences. A slow, outdated, or generic site
              costs you credibility before a visitor even reads your first headline.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media builds websites for New York businesses on WordPress,
              Shopify, and Next.js — designed for speed, built for conversion, and
              structured for long-term organic growth.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Discuss Your Project &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* Service Details */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Web development services for New York businesses"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>
              Web Development Services for New York Businesses
            </SectionTitle>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {serviceItems.map((svc) => (
              <div
                key={svc.title}
                className="bg-white border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
              >
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black uppercase tracking-wide mb-2">
                  {svc.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  {svc.desc}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why Markit Media */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why New York businesses choose Markit Media for web development"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why New York Businesses Choose Markit Media for Web Development
            </SectionTitle>
          </Animate>
          <ul className="mt-10 space-y-4">
            {reasons.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <li className="flex items-start gap-4 py-3 border-b border-gray-200">
                  <span className="w-8 h-8 bg-black text-white flex items-center justify-center flex-shrink-0 text-base font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <span className="text-base font-bold text-black">
                      {item.title}
                    </span>
                    <p className="text-base text-gray-500 leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </li>
              </Animate>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Our web development process"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Process</SectionLabel>
            <SectionTitle>
              How We Build Websites for New York Clients
            </SectionTitle>
          </Animate>
          <div className="mt-12 space-y-8">
            {processSteps.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 80}>
                <div className="flex items-start gap-6">
                  <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black flex-shrink-0 w-12">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black">
                      {item.title}
                    </h3>
                    <p className="text-base text-gray-500 leading-relaxed mt-2">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Related services"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Explore More</SectionLabel>
            <SectionTitle>Related Services</SectionTitle>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          >
            <Link
              href="/services/website-development"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Website Development
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Full web development services across all platforms.
              </p>
            </Link>
            <Link
              href="/services/website-development/wordpress"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                WordPress
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Custom themes, headless builds, and WooCommerce stores.
              </p>
            </Link>
            <Link
              href="/services/website-development/shopify"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Shopify
              </h3>
              <p className="text-base text-gray-500 mt-2">
                E-commerce storefronts and custom theme development.
              </p>
            </Link>
            <Link
              href="/locations/united-states/new-york"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                All New York Services
              </h3>
              <p className="text-base text-gray-500 mt-2">
                View every service we offer to New York businesses.
              </p>
            </Link>
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Your Website Should Work as Hard as Your Business
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a site that meets the standards of the New York
              market — fast, polished, and built to convert.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none"
            >
              Discuss Your Project &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
