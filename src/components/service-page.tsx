import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { getPublishedPosts } from "@/lib/blog";
import type { LucideIcon } from "lucide-react";

interface SubService {
  title: string;
  desc: string;
  href: string;
}

interface ServicePageProps {
  icon: LucideIcon;
  title: string;
  description: string;
  longDescription: string;
  subServices: SubService[];
  benefits: string[];
  faq: { q: string; a: string }[];
  relatedServices?: { title: string; href: string }[];
  heroImage?: string;
  blogCategory?: string;
}

export function ServicePage({
  icon: Icon,
  title,
  description,
  longDescription,
  subServices,
  benefits,
  faq,
  relatedServices,
  heroImage,
  blogCategory,
}: ServicePageProps) {
  const relatedPosts = blogCategory
    ? getPublishedPosts(50).filter(
        (p) => p.category.toLowerCase().includes(blogCategory.toLowerCase())
      ).slice(0, 3)
    : [];
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    provider: {
      "@type": "Organization",
      name: "Markit Media",
      url: "https://themarkitmedia.com",
    },
    areaServed: ["United States", "Canada", "United Arab Emirates", "United Kingdom", "Australia", "Saudi Arabia"],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <article>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: title }]} />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className={`max-w-7xl mx-auto ${heroImage ? "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" : ""}`}>
          <Animate animation="fade-up">
            <div className={heroImage ? "" : "max-w-4xl"}>
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-6">
                <Icon size={28} strokeWidth={2} aria-hidden="true" />
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
                {title}
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mt-6">{description}</p>
              <p className="text-base text-gray-500 leading-relaxed mt-4">{longDescription}</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/contact" className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  Get Started &rarr;
                </Link>
              </div>
            </div>
          </Animate>
          {heroImage && (
            <Animate animation="fade-in" delay={200}>
              <img src={heroImage} alt="" className="w-full aspect-[4/3] object-cover" />
            </Animate>
          )}
        </div>
      </section>

      {/* Sub-services */}
      {subServices.length > 0 && (
        <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Services included">
          <div className="max-w-7xl mx-auto">
            <Animate animation="fade-up">
              <SectionLabel>What&apos;s Included</SectionLabel>
              <SectionTitle>Services</SectionTitle>
            </Animate>
            <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {subServices.map((sub) => (
                <Link key={sub.href} href={sub.href} className="group bg-white border border-gray-200 hover:border-black/30 transition-all p-6 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black uppercase tracking-wide mb-2 group-hover:underline">
                    {sub.title}
                  </h3>
                  <p className="text-base text-gray-500 leading-relaxed">{sub.desc}</p>
                </Link>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Benefits */}
      <section className="px-6 lg:px-12 py-20" aria-label="Benefits">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Choose Us</SectionLabel>
            <SectionTitle>Benefits</SectionTitle>
          </Animate>
          <ul className="mt-10 space-y-4">
            {benefits.map((b, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <li className="flex items-start gap-4 py-3 border-b border-gray-200">
                  <span className="w-8 h-8 bg-black text-white flex items-center justify-center flex-shrink-0 text-base font-bold">{i + 1}</span>
                  <span className="text-base text-gray-600 leading-relaxed">{b}</span>
                </li>
              </Animate>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="FAQ">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Common Questions</SectionTitle>
          </Animate>
          <div className="mt-10">
            {faq.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <details className="group border-b border-gray-200">
                  <summary className="flex justify-between items-center py-5 cursor-pointer text-base font-bold text-black list-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                    {item.q}
                    <span className="text-xl text-gray-500 group-open:rotate-45 transition-transform flex-shrink-0 ml-4" aria-hidden="true">+</span>
                  </summary>
                  <div className="pb-5 text-base text-gray-500 leading-relaxed">{item.a}</div>
                </details>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Related Blog Posts */}
      {relatedPosts.length > 0 && (
        <section className="px-6 lg:px-12 py-16" aria-label="Related articles">
          <div className="max-w-7xl mx-auto">
            <Animate animation="fade-up">
              <SectionLabel>From the Blog</SectionLabel>
              <SectionTitle>Related Articles</SectionTitle>
            </Animate>
            <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {relatedPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group border border-gray-200 hover:border-black/30 transition-all flex flex-col focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  {post.cover_image && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={post.cover_image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                  )}
                  <div className="p-5 flex-1">
                    <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black group-hover:underline mb-2 leading-snug">{post.title}</h3>
                    <p className="text-base text-gray-500 line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Related */}
      {relatedServices && relatedServices.length > 0 && (
        <section className="px-6 lg:px-12 py-16" aria-label="Related services">
          <div className="max-w-4xl mx-auto">
            <Animate animation="fade-up">
              <SectionLabel>Related Services</SectionLabel>
              <div className="flex flex-wrap gap-4 mt-6">
                {relatedServices.map((rs) => (
                  <Link key={rs.href} href={rs.href} className="border border-gray-200 px-6 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                    {rs.title}
                  </Link>
                ))}
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s discuss how {title.toLowerCase()} can grow your business.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors">
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
