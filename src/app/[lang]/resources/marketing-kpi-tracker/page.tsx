"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Category = "Traffic" | "Engagement" | "Conversion" | "Revenue" | "Cost";
type Unit = "number" | "percentage" | "currency";
type Direction = "higher" | "lower";

interface KpiDefinition {
  id: string;
  name: string;
  category: Category;
  unit: Unit;
  target: number;
  direction: Direction;
  monthlyActuals: (number | null)[];
}

type TemplateKey = "lead-gen" | "ecommerce" | "brand-awareness" | "content-marketing";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const CATEGORIES: Category[] = ["Traffic", "Engagement", "Conversion", "Revenue", "Cost"];
const UNITS: Unit[] = ["number", "percentage", "currency"];
const DIRECTIONS: Direction[] = ["higher", "lower"];
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const STORAGE_KEY = "markit-kpi-tracker";

const EMPTY_KPI: Omit<KpiDefinition, "id"> = {
  name: "",
  category: "Traffic",
  unit: "number",
  target: 0,
  direction: "higher",
  monthlyActuals: Array(12).fill(null),
};

/* ------------------------------------------------------------------ */
/*  Template KPI sets                                                  */
/* ------------------------------------------------------------------ */

const TEMPLATES: Record<TemplateKey, { label: string; kpis: Omit<KpiDefinition, "id" | "monthlyActuals">[] }> = {
  "lead-gen": {
    label: "Lead Generation",
    kpis: [
      { name: "Total Leads", category: "Conversion", unit: "number", target: 500, direction: "higher" },
      { name: "Cost per Lead", category: "Cost", unit: "currency", target: 25, direction: "lower" },
      { name: "Lead Conversion Rate", category: "Conversion", unit: "percentage", target: 5, direction: "higher" },
      { name: "Website Visitors", category: "Traffic", unit: "number", target: 20000, direction: "higher" },
      { name: "Email Sign-ups", category: "Engagement", unit: "number", target: 300, direction: "higher" },
      { name: "MQL to SQL Rate", category: "Conversion", unit: "percentage", target: 25, direction: "higher" },
    ],
  },
  ecommerce: {
    label: "E-Commerce",
    kpis: [
      { name: "Revenue", category: "Revenue", unit: "currency", target: 50000, direction: "higher" },
      { name: "Average Order Value", category: "Revenue", unit: "currency", target: 85, direction: "higher" },
      { name: "Cart Abandonment Rate", category: "Conversion", unit: "percentage", target: 60, direction: "lower" },
      { name: "Customer Acquisition Cost", category: "Cost", unit: "currency", target: 30, direction: "lower" },
      { name: "Return on Ad Spend", category: "Revenue", unit: "number", target: 4, direction: "higher" },
      { name: "Repeat Purchase Rate", category: "Conversion", unit: "percentage", target: 30, direction: "higher" },
    ],
  },
  "brand-awareness": {
    label: "Brand Awareness",
    kpis: [
      { name: "Impressions", category: "Traffic", unit: "number", target: 500000, direction: "higher" },
      { name: "Social Followers", category: "Engagement", unit: "number", target: 10000, direction: "higher" },
      { name: "Brand Mentions", category: "Engagement", unit: "number", target: 200, direction: "higher" },
      { name: "Share of Voice", category: "Engagement", unit: "percentage", target: 15, direction: "higher" },
      { name: "Website Direct Traffic", category: "Traffic", unit: "number", target: 8000, direction: "higher" },
      { name: "Video Views", category: "Engagement", unit: "number", target: 50000, direction: "higher" },
    ],
  },
  "content-marketing": {
    label: "Content Marketing",
    kpis: [
      { name: "Organic Traffic", category: "Traffic", unit: "number", target: 30000, direction: "higher" },
      { name: "Avg. Time on Page", category: "Engagement", unit: "number", target: 180, direction: "higher" },
      { name: "Bounce Rate", category: "Engagement", unit: "percentage", target: 45, direction: "lower" },
      { name: "Pages per Session", category: "Engagement", unit: "number", target: 3, direction: "higher" },
      { name: "Content Leads", category: "Conversion", unit: "number", target: 150, direction: "higher" },
      { name: "Cost per Content Piece", category: "Cost", unit: "currency", target: 500, direction: "lower" },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function fmtValue(value: number | null, unit: Unit): string {
  if (value === null || value === undefined) return "--";
  switch (unit) {
    case "currency":
      return "$" + value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    case "percentage":
      return value.toFixed(1) + "%";
    default:
      return value.toLocaleString("en-US");
  }
}

function pctOfTarget(actual: number | null, target: number): number {
  if (actual === null || target === 0) return 0;
  return (actual / target) * 100;
}

function getLatestActual(actuals: (number | null)[]): number | null {
  for (let i = actuals.length - 1; i >= 0; i--) {
    if (actuals[i] !== null) return actuals[i];
  }
  return null;
}

function getSecondLatestActual(actuals: (number | null)[]): number | null {
  let found = 0;
  for (let i = actuals.length - 1; i >= 0; i--) {
    if (actuals[i] !== null) {
      found++;
      if (found === 2) return actuals[i];
    }
  }
  return null;
}

function getTrend(actuals: (number | null)[]): "up" | "down" | "flat" {
  const latest = getLatestActual(actuals);
  const prev = getSecondLatestActual(actuals);
  if (latest === null || prev === null) return "flat";
  if (latest > prev) return "up";
  if (latest < prev) return "down";
  return "flat";
}

function getMoMChange(actuals: (number | null)[]): number | null {
  const latest = getLatestActual(actuals);
  const prev = getSecondLatestActual(actuals);
  if (latest === null || prev === null || prev === 0) return null;
  return ((latest - prev) / Math.abs(prev)) * 100;
}

function getStatus(kpi: KpiDefinition): "On Target" | "Below Target" | "Above Target" {
  const latest = getLatestActual(kpi.monthlyActuals);
  if (latest === null) return "Below Target";
  if (kpi.direction === "higher") {
    if (latest >= kpi.target) return "On Target";
    return "Below Target";
  } else {
    if (latest <= kpi.target) return "On Target";
    return "Above Target";
  }
}

function statusBadgeClass(status: string): string {
  switch (status) {
    case "On Target":
      return "bg-neutral-900 text-white";
    case "Below Target":
      return "bg-neutral-200 text-neutral-800";
    case "Above Target":
      return "bg-neutral-400 text-white";
    default:
      return "bg-neutral-100 text-neutral-700";
  }
}

function trendArrow(trend: "up" | "down" | "flat"): string {
  switch (trend) {
    case "up": return "↑";
    case "down": return "↓";
    case "flat": return "→";
  }
}

function isImproving(kpi: KpiDefinition): boolean {
  const trend = getTrend(kpi.monthlyActuals);
  if (kpi.direction === "higher") return trend === "up";
  return trend === "down";
}

function isDeclining(kpi: KpiDefinition): boolean {
  const trend = getTrend(kpi.monthlyActuals);
  if (kpi.direction === "higher") return trend === "down";
  return trend === "up";
}

/* ------------------------------------------------------------------ */
/*  SVG Sparkline                                                      */
/* ------------------------------------------------------------------ */

function Sparkline({ data, width = 120, height = 36 }: { data: (number | null)[]; width?: number; height?: number }) {
  const values = data.filter((v): v is number => v !== null);
  if (values.length < 2) {
    return (
      <svg width={width} height={height} role="img" aria-label="Not enough data for sparkline">
        <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke="#d4d4d4" strokeWidth={1} strokeDasharray="4 2" />
      </svg>
    );
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const padding = 2;
  const drawH = height - padding * 2;
  const drawW = width - padding * 2;

  const points: [number, number][] = [];
  let idx = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] !== null) {
      const x = padding + (idx / (values.length - 1)) * drawW;
      const y = padding + drawH - ((data[i]! - min) / range) * drawH;
      points.push([x, y]);
      idx++;
    }
  }

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

  return (
    <svg width={width} height={height} role="img" aria-label="Sparkline trend chart">
      <path d={pathD} fill="none" stroke="#000" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r={2.5} fill="#000" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SummaryCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="border border-neutral-200 p-6">
      <p className="text-base text-neutral-500 mb-1">{label}</p>
      <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">{value}</p>
      {sub && <p className="text-base text-neutral-500 mt-1">{sub}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function MarketingKpiTrackerPage() {
  const [kpis, setKpis] = useState<KpiDefinition[]>([]);
  const [loaded, setLoaded] = useState(false);

  /* Form state */
  const [form, setForm] = useState<Omit<KpiDefinition, "id">>({ ...EMPTY_KPI });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  /* Monthly entry state */
  const [editingMonthKpiId, setEditingMonthKpiId] = useState<string | null>(null);

  /* View tab */
  const [activeTab, setActiveTab] = useState<"scorecard" | "tracking" | "dashboard">("scorecard");

  /* Category filter */
  const [filterCategory, setFilterCategory] = useState<Category | "All">("All");

  /* ---- localStorage persistence ---- */

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setKpis(parsed);
      }
    } catch {
      /* ignore corrupt data */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(kpis));
    }
  }, [kpis, loaded]);

  /* ---- Filtered KPIs ---- */

  const filteredKpis = useMemo(() => {
    if (filterCategory === "All") return kpis;
    return kpis.filter((k) => k.category === filterCategory);
  }, [kpis, filterCategory]);

  /* ---- Summary stats ---- */

  const summaryStats = useMemo(() => {
    const onTarget = kpis.filter((k) => getStatus(k) === "On Target").length;
    const belowTarget = kpis.filter((k) => getStatus(k) === "Below Target").length;
    const aboveTarget = kpis.filter((k) => getStatus(k) === "Above Target").length;
    const improving = kpis.filter((k) => isImproving(k)).length;
    const declining = kpis.filter((k) => isDeclining(k)).length;
    return { onTarget, belowTarget, aboveTarget, improving, declining };
  }, [kpis]);

  /* ---- CRUD ---- */

  const addKpi = useCallback(() => {
    if (!form.name.trim()) return;
    setKpis((prev) => [...prev, { ...form, monthlyActuals: Array(12).fill(null), id: generateId() }]);
    setForm({ ...EMPTY_KPI });
    setShowForm(false);
  }, [form]);

  const updateKpi = useCallback(() => {
    if (!editingId || !form.name.trim()) return;
    setKpis((prev) =>
      prev.map((k) =>
        k.id === editingId
          ? { ...form, id: editingId, monthlyActuals: k.monthlyActuals }
          : k
      )
    );
    setEditingId(null);
    setForm({ ...EMPTY_KPI });
    setShowForm(false);
  }, [editingId, form]);

  const removeKpi = useCallback((id: string) => {
    setKpis((prev) => prev.filter((k) => k.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setForm({ ...EMPTY_KPI });
    }
  }, [editingId]);

  const startEdit = useCallback((kpi: KpiDefinition) => {
    setEditingId(kpi.id);
    setForm({ name: kpi.name, category: kpi.category, unit: kpi.unit, target: kpi.target, direction: kpi.direction, monthlyActuals: kpi.monthlyActuals });
    setShowForm(true);
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setForm({ ...EMPTY_KPI });
    setShowForm(false);
  }, []);

  /* ---- Monthly actuals ---- */

  const updateMonthly = useCallback((kpiId: string, monthIndex: number, value: string) => {
    setKpis((prev) =>
      prev.map((k) => {
        if (k.id !== kpiId) return k;
        const updated = [...k.monthlyActuals];
        updated[monthIndex] = value === "" ? null : parseFloat(value);
        return { ...k, monthlyActuals: updated };
      })
    );
  }, []);

  /* ---- Load template ---- */

  const loadTemplate = useCallback((key: TemplateKey) => {
    const template = TEMPLATES[key];
    const newKpis: KpiDefinition[] = template.kpis.map((t) => ({
      ...t,
      id: generateId(),
      monthlyActuals: Array(12).fill(null),
    }));
    setKpis(newKpis);
  }, []);

  /* ---- Export ---- */

  const exportTxt = useCallback(() => {
    const lines: string[] = [];
    lines.push("MARKETING KPI TRACKER REPORT");
    lines.push("Generated: " + new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }));
    lines.push("=".repeat(60));
    lines.push("");

    lines.push("SUMMARY DASHBOARD");
    lines.push("-".repeat(40));
    lines.push(`Total KPIs tracked: ${kpis.length}`);
    lines.push(`On Target: ${summaryStats.onTarget}`);
    lines.push(`Below Target: ${summaryStats.belowTarget}`);
    lines.push(`Above Target: ${summaryStats.aboveTarget}`);
    lines.push(`Improving (month-over-month): ${summaryStats.improving}`);
    lines.push(`Declining (month-over-month): ${summaryStats.declining}`);
    lines.push("");

    lines.push("KPI SCORECARD");
    lines.push("-".repeat(40));
    kpis.forEach((kpi) => {
      const latest = getLatestActual(kpi.monthlyActuals);
      const pctTarget = latest !== null ? pctOfTarget(latest, kpi.target).toFixed(1) : "--";
      const mom = getMoMChange(kpi.monthlyActuals);
      const trend = getTrend(kpi.monthlyActuals);
      lines.push(`${kpi.name} [${kpi.category}]`);
      lines.push(`  Current: ${fmtValue(latest, kpi.unit)} | Target: ${fmtValue(kpi.target, kpi.unit)} | ${pctTarget}% of target`);
      lines.push(`  Trend: ${trend} | MoM Change: ${mom !== null ? (mom >= 0 ? "+" : "") + mom.toFixed(1) + "%" : "N/A"}`);
      lines.push(`  Status: ${getStatus(kpi)} | Direction: ${kpi.direction === "higher" ? "Higher is better" : "Lower is better"}`);
      lines.push(`  Monthly Actuals: ${kpi.monthlyActuals.map((v, i) => `${MONTH_LABELS[i]}=${v !== null ? v : "-"}`).join(", ")}`);
      lines.push("");
    });

    lines.push("=".repeat(60));
    lines.push("Report generated by Markit Media KPI Tracker");
    lines.push("https://themarkitmedia.com/resources/marketing-kpi-tracker");

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kpi-tracker-report.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [kpis, summaryStats]);

  /* ---- JSON-LD ---- */

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Marketing KPI Tracker",
    description: "Track your marketing KPIs over time. Set targets, record monthly actuals, visualize trends, and identify areas that need attention.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <article className="min-h-screen bg-white text-black">
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/roi-calculator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">ROI Calculator</Link>
                <Link href="/resources/roi-dashboard" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">ROI Dashboard</Link>
                <Link href="/resources/roi-forecaster" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">ROI Forecaster</Link>
                <Link href="/resources/marketing-roi-report" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Marketing ROI Report</Link>
          </div>
        </div>
      </section>
<JsonLd data={jsonLd} />
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Marketing KPI Tracker" },
        ]}
      />

      {/* ---- Hero ---- */}
      <header className="px-6 lg:px-12 pt-32 pb-16">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold text-black tracking-tight mt-3">
              Marketing KPI Tracker
            </h1>
            <SectionDesc>
              Track your marketing KPIs over time. Set targets, record monthly
              actuals, visualize trends, and identify areas that need attention.
            </SectionDesc>
          </Animate>
        </div>
      </header>

      <div className="px-6 lg:px-12 pb-24">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* ---- Template Presets ---- */}
          <Animate animation="fade-up">
            <section aria-labelledby="templates-heading">
              <h2 id="templates-heading" className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                Quick Start Templates
              </h2>
              <p className="text-base text-neutral-600 mb-6">
                Load a pre-built set of KPIs for common marketing goals. This replaces any existing KPIs.
              </p>
              <div className="flex flex-wrap gap-3">
                {(Object.keys(TEMPLATES) as TemplateKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => loadTemplate(key)}
                    className="px-5 py-2.5 border border-neutral-300 text-base font-medium text-black hover:bg-neutral-100 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    {TEMPLATES[key].label}
                  </button>
                ))}
              </div>
            </section>
          </Animate>

          {/* ---- Add / Edit KPI ---- */}
          <Animate animation="fade-up">
            <section aria-labelledby="kpi-form-heading">
              <div className="flex items-center justify-between mb-4">
                <h2 id="kpi-form-heading" className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                  {editingId ? "Edit KPI" : "Add KPI"}
                </h2>
                {!showForm && (
                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="px-5 py-2.5 bg-black text-white text-base font-medium hover:bg-neutral-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    + Add KPI
                  </button>
                )}
              </div>

              {showForm && (
                <div className="border border-neutral-200 p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="kpi-name" className="block text-base font-medium text-black mb-1.5">
                        KPI Name
                      </label>
                      <input
                        id="kpi-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Cost per Lead"
                        className="w-full border border-neutral-300 px-4 py-2.5 text-base text-black bg-white placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label htmlFor="kpi-category" className="block text-base font-medium text-black mb-1.5">
                        Category
                      </label>
                      <select
                        id="kpi-category"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                        className="w-full border border-neutral-300 px-4 py-2.5 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    {/* Unit */}
                    <div>
                      <label htmlFor="kpi-unit" className="block text-base font-medium text-black mb-1.5">
                        Unit
                      </label>
                      <select
                        id="kpi-unit"
                        value={form.unit}
                        onChange={(e) => setForm({ ...form, unit: e.target.value as Unit })}
                        className="w-full border border-neutral-300 px-4 py-2.5 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                      >
                        <option value="number">Number</option>
                        <option value="percentage">Percentage</option>
                        <option value="currency">Currency ($)</option>
                      </select>
                    </div>

                    {/* Target */}
                    <div>
                      <label htmlFor="kpi-target" className="block text-base font-medium text-black mb-1.5">
                        Target Value
                      </label>
                      <input
                        id="kpi-target"
                        type="number"
                        value={form.target || ""}
                        onChange={(e) => setForm({ ...form, target: parseFloat(e.target.value) || 0 })}
                        placeholder="e.g. 500"
                        className="w-full border border-neutral-300 px-4 py-2.5 text-base text-black bg-white placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                      />
                    </div>

                    {/* Direction */}
                    <div className="md:col-span-2">
                      <label htmlFor="kpi-direction" className="block text-base font-medium text-black mb-1.5">
                        Direction
                      </label>
                      <select
                        id="kpi-direction"
                        value={form.direction}
                        onChange={(e) => setForm({ ...form, direction: e.target.value as Direction })}
                        className="w-full border border-neutral-300 px-4 py-2.5 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                      >
                        <option value="higher">Higher is better</option>
                        <option value="lower">Lower is better</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    {editingId ? (
                      <button
                        type="button"
                        onClick={updateKpi}
                        className="px-6 py-2.5 bg-black text-white text-base font-medium hover:bg-neutral-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                      >
                        Update KPI
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={addKpi}
                        className="px-6 py-2.5 bg-black text-white text-base font-medium hover:bg-neutral-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                      >
                        Save KPI
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="px-6 py-2.5 border border-neutral-300 text-base font-medium text-black hover:bg-neutral-100 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </section>
          </Animate>

          {/* ---- Tabs ---- */}
          {kpis.length > 0 && (
            <Animate animation="fade-up">
              <div className="flex flex-wrap gap-0 border-b border-neutral-200" role="tablist" aria-label="KPI views">
                {(["scorecard", "tracking", "dashboard"] as const).map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-base font-medium border-b-2 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      activeTab === tab
                        ? "border-black text-black"
                        : "border-transparent text-neutral-500 hover:text-black"
                    }`}
                  >
                    {tab === "scorecard" ? "KPI Scorecard" : tab === "tracking" ? "Monthly Tracking" : "Dashboard"}
                  </button>
                ))}
              </div>
            </Animate>
          )}

          {/* ---- Category filter ---- */}
          {kpis.length > 0 && activeTab !== "dashboard" && (
            <div className="flex flex-wrap gap-2">
              <label className="sr-only" htmlFor="category-filter">Filter by category</label>
              <select
                id="category-filter"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as Category | "All")}
                className="border border-neutral-300 px-4 py-2 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          )}

          {/* ---- Scorecard Tab ---- */}
          {kpis.length > 0 && activeTab === "scorecard" && (
            <Animate animation="fade-up">
              <section aria-labelledby="scorecard-heading">
                <h2 id="scorecard-heading" className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                  KPI Scorecard
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {filteredKpis.map((kpi) => {
                    const latest = getLatestActual(kpi.monthlyActuals);
                    const pctTarget = latest !== null ? pctOfTarget(latest, kpi.target) : 0;
                    const trend = getTrend(kpi.monthlyActuals);
                    const status = getStatus(kpi);
                    const mom = getMoMChange(kpi.monthlyActuals);

                    return (
                      <div key={kpi.id} className="border border-neutral-200 p-5">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                          {/* KPI info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <p className="font-[family-name:var(--font-display)] text-lg font-bold text-black truncate">
                                {kpi.name}
                              </p>
                              <span className="text-base text-neutral-500 flex-shrink-0">{kpi.category}</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-base">
                              <span className="text-neutral-600">
                                Current: <strong className="text-black">{fmtValue(latest, kpi.unit)}</strong>
                              </span>
                              <span className="text-neutral-600">
                                Target: <strong className="text-black">{fmtValue(kpi.target, kpi.unit)}</strong>
                              </span>
                              <span className="text-neutral-600">
                                {pctTarget.toFixed(1)}% of target
                              </span>
                              {mom !== null && (
                                <span className="text-neutral-600">
                                  MoM: <strong className="text-black">{mom >= 0 ? "+" : ""}{mom.toFixed(1)}%</strong>
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Sparkline */}
                          <div className="flex-shrink-0">
                            <Sparkline data={kpi.monthlyActuals} />
                          </div>

                          {/* Trend + Status */}
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="text-2xl font-bold text-black" aria-label={`Trend: ${trend}`}>
                              {trendArrow(trend)}
                            </span>
                            <span className={`inline-block px-3 py-1 text-base font-medium ${statusBadgeClass(status)}`}>
                              {status}
                            </span>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => startEdit(kpi)}
                              aria-label={`Edit ${kpi.name}`}
                              className="px-3 py-1.5 border border-neutral-300 text-base text-black hover:bg-neutral-100 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => removeKpi(kpi.id)}
                              aria-label={`Remove ${kpi.name}`}
                              className="px-3 py-1.5 border border-neutral-300 text-base text-neutral-600 hover:bg-neutral-100 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-4">
                          <div className="h-2 w-full bg-neutral-100">
                            <div
                              className="h-2 bg-black transition-all"
                              style={{ width: `${Math.min(pctTarget, 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </Animate>
          )}

          {/* ---- Monthly Tracking Tab ---- */}
          {kpis.length > 0 && activeTab === "tracking" && (
            <Animate animation="fade-up">
              <section aria-labelledby="tracking-heading">
                <h2 id="tracking-heading" className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                  Monthly Tracking
                </h2>
                <p className="text-base text-neutral-600 mb-6">
                  Click on a KPI to enter or update monthly values. Up to 12 months of data per KPI.
                </p>
                <div className="space-y-4">
                  {filteredKpis.map((kpi) => {
                    const isExpanded = editingMonthKpiId === kpi.id;
                    return (
                      <div key={kpi.id} className="border border-neutral-200">
                        <button
                          type="button"
                          onClick={() => setEditingMonthKpiId(isExpanded ? null : kpi.id)}
                          aria-expanded={isExpanded}
                          className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        >
                          <div>
                            <p className="font-[family-name:var(--font-display)] text-lg font-bold text-black">
                              {kpi.name}
                            </p>
                            <p className="text-base text-neutral-500">
                              {kpi.category} &middot; Target: {fmtValue(kpi.target, kpi.unit)} &middot; {kpi.direction === "higher" ? "Higher is better" : "Lower is better"}
                            </p>
                          </div>
                          <span className="text-xl font-bold text-neutral-400" aria-hidden="true">
                            {isExpanded ? "−" : "+"}
                          </span>
                        </button>

                        {isExpanded && (
                          <div className="px-5 pb-5">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                              {MONTH_LABELS.map((label, i) => (
                                <div key={i}>
                                  <label
                                    htmlFor={`month-${kpi.id}-${i}`}
                                    className="block text-base font-medium text-neutral-600 mb-1"
                                  >
                                    {label}
                                  </label>
                                  <input
                                    id={`month-${kpi.id}-${i}`}
                                    type="number"
                                    step="any"
                                    value={kpi.monthlyActuals[i] !== null ? kpi.monthlyActuals[i]! : ""}
                                    onChange={(e) => updateMonthly(kpi.id, i, e.target.value)}
                                    placeholder="--"
                                    className="w-full border border-neutral-300 px-3 py-2 text-base text-black bg-white placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                                  />
                                </div>
                              ))}
                            </div>
                            {/* Sparkline preview */}
                            <div className="mt-4 flex items-center gap-4">
                              <span className="text-base text-neutral-500">Trend:</span>
                              <Sparkline data={kpi.monthlyActuals} width={200} height={40} />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            </Animate>
          )}

          {/* ---- Dashboard Tab ---- */}
          {kpis.length > 0 && activeTab === "dashboard" && (
            <Animate animation="fade-up">
              <section aria-labelledby="dashboard-heading">
                <h2 id="dashboard-heading" className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                  Summary Dashboard
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                  <SummaryCard
                    label="Total KPIs"
                    value={String(kpis.length)}
                  />
                  <SummaryCard
                    label="On Target"
                    value={String(summaryStats.onTarget)}
                    sub={kpis.length > 0 ? `${((summaryStats.onTarget / kpis.length) * 100).toFixed(0)}% of total` : undefined}
                  />
                  <SummaryCard
                    label="Below Target"
                    value={String(summaryStats.belowTarget)}
                  />
                  <SummaryCard
                    label="Improving"
                    value={String(summaryStats.improving)}
                    sub="Month-over-month"
                  />
                  <SummaryCard
                    label="Declining"
                    value={String(summaryStats.declining)}
                    sub="Month-over-month"
                  />
                </div>

                {/* Category breakdown */}
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mb-4">
                  By Category
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {CATEGORIES.map((cat) => {
                    const catKpis = kpis.filter((k) => k.category === cat);
                    if (catKpis.length === 0) return null;
                    const onTarget = catKpis.filter((k) => getStatus(k) === "On Target").length;
                    return (
                      <div key={cat} className="border border-neutral-200 p-5">
                        <p className="text-base font-bold text-black mb-1">{cat}</p>
                        <p className="text-base text-neutral-600">
                          {catKpis.length} KPI{catKpis.length !== 1 ? "s" : ""} &middot; {onTarget} on target
                        </p>
                        <div className="mt-3 h-2 w-full bg-neutral-100">
                          <div
                            className="h-2 bg-black transition-all"
                            style={{ width: `${catKpis.length > 0 ? (onTarget / catKpis.length) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Detailed table */}
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mb-4">
                  All KPIs Detail
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-black">
                        <th className="py-3 pr-4 text-base font-bold text-black">KPI</th>
                        <th className="py-3 pr-4 text-base font-bold text-black">Category</th>
                        <th className="py-3 pr-4 text-base font-bold text-black">Current</th>
                        <th className="py-3 pr-4 text-base font-bold text-black">Target</th>
                        <th className="py-3 pr-4 text-base font-bold text-black">% of Target</th>
                        <th className="py-3 pr-4 text-base font-bold text-black">MoM</th>
                        <th className="py-3 pr-4 text-base font-bold text-black">Trend</th>
                        <th className="py-3 text-base font-bold text-black">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kpis.map((kpi) => {
                        const latest = getLatestActual(kpi.monthlyActuals);
                        const pctTarget = latest !== null ? pctOfTarget(latest, kpi.target) : 0;
                        const trend = getTrend(kpi.monthlyActuals);
                        const status = getStatus(kpi);
                        const mom = getMoMChange(kpi.monthlyActuals);
                        return (
                          <tr key={kpi.id} className="border-b border-neutral-200">
                            <td className="py-3 pr-4 text-base text-black font-medium">{kpi.name}</td>
                            <td className="py-3 pr-4 text-base text-neutral-600">{kpi.category}</td>
                            <td className="py-3 pr-4 text-base text-black">{fmtValue(latest, kpi.unit)}</td>
                            <td className="py-3 pr-4 text-base text-black">{fmtValue(kpi.target, kpi.unit)}</td>
                            <td className="py-3 pr-4 text-base text-black">{pctTarget.toFixed(1)}%</td>
                            <td className="py-3 pr-4 text-base text-black">
                              {mom !== null ? `${mom >= 0 ? "+" : ""}${mom.toFixed(1)}%` : "--"}
                            </td>
                            <td className="py-3 pr-4 text-base text-black">{trendArrow(trend)}</td>
                            <td className="py-3">
                              <span className={`inline-block px-3 py-1 text-base font-medium ${statusBadgeClass(status)}`}>
                                {status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            </Animate>
          )}

          {/* ---- Empty state ---- */}
          {kpis.length === 0 && loaded && (
            <Animate animation="fade-up">
              <div className="border border-neutral-200 p-12 text-center">
                <p className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-2">
                  No KPIs tracked yet
                </p>
                <p className="text-base text-neutral-600 mb-6">
                  Add individual KPIs or load a template to get started.
                </p>
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="px-6 py-2.5 bg-black text-white text-base font-medium hover:bg-neutral-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  + Add Your First KPI
                </button>
              </div>
            </Animate>
          )}

          {/* ---- Actions bar ---- */}
          {kpis.length > 0 && (
            <Animate animation="fade-up">
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={exportTxt}
                  className="px-6 py-2.5 bg-black text-white text-base font-medium hover:bg-neutral-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Export as .txt
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Clear all KPIs? This cannot be undone.")) {
                      setKpis([]);
                    }
                  }}
                  className="px-6 py-2.5 border border-neutral-300 text-base font-medium text-black hover:bg-neutral-100 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Clear All
                </button>
              </div>
            </Animate>
          )}

          {/* ---- Educational Section ---- */}
          <Animate animation="fade-up">
            <section className="border-t border-neutral-200 pt-12" aria-labelledby="best-practices-heading">
              <h2 id="best-practices-heading" className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-6">
                KPI Tracking Best Practices
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mb-3">
                    Choose the Right KPIs
                  </h3>
                  <p className="text-base text-neutral-600 leading-relaxed">
                    Not every metric is a KPI. Focus on 5-10 metrics that directly
                    tie to your business objectives. A good KPI is specific,
                    measurable, and actionable. If you cannot influence it through
                    your marketing efforts, it should not be a KPI.
                  </p>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mb-3">
                    Set Realistic Targets
                  </h3>
                  <p className="text-base text-neutral-600 leading-relaxed">
                    Base targets on historical data, industry benchmarks, and
                    available resources. Stretch goals motivate teams, but
                    unrealistic targets lead to discouragement. Review and adjust
                    targets quarterly as conditions change.
                  </p>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mb-3">
                    Track Consistently
                  </h3>
                  <p className="text-base text-neutral-600 leading-relaxed">
                    Record data at the same interval every period. Monthly tracking
                    is the standard for most marketing KPIs. Consistency lets you
                    identify true trends rather than reacting to noise. Missing data
                    points create gaps that make trend analysis unreliable.
                  </p>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mb-3">
                    Act on the Data
                  </h3>
                  <p className="text-base text-neutral-600 leading-relaxed">
                    Tracking KPIs is pointless without action. When a metric falls
                    below target for two consecutive months, investigate root
                    causes. When a metric exceeds target, understand what is working
                    so you can replicate it. Schedule monthly reviews to discuss KPI
                    performance with your team.
                  </p>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mb-3">
                    Understand Direction
                  </h3>
                  <p className="text-base text-neutral-600 leading-relaxed">
                    Some KPIs are better when higher (revenue, conversions, traffic)
                    and some are better when lower (cost per lead, bounce rate, churn
                    rate). Always define direction up front so your team interprets
                    trends correctly and status indicators are accurate.
                  </p>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mb-3">
                    Review and Evolve
                  </h3>
                  <p className="text-base text-neutral-600 leading-relaxed">
                    Your KPI set should evolve as your business grows. What matters
                    at the startup stage differs from growth or scale stage. Remove
                    KPIs that no longer align with goals and add new ones as
                    priorities shift. An annual KPI audit keeps your dashboard
                    relevant.
                  </p>
                </div>
              </div>
            </section>
          </Animate>

          {/* ---- CTA ---- */}
          <Animate animation="fade-up">
            <section aria-label="Need Help Setting Up Your KPIs?" className="border border-neutral-200 p-8 md:p-12 text-center">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-3">
                Need Help Setting Up Your KPIs?
              </h2>
              <p className="text-base text-neutral-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                Our team helps businesses identify the metrics that matter,
                set meaningful targets, and build reporting dashboards that
                drive real decisions.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-3 bg-black text-white text-base font-medium hover:bg-neutral-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Get in Touch
              </Link>
            </section>
          </Animate>
        </div>
      </div>
    
      <ToolCTA
        toolName="Marketing Kpi Tracker"
        services={[
          { title: "Digital Marketing", desc: "Data-driven strategy with transparent reporting and insights.", href: "/services/digital-marketing" },
          { title: "Performance Marketing", desc: "Campaign optimization based on real performance data.", href: "/services/performance-marketing" },
          { title: "SEO", desc: "SEO analytics that show exactly what drives organic growth.", href: "/services/seo" },
        ]}
        relatedTools={[
          { title: "Marketing Goal Setter", href: "/resources/marketing-goal-setter" },
          { title: "Marketing Metrics Benchmark", href: "/resources/marketing-metrics-benchmark" },
          { title: "Marketing Audit Scorecard", href: "/resources/marketing-audit-scorecard" },
          { title: "Marketing Budget Planner", href: "/resources/marketing-budget-planner" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
