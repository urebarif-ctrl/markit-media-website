import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { CategoryGallery } from "@/components/portfolio/portfolio-sections";
import { PORTFOLIO_NEW_PAGES_INDEXABLE, SITE_ORIGIN } from "@/lib/portfolio";

const url = `${SITE_ORIGIN}/en/work/branding-visual-identity`;
const title = "Branding & Visual Identity Portfolio";
const description = "Brand identity boards from Markit Media: marks, colour palettes, typography and applications across stationery, packaging, apparel and digital.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  robots: PORTFOLIO_NEW_PAGES_INDEXABLE ? undefined : { index: false, follow: false },
  openGraph: { url, title, description, siteName: "Markit Media" },
};

export default async function BrandingVisualIdentityPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = ["en", "ar", "ur"].includes(lang) ? lang : "en";
  const l = (p: string) => `/${locale}${p}`;
  return (
    <article>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url, publisher: { "@type": "Organization", name: "Markit Media", url: SITE_ORIGIN } }} />
      <Breadcrumb locale={locale} items={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: "Branding & Visual Identity" }]} />
      <section className="px-6 lg:px-12 pt-24 pb-6" aria-label="Branding and visual identity overview">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-600">Branding Portfolio</p>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight leading-[1.1] mt-3">Branding &amp; Visual Identity</h1>
          <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
            Identity systems shown as complete boards: the mark, colour palette and typography, applied to stationery, packaging, apparel, signage and devices. For the marks on their own, see Logo Design.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href={l("/work/logo-folio")} className="border border-gray-300 px-5 py-3 font-bold hover:border-black transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Logo Design →</Link>
            <Link href={l("/case-studies")} className="border border-gray-300 px-5 py-3 font-bold hover:border-black transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Client Case Studies →</Link>
          </div>
        </div>
      </section>
      <CategoryGallery category="branding" locale={locale} heading="Identity boards" intro="Each board links to its client's case study. Filter by client or open any board full size." />
      <section className="px-6 lg:px-12 py-16 bg-black text-white text-center" aria-label="Get started">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">Need a brand identity?</h2>
          <p className="text-gray-400 mt-4 mb-8">Tell us about your brand and we will point you to the closest relevant work.</p>
          <Link href={l("/get-a-quote")} className="inline-block bg-white text-black px-8 py-4 font-bold hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Request a Quote →</Link>
        </div>
      </section>
    </article>
  );
}
