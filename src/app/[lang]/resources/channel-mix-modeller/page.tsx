"use client";

import { useState, useCallback, useMemo, useId } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Channel {
  name: string;
  allocation: number; // 0-100
  cpa: number; // expected cost per acquisition
  conversionRate: number; // percentage 0-100
}

interface Scenario {
  name: string;
  totalBudget: number;
  aov: number;
  channels: Channel[];
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const CHANNEL_NAMES = [
  "Google Ads",
  "Meta Ads",
  "LinkedIn Ads",
  "TikTok Ads",
  "SEO",
  "Content Marketing",
  "Email Marketing",
  "Influencer Marketing",
  "Affiliate Marketing",
  "Programmatic Display",
] as const;

const GRAY_SHADES = [
  "#000000",
  "#1a1a1a",
  "#333333",
  "#4d4d4d",
  "#666666",
  "#808080",
  "#999999",
  "#b3b3b3",
  "#cccccc",
  "#e0e0e0",
];

function defaultChannels(): Channel[] {
  return CHANNEL_NAMES.map((name) => ({
    name,
    allocation: 10,
    cpa: 50,
    conversionRate: 3,
  }));
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

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
    maximumFractionDigits: 2,
  }).format(n);

const pct = (n: number) => `${n.toFixed(1)}%`;

/* ------------------------------------------------------------------ */
/*  Pie Chart SVG                                                      */
/* ------------------------------------------------------------------ */

function PieChart({
  channels,
  size = 260,
}: {
  channels: Channel[];
  size?: number;
}) {
  const activeChannels = channels.filter((c) => c.allocation > 0);
  if (activeChannels.length === 0) {
    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="Allocation pie chart - no channels allocated"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 4}
          fill="none"
          stroke="#e5e5e5"
          strokeWidth={2}
        />
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#999"
          fontSize={14}
        >
          No allocation
        </text>
      </svg>
    );
  }

  const total = channels.reduce((s, c) => s + c.allocation, 0);
  if (total === 0) return null;

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 4;
  let cumulative = 0;
  const paths: React.ReactNode[] = [];

  channels.forEach((ch, i) => {
    if (ch.allocation <= 0) return;
    const fraction = ch.allocation / total;
    const startAngle = cumulative * 2 * Math.PI - Math.PI / 2;
    cumulative += fraction;
    const endAngle = cumulative * 2 * Math.PI - Math.PI / 2;
    const largeArc = fraction > 0.5 ? 1 : 0;

    if (fraction >= 0.9999) {
      paths.push(
        <circle key={i} cx={cx} cy={cy} r={r} fill={GRAY_SHADES[i]} />,
      );
    } else {
      const x1 = cx + r * Math.cos(startAngle);
      const y1 = cy + r * Math.sin(startAngle);
      const x2 = cx + r * Math.cos(endAngle);
      const y2 = cy + r * Math.sin(endAngle);
      paths.push(
        <path
          key={i}
          d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`}
          fill={GRAY_SHADES[i]}
        />,
      );
    }
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Allocation pie chart showing channel distribution"
    >
      {paths}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Stacked Allocation Bar                                             */
/* ------------------------------------------------------------------ */

function AllocationBar({ channels }: { channels: Channel[] }) {
  const total = channels.reduce((s, c) => s + c.allocation, 0);
  if (total === 0) {
    return (
      <div className="w-full h-10 bg-gray-100 flex items-center justify-center text-base text-gray-400">
        No allocation set
      </div>
    );
  }
  return (
    <div
      className="w-full h-10 flex overflow-hidden"
      role="img"
      aria-label="Stacked bar showing channel allocation percentages"
    >
      {channels.map((ch, i) => {
        const widthPct = total > 0 ? (ch.allocation / total) * 100 : 0;
        if (widthPct <= 0) return null;
        return (
          <div
            key={ch.name}
            className="h-full relative group"
            style={{
              width: `${widthPct}%`,
              backgroundColor: GRAY_SHADES[i],
              minWidth: widthPct > 0 ? "2px" : 0,
            }}
          >
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-base px-3 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
              {ch.name}: {ch.allocation}%
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Channel Row                                                        */
/* ------------------------------------------------------------------ */

function ChannelRow({
  channel,
  index,
  budget,
  onChange,
}: {
  channel: Channel;
  index: number;
  budget: number;
  onChange: (index: number, field: keyof Channel, value: number) => void;
}) {
  const idPrefix = `ch-${index}`;
  const channelBudget = (channel.allocation / 100) * budget;
  const leads =
    channel.cpa > 0 ? Math.round(channelBudget / channel.cpa) : 0;
  const conversions = Math.round(leads * (channel.conversionRate / 100));

  return (
    <div className="border border-gray-200 p-5 space-y-4">
      <div className="flex items-center gap-3">
        <span
          className="w-4 h-4 flex-shrink-0 inline-block"
          style={{ backgroundColor: GRAY_SHADES[index] }}
          aria-hidden="true"
        />
        <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black">
          {channel.name}
        </h3>
        <span className="ml-auto text-base font-bold text-black">
          {fmt(channelBudget)}
        </span>
      </div>

      <div>
        <label
          htmlFor={`${idPrefix}-alloc`}
          className="block text-base font-bold text-black mb-1"
        >
          Allocation: {channel.allocation}%
        </label>
        <input
          id={`${idPrefix}-alloc`}
          type="range"
          min={0}
          max={100}
          step={1}
          value={channel.allocation}
          onChange={(e) =>
            onChange(index, "allocation", Number(e.target.value))
          }
          className="w-full accent-black h-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`${idPrefix}-cpa`}
            className="block text-base font-bold text-black mb-1"
          >
            Expected CPA ($)
          </label>
          <input
            id={`${idPrefix}-cpa`}
            type="number"
            min={1}
            step={1}
            value={channel.cpa}
            onChange={(e) =>
              onChange(index, "cpa", Math.max(1, Number(e.target.value)))
            }
            className="w-full border border-gray-300 px-3 py-2 text-base text-black focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <label
            htmlFor={`${idPrefix}-cr`}
            className="block text-base font-bold text-black mb-1"
          >
            Conv. Rate (%)
          </label>
          <input
            id={`${idPrefix}-cr`}
            type="number"
            min={0}
            max={100}
            step={0.1}
            value={channel.conversionRate}
            onChange={(e) =>
              onChange(
                index,
                "conversionRate",
                Math.min(100, Math.max(0, Number(e.target.value))),
              )
            }
            className="w-full border border-gray-300 px-3 py-2 text-base text-black focus:outline-none focus:border-black"
          />
        </div>
      </div>

      <div className="text-base text-gray-500">
        Projected leads: <span className="font-bold text-black">{leads}</span>
        {" | "}Conversions:{" "}
        <span className="font-bold text-black">{conversions}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function ChannelMixModellerPage() {
  const [totalBudget, setTotalBudget] = useState(10000);
  const [aov, setAov] = useState(200);
  const [channels, setChannels] = useState<Channel[]>(defaultChannels);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [scenarioName, setScenarioName] = useState("");

  const scenarioNameId = useId();
  const budgetId = useId();
  const aovId = useId();

  /* ---- derived ---- */
  const totalAllocation = useMemo(
    () => channels.reduce((s, c) => s + c.allocation, 0),
    [channels],
  );

  const channelResults = useMemo(() => {
    return channels.map((ch) => {
      const budget = (ch.allocation / 100) * totalBudget;
      const leads = ch.cpa > 0 ? Math.round(budget / ch.cpa) : 0;
      const conversions = Math.round(leads * (ch.conversionRate / 100));
      const revenue = conversions * aov;
      const roi = budget > 0 ? ((revenue - budget) / budget) * 100 : 0;
      const cpl = leads > 0 ? budget / leads : 0;
      return { ...ch, budget, leads, conversions, revenue, roi, cpl };
    });
  }, [channels, totalBudget, aov]);

  const summary = useMemo(() => {
    const totalLeads = channelResults.reduce((s, c) => s + c.leads, 0);
    const totalRevenue = channelResults.reduce((s, c) => s + c.revenue, 0);
    const blendedCPA = totalLeads > 0 ? totalBudget / totalLeads : 0;
    const blendedROI =
      totalBudget > 0
        ? ((totalRevenue - totalBudget) / totalBudget) * 100
        : 0;
    const best = channelResults
      .filter((c) => c.allocation > 0)
      .sort((a, b) => b.roi - a.roi)[0];
    return { totalLeads, totalRevenue, blendedCPA, blendedROI, best };
  }, [channelResults, totalBudget]);

  /* ---- handlers ---- */
  const handleChannelChange = useCallback(
    (index: number, field: keyof Channel, value: number) => {
      setChannels((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], [field]: value };
        return next;
      });
    },
    [],
  );

  const saveScenario = useCallback(() => {
    if (scenarios.length >= 3) return;
    const name =
      scenarioName.trim() || `Scenario ${scenarios.length + 1}`;
    setScenarios((prev) => [
      ...prev,
      {
        name,
        totalBudget,
        aov,
        channels: channels.map((c) => ({ ...c })),
      },
    ]);
    setScenarioName("");
  }, [scenarioName, scenarios.length, totalBudget, aov, channels]);

  const removeScenario = useCallback((index: number) => {
    setScenarios((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const loadScenario = useCallback((scenario: Scenario) => {
    setTotalBudget(scenario.totalBudget);
    setAov(scenario.aov);
    setChannels(scenario.channels.map((c) => ({ ...c })));
  }, []);

  const exportTxt = useCallback(() => {
    const lines: string[] = [];
    lines.push("=== Marketing Channel Mix Model ===");
    lines.push(`Date: ${new Date().toLocaleDateString()}`);
    lines.push(`Total Monthly Budget: ${fmt(totalBudget)}`);
    lines.push(`Average Order Value: ${fmt(aov)}`);
    lines.push(`Total Allocation: ${totalAllocation}%`);
    lines.push("");
    lines.push("--- Channel Details ---");
    channelResults.forEach((ch) => {
      lines.push("");
      lines.push(`${ch.name}`);
      lines.push(`  Allocation: ${ch.allocation}%`);
      lines.push(`  Budget: ${fmt(ch.budget)}`);
      lines.push(`  Expected CPA: ${fmtDec(ch.cpa)}`);
      lines.push(`  Conversion Rate: ${pct(ch.conversionRate)}`);
      lines.push(`  Projected Leads: ${ch.leads}`);
      lines.push(`  Cost per Lead: ${fmtDec(ch.cpl)}`);
      lines.push(`  Projected Conversions: ${ch.conversions}`);
      lines.push(`  Projected Revenue: ${fmt(ch.revenue)}`);
      lines.push(`  ROI: ${pct(ch.roi)}`);
    });
    lines.push("");
    lines.push("--- Summary ---");
    lines.push(`Total Projected Leads: ${summary.totalLeads}`);
    lines.push(`Total Projected Revenue: ${fmt(summary.totalRevenue)}`);
    lines.push(`Blended CPA: ${fmtDec(summary.blendedCPA)}`);
    lines.push(`Blended ROI: ${pct(summary.blendedROI)}`);
    if (summary.best) {
      lines.push(
        `Best Performing Channel: ${summary.best.name} (${pct(summary.best.roi)} ROI)`,
      );
    }

    if (scenarios.length > 0) {
      lines.push("");
      lines.push("--- Saved Scenarios ---");
      scenarios.forEach((sc) => {
        lines.push("");
        lines.push(`Scenario: ${sc.name}`);
        lines.push(`  Budget: ${fmt(sc.totalBudget)} | AOV: ${fmt(sc.aov)}`);
        sc.channels.forEach((ch) => {
          if (ch.allocation > 0) {
            lines.push(
              `  ${ch.name}: ${ch.allocation}% (${fmt((ch.allocation / 100) * sc.totalBudget)})`,
            );
          }
        });
      });
    }

    lines.push("");
    lines.push("Generated by Markit Media Channel Mix Modeller");
    lines.push("https://themarkitmedia.com/resources/channel-mix-modeller");

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "channel-mix-model.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [totalBudget, aov, totalAllocation, channelResults, summary, scenarios]);

  /* ---- scenario helpers for comparison table ---- */
  const scenarioResults = useMemo(() => {
    return scenarios.map((sc) => {
      const results = sc.channels.map((ch) => {
        const b = (ch.allocation / 100) * sc.totalBudget;
        const leads = ch.cpa > 0 ? Math.round(b / ch.cpa) : 0;
        const conversions = Math.round(leads * (ch.conversionRate / 100));
        const revenue = conversions * sc.aov;
        const roi = b > 0 ? ((revenue - b) / b) * 100 : 0;
        return { ...ch, budget: b, leads, conversions, revenue, roi };
      });
      const totalLeads = results.reduce((s, c) => s + c.leads, 0);
      const totalRevenue = results.reduce((s, c) => s + c.revenue, 0);
      const blendedCPA = totalLeads > 0 ? sc.totalBudget / totalLeads : 0;
      const blendedROI =
        sc.totalBudget > 0
          ? ((totalRevenue - sc.totalBudget) / sc.totalBudget) * 100
          : 0;
      const best = results
        .filter((c) => c.allocation > 0)
        .sort((a, b) => b.roi - a.roi)[0];
      return {
        name: sc.name,
        totalBudget: sc.totalBudget,
        totalLeads,
        totalRevenue,
        blendedCPA,
        blendedROI,
        bestChannel: best?.name ?? "N/A",
      };
    });
  }, [scenarios]);

  const allocationWarning =
    totalAllocation !== 100
      ? totalAllocation > 100
        ? `Over-allocated by ${totalAllocation - 100}%. Total must equal 100%.`
        : `Under-allocated by ${100 - totalAllocation}%. Total must equal 100%.`
      : null;

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <article className="min-h-screen">
      {/* Breadcrumb */}
      <nav className="px-6 lg:px-12 pt-20" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-gray-400 max-w-7xl mx-auto">
          <li>
            <Link
              href="/"
              className="hover:text-black transition-colors motion-reduce:transition-none"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/resources"
              className="hover:text-black transition-colors motion-reduce:transition-none"
            >
              Resources
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-black font-medium">Channel Mix Modeller</li>
        </ol>
      </nav>

      {/* Header */}
      <section className="px-6 lg:px-12 pt-16 pb-8">
        <div className="max-w-5xl mx-auto">
          <span className="text-base font-medium text-gray-400 uppercase tracking-[0.15em]">
            Interactive Tools
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
            Marketing Channel Mix Modeller
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-3xl">
            Allocate your marketing budget across channels, model projected
            performance, and compare scenarios to find the optimal spend
            distribution for your business.
          </p>
        </div>
      </section>

      {/* Global Inputs */}
      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 border border-gray-200 p-6">
            <div>
              <label
                htmlFor={budgetId}
                className="block text-base font-bold text-black mb-2"
              >
                Total Monthly Budget
              </label>
              <div className="flex items-center gap-4">
                <input
                  id={budgetId}
                  type="range"
                  min={1000}
                  max={200000}
                  step={1000}
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(Number(e.target.value))}
                  className="flex-1 accent-black h-2"
                />
                <span className="text-base font-bold text-black w-28 text-right">
                  {fmt(totalBudget)}
                </span>
              </div>
            </div>
            <div>
              <label
                htmlFor={aovId}
                className="block text-base font-bold text-black mb-2"
              >
                Average Order Value (AOV)
              </label>
              <div className="flex items-center gap-4">
                <input
                  id={aovId}
                  type="range"
                  min={10}
                  max={10000}
                  step={10}
                  value={aov}
                  onChange={(e) => setAov(Number(e.target.value))}
                  className="flex-1 accent-black h-2"
                />
                <span className="text-base font-bold text-black w-28 text-right">
                  {fmt(aov)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Allocation Bar + Warning */}
      <section className="px-6 lg:px-12 py-4">
        <div className="max-w-5xl mx-auto space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
              Channel Allocation
            </h2>
            <span
              className={`text-base font-bold ${totalAllocation === 100 ? "text-black" : "text-gray-500"}`}
            >
              Total: {totalAllocation}%
            </span>
          </div>

          <AllocationBar channels={channels} />

          {allocationWarning && (
            <div
              role="alert"
              className="border border-gray-400 bg-gray-50 px-4 py-3 text-base font-bold text-black"
            >
              {allocationWarning}
            </div>
          )}

          {/* Pie Chart Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
            {channels.map((ch, i) =>
              ch.allocation > 0 ? (
                <span key={ch.name} className="flex items-center gap-2 text-base text-gray-600">
                  <span
                    className="w-3 h-3 inline-block flex-shrink-0"
                    style={{ backgroundColor: GRAY_SHADES[i] }}
                    aria-hidden="true"
                  />
                  {ch.name}
                </span>
              ) : null,
            )}
          </div>
        </div>
      </section>

      {/* Channel Controls */}
      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {channels.map((ch, i) => (
            <ChannelRow
              key={ch.name}
              channel={ch}
              index={i}
              budget={totalBudget}
              onChange={handleChannelChange}
            />
          ))}
        </div>
      </section>

      {/* Pie Chart */}
      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
            Allocation Breakdown
          </h2>
          <PieChart channels={channels} />
        </div>
      </section>

      {/* Projected Results Table */}
      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
            Projected Results by Channel
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-base text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="py-3 pr-4 font-extrabold text-black">
                    Channel
                  </th>
                  <th className="py-3 pr-4 font-extrabold text-black text-right">
                    Budget
                  </th>
                  <th className="py-3 pr-4 font-extrabold text-black text-right">
                    Leads
                  </th>
                  <th className="py-3 pr-4 font-extrabold text-black text-right">
                    Cost/Lead
                  </th>
                  <th className="py-3 pr-4 font-extrabold text-black text-right">
                    Revenue
                  </th>
                  <th className="py-3 font-extrabold text-black text-right">
                    ROI
                  </th>
                </tr>
              </thead>
              <tbody>
                {channelResults.map((ch, i) => (
                  <tr
                    key={ch.name}
                    className="border-b border-gray-200"
                  >
                    <td className="py-3 pr-4 text-black font-medium flex items-center gap-2">
                      <span
                        className="w-3 h-3 inline-block flex-shrink-0"
                        style={{ backgroundColor: GRAY_SHADES[i] }}
                        aria-hidden="true"
                      />
                      {ch.name}
                    </td>
                    <td className="py-3 pr-4 text-right text-black">
                      {fmt(ch.budget)}
                    </td>
                    <td className="py-3 pr-4 text-right text-black">
                      {ch.leads}
                    </td>
                    <td className="py-3 pr-4 text-right text-black">
                      {ch.leads > 0 ? fmtDec(ch.cpl) : "-"}
                    </td>
                    <td className="py-3 pr-4 text-right text-black">
                      {fmt(ch.revenue)}
                    </td>
                    <td
                      className={`py-3 text-right font-bold ${ch.roi >= 0 ? "text-black" : "text-gray-500"}`}
                    >
                      {ch.allocation > 0 ? pct(ch.roi) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Summary Dashboard */}
      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
            Summary Dashboard
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Total Budget", value: fmt(totalBudget) },
              {
                label: "Projected Leads",
                value: summary.totalLeads.toLocaleString(),
              },
              { label: "Blended CPA", value: fmtDec(summary.blendedCPA) },
              { label: "Blended ROI", value: pct(summary.blendedROI) },
              {
                label: "Best Channel",
                value: summary.best?.name ?? "N/A",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="border border-gray-200 p-5 text-center"
              >
                <p className="text-base text-gray-500 mb-1">{item.label}</p>
                <p className="text-lg font-extrabold text-black">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {summary.best && (
            <p className="mt-4 text-base text-gray-500">
              <span className="font-bold text-black">
                {summary.best.name}
              </span>{" "}
              is projected to deliver the highest ROI at{" "}
              <span className="font-bold text-black">
                {pct(summary.best.roi)}
              </span>
              , generating{" "}
              <span className="font-bold text-black">
                {fmt(summary.best.revenue)}
              </span>{" "}
              in revenue from a{" "}
              <span className="font-bold text-black">
                {fmt(summary.best.budget)}
              </span>{" "}
              spend.
            </p>
          )}
        </div>
      </section>

      {/* Scenario Comparison */}
      <section className="px-6 lg:px-12 py-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
            Scenario Comparison
          </h2>

          {/* Save scenario */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4 mb-8">
            <div className="flex-1">
              <label
                htmlFor={scenarioNameId}
                className="block text-base font-bold text-black mb-1"
              >
                Scenario Name
              </label>
              <input
                id={scenarioNameId}
                type="text"
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
                placeholder={`Scenario ${scenarios.length + 1}`}
                className="w-full border border-gray-300 px-3 py-2 text-base text-black focus:outline-none focus:border-black"
                maxLength={40}
              />
            </div>
            <button
              type="button"
              onClick={saveScenario}
              disabled={scenarios.length >= 3}
              className="bg-black text-white px-8 py-2 text-base font-bold hover:bg-gray-800 transition-colors motion-reduce:transition-none disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {scenarios.length >= 3
                ? "Max 3 Scenarios"
                : "Save Current Mix"}
            </button>
          </div>

          {/* Comparison table */}
          {scenarioResults.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-base text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="py-3 pr-4 font-extrabold text-black">
                      Metric
                    </th>
                    {scenarioResults.map((sc, i) => (
                      <th
                        key={i}
                        className="py-3 pr-4 font-extrabold text-black text-right"
                      >
                        <span className="flex items-center justify-end gap-2">
                          {sc.name}
                          <button
                            type="button"
                            onClick={() => removeScenario(i)}
                            className="text-gray-400 hover:text-black transition-colors text-base"
                            aria-label={`Remove scenario ${sc.name}`}
                          >
                            x
                          </button>
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      label: "Total Budget",
                      values: scenarioResults.map((s) =>
                        fmt(s.totalBudget),
                      ),
                    },
                    {
                      label: "Projected Leads",
                      values: scenarioResults.map((s) =>
                        s.totalLeads.toLocaleString(),
                      ),
                    },
                    {
                      label: "Projected Revenue",
                      values: scenarioResults.map((s) =>
                        fmt(s.totalRevenue),
                      ),
                    },
                    {
                      label: "Blended CPA",
                      values: scenarioResults.map((s) =>
                        fmtDec(s.blendedCPA),
                      ),
                    },
                    {
                      label: "Blended ROI",
                      values: scenarioResults.map((s) =>
                        pct(s.blendedROI),
                      ),
                    },
                    {
                      label: "Best Channel",
                      values: scenarioResults.map((s) => s.bestChannel),
                    },
                  ].map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-gray-200"
                    >
                      <td className="py-3 pr-4 font-medium text-black">
                        {row.label}
                      </td>
                      {row.values.map((v, i) => (
                        <td
                          key={i}
                          className="py-3 pr-4 text-right text-black"
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Load scenario buttons */}
              <div className="flex flex-wrap gap-3 mt-4">
                {scenarios.map((sc, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => loadScenario(sc)}
                    className="border border-black px-4 py-2 text-base font-bold text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none"
                  >
                    Load {sc.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {scenarioResults.length === 0 && (
            <p className="text-base text-gray-400">
              Save your current channel mix as a scenario to start comparing
              different allocations side by side. You can save up to 3
              scenarios.
            </p>
          )}
        </div>
      </section>

      {/* Export */}
      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={exportTxt}
            className="bg-black text-white px-10 py-4 text-base font-bold hover:bg-gray-800 transition-colors motion-reduce:transition-none"
          >
            Export as .txt
          </button>
          <Link
            href="/get-a-quote"
            className="inline-flex items-center justify-center gap-3 border-2 border-black text-black px-10 py-4 font-bold text-base hover:bg-black hover:text-white transition-colors motion-reduce:transition-none"
          >
            Get a Custom Strategy &rarr;
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-6 lg:px-12 py-8 border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <p className="text-base text-gray-400 leading-relaxed">
            Projections are estimates based on the CPA and conversion rate
            inputs you provide. Actual results vary based on industry,
            competition, creative quality, landing page experience, and
            campaign optimization. Use this tool for directional planning,
            not as a guarantee of results.
          </p>
        </div>
      </section>
    </article>
  );
}
