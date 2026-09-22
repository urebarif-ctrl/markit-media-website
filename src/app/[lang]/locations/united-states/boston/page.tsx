import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Boston — Markit Media",
  description:
    "Performance marketing, SEO, PPC, and web development for businesses in Boston. Growth strategies built for biotech, fintech, healthcare, and education companies in the Greater Boston area.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/boston",
  },
  openGraph: {
    title: "Digital Marketing Agency in Boston — Markit Media",
    description:
      "Performance marketing, SEO, PPC, and web development for businesses in Boston. Growth strategies built for biotech, fintech, healthcare, and education companies in the Greater Boston area.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Markit Media",
  description:
    "Digital marketing agency serving businesses in Boston with performance marketing, SEO, PPC, web development, and growth strategies for biotech, fintech, healthcare, and education sectors.",
  areaServed: { "@type": "City", name: "Boston" },
  url: "https://themarkitmedia.com/en/locations/united-states/boston",
};

const services = [
  {
    title: "Performance Marketing",
    desc: "Google Ads and Meta Ads campaigns built for Boston’s biotech, fintech, and professional services sectors. We structure campaigns around long consideration cycles and high-value conversions typical of healthcare and institutional buyers in the Greater Boston market.",
  },
  {
    title: "SEO",
    desc: "Technical SEO, content strategy, and authority building for a market where you compete against world-class universities, teaching hospitals, and well-funded biotech firms for search visibility. We prioritize high-intent keywords that drive qualified leads rather than vanity traffic.",
  },
  {
    title: "Social Media Marketing",
    desc: "LinkedIn-driven B2B campaigns for biotech, legal, and financial services firms alongside consumer strategies for healthcare and education brands. Boston’s audience is highly educated and research-oriented, requiring substance-first creative that earns engagement through expertise.",
  },
  {
    title: "Website Development",
    desc: "Fast, conversion-optimized sites on Next.js, WordPress, and headless CMS architectures for Boston’s healthcare, fintech, and education companies. We build with HIPAA-adjacent compliance awareness, accessibility standards, and the clean UX that institutional buyers expect.",
  },
  {
    title: "Branding & Design",
    desc: "Brand identity systems for biotech startups moving from research to commercialization, fintech companies entering regulated markets, and professional services firms competing for institutional clients. We build visual identities that communicate credibility and scientific rigor.",
  },
  {
    title: "Video Production",
    desc: "Product demos, clinical explainer videos, investor pitch content, and educational video assets for Boston’s biotech, healthcare, and edtech companies. From conference presentations to social-first video, we produce content that communicates complex ideas clearly.",
  },
  {
    title: "Email Marketing",
    desc: "Lifecycle email sequences, nurture campaigns, and re-engagement workflows built for long B2B sales cycles. We optimize for the metrics that matter to Boston’s venture-backed and institutional businesses: pipeline velocity, qualified engagement, and conversion to contract.",
  },
  {
    title: "Content Marketing",
    desc: "Thought leadership, white papers, case studies, and research-backed content built for a market that expects intellectual depth. Boston buyers — from hospital administrators to venture capitalists — research extensively before engaging. We produce content that earns their attention.",
  },
  {
    title: "AI Solutions",
    desc: "AI-powered lead scoring, predictive analytics, and automated qualification workflows that give Boston businesses a measurable efficiency advantage. We integrate with existing CRM and marketing automation stacks to improve pipeline quality without requiring a full platform migration.",
  },
];

const reasons = [
  {
    title: "Deep understanding of Boston’s innovation economy",
    desc: "Boston’s market is defined by the intersection of world-class research institutions, venture capital, and regulated industries. We understand the buying cycles, compliance considerations, and credibility requirements that shape marketing decisions for biotech, fintech, and healthcare companies in the Greater Boston area.",
  },
  {
    title: "Strategy built for educated, research-driven buyers",
    desc: "Boston’s concentration of universities, hospitals, and research institutions creates a buyer profile that is unusually skeptical of marketing fluff. We build campaigns grounded in evidence, specificity, and substance — the approach that actually converts in a market shaped by academic and scientific rigor.",
  },
  {
    title: "Cost efficiency over Boston agency overhead",
    desc: "Boston agency retainers reflect Back Bay office rents and the cost of living in one of the most expensive metro areas in the country. As a remote team, we deliver the same caliber of strategic work at a cost structure that lets you allocate more budget to media spend, content production, and growth experiments.",
  },
  {
    title: "Data-driven execution for metrics-focused organizations",
    desc: "Boston companies — whether reporting to a board of directors, institutional investors, or hospital leadership — expect marketing partners who can tie every dollar to measurable outcomes. We provide transparent reporting, structured experimentation, and optimization decisions based on statistical evidence.",
  },
];

const faq = [
  {
    q: "How do you approach marketing for biotech and healthcare companies in Boston?",
    a: "We start by understanding your regulatory environment, sales cycle, and buyer personas. Biotech and healthcare marketing in Boston requires content that communicates scientific credibility, campaigns that target the right institutional decision-makers, and compliance awareness throughout. We build strategies that generate qualified leads from researchers, clinicians, hospital administrators, and investors — each requiring different messaging and channel approaches.",
  },
  {
    q: "What growth strategies work for fintech companies in the Boston area?",
    a: "Boston fintech companies typically compete for trust in regulated markets. We focus on building authority through thought leadership content, targeting decision-makers at financial institutions through LinkedIn and programmatic channels, and running paid search campaigns around high-intent compliance and solution-category keywords. The goal is qualified pipeline from institutional buyers, not consumer app installs.",
  },
  {
    q: "How do you help Boston businesses compete against companies backed by major universities and hospitals?",
    a: "Institutional brand recognition creates a real competitive advantage in search and paid channels. We counter that by identifying positioning gaps, targeting specific long-tail keywords where institutional players are not investing, and building content strategies that demonstrate specialized expertise rather than broad authority. Specificity and depth outperform brand recognition when buyers are comparing solutions.",
  },
  {
    q: "How does a remote team effectively serve businesses in Boston?",
    a: "We maintain working-hour overlap with Eastern Time and use the same collaboration tools Boston teams already rely on — Slack, Loom, Notion, Google Meet. Real-time reporting dashboards, regular strategy calls, and async communication keep projects moving at the pace you need. Remote delivery eliminates the overhead markup of a Boston office while keeping responsiveness and turnaround identical to a local team.",
  },
];

const subPages = [
  {
    title: "Marketing Agency",
    href: "/locations/united-states/boston/marketing-agency",
    desc: "Full-service marketing strategy for Boston biotech, fintech, and healthcare companies.",
  },
  {
    title: "PPC & Paid Ads",
    href: "/locations/united-states/boston/ppc-ads",
    desc: "Google Ads and Meta Ads management for Boston’s competitive institutional verticals.",
  },
  {
    title: "Website Development",
    href: "/locations/united-states/boston/website-development",
    desc: "Custom web development for healthcare, education, and fintech companies in Boston.",
  },
  {
    title: "SEO Services",
    href: "/locations/united-states/boston/seo-services",
    desc: "Search engine optimization for competitive Boston and Greater Boston keywords.",
  },
];

export default function BostonPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
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
          { label: "Boston" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Boston</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Digital Marketing Agency Serving Businesses in Boston
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-3xl">
              Boston is where world-class research meets venture capital. The
              city&apos;s economy is driven by biotech, healthcare, fintech, and
              education — industries where buyers are highly educated,
              risk-aware, and expect marketing that demonstrates real expertise.
              Surface-level campaigns do not work in a market shaped by Harvard,
              MIT, and Mass General.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-3xl">
              Markit Media serves businesses in Boston with performance
              marketing, SEO, PPC, web development, and growth strategy built
              specifically for the Greater Boston area&apos;s innovation-driven,
              high-credibility market.
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

      {/* Services */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Services for businesses in Boston"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Offer</SectionLabel>
            <SectionTitle>Services for the Boston Market</SectionTitle>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {services.map((svc) => (
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
        aria-label="Why businesses in Boston choose Markit Media"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Businesses in Boston Choose Markit Media
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

      {/* FAQ */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="FAQ">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Common Questions</SectionTitle>
          </Animate>
          <div className="mt-10">
            {faq.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <details className="group border-b border-gray-200">
                  <summary className="flex justify-between items-center py-5 cursor-pointer text-base font-bold text-black list-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                    {item.q}
                    <span
                      className="text-xl text-gray-500 group-open:rotate-45 transition-transform motion-reduce:transition-none flex-shrink-0 ml-4"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <div className="pb-5 text-base text-gray-500 leading-relaxed">
                    {item.a}
                  </div>
                </details>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-pages */}
      <section className="px-6 lg:px-12 py-20" aria-label="Boston service pages">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Explore</SectionLabel>
            <SectionTitle>Boston Service Pages</SectionTitle>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {subPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="bg-white border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none block"
              >
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black uppercase tracking-wide mb-2">
                  {page.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  {page.desc}
                </p>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Grow Your Business in Boston?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a growth strategy designed for the Greater
              Boston area&apos;s most competitive industries.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
