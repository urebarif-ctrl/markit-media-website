import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { MarketingFunnel } from "@/components/animated-infographic";

export const metadata: Metadata = {
  title: "Our Process",
  description: "From discovery and strategy through execution, optimization, and reporting. A proven 5-step digital marketing process.",
  alternates: { canonical: "https://themarkitmedia.com/en/process" },
  openGraph: {
    title: "Our 5-Step Marketing Process",
    description:
      "Discovery, strategy, execution, optimization, and reporting — a proven process for digital marketing results.",
  },
};

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We start by understanding your business, goals, audience, competitive landscape, and current marketing performance. This phase includes stakeholder interviews, data analysis, and market research.",
    deliverables: ["Business assessment", "Audience analysis", "Competitive audit", "Performance baseline"],
    image: "/images/process/discovery.svg",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "Based on discovery findings, we develop a comprehensive marketing strategy with clear KPIs, channel selection, messaging frameworks, and budget allocation recommendations.",
    deliverables: ["Marketing strategy document", "Channel plan", "KPI framework", "Budget recommendation"],
    image: "/images/process/strategy.svg",
  },
  {
    num: "03",
    title: "Execution",
    desc: "Our team builds and launches campaigns across selected channels. This includes creative production, campaign setup, technical implementation, and quality assurance.",
    deliverables: ["Campaign launch", "Creative assets", "Technical setup", "QA review"],
    image: "/images/process/execution.svg",
  },
  {
    num: "04",
    title: "Optimization",
    desc: "We continuously monitor performance, run A/B tests, optimize targeting, adjust budgets, and refine creative. Decisions are driven by data, not assumptions.",
    deliverables: ["A/B test results", "Performance optimization", "Budget reallocation", "Creative refresh"],
    image: "/images/process/optimization.svg",
  },
  {
    num: "05",
    title: "Reporting",
    desc: "Regular reporting with clear metrics, insights, and recommendations. We focus on the numbers that matter to your business, not vanity metrics.",
    deliverables: ["Monthly performance reports", "ROI analysis", "Strategic recommendations", "Quarterly reviews"],
    image: "/images/process/reporting.svg",
  },
];

const principles = [
  { title: "Data Over Opinions", desc: "Every decision is backed by data. We test hypotheses, measure results, and let the numbers guide our next move." },
  { title: "Radical Transparency", desc: "You see everything we see. Full access to dashboards, real-time metrics, and honest assessments of what's working." },
  { title: "Continuous Improvement", desc: "Marketing is never 'done.' We iterate constantly, finding new opportunities and eliminating waste every week." },
  { title: "Ownership Mentality", desc: "We treat your budget like our own. No unnecessary spend, no vanity metrics, no fluff in reports." },
];

export default function ProcessPage() {
  const processSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Markit Media Process",
    description: "Our 5-step process for digital marketing success.",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.desc,
    })),
  };

  return (
    <article>
      <JsonLd data={processSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Process" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Animate animation="fade-up">
            <div>
              <SectionLabel>Our Process</SectionLabel>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
                Strategy to Results in 5 Steps
              </h1>
              <SectionDesc>
                Every engagement follows a proven process. No shortcuts, no guesswork. From understanding your business to delivering measurable growth.
              </SectionDesc>
            </div>
          </Animate>
          <Animate animation="fade-in" delay={200}>
            <MarketingFunnel className="max-w-sm mx-auto" />
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Process steps">
        <div className="max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <Animate key={step.num} animation="fade-up" delay={i * 80}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 py-16 ${i < steps.length - 1 ? "border-b border-gray-200" : ""} items-center`}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-[family-name:var(--font-display)] text-5xl font-extrabold text-black/10 leading-none">{step.num}</span>
                    <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">{step.title}</h2>
                  </div>
                  <p className="text-base text-gray-500 leading-relaxed mb-6">{step.desc}</p>
                  <div>
                    <h3 className="text-base font-bold text-black uppercase tracking-wide mb-3">Deliverables</h3>
                    <div className="flex flex-wrap gap-2">
                      {step.deliverables.map((d) => (
                        <span key={d} className="text-base font-medium text-gray-600 bg-gray-100 px-4 py-2">{d}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <img
                    src={step.image}
                    alt=""
                    className="w-full aspect-[4/3] object-cover"
                    loading={i > 0 ? "lazy" : undefined}
                  />
                </div>
              </div>
            </Animate>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Our principles">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Principles</SectionLabel>
            <SectionTitle>How We Think About Marketing</SectionTitle>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {principles.map((p) => (
              <div key={p.title} className="bg-white p-8 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">{p.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="Process FAQ">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Common Questions About Our Process</SectionTitle>
          </Animate>
          <div className="mt-10">
            {[
              { q: "How long does the discovery phase take?", a: "Typically 1-2 weeks depending on the scope of the engagement. We conduct stakeholder interviews, analyze existing data, audit current marketing efforts, and research your competitive landscape. Thorough discovery prevents wasted budget later." },
              { q: "Do I need to provide access to my existing accounts?", a: "Yes, we will need access to your analytics, ad accounts, and any other marketing platforms you are currently using. This allows us to establish accurate baselines and avoid duplicating existing work." },
              { q: "How quickly will I see results?", a: "It depends on the channels. Paid advertising can generate results within days of launch. SEO typically takes 3-6 months to show meaningful organic growth. We set realistic expectations during the strategy phase and provide interim metrics so you can track progress." },
              { q: "What happens if a strategy is not working?", a: "We identify underperformance quickly through continuous monitoring. If a tactic is not delivering, we analyze the data, diagnose the issue, and adjust the approach. This is why the optimization phase is ongoing, not a one-time event." },
              { q: "How often will we communicate?", a: "You get weekly performance updates, monthly strategy sessions, and direct access to your team for questions in between. We adapt communication frequency to what works best for your schedule." },
              { q: "Can I change the scope mid-engagement?", a: "Yes. Marketing priorities shift, and our retainer model is built for flexibility. We work with you to adjust scope, reallocate budgets, and pivot strategy as your business evolves." },
            ].map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <details className="group border-b border-gray-200">
                  <summary className="flex justify-between items-center py-5 cursor-pointer text-base font-bold text-black list-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                    {item.q}
                    <span className="text-xl text-gray-500 group-open:rotate-45 transition-transform flex-shrink-0 ml-4" aria-hidden="true">+</span>
                  </summary>
                  <div className="pb-5 text-base text-gray-500 leading-relaxed">{item.a}</div>
                </details>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-gray-50" aria-label="Cross links">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Our Services", desc: "Explore the full range of disciplines we execute across.", href: "/services" },
                { title: "Pricing", desc: "How we structure engagements — retainer, project, or performance-based.", href: "/pricing" },
                { title: "Case Studies", desc: "See how our process translates into real business results.", href: "/case-studies" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="group border border-gray-200 bg-white p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black group-hover:underline mb-2">{link.title}</h3>
                  <p className="text-base text-gray-500 leading-relaxed">{link.desc}</p>
                </Link>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              The first step is a conversation. Let&apos;s talk about your goals.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none">
              Schedule a Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
