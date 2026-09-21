"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Animate } from "@/components/animate";
import { JsonLd } from "@/components/json-ld";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Campaign {
  id: string;
  name: string;
  platform: string;
  monthlyBudget: number;
  spendToDate: number;
}

type PacingStatus = "on-pace" | "over-pacing" | "under-pacing";

interface CampaignMetrics {
  dailyBudget: number;
  expectedSpend: number;
  variance: number;
  variancePct: number;
  status: PacingStatus;
  projectedEom: number;
  projectedOverUnder: number;
  recommendedDaily: number;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const PLATFORMS = [
  "Google Ads",
  "Meta",
  "LinkedIn",
  "TikTok",
  "Pinterest",
  "Programmatic",
] as const;

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

function daysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

/* ------------------------------------------------------------------ */
/*  Metric helpers                                                     */
/* ------------------------------------------------------------------ */

function calcMetrics(
  c: Campaign,
  totalDays: number,
  currentDay: number
): CampaignMetrics {
  const dailyBudget = totalDays > 0 ? c.monthlyBudget / totalDays : 0;
  const expectedSpend = dailyBudget * currentDay;
  const variance = c.spendToDate - expectedSpend;
  const variancePct = expectedSpend > 0 ? (variance / expectedSpend) * 100 : 0;

  let status: PacingStatus = "on-pace";
  if (variancePct > 5) status = "over-pacing";
  else if (variancePct < -5) status = "under-pacing";

  const dailyRate = currentDay > 0 ? c.spendToDate / currentDay : 0;
  const projectedEom = dailyRate * totalDays;
  const projectedOverUnder = projectedEom - c.monthlyBudget;

  const remainingDays = totalDays - currentDay;
  const remainingBudget = c.monthlyBudget - c.spendToDate;
  const recommendedDaily = remainingDays > 0 ? remainingBudget / remainingDays : 0;

  return {
    dailyBudget,
    expectedSpend,
    variance,
    variancePct,
    status,
    projectedEom,
    projectedOverUnder,
    recommendedDaily,
  };
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatPct(n: number): string {
  return `${n >= 0 ? "+" : ""}${n.toFixed(1)}%`;
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: PacingStatus }) {
  const map: Record<PacingStatus, { label: string; bg: string; text: string }> = {
    "on-pace": { label: "On Pace", bg: "bg-neutral-200", text: "text-neutral-800" },
    "over-pacing": { label: "Over-Pacing", bg: "bg-black", text: "text-white" },
    "under-pacing": { label: "Under-Pacing", bg: "bg-neutral-500", text: "text-white" },
  };
  const s = map[status];
  return (
    <span className={`inline-block px-3 py-1 text-base font-bold ${s.bg} ${s.text}`}>
      {s.label}
    </span>
  );
}

function PacingBar({
  expectedPct,
  actualPct,
}: {
  expectedPct: number;
  actualPct: number;
}) {
  const clamp = (v: number) => Math.max(0, Math.min(100, v));
  return (
    <div className="relative w-full h-6 bg-neutral-100 border border-neutral-300" role="img" aria-label={`Expected ${expectedPct.toFixed(0)}%, Actual ${actualPct.toFixed(0)}%`}>
      {/* Expected line */}
      <div
        className="absolute top-0 h-full w-0.5 bg-neutral-400"
        style={{ left: `${clamp(expectedPct)}%` }}
        aria-hidden="true"
      />
      {/* Actual bar */}
      <div
        className="absolute top-0 left-0 h-full bg-black transition-all duration-300"
        style={{ width: `${clamp(actualPct)}%` }}
        aria-hidden="true"
      />
    </div>
  );
}

function SpendChart({
  totalDays,
  currentDay,
  dailyBudget,
  spendToDate,
}: {
  totalDays: number;
  currentDay: number;
  dailyBudget: number;
  spendToDate: number;
}) {
  const W = 480;
  const H = 200;
  const PAD = 40;
  const iw = W - PAD * 2;
  const ih = H - PAD * 2;

  const maxSpend = Math.max(dailyBudget * totalDays, spendToDate * 1.1, 1);

  // Ideal line: 0 to full budget
  const idealPoints = [
    `${PAD},${PAD + ih}`,
    `${PAD + iw},${PAD}`,
  ].join(" ");

  // Actual line: 0 to current spend, plotted at currentDay
  const actualX = PAD + (currentDay / totalDays) * iw;
  const actualY = PAD + ih - (spendToDate / maxSpend) * ih;
  const actualPoints = [`${PAD},${PAD + ih}`, `${actualX},${actualY}`].join(" ");

  // Y-axis labels
  const midBudget = (dailyBudget * totalDays) / 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full max-w-lg"
      role="img"
      aria-label="Budget pacing chart comparing ideal spend line versus actual spend"
    >
      <title>Budget pacing chart</title>
      {/* Axes */}
      <line x1={PAD} y1={PAD} x2={PAD} y2={PAD + ih} stroke="#a3a3a3" strokeWidth={1} />
      <line x1={PAD} y1={PAD + ih} x2={PAD + iw} y2={PAD + ih} stroke="#a3a3a3" strokeWidth={1} />

      {/* Y labels */}
      <text x={PAD - 4} y={PAD + ih + 4} textAnchor="end" className="fill-neutral-500" fontSize={10}>$0</text>
      <text x={PAD - 4} y={PAD + ih / 2 + 4} textAnchor="end" className="fill-neutral-500" fontSize={10}>{formatCurrency(midBudget)}</text>
      <text x={PAD - 4} y={PAD + 4} textAnchor="end" className="fill-neutral-500" fontSize={10}>{formatCurrency(dailyBudget * totalDays)}</text>

      {/* X labels */}
      <text x={PAD} y={PAD + ih + 16} textAnchor="middle" className="fill-neutral-500" fontSize={10}>Day 1</text>
      <text x={PAD + iw} y={PAD + ih + 16} textAnchor="middle" className="fill-neutral-500" fontSize={10}>Day {totalDays}</text>

      {/* Ideal line */}
      <polyline points={idealPoints} fill="none" stroke="#a3a3a3" strokeWidth={2} strokeDasharray="6 4" />
      {/* Actual line */}
      <polyline points={actualPoints} fill="none" stroke="#000" strokeWidth={2.5} />

      {/* Actual dot */}
      <circle cx={actualX} cy={actualY} r={4} fill="#000" />

      {/* Legend */}
      <line x1={PAD + iw - 120} y1={PAD + 10} x2={PAD + iw - 100} y2={PAD + 10} stroke="#a3a3a3" strokeWidth={2} strokeDasharray="6 4" />
      <text x={PAD + iw - 96} y={PAD + 14} className="fill-neutral-500" fontSize={10}>Ideal</text>
      <line x1={PAD + iw - 60} y1={PAD + 10} x2={PAD + iw - 40} y2={PAD + 10} stroke="#000" strokeWidth={2.5} />
      <text x={PAD + iw - 36} y={PAD + 14} className="fill-black" fontSize={10}>Actual</text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

export default function AdBudgetPacingPage() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [currentDay, setCurrentDay] = useState(now.getDate());
  const totalDays = useMemo(() => daysInMonth(month, year), [month, year]);

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: uid(),
      name: "Brand Search",
      platform: "Google Ads",
      monthlyBudget: 3000,
      spendToDate: 0,
    },
  ]);

  /* ---- campaign CRUD ---- */

  const addCampaign = useCallback(() => {
    setCampaigns((prev) => [
      ...prev,
      {
        id: uid(),
        name: "",
        platform: "Google Ads",
        monthlyBudget: 1000,
        spendToDate: 0,
      },
    ]);
  }, []);

  const removeCampaign = useCallback((id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateCampaign = useCallback(
    (id: string, field: keyof Campaign, value: string | number) => {
      setCampaigns((prev) =>
        prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
      );
    },
    []
  );

  /* ---- derived metrics ---- */

  const allMetrics = useMemo(
    () =>
      campaigns.map((c) => ({
        campaign: c,
        metrics: calcMetrics(c, totalDays, currentDay),
      })),
    [campaigns, totalDays, currentDay]
  );

  const totalBudget = campaigns.reduce((s, c) => s + c.monthlyBudget, 0);
  const totalSpent = campaigns.reduce((s, c) => s + c.spendToDate, 0);
  const totalProjected = allMetrics.reduce((s, m) => s + m.metrics.projectedEom, 0);
  const totalExpected = allMetrics.reduce((s, m) => s + m.metrics.expectedSpend, 0);

  const overallVariancePct = totalExpected > 0 ? ((totalSpent - totalExpected) / totalExpected) * 100 : 0;
  let overallStatus: PacingStatus = "on-pace";
  if (overallVariancePct > 5) overallStatus = "over-pacing";
  else if (overallVariancePct < -5) overallStatus = "under-pacing";

  /* ---- export ---- */

  const exportTxt = useCallback(() => {
    const lines: string[] = [
      "AD BUDGET PACING REPORT",
      `Month: ${MONTHS[month]} ${year}`,
      `Day ${currentDay} of ${totalDays}`,
      "",
      "OVERALL SUMMARY",
      `Total Budget: ${formatCurrency(totalBudget)}`,
      `Total Spent: ${formatCurrency(totalSpent)}`,
      `Total Projected EOM: ${formatCurrency(totalProjected)}`,
      `Overall Status: ${overallStatus.replace("-", " ").toUpperCase()}`,
      "",
      "CAMPAIGNS",
      "─".repeat(60),
    ];

    allMetrics.forEach(({ campaign: c, metrics: m }) => {
      lines.push(
        `${c.name} (${c.platform})`,
        `  Monthly Budget:       ${formatCurrency(c.monthlyBudget)}`,
        `  Daily Budget:         ${formatCurrency(m.dailyBudget)}`,
        `  Expected Spend:       ${formatCurrency(m.expectedSpend)}`,
        `  Actual Spend:         ${formatCurrency(c.spendToDate)}`,
        `  Variance:             ${formatCurrency(m.variance)} (${formatPct(m.variancePct)})`,
        `  Status:               ${m.status.replace("-", " ").toUpperCase()}`,
        `  Projected EOM:        ${formatCurrency(m.projectedEom)}`,
        `  Over/Under Budget:    ${formatCurrency(m.projectedOverUnder)}`,
        `  Recommended Daily:    ${formatCurrency(m.recommendedDaily)}`,
        ""
      );
    });

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pacing-report-${MONTHS[month].toLowerCase()}-${year}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [allMetrics, month, year, currentDay, totalDays, totalBudget, totalSpent, totalProjected, overallStatus]);

  /* ---- render ---- */

  return (
    <article className="min-h-screen">
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Ad Budget Pacing Calculator" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-28 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Interactive Tools</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Ad Budget Pacing Calculator
            </h1>
            <SectionDesc>
              Track advertising budget pacing across campaigns. Monitor your spend rate,
              forecast end-of-month spend, and identify campaigns that are over- or
              under-pacing so you can reallocate in time.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Global Settings */}
      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up" delay={100}>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              Month Settings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label htmlFor="month-select" className="block text-base font-bold text-black mb-2">
                  Month
                </label>
                <select
                  id="month-select"
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                  className="w-full border border-neutral-300 bg-white px-4 py-3 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  {MONTHS.map((m, i) => (
                    <option key={m} value={i}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="year-input" className="block text-base font-bold text-black mb-2">
                  Year
                </label>
                <input
                  id="year-input"
                  type="number"
                  min={2020}
                  max={2040}
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full border border-neutral-300 bg-white px-4 py-3 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                />
              </div>

              <div>
                <label htmlFor="total-days" className="block text-base font-bold text-black mb-2">
                  Days in Month
                </label>
                <input
                  id="total-days"
                  type="text"
                  readOnly
                  value={totalDays}
                  className="w-full border border-neutral-200 bg-neutral-50 px-4 py-3 text-base text-neutral-600 cursor-default"
                  tabIndex={-1}
                />
              </div>

              <div>
                <label htmlFor="current-day" className="block text-base font-bold text-black mb-2">
                  Current Day of Month
                </label>
                <input
                  id="current-day"
                  type="number"
                  min={1}
                  max={totalDays}
                  value={currentDay}
                  onChange={(e) => setCurrentDay(Math.max(1, Math.min(totalDays, Number(e.target.value))))}
                  className="w-full border border-neutral-300 bg-white px-4 py-3 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                />
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* Campaign List */}
      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
              Campaigns
            </h2>
            <button
              type="button"
              onClick={addCampaign}
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 text-base font-bold hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              + Add Campaign
            </button>
          </div>

          <div className="space-y-8">
            {campaigns.map((c, idx) => {
              const m = allMetrics[idx]?.metrics;
              if (!m) return null;

              const expectedPct =
                c.monthlyBudget > 0
                  ? (m.expectedSpend / c.monthlyBudget) * 100
                  : 0;
              const actualPct =
                c.monthlyBudget > 0
                  ? (c.spendToDate / c.monthlyBudget) * 100
                  : 0;

              return (
                <Animate key={c.id} animation="fade-up" delay={idx * 60}>
                  <div className="border border-neutral-300 bg-white">
                    {/* Campaign inputs */}
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label
                          htmlFor={`name-${c.id}`}
                          className="block text-base font-bold text-black mb-1"
                        >
                          Campaign Name
                        </label>
                        <input
                          id={`name-${c.id}`}
                          type="text"
                          placeholder="e.g. Brand Search"
                          value={c.name}
                          onChange={(e) => updateCampaign(c.id, "name", e.target.value)}
                          className="w-full border border-neutral-300 bg-white px-4 py-3 text-base text-black placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={`platform-${c.id}`}
                          className="block text-base font-bold text-black mb-1"
                        >
                          Platform
                        </label>
                        <select
                          id={`platform-${c.id}`}
                          value={c.platform}
                          onChange={(e) => updateCampaign(c.id, "platform", e.target.value)}
                          className="w-full border border-neutral-300 bg-white px-4 py-3 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        >
                          {PLATFORMS.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor={`budget-${c.id}`}
                          className="block text-base font-bold text-black mb-1"
                        >
                          Monthly Budget ($)
                        </label>
                        <input
                          id={`budget-${c.id}`}
                          type="number"
                          min={0}
                          step={100}
                          value={c.monthlyBudget}
                          onChange={(e) =>
                            updateCampaign(c.id, "monthlyBudget", Number(e.target.value))
                          }
                          className="w-full border border-neutral-300 bg-white px-4 py-3 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={`spend-${c.id}`}
                          className="block text-base font-bold text-black mb-1"
                        >
                          Spend to Date ($)
                        </label>
                        <input
                          id={`spend-${c.id}`}
                          type="number"
                          min={0}
                          step={50}
                          value={c.spendToDate}
                          onChange={(e) =>
                            updateCampaign(c.id, "spendToDate", Number(e.target.value))
                          }
                          className="w-full border border-neutral-300 bg-white px-4 py-3 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        />
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="border-t border-neutral-200 bg-neutral-50 p-6">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <StatusBadge status={m.status} />
                        <span className="text-base text-neutral-600">
                          {formatPct(m.variancePct)} vs expected
                        </span>
                      </div>

                      {/* Pacing bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-base text-neutral-500 mb-1">
                          <span>Budget utilization</span>
                          <span>{actualPct.toFixed(1)}% spent</span>
                        </div>
                        <PacingBar expectedPct={expectedPct} actualPct={actualPct} />
                        <div className="flex justify-between text-base text-neutral-400 mt-1">
                          <span>Expected: {expectedPct.toFixed(1)}%</span>
                          <span>100%</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <span className="block text-base text-neutral-500">Daily Budget</span>
                          <span className="block text-base font-bold text-black">{formatCurrency(m.dailyBudget)}</span>
                        </div>
                        <div>
                          <span className="block text-base text-neutral-500">Expected Spend</span>
                          <span className="block text-base font-bold text-black">{formatCurrency(m.expectedSpend)}</span>
                        </div>
                        <div>
                          <span className="block text-base text-neutral-500">Projected EOM</span>
                          <span className="block text-base font-bold text-black">{formatCurrency(m.projectedEom)}</span>
                        </div>
                        <div>
                          <span className="block text-base text-neutral-500">Over/Under Budget</span>
                          <span className="block text-base font-bold text-black">{formatCurrency(m.projectedOverUnder)}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                        <p className="text-base text-neutral-600">
                          <span className="font-bold">Recommended daily spend</span> for remaining {totalDays - currentDay} days:{" "}
                          <span className="font-bold text-black">{formatCurrency(m.recommendedDaily)}</span>
                        </p>
                        <button
                          type="button"
                          onClick={() => removeCampaign(c.id)}
                          className="text-base font-bold text-neutral-500 hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 px-3 py-1"
                          aria-label={`Remove campaign ${c.name || "unnamed"}`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </Animate>
              );
            })}

            {campaigns.length === 0 && (
              <p className="text-base text-neutral-500 py-8 text-center">
                No campaigns added. Click &quot;Add Campaign&quot; to get started.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Overall Summary */}
      {campaigns.length > 0 && (
        <section className="px-6 lg:px-12 py-8">
          <div className="max-w-5xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                Overall Summary
              </h2>
              <div className="bg-black text-white p-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
                  <div>
                    <span className="block text-base text-neutral-400">Total Budget</span>
                    <span className="block text-lg font-extrabold">{formatCurrency(totalBudget)}</span>
                  </div>
                  <div>
                    <span className="block text-base text-neutral-400">Total Spent</span>
                    <span className="block text-lg font-extrabold">{formatCurrency(totalSpent)}</span>
                  </div>
                  <div>
                    <span className="block text-base text-neutral-400">Projected EOM</span>
                    <span className="block text-lg font-extrabold">{formatCurrency(totalProjected)}</span>
                  </div>
                  <div>
                    <span className="block text-base text-neutral-400">Overall Status</span>
                    <span className="block text-lg font-extrabold mt-1">
                      <span
                        className={`inline-block px-3 py-1 text-base font-bold ${
                          overallStatus === "on-pace"
                            ? "bg-neutral-700 text-white"
                            : overallStatus === "over-pacing"
                            ? "bg-white text-black"
                            : "bg-neutral-500 text-white"
                        }`}
                      >
                        {overallStatus.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    </span>
                  </div>
                </div>

                {/* SVG chart for overall pacing */}
                <div className="mt-6">
                  <p className="text-base text-neutral-400 mb-3">
                    Ideal vs. Actual Spend (All Campaigns)
                  </p>
                  <SpendChart
                    totalDays={totalDays}
                    currentDay={currentDay}
                    dailyBudget={totalBudget / totalDays}
                    spendToDate={totalSpent}
                  />
                </div>
              </div>

              {/* Export */}
              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={exportTxt}
                  className="inline-flex items-center gap-2 border-2 border-black bg-white text-black px-8 py-4 text-base font-bold hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Export as .txt
                </button>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* Educational Section */}
      <section className="px-6 lg:px-12 py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionTitle>Budget Pacing Best Practices</SectionTitle>
            <div className="mt-8 space-y-8">
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                  Check pacing at least twice a week
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Monday and Thursday reviews give you enough data points to catch drift early.
                  Waiting until end-of-month means you have already lost the opportunity to
                  reallocate budget to higher-performing campaigns.
                </p>
              </div>

              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                  Allow a 5% variance window
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Platforms like Google Ads and Meta can overspend on strong days and
                  underspend on slow ones. A 5% buffer in either direction is normal. Only act
                  when the variance exceeds that threshold consistently.
                </p>
              </div>

              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                  Separate brand and non-brand campaigns
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Brand campaigns tend to pace predictably because demand is steady. Non-brand
                  campaigns are more volatile. Tracking them separately gives you a clearer
                  picture of where adjustments are needed.
                </p>
              </div>

              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                  Redistribute underspend early
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  If a campaign is consistently under-pacing by mid-month, move some of that
                  budget to campaigns that can absorb it. Leaving budget unspent at month-end
                  is a missed opportunity for incremental conversions.
                </p>
              </div>

              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                  Account for weekday vs weekend patterns
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  B2B campaigns often see lower spend on weekends, while e-commerce peaks.
                  A linear daily budget is a useful benchmark, but your actual ideal curve
                  depends on your audience behavior and day-of-week performance.
                </p>
              </div>

              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                  Document your pacing adjustments
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  When you raise or lower daily budgets mid-month, note what triggered the
                  change and the expected outcome. This makes month-end reporting faster and
                  gives you data for future forecasting.
                </p>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Animate animation="fade-up">
            <SectionTitle>Need Help Managing Your Ad Budget?</SectionTitle>
            <p className="text-lg text-neutral-500 leading-relaxed mt-4 max-w-2xl mx-auto">
              Our performance marketing team monitors pacing daily and reallocates spend
              in real time to maximize your return. Let us handle the numbers.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Talk to Our Team &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>
          
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/ad-copy-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Ad Copy Generator</Link>
                <Link href="/resources/ad-copy-analyzer" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Ad Copy Analyzer</Link>
                <Link href="/resources/ad-spend-calculator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Ad Spend Calculator</Link>
                <Link href="/resources/google-ads-estimator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Google Ads Estimator</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Ad Budget Pacing Calculator",
          description: "Track your advertising budget pacing across campaigns. Monitor spend rate, forecast end-of-month spend, and identify over/under-pacing campaigns.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    </article>
  );
}
