import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel } from "@/components/section";

export const metadata: Metadata = {
  title: "Thank You — We'll Be in Touch",
  description: "Thank you for contacting Markit Media. We will respond within one business day.",
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <article className="min-h-[80vh] flex flex-col justify-center">
      <section className="px-6 lg:px-12 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <Animate animation="fade-up">
            <div className="w-20 h-20 bg-black text-white flex items-center justify-center mx-auto mb-8 text-3xl font-bold">
              &#10003;
            </div>
            <SectionLabel>Message Received</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Thank You for Reaching Out
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-xl mx-auto">
              A member of our team will review your inquiry and get back to you within one business day.
              In the meantime, here are some resources you might find useful.
            </p>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-20" aria-label="Explore while you wait">
        <div className="max-w-4xl mx-auto">
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/blog" className="group bg-gray-50 border border-gray-200 hover:border-black/30 transition-all p-8 text-center focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-2">Read Our Blog</h2>
              <p className="text-base text-gray-500">Expert insights on digital marketing strategy and execution.</p>
            </Link>
            <Link href="/resources/checklists" className="group bg-gray-50 border border-gray-200 hover:border-black/30 transition-all p-8 text-center focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-2">Marketing Checklists</h2>
              <p className="text-base text-gray-500">Interactive checklists for website launches, SEO, and more.</p>
            </Link>
            <Link href="/process" className="group bg-gray-50 border border-gray-200 hover:border-black/30 transition-all p-8 text-center focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-2">Our Process</h2>
              <p className="text-base text-gray-500">See how we take your project from strategy to results.</p>
            </Link>
          </Stagger>
        </div>
      </section>
    </article>
  );
}
