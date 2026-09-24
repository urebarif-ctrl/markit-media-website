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
}

export function SubServicePage({ parentTitle, parentHref, title, description, details, benefits, faq, relatedServices = [], portfolio = [], blogCategory }: SubServicePageProps) {
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
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-6">What We Do</h2>
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
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-6">Benefits</h2>
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

      <section className="px-6 lg:px-12 py-16 border-y border-gray-200" aria-label="How this service works">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div><SectionLabel>Approach</SectionLabel><h2 className="text-2xl font-extrabold mt-2">Clear scope. Useful work. Measurable next steps.</h2></div>
          <div className="md:col-span-2 grid sm:grid-cols-3 gap-4">
            {["Audit & priorities", "Build & launch", "Measure & improve"].map((step, i) => <div key={step} className="p-5 bg-gray-50"><span className="text-xs font-bold text-gray-400">0{i+1}</span><h3 className="font-bold mt-2">{step}</h3><p className="text-sm text-gray-500 mt-2">{i===0 ? "We establish goals, constraints, current performance and the highest-value opportunities." : i===1 ? "We turn the plan into campaigns, assets, systems or technical implementation with clear ownership." : "We review performance, learn from the data and prioritize the next iteration rather than treating launch as the finish line."}</p></div>)}
          </div>
        </div>
      </section>

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

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center" aria-label="Get started">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Contact us for a free consultation on {title.toLowerCase()}.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Get in Touch &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
