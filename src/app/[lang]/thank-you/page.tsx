import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel } from "@/components/section";

export const metadata: Metadata = {
  title: "Thank You — We'll Be in Touch",
  description: "Thank you for contacting Markit Media. We will respond within one business day.",
  alternates: { canonical: "https://themarkitmedia.com/en/thank-you" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Thank You",
    description: "Thanks for reaching out. We will respond within one business day.",
  },
};

const nextSteps = [
  { step: "1", title: "We review your inquiry", desc: "A team member reads your message and matches you with the right specialist." },
  { step: "2", title: "We reach out within one business day", desc: "Expect a reply by email or WhatsApp to discuss your goals, timeline, and next steps." },
  { step: "3", title: "We share a tailored recommendation", desc: "Based on your needs, we'll outline a clear approach and scope." },
];

export default function ThankYouPage() {
  return (
    <article className="min-h-[80vh] flex flex-col justify-center">
      <section aria-label="Message Received" className="px-6 lg:px-12 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <Animate animation="fade-up">
            <div className="w-20 h-20 bg-black text-white flex items-center justify-center mx-auto mb-8 text-3xl font-bold">
              &#10003;
            </div>
            <SectionLabel>Message Received</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Your Request Is In
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-xl mx-auto">
              Thanks for sharing the details. Our team will review your request and get back to you within one business day with the most relevant next step.
            </p>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-8" aria-label="What happens next">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6 text-center">What Happens Next</h2>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nextSteps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center mx-auto mb-3 text-lg font-bold">{s.step}</div>
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-1">{s.title}</h3>
                <p className="text-base text-gray-500">{s.desc}</p>
              </div>
            ))}
          </Stagger>
          <Animate animation="fade-up" delay={250}>
            <div className="mt-10 bg-black text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div>
                <p className="text-base font-bold text-white">Need to move faster?</p>
                <p className="text-base text-gray-400 mt-1">For a time-sensitive project, message us directly on WhatsApp.</p>
              </div>
              <a
                href="https://wa.me/923002086081"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-black px-6 py-3 font-bold text-base hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                WhatsApp Us &rarr;
              </a>
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-20" aria-label="Explore while you wait">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6 text-center">While You Wait</h2>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/case-studies" className="group bg-gray-50 border border-gray-200 hover:border-black/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none p-8 text-center focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-2">Case Studies</h3>
              <p className="text-base text-gray-500">See selected work, approaches, and client outcomes.</p>
            </Link>
            <Link href="/services" className="group bg-gray-50 border border-gray-200 hover:border-black/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none p-8 text-center focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-2">Explore Services</h3>
              <p className="text-base text-gray-500">Review the services we can combine around your goals.</p>
            </Link>
            <Link href="/process" className="group bg-gray-50 border border-gray-200 hover:border-black/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none p-8 text-center focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-2">Our Process</h3>
              <p className="text-base text-gray-500">See how we take your project from strategy to results.</p>
            </Link>
            <Link href="/faq" className="group bg-gray-50 border border-gray-200 hover:border-black/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none p-8 text-center focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-2">FAQ</h3>
              <p className="text-base text-gray-500">Answers to common questions about working with us.</p>
            </Link>
          </Stagger>
        </div>
      </section>
    </article>
  );
}
