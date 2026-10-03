import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BlogThumbnail } from "@/components/blog-thumbnail";
import { notFound } from "next/navigation";
import { Animate } from "@/components/animate";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { TableOfContents } from "@/components/table-of-contents";
import { getPostBySlug, getRelatedPosts, getAllPublishedSlugs } from "@/lib/blog";
import { ShareControls } from "./share-controls";
import { ReadingProgress } from "@/components/reading-progress";
import { NewsletterCta } from "@/components/newsletter-cta";
import { QuoteForm } from "@/components/quote-form";

/* ── Category-to-service mapping ─────────────────────────── */
const CATEGORY_SERVICES: Record<string, { label: string; href: string }[]> = {
  SEO: [
    { label: "SEO Services", href: "/services/seo" },
    { label: "Digital Marketing", href: "/services/digital-marketing" },
    { label: "Content Marketing", href: "/services/content-marketing" },
  ],
  "Digital Marketing": [
    { label: "Digital Marketing", href: "/services/digital-marketing" },
    { label: "Marketing Strategy", href: "/services/digital-marketing/marketing-strategy" },
    { label: "Performance Marketing", href: "/services/performance-marketing" },
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
  "Website Development": [
    { label: "Website Development", href: "/services/website-development" },
    { label: "E-Commerce Marketing", href: "/services/ecommerce-marketing" },
    { label: "SEO Services", href: "/services/seo" },
  ],
  Branding: [
    { label: "Branding", href: "/services/branding" },
    { label: "Content Marketing", href: "/services/content-marketing" },
    { label: "Website Development", href: "/services/website-development" },
  ],
  "Video Production": [
    { label: "Video Production", href: "/services/video-production" },
    { label: "Social Media Marketing", href: "/services/social-media" },
    { label: "Branding", href: "/services/branding" },
  ],
  "AI & Technology": [
    { label: "AI & Automation", href: "/services/ai" },
    { label: "Digital Marketing", href: "/services/digital-marketing" },
    { label: "Performance Marketing", href: "/services/performance-marketing" },
  ],
  Analytics: [
    { label: "Digital Marketing", href: "/services/digital-marketing" },
    { label: "Performance Marketing", href: "/services/performance-marketing" },
    { label: "SEO Services", href: "/services/seo" },
  ],
  "E-Commerce": [
    { label: "E-Commerce Marketing", href: "/services/ecommerce-marketing" },
    { label: "Paid Advertising", href: "/services/paid-advertising" },
    { label: "Email Marketing", href: "/services/email-marketing" },
  ],
  "Paid Advertising": [
    { label: "Paid Advertising", href: "/services/paid-advertising" },
    { label: "Performance Marketing", href: "/services/performance-marketing" },
    { label: "Social Media Marketing", href: "/services/social-media" },
  ],
  "Marketing Strategy": [
    { label: "Marketing Strategy", href: "/services/digital-marketing/marketing-strategy" },
    { label: "Digital Marketing", href: "/services/digital-marketing" },
    { label: "Performance Marketing", href: "/services/performance-marketing" },
  ],
  "Industry Guides": [
    { label: "Digital Marketing", href: "/services/digital-marketing" },
    { label: "SEO Services", href: "/services/seo" },
    { label: "Content Marketing", href: "/services/content-marketing" },
  ],
};

/* ── Category-to-free-tools mapping ──────────────────────── */
const CATEGORY_TOOLS: Record<string, { label: string; href: string }[]> = {
  SEO: [
    { label: "SEO Health Check", href: "/resources/seo-checklist" },
    { label: "Content Brief Generator", href: "/resources/content-brief" },
    { label: "Keyword Density Checker", href: "/resources/keyword-density-checker" },
    { label: "Meta Description Generator", href: "/resources/meta-description-generator" },
  ],
  "Digital Marketing": [
    { label: "ROI Calculator", href: "/resources/roi-calculator" },
    { label: "Marketing Budget Planner", href: "/resources/marketing-budget-planner" },
    { label: "KPI Dashboard Builder", href: "/resources/kpi-dashboard" },
    { label: "Marketing Maturity Assessment", href: "/resources/marketing-maturity" },
  ],
  "Social Media": [
    { label: "Social Media Audit", href: "/resources/social-media-audit" },
    { label: "Social Media ROI Calculator", href: "/resources/social-media-roi" },
    { label: "Influencer ROI Calculator", href: "/resources/influencer-roi" },
    { label: "Hashtag Generator", href: "/resources/hashtag-generator" },
  ],
  "Content Marketing": [
    { label: "Content ROI Calculator", href: "/resources/content-roi-calculator" },
    { label: "Content Brief Generator", href: "/resources/content-brief" },
    { label: "Headline Analyzer", href: "/resources/headline-analyzer" },
    { label: "Readability Checker", href: "/resources/readability-checker" },
  ],
  "Email Marketing": [
    { label: "Email Deliverability Checker", href: "/resources/email-deliverability" },
    { label: "Email ROI Calculator", href: "/resources/email-roi-calculator" },
    { label: "Email Subject Line Tester", href: "/resources/email-subject-tester" },
    { label: "Email Campaign Planner", href: "/resources/email-campaign-planner" },
  ],
  "Website Development": [
    { label: "CRO Audit", href: "/resources/cro-audit" },
    { label: "Website Grader", href: "/resources/website-grader" },
    { label: "Migration Checklist", href: "/resources/migration-checklist" },
    { label: "Schema Markup Generator", href: "/resources/schema-generator" },
  ],
  Branding: [
    { label: "Brand Voice Generator", href: "/resources/brand-voice-generator" },
    { label: "Brand Name Generator", href: "/resources/brand-name-generator" },
    { label: "Color Palette Generator", href: "/resources/color-palette-generator" },
    { label: "Social Proof Strategy Builder", href: "/resources/social-proof-guide" },
  ],
  "Video Production": [
    { label: "Social Media Planner", href: "/resources/social-media-planner" },
    { label: "Content ROI Calculator", href: "/resources/content-roi-calculator" },
    { label: "Ad Copy Generator", href: "/resources/ad-copy-generator" },
    { label: "Social Share Preview", href: "/resources/og-preview" },
  ],
  "AI & Technology": [
    { label: "Budget Calculator", href: "/resources/budget-calculator" },
    { label: "ROI Calculator", href: "/resources/roi-calculator" },
    { label: "Competitor Analysis", href: "/resources/competitor-analysis" },
    { label: "Marketing Budget Planner", href: "/resources/marketing-budget-planner" },
  ],
  Analytics: [
    { label: "ROI Calculator", href: "/resources/roi-calculator" },
    { label: "CLV Calculator", href: "/resources/clv-calculator" },
    { label: "Funnel Calculator", href: "/resources/funnel-calculator" },
    { label: "Website Grader", href: "/resources/website-grader" },
  ],
  "E-Commerce": [
    { label: "CLV Calculator", href: "/resources/clv-calculator" },
    { label: "ROI Calculator", href: "/resources/roi-calculator" },
    { label: "Email ROI Calculator", href: "/resources/email-roi-calculator" },
    { label: "Funnel Calculator", href: "/resources/funnel-calculator" },
  ],
  "Paid Advertising": [
    { label: "PPC Audit Checklist", href: "/resources/ppc-audit-checklist" },
    { label: "Ad Copy Generator", href: "/resources/ad-copy-generator" },
    { label: "Google Ads Estimator", href: "/resources/google-ads-estimator" },
    { label: "Budget Calculator", href: "/resources/budget-calculator" },
  ],
  "Marketing Strategy": [
    { label: "SWOT Analysis", href: "/resources/swot-analysis" },
    { label: "Marketing Budget Planner", href: "/resources/marketing-budget-planner" },
    { label: "Competitive Gap Analyzer", href: "/resources/competitive-gap" },
    { label: "Marketing Maturity Assessment", href: "/resources/marketing-maturity" },
  ],
  "Industry Guides": [
    { label: "ROI Calculator", href: "/resources/roi-calculator" },
    { label: "Budget Calculator", href: "/resources/budget-calculator" },
    { label: "Website Grader", href: "/resources/website-grader" },
    { label: "SEO Health Check", href: "/resources/seo-checklist" },
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
  { label: "Website Grader", href: "/resources/website-grader" },
  { label: "SWOT Analysis", href: "/resources/swot-analysis" },
  { label: "Marketing Budget Planner", href: "/resources/marketing-budget-planner" },
];

const INSURANCE_SEO_SLUGS = new Set([
  "seo-for-insurance-a-complete-ranking-guide-a-step-by-step-walkthrough",
  "seo-for-insurance-10-keywords-and-strategies-that-rank-modern-edition",
]);

const INSURANCE_SEO_CHECKLIST = [
  {
    title: "Technical foundation",
    text: "Keep important insurance pages crawlable, indexable, fast on mobile, canonically consistent and supported by appropriate structured data.",
  },
  {
    title: "Search intent and service pages",
    text: "Build pages around real insurance products, customer questions, locations and commercial intent instead of forcing every keyword into one generic page.",
  },
  {
    title: "Trust and clarity",
    text: "Make ownership, expertise, contact information, service scope, claims or policy explanations and important disclosures easy for visitors and search engines to understand.",
  },
  {
    title: "Topical content",
    text: "Use supporting guides, FAQs, definitions, comparisons and process content to answer the questions prospects research before they request a quote.",
  },
  {
    title: "Internal linking",
    text: "Connect educational content to the relevant insurance service, location and conversion pages so authority and users have a clear path through the site.",
  },
  {
    title: "Measurement",
    text: "Track organic queries, landing pages and meaningful enquiries through Search Console, analytics, forms and call or CRM data where available.",
  },
];

const INSURANCE_SEO_LINKS = [
  { label: "SEO Services", href: "/services/seo", desc: "Technical, on-page and content SEO built around measurable search visibility." },
  { label: "Technical SEO", href: "/services/seo/technical-seo", desc: "Crawling, indexation, performance and technical foundations." },
  { label: "Keyword Research", href: "/services/seo/keyword-research", desc: "Map search demand and intent before building or expanding content." },
  { label: "Financial Services Marketing", href: "/industries/finance", desc: "Industry context for insurance, finance and other trust-sensitive services." },
];

function parseTags(tags: string): string[] {
  if (!tags) return [];
  try {
    const parsed = JSON.parse(tags);
    if (Array.isArray(parsed)) return parsed;
  } catch {}
  return tags.split(",").map((t) => t.trim()).filter(Boolean);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    alternates: { canonical: `https://themarkitmedia.com/en/blog/${slug}` },
    keywords: parseTags(post.tags).join(", ") || post.category,
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      type: "article",
      publishedTime: post.published_at || undefined,
      modifiedTime: post.updated_at || post.published_at || undefined,
      section: post.category,
      authors: [post.author],
      tags: parseTags(post.tags).length > 0 ? parseTags(post.tags) : [post.category],
      images: [{ url: `https://themarkitmedia.com/api/blog-thumbnail?title=${encodeURIComponent(post.title)}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      images: [`https://themarkitmedia.com/api/blog-thumbnail?title=${encodeURIComponent(post.title)}`],
    },
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPublishedSlugs().map((slug) => ({ slug }));
}

function markdownToHtml(md: string): string {
  if (md.includes("<h2>") || md.includes("<p>")) return md;
  return md
    .replace(/^## (.+)$/gm, '<h2 class="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mt-10 mb-4">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="font-[family-name:var(--font-display)] text-lg font-bold text-black mt-8 mb-3">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.+)$/gm, '<li class="text-base text-gray-600 leading-relaxed ml-4">$1</li>')
    .replace(/\n\n/g, '</p><p class="text-base text-gray-600 leading-relaxed mb-4">')
    .replace(/^/, '<p class="text-base text-gray-600 leading-relaxed mb-4">')
    .replace(/$/, "</p>");
}

function addHeadingIds(html: string): string {
  return html.replace(/<h([23])([^>]*)>([^<]+)<\/h[23]>/g, (_match, level, attrs, text) => {
    const id = text.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
  });
}

function addExternalLinkAttrs(html: string): string {
  return html.replace(/<a\s+href="(https?:\/\/[^"]+)"/g, (match, url) => {
    if (url.includes("themarkitmedia.com")) return match;
    return `<a href="${url}" rel="nofollow noopener" target="_blank"`;
  });
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
    description: post.meta_description || post.excerpt,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Markit Media",
      url: "https://themarkitmedia.com",
      logo: { "@type": "ImageObject", url: "https://themarkitmedia.com/images/branding/og-image.png" },
    },
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    mainEntityOfPage: `https://themarkitmedia.com/en/blog/${slug}`,
    articleSection: post.category,
    wordCount: Math.round(post.content.replace(/<[^>]+>/g, "").split(/\s+/).length),
    keywords: parseTags(post.tags),
    image: `https://themarkitmedia.com/api/blog-thumbnail?title=${encodeURIComponent(post.title)}`,
  };

  const processedContent = addExternalLinkAttrs(addHeadingIds(markdownToHtml(post.content)));

  return (
    <article>
      <ReadingProgress />
      <JsonLd data={articleSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]} />

      <section aria-label="Page header" className="px-6 lg:px-12 pt-24 pb-12">
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

      <section aria-label="Article thumbnail" className="px-6 lg:px-12 pb-8">
          <div className="max-w-4xl mx-auto overflow-hidden">
            <BlogThumbnail title={post.title} priority />
          </div>
        </section>

      <section aria-label="Article content" className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto">
          <TableOfContents html={processedContent} />
          <div className="blog-prose" dangerouslySetInnerHTML={{ __html: processedContent }} />
        </div>
      </section>

      {INSURANCE_SEO_SLUGS.has(slug) && (
        <>
          <section aria-label="Insurance SEO implementation checklist" className="px-6 lg:px-12 pb-12">
            <div className="max-w-5xl mx-auto border border-gray-200 bg-gray-50 p-6 sm:p-8">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">Practical Framework</span>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mt-3">
                Turning Insurance SEO Research Into an Action Plan
              </h2>
              <p className="text-base text-gray-500 leading-relaxed mt-4 max-w-3xl">
                Use this checklist after the guide to turn keyword and content ideas into a search program that connects technical SEO, useful insurance content and measurable enquiries.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-7">
                {INSURANCE_SEO_CHECKLIST.map((item, index) => (
                  <div key={item.title} className="bg-white border border-gray-200 p-5">
                    <span className="text-xs font-bold text-gray-400">0{index + 1}</span>
                    <h3 className="font-extrabold text-black mt-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mt-2">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section aria-label="Related insurance SEO guide" className="px-6 lg:px-12 pb-12">
            <div className="max-w-3xl mx-auto">
              <div className="border border-gray-200 p-6 sm:p-8">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">Continue the Topic</span>
                {slug === "seo-for-insurance-a-complete-ranking-guide-a-step-by-step-walkthrough" ? (
                  <>
                    <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold mt-3">
                      Next: Insurance SEO Keywords and Ranking Strategies
                    </h2>
                    <p className="text-base text-gray-500 leading-relaxed mt-3">
                      Continue with the companion guide focused on keyword selection, search intent and the strategies used to turn those terms into useful insurance content.
                    </p>
                    <Link href="/blog/seo-for-insurance-10-keywords-and-strategies-that-rank-modern-edition" className="inline-flex mt-5 font-bold underline underline-offset-4 hover:no-underline">
                      Read the insurance keyword guide →
                    </Link>
                  </>
                ) : (
                  <>
                    <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold mt-3">
                      Start With the Step-by-Step Insurance SEO Guide
                    </h2>
                    <p className="text-base text-gray-500 leading-relaxed mt-3">
                      If you want the wider framework first, the companion guide covers backlinks, content planning, technical SEO and ongoing optimization for insurance websites.
                    </p>
                    <Link href="/blog/seo-for-insurance-a-complete-ranking-guide-a-step-by-step-walkthrough" className="inline-flex mt-5 font-bold underline underline-offset-4 hover:no-underline">
                      Read the complete insurance SEO guide →
                    </Link>
                  </>
                )}
              </div>
            </div>
          </section>

          <section aria-label="Insurance SEO services" className="px-6 lg:px-12 pb-12">
            <div className="max-w-5xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">Relevant Expertise</span>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mt-3">
                If You Want Help Implementing the Strategy
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 mt-7">
                {INSURANCE_SEO_LINKS.map((item) => (
                  <Link key={item.href} href={item.href} className="group border border-gray-200 p-5 hover:border-black transition-colors">
                    <h3 className="font-extrabold text-black group-hover:underline">{item.label}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mt-2">{item.desc}</p>
                    <span className="inline-block mt-4 text-sm font-bold">Explore →</span>
                  </Link>
                ))}
              </div>
              <div className="mt-5 text-sm text-gray-500">
                Looking for examples of our wider client work? <Link href="/case-studies" className="font-bold text-black underline underline-offset-4 hover:no-underline">Browse selected case studies</Link>.
              </div>
            </div>
          </section>

          <section aria-label="Request an insurance SEO review" className="px-6 lg:px-12 pb-16">
            <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">Request a Review</span>
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mt-3">
                  Want Us to Review Your Insurance SEO?
                </h2>
                <p className="text-base text-gray-500 leading-relaxed mt-4">
                  Share your website, target market and the insurance products or services you want to grow. We can review the current search setup and identify the highest-priority opportunities before recommending ongoing work.
                </p>
                <ul className="grid sm:grid-cols-2 gap-3 mt-6 text-sm font-semibold">
                  {["Technical SEO", "Keyword mapping", "Content gaps", "Internal linking", "Local visibility", "Conversion tracking"].map((item) => (
                    <li key={item} className="border border-gray-200 px-4 py-3">{item}</li>
                  ))}
                </ul>
              </div>
              <QuoteForm
                service="Insurance SEO"
                title="Request an Insurance SEO Review"
                buttonText="Request SEO Review"
                messagePlaceholder="Website, target market, insurance products/services and what you want to improve..."
              />
            </div>
          </section>
        </>
      )}

      {parseTags(post.tags).length > 0 && (
        <section aria-label="Tags" className="px-6 lg:px-12 pb-8">
          <div className="max-w-3xl mx-auto flex flex-wrap gap-2">
            {parseTags(post.tags).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-base font-medium text-gray-600 bg-gray-100 border border-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}

      <section aria-label="About the author" className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto flex gap-5 items-start border-t border-b border-gray-200 py-8">
          <div className="w-14 h-14 bg-black flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xl font-[family-name:var(--font-display)]">M</span>
          </div>
          <div>
            <p className="text-base font-bold text-black">{post.author}</p>
            <p className="text-base text-gray-500 leading-relaxed mt-1">
              Full-stack digital marketing agency specializing in performance marketing, SEO, branding, and web development for businesses across the USA, Canada, UAE, UK, Australia, and Saudi Arabia.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Newsletter" className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto text-center py-10 px-6 border border-gray-200 bg-gray-50">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
            Get Marketing Insights Delivered
          </h2>
          <p className="text-base text-gray-500 leading-relaxed mb-6">
            Join marketers who get actionable {post.category.toLowerCase()} tips and strategies in their inbox.
          </p>
          <NewsletterCta source={`blog-${post.category.toLowerCase().replace(/\s+/g, "-")}`} />
        </div>
      </section>

      <section aria-label="Need help with your strategy" className="px-6 lg:px-12 pb-16">
        <div className="max-w-3xl mx-auto bg-gray-50 p-8 border border-gray-200">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
            Need Help With Your {post.category} Strategy?
          </h2>
          <p className="text-base text-gray-500 leading-relaxed mb-6">
            Our team specializes in turning these insights into results. Get a free consultation to discuss your goals.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
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
                  <div className="aspect-[16/9] overflow-hidden">
                    <BlogThumbnail title={r.title} />
                  </div>
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
                  <span className="text-base text-gray-400 group-hover:text-white transition-colors motion-reduce:transition-none">&rarr;</span>
                </Link>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      <section aria-label="Navigation" className="px-6 lg:px-12 py-16 border-t border-gray-200">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/blog" className="text-base font-bold text-black hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
            &larr; Back to Blog
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
            Get in Touch &rarr;
          </Link>
        </div>
      </section>
    </article>
  );
}
