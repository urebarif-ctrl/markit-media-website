"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { ToolCTA } from "@/components/tool-cta";
import { Animate } from "@/components/animate";
import { SectionLabel } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Channel =
  | "Google Ads"
  | "Meta Ads"
  | "Email"
  | "SEO"
  | "Content"
  | "Social"
  | "Influencer"
  | "Display";

interface MetricRow {
  label: string;
  key: string;
  planned: number;
  actual: number;
  prefix?: string;
  suffix?: string;
}

interface BulletItem {
  id: string;
  text: string;
}

interface ActionItem {
  id: string;
  text: string;
  owner: string;
  deadline: string;
}

interface Debrief {
  id: string;
  name: string;
  channel: Channel;
  startDate: string;
  endDate: string;
  budgetSpent: number;
  objective: string;
  metrics: MetricRow[];
  wins: BulletItem[];
  misses: BulletItem[];
  lessons: BulletItem[];
  actions: ActionItem[];
  savedAt: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const CHANNELS: Channel[] = [
  "Google Ads",
  "Meta Ads",
  "Email",
  "SEO",
  "Content",
  "Social",
  "Influencer",
  "Display",
];

const STORAGE_KEY = "markit-campaign-debriefs";
const MAX_SAVED = 5;

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function defaultMetrics(): MetricRow[] {
  return [
    { label: "Impressions", key: "impressions", planned: 0, actual: 0 },
    { label: "Clicks", key: "clicks", planned: 0, actual: 0 },
    { label: "Conversions", key: "conversions", planned: 0, actual: 0 },
    { label: "Revenue", key: "revenue", planned: 0, actual: 0, prefix: "$" },
    { label: "CPC", key: "cpc", planned: 0, actual: 0, prefix: "$" },
    { label: "CPM", key: "cpm", planned: 0, actual: 0, prefix: "$" },
    { label: "CPA", key: "cpa", planned: 0, actual: 0, prefix: "$" },
    { label: "ROAS", key: "roas", planned: 0, actual: 0, suffix: "x" },
  ];
}

function sampleDebrief(): Omit<Debrief, "id" | "savedAt"> {
  return {
    name: "Q3 Brand Awareness Push",
    channel: "Google Ads",
    startDate: "2026-07-01",
    endDate: "2026-09-15",
    budgetSpent: 12500,
    objective: "Drive brand awareness and generate qualified leads for enterprise SaaS product launch",
    metrics: [
      { label: "Impressions", key: "impressions", planned: 500000, actual: 620000 },
      { label: "Clicks", key: "clicks", planned: 15000, actual: 13200 },
      { label: "Conversions", key: "conversions", planned: 300, actual: 275 },
      { label: "Revenue", key: "revenue", planned: 45000, actual: 41250, prefix: "$" },
      { label: "CPC", key: "cpc", planned: 0.83, actual: 0.95, prefix: "$" },
      { label: "CPM", key: "cpm", planned: 25, actual: 20.16, prefix: "$" },
      { label: "CPA", key: "cpa", planned: 41.67, actual: 45.45, prefix: "$" },
      { label: "ROAS", key: "roas", planned: 3.6, actual: 3.3, suffix: "x" },
    ],
    wins: [
      { id: uid(), text: "Impressions exceeded target by 24% thanks to refined audience expansion" },
      { id: uid(), text: "CPM came in 19% below plan, making reach very cost-efficient" },
      { id: uid(), text: "Video ad format outperformed static by 3x on engagement rate" },
    ],
    misses: [
      { id: uid(), text: "Click-through rate was lower than projected, indicating ad fatigue in weeks 6-8" },
      { id: uid(), text: "CPA exceeded target by 9%, driven by underperforming remarketing segment" },
      { id: uid(), text: "Mobile landing page had 58% bounce rate vs 32% on desktop" },
    ],
    lessons: [
      { id: uid(), text: "Rotate creative every 2 weeks to prevent ad fatigue" },
      { id: uid(), text: "Mobile-first landing page optimization is critical for Google Ads traffic" },
      { id: uid(), text: "Audience expansion works well for awareness but needs tighter controls for conversion goals" },
    ],
    actions: [
      { id: uid(), text: "Redesign mobile landing page with simplified form", owner: "Design Team", deadline: "2026-10-15" },
      { id: uid(), text: "Build creative rotation calendar for Q4 campaigns", owner: "Creative Lead", deadline: "2026-10-01" },
      { id: uid(), text: "Audit remarketing audiences and exclude low-intent segments", owner: "PPC Manager", deadline: "2026-09-30" },
    ],
  };
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function variancePct(planned: number, actual: number): number {
  if (planned === 0) return 0;
  return ((actual - planned) / Math.abs(planned)) * 100;
}

/** For cost metrics (CPC, CPM, CPA), lower actual is better.
 *  For all others, higher actual is better. */
function metricMet(key: string, planned: number, actual: number): boolean {
  if (planned === 0 && actual === 0) return true;
  const costMetrics = ["cpc", "cpm", "cpa"];
  if (costMetrics.includes(key)) {
    return actual <= planned;
  }
  return actual >= planned;
}

function campaignGrade(metrics: MetricRow[]): string {
  const scorable = metrics.filter((m) => m.planned > 0 || m.actual > 0);
  if (scorable.length === 0) return "--";
  const metCount = scorable.filter((m) => metricMet(m.key, m.planned, m.actual)).length;
  const ratio = metCount / scorable.length;
  if (ratio >= 0.9) return "A";
  if (ratio >= 0.75) return "B";
  if (ratio >= 0.6) return "C";
  if (ratio >= 0.4) return "D";
  return "F";
}

function fmtMetricValue(m: MetricRow, value: number): string {
  const prefix = m.prefix || "";
  const suffix = m.suffix || "";
  if (prefix === "$") {
    return prefix + value.toLocaleString("en-US", { minimumFractionDigits: value % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 });
  }
  return prefix + value.toLocaleString("en-US", { maximumFractionDigits: 2 }) + suffix;
}

function generateSummary(
  name: string,
  channel: Channel,
  startDate: string,
  endDate: string,
  budgetSpent: number,
  objective: string,
  metrics: MetricRow[],
  wins: BulletItem[],
  misses: BulletItem[],
  lessons: BulletItem[],
  actions: ActionItem[]
): string {
  const grade = campaignGrade(metrics);
  const scorable = metrics.filter((m) => m.planned > 0 || m.actual > 0);
  const metCount = scorable.filter((m) => metricMet(m.key, m.planned, m.actual)).length;

  const dateRange =
    startDate && endDate
      ? `from ${new Date(startDate + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} to ${new Date(endDate + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
      : "over the campaign period";

  const budgetStr = budgetSpent > 0 ? `$${budgetSpent.toLocaleString("en-US")}` : "an unspecified budget";

  let summary = `The "${name || "Untitled Campaign"}" campaign ran on ${channel} ${dateRange} with ${budgetStr} in spend.`;

  if (objective) {
    summary += ` The primary objective was to ${objective.charAt(0).toLowerCase()}${objective.slice(1)}${objective.endsWith(".") ? "" : "."}`;
  }

  if (scorable.length > 0) {
    summary += ` Of ${scorable.length} tracked metrics, ${metCount} met or exceeded their targets, resulting in an overall grade of ${grade}.`;
  }

  if (wins.length > 0) {
    summary += ` Key wins included: ${wins.map((w) => w.text).join("; ")}.`;
  }

  if (misses.length > 0) {
    summary += ` Areas that fell short: ${misses.map((m) => m.text).join("; ")}.`;
  }

  if (lessons.length > 0) {
    summary += ` Lessons learned: ${lessons.map((l) => l.text).join("; ")}.`;
  }

  if (actions.length > 0) {
    summary += ` ${actions.length} action item${actions.length === 1 ? " has" : "s have"} been identified for follow-through.`;
  }

  return summary;
}

function exportAsTxt(
  name: string,
  channel: Channel,
  startDate: string,
  endDate: string,
  budgetSpent: number,
  objective: string,
  metrics: MetricRow[],
  wins: BulletItem[],
  misses: BulletItem[],
  lessons: BulletItem[],
  actions: ActionItem[],
  summary: string,
  grade: string
): void {
  const lines: string[] = [];
  lines.push("CAMPAIGN DEBRIEF");
  lines.push("=".repeat(50));
  lines.push("");
  lines.push(`Campaign: ${name || "Untitled"}`);
  lines.push(`Channel: ${channel}`);
  lines.push(`Date Range: ${startDate || "--"} to ${endDate || "--"}`);
  lines.push(`Budget Spent: $${budgetSpent.toLocaleString("en-US")}`);
  lines.push(`Objective: ${objective || "--"}`);
  lines.push(`Overall Grade: ${grade}`);
  lines.push("");
  lines.push("PERFORMANCE METRICS");
  lines.push("-".repeat(50));
  for (const m of metrics) {
    const v = variancePct(m.planned, m.actual);
    const met = metricMet(m.key, m.planned, m.actual);
    lines.push(
      `${m.label}: Planned ${fmtMetricValue(m, m.planned)} | Actual ${fmtMetricValue(m, m.actual)} | Variance ${v >= 0 ? "+" : ""}${v.toFixed(1)}% | ${met ? "MET" : "MISSED"}`
    );
  }
  lines.push("");
  if (wins.length > 0) {
    lines.push("WHAT WORKED");
    lines.push("-".repeat(50));
    wins.forEach((w) => lines.push(`  * ${w.text}`));
    lines.push("");
  }
  if (misses.length > 0) {
    lines.push("WHAT DIDN'T WORK");
    lines.push("-".repeat(50));
    misses.forEach((m) => lines.push(`  * ${m.text}`));
    lines.push("");
  }
  if (lessons.length > 0) {
    lines.push("LESSONS LEARNED");
    lines.push("-".repeat(50));
    lessons.forEach((l) => lines.push(`  * ${l.text}`));
    lines.push("");
  }
  if (actions.length > 0) {
    lines.push("NEXT STEPS");
    lines.push("-".repeat(50));
    actions.forEach((a) => lines.push(`  * ${a.text} [Owner: ${a.owner || "--"}, Deadline: ${a.deadline || "--"}]`));
    lines.push("");
  }
  lines.push("EXECUTIVE SUMMARY");
  lines.push("-".repeat(50));
  lines.push(summary);
  lines.push("");
  lines.push(`Generated by Markit Media Campaign Debrief Tool | ${new Date().toLocaleDateString("en-US")}`);

  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${(name || "campaign").replace(/\s+/g, "-").toLowerCase()}-debrief.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ------------------------------------------------------------------ */
/*  Reusable sub-components                                            */
/* ------------------------------------------------------------------ */

const inputClass =
  "w-full border border-neutral-300 bg-white px-4 py-3 text-base text-black placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";
const selectClass =
  "w-full border border-neutral-300 bg-white px-4 py-3 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";
const btnPrimary =
  "inline-flex items-center justify-center border-2 border-black bg-black text-white px-6 py-3 text-base font-bold tracking-wide hover:bg-white hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";
const btnSecondary =
  "inline-flex items-center justify-center border-2 border-neutral-300 bg-white text-black px-6 py-3 text-base font-bold tracking-wide hover:border-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";
const btnDanger =
  "inline-flex items-center justify-center border-2 border-neutral-300 bg-white text-neutral-600 px-4 py-2 text-base hover:border-black hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";

function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-base font-bold text-black mb-1">
      {children}
    </label>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function CampaignDebriefPage() {
  /* ---- State: campaign details ---- */
  const sample = sampleDebrief();
  const [name, setName] = useState(sample.name);
  const [channel, setChannel] = useState<Channel>(sample.channel);
  const [startDate, setStartDate] = useState(sample.startDate);
  const [endDate, setEndDate] = useState(sample.endDate);
  const [budgetSpent, setBudgetSpent] = useState(sample.budgetSpent);
  const [objective, setObjective] = useState(sample.objective);

  /* ---- State: metrics ---- */
  const [metrics, setMetrics] = useState<MetricRow[]>(sample.metrics);

  /* ---- State: qualitative sections ---- */
  const [wins, setWins] = useState<BulletItem[]>(sample.wins);
  const [misses, setMisses] = useState<BulletItem[]>(sample.misses);
  const [lessons, setLessons] = useState<BulletItem[]>(sample.lessons);
  const [actions, setActions] = useState<ActionItem[]>(sample.actions);

  /* ---- State: saved debriefs ---- */
  const [savedDebriefs, setSavedDebriefs] = useState<Debrief[]>([]);
  const [loadedId, setLoadedId] = useState<string | null>(null);

  /* ---- Load saved debriefs from localStorage ---- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: Debrief[] = JSON.parse(raw);
        setSavedDebriefs(parsed);
      }
    } catch {
      /* ignore corrupt data */
    }
  }, []);

  /* ---- Derived ---- */
  const grade = useMemo(() => campaignGrade(metrics), [metrics]);
  const summary = useMemo(
    () => generateSummary(name, channel, startDate, endDate, budgetSpent, objective, metrics, wins, misses, lessons, actions),
    [name, channel, startDate, endDate, budgetSpent, objective, metrics, wins, misses, lessons, actions]
  );

  /* ---- Metric handlers ---- */
  const updateMetric = useCallback(
    (index: number, field: "planned" | "actual", value: string) => {
      setMetrics((prev) => {
        const next = [...prev];
        const parsed = parseFloat(value);
        next[index] = { ...next[index], [field]: isNaN(parsed) ? 0 : parsed };
        return next;
      });
    },
    []
  );

  /* ---- Bullet list handlers ---- */
  const addBullet = useCallback(
    (setter: React.Dispatch<React.SetStateAction<BulletItem[]>>) => {
      setter((prev) => [...prev, { id: uid(), text: "" }]);
    },
    []
  );

  const updateBullet = useCallback(
    (setter: React.Dispatch<React.SetStateAction<BulletItem[]>>, id: string, text: string) => {
      setter((prev) => prev.map((b) => (b.id === id ? { ...b, text } : b)));
    },
    []
  );

  const removeBullet = useCallback(
    (setter: React.Dispatch<React.SetStateAction<BulletItem[]>>, id: string) => {
      setter((prev) => prev.filter((b) => b.id !== id));
    },
    []
  );

  /* ---- Action item handlers ---- */
  const addAction = useCallback(() => {
    setActions((prev) => [...prev, { id: uid(), text: "", owner: "", deadline: "" }]);
  }, []);

  const updateAction = useCallback(
    (id: string, field: "text" | "owner" | "deadline", value: string) => {
      setActions((prev) => prev.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
    },
    []
  );

  const removeAction = useCallback((id: string) => {
    setActions((prev) => prev.filter((a) => a.id !== id));
  }, []);

  /* ---- Save / Load / Delete ---- */
  const saveDebrief = useCallback(() => {
    const debrief: Debrief = {
      id: loadedId || uid(),
      name,
      channel,
      startDate,
      endDate,
      budgetSpent,
      objective,
      metrics,
      wins,
      misses,
      lessons,
      actions,
      savedAt: new Date().toISOString(),
    };

    setSavedDebriefs((prev) => {
      const filtered = prev.filter((d) => d.id !== debrief.id);
      const next = [debrief, ...filtered].slice(0, MAX_SAVED);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    setLoadedId(debrief.id);
  }, [loadedId, name, channel, startDate, endDate, budgetSpent, objective, metrics, wins, misses, lessons, actions]);

  const loadDebrief = useCallback((d: Debrief) => {
    setName(d.name);
    setChannel(d.channel);
    setStartDate(d.startDate);
    setEndDate(d.endDate);
    setBudgetSpent(d.budgetSpent);
    setObjective(d.objective);
    setMetrics(d.metrics);
    setWins(d.wins);
    setMisses(d.misses);
    setLessons(d.lessons);
    setActions(d.actions);
    setLoadedId(d.id);
  }, []);

  const deleteDebrief = useCallback((id: string) => {
    setSavedDebriefs((prev) => {
      const next = prev.filter((d) => d.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    setLoadedId((prev) => (prev === id ? null : prev));
  }, []);

  const resetForm = useCallback(() => {
    setName("");
    setChannel("Google Ads");
    setStartDate("");
    setEndDate("");
    setBudgetSpent(0);
    setObjective("");
    setMetrics(defaultMetrics());
    setWins([]);
    setMisses([]);
    setLessons([]);
    setActions([]);
    setLoadedId(null);
  }, []);

  /* ---- Export handler ---- */
  const handleExport = useCallback(() => {
    exportAsTxt(name, channel, startDate, endDate, budgetSpent, objective, metrics, wins, misses, lessons, actions, summary, grade);
  }, [name, channel, startDate, endDate, budgetSpent, objective, metrics, wins, misses, lessons, actions, summary, grade]);

  /* ---- Render helpers ---- */
  function renderBulletSection(
    label: string,
    description: string,
    items: BulletItem[],
    setter: React.Dispatch<React.SetStateAction<BulletItem[]>>
  ) {
    return (
      <div className="border border-neutral-200 p-6 lg:p-8">
        <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-1">
          {label}
        </h3>
        <p className="text-base text-neutral-500 mb-4">{description}</p>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <span className="text-base text-neutral-400 mt-3 select-none" aria-hidden="true">
                &bull;
              </span>
              <input
                type="text"
                value={item.text}
                onChange={(e) => updateBullet(setter, item.id, e.target.value)}
                placeholder="Type a point..."
                className={inputClass + " flex-1"}
              />
              <button
                type="button"
                onClick={() => removeBullet(setter, item.id)}
                className="text-base text-neutral-400 hover:text-black transition-colors px-2 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                aria-label={`Remove ${label.toLowerCase()} item`}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => addBullet(setter)}
          className={`${btnSecondary} mt-4`}
        >
          + Add Point
        </button>
      </div>
    );
  }

  /* ================================================================ */
  /*  RENDER                                                          */
  /* ================================================================ */

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Campaign Debrief Generator",
          description:
            "Generate structured post-mortem debriefs for marketing campaigns with planned vs actual metrics, lessons learned, and action items.",
          url: "https://themarkitmedia.com/en/resources/campaign-debrief",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          publisher: {
            "@type": "Organization",
            name: "Markit Media",
            url: "https://themarkitmedia.com",
          },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Campaign Debrief" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Campaign Debrief Generator
            </h1>
            <p className="text-lg text-neutral-500 leading-relaxed mt-4 max-w-2xl">
              Build structured post-mortem reports for every campaign. Compare planned vs actual
              performance, document wins and misses, capture lessons learned, and assign
              follow-through actions — all in one place.
            </p>
          </Animate>
        </div>
      </section>

      {/* ---- Saved Debriefs Bar ---- */}
      {savedDebriefs.length > 0 && (
        <section className="px-6 lg:px-12 pb-10">
          <div className="max-w-4xl mx-auto">
            <Animate animation="fade-in">
              <div className="border border-neutral-200 p-6">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  Saved Debriefs ({savedDebriefs.length}/{MAX_SAVED})
                </h2>
                <div className="space-y-2">
                  {savedDebriefs.map((d) => (
                    <div
                      key={d.id}
                      className={`flex flex-wrap items-center justify-between gap-3 p-3 border ${
                        loadedId === d.id ? "border-black bg-neutral-50" : "border-neutral-200"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-bold text-black truncate">
                          {d.name || "Untitled"}
                        </p>
                        <p className="text-base text-neutral-500">
                          {d.channel} &middot;{" "}
                          {new Date(d.savedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => loadDebrief(d)}
                          className={btnSecondary + " !py-2 !px-4"}
                        >
                          Load
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteDebrief(d.id)}
                          className={btnDanger}
                          aria-label={`Delete ${d.name || "Untitled"} debrief`}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Campaign Details ---- */}
      <section className="px-6 lg:px-12 pb-12">
        <div className="max-w-4xl mx-auto space-y-10">
          <Animate animation="fade-up">
            <div className="border border-neutral-200 p-6 lg:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-6">
                Campaign Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FieldLabel htmlFor="campaign-name">Campaign Name</FieldLabel>
                  <input
                    id="campaign-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Q3 Brand Awareness Push"
                    className={inputClass}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="campaign-channel">Channel</FieldLabel>
                  <select
                    id="campaign-channel"
                    value={channel}
                    onChange={(e) => setChannel(e.target.value as Channel)}
                    className={selectClass}
                  >
                    {CHANNELS.map((ch) => (
                      <option key={ch} value={ch}>
                        {ch}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <FieldLabel htmlFor="campaign-start">Start Date</FieldLabel>
                  <input
                    id="campaign-start"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="campaign-end">End Date</FieldLabel>
                  <input
                    id="campaign-end"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="campaign-budget">Budget Spent ($)</FieldLabel>
                  <input
                    id="campaign-budget"
                    type="number"
                    min={0}
                    step={0.01}
                    value={budgetSpent || ""}
                    onChange={(e) => setBudgetSpent(parseFloat(e.target.value) || 0)}
                    placeholder="12500"
                    className={inputClass}
                  />
                </div>
                <div className="md:col-span-2">
                  <FieldLabel htmlFor="campaign-objective">Objective</FieldLabel>
                  <input
                    id="campaign-objective"
                    type="text"
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    placeholder="e.g. Drive brand awareness and generate qualified leads"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </Animate>

          {/* ---- Performance Metrics ---- */}
          <Animate animation="fade-up">
            <div className="border border-neutral-200 p-6 lg:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-2">
                Performance Metrics
              </h2>
              <p className="text-base text-neutral-500 mb-6">
                Enter your planned targets and actual results. Variance is calculated automatically.
              </p>

              {/* Header row */}
              <div className="hidden md:grid md:grid-cols-[1fr_1fr_1fr_100px_80px] gap-4 pb-3 border-b border-neutral-200 mb-4">
                <p className="text-base font-bold text-black">Metric</p>
                <p className="text-base font-bold text-black">Planned</p>
                <p className="text-base font-bold text-black">Actual</p>
                <p className="text-base font-bold text-black">Variance</p>
                <p className="text-base font-bold text-black">Status</p>
              </div>

              <div className="space-y-4 md:space-y-3">
                {metrics.map((m, i) => {
                  const v = variancePct(m.planned, m.actual);
                  const met = metricMet(m.key, m.planned, m.actual);
                  const hasData = m.planned > 0 || m.actual > 0;
                  return (
                    <div
                      key={m.key}
                      className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_100px_80px] gap-3 md:gap-4 items-center border-b border-neutral-100 pb-4 md:pb-3 last:border-b-0"
                    >
                      <p className="text-base font-bold text-black md:font-medium">
                        {m.label}
                      </p>
                      <div>
                        <span className="text-base text-neutral-500 md:hidden">Planned: </span>
                        <input
                          type="number"
                          min={0}
                          step={m.key === "roas" ? 0.1 : m.prefix === "$" ? 0.01 : 1}
                          value={m.planned || ""}
                          onChange={(e) => updateMetric(i, "planned", e.target.value)}
                          placeholder="0"
                          className={inputClass}
                          aria-label={`${m.label} planned`}
                        />
                      </div>
                      <div>
                        <span className="text-base text-neutral-500 md:hidden">Actual: </span>
                        <input
                          type="number"
                          min={0}
                          step={m.key === "roas" ? 0.1 : m.prefix === "$" ? 0.01 : 1}
                          value={m.actual || ""}
                          onChange={(e) => updateMetric(i, "actual", e.target.value)}
                          placeholder="0"
                          className={inputClass}
                          aria-label={`${m.label} actual`}
                        />
                      </div>
                      <p
                        className={`text-base font-bold ${
                          hasData ? (met ? "text-black" : "text-neutral-400") : "text-neutral-300"
                        }`}
                      >
                        {hasData
                          ? `${v >= 0 ? "+" : ""}${v.toFixed(1)}%`
                          : "--"}
                      </p>
                      <p
                        className={`text-base font-bold ${
                          hasData ? (met ? "text-black" : "text-neutral-400") : "text-neutral-300"
                        }`}
                      >
                        {hasData ? (met ? "Met" : "Missed") : "--"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Animate>

          {/* ---- Overall Grade ---- */}
          <Animate animation="fade-up">
            <div className="border border-neutral-200 p-6 lg:p-8 text-center">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-2">
                Overall Campaign Grade
              </h2>
              <p className="text-base text-neutral-500 mb-4">
                Based on how many metrics met their planned targets
              </p>
              <p className="font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,6rem)] font-extrabold text-black leading-none">
                {grade}
              </p>
            </div>
          </Animate>

          {/* ---- What Worked / Didn't / Lessons ---- */}
          <Animate animation="fade-up">
            {renderBulletSection(
              "What Worked",
              "Document the wins, strong performers, and successful tactics.",
              wins,
              setWins
            )}
          </Animate>

          <Animate animation="fade-up">
            {renderBulletSection(
              "What Didn’t Work",
              "Capture underperformers, missed targets, and friction points.",
              misses,
              setMisses
            )}
          </Animate>

          <Animate animation="fade-up">
            {renderBulletSection(
              "Lessons Learned",
              "Distill insights that should inform future campaigns.",
              lessons,
              setLessons
            )}
          </Animate>

          {/* ---- Next Steps / Action Items ---- */}
          <Animate animation="fade-up">
            <div className="border border-neutral-200 p-6 lg:p-8">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-1">
                Next Steps
              </h3>
              <p className="text-base text-neutral-500 mb-4">
                Assign concrete action items with owners and deadlines.
              </p>
              <div className="space-y-4">
                {actions.map((a) => (
                  <div
                    key={a.id}
                    className="grid grid-cols-1 md:grid-cols-[1fr_180px_140px_40px] gap-3 items-start border-b border-neutral-100 pb-4 last:border-b-0"
                  >
                    <div>
                      <span className="text-base text-neutral-500 md:hidden block mb-1">
                        Action Item
                      </span>
                      <input
                        type="text"
                        value={a.text}
                        onChange={(e) => updateAction(a.id, "text", e.target.value)}
                        placeholder="Action item..."
                        className={inputClass}
                        aria-label="Action item description"
                      />
                    </div>
                    <div>
                      <span className="text-base text-neutral-500 md:hidden block mb-1">
                        Owner
                      </span>
                      <input
                        type="text"
                        value={a.owner}
                        onChange={(e) => updateAction(a.id, "owner", e.target.value)}
                        placeholder="Owner"
                        className={inputClass}
                        aria-label="Action item owner"
                      />
                    </div>
                    <div>
                      <span className="text-base text-neutral-500 md:hidden block mb-1">
                        Deadline
                      </span>
                      <input
                        type="date"
                        value={a.deadline}
                        onChange={(e) => updateAction(a.id, "deadline", e.target.value)}
                        className={inputClass}
                        aria-label="Action item deadline"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAction(a.id)}
                      className="text-base text-neutral-400 hover:text-black transition-colors px-2 py-3 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                      aria-label="Remove action item"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={addAction} className={`${btnSecondary} mt-4`}>
                + Add Action Item
              </button>
            </div>
          </Animate>

          {/* ---- Auto-generated Summary ---- */}
          <Animate animation="fade-up">
            <div className="border border-neutral-200 p-6 lg:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-2">
                Executive Summary
              </h2>
              <p className="text-base text-neutral-500 mb-4">
                Auto-generated from the data above. Updates as you fill in each section.
              </p>
              <div className="bg-neutral-50 border border-neutral-200 p-6">
                <p className="text-base text-black leading-relaxed">{summary}</p>
              </div>
            </div>
          </Animate>

          {/* ---- Action buttons ---- */}
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-4">
              <button type="button" onClick={handleExport} className={btnPrimary}>
                Export as .txt
              </button>
              <button type="button" onClick={saveDebrief} className={btnSecondary}>
                {loadedId ? "Update Saved Debrief" : `Save Debrief (${savedDebriefs.length}/${MAX_SAVED})`}
              </button>
              <button type="button" onClick={resetForm} className={btnDanger}>
                Reset Form
              </button>
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Educational Section ---- */}
      <section className="px-6 lg:px-12 py-20 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Learn</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-3 mb-10">
              Why Campaign Debriefs Matter
            </h2>
          </Animate>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Animate animation="fade-up">
              <div className="border border-neutral-200 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                  The Power of Post-Mortems
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Teams that conduct structured post-campaign reviews improve performance by 20-30%
                  over subsequent campaigns. Debriefs turn expensive lessons into institutional
                  knowledge that compounds over time, preventing repeated mistakes and accelerating
                  what works.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={100}>
              <div className="border border-neutral-200 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                  Blameless Debriefs
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  The most effective debriefs focus on systems, not people. When team members feel
                  safe reporting what went wrong without fear of blame, you get honest data that leads
                  to real improvements. Frame misses as process gaps, not personal failures, and watch
                  your debrief quality transform.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={200}>
              <div className="border border-neutral-200 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                  Choosing the Right Metrics
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Not every metric matters equally. Focus your debrief on 3-5 metrics that directly
                  tie to the campaign objective. Vanity metrics like impressions only matter when
                  awareness is the goal. Match your measurement framework to what you were actually
                  trying to achieve, and you will get clearer signal from every debrief.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={300}>
              <div className="border border-neutral-200 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                  Action Item Follow-Through
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  A debrief without follow-through is just a meeting. Every action item needs an
                  owner and a deadline. Review open items at the start of your next campaign kickoff.
                  Teams that track debrief action items to completion see measurable improvements in
                  their next campaign cycle, while those that skip follow-through repeat the same
                  mistakes.
                </p>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/campaign-tracker" className="border border-gray-200 bg-white px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors">Campaign Tracker</Link>
                <Link href="/resources/experiment-tracker" className="border border-gray-200 bg-white px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors">Experiment Tracker</Link>
                <Link href="/resources/marketing-audit-scorecard" className="border border-gray-200 bg-white px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors">Marketing Audit Scorecard</Link>
          </div>
        </div>
      </section>

      {/* ---- CTA Section ---- */}
      <section className="px-6 lg:px-12 py-20 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto text-center">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mb-4">
              Need Help Turning Insights Into Results?
            </h2>
            <p className="text-lg text-neutral-500 leading-relaxed max-w-2xl mx-auto mb-8">
              Our team helps brands translate campaign learnings into higher-performing strategies.
              Let us turn your debrief data into your next campaign plan.
            </p>
            <Link href="/contact" className={btnPrimary}>
              Get in Touch
            </Link>
          </Animate>
        </div>
      </section>
      <ToolCTA
        toolName="Campaign Debrief"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "KPI Builder", href: "/resources/kpi-builder" },
          { title: "ROI Calculator", href: "/resources/roi-calculator" },
          { title: "Marketing Audit Scorecard", href: "/resources/marketing-audit-scorecard" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </>
  );
}
