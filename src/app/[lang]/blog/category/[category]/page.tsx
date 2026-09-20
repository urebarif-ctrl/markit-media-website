import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { getPostsByCategory, getAllCategories } from "@/lib/blog";
import { notFound } from "next/navigation";

function slugToCategory(slug: string): string {
  return decodeURIComponent(slug).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function categoryToSlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
}

export function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({
    category: categoryToSlug(cat),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const displayName = slugToCategory(category);
  return {
    title: `${displayName} Articles — Markit Media Blog`,
    description: `Read our latest articles on ${displayName.toLowerCase()}. Expert insights and actionable advice from Markit Media.`,
    alternates: { canonical: `https://themarkitmedia.com/en/blog/category/${category}` },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const allCategories = getAllCategories();
  const matchedCategory = allCategories.find(
    (c) => categoryToSlug(c) === category
  );

  if (!matchedCategory) {
    notFound();
  }

  const posts = getPostsByCategory(matchedCategory, 50);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${matchedCategory} Articles`,
    description: `Articles about ${matchedCategory.toLowerCase()} from Markit Media.`,
  };

  return (
    <article>
      <JsonLd data={blogSchema} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: matchedCategory },
        ]}
      />

      <section className="px-6 lg:px-12 pt-24 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>{matchedCategory}</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              {matchedCategory} Articles
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-4">
              {posts.length} article{posts.length !== 1 ? "s" : ""} on {matchedCategory.toLowerCase()}.
            </p>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-8" aria-label="All categories">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-8">
            <Link
              href="/blog"
              className="px-4 py-2 text-base font-medium border border-gray-200 text-gray-600 hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              All
            </Link>
            {allCategories.map((cat) => (
              <Link
                key={cat}
                href={`/blog/category/${categoryToSlug(cat)}`}
                className={`px-4 py-2 text-base font-medium border transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                  cat === matchedCategory
                    ? "bg-black text-white border-black"
                    : "border-gray-200 text-gray-600 hover:bg-black hover:text-white"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-8" aria-label="Articles">
        <div className="max-w-7xl mx-auto">
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group border border-gray-200 hover:border-black/30 transition-all flex flex-col focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
                  {post.cover_image ? (
                    <img
                      src={post.cover_image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-5xl text-gray-300" aria-hidden="true">&#9998;</span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-base font-bold text-black uppercase tracking-wide mb-2">{post.category}</span>
                  <h2 className="font-[family-name:var(--font-display)] text-base font-bold text-black group-hover:underline mb-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-base text-gray-500 leading-relaxed flex-1 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 mt-4 text-base text-gray-400">
                    <span>{post.reading_time} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help With {matchedCategory}?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team can turn these insights into a strategy tailored to your business.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
