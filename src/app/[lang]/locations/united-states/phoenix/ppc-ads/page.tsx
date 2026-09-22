import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "PPC Ads Agency in Phoenix — Markit Media",
  description:
    "PPC and paid advertising management for businesses in Phoenix. Google Ads, Meta Ads, and multi-platform campaigns built for real estate, healthcare, solar energy, and the fast-growing Arizona market.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/phoenix/ppc-ads",
  },
  openGraph: {
    title: "PPC Ads Agency in Phoenix — Markit Media",
    description:
      "PPC and paid advertising management for Phoenix businesses. Google Ads, Meta Ads, and multi-platform campaigns for Arizona's booming metro economy.",
  },
};

const serviceItems = [
  {
    title: "Google Ads Management",
    desc: "Search, Shopping, Display, and YouTube campaigns targeting high-intent keywords in the Phoenix metro. We build account structures with geo-targeting for the Valley's distinct submarkets — Scottsdale, Tempe, Mesa, Chandler, Gilbert — and bid strategies aligned to seasonal demand shifts driven by snowbird traffic and summer slowdowns.",
  },
  {
    title: "Meta Ads (Facebook & Instagram)",
    desc: "Full-funnel campaign management across Meta platforms — prospecting, retargeting, and conversion campaigns for Phoenix's fast-growing consumer market. We build separate audience segments for new residents, established homeowners, and the seasonal winter population that drives demand spikes in real estate, hospitality, and healthcare.",
  },
  {
    title: "LinkedIn Advertising",
    desc: "Sponsored content, InMail, and lead gen campaigns targeting decision-makers in Phoenix's expanding tech, semiconductor, financial services, and healthcare sectors. LinkedIn is where B2B relationships start in the Valley's corporate corridor.",
  },
  {
    title: "Landing Page Development",
    desc: "Dedicated landing pages built to convert the traffic your ads generate. We design and develop pages optimized for Phoenix's key audience segments — homebuyers comparing new developments, patients searching for healthcare providers, and business owners evaluating service partners across the metro.",
  },
  {
    title: "Conversion Tracking & Attribution",
    desc: "Proper tracking infrastructure so every lead, call, and sale is attributed to the campaign that generated it. We configure Google Analytics, call tracking, and platform-specific conversion events to show exactly how your ad spend translates to revenue in the Phoenix market.",
  },
  {
    title: "Ongoing Optimization",
    desc: "Weekly bid adjustments, creative testing, audience refinement, and budget reallocation based on live performance data. Phoenix's market shifts with seasonal population changes, new construction cycles, and the rapid pace of corporate expansion — your campaigns need active management to keep pace.",
  },
];

const reasons = [
  {
    title: "Built for Phoenix's high-growth verticals",
    desc: "Real estate, healthcare, solar energy, semiconductor manufacturing, and financial services are all expanding rapidly across the Valley. We structure PPC campaigns around the specific conversion paths, competition levels, and seasonal patterns that define paid advertising in each of these Phoenix industries.",
  },
  {
    title: "Seasonal budget management",
    desc: "Phoenix's market fluctuates with snowbird arrivals in winter, summer heat-driven slowdowns in certain sectors, and construction cycles tied to the housing market. We manage budget pacing and bid strategies that scale with demand instead of running flat monthly budgets that waste spend during low-intent periods.",
  },
  {
    title: "Bilingual audience targeting",
    desc: "Over 30% of the Phoenix metro is Hispanic or Latino. Running English-only campaigns means missing a significant portion of the market. We build separate English and Spanish ad sets with independent keyword research and creative direction where your audience data shows bilingual targeting will improve returns.",
  },
  {
    title: "Transparent performance reporting",
    desc: "You see every dollar — where it went, what it returned, and why we are recommending changes. Reports break out performance by geography, campaign type, and audience segment so you understand exactly which parts of your PPC program are generating ROI in the Phoenix market.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Account Audit & Market Research",
    desc: "We review your existing ad accounts (or build them from scratch), analyze competitor ad activity in the Phoenix market, and identify the highest-opportunity keywords, audiences, and platforms for your business — including geographic and seasonal demand analysis across the Valley.",
  },
  {
    step: "02",
    title: "Campaign Architecture & Creative",
    desc: "We build campaign structures designed for Phoenix's sprawling metro — geo-targeting by city and submarket, audience segmentation for seasonal residents versus permanent population, and multiple creative variations for testing from day one across each geographic and demographic segment.",
  },
  {
    step: "03",
    title: "Launch & Active Management",
    desc: "Campaigns go live with daily monitoring. We adjust bids based on time-of-day performance, pause underperformers, scale winners, and rotate creative on a continuous cycle. Seasonal budget shifts are planned in advance and executed proactively as Phoenix's market demand fluctuates.",
  },
  {
    step: "04",
    title: "Performance Reporting & Scaling",
    desc: "Weekly check-ins and monthly deep-dive reports show what is working, what we changed, and where we see opportunity to scale. All recommendations tie back to your CPA and ROAS targets — segmented by geography and campaign type for full visibility into your Phoenix PPC performance.",
  },
];

export default function PhoenixPpcAdsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "PPC and paid advertising management for businesses in Phoenix. Google Ads, Meta Ads, and multi-platform campaign management for Arizona's fastest-growing metro.",
    areaServed: { "@type": "City", name: "Phoenix" },
    url: "https://themarkitmedia.com/en/locations/united-states/phoenix/ppc-ads",
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
            label: "Phoenix",
            href: "/locations/united-states/phoenix",
          },
          { label: "PPC Ads" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Phoenix, Arizona</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              PPC Ads Agency Serving Businesses in Phoenix
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Paid advertising in Phoenix means navigating a fast-growing
              metro where real estate, healthcare, solar energy, and
              semiconductor industries are all competing for the same
              audience attention. A one-size-fits-all approach to PPC leaves
              money on the table every month in a market this dynamic.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              We manage PPC campaigns built for how Phoenix actually works —
              geo-targeting across the Valley&apos;s distinct submarkets,
              seasonal budget pacing for snowbird demand cycles, bilingual
              ad sets where the audience data supports it, and conversion
              tracking that ties every dollar of ad spend to measurable
              business outcomes.
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
        aria-label="PPC services for Phoenix"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>
              Paid Advertising Services for the Phoenix Market
            </SectionTitle>
            <p className="text-base text-gray-500 leading-relaxed mt-4 max-w-2xl">
              We manage the full paid media lifecycle — from account setup
              and audience research through creative production, campaign
              management, and performance reporting. Every service below can
              be deployed individually or as part of a broader PPC program
              across the Phoenix metro.
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

      {/* Why Phoenix Businesses Choose Markit Media for PPC */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why Phoenix businesses choose Markit Media for PPC"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Phoenix Businesses Choose Markit Media for PPC
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
            <SectionTitle>
              How We Run PPC for Phoenix Businesses
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
            <SectionTitle>Related Services in Phoenix</SectionTitle>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10"
          >
            <Link
              href="/locations/united-states/phoenix/marketing-agency"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <span className="text-base font-bold text-black">
                Marketing Agency
              </span>
              <p className="text-base text-gray-500 mt-1">
                Full-service marketing for Phoenix businesses.
              </p>
            </Link>
            <Link
              href="/locations/united-states/phoenix/seo-services"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <span className="text-base font-bold text-black">
                SEO Services
              </span>
              <p className="text-base text-gray-500 mt-1">
                Technical, local, and content SEO for Phoenix.
              </p>
            </Link>
            <Link
              href="/locations/united-states/phoenix/website-development"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <span className="text-base font-bold text-black">
                Website Development
              </span>
              <p className="text-base text-gray-500 mt-1">
                WordPress, Shopify, and Next.js builds.
              </p>
            </Link>
            <Link
              href="/locations/united-states/phoenix"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <span className="text-base font-bold text-black">
                All Phoenix Services
              </span>
              <p className="text-base text-gray-500 mt-1">
                View all services available in Phoenix.
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
              Stop Wasting Ad Spend in Phoenix
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s audit your current PPC campaigns and show you
              where geo-targeting, seasonal pacing, and proper attribution
              can turn your ad budget into real revenue across the Valley.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Get a Free PPC Audit &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
