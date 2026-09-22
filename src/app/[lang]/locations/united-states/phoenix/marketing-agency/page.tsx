import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Marketing Agency in Phoenix — Markit Media",
  description:
    "Full-service marketing agency for businesses in Phoenix. Strategy, paid media, SEO, web development, and branding built for the fastest-growing metro in the U.S. — real estate, healthcare, solar energy, semiconductor, and financial services.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/phoenix/marketing-agency",
  },
  openGraph: {
    title: "Marketing Agency in Phoenix — Markit Media",
    description:
      "Full-service marketing agency for Phoenix businesses. Strategy, paid media, SEO, web development, and branding for Arizona's booming metro economy.",
  },
};

const serviceItems = [
  {
    title: "Marketing Strategy",
    desc: "Market research, competitive analysis, and channel planning tailored to Phoenix's high-growth industries. Every initiative ties back to revenue targets and business goals — whether you serve the residential construction boom, healthcare systems, or the semiconductor supply chain expanding across the Valley.",
  },
  {
    title: "Paid Media Management",
    desc: "Google Ads, Meta Ads, LinkedIn, and programmatic campaigns structured for the Phoenix metro. We manage budgets across campaigns targeting homebuyers, healthcare patients, solar energy prospects, and B2B decision-makers in the Valley's expanding commercial sector.",
  },
  {
    title: "Search Engine Optimization",
    desc: "Technical audits, content strategy, and authority building designed for Phoenix's competitive organic landscape. We target keywords that drive qualified leads in real estate, healthcare, financial services, and the growing tech and manufacturing sectors across Maricopa County.",
  },
  {
    title: "Website Development",
    desc: "Performance-first websites on WordPress, Shopify, or Next.js. Fast load times, clean code, and conversion-focused design for Phoenix businesses — from luxury real estate brokerages in Scottsdale to healthcare providers serving the Valley's expanding patient population.",
  },
  {
    title: "Brand Identity",
    desc: "Visual identity systems, messaging frameworks, and brand guidelines that establish a professional presence across every customer touchpoint. Phoenix's rapid growth means new businesses and established firms alike need clear brand positioning to stand out in a crowded market.",
  },
  {
    title: "Analytics & Reporting",
    desc: "Custom dashboards, conversion tracking, and monthly performance reviews. You see exactly what is working and where your marketing budget is generating returns — segmented by channel, campaign type, and business unit across the Phoenix metro.",
  },
];

const reasons = [
  {
    title: "Built for Phoenix's fastest-growing industries",
    desc: "Phoenix is one of the fastest-growing metros in the U.S., with major expansion in real estate, healthcare, semiconductor manufacturing, solar energy, and financial services. We build marketing programs that match the pace and scale of these industries — not generic strategies recycled from other markets.",
  },
  {
    title: "Bilingual market understanding",
    desc: "Over 30% of the Phoenix metro population is Hispanic or Latino, and a significant portion of consumer searches happen in Spanish. We structure campaigns to reach both English and Spanish-speaking audiences with culturally relevant messaging, not afterthought translations bolted onto English-only campaigns.",
  },
  {
    title: "Integrated execution across channels",
    desc: "SEO, paid media, web development, and branding under one team. Integrated delivery means your messaging stays consistent, campaigns launch faster, and you spend less time coordinating between separate vendors — critical when competing in a market that moves as fast as Phoenix.",
  },
  {
    title: "Transparent, data-driven reporting",
    desc: "Every engagement comes with clear KPIs, regular performance reports, and honest assessments of what is working and what needs adjustment. No vanity metrics, no inflated dashboards — just the numbers that matter to your bottom line in the Phoenix market.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Market Analysis",
    desc: "We audit your current marketing, competitive landscape, and audience data. For Phoenix businesses, this includes analyzing seasonal demand patterns, bilingual search behavior, and which channels your competitors are winning on across the Valley.",
  },
  {
    step: "02",
    title: "Strategy & Channel Planning",
    desc: "Based on the audit, we build a channel-by-channel roadmap with clear priorities, timelines, and KPIs. Every recommendation addresses the specific realities of marketing in Phoenix — population growth, seasonal snowbird traffic, and the competitive pressure of a booming metro economy.",
  },
  {
    step: "03",
    title: "Execution & Optimization",
    desc: "Campaigns launch across your selected channels with proper audience segmentation and tracking in place from day one. We optimize weekly based on performance data — adjusting spend, creative, and targeting as the market responds.",
  },
  {
    step: "04",
    title: "Reporting & Iteration",
    desc: "Monthly reports cover what moved, what did not, and what we are changing next. Performance is broken out by channel and campaign type so you can see exactly where your marketing dollars are generating returns in the Phoenix market.",
  },
];

export default function PhoenixMarketingAgencyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "Full-service marketing agency serving businesses in Phoenix. Strategy, paid media, SEO, web development, and branding for Arizona's fastest-growing metro.",
    areaServed: { "@type": "City", name: "Phoenix" },
    url: "https://themarkitmedia.com/en/locations/united-states/phoenix/marketing-agency",
  };

  return (
    <article>
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
                name: "What does a full-service marketing agency do for Phoenix businesses?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A full-service marketing agency handles strategy, paid media, SEO, website development, branding, and analytics as a single integrated team. For Phoenix businesses, this means campaigns built around local market realities — seasonal demand from snowbird traffic, bilingual audience targeting, and competition from the rapid influx of new businesses entering the Valley each year.",
                },
              },
              {
                "@type": "Question",
                name: "How long does it take to see results from a marketing agency in Phoenix?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Paid media campaigns typically generate leads within the first few weeks of launch. SEO and content marketing take longer — usually three to six months before organic rankings and traffic show meaningful improvement. The timeline depends on your industry, competition level, and starting position in the Phoenix market.",
                },
              },
              {
                "@type": "Question",
                name: "Do you work with businesses outside of central Phoenix?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. We serve businesses across the entire Phoenix metro, including Scottsdale, Tempe, Mesa, Chandler, Gilbert, Glendale, and Peoria. Many of our campaigns are structured with geo-targeting at the submarket level so your marketing reaches the specific communities where your customers are located across the Valley.",
                },
              },
              {
                "@type": "Question",
                name: "Why should a Phoenix business hire a marketing agency instead of building an in-house team?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "An agency gives you access to specialists across paid media, SEO, web development, and branding without the cost and time of hiring multiple full-time roles. In a fast-moving market like Phoenix — where real estate, healthcare, solar, and semiconductor industries are all growing simultaneously — an integrated team that can execute across channels from day one is often more efficient than building internally.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "United States", href: "/locations/united-states" },
          {
            label: "Phoenix",
            href: "/locations/united-states/phoenix",
          },
          { label: "Marketing Agency" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Phoenix, Arizona</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              Marketing Agency Serving Businesses in Phoenix
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Phoenix is one of the fastest-growing metros in the United
              States. Real estate development, healthcare expansion,
              semiconductor manufacturing, solar energy, and financial
              services are all scaling rapidly across the Valley. Marketing
              in this market means reaching new residents, growing
              businesses, and established institutions simultaneously.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media serves companies across the Phoenix metro with
              full-service marketing — strategy, paid media, SEO, web
              development, and branding — managed by a single integrated
              team focused on driving measurable growth in Arizona&apos;s
              most competitive market.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Get a Free Consultation &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* Service Details */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Marketing services for Phoenix"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>
              Full-Service Marketing for the Phoenix Market
            </SectionTitle>
            <p className="text-base text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Every engagement is adapted to the realities of the Phoenix
              metro — rapid population growth, a bilingual consumer base,
              seasonal demand shifts, and a competitive landscape shaped by
              some of the largest corporate relocations and infrastructure
              investments in the country. Each service runs independently or
              as part of an integrated program.
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

      {/* Why Phoenix Businesses Choose Markit Media */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why Phoenix businesses choose Markit Media"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Phoenix Businesses Choose Markit Media for Marketing
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
        aria-label="Our process"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Process</SectionLabel>
            <SectionTitle>
              How We Work with Phoenix Businesses
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
              href="/locations/united-states/phoenix/ppc-ads"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <span className="text-base font-bold text-black">
                PPC Ads
              </span>
              <p className="text-base text-gray-500 mt-1">
                Google Ads and Meta Ads for Phoenix businesses.
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

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">What does a full-service marketing agency do for Phoenix businesses?</h3>
              <p className="text-base text-neutral-600">A full-service marketing agency handles strategy, paid media, SEO, website development, branding, and analytics as a single integrated team. For Phoenix businesses, this means campaigns built around local market realities — seasonal demand from snowbird traffic, bilingual audience targeting, and competition from the rapid influx of new businesses entering the Valley each year.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">How long does it take to see results from a marketing agency in Phoenix?</h3>
              <p className="text-base text-neutral-600">Paid media campaigns typically generate leads within the first few weeks of launch. SEO and content marketing take longer — usually three to six months before organic rankings and traffic show meaningful improvement. The timeline depends on your industry, competition level, and starting position in the Phoenix market.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Do you work with businesses outside of central Phoenix?</h3>
              <p className="text-base text-neutral-600">Yes. We serve businesses across the entire Phoenix metro, including Scottsdale, Tempe, Mesa, Chandler, Gilbert, Glendale, and Peoria. Many of our campaigns are structured with geo-targeting at the submarket level so your marketing reaches the specific communities where your customers are located across the Valley.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Why should a Phoenix business hire a marketing agency instead of building an in-house team?</h3>
              <p className="text-base text-neutral-600">An agency gives you access to specialists across paid media, SEO, web development, and branding without the cost and time of hiring multiple full-time roles. In a fast-moving market like Phoenix — where real estate, healthcare, solar, and semiconductor industries are all growing simultaneously — an integrated team that can execute across channels from day one is often more efficient than building internally.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Grow Your Business in Phoenix?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Tell us about your goals and we&apos;ll build a proposal
              around your numbers — no obligation, no generic pitch decks.
              Just a clear plan designed for measurable results in
              Arizona&apos;s fastest-growing market.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
