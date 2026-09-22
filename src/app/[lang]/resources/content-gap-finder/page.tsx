"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

type ContentType =
  | "Blog"
  | "Video"
  | "Case Study"
  | "Whitepaper"
  | "Infographic"
  | "Webinar"
  | "Email"
  | "Social"
  | "Landing Page";

type BuyerStage = "Awareness" | "Consideration" | "Decision" | "Retention";

interface ContentPiece {
  id: string;
  title: string;
  url: string;
  contentType: ContentType;
  buyerStage: BuyerStage;
  topic: string;
  performance: number; // 1-5
}

const CONTENT_TYPES: ContentType[] = [
  "Blog",
  "Video",
  "Case Study",
  "Whitepaper",
  "Infographic",
  "Webinar",
  "Email",
  "Social",
  "Landing Page",
];

const BUYER_STAGES: BuyerStage[] = [
  "Awareness",
  "Consideration",
  "Decision",
  "Retention",
];

const STORAGE_KEY = "markit-content-gap-finder";

/* Stage importance weights for priority scoring */
const STAGE_WEIGHTS: Record<BuyerStage, number> = {
  Awareness: 3,
  Consideration: 4,
  Decision: 5,
  Retention: 3,
};

/* Content type effectiveness weights */
const TYPE_WEIGHTS: Record<ContentType, number> = {
  Blog: 4,
  Video: 5,
  "Case Study": 5,
  Whitepaper: 3,
  Infographic: 3,
  Webinar: 4,
  Email: 4,
  Social: 3,
  "Landing Page": 5,
};

/* Recommendations for each stage/type combination */
function getRecommendation(stage: BuyerStage, type: ContentType): string {
  const recs: Record<string, string> = {
    "Awareness-Blog":
      "Write educational blog posts that address common pain points your audience faces. Focus on informational keywords and how-to guides that draw organic traffic.",
    "Awareness-Video":
      "Create short explainer videos that introduce the problem your audience faces. Focus on educational content under three minutes for social sharing.",
    "Awareness-Case Study":
      "Publish high-level success stories that demonstrate the kind of outcomes possible. Keep them brief and focused on the before-and-after transformation.",
    "Awareness-Whitepaper":
      "Develop an industry report or trends whitepaper that positions your brand as a thought leader. Gate it behind an email signup to capture leads.",
    "Awareness-Infographic":
      "Design data-driven infographics that visualize industry statistics or process overviews. These earn social shares and backlinks.",
    "Awareness-Webinar":
      "Host educational webinars on broad industry topics. Partner with complementary brands to expand your reach.",
    "Awareness-Email":
      "Build a welcome email series for new subscribers that educates them about their challenges and positions your brand as a trusted resource.",
    "Awareness-Social":
      "Create a consistent posting schedule with thought leadership content, industry commentary, and shareable tips. Aim for three to five posts per week.",
    "Awareness-Landing Page":
      "Build a resource hub landing page that organizes your educational content by topic, making it easy for new visitors to find value.",
    "Consideration-Blog":
      "Write comparison posts and buying guides that help prospects evaluate their options. Include criteria checklists and feature breakdowns.",
    "Consideration-Video":
      "Produce product demos and walkthrough videos that show your solution in action. Address specific use cases your audience cares about.",
    "Consideration-Case Study":
      "Develop detailed case studies with specific metrics and timelines. Include quotes from customers and document the implementation process.",
    "Consideration-Whitepaper":
      "Create solution-focused whitepapers that dive deep into methodology and approach. Show the thinking behind your solution.",
    "Consideration-Infographic":
      "Design comparison infographics that visually contrast approaches, features, or pricing structures to help prospects evaluate options.",
    "Consideration-Webinar":
      "Run product-focused webinars with live Q&A. Include customer guest speakers who can share their real-world experience.",
    "Consideration-Email":
      "Build a nurture sequence that delivers case studies, comparison guides, and ROI data over several weeks to prospects who downloaded gated content.",
    "Consideration-Social":
      "Share customer success stories, behind-the-scenes content, and expert insights that help prospects understand your unique approach.",
    "Consideration-Landing Page":
      "Build product or service pages with detailed feature breakdowns, use cases, and social proof. Include clear calls to action for demos or trials.",
    "Decision-Blog":
      "Publish implementation guides, onboarding previews, and FAQ posts that address last-minute objections and show what working with you looks like.",
    "Decision-Video":
      "Create customer testimonial videos and detailed product tours. Let prospects see real people vouching for your solution.",
    "Decision-Case Study":
      "Develop ROI-focused case studies with hard numbers. Include the decision process your customer went through to build confidence.",
    "Decision-Whitepaper":
      "Produce technical documentation or implementation guides that give prospects confidence in the transition process.",
    "Decision-Infographic":
      "Create a visual implementation timeline or onboarding roadmap that shows exactly what the first 30, 60, and 90 days look like.",
    "Decision-Webinar":
      "Host a live Q&A or AMA session where prospects can ask any remaining questions before committing.",
    "Decision-Email":
      "Build a decision-stage email sequence with pricing details, guarantee information, and a limited-time offer to create urgency.",
    "Decision-Social":
      "Share testimonials, awards, certifications, and trust signals. Post about recent wins and milestones.",
    "Decision-Landing Page":
      "Build a pricing page with transparent costs, a comparison table, and strong calls to action. Include trust badges and guarantees.",
    "Retention-Blog":
      "Write advanced tips, best practices, and power-user guides that help existing customers get more value from your product or service.",
    "Retention-Video":
      "Produce tutorial videos and feature update walkthroughs that keep customers engaged and using your product effectively.",
    "Retention-Case Study":
      "Create expansion case studies that show how existing customers grew their use of your product over time and achieved compounding results.",
    "Retention-Whitepaper":
      "Develop advanced strategy guides exclusive to customers that help them level up their results and become power users.",
    "Retention-Infographic":
      "Design product roadmap infographics or success milestone visuals that keep customers excited about what is coming next.",
    "Retention-Webinar":
      "Host customer-only webinars with advanced training, roadmap previews, and community building. Feature customer speakers.",
    "Retention-Email":
      "Build re-engagement and upsell email sequences that highlight underused features, share tips, and introduce add-on services.",
    "Retention-Social":
      "Create a customer community on social media. Share user-generated content, feature customers, and celebrate their wins.",
    "Retention-Landing Page":
      "Build a customer portal or dashboard page that centralizes resources, support, and account management in one place.",
  };
  return recs[`${stage}-${type}`] || "Create content for this intersection to improve your coverage.";
}

/* ------------------------------------------------------------------ */
/*  Utility functions                                                  */
/* ------------------------------------------------------------------ */

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function createEmptyPiece(): ContentPiece {
  return {
    id: generateId(),
    title: "",
    url: "",
    contentType: "Blog",
    buyerStage: "Awareness",
    topic: "",
    performance: 3,
  };
}

function getMatrixCount(
  pieces: ContentPiece[],
  type: ContentType,
  stage: BuyerStage
): number {
  return pieces.filter(
    (p) => p.contentType === type && p.buyerStage === stage
  ).length;
}

function getMaxCellCount(pieces: ContentPiece[]): number {
  let max = 0;
  for (const type of CONTENT_TYPES) {
    for (const stage of BUYER_STAGES) {
      const count = getMatrixCount(pieces, type, stage);
      if (count > max) max = count;
    }
  }
  return max;
}

interface GapCell {
  type: ContentType;
  stage: BuyerStage;
  count: number;
  priority: number;
}

function getGaps(pieces: ContentPiece[]): GapCell[] {
  const gaps: GapCell[] = [];
  for (const type of CONTENT_TYPES) {
    for (const stage of BUYER_STAGES) {
      const count = getMatrixCount(pieces, type, stage);
      if (count <= 1) {
        const priority =
          STAGE_WEIGHTS[stage] * TYPE_WEIGHTS[type] * (count === 0 ? 2 : 1);
        gaps.push({ type, stage, count, priority });
      }
    }
  }
  gaps.sort((a, b) => b.priority - a.priority);
  return gaps;
}

function getCoveragePercentage(pieces: ContentPiece[]): number {
  let filled = 0;
  const total = CONTENT_TYPES.length * BUYER_STAGES.length;
  for (const type of CONTENT_TYPES) {
    for (const stage of BUYER_STAGES) {
      if (getMatrixCount(pieces, type, stage) >= 2) filled++;
    }
  }
  return Math.round((filled / total) * 100);
}

function getStageCount(pieces: ContentPiece[], stage: BuyerStage): number {
  return pieces.filter((p) => p.buyerStage === stage).length;
}

function getTypeCount(pieces: ContentPiece[], type: ContentType): number {
  return pieces.filter((p) => p.contentType === type).length;
}

/* ------------------------------------------------------------------ */
/*  localStorage helpers                                               */
/* ------------------------------------------------------------------ */

function loadFromStorage(): ContentPiece[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(pieces: ContentPiece[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pieces));
  } catch {
    /* quota exceeded - fail silently */
  }
}

/* ------------------------------------------------------------------ */
/*  Export helper                                                       */
/* ------------------------------------------------------------------ */

function formatExportText(pieces: ContentPiece[]): string {
  const lines: string[] = [];
  const gaps = getGaps(pieces);
  const coverage = getCoveragePercentage(pieces);

  lines.push("CONTENT GAP FINDER - ANALYSIS REPORT");
  lines.push("=".repeat(50));
  lines.push(`Generated: ${new Date().toLocaleDateString()}`);
  lines.push(`Total Content Pieces: ${pieces.length}`);
  lines.push(`Coverage Score: ${coverage}%`);
  lines.push("");

  /* Inventory */
  lines.push("CONTENT INVENTORY");
  lines.push("-".repeat(30));
  for (const stage of BUYER_STAGES) {
    const stagePieces = pieces.filter((p) => p.buyerStage === stage);
    lines.push(`\n${stage} Stage (${stagePieces.length} pieces):`);
    if (stagePieces.length === 0) {
      lines.push("  No content in this stage.");
    } else {
      for (const p of stagePieces) {
        lines.push(
          `  - ${p.title} [${p.contentType}] Performance: ${p.performance}/5${
            p.topic ? ` | Topic: ${p.topic}` : ""
          }${p.url ? ` | URL: ${p.url}` : ""}`
        );
      }
    }
  }
  lines.push("");

  /* Summary by type */
  lines.push("CONTENT BY TYPE");
  lines.push("-".repeat(30));
  for (const type of CONTENT_TYPES) {
    const count = getTypeCount(pieces, type);
    lines.push(`  ${type}: ${count} piece${count !== 1 ? "s" : ""}`);
  }
  lines.push("");

  /* Summary by stage */
  lines.push("CONTENT BY STAGE");
  lines.push("-".repeat(30));
  for (const stage of BUYER_STAGES) {
    const count = getStageCount(pieces, stage);
    lines.push(`  ${stage}: ${count} piece${count !== 1 ? "s" : ""}`);
  }
  lines.push("");

  /* Gap analysis */
  lines.push("IDENTIFIED GAPS (sorted by priority)");
  lines.push("-".repeat(30));
  if (gaps.length === 0) {
    lines.push("  No significant gaps found. Great coverage!");
  } else {
    for (const gap of gaps) {
      const status = gap.count === 0 ? "EMPTY" : "LOW (1 piece)";
      lines.push(
        `  [${status}] ${gap.type} x ${gap.stage} (Priority Score: ${gap.priority})`
      );
      lines.push(`    Recommendation: ${getRecommendation(gap.stage, gap.type)}`);
      lines.push("");
    }
  }

  lines.push("");
  lines.push("Generated by Content Gap Finder - Markit Media");
  lines.push("https://themarkitmedia.com/en/resources/content-gap-finder");

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Educational content                                                */
/* ------------------------------------------------------------------ */

const educationSteps = [
  {
    title: "Inventory Your Content",
    description:
      "Start by adding every piece of content you currently have. Include blog posts, videos, case studies, emails, and anything else your audience interacts with. Be thorough because gaps are only visible when you have a complete picture.",
  },
  {
    title: "Map to the Buyer Journey",
    description:
      "Assign each piece to a buyer stage. Awareness content educates, consideration content compares, decision content converts, and retention content keeps customers engaged. If a piece does not clearly fit one stage, it may need refocusing.",
  },
  {
    title: "Read the Heatmap",
    description:
      "The heatmap shows content density across every type and stage combination. Dark cells mean strong coverage. Light or empty cells reveal opportunities. Look for patterns like an entire stage with no content, or a content type you have never tried.",
  },
  {
    title: "Prioritize and Plan",
    description:
      "Use the gap priority scores to decide where to invest first. Gaps at the decision stage often have the most immediate revenue impact. Gaps at awareness limit your top-of-funnel pipeline. Start with high-priority gaps and work down.",
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function ContentForm({
  piece,
  onChange,
  onRemove,
}: {
  piece: ContentPiece;
  onChange: (updated: ContentPiece) => void;
  onRemove: () => void;
}) {
  return (
    <div className="border border-neutral-200 p-6 space-y-4">
      {/* Title */}
      <div>
        <label
          htmlFor={`title-${piece.id}`}
          className="block text-base font-bold text-black mb-1"
        >
          Title
        </label>
        <input
          id={`title-${piece.id}`}
          type="text"
          value={piece.title}
          onChange={(e) => onChange({ ...piece, title: e.target.value })}
          placeholder="e.g. How to Choose a Marketing Agency"
          className="w-full border border-neutral-200 px-4 py-3 text-base text-black bg-white placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
        />
      </div>

      {/* URL (optional) */}
      <div>
        <label
          htmlFor={`url-${piece.id}`}
          className="block text-base font-bold text-black mb-1"
        >
          URL <span className="font-normal text-neutral-500">(optional)</span>
        </label>
        <input
          id={`url-${piece.id}`}
          type="url"
          value={piece.url}
          onChange={(e) => onChange({ ...piece, url: e.target.value })}
          placeholder="https://example.com/blog/post"
          className="w-full border border-neutral-200 px-4 py-3 text-base text-black bg-white placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
        />
      </div>

      {/* Content Type + Buyer Stage */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`type-${piece.id}`}
            className="block text-base font-bold text-black mb-1"
          >
            Content Type
          </label>
          <select
            id={`type-${piece.id}`}
            value={piece.contentType}
            onChange={(e) =>
              onChange({ ...piece, contentType: e.target.value as ContentType })
            }
            className="w-full border border-neutral-200 px-4 py-3 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
          >
            {CONTENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={`stage-${piece.id}`}
            className="block text-base font-bold text-black mb-1"
          >
            Buyer Stage
          </label>
          <select
            id={`stage-${piece.id}`}
            value={piece.buyerStage}
            onChange={(e) =>
              onChange({ ...piece, buyerStage: e.target.value as BuyerStage })
            }
            className="w-full border border-neutral-200 px-4 py-3 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
          >
            {BUYER_STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Topic + Performance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`topic-${piece.id}`}
            className="block text-base font-bold text-black mb-1"
          >
            Topic / Keyword
          </label>
          <input
            id={`topic-${piece.id}`}
            type="text"
            value={piece.topic}
            onChange={(e) => onChange({ ...piece, topic: e.target.value })}
            placeholder="e.g. agency selection"
            className="w-full border border-neutral-200 px-4 py-3 text-base text-black bg-white placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
          />
        </div>

        <div>
          <label
            htmlFor={`perf-${piece.id}`}
            className="block text-base font-bold text-black mb-1"
          >
            Performance Rating
          </label>
          <fieldset
            className="flex gap-0 border border-neutral-200"
            aria-label={`Performance rating for ${piece.title || "this content"}`}
          >
            <legend className="sr-only">
              Performance rating for {piece.title || "this content"}
            </legend>
            {[1, 2, 3, 4, 5].map((n) => {
              const isSelected = piece.performance === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => onChange({ ...piece, performance: n })}
                  aria-label={`${n} out of 5`}
                  aria-pressed={isSelected}
                  className={`min-h-[44px] min-w-[44px] px-3 py-2 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                    isSelected
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-neutral-100"
                  } ${n > 1 ? "border-l border-neutral-200" : ""}`}
                >
                  {n}
                </button>
              );
            })}
          </fieldset>
        </div>
      </div>

      {/* Remove */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${piece.title || "this content piece"}`}
          className="min-h-[44px] px-5 py-2 text-base font-bold text-neutral-500 hover:text-black border border-neutral-200 hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

function BuyerJourneyMatrix({ pieces }: { pieces: ContentPiece[] }) {
  const maxCount = getMaxCellCount(pieces);

  function getCellIntensity(count: number): string {
    if (count === 0) return "bg-neutral-50 text-neutral-400";
    if (maxCount <= 1) return "bg-black text-white";
    const ratio = count / maxCount;
    if (ratio >= 0.75) return "bg-black text-white";
    if (ratio >= 0.5) return "bg-neutral-800 text-white";
    if (ratio >= 0.25) return "bg-neutral-500 text-white";
    return "bg-neutral-300 text-black";
  }

  return (
    <div className="overflow-x-auto">
      <table
        className="w-full border-collapse text-base"
        role="grid"
        aria-label="Buyer journey content matrix showing content counts by type and stage"
      >
        <thead>
          <tr>
            <th className="border border-neutral-200 px-4 py-3 text-left font-bold text-black bg-neutral-50">
              Content Type
            </th>
            {BUYER_STAGES.map((stage) => (
              <th
                key={stage}
                className="border border-neutral-200 px-4 py-3 text-center font-bold text-black bg-neutral-50"
              >
                {stage}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CONTENT_TYPES.map((type) => (
            <tr key={type}>
              <td className="border border-neutral-200 px-4 py-3 font-bold text-black">
                {type}
              </td>
              {BUYER_STAGES.map((stage) => {
                const count = getMatrixCount(pieces, type, stage);
                return (
                  <td
                    key={stage}
                    className={`border border-neutral-200 px-4 py-3 text-center font-bold ${getCellIntensity(count)}`}
                    aria-label={`${type} in ${stage}: ${count} piece${count !== 1 ? "s" : ""}`}
                  >
                    {count}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SvgHeatmap({ pieces }: { pieces: ContentPiece[] }) {
  const maxCount = getMaxCellCount(pieces);
  const cellW = 120;
  const cellH = 40;
  const labelW = 130;
  const headerH = 60;
  const totalW = labelW + BUYER_STAGES.length * cellW;
  const totalH = headerH + CONTENT_TYPES.length * cellH;

  function getFill(count: number): string {
    if (count === 0) return "#fafafa";
    if (maxCount <= 1) return "#000000";
    const ratio = count / maxCount;
    if (ratio >= 0.75) return "#000000";
    if (ratio >= 0.5) return "#404040";
    if (ratio >= 0.25) return "#737373";
    return "#d4d4d4";
  }

  function getTextFill(count: number): string {
    if (count === 0) return "#a3a3a3";
    if (maxCount <= 1) return "#ffffff";
    const ratio = count / maxCount;
    return ratio >= 0.25 && count > 0 ? "#ffffff" : "#000000";
  }

  return (
    <svg
      viewBox={`0 0 ${totalW} ${totalH}`}
      className="w-full h-auto"
      role="img"
      aria-label="Content coverage heatmap showing content types across buyer journey stages"
    >
      <title>Content Coverage Heatmap</title>
      {/* Column headers */}
      {BUYER_STAGES.map((stage, i) => (
        <text
          key={stage}
          x={labelW + i * cellW + cellW / 2}
          y={headerH - 16}
          textAnchor="middle"
          className="text-[13px] font-bold fill-black"
        >
          {stage}
        </text>
      ))}

      {/* Row labels + cells */}
      {CONTENT_TYPES.map((type, ri) => (
        <g key={type}>
          <text
            x={labelW - 10}
            y={headerH + ri * cellH + cellH / 2 + 5}
            textAnchor="end"
            className="text-base fill-black"
          >
            {type}
          </text>
          {BUYER_STAGES.map((stage, ci) => {
            const count = getMatrixCount(pieces, type, stage);
            const x = labelW + ci * cellW;
            const y = headerH + ri * cellH;
            return (
              <g key={stage}>
                <rect
                  x={x}
                  y={y}
                  width={cellW}
                  height={cellH}
                  fill={getFill(count)}
                  stroke="#e5e5e5"
                  strokeWidth={1}
                />
                <text
                  x={x + cellW / 2}
                  y={y + cellH / 2 + 5}
                  textAnchor="middle"
                  fill={getTextFill(count)}
                  className="text-[13px] font-bold"
                >
                  {count}
                </text>
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}

function GapList({ gaps }: { gaps: GapCell[] }) {
  if (gaps.length === 0) {
    return (
      <div className="border border-neutral-200 p-6">
        <p className="text-base text-neutral-700">
          No significant gaps found. Your content covers all type and stage
          combinations with at least two pieces each.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {gaps.slice(0, 10).map((gap, i) => (
        <Animate key={`${gap.type}-${gap.stage}`} animation="fade-up">
          <div className="border border-neutral-200">
            <div className="bg-black text-white px-6 py-4 flex items-center justify-between flex-wrap gap-2">
              <h4 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                #{i + 1}: {gap.type} &times; {gap.stage}
              </h4>
              <span className="text-base text-neutral-400">
                {gap.count === 0 ? "Empty" : "1 piece"} &middot; Priority:{" "}
                {gap.priority}
              </span>
            </div>
            <div className="p-6">
              <p className="text-base text-neutral-700 leading-relaxed">
                {getRecommendation(gap.stage, gap.type)}
              </p>
            </div>
          </div>
        </Animate>
      ))}
    </div>
  );
}

function AuditSummary({ pieces }: { pieces: ContentPiece[] }) {
  const coverage = getCoveragePercentage(pieces);

  return (
    <div className="border border-neutral-200 p-6">
      <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-6">
        Content Audit Summary
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div>
          <p className="text-base text-neutral-500 mb-1">Total Pieces</p>
          <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
            {pieces.length}
          </p>
        </div>
        <div>
          <p className="text-base text-neutral-500 mb-1">Coverage</p>
          <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
            {coverage}%
          </p>
        </div>
        <div>
          <p className="text-base text-neutral-500 mb-1">Avg Performance</p>
          <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
            {pieces.length > 0
              ? (
                  pieces.reduce((s, p) => s + p.performance, 0) / pieces.length
                ).toFixed(1)
              : "0"}
            /5
          </p>
        </div>
      </div>

      {/* By stage */}
      <h4 className="text-base font-bold text-black mb-3">By Buyer Stage</h4>
      <div className="space-y-3 mb-8">
        {BUYER_STAGES.map((stage) => {
          const count = getStageCount(pieces, stage);
          const pct =
            pieces.length > 0 ? Math.round((count / pieces.length) * 100) : 0;
          return (
            <div key={stage}>
              <div className="flex justify-between mb-1">
                <span className="text-base font-bold text-black">{stage}</span>
                <span className="text-base text-neutral-500">
                  {count} piece{count !== 1 ? "s" : ""} ({pct}%)
                </span>
              </div>
              <div className="w-full bg-neutral-100 h-6">
                <div
                  className="bg-black h-6 transition-all duration-500 motion-reduce:transition-none"
                  style={{ width: `${pct}%` }}
                  role="presentation"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* By type */}
      <h4 className="text-base font-bold text-black mb-3">By Content Type</h4>
      <div className="space-y-3">
        {CONTENT_TYPES.map((type) => {
          const count = getTypeCount(pieces, type);
          const pct =
            pieces.length > 0 ? Math.round((count / pieces.length) * 100) : 0;
          return (
            <div key={type}>
              <div className="flex justify-between mb-1">
                <span className="text-base font-bold text-black">{type}</span>
                <span className="text-base text-neutral-500">
                  {count} piece{count !== 1 ? "s" : ""} ({pct}%)
                </span>
              </div>
              <div className="w-full bg-neutral-100 h-6">
                <div
                  className="bg-black h-6 transition-all duration-500 motion-reduce:transition-none"
                  style={{ width: `${pct}%` }}
                  role="presentation"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function ContentGapFinderPage() {
  const [pieces, setPieces] = useState<ContentPiece[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  /* Load from localStorage on mount */
  useEffect(() => {
    const saved = loadFromStorage();
    if (saved.length > 0) {
      setPieces(saved);
    }
    setHydrated(true);
  }, []);

  /* Persist on change */
  useEffect(() => {
    if (hydrated) {
      saveToStorage(pieces);
    }
  }, [pieces, hydrated]);

  function addPiece() {
    setPieces((prev) => [...prev, createEmptyPiece()]);
    setShowResults(false);
  }

  function updatePiece(id: string, updated: ContentPiece) {
    setPieces((prev) => prev.map((p) => (p.id === id ? updated : p)));
    setShowResults(false);
  }

  function removePiece(id: string) {
    setPieces((prev) => prev.filter((p) => p.id !== id));
    setShowResults(false);
  }

  function handleAnalyze() {
    const validPieces = pieces.filter((p) => p.title.trim().length > 0);
    if (validPieces.length === 0) return;
    setPieces(validPieces);
    setShowResults(true);
  }

  function handleReset() {
    setPieces([]);
    setShowResults(false);
  }

  const exportTxt = useCallback(() => {
    const text = formatExportText(pieces);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content-gap-analysis.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [pieces]);

  const copyToClipboard = useCallback(async () => {
    const text = formatExportText(pieces);
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      /* clipboard API unavailable */
    }
  }, [pieces]);

  const validCount = pieces.filter((p) => p.title.trim().length > 0).length;
  const gaps = getGaps(pieces);

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
                <Link href="/resources/content-pillar-planner" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Content Pillar Planner</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Content Gap Finder",
          description:
            "Free content gap finder tool. Map your existing content against the buyer journey and identify opportunities to fill gaps in your marketing strategy.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Content Gap Finder" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Content Gap Finder
            </h1>
            <SectionDesc>
              Map your existing content against the buyer journey and uncover
              gaps in your strategy. Add your content pieces, see where coverage
              is strong or weak, and get prioritized recommendations for what to
              create next.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Content Inventory Input ---- */}
      <section className="px-6 lg:px-12 pb-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
              Content Inventory
            </h2>
            <p className="text-base text-neutral-500 mt-2">
              Add each piece of content you currently have. Include the title,
              type, which buyer journey stage it serves, and how well it
              performs.
            </p>
          </Animate>

          {hydrated && pieces.length > 0 && (
            <div className="space-y-4">
              {pieces.map((piece, i) => (
                <Animate key={piece.id} animation="fade-up" delay={i * 50}>
                  <ContentForm
                    piece={piece}
                    onChange={(updated) => updatePiece(piece.id, updated)}
                    onRemove={() => removePiece(piece.id)}
                  />
                </Animate>
              ))}
            </div>
          )}

          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={addPiece}
                className="bg-black text-white px-8 py-4 min-h-[44px] text-base font-bold hover:bg-neutral-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                + Add Content Piece
              </button>

              {validCount >= 1 && (
                <button
                  type="button"
                  onClick={handleAnalyze}
                  className="bg-white text-black px-8 py-4 min-h-[44px] text-base font-bold border border-black hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Analyze Gaps ({validCount} piece
                  {validCount !== 1 ? "s" : ""})
                </button>
              )}

              {pieces.length > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-8 py-4 min-h-[44px] text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Clear All
                </button>
              )}
            </div>
          </Animate>

          {!hydrated && (
            <p className="text-base text-neutral-400">Loading saved data...</p>
          )}
          {hydrated && pieces.length === 0 && (
            <Animate animation="fade-up">
              <div className="border border-neutral-200 p-8 text-center">
                <p className="text-base text-neutral-500">
                  No content pieces added yet. Click &ldquo;Add Content
                  Piece&rdquo; to start building your inventory.
                </p>
              </div>
            </Animate>
          )}
        </div>
      </section>

      {/* ---- Results ---- */}
      {showResults && validCount >= 1 && (
        <section className="px-6 lg:px-12 pb-16">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Audit Summary */}
            <Animate animation="fade-up">
              <AuditSummary pieces={pieces} />
            </Animate>

            {/* Buyer Journey Matrix */}
            <Animate animation="fade-up">
              <div className="border border-neutral-200 p-6">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-4">
                  Buyer Journey Matrix
                </h2>
                <p className="text-base text-neutral-500 mb-6">
                  Each cell shows the number of content pieces at that
                  intersection. Darker cells indicate stronger coverage.
                </p>
                <BuyerJourneyMatrix pieces={pieces} />
              </div>
            </Animate>

            {/* SVG Heatmap */}
            <Animate animation="fade-up">
              <div className="border border-neutral-200 p-6">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-4">
                  Content Coverage Heatmap
                </h2>
                <p className="text-base text-neutral-500 mb-6">
                  A visual map of your content coverage. Empty or light areas
                  represent the biggest opportunities.
                </p>
                <SvgHeatmap pieces={pieces} />
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-base text-neutral-500">Legend:</span>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-6 h-4 bg-neutral-50 border border-neutral-200"
                      aria-hidden="true"
                    />
                    <span className="text-base text-neutral-500">Empty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-6 h-4 bg-neutral-300"
                      aria-hidden="true"
                    />
                    <span className="text-base text-neutral-500">Low</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-6 h-4 bg-neutral-500"
                      aria-hidden="true"
                    />
                    <span className="text-base text-neutral-500">Medium</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-6 h-4 bg-black"
                      aria-hidden="true"
                    />
                    <span className="text-base text-neutral-500">High</span>
                  </div>
                </div>
              </div>
            </Animate>

            {/* Gap Identification */}
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-2">
                Identified Gaps
              </h2>
              <p className="text-base text-neutral-500 mb-6">
                Content type and buyer stage combinations with zero or only one
                piece, ranked by priority. Higher priority means greater
                potential impact.
              </p>
              <GapList gaps={gaps} />
            </div>

            {/* Export actions */}
            <Animate animation="fade-up">
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={exportTxt}
                  className="bg-black text-white px-8 py-4 min-h-[44px] text-base font-bold hover:bg-neutral-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Download .txt
                </button>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  aria-label="Copy analysis to clipboard"
                  className="min-h-[44px] px-8 py-4 text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  {copySuccess ? "Copied" : "Copy to Clipboard"}
                </button>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Educational Section ---- */}
      <section className="px-6 lg:px-12 py-16 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-4">
              How Content Mapping Works
            </h2>
            <p className="text-base text-neutral-500 leading-relaxed mb-8">
              Content mapping aligns every piece of content to a specific stage
              of the buyer journey. The goal is full coverage: your audience
              should find relevant, valuable content from the moment they
              discover a problem (awareness) through evaluating solutions
              (consideration) to making a purchase (decision) and beyond
              (retention). Gaps in this journey mean lost opportunities, whether
              that is traffic you never capture, leads that stall, or customers
              who churn.
            </p>
          </Animate>
          <Stagger stagger={100} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {educationSteps.map((step, i) => (
              <div key={i} className="border border-neutral-200 p-6">
                <div className="flex items-start gap-4">
                  <span className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-neutral-300">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                      {step.title}
                    </h3>
                    <p className="text-base text-neutral-500 leading-relaxed">
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
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Get a Professional Content Strategy
            </h2>
            <p className="text-lg text-neutral-400 mt-4 mb-8">
              This tool gives you a starting point. Our team builds
              comprehensive content strategies backed by competitive research,
              keyword data, and audience insights to close every gap in your
              buyer journey.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a Content Strategy From Our Team &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Content Gap Finder"
        services={[
          { title: "Content Marketing", desc: "Strategic content that drives traffic, engagement, and conversions.", href: "/services/content-marketing" },
          { title: "SEO", desc: "Content optimized for search engines and human readers alike.", href: "/services/seo" },
          { title: "Social Media Marketing", desc: "Distribute your content where your audience already is.", href: "/services/social-media-marketing" },
        ]}
        relatedTools={[
          { title: "Content Brief Generator", href: "/resources/content-brief-generator" },
          { title: "Content Calendar", href: "/resources/content-calendar" },
          { title: "Content Gap Analyzer", href: "/resources/content-gap-analyzer" },
          { title: "Content Performance Scorecard", href: "/resources/content-performance-scorecard" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
