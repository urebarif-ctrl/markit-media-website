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

const DIMENSIONS = [
  "Logo usage",
  "Color palette",
  "Typography",
  "Tone of voice",
  "Imagery style",
  "Messaging alignment",
] as const;

type Dimension = (typeof DIMENSIONS)[number];

const DEFAULT_TOUCHPOINTS = [
  "Website",
  "Social Media",
  "Email",
  "Print",
  "Ads",
];

interface TouchpointRatings {
  name: string;
  enabled: boolean;
  ratings: Record<Dimension, number>;
}

function createEmptyTouchpoint(name: string, enabled: boolean): TouchpointRatings {
  const ratings = {} as Record<Dimension, number>;
  for (const d of DIMENSIONS) {
    ratings[d] = 0;
  }
  return { name, enabled, ratings };
}

const dimensionRecommendations: Record<Dimension, { low: string; mid: string }> = {
  "Logo usage": {
    low: "Create a brand guidelines document that specifies exact logo placement, sizing, spacing, and acceptable variations for every channel.",
    mid: "Audit all active touchpoints for logo consistency. Standardize file formats and create templates with locked logo placement.",
  },
  "Color palette": {
    low: "Define a strict color palette with specific hex codes for primary, secondary, and accent colors. Distribute these to every team member and vendor.",
    mid: "Review color application across touchpoints. Ensure digital and print versions of your palette are calibrated to appear consistent.",
  },
  Typography: {
    low: "Select a primary and secondary typeface, define usage rules (headings, body, captions), and create a typography style guide.",
    mid: "Check that font weights, sizes, and line heights are consistent across platforms. Ensure web fonts match print specifications.",
  },
  "Tone of voice": {
    low: "Document your brand voice with specific examples of language to use and avoid. Include do/don't samples for each channel.",
    mid: "Review recent content across all touchpoints for tone drift. Create a tone calibration checklist for content creators.",
  },
  "Imagery style": {
    low: "Define your visual style: photography direction, illustration guidelines, icon style, and image treatment standards.",
    mid: "Audit your image library for consistency. Remove or replace visuals that deviate from your established style.",
  },
  "Messaging alignment": {
    low: "Write core messaging pillars — a brand promise, value propositions, and proof points — that every channel should reflect.",
    mid: "Cross-reference messaging across touchpoints to ensure your value propositions and key phrases are consistent everywhere.",
  },
};

/* ------------------------------------------------------------------ */
/*  Scoring Logic                                                      */
/* ------------------------------------------------------------------ */

interface ScoreResult {
  brandName: string;
  touchpoints: TouchpointRatings[];
  overallScore: number;
  overallPercentage: number;
  touchpointScores: { name: string; score: number; percentage: number }[];
  dimensionScores: { dimension: Dimension; score: number; percentage: number }[];
  weakDimensions: Dimension[];
  weakTouchpoints: string[];
  grade: string;
}

function calculateResults(
  brandName: string,
  touchpoints: TouchpointRatings[]
): ScoreResult {
  const active = touchpoints.filter((t) => t.enabled && t.name.trim() !== "");

  /* Per-touchpoint scores */
  const touchpointScores = active.map((tp) => {
    const values = Object.values(tp.ratings);
    const sum = values.reduce((a, b) => a + b, 0);
    const max = DIMENSIONS.length * 5;
    return {
      name: tp.name,
      score: sum,
      percentage: max > 0 ? Math.round((sum / max) * 100) : 0,
    };
  });

  /* Per-dimension scores (averaged across active touchpoints) */
  const dimensionScores = DIMENSIONS.map((dim) => {
    const sum = active.reduce((acc, tp) => acc + tp.ratings[dim], 0);
    const max = active.length * 5;
    return {
      dimension: dim,
      score: sum,
      percentage: max > 0 ? Math.round((sum / max) * 100) : 0,
    };
  });

  /* Overall */
  const totalRated = active.reduce(
    (acc, tp) => acc + Object.values(tp.ratings).reduce((a, b) => a + b, 0),
    0
  );
  const totalMax = active.length * DIMENSIONS.length * 5;
  const overallPercentage =
    totalMax > 0 ? Math.round((totalRated / totalMax) * 100) : 0;

  /* Grade */
  let grade = "Needs Work";
  if (overallPercentage >= 90) grade = "Excellent";
  else if (overallPercentage >= 75) grade = "Strong";
  else if (overallPercentage >= 60) grade = "Moderate";
  else if (overallPercentage >= 40) grade = "Weak";

  /* Weak areas (below 60%) */
  const weakDimensions = dimensionScores
    .filter((d) => d.percentage < 60)
    .map((d) => d.dimension);
  const weakTouchpoints = touchpointScores
    .filter((t) => t.percentage < 60)
    .map((t) => t.name);

  return {
    brandName,
    touchpoints: active,
    overallScore: totalRated,
    overallPercentage,
    touchpointScores,
    dimensionScores,
    weakDimensions,
    weakTouchpoints,
    grade,
  };
}

/* ------------------------------------------------------------------ */
/*  SVG Visualizations                                                 */
/* ------------------------------------------------------------------ */

function RadarChart({ dimensionScores }: { dimensionScores: ScoreResult["dimensionScores"] }) {
  const cx = 150;
  const cy = 150;
  const maxR = 120;
  const levels = 5;
  const count = dimensionScores.length;
  const angleStep = (2 * Math.PI) / count;

  function polarToXY(index: number, value: number): { x: number; y: number } {
    const angle = angleStep * index - Math.PI / 2;
    const r = (value / 5) * maxR;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  }

  /* Grid rings */
  const gridRings = Array.from({ length: levels }, (_, i) => {
    const r = ((i + 1) / levels) * maxR;
    const points = Array.from({ length: count }, (__, j) => {
      const angle = angleStep * j - Math.PI / 2;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(" ");
    return <polygon key={i} points={points} fill="none" stroke="#e5e5e5" strokeWidth="1" />;
  });

  /* Grid spokes */
  const spokes = Array.from({ length: count }, (_, i) => {
    const end = polarToXY(i, 5);
    return (
      <line
        key={i}
        x1={cx}
        y1={cy}
        x2={end.x}
        y2={end.y}
        stroke="#e5e5e5"
        strokeWidth="1"
      />
    );
  });

  /* Data polygon */
  const avgValues = dimensionScores.map((d) => (d.percentage / 100) * 5);
  const dataPoints = avgValues
    .map((val, i) => {
      const pt = polarToXY(i, val);
      return `${pt.x},${pt.y}`;
    })
    .join(" ");

  /* Labels */
  const labels = dimensionScores.map((d, i) => {
    const pt = polarToXY(i, 5.8);
    const anchor =
      Math.abs(pt.x - cx) < 5
        ? "middle"
        : pt.x > cx
          ? "start"
          : "end";
    return (
      <text
        key={d.dimension}
        x={pt.x}
        y={pt.y}
        textAnchor={anchor}
        dominantBaseline="middle"
        className="text-[14px] fill-gray-600"
      >
        {d.dimension}
      </text>
    );
  });

  return (
    <svg
      viewBox="0 0 300 300"
      className="w-full max-w-[320px] mx-auto"
      role="img"
      aria-label="Radar chart showing brand consistency scores across six dimensions"
    >
      {gridRings}
      {spokes}
      <polygon
        points={dataPoints}
        fill="rgba(0,0,0,0.08)"
        stroke="#000"
        strokeWidth="2"
      />
      {avgValues.map((val, i) => {
        const pt = polarToXY(i, val);
        return (
          <circle key={i} cx={pt.x} cy={pt.y} r="4" fill="#000" />
        );
      })}
      {labels}
    </svg>
  );
}

function BarChart({
  items,
  maxValue,
}: {
  items: { label: string; percentage: number }[];
  maxValue?: number;
}) {
  const max = maxValue ?? 100;
  const barH = 32;
  const gap = 12;
  const labelW = 140;
  const chartW = 500;
  const totalW = labelW + chartW + 50;
  const totalH = items.length * (barH + gap) + gap;

  return (
    <svg
      viewBox={`0 0 ${totalW} ${totalH}`}
      className="w-full"
      role="img"
      aria-label="Bar chart showing scores per touchpoint"
    >
      {items.map((item, i) => {
        const y = gap + i * (barH + gap);
        const barWidth = (item.percentage / max) * chartW;
        return (
          <g key={item.label}>
            <text
              x={labelW - 8}
              y={y + barH / 2}
              textAnchor="end"
              dominantBaseline="middle"
              className="text-[14px] fill-black font-semibold"
            >
              {item.label}
            </text>
            <rect
              x={labelW}
              y={y}
              width={chartW}
              height={barH}
              fill="#f5f5f5"
              rx="2"
            />
            <rect
              x={labelW}
              y={y}
              width={Math.max(barWidth, 2)}
              height={barH}
              fill="#000"
              rx="2"
            />
            <text
              x={labelW + chartW + 8}
              y={y + barH / 2}
              textAnchor="start"
              dominantBaseline="middle"
              className="text-[14px] fill-gray-600 font-medium"
            >
              {item.percentage}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function ScoreGauge({ percentage, grade }: { percentage: number; grade: string }) {
  const r = 80;
  const cx = 100;
  const cy = 100;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 200 200"
        className="w-48 h-48"
        role="img"
        aria-label={`Overall brand consistency score: ${percentage}%`}
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#f5f5f5"
          strokeWidth="12"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#000"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          className="transition-all duration-700"
        />
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-[2.5rem] font-extrabold fill-black"
        >
          {percentage}%
        </text>
        <text
          x={cx}
          y={cy + 22}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-[1rem] fill-gray-500"
        >
          {grade}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function RatingInput({
  dimension,
  value,
  onChange,
}: {
  dimension: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2 border-b border-gray-100 last:border-b-0">
      <span className="text-base text-black min-w-0 shrink">{dimension}</span>
      <div className="flex gap-1 shrink-0" role="radiogroup" aria-label={`Rating for ${dimension}`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-label={`${n} out of 5`}
            aria-pressed={value === n}
            className={`w-10 h-10 min-w-[40px] min-h-[40px] text-base font-bold border transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
              value === n
                ? "bg-black text-white border-black"
                : value > 0 && n <= value
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-400 border-gray-200 hover:border-black hover:text-black"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

function TouchpointCard({
  touchpoint,
  index,
  onToggle,
  onNameChange,
  onRatingChange,
}: {
  touchpoint: TouchpointRatings;
  index: number;
  onToggle: () => void;
  onNameChange: (name: string) => void;
  onRatingChange: (dim: Dimension, val: number) => void;
}) {
  const allRated = DIMENSIONS.every((d) => touchpoint.ratings[d] > 0);
  const someRated = DIMENSIONS.some((d) => touchpoint.ratings[d] > 0);
  const avg =
    DIMENSIONS.reduce((sum, d) => sum + touchpoint.ratings[d], 0) /
    DIMENSIONS.length;

  return (
    <div
      className={`border transition-colors motion-reduce:transition-none ${
        touchpoint.enabled ? "border-gray-200" : "border-gray-100 opacity-50"
      }`}
    >
      <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-100">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={touchpoint.enabled}
            onChange={onToggle}
            className="w-5 h-5 accent-black cursor-pointer"
            aria-label={`Enable ${touchpoint.name || `Touchpoint ${index + 1}`}`}
          />
          <span className="font-[family-name:var(--font-display)] text-base font-extrabold text-black">
            Touchpoint {index + 1}
          </span>
        </label>
        {touchpoint.enabled && someRated && (
          <span className="ml-auto text-base text-gray-400">
            {allRated ? `Avg: ${avg.toFixed(1)}/5` : "In progress..."}
          </span>
        )}
      </div>

      {touchpoint.enabled && (
        <div className="px-6 py-4 space-y-4">
          <div>
            <label
              htmlFor={`tp-name-${index}`}
              className="block text-base font-bold text-black mb-2"
            >
              Touchpoint Name
            </label>
            <input
              id={`tp-name-${index}`}
              type="text"
              placeholder="e.g., Website, Instagram, Brochure"
              value={touchpoint.name}
              onChange={(e) => onNameChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 text-base bg-white text-black min-h-[44px] focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
            />
          </div>

          <div>
            <p className="text-base font-bold text-black mb-3">
              Rate consistency (1 = inconsistent, 5 = fully consistent)
            </p>
            {DIMENSIONS.map((dim) => (
              <RatingInput
                key={dim}
                dimension={dim}
                value={touchpoint.ratings[dim]}
                onChange={(v) => onRatingChange(dim, v)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ResultsSection({ result }: { result: ScoreResult }) {
  return (
    <section aria-label="Brand Consistency Score for" className="px-6 lg:px-12 pb-16">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Overall Score */}
        <Animate animation="fade-up">
          <div className="border border-gray-200 p-8 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
              Brand Consistency Score for {result.brandName}
            </h2>
            <ScoreGauge
              percentage={result.overallPercentage}
              grade={result.grade}
            />
            <p className="text-base text-gray-500 mt-4 max-w-lg mx-auto">
              Based on {result.touchpoints.length} touchpoint
              {result.touchpoints.length !== 1 ? "s" : ""} rated across{" "}
              {DIMENSIONS.length} brand dimensions.
            </p>
          </div>
        </Animate>

        {/* Touchpoint Breakdown */}
        <Animate animation="fade-up">
          <div className="border border-gray-200">
            <div className="bg-black text-white px-6 py-4">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                Score by Touchpoint
              </h3>
            </div>
            <div className="p-6 overflow-x-auto">
              <BarChart
                items={result.touchpointScores.map((t) => ({
                  label: t.name,
                  percentage: t.percentage,
                }))}
              />
            </div>
          </div>
        </Animate>

        {/* Dimension Breakdown (Radar) */}
        <Animate animation="fade-up">
          <div className="border border-gray-200">
            <div className="bg-black text-white px-6 py-4">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                Score by Dimension
              </h3>
            </div>
            <div className="p-6">
              <RadarChart dimensionScores={result.dimensionScores} />
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {result.dimensionScores.map((d) => (
                  <div key={d.dimension} className="text-center border border-gray-100 p-3">
                    <p className="text-base font-bold text-black">
                      {d.percentage}%
                    </p>
                    <p className="text-base text-neutral-500 mt-1">{d.dimension}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Animate>

        {/* Detailed Grid */}
        <Animate animation="fade-up">
          <div className="border border-gray-200">
            <div className="bg-black text-white px-6 py-4">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                Detailed Ratings
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-base">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-bold text-black">
                      Dimension
                    </th>
                    {result.touchpoints.map((tp) => (
                      <th
                        key={tp.name}
                        className="text-center px-4 py-3 font-bold text-black"
                      >
                        {tp.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DIMENSIONS.map((dim) => (
                    <tr
                      key={dim}
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      <td className="px-4 py-3 font-medium text-black">
                        {dim}
                      </td>
                      {result.touchpoints.map((tp) => {
                        const val = tp.ratings[dim];
                        return (
                          <td
                            key={tp.name}
                            className={`text-center px-4 py-3 font-bold ${
                              val >= 4
                                ? "text-black"
                                : val >= 3
                                  ? "text-gray-500"
                                  : "text-gray-400"
                            }`}
                          >
                            {val}/5
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Animate>

        {/* Recommendations */}
        <Animate animation="fade-up">
          <div className="border border-gray-200">
            <div className="bg-black text-white px-6 py-4">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                Recommendations
              </h3>
            </div>
            <div className="p-6 space-y-6">
              {result.dimensionScores.length > 0 &&
                result.dimensionScores
                  .sort((a, b) => a.percentage - b.percentage)
                  .map((d, i) => {
                    const rec =
                      d.percentage < 60
                        ? dimensionRecommendations[d.dimension].low
                        : dimensionRecommendations[d.dimension].mid;
                    if (d.percentage >= 80) return null;
                    return (
                      <div
                        key={d.dimension}
                        className="flex items-start gap-3 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
                      >
                        <span className="inline-flex items-center justify-center min-w-[28px] h-7 bg-black text-white text-base font-bold shrink-0">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-base font-bold text-black">
                            {d.dimension}{" "}
                            <span className="font-normal text-gray-400">
                              ({d.percentage}%)
                            </span>
                          </p>
                          <p className="text-base text-gray-500 mt-1 leading-relaxed">
                            {rec}
                          </p>
                        </div>
                      </div>
                    );
                  })
                  .filter(Boolean)}
              {result.dimensionScores.every((d) => d.percentage >= 80) && (
                <p className="text-base text-gray-500">
                  Your brand consistency is strong across all dimensions. Continue
                  monitoring regularly to maintain this level of consistency as your
                  brand evolves.
                </p>
              )}
            </div>
          </div>
        </Animate>

        {/* Weak Touchpoints */}
        {result.weakTouchpoints.length > 0 && (
          <Animate animation="fade-up">
            <div className="border border-gray-200 p-6">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                Touchpoints Needing Attention
              </h3>
              <p className="text-base text-gray-500 mb-4">
                These touchpoints scored below 60% and should be prioritized for
                brand alignment improvements:
              </p>
              <ul className="space-y-2">
                {result.weakTouchpoints.map((name) => {
                  const tp = result.touchpointScores.find(
                    (t) => t.name === name
                  );
                  return (
                    <li key={name} className="flex items-center gap-3 text-base">
                      <span className="w-2 h-2 bg-black shrink-0" />
                      <span className="font-bold text-black">{name}</span>
                      <span className="text-gray-400">
                        {tp?.percentage ?? 0}%
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Animate>
        )}
      </div>
    </section>
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
      aria-label="Copy results to clipboard"
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
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [text, filename]);

  return (
    <button
      onClick={download}
      aria-label="Download results as text file"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      Download as Text
    </button>
  );
}

function formatPlainText(result: ScoreResult): string {
  const lines: string[] = [];
  lines.push("BRAND CONSISTENCY REPORT");
  lines.push("=".repeat(50));
  lines.push(`Brand: ${result.brandName}`);
  lines.push(`Overall Score: ${result.overallPercentage}% (${result.grade})`);
  lines.push("");

  lines.push("TOUCHPOINT SCORES");
  lines.push("-".repeat(30));
  for (const tp of result.touchpointScores) {
    lines.push(`  ${tp.name}: ${tp.percentage}%`);
  }
  lines.push("");

  lines.push("DIMENSION SCORES");
  lines.push("-".repeat(30));
  for (const d of result.dimensionScores) {
    lines.push(`  ${d.dimension}: ${d.percentage}%`);
  }
  lines.push("");

  lines.push("DETAILED RATINGS");
  lines.push("-".repeat(30));
  for (const tp of result.touchpoints) {
    lines.push(`  ${tp.name}:`);
    for (const dim of DIMENSIONS) {
      lines.push(`    ${dim}: ${tp.ratings[dim]}/5`);
    }
    lines.push("");
  }

  if (result.weakDimensions.length > 0) {
    lines.push("AREAS NEEDING ATTENTION");
    lines.push("-".repeat(30));
    for (const dim of result.weakDimensions) {
      lines.push(`  - ${dim}: ${dimensionRecommendations[dim].low}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

const howToSteps = [
  {
    title: "Name Your Brand",
    description:
      "Enter your brand name and enable the touchpoints you want to evaluate. You can customize touchpoint names to match your specific channels.",
  },
  {
    title: "Rate Each Dimension",
    description:
      "For every enabled touchpoint, rate how consistently your brand presents itself across logo, color, typography, tone, imagery, and messaging. Use 1 for inconsistent and 5 for fully consistent.",
  },
  {
    title: "Review Your Score",
    description:
      "Your overall brand consistency score aggregates all ratings. The radar chart and bar chart reveal patterns across dimensions and touchpoints.",
  },
  {
    title: "Act on Recommendations",
    description:
      "Focus on the lowest-scoring dimensions and touchpoints first. The recommendations prioritize the changes that will have the biggest impact on brand consistency.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */



export default function BrandConsistencyCheckerPage() {
  const [brandName, setBrandName] = useState("");
  const [touchpoints, setTouchpoints] = useState<TouchpointRatings[]>(
    DEFAULT_TOUCHPOINTS.map((name, i) =>
      createEmptyTouchpoint(name, i < 3)
    )
  );
  const [result, setResult] = useState<ScoreResult | null>(null);

  function updateTouchpoint(index: number, updates: Partial<TouchpointRatings>) {
    setTouchpoints((prev) =>
      prev.map((tp, i) => (i === index ? { ...tp, ...updates } : tp))
    );
  }

  function updateRating(tpIndex: number, dim: Dimension, val: number) {
    setTouchpoints((prev) =>
      prev.map((tp, i) =>
        i === tpIndex
          ? { ...tp, ratings: { ...tp.ratings, [dim]: val } }
          : tp
      )
    );
  }

  const activeTouchpoints = touchpoints.filter(
    (t) => t.enabled && t.name.trim() !== ""
  );
  const allRated =
    brandName.trim() !== "" &&
    activeTouchpoints.length > 0 &&
    activeTouchpoints.every((tp) =>
      DIMENSIONS.every((d) => tp.ratings[d] > 0)
    );

  const hasInput =
    brandName.trim() !== "" ||
    touchpoints.some(
      (t) =>
        t.name !== DEFAULT_TOUCHPOINTS[touchpoints.indexOf(t)] ||
        DIMENSIONS.some((d) => t.ratings[d] > 0)
    );

  function handleCalculate() {
    if (!allRated) return;
    setResult(calculateResults(brandName, touchpoints));
  }

  function handleReset() {
    setBrandName("");
    setTouchpoints(
      DEFAULT_TOUCHPOINTS.map((name, i) =>
        createEmptyTouchpoint(name, i < 3)
      )
    );
    setResult(null);
  }

  const plainText = result ? formatPlainText(result) : "";

  return (
    <article className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Brand Consistency Checker",
          description: "Audit your brand consistency across touchpoints with scoring and actionable recommendations.",
          url: "https://themarkitmedia.com/en/resources/brand-consistency-checker",
          applicationCategory: "Branding Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Brand Consistency Checker | Free Marketing Tool — Markit Media</title>
      <meta name="description" content="Enter your brand name and enable the touchpoints you want to evaluate. You can customize touchpoint names to match your specific channels." />

      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/brand-name-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Name Generator</Link>
                <Link href="/resources/brand-name-evaluator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Name Evaluator</Link>
                <Link href="/resources/brand-voice-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Voice Generator</Link>
                <Link href="/resources/brand-voice-checker" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Voice Checker</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Brand Consistency Checker",
          description:
            "Free brand consistency checker. Rate your brand across up to 5 touchpoints and 6 dimensions to get an overall consistency score, visual breakdown, and actionable recommendations.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Brand Consistency Checker" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Brand Consistency Checker
            </h1>
            <SectionDesc>
              Rate your brand&apos;s consistency across up to 5 touchpoints and 6
              key dimensions. Get an overall score, visual breakdowns, and
              actionable recommendations to strengthen your brand presence.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Form ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Brand name */}
          <Animate animation="fade-up">
            <div className="border border-gray-200 p-6">
              <label
                htmlFor="brand-name"
                className="block text-base font-bold text-black mb-2"
              >
                Brand Name
              </label>
              <input
                id="brand-name"
                type="text"
                placeholder="Enter your brand name"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 text-base bg-white text-black min-h-[44px] focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
              />
            </div>
          </Animate>

          {/* Rating scale legend */}
          <Animate animation="fade-up">
            <div className="border border-gray-200 p-6">
              <p className="text-base font-bold text-black mb-3">
                Rating Scale
              </p>
              <div className="grid grid-cols-5 gap-2 text-center">
                {[
                  { n: 1, label: "Inconsistent" },
                  { n: 2, label: "Somewhat Off" },
                  { n: 3, label: "Moderate" },
                  { n: 4, label: "Mostly Aligned" },
                  { n: 5, label: "Fully Consistent" },
                ].map((item) => (
                  <div key={item.n}>
                    <span className="inline-flex items-center justify-center w-10 h-10 bg-black text-white text-base font-bold">
                      {item.n}
                    </span>
                    <p className="text-base text-neutral-500 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Animate>

          {/* Touchpoint cards */}
          <Stagger stagger={80} animation="fade-up" className="space-y-6">
            {touchpoints.map((tp, i) => (
              <TouchpointCard
                key={i}
                touchpoint={tp}
                index={i}
                onToggle={() =>
                  updateTouchpoint(i, { enabled: !tp.enabled })
                }
                onNameChange={(name) => updateTouchpoint(i, { name })}
                onRatingChange={(dim, val) => updateRating(i, dim, val)}
              />
            ))}
          </Stagger>

          {/* Generate / Reset */}
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleCalculate}
                disabled={!allRated}
                className="bg-black text-white px-8 py-4 min-h-[44px] text-base font-bold hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Calculate Consistency Score
              </button>
              {hasInput && (
                <button
                  onClick={handleReset}
                  className="px-8 py-4 min-h-[44px] text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Reset
                </button>
              )}
              {!allRated && (
                <p className="text-base text-gray-400 self-center">
                  Enter a brand name and rate all dimensions on each enabled
                  touchpoint.
                </p>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Results ---- */}
      {result && (
        <>
          <ResultsSection result={result} />
          <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
            <div className="max-w-4xl mx-auto flex flex-wrap gap-3">
              <CopyButton text={plainText} />
              <DownloadButton
                text={plainText}
                filename="brand-consistency-report.txt"
              />
            </div>
          </section>
        </>
      )}

      {/* ---- How to Use ---- */}
      <section aria-label="How to Use This Tool" className="px-6 lg:px-12 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-8">
              How to Use This Tool
            </h2>
          </Animate>
          <Stagger
            stagger={100}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
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
              Get a Professional Brand Audit
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              This self-assessment is a starting point. Our team conducts
              thorough brand audits with competitive analysis, audience research,
              and a detailed action plan to bring your brand into full alignment
              across every channel.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Contact Markit Media &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Brand Consistency Checker"
        services={[
          { title: "Branding", desc: "Strategic brand identity that differentiates you in your market.", href: "/services/branding" },
          { title: "Website Development", desc: "Websites that bring your brand to life with exceptional UX.", href: "/services/website-development" },
          { title: "Digital Marketing", desc: "Amplify your brand across every digital touchpoint.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
          { title: "Brand Guidelines Checklist", href: "/resources/brand-guidelines-checklist" },
          { title: "Brand Name Evaluator", href: "/resources/brand-name-evaluator" },
          { title: "Brand Name Generator", href: "/resources/brand-name-generator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
