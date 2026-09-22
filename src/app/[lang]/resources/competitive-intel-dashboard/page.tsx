"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

type AdSpendLevel = "Low" | "Medium" | "High";

interface CompetitorScores {
  seoVisibility: number;
  socialMediaPresence: number;
  contentVolume: number;
  paidAdSpend: AdSpendLevel;
  brandRecognition: number;
  innovationScore: number;
}

type NumericDimensionKey = Exclude<keyof CompetitorScores, "paidAdSpend">;

interface Competitor {
  id: string;
  name: string;
  website: string;
  scores: CompetitorScores;
}

interface YourProfile {
  name: string;
  scores: CompetitorScores;
}

const STORAGE_KEY = "markit-competitive-intel-dashboard";

const AD_SPEND_LEVELS: AdSpendLevel[] = ["Low", "Medium", "High"];

function adSpendNumeric(level: AdSpendLevel): number {
  switch (level) {
    case "Low":
      return 3;
    case "Medium":
      return 6;
    case "High":
      return 9;
  }
}

interface DimensionDef {
  key: NumericDimensionKey;
  label: string;
  shortLabel: string;
  description: string;
}

const numericDimensions: DimensionDef[] = [
  {
    key: "seoVisibility",
    label: "SEO Visibility",
    shortLabel: "SEO",
    description: "Organic search presence, keyword rankings, and domain authority",
  },
  {
    key: "socialMediaPresence",
    label: "Social Media Presence",
    shortLabel: "Social",
    description: "Follower count, engagement rate, and platform coverage",
  },
  {
    key: "contentVolume",
    label: "Content Volume",
    shortLabel: "Content",
    description: "Blog posts, videos, podcasts, and other published assets",
  },
  {
    key: "brandRecognition",
    label: "Brand Recognition",
    shortLabel: "Brand",
    description: "Market awareness, recall, and brand sentiment",
  },
  {
    key: "innovationScore",
    label: "Innovation Score",
    shortLabel: "Innovation",
    description: "Product launches, feature updates, and market disruption",
  },
];

const defaultScores: CompetitorScores = {
  seoVisibility: 5,
  socialMediaPresence: 5,
  contentVolume: 5,
  paidAdSpend: "Medium",
  brandRecognition: 5,
  innovationScore: 5,
};

function createId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function createCompetitor(name: string, website: string, scores?: Partial<CompetitorScores>): Competitor {
  return {
    id: createId(),
    name,
    website,
    scores: { ...defaultScores, ...scores },
  };
}

const sampleCompetitors: Competitor[] = [
  createCompetitor("Acme Digital", "acmedigital.com", {
    seoVisibility: 7,
    socialMediaPresence: 6,
    contentVolume: 8,
    paidAdSpend: "High",
    brandRecognition: 7,
    innovationScore: 6,
  }),
  createCompetitor("BrightPath Agency", "brightpathagency.com", {
    seoVisibility: 5,
    socialMediaPresence: 8,
    contentVolume: 6,
    paidAdSpend: "Medium",
    brandRecognition: 6,
    innovationScore: 7,
  }),
  createCompetitor("Catalyst Marketing", "catalystmktg.com", {
    seoVisibility: 8,
    socialMediaPresence: 5,
    contentVolume: 7,
    paidAdSpend: "Low",
    brandRecognition: 8,
    innovationScore: 5,
  }),
];

/* ------------------------------------------------------------------ */
/*  Analysis helpers                                                   */
/* ------------------------------------------------------------------ */

function threatScore(c: Competitor): number {
  const numScores = numericDimensions.reduce((sum, d) => sum + c.scores[d.key], 0);
  const adScore = adSpendNumeric(c.scores.paidAdSpend);
  const total = numScores + adScore;
  // Max possible: 5 * 10 + 9 = 59, normalize to 0-100
  return Math.round((total / 59) * 100);
}

function yourThreatScore(profile: YourProfile): number {
  const numScores = numericDimensions.reduce((sum, d) => sum + profile.scores[d.key], 0);
  const adScore = adSpendNumeric(profile.scores.paidAdSpend);
  const total = numScores + adScore;
  return Math.round((total / 59) * 100);
}

interface GapItem {
  dimension: string;
  yourScore: number;
  competitorScore: number;
  gap: number;
  competitorName: string;
}

function computeGapsVsCompetitor(yours: YourProfile, comp: Competitor): GapItem[] {
  const items: GapItem[] = [];
  for (const d of numericDimensions) {
    const yourVal = yours.scores[d.key];
    const compVal = comp.scores[d.key];
    items.push({
      dimension: d.label,
      yourScore: yourVal,
      competitorScore: compVal,
      gap: yourVal - compVal,
      competitorName: comp.name || "Competitor",
    });
  }
  // Ad spend as numeric comparison
  const yourAd = adSpendNumeric(yours.scores.paidAdSpend);
  const compAd = adSpendNumeric(comp.scores.paidAdSpend);
  items.push({
    dimension: "Paid Ad Spend",
    yourScore: yourAd,
    competitorScore: compAd,
    gap: yourAd - compAd,
    competitorName: comp.name || "Competitor",
  });
  return items;
}

interface StrengthWeakness {
  strengths: string[];
  weaknesses: string[];
  neutral: string[];
}

function analyzeStrengthsWeaknesses(yours: YourProfile, competitors: Competitor[]): StrengthWeakness {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const neutral: string[] = [];

  for (const d of numericDimensions) {
    const yourVal = yours.scores[d.key];
    const compAvg =
      competitors.length > 0
        ? competitors.reduce((s, c) => s + c.scores[d.key], 0) / competitors.length
        : 0;
    const diff = yourVal - compAvg;
    if (diff >= 2) {
      strengths.push(`${d.label}: You score ${yourVal} vs competitor average of ${compAvg.toFixed(1)} (+${diff.toFixed(1)}). This is a clear competitive advantage.`);
    } else if (diff <= -2) {
      weaknesses.push(`${d.label}: You score ${yourVal} vs competitor average of ${compAvg.toFixed(1)} (${diff.toFixed(1)}). This gap needs attention.`);
    } else if (diff < 0) {
      neutral.push(`${d.label}: Slightly behind competitors (${diff.toFixed(1)}). Monitor and improve incrementally.`);
    } else {
      neutral.push(`${d.label}: On par with or slightly ahead of competitors (+${diff.toFixed(1)}). Maintain current performance.`);
    }
  }

  // Ad spend comparison
  const yourAd = adSpendNumeric(yours.scores.paidAdSpend);
  const compAdAvg =
    competitors.length > 0
      ? competitors.reduce((s, c) => s + adSpendNumeric(c.scores.paidAdSpend), 0) / competitors.length
      : 0;
  const adDiff = yourAd - compAdAvg;
  if (adDiff >= 2) {
    strengths.push(`Paid Ad Spend: Your ${yours.scores.paidAdSpend} spend outpaces the field. Leverage this visibility advantage.`);
  } else if (adDiff <= -2) {
    weaknesses.push(`Paid Ad Spend: Competitors are outspending you. Consider increasing investment or optimizing efficiency.`);
  } else {
    neutral.push(`Paid Ad Spend: Comparable to competitors. Focus on spend efficiency rather than volume.`);
  }

  return { strengths, weaknesses, neutral };
}

function formatExportText(
  yours: YourProfile,
  competitors: Competitor[],
  sortedCompetitors: Competitor[]
): string {
  const lines: string[] = [];

  lines.push("COMPETITIVE INTELLIGENCE DASHBOARD");
  lines.push("=".repeat(60));
  lines.push("");

  // Your profile
  lines.push("YOUR COMPANY");
  lines.push("-".repeat(60));
  lines.push(`  Name: ${yours.name || "Your Company"}`);
  lines.push(`  Overall Score: ${yourThreatScore(yours)}/100`);
  for (const d of numericDimensions) {
    lines.push(`  ${d.label}: ${yours.scores[d.key]}/10`);
  }
  lines.push(`  Paid Ad Spend: ${yours.scores.paidAdSpend}`);
  lines.push("");

  // Competitors sorted by threat
  lines.push("COMPETITORS (by threat level)");
  lines.push("-".repeat(60));
  for (const c of sortedCompetitors) {
    lines.push(`  ${c.name || "Unnamed"} (${c.website || "no website"})`);
    lines.push(`    Threat Score: ${threatScore(c)}/100`);
    for (const d of numericDimensions) {
      lines.push(`    ${d.label}: ${c.scores[d.key]}/10`);
    }
    lines.push(`    Paid Ad Spend: ${c.scores.paidAdSpend}`);
    lines.push("");
  }

  // Comparison table
  lines.push("SIDE-BY-SIDE COMPARISON");
  lines.push("-".repeat(60));
  const header = [
    "Dimension".padEnd(25),
    (yours.name || "You").padEnd(10),
    ...sortedCompetitors.map((c) => (c.name || "Comp").padEnd(10)),
  ];
  lines.push(header.join(" | "));
  for (const d of numericDimensions) {
    const row = [
      d.label.padEnd(25),
      String(yours.scores[d.key]).padEnd(10),
      ...sortedCompetitors.map((c) => String(c.scores[d.key]).padEnd(10)),
    ];
    lines.push(row.join(" | "));
  }
  const adRow = [
    "Paid Ad Spend".padEnd(25),
    yours.scores.paidAdSpend.padEnd(10),
    ...sortedCompetitors.map((c) => c.scores.paidAdSpend.padEnd(10)),
  ];
  lines.push(adRow.join(" | "));
  lines.push("");

  // Strength/weakness summary
  const analysis = analyzeStrengthsWeaknesses(yours, competitors);
  if (analysis.strengths.length > 0) {
    lines.push("STRENGTHS");
    lines.push("-".repeat(60));
    for (const s of analysis.strengths) {
      lines.push(`  + ${s}`);
    }
    lines.push("");
  }
  if (analysis.weaknesses.length > 0) {
    lines.push("WEAKNESSES");
    lines.push("-".repeat(60));
    for (const w of analysis.weaknesses) {
      lines.push(`  - ${w}`);
    }
    lines.push("");
  }

  lines.push(`Generated on ${new Date().toLocaleDateString()}`);
  lines.push("Markit Media - Competitive Intelligence Dashboard");

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Score slider                                                       */
/* ------------------------------------------------------------------ */

function ScoreSlider({
  id,
  label,
  description,
  value,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  value: number;
  onChange: (val: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label htmlFor={id} className="text-base font-bold text-black">
          {label}
        </label>
        <span className="text-base font-bold text-black tabular-nums w-8 text-right" aria-live="polite">
          {value}
        </span>
      </div>
      <p className="text-base text-neutral-500 mb-2">{description}</p>
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
/*  Ad spend selector                                                  */
/* ------------------------------------------------------------------ */

function AdSpendSelector({
  id,
  value,
  onChange,
}: {
  id: string;
  value: AdSpendLevel;
  onChange: (val: AdSpendLevel) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-base font-bold text-black mb-1">
        Paid Ad Spend
      </label>
      <p className="text-base text-neutral-500 mb-2">
        Estimated paid advertising investment level
      </p>
      <div className="flex gap-2">
        {AD_SPEND_LEVELS.map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => onChange(level)}
            className={`flex-1 min-h-[44px] px-4 py-3 text-base font-bold border transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
              value === level
                ? "bg-black text-white border-black"
                : "bg-white text-neutral-600 border-neutral-200 hover:border-black hover:text-black"
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Competitor card                                                    */
/* ------------------------------------------------------------------ */

function CompetitorCard({
  competitor,
  index,
  onUpdate,
  onRemove,
}: {
  competitor: Competitor;
  index: number;
  onUpdate: (updated: Competitor) => void;
  onRemove: () => void;
}) {
  function updateName(name: string) {
    onUpdate({ ...competitor, name });
  }
  function updateWebsite(website: string) {
    onUpdate({ ...competitor, website });
  }
  function updateNumericScore(key: NumericDimensionKey, value: number) {
    onUpdate({
      ...competitor,
      scores: { ...competitor.scores, [key]: value },
    });
  }
  function updateAdSpend(val: AdSpendLevel) {
    onUpdate({
      ...competitor,
      scores: { ...competitor.scores, paidAdSpend: val },
    });
  }

  const score = threatScore(competitor);

  return (
    <div className="border border-neutral-200">
      <div className="bg-black text-white px-6 py-4 flex items-center justify-between gap-4">
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
            Competitor {index + 1}
          </h3>
          <span className="text-base text-neutral-400">
            Threat: {score}/100
          </span>
        </div>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove competitor ${competitor.name || index + 1}`}
          className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-base font-bold text-neutral-400 hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          Remove
        </button>
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor={`comp-name-${competitor.id}`}
              className="block text-base font-bold text-black mb-2"
            >
              Company Name
            </label>
            <input
              id={`comp-name-${competitor.id}`}
              type="text"
              placeholder="Enter company name"
              value={competitor.name}
              onChange={(e) => updateName(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-200 text-base bg-white text-black min-h-[44px] focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
            />
          </div>
          <div>
            <label
              htmlFor={`comp-website-${competitor.id}`}
              className="block text-base font-bold text-black mb-2"
            >
              Website
            </label>
            <input
              id={`comp-website-${competitor.id}`}
              type="text"
              placeholder="example.com"
              value={competitor.website}
              onChange={(e) => updateWebsite(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-200 text-base bg-white text-black min-h-[44px] focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
            />
          </div>
        </div>
        {numericDimensions.map((d) => (
          <ScoreSlider
            key={d.key}
            id={`comp-${competitor.id}-${d.key}`}
            label={d.label}
            description={d.description}
            value={competitor.scores[d.key]}
            onChange={(val) => updateNumericScore(d.key, val)}
          />
        ))}
        <AdSpendSelector
          id={`comp-${competitor.id}-adspend`}
          value={competitor.scores.paidAdSpend}
          onChange={updateAdSpend}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Your profile card                                                  */
/* ------------------------------------------------------------------ */

function YourProfileCard({
  profile,
  onUpdate,
}: {
  profile: YourProfile;
  onUpdate: (updated: YourProfile) => void;
}) {
  function updateName(name: string) {
    onUpdate({ ...profile, name });
  }
  function updateNumericScore(key: NumericDimensionKey, value: number) {
    onUpdate({
      ...profile,
      scores: { ...profile.scores, [key]: value },
    });
  }
  function updateAdSpend(val: AdSpendLevel) {
    onUpdate({
      ...profile,
      scores: { ...profile.scores, paidAdSpend: val },
    });
  }

  const score = yourThreatScore(profile);

  return (
    <div className="border-2 border-black">
      <div className="bg-black text-white px-6 py-4">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
          Your Company
        </h3>
        <span className="text-base text-neutral-400">
          Score: {score}/100
        </span>
      </div>
      <div className="p-6 space-y-6">
        <div>
          <label
            htmlFor="your-company-name"
            className="block text-base font-bold text-black mb-2"
          >
            Your Company Name
          </label>
          <input
            id="your-company-name"
            type="text"
            placeholder="Enter your company name"
            value={profile.name}
            onChange={(e) => updateName(e.target.value)}
            className="w-full px-4 py-3 border border-neutral-200 text-base bg-white text-black min-h-[44px] focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
          />
        </div>
        {numericDimensions.map((d) => (
          <ScoreSlider
            key={d.key}
            id={`your-${d.key}`}
            label={d.label}
            description={d.description}
            value={profile.scores[d.key]}
            onChange={(val) => updateNumericScore(d.key, val)}
          />
        ))}
        <AdSpendSelector
          id="your-adspend"
          value={profile.scores.paidAdSpend}
          onChange={updateAdSpend}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Comparison table                                                   */
/* ------------------------------------------------------------------ */

function ComparisonTable({
  yours,
  competitors,
}: {
  yours: YourProfile;
  competitors: Competitor[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-base">
        <thead>
          <tr className="bg-black text-white">
            <th className="text-left px-4 py-3 font-bold" scope="col">
              Dimension
            </th>
            <th className="text-center px-4 py-3 font-bold" scope="col">
              {yours.name || "You"}
            </th>
            {competitors.map((c) => (
              <th key={c.id} className="text-center px-4 py-3 font-bold" scope="col">
                {c.name || "Competitor"}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {numericDimensions.map((d, di) => {
            const yourVal = yours.scores[d.key];
            const allVals = [yourVal, ...competitors.map((c) => c.scores[d.key])];
            const maxVal = Math.max(...allVals);
            const isYourMax = yourVal === maxVal && allVals.filter((v) => v === maxVal).length === 1;
            return (
              <tr
                key={d.key}
                className={di % 2 === 0 ? "bg-white" : "bg-neutral-50"}
              >
                <td className="px-4 py-3 font-bold text-black">{d.label}</td>
                <td
                  className={`text-center px-4 py-3 tabular-nums ${
                    isYourMax ? "font-extrabold text-black" : "text-neutral-600"
                  }`}
                >
                  {yourVal}
                </td>
                {competitors.map((c) => {
                  const val = c.scores[d.key];
                  const isMax = val === maxVal && allVals.filter((v) => v === maxVal).length === 1;
                  return (
                    <td
                      key={c.id}
                      className={`text-center px-4 py-3 tabular-nums ${
                        isMax ? "font-extrabold text-black" : "text-neutral-600"
                      }`}
                    >
                      {val}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          {/* Ad Spend row */}
          <tr className={numericDimensions.length % 2 === 0 ? "bg-white" : "bg-neutral-50"}>
            <td className="px-4 py-3 font-bold text-black">Paid Ad Spend</td>
            <td className="text-center px-4 py-3 text-neutral-600">
              {yours.scores.paidAdSpend}
            </td>
            {competitors.map((c) => (
              <td key={c.id} className="text-center px-4 py-3 text-neutral-600">
                {c.scores.paidAdSpend}
              </td>
            ))}
          </tr>
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-black">
            <td className="px-4 py-3 font-extrabold text-black">Threat Score</td>
            <td className="text-center px-4 py-3 font-extrabold text-black tabular-nums">
              {yourThreatScore(yours)}/100
            </td>
            {competitors.map((c) => {
              const ts = threatScore(c);
              return (
                <td key={c.id} className="text-center px-4 py-3 font-bold text-neutral-600 tabular-nums">
                  {ts}/100
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

function GapAnalysisPanel({
  yours,
  competitor,
}: {
  yours: YourProfile;
  competitor: Competitor;
}) {
  const gaps = computeGapsVsCompetitor(yours, competitor);
  const youLead = gaps.filter((g) => g.gap > 0);
  const theyLead = gaps.filter((g) => g.gap < 0);
  const tied = gaps.filter((g) => g.gap === 0);

  return (
    <div className="border border-neutral-200 p-6">
      <h4 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
        vs {competitor.name || "Competitor"}
      </h4>

      {youLead.length > 0 && (
        <div className="mb-4">
          <p className="text-base font-bold text-black mb-2">Areas you lead:</p>
          <div className="space-y-2">
            {youLead.map((g) => (
              <div key={g.dimension} className="flex items-center justify-between border-b border-neutral-100 pb-2">
                <span className="text-base text-black">{g.dimension}</span>
                <span className="text-base font-bold text-black tabular-nums">
                  +{g.gap} ({g.yourScore} vs {g.competitorScore})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {theyLead.length > 0 && (
        <div className="mb-4">
          <p className="text-base font-bold text-neutral-500 mb-2">Areas they lead:</p>
          <div className="space-y-2">
            {theyLead.map((g) => (
              <div key={g.dimension} className="flex items-center justify-between border-b border-neutral-100 pb-2">
                <span className="text-base text-black">{g.dimension}</span>
                <span className="text-base font-bold text-neutral-500 tabular-nums">
                  {g.gap} ({g.yourScore} vs {g.competitorScore})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tied.length > 0 && (
        <div>
          <p className="text-base font-bold text-neutral-400 mb-2">Even:</p>
          <div className="space-y-2">
            {tied.map((g) => (
              <div key={g.dimension} className="flex items-center justify-between border-b border-neutral-100 pb-2">
                <span className="text-base text-black">{g.dimension}</span>
                <span className="text-base text-neutral-400 tabular-nums">
                  {g.yourScore} vs {g.competitorScore}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Strength / weakness summary                                        */
/* ------------------------------------------------------------------ */

function StrengthWeaknessSummary({
  yours,
  competitors,
}: {
  yours: YourProfile;
  competitors: Competitor[];
}) {
  const analysis = analyzeStrengthsWeaknesses(yours, competitors);

  return (
    <div className="space-y-6">
      {analysis.strengths.length > 0 && (
        <div>
          <h4 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
            Strengths
          </h4>
          <div className="space-y-3">
            {analysis.strengths.map((s, i) => (
              <div key={i} className="border border-neutral-200 p-4 flex items-start gap-3">
                <span
                  className="inline-flex items-center justify-center min-w-[28px] h-7 bg-black text-white text-base font-bold flex-shrink-0"
                  aria-hidden="true"
                >
                  +
                </span>
                <p className="text-base text-neutral-700">{s}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {analysis.weaknesses.length > 0 && (
        <div>
          <h4 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
            Weaknesses
          </h4>
          <div className="space-y-3">
            {analysis.weaknesses.map((w, i) => (
              <div key={i} className="border border-neutral-200 p-4 flex items-start gap-3">
                <span
                  className="inline-flex items-center justify-center min-w-[28px] h-7 border-2 border-black text-black text-base font-bold flex-shrink-0"
                  aria-hidden="true"
                >
                  !
                </span>
                <p className="text-base text-neutral-700">{w}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {analysis.neutral.length > 0 && (
        <div>
          <h4 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
            Neutral
          </h4>
          <div className="space-y-3">
            {analysis.neutral.map((n, i) => (
              <div key={i} className="border border-neutral-100 p-4 flex items-start gap-3">
                <span
                  className="inline-flex items-center justify-center min-w-[28px] h-7 bg-neutral-200 text-neutral-600 text-base font-bold flex-shrink-0"
                  aria-hidden="true"
                >
                  =
                </span>
                <p className="text-base text-neutral-600">{n}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Educational content                                                */
/* ------------------------------------------------------------------ */

const educationalContent = [
  {
    title: "What Is Competitive Intelligence?",
    body: "Competitive intelligence is the systematic collection and analysis of information about your competitors, market trends, and industry dynamics. It transforms raw data into actionable insights that inform strategy, product development, and marketing decisions. Unlike corporate espionage, competitive intelligence relies entirely on publicly available information and ethical research methods.",
  },
  {
    title: "Key Data Sources",
    body: "Effective competitive intelligence draws from multiple sources: competitor websites and blogs, social media profiles and engagement metrics, SEO tools like Ahrefs or SEMrush for visibility data, ad libraries such as Meta Ad Library and Google Ads Transparency Center, review platforms like G2 and Trustpilot, press releases, job postings that reveal strategic priorities, and industry reports from analysts.",
  },
  {
    title: "Monitoring Frequency",
    body: "Set a regular cadence for competitive monitoring. Review social media and content output weekly. Conduct deeper SEO and ad spend analysis monthly. Perform a full competitive landscape review quarterly, updating scores in this dashboard each time. Major competitor announcements or market shifts warrant immediate reassessment regardless of your schedule.",
  },
  {
    title: "Acting on Insights",
    body: "Intelligence without action is just trivia. When this dashboard reveals a gap, translate it into a specific initiative: if a competitor dominates content volume, develop a content calendar to close the gap. If your SEO visibility trails, invest in technical SEO and link building. Share findings with your team in a brief monthly summary so competitive awareness becomes part of your culture, not a one-time exercise.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function CompetitiveIntelDashboardPage() {
  const [yourProfile, setYourProfile] = useState<YourProfile>({
    name: "",
    scores: { ...defaultScores },
  });
  const [competitors, setCompetitors] = useState<Competitor[]>(sampleCompetitors);
  const [sortBy, setSortBy] = useState<"threat-desc" | "threat-asc" | "name">("threat-desc");
  const [savedNotice, setSavedNotice] = useState(false);

  /* ---- localStorage: load ---- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw) as {
          yourProfile?: YourProfile;
          competitors?: Competitor[];
        };
        if (data.yourProfile) setYourProfile(data.yourProfile);
        if (data.competitors && data.competitors.length > 0) setCompetitors(data.competitors);
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
        JSON.stringify({ yourProfile, competitors })
      );
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 2000);
    } catch {
      /* storage full or unavailable */
    }
  }, [yourProfile, competitors]);

  /* ---- Competitor handlers ---- */
  function addCompetitor() {
    if (competitors.length >= 5) return;
    setCompetitors((prev) => [...prev, createCompetitor("", "")]);
  }

  function removeCompetitor(id: string) {
    setCompetitors((prev) => prev.filter((c) => c.id !== id));
  }

  function updateCompetitor(updated: Competitor) {
    setCompetitors((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  }

  /* ---- Sorted competitors ---- */
  const sortedCompetitors = useMemo(() => {
    const arr = [...competitors];
    switch (sortBy) {
      case "threat-desc":
        arr.sort((a, b) => threatScore(b) - threatScore(a));
        break;
      case "threat-asc":
        arr.sort((a, b) => threatScore(a) - threatScore(b));
        break;
      case "name":
        arr.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return arr;
  }, [competitors, sortBy]);

  /* ---- Named competitors for analysis ---- */
  const namedCompetitors = competitors.filter((c) => c.name.trim() !== "");
  const hasProfile = yourProfile.name.trim() !== "";
  const canAnalyze = hasProfile && namedCompetitors.length > 0;

  /* ---- Export ---- */
  const handleExport = useCallback(() => {
    if (!canAnalyze) return;
    const text = formatExportText(yourProfile, namedCompetitors, sortedCompetitors.filter((c) => c.name.trim() !== ""));
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "competitive-intel-dashboard.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [canAnalyze, yourProfile, namedCompetitors, sortedCompetitors]);

  /* ---- Reset ---- */
  function handleReset() {
    setYourProfile({ name: "", scores: { ...defaultScores } });
    setCompetitors(sampleCompetitors.map((c) => ({ ...c, id: createId() })));
  }

  return (
    <article className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Competitive Intelligence Dashboard",
          description:
            "Track up to 5 competitors across SEO, social media, content, ad spend, brand recognition, and innovation. Compare scores, identify gaps, and export insights.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          url: "https://themarkitmedia.com/en/resources/competitive-intel-dashboard",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Competitive Intel Dashboard" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Competitive Intelligence Dashboard
            </h1>
            <SectionDesc>
              Track up to 5 competitors across 6 key dimensions. Compare scores
              side-by-side, identify competitive gaps, generate a
              strength/weakness summary, and export your findings.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Your Company Profile ---- */}
      <section className="px-6 lg:px-12 pb-8" aria-label="Your company profile">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
              Your Company Profile
            </h2>
            <YourProfileCard
              profile={yourProfile}
              onUpdate={setYourProfile}
            />
          </Animate>
        </div>
      </section>

      {/* ---- Competitors ---- */}
      <section className="px-6 lg:px-12 pb-8" aria-label="Competitor tracking">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
                Competitors
              </h2>
              <div className="flex items-center gap-2">
                <label htmlFor="sort-by" className="text-base font-bold text-black">
                  Sort:
                </label>
                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="px-3 py-2 border border-neutral-200 text-base bg-white text-black min-h-[44px] focus-visible:border-black focus-visible:outline-none"
                >
                  <option value="threat-desc">Highest Threat</option>
                  <option value="threat-asc">Lowest Threat</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>
          </Animate>

          <div className="space-y-8">
            {sortedCompetitors.map((comp, i) => (
              <Animate key={comp.id} animation="fade-up">
                <CompetitorCard
                  competitor={comp}
                  index={i}
                  onUpdate={updateCompetitor}
                  onRemove={() => removeCompetitor(comp.id)}
                />
              </Animate>
            ))}

            {competitors.length < 5 && (
              <Animate animation="fade-up">
                <button
                  type="button"
                  onClick={addCompetitor}
                  className="w-full min-h-[44px] px-6 py-4 text-base font-bold border-2 border-dashed border-neutral-300 text-neutral-500 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  + Add Competitor ({competitors.length}/5)
                </button>
              </Animate>
            )}
          </div>
        </div>
      </section>

      {/* ---- Actions ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3 items-center">
              <button
                type="button"
                onClick={handleSave}
                className="bg-black text-white px-8 py-4 min-h-[44px] text-base font-bold hover:bg-neutral-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                {savedNotice ? "Saved" : "Save to Browser"}
              </button>
              <button
                type="button"
                onClick={handleExport}
                disabled={!canAnalyze}
                className="px-8 py-4 min-h-[44px] text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:text-neutral-300 disabled:border-neutral-100 disabled:cursor-not-allowed"
              >
                Export as .txt
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-4 min-h-[44px] text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Reset
              </button>
              {!canAnalyze && (
                <p className="text-base text-neutral-400 self-center">
                  {!hasProfile
                    ? "Enter your company name to enable analysis."
                    : "Add at least one named competitor."}
                </p>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Comparison Table ---- */}
      {canAnalyze && (
        <section className="px-6 lg:px-12 pb-16" aria-label="Side-by-side comparison">
          <div className="max-w-5xl mx-auto space-y-16">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                Side-by-Side Comparison
              </h2>
              <div className="border border-neutral-200">
                <ComparisonTable
                  yours={yourProfile}
                  competitors={sortedCompetitors.filter((c) => c.name.trim() !== "")}
                />
              </div>
            </Animate>

            {/* Gap analysis per competitor */}
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                Competitive Gap Analysis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedCompetitors
                  .filter((c) => c.name.trim() !== "")
                  .map((c) => (
                    <GapAnalysisPanel
                      key={c.id}
                      yours={yourProfile}
                      competitor={c}
                    />
                  ))}
              </div>
            </Animate>

            {/* Strength / weakness summary */}
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                Strength &amp; Weakness Summary
              </h2>
              <StrengthWeaknessSummary
                yours={yourProfile}
                competitors={namedCompetitors}
              />
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Educational Section ---- */}
      <section className="px-6 lg:px-12 py-16 border-t border-neutral-200" aria-label="Learn about competitive intelligence">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-8">
              Understanding Competitive Intelligence
            </h2>
          </Animate>
          <Stagger stagger={100} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {educationalContent.map((item, i) => (
              <div key={i} className="border border-neutral-200 p-6">
                <div className="flex items-start gap-4">
                  <span className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-neutral-300">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                      {item.title}
                    </h3>
                    <p className="text-base text-neutral-600 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- CTA Section ---- */}
      <section className="px-6 lg:px-12 py-16 bg-black text-white" aria-label="Get expert help">
        <div className="max-w-3xl mx-auto text-center">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold mb-4">
              Need Help Turning Insights Into Action?
            </h2>
            <p className="text-base text-neutral-400 mb-8 max-w-2xl mx-auto">
              Competitive intelligence is only valuable when it drives strategy.
              Our team can help you build a monitoring system, interpret the data,
              and develop campaigns that exploit your competitors&apos; weaknesses.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center min-h-[44px] px-8 py-4 text-base font-bold bg-white text-black hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a Free Consultation
            </Link>
          </Animate>
        </div>
      </section>

      {/* ---- Related Tools ---- */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
            Related Tools
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/resources/competitor-analysis"
              className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Competitor Analysis
            </Link>
            <Link
              href="/resources/competitor-benchmarking"
              className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Competitor Benchmarking
            </Link>
            <Link
              href="/resources/competitive-swot"
              className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Competitive SWOT
            </Link>
            <Link
              href="/resources/competitive-gap"
              className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Competitive Gap
            </Link>
          </div>
        </div>
      </section>
    
      <ToolCTA
        toolName="Competitive Intel Dashboard"
        services={[
          { title: "Digital Marketing", desc: "Data-driven strategy with transparent reporting and insights.", href: "/services/digital-marketing" },
          { title: "Performance Marketing", desc: "Campaign optimization based on real performance data.", href: "/services/performance-marketing" },
          { title: "SEO", desc: "SEO analytics that show exactly what drives organic growth.", href: "/services/seo" },
        ]}
        relatedTools={[
          { title: "Clv Calculator", href: "/resources/clv-calculator" },
          { title: "Client Onboarding Checklist", href: "/resources/client-onboarding-checklist" },
          { title: "Client Reporting Dashboard", href: "/resources/client-reporting-dashboard" },
          { title: "Color Palette Generator", href: "/resources/color-palette-generator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
