"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CompanyData {
  name: string;
  scores: number[];
}

interface GapDetail {
  dimensionIndex: number;
  dimensionLabel: string;
  yourScore: number;
  competitorName: string;
  competitorScore: number;
  gap: number;
}

interface MarketGap {
  dimensionIndex: number;
  dimensionLabel: string;
  yourScore: number;
  avgCompetitorScore: number;
  avgAllScore: number;
}

interface ThreatItem {
  dimensionIndex: number;
  dimensionLabel: string;
  yourScore: number;
  bestCompetitorName: string;
  bestCompetitorScore: number;
  gap: number;
}

interface CompetitorGaps {
  competitorName: string;
  ahead: GapDetail[];
  behind: GapDetail[];
}

interface AnalysisResults {
  yourCompany: CompanyData;
  competitors: CompanyData[];
  threats: ThreatItem[];
  marketGaps: MarketGap[];
  gapsPerCompetitor: CompetitorGaps[];
  leaderboard: { name: string; total: number; isYou: boolean }[];
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const DIMENSIONS = [
  { id: "brand-awareness", label: "Brand Awareness", short: "Brand", description: "Market recognition, recall, and perceived authority" },
  { id: "website-experience", label: "Website Experience", short: "Website", description: "Design quality, usability, speed, and conversion paths" },
  { id: "content-quality", label: "Content Quality", short: "Content", description: "Blog, guides, case studies, and overall content depth" },
  { id: "seo-presence", label: "SEO Presence", short: "SEO", description: "Search rankings, organic traffic, and keyword coverage" },
  { id: "social-engagement", label: "Social Media Engagement", short: "Social", description: "Follower growth, engagement rates, and community activity" },
  { id: "customer-reviews", label: "Customer Reviews", short: "Reviews", description: "Review volume, average rating, and response management" },
  { id: "pricing", label: "Pricing Competitiveness", short: "Pricing", description: "Value proposition, pricing transparency, and market positioning" },
  { id: "product-range", label: "Product/Service Range", short: "Products", description: "Breadth of offerings, customization, and market coverage" },
  { id: "innovation", label: "Innovation", short: "Innovation", description: "New launches, technology adoption, and creative differentiation" },
  { id: "customer-support", label: "Customer Support", short: "Support", description: "Response time, channel availability, and resolution quality" },
];

const SCALE_LABELS: Record<number, string> = {
  1: "Very Weak",
  2: "Below Average",
  3: "Average",
  4: "Strong",
  5: "Very Strong",
};

const ACTION_RECOMMENDATIONS: Record<string, string[]> = {
  "brand-awareness": [
    "Invest in consistent brand messaging across all channels to improve recognition.",
    "Launch thought leadership content such as original research or industry reports.",
    "Pursue PR opportunities and speaking engagements to build authority in your space.",
  ],
  "website-experience": [
    "Conduct a UX audit focused on mobile experience, page load speed, and navigation clarity.",
    "Simplify conversion paths and reduce the number of steps to complete key actions.",
    "Implement A/B testing on key landing pages to improve conversion rates incrementally.",
  ],
  "content-quality": [
    "Develop a content calendar mixing long-form guides, case studies, and data-driven pieces.",
    "Audit existing content and refresh underperforming pages with updated data and deeper research.",
    "Create cornerstone content around your most important topics to establish topical authority.",
  ],
  "seo-presence": [
    "Run a keyword gap analysis to find terms competitors rank for that you do not.",
    "Build a backlink acquisition strategy through guest posts, partnerships, and original research.",
    "Optimize technical SEO fundamentals: site speed, structured data, and internal linking architecture.",
  ],
  "social-engagement": [
    "Focus on two to three platforms where your audience is most active rather than spreading thin.",
    "Invest in community engagement and conversation, not just broadcasting content.",
    "Experiment with content formats: carousels, short-form video, polls, and behind-the-scenes content.",
  ],
  "customer-reviews": [
    "Build a systematic review generation process by asking satisfied customers at the right moment.",
    "Respond to all reviews, positive and negative, promptly and professionally.",
    "Showcase your strongest reviews prominently on your website and marketing materials.",
  ],
  "pricing": [
    "Conduct a pricing audit against competitors to find positioning gaps and opportunities.",
    "Improve pricing page transparency and communicate your value proposition more clearly.",
    "Consider tiered pricing or bundling strategies to capture additional market segments.",
  ],
  "product-range": [
    "Survey existing customers to identify unmet needs and gaps in your current offerings.",
    "Evaluate adjacent market opportunities that leverage your existing capabilities.",
    "Consider partnerships or white-label arrangements to extend your service range efficiently.",
  ],
  "innovation": [
    "Allocate dedicated time and budget for testing new approaches and emerging technologies.",
    "Monitor competitor launches and industry trends systematically to spot opportunities early.",
    "Build a structured feedback loop between customers and your product development process.",
  ],
  "customer-support": [
    "Audit your support response times and set measurable targets for improvement.",
    "Add support channels your customers prefer, such as live chat or self-service knowledge bases.",
    "Create comprehensive documentation to help customers solve common issues independently.",
  ],
};

const SERIES_STYLES = [
  { stroke: "#000", strokeWidth: 2.5, dash: "", fillOpacity: 0.12 },
  { stroke: "#000", strokeWidth: 1.8, dash: "8,4", fillOpacity: 0.06 },
  { stroke: "#000", strokeWidth: 1.8, dash: "3,3", fillOpacity: 0.04 },
  { stroke: "#000", strokeWidth: 1.8, dash: "12,3,3,3", fillOpacity: 0.03 },
  { stroke: "#000", strokeWidth: 1.8, dash: "2,6", fillOpacity: 0.02 },
];

const HOW_TO_STEPS = [
  {
    title: "Enter Your Company and Competitors",
    description:
      "Add your company name and up to four competitors. Focus on direct competitors that target the same audience or market segment.",
  },
  {
    title: "Rate Each Company Honestly",
    description:
      "Score every company from 1 to 5 across all ten dimensions. Base ratings on observable evidence, not assumptions. Overrating yourself defeats the purpose.",
  },
  {
    title: "Review the Radar Chart and Leaderboard",
    description:
      "The spider chart reveals shape differences at a glance. The leaderboard shows overall positioning. Look for patterns, not just individual scores.",
  },
  {
    title: "Act on Gaps and Opportunities",
    description:
      "Focus on closing your biggest competitive gaps first. Market gaps where everyone scores low represent differentiation opportunities worth exploring.",
  },
];

/* ------------------------------------------------------------------ */
/*  Radar chart geometry                                               */
/* ------------------------------------------------------------------ */

const RADAR_CX = 200;
const RADAR_CY = 200;
const RADAR_R = 140;
const LABEL_R = RADAR_R + 28;
const DIM_COUNT = DIMENSIONS.length;

function polarToXY(angleDeg: number, radius: number): [number, number] {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return [RADAR_CX + radius * Math.cos(rad), RADAR_CY + radius * Math.sin(rad)];
}

function axisAngle(index: number): number {
  return (360 / DIM_COUNT) * index;
}

function scoresToPolygonPoints(scores: number[]): string {
  return scores
    .map((s, i) => {
      const r = (Math.max(s, 0) / 5) * RADAR_R;
      const [x, y] = polarToXY(axisAngle(i), r);
      return `${x},${y}`;
    })
    .join(" ");
}

function gridPolygonPoints(level: number): string {
  const r = (level / 5) * RADAR_R;
  return Array.from({ length: DIM_COUNT }, (_, i) => {
    const [x, y] = polarToXY(axisAngle(i), r);
    return `${x},${y}`;
  }).join(" ");
}

function labelAnchor(index: number): "middle" | "start" | "end" {
  const angle = axisAngle(index);
  if (angle < 10 || angle > 350) return "middle";
  if (Math.abs(angle - 180) < 10) return "middle";
  if (angle > 0 && angle < 180) return "start";
  return "end";
}

function labelDY(index: number): string {
  const angle = axisAngle(index);
  if (angle < 10 || angle > 350) return "-0.5em";
  if (Math.abs(angle - 180) < 10) return "1.2em";
  return "0.35em";
}

/* ------------------------------------------------------------------ */
/*  Analysis functions                                                 */
/* ------------------------------------------------------------------ */

function computeThreats(yourScores: number[], competitors: CompanyData[]): ThreatItem[] {
  const threats: ThreatItem[] = [];
  for (let d = 0; d < DIM_COUNT; d++) {
    let bestName = "";
    let bestScore = 0;
    for (const comp of competitors) {
      if (comp.scores[d] > bestScore) {
        bestScore = comp.scores[d];
        bestName = comp.name;
      }
    }
    const gap = bestScore - yourScores[d];
    if (gap > 0) {
      threats.push({
        dimensionIndex: d,
        dimensionLabel: DIMENSIONS[d].label,
        yourScore: yourScores[d],
        bestCompetitorName: bestName,
        bestCompetitorScore: bestScore,
        gap,
      });
    }
  }
  return threats.sort((a, b) => b.gap - a.gap);
}

function computeMarketGaps(yourScores: number[], competitors: CompanyData[]): MarketGap[] {
  const gaps: MarketGap[] = [];
  for (let d = 0; d < DIM_COUNT; d++) {
    const compScores = competitors.map((c) => c.scores[d]);
    const compAvg = compScores.reduce((a, b) => a + b, 0) / compScores.length;
    const allScores = [yourScores[d], ...compScores];
    const avgAll = allScores.reduce((a, b) => a + b, 0) / allScores.length;
    if (avgAll <= 3 && yourScores[d] <= 3) {
      gaps.push({
        dimensionIndex: d,
        dimensionLabel: DIMENSIONS[d].label,
        yourScore: yourScores[d],
        avgCompetitorScore: Math.round(compAvg * 10) / 10,
        avgAllScore: Math.round(avgAll * 10) / 10,
      });
    }
  }
  return gaps.sort((a, b) => a.avgAllScore - b.avgAllScore);
}

function computeGapsPerCompetitor(yourScores: number[], competitors: CompanyData[]): CompetitorGaps[] {
  return competitors.map((comp) => {
    const ahead: GapDetail[] = [];
    const behind: GapDetail[] = [];
    for (let d = 0; d < DIM_COUNT; d++) {
      const gap = comp.scores[d] - yourScores[d];
      const detail: GapDetail = {
        dimensionIndex: d,
        dimensionLabel: DIMENSIONS[d].label,
        yourScore: yourScores[d],
        competitorName: comp.name,
        competitorScore: comp.scores[d],
        gap,
      };
      if (gap > 0) behind.push(detail);
      else if (gap < 0) ahead.push(detail);
    }
    return {
      competitorName: comp.name,
      ahead: ahead.sort((a, b) => a.gap - b.gap),
      behind: behind.sort((a, b) => b.gap - a.gap),
    };
  });
}

function buildLeaderboard(yourCompany: CompanyData, competitors: CompanyData[]) {
  const all = [
    { name: yourCompany.name, total: yourCompany.scores.reduce((a, b) => a + b, 0), isYou: true },
    ...competitors.map((c) => ({
      name: c.name,
      total: c.scores.reduce((a, b) => a + b, 0),
      isYou: false,
    })),
  ];
  return all.sort((a, b) => b.total - a.total);
}

/* ------------------------------------------------------------------ */
/*  Format as plain text                                               */
/* ------------------------------------------------------------------ */

function formatAnalysisText(results: AnalysisResults): string {
  const lines: string[] = [];
  const { yourCompany, competitors, threats, marketGaps, gapsPerCompetitor, leaderboard } = results;

  lines.push("COMPETITOR ANALYSIS MATRIX");
  lines.push("=".repeat(50));
  lines.push("");

  lines.push("LEADERBOARD");
  lines.push("-".repeat(30));
  leaderboard.forEach((c, i) => {
    const tag = c.isYou ? " (You)" : "";
    lines.push(`  ${i + 1}. ${c.name}${tag}: ${c.total}/50`);
  });
  lines.push("");

  lines.push("SCORES BY DIMENSION");
  lines.push("-".repeat(30));
  const allCompanies = [yourCompany, ...competitors];
  for (let d = 0; d < DIM_COUNT; d++) {
    const dim = DIMENSIONS[d];
    const scores = allCompanies.map((c) => `${c.name}: ${c.scores[d]}`).join(" | ");
    lines.push(`${dim.label}: ${scores}`);
  }
  lines.push("");

  lines.push("GAP ANALYSIS");
  lines.push("-".repeat(30));
  for (const g of gapsPerCompetitor) {
    lines.push(`\nVs ${g.competitorName}:`);
    if (g.ahead.length > 0) {
      lines.push("  You lead in:");
      g.ahead.forEach((item) => lines.push(`    ${item.dimensionLabel}: +${Math.abs(item.gap)}`));
    }
    if (g.behind.length > 0) {
      lines.push("  You trail in:");
      g.behind.forEach((item) => lines.push(`    ${item.dimensionLabel}: -${item.gap}`));
    }
    if (g.ahead.length === 0 && g.behind.length === 0) {
      lines.push("  Tied across all dimensions.");
    }
  }
  lines.push("");

  if (marketGaps.length > 0) {
    lines.push("STRATEGIC OPPORTUNITIES (MARKET GAPS)");
    lines.push("-".repeat(30));
    marketGaps.slice(0, 3).forEach((g, i) => {
      lines.push(`  ${i + 1}. ${g.dimensionLabel} (avg score across all: ${g.avgAllScore.toFixed(1)})`);
      lines.push(`     Your score: ${g.yourScore} | Competitor avg: ${g.avgCompetitorScore}`);
      const recs = ACTION_RECOMMENDATIONS[DIMENSIONS[g.dimensionIndex].id] || [];
      if (recs.length > 0) lines.push(`     Action: ${recs[0]}`);
    });
    lines.push("");
  }

  if (threats.length > 0) {
    lines.push("COMPETITIVE THREATS");
    lines.push("-".repeat(30));
    threats.slice(0, 3).forEach((t, i) => {
      lines.push(
        `  ${i + 1}. ${t.dimensionLabel}: ${t.bestCompetitorName} leads by ${t.gap} point${t.gap > 1 ? "s" : ""}`
      );
      lines.push(`     Your score: ${t.yourScore} | ${t.bestCompetitorName}: ${t.bestCompetitorScore}`);
    });
    lines.push("");
  }

  const weakDims = DIMENSIONS.map((dim, i) => ({
    index: i,
    label: dim.label,
    id: dim.id,
    score: yourCompany.scores[i],
  }))
    .filter((d) => d.score > 0 && d.score <= 2)
    .sort((a, b) => a.score - b.score);

  if (weakDims.length > 0) {
    lines.push("RECOMMENDED ACTIONS FOR WEAK AREAS");
    lines.push("-".repeat(30));
    for (const d of weakDims) {
      lines.push(`\n${d.label} (Score: ${d.score}/5):`);
      const recs = ACTION_RECOMMENDATIONS[d.id] || [];
      recs.forEach((r, i) => lines.push(`  ${i + 1}. ${r}`));
    }
    lines.push("");
  }

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function RadarChart({
  companies,
}: {
  companies: CompanyData[];
}) {
  return (
    <div className="w-full max-w-lg mx-auto">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-auto"
        role="img"
        aria-label={`Radar chart comparing ${companies.map((c) => c.name).join(", ")} across ${DIM_COUNT} dimensions`}
      >
        {/* Grid rings */}
        {[1, 2, 3, 4, 5].map((level) => (
          <polygon
            key={level}
            points={gridPolygonPoints(level)}
            fill="none"
            stroke="#e5e5e5"
            strokeWidth={level === 5 ? 1.5 : 0.75}
          />
        ))}

        {/* Axis lines */}
        {DIMENSIONS.map((_, i) => {
          const [x, y] = polarToXY(axisAngle(i), RADAR_R);
          return (
            <line
              key={i}
              x1={RADAR_CX}
              y1={RADAR_CY}
              x2={x}
              y2={y}
              stroke="#e5e5e5"
              strokeWidth={0.75}
            />
          );
        })}

        {/* Scale labels on first axis */}
        {[1, 2, 3, 4, 5].map((level) => {
          const [x, y] = polarToXY(0, (level / 5) * RADAR_R);
          return (
            <text
              key={level}
              x={x + 4}
              y={y}
              className="text-[14px] fill-gray-400"
              textAnchor="start"
              dominantBaseline="middle"
            >
              {level}
            </text>
          );
        })}

        {/* Data polygons */}
        {companies.map((company, ci) => {
          const style = SERIES_STYLES[ci] || SERIES_STYLES[0];
          const points = scoresToPolygonPoints(company.scores);
          return (
            <g key={ci}>
              <polygon
                points={points}
                fill="#000"
                fillOpacity={style.fillOpacity}
                stroke={style.stroke}
                strokeWidth={style.strokeWidth}
                strokeDasharray={style.dash || undefined}
                strokeLinejoin="round"
              />
            </g>
          );
        })}

        {/* Axis labels */}
        {DIMENSIONS.map((dim, i) => {
          const [x, y] = polarToXY(axisAngle(i), LABEL_R);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor={labelAnchor(i)}
              dy={labelDY(i)}
              className="text-[14px] fill-black font-bold"
            >
              {dim.short}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mt-4">
        {companies.map((company, ci) => {
          const style = SERIES_STYLES[ci] || SERIES_STYLES[0];
          return (
            <div key={ci} className="flex items-center gap-2">
              <svg width="24" height="12" aria-hidden="true">
                <line
                  x1="0"
                  y1="6"
                  x2="24"
                  y2="6"
                  stroke={style.stroke}
                  strokeWidth={style.strokeWidth}
                  strokeDasharray={style.dash || undefined}
                />
              </svg>
              <span className="text-base text-black font-bold">
                {company.name}
                {ci === 0 ? " (You)" : ""}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Leaderboard({
  entries,
}: {
  entries: { name: string; total: number; isYou: boolean }[];
}) {
  return (
    <div className="space-y-3">
      {entries.map((entry, i) => {
        const pct = (entry.total / 50) * 100;
        return (
          <div key={i} className="flex items-center gap-4">
            <span className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,2vw,1.5rem)] font-extrabold text-gray-300 min-w-[32px]">
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between mb-1">
                <span className={`text-base font-bold truncate ${entry.isYou ? "text-black" : "text-gray-600"}`}>
                  {entry.name}
                  {entry.isYou ? " (You)" : ""}
                </span>
                <span className="text-base font-bold text-black ml-3 flex-shrink-0">
                  {entry.total}/50
                </span>
              </div>
              <div className="w-full bg-gray-100 h-4">
                <div
                  className={`h-4 transition-all duration-500 motion-reduce:transition-none ${entry.isYou ? "bg-black" : "bg-gray-400"}`}
                  style={{ width: `${pct}%` }}
                  role="presentation"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function GapAnalysisSection({ gapsPerCompetitor }: { gapsPerCompetitor: CompetitorGaps[] }) {
  return (
    <div className="space-y-8">
      {gapsPerCompetitor.map((g) => (
        <div key={g.competitorName} className="border border-gray-200">
          <div className="bg-black text-white px-6 py-4">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
              Vs {g.competitorName}
            </h3>
          </div>
          <div className="p-6">
            {g.ahead.length === 0 && g.behind.length === 0 && (
              <p className="text-base text-gray-500">Tied across all dimensions.</p>
            )}

            {g.ahead.length > 0 && (
              <div className="mb-6">
                <h4 className="text-base font-bold text-black mb-3">Where You Lead</h4>
                <div className="space-y-2">
                  {g.ahead.map((item) => (
                    <div
                      key={item.dimensionIndex}
                      className="flex justify-between items-center border-b border-gray-100 pb-2"
                    >
                      <span className="text-base text-gray-700">{item.dimensionLabel}</span>
                      <span className="text-base font-bold text-black">
                        +{Math.abs(item.gap)} ahead
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {g.behind.length > 0 && (
              <div>
                <h4 className="text-base font-bold text-black mb-3">Where You Trail</h4>
                <div className="space-y-2">
                  {g.behind.map((item) => (
                    <div
                      key={item.dimensionIndex}
                      className="flex justify-between items-center border-b border-gray-100 pb-2"
                    >
                      <span className="text-base text-gray-700">{item.dimensionLabel}</span>
                      <span className="text-base font-bold text-black">
                        -{item.gap} behind
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function StrategicOpportunities({ marketGaps }: { marketGaps: MarketGap[] }) {
  const top = marketGaps.slice(0, 3);
  if (top.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
        Strategic Opportunities
      </h2>
      <p className="text-base text-gray-500">
        These dimensions have low scores across the board. Investing here could differentiate you in
        a space where no one is strong yet.
      </p>
      {top.map((gap, rank) => {
        const dimId = DIMENSIONS[gap.dimensionIndex].id;
        const recs = ACTION_RECOMMENDATIONS[dimId] || [];
        return (
          <Animate key={gap.dimensionIndex} animation="fade-up">
            <div className="border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                  Opportunity #{rank + 1}: {gap.dimensionLabel}
                </h3>
              </div>
              <p className="text-base text-gray-500 mb-4">
                Average score across all companies: {gap.avgAllScore.toFixed(1)}/5. Your score:{" "}
                {gap.yourScore}/5. Competitor average: {gap.avgCompetitorScore}/5.
              </p>
              {recs.length > 0 && (
                <ul className="space-y-2">
                  {recs.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3 text-base text-gray-700">
                      <span className="font-bold text-black min-w-[24px]">{i + 1}.</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Animate>
        );
      })}
    </div>
  );
}

function CompetitiveThreats({ threats }: { threats: ThreatItem[] }) {
  const top = threats.slice(0, 3);
  if (top.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
        Competitive Threats
      </h2>
      <p className="text-base text-gray-500">
        These are the dimensions where a competitor most outpaces you. Closing these gaps should be a
        priority.
      </p>
      {top.map((threat, rank) => {
        const dimId = DIMENSIONS[threat.dimensionIndex].id;
        const recs = ACTION_RECOMMENDATIONS[dimId] || [];
        return (
          <Animate key={threat.dimensionIndex} animation="fade-up">
            <div className="border border-gray-200">
              <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                  Threat #{rank + 1}: {threat.dimensionLabel}
                </h3>
                <span className="text-base text-gray-400">
                  Gap: {threat.gap} point{threat.gap > 1 ? "s" : ""}
                </span>
              </div>
              <div className="p-6">
                <p className="text-base text-gray-500 mb-4">
                  You scored {threat.yourScore}/5 while {threat.bestCompetitorName} scored{" "}
                  {threat.bestCompetitorScore}/5. Here is how to close this gap:
                </p>
                <ul className="space-y-2">
                  {recs.map((rec, i) => (
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

function WeakAreaActions({ yourScores }: { yourScores: number[] }) {
  const weakDims = DIMENSIONS.map((dim, i) => ({
    index: i,
    label: dim.label,
    id: dim.id,
    score: yourScores[i],
  }))
    .filter((d) => d.score > 0 && d.score <= 2)
    .sort((a, b) => a.score - b.score);

  if (weakDims.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
        Recommended Actions for Weak Areas
      </h2>
      <p className="text-base text-gray-500">
        These are dimensions where you scored 2 or below. Each has specific actions you can take to
        improve.
      </p>
      {weakDims.map((d) => {
        const recs = ACTION_RECOMMENDATIONS[d.id] || [];
        return (
          <Animate key={d.index} animation="fade-up">
            <div className="border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                  {d.label}
                </h3>
                <span className="text-base font-bold text-gray-500">Score: {d.score}/5</span>
              </div>
              <ul className="space-y-2">
                {recs.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-gray-700">
                    <span className="font-bold text-black min-w-[24px]">{i + 1}.</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
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
      aria-label="Download analysis as text file"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      Download as Text
    </button>
  );
}

function ScoreCard({
  company,
  index,
  isYou,
  onNameChange,
  onScoreChange,
  onRemove,
  canRemove,
}: {
  company: CompanyData;
  index: number;
  isYou: boolean;
  onNameChange: (name: string) => void;
  onScoreChange: (dimIndex: number, value: number) => void;
  onRemove?: () => void;
  canRemove: boolean;
}) {
  return (
    <div className="border border-gray-200">
      <div className={`px-6 py-4 flex items-center justify-between ${isYou ? "bg-black text-white" : "bg-gray-100 text-black"}`}>
        <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
          {isYou ? "Your Company" : `Competitor ${index}`}
        </h2>
        {!isYou && canRemove && (
          <button
            onClick={onRemove}
            aria-label={`Remove competitor ${index}`}
            className={`min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 ${
              isYou
                ? "text-gray-400 hover:text-white focus-visible:outline-white"
                : "text-gray-400 hover:text-black focus-visible:outline-black"
            }`}
          >
            Remove
          </button>
        )}
      </div>
      <div className="p-6 space-y-5">
        {/* Company name */}
        <div>
          <label
            htmlFor={isYou ? "your-company-name" : `competitor-${index}-name`}
            className="block text-base font-bold text-black mb-2"
          >
            Company Name
          </label>
          <input
            id={isYou ? "your-company-name" : `competitor-${index}-name`}
            type="text"
            value={company.name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder={isYou ? "e.g. Your Company" : `e.g. Competitor ${index}`}
            className="w-full px-4 py-3 border border-gray-200 text-base text-black min-h-[44px] focus-visible:border-black focus-visible:outline-none"
          />
        </div>

        {/* Dimension scores */}
        <div className="space-y-4">
          {DIMENSIONS.map((dim, di) => (
            <div key={dim.id}>
              <label
                htmlFor={`${isYou ? "you" : `comp-${index}`}-${dim.id}`}
                className="block text-base font-bold text-black mb-1"
              >
                {dim.label}
              </label>
              <p className="text-base text-gray-500 mb-2">{dim.description}</p>
              <select
                id={`${isYou ? "you" : `comp-${index}`}-${dim.id}`}
                value={company.scores[di]}
                onChange={(e) => onScoreChange(di, Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-200 text-base bg-white text-black min-h-[44px] appearance-none focus-visible:border-black focus-visible:outline-none"
              >
                <option value={0}>Select a rating...</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} &mdash; {SCALE_LABELS[n]}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

function createEmptyCompany(): CompanyData {
  return { name: "", scores: new Array(DIM_COUNT).fill(0) };
}

export default function CompetitorMatrixPage() {
  const [yourCompany, setYourCompany] = useState<CompanyData>(createEmptyCompany());
  const [competitors, setCompetitors] = useState<CompanyData[]>([createEmptyCompany()]);
  const [results, setResults] = useState<AnalysisResults | null>(null);

  /* ---- State updaters ---- */

  function updateYourName(name: string) {
    setYourCompany((prev) => ({ ...prev, name }));
  }

  function updateYourScore(dimIndex: number, value: number) {
    setYourCompany((prev) => {
      const scores = [...prev.scores];
      scores[dimIndex] = value;
      return { ...prev, scores };
    });
  }

  function updateCompetitorName(compIndex: number, name: string) {
    setCompetitors((prev) => {
      const next = [...prev];
      next[compIndex] = { ...next[compIndex], name };
      return next;
    });
  }

  function updateCompetitorScore(compIndex: number, dimIndex: number, value: number) {
    setCompetitors((prev) => {
      const next = [...prev];
      const scores = [...next[compIndex].scores];
      scores[dimIndex] = value;
      next[compIndex] = { ...next[compIndex], scores };
      return next;
    });
  }

  function addCompetitor() {
    if (competitors.length < 4) {
      setCompetitors((prev) => [...prev, createEmptyCompany()]);
    }
  }

  function removeCompetitor(index: number) {
    if (competitors.length > 1) {
      setCompetitors((prev) => prev.filter((_, i) => i !== index));
    }
  }

  /* ---- Validation ---- */

  function isCompanyComplete(company: CompanyData): boolean {
    return company.name.trim().length > 0 && company.scores.every((s) => s > 0);
  }

  const allComplete = isCompanyComplete(yourCompany) && competitors.every(isCompanyComplete);

  /* ---- Generate / Reset ---- */

  function handleGenerate() {
    if (!allComplete) return;
    const threats = computeThreats(yourCompany.scores, competitors);
    const marketGaps = computeMarketGaps(yourCompany.scores, competitors);
    const gapsPerCompetitor = computeGapsPerCompetitor(yourCompany.scores, competitors);
    const leaderboard = buildLeaderboard(yourCompany, competitors);
    setResults({
      yourCompany: { ...yourCompany, scores: [...yourCompany.scores] },
      competitors: competitors.map((c) => ({ ...c, scores: [...c.scores] })),
      threats,
      marketGaps,
      gapsPerCompetitor,
      leaderboard,
    });
  }

  function handleReset() {
    setYourCompany(createEmptyCompany());
    setCompetitors([createEmptyCompany()]);
    setResults(null);
  }

  const plainText = results ? formatAnalysisText(results) : "";
  const filename = results
    ? `${results.yourCompany.name.toLowerCase().replace(/\s+/g, "-")}-competitor-matrix.txt`
    : "competitor-matrix.txt";

  const hasAnyInput =
    yourCompany.name.trim().length > 0 ||
    yourCompany.scores.some((s) => s > 0) ||
    competitors.some((c) => c.name.trim().length > 0 || c.scores.some((s) => s > 0));

  return (
    <article className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Competitor Analysis Matrix",
          description:
            "Free competitor analysis matrix tool. Rate your company and up to 4 competitors across 10 dimensions to generate a radar chart, leaderboard, gap analysis, and strategic recommendations.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Competitor Analysis Matrix" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Competitor Analysis Matrix
            </h1>
            <SectionDesc>
              Rate your company and up to four competitors across ten key dimensions. Get a radar
              chart comparison, ranked leaderboard, gap analysis, and strategic recommendations you
              can act on.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Scoring Form ---- */}
      <section className="px-6 lg:px-12 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Your company */}
          <Animate animation="fade-up">
            <ScoreCard
              company={yourCompany}
              index={0}
              isYou
              onNameChange={updateYourName}
              onScoreChange={updateYourScore}
              canRemove={false}
            />
          </Animate>

          {/* Competitors */}
          {competitors.map((comp, ci) => (
            <Animate key={ci} animation="fade-up" delay={ci * 60}>
              <ScoreCard
                company={comp}
                index={ci + 1}
                isYou={false}
                onNameChange={(name) => updateCompetitorName(ci, name)}
                onScoreChange={(di, val) => updateCompetitorScore(ci, di, val)}
                onRemove={() => removeCompetitor(ci)}
                canRemove={competitors.length > 1}
              />
            </Animate>
          ))}

          {/* Add competitor button */}
          {competitors.length < 4 && (
            <Animate animation="fade-up">
              <button
                onClick={addCompetitor}
                className="w-full border border-dashed border-gray-300 px-6 py-5 min-h-[44px] text-base font-bold text-gray-500 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                + Add Competitor ({competitors.length}/4)
              </button>
            </Animate>
          )}

          {/* Generate / Reset */}
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleGenerate}
                disabled={!allComplete}
                className="bg-black text-white px-8 py-4 min-h-[44px] text-base font-bold hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Generate Analysis
              </button>
              {hasAnyInput && (
                <button
                  onClick={handleReset}
                  className="px-8 py-4 min-h-[44px] text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Reset
                </button>
              )}
              {!allComplete && (
                <p className="text-base text-gray-400 self-center">
                  Enter all company names and rate every dimension to generate the analysis.
                </p>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Results ---- */}
      {results && (
        <section className="px-6 lg:px-12 pb-16">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Radar chart */}
            <Animate animation="fade-up">
              <div className="border border-gray-200 p-6">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                  Radar Comparison
                </h2>
                <RadarChart companies={[results.yourCompany, ...results.competitors]} />
              </div>
            </Animate>

            {/* Leaderboard */}
            <Animate animation="fade-up">
              <div className="border border-gray-200 p-6">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                  Leaderboard
                </h2>
                <Leaderboard entries={results.leaderboard} />
              </div>
            </Animate>

            {/* Gap analysis per competitor */}
            <Animate animation="fade-up">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                  Gap Analysis
                </h2>
                <GapAnalysisSection gapsPerCompetitor={results.gapsPerCompetitor} />
              </div>
            </Animate>

            {/* Strategic opportunities */}
            <StrategicOpportunities marketGaps={results.marketGaps} />

            {/* Competitive threats */}
            <CompetitiveThreats threats={results.threats} />

            {/* Weak area actions */}
            <WeakAreaActions yourScores={results.yourCompany.scores} />

            {/* Export actions */}
            <div className="flex flex-wrap gap-3">
              <CopyButton text={plainText} />
              <DownloadButton text={plainText} filename={filename} />
            </div>
          </div>
        </section>
      )}

      {/* ---- How to Use ---- */}
      <section className="px-6 lg:px-12 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-8">
              How to Use This Tool
            </h2>
          </Animate>
          <Stagger stagger={100} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {HOW_TO_STEPS.map((step, i) => (
              <div key={i} className="border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <span className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-gray-300">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                      {step.title}
                    </h3>
                    <p className="text-base text-gray-500 leading-relaxed">{step.description}</p>
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
              Get a Professional Competitive Analysis
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              This self-assessment is a starting point. Our team uses real data, proprietary tools,
              and industry benchmarks to build competitive analyses that drive strategic decisions.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Talk to Our Team &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
