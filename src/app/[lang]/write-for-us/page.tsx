import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Write for Markit Media | Guest Contributor Guidelines",
  description: "Pitch an original marketing, SEO, advertising, ecommerce, branding, AI, or web development article to Markit Media.",
  alternates: { canonical: "https://themarkitmedia.com/en/write-for-us" },
};

const topics = ["Digital marketing", "SEO & search", "PPC & paid media", "Social media", "Web development", "Ecommerce", "Branding & creative", "AI in marketing"];

export default function WriteForUsPage() {
  return (
    <main>
      <section className="px-6 lg:px-12 py-24 lg:py-32 bg-black text-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-[0.2em] text-white/60 mb-6">Contribute</p>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight">Write for Markit Media</h1>
          <p className="mt-8 text-xl md:text-2xl text-white/70 max-w-3xl leading-relaxed">Share original, practical insight with marketers, founders and business leaders. We review every pitch for usefulness, originality and editorial fit.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/en/contact?subject=guest-post-pitch" className="bg-white text-black px-7 py-4 font-medium">Pitch an article</Link>
            <Link href="/en/services/seo/link-building" className="border border-white/30 px-7 py-4 font-medium">Need link building?</Link>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold">What we publish</h2>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">We prefer expert-led articles with a clear point of view, useful examples, original research, screenshots, frameworks, data or lessons learned from real work.</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {topics.map((topic) => <div key={topic} className="border border-gray-200 p-4 font-medium">{topic}</div>)}
            </div>
          </div>
          <div className="bg-gray-50 p-8 lg:p-10">
            <h2 className="text-3xl font-semibold">Editorial standards</h2>
            <ul className="mt-6 space-y-4 text-gray-700">
              <li>Original content written for people, not search engines.</li>
              <li>Useful depth. Most accepted features are 1,000 to 2,500+ words when the subject warrants it.</li>
              <li>Claims and statistics should cite trustworthy primary sources where possible.</li>
              <li>No copied, spun, mass-produced or keyword-stuffed submissions.</li>
              <li>Natural citations are welcome. Promotional anchor text and link schemes are not.</li>
              <li>Publication is never guaranteed and our editors may revise titles, copy and links.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold">Editorial vs. sponsored contributions</h2>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <article className="bg-white border border-gray-200 p-8">
              <h3 className="text-2xl font-semibold">Editorial contribution</h3>
              <p className="mt-4 text-gray-600 leading-relaxed">Unpaid expert contributions are judged solely on editorial value. Relevant citations may be retained when they genuinely help the reader. There is no guaranteed link or publication.</p>
            </article>
            <article className="bg-white border border-gray-200 p-8">
              <h3 className="text-2xl font-semibold">Sponsored contribution</h3>
              <p className="mt-4 text-gray-600 leading-relaxed">Commercial content must still meet our editorial standards and is clearly treated as sponsored. Compensated outbound links are appropriately qualified rather than sold as ranking endorsements.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold">What to include in your pitch</h2>
          <p className="mt-5 text-lg text-gray-600">Send your name, company, LinkedIn profile, proposed title, category, a short summary, intended audience, author bio and draft link if one exists. Tell us clearly if the request is sponsored or commercial.</p>
          <Link href="/en/contact?subject=guest-post-pitch" className="inline-block mt-8 bg-black text-white px-7 py-4 font-medium">Submit your pitch</Link>
        </div>
      </section>
    </main>
  );
}
