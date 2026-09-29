import type { ReactNode } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { QuoteForm } from "@/components/quote-form";
import { getPostsByCategory } from "@/lib/blog";

interface SubServicePageProps {
  parentTitle: string;
  parentHref: string;
  title: string;
  description: string;
  details: string[];
  benefits: string[];
  faq: { q: string; a: string }[];
  relatedServices?: { title: string; href: string; desc?: string }[];
  portfolio?: { title: string; href: string; desc: string }[];
  blogCategory?: string;
  children?: ReactNode;
}

export function SubServicePage({ parentTitle, parentHref, title, description, details, benefits, faq, relatedServices = [], portfolio = [], blogCategory, children }: SubServicePageProps) {
  const relatedPosts = blogCategory ? getPostsByCategory(blogCategory, 3) : [];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <article>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: parentTitle, href: parentHref }, { label: title }]} />

      <section className="px-6 lg:px-12 pt-24 pb-16" aria-label={title}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Animate animation="fade-up">
              <SectionLabel>{parentTitle}</SectionLabel>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
                {title}
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mt-6">{description}</p>
            </Animate>

            <Animate animation="fade-up" delay={150}>
              <div className="mt-10">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">What This Service Includes</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">A practical breakdown of the work we can take ownership of within this service.</p>
                <ul className="space-y-3">
                  {details.map((d, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-8 h-8 bg-black text-white flex items-center justify-center flex-shrink-0 text-base font-bold mt-0.5">{i + 1}</span>
                      <span className="text-base text-gray-600 leading-relaxed">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={200}>
              <div className="mt-10">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">What the Engagement Is Designed to Improve</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">The exact KPIs depend on your objective, but these are the outcomes this work is built to support.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-gray-50">
                      <span className="text-black font-bold flex-shrink-0" aria-hidden="true">&#10003;</span>
                      <span className="text-base text-gray-600">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Animate>
          </div>

          <aside className="lg:col-span-1">
            <Animate animation="fade-up" delay={200}>
              <QuoteForm service={title} />
            </Animate>
          </aside>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 border-y border-gray-200 bg-gray-50" aria-label="How this service works">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>How We Deliver It</SectionLabel>
          <SectionTitle>Clear Scope, Clear Ownership, Clear Next Steps</SectionTitle>
          <p className="text-lg text-gray-500 leading-relaxed mt-5 max-w-3xl">
            The exact execution changes by service and client, but the operating principle stays consistent: understand the current state, define the work, execute it properly, validate the result, and keep improving what matters.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
            {[
              ["01", "Audit", "Review the current setup, goals, constraints, data, assets, competitors, and the most important problems to solve."],
              ["02", "Plan", "Define priorities, deliverables, ownership, dependencies, timeline, and how success will be measured."],
              ["03", "Execute", "Build, configure, create, produce, or implement the agreed work with documented review points."],
              ["04", "Validate", "Check quality, tracking, functionality, delivery, or campaign readiness before treating the work as complete."],
              ["05", "Improve", "Use performance data and feedback to decide what to refine, scale, test, or prioritize next."],
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

      {children}

      {(portfolio.length > 0 || relatedServices.length > 0) && <section className="px-6 lg:px-12 py-20" aria-label="Related work and services"><div className="max-w-7xl mx-auto">
        <SectionLabel>Keep Exploring</SectionLabel><SectionTitle>Related Work & Services</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          {portfolio.length > 0 && <div><h3 className="font-extrabold mb-4">Relevant work</h3><div className="space-y-3">{portfolio.map(p=><Link key={p.href} href={p.href} className="block border border-gray-200 p-5 hover:border-black"><span className="font-bold">{p.title}</span><span className="block text-sm text-gray-500 mt-1">{p.desc}</span></Link>)}</div></div>}
          {relatedServices.length > 0 && <div><h3 className="font-extrabold mb-4">Related services</h3><div className="space-y-3">{relatedServices.map(s=><Link key={s.href} href={s.href} className="block border border-gray-200 p-5 hover:border-black"><span className="font-bold">{s.title}</span>{s.desc && <span className="block text-sm text-gray-500 mt-1">{s.desc}</span>}</Link>)}</div></div>}
        </div>
      </div></section>}

      {relatedPosts.length > 0 && <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Related insights"><div className="max-w-7xl mx-auto">
        <SectionLabel>Insights</SectionLabel><SectionTitle>Read Next</SectionTitle>
        <div className="grid md:grid-cols-3 gap-6 mt-10">{relatedPosts.map(post=><Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white border border-gray-200 p-6 hover:shadow-lg transition-all"><span className="text-xs font-bold uppercase tracking-wider text-gray-400">{post.category}</span><h3 className="font-extrabold text-lg mt-3 group-hover:underline">{post.title}</h3><p className="text-sm text-gray-500 mt-3 line-clamp-3">{post.excerpt}</p><span className="inline-block mt-5 text-sm font-bold">Read article →</span></Link>)}</div>
      </div></section>}

      <section className="px-6 lg:px-12 py-20" aria-label="Request a quote">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          <div className="pt-2">
            <SectionLabel>Request a Quote</SectionLabel>
            <SectionTitle>Tell Us About the Work You Need</SectionTitle>
            <p className="text-lg text-gray-500 leading-relaxed mt-5">
              Share your current setup, the result you want, what has already been tried, and where you need our team to take ownership. We will use that context to recommend the right scope for {title.toLowerCase()}.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mt-7">
              {details.slice(0, 4).map((item, index) => (
                <div key={index} className="border border-gray-200 bg-gray-50 px-4 py-3">
                  <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
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

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center" aria-label="Get started">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Tell us what you need, what is already in place, and the result you want from {title.toLowerCase()}.
            </p>
            <Link href="#top" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Review the Service &uarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
