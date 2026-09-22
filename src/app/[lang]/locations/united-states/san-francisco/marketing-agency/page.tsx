import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Marketing Agency in San Francisco — Markit Media",
  description:
    "Full-service marketing agency for San Francisco businesses. Strategy, execution, and analytics for SaaS, biotech, fintech, and venture-backed companies in the Bay Area.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/san-francisco/marketing-agency",
  },
  openGraph: {
    title: "Marketing Agency in San Francisco — Markit Media",
    description:
      "Full-service marketing agency for San Francisco businesses. Strategy, execution, and analytics for SaaS, biotech, fintech, and venture-backed companies in the Bay Area.",
  },
};

const serviceItems = [
  {
    title: "Marketing Strategy",
    desc: "Competitive analysis, audience segmentation, and channel planning built for San Francisco’s technology-driven market — where SaaS, biotech, and fintech companies compete for the same high-value buyers and every campaign needs a clear path to pipeline.",
  },
  {
    title: "Paid Media Management",
    desc: "Google Ads, Meta Ads, and LinkedIn campaigns structured for San Francisco’s B2B SaaS and venture-backed landscape, where customer acquisition costs are high and unit economics demand precision targeting from day one.",
  },
  {
    title: "Search Engine Optimization",
    desc: "Technical audits, keyword strategy, and content production designed to capture organic demand across San Francisco’s competitive technology, biotech, and professional services sectors — where established players already dominate the first page.",
  },
  {
    title: "Social Media Marketing",
    desc: "Content strategy, community engagement, and paid social campaigns across LinkedIn, Instagram, and Meta — calibrated for San Francisco’s mix of B2B decision-makers, startup founders, and tech-savvy consumers.",
  },
  {
    title: "Web Design & Development",
    desc: "WordPress, Shopify, and custom Next.js builds that meet the design and performance standards San Francisco’s tech ecosystem expects — fast, polished, and built to convert traffic into qualified leads or product signups.",
  },
  {
    title: "Analytics & Reporting",
    desc: "Custom dashboards, conversion tracking, and attribution modeling that tie marketing spend to pipeline and revenue — the metrics that matter to founders, growth teams, and investors in the Bay Area.",
  },
];

const reasons = [
  {
    title: "Built for the Bay Area’s technology-driven economy",
    desc: "San Francisco’s market is dominated by SaaS, biotech, fintech, and venture-backed startups. Generic marketing strategies built for traditional industries fall flat here. We build campaigns that reflect how technology buyers research, evaluate, and purchase — long consideration cycles, multiple stakeholders, and high expectations for content quality.",
  },
  {
    title: "Coordinated execution across every channel",
    desc: "San Francisco companies scaling with venture capital need marketing that compounds across channels, not a patchwork of disconnected vendors. We manage paid media, SEO, social, and web development under one strategy so campaigns reinforce each other and nothing gets lost between handoffs.",
  },
  {
    title: "Performance measured against business outcomes",
    desc: "We track pipeline generated and revenue influenced, not impressions and click-through rates. Every campaign is structured around the metrics your growth team and investors actually care about — CAC, LTV, and payback period.",
  },
  {
    title: "Designed for expensive, competitive markets",
    desc: "San Francisco is one of the most expensive advertising markets in the country. CPCs are higher, talent costs more, and your competitors are well-funded. We build strategies that account for this reality — precise targeting, disciplined budget allocation, and continuous optimization to maximize return on every dollar.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Market Analysis",
    desc: "We audit your current marketing, analyze your competitive landscape in San Francisco, and identify which channels and tactics are most likely to produce results for your specific sector — whether that is B2B SaaS, biotech, fintech, or professional services.",
  },
  {
    step: "02",
    title: "Strategy & Roadmap",
    desc: "We deliver a channel-by-channel plan with clear priorities, budgets, timelines, and KPIs — built around the realities of marketing in one of the most expensive and competitive metros in the country.",
  },
  {
    step: "03",
    title: "Execution & Launch",
    desc: "Our team builds and launches campaigns across your chosen channels — ad creative, landing pages, SEO content, and social assets — all coordinated under a single strategy and aligned with your growth targets.",
  },
  {
    step: "04",
    title: "Optimization & Growth",
    desc: "We monitor performance continuously, run structured tests, reallocate budget toward what converts, and scale winning campaigns — adjusting for the fast-moving dynamics of San Francisco’s tech market.",
  },
];

export default function SanFranciscoMarketingAgencyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "Full-service marketing agency for San Francisco businesses. Strategy, execution, and analytics for SaaS, biotech, fintech, and venture-backed companies in the Bay Area.",
    areaServed: { "@type": "City", name: "San Francisco" },
    url: "https://themarkitmedia.com/en/locations/united-states/san-francisco/marketing-agency",
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
          { label: "Marketing Agency" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>San Francisco</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              Marketing Agency Serving Businesses in San Francisco
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              San Francisco sits at the center of the global technology economy.
              SaaS companies, biotech firms in South San Francisco, fintech
              startups, and venture-backed businesses of every stage compete for
              attention in one of the most expensive and talent-rich markets in
              the country. Marketing here requires precision, speed, and a clear
              connection between spend and business outcomes.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media serves San Francisco businesses with full-service
              marketing &mdash; strategy, execution, and performance analytics
              &mdash; built to generate pipeline and accelerate growth in the Bay
              Area.
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
        aria-label="Marketing services for San Francisco businesses"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>
              Full-Service Marketing for San Francisco
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
        aria-label="Why San Francisco businesses choose Markit Media"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why San Francisco Businesses Choose Markit Media for Marketing
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
            <SectionTitle>
              How We Work With San Francisco Clients
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
              href="/locations/united-states/san-francisco/ppc-ads"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                PPC Ads
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Paid media campaigns for the Bay Area market.
              </p>
            </Link>
            <Link
              href="/locations/united-states/san-francisco/seo-services"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                SEO Services
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Organic search visibility for San Francisco businesses.
              </p>
            </Link>
            <Link
              href="/locations/united-states/san-francisco/website-development"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Website Development
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Web builds for SaaS, biotech, and fintech companies.
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
                href="/locations/united-states/san-francisco"
                className="text-base font-bold text-black underline underline-offset-4 hover:text-gray-600 transition-colors"
              >
                View all San Francisco services &rarr;
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
              Ready to Compete in San Francisco?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy that drives real results in
              one of the most competitive and expensive markets in the world.
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
