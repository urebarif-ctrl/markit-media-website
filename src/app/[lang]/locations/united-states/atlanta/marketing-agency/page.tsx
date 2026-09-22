import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Marketing Agency in Atlanta — Markit Media",
  description:
    "Full-service marketing agency for Atlanta businesses. Strategy, execution, and analytics for logistics, healthcare, fintech, entertainment, and Fortune 500 enterprises across metro Atlanta.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/atlanta/marketing-agency",
  },
  openGraph: {
    title: "Marketing Agency in Atlanta — Markit Media",
    description:
      "Full-service marketing agency for Atlanta businesses. Strategy, execution, and analytics for logistics, healthcare, fintech, entertainment, and Fortune 500 enterprises across metro Atlanta.",
  },
};

const serviceItems = [
  {
    title: "Marketing Strategy",
    desc: "Competitive analysis, audience research, and channel planning built for Atlanta’s diverse economy — from Fortune 500 headquarters and logistics networks to the city’s fast-growing fintech and entertainment sectors.",
  },
  {
    title: "Paid Media Management",
    desc: "Google Ads, Meta Ads, and LinkedIn campaigns structured for Atlanta’s mix of enterprise and mid-market businesses, where reaching decision-makers at companies like Coca-Cola, Delta, and UPS requires precision targeting and smart budget allocation.",
  },
  {
    title: "Search Engine Optimization",
    desc: "Technical audits, keyword strategy, and content production designed to capture organic demand across Atlanta’s competitive industries — healthcare, logistics, real estate, and professional services — and outrank established local players.",
  },
  {
    title: "Social Media Marketing",
    desc: "Content strategy, community management, and paid social campaigns across LinkedIn, Instagram, and Meta — calibrated for Atlanta’s blend of corporate decision-makers, small business owners, and consumer audiences.",
  },
  {
    title: "Web Design & Development",
    desc: "WordPress, Shopify, and custom Next.js builds that load fast, convert visitors, and meet the expectations of Atlanta’s enterprise and healthcare sectors where digital professionalism is a baseline requirement.",
  },
  {
    title: "Analytics & Reporting",
    desc: "Custom dashboards, conversion tracking, and attribution modeling that connect marketing spend to pipeline and revenue — giving Atlanta businesses the visibility to make informed decisions about where to invest next.",
  },
];

const reasons = [
  {
    title: "Built for Atlanta’s Fortune 500 ecosystem",
    desc: "Atlanta is home to more Fortune 500 headquarters than most U.S. cities — Coca-Cola, Delta Air Lines, UPS, Home Depot, and others. Marketing in this environment means understanding enterprise buying cycles, multi-stakeholder decision-making, and the standard of professionalism these organizations expect from their partners.",
  },
  {
    title: "Coordinated execution across every channel",
    desc: "Atlanta businesses competing in logistics, healthcare, and fintech need campaigns that work together across paid media, organic search, social, and web. We manage all channels under one strategy so nothing runs in isolation and budget flows toward what actually drives results.",
  },
  {
    title: "Southeastern gateway, national ambition",
    desc: "Atlanta is the commercial gateway to the southeastern United States and a launchpad for national expansion. We build marketing strategies that work locally across the metro — from Buckhead to Midtown to the Perimeter — and scale to support growth across the region and beyond.",
  },
  {
    title: "Performance measured in business outcomes",
    desc: "We tie every campaign to pipeline generated and revenue influenced, not vanity metrics. Atlanta’s competitive market demands marketing that proves its return — and we structure reporting so you can see exactly what your investment produces.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Market Analysis",
    desc: "We audit your current marketing, analyze your competitive landscape in the Atlanta metro, and identify the channels and tactics most likely to drive results in your specific industry — whether that is logistics, healthcare, entertainment, or professional services.",
  },
  {
    step: "02",
    title: "Strategy & Roadmap",
    desc: "We deliver a channel-by-channel plan with clear priorities, budgets, timelines, and KPIs — designed around the realities of marketing in a metro with six million people and some of the most recognized brands in the world.",
  },
  {
    step: "03",
    title: "Execution & Launch",
    desc: "Our team builds and launches campaigns across your chosen channels — ad creative, landing pages, SEO content, and social assets — all coordinated under a single strategy tailored to the Atlanta market.",
  },
  {
    step: "04",
    title: "Optimization & Growth",
    desc: "We monitor performance continuously, run structured tests, reallocate budget toward what converts, and scale winning campaigns while cutting underperformers — adapting as Atlanta’s market dynamics evolve.",
  },
];

export default function AtlantaMarketingAgencyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "Full-service marketing agency for Atlanta businesses. Strategy, execution, and analytics for logistics, healthcare, fintech, entertainment, and Fortune 500 enterprises.",
    areaServed: { "@type": "City", name: "Atlanta" },
    url: "https://themarkitmedia.com/en/locations/united-states/atlanta/marketing-agency",
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "United States", href: "/locations/united-states" },
          { label: "Atlanta", href: "/locations/united-states/atlanta" },
          { label: "Marketing Agency" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Atlanta</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              Marketing Agency Serving Businesses in Atlanta
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Atlanta is the economic engine of the southeastern United States
              &mdash; home to Fortune 500 headquarters, the world&apos;s
              busiest airport, a booming film and entertainment industry, and
              one of the fastest-growing fintech corridors in the country.
              Marketing here means reaching decision-makers across logistics,
              healthcare, enterprise technology, and a business community that
              is among the most diverse in the nation.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media serves Atlanta businesses with full-service marketing
              &mdash; strategy, execution, and performance analytics &mdash;
              built to generate pipeline and revenue in one of the most
              competitive metros in the country.
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
        aria-label="Marketing services for Atlanta businesses"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>Full-Service Marketing for Atlanta</SectionTitle>
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
        aria-label="Why Atlanta businesses choose Markit Media"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Atlanta Businesses Choose Markit Media for Marketing
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
        aria-label="Our marketing process"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Process</SectionLabel>
            <SectionTitle>How We Work With Atlanta Clients</SectionTitle>
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
              href="/locations/united-states/atlanta/ppc-ads"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                PPC Ads
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Paid media campaigns built for measurable ROI in Atlanta.
              </p>
            </Link>
            <Link
              href="/locations/united-states/atlanta/seo-services"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                SEO Services
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Organic search visibility through technical and content SEO.
              </p>
            </Link>
            <Link
              href="/locations/united-states/atlanta/website-development"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Website Development
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Fast, conversion-focused websites for Atlanta businesses.
              </p>
            </Link>
            <Link
              href="/services/branding"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
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
                href="/locations/united-states/atlanta"
                className="text-base font-bold text-black underline underline-offset-4 hover:text-gray-600 transition-colors"
              >
                View all Atlanta services &rarr;
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
              Ready to Compete in Atlanta?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy that drives real results in
              the southeastern United States&apos; most competitive market.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
