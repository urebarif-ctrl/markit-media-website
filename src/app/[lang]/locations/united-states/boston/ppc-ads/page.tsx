import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "PPC Ads Agency in Boston — Markit Media",
  description:
    "PPC and paid advertising management for businesses in Boston. Google Ads, Meta Ads, and LinkedIn campaigns built for biotech, healthcare, fintech, and B2B services across Greater Boston.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/boston/ppc-ads",
  },
  openGraph: {
    title: "PPC Ads Agency in Boston — Markit Media",
    description:
      "PPC and paid advertising management for businesses in Boston. Google Ads, Meta Ads, and LinkedIn campaigns for Greater Boston's B2B and healthcare verticals.",
  },
};

const serviceItems = [
  {
    title: "Google Ads Management",
    desc: "Search, Display, and YouTube campaigns targeting high-intent keywords in the Boston market. We build account structures designed for Boston's expensive B2B verticals — biotech, healthcare, fintech, legal — where cost-per-click is high and every wasted impression erodes your budget.",
  },
  {
    title: "Meta Ads (Facebook & Instagram)",
    desc: "Full-funnel campaign management across Meta platforms — awareness, retargeting, and conversion campaigns for Boston businesses reaching both B2B decision-makers and local consumers. Audience targeting leverages job title, industry, and geographic data to reach prospects across Greater Boston.",
  },
  {
    title: "LinkedIn Advertising",
    desc: "Sponsored content, InMail, and lead gen campaigns targeting decision-makers in Boston's biotech, healthcare, enterprise tech, and financial services sectors. LinkedIn is where Boston's B2B buyers research vendors, evaluate partners, and engage with thought leadership before entering a sales process.",
  },
  {
    title: "Landing Page Development",
    desc: "Dedicated landing pages built to convert the traffic your ads generate. For Boston's B2B market, this means pages designed for complex buyer journeys — demo request flows, whitepaper gates, consultation bookings — with messaging calibrated to technically sophisticated audiences.",
  },
  {
    title: "Conversion Tracking & Attribution",
    desc: "Multi-touch attribution infrastructure so every lead, demo request, and closed deal is traced back to the campaign that influenced it. Boston's B2B sales cycles can span months — we build tracking that follows the full journey from first click to revenue.",
  },
  {
    title: "Ongoing Optimization",
    desc: "Weekly bid adjustments, creative testing, audience refinement, and budget reallocation based on live performance data. Boston's competitive ad market means CPCs shift with funding cycles, conference seasons, and quarterly budget resets — your campaigns need active management to maintain efficiency.",
  },
];

const reasons = [
  {
    title: "Built for Boston's high-CPC verticals",
    desc: "Biotech, healthcare, fintech, and legal are among the most expensive keyword categories in paid search. Running ads in these verticals without precise targeting and disciplined bid management burns through budget fast. We structure campaigns to maximize qualified lead volume while controlling cost per acquisition in Boston's premium ad market.",
  },
  {
    title: "LinkedIn expertise for B2B pipeline",
    desc: "Boston's economy is dominated by B2B industries where purchasing decisions involve multiple stakeholders and extended evaluation periods. LinkedIn is the primary platform for reaching these buyers. We run account-based campaigns that target specific companies, job titles, and seniority levels across the Kendall Square, Route 128, and Seaport corridors.",
  },
  {
    title: "Healthcare and biotech advertising compliance",
    desc: "Advertising in healthcare and life sciences requires careful attention to regulatory guidelines and platform policies. We build ad campaigns that communicate value within compliant frameworks — no misleading claims, proper disclaimers, and creative that passes platform review without sacrificing marketing effectiveness.",
  },
  {
    title: "Transparent spend and performance reporting",
    desc: "You see every dollar — where it went, what it returned, and why we are recommending changes. Reports break out performance by channel, campaign type, and audience segment so you understand exactly which efforts are generating pipeline and revenue in the Boston market.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Account Audit & Market Research",
    desc: "We review your existing ad accounts (or build them from scratch), analyze competitor ad activity in the Boston market, and identify the highest-opportunity keywords, audiences, and platforms for your business — including competitive CPC analysis across your specific verticals.",
  },
  {
    step: "02",
    title: "Campaign Architecture & Creative",
    desc: "We build campaign structures designed for Boston's B2B market — account-based targeting on LinkedIn, high-intent keyword groups on Google, and retargeting sequences across Meta. Ad creative and landing pages are developed for technically sophisticated audiences who expect substance over hype.",
  },
  {
    step: "03",
    title: "Launch & Active Management",
    desc: "Campaigns go live with daily monitoring. We adjust bids based on time-of-day and day-of-week performance, pause underperformers, scale winners, and rotate creative on a continuous cycle. Budget pacing accounts for quarterly spending patterns common in Boston's B2B sectors.",
  },
  {
    step: "04",
    title: "Performance Reporting & Scaling",
    desc: "Weekly check-ins and monthly deep-dive reports show what is working, what we changed, and where we see opportunity to scale. All recommendations tie back to your CPA and ROAS targets — segmented by platform, campaign type, and audience for full visibility.",
  },
];

export default function BostonPpcAdsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "PPC and paid advertising management for businesses in Boston. Google Ads, Meta Ads, and LinkedIn campaigns for biotech, healthcare, fintech, and B2B services.",
    areaServed: { "@type": "City", name: "Boston" },
    url: "https://themarkitmedia.com/en/locations/united-states/boston/ppc-ads",
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
            label: "Boston",
            href: "/locations/united-states/boston",
          },
          { label: "PPC Ads" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Boston</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              PPC Ads Agency Serving Businesses in Boston
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Paid advertising in Boston means competing in some of the most
              expensive keyword categories in the country. Biotech, healthcare,
              fintech, and enterprise technology firms are all bidding for the
              same high-intent searches — and a poorly structured campaign
              wastes budget faster here than in almost any other U.S. market.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              We manage PPC campaigns built for how Boston&apos;s market
              actually works — LinkedIn-first B2B targeting, high-intent Google
              Ads in premium verticals, Meta retargeting for long sales cycles,
              and conversion tracking that ties ad spend to qualified pipeline.
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
        aria-label="PPC services for Boston"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>
              Paid Advertising Services for the Boston Market
            </SectionTitle>
            <p className="text-base text-gray-500 leading-relaxed mt-4 max-w-2xl">
              We manage the full paid media lifecycle — from account setup and
              audience research through creative production, campaign
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

      {/* Why Boston Businesses Choose Markit Media for PPC */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why Boston businesses choose Markit Media for PPC"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Boston Businesses Choose Markit Media for PPC
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
              How We Run PPC for Boston Businesses
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
              href="/locations/united-states/boston/marketing-agency"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <span className="text-base font-bold text-black">
                Marketing Agency in Boston
              </span>
              <p className="text-base text-gray-500 mt-1">
                Full-service marketing strategy and execution.
              </p>
            </Link>
            <Link
              href="/locations/united-states/boston/seo-services"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <span className="text-base font-bold text-black">
                SEO Services in Boston
              </span>
              <p className="text-base text-gray-500 mt-1">
                Technical, local, and content SEO for Boston businesses.
              </p>
            </Link>
            <Link
              href="/locations/united-states/boston/website-development"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <span className="text-base font-bold text-black">
                Website Development in Boston
              </span>
              <p className="text-base text-gray-500 mt-1">
                WordPress, Shopify, and Next.js for Boston businesses.
              </p>
            </Link>
            <Link
              href="/locations/united-states/boston"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <span className="text-base font-bold text-black">
                All Boston Services
              </span>
              <p className="text-base text-gray-500 mt-1">
                View all services available in Boston.
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
              Stop Wasting Ad Spend in Boston&apos;s Premium Market
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s audit your current PPC campaigns and show you where
              better targeting, bid management, and attribution can turn your
              ad budget into qualified pipeline.
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
