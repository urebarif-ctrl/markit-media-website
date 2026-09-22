import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Marketing Agency in Denver — Markit Media",
  description:
    "Markit Media serves businesses in Denver with full-service marketing — strategy, paid media, SEO, web development, and branding built for measurable growth along the Front Range.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/locations/united-states/denver/marketing-agency",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Markit Media",
  description:
    "Full-service marketing agency serving businesses in Denver with strategy, paid media, SEO, web development, and branding.",
  areaServed: { "@type": "City", name: "Denver" },
  url: "https://themarkitmedia.com/en/locations/united-states/denver/marketing-agency",
};

const serviceItems = [
  {
    title: "Marketing Strategy",
    description:
      "Market research, competitive analysis, and channel planning tailored to Denver&apos;s unique mix of tech, outdoor recreation, and sustainability-focused consumers. Every initiative maps back to revenue targets and business objectives.",
  },
  {
    title: "Paid Media Management",
    description:
      "Google Ads, Meta Ads, LinkedIn, and programmatic campaigns managed with a focus on cost-per-acquisition. We allocate budgets based on data and adjust for Denver&apos;s seasonal market patterns.",
  },
  {
    title: "Search Engine Optimisation",
    description:
      "Technical audits, content strategy, and authority building designed to earn sustainable organic traffic. We target the keywords that drive qualified leads across Denver&apos;s competitive Front Range market.",
  },
  {
    title: "Website Development",
    description:
      "Performance-first websites built on WordPress, Shopify, or Next.js. Fast load times, clean code, and conversion-focused design that supports your marketing goals and reflects your brand.",
  },
  {
    title: "Brand Identity",
    description:
      "Visual identity systems, messaging frameworks, and brand guidelines that give your company a consistent, professional presence — whether you&apos;re a tech startup in RiNo or an established firm in the Denver Tech Center.",
  },
  {
    title: "Analytics &amp; Reporting",
    description:
      "Custom dashboards, conversion tracking, and monthly performance reviews. You see exactly what&apos;s working and where your budget is going — no vanity metrics, no ambiguity.",
  },
];

const reasons = [
  {
    title: "Built for Denver&apos;s Diverse Economy",
    description:
      "Denver&apos;s business landscape spans tech startups along the Front Range corridor, outdoor and lifestyle brands, aerospace and defence, cannabis, real estate, and craft food and beverage. We understand the distinct marketing challenges across these sectors — from regulated advertising in cannabis to technical messaging for aerospace contractors.",
  },
  {
    title: "Remote Team, Local Market Knowledge",
    description:
      "We serve Denver businesses without the overhead of a LoDo office. That means lower costs passed on to you, combined with deep familiarity with Denver&apos;s competitive landscape — its migration-driven growth, the sustainability values that drive consumer behaviour, and the practical, quality-focused expectations of Front Range companies.",
  },
  {
    title: "Integrated Execution Across Channels",
    description:
      "SEO, paid media, web development, and branding under one team. Integrated delivery means your messaging stays consistent, campaigns launch faster, and you spend less time coordinating between separate vendors.",
  },
  {
    title: "Transparent, Data-Driven Reporting",
    description:
      "Denver businesses value directness. So do we. Every engagement comes with clear KPIs, regular performance reports, and honest assessments of what&apos;s working and what needs adjustment — no smoke, no mirrors.",
  },
];

const steps = [
  {
    number: "01",
    title: "Discovery &amp; Audit",
    description:
      "We review your current marketing efforts, competitive positioning in the Denver market, and business goals. This phase identifies gaps, quick wins, and the highest-impact opportunities for growth.",
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

export default function DenverMarketingAgencyPage() {
  return (
    <>
      <JsonLd data={schema} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What industries does Markit Media serve in Denver?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We work with businesses across Denver’s core sectors, including technology companies along the Front Range corridor, outdoor recreation and lifestyle brands, aerospace and defence contractors, legal cannabis operators, real estate developers, and craft food and beverage companies. Each industry has distinct marketing requirements, and we tailor strategy, messaging, and channel selection accordingly.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need to hire a Denver-based agency for marketing?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Not necessarily. What matters is whether your agency understands your local market. Markit Media operates as a remote team with deep familiarity with Denver’s competitive landscape — its migration-driven growth, the sustainability values that shape consumer behaviour, and the practical expectations of Front Range businesses. A remote model also means lower overhead costs passed directly to you.",
                },
              },
              {
                "@type": "Question",
                name: "How long does it take to see results from a full-service marketing engagement in Denver?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Timelines depend on the channels involved. Paid media campaigns can generate leads within the first few weeks. SEO and content marketing typically take three to six months to produce meaningful organic traffic growth. Brand-building initiatives compound over longer periods. We set clear expectations during the strategy phase so you know what to expect and when.",
                },
              },
              {
                "@type": "Question",
                name: "What makes marketing in Denver different from other U.S. markets?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Denver’s market is shaped by rapid population growth from coastal migration, a strong sustainability and outdoor culture, a competitive tech corridor, and regulated industries like cannabis that require specialised advertising approaches. Consumers and businesses along the Front Range tend to value authenticity, quality, and directness — which influences everything from ad copy tone to content strategy.",
                },
              },
            ],
          }),
        }}
      />

      {/* Breadcrumb */}
      <section aria-label="Content section" className="bg-white pt-28 pb-4">
        <div className="mx-auto max-w-7xl px-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Locations", href: "/locations" },
              { label: "United States", href: "/locations/united-states" },
              { label: "Denver", href: "/locations/united-states/denver" },
              { label: "Marketing Agency" },
            ]}
          />
        </div>
      </section>

      {/* Hero */}
      <section aria-label="Denver, Colorado" className="bg-white pt-12 pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Denver, Colorado</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-tight max-w-4xl mt-4">
              Marketing Agency Serving Businesses in Denver
            </h1>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <p className="mt-6 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Denver&apos;s economy is driven by a potent mix of technology,
              outdoor recreation, aerospace, cannabis, and a real estate market
              fuelled by steady migration from the coasts. Businesses here need
              marketing that matches the pace of growth — grounded in data, built
              for measurable results, and adapted to a market where
              sustainability and authenticity are baseline expectations.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={300}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Markit Media serves companies across the Denver metro with
              full-service marketing — strategy, paid media, SEO, web
              development, and branding — all managed by a single integrated team
              focused on driving growth along the Front Range.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={400}>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-black px-10 py-4 text-base font-bold text-white transition-opacity hover:opacity-90 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Start a Conversation
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
              Full-service marketing for the Denver market
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Each service is available as a standalone engagement or as part of
              an integrated programme. We tailor scope and budget to match your
              business goals — whether you&apos;re an outdoor brand scaling
              e-commerce, a cannabis company navigating advertising restrictions,
              or a tech firm building pipeline along the Front Range corridor.
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

      {/* Why Denver Businesses Choose Us */}
      <section aria-label="Why Markit Media" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              Why Denver businesses choose Markit Media for marketing
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Denver&apos;s market rewards authenticity and substance. Businesses
              here want partners who deliver results, communicate clearly, and
              understand the local landscape. Here&apos;s what sets our approach
              apart.
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
      <section aria-label="Related Services" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Related Services</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              Explore our Denver service pages
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Every marketing programme draws on multiple disciplines. These pages
              go deeper into each area of expertise we offer in Denver.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={250}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/locations/united-states/denver/ppc-ads"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                PPC Ads
              </Link>
              <Link
                href="/locations/united-states/denver/seo-services"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                SEO Services
              </Link>
              <Link
                href="/locations/united-states/denver/website-development"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Website Development
              </Link>
              <Link
                href="/locations/united-states/denver"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                All Denver Services
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* FAQ */}
      <section aria-label="Frequently Asked Questions" className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">What industries does Markit Media serve in Denver?</h3>
              <p className="text-base text-neutral-600">We work with businesses across Denver&apos;s core sectors, including technology companies along the Front Range corridor, outdoor recreation and lifestyle brands, aerospace and defence contractors, legal cannabis operators, real estate developers, and craft food and beverage companies. Each industry has distinct marketing requirements, and we tailor strategy, messaging, and channel selection accordingly.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Do I need to hire a Denver-based agency for marketing?</h3>
              <p className="text-base text-neutral-600">Not necessarily. What matters is whether your agency understands your local market. Markit Media operates as a remote team with deep familiarity with Denver&apos;s competitive landscape — its migration-driven growth, the sustainability values that shape consumer behaviour, and the practical expectations of Front Range businesses. A remote model also means lower overhead costs passed directly to you.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">How long does it take to see results from a full-service marketing engagement in Denver?</h3>
              <p className="text-base text-neutral-600">Timelines depend on the channels involved. Paid media campaigns can generate leads within the first few weeks. SEO and content marketing typically take three to six months to produce meaningful organic traffic growth. Brand-building initiatives compound over longer periods. We set clear expectations during the strategy phase so you know what to expect and when.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">What makes marketing in Denver different from other U.S. markets?</h3>
              <p className="text-base text-neutral-600">Denver&apos;s market is shaped by rapid population growth from coastal migration, a strong sustainability and outdoor culture, a competitive tech corridor, and regulated industries like cannabis that require specialised advertising approaches. Consumers and businesses along the Front Range tend to value authenticity, quality, and directness — which influences everything from ad copy tone to content strategy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Ready to grow your business in Denver?" className="bg-black py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Animate animation="scale-in">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-white tracking-tight leading-tight">
              Ready to grow your business in Denver?
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
              className="mt-10 inline-block rounded-full bg-white px-10 py-4 text-base font-bold text-black transition-opacity hover:opacity-90 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Get in Touch
            </Link>
          </Animate>
        </div>
      </section>
    </>
  );
}
