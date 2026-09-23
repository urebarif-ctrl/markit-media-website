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

interface ContentItem {
  id: string;
  label: string;
}

interface Stage {
  id: string;
  title: string;
  items: ContentItem[];
  maxScore: number;
}

const stages: Stage[] = [
  {
    id: "awareness",
    title: "Awareness Stage Content",
    items: [
      { id: "aw-1", label: "Blog articles addressing key pain points" },
      { id: "aw-2", label: "Educational guides or how-to content" },
      { id: "aw-3", label: "Infographics or visual content" },
      { id: "aw-4", label: "Video content (explainers, tutorials)" },
      { id: "aw-5", label: "Social media thought leadership" },
      { id: "aw-6", label: "Industry research or reports" },
    ],
    maxScore: 18,
  },
  {
    id: "consideration",
    title: "Consideration Stage Content",
    items: [
      { id: "co-1", label: "Product/service comparison pages" },
      { id: "co-2", label: "Case studies or success stories" },
      { id: "co-3", label: "Webinars or demo videos" },
      { id: "co-4", label: "Buyer guides or evaluation criteria" },
      { id: "co-5", label: "ROI calculators or interactive tools" },
      { id: "co-6", label: "FAQ pages addressing objections" },
    ],
    maxScore: 18,
  },
  {
    id: "decision",
    title: "Decision Stage Content",
    items: [
      { id: "de-1", label: "Pricing page or transparent cost info" },
      { id: "de-2", label: "Customer testimonials and reviews" },
      { id: "de-3", label: "Free trial, demo, or consultation offer" },
      { id: "de-4", label: "Onboarding or \"getting started\" content" },
      { id: "de-5", label: "Trust signals (certifications, guarantees)" },
      { id: "de-6", label: "Sales collateral or proposals" },
    ],
    maxScore: 18,
  },
  {
    id: "post-purchase",
    title: "Post-Purchase Content",
    items: [
      { id: "pp-1", label: "Welcome/onboarding email sequences" },
      { id: "pp-2", label: "Help center or knowledge base" },
      { id: "pp-3", label: "Community or user group resources" },
      { id: "pp-4", label: "Upsell/cross-sell campaigns" },
    ],
    maxScore: 12,
  },
];

const ratingLabels: Record<number, string> = {
  0: "None",
  1: "Basic",
  2: "Good",
  3: "Comprehensive",
};

interface GapImpact {
  pattern: string;
  impact: string;
}

const gapImpacts: Record<string, GapImpact> = {
  "aw-1": { pattern: "blog pain points", impact: "Blog content targeting pain points drives the majority of organic search traffic and establishes your authority with prospects who are just discovering they have a problem." },
  "aw-2": { pattern: "educational guides", impact: "Educational guides and how-to content build long-term SEO value and position you as a trusted resource, generating steady inbound leads over time." },
  "aw-3": { pattern: "infographics", impact: "Visual content like infographics earns social shares and backlinks at higher rates than text-only content, amplifying your reach across channels." },
  "aw-4": { pattern: "video content", impact: "Video content dramatically increases engagement and time on site. Search engines increasingly favor video results, and prospects retain video messages better than text." },
  "aw-5": { pattern: "social thought leadership", impact: "Thought leadership on social media builds brand recognition and trust with prospects before they even enter your sales funnel, shortening the sales cycle." },
  "aw-6": { pattern: "research reports", impact: "Original research and industry reports generate high-quality backlinks, media coverage, and position you as a data-driven authority in your space." },
  "co-1": { pattern: "comparison pages", impact: "Comparison pages capture high-intent search traffic from prospects actively evaluating options. Without them, competitors control the narrative." },
  "co-2": { pattern: "case studies", impact: "Case studies provide the social proof that moves prospects from interest to serious consideration. They answer the critical question: has this worked for someone like me?" },
  "co-3": { pattern: "webinars or demos", impact: "Webinars and demo videos let prospects experience your solution before committing, reducing friction and building confidence in the purchase decision." },
  "co-4": { pattern: "buyer guides", impact: "Buyer guides help prospects define their evaluation criteria in terms that favor your strengths, subtly positioning you as the best choice." },
  "co-5": { pattern: "ROI calculators", impact: "Interactive ROI tools make the business case tangible and personalized, helping prospects justify the purchase internally to their stakeholders." },
  "co-6": { pattern: "FAQ objection handling", impact: "FAQ pages that address common objections reduce support burden and eliminate friction points that cause prospects to abandon the buying process." },
  "de-1": { pattern: "pricing transparency", impact: "Transparent pricing reduces drop-off at the critical decision point. Prospects who cannot find pricing often assume it is too expensive and leave." },
  "de-2": { pattern: "testimonials and reviews", impact: "Customer testimonials and reviews provide the final reassurance prospects need. They are the most trusted form of marketing content at the decision stage." },
  "de-3": { pattern: "trial or demo offer", impact: "A free trial, demo, or consultation removes the last barrier to conversion by letting prospects experience value before making a financial commitment." },
  "de-4": { pattern: "getting started content", impact: "Onboarding content reduces the perceived complexity of getting started and reassures prospects that the transition will be smooth and supported." },
  "de-5": { pattern: "trust signals", impact: "Certifications, guarantees, and security badges address the risk-aversion that naturally peaks at the decision stage, tipping undecided prospects toward yes." },
  "de-6": { pattern: "sales collateral", impact: "Professional sales collateral equips your champions to sell internally, providing the polished materials needed for budget approval and stakeholder buy-in." },
  "pp-1": { pattern: "onboarding emails", impact: "Welcome email sequences dramatically improve activation rates, ensuring new customers quickly reach the value they were promised during the sales process." },
  "pp-2": { pattern: "knowledge base", impact: "A strong help center reduces support costs while improving customer satisfaction, enabling self-service problem solving at any hour." },
  "pp-3": { pattern: "community resources", impact: "Community and user group resources create network effects that increase switching costs and turn customers into advocates who generate referrals." },
  "pp-4": { pattern: "upsell campaigns", impact: "Upsell and cross-sell campaigns increase customer lifetime value, which is typically five to twenty-five times cheaper than acquiring new customers." },
};

const calendarRecommendations: Record<string, { month: string; action: string; detail: string }> = {
  "aw-1": { month: "Month 1", action: "Launch a blog series", detail: "Identify your top five customer pain points and publish one in-depth blog post per week addressing each. Aim for 1,500 or more words with practical takeaways." },
  "aw-2": { month: "Month 1", action: "Create a cornerstone guide", detail: "Develop one comprehensive how-to guide on your primary topic. This becomes a pillar page that supports all related blog content." },
  "aw-3": { month: "Month 2", action: "Design shareable infographics", detail: "Turn your best-performing blog data into two to three infographics optimized for social sharing and embeddable by other sites." },
  "aw-4": { month: "Month 2", action: "Start a short-form video series", detail: "Record five to ten short explainer videos answering common questions. Keep them under three minutes and optimize for YouTube and social." },
  "aw-5": { month: "Month 2", action: "Build a social content cadence", detail: "Commit to three to five thought leadership posts per week on your primary platform. Share insights, data, and original perspectives." },
  "aw-6": { month: "Month 3", action: "Publish original research", detail: "Survey your audience or analyze industry data to produce one original research report. Promote it through PR outreach and social campaigns." },
  "co-1": { month: "Month 1", action: "Build comparison landing pages", detail: "Create comparison pages for your top three competitors. Be factual and fair while highlighting your unique strengths." },
  "co-2": { month: "Month 1", action: "Develop three case studies", detail: "Interview your three best customers and create detailed case studies with measurable results, following a problem-solution-outcome structure." },
  "co-3": { month: "Month 2", action: "Host a product webinar", detail: "Plan and promote a webinar showcasing your solution in action. Record it for on-demand access and follow up with attendees." },
  "co-4": { month: "Month 2", action: "Write a buyer guide", detail: "Create an evaluation framework document that helps prospects compare solutions using criteria where you naturally excel." },
  "co-5": { month: "Month 3", action: "Build an ROI calculator", detail: "Develop a simple interactive calculator that lets prospects input their numbers and see projected returns from using your solution." },
  "co-6": { month: "Month 1", action: "Create a comprehensive FAQ", detail: "Document the twenty most common objections from your sales team and create clear, honest answers for each one." },
  "de-1": { month: "Month 1", action: "Add transparent pricing", detail: "Publish clear pricing information or at minimum a pricing framework that helps prospects self-qualify and understand cost expectations." },
  "de-2": { month: "Month 1", action: "Collect and display testimonials", detail: "Reach out to ten satisfied customers for written or video testimonials. Display them prominently near calls to action." },
  "de-3": { month: "Month 1", action: "Launch a trial or demo offer", detail: "Create a low-friction entry point: a free trial, interactive demo, or complimentary consultation that lets prospects experience value firsthand." },
  "de-4": { month: "Month 2", action: "Build getting-started content", detail: "Create a step-by-step onboarding guide, quick-start video, and checklist that shows prospects exactly what the first thirty days look like." },
  "de-5": { month: "Month 2", action: "Add trust signals", detail: "Display relevant certifications, security badges, money-back guarantees, and partner logos at key decision points on your site." },
  "de-6": { month: "Month 3", action: "Create sales enablement materials", detail: "Develop a one-pager, slide deck, and proposal template that your champions can share internally for budget approval." },
  "pp-1": { month: "Month 2", action: "Build onboarding email automation", detail: "Design a five to seven email welcome sequence that guides new customers through setup, first value milestones, and key features." },
  "pp-2": { month: "Month 2", action: "Launch a help center", detail: "Document the twenty most common support questions with clear answers, screenshots, and step-by-step instructions." },
  "pp-3": { month: "Month 3", action: "Start a community space", detail: "Launch a community forum, Slack group, or LinkedIn group where customers can connect, share tips, and provide feedback." },
  "pp-4": { month: "Month 3", action: "Design upsell campaigns", detail: "Create targeted campaigns that introduce complementary products or premium features to existing customers based on their usage patterns." },
};

const howToSteps = [
  { title: "Rate Your Content Honestly", description: "Score each content type from 0 (None) to 3 (Comprehensive). Be objective about what you actually have, not what you plan to create." },
  { title: "Review the Gap Analysis", description: "Look at where your funnel is weakest. Gaps in early stages limit the number of prospects entering your pipeline. Gaps in later stages cause drop-off." },
  { title: "Prioritize by Impact", description: "Focus on the top gaps first. A missing piece in the decision stage often has more immediate revenue impact than an awareness gap." },
  { title: "Follow the Content Calendar", description: "Use the recommended three-month calendar as your action plan. Start with the quick wins and build toward the larger content investments." },
];

/* ------------------------------------------------------------------ */
/*  Utility functions                                                  */
/* ------------------------------------------------------------------ */

type Scores = Record<string, number>;

function createEmptyScores(): Scores {
  const scores: Scores = {};
  for (const stage of stages) {
    for (const item of stage.items) {
      scores[item.id] = -1;
    }
  }
  return scores;
}

function getStageScore(scores: Scores, stage: Stage): number {
  return stage.items.reduce((sum, item) => {
    const val = scores[item.id];
    return sum + (val > 0 ? val : 0);
  }, 0);
}

function getTotalScore(scores: Scores): number {
  let total = 0;
  for (const stage of stages) {
    total += getStageScore(scores, stage);
  }
  return total;
}

function getLetterGrade(score: number): string {
  const maxScore = 66;
  const pct = score / maxScore;
  if (pct >= 0.9) return "A";
  if (pct >= 0.8) return "B";
  if (pct >= 0.7) return "C";
  if (pct >= 0.6) return "D";
  return "F";
}

function getGradeDescription(grade: string): string {
  switch (grade) {
    case "A": return "Excellent content coverage across all buyer journey stages. Focus on optimization and keeping content fresh.";
    case "B": return "Strong content foundation with some gaps to address. A few targeted investments will round out your funnel.";
    case "C": return "Moderate content coverage. Several meaningful gaps exist that are likely costing you leads and conversions.";
    case "D": return "Below average content coverage. Significant gaps are limiting your ability to attract, convert, and retain customers.";
    default: return "Major content gaps across most stages. A structured content strategy is essential to compete effectively.";
  }
}

interface GapEntry {
  itemId: string;
  label: string;
  stageName: string;
  score: number;
}

function getTopGaps(scores: Scores, count: number): GapEntry[] {
  const all: GapEntry[] = [];
  for (const stage of stages) {
    for (const item of stage.items) {
      const score = scores[item.id];
      if (score < 3) {
        all.push({
          itemId: item.id,
          label: item.label,
          stageName: stage.title.replace(" Content", ""),
          score: score < 0 ? 0 : score,
        });
      }
    }
  }
  all.sort((a, b) => a.score - b.score);
  return all.slice(0, count);
}

function allRated(scores: Scores): boolean {
  return Object.values(scores).every((v) => v >= 0);
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function RatingButtons({
  itemId,
  itemLabel,
  value,
  onChange,
}: {
  itemId: string;
  itemLabel: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <fieldset className="flex gap-0 border border-gray-200" aria-label={`Rating for ${itemLabel}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Content Gap Analyzer",
          description: "Score each content type from 0 (None) to 3 (Comprehensive). Be objective about what you actually have, not what you plan to create.",
          url: "https://themarkitmedia.com/en/resources/content-gap-analyzer",
          applicationCategory: "Content Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <legend className="sr-only">Rating for {itemLabel}</legend>
      {[0, 1, 2, 3].map((n) => {
        const isSelected = value === n;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-label={`${ratingLabels[n]} (${n})`}
            aria-pressed={isSelected}
            className={`min-h-[44px] min-w-[44px] px-3 py-2 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
              isSelected
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-100"
            } ${n > 0 ? "border-l border-gray-200" : ""}`}
          >
            {n}
          </button>
        );
      })}
    </fieldset>
  );
}

function StageBarChart({ scores }: { scores: Scores }) {
  return (
    <div className="space-y-5" role="img" aria-label="Bar chart showing content coverage by buyer journey stage">
      {stages.map((stage) => {
        const stageScore = getStageScore(scores, stage);
        const pct = (stageScore / stage.maxScore) * 100;
        const shortTitle = stage.title.replace(" Content", "");
        return (
          <div key={stage.id}>
            <div className="flex justify-between mb-2">
              <span className="text-base font-bold text-black">{shortTitle}</span>
              <span className="text-base text-gray-500">
                {stageScore}/{stage.maxScore}
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
      })}
    </div>
  );
}

function OverallScore({ scores }: { scores: Scores }) {
  const total = getTotalScore(scores);
  const grade = getLetterGrade(total);
  const description = getGradeDescription(grade);

  return (
    <div className="border border-gray-200 p-6">
      <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
        Overall Content Maturity
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <p className="text-base text-gray-500 mb-1">Total Score</p>
          <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
            {total}/66
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

function StageScores({ scores }: { scores: Scores }) {
  return (
    <div className="border border-gray-200 p-6">
      <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
        Per-Stage Scores
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stages.map((stage) => {
          const stageScore = getStageScore(scores, stage);
          const pct = Math.round((stageScore / stage.maxScore) * 100);
          const shortTitle = stage.title.replace(" Content", "");
          return (
            <div key={stage.id} className="border border-gray-200 p-4">
              <p className="text-base font-bold text-black mb-1">{shortTitle}</p>
              <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
                {stageScore}/{stage.maxScore}
              </p>
              <p className="text-base text-gray-500">{pct}% coverage</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PriorityGaps({ gaps }: { gaps: GapEntry[] }) {
  if (gaps.length === 0) return null;

  return (
    <div className="space-y-6">
      <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
        Top 5 Priority Gaps
      </h3>
      <p className="text-base text-gray-500">
        These are your most critical content gaps ranked by severity. Addressing them will have the greatest impact on your marketing funnel.
      </p>
      {gaps.map((gap, rank) => {
        const impact = gapImpacts[gap.itemId];
        return (
          <Animate key={gap.itemId} animation="fade-up">
            <div className="border border-gray-200">
              <div className="bg-black text-white px-6 py-4 flex items-center justify-between flex-wrap gap-2">
                <h4 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                  #{rank + 1}: {gap.label}
                </h4>
                <span className="text-base text-gray-400">
                  {gap.stageName} &middot; Score: {gap.score}/3
                </span>
              </div>
              <div className="p-6">
                {impact && (
                  <p className="text-base text-gray-700 leading-relaxed">
                    {impact.impact}
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

function ContentCalendar({ gaps }: { gaps: GapEntry[] }) {
  const recommendations = gaps
    .map((gap) => {
      const rec = calendarRecommendations[gap.itemId];
      if (!rec) return null;
      return { ...rec, label: gap.label, itemId: gap.itemId };
    })
    .filter(Boolean) as Array<{ month: string; action: string; detail: string; label: string; itemId: string }>;

  if (recommendations.length === 0) return null;

  const byMonth: Record<string, typeof recommendations> = {};
  for (const rec of recommendations) {
    if (!byMonth[rec.month]) byMonth[rec.month] = [];
    byMonth[rec.month].push(rec);
  }

  const months = ["Month 1", "Month 2", "Month 3"];

  return (
    <div className="space-y-6">
      <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
        Content Calendar Recommendations
      </h3>
      <p className="text-base text-gray-500">
        Based on your gaps, here is a prioritized three-month content plan to close your most critical gaps.
      </p>
      {months.map((month) => {
        const items = byMonth[month];
        if (!items || items.length === 0) return null;
        return (
          <Animate key={month} animation="fade-up">
            <div className="border border-gray-200">
              <div className="bg-black text-white px-6 py-4">
                <h4 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                  {month}
                </h4>
              </div>
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.itemId} className="p-6">
                    <p className="text-base font-bold text-black mb-2">
                      {item.action}
                    </p>
                    <p className="text-base text-gray-700 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
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

/* ------------------------------------------------------------------ */
/*  Format as plain text                                               */
/* ------------------------------------------------------------------ */

function formatAnalysisText(scores: Scores): string {
  const lines: string[] = [];
  const total = getTotalScore(scores);
  const grade = getLetterGrade(total);

  lines.push("CONTENT GAP ANALYSIS");
  lines.push("=".repeat(50));
  lines.push(`Overall Score: ${total}/66 (Grade: ${grade})`);
  lines.push(`Assessment: ${getGradeDescription(grade)}`);
  lines.push("");

  for (const stage of stages) {
    const stageScore = getStageScore(scores, stage);
    const shortTitle = stage.title.replace(" Content", "");
    lines.push(`${shortTitle}: ${stageScore}/${stage.maxScore}`);
    for (const item of stage.items) {
      const val = scores[item.id];
      const displayVal = val < 0 ? 0 : val;
      lines.push(`  ${item.label}: ${displayVal}/3 (${ratingLabels[displayVal]})`);
    }
    lines.push("");
  }

  const topGaps = getTopGaps(scores, 5);
  if (topGaps.length > 0) {
    lines.push("TOP PRIORITY GAPS");
    lines.push("-".repeat(30));
    topGaps.forEach((gap, i) => {
      lines.push(`${i + 1}. ${gap.label} (${gap.stageName}) - Score: ${gap.score}/3`);
      const impact = gapImpacts[gap.itemId];
      if (impact) lines.push(`   ${impact.impact}`);
      lines.push("");
    });
  }

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function ContentGapAnalyzerPage() {
  const [scores, setScores] = useState<Scores>(createEmptyScores());
  const [results, setResults] = useState<Scores | null>(null);

  function updateScore(itemId: string, value: number) {
    setScores((prev) => ({ ...prev, [itemId]: value }));
  }

  const rated = allRated(scores);

  function handleAnalyze() {
    if (!rated) return;
    setResults({ ...scores });
  }

  function handleReset() {
    setScores(createEmptyScores());
    setResults(null);
  }

  const plainText = results ? formatAnalysisText(results) : "";

  return (
    <article className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Content Gap Analyzer",
          description:
            "Free content gap analysis tool. Evaluate your content across buyer journey stages and topic coverage to identify gaps and priorities.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Content Gap Analyzer" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Content Gap Analyzer
            </h1>
            <SectionDesc>
              Evaluate your content across every stage of the buyer journey.
              Rate each content type from None to Comprehensive, then get a
              detailed gap analysis with priority recommendations and a
              three-month content calendar to close your biggest gaps.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Rating Scale Legend ---- */}
      <section aria-label="Rating Scale" className="px-6 lg:px-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="border border-gray-200 p-6">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                Rating Scale
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((n) => (
                  <div key={n} className="text-base">
                    <span className="font-bold text-black">{n}</span>
                    <span className="text-gray-500"> = {ratingLabels[n]}</span>
                  </div>
                ))}
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Scoring Form ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
        <div className="max-w-4xl mx-auto space-y-10">
          {stages.map((stage) => (
            <Animate key={stage.id} animation="fade-up">
              <div className="border border-gray-200">
                <div className="bg-black text-white px-6 py-4">
                  <span className="font-[family-name:var(--font-display)] text-base font-extrabold">
                    {stage.title}
                  </span>
                </div>
                <div className="divide-y divide-gray-200">
                  {stage.items.map((item, i) => (
                    <div
                      key={item.id}
                      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <p className="text-base text-black font-bold flex-1">
                        {item.label}
                      </p>
                      <RatingButtons
                        itemId={item.id}
                        itemLabel={item.label}
                        value={scores[item.id]}
                        onChange={(v) => updateScore(item.id, v)}
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
                Analyze Content Gaps
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
                  Rate all 22 content items to run the analysis.
                </p>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Results ---- */}
      {results && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-16">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Overall maturity */}
            <Animate animation="fade-up">
              <OverallScore scores={results} />
            </Animate>

            {/* Per-stage scores */}
            <Animate animation="fade-up">
              <StageScores scores={results} />
            </Animate>

            {/* Funnel visualization */}
            <Animate animation="fade-up">
              <div className="border border-gray-200 p-6">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                  Funnel Visualization
                </h2>
                <StageBarChart scores={results} />
              </div>
            </Animate>

            {/* Top 5 priority gaps */}
            <PriorityGaps gaps={getTopGaps(results, 5)} />

            {/* Content calendar recommendations */}
            <ContentCalendar gaps={getTopGaps(results, 5)} />

            {/* Export actions */}
            <div className="flex flex-wrap gap-3">
              <CopyButton text={plainText} />
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

      {/* ---- How to Use This Analysis ---- */}
      <section aria-label="How to Use This Analysis" className="px-6 lg:px-12 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-8">
              How to Use This Analysis
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
              Get a Professional Content Strategy
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              This self-assessment is a starting point. Our team builds
              comprehensive content strategies backed by keyword research,
              competitor analysis, and audience data to fill every gap in your
              buyer journey.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a Content Strategy From Our Team &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Content Gap Analyzer"
        services={[
          { title: "Content Marketing", desc: "Strategic content that drives traffic, engagement, and conversions.", href: "/services/content-marketing" },
          { title: "SEO", desc: "Content optimized for search engines and human readers alike.", href: "/services/seo" },
          { title: "Social Media Marketing", desc: "Distribute your content where your audience already is.", href: "/services/social-media-marketing" },
        ]}
        relatedTools={[
          { title: "Content Brief", href: "/resources/content-brief" },
          { title: "Content Brief Generator", href: "/resources/content-brief-generator" },
          { title: "Content Calendar", href: "/resources/content-calendar" },
          { title: "Content Gap Finder", href: "/resources/content-gap-finder" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
