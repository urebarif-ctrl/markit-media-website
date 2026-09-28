import type { Metadata } from "next";
import { DiscoveryForm } from "./discovery-form";

export const metadata: Metadata = {
  title: "Pre-Discovery Brand Brief",
  description: "Share a quick brand brief with Markit Media before your discovery session so our team can prepare relevant strategy, research, and next steps.",
  alternates: { canonical: "https://themarkitmedia.com/en/discovery" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Pre-Discovery Brand Brief | Markit Media",
    description: "A quick 3–4 minute brief so Markit Media can come prepared for your discovery session.",
  },
};

export default function DiscoveryPage() {
  return (
    <article className="min-h-screen bg-[#f6f6f3]">
      <section className="px-5 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-20" aria-label="Pre-discovery brand brief">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-black">
              Markit Media Discovery
            </div>
            <h1 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,5.2rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-black">
              Tell us what you&apos;re building.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
              A quick pre-discovery brief so we can arrive with better questions, sharper ideas, and a clearer launch direction.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {["3–4 minutes", "Mostly tap-based", "No long questionnaire"].map((item) => (
                <span key={item} className="rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-gray-600">
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 rounded-3xl bg-black p-6 text-white sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">Why we ask</p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-xl font-bold leading-snug">
                Your discovery session should be about strategy, not paperwork.
              </p>
              <div className="mt-6 space-y-3 text-sm text-white/70">
                <p>✓ We review your brand before the conversation</p>
                <p>✓ We understand your launch stage and priorities</p>
                <p>✓ We prepare relevant questions and opportunities</p>
              </div>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-gray-400">
              Your information is sent securely to the Markit Media team and used only to prepare for your inquiry and discovery process.
            </p>
          </div>

          <DiscoveryForm />
        </div>
      </section>
    </article>
  );
}
