"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ContentFormat = "Blog" | "Video" | "Podcast" | "Infographic" | "Guide";

type ClusterContentType =
  | "Pillar Page"
  | "Cluster Article"
  | "FAQ"
  | "How-To"
  | "Listicle"
  | "Comparison"
  | "Case Study";

type Priority = "high" | "medium" | "low";

type Status = "planned" | "in-progress" | "published" | "needs-update";

interface ClusterTopic {
  id: string;
  topicName: string;
  targetKeyword: string;
  contentType: ClusterContentType;
  priority: Priority;
  status: Status;
}

interface Pillar {
  id: string;
  name: string;
  primaryKeyword: string;
  targetAudience: string;
  contentFormat: ContentFormat;
  clusterTopics: ClusterTopic[];
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const CONTENT_FORMATS: ContentFormat[] = [
  "Blog",
  "Video",
  "Podcast",
  "Infographic",
  "Guide",
];

const CLUSTER_CONTENT_TYPES: ClusterContentType[] = [
  "Pillar Page",
  "Cluster Article",
  "FAQ",
  "How-To",
  "Listicle",
  "Comparison",
  "Case Study",
];

const PRIORITIES: { id: Priority; label: string }[] = [
  { id: "high", label: "High" },
  { id: "medium", label: "Medium" },
  { id: "low", label: "Low" },
];

const STATUSES: { id: Status; label: string }[] = [
  { id: "planned", label: "Planned" },
  { id: "in-progress", label: "In Progress" },
  { id: "published", label: "Published" },
  { id: "needs-update", label: "Needs Update" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

let counter = 0;
function uid(): string {
  counter += 1;
  return `id-${Date.now()}-${counter}`;
}

function statusLabel(s: Status): string {
  return STATUSES.find((x) => x.id === s)?.label ?? s;
}

function priorityLabel(p: Priority): string {
  return PRIORITIES.find((x) => x.id === p)?.label ?? p;
}

const priorityOrder: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

const statusStyle: Record<Status, string> = {
  planned: "bg-neutral-100 text-neutral-700",
  "in-progress": "bg-neutral-200 text-black",
  published: "bg-black text-white",
  "needs-update": "border border-neutral-400 text-neutral-600 bg-white",
};

const priorityStyle: Record<Priority, string> = {
  high: "bg-black text-white",
  medium: "bg-neutral-200 text-black",
  low: "bg-neutral-100 text-neutral-500",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ContentPillarPlannerPage() {
  /* --- Pillar state --- */
  const [pillars, setPillars] = useState<Pillar[]>([]);

  /* --- New pillar form --- */
  const [newName, setNewName] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [newAudience, setNewAudience] = useState("");
  const [newFormat, setNewFormat] = useState<ContentFormat>("Blog");

  /* --- New cluster topic form (keyed per pillar) --- */
  const [addingToPillar, setAddingToPillar] = useState<string | null>(null);
  const [ctName, setCtName] = useState("");
  const [ctKeyword, setCtKeyword] = useState("");
  const [ctType, setCtType] = useState<ClusterContentType>("Cluster Article");
  const [ctPriority, setCtPriority] = useState<Priority>("medium");
  const [ctStatus, setCtStatus] = useState<Status>("planned");

  /* --- Editing cluster topic state --- */
  const [editingTopicId, setEditingTopicId] = useState<string | null>(null);
  const [editCtName, setEditCtName] = useState("");
  const [editCtKeyword, setEditCtKeyword] = useState("");
  const [editCtType, setEditCtType] = useState<ClusterContentType>("Cluster Article");
  const [editCtPriority, setEditCtPriority] = useState<Priority>("medium");
  const [editCtStatus, setEditCtStatus] = useState<Status>("planned");

  /* --- Filters --- */
  const [filterStatus, setFilterStatus] = useState<Status | "all">("all");
  const [filterPriority, setFilterPriority] = useState<Priority | "all">("all");
  const [filterPillar, setFilterPillar] = useState<string | "all">("all");

  /* --- Active pillar view --- */
  const [activePillarId, setActivePillarId] = useState<string | null>(null);

  /* --- Export feedback --- */
  const [exported, setExported] = useState(false);

  /* ---------------------------------------------------------------- */
  /*  Pillar CRUD                                                      */
  /* ---------------------------------------------------------------- */

  const addPillar = useCallback(() => {
    if (!newName.trim() || !newKeyword.trim()) return;
    const pillar: Pillar = {
      id: uid(),
      name: newName.trim(),
      primaryKeyword: newKeyword.trim(),
      targetAudience: newAudience.trim(),
      contentFormat: newFormat,
      clusterTopics: [],
    };
    setPillars((prev) => [...prev, pillar]);
    setNewName("");
    setNewKeyword("");
    setNewAudience("");
    setNewFormat("Blog");
    setActivePillarId(pillar.id);
  }, [newName, newKeyword, newAudience, newFormat]);

  const removePillar = useCallback(
    (id: string) => {
      setPillars((prev) => prev.filter((p) => p.id !== id));
      if (activePillarId === id) setActivePillarId(null);
    },
    [activePillarId],
  );

  /* ---------------------------------------------------------------- */
  /*  Cluster Topic CRUD                                               */
  /* ---------------------------------------------------------------- */

  const addClusterTopic = useCallback(
    (pillarId: string) => {
      if (!ctName.trim()) return;
      const topic: ClusterTopic = {
        id: uid(),
        topicName: ctName.trim(),
        targetKeyword: ctKeyword.trim(),
        contentType: ctType,
        priority: ctPriority,
        status: ctStatus,
      };
      setPillars((prev) =>
        prev.map((p) =>
          p.id === pillarId
            ? { ...p, clusterTopics: [...p.clusterTopics, topic] }
            : p,
        ),
      );
      setCtName("");
      setCtKeyword("");
      setCtType("Cluster Article");
      setCtPriority("medium");
      setCtStatus("planned");
      setAddingToPillar(null);
    },
    [ctName, ctKeyword, ctType, ctPriority, ctStatus],
  );

  const removeClusterTopic = useCallback(
    (pillarId: string, topicId: string) => {
      setPillars((prev) =>
        prev.map((p) =>
          p.id === pillarId
            ? {
                ...p,
                clusterTopics: p.clusterTopics.filter((t) => t.id !== topicId),
              }
            : p,
        ),
      );
    },
    [],
  );

  const startEditTopic = useCallback(
    (topic: ClusterTopic) => {
      setEditingTopicId(topic.id);
      setEditCtName(topic.topicName);
      setEditCtKeyword(topic.targetKeyword);
      setEditCtType(topic.contentType);
      setEditCtPriority(topic.priority);
      setEditCtStatus(topic.status);
    },
    [],
  );

  const saveEditTopic = useCallback(
    (pillarId: string, topicId: string) => {
      if (!editCtName.trim()) return;
      setPillars((prev) =>
        prev.map((p) =>
          p.id === pillarId
            ? {
                ...p,
                clusterTopics: p.clusterTopics.map((t) =>
                  t.id === topicId
                    ? {
                        ...t,
                        topicName: editCtName.trim(),
                        targetKeyword: editCtKeyword.trim(),
                        contentType: editCtType,
                        priority: editCtPriority,
                        status: editCtStatus,
                      }
                    : t,
                ),
              }
            : p,
        ),
      );
      setEditingTopicId(null);
    },
    [editCtName, editCtKeyword, editCtType, editCtPriority, editCtStatus],
  );

  /* ---------------------------------------------------------------- */
  /*  Derived data                                                     */
  /* ---------------------------------------------------------------- */

  const allTopics = useMemo(
    () =>
      pillars.flatMap((p) =>
        p.clusterTopics.map((t) => ({ ...t, pillarId: p.id, pillarName: p.name })),
      ),
    [pillars],
  );

  const filteredTopics = useMemo(() => {
    return allTopics.filter((t) => {
      if (filterStatus !== "all" && t.status !== filterStatus) return false;
      if (filterPriority !== "all" && t.priority !== filterPriority) return false;
      if (filterPillar !== "all" && t.pillarId !== filterPillar) return false;
      return true;
    });
  }, [allTopics, filterStatus, filterPriority, filterPillar]);

  const totalTopics = allTopics.length;
  const publishedCount = allTopics.filter((t) => t.status === "published").length;
  const overallPercent = totalTopics > 0 ? Math.round((publishedCount / totalTopics) * 100) : 0;

  function pillarStats(p: Pillar) {
    const total = p.clusterTopics.length;
    const published = p.clusterTopics.filter((t) => t.status === "published").length;
    const pct = total > 0 ? Math.round((published / total) * 100) : 0;
    return { total, published, pct };
  }

  /* Content gap: pillars with less than 3 topics or 0% published */
  const contentGaps = pillars.filter((p) => {
    const s = pillarStats(p);
    return s.total < 3 || s.pct === 0;
  });

  /* Publishing queue: all non-published topics sorted by priority */
  const publishingQueue = useMemo(() => {
    return allTopics
      .filter((t) => t.status !== "published")
      .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }, [allTopics]);

  const activePillar = pillars.find((p) => p.id === activePillarId) ?? null;

  /* ---------------------------------------------------------------- */
  /*  Export                                                            */
  /* ---------------------------------------------------------------- */

  const exportPlan = useCallback(() => {
    const lines: string[] = [];
    lines.push("CONTENT PILLAR PLAN");
    lines.push("=".repeat(60));
    lines.push(`Generated: ${new Date().toLocaleDateString()}`);
    lines.push("");
    lines.push(`Total Pillars: ${pillars.length}`);
    lines.push(`Total Topics: ${totalTopics}`);
    lines.push(`Published: ${publishedCount} (${overallPercent}%)`);
    lines.push("");

    for (const p of pillars) {
      const s = pillarStats(p);
      lines.push("-".repeat(60));
      lines.push(`PILLAR: ${p.name}`);
      lines.push(`  Primary Keyword: ${p.primaryKeyword}`);
      lines.push(`  Target Audience: ${p.targetAudience || "Not specified"}`);
      lines.push(`  Content Format: ${p.contentFormat}`);
      lines.push(`  Topics: ${s.total} | Published: ${s.published} | Completion: ${s.pct}%`);
      lines.push("");

      if (p.clusterTopics.length === 0) {
        lines.push("  (No cluster topics added yet)");
      } else {
        for (const t of p.clusterTopics) {
          lines.push(`  - ${t.topicName}`);
          lines.push(`    Keyword: ${t.targetKeyword || "None"}`);
          lines.push(`    Type: ${t.contentType} | Priority: ${priorityLabel(t.priority)} | Status: ${statusLabel(t.status)}`);
        }
      }
      lines.push("");
    }

    if (publishingQueue.length > 0) {
      lines.push("=".repeat(60));
      lines.push("PUBLISHING QUEUE (by priority)");
      lines.push("");
      for (let i = 0; i < publishingQueue.length; i++) {
        const t = publishingQueue[i];
        lines.push(`  ${i + 1}. [${priorityLabel(t.priority).toUpperCase()}] ${t.topicName}`);
        lines.push(`     Pillar: ${t.pillarName} | Type: ${t.contentType} | Status: ${statusLabel(t.status)}`);
      }
    }

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content-pillar-plan.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  }, [pillars, totalTopics, publishedCount, overallPercent, publishingQueue]);

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Content Pillar Planner",
    description:
      "Plan your content pillar strategy with topic clusters, supporting content, and a publishing calendar.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <article>
      <JsonLd data={jsonLd} />
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Content Pillar Planner" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section className="px-6 lg:px-12 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Content Pillar Planner
            </h1>
            <SectionDesc>
              Build topical authority with a structured pillar-and-cluster content strategy.
              Add pillars, map cluster topics, track progress, and export your plan.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Overall Dashboard ---- */}
      {pillars.length > 0 && (
        <section className="px-6 lg:px-12 pb-12">
          <div className="max-w-5xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-6">
                Overview Dashboard
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border border-neutral-200 p-5">
                  <p className="text-base text-neutral-500 mb-1">Total Pillars</p>
                  <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
                    {pillars.length}
                  </p>
                </div>
                <div className="border border-neutral-200 p-5">
                  <p className="text-base text-neutral-500 mb-1">Total Topics</p>
                  <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
                    {totalTopics}
                  </p>
                </div>
                <div className="border border-neutral-200 p-5">
                  <p className="text-base text-neutral-500 mb-1">Published</p>
                  <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
                    {overallPercent}%
                  </p>
                  <div className="mt-2 h-2 bg-neutral-100 w-full" role="progressbar" aria-valuenow={overallPercent} aria-valuemin={0} aria-valuemax={100} aria-label={`${overallPercent}% of all topics published`}>
                    <div className="h-2 bg-black transition-all" style={{ width: `${overallPercent}%` }} />
                  </div>
                </div>
                <div className="border border-neutral-200 p-5">
                  <p className="text-base text-neutral-500 mb-1">Content Gaps</p>
                  <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
                    {contentGaps.length}
                  </p>
                  {contentGaps.length > 0 && (
                    <p className="text-base text-neutral-500 mt-1">
                      {contentGaps.map((g) => g.name).join(", ")}
                    </p>
                  )}
                </div>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Add Pillar Form ---- */}
      <section className="px-6 lg:px-12 pb-12">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
              {pillars.length === 0 ? "1. Create Your First Pillar" : "Add a New Pillar"}
            </h2>
            <div className="border border-neutral-200 p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="pillar-name" className="block text-base font-bold text-black mb-2">
                    Pillar Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="pillar-name"
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. SEO for Small Business"
                    className="w-full border border-neutral-300 px-4 py-3 text-base text-black placeholder:text-neutral-400 focus:outline-2 focus:outline-black focus:outline-offset-1"
                  />
                </div>
                <div>
                  <label htmlFor="pillar-keyword" className="block text-base font-bold text-black mb-2">
                    Primary Keyword <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="pillar-keyword"
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="e.g. small business SEO"
                    className="w-full border border-neutral-300 px-4 py-3 text-base text-black placeholder:text-neutral-400 focus:outline-2 focus:outline-black focus:outline-offset-1"
                  />
                </div>
                <div>
                  <label htmlFor="pillar-audience" className="block text-base font-bold text-black mb-2">
                    Target Audience
                  </label>
                  <input
                    id="pillar-audience"
                    type="text"
                    value={newAudience}
                    onChange={(e) => setNewAudience(e.target.value)}
                    placeholder="e.g. Local business owners, 30-55"
                    className="w-full border border-neutral-300 px-4 py-3 text-base text-black placeholder:text-neutral-400 focus:outline-2 focus:outline-black focus:outline-offset-1"
                  />
                </div>
                <div>
                  <label htmlFor="pillar-format" className="block text-base font-bold text-black mb-2">
                    Content Format
                  </label>
                  <select
                    id="pillar-format"
                    value={newFormat}
                    onChange={(e) => setNewFormat(e.target.value as ContentFormat)}
                    className="w-full border border-neutral-300 px-4 py-3 text-base text-black bg-white focus:outline-2 focus:outline-black focus:outline-offset-1"
                  >
                    {CONTENT_FORMATS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={addPillar}
                disabled={!newName.trim() || !newKeyword.trim()}
                className={`px-8 min-h-[44px] py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                  newName.trim() && newKeyword.trim()
                    ? "bg-black text-white hover:bg-neutral-800"
                    : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                }`}
              >
                Add Pillar
              </button>
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Pillar Tabs / Selector ---- */}
      {pillars.length > 0 && (
        <section className="px-6 lg:px-12 pb-4">
          <div className="max-w-5xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                Your Pillars
              </h2>
              <div className="flex flex-wrap gap-2">
                {pillars.map((p) => {
                  const s = pillarStats(p);
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActivePillarId(p.id)}
                      className={`px-5 min-h-[44px] text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                        activePillarId === p.id
                          ? "bg-black text-white"
                          : "border border-neutral-200 text-neutral-600 hover:border-black"
                      }`}
                    >
                      {p.name}
                      <span className="ml-2 text-base opacity-70">
                        ({s.published}/{s.total})
                      </span>
                    </button>
                  );
                })}
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Active Pillar Detail ---- */}
      {activePillar && (
        <section className="px-6 lg:px-12 pb-12">
          <div className="max-w-5xl mx-auto">
            <Animate animation="fade-up">
              <div className="border border-neutral-200 overflow-hidden">
                {/* Pillar header */}
                <div className="bg-black text-white p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.75rem)] font-extrabold">
                        {activePillar.name}
                      </h3>
                      <p className="text-base text-neutral-300 mt-1">
                        Keyword: {activePillar.primaryKeyword}
                        {activePillar.targetAudience &&
                          ` | Audience: ${activePillar.targetAudience}`}
                        {` | Format: ${activePillar.contentFormat}`}
                      </p>
                    </div>
                    <button
                      onClick={() => removePillar(activePillar.id)}
                      className="px-5 min-h-[44px] py-2 text-base font-bold border border-white text-white hover:bg-white hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                    >
                      Remove Pillar
                    </button>
                  </div>

                  {/* Pillar stats bar */}
                  {(() => {
                    const s = pillarStats(activePillar);
                    return (
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-base text-neutral-400">Total Topics</p>
                          <p className="text-[clamp(1.25rem,2vw,1.5rem)] font-extrabold">{s.total}</p>
                        </div>
                        <div>
                          <p className="text-base text-neutral-400">Published</p>
                          <p className="text-[clamp(1.25rem,2vw,1.5rem)] font-extrabold">{s.published}</p>
                        </div>
                        <div>
                          <p className="text-base text-neutral-400">Completion</p>
                          <p className="text-[clamp(1.25rem,2vw,1.5rem)] font-extrabold">{s.pct}%</p>
                          <div className="mt-1 h-2 bg-neutral-700 w-full" role="progressbar" aria-valuenow={s.pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${s.pct}% of ${activePillar.name} topics published`}>
                            <div className="h-2 bg-white transition-all" style={{ width: `${s.pct}%` }} />
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Visual Pillar Map (hub-and-spoke) */}
                {activePillar.clusterTopics.length > 0 && (
                  <div className="p-6 bg-neutral-50 border-b border-neutral-200">
                    <h4 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-4">
                      Pillar Map
                    </h4>
                    <div className="flex flex-col items-center gap-6">
                      {/* Hub */}
                      <div className="bg-black text-white px-6 py-4 text-base font-bold text-center max-w-xs">
                        {activePillar.name}
                        <span className="block text-neutral-300 text-base font-normal mt-1">
                          {activePillar.primaryKeyword}
                        </span>
                      </div>
                      {/* Spokes */}
                      <div className="w-px h-8 bg-neutral-300" aria-hidden="true" />
                      <div className="flex flex-wrap justify-center gap-3 max-w-3xl">
                        {activePillar.clusterTopics.map((t) => (
                          <div
                            key={t.id}
                            className={`relative px-4 py-3 border text-base text-center max-w-[200px] ${
                              t.status === "published"
                                ? "border-black bg-white text-black font-bold"
                                : "border-neutral-300 bg-white text-neutral-600"
                            }`}
                          >
                            <span className="block leading-snug">{t.topicName}</span>
                            <span
                              className={`inline-block mt-2 px-2 py-0.5 text-base font-bold ${statusStyle[t.status]}`}
                            >
                              {statusLabel(t.status)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Cluster topics list */}
                <div className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <h4 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black">
                      Cluster Topics ({activePillar.clusterTopics.length})
                    </h4>
                    {addingToPillar !== activePillar.id && (
                      <button
                        onClick={() => {
                          setAddingToPillar(activePillar.id);
                          setCtName("");
                          setCtKeyword("");
                          setCtType("Cluster Article");
                          setCtPriority("medium");
                          setCtStatus("planned");
                        }}
                        className="px-5 min-h-[44px] py-2 text-base font-bold border border-black text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                      >
                        + Add Topic
                      </button>
                    )}
                  </div>

                  {/* Add topic form */}
                  {addingToPillar === activePillar.id && (
                    <div className="border border-neutral-200 p-5 mb-6 space-y-4 bg-neutral-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="ct-name" className="block text-base font-bold text-black mb-2">
                            Topic Name <span aria-hidden="true">*</span>
                          </label>
                          <input
                            id="ct-name"
                            type="text"
                            value={ctName}
                            onChange={(e) => setCtName(e.target.value)}
                            placeholder="e.g. Local SEO Checklist"
                            className="w-full border border-neutral-300 px-4 py-3 text-base text-black placeholder:text-neutral-400 focus:outline-2 focus:outline-black focus:outline-offset-1"
                          />
                        </div>
                        <div>
                          <label htmlFor="ct-keyword" className="block text-base font-bold text-black mb-2">
                            Target Keyword
                          </label>
                          <input
                            id="ct-keyword"
                            type="text"
                            value={ctKeyword}
                            onChange={(e) => setCtKeyword(e.target.value)}
                            placeholder="e.g. local SEO checklist"
                            className="w-full border border-neutral-300 px-4 py-3 text-base text-black placeholder:text-neutral-400 focus:outline-2 focus:outline-black focus:outline-offset-1"
                          />
                        </div>
                        <div>
                          <label htmlFor="ct-type" className="block text-base font-bold text-black mb-2">
                            Content Type
                          </label>
                          <select
                            id="ct-type"
                            value={ctType}
                            onChange={(e) =>
                              setCtType(e.target.value as ClusterContentType)
                            }
                            className="w-full border border-neutral-300 px-4 py-3 text-base text-black bg-white focus:outline-2 focus:outline-black focus:outline-offset-1"
                          >
                            {CLUSTER_CONTENT_TYPES.map((ct) => (
                              <option key={ct} value={ct}>
                                {ct}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <label htmlFor="ct-priority" className="block text-base font-bold text-black mb-2">
                              Priority
                            </label>
                            <select
                              id="ct-priority"
                              value={ctPriority}
                              onChange={(e) =>
                                setCtPriority(e.target.value as Priority)
                              }
                              className="w-full border border-neutral-300 px-4 py-3 text-base text-black bg-white focus:outline-2 focus:outline-black focus:outline-offset-1"
                            >
                              {PRIORITIES.map((pr) => (
                                <option key={pr.id} value={pr.id}>
                                  {pr.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex-1">
                            <label htmlFor="ct-status" className="block text-base font-bold text-black mb-2">
                              Status
                            </label>
                            <select
                              id="ct-status"
                              value={ctStatus}
                              onChange={(e) =>
                                setCtStatus(e.target.value as Status)
                              }
                              className="w-full border border-neutral-300 px-4 py-3 text-base text-black bg-white focus:outline-2 focus:outline-black focus:outline-offset-1"
                            >
                              {STATUSES.map((st) => (
                                <option key={st.id} value={st.id}>
                                  {st.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => addClusterTopic(activePillar.id)}
                          disabled={!ctName.trim()}
                          className={`px-6 min-h-[44px] py-2 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                            ctName.trim()
                              ? "bg-black text-white hover:bg-neutral-800"
                              : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                          }`}
                        >
                          Save Topic
                        </button>
                        <button
                          onClick={() => setAddingToPillar(null)}
                          className="px-6 min-h-[44px] py-2 text-base font-bold border border-neutral-300 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Topics table (desktop) */}
                  {activePillar.clusterTopics.length > 0 && (
                    <>
                      <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="border-b border-neutral-200 bg-neutral-50">
                              <th className="px-4 py-3 text-base font-bold text-black">Topic</th>
                              <th className="px-4 py-3 text-base font-bold text-black">Keyword</th>
                              <th className="px-4 py-3 text-base font-bold text-black">Type</th>
                              <th className="px-4 py-3 text-base font-bold text-black">Priority</th>
                              <th className="px-4 py-3 text-base font-bold text-black">Status</th>
                              <th className="px-4 py-3 text-base font-bold text-black">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-100">
                            {activePillar.clusterTopics.map((t) => (
                              <tr
                                key={t.id}
                                className="hover:bg-neutral-50 transition-colors motion-reduce:transition-none"
                              >
                                {editingTopicId === t.id ? (
                                  <>
                                    <td className="px-4 py-3">
                                      <label htmlFor={`edit-name-${t.id}`} className="sr-only">Topic name</label>
                                      <input
                                        id={`edit-name-${t.id}`}
                                        type="text"
                                        value={editCtName}
                                        onChange={(e) => setEditCtName(e.target.value)}
                                        className="w-full border border-neutral-300 px-3 py-2 text-base text-black focus:outline-2 focus:outline-black focus:outline-offset-1"
                                      />
                                    </td>
                                    <td className="px-4 py-3">
                                      <label htmlFor={`edit-kw-${t.id}`} className="sr-only">Target keyword</label>
                                      <input
                                        id={`edit-kw-${t.id}`}
                                        type="text"
                                        value={editCtKeyword}
                                        onChange={(e) => setEditCtKeyword(e.target.value)}
                                        className="w-full border border-neutral-300 px-3 py-2 text-base text-black focus:outline-2 focus:outline-black focus:outline-offset-1"
                                      />
                                    </td>
                                    <td className="px-4 py-3">
                                      <label htmlFor={`edit-type-${t.id}`} className="sr-only">Content type</label>
                                      <select
                                        id={`edit-type-${t.id}`}
                                        value={editCtType}
                                        onChange={(e) => setEditCtType(e.target.value as ClusterContentType)}
                                        className="w-full border border-neutral-300 px-3 py-2 text-base text-black bg-white focus:outline-2 focus:outline-black focus:outline-offset-1"
                                      >
                                        {CLUSTER_CONTENT_TYPES.map((ct) => (
                                          <option key={ct} value={ct}>{ct}</option>
                                        ))}
                                      </select>
                                    </td>
                                    <td className="px-4 py-3">
                                      <label htmlFor={`edit-pri-${t.id}`} className="sr-only">Priority</label>
                                      <select
                                        id={`edit-pri-${t.id}`}
                                        value={editCtPriority}
                                        onChange={(e) => setEditCtPriority(e.target.value as Priority)}
                                        className="w-full border border-neutral-300 px-3 py-2 text-base text-black bg-white focus:outline-2 focus:outline-black focus:outline-offset-1"
                                      >
                                        {PRIORITIES.map((pr) => (
                                          <option key={pr.id} value={pr.id}>{pr.label}</option>
                                        ))}
                                      </select>
                                    </td>
                                    <td className="px-4 py-3">
                                      <label htmlFor={`edit-stat-${t.id}`} className="sr-only">Status</label>
                                      <select
                                        id={`edit-stat-${t.id}`}
                                        value={editCtStatus}
                                        onChange={(e) => setEditCtStatus(e.target.value as Status)}
                                        className="w-full border border-neutral-300 px-3 py-2 text-base text-black bg-white focus:outline-2 focus:outline-black focus:outline-offset-1"
                                      >
                                        {STATUSES.map((st) => (
                                          <option key={st.id} value={st.id}>{st.label}</option>
                                        ))}
                                      </select>
                                    </td>
                                    <td className="px-4 py-3">
                                      <div className="flex gap-2">
                                        <button
                                          onClick={() => saveEditTopic(activePillar.id, t.id)}
                                          className="px-4 min-h-[44px] py-2 text-base font-bold bg-black text-white hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                                        >
                                          Save
                                        </button>
                                        <button
                                          onClick={() => setEditingTopicId(null)}
                                          className="px-4 min-h-[44px] py-2 text-base font-bold border border-neutral-300 text-neutral-600 hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td className="px-4 py-3 text-base text-black font-bold">
                                      {t.topicName}
                                    </td>
                                    <td className="px-4 py-3 text-base text-neutral-600">
                                      {t.targetKeyword || "—"}
                                    </td>
                                    <td className="px-4 py-3 text-base text-neutral-600">
                                      {t.contentType}
                                    </td>
                                    <td className="px-4 py-3">
                                      <span
                                        className={`inline-block px-3 py-1 text-base font-bold ${priorityStyle[t.priority]}`}
                                      >
                                        {priorityLabel(t.priority)}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3">
                                      <span
                                        className={`inline-block px-3 py-1 text-base font-bold ${statusStyle[t.status]}`}
                                      >
                                        {statusLabel(t.status)}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3">
                                      <div className="flex gap-2">
                                        <button
                                          onClick={() => startEditTopic(t)}
                                          className="px-4 min-h-[44px] py-2 text-base font-bold border border-neutral-300 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                                        >
                                          Edit
                                        </button>
                                        <button
                                          onClick={() =>
                                            removeClusterTopic(activePillar.id, t.id)
                                          }
                                          className="px-4 min-h-[44px] py-2 text-base font-bold border border-neutral-300 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </td>
                                  </>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Topics cards (mobile) */}
                      <div className="md:hidden divide-y divide-neutral-100">
                        {activePillar.clusterTopics.map((t) => (
                          <div key={t.id} className="py-4 space-y-2">
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-base font-bold text-black">{t.topicName}</p>
                              <span
                                className={`inline-block shrink-0 px-2 py-0.5 text-base font-bold ${priorityStyle[t.priority]}`}
                              >
                                {priorityLabel(t.priority)}
                              </span>
                            </div>
                            {t.targetKeyword && (
                              <p className="text-base text-neutral-500">
                                Keyword: {t.targetKeyword}
                              </p>
                            )}
                            <p className="text-base text-neutral-600">
                              {t.contentType}
                            </p>
                            <div className="flex items-center gap-3">
                              <span
                                className={`inline-block px-2 py-0.5 text-base font-bold ${statusStyle[t.status]}`}
                              >
                                {statusLabel(t.status)}
                              </span>
                              <button
                                onClick={() => startEditTopic(t)}
                                className="text-base font-bold text-neutral-500 hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 underline"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  removeClusterTopic(activePillar.id, t.id)
                                }
                                className="text-base font-bold text-neutral-500 hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 underline"
                              >
                                Remove
                              </button>
                            </div>

                            {/* Mobile inline edit */}
                            {editingTopicId === t.id && (
                              <div className="border border-neutral-200 p-4 mt-2 space-y-3 bg-neutral-50">
                                <div>
                                  <label htmlFor={`m-edit-name-${t.id}`} className="block text-base font-bold text-black mb-1">Topic Name</label>
                                  <input id={`m-edit-name-${t.id}`} type="text" value={editCtName} onChange={(e) => setEditCtName(e.target.value)} className="w-full border border-neutral-300 px-3 py-2 text-base text-black focus:outline-2 focus:outline-black focus:outline-offset-1" />
                                </div>
                                <div>
                                  <label htmlFor={`m-edit-kw-${t.id}`} className="block text-base font-bold text-black mb-1">Keyword</label>
                                  <input id={`m-edit-kw-${t.id}`} type="text" value={editCtKeyword} onChange={(e) => setEditCtKeyword(e.target.value)} className="w-full border border-neutral-300 px-3 py-2 text-base text-black focus:outline-2 focus:outline-black focus:outline-offset-1" />
                                </div>
                                <div>
                                  <label htmlFor={`m-edit-type-${t.id}`} className="block text-base font-bold text-black mb-1">Type</label>
                                  <select id={`m-edit-type-${t.id}`} value={editCtType} onChange={(e) => setEditCtType(e.target.value as ClusterContentType)} className="w-full border border-neutral-300 px-3 py-2 text-base text-black bg-white focus:outline-2 focus:outline-black focus:outline-offset-1">
                                    {CLUSTER_CONTENT_TYPES.map((ct) => (<option key={ct} value={ct}>{ct}</option>))}
                                  </select>
                                </div>
                                <div className="flex gap-3">
                                  <div className="flex-1">
                                    <label htmlFor={`m-edit-pri-${t.id}`} className="block text-base font-bold text-black mb-1">Priority</label>
                                    <select id={`m-edit-pri-${t.id}`} value={editCtPriority} onChange={(e) => setEditCtPriority(e.target.value as Priority)} className="w-full border border-neutral-300 px-3 py-2 text-base text-black bg-white focus:outline-2 focus:outline-black focus:outline-offset-1">
                                      {PRIORITIES.map((pr) => (<option key={pr.id} value={pr.id}>{pr.label}</option>))}
                                    </select>
                                  </div>
                                  <div className="flex-1">
                                    <label htmlFor={`m-edit-stat-${t.id}`} className="block text-base font-bold text-black mb-1">Status</label>
                                    <select id={`m-edit-stat-${t.id}`} value={editCtStatus} onChange={(e) => setEditCtStatus(e.target.value as Status)} className="w-full border border-neutral-300 px-3 py-2 text-base text-black bg-white focus:outline-2 focus:outline-black focus:outline-offset-1">
                                      {STATUSES.map((st) => (<option key={st.id} value={st.id}>{st.label}</option>))}
                                    </select>
                                  </div>
                                </div>
                                <div className="flex gap-3">
                                  <button onClick={() => saveEditTopic(activePillar.id, t.id)} className="px-5 min-h-[44px] py-2 text-base font-bold bg-black text-white hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Save</button>
                                  <button onClick={() => setEditingTopicId(null)} className="px-5 min-h-[44px] py-2 text-base font-bold border border-neutral-300 text-neutral-600 hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Cancel</button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {activePillar.clusterTopics.length === 0 && (
                    <p className="text-base text-neutral-500 py-8 text-center">
                      No cluster topics yet. Add your first topic to start building this pillar.
                    </p>
                  )}
                </div>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Filter & All Topics View ---- */}
      {totalTopics > 0 && (
        <section className="px-6 lg:px-12 pb-12">
          <div className="max-w-5xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                All Topics
              </h2>
              <div className="flex flex-wrap gap-4 mb-6">
                <div>
                  <label htmlFor="filter-status" className="block text-base font-bold text-black mb-1">
                    Status
                  </label>
                  <select
                    id="filter-status"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as Status | "all")}
                    className="border border-neutral-300 px-4 py-3 text-base text-black bg-white focus:outline-2 focus:outline-black focus:outline-offset-1 min-w-[160px]"
                  >
                    <option value="all">All Statuses</option>
                    {STATUSES.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="filter-priority" className="block text-base font-bold text-black mb-1">
                    Priority
                  </label>
                  <select
                    id="filter-priority"
                    value={filterPriority}
                    onChange={(e) =>
                      setFilterPriority(e.target.value as Priority | "all")
                    }
                    className="border border-neutral-300 px-4 py-3 text-base text-black bg-white focus:outline-2 focus:outline-black focus:outline-offset-1 min-w-[160px]"
                  >
                    <option value="all">All Priorities</option>
                    {PRIORITIES.map((pr) => (
                      <option key={pr.id} value={pr.id}>
                        {pr.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="filter-pillar" className="block text-base font-bold text-black mb-1">
                    Pillar
                  </label>
                  <select
                    id="filter-pillar"
                    value={filterPillar}
                    onChange={(e) => setFilterPillar(e.target.value)}
                    className="border border-neutral-300 px-4 py-3 text-base text-black bg-white focus:outline-2 focus:outline-black focus:outline-offset-1 min-w-[160px]"
                  >
                    <option value="all">All Pillars</option>
                    {pillars.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {filteredTopics.length === 0 ? (
                <p className="text-base text-neutral-500 py-6 text-center border border-neutral-200">
                  No topics match the selected filters.
                </p>
              ) : (
                <>
                  <p className="text-base text-neutral-500 mb-4">
                    Showing {filteredTopics.length} of {totalTopics} topics
                  </p>

                  {/* Desktop table */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-neutral-200 bg-neutral-50">
                          <th className="px-4 py-3 text-base font-bold text-black">Pillar</th>
                          <th className="px-4 py-3 text-base font-bold text-black">Topic</th>
                          <th className="px-4 py-3 text-base font-bold text-black">Type</th>
                          <th className="px-4 py-3 text-base font-bold text-black">Priority</th>
                          <th className="px-4 py-3 text-base font-bold text-black">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {filteredTopics.map((t) => (
                          <tr
                            key={t.id}
                            className="hover:bg-neutral-50 transition-colors motion-reduce:transition-none"
                          >
                            <td className="px-4 py-3 text-base text-black font-bold whitespace-nowrap">
                              {t.pillarName}
                            </td>
                            <td className="px-4 py-3 text-base text-black">
                              {t.topicName}
                            </td>
                            <td className="px-4 py-3 text-base text-neutral-600 whitespace-nowrap">
                              {t.contentType}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-block px-3 py-1 text-base font-bold ${priorityStyle[t.priority]}`}>
                                {priorityLabel(t.priority)}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-block px-3 py-1 text-base font-bold ${statusStyle[t.status]}`}>
                                {statusLabel(t.status)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile cards */}
                  <div className="md:hidden divide-y divide-neutral-100 border border-neutral-200">
                    {filteredTopics.map((t) => (
                      <div key={t.id} className="p-4 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-base font-bold text-black">{t.topicName}</p>
                          <span className={`inline-block shrink-0 px-2 py-0.5 text-base font-bold ${priorityStyle[t.priority]}`}>
                            {priorityLabel(t.priority)}
                          </span>
                        </div>
                        <p className="text-base text-neutral-500">
                          {t.pillarName} &mdash; {t.contentType}
                        </p>
                        <span className={`inline-block px-2 py-0.5 text-base font-bold ${statusStyle[t.status]}`}>
                          {statusLabel(t.status)}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Publishing Queue ---- */}
      {publishingQueue.length > 0 && (
        <section className="px-6 lg:px-12 pb-12">
          <div className="max-w-5xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                Publishing Queue
              </h2>
              <p className="text-base text-neutral-500 mb-6">
                Topics ordered by priority. Work through this list to build topical authority efficiently.
              </p>

              <Stagger stagger={40} animation="fade-up" className="space-y-3">
                {publishingQueue.map((t, i) => (
                  <div
                    key={t.id}
                    className="flex items-center gap-4 border border-neutral-200 p-4 hover:border-black transition-colors motion-reduce:transition-none"
                  >
                    <span className="text-[clamp(1.25rem,2vw,1.5rem)] font-extrabold text-neutral-300 w-8 shrink-0 text-center">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-bold text-black truncate">{t.topicName}</p>
                      <p className="text-base text-neutral-500">
                        {t.pillarName} &mdash; {t.contentType}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`inline-block px-3 py-1 text-base font-bold ${priorityStyle[t.priority]}`}>
                        {priorityLabel(t.priority)}
                      </span>
                      <span className={`hidden sm:inline-block px-3 py-1 text-base font-bold ${statusStyle[t.status]}`}>
                        {statusLabel(t.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </Stagger>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Export ---- */}
      {pillars.length > 0 && (
        <section className="px-6 lg:px-12 pb-16">
          <div className="max-w-5xl mx-auto">
            <Animate animation="fade-up">
              <button
                onClick={exportPlan}
                className="px-10 min-h-[44px] py-4 text-base font-bold bg-black text-white hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                {exported ? "Downloaded!" : "Export Plan as .txt"}
              </button>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Educational Section ---- */}
      <section className="px-6 lg:px-12 py-20 bg-neutral-50">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Content Strategy Guide</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-3 mb-6">
              Building Topical Authority with Content Pillars
            </h2>
          </Animate>

          <Stagger stagger={100} animation="fade-up" className="space-y-8">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                What is a content pillar?
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed">
                A content pillar is a comprehensive, authoritative page on a broad topic central to
                your business. It acts as a hub that links to and from multiple related cluster
                articles. Search engines use these internal links to understand your site&apos;s
                expertise, which improves rankings for the entire topic cluster.
              </p>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                How cluster topics support your pillar
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed">
                Each cluster topic targets a specific long-tail keyword related to the pillar.
                Together, they create a web of interlinked content that signals depth and
                relevance to search engines. A pillar page on &ldquo;SEO for Small Business&rdquo;
                might link to cluster articles on local SEO, keyword research, technical audits,
                and link building.
              </p>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                Prioritize by search intent and impact
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed">
                Not all cluster topics carry equal weight. Prioritize high-intent keywords that
                align with your conversion goals. FAQ and how-to content captures informational
                searches, while comparison and case study content targets users closer to a
                purchase decision.
              </p>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                Track progress and identify gaps
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed">
                A content pillar strategy works best when you systematically fill gaps. Use the
                status tracking in this tool to see which clusters need more content. Pillars
                with fewer than three cluster topics or zero published articles represent the
                biggest opportunities for growth.
              </p>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                Publish in strategic order
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed">
                Start with your pillar page to establish the hub, then publish high-priority
                cluster articles first. This builds momentum and creates a foundation of internal
                links. As you add more cluster content, the entire pillar&apos;s ranking potential
                grows.
              </p>
            </div>
          </Stagger>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Building Your Content Strategy?
            </h2>
            <p className="text-lg text-neutral-400 mt-4 mb-8">
              Our team builds pillar-and-cluster content strategies that drive organic traffic
              and establish your authority. From keyword research to publishing, we handle
              the entire process.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
            >
              Get Content Strategy Help &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
