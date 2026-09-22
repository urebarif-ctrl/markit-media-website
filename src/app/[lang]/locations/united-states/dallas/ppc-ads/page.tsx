import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "PPC Ads Agency in Dallas — Markit Media",
  description:
    "PPC and paid advertising agency for Dallas businesses. Google Ads, Meta Ads, and LinkedIn campaigns built for the DFW metroplex — targeting telecom, corporate, defense, fintech, and real estate sectors.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/dallas/ppc-ads",
  },
  openGraph: {
    title: "PPC Ads Agency in Dallas — Markit Media",
    description:
      "PPC and paid advertising agency for Dallas businesses. Google Ads, Meta Ads, and LinkedIn campaigns built for the DFW metroplex — targeting telecom, corporate, defense, fintech, and real estate sectors.",
  },
};

const serviceItems = [
  {
    title: "Google Ads Management",
    desc: "Search, Display, and YouTube campaigns built for the DFW market — where corporate relocations have intensified competition across B2B keywords and bid strategy separates profitable campaigns from budget waste.",
  },
  {
    title: "Meta Ads (Facebook & Instagram)",
    desc: "Audience targeting, creative production, and retargeting campaigns across Meta's platforms — reaching the DFW metroplex's 8 million residents with messaging tailored to consumer segments and B2B buyer intent.",
  },
  {
    title: "LinkedIn Advertising",
    desc: "Sponsored content, InMail campaigns, and lead gen forms targeting the concentration of corporate executives, defense contractors, and fintech leaders that have made Dallas a national hub for headquarters relocations.",
  },
  {
    title: "Landing Page Development",
    desc: "Dedicated landing pages designed for conversion — fast-loading, mobile-first, and aligned with your ad messaging to maximize quality scores and reduce cost per acquisition across Dallas's competitive verticals.",
  },
  {
    title: "Conversion Tracking & Attribution",
    desc: "Proper tracking setup across Google Analytics, ad platform pixels, and CRM integrations so every dollar of spend can be tied to a qualified lead or closed deal — critical in a market where B2B deal sizes justify serious ad investment.",
  },
  {
    title: "Ongoing Campaign Optimization",
    desc: "Daily bid adjustments, search term analysis, negative keyword management, A/B creative testing, and budget reallocation based on what actually converts in the DFW market — not national benchmarks.",
  },
];

const reasons = [
  {
    title: "Built for Dallas's corporate and growth-sector economy",
    desc: "The DFW metroplex hosts more corporate headquarters than almost any other U.S. metro, plus a fast-growing fintech and defense sector. We structure PPC campaigns for the high-value B2B deals these industries produce — targeting the job titles, companies, and search intent that generate pipeline, not just form fills.",
  },
  {
    title: "Cross-platform management under one roof",
    desc: "Google Ads, Meta Ads, and LinkedIn Ads share audience data and creative learnings when managed together. We run all three from a single strategy so your campaigns reinforce each other rather than compete for the same budget in a market where CPCs are rising fast.",
  },
  {
    title: "Real-time spend control in a competitive metro",
    desc: "As more companies relocate to Dallas, competition for digital ad inventory intensifies. We monitor campaigns daily and make bid, audience, and placement adjustments in real time — you won't find out about wasted spend at the end of the month.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Account Audit & Competitive Analysis",
    desc: "We review your existing ad accounts (if any), analyze competitor ad strategies in the Dallas-Fort Worth market, and identify keyword and audience opportunities with the strongest potential return across your industry.",
  },
  {
    step: "02",
    title: "Campaign Architecture",
    desc: "We build campaign structures designed for control — separating brand from non-brand, segmenting by buyer intent, and organizing ad groups so budget flows toward your highest-value opportunities in the DFW metroplex.",
  },
  {
    step: "03",
    title: "Creative & Landing Pages",
    desc: "Ad copy, visual creative, and dedicated landing pages are built as a unit so messaging stays consistent from the first impression through conversion. Every element is designed to improve quality score and lower costs in Dallas's competitive auction environment.",
  },
  {
    step: "04",
    title: "Launch, Monitor & Scale",
    desc: "Campaigns go live with controlled budgets. We scale based on performance data, running structured tests on bids, audiences, placements, and creative to find and double down on winning combinations across the DFW market.",
  },
];

const faqItems = [
  {
    q: "Do your PPC campaigns target the whole DFW metro or just Dallas city limits?",
    a: "We structure campaigns to target the DFW metro as a whole, or narrow to specific Dallas neighborhoods and suburbs when that better fits your goals, since customers throughout the metroplex convert.",
  },
  {
    q: "Do you run PPC campaigns for real estate businesses in Dallas?",
    a: "Yes. We build campaigns for real estate businesses around buyer and renter search intent, with landing pages and messaging tailored to specific Dallas neighborhoods and property types.",
  },
  {
    q: "How is advertising to a Texas audience different from advertising in coastal markets?",
    a: "Ad costs in Texas markets like Dallas often stretch further than in dense coastal metros, though competition still varies significantly by industry and keyword set. We build budgets and bid strategy around the specific competitive dynamics of DFW rather than assumptions carried over from other markets.",
  },
  {
    q: "What platforms do you manage PPC campaigns on for Texas businesses?",
    a: "We manage Google Ads, Meta Ads, and LinkedIn Ads, and structure campaigns to reflect how DFW businesses and consumers actually search and browse, rather than running the same setup across every market.",
  },
];

export default function DallasPPCAdsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "PPC and paid advertising agency for Dallas businesses. Google Ads, Meta Ads, and LinkedIn campaign management for the DFW metroplex.",
    areaServed: { "@type": "City", name: "Dallas" },
    url: "https://themarkitmedia.com/en/locations/united-states/dallas/ppc-ads",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
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
          { label: "Dallas", href: "/locations/united-states/dallas" },
          { label: "PPC Ads" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Dallas</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              PPC Ads Agency Serving Businesses in Dallas
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              The DFW metroplex is one of the fastest-growing ad markets in the
              country. Corporate headquarters relocations, a booming fintech
              sector, and a massive consumer economy mean more businesses are
              bidding on the same high-intent keywords &mdash; which makes
              precision targeting and disciplined budget management the
              difference between profitable campaigns and wasted spend.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media helps Dallas businesses get more from paid
              advertising &mdash; tighter targeting, real-time optimization, and
              campaigns structured around lead quality and cost per acquisition.
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
        aria-label="PPC services for Dallas businesses"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>PPC Services for the Dallas Market</SectionTitle>
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
        aria-label="Why Dallas businesses choose Markit Media for PPC"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Dallas Businesses Choose Markit Media for PPC
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
            <SectionTitle>How We Manage PPC for Dallas Clients</SectionTitle>
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
              href="/locations/united-states/dallas"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                All Dallas Services
              </h3>
              <p className="text-base text-gray-500 mt-2">
                View every service we offer to Dallas businesses.
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
            <SectionTitle>
              Frequently Asked Questions About PPC Advertising in Dallas
            </SectionTitle>
          </Animate>
          <div className="mt-10 space-y-6">
            {faqItems.map((faq, i) => (
              <Animate key={i} animation="fade-up" delay={i * 60}>
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black">
                    {faq.q}
                  </h3>
                  <p className="text-base text-gray-500 leading-relaxed mt-2">
                    {faq.a}
                  </p>
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
              Stop Wasting Ad Spend in Dallas
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build PPC campaigns that turn the DFW metroplex&apos;s
              competitive clicks into qualified leads and closed deals.
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
