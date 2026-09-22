import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "SEO Services in Boston — Markit Media",
  description:
    "SEO services for businesses in Boston. Technical SEO, local SEO, and content SEO built for biotech, healthcare, fintech, and professional services competing in Greater Boston's demanding search landscape.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/boston/seo-services",
  },
  openGraph: {
    title: "SEO Services in Boston — Markit Media",
    description:
      "SEO services for businesses in Boston. Technical SEO, local SEO, and content strategy for Greater Boston's competitive innovation economy.",
  },
};

const serviceItems = [
  {
    title: "Technical SEO",
    desc: "Site architecture audits, crawlability improvements, schema markup, Core Web Vitals optimization, and indexation management. For Boston's B2B and institutional sites, this includes structured data for professional services, proper canonical handling across large content libraries, and site speed tuning for content-heavy platforms.",
  },
  {
    title: "Local SEO",
    desc: "Google Business Profile optimization, local citation building, review management, and geo-targeted content for Boston businesses competing in the local pack. Healthcare practices, law firms, financial advisors, and service providers across Back Bay, Cambridge, and the Seaport rely on local visibility to drive qualified inquiries.",
  },
  {
    title: "Content SEO",
    desc: "Keyword research, content gap analysis, editorial calendar development, and SEO-driven content production. We target real search demand in Boston's specialized verticals — biotech, healthcare, fintech, enterprise tech — where the audience expects substantive, technically accurate content, not generic filler.",
  },
  {
    title: "Link Building & Digital PR",
    desc: "Outreach-based link acquisition, guest content placement, and digital PR campaigns that build domain authority through editorially earned backlinks. Boston's concentration of universities, research institutions, and industry publications creates strong link-building opportunities for companies with genuine expertise to share.",
  },
  {
    title: "Competitor Analysis",
    desc: "Deep analysis of what your Boston competitors rank for, how their sites are structured, and where the gaps are. We identify the highest-value keyword opportunities in your specific vertical — whether that is biotech research terms, healthcare service queries, or B2B software comparisons.",
  },
  {
    title: "SEO Reporting & Analytics",
    desc: "Monthly reporting that tracks rankings, organic traffic, conversions, and revenue attribution across your target keyword categories. Every report explains what changed, why it matters, and what we are doing about it next — connected to business outcomes, not just traffic numbers.",
  },
];

const reasons = [
  {
    title: "Boston's search landscape rewards depth over volume",
    desc: "The audiences searching for biotech services, healthcare providers, financial advisors, and enterprise software in Boston are technically sophisticated. They use specific terminology, evaluate content critically, and dismiss shallow pages quickly. We build SEO programs around substantive content that matches the search intent and expertise level of your actual buyers — not keyword-stuffed pages designed to game algorithms.",
  },
  {
    title: "Local SEO drives high-value professional services leads",
    desc: "For healthcare practices, law firms, financial advisors, and B2B services with a physical presence in Boston, local search visibility translates directly to qualified inquiries. We optimize your local presence across Google Business Profile, citation networks, and geo-targeted content so you appear where Boston professionals and residents are actively searching for providers.",
  },
  {
    title: "Content authority in research-driven markets",
    desc: "Boston is home to some of the most research-intensive industries in the country. Biotech companies, healthcare systems, and university-adjacent organizations need content that demonstrates real expertise. We develop SEO content strategies that build topical authority through depth and accuracy — the kind of content that earns links, citations, and trust over time.",
  },
  {
    title: "Transparent process and realistic timelines",
    desc: "SEO takes sustained effort, and anyone promising first-page rankings in 30 days is not being straightforward. We set realistic expectations, explain exactly what we are doing and why, and report with metrics that reflect actual business outcomes — qualified leads, pipeline contribution, and revenue impact, not vanity traffic dashboards.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Comprehensive SEO Audit",
    desc: "We start with a full technical audit — crawl errors, site speed, mobile usability, indexation issues, on-page gaps, and backlink profile analysis. For Boston businesses, we also evaluate your local presence, content depth relative to competitors in your vertical, and the technical infrastructure supporting your site.",
  },
  {
    step: "02",
    title: "Keyword Research & Prioritization",
    desc: "We identify the keywords and topics with the highest business value for your Boston market — factoring in search volume, competition, commercial intent, and your current ranking position. The result is a prioritized target list organized by impact potential, not a spreadsheet of thousands of irrelevant terms.",
  },
  {
    step: "03",
    title: "Implementation & Content Production",
    desc: "Technical fixes are deployed first to remove ranking barriers. Then we execute the content roadmap — new pages, optimized existing content, thought leadership pieces, and supporting assets — while building links through outreach and digital PR in parallel across Boston's institutional and industry media landscape.",
  },
  {
    step: "04",
    title: "Monitoring, Reporting & Iteration",
    desc: "We track rankings, traffic, and conversions on a continuous basis and report monthly. Strategy adjusts based on what the data shows — algorithm updates, competitor movements, seasonal patterns in your industry, and shifts in search behavior across the Greater Boston market.",
  },
];

export default function BostonSeoServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "SEO services for businesses in Boston. Technical SEO, local SEO, content strategy, and link building for Greater Boston's competitive innovation economy.",
    areaServed: { "@type": "City", name: "Boston" },
    url: "https://themarkitmedia.com/en/locations/united-states/boston/seo-services",
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
                name: "How long does SEO take to produce results in Boston's competitive market?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most Boston businesses begin seeing measurable improvements in rankings and organic traffic within three to six months of sustained SEO work. Technical fixes and on-page optimization often produce early gains, while content programs and link building compound over a longer horizon. In highly competitive verticals like biotech, healthcare, and fintech — where established organizations dominate the search results — building meaningful organic visibility can take six to twelve months of consistent execution.",
                },
              },
              {
                "@type": "Question",
                name: "Do you offer local SEO for Boston businesses with a physical location?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Local SEO is a core part of our program for Boston businesses that serve a geographic area — healthcare practices, law firms, financial advisors, and service providers across Back Bay, Cambridge, the Seaport, and surrounding neighborhoods. We optimize your Google Business Profile, build consistent local citations, manage review generation, and create geo-targeted content to improve your visibility in the local map pack and localized search results.",
                },
              },
              {
                "@type": "Question",
                name: "What makes SEO different for biotech and healthcare companies in Boston?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Biotech and healthcare audiences search using specialized terminology and evaluate content with a high level of technical scrutiny. Ranking in these verticals requires content that demonstrates genuine subject-matter expertise — not keyword-stuffed pages. Additionally, healthcare content falls under Google's stricter quality standards for YMYL (Your Money or Your Life) topics, meaning E-E-A-T signals like author credentials, citations, and institutional authority carry more weight in rankings.",
                },
              },
              {
                "@type": "Question",
                name: "How do you measure SEO success for Boston businesses?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We track keyword rankings, organic traffic growth, and conversion metrics — but tie everything back to business outcomes like qualified leads, consultation requests, and pipeline contribution. Monthly reports show which pages and keywords are driving results, what changed in the competitive landscape, and what we are prioritizing next. For Boston's B2B sectors, we also monitor lead quality to ensure organic traffic is attracting the right audience, not just more visitors.",
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
          { label: "Boston", href: "/locations/united-states/boston" },
          { label: "SEO Services" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Boston</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              SEO Services for Businesses in Boston
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Boston&apos;s search market is competitive, specialized, and
              dominated by technically sophisticated audiences. Biotech
              companies, healthcare systems, fintech firms, and professional
              services providers all compete for visibility in keyword
              categories where content quality and technical authority
              determine who ranks.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media delivers technical SEO, local SEO, and content
              programs designed to capture organic traffic from the audiences
              that matter most to your business across the Greater Boston
              market.
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
        aria-label="SEO services for Boston"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>
              SEO Services Built for the Boston Search Market
            </SectionTitle>
            <p className="text-base text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Our SEO programs cover the full spectrum — from the technical
              infrastructure that makes ranking possible to the substantive
              content and link authority that drives it. Each component below
              can be engaged individually or as part of a comprehensive SEO
              retainer.
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

      {/* Why Boston Businesses Choose Markit Media for SEO */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why Boston businesses choose Markit Media for SEO"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Boston Businesses Choose Markit Media for SEO
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
              How We Approach SEO for Boston Businesses
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10"
          >
            <Link
              href="/locations/united-states/boston/marketing-agency"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <span className="text-base font-bold text-black">
                Marketing Agency in Boston
              </span>
              <p className="text-base text-gray-500 mt-1">
                Full-service marketing strategy and execution.
              </p>
            </Link>
            <Link
              href="/locations/united-states/boston/ppc-ads"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <span className="text-base font-bold text-black">
                PPC Ads in Boston
              </span>
              <p className="text-base text-gray-500 mt-1">
                Google Ads, Meta Ads, and LinkedIn campaigns for Boston.
              </p>
            </Link>
            <Link
              href="/locations/united-states/boston/website-development"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <span className="text-base font-bold text-black">
                Website Development in Boston
              </span>
              <p className="text-base text-gray-500 mt-1">
                WordPress, Shopify, and Next.js for Boston businesses.
              </p>
            </Link>
            <Link
              href="/locations/united-states/boston"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <span className="text-base font-bold text-black">
                All Boston Services
              </span>
              <p className="text-base text-gray-500 mt-1">
                View all services available in Boston.
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
              <h3 className="text-lg font-semibold mb-2">How long does SEO take to produce results in Boston&apos;s competitive market?</h3>
              <p className="text-base text-neutral-600">Most Boston businesses begin seeing measurable improvements in rankings and organic traffic within three to six months of sustained SEO work. Technical fixes and on-page optimization often produce early gains, while content programs and link building compound over a longer horizon. In highly competitive verticals like biotech, healthcare, and fintech — where established organizations dominate the search results — building meaningful organic visibility can take six to twelve months of consistent execution.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Do you offer local SEO for Boston businesses with a physical location?</h3>
              <p className="text-base text-neutral-600">Yes. Local SEO is a core part of our program for Boston businesses that serve a geographic area — healthcare practices, law firms, financial advisors, and service providers across Back Bay, Cambridge, the Seaport, and surrounding neighborhoods. We optimize your Google Business Profile, build consistent local citations, manage review generation, and create geo-targeted content to improve your visibility in the local map pack and localized search results.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">What makes SEO different for biotech and healthcare companies in Boston?</h3>
              <p className="text-base text-neutral-600">Biotech and healthcare audiences search using specialized terminology and evaluate content with a high level of technical scrutiny. Ranking in these verticals requires content that demonstrates genuine subject-matter expertise — not keyword-stuffed pages. Additionally, healthcare content falls under Google&apos;s stricter quality standards for YMYL (Your Money or Your Life) topics, meaning E-E-A-T signals like author credentials, citations, and institutional authority carry more weight in rankings.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">How do you measure SEO success for Boston businesses?</h3>
              <p className="text-base text-neutral-600">We track keyword rankings, organic traffic growth, and conversion metrics — but tie everything back to business outcomes like qualified leads, consultation requests, and pipeline contribution. Monthly reports show which pages and keywords are driving results, what changed in the competitive landscape, and what we are prioritizing next. For Boston&apos;s B2B sectors, we also monitor lead quality to ensure organic traffic is attracting the right audience, not just more visitors.</p>
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
              Let&apos;s find out where you stand in Boston&apos;s competitive
              search landscape and build a plan to capture the organic traffic
              your business deserves.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Request a Free SEO Audit &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
