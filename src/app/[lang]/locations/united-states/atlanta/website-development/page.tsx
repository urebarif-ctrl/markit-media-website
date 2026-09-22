import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Website Development Agency in Atlanta — Markit Media",
  description:
    "Website development agency serving businesses in Atlanta. WordPress, Shopify, Next.js, and custom web applications built for logistics companies, healthcare providers, fintech firms, and entertainment businesses.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/atlanta/website-development",
  },
  openGraph: {
    title: "Website Development Agency in Atlanta — Markit Media",
    description:
      "Website development agency serving businesses in Atlanta. WordPress, Shopify, Next.js, and custom web applications built for logistics companies, healthcare providers, fintech firms, and entertainment businesses.",
  },
};

const serviceItems = [
  {
    title: "WordPress Development",
    desc: "Custom WordPress themes, headless WordPress builds, and WooCommerce stores for Atlanta businesses — built for fast content management, security, and the ability to scale as your company expands across the Southeast and beyond.",
  },
  {
    title: "Shopify & E-Commerce",
    desc: "Shopify storefronts, custom theme development, and checkout optimization for Atlanta retailers, consumer brands, and e-commerce businesses serving the metro’s six-million-person consumer market and national audiences.",
  },
  {
    title: "Next.js & Custom Applications",
    desc: "Modern React-based web applications using Next.js, server-side rendering, and headless CMS architecture — built for Atlanta’s fintech companies, SaaS startups, and enterprise organizations that need performance and interactivity beyond what templates can deliver.",
  },
  {
    title: "UX & UI Design",
    desc: "User research, wireframing, visual design, and prototyping grounded in conversion best practices. Every design decision is tied to a business objective — whether that is lead generation for a logistics firm, patient acquisition for a healthcare provider, or user onboarding for a fintech platform.",
  },
  {
    title: "Performance Optimization",
    desc: "Core Web Vitals audits, image optimization, code splitting, CDN configuration, and server-side improvements. Atlanta businesses competing for search visibility and user trust cannot afford a site that loads slowly on mobile.",
  },
  {
    title: "Ongoing Maintenance & Support",
    desc: "Security updates, plugin management, uptime monitoring, content updates, and technical support. Your site stays fast, secure, and current after launch — so your team can focus on running the business.",
  },
];

const reasons = [
  {
    title: "Designed for Atlanta’s industry diversity",
    desc: "Atlanta’s economy spans logistics and supply chain, healthcare and life sciences, film and entertainment, fintech, and Fortune 500 corporate operations. A template site built for a generic audience misses the mark. We design and develop sites that speak directly to the industries and audiences that drive business in this market.",
  },
  {
    title: "Performance is a competitive requirement",
    desc: "In a metro where Coca-Cola, Delta, and Home Depot set the standard for digital experiences, a slow or dated website costs you credibility before a prospect reads a single word. We build with performance as a core requirement, targeting sub-two-second load times on mobile.",
  },
  {
    title: "Conversion-focused, not just visual",
    desc: "A website that looks professional but does not generate leads, bookings, or sales is a cost center. We structure every page around clear user journeys, strong calls to action, and measurable conversion points — whether the goal is a B2B consultation request or an e-commerce transaction.",
  },
  {
    title: "SEO-ready architecture from day one",
    desc: "We build every site with clean semantic HTML, proper heading hierarchy, structured data, fast load times, and mobile responsiveness — so your site is positioned to rank in Atlanta search results from the moment it goes live, not months after launch.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Requirements & Discovery",
    desc: "We define the scope, business goals, technical requirements, and target audience. For Atlanta businesses, this includes understanding your competitive positioning within sectors like logistics, healthcare, entertainment, or fintech — and what your audience expects from a digital experience.",
  },
  {
    step: "02",
    title: "Design & Prototyping",
    desc: "Wireframes and visual designs are developed, reviewed, and refined before a single line of code is written. You see exactly what your site will look like — on desktop and mobile — before we build it.",
  },
  {
    step: "03",
    title: "Development & QA",
    desc: "We build your site on the platform that fits your needs — WordPress for content-heavy corporate sites, Shopify for e-commerce, Next.js for custom applications. Every build goes through cross-browser and cross-device testing.",
  },
  {
    step: "04",
    title: "Launch & Handoff",
    desc: "We handle DNS, hosting configuration, SSL, analytics setup, and search console submission. You receive full documentation and training so your team can manage day-to-day content independently.",
  },
];

const faqs = [
  {
    q: "Do you build corporate websites for established Atlanta businesses?",
    a: "Yes. We build corporate sites for Atlanta businesses that need a professional, credible web presence, from vendors serving Fortune 500 companies to established mid-market firms across the metro.",
  },
  {
    q: "Can you build websites for entertainment industry businesses in Atlanta?",
    a: "Yes. Atlanta's film and entertainment industry includes production companies, vendors, and service providers that need websites built for a visually driven, fast-moving industry. We design and develop sites tailored to that audience.",
  },
  {
    q: "Do you build websites for logistics companies?",
    a: "Yes. Logistics and supply chain companies in Atlanta often need sites that clearly communicate service capabilities to enterprise buyers, integrate with existing systems, and support lead generation for long B2B sales cycles.",
  },
  {
    q: "Why does mobile performance matter specifically for an Atlanta audience?",
    a: "Atlanta has significant commuter traffic and a metro area spread across a wide geography, so a large share of visits happen on mobile devices, often on the go. We build with a mobile-first approach so your site loads quickly and functions well regardless of how or where visitors access it.",
  },
];

export default function AtlantaWebsiteDevelopmentPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "Website development agency serving businesses in Atlanta. WordPress, Shopify, Next.js, and custom web applications.",
    areaServed: { "@type": "City", name: "Atlanta" },
    url: "https://themarkitmedia.com/en/locations/united-states/atlanta/website-development",
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
          { label: "Atlanta", href: "/locations/united-states/atlanta" },
          { label: "Website Development" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Atlanta</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              Website Development Agency Serving Businesses in Atlanta
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Atlanta is a city where Fortune 500 companies set the bar for
              digital experiences, where a booming film and entertainment
              industry demands creative excellence, and where fintech startups
              are scaling at a pace that requires web platforms built for
              growth. Your website needs to meet the standard this market
              expects.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media builds websites for Atlanta businesses on WordPress,
              Shopify, and Next.js &mdash; designed for speed, structured for
              search visibility, and built to convert visitors into customers.
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
        aria-label="Web development services for Atlanta businesses"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>
              Web Development Services for Atlanta Businesses
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
        aria-label="Why Atlanta businesses choose Markit Media for web development"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Atlanta Businesses Choose Markit Media for Web Development
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
              How We Build Websites for Atlanta Clients
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
              href="/locations/united-states/atlanta"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                All Atlanta Services
              </h3>
              <p className="text-base text-gray-500 mt-2">
                View every service we offer to Atlanta businesses.
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
            <SectionTitle>Frequently Asked Questions About Website Development in Atlanta</SectionTitle>
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
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Your Website Should Work as Hard as Your Business
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a site that meets the standards of the Atlanta
              market &mdash; fast, professional, and built to convert.
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
