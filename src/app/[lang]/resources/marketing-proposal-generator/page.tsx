"use client";

import { useState } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ─── Types ────────────────────────────────────────────────────── */

type ProjectType =
  | "seo"
  | "ppc"
  | "social-media"
  | "branding"
  | "web-dev"
  | "content"
  | "email"
  | "full-service";

interface FormData {
  /* Step 1 — Client Info */
  clientName: string;
  companyName: string;
  industry: string;
  projectType: ProjectType | "";

  /* Step 2 — Project Scope */
  objectives: string[];
  targetAudience: string;
  geographicFocus: string;
  budgetRange: string;

  /* Step 3 — Deliverables */
  deliverables: string[];
  customDeliverables: string[];

  /* Step 4 — Timeline & Pricing */
  duration: string;
  startDate: string;
  paymentTerms: string;
  investmentRange: string;
}

/* ─── Constants ────────────────────────────────────────────────── */

const STEPS = [
  "Client Info",
  "Project Scope",
  "Deliverables",
  "Timeline & Pricing",
  "Review & Export",
] as const;

const INDUSTRIES = [
  "E-commerce / Retail",
  "SaaS / Technology",
  "Healthcare / Medical",
  "Financial Services",
  "Real Estate",
  "Education / E-Learning",
  "Hospitality / Travel",
  "Food & Beverage",
  "Professional Services",
  "Manufacturing / Industrial",
  "Nonprofit / NGO",
  "Legal Services",
  "Fitness / Wellness",
  "Automotive",
  "Media / Entertainment",
  "Construction / Home Services",
] as const;

const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  seo: "SEO",
  ppc: "PPC / Paid Search",
  "social-media": "Social Media Marketing",
  branding: "Branding & Identity",
  "web-dev": "Web Development",
  content: "Content Marketing",
  email: "Email Marketing",
  "full-service": "Full-Service Marketing",
};

const OBJECTIVES = [
  "Increase brand awareness",
  "Generate qualified leads",
  "Boost online sales / conversions",
  "Improve search engine rankings",
  "Grow social media following",
  "Launch a new product or service",
  "Enter a new market or geography",
  "Improve customer retention",
  "Establish thought leadership",
  "Rebrand or refresh brand identity",
  "Increase website traffic",
  "Improve email engagement",
] as const;

const BUDGET_RANGES = [
  "Under $2,500 / month",
  "$2,500 – $5,000 / month",
  "$5,000 – $10,000 / month",
  "$10,000 – $25,000 / month",
  "$25,000 – $50,000 / month",
  "$50,000+ / month",
] as const;

const INVESTMENT_RANGES = [
  "$2,500 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000 – $50,000",
  "$50,000 – $100,000",
  "$100,000+",
] as const;

const PAYMENT_TERMS = [
  "50% upfront / 50% on completion",
  "Monthly retainer",
  "Milestone-based payments",
  "Net 30 invoicing",
] as const;

const DELIVERABLES_BY_TYPE: Record<ProjectType, string[]> = {
  seo: [
    "Keyword Research & Strategy",
    "Technical SEO Audit",
    "On-Page Optimization",
    "Link Building / Off-Page SEO",
    "Local SEO Setup",
    "Monthly SEO Performance Reports",
    "Competitor SEO Analysis",
    "Content Recommendations",
  ],
  ppc: [
    "Google Ads Account Setup",
    "Keyword Research & Bid Strategy",
    "Ad Copywriting & Creative",
    "Landing Page Recommendations",
    "A/B Testing Plan",
    "Conversion Tracking Setup",
    "Monthly PPC Performance Reports",
    "Remarketing Campaign Setup",
  ],
  "social-media": [
    "Social Media Strategy Document",
    "Content Calendar (Monthly)",
    "Post Copywriting & Design",
    "Community Management",
    "Paid Social Campaign Management",
    "Influencer Outreach Strategy",
    "Monthly Social Analytics Reports",
    "Profile Optimization",
  ],
  branding: [
    "Brand Discovery Workshop",
    "Logo Design (Primary + Variations)",
    "Brand Style Guide",
    "Color Palette & Typography",
    "Business Card & Stationery Design",
    "Brand Messaging Framework",
    "Social Media Brand Templates",
    "Brand Launch Strategy",
  ],
  "web-dev": [
    "UX/UI Design Mockups",
    "Responsive Website Development",
    "CMS Integration",
    "Contact Forms & Lead Capture",
    "SEO-Friendly Site Architecture",
    "Performance Optimization",
    "Analytics & Tracking Setup",
    "Post-Launch Support (30 Days)",
  ],
  content: [
    "Content Strategy Document",
    "Blog Articles (Monthly)",
    "Long-Form Guides / Whitepapers",
    "Case Study Writing",
    "Email Newsletter Copy",
    "Social Media Content",
    "Video Script Writing",
    "Content Performance Reports",
  ],
  email: [
    "Email Strategy & Audit",
    "List Segmentation Plan",
    "Automated Welcome Sequence",
    "Monthly Email Campaigns",
    "Template Design & Development",
    "A/B Testing (Subject Lines / CTAs)",
    "Deliverability Optimization",
    "Monthly Email Analytics Reports",
  ],
  "full-service": [
    "Marketing Strategy & Roadmap",
    "SEO & Content Marketing",
    "Paid Advertising (Search + Social)",
    "Social Media Management",
    "Email Marketing Campaigns",
    "Website Optimization & CRO",
    "Monthly Analytics & Reporting",
    "Quarterly Strategy Reviews",
    "Brand Creative & Design Support",
  ],
};

const INITIAL_FORM: FormData = {
  clientName: "",
  companyName: "",
  industry: "",
  projectType: "",
  objectives: [],
  targetAudience: "",
  geographicFocus: "",
  budgetRange: "",
  deliverables: [],
  customDeliverables: [],
  duration: "",
  startDate: "",
  paymentTerms: "",
  investmentRange: "",
};

/* ─── Helpers ──────────────────────────────────────────────────── */

function todayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatDate(iso: string): string {
  if (!iso) return "TBD";
  const [y, m, d] = iso.split("-");
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[parseInt(m, 10) - 1]} ${parseInt(d, 10)}, ${y}`;
}

function computeCompleteness(form: FormData): number {
  let filled = 0;
  let total = 0;

  /* Step 1 */
  total += 4;
  if (form.clientName.trim()) filled++;
  if (form.companyName.trim()) filled++;
  if (form.industry) filled++;
  if (form.projectType) filled++;

  /* Step 2 */
  total += 4;
  if (form.objectives.length > 0) filled++;
  if (form.targetAudience.trim()) filled++;
  if (form.geographicFocus.trim()) filled++;
  if (form.budgetRange) filled++;

  /* Step 3 */
  total += 1;
  if (form.deliverables.length > 0 || form.customDeliverables.length > 0) filled++;

  /* Step 4 */
  total += 4;
  if (form.duration) filled++;
  if (form.startDate) filled++;
  if (form.paymentTerms) filled++;
  if (form.investmentRange) filled++;

  return Math.round((filled / total) * 100);
}

function generateProposalText(form: FormData): string {
  const allDeliverables = [...form.deliverables, ...form.customDeliverables];
  const divider = "=".repeat(60);
  const thinDivider = "-".repeat(60);

  const lines: string[] = [
    divider,
    "MARKETING PROPOSAL",
    divider,
    "",
    `Prepared for: ${form.clientName || "—"}`,
    `Company: ${form.companyName || "—"}`,
    `Date: ${formatDate(todayString())}`,
    "",
    divider,
    "1. CLIENT OVERVIEW",
    divider,
    "",
    `Client Name: ${form.clientName || "—"}`,
    `Company: ${form.companyName || "—"}`,
    `Industry: ${form.industry || "—"}`,
    `Project Type: ${form.projectType ? PROJECT_TYPE_LABELS[form.projectType as ProjectType] : "—"}`,
    "",
    divider,
    "2. PROJECT SCOPE",
    divider,
    "",
    "Objectives:",
    ...(form.objectives.length > 0
      ? form.objectives.map((o) => `  - ${o}`)
      : ["  - (none specified)"]),
    "",
    `Target Audience: ${form.targetAudience || "—"}`,
    `Geographic Focus: ${form.geographicFocus || "—"}`,
    `Budget Range: ${form.budgetRange || "—"}`,
    "",
    divider,
    "3. DELIVERABLES",
    divider,
    "",
    ...(allDeliverables.length > 0
      ? allDeliverables.map((d, i) => `  ${i + 1}. ${d}`)
      : ["  (none specified)"]),
    "",
    divider,
    "4. TIMELINE & PRICING",
    divider,
    "",
    `Project Duration: ${form.duration || "—"}`,
    `Estimated Start Date: ${form.startDate ? formatDate(form.startDate) : "—"}`,
    `Payment Terms: ${form.paymentTerms || "—"}`,
    `Estimated Investment: ${form.investmentRange || "—"}`,
    "",
    thinDivider,
    "",
    "IMPORTANT DISCLAIMER:",
    "This proposal is a preliminary outline generated for planning",
    "purposes. Final scope, pricing, and timelines are subject to",
    "discussion and mutual agreement. All figures are estimates and",
    "do not constitute a binding contract or guarantee of results.",
    "",
    thinDivider,
    `Generated on ${formatDate(todayString())} using the Marketing Proposal Generator by Markit Media.`,
    "",
  ];

  return lines.join("\n");
}

/* ─── Component ────────────────────────────────────────────────── */

export default function MarketingProposalGeneratorPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [customInput, setCustomInput] = useState("");

  /* ── Updaters ───────────────────────────────────────────────── */

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleArrayItem(key: "objectives" | "deliverables", value: string) {
    setForm((prev) => {
      const arr = prev[key] as string[];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  }

  function addCustomDeliverable() {
    const trimmed = customInput.trim();
    if (!trimmed) return;
    if (form.customDeliverables.includes(trimmed)) return;
    setForm((prev) => ({
      ...prev,
      customDeliverables: [...prev.customDeliverables, trimmed],
    }));
    setCustomInput("");
  }

  function removeCustomDeliverable(value: string) {
    setForm((prev) => ({
      ...prev,
      customDeliverables: prev.customDeliverables.filter((d) => d !== value),
    }));
  }

  /* ── Navigation ─────────────────────────────────────────────── */

  function goNext() {
    if (step < STEPS.length - 1) setStep(step + 1);
  }
  function goBack() {
    if (step > 0) setStep(step - 1);
  }

  /* ── Export ─────────────────────────────────────────────────── */

  function exportAsText() {
    const text = generateProposalText(form);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const filename = form.companyName
      ? `proposal-${form.companyName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`
      : "marketing-proposal.txt";
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* ── Step validations (soft — user can always go back) ──── */

  function canAdvance(): boolean {
    if (step === 0) {
      return !!(form.clientName.trim() && form.companyName.trim() && form.industry && form.projectType);
    }
    if (step === 1) {
      return !!(form.objectives.length > 0 && form.targetAudience.trim() && form.budgetRange);
    }
    if (step === 2) {
      return form.deliverables.length > 0 || form.customDeliverables.length > 0;
    }
    if (step === 3) {
      return !!(form.duration && form.paymentTerms && form.investmentRange);
    }
    return true;
  }

  /* ── Shared styling ─────────────────────────────────────────── */

  const inputClasses =
    "w-full border border-neutral-300 bg-white text-black px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black focus-visible:ring-1 focus-visible:ring-black transition-colors motion-reduce:transition-none";
  const selectClasses =
    "w-full border border-neutral-300 bg-white text-black px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black focus-visible:ring-1 focus-visible:ring-black transition-colors motion-reduce:transition-none appearance-none";

  const completeness = computeCompleteness(form);

  /* ═══════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════ */

  return (
    <article>
      <nav className="px-6 lg:px-12 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><a href="/" className="hover:text-black transition-colors">Home</a></li>
          <li aria-hidden="true">/</li>
          <li><a href="/resources" className="hover:text-black transition-colors">Resources</a></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">Marketing Proposal Generator</li>
        </ol>
      </nav>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing Proposal Generator
            </h1>
            <SectionDesc>
              Build a structured marketing proposal in minutes. Fill in each section, review the complete
              proposal, and export it as a text file.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ── Step Indicator ─────────────────────────────────────── */}
      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <nav aria-label="Proposal steps">
              <ol className="flex flex-wrap gap-y-3">
                {STEPS.map((label, i) => {
                  const isActive = i === step;
                  const isCompleted = i < step;
                  return (
                    <li key={label} className="flex items-center">
                      <button
                        onClick={() => setStep(i)}
                        className={`flex items-center gap-2 px-3 py-2 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                          isActive
                            ? "text-black"
                            : isCompleted
                              ? "text-neutral-600"
                              : "text-neutral-400"
                        }`}
                        aria-current={isActive ? "step" : undefined}
                      >
                        <span
                          className={`inline-flex items-center justify-center w-7 h-7 text-base font-bold border-2 flex-shrink-0 ${
                            isActive
                              ? "bg-black text-white border-black"
                              : isCompleted
                                ? "bg-neutral-200 text-black border-neutral-300"
                                : "bg-white text-neutral-400 border-neutral-300"
                          }`}
                        >
                          {isCompleted ? "✓" : i + 1}
                        </span>
                        <span className="hidden sm:inline">{label}</span>
                      </button>
                      {i < STEPS.length - 1 && (
                        <span className="mx-1 text-neutral-300 select-none" aria-hidden="true">
                          /
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
            {/* Progress bar */}
            <div className="w-full bg-neutral-100 h-1 mt-4" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={STEPS.length}>
              <div
                className="bg-black h-1 transition-all duration-300 motion-reduce:transition-none"
                style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </Animate>
        </div>
      </section>

      {/* ── Form Steps ─────────────────────────────────────────── */}
      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto">
          {/* ──────────── Step 1: Client Info ──────────── */}
          {step === 0 && (
            <Animate animation="fade-up" key="step-0">
              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                  Client Information
                </h2>

                <div>
                  <label htmlFor="clientName" className="block text-base font-bold text-black mb-2">
                    Client Name
                  </label>
                  <input
                    id="clientName"
                    type="text"
                    value={form.clientName}
                    onChange={(e) => update("clientName", e.target.value)}
                    placeholder="e.g. Jane Smith"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="companyName" className="block text-base font-bold text-black mb-2">
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    value={form.companyName}
                    onChange={(e) => update("companyName", e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="industry" className="block text-base font-bold text-black mb-2">
                    Industry
                  </label>
                  <select
                    id="industry"
                    value={form.industry}
                    onChange={(e) => update("industry", e.target.value)}
                    className={selectClasses}
                  >
                    <option value="">Select an industry</option>
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-base font-bold text-black mb-2">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    value={form.projectType}
                    onChange={(e) => update("projectType", e.target.value as ProjectType)}
                    className={selectClasses}
                  >
                    <option value="">Select a project type</option>
                    {(Object.keys(PROJECT_TYPE_LABELS) as ProjectType[]).map((pt) => (
                      <option key={pt} value={pt}>
                        {PROJECT_TYPE_LABELS[pt]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Animate>
          )}

          {/* ──────────── Step 2: Project Scope ──────────── */}
          {step === 1 && (
            <Animate animation="fade-up" key="step-1">
              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                  Project Scope
                </h2>

                <fieldset>
                  <legend className="text-base font-bold text-black mb-3">
                    Objectives (select all that apply)
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {OBJECTIVES.map((obj) => {
                      const checked = form.objectives.includes(obj);
                      return (
                        <label
                          key={obj}
                          className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors motion-reduce:transition-none ${
                            checked ? "border-black bg-neutral-50" : "border-neutral-200 hover:border-neutral-400"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleArrayItem("objectives", obj)}
                            className="mt-0.5 w-5 h-5 accent-black flex-shrink-0"
                          />
                          <span className="text-base text-black">{obj}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="targetAudience" className="block text-base font-bold text-black mb-2">
                    Target Audience
                  </label>
                  <textarea
                    id="targetAudience"
                    rows={3}
                    value={form.targetAudience}
                    onChange={(e) => update("targetAudience", e.target.value)}
                    placeholder="Describe your ideal customer (demographics, interests, pain points)"
                    className={inputClasses + " resize-y"}
                  />
                </div>

                <div>
                  <label htmlFor="geographicFocus" className="block text-base font-bold text-black mb-2">
                    Geographic Focus
                  </label>
                  <input
                    id="geographicFocus"
                    type="text"
                    value={form.geographicFocus}
                    onChange={(e) => update("geographicFocus", e.target.value)}
                    placeholder="e.g. United States, North America, Global"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="budgetRange" className="block text-base font-bold text-black mb-2">
                    Budget Range
                  </label>
                  <select
                    id="budgetRange"
                    value={form.budgetRange}
                    onChange={(e) => update("budgetRange", e.target.value)}
                    className={selectClasses}
                  >
                    <option value="">Select a budget range</option>
                    {BUDGET_RANGES.map((br) => (
                      <option key={br} value={br}>
                        {br}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Animate>
          )}

          {/* ──────────── Step 3: Deliverables ──────────── */}
          {step === 2 && (
            <Animate animation="fade-up" key="step-2">
              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                  Deliverables
                </h2>

                {form.projectType ? (
                  <fieldset>
                    <legend className="text-base font-bold text-black mb-3">
                      Recommended for {PROJECT_TYPE_LABELS[form.projectType as ProjectType]}
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {DELIVERABLES_BY_TYPE[form.projectType as ProjectType].map((del) => {
                        const checked = form.deliverables.includes(del);
                        return (
                          <label
                            key={del}
                            className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors motion-reduce:transition-none ${
                              checked ? "border-black bg-neutral-50" : "border-neutral-200 hover:border-neutral-400"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleArrayItem("deliverables", del)}
                              className="mt-0.5 w-5 h-5 accent-black flex-shrink-0"
                            />
                            <span className="text-base text-black">{del}</span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                ) : (
                  <p className="text-base text-neutral-500 border border-neutral-200 p-4">
                    Go back to Step 1 and select a Project Type to see recommended deliverables.
                  </p>
                )}

                {/* Custom deliverables */}
                <div>
                  <label htmlFor="customDeliverable" className="block text-base font-bold text-black mb-2">
                    Add Custom Deliverable
                  </label>
                  <div className="flex gap-3">
                    <input
                      id="customDeliverable"
                      type="text"
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addCustomDeliverable();
                        }
                      }}
                      placeholder="Type a deliverable and press Enter or click Add"
                      className={inputClasses}
                    />
                    <button
                      type="button"
                      onClick={addCustomDeliverable}
                      className="flex-shrink-0 bg-black text-white px-6 py-3 text-base font-bold hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {form.customDeliverables.length > 0 && (
                  <div>
                    <p className="text-base font-bold text-black mb-2">Custom Deliverables</p>
                    <ul className="space-y-2">
                      {form.customDeliverables.map((cd) => (
                        <li
                          key={cd}
                          className="flex items-center justify-between border border-neutral-200 p-3"
                        >
                          <span className="text-base text-black">{cd}</span>
                          <button
                            type="button"
                            onClick={() => removeCustomDeliverable(cd)}
                            aria-label={`Remove ${cd}`}
                            className="text-base font-bold text-neutral-400 hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 px-2"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Animate>
          )}

          {/* ──────────── Step 4: Timeline & Pricing ──────────── */}
          {step === 3 && (
            <Animate animation="fade-up" key="step-3">
              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                  Timeline &amp; Pricing
                </h2>

                <div>
                  <label htmlFor="duration" className="block text-base font-bold text-black mb-2">
                    Project Duration
                  </label>
                  <select
                    id="duration"
                    value={form.duration}
                    onChange={(e) => update("duration", e.target.value)}
                    className={selectClasses}
                  >
                    <option value="">Select duration</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <option key={m} value={`${m} month${m > 1 ? "s" : ""}`}>
                        {m} month{m > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="startDate" className="block text-base font-bold text-black mb-2">
                    Estimated Start Date
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    value={form.startDate}
                    onChange={(e) => update("startDate", e.target.value)}
                    min={todayString()}
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="paymentTerms" className="block text-base font-bold text-black mb-2">
                    Payment Terms
                  </label>
                  <select
                    id="paymentTerms"
                    value={form.paymentTerms}
                    onChange={(e) => update("paymentTerms", e.target.value)}
                    className={selectClasses}
                  >
                    <option value="">Select payment terms</option>
                    {PAYMENT_TERMS.map((pt) => (
                      <option key={pt} value={pt}>
                        {pt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="investmentRange" className="block text-base font-bold text-black mb-2">
                    Estimated Investment Range
                  </label>
                  <select
                    id="investmentRange"
                    value={form.investmentRange}
                    onChange={(e) => update("investmentRange", e.target.value)}
                    className={selectClasses}
                  >
                    <option value="">Select an investment range</option>
                    {INVESTMENT_RANGES.map((ir) => (
                      <option key={ir} value={ir}>
                        {ir}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Animate>
          )}

          {/* ──────────── Step 5: Review & Export ──────────── */}
          {step === 4 && (
            <Animate animation="fade-up" key="step-4">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                    Proposal Review
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-black">Completeness:</span>
                    <span
                      className={`text-base font-bold ${
                        completeness === 100
                          ? "text-black"
                          : completeness >= 70
                            ? "text-neutral-600"
                            : "text-neutral-400"
                      }`}
                    >
                      {completeness}%
                    </span>
                    <div className="w-24 bg-neutral-100 h-2">
                      <div
                        className="bg-black h-2 transition-all duration-300 motion-reduce:transition-none"
                        style={{ width: `${completeness}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Proposal Preview */}
                <div className="border border-neutral-200 overflow-hidden">
                  {/* Header */}
                  <div className="bg-black text-white p-6">
                    <p className="text-base font-bold tracking-wide uppercase">Marketing Proposal</p>
                    <p className="text-neutral-400 text-base mt-1">
                      Prepared for {form.clientName || "—"} &middot; {form.companyName || "—"}
                    </p>
                    <p className="text-neutral-400 text-base">{formatDate(todayString())}</p>
                  </div>

                  {/* Section 1 */}
                  <div className="p-6 border-b border-neutral-200">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                      1. Client Overview
                    </h3>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                      <div>
                        <dt className="text-base font-bold text-neutral-500">Client Name</dt>
                        <dd className="text-base text-black">{form.clientName || "—"}</dd>
                      </div>
                      <div>
                        <dt className="text-base font-bold text-neutral-500">Company</dt>
                        <dd className="text-base text-black">{form.companyName || "—"}</dd>
                      </div>
                      <div>
                        <dt className="text-base font-bold text-neutral-500">Industry</dt>
                        <dd className="text-base text-black">{form.industry || "—"}</dd>
                      </div>
                      <div>
                        <dt className="text-base font-bold text-neutral-500">Project Type</dt>
                        <dd className="text-base text-black">
                          {form.projectType ? PROJECT_TYPE_LABELS[form.projectType as ProjectType] : "—"}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {/* Section 2 */}
                  <div className="p-6 border-b border-neutral-200">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                      2. Project Scope
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-base font-bold text-neutral-500 mb-1">Objectives</p>
                        {form.objectives.length > 0 ? (
                          <ul className="list-disc list-inside text-base text-black space-y-1">
                            {form.objectives.map((o) => (
                              <li key={o}>{o}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-base text-neutral-400">None specified</p>
                        )}
                      </div>
                      <div>
                        <p className="text-base font-bold text-neutral-500">Target Audience</p>
                        <p className="text-base text-black">{form.targetAudience || "—"}</p>
                      </div>
                      <div>
                        <p className="text-base font-bold text-neutral-500">Geographic Focus</p>
                        <p className="text-base text-black">{form.geographicFocus || "—"}</p>
                      </div>
                      <div>
                        <p className="text-base font-bold text-neutral-500">Budget Range</p>
                        <p className="text-base text-black">{form.budgetRange || "—"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Section 3 */}
                  <div className="p-6 border-b border-neutral-200">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                      3. Deliverables
                    </h3>
                    {form.deliverables.length > 0 || form.customDeliverables.length > 0 ? (
                      <ol className="list-decimal list-inside text-base text-black space-y-1">
                        {[...form.deliverables, ...form.customDeliverables].map((d, i) => (
                          <li key={`${d}-${i}`}>{d}</li>
                        ))}
                      </ol>
                    ) : (
                      <p className="text-base text-neutral-400">No deliverables selected</p>
                    )}
                  </div>

                  {/* Section 4 */}
                  <div className="p-6 border-b border-neutral-200">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                      4. Timeline &amp; Pricing
                    </h3>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                      <div>
                        <dt className="text-base font-bold text-neutral-500">Duration</dt>
                        <dd className="text-base text-black">{form.duration || "—"}</dd>
                      </div>
                      <div>
                        <dt className="text-base font-bold text-neutral-500">Start Date</dt>
                        <dd className="text-base text-black">
                          {form.startDate ? formatDate(form.startDate) : "—"}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-base font-bold text-neutral-500">Payment Terms</dt>
                        <dd className="text-base text-black">{form.paymentTerms || "—"}</dd>
                      </div>
                      <div>
                        <dt className="text-base font-bold text-neutral-500">Investment</dt>
                        <dd className="text-base text-black">{form.investmentRange || "—"}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Disclaimer */}
                  <div className="p-6 bg-neutral-50">
                    <p className="text-base text-neutral-500">
                      <strong className="text-black">Disclaimer:</strong> This proposal is a preliminary
                      outline generated for planning purposes. Final scope, pricing, and timelines are
                      subject to discussion and mutual agreement. All figures are estimates and do not
                      constitute a binding contract or guarantee of results.
                    </p>
                  </div>
                </div>

                {/* Export button */}
                <button
                  type="button"
                  onClick={exportAsText}
                  className="bg-black text-white px-8 py-4 text-base font-bold hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Export as .txt File
                </button>
              </div>
            </Animate>
          )}
        </div>
      </section>

      {/* ── Back / Next Nav ────────────────────────────────────── */}
      <section className="px-6 lg:px-12 pb-16">
        <div className="max-w-3xl mx-auto flex justify-between">
          {step > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="border border-neutral-300 text-black px-8 py-4 text-base font-bold hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              &larr; Back
            </button>
          ) : (
            <span />
          )}
          {step < STEPS.length - 1 && (
            <button
              type="button"
              onClick={goNext}
              disabled={!canAdvance()}
              className={`px-8 py-4 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                canAdvance()
                  ? "bg-black text-white hover:bg-neutral-800"
                  : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              }`}
            >
              Next &rarr;
            </button>
          )}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need a Custom Proposal?
            </h2>
            <p className="text-lg text-neutral-400 mt-4 mb-8">
              Our team can build a detailed, tailored marketing proposal based on your specific business
              goals and competitive landscape.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Request a Custom Proposal &rarr;
            </Link>
          </Animate>
        </div>
      </section>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Proposal Generator",
          description: "Generate professional marketing proposals with scope, deliverables, timeline, and pricing sections. Free tool from Markit Media.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Marketing Proposal Generator"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Marketing Maturity", href: "/resources/marketing-maturity" },
          { title: "Marketing Rfp Template", href: "/resources/marketing-rfp-template" },
          { title: "Marketing Stack Audit", href: "/resources/marketing-stack-audit" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
