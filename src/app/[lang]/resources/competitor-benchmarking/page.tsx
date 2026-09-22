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

interface DimensionScores {
  onlinePresence: number;
  productService: number;
  marketing: number;
  customerExperience: number;
  technology: number;
  marketPosition: number;
}

interface Company {
  name: string;
  scores: DimensionScores;
}

type DimensionKey = keyof DimensionScores;

const STORAGE_KEY = "markit-competitor-benchmarking";

const dimensions: {
  key: DimensionKey;
  label: string;
  shortLabel: string;
  criteria: string[];
}[] = [
  {
    key: "onlinePresence",
    label: "Online Presence",
    shortLabel: "Online",
    criteria: [
      "Website quality",
      "SEO visibility",
      "Social media following",
      "Content quality",
      "Mobile experience",
    ],
  },
  {
    key: "productService",
    label: "Product/Service",
    shortLabel: "Product",
    criteria: [
      "Quality",
      "Pricing",
      "Range",
      "Innovation",
      "Customer satisfaction",
    ],
  },
  {
    key: "marketing",
    label: "Marketing",
    shortLabel: "Marketing",
    criteria: [
      "Brand awareness",
      "Advertising effectiveness",
      "Content marketing",
      "Email marketing",
      "Social engagement",
    ],
  },
  {
    key: "customerExperience",
    label: "Customer Experience",
    shortLabel: "CX",
    criteria: [
      "Support quality",
      "Response time",
      "Reviews/ratings",
      "Loyalty programs",
      "Onboarding",
    ],
  },
  {
    key: "technology",
    label: "Technology",
    shortLabel: "Tech",
    criteria: [
      "Tech stack",
      "Automation",
      "Analytics maturity",
      "Personalization",
      "Mobile apps",
    ],
  },
  {
    key: "marketPosition",
    label: "Market Position",
    shortLabel: "Position",
    criteria: [
      "Market share perception",
      "Growth trajectory",
      "Partnerships",
      "Geographic reach",
      "Industry reputation",
    ],
  },
];

const emptyScores: DimensionScores = {
  onlinePresence: 5,
  productService: 5,
  marketing: 5,
  customerExperience: 5,
  technology: 5,
  marketPosition: 5,
};

function createCompany(name: string): Company {
  return { name, scores: { ...emptyScores } };
}

const howToSteps = [
  {
    title: "Name Your Companies",
    description:
      "Enter your company name and add up to four competitors you want to benchmark against. Focus on direct competitors in your market.",
  },
  {
    title: "Rate Each Dimension",
    description:
      "Score every company from 1 to 10 across six key dimensions. Be honest about your own scores and research competitors thoroughly for accuracy.",
  },
  {
    title: "Analyze the Results",
    description:
      "Review the radar chart, scorecard, and gap analysis to see where you lead and lag. The tool automatically identifies your competitive advantages and improvement priorities.",
  },
  {
    title: "Act on Priorities",
    description:
      "Focus on the improvement priorities list, which ranks your biggest gaps first. These are the areas where investment will produce the greatest competitive gains.",
  },
];

/* ------------------------------------------------------------------ */
/*  Analysis helpers                                                   */
/* ------------------------------------------------------------------ */

function totalScore(company: Company): number {
  return dimensions.reduce((sum, d) => sum + company.scores[d.key], 0);
}

function avgCompetitorScore(
  competitors: Company[],
  dim: DimensionKey
): number {
  if (competitors.length === 0) return 0;
  const sum = competitors.reduce((s, c) => s + c.scores[dim], 0);
  return sum / competitors.length;
}

interface GapItem {
  dimension: string;
  dimensionKey: DimensionKey;
  yourScore: number;
  competitorAvg: number;
  gap: number;
}

function computeGaps(yours: Company, competitors: Company[]): GapItem[] {
  return dimensions.map((d) => {
    const compAvg = avgCompetitorScore(competitors, d.key);
    return {
      dimension: d.label,
      dimensionKey: d.key,
      yourScore: yours.scores[d.key],
      competitorAvg: compAvg,
      gap: yours.scores[d.key] - compAvg,
    };
  });
}

interface Advantage {
  dimension: string;
  yourScore: number;
  bestCompetitor: string;
  bestCompetitorScore: number;
  lead: number;
}

function findAdvantages(
  yours: Company,
  competitors: Company[]
): Advantage[] {
  const advantages: Advantage[] = [];
  for (const d of dimensions) {
    let highest = 0;
    let highestName = "";
    for (const c of competitors) {
      if (c.scores[d.key] > highest) {
        highest = c.scores[d.key];
        highestName = c.name || "Competitor";
      }
    }
    if (yours.scores[d.key] > highest) {
      advantages.push({
        dimension: d.label,
        yourScore: yours.scores[d.key],
        bestCompetitor: highestName,
        bestCompetitorScore: highest,
        lead: yours.scores[d.key] - highest,
      });
    }
  }
  return advantages;
}

interface Priority {
  dimension: string;
  yourScore: number;
  competitorAvg: number;
  gap: number;
}

function findPriorities(
  yours: Company,
  competitors: Company[]
): Priority[] {
  return computeGaps(yours, competitors)
    .filter((g) => g.gap < 0)
    .sort((a, b) => a.gap - b.gap)
    .map((g) => ({
      dimension: g.dimension,
      yourScore: g.yourScore,
      competitorAvg: g.competitorAvg,
      gap: g.gap,
    }));
}

function formatExportText(
  yours: Company,
  competitors: Company[],
  gaps: GapItem[],
  advantages: Advantage[],
  priorities: Priority[]
): string {
  const lines: string[] = [];
  const all = [yours, ...competitors];

  lines.push("COMPETITOR BENCHMARKING DASHBOARD");
  lines.push("=".repeat(50));
  lines.push("");

  /* Scorecard */
  lines.push("SCORECARD");
  lines.push("-".repeat(50));
  const header = ["Dimension", ...all.map((c, i) => (i === 0 ? `${c.name || "You"} (You)` : c.name || `Comp ${i}`))];
  lines.push(header.join(" | "));
  for (const d of dimensions) {
    const row = [d.label.padEnd(20), ...all.map((c) => String(c.scores[d.key]).padStart(3))];
    lines.push(row.join(" | "));
  }
  lines.push("-".repeat(50));
  const totals = ["TOTAL".padEnd(20), ...all.map((c) => String(totalScore(c)).padStart(3))];
  lines.push(totals.join(" | "));
  lines.push("");

  /* Gap analysis */
  lines.push("GAP ANALYSIS (Your Score vs Competitor Average)");
  lines.push("-".repeat(50));
  for (const g of gaps) {
    const sign = g.gap >= 0 ? "+" : "";
    lines.push(`  ${g.dimension}: ${g.yourScore} vs ${g.competitorAvg.toFixed(1)} avg (${sign}${g.gap.toFixed(1)})`);
  }
  lines.push("");

  /* Advantages */
  if (advantages.length > 0) {
    lines.push("COMPETITIVE ADVANTAGES");
    lines.push("-".repeat(50));
    for (const a of advantages) {
      lines.push(`  ${a.dimension}: You score ${a.yourScore} vs best competitor (${a.bestCompetitor}) at ${a.bestCompetitorScore} (+${a.lead})`);
    }
    lines.push("");
  }

  /* Priorities */
  if (priorities.length > 0) {
    lines.push("IMPROVEMENT PRIORITIES (biggest gaps first)");
    lines.push("-".repeat(50));
    for (let i = 0; i < priorities.length; i++) {
      const p = priorities[i];
      lines.push(`  ${i + 1}. ${p.dimension}: You score ${p.yourScore} vs ${p.competitorAvg.toFixed(1)} avg (gap: ${p.gap.toFixed(1)})`);
    }
    lines.push("");
  }

  lines.push(`Generated on ${new Date().toLocaleDateString()}`);
  lines.push("Markit Media - Competitor Benchmarking Dashboard");

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Radar / Spider Chart                                               */
/* ------------------------------------------------------------------ */

const CHART_SIZE = 320;
const CENTER = CHART_SIZE / 2;
const RADIUS = 130;
const RINGS = 5;

/* Company stroke patterns: solid for yours, dashed variations for competitors */
const companyStyles: { stroke: string; dasharray: string }[] = [
  { stroke: "#000", dasharray: "none" },
  { stroke: "#737373", dasharray: "8,4" },
  { stroke: "#a3a3a3", dasharray: "4,4" },
  { stroke: "#525252", dasharray: "12,3,3,3" },
  { stroke: "#d4d4d4", dasharray: "2,4" },
];

function polarToCartesian(
  angle: number,
  radius: number
): { x: number; y: number } {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function RadarChart({ companies }: { companies: Company[] }) {
  const angleStep = 360 / dimensions.length;

  /* axis endpoints */
  const axisPoints = dimensions.map((_, i) =>
    polarToCartesian(i * angleStep, RADIUS)
  );

  /* ring polygons */
  const ringPolygons = Array.from({ length: RINGS }, (_, ringIndex) => {
    const ringRadius = (RADIUS / RINGS) * (ringIndex + 1);
    const points = dimensions
      .map((_, i) => {
        const p = polarToCartesian(i * angleStep, ringRadius);
        return `${p.x},${p.y}`;
      })
      .join(" ");
    return points;
  });

  /* company polygons */
  const companyPolygons = companies.map((company) => {
    const points = dimensions
      .map((d, i) => {
        const value = company.scores[d.key];
        const r = (value / 10) * RADIUS;
        const p = polarToCartesian(i * angleStep, r);
        return `${p.x},${p.y}`;
      })
      .join(" ");
    return points;
  });

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[320px] mx-auto" style={{ maxWidth: CHART_SIZE + 60 }}>
        <svg
          viewBox={`-30 -10 ${CHART_SIZE + 60} ${CHART_SIZE + 40}`}
          className="w-full h-auto"
          role="img"
          aria-label="Radar chart comparing companies across six dimensions"
        >
          {/* Grid rings */}
          {ringPolygons.map((points, i) => (
            <polygon
              key={`ring-${i}`}
              points={points}
              fill="none"
              stroke="#e5e5e5"
              strokeWidth="1"
            />
          ))}

          {/* Axis lines */}
          {axisPoints.map((point, i) => (
            <line
              key={`axis-${i}`}
              x1={CENTER}
              y1={CENTER}
              x2={point.x}
              y2={point.y}
              stroke="#e5e5e5"
              strokeWidth="1"
            />
          ))}

          {/* Company data polygons */}
          {companyPolygons.map((points, i) => (
            <polygon
              key={`data-${i}`}
              points={points}
              fill={i === 0 ? "rgba(0,0,0,0.06)" : "none"}
              stroke={companyStyles[i]?.stroke ?? "#999"}
              strokeWidth={i === 0 ? "2.5" : "1.5"}
              strokeDasharray={companyStyles[i]?.dasharray ?? "none"}
              strokeLinejoin="round"
            />
          ))}

          {/* Data points for your company */}
          {dimensions.map((d, i) => {
            const value = companies[0]?.scores[d.key] ?? 0;
            const r = (value / 10) * RADIUS;
            const p = polarToCartesian(i * angleStep, r);
            return (
              <circle
                key={`dot-${i}`}
                cx={p.x}
                cy={p.y}
                r="4"
                fill="#000"
              />
            );
          })}

          {/* Axis labels */}
          {dimensions.map((d, i) => {
            const labelRadius = RADIUS + 18;
            const p = polarToCartesian(i * angleStep, labelRadius);
            const angle = i * angleStep;
            let textAnchor: "start" | "middle" | "end" = "middle";
            if (angle > 10 && angle < 170) textAnchor = "start";
            else if (angle > 190 && angle < 350) textAnchor = "end";
            return (
              <text
                key={`label-${i}`}
                x={p.x}
                y={p.y}
                textAnchor={textAnchor}
                dominantBaseline="central"
                className="text-base fill-neutral-600"
              >
                {d.shortLabel}
              </text>
            );
          })}

          {/* Scale labels on first axis */}
          {Array.from({ length: RINGS }, (_, i) => {
            const value = (i + 1) * 2;
            const ringRadius = (RADIUS / RINGS) * (i + 1);
            const p = polarToCartesian(0, ringRadius);
            return (
              <text
                key={`scale-${i}`}
                x={p.x + 6}
                y={p.y - 4}
                className="text-base fill-neutral-400"
              >
                {value}
              </text>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          {companies.map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              <svg width="24" height="12" aria-hidden="true">
                <line
                  x1="0"
                  y1="6"
                  x2="24"
                  y2="6"
                  stroke={companyStyles[i]?.stroke ?? "#999"}
                  strokeWidth="2"
                  strokeDasharray={companyStyles[i]?.dasharray ?? "none"}
                />
              </svg>
              <span className="text-base text-neutral-700">
                {c.name || (i === 0 ? "Your Company" : `Competitor ${i}`)}
                {i === 0 && " (You)"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Score slider                                                       */
/* ------------------------------------------------------------------ */

function ScoreSlider({
  companyIndex,
  dimensionKey,
  value,
  onChange,
}: {
  companyIndex: number;
  dimensionKey: DimensionKey;
  value: number;
  onChange: (val: number) => void;
}) {
  const id = `score-${companyIndex}-${dimensionKey}`;
  const dim = dimensions.find((d) => d.key === dimensionKey);

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label htmlFor={id} className="text-base font-bold text-black">
          {dim?.label}
        </label>
        <span className="text-base font-bold text-black tabular-nums w-8 text-right" aria-live="polite">
          {value}
        </span>
      </div>
      <p className="text-base text-neutral-500 mb-2">
        {dim?.criteria.join(", ")}
      </p>
      <input
        id={id}
        type="range"
        min={1}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-neutral-200 appearance-none cursor-pointer accent-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
        aria-valuemin={1}
        aria-valuemax={10}
        aria-valuenow={value}
      />
      <div className="flex justify-between text-base text-neutral-400 mt-1">
        <span>1</span>
        <span>10</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Company form card                                                  */
/* ------------------------------------------------------------------ */

function CompanyCard({
  company,
  index,
  isYours,
  onUpdateName,
  onUpdateScore,
  onRemove,
}: {
  company: Company;
  index: number;
  isYours: boolean;
  onUpdateName: (name: string) => void;
  onUpdateScore: (dim: DimensionKey, value: number) => void;
  onRemove?: () => void;
}) {
  return (
    <div className="border border-neutral-200">
      <div className="bg-black text-white px-6 py-4 flex items-center justify-between gap-4">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
          {isYours ? "Your Company" : `Competitor ${index}`}
        </h3>
        {!isYours && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove competitor ${company.name || index}`}
            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-base font-bold text-neutral-400 hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Remove
          </button>
        )}
      </div>
      <div className="p-6 space-y-6">
        <div>
          <label
            htmlFor={`company-name-${index}`}
            className="block text-base font-bold text-black mb-2"
          >
            {isYours ? "Your Company Name" : "Competitor Name"}
          </label>
          <input
            id={`company-name-${index}`}
            type="text"
            placeholder={isYours ? "Enter your company name" : "Enter competitor name"}
            value={company.name}
            onChange={(e) => onUpdateName(e.target.value)}
            className="w-full px-4 py-3 border border-neutral-200 text-base bg-white text-black min-h-[44px] focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
          />
        </div>
        {dimensions.map((d) => (
          <ScoreSlider
            key={d.key}
            companyIndex={index}
            dimensionKey={d.key}
            value={company.scores[d.key]}
            onChange={(val) => onUpdateScore(d.key, val)}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scorecard table                                                    */
/* ------------------------------------------------------------------ */

function ScorecardTable({ companies }: { companies: Company[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-base">
        <thead>
          <tr className="bg-black text-white">
            <th className="text-left px-4 py-3 font-bold" scope="col">
              Dimension
            </th>
            {companies.map((c, i) => (
              <th key={i} className="text-center px-4 py-3 font-bold" scope="col">
                {c.name || (i === 0 ? "You" : `Comp ${i}`)}
                {i === 0 && " (You)"}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dimensions.map((d, di) => (
            <tr
              key={d.key}
              className={di % 2 === 0 ? "bg-white" : "bg-neutral-50"}
            >
              <td className="px-4 py-3 font-bold text-black">{d.label}</td>
              {companies.map((c, ci) => {
                const val = c.scores[d.key];
                const maxVal = Math.max(...companies.map((co) => co.scores[d.key]));
                const isMax = val === maxVal && companies.filter((co) => co.scores[d.key] === maxVal).length === 1;
                return (
                  <td
                    key={ci}
                    className={`text-center px-4 py-3 tabular-nums ${
                      isMax ? "font-extrabold text-black" : "text-neutral-600"
                    }`}
                  >
                    {val}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-black">
            <td className="px-4 py-3 font-extrabold text-black">Total</td>
            {companies.map((c, i) => {
              const t = totalScore(c);
              const maxTotal = Math.max(...companies.map(totalScore));
              const isMax = t === maxTotal && companies.filter((co) => totalScore(co) === maxTotal).length === 1;
              return (
                <td
                  key={i}
                  className={`text-center px-4 py-3 tabular-nums ${
                    isMax ? "font-extrabold text-black" : "text-neutral-600 font-bold"
                  }`}
                >
                  {t}/60
                </td>
              );
            })}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Gap analysis panel                                                 */
/* ------------------------------------------------------------------ */

function GapAnalysis({
  gaps,
}: {
  gaps: GapItem[];
}) {
  return (
    <div className="space-y-4">
      {gaps.map((g) => {
        const barWidth = Math.abs(g.gap) * 10;
        const isPositive = g.gap >= 0;
        return (
          <div key={g.dimensionKey} className="border border-neutral-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-bold text-black">{g.dimension}</span>
              <span
                className={`text-base font-bold tabular-nums ${
                  isPositive ? "text-black" : "text-neutral-500"
                }`}
              >
                {isPositive ? "+" : ""}
                {g.gap.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center gap-4 text-base text-neutral-600 mb-2">
              <span>You: {g.yourScore}</span>
              <span>Competitor avg: {g.competitorAvg.toFixed(1)}</span>
            </div>
            <div className="w-full h-3 bg-neutral-100 relative">
              <div
                className={`h-3 ${isPositive ? "bg-black" : "bg-neutral-300"}`}
                style={{ width: `${Math.min(barWidth, 100)}%` }}
              />
            </div>
            <p className="text-base text-neutral-500 mt-1">
              {isPositive
                ? `You lead competitors by ${g.gap.toFixed(1)} points in this dimension.`
                : `You trail competitors by ${Math.abs(g.gap).toFixed(1)} points in this dimension.`}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Advantages panel                                                   */
/* ------------------------------------------------------------------ */

function AdvantagesPanel({ advantages }: { advantages: Advantage[] }) {
  if (advantages.length === 0) {
    return (
      <div className="border border-neutral-200 p-6">
        <p className="text-base text-neutral-500">
          No clear competitive advantages found. You do not currently outscore
          all competitors in any single dimension. Consider focusing resources on
          one or two areas where you can achieve market leadership.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {advantages.map((a, i) => (
        <div key={i} className="border border-neutral-200 p-4 flex items-start gap-3">
          <span
            className="inline-flex items-center justify-center min-w-[28px] h-7 bg-black text-white text-base font-bold flex-shrink-0"
            aria-hidden="true"
          >
            +
          </span>
          <div>
            <p className="text-base font-bold text-black">{a.dimension}</p>
            <p className="text-base text-neutral-500 mt-1">
              You score {a.yourScore} versus the next best competitor ({a.bestCompetitor})
              at {a.bestCompetitorScore}. That is a {a.lead}-point lead you can leverage
              in your positioning.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Priorities panel                                                   */
/* ------------------------------------------------------------------ */

function PrioritiesPanel({ priorities }: { priorities: Priority[] }) {
  if (priorities.length === 0) {
    return (
      <div className="border border-neutral-200 p-6">
        <p className="text-base text-neutral-500">
          No improvement priorities identified. You meet or exceed the competitor
          average in every dimension. Focus on maintaining your lead and widening
          the gap in your strongest areas.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {priorities.map((p, i) => (
        <div key={i} className="border border-neutral-200 p-4 flex items-start gap-3">
          <span className="inline-flex items-center justify-center min-w-[28px] h-7 border-2 border-black text-black text-base font-bold flex-shrink-0">
            {i + 1}
          </span>
          <div>
            <p className="text-base font-bold text-black">{p.dimension}</p>
            <p className="text-base text-neutral-500 mt-1">
              You score {p.yourScore} versus a competitor average of{" "}
              {p.competitorAvg.toFixed(1)} (gap of {p.gap.toFixed(1)}). Closing
              this gap should be a priority.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Copy / Download buttons                                            */
/* ------------------------------------------------------------------ */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy benchmarking report to clipboard"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      {copied ? "Copied" : "Copy to Clipboard"}
    </button>
  );
}

function DownloadButton({
  text,
  filename,
}: {
  text: string;
  filename: string;
}) {
  const handleDownload = useCallback(() => {
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
      type="button"
      onClick={handleDownload}
      aria-label="Download benchmarking report as text file"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      Download as Text
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function CompetitorBenchmarkingPage() {
  const [yourCompany, setYourCompany] = useState<Company>(createCompany(""));
  const [competitors, setCompetitors] = useState<Company[]>([]);
  const [result, setResult] = useState<{
    all: Company[];
    gaps: GapItem[];
    advantages: Advantage[];
    priorities: Priority[];
  } | null>(null);
  const [savedNotice, setSavedNotice] = useState(false);

  /* ---- localStorage: load ---- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.yourCompany) setYourCompany(data.yourCompany);
        if (data.competitors) setCompetitors(data.competitors);
      }
    } catch {
      /* ignore corrupt data */
    }
  }, []);

  /* ---- localStorage: save ---- */
  const handleSave = useCallback(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ yourCompany, competitors })
      );
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 2000);
    } catch {
      /* storage full or unavailable */
    }
  }, [yourCompany, competitors]);

  /* ---- Your company handlers ---- */
  function updateYourName(name: string) {
    setYourCompany((prev) => ({ ...prev, name }));
  }

  function updateYourScore(dim: DimensionKey, value: number) {
    setYourCompany((prev) => ({
      ...prev,
      scores: { ...prev.scores, [dim]: value },
    }));
  }

  /* ---- Competitor handlers ---- */
  function addCompetitor() {
    if (competitors.length >= 4) return;
    setCompetitors((prev) => [...prev, createCompany("")]);
  }

  function removeCompetitor(index: number) {
    setCompetitors((prev) => prev.filter((_, i) => i !== index));
  }

  function updateCompetitorName(index: number, name: string) {
    setCompetitors((prev) =>
      prev.map((c, i) => (i === index ? { ...c, name } : c))
    );
  }

  function updateCompetitorScore(
    index: number,
    dim: DimensionKey,
    value: number
  ) {
    setCompetitors((prev) =>
      prev.map((c, i) =>
        i === index
          ? { ...c, scores: { ...c.scores, [dim]: value } }
          : c
      )
    );
  }

  /* ---- Validation ---- */
  const yourHasName = yourCompany.name.trim() !== "";
  const hasAtLeastOneCompetitor =
    competitors.length > 0 &&
    competitors.some((c) => c.name.trim() !== "");
  const canGenerate = yourHasName && hasAtLeastOneCompetitor;

  const hasAnyInput =
    yourCompany.name.trim() !== "" || competitors.length > 0;

  /* ---- Generate / Reset ---- */
  function handleGenerate() {
    if (!canGenerate) return;
    const filledCompetitors = competitors.filter(
      (c) => c.name.trim() !== ""
    );
    const gaps = computeGaps(yourCompany, filledCompetitors);
    const advantages = findAdvantages(yourCompany, filledCompetitors);
    const priorities = findPriorities(yourCompany, filledCompetitors);
    setResult({
      all: [yourCompany, ...filledCompetitors],
      gaps,
      advantages,
      priorities,
    });
  }

  function handleReset() {
    setYourCompany(createCompany(""));
    setCompetitors([]);
    setResult(null);
  }

  const plainText = result
    ? formatExportText(
        result.all[0],
        result.all.slice(1),
        result.gaps,
        result.advantages,
        result.priorities
      )
    : "";

  return (
    <article className="min-h-screen">
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/competitor-analysis" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Competitor Analysis</Link>
                <Link href="/resources/competitor-matrix" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Competitor Matrix</Link>
                <Link href="/resources/competitor-pricing-tracker" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Competitor Pricing</Link>
                <Link href="/resources/competitive-gap" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Competitive Gap</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Competitor Benchmarking Dashboard",
          description:
            "Free competitor benchmarking tool. Rate your business and up to four competitors across six key dimensions to visualize competitive position, identify gaps, and prioritize improvements.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Competitor Benchmarking Dashboard" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Competitor Benchmarking Dashboard
            </h1>
            <SectionDesc>
              Benchmark your business against up to four competitors across six
              key dimensions. Visualize your competitive position on a radar
              chart, identify gaps, discover your advantages, and prioritize
              improvements.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Your Company Form ---- */}
      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <CompanyCard
              company={yourCompany}
              index={0}
              isYours
              onUpdateName={updateYourName}
              onUpdateScore={updateYourScore}
            />
          </Animate>
        </div>
      </section>

      {/* ---- Competitor Forms ---- */}
      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {competitors.map((comp, i) => (
            <Animate key={i} animation="fade-up">
              <CompanyCard
                company={comp}
                index={i + 1}
                isYours={false}
                onUpdateName={(name) => updateCompetitorName(i, name)}
                onUpdateScore={(dim, val) => updateCompetitorScore(i, dim, val)}
                onRemove={() => removeCompetitor(i)}
              />
            </Animate>
          ))}

          {competitors.length < 4 && (
            <Animate animation="fade-up">
              <button
                type="button"
                onClick={addCompetitor}
                className="w-full min-h-[44px] px-6 py-4 text-base font-bold border-2 border-dashed border-neutral-300 text-neutral-500 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                + Add Competitor ({competitors.length}/4)
              </button>
            </Animate>
          )}
        </div>
      </section>

      {/* ---- Generate / Reset / Save ---- */}
      <section className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3 items-center">
              <button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className="bg-black text-white px-8 py-4 min-h-[44px] text-base font-bold hover:bg-neutral-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:bg-neutral-300 disabled:cursor-not-allowed"
              >
                Generate Dashboard
              </button>
              {hasAnyInput && (
                <>
                  <button
                    onClick={handleSave}
                    className="px-8 py-4 min-h-[44px] text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    {savedNotice ? "Saved" : "Save Progress"}
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-8 py-4 min-h-[44px] text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    Reset
                  </button>
                </>
              )}
              {!canGenerate && (
                <p className="text-base text-neutral-400 self-center">
                  {!yourHasName
                    ? "Enter your company name to get started."
                    : "Add at least one named competitor."}
                </p>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Results ---- */}
      {result && (
        <section className="px-6 lg:px-12 pb-16">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Radar chart */}
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                Competitive Radar
              </h2>
              <div className="border border-neutral-200 p-6">
                <RadarChart companies={result.all} />
              </div>
            </Animate>

            {/* Scorecard */}
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                Scorecard
              </h2>
              <div className="border border-neutral-200">
                <ScorecardTable companies={result.all} />
              </div>
            </Animate>

            {/* Gap analysis */}
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                Gap Analysis
              </h2>
              <GapAnalysis gaps={result.gaps} />
            </Animate>

            {/* Competitive advantages */}
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                Competitive Advantages
              </h2>
              <AdvantagesPanel advantages={result.advantages} />
            </Animate>

            {/* Improvement priorities */}
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                Improvement Priorities
              </h2>
              <PrioritiesPanel priorities={result.priorities} />
            </Animate>

            {/* Export actions */}
            <div className="flex flex-wrap gap-3">
              <CopyButton text={plainText} />
              <DownloadButton
                text={plainText}
                filename="competitor-benchmarking.txt"
              />
            </div>
          </div>
        </section>
      )}

      {/* ---- How to Use ---- */}
      <section className="px-6 lg:px-12 py-16 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-8">
              How to Use This Tool
            </h2>
          </Animate>
          <Stagger stagger={100} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {howToSteps.map((step, i) => (
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

      {/* ---- Methodology / Educational Section ---- */}
      <section className="px-6 lg:px-12 py-16 border-t border-neutral-200 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
              About Competitive Benchmarking
            </h2>
            <div className="space-y-6 text-base text-neutral-600 leading-relaxed">
              <p>
                Competitive benchmarking is a structured process of measuring your
                business performance against key competitors across standardized
                dimensions. Unlike ad-hoc competitor research, benchmarking uses
                consistent criteria so you can track changes over time and make
                data-driven strategic decisions.
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                Why These Six Dimensions?
              </h3>
              <p>
                The six dimensions in this tool cover the complete competitive
                landscape. <strong>Online Presence</strong> measures digital
                visibility. <strong>Product/Service</strong> evaluates your core
                offering. <strong>Marketing</strong> assesses how effectively you
                reach and engage your audience. <strong>Customer Experience</strong>{" "}
                captures post-purchase satisfaction. <strong>Technology</strong>{" "}
                gauges operational capability. <strong>Market Position</strong>{" "}
                reflects your perceived standing in the industry. Together, they
                provide a holistic view that no single metric can offer.
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                Scoring Guidelines
              </h3>
              <p>
                Rate each dimension from 1 (significantly below market standard)
                to 10 (industry-leading). A score of 5 represents the market
                average. Base your ratings on observable evidence: website
                quality, public reviews, published case studies, social media
                engagement metrics, and direct customer feedback. The more
                evidence-based your scoring, the more actionable the results.
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                Interpreting Results
              </h3>
              <p>
                The <strong>radar chart</strong> shows your competitive shape at a
                glance. Balanced companies have a regular polygon; lopsided shapes
                reveal over-investment in some areas and neglect in others.
                The <strong>gap analysis</strong> quantifies where you lead or trail
                the competition. The <strong>improvement priorities</strong> rank
                your weakest areas by gap size, giving you a clear action list.
                Revisit this benchmarking quarterly to track progress and spot shifts
                in the competitive landscape.
              </p>
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Bottom CTA ---- */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Get a Professional Competitive Analysis
            </h2>
            <p className="text-lg text-neutral-400 mt-4 mb-8">
              This tool gives you a solid starting framework. Our team conducts
              in-depth competitive research with real market data, customer
              interviews, and comprehensive strategic analysis to give you a
              complete picture of your competitive landscape.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Work With Our Strategy Team &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Competitor Benchmarking"
        services={[
          { title: "Digital Marketing", desc: "Competitive intelligence turned into actionable growth strategy.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Outrank competitors with data-backed SEO strategies.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Win market share with smarter paid media campaigns.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Competitive Swot Analyzer", href: "/resources/competitive-swot-analyzer" },
          { title: "Competitor Ad Spy", href: "/resources/competitor-ad-spy" },
          { title: "Competitor Analysis", href: "/resources/competitor-analysis" },
          { title: "Competitor Matrix", href: "/resources/competitor-matrix" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
