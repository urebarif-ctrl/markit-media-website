import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Website Development Agency in Miami — Markit Media",
  description:
    "Website development for businesses in Miami. WordPress, Shopify, and Next.js builds with bilingual architecture, mobile-first design, and conversion optimization for South Florida's diverse market.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/miami/website-development",
  },
  openGraph: {
    title: "Website Development Agency in Miami — Markit Media",
    description:
      "Website development for businesses in Miami. WordPress, Shopify, and Next.js builds with bilingual architecture and mobile-first design for South Florida.",
  },
};

const serviceItems = [
  {
    title: "WordPress Development",
    desc: "Custom WordPress themes, multilingual site architecture, plugin development, and CMS configuration for Miami businesses that need content management in both English and Spanish without maintaining two separate websites.",
  },
  {
    title: "Shopify & E-Commerce",
    desc: "Shopify storefronts, custom theme builds, multi-currency support, and checkout optimization for Miami's fashion, lifestyle, and retail brands selling to both local and Latin American customers online.",
  },
  {
    title: "Next.js & Custom Applications",
    desc: "Server-rendered React applications, headless CMS architectures, and custom web platforms for Miami businesses that need speed, SEO performance, and the flexibility to serve content dynamically across languages and regions.",
  },
  {
    title: "UX & UI Design",
    desc: "Wireframing, prototyping, and visual design grounded in conversion best practices. Miami's hospitality and real estate markets demand polished interfaces that build trust with international visitors and buyers before they ever make contact.",
  },
  {
    title: "Performance Optimization",
    desc: "Core Web Vitals audits, image compression, code splitting, and CDN configuration. South Florida's mobile-heavy traffic means slow-loading pages lose visitors before they scroll — speed is the baseline, not an upgrade.",
  },
  {
    title: "Ongoing Maintenance & Support",
    desc: "Security updates, plugin management, uptime monitoring, content updates, and technical support so your site stays fast, secure, and current after launch. We handle the infrastructure so you can focus on running your business.",
  },
];

const reasons = [
  {
    title: "Bilingual site architecture built properly",
    desc: "Over 70% of Miami-Dade County residents speak Spanish at home. A bilingual website is not a nice-to-have — it is a business requirement. We build true multilingual architectures with proper hreflang tags, language-specific URL structures, and content that reads naturally in both languages, not machine-translated afterthoughts.",
  },
  {
    title: "Built for Miami's mobile-first audience",
    desc: "South Florida's market skews heavily toward mobile browsing. Tourism-driven searches, restaurant lookups, real estate inquiries, and local service calls happen on phones first. Every site we build starts with the mobile experience and scales up to desktop — not the other way around.",
  },
  {
    title: "Industry expertise across hospitality, real estate, and e-commerce",
    desc: "Miami's economy runs on tourism, real estate, and international commerce. We understand the conversion patterns specific to these industries — property listing integrations, reservation and booking flows, multilingual product catalogs, and the trust signals that international buyers expect.",
  },
  {
    title: "Platform recommendation based on your actual needs",
    desc: "We do not force every project into the same tech stack. WordPress is the right choice for content-driven bilingual sites. Shopify handles e-commerce well. Next.js is ideal for performance-critical or highly custom applications. We recommend the platform that fits your business — not the one that is fastest for us to template.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Requirements & Discovery",
    desc: "We start with your business goals, audience, and market position. For Miami businesses, this includes language requirements, target demographics, industry-specific integrations, and competitive benchmarking within the South Florida market.",
  },
  {
    step: "02",
    title: "Design & Prototyping",
    desc: "Wireframes and visual designs are built in Figma and shared for review before any code is written. You see the layout, user flow, and responsive behavior on every screen size — including how bilingual content is handled — before development begins.",
  },
  {
    step: "03",
    title: "Development & Integration",
    desc: "We build on your chosen platform, integrate third-party tools — analytics, CRM, booking systems, payment processors, multilingual plugins — and optimize for speed and SEO from the start, not as an afterthought.",
  },
  {
    step: "04",
    title: "QA, Launch & Handoff",
    desc: "Cross-browser and cross-device testing, staging environment review, and a structured launch process. After go-live, you receive documentation and training so your team can manage day-to-day content updates independently in both languages.",
  },
];

const faqs = [
  {
    q: "Do you build bilingual websites for Miami businesses?",
    a: "Yes. We build true multilingual architectures with proper hreflang tags and language-specific URL structures, with content written for each language rather than machine-translated.",
  },
  {
    q: "Can you build websites for hospitality and tourism businesses?",
    a: "Yes. We build reservation and booking flows, property and menu integrations, and the trust signals that international visitors expect before they book or buy.",
  },
  {
    q: "Do you design websites for luxury brands in Miami?",
    a: "Yes. We design polished, conversion-focused interfaces for luxury real estate, hospitality, and lifestyle brands that need to build trust with international buyers and visitors.",
  },
  {
    q: "Are your websites optimized for tourists browsing on mobile?",
    a: "Yes. Every site we build starts with the mobile experience and scales up to desktop, since South Florida's tourism-driven traffic is heavily mobile.",
  },
];

export default function MiamiWebsiteDevelopmentPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "Website development agency serving businesses in Miami. WordPress, Shopify, and Next.js builds with bilingual architecture and mobile-first design.",
    areaServed: { "@type": "City", name: "Miami" },
    url: "https://themarkitmedia.com/en/locations/united-states/miami/website-development",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <article>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "United States", href: "/locations/united-states" },
          { label: "Miami", href: "/locations/united-states/miami" },
          { label: "Website Development" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Miami" className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Miami</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              Website Development for Businesses in Miami
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Miami is a bilingual market with international reach. Your website
              needs to serve English and Spanish-speaking audiences, load fast on
              mobile, and convert visitors who are comparing you against
              competitors across South Florida and Latin America.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media builds websites for Miami businesses on WordPress,
              Shopify, and Next.js — with proper multilingual architecture,
              mobile-first design, and the conversion focus that tourism,
              hospitality, real estate, and e-commerce businesses need to grow.
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
        aria-label="Website development services for Miami"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>
              Web Development Services for the Miami Market
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

      {/* Why Miami Businesses Choose Markit Media for Web Dev */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why Miami businesses choose Markit Media for website development"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Miami Businesses Choose Markit Media for Web Development
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
              How We Build Websites for Miami Businesses
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
                Custom themes, multilingual builds, and WooCommerce stores.
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
              href="/locations/united-states/miami"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                All Miami Services
              </h3>
              <p className="text-base text-gray-500 mt-2">
                View every service we offer to Miami businesses.
              </p>
            </Link>
          </Stagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-12 py-20" aria-label="Frequently asked questions">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Frequently Asked Questions About Website Development in Miami</SectionTitle>
          </Animate>
          <div className="mt-10 space-y-6">
            {faqs.map((faq, i) => (
              <Animate key={i} animation="fade-up" delay={i * 60}>
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black">{faq.q}</h3>
                  <p className="text-base text-gray-500 leading-relaxed mt-2">{faq.a}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Your Website Should Work as Hard as Your Business
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a site that serves Miami&apos;s bilingual audience,
              loads fast on every device, and converts the traffic you are
              working to drive there.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Discuss Your Project &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
