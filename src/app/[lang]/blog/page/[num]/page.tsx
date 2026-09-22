import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { getPublishedPosts, getPublishedPostCount } from "@/lib/blog";
import { redirect } from "next/navigation";

const PER_PAGE = 30;

export const dynamicParams = false;

export function generateStaticParams() {
  const total = getPublishedPostCount();
  const pages = Math.ceil(total / PER_PAGE);
  return Array.from({ length: pages - 1 }, (_, i) => ({ num: String(i + 2) }));
}

export async function generateMetadata({ params }: { params: Promise<{ num: string }> }): Promise<Metadata> {
  const { num } = await params;
  const page = parseInt(num, 10);
  return {
    title: `Blog — Page ${page} — Digital Marketing Insights`,
    description: `Page ${page} of the Markit Media blog. Expert insights on SEO, paid advertising, social media, branding, and digital marketing strategy.`,
    alternates: { canonical: `https://themarkitmedia.com/en/blog/page/${page}` },
    robots: page > 1 ? { index: true, follow: true } : undefined,
    openGraph: {
      title: `Blog — Page ${page}`,
      description: "Expert insights on digital marketing strategy and execution.",
    },
  };
}

export default async function BlogPaginatedPage({ params }: { params: Promise<{ num: string }> }) {
  const { num } = await params;
  const page = parseInt(num, 10);

  if (isNaN(page) || page < 1) redirect("/blog");
  if (page === 1) redirect("/blog");

  const totalCount = getPublishedPostCount();
  const totalPages = Math.ceil(totalCount / PER_PAGE);

  if (page > totalPages) redirect("/blog");

  const offset = (page - 1) * PER_PAGE;
  const posts = getPublishedPosts(PER_PAGE, offset);

  return (
    <article>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: `Page ${page}` }]} />

      <section aria-label="Blog" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Blog</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Digital Marketing Insights
            </h1>
            <SectionDesc>
              Page {page} of {totalPages} — {totalCount}+ articles
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Blog articles">
        <div className="max-w-7xl mx-auto">
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group border border-gray-200 hover:border-black/30 hover:shadow-md transition-all duration-300 motion-reduce:transition-none flex flex-col focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center overflow-hidden">
                  {post.cover_image ? (
                    <img src={post.cover_image} alt={`Cover for ${post.title}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform motion-reduce:transition-none duration-500" />
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
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Pagination">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center justify-center gap-2 flex-wrap" aria-label="Blog pagination">
            {page > 1 && (
              <Link
                href={page === 2 ? "/blog" : `/blog/page/${page - 1}`}
                className="border border-gray-200 px-5 py-3 text-base font-bold text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                &larr; Previous
              </Link>
            )}
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let p: number;
              if (totalPages <= 7) {
                p = i + 1;
              } else if (page <= 4) {
                p = i + 1;
              } else if (page >= totalPages - 3) {
                p = totalPages - 6 + i;
              } else {
                p = page - 3 + i;
              }
              return (
                <Link
                  key={p}
                  href={p === 1 ? "/blog" : `/blog/page/${p}`}
                  className={`min-w-[44px] min-h-[44px] flex items-center justify-center text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                    p === page
                      ? "bg-black text-white"
                      : "border border-gray-200 text-black hover:bg-black hover:text-white"
                  }`}
                  aria-current={p === page ? "page" : undefined}
                >
                  {p}
                </Link>
              );
            })}
            {page < totalPages && (
              <Link
                href={`/blog/page/${page + 1}`}
                className="border border-gray-200 px-5 py-3 text-base font-bold text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Next &rarr;
              </Link>
            )}
          </nav>
        </div>
      </section>

      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
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
