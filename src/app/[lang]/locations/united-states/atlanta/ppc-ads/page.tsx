import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "PPC Ads Agency in Atlanta — Markit Media",
  description:
    "PPC and paid advertising agency for Atlanta businesses. Google Ads, Meta Ads, and LinkedIn campaigns built for logistics, healthcare, fintech, entertainment, and enterprise lead generation.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/atlanta/ppc-ads",
  },
  openGraph: {
    title: "PPC Ads Agency in Atlanta — Markit Media",
    description:
      "PPC and paid advertising agency for Atlanta businesses. Google Ads, Meta Ads, and LinkedIn campaigns built for logistics, healthcare, fintech, entertainment, and enterprise lead generation.",
  },
};

const serviceItems = [
  {
    title: "Google Ads Management",
    desc: "Search, Display, and YouTube campaigns built for Atlanta’s competitive commercial landscape — where logistics companies, healthcare providers, and fintech startups all bid on high-intent keywords and cost discipline separates profitable campaigns from wasted spend.",
  },
  {
    title: "Meta Ads (Facebook & Instagram)",
    desc: "Audience targeting, creative production, and retargeting campaigns across Meta’s platforms — reaching Atlanta’s six-million-person metro with messaging tailored to both enterprise decision-makers and the city’s growing consumer market.",
  },
  {
    title: "LinkedIn Advertising",
    desc: "Sponsored content, InMail campaigns, and lead gen forms targeting Atlanta’s dense concentration of Fortune 500 executives, supply chain leaders, healthcare administrators, and fintech professionals.",
  },
  {
    title: "Landing Page Development",
    desc: "Dedicated landing pages designed for conversion — fast-loading, mobile-first, and aligned with your ad messaging to maximize quality scores and reduce cost per acquisition across Atlanta’s competitive verticals.",
  },
  {
    title: "Conversion Tracking & Attribution",
    desc: "Proper tracking setup across Google Analytics, ad platform pixels, and CRM integrations so every dollar of spend can be tied to a qualified lead or closed deal — essential for Atlanta’s enterprise sales cycles.",
  },
  {
    title: "Ongoing Campaign Optimization",
    desc: "Daily bid adjustments, search term analysis, negative keyword management, A/B creative testing, and budget reallocation based on what actually converts in the Atlanta market across logistics, healthcare, and professional services.",
  },
];

const reasons = [
  {
    title: "Structured for Atlanta’s enterprise and mid-market mix",
    desc: "Atlanta’s economy spans Fortune 500 headquarters, a massive logistics network anchored by Hartsfield-Jackson, and a rapidly expanding fintech and startup ecosystem. We structure PPC campaigns to match — enterprise lead gen for long sales cycles and high contract values alongside performance campaigns for growth-stage companies scaling fast.",
  },
  {
    title: "Cross-platform management under one roof",
    desc: "Google Ads, Meta Ads, and LinkedIn Ads share audience data and creative learnings when managed together. We run all three from a single strategy so your campaigns reinforce each other — critical in a metro where your competitors are spending aggressively across every platform.",
  },
  {
    title: "Real-time spend control in a high-competition metro",
    desc: "Atlanta’s healthcare, logistics, and professional services sectors drive high CPCs. We monitor campaigns daily and make bid, audience, and placement adjustments in real time — you will not find out about wasted spend at the end of the month.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Account Audit & Competitive Analysis",
    desc: "We review your existing ad accounts, analyze competitor ad strategies across the Atlanta metro, and identify keyword and audience opportunities with the strongest potential return in your specific sector.",
  },
  {
    step: "02",
    title: "Campaign Architecture",
    desc: "We build campaign structures designed for control — separating brand from non-brand, segmenting by buyer intent, and organizing ad groups so budget flows toward your highest-value opportunities in Atlanta’s competitive landscape.",
  },
  {
    step: "03",
    title: "Creative & Landing Pages",
    desc: "Ad copy, visual creative, and dedicated landing pages are built as a unit so messaging stays consistent from the first impression through conversion. Every element is designed to improve quality score and lower costs.",
  },
  {
    step: "04",
    title: "Launch, Monitor & Scale",
    desc: "Campaigns go live with controlled budgets. We scale based on performance data, running structured tests on bids, audiences, placements, and creative to find and double down on winning combinations in the Atlanta market.",
  },
];

const faqs = [
  {
    q: "Do you run PPC campaigns targeted specifically to the Atlanta metro?",
    a: "Yes. We build geo-targeted campaigns across Google Ads, Meta, and LinkedIn that focus spend on the Atlanta metro, from Buckhead and Midtown to the broader suburban ring, so budget is not wasted on traffic outside your service area.",
  },
  {
    q: "Can PPC campaigns be expanded beyond Atlanta to cover the Southeast region?",
    a: "Yes. For businesses with a regional footprint, we structure campaigns that scale from Atlanta out to the broader Southeast, adjusting targeting, budget, and messaging by market as needed.",
  },
  {
    q: "Do you advertise for film and entertainment businesses in Atlanta?",
    a: "Yes. Atlanta's production industry creates demand for advertising among vendors, service providers, and businesses that support film and entertainment work. We build paid campaigns tailored to that audience alongside our broader client base.",
  },
  {
    q: "How do you handle PPC for competitive B2B verticals in Atlanta?",
    a: "Atlanta's B2B sectors, including logistics, healthcare, and professional services, often have high cost-per-click and long sales cycles. We structure campaigns around buyer intent and lead quality rather than raw click volume, so spend is directed toward prospects likely to convert.",
  },
];

export default function AtlantaPPCAdsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "PPC and paid advertising agency for Atlanta businesses. Google Ads, Meta Ads, and LinkedIn campaign management for logistics, healthcare, fintech, and enterprise lead generation.",
    areaServed: { "@type": "City", name: "Atlanta" },
    url: "https://themarkitmedia.com/en/locations/united-states/atlanta/ppc-ads",
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
          { label: "PPC Ads" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Atlanta</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              PPC Ads Agency Serving Businesses in Atlanta
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Atlanta is a metro where Fortune 500 companies, fast-growing
              startups, and established mid-market firms all compete for the
              same digital attention. With Hartsfield-Jackson driving the
              world&apos;s largest logistics corridor, a healthcare sector
              anchored by institutions like the CDC and Emory, and a fintech
              ecosystem growing faster than most cities in the country &mdash;
              every dollar of ad spend needs to be precise.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media helps Atlanta businesses get more from paid
              advertising &mdash; tighter targeting, disciplined budget control,
              and campaigns structured around lead quality and cost per
              acquisition.
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
        aria-label="PPC services for Atlanta businesses"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>PPC Services for the Atlanta Market</SectionTitle>
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
        aria-label="Why Atlanta businesses choose Markit Media for PPC"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Atlanta Businesses Choose Markit Media for PPC
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
            <SectionTitle>How We Manage PPC for Atlanta Clients</SectionTitle>
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
              href="/locations/united-states/atlanta/marketing-agency"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Marketing Agency
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Full-service marketing strategy and execution for Atlanta.
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
            <SectionTitle>Frequently Asked Questions About PPC Ads in Atlanta</SectionTitle>
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
              Stop Wasting Ad Spend in Atlanta
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build PPC campaigns that turn Atlanta&apos;s expensive
              clicks into qualified leads and closed deals.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a Free PPC Audit &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
