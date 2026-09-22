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

interface Question {
  id: string;
  text: string;
  impact: "high" | "medium" | "low";
}

interface Category {
  id: string;
  title: string;
  questions: Question[];
}

type Answer = 1 | 0.5 | 0;

const categories: Category[] = [
  {
    id: "list-hygiene",
    title: "List Hygiene",
    questions: [
      { id: "lh-1", text: "Do you use double opt-in for new subscribers?", impact: "high" },
      { id: "lh-2", text: "Do you monitor and remove hard bounces after each send?", impact: "high" },
      { id: "lh-3", text: "Do you have a process for handling inactive subscribers (e.g., suppression or re-engagement)?", impact: "medium" },
      { id: "lh-4", text: "Do you clean your list at least once per quarter (removing invalid, duplicate, or role-based addresses)?", impact: "medium" },
      { id: "lh-5", text: "Do you segment your list based on engagement, demographics, or behavior?", impact: "medium" },
    ],
  },
  {
    id: "content-quality",
    title: "Content Quality",
    questions: [
      { id: "cq-1", text: "Do you personalize emails beyond just the first name (e.g., content blocks, product recs, dynamic fields)?", impact: "medium" },
      { id: "cq-2", text: "Are your emails designed and tested for mobile devices?", impact: "high" },
      { id: "cq-3", text: "Do you write custom preview text for every campaign (not just letting it default to the first line of body copy)?", impact: "low" },
      { id: "cq-4", text: "Do you maintain a balanced image-to-text ratio (not image-only emails)?", impact: "medium" },
      { id: "cq-5", text: "Does every email have a single, clear call-to-action?", impact: "high" },
    ],
  },
  {
    id: "sending-practices",
    title: "Sending Practices",
    questions: [
      { id: "sp-1", text: "Do you send on a consistent, predictable schedule?", impact: "medium" },
      { id: "sp-2", text: "Do you warm up new sending domains or IPs gradually before sending at full volume?", impact: "high" },
      { id: "sp-3", text: "Do you throttle large sends to avoid triggering spam filters?", impact: "medium" },
      { id: "sp-4", text: "Have you set up SPF, DKIM, and DMARC authentication for your sending domain?", impact: "high" },
      { id: "sp-5", text: "Are you using a dedicated IP (or understand the trade-offs of your shared IP)?", impact: "low" },
    ],
  },
  {
    id: "engagement",
    title: "Engagement",
    questions: [
      { id: "en-1", text: "Are your open rates within a healthy range for your industry?", impact: "medium" },
      { id: "en-2", text: "Are your click-through rates within a healthy range for your industry?", impact: "high" },
      { id: "en-3", text: "Is your unsubscribe rate below 0.5% per send?", impact: "medium" },
      { id: "en-4", text: "Is your spam complaint rate below 0.1% per send?", impact: "high" },
      { id: "en-5", text: "Do you run re-engagement campaigns for subscribers who have not opened or clicked in 90+ days?", impact: "medium" },
    ],
  },
  {
    id: "compliance",
    title: "Compliance",
    questions: [
      { id: "cm-1", text: "Are your emails compliant with CAN-SPAM and/or GDPR requirements?", impact: "high" },
      { id: "cm-2", text: "Can subscribers unsubscribe with a single click (no login, no confirmation page)?", impact: "high" },
      { id: "cm-3", text: "Do your emails include a valid physical mailing address?", impact: "medium" },
      { id: "cm-4", text: "Do you maintain records of when and how each subscriber gave consent?", impact: "medium" },
      { id: "cm-5", text: "Do you link to a privacy policy that explains how subscriber data is used?", impact: "low" },
    ],
  },
];

const answerLabels: Record<string, string> = {
  "1": "Yes",
  "0.5": "Partial",
  "0": "No",
};

/* ------------------------------------------------------------------ */
/*  Recommendation data                                                */
/* ------------------------------------------------------------------ */

const recommendations: Record<string, string> = {
  "lh-1": "Implement double opt-in to verify subscriber intent, reduce fake sign-ups, and improve long-term deliverability.",
  "lh-2": "Configure automatic hard bounce suppression in your ESP. Continuing to send to invalid addresses damages your sender reputation.",
  "lh-3": "Create a sunset policy: after 90 days of inactivity, trigger a re-engagement sequence, then suppress non-responders.",
  "lh-4": "Schedule quarterly list audits. Remove duplicates, role-based addresses (info@, support@), and addresses that have never engaged.",
  "lh-5": "Start with engagement-based segments (active, lapsed, new) and layer in behavioral or demographic segments over time.",
  "cq-1": "Go beyond first-name tokens. Use purchase history, browsing behavior, or preference center data to serve relevant content blocks.",
  "cq-2": "Use a single-column layout, minimum 16px font, and tap-friendly buttons (44px+). Test across iOS Mail, Gmail, and Outlook mobile.",
  "cq-3": "Write preview text that complements your subject line. It is the second most-read element in the inbox and directly affects open rates.",
  "cq-4": "Aim for at least 60% text and no more than 40% images. Image-only emails are often flagged by spam filters and fail when images are blocked.",
  "cq-5": "Limit each email to one primary CTA. Multiple competing links dilute attention and reduce click-through rates.",
  "sp-1": "Set subscriber expectations at sign-up and stick to the promised cadence. Irregular sending patterns trigger spam filters and erode trust.",
  "sp-2": "Start with small volumes (a few hundred per day) and increase gradually over two to four weeks. Sudden volume spikes are a top spam trigger.",
  "sp-3": "For large lists, spread sends over several hours. Most ESPs offer throttling features; use them for sends above 50,000 recipients.",
  "sp-4": "SPF, DKIM, and DMARC are non-negotiable for deliverability. Without them, your emails are far more likely to land in spam or be rejected.",
  "sp-5": "Evaluate whether your sending volume justifies a dedicated IP. Low-volume senders often get better deliverability on a reputable shared IP.",
  "en-1": "Benchmark your open rates against your industry vertical. If you are below the typical range, focus on subject lines, send time, and list quality.",
  "en-2": "Low click rates usually signal a mismatch between subject line promise and email content, or weak CTAs. A/B test content and button placement.",
  "en-3": "Unsubscribe rates above 0.5% suggest frequency, relevance, or expectation problems. Survey unsubscribers to identify the root cause.",
  "en-4": "Complaint rates above 0.1% put your sender reputation at serious risk. Make the unsubscribe link prominent to redirect complaints.",
  "en-5": "A simple three-email re-engagement series (reminder, incentive, final warning) can recover a meaningful percentage of lapsed subscribers.",
  "cm-1": "Review CAN-SPAM requirements (US) and GDPR requirements (EU). Non-compliance carries significant financial penalties and reputational risk.",
  "cm-2": "One-click unsubscribe is now required by Gmail and Yahoo for bulk senders. Add a List-Unsubscribe header and a visible in-body link.",
  "cm-3": "CAN-SPAM requires a valid physical address in every commercial email. Use your business address or a registered PO Box.",
  "cm-4": "Store the date, source, and method of each opt-in. This record is your legal defense if a subscriber or regulator challenges consent.",
  "cm-5": "Link to a clear privacy policy from your sign-up forms and email footer. Explain what data you collect, how you use it, and how subscribers can opt out.",
};

/* ------------------------------------------------------------------ */
/*  Industry benchmarks (ranges, not specific numbers)                 */
/* ------------------------------------------------------------------ */

interface Benchmark {
  metric: string;
  range: string;
  note: string;
}

const benchmarks: Benchmark[] = [
  { metric: "Open Rate", range: "15% - 30%", note: "Varies significantly by industry. B2B tends toward the higher end; retail and e-commerce toward the lower end." },
  { metric: "Click-Through Rate", range: "1.5% - 5%", note: "Highly dependent on content relevance and CTA design. Segmented sends typically outperform broadcast sends." },
  { metric: "Unsubscribe Rate", range: "Below 0.5%", note: "Rates consistently above 0.5% suggest frequency or relevance issues that need immediate attention." },
  { metric: "Spam Complaint Rate", range: "Below 0.1%", note: "Gmail and Yahoo enforce this threshold. Exceeding it risks throttling or blocking of your sending domain." },
  { metric: "Bounce Rate", range: "Below 2%", note: "Hard bounces should be suppressed immediately. Soft bounces should be monitored and suppressed after repeated failures." },
];

/* ------------------------------------------------------------------ */
/*  Scoring utilities                                                  */
/* ------------------------------------------------------------------ */

type Scores = Record<string, Answer>;

function createEmptyScores(): Record<string, Answer | -1> {
  const scores: Record<string, Answer | -1> = {};
  for (const cat of categories) {
    for (const q of cat.questions) {
      scores[q.id] = -1;
    }
  }
  return scores;
}

function getCategoryScore(scores: Scores, category: Category): number {
  return category.questions.reduce((sum, q) => sum + (scores[q.id] ?? 0), 0);
}

function getCategoryMax(category: Category): number {
  return category.questions.length;
}

function getTotalScore(scores: Scores): number {
  let total = 0;
  for (const cat of categories) {
    total += getCategoryScore(scores, cat);
  }
  return total;
}

function getMaxScore(): number {
  return categories.reduce((sum, cat) => sum + getCategoryMax(cat), 0);
}

function getLetterGrade(score: number): string {
  const pct = (score / getMaxScore()) * 100;
  if (pct >= 90) return "A";
  if (pct >= 80) return "B";
  if (pct >= 70) return "C";
  if (pct >= 60) return "D";
  return "F";
}

function getGradeDescription(grade: string): string {
  switch (grade) {
    case "A":
      return "Excellent email health. Your practices are strong across the board. Focus on fine-tuning and staying ahead of evolving standards.";
    case "B":
      return "Good foundation with room to improve. A few targeted changes will meaningfully boost deliverability and engagement.";
    case "C":
      return "Average email health. Several areas need attention to avoid deliverability problems and maximize the value of your list.";
    case "D":
      return "Below average. Multiple issues are likely hurting your sender reputation and inbox placement. Prioritize the gaps below.";
    default:
      return "Critical improvements needed. Your email program is at risk of serious deliverability problems and compliance issues.";
  }
}

interface GapEntry {
  questionId: string;
  text: string;
  categoryTitle: string;
  score: number;
  impact: "high" | "medium" | "low";
}

function getGaps(scores: Scores): GapEntry[] {
  const gaps: GapEntry[] = [];
  for (const cat of categories) {
    for (const q of cat.questions) {
      const score = scores[q.id] ?? 0;
      if (score < 1) {
        gaps.push({
          questionId: q.id,
          text: q.text,
          categoryTitle: cat.title,
          score,
          impact: q.impact,
        });
      }
    }
  }
  // Sort by impact (high first), then by score (lowest first)
  const impactOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };
  gaps.sort((a, b) => {
    const impactDiff = impactOrder[a.impact] - impactOrder[b.impact];
    if (impactDiff !== 0) return impactDiff;
    return a.score - b.score;
  });
  return gaps;
}

function allRated(scores: Record<string, Answer | -1>): boolean {
  return Object.values(scores).every((v) => v >= 0);
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function AnswerButtons({
  questionId,
  questionText,
  value,
  onChange,
}: {
  questionId: string;
  questionText: string;
  value: number;
  onChange: (v: Answer) => void;
}) {
  const options: { label: string; value: Answer }[] = [
    { label: "Yes", value: 1 },
    { label: "Partial", value: 0.5 },
    { label: "No", value: 0 },
  ];

  return (
    <fieldset className="flex gap-0 border border-gray-200" aria-label={`Answer for: ${questionText}`}>
      <legend className="sr-only">Answer for: {questionText}</legend>
      {options.map((opt, i) => {
        const isSelected = value === opt.value;
        return (
          <button
            key={opt.label}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-label={`${opt.label} (${opt.value} point${opt.value !== 1 ? "s" : ""})`}
            aria-pressed={isSelected}
            className={`min-h-[44px] min-w-[44px] px-4 py-2 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
              isSelected
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-100"
            } ${i > 0 ? "border-l border-gray-200" : ""}`}
          >
            {opt.label}
          </button>
        );
      })}
    </fieldset>
  );
}

function CategoryProgressBar({ scores, category }: { scores: Scores; category: Category }) {
  const score = getCategoryScore(scores, category);
  const max = getCategoryMax(category);
  const pct = (score / max) * 100;

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-base font-bold text-black">{category.title}</span>
        <span className="text-base text-gray-500">
          {score}/{max}
        </span>
      </div>
      <div className="w-full bg-gray-100 h-8">
        <div
          className="bg-black h-8 transition-all duration-500 motion-reduce:transition-none"
          style={{ width: `${pct}%` }}
          role="presentation"
        />
      </div>
    </div>
  );
}

function OverallScore({ scores }: { scores: Scores }) {
  const total = getTotalScore(scores);
  const max = getMaxScore();
  const grade = getLetterGrade(total);
  const description = getGradeDescription(grade);

  return (
    <div className="border border-gray-200 p-6">
      <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
        Overall Email Health
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <p className="text-base text-gray-500 mb-1">Total Score</p>
          <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
            {total}/{max}
          </p>
        </div>
        <div>
          <p className="text-base text-gray-500 mb-1">Letter Grade</p>
          <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
            {grade}
          </p>
        </div>
        <div className="sm:col-span-1">
          <p className="text-base text-gray-500 mb-1">Assessment</p>
          <p className="text-base text-gray-700 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

function CategoryScores({ scores }: { scores: Scores }) {
  return (
    <div className="border border-gray-200 p-6">
      <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
        Per-Category Scores
      </h3>
      <div className="space-y-5" role="img" aria-label="Bar chart showing email health by category">
        {categories.map((cat) => (
          <CategoryProgressBar key={cat.id} scores={scores} category={cat} />
        ))}
      </div>
    </div>
  );
}

function PriorityImprovements({ gaps }: { gaps: GapEntry[] }) {
  if (gaps.length === 0) return null;

  const impactLabel: Record<string, string> = {
    high: "High Impact",
    medium: "Medium Impact",
    low: "Lower Impact",
  };

  return (
    <div className="space-y-6">
      <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
        Priority Improvements
      </h3>
      <p className="text-base text-gray-500">
        These are your most critical improvements sorted by potential impact on deliverability and performance.
      </p>
      {gaps.map((gap, rank) => {
        const rec = recommendations[gap.questionId];
        return (
          <Animate key={gap.questionId} animation="fade-up">
            <div className="border border-gray-200">
              <div className="bg-black text-white px-6 py-4 flex items-center justify-between flex-wrap gap-2">
                <h4 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                  #{rank + 1}: {gap.categoryTitle}
                </h4>
                <span className="text-base text-gray-400">
                  {impactLabel[gap.impact]} &middot; Score: {gap.score}/1
                </span>
              </div>
              <div className="p-6 space-y-3">
                <p className="text-base text-black font-bold">{gap.text}</p>
                {rec && (
                  <p className="text-base text-gray-700 leading-relaxed">
                    {rec}
                  </p>
                )}
              </div>
            </div>
          </Animate>
        );
      })}
    </div>
  );
}

function CategoryRecommendations({ scores }: { scores: Scores }) {
  const catResults = categories.map((cat) => {
    const score = getCategoryScore(scores, cat);
    const max = getCategoryMax(cat);
    const pct = Math.round((score / max) * 100);
    const weakQuestions = cat.questions.filter((q) => (scores[q.id] ?? 0) < 1);
    return { cat, score, max, pct, weakQuestions };
  });

  const weakCategories = catResults.filter((r) => r.weakQuestions.length > 0);
  if (weakCategories.length === 0) return null;

  return (
    <div className="space-y-6">
      <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
        Category-Specific Recommendations
      </h3>
      {weakCategories.map((result) => (
        <Animate key={result.cat.id} animation="fade-up">
          <div className="border border-gray-200">
            <div className="bg-black text-white px-6 py-4 flex items-center justify-between flex-wrap gap-2">
              <h4 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                {result.cat.title}
              </h4>
              <span className="text-base text-gray-400">
                {result.score}/{result.max} ({result.pct}%)
              </span>
            </div>
            <div className="divide-y divide-gray-200">
              {result.weakQuestions.map((q) => {
                const rec = recommendations[q.id];
                return (
                  <div key={q.id} className="p-6">
                    <p className="text-base font-bold text-black mb-2">{q.text}</p>
                    {rec && (
                      <p className="text-base text-gray-700 leading-relaxed">{rec}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Animate>
      ))}
    </div>
  );
}

function BenchmarkComparisons() {
  return (
    <div className="border border-gray-200">
      <div className="bg-black text-white px-6 py-4">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
          Industry Benchmark Ranges
        </h3>
      </div>
      <div className="divide-y divide-gray-200">
        {benchmarks.map((b) => (
          <div key={b.metric} className="px-6 py-4 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
            <div className="sm:w-48 shrink-0">
              <p className="text-base font-bold text-black">{b.metric}</p>
              <p className="text-base text-gray-500">{b.range}</p>
            </div>
            <p className="text-base text-gray-700 leading-relaxed">{b.note}</p>
          </div>
        ))}
      </div>
      <div className="px-6 py-4 border-t border-gray-200">
        <p className="text-base text-gray-500">
          These ranges represent general industry benchmarks. Your specific targets should account for your industry vertical, audience size, and sending frequency.
        </p>
      </div>
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

/* ------------------------------------------------------------------ */
/*  Format as plain text                                               */
/* ------------------------------------------------------------------ */

function formatResultsText(scores: Scores): string {
  const lines: string[] = [];
  const total = getTotalScore(scores);
  const max = getMaxScore();
  const grade = getLetterGrade(total);

  lines.push("EMAIL MARKETING HEALTH CHECK");
  lines.push("=".repeat(50));
  lines.push(`Overall Score: ${total}/${max} (Grade: ${grade})`);
  lines.push(`Assessment: ${getGradeDescription(grade)}`);
  lines.push("");

  for (const cat of categories) {
    const catScore = getCategoryScore(scores, cat);
    const catMax = getCategoryMax(cat);
    lines.push(`${cat.title}: ${catScore}/${catMax} (${Math.round((catScore / catMax) * 100)}%)`);
    for (const q of cat.questions) {
      const val = scores[q.id] ?? 0;
      lines.push(`  ${answerLabels[String(val)]}: ${q.text}`);
    }
    lines.push("");
  }

  const gaps = getGaps(scores);
  if (gaps.length > 0) {
    lines.push("PRIORITY IMPROVEMENTS");
    lines.push("-".repeat(30));
    gaps.forEach((gap, i) => {
      lines.push(`${i + 1}. [${gap.impact.toUpperCase()} IMPACT] ${gap.categoryTitle}`);
      lines.push(`   ${gap.text}`);
      const rec = recommendations[gap.questionId];
      if (rec) lines.push(`   Recommendation: ${rec}`);
      lines.push("");
    });
  }

  lines.push("INDUSTRY BENCHMARK RANGES");
  lines.push("-".repeat(30));
  for (const b of benchmarks) {
    lines.push(`${b.metric}: ${b.range}`);
    lines.push(`  ${b.note}`);
  }
  lines.push("");

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  How-to steps                                                       */
/* ------------------------------------------------------------------ */

const howToSteps = [
  {
    title: "Answer Honestly",
    description: "For each question, select Yes (fully implemented), Partial (partially implemented), or No (not implemented). Accurate answers produce actionable results.",
  },
  {
    title: "Review Your Score",
    description: "Your overall letter grade and per-category scores reveal where your email program is strong and where it has gaps.",
  },
  {
    title: "Focus on High-Impact Gaps",
    description: "Priority improvements are sorted by impact. Addressing high-impact items first will produce the fastest improvement in deliverability and engagement.",
  },
  {
    title: "Implement and Re-Test",
    description: "Work through the recommendations, then retake the assessment in 30 to 60 days to track your progress and identify the next set of improvements.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function EmailHealthCheckerPage() {
  const [scores, setScores] = useState<Record<string, Answer | -1>>(createEmptyScores());
  const [results, setResults] = useState<Scores | null>(null);

  function updateScore(questionId: string, value: Answer) {
    setScores((prev) => ({ ...prev, [questionId]: value }));
  }

  const rated = allRated(scores);

  function handleAnalyze() {
    if (!rated) return;
    setResults({ ...scores } as Scores);
    // Scroll to results after a brief delay for rendering
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function handleReset() {
    setScores(createEmptyScores());
    setResults(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const plainText = results ? formatResultsText(results) : "";

  return (
    <article className="min-h-screen">
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/email-subject-tester" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Email Subject Tester</Link>
                <Link href="/resources/email-roi-calculator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Email ROI Calculator</Link>
                <Link href="/resources/email-campaign-planner" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Email Campaign Planner</Link>
                <Link href="/resources/email-sequence-planner" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Email Sequence Planner</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Email Marketing Health Checker",
          description:
            "Free email marketing health check tool. Answer 25 questions across 5 categories to assess your email practices and get actionable improvement recommendations.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Email Health Checker" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Email Marketing Health Checker
            </h1>
            <SectionDesc>
              Answer 25 questions across 5 categories to get an instant health
              score for your email marketing program. Receive a letter grade,
              per-category breakdown, priority improvements sorted by impact,
              and industry benchmark comparisons.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Scoring Legend ---- */}
      <section aria-label="How Scoring Works" className="px-6 lg:px-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="border border-gray-200 p-6">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                How Scoring Works
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-base">
                  <span className="font-bold text-black">Yes</span>
                  <span className="text-gray-500"> = 1 point</span>
                </div>
                <div className="text-base">
                  <span className="font-bold text-black">Partial</span>
                  <span className="text-gray-500"> = 0.5 points</span>
                </div>
                <div className="text-base">
                  <span className="font-bold text-black">No</span>
                  <span className="text-gray-500"> = 0 points</span>
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Questions Form ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
        <div className="max-w-4xl mx-auto space-y-10">
          {categories.map((cat) => (
            <Animate key={cat.id} animation="fade-up">
              <div className="border border-gray-200">
                <div className="bg-black text-white px-6 py-4">
                  <span className="font-[family-name:var(--font-display)] text-base font-extrabold">
                    {cat.title}
                  </span>
                </div>
                <div className="divide-y divide-gray-200">
                  {cat.questions.map((q, i) => (
                    <div
                      key={q.id}
                      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <p className="text-base text-black font-bold flex-1">
                        {q.text}
                      </p>
                      <AnswerButtons
                        questionId={q.id}
                        questionText={q.text}
                        value={scores[q.id]}
                        onChange={(v) => updateScore(q.id, v)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Animate>
          ))}

          {/* Analyze / Reset */}
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAnalyze}
                disabled={!rated}
                className="bg-black text-white px-8 py-4 min-h-[44px] text-base font-bold hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Check Email Health
              </button>
              {Object.values(scores).some((v) => v >= 0) && (
                <button
                  onClick={handleReset}
                  className="px-8 py-4 min-h-[44px] text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Start Over
                </button>
              )}
              {!rated && (
                <p className="text-base text-gray-400 self-center">
                  Answer all 25 questions to run the health check.
                </p>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Results ---- */}
      {results && (
        <section aria-label="Content section" id="results" className="px-6 lg:px-12 pb-16">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Overall score */}
            <Animate animation="fade-up">
              <OverallScore scores={results} />
            </Animate>

            {/* Per-category scores with progress bars */}
            <Animate animation="fade-up">
              <CategoryScores scores={results} />
            </Animate>

            {/* Priority improvements sorted by impact */}
            <PriorityImprovements gaps={getGaps(results)} />

            {/* Category-specific recommendations */}
            <CategoryRecommendations scores={results} />

            {/* Industry benchmark comparisons */}
            <Animate animation="fade-up">
              <BenchmarkComparisons />
            </Animate>

            {/* Export actions */}
            <div className="flex flex-wrap gap-3">
              <CopyButton text={plainText} />
              <DownloadButton text={plainText} filename="email-health-check-results.txt" />
              <button
                onClick={handleReset}
                className="px-8 py-4 min-h-[44px] text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Start Over
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ---- How to Use ---- */}
      <section aria-label="How to Use This Health Check" className="px-6 lg:px-12 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-8">
              How to Use This Health Check
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
              Get Expert Email Marketing Support
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              This self-assessment identifies where your email program needs
              work. Our team can help you implement the fixes, from
              authentication setup and list hygiene to campaign strategy and
              deliverability optimization.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Talk to Our Email Marketing Team &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Email Health Checker"
        services={[
          { title: "Digital Marketing", desc: "Email marketing integrated with your broader growth strategy.", href: "/services/digital-marketing" },
          { title: "Content Marketing", desc: "Compelling email content that nurtures leads into customers.", href: "/services/content-marketing" },
          { title: "Performance Marketing", desc: "Paid campaigns that fill your email funnel with qualified leads.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Email Campaign Planner", href: "/resources/email-campaign-planner" },
          { title: "Email Deliverability", href: "/resources/email-deliverability" },
          { title: "Email Roi Calculator", href: "/resources/email-roi-calculator" },
          { title: "Email Sequence Planner", href: "/resources/email-sequence-planner" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
