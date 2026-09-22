import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "PPC Ads Agency in Seattle — Markit Media",
  description:
    "PPC and paid advertising agency for Seattle businesses. Google Ads, Meta Ads, and LinkedIn campaigns built for cloud technology, aerospace, SaaS, clean energy, and B2B lead generation.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/seattle/ppc-ads",
  },
  openGraph: {
    title: "PPC Ads Agency in Seattle — Markit Media",
    description:
      "PPC and paid advertising agency for Seattle businesses. Google Ads, Meta Ads, and LinkedIn campaigns built for cloud technology, aerospace, SaaS, clean energy, and B2B lead generation.",
  },
};

const serviceItems = [
  {
    title: "Google Ads Management",
    desc: "Search, Display, and YouTube campaigns built for Seattle’s competitive commercial landscape — where cloud providers, SaaS companies, and aerospace firms all bid on high-intent keywords and cost discipline separates profitable campaigns from wasted spend.",
  },
  {
    title: "Meta Ads (Facebook & Instagram)",
    desc: "Audience targeting, creative production, and retargeting campaigns across Meta’s platforms — reaching Seattle’s four-million-person metro with messaging tailored to tech professionals, outdoor lifestyle consumers, and Pacific Northwest retail audiences.",
  },
  {
    title: "LinkedIn Advertising",
    desc: "Sponsored Content, InMail, and lead gen forms targeted at Seattle’s dense concentration of tech executives, engineering leaders, and enterprise buyers — where LinkedIn is the primary channel for B2B pipeline generation.",
  },
  {
    title: "Remarketing & Retargeting",
    desc: "Cross-platform retargeting campaigns that re-engage visitors who explored your site but did not convert — critical in Seattle’s long B2B sales cycles where enterprise deals often require multiple touchpoints before a buying decision.",
  },
  {
    title: "Landing Page Optimization",
    desc: "Conversion-focused landing pages designed to match ad intent and reduce cost per acquisition — built for Seattle’s tech-savvy audience that expects fast load times, clear value propositions, and frictionless user experiences.",
  },
  {
    title: "Campaign Analytics & Reporting",
    desc: "Custom dashboards tracking impressions, clicks, conversions, cost per lead, and return on ad spend — structured so Seattle businesses can see exactly which campaigns drive pipeline and which need adjustment.",
  },
];

const reasons = [
  {
    title: "Engineered for Seattle’s high-cost ad market",
    desc: "Seattle is one of the most expensive paid media markets in the United States. Tech giants, well-funded startups, and established enterprises all compete for the same keywords and audiences. We build campaigns designed to win in this environment — with tight targeting, disciplined bidding, and creative that earns clicks without overspending.",
  },
  {
    title: "B2B expertise for the tech corridor",
    desc: "Seattle’s economy is anchored by cloud computing, enterprise software, and B2B services. We understand the longer sales cycles, multi-stakeholder buying committees, and technical buyer personas that define paid media in this market — and structure campaigns accordingly.",
  },
  {
    title: "Multi-platform campaigns under one strategy",
    desc: "Google Ads, Meta, and LinkedIn each serve a different role in Seattle’s buyer journey. We manage all three under a unified strategy so messaging stays consistent, budgets flow toward what converts, and no channel operates in a silo.",
  },
  {
    title: "Transparent reporting tied to revenue",
    desc: "We report on pipeline and revenue, not impressions and clicks. Seattle businesses expect data-driven accountability, and we structure every campaign with clear attribution from first touch to closed deal.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Account Audit & Opportunity Analysis",
    desc: "We review your existing ad accounts, analyze competitor activity in the Seattle market, and identify the highest-ROI opportunities across Google, Meta, and LinkedIn — including keyword gaps, audience segments, and budget reallocation options.",
  },
  {
    step: "02",
    title: "Campaign Architecture & Creative",
    desc: "We build campaign structures designed for Seattle’s competitive landscape — with tightly themed ad groups, intent-matched landing pages, and creative assets tailored to the tech-forward audience that defines the Puget Sound region.",
  },
  {
    step: "03",
    title: "Launch & Active Management",
    desc: "We launch campaigns with controlled budgets and daily monitoring, adjusting bids, pausing underperformers, and scaling what works — maintaining the discipline required to compete profitably in one of the most expensive ad markets in the country.",
  },
  {
    step: "04",
    title: "Optimization & Scaling",
    desc: "We run structured A/B tests on ad copy, creative, audiences, and landing pages — continuously improving conversion rates and cost efficiency while scaling winning campaigns to capture more of Seattle’s addressable market.",
  },
];

export default function SeattlePpcAdsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "PPC and paid advertising agency for Seattle businesses. Google Ads, Meta Ads, and LinkedIn campaigns for cloud technology, aerospace, SaaS, and B2B lead generation.",
    areaServed: { "@type": "City", name: "Seattle" },
    url: "https://themarkitmedia.com/en/locations/united-states/seattle/ppc-ads",
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
          { label: "PPC Ads" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Seattle</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              PPC Ads Agency for Seattle Businesses
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Seattle&apos;s ad market is among the most expensive in the
              country &mdash; driven by competition from major tech companies,
              well-funded SaaS startups, and established enterprise vendors all
              bidding for the same audiences. Winning in paid media here
              requires precision targeting, disciplined budget management, and
              creative that cuts through a crowded digital landscape.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media manages PPC campaigns across Google Ads, Meta, and
              LinkedIn for Seattle businesses &mdash; structured to generate
              qualified leads and measurable ROI in one of the most competitive
              paid media environments in the United States.
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
        aria-label="PPC services for Seattle businesses"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>PPC Advertising for Seattle</SectionTitle>
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
        aria-label="Why Seattle businesses choose Markit Media for PPC"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Seattle Businesses Choose Markit Media for PPC
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
        aria-label="Our PPC process"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Process</SectionLabel>
            <SectionTitle>How We Run PPC for Seattle Clients</SectionTitle>
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
              href="/locations/united-states/seattle/website-development"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Website Development
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Fast, conversion-focused websites for Seattle businesses.
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
              Ready to Win Paid Media in Seattle?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build PPC campaigns that drive qualified leads and
              measurable ROI in the Pacific Northwest&apos;s most competitive
              ad market.
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
