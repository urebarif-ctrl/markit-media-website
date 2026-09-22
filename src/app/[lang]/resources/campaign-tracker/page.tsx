"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Channel = "SEO" | "PPC" | "Social" | "Email" | "Content" | "Display" | "Video" | "PR";
type Status = "Planning" | "Active" | "Paused" | "Completed";
type GoalType = "Awareness" | "Leads" | "Sales" | "Engagement";
type HealthStatus = "On Track" | "At Risk" | "Behind";
type SortField = "name" | "channel" | "status" | "startDate" | "endDate" | "budget" | "spend" | "health";
type SortDir = "asc" | "desc";
type ViewTab = "dashboard" | "table" | "charts";

interface Campaign {
  id: string;
  name: string;
  channel: Channel;
  status: Status;
  startDate: string;
  endDate: string;
  budget: number;
  spend: number;
  goalType: GoalType;
  targetMetric: number;
  actualMetric: number;
  notes: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const CHANNELS: Channel[] = ["SEO", "PPC", "Social", "Email", "Content", "Display", "Video", "PR"];
const STATUSES: Status[] = ["Planning", "Active", "Paused", "Completed"];
const GOAL_TYPES: GoalType[] = ["Awareness", "Leads", "Sales", "Engagement"];

const STORAGE_KEY = "markit-campaign-tracker";

const EMPTY_FORM: Omit<Campaign, "id"> = {
  name: "",
  channel: "SEO",
  status: "Planning",
  startDate: "",
  endDate: "",
  budget: 0,
  spend: 0,
  goalType: "Awareness",
  targetMetric: 0,
  actualMetric: 0,
  notes: "",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function fmtCurrency(n: number): string {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmtDate(d: string): string {
  if (!d) return "--";
  const date = new Date(d + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function pct(part: number, whole: number): number {
  if (whole <= 0) return 0;
  return (part / whole) * 100;
}

function getCampaignHealth(c: Campaign): HealthStatus {
  if (c.targetMetric <= 0 || c.budget <= 0) return "On Track";
  const goalPct = pct(c.actualMetric, c.targetMetric);
  const budgetPct = pct(c.spend, c.budget);
  const diff = budgetPct - goalPct;
  if (diff <= 0) return "On Track";
  if (diff <= 30) return "At Risk";
  return "Behind";
}

function healthBadgeClass(h: HealthStatus): string {
  switch (h) {
    case "On Track":
      return "bg-neutral-900 text-white";
    case "At Risk":
      return "bg-neutral-400 text-white";
    case "Behind":
      return "bg-neutral-200 text-black";
  }
}

function statusBadgeClass(s: Status): string {
  switch (s) {
    case "Planning":
      return "bg-neutral-100 text-neutral-700 border border-neutral-300";
    case "Active":
      return "bg-neutral-900 text-white";
    case "Paused":
      return "bg-neutral-300 text-neutral-800";
    case "Completed":
      return "bg-neutral-600 text-white";
  }
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SummaryCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="border border-neutral-200 p-6">
      <p className="text-base text-neutral-500 mb-1">{label}</p>
      <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
        {value}
      </p>
      {sub && <p className="text-base text-neutral-500 mt-1">{sub}</p>}
    </div>
  );
}

function ProgressBar({ value, max, className }: { value: number; max: number; className?: string }) {
  const p = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div className={`h-2 w-full bg-neutral-100 ${className || ""}`}>
      <div
        className="h-2 bg-black transition-all"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pie Chart (SVG)                                                    */
/* ------------------------------------------------------------------ */

function PieChart({ data }: { data: { label: string; value: number }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total <= 0) {
    return (
      <p className="text-base text-neutral-500 py-8 text-center">
        Add campaigns with budgets to see the allocation chart.
      </p>
    );
  }

  const fills = [
    "#000000", "#404040", "#666666", "#808080",
    "#999999", "#b3b3b3", "#cccccc", "#e0e0e0",
  ];

  let cumulative = 0;
  const slices = data.map((d, i) => {
    const fraction = d.value / total;
    const startAngle = cumulative * 2 * Math.PI;
    cumulative += fraction;
    const endAngle = cumulative * 2 * Math.PI;
    const largeArc = fraction > 0.5 ? 1 : 0;
    const x1 = 100 + 90 * Math.cos(startAngle - Math.PI / 2);
    const y1 = 100 + 90 * Math.sin(startAngle - Math.PI / 2);
    const x2 = 100 + 90 * Math.cos(endAngle - Math.PI / 2);
    const y2 = 100 + 90 * Math.sin(endAngle - Math.PI / 2);

    if (data.length === 1) {
      return (
        <circle key={i} cx={100} cy={100} r={90} fill={fills[i % fills.length]} />
      );
    }

    return (
      <path
        key={i}
        d={`M100,100 L${x1},${y1} A90,90 0 ${largeArc},1 ${x2},${y2} Z`}
        fill={fills[i % fills.length]}
      />
    );
  });

  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <svg viewBox="0 0 200 200" className="w-48 h-48 flex-shrink-0" role="img" aria-label="Budget allocation pie chart">
        {slices}
      </svg>
      <div className="space-y-2 flex-1">
        {data.map((d, i) => (
          <div key={d.label} className="flex items-center gap-3 text-base">
            <span
              className="w-4 h-4 flex-shrink-0"
              style={{ backgroundColor: fills[i % fills.length] }}
            />
            <span className="font-medium text-black">{d.label}</span>
            <span className="text-neutral-500 ml-auto">
              {fmtCurrency(d.value)} ({pct(d.value, total).toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Gantt Chart (SVG)                                                  */
/* ------------------------------------------------------------------ */

function GanttChart({ campaigns }: { campaigns: Campaign[] }) {
  const withDates = campaigns.filter((c) => c.startDate && c.endDate);
  if (withDates.length === 0) {
    return (
      <p className="text-base text-neutral-500 py-8 text-center">
        Add campaigns with start and end dates to see the timeline.
      </p>
    );
  }

  const allStarts = withDates.map((c) => new Date(c.startDate + "T00:00:00").getTime());
  const allEnds = withDates.map((c) => new Date(c.endDate + "T00:00:00").getTime());
  const minTime = Math.min(...allStarts);
  const maxTime = Math.max(...allEnds);
  const range = maxTime - minTime || 1;

  const barHeight = 28;
  const rowGap = 8;
  const labelWidth = 140;
  const chartLeft = labelWidth + 10;
  const chartWidth = 500;
  const svgWidth = chartLeft + chartWidth + 20;
  const svgHeight = withDates.length * (barHeight + rowGap) + 40;

  const fills: Record<Status, string> = {
    Planning: "#cccccc",
    Active: "#000000",
    Paused: "#999999",
    Completed: "#555555",
  };

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      className="w-full"
      role="img"
      aria-label="Campaign timeline Gantt chart"
    >
      {withDates.map((c, i) => {
        const start = new Date(c.startDate + "T00:00:00").getTime();
        const end = new Date(c.endDate + "T00:00:00").getTime();
        const x = chartLeft + ((start - minTime) / range) * chartWidth;
        const w = Math.max(((end - start) / range) * chartWidth, 4);
        const y = i * (barHeight + rowGap) + 10;

        return (
          <g key={c.id}>
            <text
              x={labelWidth}
              y={y + barHeight / 2 + 5}
              textAnchor="end"
              fontSize="13"
              fill="#333"
            >
              {c.name.length > 18 ? c.name.slice(0, 18) + "..." : c.name}
            </text>
            <rect
              x={x}
              y={y}
              width={w}
              height={barHeight}
              rx={4}
              fill={fills[c.status]}
            />
          </g>
        );
      })}
      {/* Date labels */}
      <text x={chartLeft} y={svgHeight - 4} fontSize="12" fill="#666">
        {fmtDate(new Date(minTime).toISOString().slice(0, 10))}
      </text>
      <text x={chartLeft + chartWidth} y={svgHeight - 4} fontSize="12" fill="#666" textAnchor="end">
        {fmtDate(new Date(maxTime).toISOString().slice(0, 10))}
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Campaign Form                                                      */
/* ------------------------------------------------------------------ */

function CampaignForm({
  form,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
}: {
  form: Omit<Campaign, "id">;
  onChange: (f: Omit<Campaign, "id">) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEditing: boolean;
}) {
  const inputClass =
    "w-full border border-neutral-300 px-3 py-2 text-base bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";
  const labelClass = "block text-base font-bold text-black mb-1";

  return (
    <div className="border border-neutral-200 p-6 space-y-5">
      <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
        {isEditing ? "Edit Campaign" : "Add Campaign"}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor="ct-name" className={labelClass}>Campaign Name</label>
          <input
            id="ct-name"
            type="text"
            value={form.name}
            onChange={(e) => onChange({ ...form, name: e.target.value })}
            className={inputClass}
            placeholder="e.g. Q4 Holiday Push"
          />
        </div>

        <div>
          <label htmlFor="ct-channel" className={labelClass}>Channel</label>
          <select
            id="ct-channel"
            value={form.channel}
            onChange={(e) => onChange({ ...form, channel: e.target.value as Channel })}
            className={inputClass}
          >
            {CHANNELS.map((ch) => (
              <option key={ch} value={ch}>{ch}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="ct-status" className={labelClass}>Status</label>
          <select
            id="ct-status"
            value={form.status}
            onChange={(e) => onChange({ ...form, status: e.target.value as Status })}
            className={inputClass}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="ct-start" className={labelClass}>Start Date</label>
          <input
            id="ct-start"
            type="date"
            value={form.startDate}
            onChange={(e) => onChange({ ...form, startDate: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="ct-end" className={labelClass}>End Date</label>
          <input
            id="ct-end"
            type="date"
            value={form.endDate}
            onChange={(e) => onChange({ ...form, endDate: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="ct-budget" className={labelClass}>Budget ($)</label>
          <input
            id="ct-budget"
            type="number"
            value={form.budget || ""}
            onChange={(e) => onChange({ ...form, budget: Math.max(0, parseFloat(e.target.value) || 0) })}
            className={inputClass}
            placeholder="0"
            min={0}
          />
        </div>

        <div>
          <label htmlFor="ct-spend" className={labelClass}>Spend to Date ($)</label>
          <input
            id="ct-spend"
            type="number"
            value={form.spend || ""}
            onChange={(e) => onChange({ ...form, spend: Math.max(0, parseFloat(e.target.value) || 0) })}
            className={inputClass}
            placeholder="0"
            min={0}
          />
        </div>

        <div>
          <label htmlFor="ct-goal" className={labelClass}>Goal Type</label>
          <select
            id="ct-goal"
            value={form.goalType}
            onChange={(e) => onChange({ ...form, goalType: e.target.value as GoalType })}
            className={inputClass}
          >
            {GOAL_TYPES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="ct-target" className={labelClass}>Target Metric</label>
          <input
            id="ct-target"
            type="number"
            value={form.targetMetric || ""}
            onChange={(e) => onChange({ ...form, targetMetric: Math.max(0, parseFloat(e.target.value) || 0) })}
            className={inputClass}
            placeholder="0"
            min={0}
          />
        </div>

        <div>
          <label htmlFor="ct-actual" className={labelClass}>Actual Metric</label>
          <input
            id="ct-actual"
            type="number"
            value={form.actualMetric || ""}
            onChange={(e) => onChange({ ...form, actualMetric: Math.max(0, parseFloat(e.target.value) || 0) })}
            className={inputClass}
            placeholder="0"
            min={0}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="ct-notes" className={labelClass}>Notes</label>
          <input
            id="ct-notes"
            type="text"
            value={form.notes}
            onChange={(e) => onChange({ ...form, notes: e.target.value })}
            className={inputClass}
            placeholder="Optional notes"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onSubmit}
          className="bg-black text-white px-8 py-3 text-base font-bold hover:bg-neutral-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
        >
          {isEditing ? "Save Changes" : "Add Campaign"}
        </button>
        {isEditing && (
          <button
            onClick={onCancel}
            className="border border-neutral-300 px-8 py-3 text-base font-bold hover:border-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Best practices data                                                */
/* ------------------------------------------------------------------ */

const bestPractices = [
  {
    title: "Set Clear Objectives Before Launch",
    description:
      "Every campaign needs a measurable goal tied to a business outcome. Define what success looks like in numbers before spending a dollar. Vague objectives like 'increase awareness' become actionable when restated as 'reach 50,000 unique users in 30 days.'",
  },
  {
    title: "Align Budget to Expected Returns",
    description:
      "Allocate budget based on historical channel performance. If PPC delivers a 4x ROAS and social delivers 2x, weight your spend accordingly. Review allocation monthly and shift funds toward what is working.",
  },
  {
    title: "Monitor Pacing Weekly",
    description:
      "A campaign that burns 60% of budget in the first 30% of its timeline is headed for trouble. Weekly pacing checks let you adjust bids, targeting, or creative before overspend becomes unrecoverable.",
  },
  {
    title: "Use Consistent Naming Conventions",
    description:
      "Standardize campaign names with a format like Channel_Goal_Audience_Date. This makes filtering, reporting, and cross-team communication dramatically easier as your campaign count grows.",
  },
  {
    title: "Document Learnings After Each Campaign",
    description:
      "Completed campaigns are your best training data. Record what worked, what did not, and what you would change. These notes compound into institutional knowledge that improves every future campaign.",
  },
  {
    title: "Build in Review Checkpoints",
    description:
      "Schedule formal reviews at 25%, 50%, and 75% of a campaign's timeline. At each checkpoint, compare actual performance against targets and make documented go/no-go decisions on continuing, scaling, or pausing.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function CampaignTrackerPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [form, setForm] = useState<Omit<Campaign, "id">>({ ...EMPTY_FORM });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [view, setView] = useState<ViewTab>("dashboard");
  const [loaded, setLoaded] = useState(false);

  /* Filters */
  const [filterStatus, setFilterStatus] = useState<Status | "All">("All");
  const [filterChannel, setFilterChannel] = useState<Channel | "All">("All");
  const [filterStartFrom, setFilterStartFrom] = useState("");
  const [filterStartTo, setFilterStartTo] = useState("");

  /* Sort */
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  /* ---- localStorage persistence ---- */

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setCampaigns(parsed);
      }
    } catch {
      /* ignore corrupt data */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
    }
  }, [campaigns, loaded]);

  /* ---- CRUD ---- */

  const addCampaign = useCallback(() => {
    if (!form.name.trim()) return;
    setCampaigns((prev) => [...prev, { ...form, id: generateId() }]);
    setForm({ ...EMPTY_FORM });
  }, [form]);

  const updateCampaign = useCallback(() => {
    if (!editingId || !form.name.trim()) return;
    setCampaigns((prev) =>
      prev.map((c) => (c.id === editingId ? { ...form, id: editingId } : c))
    );
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
  }, [editingId, form]);

  const removeCampaign = useCallback((id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setForm({ ...EMPTY_FORM });
    }
  }, [editingId]);

  const startEditing = useCallback((c: Campaign) => {
    setEditingId(c.id);
    const { id, ...rest } = c;
    setForm(rest);
  }, []);

  const cancelEditing = useCallback(() => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
  }, []);

  /* ---- Filtering & sorting ---- */

  const filtered = useMemo(() => {
    return campaigns.filter((c) => {
      if (filterStatus !== "All" && c.status !== filterStatus) return false;
      if (filterChannel !== "All" && c.channel !== filterChannel) return false;
      if (filterStartFrom && c.startDate < filterStartFrom) return false;
      if (filterStartTo && c.startDate > filterStartTo) return false;
      return true;
    });
  }, [campaigns, filterStatus, filterChannel, filterStartFrom, filterStartTo]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      let valA: string | number;
      let valB: string | number;
      switch (sortField) {
        case "name": valA = a.name.toLowerCase(); valB = b.name.toLowerCase(); break;
        case "channel": valA = a.channel; valB = b.channel; break;
        case "status": valA = STATUSES.indexOf(a.status); valB = STATUSES.indexOf(b.status); break;
        case "startDate": valA = a.startDate; valB = b.startDate; break;
        case "endDate": valA = a.endDate; valB = b.endDate; break;
        case "budget": valA = a.budget; valB = b.budget; break;
        case "spend": valA = a.spend; valB = b.spend; break;
        case "health": {
          const order: Record<HealthStatus, number> = { "On Track": 0, "At Risk": 1, "Behind": 2 };
          valA = order[getCampaignHealth(a)];
          valB = order[getCampaignHealth(b)];
          break;
        }
        default: valA = a.name; valB = b.name;
      }
      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [filtered, sortField, sortDir]);

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  }

  /* ---- Dashboard aggregates ---- */

  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter((c) => c.status === "Active").length;
  const totalBudget = campaigns.reduce((s, c) => s + c.budget, 0);
  const totalSpend = campaigns.reduce((s, c) => s + c.spend, 0);
  const budgetUtil = pct(totalSpend, totalBudget);

  const healthCounts = useMemo(() => {
    const counts: Record<HealthStatus, number> = { "On Track": 0, "At Risk": 0, "Behind": 0 };
    campaigns.forEach((c) => {
      counts[getCampaignHealth(c)]++;
    });
    return counts;
  }, [campaigns]);

  /* ---- Chart data ---- */

  const budgetByChannel = useMemo(() => {
    const map: Record<string, number> = {};
    campaigns.forEach((c) => {
      map[c.channel] = (map[c.channel] || 0) + c.budget;
    });
    return Object.entries(map)
      .filter(([, v]) => v > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([label, value]) => ({ label, value }));
  }, [campaigns]);

  /* ---- Export ---- */

  const handleExport = useCallback(() => {
    const lines: string[] = [];
    lines.push("=== MARKETING CAMPAIGN REPORT ===");
    lines.push(`Generated: ${new Date().toLocaleString()}`);
    lines.push(`Total Campaigns: ${totalCampaigns}`);
    lines.push(`Active Campaigns: ${activeCampaigns}`);
    lines.push(`Total Budget: ${fmtCurrency(totalBudget)}`);
    lines.push(`Total Spend: ${fmtCurrency(totalSpend)}`);
    lines.push(`Budget Utilization: ${budgetUtil.toFixed(1)}%`);
    lines.push("");
    lines.push("--- HEALTH SUMMARY ---");
    lines.push(`On Track: ${healthCounts["On Track"]}`);
    lines.push(`At Risk: ${healthCounts["At Risk"]}`);
    lines.push(`Behind: ${healthCounts["Behind"]}`);
    lines.push("");
    lines.push("--- CAMPAIGN DETAILS ---");
    campaigns.forEach((c) => {
      lines.push("");
      lines.push(`Campaign: ${c.name}`);
      lines.push(`  Channel: ${c.channel}`);
      lines.push(`  Status: ${c.status}`);
      lines.push(`  Dates: ${fmtDate(c.startDate)} - ${fmtDate(c.endDate)}`);
      lines.push(`  Budget: ${fmtCurrency(c.budget)} | Spend: ${fmtCurrency(c.spend)} (${pct(c.spend, c.budget).toFixed(1)}% utilized)`);
      lines.push(`  Goal: ${c.goalType} | Target: ${c.targetMetric.toLocaleString()} | Actual: ${c.actualMetric.toLocaleString()} (${pct(c.actualMetric, c.targetMetric).toFixed(1)}% achieved)`);
      lines.push(`  Health: ${getCampaignHealth(c)}`);
      if (c.notes) lines.push(`  Notes: ${c.notes}`);
    });
    lines.push("");
    lines.push("--- BUDGET BY CHANNEL ---");
    budgetByChannel.forEach((d) => {
      lines.push(`${d.label}: ${fmtCurrency(d.value)}`);
    });

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "campaign-report.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [campaigns, totalCampaigns, activeCampaigns, totalBudget, totalSpend, budgetUtil, healthCounts, budgetByChannel]);

  /* ---- Sort indicator ---- */

  function sortIndicator(field: SortField) {
    if (sortField !== field) return "";
    return sortDir === "asc" ? " ↑" : " ↓";
  }

  /* ---- JSON-LD ---- */

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Marketing Campaign Tracker",
    description: "Track and manage all your marketing campaigns in one place. Monitor status, budgets, performance, and deadlines across channels.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <article className="min-h-screen bg-white text-black">
      <JsonLd data={jsonLd} />
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Campaign Tracker" },
        ]}
      />

      {/* ---- Hero ---- */}
      <header className="px-6 lg:px-12 pt-32 pb-16">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold text-black tracking-tight mt-3">
              Marketing Campaign Tracker
            </h1>
            <SectionDesc>
              Track and manage all your marketing campaigns in one place. Monitor
              status, budgets, performance metrics, and deadlines across every
              channel.
            </SectionDesc>
          </Animate>
        </div>
      </header>

      {/* ---- Campaign Form ---- */}
      <section className="px-6 lg:px-12 pb-12">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <CampaignForm
              form={form}
              onChange={setForm}
              onSubmit={editingId ? updateCampaign : addCampaign}
              onCancel={cancelEditing}
              isEditing={!!editingId}
            />
          </Animate>
        </div>
      </section>

      {/* ---- View Tabs & Filters ---- */}
      {campaigns.length > 0 && (
        <section className="px-6 lg:px-12 pb-4">
          <div className="max-w-5xl mx-auto space-y-4">
            {/* Tab buttons */}
            <div className="flex flex-wrap gap-2">
              {(["dashboard", "table", "charts"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setView(tab)}
                  className={`px-5 py-2 text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                    view === tab
                      ? "bg-black text-white"
                      : "border border-neutral-300 text-black hover:border-black"
                  }`}
                >
                  {tab === "dashboard" ? "Dashboard" : tab === "table" ? "Table" : "Charts"}
                </button>
              ))}

              <button
                onClick={handleExport}
                className="ml-auto border border-neutral-300 px-5 py-2 text-base font-bold hover:border-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Export .txt
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-end gap-4 border border-neutral-200 p-4">
              <div>
                <label htmlFor="ct-filter-status" className="block text-base font-bold mb-1">
                  Status
                </label>
                <select
                  id="ct-filter-status"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as Status | "All")}
                  className="border border-neutral-300 px-3 py-2 text-base bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  <option value="All">All Statuses</option>
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="ct-filter-channel" className="block text-base font-bold mb-1">
                  Channel
                </label>
                <select
                  id="ct-filter-channel"
                  value={filterChannel}
                  onChange={(e) => setFilterChannel(e.target.value as Channel | "All")}
                  className="border border-neutral-300 px-3 py-2 text-base bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  <option value="All">All Channels</option>
                  {CHANNELS.map((ch) => (
                    <option key={ch} value={ch}>{ch}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="ct-filter-from" className="block text-base font-bold mb-1">
                  Start From
                </label>
                <input
                  id="ct-filter-from"
                  type="date"
                  value={filterStartFrom}
                  onChange={(e) => setFilterStartFrom(e.target.value)}
                  className="border border-neutral-300 px-3 py-2 text-base bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                />
              </div>

              <div>
                <label htmlFor="ct-filter-to" className="block text-base font-bold mb-1">
                  Start To
                </label>
                <input
                  id="ct-filter-to"
                  type="date"
                  value={filterStartTo}
                  onChange={(e) => setFilterStartTo(e.target.value)}
                  className="border border-neutral-300 px-3 py-2 text-base bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                />
              </div>

              {(filterStatus !== "All" || filterChannel !== "All" || filterStartFrom || filterStartTo) && (
                <button
                  onClick={() => {
                    setFilterStatus("All");
                    setFilterChannel("All");
                    setFilterStartFrom("");
                    setFilterStartTo("");
                  }}
                  className="border border-neutral-300 px-4 py-2 text-base font-bold hover:border-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ---- Dashboard View ---- */}
      {campaigns.length > 0 && view === "dashboard" && (
        <section className="px-6 lg:px-12 pb-16">
          <div className="max-w-5xl mx-auto space-y-8">
            <Animate animation="fade-up">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <SummaryCard label="Total Campaigns" value={String(totalCampaigns)} />
                <SummaryCard label="Active" value={String(activeCampaigns)} />
                <SummaryCard label="Total Budget" value={fmtCurrency(totalBudget)} />
                <SummaryCard label="Total Spend" value={fmtCurrency(totalSpend)} />
                <SummaryCard
                  label="Budget Utilization"
                  value={`${budgetUtil.toFixed(1)}%`}
                  sub={totalBudget > 0 ? `${fmtCurrency(totalBudget - totalSpend)} remaining` : undefined}
                />
              </div>
            </Animate>

            <Animate animation="fade-up" delay={100}>
              <div className="border border-neutral-200 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                  Campaign Health Overview
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-neutral-50">
                    <p className="text-3xl font-extrabold text-black">{healthCounts["On Track"]}</p>
                    <p className="text-base font-bold text-neutral-600 mt-1">On Track</p>
                  </div>
                  <div className="text-center p-4 bg-neutral-50">
                    <p className="text-3xl font-extrabold text-black">{healthCounts["At Risk"]}</p>
                    <p className="text-base font-bold text-neutral-600 mt-1">At Risk</p>
                  </div>
                  <div className="text-center p-4 bg-neutral-50">
                    <p className="text-3xl font-extrabold text-black">{healthCounts["Behind"]}</p>
                    <p className="text-base font-bold text-neutral-600 mt-1">Behind</p>
                  </div>
                </div>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={200}>
              <div className="border border-neutral-200 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                  Budget Utilization
                </h3>
                <div className="flex justify-between text-base mb-2">
                  <span className="font-bold">{fmtCurrency(totalSpend)} spent</span>
                  <span className="text-neutral-500">of {fmtCurrency(totalBudget)}</span>
                </div>
                <div className="h-3 w-full bg-neutral-100">
                  <div
                    className="h-3 bg-black transition-all"
                    style={{ width: `${Math.min(budgetUtil, 100)}%` }}
                  />
                </div>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Table View ---- */}
      {campaigns.length > 0 && view === "table" && (
        <section className="px-6 lg:px-12 pb-16">
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <Animate animation="fade-up">
              <table className="w-full text-base">
                <thead>
                  <tr className="border-b-2 border-black text-left">
                    {([
                      ["name", "Name"],
                      ["channel", "Channel"],
                      ["status", "Status"],
                      ["startDate", "Start"],
                      ["endDate", "End"],
                      ["budget", "Budget"],
                      ["spend", "Spend"],
                      ["health", "Health"],
                    ] as [SortField, string][]).map(([field, label]) => (
                      <th key={field} className="pb-2 pr-3 font-bold whitespace-nowrap">
                        <button
                          onClick={() => toggleSort(field)}
                          className="hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        >
                          {label}{sortIndicator(field)}
                        </button>
                      </th>
                    ))}
                    <th className="pb-2 pr-3 font-bold">Goal</th>
                    <th className="pb-2 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((c) => {
                    const health = getCampaignHealth(c);
                    const budgetPct = pct(c.spend, c.budget);
                    const goalPct = pct(c.actualMetric, c.targetMetric);
                    return (
                      <tr key={c.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-3 pr-3 font-medium">{c.name}</td>
                        <td className="py-3 pr-3">{c.channel}</td>
                        <td className="py-3 pr-3">
                          <span className={`inline-block px-2 py-0.5 text-base font-bold ${statusBadgeClass(c.status)}`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="py-3 pr-3 whitespace-nowrap">{fmtDate(c.startDate)}</td>
                        <td className="py-3 pr-3 whitespace-nowrap">{fmtDate(c.endDate)}</td>
                        <td className="py-3 pr-3 whitespace-nowrap">
                          <div>{fmtCurrency(c.budget)}</div>
                          <ProgressBar value={c.spend} max={c.budget} className="mt-1" />
                          <div className="text-neutral-500 mt-0.5">{budgetPct.toFixed(0)}% used</div>
                        </td>
                        <td className="py-3 pr-3 whitespace-nowrap">{fmtCurrency(c.spend)}</td>
                        <td className="py-3 pr-3">
                          <span className={`inline-block px-2 py-0.5 text-base font-bold ${healthBadgeClass(health)}`}>
                            {health}
                          </span>
                        </td>
                        <td className="py-3 pr-3">
                          <div className="text-neutral-500">{c.goalType}</div>
                          <ProgressBar value={c.actualMetric} max={c.targetMetric} className="mt-1" />
                          <div className="text-neutral-500 mt-0.5">{goalPct.toFixed(0)}% of target</div>
                        </td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEditing(c)}
                              className="text-black underline font-bold text-base hover:no-underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => removeCampaign(c.id)}
                              className="text-neutral-400 hover:text-black text-base focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                              aria-label={`Remove ${c.name}`}
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-black">
                    <td colSpan={5} className="pt-3 font-bold text-base">
                      {filtered.length} campaign{filtered.length !== 1 ? "s" : ""}
                    </td>
                    <td className="pt-3 font-bold text-base">
                      {fmtCurrency(filtered.reduce((s, c) => s + c.budget, 0))}
                    </td>
                    <td className="pt-3 font-bold text-base">
                      {fmtCurrency(filtered.reduce((s, c) => s + c.spend, 0))}
                    </td>
                    <td colSpan={3} />
                  </tr>
                </tfoot>
              </table>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Charts View ---- */}
      {campaigns.length > 0 && view === "charts" && (
        <section className="px-6 lg:px-12 pb-16">
          <div className="max-w-5xl mx-auto space-y-12">
            <Animate animation="fade-up">
              <div className="border border-neutral-200 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                  Budget Allocation by Channel
                </h3>
                <PieChart data={budgetByChannel} />
              </div>
            </Animate>

            <Animate animation="fade-up" delay={100}>
              <div className="border border-neutral-200 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                  Campaign Timeline
                </h3>
                <GanttChart campaigns={sorted} />
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Empty state ---- */}
      {campaigns.length === 0 && loaded && (
        <section className="px-6 lg:px-12 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="border-2 border-dashed border-neutral-200 p-12 text-center">
              <p className="text-lg text-neutral-500">
                No campaigns yet. Add your first campaign above to start tracking
                your marketing efforts.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ---- Best Practices ---- */}
      <section className="px-6 lg:px-12 py-16 border-t border-neutral-200">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Best Practices</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black tracking-tight mt-3 mb-8">
              Campaign Management Fundamentals
            </h2>
          </Animate>
          <Stagger stagger={100} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bestPractices.map((bp) => (
              <div key={bp.title} className="border border-neutral-200 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  {bp.title}
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  {bp.description}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Managing Your Campaigns?
            </h2>
            <p className="text-lg text-neutral-400 mt-4 mb-8">
              Tracking campaigns is the foundation. Let our team build the
              strategy, execute across channels, and optimize performance so
              every dollar works harder.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Get in Touch &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Campaign Tracker"
        services={[
          { title: "Performance Marketing", desc: "Google Ads, Meta Ads, and PPC campaigns that maximize ROAS.", href: "/services/performance-marketing" },
          { title: "Digital Marketing", desc: "Integrated strategy across all channels for measurable growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Complement paid with organic — reduce dependency on ad spend over time.", href: "/services/seo" },
        ]}
        relatedTools={[
          { title: "Campaign Debrief", href: "/resources/campaign-debrief" },
          { title: "Campaign Naming Convention", href: "/resources/campaign-naming-convention" },
          { title: "Campaign Naming Generator", href: "/resources/campaign-naming-generator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
