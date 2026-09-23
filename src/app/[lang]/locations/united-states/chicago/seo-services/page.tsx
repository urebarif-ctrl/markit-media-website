import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "SEO Services in Chicago — Markit Media",
  description:
    "Markit Media provides technical SEO, local SEO, and content strategy for businesses in Chicago. Organic growth for B2B, manufacturing, professional services, and multi-location companies.",
  alternates: { canonical: "https://themarkitmedia.com/en/locations/united-states/chicago/seo-services" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Markit Media",
  description:
    "SEO agency serving businesses in Chicago with technical SEO, local SEO, and content strategy for sustainable organic growth.",
  areaServed: { "@type": "City", name: "Chicago" },
  url: "https://themarkitmedia.com/en/locations/united-states/chicago/seo-services",
};

const faqs = [
  {
    q: "What does local SEO look like for a Chicago business?",
    a: "Local SEO in Chicago means optimizing for searches tied to the city and its neighborhoods, ensuring your business shows up in local map results and organic listings when nearby customers search for your services.",
  },
  {
    q: "How competitive is ranking for search terms in the Midwest market?",
    a: "Competition varies by industry and keyword, but Chicago is the largest market in the Midwest, so many categories see meaningful competition from other local and regional businesses. We build technical and content strategies suited to how competitive your specific space is, rather than assuming one level of difficulty applies everywhere.",
  },
  {
    q: "Do you optimize Google Business Profiles for specific Chicago neighborhoods?",
    a: "Yes. If you serve customers in particular neighborhoods or have multiple locations across the city, we optimize your Google Business Profile and supporting citations to reflect those specific areas, which helps you appear in relevant local searches.",
  },
  {
    q: "What kind of content do you create for Chicago-based businesses?",
    a: "Content built around the keywords your actual customers search for, informed by your industry and location. That can include service pages, local resource content, and articles that establish authority on the topics that matter to Chicago buyers — not generic content unrelated to your market.",
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
    title: "Technical SEO",
    description:
      "Site architecture audits, crawlability improvements, Core Web Vitals optimisation, structured data implementation, and indexation management. The foundation that makes every other SEO effort effective.",
  },
  {
    title: "Local SEO",
    description:
      "Google Business Profile optimisation, local citation building, review management, and geo-targeted content. Essential for businesses serving customers in specific Chicago neighbourhoods or across the metro area.",
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
    title: "Deep Understanding of B2B Search",
    description:
      "Chicago&apos;s economy is heavily B2B — manufacturing, financial services, logistics, and professional services. B2B SEO is fundamentally different from consumer search: lower volumes, higher intent, longer consideration cycles, and content that needs to speak to technical decision-makers. We build strategies around those realities.",
  },
  {
    title: "Local SEO for a Competitive Metro",
    description:
      "With nearly ten million people in the metro area and intense competition across every service category, ranking in Chicago&apos;s local search results requires more than claiming a Google Business Profile. We implement the technical signals, citation consistency, and localised content that move the needle in a crowded market.",
  },
  {
    title: "Content That Drives Pipeline",
    description:
      "We don&apos;t produce content for the sake of publishing. Every article, landing page, and resource we create targets a specific stage of the buyer&apos;s journey and a keyword cluster with demonstrated commercial value. The goal is pipeline contribution, not page views.",
  },
  {
    title: "Transparent Methodology",
    description:
      "No black-box tactics, no guaranteed rankings, no shortcuts. We explain exactly what we&apos;re doing, why, and how it connects to your business goals. Chicago companies value straight talk — that&apos;s how we operate.",
  },
];

const steps = [
  {
    number: "01",
    title: "SEO Audit",
    description:
      "A comprehensive review of your technical foundation, content inventory, backlink profile, and competitive landscape. The audit identifies what&apos;s holding your site back and where the highest-impact opportunities are.",
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

export default function ChicagoSeoServicesPage() {
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
              { label: "SEO Services" },
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
              SEO Services for Businesses in Chicago
            </h1>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <p className="mt-6 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Organic search is the highest-leverage acquisition channel for most
              businesses in Chicago. Whether you&apos;re competing for local
              service queries across the metro, targeting national B2B keywords in
              manufacturing or financial services, or building thought leadership
              content that drives inbound leads — SEO compounds over time in a way
              that paid media cannot.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={300}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Markit Media provides technical SEO, local SEO, and content strategy
              for businesses across the Chicago market. We focus on the work that
              moves rankings and drives qualified traffic — no filler, no vanity
              metrics, no shortcuts.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={400}>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-black px-10 py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
            >
              Request an SEO Audit
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
              SEO services for the Chicago market
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

      {/* Why Chicago Businesses Choose Us */}
      <section aria-label="Why Markit Media" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              Why Chicago businesses choose Markit Media for SEO
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
      <section aria-label="Our Process" className="bg-gray-50 py-20 lg:py-28">
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
      <section aria-label="Related Services" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Related Services</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              Explore our SEO capabilities
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              SEO spans technical, content, and local disciplines. These pages go
              deeper into each area of expertise.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={250}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/services/seo"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline"
              >
                SEO Services
              </Link>
              <Link
                href="/services/seo/technical-seo"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline"
              >
                Technical SEO
              </Link>
              <Link
                href="/services/seo/local-seo"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline"
              >
                Local SEO
              </Link>
              <Link
                href="/services/seo/content-seo"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline"
              >
                Content SEO
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
            <SectionTitle>Frequently Asked Questions About SEO Services in Chicago</SectionTitle>
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
      <section aria-label="Start ranking where Chicago customers are searching" className="bg-black py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Animate animation="scale-in">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-white tracking-tight leading-tight">
              Start ranking where Chicago customers are searching
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
              className="mt-10 inline-block rounded-full bg-white px-10 py-4 text-base font-bold text-black transition-opacity hover:opacity-90"
            >
              Get Your Free Audit
            </Link>
          </Animate>
        </div>
      </section>
    </>
  );
}
