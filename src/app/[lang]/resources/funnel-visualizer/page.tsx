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
  people: string;
  channel: string;
  tactic: string;
}

interface FunnelStage {
  name: string;
  description: string;
  channelOptions: string[];
  tacticOptions: string[];
  placeholder: string;
}

const STAGES: FunnelStage[] = [
  {
    name: "Awareness",
    description: "People who first learn about your brand or product.",
    channelOptions: [
      "Social Media",
      "Search (SEO)",
      "Paid Ads",
      "Content Marketing",
      "Referrals",
      "PR / Media",
      "Events",
      "Other",
    ],
    tacticOptions: [
      "Blog Posts",
      "Social Posts",
      "Video Content",
      "Display Ads",
      "Influencer Outreach",
      "Podcast Appearances",
      "Press Releases",
      "Other",
    ],
    placeholder: "e.g., 10000",
  },
  {
    name: "Interest",
    description: "People who engage with your content or learn more.",
    channelOptions: [
      "Email Marketing",
      "Social Media",
      "Blog / Content",
      "Webinars",
      "Retargeting Ads",
      "YouTube",
      "Community / Forum",
      "Other",
    ],
    tacticOptions: [
      "Lead Magnets",
      "Newsletter Signup",
      "Webinar Registration",
      "Free Resources",
      "Social Engagement",
      "Video Series",
      "Case Studies",
      "Other",
    ],
    placeholder: "e.g., 3000",
  },
  {
    name: "Consideration",
    description: "People actively evaluating your offering against alternatives.",
    channelOptions: [
      "Email Nurture",
      "Website",
      "Sales Calls",
      "Review Sites",
      "Comparison Pages",
      "Retargeting",
      "Webinars",
      "Other",
    ],
    tacticOptions: [
      "Product Demos",
      "Free Trials",
      "Comparison Guides",
      "Testimonial Pages",
      "Detailed Case Studies",
      "ROI Calculators",
      "FAQ Pages",
      "Other",
    ],
    placeholder: "e.g., 1200",
  },
  {
    name: "Intent",
    description: "People who show purchase intent through specific actions.",
    channelOptions: [
      "Sales Team",
      "Email Sequences",
      "Retargeting Ads",
      "Live Chat",
      "Landing Pages",
      "Phone Calls",
      "Proposals",
      "Other",
    ],
    tacticOptions: [
      "Pricing Page Visits",
      "Custom Proposals",
      "Consultations",
      "Cart / Checkout",
      "Quote Requests",
      "Limited-Time Offers",
      "Personalized Outreach",
      "Other",
    ],
    placeholder: "e.g., 500",
  },
  {
    name: "Purchase",
    description: "People who convert into paying customers.",
    channelOptions: [
      "Direct Sales",
      "E-commerce",
      "Phone Orders",
      "In-Person",
      "Partner / Reseller",
      "Self-Service",
      "Marketplace",
      "Other",
    ],
    tacticOptions: [
      "Checkout Optimization",
      "Payment Plans",
      "Onboarding Support",
      "Money-Back Guarantee",
      "Upsell / Cross-sell",
      "Loyalty Program",
      "Referral Incentive",
      "Other",
    ],
    placeholder: "e.g., 200",
  },
];

const emptyStageData: StageData[] = STAGES.map(() => ({
  people: "",
  channel: "",
  tactic: "",
}));

interface ConversionResult {
  stageConversions: number[];
  dropOffs: number[];
  overallConversion: number;
  biggestLeakIndex: number;
}

const optimizationSuggestions: Record<string, string[]> = {
  Awareness: [
    "Diversify your traffic sources to reduce dependence on a single channel.",
    "Invest in SEO and content marketing for sustainable organic reach.",
    "Test new audience segments with small paid ad budgets before scaling.",
    "Partner with complementary brands for co-marketing opportunities.",
  ],
  Interest: [
    "Create more compelling lead magnets that address specific pain points.",
    "Add clear calls-to-action on your highest-traffic pages.",
    "Use retargeting to re-engage visitors who bounced without converting.",
    "Test different content formats (video, interactive tools, quizzes) to boost engagement.",
  ],
  Consideration: [
    "Publish detailed comparison pages showing how you stack up against alternatives.",
    "Add social proof (case studies, reviews) near your key conversion points.",
    "Offer a free trial or demo to lower the barrier to evaluation.",
    "Create an email nurture sequence that addresses common objections.",
  ],
  Intent: [
    "Simplify your pricing page and make the value proposition unmistakable.",
    "Reduce friction in your checkout or signup flow (fewer form fields, guest checkout).",
    "Add live chat or callback options for prospects ready to buy.",
    "Use urgency elements like limited availability or time-sensitive bonuses.",
  ],
  Purchase: [
    "Optimize your checkout flow by removing unnecessary steps.",
    "Offer multiple payment options (credit card, invoice, installments).",
    "Provide a clear money-back guarantee to reduce purchase anxiety.",
    "Send abandoned cart or abandoned proposal follow-up emails within 24 hours.",
  ],
};

const howToSteps = [
  {
    title: "Enter Your Data",
    description:
      "Start with the number of people at the top of your funnel (Awareness). Fill in each subsequent stage with the number of leads or prospects that progress.",
  },
  {
    title: "Choose Channels and Tactics",
    description:
      "Select the primary channel and tactic driving each stage. This helps identify which strategies are working and where to focus improvement efforts.",
  },
  {
    title: "Analyze Drop-Offs",
    description:
      "The tool automatically calculates conversion rates between stages. Look for the biggest drop-off point, which is your primary funnel leak to fix.",
  },
  {
    title: "Take Action",
    description:
      "Review the optimization suggestions for your weakest stage. Copy or download your results to share with your team and track progress over time.",
  },
];

/* ------------------------------------------------------------------ */
/*  Utility functions                                                  */
/* ------------------------------------------------------------------ */

function parseNumber(val: string): number {
  const n = parseInt(val.replace(/,/g, ""), 10);
  return isNaN(n) || n < 0 ? 0 : n;
}

function calculateConversions(stages: StageData[]): ConversionResult | null {
  const values = stages.map((s) => parseNumber(s.people));

  if (values[0] === 0) return null;
  if (values.some((v) => v === 0)) return null;

  /* Validate that each stage is less than or equal to the previous */
  for (let i = 1; i < values.length; i++) {
    if (values[i] > values[i - 1]) return null;
  }

  const stageConversions: number[] = [];
  const dropOffs: number[] = [];

  for (let i = 1; i < values.length; i++) {
    const rate = (values[i] / values[i - 1]) * 100;
    stageConversions.push(rate);
    dropOffs.push(100 - rate);
  }

  const overallConversion = (values[values.length - 1] / values[0]) * 100;

  let biggestLeakIndex = 0;
  let biggestDrop = 0;
  for (let i = 0; i < dropOffs.length; i++) {
    if (dropOffs[i] > biggestDrop) {
      biggestDrop = dropOffs[i];
      biggestLeakIndex = i;
    }
  }

  return {
    stageConversions,
    dropOffs,
    overallConversion,
    biggestLeakIndex,
  };
}

function formatOutputText(
  stages: StageData[],
  result: ConversionResult,
): string {
  const values = stages.map((s) => parseNumber(s.people));
  const lines: string[] = [];

  lines.push("MARKETING FUNNEL ANALYSIS");
  lines.push("=".repeat(50));
  lines.push("");

  lines.push("FUNNEL DATA");
  lines.push("-".repeat(30));
  STAGES.forEach((stage, i) => {
    lines.push(`${stage.name}: ${values[i].toLocaleString()} people`);
    lines.push(`  Channel: ${stages[i].channel || "Not specified"}`);
    lines.push(`  Tactic: ${stages[i].tactic || "Not specified"}`);
  });
  lines.push("");

  lines.push("STAGE-TO-STAGE CONVERSION RATES");
  lines.push("-".repeat(30));
  for (let i = 0; i < result.stageConversions.length; i++) {
    lines.push(
      `${STAGES[i].name} -> ${STAGES[i + 1].name}: ${result.stageConversions[i].toFixed(1)}% conversion (${result.dropOffs[i].toFixed(1)}% drop-off)`,
    );
  }
  lines.push("");

  lines.push(`OVERALL CONVERSION RATE: ${result.overallConversion.toFixed(2)}%`);
  lines.push("");

  const leakFrom = STAGES[result.biggestLeakIndex].name;
  const leakTo = STAGES[result.biggestLeakIndex + 1].name;
  lines.push(`BIGGEST FUNNEL LEAK: ${leakFrom} -> ${leakTo}`);
  lines.push(
    `Drop-off: ${result.dropOffs[result.biggestLeakIndex].toFixed(1)}%`,
  );
  lines.push("");

  lines.push("OPTIMIZATION SUGGESTIONS");
  lines.push("-".repeat(30));
  const leakStageName = STAGES[result.biggestLeakIndex + 1].name;
  const suggestions = optimizationSuggestions[leakStageName] || [];
  suggestions.forEach((s, i) => {
    lines.push(`${i + 1}. ${s}`);
  });

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function NumberInput({
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
      <input
        id={id}
        type="text"
        inputMode="numeric"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          const raw = e.target.value.replace(/[^0-9]/g, "");
          onChange(raw);
        }}
        className="w-full px-4 py-3 border border-gray-200 text-base bg-white text-black min-h-[44px] focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
      />
    </div>
  );
}

function SelectInput({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id: string;
  label: string;
  options: string[];
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
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-200 text-base bg-white text-black min-h-[44px] appearance-none focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
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
      aria-label="Copy funnel analysis to clipboard"
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
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [text, filename]);

  return (
    <button
      onClick={download}
      aria-label="Download funnel analysis as text file"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      Download as Text
    </button>
  );
}

function StageCard({
  stage,
  index,
  data,
  onChange,
}: {
  stage: FunnelStage;
  index: number;
  data: StageData;
  onChange: (field: keyof StageData, value: string) => void;
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
        <NumberInput
          id={`stage-${index}-people`}
          label="Number of People"
          placeholder={stage.placeholder}
          value={data.people}
          onChange={(v) => onChange("people", v)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectInput
            id={`stage-${index}-channel`}
            label="Primary Channel"
            options={stage.channelOptions}
            value={data.channel}
            onChange={(v) => onChange("channel", v)}
          />
          <SelectInput
            id={`stage-${index}-tactic`}
            label="Main Tactic"
            options={stage.tacticOptions}
            value={data.tactic}
            onChange={(v) => onChange("tactic", v)}
          />
        </div>
      </div>
    </div>
  );
}

function FunnelDiagram({
  stages,
  result,
}: {
  stages: StageData[];
  result: ConversionResult;
}) {
  const values = stages.map((s) => parseNumber(s.people));
  const maxValue = values[0];

  return (
    <div className="border border-gray-200 p-6">
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
        Funnel Visualization
      </h2>
      <div
        className="flex flex-col items-center gap-0"
        role="img"
        aria-label="Marketing funnel diagram showing progression from Awareness through Purchase"
      >
        {STAGES.map((stage, i) => {
          const widthPercent = maxValue > 0 ? (values[i] / maxValue) * 100 : 0;
          /* Ensure minimum visible width */
          const displayWidth = Math.max(widthPercent, 15);
          const isLeak = i > 0 && i - 1 === result.biggestLeakIndex;

          return (
            <div key={stage.name} className="w-full flex flex-col items-center">
              {/* Stage bar */}
              <div
                className="relative flex items-center justify-center py-4 px-4 min-h-[56px] transition-all motion-reduce:transition-none"
                style={{
                  width: `${displayWidth}%`,
                  backgroundColor: isLeak ? "#000" : "#000",
                  opacity: isLeak ? 1 : 0.6 + (i / STAGES.length) * 0.4,
                }}
              >
                <div className="text-center text-white">
                  <p className="text-base font-bold">{stage.name}</p>
                  <p className="text-base">{values[i].toLocaleString()}</p>
                </div>
              </div>

              {/* Conversion arrow between stages */}
              {i < STAGES.length - 1 && (
                <div
                  className={`flex items-center justify-center py-2 text-base font-bold ${
                    i === result.biggestLeakIndex
                      ? "text-black"
                      : "text-gray-500"
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0"
                    >
                      <path
                        d="M8 3v10M4 9l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {result.stageConversions[i].toFixed(1)}% conversion
                    {i === result.biggestLeakIndex && (
                      <span className="ml-1" aria-label="Biggest funnel leak">
                        (Biggest Leak)
                      </span>
                    )}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ConversionTable({
  stages,
  result,
}: {
  stages: StageData[];
  result: ConversionResult;
}) {
  const values = stages.map((s) => parseNumber(s.people));

  return (
    <div className="border border-gray-200">
      <div className="bg-black text-white px-6 py-4">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
          Conversion Breakdown
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-base">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-4 text-left font-bold text-black">
                Transition
              </th>
              <th className="px-6 py-4 text-right font-bold text-black">
                From
              </th>
              <th className="px-6 py-4 text-right font-bold text-black">To</th>
              <th className="px-6 py-4 text-right font-bold text-black">
                Conversion
              </th>
              <th className="px-6 py-4 text-right font-bold text-black">
                Drop-Off
              </th>
            </tr>
          </thead>
          <tbody>
            {result.stageConversions.map((rate, i) => (
              <tr
                key={i}
                className={`border-b border-gray-100 ${
                  i === result.biggestLeakIndex ? "bg-gray-50" : ""
                }`}
              >
                <td className="px-6 py-4 font-bold text-black">
                  {STAGES[i].name} &rarr; {STAGES[i + 1].name}
                  {i === result.biggestLeakIndex && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 bg-black text-white text-base font-bold">
                      Leak
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right text-gray-700">
                  {values[i].toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right text-gray-700">
                  {values[i + 1].toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right font-bold text-black">
                  {rate.toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-right text-gray-500">
                  {result.dropOffs[i].toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-black">
              <td className="px-6 py-4 font-bold text-black">
                Overall ({STAGES[0].name} &rarr;{" "}
                {STAGES[STAGES.length - 1].name})
              </td>
              <td className="px-6 py-4 text-right text-gray-700">
                {values[0].toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right text-gray-700">
                {values[values.length - 1].toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right font-bold text-black">
                {result.overallConversion.toFixed(2)}%
              </td>
              <td className="px-6 py-4 text-right text-gray-500">
                {(100 - result.overallConversion).toFixed(2)}%
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

function OptimizationPanel({ result }: { result: ConversionResult }) {
  const leakStageName = STAGES[result.biggestLeakIndex + 1].name;
  const fromStage = STAGES[result.biggestLeakIndex].name;
  const suggestions = optimizationSuggestions[leakStageName] || [];

  return (
    <div className="border border-gray-200">
      <div className="bg-black text-white px-6 py-4">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
          Optimization Suggestions
        </h3>
      </div>
      <div className="p-6">
        <p className="text-base text-gray-700 mb-4">
          Your biggest funnel leak is between{" "}
          <span className="font-bold text-black">{fromStage}</span> and{" "}
          <span className="font-bold text-black">{leakStageName}</span>, where{" "}
          <span className="font-bold text-black">
            {result.dropOffs[result.biggestLeakIndex].toFixed(1)}%
          </span>{" "}
          of prospects drop off. Here are actions you can take to improve the{" "}
          <span className="font-bold text-black">{leakStageName}</span> stage:
        </p>
        <div className="space-y-4">
          {suggestions.map((suggestion, i) => (
            <div
              key={i}
              className="flex items-start gap-3 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
            >
              <span className="inline-flex items-center justify-center min-w-[28px] h-7 bg-black text-white text-base font-bold shrink-0">
                {i + 1}
              </span>
              <p className="text-base text-gray-700 leading-relaxed">
                {suggestion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function FunnelVisualizerPage() {
  const [stagesData, setStagesData] = useState<StageData[]>(emptyStageData);
  const [showResults, setShowResults] = useState(false);

  function updateStage(
    index: number,
    field: keyof StageData,
    value: string,
  ) {
    setStagesData((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  const result = useMemo(() => {
    if (!showResults) return null;
    return calculateConversions(stagesData);
  }, [stagesData, showResults]);

  const validationError = useMemo(() => {
    const values = stagesData.map((s) => parseNumber(s.people));
    if (values.some((v) => v === 0)) {
      return "Enter a number greater than zero for every stage.";
    }
    for (let i = 1; i < values.length; i++) {
      if (values[i] > values[i - 1]) {
        return `${STAGES[i].name} (${values[i].toLocaleString()}) cannot exceed ${STAGES[i - 1].name} (${values[i - 1].toLocaleString()}). Each stage should be equal to or smaller than the previous.`;
      }
    }
    return null;
  }, [stagesData]);

  const allPeopleFilled = stagesData.every(
    (s) => s.people.trim() !== "" && parseNumber(s.people) > 0,
  );

  const canGenerate = allPeopleFilled && validationError === null;

  function handleAnalyze() {
    if (!canGenerate) return;
    setShowResults(true);
  }

  function handleReset() {
    setStagesData(emptyStageData.map((s) => ({ ...s })));
    setShowResults(false);
  }

  const hasInput = stagesData.some(
    (s) => s.people.trim() !== "" || s.channel !== "" || s.tactic !== "",
  );

  const plainText =
    result !== null ? formatOutputText(stagesData, result) : "";

  return (
    <article className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Funnel Visualizer",
          description:
            "Free marketing funnel analysis tool. Enter your funnel data to visualize conversion rates, identify drop-off points, and get optimization suggestions for each stage.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Marketing Funnel Visualizer" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing Funnel Visualizer
            </h1>
            <SectionDesc>
              Map out your 5-stage marketing funnel, visualize conversion rates
              between each stage, and pinpoint exactly where prospects are
              dropping off so you can focus your optimization efforts where they
              matter most.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Form ---- */}
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

          {/* Validation message */}
          {hasInput && validationError && (
            <Animate animation="fade-up">
              <p
                className="text-base text-black font-bold mt-6 border border-black px-4 py-3"
                role="alert"
              >
                {validationError}
              </p>
            </Animate>
          )}

          {/* Analyze / Reset */}
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3 mt-8">
              <button
                onClick={handleAnalyze}
                disabled={!canGenerate}
                className="bg-black text-white px-8 py-4 min-h-[44px] text-base font-bold hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Analyze Funnel
              </button>
              {hasInput && (
                <button
                  onClick={handleReset}
                  className="px-8 py-4 min-h-[44px] text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Reset
                </button>
              )}
              {!canGenerate && !validationError && (
                <p className="text-base text-gray-400 self-center">
                  Enter the number of people at each funnel stage to begin.
                </p>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Results ---- */}
      {result !== null && (
        <section aria-label="Funnel Summary" className="px-6 lg:px-12 pb-16">
          <div className="max-w-3xl mx-auto space-y-12">
            {/* Overall stats */}
            <Animate animation="fade-up">
              <div className="border border-gray-200 p-6">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                  Funnel Summary
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center border border-gray-200 p-4">
                    <p className="text-base text-gray-500 mb-1">
                      Overall Conversion
                    </p>
                    <p className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
                      {result.overallConversion.toFixed(2)}%
                    </p>
                  </div>
                  <div className="text-center border border-gray-200 p-4">
                    <p className="text-base text-gray-500 mb-1">
                      Biggest Leak
                    </p>
                    <p className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                      {STAGES[result.biggestLeakIndex].name} &rarr;{" "}
                      {STAGES[result.biggestLeakIndex + 1].name}
                    </p>
                  </div>
                  <div className="text-center border border-gray-200 p-4">
                    <p className="text-base text-gray-500 mb-1">
                      Leak Drop-Off
                    </p>
                    <p className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
                      {result.dropOffs[result.biggestLeakIndex].toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </Animate>

            {/* Funnel visualization */}
            <Animate animation="fade-up">
              <FunnelDiagram stages={stagesData} result={result} />
            </Animate>

            {/* Conversion table */}
            <Animate animation="fade-up">
              <ConversionTable stages={stagesData} result={result} />
            </Animate>

            {/* Optimization suggestions */}
            <Animate animation="fade-up">
              <OptimizationPanel result={result} />
            </Animate>

            {/* Export actions */}
            <div className="flex flex-wrap gap-3">
              <CopyButton text={plainText} />
              <DownloadButton
                text={plainText}
                filename="funnel-analysis.txt"
              />
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
              Get a Professional Funnel Audit
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              This tool gives you a starting point. Our team performs in-depth
              funnel audits using real analytics data, heatmaps, and user
              behavior analysis to find exactly where and why you are losing
              prospects, and how to fix it.
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
        toolName="Funnel Visualizer"
        services={[
          { title: "Digital Marketing", desc: "Data-driven strategy with transparent reporting and insights.", href: "/services/digital-marketing" },
          { title: "Performance Marketing", desc: "Campaign optimization based on real performance data.", href: "/services/performance-marketing" },
          { title: "SEO", desc: "SEO analytics that show exactly what drives organic growth.", href: "/services/seo" },
        ]}
        relatedTools={[
          { title: "Funnel Calculator", href: "/resources/funnel-calculator" },
          { title: "Email Subject Ab Tester", href: "/resources/email-subject-ab-tester" },
          { title: "Email Subject Tester", href: "/resources/email-subject-tester" },
          { title: "Email Warmup Planner", href: "/resources/email-warmup-planner" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
