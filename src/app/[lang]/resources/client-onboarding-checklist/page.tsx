"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ServiceKey =
  | "seo"
  | "ppc"
  | "social"
  | "content"
  | "email"
  | "branding"
  | "webdev"
  | "analytics";

interface ChecklistItem {
  id: string;
  text: string;
  services: ServiceKey[] | "all"; // "all" = always shown regardless of selection
}

interface Phase {
  key: string;
  title: string;
  description: string;
  items: ChecklistItem[];
}

interface CustomItem {
  id: string;
  text: string;
  phaseKey: string;
}

/* ------------------------------------------------------------------ */
/*  Service definitions                                                */
/* ------------------------------------------------------------------ */

const SERVICES: { key: ServiceKey; label: string }[] = [
  { key: "seo", label: "SEO" },
  { key: "ppc", label: "PPC" },
  { key: "social", label: "Social Media" },
  { key: "content", label: "Content Marketing" },
  { key: "email", label: "Email Marketing" },
  { key: "branding", label: "Branding" },
  { key: "webdev", label: "Web Development" },
  { key: "analytics", label: "Analytics Setup" },
];

/* ------------------------------------------------------------------ */
/*  Phase definitions                                                  */
/* ------------------------------------------------------------------ */

const PHASES: Phase[] = [
  {
    key: "discovery",
    title: "Phase 1: Discovery",
    description:
      "Gather foundational materials and align on objectives before any work begins.",
    items: [
      { id: "d1", text: "Collect brand guidelines (logo, fonts, colours, tone of voice)", services: "all" },
      { id: "d2", text: "Document target audience profiles and demographics", services: "all" },
      { id: "d3", text: "Compile competitor list with URLs and notes", services: "all" },
      { id: "d4", text: "Define primary goals and KPIs for the engagement", services: "all" },
      { id: "d5", text: "Obtain access to existing analytics dashboards", services: "all" },
      { id: "d6", text: "Review previous marketing reports or performance data", services: "all" },
      { id: "d7", text: "Identify key stakeholders and decision-makers", services: "all" },
      { id: "d8", text: "Agree on project timeline and milestones", services: "all" },
    ],
  },
  {
    key: "access",
    title: "Phase 2: Access & Credentials",
    description:
      "Secure logins and permissions for every platform relevant to the selected services.",
    items: [
      { id: "a1", text: "Google Analytics access (viewer or editor role)", services: ["seo", "ppc", "analytics", "webdev"] },
      { id: "a2", text: "Google Ads account access", services: ["ppc"] },
      { id: "a3", text: "Google Search Console access", services: ["seo", "analytics"] },
      { id: "a4", text: "Meta Business Suite / Ads Manager access", services: ["ppc", "social"] },
      { id: "a5", text: "Website CMS admin or editor access", services: ["seo", "content", "webdev"] },
      { id: "a6", text: "Email marketing platform access (e.g. Mailchimp, Klaviyo)", services: ["email"] },
      { id: "a7", text: "Social media account credentials or admin roles", services: ["social"] },
      { id: "a8", text: "Domain registrar access (DNS management)", services: ["seo", "webdev", "email"] },
      { id: "a9", text: "Google Tag Manager access", services: ["analytics", "ppc", "seo"] },
      { id: "a10", text: "Hosting / server access (cPanel, SSH, or platform dashboard)", services: ["webdev"] },
      { id: "a11", text: "LinkedIn Campaign Manager access", services: ["ppc", "social"] },
      { id: "a12", text: "CRM access (HubSpot, Salesforce, etc.)", services: ["email", "content", "analytics"] },
    ],
  },
  {
    key: "audit",
    title: "Phase 3: Audit & Baseline",
    description:
      "Establish where things stand today so improvements can be measured.",
    items: [
      { id: "au1", text: "Record current website traffic and traffic sources", services: ["seo", "ppc", "analytics", "webdev"] },
      { id: "au2", text: "Document current conversion rates and lead volume", services: ["ppc", "seo", "email", "analytics"] },
      { id: "au3", text: "Run a technical SEO audit (crawl errors, site speed, indexing)", services: ["seo"] },
      { id: "au4", text: "Perform a content audit (inventory of existing pages, posts, assets)", services: ["content", "seo"] },
      { id: "au5", text: "Audit social media presence (follower counts, engagement rates, posting frequency)", services: ["social"] },
      { id: "au6", text: "Review current ad campaigns and spend efficiency", services: ["ppc"] },
      { id: "au7", text: "Audit email list health (list size, open rates, bounce rates)", services: ["email"] },
      { id: "au8", text: "Assess brand consistency across all channels", services: ["branding"] },
      { id: "au9", text: "Evaluate current website UX and design against best practices", services: ["webdev", "branding"] },
      { id: "au10", text: "Review analytics setup (tracking accuracy, goal configuration, tag firing)", services: ["analytics"] },
    ],
  },
  {
    key: "strategy",
    title: "Phase 4: Strategy & Setup",
    description:
      "Build the infrastructure and plans that will drive execution.",
    items: [
      { id: "s1", text: "Create campaign structure and naming conventions", services: ["ppc", "social", "email"] },
      { id: "s2", text: "Implement conversion tracking pixels and events", services: ["ppc", "analytics"] },
      { id: "s3", text: "Build a content calendar (topics, formats, publishing schedule)", services: ["content", "social"] },
      { id: "s4", text: "Define reporting schedule and KPI dashboard", services: "all" },
      { id: "s5", text: "Set up keyword targeting and mapping", services: ["seo", "ppc", "content"] },
      { id: "s6", text: "Design ad creatives and copy variations", services: ["ppc", "social"] },
      { id: "s7", text: "Build email templates and automation workflows", services: ["email"] },
      { id: "s8", text: "Create a brand style guide or update existing one", services: ["branding"] },
      { id: "s9", text: "Set up development or staging environment", services: ["webdev"] },
      { id: "s10", text: "Configure analytics goals, funnels, and custom reports", services: ["analytics"] },
      { id: "s11", text: "Plan link-building or outreach strategy", services: ["seo"] },
      { id: "s12", text: "Design landing pages for campaigns", services: ["ppc", "webdev"] },
    ],
  },
  {
    key: "launch",
    title: "Phase 5: Launch Prep",
    description:
      "Final approvals and logistics before going live.",
    items: [
      { id: "l1", text: "Obtain creative approval from client stakeholders", services: "all" },
      { id: "l2", text: "Confirm campaign budgets and spend limits", services: ["ppc", "social"] },
      { id: "l3", text: "Complete team introductions (agency contacts, client contacts)", services: "all" },
      { id: "l4", text: "Agree on communication schedule (weekly calls, Slack, email updates)", services: "all" },
      { id: "l5", text: "Review and approve reporting template", services: "all" },
      { id: "l6", text: "Conduct a final QA on all tracking and pixels", services: ["analytics", "ppc"] },
      { id: "l7", text: "Test email sends with seed list before launch", services: ["email"] },
      { id: "l8", text: "Review staging site and get sign-off for go-live", services: ["webdev"] },
      { id: "l9", text: "Schedule initial campaign launches", services: ["ppc", "social", "email", "content"] },
      { id: "l10", text: "Set up alerts for budget pacing and performance anomalies", services: ["ppc", "analytics"] },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function itemMatchesServices(item: ChecklistItem, selected: Set<ServiceKey>): boolean {
  if (item.services === "all") return true;
  return item.services.some((s) => selected.has(s));
}

function getFilteredPhases(selected: Set<ServiceKey>): Phase[] {
  return PHASES.map((phase) => ({
    ...phase,
    items: phase.items.filter((item) => itemMatchesServices(item, selected)),
  })).filter((phase) => phase.items.length > 0);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ClientOnboardingChecklistPage() {
  // Inputs
  const [clientName, setClientName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [selectedServices, setSelectedServices] = useState<Set<ServiceKey>>(new Set());

  // Checklist state
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [customItems, setCustomItems] = useState<CustomItem[]>([]);
  const [addingToPhase, setAddingToPhase] = useState<string | null>(null);
  const [newItemText, setNewItemText] = useState("");

  // Derived
  const hasServices = selectedServices.size > 0;

  const filteredPhases = useMemo(
    () => (hasServices ? getFilteredPhases(selectedServices) : []),
    [selectedServices, hasServices],
  );

  // All visible item IDs (built-in + custom for visible phases)
  const allVisibleIds = useMemo(() => {
    const ids: string[] = [];
    for (const phase of filteredPhases) {
      for (const item of phase.items) ids.push(item.id);
    }
    for (const ci of customItems) {
      if (filteredPhases.some((p) => p.key === ci.phaseKey)) {
        ids.push(ci.id);
      }
    }
    return ids;
  }, [filteredPhases, customItems]);

  const totalItems = allVisibleIds.length;
  const checkedCount = useMemo(
    () => allVisibleIds.filter((id) => checked.has(id)).length,
    [allVisibleIds, checked],
  );
  const overallPct = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  /* ---- Callbacks ---- */

  const toggleService = useCallback((key: ServiceKey) => {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const toggleItem = useCallback((id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const addCustomItem = useCallback(
    (phaseKey: string) => {
      const text = newItemText.trim();
      if (!text) return;
      const id = `custom_${phaseKey}_${Date.now()}`;
      setCustomItems((prev) => [...prev, { id, text, phaseKey }]);
      setNewItemText("");
      setAddingToPhase(null);
    },
    [newItemText],
  );

  const handleReset = useCallback(() => {
    setClientName("");
    setProjectName("");
    setSelectedServices(new Set());
    setChecked(new Set());
    setCustomItems([]);
    setNewItemText("");
    setAddingToPhase(null);
  }, []);

  const handleExport = useCallback(() => {
    const lines: string[] = [];
    const heading = [clientName, projectName].filter(Boolean).join(" — ");
    lines.push("CLIENT ONBOARDING CHECKLIST");
    if (heading) lines.push(heading);
    lines.push(`Generated: ${new Date().toLocaleDateString()}`);
    lines.push(`Services: ${Array.from(selectedServices).map((s) => SERVICES.find((sv) => sv.key === s)?.label ?? s).join(", ")}`);
    lines.push(`Overall progress: ${checkedCount}/${totalItems} (${overallPct}%)`);
    lines.push("");

    for (const phase of filteredPhases) {
      const phaseCustom = customItems.filter((ci) => ci.phaseKey === phase.key);
      const allPhaseItems = [
        ...phase.items.map((i) => ({ id: i.id, text: i.text })),
        ...phaseCustom.map((ci) => ({ id: ci.id, text: ci.text })),
      ];
      const phaseChecked = allPhaseItems.filter((i) => checked.has(i.id)).length;
      const phaseTotal = allPhaseItems.length;

      lines.push(`${"=".repeat(60)}`);
      lines.push(`${phase.title}  (${phaseChecked}/${phaseTotal})`);
      lines.push(`${"=".repeat(60)}`);

      for (const item of allPhaseItems) {
        const status = checked.has(item.id) ? "[x]" : "[ ]";
        lines.push(`  ${status} ${item.text}`);
      }
      lines.push("");
    }

    lines.push("---");
    lines.push("Generated by Markit Media — themarkitmedia.com");

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const filename = [clientName, projectName, "onboarding-checklist"]
      .filter(Boolean)
      .join("-")
      .replace(/[^a-zA-Z0-9-]/g, "_")
      .toLowerCase();
    a.download = `${filename || "onboarding-checklist"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [checked, clientName, projectName, selectedServices, filteredPhases, customItems, checkedCount, totalItems, overallPct]);

  /* ---- Phase progress helper ---- */

  function phaseProgress(phase: Phase) {
    const phaseCustom = customItems.filter((ci) => ci.phaseKey === phase.key);
    const ids = [...phase.items.map((i) => i.id), ...phaseCustom.map((ci) => ci.id)];
    const done = ids.filter((id) => checked.has(id)).length;
    const total = ids.length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return { done, total, pct };
  }

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <article className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Client Onboarding Checklist Generator",
          description:
            "Generate a customised marketing client onboarding checklist based on services, channels, and project scope.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Client Onboarding Checklist" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Client Onboarding Checklist Generator
            </h1>
            <SectionDesc>
              Select the services you are delivering, and this tool builds a
              tailored onboarding checklist organised by phase. Check off each
              item, track progress, add your own tasks, and export the result
              when you are done.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Client / Project name */}
      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="client-name"
                  className="block text-base font-bold text-black mb-2"
                >
                  Client Name
                </label>
                <input
                  id="client-name"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Acme Corp"
                  className="w-full border border-gray-300 px-4 py-3 text-base text-black placeholder:text-gray-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
                />
              </div>
              <div>
                <label
                  htmlFor="project-name"
                  className="block text-base font-bold text-black mb-2"
                >
                  Project Name
                </label>
                <input
                  id="project-name"
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. Q4 Campaign Launch"
                  className="w-full border border-gray-300 px-4 py-3 text-base text-black placeholder:text-gray-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
                />
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* Service selection */}
      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <fieldset>
              <legend className="text-base font-bold text-black mb-4">
                Select Services You Are Delivering
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((svc) => (
                  <label
                    key={svc.key}
                    className={`flex items-center gap-3 border px-4 py-3 cursor-pointer transition-colors motion-reduce:transition-none min-h-[44px] focus-within:outline-2 focus-within:outline-black focus-within:outline-offset-2 ${
                      selectedServices.has(svc.key)
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-black text-black"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedServices.has(svc.key)}
                      onChange={() => toggleService(svc.key)}
                      className="w-5 h-5 flex-shrink-0 accent-black cursor-pointer focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                    />
                    <span className="text-base font-bold">{svc.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </Animate>
        </div>
      </section>

      {/* Prompt when no services selected */}
      {!hasServices && (
        <section className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <div className="border border-gray-200 p-8 text-center">
                <p className="text-base text-gray-500">
                  Select at least one service above to generate your checklist.
                </p>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* Overall progress bar (sticky) */}
      {hasServices && (
        <section className="px-6 lg:px-12 pb-6">
          <div className="max-w-3xl mx-auto">
            <div className="sticky top-20 z-10 bg-white py-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-bold text-black">
                  {checkedCount}/{totalItems} items completed
                </span>
                <span className="text-base font-bold text-black">
                  {overallPct}%
                </span>
              </div>
              <div
                className="w-full h-3 bg-gray-100 overflow-hidden"
                role="progressbar"
                aria-valuenow={overallPct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Overall checklist progress"
              >
                <div
                  className="h-full bg-black transition-all duration-300 motion-reduce:transition-none"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
              {overallPct === 100 && (
                <p className="text-base text-black font-bold mt-2">
                  All items completed. Ready to launch.
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Phase checklists */}
      {hasServices && (
        <section className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto space-y-12">
            {filteredPhases.map((phase) => {
              const progress = phaseProgress(phase);
              const phaseCustom = customItems.filter(
                (ci) => ci.phaseKey === phase.key,
              );

              return (
                <Animate key={phase.key} animation="fade-up">
                  <div>
                    {/* Phase header */}
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                        {phase.title}
                      </h2>
                      <span className="text-base text-gray-500">
                        {progress.done}/{progress.total}
                      </span>
                    </div>
                    <p className="text-base text-gray-500 mb-4">
                      {phase.description}
                    </p>

                    {/* Phase progress */}
                    <div
                      className="w-full h-2 bg-gray-100 overflow-hidden mb-4"
                      role="progressbar"
                      aria-valuenow={progress.pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${phase.title} progress`}
                    >
                      <div
                        className="h-full bg-black transition-all duration-300 motion-reduce:transition-none"
                        style={{ width: `${progress.pct}%` }}
                      />
                    </div>

                    {/* Built-in items */}
                    <div className="space-y-0">
                      {phase.items.map((item) => (
                        <label
                          key={item.id}
                          className="flex items-start gap-3 p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors motion-reduce:transition-none min-h-[44px] focus-within:outline-2 focus-within:outline-black focus-within:outline-offset-2"
                        >
                          <input
                            type="checkbox"
                            checked={checked.has(item.id)}
                            onChange={() => toggleItem(item.id)}
                            className="mt-1 w-5 h-5 flex-shrink-0 accent-black cursor-pointer focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                          />
                          <span
                            className={`text-base leading-relaxed ${
                              checked.has(item.id)
                                ? "text-gray-400 line-through"
                                : "text-gray-700"
                            }`}
                          >
                            {item.text}
                          </span>
                        </label>
                      ))}

                      {/* Custom items for this phase */}
                      {phaseCustom.map((ci) => (
                        <label
                          key={ci.id}
                          className="flex items-start gap-3 p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors motion-reduce:transition-none min-h-[44px] focus-within:outline-2 focus-within:outline-black focus-within:outline-offset-2"
                        >
                          <input
                            type="checkbox"
                            checked={checked.has(ci.id)}
                            onChange={() => toggleItem(ci.id)}
                            className="mt-1 w-5 h-5 flex-shrink-0 accent-black cursor-pointer focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                          />
                          <span
                            className={`text-base leading-relaxed ${
                              checked.has(ci.id)
                                ? "text-gray-400 line-through"
                                : "text-gray-700"
                            }`}
                          >
                            {ci.text}
                            <span className="text-gray-400 ml-2">(custom)</span>
                          </span>
                        </label>
                      ))}
                    </div>

                    {/* Add custom item */}
                    {addingToPhase === phase.key ? (
                      <div className="mt-4 flex flex-col sm:flex-row gap-3">
                        <label className="sr-only" htmlFor={`custom-${phase.key}`}>
                          New item for {phase.title}
                        </label>
                        <input
                          id={`custom-${phase.key}`}
                          type="text"
                          value={newItemText}
                          onChange={(e) => setNewItemText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") addCustomItem(phase.key);
                          }}
                          placeholder="Describe the task..."
                          autoFocus
                          className="flex-1 border border-gray-300 px-4 py-3 text-base text-black placeholder:text-gray-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => addCustomItem(phase.key)}
                            className="px-6 py-3 bg-black text-white text-base font-bold hover:bg-gray-800 transition-colors motion-reduce:transition-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                          >
                            Add
                          </button>
                          <button
                            onClick={() => {
                              setAddingToPhase(null);
                              setNewItemText("");
                            }}
                            className="px-6 py-3 border border-gray-300 text-base font-bold text-black hover:border-black transition-colors motion-reduce:transition-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setAddingToPhase(phase.key);
                          setNewItemText("");
                        }}
                        className="mt-4 text-base font-bold text-gray-500 hover:text-black transition-colors motion-reduce:transition-none min-h-[44px] px-4 py-2 border border-gray-200 hover:border-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                      >
                        + Add Custom Item
                      </button>
                    )}
                  </div>
                </Animate>
              );
            })}
          </div>
        </section>
      )}

      {/* Export + Reset buttons */}
      {hasServices && (
        <section className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto flex flex-wrap gap-4">
            <Animate animation="fade-up">
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Export as .txt
              </button>
            </Animate>
            <Animate animation="fade-up">
              <button
                onClick={handleReset}
                className="text-base font-bold text-gray-500 hover:text-black transition-colors motion-reduce:transition-none min-h-[44px] px-8 py-4 border border-gray-200 hover:border-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Reset Checklist
              </button>
            </Animate>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Onboarding a New Client?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team handles the entire onboarding process — from discovery
              through launch — so nothing falls through the cracks and your
              campaigns start strong from day one.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Client Onboarding Checklist"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Channel Mix Modeller", href: "/resources/channel-mix-modeller" },
          { title: "Channel Recommender", href: "/resources/channel-recommender" },
          { title: "Channel Selector", href: "/resources/channel-selector" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
