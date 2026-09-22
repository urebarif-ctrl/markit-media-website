import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Animate, Stagger } from "@/components/animate";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "FoodFolio — Food & Beverage Design Portfolio",
  description: "Food and beverage design portfolio: social media content, brand campaigns, and promotional graphics for restaurants, cafes, and F&B brands by Markit Media.",
  alternates: { canonical: "https://themarkitmedia.com/en/work/foodfolio" },
};

const galleryImages = [
  { src: "/images/portfolio/foodfolio-hero.jpg", alt: "FoodFolio — food and beverage brand design overview" },
  { src: "/images/portfolio/foodfolio-01.jpg", alt: "Food brand social media design — restaurant campaign" },
  { src: "/images/portfolio/foodfolio-02.jpg", alt: "Food and beverage promotional design — menu showcase" },
];

export default function FoodFolioPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "FoodFolio — Food & Beverage Design",
    description: "Food and beverage design portfolio by Markit Media — social media, brand campaigns, and promotional graphics.",
    creator: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: "FoodFolio" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-12" aria-label="FoodFolio">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="text-base font-medium text-gray-400 uppercase tracking-[0.15em]">Food &amp; Beverage</span>
              <span className="text-gray-300" aria-hidden="true">|</span>
              <span className="text-base text-gray-400">Social Media &amp; Branding</span>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold text-black tracking-tight leading-[1.1]">
              FoodFolio
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-3xl">
              A collection of design work for food and beverage brands — from restaurants and cafes to packaged food products. Each project focuses on appetite appeal, brand storytelling, and visual consistency across social media and marketing channels.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {["Food & Beverage", "Social Media", "Brand Design", "Menu Design"].map((s) => (
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
                The FoodFolio collection brings together our work for food and beverage clients. From social media campaigns for restaurants to branding for food startups, each design balances appetite appeal with strategic communication to drive orders, foot traffic, and brand loyalty.
              </p>
            </div>
          </Animate>

          <Animate animation="fade-up">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">What We Delivered</h2>
              <ul className="space-y-3">
                {[
                  "Social media content calendars for F&B brands",
                  "Menu-style promotional graphics for digital channels",
                  "Seasonal campaign designs for holiday and special offers",
                  "Photography direction and post-production for food visuals",
                  "Brand identity systems for restaurants and food startups",
                  "Packaging design concepts for consumer food products",
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
          <p className="text-base text-gray-500 mb-6">See the complete food and beverage design portfolio on Behance.</p>
          <a href="https://www.behance.net/gallery/228262243/FoodFolio" target="_blank" rel="noopener noreferrer" className="inline-block border border-gray-200 px-8 py-4 text-base font-bold text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
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
              Need Food &amp; Beverage Design?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s create mouth-watering visuals that drive orders and build your brand.
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
