import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Animate } from "@/components/animate";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { getPostBySlug, getRelatedPosts, getAllPublishedSlugs } from "@/lib/blog";
import { ShareControls } from "./share-controls";
import { ReadingProgress } from "@/components/reading-progress";

/* ── Category-to-service mapping ─────────────────────────── */
const CATEGORY_SERVICES: Record<string, { label: string; href: string }[]> = {
  SEO: [
    { label: "SEO Services", href: "/services/seo" },
    { label: "Digital Marketing", href: "/services/digital-marketing" },
    { label: "Content Marketing", href: "/services/content-marketing" },
  ],
  "Performance Marketing": [
    { label: "Performance Marketing", href: "/services/performance-marketing" },
    { label: "Paid Advertising", href: "/services/paid-advertising" },
    { label: "Digital Marketing", href: "/services/digital-marketing" },
  ],
  "Social Media": [
    { label: "Social Media Marketing", href: "/services/social-media" },
    { label: "Content Marketing", href: "/services/content-marketing" },
    { label: "Video Production", href: "/services/video-production" },
  ],
  "Content Marketing": [
    { label: "Content Marketing", href: "/services/content-marketing" },
    { label: "SEO Services", href: "/services/seo" },
    { label: "Social Media Marketing", href: "/services/social-media" },
  ],
  "Email Marketing": [
    { label: "Email Marketing", href: "/services/email-marketing" },
    { label: "Performance Marketing", href: "/services/performance-marketing" },
    { label: "E-Commerce Marketing", href: "/services/ecommerce-marketing" },
  ],
  "Web Design": [
    { label: "Website Development", href: "/services/website-development" },
    { label: "E-Commerce Marketing", href: "/services/ecommerce-marketing" },
    { label: "Branding", href: "/services/branding" },
  ],
  "Web Development": [
    { label: "Website Development", href: "/services/website-development" },
    { label: "E-Commerce Marketing", href: "/services/ecommerce-marketing" },
    { label: "SEO Services", href: "/services/seo" },
  ],
  Branding: [
    { label: "Branding", href: "/services/branding" },
    { label: "Content Marketing", href: "/services/content-marketing" },
    { label: "Website Development", href: "/services/website-development" },
  ],
  "Video Marketing": [
    { label: "Video Production", href: "/services/video-production" },
    { label: "Social Media Marketing", href: "/services/social-media" },
    { label: "Content Marketing", href: "/services/content-marketing" },
  ],
  "Video Production": [
    { label: "Video Production", href: "/services/video-production" },
    { label: "Social Media Marketing", href: "/services/social-media" },
    { label: "Branding", href: "/services/branding" },
  ],
  "AI & Automation": [
    { label: "AI & Automation", href: "/services/ai" },
    { label: "Digital Marketing", href: "/services/digital-marketing" },
    { label: "Performance Marketing", href: "/services/performance-marketing" },
  ],
  Analytics: [
    { label: "Digital Marketing", href: "/services/digital-marketing" },
    { label: "Performance Marketing", href: "/services/performance-marketing" },
    { label: "SEO Services", href: "/services/seo" },
  ],
  "E-commerce": [
    { label: "E-Commerce Marketing", href: "/services/ecommerce-marketing" },
    { label: "Paid Advertising", href: "/services/paid-advertising" },
    { label: "Email Marketing", href: "/services/email-marketing" },
  ],
  Advertising: [
    { label: "Paid Advertising", href: "/services/paid-advertising" },
    { label: "Performance Marketing", href: "/services/performance-marketing" },
    { label: "Social Media Marketing", href: "/services/social-media" },
  ],
  Strategy: [
    { label: "Marketing Strategy", href: "/services/digital-marketing/marketing-strategy" },
    { label: "Digital Marketing", href: "/services/digital-marketing" },
    { label: "Performance Marketing", href: "/services/performance-marketing" },
  ],
  "Local SEO": [
    { label: "Local SEO", href: "/services/seo/local-seo" },
    { label: "SEO Services", href: "/services/seo" },
    { label: "Digital Marketing", href: "/services/digital-marketing" },
  ],
  "Local Marketing": [
    { label: "Local SEO", href: "/services/seo/local-seo" },
    { label: "SEO Services", href: "/services/seo" },
    { label: "Performance Marketing", href: "/services/performance-marketing" },
  ],
  "Digital Marketing": [
    { label: "Digital Marketing", href: "/services/digital-marketing" },
    { label: "Marketing Strategy", href: "/services/digital-marketing/marketing-strategy" },
    { label: "Performance Marketing", href: "/services/performance-marketing" },
  ],
  PPC: [
    { label: "Performance Marketing", href: "/services/performance-marketing" },
    { label: "Google Ads", href: "/services/performance-marketing/google-ads" },
    { label: "PPC Management", href: "/services/performance-marketing/ppc-management" },
  ],
};

/* ── Category-to-free-tools mapping ──────────────────────── */
const CATEGORY_TOOLS: Record<string, { label: string; href: string }[]> = {
  SEO: [
    { label: "SEO Health Check", href: "/resources/seo-checklist" },
    { label: "Website Grader", href: "/resources/website-grader" },
    { label: "Headline Analyzer", href: "/resources/headline-analyzer" },
    { label: "Meta Description Generator", href: "/resources/meta-description-generator" },
  ],
  "Performance Marketing": [
    { label: "PPC Audit Checklist", href: "/resources/ppc-audit-checklist" },
    { label: "ROI Calculator", href: "/resources/roi-calculator" },
    { label: "Budget Calculator", href: "/resources/budget-calculator" },
    { label: "Ad Copy Generator", href: "/resources/ad-copy-generator" },
  ],
  "Social Media": [
    { label: "Social Media Planner", href: "/resources/social-media-planner" },
    { label: "Social Share Preview", href: "/resources/og-preview" },
    { label: "Headline Analyzer", href: "/resources/headline-analyzer" },
    { label: "Content ROI Calculator", href: "/resources/content-roi-calculator" },
  ],
  "Content Marketing": [
    { label: "Content ROI Calculator", href: "/resources/content-roi-calculator" },
    { label: "Headline Analyzer", href: "/resources/headline-analyzer" },
    { label: "Meta Description Generator", href: "/resources/meta-description-generator" },
    { label: "Ad Copy Generator", href: "/resources/ad-copy-generator" },
  ],
  "Email Marketing": [
    { label: "Email ROI Calculator", href: "/resources/email-roi-calculator" },
    { label: "Email Subject Line Tester", href: "/resources/email-subject-tester" },
    { label: "Ad Copy Generator", href: "/resources/ad-copy-generator" },
    { label: "Headline Analyzer", href: "/resources/headline-analyzer" },
  ],
  "Web Design": [
    { label: "Website Grader", href: "/resources/website-grader" },
    { label: "Website Speed Assessment", href: "/resources/speed-test" },
    { label: "SEO Health Check", href: "/resources/seo-checklist" },
    { label: "Social Share Preview", href: "/resources/og-preview" },
  ],
  "Web Development": [
    { label: "Website Grader", href: "/resources/website-grader" },
    { label: "Website Speed Assessment", href: "/resources/speed-test" },
    { label: "SEO Health Check", href: "/resources/seo-checklist" },
    { label: "Social Share Preview", href: "/resources/og-preview" },
  ],
  Branding: [
    { label: "Brand Name Generator", href: "/resources/brand-name-generator" },
    { label: "Headline Analyzer", href: "/resources/headline-analyzer" },
    { label: "Social Share Preview", href: "/resources/og-preview" },
    { label: "Competitor Analysis", href: "/resources/competitor-analysis" },
  ],
  "Video Marketing": [
    { label: "Social Media Planner", href: "/resources/social-media-planner" },
    { label: "Content ROI Calculator", href: "/resources/content-roi-calculator" },
    { label: "Ad Copy Generator", href: "/resources/ad-copy-generator" },
    { label: "Headline Analyzer", href: "/resources/headline-analyzer" },
  ],
  "Video Production": [
    { label: "Social Media Planner", href: "/resources/social-media-planner" },
    { label: "Content ROI Calculator", href: "/resources/content-roi-calculator" },
    { label: "Ad Copy Generator", href: "/resources/ad-copy-generator" },
    { label: "Social Share Preview", href: "/resources/og-preview" },
  ],
  "AI & Automation": [
    { label: "Budget Calculator", href: "/resources/budget-calculator" },
    { label: "ROI Calculator", href: "/resources/roi-calculator" },
    { label: "Competitor Analysis", href: "/resources/competitor-analysis" },
    { label: "Marketing Budget Planner", href: "/resources/marketing-budget-planner" },
  ],
  Analytics: [
    { label: "ROI Calculator", href: "/resources/roi-calculator" },
    { label: "Website Grader", href: "/resources/website-grader" },
    { label: "Budget Calculator", href: "/resources/budget-calculator" },
    { label: "PPC Audit Checklist", href: "/resources/ppc-audit-checklist" },
  ],
  "E-commerce": [
    { label: "ROI Calculator", href: "/resources/roi-calculator" },
    { label: "Email ROI Calculator", href: "/resources/email-roi-calculator" },
    { label: "Budget Calculator", href: "/resources/budget-calculator" },
    { label: "Competitor Analysis", href: "/resources/competitor-analysis" },
  ],
  Advertising: [
    { label: "PPC Audit Checklist", href: "/resources/ppc-audit-checklist" },
    { label: "Ad Copy Generator", href: "/resources/ad-copy-generator" },
    { label: "ROI Calculator", href: "/resources/roi-calculator" },
    { label: "Budget Calculator", href: "/resources/budget-calculator" },
  ],
  Strategy: [
    { label: "Marketing Budget Planner", href: "/resources/marketing-budget-planner" },
    { label: "Competitor Analysis", href: "/resources/competitor-analysis" },
    { label: "ROI Calculator", href: "/resources/roi-calculator" },
    { label: "Budget Calculator", href: "/resources/budget-calculator" },
  ],
  "Local SEO": [
    { label: "SEO Health Check", href: "/resources/seo-checklist" },
    { label: "Website Grader", href: "/resources/website-grader" },
    { label: "Meta Description Generator", href: "/resources/meta-description-generator" },
    { label: "Schema Markup Generator", href: "/resources/schema-generator" },
  ],
  "Local Marketing": [
    { label: "SEO Health Check", href: "/resources/seo-checklist" },
    { label: "Budget Calculator", href: "/resources/budget-calculator" },
    { label: "ROI Calculator", href: "/resources/roi-calculator" },
    { label: "Schema Markup Generator", href: "/resources/schema-generator" },
  ],
  "Digital Marketing": [
    { label: "ROI Calculator", href: "/resources/roi-calculator" },
    { label: "Marketing Budget Planner", href: "/resources/marketing-budget-planner" },
    { label: "Competitor Analysis", href: "/resources/competitor-analysis" },
    { label: "Budget Calculator", href: "/resources/budget-calculator" },
  ],
  PPC: [
    { label: "PPC Audit Checklist", href: "/resources/ppc-audit-checklist" },
    { label: "Ad Copy Generator", href: "/resources/ad-copy-generator" },
    { label: "ROI Calculator", href: "/resources/roi-calculator" },
    { label: "Marketing Budget Planner", href: "/resources/marketing-budget-planner" },
  ],
};

/* Fallback entries when a category has no explicit mapping */
const DEFAULT_SERVICES = [
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "Marketing Strategy", href: "/services/digital-marketing/marketing-strategy" },
  { label: "Performance Marketing", href: "/services/performance-marketing" },
];

const DEFAULT_TOOLS = [
  { label: "ROI Calculator", href: "/resources/roi-calculator" },
  { label: "Budget Calculator", href: "/resources/budget-calculator" },
  { label: "Website Grader", href: "/resources/website-grader" },
  { label: "Headline Analyzer", href: "/resources/headline-analyzer" },
];

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
                  className="group border border-gray-200 bg-white hover:border-black/30 hover:shadow-md transition-all duration-300 motion-reduce:transition-none overflow-hidden focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
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

      {/* ── Relevant Services ────────────────────────────────── */}
      <section className="px-6 lg:px-12 py-16 border-t border-gray-200" aria-label="Relevant services">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
              Relevant Services
            </h2>
            <p className="text-base text-gray-500 leading-relaxed mb-6">
              Explore our services related to {post.category.toLowerCase()}.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(CATEGORY_SERVICES[post.category] ?? DEFAULT_SERVICES).map((svc) => (
                <Link
                  key={svc.href}
                  href={svc.href}
                  className="group border border-gray-200 bg-white p-5 hover:border-black hover:shadow-md transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  <span className="text-base font-bold text-black group-hover:underline">{svc.label}</span>
                  <span className="block text-base text-gray-500 mt-1">&rarr;</span>
                </Link>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* ── Free Tools ────────────────────────────────────────── */}
      <section className="px-6 lg:px-12 py-16 bg-black" aria-label="Free tools">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-white mb-3">
              Free Tools
            </h2>
            <p className="text-base text-gray-400 leading-relaxed mb-6">
              Put these insights into action with our free marketing tools.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(CATEGORY_TOOLS[post.category] ?? DEFAULT_TOOLS).map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex items-center justify-between border border-white/20 p-5 hover:border-white hover:bg-white/5 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                >
                  <span className="text-base font-bold text-white group-hover:underline">{tool.label}</span>
                  <span className="text-base text-gray-400 group-hover:text-white transition-colors">&rarr;</span>
                </Link>
              ))}
            </div>
          </Animate>
        </div>
      </section>

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
