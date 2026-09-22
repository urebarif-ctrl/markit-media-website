import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "SEO Services in Phoenix — Markit Media",
  description:
    "SEO services for businesses in Phoenix. Technical SEO, local SEO, and content SEO built for the Valley's competitive real estate, healthcare, solar energy, and financial services markets.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/phoenix/seo-services",
  },
  openGraph: {
    title: "SEO Services in Phoenix — Markit Media",
    description:
      "SEO services for Phoenix businesses. Technical SEO, local SEO, and content strategy for Arizona's fastest-growing metro and its competitive search landscape.",
  },
};

const serviceItems = [
  {
    title: "Technical SEO",
    desc: "Site architecture audits, crawlability improvements, schema markup, Core Web Vitals optimization, and indexation management. For Phoenix businesses operating across multiple Valley locations, this includes proper location page structures and internal linking architectures that help search engines understand your geographic coverage.",
  },
  {
    title: "Local SEO",
    desc: "Google Business Profile optimization, local citation building, review management, and geo-targeted content for Phoenix businesses competing in the local pack. Real estate firms, healthcare practices, home services companies, and solar installers depend on local visibility — we build the signals that drive it across every Valley submarket.",
  },
  {
    title: "Content SEO",
    desc: "Keyword research, content gap analysis, editorial calendar development, and SEO-driven content production. We target real search demand in the Phoenix market — from high-intent commercial queries in real estate and healthcare to informational content that builds authority in solar energy, fintech, and professional services.",
  },
  {
    title: "Link Building & Digital PR",
    desc: "Outreach-based link acquisition, guest content placement, and digital PR campaigns that build domain authority through editorially earned backlinks. Phoenix's active business media landscape, real estate publications, and healthcare industry outlets offer strong link-building opportunities for businesses with something worth covering.",
  },
  {
    title: "Competitor Analysis",
    desc: "Deep analysis of what your Phoenix competitors rank for, how their sites are structured, and where the gaps are. We identify the highest-value keyword opportunities that your competitors have missed or underserved in the Maricopa County search market.",
  },
  {
    title: "SEO Reporting & Analytics",
    desc: "Monthly reporting that tracks rankings, organic traffic, conversions, and revenue attribution. Every report explains what changed, why it matters, and what we are doing about it next — segmented by service area and keyword cluster so you see the full picture of your organic performance across the Valley.",
  },
];

const reasons = [
  {
    title: "Phoenix's growth creates both opportunity and competition",
    desc: "The Phoenix metro adds tens of thousands of new residents every year. That growth drives massive search demand for real estate, healthcare, home services, financial planning, and local businesses of every type. But it also means more competitors entering the market each month. Ranking in Phoenix requires a strategy built for a market that is expanding and getting more competitive simultaneously.",
  },
  {
    title: "Local SEO is critical in a sprawling metro",
    desc: "Phoenix is a city of distinct submarkets — Scottsdale, Tempe, Mesa, Chandler, Gilbert, Glendale, Peoria. Customers search by city and neighborhood, not just the Phoenix metro label. We build location-specific content and optimize your local presence at the submarket level so you capture traffic where your customers actually are across the Valley.",
  },
  {
    title: "Bilingual search behavior matters",
    desc: "Over 30% of the Phoenix metro population is Hispanic or Latino, and a meaningful share of local searches happen in Spanish. We identify where bilingual content and Spanish-language keyword targeting can expand your organic reach — and implement it properly with the right URL structures and content strategy, not machine-translated duplicates.",
  },
  {
    title: "Transparent process and realistic timelines",
    desc: "SEO takes sustained effort, and anyone promising first-page rankings in 30 days is not being straightforward. We set realistic expectations, explain exactly what we are doing and why, and report with metrics that reflect actual business outcomes — not vanity dashboards designed to look impressive without showing real impact.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Comprehensive SEO Audit",
    desc: "We start with a full technical audit — crawl errors, site speed, mobile usability, indexation issues, on-page gaps, and backlink profile analysis. For Phoenix businesses, we also audit local presence across Google Business Profile and citation sources, multi-location page architecture, and review signals across the Valley.",
  },
  {
    step: "02",
    title: "Keyword Research & Prioritization",
    desc: "We identify the keywords and topics with the highest business value for your Phoenix market. We factor in search volume, competition, commercial intent, and your current ranking position to build a prioritized target list — including location-modified terms across the Valley's major cities and submarkets.",
  },
  {
    step: "03",
    title: "Implementation & Content Production",
    desc: "Technical fixes are deployed first to remove ranking barriers. Then we execute the content roadmap — new pages, optimized existing content, location-specific landing pages, and supporting assets — while building links through outreach and digital PR in parallel.",
  },
  {
    step: "04",
    title: "Monitoring, Reporting & Iteration",
    desc: "We track rankings, traffic, and conversions on a continuous basis and report monthly. Strategy adjusts based on what the data shows — algorithm updates, competitor movements, seasonal demand patterns, and the rapid pace of new market entrants across the Phoenix metro.",
  },
];

export default function PhoenixSeoServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "SEO services for businesses in Phoenix. Technical SEO, local SEO, content strategy, and link building for the Valley's competitive search market.",
    areaServed: { "@type": "City", name: "Phoenix" },
    url: "https://themarkitmedia.com/en/locations/united-states/phoenix/seo-services",
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
                name: "How long does SEO take to produce results in the Phoenix market?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most Phoenix businesses begin to see meaningful improvements in organic rankings and traffic within three to six months of sustained effort. Competitive industries like real estate, healthcare, and solar energy may take longer due to the number of established competitors already investing in SEO across the Valley. We set realistic timelines during the strategy phase and report progress monthly so you can track momentum.",
                },
              },
              {
                "@type": "Question",
                name: "Why is local SEO important for Phoenix businesses?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Phoenix is a sprawling metro made up of distinct cities and submarkets — Scottsdale, Tempe, Mesa, Chandler, Gilbert, Glendale, and more. Customers search by specific city and neighborhood, not just the Phoenix metro label. Local SEO ensures your business appears in Google's local pack and map results for the specific communities you serve, which is where a significant share of high-intent local searches convert.",
                },
              },
              {
                "@type": "Question",
                name: "How does Phoenix's bilingual population affect SEO strategy?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Over 30 percent of the Phoenix metro population is Hispanic or Latino, and a meaningful volume of local searches happen in Spanish. For many businesses, Spanish-language keyword targeting and properly structured bilingual content can open up organic traffic that English-only competitors are missing entirely. We analyze your audience data to determine where bilingual SEO will deliver the strongest returns.",
                },
              },
              {
                "@type": "Question",
                name: "What industries do you serve with SEO in Phoenix?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We work with Phoenix businesses across real estate, healthcare, solar energy, home services, financial services, professional services, and the growing semiconductor and tech sectors driven by major investments like TSMC's Arizona facilities. Each industry has its own competitive landscape and keyword economics in the Valley, and we build SEO strategies tailored to those specific conditions.",
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
          { label: "Phoenix", href: "/locations/united-states/phoenix" },
          { label: "SEO Services" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Phoenix, Arizona</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              SEO Services for Businesses in Phoenix
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Phoenix&apos;s search market is growing as fast as the metro
              itself. Real estate, healthcare, solar energy, financial
              services, and home services businesses are all competing for
              organic visibility in a market that adds new competitors
              every month. Ranking here requires a strategy built for
              speed and scale.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media delivers technical SEO, local SEO, and content
              programs designed to capture organic traffic across the
              Phoenix metro — from Scottsdale and Tempe to Mesa, Chandler,
              and Gilbert.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Request a Free SEO Audit &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* Service Details */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="SEO services for Phoenix"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>
              SEO Services Built for the Phoenix Search Market
            </SectionTitle>
            <p className="text-base text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Our SEO programs cover the full spectrum — from the technical
              infrastructure that makes ranking possible to the content and
              link authority that drives it. Each component below can be
              engaged individually or as part of a comprehensive SEO
              retainer for the Phoenix market.
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

      {/* Why Phoenix Businesses Choose Markit Media for SEO */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why Phoenix businesses choose Markit Media for SEO"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Phoenix Businesses Choose Markit Media for SEO
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
        aria-label="Our SEO process"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Process</SectionLabel>
            <SectionTitle>
              How We Approach SEO for Phoenix Businesses
            </SectionTitle>
          </Animate>
          <div className="mt-12 space-y-8">
            {processSteps.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 80}>
                <div className="flex items-start gap-6">
                  <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black flex-shrink-0 w-12">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black">
                      {item.title}
                    </h3>
                    <p className="text-base text-gray-500 leading-relaxed mt-2">
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
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Related services"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Explore More</SectionLabel>
            <SectionTitle>Related Services in Phoenix</SectionTitle>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          >
            <Link
              href="/locations/united-states/phoenix/marketing-agency"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Marketing Agency
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Full-service marketing for Phoenix businesses.
              </p>
            </Link>
            <Link
              href="/locations/united-states/phoenix/ppc-ads"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                PPC Ads
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Google Ads and Meta Ads for Phoenix businesses.
              </p>
            </Link>
            <Link
              href="/locations/united-states/phoenix/website-development"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Website Development
              </h3>
              <p className="text-base text-gray-500 mt-2">
                WordPress, Shopify, and Next.js builds.
              </p>
            </Link>
            <Link
              href="/locations/united-states/phoenix"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                All Phoenix Services
              </h3>
              <p className="text-base text-gray-500 mt-2">
                View all services available in Phoenix.
              </p>
            </Link>
          </Stagger>
          <Animate animation="fade-up" delay={200}>
            <div className="mt-8">
              <Link
                href="/locations/united-states/phoenix"
                className="text-base font-bold text-black underline underline-offset-4 hover:text-gray-600 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                View all Phoenix services &rarr;
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
              <h3 className="text-lg font-semibold mb-2">How long does SEO take to produce results in the Phoenix market?</h3>
              <p className="text-base text-neutral-600">Most Phoenix businesses begin to see meaningful improvements in organic rankings and traffic within three to six months of sustained effort. Competitive industries like real estate, healthcare, and solar energy may take longer due to the number of established competitors already investing in SEO across the Valley. We set realistic timelines during the strategy phase and report progress monthly so you can track momentum.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Why is local SEO important for Phoenix businesses?</h3>
              <p className="text-base text-neutral-600">Phoenix is a sprawling metro made up of distinct cities and submarkets — Scottsdale, Tempe, Mesa, Chandler, Gilbert, Glendale, and more. Customers search by specific city and neighborhood, not just the Phoenix metro label. Local SEO ensures your business appears in Google&apos;s local pack and map results for the specific communities you serve, which is where a significant share of high-intent local searches convert.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">How does Phoenix&apos;s bilingual population affect SEO strategy?</h3>
              <p className="text-base text-neutral-600">Over 30 percent of the Phoenix metro population is Hispanic or Latino, and a meaningful volume of local searches happen in Spanish. For many businesses, Spanish-language keyword targeting and properly structured bilingual content can open up organic traffic that English-only competitors are missing entirely. We analyze your audience data to determine where bilingual SEO will deliver the strongest returns.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">What industries do you serve with SEO in Phoenix?</h3>
              <p className="text-base text-neutral-600">We work with Phoenix businesses across real estate, healthcare, solar energy, home services, financial services, professional services, and the growing semiconductor and tech sectors driven by major investments like TSMC&apos;s Arizona facilities. Each industry has its own competitive landscape and keyword economics in the Valley, and we build SEO strategies tailored to those specific conditions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Organic Growth Starts With the Right Foundation
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s find out where you stand in Phoenix&apos;s
              competitive search landscape and build a plan to capture the
              traffic your competitors are missing across the Valley.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Request a Free SEO Audit &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
