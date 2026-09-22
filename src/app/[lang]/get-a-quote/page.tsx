import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ContactForm } from "@/app/[lang]/contact/contact-form";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description: "Request a free digital marketing quote. Tell us about your business and goals, and we'll build a custom proposal within 2 business days.",
  alternates: { canonical: "https://themarkitmedia.com/en/get-a-quote" },
  openGraph: {
    title: "Get a Free Marketing Quote",
    description: "Tell us your goals and get a custom digital marketing proposal within 2 business days.",
  },
};

const steps = [
  { num: "1", title: "Tell Us About Your Business", desc: "Fill out the form with your goals, budget, and timeline." },
  { num: "2", title: "We Review & Research", desc: "Our team analyzes your market, competitors, and opportunities." },
  { num: "3", title: "Receive Your Custom Proposal", desc: "A tailored strategy and quote delivered within 2 business days." },
];

const quoteFaqItems = [
  { q: "Is the consultation really free?", a: "Yes. The initial discovery call and strategy recommendation come at no cost and with no obligation." },
  { q: "How detailed is the proposal?", a: "Our proposals include recommended channels, estimated timelines, specific deliverables, and transparent pricing. Not a generic template." },
  { q: "What information do you need from me?", a: "At minimum: your industry, business goals, approximate budget range, and timeline. The more context you share, the better our recommendation." },
  { q: "Do you require long-term contracts?", a: "We offer flexible engagement models including monthly retainers, project-based work, and performance-based pricing. No lock-in required." },
  { q: "Can you work with my existing agency or team?", a: "Absolutely. We frequently collaborate with in-house marketing teams and complement existing agency relationships." },
];

export default function GetAQuotePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Get a Free Quote — Markit Media",
    description: "Request a free digital marketing consultation and proposal.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: quoteFaqItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <article>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Get a Quote" }]} />

      <section aria-label="Free Consultation" className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <Animate animation="fade-up">
              <SectionLabel>Free Consultation</SectionLabel>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
                Get Your Custom Marketing Quote
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mt-6">
                Tell us about your business and goals. We&apos;ll respond within 2 business days with a custom strategy and transparent pricing.
              </p>
            </Animate>

            <Stagger stagger={80} animation="fade-up" className="mt-12 space-y-8">
              {steps.map((step) => (
                <div key={step.num} className="flex gap-4">
                  <div className="w-10 h-10 bg-black text-white flex items-center justify-center flex-shrink-0 font-bold text-base">
                    {step.num}
                  </div>
                  <div>
                    <h2 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-1">{step.title}</h2>
                    <p className="text-base text-gray-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </Stagger>

            <Animate animation="fade-up" delay={300}>
              <div className="mt-12 p-6 bg-gray-50 border border-gray-200">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">What You&apos;ll Get</h3>
                <ul className="space-y-2">
                  {[
                    "Custom strategy tailored to your business goals",
                    "Transparent pricing with no hidden fees",
                    "Channel recommendations based on your audience",
                    "Projected timelines and expected milestones",
                    "No obligation — the consultation is free",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base text-gray-600">
                      <span className="w-1.5 h-1.5 bg-black rounded-full flex-shrink-0 mt-2" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Animate>
          </div>

          <Animate animation="fade-up" delay={200}>
            <div className="bg-gray-50 p-8 lg:p-10 border border-gray-200">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">Request Your Quote</h2>
              <ContactForm />
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12 bg-black text-white" aria-label="Trust signals">
        <div className="max-w-7xl mx-auto">
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "13", label: "Service Disciplines" },
              { value: "20", label: "Industries Served" },
              { value: "6", label: "Countries" },
              { value: "2 Days", label: "Proposal Turnaround" },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-[family-name:var(--font-display)] text-2xl lg:text-3xl font-extrabold text-white">{item.value}</p>
                <p className="text-base text-gray-400 mt-1">{item.label}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-gray-50" aria-label="Common questions about quotes">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Questions</SectionLabel>
            <SectionTitle>About the Quote Process</SectionTitle>
          </Animate>
          <div className="mt-10">
            {quoteFaqItems.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <details className="group border-b border-gray-200">
                  <summary className="flex justify-between items-center py-5 cursor-pointer text-base font-bold text-black list-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                    {item.q}
                    <span className="text-xl text-gray-500 group-open:rotate-45 transition-transform motion-reduce:transition-none flex-shrink-0 ml-4" aria-hidden="true">+</span>
                  </summary>
                  <div className="pb-5 text-base text-gray-500 leading-relaxed">{item.a}</div>
                </details>
              </Animate>
            ))}
          </div>
          <Animate animation="fade-up">
            <p className="mt-8 text-base text-gray-500">
              More questions? Check our <Link href="/faq" className="text-black font-bold hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">complete FAQ</Link> or <Link href="/contact" className="text-black font-bold hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">contact us directly</Link>.
            </p>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Explore more">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Our Services", href: "/services" },
                { label: "Pricing Models", href: "/pricing" },
                { label: "Our Process", href: "/process" },
                { label: "Client Onboarding", href: "/onboarding" },
                { label: "Case Studies", href: "/case-studies" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="border border-gray-200 px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  {link.label}
                </Link>
              ))}
            </div>
          </Animate>
        </div>
      </section>
    </article>
  );
}
