"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Quarter = "Q1" | "Q2" | "Q3" | "Q4";

type ChannelName = "SEO" | "PPC" | "Social" | "Email" | "Content";

interface ChannelMetrics {
  id: string;
  channel: ChannelName;
  spend: number;
  leads: number;
  revenue: number;
}

interface GoalRow {
  id: string;
  description: string;
  target: number;
  actual: number;
}

interface BudgetRow {
  id: string;
  channel: string;
  planned: number;
  actual: number;
}

interface QuarterlyReview {
  id: string;
  quarter: Quarter;
  year: number;
  executiveSummary: {
    highlights: string;
    keyWins: string;
    challenges: string;
  };
  channels: ChannelMetrics[];
  goals: GoalRow[];
  budgetRows: BudgetRow[];
  nextQuarter: {
    priorities: string;
    experiments: string;
    budgetChanges: string;
  };
  yoyComparison: {
    lastYearSpend: number;
    lastYearRevenue: number;
    lastYearROAS: number;
  };
  savedAt: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const QUARTERS: Quarter[] = ["Q1", "Q2", "Q3", "Q4"];
const CHANNEL_OPTIONS: ChannelName[] = ["SEO", "PPC", "Social", "Email", "Content"];
const STORAGE_KEY = "markit-quarterly-reviews";
const MAX_SAVED = 4;
const MAX_GOALS = 8;

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function achievementPct(target: number, actual: number): number {
  if (target === 0) return actual > 0 ? 100 : 0;
  return Math.round((actual / target) * 100);
}

function variancePct(planned: number, actual: number): number {
  if (planned === 0) return 0;
  return ((actual - planned) / Math.abs(planned)) * 100;
}

function fmtCurrency(value: number): string {
  return "$" + value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmtRoas(value: number): string {
  if (!isFinite(value) || isNaN(value)) return "0.00x";
  return value.toFixed(2) + "x";
}

function defaultChannels(): ChannelMetrics[] {
  return CHANNEL_OPTIONS.map((ch) => ({
    id: uid(),
    channel: ch,
    spend: 0,
    leads: 0,
    revenue: 0,
  }));
}

function defaultBudgetRows(): BudgetRow[] {
  return CHANNEL_OPTIONS.map((ch) => ({
    id: uid(),
    channel: ch,
    planned: 0,
    actual: 0,
  }));
}

/* ------------------------------------------------------------------ */
/*  Export as .txt                                                      */
/* ------------------------------------------------------------------ */

function exportAsTxt(
  quarter: Quarter,
  year: number,
  executiveSummary: QuarterlyReview["executiveSummary"],
  channels: ChannelMetrics[],
  goals: GoalRow[],
  budgetRows: BudgetRow[],
  nextQuarter: QuarterlyReview["nextQuarter"],
  totalSpend: number,
  totalRevenue: number,
  blendedROAS: number,
  goalAchievementRate: number,
  yoy: QuarterlyReview["yoyComparison"]
): void {
  const lines: string[] = [];
  lines.push(`MARKETING QUARTERLY REVIEW — ${quarter} ${year}`);
  lines.push("=".repeat(55));
  lines.push("");

  lines.push("QUARTERLY SCORECARD");
  lines.push("-".repeat(55));
  lines.push(`Total Spend: ${fmtCurrency(totalSpend)}`);
  lines.push(`Total Revenue: ${fmtCurrency(totalRevenue)}`);
  lines.push(`Blended ROAS: ${fmtRoas(blendedROAS)}`);
  lines.push(`Goal Achievement Rate: ${goalAchievementRate}%`);
  lines.push("");

  lines.push("EXECUTIVE SUMMARY");
  lines.push("-".repeat(55));
  lines.push(`Highlights: ${executiveSummary.highlights || "--"}`);
  lines.push(`Key Wins: ${executiveSummary.keyWins || "--"}`);
  lines.push(`Challenges: ${executiveSummary.challenges || "--"}`);
  lines.push("");

  lines.push("CHANNEL PERFORMANCE");
  lines.push("-".repeat(55));
  for (const ch of channels) {
    const roas = ch.spend > 0 ? ch.revenue / ch.spend : 0;
    lines.push(
      `${ch.channel}: Spend ${fmtCurrency(ch.spend)} | Leads ${ch.leads.toLocaleString()} | Revenue ${fmtCurrency(ch.revenue)} | ROAS ${fmtRoas(roas)}`
    );
  }
  lines.push("");

  if (goals.length > 0) {
    lines.push("GOAL PROGRESS");
    lines.push("-".repeat(55));
    for (const g of goals) {
      const pct = achievementPct(g.target, g.actual);
      lines.push(
        `${g.description || "Unnamed Goal"}: Target ${g.target.toLocaleString()} | Actual ${g.actual.toLocaleString()} | Achievement ${pct}%`
      );
    }
    lines.push("");
  }

  lines.push("BUDGET REVIEW");
  lines.push("-".repeat(55));
  for (const b of budgetRows) {
    const v = variancePct(b.planned, b.actual);
    lines.push(
      `${b.channel}: Planned ${fmtCurrency(b.planned)} | Actual ${fmtCurrency(b.actual)} | Variance ${v >= 0 ? "+" : ""}${v.toFixed(1)}%`
    );
  }
  lines.push("");

  lines.push("YEAR-OVER-YEAR COMPARISON");
  lines.push("-".repeat(55));
  if (yoy.lastYearSpend > 0 || yoy.lastYearRevenue > 0) {
    lines.push(`${quarter} ${year - 1}: Spend ${fmtCurrency(yoy.lastYearSpend)} | Revenue ${fmtCurrency(yoy.lastYearRevenue)} | ROAS ${fmtRoas(yoy.lastYearROAS)}`);
    lines.push(`${quarter} ${year}: Spend ${fmtCurrency(totalSpend)} | Revenue ${fmtCurrency(totalRevenue)} | ROAS ${fmtRoas(blendedROAS)}`);
  } else {
    lines.push("No year-over-year data entered.");
  }
  lines.push("");

  lines.push("NEXT QUARTER PLANS");
  lines.push("-".repeat(55));
  lines.push(`Priorities: ${nextQuarter.priorities || "--"}`);
  lines.push(`Experiments: ${nextQuarter.experiments || "--"}`);
  lines.push(`Budget Changes: ${nextQuarter.budgetChanges || "--"}`);
  lines.push("");

  lines.push(`Generated by Markit Media Quarterly Review Tool | ${new Date().toLocaleDateString("en-US")}`);

  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `quarterly-review-${quarter.toLowerCase()}-${year}.txt`;
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
const textareaClass =
  "w-full border border-neutral-300 bg-white px-4 py-3 text-base text-black placeholder:text-neutral-400 resize-y min-h-[100px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";
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

export default function QuarterlyReviewPage() {
  /* ---- State: quarter selection ---- */
  const [quarter, setQuarter] = useState<Quarter>("Q3");
  const [year, setYear] = useState(2026);

  /* ---- State: executive summary ---- */
  const [highlights, setHighlights] = useState("");
  const [keyWins, setKeyWins] = useState("");
  const [challenges, setChallenges] = useState("");

  /* ---- State: channel performance ---- */
  const [channels, setChannels] = useState<ChannelMetrics[]>(defaultChannels);

  /* ---- State: goals ---- */
  const [goals, setGoals] = useState<GoalRow[]>([]);

  /* ---- State: budget review ---- */
  const [budgetRows, setBudgetRows] = useState<BudgetRow[]>(defaultBudgetRows);

  /* ---- State: next quarter plans ---- */
  const [priorities, setPriorities] = useState("");
  const [experiments, setExperiments] = useState("");
  const [budgetChanges, setBudgetChanges] = useState("");

  /* ---- State: year-over-year ---- */
  const [yoySpend, setYoySpend] = useState(0);
  const [yoyRevenue, setYoyRevenue] = useState(0);
  const [yoyROAS, setYoyROAS] = useState(0);

  /* ---- State: saved reviews ---- */
  const [savedReviews, setSavedReviews] = useState<QuarterlyReview[]>([]);
  const [loadedId, setLoadedId] = useState<string | null>(null);

  /* ---- Load from localStorage ---- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: QuarterlyReview[] = JSON.parse(raw);
        setSavedReviews(parsed);
      }
    } catch {
      /* ignore corrupt data */
    }
  }, []);

  /* ---- Derived: scorecard ---- */
  const totalSpend = useMemo(() => channels.reduce((sum, c) => sum + c.spend, 0), [channels]);
  const totalRevenue = useMemo(() => channels.reduce((sum, c) => sum + c.revenue, 0), [channels]);
  const blendedROAS = useMemo(() => (totalSpend > 0 ? totalRevenue / totalSpend : 0), [totalSpend, totalRevenue]);
  const goalAchievementRate = useMemo(() => {
    const scored = goals.filter((g) => g.target > 0);
    if (scored.length === 0) return 0;
    const met = scored.filter((g) => g.actual >= g.target).length;
    return Math.round((met / scored.length) * 100);
  }, [goals]);

  const totalBudgetPlanned = useMemo(() => budgetRows.reduce((s, b) => s + b.planned, 0), [budgetRows]);
  const totalBudgetActual = useMemo(() => budgetRows.reduce((s, b) => s + b.actual, 0), [budgetRows]);

  /* ---- Channel handlers ---- */
  const updateChannel = useCallback(
    (id: string, field: "spend" | "leads" | "revenue", value: string) => {
      setChannels((prev) =>
        prev.map((c) => {
          if (c.id !== id) return c;
          const parsed = parseFloat(value);
          return { ...c, [field]: isNaN(parsed) ? 0 : parsed };
        })
      );
    },
    []
  );

  /* ---- Goal handlers ---- */
  const addGoal = useCallback(() => {
    setGoals((prev) => {
      if (prev.length >= MAX_GOALS) return prev;
      return [...prev, { id: uid(), description: "", target: 0, actual: 0 }];
    });
  }, []);

  const updateGoal = useCallback(
    (id: string, field: "description" | "target" | "actual", value: string) => {
      setGoals((prev) =>
        prev.map((g) => {
          if (g.id !== id) return g;
          if (field === "description") return { ...g, description: value };
          const parsed = parseFloat(value);
          return { ...g, [field]: isNaN(parsed) ? 0 : parsed };
        })
      );
    },
    []
  );

  const removeGoal = useCallback((id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  }, []);

  /* ---- Budget handlers ---- */
  const updateBudget = useCallback(
    (id: string, field: "planned" | "actual", value: string) => {
      setBudgetRows((prev) =>
        prev.map((b) => {
          if (b.id !== id) return b;
          const parsed = parseFloat(value);
          return { ...b, [field]: isNaN(parsed) ? 0 : parsed };
        })
      );
    },
    []
  );

  /* ---- Save / Load / Delete ---- */
  const saveReview = useCallback(() => {
    const review: QuarterlyReview = {
      id: loadedId || uid(),
      quarter,
      year,
      executiveSummary: { highlights, keyWins, challenges },
      channels,
      goals,
      budgetRows,
      nextQuarter: { priorities, experiments, budgetChanges },
      yoyComparison: { lastYearSpend: yoySpend, lastYearRevenue: yoyRevenue, lastYearROAS: yoyROAS },
      savedAt: new Date().toISOString(),
    };

    setSavedReviews((prev) => {
      const filtered = prev.filter((r) => r.id !== review.id);
      const next = [review, ...filtered].slice(0, MAX_SAVED);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    setLoadedId(review.id);
  }, [loadedId, quarter, year, highlights, keyWins, challenges, channels, goals, budgetRows, priorities, experiments, budgetChanges, yoySpend, yoyRevenue, yoyROAS]);

  const loadReview = useCallback((r: QuarterlyReview) => {
    setQuarter(r.quarter);
    setYear(r.year);
    setHighlights(r.executiveSummary.highlights);
    setKeyWins(r.executiveSummary.keyWins);
    setChallenges(r.executiveSummary.challenges);
    setChannels(r.channels);
    setGoals(r.goals);
    setBudgetRows(r.budgetRows);
    setPriorities(r.nextQuarter.priorities);
    setExperiments(r.nextQuarter.experiments);
    setBudgetChanges(r.nextQuarter.budgetChanges);
    setYoySpend(r.yoyComparison.lastYearSpend);
    setYoyRevenue(r.yoyComparison.lastYearRevenue);
    setYoyROAS(r.yoyComparison.lastYearROAS);
    setLoadedId(r.id);
  }, []);

  const deleteReview = useCallback((id: string) => {
    setSavedReviews((prev) => {
      const next = prev.filter((r) => r.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    setLoadedId((prev) => (prev === id ? null : prev));
  }, []);

  const resetForm = useCallback(() => {
    setQuarter("Q1");
    setYear(new Date().getFullYear());
    setHighlights("");
    setKeyWins("");
    setChallenges("");
    setChannels(defaultChannels());
    setGoals([]);
    setBudgetRows(defaultBudgetRows());
    setPriorities("");
    setExperiments("");
    setBudgetChanges("");
    setYoySpend(0);
    setYoyRevenue(0);
    setYoyROAS(0);
    setLoadedId(null);
  }, []);

  /* ---- Export handler ---- */
  const handleExport = useCallback(() => {
    exportAsTxt(
      quarter,
      year,
      { highlights, keyWins, challenges },
      channels,
      goals,
      budgetRows,
      { priorities, experiments, budgetChanges },
      totalSpend,
      totalRevenue,
      blendedROAS,
      goalAchievementRate,
      { lastYearSpend: yoySpend, lastYearRevenue: yoyRevenue, lastYearROAS: yoyROAS }
    );
  }, [quarter, year, highlights, keyWins, challenges, channels, goals, budgetRows, priorities, experiments, budgetChanges, totalSpend, totalRevenue, blendedROAS, goalAchievementRate, yoySpend, yoyRevenue, yoyROAS]);

  /* ---- Print handler ---- */
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  /* ================================================================ */
  /*  RENDER                                                          */
  /* ================================================================ */

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Quarterly Review Template",
          description:
            "Build structured quarterly marketing reviews with channel performance tracking, goal progress, budget variance analysis, and auto-generated scorecards.",
          url: "https://themarkitmedia.com/en/resources/quarterly-review",
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
          { label: "Quarterly Review" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing Quarterly Review Template
            </h1>
            <p className="text-lg text-neutral-500 leading-relaxed mt-4 max-w-2xl">
              Build a structured quarterly marketing review. Track channel performance,
              measure goal progress, analyze budget variance, and plan your next quarter
              — all in one interactive template.
            </p>
          </Animate>
        </div>
      </section>

      {/* ---- Saved Reviews Bar ---- */}
      {savedReviews.length > 0 && (
        <section className="px-6 lg:px-12 pb-10 print:hidden">
          <div className="max-w-4xl mx-auto">
            <Animate animation="fade-in">
              <div className="border border-neutral-200 p-6">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  Saved Reviews ({savedReviews.length}/{MAX_SAVED})
                </h2>
                <div className="space-y-2">
                  {savedReviews.map((r) => (
                    <div
                      key={r.id}
                      className={`flex flex-wrap items-center justify-between gap-3 p-3 border ${
                        loadedId === r.id ? "border-black bg-neutral-50" : "border-neutral-200"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-bold text-black truncate">
                          {r.quarter} {r.year}
                        </p>
                        <p className="text-base text-neutral-500">
                          Saved{" "}
                          {new Date(r.savedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => loadReview(r)}
                          className={btnSecondary + " !py-2 !px-4"}
                        >
                          Load
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteReview(r.id)}
                          className={btnDanger}
                          aria-label={`Delete ${r.quarter} ${r.year} review`}
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

      {/* ---- Main form ---- */}
      <section className="px-6 lg:px-12 pb-20">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* ---- Quarter Selection ---- */}
          <Animate animation="fade-up">
            <div className="border border-neutral-200 p-6 lg:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-4">
                Quarter Selection
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FieldLabel htmlFor="quarter-select">Quarter</FieldLabel>
                  <select
                    id="quarter-select"
                    value={quarter}
                    onChange={(e) => setQuarter(e.target.value as Quarter)}
                    className={selectClass}
                  >
                    {QUARTERS.map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <FieldLabel htmlFor="year-input">Year</FieldLabel>
                  <input
                    id="year-input"
                    type="number"
                    value={year}
                    onChange={(e) => {
                      const parsed = parseInt(e.target.value, 10);
                      setYear(isNaN(parsed) ? 2026 : parsed);
                    }}
                    min={2000}
                    max={2099}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </Animate>

          {/* ---- 1. Executive Summary ---- */}
          <Animate animation="fade-up">
            <div className="border border-neutral-200 p-6 lg:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-2">
                1. Executive Summary
              </h2>
              <p className="text-base text-neutral-500 mb-6">
                High-level overview of the quarter. Summarize what happened, what went well,
                and what held you back.
              </p>
              <div className="space-y-5">
                <div>
                  <FieldLabel htmlFor="highlights">Quarter Highlights</FieldLabel>
                  <textarea
                    id="highlights"
                    value={highlights}
                    onChange={(e) => setHighlights(e.target.value)}
                    placeholder="Key activities, campaigns launched, milestones reached..."
                    className={textareaClass}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="key-wins">Key Wins</FieldLabel>
                  <textarea
                    id="key-wins"
                    value={keyWins}
                    onChange={(e) => setKeyWins(e.target.value)}
                    placeholder="Biggest successes, targets exceeded, standout campaigns..."
                    className={textareaClass}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="challenges">Challenges</FieldLabel>
                  <textarea
                    id="challenges"
                    value={challenges}
                    onChange={(e) => setChallenges(e.target.value)}
                    placeholder="Obstacles, missed targets, resource constraints..."
                    className={textareaClass}
                  />
                </div>
              </div>
            </div>
          </Animate>

          {/* ---- 2. Channel Performance ---- */}
          <Animate animation="fade-up">
            <div className="border border-neutral-200 p-6 lg:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-2">
                2. Channel Performance
              </h2>
              <p className="text-base text-neutral-500 mb-6">
                Track spend, leads, and revenue for each marketing channel. ROAS is calculated
                automatically.
              </p>

              {/* Desktop header */}
              <div className="hidden md:grid md:grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-3 mb-2">
                <span className="text-base font-bold text-black">Channel</span>
                <span className="text-base font-bold text-black">Spend ($)</span>
                <span className="text-base font-bold text-black">Leads</span>
                <span className="text-base font-bold text-black">Revenue ($)</span>
                <span className="text-base font-bold text-black">ROAS</span>
              </div>

              <div className="space-y-4 md:space-y-2">
                {channels.map((ch) => {
                  const roas = ch.spend > 0 ? ch.revenue / ch.spend : 0;
                  return (
                    <div
                      key={ch.id}
                      className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-3 border border-neutral-200 md:border-0 p-4 md:p-0"
                    >
                      <div>
                        <span className="text-base text-neutral-500 md:hidden block mb-1">Channel</span>
                        <div className="text-base font-bold text-black py-3 md:py-0 md:leading-[48px]">
                          {ch.channel}
                        </div>
                      </div>
                      <div>
                        <span className="text-base text-neutral-500 md:hidden block mb-1">Spend ($)</span>
                        <input
                          type="number"
                          value={ch.spend || ""}
                          onChange={(e) => updateChannel(ch.id, "spend", e.target.value)}
                          placeholder="0"
                          className={inputClass}
                          aria-label={`${ch.channel} spend`}
                          min={0}
                        />
                      </div>
                      <div>
                        <span className="text-base text-neutral-500 md:hidden block mb-1">Leads</span>
                        <input
                          type="number"
                          value={ch.leads || ""}
                          onChange={(e) => updateChannel(ch.id, "leads", e.target.value)}
                          placeholder="0"
                          className={inputClass}
                          aria-label={`${ch.channel} leads`}
                          min={0}
                        />
                      </div>
                      <div>
                        <span className="text-base text-neutral-500 md:hidden block mb-1">Revenue ($)</span>
                        <input
                          type="number"
                          value={ch.revenue || ""}
                          onChange={(e) => updateChannel(ch.id, "revenue", e.target.value)}
                          placeholder="0"
                          className={inputClass}
                          aria-label={`${ch.channel} revenue`}
                          min={0}
                        />
                      </div>
                      <div>
                        <span className="text-base text-neutral-500 md:hidden block mb-1">ROAS</span>
                        <div className="text-base text-black py-3 md:py-0 md:leading-[48px] font-bold">
                          {fmtRoas(roas)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Animate>

          {/* ---- 3. Goal Progress ---- */}
          <Animate animation="fade-up">
            <div className="border border-neutral-200 p-6 lg:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-2">
                3. Goal Progress
              </h2>
              <p className="text-base text-neutral-500 mb-6">
                Add up to {MAX_GOALS} goals with target and actual values. Achievement percentage
                is calculated automatically.
              </p>

              {goals.length > 0 && (
                <>
                  {/* Desktop header */}
                  <div className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_80px_40px] gap-3 mb-2">
                    <span className="text-base font-bold text-black">Goal</span>
                    <span className="text-base font-bold text-black">Target</span>
                    <span className="text-base font-bold text-black">Actual</span>
                    <span className="text-base font-bold text-black">Achievement</span>
                    <span />
                  </div>

                  <div className="space-y-4 md:space-y-2">
                    {goals.map((g) => {
                      const pct = achievementPct(g.target, g.actual);
                      return (
                        <div
                          key={g.id}
                          className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_80px_40px] gap-3 items-start border border-neutral-200 md:border-0 p-4 md:p-0"
                        >
                          <div>
                            <span className="text-base text-neutral-500 md:hidden block mb-1">Goal</span>
                            <input
                              type="text"
                              value={g.description}
                              onChange={(e) => updateGoal(g.id, "description", e.target.value)}
                              placeholder="e.g. Generate 500 MQLs"
                              className={inputClass}
                              aria-label="Goal description"
                            />
                          </div>
                          <div>
                            <span className="text-base text-neutral-500 md:hidden block mb-1">Target</span>
                            <input
                              type="number"
                              value={g.target || ""}
                              onChange={(e) => updateGoal(g.id, "target", e.target.value)}
                              placeholder="0"
                              className={inputClass}
                              aria-label="Goal target"
                              min={0}
                            />
                          </div>
                          <div>
                            <span className="text-base text-neutral-500 md:hidden block mb-1">Actual</span>
                            <input
                              type="number"
                              value={g.actual || ""}
                              onChange={(e) => updateGoal(g.id, "actual", e.target.value)}
                              placeholder="0"
                              className={inputClass}
                              aria-label="Goal actual"
                              min={0}
                            />
                          </div>
                          <div className="flex items-center">
                            <span className="text-base text-neutral-500 md:hidden mr-2">Achievement:</span>
                            <span
                              className={`text-base font-bold md:leading-[48px] ${
                                pct >= 100 ? "text-black" : "text-neutral-500"
                              }`}
                            >
                              {pct}%
                            </span>
                          </div>
                          <div className="flex items-center">
                            <button
                              type="button"
                              onClick={() => removeGoal(g.id)}
                              className="text-base text-neutral-400 hover:text-black transition-colors px-2 py-3 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                              aria-label="Remove goal"
                            >
                              &times;
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {goals.length < MAX_GOALS && (
                <button type="button" onClick={addGoal} className={`${btnSecondary} mt-4`}>
                  + Add Goal
                </button>
              )}
              {goals.length >= MAX_GOALS && (
                <p className="text-base text-neutral-500 mt-4">
                  Maximum of {MAX_GOALS} goals reached.
                </p>
              )}
            </div>
          </Animate>

          {/* ---- 4. Budget Review ---- */}
          <Animate animation="fade-up">
            <div className="border border-neutral-200 p-6 lg:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-2">
                4. Budget Review
              </h2>
              <p className="text-base text-neutral-500 mb-6">
                Compare planned vs actual spend per channel. Variance is calculated automatically.
              </p>

              {/* Desktop header */}
              <div className="hidden md:grid md:grid-cols-[1fr_1fr_1fr_100px] gap-3 mb-2">
                <span className="text-base font-bold text-black">Channel</span>
                <span className="text-base font-bold text-black">Planned ($)</span>
                <span className="text-base font-bold text-black">Actual ($)</span>
                <span className="text-base font-bold text-black">Variance</span>
              </div>

              <div className="space-y-4 md:space-y-2">
                {budgetRows.map((b) => {
                  const v = variancePct(b.planned, b.actual);
                  return (
                    <div
                      key={b.id}
                      className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_100px] gap-3 border border-neutral-200 md:border-0 p-4 md:p-0"
                    >
                      <div>
                        <span className="text-base text-neutral-500 md:hidden block mb-1">Channel</span>
                        <div className="text-base font-bold text-black py-3 md:py-0 md:leading-[48px]">
                          {b.channel}
                        </div>
                      </div>
                      <div>
                        <span className="text-base text-neutral-500 md:hidden block mb-1">Planned ($)</span>
                        <input
                          type="number"
                          value={b.planned || ""}
                          onChange={(e) => updateBudget(b.id, "planned", e.target.value)}
                          placeholder="0"
                          className={inputClass}
                          aria-label={`${b.channel} planned budget`}
                          min={0}
                        />
                      </div>
                      <div>
                        <span className="text-base text-neutral-500 md:hidden block mb-1">Actual ($)</span>
                        <input
                          type="number"
                          value={b.actual || ""}
                          onChange={(e) => updateBudget(b.id, "actual", e.target.value)}
                          placeholder="0"
                          className={inputClass}
                          aria-label={`${b.channel} actual budget`}
                          min={0}
                        />
                      </div>
                      <div className="flex items-center">
                        <span className="text-base text-neutral-500 md:hidden mr-2">Variance:</span>
                        <span
                          className={`text-base font-bold md:leading-[48px] ${
                            v > 0 ? "text-neutral-600" : v < 0 ? "text-black" : "text-neutral-500"
                          }`}
                        >
                          {v >= 0 ? "+" : ""}
                          {v.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Budget totals */}
              <div className="mt-4 pt-4 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_100px] gap-3">
                <div className="text-base font-extrabold text-black md:leading-[48px]">Total</div>
                <div className="text-base font-extrabold text-black md:leading-[48px]">
                  {fmtCurrency(totalBudgetPlanned)}
                </div>
                <div className="text-base font-extrabold text-black md:leading-[48px]">
                  {fmtCurrency(totalBudgetActual)}
                </div>
                <div className="text-base font-extrabold text-black md:leading-[48px]">
                  {totalBudgetPlanned > 0
                    ? `${variancePct(totalBudgetPlanned, totalBudgetActual) >= 0 ? "+" : ""}${variancePct(totalBudgetPlanned, totalBudgetActual).toFixed(1)}%`
                    : "--"}
                </div>
              </div>
            </div>
          </Animate>

          {/* ---- 5. Next Quarter Plans ---- */}
          <Animate animation="fade-up">
            <div className="border border-neutral-200 p-6 lg:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-2">
                5. Next Quarter Plans
              </h2>
              <p className="text-base text-neutral-500 mb-6">
                Outline priorities, experiments to run, and any budget shifts for the upcoming quarter.
              </p>
              <div className="space-y-5">
                <div>
                  <FieldLabel htmlFor="priorities">Priorities</FieldLabel>
                  <textarea
                    id="priorities"
                    value={priorities}
                    onChange={(e) => setPriorities(e.target.value)}
                    placeholder="Top 3-5 priorities for next quarter..."
                    className={textareaClass}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="experiments">Experiments</FieldLabel>
                  <textarea
                    id="experiments"
                    value={experiments}
                    onChange={(e) => setExperiments(e.target.value)}
                    placeholder="New channels, tactics, or tests to try..."
                    className={textareaClass}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="budget-changes">Budget Changes</FieldLabel>
                  <textarea
                    id="budget-changes"
                    value={budgetChanges}
                    onChange={(e) => setBudgetChanges(e.target.value)}
                    placeholder="Increases, decreases, or reallocations planned..."
                    className={textareaClass}
                  />
                </div>
              </div>
            </div>
          </Animate>

          {/* ---- Quarterly Scorecard ---- */}
          <Animate animation="fade-up">
            <div className="border border-neutral-200 p-6 lg:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-2">
                Quarterly Scorecard
              </h2>
              <p className="text-base text-neutral-500 mb-6">
                Auto-generated from the data above. Updates as you fill in each section.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="border border-neutral-200 p-5">
                  <p className="text-base text-neutral-500 mb-1">Total Spend</p>
                  <p className="text-[clamp(1.25rem,3vw,1.75rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
                    {fmtCurrency(totalSpend)}
                  </p>
                </div>
                <div className="border border-neutral-200 p-5">
                  <p className="text-base text-neutral-500 mb-1">Total Revenue</p>
                  <p className="text-[clamp(1.25rem,3vw,1.75rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
                    {fmtCurrency(totalRevenue)}
                  </p>
                </div>
                <div className="border border-neutral-200 p-5">
                  <p className="text-base text-neutral-500 mb-1">Blended ROAS</p>
                  <p className="text-[clamp(1.25rem,3vw,1.75rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
                    {fmtRoas(blendedROAS)}
                  </p>
                </div>
                <div className="border border-neutral-200 p-5">
                  <p className="text-base text-neutral-500 mb-1">Goal Achievement</p>
                  <p className="text-[clamp(1.25rem,3vw,1.75rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
                    {goals.length > 0 ? `${goalAchievementRate}%` : "--"}
                  </p>
                </div>
              </div>
            </div>
          </Animate>

          {/* ---- Year-over-Year Comparison ---- */}
          <Animate animation="fade-up">
            <div className="border border-neutral-200 p-6 lg:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-2">
                Year-over-Year Comparison
              </h2>
              <p className="text-base text-neutral-500 mb-6">
                Enter last year&apos;s {quarter} figures to see how this quarter compares.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <FieldLabel htmlFor="yoy-spend">
                    {quarter} {year - 1} Spend ($)
                  </FieldLabel>
                  <input
                    id="yoy-spend"
                    type="number"
                    value={yoySpend || ""}
                    onChange={(e) => {
                      const parsed = parseFloat(e.target.value);
                      setYoySpend(isNaN(parsed) ? 0 : parsed);
                    }}
                    placeholder="0"
                    className={inputClass}
                    min={0}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="yoy-revenue">
                    {quarter} {year - 1} Revenue ($)
                  </FieldLabel>
                  <input
                    id="yoy-revenue"
                    type="number"
                    value={yoyRevenue || ""}
                    onChange={(e) => {
                      const parsed = parseFloat(e.target.value);
                      setYoyRevenue(isNaN(parsed) ? 0 : parsed);
                    }}
                    placeholder="0"
                    className={inputClass}
                    min={0}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="yoy-roas">
                    {quarter} {year - 1} ROAS
                  </FieldLabel>
                  <input
                    id="yoy-roas"
                    type="number"
                    value={yoyROAS || ""}
                    onChange={(e) => {
                      const parsed = parseFloat(e.target.value);
                      setYoyROAS(isNaN(parsed) ? 0 : parsed);
                    }}
                    placeholder="0"
                    className={inputClass}
                    min={0}
                    step={0.01}
                  />
                </div>
              </div>

              {(yoySpend > 0 || yoyRevenue > 0) ? (
                <div className="bg-neutral-50 border border-neutral-200 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-base font-bold text-black mb-3">
                        {quarter} {year - 1}
                      </p>
                      <div className="space-y-1">
                        <p className="text-base text-neutral-600">
                          Spend: {fmtCurrency(yoySpend)}
                        </p>
                        <p className="text-base text-neutral-600">
                          Revenue: {fmtCurrency(yoyRevenue)}
                        </p>
                        <p className="text-base text-neutral-600">
                          ROAS: {fmtRoas(yoyROAS)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-base font-bold text-black mb-3">
                        {quarter} {year}
                      </p>
                      <div className="space-y-1">
                        <p className="text-base text-neutral-600">
                          Spend: {fmtCurrency(totalSpend)}
                          {yoySpend > 0 && (
                            <span className="text-neutral-500 ml-2">
                              ({variancePct(yoySpend, totalSpend) >= 0 ? "+" : ""}
                              {variancePct(yoySpend, totalSpend).toFixed(1)}%)
                            </span>
                          )}
                        </p>
                        <p className="text-base text-neutral-600">
                          Revenue: {fmtCurrency(totalRevenue)}
                          {yoyRevenue > 0 && (
                            <span className="text-neutral-500 ml-2">
                              ({variancePct(yoyRevenue, totalRevenue) >= 0 ? "+" : ""}
                              {variancePct(yoyRevenue, totalRevenue).toFixed(1)}%)
                            </span>
                          )}
                        </p>
                        <p className="text-base text-neutral-600">
                          ROAS: {fmtRoas(blendedROAS)}
                          {yoyROAS > 0 && (
                            <span className="text-neutral-500 ml-2">
                              ({variancePct(yoyROAS, blendedROAS) >= 0 ? "+" : ""}
                              {variancePct(yoyROAS, blendedROAS).toFixed(1)}%)
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-neutral-50 border border-neutral-200 p-6">
                  <p className="text-base text-neutral-500">
                    Enter last year&apos;s figures above to generate a year-over-year comparison.
                  </p>
                </div>
              )}
            </div>
          </Animate>

          {/* ---- Action buttons ---- */}
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-4 print:hidden">
              <button type="button" onClick={handleExport} className={btnPrimary}>
                Export as .txt
              </button>
              <button type="button" onClick={handlePrint} className={btnSecondary}>
                Print View
              </button>
              <button type="button" onClick={saveReview} className={btnSecondary}>
                {loadedId ? "Update Saved Review" : `Save Review (${savedReviews.length}/${MAX_SAVED})`}
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
              Quarterly Review Best Practices
            </h2>
          </Animate>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Animate animation="fade-up">
              <div className="border border-neutral-200 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                  Choosing the Right Metrics
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Focus on 5-7 metrics that directly connect to business objectives. Vanity
                  metrics like raw impressions are useful only when awareness is the goal. Pair
                  volume metrics (leads, traffic) with efficiency metrics (CPA, ROAS) to get
                  the full picture. If a metric does not drive a decision, remove it from
                  your review.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={100}>
              <div className="border border-neutral-200 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                  Presenting to Leadership
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Start with the scorecard: total spend, revenue, and ROAS tell the financial
                  story in under 10 seconds. Then move to goal progress to show what the team
                  committed to and delivered. Save channel details for the appendix. Executives
                  care about outcomes and trends, not campaign-level granularity.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={200}>
              <div className="border border-neutral-200 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                  Metric Selection Framework
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Use the ICE framework for each metric: does it have Impact on revenue, is it
                  within your Control, and is it Easy to measure accurately? Score each 1-5.
                  Metrics scoring below 9 total are candidates for removal. This prevents your
                  review from becoming a data dump and keeps the conversation focused on what
                  you can actually improve.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={300}>
              <div className="border border-neutral-200 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                  Building an Action Plan
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Every quarterly review should produce 3-5 concrete actions for the next
                  quarter. Each action needs an owner and a measurable target. Carry forward
                  unfinished actions from the previous quarter. The best reviews are not
                  retrospectives that gather dust — they are living documents that shape
                  next quarter&apos;s strategy and budget allocation.
                </p>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* ---- CTA Section ---- */}
      <section className="px-6 lg:px-12 py-20 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto text-center">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mb-4">
              Need Help With Your Marketing Strategy?
            </h2>
            <p className="text-lg text-neutral-500 leading-relaxed max-w-2xl mx-auto mb-8">
              Our team helps brands turn quarterly insights into higher-performing strategies.
              Let us help you plan, execute, and optimize your next quarter.
            </p>
            <Link href="/contact" className={btnPrimary}>
              Get in Touch
            </Link>
          </Animate>
        </div>
      </section>
    </>
  );
}
