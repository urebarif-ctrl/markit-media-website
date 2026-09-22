"use client";

import { useState, useMemo } from "react";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

const CHANNELS = [
  "Email",
  "Social Media",
  "Paid Ads",
  "SEO",
  "Content",
  "PR",
  "Events",
  "Video",
  "Influencer",
  "Direct Mail",
] as const;

const STATUS_OPTIONS = ["Not Started", "In Progress", "Completed", "Delayed"] as const;
const STATUS_COLORS: Record<string, string> = {
  "Not Started": "bg-neutral-200 text-black",
  "In Progress": "bg-neutral-700 text-white",
  Completed: "bg-black text-white",
  Delayed: "bg-red-100 text-red-800",
};

interface Milestone {
  id: string;
  name: string;
  channel: string;
  startDate: string;
  endDate: string;
  status: string;
  owner: string;
  notes: string;
}

let nextId = 1;

function daysBetween(a: string, b: string): number {
  const da = new Date(a);
  const db = new Date(b);
  return Math.ceil((db.getTime() - da.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(d: string): string {
  if (!d) return "";
  const date = new Date(d);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function MarketingTimelinePlannerPage() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [form, setForm] = useState({
    name: "",
    channel: "Email",
    startDate: "",
    endDate: "",
    status: "Not Started",
    owner: "",
    notes: "",
  });
  const [view, setView] = useState<"list" | "timeline">("list");
  const [filterChannel, setFilterChannel] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  function addMilestone() {
    if (!form.name || !form.startDate) return;
    setMilestones((prev) => [
      ...prev,
      {
        id: String(nextId++),
        name: form.name,
        channel: form.channel,
        startDate: form.startDate,
        endDate: form.endDate || form.startDate,
        status: form.status,
        owner: form.owner,
        notes: form.notes,
      },
    ]);
    setForm((f) => ({ ...f, name: "", notes: "", owner: "" }));
  }

  function removeMilestone(id: string) {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
  }

  function updateStatus(id: string, status: string) {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
  }

  const filtered = useMemo(() => {
    return milestones
      .filter((m) => {
        if (filterChannel !== "All" && m.channel !== filterChannel) return false;
        if (filterStatus !== "All" && m.status !== filterStatus) return false;
        return true;
      })
      .sort((a, b) => a.startDate.localeCompare(b.startDate));
  }, [milestones, filterChannel, filterStatus]);

  const timelineRange = useMemo(() => {
    if (filtered.length === 0) return { start: "", end: "", totalDays: 0 };
    const starts = filtered.map((m) => m.startDate).sort();
    const ends = filtered.map((m) => m.endDate || m.startDate).sort();
    const start = starts[0];
    const end = ends[ends.length - 1];
    return { start, end, totalDays: Math.max(daysBetween(start, end), 1) };
  }, [filtered]);

  function handleExport() {
    const header = "Name,Channel,Start,End,Status,Owner,Notes";
    const rows = milestones.map(
      (m) =>
        `"${m.name}","${m.channel}","${m.startDate}","${m.endDate}","${m.status}","${m.owner}","${m.notes}"`
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "marketing-timeline.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const stats = useMemo(() => {
    const total = milestones.length;
    const completed = milestones.filter(
      (m) => m.status === "Completed"
    ).length;
    const delayed = milestones.filter((m) => m.status === "Delayed").length;
    const inProgress = milestones.filter(
      (m) => m.status === "In Progress"
    ).length;
    return { total, completed, delayed, inProgress };
  }, [milestones]);

  return (
    <main className="min-h-screen bg-white text-black">
      <nav className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><a href="/" className="hover:text-black transition-colors">Home</a></li>
          <li aria-hidden="true">/</li>
          <li><a href="/resources" className="hover:text-black transition-colors">Resources</a></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">Marketing Timeline Planner</li>
        </ol>
      </nav>
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
          Marketing Timeline Planner
        </h1>
        <p className="text-lg text-neutral-600 mb-10">
          Plan campaigns with milestones, channels, owners, and a visual
          timeline view.
        </p>

        {/* Stats */}
        {milestones.length > 0 && (
          <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total", value: stats.total },
              { label: "In Progress", value: stats.inProgress },
              { label: "Completed", value: stats.completed },
              { label: "Delayed", value: stats.delayed },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-neutral-200 p-4 text-center"
              >
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-base text-neutral-500">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Add form */}
        <div className="mb-8 rounded-lg border border-neutral-200 p-5">
          <h2 className="text-lg font-bold mb-4">Add Milestone</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-base font-semibold mb-1">
                Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
                placeholder="e.g. Launch Email Campaign"
              />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">
                Channel
              </label>
              <select
                value={form.channel}
                onChange={(e) =>
                  setForm((f) => ({ ...f, channel: e.target.value }))
                }
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              >
                {CHANNELS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">
                Owner
              </label>
              <input
                type="text"
                value={form.owner}
                onChange={(e) =>
                  setForm((f) => ({ ...f, owner: e.target.value }))
                }
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
                placeholder="Who's responsible"
              />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, startDate: e.target.value }))
                }
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">
                End Date
              </label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, endDate: e.target.value }))
                }
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((f) => ({ ...f, status: e.target.value }))
                }
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-base font-semibold mb-1">
              Notes
            </label>
            <input
              type="text"
              value={form.notes}
              onChange={(e) =>
                setForm((f) => ({ ...f, notes: e.target.value }))
              }
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              placeholder="Optional notes"
            />
          </div>
          <button
            onClick={addMilestone}
            className="mt-4 rounded-md bg-black px-6 py-2 text-base font-semibold text-white hover:bg-neutral-800 transition-colors"
          >
            Add Milestone
          </button>
        </div>

        {/* Filters & view toggle */}
        {milestones.length > 0 && (
          <>
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <select
                value={filterChannel}
                onChange={(e) => setFilterChannel(e.target.value)}
                className="rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              >
                <option value="All">All Channels</option>
                {CHANNELS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              >
                <option value="All">All Statuses</option>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <div className="ml-auto flex gap-2">
                {(["list", "timeline"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`rounded-md border px-4 py-2 text-base font-medium transition-colors ${
                      view === v
                        ? "border-black bg-black text-white"
                        : "border-neutral-300 hover:border-black"
                    }`}
                  >
                    {v === "list" ? "List" : "Timeline"}
                  </button>
                ))}
              </div>
            </div>

            {view === "list" && (
              <div className="mb-8 space-y-3">
                {filtered.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-lg border border-neutral-200 p-4 flex flex-col sm:flex-row sm:items-center gap-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold">{m.name}</h3>
                        <span
                          className={`rounded-full px-3 py-0.5 text-base font-medium ${STATUS_COLORS[m.status] || ""}`}
                        >
                          {m.status}
                        </span>
                      </div>
                      <p className="text-base text-neutral-500">
                        {m.channel}
                        {m.owner && ` · ${m.owner}`} ·{" "}
                        {formatDate(m.startDate)}
                        {m.endDate !== m.startDate &&
                          ` — ${formatDate(m.endDate)}`}
                        {m.endDate &&
                          m.startDate &&
                          ` (${daysBetween(m.startDate, m.endDate)} days)`}
                      </p>
                      {m.notes && (
                        <p className="text-base text-neutral-400 mt-1">
                          {m.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={m.status}
                        onChange={(e) => updateStatus(m.id, e.target.value)}
                        className="rounded-md border border-neutral-300 px-2 py-1 text-base focus-visible:border-black focus-visible:outline-none"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeMilestone(m.id)}
                        className="text-neutral-400 hover:text-black text-base"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {view === "timeline" && timelineRange.totalDays > 0 && (
              <div className="mb-8 overflow-x-auto">
                <div className="min-w-[600px]">
                  <div className="flex justify-between text-base text-neutral-500 mb-2">
                    <span>{formatDate(timelineRange.start)}</span>
                    <span>{formatDate(timelineRange.end)}</span>
                  </div>
                  <div className="space-y-2">
                    {filtered.map((m) => {
                      const startOffset =
                        (daysBetween(timelineRange.start, m.startDate) /
                          timelineRange.totalDays) *
                        100;
                      const duration =
                        (Math.max(
                          daysBetween(m.startDate, m.endDate || m.startDate),
                          1
                        ) /
                          timelineRange.totalDays) *
                        100;
                      return (
                        <div
                          key={m.id}
                          className="relative h-10 rounded bg-neutral-50"
                        >
                          <div
                            className={`absolute top-1 h-8 rounded px-2 flex items-center text-base font-medium overflow-hidden whitespace-nowrap ${
                              m.status === "Completed"
                                ? "bg-black text-white"
                                : m.status === "In Progress"
                                  ? "bg-neutral-700 text-white"
                                  : m.status === "Delayed"
                                    ? "bg-red-200 text-red-800"
                                    : "bg-neutral-300 text-black"
                            }`}
                            style={{
                              left: `${Math.max(startOffset, 0)}%`,
                              width: `${Math.max(duration, 2)}%`,
                              maxWidth: `${100 - Math.max(startOffset, 0)}%`,
                            }}
                            title={`${m.name} (${m.channel}) — ${formatDate(m.startDate)} to ${formatDate(m.endDate)}`}
                          >
                            {m.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleExport}
              className="rounded-md bg-black px-6 py-2 text-base font-semibold text-white hover:bg-neutral-800 transition-colors"
            >
              Export CSV
            </button>
          </>
        )}

        {milestones.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-neutral-200 p-12 text-center">
            <p className="text-lg text-neutral-500">
              No milestones yet. Add your first campaign milestone above to
              start building your timeline.
            </p>
          </div>
        )}
      </div>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Timeline Planner",
          description: "Plan marketing campaigns with a visual timeline. Add milestones, set dependencies, assign channels, and export your campaign schedule.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Marketing Timeline Planner"
        services={[
          { title: "Digital Marketing", desc: "Data-driven strategy with transparent reporting and insights.", href: "/services/digital-marketing" },
          { title: "Performance Marketing", desc: "Campaign optimization based on real performance data.", href: "/services/performance-marketing" },
          { title: "SEO", desc: "SEO analytics that show exactly what drives organic growth.", href: "/services/seo" },
        ]}
        relatedTools={[
          { title: "Ad Copy Analyzer", href: "/resources/ad-copy-analyzer" },
          { title: "Campaign Debrief", href: "/resources/campaign-debrief" },
          { title: "Competitor Pricing Tracker", href: "/resources/competitor-pricing-tracker" },
          { title: "Content Brief Generator", href: "/resources/content-brief-generator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </main>
  );
}
