import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

export const metadata: Metadata = {
  title: "Digital Marketing Trends 2025 — What to Watch",
  description: "The most important digital marketing trends for 2025: AI in marketing, privacy-first strategies, short-form video, zero-click search, and more.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/marketing-trends-2025" },
};

const trends = [
  {
    num: "01",
    title: "AI-Powered Everything — But Strategy Still Wins",
    body: "AI tools are now embedded in every major marketing platform. Google Ads uses AI bidding as default. Meta generates ad creative automatically. Content tools produce drafts in seconds. But the agencies and marketers winning are not the ones using AI the most — they are the ones using it strategically. AI handles execution at scale; human judgment handles positioning, creative direction, and strategic decisions that require context AI does not have.",
    takeaway: "Use AI to accelerate execution, not replace strategy. Audit which repetitive tasks can be automated, but keep human oversight on anything that touches brand positioning or client relationships.",
  },
  {
    num: "02",
    title: "The Privacy-First Advertising Shift Is No Longer Optional",
    body: "Third-party cookies are fading. iOS tracking restrictions are tighter. GDPR enforcement is escalating. Server-side tracking, first-party data strategies, and Conversion APIs (CAPI) are no longer advanced techniques — they are baseline requirements. Businesses that still rely solely on pixel-based tracking are seeing degraded data quality and higher costs.",
    takeaway: "Implement server-side tracking (Google, Meta CAPI). Build first-party data collection through gated content, email lists, and CRM integration. Reduce dependency on third-party data for targeting.",
  },
  {
    num: "03",
    title: "Short-Form Video Dominates — But Long-Form Is Not Dead",
    body: "TikTok, Instagram Reels, and YouTube Shorts continue to dominate attention. Short-form video delivers the highest organic reach on every major social platform. But long-form video (10+ minutes) on YouTube is growing for search-intent and educational content. The winning strategy is both: short-form for awareness and reach, long-form for depth and SEO.",
    takeaway: "Create a repeatable short-form video workflow. Repurpose long-form content into short clips. Prioritize YouTube for evergreen educational content that compounds over time.",
  },
  {
    num: "04",
    title: "Zero-Click Search Changes the SEO Playbook",
    body: "More searches end without a click than ever before. Google is answering questions directly through AI Overviews, Featured Snippets, and Knowledge Panels. This does not make SEO irrelevant — it changes what SEO is for. Brand visibility in zero-click results drives awareness even without the click. And queries that do result in clicks are higher intent.",
    takeaway: "Optimize for zero-click visibility with structured data, FAQ schema, and concise answers. Shift SEO KPIs from raw traffic to qualified traffic and conversion rate. Target long-tail, high-intent queries.",
  },
  {
    num: "05",
    title: "Answer Engine Optimization (AEO) Becomes Real",
    body: "AI chatbots (ChatGPT, Perplexity, Gemini) are becoming alternative search engines. Users are asking AI for product recommendations, service comparisons, and how-to guidance. Being cited in AI-generated answers is the new version of ranking on page one. The businesses that get cited have clear, well-structured, authoritative content.",
    takeaway: "Structure content with clear headings, direct answers, and factual claims. Build topical authority through comprehensive content clusters. Ensure your site is crawlable and well-structured for AI training.",
  },
  {
    num: "06",
    title: "Performance Marketing Gets More Expensive — Efficiency Is the Edge",
    body: "Ad costs continue rising across Google, Meta, TikTok, and LinkedIn. Average CPC has increased year over year in most verticals. The businesses winning are not outspending competitors — they are out-optimizing them. Better landing pages, stronger creative, tighter targeting, and faster iteration cycles drive results at lower cost.",
    takeaway: "Invest in conversion rate optimization alongside traffic acquisition. Test creative relentlessly. Build feedback loops between ads and landing page performance. Focus on cost per qualified lead, not cost per click.",
  },
  {
    num: "07",
    title: "Email and SMS Marketing Are Underinvested",
    body: "While attention goes to social media and AI, email marketing continues to deliver the highest ROI of any marketing channel. SMS marketing is growing rapidly for e-commerce. The brands getting the best results treat email and SMS as owned channels — not afterthoughts. Sophisticated segmentation, behavioral triggers, and personalized content drive the gap.",
    takeaway: "Audit your email program: welcome series, abandoned cart flows, re-engagement campaigns, and post-purchase sequences. Consider adding SMS for time-sensitive offers. Focus on list quality over list size.",
  },
  {
    num: "08",
    title: "Website Speed and Experience Are Ranking Factors You Can Feel",
    body: "Core Web Vitals are not just Google metrics — they directly affect conversion rates. A one-second improvement in page load time can increase conversions by 7%. Mobile-first design is non-negotiable. Accessibility compliance (WCAG) is increasingly enforced. The sites that convert best are fast, clean, and remove friction from every step.",
    takeaway: "Run Core Web Vitals on every key page. Eliminate render-blocking resources. Compress images. Ensure mobile experience is tested on real devices, not just responsive mode.",
  },
  {
    num: "09",
    title: "Community and Brand Building Beat Demand Generation Alone",
    body: "Pure performance marketing (run ads, get leads) faces diminishing returns without brand awareness to support it. The businesses growing fastest are investing in brand building alongside demand generation. Community programs, thought leadership, organic social, and strategic partnerships build the trust that makes paid campaigns convert.",
    takeaway: "Allocate a portion of budget to brand awareness campaigns that do not have immediate conversion goals. Measure brand metrics: direct traffic, branded search volume, social mentions.",
  },
  {
    num: "10",
    title: "Consolidation of Tools and Vendors Accelerates",
    body: "Businesses are tired of managing 15 different marketing tools and 4 different agencies. The trend is toward fewer, deeper relationships. Full-stack agencies that can handle strategy, creative, media buying, and reporting under one roof are winning over specialists for each channel. Technology consolidation follows the same pattern.",
    takeaway: "Evaluate whether your current multi-vendor setup creates more coordination overhead than value. Consider consolidating with a full-stack partner that can execute across channels with one unified strategy.",
  },
];

export default function MarketingTrends2025Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Digital Marketing Trends 2025",
    description: "The most important digital marketing trends to watch in 2025.",
    publisher: {
      "@type": "Organization",
      name: "Markit Media",
      url: "https://themarkitmedia.com",
    },
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "Marketing Trends 2025" }]} />

      <section className="px-6 lg:px-12 pt-6 pb-4">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <Link href="/resources/marketing-trends-2026" className="block bg-black text-white px-6 py-4 hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              <span className="text-base font-bold">Looking for the latest?</span>{" "}
              <span className="text-base text-gray-300">Read our 2026 Marketing Trends &rarr;</span>
            </Link>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pt-16 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Guide &middot; 2025 Edition</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              10 Digital Marketing Trends for 2025
            </h1>
            <SectionDesc>
              What changed, what mattered, and what to do about it. Our take on the most important shifts in digital marketing for 2025.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-2">
              {trends.map((t) => (
                <a
                  key={t.num}
                  href={`#trend-${t.num}`}
                  className="px-3 py-2 border border-gray-200 text-base font-bold text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  {t.num}
                </a>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {trends.map((trend, i) => (
        <section
          key={trend.num}
          id={`trend-${trend.num}`}
          className={`px-6 lg:px-12 py-16 ${i % 2 === 1 ? "bg-gray-50" : ""}`}
        >
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <div className="flex items-start gap-6">
                <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-black/10 flex-shrink-0 leading-none mt-1">
                  {trend.num}
                </span>
                <div>
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                    {trend.title}
                  </h2>
                  <p className="text-base text-gray-500 leading-relaxed mb-6">
                    {trend.body}
                  </p>
                  <div className="p-5 bg-white border-l-4 border-black">
                    <p className="text-base font-bold text-black mb-1">What to do:</p>
                    <p className="text-base text-gray-600 leading-relaxed">{trend.takeaway}</p>
                  </div>
                </div>
              </div>
            </Animate>
          </div>
        </section>
      ))}

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Adapting to These Trends?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team stays ahead of the curve so you do not have to. Let us build a strategy that works in 2025 and beyond.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Get a Free Strategy Session &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Marketing Trends 2025"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Marketing Statistics", href: "/resources/marketing-statistics" },
          { title: "Marketing Statistics 2026", href: "/resources/marketing-statistics-2026" },
          { title: "Marketing Timeline Planner", href: "/resources/marketing-timeline-planner" },
          { title: "Marketing Trends 2026", href: "/resources/marketing-trends-2026" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
