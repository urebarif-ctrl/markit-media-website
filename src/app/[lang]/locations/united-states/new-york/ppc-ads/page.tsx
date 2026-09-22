import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "PPC Ads Agency in New York — Markit Media",
  description:
    "PPC and paid advertising agency serving businesses in New York. Google Ads, Meta Ads, and paid search management built for high-CPC markets.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/new-york/ppc-ads",
  },
  openGraph: {
    title: "PPC Ads Agency in New York — Markit Media",
    description:
      "PPC and paid advertising agency serving businesses in New York. Google Ads, Meta Ads, and paid search management built for high-CPC markets.",
  },
};

const serviceItems = [
  {
    title: "Google Ads Management",
    desc: "Search, Shopping, Display, and YouTube ad campaigns structured for the New York market — where cost-per-click rates demand precise keyword selection and tight bid management.",
  },
  {
    title: "Meta Ads (Facebook & Instagram)",
    desc: "Audience targeting, creative production, retargeting sequences, and conversion optimization across Meta&apos;s platforms for New York consumer and B2B audiences.",
  },
  {
    title: "LinkedIn Advertising",
    desc: "Sponsored content, InMail campaigns, and lead gen forms targeting New York&apos;s dense concentration of professionals in finance, media, tech, and professional services.",
  },
  {
    title: "Landing Page Development",
    desc: "Custom landing pages designed and built for conversion — fast-loading, mobile-first, and aligned with your ad messaging to maximize quality scores and reduce wasted spend.",
  },
  {
    title: "Conversion Tracking & Attribution",
    desc: "Proper tracking setup across Google Analytics, ad platform pixels, and CRM integrations so every dollar of spend can be tied back to a business outcome.",
  },
  {
    title: "Ongoing Optimization",
    desc: "Daily bid adjustments, search term analysis, negative keyword management, A/B creative testing, and budget reallocation based on real performance data.",
  },
];

const reasons = [
  {
    title: "Efficiency-first approach for expensive markets",
    desc: "New York CPCs are among the highest in the country across nearly every industry. We build campaigns around efficiency from day one — tight keyword targeting, aggressive negative keyword lists, and bid strategies that prevent budget waste on low-intent traffic.",
  },
  {
    title: "Platform expertise across Google and Meta",
    desc: "We manage both search and social advertising under one roof. That means your Google Ads and Meta campaigns share data, audiences, and creative learnings rather than operating in separate silos with separate agencies.",
  },
  {
    title: "Real-time budget control",
    desc: "In a market where a single wasted click can cost upward of $50, we monitor campaigns daily and make adjustments in real time. You won&apos;t find out about a budget problem at the end of the month — we catch it the same day.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Account Audit & Market Research",
    desc: "We analyze your existing ad accounts (if any), review competitor ad strategies in the New York market, and identify the keyword and audience opportunities with the strongest potential return.",
  },
  {
    step: "02",
    title: "Campaign Architecture",
    desc: "We build campaign structures designed for control — separating brand from non-brand, segmenting by intent level, and organizing ad groups to ensure budget flows toward your highest-value opportunities.",
  },
  {
    step: "03",
    title: "Creative & Landing Pages",
    desc: "Ad copy, visual creative, and dedicated landing pages are built together so messaging stays consistent from the first impression through conversion. Every element is designed to improve quality score and lower costs.",
  },
  {
    step: "04",
    title: "Launch, Monitor & Optimize",
    desc: "Campaigns go live with conservative budgets, and we scale based on performance data. We run structured tests on bids, audiences, placements, and creative to find and scale winning combinations.",
  },
];

export default function NewYorkPPCAdsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "PPC and paid advertising agency serving businesses in New York. Google Ads, Meta Ads, and paid search campaign management.",
    areaServed: { "@type": "City", name: "New York" },
    url: "https://themarkitmedia.com/en/locations/united-states/new-york/ppc-ads",
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
          { label: "PPC Ads" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>New York</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              PPC Ads Agency Serving Businesses in New York
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Running paid ads in the New York market means competing against some of
              the biggest budgets and most aggressive bidders in the country. Every
              click costs more here, which means every campaign decision matters more.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media helps New York businesses get more from their paid
              advertising — better targeting, tighter cost control, and campaigns
              structured to convert, not just generate traffic.
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
        aria-label="PPC services for New York businesses"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>PPC Services for the New York Market</SectionTitle>
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
        aria-label="Why New York businesses choose Markit Media for PPC"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why New York Businesses Choose Markit Media for PPC
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
            <SectionTitle>How We Manage PPC for New York Clients</SectionTitle>
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
                Search, Shopping, Display, and YouTube campaign management.
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
              Stop Wasting Ad Spend in New York
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build PPC campaigns that make every click count in one of
              the most expensive ad markets in the country.
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
