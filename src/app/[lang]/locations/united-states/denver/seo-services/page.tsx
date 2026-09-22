import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "SEO Services in Denver — Markit Media",
  description:
    "Markit Media provides technical SEO, local SEO, and content strategy for businesses in Denver. Organic growth for tech companies, outdoor brands, cannabis, real estate, and Front Range businesses.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/locations/united-states/denver/seo-services",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Markit Media",
  description:
    "SEO agency serving businesses in Denver with technical SEO, local SEO, and content strategy for sustainable organic growth.",
  areaServed: { "@type": "City", name: "Denver" },
  url: "https://themarkitmedia.com/en/locations/united-states/denver/seo-services",
};

const serviceItems = [
  {
    title: "Technical SEO",
    description:
      "Site architecture audits, crawlability improvements, Core Web Vitals optimisation, structured data implementation, and indexation management. The foundation that makes every other SEO effort effective.",
  },
  {
    title: "Local SEO",
    description:
      "Google Business Profile optimisation, local citation building, review management, and geo-targeted content. Essential for businesses serving customers in specific Denver neighbourhoods, the suburbs, or across the Front Range.",
  },
  {
    title: "Content Strategy &amp; Production",
    description:
      "Keyword research, content gap analysis, editorial planning, and article production. We create content that targets the search queries your ideal customers are actually using — not vanity keywords with no commercial intent.",
  },
  {
    title: "Link Building &amp; Digital PR",
    description:
      "Authority-building through industry publications, resource link acquisition, and strategic outreach. Every link is earned through genuine relevance — no paid placements, no link farms, no shortcuts that risk your rankings.",
  },
  {
    title: "On-Page Optimisation",
    description:
      "Title tags, meta descriptions, heading structure, internal linking, and content refinement. Systematic improvements across your existing pages to capture more traffic from keywords you already rank for.",
  },
  {
    title: "SEO Reporting &amp; Analytics",
    description:
      "Monthly reports covering organic traffic, keyword rankings, conversion data, and competitive benchmarks. We connect SEO performance to business outcomes — leads generated, revenue influenced, market share gained.",
  },
];

const reasons = [
  {
    title: "SEO for Denver&apos;s Diverse Industries",
    description:
      "Denver&apos;s economy spans tech, aerospace, cannabis, outdoor recreation, real estate, and craft food and beverage. Each sector has different search landscapes, competitive dynamics, and content requirements. We build strategies that reflect the specific search behaviour and buyer intent in your industry — not generic playbooks.",
  },
  {
    title: "Local SEO for a Fast-Growing Metro",
    description:
      "With steady population growth driven by migration from the coasts, Denver&apos;s local search landscape is increasingly competitive. Ranking in local results requires more than claiming a Google Business Profile. We implement the technical signals, citation consistency, and localised content that move the needle in a crowded market.",
  },
  {
    title: "Content That Drives Pipeline",
    description:
      "We don&apos;t produce content for the sake of publishing. Every article, landing page, and resource we create targets a specific stage of the buyer&apos;s journey and a keyword cluster with demonstrated commercial value. The goal is pipeline contribution, not page views.",
  },
  {
    title: "Transparent Methodology",
    description:
      "No black-box tactics, no guaranteed rankings, no shortcuts. We explain exactly what we&apos;re doing, why, and how it connects to your business goals. Denver companies value straight talk — that&apos;s how we operate.",
  },
];

const steps = [
  {
    number: "01",
    title: "SEO Audit",
    description:
      "A comprehensive review of your technical foundation, content inventory, backlink profile, and competitive landscape in the Denver market. The audit identifies what&apos;s holding your site back and where the highest-impact opportunities are.",
  },
  {
    number: "02",
    title: "Strategy &amp; Prioritisation",
    description:
      "We translate audit findings into a prioritised roadmap — technical fixes first, then content and authority initiatives. Each task is ranked by expected impact and effort so you see results as early as possible.",
  },
  {
    number: "03",
    title: "Implementation",
    description:
      "Our team handles technical fixes, content production, on-page optimisation, and link building on an agreed schedule. We work alongside your developers when needed or handle everything independently.",
  },
  {
    number: "04",
    title: "Measurement &amp; Refinement",
    description:
      "Monthly reporting on rankings, traffic, and conversions. We use performance data to refine the strategy, reallocate effort to what&apos;s working, and identify new opportunities as they emerge.",
  },
];

export default function DenverSeoServicesPage() {
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
                name: "How long does SEO take to show results in the Denver market?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most businesses see measurable improvements in rankings and organic traffic within three to six months. Technical fixes and on-page optimisation often produce quicker wins, while content and link-building initiatives compound over time. Denver’s competitive landscape — especially in sectors like tech, real estate, and outdoor recreation — means timelines can vary based on your starting position and the strength of competitors already ranking for your target keywords.",
                },
              },
              {
                "@type": "Question",
                name: "Is local SEO important for businesses that serve all of Denver?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Even if you serve the entire Denver metro, local SEO signals — including your Google Business Profile, local citations, and geo-targeted content — influence how prominently you appear in map results and localised search queries. With Denver’s population growth and the number of new residents searching for local services, strong local SEO is a significant competitive advantage whether you operate in RiNo, the Denver Tech Center, LoDo, or across the Front Range.",
                },
              },
              {
                "@type": "Question",
                name: "Can SEO work for Denver cannabis businesses with advertising restrictions?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SEO is one of the most effective channels for cannabis businesses precisely because paid advertising options are so limited. Google and Meta restrict cannabis ads, which means organic search becomes the primary way to attract qualified traffic. We help Denver cannabis operators build visibility through compliant content strategies, technical SEO, and local search optimisation — without relying on platforms that restrict the industry.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between technical SEO and content SEO?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Technical SEO focuses on your website’s infrastructure — site speed, crawlability, structured data, mobile performance, and indexation. Content SEO involves creating and optimising pages that target specific search queries your audience is using. Both are necessary. Technical SEO ensures search engines can access and understand your site; content SEO ensures you have pages worth ranking. We address both in every engagement for Denver businesses.",
                },
              },
            ],
          }),
        }}
      />

      {/* Breadcrumb */}
      <section className="bg-white pt-28 pb-4">
        <div className="mx-auto max-w-7xl px-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Locations", href: "/locations" },
              { label: "United States", href: "/locations/united-states" },
              { label: "Denver", href: "/locations/united-states/denver" },
              { label: "SEO Services" },
            ]}
          />
        </div>
      </section>

      {/* Hero */}
      <section className="bg-white pt-12 pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Denver, Colorado</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-tight max-w-4xl mt-4">
              SEO Services for Businesses in Denver
            </h1>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <p className="mt-6 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Organic search is the highest-leverage acquisition channel for most
              businesses in Denver. Whether you&apos;re competing for local
              service queries across the metro, targeting national keywords in
              tech or aerospace, building visibility for a cannabis brand within
              advertising restrictions, or capturing the outdoor recreation
              audience — SEO compounds over time in a way that paid media cannot.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={300}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Markit Media provides technical SEO, local SEO, and content strategy
              for businesses across the Denver market. We focus on the work that
              moves rankings and drives qualified traffic — no filler, no vanity
              metrics, no shortcuts.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={400}>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-black px-10 py-4 text-base font-bold text-white transition-opacity hover:opacity-90 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Request an SEO Audit
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
              SEO services for the Denver market
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              From technical foundations to content production and authority
              building, each service addresses a specific layer of the SEO stack.
              We scope engagements based on where your site is today and what it
              takes to reach your traffic and lead generation goals.
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
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              Why Denver businesses choose Markit Media for SEO
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              SEO agencies are everywhere. What matters is whether they understand
              your market, your buyer, and the technical work required to actually
              move rankings. Here&apos;s our approach.
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
              How we approach SEO engagements
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              SEO is a long game, but that does not mean results take months to
              appear. Our process front-loads high-impact technical work and quick
              wins while building the content and authority foundation for sustained
              growth.
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
              Explore our Denver service pages
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              SEO spans technical, content, and local disciplines. These pages go
              deeper into our other Denver capabilities.
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
                href="/locations/united-states/denver/ppc-ads"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                PPC Ads
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
      <section className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">How long does SEO take to show results in the Denver market?</h3>
              <p className="text-base text-neutral-600">Most businesses see measurable improvements in rankings and organic traffic within three to six months. Technical fixes and on-page optimisation often produce quicker wins, while content and link-building initiatives compound over time. Denver&apos;s competitive landscape — especially in sectors like tech, real estate, and outdoor recreation — means timelines can vary based on your starting position and the strength of competitors already ranking for your target keywords.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Is local SEO important for businesses that serve all of Denver?</h3>
              <p className="text-base text-neutral-600">Yes. Even if you serve the entire Denver metro, local SEO signals — including your Google Business Profile, local citations, and geo-targeted content — influence how prominently you appear in map results and localised search queries. With Denver&apos;s population growth and the number of new residents searching for local services, strong local SEO is a significant competitive advantage whether you operate in RiNo, the Denver Tech Center, LoDo, or across the Front Range.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Can SEO work for Denver cannabis businesses with advertising restrictions?</h3>
              <p className="text-base text-neutral-600">SEO is one of the most effective channels for cannabis businesses precisely because paid advertising options are so limited. Google and Meta restrict cannabis ads, which means organic search becomes the primary way to attract qualified traffic. We help Denver cannabis operators build visibility through compliant content strategies, technical SEO, and local search optimisation — without relying on platforms that restrict the industry.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">What is the difference between technical SEO and content SEO?</h3>
              <p className="text-base text-neutral-600">Technical SEO focuses on your website&apos;s infrastructure — site speed, crawlability, structured data, mobile performance, and indexation. Content SEO involves creating and optimising pages that target specific search queries your audience is using. Both are necessary. Technical SEO ensures search engines can access and understand your site; content SEO ensures you have pages worth ranking. We address both in every engagement for Denver businesses.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Animate animation="scale-in">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-white tracking-tight leading-tight">
              Start ranking where Denver customers are searching
            </h2>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300 leading-relaxed">
              Request a free SEO audit. We&apos;ll review your technical
              foundation, competitive positioning, and content gaps — then show
              you exactly where the growth opportunities are.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={300}>
            <Link
              href="/contact"
              className="mt-10 inline-block rounded-full bg-white px-10 py-4 text-base font-bold text-black transition-opacity hover:opacity-90 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Get Your Free Audit
            </Link>
          </Animate>
        </div>
      </section>
    </>
  );
}
