"use client";
import Link from "next/link";

import { useState, useCallback, useEffect } from "react";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Question {
  id: string;
  label: string;
  tip: string;
}

interface Category {
  key: string;
  label: string;
  description: string;
  benchmark: number; // industry benchmark score out of 25
  questions: Question[];
  recommendations: string[];
}

type ScoreMap = Record<string, number>; // question id -> 1-5

interface SavedAudit {
  id: string;
  name: string;
  date: string;
  scores: ScoreMap;
}

interface GradeInfo {
  grade: string;
  label: string;
  description: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "markit-marketing-audit-history";

const categories: Category[] = [
  {
    key: "website",
    label: "Website & UX",
    description: "How well your website performs, converts, and serves visitors.",
    benchmark: 17,
    questions: [
      { id: "website-1", label: "Mobile Responsiveness", tip: "Site looks and functions correctly on all screen sizes and devices." },
      { id: "website-2", label: "Loading Speed", tip: "Pages load in under 3 seconds on both desktop and mobile connections." },
      { id: "website-3", label: "Clear CTAs", tip: "Every page has a visible, compelling call-to-action that guides visitors toward conversion." },
      { id: "website-4", label: "Navigation", tip: "Site structure is intuitive with logical hierarchy and users can find what they need in 3 clicks or fewer." },
      { id: "website-5", label: "Content Quality", tip: "Pages are well-written, free of errors, and provide genuine value to visitors." },
    ],
    recommendations: [
      "Run Google PageSpeed Insights on your top 10 pages and fix critical performance issues.",
      "Audit every page for a single clear CTA and remove competing actions.",
      "Test your site on 5 different devices and fix layout or usability issues.",
    ],
  },
  {
    key: "seo",
    label: "SEO",
    description: "Your search engine optimization and organic visibility.",
    benchmark: 15,
    questions: [
      { id: "seo-1", label: "Keyword Targeting", tip: "Each page targets specific keywords based on search volume, intent, and competition research." },
      { id: "seo-2", label: "Meta Tags", tip: "Every page has a unique, keyword-rich title tag and compelling meta description." },
      { id: "seo-3", label: "Internal Linking", tip: "Content links to related pages on your site to distribute authority and guide users." },
      { id: "seo-4", label: "Backlink Profile", tip: "You have quality inbound links from relevant, authoritative websites in your industry." },
      { id: "seo-5", label: "Technical Health", tip: "No crawl errors, proper XML sitemap, robots.txt, HTTPS, and clean URL structure." },
    ],
    recommendations: [
      "Build a keyword map that assigns primary and secondary keywords to every page.",
      "Run a technical SEO audit to fix crawl errors, broken links, and missing meta tags.",
      "Create an internal linking strategy with 3-5 contextual links per long-form page.",
    ],
  },
  {
    key: "content",
    label: "Content Marketing",
    description: "Your content strategy, production, and distribution efforts.",
    benchmark: 14,
    questions: [
      { id: "content-1", label: "Content Strategy", tip: "A documented content strategy exists that aligns with business goals and buyer journey stages." },
      { id: "content-2", label: "Publishing Frequency", tip: "New content is published on a consistent, sustainable schedule." },
      { id: "content-3", label: "Content Variety", tip: "You produce multiple content formats: blog posts, videos, infographics, case studies, and guides." },
      { id: "content-4", label: "Distribution", tip: "Content is actively promoted across owned, earned, and paid channels." },
      { id: "content-5", label: "Measurement", tip: "Content performance is tracked with clear KPIs tied to business outcomes." },
    ],
    recommendations: [
      "Document a content strategy that maps topics to buyer journey stages.",
      "Set a realistic publishing cadence and stick to it for at least 90 days.",
      "Repurpose each long-form piece into at least 3 derivative formats.",
    ],
  },
  {
    key: "social",
    label: "Social Media",
    description: "Your social media presence, engagement, and effectiveness.",
    benchmark: 15,
    questions: [
      { id: "social-1", label: "Profile Optimization", tip: "All social profiles have complete bios, consistent branding, and links to your website." },
      { id: "social-2", label: "Posting Consistency", tip: "You post regularly on a predictable schedule across your active platforms." },
      { id: "social-3", label: "Engagement Rate", tip: "Your posts generate meaningful interactions: comments, shares, saves, and conversations." },
      { id: "social-4", label: "Content Mix", tip: "You balance promotional, educational, entertaining, and community-building content." },
      { id: "social-5", label: "Platform Selection", tip: "You focus on platforms where your target audience is most active rather than trying to be everywhere." },
    ],
    recommendations: [
      "Audit your social profiles for consistent branding, complete bios, and working links.",
      "Adopt an 80/20 rule: 80% value-driven content, 20% promotional.",
      "Focus on 2-3 platforms where your audience is most active and go deep.",
    ],
  },
  {
    key: "email",
    label: "Email Marketing",
    description: "Your email list health, campaigns, and automation.",
    benchmark: 13,
    questions: [
      { id: "email-1", label: "List Health", tip: "Your email list is growing, has low bounce rates, and subscribers are genuinely opted in." },
      { id: "email-2", label: "Segmentation", tip: "Your list is segmented by behavior, interest, or stage so subscribers get relevant content." },
      { id: "email-3", label: "Automation", tip: "Welcome sequences, nurture flows, and triggered emails run automatically." },
      { id: "email-4", label: "Design Quality", tip: "Emails are mobile-responsive, well-branded, and have clear CTAs." },
      { id: "email-5", label: "Deliverability", tip: "Emails consistently reach inboxes with high open rates and low spam complaints." },
    ],
    recommendations: [
      "Clean your email list by removing inactive subscribers and fixing bounce issues.",
      "Set up at least a welcome sequence and one behavior-triggered automation.",
      "Segment your list into 3-5 meaningful groups and tailor content to each.",
    ],
  },
  {
    key: "paid",
    label: "Paid Advertising",
    description: "Your paid campaigns across search, social, and display.",
    benchmark: 14,
    questions: [
      { id: "paid-1", label: "Campaign Structure", tip: "Campaigns are organized logically with clear naming, tight ad groups, and proper budget allocation." },
      { id: "paid-2", label: "Targeting", tip: "You use precise audience targeting based on demographics, behavior, interests, and intent." },
      { id: "paid-3", label: "Creative Quality", tip: "Ad creative is compelling, on-brand, and regularly refreshed to prevent fatigue." },
      { id: "paid-4", label: "Landing Pages", tip: "Ads send traffic to dedicated, relevant landing pages rather than generic pages." },
      { id: "paid-5", label: "Tracking", tip: "Conversion tracking is properly set up for all campaigns with accurate attribution." },
    ],
    recommendations: [
      "Audit your campaign structure and consolidate overlapping or underperforming ad groups.",
      "Create dedicated landing pages for each campaign with a single focused CTA.",
      "Verify your conversion tracking fires correctly on all key actions.",
    ],
  },
  {
    key: "analytics",
    label: "Analytics & Tracking",
    description: "How well you measure, report, and act on marketing data.",
    benchmark: 13,
    questions: [
      { id: "analytics-1", label: "GA4 Setup", tip: "Google Analytics 4 is properly configured with enhanced measurement and custom events." },
      { id: "analytics-2", label: "Conversion Tracking", tip: "Key conversions are defined and tracked: form fills, calls, purchases, sign-ups." },
      { id: "analytics-3", label: "Dashboard Reporting", tip: "A regular reporting cadence exists with dashboards that stakeholders actually use." },
      { id: "analytics-4", label: "Data-Driven Decisions", tip: "Marketing decisions are based on data rather than assumptions or gut feeling." },
      { id: "analytics-5", label: "Attribution", tip: "You understand which channels and touchpoints contribute to conversions." },
    ],
    recommendations: [
      "Complete your GA4 setup with custom events for every key user action.",
      "Build a monthly marketing dashboard that tracks the 5 metrics that matter most.",
      "Implement UTM parameters on all campaign links for accurate channel attribution.",
    ],
  },
  {
    key: "brand",
    label: "Brand & Positioning",
    description: "Your brand consistency, messaging, and market differentiation.",
    benchmark: 16,
    questions: [
      { id: "brand-1", label: "Brand Consistency", tip: "Visual identity, tone of voice, and messaging are consistent across all channels and touchpoints." },
      { id: "brand-2", label: "Value Proposition", tip: "You have a clear, compelling value proposition that resonates with your target audience." },
      { id: "brand-3", label: "Competitor Differentiation", tip: "You can clearly articulate what makes you different and why prospects should choose you." },
      { id: "brand-4", label: "Messaging Clarity", tip: "Your messaging is simple, jargon-free, and focused on customer outcomes rather than features." },
      { id: "brand-5", label: "Visual Identity", tip: "Logo, colors, typography, and imagery are professional, modern, and consistently applied." },
    ],
    recommendations: [
      "Document brand guidelines that cover voice, tone, visual standards, and messaging frameworks.",
      "Craft a one-sentence value proposition and test it with 10 people outside your company.",
      "Audit all customer touchpoints for brand consistency and fix any mismatches.",
    ],
  },
];

const TOTAL_QUESTIONS = categories.length * 5; // 40
const MAX_SCORE = TOTAL_QUESTIONS * 5; // 200

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getCategoryScore(cat: Category, scores: ScoreMap): number {
  return cat.questions.reduce((sum, q) => sum + (scores[q.id] ?? 0), 0);
}

function getCategoryMax(): number {
  return 25; // 5 questions * 5 max each
}

function getTotalScore(scores: ScoreMap): number {
  return categories.reduce((sum, cat) => sum + getCategoryScore(cat, scores), 0);
}

function getGrade(total: number): GradeInfo {
  const pct = (total / MAX_SCORE) * 100;
  if (pct >= 90) return { grade: "A", label: "Excellent", description: "Your marketing is performing at a high level. Focus on optimization and scaling what works." };
  if (pct >= 80) return { grade: "B", label: "Good", description: "Strong foundation with clear opportunities to level up in specific areas." };
  if (pct >= 70) return { grade: "C", label: "Average", description: "Several areas need attention. Prioritize the lowest-scoring categories first." };
  if (pct >= 55) return { grade: "D", label: "Below Average", description: "Significant gaps exist across your marketing. Focus on building fundamentals." };
  return { grade: "F", label: "Needs Work", description: "Your marketing needs a comprehensive overhaul. Start with the basics in each category." };
}

function getWeakestCategories(scores: ScoreMap): Category[] {
  return [...categories]
    .sort((a, b) => getCategoryScore(a, scores) - getCategoryScore(b, scores))
    .slice(0, 3);
}

function loadSavedAudits(): SavedAudit[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistAudits(audits: SavedAudit[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(audits));
  } catch {
    /* storage full or unavailable */
  }
}

/* ------------------------------------------------------------------ */
/*  Format results as plain text for export                            */
/* ------------------------------------------------------------------ */

function formatResultsText(scores: ScoreMap): string {
  const lines: string[] = [];
  const total = getTotalScore(scores);
  const gradeInfo = getGrade(total);
  const pct = Math.round((total / MAX_SCORE) * 100);

  lines.push("MARKETING AUDIT SCORECARD RESULTS");
  lines.push("=".repeat(50));
  lines.push(`Date: ${new Date().toLocaleDateString()}`);
  lines.push(`Overall Score: ${total} / ${MAX_SCORE} (${pct}%)`);
  lines.push(`Grade: ${gradeInfo.grade} - ${gradeInfo.label}`);
  lines.push(gradeInfo.description);
  lines.push("");

  for (const cat of categories) {
    const score = getCategoryScore(cat, scores);
    const catPct = Math.round((score / getCategoryMax()) * 100);
    lines.push(`${cat.label.toUpperCase()}`);
    lines.push("-".repeat(40));
    lines.push(`Score: ${score} / ${getCategoryMax()} (${catPct}%)`);
    lines.push(`Industry Benchmark: ${cat.benchmark} / ${getCategoryMax()} (${Math.round((cat.benchmark / getCategoryMax()) * 100)}%)`);
    lines.push(`Status: ${score >= cat.benchmark ? "At or above benchmark" : "Below benchmark"}`);
    lines.push("");
    for (const q of cat.questions) {
      const val = scores[q.id] ?? 0;
      lines.push(`  ${q.label}: ${val}/5`);
    }
    lines.push("");
  }

  const weakest = getWeakestCategories(scores);
  lines.push("PRIORITY IMPROVEMENTS");
  lines.push("-".repeat(40));
  weakest.forEach((cat, i) => {
    const score = getCategoryScore(cat, scores);
    lines.push(`\n${i + 1}. ${cat.label} (${score}/${getCategoryMax()})`);
    cat.recommendations.forEach((rec) => lines.push(`   - ${rec}`));
  });
  lines.push("");

  lines.push("Generated by Markit Media Marketing Audit Scorecard");
  lines.push("https://themarkitmedia.com/resources/marketing-audit-scorecard");

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function StarRating({
  questionId,
  value,
  onChange,
  label,
}: {
  questionId: string;
  value: number;
  onChange: (id: string, val: number) => void;
  label: string;
}) {
  return (
    <fieldset className="flex gap-2" aria-label={`Rating for ${label}`}>
      <legend className="sr-only">Rate {label} from 1 to 5</legend>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(questionId, star)}
          aria-label={`${star} out of 5`}
          aria-pressed={value === star}
          className={`min-w-[44px] min-h-[44px] flex items-center justify-center text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
            value >= star
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          {star}
        </button>
      ))}
    </fieldset>
  );
}

function ProgressBar({
  score,
  max,
  benchmark,
}: {
  score: number;
  max: number;
  benchmark?: number;
}) {
  const pct = Math.round((score / max) * 100);
  const benchPct = benchmark ? Math.round((benchmark / max) * 100) : 0;
  return (
    <div className="relative w-full bg-gray-200 h-4" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={max} aria-label={`${score} out of ${max}`}>
      <div
        className="bg-black h-4 transition-all motion-reduce:transition-none"
        style={{ width: `${pct}%` }}
      />
      {benchmark !== undefined && (
        <div
          className="absolute top-0 h-4 w-0.5 bg-gray-500"
          style={{ left: `${benchPct}%` }}
          title={`Industry benchmark: ${benchmark}/${max}`}
          aria-hidden="true"
        />
      )}
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
      Download Report (.txt)
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function MarketingAuditScorecardPage() {
  const [scores, setScores] = useState<ScoreMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [savedAudits, setSavedAudits] = useState<SavedAudit[]>([]);
  const [auditName, setAuditName] = useState("");
  const [compareId, setCompareId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  // Load saved audits on mount
  useEffect(() => {
    setSavedAudits(loadSavedAudits());
  }, []);

  const ratedCount = Object.keys(scores).length;
  const allRated = ratedCount === TOTAL_QUESTIONS;
  const currentCat = categories[currentCategory];
  const currentCatComplete = currentCat.questions.every(
    (q) => scores[q.id] !== undefined
  );

  const totalScore = getTotalScore(scores);
  const gradeInfo = getGrade(totalScore);
  const overallPct = Math.round((totalScore / MAX_SCORE) * 100);
  const weakest = getWeakestCategories(scores);
  const plainText = formatResultsText(scores);

  const compareAudit = compareId
    ? savedAudits.find((a) => a.id === compareId) ?? null
    : null;

  function handleRate(questionId: string, value: number) {
    setScores((prev) => ({ ...prev, [questionId]: value }));
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
    setScores({});
    setSubmitted(false);
    setCurrentCategory(0);
    setCompareId(null);
    setAuditName("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSave() {
    const name = auditName.trim() || `Audit ${new Date().toLocaleDateString()}`;
    const newAudit: SavedAudit = {
      id: Date.now().toString(),
      name,
      date: new Date().toISOString(),
      scores: { ...scores },
    };
    const updated = [newAudit, ...savedAudits].slice(0, 10); // keep last 10
    setSavedAudits(updated);
    persistAudits(updated);
    setAuditName("");
  }

  function handleDeleteAudit(id: string) {
    const updated = savedAudits.filter((a) => a.id !== id);
    setSavedAudits(updated);
    persistAudits(updated);
    if (compareId === id) setCompareId(null);
  }

  function handleLoadAudit(audit: SavedAudit) {
    setScores({ ...audit.scores });
    setSubmitted(true);
    setShowHistory(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <article className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Audit Scorecard",
          description:
            "Free interactive tool to score your marketing across 8 categories with 40 criteria. Get a grade, benchmark comparison, and prioritized recommendations.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Marketing Audit Scorecard" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing Audit Scorecard
            </h1>
            <SectionDesc>
              Score your marketing across 8 categories and 40 criteria.
              Get a grade, benchmark comparisons, and a prioritized list
              of improvements to focus on first.
            </SectionDesc>
          </Animate>

          {/* History toggle */}
          {savedAudits.length > 0 && !submitted && (
            <Animate animation="fade-up">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="mt-6 min-h-[44px] px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                {showHistory ? "Hide Saved Audits" : `View Saved Audits (${savedAudits.length})`}
              </button>
            </Animate>
          )}
        </div>
      </section>

      {/* ---- Saved Audits Panel ---- */}
      {showHistory && !submitted && (
        <section className="px-6 lg:px-12 pb-8" aria-label="Saved audits">
          <div className="max-w-3xl mx-auto">
            <Stagger stagger={80} className="space-y-3">
              {savedAudits.map((audit) => {
                const auditTotal = getTotalScore(audit.scores);
                const auditGrade = getGrade(auditTotal);
                return (
                  <div
                    key={audit.id}
                    className="border border-gray-200 p-5 flex items-center justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-bold text-black truncate">
                        {audit.name}
                      </p>
                      <p className="text-base text-gray-500">
                        {new Date(audit.date).toLocaleDateString()} &middot; Grade: {auditGrade.grade} &middot; {auditTotal}/{MAX_SCORE}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleLoadAudit(audit)}
                        className="min-h-[44px] px-4 py-2 text-base font-bold bg-black text-white hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteAudit(audit.id)}
                        aria-label={`Delete ${audit.name}`}
                        className="min-h-[44px] px-4 py-2 text-base font-bold border border-gray-200 text-gray-500 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </Stagger>
          </div>
        </section>
      )}

      {!submitted ? (
        <>
          {/* ---- Progress Indicator ---- */}
          <section className="px-6 lg:px-12 pb-6">
            <div className="max-w-3xl mx-auto">
              <Animate animation="fade-up">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-base font-bold text-black">
                    Category {currentCategory + 1} of {categories.length}
                  </p>
                  <p className="text-base text-gray-500">
                    {ratedCount} / {TOTAL_QUESTIONS} rated
                  </p>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div
                    className="bg-black h-2 transition-all motion-reduce:transition-none"
                    style={{
                      width: `${(ratedCount / TOTAL_QUESTIONS) * 100}%`,
                    }}
                  />
                </div>

                {/* Category nav pills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {categories.map((cat, i) => {
                    const catComplete = cat.questions.every(
                      (q) => scores[q.id] !== undefined
                    );
                    return (
                      <button
                        key={cat.key}
                        onClick={() => setCurrentCategory(i)}
                        aria-label={`${cat.label} - category ${i + 1}`}
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

          {/* ---- Current Category Questions ---- */}
          <section className="px-6 lg:px-12 py-8" aria-label="Scorecard questions">
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
                    {currentCat.questions.map((q, idx) => (
                      <div key={q.id}>
                        <p className="text-base font-bold text-black mb-1">
                          {idx + 1}. {q.label}
                        </p>
                        <p className="text-base text-gray-500 mb-4">
                          {q.tip}
                        </p>
                        <StarRating
                          questionId={q.id}
                          value={scores[q.id] ?? 0}
                          onChange={handleRate}
                          label={q.label}
                        />
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
                  Rate all {TOTAL_QUESTIONS} questions to see your results
                </p>
              )}
            </div>
          </section>
        </>
      ) : (
        <>
          {/* ==== RESULTS ==== */}

          {/* ---- Overall Score ---- */}
          <section className="px-6 lg:px-12 py-8" aria-label="Scorecard results">
            <div className="max-w-3xl mx-auto">
              <Animate animation="fade-up">
                <div className="bg-black text-white p-8 text-center mb-10">
                  <p className="text-base text-gray-400 mb-2">Your Marketing Score</p>
                  <div className="font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,5rem)] font-extrabold leading-none">
                    {totalScore}<span className="text-gray-500 text-[clamp(1.5rem,4vw,2.5rem)]"> / {MAX_SCORE}</span>
                  </div>
                  <div className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,4vw,2rem)] font-extrabold mt-2">
                    Grade: {gradeInfo.grade}
                  </div>
                  <div className="w-full bg-white/20 h-3 mt-6">
                    <div
                      className="bg-white h-3 transition-all motion-reduce:transition-none"
                      style={{ width: `${overallPct}%` }}
                    />
                  </div>
                  <p className="text-base text-gray-300 mt-4">
                    {gradeInfo.label} &middot; {overallPct}%
                  </p>
                  <p className="text-base text-gray-400 mt-2 max-w-xl mx-auto">
                    {gradeInfo.description}
                  </p>
                </div>
              </Animate>

              {/* ---- Category Score Bars with Benchmarks ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-2">
                  Category Breakdown
                </h2>
                <p className="text-base text-gray-500 mb-6">
                  Your score vs. industry benchmark for each category. The gray line marks the benchmark.
                </p>
              </Animate>

              <Stagger stagger={100} className="space-y-6 mb-12">
                {categories.map((cat) => {
                  const score = getCategoryScore(cat, scores);
                  const catMax = getCategoryMax();
                  const catPct = Math.round((score / catMax) * 100);
                  const compareScore = compareAudit
                    ? getCategoryScore(cat, compareAudit.scores)
                    : null;

                  return (
                    <div key={cat.key} className="border border-gray-200 p-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                            {cat.label}
                          </h3>
                          <p className="text-base text-gray-500 mt-1">
                            {score} / {catMax} ({catPct}%)
                            {score < cat.benchmark && (
                              <span className="ml-2 text-gray-400">
                                &middot; Below benchmark
                              </span>
                            )}
                          </p>
                        </div>
                        <div
                          className={`min-w-[60px] text-center px-3 py-1 text-base font-bold ${
                            score >= 20
                              ? "bg-black text-white"
                              : score >= 13
                                ? "bg-gray-700 text-white"
                                : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {catPct}%
                        </div>
                      </div>
                      <ProgressBar score={score} max={catMax} benchmark={cat.benchmark} />
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-base text-gray-400">
                          Benchmark: {cat.benchmark}/{catMax}
                        </p>
                        {compareScore !== null && (
                          <p className="text-base text-gray-400">
                            Previous: {compareScore}/{catMax}
                          </p>
                        )}
                      </div>

                      {/* Per-question scores */}
                      <div className="grid grid-cols-5 gap-3 mt-4">
                        {cat.questions.map((q) => {
                          const val = scores[q.id] ?? 0;
                          return (
                            <div key={q.id} className="text-center">
                              <div
                                className={`text-base font-bold ${
                                  val >= 4
                                    ? "text-black"
                                    : val >= 3
                                      ? "text-gray-600"
                                      : "text-gray-400"
                                }`}
                              >
                                {val}/5
                              </div>
                              <p className="text-base text-gray-500 mt-1 leading-snug">
                                {q.label.length > 10
                                  ? q.label.slice(0, 9) + "..."
                                  : q.label}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </Stagger>

              {/* ---- Priority Recommendations ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-2">
                  Priority Improvements
                </h2>
                <p className="text-base text-gray-500 mb-6">
                  Focus on these three lowest-scoring categories first to make the biggest impact.
                </p>
              </Animate>

              <Stagger stagger={100} className="space-y-6 mb-12">
                {weakest.map((cat, i) => {
                  const score = getCategoryScore(cat, scores);
                  return (
                    <div key={cat.key} className="border border-gray-200 p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-black text-white font-bold text-base">
                          {i + 1}
                        </div>
                        <div>
                          <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                            {cat.label}
                          </h3>
                          <p className="text-base text-gray-500">
                            Score: {score}/{getCategoryMax()}
                          </p>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        {cat.recommendations.map((rec, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-base text-gray-600"
                          >
                            <span className="font-bold text-black min-w-[24px]">
                              {j + 1}.
                            </span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </Stagger>

              {/* ---- Save Audit ---- */}
              <Animate animation="fade-up">
                <div className="border border-gray-200 p-6 mb-8">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                    Save This Audit
                  </h2>
                  <p className="text-base text-gray-500 mb-4">
                    Save your results to compare against future audits. Data is stored in your browser.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <label className="sr-only" htmlFor="audit-name">
                      Audit name
                    </label>
                    <input
                      id="audit-name"
                      type="text"
                      value={auditName}
                      onChange={(e) => setAuditName(e.target.value)}
                      placeholder="Audit name (optional)"
                      className="flex-1 min-h-[44px] px-4 py-3 text-base border border-gray-200 text-black placeholder:text-gray-400 focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none"
                    />
                    <button
                      onClick={handleSave}
                      className="min-h-[44px] px-6 py-3 text-base font-bold bg-black text-white hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                    >
                      Save Audit
                    </button>
                  </div>
                </div>
              </Animate>

              {/* ---- Compare with Saved Audit ---- */}
              {savedAudits.length > 0 && (
                <Animate animation="fade-up">
                  <div className="border border-gray-200 p-6 mb-8">
                    <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                      Compare with Previous Audit
                    </h2>
                    <label className="sr-only" htmlFor="compare-select">
                      Select a saved audit to compare
                    </label>
                    <select
                      id="compare-select"
                      value={compareId ?? ""}
                      onChange={(e) =>
                        setCompareId(e.target.value || null)
                      }
                      className="w-full min-h-[44px] px-4 py-3 text-base border border-gray-200 text-black bg-white focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none"
                    >
                      <option value="">Select an audit to compare</option>
                      {savedAudits.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name} ({new Date(a.date).toLocaleDateString()}) - {getTotalScore(a.scores)}/{MAX_SCORE}
                        </option>
                      ))}
                    </select>

                    {compareAudit && (
                      <div className="mt-6 space-y-4">
                        <div className="flex items-center justify-between text-base">
                          <span className="font-bold text-black">Current Audit</span>
                          <span className="font-bold text-black">{totalScore}/{MAX_SCORE}</span>
                        </div>
                        <div className="flex items-center justify-between text-base">
                          <span className="text-gray-500">{compareAudit.name}</span>
                          <span className="text-gray-500">{getTotalScore(compareAudit.scores)}/{MAX_SCORE}</span>
                        </div>
                        <div className="flex items-center justify-between text-base">
                          <span className="font-bold text-black">Difference</span>
                          <span className={`font-bold ${totalScore >= getTotalScore(compareAudit.scores) ? "text-black" : "text-gray-500"}`}>
                            {totalScore >= getTotalScore(compareAudit.scores) ? "+" : ""}
                            {totalScore - getTotalScore(compareAudit.scores)} points
                          </span>
                        </div>

                        {/* Per-category comparison */}
                        <div className="border-t border-gray-200 pt-4 mt-4 space-y-3">
                          {categories.map((cat) => {
                            const curr = getCategoryScore(cat, scores);
                            const prev = getCategoryScore(cat, compareAudit.scores);
                            const diff = curr - prev;
                            return (
                              <div key={cat.key} className="flex items-center justify-between text-base">
                                <span className="text-gray-600">{cat.label}</span>
                                <span className={`font-bold ${diff > 0 ? "text-black" : diff < 0 ? "text-gray-400" : "text-gray-500"}`}>
                                  {diff > 0 ? "+" : ""}{diff}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </Animate>
              )}

              {/* ---- Copy / Download / Retake ---- */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <CopyButton text={plainText} />
                <DownloadButton
                  text={plainText}
                  filename="marketing-audit-scorecard.txt"
                />
                <button
                  onClick={handleReset}
                  className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border-2 border-black text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Retake Scorecard
                </button>
              </div>

              {/* ---- CTA ---- */}
              <Animate animation="fade-up">
                <div className="bg-black text-white p-8 text-center mb-12">
                  <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold mb-3">
                    Want Expert Help Improving Your Score?
                  </h2>
                  <p className="text-base text-gray-400 max-w-xl mx-auto mb-6">
                    Our team can build a custom action plan to address your weakest
                    categories and accelerate your marketing results.
                  </p>
                  <a
                    href="/get-a-quote"
                    className="inline-flex items-center justify-center min-h-[44px] px-8 py-4 text-base font-bold bg-white text-black hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                  >
                    Get a Free Consultation
                  </a>
                </div>
              </Animate>
            </div>
          </section>
        </>
      )}
    
      {/* CTA */}
      <section className="bg-black text-white px-6 lg:px-12 py-16 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold mb-4">Need Expert Help?</h2>
        <p className="text-base text-neutral-300 mb-8 max-w-2xl mx-auto">Our team can help you implement these insights and drive measurable results for your business.</p>
        <Link href="/contact" className="inline-block bg-white text-black font-bold px-8 py-3 text-base hover:bg-neutral-200 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Get in Touch</Link>
      </section>
    
      <ToolCTA
        toolName="Marketing Audit Scorecard"
        services={[
          { title: "Digital Marketing", desc: "Data-driven strategy with transparent reporting and insights.", href: "/services/digital-marketing" },
          { title: "Performance Marketing", desc: "Campaign optimization based on real performance data.", href: "/services/performance-marketing" },
          { title: "SEO", desc: "SEO analytics that show exactly what drives organic growth.", href: "/services/seo" },
        ]}
        relatedTools={[
          { title: "Marketing Budget Planner", href: "/resources/marketing-budget-planner" },
          { title: "Kpi Dashboard", href: "/resources/kpi-dashboard" },
          { title: "Landing Page Grader", href: "/resources/landing-page-grader" },
          { title: "Launch Countdown", href: "/resources/launch-countdown" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
