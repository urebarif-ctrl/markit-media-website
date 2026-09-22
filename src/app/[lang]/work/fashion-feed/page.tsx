import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Animate, Stagger } from "@/components/animate";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Fashion Feed — Social Media Design Portfolio",
  description: "Social media design portfolio for fashion and lifestyle brands. Instagram feeds, promotional graphics, and brand campaign visuals by Markit Media.",
  alternates: { canonical: "https://themarkitmedia.com/en/work/fashion-feed" },
};

const galleryImages = [
  { src: "/images/portfolio/fashion-feed-01.jpg", alt: "Fashion brand promotional social media post — bumper sale campaign" },
  { src: "/images/portfolio/fashion-feed-02.jpg", alt: "Fashion lifestyle social media post — product showcase" },
  { src: "/images/portfolio/fashion-feed-hero.jpg", alt: "Find My Apparel — fashion brand social media feed overview" },
];

export default function FashionFeedPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Fashion Feed — Social Media Design",
    description: "Social media design portfolio for fashion and lifestyle brands by Markit Media.",
    creator: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: "Fashion Feed" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-12" aria-label="Fashion Feed">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="text-base font-medium text-gray-400 uppercase tracking-[0.15em]">Fashion &amp; Lifestyle</span>
              <span className="text-gray-300" aria-hidden="true">|</span>
              <span className="text-base text-gray-400">Social Media Design</span>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold text-black tracking-tight leading-[1.1]">
              Fashion Feed
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-3xl">
              A collection of social media designs created for fashion and lifestyle brands. From promotional campaigns and seasonal sales to curated Instagram feeds and product showcases.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {["Social Media Design", "Instagram Feed", "Brand Campaign", "Fashion"].map((s) => (
                <span key={s} className="border border-gray-200 px-3 py-1.5 text-base font-medium text-gray-600">{s}</span>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Portfolio gallery">
        <div className="max-w-5xl mx-auto">
          <Stagger stagger={100} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {galleryImages.map((img) => (
              <div key={img.src} className="relative aspect-square overflow-hidden bg-gray-100 border border-gray-200">
                <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Project details">
        <div className="max-w-3xl mx-auto space-y-12">
          <Animate animation="fade-up">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">About This Project</h2>
              <p className="text-lg text-gray-500 leading-relaxed">
                This collection showcases social media designs created for fashion and apparel brands. The work spans Instagram feeds, promotional sale graphics, product launches, and seasonal campaigns — all designed to drive engagement and conversions through scroll-stopping visuals.
              </p>
            </div>
          </Animate>

          <Animate animation="fade-up">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">What We Delivered</h2>
              <ul className="space-y-3">
                {[
                  "Curated Instagram feed layouts with consistent brand aesthetics",
                  "Promotional sale and campaign graphics for seasonal offers",
                  "Product showcase designs optimized for social engagement",
                  "Cohesive visual identity across multiple post formats",
                  "Story and reel cover designs matching the brand palette",
                ].map((d, i) => (
                  <li key={i} className="flex gap-3 text-lg text-gray-500 leading-relaxed">
                    <span className="text-black font-bold flex-shrink-0" aria-hidden="true">&bull;</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12 bg-gray-50" aria-label="View on Behance">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">View Full Project</h2>
          <p className="text-base text-gray-500 mb-6">See the complete fashion social media design collection on Behance.</p>
          <a href="https://www.behance.net/gallery/228648529/Fashion" target="_blank" rel="noopener noreferrer" className="inline-block border border-gray-200 px-8 py-4 text-base font-bold text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
            View on Behance &rarr;
          </a>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12 bg-gray-50" aria-label="Related services">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-6">Related Services</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { title: "Social Media", href: "/services/social-media" },
              { title: "Branding", href: "/services/branding" },
              { title: "Photography", href: "/services/photography" },
            ].map((s) => (
              <Link key={s.href} href={s.href} className="border border-gray-200 px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-black text-white text-center" aria-label="Get started">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Fashion Social Media Design?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s create scroll-stopping social media content for your brand.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-block bg-white text-black font-bold px-8 py-4 text-base hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                Get a Free Consultation &rarr;
              </Link>
              <Link href="/work" className="inline-block border-2 border-white text-white font-bold px-8 py-4 text-base hover:bg-white hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                See More Work
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    </article>
  );
}
