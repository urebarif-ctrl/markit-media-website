"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ================================================================== */
/*  Types                                                              */
/* ================================================================== */

type CampaignType =
  | "launch"
  | "awareness"
  | "lead-gen"
  | "retention"
  | "seasonal"
  | "rebranding";

type ToneOfVoice = "Professional" | "Friendly" | "Bold" | "Inspirational";

interface CampaignOverview {
  name: string;
  type: CampaignType | "";
  objective: string;
  startDate: string;
  endDate: string;
}

interface TargetAudience {
  ageRange: string;
  gender: string;
  location: string;
  psychographics: string;
  buyerPersona: string;
}

interface KeyMessages {
  primary: string;
  supporting: string[];
  tone: ToneOfVoice;
}

interface ChannelEntry {
  name: string;
  selected: boolean;
  budgetAllocation: number;
}

interface CreativeDeliverable {
  id: string;
  name: string;
}

interface CreativeRequirements {
  deliverables: CreativeDeliverable[];
  brandGuidelines: string;
  approvalWorkflow: string;
}

interface BudgetData {
  totalBudget: number;
  contingencyPercent: number;
  paymentTerms: string;
}

interface KPIEntry {
  id: string;
  name: string;
  targetValue: string;
  measurementMethod: string;
}

interface Stakeholder {
  id: string;
  name: string;
  role: string;
  responsibility: string;
}

interface BriefData {
  overview: CampaignOverview;
  audience: TargetAudience;
  messages: KeyMessages;
  channels: ChannelEntry[];
  creative: CreativeRequirements;
  budget: BudgetData;
  kpis: KPIEntry[];
  stakeholders: Stakeholder[];
}

interface SavedBrief {
  id: string;
  name: string;
  savedAt: string;
  data: BriefData;
}

/* ================================================================== */
/*  Constants                                                          */
/* ================================================================== */

const CAMPAIGN_TYPE_LABELS: Record<CampaignType, string> = {
  launch: "Product Launch",
  awareness: "Brand Awareness",
  "lead-gen": "Lead Generation",
  retention: "Customer Retention",
  seasonal: "Seasonal Campaign",
  rebranding: "Rebranding",
};

const CHANNEL_NAMES = [
  "Google Ads",
  "Meta (Facebook/Instagram)",
  "LinkedIn Ads",
  "TikTok Ads",
  "Email Marketing",
  "SEO",
  "Content Marketing",
  "Display Advertising",
  "Influencer Marketing",
  "TV/Radio",
] as const;

const PERSONA_OPTIONS = [
  "Marketing Manager",
  "Business Owner / Founder",
  "C-Suite Executive",
  "E-commerce Manager",
  "Product Manager",
  "Startup Founder",
  "Freelancer / Consultant",
  "Other",
];

const STORAGE_KEY = "markit-campaign-briefs";

const SECTIONS = [
  "Overview",
  "Audience",
  "Messages",
  "Channels",
  "Creative",
  "Budget",
  "KPIs",
  "Stakeholders",
] as const;

type SectionName = (typeof SECTIONS)[number];

/* ================================================================== */
/*  Templates                                                          */
/* ================================================================== */

function createDefaultChannels(): ChannelEntry[] {
  return CHANNEL_NAMES.map((name) => ({
    name,
    selected: false,
    budgetAllocation: 0,
  }));
}

function createInitialData(): BriefData {
  return {
    overview: { name: "", type: "", objective: "", startDate: "", endDate: "" },
    audience: { ageRange: "", gender: "", location: "", psychographics: "", buyerPersona: "" },
    messages: { primary: "", supporting: ["", "", ""], tone: "Professional" },
    channels: createDefaultChannels(),
    creative: { deliverables: [], brandGuidelines: "", approvalWorkflow: "" },
    budget: { totalBudget: 0, contingencyPercent: 10, paymentTerms: "" },
    kpis: [],
    stakeholders: [],
  };
}

interface TemplatePreset {
  label: string;
  description: string;
  data: Partial<BriefData>;
}

const TEMPLATES: Record<string, TemplatePreset> = {
  "product-launch": {
    label: "Product Launch",
    description: "Pre-launch buzz, launch day activation, and post-launch nurture",
    data: {
      overview: {
        name: "",
        type: "launch",
        objective: "Drive awareness and initial adoption of a new product or service",
        startDate: "",
        endDate: "",
      },
      messages: {
        primary: "Introducing a better way to achieve [outcome]",
        supporting: [
          "Built for [audience] who need [benefit]",
          "Available now with an exclusive launch offer",
          "Join [number]+ early adopters already seeing results",
        ],
        tone: "Bold",
      },
      channels: CHANNEL_NAMES.map((name) => ({
        name,
        selected: ["Google Ads", "Meta (Facebook/Instagram)", "Email Marketing", "Content Marketing"].includes(name),
        budgetAllocation: ["Google Ads", "Meta (Facebook/Instagram)"].includes(name)
          ? 30
          : ["Email Marketing", "Content Marketing"].includes(name)
            ? 20
            : 0,
      })),
      creative: {
        deliverables: [
          { id: "tpl-1", name: "Landing page design" },
          { id: "tpl-2", name: "Email announcement sequence (3 emails)" },
          { id: "tpl-3", name: "Social media launch graphics" },
          { id: "tpl-4", name: "Product demo video" },
          { id: "tpl-5", name: "Press release" },
        ],
        brandGuidelines: "",
        approvalWorkflow: "Creative lead reviews, then stakeholder sign-off before launch",
      },
      kpis: [
        { id: "tpl-k1", name: "Sign-ups / purchases", targetValue: "", measurementMethod: "CRM + analytics" },
        { id: "tpl-k2", name: "Landing page conversion rate", targetValue: "5%", measurementMethod: "Google Analytics" },
        { id: "tpl-k3", name: "Email open rate", targetValue: "25%", measurementMethod: "ESP reporting" },
      ],
    },
  },
  "brand-awareness": {
    label: "Brand Awareness",
    description: "Increase visibility, recognition, and share of voice in your market",
    data: {
      overview: {
        name: "",
        type: "awareness",
        objective: "Increase brand recognition and reach among the target audience",
        startDate: "",
        endDate: "",
      },
      messages: {
        primary: "[Brand] is the trusted partner for [industry/outcome]",
        supporting: [
          "Proven results with [number]+ clients",
          "Industry expertise that sets us apart",
          "A team dedicated to your success",
        ],
        tone: "Inspirational",
      },
      channels: CHANNEL_NAMES.map((name) => ({
        name,
        selected: [
          "Meta (Facebook/Instagram)",
          "LinkedIn Ads",
          "Content Marketing",
          "Display Advertising",
          "SEO",
        ].includes(name),
        budgetAllocation: ["Meta (Facebook/Instagram)", "Display Advertising"].includes(name)
          ? 25
          : ["LinkedIn Ads", "Content Marketing", "SEO"].includes(name)
            ? 15
            : 0,
      })),
      creative: {
        deliverables: [
          { id: "tpl-1", name: "Brand video (30s and 60s cuts)" },
          { id: "tpl-2", name: "Social media content series" },
          { id: "tpl-3", name: "Display ad set (responsive formats)" },
          { id: "tpl-4", name: "Thought leadership blog articles" },
        ],
        brandGuidelines: "",
        approvalWorkflow: "Marketing director approves all creative before distribution",
      },
      kpis: [
        { id: "tpl-k1", name: "Brand search volume", targetValue: "+20%", measurementMethod: "Google Trends" },
        { id: "tpl-k2", name: "Social media reach", targetValue: "", measurementMethod: "Platform analytics" },
        { id: "tpl-k3", name: "Share of voice", targetValue: "", measurementMethod: "Competitive monitoring tool" },
      ],
    },
  },
  "lead-generation": {
    label: "Lead Generation",
    description: "Capture qualified leads and nurture them through the funnel",
    data: {
      overview: {
        name: "",
        type: "lead-gen",
        objective: "Generate marketing-qualified leads and feed the sales pipeline",
        startDate: "",
        endDate: "",
      },
      messages: {
        primary: "Get your free [resource] and start improving [outcome] today",
        supporting: [
          "Download the guide trusted by [number]+ professionals",
          "No commitment required — just actionable insights",
          "See how [client type] achieved [result]",
        ],
        tone: "Professional",
      },
      channels: CHANNEL_NAMES.map((name) => ({
        name,
        selected: [
          "Google Ads",
          "LinkedIn Ads",
          "Email Marketing",
          "SEO",
          "Content Marketing",
        ].includes(name),
        budgetAllocation: ["Google Ads"].includes(name)
          ? 30
          : ["LinkedIn Ads"].includes(name)
            ? 25
            : ["Email Marketing", "SEO", "Content Marketing"].includes(name)
              ? 15
              : 0,
      })),
      creative: {
        deliverables: [
          { id: "tpl-1", name: "Lead magnet (ebook / whitepaper)" },
          { id: "tpl-2", name: "Landing page with form" },
          { id: "tpl-3", name: "Nurture email sequence (5 emails)" },
          { id: "tpl-4", name: "Search ad copy variations" },
          { id: "tpl-5", name: "LinkedIn sponsored content" },
        ],
        brandGuidelines: "",
        approvalWorkflow: "Marketing reviews creative, sales validates messaging alignment",
      },
      kpis: [
        { id: "tpl-k1", name: "Marketing Qualified Leads (MQLs)", targetValue: "", measurementMethod: "CRM" },
        { id: "tpl-k2", name: "Cost per Lead (CPL)", targetValue: "", measurementMethod: "Ad platform + CRM" },
        { id: "tpl-k3", name: "Lead-to-opportunity rate", targetValue: "10%", measurementMethod: "CRM pipeline" },
      ],
    },
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
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

/* ================================================================== */
/*  Text Export                                                         */
/* ================================================================== */

function generateBriefText(data: BriefData): string {
  const divider = "=".repeat(64);
  const thin = "-".repeat(64);

  const selectedChannels = data.channels.filter((c) => c.selected);
  const netBudget = data.budget.totalBudget * (1 - data.budget.contingencyPercent / 100);

  const lines: string[] = [
    divider,
    "CAMPAIGN BRIEF",
    divider,
    "",
    `Campaign Name: ${data.overview.name || "--"}`,
    `Campaign Type: ${data.overview.type ? CAMPAIGN_TYPE_LABELS[data.overview.type] : "--"}`,
    `Objective: ${data.overview.objective || "--"}`,
    `Timeline: ${data.overview.startDate ? formatDate(data.overview.startDate) : "TBD"} — ${data.overview.endDate ? formatDate(data.overview.endDate) : "TBD"}`,
    "",
    divider,
    "1. TARGET AUDIENCE",
    divider,
    "",
    `  Age Range: ${data.audience.ageRange || "--"}`,
    `  Gender: ${data.audience.gender || "--"}`,
    `  Location: ${data.audience.location || "--"}`,
    `  Buyer Persona: ${data.audience.buyerPersona || "--"}`,
    "",
    "  Psychographics:",
    `  ${data.audience.psychographics || "(none provided)"}`,
    "",
    divider,
    "2. KEY MESSAGES",
    divider,
    "",
    `  Primary Message: ${data.messages.primary || "--"}`,
    "",
    "  Supporting Messages:",
    ...data.messages.supporting
      .filter((s) => s.trim())
      .map((s, i) => `    ${i + 1}. ${s}`),
    ...(data.messages.supporting.filter((s) => s.trim()).length === 0 ? ["    (none specified)"] : []),
    "",
    `  Tone of Voice: ${data.messages.tone}`,
    "",
    divider,
    "3. CHANNELS & ALLOCATION",
    divider,
    "",
    ...(selectedChannels.length > 0
      ? selectedChannels.map(
          (c) => `  - ${c.name}: ${c.budgetAllocation}% of budget`
        )
      : ["  (no channels selected)"]),
    "",
    divider,
    "4. CREATIVE REQUIREMENTS",
    divider,
    "",
    "  Deliverables:",
    ...(data.creative.deliverables.length > 0
      ? data.creative.deliverables.map((d, i) => `    ${i + 1}. ${d.name}`)
      : ["    (none specified)"]),
    "",
    `  Brand Guidelines: ${data.creative.brandGuidelines || "(none provided)"}`,
    `  Approval Workflow: ${data.creative.approvalWorkflow || "(none provided)"}`,
    "",
    divider,
    "5. BUDGET",
    divider,
    "",
    `  Total Budget: ${data.budget.totalBudget ? formatCurrency(data.budget.totalBudget) : "--"}`,
    `  Contingency: ${data.budget.contingencyPercent}%`,
    `  Net Working Budget: ${data.budget.totalBudget ? formatCurrency(netBudget) : "--"}`,
    `  Payment Terms: ${data.budget.paymentTerms || "--"}`,
    "",
    ...(selectedChannels.length > 0 && data.budget.totalBudget > 0
      ? [
          "  Channel Breakdown:",
          ...selectedChannels.map(
            (c) =>
              `    - ${c.name}: ${formatCurrency((c.budgetAllocation / 100) * netBudget)}`
          ),
          "",
        ]
      : []),
    divider,
    "6. SUCCESS METRICS (KPIs)",
    divider,
    "",
    ...(data.kpis.length > 0
      ? data.kpis.flatMap((k, i) => [
          `  ${i + 1}. ${k.name}`,
          `     Target: ${k.targetValue || "--"}`,
          `     Measurement: ${k.measurementMethod || "--"}`,
          "",
        ])
      : ["  (no KPIs defined)", ""]),
    divider,
    "7. STAKEHOLDERS",
    divider,
    "",
    ...(data.stakeholders.length > 0
      ? data.stakeholders.flatMap((s, i) => [
          `  ${i + 1}. ${s.name || "--"}`,
          `     Role: ${s.role || "--"}`,
          `     Responsibility: ${s.responsibility || "--"}`,
          "",
        ])
      : ["  (no stakeholders listed)", ""]),
    thin,
    "",
    "DISCLAIMER:",
    "This campaign brief is a planning document generated for",
    "organizational purposes. Final details are subject to stakeholder",
    "alignment and approval.",
    "",
    thin,
    `Generated using the Campaign Brief Builder by Markit Media.`,
    "",
  ];

  return lines.join("\n");
}

/* ================================================================== */
/*  Completeness                                                       */
/* ================================================================== */

function computeCompleteness(data: BriefData): number {
  let filled = 0;
  const total = 8;

  // 1. Overview
  if (data.overview.name && data.overview.type && data.overview.objective) filled++;
  // 2. Audience
  if (data.audience.ageRange || data.audience.location || data.audience.psychographics) filled++;
  // 3. Messages
  if (data.messages.primary) filled++;
  // 4. Channels
  if (data.channels.some((c) => c.selected)) filled++;
  // 5. Creative
  if (data.creative.deliverables.length > 0) filled++;
  // 6. Budget
  if (data.budget.totalBudget > 0) filled++;
  // 7. KPIs
  if (data.kpis.length > 0) filled++;
  // 8. Stakeholders
  if (data.stakeholders.length > 0) filled++;

  return Math.round((filled / total) * 100);
}

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */



export default function CampaignBriefBuilderPage() {
  const [data, setData] = useState<BriefData>(createInitialData);
  const [activeSection, setActiveSection] = useState<SectionName>("Overview");
  const [showPreview, setShowPreview] = useState(false);
  const [savedBriefs, setSavedBriefs] = useState<SavedBrief[]>([]);
  const [saveMessage, setSaveMessage] = useState("");
  const [showSavedList, setShowSavedList] = useState(false);

  /* ── Load saved briefs from localStorage ────────────────────── */

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as SavedBrief[];
        if (Array.isArray(parsed)) setSavedBriefs(parsed);
      }
    } catch {
      /* ignore corrupt data */
    }
  }, []);

  /* ── Save brief ────────────────────────────────────────────── */

  const saveBrief = useCallback(() => {
    try {
      const briefName = data.overview.name || `Brief ${savedBriefs.length + 1}`;
      const existing = savedBriefs.find((b) => b.name === briefName);
      let updated: SavedBrief[];

      if (existing) {
        updated = savedBriefs.map((b) =>
          b.name === briefName
            ? { ...b, savedAt: new Date().toISOString(), data: { ...data } }
            : b
        );
      } else {
        const newBrief: SavedBrief = {
          id: uid(),
          name: briefName,
          savedAt: new Date().toISOString(),
          data: { ...data },
        };
        updated = [newBrief, ...savedBriefs].slice(0, 5);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSavedBriefs(updated);
      setSaveMessage("Brief saved");
      setTimeout(() => setSaveMessage(""), 2000);
    } catch {
      setSaveMessage("Save failed");
      setTimeout(() => setSaveMessage(""), 2000);
    }
  }, [data, savedBriefs]);

  function loadBrief(brief: SavedBrief) {
    setData(brief.data);
    setShowSavedList(false);
    setActiveSection("Overview");
    setShowPreview(false);
  }

  function deleteBrief(id: string) {
    const updated = savedBriefs.filter((b) => b.id !== id);
    setSavedBriefs(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  /* ── Generic updaters ──────────────────────────────────────── */

  function updateOverview<K extends keyof CampaignOverview>(key: K, value: CampaignOverview[K]) {
    setData((prev) => ({ ...prev, overview: { ...prev.overview, [key]: value } }));
  }

  function updateAudience<K extends keyof TargetAudience>(key: K, value: TargetAudience[K]) {
    setData((prev) => ({ ...prev, audience: { ...prev.audience, [key]: value } }));
  }

  function updateMessages<K extends keyof KeyMessages>(key: K, value: KeyMessages[K]) {
    setData((prev) => ({ ...prev, messages: { ...prev.messages, [key]: value } }));
  }

  function updateSupportingMessage(index: number, value: string) {
    setData((prev) => {
      const next = [...prev.messages.supporting];
      next[index] = value;
      return { ...prev, messages: { ...prev.messages, supporting: next } };
    });
  }

  function toggleChannel(index: number) {
    setData((prev) => {
      const next = [...prev.channels];
      next[index] = { ...next[index], selected: !next[index].selected };
      return { ...prev, channels: next };
    });
  }

  function setChannelBudget(index: number, value: number) {
    setData((prev) => {
      const next = [...prev.channels];
      next[index] = { ...next[index], budgetAllocation: value };
      return { ...prev, channels: next };
    });
  }

  function updateCreative<K extends keyof CreativeRequirements>(key: K, value: CreativeRequirements[K]) {
    setData((prev) => ({ ...prev, creative: { ...prev.creative, [key]: value } }));
  }

  function addDeliverable() {
    setData((prev) => ({
      ...prev,
      creative: {
        ...prev.creative,
        deliverables: [...prev.creative.deliverables, { id: uid(), name: "" }],
      },
    }));
  }

  function updateDeliverable(id: string, name: string) {
    setData((prev) => ({
      ...prev,
      creative: {
        ...prev.creative,
        deliverables: prev.creative.deliverables.map((d) =>
          d.id === id ? { ...d, name } : d
        ),
      },
    }));
  }

  function removeDeliverable(id: string) {
    setData((prev) => ({
      ...prev,
      creative: {
        ...prev.creative,
        deliverables: prev.creative.deliverables.filter((d) => d.id !== id),
      },
    }));
  }

  function updateBudget<K extends keyof BudgetData>(key: K, value: BudgetData[K]) {
    setData((prev) => ({ ...prev, budget: { ...prev.budget, [key]: value } }));
  }

  function addKPI() {
    setData((prev) => ({
      ...prev,
      kpis: [...prev.kpis, { id: uid(), name: "", targetValue: "", measurementMethod: "" }],
    }));
  }

  function updateKPI(id: string, field: keyof Omit<KPIEntry, "id">, value: string) {
    setData((prev) => ({
      ...prev,
      kpis: prev.kpis.map((k) => (k.id === id ? { ...k, [field]: value } : k)),
    }));
  }

  function removeKPI(id: string) {
    setData((prev) => ({ ...prev, kpis: prev.kpis.filter((k) => k.id !== id) }));
  }

  function addStakeholder() {
    setData((prev) => ({
      ...prev,
      stakeholders: [...prev.stakeholders, { id: uid(), name: "", role: "", responsibility: "" }],
    }));
  }

  function updateStakeholder(id: string, field: keyof Omit<Stakeholder, "id">, value: string) {
    setData((prev) => ({
      ...prev,
      stakeholders: prev.stakeholders.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }));
  }

  function removeStakeholder(id: string) {
    setData((prev) => ({ ...prev, stakeholders: prev.stakeholders.filter((s) => s.id !== id) }));
  }

  /* ── Templates ─────────────────────────────────────────────── */

  function applyTemplate(key: string) {
    const tpl = TEMPLATES[key];
    if (!tpl) return;
    const base = createInitialData();
    setData({
      ...base,
      overview: tpl.data.overview ?? base.overview,
      messages: tpl.data.messages ?? base.messages,
      channels: tpl.data.channels ?? base.channels,
      creative: tpl.data.creative ?? base.creative,
      kpis: tpl.data.kpis ?? base.kpis,
    });
    setActiveSection("Overview");
    setShowPreview(false);
  }

  /* ── Export ─────────────────────────────────────────────────── */

  function exportAsText() {
    const text = generateBriefText(data);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const filename = data.overview.name
      ? `brief-${data.overview.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`
      : "campaign-brief.txt";
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* ── Reset ─────────────────────────────────────────────────── */

  function handleReset() {
    if (typeof window !== "undefined" && !window.confirm("Reset all fields? This cannot be undone.")) return;
    setData(createInitialData());
    setActiveSection("Overview");
    setShowPreview(false);
  }

  /* ── Computed ───────────────────────────────────────────────── */

  const completeness = useMemo(() => computeCompleteness(data), [data]);

  const selectedChannels = data.channels.filter((c) => c.selected);
  const totalAllocation = selectedChannels.reduce((sum, c) => sum + c.budgetAllocation, 0);
  const netBudget = data.budget.totalBudget * (1 - data.budget.contingencyPercent / 100);

  /* ── Shared styling ────────────────────────────────────────── */

  const inputClasses =
    "w-full border border-neutral-300 bg-white text-black px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black focus-visible:ring-1 focus-visible:ring-black transition-colors motion-reduce:transition-none";
  const selectClasses =
    "w-full border border-neutral-300 bg-white text-black px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black focus-visible:ring-1 focus-visible:ring-black transition-colors motion-reduce:transition-none appearance-none";
  const textareaClasses =
    "w-full border border-neutral-300 bg-white text-black px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black focus-visible:ring-1 focus-visible:ring-black transition-colors motion-reduce:transition-none resize-y";
  const btnPrimary =
    "inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-bold text-base hover:bg-neutral-800 transition-colors motion-reduce:transition-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2";
  const btnSecondary =
    "text-base font-bold text-neutral-500 hover:text-black transition-colors motion-reduce:transition-none min-h-[44px] px-6 py-3 border border-neutral-200 hover:border-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";
  const btnRemove =
    "text-base text-neutral-400 hover:text-black transition-colors motion-reduce:transition-none min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";
  const btnAdd =
    "text-base font-bold text-neutral-500 hover:text-black transition-colors motion-reduce:transition-none min-h-[44px] px-4 py-2 border border-neutral-200 hover:border-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";
  const checkboxClasses =
    "w-5 h-5 border-2 border-neutral-300 accent-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";

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
          name: "Campaign Brief Builder",
          description: "Pre-launch buzz, launch day activation, and post-launch nurture",
          url: "https://themarkitmedia.com/en/resources/campaign-brief-builder",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Campaign Brief Builder | Free Marketing Tool — Markit Media</title>
      <meta name="description" content="Pre-launch buzz, launch day activation, and post-launch nurture" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Campaign Brief Builder",
          description:
            "Build professional campaign briefs. Define objectives, audiences, channels, budgets, and success metrics in one structured document.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Campaign Brief Builder" },
        ]}
      />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Campaign Brief Builder
            </h1>
            <SectionDesc>
              Build a professional campaign brief from scratch or start with a template.
              Define your audience, messaging, channels, budget, and KPIs — then
              export the finished document or save it for later.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ── Completeness & Actions Bar ────────────────────────── */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {/* Completeness bar */}
              <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                <span className="text-base font-bold text-black whitespace-nowrap">
                  {completeness}% complete
                </span>
                <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black transition-all duration-500 motion-reduce:transition-none rounded-full"
                    style={{ width: `${completeness}%` }}
                  />
                </div>
              </div>
              {/* Action buttons */}
              <div className="flex flex-wrap gap-2">
                <button onClick={saveBrief} className={btnSecondary}>
                  Save
                </button>
                <button onClick={() => setShowSavedList(!showSavedList)} className={btnSecondary}>
                  {showSavedList ? "Hide saved" : `Saved (${savedBriefs.length})`}
                </button>
                <button onClick={exportAsText} className={btnSecondary}>
                  Export .txt
                </button>
                <button onClick={handleReset} className={btnSecondary}>
                  Reset
                </button>
              </div>
            </div>

            {/* Save message */}
            {saveMessage && (
              <p className="text-base font-bold text-black mb-4" role="status">
                {saveMessage}
              </p>
            )}

            {/* Saved briefs list */}
            {showSavedList && (
              <div className="border border-neutral-200 p-6 mb-6 space-y-4">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                  Saved Briefs
                </h2>
                {savedBriefs.length === 0 ? (
                  <p className="text-base text-neutral-500">No saved briefs yet. Use the Save button to store up to 5 briefs.</p>
                ) : (
                  <ul className="space-y-3">
                    {savedBriefs.map((brief) => (
                      <li key={brief.id} className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-3">
                        <div>
                          <p className="text-base font-bold text-black">{brief.name}</p>
                          <p className="text-base text-neutral-500">
                            Saved {new Date(brief.savedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => loadBrief(brief)} className={btnSecondary}>
                            Load
                          </button>
                          <button onClick={() => deleteBrief(brief.id)} className={btnRemove} aria-label={`Delete ${brief.name}`}>
                            ✕
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </Animate>
        </div>
      </section>

      {/* ── Templates ──────────────────────────────────────────── */}
      <section aria-label="Start from a template" className="px-6 lg:px-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
              Start from a template
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(TEMPLATES).map(([key, tpl]) => (
                <button
                  key={key}
                  onClick={() => applyTemplate(key)}
                  className="text-left border border-neutral-200 hover:border-black p-5 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  <p className="text-base font-bold text-black">{tpl.label}</p>
                  <p className="text-base text-neutral-500 mt-1">{tpl.description}</p>
                </button>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* ── Section Navigation ─────────────────────────────────── */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <nav aria-label="Brief sections">
              <ol className="flex flex-wrap gap-2">
                {SECTIONS.map((section) => {
                  const isActive = activeSection === section && !showPreview;
                  return (
                    <li key={section}>
                      <button
                        onClick={() => {
                          setShowPreview(false);
                          setActiveSection(section);
                        }}
                        className={`px-4 py-2 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                          isActive
                            ? "bg-black text-white"
                            : "text-neutral-500 hover:text-black border border-neutral-200 hover:border-black"
                        }`}
                        aria-current={isActive ? "step" : undefined}
                      >
                        {section}
                      </button>
                    </li>
                  );
                })}
                <li>
                  <button
                    onClick={() => setShowPreview(true)}
                    className={`px-4 py-2 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      showPreview
                        ? "bg-black text-white"
                        : "text-neutral-500 hover:text-black border border-neutral-200 hover:border-black"
                    }`}
                    aria-current={showPreview ? "step" : undefined}
                  >
                    Preview
                  </button>
                </li>
              </ol>
            </nav>
          </Animate>
        </div>
      </section>

      {/* ── Form Sections ──────────────────────────────────────── */}
      <section aria-label="Campaign Overview" className="px-6 lg:px-12 pb-12">
        <div className="max-w-4xl mx-auto">

          {/* ──────────── 1. Campaign Overview ──────────── */}
          {!showPreview && activeSection === "Overview" && (
            <Animate animation="fade-up" key="overview">
              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  Campaign Overview
                </h2>

                <div>
                  <label htmlFor="campaignName" className="block text-base font-bold text-black mb-2">
                    Campaign Name
                  </label>
                  <input
                    id="campaignName"
                    type="text"
                    className={inputClasses}
                    value={data.overview.name}
                    onChange={(e) => updateOverview("name", e.target.value)}
                    placeholder="e.g. Q4 Product Launch"
                  />
                </div>

                <div>
                  <label htmlFor="campaignType" className="block text-base font-bold text-black mb-2">
                    Campaign Type
                  </label>
                  <select
                    id="campaignType"
                    className={selectClasses}
                    value={data.overview.type}
                    onChange={(e) => updateOverview("type", e.target.value as CampaignType | "")}
                  >
                    <option value="">Select type...</option>
                    {Object.entries(CAMPAIGN_TYPE_LABELS).map(([val, label]) => (
                      <option key={val} value={val}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="objective" className="block text-base font-bold text-black mb-2">
                    Campaign Objective
                  </label>
                  <textarea
                    id="objective"
                    className={textareaClasses}
                    rows={3}
                    value={data.overview.objective}
                    onChange={(e) => updateOverview("objective", e.target.value)}
                    placeholder="What should this campaign achieve?"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="startDate" className="block text-base font-bold text-black mb-2">
                      Start Date
                    </label>
                    <input
                      id="startDate"
                      type="date"
                      className={inputClasses}
                      value={data.overview.startDate}
                      onChange={(e) => updateOverview("startDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="endDate" className="block text-base font-bold text-black mb-2">
                      End Date
                    </label>
                    <input
                      id="endDate"
                      type="date"
                      className={inputClasses}
                      value={data.overview.endDate}
                      onChange={(e) => updateOverview("endDate", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </Animate>
          )}

          {/* ──────────── 2. Target Audience ──────────── */}
          {!showPreview && activeSection === "Audience" && (
            <Animate animation="fade-up" key="audience">
              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  Target Audience
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="ageRange" className="block text-base font-bold text-black mb-2">
                      Age Range
                    </label>
                    <input
                      id="ageRange"
                      type="text"
                      className={inputClasses}
                      value={data.audience.ageRange}
                      onChange={(e) => updateAudience("ageRange", e.target.value)}
                      placeholder="e.g. 25-45"
                    />
                  </div>
                  <div>
                    <label htmlFor="gender" className="block text-base font-bold text-black mb-2">
                      Gender
                    </label>
                    <input
                      id="gender"
                      type="text"
                      className={inputClasses}
                      value={data.audience.gender}
                      onChange={(e) => updateAudience("gender", e.target.value)}
                      placeholder="e.g. All genders"
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-base font-bold text-black mb-2">
                      Location
                    </label>
                    <input
                      id="location"
                      type="text"
                      className={inputClasses}
                      value={data.audience.location}
                      onChange={(e) => updateAudience("location", e.target.value)}
                      placeholder="e.g. United States"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="psychographics" className="block text-base font-bold text-black mb-2">
                    Psychographics
                  </label>
                  <textarea
                    id="psychographics"
                    className={textareaClasses}
                    rows={4}
                    value={data.audience.psychographics}
                    onChange={(e) => updateAudience("psychographics", e.target.value)}
                    placeholder="Describe interests, values, pain points, buying behaviors..."
                  />
                </div>

                <div>
                  <label htmlFor="buyerPersona" className="block text-base font-bold text-black mb-2">
                    Buyer Persona
                  </label>
                  <select
                    id="buyerPersona"
                    className={selectClasses}
                    value={data.audience.buyerPersona}
                    onChange={(e) => updateAudience("buyerPersona", e.target.value)}
                  >
                    <option value="">Select persona...</option>
                    {PERSONA_OPTIONS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Animate>
          )}

          {/* ──────────── 3. Key Messages ──────────── */}
          {!showPreview && activeSection === "Messages" && (
            <Animate animation="fade-up" key="messages">
              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  Key Messages
                </h2>

                <div>
                  <label htmlFor="primaryMessage" className="block text-base font-bold text-black mb-2">
                    Primary Message
                  </label>
                  <textarea
                    id="primaryMessage"
                    className={textareaClasses}
                    rows={3}
                    value={data.messages.primary}
                    onChange={(e) => updateMessages("primary", e.target.value)}
                    placeholder="The one thing you want the audience to remember"
                  />
                </div>

                <div className="space-y-4">
                  <p className="text-base font-bold text-black">Supporting Messages (up to 3)</p>
                  {data.messages.supporting.map((msg, i) => (
                    <div key={i}>
                      <label htmlFor={`supporting-${i}`} className="block text-base text-neutral-500 mb-1">
                        Supporting message {i + 1}
                      </label>
                      <input
                        id={`supporting-${i}`}
                        type="text"
                        className={inputClasses}
                        value={msg}
                        onChange={(e) => updateSupportingMessage(i, e.target.value)}
                        placeholder={`Supporting message ${i + 1}`}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="tone" className="block text-base font-bold text-black mb-2">
                    Tone of Voice
                  </label>
                  <select
                    id="tone"
                    className={selectClasses}
                    value={data.messages.tone}
                    onChange={(e) => updateMessages("tone", e.target.value as ToneOfVoice)}
                  >
                    {(["Professional", "Friendly", "Bold", "Inspirational"] as const).map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Animate>
          )}

          {/* ──────────── 4. Channels ──────────── */}
          {!showPreview && activeSection === "Channels" && (
            <Animate animation="fade-up" key="channels">
              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  Channels
                </h2>
                <p className="text-base text-neutral-500">
                  Select the channels for this campaign and allocate budget as a percentage.
                </p>

                <div className="space-y-4">
                  {data.channels.map((channel, i) => (
                    <div key={channel.name} className="flex items-center gap-4 border-b border-neutral-100 pb-4">
                      <input
                        type="checkbox"
                        id={`channel-${i}`}
                        checked={channel.selected}
                        onChange={() => toggleChannel(i)}
                        className={checkboxClasses}
                      />
                      <label htmlFor={`channel-${i}`} className="text-base font-bold text-black flex-1 min-w-[150px] cursor-pointer">
                        {channel.name}
                      </label>
                      {channel.selected && (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={channel.budgetAllocation}
                            onChange={(e) => setChannelBudget(i, Number(e.target.value))}
                            className="w-20 border border-neutral-300 bg-white text-black px-3 py-2 text-base text-right focus-visible:outline-none focus-visible:border-black focus-visible:ring-1 focus-visible:ring-black transition-colors motion-reduce:transition-none"
                            aria-label={`Budget allocation for ${channel.name}`}
                          />
                          <span className="text-base text-neutral-500">%</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {selectedChannels.length > 0 && (
                  <div className={`text-base font-bold ${totalAllocation === 100 ? "text-black" : "text-neutral-500"}`}>
                    Total allocation: {totalAllocation}%
                    {totalAllocation !== 100 && (
                      <span className="font-normal text-neutral-400 ml-2">(should equal 100%)</span>
                    )}
                  </div>
                )}
              </div>
            </Animate>
          )}

          {/* ──────────── 5. Creative Requirements ──────────── */}
          {!showPreview && activeSection === "Creative" && (
            <Animate animation="fade-up" key="creative">
              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  Creative Requirements
                </h2>

                <div>
                  <p className="text-base font-bold text-black mb-3">Deliverables</p>
                  {data.creative.deliverables.length > 0 && (
                    <ul className="space-y-3 mb-4">
                      {data.creative.deliverables.map((d) => (
                        <li key={d.id} className="flex items-center gap-3">
                          <input
                            type="text"
                            value={d.name}
                            onChange={(e) => updateDeliverable(d.id, e.target.value)}
                            className={inputClasses}
                            placeholder="Deliverable name"
                            aria-label="Deliverable name"
                          />
                          <button
                            onClick={() => removeDeliverable(d.id)}
                            className={btnRemove}
                            aria-label={`Remove ${d.name || "deliverable"}`}
                          >
                            ✕
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <button onClick={addDeliverable} className={btnAdd}>
                    + Add deliverable
                  </button>
                </div>

                <div>
                  <label htmlFor="brandGuidelines" className="block text-base font-bold text-black mb-2">
                    Brand Guidelines Notes
                  </label>
                  <textarea
                    id="brandGuidelines"
                    className={textareaClasses}
                    rows={3}
                    value={data.creative.brandGuidelines}
                    onChange={(e) => updateCreative("brandGuidelines", e.target.value)}
                    placeholder="Key brand rules, color codes, font requirements, dos and don'ts..."
                  />
                </div>

                <div>
                  <label htmlFor="approvalWorkflow" className="block text-base font-bold text-black mb-2">
                    Approval Workflow
                  </label>
                  <textarea
                    id="approvalWorkflow"
                    className={textareaClasses}
                    rows={3}
                    value={data.creative.approvalWorkflow}
                    onChange={(e) => updateCreative("approvalWorkflow", e.target.value)}
                    placeholder="Who reviews creative? How many rounds? What is the sign-off process?"
                  />
                </div>
              </div>
            </Animate>
          )}

          {/* ──────────── 6. Budget ──────────── */}
          {!showPreview && activeSection === "Budget" && (
            <Animate animation="fade-up" key="budget">
              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  Budget
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="totalBudget" className="block text-base font-bold text-black mb-2">
                      Total Budget (USD)
                    </label>
                    <input
                      id="totalBudget"
                      type="number"
                      min={0}
                      className={inputClasses}
                      value={data.budget.totalBudget || ""}
                      onChange={(e) => updateBudget("totalBudget", Number(e.target.value))}
                      placeholder="e.g. 50000"
                    />
                  </div>
                  <div>
                    <label htmlFor="contingency" className="block text-base font-bold text-black mb-2">
                      Contingency %
                    </label>
                    <input
                      id="contingency"
                      type="number"
                      min={0}
                      max={50}
                      className={inputClasses}
                      value={data.budget.contingencyPercent}
                      onChange={(e) => updateBudget("contingencyPercent", Number(e.target.value))}
                    />
                  </div>
                </div>

                {data.budget.totalBudget > 0 && (
                  <div className="border border-neutral-200 p-6 space-y-3">
                    <p className="text-base font-bold text-black">
                      Net working budget: {formatCurrency(netBudget)}
                    </p>
                    {selectedChannels.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-base text-neutral-500">Channel breakdown:</p>
                        {selectedChannels.map((c) => (
                          <div key={c.name} className="flex justify-between text-base">
                            <span className="text-black">{c.name}</span>
                            <span className="text-neutral-500 font-bold">
                              {formatCurrency((c.budgetAllocation / 100) * netBudget)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <label htmlFor="paymentTerms" className="block text-base font-bold text-black mb-2">
                    Payment Terms
                  </label>
                  <textarea
                    id="paymentTerms"
                    className={textareaClasses}
                    rows={2}
                    value={data.budget.paymentTerms}
                    onChange={(e) => updateBudget("paymentTerms", e.target.value)}
                    placeholder="e.g. 50% upfront, 50% on completion. Net 30."
                  />
                </div>
              </div>
            </Animate>
          )}

          {/* ──────────── 7. Success Metrics (KPIs) ──────────── */}
          {!showPreview && activeSection === "KPIs" && (
            <Animate animation="fade-up" key="kpis">
              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  Success Metrics
                </h2>
                <p className="text-base text-neutral-500">
                  Define the KPIs that will measure this campaign&#39;s success.
                </p>

                {data.kpis.length > 0 && (
                  <div className="space-y-6">
                    {data.kpis.map((kpi) => (
                      <div key={kpi.id} className="border border-neutral-200 p-5 space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 space-y-4">
                            <div>
                              <label htmlFor={`kpi-name-${kpi.id}`} className="block text-base font-bold text-black mb-1">
                                KPI Name
                              </label>
                              <input
                                id={`kpi-name-${kpi.id}`}
                                type="text"
                                className={inputClasses}
                                value={kpi.name}
                                onChange={(e) => updateKPI(kpi.id, "name", e.target.value)}
                                placeholder="e.g. Conversion Rate"
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor={`kpi-target-${kpi.id}`} className="block text-base font-bold text-black mb-1">
                                  Target Value
                                </label>
                                <input
                                  id={`kpi-target-${kpi.id}`}
                                  type="text"
                                  className={inputClasses}
                                  value={kpi.targetValue}
                                  onChange={(e) => updateKPI(kpi.id, "targetValue", e.target.value)}
                                  placeholder="e.g. 5% or 1,000 leads"
                                />
                              </div>
                              <div>
                                <label htmlFor={`kpi-method-${kpi.id}`} className="block text-base font-bold text-black mb-1">
                                  Measurement Method
                                </label>
                                <input
                                  id={`kpi-method-${kpi.id}`}
                                  type="text"
                                  className={inputClasses}
                                  value={kpi.measurementMethod}
                                  onChange={(e) => updateKPI(kpi.id, "measurementMethod", e.target.value)}
                                  placeholder="e.g. Google Analytics"
                                />
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeKPI(kpi.id)}
                            className={btnRemove}
                            aria-label={`Remove ${kpi.name || "KPI"}`}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button onClick={addKPI} className={btnAdd}>
                  + Add KPI
                </button>
              </div>
            </Animate>
          )}

          {/* ──────────── 8. Stakeholders ──────────── */}
          {!showPreview && activeSection === "Stakeholders" && (
            <Animate animation="fade-up" key="stakeholders">
              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  Stakeholders
                </h2>
                <p className="text-base text-neutral-500">
                  Add the team members involved in this campaign.
                </p>

                {data.stakeholders.length > 0 && (
                  <div className="space-y-6">
                    {data.stakeholders.map((s) => (
                      <div key={s.id} className="border border-neutral-200 p-5 space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor={`stakeholder-name-${s.id}`} className="block text-base font-bold text-black mb-1">
                                  Name
                                </label>
                                <input
                                  id={`stakeholder-name-${s.id}`}
                                  type="text"
                                  className={inputClasses}
                                  value={s.name}
                                  onChange={(e) => updateStakeholder(s.id, "name", e.target.value)}
                                  placeholder="Full name"
                                />
                              </div>
                              <div>
                                <label htmlFor={`stakeholder-role-${s.id}`} className="block text-base font-bold text-black mb-1">
                                  Role
                                </label>
                                <input
                                  id={`stakeholder-role-${s.id}`}
                                  type="text"
                                  className={inputClasses}
                                  value={s.role}
                                  onChange={(e) => updateStakeholder(s.id, "role", e.target.value)}
                                  placeholder="e.g. Marketing Director"
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor={`stakeholder-resp-${s.id}`} className="block text-base font-bold text-black mb-1">
                                Responsibility
                              </label>
                              <input
                                id={`stakeholder-resp-${s.id}`}
                                type="text"
                                className={inputClasses}
                                value={s.responsibility}
                                onChange={(e) => updateStakeholder(s.id, "responsibility", e.target.value)}
                                placeholder="e.g. Final creative approval"
                              />
                            </div>
                          </div>
                          <button
                            onClick={() => removeStakeholder(s.id)}
                            className={btnRemove}
                            aria-label={`Remove ${s.name || "stakeholder"}`}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button onClick={addStakeholder} className={btnAdd}>
                  + Add stakeholder
                </button>
              </div>
            </Animate>
          )}

          {/* ──────────── Preview ──────────── */}
          {showPreview && (
            <Animate animation="fade-up" key="preview">
              <div className="space-y-8 print:space-y-6">
                <div className="flex items-center justify-between gap-4 print:hidden">
                  <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                    Brief Preview
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.print()}
                      className={btnSecondary}
                    >
                      Print
                    </button>
                    <button onClick={exportAsText} className={btnSecondary}>
                      Export .txt
                    </button>
                  </div>
                </div>

                {/* Preview content */}
                <div className="border border-neutral-200 p-8 space-y-8 print:border-none print:p-0">
                  {/* Header */}
                  <div className="border-b border-neutral-200 pb-6">
                    <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
                      {data.overview.name || "Untitled Campaign Brief"}
                    </h3>
                    <div className="flex flex-wrap gap-4 mt-3 text-base text-neutral-500">
                      {data.overview.type && (
                        <span>{CAMPAIGN_TYPE_LABELS[data.overview.type]}</span>
                      )}
                      {(data.overview.startDate || data.overview.endDate) && (
                        <span>
                          {data.overview.startDate ? formatDate(data.overview.startDate) : "TBD"} — {data.overview.endDate ? formatDate(data.overview.endDate) : "TBD"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Objective */}
                  {data.overview.objective && (
                    <div>
                      <p className="text-base font-bold text-black mb-1">Objective</p>
                      <p className="text-base text-neutral-600">{data.overview.objective}</p>
                    </div>
                  )}

                  {/* Audience */}
                  {(data.audience.ageRange || data.audience.location || data.audience.psychographics) && (
                    <div>
                      <p className="text-base font-bold text-black mb-2">Target Audience</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-base">
                        {data.audience.ageRange && (
                          <div>
                            <span className="text-neutral-500">Age:</span>{" "}
                            <span className="text-black">{data.audience.ageRange}</span>
                          </div>
                        )}
                        {data.audience.gender && (
                          <div>
                            <span className="text-neutral-500">Gender:</span>{" "}
                            <span className="text-black">{data.audience.gender}</span>
                          </div>
                        )}
                        {data.audience.location && (
                          <div>
                            <span className="text-neutral-500">Location:</span>{" "}
                            <span className="text-black">{data.audience.location}</span>
                          </div>
                        )}
                      </div>
                      {data.audience.buyerPersona && (
                        <p className="text-base mt-2">
                          <span className="text-neutral-500">Persona:</span>{" "}
                          <span className="text-black">{data.audience.buyerPersona}</span>
                        </p>
                      )}
                      {data.audience.psychographics && (
                        <p className="text-base text-neutral-600 mt-2">{data.audience.psychographics}</p>
                      )}
                    </div>
                  )}

                  {/* Messages */}
                  {data.messages.primary && (
                    <div>
                      <p className="text-base font-bold text-black mb-2">Key Messages</p>
                      <p className="text-base text-black font-bold">&ldquo;{data.messages.primary}&rdquo;</p>
                      {data.messages.supporting.filter((s) => s.trim()).length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {data.messages.supporting
                            .filter((s) => s.trim())
                            .map((s, i) => (
                              <li key={i} className="text-base text-neutral-600">
                                {s}
                              </li>
                            ))}
                        </ul>
                      )}
                      <p className="text-base text-neutral-500 mt-2">Tone: {data.messages.tone}</p>
                    </div>
                  )}

                  {/* Channels */}
                  {selectedChannels.length > 0 && (
                    <div>
                      <p className="text-base font-bold text-black mb-2">Channels</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedChannels.map((c) => (
                          <div key={c.name} className="flex justify-between text-base border-b border-neutral-100 pb-1">
                            <span className="text-black">{c.name}</span>
                            <span className="text-neutral-500">{c.budgetAllocation}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Creative */}
                  {data.creative.deliverables.length > 0 && (
                    <div>
                      <p className="text-base font-bold text-black mb-2">Creative Deliverables</p>
                      <ul className="space-y-1">
                        {data.creative.deliverables.map((d) => (
                          <li key={d.id} className="text-base text-neutral-600">
                            {d.name}
                          </li>
                        ))}
                      </ul>
                      {data.creative.brandGuidelines && (
                        <p className="text-base text-neutral-500 mt-2">
                          <span className="font-bold text-black">Brand notes:</span> {data.creative.brandGuidelines}
                        </p>
                      )}
                      {data.creative.approvalWorkflow && (
                        <p className="text-base text-neutral-500 mt-1">
                          <span className="font-bold text-black">Approval:</span> {data.creative.approvalWorkflow}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Budget */}
                  {data.budget.totalBudget > 0 && (
                    <div>
                      <p className="text-base font-bold text-black mb-2">Budget</p>
                      <div className="text-base space-y-1">
                        <p>
                          <span className="text-neutral-500">Total:</span>{" "}
                          <span className="text-black font-bold">{formatCurrency(data.budget.totalBudget)}</span>
                        </p>
                        <p>
                          <span className="text-neutral-500">Contingency:</span>{" "}
                          <span className="text-black">{data.budget.contingencyPercent}%</span>
                        </p>
                        <p>
                          <span className="text-neutral-500">Net working budget:</span>{" "}
                          <span className="text-black font-bold">{formatCurrency(netBudget)}</span>
                        </p>
                        {data.budget.paymentTerms && (
                          <p>
                            <span className="text-neutral-500">Terms:</span>{" "}
                            <span className="text-black">{data.budget.paymentTerms}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* KPIs */}
                  {data.kpis.length > 0 && (
                    <div>
                      <p className="text-base font-bold text-black mb-2">Success Metrics</p>
                      <div className="space-y-2">
                        {data.kpis.map((k) => (
                          <div key={k.id} className="flex flex-wrap gap-4 text-base border-b border-neutral-100 pb-2">
                            <span className="text-black font-bold">{k.name || "--"}</span>
                            {k.targetValue && <span className="text-neutral-500">Target: {k.targetValue}</span>}
                            {k.measurementMethod && <span className="text-neutral-500">Via: {k.measurementMethod}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stakeholders */}
                  {data.stakeholders.length > 0 && (
                    <div>
                      <p className="text-base font-bold text-black mb-2">Stakeholders</p>
                      <div className="space-y-2">
                        {data.stakeholders.map((s) => (
                          <div key={s.id} className="text-base border-b border-neutral-100 pb-2">
                            <span className="text-black font-bold">{s.name || "--"}</span>
                            {s.role && <span className="text-neutral-500"> — {s.role}</span>}
                            {s.responsibility && (
                              <p className="text-neutral-500 mt-0.5">{s.responsibility}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Animate>
          )}
        </div>
      </section>

      {/* ── Educational Section ─────────────────────────────────── */}
      <section aria-label="Learn" className="px-6 lg:px-12 py-20 bg-neutral-50 print:hidden">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Learn</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-3">
              Writing Effective Campaign Briefs
            </h2>
            <SectionDesc>
              A strong brief is the foundation of every successful campaign. Here are the key
              principles that separate great briefs from mediocre ones.
            </SectionDesc>
          </Animate>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <Animate animation="fade-up" delay={100}>
              <div className="border-t-2 border-black pt-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                  Writing Effective Briefs
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Start with a clear, measurable objective. Avoid vague goals like &ldquo;increase
                  awareness&rdquo; — instead write &ldquo;increase aided brand recall by 15% in Q4
                  among the target demographic.&rdquo; Every section of the brief should trace back
                  to this objective.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={200}>
              <div className="border-t-2 border-black pt-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                  Stakeholder Alignment
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Circulate the brief early and get sign-off before work begins. List every
                  stakeholder, their role, and what they approve. Misalignment on objectives or
                  creative direction is the top reason campaigns stall mid-flight.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={300}>
              <div className="border-t-2 border-black pt-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                  Scope Definition
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Be explicit about what is in scope and what is not. Define the channels, deliverables,
                  and budget boundaries upfront. A well-scoped brief prevents scope creep and keeps
                  the team focused on the agreed deliverables.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={400}>
              <div className="border-t-2 border-black pt-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                  Timeline Planning
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Work backwards from the launch date. Build in buffer time for creative reviews,
                  stakeholder approvals, and production. A realistic timeline with clear milestones
                  keeps everyone accountable and prevents last-minute rushes.
                </p>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* ── CTA Section ────────────────────────────────────────── */}
      <section aria-label="Need help executing your campaign?" className="px-6 lg:px-12 py-20 bg-black text-white print:hidden">
        <div className="max-w-3xl mx-auto text-center">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight leading-tight">
              Need help executing your campaign?
            </h2>
            <p className="text-lg text-neutral-400 mt-4 max-w-2xl mx-auto leading-relaxed">
              Our team can take your brief and turn it into a fully managed campaign — from
              strategy and creative through to performance reporting.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 font-bold text-base hover:bg-neutral-200 transition-colors motion-reduce:transition-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Get in touch
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Campaign Brief Builder"
        services={[
          { title: "Performance Marketing", desc: "Google Ads, Meta Ads, and PPC campaigns that maximize ROAS.", href: "/services/performance-marketing" },
          { title: "Digital Marketing", desc: "Integrated strategy across all channels for measurable growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Complement paid with organic — reduce dependency on ad spend over time.", href: "/services/seo" },
        ]}
        relatedTools={[
          { title: "Campaign Debrief", href: "/resources/campaign-debrief" },
          { title: "Campaign Naming Convention", href: "/resources/campaign-naming-convention" },
          { title: "Campaign Naming Generator", href: "/resources/campaign-naming-generator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
