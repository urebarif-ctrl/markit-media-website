import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Markit Media digital marketing services.",
  alternates: { canonical: "https://themarkitmedia.com/en/terms" },
  openGraph: {
    title: "Terms of Service",
    description: "Terms of service for Markit Media digital marketing services.",
  },
};

export default function TermsPage() {
  return (
    <article>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />
      <section className="px-6 lg:px-12 pt-24 pb-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-extrabold text-black tracking-tight mb-8">
            Terms of Service
          </h1>
          <div className="prose prose-lg text-gray-600 space-y-6">
            <p className="text-base leading-relaxed">Last updated: September 2024</p>

            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mt-8">1. Services</h2>
            <p className="text-base leading-relaxed">
              Markit Media provides digital marketing, website development, branding, and related services as agreed upon in individual service agreements or proposals.
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mt-8">2. Client Responsibilities</h2>
            <p className="text-base leading-relaxed">
              Clients are responsible for providing accurate information, timely feedback, and necessary access to accounts and platforms required for service delivery.
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mt-8">3. Payment Terms</h2>
            <p className="text-base leading-relaxed">
              Payment terms are specified in individual service agreements. Invoices are due upon receipt unless otherwise agreed in writing.
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mt-8">4. Intellectual Property</h2>
            <p className="text-base leading-relaxed">
              Upon full payment, clients receive ownership of deliverables created specifically for them. Markit Media retains the right to use anonymized work samples in portfolio materials.
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mt-8">5. Confidentiality</h2>
            <p className="text-base leading-relaxed">
              Both parties agree to keep confidential information private and not disclose it to third parties without prior written consent.
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mt-8">6. Limitation of Liability</h2>
            <p className="text-base leading-relaxed">
              Markit Media&apos;s liability is limited to the fees paid for the specific services in question. We are not liable for indirect, incidental, or consequential damages.
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mt-8">7. Termination</h2>
            <p className="text-base leading-relaxed">
              Either party may terminate services with 30 days written notice. Fees for work completed prior to termination remain due.
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mt-8">8. Contact</h2>
            <p className="text-base leading-relaxed">
              For questions about these terms, contact us at <a href="mailto:ciao@themarkitmedia.com" className="text-black font-bold hover:underline">ciao@themarkitmedia.com</a>.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
