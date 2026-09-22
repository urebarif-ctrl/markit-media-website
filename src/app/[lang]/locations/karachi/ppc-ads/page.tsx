import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "PPC Ads Agency in Karachi — Markit Media",
  description:
    "Results-driven PPC and paid advertising agency in Karachi. Google Ads, Meta Ads, YouTube campaigns, and data-backed optimization for measurable ROI.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/locations/karachi/ppc-ads",
  },
  openGraph: {
    title: "PPC Ads Agency in Karachi — Markit Media",
    description:
      "Results-driven PPC and paid advertising agency in Karachi. Google Ads, Meta Ads, YouTube campaigns, and data-backed optimization for measurable ROI.",
  },
};

const services = [
  {
    title: "Google Search Ads",
    desc: "Capture high-intent traffic the moment someone searches for your product or service. We build tightly themed ad groups, write compelling ad copy, and manage bids to keep your cost per acquisition within target across Karachi&apos;s competitive search landscape.",
  },
  {
    title: "Google Display & Shopping",
    desc: "Extend your reach beyond search with visually engaging display banners and product listing ads. We handle feed optimization, audience segmentation, and placement exclusions so your budget works harder across the Google network.",
  },
  {
    title: "Meta Ads (Facebook & Instagram)",
    desc: "Karachi has one of the highest concentrations of Facebook and Instagram users in Pakistan. We build full-funnel campaigns — awareness through conversion — using lookalike audiences, creative testing, and platform-native formats that stop the scroll.",
  },
  {
    title: "YouTube Advertising",
    desc: "Video consumption in Pakistan is growing rapidly, and YouTube is the dominant platform. We plan, target, and optimize in-stream and discovery ads to build brand awareness and drive traffic at a fraction of traditional media costs.",
  },
  {
    title: "Remarketing & Retargeting",
    desc: "Most visitors leave without converting on the first visit. We deploy cross-platform remarketing sequences that re-engage warm audiences through tailored messaging, keeping your brand top-of-mind and improving overall conversion rates.",
  },
  {
    title: "Landing Page Optimization",
    desc: "Paid traffic is only as good as the page it lands on. We audit and refine landing pages for load speed, message match, clear calls to action, and mobile responsiveness — because a faster, clearer page means a lower cost per lead.",
  },
];

const reasons = [
  {
    title: "Local CPC Expertise",
    desc: "Ad costs in Karachi vary significantly by industry and season. We track local cost-per-click benchmarks across verticals — from real estate and education to e-commerce and healthcare — so your bids reflect what the market actually demands, not generic national averages.",
  },
  {
    title: "Platform-Certified Team",
    desc: "Our team maintains active certifications across Google Ads and Meta Blueprint. This means we stay current on platform changes, new ad formats, and best practices — and you get campaigns built on up-to-date knowledge rather than outdated playbooks.",
  },
  {
    title: "Transparent Budget Management",
    desc: "You see exactly where every rupee goes. We provide clear breakdowns of ad spend versus management fees, share live dashboard access, and send regular reports that explain not just what happened but why — and what we plan to do next.",
  },
  {
    title: "Continuous Optimization",
    desc: "Launching a campaign is the starting point, not the finish line. We run structured A/B tests on ad copy, audiences, bidding strategies, and landing pages on a weekly cycle, compounding small improvements into significant performance gains over time.",
  },
];

const steps = [
  {
    num: "01",
    title: "Account Audit",
    desc: "We start by reviewing your existing ad accounts — campaign structure, keyword health, audience overlap, conversion tracking setup, and wasted spend. If you are starting from scratch, we conduct competitor and market research to establish baseline benchmarks for your industry in Karachi.",
  },
  {
    num: "02",
    title: "Campaign Architecture",
    desc: "Based on the audit findings, we design a campaign structure aligned with your goals. This includes keyword grouping, audience segmentation, budget allocation across platforms, ad copy drafts, and landing page recommendations — all documented before a single ad goes live.",
  },
  {
    num: "03",
    title: "Launch & Monitor",
    desc: "Campaigns go live with proper conversion tracking, UTM parameters, and automated alerts in place. During the initial phase we monitor performance closely, adjusting bids and pausing underperformers quickly to protect your budget while the algorithms learn.",
  },
  {
    num: "04",
    title: "Optimize & Scale",
    desc: "Once we identify winning combinations of audience, creative, and placement, we scale spend towards what works and cut what does not. Monthly strategy reviews ensure campaigns evolve with your business goals and market conditions rather than running on autopilot.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Markit Media",
  description:
    "PPC and paid advertising agency in Karachi specializing in Google Ads, Meta Ads, and data-driven campaign management.",
  areaServed: { "@type": "City", name: "Karachi" },
  url: "https://themarkitmedia.com/en/locations/karachi/ppc-ads",
};

export default function KarachiPpcAdsPage() {
  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb
        items={[
          { label: "Locations", href: "/locations" },
          { label: "Karachi", href: "/locations/karachi" },
          { label: "PPC Ads" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Karachi — Paid Advertising" className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Karachi — Paid Advertising</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              PPC Ads Agency in Karachi
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Karachi&apos;s digital advertising market is growing fast — and
              getting more expensive. With rising CPCs across Google and Meta,
              the margin between a profitable campaign and a money pit comes down
              to how well your ads are structured, targeted, and optimized. We
              manage paid campaigns for businesses across the city, turning ad
              spend into measurable revenue.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Whether you&apos;re running lead generation for a service business
              or scaling an e-commerce store, our approach is the same:
              data-first strategy, disciplined execution, and relentless
              optimization until the numbers work.
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
              <Link
                href="/services/performance-marketing"
                className="inline-flex items-center gap-3 border-2 border-black text-black px-10 py-5 font-bold text-base hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Our Performance Services
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* Services Grid */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="PPC services in Karachi"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Run</SectionLabel>
            <SectionTitle>Paid Advertising Services</SectionTitle>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              We manage campaigns across every major paid channel. Each service
              is built around Karachi&apos;s market dynamics — local search
              behavior, platform usage patterns, and industry-specific cost
              benchmarks.
            </p>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {services.map((svc) => (
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
        aria-label="Why businesses trust Markit Media for PPC"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Karachi Businesses Trust Us for PPC
            </SectionTitle>
            <p className="text-lg text-gray-500 leading-relaxed mt-4">
              Running ads is easy. Running ads that consistently return more than
              they cost is not. Here is what sets our PPC management apart from
              the dozens of agencies operating in Karachi.
            </p>
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
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Process</SectionLabel>
            <SectionTitle>How We Build and Manage Campaigns</SectionTitle>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Every engagement follows the same structured process. No shortcuts,
              no guesswork — just a repeatable system that produces consistent
              results for Karachi businesses across industries.
            </p>
          </Animate>
          <Stagger
            stagger={80}
            animation="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
          >
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-white border border-gray-200 p-8"
              >
                <span className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-black">
                  {step.num}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mt-3 mb-2">
                  {step.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Internal Links */}
      <section className="px-6 lg:px-12 py-16" aria-label="Related pages">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Explore More</SectionLabel>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/services/performance-marketing"
                className="text-base font-bold text-black underline underline-offset-4 hover:text-gray-600 transition-colors motion-reduce:transition-none"
              >
                Performance Marketing Services &rarr;
              </Link>
              <Link
                href="/locations/karachi"
                className="text-base font-bold text-black underline underline-offset-4 hover:text-gray-600 transition-colors motion-reduce:transition-none"
              >
                All Services in Karachi &rarr;
              </Link>
              <Link
                href="/locations/karachi/marketing-agency"
                className="text-base font-bold text-black underline underline-offset-4 hover:text-gray-600 transition-colors motion-reduce:transition-none"
              >
                Marketing Agency in Karachi &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Stop Guessing. Start Converting.
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s audit your current ad spend and find out where you are
              leaving money on the table. No commitments — just a clear picture
              of what&apos;s working and what&apos;s not.
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
