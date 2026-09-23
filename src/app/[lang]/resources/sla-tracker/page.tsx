"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Category = "Delivery" | "Quality" | "Response Time" | "Reporting" | "Communication";
type SlaStatus = "Met" | "At Risk" | "Missed";
type SortField = "name" | "category" | "status";
type SortDir = "asc" | "desc";
type Trend = "improving" | "stable" | "declining";

interface Sla {
  id: string;
  name: string;
  category: Category;
  targetMetric: string;
  actualMetric: string;
  status: SlaStatus;
}

interface MonthlyRecord {
  id: string;
  month: string;
  complianceRate: number;
  trend: Trend;
}

interface TrackerData {
  slas: Sla[];
  monthlyRecords: MonthlyRecord[];
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const CATEGORIES: Category[] = ["Delivery", "Quality", "Response Time", "Reporting", "Communication"];
const STATUSES: SlaStatus[] = ["Met", "At Risk", "Missed"];
const TRENDS: Trend[] = ["improving", "stable", "declining"];
const MAX_SLAS = 15;
const STORAGE_KEY = "markit-sla-tracker";

const STATUS_STYLES: Record<SlaStatus, string> = {
  Met: "bg-neutral-100 text-black border border-neutral-300",
  "At Risk": "bg-neutral-200 text-black border border-neutral-400",
  Missed: "bg-black text-white",
};

const TREND_LABELS: Record<Trend, string> = {
  improving: "↑ Improving",
  stable: "→ Stable",
  declining: "↓ Declining",
};

const DEFAULT_SLAS: Sla[] = [
  { id: "t1", name: "Monthly Performance Report Delivery", category: "Reporting", targetMetric: "By 5th of each month", actualMetric: "", status: "Met" },
  { id: "t2", name: "Email Response Time", category: "Response Time", targetMetric: "Within 4 business hours", actualMetric: "", status: "Met" },
  { id: "t3", name: "Campaign Launch Turnaround", category: "Delivery", targetMetric: "5 business days from approval", actualMetric: "", status: "Met" },
  { id: "t4", name: "Weekly Status Meeting", category: "Communication", targetMetric: "Every Monday at 10 AM", actualMetric: "", status: "Met" },
  { id: "t5", name: "Creative Asset Quality Score", category: "Quality", targetMetric: "90% client approval rate", actualMetric: "", status: "Met" },
  { id: "t6", name: "Ad Copy Review Turnaround", category: "Response Time", targetMetric: "Within 2 business days", actualMetric: "", status: "Met" },
  { id: "t7", name: "Quarterly Strategy Presentation", category: "Reporting", targetMetric: "Within first 2 weeks of quarter", actualMetric: "", status: "Met" },
  { id: "t8", name: "Emergency Issue Escalation", category: "Communication", targetMetric: "Acknowledged within 1 hour", actualMetric: "", status: "Met" },
];

const EMPTY_SLA: Omit<Sla, "id"> = {
  name: "",
  category: "Delivery",
  targetMetric: "",
  actualMetric: "",
  status: "Met",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function loadData(): TrackerData {
  if (typeof window === "undefined") return { slas: DEFAULT_SLAS, monthlyRecords: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as TrackerData;
      if (parsed.slas && parsed.monthlyRecords) return parsed;
    }
  } catch {
    /* corrupted data — fall through */
  }
  return { slas: DEFAULT_SLAS, monthlyRecords: [] };
}

function saveData(data: TrackerData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* storage full — silent fail */
  }
}

/* ------------------------------------------------------------------ */
/*  Shared UI                                                          */
/* ------------------------------------------------------------------ */

const inputClass =
  "w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-base text-black placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 transition-colors";

const selectClass =
  "w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 transition-colors appearance-none";

const btnPrimary =
  "inline-flex items-center justify-center rounded-lg bg-black text-white px-6 py-3 text-base font-bold hover:bg-neutral-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";

const btnSecondary =
  "inline-flex items-center justify-center rounded-lg border-2 border-black text-black px-6 py-3 text-base font-bold hover:bg-neutral-100 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";

const btnDanger =
  "inline-flex items-center justify-center rounded-lg border border-neutral-400 text-neutral-600 px-4 py-2 text-base hover:bg-neutral-100 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */



export default function SlaTrackerPage() {
  /* State */
  const [slas, setSlas] = useState<Sla[]>([]);
  const [monthlyRecords, setMonthlyRecords] = useState<MonthlyRecord[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [form, setForm] = useState<Omit<Sla, "id">>(EMPTY_SLA);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("status");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [filterCategory, setFilterCategory] = useState<Category | "All">("All");
  const [monthForm, setMonthForm] = useState({ month: "", complianceRate: "", trend: "stable" as Trend });
  const [showForm, setShowForm] = useState(false);
  const [showMonthForm, setShowMonthForm] = useState(false);

  /* Load from localStorage on mount */
  useEffect(() => {
    const data = loadData();
    setSlas(data.slas);
    setMonthlyRecords(data.monthlyRecords);
    setLoaded(true);
  }, []);

  /* Persist whenever data changes */
  useEffect(() => {
    if (!loaded) return;
    saveData({ slas, monthlyRecords });
  }, [slas, monthlyRecords, loaded]);

  /* Dashboard metrics */
  const totalSlas = slas.length;
  const metCount = slas.filter((s) => s.status === "Met").length;
  const missedCount = slas.filter((s) => s.status === "Missed").length;
  const atRiskCount = slas.filter((s) => s.status === "At Risk").length;
  const complianceRate = totalSlas > 0 ? Math.round((metCount / totalSlas) * 100) : 0;

  /* Filtered & sorted list */
  const filtered = useMemo(() => {
    let list = filterCategory === "All" ? slas : slas.filter((s) => s.category === filterCategory);

    const statusOrder: Record<SlaStatus, number> = { Missed: 0, "At Risk": 1, Met: 2 };

    list = [...list].sort((a, b) => {
      let cmp = 0;
      if (sortField === "name") cmp = a.name.localeCompare(b.name);
      else if (sortField === "category") cmp = a.category.localeCompare(b.category);
      else if (sortField === "status") cmp = statusOrder[a.status] - statusOrder[b.status];
      return sortDir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [slas, filterCategory, sortField, sortDir]);

  /* Handlers */
  const toggleSort = useCallback(
    (field: SortField) => {
      if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      else {
        setSortField(field);
        setSortDir("asc");
      }
    },
    [sortField],
  );

  const handleAddOrUpdate = useCallback(() => {
    if (!form.name.trim() || !form.targetMetric.trim()) return;
    if (editingId) {
      setSlas((prev) => prev.map((s) => (s.id === editingId ? { ...s, ...form } : s)));
      setEditingId(null);
    } else {
      if (slas.length >= MAX_SLAS) return;
      setSlas((prev) => [...prev, { id: generateId(), ...form }]);
    }
    setForm(EMPTY_SLA);
    setShowForm(false);
  }, [form, editingId, slas.length]);

  const handleEdit = useCallback((sla: Sla) => {
    setForm({ name: sla.name, category: sla.category, targetMetric: sla.targetMetric, actualMetric: sla.actualMetric, status: sla.status });
    setEditingId(sla.id);
    setShowForm(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setSlas((prev) => prev.filter((s) => s.id !== id));
    setEditingId(null);
    setForm(EMPTY_SLA);
  }, []);

  const handleAddMonth = useCallback(() => {
    if (!monthForm.month) return;
    const rate = Number(monthForm.complianceRate);
    if (isNaN(rate) || rate < 0 || rate > 100) return;
    setMonthlyRecords((prev) => [...prev, { id: generateId(), month: monthForm.month, complianceRate: rate, trend: monthForm.trend }]);
    setMonthForm({ month: "", complianceRate: "", trend: "stable" });
    setShowMonthForm(false);
  }, [monthForm]);

  const handleDeleteMonth = useCallback((id: string) => {
    setMonthlyRecords((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const handleReset = useCallback(() => {
    setSlas(DEFAULT_SLAS);
    setMonthlyRecords([]);
    setEditingId(null);
    setForm(EMPTY_SLA);
  }, []);

  const handleExport = useCallback(() => {
    const lines: string[] = [];
    lines.push("MARKETING SLA TRACKER");
    lines.push("=====================");
    lines.push(`Generated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`);
    lines.push("");
    lines.push("DASHBOARD");
    lines.push("---------");
    lines.push(`Total SLAs: ${totalSlas}`);
    lines.push(`Met: ${metCount}`);
    lines.push(`At Risk: ${atRiskCount}`);
    lines.push(`Missed: ${missedCount}`);
    lines.push(`Compliance Rate: ${complianceRate}%`);
    lines.push("");
    lines.push("SLA DETAILS");
    lines.push("-----------");
    slas.forEach((s, i) => {
      lines.push(`${i + 1}. ${s.name}`);
      lines.push(`   Category: ${s.category}`);
      lines.push(`   Target: ${s.targetMetric}`);
      lines.push(`   Actual: ${s.actualMetric || "N/A"}`);
      lines.push(`   Status: ${s.status}`);
      lines.push("");
    });
    if (monthlyRecords.length > 0) {
      lines.push("MONTHLY TRACKING");
      lines.push("----------------");
      monthlyRecords.forEach((r) => {
        lines.push(`${r.month}: ${r.complianceRate}% compliance (${r.trend})`);
      });
      lines.push("");
    }
    lines.push("---");
    lines.push("Generated with Markit Media SLA Tracker");
    lines.push("https://themarkitmedia.com/en/resources/sla-tracker");

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sla-tracker.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [slas, monthlyRecords, totalSlas, metCount, atRiskCount, missedCount, complianceRate]);

  /* Sort indicator */
  const sortArrow = (field: SortField) => (sortField === field ? (sortDir === "asc" ? " ▲" : " ▼") : "");

  /* ---------------------------------------------------------------- */
  /*  JSON-LD                                                          */
  /* ---------------------------------------------------------------- */

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Marketing SLA Tracker",
    url: "https://themarkitmedia.com/en/resources/sla-tracker",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Track and manage marketing service level agreements. Monitor compliance rates, identify at-risk deliverables, and maintain accountability across agency-client relationships.",
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <article className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing SLA Tracker",
          description: "Track and manage marketing service level agreements. Monitor compliance rates, identify at-risk deliverables, and maintain accountability across agency-client relationships.",
          url: "https://themarkitmedia.com/en/resources/sla-tracker",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Marketing SLA Tracker | Free Marketing Tool — Markit Media</title>
      <link rel="canonical" href="https://themarkitmedia.com/en/resources/sla-tracker" />
      <meta name="description" content="Track and manage marketing service level agreements. Monitor compliance rates, identify at-risk deliverables, and maintain accountability across agency-clien..." />
      <JsonLd data={jsonLd} />

      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "Resources", href: "/resources" }, { label: "SLA Tracker" }]} />

      {/* Hero */}
      <section aria-label="Interactive Tools" className="px-6 lg:px-12 pt-28 pb-12">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Interactive Tools</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing SLA Tracker
            </h1>
            <p className="text-lg text-neutral-500 leading-relaxed mt-4 max-w-2xl">
              Track service level agreements between your team and agency partners. Monitor compliance rates, flag at-risk deliverables, and keep everyone accountable with clear performance data.
            </p>
          </Animate>
        </div>
      </section>

      {/* Dashboard */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up" delay={100}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-xl border border-neutral-200 p-6 text-center">
                <p className="text-base font-bold text-neutral-400 uppercase tracking-wider">Total SLAs</p>
                <p className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-black mt-2">{totalSlas}</p>
              </div>
              <div className="rounded-xl border border-neutral-200 p-6 text-center">
                <p className="text-base font-bold text-neutral-400 uppercase tracking-wider">Met</p>
                <p className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-black mt-2">{metCount}</p>
              </div>
              <div className="rounded-xl border border-neutral-200 p-6 text-center">
                <p className="text-base font-bold text-neutral-400 uppercase tracking-wider">Missed</p>
                <p className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-black mt-2">{missedCount}</p>
              </div>
              <div className="rounded-xl border border-neutral-200 p-6 text-center">
                <p className="text-base font-bold text-neutral-400 uppercase tracking-wider">Compliance</p>
                <p className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-black mt-2">{complianceRate}%</p>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* Controls */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-8">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up" delay={150}>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(EMPTY_SLA); }}
                className={btnPrimary}
                disabled={slas.length >= MAX_SLAS && !editingId}
              >
                {showForm ? "Cancel" : "Add SLA"}
              </button>
              <button type="button" onClick={handleExport} className={btnSecondary}>
                Export .txt
              </button>
              <button type="button" onClick={handleReset} className={btnDanger}>
                Reset to Template
              </button>

              {/* Category filter */}
              <div className="ml-auto flex items-center gap-2">
                <label htmlFor="filter-category" className="text-base font-bold text-black">
                  Filter:
                </label>
                <select
                  id="filter-category"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as Category | "All")}
                  className={selectClass + " w-auto"}
                >
                  <option value="All">All Categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {slas.length >= MAX_SLAS && !editingId && (
              <p className="text-base text-neutral-500 mt-2">Maximum of {MAX_SLAS} SLAs reached. Remove one to add another.</p>
            )}
          </Animate>
        </div>
      </section>

      {/* Add / Edit Form */}
      {showForm && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-8">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                {editingId ? "Edit SLA" : "Add New SLA"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sla-name" className="block text-base font-bold text-black mb-1">SLA Name</label>
                  <input
                    id="sla-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="e.g., Monthly Report Delivery"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="sla-category" className="block text-base font-bold text-black mb-1">Category</label>
                  <select
                    id="sla-category"
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Category }))}
                    className={selectClass}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="sla-target" className="block text-base font-bold text-black mb-1">Target Metric</label>
                  <input
                    id="sla-target"
                    type="text"
                    value={form.targetMetric}
                    onChange={(e) => setForm((f) => ({ ...f, targetMetric: e.target.value }))}
                    placeholder="e.g., 5 business days"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="sla-actual" className="block text-base font-bold text-black mb-1">Actual Metric</label>
                  <input
                    id="sla-actual"
                    type="text"
                    value={form.actualMetric}
                    onChange={(e) => setForm((f) => ({ ...f, actualMetric: e.target.value }))}
                    placeholder="e.g., 3 business days"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="sla-status" className="block text-base font-bold text-black mb-1">Status</label>
                  <select
                    id="sla-status"
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as SlaStatus }))}
                    className={selectClass}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={handleAddOrUpdate} className={btnPrimary}>
                  {editingId ? "Save Changes" : "Add SLA"}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditingId(null); setForm(EMPTY_SLA); }}
                  className={btnSecondary}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SLA Table */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up" delay={200}>
            {filtered.length === 0 ? (
              <div className="text-center py-16 border border-neutral-200 rounded-xl">
                <p className="text-lg text-neutral-500">No SLAs found. Add one above to get started.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-neutral-200">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50">
                      <th className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => toggleSort("name")}
                          className="text-base font-bold text-black hover:text-neutral-600 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        >
                          SLA Name{sortArrow("name")}
                        </button>
                      </th>
                      <th className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => toggleSort("category")}
                          className="text-base font-bold text-black hover:text-neutral-600 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        >
                          Category{sortArrow("category")}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-base font-bold text-black">Target</th>
                      <th className="px-4 py-3 text-base font-bold text-black">Actual</th>
                      <th className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => toggleSort("status")}
                          className="text-base font-bold text-black hover:text-neutral-600 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        >
                          Status{sortArrow("status")}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-base font-bold text-black">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((sla) => (
                      <tr key={sla.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                        <td className="px-4 py-3 text-base text-black font-medium">{sla.name}</td>
                        <td className="px-4 py-3 text-base text-neutral-600">{sla.category}</td>
                        <td className="px-4 py-3 text-base text-neutral-600">{sla.targetMetric}</td>
                        <td className="px-4 py-3 text-base text-neutral-600">{sla.actualMetric || "—"}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block rounded-full px-3 py-1 text-base font-bold ${STATUS_STYLES[sla.status]}`}>
                            {sla.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleEdit(sla)}
                              className="text-base text-black underline hover:text-neutral-600 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(sla.id)}
                              className="text-base text-neutral-500 underline hover:text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Animate>
        </div>
      </section>

      {/* Monthly Tracking */}
      <section aria-label="Monthly Compliance Tracking" className="px-6 lg:px-12 pb-12">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up" delay={250}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                Monthly Compliance Tracking
              </h2>
              <button
                type="button"
                onClick={() => setShowMonthForm(!showMonthForm)}
                className={btnSecondary}
              >
                {showMonthForm ? "Cancel" : "Add Month"}
              </button>
            </div>

            {showMonthForm && (
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="month-name" className="block text-base font-bold text-black mb-1">Month</label>
                    <input
                      id="month-name"
                      type="text"
                      value={monthForm.month}
                      onChange={(e) => setMonthForm((f) => ({ ...f, month: e.target.value }))}
                      placeholder="e.g., January 2026"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="month-rate" className="block text-base font-bold text-black mb-1">Compliance Rate (%)</label>
                    <input
                      id="month-rate"
                      type="number"
                      min={0}
                      max={100}
                      value={monthForm.complianceRate}
                      onChange={(e) => setMonthForm((f) => ({ ...f, complianceRate: e.target.value }))}
                      placeholder="e.g., 87"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="month-trend" className="block text-base font-bold text-black mb-1">Trend</label>
                    <select
                      id="month-trend"
                      value={monthForm.trend}
                      onChange={(e) => setMonthForm((f) => ({ ...f, trend: e.target.value as Trend }))}
                      className={selectClass}
                    >
                      {TRENDS.map((t) => (
                        <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button type="button" onClick={handleAddMonth} className={btnPrimary + " mt-4"}>
                  Add Record
                </button>
              </div>
            )}

            {monthlyRecords.length === 0 ? (
              <div className="text-center py-12 border border-neutral-200 rounded-xl">
                <p className="text-lg text-neutral-500">No monthly records yet. Add compliance data to track trends over time.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-neutral-200">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50">
                      <th className="px-4 py-3 text-base font-bold text-black">Month</th>
                      <th className="px-4 py-3 text-base font-bold text-black">Compliance Rate</th>
                      <th className="px-4 py-3 text-base font-bold text-black">Trend</th>
                      <th className="px-4 py-3 text-base font-bold text-black">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyRecords.map((rec) => (
                      <tr key={rec.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                        <td className="px-4 py-3 text-base text-black font-medium">{rec.month}</td>
                        <td className="px-4 py-3 text-base text-black">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 max-w-[200px] bg-neutral-200 rounded-full h-3">
                              <div
                                className="bg-black rounded-full h-3 transition-all"
                                style={{ width: `${Math.min(rec.complianceRate, 100)}%` }}
                              />
                            </div>
                            <span className="font-bold">{rec.complianceRate}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-base text-neutral-600">{TREND_LABELS[rec.trend]}</td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => handleDeleteMonth(rec.id)}
                            className="text-base text-neutral-500 underline hover:text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Animate>
        </div>
      </section>

      {/* Educational Section */}
      <section aria-label="Understanding SLAs" className="px-6 lg:px-12 py-16 bg-neutral-50">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Understanding SLAs</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-3 mb-8">
              Service Level Agreements for Marketing Teams
            </h2>
          </Animate>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Animate animation="fade-up" delay={100}>
              <div className="bg-white rounded-xl border border-neutral-200 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                  What Are Marketing SLAs?
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  A Service Level Agreement defines the measurable standards your agency or marketing team commits to delivering. SLAs cover turnaround times, quality benchmarks, reporting cadences, and communication expectations. They create mutual accountability between clients and service providers, removing ambiguity about what &ldquo;good performance&rdquo; looks like.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={150}>
              <div className="bg-white rounded-xl border border-neutral-200 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                  Setting Realistic Targets
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Effective SLA targets are specific, measurable, and achievable. Start with industry benchmarks, then refine based on your team&rsquo;s capacity and historical performance. A target of 95% compliance is strong for most marketing operations. Set targets collaboratively so both parties agree on what is fair and sustainable before work begins.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={200}>
              <div className="bg-white rounded-xl border border-neutral-200 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                  Tracking Compliance
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Review SLA compliance monthly at minimum. Track each agreement individually and calculate an overall compliance rate. Look for patterns in misses: are certain categories consistently falling short? Use monthly trend data to identify whether performance is improving, stable, or declining, and course-correct before small issues become big problems.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={250}>
              <div className="bg-white rounded-xl border border-neutral-200 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                  Escalation Procedures
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Define what happens when an SLA is missed. A strong escalation framework includes three tiers: first, a documented notification to the account lead; second, a root-cause review with corrective action within 48 hours; third, executive involvement if the same SLA is missed three consecutive periods. Clear escalation paths prevent frustration and keep the relationship productive.
                </p>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section aria-label="Get Expert Help" className="px-6 lg:px-12 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <Animate animation="fade-up">
            <SectionLabel>Get Expert Help</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-3 mb-4">
              Need Help Structuring Your Agency SLAs?
            </h2>
            <p className="text-lg text-neutral-500 leading-relaxed mb-8">
              Our team helps businesses establish clear, measurable SLAs with their marketing partners. Get accountability frameworks that protect your investment and drive consistent results.
            </p>
            <Link
              href="/contact"
              className={btnPrimary}
            >
              Contact Us
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Sla Tracker"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Small Business Guide", href: "/resources/small-business-guide" },
          { title: "Seo Audit Score", href: "/resources/seo-audit-score" },
          { title: "Seo Checklist", href: "/resources/seo-checklist" },
          { title: "Seo Content Optimizer", href: "/resources/seo-content-optimizer" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
