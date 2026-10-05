import Link from "next/link";
import { BrandIcon } from "@/components/brand-icon";
import Image from "next/image";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { getPostsByCategory } from "@/lib/blog";
import { QuoteForm } from "@/components/quote-form";
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

interface ComparisonTable {
  title?: string;
  leftLabel?: string;
  rightLabel?: string;
  rows: [string, string, string][];
}

interface ServicePlatform { name:string; note?:string; href?:string; }

interface ServicePageProps {
  icon: LucideIcon;
  parentTitle?: string;
  parentHref?: string;
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
  comparison?: ComparisonTable;
  platforms?: ServicePlatform[];
}

export function ServicePage({
  icon: Icon,
  parentTitle,
  parentHref,
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
  comparison,
  platforms,
}: ServicePageProps) {
  const relatedPosts = blogCategory
    ? getPostsByCategory(blogCategory, 3)
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
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, ...(parentTitle && parentHref ? [{ label: parentTitle, href: parentHref }] : []), { label: title }]} />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16" aria-label={title}>
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
                <Link href="#service-scope" className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  Explore What&apos;s Included &darr;
                </Link>
                <Link href="#service-quote" className="inline-flex items-center gap-3 border border-black text-black px-8 py-4 font-bold text-base hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  Request a Quote &rarr;
                </Link>
              </div>
            </div>
          </Animate>
          {heroImage && (
            <Animate animation="fade-in" delay={200}>
              <Image src={heroImage} alt={`${title} illustration`} width={800} height={600} className="w-full aspect-[4/3] object-cover" priority />
            </Animate>
          )}
        </div>
      </section>

      {/* Sub-services */}

      {subServices.length > 0 && (
        <section id="service-scope" className="px-6 lg:px-12 py-20 bg-gray-50 scroll-mt-24" aria-label="Services included">
          <div className="max-w-7xl mx-auto">
            <Animate animation="fade-up">
              <SectionLabel>What&apos;s Included</SectionLabel>
              <SectionTitle>What You Can Hire Us For</SectionTitle>
              <p className="text-lg text-gray-500 leading-relaxed mt-5 max-w-3xl">
                This is not a single generic deliverable. The engagement can include the specialist services below, combined around your goals, current setup, internal resources, and the work that will create the most value.
              </p>
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

      {platforms && platforms.length > 0 && <section className="px-6 lg:px-12 py-16 border-y border-gray-200" aria-label="Platforms and tools we work with"><div className="max-w-7xl mx-auto"><Animate animation="fade-up"><SectionLabel>Platforms & Tools</SectionLabel><SectionTitle>Technology We Work With</SectionTitle><p className="text-base text-gray-500 leading-relaxed mt-4 max-w-3xl">We choose the platform around the workflow, data, ownership and growth requirements rather than forcing every project into one tool.</p></Animate><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200 mt-8">{platforms.map((platform)=><div key={platform.name} className="bg-white min-h-28 p-5"><div className="flex items-center gap-3"><div className="w-9 h-9 border border-gray-200 flex items-center justify-center"><BrandIcon brand={platform.name} className="w-5 h-5" title={platform.name}/></div><div><div className="font-bold text-sm">{platform.href?<Link href={platform.href} className="hover:underline">{platform.name}</Link>:platform.name}</div>{platform.note&&<p className="text-xs text-gray-500 leading-relaxed mt-1">{platform.note}</p>}</div></div></div>)}</div></div></section>}

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

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="How we deliver this service">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>How We Work</SectionLabel>
            <SectionTitle>From Scope to Execution to Improvement</SectionTitle>
            <p className="text-lg text-gray-500 leading-relaxed mt-5 max-w-3xl">
              We do not start with a prebuilt package and force it onto every client. We first understand the objective and current setup, then define the right scope, execute the work, measure what happened, and improve the next cycle.
            </p>
          </Animate>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
            {[
              ["01", "Discover", "Understand the business, audience, current performance, constraints, assets, and priorities."],
              ["02", "Scope", "Define the work, deliverables, channels, ownership, timeline, and measurement plan."],
              ["03", "Build", "Create, configure, produce, or implement the agreed work with clear review points."],
              ["04", "Launch", "Publish, deploy, activate, or hand off the work with the right checks in place."],
              ["05", "Improve", "Review performance and feedback, then prioritize the next iteration instead of treating launch as the finish line."],
            ].map(([number, step, copy]) => (
              <div key={number} className="bg-white border border-gray-200 p-5">
                <span className="text-xs font-bold text-gray-400 tracking-[0.16em]">{number}</span>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold mt-3">{step}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mt-3">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="service-quote" className="px-6 lg:px-12 py-20 scroll-mt-24" aria-label="Request a quote">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          <div className="pt-2">
            <SectionLabel>Request a Quote</SectionLabel>
            <SectionTitle>Tell Us What You Need</SectionTitle>
            <p className="text-lg text-gray-500 leading-relaxed mt-5">
              Share your current setup, the result you want, what your team already handles, and where you need us to take ownership. We will use that context to recommend a sensible scope rather than pushing a generic package.
            </p>
            <div className="mt-7 grid sm:grid-cols-2 gap-3">
              {subServices.slice(0, 6).map((sub) => (
                <div key={sub.href} className="border border-gray-200 bg-gray-50 px-4 py-3">
                  <span className="text-sm font-bold text-black">{sub.title}</span>
                </div>
              ))}
            </div>
          </div>
          <QuoteForm
            service={title}
            title={`Request a ${title} Quote`}
            buttonText="Send Request"
            messagePlaceholder="Your business, current setup, goals, timeline, and what you want us to handle..."
          />
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
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/work" className="inline-flex items-center gap-2 text-base font-bold text-black hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                    View All Projects &rarr;
                  </Link>
                  <Link href="/case-studies" className="inline-flex items-center gap-2 text-base font-bold text-gray-500 hover:text-black hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                    Explore Case Studies &rarr;
                  </Link>
                </div>
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
              {comparison?.title ?? "Markit Media vs. Typical Agencies"}
            </h2>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="py-4 pr-6 text-base font-bold text-gray-400 w-1/3">Criteria</th>
                    <th className="py-4 px-4 text-base font-bold text-white w-1/3">{comparison?.leftLabel ?? "Markit Media"}</th>
                    <th className="py-4 pl-4 text-base font-bold text-gray-500 w-1/3">{comparison?.rightLabel ?? "Typical Agency"}</th>
                  </tr>
                </thead>
                <tbody className="text-base">
                  {(comparison?.rows ?? [
                    ["Dedicated Team", "Senior-level specialists assigned to your account", "Junior staff or rotating freelancers"],
                    ["Reporting", "Real-time dashboards with full data access", "Monthly PDF summaries with limited detail"],
                    ["Contracts", "Flexible month-to-month", "6-12 month lock-in contracts"],
                    ["Strategy", "Custom strategy built around your goals", "Cookie-cutter playbook across all clients"],
                    ["Communication", "Direct Slack/WhatsApp access to your team", "Emails routed through account managers"],
                    ["Pricing", "Transparent pricing, no hidden fees", "Opaque pricing with markup on ad spend"],
                  ]).map(([criteria, markit, typical], i) => (
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
                      <Image src={post.cover_image} alt={`Cover for ${post.title}`} width={640} height={360} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 motion-reduce:transition-none" />
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
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center" aria-label="Get started">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s discuss how {title.toLowerCase()} can grow your business.
            </p>
            <Link href="#service-quote" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Request a Quote &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
