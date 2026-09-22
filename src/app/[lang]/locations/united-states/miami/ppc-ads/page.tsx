import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "PPC Ads Agency in Miami — Markit Media",
  description:
    "PPC and paid advertising management for businesses in Miami. Google Ads, Meta Ads, and bilingual ad campaigns built for South Florida's tourism, real estate, and hospitality markets.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/miami/ppc-ads",
  },
  openGraph: {
    title: "PPC Ads Agency in Miami — Markit Media",
    description:
      "PPC and paid advertising management for businesses in Miami. Bilingual Google Ads, Meta Ads, and multi-platform campaigns for South Florida's competitive verticals.",
  },
};

const serviceItems = [
  {
    title: "Google Ads Management",
    desc: "Search, Shopping, Display, and YouTube campaigns targeting high-intent keywords in the Miami market. We build bilingual account structures with separate English and Spanish campaigns, geo-targeting for Miami-Dade neighborhoods, and bid strategies tuned to South Florida's seasonal demand cycles.",
  },
  {
    title: "Meta Ads (Facebook & Instagram)",
    desc: "Full-funnel campaign management across Meta platforms — prospecting, retargeting, and conversion campaigns built for Miami's visually driven, mobile-first audience. Separate creative sets for English and Spanish speakers with culturally adapted messaging and imagery.",
  },
  {
    title: "LinkedIn Advertising",
    desc: "Sponsored content, InMail, and lead gen campaigns targeting decision-makers in Miami's finance, real estate, legal, and international trade sectors. LinkedIn is where Miami's business community connects with Latin American partners and investors.",
  },
  {
    title: "Landing Page Development",
    desc: "Dedicated bilingual landing pages built to convert the traffic your ads generate. We design and develop pages optimized for Miami's specific audience segments — tourists searching on mobile, real estate buyers comparing listings, and local consumers comparing service providers.",
  },
  {
    title: "Conversion Tracking & Attribution",
    desc: "Proper tracking infrastructure so every lead, call, and sale is attributed to the campaign that generated it. We configure Google Analytics, call tracking, and platform-specific conversion events to show exactly how your ad spend translates to revenue in the Miami market.",
  },
  {
    title: "Ongoing Optimization",
    desc: "Weekly bid adjustments, creative testing, audience refinement, and budget reallocation based on live performance data. Miami's market shifts with tourism seasons, event calendars, and economic cycles — your campaigns need active management to keep pace.",
  },
];

const reasons = [
  {
    title: "Bilingual ad campaign expertise",
    desc: "Over 70% of Miami-Dade residents speak Spanish at home. Running a single English-language campaign means missing most of the market. We build separate English and Spanish ad sets with independent keyword research, creative direction, and bidding strategies — because each audience converts differently and deserves its own optimization path.",
  },
  {
    title: "Tourism seasonal campaign management",
    desc: "Miami's tourism peaks drive massive shifts in search volume and ad costs throughout the year. We manage budget pacing and bid strategies that scale up during high-season months and pull back during quieter periods — so your spend matches demand instead of bleeding through flat monthly budgets.",
  },
  {
    title: "Real estate and high-value lead gen",
    desc: "Miami's real estate market attracts domestic and international buyers searching for luxury condos, waterfront properties, and investment opportunities. We structure PPC campaigns around high-intent buyer keywords, build retargeting sequences for long consideration cycles, and track leads through to closed deals.",
  },
  {
    title: "Transparent performance reporting",
    desc: "You see every dollar — where it went, what it returned, and why we're recommending changes. Reports break out performance by language, geography, and campaign type so you understand exactly which segments are generating ROI in the Miami market.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Account Audit & Market Research",
    desc: "We review your existing ad accounts (or build them from scratch), analyze competitor ad activity in the Miami market, and identify the highest-opportunity keywords, audiences, and platforms for your business — including bilingual search volume analysis.",
  },
  {
    step: "02",
    title: "Campaign Architecture & Creative",
    desc: "We build campaign structures designed for Miami's dual-language market — separate ad groups for English and Spanish, geo-targeting by neighborhood and tourist zones, and multiple creative variations for testing from day one across each language segment.",
  },
  {
    step: "03",
    title: "Launch & Active Management",
    desc: "Campaigns go live with daily monitoring. We adjust bids based on time-of-day performance, pause underperformers, scale winners, and rotate creative on a continuous cycle. Seasonal budget shifts are planned in advance and executed proactively.",
  },
  {
    step: "04",
    title: "Performance Reporting & Scaling",
    desc: "Weekly check-ins and monthly deep-dive reports show what's working, what we changed, and where we see opportunity to scale. All recommendations tie back to your CPA and ROAS targets — segmented by language and campaign type for full visibility.",
  },
];

const faqs = [
  {
    q: "Do you run bilingual PPC campaigns for Miami businesses?",
    a: "Yes. We build separate English and Spanish ad sets with independent keyword research, creative, and bid strategies, since each audience converts differently.",
  },
  {
    q: "Can you run ad campaigns for tourism and hospitality businesses?",
    a: "Yes. We manage budget pacing and bid strategies that scale with Miami's tourism seasons, and build geo-targeted campaigns aimed at visitors already in South Florida.",
  },
  {
    q: "Do you handle PPC for Miami real estate?",
    a: "Yes. We structure campaigns around high-intent buyer keywords, build retargeting sequences for long consideration cycles, and track leads through to closed deals for condo, waterfront, and investment properties.",
  },
  {
    q: "Do you target both Miami-Dade and Broward County?",
    a: "Yes. We build geo-targeted campaigns by neighborhood and county, so your ads reach the areas where your customers actually are, whether that's Miami-Dade, Broward, or both.",
  },
];

export default function MiamiPPCAdsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "PPC and paid advertising management for businesses in Miami. Bilingual Google Ads, Meta Ads, and multi-platform campaign management for South Florida.",
    areaServed: { "@type": "City", name: "Miami" },
    url: "https://themarkitmedia.com/en/locations/united-states/miami/ppc-ads",
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
          {
            label: "Miami",
            href: "/locations/united-states/miami",
          },
          { label: "PPC Ads" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Miami</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              PPC Ads Agency Serving Businesses in Miami
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Paid advertising in Miami means navigating a bilingual market
              where tourism seasonality, real estate competition, and Latin
              American buyer intent all shape how campaigns need to be
              structured. A single-language, flat-budget approach leaves
              revenue on the table every month.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              We manage PPC campaigns built for the way Miami actually works —
              separate English and Spanish ad sets, seasonal budget pacing
              aligned to tourism peaks, geo-targeting for visitor-heavy zones,
              and conversion tracking that ties every dollar of ad spend to
              measurable business outcomes.
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
        aria-label="PPC services for Miami"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>
              Paid Advertising Services for the Miami Market
            </SectionTitle>
            <p className="text-base text-gray-500 leading-relaxed mt-4 max-w-2xl">
              We manage the full paid media lifecycle — from bilingual account
              setup and audience research through creative production, campaign
              management, and performance reporting. Every service below can be
              deployed individually or as part of a broader PPC program.
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

      {/* Why Miami Businesses Choose Markit Media for PPC */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why Miami businesses choose Markit Media for PPC"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Miami Businesses Choose Markit Media for PPC
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
              How We Run PPC for Miami Businesses
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10"
          >
            <Link
              href="/services/performance-marketing"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <span className="text-base font-bold text-black">
                Performance Marketing
              </span>
              <p className="text-base text-gray-500 mt-1">
                Full performance marketing strategy and management.
              </p>
            </Link>
            <Link
              href="/services/performance-marketing/google-ads"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <span className="text-base font-bold text-black">
                Google Ads
              </span>
              <p className="text-base text-gray-500 mt-1">
                Search, Shopping, Display, and YouTube campaigns.
              </p>
            </Link>
            <Link
              href="/services/performance-marketing/meta-ads"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <span className="text-base font-bold text-black">Meta Ads</span>
              <p className="text-base text-gray-500 mt-1">
                Facebook and Instagram advertising.
              </p>
            </Link>
            <Link
              href="/locations/united-states/miami"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <span className="text-base font-bold text-black">
                All Miami Services
              </span>
              <p className="text-base text-gray-500 mt-1">
                View all services available in Miami.
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
            <SectionTitle>Frequently Asked Questions About PPC Ads in Miami</SectionTitle>
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
              Stop Wasting Ad Spend in Miami
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s audit your current PPC campaigns and show you where
              bilingual targeting, seasonal pacing, and proper attribution can
              turn your ad budget into real revenue.
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
