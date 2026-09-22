"use client";

import { useState, useEffect, useCallback, useId } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

const CHANNEL_NAMES = [
  "SEO",
  "PPC",
  "Social Media",
  "Email",
  "Content",
  "Display",
  "Video",
  "Other",
] as const;

type ChannelName = (typeof CHANNEL_NAMES)[number];

interface ChannelData {
  name: ChannelName;
  impressions: string;
  clicks: string;
  conversions: string;
  spend: string;
  revenue: string;
}

interface Recommendation {
  id: string;
  text: string;
  priority: "High" | "Medium" | "Low";
}

interface ReportState {
  clientName: string;
  periodStart: string;
  periodEnd: string;
  reportTitle: string;
  preparedBy: string;
  channels: ChannelData[];
  insights: { wins: string[]; improvements: string[]; nextSteps: string[] };
  recommendations: Recommendation[];
}

const STORAGE_KEY = "markit-client-report-dashboard";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function num(v: string): number {
  return Number(v) || 0;
}

function pct(a: number, b: number): string {
  if (b === 0) return "0.00";
  return ((a / b) * 100).toFixed(2);
}

function currency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function commas(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

function emptyChannel(name: ChannelName): ChannelData {
  return { name, impressions: "", clicks: "", conversions: "", spend: "", revenue: "" };
}

function defaultState(): ReportState {
  return {
    clientName: "",
    periodStart: "",
    periodEnd: "",
    reportTitle: "",
    preparedBy: "",
    channels: [emptyChannel("SEO")],
    insights: { wins: [""], improvements: [""], nextSteps: [""] },
    recommendations: [{ id: uid(), text: "", priority: "Medium" }],
  };
}

/* ------------------------------------------------------------------ */
/*  Derived metrics for a channel                                      */
/* ------------------------------------------------------------------ */

function channelMetrics(ch: ChannelData) {
  const imp = num(ch.impressions);
  const clk = num(ch.clicks);
  const conv = num(ch.conversions);
  const sp = num(ch.spend);
  const rev = num(ch.revenue);
  const ctr = imp > 0 ? (clk / imp) * 100 : 0;
  const convRate = clk > 0 ? (conv / clk) * 100 : 0;
  const roi = sp > 0 ? ((rev - sp) / sp) * 100 : 0;
  const cpa = conv > 0 ? sp / conv : 0;
  return { imp, clk, conv, sp, rev, ctr, convRate, roi, cpa };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ClientReportingDashboardPage() {
  const formId = useId();
  const [report, setReport] = useState<ReportState>(defaultState);
  const [preview, setPreview] = useState(false);
  const [saved, setSaved] = useState(false);

  /* Load from localStorage on mount */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setReport(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  /* ---- updaters ---- */

  const set = useCallback(
    <K extends keyof ReportState>(key: K, value: ReportState[K]) =>
      setReport((prev) => ({ ...prev, [key]: value })),
    [],
  );

  const updateChannel = useCallback((idx: number, field: keyof ChannelData, value: string) => {
    setReport((prev) => {
      const channels = [...prev.channels];
      channels[idx] = { ...channels[idx], [field]: value };
      return { ...prev, channels };
    });
  }, []);

  const addChannel = useCallback(() => {
    setReport((prev) => {
      if (prev.channels.length >= 8) return prev;
      const used = new Set(prev.channels.map((c) => c.name));
      const next = CHANNEL_NAMES.find((n) => !used.has(n));
      if (!next) return prev;
      return { ...prev, channels: [...prev.channels, emptyChannel(next)] };
    });
  }, []);

  const removeChannel = useCallback((idx: number) => {
    setReport((prev) => {
      if (prev.channels.length <= 1) return prev;
      return { ...prev, channels: prev.channels.filter((_, i) => i !== idx) };
    });
  }, []);

  const updateInsight = useCallback(
    (category: keyof ReportState["insights"], idx: number, value: string) => {
      setReport((prev) => {
        const list = [...prev.insights[category]];
        list[idx] = value;
        return { ...prev, insights: { ...prev.insights, [category]: list } };
      });
    },
    [],
  );

  const addInsight = useCallback((category: keyof ReportState["insights"]) => {
    setReport((prev) => ({
      ...prev,
      insights: { ...prev.insights, [category]: [...prev.insights[category], ""] },
    }));
  }, []);

  const removeInsight = useCallback((category: keyof ReportState["insights"], idx: number) => {
    setReport((prev) => {
      const list = prev.insights[category].filter((_, i) => i !== idx);
      return { ...prev, insights: { ...prev.insights, [category]: list.length ? list : [""] } };
    });
  }, []);

  const addRecommendation = useCallback(() => {
    setReport((prev) => ({
      ...prev,
      recommendations: [...prev.recommendations, { id: uid(), text: "", priority: "Medium" as const }],
    }));
  }, []);

  const updateRecommendation = useCallback(
    (id: string, field: keyof Recommendation, value: string) => {
      setReport((prev) => ({
        ...prev,
        recommendations: prev.recommendations.map((r) =>
          r.id === id ? { ...r, [field]: value } : r,
        ),
      }));
    },
    [],
  );

  const removeRecommendation = useCallback((id: string) => {
    setReport((prev) => {
      const list = prev.recommendations.filter((r) => r.id !== id);
      return { ...prev, recommendations: list.length ? list : [{ id: uid(), text: "", priority: "Medium" as const }] };
    });
  }, []);

  /* ---- aggregates ---- */

  const totals = report.channels.reduce(
    (acc, ch) => {
      const m = channelMetrics(ch);
      acc.imp += m.imp;
      acc.clk += m.clk;
      acc.conv += m.conv;
      acc.sp += m.sp;
      acc.rev += m.rev;
      return acc;
    },
    { imp: 0, clk: 0, conv: 0, sp: 0, rev: 0 },
  );

  const totalCtr = totals.imp > 0 ? (totals.clk / totals.imp) * 100 : 0;
  const totalConvRate = totals.clk > 0 ? (totals.conv / totals.clk) * 100 : 0;
  const totalRoi = totals.sp > 0 ? ((totals.rev - totals.sp) / totals.sp) * 100 : 0;
  const totalCpa = totals.conv > 0 ? totals.sp / totals.conv : 0;

  /* top-performing channel */
  const topChannel = report.channels.reduce<{ name: string; rev: number }>(
    (best, ch) => {
      const rev = num(ch.revenue);
      return rev > best.rev ? { name: ch.name, rev } : best;
    },
    { name: "-", rev: 0 },
  );

  /* executive summary auto-text */
  const execSummary =
    totals.sp > 0
      ? `During the reporting period, a total of ${currency(totals.sp)} was invested across ${report.channels.length} channel${report.channels.length > 1 ? "s" : ""}, generating ${currency(totals.rev)} in revenue for an overall ROI of ${totalRoi.toFixed(1)}%. The top-performing channel was ${topChannel.name} with ${currency(topChannel.rev)} in revenue. A total of ${commas(totals.conv)} conversions were achieved at an average cost per acquisition of ${currency(totalCpa)}.`
      : "Add channel data above to generate an executive summary.";

  /* ---- save / export ---- */

  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(report));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      /* quota exceeded */
    }
  };

  const handleExport = () => {
    const lines: string[] = [];
    const ln = (s = "") => lines.push(s);
    const hr = () => ln("=".repeat(60));

    hr();
    ln(report.reportTitle || "Marketing Report");
    hr();
    ln(`Client: ${report.clientName || "-"}`);
    ln(`Period: ${report.periodStart || "?"} to ${report.periodEnd || "?"}`);
    ln(`Prepared by: ${report.preparedBy || "-"}`);
    ln();

    ln("EXECUTIVE SUMMARY");
    ln("-".repeat(40));
    ln(execSummary);
    ln();

    ln("KPI SUMMARY");
    ln("-".repeat(40));
    ln(`Total Impressions: ${commas(totals.imp)}`);
    ln(`Total Clicks: ${commas(totals.clk)}`);
    ln(`Overall CTR: ${totalCtr.toFixed(2)}%`);
    ln(`Total Conversions: ${commas(totals.conv)}`);
    ln(`Overall Conv. Rate: ${totalConvRate.toFixed(2)}%`);
    ln(`Total Spend: ${currency(totals.sp)}`);
    ln(`Total Revenue: ${currency(totals.rev)}`);
    ln(`Overall ROI: ${totalRoi.toFixed(1)}%`);
    ln(`Average CPA: ${currency(totalCpa)}`);
    ln();

    ln("CHANNEL BREAKDOWN");
    ln("-".repeat(40));
    report.channels.forEach((ch) => {
      const m = channelMetrics(ch);
      ln(`${ch.name}`);
      ln(`  Impressions: ${commas(m.imp)}  |  Clicks: ${commas(m.clk)}  |  CTR: ${m.ctr.toFixed(2)}%`);
      ln(`  Conversions: ${commas(m.conv)}  |  Conv. Rate: ${m.convRate.toFixed(2)}%`);
      ln(`  Spend: ${currency(m.sp)}  |  Revenue: ${currency(m.rev)}`);
      ln(`  ROI: ${m.roi.toFixed(1)}%  |  CPA: ${currency(m.cpa)}`);
      ln();
    });

    ln("INSIGHTS");
    ln("-".repeat(40));
    if (report.insights.wins.some((w) => w.trim())) {
      ln("Key Wins:");
      report.insights.wins.forEach((w) => w.trim() && ln(`  - ${w.trim()}`));
      ln();
    }
    if (report.insights.improvements.some((w) => w.trim())) {
      ln("Areas for Improvement:");
      report.insights.improvements.forEach((w) => w.trim() && ln(`  - ${w.trim()}`));
      ln();
    }
    if (report.insights.nextSteps.some((w) => w.trim())) {
      ln("Next Steps:");
      report.insights.nextSteps.forEach((w) => w.trim() && ln(`  - ${w.trim()}`));
      ln();
    }

    if (report.recommendations.some((r) => r.text.trim())) {
      ln("RECOMMENDATIONS");
      ln("-".repeat(40));
      report.recommendations.forEach((r) => {
        if (r.text.trim()) ln(`  [${r.priority}] ${r.text.trim()}`);
      });
      ln();
    }

    hr();
    ln("Generated with Client Reporting Dashboard Builder | Markit Media");
    hr();

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(report.clientName || "client").replace(/\s+/g, "-").toLowerCase()}-report.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ---- style constants ---- */

  const inputCls =
    "w-full border border-neutral-300 bg-white text-black px-4 py-3 text-base min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 motion-reduce:transition-none";
  const selectCls =
    "w-full border border-neutral-300 bg-white text-black px-4 py-3 text-base min-h-[44px] appearance-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 motion-reduce:transition-none";
  const btnPrimary =
    "bg-black text-white px-8 py-4 font-bold text-base min-h-[44px] hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:bg-neutral-300 disabled:cursor-not-allowed";
  const btnSecondary =
    "border border-black text-black bg-white px-8 py-4 font-bold text-base min-h-[44px] hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";
  const btnDanger =
    "border border-neutral-300 text-neutral-600 bg-white px-3 py-2 text-base min-h-[44px] hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";

  /* ---- chart ---- */

  const chartMaxVal = Math.max(...report.channels.map((ch) => Math.max(num(ch.spend), num(ch.revenue))), 1);
  const barH = 28;
  const rowH = 76;
  const chartPadLeft = 120;
  const chartW = 700;
  const chartBarW = chartW - chartPadLeft - 20;
  const chartH = report.channels.length * rowH + 40;

  /* ================================================================ */
  /*  Preview Mode                                                     */
  /* ================================================================ */

  if (preview) {
    return (
      <article className="min-h-screen bg-white">
        <Breadcrumb
          items={[
            { label: "Resources", href: "/resources" },
            { label: "Client Reporting Dashboard", href: "/resources/client-reporting-dashboard" },
            { label: "Preview" },
          ]}
        />

        <section className="px-6 lg:px-12 pt-16 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
              <button
                type="button"
                onClick={() => setPreview(false)}
                className={btnSecondary}
              >
                &larr; Back to Editor
              </button>
              <button type="button" onClick={handleExport} className={btnPrimary}>
                Export as .txt
              </button>
            </div>

            {/* Header */}
            <div className="border-b-2 border-black pb-6 mb-8">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold text-black tracking-tight leading-[1.1]">
                {report.reportTitle || "Marketing Report"}
              </h2>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-base text-neutral-600">
                <span>
                  <strong>Client:</strong> {report.clientName || "-"}
                </span>
                <span>
                  <strong>Period:</strong> {report.periodStart || "?"} &mdash;{" "}
                  {report.periodEnd || "?"}
                </span>
                <span>
                  <strong>Prepared by:</strong> {report.preparedBy || "-"}
                </span>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="mb-10">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                Executive Summary
              </h2>
              <p className="text-base text-neutral-700 leading-relaxed">{execSummary}</p>
            </div>

            {/* KPI Summary */}
            <div className="mb-10">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                KPI Summary
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: "Total Impressions", value: commas(totals.imp) },
                  { label: "Total Clicks", value: commas(totals.clk) },
                  { label: "Overall CTR", value: `${totalCtr.toFixed(2)}%` },
                  { label: "Total Conversions", value: commas(totals.conv) },
                  { label: "Overall Conv. Rate", value: `${totalConvRate.toFixed(2)}%` },
                  { label: "Total Spend", value: currency(totals.sp) },
                  { label: "Total Revenue", value: currency(totals.rev) },
                  { label: "Overall ROI", value: `${totalRoi.toFixed(1)}%` },
                  { label: "Average CPA", value: currency(totalCpa) },
                ].map((kpi) => (
                  <div key={kpi.label} className="bg-neutral-50 border border-neutral-200 p-4">
                    <div className="text-base text-neutral-500 mb-1">{kpi.label}</div>
                    <div className="text-lg font-bold text-black">{kpi.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart */}
            {report.channels.length > 0 && totals.sp > 0 && (
              <div className="mb-10">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                  Spend vs Revenue by Channel
                </h2>
                <div className="overflow-x-auto">
                  <svg
                    viewBox={`0 0 ${chartW} ${chartH}`}
                    className="w-full max-w-[700px]"
                    role="img"
                    aria-label="Horizontal bar chart comparing spend and revenue per channel"
                  >
                    {report.channels.map((ch, i) => {
                      const m = channelMetrics(ch);
                      const y = i * rowH + 20;
                      const spW = (m.sp / chartMaxVal) * chartBarW;
                      const revW = (m.rev / chartMaxVal) * chartBarW;
                      return (
                        <g key={ch.name + i}>
                          <text
                            x={chartPadLeft - 8}
                            y={y + barH / 2 + 2}
                            textAnchor="end"
                            className="fill-black text-[13px] font-bold"
                          >
                            {ch.name}
                          </text>
                          <rect
                            x={chartPadLeft}
                            y={y}
                            width={Math.max(spW, 0)}
                            height={barH}
                            className="fill-black"
                          />
                          <rect
                            x={chartPadLeft}
                            y={y + barH + 4}
                            width={Math.max(revW, 0)}
                            height={barH}
                            className="fill-neutral-400"
                          />
                          {m.sp > 0 && (
                            <text
                              x={chartPadLeft + spW + 6}
                              y={y + barH / 2 + 4}
                              className="fill-neutral-700 text-base"
                            >
                              {currency(m.sp)}
                            </text>
                          )}
                          {m.rev > 0 && (
                            <text
                              x={chartPadLeft + revW + 6}
                              y={y + barH + 4 + barH / 2 + 4}
                              className="fill-neutral-700 text-base"
                            >
                              {currency(m.rev)}
                            </text>
                          )}
                        </g>
                      );
                    })}
                    {/* Legend */}
                    <g transform={`translate(${chartPadLeft}, ${chartH - 12})`}>
                      <rect width={14} height={14} className="fill-black" />
                      <text x={20} y={11} className="fill-neutral-700 text-base">
                        Spend
                      </text>
                      <rect x={80} width={14} height={14} className="fill-neutral-400" />
                      <text x={100} y={11} className="fill-neutral-700 text-base">
                        Revenue
                      </text>
                    </g>
                  </svg>
                </div>
              </div>
            )}

            {/* Channel Breakdown Table */}
            <div className="mb-10">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                Channel Breakdown
              </h2>
              <div className="overflow-x-auto border border-neutral-200">
                <table className="w-full text-base">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="text-left px-4 py-3 font-bold">Channel</th>
                      <th className="text-right px-4 py-3 font-bold">Impressions</th>
                      <th className="text-right px-4 py-3 font-bold">Clicks</th>
                      <th className="text-right px-4 py-3 font-bold">CTR</th>
                      <th className="text-right px-4 py-3 font-bold">Conv.</th>
                      <th className="text-right px-4 py-3 font-bold">Conv. Rate</th>
                      <th className="text-right px-4 py-3 font-bold">Spend</th>
                      <th className="text-right px-4 py-3 font-bold">Revenue</th>
                      <th className="text-right px-4 py-3 font-bold">ROI</th>
                      <th className="text-right px-4 py-3 font-bold">CPA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.channels.map((ch, i) => {
                      const m = channelMetrics(ch);
                      return (
                        <tr key={ch.name + i} className="border-t border-neutral-200">
                          <td className="px-4 py-3 font-bold text-black">{ch.name}</td>
                          <td className="text-right px-4 py-3 text-black">{commas(m.imp)}</td>
                          <td className="text-right px-4 py-3 text-black">{commas(m.clk)}</td>
                          <td className="text-right px-4 py-3 text-black">{m.ctr.toFixed(2)}%</td>
                          <td className="text-right px-4 py-3 text-black">{commas(m.conv)}</td>
                          <td className="text-right px-4 py-3 text-black">
                            {m.convRate.toFixed(2)}%
                          </td>
                          <td className="text-right px-4 py-3 text-black">{currency(m.sp)}</td>
                          <td className="text-right px-4 py-3 text-black">{currency(m.rev)}</td>
                          <td className="text-right px-4 py-3 text-black">{m.roi.toFixed(1)}%</td>
                          <td className="text-right px-4 py-3 text-black">{currency(m.cpa)}</td>
                        </tr>
                      );
                    })}
                    <tr className="border-t-2 border-black bg-neutral-50 font-bold">
                      <td className="px-4 py-3 text-black">Totals</td>
                      <td className="text-right px-4 py-3 text-black">{commas(totals.imp)}</td>
                      <td className="text-right px-4 py-3 text-black">{commas(totals.clk)}</td>
                      <td className="text-right px-4 py-3 text-black">{totalCtr.toFixed(2)}%</td>
                      <td className="text-right px-4 py-3 text-black">{commas(totals.conv)}</td>
                      <td className="text-right px-4 py-3 text-black">
                        {totalConvRate.toFixed(2)}%
                      </td>
                      <td className="text-right px-4 py-3 text-black">{currency(totals.sp)}</td>
                      <td className="text-right px-4 py-3 text-black">{currency(totals.rev)}</td>
                      <td className="text-right px-4 py-3 text-black">{totalRoi.toFixed(1)}%</td>
                      <td className="text-right px-4 py-3 text-black">{currency(totalCpa)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Insights */}
            {(report.insights.wins.some((w) => w.trim()) ||
              report.insights.improvements.some((w) => w.trim()) ||
              report.insights.nextSteps.some((w) => w.trim())) && (
              <div className="mb-10">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                  Insights
                </h2>
                {report.insights.wins.some((w) => w.trim()) && (
                  <div className="mb-4">
                    <h3 className="font-bold text-black text-base mb-2">Key Wins</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      {report.insights.wins
                        .filter((w) => w.trim())
                        .map((w, i) => (
                          <li key={i} className="text-base text-neutral-700">
                            {w}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
                {report.insights.improvements.some((w) => w.trim()) && (
                  <div className="mb-4">
                    <h3 className="font-bold text-black text-base mb-2">Areas for Improvement</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      {report.insights.improvements
                        .filter((w) => w.trim())
                        .map((w, i) => (
                          <li key={i} className="text-base text-neutral-700">
                            {w}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
                {report.insights.nextSteps.some((w) => w.trim()) && (
                  <div className="mb-4">
                    <h3 className="font-bold text-black text-base mb-2">Next Steps</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      {report.insights.nextSteps
                        .filter((w) => w.trim())
                        .map((w, i) => (
                          <li key={i} className="text-base text-neutral-700">
                            {w}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Recommendations */}
            {report.recommendations.some((r) => r.text.trim()) && (
              <div className="mb-10">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                  Recommendations
                </h2>
                <div className="space-y-3">
                  {report.recommendations
                    .filter((r) => r.text.trim())
                    .map((r) => (
                      <div
                        key={r.id}
                        className="flex items-start gap-4 border border-neutral-200 p-4"
                      >
                        <span
                          className={`inline-block px-3 py-1 text-base font-bold ${
                            r.priority === "High"
                              ? "bg-black text-white"
                              : r.priority === "Medium"
                                ? "bg-neutral-200 text-black"
                                : "bg-neutral-100 text-neutral-600"
                          }`}
                        >
                          {r.priority}
                        </span>
                        <p className="text-base text-neutral-700 flex-1">{r.text}</p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="border-t border-neutral-200 pt-6 mt-12 text-base text-neutral-500">
              Generated with Client Reporting Dashboard Builder &mdash; Markit Media
            </div>
          </div>
        </section>
            <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Client Reporting Dashboard Builder",
          description: "Build professional marketing reports for clients. Select KPIs, add channels, include insights and recommendations. Export ready-to-present reports.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    </article>
    );
  }

  /* ================================================================ */
  /*  Editor Mode                                                      */
  /* ================================================================ */

  const usedChannels = new Set(report.channels.map((c) => c.name));
  const availableChannels = CHANNEL_NAMES.filter((n) => !usedChannels.has(n));

  return (
    <article className="min-h-screen">
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Client Reporting Dashboard" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-16 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Interactive Tools</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Client Reporting Dashboard Builder
            </h1>
            <SectionDesc>
              Build professional marketing reports for your clients. Add channels, enter
              performance data, write insights, and export a ready-to-present report.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Report Setup */}
      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up" delay={100}>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              Report Setup
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor={`${formId}-client`} className="block text-base font-bold text-black mb-2">
                  Client Name
                </label>
                <input
                  id={`${formId}-client`}
                  type="text"
                  value={report.clientName}
                  onChange={(e) => set("clientName", e.target.value)}
                  placeholder="e.g. Acme Corp"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor={`${formId}-title`} className="block text-base font-bold text-black mb-2">
                  Report Title
                </label>
                <input
                  id={`${formId}-title`}
                  type="text"
                  value={report.reportTitle}
                  onChange={(e) => set("reportTitle", e.target.value)}
                  placeholder="e.g. Monthly Marketing Performance Report"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor={`${formId}-start`} className="block text-base font-bold text-black mb-2">
                  Period Start
                </label>
                <input
                  id={`${formId}-start`}
                  type="date"
                  value={report.periodStart}
                  onChange={(e) => set("periodStart", e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor={`${formId}-end`} className="block text-base font-bold text-black mb-2">
                  Period End
                </label>
                <input
                  id={`${formId}-end`}
                  type="date"
                  value={report.periodEnd}
                  onChange={(e) => set("periodEnd", e.target.value)}
                  className={inputCls}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor={`${formId}-prepared`} className="block text-base font-bold text-black mb-2">
                  Prepared By
                </label>
                <input
                  id={`${formId}-prepared`}
                  type="text"
                  value={report.preparedBy}
                  onChange={(e) => set("preparedBy", e.target.value)}
                  placeholder="e.g. Marketing Team"
                  className={inputCls}
                />
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* Channel Sections */}
      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
              Channels ({report.channels.length}/8)
            </h2>
            <button
              type="button"
              onClick={addChannel}
              disabled={report.channels.length >= 8 || availableChannels.length === 0}
              className={btnPrimary}
            >
              + Add Channel
            </button>
          </div>

          <div className="space-y-8">
            {report.channels.map((ch, idx) => {
              const m = channelMetrics(ch);
              return (
                <Animate key={ch.name + idx} animation="fade-up">
                  <div className="border border-neutral-200 p-6">
                    <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                      <div className="flex-1 min-w-[200px]">
                        <label
                          htmlFor={`${formId}-ch-name-${idx}`}
                          className="block text-base font-bold text-black mb-2"
                        >
                          Channel
                        </label>
                        <select
                          id={`${formId}-ch-name-${idx}`}
                          value={ch.name}
                          onChange={(e) => updateChannel(idx, "name", e.target.value)}
                          className={selectCls}
                        >
                          <option value={ch.name}>{ch.name}</option>
                          {availableChannels.map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </div>
                      {report.channels.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeChannel(idx)}
                          className={btnDanger}
                          aria-label={`Remove ${ch.name} channel`}
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <label
                          htmlFor={`${formId}-ch-imp-${idx}`}
                          className="block text-base font-bold text-black mb-2"
                        >
                          Impressions
                        </label>
                        <input
                          id={`${formId}-ch-imp-${idx}`}
                          type="number"
                          min={0}
                          value={ch.impressions}
                          onChange={(e) => updateChannel(idx, "impressions", e.target.value)}
                          placeholder="0"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`${formId}-ch-clk-${idx}`}
                          className="block text-base font-bold text-black mb-2"
                        >
                          Clicks
                        </label>
                        <input
                          id={`${formId}-ch-clk-${idx}`}
                          type="number"
                          min={0}
                          value={ch.clicks}
                          onChange={(e) => updateChannel(idx, "clicks", e.target.value)}
                          placeholder="0"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className="block text-base font-bold text-black mb-2">CTR</label>
                        <div className="w-full border border-neutral-200 bg-neutral-50 px-4 py-3 text-base text-neutral-600 min-h-[44px]">
                          {m.ctr.toFixed(2)}%
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor={`${formId}-ch-conv-${idx}`}
                          className="block text-base font-bold text-black mb-2"
                        >
                          Conversions
                        </label>
                        <input
                          id={`${formId}-ch-conv-${idx}`}
                          type="number"
                          min={0}
                          value={ch.conversions}
                          onChange={(e) => updateChannel(idx, "conversions", e.target.value)}
                          placeholder="0"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className="block text-base font-bold text-black mb-2">
                          Conv. Rate
                        </label>
                        <div className="w-full border border-neutral-200 bg-neutral-50 px-4 py-3 text-base text-neutral-600 min-h-[44px]">
                          {m.convRate.toFixed(2)}%
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor={`${formId}-ch-spend-${idx}`}
                          className="block text-base font-bold text-black mb-2"
                        >
                          Spend ($)
                        </label>
                        <input
                          id={`${formId}-ch-spend-${idx}`}
                          type="number"
                          min={0}
                          value={ch.spend}
                          onChange={(e) => updateChannel(idx, "spend", e.target.value)}
                          placeholder="0"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`${formId}-ch-rev-${idx}`}
                          className="block text-base font-bold text-black mb-2"
                        >
                          Revenue ($)
                        </label>
                        <input
                          id={`${formId}-ch-rev-${idx}`}
                          type="number"
                          min={0}
                          value={ch.revenue}
                          onChange={(e) => updateChannel(idx, "revenue", e.target.value)}
                          placeholder="0"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className="block text-base font-bold text-black mb-2">ROI</label>
                        <div className="w-full border border-neutral-200 bg-neutral-50 px-4 py-3 text-base text-neutral-600 min-h-[44px]">
                          {m.roi.toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <label className="block text-base font-bold text-black mb-2">CPA</label>
                        <div className="w-full border border-neutral-200 bg-neutral-50 px-4 py-3 text-base text-neutral-600 min-h-[44px]">
                          {currency(m.cpa)}
                        </div>
                      </div>
                    </div>
                  </div>
                </Animate>
              );
            })}
          </div>
        </div>
      </section>

      {/* KPI Summary */}
      <section className="px-6 lg:px-12 py-8 bg-neutral-50">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
              KPI Summary (Auto-Calculated)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: "Total Impressions", value: commas(totals.imp) },
                { label: "Total Clicks", value: commas(totals.clk) },
                { label: "Overall CTR", value: `${totalCtr.toFixed(2)}%` },
                { label: "Total Conversions", value: commas(totals.conv) },
                { label: "Overall Conv. Rate", value: `${totalConvRate.toFixed(2)}%` },
                { label: "Total Spend", value: currency(totals.sp) },
                { label: "Total Revenue", value: currency(totals.rev) },
                { label: "Overall ROI", value: `${totalRoi.toFixed(1)}%` },
                { label: "Average CPA", value: currency(totalCpa) },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white border border-neutral-200 p-4">
                  <div className="text-base text-neutral-500 mb-1">{kpi.label}</div>
                  <div className="text-lg font-bold text-black">{kpi.value}</div>
                </div>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* Spend vs Revenue Chart */}
      {report.channels.length > 0 && (
        <section className="px-6 lg:px-12 py-8">
          <div className="max-w-5xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                Spend vs Revenue by Channel
              </h2>
              <div className="overflow-x-auto border border-neutral-200 bg-white p-6">
                <svg
                  viewBox={`0 0 ${chartW} ${chartH}`}
                  className="w-full max-w-[700px]"
                  role="img"
                  aria-label="Horizontal bar chart comparing spend and revenue per channel"
                >
                  {report.channels.map((ch, i) => {
                    const m = channelMetrics(ch);
                    const y = i * rowH + 20;
                    const spW = (m.sp / chartMaxVal) * chartBarW;
                    const revW = (m.rev / chartMaxVal) * chartBarW;
                    return (
                      <g key={ch.name + i}>
                        <text
                          x={chartPadLeft - 8}
                          y={y + barH / 2 + 2}
                          textAnchor="end"
                          className="fill-black text-[13px] font-bold"
                        >
                          {ch.name}
                        </text>
                        <rect
                          x={chartPadLeft}
                          y={y}
                          width={Math.max(spW, 0)}
                          height={barH}
                          className="fill-black"
                        />
                        <rect
                          x={chartPadLeft}
                          y={y + barH + 4}
                          width={Math.max(revW, 0)}
                          height={barH}
                          className="fill-neutral-400"
                        />
                        {m.sp > 0 && (
                          <text
                            x={chartPadLeft + spW + 6}
                            y={y + barH / 2 + 4}
                            className="fill-neutral-700 text-base"
                          >
                            {currency(m.sp)}
                          </text>
                        )}
                        {m.rev > 0 && (
                          <text
                            x={chartPadLeft + revW + 6}
                            y={y + barH + 4 + barH / 2 + 4}
                            className="fill-neutral-700 text-base"
                          >
                            {currency(m.rev)}
                          </text>
                        )}
                      </g>
                    );
                  })}
                  {/* Legend */}
                  <g transform={`translate(${chartPadLeft}, ${chartH - 12})`}>
                    <rect width={14} height={14} className="fill-black" />
                    <text x={20} y={11} className="fill-neutral-700 text-base">
                      Spend
                    </text>
                    <rect x={80} width={14} height={14} className="fill-neutral-400" />
                    <text x={100} y={11} className="fill-neutral-700 text-base">
                      Revenue
                    </text>
                  </g>
                </svg>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* Executive Summary */}
      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
              Executive Summary (Auto-Generated)
            </h2>
            <div className="border border-neutral-200 bg-neutral-50 p-6">
              <p className="text-base text-neutral-700 leading-relaxed">{execSummary}</p>
            </div>
          </Animate>
        </div>
      </section>

      {/* Insights */}
      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              Insights
            </h2>

            {(["wins", "improvements", "nextSteps"] as const).map((category) => {
              const labels: Record<string, string> = {
                wins: "Key Wins",
                improvements: "Areas for Improvement",
                nextSteps: "Next Steps",
              };
              return (
                <div key={category} className="mb-8">
                  <h3 className="font-bold text-black text-base mb-3">{labels[category]}</h3>
                  <div className="space-y-3">
                    {report.insights[category].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <label htmlFor={`${formId}-insight-${category}-${idx}`} className="sr-only">
                          {labels[category]} item {idx + 1}
                        </label>
                        <input
                          id={`${formId}-insight-${category}-${idx}`}
                          type="text"
                          value={item}
                          onChange={(e) => updateInsight(category, idx, e.target.value)}
                          placeholder={`Add a ${labels[category].toLowerCase()} item...`}
                          className={`${inputCls} flex-1`}
                        />
                        {report.insights[category].length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeInsight(category, idx)}
                            className={btnDanger}
                            aria-label={`Remove ${labels[category]} item ${idx + 1}`}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => addInsight(category)}
                    className="mt-3 text-base font-bold text-black underline underline-offset-4 hover:text-neutral-600 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    + Add {labels[category]} Item
                  </button>
                </div>
              );
            })}
          </Animate>
        </div>
      </section>

      {/* Recommendations */}
      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                Recommendations
              </h2>
              <button type="button" onClick={addRecommendation} className={btnPrimary}>
                + Add Recommendation
              </button>
            </div>

            <div className="space-y-4">
              {report.recommendations.map((rec, idx) => (
                <div key={rec.id} className="border border-neutral-200 p-4 flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor={`${formId}-rec-text-${rec.id}`}
                      className="block text-base font-bold text-black mb-2"
                    >
                      Recommendation {idx + 1}
                    </label>
                    <input
                      id={`${formId}-rec-text-${rec.id}`}
                      type="text"
                      value={rec.text}
                      onChange={(e) => updateRecommendation(rec.id, "text", e.target.value)}
                      placeholder="Describe a recommendation..."
                      className={inputCls}
                    />
                  </div>
                  <div className="w-full md:w-48">
                    <label
                      htmlFor={`${formId}-rec-pri-${rec.id}`}
                      className="block text-base font-bold text-black mb-2"
                    >
                      Priority
                    </label>
                    <select
                      id={`${formId}-rec-pri-${rec.id}`}
                      value={rec.priority}
                      onChange={(e) => updateRecommendation(rec.id, "priority", e.target.value)}
                      className={selectCls}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  {report.recommendations.length > 1 && (
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeRecommendation(rec.id)}
                        className={btnDanger}
                        aria-label={`Remove recommendation ${idx + 1}`}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* Actions */}
      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-4 items-center">
            <button type="button" onClick={() => setPreview(true)} className={btnPrimary}>
              Preview Report
            </button>
            <button type="button" onClick={handleSave} className={btnSecondary}>
              {saved ? "Saved!" : "Save to Browser"}
            </button>
            <button type="button" onClick={handleExport} className={btnSecondary}>
              Export as .txt
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Reset the entire report? This cannot be undone.")) {
                  setReport(defaultState());
                  localStorage.removeItem(STORAGE_KEY);
                }
              }}
              className={btnDanger}
            >
              Reset All
            </button>
          </div>
        </div>
      </section>

      {/* Educational Section */}
      <section className="px-6 lg:px-12 py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              Client Reporting Best Practices
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-black text-base mb-2">
                  Lead with outcomes, not raw data
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Clients care about business results. Start every report with the executive
                  summary that ties marketing activity to revenue, leads, or pipeline growth.
                  Raw metrics belong in the appendix, not the opening slide.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black text-base mb-2">
                  Establish a consistent reporting cadence
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Whether weekly, biweekly, or monthly, a predictable cadence builds trust.
                  Clients should never have to ask for updates. Automated reporting saves time
                  and keeps everyone aligned on performance.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black text-base mb-2">
                  Always include recommendations
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  A report without next steps is just a data dump. Every report should answer:
                  what happened, why it happened, and what we should do about it. Prioritize
                  recommendations so the client knows where to focus.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black text-base mb-2">
                  Benchmark against previous periods
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Numbers without context are meaningless. Compare performance against the
                  previous period, the same period last year, or agreed-upon targets. This
                  transforms data into a story of progress or areas needing attention.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black text-base mb-2">
                  Keep it visual and scannable
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Decision-makers skim. Use charts, KPI tiles, and clear section headings so
                  the report can be understood in under two minutes. Save the deep analysis for
                  the meeting discussion, not the document itself.
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
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-4">
              Need professional reporting built into your marketing retainer?
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              Our team builds custom reporting dashboards, automates monthly reports, and
              delivers insights that help you make better decisions. Let us handle the numbers.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-neutral-800 transition-colors motion-reduce:transition-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Get in Touch &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Client Reporting Dashboard"
        services={[
          { title: "Digital Marketing", desc: "Data-driven strategy with transparent reporting and insights.", href: "/services/digital-marketing" },
          { title: "Performance Marketing", desc: "Campaign optimization based on real performance data.", href: "/services/performance-marketing" },
          { title: "SEO", desc: "SEO analytics that show exactly what drives organic growth.", href: "/services/seo" },
        ]}
        relatedTools={[
          { title: "Clv Calculator", href: "/resources/clv-calculator" },
          { title: "Campaign Tracker", href: "/resources/campaign-tracker" },
          { title: "Channel Mix Modeller", href: "/resources/channel-mix-modeller" },
          { title: "Channel Recommender", href: "/resources/channel-recommender" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
