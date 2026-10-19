import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Application Received",
  description: "Thank you for applying to Markit Media.",
  alternates: { canonical: "https://themarkitmedia.com/en/careers/thank-you" },
  robots: { index: false, follow: false },
};

export default async function CareersThankYouPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = ["en", "ar", "ur"].includes(lang) ? lang : "en";
  return (
    <article className="min-h-[70vh] flex flex-col justify-center">
      <section aria-label="Application received" className="px-6 lg:px-12 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-black text-white flex items-center justify-center mx-auto mb-8 text-3xl font-bold" aria-hidden="true">&#10003;</div>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.25rem)] font-extrabold text-black tracking-tight leading-[1.1]">
            Thank You for Applying
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mt-6">
            Your application and CV have been received. Our team reviews every application, and we will be in touch if there is a fit.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/careers`} className="inline-flex items-center bg-black text-white px-8 py-4 min-h-12 font-bold hover:bg-gray-800">Back to Careers</Link>
            <Link href={`/${locale}`} className="inline-flex items-center border border-black text-black px-8 py-4 min-h-12 font-bold hover:bg-gray-50">Home</Link>
          </div>
        </div>
      </section>
    </article>
  );
}
