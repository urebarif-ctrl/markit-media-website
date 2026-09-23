"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CriterionItem {
  id: string;
  label: string;
  tip: string;
}

interface Category {
  key: string;
  label: string;
  description: string;
  items: CriterionItem[];
  recommendations: string[];
}

type Rating = 0 | 1 | 2;
type RatingMap = Record<string, Rating>;

interface MaturityLevel {
  label: string;
  range: [number, number];
  description: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ratingOptions: { label: string; value: Rating }[] = [
  { label: "Weak", value: 0 },
  { label: "Adequate", value: 1 },
  { label: "Strong", value: 2 },
];

const categories: Category[] = [
  {
    key: "quality",
    label: "Content Quality",
    description: "Evaluate the substance and value of your content.",
    items: [
      { id: "quality-1", label: "Originality", tip: "Content provides unique perspectives, original research, or fresh angles rather than rehashing existing material." },
      { id: "quality-2", label: "Depth", tip: "Content covers topics thoroughly, going beyond surface-level information to provide genuine value." },
      { id: "quality-3", label: "Accuracy", tip: "Facts, statistics, and claims are verified, cited, and kept up to date." },
      { id: "quality-4", label: "Readability", tip: "Content uses clear language, logical structure, and formatting that makes it easy to consume." },
      { id: "quality-5", label: "Actionability", tip: "Content provides practical takeaways, steps, or frameworks the reader can apply immediately." },
    ],
    recommendations: [
      "Audit your top 20 pages for factual accuracy and update outdated statistics.",
      "Add original data, case studies, or expert quotes to differentiate your content from competitors.",
      "Break long-form content into scannable sections with clear subheadings, bullet points, and summaries.",
    ],
  },
  {
    key: "seo",
    label: "SEO Optimization",
    description: "Assess how well your content is optimized for search visibility.",
    items: [
      { id: "seo-1", label: "Title Tags", tip: "Each page has a unique, keyword-rich title tag under 60 characters." },
      { id: "seo-2", label: "Meta Descriptions", tip: "Each page has a compelling meta description under 155 characters that drives clicks." },
      { id: "seo-3", label: "Header Structure", tip: "Content uses a logical H1-H2-H3 hierarchy with keywords in headings." },
      { id: "seo-4", label: "Internal Linking", tip: "Content links to related pages on your site to distribute authority and guide users." },
      { id: "seo-5", label: "Keyword Targeting", tip: "Each piece targets specific keywords based on research, search intent, and competition." },
    ],
    recommendations: [
      "Run a crawl of your site to identify missing or duplicate title tags and meta descriptions.",
      "Create an internal linking map and add 3-5 contextual links per long-form page.",
      "Build a keyword targeting spreadsheet that maps primary and secondary keywords to each page.",
    ],
  },
  {
    key: "strategy",
    label: "Content Strategy",
    description: "Evaluate your planning and strategic approach to content.",
    items: [
      { id: "strategy-1", label: "Content Calendar", tip: "A documented publishing schedule exists with topics, deadlines, and owners." },
      { id: "strategy-2", label: "Buyer Journey Coverage", tip: "Content exists for every stage: awareness, consideration, decision, and retention." },
      { id: "strategy-3", label: "Content Gaps", tip: "You regularly audit for topics your audience needs but you have not covered." },
      { id: "strategy-4", label: "Competitive Positioning", tip: "Your content strategy accounts for what competitors publish and where you can differentiate." },
      { id: "strategy-5", label: "Content Refresh Process", tip: "A systematic process exists to update, consolidate, or retire aging content." },
    ],
    recommendations: [
      "Map your existing content to the buyer journey and identify gaps at each stage.",
      "Set up a quarterly content refresh cycle to update your top-performing pages.",
      "Analyze your top 5 competitors' content to find topics they rank for that you do not cover.",
    ],
  },
  {
    key: "distribution",
    label: "Distribution",
    description: "Assess how effectively you distribute and amplify your content.",
    items: [
      { id: "distribution-1", label: "Social Sharing", tip: "Content is actively promoted across relevant social platforms with tailored messaging." },
      { id: "distribution-2", label: "Email Newsletters", tip: "New content is distributed to your email list with segmentation where relevant." },
      { id: "distribution-3", label: "Repurposing", tip: "Long-form content is systematically turned into social posts, videos, infographics, or podcasts." },
      { id: "distribution-4", label: "Paid Promotion", tip: "High-value content receives paid amplification to reach new audiences." },
      { id: "distribution-5", label: "Community Engagement", tip: "Content is shared in relevant communities, forums, or industry groups where your audience gathers." },
    ],
    recommendations: [
      "Create a repurposing workflow: turn every long-form piece into at least 3 derivative formats.",
      "Segment your email list and send content relevant to each segment's interests.",
      "Identify 5 communities or forums where your audience is active and start contributing valuable content.",
    ],
  },
  {
    key: "performance",
    label: "Performance Tracking",
    description: "Evaluate how well you measure and optimize content performance.",
    items: [
      { id: "performance-1", label: "Analytics Setup", tip: "Website analytics is properly configured with goals, events, and content grouping." },
      { id: "performance-2", label: "Conversion Tracking", tip: "Content-driven conversions (leads, sign-ups, downloads) are tracked and attributed." },
      { id: "performance-3", label: "Content Attribution", tip: "You can trace which content pieces contribute to pipeline and revenue." },
      { id: "performance-4", label: "A/B Testing", tip: "Headlines, CTAs, and content formats are systematically tested to improve performance." },
      { id: "performance-5", label: "ROI Measurement", tip: "You calculate the cost of content production against the business results it generates." },
    ],
    recommendations: [
      "Set up content-specific goals in your analytics to track downloads, sign-ups, and contact form fills.",
      "Implement UTM parameters on all content distribution links for accurate attribution.",
      "Start a simple A/B testing program with headlines and CTAs on your highest-traffic pages.",
    ],
  },
  {
    key: "technical",
    label: "Technical Foundation",
    description: "Assess the technical health of your content platform.",
    items: [
      { id: "technical-1", label: "Page Speed", tip: "Content pages load in under 3 seconds on both desktop and mobile." },
      { id: "technical-2", label: "Mobile Optimization", tip: "Content renders correctly on all screen sizes with proper responsive design." },
      { id: "technical-3", label: "Structured Data", tip: "Schema markup (Article, FAQ, HowTo) is implemented where appropriate." },
      { id: "technical-4", label: "Image Optimization", tip: "Images are compressed, properly sized, use modern formats (WebP/AVIF), and include alt text." },
      { id: "technical-5", label: "Core Web Vitals", tip: "LCP, INP, and CLS scores meet Google's recommended thresholds." },
    ],
    recommendations: [
      "Run PageSpeed Insights on your top 10 pages and fix any critical performance issues.",
      "Implement lazy loading and modern image formats (WebP/AVIF) across your site.",
      "Add structured data markup to your blog posts, FAQ pages, and how-to guides.",
    ],
  },
];

const maturityLevels: MaturityLevel[] = [
  { label: "Beginner", range: [0, 12], description: "Your content program is in its earliest stages. Focus on building consistent quality and basic SEO foundations." },
  { label: "Developing", range: [13, 24], description: "Some fundamentals are in place but significant gaps remain. Prioritize your weakest categories to build a stronger base." },
  { label: "Competent", range: [25, 36], description: "A solid content operation with room to grow. Focus on measurement, distribution, and filling strategic gaps." },
  { label: "Advanced", range: [37, 48], description: "Your content program is well-established. Optimize through better attribution, testing, and systematic content refreshes." },
  { label: "Expert", range: [49, 60], description: "Top-tier content operation. Maintain your edge through innovation, advanced personalization, and continuous optimization." },
];

/* ------------------------------------------------------------------ */
/*  Quick-win items sorted by impact and ease                          */
/* ------------------------------------------------------------------ */

const quickWinPriority: { id: string; impact: number; ease: number }[] = [
  { id: "seo-1", impact: 9, ease: 9 },
  { id: "seo-2", impact: 8, ease: 9 },
  { id: "technical-4", impact: 8, ease: 8 },
  { id: "quality-4", impact: 8, ease: 7 },
  { id: "seo-3", impact: 7, ease: 8 },
  { id: "seo-4", impact: 8, ease: 7 },
  { id: "technical-1", impact: 9, ease: 6 },
  { id: "technical-2", impact: 8, ease: 6 },
  { id: "technical-5", impact: 9, ease: 5 },
  { id: "quality-3", impact: 7, ease: 6 },
  { id: "performance-1", impact: 8, ease: 6 },
  { id: "quality-5", impact: 7, ease: 6 },
  { id: "seo-5", impact: 8, ease: 5 },
  { id: "strategy-1", impact: 7, ease: 6 },
  { id: "distribution-1", impact: 6, ease: 7 },
  { id: "quality-1", impact: 8, ease: 4 },
  { id: "quality-2", impact: 8, ease: 4 },
  { id: "technical-3", impact: 6, ease: 6 },
  { id: "strategy-5", impact: 7, ease: 5 },
  { id: "strategy-2", impact: 7, ease: 4 },
  { id: "strategy-3", impact: 7, ease: 5 },
  { id: "strategy-4", impact: 6, ease: 5 },
  { id: "distribution-2", impact: 6, ease: 5 },
  { id: "distribution-3", impact: 7, ease: 4 },
  { id: "distribution-4", impact: 6, ease: 4 },
  { id: "distribution-5", impact: 5, ease: 5 },
  { id: "performance-2", impact: 7, ease: 4 },
  { id: "performance-3", impact: 6, ease: 3 },
  { id: "performance-4", impact: 6, ease: 4 },
  { id: "performance-5", impact: 6, ease: 3 },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getCategoryScore(cat: Category, ratings: RatingMap): number {
  return cat.items.reduce((sum, item) => sum + (ratings[item.id] ?? 0), 0);
}

function getTotalScore(ratings: RatingMap): number {
  return categories.reduce((sum, cat) => sum + getCategoryScore(cat, ratings), 0);
}

function getMaturityLevel(score: number): MaturityLevel {
  for (let i = maturityLevels.length - 1; i >= 0; i--) {
    if (score >= maturityLevels[i].range[0]) return maturityLevels[i];
  }
  return maturityLevels[0];
}

function getLetterGrade(score: number): string {
  const pct = (score / 60) * 100;
  if (pct >= 90) return "A";
  if (pct >= 80) return "B";
  if (pct >= 70) return "C";
  if (pct >= 60) return "D";
  return "F";
}

function getQuickWins(ratings: RatingMap): { id: string; label: string; category: string }[] {
  const weakItems = quickWinPriority
    .filter((qw) => (ratings[qw.id] ?? 0) === 0)
    .sort((a, b) => (b.impact + b.ease) - (a.impact + a.ease));

  return weakItems.slice(0, 5).map((qw) => {
    const cat = categories.find((c) => c.items.some((item) => item.id === qw.id))!;
    const item = cat.items.find((i) => i.id === qw.id)!;
    return { id: qw.id, label: item.label, category: cat.label };
  });
}

function getAllItemsCount(): number {
  return categories.reduce((sum, cat) => sum + cat.items.length, 0);
}

/* ------------------------------------------------------------------ */
/*  Format results as plain text                                       */
/* ------------------------------------------------------------------ */

function formatResultsText(ratings: RatingMap): string {
  const lines: string[] = [];
  const total = getTotalScore(ratings);
  const grade = getLetterGrade(total);
  const maturity = getMaturityLevel(total);

  lines.push("CONTENT AUDIT SCORECARD RESULTS");
  lines.push("=".repeat(50));
  lines.push(`Overall Score: ${total} / 60 (Grade: ${grade})`);
  lines.push(`Content Maturity: ${maturity.label}`);
  lines.push(maturity.description);
  lines.push("");

  for (const cat of categories) {
    const score = getCategoryScore(cat, ratings);
    lines.push(`${cat.label.toUpperCase()}`);
    lines.push("-".repeat(30));
    lines.push(`Score: ${score} / 10`);
    lines.push("");
    for (const item of cat.items) {
      const val = ratings[item.id] ?? 0;
      const label = ratingOptions.find((r) => r.value === val)?.label ?? "Not rated";
      lines.push(`  ${item.label}: ${label} (${val}/2)`);
    }
    lines.push("");

    if (score <= 5) {
      lines.push("  Recommendations:");
      cat.recommendations.forEach((rec, i) => lines.push(`    ${i + 1}. ${rec}`));
      lines.push("");
    }
  }

  const quickWins = getQuickWins(ratings);
  if (quickWins.length > 0) {
    lines.push("QUICK WINS (Top items to fix first)");
    lines.push("-".repeat(30));
    quickWins.forEach((qw, i) => lines.push(`  ${i + 1}. ${qw.label} (${qw.category})`));
    lines.push("");
  }

  lines.push("Generated by Markit Media Content Audit Scorecard");
  lines.push("https://themarkitmedia.com/resources/content-audit-scorecard");

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard API unavailable */
    }
  }, [text]);

  return (
    <button
      onClick={copy}
      aria-label="Copy results to clipboard"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Content Audit Scorecard",
          description: "Evaluate the substance and value of your content.",
          url: "https://themarkitmedia.com/en/resources/content-audit-scorecard",
          applicationCategory: "Content Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Content Audit Scorecard | Free Marketing Tool — Markit Media</title>
      <link rel="canonical" href="https://themarkitmedia.com/en/resources/content-audit-scorecard" />
      <meta name="description" content="Evaluate the substance and value of your content." />
      {copied ? "Copied" : "Copy Results"}
    </button>
  );
}

function DownloadButton({ text, filename }: { text: string; filename: string }) {
  const download = useCallback(() => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [text, filename]);

  return (
    <button
      onClick={download}
      aria-label="Download results as text file"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold bg-black text-white hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      Download as Text
    </button>
  );
}

function ProgressBar({ score, max }: { score: number; max: number }) {
  const pct = Math.round((score / max) * 100);
  return (
    <div className="w-full bg-gray-200 h-3" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={max} aria-label={`${score} out of ${max}`}>
      <div
        className="bg-black h-3 transition-all motion-reduce:transition-none"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Radar Chart (SVG, no external libraries)                           */
/* ------------------------------------------------------------------ */

function RadarChart({ ratings }: { ratings: RatingMap }) {
  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 110;
  const levels = 5;

  const catScores = categories.map((cat) => ({
    label: cat.label,
    score: getCategoryScore(cat, ratings),
    max: 10,
  }));

  const angleSlice = (2 * Math.PI) / catScores.length;

  function polarToCartesian(angle: number, r: number): { x: number; y: number } {
    return {
      x: cx + r * Math.cos(angle - Math.PI / 2),
      y: cy + r * Math.sin(angle - Math.PI / 2),
    };
  }

  // Grid rings
  const gridRings = Array.from({ length: levels }, (_, i) => {
    const r = (radius / levels) * (i + 1);
    const points = catScores
      .map((_, j) => {
        const p = polarToCartesian(j * angleSlice, r);
        return `${p.x},${p.y}`;
      })
      .join(" ");
    return <polygon key={i} points={points} fill="none" stroke="#e5e5e5" strokeWidth="1" />;
  });

  // Axis lines
  const axes = catScores.map((_, i) => {
    const p = polarToCartesian(i * angleSlice, radius);
    return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#e5e5e5" strokeWidth="1" />;
  });

  // Data polygon
  const dataPoints = catScores.map((cat, i) => {
    const r = (cat.score / cat.max) * radius;
    return polarToCartesian(i * angleSlice, r);
  });
  const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  // Labels
  const labels = catScores.map((cat, i) => {
    const p = polarToCartesian(i * angleSlice, radius + 28);
    const lines = cat.label.split(" ");
    return (
      <text
        key={i}
        x={p.x}
        y={p.y}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-black"
        style={{ fontSize: "11px", fontWeight: 700 }}
      >
        {lines.map((line, li) => (
          <tspan key={li} x={p.x} dy={li === 0 ? 0 : 14}>
            {line}
          </tspan>
        ))}
      </text>
    );
  });

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-full max-w-[320px] mx-auto"
      role="img"
      aria-label="Content health radar chart showing scores across 6 categories"
    >
      {gridRings}
      {axes}
      <polygon
        points={dataPath}
        fill="rgba(0,0,0,0.12)"
        stroke="#000"
        strokeWidth="2"
      />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#000" />
      ))}
      {labels}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */



export default function ContentAuditScorecardPage() {
  const [ratings, setRatings] = useState<RatingMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(0);

  const totalItems = getAllItemsCount();
  const ratedCount = Object.keys(ratings).length;
  const allRated = ratedCount === totalItems;

  const currentCat = categories[currentCategory];
  const currentCatComplete = currentCat.items.every(
    (item) => ratings[item.id] !== undefined
  );

  function handleRate(itemId: string, value: Rating) {
    setRatings((prev) => ({ ...prev, [itemId]: value }));
  }

  function handleNext() {
    if (currentCategory < categories.length - 1) {
      setCurrentCategory((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handlePrev() {
    if (currentCategory > 0) {
      setCurrentCategory((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleSubmit() {
    if (allRated) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleReset() {
    setRatings({});
    setSubmitted(false);
    setCurrentCategory(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const totalScore = getTotalScore(ratings);
  const grade = getLetterGrade(totalScore);
  const maturity = getMaturityLevel(totalScore);
  const quickWins = getQuickWins(ratings);
  const plainText = formatResultsText(ratings);

  return (
    <article className="min-h-screen">
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/content-calendar" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Content Calendar</Link>
                <Link href="/resources/content-brief-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Content Brief Generator</Link>
                <Link href="/resources/content-roi-calculator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Content ROI Calculator</Link>
                <Link href="/resources/content-gap-finder" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Content Gap Finder</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Content Audit Scorecard",
          description:
            "Free interactive tool to evaluate your website content across 30 criteria in 6 categories. Get a content health score, maturity level, and actionable recommendations.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Content Audit Scorecard" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Content Audit Scorecard
            </h1>
            <SectionDesc>
              Rate your website content across 30 criteria in 6 categories.
              Get a content health score, maturity level, radar chart, and
              a prioritized list of improvements to make first.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {!submitted ? (
        <>
          {/* ---- Progress Indicator ---- */}
          <section aria-label="Content section" className="px-6 lg:px-12 pb-6">
            <div className="max-w-3xl mx-auto">
              <Animate animation="fade-up">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-base font-bold text-black">
                    Category {currentCategory + 1} of {categories.length}
                  </p>
                  <p className="text-base text-gray-500">
                    {ratedCount} / {totalItems} rated
                  </p>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div
                    className="bg-black h-2 transition-all motion-reduce:transition-none"
                    style={{
                      width: `${(ratedCount / totalItems) * 100}%`,
                    }}
                  />
                </div>

                {/* Category nav pills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {categories.map((cat, i) => {
                    const catComplete = cat.items.every(
                      (item) => ratings[item.id] !== undefined
                    );
                    return (
                      <button
                        key={cat.key}
                        onClick={() => setCurrentCategory(i)}
                        className={`min-h-[44px] px-4 py-2 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                          i === currentCategory
                            ? "bg-black text-white"
                            : catComplete
                              ? "bg-gray-800 text-white"
                              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
              </Animate>
            </div>
          </section>

          {/* ---- Current Category Items ---- */}
          <section className="px-6 lg:px-12 py-8" aria-label="Scorecard criteria">
            <div className="max-w-3xl mx-auto">
              <Animate animation="fade-up" key={currentCat.key}>
                <div className="border border-gray-200 mb-8">
                  <div className="bg-black text-white px-6 py-5">
                    <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold">
                      {currentCat.label}
                    </h2>
                    <p className="text-base text-gray-400 mt-1">
                      {currentCat.description}
                    </p>
                  </div>

                  <div className="p-6 space-y-8">
                    {currentCat.items.map((item, idx) => (
                      <div key={item.id}>
                        <p className="text-base font-bold text-black mb-1">
                          {idx + 1}. {item.label}
                        </p>
                        <p className="text-base text-gray-500 mb-4">
                          {item.tip}
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {ratingOptions.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => handleRate(item.id, opt.value)}
                              className={`min-h-[44px] px-4 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                                ratings[item.id] === opt.value
                                  ? "bg-black text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Animate>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={handlePrev}
                  disabled={currentCategory === 0}
                  className={`min-h-[44px] px-8 py-4 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                    currentCategory === 0
                      ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                      : "border-2 border-black text-black hover:bg-black hover:text-white"
                  }`}
                >
                  &larr; Previous
                </button>

                {currentCategory < categories.length - 1 ? (
                  <button
                    onClick={handleNext}
                    disabled={!currentCatComplete}
                    className={`min-h-[44px] px-8 py-4 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      currentCatComplete
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Next &rarr;
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!allRated}
                    className={`min-h-[44px] px-10 py-4 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      allRated
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    See My Results &rarr;
                  </button>
                )}
              </div>

              {!allRated && currentCategory === categories.length - 1 && (
                <p className="text-base text-gray-400 text-center mt-4">
                  Rate all {totalItems} items to see your results
                </p>
              )}
            </div>
          </section>
        </>
      ) : (
        <>
          {/* ---- Results: Overall Score ---- */}
          <section className="px-6 lg:px-12 py-8" aria-label="Scorecard results">
            <div className="max-w-3xl mx-auto">
              <Animate animation="fade-up">
                <div className="bg-black text-white p-8 text-center mb-10">
                  <p className="text-base text-gray-400 mb-2">Your Content Score</p>
                  <div className="font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,5rem)] font-extrabold leading-none">
                    {totalScore}<span className="text-gray-500 text-[clamp(1.5rem,4vw,2.5rem)]"> / 60</span>
                  </div>
                  <div className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,4vw,2rem)] font-extrabold mt-2">
                    Grade: {grade}
                  </div>
                  <div className="w-full bg-white/20 h-3 mt-6">
                    <div
                      className="bg-white h-3 transition-all motion-reduce:transition-none"
                      style={{ width: `${(totalScore / 60) * 100}%` }}
                    />
                  </div>
                  <p className="text-base text-gray-300 mt-4">
                    Content Maturity: <span className="font-bold text-white">{maturity.label}</span>
                  </p>
                  <p className="text-base text-gray-400 mt-2 max-w-xl mx-auto">
                    {maturity.description}
                  </p>
                </div>
              </Animate>

              {/* ---- Radar Chart ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                  Content Health Radar
                </h2>
                <div className="border border-gray-200 p-6 mb-10">
                  <RadarChart ratings={ratings} />
                </div>
              </Animate>

              {/* ---- Per-Category Scores ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                  Category Scores
                </h2>
              </Animate>

              <Stagger stagger={100} className="space-y-6 mb-12">
                {categories.map((cat) => {
                  const score = getCategoryScore(cat, ratings);
                  return (
                    <div key={cat.key} className="border border-gray-200 p-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                            {cat.label}
                          </h3>
                          <p className="text-base text-gray-500 mt-1">
                            {score} / 10
                          </p>
                        </div>
                        <div
                          className={`min-w-[60px] text-center px-3 py-1 text-base font-bold ${
                            score >= 8
                              ? "bg-black text-white"
                              : score >= 5
                                ? "bg-gray-700 text-white"
                                : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {score}/10
                        </div>
                      </div>
                      <ProgressBar score={score} max={10} />
                      <div className="grid grid-cols-5 gap-3 mt-4">
                        {cat.items.map((item) => {
                          const val = ratings[item.id] ?? 0;
                          return (
                            <div key={item.id} className="text-center">
                              <div
                                className={`text-base font-bold ${
                                  val === 2
                                    ? "text-black"
                                    : val === 1
                                      ? "text-gray-600"
                                      : "text-gray-400"
                                }`}
                              >
                                {val}/2
                              </div>
                              <p className="text-base text-gray-500 mt-1 leading-snug">
                                {item.label.length > 8
                                  ? item.label.slice(0, 7) + "..."
                                  : item.label}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </Stagger>

              {/* ---- Quick Wins ---- */}
              {quickWins.length > 0 && (
                <>
                  <Animate animation="fade-up">
                    <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-2">
                      Quick Wins
                    </h2>
                    <p className="text-base text-gray-500 mb-6">
                      The top items to fix first, sorted by impact and ease of implementation.
                    </p>
                  </Animate>

                  <Stagger stagger={100} className="space-y-4 mb-12">
                    {quickWins.map((qw, i) => (
                      <div key={qw.id} className="border border-gray-200 p-5 flex items-center gap-4">
                        <div className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-black text-white font-bold text-base">
                          {i + 1}
                        </div>
                        <div>
                          <p className="text-base font-bold text-black">{qw.label}</p>
                          <p className="text-base text-gray-500">{qw.category}</p>
                        </div>
                      </div>
                    ))}
                  </Stagger>
                </>
              )}

              {/* ---- Category Recommendations ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-2">
                  Category Recommendations
                </h2>
                <p className="text-base text-gray-500 mb-6">
                  Specific actions for categories where you scored 5 or below.
                </p>
              </Animate>

              <Stagger stagger={100} className="space-y-6 mb-12">
                {categories
                  .filter((cat) => getCategoryScore(cat, ratings) <= 5)
                  .map((cat) => {
                    const score = getCategoryScore(cat, ratings);
                    return (
                      <div key={cat.key} className="border border-gray-200 p-6">
                        <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-1">
                          {cat.label}
                        </h3>
                        <p className="text-base text-gray-500 mb-4">
                          Score: {score}/10
                        </p>
                        <ul className="space-y-3">
                          {cat.recommendations.map((rec, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-base text-gray-600"
                            >
                              <span className="font-bold text-black min-w-[24px]">
                                {i + 1}.
                              </span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                {categories.every((cat) => getCategoryScore(cat, ratings) > 5) && (
                  <div className="border border-gray-200 p-6 text-center">
                    <p className="text-base text-gray-600">
                      All categories scored above 5. Your content program is in strong shape across the board.
                    </p>
                  </div>
                )}
              </Stagger>

              {/* ---- Copy / Download / Retake ---- */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <CopyButton text={plainText} />
                <DownloadButton
                  text={plainText}
                  filename="content-audit-scorecard.txt"
                />
                <button
                  onClick={handleReset}
                  className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border-2 border-black text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Retake Scorecard
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ---- Maturity Levels Explained ---- */}
      <section aria-label="Understanding Your Score" className="px-6 lg:px-12 py-20 border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Understanding Your Score</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-3 mb-8">
              Content Maturity Levels
            </h2>
          </Animate>

          <Stagger stagger={100} className="space-y-6">
            {maturityLevels.map((level) => (
              <div key={level.label} className="border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="min-w-[80px] text-center px-3 py-2 bg-black text-white font-bold text-base">
                    {level.range[0]}-{level.range[1]}
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                      {level.label}
                    </h3>
                    <p className="text-base text-gray-600 mt-1">
                      {level.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Improve Your Content?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team can help you build a content strategy that drives
              traffic, leads, and revenue. Let us turn your scorecard into
              an action plan.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Content Audit Scorecard"
        services={[
          { title: "Content Marketing", desc: "Strategic content that drives traffic, engagement, and conversions.", href: "/services/content-marketing" },
          { title: "SEO", desc: "Content optimized for search engines and human readers alike.", href: "/services/seo" },
          { title: "Social Media Marketing", desc: "Distribute your content where your audience already is.", href: "/services/social-media-marketing" },
        ]}
        relatedTools={[
          { title: "Content Brief", href: "/resources/content-brief" },
          { title: "Content Brief Generator", href: "/resources/content-brief-generator" },
          { title: "Content Calendar", href: "/resources/content-calendar" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
