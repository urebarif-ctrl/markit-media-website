import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { getPublishedPosts, getPublishedPostCount, getAllCategories } from "@/lib/blog";
import { NewsletterCta } from "@/components/newsletter-cta";
import { BlogSearch } from "@/components/blog-search";

export const metadata: Metadata = {
  title: "Blog ,  Digital Marketing Insights",
  description: "Expert insights on SEO, paid advertising, social media, branding, web development, and digital marketing strategy from Markit Media.",
  alternates: { canonical: "https://themarkitmedia.com/en/blog" },
  openGraph: {
    title: "Markit Media Blog",
    description:
      "Expert insights on SEO, paid ads, social media, branding, and digital marketing strategy.",
  },
};

export default function BlogPage() {
  const totalCount = getPublishedPostCount();
  const posts = getPublishedPosts(30);
  const dbCategories = getAllCategories();
  const categories = ["All", ...dbCategories];

  const featured = posts[0] ?? null;
  const remaining = posts.slice(1);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Markit Media Blog",
    description: "Expert insights on digital marketing, SEO, and business growth.",
    url: "https://themarkitmedia.com/en/blog",
    publisher: {
      "@type": "Organization",
      name: "Markit Media",
      url: "https://themarkitmedia.com",
    },
  };

  return (
    <article>
      <JsonLd data={blogSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-12" aria-label="Blog overview">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Blog</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Digital Marketing Insights
            </h1>
            <SectionDesc>
              {totalCount}+ articles on SEO, advertising, social media, branding, web development, and growth strategy.
            </SectionDesc>
            <div className="mt-6">
              <BlogSearch />
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-8" aria-label="Category filters">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, i) => {
                if (cat === "All") {
                  return (
                    <span key={cat} className="px-4 py-2 text-base font-medium bg-black text-white">
                      All
                    </span>
                  );
                }
                const slug = cat.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
                return (
                  <Link
                    key={cat}
                    href={`/blog/category/${slug}`}
                    className="px-4 py-2 text-base font-medium bg-gray-100 text-gray-600 hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    {cat}
                  </Link>
                );
              })}
            </div>
          </Animate>
        </div>
      </section>

      {featured && (
        <section className="px-6 lg:px-12 py-8" aria-label="Featured article">
          <div className="max-w-7xl mx-auto">
            <Animate animation="fade-up">
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-8 border border-gray-200 hover:border-black/30 hover:shadow-lg transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                <div className="aspect-[16/9] lg:aspect-auto overflow-hidden">
                  {featured.cover_image ? (
                    <Image src={featured.cover_image} alt={`Cover for ${featured.title}`} width={800} height={450} className="w-full h-full object-cover group-hover:scale-105 transition-transform motion-reduce:transition-none duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-5xl text-gray-300" aria-hidden="true">&#9998;</span>
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-base font-bold text-black uppercase tracking-wide">{featured.category}</span>
                    <span className="text-base text-gray-400">{featured.reading_time} min read</span>
                  </div>
                  <h2 className="font-[family-name:var(--font-display)] text-xl lg:text-2xl font-extrabold text-black group-hover:underline mb-4 leading-snug">
                    {featured.title}
                  </h2>
                  <p className="text-base text-gray-500 leading-relaxed mb-4">{featured.excerpt}</p>
                  {featured.published_at && (
                    <time className="text-base text-gray-400" dateTime={featured.published_at}>
                      {new Date(featured.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </time>
                  )}
                </div>
              </Link>
            </Animate>
          </div>
        </section>
      )}

      <section className="px-6 lg:px-12 py-12" aria-label="Blog articles">
        <div className="max-w-7xl mx-auto">
          {remaining.length === 0 ? (
            <p className="text-base text-gray-500 text-center py-12">More articles coming soon.</p>
          ) : (
            <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remaining.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group border border-gray-200 hover:border-black/30 hover:shadow-md transition-all duration-300 motion-reduce:transition-none flex flex-col focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center overflow-hidden">
                    {post.cover_image ? (
                      <Image src={post.cover_image} alt={`Cover for ${post.title}`} width={640} height={360} className="w-full h-full object-cover group-hover:scale-105 transition-transform motion-reduce:transition-none duration-500" />
                    ) : (
                      <span className="text-5xl text-gray-300" aria-hidden="true">&#9998;</span>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-base font-bold text-black uppercase tracking-wide">{post.category}</span>
                      <span className="text-base text-gray-400">{post.reading_time} min read</span>
                    </div>
                    <h2 className="font-[family-name:var(--font-display)] text-base font-bold text-black group-hover:underline mb-3 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-base text-gray-500 leading-relaxed flex-1">{post.excerpt}</p>
                    {post.published_at && (
                      <time className="text-base text-gray-400 mt-3 block" dateTime={post.published_at}>
                        {new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </time>
                    )}
                  </div>
                </Link>
              ))}
            </Stagger>
          )}
        </div>
      </section>

      {totalCount > 30 && (
        <section className="px-6 lg:px-12 py-8" aria-label="More pages">
          <div className="max-w-4xl mx-auto text-center">
            <Animate animation="fade-up">
              <Link
                href="/blog/page/2"
                className="inline-flex items-center gap-3 border-2 border-black text-black px-10 py-5 font-bold text-base hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                View More Articles &rarr;
              </Link>
            </Animate>
          </div>
        </section>
      )}

      {totalCount > 30 && (
        <section className="px-6 lg:px-12 py-12 bg-gray-50" aria-label="Browse by category">
          <div className="max-w-4xl mx-auto text-center">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                Browse All {totalCount}+ Articles by Category
              </h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {dbCategories.map((cat) => {
                  const slug = cat.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
                  return (
                    <Link
                      key={cat}
                      href={`/blog/category/${slug}`}
                      className="border border-gray-200 bg-white px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                    >
                      {cat}
                    </Link>
                  );
                })}
              </div>
            </Animate>
          </div>
        </section>
      )}

      <section className="px-6 lg:px-12 py-12" aria-label="Explore more">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Resources & Tools", href: "/resources" },
                { label: "Glossary", href: "/glossary" },
                { label: "FAQ", href: "/faq" },
                { label: "All Services", href: "/services" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="border border-gray-200 px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  {link.label}
                </Link>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-gray-50" aria-label="Newsletter signup">
        <div className="max-w-3xl mx-auto text-center">
          <Animate animation="fade-up">
            <SectionLabel>Stay Updated</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black tracking-tight mt-3 mb-3">
              Get Marketing Insights in Your Inbox
            </h2>
            <p className="text-base text-gray-500 mb-8">
              Actionable tips on SEO, paid ads, and growth strategy. No spam, unsubscribe anytime.
            </p>
            <NewsletterCta />
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center" aria-label="Get in touch">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help With Your Marketing?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Talk to our team about a strategy built around your goals.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
