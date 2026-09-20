import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Animate } from "@/components/animate";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { getPostBySlug, getRelatedPosts, getAllPublishedSlugs } from "@/lib/blog";
import { ShareControls } from "./share-controls";
import { ReadingProgress } from "@/components/reading-progress";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    alternates: { canonical: `https://themarkitmedia.com/en/blog/${slug}` },
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      type: "article",
      publishedTime: post.published_at || undefined,
      authors: [post.author],
      ...(post.og_image ? { images: [{ url: post.og_image }] } : {}),
    },
  };
}

export function generateStaticParams() {
  return getAllPublishedSlugs().map((slug) => ({ slug }));
}

function markdownToHtml(md: string): string {
  return md
    .replace(/^## (.+)$/gm, '<h2 class="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mt-10 mb-4">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="font-[family-name:var(--font-display)] text-lg font-bold text-black mt-8 mb-3">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.+)$/gm, '<li class="text-base text-gray-600 leading-relaxed ml-4">$1</li>')
    .replace(/\n\n/g, '</p><p class="text-base text-gray-600 leading-relaxed mb-4">')
    .replace(/^/, '<p class="text-base text-gray-600 leading-relaxed mb-4">')
    .replace(/$/, "</p>");
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const related = getRelatedPosts(slug, post.category, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
    datePublished: post.published_at,
    mainEntityOfPage: `https://themarkitmedia.com/en/blog/${slug}`,
    ...(post.cover_image ? { image: post.cover_image } : {}),
  };

  return (
    <article>
      <ReadingProgress />
      <JsonLd data={articleSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]} />

      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-base font-bold text-black uppercase tracking-wide">{post.category}</span>
              <span className="text-base text-gray-400">{post.reading_time} min read</span>
              {post.published_at && (
                <time className="text-base text-gray-400" dateTime={post.published_at}>
                  {new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </time>
              )}
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-extrabold text-black tracking-tight leading-[1.1]">
              {post.title}
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-4">{post.excerpt}</p>
            <div className="mt-6">
              <ShareControls title={post.title} />
            </div>
          </Animate>
        </div>
      </section>

      {post.cover_image && (
        <section className="px-6 lg:px-12 pb-8">
          <div className="max-w-4xl mx-auto">
            <img src={post.cover_image} alt="" className="w-full aspect-[2/1] object-cover" />
          </div>
        </section>
      )}

      <section className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto blog-prose" dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }} />
      </section>

      <section className="px-6 lg:px-12 pb-16">
        <div className="max-w-3xl mx-auto bg-gray-50 p-8 border border-gray-200">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
            Need Help With Your {post.category} Strategy?
          </h2>
          <p className="text-base text-gray-500 leading-relaxed mb-6">
            Our team specializes in turning these insights into results. Get a free consultation to discuss your goals.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-bold text-base hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
            Talk to an Expert &rarr;
          </Link>
        </div>
      </section>

      {related.length > 0 && (
        <section className="px-6 lg:px-12 py-16 bg-gray-50" aria-label="Related articles">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group border border-gray-200 bg-white hover:border-black/30 transition-all overflow-hidden focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  {r.cover_image && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={r.cover_image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="text-base font-bold text-black uppercase tracking-wide">{r.category}</span>
                    <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black group-hover:underline mt-2 mb-2 leading-snug">
                      {r.title}
                    </h3>
                    <p className="text-base text-gray-500 leading-relaxed line-clamp-2">{r.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 lg:px-12 py-16 border-t border-gray-200">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/blog" className="text-base font-bold text-black hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
            &larr; Back to Blog
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-bold text-base hover:bg-gray-800 transition-colors">
            Get in Touch &rarr;
          </Link>
        </div>
      </section>
    </article>
  );
}
