import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Marketing Agency in Boston — Markit Media",
  description:
    "Full-service marketing agency for businesses in Boston. Strategy and execution for biotech, healthcare, higher education, fintech, and professional services across the Greater Boston innovation economy.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/boston/marketing-agency",
  },
  openGraph: {
    title: "Marketing Agency in Boston — Markit Media",
    description:
      "Full-service marketing agency for businesses in Boston. Biotech, healthcare, fintech, and higher education marketing across Greater Boston.",
  },
};

const serviceItems = [
  {
    title: "Marketing Strategy",
    desc: "Market positioning, channel selection, and campaign planning built for Boston's innovation economy. We develop strategies that account for long B2B sales cycles in biotech and healthcare, the competitive talent market driven by world-class universities, and the regulatory considerations that shape messaging in pharma and fintech.",
  },
  {
    title: "Paid Media Management",
    desc: "Google Ads, Meta Ads, LinkedIn, and programmatic campaigns structured for Boston's B2B-heavy market. Account-based targeting for Kendall Square biotech firms, geo-targeted campaigns along the Route 128 tech corridor, and lead generation funnels built for high-value professional services and healthcare verticals.",
  },
  {
    title: "Search Engine Optimization",
    desc: "Technical SEO, keyword strategy, and content programs designed for Boston's competitive search landscape — where biotech companies, healthcare systems, universities, and financial services firms all compete for visibility in specialized, high-intent keyword categories.",
  },
  {
    title: "Content Marketing",
    desc: "Thought leadership, whitepapers, case studies, and editorial content for industries where credibility drives conversion. Boston's biotech, healthcare, and professional services buyers research extensively before engaging — your content needs to demonstrate expertise, not just fill a blog.",
  },
  {
    title: "Web Design & Development",
    desc: "WordPress, Shopify, and Next.js builds with conversion architecture designed for Boston's B2B and institutional audiences. Clean, professional interfaces that communicate technical credibility and guide complex buyer journeys from first visit through demo request or consultation booking.",
  },
  {
    title: "Analytics & Reporting",
    desc: "Tracking, attribution, and reporting that connects marketing activity to pipeline and revenue. For Boston's B2B market, this means multi-touch attribution across long sales cycles, CRM integration for lead quality visibility, and dashboards that tie spend to qualified opportunities.",
  },
];

const reasons = [
  {
    title: "Deep understanding of Boston's innovation economy",
    desc: "Boston's market runs on biotech, healthcare, higher education, and financial services. Marketing for a Kendall Square biotech startup is fundamentally different from marketing for a Route 128 SaaS company or a Back Bay financial advisory firm. We build strategies grounded in the specific buyer behaviors, sales cycles, and competitive dynamics of each sector.",
  },
  {
    title: "B2B marketing built for long sales cycles",
    desc: "Boston's dominant industries — biotech, enterprise software, healthcare, financial services — involve complex purchasing decisions with multiple stakeholders and extended timelines. We structure campaigns that nurture prospects through months-long evaluation periods with the right content, retargeting, and touchpoints at each stage.",
  },
  {
    title: "Talent market and employer brand support",
    desc: "With MIT, Harvard, Boston University, Northeastern, and dozens of other institutions producing top graduates, Boston's talent competition is intense. We help companies build employer brand visibility through LinkedIn campaigns, content marketing, and digital presence that attracts qualified candidates in a market where every competitor is recruiting from the same talent pool.",
  },
  {
    title: "Performance accountability from day one",
    desc: "We set clear KPIs tied to business outcomes — qualified leads, pipeline contribution, cost per acquisition — not vanity metrics. Every campaign gets proper tracking and attribution so you can see exactly what your marketing investment is producing in the Boston market.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Market Analysis",
    desc: "We audit your current marketing, analyze your competitive landscape within the Boston market, and map the buyer journey for your specific industry. This includes identifying which channels your competitors are investing in and where the gaps are in your sector.",
  },
  {
    step: "02",
    title: "Strategy & Channel Planning",
    desc: "Based on the audit, we build a channel-by-channel roadmap with clear priorities, timelines, and KPIs. Every recommendation addresses the specific realities of marketing in Boston — high CPCs in competitive verticals, B2B buying committee dynamics, and the content expectations of technically sophisticated audiences.",
  },
  {
    step: "03",
    title: "Execution & Optimization",
    desc: "Campaigns launch across your selected channels with proper audience targeting, conversion tracking, and creative in place from day one. We optimize on a continuous cycle based on performance data — adjusting spend allocation, messaging, and targeting as results come in.",
  },
  {
    step: "04",
    title: "Reporting & Iteration",
    desc: "Monthly reports cover pipeline impact, channel performance, and what we are changing next. We connect marketing metrics to business outcomes so you can evaluate ROI clearly and make informed decisions about where to invest further in the Boston market.",
  },
];

export default function BostonMarketingAgencyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "Full-service marketing agency serving businesses in Boston. Strategy and execution for biotech, healthcare, fintech, and professional services across the Greater Boston innovation economy.",
    areaServed: { "@type": "City", name: "Boston" },
    url: "https://themarkitmedia.com/en/locations/united-states/boston/marketing-agency",
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "United States", href: "/locations/united-states" },
          {
            label: "Boston",
            href: "/locations/united-states/boston",
          },
          { label: "Marketing Agency" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Boston</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              Marketing Agency Serving Businesses in Boston
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Boston&apos;s economy is built on innovation — biotech and pharma
              along the Kendall Square corridor, enterprise technology on Route
              128, world-class healthcare systems, and a financial services
              sector rooted in centuries of institutional presence. Marketing
              here demands more than generic playbooks.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              We help Boston businesses build marketing programs designed for
              technically sophisticated audiences, long B2B sales cycles, and
              the competitive realities of one of the most educated and
              innovation-driven markets in the country.
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
        aria-label="Marketing services for Boston"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>
              Full-Service Marketing for the Boston Market
            </SectionTitle>
            <p className="text-base text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Every engagement is adapted to the realities of Greater Boston —
              B2B buying committees, technically sophisticated audiences, high
              advertising costs, and the competitive dynamics of an
              innovation-driven economy. Each service runs independently or as
              part of an integrated program.
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

      {/* Why Boston Businesses Choose Markit Media */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why Boston businesses choose Markit Media"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Boston Businesses Choose Markit Media for Marketing
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
              How We Work with Boston Businesses
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
            <SectionTitle>Related Services</SectionTitle>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10"
          >
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
              href="/locations/united-states/boston/seo-services"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <span className="text-base font-bold text-black">
                SEO Services in Boston
              </span>
              <p className="text-base text-gray-500 mt-1">
                Technical, local, and content SEO for Boston businesses.
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

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Compete in Boston&apos;s Innovation Economy?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s discuss how data-driven marketing can help your brand
              stand out in one of the most competitive and educated markets in
              the country.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
