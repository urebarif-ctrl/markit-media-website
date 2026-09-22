import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "PPC Ads Agency in Houston — Markit Media",
  description:
    "PPC and paid advertising agency for Houston businesses. Google Ads, Meta Ads, and LinkedIn campaigns built for energy, healthcare, real estate, and B2B lead generation.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/houston/ppc-ads",
  },
  openGraph: {
    title: "PPC Ads Agency in Houston — Markit Media",
    description:
      "PPC and paid advertising agency for Houston businesses. Google Ads, Meta Ads, and LinkedIn campaigns built for energy, healthcare, real estate, and B2B lead generation.",
  },
};

const serviceItems = [
  {
    title: "Google Ads Management",
    desc: "Search, Display, and YouTube campaigns built for Houston’s competitive B2B landscape — where energy-sector keywords command premium CPCs and bid precision separates profitable campaigns from wasted budgets.",
  },
  {
    title: "Meta Ads (Facebook & Instagram)",
    desc: "Audience targeting, creative production, and retargeting campaigns across Meta’s platforms — reaching Houston’s 7M+ metro population with messaging tailored to consumer and B2B buyer intent.",
  },
  {
    title: "LinkedIn Advertising",
    desc: "Sponsored content, InMail campaigns, and lead gen forms targeting Houston’s concentration of energy executives, healthcare administrators, and professional services decision-makers.",
  },
  {
    title: "Landing Page Development",
    desc: "Dedicated landing pages designed for conversion — fast-loading, mobile-first, and aligned with your ad messaging to maximize quality scores and reduce cost per acquisition.",
  },
  {
    title: "Conversion Tracking & Attribution",
    desc: "Proper tracking setup across Google Analytics, ad platform pixels, and CRM integrations so every dollar of spend can be tied to a qualified lead or closed deal.",
  },
  {
    title: "Ongoing Campaign Optimization",
    desc: "Daily bid adjustments, search term analysis, negative keyword management, A/B creative testing, and budget reallocation based on what actually converts in the Houston market.",
  },
];

const reasons = [
  {
    title: "Built for Houston’s high-value B2B verticals",
    desc: "Energy, healthcare, and professional services deals in Houston are worth tens of thousands to millions of dollars each. We structure PPC campaigns for lead quality over lead volume — targeting the job titles, companies, and search intent that produce pipeline, not just form fills.",
  },
  {
    title: "Cross-platform management under one roof",
    desc: "Google Ads, Meta Ads, and LinkedIn Ads share audience data and creative learnings when managed together. We run all three from a single strategy so your campaigns reinforce each other rather than compete for the same budget.",
  },
  {
    title: "Real-time spend control in expensive markets",
    desc: "Houston’s energy and medical sectors drive some of the highest CPCs in B2B advertising. We monitor campaigns daily and make bid, audience, and placement adjustments in real time — you won’t find out about wasted spend at the end of the month.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Account Audit & Competitive Analysis",
    desc: "We review your existing ad accounts (if any), analyze competitor ad strategies in the Houston market, and identify keyword and audience opportunities with the strongest potential return.",
  },
  {
    step: "02",
    title: "Campaign Architecture",
    desc: "We build campaign structures designed for control — separating brand from non-brand, segmenting by buyer intent, and organizing ad groups so budget flows toward your highest-value opportunities in Houston.",
  },
  {
    step: "03",
    title: "Creative & Landing Pages",
    desc: "Ad copy, visual creative, and dedicated landing pages are built as a unit so messaging stays consistent from the first impression through conversion. Every element is designed to improve quality score and lower costs.",
  },
  {
    step: "04",
    title: "Launch, Monitor & Scale",
    desc: "Campaigns go live with controlled budgets. We scale based on performance data, running structured tests on bids, audiences, placements, and creative to find and double down on winning combinations.",
  },
];

const faqs = [
  {
    q: "Do you run PPC campaigns for Houston's energy and medical sector companies?",
    a: "Yes. We build search and social campaigns for both energy/oil & gas companies and medical practices, accounting for the specialized keywords, compliance considerations, and longer decision cycles common in these verticals.",
  },
  {
    q: "Can Markit Media handle B2B PPC for Houston companies?",
    a: "Yes. B2B PPC in Houston typically means targeting specific job titles and industries with longer sales cycles. We structure campaigns around lead quality and qualified pipeline rather than raw click volume.",
  },
  {
    q: "How do you target across Houston's spread-out metro area?",
    a: "Houston's metro sprawls across a wide geography, from the inner loop to suburbs like Sugar Land, Katy, and The Woodlands. We use geo-targeting and location-based bid adjustments so campaigns reach the specific areas where your customers actually are.",
  },
  {
    q: "Is PPC more expensive in Houston than in coastal markets?",
    a: "Cost per click in Houston varies by industry and competition level, much like any major metro. We monitor bids and budgets closely so spend is allocated toward the keywords and audiences most likely to convert, regardless of how Houston compares to other markets.",
  },
];

export default function HoustonPPCAdsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "PPC and paid advertising agency for Houston businesses. Google Ads, Meta Ads, and LinkedIn campaign management for energy, healthcare, real estate, and B2B lead generation.",
    areaServed: { "@type": "City", name: "Houston" },
    url: "https://themarkitmedia.com/en/locations/united-states/houston/ppc-ads",
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
          { label: "Houston", href: "/locations/united-states/houston" },
          { label: "PPC Ads" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Houston" className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Houston</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              PPC Ads Agency Serving Businesses in Houston
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Houston&apos;s B2B market is one of the most competitive in the
              country. Energy companies, healthcare providers, and professional
              services firms are all bidding on the same high-intent keywords
              &mdash; which means every dollar of ad spend needs to work harder
              to deliver qualified leads, not just clicks.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media helps Houston businesses get more from paid
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
        aria-label="PPC services for Houston businesses"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>PPC Services for the Houston Market</SectionTitle>
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
        aria-label="Why Houston businesses choose Markit Media for PPC"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Houston Businesses Choose Markit Media for PPC
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
            <SectionTitle>How We Manage PPC for Houston Clients</SectionTitle>
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
              href="/locations/united-states/houston"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                All Houston Services
              </h3>
              <p className="text-base text-gray-500 mt-2">
                View every service we offer to Houston businesses.
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
            <SectionTitle>Frequently Asked Questions About PPC Ads in Houston</SectionTitle>
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
              Stop Wasting Ad Spend in Houston
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build PPC campaigns that turn Houston&apos;s expensive
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
