"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ---------- types ---------- */

const CHANNEL_PRESETS = [
  "Google Ads",
  "Meta Ads",
  "SEO",
  "Email",
  "Content",
  "Social",
  "LinkedIn Ads",
  "TikTok Ads",
  "Custom",
] as const;

interface ChannelData {
  id: string;
  name: string;
  spend: string;
  revenue: string;
  leads: string;
  conversions: string;
}

interface PeriodData {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
  channels: ChannelData[];
}

/* ---------- helpers ---------- */

let nextId = 1;
function uid() {
  return "ch_" + nextId++;
}
let nextPeriodId = 1;
function pidUid() {
  return "pd_" + nextPeriodId++;
}

function num(v: string) {
  const n = parseFloat(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function fmt(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function fmtMoney(n: number) {
  return "$" + fmt(n);
}

function fmtPct(n: number) {
  return (Number.isFinite(n) ? n.toFixed(1) : "0.0") + "%";
}

function fmtRatio(n: number) {
  return Number.isFinite(n) ? n.toFixed(2) + "x" : "0.00x";
}

function fmtCost(n: number) {
  return Number.isFinite(n) ? "$" + n.toFixed(2) : "$0.00";
}

function channelROI(ch: ChannelData) {
  const s = num(ch.spend);
  const r = num(ch.revenue);
  return s > 0 ? ((r - s) / s) * 100 : 0;
}

function channelROAS(ch: ChannelData) {
  const s = num(ch.spend);
  return s > 0 ? num(ch.revenue) / s : 0;
}

function channelCPL(ch: ChannelData) {
  const l = num(ch.leads);
  return l > 0 ? num(ch.spend) / l : 0;
}

function channelCPC(ch: ChannelData) {
  const c = num(ch.conversions);
  return c > 0 ? num(ch.spend) / c : 0;
}

function channelConvRate(ch: ChannelData) {
  const l = num(ch.leads);
  const c = num(ch.conversions);
  return l > 0 ? (c / l) * 100 : 0;
}

function makeChannel(name = "Google Ads"): ChannelData {
  return { id: uid(), name, spend: "", revenue: "", leads: "", conversions: "" };
}

function makePeriod(): PeriodData {
  return {
    id: pidUid(),
    label: "",
    startDate: "",
    endDate: "",
    channels: [makeChannel()],
  };
}

/* ---------- SVG charts ---------- */

function BarChart({ channels }: { channels: ChannelData[] }) {
  const filtered = channels.filter((c) => num(c.spend) > 0);
  if (filtered.length === 0) return null;

  const rois = filtered.map((c) => ({ name: c.name, roi: channelROI(c) }));
  const maxAbs = Math.max(10, ...rois.map((r) => Math.abs(r.roi)));

  const barH = 36;
  const gap = 12;
  const labelW = 120;
  const chartW = 500;
  const totalW = labelW + chartW + 80;
  const totalH = rois.length * (barH + gap) + gap;
  const midX = labelW + chartW / 2;

  return (
    <div className="overflow-x-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing ROI Report Generator",
          description: "Generate a professional marketing ROI report. Input channel spend and revenue data to create a comprehensive performance analysis.",
          url: "https://themarkitmedia.com/en/resources/marketing-roi-report",
          applicationCategory: "Business Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <svg
        viewBox={`0 0 ${totalW} ${totalH}`}
        className="w-full max-w-[700px]"
        role="img"
        aria-label="Bar chart showing ROI percentage by channel"
      >
        <title>ROI by Channel</title>
      <link rel="canonical" href="https://themarkitmedia.com/en/resources/marketing-roi-report" />
        {/* zero line */}
        <line
          x1={midX}
          y1={0}
          x2={midX}
          y2={totalH}
          stroke="#d4d4d4"
          strokeWidth={1}
        />
        {rois.map((r, i) => {
          const y = gap + i * (barH + gap);
          const pct = r.roi / maxAbs;
          const barWidth = Math.abs(pct) * (chartW / 2);
          const x = r.roi >= 0 ? midX : midX - barWidth;
          return (
            <g key={r.name}>
              <text
                x={labelW - 8}
                y={y + barH / 2 + 5}
                textAnchor="end"
                className="text-base"
                fill="#000"
              >
                {r.name.length > 14 ? r.name.slice(0, 13) + "…" : r.name}
              </text>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                fill={r.roi >= 0 ? "#000" : "#a3a3a3"}
              />
              <text
                x={
                  r.roi >= 0
                    ? midX + barWidth + 6
                    : midX - barWidth - 6
                }
                y={y + barH / 2 + 5}
                textAnchor={r.roi >= 0 ? "start" : "end"}
                className="text-base font-bold"
                fill="#000"
              >
                {fmtPct(r.roi)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function PieChart({ channels }: { channels: ChannelData[] }) {
  const filtered = channels.filter((c) => num(c.spend) > 0);
  if (filtered.length === 0) return null;

  const total = filtered.reduce((s, c) => s + num(c.spend), 0);
  if (total === 0) return null;

  const cx = 150;
  const cy = 150;
  const r = 120;
  const slices: { name: string; pct: number; color: string }[] = [];

  const grays = [
    "#000000",
    "#404040",
    "#737373",
    "#a3a3a3",
    "#d4d4d4",
    "#262626",
    "#525252",
    "#8a8a8a",
    "#b5b5b5",
  ];

  filtered.forEach((c, i) => {
    slices.push({
      name: c.name,
      pct: num(c.spend) / total,
      color: grays[i % grays.length],
    });
  });

  let cumAngle = -Math.PI / 2;

  return (
    <div className="flex flex-col md:flex-row items-start gap-6">
      <svg
        viewBox="0 0 300 300"
        className="w-full max-w-[260px] shrink-0"
        role="img"
        aria-label="Pie chart showing spend distribution by channel"
      >
        <title>Spend Distribution</title>
        {slices.map((sl) => {
          const angle = sl.pct * 2 * Math.PI;
          const startX = cx + r * Math.cos(cumAngle);
          const startY = cy + r * Math.sin(cumAngle);
          cumAngle += angle;
          const endX = cx + r * Math.cos(cumAngle);
          const endY = cy + r * Math.sin(cumAngle);
          const largeArc = angle > Math.PI ? 1 : 0;
          const d = `M${cx},${cy} L${startX},${startY} A${r},${r} 0 ${largeArc},1 ${endX},${endY} Z`;
          return <path key={sl.name} d={d} fill={sl.color} stroke="#fff" strokeWidth={2} />;
        })}
      </svg>
      <ul className="space-y-2">
        {slices.map((sl) => (
          <li key={sl.name} className="flex items-center gap-2 text-base">
            <span
              className="inline-block w-4 h-4 shrink-0"
              style={{ backgroundColor: sl.color }}
              aria-hidden="true"
            />
            <span className="text-black font-bold">{sl.name}</span>
            <span className="text-neutral-500">{(sl.pct * 100).toFixed(1)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- shared input class ---------- */

const inputClass =
  "w-full px-4 py-3 border border-neutral-200 text-base text-black focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none min-h-[44px]";

const selectClass =
  "w-full px-4 py-3 border border-neutral-200 text-base text-black bg-white focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none min-h-[44px] appearance-none";

const btnPrimary =
  "bg-black text-white px-8 py-4 text-base font-bold hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]";

const btnSecondary =
  "border border-neutral-200 text-black px-6 py-3 text-base font-bold hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]";

const btnDanger =
  "border border-neutral-200 text-neutral-500 px-4 py-3 text-base hover:text-black hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]";

/* ---------- export text report ---------- */

function generateReport(
  companyName: string,
  periods: PeriodData[]
): string {
  const lines: string[] = [];
  const divider = "=".repeat(64);
  const subDivider = "-".repeat(64);

  lines.push(divider);
  lines.push("MARKETING ROI REPORT");
  lines.push(companyName ? `Company: ${companyName}` : "");
  lines.push(`Generated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`);
  lines.push(divider);
  lines.push("");

  for (const period of periods) {
    const label = period.label || `${period.startDate} to ${period.endDate}`;
    lines.push(subDivider);
    lines.push(`PERIOD: ${label}`);
    if (period.startDate || period.endDate) {
      lines.push(`Date Range: ${period.startDate || "N/A"} to ${period.endDate || "N/A"}`);
    }
    lines.push(subDivider);
    lines.push("");

    const chs = period.channels.filter((c) => num(c.spend) > 0);

    const totalSpend = chs.reduce((s, c) => s + num(c.spend), 0);
    const totalRev = chs.reduce((s, c) => s + num(c.revenue), 0);
    const totalLeads = chs.reduce((s, c) => s + num(c.leads), 0);
    const totalConv = chs.reduce((s, c) => s + num(c.conversions), 0);
    const totalROI = totalSpend > 0 ? ((totalRev - totalSpend) / totalSpend) * 100 : 0;
    const totalROAS = totalSpend > 0 ? totalRev / totalSpend : 0;

    lines.push("OVERALL SUMMARY");
    lines.push(`  Total Spend:          ${fmtMoney(totalSpend)}`);
    lines.push(`  Total Revenue:        ${fmtMoney(totalRev)}`);
    lines.push(`  Total ROI:            ${fmtPct(totalROI)}`);
    lines.push(`  Total ROAS:           ${fmtRatio(totalROAS)}`);
    lines.push(`  Total Leads:          ${fmt(totalLeads)}`);
    lines.push(`  Total Conversions:    ${fmt(totalConv)}`);
    lines.push(`  Avg Cost Per Lead:    ${totalLeads > 0 ? fmtCost(totalSpend / totalLeads) : "N/A"}`);
    lines.push(`  Avg Cost Per Conv:    ${totalConv > 0 ? fmtCost(totalSpend / totalConv) : "N/A"}`);
    lines.push("");

    if (chs.length > 0) {
      const best = chs.reduce((a, b) => (channelROI(a) > channelROI(b) ? a : b));
      const worst = chs.reduce((a, b) => (channelROI(a) < channelROI(b) ? a : b));
      lines.push(`  Best Performing:      ${best.name} (${fmtPct(channelROI(best))} ROI)`);
      lines.push(`  Worst Performing:     ${worst.name} (${fmtPct(channelROI(worst))} ROI)`);
      lines.push("");
    }

    lines.push("CHANNEL BREAKDOWN");
    lines.push("");

    for (const ch of chs) {
      lines.push(`  ${ch.name}`);
      lines.push(`    Spend:              ${fmtMoney(num(ch.spend))}`);
      lines.push(`    Revenue:            ${fmtMoney(num(ch.revenue))}`);
      lines.push(`    Leads:              ${fmt(num(ch.leads))}`);
      lines.push(`    Conversions:        ${fmt(num(ch.conversions))}`);
      lines.push(`    ROI:                ${fmtPct(channelROI(ch))}`);
      lines.push(`    ROAS:               ${fmtRatio(channelROAS(ch))}`);
      lines.push(`    Cost Per Lead:      ${num(ch.leads) > 0 ? fmtCost(channelCPL(ch)) : "N/A"}`);
      lines.push(`    Cost Per Conversion: ${num(ch.conversions) > 0 ? fmtCost(channelCPC(ch)) : "N/A"}`);
      lines.push(`    Conversion Rate:    ${num(ch.leads) > 0 ? fmtPct(channelConvRate(ch)) : "N/A"}`);
      lines.push("");
    }

    // Recommendations
    const high = chs.filter((c) => channelROI(c) > 100);
    const mid = chs.filter((c) => channelROI(c) >= 0 && channelROI(c) <= 100);
    const neg = chs.filter((c) => channelROI(c) < 0);

    lines.push("RECOMMENDATIONS");
    lines.push("");
    if (high.length > 0) {
      lines.push("  INCREASE INVESTMENT (high ROI):");
      for (const c of high) {
        lines.push(`    - ${c.name}: ${fmtPct(channelROI(c))} ROI, ${fmtRatio(channelROAS(c))} ROAS`);
      }
      lines.push("");
    }
    if (mid.length > 0) {
      lines.push("  OPTIMIZE (moderate ROI):");
      for (const c of mid) {
        lines.push(`    - ${c.name}: ${fmtPct(channelROI(c))} ROI — test creative, audience, or landing pages`);
      }
      lines.push("");
    }
    if (neg.length > 0) {
      lines.push("  RECONSIDER (negative ROI):");
      for (const c of neg) {
        lines.push(`    - ${c.name}: ${fmtPct(channelROI(c))} ROI — audit or reallocate budget`);
      }
      lines.push("");
    }

    lines.push("");
  }

  // Month-over-month comparison if multiple periods
  if (periods.length > 1) {
    lines.push(divider);
    lines.push("PERIOD-OVER-PERIOD COMPARISON");
    lines.push(divider);
    lines.push("");

    for (let i = 1; i < periods.length; i++) {
      const prev = periods[i - 1];
      const curr = periods[i];
      const prevLabel = prev.label || `${prev.startDate} to ${prev.endDate}`;
      const currLabel = curr.label || `${curr.startDate} to ${curr.endDate}`;

      const prevChs = prev.channels.filter((c) => num(c.spend) > 0);
      const currChs = curr.channels.filter((c) => num(c.spend) > 0);

      const prevSpend = prevChs.reduce((s, c) => s + num(c.spend), 0);
      const currSpend = currChs.reduce((s, c) => s + num(c.spend), 0);
      const prevRev = prevChs.reduce((s, c) => s + num(c.revenue), 0);
      const currRev = currChs.reduce((s, c) => s + num(c.revenue), 0);
      const prevROI = prevSpend > 0 ? ((prevRev - prevSpend) / prevSpend) * 100 : 0;
      const currROI = currSpend > 0 ? ((currRev - currSpend) / currSpend) * 100 : 0;

      lines.push(`  ${prevLabel}  vs  ${currLabel}`);
      lines.push(`    Spend:   ${fmtMoney(prevSpend)} -> ${fmtMoney(currSpend)} (${prevSpend > 0 ? (((currSpend - prevSpend) / prevSpend) * 100).toFixed(1) + "%" : "N/A"})`);
      lines.push(`    Revenue: ${fmtMoney(prevRev)} -> ${fmtMoney(currRev)} (${prevRev > 0 ? (((currRev - prevRev) / prevRev) * 100).toFixed(1) + "%" : "N/A"})`);
      lines.push(`    ROI:     ${fmtPct(prevROI)} -> ${fmtPct(currROI)}`);
      lines.push("");
    }
  }

  lines.push(divider);
  lines.push("Report generated by Markit Media ROI Report Generator");
  lines.push("https://themarkitmedia.com/resources/marketing-roi-report");
  lines.push(divider);

  return lines.join("\n");
}

/* ---------- component ---------- */



export default function MarketingRoiReportPage() {
  const [companyName, setCompanyName] = useState("");
  const [periods, setPeriods] = useState<PeriodData[]>([makePeriod()]);
  const [activePeriodIdx, setActivePeriodIdx] = useState(0);
  const [generated, setGenerated] = useState(false);

  const activePeriod = periods[activePeriodIdx] ?? periods[0];

  /* ---- period mutation helpers ---- */

  const updatePeriodField = useCallback(
    (field: "label" | "startDate" | "endDate", value: string) => {
      setPeriods((prev) =>
        prev.map((p, i) => (i === activePeriodIdx ? { ...p, [field]: value } : p))
      );
    },
    [activePeriodIdx]
  );

  const addPeriod = useCallback(() => {
    setPeriods((prev) => [...prev, makePeriod()]);
    setActivePeriodIdx((prev) => prev + 1);
  }, []);

  const removePeriod = useCallback(
    (idx: number) => {
      setPeriods((prev) => {
        if (prev.length <= 1) return prev;
        const next = prev.filter((_, i) => i !== idx);
        return next;
      });
      setActivePeriodIdx((prev) => Math.min(prev, periods.length - 2));
    },
    [periods.length]
  );

  /* ---- channel mutation helpers ---- */

  const addChannel = useCallback(() => {
    setPeriods((prev) =>
      prev.map((p, i) =>
        i === activePeriodIdx
          ? { ...p, channels: [...p.channels, makeChannel()] }
          : p
      )
    );
  }, [activePeriodIdx]);

  const removeChannel = useCallback(
    (chId: string) => {
      setPeriods((prev) =>
        prev.map((p, i) =>
          i === activePeriodIdx
            ? { ...p, channels: p.channels.filter((c) => c.id !== chId) }
            : p
        )
      );
    },
    [activePeriodIdx]
  );

  const updateChannel = useCallback(
    (chId: string, field: keyof ChannelData, value: string) => {
      setPeriods((prev) =>
        prev.map((p, i) =>
          i === activePeriodIdx
            ? {
                ...p,
                channels: p.channels.map((c) =>
                  c.id === chId ? { ...c, [field]: value } : c
                ),
              }
            : p
        )
      );
    },
    [activePeriodIdx]
  );

  /* ---- aggregated metrics ---- */

  const allChannels = useMemo(
    () => activePeriod.channels.filter((c) => num(c.spend) > 0),
    [activePeriod.channels]
  );

  const totals = useMemo(() => {
    const totalSpend = allChannels.reduce((s, c) => s + num(c.spend), 0);
    const totalRevenue = allChannels.reduce((s, c) => s + num(c.revenue), 0);
    const totalLeads = allChannels.reduce((s, c) => s + num(c.leads), 0);
    const totalConversions = allChannels.reduce((s, c) => s + num(c.conversions), 0);
    const totalROI = totalSpend > 0 ? ((totalRevenue - totalSpend) / totalSpend) * 100 : 0;
    const totalROAS = totalSpend > 0 ? totalRevenue / totalSpend : 0;
    const avgCPL = totalLeads > 0 ? totalSpend / totalLeads : 0;
    const avgCPC = totalConversions > 0 ? totalSpend / totalConversions : 0;
    const best = allChannels.length > 0 ? allChannels.reduce((a, b) => (channelROI(a) > channelROI(b) ? a : b)) : null;
    const worst = allChannels.length > 0 ? allChannels.reduce((a, b) => (channelROI(a) < channelROI(b) ? a : b)) : null;
    return { totalSpend, totalRevenue, totalLeads, totalConversions, totalROI, totalROAS, avgCPL, avgCPC, best, worst };
  }, [allChannels]);

  /* ---- recommendations ---- */

  const recommendations = useMemo(() => {
    const high = allChannels.filter((c) => channelROI(c) > 100);
    const mid = allChannels.filter((c) => channelROI(c) >= 0 && channelROI(c) <= 100);
    const neg = allChannels.filter((c) => channelROI(c) < 0);
    return { high, mid, neg };
  }, [allChannels]);

  /* ---- period comparison ---- */

  const periodComparisons = useMemo(() => {
    if (periods.length < 2) return [];
    const comps: {
      prevLabel: string;
      currLabel: string;
      prevSpend: number;
      currSpend: number;
      prevRev: number;
      currRev: number;
      prevROI: number;
      currROI: number;
      spendChange: number;
      revChange: number;
    }[] = [];

    for (let i = 1; i < periods.length; i++) {
      const prev = periods[i - 1];
      const curr = periods[i];
      const prevChs = prev.channels.filter((c) => num(c.spend) > 0);
      const currChs = curr.channels.filter((c) => num(c.spend) > 0);
      const prevSpend = prevChs.reduce((s, c) => s + num(c.spend), 0);
      const currSpend = currChs.reduce((s, c) => s + num(c.spend), 0);
      const prevRev = prevChs.reduce((s, c) => s + num(c.revenue), 0);
      const currRev = currChs.reduce((s, c) => s + num(c.revenue), 0);
      const prevROI = prevSpend > 0 ? ((prevRev - prevSpend) / prevSpend) * 100 : 0;
      const currROI = currSpend > 0 ? ((currRev - currSpend) / currSpend) * 100 : 0;

      comps.push({
        prevLabel: prev.label || `${prev.startDate || "Period " + i} to ${prev.endDate || ""}`,
        currLabel: curr.label || `${curr.startDate || "Period " + (i + 1)} to ${curr.endDate || ""}`,
        prevSpend,
        currSpend,
        prevRev,
        currRev,
        prevROI,
        currROI,
        spendChange: prevSpend > 0 ? ((currSpend - prevSpend) / prevSpend) * 100 : 0,
        revChange: prevRev > 0 ? ((currRev - prevRev) / prevRev) * 100 : 0,
      });
    }
    return comps;
  }, [periods]);

  /* ---- export ---- */

  const handleExport = useCallback(() => {
    const text = generateReport(companyName, periods);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `roi-report${companyName ? "-" + companyName.toLowerCase().replace(/\s+/g, "-") : ""}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [companyName, periods]);

  return (
    <article>
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Marketing ROI Report Generator" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing ROI Report Generator
            </h1>
            <SectionDesc>
              Input your channel spend and revenue data to generate a comprehensive
              marketing performance analysis with ROI calculations, charts, and
              actionable recommendations.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Report Setup */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="company-name" className="block text-base font-bold text-black mb-1">
                  Company Name
                </label>
                <input
                  id="company-name"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Your Company"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="start-date" className="block text-base font-bold text-black mb-1">
                  Period Start Date
                </label>
                <input
                  id="start-date"
                  type="date"
                  value={activePeriod.startDate}
                  onChange={(e) => updatePeriodField("startDate", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="end-date" className="block text-base font-bold text-black mb-1">
                  Period End Date
                </label>
                <input
                  id="end-date"
                  type="date"
                  value={activePeriod.endDate}
                  onChange={(e) => updatePeriodField("endDate", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Period tabs */}
            <div className="mt-8">
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-base font-bold text-black mr-2">Periods:</span>
                {periods.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setActivePeriodIdx(i)}
                    className={`px-4 py-2 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      i === activePeriodIdx
                        ? "bg-black text-white"
                        : "border border-neutral-200 text-neutral-600 hover:border-black"
                    }`}
                  >
                    {p.label || `Period ${i + 1}`}
                  </button>
                ))}
                <button onClick={addPeriod} className={btnSecondary}>
                  + Add Period
                </button>
                {periods.length > 1 && (
                  <button
                    onClick={() => removePeriod(activePeriodIdx)}
                    className={btnDanger}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div>
                <label htmlFor="period-label" className="block text-base font-bold text-black mb-1">
                  Period Label (optional)
                </label>
                <input
                  id="period-label"
                  type="text"
                  value={activePeriod.label}
                  onChange={(e) => updatePeriodField("label", e.target.value)}
                  placeholder="e.g. January 2025, Q1 2025"
                  className={inputClass + " max-w-md"}
                />
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* Channel Inputs */}
      <section aria-label="Marketing Channels" className="px-6 lg:px-12 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up" delay={60}>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              Marketing Channels
            </h2>

            <div className="space-y-6">
              {activePeriod.channels.map((ch, idx) => (
                <div
                  key={ch.id}
                  className="border border-neutral-200 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-base font-bold text-black">
                      Channel {idx + 1}
                    </span>
                    {activePeriod.channels.length > 1 && (
                      <button
                        onClick={() => removeChannel(ch.id)}
                        className="text-base text-neutral-400 hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        aria-label={`Remove channel ${ch.name || idx + 1}`}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor={`ch-name-${ch.id}`}
                        className="block text-base font-bold text-black mb-1"
                      >
                        Channel Name
                      </label>
                      <select
                        id={`ch-name-${ch.id}`}
                        value={CHANNEL_PRESETS.includes(ch.name as typeof CHANNEL_PRESETS[number]) ? ch.name : "Custom"}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateChannel(ch.id, "name", val === "Custom" ? "" : val);
                        }}
                        className={selectClass}
                      >
                        {CHANNEL_PRESETS.map((preset) => (
                          <option key={preset} value={preset}>
                            {preset}
                          </option>
                        ))}
                      </select>
                      {(!CHANNEL_PRESETS.includes(ch.name as typeof CHANNEL_PRESETS[number]) || ch.name === "") && (
                        <input
                          type="text"
                          value={ch.name}
                          onChange={(e) => updateChannel(ch.id, "name", e.target.value)}
                          placeholder="Enter channel name"
                          className={inputClass + " mt-2"}
                          aria-label={`Custom channel name for channel ${idx + 1}`}
                        />
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor={`ch-spend-${ch.id}`}
                        className="block text-base font-bold text-black mb-1"
                      >
                        Spend ($)
                      </label>
                      <input
                        id={`ch-spend-${ch.id}`}
                        type="number"
                        min="0"
                        value={ch.spend}
                        onChange={(e) => updateChannel(ch.id, "spend", e.target.value)}
                        placeholder="0"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`ch-revenue-${ch.id}`}
                        className="block text-base font-bold text-black mb-1"
                      >
                        Revenue ($)
                      </label>
                      <input
                        id={`ch-revenue-${ch.id}`}
                        type="number"
                        min="0"
                        value={ch.revenue}
                        onChange={(e) => updateChannel(ch.id, "revenue", e.target.value)}
                        placeholder="0"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`ch-leads-${ch.id}`}
                        className="block text-base font-bold text-black mb-1"
                      >
                        Leads Generated
                      </label>
                      <input
                        id={`ch-leads-${ch.id}`}
                        type="number"
                        min="0"
                        value={ch.leads}
                        onChange={(e) => updateChannel(ch.id, "leads", e.target.value)}
                        placeholder="0"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`ch-conv-${ch.id}`}
                        className="block text-base font-bold text-black mb-1"
                      >
                        Conversions
                      </label>
                      <input
                        id={`ch-conv-${ch.id}`}
                        type="number"
                        min="0"
                        value={ch.conversions}
                        onChange={(e) => updateChannel(ch.id, "conversions", e.target.value)}
                        placeholder="0"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Auto-calculated metrics for this channel */}
                  {num(ch.spend) > 0 && (
                    <div className="mt-4 pt-4 border-t border-neutral-100 grid grid-cols-2 md:grid-cols-5 gap-3">
                      <div>
                        <span className="block text-base text-neutral-500">ROI</span>
                        <span className="text-base font-bold text-black">{fmtPct(channelROI(ch))}</span>
                      </div>
                      <div>
                        <span className="block text-base text-neutral-500">ROAS</span>
                        <span className="text-base font-bold text-black">{fmtRatio(channelROAS(ch))}</span>
                      </div>
                      <div>
                        <span className="block text-base text-neutral-500">Cost/Lead</span>
                        <span className="text-base font-bold text-black">
                          {num(ch.leads) > 0 ? fmtCost(channelCPL(ch)) : "N/A"}
                        </span>
                      </div>
                      <div>
                        <span className="block text-base text-neutral-500">Cost/Conv</span>
                        <span className="text-base font-bold text-black">
                          {num(ch.conversions) > 0 ? fmtCost(channelCPC(ch)) : "N/A"}
                        </span>
                      </div>
                      <div>
                        <span className="block text-base text-neutral-500">Conv Rate</span>
                        <span className="text-base font-bold text-black">
                          {num(ch.leads) > 0 ? fmtPct(channelConvRate(ch)) : "N/A"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <button onClick={addChannel} className={btnSecondary}>
                + Add Channel
              </button>
            </div>
          </Animate>
        </div>
      </section>

      {/* Generate button */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-16">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up" delay={120}>
            <button onClick={() => setGenerated(true)} className={btnPrimary}>
              Generate ROI Report
            </button>
          </Animate>
        </div>
      </section>

      {/* Results */}
      {generated && allChannels.length > 0 && (
        <>
          {/* Summary Dashboard */}
          <section aria-label="ROI Report Summary" className="px-6 lg:px-12 pb-16">
            <div className="max-w-4xl mx-auto">
              <Animate animation="fade-up">
                <div className="border-2 border-black">
                  <div className="bg-black text-white p-6">
                    <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                      ROI Report Summary
                    </h2>
                    <p className="text-neutral-400 text-base mt-1">
                      {companyName && `${companyName} · `}
                      {activePeriod.label ||
                        `${activePeriod.startDate || "Start"} to ${activePeriod.endDate || "End"}`}
                    </p>
                  </div>

                  {/* Primary KPIs */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-b border-neutral-200">
                    {[
                      { label: "Total Spend", value: fmtMoney(totals.totalSpend) },
                      { label: "Total Revenue", value: fmtMoney(totals.totalRevenue) },
                      { label: "Overall ROI", value: fmtPct(totals.totalROI) },
                      { label: "Overall ROAS", value: fmtRatio(totals.totalROAS) },
                    ].map((kpi, i) => (
                      <div
                        key={kpi.label}
                        className={`p-6 text-center ${i < 3 ? "border-r border-neutral-200" : ""}`}
                      >
                        <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                          {kpi.value}
                        </div>
                        <div className="text-base text-neutral-500 mt-1">{kpi.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Secondary metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-b border-neutral-200">
                    {[
                      { label: "Total Leads", value: fmt(totals.totalLeads) },
                      { label: "Total Conversions", value: fmt(totals.totalConversions) },
                      { label: "Avg Cost/Lead", value: totals.totalLeads > 0 ? fmtCost(totals.avgCPL) : "N/A" },
                      { label: "Avg Cost/Conv", value: totals.totalConversions > 0 ? fmtCost(totals.avgCPC) : "N/A" },
                    ].map((kpi, i) => (
                      <div
                        key={kpi.label}
                        className={`p-6 text-center ${i < 3 ? "border-r border-neutral-200" : ""}`}
                      >
                        <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                          {kpi.value}
                        </div>
                        <div className="text-base text-neutral-500 mt-1">{kpi.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Best / Worst */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {totals.best && (
                      <div className="p-6 border-r border-neutral-200">
                        <span className="text-base text-neutral-500">Best Performing Channel</span>
                        <div className="text-base font-bold text-black mt-1">
                          {totals.best.name} &mdash; {fmtPct(channelROI(totals.best))} ROI
                        </div>
                      </div>
                    )}
                    {totals.worst && (
                      <div className="p-6">
                        <span className="text-base text-neutral-500">Worst Performing Channel</span>
                        <div className="text-base font-bold text-black mt-1">
                          {totals.worst.name} &mdash; {fmtPct(channelROI(totals.worst))} ROI
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Animate>
            </div>
          </section>

          {/* Channel Detail Table */}
          <section aria-label="Channel Performance Breakdown" className="px-6 lg:px-12 pb-16">
            <div className="max-w-4xl mx-auto">
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                  Channel Performance Breakdown
                </h2>
                <div className="overflow-x-auto border border-neutral-200">
                  <table className="w-full text-base">
                    <thead>
                      <tr className="bg-neutral-50 border-b border-neutral-200">
                        <th className="text-left p-4 font-bold text-black">Channel</th>
                        <th className="text-right p-4 font-bold text-black">Spend</th>
                        <th className="text-right p-4 font-bold text-black">Revenue</th>
                        <th className="text-right p-4 font-bold text-black">ROI</th>
                        <th className="text-right p-4 font-bold text-black">ROAS</th>
                        <th className="text-right p-4 font-bold text-black">CPL</th>
                        <th className="text-right p-4 font-bold text-black">CPC</th>
                        <th className="text-right p-4 font-bold text-black">Conv Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allChannels.map((ch) => (
                        <tr key={ch.id} className="border-b border-neutral-100">
                          <td className="p-4 font-bold text-black">{ch.name}</td>
                          <td className="p-4 text-right text-black">{fmtMoney(num(ch.spend))}</td>
                          <td className="p-4 text-right text-black">{fmtMoney(num(ch.revenue))}</td>
                          <td className="p-4 text-right font-bold text-black">{fmtPct(channelROI(ch))}</td>
                          <td className="p-4 text-right text-black">{fmtRatio(channelROAS(ch))}</td>
                          <td className="p-4 text-right text-black">{num(ch.leads) > 0 ? fmtCost(channelCPL(ch)) : "N/A"}</td>
                          <td className="p-4 text-right text-black">{num(ch.conversions) > 0 ? fmtCost(channelCPC(ch)) : "N/A"}</td>
                          <td className="p-4 text-right text-black">{num(ch.leads) > 0 ? fmtPct(channelConvRate(ch)) : "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Animate>
            </div>
          </section>

          {/* Charts */}
          <section aria-label="ROI by Channel" className="px-6 lg:px-12 pb-16">
            <div className="max-w-4xl mx-auto">
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                  ROI by Channel
                </h2>
                <BarChart channels={allChannels} />
              </Animate>

              <Animate animation="fade-up" delay={60}>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mt-12 mb-6">
                  Spend Distribution
                </h2>
                <PieChart channels={allChannels} />
              </Animate>
            </div>
          </section>

          {/* Recommendations */}
          <section aria-label="Recommendations" className="px-6 lg:px-12 pb-16">
            <div className="max-w-4xl mx-auto">
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                  Recommendations
                </h2>
                <div className="space-y-6">
                  {recommendations.high.length > 0 && (
                    <div className="p-6 border-l-4 border-black bg-neutral-50">
                      <h3 className="text-base font-bold text-black mb-3">
                        Increase Investment (High ROI)
                      </h3>
                      <ul className="space-y-2">
                        {recommendations.high.map((c) => (
                          <li key={c.id} className="text-base text-neutral-600">
                            <span className="font-bold text-black">{c.name}</span> is
                            delivering {fmtPct(channelROI(c))} ROI with{" "}
                            {fmtRatio(channelROAS(c))} ROAS. Consider increasing budget
                            allocation to capitalize on strong returns.
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {recommendations.mid.length > 0 && (
                    <div className="p-6 border-l-4 border-neutral-400 bg-neutral-50">
                      <h3 className="text-base font-bold text-black mb-3">
                        Optimize (Moderate ROI)
                      </h3>
                      <ul className="space-y-2">
                        {recommendations.mid.map((c) => (
                          <li key={c.id} className="text-base text-neutral-600">
                            <span className="font-bold text-black">{c.name}</span> shows{" "}
                            {fmtPct(channelROI(c))} ROI. Test different creatives, audiences,
                            or landing pages to improve conversion efficiency before scaling.
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {recommendations.neg.length > 0 && (
                    <div className="p-6 border-l-4 border-neutral-300 bg-neutral-50">
                      <h3 className="text-base font-bold text-black mb-3">
                        Reconsider (Negative ROI)
                      </h3>
                      <ul className="space-y-2">
                        {recommendations.neg.map((c) => (
                          <li key={c.id} className="text-base text-neutral-600">
                            <span className="font-bold text-black">{c.name}</span> is at{" "}
                            {fmtPct(channelROI(c))} ROI. Audit targeting, creative, and
                            conversion tracking. If performance does not improve within 30
                            days, reallocate this budget to higher-performing channels.
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {allChannels.length > 0 &&
                    recommendations.high.length === 0 &&
                    recommendations.mid.length === 0 &&
                    recommendations.neg.length === 0 && (
                      <p className="text-base text-neutral-500">
                        Add spend and revenue data to channels to see recommendations.
                      </p>
                    )}
                </div>
              </Animate>
            </div>
          </section>

          {/* Period-over-Period Comparison */}
          {periodComparisons.length > 0 && (
            <section aria-label="Period-over-Period Comparison" className="px-6 lg:px-12 pb-16">
              <div className="max-w-4xl mx-auto">
                <Animate animation="fade-up">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                    Period-over-Period Comparison
                  </h2>
                  <div className="space-y-4">
                    {periodComparisons.map((comp, i) => (
                      <div key={i} className="border border-neutral-200 p-6">
                        <h3 className="text-base font-bold text-black mb-4">
                          {comp.prevLabel} vs {comp.currLabel}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <span className="block text-base text-neutral-500">Spend</span>
                            <span className="text-base font-bold text-black">
                              {fmtMoney(comp.prevSpend)} &rarr; {fmtMoney(comp.currSpend)}
                            </span>
                            <span className="block text-base text-neutral-500">
                              {comp.prevSpend > 0
                                ? `${comp.spendChange >= 0 ? "+" : ""}${comp.spendChange.toFixed(1)}%`
                                : "N/A"}
                            </span>
                          </div>
                          <div>
                            <span className="block text-base text-neutral-500">Revenue</span>
                            <span className="text-base font-bold text-black">
                              {fmtMoney(comp.prevRev)} &rarr; {fmtMoney(comp.currRev)}
                            </span>
                            <span className="block text-base text-neutral-500">
                              {comp.prevRev > 0
                                ? `${comp.revChange >= 0 ? "+" : ""}${comp.revChange.toFixed(1)}%`
                                : "N/A"}
                            </span>
                          </div>
                          <div>
                            <span className="block text-base text-neutral-500">ROI</span>
                            <span className="text-base font-bold text-black">
                              {fmtPct(comp.prevROI)} &rarr; {fmtPct(comp.currROI)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Animate>
              </div>
            </section>
          )}

          {/* Export */}
          <section aria-label="Content section" className="px-6 lg:px-12 pb-16">
            <div className="max-w-4xl mx-auto">
              <Animate animation="fade-up">
                <button onClick={handleExport} className={btnPrimary}>
                  Export Report as .txt
                </button>
              </Animate>
            </div>
          </section>
        </>
      )}

      {generated && allChannels.length === 0 && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-16">
          <div className="max-w-4xl mx-auto">
            <Animate animation="fade-up">
              <div className="p-6 border border-neutral-200 bg-neutral-50">
                <p className="text-base text-neutral-600">
                  No channel data to report. Add at least one channel with spend data above
                  to generate your ROI report.
                </p>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* Educational Section */}
      <section aria-label="What is Marketing ROI?" className="px-6 lg:px-12 py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-8">
              Understanding Marketing ROI
            </h2>
            <div className="space-y-8 text-base text-neutral-600 leading-relaxed">
              <div>
                <h3 className="font-bold text-black mb-2">What is Marketing ROI?</h3>
                <p>
                  Marketing ROI (Return on Investment) measures the revenue generated
                  relative to the cost of your marketing efforts. The formula is
                  straightforward: ((Revenue - Spend) / Spend) x 100. A positive ROI means
                  your marketing is generating more revenue than it costs. A negative ROI
                  means you are spending more than you are earning back.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">ROI vs ROAS</h3>
                <p>
                  ROAS (Return on Ad Spend) is the ratio of revenue to spend, expressed as a
                  multiple. A ROAS of 4x means you earn $4 for every $1 spent. While ROI
                  accounts for whether you are profitable (factoring in the cost), ROAS
                  simply shows the revenue multiplier. Both metrics are useful: ROI tells you
                  if a channel is worth running, ROAS helps you compare efficiency across
                  channels.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Why Track Cost Per Lead and Cost Per Conversion?</h3>
                <p>
                  Revenue is a lagging indicator. Cost per lead (CPL) and cost per conversion
                  (CPC) are leading indicators that help you spot problems early. If your CPL
                  is rising while conversion rates stay flat, it usually means your targeting
                  or creative needs attention. These metrics let you optimize campaigns in
                  real time rather than waiting for revenue data to come in.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Setting Realistic ROI Benchmarks</h3>
                <p>
                  Marketing ROI varies significantly by industry, channel, and business
                  model. A common baseline is a 5:1 revenue-to-spend ratio (400% ROI) as
                  strong performance, and 2:1 (100% ROI) as a minimum threshold. However,
                  brand-new channels often show negative ROI during the learning phase.
                  Evaluate channels over at least 90 days before making cut decisions, and
                  always account for customer lifetime value, not just first-purchase revenue.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Multi-Touch Attribution</h3>
                <p>
                  In practice, customers interact with multiple channels before converting.
                  A prospect might click a Google ad, read a blog post, then convert through
                  an email campaign. Single-channel ROI calculations will overvalue the last
                  touch and undervalue awareness channels. For a more accurate picture,
                  consider implementing multi-touch attribution models as your marketing
                  operation matures.
                </p>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Improving Your Marketing ROI?
            </h2>
            <p className="text-lg text-neutral-400 mt-4 mb-8">
              Our team analyzes your channels, identifies waste, and builds a strategy
              that maximizes every marketing dollar you spend.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
            >
              Get a Free Marketing Audit &rarr;
            </Link>
          </Animate>
        </div>
      </section>
          
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/roi-calculator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">ROI Calculator</Link>
                <Link href="/resources/roi-dashboard" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">ROI Dashboard</Link>
                <Link href="/resources/roi-forecaster" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">ROI Forecaster</Link>
                <Link href="/resources/kpi-builder" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">KPI Builder</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing ROI Report Generator",
          description: "Generate a professional marketing ROI report. Input channel spend and revenue data to create a comprehensive performance analysis.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Marketing Roi Report"
        services={[
          { title: "Digital Marketing", desc: "Data-driven strategy with transparent reporting and insights.", href: "/services/digital-marketing" },
          { title: "Performance Marketing", desc: "Campaign optimization based on real performance data.", href: "/services/performance-marketing" },
          { title: "SEO", desc: "SEO analytics that show exactly what drives organic growth.", href: "/services/seo" },
        ]}
        relatedTools={[
          { title: "Marketing Metrics Benchmark", href: "/resources/marketing-metrics-benchmark" },
          { title: "Marketing Kpi Tracker", href: "/resources/marketing-kpi-tracker" },
          { title: "Marketing Maturity", href: "/resources/marketing-maturity" },
          { title: "Marketing Proposal Generator", href: "/resources/marketing-proposal-generator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
