"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Channel {
  id: string;
  name: string;
  spend: string;
  revenue: string;
  leads: string;
  conversionRate: string;
}

interface ChannelMetrics {
  roi: number;
  costPerLead: number;
  costPerAcquisition: number;
  revenuePerDollar: number;
  spend: number;
  revenue: number;
  leads: number;
  conversionRate: number;
  conversions: number;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const MAX_CHANNELS = 8;

function createEmptyChannel(): Channel {
  return {
    id: crypto.randomUUID(),
    name: "",
    spend: "",
    revenue: "",
    leads: "",
    conversionRate: "",
  };
}

function parseNum(v: string): number {
  const n = parseFloat(v.replace(/[^0-9.-]/g, ""));
  return isNaN(n) ? 0 : n;
}

function calcMetrics(ch: Channel): ChannelMetrics {
  const spend = parseNum(ch.spend);
  const revenue = parseNum(ch.revenue);
  const leads = parseNum(ch.leads);
  const conversionRate = parseNum(ch.conversionRate);
  const conversions = leads * (conversionRate / 100);

  return {
    spend,
    revenue,
    leads,
    conversionRate,
    conversions,
    roi: spend > 0 ? ((revenue - spend) / spend) * 100 : 0,
    costPerLead: leads > 0 ? spend / leads : 0,
    costPerAcquisition: conversions > 0 ? spend / conversions : 0,
    revenuePerDollar: spend > 0 ? revenue / spend : 0,
  };
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

const fmtDec = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

const pct = (n: number) => `${n >= 0 ? "+" : ""}${n.toFixed(1)}%`;

/* ------------------------------------------------------------------ */
/*  SVG Charts                                                         */
/* ------------------------------------------------------------------ */

/* Gray shades used for chart segments / bars – black/white brand only */
const GRAYS = [
  "#000000",
  "#333333",
  "#555555",
  "#777777",
  "#999999",
  "#BBBBBB",
  "#DDDDDD",
  "#EEEEEE",
];

function BarChart({
  data,
}: {
  data: { label: string; value: number; color: string }[];
}) {
  if (data.length === 0) return null;
  const max = Math.max(...data.map((d) => Math.abs(d.value)), 1);
  const barH = 36;
  const gap = 12;
  const labelW = 120;
  const chartW = 500;
  const svgW = labelW + chartW + 80;
  const svgH = data.length * (barH + gap) + gap;

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      className="w-full"
      role="img"
      aria-label="Bar chart comparing ROI by channel"
    >
      {data.map((d, i) => {
        const y = gap + i * (barH + gap);
        const barW = Math.abs(d.value) / max * (chartW - 20);
        const isNeg = d.value < 0;
        return (
          <g key={d.label}>
            <text
              x={labelW - 8}
              y={y + barH / 2 + 5}
              textAnchor="end"
              className="text-[14px]"
              fill="#000"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {d.label.length > 14 ? d.label.slice(0, 13) + "…" : d.label}
            </text>
            <rect
              x={labelW}
              y={y}
              width={Math.max(barW, 2)}
              height={barH}
              fill={isNeg ? "#999" : d.color}
              rx={3}
            />
            <text
              x={labelW + barW + 8}
              y={y + barH / 2 + 5}
              className="text-[14px] font-bold"
              fill={isNeg ? "#999" : "#000"}
              style={{ fontFamily: "var(--font-body)" }}
            >
              {pct(d.value)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function PieChart({
  data,
}: {
  data: { label: string; value: number; color: string }[];
}) {
  if (data.length === 0) return null;
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) return null;

  const cx = 140;
  const cy = 140;
  const r = 120;
  let cumAngle = -Math.PI / 2;

  const slices = data.map((d) => {
    const angle = (d.value / total) * 2 * Math.PI;
    const startAngle = cumAngle;
    cumAngle += angle;
    const endAngle = cumAngle;

    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const largeArc = angle > Math.PI ? 1 : 0;

    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    return { ...d, path, pct: ((d.value / total) * 100).toFixed(1) };
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        viewBox="0 0 280 280"
        className="w-full max-w-[280px]"
        role="img"
        aria-label="Pie chart showing budget allocation"
      >
        {slices.map((s) => (
          <path
            key={s.label}
            d={s.path}
            fill={s.color}
            stroke="#fff"
            strokeWidth={2}
          />
        ))}
      </svg>
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
        {slices.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: s.color }}
              aria-hidden="true"
            />
            <span className="text-base text-black">
              {s.label} ({s.pct}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function RoiDashboardPage() {
  const [channels, setChannels] = useState<Channel[]>([
    { ...createEmptyChannel(), name: "Google Ads" },
    { ...createEmptyChannel(), name: "Meta Ads" },
  ]);
  const [showDashboard, setShowDashboard] = useState(false);

  /* ---- derived data ---- */
  const validChannels = useMemo(
    () =>
      channels
        .filter(
          (ch) =>
            ch.name.trim() !== "" &&
            parseNum(ch.spend) > 0 &&
            parseNum(ch.revenue) > 0
        )
        .map((ch) => ({ ...ch, metrics: calcMetrics(ch) })),
    [channels]
  );

  const totals = useMemo(() => {
    const t = {
      spend: 0,
      revenue: 0,
      leads: 0,
      conversions: 0,
    };
    validChannels.forEach((ch) => {
      t.spend += ch.metrics.spend;
      t.revenue += ch.metrics.revenue;
      t.leads += ch.metrics.leads;
      t.conversions += ch.metrics.conversions;
    });
    return {
      ...t,
      roi: t.spend > 0 ? ((t.revenue - t.spend) / t.spend) * 100 : 0,
      costPerLead: t.leads > 0 ? t.spend / t.leads : 0,
      costPerAcquisition: t.conversions > 0 ? t.spend / t.conversions : 0,
      revenuePerDollar: t.spend > 0 ? t.revenue / t.spend : 0,
    };
  }, [validChannels]);

  const best = useMemo(
    () =>
      validChannels.length > 0
        ? validChannels.reduce((a, b) =>
            a.metrics.roi > b.metrics.roi ? a : b
          )
        : null,
    [validChannels]
  );

  const worst = useMemo(
    () =>
      validChannels.length > 0
        ? validChannels.reduce((a, b) =>
            a.metrics.roi < b.metrics.roi ? a : b
          )
        : null,
    [validChannels]
  );

  const suggestions = useMemo(() => {
    if (validChannels.length < 2) return [];
    const sorted = [...validChannels].sort(
      (a, b) => b.metrics.roi - a.metrics.roi
    );
    const tips: string[] = [];

    const topCh = sorted[0];
    const bottomCh = sorted[sorted.length - 1];

    if (topCh && bottomCh && topCh.metrics.roi > bottomCh.metrics.roi) {
      const shiftAmount = Math.round(bottomCh.metrics.spend * 0.2);
      if (shiftAmount > 0) {
        tips.push(
          `Consider shifting ${fmt(shiftAmount)} (20% of ${bottomCh.name} spend) to ${topCh.name}, which has the highest ROI at ${pct(topCh.metrics.roi)}.`
        );
      }
    }

    validChannels.forEach((ch) => {
      if (ch.metrics.roi < 0) {
        tips.push(
          `${ch.name} has a negative ROI (${pct(ch.metrics.roi)}). Review targeting, creative, and landing page experience before increasing spend.`
        );
      }
    });

    if (validChannels.length >= 3) {
      const median = sorted[Math.floor(sorted.length / 2)];
      const belowMedian = sorted.filter(
        (ch) => ch.metrics.roi < median.metrics.roi
      );
      if (belowMedian.length > 0) {
        const totalBelowSpend = belowMedian.reduce(
          (s, ch) => s + ch.metrics.spend,
          0
        );
        tips.push(
          `${belowMedian.length} channel${belowMedian.length > 1 ? "s" : ""} perform${belowMedian.length === 1 ? "s" : ""} below the median ROI of ${pct(median.metrics.roi)}, accounting for ${fmt(totalBelowSpend)} in combined spend. Test reallocating a portion to higher-performing channels.`
        );
      }
    }

    if (totals.costPerLead > 0) {
      const highCPL = validChannels.filter(
        (ch) =>
          ch.metrics.costPerLead > totals.costPerLead * 1.5 &&
          ch.metrics.leads > 0
      );
      highCPL.forEach((ch) => {
        tips.push(
          `${ch.name} has a cost per lead of ${fmtDec(ch.metrics.costPerLead)}, which is 50%+ above your average of ${fmtDec(totals.costPerLead)}. Optimize targeting or creative to improve efficiency.`
        );
      });
    }

    return tips;
  }, [validChannels, totals]);

  /* ---- handlers ---- */
  function addChannel() {
    if (channels.length >= MAX_CHANNELS) return;
    setChannels((prev) => [...prev, createEmptyChannel()]);
  }

  function removeChannel(id: string) {
    setChannels((prev) => prev.filter((ch) => ch.id !== id));
  }

  function updateChannel(id: string, field: keyof Channel, value: string) {
    setChannels((prev) =>
      prev.map((ch) => (ch.id === id ? { ...ch, [field]: value } : ch))
    );
  }

  function handleGenerate() {
    if (validChannels.length === 0) return;
    setShowDashboard(true);
  }

  function handleReset() {
    setShowDashboard(false);
  }

  /* ---- chart data ---- */
  const barData = validChannels.map((ch, i) => ({
    label: ch.name,
    value: ch.metrics.roi,
    color: GRAYS[i % GRAYS.length],
  }));

  const pieData = validChannels.map((ch, i) => ({
    label: ch.name,
    value: ch.metrics.spend,
    color: GRAYS[i % GRAYS.length],
  }));

  /* ---- schema ---- */
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Marketing ROI Dashboard",
    description:
      "Compare marketing channel performance with ROI calculations, budget allocation charts, and optimization suggestions.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <article className="min-h-screen">
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/roi-calculator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">ROI Calculator</Link>
                <Link href="/resources/roi-forecaster" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">ROI Forecaster</Link>
                <Link href="/resources/marketing-roi-report" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Marketing ROI Report</Link>
                <Link href="/resources/kpi-builder" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">KPI Builder</Link>
          </div>
        </div>
      </section>
<JsonLd data={schema} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "ROI Dashboard" },
        ]}
      />

      {/* Header */}
      <section className="px-6 lg:px-12 pt-16 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Interactive Tools</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing ROI Dashboard
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Add your marketing channels, enter spend and revenue data, and get
              an instant dashboard comparing performance across every channel.
            </p>
            <p className="text-base text-gray-400 mt-2">
              All calculations happen in your browser. No data is stored or
              sent to any server.
            </p>
          </Animate>
        </div>
      </section>

      {/* Channel Input Form */}
      {!showDashboard && (
        <section className="px-6 lg:px-12 py-8">
          <div className="max-w-5xl mx-auto">
            <Animate animation="fade-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                  Your Channels
                </h2>
                {channels.length < MAX_CHANNELS && (
                  <button
                    onClick={addChannel}
                    className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 text-base font-bold hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    + Add Channel
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {channels.map((ch, idx) => (
                  <div
                    key={ch.id}
                    className="border border-gray-200 bg-white p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-base font-bold text-black">
                        Channel {idx + 1}
                      </span>
                      {channels.length > 1 && (
                        <button
                          onClick={() => removeChannel(ch.id)}
                          className="text-base text-gray-400 hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                          aria-label={`Remove channel ${idx + 1}`}
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                      <div>
                        <label
                          htmlFor={`name-${ch.id}`}
                          className="block text-base font-bold text-black mb-1"
                        >
                          Channel Name
                        </label>
                        <input
                          id={`name-${ch.id}`}
                          type="text"
                          value={ch.name}
                          onChange={(e) =>
                            updateChannel(ch.id, "name", e.target.value)
                          }
                          placeholder="e.g. Google Ads"
                          className="w-full border border-gray-300 px-3 py-3 text-base text-black focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`spend-${ch.id}`}
                          className="block text-base font-bold text-black mb-1"
                        >
                          Monthly Spend ($)
                        </label>
                        <input
                          id={`spend-${ch.id}`}
                          type="number"
                          min="0"
                          value={ch.spend}
                          onChange={(e) =>
                            updateChannel(ch.id, "spend", e.target.value)
                          }
                          placeholder="5000"
                          className="w-full border border-gray-300 px-3 py-3 text-base text-black focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`revenue-${ch.id}`}
                          className="block text-base font-bold text-black mb-1"
                        >
                          Revenue Attributed ($)
                        </label>
                        <input
                          id={`revenue-${ch.id}`}
                          type="number"
                          min="0"
                          value={ch.revenue}
                          onChange={(e) =>
                            updateChannel(ch.id, "revenue", e.target.value)
                          }
                          placeholder="15000"
                          className="w-full border border-gray-300 px-3 py-3 text-base text-black focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`leads-${ch.id}`}
                          className="block text-base font-bold text-black mb-1"
                        >
                          Leads Generated
                        </label>
                        <input
                          id={`leads-${ch.id}`}
                          type="number"
                          min="0"
                          value={ch.leads}
                          onChange={(e) =>
                            updateChannel(ch.id, "leads", e.target.value)
                          }
                          placeholder="50"
                          className="w-full border border-gray-300 px-3 py-3 text-base text-black focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`conv-${ch.id}`}
                          className="block text-base font-bold text-black mb-1"
                        >
                          Conversion Rate (%)
                        </label>
                        <input
                          id={`conv-${ch.id}`}
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={ch.conversionRate}
                          onChange={(e) =>
                            updateChannel(
                              ch.id,
                              "conversionRate",
                              e.target.value
                            )
                          }
                          placeholder="10"
                          className="w-full border border-gray-300 px-3 py-3 text-base text-black focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <button
                  onClick={handleGenerate}
                  disabled={validChannels.length === 0}
                  className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Generate Dashboard &rarr;
                </button>
                <span className="text-base text-gray-400">
                  {validChannels.length === 0
                    ? "Enter at least one channel with name, spend, and revenue"
                    : `${validChannels.length} channel${validChannels.length > 1 ? "s" : ""} ready`}
                </span>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* Dashboard */}
      {showDashboard && (
        <>
          {/* Back button */}
          <section className="px-6 lg:px-12 pt-4 pb-2">
            <div className="max-w-7xl mx-auto">
              <button
                onClick={handleReset}
                className="text-base font-bold text-black underline hover:no-underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                &larr; Edit Channels
              </button>
            </div>
          </section>

          {/* Overall Stats */}
          <section className="px-6 lg:px-12 py-8" aria-label="Overall metrics">
            <div className="max-w-7xl mx-auto">
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                  Overall Performance
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard
                    label="Overall ROI"
                    value={pct(totals.roi)}
                    positive={totals.roi >= 0}
                  />
                  <StatCard
                    label="Total Spend"
                    value={fmt(totals.spend)}
                  />
                  <StatCard
                    label="Total Revenue"
                    value={fmt(totals.revenue)}
                  />
                  <StatCard
                    label="Revenue per $1"
                    value={`$${totals.revenuePerDollar.toFixed(2)}`}
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <StatCard
                    label="Total Leads"
                    value={totals.leads.toLocaleString()}
                  />
                  <StatCard
                    label="Total Conversions"
                    value={Math.round(totals.conversions).toLocaleString()}
                  />
                  <StatCard
                    label="Avg. Cost per Lead"
                    value={fmtDec(totals.costPerLead)}
                  />
                  <StatCard
                    label="Avg. Cost per Acquisition"
                    value={fmtDec(totals.costPerAcquisition)}
                  />
                </div>
              </Animate>
            </div>
          </section>

          {/* Best / Worst Highlights */}
          {best && worst && best.id !== worst.id && (
            <section className="px-6 lg:px-12 py-6" aria-label="Channel highlights">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                <Animate animation="fade-up">
                  <div className="border-2 border-black bg-black text-white p-6">
                    <span className="text-base font-medium text-gray-400 block mb-1">
                      Best Performing Channel
                    </span>
                    <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold block">
                      {best.name}
                    </span>
                    <span className="text-lg text-gray-300 mt-1 block">
                      ROI: {pct(best.metrics.roi)} &middot; Revenue per $1:{" "}
                      ${best.metrics.revenuePerDollar.toFixed(2)}
                    </span>
                  </div>
                </Animate>
                <Animate animation="fade-up" delay={100}>
                  <div className="border-2 border-gray-300 bg-white text-black p-6">
                    <span className="text-base font-medium text-gray-400 block mb-1">
                      Lowest Performing Channel
                    </span>
                    <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold block">
                      {worst.name}
                    </span>
                    <span className="text-lg text-gray-500 mt-1 block">
                      ROI: {pct(worst.metrics.roi)} &middot; Revenue per $1:{" "}
                      ${worst.metrics.revenuePerDollar.toFixed(2)}
                    </span>
                  </div>
                </Animate>
              </div>
            </section>
          )}

          {/* Charts */}
          <section className="px-6 lg:px-12 py-8" aria-label="Visual comparisons">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Animate animation="fade-up">
                <div className="border border-gray-200 bg-white p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                    ROI by Channel
                  </h3>
                  <BarChart data={barData} />
                </div>
              </Animate>
              <Animate animation="fade-up" delay={100}>
                <div className="border border-gray-200 bg-white p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                    Budget Allocation
                  </h3>
                  <PieChart data={pieData} />
                </div>
              </Animate>
            </div>
          </section>

          {/* Metrics Table */}
          <section className="px-6 lg:px-12 py-8" aria-label="Detailed metrics table">
            <div className="max-w-7xl mx-auto">
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                  Channel Comparison
                </h2>
                <div className="overflow-x-auto border border-gray-200">
                  <table className="w-full text-base">
                    <thead>
                      <tr className="bg-black text-white">
                        <th className="text-left px-4 py-3 font-bold">
                          Channel
                        </th>
                        <th className="text-right px-4 py-3 font-bold">
                          Spend
                        </th>
                        <th className="text-right px-4 py-3 font-bold">
                          Revenue
                        </th>
                        <th className="text-right px-4 py-3 font-bold">
                          ROI
                        </th>
                        <th className="text-right px-4 py-3 font-bold">
                          Leads
                        </th>
                        <th className="text-right px-4 py-3 font-bold">
                          CPL
                        </th>
                        <th className="text-right px-4 py-3 font-bold">
                          CPA
                        </th>
                        <th className="text-right px-4 py-3 font-bold">
                          Rev/$1
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {validChannels.map((ch, i) => (
                        <tr
                          key={ch.id}
                          className={
                            i % 2 === 0
                              ? "bg-white"
                              : "bg-gray-50"
                          }
                        >
                          <td className="px-4 py-3 font-bold text-black">
                            {ch.name}
                          </td>
                          <td className="px-4 py-3 text-right text-black">
                            {fmt(ch.metrics.spend)}
                          </td>
                          <td className="px-4 py-3 text-right text-black">
                            {fmt(ch.metrics.revenue)}
                          </td>
                          <td
                            className={`px-4 py-3 text-right font-bold ${
                              ch.metrics.roi >= 0
                                ? "text-black"
                                : "text-gray-500"
                            }`}
                          >
                            {pct(ch.metrics.roi)}
                          </td>
                          <td className="px-4 py-3 text-right text-black">
                            {ch.metrics.leads.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-right text-black">
                            {ch.metrics.leads > 0
                              ? fmtDec(ch.metrics.costPerLead)
                              : "—"}
                          </td>
                          <td className="px-4 py-3 text-right text-black">
                            {ch.metrics.conversions > 0
                              ? fmtDec(ch.metrics.costPerAcquisition)
                              : "—"}
                          </td>
                          <td className="px-4 py-3 text-right text-black">
                            ${ch.metrics.revenuePerDollar.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                      {/* Totals row */}
                      <tr className="border-t-2 border-black bg-gray-100">
                        <td className="px-4 py-3 font-extrabold text-black">
                          Total
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-black">
                          {fmt(totals.spend)}
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-black">
                          {fmt(totals.revenue)}
                        </td>
                        <td className="px-4 py-3 text-right font-extrabold text-black">
                          {pct(totals.roi)}
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-black">
                          {totals.leads.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-black">
                          {totals.leads > 0
                            ? fmtDec(totals.costPerLead)
                            : "—"}
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-black">
                          {totals.conversions > 0
                            ? fmtDec(totals.costPerAcquisition)
                            : "—"}
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-black">
                          ${totals.revenuePerDollar.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Animate>
            </div>
          </section>

          {/* Budget Reallocation Suggestions */}
          {suggestions.length > 0 && (
            <section
              className="px-6 lg:px-12 py-8"
              aria-label="Budget optimization suggestions"
            >
              <div className="max-w-5xl mx-auto">
                <Animate animation="fade-up">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                    Budget Optimization Suggestions
                  </h2>
                  <div className="space-y-4">
                    {suggestions.map((tip, i) => (
                      <div
                        key={i}
                        className="border border-gray-200 bg-gray-50 p-5"
                      >
                        <p className="text-base text-black leading-relaxed">
                          <span className="font-bold">{i + 1}.</span> {tip}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="text-base text-gray-400 mt-4">
                    These suggestions are based on the data you entered. Actual
                    results depend on many factors including market conditions,
                    creative quality, and audience targeting.
                  </p>
                </Animate>
              </div>
            </section>
          )}

          {/* How to Use */}
          <section className="px-6 lg:px-12 py-8">
            <div className="max-w-5xl mx-auto">
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                  Understanding Your Metrics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 p-5">
                    <p className="text-base text-black leading-relaxed">
                      <span className="font-bold">ROI %</span> &mdash; Return
                      on investment. (Revenue - Spend) / Spend x 100. Positive
                      means profit; negative means loss.
                    </p>
                  </div>
                  <div className="border border-gray-200 p-5">
                    <p className="text-base text-black leading-relaxed">
                      <span className="font-bold">Cost per Lead (CPL)</span>{" "}
                      &mdash; Total spend divided by leads generated. Lower is
                      better.
                    </p>
                  </div>
                  <div className="border border-gray-200 p-5">
                    <p className="text-base text-black leading-relaxed">
                      <span className="font-bold">
                        Cost per Acquisition (CPA)
                      </span>{" "}
                      &mdash; Total spend divided by conversions (leads x
                      conversion rate). Lower is better.
                    </p>
                  </div>
                  <div className="border border-gray-200 p-5">
                    <p className="text-base text-black leading-relaxed">
                      <span className="font-bold">Revenue per $1</span> &mdash;
                      Revenue attributed divided by spend. Above $1.00 means
                      you earned more than you spent.
                    </p>
                  </div>
                </div>
              </Animate>
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Want Help Improving These Numbers?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our performance marketing team can audit your channels, optimize
              your spend allocation, and help you get more revenue from every
              dollar invested.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Talk to Our Team &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat Card                                                          */
/* ------------------------------------------------------------------ */

function StatCard({
  label,
  value,
  positive,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="border border-gray-200 bg-white p-5">
      <span className="text-base text-gray-500 block mb-1">{label}</span>
      <span
        className={`font-[family-name:var(--font-display)] text-2xl font-extrabold block ${
          positive === false ? "text-gray-500" : "text-black"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
