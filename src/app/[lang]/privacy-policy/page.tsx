import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Markit Media — how we collect, use, and protect your data.",
  alternates: { canonical: "https://themarkitmedia.com/en/privacy-policy" },
  openGraph: {
    title: "Privacy Policy",
    description: "How Markit Media collects, uses, and protects your data.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <article>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <section className="px-6 lg:px-12 pt-24 pb-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-extrabold text-black tracking-tight mb-8">
            Privacy Policy
          </h1>
          <div className="prose prose-lg text-gray-600 space-y-6">
            <p className="text-base leading-relaxed">Last updated: September 2024</p>

            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mt-8">1. Information We Collect</h2>
            <p className="text-base leading-relaxed">
              We collect information you provide directly, such as your name, email address, phone number, and message when you submit our contact form. We also collect standard web analytics data including pages visited, browser type, and referring URLs.
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mt-8">2. How We Use Your Information</h2>
            <p className="text-base leading-relaxed">
              We use your information to respond to inquiries, provide requested services, improve our website, and send relevant marketing communications (with your consent).
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mt-8">3. Cookies</h2>
            <p className="text-base leading-relaxed">
              We use cookies for analytics and to improve your browsing experience. Analytics cookies are only loaded after you accept our cookie consent banner. You can manage cookie preferences in your browser settings.
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mt-8">4. Third-Party Services</h2>
            <p className="text-base leading-relaxed">
              We may use Google Analytics and similar tools to understand how visitors use our website. These services have their own privacy policies. We do not sell your personal data to third parties.
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mt-8">5. Data Security</h2>
            <p className="text-base leading-relaxed">
              We implement reasonable security measures to protect your information. However, no method of transmission over the internet is completely secure.
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mt-8">6. Your Rights</h2>
            <p className="text-base leading-relaxed">
              You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at <a href="mailto:ciao@themarkitmedia.com" className="text-black font-bold hover:underline">ciao@themarkitmedia.com</a>.
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mt-8">7. Data Retention</h2>
            <p className="text-base leading-relaxed">
              We retain your data for as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required by law.
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mt-8">8. Changes</h2>
            <p className="text-base leading-relaxed">
              We may update this privacy policy from time to time. Changes will be posted on this page with an updated date.
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mt-8">9. Contact</h2>
            <p className="text-base leading-relaxed">
              For privacy-related questions, contact us at <a href="mailto:ciao@themarkitmedia.com" className="text-black font-bold hover:underline">ciao@themarkitmedia.com</a>.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
