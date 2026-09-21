"use client";

import { useState, useCallback, useMemo, useEffect, useId } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Period = "annual" | "monthly";
type Industry = "SaaS" | "E-commerce" | "Professional Services" | "Healthcare" | "Real Estate" | "Education" | "Hospitality" | "Manufacturing";
type CompanySize = "startup" | "smb" | "mid-market" | "enterprise";
type PrimaryGoal = "lead-gen" | "brand-awareness" | "ecommerce-sales" | "customer-retention";
type Maturity = "starting-out" | "growing" | "established" | "scaling";
type Priority = "High" | "Medium" | "Low";
type TemplateName = "lead-gen-heavy" | "brand-awareness" | "ecommerce" | "balanced-growth" | "content-first";
type ActiveView = "allocator" | "comparison" | "quarterly";

interface ChannelData {
  id: string;
  label: string;
  pct: number;
  priority: Priority;
  roiMin: number;
  roiMax: number;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "markit-budget-allocator-v1";

const INDUSTRIES: { value: Industry; label: string }[] = [
  { value: "SaaS", label: "SaaS / Software" },
  { value: "E-commerce", label: "E-commerce / Retail" },
  { value: "Professional Services", label: "Professional Services" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "Education", label: "Education" },
  { value: "Hospitality", label: "Hospitality / Travel" },
  { value: "Manufacturing", label: "Manufacturing / Industrial" },
];

const COMPANY_SIZES: { value: CompanySize; label: string }[] = [
  { value: "startup", label: "Startup" },
  { value: "smb", label: "SMB" },
  { value: "mid-market", label: "Mid-Market" },
  { value: "enterprise", label: "Enterprise" },
];

const GOALS: { value: PrimaryGoal; label: string }[] = [
  { value: "lead-gen", label: "Lead Generation" },
  { value: "brand-awareness", label: "Brand Awareness" },
  { value: "ecommerce-sales", label: "E-Commerce Sales" },
  { value: "customer-retention", label: "Customer Retention" },
];

const MATURITIES: { value: Maturity; label: string }[] = [
  { value: "starting-out", label: "Starting Out" },
  { value: "growing", label: "Growing" },
  { value: "established", label: "Established" },
  { value: "scaling", label: "Scaling" },
];

const TEMPLATES: { value: TemplateName; label: string }[] = [
  { value: "lead-gen-heavy", label: "Lead Gen Heavy" },
  { value: "brand-awareness", label: "Brand Awareness" },
  { value: "ecommerce", label: "E-Commerce" },
  { value: "balanced-growth", label: "Balanced Growth" },
  { value: "content-first", label: "Content-First" },
];

const DEFAULT_CHANNELS: ChannelData[] = [
  { id: "seo", label: "SEO", pct: 15, priority: "High", roiMin: 5, roiMax: 12 },
  { id: "ppc", label: "PPC / Paid Search", pct: 15, priority: "High", roiMin: 2, roiMax: 8 },
  { id: "social-organic", label: "Social Media (Organic)", pct: 8, priority: "Medium", roiMin: 3, roiMax: 7 },
  { id: "paid-social", label: "Paid Social", pct: 12, priority: "Medium", roiMin: 2, roiMax: 6 },
  { id: "content", label: "Content Marketing", pct: 12, priority: "High", roiMin: 4, roiMax: 10 },
  { id: "email", label: "Email Marketing", pct: 10, priority: "Medium", roiMin: 30, roiMax: 45 },
  { id: "video", label: "Video / Creative", pct: 8, priority: "Low", roiMin: 2, roiMax: 6 },
  { id: "pr", label: "PR / Influencer", pct: 8, priority: "Low", roiMin: 3, roiMax: 9 },
  { id: "events", label: "Events", pct: 6, priority: "Low", roiMin: 1, roiMax: 5 },
  { id: "tech", label: "Technology / Tools", pct: 6, priority: "Medium", roiMin: 3, roiMax: 8 },
];

const TEMPLATE_ALLOCATIONS: Record<TemplateName, number[]> = {
  "lead-gen-heavy":   [20, 25, 3, 15, 12, 12, 3, 2, 5, 3],
  "brand-awareness":  [10, 8, 18, 20, 12, 5, 12, 10, 2, 3],
  "ecommerce":        [15, 25, 8, 18, 8, 10, 5, 5, 2, 4],
  "balanced-growth":  [12, 15, 10, 12, 15, 10, 8, 6, 6, 6],
  "content-first":    [20, 5, 12, 5, 25, 12, 10, 5, 2, 4],
};

const TEMPLATE_ROIS: Record<TemplateName, [number, number][]> = {
  "lead-gen-heavy":   [[5,12],[3,9],[2,5],[3,7],[4,10],[30,45],[1,4],[2,6],[2,6],[3,8]],
  "brand-awareness":  [[4,10],[2,5],[4,8],[3,7],[3,8],[25,40],[3,7],[4,10],[1,4],[3,8]],
  "ecommerce":        [[5,12],[4,10],[3,6],[4,9],[3,7],[35,50],[2,5],[3,7],[1,3],[3,8]],
  "balanced-growth":  [[5,12],[3,8],[3,7],[3,7],[4,10],[30,45],[2,6],[3,9],[2,5],[3,8]],
  "content-first":    [[6,14],[2,5],[3,7],[2,5],[5,12],[30,45],[3,7],[3,8],[1,4],[3,8]],
};

const QUARTERLY_WEIGHTS = [
  [0.22, 0.25, 0.25, 0.28], // default seasonal: Q1 ramp, Q4 push
];

const GRAY_SHADES = [
  "#000000", "#1a1a1a", "#333333", "#4d4d4d", "#666666",
  "#808080", "#999999", "#b3b3b3", "#cccccc", "#e6e6e6",
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatPct(n: number): string {
  return `${n}%`;
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function normalizeAllocations(channels: ChannelData[], changedIndex: number): ChannelData[] {
  const total = channels.reduce((s, c) => s + c.pct, 0);
  if (total === 100) return channels;

  const diff = total - 100;
  const others = channels.filter((_, i) => i !== changedIndex && channels[i].pct > 0);
  if (others.length === 0) return channels;

  const othersTotal = others.reduce((s, c) => s + c.pct, 0);
  if (othersTotal === 0) return channels;

  return channels.map((ch, i) => {
    if (i === changedIndex) return ch;
    const share = ch.pct / othersTotal;
    const adjustment = Math.round(diff * share);
    return { ...ch, pct: clamp(ch.pct - adjustment, 0, 100) };
  });
}

/* ------------------------------------------------------------------ */
/*  SVG Pie Chart                                                      */
/* ------------------------------------------------------------------ */

function PieChart({ channels, budget }: { channels: ChannelData[]; budget: number }) {
  const active = channels.filter((c) => c.pct > 0);
  const total = active.reduce((s, c) => s + c.pct, 0);
  if (total === 0) return null;

  let cumulative = 0;
  const slices = active.map((ch, i) => {
    const fraction = ch.pct / total;
    const startAngle = cumulative * 360;
    cumulative += fraction;
    const endAngle = cumulative * 360;
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;
    const x1 = 50 + 40 * Math.cos(startRad);
    const y1 = 50 + 40 * Math.sin(startRad);
    const x2 = 50 + 40 * Math.cos(endRad);
    const y2 = 50 + 40 * Math.sin(endRad);

    const midRad = (((startAngle + endAngle) / 2 - 90) * Math.PI) / 180;
    const labelR = 28;
    const lx = 50 + labelR * Math.cos(midRad);
    const ly = 50 + labelR * Math.sin(midRad);

    const color = GRAY_SHADES[i % GRAY_SHADES.length];

    return { ch, startAngle, endAngle, largeArc, x1, y1, x2, y2, lx, ly, color, fraction };
  });

  return (
    <svg viewBox="0 0 100 100" className="w-full max-w-xs mx-auto" role="img" aria-label="Budget allocation pie chart">
      <title>Budget allocation pie chart</title>
      {slices.length === 1 ? (
        <circle cx="50" cy="50" r="40" fill={slices[0].color} />
      ) : (
        slices.map((s, i) => (
          <path
            key={i}
            d={`M50,50 L${s.x1},${s.y1} A40,40 0 ${s.largeArc},1 ${s.x2},${s.y2} Z`}
            fill={s.color}
            stroke="#fff"
            strokeWidth="0.5"
          >
            <title>{`${s.ch.label}: ${s.ch.pct}% (${formatCurrency(budget * s.ch.pct / 100)})`}</title>
          </path>
        ))
      )}
      {slices.map((s, i) =>
        s.fraction >= 0.05 ? (
          <text
            key={`lbl-${i}`}
            x={s.lx}
            y={s.ly}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-white"
            style={{ fontSize: "3.2px", fontWeight: 700 }}
          >
            {s.ch.pct}%
          </text>
        ) : null
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  SVG Bar Chart (ROI)                                                */
/* ------------------------------------------------------------------ */

function RoiBarChart({ channels }: { channels: ChannelData[] }) {
  const active = channels.filter((c) => c.pct > 0);
  if (active.length === 0) return null;
  const maxRoi = Math.max(...active.map((c) => c.roiMax), 1);
  const barH = 18;
  const gap = 6;
  const labelW = 100;
  const chartW = 340;
  const totalH = active.length * (barH + gap) + 10;

  return (
    <svg
      viewBox={`0 0 ${labelW + chartW + 50} ${totalH}`}
      className="w-full"
      role="img"
      aria-label="Expected ROI by channel bar chart"
    >
      <title>Expected ROI by channel</title>
      {active.map((ch, i) => {
        const y = i * (barH + gap) + 5;
        const minW = (ch.roiMin / maxRoi) * chartW;
        const maxW = (ch.roiMax / maxRoi) * chartW;
        return (
          <g key={ch.id}>
            <text x={labelW - 4} y={y + barH / 2 + 1} textAnchor="end" dominantBaseline="central" style={{ fontSize: "10px", fill: "#000", fontWeight: 600 }}>
              {ch.label}
            </text>
            <rect x={labelW} y={y + 3} width={maxW} height={barH - 6} fill="#e5e5e5" rx="2" />
            <rect x={labelW} y={y + 3} width={minW} height={barH - 6} fill="#000" rx="2" />
            <text x={labelW + maxW + 4} y={y + barH / 2 + 1} dominantBaseline="central" style={{ fontSize: "9px", fill: "#666" }}>
              {ch.roiMin}x&ndash;{ch.roiMax}x
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Pie Chart Legend                                                    */
/* ------------------------------------------------------------------ */

function PieLegend({ channels }: { channels: ChannelData[] }) {
  const active = channels.filter((c) => c.pct > 0);
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-6">
      {active.map((ch, i) => (
        <div key={ch.id} className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-sm flex-shrink-0"
            style={{ backgroundColor: GRAY_SHADES[i % GRAY_SHADES.length] }}
            aria-hidden="true"
          />
          <span className="text-base text-neutral-700">{ch.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function BudgetAllocatorPage() {
  const uid = useId();

  /* --- State ---- */
  const [period, setPeriod] = useState<Period>("annual");
  const [budgetInput, setBudgetInput] = useState("60000");
  const [industry, setIndustry] = useState<Industry>("SaaS");
  const [companySize, setCompanySize] = useState<CompanySize>("smb");
  const [goal, setGoal] = useState<PrimaryGoal>("lead-gen");
  const [maturity, setMaturity] = useState<Maturity>("growing");
  const [channels, setChannels] = useState<ChannelData[]>(DEFAULT_CHANNELS);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateName | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>("allocator");
  const [saved, setSaved] = useState(false);

  const budget = Math.max(0, parseInt(budgetInput.replace(/[^0-9]/g, ""), 10) || 0);
  const annualBudget = period === "annual" ? budget : budget * 12;
  const monthlyBudget = period === "monthly" ? budget : Math.round(budget / 12);

  /* --- Restore from localStorage --- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.period) setPeriod(data.period);
      if (data.budgetInput) setBudgetInput(data.budgetInput);
      if (data.industry) setIndustry(data.industry);
      if (data.companySize) setCompanySize(data.companySize);
      if (data.goal) setGoal(data.goal);
      if (data.maturity) setMaturity(data.maturity);
      if (data.channels) setChannels(data.channels);
      if (data.selectedTemplate) setSelectedTemplate(data.selectedTemplate);
    } catch {
      /* ignore corrupt data */
    }
  }, []);

  /* --- Handlers --- */
  const handleChannelPct = useCallback((index: number, value: number) => {
    setChannels((prev) => {
      const updated = prev.map((ch, i) => (i === index ? { ...ch, pct: clamp(value, 0, 100) } : ch));
      return normalizeAllocations(updated, index);
    });
  }, []);

  const handleChannelPriority = useCallback((index: number, priority: Priority) => {
    setChannels((prev) => prev.map((ch, i) => (i === index ? { ...ch, priority } : ch)));
  }, []);

  const applyTemplate = useCallback((name: TemplateName) => {
    const pcts = TEMPLATE_ALLOCATIONS[name];
    const rois = TEMPLATE_ROIS[name];
    setChannels((prev) =>
      prev.map((ch, i) => ({
        ...ch,
        pct: pcts[i],
        roiMin: rois[i][0],
        roiMax: rois[i][1],
      }))
    );
    setSelectedTemplate(name);
  }, []);

  const handleSave = useCallback(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ period, budgetInput, industry, companySize, goal, maturity, channels, selectedTemplate })
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      /* storage full or unavailable */
    }
  }, [period, budgetInput, industry, companySize, goal, maturity, channels, selectedTemplate]);

  const handleExport = useCallback(() => {
    const lines: string[] = [
      "MARKETING BUDGET ALLOCATION",
      "===========================",
      `Generated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
      "",
      "BUSINESS PROFILE",
      `  Period:       ${period === "annual" ? "Annual" : "Monthly"}`,
      `  Budget:       ${formatCurrency(budget)} (${period})`,
      `  Annual Total: ${formatCurrency(annualBudget)}`,
      `  Industry:     ${INDUSTRIES.find((i) => i.value === industry)?.label}`,
      `  Company Size: ${COMPANY_SIZES.find((c) => c.value === companySize)?.label}`,
      `  Primary Goal: ${GOALS.find((g) => g.value === goal)?.label}`,
      `  Maturity:     ${MATURITIES.find((m) => m.value === maturity)?.label}`,
      selectedTemplate ? `  Template:     ${TEMPLATES.find((t) => t.value === selectedTemplate)?.label}` : "",
      "",
      "CHANNEL ALLOCATION",
      "-------------------",
    ];

    const totalPct = channels.reduce((s, c) => s + c.pct, 0);
    channels.forEach((ch) => {
      const amt = Math.round(annualBudget * (ch.pct / Math.max(totalPct, 1)));
      lines.push(`  ${ch.label.padEnd(24)} ${String(ch.pct).padStart(3)}%   ${formatCurrency(amt).padStart(10)}   Priority: ${ch.priority.padEnd(6)}   ROI: ${ch.roiMin}x-${ch.roiMax}x`);
    });
    lines.push(`  ${"TOTAL".padEnd(24)} ${String(totalPct).padStart(3)}%   ${formatCurrency(annualBudget).padStart(10)}`);

    lines.push("", "QUARTERLY BREAKDOWN (Annual)", "----------------------------");
    const qWeights = QUARTERLY_WEIGHTS[0];
    ["Q1", "Q2", "Q3", "Q4"].forEach((q, qi) => {
      const qBudget = Math.round(annualBudget * qWeights[qi]);
      lines.push(`  ${q}: ${formatCurrency(qBudget)}`);
    });

    lines.push("", "---", "Generated by Markit Media Budget Allocator", "https://themarkitmedia.com/en/resources/budget-allocator");

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "budget-allocation.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [period, budget, annualBudget, industry, companySize, goal, maturity, channels, selectedTemplate]);

  /* --- Derived --- */
  const totalPct = useMemo(() => channels.reduce((s, c) => s + c.pct, 0), [channels]);

  const templateChannels: ChannelData[] | null = useMemo(() => {
    if (!selectedTemplate) return null;
    const pcts = TEMPLATE_ALLOCATIONS[selectedTemplate];
    const rois = TEMPLATE_ROIS[selectedTemplate];
    return DEFAULT_CHANNELS.map((ch, i) => ({
      ...ch,
      pct: pcts[i],
      roiMin: rois[i][0],
      roiMax: rois[i][1],
    }));
  }, [selectedTemplate]);

  const quarterlyData = useMemo(() => {
    const qWeights = QUARTERLY_WEIGHTS[0];
    return qWeights.map((w, qi) => {
      const qBudget = Math.round(annualBudget * w);
      const perChannel = channels.map((ch) => ({
        label: ch.label,
        amount: Math.round(qBudget * (ch.pct / Math.max(totalPct, 1))),
      }));
      return { quarter: `Q${qi + 1}`, total: qBudget, channels: perChannel };
    });
  }, [annualBudget, channels, totalPct]);

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <article className="min-h-screen bg-white">
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Budget Allocator" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-16 pb-8">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Interactive Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing Budget Allocator
            </h1>
            <SectionDesc>
              Distribute your marketing budget across ten key channels using data-driven templates.
              Compare strategies, visualize allocations, and export a quarterly plan.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Business Profile */}
      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up" delay={100}>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-8">
              Business Profile
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Budget + Period */}
              <div>
                <label htmlFor={`${uid}-budget`} className="block text-base font-bold text-black mb-2">
                  Total Budget
                </label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-base font-bold">$</span>
                    <input
                      id={`${uid}-budget`}
                      type="text"
                      inputMode="numeric"
                      value={budgetInput}
                      onChange={(e) => setBudgetInput(e.target.value.replace(/[^0-9]/g, ""))}
                      className="w-full pl-8 pr-4 py-3 border border-neutral-300 bg-white text-base text-black font-bold focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                    />
                  </div>
                  <fieldset className="flex" aria-label="Budget period">
                    <legend className="sr-only">Budget period</legend>
                    {(["annual", "monthly"] as Period[]).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPeriod(p)}
                        aria-pressed={period === p}
                        className={`px-4 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                          period === p
                            ? "bg-black text-white"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                        } ${p === "annual" ? "border border-r-0 border-neutral-300" : "border border-neutral-300"}`}
                      >
                        {p === "annual" ? "Annual" : "Monthly"}
                      </button>
                    ))}
                  </fieldset>
                </div>
                <p className="text-base text-neutral-500 mt-2">
                  {period === "annual"
                    ? `${formatCurrency(monthlyBudget)}/month`
                    : `${formatCurrency(annualBudget)}/year`}
                </p>
              </div>

              {/* Industry */}
              <div>
                <label htmlFor={`${uid}-industry`} className="block text-base font-bold text-black mb-2">
                  Industry
                </label>
                <select
                  id={`${uid}-industry`}
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value as Industry)}
                  className="w-full px-4 py-3 border border-neutral-300 bg-white text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 appearance-none"
                >
                  {INDUSTRIES.map((i) => (
                    <option key={i.value} value={i.value}>{i.label}</option>
                  ))}
                </select>
              </div>

              {/* Company Size */}
              <fieldset>
                <legend className="block text-base font-bold text-black mb-3">Company Size</legend>
                <div className="flex flex-wrap gap-2">
                  {COMPANY_SIZES.map((cs) => (
                    <button
                      key={cs.value}
                      type="button"
                      onClick={() => setCompanySize(cs.value)}
                      aria-pressed={companySize === cs.value}
                      className={`px-5 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                        companySize === cs.value
                          ? "bg-black text-white"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      {cs.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Primary Goal */}
              <fieldset>
                <legend className="block text-base font-bold text-black mb-3">Primary Goal</legend>
                <div className="flex flex-wrap gap-2">
                  {GOALS.map((g) => (
                    <button
                      key={g.value}
                      type="button"
                      onClick={() => setGoal(g.value)}
                      aria-pressed={goal === g.value}
                      className={`px-5 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                        goal === g.value
                          ? "bg-black text-white"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Maturity */}
              <fieldset className="md:col-span-2">
                <legend className="block text-base font-bold text-black mb-3">Current Maturity</legend>
                <div className="flex flex-wrap gap-2">
                  {MATURITIES.map((m) => (
                    <button
                      key={m.value}
                      type="button"
                      onClick={() => setMaturity(m.value)}
                      aria-pressed={maturity === m.value}
                      className={`px-5 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                        maturity === m.value
                          ? "bg-black text-white"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          </Animate>
        </div>
      </section>

      {/* Templates */}
      <section className="px-6 lg:px-12 py-8 bg-neutral-50">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-2">
              Allocation Templates
            </h2>
            <p className="text-base text-neutral-500 mb-6">
              Start from a proven template, then customize to fit your needs.
            </p>
            <div className="flex flex-wrap gap-3">
              {TEMPLATES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => applyTemplate(t.value)}
                  aria-pressed={selectedTemplate === t.value}
                  className={`px-6 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                    selectedTemplate === t.value
                      ? "bg-black text-white"
                      : "bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-100"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* View Tabs */}
      <section className="px-6 lg:px-12 pt-8">
        <div className="max-w-5xl mx-auto">
          <nav aria-label="Tool views" className="flex gap-1 border-b border-neutral-200">
            {([
              { key: "allocator" as ActiveView, label: "Channel Allocator" },
              { key: "comparison" as ActiveView, label: "Comparison View" },
              { key: "quarterly" as ActiveView, label: "Quarterly Breakdown" },
            ]).map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveView(tab.key)}
                aria-selected={activeView === tab.key}
                role="tab"
                className={`px-6 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                  activeView === tab.key
                    ? "border-b-2 border-black text-black"
                    : "text-neutral-500 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Allocator View */}
      {activeView === "allocator" && (
        <section className="px-6 lg:px-12 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Channel Sliders */}
              <div className="lg:col-span-3 space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                    Channel Allocation
                  </h2>
                  <span className={`text-base font-bold ${totalPct === 100 ? "text-black" : "text-neutral-500"}`}>
                    Total: {totalPct}%
                  </span>
                </div>
                {totalPct !== 100 && (
                  <p className="text-base text-neutral-500" role="status">
                    Allocations should total 100%. Currently at {totalPct}%.
                  </p>
                )}

                {channels.map((ch, i) => {
                  const amount = Math.round(annualBudget * (ch.pct / Math.max(totalPct, 1)));
                  return (
                    <div key={ch.id} className="border border-neutral-200 bg-white p-5">
                      <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                        <span className="text-base font-bold text-black">{ch.label}</span>
                        <span className="text-base font-bold text-black">
                          {formatPct(ch.pct)} &middot; {formatCurrency(amount)}
                          {period === "annual" ? "/yr" : ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mb-3">
                        <label htmlFor={`${uid}-slider-${ch.id}`} className="sr-only">
                          {ch.label} percentage
                        </label>
                        <input
                          id={`${uid}-slider-${ch.id}`}
                          type="range"
                          min={0}
                          max={100}
                          step={1}
                          value={ch.pct}
                          onChange={(e) => handleChannelPct(i, parseInt(e.target.value, 10))}
                          className="flex-1 accent-black h-2"
                        />
                        <label htmlFor={`${uid}-num-${ch.id}`} className="sr-only">
                          {ch.label} percentage number input
                        </label>
                        <input
                          id={`${uid}-num-${ch.id}`}
                          type="number"
                          min={0}
                          max={100}
                          value={ch.pct}
                          onChange={(e) => handleChannelPct(i, parseInt(e.target.value, 10) || 0)}
                          className="w-16 px-2 py-1 border border-neutral-300 text-base text-center text-black font-bold focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        />
                      </div>
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <fieldset className="flex items-center gap-2" aria-label={`${ch.label} priority`}>
                          <legend className="sr-only">{ch.label} priority</legend>
                          {(["High", "Medium", "Low"] as Priority[]).map((p) => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => handleChannelPriority(i, p)}
                              aria-pressed={ch.priority === p}
                              className={`px-3 py-1.5 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                                ch.priority === p
                                  ? "bg-black text-white"
                                  : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </fieldset>
                        <span className="text-base text-neutral-500">
                          Expected ROI: {ch.roiMin}x&ndash;{ch.roiMax}x
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Visualizations */}
              <div className="lg:col-span-2 space-y-10">
                <div className="sticky top-24">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                    Allocation Overview
                  </h2>
                  <div className="border border-neutral-200 bg-white p-6">
                    <PieChart channels={channels} budget={annualBudget} />
                    <PieLegend channels={channels} />
                    <div className="flex justify-between items-center pt-4 mt-4 border-t border-neutral-200">
                      <span className="text-base font-bold text-black">Annual Total</span>
                      <span className="text-lg font-extrabold text-black">{formatCurrency(annualBudget)}</span>
                    </div>
                  </div>

                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mt-10 mb-4">
                    Expected ROI by Channel
                  </h2>
                  <div className="border border-neutral-200 bg-white p-6 overflow-x-auto">
                    <RoiBarChart channels={channels} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Comparison View */}
      {activeView === "comparison" && (
        <section className="px-6 lg:px-12 py-8">
          <div className="max-w-5xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-2">
                Current vs. Template Comparison
              </h2>
              {!selectedTemplate ? (
                <p className="text-base text-neutral-500 mt-4">
                  Select a template above to compare against your current allocation.
                </p>
              ) : (
                <>
                  <p className="text-base text-neutral-500 mb-8">
                    Your current allocation compared to the{" "}
                    <strong className="text-black">{TEMPLATES.find((t) => t.value === selectedTemplate)?.label}</strong>{" "}
                    template.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-black">
                          <th className="text-left text-base font-bold text-black py-3 pr-4">Channel</th>
                          <th className="text-right text-base font-bold text-black py-3 px-4">Your %</th>
                          <th className="text-right text-base font-bold text-black py-3 px-4">Your Amount</th>
                          <th className="text-right text-base font-bold text-black py-3 px-4">Template %</th>
                          <th className="text-right text-base font-bold text-black py-3 px-4">Template Amount</th>
                          <th className="text-right text-base font-bold text-black py-3 pl-4">Difference</th>
                        </tr>
                      </thead>
                      <tbody>
                        {channels.map((ch, i) => {
                          const tCh = templateChannels?.[i];
                          const yourAmt = Math.round(annualBudget * (ch.pct / Math.max(totalPct, 1)));
                          const tPct = tCh?.pct ?? 0;
                          const tAmt = Math.round(annualBudget * (tPct / 100));
                          const diff = ch.pct - tPct;
                          return (
                            <tr key={ch.id} className="border-b border-neutral-200">
                              <td className="text-base font-bold text-black py-3 pr-4">{ch.label}</td>
                              <td className="text-base text-right text-neutral-700 py-3 px-4">{ch.pct}%</td>
                              <td className="text-base text-right text-neutral-700 py-3 px-4">{formatCurrency(yourAmt)}</td>
                              <td className="text-base text-right text-neutral-700 py-3 px-4">{tPct}%</td>
                              <td className="text-base text-right text-neutral-700 py-3 px-4">{formatCurrency(tAmt)}</td>
                              <td className={`text-base text-right font-bold py-3 pl-4 ${diff > 0 ? "text-neutral-900" : diff < 0 ? "text-neutral-500" : "text-neutral-400"}`}>
                                {diff > 0 ? "+" : ""}{diff}%
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Side-by-side pie charts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4 text-center">
                        Your Allocation
                      </h3>
                      <PieChart channels={channels} budget={annualBudget} />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4 text-center">
                        {TEMPLATES.find((t) => t.value === selectedTemplate)?.label} Template
                      </h3>
                      {templateChannels && <PieChart channels={templateChannels} budget={annualBudget} />}
                    </div>
                  </div>
                </>
              )}
            </Animate>
          </div>
        </section>
      )}

      {/* Quarterly Breakdown */}
      {activeView === "quarterly" && (
        <section className="px-6 lg:px-12 py-8">
          <div className="max-w-5xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-2">
                Quarterly Breakdown
              </h2>
              <p className="text-base text-neutral-500 mb-8">
                Annual budget of {formatCurrency(annualBudget)} distributed across quarters with seasonal adjustments
                (Q1: 22%, Q2: 25%, Q3: 25%, Q4: 28%).
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-black">
                      <th className="text-left text-base font-bold text-black py-3 pr-4">Channel</th>
                      {quarterlyData.map((q) => (
                        <th key={q.quarter} className="text-right text-base font-bold text-black py-3 px-4">
                          {q.quarter}
                        </th>
                      ))}
                      <th className="text-right text-base font-bold text-black py-3 pl-4">Annual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channels.filter((c) => c.pct > 0).map((ch, ci) => (
                      <tr key={ch.id} className="border-b border-neutral-200">
                        <td className="text-base font-bold text-black py-3 pr-4">{ch.label}</td>
                        {quarterlyData.map((q) => (
                          <td key={q.quarter} className="text-base text-right text-neutral-700 py-3 px-4">
                            {formatCurrency(q.channels.find((qc) => qc.label === ch.label)?.amount ?? 0)}
                          </td>
                        ))}
                        <td className="text-base text-right font-bold text-black py-3 pl-4">
                          {formatCurrency(Math.round(annualBudget * (ch.pct / Math.max(totalPct, 1))))}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-black">
                      <td className="text-base font-extrabold text-black py-3 pr-4">Total</td>
                      {quarterlyData.map((q) => (
                        <td key={q.quarter} className="text-base text-right font-extrabold text-black py-3 px-4">
                          {formatCurrency(q.total)}
                        </td>
                      ))}
                      <td className="text-base text-right font-extrabold text-black py-3 pl-4">
                        {formatCurrency(annualBudget)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Quarterly bar visual */}
              <div className="mt-10 grid grid-cols-4 gap-4">
                {quarterlyData.map((q) => (
                  <div key={q.quarter} className="border border-neutral-200 bg-white p-4">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-1">
                      {q.quarter}
                    </h3>
                    <p className="text-base font-bold text-black mb-3">{formatCurrency(q.total)}</p>
                    <div className="space-y-1.5">
                      {q.channels.filter((c) => c.amount > 0).map((c) => {
                        const frac = c.amount / Math.max(q.total, 1);
                        return (
                          <div key={c.label}>
                            <div className="flex justify-between text-base text-neutral-600 mb-0.5">
                              <span className="truncate mr-2">{c.label}</span>
                              <span className="flex-shrink-0">{formatCurrency(c.amount)}</span>
                            </div>
                            <div className="w-full bg-neutral-100 h-2">
                              <div className="h-full bg-black" style={{ width: `${frac * 100}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* Actions Bar */}
      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-4">
          <button
            type="button"
            onClick={handleSave}
            className="px-8 py-4 bg-black text-white text-base font-bold transition-colors motion-reduce:transition-none hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
          >
            {saved ? "Saved" : "Save to Browser"}
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="px-8 py-4 bg-white text-black text-base font-bold border border-neutral-300 transition-colors motion-reduce:transition-none hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
          >
            Export as .txt
          </button>
        </div>
      </section>

      {/* Educational Section */}
      <section className="px-6 lg:px-12 py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-8">
              Budget Allocation Best Practices
            </h2>
            <div className="space-y-8">
              {[
                {
                  title: "Follow the 70/20/10 Rule",
                  body: "Allocate 70% of your budget to proven channels that consistently deliver results, 20% to promising channels you are actively testing, and 10% to experimental initiatives. This framework balances reliability with growth potential and keeps your strategy evolving.",
                },
                {
                  title: "Align Spend with the Buyer Journey",
                  body: "Map your channels to funnel stages. Brand awareness channels (social, PR, video) feed the top of the funnel, while PPC and email nurture mid-funnel consideration. Retargeting and email automation close the loop at the bottom. Under-investing at any stage creates leaks in your pipeline.",
                },
                {
                  title: "Benchmark Against Industry Averages",
                  body: "Most B2B companies spend 2-5% of revenue on marketing, while B2C companies typically invest 5-10%. Startups seeking aggressive growth may allocate 15-20% of revenue. Use these benchmarks as a starting point, then adjust based on competitive pressure and growth targets.",
                },
                {
                  title: "Review and Rebalance Quarterly",
                  body: "Marketing performance shifts over time. A channel delivering strong ROI today may plateau in six months. Schedule quarterly reviews to reallocate budget from underperformers to channels gaining momentum. Use attribution data, not assumptions, to drive these decisions.",
                },
                {
                  title: "Account for Seasonal Patterns",
                  body: "Most businesses see demand fluctuations throughout the year. Increase paid media budgets ahead of peak seasons to capture demand. Pull back on acquisition spend during slow periods and redirect that budget toward retention and content that builds long-term organic traffic.",
                },
                {
                  title: "Do Not Neglect Technology Spend",
                  body: "Analytics platforms, CRM systems, automation tools, and attribution software are force multipliers. Allocating 5-10% of your marketing budget to technology ensures you can measure, optimize, and scale the remaining 90-95% more effectively.",
                },
              ].map((item) => (
                <div key={item.title} className="border-l-2 border-black pl-6">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                    {item.title}
                  </h3>
                  <p className="text-base text-neutral-600 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need a Custom Media Plan?
            </h2>
            <p className="text-lg text-neutral-400 mt-4 mb-8">
              This allocator gives you a starting framework. Let our team build a detailed,
              data-backed media plan tailored to your market, audience, and revenue goals.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Get a Custom Strategy &rarr;
            </Link>
          </Animate>
        </div>
      </section>
          
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/marketing-budget-planner" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Budget Planner</Link>
                <Link href="/resources/budget-calculator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Budget Calculator</Link>
                <Link href="/resources/marketing-expense-tracker" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Expense Tracker</Link>
                <Link href="/resources/pricing-calculator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Pricing Calculator</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Budget Allocator",
          description: "Allocate your marketing budget across channels using data-driven templates. Compare allocation strategies and optimize for your goals.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    </article>
  );
}
