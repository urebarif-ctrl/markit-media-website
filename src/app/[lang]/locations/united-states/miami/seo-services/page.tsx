import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "SEO Services in Miami — Markit Media",
  description:
    "SEO services for businesses in Miami. Technical SEO, local SEO, and content SEO built for Miami's bilingual search landscape, tourism-driven queries, and competitive real estate and hospitality markets.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/miami/seo-services",
  },
  openGraph: {
    title: "SEO Services in Miami — Markit Media",
    description:
      "SEO services for businesses in Miami. Technical SEO, local SEO, and bilingual content strategy for South Florida's competitive search market.",
  },
};

const serviceItems = [
  {
    title: "Technical SEO",
    desc: "Site architecture audits, crawlability improvements, schema markup, Core Web Vitals optimization, and indexation management. For Miami's bilingual sites, this includes proper hreflang implementation and language-specific URL structures that search engines can parse correctly.",
  },
  {
    title: "Local SEO",
    desc: "Google Business Profile optimization, local citation building, review management, and geo-targeted content for Miami businesses competing in the local pack. Restaurants, hotels, medical practices, and service providers depend on local visibility — we build the signals that drive it.",
  },
  {
    title: "Content SEO",
    desc: "Keyword research, content gap analysis, editorial calendar development, and SEO-driven content production in both English and Spanish. We target real search demand in Miami's bilingual market — not keyword-stuffed filler that reads like it was written for a bot.",
  },
  {
    title: "Link Building & Digital PR",
    desc: "Outreach-based link acquisition, guest content placement, and digital PR campaigns that build domain authority through editorially earned backlinks. Miami's tourism, hospitality, and lifestyle media landscape offers strong link-building opportunities for businesses with something worth covering.",
  },
  {
    title: "Competitor Analysis",
    desc: "Deep analysis of what your Miami competitors rank for, how their sites are structured, and where the gaps are. We identify the highest-value keyword opportunities that your competitors have missed or underserved in the South Florida market.",
  },
  {
    title: "SEO Reporting & Analytics",
    desc: "Monthly reporting that tracks rankings, organic traffic, conversions, and revenue attribution across both English and Spanish search queries. Every report explains what changed, why it matters, and what we are doing about it next.",
  },
];

const reasons = [
  {
    title: "Miami's bilingual search landscape requires a different approach",
    desc: "Miami-Dade County is over 70% Hispanic or Latino, and a significant portion of local searches happen in Spanish. Ranking in Miami means optimizing for both English and Spanish search queries, producing content in both languages, and structuring your site so search engines serve the right language to the right user. Most SEO agencies treat bilingual optimization as a translation task. It is not — it requires separate keyword research, distinct content strategies, and proper technical implementation.",
  },
  {
    title: "Tourism-intent keywords drive major traffic",
    desc: "Miami draws over 26 million visitors per year. The search queries these visitors generate — restaurants, hotels, activities, transportation, shopping — represent significant organic traffic opportunities for local businesses. We build SEO strategies that capture tourism-intent searches alongside year-round local demand, so your visibility does not depend on a single audience segment.",
  },
  {
    title: "Local SEO is critical in a neighborhood-driven market",
    desc: "Miami is a city of distinct neighborhoods — Brickell, Wynwood, Coral Gables, Little Havana, South Beach, Coconut Grove. Customers search by neighborhood, not just by city. We build location-specific content and optimize your local presence at the neighborhood level, not just for the generic Miami metro area.",
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
    desc: "We start with a full technical audit — crawl errors, site speed, mobile usability, indexation issues, on-page gaps, and backlink profile analysis. For Miami businesses, we also audit bilingual implementation, local presence across Google Business Profile and citation sources, and review signals.",
  },
  {
    step: "02",
    title: "Keyword Research & Prioritization",
    desc: "We identify the keywords and topics with the highest business value for your Miami market — in both English and Spanish. We factor in search volume, competition, commercial intent, and your current ranking position to build a prioritized target list, not a spreadsheet of thousands of irrelevant terms.",
  },
  {
    step: "03",
    title: "Implementation & Content Production",
    desc: "Technical fixes are deployed first to remove ranking barriers. Then we execute the content roadmap — new pages, optimized existing content, bilingual landing pages, and supporting assets — while building links through outreach and digital PR in parallel.",
  },
  {
    step: "04",
    title: "Monitoring, Reporting & Iteration",
    desc: "We track rankings, traffic, and conversions on a continuous basis and report monthly. Strategy adjusts based on what the data shows — algorithm updates, competitor movements, seasonal tourism patterns, and shifts in the South Florida search market all factor into ongoing optimization.",
  },
];

const faqs = [
  {
    q: "Do you offer bilingual SEO for Miami businesses?",
    a: "Yes. We conduct separate keyword research and content strategy for English and Spanish search queries, and structure sites so search engines serve the right language to the right user.",
  },
  {
    q: "How do you handle Miami's competitive local search market?",
    a: "We build location-specific content and local SEO signals at the neighborhood level — Brickell, Wynwood, Coral Gables, Little Havana, South Beach, Coconut Grove — rather than optimizing only for the broader Miami metro area.",
  },
  {
    q: "Do you optimize Google Business Profiles for Miami neighborhoods?",
    a: "Yes. We optimize Google Business Profile listings, manage citations, and build the local signals that drive visibility in the local pack for each neighborhood you serve.",
  },
  {
    q: "Do you target tourism-related search keywords?",
    a: "Yes. We build SEO strategies that capture tourism-intent searches — restaurants, hotels, activities — alongside year-round local demand, so your visibility isn't dependent on a single audience segment.",
  },
];

export default function MiamiSEOServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "SEO services for businesses in Miami. Technical SEO, local SEO, bilingual content strategy, and link building for Miami's competitive search market.",
    areaServed: { "@type": "City", name: "Miami" },
    url: "https://themarkitmedia.com/en/locations/united-states/miami/seo-services",
  };

  const faqSchema = {
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
  };

  return (
    <article>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "United States", href: "/locations/united-states" },
          { label: "Miami", href: "/locations/united-states/miami" },
          { label: "SEO Services" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Miami</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              SEO Services for Businesses in Miami
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Miami&apos;s search market is bilingual, tourism-driven, and
              fiercely competitive across real estate, hospitality, and local
              services. Ranking here requires more than generic SEO — it demands
              a strategy built for how people actually search in South Florida.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media delivers technical SEO, local SEO, and bilingual
              content programs designed to capture organic traffic from both
              English and Spanish-speaking audiences across the Miami metro area.
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
        aria-label="SEO services for Miami"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>
              SEO Services Built for the Miami Search Market
            </SectionTitle>
            <p className="text-base text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Our SEO programs cover the full spectrum — from the technical
              infrastructure that makes ranking possible to the bilingual content
              and link authority that drives it. Each component below can be
              engaged individually or as part of a comprehensive SEO retainer.
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

      {/* Why Miami Businesses Choose Markit Media for SEO */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why Miami businesses choose Markit Media for SEO"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Miami Businesses Choose Markit Media for SEO
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
              How We Approach SEO for Miami Businesses
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
            <SectionTitle>Related Services</SectionTitle>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          >
            <Link
              href="/services/seo"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                SEO
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Our full SEO service overview.
              </p>
            </Link>
            <Link
              href="/services/seo/technical-seo"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Technical SEO
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Site architecture, speed, and crawlability.
              </p>
            </Link>
            <Link
              href="/services/seo/local-seo"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Local SEO
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Google Business Profile and local visibility.
              </p>
            </Link>
            <Link
              href="/services/seo/content-seo"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Content SEO
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Keyword-driven content strategy and production.
              </p>
            </Link>
          </Stagger>
          <Animate animation="fade-up" delay={200}>
            <div className="mt-8">
              <Link
                href="/locations/united-states/miami"
                className="text-base font-bold text-black underline underline-offset-4 hover:text-gray-600 transition-colors motion-reduce:transition-none"
              >
                View all Miami services &rarr;
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
            <SectionTitle>Frequently Asked Questions About SEO Services in Miami</SectionTitle>
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
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Organic Growth Starts With the Right Foundation
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s find out where you stand in Miami&apos;s bilingual
              search landscape and build a plan to capture the traffic your
              competitors are missing.
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
