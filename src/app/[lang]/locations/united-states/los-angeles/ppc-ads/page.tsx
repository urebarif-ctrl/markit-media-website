import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "PPC Ads Agency in Los Angeles — Markit Media",
  description:
    "PPC and paid advertising management for businesses in Los Angeles. Google Ads, Meta Ads, and multi-platform campaigns built for LA's competitive e-commerce and entertainment verticals.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/los-angeles/ppc-ads",
  },
  openGraph: {
    title: "PPC Ads Agency in Los Angeles — Markit Media",
    description:
      "PPC and paid advertising management for businesses in Los Angeles. Google Ads, Meta Ads, and multi-platform campaigns for competitive LA verticals.",
  },
};

const serviceItems = [
  {
    title: "Google Ads Management",
    desc: "Search, Shopping, Display, and YouTube campaigns structured for high-intent keywords in the Los Angeles market. We handle account architecture, bid strategy, ad copy, and ongoing optimization.",
  },
  {
    title: "Meta Ads (Facebook & Instagram)",
    desc: "Full-funnel campaign management across Meta platforms — prospecting, retargeting, and conversion campaigns built for LA's visually driven, mobile-first audience.",
  },
  {
    title: "TikTok & Short-Form Video Ads",
    desc: "Paid campaigns on TikTok and Reels that tap into the creator-driven culture Los Angeles is known for. We handle creative direction, audience targeting, and performance tracking.",
  },
  {
    title: "Landing Page Optimization",
    desc: "Dedicated landing pages and conversion rate optimization to make sure the traffic your ads drive actually converts — critical in markets where CPCs run high.",
  },
  {
    title: "Audience Research & Targeting",
    desc: "LA's demographics are among the most diverse in the country. We build audience segments based on behavior, intent, geography, and platform-specific signals to reach the right buyers.",
  },
  {
    title: "Reporting & Attribution",
    desc: "Clear reporting that connects ad spend to revenue, not just clicks. We set up proper tracking, attribution models, and dashboards so you see exactly what your campaigns return.",
  },
];

const reasons = [
  {
    title: "Experience in high-CPM markets",
    desc: "Los Angeles has some of the highest cost-per-click rates in the country, especially in entertainment, legal, real estate, and e-commerce. We structure campaigns and bidding strategies specifically to control costs in these competitive verticals without sacrificing reach or conversion quality.",
  },
  {
    title: "Multi-platform fluency",
    desc: "LA consumers are spread across Google, Instagram, TikTok, YouTube, and LinkedIn. A single-channel approach leaves money on the table. We build cross-platform strategies that meet your audience where they actually spend time — and attribute results accurately across channels.",
  },
  {
    title: "Creative that fits the market",
    desc: "Ad creative that works in other markets often falls flat in Los Angeles. LA audiences expect higher production value, stronger visual identity, and messaging that feels native to the platform. We develop ad creative with that standard in mind.",
  },
  {
    title: "Transparent spend management",
    desc: "You see every dollar — where it went, what it returned, and why we're recommending changes. No black-box reporting, no inflated metrics. Your budget works for you, and you can verify it.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Account Audit & Market Analysis",
    desc: "We review your existing ad accounts (or set them up from scratch), analyze competitor activity in the LA market, and identify the highest-opportunity keywords, audiences, and platforms for your business.",
  },
  {
    step: "02",
    title: "Campaign Architecture & Creative",
    desc: "We build campaign structures designed for scale — proper ad groups, audience segmentation, bid strategies, and creative assets. Every campaign launches with multiple ad variations for testing from day one.",
  },
  {
    step: "03",
    title: "Launch & Active Management",
    desc: "Campaigns go live with daily monitoring. We adjust bids, pause underperformers, scale winners, and test new creative on a continuous cycle. No set-it-and-forget-it management.",
  },
  {
    step: "04",
    title: "Performance Reporting & Scaling",
    desc: "Weekly check-ins and monthly deep-dive reports show what's working, what we changed, and where we see opportunity to scale. Recommendations are tied to your CPA and ROAS targets, not vanity metrics.",
  },
];

export default function LosAngelesPpcAdsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "PPC and paid advertising management for businesses in Los Angeles. Google Ads, Meta Ads, and multi-platform campaign management.",
    areaServed: { "@type": "City", name: "Los Angeles" },
    url: "https://themarkitmedia.com/en/locations/united-states/los-angeles/ppc-ads",
  };

  const faqs = [
    {
      q: "Why is PPC advertising more expensive in Los Angeles than other markets?",
      a: "Los Angeles has some of the highest cost-per-click rates in the country, particularly in verticals like entertainment, legal, real estate, and e-commerce, where competition for the same keywords and audiences is intense. We structure bidding strategies specifically to manage costs in this environment.",
    },
    {
      q: "Can you target specific areas within the LA metro rather than the whole region?",
      a: "Yes. The LA metro area covers a wide range of neighborhoods and submarkets, so we build geo-targeted campaigns that focus spend on the specific areas relevant to your business rather than the entire metro.",
    },
    {
      q: "Do you adjust PPC campaigns for seasonal trends in LA?",
      a: "Search behavior and ad costs in Los Angeles shift with seasonal demand across industries like retail, travel, and entertainment. We monitor performance and adjust budgets and targeting as those trends change throughout the year.",
    },
    {
      q: "Which industries in LA do you have the most PPC experience with?",
      a: "We manage PPC for a range of competitive LA verticals, including e-commerce, entertainment, professional services, and direct-to-consumer brands — categories where cost control and creative quality both matter for performance.",
    },
  ];

  return (
    <article>
      <JsonLd data={schema} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "United States", href: "/locations/united-states" },
          {
            label: "Los Angeles",
            href: "/locations/united-states/los-angeles",
          },
          { label: "PPC Ads" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Los Angeles</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              PPC Ads Agency Serving Businesses in Los Angeles
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Paid advertising in Los Angeles means competing against some of the
              biggest spenders in e-commerce, entertainment, and tech. We manage
              PPC campaigns that are structured to win in high-cost markets —
              from keyword-level bid optimization to platform-specific creative
              that converts.
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
        aria-label="PPC services for Los Angeles"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>
              Paid Advertising Services for the LA Market
            </SectionTitle>
            <p className="text-base text-gray-500 leading-relaxed mt-4 max-w-2xl">
              We manage the full paid media lifecycle — from account setup and
              audience research through creative production, campaign management,
              and performance reporting. Every service below can be deployed
              individually or as part of a broader PPC program.
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

      {/* Why LA Businesses Choose Markit Media for PPC */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why Los Angeles businesses choose Markit Media for PPC"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Los Angeles Businesses Choose Markit Media for PPC
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
              How We Run PPC for LA Businesses
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
              href="/locations/united-states/los-angeles"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <span className="text-base font-bold text-black">
                All LA Services
              </span>
              <p className="text-base text-gray-500 mt-1">
                View all services available in Los Angeles.
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
              Frequently Asked Questions About PPC Ads in Los Angeles
            </SectionTitle>
          </Animate>
          <div className="mt-10 space-y-6">
            {faqs.map((faq, i) => (
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
              Stop Overpaying for Underperforming Ads
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s audit your current PPC campaigns and show you where
              the LA market offers real opportunity.
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
