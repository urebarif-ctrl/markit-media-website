import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Marketing Agency in Chicago — Markit Media",
  description:
    "Markit Media serves businesses in Chicago with full-service marketing — strategy, paid media, SEO, web development, and branding built for measurable growth in the Midwest&apos;s largest business hub.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Markit Media",
  description:
    "Full-service marketing agency serving businesses in Chicago with strategy, paid media, SEO, web development, and branding.",
  areaServed: { "@type": "City", name: "Chicago" },
  url: "https://themarkitmedia.com/en/locations/united-states/chicago/marketing-agency",
};

const serviceItems = [
  {
    title: "Marketing Strategy",
    description:
      "Market research, competitive analysis, and channel planning tailored to your industry. Every initiative maps back to revenue targets and business objectives — no activity for activity&apos;s sake.",
  },
  {
    title: "Paid Media Management",
    description:
      "Google Ads, Meta Ads, LinkedIn, and programmatic campaigns managed with a focus on cost-per-acquisition. We allocate budgets based on data, not guesswork.",
  },
  {
    title: "Search Engine Optimisation",
    description:
      "Technical audits, content strategy, and authority building designed to earn sustainable organic traffic. We target the keywords that drive qualified leads, not vanity rankings.",
  },
  {
    title: "Website Development",
    description:
      "Performance-first websites built on WordPress, Shopify, or Next.js. Fast load times, clean code, and conversion-focused design that supports your marketing goals.",
  },
  {
    title: "Brand Identity",
    description:
      "Visual identity systems, messaging frameworks, and brand guidelines that give your company a consistent, professional presence across every customer touchpoint.",
  },
  {
    title: "Analytics &amp; Reporting",
    description:
      "Custom dashboards, conversion tracking, and monthly performance reviews. You see exactly what&apos;s working and where your budget is going.",
  },
];

const reasons = [
  {
    title: "Built for B2B and Corporate Markets",
    description:
      "Chicago is home to dozens of Fortune 500 headquarters and thousands of mid-market companies across manufacturing, financial services, logistics, and professional services. We understand the longer sales cycles, multi-stakeholder decisions, and ROI accountability that define B2B marketing in this market.",
  },
  {
    title: "Remote Team, Local Focus",
    description:
      "We serve businesses in Chicago without the overhead of a downtown office. That means lower costs passed on to you, combined with deep familiarity with the Chicago market — its competitive landscape, seasonal trends, and the practical, results-first mentality that Midwest businesses expect from their partners.",
  },
  {
    title: "Integrated Execution Across Channels",
    description:
      "SEO, paid media, web development, and branding under one team. Integrated delivery means your messaging stays consistent, campaigns launch faster, and you spend less time coordinating between separate vendors.",
  },
  {
    title: "Transparent, Data-Driven Reporting",
    description:
      "Chicago businesses don&apos;t tolerate fluff. Neither do we. Every engagement comes with clear KPIs, regular performance reports, and honest assessments of what&apos;s working and what needs adjustment.",
  },
];

const steps = [
  {
    number: "01",
    title: "Discovery &amp; Audit",
    description:
      "We review your current marketing efforts, competitive positioning, and business goals. This phase identifies gaps, quick wins, and the highest-impact opportunities for growth.",
  },
  {
    number: "02",
    title: "Strategy Development",
    description:
      "Based on discovery findings, we build a channel-by-channel plan with timelines, budget allocations, and projected outcomes. Nothing launches without your review and approval.",
  },
  {
    number: "03",
    title: "Campaign Execution",
    description:
      "Our specialists implement across every agreed channel — from ad creative and landing pages to technical SEO improvements and content production — with regular progress updates.",
  },
  {
    number: "04",
    title: "Optimisation &amp; Scaling",
    description:
      "Performance data feeds directly back into strategy. We test, adjust, and iterate to improve results month over month, then scale what works into new channels and markets.",
  },
];

export default function ChicagoMarketingAgencyPage() {
  return (
    <>
      <JsonLd data={schema} />

      {/* Breadcrumb */}
      <section className="bg-white pt-28 pb-4">
        <div className="mx-auto max-w-7xl px-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Locations", href: "/locations" },
              { label: "United States", href: "/locations/united-states" },
              { label: "Chicago", href: "/locations/united-states/chicago" },
              { label: "Marketing Agency" },
            ]}
          />
        </div>
      </section>

      {/* Hero */}
      <section className="bg-white pt-12 pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Chicago, Illinois</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-tight max-w-4xl mt-4">
              Marketing Agency Serving Businesses in Chicago
            </h1>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <p className="mt-6 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Chicago&apos;s economy runs on manufacturing, financial services,
              logistics, and a dense concentration of corporate headquarters. Businesses
              here measure marketing by what it delivers to the bottom line — not by
              impressions or follower counts. That practical, ROI-focused mindset is
              exactly how we operate.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={300}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Markit Media serves companies across the Chicago metro with full-service
              marketing — strategy, paid media, SEO, web development, and branding — all
              managed by a single integrated team focused on driving measurable growth.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={400}>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-black px-10 py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
            >
              Start a Conversation
            </Link>
          </Animate>
        </div>
      </section>

      {/* Service Details */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              Full-service marketing for the Chicago market
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Each service is available as a standalone engagement or as part of an
              integrated programme. We tailor scope and budget to match your business
              goals — whether you&apos;re a B2B manufacturer looking for qualified leads
              or a professional services firm building brand visibility.
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
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              Why Chicago businesses choose Markit Media for marketing
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              The Chicago market rewards substance over style. Businesses here want
              partners who deliver results, communicate clearly, and respect their
              budgets. Here&apos;s what sets our approach apart.
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
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Our Process</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              How every engagement works
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              A repeatable framework with customised execution. Whether you need a
              single channel or a full-funnel programme, the structure stays the
              same — the tactics inside each phase adapt to your market and goals.
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
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Related Services</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              Explore our specialist capabilities
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Every marketing programme draws on multiple disciplines. These pages
              go deeper into each area of expertise.
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
                href="/services/seo"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline"
              >
                SEO Services
              </Link>
              <Link
                href="/services/social-media"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline"
              >
                Social Media
              </Link>
              <Link
                href="/services/branding"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline"
              >
                Branding
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

      {/* CTA */}
      <section className="bg-black py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Animate animation="scale-in">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-white tracking-tight leading-tight">
              Ready to grow your business in Chicago?
            </h2>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300 leading-relaxed">
              Tell us about your goals and we&apos;ll build a proposal around
              your numbers — no obligation, no generic pitch decks. Just a clear
              plan designed for measurable results.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={300}>
            <Link
              href="/contact"
              className="mt-10 inline-block rounded-full bg-white px-10 py-4 text-base font-bold text-black transition-opacity hover:opacity-90"
            >
              Get in Touch
            </Link>
          </Animate>
        </div>
      </section>
    </>
  );
}
