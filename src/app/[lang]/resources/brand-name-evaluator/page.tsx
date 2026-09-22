"use client";

import { useState, useCallback, useId } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CriterionDef {
  key: string;
  label: string;
  description: string;
}

interface Evaluation {
  id: string;
  brandName: string;
  industry: string;
  scores: Record<string, number>;
  overall: number;
  grade: string;
  timestamp: number;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const CRITERIA: CriterionDef[] = [
  { key: "memorability", label: "Memorability", description: "How easy is it to remember?" },
  { key: "pronounceability", label: "Pronounceability", description: "Can people say it easily?" },
  { key: "spelling", label: "Spelling", description: "Can people spell it after hearing it?" },
  { key: "uniqueness", label: "Uniqueness", description: "Does it stand out from competitors?" },
  { key: "relevance", label: "Relevance", description: "Does it relate to your industry/offering?" },
  { key: "emotional", label: "Emotional Appeal", description: "Does it evoke positive feelings?" },
  { key: "scalability", label: "Scalability", description: "Will it work as the business grows?" },
  { key: "domain", label: "Domain Potential", description: "Likely availability as a .com?" },
];

const WEIGHTS: Record<string, number> = {
  memorability: 1.5,
  pronounceability: 1.2,
  spelling: 1.0,
  uniqueness: 1.3,
  relevance: 1.0,
  emotional: 1.0,
  scalability: 1.0,
  domain: 1.0,
};

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "E-commerce",
  "Food & Beverage",
  "Fashion & Apparel",
  "Real Estate",
  "Consulting",
  "Marketing & Advertising",
  "Fitness & Wellness",
  "Travel & Hospitality",
  "Entertainment",
  "SaaS / Software",
  "Automotive",
  "Construction",
  "Legal Services",
  "Non-profit",
  "Other",
];

const DEFAULT_SCORES: Record<string, number> = Object.fromEntries(
  CRITERIA.map((c) => [c.key, 5])
);

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function calcOverall(scores: Record<string, number>): number {
  let totalWeight = 0;
  let totalScore = 0;
  for (const c of CRITERIA) {
    const w = WEIGHTS[c.key];
    totalWeight += w;
    totalScore += scores[c.key] * w;
  }
  return Math.round((totalScore / totalWeight) * 10);
}

function getGrade(score: number): string {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B+";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  return "D";
}

function getGradeColor(grade: string): string {
  if (grade === "A+" || grade === "A") return "text-black";
  if (grade === "B+" || grade === "B") return "text-neutral-600";
  return "text-neutral-400";
}

function getStrengths(scores: Record<string, number>): CriterionDef[] {
  return CRITERIA.filter((c) => scores[c.key] >= 8);
}

function getWeaknesses(scores: Record<string, number>): CriterionDef[] {
  return CRITERIA.filter((c) => scores[c.key] <= 4);
}

function makeId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/* ------------------------------------------------------------------ */
/*  Circular Progress Component                                        */
/* ------------------------------------------------------------------ */

function CircularScore({ score, size = 160 }: { score: number; size?: number }) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const grade = getGrade(score);

  return (
    <div className="flex flex-col items-center gap-3">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
        role="img"
        aria-label={`Overall score: ${score} out of 100, grade ${grade}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e5e5"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#000"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out motion-reduce:transition-none"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-black">
          {score}
        </span>
        <span className={`font-[family-name:var(--font-display)] text-lg font-extrabold ${getGradeColor(grade)}`}>
          {grade}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Horizontal Bar Component                                           */
/* ------------------------------------------------------------------ */

function ScoreBar({ label, description, value, onChange, inputId }: {
  label: string;
  description: string;
  value: number;
  onChange: (v: number) => void;
  inputId: string;
}) {
  const barPercent = (value / 10) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={inputId} className="text-base font-bold text-black">
          {label}
        </label>
        <span className="text-base font-extrabold text-black tabular-nums">{value}/10</span>
      </div>
      <p className="text-base text-neutral-500">{description}</p>
      <div className="flex items-center gap-4">
        <div className="flex-1 h-3 bg-neutral-100 rounded-full overflow-hidden" aria-hidden="true">
          <div
            className="h-full bg-black rounded-full transition-all duration-300 ease-out motion-reduce:transition-none"
            style={{ width: `${barPercent}%` }}
          />
        </div>
        <input
          id={inputId}
          type="range"
          min={1}
          max={10}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full max-w-[200px] accent-black cursor-pointer"
          aria-valuemin={1}
          aria-valuemax={10}
          aria-valuenow={value}
          aria-label={`${label} score`}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Static Score Bar (for history / comparison - no slider)            */
/* ------------------------------------------------------------------ */

function StaticBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden" aria-hidden="true">
        <div
          className="h-full bg-black rounded-full"
          style={{ width: `${(value / 10) * 100}%` }}
        />
      </div>
      <span className="text-base font-bold text-black tabular-nums w-10 text-right">{value}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function BrandNameEvaluatorPage() {
  const uid = useId();
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");
  const [scores, setScores] = useState<Record<string, number>>({ ...DEFAULT_SCORES });
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [activeEval, setActiveEval] = useState<Evaluation | null>(null);
  const [compareIds, setCompareIds] = useState<Set<string>>(new Set());
  const [showCompare, setShowCompare] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const overall = calcOverall(scores);
  const grade = getGrade(overall);
  const strengths = getStrengths(scores);
  const weaknesses = getWeaknesses(scores);

  const updateScore = useCallback((key: string, value: number) => {
    setScores((prev) => ({ ...prev, [key]: value }));
  }, []);

  /* Save current evaluation */
  const saveEvaluation = () => {
    if (!brandName.trim()) return;
    const evaluation: Evaluation = {
      id: makeId(),
      brandName: brandName.trim(),
      industry: industry || "Not specified",
      scores: { ...scores },
      overall,
      grade,
      timestamp: Date.now(),
    };
    setEvaluations((prev) => [evaluation, ...prev]);
    setActiveEval(evaluation);
  };

  /* Load an evaluation from history */
  const loadEvaluation = (ev: Evaluation) => {
    setBrandName(ev.brandName);
    setIndustry(ev.industry === "Not specified" ? "" : ev.industry);
    setScores({ ...ev.scores });
    setActiveEval(ev);
    setShowHistory(false);
  };

  /* Delete from history */
  const deleteEvaluation = (id: string) => {
    setEvaluations((prev) => prev.filter((e) => e.id !== id));
    setCompareIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    if (activeEval?.id === id) setActiveEval(null);
  };

  /* Reset form */
  const resetForm = () => {
    setBrandName("");
    setIndustry("");
    setScores({ ...DEFAULT_SCORES });
    setActiveEval(null);
  };

  /* Toggle compare selection */
  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  /* Export as .txt */
  const exportTxt = (ev: Evaluation) => {
    const lines: string[] = [
      "BRAND NAME EVALUATION",
      "=" .repeat(40),
      "",
      `Brand Name: ${ev.brandName}`,
      `Industry: ${ev.industry}`,
      `Date: ${new Date(ev.timestamp).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
      "",
      "SCORES",
      "-".repeat(40),
    ];

    for (const c of CRITERIA) {
      const s = ev.scores[c.key];
      const bar = "#".repeat(s) + ".".repeat(10 - s);
      lines.push(`${c.label.padEnd(20)} [${bar}] ${s}/10`);
    }

    lines.push("");
    lines.push("-".repeat(40));
    lines.push(`OVERALL SCORE: ${ev.overall}/100 (Grade: ${ev.grade})`);
    lines.push("");

    const evStrengths = CRITERIA.filter((c) => ev.scores[c.key] >= 8);
    const evWeaknesses = CRITERIA.filter((c) => ev.scores[c.key] <= 4);

    if (evStrengths.length > 0) {
      lines.push("STRENGTHS");
      evStrengths.forEach((c) => lines.push(`  + ${c.label} (${ev.scores[c.key]}/10)`));
      lines.push("");
    }

    if (evWeaknesses.length > 0) {
      lines.push("AREAS FOR IMPROVEMENT");
      evWeaknesses.forEach((c) => lines.push(`  - ${c.label} (${ev.scores[c.key]}/10)`));
      lines.push("");
    }

    lines.push("Generated by Markit Media Brand Name Evaluator");
    lines.push("https://themarkitmedia.com/en/resources/brand-name-evaluator");

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brand-evaluation-${ev.brandName.toLowerCase().replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /* Compared evaluations */
  const comparedEvals = evaluations.filter((e) => compareIds.has(e.id));

  return (
    <article>
      <nav className="px-6 lg:px-12 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><a href="/" className="hover:text-black transition-colors">Home</a></li>
          <li aria-hidden="true">/</li>
          <li><a href="/resources" className="hover:text-black transition-colors">Resources</a></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">Brand Name Evaluator</li>
        </ol>
      </nav>
      {/* -------------------------------------------------------- Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Brand Name Evaluator
            </h1>
            <SectionDesc>
              Score your brand name across eight critical criteria. Compare multiple options side by side and export your evaluations.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ------------------------------------------------- Input Form */}
      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <Animate animation="fade-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor={`${uid}-name`} className="block text-base font-bold text-black mb-2">
                  Brand Name
                </label>
                <input
                  id={`${uid}-name`}
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g. Markit Media"
                  className="w-full px-4 py-3 border border-neutral-200 text-base focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none"
                />
              </div>
              <div>
                <label htmlFor={`${uid}-industry`} className="block text-base font-bold text-black mb-2">
                  Industry
                </label>
                <select
                  id={`${uid}-industry`}
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-200 text-base bg-white focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none"
                >
                  <option value="">Select an industry</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ---------------------------------------------- Scoring Sliders */}
      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up" delay={60}>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-2">
              Rate Each Criterion
            </h2>
            <p className="text-base text-neutral-500 mb-8">
              Drag each slider to rate the brand name from 1 (poor) to 10 (excellent).
            </p>
            <div className="space-y-8">
              {CRITERIA.map((c) => (
                <ScoreBar
                  key={c.key}
                  label={c.label}
                  description={c.description}
                  value={scores[c.key]}
                  onChange={(v) => updateScore(c.key, v)}
                  inputId={`${uid}-${c.key}`}
                />
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---------------------------------------- Overall Score Display */}
      <section className="px-6 lg:px-12 py-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="border border-neutral-200 p-8 sm:p-10">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-8 text-center">
                Overall Score
              </h2>
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <CircularScore score={overall} size={160} />
                </div>
              </div>

              {brandName.trim() && (
                <p className="text-center text-lg text-neutral-500 mb-6">
                  <span className="font-bold text-black">{brandName.trim()}</span>
                  {industry && <> in {industry}</>}
                </p>
              )}

              {/* Strengths */}
              {strengths.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">
                    Strengths
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {strengths.map((c) => (
                      <span
                        key={c.key}
                        className="px-4 py-2 bg-black text-white text-base font-bold"
                      >
                        {c.label} ({scores[c.key]}/10)
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Weaknesses */}
              {weaknesses.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">
                    Areas for Improvement
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {weaknesses.map((c) => (
                      <span
                        key={c.key}
                        className="px-4 py-2 border border-neutral-300 text-neutral-600 text-base font-bold"
                      >
                        {c.label} ({scores[c.key]}/10)
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* No particular strengths/weaknesses message */}
              {strengths.length === 0 && weaknesses.length === 0 && (
                <p className="text-base text-neutral-500 text-center">
                  Adjust the sliders above to see strengths and areas for improvement.
                </p>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 mt-8 justify-center">
                <button
                  onClick={saveEvaluation}
                  disabled={!brandName.trim()}
                  className="bg-black text-white px-8 py-4 text-base font-bold hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Save Evaluation
                </button>
                {activeEval && (
                  <button
                    onClick={() => exportTxt(activeEval)}
                    className="border border-neutral-200 text-black px-8 py-4 text-base font-bold hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    Export as .txt
                  </button>
                )}
                <button
                  onClick={resetForm}
                  className="border border-neutral-200 text-neutral-600 px-8 py-4 text-base font-bold hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Reset
                </button>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ------------------------------------------- Evaluation History */}
      {evaluations.length > 0 && (
        <section className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <div className="border border-neutral-200 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                    Evaluation History ({evaluations.length})
                  </h2>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="text-base font-bold text-black underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    {showHistory ? "Collapse" : "Expand"}
                  </button>
                </div>

                {showHistory && (
                  <div className="space-y-4">
                    {evaluations.map((ev) => (
                      <div
                        key={ev.id}
                        className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 border transition-colors motion-reduce:transition-none ${
                          compareIds.has(ev.id) ? "border-black bg-neutral-50" : "border-neutral-200"
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-bold text-black truncate">{ev.brandName}</p>
                          <p className="text-base text-neutral-500">
                            {ev.industry} &middot; Score: {ev.overall}/100 &middot; Grade: {ev.grade}
                          </p>
                          <p className="text-base text-neutral-400">
                            {new Date(ev.timestamp).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2 shrink-0">
                          <button
                            onClick={() => loadEvaluation(ev)}
                            className="px-4 py-2 text-base font-bold bg-black text-white hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                          >
                            Load
                          </button>
                          <button
                            onClick={() => toggleCompare(ev.id)}
                            className={`px-4 py-2 text-base font-bold border transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                              compareIds.has(ev.id)
                                ? "border-black bg-black text-white"
                                : "border-neutral-200 text-black hover:border-black"
                            }`}
                          >
                            {compareIds.has(ev.id) ? "Selected" : "Compare"}
                          </button>
                          <button
                            onClick={() => exportTxt(ev)}
                            className="px-4 py-2 text-base font-bold border border-neutral-200 text-black hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                          >
                            Export
                          </button>
                          <button
                            onClick={() => deleteEvaluation(ev.id)}
                            className="px-4 py-2 text-base font-bold border border-neutral-200 text-neutral-500 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Compare button */}
                {compareIds.size >= 2 && (
                  <div className="mt-6 pt-6 border-t border-neutral-200">
                    <button
                      onClick={() => setShowCompare(true)}
                      className="bg-black text-white px-8 py-4 text-base font-bold hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                    >
                      Compare Selected ({compareIds.size})
                    </button>
                  </div>
                )}
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ---------------------------------------- Comparison Table */}
      {showCompare && comparedEvals.length >= 2 && (
        <section className="px-6 lg:px-12 pb-12">
          <div className="max-w-5xl mx-auto">
            <Animate animation="fade-up">
              <div className="border border-neutral-200 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                    Side-by-Side Comparison
                  </h2>
                  <button
                    onClick={() => {
                      setShowCompare(false);
                      setCompareIds(new Set());
                    }}
                    className="text-base font-bold text-neutral-500 hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    Close
                  </button>
                </div>

                <div className="overflow-x-auto -mx-6 sm:-mx-8 px-6 sm:px-8">
                  <table className="w-full text-base border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b-2 border-black">
                        <th className="text-left py-3 pr-4 font-bold text-black">Criterion</th>
                        {comparedEvals.map((ev) => (
                          <th key={ev.id} className="text-center py-3 px-3 font-bold text-black">
                            {ev.brandName}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {CRITERIA.map((c) => {
                        const maxScore = Math.max(...comparedEvals.map((ev) => ev.scores[c.key]));
                        return (
                          <tr key={c.key} className="border-b border-neutral-100">
                            <td className="py-3 pr-4 font-bold text-black">{c.label}</td>
                            {comparedEvals.map((ev) => {
                              const isMax = ev.scores[c.key] === maxScore && comparedEvals.length > 1;
                              return (
                                <td key={ev.id} className="py-3 px-3 text-center">
                                  <span className={`tabular-nums ${isMax ? "font-extrabold text-black" : "text-neutral-500"}`}>
                                    {ev.scores[c.key]}/10
                                  </span>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                      <tr className="border-t-2 border-black">
                        <td className="py-3 pr-4 font-extrabold text-black">Overall</td>
                        {comparedEvals.map((ev) => {
                          const maxOverall = Math.max(...comparedEvals.map((e) => e.overall));
                          const isMax = ev.overall === maxOverall && comparedEvals.length > 1;
                          return (
                            <td key={ev.id} className="py-3 px-3 text-center">
                              <span className={`font-extrabold tabular-nums ${isMax ? "text-black" : "text-neutral-500"}`}>
                                {ev.overall}/100
                              </span>
                              <br />
                              <span className="text-base font-bold text-neutral-500">Grade: {ev.grade}</span>
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ----------------------------------- Scoring Guide / Tips */}
      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              How to Score Your Brand Name
            </h2>
            <div className="space-y-6 text-base text-neutral-500 leading-relaxed">
              <div>
                <h3 className="font-bold text-black mb-2">Be honest with your ratings</h3>
                <p>
                  It is tempting to rate your favorite name highly across the board. Ask colleagues or potential customers to score independently, then compare.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Test memorability with the phone test</h3>
                <p>
                  Say the name once in a phone call. If the other person can remember and spell it correctly five minutes later, it scores well on memorability and spelling.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Check real domain availability</h3>
                <p>
                  Domain Potential is a prediction. Before making a final decision, search a domain registrar to confirm your .com (or preferred TLD) is available and affordable.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Think five years ahead</h3>
                <p>
                  For scalability, consider whether the name pigeonholes you into a single product, geography, or niche. The best brand names grow with the business.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Compare at least three options</h3>
                <p>
                  Use the comparison feature to evaluate multiple candidates. Patterns become visible when you see the scores side by side, not in isolation.
                </p>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* --------------------------------------------------------- CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Choosing a Brand Name?
            </h2>
            <p className="text-lg text-neutral-400 mt-4 mb-8">
              Our branding team can evaluate options, conduct market research, and build a brand identity that resonates with your audience.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Start Your Branding Project &rarr;
            </Link>
          </Animate>
        </div>
      </section>
          
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/brand-name-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Name Generator</Link>
                <Link href="/resources/brand-voice-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Voice Generator</Link>
                <Link href="/resources/brand-voice-checker" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Voice Checker</Link>
                <Link href="/resources/brand-tone-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Tone Generator</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Brand Name Evaluator",
          description: "Score and evaluate brand names across memorability, pronounceability, uniqueness, and more. Free tool from Markit Media.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Brand Name Evaluator"
        services={[
          { title: "Branding", desc: "Strategic brand identity that differentiates you in your market.", href: "/services/branding" },
          { title: "Website Development", desc: "Websites that bring your brand to life with exceptional UX.", href: "/services/website-development" },
          { title: "Digital Marketing", desc: "Amplify your brand across every digital touchpoint.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
          { title: "Brand Consistency Checker", href: "/resources/brand-consistency-checker" },
          { title: "Brand Guidelines Checklist", href: "/resources/brand-guidelines-checklist" },
          { title: "Brand Name Generator", href: "/resources/brand-name-generator" },
          { title: "Brand Positioning", href: "/resources/brand-positioning" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
