"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface AssessmentArea {
  id: string;
  label: string;
  description: string;
}

interface GoalOption {
  id: string;
  label: string;
  description: string;
}

interface SelectOption {
  value: string;
  label: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const assessmentAreas: AssessmentArea[] = [
  {
    id: "design",
    label: "Current Design Quality",
    description:
      "How modern, professional, and visually consistent is your current website design?",
  },
  {
    id: "mobile",
    label: "Mobile Experience",
    description:
      "How well does your site perform on phones and tablets? Is it fully responsive with no layout issues?",
  },
  {
    id: "speed",
    label: "Page Load Speed",
    description:
      "How fast do your pages load? Do visitors wait more than 3 seconds for content to appear?",
  },
  {
    id: "content",
    label: "Content Freshness",
    description:
      "How current and relevant is your website content? When was it last updated?",
  },
  {
    id: "seo",
    label: "SEO Performance",
    description:
      "How well does your site rank in search results? Are you getting organic traffic from target keywords?",
  },
  {
    id: "conversion",
    label: "Conversion Rate Satisfaction",
    description:
      "How satisfied are you with the rate at which visitors take desired actions on your site?",
  },
];

const ratingLabels: Record<number, string> = {
  1: "Poor",
  2: "Below Average",
  3: "Average",
  4: "Good",
  5: "Excellent",
};

const goalOptions: GoalOption[] = [
  {
    id: "mobile",
    label: "Improve mobile experience",
    description: "Make the site fully responsive and mobile-first",
  },
  {
    id: "conversions",
    label: "Increase conversions",
    description: "Optimize funnels, CTAs, and user flows for more leads or sales",
  },
  {
    id: "visual",
    label: "Modernize visual design",
    description: "Update the look and feel to match current design standards",
  },
  {
    id: "seo",
    label: "Improve SEO rankings",
    description: "Better technical SEO, content strategy, and search visibility",
  },
  {
    id: "speed",
    label: "Faster page loads",
    description: "Reduce load times through optimization and modern architecture",
  },
  {
    id: "navigation",
    label: "Better user navigation",
    description: "Restructure menus, information architecture, and user flows",
  },
  {
    id: "brand",
    label: "Brand refresh",
    description: "Update branding elements like logo, colors, typography, and tone",
  },
  {
    id: "features",
    label: "Add new features",
    description: "Integrate new functionality like booking, e-commerce, or portals",
  },
  {
    id: "restructure",
    label: "Content restructuring",
    description: "Reorganize pages, consolidate content, and improve hierarchy",
  },
  {
    id: "accessibility",
    label: "Accessibility compliance",
    description: "Meet WCAG standards for inclusive access across all abilities",
  },
];

const projectTypes: SelectOption[] = [
  { value: "refresh", label: "Refresh -- Same structure, new look" },
  { value: "partial", label: "Partial Redesign -- Key sections rebuilt" },
  { value: "full", label: "Full Redesign -- Complete visual and structural overhaul" },
  { value: "rebuild", label: "Complete Rebuild -- New platform, new everything" },
];

const budgetRanges: SelectOption[] = [
  { value: "under5k", label: "Under $5,000" },
  { value: "5k-15k", label: "$5,000 -- $15,000" },
  { value: "15k-50k", label: "$15,000 -- $50,000" },
  { value: "50k-100k", label: "$50,000 -- $100,000" },
  { value: "100k+", label: "$100,000+" },
];

const timelineOptions: SelectOption[] = [
  { value: "1-2", label: "1 -- 2 months" },
  { value: "3-4", label: "3 -- 4 months" },
  { value: "5-6", label: "5 -- 6 months" },
  { value: "6+", label: "6+ months" },
];

/* ------------------------------------------------------------------ */
/*  Scoring & analysis helpers                                         */
/* ------------------------------------------------------------------ */

function getLetterGrade(score: number): { letter: string; label: string } {
  if (score >= 90) return { letter: "A", label: "Excellent" };
  if (score >= 80) return { letter: "B", label: "Good" };
  if (score >= 60) return { letter: "C", label: "Fair" };
  if (score >= 40) return { letter: "D", label: "Poor" };
  return { letter: "F", label: "Critical" };
}

function getHealthScore(ratings: Record<string, number>): number {
  const values = Object.values(ratings);
  if (values.length === 0) return 0;
  const avg = values.reduce((s, v) => s + v, 0) / values.length;
  return Math.round((avg / 5) * 100);
}

function getRecommendedApproach(
  healthScore: number,
  projectType: string,
  goals: Set<string>
): { approach: string; reasoning: string } {
  if (healthScore <= 30 || projectType === "rebuild") {
    return {
      approach: "Complete Rebuild",
      reasoning:
        "Your current site scores indicate fundamental issues that are best addressed by starting fresh on a modern platform. A rebuild gives you the cleanest path to meeting all your goals without inheriting legacy technical debt.",
    };
  }
  if (healthScore <= 50 || projectType === "full" || goals.size >= 7) {
    return {
      approach: "Full Redesign",
      reasoning:
        "With multiple significant areas needing improvement, a full redesign will address your goals more efficiently than incremental changes. This approach restructures both the visual design and underlying architecture.",
    };
  }
  if (healthScore <= 70 || projectType === "partial" || goals.size >= 4) {
    return {
      approach: "Partial Redesign",
      reasoning:
        "Your site has a usable foundation but needs targeted improvements in specific areas. A partial redesign focuses resources on the sections and systems that will have the highest impact on your goals.",
    };
  }
  return {
    approach: "Visual Refresh",
    reasoning:
      "Your site is in relatively good shape. A visual refresh will modernize the look and feel without disrupting what is already working. This is the most cost-effective path to addressing your goals.",
  };
}

interface PriorityItem {
  priority: "High" | "Medium" | "Low";
  item: string;
}

function buildPriorityRoadmap(
  ratings: Record<string, number>,
  goals: Set<string>
): PriorityItem[] {
  const items: PriorityItem[] = [];

  // Low-rated areas are high priority
  for (const area of assessmentAreas) {
    const rating = ratings[area.id] || 3;
    if (rating <= 2) {
      items.push({ priority: "High", item: `Fix ${area.label.toLowerCase()} (rated ${rating}/5)` });
    } else if (rating === 3) {
      items.push({ priority: "Medium", item: `Improve ${area.label.toLowerCase()} (rated ${rating}/5)` });
    }
  }

  // Selected goals that don't overlap with already-listed areas
  const mappedAreaIds = new Set(
    items.map((it) => {
      const match = it.item.match(/fix |improve /i);
      return match ? it.item : "";
    })
  );

  for (const goal of goalOptions) {
    if (goals.has(goal.id)) {
      const alreadyCovered = items.some(
        (it) =>
          it.item.toLowerCase().includes(goal.label.toLowerCase().split(" ")[0])
      );
      if (!alreadyCovered) {
        items.push({
          priority: goals.size <= 3 ? "Medium" : "Low",
          item: goal.label,
        });
      }
    }
  }

  // Sort by priority
  const order = { High: 0, Medium: 1, Low: 2 };
  items.sort((a, b) => order[a.priority] - order[b.priority]);

  return items;
}

interface TimelinePhase {
  phase: string;
  duration: string;
  description: string;
}

function buildTimeline(
  projectType: string,
  timeline: string
): TimelinePhase[] {
  const multipliers: Record<string, number> = {
    refresh: 0.6,
    partial: 0.8,
    full: 1.0,
    rebuild: 1.3,
  };

  const baseWeeks: Record<string, number> = {
    "1-2": 6,
    "3-4": 14,
    "5-6": 22,
    "6+": 30,
  };

  const mult = multipliers[projectType] || 1;
  const total = Math.round((baseWeeks[timeline] || 14) * mult);

  const discovery = Math.max(1, Math.round(total * 0.15));
  const design = Math.max(2, Math.round(total * 0.25));
  const development = Math.max(2, Math.round(total * 0.35));
  const testing = Math.max(1, Math.round(total * 0.15));
  const launch = Math.max(1, Math.round(total * 0.1));

  return [
    {
      phase: "Discovery",
      duration: `${discovery} week${discovery !== 1 ? "s" : ""}`,
      description:
        "Stakeholder interviews, content audit, analytics review, competitor analysis, and goal alignment.",
    },
    {
      phase: "Design",
      duration: `${design} week${design !== 1 ? "s" : ""}`,
      description:
        "Wireframes, visual design concepts, prototyping, design system creation, and stakeholder approval.",
    },
    {
      phase: "Development",
      duration: `${development} week${development !== 1 ? "s" : ""}`,
      description:
        "Front-end and back-end development, CMS integration, responsive implementation, and content migration.",
    },
    {
      phase: "Testing",
      duration: `${testing} week${testing !== 1 ? "s" : ""}`,
      description:
        "Cross-browser testing, accessibility audit, performance optimization, SEO validation, and user acceptance testing.",
    },
    {
      phase: "Launch",
      duration: `${launch} week${launch !== 1 ? "s" : ""}`,
      description:
        "DNS migration, redirect mapping, monitoring setup, post-launch QA, and handoff documentation.",
    },
  ];
}

function getConsiderations(
  healthScore: number,
  projectType: string,
  budget: string,
  goals: Set<string>
): string[] {
  const items: string[] = [];

  if (budget === "under5k" && (projectType === "full" || projectType === "rebuild")) {
    items.push(
      "Your budget may be tight for the scope of work involved. Consider phasing the project or adjusting scope to match available resources."
    );
  }

  if (goals.has("seo")) {
    items.push(
      "SEO improvements require a redirect strategy to preserve existing rankings during migration. Plan URL mapping early in the process."
    );
  }

  if (projectType === "rebuild") {
    items.push(
      "A complete rebuild carries the highest risk of scope creep. Define a clear MVP before development begins and resist adding features mid-project."
    );
  }

  if (goals.has("features")) {
    items.push(
      "New feature integrations often uncover hidden complexity. Budget additional time for third-party API integration and testing."
    );
  }

  if (healthScore <= 40) {
    items.push(
      "With a low current site health score, plan for a thorough content audit before design begins. Migrating low-quality content to a new design wastes the investment."
    );
  }

  if (goals.has("accessibility")) {
    items.push(
      "Accessibility compliance should be built into the design and development process from day one, not retrofitted at the end."
    );
  }

  if (goals.has("brand")) {
    items.push(
      "A brand refresh should be completed before web design begins. Starting design without finalized brand assets causes rework."
    );
  }

  if (items.length === 0) {
    items.push(
      "Define clear success metrics before the project starts so you can measure the impact of the redesign against your current baseline."
    );
  }

  return items;
}

function getTechRecommendations(
  projectType: string,
  budget: string,
  goals: Set<string>
): string[] {
  const recs: string[] = [];

  if (projectType === "rebuild" || projectType === "full") {
    if (budget === "100k+" || budget === "50k-100k") {
      recs.push(
        "Consider a headless CMS with a modern front-end framework (Next.js, Astro) for maximum performance and flexibility."
      );
    } else {
      recs.push(
        "WordPress with a custom theme or a modern page builder offers the best balance of flexibility and cost for this scope."
      );
    }
  }

  if (goals.has("speed")) {
    recs.push(
      "Implement static site generation or edge caching to achieve sub-second page loads. Use image CDNs for automatic optimization."
    );
  }

  if (goals.has("seo")) {
    recs.push(
      "Choose a platform with strong server-side rendering support, structured data capabilities, and fine-grained control over meta tags and sitemaps."
    );
  }

  if (goals.has("features")) {
    recs.push(
      "Evaluate whether custom development or a platform with native integrations (e-commerce, booking, portals) better fits your feature requirements."
    );
  }

  if (goals.has("accessibility")) {
    recs.push(
      "Use a component library with built-in accessibility patterns. Integrate automated accessibility testing into the development workflow."
    );
  }

  if (projectType === "refresh" || projectType === "partial") {
    recs.push(
      "If staying on your current platform, focus on theme updates and performance plugins rather than a full migration."
    );
  }

  if (recs.length === 0) {
    recs.push(
      "Choose a platform your team can maintain independently. The best technology is the one you can update and extend without external help."
    );
  }

  return recs;
}

const preRedesignChecklist = [
  "Back up your current site files and database completely",
  "Export your Google Analytics and Search Console data for benchmarking",
  "Document all current URLs for redirect mapping",
  "Audit existing content and flag pages to keep, update, or remove",
  "List all third-party integrations and verify they will work with the new platform",
  "Gather brand assets: logo files, color codes, fonts, and style guidelines",
  "Define 3-5 measurable goals the redesign should achieve",
  "Identify key stakeholders and establish an approval process",
  "Review competitor websites and note features or patterns you want to adopt",
  "Set a realistic launch date with buffer for testing and revisions",
];

/* ------------------------------------------------------------------ */
/*  Export helpers                                                      */
/* ------------------------------------------------------------------ */

function formatResultsText(
  ratings: Record<string, number>,
  goals: Set<string>,
  projectType: string,
  budget: string,
  timeline: string
): string {
  const healthScore = getHealthScore(ratings);
  const grade = getLetterGrade(healthScore);
  const approach = getRecommendedApproach(healthScore, projectType, goals);
  const roadmap = buildPriorityRoadmap(ratings, goals);
  const phases = buildTimeline(projectType, timeline);
  const considerations = getConsiderations(healthScore, projectType, budget, goals);
  const techRecs = getTechRecommendations(projectType, budget, goals);

  const lines: string[] = [];
  lines.push("WEBSITE REDESIGN PLAN");
  lines.push("Generated by Markit Media Redesign Planning Tool");
  lines.push("=".repeat(50));
  lines.push("");

  lines.push("CURRENT SITE HEALTH");
  lines.push(`Score: ${healthScore}/100 (${grade.letter} - ${grade.label})`);
  lines.push("");
  for (const area of assessmentAreas) {
    const r = ratings[area.id] || 0;
    lines.push(`  ${area.label}: ${r}/5 (${ratingLabels[r] || "Not rated"})`);
  }
  lines.push("");

  lines.push("REDESIGN GOALS");
  for (const goal of goalOptions) {
    if (goals.has(goal.id)) {
      lines.push(`  - ${goal.label}`);
    }
  }
  lines.push("");

  lines.push("SCOPE & BUDGET");
  const pt = projectTypes.find((p) => p.value === projectType);
  const br = budgetRanges.find((b) => b.value === budget);
  const tl = timelineOptions.find((t) => t.value === timeline);
  lines.push(`  Project Type: ${pt?.label || projectType}`);
  lines.push(`  Budget Range: ${br?.label || budget}`);
  lines.push(`  Timeline: ${tl?.label || timeline}`);
  lines.push("");

  lines.push("RECOMMENDED APPROACH");
  lines.push(`  ${approach.approach}`);
  lines.push(`  ${approach.reasoning}`);
  lines.push("");

  lines.push("PRIORITIZED ROADMAP");
  for (const item of roadmap) {
    lines.push(`  [${item.priority}] ${item.item}`);
  }
  lines.push("");

  lines.push("ESTIMATED TIMELINE");
  for (const phase of phases) {
    lines.push(`  ${phase.phase} (${phase.duration})`);
    lines.push(`    ${phase.description}`);
  }
  lines.push("");

  lines.push("KEY CONSIDERATIONS");
  for (const c of considerations) {
    lines.push(`  - ${c}`);
  }
  lines.push("");

  lines.push("TECHNOLOGY RECOMMENDATIONS");
  for (const r of techRecs) {
    lines.push(`  - ${r}`);
  }
  lines.push("");

  lines.push("PRE-REDESIGN CHECKLIST");
  for (let i = 0; i < preRedesignChecklist.length; i++) {
    lines.push(`  [ ] ${i + 1}. ${preRedesignChecklist[i]}`);
  }
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Learn more at markitmedia.com");

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

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function RedesignPlannerPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [selectedGoals, setSelectedGoals] = useState<Set<string>>(new Set());
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 3;
  const stepLabels = ["Assessment", "Goals", "Scope"];

  /* Step validation */
  const step1Complete = assessmentAreas.every((a) => ratings[a.id] !== undefined);
  const step2Complete = selectedGoals.size > 0;
  const step3Complete = projectType !== "" && budget !== "" && timeline !== "";
  const allComplete = step1Complete && step2Complete && step3Complete;

  const isStepComplete = (step: number): boolean => {
    if (step === 0) return step1Complete;
    if (step === 1) return step2Complete;
    if (step === 2) return step3Complete;
    return false;
  };

  const canProceed = isStepComplete(currentStep);

  /* Computed results */
  const healthScore = useMemo(() => getHealthScore(ratings), [ratings]);
  const grade = useMemo(() => getLetterGrade(healthScore), [healthScore]);
  const approach = useMemo(
    () => getRecommendedApproach(healthScore, projectType, selectedGoals),
    [healthScore, projectType, selectedGoals]
  );
  const roadmap = useMemo(
    () => buildPriorityRoadmap(ratings, selectedGoals),
    [ratings, selectedGoals]
  );
  const phases = useMemo(
    () => buildTimeline(projectType, timeline),
    [projectType, timeline]
  );
  const considerations = useMemo(
    () => getConsiderations(healthScore, projectType, budget, selectedGoals),
    [healthScore, projectType, budget, selectedGoals]
  );
  const techRecs = useMemo(
    () => getTechRecommendations(projectType, budget, selectedGoals),
    [projectType, budget, selectedGoals]
  );

  const plainText = useMemo(() => {
    if (!submitted) return "";
    return formatResultsText(ratings, selectedGoals, projectType, budget, timeline);
  }, [submitted, ratings, selectedGoals, projectType, budget, timeline]);

  /* Handlers */
  function handleRating(areaId: string, value: number) {
    setRatings((prev) => ({ ...prev, [areaId]: value }));
  }

  function toggleGoal(goalId: string) {
    setSelectedGoals((prev) => {
      const next = new Set(prev);
      if (next.has(goalId)) next.delete(goalId);
      else next.add(goalId);
      return next;
    });
  }

  function handleNext() {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handlePrev() {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleSubmit() {
    if (allComplete) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleReset() {
    setRatings({});
    setSelectedGoals(new Set());
    setProjectType("");
    setBudget("");
    setTimeline("");
    setSubmitted(false);
    setCurrentStep(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const completedSteps = [step1Complete, step2Complete, step3Complete].filter(
    Boolean
  ).length;
  const progressPct = Math.round((completedSteps / totalSteps) * 100);

  return (
    <article className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Website Redesign Planning Tool",
          description:
            "Free interactive tool to plan your website redesign. Assess your current site, define goals, set scope and budget, and get a personalized redesign roadmap.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Redesign Planner" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Planning Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Planning Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Website Redesign Planner
            </h1>
            <SectionDesc>
              Assess your current site, define your goals, and set your scope.
              Get a personalized redesign roadmap with prioritized improvements,
              an estimated timeline, technology recommendations, and a
              pre-launch checklist.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {!submitted ? (
        <>
          {/* ---- Progress ---- */}
          <section aria-label="Content section" className="px-6 lg:px-12 pb-6">
            <div className="max-w-3xl mx-auto">
              <Animate animation="fade-up">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-base font-bold text-black">
                    Step {currentStep + 1} of {totalSteps}
                  </p>
                  <p className="text-base text-gray-500">
                    {completedSteps} / {totalSteps} complete
                  </p>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div
                    className="bg-black h-2 transition-all motion-reduce:transition-none"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>

                {/* Step nav pills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {stepLabels.map((label, i) => {
                    const done = isStepComplete(i);
                    return (
                      <button
                        key={label}
                        onClick={() => setCurrentStep(i)}
                        className={`min-h-[44px] px-5 py-2 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                          i === currentStep
                            ? "bg-black text-white"
                            : done
                              ? "bg-gray-800 text-white"
                              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {i + 1}. {label}
                      </button>
                    );
                  })}
                </div>
              </Animate>
            </div>
          </section>

          {/* ---- Step 1: Current Site Assessment ---- */}
          {currentStep === 0 && (
            <section className="px-6 lg:px-12 py-8" aria-label="Current site assessment">
              <div className="max-w-3xl mx-auto">
                <Animate animation="fade-up">
                  <div className="border border-gray-200 mb-8">
                    <div className="bg-black text-white px-6 py-5">
                      <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold">
                        Current Site Assessment
                      </h2>
                      <p className="text-base text-gray-400 mt-1">
                        Rate each area of your current website from 1 (poor) to 5 (excellent)
                      </p>
                    </div>

                    <div className="p-6 space-y-8">
                      {assessmentAreas.map((area) => (
                        <div key={area.id}>
                          <p className="text-base font-bold text-black mb-1">
                            {area.label}
                          </p>
                          <p className="text-base text-gray-500 mb-4 leading-relaxed">
                            {area.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 4, 5].map((value) => (
                              <button
                                key={value}
                                onClick={() => handleRating(area.id, value)}
                                className={`min-h-[44px] min-w-[44px] px-4 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                                  ratings[area.id] === value
                                    ? "bg-black text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                                aria-label={`Rate ${area.label} ${value} out of 5 - ${ratingLabels[value]}`}
                              >
                                {value}
                              </button>
                            ))}
                          </div>
                          {ratings[area.id] !== undefined && (
                            <p className="text-base text-gray-500 mt-2">
                              {ratingLabels[ratings[area.id]]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Animate>

                {/* Navigation */}
                <div className="flex items-center justify-between gap-4">
                  <div />
                  <button
                    onClick={handleNext}
                    disabled={!canProceed}
                    className={`min-h-[44px] px-8 py-4 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      canProceed
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Next: Goals &rarr;
                  </button>
                </div>
                {!step1Complete && (
                  <p className="text-base text-gray-400 text-right mt-3">
                    Rate all 6 areas to continue
                  </p>
                )}
              </div>
            </section>
          )}

          {/* ---- Step 2: Redesign Goals ---- */}
          {currentStep === 1 && (
            <section className="px-6 lg:px-12 py-8" aria-label="Redesign goals">
              <div className="max-w-3xl mx-auto">
                <Animate animation="fade-up">
                  <div className="border border-gray-200 mb-8">
                    <div className="bg-black text-white px-6 py-5">
                      <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold">
                        Redesign Goals
                      </h2>
                      <p className="text-base text-gray-400 mt-1">
                        Select all goals that apply to your redesign project
                      </p>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {goalOptions.map((goal) => {
                          const checked = selectedGoals.has(goal.id);
                          return (
                            <label
                              key={goal.id}
                              className={`min-h-[44px] px-5 py-4 text-left cursor-pointer flex items-start gap-3 transition-all duration-300 motion-reduce:transition-none focus-within:outline-2 focus-within:outline-black focus-within:outline-offset-2 ${
                                checked
                                  ? "bg-black text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleGoal(goal.id)}
                                className="mt-1 w-5 h-5 flex-shrink-0 accent-black cursor-pointer focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                              />
                              <div>
                                <span className="text-base font-bold block">
                                  {goal.label}
                                </span>
                                <span
                                  className={`text-base block mt-1 ${
                                    checked ? "text-gray-400" : "text-gray-500"
                                  }`}
                                >
                                  {goal.description}
                                </span>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                      {selectedGoals.size > 0 && (
                        <p className="text-base text-gray-500 mt-4">
                          {selectedGoals.size} goal{selectedGoals.size !== 1 ? "s" : ""} selected
                        </p>
                      )}
                    </div>
                  </div>
                </Animate>

                {/* Navigation */}
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={handlePrev}
                    className="min-h-[44px] px-8 py-4 text-base font-bold border-2 border-black text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    &larr; Assessment
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!canProceed}
                    className={`min-h-[44px] px-8 py-4 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      canProceed
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Next: Scope &rarr;
                  </button>
                </div>
                {!step2Complete && (
                  <p className="text-base text-gray-400 text-right mt-3">
                    Select at least one goal to continue
                  </p>
                )}
              </div>
            </section>
          )}

          {/* ---- Step 3: Scope & Budget ---- */}
          {currentStep === 2 && (
            <section className="px-6 lg:px-12 py-8" aria-label="Scope and budget">
              <div className="max-w-3xl mx-auto">
                <Animate animation="fade-up">
                  <div className="border border-gray-200 mb-8">
                    <div className="bg-black text-white px-6 py-5">
                      <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold">
                        Scope &amp; Budget
                      </h2>
                      <p className="text-base text-gray-400 mt-1">
                        Define the project type, budget range, and desired timeline
                      </p>
                    </div>

                    <div className="p-6 space-y-10">
                      {/* Project Type */}
                      <div>
                        <p className="text-base font-bold text-black mb-4">
                          Project Type
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                          {projectTypes.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => setProjectType(opt.value)}
                              className={`min-h-[44px] px-5 py-4 text-base text-left font-bold transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                                projectType === opt.value
                                  ? "bg-black text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Budget Range */}
                      <div>
                        <p className="text-base font-bold text-black mb-4">
                          Budget Range
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {budgetRanges.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => setBudget(opt.value)}
                              className={`min-h-[44px] px-5 py-4 text-base text-left font-bold transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                                budget === opt.value
                                  ? "bg-black text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Timeline */}
                      <div>
                        <p className="text-base font-bold text-black mb-4">
                          Desired Timeline
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {timelineOptions.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => setTimeline(opt.value)}
                              className={`min-h-[44px] px-5 py-4 text-base text-left font-bold transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                                timeline === opt.value
                                  ? "bg-black text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Animate>

                {/* Navigation */}
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={handlePrev}
                    className="min-h-[44px] px-8 py-4 text-base font-bold border-2 border-black text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    &larr; Goals
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!allComplete}
                    className={`min-h-[44px] px-10 py-4 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      allComplete
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    See My Redesign Plan &rarr;
                  </button>
                </div>
                {!allComplete && (
                  <p className="text-base text-gray-400 text-right mt-3">
                    Complete all three steps to see your plan
                  </p>
                )}
              </div>
            </section>
          )}
        </>
      ) : (
        <>
          {/* ---- Results ---- */}
          <section
            className="px-6 lg:px-12 py-8"
            aria-label="Redesign plan results"
          >
            <div className="max-w-3xl mx-auto">
              {/* Export buttons */}
              <Animate animation="fade-up">
                <div className="flex flex-wrap gap-3 mb-8">
                  <CopyButton text={plainText} />
                  <DownloadButton
                    text={plainText}
                    filename="redesign-plan.txt"
                  />
                </div>
              </Animate>

              {/* ---- Health Score ---- */}
              <Animate animation="fade-up">
                <div className="bg-black text-white p-8 lg:p-12 mb-8">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="text-center flex-shrink-0">
                      <div className="font-[family-name:var(--font-display)] text-7xl font-extrabold">
                        {grade.letter}
                      </div>
                      <div className="text-base text-gray-400 mt-2">
                        {grade.label}
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="font-[family-name:var(--font-display)] text-3xl font-extrabold mb-2">
                        {healthScore}/100
                      </div>
                      <p className="text-base text-gray-400 leading-relaxed">
                        Current Site Health Score
                      </p>
                    </div>
                  </div>

                  {/* Per-area breakdown */}
                  <div className="mt-8 space-y-3">
                    {assessmentAreas.map((area) => {
                      const r = ratings[area.id] || 0;
                      const pct = (r / 5) * 100;
                      return (
                        <div key={area.id}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-base text-gray-400">
                              {area.label}
                            </span>
                            <span className="text-base font-bold text-white">
                              {r}/5
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-700 overflow-hidden">
                            <div
                              className="h-full bg-white transition-all duration-500 motion-reduce:transition-none"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Animate>

              {/* ---- Recommended Approach ---- */}
              <Animate animation="fade-up">
                <div className="border-l-4 border-black pl-6 mb-8">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-2">
                    Recommended Approach
                  </h2>
                  <p className="text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold text-black font-[family-name:var(--font-display)] mb-3">
                    {approach.approach}
                  </p>
                  <p className="text-base text-gray-500 leading-relaxed">
                    {approach.reasoning}
                  </p>
                </div>
              </Animate>

              {/* ---- Prioritized Roadmap ---- */}
              <Animate animation="fade-up">
                <div className="mb-8">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                    Prioritized Improvement Roadmap
                  </h2>
                  <Stagger
                    stagger={60}
                    animation="fade-up"
                    className="space-y-0"
                  >
                    {roadmap.map((item, idx) => (
                      <div
                        key={idx}
                        className="border-b border-gray-100 p-4 flex items-start gap-4"
                      >
                        <span
                          className={`flex-shrink-0 px-3 py-1 text-base font-bold ${
                            item.priority === "High"
                              ? "bg-black text-white"
                              : item.priority === "Medium"
                                ? "bg-gray-200 text-black"
                                : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {item.priority}
                        </span>
                        <p className="text-base text-black">{item.item}</p>
                      </div>
                    ))}
                  </Stagger>
                </div>
              </Animate>

              {/* ---- Estimated Timeline ---- */}
              <Animate animation="fade-up">
                <div className="mb-8">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                    Estimated Timeline
                  </h2>
                  <div className="space-y-0">
                    {phases.map((phase, idx) => (
                      <div
                        key={phase.phase}
                        className="border-b border-gray-100 p-4 flex items-start gap-4"
                      >
                        <span className="flex-shrink-0 w-8 h-8 bg-black text-white flex items-center justify-center text-base font-bold">
                          {idx + 1}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-base font-bold text-black">
                              {phase.phase}
                            </p>
                            <p className="text-base font-bold text-black">
                              {phase.duration}
                            </p>
                          </div>
                          <p className="text-base text-gray-500 leading-relaxed">
                            {phase.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Animate>

              {/* ---- Key Considerations ---- */}
              <Animate animation="fade-up">
                <div className="mb-8">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                    Key Considerations &amp; Risks
                  </h2>
                  <Stagger
                    stagger={60}
                    animation="fade-up"
                    className="space-y-4"
                  >
                    {considerations.map((item, idx) => (
                      <div
                        key={idx}
                        className="border-b border-gray-100 pb-4 flex items-start gap-3"
                      >
                        <span className="flex-shrink-0 w-6 h-6 bg-black text-white flex items-center justify-center text-base font-bold mt-0.5">
                          !
                        </span>
                        <p className="text-base text-gray-600 leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </Stagger>
                </div>
              </Animate>

              {/* ---- Technology Recommendations ---- */}
              <Animate animation="fade-up">
                <div className="mb-8">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                    Technology Recommendations
                  </h2>
                  <Stagger
                    stagger={60}
                    animation="fade-up"
                    className="space-y-4"
                  >
                    {techRecs.map((rec, idx) => (
                      <div
                        key={idx}
                        className="border-b border-gray-100 pb-4"
                      >
                        <p className="text-base text-gray-600 leading-relaxed">
                          {rec}
                        </p>
                      </div>
                    ))}
                  </Stagger>
                </div>
              </Animate>

              {/* ---- Pre-Redesign Checklist ---- */}
              <Animate animation="fade-up">
                <div className="mb-8">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                    Pre-Redesign Checklist
                  </h2>
                  <Stagger
                    stagger={40}
                    animation="fade-up"
                    className="space-y-0"
                  >
                    {preRedesignChecklist.map((item, idx) => (
                      <div
                        key={idx}
                        className="border-b border-gray-100 p-4 flex items-start gap-3"
                      >
                        <span className="flex-shrink-0 w-8 h-8 border-2 border-black flex items-center justify-center text-base font-bold text-black">
                          {idx + 1}
                        </span>
                        <p className="text-base text-black leading-relaxed pt-1">
                          {item}
                        </p>
                      </div>
                    ))}
                  </Stagger>
                </div>
              </Animate>

              {/* ---- Start Over ---- */}
              <Animate animation="fade-up">
                <div className="text-center pt-4 mb-8">
                  <button
                    onClick={handleReset}
                    className="border-2 border-black text-black px-8 py-3 font-bold text-base hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px] min-w-[44px]"
                  >
                    Start Over
                  </button>
                </div>
              </Animate>
            </div>
          </section>
        </>
      )}

      {/* ---- Bottom CTA ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Start Your Redesign?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8 leading-relaxed">
              Our team will review your goals, assess your current site, and
              deliver a detailed proposal with timeline, budget, and a clear
              path from where you are to where you want to be.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
              >
                Get a Free Consultation &rarr;
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
              >
                Explore Our Services
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Redesign Planner"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Pricing Page Analyzer", href: "/resources/pricing-page-analyzer" },
          { title: "Quarterly Review", href: "/resources/quarterly-review" },
          { title: "Retention Calculator", href: "/resources/retention-calculator" },
          { title: "Risk Assessment", href: "/resources/risk-assessment" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
