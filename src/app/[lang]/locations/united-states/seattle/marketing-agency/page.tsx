import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Marketing Agency in Seattle — Markit Media",
  description:
    "Full-service marketing agency for Seattle businesses. Strategy, execution, and analytics for cloud technology, aerospace, clean energy, gaming, and Pacific Northwest enterprises.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/seattle/marketing-agency",
  },
  openGraph: {
    title: "Marketing Agency in Seattle — Markit Media",
    description:
      "Full-service marketing agency for Seattle businesses. Strategy, execution, and analytics for cloud technology, aerospace, clean energy, gaming, and Pacific Northwest enterprises.",
  },
};

const serviceItems = [
  {
    title: "Marketing Strategy",
    desc: "Competitive analysis, audience research, and channel planning built for Seattle’s tech-driven economy — from cloud computing and e-commerce giants to aerospace manufacturers, clean energy startups, and outdoor lifestyle brands along the Puget Sound.",
  },
  {
    title: "Paid Media Management",
    desc: "Google Ads, Meta Ads, and LinkedIn campaigns structured for Seattle’s high-cost ad market, where reaching decision-makers at major tech companies, B2B SaaS firms, and enterprise buyers requires precision targeting and disciplined budget allocation.",
  },
  {
    title: "Search Engine Optimization",
    desc: "Technical audits, keyword strategy, and content production designed to capture organic demand across Seattle’s competitive industries — cloud services, aerospace, biotech, and professional services — and outrank established players in one of the most digitally savvy markets in the country.",
  },
  {
    title: "Social Media Marketing",
    desc: "Content strategy, community management, and paid social campaigns across LinkedIn, Instagram, and Meta — calibrated for Seattle’s mix of tech professionals, startup founders, and the Pacific Northwest’s environmentally conscious consumer base.",
  },
  {
    title: "Web Design & Development",
    desc: "WordPress, Shopify, and custom Next.js builds that load fast, convert visitors, and meet the expectations of Seattle’s tech-forward audience — where slow sites and dated design lose credibility before a conversation starts.",
  },
  {
    title: "Analytics & Reporting",
    desc: "Custom dashboards, conversion tracking, and attribution modeling that connect marketing spend to pipeline and revenue — giving Seattle businesses the data-driven visibility they expect to make informed decisions about where to invest next.",
  },
];

const reasons = [
  {
    title: "Built for Seattle’s tech and enterprise ecosystem",
    desc: "Seattle is home to some of the largest technology companies in the world — Amazon, Microsoft, and a deep bench of cloud, AI, and SaaS companies. Marketing in this environment means understanding long enterprise sales cycles, technical buyer personas, and the standard of sophistication these organizations expect from their partners.",
  },
  {
    title: "Coordinated execution across every channel",
    desc: "Seattle businesses competing in cloud computing, aerospace, and clean energy need campaigns that work together across paid media, organic search, social, and web. We manage all channels under one strategy so nothing runs in isolation and budget flows toward what actually drives results.",
  },
  {
    title: "Pacific Northwest reach, global ambition",
    desc: "Seattle is the Pacific Northwest’s economic hub and a gateway for Pacific Rim trade. We build marketing strategies that work locally across the metro — from Capitol Hill to Bellevue to the Eastside — and scale to support growth across national and international markets.",
  },
  {
    title: "Performance measured in business outcomes",
    desc: "We tie every campaign to pipeline generated and revenue influenced, not vanity metrics. Seattle’s competitive and high-cost market demands marketing that proves its return — and we structure reporting so you can see exactly what your investment produces.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Market Analysis",
    desc: "We audit your current marketing, analyze your competitive landscape in the Seattle metro, and identify the channels and tactics most likely to drive results in your specific industry — whether that is cloud technology, aerospace, gaming, or clean energy.",
  },
  {
    step: "02",
    title: "Strategy & Roadmap",
    desc: "We deliver a channel-by-channel plan with clear priorities, budgets, timelines, and KPIs — designed around the realities of marketing in a metro with a highly educated workforce and some of the most competitive digital advertisers in the country.",
  },
  {
    step: "03",
    title: "Execution & Launch",
    desc: "Our team builds and launches campaigns across your chosen channels — ad creative, landing pages, SEO content, and social assets — all coordinated under a single strategy tailored to the Seattle market.",
  },
  {
    step: "04",
    title: "Optimization & Growth",
    desc: "We monitor performance continuously, run structured tests, reallocate budget toward what converts, and scale winning campaigns while cutting underperformers — adapting as Seattle’s market dynamics evolve.",
  },
];

export default function SeattleMarketingAgencyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "Full-service marketing agency for Seattle businesses. Strategy, execution, and analytics for cloud technology, aerospace, clean energy, gaming, and Pacific Northwest enterprises.",
    areaServed: { "@type": "City", name: "Seattle" },
    url: "https://themarkitmedia.com/en/locations/united-states/seattle/marketing-agency",
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
                name: "What industries does Markit Media serve in Seattle?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We work with Seattle businesses across cloud computing, enterprise SaaS, aerospace and defense, clean energy, gaming, outdoor lifestyle brands, and professional services. Our strategies are built around the buyer personas, sales cycles, and competitive dynamics specific to each of these industries in the Puget Sound region.",
                },
              },
              {
                "@type": "Question",
                name: "How is marketing in Seattle different from other U.S. cities?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Seattle has one of the most educated workforces in the country, some of the highest digital ad costs, and a concentration of tech companies that raises the bar for marketing quality. Audiences here are technically literate, ad-savvy, and expect a higher standard of content and creative than most markets. Campaigns that work in less competitive metros often underperform here without significant adaptation.",
                },
              },
              {
                "@type": "Question",
                name: "Do you work with Seattle startups or only large enterprises?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We work with both. Our clients in Seattle range from early-stage SaaS companies and funded startups in South Lake Union to established enterprise organizations across the Eastside. We scale our services and engagement model to match each company's stage, budget, and growth objectives.",
                },
              },
              {
                "@type": "Question",
                name: "How do you measure marketing success for Seattle businesses?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We measure success by pipeline generated and revenue influenced, not vanity metrics like impressions or follower counts. Every campaign includes conversion tracking, attribution modeling, and monthly reporting that ties marketing spend directly to business outcomes.",
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
          { label: "Seattle", href: "/locations/united-states/seattle" },
          { label: "Marketing Agency" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Seattle</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              Marketing Agency Serving Businesses in Seattle
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Seattle is the technology capital of the Pacific Northwest
              &mdash; home to global cloud computing and e-commerce leaders, a
              legacy aerospace industry, a fast-growing clean energy sector,
              and one of the most competitive gaming ecosystems in the world.
              Marketing here means reaching decision-makers across enterprise
              tech, B2B SaaS, manufacturing, and a workforce that is among the
              most educated in the nation.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media serves Seattle businesses with full-service marketing
              &mdash; strategy, execution, and performance analytics &mdash;
              built to generate pipeline and revenue in one of the highest-cost
              ad markets in the country.
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
        aria-label="Marketing services for Seattle businesses"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>Full-Service Marketing for Seattle</SectionTitle>
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

      {/* Why Markit Media */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why Seattle businesses choose Markit Media"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Seattle Businesses Choose Markit Media for Marketing
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
        aria-label="Our marketing process"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Process</SectionLabel>
            <SectionTitle>How We Work With Seattle Clients</SectionTitle>
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
            <SectionTitle>Related Services</SectionTitle>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          >
            <Link
              href="/locations/united-states/seattle/ppc-ads"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                PPC Ads
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Paid media campaigns built for measurable ROI in Seattle.
              </p>
            </Link>
            <Link
              href="/locations/united-states/seattle/seo-services"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                SEO Services
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Organic search visibility through technical and content SEO.
              </p>
            </Link>
            <Link
              href="/locations/united-states/seattle/website-development"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Website Development
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Fast, conversion-focused websites for Seattle businesses.
              </p>
            </Link>
            <Link
              href="/services/branding"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Branding
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Visual identity and brand strategy for competitive markets.
              </p>
            </Link>
          </Stagger>
          <Animate animation="fade-up" delay={200}>
            <div className="mt-8">
              <Link
                href="/locations/united-states/seattle"
                className="text-base font-bold text-black underline underline-offset-4 hover:text-gray-600 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                View all Seattle services &rarr;
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
              <h3 className="text-lg font-semibold mb-2">What industries does Markit Media serve in Seattle?</h3>
              <p className="text-base text-neutral-600">We work with Seattle businesses across cloud computing, enterprise SaaS, aerospace and defense, clean energy, gaming, outdoor lifestyle brands, and professional services. Our strategies are built around the buyer personas, sales cycles, and competitive dynamics specific to each of these industries in the Puget Sound region.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">How is marketing in Seattle different from other U.S. cities?</h3>
              <p className="text-base text-neutral-600">Seattle has one of the most educated workforces in the country, some of the highest digital ad costs, and a concentration of tech companies that raises the bar for marketing quality. Audiences here are technically literate, ad-savvy, and expect a higher standard of content and creative than most markets. Campaigns that work in less competitive metros often underperform here without significant adaptation.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Do you work with Seattle startups or only large enterprises?</h3>
              <p className="text-base text-neutral-600">We work with both. Our clients in Seattle range from early-stage SaaS companies and funded startups in South Lake Union to established enterprise organizations across the Eastside. We scale our services and engagement model to match each company&apos;s stage, budget, and growth objectives.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">How do you measure marketing success for Seattle businesses?</h3>
              <p className="text-base text-neutral-600">We measure success by pipeline generated and revenue influenced, not vanity metrics like impressions or follower counts. Every campaign includes conversion tracking, attribution modeling, and monthly reporting that ties marketing spend directly to business outcomes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Compete in Seattle?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy that drives real results in
              the Pacific Northwest&apos;s most competitive market.
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
