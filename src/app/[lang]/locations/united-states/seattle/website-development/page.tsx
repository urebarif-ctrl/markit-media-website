import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Website Development in Seattle — Markit Media",
  description:
    "Website design and development for Seattle businesses. WordPress, Shopify, and Next.js builds for cloud technology, aerospace, clean energy, gaming, and Pacific Northwest enterprises.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/seattle/website-development",
  },
  openGraph: {
    title: "Website Development in Seattle — Markit Media",
    description:
      "Website design and development for Seattle businesses. WordPress, Shopify, and Next.js builds for cloud technology, aerospace, clean energy, gaming, and Pacific Northwest enterprises.",
  },
};

const serviceItems = [
  {
    title: "WordPress Development",
    desc: "Custom WordPress sites with purpose-built themes and plugin configurations — designed for Seattle businesses that need a reliable, easy-to-manage CMS for content marketing, lead generation, and operational pages without ongoing developer dependency.",
  },
  {
    title: "Shopify & E-Commerce",
    desc: "Shopify storefronts built for Seattle’s retail and direct-to-consumer brands — from outdoor lifestyle companies along the Puget Sound to specialty food producers and sustainable product lines that define the Pacific Northwest market.",
  },
  {
    title: "Next.js & Custom Builds",
    desc: "High-performance Next.js applications for Seattle’s tech-forward companies that need server-side rendering, API integrations, and the kind of speed and flexibility that a standard CMS cannot deliver — built to the engineering standards this market expects.",
  },
  {
    title: "Responsive Design & UX",
    desc: "Mobile-first, accessible design that works across every device and screen size — meeting the expectations of Seattle’s highly technical user base where poor mobile experience or slow load times immediately erode trust and conversion rates.",
  },
  {
    title: "CMS Integration & Migration",
    desc: "Content management system setup, migration, and training for Seattle businesses moving between platforms — whether consolidating from legacy systems, migrating to headless WordPress, or transitioning from custom-built solutions to maintainable alternatives.",
  },
  {
    title: "Performance & Technical SEO",
    desc: "Core Web Vitals optimization, structured data implementation, and technical SEO foundations built into every site — ensuring Seattle businesses launch with the page speed and search visibility required to compete in organic results from day one.",
  },
];

const reasons = [
  {
    title: "Built for Seattle’s technical standards",
    desc: "Seattle’s workforce includes some of the most technically sophisticated users in the country. A website that loads slowly, breaks on mobile, or feels outdated will lose credibility before a single conversation starts. We build sites that meet the performance and design standards this market demands.",
  },
  {
    title: "Platform expertise across WordPress, Shopify, and Next.js",
    desc: "We recommend the right platform for the job — not the one we prefer. WordPress for content-heavy marketing sites, Shopify for e-commerce, and Next.js for custom applications. Seattle businesses get a site built on the technology that fits their actual needs and growth trajectory.",
  },
  {
    title: "Designed for conversion, not just appearance",
    desc: "Every page we build is structured around a conversion goal — lead capture, demo request, purchase, or contact. Seattle companies competing in cloud, aerospace, and professional services need websites that generate pipeline, not just look good in a portfolio.",
  },
  {
    title: "Ongoing support without vendor lock-in",
    desc: "We build on open platforms with clean, documented code. Seattle businesses own their site, their codebase, and their content — with ongoing support available but never required as a condition of keeping their site running.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Requirements",
    desc: "We map your business goals, user needs, content structure, and technical requirements — identifying the right platform and architecture for your Seattle business before any design or development begins.",
  },
  {
    step: "02",
    title: "Design & Prototyping",
    desc: "We design responsive layouts, page templates, and user flows — presenting interactive prototypes for review so the structure, navigation, and visual direction are confirmed before development starts.",
  },
  {
    step: "03",
    title: "Development & Integration",
    desc: "Our team builds the site on your chosen platform — WordPress, Shopify, or Next.js — with CMS configuration, third-party integrations, performance optimization, and technical SEO built in from the start.",
  },
  {
    step: "04",
    title: "Launch & Handoff",
    desc: "We handle staging, QA testing, and production deployment — then provide documentation, CMS training, and a clear handoff so your Seattle team can manage day-to-day content updates independently.",
  },
];

export default function SeattleWebDevelopmentPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "Website design and development for Seattle businesses. WordPress, Shopify, and Next.js builds for cloud technology, aerospace, clean energy, and Pacific Northwest enterprises.",
    areaServed: { "@type": "City", name: "Seattle" },
    url: "https://themarkitmedia.com/en/locations/united-states/seattle/website-development",
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "United States", href: "/locations/united-states" },
          { label: "Seattle", href: "/locations/united-states/seattle" },
          { label: "Website Development" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Seattle</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              Website Development for Seattle Businesses
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Seattle is home to some of the most technically sophisticated
              companies and consumers in the country. From cloud computing
              giants and aerospace manufacturers to outdoor lifestyle brands
              and clean energy startups, businesses here operate in an
              environment where digital quality is a baseline expectation
              &mdash; not a differentiator.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media builds websites on WordPress, Shopify, and Next.js
              for Seattle businesses &mdash; fast, conversion-focused, and
              engineered to meet the performance standards that the Pacific
              Northwest&apos;s tech-forward market demands.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Get a Free Consultation &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* Service Details */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Web development services for Seattle businesses"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>Website Development for Seattle</SectionTitle>
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
        aria-label="Why Seattle businesses choose Markit Media for web development"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Seattle Businesses Choose Markit Media for Web Development
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
              How We Build Websites for Seattle Clients
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
              href="/locations/united-states/seattle/marketing-agency"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Marketing Agency
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Full-service marketing strategy and execution for Seattle.
              </p>
            </Link>
            <Link
              href="/locations/united-states/seattle/ppc-ads"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                PPC Ads
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Paid media campaigns built for measurable ROI in Seattle.
              </p>
            </Link>
            <Link
              href="/locations/united-states/seattle/seo-services"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                SEO Services
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Organic search visibility through technical and content SEO.
              </p>
            </Link>
            <Link
              href="/services/branding"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Branding
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Visual identity and brand strategy for competitive markets.
              </p>
            </Link>
          </Stagger>
          <Animate animation="fade-up" delay={200}>
            <div className="mt-8">
              <Link
                href="/locations/united-states/seattle"
                className="text-base font-bold text-black underline underline-offset-4 hover:text-gray-600 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                View all Seattle services &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need a Website That Performs in Seattle?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a site that meets the technical standards of
              the Pacific Northwest&apos;s most demanding market.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
