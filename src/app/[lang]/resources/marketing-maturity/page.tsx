"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
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
  text: string;
}

interface Dimension {
  key: string;
  label: string;
  description: string;
  questions: Question[];
}

type AnswerMap = Record<string, number>;

interface LevelInfo {
  label: string;
  range: string;
  description: string;
}

interface OverallLevel {
  label: string;
  range: string;
  description: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const answerOptions = [
  { label: "Not at all", value: 0 },
  { label: "Partially", value: 1 },
  { label: "Mostly", value: 2 },
  { label: "Fully", value: 3 },
];

const dimensions: Dimension[] = [
  {
    key: "strategy",
    label: "Strategy & Planning",
    description: "How well-defined and executed is your marketing strategy?",
    questions: [
      { id: "strategy-1", text: "Do you have a documented marketing strategy?" },
      { id: "strategy-2", text: "Are your marketing goals SMART (Specific, Measurable, Achievable, Relevant, Time-bound)?" },
      { id: "strategy-3", text: "Do you review and adjust your strategy quarterly?" },
      { id: "strategy-4", text: "Is there executive buy-in for your marketing initiatives?" },
    ],
  },
  {
    key: "data",
    label: "Data & Analytics",
    description: "How effectively do you collect, analyze, and act on marketing data?",
    questions: [
      { id: "data-1", text: "Is tracking properly set up across your website and campaigns?" },
      { id: "data-2", text: "Do you use attribution modeling to understand channel performance?" },
      { id: "data-3", text: "Do you report on marketing performance regularly?" },
      { id: "data-4", text: "Do you make decisions and take action based on data insights?" },
    ],
  },
  {
    key: "content",
    label: "Content & Brand",
    description: "How consistent and strategic is your content and brand presence?",
    questions: [
      { id: "content-1", text: "Is your brand identity consistent across all touchpoints?" },
      { id: "content-2", text: "Do you maintain and follow a content calendar?" },
      { id: "content-3", text: "Is your content optimized for SEO?" },
      { id: "content-4", text: "Do you repurpose content across multiple formats and channels?" },
    ],
  },
  {
    key: "channels",
    label: "Channel Execution",
    description: "How well do you execute across your marketing channels?",
    questions: [
      { id: "channels-1", text: "Are you actively marketing on 3 or more channels?" },
      { id: "channels-2", text: "Do you regularly test different creatives and messaging?" },
      { id: "channels-3", text: "Is your audience targeting refined based on performance data?" },
      { id: "channels-4", text: "Do you optimize your campaigns on a regular cadence?" },
    ],
  },
  {
    key: "technology",
    label: "Technology & Automation",
    description: "How advanced is your marketing technology stack?",
    questions: [
      { id: "technology-1", text: "Do you use a CRM to manage leads and customer relationships?" },
      { id: "technology-2", text: "Are key marketing workflows automated (email sequences, lead scoring, etc.)?" },
      { id: "technology-3", text: "Is your marketing tech stack integrated (CRM, analytics, ads, email)?" },
      { id: "technology-4", text: "Do you use AI tools to enhance marketing efficiency?" },
    ],
  },
  {
    key: "team",
    label: "Team & Process",
    description: "How structured and capable is your marketing team?",
    questions: [
      { id: "team-1", text: "Do you have dedicated marketing roles or team members?" },
      { id: "team-2", text: "Are your marketing processes documented?" },
      { id: "team-3", text: "Does your team participate in regular training or skill development?" },
      { id: "team-4", text: "Is there a regular review cadence for marketing performance and priorities?" },
    ],
  },
];

const dimensionLevels: LevelInfo[] = [
  { label: "Beginner", range: "0-3", description: "Minimal or no formal processes in place." },
  { label: "Developing", range: "4-6", description: "Some foundations exist but inconsistently applied." },
  { label: "Established", range: "7-9", description: "Solid practices in place with room to optimize." },
  { label: "Advanced", range: "10-12", description: "Mature, optimized processes driving strong results." },
];

const overallLevels: OverallLevel[] = [
  { label: "Starter", range: "0-17", description: "Your marketing is in its early stages. Focus on building foundational processes and establishing clear goals before scaling." },
  { label: "Growing", range: "18-35", description: "You have some building blocks in place. Prioritize filling the gaps in your weakest dimensions to create a more balanced approach." },
  { label: "Scaling", range: "36-53", description: "Your marketing engine is running. Focus on optimization, integration across channels, and leveraging data for better decisions." },
  { label: "Leading", range: "54-72", description: "Your marketing is mature and well-executed. Focus on innovation, advanced personalization, and maintaining your competitive edge." },
];

/* ------------------------------------------------------------------ */
/*  Roadmap recommendations per dimension per level                    */
/* ------------------------------------------------------------------ */

const roadmap: Record<string, string[]> = {
  "strategy-beginner": [
    "Write a one-page marketing strategy document outlining your target audience, positioning, and top 3 goals.",
    "Set at least 3 SMART goals for the next quarter.",
    "Schedule a monthly strategy review meeting with key stakeholders.",
  ],
  "strategy-developing": [
    "Formalize your strategy into a quarterly planning process with clear milestones.",
    "Align marketing goals with overall business objectives and get leadership sign-off.",
    "Introduce a competitive analysis component into your planning cycle.",
  ],
  "strategy-established": [
    "Build scenario-based planning for different growth trajectories.",
    "Create a rolling 12-month strategic roadmap with quarterly checkpoints.",
    "Establish cross-functional alignment sessions between marketing, sales, and product.",
  ],
  "strategy-advanced": [
    "Invest in predictive planning using historical performance data.",
    "Explore market expansion opportunities informed by your mature strategy framework.",
    "Mentor other teams on strategic planning best practices.",
  ],
  "data-beginner": [
    "Install and configure analytics on your website (Google Analytics or equivalent).",
    "Set up conversion tracking for your most important actions (form fills, purchases, sign-ups).",
    "Create a simple monthly dashboard with your top 5 metrics.",
  ],
  "data-developing": [
    "Implement UTM parameters consistently across all campaigns.",
    "Set up a basic attribution model to understand which channels drive results.",
    "Schedule weekly data review sessions to identify trends and act on them.",
  ],
  "data-established": [
    "Move to multi-touch attribution to capture the full customer journey.",
    "Automate your reporting pipeline to reduce manual work.",
    "Build cohort analyses to understand long-term marketing impact.",
  ],
  "data-advanced": [
    "Implement predictive analytics to forecast campaign outcomes.",
    "Use data to run personalization experiments at scale.",
    "Establish a data governance framework to maintain data quality.",
  ],
  "content-beginner": [
    "Define your brand voice, colors, and visual identity in a simple brand guide.",
    "Create a basic content calendar with at least 2 pieces of content per month.",
    "Research your top 10 target keywords and start creating content around them.",
  ],
  "content-developing": [
    "Audit your existing content for brand consistency and update any off-brand materials.",
    "Increase your content cadence and add SEO optimization to your workflow.",
    "Start repurposing your best-performing content into different formats (blog to social, video to blog).",
  ],
  "content-established": [
    "Build a content pillar strategy around your key topics for deeper authority.",
    "Implement a content performance scoring system to guide future production.",
    "Develop a systematic repurposing workflow to maximize each piece of content.",
  ],
  "content-advanced": [
    "Create personalized content paths for different audience segments.",
    "Invest in original research or data-driven content to differentiate your brand.",
    "Build thought leadership through executive content and industry contributions.",
  ],
  "channels-beginner": [
    "Identify your top 2-3 channels based on where your audience spends time.",
    "Set up tracking and baseline metrics for each active channel.",
    "Start with one paid channel and learn the fundamentals before expanding.",
  ],
  "channels-developing": [
    "Implement A/B testing on your best-performing channel before expanding to others.",
    "Refine your audience targeting using performance data from existing campaigns.",
    "Create a channel-specific strategy document with goals and KPIs for each.",
  ],
  "channels-established": [
    "Build an integrated cross-channel strategy where channels work together.",
    "Implement systematic creative testing (copy, imagery, formats) across all channels.",
    "Create automated optimization rules for your highest-spend campaigns.",
  ],
  "channels-advanced": [
    "Develop advanced audience segmentation and lookalike strategies across channels.",
    "Test emerging channels and formats to stay ahead of the competition.",
    "Build full-funnel attribution to understand how channels influence each other.",
  ],
  "technology-beginner": [
    "Choose and implement a CRM system suited to your business size and needs.",
    "Set up at least one automated email sequence (welcome series or lead nurture).",
    "Audit your current tools and identify the biggest gaps in your tech stack.",
  ],
  "technology-developing": [
    "Integrate your CRM with your email marketing and analytics platforms.",
    "Automate your lead scoring process to prioritize the best opportunities.",
    "Explore AI-powered tools for content creation, ad optimization, or customer insights.",
  ],
  "technology-established": [
    "Build end-to-end automation across the customer lifecycle (acquisition to retention).",
    "Implement a customer data platform to unify data across all tools.",
    "Create automated alert systems for performance anomalies.",
  ],
  "technology-advanced": [
    "Explore custom AI/ML models for predictive lead scoring and personalization.",
    "Evaluate and consolidate your tech stack for maximum efficiency.",
    "Build custom integrations or APIs to connect niche tools in your workflow.",
  ],
  "team-beginner": [
    "Define clear marketing roles and responsibilities, even if one person fills multiple roles.",
    "Document your top 5 recurring marketing processes step by step.",
    "Invest in at least one training course or certification for your team this quarter.",
  ],
  "team-developing": [
    "Create a marketing playbook that covers all core processes and workflows.",
    "Establish a regular team training schedule (monthly learning sessions or workshops).",
    "Set up weekly or biweekly marketing review meetings with a consistent agenda.",
  ],
  "team-established": [
    "Build a skills matrix and create individual development plans for each team member.",
    "Implement a formal marketing operations review process (monthly retrospectives).",
    "Create cross-training programs so knowledge is not siloed in one person.",
  ],
  "team-advanced": [
    "Develop a marketing center of excellence to standardize best practices across the organization.",
    "Invest in leadership development for senior marketing team members.",
    "Build an innovation lab or experimentation framework for testing new approaches.",
  ],
};

/* ------------------------------------------------------------------ */
/*  Helper functions                                                   */
/* ------------------------------------------------------------------ */

function getDimensionScore(dim: Dimension, answers: AnswerMap): number {
  return dim.questions.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
}

function getDimensionLevel(score: number): LevelInfo {
  if (score >= 10) return dimensionLevels[3];
  if (score >= 7) return dimensionLevels[2];
  if (score >= 4) return dimensionLevels[1];
  return dimensionLevels[0];
}

function getOverallLevel(totalScore: number): OverallLevel {
  if (totalScore >= 54) return overallLevels[3];
  if (totalScore >= 36) return overallLevels[2];
  if (totalScore >= 18) return overallLevels[1];
  return overallLevels[0];
}

function getRoadmapKey(dimensionKey: string, score: number): string {
  const level = getDimensionLevel(score);
  return `${dimensionKey}-${level.label.toLowerCase()}`;
}

function getAllQuestionsCount(): number {
  return dimensions.reduce((sum, dim) => sum + dim.questions.length, 0);
}

/* ------------------------------------------------------------------ */
/*  Format results as plain text                                       */
/* ------------------------------------------------------------------ */

function formatResultsText(answers: AnswerMap): string {
  const lines: string[] = [];
  const totalScore = dimensions.reduce((sum, dim) => sum + getDimensionScore(dim, answers), 0);
  const maxScore = getAllQuestionsCount() * 3;
  const overall = getOverallLevel(totalScore);

  lines.push("MARKETING MATURITY ASSESSMENT RESULTS");
  lines.push("=".repeat(50));
  lines.push(`Overall Score: ${totalScore} / ${maxScore}`);
  lines.push(`Maturity Level: ${overall.label}`);
  lines.push(`${overall.description}`);
  lines.push("");

  for (const dim of dimensions) {
    const score = getDimensionScore(dim, answers);
    const level = getDimensionLevel(score);
    lines.push(`${dim.label.toUpperCase()}`);
    lines.push("-".repeat(30));
    lines.push(`Score: ${score} / 12 (${level.label})`);
    lines.push("");
    for (const q of dim.questions) {
      const val = answers[q.id] ?? 0;
      const ansLabel = answerOptions.find((a) => a.value === val)?.label ?? "Not answered";
      lines.push(`  ${q.text}`);
      lines.push(`    Answer: ${ansLabel} (${val}/3)`);
    }
    lines.push("");

    const key = getRoadmapKey(dim.key, score);
    const tips = roadmap[key];
    if (tips) {
      lines.push(`  Next Steps:`);
      tips.forEach((tip, i) => lines.push(`    ${i + 1}. ${tip}`));
      lines.push("");
    }
  }

  lines.push("Generated by Markit Media Marketing Maturity Assessment");
  lines.push("https://themarkitmedia.com/resources/marketing-maturity");

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Maturity Assessment",
          description: "How well-defined and executed is your marketing strategy?",
          url: "https://themarkitmedia.com/en/resources/marketing-maturity",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Marketing Maturity Assessment | Free Marketing Tool — Markit Media</title>
      <meta name="description" content="How well-defined and executed is your marketing strategy?" />
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
      Download as Text
    </button>
  );
}

function ProgressBar({ score, max }: { score: number; max: number }) {
  const pct = Math.round((score / max) * 100);
  return (
    <div className="w-full bg-gray-200 h-3">
      <div
        className="bg-black h-3 transition-all motion-reduce:transition-none"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */



export default function MarketingMaturityPage() {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentDimension, setCurrentDimension] = useState(0);

  const totalQuestions = getAllQuestionsCount();
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === totalQuestions;

  const currentDim = dimensions[currentDimension];
  const currentDimAnswered = currentDim.questions.every(
    (q) => answers[q.id] !== undefined
  );

  function handleAnswer(questionId: string, value: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function handleNext() {
    if (currentDimension < dimensions.length - 1) {
      setCurrentDimension((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handlePrev() {
    if (currentDimension > 0) {
      setCurrentDimension((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleSubmit() {
    if (allAnswered) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleReset() {
    setAnswers({});
    setSubmitted(false);
    setCurrentDimension(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const totalScore = dimensions.reduce(
    (sum, dim) => sum + getDimensionScore(dim, answers),
    0
  );
  const maxScore = totalQuestions * 3;
  const overall = getOverallLevel(totalScore);
  const plainText = formatResultsText(answers);

  return (
    <article className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Maturity Assessment",
          description:
            "Free self-assessment tool to evaluate your company's marketing maturity across 6 dimensions: Strategy, Data, Content, Channels, Technology, and Team.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Marketing Maturity Assessment" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing Maturity Assessment
            </h1>
            <SectionDesc>
              Evaluate your marketing across 6 key dimensions with 24 targeted
              questions. Get a clear picture of where you stand, plus a
              personalized growth roadmap with specific next steps.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {!submitted ? (
        <>
          {/* ---- Progress Indicator ---- */}
          <section aria-label="Content section" className="px-6 lg:px-12 pb-6">
            <div className="max-w-3xl mx-auto">
              <Animate animation="fade-up">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-base font-bold text-black">
                    Dimension {currentDimension + 1} of {dimensions.length}
                  </p>
                  <p className="text-base text-gray-500">
                    {answeredCount} / {totalQuestions} answered
                  </p>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div
                    className="bg-black h-2 transition-all motion-reduce:transition-none"
                    style={{
                      width: `${(answeredCount / totalQuestions) * 100}%`,
                    }}
                  />
                </div>

                {/* Dimension nav pills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {dimensions.map((dim, i) => {
                    const dimAnswered = dim.questions.every(
                      (q) => answers[q.id] !== undefined
                    );
                    return (
                      <button
                        key={dim.key}
                        onClick={() => setCurrentDimension(i)}
                        className={`min-h-[44px] px-4 py-2 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                          i === currentDimension
                            ? "bg-black text-white"
                            : dimAnswered
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

          {/* ---- Current Dimension Questions ---- */}
          <section className="px-6 lg:px-12 py-8" aria-label="Assessment questions">
            <div className="max-w-3xl mx-auto">
              <Animate animation="fade-up" key={currentDim.key}>
                <div className="border border-gray-200 mb-8">
                  <div className="bg-black text-white px-6 py-5">
                    <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold">
                      {currentDim.label}
                    </h2>
                    <p className="text-base text-gray-400 mt-1">
                      {currentDim.description}
                    </p>
                  </div>

                  <div className="p-6 space-y-8">
                    {currentDim.questions.map((q, qIdx) => (
                      <div key={q.id}>
                        <p className="text-base font-bold text-black mb-4">
                          {qIdx + 1}. {q.text}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {answerOptions.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => handleAnswer(q.id, opt.value)}
                              className={`min-h-[44px] px-4 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                                answers[q.id] === opt.value
                                  ? "bg-black text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Animate>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={handlePrev}
                  disabled={currentDimension === 0}
                  className={`min-h-[44px] px-8 py-4 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                    currentDimension === 0
                      ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                      : "border-2 border-black text-black hover:bg-black hover:text-white"
                  }`}
                >
                  &larr; Previous
                </button>

                {currentDimension < dimensions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    disabled={!currentDimAnswered}
                    className={`min-h-[44px] px-8 py-4 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      currentDimAnswered
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Next &rarr;
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!allAnswered}
                    className={`min-h-[44px] px-10 py-4 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      allAnswered
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    See My Results &rarr;
                  </button>
                )}
              </div>

              {!allAnswered && currentDimension === dimensions.length - 1 && (
                <p className="text-base text-gray-400 text-center mt-4">
                  Answer all {totalQuestions} questions to see your results
                </p>
              )}
            </div>
          </section>
        </>
      ) : (
        <>
          {/* ---- Results: Overall Score ---- */}
          <section className="px-6 lg:px-12 py-8" aria-label="Assessment results">
            <div className="max-w-3xl mx-auto">
              <Animate animation="fade-up">
                <div className="bg-black text-white p-8 text-center mb-10">
                  <p className="text-base text-gray-400 mb-2">Your Overall Maturity Level</p>
                  <div className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold">
                    {overall.label}
                  </div>
                  <div className="text-base text-gray-400 mt-2">
                    {totalScore} / {maxScore} points
                  </div>
                  <div className="w-full bg-white/20 h-3 mt-6">
                    <div
                      className="bg-white h-3 transition-all motion-reduce:transition-none"
                      style={{ width: `${(totalScore / maxScore) * 100}%` }}
                    />
                  </div>
                  <p className="text-base text-gray-300 mt-4 max-w-xl mx-auto">
                    {overall.description}
                  </p>
                </div>
              </Animate>

              {/* ---- Results: Per-Dimension Breakdown ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                  Dimension Scores
                </h2>
              </Animate>

              <Stagger stagger={100} className="space-y-6 mb-12">
                {dimensions.map((dim) => {
                  const score = getDimensionScore(dim, answers);
                  const level = getDimensionLevel(score);
                  return (
                    <div key={dim.key} className="border border-gray-200 p-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                            {dim.label}
                          </h3>
                          <p className="text-base text-gray-500 mt-1">
                            {level.label} ({score}/12)
                          </p>
                        </div>
                        <div
                          className={`min-w-[80px] text-center px-3 py-1 text-base font-bold ${
                            score >= 10
                              ? "bg-black text-white"
                              : score >= 7
                                ? "bg-gray-700 text-white"
                                : score >= 4
                                  ? "bg-gray-300 text-black"
                                  : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {level.label}
                        </div>
                      </div>
                      <ProgressBar score={score} max={12} />
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                        {dim.questions.map((q) => {
                          const val = answers[q.id] ?? 0;
                          return (
                            <div key={q.id} className="text-center">
                              <div
                                className={`text-base font-bold ${
                                  val === 3
                                    ? "text-black"
                                    : val >= 2
                                      ? "text-gray-600"
                                      : "text-gray-400"
                                }`}
                              >
                                {val}/3
                              </div>
                              <p className="text-base text-gray-500 mt-1 leading-snug">
                                Q{dim.questions.indexOf(q) + 1}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </Stagger>

              {/* ---- Growth Roadmap ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-2">
                  Your Growth Roadmap
                </h2>
                <p className="text-base text-gray-500 mb-6">
                  Based on your scores, here are specific next steps for each
                  dimension to move to the next level.
                </p>
              </Animate>

              <Stagger stagger={100} className="space-y-6 mb-12">
                {dimensions.map((dim) => {
                  const score = getDimensionScore(dim, answers);
                  const level = getDimensionLevel(score);
                  const key = getRoadmapKey(dim.key, score);
                  const tips = roadmap[key] ?? [];
                  return (
                    <div key={dim.key} className="border border-gray-200 p-6">
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-1">
                        {dim.label}
                      </h3>
                      <p className="text-base text-gray-500 mb-4">
                        Currently: {level.label} ({score}/12)
                      </p>
                      {tips.length > 0 ? (
                        <ul className="space-y-3">
                          {tips.map((tip, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-base text-gray-600"
                            >
                              <span className="font-bold text-black min-w-[24px]">
                                {i + 1}.
                              </span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-base text-gray-400">
                          No specific recommendations at this level.
                        </p>
                      )}
                    </div>
                  );
                })}
              </Stagger>

              {/* ---- Copy / Download / Retake ---- */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <CopyButton text={plainText} />
                <DownloadButton
                  text={plainText}
                  filename="marketing-maturity-assessment.txt"
                />
                <button
                  onClick={handleReset}
                  className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border-2 border-black text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Retake Assessment
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ---- What Each Level Means ---- */}
      <section aria-label="Understanding Your Score" className="px-6 lg:px-12 py-20 border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Understanding Your Score</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-3 mb-8">
              What Each Level Means
            </h2>
          </Animate>

          <Stagger stagger={100} className="space-y-6">
            {overallLevels.map((level) => (
              <div key={level.label} className="border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="min-w-[80px] text-center px-3 py-2 bg-black text-white font-bold text-base">
                    {level.range}
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                      {level.label}
                    </h3>
                    <p className="text-base text-gray-600 mt-1">
                      {level.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Accelerate Your Marketing?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team can help you build a roadmap tailored to your business
              goals and move your marketing to the next level.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Marketing Maturity"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Marketing Expense Tracker", href: "/resources/marketing-expense-tracker" },
          { title: "Marketing Proposal Generator", href: "/resources/marketing-proposal-generator" },
          { title: "Marketing Rfp Template", href: "/resources/marketing-rfp-template" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
