import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "PPC Ads Agency in Denver — Markit Media",
  description:
    "Markit Media manages Google Ads, Meta Ads, and LinkedIn campaigns for businesses in Denver. Lead generation, e-commerce, and ROI-focused paid media for the Front Range market.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/locations/united-states/denver/ppc-ads",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Markit Media",
  description:
    "PPC advertising agency serving businesses in Denver with Google Ads, Meta Ads, and LinkedIn campaign management.",
  areaServed: { "@type": "City", name: "Denver" },
  url: "https://themarkitmedia.com/en/locations/united-states/denver/ppc-ads",
};

const serviceItems = [
  {
    title: "Google Ads Management",
    description:
      "Search, Shopping, Display, and Performance Max campaigns built around your target cost-per-acquisition. We handle keyword research, ad copy, bid strategy, and ongoing optimisation for Denver and Front Range audiences.",
  },
  {
    title: "Meta Ads (Facebook &amp; Instagram)",
    description:
      "Audience targeting, creative production, and campaign management across Meta platforms. Effective for reaching Denver&apos;s active, outdoor-oriented consumer base and for B2B retargeting sequences.",
  },
  {
    title: "LinkedIn Advertising",
    description:
      "Sponsored content, message ads, and lead gen forms targeting decision-makers by job title, company size, and industry — built for Denver&apos;s growing tech and aerospace sectors.",
  },
  {
    title: "Landing Page Development",
    description:
      "Conversion-focused landing pages designed to match your ad messaging. Fast load times, clear calls to action, and A/B testing to improve conversion rates over time.",
  },
  {
    title: "Conversion Tracking &amp; Attribution",
    description:
      "Proper tracking setup across Google Analytics, ad platforms, and your CRM. We ensure every lead and sale is attributed to the campaign that generated it — giving you full visibility into ad spend performance.",
  },
  {
    title: "Reporting &amp; Budget Management",
    description:
      "Monthly performance reports with clear metrics: cost per lead, return on ad spend, and pipeline contribution. Budget recommendations based on data, not assumptions.",
  },
];

const reasons = [
  {
    title: "Multi-Industry Campaign Expertise",
    description:
      "Denver&apos;s economy spans tech, aerospace, cannabis, outdoor recreation, real estate, and craft food and beverage. Each sector has different audiences, compliance requirements, and buying cycles. We build campaigns that reflect those realities — not generic templates applied across industries.",
  },
  {
    title: "Platform-Agnostic Approach",
    description:
      "We don&apos;t push one platform over another. Budget allocation starts with your audience and your goals, then flows to the channels where those prospects actually convert — whether that&apos;s Google Search for high-intent queries, LinkedIn for account-based targeting, or Meta for awareness and retargeting.",
  },
  {
    title: "Cost Discipline for a Growing Market",
    description:
      "Denver&apos;s rapid growth means increasing competition for ad inventory across most categories. We manage budgets with tight negative keyword lists, granular audience exclusions, and continuous bid adjustments to eliminate waste and improve return on ad spend as CPCs rise.",
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
      "We review your existing ad accounts, competitor landscape, and market opportunity across the Denver metro. For new accounts, we conduct keyword and audience research to identify the highest-value targets.",
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

export default function DenverPpcAdsPage() {
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
                name: "How much should a Denver business budget for PPC advertising?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Budget depends on your industry, competition level, and growth targets. Denver’s growing market means CPCs are rising in competitive sectors like real estate, legal cannabis, and tech. We typically recommend starting with a budget that allows enough data collection to optimise effectively, then scaling into the campaigns that deliver the best return on ad spend. We’ll provide specific recommendations after reviewing your market and goals.",
                },
              },
              {
                "@type": "Question",
                name: "Can you run PPC campaigns for cannabis businesses in Denver?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Cannabis advertising faces significant platform restrictions. Google and Meta prohibit direct promotion of cannabis products. However, there are compliant strategies available — including educational content promotion, ancillary product advertising, and programmatic display through cannabis-friendly ad networks. We help Denver cannabis operators navigate these restrictions while still generating measurable traffic and leads.",
                },
              },
              {
                "@type": "Question",
                name: "Which PPC platform works best for B2B companies in Denver?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For B2B companies along the Front Range tech corridor, Google Ads captures high-intent search traffic from prospects actively looking for solutions. LinkedIn Ads is effective for account-based targeting by job title, company size, and industry — particularly useful for reaching decision-makers in Denver’s aerospace, tech, and professional services sectors. We often recommend a combination of both, with budget weighted toward whichever platform delivers the lower cost per qualified lead.",
                },
              },
              {
                "@type": "Question",
                name: "How quickly can PPC campaigns generate leads in the Denver market?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "PPC can generate leads within the first week of launch if targeting and landing pages are properly set up. The initial two to four weeks are a learning period where we gather data, refine targeting, and optimise bids. Most campaigns reach stable, optimised performance within 60 to 90 days. We provide transparent reporting throughout so you see exactly how performance is trending.",
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
              { label: "PPC Ads" },
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
              PPC Ads Agency Serving Businesses in Denver
            </h1>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <p className="mt-6 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Paid advertising in a market like Denver demands precision. With
              growing competition across tech, outdoor brands, cannabis, real
              estate, and aerospace, the difference between profitable campaigns
              and wasted budget comes down to targeting, tracking, and
              disciplined optimisation.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={300}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Markit Media manages PPC campaigns for businesses across the Denver
              metro — Google Ads, Meta Ads, and LinkedIn — with a focus on lead
              quality, cost efficiency, and clear reporting that ties ad spend
              directly to revenue.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={400}>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-black px-10 py-4 text-base font-bold text-white transition-opacity hover:opacity-90 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
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
              Paid media services for the Denver market
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Whether you&apos;re running your first Google Ads campaign or
              managing significant monthly budgets across multiple platforms, we
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

      {/* Why Denver Businesses Choose Us */}
      <section aria-label="Why Markit Media" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              Why Denver businesses choose Markit Media for PPC
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Paid media is only as good as the strategy behind it. Here&apos;s
              what distinguishes our approach for businesses operating in
              Denver&apos;s competitive and fast-growing market.
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
              Explore our Denver service pages
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
                href="/locations/united-states/denver/marketing-agency"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Marketing Agency
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
              <h3 className="text-lg font-semibold mb-2">How much should a Denver business budget for PPC advertising?</h3>
              <p className="text-base text-neutral-600">Budget depends on your industry, competition level, and growth targets. Denver&apos;s growing market means CPCs are rising in competitive sectors like real estate, legal cannabis, and tech. We typically recommend starting with a budget that allows enough data collection to optimise effectively, then scaling into the campaigns that deliver the best return on ad spend. We&apos;ll provide specific recommendations after reviewing your market and goals.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Can you run PPC campaigns for cannabis businesses in Denver?</h3>
              <p className="text-base text-neutral-600">Cannabis advertising faces significant platform restrictions. Google and Meta prohibit direct promotion of cannabis products. However, there are compliant strategies available — including educational content promotion, ancillary product advertising, and programmatic display through cannabis-friendly ad networks. We help Denver cannabis operators navigate these restrictions while still generating measurable traffic and leads.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Which PPC platform works best for B2B companies in Denver?</h3>
              <p className="text-base text-neutral-600">For B2B companies along the Front Range tech corridor, Google Ads captures high-intent search traffic from prospects actively looking for solutions. LinkedIn Ads is effective for account-based targeting by job title, company size, and industry — particularly useful for reaching decision-makers in Denver&apos;s aerospace, tech, and professional services sectors. We often recommend a combination of both, with budget weighted toward whichever platform delivers the lower cost per qualified lead.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">How quickly can PPC campaigns generate leads in the Denver market?</h3>
              <p className="text-base text-neutral-600">PPC can generate leads within the first week of launch if targeting and landing pages are properly set up. The initial two to four weeks are a learning period where we gather data, refine targeting, and optimise bids. Most campaigns reach stable, optimised performance within 60 to 90 days. We provide transparent reporting throughout so you see exactly how performance is trending.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Get more from your ad spend in Denver" className="bg-black py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Animate animation="scale-in">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-white tracking-tight leading-tight">
              Get more from your ad spend in Denver
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
              className="mt-10 inline-block rounded-full bg-white px-10 py-4 text-base font-bold text-black transition-opacity hover:opacity-90 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Request a PPC Audit
            </Link>
          </Animate>
        </div>
      </section>
    </>
  );
}
