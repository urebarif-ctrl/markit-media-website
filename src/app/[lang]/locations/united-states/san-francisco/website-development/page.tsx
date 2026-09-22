import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Website Development Agency in San Francisco — Markit Media",
  description:
    "Website development agency serving businesses in San Francisco. WordPress, Shopify, Next.js, and custom web applications built for SaaS companies, biotech firms, and venture-backed startups.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/san-francisco/website-development",
  },
  openGraph: {
    title: "Website Development Agency in San Francisco — Markit Media",
    description:
      "Website development agency serving businesses in San Francisco. WordPress, Shopify, Next.js, and custom web applications built for SaaS companies, biotech firms, and venture-backed startups.",
  },
};

const serviceItems = [
  {
    title: "WordPress Development",
    desc: "Custom WordPress themes, headless WordPress builds, and WooCommerce stores for San Francisco businesses — built for fast content management, security, and the flexibility to scale as your company grows from seed stage to enterprise.",
  },
  {
    title: "Shopify & E-Commerce",
    desc: "Shopify storefronts, custom theme development, and checkout optimization for San Francisco’s direct-to-consumer brands and B2B e-commerce companies selling into the Bay Area’s tech-forward consumer base.",
  },
  {
    title: "Next.js & Custom Applications",
    desc: "Modern React-based web applications using Next.js, server-side rendering, and headless CMS architecture — built for SaaS companies, developer tools, and technology businesses that need performance, interactivity, and a product-grade web presence.",
  },
  {
    title: "UX & UI Design",
    desc: "User research, wireframing, visual design, and prototyping grounded in conversion best practices. San Francisco’s tech audience has high expectations for design quality — every interface decision needs to justify itself with data.",
  },
  {
    title: "Performance Optimization",
    desc: "Core Web Vitals audits, image optimization, code splitting, CDN configuration, and server-side improvements. In a market where your competitors are well-funded SaaS companies with dedicated engineering teams, a slow site is a disqualifying signal.",
  },
  {
    title: "Ongoing Maintenance & Support",
    desc: "Security updates, plugin management, uptime monitoring, content updates, and technical support. Your site stays fast, secure, and current after launch — so your team can focus on building the product and growing the business.",
  },
];

const reasons = [
  {
    title: "Built for San Francisco’s technology ecosystem",
    desc: "San Francisco’s economy runs on SaaS, biotech, fintech, and venture-backed startups. A template site designed for a local services business does not meet the expectations of this market. We build sites that reflect the sophistication, speed, and design standards that Bay Area audiences take for granted.",
  },
  {
    title: "Performance is a competitive requirement",
    desc: "San Francisco’s tech-savvy users and Google’s Core Web Vitals both penalize slow sites. Your competitors have engineering teams optimizing load times. We build with performance as a core requirement — targeting sub-two-second load times on mobile and passing all Lighthouse benchmarks.",
  },
  {
    title: "Conversion-focused architecture",
    desc: "A website that looks polished but does not generate demo requests, product trials, or qualified leads is a cost center. We structure every page around clear user journeys, strong calls to action, and measurable conversion points aligned with your growth model.",
  },
  {
    title: "SEO-ready from launch",
    desc: "We build every site with clean semantic HTML, proper heading hierarchy, structured data, fast load times, and mobile responsiveness — so your site is positioned to compete in San Francisco’s crowded organic search results from the day it goes live.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Requirements & Discovery",
    desc: "We define scope, business goals, technical requirements, and target audience. For San Francisco businesses, this means understanding your positioning within the SaaS, biotech, or fintech landscape — and what your audience expects from a digital experience in this market.",
  },
  {
    step: "02",
    title: "Design & Prototyping",
    desc: "Wireframes and visual designs are developed, reviewed, and refined before development begins. You see exactly what your site will look like — on desktop and mobile — before we write a single line of production code.",
  },
  {
    step: "03",
    title: "Development & QA",
    desc: "We build on the platform that fits your needs — WordPress for content-heavy marketing sites, Shopify for e-commerce, Next.js for SaaS product sites and custom applications. Every build goes through cross-browser, cross-device, and performance testing.",
  },
  {
    step: "04",
    title: "Launch & Handoff",
    desc: "We handle DNS, hosting configuration, SSL, analytics setup, and search console submission. You receive full documentation and training so your team can manage content and iterate independently after launch.",
  },
];

export default function SanFranciscoWebsiteDevelopmentPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "Website development agency serving businesses in San Francisco. WordPress, Shopify, Next.js, and custom web applications for SaaS, biotech, and venture-backed companies.",
    areaServed: { "@type": "City", name: "San Francisco" },
    url: "https://themarkitmedia.com/en/locations/united-states/san-francisco/website-development",
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "United States", href: "/locations/united-states" },
          {
            label: "San Francisco",
            href: "/locations/united-states/san-francisco",
          },
          { label: "Website Development" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>San Francisco</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              Website Development Agency Serving Businesses in San Francisco
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              San Francisco is the global hub for technology, SaaS, and
              venture-backed startups. Your website competes for attention
              alongside companies with dedicated engineering and design teams
              &mdash; which means a template site or a slow, generic build is not
              going to cut it in this market.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media builds websites for San Francisco businesses on
              WordPress, Shopify, and Next.js &mdash; designed for performance,
              structured for search visibility, and built to convert visitors
              into customers, demos, or product signups.
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
        aria-label="Web development services for San Francisco businesses"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>
              Web Development Services for San Francisco Businesses
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
        aria-label="Why San Francisco businesses choose Markit Media for web development"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why San Francisco Businesses Choose Markit Media for Web
              Development
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
              How We Build Websites for San Francisco Clients
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
              href="/locations/united-states/san-francisco"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                All San Francisco Services
              </h3>
              <p className="text-base text-gray-500 mt-2">
                View every service we offer to San Francisco businesses.
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
              Your Website Should Match the Market You Compete In
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a site that meets the standards of San
              Francisco&apos;s technology ecosystem &mdash; fast, polished, and
              built to convert.
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
