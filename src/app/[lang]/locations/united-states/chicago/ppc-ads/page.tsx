import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "PPC Ads Agency in Chicago — Markit Media",
  description:
    "Markit Media manages Google Ads, Meta Ads, and LinkedIn campaigns for businesses in Chicago. B2B lead generation, e-commerce, and ROI-focused paid media for the Midwest market.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Markit Media",
  description:
    "PPC advertising agency serving businesses in Chicago with Google Ads, Meta Ads, and LinkedIn campaign management.",
  areaServed: { "@type": "City", name: "Chicago" },
  url: "https://themarkitmedia.com/en/locations/united-states/chicago/ppc-ads",
};

const faqs = [
  {
    q: "Can you target ads specifically to the Chicago metro area?",
    a: "Yes. We build geo-targeted campaigns across Google Ads, Meta, and LinkedIn that focus on the Chicago metro specifically, or narrow further to individual neighborhoods, suburbs, or a defined service radius, depending on where your customers are.",
  },
  {
    q: "How does PPC differ for B2B companies in Chicago versus consumer brands?",
    a: "Chicago's economy is heavily B2B, with manufacturing, financial services, and logistics companies as major employers. B2B PPC campaigns need to prioritize lead quality and account-level targeting over raw click volume, since these buyers move through longer, multi-stakeholder decision processes.",
  },
  {
    q: "Is advertising in Chicago more affordable than in coastal markets?",
    a: "Cost-per-click varies by industry and keyword competitiveness rather than by city alone, but Chicago's ad auctions are generally less saturated than markets like New York or San Francisco for many categories, which can affect efficiency. We monitor your actual account data rather than relying on general market comparisons to set expectations.",
  },
  {
    q: "Do you build different PPC strategies for different Chicago industries?",
    a: "Yes. A campaign for a manufacturing company targeting other businesses looks different from one for a Chicago retailer targeting local consumers. We adjust platform selection, targeting parameters, and creative based on the industry and audience you're trying to reach.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

const serviceItems = [
  {
    title: "Google Ads Management",
    description:
      "Search, Shopping, Display, and Performance Max campaigns built around your target cost-per-acquisition. We handle keyword research, ad copy, bid strategy, and ongoing optimisation.",
  },
  {
    title: "Meta Ads (Facebook &amp; Instagram)",
    description:
      "Audience targeting, creative production, and campaign management across Meta platforms. Effective for both B2C reach and B2B retargeting sequences.",
  },
  {
    title: "LinkedIn Advertising",
    description:
      "Sponsored content, message ads, and lead gen forms targeting decision-makers by job title, company size, and industry — built for Chicago&apos;s dense B2B market.",
  },
  {
    title: "Landing Page Development",
    description:
      "Conversion-focused landing pages designed to match your ad messaging. Fast load times, clear calls to action, and A/B testing to improve conversion rates over time.",
  },
  {
    title: "Conversion Tracking &amp; Attribution",
    description:
      "Proper tracking setup across Google Analytics, ad platforms, and your CRM. We ensure every lead and sale is attributed to the campaign that generated it.",
  },
  {
    title: "Reporting &amp; Budget Management",
    description:
      "Monthly performance reports with clear metrics: cost per lead, return on ad spend, and pipeline contribution. Budget recommendations based on data, not assumptions.",
  },
];

const reasons = [
  {
    title: "B2B Lead Generation Expertise",
    description:
      "Chicago&apos;s economy is anchored by manufacturing, financial services, logistics, and professional services. These industries have longer sales cycles and higher customer lifetime values — which means PPC strategy needs to focus on lead quality and pipeline value, not just click volume. That&apos;s how we build every campaign.",
  },
  {
    title: "Platform-Agnostic Approach",
    description:
      "We don&apos;t push one platform over another. Budget allocation starts with your audience and your goals, then flows to the channels where those prospects actually convert — whether that&apos;s Google Search for high-intent queries, LinkedIn for account-based targeting, or Meta for awareness and retargeting.",
  },
  {
    title: "Cost Discipline",
    description:
      "Chicago businesses operate with Midwest pragmatism — every dollar needs to justify itself. We manage budgets with the same mindset: tight negative keyword lists, granular audience exclusions, and continuous bid adjustments to eliminate waste and improve return on ad spend.",
  },
  {
    title: "Full-Funnel Visibility",
    description:
      "Clicks and impressions are not results. We connect your ad platforms to your CRM and analytics stack so you can track every lead from first click through to closed revenue. That visibility is what makes paid media a growth lever instead of an expense.",
  },
];

const steps = [
  {
    number: "01",
    title: "Audit &amp; Research",
    description:
      "We review your existing ad accounts, competitor landscape, and market opportunity. For new accounts, we conduct keyword and audience research to identify the highest-value targets.",
  },
  {
    number: "02",
    title: "Campaign Architecture",
    description:
      "Account structure, campaign hierarchy, targeting parameters, and budget allocation — all designed before a single ad goes live. Proper structure prevents wasted spend from day one.",
  },
  {
    number: "03",
    title: "Launch &amp; Monitor",
    description:
      "Campaigns go live with close monitoring during the initial learning period. We watch search term reports, audience performance, and conversion data to catch issues early.",
  },
  {
    number: "04",
    title: "Optimise &amp; Scale",
    description:
      "Once baseline performance is established, we test ad variations, expand high-performing audiences, adjust bids, and gradually scale budget into the campaigns generating the best returns.",
  },
];

export default function ChicagoPpcAdsPage() {
  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema} />

      {/* Breadcrumb */}
      <section aria-label="Content section" className="bg-white pt-28 pb-4">
        <div className="mx-auto max-w-7xl px-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Locations", href: "/locations" },
              { label: "United States", href: "/locations/united-states" },
              { label: "Chicago", href: "/locations/united-states/chicago" },
              { label: "PPC Ads" },
            ]}
          />
        </div>
      </section>

      {/* Hero */}
      <section aria-label="Chicago, Illinois" className="bg-white pt-12 pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Chicago, Illinois</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-tight max-w-4xl mt-4">
              PPC Ads Agency Serving Businesses in Chicago
            </h1>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <p className="mt-6 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Paid advertising in a market like Chicago demands precision. With
              high competition across B2B verticals, manufacturing, financial
              services, and professional services, the difference between
              profitable campaigns and wasted budget comes down to targeting,
              tracking, and disciplined optimisation.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={300}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Markit Media manages PPC campaigns for businesses across the Chicago
              metro — Google Ads, Meta Ads, and LinkedIn — with a focus on lead
              quality, cost efficiency, and clear reporting that ties ad spend
              directly to revenue.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={400}>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-black px-10 py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
            >
              Discuss Your PPC Goals
            </Link>
          </Animate>
        </div>
      </section>

      {/* Service Details */}
      <section aria-label="What&apos;s Included" className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              Paid media services for the Chicago market
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Whether you&apos;re running your first Google Ads campaign or
              managing six-figure monthly budgets across multiple platforms, we
              structure every engagement around your cost-per-acquisition targets
              and revenue goals.
            </p>
          </Animate>

          <Stagger stagger={100} animation="fade-up" className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {serviceItems.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-8"
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-black">
                  {item.title}
                </h3>
                <p
                  className="mt-3 text-base text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why Chicago Businesses Choose Us */}
      <section aria-label="Why Markit Media" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              Why Chicago businesses choose Markit Media for PPC
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Paid media is only as good as the strategy behind it. Here&apos;s
              what distinguishes our approach for businesses operating in
              Chicago&apos;s competitive market.
            </p>
          </Animate>

          <Stagger stagger={100} animation="fade-up" className="mt-14 grid gap-10 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason.title} className="border-l-4 border-black pl-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-black">
                  {reason.title}
                </h3>
                <p
                  className="mt-3 text-base text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: reason.description }}
                />
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Process */}
      <section aria-label="Our Process" className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Our Process</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              How we manage paid media campaigns
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Structured process, adaptive execution. Every campaign follows the
              same proven framework — the targeting, creative, and budget
              decisions inside each phase are customised to your business.
            </p>
          </Animate>

          <Stagger stagger={120} animation="fade-up" className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="rounded-2xl border border-gray-200 bg-white p-8">
                <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-gray-200">
                  {step.number}
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-bold text-black">
                  {step.title}
                </h3>
                <p
                  className="mt-3 text-base text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: step.description }}
                />
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Related Services */}
      <section aria-label="Related Services" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Related Services</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              Explore our paid media capabilities
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              PPC works best alongside strong landing pages, SEO, and conversion
              tracking. These pages go deeper into each area.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={250}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/services/performance-marketing"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline"
              >
                Performance Marketing
              </Link>
              <Link
                href="/services/performance-marketing/google-ads"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline"
              >
                Google Ads
              </Link>
              <Link
                href="/services/performance-marketing/meta-ads"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline"
              >
                Meta Ads
              </Link>
              <Link
                href="/locations/united-states/chicago"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline"
              >
                All Chicago Services
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-12 py-20" aria-label="Frequently asked questions">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Frequently Asked Questions About PPC Ads in Chicago</SectionTitle>
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
      <section aria-label="Get more from your ad spend in Chicago" className="bg-black py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Animate animation="scale-in">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-white tracking-tight leading-tight">
              Get more from your ad spend in Chicago
            </h2>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300 leading-relaxed">
              Share your current performance data and growth targets. We&apos;ll
              tell you where the opportunities are and what a realistic return
              looks like — no obligations, no hard sell.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={300}>
            <Link
              href="/contact"
              className="mt-10 inline-block rounded-full bg-white px-10 py-4 text-base font-bold text-black transition-opacity hover:opacity-90"
            >
              Request a PPC Audit
            </Link>
          </Animate>
        </div>
      </section>
    </>
  );
}
