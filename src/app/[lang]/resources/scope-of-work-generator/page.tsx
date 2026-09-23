"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ================================================================== */
/*  Types                                                              */
/* ================================================================== */

type ProjectType =
  | "website-redesign"
  | "seo-campaign"
  | "social-media-management"
  | "ppc-campaign"
  | "branding"
  | "content-marketing"
  | "email-marketing"
  | "full-stack-marketing";

interface Deliverable {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  responsibleParty: string;
}

interface Milestone {
  id: string;
  name: string;
  date: string;
  description: string;
  deliverableRefs: string[];
}

interface BudgetItem {
  id: string;
  deliverable: string;
  hours: number;
  rate: number;
}

interface OutOfScopeItem {
  id: string;
  text: string;
}

type PaymentSchedule = "upfront" | "50-50" | "monthly" | "milestone-based";
type CommunicationCadence = "weekly" | "biweekly" | "monthly";
type ReportingCadence = "weekly" | "biweekly" | "monthly";

interface SOWData {
  /* Project Setup */
  projectName: string;
  clientName: string;
  preparedBy: string;
  date: string;
  projectType: ProjectType | "";

  /* Project Overview */
  objectives: string[];
  scopeSummary: string;

  /* Deliverables */
  deliverables: Deliverable[];

  /* Timeline & Milestones */
  milestones: Milestone[];

  /* Budget */
  budgetItems: BudgetItem[];

  /* Terms */
  paymentSchedule: PaymentSchedule;
  revisionRounds: number;
  communicationCadence: CommunicationCadence;
  reportingCadence: ReportingCadence;

  /* Out of Scope */
  outOfScope: OutOfScopeItem[];
}

/* ================================================================== */
/*  Constants                                                          */
/* ================================================================== */

const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  "website-redesign": "Website Redesign",
  "seo-campaign": "SEO Campaign",
  "social-media-management": "Social Media Management",
  "ppc-campaign": "PPC Campaign",
  branding: "Branding",
  "content-marketing": "Content Marketing",
  "email-marketing": "Email Marketing",
  "full-stack-marketing": "Full-Stack Marketing",
};

const STORAGE_KEY = "markit-sow-generator";

/* ── Template pre-fills ──────────────────────────────────────────── */

interface Template {
  deliverables: Omit<Deliverable, "id">[];
  milestones: Omit<Milestone, "id">[];
  outOfScope: string[];
}

const TEMPLATES: Record<ProjectType, Template> = {
  "website-redesign": {
    deliverables: [
      { name: "Discovery & Requirements Document", description: "Stakeholder interviews, competitive analysis, and project requirements", dueDate: "", responsibleParty: "Agency" },
      { name: "Wireframes & Site Architecture", description: "Low-fidelity wireframes for all key pages and sitemap", dueDate: "", responsibleParty: "Agency" },
      { name: "Visual Design Mockups", description: "High-fidelity designs for homepage, interior pages, and mobile views", dueDate: "", responsibleParty: "Agency" },
      { name: "Frontend Development", description: "Responsive HTML/CSS/JS build of all approved designs", dueDate: "", responsibleParty: "Agency" },
      { name: "CMS Integration", description: "WordPress or headless CMS setup with editable content areas", dueDate: "", responsibleParty: "Agency" },
      { name: "QA & Launch", description: "Cross-browser testing, performance optimization, and go-live", dueDate: "", responsibleParty: "Agency" },
    ],
    milestones: [
      { name: "Discovery Complete", date: "", description: "Requirements finalized and approved", deliverableRefs: [] },
      { name: "Design Approval", date: "", description: "All visual mockups signed off", deliverableRefs: [] },
      { name: "Development Complete", date: "", description: "Site built and ready for QA", deliverableRefs: [] },
      { name: "Launch", date: "", description: "Site goes live on production", deliverableRefs: [] },
    ],
    outOfScope: ["Copywriting for all pages", "Stock photography licensing", "Ongoing hosting and maintenance", "Third-party integrations not specified"],
  },
  "seo-campaign": {
    deliverables: [
      { name: "Technical SEO Audit", description: "Comprehensive site crawl and technical issue report", dueDate: "", responsibleParty: "Agency" },
      { name: "Keyword Research & Strategy", description: "Target keyword list with search volume and difficulty analysis", dueDate: "", responsibleParty: "Agency" },
      { name: "On-Page Optimization", description: "Title tags, meta descriptions, header tags, and internal linking", dueDate: "", responsibleParty: "Agency" },
      { name: "Content Recommendations", description: "Monthly content briefs for SEO-driven blog posts", dueDate: "", responsibleParty: "Agency" },
      { name: "Link Building", description: "Off-page SEO through outreach and quality backlink acquisition", dueDate: "", responsibleParty: "Agency" },
      { name: "Monthly Performance Report", description: "Rankings, traffic, and conversion tracking report", dueDate: "", responsibleParty: "Agency" },
    ],
    milestones: [
      { name: "Audit Delivered", date: "", description: "Technical audit report completed", deliverableRefs: [] },
      { name: "Strategy Approved", date: "", description: "Keyword strategy and roadmap signed off", deliverableRefs: [] },
      { name: "Month 3 Review", date: "", description: "First quarterly performance review", deliverableRefs: [] },
      { name: "Month 6 Review", date: "", description: "Mid-campaign assessment and strategy adjustment", deliverableRefs: [] },
    ],
    outOfScope: ["Website development changes", "Content writing (briefs only)", "Paid advertising management", "Social media management"],
  },
  "social-media-management": {
    deliverables: [
      { name: "Social Media Strategy", description: "Platform selection, content pillars, posting cadence, and growth tactics", dueDate: "", responsibleParty: "Agency" },
      { name: "Content Calendar", description: "Monthly content calendar with post copy and visual direction", dueDate: "", responsibleParty: "Agency" },
      { name: "Content Creation", description: "Graphic design, short-form video, and copywriting for posts", dueDate: "", responsibleParty: "Agency" },
      { name: "Community Management", description: "Daily monitoring, comment responses, and engagement", dueDate: "", responsibleParty: "Agency" },
      { name: "Monthly Analytics Report", description: "Follower growth, engagement rates, and content performance", dueDate: "", responsibleParty: "Agency" },
    ],
    milestones: [
      { name: "Strategy Approved", date: "", description: "Social media strategy document signed off", deliverableRefs: [] },
      { name: "First Month Live", date: "", description: "First full month of managed content published", deliverableRefs: [] },
      { name: "Quarter 1 Review", date: "", description: "Performance review and strategy refinement", deliverableRefs: [] },
    ],
    outOfScope: ["Paid social advertising spend", "Influencer partnerships", "Photography and video shoots", "Crisis communications management"],
  },
  "ppc-campaign": {
    deliverables: [
      { name: "Account Audit & Setup", description: "Review existing accounts or set up new Google/Meta ad accounts", dueDate: "", responsibleParty: "Agency" },
      { name: "Keyword & Audience Research", description: "Target keywords, audiences, and bidding strategy", dueDate: "", responsibleParty: "Agency" },
      { name: "Ad Creative & Copy", description: "Ad variations for search, display, and/or social campaigns", dueDate: "", responsibleParty: "Agency" },
      { name: "Landing Page Recommendations", description: "Conversion-optimized landing page wireframes or feedback", dueDate: "", responsibleParty: "Agency" },
      { name: "Conversion Tracking Setup", description: "Pixel installation, event tracking, and attribution configuration", dueDate: "", responsibleParty: "Agency" },
      { name: "Weekly Optimization & Reporting", description: "Bid adjustments, A/B testing, and weekly performance summaries", dueDate: "", responsibleParty: "Agency" },
    ],
    milestones: [
      { name: "Account Setup Complete", date: "", description: "All tracking and accounts configured", deliverableRefs: [] },
      { name: "Campaign Launch", date: "", description: "Ads go live across all channels", deliverableRefs: [] },
      { name: "Month 1 Review", date: "", description: "First month performance analysis", deliverableRefs: [] },
      { name: "Quarter 1 Review", date: "", description: "Full quarterly review with optimization plan", deliverableRefs: [] },
    ],
    outOfScope: ["Ad spend budget (billed separately)", "Landing page development", "Organic social media management", "Creative photography or video production"],
  },
  branding: {
    deliverables: [
      { name: "Brand Discovery Workshop", description: "Facilitated session to define values, positioning, and audience", dueDate: "", responsibleParty: "Agency" },
      { name: "Logo Design", description: "Primary logo with variations (horizontal, stacked, icon-only)", dueDate: "", responsibleParty: "Agency" },
      { name: "Brand Style Guide", description: "Colors, typography, imagery direction, and usage rules", dueDate: "", responsibleParty: "Agency" },
      { name: "Brand Messaging Framework", description: "Mission, vision, tagline, value proposition, and tone of voice", dueDate: "", responsibleParty: "Agency" },
      { name: "Collateral Templates", description: "Business card, letterhead, email signature, and social templates", dueDate: "", responsibleParty: "Agency" },
    ],
    milestones: [
      { name: "Discovery Complete", date: "", description: "Workshop completed and brief approved", deliverableRefs: [] },
      { name: "Logo Concepts Presented", date: "", description: "Initial logo concepts delivered for review", deliverableRefs: [] },
      { name: "Brand Guide Delivered", date: "", description: "Complete brand style guide finalized", deliverableRefs: [] },
      { name: "Collateral Delivered", date: "", description: "All template files delivered", deliverableRefs: [] },
    ],
    outOfScope: ["Website design or development", "Marketing strategy or campaigns", "Print production", "Ongoing design retainer"],
  },
  "content-marketing": {
    deliverables: [
      { name: "Content Strategy Document", description: "Content pillars, audience personas, funnel mapping, and KPIs", dueDate: "", responsibleParty: "Agency" },
      { name: "Editorial Calendar", description: "Monthly calendar with topics, formats, and distribution channels", dueDate: "", responsibleParty: "Agency" },
      { name: "Blog Articles", description: "Long-form SEO-optimized blog posts (4 per month)", dueDate: "", responsibleParty: "Agency" },
      { name: "Lead Magnet / Whitepaper", description: "One gated content asset per quarter", dueDate: "", responsibleParty: "Agency" },
      { name: "Monthly Performance Report", description: "Traffic, engagement, and lead generation metrics", dueDate: "", responsibleParty: "Agency" },
    ],
    milestones: [
      { name: "Strategy Approved", date: "", description: "Content strategy signed off by stakeholders", deliverableRefs: [] },
      { name: "First Month Published", date: "", description: "First batch of content live", deliverableRefs: [] },
      { name: "Quarter 1 Review", date: "", description: "Quarterly performance assessment", deliverableRefs: [] },
    ],
    outOfScope: ["Video production", "Paid content promotion spend", "Website development", "Social media management"],
  },
  "email-marketing": {
    deliverables: [
      { name: "Email Strategy & Audit", description: "Review existing lists, deliverability, and automation flows", dueDate: "", responsibleParty: "Agency" },
      { name: "List Segmentation Plan", description: "Audience segments based on behavior, demographics, and engagement", dueDate: "", responsibleParty: "Agency" },
      { name: "Email Template Design", description: "Branded, responsive templates for campaigns and automations", dueDate: "", responsibleParty: "Agency" },
      { name: "Automated Sequences", description: "Welcome series, nurture flows, and re-engagement campaigns", dueDate: "", responsibleParty: "Agency" },
      { name: "Monthly Campaign Execution", description: "4 email campaigns per month with copy, design, and sending", dueDate: "", responsibleParty: "Agency" },
      { name: "Monthly Analytics Report", description: "Open rates, CTR, conversions, and deliverability metrics", dueDate: "", responsibleParty: "Agency" },
    ],
    milestones: [
      { name: "Audit Complete", date: "", description: "Email audit report delivered", deliverableRefs: [] },
      { name: "Templates Approved", date: "", description: "Email templates signed off", deliverableRefs: [] },
      { name: "Automations Live", date: "", description: "All automated sequences activated", deliverableRefs: [] },
      { name: "Month 3 Review", date: "", description: "Quarterly performance review", deliverableRefs: [] },
    ],
    outOfScope: ["Email platform subscription fees", "List purchasing or acquisition", "SMS marketing", "Landing page development"],
  },
  "full-stack-marketing": {
    deliverables: [
      { name: "Marketing Strategy & Roadmap", description: "Comprehensive 6-12 month marketing plan across all channels", dueDate: "", responsibleParty: "Agency" },
      { name: "SEO & Content Marketing", description: "Technical SEO, keyword strategy, and monthly blog content", dueDate: "", responsibleParty: "Agency" },
      { name: "Paid Advertising", description: "Google Ads and Meta Ads management with creative and optimization", dueDate: "", responsibleParty: "Agency" },
      { name: "Social Media Management", description: "Content creation, scheduling, and community management", dueDate: "", responsibleParty: "Agency" },
      { name: "Email Marketing", description: "Monthly campaigns and automated sequences", dueDate: "", responsibleParty: "Agency" },
      { name: "Website Optimization", description: "CRO improvements, landing pages, and performance monitoring", dueDate: "", responsibleParty: "Agency" },
      { name: "Monthly Analytics & Reporting", description: "Cross-channel dashboard with insights and recommendations", dueDate: "", responsibleParty: "Agency" },
      { name: "Quarterly Strategy Reviews", description: "In-depth review with updated roadmap and priorities", dueDate: "", responsibleParty: "Agency" },
    ],
    milestones: [
      { name: "Strategy Approved", date: "", description: "Marketing roadmap signed off", deliverableRefs: [] },
      { name: "All Channels Live", date: "", description: "Every channel active and being managed", deliverableRefs: [] },
      { name: "Quarter 1 Review", date: "", description: "First quarterly performance review", deliverableRefs: [] },
      { name: "Quarter 2 Review", date: "", description: "Mid-year assessment and strategy refresh", deliverableRefs: [] },
    ],
    outOfScope: ["Ad spend budgets (billed separately)", "Photography and video production", "Website redesign or rebuild", "PR and press outreach"],
  },
};

/* ================================================================== */
/*  Helpers                                                            */
/* ================================================================== */

let _counter = 0;
function uid(): string {
  _counter += 1;
  return `uid-${Date.now()}-${_counter}`;
}

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

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
}

function createInitialData(): SOWData {
  return {
    projectName: "",
    clientName: "",
    preparedBy: "",
    date: todayString(),
    projectType: "",
    objectives: [""],
    scopeSummary: "",
    deliverables: [],
    milestones: [],
    budgetItems: [],
    paymentSchedule: "50-50",
    revisionRounds: 2,
    communicationCadence: "weekly",
    reportingCadence: "monthly",
    outOfScope: [],
  };
}

/* ================================================================== */
/*  Text Export                                                         */
/* ================================================================== */

function generateSOWText(data: SOWData): string {
  const divider = "=".repeat(64);
  const thin = "-".repeat(64);
  const projectTotal = data.budgetItems.reduce((sum, item) => sum + item.hours * item.rate, 0);

  const lines: string[] = [
    divider,
    "SCOPE OF WORK",
    divider,
    "",
    `Project: ${data.projectName || "--"}`,
    `Client: ${data.clientName || "--"}`,
    `Prepared By: ${data.preparedBy || "--"}`,
    `Date: ${formatDate(data.date)}`,
    `Project Type: ${data.projectType ? PROJECT_TYPE_LABELS[data.projectType] : "--"}`,
    "",
    divider,
    "1. PROJECT OVERVIEW",
    divider,
    "",
    "Objectives:",
    ...data.objectives.filter((o) => o.trim()).map((o) => `  - ${o}`),
    ...(data.objectives.filter((o) => o.trim()).length === 0 ? ["  (none specified)"] : []),
    "",
    "Scope Summary:",
    data.scopeSummary || "  (none provided)",
    "",
    divider,
    "2. DELIVERABLES",
    divider,
    "",
    ...(data.deliverables.length > 0
      ? data.deliverables.flatMap((d, i) => [
          `  ${i + 1}. ${d.name}`,
          `     Description: ${d.description || "--"}`,
          `     Due Date: ${d.dueDate ? formatDate(d.dueDate) : "TBD"}`,
          `     Responsible: ${d.responsibleParty || "--"}`,
          "",
        ])
      : ["  (no deliverables specified)", ""]),
    divider,
    "3. TIMELINE & MILESTONES",
    divider,
    "",
    ...(data.milestones.length > 0
      ? data.milestones.flatMap((m, i) => [
          `  ${i + 1}. ${m.name}`,
          `     Date: ${m.date ? formatDate(m.date) : "TBD"}`,
          `     Description: ${m.description || "--"}`,
          ...(m.deliverableRefs.length > 0
            ? [`     Linked Deliverables: ${m.deliverableRefs.join(", ")}`]
            : []),
          "",
        ])
      : ["  (no milestones specified)", ""]),
    divider,
    "4. BUDGET",
    divider,
    "",
    ...(data.budgetItems.length > 0
      ? [
          ...data.budgetItems.map(
            (b, i) =>
              `  ${i + 1}. ${b.deliverable || "--"} | ${b.hours}h x ${formatCurrency(b.rate)}/h = ${formatCurrency(b.hours * b.rate)}`
          ),
          "",
          thin,
          `  PROJECT TOTAL: ${formatCurrency(projectTotal)}`,
          thin,
          "",
        ]
      : ["  (no budget items specified)", ""]),
    divider,
    "5. TERMS & CONDITIONS",
    divider,
    "",
    `  Payment Schedule: ${
      data.paymentSchedule === "upfront"
        ? "100% Upfront"
        : data.paymentSchedule === "50-50"
          ? "50% Upfront / 50% on Completion"
          : data.paymentSchedule === "monthly"
            ? "Monthly Invoicing"
            : "Milestone-Based Payments"
    }`,
    `  Revision Rounds: ${data.revisionRounds}`,
    `  Communication: ${data.communicationCadence.charAt(0).toUpperCase() + data.communicationCadence.slice(1)} check-ins`,
    `  Reporting: ${data.reportingCadence.charAt(0).toUpperCase() + data.reportingCadence.slice(1)} reports`,
    "",
    divider,
    "6. OUT OF SCOPE",
    divider,
    "",
    ...(data.outOfScope.filter((o) => o.text.trim()).length > 0
      ? data.outOfScope.filter((o) => o.text.trim()).map((o) => `  - ${o.text}`)
      : ["  (none specified)"]),
    "",
    thin,
    "",
    "DISCLAIMER:",
    "This Scope of Work is a preliminary planning document generated",
    "for organizational purposes. Final deliverables, timelines, and",
    "costs are subject to mutual agreement. This document does not",
    "constitute a binding contract.",
    "",
    thin,
    `Generated on ${formatDate(todayString())} using the Scope of Work Generator by Markit Media.`,
    "",
  ];

  return lines.join("\n");
}

/* ================================================================== */
/*  Sections (tabs)                                                    */
/* ================================================================== */

const SECTIONS = [
  "Setup",
  "Overview",
  "Deliverables",
  "Timeline",
  "Budget",
  "Terms",
  "Out of Scope",
  "Preview",
] as const;

type SectionName = (typeof SECTIONS)[number];

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */



export default function ScopeOfWorkGeneratorPage() {
  const [data, setData] = useState<SOWData>(createInitialData);
  const [activeSection, setActiveSection] = useState<SectionName>("Setup");
  const [showPreview, setShowPreview] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  /* ── localStorage persistence ───────────────────────────────── */

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as SOWData;
        setData(parsed);
      }
    } catch {
      /* ignore corrupt data */
    }
  }, []);

  const saveToStorage = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSaveMessage("Saved to browser");
      setTimeout(() => setSaveMessage(""), 2000);
    } catch {
      setSaveMessage("Save failed");
      setTimeout(() => setSaveMessage(""), 2000);
    }
  }, [data]);

  /* ── Updaters ───────────────────────────────────────────────── */

  function update<K extends keyof SOWData>(key: K, value: SOWData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function applyTemplate(type: ProjectType) {
    const template = TEMPLATES[type];
    setData((prev) => ({
      ...prev,
      projectType: type,
      deliverables: template.deliverables.map((d) => ({ ...d, id: uid() })),
      milestones: template.milestones.map((m) => ({ ...m, id: uid() })),
      outOfScope: template.outOfScope.map((text) => ({ id: uid(), text })),
    }));
  }

  /* ── Objective helpers ──────────────────────────────────────── */

  function addObjective() {
    update("objectives", [...data.objectives, ""]);
  }

  function updateObjective(index: number, value: string) {
    const next = [...data.objectives];
    next[index] = value;
    update("objectives", next);
  }

  function removeObjective(index: number) {
    if (data.objectives.length <= 1) return;
    update("objectives", data.objectives.filter((_, i) => i !== index));
  }

  /* ── Deliverable helpers ────────────────────────────────────── */

  function addDeliverable() {
    update("deliverables", [
      ...data.deliverables,
      { id: uid(), name: "", description: "", dueDate: "", responsibleParty: "" },
    ]);
  }

  function updateDeliverable(id: string, field: keyof Deliverable, value: string) {
    update(
      "deliverables",
      data.deliverables.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  }

  function removeDeliverable(id: string) {
    update("deliverables", data.deliverables.filter((d) => d.id !== id));
  }

  /* ── Milestone helpers ──────────────────────────────────────── */

  function addMilestone() {
    update("milestones", [
      ...data.milestones,
      { id: uid(), name: "", date: "", description: "", deliverableRefs: [] },
    ]);
  }

  function updateMilestone(id: string, field: keyof Omit<Milestone, "id" | "deliverableRefs">, value: string) {
    update(
      "milestones",
      data.milestones.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  }

  function toggleMilestoneRef(milestoneId: string, deliverableName: string) {
    update(
      "milestones",
      data.milestones.map((m) => {
        if (m.id !== milestoneId) return m;
        const refs = m.deliverableRefs.includes(deliverableName)
          ? m.deliverableRefs.filter((r) => r !== deliverableName)
          : [...m.deliverableRefs, deliverableName];
        return { ...m, deliverableRefs: refs };
      })
    );
  }

  function removeMilestone(id: string) {
    update("milestones", data.milestones.filter((m) => m.id !== id));
  }

  /* ── Budget helpers ─────────────────────────────────────────── */

  function addBudgetItem() {
    update("budgetItems", [
      ...data.budgetItems,
      { id: uid(), deliverable: "", hours: 0, rate: 0 },
    ]);
  }

  function updateBudgetItem(id: string, field: keyof Omit<BudgetItem, "id">, value: string | number) {
    update(
      "budgetItems",
      data.budgetItems.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    );
  }

  function removeBudgetItem(id: string) {
    update("budgetItems", data.budgetItems.filter((b) => b.id !== id));
  }

  const projectTotal = data.budgetItems.reduce((sum, item) => sum + item.hours * item.rate, 0);

  /* ── Out of Scope helpers ───────────────────────────────────── */

  function addOutOfScope() {
    update("outOfScope", [...data.outOfScope, { id: uid(), text: "" }]);
  }

  function updateOutOfScope(id: string, value: string) {
    update("outOfScope", data.outOfScope.map((o) => (o.id === id ? { ...o, text: value } : o)));
  }

  function removeOutOfScope(id: string) {
    update("outOfScope", data.outOfScope.filter((o) => o.id !== id));
  }

  /* ── Export ─────────────────────────────────────────────────── */

  function exportAsText() {
    const text = generateSOWText(data);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const filename = data.projectName
      ? `sow-${data.projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`
      : "scope-of-work.txt";
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* ── Reset ──────────────────────────────────────────────────── */

  function handleReset() {
    if (typeof window !== "undefined" && !window.confirm("Reset all fields? This cannot be undone.")) return;
    localStorage.removeItem(STORAGE_KEY);
    setData(createInitialData());
    setActiveSection("Setup");
    setShowPreview(false);
  }

  /* ── Shared styling ─────────────────────────────────────────── */

  const inputClasses =
    "w-full border border-neutral-300 bg-white text-black px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black focus-visible:ring-1 focus-visible:ring-black transition-colors motion-reduce:transition-none";
  const selectClasses =
    "w-full border border-neutral-300 bg-white text-black px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black focus-visible:ring-1 focus-visible:ring-black transition-colors motion-reduce:transition-none appearance-none";
  const btnPrimary =
    "inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-bold text-base hover:bg-neutral-800 transition-colors motion-reduce:transition-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2";
  const btnSecondary =
    "text-base font-bold text-neutral-500 hover:text-black transition-colors motion-reduce:transition-none min-h-[44px] px-6 py-3 border border-neutral-200 hover:border-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";
  const btnRemove =
    "text-base text-neutral-400 hover:text-black transition-colors motion-reduce:transition-none min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";
  const btnAdd =
    "text-base font-bold text-neutral-500 hover:text-black transition-colors motion-reduce:transition-none min-h-[44px] px-4 py-2 border border-neutral-200 hover:border-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";

  /* ═══════════════════════════════════════════════════════════════ */
  /*  RENDER                                                        */
  /* ═══════════════════════════════════════════════════════════════ */

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Scope of Work Generator",
          description: "Stakeholder interviews, competitive analysis, and project requirements",
          url: "https://themarkitmedia.com/en/resources/scope-of-work-generator",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Scope of Work Generator | Free Marketing Tool — Markit Media</title>
      <meta name="description" content="Stakeholder interviews, competitive analysis, and project requirements" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Scope of Work Generator",
          description:
            "Generate professional scopes of work for marketing projects. Define deliverables, timelines, milestones, and terms.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Scope of Work Generator" },
        ]}
      />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Scope of Work Generator
            </h1>
            <SectionDesc>
              Build a professional scope of work for any marketing project. Define deliverables,
              set milestones, outline budgets and terms, then export the finished document.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ── Section Navigation ─────────────────────────────────── */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <nav aria-label="Form sections">
              <ol className="flex flex-wrap gap-2">
                {SECTIONS.map((section) => {
                  const isActive = activeSection === section && !showPreview;
                  const isPreview = section === "Preview" && showPreview;
                  return (
                    <li key={section}>
                      <button
                        onClick={() => {
                          if (section === "Preview") {
                            setShowPreview(true);
                          } else {
                            setShowPreview(false);
                            setActiveSection(section);
                          }
                        }}
                        className={`px-4 py-2 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                          isActive || isPreview
                            ? "bg-black text-white"
                            : "text-neutral-500 hover:text-black border border-neutral-200 hover:border-black"
                        }`}
                        aria-current={isActive || isPreview ? "step" : undefined}
                      >
                        {section}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </Animate>
        </div>
      </section>

      {/* ── Form Sections ──────────────────────────────────────── */}
      <section aria-label="Project Setup" className="px-6 lg:px-12 pb-12">
        <div className="max-w-4xl mx-auto">

          {/* ──────────── Setup ──────────── */}
          {!showPreview && activeSection === "Setup" && (
            <Animate animation="fade-up" key="setup">
              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  Project Setup
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="projectName" className="block text-base font-bold text-black mb-2">
                      Project Name
                    </label>
                    <input
                      id="projectName"
                      type="text"
                      value={data.projectName}
                      onChange={(e) => update("projectName", e.target.value)}
                      placeholder="e.g. Q1 Website Redesign"
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="clientName" className="block text-base font-bold text-black mb-2">
                      Client Name
                    </label>
                    <input
                      id="clientName"
                      type="text"
                      value={data.clientName}
                      onChange={(e) => update("clientName", e.target.value)}
                      placeholder="e.g. Acme Corp"
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="preparedBy" className="block text-base font-bold text-black mb-2">
                      Prepared By
                    </label>
                    <input
                      id="preparedBy"
                      type="text"
                      value={data.preparedBy}
                      onChange={(e) => update("preparedBy", e.target.value)}
                      placeholder="e.g. Your Name or Agency"
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="sowDate" className="block text-base font-bold text-black mb-2">
                      Date
                    </label>
                    <input
                      id="sowDate"
                      type="date"
                      value={data.date}
                      onChange={(e) => update("date", e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-base font-bold text-black mb-2">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    value={data.projectType}
                    onChange={(e) => {
                      const val = e.target.value as ProjectType | "";
                      if (val) {
                        applyTemplate(val);
                      } else {
                        update("projectType", "");
                      }
                    }}
                    className={selectClasses}
                  >
                    <option value="">Select a project type (pre-fills template)</option>
                    {(Object.keys(PROJECT_TYPE_LABELS) as ProjectType[]).map((pt) => (
                      <option key={pt} value={pt}>
                        {PROJECT_TYPE_LABELS[pt]}
                      </option>
                    ))}
                  </select>
                  <p className="text-base text-neutral-500 mt-2">
                    Selecting a project type will pre-fill deliverables, milestones, and out-of-scope items. You can edit everything afterwards.
                  </p>
                </div>
              </div>
            </Animate>
          )}

          {/* ──────────── Project Overview ──────────── */}
          {!showPreview && activeSection === "Overview" && (
            <Animate animation="fade-up" key="overview">
              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  Project Overview
                </h2>

                <fieldset>
                  <legend className="text-base font-bold text-black mb-3">
                    Objectives
                  </legend>
                  <div className="space-y-3">
                    {data.objectives.map((obj, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <label htmlFor={`objective-${i}`} className="sr-only">
                          Objective {i + 1}
                        </label>
                        <input
                          id={`objective-${i}`}
                          type="text"
                          value={obj}
                          onChange={(e) => updateObjective(i, e.target.value)}
                          placeholder={`Objective ${i + 1}`}
                          className={inputClasses}
                        />
                        {data.objectives.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeObjective(i)}
                            className={btnRemove}
                            aria-label={`Remove objective ${i + 1}`}
                          >
                            &times;
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={addObjective} className={`${btnAdd} mt-3`}>
                    + Add Objective
                  </button>
                </fieldset>

                <div>
                  <label htmlFor="scopeSummary" className="block text-base font-bold text-black mb-2">
                    Scope Summary
                  </label>
                  <textarea
                    id="scopeSummary"
                    value={data.scopeSummary}
                    onChange={(e) => update("scopeSummary", e.target.value)}
                    placeholder="Provide a high-level summary of the project scope, goals, and approach..."
                    rows={5}
                    className={inputClasses}
                  />
                </div>
              </div>
            </Animate>
          )}

          {/* ──────────── Deliverables ──────────── */}
          {!showPreview && activeSection === "Deliverables" && (
            <Animate animation="fade-up" key="deliverables">
              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  Deliverables
                </h2>

                {data.deliverables.length === 0 && (
                  <p className="text-base text-neutral-500">
                    No deliverables yet. Add items below or select a project type in Setup to pre-fill.
                  </p>
                )}

                {data.deliverables.map((del, i) => (
                  <div key={del.id} className="border border-neutral-200 p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-base font-bold text-neutral-400">#{i + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeDeliverable(del.id)}
                        className={btnRemove}
                        aria-label={`Remove deliverable ${i + 1}`}
                      >
                        &times;
                      </button>
                    </div>

                    <div>
                      <label htmlFor={`del-name-${del.id}`} className="block text-base font-bold text-black mb-2">
                        Deliverable Name
                      </label>
                      <input
                        id={`del-name-${del.id}`}
                        type="text"
                        value={del.name}
                        onChange={(e) => updateDeliverable(del.id, "name", e.target.value)}
                        placeholder="e.g. Brand Style Guide"
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label htmlFor={`del-desc-${del.id}`} className="block text-base font-bold text-black mb-2">
                        Description
                      </label>
                      <textarea
                        id={`del-desc-${del.id}`}
                        value={del.description}
                        onChange={(e) => updateDeliverable(del.id, "description", e.target.value)}
                        placeholder="What does this deliverable include?"
                        rows={2}
                        className={inputClasses}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={`del-date-${del.id}`} className="block text-base font-bold text-black mb-2">
                          Due Date
                        </label>
                        <input
                          id={`del-date-${del.id}`}
                          type="date"
                          value={del.dueDate}
                          onChange={(e) => updateDeliverable(del.id, "dueDate", e.target.value)}
                          className={inputClasses}
                        />
                      </div>

                      <div>
                        <label htmlFor={`del-party-${del.id}`} className="block text-base font-bold text-black mb-2">
                          Responsible Party
                        </label>
                        <input
                          id={`del-party-${del.id}`}
                          type="text"
                          value={del.responsibleParty}
                          onChange={(e) => updateDeliverable(del.id, "responsibleParty", e.target.value)}
                          placeholder="e.g. Agency, Client, Third Party"
                          className={inputClasses}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button type="button" onClick={addDeliverable} className={btnAdd}>
                  + Add Deliverable
                </button>
              </div>
            </Animate>
          )}

          {/* ──────────── Timeline & Milestones ──────────── */}
          {!showPreview && activeSection === "Timeline" && (
            <Animate animation="fade-up" key="timeline">
              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  Timeline &amp; Milestones
                </h2>

                {data.milestones.length === 0 && (
                  <p className="text-base text-neutral-500">
                    No milestones yet. Add items below or select a project type in Setup to pre-fill.
                  </p>
                )}

                {data.milestones.map((ms, i) => (
                  <div key={ms.id} className="border border-neutral-200 p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-base font-bold text-neutral-400">Milestone #{i + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeMilestone(ms.id)}
                        className={btnRemove}
                        aria-label={`Remove milestone ${i + 1}`}
                      >
                        &times;
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={`ms-name-${ms.id}`} className="block text-base font-bold text-black mb-2">
                          Milestone Name
                        </label>
                        <input
                          id={`ms-name-${ms.id}`}
                          type="text"
                          value={ms.name}
                          onChange={(e) => updateMilestone(ms.id, "name", e.target.value)}
                          placeholder="e.g. Design Approval"
                          className={inputClasses}
                        />
                      </div>

                      <div>
                        <label htmlFor={`ms-date-${ms.id}`} className="block text-base font-bold text-black mb-2">
                          Target Date
                        </label>
                        <input
                          id={`ms-date-${ms.id}`}
                          type="date"
                          value={ms.date}
                          onChange={(e) => updateMilestone(ms.id, "date", e.target.value)}
                          className={inputClasses}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor={`ms-desc-${ms.id}`} className="block text-base font-bold text-black mb-2">
                        Description
                      </label>
                      <textarea
                        id={`ms-desc-${ms.id}`}
                        value={ms.description}
                        onChange={(e) => updateMilestone(ms.id, "description", e.target.value)}
                        placeholder="What does this milestone represent?"
                        rows={2}
                        className={inputClasses}
                      />
                    </div>

                    {data.deliverables.length > 0 && (
                      <fieldset>
                        <legend className="text-base font-bold text-black mb-2">
                          Linked Deliverables
                        </legend>
                        <div className="flex flex-wrap gap-2">
                          {data.deliverables.filter((d) => d.name.trim()).map((d) => {
                            const isLinked = ms.deliverableRefs.includes(d.name);
                            return (
                              <button
                                key={d.id}
                                type="button"
                                onClick={() => toggleMilestoneRef(ms.id, d.name)}
                                className={`px-3 py-2 text-base border transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                                  isLinked
                                    ? "bg-black text-white border-black"
                                    : "bg-white text-neutral-600 border-neutral-300 hover:border-black"
                                }`}
                                aria-pressed={isLinked}
                              >
                                {d.name}
                              </button>
                            );
                          })}
                        </div>
                      </fieldset>
                    )}
                  </div>
                ))}

                <button type="button" onClick={addMilestone} className={btnAdd}>
                  + Add Milestone
                </button>
              </div>
            </Animate>
          )}

          {/* ──────────── Budget ──────────── */}
          {!showPreview && activeSection === "Budget" && (
            <Animate animation="fade-up" key="budget">
              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  Budget
                </h2>

                {data.budgetItems.length === 0 && (
                  <p className="text-base text-neutral-500">
                    No budget items yet. Add line items to build a cost estimate.
                  </p>
                )}

                {/* Header row for md+ */}
                {data.budgetItems.length > 0 && (
                  <div className="hidden md:grid md:grid-cols-[1fr_100px_100px_100px_44px] gap-4 text-base font-bold text-neutral-500 border-b border-neutral-200 pb-2">
                    <span>Deliverable / Item</span>
                    <span>Hours</span>
                    <span>Rate ($/h)</span>
                    <span>Total</span>
                    <span className="sr-only">Remove</span>
                  </div>
                )}

                {data.budgetItems.map((item, i) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-[1fr_100px_100px_100px_44px] gap-4 items-end border-b border-neutral-100 pb-4">
                    <div>
                      <label htmlFor={`budget-del-${item.id}`} className="block text-base font-bold text-black mb-2 md:sr-only">
                        Deliverable / Item
                      </label>
                      <input
                        id={`budget-del-${item.id}`}
                        type="text"
                        value={item.deliverable}
                        onChange={(e) => updateBudgetItem(item.id, "deliverable", e.target.value)}
                        placeholder={`Line item ${i + 1}`}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor={`budget-hrs-${item.id}`} className="block text-base font-bold text-black mb-2 md:sr-only">
                        Hours
                      </label>
                      <input
                        id={`budget-hrs-${item.id}`}
                        type="number"
                        min="0"
                        value={item.hours || ""}
                        onChange={(e) => updateBudgetItem(item.id, "hours", Math.max(0, parseFloat(e.target.value) || 0))}
                        placeholder="0"
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor={`budget-rate-${item.id}`} className="block text-base font-bold text-black mb-2 md:sr-only">
                        Rate ($/h)
                      </label>
                      <input
                        id={`budget-rate-${item.id}`}
                        type="number"
                        min="0"
                        value={item.rate || ""}
                        onChange={(e) => updateBudgetItem(item.id, "rate", Math.max(0, parseFloat(e.target.value) || 0))}
                        placeholder="0"
                        className={inputClasses}
                      />
                    </div>
                    <div className="flex items-center">
                      <span className="text-base font-bold text-black md:sr-only mr-2">Total:&nbsp;</span>
                      <span className="text-base font-bold text-black">{formatCurrency(item.hours * item.rate)}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeBudgetItem(item.id)}
                      className={btnRemove}
                      aria-label={`Remove budget item ${i + 1}`}
                    >
                      &times;
                    </button>
                  </div>
                ))}

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <button type="button" onClick={addBudgetItem} className={btnAdd}>
                    + Add Line Item
                  </button>
                  {data.budgetItems.length > 0 && (
                    <div className="text-base font-bold text-black">
                      Project Total: <span className="text-xl">{formatCurrency(projectTotal)}</span>
                    </div>
                  )}
                </div>
              </div>
            </Animate>
          )}

          {/* ──────────── Terms ──────────── */}
          {!showPreview && activeSection === "Terms" && (
            <Animate animation="fade-up" key="terms">
              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  Terms &amp; Conditions
                </h2>

                <div>
                  <label htmlFor="paymentSchedule" className="block text-base font-bold text-black mb-2">
                    Payment Schedule
                  </label>
                  <select
                    id="paymentSchedule"
                    value={data.paymentSchedule}
                    onChange={(e) => update("paymentSchedule", e.target.value as PaymentSchedule)}
                    className={selectClasses}
                  >
                    <option value="upfront">100% Upfront</option>
                    <option value="50-50">50% Upfront / 50% on Completion</option>
                    <option value="monthly">Monthly Invoicing</option>
                    <option value="milestone-based">Milestone-Based Payments</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="revisionRounds" className="block text-base font-bold text-black mb-2">
                    Revision Rounds: {data.revisionRounds}
                  </label>
                  <input
                    id="revisionRounds"
                    type="range"
                    min="1"
                    max="5"
                    value={data.revisionRounds}
                    onChange={(e) => update("revisionRounds", parseInt(e.target.value, 10))}
                    className="w-full max-w-xs accent-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  />
                  <div className="flex justify-between max-w-xs text-base text-neutral-500 mt-1">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="communicationCadence" className="block text-base font-bold text-black mb-2">
                      Communication Cadence
                    </label>
                    <select
                      id="communicationCadence"
                      value={data.communicationCadence}
                      onChange={(e) => update("communicationCadence", e.target.value as CommunicationCadence)}
                      className={selectClasses}
                    >
                      <option value="weekly">Weekly Check-ins</option>
                      <option value="biweekly">Biweekly Check-ins</option>
                      <option value="monthly">Monthly Check-ins</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="reportingCadence" className="block text-base font-bold text-black mb-2">
                      Reporting Cadence
                    </label>
                    <select
                      id="reportingCadence"
                      value={data.reportingCadence}
                      onChange={(e) => update("reportingCadence", e.target.value as ReportingCadence)}
                      className={selectClasses}
                    >
                      <option value="weekly">Weekly Reports</option>
                      <option value="biweekly">Biweekly Reports</option>
                      <option value="monthly">Monthly Reports</option>
                    </select>
                  </div>
                </div>
              </div>
            </Animate>
          )}

          {/* ──────────── Out of Scope ──────────── */}
          {!showPreview && activeSection === "Out of Scope" && (
            <Animate animation="fade-up" key="out-of-scope">
              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  Out of Scope
                </h2>
                <p className="text-base text-neutral-500">
                  Clearly defining what is NOT included prevents scope creep and protects both parties.
                </p>

                {data.outOfScope.length === 0 && (
                  <p className="text-base text-neutral-500">
                    No items yet. Add exclusions below or select a project type in Setup to pre-fill.
                  </p>
                )}

                <div className="space-y-3">
                  {data.outOfScope.map((item, i) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <label htmlFor={`oos-${item.id}`} className="sr-only">
                        Out of scope item {i + 1}
                      </label>
                      <input
                        id={`oos-${item.id}`}
                        type="text"
                        value={item.text}
                        onChange={(e) => updateOutOfScope(item.id, e.target.value)}
                        placeholder={`Exclusion ${i + 1}`}
                        className={inputClasses}
                      />
                      <button
                        type="button"
                        onClick={() => removeOutOfScope(item.id)}
                        className={btnRemove}
                        aria-label={`Remove out of scope item ${i + 1}`}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>

                <button type="button" onClick={addOutOfScope} className={btnAdd}>
                  + Add Exclusion
                </button>
              </div>
            </Animate>
          )}

          {/* ──────────── Preview ──────────── */}
          {showPreview && (
            <Animate animation="fade-up" key="preview">
              <div className="space-y-8">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  Document Preview
                </h2>

                {/* Preview document */}
                <div className="border border-neutral-200 bg-white p-8 md:p-12 space-y-8">
                  {/* Header */}
                  <div className="border-b border-neutral-200 pb-6">
                    <p className="text-base font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">Scope of Work</p>
                    <p className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold text-black">
                      {data.projectName || "Untitled Project"}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-base text-neutral-600">
                      <div>
                        <span className="font-bold text-black">Client:</span>{" "}
                        {data.clientName || "--"}
                      </div>
                      <div>
                        <span className="font-bold text-black">Prepared By:</span>{" "}
                        {data.preparedBy || "--"}
                      </div>
                      <div>
                        <span className="font-bold text-black">Date:</span>{" "}
                        {formatDate(data.date)}
                      </div>
                    </div>
                    {data.projectType && (
                      <p className="text-base text-neutral-500 mt-2">
                        Type: {PROJECT_TYPE_LABELS[data.projectType]}
                      </p>
                    )}
                  </div>

                  {/* 1. Project Overview */}
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                      1. Project Overview
                    </h3>
                    {data.objectives.filter((o) => o.trim()).length > 0 && (
                      <>
                        <p className="text-base font-bold text-black mb-2">Objectives</p>
                        <ul className="list-disc list-inside space-y-1 mb-4">
                          {data.objectives.filter((o) => o.trim()).map((o, i) => (
                            <li key={i} className="text-base text-neutral-700">{o}</li>
                          ))}
                        </ul>
                      </>
                    )}
                    {data.scopeSummary && (
                      <>
                        <p className="text-base font-bold text-black mb-2">Scope Summary</p>
                        <p className="text-base text-neutral-700 whitespace-pre-wrap">{data.scopeSummary}</p>
                      </>
                    )}
                    {!data.objectives.filter((o) => o.trim()).length && !data.scopeSummary && (
                      <p className="text-base text-neutral-400">No overview provided.</p>
                    )}
                  </div>

                  {/* 2. Deliverables */}
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                      2. Deliverables
                    </h3>
                    {data.deliverables.length > 0 ? (
                      <div className="space-y-4">
                        {data.deliverables.map((d, i) => (
                          <div key={d.id} className="border-l-2 border-black pl-4">
                            <p className="text-base font-bold text-black">
                              {i + 1}. {d.name || "Untitled Deliverable"}
                            </p>
                            {d.description && (
                              <p className="text-base text-neutral-600 mt-1">{d.description}</p>
                            )}
                            <div className="flex flex-wrap gap-4 text-base text-neutral-500 mt-1">
                              <span>Due: {d.dueDate ? formatDate(d.dueDate) : "TBD"}</span>
                              <span>Owner: {d.responsibleParty || "--"}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-base text-neutral-400">No deliverables specified.</p>
                    )}
                  </div>

                  {/* 3. Timeline & Milestones */}
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                      3. Timeline &amp; Milestones
                    </h3>
                    {data.milestones.length > 0 ? (
                      <div className="space-y-4">
                        {data.milestones.map((m, i) => (
                          <div key={m.id} className="border-l-2 border-neutral-300 pl-4">
                            <p className="text-base font-bold text-black">
                              {i + 1}. {m.name || "Untitled Milestone"}
                            </p>
                            <p className="text-base text-neutral-500">
                              {m.date ? formatDate(m.date) : "TBD"}
                            </p>
                            {m.description && (
                              <p className="text-base text-neutral-600 mt-1">{m.description}</p>
                            )}
                            {m.deliverableRefs.length > 0 && (
                              <p className="text-base text-neutral-500 mt-1">
                                Linked: {m.deliverableRefs.join(", ")}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-base text-neutral-400">No milestones specified.</p>
                    )}
                  </div>

                  {/* 4. Budget */}
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                      4. Budget
                    </h3>
                    {data.budgetItems.length > 0 ? (
                      <>
                        <div className="overflow-x-auto">
                          <table className="w-full text-base text-left">
                            <thead>
                              <tr className="border-b-2 border-black">
                                <th className="py-2 pr-4 font-bold text-black">Item</th>
                                <th className="py-2 pr-4 font-bold text-black text-right">Hours</th>
                                <th className="py-2 pr-4 font-bold text-black text-right">Rate</th>
                                <th className="py-2 font-bold text-black text-right">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.budgetItems.map((b) => (
                                <tr key={b.id} className="border-b border-neutral-100">
                                  <td className="py-2 pr-4 text-neutral-700">{b.deliverable || "--"}</td>
                                  <td className="py-2 pr-4 text-neutral-700 text-right">{b.hours}</td>
                                  <td className="py-2 pr-4 text-neutral-700 text-right">{formatCurrency(b.rate)}/h</td>
                                  <td className="py-2 text-neutral-700 text-right font-bold">{formatCurrency(b.hours * b.rate)}</td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr className="border-t-2 border-black">
                                <td colSpan={3} className="py-3 pr-4 font-bold text-black text-right">Project Total</td>
                                <td className="py-3 font-extrabold text-black text-right text-lg">{formatCurrency(projectTotal)}</td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </>
                    ) : (
                      <p className="text-base text-neutral-400">No budget items specified.</p>
                    )}
                  </div>

                  {/* 5. Terms */}
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                      5. Terms &amp; Conditions
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base">
                      <div>
                        <span className="font-bold text-black">Payment:</span>{" "}
                        <span className="text-neutral-600">
                          {data.paymentSchedule === "upfront"
                            ? "100% Upfront"
                            : data.paymentSchedule === "50-50"
                              ? "50/50 Split"
                              : data.paymentSchedule === "monthly"
                                ? "Monthly Invoicing"
                                : "Milestone-Based"}
                        </span>
                      </div>
                      <div>
                        <span className="font-bold text-black">Revisions:</span>{" "}
                        <span className="text-neutral-600">{data.revisionRounds} round{data.revisionRounds !== 1 ? "s" : ""}</span>
                      </div>
                      <div>
                        <span className="font-bold text-black">Communication:</span>{" "}
                        <span className="text-neutral-600">{data.communicationCadence.charAt(0).toUpperCase() + data.communicationCadence.slice(1)} check-ins</span>
                      </div>
                      <div>
                        <span className="font-bold text-black">Reporting:</span>{" "}
                        <span className="text-neutral-600">{data.reportingCadence.charAt(0).toUpperCase() + data.reportingCadence.slice(1)} reports</span>
                      </div>
                    </div>
                  </div>

                  {/* 6. Out of Scope */}
                  {data.outOfScope.filter((o) => o.text.trim()).length > 0 && (
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                        6. Out of Scope
                      </h3>
                      <ul className="list-disc list-inside space-y-1">
                        {data.outOfScope.filter((o) => o.text.trim()).map((o) => (
                          <li key={o.id} className="text-base text-neutral-700">{o.text}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Disclaimer */}
                  <div className="border-t border-neutral-200 pt-6 mt-8">
                    <p className="text-base text-neutral-500">
                      This Scope of Work is a preliminary planning document generated for organizational
                      purposes. Final deliverables, timelines, and costs are subject to mutual agreement.
                      This document does not constitute a binding contract.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4">
                  <button type="button" onClick={exportAsText} className={btnPrimary}>
                    Export as .txt
                  </button>
                  <button type="button" onClick={saveToStorage} className={btnSecondary}>
                    {saveMessage || "Save to Browser"}
                  </button>
                  <button type="button" onClick={handleReset} className={btnSecondary}>
                    Reset All
                  </button>
                </div>
              </div>
            </Animate>
          )}

          {/* ── Persistent save/nav bar ───────────────────────────── */}
          {!showPreview && (
            <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-neutral-200">
              <button type="button" onClick={saveToStorage} className={btnSecondary}>
                {saveMessage || "Save Progress"}
              </button>
              <div className="flex gap-3">
                {SECTIONS.indexOf(activeSection) > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      const idx = SECTIONS.indexOf(activeSection);
                      if (idx > 0) setActiveSection(SECTIONS[idx - 1]);
                    }}
                    className={btnSecondary}
                  >
                    &larr; Back
                  </button>
                )}
                {SECTIONS.indexOf(activeSection) < SECTIONS.length - 2 && (
                  <button
                    type="button"
                    onClick={() => {
                      const idx = SECTIONS.indexOf(activeSection);
                      setActiveSection(SECTIONS[idx + 1]);
                    }}
                    className={btnPrimary}
                  >
                    Next &rarr;
                  </button>
                )}
                {SECTIONS.indexOf(activeSection) === SECTIONS.length - 2 && (
                  <button
                    type="button"
                    onClick={() => setShowPreview(true)}
                    className={btnPrimary}
                  >
                    Preview Document &rarr;
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Educational Section ────────────────────────────────── */}
      <section aria-label="Guide" className="px-6 lg:px-12 py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Guide</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-3">
              Writing Effective Scopes of Work
            </h2>
            <SectionDesc>
              A well-crafted SOW sets expectations, prevents scope creep, and protects both the agency
              and the client. Here are the key principles.
            </SectionDesc>
          </Animate>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <Animate animation="fade-up" delay={0}>
              <div className="space-y-3">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                  Be Specific About Deliverables
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Vague deliverables lead to misaligned expectations. Instead of &ldquo;website design,&rdquo;
                  specify &ldquo;homepage mockup, 5 interior page templates, and mobile responsive
                  versions.&rdquo; Quantify everything you can -- number of revisions, number of pages,
                  number of ad variations.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={100}>
              <div className="space-y-3">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                  Define What Is Out of Scope
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  The &ldquo;Out of Scope&rdquo; section is as important as the deliverables list. Clients
                  often assume adjacent tasks are included. Explicitly listing exclusions prevents
                  uncomfortable conversations later and gives you a clear reference when requests
                  expand beyond the agreement.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={200}>
              <div className="space-y-3">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                  Tie Milestones to Payments
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Milestone-based payments protect your cash flow and incentivize client feedback.
                  Tie approval gates to payment triggers: design approval releases the next payment,
                  development completion triggers the next. This keeps projects moving and reduces
                  the risk of stalled work.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={300}>
              <div className="space-y-3">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                  Set Revision Limits
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Unlimited revisions sound generous but create unsustainable projects. Define the
                  number of revision rounds per deliverable and the turnaround time for each. Two to
                  three rounds is standard for most marketing projects. Additional rounds can be
                  billed at an agreed hourly rate.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={400}>
              <div className="space-y-3">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                  Establish Communication Norms
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Define how and when you will communicate. Weekly check-in calls, a shared project
                  management tool, and agreed response times prevent the &ldquo;radio silence&rdquo; problem.
                  Include the communication channel, meeting cadence, and expected response window
                  in the SOW.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={500}>
              <div className="space-y-3">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                  Include a Change Order Process
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Scope changes are inevitable. The SOW should describe the process for handling them:
                  how change requests are submitted, how they are estimated, and how additional costs
                  are approved. A clear change order process turns potential conflicts into routine
                  business conversations.
                </p>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Scoping Your Next Project?
            </h2>
            <p className="text-lg text-neutral-400 mt-4 mb-8">
              Our team creates detailed scopes of work, manages timelines, and delivers results
              across every marketing channel. Let us handle the strategy so you can focus on growth.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Scope Of Work Generator"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Schema Generator", href: "/resources/schema-generator" },
          { title: "Risk Assessment", href: "/resources/risk-assessment" },
          { title: "Roi Calculator", href: "/resources/roi-calculator" },
          { title: "Roi Dashboard", href: "/resources/roi-dashboard" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
