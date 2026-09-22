"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Animate } from "@/components/animate";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CompanyOverview {
  companyName: string;
  industry: string;
  companySize: string;
  annualRevenue: string;
  website: string;
}

interface ProjectBackground {
  businessContext: string;
  currentChallenges: string;
  previousEfforts: string;
}

interface ScopeOfWork {
  services: string[];
}

interface GoalsAndKPIs {
  objective: string;
  customObjective: string;
  kpis: { metric: string; target: string }[];
}

interface TargetAudience {
  demographics: string;
  geographies: string;
  buyerPersonas: string;
}

interface BudgetInfo {
  range: string;
}

interface TimelineInfo {
  startDate: string;
  contractLength: string;
  milestones: string;
}

interface EvaluationCriteria {
  experience: number;
  strategy: number;
  price: number;
  team: number;
  references: number;
}

interface SubmissionRequirements {
  responseDeadline: string;
  formatRequirements: string;
  questionsContact: string;
}

interface RFPData {
  companyOverview: CompanyOverview;
  projectBackground: ProjectBackground;
  scopeOfWork: ScopeOfWork;
  goalsAndKPIs: GoalsAndKPIs;
  targetAudience: TargetAudience;
  budget: BudgetInfo;
  timeline: TimelineInfo;
  evaluationCriteria: EvaluationCriteria;
  submissionRequirements: SubmissionRequirements;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SERVICES = [
  "SEO",
  "PPC",
  "Social Media",
  "Content Marketing",
  "Email Marketing",
  "Branding",
  "Web Development",
  "Analytics",
  "Video Production",
] as const;

const OBJECTIVES = [
  "Increase brand awareness",
  "Generate qualified leads",
  "Increase online sales",
  "Improve customer retention",
  "Launch new product/service",
  "Rebrand or reposition",
  "Enter new market",
  "Other (specify below)",
] as const;

const BUDGET_RANGES = [
  "Under $5K/mo",
  "$5-10K/mo",
  "$10-25K/mo",
  "$25-50K/mo",
  "$50K+/mo",
  "Prefer not to disclose",
] as const;

const SECTION_KEYS = [
  "companyOverview",
  "projectBackground",
  "scopeOfWork",
  "goalsAndKPIs",
  "targetAudience",
  "budget",
  "timeline",
  "evaluationCriteria",
  "submissionRequirements",
] as const;

const SECTION_LABELS: Record<(typeof SECTION_KEYS)[number], string> = {
  companyOverview: "1. Company Overview",
  projectBackground: "2. Project Background",
  scopeOfWork: "3. Scope of Work",
  goalsAndKPIs: "4. Goals & KPIs",
  targetAudience: "5. Target Audience",
  budget: "6. Budget",
  timeline: "7. Timeline",
  evaluationCriteria: "8. Evaluation Criteria",
  submissionRequirements: "9. Submission Requirements",
};

/* ------------------------------------------------------------------ */
/*  Default state                                                      */
/* ------------------------------------------------------------------ */

function defaultData(): RFPData {
  return {
    companyOverview: { companyName: "", industry: "", companySize: "", annualRevenue: "", website: "" },
    projectBackground: { businessContext: "", currentChallenges: "", previousEfforts: "" },
    scopeOfWork: { services: [] },
    goalsAndKPIs: { objective: "", customObjective: "", kpis: [{ metric: "", target: "" }] },
    targetAudience: { demographics: "", geographies: "", buyerPersonas: "" },
    budget: { range: "" },
    timeline: { startDate: "", contractLength: "", milestones: "" },
    evaluationCriteria: { experience: 20, strategy: 20, price: 20, team: 20, references: 20 },
    submissionRequirements: { responseDeadline: "", formatRequirements: "", questionsContact: "" },
  };
}

/* ------------------------------------------------------------------ */
/*  Section completeness checks                                        */
/* ------------------------------------------------------------------ */

function isSectionComplete(key: string, data: RFPData): boolean {
  switch (key) {
    case "companyOverview": {
      const s = data.companyOverview;
      return !!(s.companyName && s.industry);
    }
    case "projectBackground": {
      const s = data.projectBackground;
      return !!(s.businessContext && s.currentChallenges);
    }
    case "scopeOfWork":
      return data.scopeOfWork.services.length > 0;
    case "goalsAndKPIs":
      return !!(data.goalsAndKPIs.objective);
    case "targetAudience":
      return !!(data.targetAudience.demographics);
    case "budget":
      return !!(data.budget.range);
    case "timeline":
      return !!(data.timeline.startDate);
    case "evaluationCriteria": {
      const c = data.evaluationCriteria;
      return c.experience + c.strategy + c.price + c.team + c.references === 100;
    }
    case "submissionRequirements":
      return !!(data.submissionRequirements.responseDeadline);
    default:
      return false;
  }
}

/* ------------------------------------------------------------------ */
/*  Generate RFP text                                                  */
/* ------------------------------------------------------------------ */

function generateRFPText(data: RFPData): string {
  const lines: string[] = [];
  const hr = "=".repeat(60);

  lines.push(hr);
  lines.push("REQUEST FOR PROPOSAL (RFP)");
  lines.push("Marketing Services");
  if (data.companyOverview.companyName) {
    lines.push(`Issued by: ${data.companyOverview.companyName}`);
  }
  lines.push(`Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`);
  lines.push(hr);
  lines.push("");

  // 1
  lines.push("1. COMPANY OVERVIEW");
  lines.push("-".repeat(40));
  lines.push(`Company Name: ${data.companyOverview.companyName || "N/A"}`);
  lines.push(`Industry: ${data.companyOverview.industry || "N/A"}`);
  lines.push(`Company Size: ${data.companyOverview.companySize || "N/A"}`);
  lines.push(`Annual Revenue Range: ${data.companyOverview.annualRevenue || "N/A"}`);
  lines.push(`Website: ${data.companyOverview.website || "N/A"}`);
  lines.push("");

  // 2
  lines.push("2. PROJECT BACKGROUND");
  lines.push("-".repeat(40));
  lines.push(`Business Context:\n${data.projectBackground.businessContext || "N/A"}`);
  lines.push("");
  lines.push(`Current Challenges:\n${data.projectBackground.currentChallenges || "N/A"}`);
  lines.push("");
  lines.push(`Previous Marketing Efforts:\n${data.projectBackground.previousEfforts || "N/A"}`);
  lines.push("");

  // 3
  lines.push("3. SCOPE OF WORK");
  lines.push("-".repeat(40));
  if (data.scopeOfWork.services.length > 0) {
    lines.push("Services Required:");
    data.scopeOfWork.services.forEach((s) => lines.push(`  - ${s}`));
  } else {
    lines.push("Services Required: N/A");
  }
  lines.push("");

  // 4
  lines.push("4. GOALS & KPIs");
  lines.push("-".repeat(40));
  lines.push(`Primary Objective: ${data.goalsAndKPIs.objective || "N/A"}`);
  if (data.goalsAndKPIs.customObjective) {
    lines.push(`Details: ${data.goalsAndKPIs.customObjective}`);
  }
  if (data.goalsAndKPIs.kpis.some((k) => k.metric)) {
    lines.push("Target KPIs:");
    data.goalsAndKPIs.kpis.filter((k) => k.metric).forEach((k) => {
      lines.push(`  - ${k.metric}: ${k.target || "TBD"}`);
    });
  }
  lines.push("");

  // 5
  lines.push("5. TARGET AUDIENCE");
  lines.push("-".repeat(40));
  lines.push(`Demographics: ${data.targetAudience.demographics || "N/A"}`);
  lines.push(`Geographies: ${data.targetAudience.geographies || "N/A"}`);
  lines.push(`Buyer Personas:\n${data.targetAudience.buyerPersonas || "N/A"}`);
  lines.push("");

  // 6
  lines.push("6. BUDGET");
  lines.push("-".repeat(40));
  lines.push(`Monthly Budget Range: ${data.budget.range || "N/A"}`);
  lines.push("");

  // 7
  lines.push("7. TIMELINE");
  lines.push("-".repeat(40));
  lines.push(`Desired Start Date: ${data.timeline.startDate || "N/A"}`);
  lines.push(`Contract Length: ${data.timeline.contractLength || "N/A"}`);
  lines.push(`Key Milestones/Deadlines:\n${data.timeline.milestones || "N/A"}`);
  lines.push("");

  // 8
  lines.push("8. EVALUATION CRITERIA");
  lines.push("-".repeat(40));
  const c = data.evaluationCriteria;
  lines.push(`Experience & Portfolio: ${c.experience}%`);
  lines.push(`Strategic Approach: ${c.strategy}%`);
  lines.push(`Pricing: ${c.price}%`);
  lines.push(`Team & Resources: ${c.team}%`);
  lines.push(`References: ${c.references}%`);
  lines.push(`Total: ${c.experience + c.strategy + c.price + c.team + c.references}%`);
  lines.push("");

  // 9
  lines.push("9. SUBMISSION REQUIREMENTS");
  lines.push("-".repeat(40));
  lines.push(`Response Deadline: ${data.submissionRequirements.responseDeadline || "N/A"}`);
  lines.push(`Format Requirements: ${data.submissionRequirements.formatRequirements || "N/A"}`);
  lines.push(`Questions Contact: ${data.submissionRequirements.questionsContact || "N/A"}`);
  lines.push("");

  lines.push(hr);
  lines.push("END OF RFP");
  lines.push(hr);

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Accordion toggle icon                                              */
/* ------------------------------------------------------------------ */

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M5 7.5L10 12.5L15 7.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable form components                                           */
/* ------------------------------------------------------------------ */

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-base font-bold text-black mb-1.5">
      {children}
    </label>
  );
}

function TextInput({
  id,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-neutral-300 bg-white text-black text-base px-4 py-3 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-1 placeholder:text-neutral-400"
    />
  );
}

function TextArea({
  id,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full border border-neutral-300 bg-white text-black text-base px-4 py-3 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-1 placeholder:text-neutral-400 resize-y"
    />
  );
}

function Select({
  id,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder?: string;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-neutral-300 bg-white text-black text-base px-4 py-3 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-1"
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

export default function MarketingRFPTemplatePage() {
  const [data, setData] = useState<RFPData>(defaultData);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ companyOverview: true });
  const [showPreview, setShowPreview] = useState(false);

  /* ---- helpers ---- */

  const toggle = useCallback((key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const update = useCallback(<K extends keyof RFPData>(section: K, field: keyof RFPData[K], value: RFPData[K][keyof RFPData[K]]) => {
    setData((prev) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  }, []);

  const completedCount = useMemo(() => SECTION_KEYS.filter((k) => isSectionComplete(k, data)).length, [data]);

  const evalTotal = useMemo(() => {
    const c = data.evaluationCriteria;
    return c.experience + c.strategy + c.price + c.team + c.references;
  }, [data.evaluationCriteria]);

  const handleReset = useCallback(() => {
    if (window.confirm("Reset all fields? This cannot be undone.")) {
      setData(defaultData());
      setOpenSections({ companyOverview: true });
      setShowPreview(false);
    }
  }, []);

  const handleExport = useCallback(() => {
    const text = generateRFPText(data);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `RFP-${data.companyOverview.companyName?.replace(/\s+/g, "-") || "Marketing"}-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [data]);

  /* ---- toggle service ---- */

  const toggleService = useCallback((service: string) => {
    setData((prev) => {
      const current = prev.scopeOfWork.services;
      const next = current.includes(service) ? current.filter((s) => s !== service) : [...current, service];
      return { ...prev, scopeOfWork: { services: next } };
    });
  }, []);

  /* ---- KPI helpers ---- */

  const addKPI = useCallback(() => {
    setData((prev) => ({
      ...prev,
      goalsAndKPIs: { ...prev.goalsAndKPIs, kpis: [...prev.goalsAndKPIs.kpis, { metric: "", target: "" }] },
    }));
  }, []);

  const updateKPI = useCallback((index: number, field: "metric" | "target", value: string) => {
    setData((prev) => {
      const kpis = [...prev.goalsAndKPIs.kpis];
      kpis[index] = { ...kpis[index], [field]: value };
      return { ...prev, goalsAndKPIs: { ...prev.goalsAndKPIs, kpis } };
    });
  }, []);

  const removeKPI = useCallback((index: number) => {
    setData((prev) => {
      const kpis = prev.goalsAndKPIs.kpis.filter((_, i) => i !== index);
      return { ...prev, goalsAndKPIs: { ...prev.goalsAndKPIs, kpis: kpis.length ? kpis : [{ metric: "", target: "" }] } };
    });
  }, []);

  /* ---- evaluation criteria updater ---- */

  const updateEval = useCallback((field: keyof EvaluationCriteria, value: number) => {
    setData((prev) => ({
      ...prev,
      evaluationCriteria: { ...prev.evaluationCriteria, [field]: value },
    }));
  }, []);

  /* ---- accordion section wrapper ---- */

  function AccordionSection({ sectionKey, children }: { sectionKey: (typeof SECTION_KEYS)[number]; children: React.ReactNode }) {
    const isOpen = !!openSections[sectionKey];
    const complete = isSectionComplete(sectionKey, data);
    return (
      <div className="border border-neutral-200 bg-white">
        <button
          type="button"
          onClick={() => toggle(sectionKey)}
          aria-expanded={isOpen}
          className="w-full flex items-center justify-between px-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-[-2px]"
        >
          <span className="flex items-center gap-3">
            <span
              aria-label={complete ? "Section complete" : "Section incomplete"}
              className={`inline-block w-3 h-3 rounded-full shrink-0 ${complete ? "bg-black" : "bg-neutral-300"}`}
            />
            <span className="font-[family-name:var(--font-display)] text-lg font-bold text-black">
              {SECTION_LABELS[sectionKey]}
            </span>
          </span>
          <ChevronIcon open={isOpen} />
        </button>
        {isOpen && <div className="px-6 pb-6 space-y-5 border-t border-neutral-100">{children}</div>}
      </div>
    );
  }

  /* ================================================================ */
  /*  Render                                                           */
  /* ================================================================ */

  return (
    <article className="min-h-screen bg-white">
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Marketing RFP Template Builder" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-28 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Interactive Tools</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing RFP Template Builder
            </h1>
            <SectionDesc>
              Build a professional Request for Proposal to find the right marketing partner.
              Fill out each section below, preview your document, and export it as a text file.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Completeness indicator */}
      <section className="px-6 lg:px-12 pb-6">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-in" delay={100}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-neutral-50 border border-neutral-200 px-6 py-4">
              <span className="text-base font-bold text-black">
                Progress: {completedCount} of {SECTION_KEYS.length} sections
              </span>
              <div className="flex-1 h-3 bg-neutral-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={completedCount} aria-valuemin={0} aria-valuemax={SECTION_KEYS.length} aria-label="RFP completion progress">
                <div
                  className="h-full bg-black transition-all duration-300"
                  style={{ width: `${(completedCount / SECTION_KEYS.length) * 100}%` }}
                />
              </div>
              <span className="text-base text-neutral-500 tabular-nums">
                {Math.round((completedCount / SECTION_KEYS.length) * 100)}%
              </span>
            </div>
          </Animate>
        </div>
      </section>

      {/* Form sections */}
      <section className="px-6 lg:px-12 pb-12">
        <div className="max-w-4xl mx-auto space-y-3">
          {/* 1. Company Overview */}
          <AccordionSection sectionKey="companyOverview">
            <div className="pt-4">
              <FieldLabel htmlFor="co-name">Company Name *</FieldLabel>
              <TextInput id="co-name" value={data.companyOverview.companyName} onChange={(v) => update("companyOverview", "companyName", v)} placeholder="Acme Corp" />
            </div>
            <div>
              <FieldLabel htmlFor="co-industry">Industry *</FieldLabel>
              <TextInput id="co-industry" value={data.companyOverview.industry} onChange={(v) => update("companyOverview", "industry", v)} placeholder="e.g. SaaS, Healthcare, E-commerce" />
            </div>
            <div>
              <FieldLabel htmlFor="co-size">Company Size</FieldLabel>
              <TextInput id="co-size" value={data.companyOverview.companySize} onChange={(v) => update("companyOverview", "companySize", v)} placeholder="e.g. 50-200 employees" />
            </div>
            <div>
              <FieldLabel htmlFor="co-revenue">Annual Revenue Range</FieldLabel>
              <TextInput id="co-revenue" value={data.companyOverview.annualRevenue} onChange={(v) => update("companyOverview", "annualRevenue", v)} placeholder="e.g. $5M-$20M" />
            </div>
            <div>
              <FieldLabel htmlFor="co-website">Website</FieldLabel>
              <TextInput id="co-website" value={data.companyOverview.website} onChange={(v) => update("companyOverview", "website", v)} placeholder="https://example.com" type="url" />
            </div>
          </AccordionSection>

          {/* 2. Project Background */}
          <AccordionSection sectionKey="projectBackground">
            <div className="pt-4">
              <FieldLabel htmlFor="pb-context">Business Context *</FieldLabel>
              <TextArea id="pb-context" value={data.projectBackground.businessContext} onChange={(v) => update("projectBackground", "businessContext", v)} placeholder="Describe your business, market position, and why you are seeking marketing support." rows={4} />
            </div>
            <div>
              <FieldLabel htmlFor="pb-challenges">Current Challenges *</FieldLabel>
              <TextArea id="pb-challenges" value={data.projectBackground.currentChallenges} onChange={(v) => update("projectBackground", "currentChallenges", v)} placeholder="What marketing challenges are you currently facing?" rows={3} />
            </div>
            <div>
              <FieldLabel htmlFor="pb-previous">Previous Marketing Efforts</FieldLabel>
              <TextArea id="pb-previous" value={data.projectBackground.previousEfforts} onChange={(v) => update("projectBackground", "previousEfforts", v)} placeholder="Summarize past campaigns, agencies used, and results achieved." rows={3} />
            </div>
          </AccordionSection>

          {/* 3. Scope of Work */}
          <AccordionSection sectionKey="scopeOfWork">
            <fieldset className="pt-4">
              <legend className="text-base font-bold text-black mb-3">Select services needed *</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {SERVICES.map((service) => {
                  const checked = data.scopeOfWork.services.includes(service);
                  return (
                    <label
                      key={service}
                      className={`flex items-center gap-3 border px-4 py-3 cursor-pointer transition-colors ${checked ? "border-black bg-neutral-50" : "border-neutral-200 hover:border-neutral-400"}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleService(service)}
                        className="w-5 h-5 accent-black focus-visible:outline-2 focus-visible:outline-black"
                      />
                      <span className="text-base text-black">{service}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </AccordionSection>

          {/* 4. Goals & KPIs */}
          <AccordionSection sectionKey="goalsAndKPIs">
            <div className="pt-4">
              <FieldLabel htmlFor="gk-objective">Primary Objective *</FieldLabel>
              <Select id="gk-objective" value={data.goalsAndKPIs.objective} onChange={(v) => update("goalsAndKPIs", "objective", v)} options={OBJECTIVES} placeholder="Select an objective" />
            </div>
            <div>
              <FieldLabel htmlFor="gk-custom">Additional Details</FieldLabel>
              <TextArea id="gk-custom" value={data.goalsAndKPIs.customObjective} onChange={(v) => update("goalsAndKPIs", "customObjective", v)} placeholder="Elaborate on your objective or describe a custom one." rows={2} />
            </div>
            <div>
              <p className="text-base font-bold text-black mb-3">Target KPIs</p>
              <div className="space-y-3">
                {data.goalsAndKPIs.kpis.map((kpi, i) => (
                  <div key={i} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                    <div className="flex-1 w-full">
                      <label htmlFor={`kpi-metric-${i}`} className="block text-base text-neutral-600 mb-1">Metric</label>
                      <TextInput id={`kpi-metric-${i}`} value={kpi.metric} onChange={(v) => updateKPI(i, "metric", v)} placeholder="e.g. Organic traffic" />
                    </div>
                    <div className="flex-1 w-full">
                      <label htmlFor={`kpi-target-${i}`} className="block text-base text-neutral-600 mb-1">Target</label>
                      <TextInput id={`kpi-target-${i}`} value={kpi.target} onChange={(v) => updateKPI(i, "target", v)} placeholder="e.g. +50% in 6 months" />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeKPI(i)}
                      aria-label={`Remove KPI ${i + 1}`}
                      className="text-base text-neutral-400 hover:text-black transition-colors px-3 py-3 border border-neutral-200 hover:border-neutral-400 focus-visible:outline-2 focus-visible:outline-black shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addKPI}
                className="mt-3 text-base font-bold text-black underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                + Add KPI
              </button>
            </div>
          </AccordionSection>

          {/* 5. Target Audience */}
          <AccordionSection sectionKey="targetAudience">
            <div className="pt-4">
              <FieldLabel htmlFor="ta-demo">Demographics *</FieldLabel>
              <TextArea id="ta-demo" value={data.targetAudience.demographics} onChange={(v) => update("targetAudience", "demographics", v)} placeholder="Age, gender, income, job titles, interests..." rows={2} />
            </div>
            <div>
              <FieldLabel htmlFor="ta-geo">Geographies</FieldLabel>
              <TextInput id="ta-geo" value={data.targetAudience.geographies} onChange={(v) => update("targetAudience", "geographies", v)} placeholder="e.g. US, UK, Canada, or specific metro areas" />
            </div>
            <div>
              <FieldLabel htmlFor="ta-persona">Buyer Personas</FieldLabel>
              <TextArea id="ta-persona" value={data.targetAudience.buyerPersonas} onChange={(v) => update("targetAudience", "buyerPersonas", v)} placeholder="Describe your ideal customer segments, their pain points, and decision-making process." rows={4} />
            </div>
          </AccordionSection>

          {/* 6. Budget */}
          <AccordionSection sectionKey="budget">
            <div className="pt-4">
              <FieldLabel htmlFor="budget-range">Monthly Budget Range *</FieldLabel>
              <Select id="budget-range" value={data.budget.range} onChange={(v) => update("budget", "range", v)} options={BUDGET_RANGES} placeholder="Select a budget range" />
            </div>
          </AccordionSection>

          {/* 7. Timeline */}
          <AccordionSection sectionKey="timeline">
            <div className="pt-4">
              <FieldLabel htmlFor="tl-start">Desired Start Date *</FieldLabel>
              <TextInput id="tl-start" value={data.timeline.startDate} onChange={(v) => update("timeline", "startDate", v)} placeholder="e.g. January 2027 or Q1 2027" />
            </div>
            <div>
              <FieldLabel htmlFor="tl-length">Contract Length</FieldLabel>
              <TextInput id="tl-length" value={data.timeline.contractLength} onChange={(v) => update("timeline", "contractLength", v)} placeholder="e.g. 6 months, 12 months, ongoing" />
            </div>
            <div>
              <FieldLabel htmlFor="tl-milestones">Key Milestones / Deadlines</FieldLabel>
              <TextArea id="tl-milestones" value={data.timeline.milestones} onChange={(v) => update("timeline", "milestones", v)} placeholder="List any hard deadlines, product launches, or seasonal considerations." rows={3} />
            </div>
          </AccordionSection>

          {/* 8. Evaluation Criteria */}
          <AccordionSection sectionKey="evaluationCriteria">
            <div className="pt-4">
              <p className="text-base text-neutral-600 mb-4">
                Allocate weight (%) to each criterion. Weights must total 100%.
              </p>
              {(
                [
                  ["experience", "Experience & Portfolio"],
                  ["strategy", "Strategic Approach"],
                  ["price", "Pricing"],
                  ["team", "Team & Resources"],
                  ["references", "References"],
                ] as const
              ).map(([key, label]) => (
                <div key={key} className="flex items-center gap-4 mb-4">
                  <label htmlFor={`eval-${key}`} className="text-base font-bold text-black w-48 shrink-0">
                    {label}
                  </label>
                  <input
                    id={`eval-${key}`}
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={data.evaluationCriteria[key]}
                    onChange={(e) => updateEval(key, Number(e.target.value))}
                    className="flex-1 accent-black h-2 focus-visible:outline-2 focus-visible:outline-black"
                  />
                  <span className="text-base font-bold text-black w-14 text-right tabular-nums">
                    {data.evaluationCriteria[key]}%
                  </span>
                </div>
              ))}
              <div className={`text-base font-bold mt-2 px-4 py-2 border ${evalTotal === 100 ? "border-neutral-200 text-black bg-neutral-50" : "border-neutral-400 text-neutral-600 bg-neutral-100"}`}>
                Total: {evalTotal}%{evalTotal !== 100 && ` (must equal 100%)`}
              </div>
            </div>
          </AccordionSection>

          {/* 9. Submission Requirements */}
          <AccordionSection sectionKey="submissionRequirements">
            <div className="pt-4">
              <FieldLabel htmlFor="sr-deadline">Response Deadline *</FieldLabel>
              <TextInput id="sr-deadline" value={data.submissionRequirements.responseDeadline} onChange={(v) => update("submissionRequirements", "responseDeadline", v)} placeholder="e.g. March 15, 2027" />
            </div>
            <div>
              <FieldLabel htmlFor="sr-format">Format Requirements</FieldLabel>
              <TextArea id="sr-format" value={data.submissionRequirements.formatRequirements} onChange={(v) => update("submissionRequirements", "formatRequirements", v)} placeholder="e.g. PDF proposal, max 20 pages, include case studies" rows={2} />
            </div>
            <div>
              <FieldLabel htmlFor="sr-contact">Questions Contact</FieldLabel>
              <TextInput id="sr-contact" value={data.submissionRequirements.questionsContact} onChange={(v) => update("submissionRequirements", "questionsContact", v)} placeholder="Name and email for vendor questions" />
            </div>
          </AccordionSection>
        </div>
      </section>

      {/* Action buttons */}
      <section className="px-6 lg:px-12 pb-12">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={() => setShowPreview((p) => !p)}
            className="flex-1 bg-black text-white text-base font-bold px-8 py-4 hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
          >
            {showPreview ? "Hide Preview" : "Preview RFP"}
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="flex-1 border-2 border-black text-black text-base font-bold px-8 py-4 hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
          >
            Export as .txt
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="sm:w-auto border border-neutral-300 text-neutral-600 text-base font-bold px-8 py-4 hover:border-neutral-500 hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
          >
            Reset
          </button>
        </div>
      </section>

      {/* Preview */}
      {showPreview && (
        <section className="px-6 lg:px-12 pb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              RFP Preview
            </h2>
            <div className="border border-neutral-200 bg-neutral-50 p-8 overflow-x-auto">
              <pre className="whitespace-pre-wrap text-base text-black font-[family-name:var(--font-body)] leading-relaxed">
                {generateRFPText(data)}
              </pre>
            </div>
          </div>
        </section>
      )}

      {/* Educational section */}
      <section className="px-6 lg:px-12 py-16 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionTitle>Tips for Writing an Effective RFP</SectionTitle>
            <SectionDesc>
              A well-crafted RFP attracts better proposals and saves time for everyone involved.
            </SectionDesc>
          </Animate>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {[
              {
                title: "Be specific about your goals",
                body: "Vague objectives lead to generic proposals. Define measurable outcomes so agencies can tailor their strategies to what you actually need.",
              },
              {
                title: "Share your budget range",
                body: "Agencies calibrate their recommendations to your investment level. Withholding budget often results in proposals that miss the mark.",
              },
              {
                title: "Describe your audience in detail",
                body: "The more an agency understands who you are trying to reach, the more relevant their proposed tactics will be.",
              },
              {
                title: "Include evaluation criteria upfront",
                body: "Telling vendors how you will score proposals helps them focus on what matters most and leads to more comparable submissions.",
              },
              {
                title: "Set a realistic timeline",
                body: "Give agencies enough time to respond thoughtfully. Two to three weeks is standard; less than one week signals low priority.",
              },
              {
                title: "Provide context on past efforts",
                body: "Knowing what has been tried before prevents agencies from repeating failed approaches and demonstrates organizational maturity.",
              },
            ].map((tip) => (
              <Animate key={tip.title} animation="fade-up">
                <div className="bg-white border border-neutral-200 p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-base text-neutral-600 leading-relaxed">{tip.body}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white">
        <div className="max-w-3xl mx-auto text-center">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight leading-tight">
              Ready to Find the Right Marketing Partner?
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed mt-4 max-w-xl mx-auto">
              Skip the RFP process entirely. Tell us about your project and get a tailored proposal
              from a team that has delivered results for businesses like yours.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-neutral-200 transition-colors motion-reduce:transition-none mt-8 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Contact Us &rarr;
            </Link>
          </Animate>
        </div>
      </section>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing RFP Template Builder",
          description: "Build a professional marketing RFP (Request for Proposal) from a structured template. Cover scope, requirements, evaluation criteria, and timeline.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Marketing Rfp Template"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Marketing Maturity", href: "/resources/marketing-maturity" },
          { title: "Marketing Proposal Generator", href: "/resources/marketing-proposal-generator" },
          { title: "Marketing Stack Audit", href: "/resources/marketing-stack-audit" },
          { title: "Marketing Statistics", href: "/resources/marketing-statistics" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
