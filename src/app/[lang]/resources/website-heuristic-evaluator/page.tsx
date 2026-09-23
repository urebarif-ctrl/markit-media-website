"use client";

import { useState, useEffect, useCallback, useId } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Data: Nielsen's 10 Usability Heuristics                           */
/* ------------------------------------------------------------------ */

interface EvalQuestion {
  id: string;
  text: string;
}

interface Heuristic {
  id: string;
  name: string;
  description: string;
  questions: EvalQuestion[];
}

const HEURISTICS: Heuristic[] = [
  {
    id: "h1",
    name: "Website Heuristic Evaluator",
    description:
      "The system should always keep users informed about what is going on, through appropriate feedback within reasonable time.",
    questions: [
      { id: "h1q1", text: "Does the interface clearly indicate loading states and progress?" },
      { id: "h1q2", text: "Can users always tell where they are within the site structure?" },
      { id: "h1q3", text: "Does the system provide immediate feedback when users take actions?" },
      { id: "h1q4", text: "Are success and completion states clearly communicated?" },
    ],
  },
  {
    id: "h2",
    name: "Match Between System and Real World",
    description:
      "The system should speak the users' language, with words, phrases, and concepts familiar to the user, rather than system-oriented terms.",
    questions: [
      { id: "h2q1", text: "Does the site use language and terminology its target audience understands?" },
      { id: "h2q2", text: "Are icons and visual metaphors intuitive and recognizable?" },
      { id: "h2q3", text: "Is information presented in a natural and logical order?" },
    ],
  },
  {
    id: "h3",
    name: "User Control and Freedom",
    description:
      "Users often choose system functions by mistake and need a clearly marked 'emergency exit' to leave the unwanted state.",
    questions: [
      { id: "h3q1", text: "Can users easily undo or redo their actions?" },
      { id: "h3q2", text: "Is there always a clear way to go back or exit a process?" },
      { id: "h3q3", text: "Can users cancel operations that are in progress?" },
    ],
  },
  {
    id: "h4",
    name: "Consistency and Standards",
    description:
      "Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform conventions.",
    questions: [
      { id: "h4q1", text: "Are design elements (buttons, links, headings) styled consistently throughout?" },
      { id: "h4q2", text: "Does the navigation follow conventions users expect from similar sites?" },
      { id: "h4q3", text: "Is terminology used consistently across all pages?" },
      { id: "h4q4", text: "Do similar actions behave the same way across the site?" },
    ],
  },
  {
    id: "h5",
    name: "Error Prevention",
    description:
      "Even better than good error messages is a careful design which prevents problems from occurring in the first place.",
    questions: [
      { id: "h5q1", text: "Do forms provide input constraints and validation before submission?" },
      { id: "h5q2", text: "Are destructive actions (delete, submit) confirmed before executing?" },
      { id: "h5q3", text: "Does the interface guide users away from common mistakes?" },
    ],
  },
  {
    id: "h6",
    name: "Recognition Rather Than Recall",
    description:
      "Minimize the user's memory load by making objects, actions, and options visible. Instructions should be visible or easily retrievable.",
    questions: [
      { id: "h6q1", text: "Are important options and actions visible rather than hidden in menus?" },
      { id: "h6q2", text: "Does the interface provide contextual help or hints where needed?" },
      { id: "h6q3", text: "Can users see their recent history or selections easily?" },
    ],
  },
  {
    id: "h7",
    name: "Flexibility and Efficiency of Use",
    description:
      "Accelerators, unseen by the novice user, may speed up interaction for expert users so that the system caters to both groups.",
    questions: [
      { id: "h7q1", text: "Can experienced users find shortcuts or faster paths to complete tasks?" },
      { id: "h7q2", text: "Does the site allow users to customize or personalize their experience?" },
      { id: "h7q3", text: "Are frequent actions easy to access without excessive clicks?" },
    ],
  },
  {
    id: "h8",
    name: "Aesthetic and Minimalist Design",
    description:
      "Dialogues should not contain information which is irrelevant or rarely needed. Every extra unit of information competes with relevant units.",
    questions: [
      { id: "h8q1", text: "Is the visual design clean without unnecessary clutter?" },
      { id: "h8q2", text: "Does each page focus on essential content without distractions?" },
      { id: "h8q3", text: "Is whitespace used effectively to improve readability?" },
      { id: "h8q4", text: "Are visual elements purposeful rather than purely decorative?" },
    ],
  },
  {
    id: "h9",
    name: "Help Users Recognize, Diagnose, and Recover from Errors",
    description:
      "Error messages should be expressed in plain language, precisely indicate the problem, and constructively suggest a solution.",
    questions: [
      { id: "h9q1", text: "Are error messages written in plain, human-readable language?" },
      { id: "h9q2", text: "Do error messages clearly explain what went wrong?" },
      { id: "h9q3", text: "Do error messages suggest specific steps to resolve the issue?" },
    ],
  },
  {
    id: "h10",
    name: "Help and Documentation",
    description:
      "Even though it is better if the system can be used without documentation, it may be necessary to provide help. Such information should be easy to search and focused on the user's task.",
    questions: [
      { id: "h10q1", text: "Is help content easy to find when users need it?" },
      { id: "h10q2", text: "Does the site have an FAQ, knowledge base, or search function?" },
      { id: "h10q3", text: "Are help articles task-oriented rather than system-oriented?" },
    ],
  },
];

const SCORE_LABELS = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
] as const;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface SavedEvaluation {
  id: string;
  url: string;
  date: string;
  scores: Record<string, number>;
  notes: Record<string, string>;
  overallPct: number;
  grade: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function getGrade(pct: number): { grade: string; label: string; description: string } {
  if (pct >= 90) return { grade: "A", label: "Excellent", description: "This website follows usability heuristics very well. Focus on fine-tuning specific areas." };
  if (pct >= 80) return { grade: "B", label: "Good", description: "Strong usability with a few areas that could use improvement." };
  if (pct >= 65) return { grade: "C", label: "Average", description: "Several heuristics need attention. Prioritize the lowest-scoring areas." };
  if (pct >= 50) return { grade: "D", label: "Below Average", description: "Significant usability issues across multiple heuristics." };
  return { grade: "F", label: "Needs Major Work", description: "Fundamental usability problems that likely frustrate users and hurt conversions." };
}

function heuristicPct(heuristic: Heuristic, scores: Record<string, number>): number {
  const vals = heuristic.questions.map((q) => scores[q.id]).filter((v) => v != null);
  if (vals.length === 0) return 0;
  const max = vals.length * 5;
  return Math.round((vals.reduce((a, b) => a + b, 0) / max) * 100);
}

function overallPct(scores: Record<string, number>): number {
  const all = HEURISTICS.flatMap((h) => h.questions.map((q) => scores[q.id])).filter((v) => v != null);
  if (all.length === 0) return 0;
  return Math.round((all.reduce((a, b) => a + b, 0) / (all.length * 5)) * 100);
}

function allQuestionsAnswered(scores: Record<string, number>): boolean {
  return HEURISTICS.every((h) => h.questions.every((q) => scores[q.id] != null));
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */



export default function WebsiteHeuristicEvaluatorPage() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [scores, setScores] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [savedEvals, setSavedEvals] = useState<SavedEvaluation[]>([]);
  const [showSaved, setShowSaved] = useState(false);

  const formId = useId();

  // Load saved evaluations from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("heuristic-evaluations");
      if (stored) setSavedEvals(JSON.parse(stored));
    } catch {
      // ignore parse errors
    }
  }, []);

  const setScore = useCallback((questionId: string, value: number) => {
    setScores((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const setNote = useCallback((heuristicId: string, value: string) => {
    setNotes((prev) => ({ ...prev, [heuristicId]: value }));
  }, []);

  const overall = overallPct(scores);
  const gradeInfo = getGrade(overall);
  const isComplete = allQuestionsAnswered(scores);

  // Ranked heuristics by score (ascending = worst first)
  const rankedHeuristics = [...HEURISTICS]
    .map((h) => ({ ...h, pct: heuristicPct(h, scores) }))
    .sort((a, b) => a.pct - b.pct);

  const bottomThree = rankedHeuristics.slice(0, 3);

  /* ---- Save to localStorage ---- */
  const handleSave = () => {
    const evaluation: SavedEvaluation = {
      id: Date.now().toString(),
      url: websiteUrl || "Untitled evaluation",
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      scores: { ...scores },
      notes: { ...notes },
      overallPct: overall,
      grade: gradeInfo.grade,
    };
    const updated = [evaluation, ...savedEvals].slice(0, 20);
    setSavedEvals(updated);
    try {
      localStorage.setItem("heuristic-evaluations", JSON.stringify(updated));
    } catch {
      // storage full - silent fail
    }
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedEvals.filter((e) => e.id !== id);
    setSavedEvals(updated);
    localStorage.setItem("heuristic-evaluations", JSON.stringify(updated));
  };

  const handleLoadSaved = (evaluation: SavedEvaluation) => {
    setWebsiteUrl(evaluation.url);
    setScores(evaluation.scores);
    setNotes(evaluation.notes);
    setShowResults(true);
    setShowSaved(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---- Export as .txt ---- */
  const handleExport = () => {
    const lines: string[] = [];
    lines.push("WEBSITE HEURISTIC EVALUATION REPORT");
    lines.push("=".repeat(50));
    lines.push("");
    lines.push(`Website: ${websiteUrl || "Not specified"}`);
    lines.push(`Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`);
    lines.push(`Overall Score: ${overall}% (Grade: ${gradeInfo.grade} - ${gradeInfo.label})`);
    lines.push("");
    lines.push("-".repeat(50));
    lines.push("");

    HEURISTICS.forEach((h, i) => {
      const pct = heuristicPct(h, scores);
      lines.push(`${i + 1}. ${h.name} - ${pct}%`);
      lines.push(`   ${h.description}`);
      lines.push("");
      h.questions.forEach((q) => {
        const val = scores[q.id];
        lines.push(`   [${val ?? "-"}/5] ${q.text}`);
      });
      if (notes[h.id]) {
        lines.push("");
        lines.push(`   Notes: ${notes[h.id]}`);
      }
      lines.push("");
    });

    lines.push("-".repeat(50));
    lines.push("");
    lines.push("TOP 3 AREAS FOR IMPROVEMENT:");
    bottomThree.forEach((h, i) => {
      lines.push(`  ${i + 1}. ${h.name} (${h.pct}%)`);
    });
    lines.push("");
    lines.push("PRIORITY FINDINGS:");
    rankedHeuristics.forEach((h) => {
      if (h.pct < 60) {
        lines.push(`  [CRITICAL] ${h.name} - ${h.pct}%`);
      } else if (h.pct < 80) {
        lines.push(`  [IMPROVE]  ${h.name} - ${h.pct}%`);
      }
    });
    lines.push("");
    lines.push("Generated by Markit Media Website Heuristic Evaluator");
    lines.push("https://themarkitmedia.com/resources/website-heuristic-evaluator");

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `heuristic-evaluation-${websiteUrl ? websiteUrl.replace(/https?:\/\//, "").replace(/[^a-zA-Z0-9]/g, "-") : "report"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ---- Reset ---- */
  const handleReset = () => {
    setScores({});
    setNotes({});
    setShowResults(false);
    setWebsiteUrl("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                          */
  /* ---------------------------------------------------------------- */

  return (
    <article className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Website Development",
          description: "The system should always keep users informed about what is going on, through appropriate feedback within reasonable time.",
          url: "https://themarkitmedia.com/en/resources/website-heuristic-evaluator",
          applicationCategory: "Web Development Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Website Heuristic Evaluator | Free Marketing Tool — Markit Media</title>
      <link rel="canonical" href="https://themarkitmedia.com/en/resources/website-heuristic-evaluator" />
      <meta name="description" content="The system should always keep users informed about what is going on, through appropriate feedback within reasonable time." />
      {/* Breadcrumb */}
      <nav className="px-6 lg:px-12 pt-20 pb-4" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-base text-gray-500 max-w-7xl mx-auto">
          <li>
            <Link href="/" className="hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              Home
            </Link>
          </li>
          <li className="flex items-center gap-1.5">
            <span aria-hidden="true">/</span>
            <Link href="/resources" className="hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              Resources
            </Link>
          </li>
          <li className="flex items-center gap-1.5">
            <span aria-hidden="true">/</span>
            <span className="text-black font-medium" aria-current="page">Heuristic Evaluator</span>
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Website Heuristic Evaluator
            </h1>
            <p className="text-lg text-neutral-500 leading-relaxed mt-4 max-w-2xl">
              Evaluate any website against Nielsen&apos;s 10 usability heuristics. Score each principle,
              capture observations, and identify the highest-priority improvements.
            </p>
          </Animate>
        </div>
      </section>

      {/* Website URL Input */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="border border-neutral-200 p-6">
              <label htmlFor={`${formId}-url`} className="block text-base font-bold text-black mb-2">
                Website URL
              </label>
              <p className="text-base text-neutral-500 mb-3">
                Enter the URL of the website you are evaluating for reference.
              </p>
              <input
                id={`${formId}-url`}
                type="url"
                placeholder="https://example.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="w-full border border-neutral-300 px-4 py-3 text-base text-black bg-white placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              />
            </div>
          </Animate>

          {/* Saved evaluations toggle */}
          {savedEvals.length > 0 && (
            <div className="mt-4">
              <button
                onClick={() => setShowSaved(!showSaved)}
                className="text-base font-bold text-black underline underline-offset-4 hover:text-neutral-600 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                {showSaved ? "Hide" : "View"} saved evaluations ({savedEvals.length})
              </button>

              {showSaved && (
                <div className="mt-4 space-y-3">
                  {savedEvals.map((ev) => (
                    <div key={ev.id} className="flex items-center justify-between border border-neutral-200 p-4">
                      <div>
                        <span className="text-base font-bold text-black">{ev.url}</span>
                        <span className="text-base text-neutral-500 ml-3">{ev.date}</span>
                        <span className="text-base font-bold text-black ml-3">Grade: {ev.grade} ({ev.overallPct}%)</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleLoadSaved(ev)}
                          className="px-4 py-2 text-base font-bold bg-black text-white hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => handleDeleteSaved(ev.id)}
                          className="px-4 py-2 text-base font-bold border border-neutral-300 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Heuristic Evaluation Forms */}
      {!showResults && (
        <section className="px-6 lg:px-12 py-8" aria-label="Heuristic evaluation questions">
          <div className="max-w-4xl mx-auto space-y-10">
            {HEURISTICS.map((h, hIndex) => {
              const pct = heuristicPct(h, scores);
              const answered = h.questions.filter((q) => scores[q.id] != null).length;
              const total = h.questions.length;

              return (
                <Animate key={h.id} animation="fade-up">
                  <div className="border border-neutral-200">
                    {/* Heuristic header */}
                    <div className="bg-neutral-50 px-6 py-5 border-b border-neutral-200">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                            {hIndex + 1}. {h.name}
                          </h2>
                          <p className="text-base text-neutral-500 leading-relaxed mt-1">
                            {h.description}
                          </p>
                        </div>
                        {answered > 0 && (
                          <div className="flex-shrink-0 text-right">
                            <span className="text-base font-bold text-black">{pct}%</span>
                            <span className="text-base text-neutral-400 ml-1">({answered}/{total})</span>
                          </div>
                        )}
                      </div>

                      {/* Score bar */}
                      {answered > 0 && (
                        <div className="mt-3 w-full bg-neutral-200 h-2" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${h.name} score`}>
                          <div
                            className="bg-black h-2 transition-all duration-300 motion-reduce:transition-none"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Questions */}
                    <div className="px-6 py-5 space-y-6">
                      {h.questions.map((q) => (
                        <fieldset key={q.id}>
                          <legend className="text-base font-bold text-black mb-3">
                            {q.text}
                          </legend>
                          <div className="flex flex-wrap gap-2">
                            {SCORE_LABELS.map((label, idx) => {
                              const value = idx + 1;
                              const isSelected = scores[q.id] === value;
                              return (
                                <label
                                  key={value}
                                  className={`cursor-pointer px-4 py-2 text-base font-medium transition-colors motion-reduce:transition-none border focus-within:outline-2 focus-within:outline-black focus-within:outline-offset-2 ${
                                    isSelected
                                      ? "bg-black text-white border-black"
                                      : "bg-white text-neutral-600 border-neutral-300 hover:border-black hover:text-black"
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={q.id}
                                    value={value}
                                    checked={isSelected}
                                    onChange={() => setScore(q.id, value)}
                                    className="sr-only"
                                  />
                                  <span className="block text-center">
                                    <span className="block font-bold">{value}</span>
                                    <span className="block text-base">{label}</span>
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </fieldset>
                      ))}

                      {/* Notes textarea */}
                      <div>
                        <label htmlFor={`${formId}-notes-${h.id}`} className="block text-base font-bold text-black mb-2">
                          Observations for {h.name}
                        </label>
                        <textarea
                          id={`${formId}-notes-${h.id}`}
                          rows={3}
                          placeholder="Note any specific issues, examples, or recommendations..."
                          value={notes[h.id] ?? ""}
                          onChange={(e) => setNote(h.id, e.target.value)}
                          className="w-full border border-neutral-300 px-4 py-3 text-base text-black bg-white placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 resize-y"
                        />
                      </div>
                    </div>
                  </div>
                </Animate>
              );
            })}

            {/* Submit button */}
            <div className="text-center pt-4">
              <button
                onClick={() => isComplete && setShowResults(true)}
                disabled={!isComplete}
                className={`inline-flex items-center gap-3 px-10 py-5 font-bold text-base transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                  isComplete
                    ? "bg-black text-white hover:bg-neutral-800"
                    : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                }`}
              >
                View Results &rarr;
              </button>
              {!isComplete && (
                <p className="text-base text-neutral-500 mt-3">
                  Answer all questions across each heuristic to see your results.
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {showResults && (
        <>
          {/* Overall score */}
          <section className="px-6 lg:px-12 py-8" aria-label="Overall score">
            <div className="max-w-4xl mx-auto">
              <Animate animation="fade-up">
                <div className="bg-black text-white p-8 text-center">
                  <div className="font-[family-name:var(--font-display)] text-6xl font-extrabold">
                    {gradeInfo.grade}
                  </div>
                  <div className="text-lg font-bold mt-2">{gradeInfo.label}</div>
                  <div className="text-base text-neutral-400 mt-2">
                    Overall Score: {overall}%
                  </div>
                  <div className="w-full bg-white/20 h-3 mt-6">
                    <div
                      className="bg-white h-3 transition-all motion-reduce:transition-none"
                      style={{ width: `${overall}%` }}
                    />
                  </div>
                  <p className="text-base text-neutral-300 mt-4 max-w-xl mx-auto">
                    {gradeInfo.description}
                  </p>
                </div>
              </Animate>
            </div>
          </section>

          {/* Per-heuristic breakdown */}
          <section className="px-6 lg:px-12 py-8" aria-label="Heuristic scores breakdown">
            <div className="max-w-4xl mx-auto">
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                  Score Breakdown
                </h2>
                <div className="space-y-4">
                  {HEURISTICS.map((h, i) => {
                    const pct = heuristicPct(h, scores);
                    return (
                      <div key={h.id} className="border border-neutral-200 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-base font-bold text-black">
                            {i + 1}. {h.name}
                          </span>
                          <span className="text-base font-bold text-black">{pct}%</span>
                        </div>
                        <div className="w-full bg-neutral-100 h-3" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${h.name}: ${pct}%`}>
                          <div
                            className={`h-3 transition-all duration-500 motion-reduce:transition-none ${pct >= 80 ? "bg-black" : pct >= 60 ? "bg-neutral-600" : "bg-neutral-400"}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        {notes[h.id] && (
                          <p className="text-base text-neutral-500 mt-2">
                            Notes: {notes[h.id]}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Animate>
            </div>
          </section>

          {/* Top 3 areas for improvement */}
          <section className="px-6 lg:px-12 py-8" aria-label="Top areas for improvement">
            <div className="max-w-4xl mx-auto">
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                  Top 3 Areas for Improvement
                </h2>
                <div className="space-y-4">
                  {bottomThree.map((h, i) => (
                    <div key={h.id} className="border-2 border-black p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-black text-white flex items-center justify-center flex-shrink-0 font-bold text-lg">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black">
                            {h.name} ({h.pct}%)
                          </h3>
                          <p className="text-base text-neutral-500 mt-1">{h.description}</p>
                          {notes[h.id] && (
                            <p className="text-base text-neutral-700 mt-2 border-l-2 border-neutral-300 pl-3">
                              {notes[h.id]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Animate>
            </div>
          </section>

          {/* Priority findings */}
          <section className="px-6 lg:px-12 py-8" aria-label="Priority findings">
            <div className="max-w-4xl mx-auto">
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                  Priority Findings
                </h2>
                <div className="space-y-3">
                  {rankedHeuristics.map((h) => {
                    let priority: string;
                    let priorityStyle: string;
                    if (h.pct < 60) {
                      priority = "Critical";
                      priorityStyle = "bg-black text-white";
                    } else if (h.pct < 80) {
                      priority = "Improve";
                      priorityStyle = "bg-neutral-200 text-black";
                    } else {
                      priority = "Good";
                      priorityStyle = "bg-neutral-100 text-neutral-500";
                    }
                    return (
                      <div key={h.id} className="flex items-center gap-4 py-3 border-b border-neutral-200">
                        <span className={`px-3 py-1 text-base font-bold flex-shrink-0 ${priorityStyle}`}>
                          {priority}
                        </span>
                        <span className="text-base text-neutral-600 flex-1">{h.name}</span>
                        <span className="text-base font-bold text-black">{h.pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </Animate>
            </div>
          </section>

          {/* Action buttons */}
          <section aria-label="Content section" className="px-6 lg:px-12 py-8">
            <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-bold text-base hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Save Evaluation
              </button>
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-3 border-2 border-black text-black px-8 py-4 font-bold text-base hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Export as .txt
              </button>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-3 border-2 border-neutral-300 text-neutral-600 px-8 py-4 font-bold text-base hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Start Over
              </button>
            </div>
          </section>
        </>
      )}

      {/* Educational section */}
      <section aria-label="About Usability Heuristics" className="px-6 lg:px-12 py-16 bg-neutral-50 mt-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight mb-6">
              About Usability Heuristics
            </h2>
            <div className="space-y-6 text-base text-neutral-600 leading-relaxed">
              <p>
                Jakob Nielsen&apos;s 10 usability heuristics are broad rules of thumb for interaction design.
                Originally published in 1994, they remain the most widely used framework for evaluating
                user interface quality. They are called &ldquo;heuristics&rdquo; because they are general
                principles rather than specific usability guidelines.
              </p>
              <p>
                A heuristic evaluation involves having evaluators examine the interface and judge its
                compliance with these recognized usability principles. It is one of the most cost-effective
                methods for finding usability problems: it requires no users, no lab, and relatively little
                time, yet consistently uncovers a significant portion of usability issues.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="border border-neutral-200 bg-white p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-2">
                    When to Use This Tool
                  </h3>
                  <ul className="space-y-2 text-base text-neutral-600">
                    <li>Before a website redesign to benchmark current usability</li>
                    <li>During development to catch usability issues early</li>
                    <li>After launch to identify improvement opportunities</li>
                    <li>Periodically to track usability improvements over time</li>
                  </ul>
                </div>
                <div className="border border-neutral-200 bg-white p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-2">
                    Best Practices
                  </h3>
                  <ul className="space-y-2 text-base text-neutral-600">
                    <li>Evaluate with 3-5 different evaluators for best coverage</li>
                    <li>Review each page and user flow individually</li>
                    <li>Document specific examples in the notes fields</li>
                    <li>Combine with user testing for the most complete picture</li>
                  </ul>
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* CTA section */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Expert Help Improving Usability?
            </h2>
            <p className="text-lg text-neutral-400 mt-4 mb-8">
              Our team conducts professional UX audits and implements improvements that turn
              usability findings into measurable conversion gains.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Get a Professional UX Audit &rarr;
              </Link>
              <Link
                href="/services/website-development"
                className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Website Services
              </Link>
            </div>
          </Animate>
        </div>
      </section>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Website Heuristic Evaluator",
          description: "Evaluate your website against Nielsen",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Website Heuristic Evaluator"
        services={[
          { title: "Website Development", desc: "Fast, accessible websites built for conversion and growth.", href: "/services/website-development" },
          { title: "SEO", desc: "Technical SEO baked in from day one for maximum visibility.", href: "/services/seo" },
          { title: "Digital Marketing", desc: "Drive the right traffic to your optimized digital experience.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
          { title: "Website Audit", href: "/resources/website-audit" },
          { title: "Website Grader", href: "/resources/website-grader" },
          { title: "Website Launch Checklist", href: "/resources/website-launch-checklist" },
          { title: "Website Readiness Scorecard", href: "/resources/website-readiness-scorecard" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
