"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type TaskStatus = "To Do" | "In Progress" | "Done" | "Blocked";
type TaskPriority = "P1" | "P2" | "P3";

interface SprintTask {
  id: string;
  title: string;
  assignee: string;
  effort: number;
  status: TaskStatus;
  priority: TaskPriority;
}

interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  goal: string;
  tasks: SprintTask[];
  createdAt: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const STATUSES: TaskStatus[] = ["To Do", "In Progress", "Done", "Blocked"];
const PRIORITIES: TaskPriority[] = ["P1", "P2", "P3"];
const MAX_TASKS = 20;
const MAX_SPRINTS = 5;
const STORAGE_KEY = "markit-sprint-planner";
const FOCUS_CLASSES =
  "focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";

/* ------------------------------------------------------------------ */
/*  Utilities                                                          */
/* ------------------------------------------------------------------ */

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

/* ------------------------------------------------------------------ */
/*  Default Template (8 sample marketing tasks)                        */
/* ------------------------------------------------------------------ */

function defaultTasks(): SprintTask[] {
  return [
    { id: uid(), title: "Draft Q4 blog post: SEO trends", assignee: "Sarah", effort: 5, status: "To Do", priority: "P1" },
    { id: uid(), title: "Design social media ad creatives", assignee: "Marcus", effort: 3, status: "To Do", priority: "P1" },
    { id: uid(), title: "Launch Google Ads campaign", assignee: "Priya", effort: 8, status: "In Progress", priority: "P1" },
    { id: uid(), title: "Write email nurture sequence (3 emails)", assignee: "Sarah", effort: 5, status: "To Do", priority: "P2" },
    { id: uid(), title: "Weekly analytics report", assignee: "James", effort: 2, status: "Done", priority: "P2" },
    { id: uid(), title: "Sprint planning meeting", assignee: "Aisha", effort: 1, status: "Done", priority: "P3" },
    { id: uid(), title: "A/B test landing page headline", assignee: "Marcus", effort: 3, status: "In Progress", priority: "P2" },
    { id: uid(), title: "Competitor ad spend review", assignee: "James", effort: 4, status: "Blocked", priority: "P3" },
  ];
}

function createDefaultSprint(): Sprint {
  const start = todayStr();
  return {
    id: uid(),
    name: "Marketing Sprint 1",
    startDate: start,
    endDate: addDays(start, 14),
    goal: "Launch Q4 campaign assets and establish baseline metrics",
    tasks: defaultTasks(),
    createdAt: new Date().toISOString(),
  };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SprintPlannerPage() {
  const [sprint, setSprint] = useState<Sprint>(createDefaultSprint);
  const [savedSprints, setSavedSprints] = useState<Sprint[]>([]);
  const [loaded, setLoaded] = useState(false);

  /* Filters */
  const [filterAssignee, setFilterAssignee] = useState("");
  const [filterPriority, setFilterPriority] = useState<TaskPriority | "">("");

  /* Task form */
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formAssignee, setFormAssignee] = useState("");
  const [formEffort, setFormEffort] = useState(3);
  const [formStatus, setFormStatus] = useState<TaskStatus>("To Do");
  const [formPriority, setFormPriority] = useState<TaskPriority>("P2");

  /* ---- localStorage ---- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { current: Sprint; saved: Sprint[] };
        if (parsed.current?.tasks?.length) setSprint(parsed.current);
        if (Array.isArray(parsed.saved)) setSavedSprints(parsed.saved);
      }
    } catch {
      /* ignore corrupt data */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ current: sprint, saved: savedSprints }),
      );
    } catch {
      /* storage full */
    }
  }, [sprint, savedSprints, loaded]);

  /* ---- Derived values ---- */
  const assignees = useMemo(() => {
    const set = new Set<string>();
    sprint.tasks.forEach((t) => {
      if (t.assignee) set.add(t.assignee);
    });
    return Array.from(set).sort();
  }, [sprint.tasks]);

  const filteredTasks = useMemo(() => {
    return sprint.tasks.filter((t) => {
      if (filterAssignee && t.assignee !== filterAssignee) return false;
      if (filterPriority && t.priority !== filterPriority) return false;
      return true;
    });
  }, [sprint.tasks, filterAssignee, filterPriority]);

  const totalPoints = sprint.tasks.reduce((s, t) => s + t.effort, 0);
  const completedPoints = sprint.tasks
    .filter((t) => t.status === "Done")
    .reduce((s, t) => s + t.effort, 0);
  const blockedCount = sprint.tasks.filter((t) => t.status === "Blocked").length;
  const velocity = totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;

  /* Burndown indicator */
  const daysPassed = useMemo(() => {
    const start = new Date(sprint.startDate).getTime();
    const now = Date.now();
    const diff = Math.max(0, now - start);
    return Math.min(14, Math.floor(diff / 86400000));
  }, [sprint.startDate]);

  const targetPointsRemaining = Math.round(totalPoints * (1 - daysPassed / 14));
  const actualPointsRemaining = totalPoints - completedPoints;

  /* ---- Handlers ---- */
  const updateSprint = useCallback(
    (patch: Partial<Sprint>) => {
      setSprint((prev) => ({ ...prev, ...patch }));
    },
    [],
  );

  const updateStartDate = useCallback(
    (date: string) => {
      setSprint((prev) => ({
        ...prev,
        startDate: date,
        endDate: addDays(date, 14),
      }));
    },
    [],
  );

  const addTask = useCallback(() => {
    if (!formTitle.trim() || sprint.tasks.length >= MAX_TASKS) return;
    const newTask: SprintTask = {
      id: uid(),
      title: formTitle.trim(),
      assignee: formAssignee.trim() || "Unassigned",
      effort: formEffort,
      status: formStatus,
      priority: formPriority,
    };
    setSprint((prev) => ({ ...prev, tasks: [...prev.tasks, newTask] }));
    setFormTitle("");
    setFormAssignee("");
    setFormEffort(3);
    setFormStatus("To Do");
    setFormPriority("P2");
    setShowForm(false);
  }, [formTitle, formAssignee, formEffort, formStatus, formPriority, sprint.tasks.length]);

  const removeTask = useCallback((id: string) => {
    setSprint((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((t) => t.id !== id),
    }));
  }, []);

  const updateTaskStatus = useCallback((id: string, status: TaskStatus) => {
    setSprint((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
    }));
  }, []);

  const saveSprint = useCallback(() => {
    setSavedSprints((prev) => {
      const updated = [sprint, ...prev.filter((s) => s.id !== sprint.id)].slice(
        0,
        MAX_SPRINTS,
      );
      return updated;
    });
  }, [sprint]);

  const loadSprint = useCallback((s: Sprint) => {
    setSprint(s);
  }, []);

  const deleteSavedSprint = useCallback((id: string) => {
    setSavedSprints((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const newSprint = useCallback(() => {
    setSprint(createDefaultSprint());
  }, []);

  const exportTxt = useCallback(() => {
    const lines: string[] = [];
    lines.push(`Sprint: ${sprint.name}`);
    lines.push(`Goal: ${sprint.goal}`);
    lines.push(`Dates: ${sprint.startDate} to ${sprint.endDate}`);
    lines.push(`Total Points: ${totalPoints} | Completed: ${completedPoints} | Velocity: ${velocity}%`);
    lines.push(`Blocked Tasks: ${blockedCount}`);
    lines.push("");

    for (const status of STATUSES) {
      const tasks = sprint.tasks.filter((t) => t.status === status);
      lines.push(`--- ${status} (${tasks.length}) ---`);
      for (const t of tasks) {
        lines.push(`  [${t.priority}] ${t.title} — ${t.assignee} (${t.effort} pts)`);
      }
      lines.push("");
    }

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${sprint.name.replace(/\s+/g, "-").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [sprint, totalPoints, completedPoints, velocity, blockedCount]);

  /* ---- Kanban column helper ---- */
  function tasksForStatus(status: TaskStatus): SprintTask[] {
    return filteredTasks.filter((t) => t.status === status);
  }

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */

  return (
    <article>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Sprint Planner" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing Sprint Planner
            </h1>
            <p className="text-lg text-neutral-500 leading-relaxed mt-4 max-w-2xl">
              Plan 2-week marketing sprints with a Kanban board, effort estimation, and burndown
              tracking. Assign tasks, monitor velocity, and keep your team focused.
            </p>
          </Animate>
        </div>
      </section>

      {/* Sprint Details */}
      <section aria-label="Sprint Details" className="px-6 lg:px-12 pb-8">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <div className="border border-neutral-200 p-6">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                Sprint Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sprint-name" className="block text-base font-bold text-black mb-1">
                    Sprint Name
                  </label>
                  <input
                    id="sprint-name"
                    type="text"
                    value={sprint.name}
                    onChange={(e) => updateSprint({ name: e.target.value })}
                    className={`w-full border border-neutral-300 px-4 py-3 text-base text-black ${FOCUS_CLASSES}`}
                  />
                </div>
                <div>
                  <label htmlFor="sprint-goal" className="block text-base font-bold text-black mb-1">
                    Sprint Goal
                  </label>
                  <input
                    id="sprint-goal"
                    type="text"
                    value={sprint.goal}
                    onChange={(e) => updateSprint({ goal: e.target.value })}
                    className={`w-full border border-neutral-300 px-4 py-3 text-base text-black ${FOCUS_CLASSES}`}
                  />
                </div>
                <div>
                  <label htmlFor="start-date" className="block text-base font-bold text-black mb-1">
                    Start Date
                  </label>
                  <input
                    id="start-date"
                    type="date"
                    value={sprint.startDate}
                    onChange={(e) => updateStartDate(e.target.value)}
                    className={`w-full border border-neutral-300 px-4 py-3 text-base text-black ${FOCUS_CLASSES}`}
                  />
                </div>
                <div>
                  <label htmlFor="end-date" className="block text-base font-bold text-black mb-1">
                    End Date (auto-calculated)
                  </label>
                  <input
                    id="end-date"
                    type="date"
                    value={sprint.endDate}
                    readOnly
                    className="w-full border border-neutral-200 bg-neutral-50 px-4 py-3 text-base text-neutral-500"
                  />
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* Dashboard */}
      <section aria-label="Sprint Dashboard" className="px-6 lg:px-12 pb-8">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up" delay={60}>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
              Sprint Dashboard
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border border-neutral-200 p-4">
                <p className="text-base text-neutral-500">Total Points</p>
                <p className="text-2xl font-extrabold text-black mt-1">{totalPoints}</p>
              </div>
              <div className="border border-neutral-200 p-4">
                <p className="text-base text-neutral-500">Completed</p>
                <p className="text-2xl font-extrabold text-black mt-1">{completedPoints}</p>
              </div>
              <div className="border border-neutral-200 p-4">
                <p className="text-base text-neutral-500">Velocity</p>
                <p className="text-2xl font-extrabold text-black mt-1">{velocity}%</p>
              </div>
              <div className="border border-neutral-200 p-4">
                <p className="text-base text-neutral-500">Blocked</p>
                <p className="text-2xl font-extrabold text-black mt-1">{blockedCount}</p>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* Burndown Indicator */}
      <section aria-label="Burndown Indicator" className="px-6 lg:px-12 pb-8">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up" delay={90}>
            <div className="border border-neutral-200 p-6">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                Burndown Indicator
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-base text-neutral-500">Day</p>
                  <p className="text-lg font-bold text-black">{daysPassed} of 14</p>
                </div>
                <div>
                  <p className="text-base text-neutral-500">Target Remaining</p>
                  <p className="text-lg font-bold text-black">{targetPointsRemaining} pts</p>
                </div>
                <div>
                  <p className="text-base text-neutral-500">Actual Remaining</p>
                  <p className="text-lg font-bold text-black">{actualPointsRemaining} pts</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-base text-neutral-500 mb-1">
                  <span>Progress</span>
                  <span>{velocity}%</span>
                </div>
                <div className="w-full bg-neutral-100 h-4">
                  <div
                    className="bg-black h-4 transition-all motion-reduce:transition-none"
                    style={{ width: `${velocity}%` }}
                  />
                </div>
                <p className="text-base text-neutral-500 mt-2">
                  {actualPointsRemaining <= targetPointsRemaining
                    ? "On track or ahead of target pace."
                    : `Behind target pace by ${actualPointsRemaining - targetPointsRemaining} points. Consider re-prioritizing or unblocking tasks.`}
                </p>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* Filters & Actions */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-4">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up" delay={120}>
            <div className="flex flex-wrap items-end gap-4">
              <div>
                <label htmlFor="filter-assignee" className="block text-base font-bold text-black mb-1">
                  Filter by Assignee
                </label>
                <select
                  id="filter-assignee"
                  value={filterAssignee}
                  onChange={(e) => setFilterAssignee(e.target.value)}
                  className={`border border-neutral-300 px-4 py-3 text-base text-black ${FOCUS_CLASSES}`}
                >
                  <option value="">All</option>
                  {assignees.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="filter-priority" className="block text-base font-bold text-black mb-1">
                  Filter by Priority
                </label>
                <select
                  id="filter-priority"
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value as TaskPriority | "")}
                  className={`border border-neutral-300 px-4 py-3 text-base text-black ${FOCUS_CLASSES}`}
                >
                  <option value="">All</option>
                  {PRIORITIES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setShowForm(true)}
                disabled={sprint.tasks.length >= MAX_TASKS}
                className={`bg-black text-white px-6 py-3 text-base font-bold transition-colors motion-reduce:transition-none ${FOCUS_CLASSES} ${
                  sprint.tasks.length >= MAX_TASKS
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-neutral-800"
                }`}
              >
                + Add Task {sprint.tasks.length}/{MAX_TASKS}
              </button>
              <button
                onClick={exportTxt}
                className={`border border-neutral-300 px-6 py-3 text-base font-bold text-black hover:bg-neutral-100 transition-colors motion-reduce:transition-none ${FOCUS_CLASSES}`}
              >
                Export .txt
              </button>
            </div>
          </Animate>
        </div>
      </section>

      {/* Add Task Form */}
      {showForm && (
        <section aria-label="New Task" className="px-6 lg:px-12 pb-8">
          <div className="max-w-5xl mx-auto">
            <div className="border border-neutral-200 p-6">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                New Task
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="task-title" className="block text-base font-bold text-black mb-1">
                    Title
                  </label>
                  <input
                    id="task-title"
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Write blog post draft"
                    className={`w-full border border-neutral-300 px-4 py-3 text-base text-black ${FOCUS_CLASSES}`}
                  />
                </div>
                <div>
                  <label htmlFor="task-assignee" className="block text-base font-bold text-black mb-1">
                    Assignee
                  </label>
                  <input
                    id="task-assignee"
                    type="text"
                    value={formAssignee}
                    onChange={(e) => setFormAssignee(e.target.value)}
                    placeholder="e.g. Sarah"
                    className={`w-full border border-neutral-300 px-4 py-3 text-base text-black ${FOCUS_CLASSES}`}
                  />
                </div>
                <div>
                  <label htmlFor="task-effort" className="block text-base font-bold text-black mb-1">
                    Effort Points (1-8)
                  </label>
                  <input
                    id="task-effort"
                    type="number"
                    min={1}
                    max={8}
                    value={formEffort}
                    onChange={(e) =>
                      setFormEffort(Math.max(1, Math.min(8, parseInt(e.target.value) || 1)))
                    }
                    className={`w-full border border-neutral-300 px-4 py-3 text-base text-black ${FOCUS_CLASSES}`}
                  />
                </div>
                <div>
                  <label htmlFor="task-status" className="block text-base font-bold text-black mb-1">
                    Status
                  </label>
                  <select
                    id="task-status"
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as TaskStatus)}
                    className={`w-full border border-neutral-300 px-4 py-3 text-base text-black ${FOCUS_CLASSES}`}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="task-priority" className="block text-base font-bold text-black mb-1">
                    Priority
                  </label>
                  <select
                    id="task-priority"
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as TaskPriority)}
                    className={`w-full border border-neutral-300 px-4 py-3 text-base text-black ${FOCUS_CLASSES}`}
                  >
                    {PRIORITIES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={addTask}
                  disabled={!formTitle.trim()}
                  className={`bg-black text-white px-6 py-3 text-base font-bold transition-colors motion-reduce:transition-none ${FOCUS_CLASSES} ${
                    !formTitle.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-neutral-800"
                  }`}
                >
                  Add Task
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className={`border border-neutral-300 px-6 py-3 text-base font-bold text-black hover:bg-neutral-100 transition-colors motion-reduce:transition-none ${FOCUS_CLASSES}`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Kanban Board */}
      <section aria-label="Kanban Board" className="px-6 lg:px-12 pb-12">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up" delay={150}>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
              Kanban Board
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {STATUSES.map((status) => {
                const columnTasks = tasksForStatus(status);
                return (
                  <div key={status} className="border border-neutral-200">
                    <div className="bg-neutral-100 px-4 py-3 border-b border-neutral-200">
                      <h3 className="text-base font-bold text-black">
                        {status}{" "}
                        <span className="font-normal text-neutral-500">({columnTasks.length})</span>
                      </h3>
                    </div>
                    <div className="p-3 space-y-3 min-h-[120px]">
                      {columnTasks.length === 0 && (
                        <p className="text-base text-neutral-400 text-center py-6">No tasks</p>
                      )}
                      {columnTasks.map((task) => (
                        <div
                          key={task.id}
                          className="border border-neutral-200 p-3"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-base font-bold text-black leading-snug">
                              {task.title}
                            </p>
                            <button
                              onClick={() => removeTask(task.id)}
                              aria-label={`Remove ${task.title}`}
                              className={`text-base text-neutral-400 hover:text-black transition-colors motion-reduce:transition-none shrink-0 ${FOCUS_CLASSES}`}
                            >
                              &times;
                            </button>
                          </div>
                          <p className="text-base text-neutral-500 mt-1">
                            {task.assignee} &middot; {task.effort} pts &middot; {task.priority}
                          </p>
                          <select
                            value={task.status}
                            onChange={(e) =>
                              updateTaskStatus(task.id, e.target.value as TaskStatus)
                            }
                            aria-label={`Change status for ${task.title}`}
                            className={`mt-2 w-full border border-neutral-200 px-2 py-1 text-base text-black ${FOCUS_CLASSES}`}
                          >
                            {STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Animate>
        </div>
      </section>

      {/* Save / Load Sprints */}
      <section aria-label="Saved Sprints" className="px-6 lg:px-12 pb-12">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <div className="border border-neutral-200 p-6">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                Saved Sprints
              </h2>
              <div className="flex flex-wrap gap-3 mb-4">
                <button
                  onClick={saveSprint}
                  className={`bg-black text-white px-6 py-3 text-base font-bold hover:bg-neutral-800 transition-colors motion-reduce:transition-none ${FOCUS_CLASSES}`}
                >
                  Save Current Sprint
                </button>
                <button
                  onClick={newSprint}
                  className={`border border-neutral-300 px-6 py-3 text-base font-bold text-black hover:bg-neutral-100 transition-colors motion-reduce:transition-none ${FOCUS_CLASSES}`}
                >
                  New Sprint
                </button>
              </div>
              <p className="text-base text-neutral-500 mb-4">
                Up to {MAX_SPRINTS} sprints saved in your browser. Newest first.
              </p>
              {savedSprints.length === 0 && (
                <p className="text-base text-neutral-400">No saved sprints yet.</p>
              )}
              {savedSprints.map((s) => (
                <div
                  key={s.id}
                  className="flex flex-wrap items-center justify-between gap-3 border border-neutral-200 p-4 mb-2"
                >
                  <div>
                    <p className="text-base font-bold text-black">{s.name}</p>
                    <p className="text-base text-neutral-500">
                      {s.startDate} to {s.endDate} &middot; {s.tasks.length} tasks
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => loadSprint(s)}
                      className={`border border-neutral-300 px-4 py-2 text-base font-bold text-black hover:bg-neutral-100 transition-colors motion-reduce:transition-none ${FOCUS_CLASSES}`}
                    >
                      Load
                    </button>
                    <button
                      onClick={() => deleteSavedSprint(s.id)}
                      className={`border border-neutral-300 px-4 py-2 text-base font-bold text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors motion-reduce:transition-none ${FOCUS_CLASSES}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* Educational Section */}
      <section aria-label="What is Agile Marketing?" className="px-6 lg:px-12 py-16">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              Agile Marketing: A Practical Guide
            </h2>
            <div className="space-y-8 text-base text-neutral-500 leading-relaxed">
              <div>
                <h3 className="font-bold text-black mb-2">What is Agile Marketing?</h3>
                <p>
                  Agile marketing applies sprint-based planning from software development to
                  marketing teams. Instead of committing to rigid quarterly plans, teams work in
                  short 2-week cycles. Each sprint has a clear goal, a set of prioritized tasks, and
                  a review at the end. This lets you respond to data faster, test more ideas, and
                  stop investing in things that are not working.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Sprint Planning Tips</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    Set one clear sprint goal that the whole team can rally around. A goal like
                    &ldquo;launch paid social campaign and establish baseline CPL&rdquo; is better
                    than a vague &ldquo;work on social media.&rdquo;
                  </li>
                  <li>
                    Limit work in progress. If everything is a priority, nothing is. Aim for no more
                    than 3 P1 tasks per sprint.
                  </li>
                  <li>
                    Include buffer capacity. Plan to 80% of your total points to handle unexpected
                    requests and blockers.
                  </li>
                  <li>
                    Keep standup meetings under 15 minutes. Focus on blockers, not status updates.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Estimating Effort Points</h3>
                <p>
                  Effort points are relative, not hours. A 1-point task is trivial (sending a
                  scheduled email). A 3-point task is moderate (writing a blog draft). A 5-point task
                  is significant (building a landing page). An 8-point task is a sprint-defining
                  effort (launching a full ad campaign). If a task feels larger than 8, break it into
                  smaller pieces.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Running a Sprint Retrospective</h3>
                <p>
                  At the end of each sprint, hold a 30-minute retrospective with the team. Use this
                  simple format:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>
                    <strong className="text-black">What went well?</strong> — Celebrate wins and
                    effective practices worth repeating.
                  </li>
                  <li>
                    <strong className="text-black">What did not go well?</strong> — Identify
                    blockers, miscommunications, or process failures without blame.
                  </li>
                  <li>
                    <strong className="text-black">What will we change next sprint?</strong> — Pick
                    one or two concrete improvements. More than that rarely sticks.
                  </li>
                </ul>
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
              Need Help Running Agile Marketing Sprints?
            </h2>
            <p className="text-lg text-neutral-400 mt-4 mb-8">
              Our team can set up sprint workflows, define KPIs, and coach your marketing team
              through the transition to agile. Get in touch to learn more.
            </p>
            <Link
              href="/contact"
              className={`inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2`}
            >
              Talk to Our Team &rarr;
            </Link>
          </Animate>
        </div>
      </section>

      {/* JSON-LD */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Sprint Planner | Free Tool | Markit Media",
          description:
            "Free 2-week marketing sprint planner with Kanban board, burndown tracking, and effort estimation.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          url: "https://themarkitmedia.com/en/resources/sprint-planner",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Sprint Planner"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Stakeholder Report", href: "/resources/stakeholder-report" },
          { title: "Startup Marketing Guide", href: "/resources/startup-marketing-guide" },
          { title: "Social Media Planner", href: "/resources/social-media-planner" },
          { title: "Social Media Roi", href: "/resources/social-media-roi" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
