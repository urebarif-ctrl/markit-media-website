"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Channel {
  id: string;
  name: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
}

interface Attribution {
  channelId: string;
  channelName: string;
  credit: number; // 0-1 fraction of total credit
  roi: number;
}

type ModelKey = "lastTouch" | "firstTouch" | "linear" | "timeDecay";

interface ScenarioInput {
  channelId: string;
  increasePercent: number;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const MODEL_LABELS: Record<ModelKey, string> = {
  lastTouch: "Last Touch",
  firstTouch: "First Touch",
  linear: "Linear",
  timeDecay: "Time Decay",
};

const MODEL_KEYS: ModelKey[] = ["lastTouch", "firstTouch", "linear", "timeDecay"];

const GRAY_SHADES = [
  "#000000",
  "#262626",
  "#404040",
  "#595959",
  "#737373",
  "#8c8c8c",
  "#a6a6a6",
  "#bfbfbf",
  "#d9d9d9",
  "#f0f0f0",
];

const STORAGE_KEY = "markit-attribution-calculator";

const DEFAULT_CHANNELS: Channel[] = [
  { id: "1", name: "Google Ads", impressions: 50000, clicks: 2500, conversions: 75, spend: 5000 },
  { id: "2", name: "Meta Ads", impressions: 80000, clicks: 3200, conversions: 48, spend: 3500 },
  { id: "3", name: "Email Marketing", impressions: 15000, clicks: 4500, conversions: 120, spend: 800 },
  { id: "4", name: "SEO / Organic", impressions: 100000, clicks: 8000, conversions: 200, spend: 2000 },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

let idCounter = 100;
function nextId(): string {
  idCounter += 1;
  return String(idCounter);
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const fmtDec = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);

const fmtNum = (n: number) => new Intl.NumberFormat("en-US").format(n);

const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

const focusClasses = "focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";

/* ------------------------------------------------------------------ */
/*  Attribution Model Logic                                            */
/* ------------------------------------------------------------------ */

function computeAttribution(channels: Channel[], model: ModelKey): Attribution[] {
  if (channels.length === 0) return [];

  const totalConversions = channels.reduce((s, c) => s + c.conversions, 0);
  if (totalConversions === 0) {
    return channels.map((c) => ({ channelId: c.id, channelName: c.name, credit: 0, roi: 0 }));
  }

  let credits: number[];

  switch (model) {
    case "lastTouch": {
      // Last Touch: All credit goes to the channel with the most conversions
      // In a real multi-touch system, last touch = last touchpoint before conversion.
      // Here we simulate: credit proportional to conversions weighted by recency (clicks).
      const weights = channels.map((c) => c.conversions * (c.clicks > 0 ? 1 + c.clicks / 10000 : 1));
      const totalW = weights.reduce((s, w) => s + w, 0);
      credits = totalW > 0 ? weights.map((w) => w / totalW) : channels.map(() => 1 / channels.length);
      break;
    }
    case "firstTouch": {
      // First Touch: Credit weighted toward awareness (impressions) that drove conversions.
      const weights = channels.map((c) => c.conversions * (c.impressions > 0 ? 1 + c.impressions / 100000 : 1));
      const totalW = weights.reduce((s, w) => s + w, 0);
      credits = totalW > 0 ? weights.map((w) => w / totalW) : channels.map(() => 1 / channels.length);
      break;
    }
    case "linear": {
      // Linear: Each channel gets credit proportional to its conversions equally.
      credits = channels.map((c) => c.conversions / totalConversions);
      break;
    }
    case "timeDecay": {
      // Time Decay: Later touchpoints get more credit. We use position-based decay.
      // Channels listed later in the funnel get exponentially more weight.
      const decayFactor = 0.7;
      const weights = channels.map((c, i) => {
        const positionWeight = Math.pow(decayFactor, channels.length - 1 - i);
        return c.conversions * positionWeight;
      });
      const totalW = weights.reduce((s, w) => s + w, 0);
      credits = totalW > 0 ? weights.map((w) => w / totalW) : channels.map(() => 1 / channels.length);
      break;
    }
  }

  return channels.map((c, i) => {
    const creditedConversions = credits[i] * totalConversions;
    const revenue = creditedConversions * (c.clicks > 0 ? c.spend / c.clicks : 0) * 10; // estimated revenue proxy
    const roi = c.spend > 0 ? ((creditedConversions * (c.spend / Math.max(c.conversions, 1)) * 5 - c.spend) / c.spend) * 100 : 0;
    return { channelId: c.id, channelName: c.name, credit: credits[i], roi };
  });
}

function getBestChannel(attributions: Attribution[]): Attribution | null {
  if (attributions.length === 0) return null;
  return attributions.reduce((best, a) => (a.credit > best.credit ? a : best), attributions[0]);
}

/* ------------------------------------------------------------------ */
/*  SVG Stacked Bar Chart                                              */
/* ------------------------------------------------------------------ */

function StackedBarChart({ channels, allAttributions }: {
  channels: Channel[];
  allAttributions: Record<ModelKey, Attribution[]>;
}) {
  const barHeight = 48;
  const labelWidth = 140;
  const legendHeight = 80;
  const gap = 16;
  const chartWidth = 700;
  const chartAreaWidth = chartWidth - labelWidth - 20;
  const totalHeight = MODEL_KEYS.length * (barHeight + gap) + legendHeight + 20;

  return (
    <svg
      viewBox={`0 0 ${chartWidth} ${totalHeight}`}
      width="100%"
      role="img"
      aria-label="Stacked bar chart comparing attribution credit across models"
      className="block max-w-full"
    >
      {MODEL_KEYS.map((model, mi) => {
        const y = mi * (barHeight + gap) + 10;
        const attributions = allAttributions[model];
        let xOffset = 0;

        return (
          <g key={model}>
            <text
              x={0}
              y={y + barHeight / 2 + 5}
              fill="#000"
              fontSize={16}
              fontWeight={700}
            >
              {MODEL_LABELS[model]}
            </text>
            {attributions.map((a, ci) => {
              const w = a.credit * chartAreaWidth;
              const x = labelWidth + xOffset;
              xOffset += w;
              return (
                <g key={a.channelId}>
                  <rect
                    x={x}
                    y={y}
                    width={Math.max(w, 0)}
                    height={barHeight}
                    fill={GRAY_SHADES[ci % GRAY_SHADES.length]}
                    rx={2}
                  />
                  {w > 40 && (
                    <text
                      x={x + w / 2}
                      y={y + barHeight / 2 + 5}
                      textAnchor="middle"
                      fill={ci < 4 ? "#fff" : "#000"}
                      fontSize={16}
                      fontWeight={600}
                    >
                      {pct(a.credit)}
                    </text>
                  )}
                </g>
              );
            })}
            <rect
              x={labelWidth}
              y={y}
              width={chartAreaWidth}
              height={barHeight}
              fill="none"
              stroke="#d4d4d4"
              strokeWidth={1}
              rx={2}
            />
          </g>
        );
      })}

      {/* Legend */}
      <g transform={`translate(${labelWidth}, ${MODEL_KEYS.length * (barHeight + gap) + 20})`}>
        {channels.map((c, i) => {
          const col = Math.floor(i / 2);
          const row = i % 2;
          const x = col * 180;
          const y = row * 28;
          return (
            <g key={c.id} transform={`translate(${x}, ${y})`}>
              <rect x={0} y={0} width={16} height={16} fill={GRAY_SHADES[i % GRAY_SHADES.length]} rx={2} />
              <text x={22} y={13} fill="#404040" fontSize={16}>
                {c.name}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function AttributionCalculatorPage() {
  const [channels, setChannels] = useState<Channel[]>(DEFAULT_CHANNELS);
  const [loaded, setLoaded] = useState(false);
  const [scenario, setScenario] = useState<ScenarioInput>({ channelId: "", increasePercent: 20 });
  const [showScenario, setShowScenario] = useState(false);

  /* ---- localStorage persistence ---------------------------------- */

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Channel[];
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id) {
          setChannels(parsed);
        }
      }
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(channels));
    } catch {
      /* ignore */
    }
  }, [channels, loaded]);

  /* ---- Attribution calculations ---------------------------------- */

  const allAttributions = useMemo(() => {
    const result: Record<ModelKey, Attribution[]> = {
      lastTouch: [],
      firstTouch: [],
      linear: [],
      timeDecay: [],
    };
    for (const model of MODEL_KEYS) {
      result[model] = computeAttribution(channels, model);
    }
    return result;
  }, [channels]);

  /* ---- Scenario projections -------------------------------------- */

  const scenarioResults = useMemo(() => {
    if (!showScenario || !scenario.channelId) return null;
    const modified = channels.map((c) => {
      if (c.id === scenario.channelId) {
        const factor = 1 + scenario.increasePercent / 100;
        return {
          ...c,
          spend: Math.round(c.spend * factor),
          clicks: Math.round(c.clicks * factor * 0.9),
          conversions: Math.round(c.conversions * factor * 0.8),
          impressions: Math.round(c.impressions * factor),
        };
      }
      return c;
    });
    const result: Record<ModelKey, Attribution[]> = {
      lastTouch: [],
      firstTouch: [],
      linear: [],
      timeDecay: [],
    };
    for (const model of MODEL_KEYS) {
      result[model] = computeAttribution(modified, model);
    }
    return result;
  }, [channels, scenario, showScenario]);

  /* ---- Channel management ---------------------------------------- */

  const addChannel = useCallback(() => {
    setChannels((prev) => [
      ...prev,
      { id: nextId(), name: `Channel ${prev.length + 1}`, impressions: 10000, clicks: 500, conversions: 20, spend: 1000 },
    ]);
  }, []);

  const removeChannel = useCallback((id: string) => {
    setChannels((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateChannel = useCallback((id: string, field: keyof Channel, value: string | number) => {
    setChannels((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  }, []);

  /* ---- Export ----------------------------------------------------- */

  const exportTxt = useCallback(() => {
    const lines: string[] = [
      "Marketing Attribution Model Calculator - Report",
      `Generated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
      "",
      "=== Channels ===",
      "",
    ];

    for (const c of channels) {
      lines.push(`${c.name}: ${fmtNum(c.impressions)} impressions, ${fmtNum(c.clicks)} clicks, ${fmtNum(c.conversions)} conversions, ${fmt(c.spend)} spend`);
    }

    lines.push("", "=== Attribution Results ===", "");

    for (const model of MODEL_KEYS) {
      lines.push(`--- ${MODEL_LABELS[model]} ---`);
      const attrs = allAttributions[model];
      for (const a of attrs) {
        lines.push(`  ${a.channelName}: ${pct(a.credit)} credit, ${a.roi.toFixed(1)}% ROI`);
      }
      const best = getBestChannel(attrs);
      if (best) {
        lines.push(`  Best Channel: ${best.channelName} (${pct(best.credit)})`);
      }
      lines.push("");
    }

    if (showScenario && scenarioResults && scenario.channelId) {
      const targetChannel = channels.find((c) => c.id === scenario.channelId);
      lines.push(`=== Scenario: Increase ${targetChannel?.name ?? "channel"} spend by ${scenario.increasePercent}% ===`, "");
      for (const model of MODEL_KEYS) {
        lines.push(`--- ${MODEL_LABELS[model]} (projected) ---`);
        const attrs = scenarioResults[model];
        for (const a of attrs) {
          lines.push(`  ${a.channelName}: ${pct(a.credit)} credit, ${a.roi.toFixed(1)}% ROI`);
        }
        lines.push("");
      }
    }

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attribution-report.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [channels, allAttributions, showScenario, scenarioResults, scenario]);

  /* ---- Reset ----------------------------------------------------- */

  const resetData = useCallback(() => {
    setChannels(DEFAULT_CHANNELS);
    setShowScenario(false);
    setScenario({ channelId: "", increasePercent: 20 });
  }, []);

  /* ---- JSON-LD --------------------------------------------------- */

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Marketing Attribution Model Calculator",
    description: "Compare Last Touch, First Touch, Linear, and Time Decay attribution models side by side.",
    applicationCategory: "Marketing Tool",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    creator: { "@type": "Organization", name: "Markit Media" },
  };

  /* ---- Render ---------------------------------------------------- */

  return (
    <article className="min-h-screen">
      <JsonLd data={jsonLdData} />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Attribution Calculator" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-28 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Marketing Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing Attribution Calculator
            </h1>
            <SectionDesc>
              Add your marketing channels, input touchpoint data, and compare how four different
              attribution models distribute credit. Find which channels truly drive your conversions.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Channel Input Section */}
      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-6xl mx-auto">
          <Animate animation="fade-up" delay={100}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                Your Channels
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={addChannel}
                  className={`px-5 py-2.5 bg-black text-white text-base font-bold border-2 border-black transition-colors motion-reduce:transition-none hover:bg-white hover:text-black ${focusClasses}`}
                >
                  + Add Channel
                </button>
                <button
                  onClick={resetData}
                  className={`px-5 py-2.5 bg-white text-black text-base font-bold border-2 border-neutral-300 transition-colors motion-reduce:transition-none hover:border-black ${focusClasses}`}
                >
                  Reset
                </button>
              </div>
            </div>
          </Animate>

          <div className="space-y-4">
            {channels.map((channel, idx) => (
              <Animate key={channel.id} animation="fade-up" delay={50 * idx}>
                <div className="border-2 border-neutral-200 p-6 bg-white">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <input
                      type="text"
                      value={channel.name}
                      onChange={(e) => updateChannel(channel.id, "name", e.target.value)}
                      className={`text-lg font-bold text-black bg-transparent border-b-2 border-neutral-200 pb-1 transition-colors hover:border-neutral-400 focus:border-black outline-none ${focusClasses}`}
                      aria-label={`Channel ${idx + 1} name`}
                    />
                    {channels.length > 1 && (
                      <button
                        onClick={() => removeChannel(channel.id)}
                        className={`text-base text-neutral-400 hover:text-black transition-colors motion-reduce:transition-none ${focusClasses}`}
                        aria-label={`Remove ${channel.name}`}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <label htmlFor={`impressions-${channel.id}`} className="block text-base font-bold text-black mb-2">
                        Impressions
                      </label>
                      <input
                        id={`impressions-${channel.id}`}
                        type="number"
                        min={0}
                        value={channel.impressions}
                        onChange={(e) => updateChannel(channel.id, "impressions", Math.max(0, parseInt(e.target.value) || 0))}
                        className={`w-full px-4 py-3 text-base border-2 border-neutral-200 bg-white text-black transition-colors hover:border-neutral-400 focus:border-black outline-none ${focusClasses}`}
                      />
                    </div>
                    <div>
                      <label htmlFor={`clicks-${channel.id}`} className="block text-base font-bold text-black mb-2">
                        Clicks
                      </label>
                      <input
                        id={`clicks-${channel.id}`}
                        type="number"
                        min={0}
                        value={channel.clicks}
                        onChange={(e) => updateChannel(channel.id, "clicks", Math.max(0, parseInt(e.target.value) || 0))}
                        className={`w-full px-4 py-3 text-base border-2 border-neutral-200 bg-white text-black transition-colors hover:border-neutral-400 focus:border-black outline-none ${focusClasses}`}
                      />
                    </div>
                    <div>
                      <label htmlFor={`conversions-${channel.id}`} className="block text-base font-bold text-black mb-2">
                        Conversions
                      </label>
                      <input
                        id={`conversions-${channel.id}`}
                        type="number"
                        min={0}
                        value={channel.conversions}
                        onChange={(e) => updateChannel(channel.id, "conversions", Math.max(0, parseInt(e.target.value) || 0))}
                        className={`w-full px-4 py-3 text-base border-2 border-neutral-200 bg-white text-black transition-colors hover:border-neutral-400 focus:border-black outline-none ${focusClasses}`}
                      />
                    </div>
                    <div>
                      <label htmlFor={`spend-${channel.id}`} className="block text-base font-bold text-black mb-2">
                        Spend ($)
                      </label>
                      <input
                        id={`spend-${channel.id}`}
                        type="number"
                        min={0}
                        value={channel.spend}
                        onChange={(e) => updateChannel(channel.id, "spend", Math.max(0, parseInt(e.target.value) || 0))}
                        className={`w-full px-4 py-3 text-base border-2 border-neutral-200 bg-white text-black transition-colors hover:border-neutral-400 focus:border-black outline-none ${focusClasses}`}
                      />
                    </div>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Attribution Comparison Table */}
      {channels.length > 0 && (
        <section className="px-6 lg:px-12 py-12">
          <div className="max-w-6xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-2">
                Attribution Model Comparison
              </h2>
              <p className="text-base text-neutral-500 mb-8">
                See how each model distributes credit differently across your channels.
              </p>
            </Animate>

            <Animate animation="fade-up" delay={100}>
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-base border-collapse min-w-[640px]">
                  <thead>
                    <tr className="border-b-2 border-black">
                      <th className="text-left py-4 pr-4 font-extrabold text-black">Channel</th>
                      {MODEL_KEYS.map((m) => (
                        <th key={m} className="text-right py-4 px-3 font-extrabold text-black">
                          {MODEL_LABELS[m]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {channels.map((c) => (
                      <tr key={c.id} className="border-b border-neutral-200">
                        <td className="py-4 pr-4 font-bold text-black">{c.name}</td>
                        {MODEL_KEYS.map((m) => {
                          const a = allAttributions[m].find((attr) => attr.channelId === c.id);
                          return (
                            <td key={m} className="py-4 px-3 text-right text-neutral-700 tabular-nums">
                              {a ? pct(a.credit) : "0.0%"}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* Stacked Bar Chart */}
      {channels.length > 0 && (
        <section className="px-6 lg:px-12 py-12 bg-neutral-50">
          <div className="max-w-6xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-2">
                Credit Distribution Chart
              </h2>
              <p className="text-base text-neutral-500 mb-8">
                Visual comparison of how attribution credit is split across channels under each model.
              </p>
            </Animate>

            <Animate animation="fade-in" delay={200}>
              <div className="bg-white border-2 border-neutral-200 p-6 lg:p-8 overflow-x-auto">
                <StackedBarChart channels={channels} allAttributions={allAttributions} />
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ROI Per Channel Per Model */}
      {channels.length > 0 && (
        <section className="px-6 lg:px-12 py-12">
          <div className="max-w-6xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-2">
                ROI by Channel and Model
              </h2>
              <p className="text-base text-neutral-500 mb-8">
                Estimated return on investment for each channel under each attribution model.
              </p>
            </Animate>

            <Animate animation="fade-up" delay={100}>
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-base border-collapse min-w-[640px]">
                  <thead>
                    <tr className="border-b-2 border-black">
                      <th className="text-left py-4 pr-4 font-extrabold text-black">Channel</th>
                      <th className="text-right py-4 px-3 font-extrabold text-black">Spend</th>
                      {MODEL_KEYS.map((m) => (
                        <th key={m} className="text-right py-4 px-3 font-extrabold text-black">
                          {MODEL_LABELS[m]} ROI
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {channels.map((c) => (
                      <tr key={c.id} className="border-b border-neutral-200">
                        <td className="py-4 pr-4 font-bold text-black">{c.name}</td>
                        <td className="py-4 px-3 text-right text-neutral-700 tabular-nums">{fmt(c.spend)}</td>
                        {MODEL_KEYS.map((m) => {
                          const a = allAttributions[m].find((attr) => attr.channelId === c.id);
                          const roi = a?.roi ?? 0;
                          return (
                            <td key={m} className="py-4 px-3 text-right tabular-nums">
                              <span className={roi >= 0 ? "text-black font-bold" : "text-neutral-500"}>
                                {roi.toFixed(1)}%
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* Best Channel Recommendations */}
      {channels.length > 0 && (
        <section className="px-6 lg:px-12 py-12 bg-neutral-50">
          <div className="max-w-6xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-8">
                Best Channel by Model
              </h2>
            </Animate>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {MODEL_KEYS.map((model, i) => {
                const best = getBestChannel(allAttributions[model]);
                return (
                  <Animate key={model} animation="fade-up" delay={i * 80}>
                    <div className="border-2 border-neutral-200 bg-white p-6">
                      <p className="text-base font-bold uppercase tracking-[0.15em] text-neutral-400 mb-3">
                        {MODEL_LABELS[model]}
                      </p>
                      <p className="text-lg font-extrabold text-black">
                        {best?.channelName ?? "N/A"}
                      </p>
                      <p className="text-base text-neutral-500 mt-1">
                        {best ? `${pct(best.credit)} of total credit` : "No data"}
                      </p>
                    </div>
                  </Animate>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Scenario: What If */}
      {channels.length > 0 && (
        <section className="px-6 lg:px-12 py-12">
          <div className="max-w-6xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-2">
                What-If Scenario
              </h2>
              <p className="text-base text-neutral-500 mb-8">
                Project how attribution changes if you increase spend on a specific channel.
              </p>
            </Animate>

            <Animate animation="fade-up" delay={100}>
              <div className="border-2 border-neutral-200 bg-white p-6 lg:p-8">
                <div className="flex flex-wrap items-end gap-6 mb-8">
                  <div className="flex-1 min-w-[200px]">
                    <label htmlFor="scenario-channel" className="block text-base font-bold text-black mb-2">
                      Channel
                    </label>
                    <select
                      id="scenario-channel"
                      value={scenario.channelId}
                      onChange={(e) => setScenario((s) => ({ ...s, channelId: e.target.value }))}
                      className={`w-full px-4 py-3 text-base border-2 border-neutral-200 bg-white text-black transition-colors hover:border-neutral-400 focus:border-black outline-none ${focusClasses}`}
                    >
                      <option value="">Select a channel</option>
                      {channels.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-48">
                    <label htmlFor="scenario-increase" className="block text-base font-bold text-black mb-2">
                      Increase Spend By (%)
                    </label>
                    <input
                      id="scenario-increase"
                      type="number"
                      min={1}
                      max={500}
                      value={scenario.increasePercent}
                      onChange={(e) =>
                        setScenario((s) => ({ ...s, increasePercent: Math.max(1, parseInt(e.target.value) || 1) }))
                      }
                      className={`w-full px-4 py-3 text-base border-2 border-neutral-200 bg-white text-black transition-colors hover:border-neutral-400 focus:border-black outline-none ${focusClasses}`}
                    />
                  </div>
                  <button
                    onClick={() => setShowScenario(true)}
                    disabled={!scenario.channelId}
                    className={`px-6 py-3 bg-black text-white text-base font-bold border-2 border-black transition-colors motion-reduce:transition-none hover:bg-white hover:text-black disabled:opacity-40 disabled:cursor-not-allowed ${focusClasses}`}
                  >
                    Run Scenario
                  </button>
                </div>

                {showScenario && scenarioResults && scenario.channelId && (
                  <div>
                    <p className="text-base font-bold text-black mb-4">
                      Projected attribution after increasing{" "}
                      <span className="underline">
                        {channels.find((c) => c.id === scenario.channelId)?.name}
                      </span>{" "}
                      spend by {scenario.increasePercent}%:
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-base border-collapse min-w-[640px]">
                        <thead>
                          <tr className="border-b-2 border-black">
                            <th className="text-left py-3 pr-4 font-extrabold text-black">Channel</th>
                            {MODEL_KEYS.map((m) => (
                              <th key={m} className="text-right py-3 px-3 font-extrabold text-black">
                                {MODEL_LABELS[m]}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {channels.map((c) => (
                            <tr key={c.id} className="border-b border-neutral-200">
                              <td className="py-3 pr-4 font-bold text-black">{c.name}</td>
                              {MODEL_KEYS.map((m) => {
                                const current = allAttributions[m].find((a) => a.channelId === c.id);
                                const projected = scenarioResults[m].find((a) => a.channelId === c.id);
                                const diff = (projected?.credit ?? 0) - (current?.credit ?? 0);
                                return (
                                  <td key={m} className="py-3 px-3 text-right tabular-nums">
                                    <span className="text-black">{projected ? pct(projected.credit) : "0.0%"}</span>
                                    {diff !== 0 && (
                                      <span className={`ml-2 text-base ${diff > 0 ? "text-neutral-700 font-bold" : "text-neutral-400"}`}>
                                        ({diff > 0 ? "+" : ""}{(diff * 100).toFixed(1)}pp)
                                      </span>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* Export & Actions */}
      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-4">
          <button
            onClick={exportTxt}
            className={`px-6 py-3 bg-black text-white text-base font-bold border-2 border-black transition-colors motion-reduce:transition-none hover:bg-white hover:text-black ${focusClasses}`}
          >
            Export Report (.txt)
          </button>
          <button
            onClick={resetData}
            className={`px-6 py-3 bg-white text-black text-base font-bold border-2 border-neutral-300 transition-colors motion-reduce:transition-none hover:border-black ${focusClasses}`}
          >
            Clear All Data
          </button>
        </div>
      </section>

      {/* Educational Section */}
      <section className="px-6 lg:px-12 py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Learn</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-3 mb-8">
              Understanding Attribution Models
            </h2>
          </Animate>

          <div className="space-y-10">
            <Animate animation="fade-up" delay={100}>
              <div className="border-l-4 border-black pl-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-2">
                  Last Touch Attribution
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Gives 100% of the credit to the last marketing touchpoint before a conversion.
                  This model is simple and works well for short sales cycles where the final
                  interaction is the most influential. It tends to overvalue bottom-of-funnel
                  channels like paid search and retargeting.
                </p>
                <p className="text-base text-neutral-500 mt-3">
                  <span className="font-bold text-black">Best for:</span> E-commerce, short purchase
                  decisions, campaigns focused on direct response.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={200}>
              <div className="border-l-4 border-neutral-400 pl-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-2">
                  First Touch Attribution
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Gives 100% of the credit to the first marketing touchpoint that introduced the
                  customer. This model helps you understand which channels are best at generating
                  awareness and bringing new prospects into the funnel. It undervalues channels
                  that nurture and close.
                </p>
                <p className="text-base text-neutral-500 mt-3">
                  <span className="font-bold text-black">Best for:</span> Brand awareness campaigns,
                  top-of-funnel optimization, understanding acquisition sources.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={300}>
              <div className="border-l-4 border-neutral-300 pl-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-2">
                  Linear Attribution
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Distributes credit equally across all touchpoints in the conversion path. This
                  provides a balanced view but does not account for the varying impact of different
                  interactions. It is a good starting point when you lack data on which touchpoints
                  matter most.
                </p>
                <p className="text-base text-neutral-500 mt-3">
                  <span className="font-bold text-black">Best for:</span> Long sales cycles, B2B
                  marketing, when all touchpoints contribute meaningfully.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={400}>
              <div className="border-l-4 border-neutral-200 pl-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-2">
                  Time Decay Attribution
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Gives more credit to touchpoints closer to the conversion, with earlier interactions
                  receiving exponentially less credit. This reflects the reality that recent
                  interactions often have more influence on the purchase decision while still
                  acknowledging the role of earlier touchpoints.
                </p>
                <p className="text-base text-neutral-500 mt-3">
                  <span className="font-bold text-black">Best for:</span> Consideration-heavy
                  purchases, SaaS free trials, multi-week sales cycles.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={500}>
              <div className="bg-white border-2 border-neutral-200 p-6 mt-8">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                  Which Model Should You Use?
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed mb-4">
                  There is no single correct attribution model. The best approach is to compare
                  multiple models side by side (as this tool does) and look for patterns:
                </p>
                <ul className="space-y-3 text-base text-neutral-600">
                  <li className="flex gap-3">
                    <span className="font-bold text-black shrink-0">1.</span>
                    If a channel scores high across all models, it is genuinely valuable.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-black shrink-0">2.</span>
                    If a channel only scores high in First Touch, it is an awareness driver.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-black shrink-0">3.</span>
                    If a channel only scores high in Last Touch, it is a closer but may need upstream support.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-black shrink-0">4.</span>
                    Use the What-If scenario tool to test how budget changes affect attribution before committing real dollars.
                  </li>
                </ul>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-12 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Animate animation="fade-up">
            <SectionLabel>Next Step</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-3">
              Need Help With Your Attribution Strategy?
            </h2>
            <p className="text-lg text-neutral-500 leading-relaxed mt-4 max-w-2xl mx-auto">
              Our team can help you implement the right attribution model for your business,
              connect your data sources, and build dashboards that drive real decisions.
            </p>
            <Link
              href="/contact"
              className={`inline-block mt-8 px-8 py-4 bg-black text-white text-base font-bold border-2 border-black transition-colors motion-reduce:transition-none hover:bg-white hover:text-black ${focusClasses}`}
            >
              Get in Touch
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Attribution Calculator"
        services={[
          { title: "Digital Marketing", desc: "Data-driven strategy with transparent reporting and insights.", href: "/services/digital-marketing" },
          { title: "Performance Marketing", desc: "Campaign optimization based on real performance data.", href: "/services/performance-marketing" },
          { title: "SEO", desc: "SEO analytics that show exactly what drives organic growth.", href: "/services/seo" },
        ]}
        relatedTools={[
          { title: "Ad Copy Analyzer", href: "/resources/ad-copy-analyzer" },
          { title: "Ad Copy Generator", href: "/resources/ad-copy-generator" },
          { title: "Ad Spend Calculator", href: "/resources/ad-spend-calculator" },
          { title: "Agency Comparison", href: "/resources/agency-comparison" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
