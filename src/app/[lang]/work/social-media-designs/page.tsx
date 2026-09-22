import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Animate, Stagger } from "@/components/animate";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Social Media Designs — Creative Portfolio",
  description: "Social media design portfolio featuring brand identity, campaign graphics, and digital content for technology, lifestyle, and consumer brands by Markit Media.",
  alternates: { canonical: "https://themarkitmedia.com/en/work/social-media-designs" },
};

const galleryImages = [
  { src: "/images/portfolio/social-media-hero.jpg", alt: "Binarygrid — technology brand social media design" },
  { src: "/images/portfolio/social-media-01.jpg", alt: "Social media campaign design — brand identity post" },
  { src: "/images/portfolio/social-media-02.jpg", alt: "Social media promotional design — product feature" },
];

export default function SocialMediaDesignsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Social Media Designs — Creative Portfolio",
    description: "Social media design portfolio by Markit Media for technology, lifestyle, and consumer brands.",
    creator: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: "Social Media Designs" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-12" aria-label="Social Media Designs">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="text-base font-medium text-gray-400 uppercase tracking-[0.15em]">Social Media</span>
              <span className="text-gray-300" aria-hidden="true">|</span>
              <span className="text-base text-gray-400">Graphic Design</span>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold text-black tracking-tight leading-[1.1]">
              Social Media Designs
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-3xl">
              A diverse collection of social media designs spanning technology companies, lifestyle brands, and consumer products. Each project was designed to strengthen brand identity and drive engagement across social platforms.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {["Social Media", "Brand Identity", "Campaign Design", "Graphic Design"].map((s) => (
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
                This collection represents social media designs created for multiple clients across different industries. Each brand received a tailored visual strategy: custom templates, campaign-specific graphics, and ongoing content that maintains brand consistency while maximizing platform-specific engagement.
              </p>
            </div>
          </Animate>

          <Animate animation="fade-up">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">What We Delivered</h2>
              <ul className="space-y-3">
                {[
                  "Custom social media post templates for brand consistency",
                  "Campaign graphics for product launches and promotions",
                  "Platform-specific content design (Instagram, LinkedIn, Facebook)",
                  "Brand identity visuals adapted for digital channels",
                  "Story highlights, carousel posts, and engagement-focused content",
                  "Visual systems scalable across ongoing campaigns",
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
          <p className="text-base text-gray-500 mb-6">See the complete social media design collection on Behance.</p>
          <a href="https://www.behance.net/gallery/228353933/Social-Media-Designs" target="_blank" rel="noopener noreferrer" className="inline-block border border-gray-200 px-8 py-4 text-base font-bold text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
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
              { title: "Digital Marketing", href: "/services/digital-marketing" },
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
              Need Social Media Design?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a visual strategy that strengthens your brand across every platform.
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
