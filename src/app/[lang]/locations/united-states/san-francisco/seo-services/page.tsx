import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "SEO Services in San Francisco — Markit Media",
  description:
    "SEO agency serving businesses in San Francisco. Technical SEO, local SEO, and content SEO to build organic visibility for SaaS, biotech, fintech, and technology companies in the Bay Area.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/san-francisco/seo-services",
  },
  openGraph: {
    title: "SEO Services in San Francisco — Markit Media",
    description:
      "SEO agency serving businesses in San Francisco. Technical SEO, local SEO, and content SEO to build organic visibility for SaaS, biotech, fintech, and technology companies in the Bay Area.",
  },
};

const serviceItems = [
  {
    title: "Technical SEO",
    desc: "Site architecture audits, crawlability fixes, Core Web Vitals optimization, structured data implementation, and indexation management — critical in San Francisco’s market where well-funded competitors invest heavily in technical infrastructure and your site needs to match their engineering standards.",
  },
  {
    title: "Local SEO",
    desc: "Google Business Profile optimization, local citation building, review management strategy, and geo-targeted content to help San Francisco businesses capture local search demand across the Bay Area — from SOMA and the Financial District to South San Francisco’s biotech corridor.",
  },
  {
    title: "Content SEO",
    desc: "Keyword research, content strategy, blog production, and landing page copywriting designed to capture search demand relevant to San Francisco’s industries — from SaaS product-led growth content and biotech thought leadership to fintech compliance and regulation guides.",
  },
  {
    title: "Link Building & Digital PR",
    desc: "Earned backlinks through content-driven outreach, industry publications, and digital PR campaigns that build domain authority. San Francisco’s deep technology and startup networks create opportunities for high-relevance, high-authority link acquisition.",
  },
  {
    title: "Competitor Analysis",
    desc: "Deep analysis of how your San Francisco competitors rank, what content drives their organic traffic, where their backlinks originate, and where the gaps in their strategy create opportunities — especially useful when competing against well-funded companies with established content programs.",
  },
  {
    title: "SEO Reporting & Analytics",
    desc: "Monthly reporting on keyword rankings, organic traffic trends, conversion data, and technical health — with actionable recommendations tied to your growth objectives, not vanity dashboards that look impressive but do not connect to pipeline or revenue.",
  },
];

const reasons = [
  {
    title: "Strategy shaped by San Francisco’s competitive landscape",
    desc: "San Francisco’s search results are dominated by well-funded SaaS companies, established biotech firms, and fintech brands with large content teams. A generic SEO playbook will not break through. We build strategies that account for the specific competitive dynamics, content expectations, and search behavior patterns of your industry in the Bay Area.",
  },
  {
    title: "Technical depth for technology companies",
    desc: "Many agencies approach SEO by publishing more blog posts. That approach fails in San Francisco’s market where your competitors already have mature content libraries and strong technical foundations. We start with site architecture, page speed, structured data, and internal linking — then layer content on top of infrastructure that search engines can actually rank.",
  },
  {
    title: "Local and organic search working together",
    desc: "San Francisco businesses that serve Bay Area customers need visibility in both map pack results and organic listings. We handle Google Business Profile optimization, local citations, and geo-targeted content alongside your broader organic strategy — covering everything from neighborhood-level searches to industry-wide category terms.",
  },
  {
    title: "Reporting that connects to business metrics",
    desc: "We report on metrics that matter to growth teams and investors — organic pipeline, revenue from organic traffic, keyword positions for high-commercial-intent terms — not page views and bounce rates. Every report includes context on what changed, why it matters, and what we are doing next.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "SEO Audit & Opportunity Analysis",
    desc: "We conduct a comprehensive audit covering technical health, content gaps, backlink profile, and competitive positioning in the San Francisco market. The audit identifies what is holding your site back and where the highest-value opportunities are — whether that is technical fixes, product-led content, or untapped keyword categories.",
  },
  {
    step: "02",
    title: "Strategy & Prioritization",
    desc: "Based on the audit, we build a prioritized roadmap. Not everything can happen at once, so we sequence work based on expected impact — fixing critical technical issues first, then targeting the keywords and content opportunities most likely to produce results in San Francisco’s competitive search landscape.",
  },
  {
    step: "03",
    title: "Execution & Content Production",
    desc: "We implement technical fixes, produce optimized content, build internal linking structures, and execute outreach campaigns for link acquisition. All work is documented and tracked against the original strategy and your growth milestones.",
  },
  {
    step: "04",
    title: "Monitoring & Iteration",
    desc: "SEO results compound over time. We monitor rankings, traffic, and conversions continuously, adjusting the strategy as data comes in and as the competitive landscape in San Francisco evolves — which, in the Bay Area’s fast-moving market, happens frequently.",
  },
];

const faqs = [
  {
    q: "Why is SEO more competitive in San Francisco than other cities?",
    a: "San Francisco is home to a dense concentration of well-resourced tech companies, many of which run dedicated content and SEO teams. That means ranking for competitive terms often requires going up against companies with significant existing domain authority and content libraries, not just local competitors.",
  },
  {
    q: "What does a content strategy look like for a San Francisco startup?",
    a: "We start with the keywords and questions your actual buyers are searching, then build content that demonstrates real expertise rather than surface-level coverage. For startups without an existing content footprint, this usually means prioritizing a smaller number of high-intent topics before expanding.",
  },
  {
    q: "How do you compete with established tech company blogs?",
    a: "Rather than trying to out-publish companies with large content teams, we look for topic gaps, more specific long-tail queries, and angles those larger blogs haven’t covered well — areas where a focused, well-executed piece can outrank a broader one.",
  },
  {
    q: "Does local SEO matter for a company based in San Francisco?",
    a: "It depends on the business. Companies serving specific San Francisco neighborhoods or the broader Bay Area benefit from local SEO fundamentals — Google Business Profile optimization, location-specific content, and citations — alongside their core SEO strategy. Purely SaaS or remote-first companies typically see less value from local tactics.",
  },
];

export default function SanFranciscoSEOServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "SEO agency serving businesses in San Francisco. Technical SEO, local SEO, and content SEO for organic search visibility across the Bay Area.",
    areaServed: { "@type": "City", name: "San Francisco" },
    url: "https://themarkitmedia.com/en/locations/united-states/san-francisco/seo-services",
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
          {
            label: "San Francisco",
            href: "/locations/united-states/san-francisco",
          },
          { label: "SEO Services" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>San Francisco</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              SEO Services for Businesses in San Francisco
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              San Francisco is one of the most competitive organic search markets
              in the world. SaaS companies, biotech firms in the South San
              Francisco corridor, fintech startups, and established technology
              brands all invest heavily in content and technical SEO &mdash;
              which means breaking onto the first page requires more than
              publishing blog posts on a schedule.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media provides SEO services to San Francisco businesses
              across technical SEO, local search, and content &mdash; building
              organic visibility that compounds over time and reduces your
              dependence on expensive Bay Area ad spend.
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
        aria-label="SEO services for San Francisco businesses"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>
              SEO Services for the San Francisco Market
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
        aria-label="Why San Francisco businesses choose Markit Media for SEO"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why San Francisco Businesses Choose Markit Media for SEO
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
              How We Approach SEO for San Francisco Clients
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
                href="/locations/united-states/san-francisco"
                className="text-base font-bold text-black underline underline-offset-4 hover:text-gray-600 transition-colors"
              >
                View all San Francisco services &rarr;
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
              Frequently Asked Questions About SEO Services in San Francisco
            </SectionTitle>
          </Animate>
          <div className="mt-10 space-y-6">
            {faqs.map((faq, i) => (
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
              Organic Growth in the Bay Area Starts Here
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s audit your site, identify the opportunities, and build
              an SEO strategy designed to compete in San Francisco&apos;s
              demanding search landscape.
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
