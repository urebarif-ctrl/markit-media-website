"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

interface DimensionDef {
  id: string;
  label: string;
  description: string;
}

interface Scores {
  you: number[];
  competitor: number[];
}

interface GapItem {
  index: number;
  label: string;
  you: number;
  competitor: number;
  gap: number;
}

const dimensions: DimensionDef[] = [
  { id: "seo", label: "SEO / Organic Visibility", description: "Search rankings, organic traffic volume, keyword coverage, and domain authority" },
  { id: "content", label: "Content Quality & Volume", description: "Blog posts, guides, case studies, whitepapers, and overall content depth" },
  { id: "social", label: "Social Media Presence", description: "Follower counts, engagement rates, posting frequency, and platform coverage" },
  { id: "paid", label: "Paid Advertising", description: "Ad spend efficiency, channel diversity, creative quality, and campaign sophistication" },
  { id: "design", label: "Website Design & UX", description: "Visual quality, load speed, mobile experience, navigation, and conversion paths" },
  { id: "brand", label: "Brand Recognition", description: "Market awareness, brand recall, reputation, and perceived authority in the space" },
  { id: "email", label: "Email Marketing", description: "List size, segmentation, automation, open rates, and campaign cadence" },
  { id: "video", label: "Video Content", description: "YouTube presence, social video, production quality, and publishing consistency" },
  { id: "local", label: "Local/Reviews Presence", description: "Google Business Profile, review volume, review rating, and local SEO" },
  { id: "martech", label: "Marketing Technology", description: "CRM, analytics, automation tools, data integration, and tech stack maturity" },
];

const scaleLabels: Record<number, string> = {
  1: "Very Weak",
  2: "Below Average",
  3: "Average",
  4: "Strong",
  5: "Very Strong",
};

const actionRecommendations: Record<string, string[]> = {
  seo: [
    "Conduct a comprehensive keyword gap analysis to find terms your competitor ranks for that you do not.",
    "Build a sustained backlink acquisition strategy through guest posting, partnerships, and original research.",
    "Optimize technical SEO fundamentals: site speed, crawlability, structured data, and internal linking.",
  ],
  content: [
    "Develop a content calendar with a mix of long-form guides, case studies, and data-driven pieces.",
    "Audit existing content for quality and update underperforming pages with deeper research and fresh data.",
    "Create cornerstone content for your most important topics that can serve as link-building assets.",
  ],
  social: [
    "Focus on two to three platforms where your audience is most active rather than spreading thin.",
    "Develop a consistent posting schedule and invest in community engagement, not just broadcasting.",
    "Experiment with content formats: carousels, short-form video, polls, and behind-the-scenes content.",
  ],
  paid: [
    "Start with a focused campaign on one channel, optimize until profitable, then expand to additional channels.",
    "Build landing pages specifically designed for paid traffic with clear value propositions and single CTAs.",
    "Implement proper conversion tracking and attribution to measure true return on ad spend.",
  ],
  design: [
    "Conduct a UX audit focusing on mobile experience, page load speed, and conversion path clarity.",
    "Simplify navigation and reduce friction in your most important user journeys.",
    "A/B test key landing pages to improve conversion rates incrementally.",
  ],
  brand: [
    "Define a clear brand positioning statement that differentiates you from your top competitor.",
    "Invest in thought leadership through speaking engagements, industry publications, and original research.",
    "Build a consistent visual and verbal brand identity across every customer touchpoint.",
  ],
  email: [
    "Build lead magnets tailored to each stage of the buyer journey to grow your list with qualified subscribers.",
    "Implement segmentation and behavioral triggers to send more relevant, personalized messages.",
    "Set up automated nurture sequences for new subscribers, abandoned carts, and re-engagement.",
  ],
  video: [
    "Start with short educational videos that answer your audience's most common questions.",
    "Repurpose existing content into video format to maximize output without starting from scratch.",
    "Establish a consistent publishing cadence and optimize titles, thumbnails, and descriptions for discovery.",
  ],
  local: [
    "Claim and fully optimize your Google Business Profile with photos, posts, and accurate business information.",
    "Implement a systematic review generation strategy by asking satisfied customers at the right moment.",
    "Build local citations across relevant directories and ensure NAP consistency everywhere.",
  ],
  martech: [
    "Audit your current tool stack to identify gaps, redundancies, and integration opportunities.",
    "Invest in a CRM that connects marketing and sales data for a unified view of the customer journey.",
    "Implement proper analytics and attribution to make data-driven decisions about marketing spend.",
  ],
};

const advantageExtensions: Record<string, string> = {
  seo: "Double down on SEO by targeting long-tail keywords and building topical authority clusters around your strongest content areas.",
  content: "Leverage your content advantage by repurposing top-performing pieces into new formats and promoting them through additional channels.",
  social: "Use your social presence to build community features like groups, AMAs, or user-generated content campaigns that competitors cannot easily replicate.",
  paid: "Scale your paid advertising advantage by testing new channels, expanding to lookalike audiences, and investing in creative differentiation.",
  design: "Convert your UX advantage into a measurable competitive moat by implementing personalization and advanced conversion optimization.",
  brand: "Extend your brand recognition by launching co-marketing partnerships and PR campaigns that reinforce your market position.",
  email: "Capitalize on your email strength by implementing advanced segmentation, predictive send-time optimization, and dynamic content personalization.",
  video: "Build on your video advantage by creating serialized content, launching a branded show, or investing in interactive video experiences.",
  local: "Strengthen your local advantage by expanding to adjacent service areas and building hyperlocal content that competitors cannot match.",
  martech: "Use your technology advantage to automate more of your marketing workflow and unlock advanced capabilities like predictive analytics.",
};

const howToSteps = [
  { title: "Rate Yourself Honestly", description: "Score your business on each dimension from 1 to 5. Be objective. Overrating yourself defeats the purpose of the analysis." },
  { title: "Research Your Competitor", description: "Pick your closest or most threatening competitor. Review their website, social profiles, ads, and reviews to inform your scores." },
  { title: "Review the Gap Analysis", description: "Examine where the biggest gaps are. These are the dimensions where your competitor outperforms you the most." },
  { title: "Act on the Priorities", description: "Focus on closing the top three gaps first. Use the action plan recommendations as a starting point for your strategy." },
];

/* ------------------------------------------------------------------ */
/*  Utility functions                                                  */
/* ------------------------------------------------------------------ */

function createEmptyScores(): Scores {
  return {
    you: new Array(dimensions.length).fill(0),
    competitor: new Array(dimensions.length).fill(0),
  };
}

function computeGaps(scores: Scores): GapItem[] {
  return dimensions.map((dim, i) => ({
    index: i,
    label: dim.label,
    you: scores.you[i],
    competitor: scores.competitor[i],
    gap: scores.competitor[i] - scores.you[i],
  }));
}

function getOverallScore(scores: Scores): { you: number; competitor: number; position: string } {
  const youTotal = scores.you.reduce((a, b) => a + b, 0);
  const compTotal = scores.competitor.reduce((a, b) => a + b, 0);
  const youAvg = youTotal / dimensions.length;
  const compAvg = compTotal / dimensions.length;

  let position: string;
  const diff = youAvg - compAvg;
  if (diff >= 1.5) position = "Strong Leader";
  else if (diff >= 0.5) position = "Slight Leader";
  else if (diff > -0.5) position = "Competitive";
  else if (diff > -1.5) position = "Trailing";
  else position = "Significantly Behind";

  return { you: youAvg, competitor: compAvg, position };
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function ScoreSelector({
  dimensionId,
  dimensionLabel,
  side,
  value,
  onChange,
}: {
  dimensionId: string;
  dimensionLabel: string;
  side: "you" | "competitor";
  value: number;
  onChange: (v: number) => void;
}) {
  const id = `${dimensionId}-${side}`;
  const sideLabel = side === "you" ? "Your score" : "Competitor score";

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Competitive Gap Analyzer",
          description: "Search rankings, organic traffic volume, keyword coverage, and domain authority",
          url: "https://themarkitmedia.com/en/resources/competitive-gap",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Competitive Gap Analyzer | Free Marketing Tool — Markit Media</title>
      <meta name="description" content="Search rankings, organic traffic volume, keyword coverage, and domain authority" />
      <label htmlFor={id} className="sr-only">
        {sideLabel} for {dimensionLabel}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-4 py-3 border border-gray-200 text-base bg-white text-black min-h-[44px] appearance-none focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
      >
        <option value={0}>Select...</option>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n} - {scaleLabels[n]}
          </option>
        ))}
      </select>
    </div>
  );
}

function BarChart({ gaps }: { gaps: GapItem[] }) {
  const maxScore = 5;

  return (
    <div className="space-y-6" role="img" aria-label="Side-by-side bar chart comparing your scores with competitor scores across marketing dimensions">
      {/* Legend */}
      <div className="flex gap-8 text-base">
        <div className="flex items-center gap-2">
          <span className="inline-block w-5 h-5 bg-black" aria-hidden="true" />
          <span className="text-black font-bold">You</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-5 h-5 bg-gray-400" aria-hidden="true" />
          <span className="text-gray-600 font-bold">Competitor</span>
        </div>
      </div>

      {gaps.map((item) => (
        <div key={item.index}>
          <div className="flex justify-between mb-2">
            <span className="text-base font-bold text-black">{item.label}</span>
            <span className="text-base text-gray-500">
              {item.you} vs {item.competitor}
            </span>
          </div>
          {/* Your bar */}
          <div className="w-full bg-gray-100 h-6 mb-1">
            <div
              className="bg-black h-6 transition-all duration-500 motion-reduce:transition-none"
              style={{ width: `${(item.you / maxScore) * 100}%` }}
              role="presentation"
            />
          </div>
          {/* Competitor bar */}
          <div className="w-full bg-gray-100 h-6">
            <div
              className="bg-gray-400 h-6 transition-all duration-500 motion-reduce:transition-none"
              style={{ width: `${(item.competitor / maxScore) * 100}%` }}
              role="presentation"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function GapSummary({ gaps }: { gaps: GapItem[] }) {
  const sortedByGap = [...gaps]
    .filter((g) => g.gap !== 0)
    .sort((a, b) => Math.abs(b.gap) - Math.abs(a.gap));

  if (sortedByGap.length === 0) {
    return (
      <p className="text-base text-gray-500">
        All dimensions are equally rated. Adjust your scores to identify gaps.
      </p>
    );
  }

  const behindDimensions = sortedByGap.filter((g) => g.gap > 0);
  const aheadDimensions = sortedByGap.filter((g) => g.gap < 0);

  return (
    <div className="space-y-6">
      {behindDimensions.length > 0 && (
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
            Areas Where You Trail
          </h3>
          <div className="space-y-3">
            {behindDimensions.map((item) => (
              <div key={item.index} className="flex justify-between items-center border-b border-gray-100 pb-3">
                <span className="text-base text-gray-700">{item.label}</span>
                <span className="text-base font-bold text-black">
                  -{item.gap} gap
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {aheadDimensions.length > 0 && (
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
            Areas Where You Lead
          </h3>
          <div className="space-y-3">
            {aheadDimensions.map((item) => (
              <div key={item.index} className="flex justify-between items-center border-b border-gray-100 pb-3">
                <span className="text-base text-gray-700">{item.label}</span>
                <span className="text-base font-bold text-black">
                  +{Math.abs(item.gap)} ahead
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function OverallPosition({ scores }: { scores: Scores }) {
  const overall = getOverallScore(scores);

  return (
    <div className="border border-gray-200 p-6">
      <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
        Overall Competitive Position
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <p className="text-base text-gray-500 mb-1">Your Average</p>
          <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
            {overall.you.toFixed(1)}
          </p>
        </div>
        <div>
          <p className="text-base text-gray-500 mb-1">Competitor Average</p>
          <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-gray-500 font-[family-name:var(--font-display)]">
            {overall.competitor.toFixed(1)}
          </p>
        </div>
        <div>
          <p className="text-base text-gray-500 mb-1">Position</p>
          <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
            {overall.position}
          </p>
        </div>
      </div>
    </div>
  );
}

function PriorityActionPlan({ gaps }: { gaps: GapItem[] }) {
  const topGaps = [...gaps]
    .filter((g) => g.gap > 0)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 3);

  if (topGaps.length === 0) return null;

  return (
    <div className="space-y-6">
      <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
        Priority Action Plan
      </h3>
      <p className="text-base text-gray-500">
        These are your top {topGaps.length} gap{topGaps.length > 1 ? "s" : ""} where focused effort will have the greatest competitive impact.
      </p>
      {topGaps.map((item, rank) => {
        const dimId = dimensions[item.index].id;
        const recommendations = actionRecommendations[dimId] || [];
        return (
          <Animate key={item.index} animation="fade-up">
            <div className="border border-gray-200">
              <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
                <h4 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                  Priority #{rank + 1}: {item.label}
                </h4>
                <span className="text-base text-gray-400">
                  Gap: {item.gap} point{item.gap > 1 ? "s" : ""}
                </span>
              </div>
              <div className="p-6">
                <p className="text-base text-gray-500 mb-4">
                  You scored {item.you}/5 while your competitor scored {item.competitor}/5. Here is how to close this gap:
                </p>
                <ul className="space-y-3">
                  {recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3 text-base text-gray-700">
                      <span className="font-bold text-black min-w-[24px]">{i + 1}.</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Animate>
        );
      })}
    </div>
  );
}

function QuickWins({ gaps }: { gaps: GapItem[] }) {
  const advantages = [...gaps]
    .filter((g) => g.gap < 0)
    .sort((a, b) => a.gap - b.gap);

  if (advantages.length === 0) return null;

  return (
    <div className="space-y-6">
      <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
        Quick Wins
      </h3>
      <p className="text-base text-gray-500">
        You already lead in these areas. Here is how to extend your advantage.
      </p>
      {advantages.map((item) => {
        const dimId = dimensions[item.index].id;
        const extension = advantageExtensions[dimId] || "";
        return (
          <Animate key={item.index} animation="fade-up">
            <div className="border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                  {item.label}
                </h4>
                <span className="text-base font-bold text-black">
                  +{Math.abs(item.gap)} ahead
                </span>
              </div>
              <p className="text-base text-gray-500 mb-2">
                You scored {item.you}/5 vs competitor&apos;s {item.competitor}/5.
              </p>
              {extension && (
                <p className="text-base text-gray-700">{extension}</p>
              )}
            </div>
          </Animate>
        );
      })}
    </div>
  );
}

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
      aria-label="Copy analysis to clipboard"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      {copied ? "Copied" : "Copy to Clipboard"}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Format as plain text                                               */
/* ------------------------------------------------------------------ */

function formatAnalysisText(scores: Scores, gaps: GapItem[]): string {
  const lines: string[] = [];
  const overall = getOverallScore(scores);

  lines.push("COMPETITIVE GAP ANALYSIS");
  lines.push("=".repeat(50));
  lines.push(`Your Average: ${overall.you.toFixed(1)} / 5`);
  lines.push(`Competitor Average: ${overall.competitor.toFixed(1)} / 5`);
  lines.push(`Position: ${overall.position}`);
  lines.push("");

  lines.push("SCORES BY DIMENSION");
  lines.push("-".repeat(30));
  for (const g of gaps) {
    lines.push(`${g.label}: You ${g.you} | Competitor ${g.competitor} | Gap ${g.gap > 0 ? "-" : "+"}${Math.abs(g.gap)}`);
  }
  lines.push("");

  const behindGaps = [...gaps].filter((g) => g.gap > 0).sort((a, b) => b.gap - a.gap);
  if (behindGaps.length > 0) {
    lines.push("TOP GAPS TO CLOSE");
    lines.push("-".repeat(30));
    for (const g of behindGaps.slice(0, 3)) {
      const dimId = dimensions[g.index].id;
      lines.push(`${g.label} (gap: ${g.gap})`);
      const recs = actionRecommendations[dimId] || [];
      recs.forEach((r, i) => lines.push(`  ${i + 1}. ${r}`));
      lines.push("");
    }
  }

  const advantages = [...gaps].filter((g) => g.gap < 0).sort((a, b) => a.gap - b.gap);
  if (advantages.length > 0) {
    lines.push("QUICK WINS (YOUR ADVANTAGES)");
    lines.push("-".repeat(30));
    for (const g of advantages) {
      const dimId = dimensions[g.index].id;
      lines.push(`${g.label} (+${Math.abs(g.gap)} ahead)`);
      const ext = advantageExtensions[dimId];
      if (ext) lines.push(`  ${ext}`);
      lines.push("");
    }
  }

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */



export default function CompetitiveGapPage() {
  const [scores, setScores] = useState<Scores>(createEmptyScores());
  const [results, setResults] = useState<{ scores: Scores; gaps: GapItem[] } | null>(null);

  function updateScore(side: "you" | "competitor", index: number, value: number) {
    setScores((prev) => {
      const updated = { ...prev, [side]: [...prev[side]] };
      updated[side][index] = value;
      return updated;
    });
  }

  const allFilled = scores.you.every((v) => v > 0) && scores.competitor.every((v) => v > 0);

  function handleAnalyze() {
    if (!allFilled) return;
    const gaps = computeGaps(scores);
    setResults({ scores: { ...scores, you: [...scores.you], competitor: [...scores.competitor] }, gaps });
  }

  function handleReset() {
    setScores(createEmptyScores());
    setResults(null);
  }

  const plainText = results ? formatAnalysisText(results.scores, results.gaps) : "";

  return (
    <article className="min-h-screen">
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/competitor-analysis" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Competitor Analysis</Link>
                <Link href="/resources/competitor-benchmarking" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Competitor Benchmarking</Link>
                <Link href="/resources/competitor-matrix" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Competitor Matrix</Link>
                <Link href="/resources/competitor-pricing-tracker" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Competitor Pricing</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Competitive Gap Analyzer",
          description:
            "Free competitive gap analysis tool. Rate yourself and your competitor across 10 digital marketing dimensions to identify gaps and get a prioritized action plan.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Competitive Gap Analyzer" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Competitive Gap Analyzer
            </h1>
            <SectionDesc>
              Rate your business and your top competitor across 10 key digital
              marketing dimensions. Get a visual gap analysis, a prioritized
              action plan for closing gaps, and quick wins for extending your
              advantages.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Scoring Form ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="border border-gray-200">
              {/* Table header */}
              <div className="grid grid-cols-[1fr_140px_140px] sm:grid-cols-[1fr_160px_160px] bg-black text-white">
                <div className="px-6 py-4">
                  <span className="font-[family-name:var(--font-display)] text-base font-extrabold">
                    Dimension
                  </span>
                </div>
                <div className="px-4 py-4 text-center">
                  <span className="font-[family-name:var(--font-display)] text-base font-extrabold">
                    You
                  </span>
                </div>
                <div className="px-4 py-4 text-center">
                  <span className="font-[family-name:var(--font-display)] text-base font-extrabold">
                    Competitor
                  </span>
                </div>
              </div>

              {/* Dimension rows */}
              {dimensions.map((dim, i) => (
                <div
                  key={dim.id}
                  className={`grid grid-cols-[1fr_140px_140px] sm:grid-cols-[1fr_160px_160px] items-center ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } border-t border-gray-200`}
                >
                  <div className="px-6 py-4">
                    <p className="text-base font-bold text-black">{dim.label}</p>
                    <p className="text-base text-gray-500 mt-1 hidden sm:block">
                      {dim.description}
                    </p>
                  </div>
                  <div className="px-4 py-4">
                    <ScoreSelector
                      dimensionId={dim.id}
                      dimensionLabel={dim.label}
                      side="you"
                      value={scores.you[i]}
                      onChange={(v) => updateScore("you", i, v)}
                    />
                  </div>
                  <div className="px-4 py-4">
                    <ScoreSelector
                      dimensionId={dim.id}
                      dimensionLabel={dim.label}
                      side="competitor"
                      value={scores.competitor[i]}
                      onChange={(v) => updateScore("competitor", i, v)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Animate>

          {/* Analyze / Reset */}
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3 mt-8">
              <button
                onClick={handleAnalyze}
                disabled={!allFilled}
                className="bg-black text-white px-8 py-4 min-h-[44px] text-base font-bold hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Analyze Gaps
              </button>
              {scores.you.some((v) => v > 0) || scores.competitor.some((v) => v > 0) ? (
                <button
                  onClick={handleReset}
                  className="px-8 py-4 min-h-[44px] text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Reset
                </button>
              ) : null}
              {!allFilled && (
                <p className="text-base text-gray-400 self-center">
                  Rate all 10 dimensions for both you and your competitor to run the analysis.
                </p>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Results ---- */}
      {results && (
        <section aria-label="Score Comparison" className="px-6 lg:px-12 pb-16">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Overall position */}
            <Animate animation="fade-up">
              <OverallPosition scores={results.scores} />
            </Animate>

            {/* Bar chart */}
            <Animate animation="fade-up">
              <div className="border border-gray-200 p-6">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                  Score Comparison
                </h2>
                <BarChart gaps={results.gaps} />
              </div>
            </Animate>

            {/* Gap summary */}
            <Animate animation="fade-up">
              <div className="border border-gray-200 p-6">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                  Gap Analysis Summary
                </h2>
                <GapSummary gaps={results.gaps} />
              </div>
            </Animate>

            {/* Priority action plan */}
            <PriorityActionPlan gaps={results.gaps} />

            {/* Quick wins */}
            <QuickWins gaps={results.gaps} />

            {/* Export actions */}
            <div className="flex flex-wrap gap-3">
              <CopyButton text={plainText} />
            </div>
          </div>
        </section>
      )}

      {/* ---- How to Use This Analysis ---- */}
      <section aria-label="How to Use This Analysis" className="px-6 lg:px-12 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-8">
              How to Use This Analysis
            </h2>
          </Animate>
          <Stagger stagger={100} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {howToSteps.map((step, i) => (
              <div key={i} className="border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <span className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-gray-300">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                      {step.title}
                    </h3>
                    <p className="text-base text-gray-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Bottom CTA ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Get a Professional Competitive Analysis
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              This self-assessment is a starting point. Our team conducts
              in-depth competitive analyses using real data, proprietary tools,
              and industry benchmarks to give you a complete picture of your
              competitive landscape.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a Competitive Analysis From Our Team &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Competitive Gap"
        services={[
          { title: "Digital Marketing", desc: "Competitive intelligence turned into actionable growth strategy.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Outrank competitors with data-backed SEO strategies.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Win market share with smarter paid media campaigns.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Competitive Swot", href: "/resources/competitive-swot" },
          { title: "Competitive Swot Analyzer", href: "/resources/competitive-swot-analyzer" },
          { title: "Channel Selector", href: "/resources/channel-selector" },
          { title: "Client Onboarding Checklist", href: "/resources/client-onboarding-checklist" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
