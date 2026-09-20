import type { Metadata } from "next";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ContactForm } from "@/app/[lang]/contact/contact-form";

export const metadata: Metadata = {
  title: "Get a Free Quote — Markit Media",
  description: "Request a free digital marketing quote. Tell us about your business and goals, and we'll build a custom proposal within 2 business days.",
  alternates: { canonical: "https://themarkitmedia.com/en/get-a-quote" },
};

const steps = [
  { num: "1", title: "Tell Us About Your Business", desc: "Fill out the form with your goals, budget, and timeline." },
  { num: "2", title: "We Review & Research", desc: "Our team analyzes your market, competitors, and opportunities." },
  { num: "3", title: "Receive Your Custom Proposal", desc: "A tailored strategy and quote delivered within 2 business days." },
];

export default function GetAQuotePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Get a Free Quote — Markit Media",
    description: "Request a free digital marketing consultation and proposal.",
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Get a Quote" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-16">
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
    </article>
  );
}
