"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Channel = "SEO" | "PPC" | "Email" | "Social" | "Content" | "Landing Page" | "Other";
type Status = "Planning" | "Running" | "Completed" | "Cancelled";
type SortField = "name" | "channel" | "status" | "startDate" | "ice";
type SortDir = "asc" | "desc";
type ViewTab = "dashboard" | "experiments" | "timeline" | "learnings";

interface Experiment {
  id: string;
  name: string;
  hypothesis: string;
  channel: Channel;
  status: Status;
  startDate: string;
  endDate: string;
  primaryMetric: string;
  targetImprovement: number;
  actualResult: number;
  impact: number;
  confidence: number;
  ease: number;
  learnings: string[];
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const CHANNELS: Channel[] = ["SEO", "PPC", "Email", "Social", "Content", "Landing Page", "Other"];
const STATUSES: Status[] = ["Planning", "Running", "Completed", "Cancelled"];

const STORAGE_KEY = "markit-experiment-tracker";

const EMPTY_FORM: Omit<Experiment, "id"> = {
  name: "",
  hypothesis: "",
  channel: "SEO",
  status: "Planning",
  startDate: "",
  endDate: "",
  primaryMetric: "",
  targetImprovement: 0,
  actualResult: 0,
  impact: 3,
  confidence: 3,
  ease: 3,
  learnings: [],
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function fmtDate(d: string): string {
  if (!d) return "--";
  const date = new Date(d + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function iceScore(e: Pick<Experiment, "impact" | "confidence" | "ease">): number {
  return e.impact * e.confidence * e.ease;
}

function isWin(e: Experiment): boolean {
  return e.status === "Completed" && e.actualResult >= e.targetImprovement && e.targetImprovement > 0;
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

function StatusBadge({ status }: { status: Status }) {
  const cls: Record<Status, string> = {
    Planning: "bg-neutral-100 text-neutral-700 border border-neutral-300",
    Running: "bg-neutral-900 text-white",
    Completed: "bg-neutral-600 text-white",
    Cancelled: "bg-neutral-300 text-neutral-700",
  };
  return (
    <span className={`inline-block px-3 py-1 text-base font-bold ${cls[status]}`}>
      {status}
    </span>
  );
}

function WinLossBadge({ experiment }: { experiment: Experiment }) {
  if (experiment.status !== "Completed") return null;
  const won = isWin(experiment);
  return (
    <span
      className={`inline-block px-3 py-1 text-base font-bold ${
        won ? "bg-black text-white" : "bg-neutral-200 text-neutral-700"
      }`}
    >
      {won ? "WIN" : "LOSS"}
    </span>
  );
}

function IceDisplay({ impact, confidence, ease }: { impact: number; confidence: number; ease: number }) {
  const score = impact * confidence * ease;
  return (
    <div className="flex items-center gap-3 text-base">
      <span className="text-neutral-500">I:{impact}</span>
      <span className="text-neutral-500">C:{confidence}</span>
      <span className="text-neutral-500">E:{ease}</span>
      <span className="font-bold text-black">= {score}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Bar Chart: Experiments by Channel (SVG)                            */
/* ------------------------------------------------------------------ */

function ChannelBarChart({ experiments }: { experiments: Experiment[] }) {
  const channelCounts = CHANNELS.map((ch) => ({
    label: ch,
    count: experiments.filter((e) => e.channel === ch).length,
  }));

  const maxCount = Math.max(...channelCounts.map((c) => c.count), 1);

  if (experiments.length === 0) {
    return (
      <p className="text-base text-neutral-500 py-8 text-center">
        Add experiments to see the channel distribution chart.
      </p>
    );
  }

  const barHeight = 32;
  const rowGap = 12;
  const labelWidth = 120;
  const chartLeft = labelWidth + 10;
  const chartWidth = 400;
  const svgWidth = chartLeft + chartWidth + 60;
  const svgHeight = channelCounts.length * (barHeight + rowGap) + 20;

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      className="w-full max-w-2xl"
      role="img"
      aria-label="Experiments by channel bar chart"
    >
      {channelCounts.map((item, i) => {
        const y = i * (barHeight + rowGap) + 10;
        const barW = maxCount > 0 ? (item.count / maxCount) * chartWidth : 0;
        return (
          <g key={item.label}>
            <text
              x={labelWidth}
              y={y + barHeight / 2 + 5}
              textAnchor="end"
              fontSize="16"
              fill="#333"
            >
              {item.label}
            </text>
            <rect
              x={chartLeft}
              y={y}
              width={Math.max(barW, 0)}
              height={barHeight}
              fill="#000"
            />
            <text
              x={chartLeft + barW + 8}
              y={y + barHeight / 2 + 5}
              fontSize="16"
              fill="#333"
              fontWeight="bold"
            >
              {item.count}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Gantt Chart (SVG)                                                  */
/* ------------------------------------------------------------------ */

function GanttChart({ experiments }: { experiments: Experiment[] }) {
  const withDates = experiments.filter((e) => e.startDate && e.endDate);
  if (withDates.length === 0) {
    return (
      <p className="text-base text-neutral-500 py-8 text-center">
        Add experiments with start and end dates to see the timeline.
      </p>
    );
  }

  const allStarts = withDates.map((e) => new Date(e.startDate + "T00:00:00").getTime());
  const allEnds = withDates.map((e) => new Date(e.endDate + "T00:00:00").getTime());
  const minTime = Math.min(...allStarts);
  const maxTime = Math.max(...allEnds);
  const range = maxTime - minTime || 1;

  const barHeight = 28;
  const rowGap = 10;
  const labelWidth = 160;
  const chartLeft = labelWidth + 10;
  const chartWidth = 500;
  const svgWidth = chartLeft + chartWidth + 20;
  const svgHeight = withDates.length * (barHeight + rowGap) + 50;

  const fills: Record<Status, string> = {
    Planning: "#cccccc",
    Running: "#000000",
    Completed: "#555555",
    Cancelled: "#999999",
  };

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      className="w-full"
      role="img"
      aria-label="Experiment timeline Gantt chart"
    >
      {withDates.map((e, i) => {
        const start = new Date(e.startDate + "T00:00:00").getTime();
        const end = new Date(e.endDate + "T00:00:00").getTime();
        const x = chartLeft + ((start - minTime) / range) * chartWidth;
        const w = Math.max(((end - start) / range) * chartWidth, 4);
        const y = i * (barHeight + rowGap) + 10;

        return (
          <g key={e.id}>
            <text
              x={labelWidth}
              y={y + barHeight / 2 + 5}
              textAnchor="end"
              fontSize="16"
              fill="#333"
            >
              {e.name.length > 20 ? e.name.slice(0, 20) + "..." : e.name}
            </text>
            <rect
              x={x}
              y={y}
              width={w}
              height={barHeight}
              rx={4}
              fill={fills[e.status]}
            />
          </g>
        );
      })}
      <text x={chartLeft} y={svgHeight - 4} fontSize="16" fill="#666">
        {fmtDate(new Date(minTime).toISOString().slice(0, 10))}
      </text>
      <text x={chartLeft + chartWidth} y={svgHeight - 4} fontSize="16" fill="#666" textAnchor="end">
        {fmtDate(new Date(maxTime).toISOString().slice(0, 10))}
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Experiment Form                                                    */
/* ------------------------------------------------------------------ */

function ExperimentForm({
  form,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
}: {
  form: Omit<Experiment, "id">;
  onChange: (f: Omit<Experiment, "id">) => void;
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
        {isEditing ? "Edit Experiment" : "Add Experiment"}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-2 lg:col-span-3">
          <label htmlFor="exp-name" className={labelClass}>Experiment Name</label>
          <input
            id="exp-name"
            type="text"
            value={form.name}
            onChange={(e) => onChange({ ...form, name: e.target.value })}
            className={inputClass}
            placeholder="e.g. Homepage CTA button color test"
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <label htmlFor="exp-hypothesis" className={labelClass}>Hypothesis</label>
          <textarea
            id="exp-hypothesis"
            value={form.hypothesis}
            onChange={(e) => onChange({ ...form, hypothesis: e.target.value })}
            className={`${inputClass} min-h-[80px]`}
            placeholder="If we change X, then Y will improve because Z"
            rows={3}
          />
        </div>

        <div>
          <label htmlFor="exp-channel" className={labelClass}>Channel</label>
          <select
            id="exp-channel"
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
          <label htmlFor="exp-status" className={labelClass}>Status</label>
          <select
            id="exp-status"
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
          <label htmlFor="exp-metric" className={labelClass}>Primary Metric</label>
          <input
            id="exp-metric"
            type="text"
            value={form.primaryMetric}
            onChange={(e) => onChange({ ...form, primaryMetric: e.target.value })}
            className={inputClass}
            placeholder="e.g. Conversion rate"
          />
        </div>

        <div>
          <label htmlFor="exp-start" className={labelClass}>Start Date</label>
          <input
            id="exp-start"
            type="date"
            value={form.startDate}
            onChange={(e) => onChange({ ...form, startDate: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="exp-end" className={labelClass}>End Date</label>
          <input
            id="exp-end"
            type="date"
            value={form.endDate}
            onChange={(e) => onChange({ ...form, endDate: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="exp-target" className={labelClass}>Target Improvement (%)</label>
          <input
            id="exp-target"
            type="number"
            value={form.targetImprovement || ""}
            onChange={(e) => onChange({ ...form, targetImprovement: parseFloat(e.target.value) || 0 })}
            className={inputClass}
            placeholder="e.g. 15"
            min={0}
            step="0.1"
          />
        </div>

        <div>
          <label htmlFor="exp-actual" className={labelClass}>Actual Result (%)</label>
          <input
            id="exp-actual"
            type="number"
            value={form.actualResult || ""}
            onChange={(e) => onChange({ ...form, actualResult: parseFloat(e.target.value) || 0 })}
            className={inputClass}
            placeholder="e.g. 22"
            step="0.1"
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <p className="text-base font-bold text-black mb-3">ICE Priority Score</p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="exp-impact" className={labelClass}>Impact (1-5)</label>
              <select
                id="exp-impact"
                value={form.impact}
                onChange={(e) => onChange({ ...form, impact: parseInt(e.target.value, 10) })}
                className={inputClass}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="exp-confidence" className={labelClass}>Confidence (1-5)</label>
              <select
                id="exp-confidence"
                value={form.confidence}
                onChange={(e) => onChange({ ...form, confidence: parseInt(e.target.value, 10) })}
                className={inputClass}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="exp-ease" className={labelClass}>Ease (1-5)</label>
              <select
                id="exp-ease"
                value={form.ease}
                onChange={(e) => onChange({ ...form, ease: parseInt(e.target.value, 10) })}
                className={inputClass}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-base text-neutral-500 mt-2">
            ICE Score: {form.impact * form.confidence * form.ease} / 125
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onSubmit}
          className="bg-black text-white px-8 py-3 text-base font-bold hover:bg-neutral-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
        >
          {isEditing ? "Save Changes" : "Add Experiment"}
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
/*  Educational content                                                */
/* ------------------------------------------------------------------ */

const educationalContent = [
  {
    title: "Why Experiment-Driven Marketing Matters",
    body: "Most marketing decisions are based on gut instinct or what competitors are doing. Experiment-driven marketing replaces guesswork with evidence. By running controlled tests, you discover what actually works for your specific audience, reducing wasted spend and compounding wins over time.",
  },
  {
    title: "The ICE Scoring Framework",
    body: "ICE stands for Impact, Confidence, and Ease. Each factor is scored 1 to 5 and multiplied together to produce a priority score. Impact measures how much the experiment could move your key metric. Confidence reflects how certain you are it will succeed. Ease captures how quickly and cheaply you can run it. High-ICE experiments should be run first.",
  },
  {
    title: "Writing Strong Hypotheses",
    body: "A good hypothesis follows the format: If we [change], then [metric] will [improve/decrease] because [reason]. This forces you to define the variable, the expected outcome, and the logic behind it. Without a clear hypothesis, you cannot learn from the result regardless of whether it succeeds or fails.",
  },
  {
    title: "Defining Success Before You Start",
    body: "Set your target improvement percentage before launching. This prevents moving the goalposts after seeing results. A 5% lift might sound small, but if it is your target and you hit it, that is a win worth scaling. Without predefined targets, every result can be rationalized.",
  },
  {
    title: "Building a Learnings Library",
    body: "The most valuable output of any experiment is what you learned. Document key takeaways from every experiment, win or loss. Over time, this library becomes your competitive advantage: a searchable record of what works and what does not for your specific market.",
  },
  {
    title: "Running Experiments Across Channels",
    body: "Spread experiments across channels to avoid over-optimizing a single one. Test SEO title variations, PPC bid strategies, email subject lines, social content formats, and landing page layouts. Cross-channel insights often reveal audience preferences that apply broadly.",
  },
];

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */



export default function ExperimentTrackerPage() {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [form, setForm] = useState<Omit<Experiment, "id">>({ ...EMPTY_FORM });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<ViewTab>("dashboard");
  const [filterStatus, setFilterStatus] = useState<Status | "All">("All");
  const [filterChannel, setFilterChannel] = useState<Channel | "All">("All");
  const [sortField, setSortField] = useState<SortField>("ice");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [learningInput, setLearningInput] = useState("");
  const [learningExpId, setLearningExpId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  /* -- Persistence -------------------------------------------------- */

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Experiment[];
        setExperiments(parsed);
      }
    } catch {
      /* ignore corrupted data */
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(experiments));
    }
  }, [experiments, mounted]);

  /* -- CRUD --------------------------------------------------------- */

  const handleAdd = useCallback(() => {
    if (!form.name.trim()) return;
    const newExp: Experiment = { ...form, id: generateId() };
    setExperiments((prev) => [...prev, newExp]);
    setForm({ ...EMPTY_FORM });
    setShowForm(false);
  }, [form]);

  const handleEdit = useCallback(
    (exp: Experiment) => {
      setEditingId(exp.id);
      const { id, ...rest } = exp;
      setForm(rest);
      setShowForm(true);
    },
    []
  );

  const handleUpdate = useCallback(() => {
    if (!editingId || !form.name.trim()) return;
    setExperiments((prev) =>
      prev.map((e) => (e.id === editingId ? { ...form, id: editingId } : e))
    );
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
    setShowForm(false);
  }, [editingId, form]);

  const handleDelete = useCallback((id: string) => {
    setExperiments((prev) => prev.filter((e) => e.id !== id));
    setEditingId(null);
    setShowForm(false);
  }, []);

  const handleCancel = useCallback(() => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
    setShowForm(false);
  }, []);

  const handleAddLearning = useCallback(
    (expId: string, text: string) => {
      if (!text.trim()) return;
      setExperiments((prev) =>
        prev.map((e) =>
          e.id === expId ? { ...e, learnings: [...e.learnings, text.trim()] } : e
        )
      );
      setLearningInput("");
      setLearningExpId(null);
    },
    []
  );

  const handleRemoveLearning = useCallback((expId: string, idx: number) => {
    setExperiments((prev) =>
      prev.map((e) =>
        e.id === expId
          ? { ...e, learnings: e.learnings.filter((_, i) => i !== idx) }
          : e
      )
    );
  }, []);

  /* -- Export ------------------------------------------------------- */

  const handleExport = useCallback(() => {
    const lines: string[] = [
      "MARKETING EXPERIMENT TRACKER",
      "Exported: " + new Date().toLocaleDateString("en-US"),
      "=" .repeat(60),
      "",
    ];

    experiments.forEach((e) => {
      lines.push(`Experiment: ${e.name}`);
      lines.push(`  Channel: ${e.channel}`);
      lines.push(`  Status: ${e.status}`);
      lines.push(`  Hypothesis: ${e.hypothesis || "N/A"}`);
      lines.push(`  Primary Metric: ${e.primaryMetric || "N/A"}`);
      lines.push(`  Target Improvement: ${e.targetImprovement}%`);
      lines.push(`  Actual Result: ${e.actualResult}%`);
      lines.push(`  Dates: ${fmtDate(e.startDate)} - ${fmtDate(e.endDate)}`);
      lines.push(`  ICE Score: ${iceScore(e)} (I:${e.impact} C:${e.confidence} E:${e.ease})`);
      if (e.status === "Completed") {
        lines.push(`  Outcome: ${isWin(e) ? "WIN" : "LOSS"}`);
      }
      if (e.learnings.length > 0) {
        lines.push("  Learnings:");
        e.learnings.forEach((l, i) => lines.push(`    ${i + 1}. ${l}`));
      }
      lines.push("");
    });

    const completed = experiments.filter((e) => e.status === "Completed");
    const wins = completed.filter(isWin);
    lines.push("-".repeat(60));
    lines.push("SUMMARY");
    lines.push(`  Total Experiments: ${experiments.length}`);
    lines.push(`  Completed: ${completed.length}`);
    lines.push(`  Win Rate: ${completed.length > 0 ? ((wins.length / completed.length) * 100).toFixed(1) : 0}%`);
    if (completed.length > 0) {
      const avgImprovement =
        completed.reduce((s, e) => s + e.actualResult, 0) / completed.length;
      lines.push(`  Average Actual Result: ${avgImprovement.toFixed(1)}%`);
    }

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "experiment-tracker-export.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [experiments]);

  /* -- Filtering & Sorting ------------------------------------------ */

  const filtered = useMemo(() => {
    let list = [...experiments];
    if (filterStatus !== "All") list = list.filter((e) => e.status === filterStatus);
    if (filterChannel !== "All") list = list.filter((e) => e.channel === filterChannel);

    list.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "channel":
          cmp = a.channel.localeCompare(b.channel);
          break;
        case "status":
          cmp = STATUSES.indexOf(a.status) - STATUSES.indexOf(b.status);
          break;
        case "startDate":
          cmp = (a.startDate || "").localeCompare(b.startDate || "");
          break;
        case "ice":
          cmp = iceScore(a) - iceScore(b);
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [experiments, filterStatus, filterChannel, sortField, sortDir]);

  /* -- Dashboard stats ---------------------------------------------- */

  const completed = useMemo(() => experiments.filter((e) => e.status === "Completed"), [experiments]);
  const wins = useMemo(() => completed.filter(isWin), [completed]);
  const winRate = completed.length > 0 ? ((wins.length / completed.length) * 100).toFixed(1) : "0";
  const avgImprovement =
    completed.length > 0
      ? (completed.reduce((s, e) => s + e.actualResult, 0) / completed.length).toFixed(1)
      : "0";

  const statusCounts = useMemo(() => {
    const counts: Record<Status, number> = { Planning: 0, Running: 0, Completed: 0, Cancelled: 0 };
    experiments.forEach((e) => counts[e.status]++);
    return counts;
  }, [experiments]);

  /* -- All learnings for learnings tab ------------------------------ */
  const allLearnings = useMemo(() => {
    const items: { expName: string; expId: string; channel: Channel; text: string }[] = [];
    experiments.forEach((e) => {
      e.learnings.forEach((l) => {
        items.push({ expName: e.name, expId: e.id, channel: e.channel, text: l });
      });
    });
    return items;
  }, [experiments]);

  /* -- Tab buttons -------------------------------------------------- */

  const tabs: { key: ViewTab; label: string }[] = [
    { key: "dashboard", label: "Dashboard" },
    { key: "experiments", label: "Experiments" },
    { key: "timeline", label: "Timeline" },
    { key: "learnings", label: "Learnings" },
  ];

  const selectClass =
    "border border-neutral-300 px-3 py-2 text-base bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";

  if (!mounted) {
    return (
      <article className="min-h-screen">
        <div className="px-6 lg:px-12 py-32 text-center">
          <p className="text-base text-neutral-500">Loading...</p>
        </div>
      </article>
    );
  }

  return (
    <article className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Experiment Tracker",
          description: "Track A/B tests and marketing experiments with hypothesis logging, variant tracking, statistical significance calculations, and win/loss analysis.",
          url: "https://themarkitmedia.com/en/resources/experiment-tracker",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Marketing Experiment Tracker | Free Marketing Tool — Markit Media</title>
      <link rel="canonical" href="https://themarkitmedia.com/en/resources/experiment-tracker" />
      <meta name="description" content="Track A/B tests and marketing experiments with hypothesis logging, variant tracking, statistical significance calculations, and win/loss analysis." />
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Marketing Experiment Tracker" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Interactive Tools" className="px-6 lg:px-12 pt-16 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Interactive Tools</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing Experiment Tracker
            </h1>
            <SectionDesc>
              Plan, prioritize, and track marketing experiments. Use ICE scoring to
              decide what to test first, monitor results, and build a searchable
              library of learnings.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Tabs */}
      <section aria-label="Content section" className="px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-6 py-3 text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                activeTab === t.key
                  ? "bg-black text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DASHBOARD TAB                                                */}
      {/* ============================================================ */}

      {activeTab === "dashboard" && (
        <section aria-label="Overview" className="px-6 lg:px-12 py-8">
          <div className="max-w-7xl mx-auto space-y-10">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                Overview
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <SummaryCard label="Total Experiments" value={String(experiments.length)} />
                <SummaryCard
                  label="Win Rate"
                  value={`${winRate}%`}
                  sub={`${wins.length} of ${completed.length} completed`}
                />
                <SummaryCard
                  label="Avg Improvement"
                  value={`${avgImprovement}%`}
                  sub="across completed"
                />
                <SummaryCard
                  label="Running Now"
                  value={String(statusCounts.Running)}
                  sub={`${statusCounts.Planning} planning`}
                />
              </div>
            </Animate>

            <Animate animation="fade-up" delay={100}>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                Experiments by Status
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {STATUSES.map((s) => (
                  <div key={s} className="border border-neutral-200 p-4">
                    <p className="text-base text-neutral-500">{s}</p>
                    <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                      {statusCounts[s]}
                    </p>
                  </div>
                ))}
              </div>
            </Animate>

            <Animate animation="fade-up" delay={200}>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                Experiments by Channel
              </h2>
              <ChannelBarChart experiments={experiments} />
            </Animate>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/*  EXPERIMENTS TAB                                              */}
      {/* ============================================================ */}

      {activeTab === "experiments" && (
        <section aria-label="Content section" className="px-6 lg:px-12 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Actions bar */}
            <div className="flex flex-wrap items-center gap-3">
              {!showForm && (
                <button
                  onClick={() => {
                    setForm({ ...EMPTY_FORM });
                    setEditingId(null);
                    setShowForm(true);
                  }}
                  className="bg-black text-white px-6 py-3 text-base font-bold hover:bg-neutral-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  + New Experiment
                </button>
              )}
              <button
                onClick={handleExport}
                className="border border-neutral-300 px-6 py-3 text-base font-bold hover:border-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Export .txt
              </button>
            </div>

            {/* Form */}
            {showForm && (
              <Animate animation="fade-up">
                <ExperimentForm
                  form={form}
                  onChange={setForm}
                  onSubmit={editingId ? handleUpdate : handleAdd}
                  onCancel={handleCancel}
                  isEditing={!!editingId}
                />
              </Animate>
            )}

            {/* Filters and sorting */}
            <div className="flex flex-wrap items-center gap-3">
              <label htmlFor="filter-status" className="text-base font-bold text-black">
                Status:
              </label>
              <select
                id="filter-status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as Status | "All")}
                className={selectClass}
              >
                <option value="All">All</option>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <label htmlFor="filter-channel" className="text-base font-bold text-black">
                Channel:
              </label>
              <select
                id="filter-channel"
                value={filterChannel}
                onChange={(e) => setFilterChannel(e.target.value as Channel | "All")}
                className={selectClass}
              >
                <option value="All">All</option>
                {CHANNELS.map((ch) => (
                  <option key={ch} value={ch}>{ch}</option>
                ))}
              </select>

              <label htmlFor="sort-field" className="text-base font-bold text-black">
                Sort:
              </label>
              <select
                id="sort-field"
                value={sortField}
                onChange={(e) => setSortField(e.target.value as SortField)}
                className={selectClass}
              >
                <option value="ice">ICE Score</option>
                <option value="name">Name</option>
                <option value="channel">Channel</option>
                <option value="status">Status</option>
                <option value="startDate">Start Date</option>
              </select>
              <button
                onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
                className="border border-neutral-300 px-3 py-2 text-base font-bold hover:border-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                aria-label={`Sort direction: ${sortDir === "asc" ? "ascending" : "descending"}`}
              >
                {sortDir === "asc" ? "Asc" : "Desc"}
              </button>
            </div>

            {/* Experiment cards */}
            {filtered.length === 0 ? (
              <p className="text-base text-neutral-500 py-8 text-center">
                No experiments yet. Click &quot;+ New Experiment&quot; to start tracking.
              </p>
            ) : (
              <div className="space-y-6">
                {filtered.map((exp) => (
                  <Animate key={exp.id} animation="fade-up">
                    <div className="border border-neutral-200 p-6 space-y-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                            {exp.name}
                          </h3>
                          <p className="text-base text-neutral-500 mt-1">
                            {exp.channel} &middot; {fmtDate(exp.startDate)} &ndash; {fmtDate(exp.endDate)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={exp.status} />
                          <WinLossBadge experiment={exp} />
                        </div>
                      </div>

                      {exp.hypothesis && (
                        <div>
                          <p className="text-base font-bold text-black">Hypothesis</p>
                          <p className="text-base text-neutral-600">{exp.hypothesis}</p>
                        </div>
                      )}

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <p className="text-base text-neutral-500">Primary Metric</p>
                          <p className="text-base font-bold text-black">{exp.primaryMetric || "--"}</p>
                        </div>
                        <div>
                          <p className="text-base text-neutral-500">Target</p>
                          <p className="text-base font-bold text-black">{exp.targetImprovement}%</p>
                        </div>
                        <div>
                          <p className="text-base text-neutral-500">Actual</p>
                          <p className="text-base font-bold text-black">{exp.actualResult}%</p>
                        </div>
                        <div>
                          <p className="text-base text-neutral-500">ICE Score</p>
                          <IceDisplay impact={exp.impact} confidence={exp.confidence} ease={exp.ease} />
                        </div>
                      </div>

                      {/* Learnings on this card */}
                      {exp.learnings.length > 0 && (
                        <div>
                          <p className="text-base font-bold text-black mb-2">Learnings</p>
                          <ul className="space-y-1">
                            {exp.learnings.map((l, i) => (
                              <li key={i} className="flex items-start gap-2 text-base text-neutral-600">
                                <span className="text-neutral-400 flex-shrink-0">&bull;</span>
                                <span className="flex-1">{l}</span>
                                <button
                                  onClick={() => handleRemoveLearning(exp.id, i)}
                                  className="text-base text-neutral-400 hover:text-black transition-colors flex-shrink-0 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                                  aria-label={`Remove learning: ${l}`}
                                >
                                  Remove
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Add learning */}
                      {exp.status === "Completed" && (
                        <div>
                          {learningExpId === exp.id ? (
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={learningInput}
                                onChange={(e) => setLearningInput(e.target.value)}
                                className="flex-1 border border-neutral-300 px-3 py-2 text-base bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                                placeholder="Key takeaway from this experiment"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") handleAddLearning(exp.id, learningInput);
                                }}
                              />
                              <button
                                onClick={() => handleAddLearning(exp.id, learningInput)}
                                className="bg-black text-white px-4 py-2 text-base font-bold hover:bg-neutral-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                              >
                                Add
                              </button>
                              <button
                                onClick={() => {
                                  setLearningExpId(null);
                                  setLearningInput("");
                                }}
                                className="border border-neutral-300 px-4 py-2 text-base font-bold hover:border-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setLearningExpId(exp.id);
                                setLearningInput("");
                              }}
                              className="text-base font-bold text-neutral-500 hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                            >
                              + Add Learning
                            </button>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-3 pt-2 border-t border-neutral-100">
                        <button
                          onClick={() => handleEdit(exp)}
                          className="text-base font-bold text-neutral-500 hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(exp.id)}
                          className="text-base font-bold text-neutral-400 hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </Animate>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/*  TIMELINE TAB                                                 */}
      {/* ============================================================ */}

      {activeTab === "timeline" && (
        <section aria-label="Experiment Timeline" className="px-6 lg:px-12 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                Experiment Timeline
              </h2>
              <p className="text-base text-neutral-500 mb-6">
                Gantt-style view of all experiments with start and end dates.
              </p>
              <div className="overflow-x-auto">
                <GanttChart experiments={experiments} />
              </div>
            </Animate>

            {/* Legend */}
            <div className="flex flex-wrap gap-6">
              {STATUSES.map((s) => {
                const fills: Record<Status, string> = {
                  Planning: "#cccccc",
                  Running: "#000000",
                  Completed: "#555555",
                  Cancelled: "#999999",
                };
                return (
                  <div key={s} className="flex items-center gap-2 text-base">
                    <span
                      className="w-4 h-4 inline-block flex-shrink-0"
                      style={{ backgroundColor: fills[s] }}
                    />
                    <span className="text-neutral-700">{s}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/*  LEARNINGS TAB                                                */}
      {/* ============================================================ */}

      {activeTab === "learnings" && (
        <section aria-label="Learnings Library" className="px-6 lg:px-12 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                Learnings Library
              </h2>
              <p className="text-base text-neutral-500 mb-6">
                Key takeaways from completed experiments. Add learnings from the Experiments tab.
              </p>
            </Animate>

            {allLearnings.length === 0 ? (
              <p className="text-base text-neutral-500 py-8 text-center">
                No learnings recorded yet. Complete experiments and add takeaways from the Experiments tab.
              </p>
            ) : (
              <div className="space-y-4">
                {allLearnings.map((item, i) => (
                  <Animate key={`${item.expId}-${i}`} animation="fade-up">
                    <div className="border border-neutral-200 p-5">
                      <p className="text-base text-neutral-600">{item.text}</p>
                      <p className="text-base text-neutral-400 mt-2">
                        From: {item.expName} &middot; {item.channel}
                      </p>
                    </div>
                  </Animate>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/*  EDUCATIONAL SECTION                                          */}
      {/* ============================================================ */}

      <section aria-label="Learn" className="px-6 lg:px-12 py-16 border-t border-neutral-200 mt-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Learn</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-3">
              Experiment-Driven Marketing
            </h2>
            <SectionDesc>
              Systematic testing is the fastest path to marketing ROI. Here is how to
              build an experiment culture.
            </SectionDesc>
          </Animate>

          <div className="mt-10 space-y-8">
            {educationalContent.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 80}>
                <div className="border-l-4 border-black pl-6">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-2">
                    {item.title}
                  </h3>
                  <p className="text-base text-neutral-600 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA SECTION                                                  */}
      {/* ============================================================ */}

      <section aria-label="Ready to Accelerate Your Experiments?" className="px-6 lg:px-12 py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight leading-tight">
              Ready to Accelerate Your Experiments?
            </h2>
            <p className="text-lg text-neutral-400 mt-4 max-w-2xl mx-auto">
              Our team designs and runs high-impact marketing experiments for growth-focused
              businesses. Let us build a testing roadmap that compounds results.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-8 bg-white text-black px-10 py-4 text-base font-bold hover:bg-neutral-200 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get in Touch
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Experiment Tracker"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Email Roi Calculator", href: "/resources/email-roi-calculator" },
          { title: "Email Sequence Planner", href: "/resources/email-sequence-planner" },
          { title: "Email Subject Ab Tester", href: "/resources/email-subject-ab-tester" },
          { title: "Email Subject Tester", href: "/resources/email-subject-tester" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
