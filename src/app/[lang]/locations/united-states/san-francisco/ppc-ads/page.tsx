import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "PPC Ads Agency in San Francisco — Markit Media",
  description:
    "PPC and paid advertising agency for San Francisco businesses. Google Ads, Meta Ads, and LinkedIn campaigns built for SaaS, biotech, fintech, and venture-backed B2B lead generation.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/san-francisco/ppc-ads",
  },
  openGraph: {
    title: "PPC Ads Agency in San Francisco — Markit Media",
    description:
      "PPC and paid advertising agency for San Francisco businesses. Google Ads, Meta Ads, and LinkedIn campaigns built for SaaS, biotech, fintech, and venture-backed B2B lead generation.",
  },
};

const serviceItems = [
  {
    title: "Google Ads Management",
    desc: "Search, Display, and YouTube campaigns built for San Francisco’s hyper-competitive SaaS and technology landscape — where branded keyword bids are aggressive, category terms command premium CPCs, and campaign structure is the difference between profitable growth and burned budget.",
  },
  {
    title: "Meta Ads (Facebook & Instagram)",
    desc: "Audience targeting, creative production, and retargeting campaigns across Meta’s platforms — reaching San Francisco’s tech-savvy population and Bay Area decision-makers with messaging calibrated for high customer acquisition costs.",
  },
  {
    title: "LinkedIn Advertising",
    desc: "Sponsored content, InMail campaigns, and lead gen forms targeting San Francisco’s dense concentration of SaaS buyers, startup founders, venture capitalists, and technology executives across the Bay Area.",
  },
  {
    title: "Landing Page Development",
    desc: "Dedicated landing pages engineered for conversion — fast-loading, mobile-first, and aligned with your ad messaging to maximize quality scores and reduce cost per acquisition in one of the most expensive ad markets in the country.",
  },
  {
    title: "Conversion Tracking & Attribution",
    desc: "Multi-touch attribution, CRM integration, and proper tracking setup so every dollar of spend connects to a qualified lead, demo request, or product trial — the metrics that matter to growth teams and investors.",
  },
  {
    title: "Ongoing Campaign Optimization",
    desc: "Daily bid adjustments, search term analysis, negative keyword management, A/B creative testing, and budget reallocation based on what actually converts — critical in a market where wasted spend compounds faster than anywhere else.",
  },
];

const reasons = [
  {
    title: "Built for San Francisco’s high-CAC environment",
    desc: "SaaS, biotech, and fintech companies in San Francisco face some of the highest customer acquisition costs in B2B advertising. We structure PPC campaigns around unit economics — targeting the job titles, companies, and intent signals that produce pipeline, not just form fills that never convert to revenue.",
  },
  {
    title: "Cross-platform management under one strategy",
    desc: "Google Ads, Meta Ads, and LinkedIn Ads produce better results when managed together — audience data, creative learnings, and budget allocation decisions all improve when they are not siloed across vendors. We run all platforms from a single strategy so your campaigns compound instead of compete.",
  },
  {
    title: "Precision in an expensive market",
    desc: "San Francisco and the Bay Area consistently rank among the most expensive advertising markets in the country. Wasted impressions and poorly targeted clicks cost more here than almost anywhere else. We monitor campaigns daily and make bid, audience, and placement adjustments in real time to protect your budget.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Account Audit & Competitive Analysis",
    desc: "We review your existing ad accounts, analyze competitor ad strategies in the San Francisco market, and identify keyword and audience opportunities where you can acquire customers at sustainable unit economics.",
  },
  {
    step: "02",
    title: "Campaign Architecture",
    desc: "We build campaign structures designed for control — separating brand from non-brand, segmenting by buyer intent and funnel stage, and organizing ad groups so budget flows toward your highest-value opportunities across the Bay Area.",
  },
  {
    step: "03",
    title: "Creative & Landing Pages",
    desc: "Ad copy, visual creative, and dedicated landing pages are built as a unit so messaging stays consistent from first impression through conversion. Every element is designed to improve quality score and lower cost per acquisition.",
  },
  {
    step: "04",
    title: "Launch, Monitor & Scale",
    desc: "Campaigns go live with controlled budgets. We scale based on performance data, running structured tests on bids, audiences, placements, and creative to find winning combinations — then allocate aggressively behind what works.",
  },
];

export default function SanFranciscoPPCAdsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "PPC and paid advertising agency for San Francisco businesses. Google Ads, Meta Ads, and LinkedIn campaign management for SaaS, biotech, fintech, and venture-backed B2B lead generation.",
    areaServed: { "@type": "City", name: "San Francisco" },
    url: "https://themarkitmedia.com/en/locations/united-states/san-francisco/ppc-ads",
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
          { label: "PPC Ads" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>San Francisco</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              PPC Ads Agency Serving Businesses in San Francisco
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              San Francisco is one of the most expensive paid advertising markets
              in the world. SaaS companies, biotech firms, fintech startups, and
              venture-backed businesses are all competing for the same
              high-intent keywords and decision-maker audiences &mdash; which
              means every dollar of ad spend needs to produce measurable pipeline,
              not just traffic.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media helps San Francisco businesses get more from paid
              advertising &mdash; tighter targeting, disciplined budget control,
              and campaigns structured around customer acquisition cost and
              payback period.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Get a Free PPC Audit &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* Service Details */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="PPC services for San Francisco businesses"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>
              PPC Services for the San Francisco Market
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
        aria-label="Why San Francisco businesses choose Markit Media for PPC"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why San Francisco Businesses Choose Markit Media for PPC
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
        aria-label="Our PPC management process"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Process</SectionLabel>
            <SectionTitle>
              How We Manage PPC for San Francisco Clients
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
              href="/services/performance-marketing"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Performance Marketing
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Full-spectrum paid media strategy and management.
              </p>
            </Link>
            <Link
              href="/services/performance-marketing/google-ads"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Google Ads
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Search, Display, and YouTube campaign management.
              </p>
            </Link>
            <Link
              href="/services/performance-marketing/meta-ads"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Meta Ads
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Facebook and Instagram advertising for reach and conversion.
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
              Stop Burning Budget in the Bay Area
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build PPC campaigns that turn San Francisco&apos;s
              expensive clicks into qualified pipeline and closed revenue.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none"
            >
              Get a Free PPC Audit &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
