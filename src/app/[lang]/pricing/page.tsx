import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Pricing — How We Structure Our Engagements",
  description: "Learn how Markit Media structures pricing for digital marketing services. Custom quotes based on your goals, scope, and budget.",
  alternates: { canonical: "https://themarkitmedia.com/en/pricing" },
};

const pricingModels = [
  {
    title: "Monthly Retainer",
    desc: "A fixed monthly fee for ongoing marketing services. Your retainer covers a dedicated team, agreed-upon deliverables, and regular strategy sessions.",
    includes: [
      "Dedicated account manager and specialists",
      "Monthly strategy and performance reviews",
      "Agreed deliverables and KPIs",
      "Access to reporting dashboards",
      "Flexible scope adjustments as priorities shift",
    ],
    bestFor: "Businesses that need consistent, ongoing marketing execution across multiple channels.",
  },
  {
    title: "Project-Based",
    desc: "A fixed price for a defined scope of work. Website builds, brand refreshes, campaign launches, and audits are common project-based engagements.",
    includes: [
      "Defined deliverables, timeline, and budget",
      "Milestone-based payments",
      "Clear acceptance criteria",
      "Post-launch support period",
      "No ongoing commitment required",
    ],
    bestFor: "Specific initiatives with clear outcomes: a website redesign, a brand identity system, or a market launch.",
  },
  {
    title: "Performance-Based",
    desc: "A portion of our fee is tied to results. We put skin in the game by linking compensation to agreed-upon KPIs like lead volume, revenue, or ROAS.",
    includes: [
      "Base retainer plus performance bonus",
      "Agreed KPI targets and measurement method",
      "Transparent reporting on all metrics",
      "Quarterly performance reviews",
      "Aligned incentives between us and you",
    ],
    bestFor: "Businesses with established tracking and a desire for a partner who shares the risk and reward.",
  },
];

const faqItems = [
  { q: "How much does digital marketing cost?", a: "It depends on your goals, scope, and competitive landscape. Most of our retainer clients invest between $2,000 and $25,000 per month depending on the channels and level of service required. We provide custom quotes after understanding your specific situation." },
  { q: "Do you require long-term contracts?", a: "No. We offer flexible month-to-month agreements for retainer clients. We believe in earning your business every month, not locking you in. Project-based work has a defined scope and timeline." },
  { q: "What is included in the monthly retainer?", a: "That depends on the channels and services we agree on. A typical retainer includes strategy development, campaign execution, optimization, reporting, and regular communication. We define all deliverables upfront so there are no surprises." },
  { q: "Do you charge for the initial consultation?", a: "No. The first conversation is always free. We use it to understand your business, goals, and current marketing efforts so we can provide relevant recommendations." },
  { q: "How do you determine the right budget for my business?", a: "During our discovery process, we analyze your competitive landscape, target market, and business goals to recommend a realistic budget range. We would rather give you honest advice about what it takes to compete than undersell and underdeliver." },
];

export default function PricingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <article>
      <JsonLd data={faqSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Pricing" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Pricing</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Transparent Pricing, Custom Solutions
            </h1>
            <SectionDesc>
              We don&apos;t do cookie-cutter packages. Every business is different, and your marketing plan should reflect that.
              Here is how we structure our engagements.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Pricing models">
        <div className="max-w-7xl mx-auto">
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingModels.map((model) => (
              <div key={model.title} className="border border-gray-200 p-8 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">{model.title}</h2>
                <p className="text-base text-gray-500 leading-relaxed mb-6">{model.desc}</p>
                <ul className="space-y-3 mb-6 flex-1">
                  {model.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-base text-gray-600">
                      <span className="text-black font-bold mt-0.5 flex-shrink-0" aria-hidden="true">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-200 pt-4 mt-auto">
                  <span className="text-base font-bold text-black">Best for: </span>
                  <span className="text-base text-gray-500">{model.bestFor}</span>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-gray-50" aria-label="What affects pricing">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">What Affects Your Investment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Number of Channels", desc: "Running SEO + PPC + Social costs more than SEO alone. We recommend starting with the highest-impact channels and expanding." },
                { title: "Competitive Landscape", desc: "More competitive markets require more resources to break through. We assess competition during discovery." },
                { title: "Scope of Work", desc: "A full-service retainer covering strategy, execution, and reporting costs more than a single-channel engagement." },
                { title: "Business Goals", desc: "Aggressive growth targets require more investment than maintenance-level marketing. We calibrate to your ambitions." },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300 motion-reduce:transition-none">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-2">{item.title}</h3>
                  <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16" aria-label="Pricing FAQ">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Pricing Questions</SectionTitle>
          </Animate>
          <div className="mt-10">
            {faqItems.map((item, i) => (
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

      <section className="px-6 lg:px-12 py-12" aria-label="Explore more">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3">
              {[
                { label: "ROI Calculator", href: "/resources/roi-calculator" },
                { label: "Service Finder Quiz", href: "/services/finder" },
                { label: "Our Process", href: "/process" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="border border-gray-200 px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  {link.label}
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
              Get a Custom Quote
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Tell us about your business and goals. We will respond within one business day with a tailored recommendation.
            </p>
            <Link href="/get-a-quote" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors">
              Request a Quote &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
