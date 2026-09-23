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

interface SwotData {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

interface ContextData {
  businessName: string;
  industry: string;
  analysisDate: string;
}

interface StrategyGroup {
  label: string;
  abbr: string;
  description: string;
  strategies: string[];
}

type QuadrantKey = keyof SwotData;

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const industries = [
  "Technology",
  "Healthcare",
  "Finance & Banking",
  "Retail & E-commerce",
  "Real Estate",
  "Education",
  "Manufacturing",
  "Food & Beverage",
  "Travel & Hospitality",
  "Professional Services",
  "Media & Entertainment",
  "Construction",
  "Automotive",
  "Non-Profit",
  "Energy & Utilities",
];

const quadrants: {
  key: QuadrantKey;
  label: string;
  placeholder: string;
  color: string;
  headerBg: string;
  headerText: string;
}[] = [
  {
    key: "strengths",
    label: "Strengths",
    placeholder: "e.g. Strong brand recognition",
    color: "border-gray-300",
    headerBg: "bg-black",
    headerText: "text-white",
  },
  {
    key: "weaknesses",
    label: "Weaknesses",
    placeholder: "e.g. Limited marketing budget",
    color: "border-gray-300",
    headerBg: "bg-gray-700",
    headerText: "text-white",
  },
  {
    key: "opportunities",
    label: "Opportunities",
    placeholder: "e.g. Growing demand in new market",
    color: "border-gray-300",
    headerBg: "bg-gray-500",
    headerText: "text-white",
  },
  {
    key: "threats",
    label: "Threats",
    placeholder: "e.g. New competitor entering market",
    color: "border-gray-300",
    headerBg: "bg-gray-400",
    headerText: "text-black",
  },
];

const emptySwot: SwotData = {
  strengths: [],
  weaknesses: [],
  opportunities: [],
  threats: [],
};

function getTodayISO(): string {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

/* ------------------------------------------------------------------ */
/*  Strategy generation                                                */
/* ------------------------------------------------------------------ */

function generateStrategies(swot: SwotData): StrategyGroup[] {
  const groups: StrategyGroup[] = [];

  // SO Strategies: Use strengths to capitalize on opportunities
  if (swot.strengths.length > 0 && swot.opportunities.length > 0) {
    const strats: string[] = [];
    for (let i = 0; i < Math.min(swot.strengths.length, swot.opportunities.length, 3); i++) {
      const s = swot.strengths[i];
      const o = swot.opportunities[i % swot.opportunities.length];
      strats.push(
        `Leverage "${s}" to pursue "${o}". Align your strongest internal asset with this external opening for maximum impact.`
      );
    }
    if (swot.strengths.length > 1 && swot.opportunities.length > 1) {
      strats.push(
        "Combine multiple strengths into an integrated initiative to capture the highest-value opportunities simultaneously."
      );
    }
    groups.push({
      label: "SO Strategies (Strengths + Opportunities)",
      abbr: "SO",
      description: "Use strengths to take advantage of opportunities",
      strategies: strats,
    });
  }

  // WO Strategies: Overcome weaknesses by pursuing opportunities
  if (swot.weaknesses.length > 0 && swot.opportunities.length > 0) {
    const strats: string[] = [];
    for (let i = 0; i < Math.min(swot.weaknesses.length, swot.opportunities.length, 3); i++) {
      const w = swot.weaknesses[i];
      const o = swot.opportunities[i % swot.opportunities.length];
      strats.push(
        `Address "${w}" by investing in "${o}". Turn this weakness into a development priority that also captures a market opening.`
      );
    }
    strats.push(
      "Consider partnerships or outsourcing to bridge internal gaps while the opportunities are still available."
    );
    groups.push({
      label: "WO Strategies (Weaknesses + Opportunities)",
      abbr: "WO",
      description: "Overcome weaknesses by pursuing opportunities",
      strategies: strats,
    });
  }

  // ST Strategies: Use strengths to minimize threats
  if (swot.strengths.length > 0 && swot.threats.length > 0) {
    const strats: string[] = [];
    for (let i = 0; i < Math.min(swot.strengths.length, swot.threats.length, 3); i++) {
      const s = swot.strengths[i];
      const t = swot.threats[i % swot.threats.length];
      strats.push(
        `Use "${s}" as a defensive advantage against "${t}". Strengthen this position to make the threat less impactful.`
      );
    }
    strats.push(
      "Build contingency plans that deploy your core strengths if any threat escalates beyond current projections."
    );
    groups.push({
      label: "ST Strategies (Strengths + Threats)",
      abbr: "ST",
      description: "Use strengths to minimize threats",
      strategies: strats,
    });
  }

  // WT Strategies: Minimize weaknesses and avoid threats
  if (swot.weaknesses.length > 0 && swot.threats.length > 0) {
    const strats: string[] = [];
    for (let i = 0; i < Math.min(swot.weaknesses.length, swot.threats.length, 3); i++) {
      const w = swot.weaknesses[i];
      const t = swot.threats[i % swot.threats.length];
      strats.push(
        `"${w}" makes you vulnerable to "${t}". Prioritize fixing this weakness or develop a risk mitigation plan to reduce exposure.`
      );
    }
    strats.push(
      "Identify which weakness-threat combinations pose existential risk and address those first, even if they require difficult trade-offs."
    );
    groups.push({
      label: "WT Strategies (Weaknesses + Threats)",
      abbr: "WT",
      description: "Minimize weaknesses and avoid threats",
      strategies: strats,
    });
  }

  return groups;
}

/* ------------------------------------------------------------------ */
/*  Format as plain text                                               */
/* ------------------------------------------------------------------ */

function formatSwotText(swot: SwotData, ctx: ContextData, strategies: StrategyGroup[]): string {
  const lines: string[] = [];
  const title = ctx.businessName ? `SWOT ANALYSIS: ${ctx.businessName}` : "SWOT ANALYSIS";
  lines.push(title);
  lines.push("=".repeat(50));
  if (ctx.industry) lines.push(`Industry: ${ctx.industry}`);
  lines.push(`Date: ${ctx.analysisDate}`);
  lines.push("");

  for (const q of quadrants) {
    lines.push(q.label.toUpperCase());
    lines.push("-".repeat(30));
    const items = swot[q.key];
    if (items.length === 0) {
      lines.push("  (none)");
    } else {
      items.forEach((item, i) => lines.push(`  ${i + 1}. ${item}`));
    }
    lines.push("");
  }

  if (strategies.length > 0) {
    lines.push("STRATEGY RECOMMENDATIONS");
    lines.push("=".repeat(50));
    lines.push("");
    for (const group of strategies) {
      lines.push(group.label);
      lines.push("-".repeat(30));
      group.strategies.forEach((s, i) => lines.push(`  ${i + 1}. ${s}`));
      lines.push("");
    }
  }

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function QuadrantInput({
  quadrant,
  items,
  onAdd,
  onRemove,
}: {
  quadrant: (typeof quadrants)[number];
  items: string[];
  onAdd: (value: string) => void;
  onRemove: (index: number) => void;
}) {
  const [value, setValue] = useState("");

  function handleAdd() {
    const trimmed = value.trim();
    if (trimmed) {
      onAdd(trimmed);
      setValue("");
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  }

  return (
    <div className={`border ${quadrant.color}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "SWOT Analysis Generator",
          description: "Use strengths to take advantage of opportunities",
          url: "https://themarkitmedia.com/en/resources/swot-analysis",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <div className={`${quadrant.headerBg} ${quadrant.headerText} px-5 py-4`}>
        <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
          {quadrant.label}
        </h2>
      </div>
      <div className="p-5 space-y-4">
        <div className="flex gap-3">
          <label htmlFor={`swot-${quadrant.key}`} className="sr-only">
            Add {quadrant.label.toLowerCase()} item
          </label>
          <textarea
            id={`swot-${quadrant.key}`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={quadrant.placeholder}
            rows={2}
            className="flex-1 px-4 py-3 border border-gray-200 text-base min-h-[44px] focus-visible:border-black focus-visible:outline-none resize-y"
          />
          <button
            onClick={handleAdd}
            type="button"
            disabled={!value.trim()}
            className="self-end px-5 min-h-[44px] text-base font-bold bg-black text-white hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>

        {items.length > 0 && (
          <ul className="space-y-2">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-base text-gray-700">
                <span className="flex-1 py-1">{item}</span>
                <button
                  onClick={() => onRemove(i)}
                  type="button"
                  aria-label={`Remove "${item}"`}
                  className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-base font-bold text-gray-400 hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        )}

        {items.length === 0 && (
          <p className="text-base text-gray-400">No items added yet.</p>
        )}
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
      aria-label="Copy analysis to clipboard"
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
    a.click();
    URL.revokeObjectURL(url);
  }, [text, filename]);

  return (
    <button
      onClick={download}
      aria-label="Download analysis as text file"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold bg-black text-white hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      Download as Text
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Results display                                                    */
/* ------------------------------------------------------------------ */

function SwotGrid({ swot, ctx }: { swot: SwotData; ctx: ContextData }) {
  return (
    <div className="border border-gray-200">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold">
          {ctx.businessName ? `${ctx.businessName} SWOT Analysis` : "SWOT Analysis"}
        </h2>
        <p className="text-base text-gray-400 mt-1">
          {ctx.industry ? `${ctx.industry} ` : ""}
          {ctx.analysisDate}
        </p>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {quadrants.map((q) => (
          <div key={q.key} className="border border-gray-200 p-6">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
              {q.label}
            </h3>
            {swot[q.key].length > 0 ? (
              <ul className="space-y-2">
                {swot[q.key].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-base text-gray-600">
                    <span className="text-black font-bold mt-0.5" aria-hidden="true">
                      &bull;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-base text-gray-400">No items listed.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StrategySection({ strategies }: { strategies: StrategyGroup[] }) {
  if (strategies.length === 0) return null;

  return (
    <div className="space-y-8 mt-10">
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
        Strategy Recommendations
      </h2>

      {strategies.map((group) => (
        <Animate key={group.abbr} animation="fade-up">
          <div className="border border-gray-200 p-6">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
              {group.label}
            </h3>
            <p className="text-base text-gray-500 mb-4">{group.description}</p>
            <ul className="space-y-3">
              {group.strategies.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-base text-gray-600">
                  <span className="font-bold text-black min-w-[24px]">{i + 1}.</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </Animate>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function SwotAnalysisPage() {
  const [swot, setSwot] = useState<SwotData>({ ...emptySwot });
  const [ctx, setCtx] = useState<ContextData>({
    businessName: "",
    industry: "",
    analysisDate: getTodayISO(),
  });
  const [generated, setGenerated] = useState<{
    swot: SwotData;
    ctx: ContextData;
    strategies: StrategyGroup[];
  } | null>(null);

  function addItem(key: QuadrantKey, value: string) {
    setSwot((prev) => ({ ...prev, [key]: [...prev[key], value] }));
  }

  function removeItem(key: QuadrantKey, index: number) {
    setSwot((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  }

  const totalItems =
    swot.strengths.length +
    swot.weaknesses.length +
    swot.opportunities.length +
    swot.threats.length;

  const canGenerate = totalItems >= 2;

  function handleGenerate() {
    if (!canGenerate) return;
    const strategies = generateStrategies(swot);
    setGenerated({ swot: { ...swot }, ctx: { ...ctx }, strategies });
  }

  function handleReset() {
    setSwot({ ...emptySwot });
    setCtx({ businessName: "", industry: "", analysisDate: getTodayISO() });
    setGenerated(null);
  }

  const plainText = generated
    ? formatSwotText(generated.swot, generated.ctx, generated.strategies)
    : "";

  const filename = generated?.ctx.businessName
    ? `${generated.ctx.businessName.toLowerCase().replace(/\s+/g, "-")}-swot-analysis.txt`
    : "swot-analysis.txt";

  return (
    <article className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "SWOT Analysis Generator",
          description:
            "Free SWOT analysis tool for marketing strategy. Add strengths, weaknesses, opportunities, and threats to generate a visual grid and actionable strategy recommendations.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "SWOT Analysis" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              SWOT Analysis Generator
            </h1>
            <SectionDesc>
              Build a structured SWOT analysis for your business or marketing
              strategy. Add items to each quadrant, generate a visual grid, and
              get actionable strategy recommendations based on your inputs.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Context Fields ---- */}
      <section aria-label="Analysis Context" className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                Analysis Context
              </h2>
              <p className="text-base text-gray-500">
                These fields are optional but help frame your analysis.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="business-name"
                    className="block text-base font-bold text-black mb-2"
                  >
                    Business Name
                  </label>
                  <input
                    id="business-name"
                    type="text"
                    value={ctx.businessName}
                    onChange={(e) =>
                      setCtx((prev) => ({
                        ...prev,
                        businessName: e.target.value,
                      }))
                    }
                    placeholder="e.g. Acme Corp"
                    className="w-full px-4 py-3 border border-gray-200 text-base min-h-[44px] focus-visible:border-black focus-visible:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="industry"
                    className="block text-base font-bold text-black mb-2"
                  >
                    Industry
                  </label>
                  <select
                    id="industry"
                    value={ctx.industry}
                    onChange={(e) =>
                      setCtx((prev) => ({ ...prev, industry: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-200 text-base bg-white text-black min-h-[44px] appearance-none focus-visible:border-black focus-visible:outline-none"
                  >
                    <option value="">Select industry...</option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="analysis-date"
                    className="block text-base font-bold text-black mb-2"
                  >
                    Analysis Date
                  </label>
                  <input
                    id="analysis-date"
                    type="date"
                    value={ctx.analysisDate}
                    onChange={(e) =>
                      setCtx((prev) => ({
                        ...prev,
                        analysisDate: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-200 text-base min-h-[44px] focus-visible:border-black focus-visible:outline-none"
                  />
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- SWOT Quadrant Inputs ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quadrants.map((q) => (
              <Animate key={q.key} animation="fade-up">
                <QuadrantInput
                  quadrant={q}
                  items={swot[q.key]}
                  onAdd={(val) => addItem(q.key, val)}
                  onRemove={(idx) => removeItem(q.key, idx)}
                />
              </Animate>
            ))}
          </div>

          {/* Generate / Reset */}
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3 mt-8">
              {canGenerate && (
                <button
                  onClick={handleGenerate}
                  className="bg-black text-white px-8 py-4 min-h-[44px] text-base font-bold hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Generate Analysis
                </button>
              )}
              {totalItems > 0 && (
                <button
                  onClick={handleReset}
                  className="px-8 py-4 min-h-[44px] text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Reset
                </button>
              )}
              {!canGenerate && (
                <p className="text-base text-gray-400 self-center">
                  Add at least 2 items across any quadrants to generate your
                  analysis.
                </p>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Generated Results ---- */}
      {generated && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-16">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <SwotGrid swot={generated.swot} ctx={generated.ctx} />
            </Animate>

            <StrategySection strategies={generated.strategies} />

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-8">
              <CopyButton text={plainText} />
              <DownloadButton text={plainText} filename={filename} />
            </div>
          </div>
        </section>
      )}

      {/* ---- Educational Section ---- */}
      <section aria-label="How to Conduct a SWOT Analysis" className="px-6 lg:px-12 py-16 border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              How to Conduct a SWOT Analysis
            </h2>
            <Stagger
              stagger={80}
              className="space-y-6 text-base text-gray-500 leading-relaxed"
            >
              <div>
                <h3 className="font-bold text-black mb-2">
                  Gather the right people
                </h3>
                <p>
                  A SWOT analysis works best as a collaborative exercise. Include
                  team members from marketing, sales, operations, and leadership.
                  Each perspective uncovers blind spots that one person alone
                  would miss.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">
                  Be specific, not generic
                </h3>
                <p>
                  &ldquo;Good team&rdquo; is too vague to be useful. &ldquo;Three
                  senior developers with React and AWS expertise&rdquo; is
                  actionable. The more specific each item is, the better your
                  strategies will be.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">
                  Separate internal from external
                </h3>
                <p>
                  Strengths and weaknesses are internal factors you can control.
                  Opportunities and threats are external factors driven by the
                  market, competitors, regulations, or technology. Mixing these
                  up leads to confusion about what you can actually change.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">
                  Use data, not just opinions
                </h3>
                <p>
                  Back up each item with evidence. Customer feedback, analytics
                  data, financial reports, and market research make your analysis
                  objective. Gut feelings are a starting point but should be
                  validated.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">
                  Connect it to action
                </h3>
                <p>
                  The most common mistake is treating SWOT as a one-time exercise
                  that sits in a drawer. The strategy matrix (SO, WO, ST, WT)
                  turns your analysis into concrete initiatives. Assign owners
                  and deadlines to each strategy.
                </p>
              </div>
            </Stagger>
          </Animate>
        </div>
      </section>

      {/* ---- Tips for Making It Actionable ---- */}
      <section aria-label="Tips for Making Your SWOT Actionable" className="px-6 lg:px-12 py-16 border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              Tips for Making Your SWOT Actionable
            </h2>
            <Stagger
              stagger={80}
              className="space-y-6 text-base text-gray-500 leading-relaxed"
            >
              <div>
                <h3 className="font-bold text-black mb-2">
                  Prioritize ruthlessly
                </h3>
                <p>
                  Not every item carries equal weight. Rank items by impact and
                  urgency. Focus your strategy on the top two or three items in
                  each quadrant rather than trying to address everything at once.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">
                  Set a review cadence
                </h3>
                <p>
                  Markets change, competitors move, and your own capabilities
                  evolve. Review and update your SWOT quarterly. An outdated SWOT
                  is worse than no SWOT because it creates false confidence.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">
                  Turn strategies into OKRs or tasks
                </h3>
                <p>
                  Each strategy recommendation should become a measurable
                  objective. &ldquo;Leverage our brand to capture the enterprise
                  market&rdquo; becomes &ldquo;Sign 5 enterprise clients in Q2
                  through targeted outreach leveraging existing case
                  studies.&rdquo;
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">
                  Share it with stakeholders
                </h3>
                <p>
                  Use the download and copy features to distribute your analysis
                  across the team. A SWOT that lives only in one person&apos;s
                  head cannot drive organizational alignment.
                </p>
              </div>
            </Stagger>
          </Animate>
        </div>
      </section>

      {/* ---- Common Mistakes ---- */}
      <section aria-label="Common Mistakes to Avoid" className="px-6 lg:px-12 py-16 border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              Common Mistakes to Avoid
            </h2>
            <Stagger
              stagger={80}
              className="space-y-6 text-base text-gray-500 leading-relaxed"
            >
              <div>
                <h3 className="font-bold text-black mb-2">
                  Listing too many items
                </h3>
                <p>
                  A SWOT with 20 items per quadrant is a brainstorming dump, not
                  a strategic tool. Aim for three to seven items per quadrant,
                  each specific enough to act on.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">
                  Confusing strengths with opportunities
                </h3>
                <p>
                  &ldquo;Growing market&rdquo; is an opportunity, not a strength.
                  &ldquo;Our market share is growing&rdquo; is a strength. The
                  distinction matters because it determines whether you are
                  describing something you control or something external.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">
                  Being too optimistic
                </h3>
                <p>
                  The weaknesses and threats sections should make you
                  uncomfortable. If they do not, you are not being honest enough.
                  The value of SWOT is in surfacing difficult truths, not
                  confirming what you already believe.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">
                  Doing it alone
                </h3>
                <p>
                  A single-person SWOT reflects one perspective. Involve at least
                  three to five people from different functions. Cross-functional
                  input catches blind spots and builds buy-in for the resulting
                  strategies.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">
                  Never revisiting it
                </h3>
                <p>
                  A SWOT is a snapshot in time. The competitive landscape, your
                  team, and market conditions all change. Schedule quarterly
                  reviews to keep your analysis current and your strategies
                  relevant.
                </p>
              </div>
            </Stagger>
          </Animate>
        </div>
      </section>

      {/* ---- Bottom CTA ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Turn Analysis Into Growth
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              A clear SWOT analysis is the starting point. Let our team build a
              marketing strategy that leverages your strengths, addresses
              weaknesses, and captures the opportunities that matter most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services/digital-marketing"
                className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Our Marketing Services &rarr;
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 border border-white text-white px-10 py-5 min-h-[44px] font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Get in Touch &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Swot Analysis"
        services={[
          { title: "Digital Marketing", desc: "Competitive intelligence turned into actionable growth strategy.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Outrank competitors with data-backed SEO strategies.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Win market share with smarter paid media campaigns.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Social Proof Guide", href: "/resources/social-proof-guide" },
          { title: "Speed Test", href: "/resources/speed-test" },
          { title: "Sprint Planner", href: "/resources/sprint-planner" },
          { title: "Stakeholder Report", href: "/resources/stakeholder-report" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
