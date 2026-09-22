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

interface PortfolioItem {
  client: string;
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
  tools?: { title: string; desc: string; href: string }[];
  industries?: { title: string; href: string }[];
  portfolio?: PortfolioItem[];
  locations?: { title: string; href: string }[];
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
  tools,
  industries,
  portfolio,
  locations,
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
                <Link href="/contact" className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  Get Started &rarr;
                </Link>
              </div>
            </div>
          </Animate>
          {heroImage && (
            <Animate animation="fade-in" delay={200}>
              <img src={heroImage} alt={`${title} illustration`} className="w-full aspect-[4/3] object-cover" />
            </Animate>
          )}
        </div>
      </section>

      {/* Platform Logos */}
      <section className="border-y border-gray-200 py-6 bg-white" aria-label="Platforms">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <p className="text-base font-bold text-gray-300 uppercase tracking-widest text-center mb-4">Trusted by teams advertising on</p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-10 text-gray-300">
            <svg className="h-6 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="Facebook"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            <svg className="h-6 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="Instagram"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            <svg className="h-6 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="Google"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
            <svg className="h-6 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="LinkedIn"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            <svg className="h-6 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="YouTube"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            <svg className="h-6 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="TikTok"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
            <svg className="h-5 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="X"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
            <svg className="h-6 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="Shopify"><path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104zm-1.332-17.22c0-.136-.012-.26-.033-.381-.592-.304-1.248-.473-1.941-.473-.154 0-.32.017-.467.025.252-.544.685-.972 1.217-1.178.133-.052.271-.092.422-.11.14-.017.281-.017.403.009.275.059.533.199.748.401l-.349 1.707z"/></svg>
            <svg className="h-6 hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-label="WordPress"><path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.027-.78-.07-1.109m-7.981.105c.647-.034 1.233-.105 1.233-.105.58-.07.512-.921-.07-.892 0 0-1.744.14-2.87.14-1.058 0-2.835-.14-2.835-.14-.58-.029-.647.858-.068.892 0 0 .549.07 1.128.105l1.674 4.591-2.35 7.06L6.574 6.93c.648-.034 1.234-.105 1.234-.105.581-.07.513-.921-.069-.892 0 0-1.745.14-2.87.14-.202 0-.44-.006-.693-.015C5.88 3.528 8.739 2 12 2c2.426 0 4.636.885 6.332 2.349-.04-.003-.078-.01-.12-.01-1.057 0-1.807.921-1.807 1.91 0 .892.512 1.643 1.057 2.534.41.717.888 1.636.888 2.962 0 .921-.352 1.986-.82 3.473l-1.073 3.586-3.892-11.574m-3.726 1.31L7.18 16.66c-.07.172-.13.36-.172.557a7.96 7.96 0 01-4.008-6.9c0-1.37.347-2.66.955-3.787l4.795 11.61zM12 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10"/></svg>
          </div>
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
                <Link key={sub.href} href={sub.href} className="group bg-white border border-gray-200 hover:border-black/30 transition-all motion-reduce:transition-none p-6 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
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

      {/* Portfolio */}
      {portfolio && portfolio.length > 0 && (
        <section className="px-6 lg:px-12 py-16" aria-label="Featured work">
          <div className="max-w-7xl mx-auto">
            <Animate animation="fade-up">
              <SectionLabel>Our Work</SectionLabel>
              <SectionTitle>Featured Projects</SectionTitle>
            </Animate>
            <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {portfolio.map((p) => (
                <Link key={p.href} href={p.href} className="group border border-gray-200 hover:border-black/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none p-6 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black group-hover:underline mb-2">{p.client}</h3>
                  <p className="text-base text-gray-500 leading-relaxed">{p.desc}</p>
                </Link>
              ))}
            </Stagger>
            <Animate animation="fade-up" delay={100}>
              <div className="mt-8 text-center">
                <Link href="/work" className="inline-flex items-center gap-2 text-base font-bold text-black hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  View All Projects &rarr;
                </Link>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* Comparison Table */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white" aria-label="Why Markit Media">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel><span className="text-gray-400">Compare</span></SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-white mt-3 mb-10">
              Markit Media vs. Typical Agencies
            </h2>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="py-4 pr-6 text-base font-bold text-gray-400 w-1/3">Criteria</th>
                    <th className="py-4 px-4 text-base font-bold text-white w-1/3">Markit Media</th>
                    <th className="py-4 pl-4 text-base font-bold text-gray-500 w-1/3">Typical Agency</th>
                  </tr>
                </thead>
                <tbody className="text-base">
                  {[
                    ["Dedicated Team", "Senior-level specialists assigned to your account", "Junior staff or rotating freelancers"],
                    ["Reporting", "Real-time dashboards with full data access", "Monthly PDF summaries with limited detail"],
                    ["Contracts", "Flexible month-to-month", "6-12 month lock-in contracts"],
                    ["Strategy", "Custom strategy built around your goals", "Cookie-cutter playbook across all clients"],
                    ["Communication", "Direct Slack/WhatsApp access to your team", "Emails routed through account managers"],
                    ["Pricing", "Transparent pricing, no hidden fees", "Opaque pricing with markup on ad spend"],
                  ].map(([criteria, markit, typical], i) => (
                    <tr key={i} className="border-b border-white/10">
                      <td className="py-4 pr-6 text-gray-400 font-medium">{criteria}</td>
                      <td className="py-4 px-4 text-white font-semibold">{markit}</td>
                      <td className="py-4 pl-4 text-gray-500">{typical}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Animate>
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
                    <span className="text-xl text-gray-500 group-open:rotate-45 transition-transform motion-reduce:transition-none flex-shrink-0 ml-4" aria-hidden="true">+</span>
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
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group border border-gray-200 hover:border-black/30 transition-all motion-reduce:transition-none flex flex-col focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  {post.cover_image && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={post.cover_image} alt={`Cover for ${post.title}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 motion-reduce:transition-none" loading="lazy" />
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

      {/* Free Tools */}
      {tools && tools.length > 0 && (
        <section className="px-6 lg:px-12 py-16" aria-label="Free tools">
          <div className="max-w-7xl mx-auto">
            <Animate animation="fade-up">
              <SectionLabel>Free Tools</SectionLabel>
              <SectionTitle>Try These Related Tools</SectionTitle>
            </Animate>
            <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {tools.map((tool) => (
                <Link key={tool.href} href={tool.href} className="group border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black group-hover:underline mb-2">{tool.title}</h3>
                  <p className="text-base text-gray-500 leading-relaxed">{tool.desc}</p>
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
                  <Link key={rs.href} href={rs.href} className="border border-gray-200 px-6 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                    {rs.title}
                  </Link>
                ))}
              </div>
            </Animate>
          </div>
        </section>
      )}

      {industries && industries.length > 0 && (
        <section className="px-6 lg:px-12 py-12 bg-gray-50" aria-label="Industries we serve">
          <div className="max-w-4xl mx-auto">
            <Animate animation="fade-up">
              <SectionLabel>Industries We Serve</SectionLabel>
              <div className="flex flex-wrap gap-3 mt-6">
                {industries.map((ind) => (
                  <Link key={ind.href} href={ind.href} className="border border-gray-200 bg-white px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                    {ind.title}
                  </Link>
                ))}
              </div>
            </Animate>
          </div>
        </section>
      )}

      {locations && locations.length > 0 && (
        <section className="px-6 lg:px-12 py-12" aria-label="Available locations">
          <div className="max-w-4xl mx-auto">
            <Animate animation="fade-up">
              <SectionLabel>Available In</SectionLabel>
              <div className="flex flex-wrap gap-3 mt-6">
                {locations.map((loc) => (
                  <Link key={loc.href} href={loc.href} className="border border-gray-200 bg-white px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                    {loc.title}
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
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none">
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
