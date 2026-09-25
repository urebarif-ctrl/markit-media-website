import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Publisher Partnerships | Markit Media",
  description: "Join Markit Media's publisher partner network for relevant editorial and sponsored content opportunities.",
  alternates: { canonical: "https://themarkitmedia.com/en/partners/publishers" },
};

export default function PublisherPartnersPage() {
  return (
    <main>
      <section className="px-6 lg:px-12 py-24 lg:py-32 bg-black text-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-[0.2em] text-white/60 mb-6">Publisher network</p>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight">Become a publishing partner</h1>
          <p className="mt-8 text-xl md:text-2xl text-white/70 max-w-3xl leading-relaxed">We build relationships with credible publishers whose audiences overlap with the brands and industries we serve.</p>
          <Link href="/en/contact?subject=publisher-partnership" className="inline-block mt-10 bg-white text-black px-7 py-4 font-medium">Apply as a publisher</Link>
        </div>
      </section>
      <section className="px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
          {[
            ["Relevance first", "We prioritize topical and audience fit over vanity authority metrics."],
            ["Editorial integrity", "Partners keep editorial control. We do not require manipulative anchors or disguised ranking endorsements."],
            ["Transparent commercial work", "Sponsored opportunities are disclosed and compensated links are appropriately qualified."],
          ].map(([title, copy]) => <article key={title} className="border border-gray-200 p-8"><h2 className="text-2xl font-semibold">{title}</h2><p className="mt-4 text-gray-600 leading-relaxed">{copy}</p></article>)}
        </div>
      </section>
      <section className="px-6 lg:px-12 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold">What we review</h2>
          <p className="mt-5 text-lg text-gray-600 leading-relaxed">Applications should include the domain, niche, primary audience and countries, editorial categories, traffic profile, contribution policy, sponsored-content availability, typical turnaround time and a direct editorial contact. We review content quality, organic visibility, topical relevance, indexing history and outbound-link behavior before adding a site to our working network.</p>
          <Link href="/en/contact?subject=publisher-partnership" className="inline-block mt-8 bg-black text-white px-7 py-4 font-medium">Start an application</Link>
        </div>
      </section>
    </main>
  );
}
