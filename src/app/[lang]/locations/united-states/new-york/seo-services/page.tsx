import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "SEO Services in New York — Markit Media",
  description:
    "SEO agency serving businesses in New York. Technical SEO, local SEO, and content SEO to build organic visibility in one of the most competitive search markets in the country.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/new-york/seo-services",
  },
  openGraph: {
    title: "SEO Services in New York — Markit Media",
    description:
      "SEO agency serving businesses in New York. Technical SEO, local SEO, and content SEO to build organic visibility in one of the most competitive search markets in the country.",
  },
};

const serviceItems = [
  {
    title: "Technical SEO",
    desc: "Site architecture audits, crawlability fixes, Core Web Vitals optimization, structured data implementation, and indexation management to ensure search engines can properly access and understand your site.",
  },
  {
    title: "Local SEO",
    desc: "Google Business Profile optimization, local citation building, review management strategy, and geo-targeted content to help New York businesses appear in local search results and map packs.",
  },
  {
    title: "Content SEO",
    desc: "Keyword research, content strategy, blog production, landing page copywriting, and content gap analysis designed to capture search demand relevant to your New York audience.",
  },
  {
    title: "Link Building & Digital PR",
    desc: "Earned backlinks through content-driven outreach, industry publications, and digital PR campaigns that build domain authority without risking penalties from low-quality link schemes.",
  },
  {
    title: "Competitor Analysis",
    desc: "Deep analysis of how your New York competitors rank, what content drives their organic traffic, where their backlinks come from, and where the gaps in their strategy create opportunities for you.",
  },
  {
    title: "SEO Reporting & Analytics",
    desc: "Monthly reporting on keyword rankings, organic traffic trends, conversion data, and technical health — with actionable recommendations, not just dashboards full of numbers.",
  },
];

const reasons = [
  {
    title: "Built for a hypercompetitive search market",
    desc: "Organic search in the New York metro is among the most competitive in the country. Nearly every industry — finance, legal, healthcare, real estate, hospitality — has well-funded competitors investing heavily in SEO. We build strategies designed to compete at that level, prioritizing the opportunities where your business can realistically win.",
  },
  {
    title: "Technical depth, not just content volume",
    desc: "Many agencies approach SEO by publishing more blog posts. That approach fails in competitive markets where your competitors already have strong content. We start with the technical foundation — site speed, crawl efficiency, structured data, internal linking — and then layer content on top of a site that search engines can actually rank.",
  },
  {
    title: "Local and organic search together",
    desc: "For New York businesses that serve local customers, ranking in the map pack is just as important as ranking in organic results. We handle both — Google Business Profile optimization, local citations, and geo-targeted content alongside your broader organic strategy.",
  },
  {
    title: "Transparent reporting with business context",
    desc: "We report on metrics that matter to your business — organic leads, revenue from organic traffic, keyword positions for commercial terms — not vanity metrics. Every report includes context on what changed, why it matters, and what we&apos;re doing next.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "SEO Audit & Opportunity Analysis",
    desc: "We conduct a comprehensive audit covering technical health, content gaps, backlink profile, and competitive positioning in the New York market. The audit identifies what&apos;s holding your site back and where the highest-value opportunities are.",
  },
  {
    step: "02",
    title: "Strategy & Prioritization",
    desc: "Based on the audit, we build a prioritized roadmap. Not everything can happen at once, so we sequence work based on expected impact — fixing critical technical issues first, then targeting the keywords and content opportunities most likely to move the needle.",
  },
  {
    step: "03",
    title: "Execution & Content Production",
    desc: "We implement technical fixes, produce optimized content, build internal linking structures, and execute outreach campaigns for link acquisition. All work is documented and tracked against the original strategy.",
  },
  {
    step: "04",
    title: "Monitoring & Iteration",
    desc: "SEO results compound over time. We monitor rankings, traffic, and conversions continuously, adjusting the strategy as data comes in and as the competitive landscape in New York shifts.",
  },
];

export default function NewYorkSEOServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "SEO agency serving businesses in New York. Technical SEO, local SEO, and content SEO for organic search visibility.",
    areaServed: { "@type": "City", name: "New York" },
    url: "https://themarkitmedia.com/en/locations/united-states/new-york/seo-services",
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
                name: "How competitive is local SEO in New York?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Local SEO in New York is intensely competitive, particularly in dense commercial areas like Manhattan, where dozens of businesses in the same category may be competing for the same map pack results. Standing out requires a combination of strong Google Business Profile optimization, consistent citations, and a genuine review strategy.",
                },
              },
              {
                "@type": "Question",
                name: "How long does SEO take to show results in New York?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SEO timelines in New York tend to run longer than in less competitive markets because of the volume of established competitors already ranking for valuable terms. We focus on building a strong technical and content foundation early, since sustainable rankings in a market this competitive are earned progressively rather than overnight.",
                },
              },
              {
                "@type": "Question",
                name: "How do you optimize a Google Business Profile for a Manhattan location?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We optimize category selection, business descriptions, photos, posts, and review management, and make sure listing information is fully consistent across the web. For Manhattan specifically, proximity and relevance signals matter a great deal given how many competing businesses may be within a few blocks of each other.",
                },
              },
              {
                "@type": "Question",
                name: "What does a content strategy for the New York market look like?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "An effective content strategy for New York addresses the specific search intent of local customers, including neighborhood- and borough-level relevance, alongside the broader commercial topics your business competes on. We prioritize content that serves real search demand rather than publishing volume for its own sake.",
                },
              },
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "United States", href: "/locations/united-states" },
          { label: "New York", href: "/locations/united-states/new-york" },
          { label: "SEO Services" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>New York</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              SEO Services for Businesses in New York
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Ranking on the first page of Google in the New York market is not a
              matter of publishing a few blog posts and waiting. The competition is
              intense, the stakes are high, and the businesses that win organic search
              do so because they invest in it deliberately.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media provides SEO services to New York businesses across
              technical SEO, local search, and content — building organic visibility
              that compounds over time and reduces your dependence on paid advertising.
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
        aria-label="SEO services for New York businesses"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>
              SEO Services for the New York Market
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
        aria-label="Why New York businesses choose Markit Media for SEO"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why New York Businesses Choose Markit Media for SEO
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
            <SectionTitle>How We Approach SEO for New York Clients</SectionTitle>
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
                href="/locations/united-states/new-york"
                className="text-base font-bold text-black underline underline-offset-4 hover:text-gray-600 transition-colors"
              >
                View all New York services &rarr;
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
            <SectionTitle>
              Frequently Asked Questions About SEO Services in New York
            </SectionTitle>
          </Animate>
          <div className="mt-10 space-y-6">
            {[
              {
                q: "How competitive is local SEO in New York?",
                a: "Local SEO in New York is intensely competitive, particularly in dense commercial areas like Manhattan, where dozens of businesses in the same category may be competing for the same map pack results. Standing out requires a combination of strong Google Business Profile optimization, consistent citations, and a genuine review strategy.",
              },
              {
                q: "How long does SEO take to show results in New York?",
                a: "SEO timelines in New York tend to run longer than in less competitive markets because of the volume of established competitors already ranking for valuable terms. We focus on building a strong technical and content foundation early, since sustainable rankings in a market this competitive are earned progressively rather than overnight.",
              },
              {
                q: "How do you optimize a Google Business Profile for a Manhattan location?",
                a: "We optimize category selection, business descriptions, photos, posts, and review management, and make sure listing information is fully consistent across the web. For Manhattan specifically, proximity and relevance signals matter a great deal given how many competing businesses may be within a few blocks of each other.",
              },
              {
                q: "What does a content strategy for the New York market look like?",
                a: "An effective content strategy for New York addresses the specific search intent of local customers, including neighborhood- and borough-level relevance, alongside the broader commercial topics your business competes on. We prioritize content that serves real search demand rather than publishing volume for its own sake.",
              },
            ].map((faq, i) => (
              <Animate key={i} animation="fade-up" delay={i * 60}>
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black">
                    {faq.q}
                  </h3>
                  <p className="text-base text-gray-500 leading-relaxed mt-2">
                    {faq.a}
                  </p>
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
              Let&apos;s audit your site, identify the opportunities, and build an
              SEO strategy designed for the New York market.
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
