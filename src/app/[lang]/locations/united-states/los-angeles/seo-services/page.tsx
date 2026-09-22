import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "SEO Services in Los Angeles — Markit Media",
  description:
    "SEO services for businesses in Los Angeles. Technical SEO, local SEO, and content SEO built for LA's high-volume search market and multi-location business landscape.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/los-angeles/seo-services",
  },
  openGraph: {
    title: "SEO Services in Los Angeles — Markit Media",
    description:
      "SEO services for businesses in Los Angeles. Technical SEO, local SEO, and content SEO built for the LA search market.",
  },
};

const serviceItems = [
  {
    title: "Technical SEO",
    desc: "Site architecture audits, crawlability improvements, schema markup, Core Web Vitals optimization, and indexation management. The foundation that determines whether your content can rank at all.",
  },
  {
    title: "Local SEO",
    desc: "Google Business Profile optimization, local citation building, review management strategy, and geo-targeted content for businesses that depend on Los Angeles neighborhood and metro-area search visibility.",
  },
  {
    title: "Content SEO & Strategy",
    desc: "Keyword research, content gap analysis, editorial calendar development, and SEO-driven copywriting. We produce content that targets real search demand — not keyword-stuffed filler that reads like it was written for an algorithm.",
  },
  {
    title: "Link Building & Digital PR",
    desc: "Outreach-based link acquisition, guest content placement, and digital PR campaigns that build domain authority through legitimate, editorially earned backlinks — not paid link schemes.",
  },
  {
    title: "Competitor & Market Analysis",
    desc: "Deep analysis of what your LA competitors rank for, how they are structured, and where the gaps are. We identify the opportunities that have the highest return for the effort required.",
  },
  {
    title: "SEO Reporting & Analytics",
    desc: "Monthly reporting that tracks rankings, organic traffic, conversions, and revenue attribution. Every report explains what changed, why, and what we are doing about it next.",
  },
];

const reasons = [
  {
    title: "LA's search volume demands a serious approach",
    desc: "Los Angeles generates enormous local search volume across every industry — from restaurants and real estate to legal services, healthcare, and e-commerce. Ranking here is not a side project. It requires a structured, sustained effort across technical foundations, content, and link authority.",
  },
  {
    title: "Multi-location and neighborhood-level targeting",
    desc: "Many LA businesses serve multiple neighborhoods, cities within the metro, or operate across locations. We build SEO strategies that account for this complexity — separate local landing pages, location-specific schema, and Google Business Profile management for each service area.",
  },
  {
    title: "Content that serves the audience, not just the algorithm",
    desc: "Search engines have gotten better at evaluating content quality. Thin pages stuffed with location keywords do not rank the way they used to. We produce substantive content that answers real questions your LA audience is asking — and that earns links and engagement because it is genuinely useful.",
  },
  {
    title: "Transparent methodology and realistic timelines",
    desc: "SEO takes time, and anyone promising first-page rankings in 30 days is not being honest. We set realistic expectations, explain exactly what we are doing and why, and report on progress with metrics that matter — not vanity dashboards designed to look impressive without showing real business impact.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Comprehensive SEO Audit",
    desc: "We start with a full technical audit of your site — crawl errors, site speed, mobile usability, indexation issues, on-page gaps, and backlink profile analysis. For LA businesses, we also audit your local presence: Google Business Profile, citations, and review signals.",
  },
  {
    step: "02",
    title: "Keyword Research & Prioritization",
    desc: "We identify the keywords and topics with the highest business value for your LA market — factoring in search volume, competition, commercial intent, and your current ranking position. The result is a prioritized target list, not a spreadsheet of thousands of irrelevant terms.",
  },
  {
    step: "03",
    title: "Implementation & Content Production",
    desc: "Technical fixes are deployed first to remove ranking barriers. Then we execute the content roadmap — new pages, optimized existing content, and supporting assets — while building links through outreach and digital PR in parallel.",
  },
  {
    step: "04",
    title: "Monitoring, Reporting & Iteration",
    desc: "We track rankings, traffic, and conversions on a continuous basis and report monthly. Strategy adjusts based on what the data shows — algorithm updates, competitor movements, and seasonal shifts in the LA market all factor into ongoing optimization.",
  },
];

export default function LosAngelesSeoServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "SEO services for businesses in Los Angeles. Technical SEO, local SEO, content strategy, and link building for the LA search market.",
    areaServed: { "@type": "City", name: "Los Angeles" },
    url: "https://themarkitmedia.com/en/locations/united-states/los-angeles/seo-services",
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
            label: "Los Angeles",
            href: "/locations/united-states/los-angeles",
          },
          { label: "SEO Services" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Los Angeles</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              SEO Services for Businesses in Los Angeles
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Los Angeles is one of the highest-volume local search markets in
              the United States. Whether you are competing for organic traffic
              citywide or targeting specific neighborhoods, your SEO program
              needs to be structured, sustained, and grounded in data. That is
              what we deliver.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Get a Free SEO Audit &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* Service Details */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="SEO services for Los Angeles"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>
              SEO Services Built for the LA Search Market
            </SectionTitle>
            <p className="text-base text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Our SEO programs cover the full spectrum — from the technical
              infrastructure that makes ranking possible to the content and links
              that drive it. Each component below can be engaged individually or
              as part of a comprehensive SEO retainer.
            </p>
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

      {/* Why LA Businesses Choose Markit Media for SEO */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why Los Angeles businesses choose Markit Media for SEO"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Los Angeles Businesses Choose Markit Media for SEO
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
        aria-label="Our SEO process"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Process</SectionLabel>
            <SectionTitle>
              How We Approach SEO for LA Businesses
            </SectionTitle>
          </Animate>
          <div className="mt-10 space-y-8">
            {processSteps.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 80}>
                <div className="flex items-start gap-5">
                  <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black flex-shrink-0 w-12">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black">
                      {item.title}
                    </h3>
                    <p className="text-base text-gray-500 leading-relaxed mt-1">
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
      <section className="px-6 lg:px-12 py-20" aria-label="Related services">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Explore More</SectionLabel>
            <SectionTitle>Related Services</SectionTitle>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-10"
          >
            <Link
              href="/services/seo"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <span className="text-base font-bold text-black">SEO</span>
              <p className="text-base text-gray-500 mt-1">
                Our full SEO service overview.
              </p>
            </Link>
            <Link
              href="/services/seo/technical-seo"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <span className="text-base font-bold text-black">
                Technical SEO
              </span>
              <p className="text-base text-gray-500 mt-1">
                Site architecture, speed, and crawlability.
              </p>
            </Link>
            <Link
              href="/services/seo/local-seo"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <span className="text-base font-bold text-black">Local SEO</span>
              <p className="text-base text-gray-500 mt-1">
                Google Business Profile and local visibility.
              </p>
            </Link>
            <Link
              href="/services/seo/content-seo"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <span className="text-base font-bold text-black">
                Content SEO
              </span>
              <p className="text-base text-gray-500 mt-1">
                Keyword-driven content strategy and production.
              </p>
            </Link>
            <Link
              href="/locations/united-states/los-angeles"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <span className="text-base font-bold text-black">
                All LA Services
              </span>
              <p className="text-base text-gray-500 mt-1">
                View all services available in Los Angeles.
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
              Your Competitors Are Already Investing in SEO
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s find out where you stand in the LA search landscape and
              build a plan to close the gap.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none"
            >
              Get a Free SEO Audit &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
