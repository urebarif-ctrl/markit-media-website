"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

interface StageData {
  touchpoints: string;
  emotion: number;
  painPoints: string;
  opportunities: string;
}

interface JourneyStage {
  name: string;
  description: string;
  touchpointHints: string;
  painPointHints: string;
  opportunityHints: string;
}

const STAGES: JourneyStage[] = [
  {
    name: "Awareness",
    description: "The customer first discovers your brand or realizes they have a need.",
    touchpointHints: "e.g., Social media ads, blog posts, word-of-mouth, search results",
    painPointHints: "e.g., Information overload, unclear messaging, hard to find",
    opportunityHints: "e.g., SEO content, targeted ads, referral programs",
  },
  {
    name: "Consideration",
    description: "The customer actively researches and compares options to solve their need.",
    touchpointHints: "e.g., Website, reviews, comparison pages, email nurture, webinars",
    painPointHints: "e.g., Too many options, lack of trust signals, unclear pricing",
    opportunityHints: "e.g., Case studies, comparison guides, free trials, live demos",
  },
  {
    name: "Decision",
    description: "The customer chooses a solution and is ready to commit.",
    touchpointHints: "e.g., Pricing page, sales calls, proposals, checkout page",
    painPointHints: "e.g., Complex checkout, hidden fees, no guarantee, slow response",
    opportunityHints: "e.g., Clear pricing, money-back guarantee, live chat, testimonials",
  },
  {
    name: "Purchase",
    description: "The customer completes the transaction and begins using the product or service.",
    touchpointHints: "e.g., Order confirmation, onboarding emails, welcome call, setup guide",
    painPointHints: "e.g., Confusing onboarding, delayed delivery, poor first experience",
    opportunityHints: "e.g., Smooth onboarding, welcome sequence, quick-start guide",
  },
  {
    name: "Retention",
    description: "The customer continues using your product or service and decides whether to stay.",
    touchpointHints: "e.g., Support tickets, newsletters, loyalty program, account dashboard",
    painPointHints: "e.g., Poor support, no engagement, stale experience, no updates",
    opportunityHints: "e.g., Loyalty rewards, regular check-ins, feature updates, community",
  },
];

const EMOTION_LABELS: Record<number, string> = {
  1: "Frustrated",
  2: "Dissatisfied",
  3: "Neutral",
  4: "Satisfied",
  5: "Delighted",
};

const BUSINESS_TYPES = [
  "E-commerce / Retail",
  "SaaS / Software",
  "Professional Services",
  "Healthcare",
  "Real Estate",
  "Restaurant / Hospitality",
  "Education",
  "Home Services",
  "B2B / Enterprise",
  "Nonprofit",
  "Other",
];

const emptyStageData: StageData[] = STAGES.map(() => ({
  touchpoints: "",
  emotion: 3,
  painPoints: "",
  opportunities: "",
}));

const stageRecommendations: Record<string, Record<string, string[]>> = {
  Awareness: {
    low: [
      "Audit your current channels to identify which are driving the most qualified awareness.",
      "Invest in content that addresses your audience's top questions before they know about you.",
      "Test paid campaigns on one to two platforms before spreading budget across many.",
      "Partner with complementary brands or publishers your audience already trusts.",
    ],
    mid: [
      "Diversify traffic sources to reduce dependence on a single channel.",
      "Create shareable content formats like infographics, short videos, or data-driven posts.",
      "Optimize your organic search presence for high-intent informational queries.",
    ],
    high: [
      "Scale what is working and experiment with emerging channels.",
      "Build brand recall through consistent messaging and visual identity across touchpoints.",
      "Develop a referral program to turn existing customers into awareness drivers.",
    ],
  },
  Consideration: {
    low: [
      "Publish comparison pages and buying guides that help prospects evaluate options.",
      "Add visible trust signals: reviews, certifications, and case studies on key pages.",
      "Implement retargeting to stay in front of prospects who visited but did not convert.",
      "Create an email nurture sequence that addresses the most common objections.",
    ],
    mid: [
      "Offer a free trial, sample, or consultation to lower the evaluation barrier.",
      "Produce detailed case studies showing measurable results for similar businesses.",
      "Add live chat or callback options on your highest-traffic evaluation pages.",
    ],
    high: [
      "Personalize content recommendations based on how the prospect arrived.",
      "Build a resource library that positions you as the go-to expert in your space.",
      "Test interactive tools (calculators, quizzes) that provide personalized value.",
    ],
  },
  Decision: {
    low: [
      "Simplify your pricing page and make the value proposition unmistakable.",
      "Remove unnecessary steps from your checkout or signup flow.",
      "Add a clear money-back guarantee or risk-free trial to reduce purchase anxiety.",
      "Follow up with abandoned carts or proposals within 24 hours.",
    ],
    mid: [
      "Offer multiple payment options (credit card, invoice, installments).",
      "Use urgency elements like limited availability when they are genuine.",
      "Provide a side-by-side plan comparison so prospects can self-select.",
    ],
    high: [
      "A/B test your conversion pages to continuously improve close rates.",
      "Add personalized recommendations based on the prospect's browsing behavior.",
      "Equip your sales team with objection-handling scripts backed by data.",
    ],
  },
  Purchase: {
    low: [
      "Send an immediate order confirmation with clear next steps.",
      "Create a structured onboarding sequence that walks new customers through setup.",
      "Assign a dedicated contact or send a personal welcome message.",
      "Set clear expectations about timelines, deliverables, and how to get help.",
    ],
    mid: [
      "Identify and fix the biggest friction points in your first-use experience.",
      "Send a check-in message within the first week to catch issues early.",
      "Provide quick-start guides, video walkthroughs, or templates.",
    ],
    high: [
      "Automate personalized onboarding paths based on customer segment or plan.",
      "Track activation metrics and proactively reach out to customers who stall.",
      "Celebrate the first success milestone to reinforce the purchase decision.",
    ],
  },
  Retention: {
    low: [
      "Establish a regular communication cadence (monthly newsletter, product updates).",
      "Create a feedback loop so customers can easily report issues or share ideas.",
      "Build a loyalty or rewards program that incentivizes continued engagement.",
      "Monitor churn signals (support tickets, decreased usage) and intervene early.",
    ],
    mid: [
      "Segment your customer base and tailor retention efforts by value and behavior.",
      "Run quarterly business reviews or check-ins for your highest-value accounts.",
      "Develop a customer community, forum, or user group.",
    ],
    high: [
      "Launch a referral program that rewards customers for bringing in new business.",
      "Offer exclusive early access to new features or services for loyal customers.",
      "Use NPS or CSAT surveys to identify promoters and turn them into advocates.",
    ],
  },
};

const howToSteps = [
  {
    title: "Define Your Business",
    description:
      "Start by selecting your business type and describing your target audience. This context helps you think about the journey from your specific customer's perspective.",
  },
  {
    title: "Map Each Stage",
    description:
      "For each of the 5 stages, list the touchpoints where customers interact with you, rate their likely emotion (1-5), note pain points, and identify opportunities for improvement.",
  },
  {
    title: "Review the Visualization",
    description:
      "Generate your journey map to see the emotion curve across all stages. The visual timeline highlights where the customer experience dips and where it excels.",
  },
  {
    title: "Act on Recommendations",
    description:
      "Review the tailored recommendations for each stage, starting with the lowest-scoring areas. Export or copy your map to share with your team.",
  },
];

/* ------------------------------------------------------------------ */
/*  Utility functions                                                  */
/* ------------------------------------------------------------------ */

function getEmotionTier(emotion: number): "low" | "mid" | "high" {
  if (emotion <= 2) return "low";
  if (emotion <= 3) return "mid";
  return "high";
}

function formatOutputText(
  businessType: string,
  audience: string,
  stages: StageData[],
): string {
  const lines: string[] = [];

  lines.push("CUSTOMER JOURNEY MAP");
  lines.push("=".repeat(50));
  lines.push("");

  if (businessType) lines.push(`Business Type: ${businessType}`);
  if (audience) lines.push(`Target Audience: ${audience}`);
  if (businessType || audience) lines.push("");

  STAGES.forEach((stage, i) => {
    lines.push(`--- ${stage.name.toUpperCase()} ---`);
    lines.push(`Emotion: ${stages[i].emotion}/5 (${EMOTION_LABELS[stages[i].emotion]})`);
    lines.push(`Touchpoints: ${stages[i].touchpoints || "Not specified"}`);
    lines.push(`Pain Points: ${stages[i].painPoints || "Not specified"}`);
    lines.push(`Opportunities: ${stages[i].opportunities || "Not specified"}`);
    lines.push("");
  });

  const avgEmotion = stages.reduce((sum, s) => sum + s.emotion, 0) / stages.length;
  lines.push(`Average Emotion Score: ${avgEmotion.toFixed(1)}/5`);

  const lowestIdx = stages.reduce((minIdx, s, i, arr) => (s.emotion < arr[minIdx].emotion ? i : minIdx), 0);
  lines.push(`Weakest Stage: ${STAGES[lowestIdx].name} (${stages[lowestIdx].emotion}/5)`);
  lines.push("");

  lines.push("RECOMMENDATIONS");
  lines.push("-".repeat(30));
  STAGES.forEach((stage, i) => {
    const tier = getEmotionTier(stages[i].emotion);
    const recs = stageRecommendations[stage.name]?.[tier] || [];
    if (recs.length > 0) {
      lines.push(`${stage.name}:`);
      recs.forEach((r, j) => {
        lines.push(`  ${j + 1}. ${r}`);
      });
      lines.push("");
    }
  });

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
      aria-label="Copy journey map to clipboard"
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
      aria-label="Download journey map as text file"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      Download as Text
    </button>
  );
}

function EmotionSlider({
  stageIndex,
  value,
  onChange,
}: {
  stageIndex: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label
        htmlFor={`emotion-${stageIndex}`}
        className="block text-base font-bold text-black mb-2"
      >
        Customer Emotion: {value}/5 ({EMOTION_LABELS[value]})
      </label>
      <div className="flex items-center gap-3">
        <span className="text-base text-gray-500 shrink-0">1</span>
        <input
          id={`emotion-${stageIndex}`}
          type="range"
          min={1}
          max={5}
          step={1}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-gray-200 appearance-none cursor-pointer accent-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
          aria-valuemin={1}
          aria-valuemax={5}
          aria-valuenow={value}
          aria-valuetext={EMOTION_LABELS[value]}
        />
        <span className="text-base text-gray-500 shrink-0">5</span>
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-base text-gray-400">Frustrated</span>
        <span className="text-base text-gray-400">Delighted</span>
      </div>
    </div>
  );
}

function TextAreaInput({
  id,
  label,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-base font-bold text-black mb-2"
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={3}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-200 text-base bg-white text-black min-h-[44px] resize-y focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
      />
    </div>
  );
}

function StageCard({
  stage,
  index,
  data,
  onChange,
}: {
  stage: JourneyStage;
  index: number;
  data: StageData;
  onChange: (field: keyof StageData, value: string | number) => void;
}) {
  return (
    <div className="border border-gray-200">
      <div className="bg-black text-white px-6 py-4 flex items-center gap-3">
        <span className="inline-flex items-center justify-center min-w-[32px] h-8 border border-white text-base font-bold">
          {index + 1}
        </span>
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
            {stage.name}
          </h3>
          <p className="text-base text-gray-400">{stage.description}</p>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <TextAreaInput
          id={`touchpoints-${index}`}
          label="Touchpoints"
          placeholder={stage.touchpointHints}
          value={data.touchpoints}
          onChange={(v) => onChange("touchpoints", v)}
        />
        <EmotionSlider
          stageIndex={index}
          value={data.emotion}
          onChange={(v) => onChange("emotion", v)}
        />
        <TextAreaInput
          id={`pain-${index}`}
          label="Pain Points"
          placeholder={stage.painPointHints}
          value={data.painPoints}
          onChange={(v) => onChange("painPoints", v)}
        />
        <TextAreaInput
          id={`opportunities-${index}`}
          label="Opportunities"
          placeholder={stage.opportunityHints}
          value={data.opportunities}
          onChange={(v) => onChange("opportunities", v)}
        />
      </div>
    </div>
  );
}

function EmotionCurve({ stages }: { stages: StageData[] }) {
  const width = 800;
  const height = 300;
  const padLeft = 60;
  const padRight = 40;
  const padTop = 40;
  const padBottom = 60;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const points = stages.map((s, i) => {
    const x = padLeft + (i / (STAGES.length - 1)) * chartW;
    const y = padTop + chartH - ((s.emotion - 1) / 4) * chartH;
    return { x, y, emotion: s.emotion };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padTop + chartH} L ${points[0].x} ${padTop + chartH} Z`;

  return (
    <div className="border border-gray-200 p-6">
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
        Emotion Curve
      </h2>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full max-w-[800px]"
          role="img"
          aria-label="Customer emotion curve across the 5 journey stages from Awareness to Retention"
        >
          {/* Grid lines */}
          {[1, 2, 3, 4, 5].map((level) => {
            const y = padTop + chartH - ((level - 1) / 4) * chartH;
            return (
              <g key={level}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={padLeft + chartW}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
                <text
                  x={padLeft - 10}
                  y={y + 5}
                  textAnchor="end"
                  fill="#9ca3af"
                  fontSize="13"
                  fontFamily="var(--font-body)"
                >
                  {level}
                </text>
              </g>
            );
          })}

          {/* Y-axis label */}
          <text
            x={14}
            y={padTop + chartH / 2}
            textAnchor="middle"
            fill="#6b7280"
            fontSize="12"
            fontFamily="var(--font-body)"
            transform={`rotate(-90, 14, ${padTop + chartH / 2})`}
          >
            Emotion (1-5)
          </text>

          {/* Area fill */}
          <path d={areaPath} fill="#000" opacity="0.05" />

          {/* Line */}
          <path d={linePath} fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Data points & stage labels */}
          {points.map((p, i) => (
            <g key={i}>
              {/* Vertical reference line */}
              <line
                x1={p.x}
                y1={padTop}
                x2={p.x}
                y2={padTop + chartH}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="4 4"
              />

              {/* Dot */}
              <circle cx={p.x} cy={p.y} r="8" fill="#000" />
              <text
                x={p.x}
                y={p.y - 16}
                textAnchor="middle"
                fill="#000"
                fontSize="14"
                fontWeight="bold"
                fontFamily="var(--font-body)"
              >
                {p.emotion}
              </text>

              {/* Stage name */}
              <text
                x={p.x}
                y={padTop + chartH + 24}
                textAnchor="middle"
                fill="#000"
                fontSize="13"
                fontWeight="bold"
                fontFamily="var(--font-display)"
              >
                {STAGES[i].name}
              </text>

              {/* Emotion label */}
              <text
                x={p.x}
                y={padTop + chartH + 42}
                textAnchor="middle"
                fill="#9ca3af"
                fontSize="11"
                fontFamily="var(--font-body)"
              >
                {EMOTION_LABELS[p.emotion]}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

function JourneyTimeline({ stages }: { stages: StageData[] }) {
  return (
    <div className="border border-gray-200 p-6">
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
        Journey Timeline
      </h2>
      <div className="overflow-x-auto">
        <div className="flex gap-0 min-w-[700px]">
          {STAGES.map((stage, i) => {
            const emotion = stages[i].emotion;
            const opacityMap: Record<number, string> = {
              1: "opacity-30",
              2: "opacity-50",
              3: "opacity-70",
              4: "opacity-85",
              5: "opacity-100",
            };
            return (
              <div key={stage.name} className="flex-1 relative">
                {/* Stage header */}
                <div className={`bg-black text-white px-4 py-3 text-center ${opacityMap[emotion]}`}>
                  <p className="text-base font-bold">{stage.name}</p>
                  <p className="text-base">{emotion}/5</p>
                </div>

                {/* Connector arrow */}
                {i < STAGES.length - 1 && (
                  <div className="absolute top-1/2 -right-2 z-10 -translate-y-1/2" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 3l5 5-5 5" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}

                {/* Stage details */}
                <div className="border-t border-gray-100 px-4 py-3 space-y-2 text-base">
                  {stages[i].touchpoints && (
                    <div>
                      <p className="font-bold text-black">Touchpoints</p>
                      <p className="text-gray-500 leading-relaxed">{stages[i].touchpoints}</p>
                    </div>
                  )}
                  {stages[i].painPoints && (
                    <div>
                      <p className="font-bold text-black">Pain Points</p>
                      <p className="text-gray-500 leading-relaxed">{stages[i].painPoints}</p>
                    </div>
                  )}
                  {stages[i].opportunities && (
                    <div>
                      <p className="font-bold text-black">Opportunities</p>
                      <p className="text-gray-500 leading-relaxed">{stages[i].opportunities}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function RecommendationPanel({ stages }: { stages: StageData[] }) {
  const lowestIdx = stages.reduce(
    (minIdx, s, i, arr) => (s.emotion < arr[minIdx].emotion ? i : minIdx),
    0,
  );

  return (
    <div className="border border-gray-200">
      <div className="bg-black text-white px-6 py-4">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
          Recommendations by Stage
        </h3>
      </div>
      <div className="p-6 space-y-8">
        {STAGES.map((stage, i) => {
          const tier = getEmotionTier(stages[i].emotion);
          const recs = stageRecommendations[stage.name]?.[tier] || [];
          const isWeakest = i === lowestIdx;

          return (
            <div key={stage.name}>
              <div className="flex items-center gap-3 mb-3">
                <h4 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black">
                  {stage.name} ({stages[i].emotion}/5)
                </h4>
                {isWeakest && (
                  <span className="inline-flex items-center px-2 py-0.5 bg-black text-white text-base font-bold">
                    Priority
                  </span>
                )}
              </div>
              <div className="space-y-3">
                {recs.map((rec, j) => (
                  <div
                    key={j}
                    className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
                  >
                    <span className="inline-flex items-center justify-center min-w-[28px] h-7 bg-black text-white text-base font-bold shrink-0">
                      {j + 1}
                    </span>
                    <p className="text-base text-gray-700 leading-relaxed">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SummaryStats({ stages }: { stages: StageData[] }) {
  const avgEmotion = stages.reduce((sum, s) => sum + s.emotion, 0) / stages.length;
  const lowestIdx = stages.reduce(
    (minIdx, s, i, arr) => (s.emotion < arr[minIdx].emotion ? i : minIdx),
    0,
  );
  const highestIdx = stages.reduce(
    (maxIdx, s, i, arr) => (s.emotion > arr[maxIdx].emotion ? i : maxIdx),
    0,
  );

  return (
    <div className="border border-gray-200 p-6">
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
        Journey Summary
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="text-center border border-gray-200 p-4">
          <p className="text-base text-gray-500 mb-1">Average Emotion</p>
          <p className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
            {avgEmotion.toFixed(1)}/5
          </p>
        </div>
        <div className="text-center border border-gray-200 p-4">
          <p className="text-base text-gray-500 mb-1">Weakest Stage</p>
          <p className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
            {STAGES[lowestIdx].name}
          </p>
          <p className="text-base text-gray-400">
            {stages[lowestIdx].emotion}/5 ({EMOTION_LABELS[stages[lowestIdx].emotion]})
          </p>
        </div>
        <div className="text-center border border-gray-200 p-4">
          <p className="text-base text-gray-500 mb-1">Strongest Stage</p>
          <p className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
            {STAGES[highestIdx].name}
          </p>
          <p className="text-base text-gray-400">
            {stages[highestIdx].emotion}/5 ({EMOTION_LABELS[stages[highestIdx].emotion]})
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function CustomerJourneyMapperPage() {
  const [businessType, setBusinessType] = useState("");
  const [audience, setAudience] = useState("");
  const [stagesData, setStagesData] = useState<StageData[]>(
    emptyStageData.map((s) => ({ ...s })),
  );
  const [showResults, setShowResults] = useState(false);

  function updateStage(index: number, field: keyof StageData, value: string | number) {
    setStagesData((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  const hasAnyInput = useMemo(() => {
    return (
      businessType !== "" ||
      audience !== "" ||
      stagesData.some(
        (s) =>
          s.touchpoints.trim() !== "" ||
          s.emotion !== 3 ||
          s.painPoints.trim() !== "" ||
          s.opportunities.trim() !== "",
      )
    );
  }, [businessType, audience, stagesData]);

  const hasMinimumInput = useMemo(() => {
    return stagesData.some(
      (s) => s.touchpoints.trim() !== "" || s.painPoints.trim() !== "" || s.opportunities.trim() !== "",
    );
  }, [stagesData]);

  function handleGenerate() {
    if (!hasMinimumInput) return;
    setShowResults(true);
  }

  function handleReset() {
    setBusinessType("");
    setAudience("");
    setStagesData(emptyStageData.map((s) => ({ ...s })));
    setShowResults(false);
  }

  const plainText = useMemo(() => {
    if (!showResults) return "";
    return formatOutputText(businessType, audience, stagesData);
  }, [showResults, businessType, audience, stagesData]);

  return (
    <article className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Customer Journey Mapper",
          description:
            "Free customer journey mapping tool. Define your audience, map 5 stages with touchpoints, emotions, pain points, and opportunities, then visualize with an emotion curve and get recommendations.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Customer Journey Mapper" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Customer Journey Mapper
            </h1>
            <SectionDesc>
              Map your customer experience across 5 stages — from first
              awareness to long-term retention. Define touchpoints, rate
              emotions, identify pain points, and uncover opportunities to
              improve every interaction.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Business Context ---- */}
      <section aria-label="Your Business Context" className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="border border-gray-200 p-6 space-y-4">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold text-black">
                Your Business Context
              </h2>
              <div>
                <label
                  htmlFor="business-type"
                  className="block text-base font-bold text-black mb-2"
                >
                  Business Type
                </label>
                <select
                  id="business-type"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 text-base bg-white text-black min-h-[44px] appearance-none focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
                >
                  <option value="">Select your business type...</option>
                  {BUSINESS_TYPES.map((bt) => (
                    <option key={bt} value={bt}>
                      {bt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="target-audience"
                  className="block text-base font-bold text-black mb-2"
                >
                  Target Audience
                </label>
                <textarea
                  id="target-audience"
                  rows={2}
                  placeholder="e.g., Small business owners aged 30-55 looking for marketing help"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 text-base bg-white text-black min-h-[44px] resize-y focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
                />
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Stage Cards ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto">
          <Stagger stagger={100} className="space-y-6">
            {STAGES.map((stage, i) => (
              <StageCard
                key={stage.name}
                stage={stage}
                index={i}
                data={stagesData[i]}
                onChange={(field, value) => updateStage(i, field, value)}
              />
            ))}
          </Stagger>

          {/* Generate / Reset */}
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3 mt-8">
              <button
                onClick={handleGenerate}
                disabled={!hasMinimumInput}
                className="bg-black text-white px-8 py-4 min-h-[44px] text-base font-bold hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Generate Journey Map
              </button>
              {hasAnyInput && (
                <button
                  onClick={handleReset}
                  className="px-8 py-4 min-h-[44px] text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Reset
                </button>
              )}
              {!hasMinimumInput && (
                <p className="text-base text-gray-400 self-center">
                  Fill in touchpoints, pain points, or opportunities for at least one stage to begin.
                </p>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Results ---- */}
      {showResults && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-16">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Summary stats */}
            <Animate animation="fade-up">
              <SummaryStats stages={stagesData} />
            </Animate>

            {/* Emotion curve SVG */}
            <Animate animation="fade-up">
              <EmotionCurve stages={stagesData} />
            </Animate>

            {/* Journey timeline */}
            <Animate animation="fade-up">
              <JourneyTimeline stages={stagesData} />
            </Animate>

            {/* Recommendations */}
            <Animate animation="fade-up">
              <RecommendationPanel stages={stagesData} />
            </Animate>

            {/* Export actions */}
            <div className="flex flex-wrap gap-3">
              <CopyButton text={plainText} />
              <DownloadButton text={plainText} filename="customer-journey-map.txt" />
            </div>
          </div>
        </section>
      )}

      {/* ---- How to Use ---- */}
      <section aria-label="How to Use This Tool" className="px-6 lg:px-12 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-8">
              How to Use This Tool
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
              Get Expert Help With Your Customer Experience
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              This tool gives you a starting framework. Our team builds
              comprehensive customer journey strategies using real data,
              analytics, and user research to find exactly where your
              experience breaks down and how to fix it.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Work With Our Team &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Customer Journey Mapper"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Customer Feedback Survey", href: "/resources/customer-feedback-survey" },
          { title: "Customer Journey Builder", href: "/resources/customer-journey-builder" },
          { title: "Conversion Funnel Simulator", href: "/resources/conversion-funnel-simulator" },
          { title: "Cro Audit", href: "/resources/cro-audit" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
