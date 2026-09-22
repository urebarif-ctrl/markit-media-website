import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "SEO Services in Atlanta — Markit Media",
  description:
    "SEO agency serving businesses in Atlanta. Technical SEO, local SEO, and content SEO to build organic visibility across logistics, healthcare, fintech, entertainment, and Fortune 500 sectors.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/atlanta/seo-services",
  },
  openGraph: {
    title: "SEO Services in Atlanta — Markit Media",
    description:
      "SEO agency serving businesses in Atlanta. Technical SEO, local SEO, and content SEO to build organic visibility across logistics, healthcare, fintech, entertainment, and Fortune 500 sectors.",
  },
};

const serviceItems = [
  {
    title: "Technical SEO",
    desc: "Site architecture audits, crawlability fixes, Core Web Vitals optimization, structured data implementation, and indexation management — ensuring search engines can properly access and understand your site in a market where established Atlanta competitors already hold strong organic positions.",
  },
  {
    title: "Local SEO",
    desc: "Google Business Profile optimization, local citation building, review management strategy, and geo-targeted content to help Atlanta businesses appear in local search results and map packs across the metro — from Buckhead and Midtown to Decatur, Marietta, and the Perimeter.",
  },
  {
    title: "Content SEO",
    desc: "Keyword research, content strategy, blog production, and landing page copywriting designed to capture search demand relevant to Atlanta industries — from logistics and supply chain thought leadership to healthcare provider content, fintech education, and entertainment industry resources.",
  },
  {
    title: "Link Building & Digital PR",
    desc: "Earned backlinks through content-driven outreach, industry publications, and digital PR campaigns that build domain authority. Atlanta’s deep corporate networks and thriving business community create opportunities for meaningful, high-relevance link acquisition.",
  },
  {
    title: "Competitor Analysis",
    desc: "Deep analysis of how your Atlanta competitors rank, what content drives their organic traffic, where their backlinks come from, and where the gaps in their strategy create opportunities for your business to gain ground in this high-competition metro.",
  },
  {
    title: "SEO Reporting & Analytics",
    desc: "Monthly reporting on keyword rankings, organic traffic trends, conversion data, and technical health — with actionable recommendations tied to your Atlanta market objectives, not just dashboards full of numbers.",
  },
];

const reasons = [
  {
    title: "Strategy shaped by Atlanta’s economic landscape",
    desc: "Atlanta’s economy is driven by logistics and supply chain operations anchored by the world’s busiest airport, a healthcare sector centered around institutions like the CDC and Emory, a growing fintech corridor, and one of the largest concentrations of Fortune 500 headquarters in the country. Each sector has distinct search behavior and competitive dynamics. We build SEO strategies that account for how your specific audience searches.",
  },
  {
    title: "Technical depth, not just content volume",
    desc: "Many agencies approach SEO by publishing more blog posts. That approach fails in competitive markets where established Atlanta businesses already have strong content libraries. We start with the technical foundation — site speed, crawl efficiency, structured data, internal linking — and then layer content on top of a site that search engines can actually rank.",
  },
  {
    title: "Local and organic search together",
    desc: "Atlanta is geographically sprawling. For businesses that serve customers across the metro — from Sandy Springs to East Atlanta to Alpharetta — ranking in the map pack is just as important as ranking in organic results. We handle both: Google Business Profile optimization, local citations, and geo-targeted content alongside your broader organic strategy.",
  },
  {
    title: "Transparent reporting with business context",
    desc: "We report on metrics that matter to your business — organic leads, revenue from organic traffic, keyword positions for commercial terms — not vanity metrics. Every report includes context on what changed, why it matters, and what we are doing next.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "SEO Audit & Opportunity Analysis",
    desc: "We conduct a comprehensive audit covering technical health, content gaps, backlink profile, and competitive positioning in the Atlanta market. The audit identifies what is holding your site back and where the highest-value opportunities are — whether that is local search visibility, industry-specific content, or technical fixes.",
  },
  {
    step: "02",
    title: "Strategy & Prioritization",
    desc: "Based on the audit, we build a prioritized roadmap. Not everything can happen at once, so we sequence work based on expected impact — fixing critical technical issues first, then targeting the keywords and content opportunities most likely to drive results in Atlanta.",
  },
  {
    step: "03",
    title: "Execution & Content Production",
    desc: "We implement technical fixes, produce optimized content, build internal linking structures, and execute outreach campaigns for link acquisition. All work is documented and tracked against the original strategy.",
  },
  {
    step: "04",
    title: "Monitoring & Iteration",
    desc: "SEO results compound over time. We monitor rankings, traffic, and conversions continuously, adjusting the strategy as data comes in and as the competitive landscape in Atlanta evolves with the market.",
  },
];

const faqs = [
  {
    q: "Do you handle local SEO for specific Atlanta neighborhoods?",
    a: "Yes. We optimize Google Business Profiles and local citations for the neighborhoods and submarkets that matter to your business, from Buckhead and Midtown to Decatur, Marietta, and the Perimeter, so you show up in local search and map results where your customers are searching.",
  },
  {
    q: "How do you approach SEO competition across the Southeast region, not just Atlanta?",
    a: "For businesses that compete beyond the city limits, we build content and technical strategies that account for competitors across the broader Southeast region, not just those within Atlanta proper.",
  },
  {
    q: "What does Google Business Profile optimization involve for Atlanta businesses?",
    a: "We optimize profile categories, service areas, photos, and posts, and build a review management strategy, all calibrated to how Atlanta consumers search for services across the metro's many distinct neighborhoods and suburbs.",
  },
  {
    q: "How do you create content for Atlanta's diverse market?",
    a: "Atlanta's population and business community span a wide range of industries and audiences. We research the specific language, questions, and search behavior relevant to your audience segment rather than applying generic content to every business.",
  },
];

export default function AtlantaSEOServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "SEO agency serving businesses in Atlanta. Technical SEO, local SEO, and content SEO for organic search visibility.",
    areaServed: { "@type": "City", name: "Atlanta" },
    url: "https://themarkitmedia.com/en/locations/united-states/atlanta/seo-services",
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
          { label: "Atlanta", href: "/locations/united-states/atlanta" },
          { label: "SEO Services" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Atlanta</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              SEO Services for Businesses in Atlanta
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Atlanta is a metro of over six million people with deep
              concentrations in logistics, healthcare, fintech, entertainment,
              and corporate headquarters. The businesses that dominate organic
              search in this market invest in it deliberately &mdash; strong
              technical foundations, targeted content, and consistent execution
              over time.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media provides SEO services to Atlanta businesses across
              technical SEO, local search, and content &mdash; building organic
              visibility that compounds over time and reduces your dependence on
              paid advertising.
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
        aria-label="SEO services for Atlanta businesses"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>
              SEO Services for the Atlanta Market
            </SectionTitle>
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
        aria-label="Why Atlanta businesses choose Markit Media for SEO"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Atlanta Businesses Choose Markit Media for SEO
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
            <SectionTitle>How We Approach SEO for Atlanta Clients</SectionTitle>
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
                SEO Services
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Full SEO capabilities across technical, local, and content.
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
                Site architecture, speed, crawlability, and structured data.
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
                Google Business Profile, citations, and local rankings.
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
                Keyword strategy, content production, and content gap analysis.
              </p>
            </Link>
          </Stagger>
          <Animate animation="fade-up" delay={200}>
            <div className="mt-8">
              <Link
                href="/locations/united-states/atlanta"
                className="text-base font-bold text-black underline underline-offset-4 hover:text-gray-600 transition-colors"
              >
                View all Atlanta services &rarr;
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
            <SectionTitle>Frequently Asked Questions About SEO Services in Atlanta</SectionTitle>
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
              Let&apos;s audit your site, identify the opportunities, and build
              an SEO strategy designed for the Atlanta market.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none"
            >
              Request a Free SEO Audit &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
