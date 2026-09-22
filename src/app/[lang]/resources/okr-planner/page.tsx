"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { ToolCTA } from "@/components/tool-cta";
import { Animate } from "@/components/animate";
import { SectionLabel } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Quarter = "Q1" | "Q2" | "Q3" | "Q4";
type ObjectiveStatus = "On Track" | "At Risk" | "Behind";
type SortMode = "progress" | "status";

interface KeyResult {
  id: string;
  description: string;
  targetMetric: number;
  currentValue: number;
}

interface Objective {
  id: string;
  title: string;
  owner: string;
  quarter: Quarter;
  status: ObjectiveStatus;
  keyResults: KeyResult[];
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "markit-okr-planner-v1";
const MAX_OBJECTIVES = 5;
const MIN_KEY_RESULTS = 3;
const MAX_KEY_RESULTS = 5;
const QUARTERS: Quarter[] = ["Q1", "Q2", "Q3", "Q4"];
const STATUSES: ObjectiveStatus[] = ["On Track", "At Risk", "Behind"];

const STATUS_ORDER: Record<ObjectiveStatus, number> = {
  "Behind": 0,
  "At Risk": 1,
  "On Track": 2,
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function calcProgress(current: number, target: number): number {
  if (target <= 0) return 0;
  return Math.min(100, Math.round((current / target) * 100));
}

function calcObjectiveProgress(keyResults: KeyResult[]): number {
  if (keyResults.length === 0) return 0;
  const total = keyResults.reduce(
    (sum, kr) => sum + calcProgress(kr.currentValue, kr.targetMetric),
    0
  );
  return Math.round(total / keyResults.length);
}

function makeKeyResult(): KeyResult {
  return { id: generateId(), description: "", targetMetric: 100, currentValue: 0 };
}

function makeObjective(): Objective {
  return {
    id: generateId(),
    title: "",
    owner: "",
    quarter: "Q1",
    status: "On Track",
    keyResults: [makeKeyResult(), makeKeyResult(), makeKeyResult()],
  };
}

/* ------------------------------------------------------------------ */
/*  Default template                                                   */
/* ------------------------------------------------------------------ */

function defaultObjectives(): Objective[] {
  return [
    {
      id: generateId(),
      title: "Increase Brand Awareness",
      owner: "Marketing Lead",
      quarter: "Q1",
      status: "On Track",
      keyResults: [
        { id: generateId(), description: "Grow organic website traffic", targetMetric: 50000, currentValue: 32000 },
        { id: generateId(), description: "Increase social media followers", targetMetric: 10000, currentValue: 6500 },
        { id: generateId(), description: "Earn media mentions in industry publications", targetMetric: 12, currentValue: 7 },
      ],
    },
    {
      id: generateId(),
      title: "Accelerate Lead Generation",
      owner: "Demand Gen Manager",
      quarter: "Q1",
      status: "At Risk",
      keyResults: [
        { id: generateId(), description: "Generate marketing qualified leads (MQLs)", targetMetric: 500, currentValue: 210 },
        { id: generateId(), description: "Achieve email list growth", targetMetric: 2000, currentValue: 1100 },
        { id: generateId(), description: "Improve landing page conversion rate (%)", targetMetric: 5, currentValue: 3 },
      ],
    },
    {
      id: generateId(),
      title: "Improve Customer Retention",
      owner: "Customer Success Lead",
      quarter: "Q1",
      status: "On Track",
      keyResults: [
        { id: generateId(), description: "Increase NPS score", targetMetric: 70, currentValue: 58 },
        { id: generateId(), description: "Reduce churn rate to target (%)", targetMetric: 3, currentValue: 4 },
        { id: generateId(), description: "Grow customer referral sign-ups", targetMetric: 100, currentValue: 72 },
      ],
    },
  ];
}

/* ------------------------------------------------------------------ */
/*  Focus-visible class (shared)                                       */
/* ------------------------------------------------------------------ */

const focusRing = "focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <div
        className="h-full bg-black rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function StatusBadge({ status }: { status: ObjectiveStatus }) {
  const styles: Record<ObjectiveStatus, string> = {
    "On Track": "border-neutral-400 text-black",
    "At Risk": "border-neutral-500 text-black bg-neutral-100",
    "Behind": "border-black text-black bg-neutral-200",
  };
  return (
    <span className={`inline-block px-3 py-1 text-base font-medium border rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function OkrPlannerPage() {
  const [objectives, setObjectives] = useState<Objective[]>(defaultObjectives);
  const [loaded, setLoaded] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("progress");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  /* ---- localStorage persistence ---- */

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setObjectives(parsed as Objective[]);
        }
      }
    } catch {
      /* ignore corrupt data */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(objectives));
    }
  }, [objectives, loaded]);

  /* ---- Expand / collapse ---- */

  const toggleExpand = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  /* ---- Sorted objectives ---- */

  const sorted = useMemo(() => {
    const arr = [...objectives];
    if (sortMode === "progress") {
      arr.sort((a, b) => calcObjectiveProgress(b.keyResults) - calcObjectiveProgress(a.keyResults));
    } else {
      arr.sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]);
    }
    return arr;
  }, [objectives, sortMode]);

  /* ---- Scorecard metrics ---- */

  const scorecard = useMemo(() => {
    const total = objectives.length;
    const avgProgress =
      total === 0
        ? 0
        : Math.round(
            objectives.reduce((s, o) => s + calcObjectiveProgress(o.keyResults), 0) / total
          );
    const onTrack = objectives.filter((o) => o.status === "On Track").length;
    return { total, avgProgress, onTrack };
  }, [objectives]);

  /* ---- CRUD helpers ---- */

  const addObjective = useCallback(() => {
    if (objectives.length >= MAX_OBJECTIVES) return;
    const newObj = makeObjective();
    setObjectives((prev) => [...prev, newObj]);
    setExpandedIds((prev) => new Set(prev).add(newObj.id));
  }, [objectives.length]);

  const removeObjective = useCallback((id: string) => {
    setObjectives((prev) => prev.filter((o) => o.id !== id));
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const updateObjective = useCallback(
    (id: string, updates: Partial<Omit<Objective, "id" | "keyResults">>) => {
      setObjectives((prev) =>
        prev.map((o) => (o.id === id ? { ...o, ...updates } : o))
      );
    },
    []
  );

  const updateKeyResult = useCallback(
    (objectiveId: string, krId: string, updates: Partial<Omit<KeyResult, "id">>) => {
      setObjectives((prev) =>
        prev.map((o) =>
          o.id === objectiveId
            ? {
                ...o,
                keyResults: o.keyResults.map((kr) =>
                  kr.id === krId ? { ...kr, ...updates } : kr
                ),
              }
            : o
        )
      );
    },
    []
  );

  const addKeyResult = useCallback((objectiveId: string) => {
    setObjectives((prev) =>
      prev.map((o) => {
        if (o.id !== objectiveId || o.keyResults.length >= MAX_KEY_RESULTS) return o;
        return { ...o, keyResults: [...o.keyResults, makeKeyResult()] };
      })
    );
  }, []);

  const removeKeyResult = useCallback((objectiveId: string, krId: string) => {
    setObjectives((prev) =>
      prev.map((o) => {
        if (o.id !== objectiveId || o.keyResults.length <= MIN_KEY_RESULTS) return o;
        return { ...o, keyResults: o.keyResults.filter((kr) => kr.id !== krId) };
      })
    );
  }, []);

  /* ---- Export ---- */

  const exportTxt = useCallback(() => {
    const lines: string[] = [];
    lines.push("MARKETING OKR PLANNER — EXPORT");
    lines.push(`Generated: ${new Date().toLocaleDateString()}`);
    lines.push("=".repeat(50));
    lines.push("");
    lines.push("SCORECARD");
    lines.push(`  Total Objectives: ${scorecard.total}`);
    lines.push(`  Average Progress: ${scorecard.avgProgress}%`);
    lines.push(`  On Track: ${scorecard.onTrack}`);
    lines.push("");

    objectives.forEach((o, i) => {
      const objProgress = calcObjectiveProgress(o.keyResults);
      lines.push(`OBJECTIVE ${i + 1}: ${o.title || "(Untitled)"}`);
      lines.push(`  Owner: ${o.owner || "(Unassigned)"}`);
      lines.push(`  Quarter: ${o.quarter}`);
      lines.push(`  Status: ${o.status}`);
      lines.push(`  Progress: ${objProgress}%`);
      lines.push("");
      o.keyResults.forEach((kr, j) => {
        const krProgress = calcProgress(kr.currentValue, kr.targetMetric);
        lines.push(`  Key Result ${j + 1}: ${kr.description || "(No description)"}`);
        lines.push(`    Target: ${kr.targetMetric} | Current: ${kr.currentValue} | Progress: ${krProgress}%`);
      });
      lines.push("");
    });

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "okr-planner-export.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [objectives, scorecard]);

  /* ---- Reset ---- */

  const resetToTemplate = useCallback(() => {
    setObjectives(defaultObjectives());
    setExpandedIds(new Set());
  }, []);

  /* ---- JSON-LD ---- */

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Marketing OKR Planner",
    description:
      "Free interactive OKR planner for marketing teams. Set objectives, track key results with auto-calculated progress, and run quarterly reviews.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: {
      "@type": "Organization",
      name: "Markit Media",
      url: "https://themarkitmedia.com",
    },
  };

  /* ---- Render ---- */

  return (
    <>
      <JsonLd data={jsonLd} />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "OKR Planner" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-28 pb-16 max-w-7xl mx-auto">
        <Animate animation="fade-up">
          <SectionLabel>Free Tool</SectionLabel>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-tight mt-2">
            Marketing OKR Planner
          </h1>
          <p className="text-lg text-neutral-500 leading-relaxed mt-4 max-w-2xl">
            Set marketing objectives, define measurable key results, and track progress
            throughout the quarter. Your data stays in your browser — nothing is sent to
            a server.
          </p>
        </Animate>
      </section>

      {/* Scorecard */}
      <section className="px-6 lg:px-12 pb-12 max-w-7xl mx-auto">
        <Animate animation="fade-up" delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Total Objectives", value: scorecard.total },
              { label: "Average Progress", value: `${scorecard.avgProgress}%` },
              { label: "On Track", value: scorecard.onTrack },
            ].map((card) => (
              <div
                key={card.label}
                className="border border-neutral-200 rounded-2xl p-6 text-center"
              >
                <p className="text-base text-neutral-500">{card.label}</p>
                <p className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-black mt-1">
                  {card.value}
                </p>
              </div>
            ))}
          </div>
        </Animate>
      </section>

      {/* Controls bar */}
      <section className="px-6 lg:px-12 pb-8 max-w-7xl mx-auto">
        <Animate animation="fade-up" delay={150}>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={addObjective}
              disabled={objectives.length >= MAX_OBJECTIVES}
              className={`px-5 py-2.5 text-base font-semibold rounded-full border-2 border-black bg-black text-white transition-colors hover:bg-white hover:text-black disabled:opacity-40 disabled:cursor-not-allowed ${focusRing}`}
            >
              + Add Objective
            </button>

            <div className="flex items-center gap-2">
              <label htmlFor="sort-mode" className="text-base text-neutral-600 font-medium">
                Sort by:
              </label>
              <select
                id="sort-mode"
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value as SortMode)}
                className={`px-3 py-2 text-base border border-neutral-300 rounded-lg bg-white text-black ${focusRing}`}
              >
                <option value="progress">Progress</option>
                <option value="status">Status</option>
              </select>
            </div>

            <button
              onClick={exportTxt}
              className={`px-5 py-2.5 text-base font-semibold rounded-full border-2 border-black text-black transition-colors hover:bg-black hover:text-white ${focusRing}`}
            >
              Export .txt
            </button>

            <button
              onClick={resetToTemplate}
              className={`px-5 py-2.5 text-base font-medium rounded-full border border-neutral-300 text-neutral-600 transition-colors hover:border-black hover:text-black ${focusRing}`}
            >
              Reset to Template
            </button>
          </div>

          {objectives.length >= MAX_OBJECTIVES && (
            <p className="text-base text-neutral-500 mt-3">
              Maximum of {MAX_OBJECTIVES} objectives reached.
            </p>
          )}
        </Animate>
      </section>

      {/* Objectives list */}
      <section className="px-6 lg:px-12 pb-16 max-w-7xl mx-auto space-y-8">
        {sorted.map((obj, objIdx) => {
          const objProgress = calcObjectiveProgress(obj.keyResults);
          const isExpanded = expandedIds.has(obj.id);

          return (
            <Animate key={obj.id} animation="fade-up" delay={objIdx * 60}>
              <div className="border border-neutral-200 rounded-2xl overflow-hidden">
                {/* Objective header */}
                <div className="p-6 bg-white">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-base font-bold text-neutral-400 uppercase tracking-wider">
                          Objective {objIdx + 1}
                        </span>
                        <StatusBadge status={obj.status} />
                        <span className="text-base font-semibold text-black">
                          {objProgress}%
                        </span>
                      </div>

                      <input
                        type="text"
                        value={obj.title}
                        onChange={(e) => updateObjective(obj.id, { title: e.target.value })}
                        placeholder="Objective title"
                        className={`w-full font-[family-name:var(--font-display)] text-xl font-bold text-black bg-transparent border-b border-neutral-200 pb-1 placeholder:text-neutral-300 ${focusRing}`}
                        aria-label={`Objective ${objIdx + 1} title`}
                      />

                      <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor={`owner-${obj.id}`}
                            className="text-base text-neutral-500 font-medium"
                          >
                            Owner:
                          </label>
                          <input
                            id={`owner-${obj.id}`}
                            type="text"
                            value={obj.owner}
                            onChange={(e) =>
                              updateObjective(obj.id, { owner: e.target.value })
                            }
                            placeholder="Name or role"
                            className={`px-3 py-1.5 text-base border border-neutral-200 rounded-lg bg-white text-black placeholder:text-neutral-300 ${focusRing}`}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor={`quarter-${obj.id}`}
                            className="text-base text-neutral-500 font-medium"
                          >
                            Quarter:
                          </label>
                          <select
                            id={`quarter-${obj.id}`}
                            value={obj.quarter}
                            onChange={(e) =>
                              updateObjective(obj.id, {
                                quarter: e.target.value as Quarter,
                              })
                            }
                            className={`px-3 py-1.5 text-base border border-neutral-200 rounded-lg bg-white text-black ${focusRing}`}
                          >
                            {QUARTERS.map((q) => (
                              <option key={q} value={q}>
                                {q}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor={`status-${obj.id}`}
                            className="text-base text-neutral-500 font-medium"
                          >
                            Status:
                          </label>
                          <select
                            id={`status-${obj.id}`}
                            value={obj.status}
                            onChange={(e) =>
                              updateObjective(obj.id, {
                                status: e.target.value as ObjectiveStatus,
                              })
                            }
                            className={`px-3 py-1.5 text-base border border-neutral-200 rounded-lg bg-white text-black ${focusRing}`}
                          >
                            {STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleExpand(obj.id)}
                        className={`px-4 py-2 text-base font-medium border border-neutral-200 rounded-lg text-black transition-colors hover:bg-neutral-100 ${focusRing}`}
                        aria-expanded={isExpanded}
                        aria-controls={`kr-${obj.id}`}
                      >
                        {isExpanded ? "Collapse" : "Expand"}
                      </button>
                      <button
                        onClick={() => removeObjective(obj.id)}
                        className={`px-4 py-2 text-base font-medium border border-neutral-200 rounded-lg text-neutral-500 transition-colors hover:border-black hover:text-black ${focusRing}`}
                        aria-label={`Remove objective ${objIdx + 1}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Objective progress bar */}
                  <div className="mt-4">
                    <ProgressBar value={objProgress} />
                  </div>
                </div>

                {/* Key Results (expandable) */}
                {isExpanded && (
                  <div
                    id={`kr-${obj.id}`}
                    className="border-t border-neutral-200 bg-neutral-50 p-6 space-y-6"
                  >
                    <p className="text-base font-bold text-black uppercase tracking-wider">
                      Key Results
                    </p>

                    {obj.keyResults.map((kr, krIdx) => {
                      const krProgress = calcProgress(kr.currentValue, kr.targetMetric);
                      return (
                        <div
                          key={kr.id}
                          className="bg-white border border-neutral-200 rounded-xl p-5 space-y-4"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <span className="text-base font-semibold text-neutral-400">
                              KR {krIdx + 1}
                            </span>
                            <span className="text-base font-bold text-black">
                              {krProgress}%
                            </span>
                          </div>

                          <input
                            type="text"
                            value={kr.description}
                            onChange={(e) =>
                              updateKeyResult(obj.id, kr.id, {
                                description: e.target.value,
                              })
                            }
                            placeholder="Key result description"
                            className={`w-full text-base text-black bg-transparent border-b border-neutral-200 pb-1 placeholder:text-neutral-300 ${focusRing}`}
                            aria-label={`Objective ${objIdx + 1}, Key Result ${krIdx + 1} description`}
                          />

                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                              <label
                                htmlFor={`target-${kr.id}`}
                                className="text-base text-neutral-500 font-medium"
                              >
                                Target:
                              </label>
                              <input
                                id={`target-${kr.id}`}
                                type="number"
                                min={0}
                                value={kr.targetMetric}
                                onChange={(e) =>
                                  updateKeyResult(obj.id, kr.id, {
                                    targetMetric: Math.max(0, Number(e.target.value) || 0),
                                  })
                                }
                                className={`w-28 px-3 py-1.5 text-base border border-neutral-200 rounded-lg bg-white text-black ${focusRing}`}
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <label
                                htmlFor={`current-${kr.id}`}
                                className="text-base text-neutral-500 font-medium"
                              >
                                Current:
                              </label>
                              <input
                                id={`current-${kr.id}`}
                                type="number"
                                min={0}
                                value={kr.currentValue}
                                onChange={(e) =>
                                  updateKeyResult(obj.id, kr.id, {
                                    currentValue: Math.max(0, Number(e.target.value) || 0),
                                  })
                                }
                                className={`w-28 px-3 py-1.5 text-base border border-neutral-200 rounded-lg bg-white text-black ${focusRing}`}
                              />
                            </div>
                          </div>

                          <ProgressBar value={krProgress} />

                          {obj.keyResults.length > MIN_KEY_RESULTS && (
                            <button
                              onClick={() => removeKeyResult(obj.id, kr.id)}
                              className={`text-base text-neutral-400 hover:text-black transition-colors ${focusRing}`}
                              aria-label={`Remove key result ${krIdx + 1}`}
                            >
                              Remove key result
                            </button>
                          )}
                        </div>
                      );
                    })}

                    {obj.keyResults.length < MAX_KEY_RESULTS && (
                      <button
                        onClick={() => addKeyResult(obj.id)}
                        className={`px-4 py-2 text-base font-semibold border-2 border-dashed border-neutral-300 rounded-xl text-neutral-500 transition-colors hover:border-black hover:text-black w-full ${focusRing}`}
                      >
                        + Add Key Result
                      </button>
                    )}
                  </div>
                )}
              </div>
            </Animate>
          );
        })}

        {objectives.length === 0 && (
          <Animate animation="fade-in">
            <div className="text-center py-16 border border-dashed border-neutral-300 rounded-2xl">
              <p className="text-lg text-neutral-500">
                No objectives yet. Add one to get started or reset to the template.
              </p>
            </div>
          </Animate>
        )}
      </section>

      {/* Educational section */}
      <section className="px-6 lg:px-12 py-16 border-t border-neutral-200 max-w-7xl mx-auto">
        <Animate animation="fade-up">
          <SectionLabel>Learn</SectionLabel>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-2">
            Understanding OKRs for Marketing
          </h2>
        </Animate>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <Animate animation="fade-up" delay={100}>
            <div className="border border-neutral-200 rounded-2xl p-6">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-3">
                What Are OKRs?
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed">
                OKR stands for Objectives and Key Results. An <strong>Objective</strong> is
                a qualitative, ambitious goal that describes what you want to achieve. <strong>Key
                Results</strong> are measurable outcomes that indicate progress toward the
                objective. Originally popularized by Intel and Google, OKRs help marketing
                teams stay focused on outcomes rather than outputs.
              </p>
            </div>
          </Animate>

          <Animate animation="fade-up" delay={200}>
            <div className="border border-neutral-200 rounded-2xl p-6">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-3">
                Writing Good Objectives
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed">
                Good objectives are <strong>inspiring and actionable</strong>. They should
                be qualitative (not a number), time-bound (one quarter), and aligned with
                broader business goals. Avoid vague phrasing like &ldquo;improve
                marketing.&rdquo; Instead, write &ldquo;Become the go-to resource for
                small business SEO in our market.&rdquo; Limit yourself to 3&ndash;5
                objectives per quarter to maintain focus.
              </p>
            </div>
          </Animate>

          <Animate animation="fade-up" delay={300}>
            <div className="border border-neutral-200 rounded-2xl p-6">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-3">
                Measuring Key Results
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed">
                Every key result needs a <strong>clear metric and target number</strong>.
                Use the format &ldquo;Increase [metric] from [baseline] to
                [target].&rdquo; Aim for 3&ndash;5 key results per objective. Each should
                be independently verifiable — if two people look at the data, they should
                agree on whether the key result was met. A score of 70% is considered a
                strong outcome for stretch goals.
              </p>
            </div>
          </Animate>

          <Animate animation="fade-up" delay={400}>
            <div className="border border-neutral-200 rounded-2xl p-6">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-3">
                Quarterly Review Cadence
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed">
                Run a <strong>weekly check-in</strong> (15 minutes) to update current
                values and flag blockers. Hold a <strong>mid-quarter review</strong> to
                assess whether key results are still achievable or need adjustment. At
                quarter-end, <strong>score each key result</strong> (0&ndash;100%), reflect
                on what worked, and draft objectives for the next quarter. Consistency in
                this cadence is what turns OKRs from a planning exercise into a performance
                engine.
              </p>
            </div>
          </Animate>
        </div>
      </section>
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/marketing-goal-setter" className="border border-gray-200 bg-white px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors">Marketing Goal Setter</Link>
                <Link href="/resources/kpi-dashboard" className="border border-gray-200 bg-white px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors">KPI Dashboard</Link>
                <Link href="/resources/marketing-roi-report" className="border border-gray-200 bg-white px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors">Marketing ROI Report</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-16 border-t border-neutral-200">
        <Animate animation="fade-up">
          <div className="max-w-3xl mx-auto text-center">
            <SectionLabel>Next Step</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-2">
              Need Help Setting Marketing OKRs?
            </h2>
            <p className="text-lg text-neutral-500 leading-relaxed mt-4">
              Our team can help you define measurable marketing objectives tied to real
              business outcomes. Let&rsquo;s build a plan that drives results.
            </p>
            <Link
              href="/contact"
              className={`inline-block mt-8 px-8 py-3.5 text-base font-semibold rounded-full border-2 border-black bg-black text-white transition-colors hover:bg-white hover:text-black ${focusRing}`}
            >
              Get in Touch
            </Link>
          </div>
        </Animate>
      </section>
      <ToolCTA
        toolName="Okr Planner"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "KPI Builder", href: "/resources/kpi-builder" },
          { title: "ROI Calculator", href: "/resources/roi-calculator" },
          { title: "Marketing Audit Scorecard", href: "/resources/marketing-audit-scorecard" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </>
  );
}
