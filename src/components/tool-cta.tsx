"use client";

import { useState, useRef, type FormEvent } from "react";
import Link from "next/link";

interface ToolCTAProps {
  toolName: string;
  services: Array<{ title: string; desc: string; href: string }>;
  relatedTools?: Array<{ title: string; href: string }>;
  relatedBlog?: Array<{ title: string; href: string }>;
}

export function ToolCTA({ toolName, services, relatedTools, relatedBlog }: ToolCTAProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const loadedAt = useRef(Date.now());

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || sending) return;
    if (Date.now() - loadedAt.current < 2000) {
      setSubmitted(true);
      return;
    }
    setSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Tool Lead",
          email,
          message: `Lead from ${toolName} tool page. Wants results emailed.`,
          service: "general-inquiry",
        }),
      });
    } catch {
      // silent
    }
    setSubmitted(true);
    setSending(false);
  }

  return (
    <>
      {/* Email capture */}
      <section className="px-6 lg:px-12 py-12 bg-gray-50" aria-label="Get results by email">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
            Get Your Results by Email
          </h2>
          <p className="text-base text-gray-500 mb-6">
            Enter your email and we'll send your {toolName} results with additional insights.
          </p>
          {submitted ? (
            <div className="bg-black text-white px-6 py-4 inline-block">
              <p className="font-bold text-base">Check your inbox! We've sent your results.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="flex-1 border border-gray-300 px-4 py-3 text-base text-black placeholder:text-gray-400 focus-visible:border-black focus-visible:outline-none min-h-[44px]"
              />
              <button
                type="submit"
                disabled={sending}
                className="bg-black text-white px-6 py-3 font-bold text-base hover:bg-gray-800 transition-colors min-h-[44px] disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                {sending ? "Sending..." : "Email My Results"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Relevant services */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related services">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
            Need Help With This?
          </h2>
          <p className="text-base text-gray-500 mb-6">
            Our team turns these insights into real growth. Here's how we can help:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group bg-white border border-gray-200 hover:border-black/30 hover:shadow-md transition-all motion-reduce:transition-none p-6 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black group-hover:underline mb-2">
                  {s.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related blog posts */}
      {relatedBlog && relatedBlog.length > 0 && (
        <section className="px-6 lg:px-12 py-8 bg-gray-50" aria-label="Related reading">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
              Learn More
            </h2>
            <div className="flex flex-wrap gap-3">
              {relatedBlog.map((b) => (
                <Link
                  key={b.href}
                  href={b.href}
                  className="border border-gray-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  {b.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related tools */}
      {relatedTools && relatedTools.length > 0 && (
        <section className="px-6 lg:px-12 py-8" aria-label="Related tools">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
              Related Tools
            </h2>
            <div className="flex flex-wrap gap-3">
              {relatedTools.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="border border-gray-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  {t.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section aria-label="Get expert help" className="bg-black text-white px-6 lg:px-12 py-16 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold mb-4">
          Ready for Expert Help?
        </h2>
        <p className="text-base text-gray-300 mb-8 max-w-2xl mx-auto">
          Our team can implement these insights and drive measurable results for your business. Free consultation, no obligation.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-block bg-white text-black font-bold px-8 py-4 text-base hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Get a Free Consultation &rarr;
          </Link>
          <Link
            href="/services"
            className="inline-block border-2 border-white text-white font-bold px-8 py-4 text-base hover:bg-white hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            View All Services
          </Link>
        </div>
      </section>
    </>
  );
}
