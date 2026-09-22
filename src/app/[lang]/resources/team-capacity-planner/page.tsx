"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

const ROLES = [
  "Strategist",
  "Designer",
  "Developer",
  "Copywriter",
  "Analyst",
  "PM",
  "Social Media Manager",
  "SEO Specialist",
] as const;

type Role = (typeof ROLES)[number];

const PRIORITIES = ["High", "Medium", "Low"] as const;
type Priority = (typeof PRIORITIES)[number];

interface TeamMember {
  id: string;
  name: string;
  role: Role;
  weeklyHours: number;
  hourlyCost: number;
}

interface RoleAllocation {
  role: Role;
  hours: number;
}

interface Project {
  id: string;
  name: string;
  priority: Priority;
  roleAllocations: RoleAllocation[];
  deadline: string;
}

interface CapacityByRole {
  role: Role;
  totalHours: number;
  allocatedHours: number;
  remainingHours: number;
  utilization: number;
}

const STORAGE_KEY = "markit-team-capacity-planner";

/* ------------------------------------------------------------------ */
/*  Default Template Data                                              */
/* ------------------------------------------------------------------ */

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

function defaultMembers(): TeamMember[] {
  return [
    { id: uid(), name: "Sarah Chen", role: "Strategist", weeklyHours: 40, hourlyCost: 85 },
    { id: uid(), name: "Marcus Rivera", role: "Designer", weeklyHours: 40, hourlyCost: 75 },
    { id: uid(), name: "Priya Patel", role: "Developer", weeklyHours: 40, hourlyCost: 90 },
    { id: uid(), name: "James O'Brien", role: "Copywriter", weeklyHours: 30, hourlyCost: 65 },
    { id: uid(), name: "Aisha Kwame", role: "Social Media Manager", weeklyHours: 40, hourlyCost: 60 },
  ];
}

function defaultProjects(): Project[] {
  const inTwoWeeks = new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10);
  const inFourWeeks = new Date(Date.now() + 28 * 86400000).toISOString().slice(0, 10);
  const inSixWeeks = new Date(Date.now() + 42 * 86400000).toISOString().slice(0, 10);
  return [
    {
      id: uid(),
      name: "Brand Refresh Campaign",
      priority: "High",
      roleAllocations: [
        { role: "Strategist", hours: 20 },
        { role: "Designer", hours: 30 },
        { role: "Copywriter", hours: 15 },
      ],
      deadline: inTwoWeeks,
    },
    {
      id: uid(),
      name: "Q4 Social Media Push",
      priority: "Medium",
      roleAllocations: [
        { role: "Social Media Manager", hours: 25 },
        { role: "Copywriter", hours: 10 },
        { role: "Designer", hours: 10 },
      ],
      deadline: inFourWeeks,
    },
    {
      id: uid(),
      name: "Website Performance Overhaul",
      priority: "High",
      roleAllocations: [
        { role: "Developer", hours: 35 },
        { role: "Designer", hours: 10 },
        { role: "Strategist", hours: 5 },
      ],
      deadline: inSixWeeks,
    },
  ];
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TeamCapacityPlannerPage() {
  const [members, setMembers] = useState<TeamMember[]>(defaultMembers);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [loaded, setLoaded] = useState(false);

  /* ---- localStorage persistence ---- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { members: TeamMember[]; projects: Project[] };
        if (parsed.members?.length) setMembers(parsed.members);
        if (parsed.projects?.length) setProjects(parsed.projects);
      }
    } catch {
      /* ignore corrupt data */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ members, projects }));
    } catch {
      /* storage full — silently ignore */
    }
  }, [members, projects, loaded]);

  /* ---- Calculations ---- */
  const capacityByRole: CapacityByRole[] = ROLES.map((role) => {
    const totalHours = members
      .filter((m) => m.role === role)
      .reduce((sum, m) => sum + m.weeklyHours, 0);
    const allocatedHours = projects.reduce(
      (sum, p) =>
        sum +
        p.roleAllocations
          .filter((ra) => ra.role === role)
          .reduce((s, ra) => s + ra.hours, 0),
      0,
    );
    const remainingHours = totalHours - allocatedHours;
    const utilization = totalHours > 0 ? Math.round((allocatedHours / totalHours) * 100) : 0;
    return { role, totalHours, allocatedHours, remainingHours, utilization };
  }).filter((c) => c.totalHours > 0 || c.allocatedHours > 0);

  const totalTeamHours = members.reduce((s, m) => s + m.weeklyHours, 0);
  const totalAllocatedHours = projects.reduce(
    (s, p) => s + p.roleAllocations.reduce((rs, ra) => rs + ra.hours, 0),
    0,
  );
  const overallUtilization = totalTeamHours > 0 ? Math.round((totalAllocatedHours / totalTeamHours) * 100) : 0;
  const totalWeeklyCost = members.reduce((s, m) => s + m.weeklyHours * m.hourlyCost, 0);
  const overAllocatedRoles = capacityByRole.filter((c) => c.utilization > 100);

  /* ---- Member CRUD ---- */
  const addMember = useCallback(() => {
    if (members.length >= 10) return;
    setMembers((prev) => [
      ...prev,
      { id: uid(), name: "", role: "Strategist", weeklyHours: 40, hourlyCost: 0 },
    ]);
  }, [members.length]);

  const updateMember = useCallback((id: string, field: keyof TeamMember, value: string | number) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    );
  }, []);

  const removeMember = useCallback((id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }, []);

  /* ---- Project CRUD ---- */
  const addProject = useCallback(() => {
    if (projects.length >= 10) return;
    setProjects((prev) => [
      ...prev,
      {
        id: uid(),
        name: "",
        priority: "Medium",
        roleAllocations: [{ role: "Strategist", hours: 0 }],
        deadline: "",
      },
    ]);
  }, [projects.length]);

  const updateProject = useCallback(
    (id: string, field: keyof Omit<Project, "id" | "roleAllocations">, value: string) => {
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
      );
    },
    [],
  );

  const removeProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const addRoleToProject = useCallback((projectId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        if (p.roleAllocations.length >= 8) return p;
        return {
          ...p,
          roleAllocations: [...p.roleAllocations, { role: "Strategist", hours: 0 }],
        };
      }),
    );
  }, []);

  const updateRoleAllocation = useCallback(
    (projectId: string, index: number, field: keyof RoleAllocation, value: string | number) => {
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id !== projectId) return p;
          const updated = [...p.roleAllocations];
          updated[index] = { ...updated[index], [field]: value };
          return { ...p, roleAllocations: updated };
        }),
      );
    },
    [],
  );

  const removeRoleFromProject = useCallback((projectId: string, index: number) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          roleAllocations: p.roleAllocations.filter((_, i) => i !== index),
        };
      }),
    );
  }, []);

  /* ---- Export ---- */
  const exportAsTxt = useCallback(() => {
    const lines: string[] = [];
    lines.push("MARKETING TEAM CAPACITY PLAN");
    lines.push(`Generated: ${new Date().toLocaleDateString()}`);
    lines.push("=".repeat(50));
    lines.push("");

    lines.push("TEAM MEMBERS");
    lines.push("-".repeat(30));
    members.forEach((m) => {
      lines.push(`${m.name || "(unnamed)"} | ${m.role} | ${m.weeklyHours}h/week | $${m.hourlyCost}/hr`);
    });
    lines.push("");

    lines.push("PROJECTS / CAMPAIGNS");
    lines.push("-".repeat(30));
    projects.forEach((p) => {
      lines.push(`${p.name || "(unnamed)"} [${p.priority}] — Deadline: ${p.deadline || "Not set"}`);
      p.roleAllocations.forEach((ra) => {
        lines.push(`  ${ra.role}: ${ra.hours}h`);
      });
    });
    lines.push("");

    lines.push("CAPACITY OVERVIEW");
    lines.push("-".repeat(30));
    lines.push(`Total Team Hours: ${totalTeamHours}h/week`);
    lines.push(`Allocated Hours: ${totalAllocatedHours}h/week`);
    lines.push(`Overall Utilization: ${overallUtilization}%`);
    lines.push(`Weekly Team Cost: $${totalWeeklyCost.toLocaleString()}`);
    lines.push("");

    lines.push("CAPACITY BY ROLE");
    lines.push("-".repeat(30));
    capacityByRole.forEach((c) => {
      const flag = c.utilization > 100 ? " *** OVER-ALLOCATED ***" : "";
      lines.push(
        `${c.role}: ${c.allocatedHours}/${c.totalHours}h (${c.utilization}% utilized)${flag}`,
      );
    });

    if (overAllocatedRoles.length > 0) {
      lines.push("");
      lines.push("ALERTS");
      lines.push("-".repeat(30));
      overAllocatedRoles.forEach((c) => {
        lines.push(
          `${c.role} is over-allocated at ${c.utilization}% (${c.allocatedHours - c.totalHours}h over capacity)`,
        );
      });
    }

    lines.push("");
    lines.push("Generated by Markit Media Team Capacity Planner");
    lines.push("https://themarkitmedia.com/en/resources/team-capacity-planner");

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "team-capacity-plan.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [members, projects, totalTeamHours, totalAllocatedHours, overallUtilization, totalWeeklyCost, capacityByRole, overAllocatedRoles]);

  /* ---- Reset ---- */
  const resetToTemplate = useCallback(() => {
    setMembers(defaultMembers());
    setProjects(defaultProjects());
  }, []);

  /* ---- Shared classes ---- */
  const inputCls =
    "w-full border border-neutral-300 bg-white text-black px-4 py-3 text-base min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";
  const selectCls =
    "w-full border border-neutral-300 bg-white text-black px-4 py-3 text-base min-h-[44px] appearance-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";
  const btnPrimary =
    "inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 font-bold text-base hover:bg-neutral-800 transition-colors min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";
  const btnSecondary =
    "inline-flex items-center justify-center gap-2 border border-neutral-300 bg-white text-black px-6 py-3 font-bold text-base hover:bg-neutral-100 transition-colors min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";
  const btnDanger =
    "inline-flex items-center justify-center border border-neutral-300 bg-white text-black px-3 py-2 text-base hover:bg-neutral-100 transition-colors min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";

  return (
    <article className="min-h-screen">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Team Capacity Planner" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-16 pb-8">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Interactive Tools</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing Team Capacity Planner
            </h1>
            <p className="text-lg text-neutral-500 leading-relaxed mt-4 max-w-2xl">
              Map your team against active projects, spot bottlenecks before they become
              fires, and keep utilization healthy. Add your team members and campaigns below
              to get a real-time capacity overview.
            </p>
          </Animate>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TEAM MEMBERS                                                 */}
      {/* ============================================================ */}
      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              Team Members
              <span className="ml-2 text-base font-normal text-neutral-400">
                ({members.length}/10)
              </span>
            </h2>

            <div className="space-y-4">
              {members.map((m) => (
                <div
                  key={m.id}
                  className="border border-neutral-200 p-4 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto_auto_auto] gap-4 items-end"
                >
                  <div>
                    <label className="block text-base font-bold text-black mb-1">Name</label>
                    <input
                      type="text"
                      className={inputCls}
                      value={m.name}
                      onChange={(e) => updateMember(m.id, "name", e.target.value)}
                      placeholder="Team member name"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-bold text-black mb-1">Role</label>
                    <select
                      className={selectCls}
                      value={m.role}
                      onChange={(e) => updateMember(m.id, "role", e.target.value as Role)}
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-base font-bold text-black mb-1">Hours/wk</label>
                    <input
                      type="number"
                      className={inputCls}
                      value={m.weeklyHours}
                      min={0}
                      max={80}
                      onChange={(e) =>
                        updateMember(m.id, "weeklyHours", Math.max(0, Number(e.target.value)))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-base font-bold text-black mb-1">$/hr</label>
                    <input
                      type="number"
                      className={inputCls}
                      value={m.hourlyCost || ""}
                      min={0}
                      onChange={(e) =>
                        updateMember(m.id, "hourlyCost", Math.max(0, Number(e.target.value)))
                      }
                      placeholder="0"
                    />
                  </div>
                  <button
                    type="button"
                    className={btnDanger}
                    onClick={() => removeMember(m.id)}
                    aria-label={`Remove ${m.name || "team member"}`}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {members.length < 10 && (
              <button type="button" className={`${btnSecondary} mt-4`} onClick={addMember}>
                + Add Team Member
              </button>
            )}
          </Animate>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PROJECTS / CAMPAIGNS                                         */}
      {/* ============================================================ */}
      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              Projects / Campaigns
              <span className="ml-2 text-base font-normal text-neutral-400">
                ({projects.length}/10)
              </span>
            </h2>

            <div className="space-y-6">
              {projects.map((p) => (
                <div key={p.id} className="border border-neutral-200 p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-4 items-end">
                    <div>
                      <label className="block text-base font-bold text-black mb-1">
                        Project Name
                      </label>
                      <input
                        type="text"
                        className={inputCls}
                        value={p.name}
                        onChange={(e) => updateProject(p.id, "name", e.target.value)}
                        placeholder="Campaign or project name"
                      />
                    </div>
                    <div>
                      <label className="block text-base font-bold text-black mb-1">Priority</label>
                      <select
                        className={selectCls}
                        value={p.priority}
                        onChange={(e) =>
                          updateProject(p.id, "priority", e.target.value)
                        }
                      >
                        {PRIORITIES.map((pr) => (
                          <option key={pr} value={pr}>
                            {pr}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-base font-bold text-black mb-1">Deadline</label>
                      <input
                        type="date"
                        className={inputCls}
                        value={p.deadline}
                        onChange={(e) => updateProject(p.id, "deadline", e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      className={btnDanger}
                      onClick={() => removeProject(p.id)}
                      aria-label={`Remove ${p.name || "project"}`}
                    >
                      Remove
                    </button>
                  </div>

                  {/* Role allocations */}
                  <div className="space-y-2">
                    <p className="text-base font-bold text-black">Required Roles &amp; Hours</p>
                    {p.roleAllocations.map((ra, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-[1fr_auto_auto] gap-3 items-end"
                      >
                        <select
                          className={selectCls}
                          value={ra.role}
                          onChange={(e) =>
                            updateRoleAllocation(p.id, idx, "role", e.target.value as Role)
                          }
                          aria-label={`Role for allocation ${idx + 1}`}
                        >
                          {ROLES.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          className={`${inputCls} w-28`}
                          value={ra.hours || ""}
                          min={0}
                          onChange={(e) =>
                            updateRoleAllocation(
                              p.id,
                              idx,
                              "hours",
                              Math.max(0, Number(e.target.value)),
                            )
                          }
                          placeholder="Hours"
                          aria-label={`Hours for ${ra.role}`}
                        />
                        <button
                          type="button"
                          className={btnDanger}
                          onClick={() => removeRoleFromProject(p.id, idx)}
                          aria-label={`Remove ${ra.role} from ${p.name || "project"}`}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    {p.roleAllocations.length < 8 && (
                      <button
                        type="button"
                        className="text-base font-bold text-black underline hover:no-underline mt-1 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        onClick={() => addRoleToProject(p.id)}
                      >
                        + Add Role
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {projects.length < 10 && (
              <button type="button" className={`${btnSecondary} mt-4`} onClick={addProject}>
                + Add Project
              </button>
            )}
          </Animate>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CAPACITY OVERVIEW DASHBOARD                                  */}
      {/* ============================================================ */}
      <section className="px-6 lg:px-12 py-12 bg-neutral-50">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-8">
              Capacity Overview
            </h2>

            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { label: "Total Team Hours", value: `${totalTeamHours}h/wk` },
                { label: "Allocated Hours", value: `${totalAllocatedHours}h/wk` },
                {
                  label: "Utilization Rate",
                  value: `${overallUtilization}%`,
                  alert: overallUtilization > 100,
                },
                {
                  label: "Weekly Team Cost",
                  value: `$${totalWeeklyCost.toLocaleString()}`,
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className={`border p-6 ${card.alert ? "border-black bg-white" : "border-neutral-200 bg-white"}`}
                >
                  <p className="text-base text-neutral-500">{card.label}</p>
                  <p
                    className={`text-2xl font-extrabold mt-1 ${card.alert ? "text-black" : "text-black"}`}
                  >
                    {card.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Over-allocation alerts */}
            {overAllocatedRoles.length > 0 && (
              <div className="border-2 border-black bg-white p-6 mb-10" role="alert">
                <p className="text-base font-extrabold text-black mb-3">
                  Over-Allocated Roles
                </p>
                <ul className="space-y-2">
                  {overAllocatedRoles.map((c) => (
                    <li
                      key={c.role}
                      className="text-base text-black pl-4 border-l-2 border-black"
                    >
                      <span className="font-bold">{c.role}</span> is at{" "}
                      {c.utilization}% utilization ({c.allocatedHours - c.totalHours}h over
                      capacity). Consider redistributing work or adding headcount.
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Per-role capacity bars */}
            <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
              Utilization by Role
            </h3>
            {capacityByRole.length === 0 ? (
              <p className="text-base text-neutral-500">
                Add team members to see capacity breakdown.
              </p>
            ) : (
              <div className="space-y-4">
                {capacityByRole.map((c) => {
                  const barWidth = Math.min(c.utilization, 100);
                  const isOver = c.utilization > 100;
                  return (
                    <div key={c.role}>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-base font-bold text-black">{c.role}</span>
                        <span className={`text-base font-bold ${isOver ? "text-black" : "text-neutral-600"}`}>
                          {c.utilization}%
                          {isOver && " (over-allocated)"}
                        </span>
                      </div>
                      <div className="w-full h-6 bg-neutral-200 relative">
                        <div
                          className="h-full bg-black transition-all"
                          style={{ width: `${barWidth}%` }}
                        />
                        {isOver && (
                          <div
                            className="absolute top-0 right-0 h-full bg-neutral-400"
                            style={{ width: `${100 - barWidth}%` }}
                          />
                        )}
                      </div>
                      <p className="text-base text-neutral-500 mt-1">
                        {c.allocatedHours}h allocated / {c.totalHours}h available
                        {c.remainingHours >= 0
                          ? ` — ${c.remainingHours}h remaining`
                          : ` — ${Math.abs(c.remainingHours)}h over`}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </Animate>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  ACTION BUTTONS                                               */}
      {/* ============================================================ */}
      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-4">
          <button type="button" className={btnPrimary} onClick={exportAsTxt}>
            Export as .txt
          </button>
          <button type="button" className={btnSecondary} onClick={resetToTemplate}>
            Reset to Template
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  EDUCATIONAL SECTION                                          */}
      {/* ============================================================ */}
      <section className="px-6 lg:px-12 py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Learn</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mb-8">
              Capacity Planning Essentials
            </h2>

            <div className="space-y-10">
              {/* Basics */}
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  Capacity Planning Basics
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Capacity planning matches your available team hours against the work that
                  needs to get done. The goal is not to fill every hour — it is to maintain a
                  sustainable utilization rate (typically 70-85%) that accounts for meetings,
                  context-switching, and unplanned requests. Teams that consistently run above
                  90% utilization accumulate technical and creative debt that shows up as
                  declining quality, missed deadlines, and turnover.
                </p>
              </div>

              {/* Burnout */}
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  Avoiding Burnout
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Marketing teams are particularly susceptible to burnout because campaign
                  deadlines are often fixed and the volume of channels keeps growing. Build a
                  buffer of 15-20% unallocated time per person. Rotate high-intensity
                  projects so the same people are not always on the urgent work. Track
                  utilization weekly — if a role stays above 90% for three consecutive weeks,
                  treat it as an escalation, not business as usual.
                </p>
              </div>

              {/* Resource Leveling */}
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  Resource Leveling
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Resource leveling redistributes work so that no single role or person is
                  overloaded while others sit idle. Start by identifying the bottleneck role
                  — the one closest to or above 100% utilization. Then look at whether any
                  tasks assigned to that role could be handled by an adjacent role with
                  available capacity. Stagger project start dates when possible; launching
                  everything at once creates peak demand that your team cannot sustain.
                </p>
              </div>

              {/* Hire vs Outsource */}
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  When to Hire vs. Outsource
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  If a role has been over 85% utilized for two or more months and the
                  workload is not seasonal, it is time to add headcount. Hire when the work
                  requires deep institutional knowledge, ongoing relationship management, or
                  strategic judgment. Outsource when you need specialized skills for a
                  defined period (a website rebuild, a video series, a one-time audit) or when
                  the volume spike is clearly temporary. An agency partner can also serve as
                  elastic capacity — filling gaps during peak periods without the overhead of
                  a permanent hire.
                </p>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <a href="/resources/meeting-agenda-builder" className="border border-gray-200 bg-white px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors">Meeting Agenda Builder</a>
                <a href="/resources/marketing-timeline-planner" className="border border-gray-200 bg-white px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors">Marketing Timeline Planner</a>
                <a href="/resources/scope-of-work-generator" className="border border-gray-200 bg-white px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors">Scope of Work Generator</a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA                                                          */}
      {/* ============================================================ */}
      <section className="bg-black text-white px-6 lg:px-12 py-16 text-center">
        <Animate animation="fade-up">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold mb-4">
            Need Help Scaling Your Team?
          </h2>
          <p className="text-base text-neutral-300 mb-8 max-w-2xl mx-auto">
            Whether you need an extra pair of hands for a campaign sprint or a long-term
            resource strategy, our team can help you plan and execute without the growing pains.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-black font-bold px-8 py-3 text-base hover:bg-neutral-200 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Get in Touch
          </Link>
        </Animate>
      </section>

      {/* ============================================================ */}
      {/*  JSON-LD                                                      */}
      {/* ============================================================ */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Team Capacity Planner",
          description:
            "Plan your marketing team workload with our free capacity planner. Add team members and projects, visualize utilization per role, spot over-allocation, and export your plan.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          url: "https://themarkitmedia.com/en/resources/team-capacity-planner",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          publisher: {
            "@type": "Organization",
            name: "Markit Media",
            url: "https://themarkitmedia.com",
          },
        }}
      />
    
      <ToolCTA
        toolName="Team Capacity Planner"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Stakeholder Report", href: "/resources/stakeholder-report" },
          { title: "Startup Marketing Guide", href: "/resources/startup-marketing-guide" },
          { title: "Tech Stack Advisor", href: "/resources/tech-stack-advisor" },
          { title: "Utm Builder", href: "/resources/utm-builder" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
