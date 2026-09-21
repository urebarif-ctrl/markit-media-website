"use client";

import { useState, useMemo, useCallback, useId } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fmt(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function fmtMoney(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtPct(n: number) {
  return n.toFixed(1) + "%";
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Stage {
  id: string;
  name: string;
  rate: number; // conversion rate to NEXT stage (percentage 0-100)
}

interface Scenario {
  label: string;
  visitors: number;
  aov: number;
  adSpend: number;
  stages: Stage[];
}

/* ------------------------------------------------------------------ */
/*  Industry Benchmark Presets                                         */
/* ------------------------------------------------------------------ */

const PRESETS: Record<string, { visitors: number; aov: number; stages: Stage[] }> = {
  "B2B SaaS": {
    visitors: 25000,
    aov: 6000,
    stages: [
      { id: uid(), name: "Visitors", rate: 3 },
      { id: uid(), name: "Leads", rate: 35 },
      { id: uid(), name: "MQLs", rate: 45 },
      { id: uid(), name: "SQLs", rate: 55 },
      { id: uid(), name: "Opportunities", rate: 22 },
      { id: uid(), name: "Customers", rate: 100 },
    ],
  },
  "E-Commerce": {
    visitors: 100000,
    aov: 85,
    stages: [
      { id: uid(), name: "Visitors", rate: 5 },
      { id: uid(), name: "Product Views", rate: 45 },
      { id: uid(), name: "Add to Cart", rate: 35 },
      { id: uid(), name: "Checkout Start", rate: 55 },
      { id: uid(), name: "Purchases", rate: 100 },
    ],
  },
  "Professional Services": {
    visitors: 8000,
    aov: 15000,
    stages: [
      { id: uid(), name: "Visitors", rate: 4 },
      { id: uid(), name: "Leads", rate: 40 },
      { id: uid(), name: "MQLs", rate: 50 },
      { id: uid(), name: "SQLs", rate: 60 },
      { id: uid(), name: "Opportunities", rate: 30 },
      { id: uid(), name: "Customers", rate: 100 },
    ],
  },
  Healthcare: {
    visitors: 15000,
    aov: 3500,
    stages: [
      { id: uid(), name: "Visitors", rate: 3.5 },
      { id: uid(), name: "Leads", rate: 30 },
      { id: uid(), name: "MQLs", rate: 40 },
      { id: uid(), name: "SQLs", rate: 50 },
      { id: uid(), name: "Opportunities", rate: 25 },
      { id: uid(), name: "Customers", rate: 100 },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Default stages                                                     */
/* ------------------------------------------------------------------ */

function defaultStages(): Stage[] {
  return [
    { id: uid(), name: "Visitors", rate: 3 },
    { id: uid(), name: "Leads", rate: 35 },
    { id: uid(), name: "MQLs", rate: 45 },
    { id: uid(), name: "SQLs", rate: 55 },
    { id: uid(), name: "Opportunities", rate: 25 },
    { id: uid(), name: "Customers", rate: 100 },
  ];
}

/* ------------------------------------------------------------------ */
/*  Computation helpers                                                */
/* ------------------------------------------------------------------ */

function computeFunnel(visitors: number, stages: Stage[]) {
  const rows: { id: string; name: string; volume: number; rateToNext: number; widthPct: number }[] = [];
  let current = visitors;

  for (let i = 0; i < stages.length; i++) {
    const s = stages[i];
    rows.push({
      id: s.id,
      name: s.name,
      volume: Math.round(current),
      rateToNext: s.rate,
      widthPct: visitors > 0 ? Math.max((current / visitors) * 100, 3) : 3,
    });
    if (i < stages.length - 1) {
      current = current * (s.rate / 100);
    }
  }
  return rows;
}

function totalConversionRate(stages: Stage[]) {
  let rate = 1;
  for (let i = 0; i < stages.length - 1; i++) {
    rate *= stages[i].rate / 100;
  }
  return rate * 100;
}

function findBottleneck(stages: Stage[]) {
  let minRate = Infinity;
  let idx = -1;
  for (let i = 0; i < stages.length - 1; i++) {
    if (stages[i].rate < minRate) {
      minRate = stages[i].rate;
      idx = i;
    }
  }
  return idx;
}

/* ------------------------------------------------------------------ */
/*  Export helper                                                       */
/* ------------------------------------------------------------------ */

function buildExportText(
  visitors: number,
  aov: number,
  adSpend: number,
  stages: Stage[],
  funnel: ReturnType<typeof computeFunnel>,
  savedScenario: Scenario | null,
) {
  const lines: string[] = [];
  lines.push("CONVERSION FUNNEL SIMULATOR — REPORT");
  lines.push("Generated by Markit Media (themarkitmedia.com)");
  lines.push("Date: " + new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }));
  lines.push("");
  lines.push("=== FUNNEL STAGES ===");
  for (let i = 0; i < funnel.length; i++) {
    const row = funnel[i];
    const rateStr = i < funnel.length - 1 ? `  →  ${fmtPct(row.rateToNext)} conv. rate to next` : "";
    lines.push(`  ${row.name}: ${fmt(row.volume)}${rateStr}`);
  }
  lines.push("");
  lines.push("=== SUMMARY ===");
  const customers = funnel[funnel.length - 1].volume;
  lines.push(`  Monthly Visitors: ${fmt(visitors)}`);
  lines.push(`  Customers: ${fmt(customers)}`);
  lines.push(`  Total Conversion Rate: ${fmtPct(totalConversionRate(stages))}`);
  lines.push(`  Average Order Value: ${fmtMoney(aov)}`);
  lines.push(`  Monthly Revenue: ${fmtMoney(customers * aov)}`);
  lines.push(`  Annual Revenue: ${fmtMoney(customers * aov * 12)}`);
  if (adSpend > 0) {
    const cpc = customers > 0 ? adSpend / customers : 0;
    lines.push(`  Monthly Ad Spend: ${fmtMoney(adSpend)}`);
    lines.push(`  Cost per Customer: ${fmtMoney(cpc)}`);
    const ltv = aov * 12;
    lines.push(`  CAC:LTV Ratio: 1:${ltv > 0 && cpc > 0 ? (ltv / cpc).toFixed(1) : "N/A"}`);
  }
  const bnIdx = findBottleneck(stages);
  if (bnIdx >= 0) {
    lines.push("");
    lines.push(`  Bottleneck: ${stages[bnIdx].name} → ${stages[bnIdx + 1]?.name ?? "next"} (${fmtPct(stages[bnIdx].rate)})`);
  }

  if (savedScenario) {
    lines.push("");
    lines.push("=== SAVED SCENARIO: " + savedScenario.label + " ===");
    const savedFunnel = computeFunnel(savedScenario.visitors, savedScenario.stages);
    for (let i = 0; i < savedFunnel.length; i++) {
      const row = savedFunnel[i];
      const rateStr = i < savedFunnel.length - 1 ? `  →  ${fmtPct(row.rateToNext)}` : "";
      lines.push(`  ${row.name}: ${fmt(row.volume)}${rateStr}`);
    }
    const sc = savedFunnel[savedFunnel.length - 1].volume;
    lines.push(`  Revenue: ${fmtMoney(sc * savedScenario.aov)}/mo`);
  }

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function ConversionFunnelSimulatorPage() {
  /* ---- primary state ---- */
  const [visitors, setVisitors] = useState(10000);
  const [aov, setAov] = useState(5000);
  const [adSpend, setAdSpend] = useState(0);
  const [stages, setStages] = useState<Stage[]>(defaultStages);

  /* ---- what-if ---- */
  const [whatIfStageIdx, setWhatIfStageIdx] = useState(0);
  const [whatIfBoost, setWhatIfBoost] = useState(20);

  /* ---- saved scenario ---- */
  const [savedScenario, setSavedScenario] = useState<Scenario | null>(null);

  /* ---- unique ids for accessibility ---- */
  const formId = useId();

  /* ---- derived data ---- */
  const funnel = useMemo(() => computeFunnel(visitors, stages), [visitors, stages]);
  const customers = funnel[funnel.length - 1].volume;
  const monthlyRevenue = customers * aov;
  const annualRevenue = monthlyRevenue * 12;
  const totalRate = useMemo(() => totalConversionRate(stages), [stages]);
  const bottleneckIdx = useMemo(() => findBottleneck(stages), [stages]);
  const costPerCustomer = adSpend > 0 && customers > 0 ? adSpend / customers : 0;
  const ltv = aov * 12;
  const cacLtv = costPerCustomer > 0 ? ltv / costPerCustomer : 0;

  /* ---- what-if projected funnel ---- */
  const whatIfFunnel = useMemo(() => {
    if (whatIfStageIdx >= stages.length - 1) return null;
    const boosted = stages.map((s, i) => {
      if (i !== whatIfStageIdx) return s;
      return { ...s, rate: Math.min(s.rate * (1 + whatIfBoost / 100), 100) };
    });
    return computeFunnel(visitors, boosted);
  }, [visitors, stages, whatIfStageIdx, whatIfBoost]);

  const whatIfCustomers = whatIfFunnel ? whatIfFunnel[whatIfFunnel.length - 1].volume : customers;
  const whatIfRevenue = whatIfCustomers * aov;
  const whatIfDelta = whatIfRevenue - monthlyRevenue;

  /* ---- saved scenario derived ---- */
  const savedFunnel = useMemo(
    () => (savedScenario ? computeFunnel(savedScenario.visitors, savedScenario.stages) : null),
    [savedScenario],
  );
  const savedCustomers = savedFunnel ? savedFunnel[savedFunnel.length - 1].volume : 0;
  const savedRevenue = savedScenario ? savedCustomers * savedScenario.aov : 0;

  /* ---- stage mutations ---- */
  const updateStageName = useCallback((id: string, name: string) => {
    setStages((prev) => prev.map((s) => (s.id === id ? { ...s, name } : s)));
  }, []);

  const updateStageRate = useCallback((id: string, rate: number) => {
    setStages((prev) => prev.map((s) => (s.id === id ? { ...s, rate: Math.max(0.1, Math.min(100, rate)) } : s)));
  }, []);

  const addStage = useCallback(() => {
    setStages((prev) => {
      const newStage: Stage = { id: uid(), name: "New Stage", rate: 100 };
      // insert before the last stage
      const copy = [...prev];
      copy.splice(copy.length - 1, 0, { ...copy[copy.length - 2], rate: 50, id: uid(), name: "New Stage" });
      return copy;
    });
  }, []);

  const removeStage = useCallback((id: string) => {
    setStages((prev) => {
      if (prev.length <= 2) return prev; // minimum 2 stages
      return prev.filter((s) => s.id !== id);
    });
  }, []);

  /* ---- preset loader ---- */
  const loadPreset = useCallback((key: string) => {
    const p = PRESETS[key];
    if (!p) return;
    setVisitors(p.visitors);
    setAov(p.aov);
    setStages(p.stages.map((s) => ({ ...s, id: uid() })));
    setWhatIfStageIdx(0);
  }, []);

  /* ---- scenario save ---- */
  const saveScenario = useCallback(() => {
    setSavedScenario({
      label: "Scenario A",
      visitors,
      aov,
      adSpend,
      stages: stages.map((s) => ({ ...s })),
    });
  }, [visitors, aov, adSpend, stages]);

  /* ---- export ---- */
  const exportTxt = useCallback(() => {
    const text = buildExportText(visitors, aov, adSpend, stages, funnel, savedScenario);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "funnel-simulation.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [visitors, aov, adSpend, stages, funnel, savedScenario]);

  /* ---- JSON-LD schema ---- */
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Conversion Funnel Simulator",
    description:
      "Simulate your marketing funnel with custom stages, conversion rates, and revenue projections. Identify bottlenecks and optimisation opportunities.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
  };

  return (
    <article className="min-h-screen">
      <JsonLd data={schema} />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Conversion Funnel Simulator" },
        ]}
      />

      {/* ===================== HERO ===================== */}
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Conversion Funnel Simulator
            </h1>
            <SectionDesc>
              Build a custom funnel, tweak conversion rates at every stage, and see exactly how changes
              affect your revenue. Compare scenarios, detect bottlenecks, and export your findings.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ===================== INDUSTRY PRESETS ===================== */}
      <section className="px-6 lg:px-12 pb-12">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
              Industry Presets
            </h2>
            <p className="text-base text-gray-500 mb-6">
              Start with typical conversion rates for your industry, or build your own funnel from scratch.
            </p>
            <div className="flex flex-wrap gap-3">
              {Object.keys(PRESETS).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => loadPreset(key)}
                  className="px-6 py-3 border-2 border-black text-base font-bold text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
                >
                  {key}
                </button>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* ===================== TOP-OF-FUNNEL INPUTS ===================== */}
      <section className="px-6 lg:px-12 pb-16">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-8">
              Top-of-Funnel Inputs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-200">
              <div>
                <label htmlFor={`${formId}-visitors`} className="block text-base font-bold text-black mb-1">
                  Monthly Visitors
                </label>
                <p className="text-base text-gray-500 mb-3">
                  Total unique visitors entering your funnel each month.
                </p>
                <input
                  id={`${formId}-visitors`}
                  type="number"
                  min={0}
                  step={100}
                  value={visitors}
                  onChange={(e) => setVisitors(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus:border-black transition-colors motion-reduce:transition-none"
                />
              </div>
              <div>
                <label htmlFor={`${formId}-aov`} className="block text-base font-bold text-black mb-1">
                  Average Order Value ($)
                </label>
                <p className="text-base text-gray-500 mb-3">
                  Revenue you earn per customer conversion.
                </p>
                <input
                  id={`${formId}-aov`}
                  type="number"
                  min={0}
                  step={100}
                  value={aov}
                  onChange={(e) => setAov(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus:border-black transition-colors motion-reduce:transition-none"
                />
              </div>
              <div>
                <label htmlFor={`${formId}-adspend`} className="block text-base font-bold text-black mb-1">
                  Monthly Ad Spend ($)
                </label>
                <p className="text-base text-gray-500 mb-3">
                  Optional. Used to calculate cost per customer and CAC:LTV.
                </p>
                <input
                  id={`${formId}-adspend`}
                  type="number"
                  min={0}
                  step={100}
                  value={adSpend}
                  onChange={(e) => setAdSpend(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus:border-black transition-colors motion-reduce:transition-none"
                />
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ===================== FUNNEL STAGES CONFIG ===================== */}
      <section className="px-6 lg:px-12 pb-16">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                Funnel Stages
              </h2>
              <button
                type="button"
                onClick={addStage}
                className="px-5 py-3 border-2 border-black text-base font-bold text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
              >
                + Add Stage
              </button>
            </div>

            <div className="space-y-6">
              {stages.map((stage, idx) => {
                const isLast = idx === stages.length - 1;
                const isBottleneck = idx === bottleneckIdx;
                return (
                  <div
                    key={stage.id}
                    className={`p-6 border-2 ${isBottleneck ? "border-black bg-gray-50" : "border-gray-200"}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-end gap-4">
                      {/* Stage name */}
                      <div className="flex-1">
                        <label
                          htmlFor={`${formId}-name-${stage.id}`}
                          className="block text-base font-bold text-black mb-1"
                        >
                          Stage {idx + 1} Name
                          {isBottleneck && (
                            <span className="ml-2 text-base font-extrabold text-black">
                              — Bottleneck
                            </span>
                          )}
                        </label>
                        <input
                          id={`${formId}-name-${stage.id}`}
                          type="text"
                          value={stage.name}
                          onChange={(e) => updateStageName(stage.id, e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus:border-black transition-colors motion-reduce:transition-none"
                        />
                      </div>

                      {/* Volume (read-only, auto-calculated) */}
                      <div className="w-full md:w-40">
                        <label
                          htmlFor={`${formId}-vol-${stage.id}`}
                          className="block text-base font-bold text-black mb-1"
                        >
                          Volume
                        </label>
                        <input
                          id={`${formId}-vol-${stage.id}`}
                          type="text"
                          readOnly
                          value={fmt(funnel[idx]?.volume ?? 0)}
                          className="w-full px-4 py-3 border-2 border-gray-100 bg-gray-50 text-base text-black"
                          tabIndex={-1}
                        />
                      </div>

                      {/* Conversion rate to next stage */}
                      {!isLast && (
                        <div className="w-full md:w-64">
                          <label
                            htmlFor={`${formId}-rate-${stage.id}`}
                            className="block text-base font-bold text-black mb-1"
                          >
                            Conv. Rate to Next (%)
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              id={`${formId}-rate-${stage.id}`}
                              type="range"
                              min={0.1}
                              max={100}
                              step={0.1}
                              value={stage.rate}
                              onChange={(e) => updateStageRate(stage.id, Number(e.target.value))}
                              className="flex-1 accent-black h-2 min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                            />
                            <input
                              type="number"
                              min={0.1}
                              max={100}
                              step={0.1}
                              value={stage.rate}
                              onChange={(e) => updateStageRate(stage.id, Number(e.target.value))}
                              aria-label={`${stage.name} conversion rate value`}
                              className="w-20 px-3 py-3 border-2 border-gray-200 text-base text-black text-center focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus:border-black transition-colors motion-reduce:transition-none"
                            />
                          </div>
                        </div>
                      )}

                      {/* Remove button */}
                      {stages.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeStage(stage.id)}
                          aria-label={`Remove ${stage.name} stage`}
                          className="px-4 py-3 border-2 border-gray-200 text-base font-bold text-gray-500 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Animate>
        </div>
      </section>

      {/* ===================== VISUAL FUNNEL ===================== */}
      <section className="px-6 lg:px-12 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-8">
              Your Funnel
            </h2>

            <div className="space-y-0">
              {funnel.map((row, idx) => {
                const isBottleneck = idx === bottleneckIdx;
                const nextRow = funnel[idx + 1];
                const topWidth = row.widthPct;
                const bottomWidth = nextRow ? nextRow.widthPct : topWidth;

                return (
                  <div key={row.id}>
                    {/* Trapezoid stage */}
                    <div className="flex items-center gap-4">
                      <div className="w-36 lg:w-48 shrink-0 text-right">
                        <span className={`text-base ${isBottleneck ? "font-extrabold" : "font-bold"} text-black`}>
                          {row.name}
                        </span>
                      </div>
                      <div className="flex-1 flex justify-center">
                        <svg
                          viewBox="0 0 400 48"
                          className="w-full max-w-lg"
                          role="img"
                          aria-label={`${row.name}: ${fmt(row.volume)}${idx < funnel.length - 1 ? `, ${fmtPct(row.rateToNext)} conversion rate` : ""}`}
                        >
                          {/* Trapezoid shape */}
                          <polygon
                            points={`${200 - topWidth * 2},0 ${200 + topWidth * 2},0 ${200 + bottomWidth * 2},48 ${200 - bottomWidth * 2},48`}
                            fill={isBottleneck ? "#000" : "#000"}
                            opacity={isBottleneck ? 1 : 0.85 - idx * 0.05}
                          />
                          {/* Volume text */}
                          <text
                            x="200"
                            y="28"
                            textAnchor="middle"
                            fill="#fff"
                            fontSize="16"
                            fontWeight="bold"
                          >
                            {fmt(row.volume)}
                          </text>
                        </svg>
                      </div>
                      <div className="w-20 shrink-0 text-base text-gray-500">
                        {idx < funnel.length - 1 ? fmtPct(row.rateToNext) : ""}
                      </div>
                    </div>

                    {/* Arrow / drop indicator between stages */}
                    {idx < funnel.length - 1 && (
                      <div className="flex items-center gap-4 py-1">
                        <div className="w-36 lg:w-48 shrink-0" />
                        <div className="flex-1 flex justify-center">
                          <span className="text-base text-gray-400">
                            {fmtPct(100 - row.rateToNext)} drop-off
                          </span>
                        </div>
                        <div className="w-20 shrink-0" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Animate>
        </div>
      </section>

      {/* ===================== REVENUE & SUMMARY STATS ===================== */}
      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-8">
              Revenue Projection &amp; Summary
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <div className="p-6 border-2 border-black">
                <div className="text-base text-gray-500 mb-2">Monthly Revenue</div>
                <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  {fmtMoney(monthlyRevenue)}
                </div>
              </div>
              <div className="p-6 border-2 border-black">
                <div className="text-base text-gray-500 mb-2">Annual Revenue</div>
                <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  {fmtMoney(annualRevenue)}
                </div>
              </div>
              <div className="p-6 border-2 border-black">
                <div className="text-base text-gray-500 mb-2">Customers / Month</div>
                <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  {fmt(customers)}
                </div>
              </div>
              <div className="p-6 border-2 border-black">
                <div className="text-base text-gray-500 mb-2">Total Conversion Rate</div>
                <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  {fmtPct(totalRate)}
                </div>
              </div>
              <div className="p-6 border-2 border-black">
                <div className="text-base text-gray-500 mb-2">
                  {adSpend > 0 ? "Cost per Customer" : "Cost per Customer (enter ad spend)"}
                </div>
                <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  {adSpend > 0 && customers > 0 ? fmtMoney(costPerCustomer) : "---"}
                </div>
              </div>
              <div className="p-6 border-2 border-black">
                <div className="text-base text-gray-500 mb-2">
                  {adSpend > 0 ? "CAC:LTV Ratio" : "CAC:LTV (enter ad spend)"}
                </div>
                <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  {adSpend > 0 && customers > 0 ? `1:${cacLtv.toFixed(1)}` : "---"}
                </div>
              </div>
            </div>

            {/* Bottleneck callout */}
            {bottleneckIdx >= 0 && bottleneckIdx < stages.length - 1 && (
              <div className="p-6 border-l-4 border-black bg-gray-50 mb-4">
                <p className="text-base text-black font-extrabold mb-1">
                  Bottleneck Detected: {stages[bottleneckIdx].name} → {stages[bottleneckIdx + 1]?.name}
                </p>
                <p className="text-base text-gray-600">
                  At {fmtPct(stages[bottleneckIdx].rate)}, this is the lowest conversion rate in your funnel.
                  Improving this stage will have the largest impact on your bottom line.
                </p>
              </div>
            )}
          </Animate>
        </div>
      </section>

      {/* ===================== WHAT-IF SIMULATOR ===================== */}
      <section className="px-6 lg:px-12 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
              What-If Simulator
            </h2>
            <p className="text-base text-gray-500 mb-8">
              Select a stage and see the revenue impact of improving its conversion rate.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor={`${formId}-whatif-stage`} className="block text-base font-bold text-black mb-1">
                  Stage to Improve
                </label>
                <select
                  id={`${formId}-whatif-stage`}
                  value={whatIfStageIdx}
                  onChange={(e) => setWhatIfStageIdx(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus:border-black transition-colors motion-reduce:transition-none min-h-[44px]"
                >
                  {stages.slice(0, -1).map((s, i) => (
                    <option key={s.id} value={i}>
                      {s.name} (currently {fmtPct(s.rate)})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={`${formId}-whatif-boost`} className="block text-base font-bold text-black mb-1">
                  Increase Conversion Rate By
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id={`${formId}-whatif-boost`}
                    type="range"
                    min={1}
                    max={100}
                    step={1}
                    value={whatIfBoost}
                    onChange={(e) => setWhatIfBoost(Number(e.target.value))}
                    className="flex-1 accent-black h-2 min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  />
                  <span className="text-base font-bold text-black w-16 text-center">+{whatIfBoost}%</span>
                </div>
              </div>
            </div>

            {/* What-if results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 border-2 border-black">
                <div className="text-base text-gray-500 mb-2">Current Rate</div>
                <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  {fmtPct(stages[whatIfStageIdx]?.rate ?? 0)}
                </div>
              </div>
              <div className="p-6 border-2 border-black">
                <div className="text-base text-gray-500 mb-2">Projected Rate</div>
                <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  {fmtPct(Math.min((stages[whatIfStageIdx]?.rate ?? 0) * (1 + whatIfBoost / 100), 100))}
                </div>
              </div>
              <div className="p-6 border-2 border-black bg-black text-white">
                <div className="text-base text-gray-300 mb-2">Revenue Impact / Month</div>
                <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-white">
                  {whatIfDelta >= 0 ? "+" : ""}{fmtMoney(whatIfDelta)}
                </div>
                <div className="text-base text-gray-400 mt-1">
                  {whatIfCustomers} customers ({whatIfCustomers - customers >= 0 ? "+" : ""}
                  {whatIfCustomers - customers})
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ===================== SCENARIO COMPARISON ===================== */}
      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                Scenario Comparison
              </h2>
              <button
                type="button"
                onClick={saveScenario}
                className="px-6 py-3 bg-black text-white text-base font-bold hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
              >
                Save Current as Scenario A
              </button>
            </div>

            {savedScenario ? (
              <div className="overflow-x-auto">
                <table className="w-full text-base">
                  <thead>
                    <tr className="border-b-2 border-black">
                      <th className="text-left py-3 pr-4 font-bold text-black">Metric</th>
                      <th className="text-right py-3 px-4 font-bold text-black">
                        Scenario A (Saved)
                      </th>
                      <th className="text-right py-3 pl-4 font-bold text-black">
                        Current Funnel
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4 font-bold text-black">Visitors</td>
                      <td className="py-3 px-4 text-right text-gray-600">{fmt(savedScenario.visitors)}</td>
                      <td className="py-3 pl-4 text-right text-gray-600">{fmt(visitors)}</td>
                    </tr>
                    {(() => {
                      const maxLen = Math.max(savedScenario.stages.length, stages.length);
                      const rows: React.ReactNode[] = [];
                      for (let i = 0; i < maxLen; i++) {
                        const sA = savedScenario.stages[i];
                        const sB = stages[i];
                        const savedRow = savedFunnel?.[i];
                        const currentRow = funnel[i];
                        rows.push(
                          <tr key={`stage-${i}`} className="border-b border-gray-200">
                            <td className="py-3 pr-4 text-black">
                              {sA?.name ?? sB?.name ?? `Stage ${i + 1}`}
                              {i < (savedScenario.stages.length - 1) && sA ? ` (${fmtPct(sA.rate)})` : ""}
                            </td>
                            <td className="py-3 px-4 text-right text-gray-600">
                              {savedRow ? fmt(savedRow.volume) : "---"}
                            </td>
                            <td className="py-3 pl-4 text-right text-gray-600">
                              {currentRow ? fmt(currentRow.volume) : "---"}
                            </td>
                          </tr>,
                        );
                      }
                      return rows;
                    })()}
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4 font-bold text-black">Customers</td>
                      <td className="py-3 px-4 text-right font-bold text-black">{fmt(savedCustomers)}</td>
                      <td className="py-3 pl-4 text-right font-bold text-black">{fmt(customers)}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4 font-bold text-black">Monthly Revenue</td>
                      <td className="py-3 px-4 text-right font-bold text-black">{fmtMoney(savedRevenue)}</td>
                      <td className="py-3 pl-4 text-right font-bold text-black">{fmtMoney(monthlyRevenue)}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4 font-bold text-black">Annual Revenue</td>
                      <td className="py-3 px-4 text-right font-bold text-black">{fmtMoney(savedRevenue * 12)}</td>
                      <td className="py-3 pl-4 text-right font-bold text-black">{fmtMoney(annualRevenue)}</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-bold text-black">Difference</td>
                      <td colSpan={2} className="py-3 pl-4 text-right font-extrabold text-black">
                        {monthlyRevenue - savedRevenue >= 0 ? "+" : ""}
                        {fmtMoney(monthlyRevenue - savedRevenue)}/mo vs Scenario A
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 border-2 border-dashed border-gray-300 text-center">
                <p className="text-base text-gray-500">
                  Save your current funnel as Scenario A, then adjust your stages or rates and compare the two
                  side by side.
                </p>
              </div>
            )}
          </Animate>
        </div>
      </section>

      {/* ===================== EXPORT ===================== */}
      <section className="px-6 lg:px-12 py-12">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                type="button"
                onClick={exportTxt}
                className="px-8 py-4 border-2 border-black text-base font-bold text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
              >
                Export as .txt
              </button>
              <p className="text-base text-gray-500">
                Download a plain-text report of your funnel, revenue projections, and scenario comparison.
              </p>
            </div>
          </Animate>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white">
        <div className="max-w-3xl mx-auto text-center">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Fix Your Funnel?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-10 leading-relaxed">
              We help businesses identify their biggest conversion bottlenecks and implement data-driven
              strategies that move the needle at every stage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
              >
                Get a Free Funnel Audit &rarr;
              </Link>
              <Link
                href="/services/digital-marketing"
                className="inline-flex items-center justify-center gap-3 border-2 border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
              >
                Our Marketing Services
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    </article>
  );
}
