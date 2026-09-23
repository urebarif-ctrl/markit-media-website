"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const focusClasses =
  "focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";

const STORAGE_KEY = "markit-martech-stack-planner";

const CATEGORIES = [
  "CRM",
  "Email Marketing",
  "Analytics",
  "SEO",
  "Social Media",
  "Advertising",
  "CMS",
  "Automation",
] as const;

type Category = (typeof CATEGORIES)[number];

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface StackTool {
  id: string;
  name: string;
  category: Category;
  monthlyCost: number;
  contractMonths: number;
  rating: number;
  notes: string;
}

interface IntegrationPair {
  a: string;
  b: string;
}

interface StackState {
  tools: StackTool[];
  integrations: IntegrationPair[];
}

/* ------------------------------------------------------------------ */
/*  Sample mid-size company stack                                      */
/* ------------------------------------------------------------------ */

function sampleStack(): StackState {
  const tools: StackTool[] = [
    {
      id: crypto.randomUUID(),
      name: "HubSpot",
      category: "CRM",
      monthlyCost: 890,
      contractMonths: 12,
      rating: 4,
      notes: "CRM + marketing hub bundle. Includes contact management, deals pipeline, and basic marketing automation.",
    },
    {
      id: crypto.randomUUID(),
      name: "GA4",
      category: "Analytics",
      monthlyCost: 0,
      contractMonths: 0,
      rating: 4,
      notes: "Free web analytics. Event-based tracking model with BigQuery export.",
    },
    {
      id: crypto.randomUUID(),
      name: "Semrush",
      category: "SEO",
      monthlyCost: 130,
      contractMonths: 12,
      rating: 5,
      notes: "All-in-one SEO toolkit. Keyword research, site audit, rank tracking, and competitive analysis.",
    },
    {
      id: crypto.randomUUID(),
      name: "Hootsuite",
      category: "Social Media",
      monthlyCost: 99,
      contractMonths: 12,
      rating: 3,
      notes: "Social scheduling and monitoring across multiple platforms.",
    },
    {
      id: crypto.randomUUID(),
      name: "Google Ads",
      category: "Advertising",
      monthlyCost: 0,
      contractMonths: 0,
      rating: 5,
      notes: "Platform cost is $0 (ad spend is separate). Search, display, shopping, and video campaigns.",
    },
    {
      id: crypto.randomUUID(),
      name: "WordPress",
      category: "CMS",
      monthlyCost: 25,
      contractMonths: 12,
      rating: 4,
      notes: "Self-hosted CMS with managed hosting. Thousands of plugins and themes available.",
    },
    {
      id: crypto.randomUUID(),
      name: "Zapier",
      category: "Automation",
      monthlyCost: 49,
      contractMonths: 1,
      rating: 4,
      notes: "No-code automation connecting 6,000+ apps. Team plan with multi-step zaps.",
    },
    {
      id: crypto.randomUUID(),
      name: "Mailchimp",
      category: "Email Marketing",
      monthlyCost: 45,
      contractMonths: 1,
      rating: 3,
      notes: "Email marketing with templates, segmentation, and basic automation sequences.",
    },
  ];

  const integrations: IntegrationPair[] = [
    { a: tools[0].id, b: tools[7].id }, // HubSpot <-> Mailchimp
    { a: tools[0].id, b: tools[6].id }, // HubSpot <-> Zapier
    { a: tools[1].id, b: tools[4].id }, // GA4 <-> Google Ads
    { a: tools[6].id, b: tools[7].id }, // Zapier <-> Mailchimp
    { a: tools[6].id, b: tools[3].id }, // Zapier <-> Hootsuite
    { a: tools[5].id, b: tools[1].id }, // WordPress <-> GA4
  ];

  return { tools, integrations };
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function starString(n: number): string {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

function loadState(): StackState | null {
  try {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StackState;
  } catch {
    return null;
  }
}

function saveState(state: StackState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage full or unavailable */
  }
}

/* ------------------------------------------------------------------ */
/*  Duplicate detection                                                */
/* ------------------------------------------------------------------ */

const OVERLAP_KEYWORDS: Record<string, string[]> = {
  crm: ["crm", "contact management", "sales pipeline", "deals"],
  email: ["email", "newsletter", "drip", "sequence", "campaign"],
  analytics: ["analytics", "tracking", "reporting", "dashboard", "data"],
  seo: ["seo", "keyword", "rank", "backlink", "audit"],
  social: ["social", "scheduling", "posting", "monitoring"],
  ads: ["ads", "advertising", "ppc", "campaign", "retargeting"],
  cms: ["cms", "content management", "website builder", "blog"],
  automation: ["automation", "workflow", "integration", "zap", "trigger"],
};

interface DuplicateWarning {
  toolA: string;
  toolB: string;
  category: Category;
  reason: string;
}

function detectDuplicates(tools: StackTool[]): DuplicateWarning[] {
  const warnings: DuplicateWarning[] = [];
  const byCategory = new Map<Category, StackTool[]>();
  for (const t of tools) {
    const arr = byCategory.get(t.category) || [];
    arr.push(t);
    byCategory.set(t.category, arr);
  }
  for (const [cat, catTools] of byCategory) {
    if (catTools.length < 2) continue;
    for (let i = 0; i < catTools.length; i++) {
      for (let j = i + 1; j < catTools.length; j++) {
        const a = catTools[i];
        const b = catTools[j];
        const combinedNotes = `${a.name} ${a.notes} ${b.name} ${b.notes}`.toLowerCase();
        const catKey = cat.toLowerCase().replace(/\s/g, "");
        const keywords = OVERLAP_KEYWORDS[catKey] || OVERLAP_KEYWORDS[cat.toLowerCase().split(" ")[0]] || [];
        const sharedKeywords = keywords.filter((kw) => combinedNotes.includes(kw));
        if (sharedKeywords.length > 0 || cat === a.category) {
          warnings.push({
            toolA: a.name,
            toolB: b.name,
            category: cat,
            reason: `Both tools are in the ${cat} category. Review whether their features overlap to avoid redundant spend.`,
          });
        }
      }
    }
  }
  return warnings;
}

/* ------------------------------------------------------------------ */
/*  Component: Star Rating Picker                                      */
/* ------------------------------------------------------------------ */

function StarRating({
  value,
  onChange,
  toolName,
}: {
  value: number;
  onChange: (n: number) => void;
  toolName: string;
}) {
  return (
    <div className="flex gap-1" role="radiogroup" aria-label={`Rating for ${toolName}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Martech Stack Planner",
          description: "Plan, budget, and optimize your marketing technology stack. Compare tools across 8 categories, track costs, map integrations, and detect overlaps.",
          url: "https://themarkitmedia.com/en/resources/martech-stack-planner",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Martech Stack Planner | Free Marketing Tool — Markit Media</title>
      <link rel="canonical" href="https://themarkitmedia.com/en/resources/martech-stack-planner" />
      <meta name="description" content="Plan, budget, and optimize your marketing technology stack. Compare tools across 8 categories, track costs, map integrations, and detect overlaps." />
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`text-lg ${star <= value ? "text-black" : "text-neutral-300"} ${focusClasses}`}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          role="radio"
          aria-checked={star === value}
        >
          {star <= value ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component: Tool Form                                               */
/* ------------------------------------------------------------------ */

interface ToolFormProps {
  onAdd: (tool: StackTool) => void;
}

function ToolForm({ onAdd }: ToolFormProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("CRM");
  const [monthlyCost, setMonthlyCost] = useState("");
  const [contractMonths, setContractMonths] = useState("");
  const [rating, setRating] = useState(3);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({
      id: generateId(),
      name: name.trim(),
      category,
      monthlyCost: parseFloat(monthlyCost) || 0,
      contractMonths: parseInt(contractMonths, 10) || 0,
      rating,
      notes: notes.trim(),
    });
    setName("");
    setMonthlyCost("");
    setContractMonths("");
    setRating(3);
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit} className="border-2 border-neutral-200 p-6 space-y-4">
      <p className="text-lg font-bold text-black">Add a Tool</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="tool-name" className="block text-base font-bold text-black mb-1">
            Tool Name
          </label>
          <input
            id="tool-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. HubSpot"
            className={`w-full border-2 border-neutral-200 px-4 py-2.5 text-base transition-colors hover:border-neutral-400 focus-visible:border-black outline-none ${focusClasses}`}
            required
          />
        </div>
        <div>
          <label htmlFor="tool-category" className="block text-base font-bold text-black mb-1">
            Category
          </label>
          <select
            id="tool-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className={`w-full border-2 border-neutral-200 px-4 py-2.5 text-base bg-white transition-colors hover:border-neutral-400 focus-visible:border-black outline-none ${focusClasses}`}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tool-cost" className="block text-base font-bold text-black mb-1">
            Monthly Cost ($)
          </label>
          <input
            id="tool-cost"
            type="number"
            min="0"
            step="0.01"
            value={monthlyCost}
            onChange={(e) => setMonthlyCost(e.target.value)}
            placeholder="0"
            className={`w-full border-2 border-neutral-200 px-4 py-2.5 text-base transition-colors hover:border-neutral-400 focus-visible:border-black outline-none ${focusClasses}`}
          />
        </div>
        <div>
          <label htmlFor="tool-contract" className="block text-base font-bold text-black mb-1">
            Contract Length (months)
          </label>
          <input
            id="tool-contract"
            type="number"
            min="0"
            value={contractMonths}
            onChange={(e) => setContractMonths(e.target.value)}
            placeholder="12"
            className={`w-full border-2 border-neutral-200 px-4 py-2.5 text-base transition-colors hover:border-neutral-400 focus-visible:border-black outline-none ${focusClasses}`}
          />
        </div>
      </div>
      <div>
        <span className="block text-base font-bold text-black mb-1">Rating</span>
        <StarRating value={rating} onChange={setRating} toolName={name || "new tool"} />
      </div>
      <div>
        <label htmlFor="tool-notes" className="block text-base font-bold text-black mb-1">
          Notes
        </label>
        <textarea
          id="tool-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          placeholder="What does this tool do for your team?"
          className={`w-full border-2 border-neutral-200 px-4 py-2.5 text-base transition-colors hover:border-neutral-400 focus-visible:border-black outline-none resize-y ${focusClasses}`}
        />
      </div>
      <button
        type="submit"
        className={`px-6 py-3 bg-black text-white text-base font-bold border-2 border-black transition-colors motion-reduce:transition-none hover:bg-white hover:text-black ${focusClasses}`}
      >
        Add Tool
      </button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Component: Integration Matrix                                      */
/* ------------------------------------------------------------------ */

function IntegrationMatrix({
  tools,
  integrations,
  onToggle,
}: {
  tools: StackTool[];
  integrations: IntegrationPair[];
  onToggle: (a: string, b: string) => void;
}) {
  if (tools.length < 2) {
    return (
      <p className="text-base text-neutral-500">
        Add at least two tools to map integrations between them.
      </p>
    );
  }

  const isIntegrated = (idA: string, idB: string): boolean =>
    integrations.some(
      (p) => (p.a === idA && p.b === idB) || (p.a === idB && p.b === idA)
    );

  return (
    <div className="overflow-x-auto -mx-6 px-6">
      <table className="border-collapse text-base" role="grid" aria-label="Integration matrix">
        <thead>
          <tr>
            <th className="p-2 border border-neutral-200 bg-neutral-50 text-left font-bold text-black min-w-[120px]">
              Tool
            </th>
            {tools.map((t) => (
              <th
                key={t.id}
                className="p-2 border border-neutral-200 bg-neutral-50 font-bold text-black text-center min-w-[80px]"
              >
                <span className="block truncate max-w-[100px]">{t.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tools.map((row) => (
            <tr key={row.id}>
              <td className="p-2 border border-neutral-200 font-bold text-black whitespace-nowrap">
                {row.name}
              </td>
              {tools.map((col) => {
                if (row.id === col.id) {
                  return (
                    <td
                      key={col.id}
                      className="p-2 border border-neutral-200 bg-neutral-100 text-center"
                      aria-label="Same tool"
                    >
                      <span className="text-neutral-400">&mdash;</span>
                    </td>
                  );
                }
                const checked = isIntegrated(row.id, col.id);
                return (
                  <td key={col.id} className="p-2 border border-neutral-200 text-center">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggle(row.id, col.id)}
                      className={`w-5 h-5 accent-black ${focusClasses}`}
                      aria-label={`${row.name} integrates with ${col.name}`}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */



export default function MartechStackPlannerPage() {
  const [state, setState] = useState<StackState>({ tools: [], integrations: [] });
  const [loaded, setLoaded] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"tools" | "dashboard" | "integrations" | "learn">(
    "tools"
  );

  /* Load from localStorage on mount */
  useEffect(() => {
    const saved = loadState();
    if (saved && saved.tools.length > 0) {
      setState(saved);
    } else {
      setState(sampleStack());
    }
    setLoaded(true);
  }, []);

  /* ---- Tool CRUD ---- */

  const addTool = useCallback((tool: StackTool) => {
    setState((prev) => ({ ...prev, tools: [...prev.tools, tool] }));
  }, []);

  const removeTool = useCallback((id: string) => {
    setState((prev) => ({
      tools: prev.tools.filter((t) => t.id !== id),
      integrations: prev.integrations.filter((p) => p.a !== id && p.b !== id),
    }));
  }, []);

  const updateTool = useCallback((id: string, updates: Partial<Omit<StackTool, "id">>) => {
    setState((prev) => ({
      ...prev,
      tools: prev.tools.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    }));
  }, []);

  /* ---- Integration toggle ---- */

  const toggleIntegration = useCallback((a: string, b: string) => {
    setState((prev) => {
      const exists = prev.integrations.some(
        (p) => (p.a === a && p.b === b) || (p.a === b && p.b === a)
      );
      return {
        ...prev,
        integrations: exists
          ? prev.integrations.filter(
              (p) => !((p.a === a && p.b === b) || (p.a === b && p.b === a))
            )
          : [...prev.integrations, { a, b }],
      };
    });
  }, []);

  /* ---- Computed stats ---- */

  const totalMonthly = useMemo(
    () => state.tools.reduce((sum, t) => sum + t.monthlyCost, 0),
    [state.tools]
  );

  const totalAnnual = totalMonthly * 12;
  const toolCount = state.tools.length;

  const averageRating = useMemo(() => {
    if (state.tools.length === 0) return 0;
    return state.tools.reduce((sum, t) => sum + t.rating, 0) / state.tools.length;
  }, [state.tools]);

  const categoryBreakdown = useMemo(() => {
    const map = new Map<Category, number>();
    for (const cat of CATEGORIES) map.set(cat, 0);
    for (const t of state.tools) {
      map.set(t.category, (map.get(t.category) || 0) + t.monthlyCost);
    }
    return Array.from(map.entries()).map(([category, cost]) => ({ category, cost }));
  }, [state.tools]);

  const maxCategoryCost = useMemo(
    () => Math.max(1, ...categoryBreakdown.map((c) => c.cost)),
    [categoryBreakdown]
  );

  const duplicateWarnings = useMemo(() => detectDuplicates(state.tools), [state.tools]);

  /* ---- Save / Load / Export ---- */

  const handleSave = useCallback(() => {
    saveState(state);
    setSaveMessage("Stack saved to browser storage.");
    setTimeout(() => setSaveMessage(""), 3000);
  }, [state]);

  const handleLoadSample = useCallback(() => {
    const sample = sampleStack();
    setState(sample);
  }, []);

  const handleClearAll = useCallback(() => {
    setState({ tools: [], integrations: [] });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const handleExport = useCallback(() => {
    const lines: string[] = [];
    lines.push("MARTECH STACK PLANNER — EXPORT");
    lines.push("=".repeat(50));
    lines.push(`Generated: ${new Date().toLocaleDateString()}`);
    lines.push("");

    lines.push("STACK OVERVIEW");
    lines.push("-".repeat(30));
    lines.push(`Total Tools: ${toolCount}`);
    lines.push(`Monthly Cost: $${totalMonthly.toLocaleString()}`);
    lines.push(`Annual Cost: $${totalAnnual.toLocaleString()}`);
    lines.push(`Average Rating: ${averageRating.toFixed(1)} / 5`);
    lines.push("");

    lines.push("TOOLS BY CATEGORY");
    lines.push("-".repeat(30));
    for (const cat of CATEGORIES) {
      const catTools = state.tools.filter((t) => t.category === cat);
      if (catTools.length === 0) continue;
      lines.push("");
      lines.push(`[${cat}]`);
      for (const t of catTools) {
        lines.push(`  ${t.name}`);
        lines.push(`    Cost: $${t.monthlyCost}/mo | Contract: ${t.contractMonths} months | Rating: ${starString(t.rating)}`);
        if (t.notes) lines.push(`    Notes: ${t.notes}`);
      }
    }
    lines.push("");

    lines.push("CATEGORY COST BREAKDOWN");
    lines.push("-".repeat(30));
    for (const item of categoryBreakdown) {
      if (item.cost > 0) {
        lines.push(`  ${item.category}: $${item.cost.toLocaleString()}/mo`);
      }
    }
    lines.push("");

    if (state.integrations.length > 0) {
      lines.push("INTEGRATIONS");
      lines.push("-".repeat(30));
      for (const pair of state.integrations) {
        const toolA = state.tools.find((t) => t.id === pair.a);
        const toolB = state.tools.find((t) => t.id === pair.b);
        if (toolA && toolB) {
          lines.push(`  ${toolA.name} <-> ${toolB.name}`);
        }
      }
      lines.push("");
    }

    if (duplicateWarnings.length > 0) {
      lines.push("OVERLAP WARNINGS");
      lines.push("-".repeat(30));
      for (const w of duplicateWarnings) {
        lines.push(`  ${w.toolA} + ${w.toolB} (${w.category}): ${w.reason}`);
      }
      lines.push("");
    }

    lines.push("---");
    lines.push("Exported from Markit Media Martech Stack Planner");
    lines.push("https://themarkitmedia.com/en/resources/martech-stack-planner");

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "martech-stack-planner.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [state, toolCount, totalMonthly, totalAnnual, averageRating, categoryBreakdown, duplicateWarnings]);

  /* ---- JSON-LD ---- */

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Martech Stack Planner",
    url: "https://themarkitmedia.com/en/resources/martech-stack-planner",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Plan, budget, and optimize your marketing technology stack. Compare tools across 8 categories, track costs, map integrations, and detect overlaps.",
    creator: {
      "@type": "Organization",
      name: "Markit Media",
      url: "https://themarkitmedia.com",
    },
  };

  /* ---- Tabs ---- */

  const tabs: { key: typeof activeTab; label: string }[] = [
    { key: "tools", label: "Tools" },
    { key: "dashboard", label: "Dashboard" },
    { key: "integrations", label: "Integrations" },
    { key: "learn", label: "Learn" },
  ];

  if (!loaded) {
    return (
      <article className="min-h-screen">
        <div className="px-6 lg:px-12 pt-40 pb-20 text-center">
          <p className="text-base text-neutral-500">Loading planner...</p>
        </div>
      </article>
    );
  }

  return (
    <article>
      <JsonLd data={jsonLd} />

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Martech Stack Planner" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Martech Stack Planner
            </h1>
            <SectionDesc>
              Plan, budget, and optimize your marketing technology stack. Add tools across 8
              categories, track costs, map integrations, and spot redundancies before they drain
              your budget.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Action Bar */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-6">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-3 items-center">
          <button
            onClick={handleSave}
            className={`px-5 py-2.5 bg-black text-white text-base font-bold border-2 border-black transition-colors motion-reduce:transition-none hover:bg-white hover:text-black ${focusClasses}`}
          >
            Save to Browser
          </button>
          <button
            onClick={handleExport}
            className={`px-5 py-2.5 bg-white text-black text-base font-bold border-2 border-neutral-300 transition-colors motion-reduce:transition-none hover:border-black ${focusClasses}`}
          >
            Export (.txt)
          </button>
          <button
            onClick={handleLoadSample}
            className={`px-5 py-2.5 bg-white text-black text-base font-bold border-2 border-neutral-300 transition-colors motion-reduce:transition-none hover:border-black ${focusClasses}`}
          >
            Load Sample Stack
          </button>
          <button
            onClick={handleClearAll}
            className={`px-5 py-2.5 bg-white text-black text-base font-bold border-2 border-neutral-300 transition-colors motion-reduce:transition-none hover:border-black ${focusClasses}`}
          >
            Clear All
          </button>
          {saveMessage && (
            <span className="text-base font-bold text-black" role="status">
              {saveMessage}
            </span>
          )}
        </div>
      </section>

      {/* Tab Navigation */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-8">
        <div className="max-w-5xl mx-auto">
          <nav
            className="flex gap-0 border-b-2 border-neutral-200"
            role="tablist"
            aria-label="Planner sections"
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                role="tab"
                aria-selected={activeTab === tab.key}
                aria-controls={`panel-${tab.key}`}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-3 text-base font-bold transition-colors motion-reduce:transition-none border-b-2 -mb-[2px] ${
                  activeTab === tab.key
                    ? "border-black text-black"
                    : "border-transparent text-neutral-400 hover:text-black"
                } ${focusClasses}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Tab: Tools */}
      {activeTab === "tools" && (
        <section
          id="panel-tools"
          role="tabpanel"
          aria-label="Tools"
          className="px-6 lg:px-12 pb-16"
        >
          <div className="max-w-5xl mx-auto space-y-8">
            <Animate animation="fade-up">
              <ToolForm onAdd={addTool} />
            </Animate>

            {/* Duplicate Warnings */}
            {duplicateWarnings.length > 0 && (
              <Animate animation="fade-up">
                <div className="border-2 border-black bg-neutral-50 p-6 space-y-3">
                  <p className="text-lg font-bold text-black">Potential Overlaps Detected</p>
                  {duplicateWarnings.map((w, i) => (
                    <div key={i} className="text-base text-neutral-700">
                      <span className="font-bold">{w.toolA}</span> and{" "}
                      <span className="font-bold">{w.toolB}</span> &mdash; {w.reason}
                    </div>
                  ))}
                </div>
              </Animate>
            )}

            {/* Tool List by Category */}
            {CATEGORIES.map((cat) => {
              const catTools = state.tools.filter((t) => t.category === cat);
              if (catTools.length === 0) return null;
              return (
                <Animate key={cat} animation="fade-up">
                  <div className="space-y-4">
                    <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black tracking-tight">
                      {cat}
                    </h2>
                    <div className="space-y-3">
                      {catTools.map((tool) => (
                        <div
                          key={tool.id}
                          className="border-2 border-neutral-200 p-4 flex flex-col md:flex-row md:items-start gap-4"
                        >
                          <div className="flex-1 space-y-2">
                            <div className="flex flex-wrap items-center gap-3">
                              <input
                                type="text"
                                value={tool.name}
                                onChange={(e) =>
                                  updateTool(tool.id, { name: e.target.value })
                                }
                                className={`text-lg font-bold text-black bg-transparent border-b-2 border-transparent hover:border-neutral-300 focus-visible:border-black outline-none transition-colors ${focusClasses}`}
                                aria-label={`Name for ${tool.name}`}
                              />
                              <StarRating
                                value={tool.rating}
                                onChange={(n) => updateTool(tool.id, { rating: n })}
                                toolName={tool.name}
                              />
                            </div>
                            <div className="flex flex-wrap gap-4 text-base text-neutral-600">
                              <span>
                                <span className="font-bold text-black">$</span>
                                <input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={tool.monthlyCost}
                                  onChange={(e) =>
                                    updateTool(tool.id, {
                                      monthlyCost: parseFloat(e.target.value) || 0,
                                    })
                                  }
                                  className={`w-20 text-base text-black bg-transparent border-b-2 border-transparent hover:border-neutral-300 focus-visible:border-black outline-none transition-colors ${focusClasses}`}
                                  aria-label={`Monthly cost for ${tool.name}`}
                                />
                                <span className="text-neutral-500">/mo</span>
                              </span>
                              <span>
                                <input
                                  type="number"
                                  min="0"
                                  value={tool.contractMonths}
                                  onChange={(e) =>
                                    updateTool(tool.id, {
                                      contractMonths: parseInt(e.target.value, 10) || 0,
                                    })
                                  }
                                  className={`w-16 text-base text-black bg-transparent border-b-2 border-transparent hover:border-neutral-300 focus-visible:border-black outline-none transition-colors ${focusClasses}`}
                                  aria-label={`Contract months for ${tool.name}`}
                                />
                                <span className="text-neutral-500"> month contract</span>
                              </span>
                            </div>
                            <textarea
                              value={tool.notes}
                              onChange={(e) =>
                                updateTool(tool.id, { notes: e.target.value })
                              }
                              rows={2}
                              className={`w-full text-base text-neutral-600 bg-transparent border-2 border-transparent hover:border-neutral-200 focus-visible:border-black outline-none transition-colors p-2 resize-y ${focusClasses}`}
                              aria-label={`Notes for ${tool.name}`}
                            />
                          </div>
                          <button
                            onClick={() => removeTool(tool.id)}
                            className={`self-start px-4 py-2 text-base font-bold text-neutral-500 border-2 border-neutral-200 transition-colors motion-reduce:transition-none hover:border-black hover:text-black ${focusClasses}`}
                            aria-label={`Remove ${tool.name}`}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Animate>
              );
            })}

            {state.tools.length === 0 && (
              <p className="text-base text-neutral-500 py-8 text-center">
                No tools added yet. Use the form above or load the sample stack.
              </p>
            )}
          </div>
        </section>
      )}

      {/* Tab: Dashboard */}
      {activeTab === "dashboard" && (
        <section
          id="panel-dashboard"
          role="tabpanel"
          aria-label="Dashboard"
          className="px-6 lg:px-12 pb-16"
        >
          <div className="max-w-5xl mx-auto space-y-10">
            {/* Overview Cards */}
            <Animate animation="fade-up">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="border-2 border-neutral-200 p-5">
                  <p className="text-base text-neutral-500 mb-1">Monthly Cost</p>
                  <p className="text-2xl font-extrabold text-black">
                    ${totalMonthly.toLocaleString()}
                  </p>
                </div>
                <div className="border-2 border-neutral-200 p-5">
                  <p className="text-base text-neutral-500 mb-1">Annual Cost</p>
                  <p className="text-2xl font-extrabold text-black">
                    ${totalAnnual.toLocaleString()}
                  </p>
                </div>
                <div className="border-2 border-neutral-200 p-5">
                  <p className="text-base text-neutral-500 mb-1">Tools</p>
                  <p className="text-2xl font-extrabold text-black">{toolCount}</p>
                </div>
                <div className="border-2 border-neutral-200 p-5">
                  <p className="text-base text-neutral-500 mb-1">Avg. Rating</p>
                  <p className="text-2xl font-extrabold text-black">
                    {averageRating > 0 ? averageRating.toFixed(1) : "--"}{" "}
                    <span className="text-lg">/ 5</span>
                  </p>
                </div>
              </div>
            </Animate>

            {/* Category Cost Breakdown */}
            <Animate animation="fade-up">
              <div className="space-y-4">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black tracking-tight">
                  Cost by Category
                </h2>
                <div className="space-y-3">
                  {categoryBreakdown.map((item) => (
                    <div key={item.category} className="space-y-1">
                      <div className="flex justify-between text-base">
                        <span className="font-bold text-black">{item.category}</span>
                        <span className="text-neutral-600">
                          ${item.cost.toLocaleString()}/mo
                        </span>
                      </div>
                      <div className="w-full bg-neutral-100 h-6 relative">
                        <div
                          className="bg-black h-6 transition-all duration-500"
                          style={{
                            width: `${
                              item.cost > 0
                                ? Math.max(2, (item.cost / maxCategoryCost) * 100)
                                : 0
                            }%`,
                          }}
                          role="meter"
                          aria-label={`${item.category} cost`}
                          aria-valuenow={item.cost}
                          aria-valuemin={0}
                          aria-valuemax={maxCategoryCost}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Animate>

            {/* Per-tool cost table */}
            {state.tools.length > 0 && (
              <Animate animation="fade-up">
                <div className="space-y-4">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black tracking-tight">
                    All Tools
                  </h2>
                  <div className="overflow-x-auto -mx-6 px-6">
                    <table className="w-full border-collapse text-base">
                      <thead>
                        <tr>
                          <th className="text-left p-3 border-b-2 border-black font-bold text-black">
                            Tool
                          </th>
                          <th className="text-left p-3 border-b-2 border-black font-bold text-black">
                            Category
                          </th>
                          <th className="text-right p-3 border-b-2 border-black font-bold text-black">
                            $/mo
                          </th>
                          <th className="text-right p-3 border-b-2 border-black font-bold text-black">
                            Contract
                          </th>
                          <th className="text-center p-3 border-b-2 border-black font-bold text-black">
                            Rating
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.tools.map((t) => (
                          <tr key={t.id} className="border-b border-neutral-200">
                            <td className="p-3 font-bold text-black">{t.name}</td>
                            <td className="p-3 text-neutral-600">{t.category}</td>
                            <td className="p-3 text-right text-black">
                              ${t.monthlyCost.toLocaleString()}
                            </td>
                            <td className="p-3 text-right text-neutral-600">
                              {t.contractMonths > 0 ? `${t.contractMonths} mo` : "None"}
                            </td>
                            <td className="p-3 text-center text-black">
                              {starString(t.rating)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Animate>
            )}
          </div>
        </section>
      )}

      {/* Tab: Integrations */}
      {activeTab === "integrations" && (
        <section
          id="panel-integrations"
          role="tabpanel"
          aria-label="Integrations"
          className="px-6 lg:px-12 pb-16"
        >
          <div className="max-w-5xl mx-auto space-y-8">
            <Animate animation="fade-up">
              <div className="space-y-4">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black tracking-tight">
                  Integration Matrix
                </h2>
                <p className="text-base text-neutral-600">
                  Check the boxes where two tools integrate with each other. This helps you
                  visualize data flow and identify gaps in your stack.
                </p>
                <IntegrationMatrix
                  tools={state.tools}
                  integrations={state.integrations}
                  onToggle={toggleIntegration}
                />
              </div>
            </Animate>

            {/* Integration summary */}
            {state.integrations.length > 0 && (
              <Animate animation="fade-up">
                <div className="space-y-3">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black tracking-tight">
                    Connected Pairs ({state.integrations.length})
                  </h2>
                  <div className="space-y-2">
                    {state.integrations.map((pair, i) => {
                      const toolA = state.tools.find((t) => t.id === pair.a);
                      const toolB = state.tools.find((t) => t.id === pair.b);
                      if (!toolA || !toolB) return null;
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between border-2 border-neutral-200 p-3"
                        >
                          <span className="text-base text-black">
                            <span className="font-bold">{toolA.name}</span>
                            {" "}&harr;{" "}
                            <span className="font-bold">{toolB.name}</span>
                          </span>
                          <button
                            onClick={() => toggleIntegration(pair.a, pair.b)}
                            className={`text-base text-neutral-500 hover:text-black transition-colors ${focusClasses}`}
                            aria-label={`Remove integration between ${toolA.name} and ${toolB.name}`}
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Animate>
            )}

            {/* Unconnected tools */}
            {state.tools.length >= 2 && (
              <Animate animation="fade-up">
                <div className="space-y-3">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black tracking-tight">
                    Unconnected Tools
                  </h2>
                  <p className="text-base text-neutral-600">
                    These tools have no integrations mapped. Consider whether they should connect
                    to other tools in your stack.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {state.tools
                      .filter(
                        (t) =>
                          !state.integrations.some(
                            (p) => p.a === t.id || p.b === t.id
                          )
                      )
                      .map((t) => (
                        <span
                          key={t.id}
                          className="px-4 py-2 border-2 border-neutral-300 text-base font-bold text-black"
                        >
                          {t.name}
                        </span>
                      ))}
                    {state.tools.every((t) =>
                      state.integrations.some(
                        (p) => p.a === t.id || p.b === t.id
                      )
                    ) && (
                      <p className="text-base text-neutral-500">
                        All tools have at least one integration mapped.
                      </p>
                    )}
                  </div>
                </div>
              </Animate>
            )}
          </div>
        </section>
      )}

      {/* Tab: Learn */}
      {activeTab === "learn" && (
        <section
          id="panel-learn"
          role="tabpanel"
          aria-label="Learn"
          className="px-6 lg:px-12 pb-16"
        >
          <div className="max-w-3xl mx-auto space-y-12">
            <Animate animation="fade-up">
              <div className="space-y-4">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black tracking-tight">
                  Building a Marketing Technology Stack
                </h2>
                <p className="text-base text-neutral-700 leading-relaxed">
                  A martech stack is the collection of software tools your marketing team uses to
                  plan, execute, and measure campaigns. The average mid-size company uses 8 to 12
                  marketing tools, though that number grows quickly without careful planning.
                </p>
                <p className="text-base text-neutral-700 leading-relaxed">
                  Start with your core needs: CRM for managing contacts, analytics for
                  measurement, and a CMS for publishing. Then layer in category-specific tools
                  (SEO, email, social, ads) based on your actual channel strategy rather than
                  aspirational plans.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up">
              <div className="space-y-4">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black tracking-tight">
                  Evaluating Tools Before You Commit
                </h2>
                <p className="text-base text-neutral-700 leading-relaxed">
                  Before adding any tool to your stack, ask five questions: Does it solve a
                  problem we have right now? Does it integrate with our existing tools? What is
                  the total cost of ownership (license, onboarding, training)? Can our team
                  actually adopt it? What happens to our data if we leave?
                </p>
                <p className="text-base text-neutral-700 leading-relaxed">
                  Run a 14-to-30-day trial with real workflows, not demo data. Track how often
                  the team actually logs in. A tool nobody uses costs the same as a tool
                  everybody uses.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up">
              <div className="space-y-4">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black tracking-tight">
                  Why Integrations Matter
                </h2>
                <p className="text-base text-neutral-700 leading-relaxed">
                  Disconnected tools create data silos. When your CRM does not talk to your email
                  platform, you cannot attribute revenue to campaigns. When your analytics tool
                  does not receive ad spend data, your ROI calculations are guesswork.
                </p>
                <p className="text-base text-neutral-700 leading-relaxed">
                  Native integrations are best. Middleware (Zapier, Make) fills gaps but adds
                  cost and failure points. Before buying a new tool, check its integration
                  directory and verify the connections you need actually exist and transfer the
                  data fields you require.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up">
              <div className="space-y-4">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black tracking-tight">
                  When to Consolidate Your Stack
                </h2>
                <p className="text-base text-neutral-700 leading-relaxed">
                  Signs you need to consolidate: more than two tools in the same category, team
                  members using workarounds instead of the designated tool, monthly spend growing
                  faster than revenue, or data living in places nobody checks.
                </p>
                <p className="text-base text-neutral-700 leading-relaxed">
                  Consolidation does not always mean fewer tools. Sometimes it means replacing
                  three overlapping point solutions with one platform that covers the same ground.
                  Calculate the total cost of the tools you would retire against the new
                  platform&apos;s price, including migration and retraining time.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up">
              <div className="space-y-4">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black tracking-tight">
                  Hidden Costs to Watch For
                </h2>
                <p className="text-base text-neutral-700 leading-relaxed">
                  The sticker price of a SaaS tool is rarely the full cost. Budget for these
                  commonly overlooked expenses:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base text-neutral-700">
                  <li>
                    <span className="font-bold">Onboarding and training</span> &mdash; Staff time
                    to learn a new tool plus any paid onboarding services.
                  </li>
                  <li>
                    <span className="font-bold">Usage-based pricing tiers</span> &mdash; Many
                    tools charge per contact, per email sent, or per API call. Costs grow with
                    your business.
                  </li>
                  <li>
                    <span className="font-bold">Integration maintenance</span> &mdash; Custom
                    integrations break when APIs change. Someone needs to fix them.
                  </li>
                  <li>
                    <span className="font-bold">Data migration</span> &mdash; Moving from one
                    tool to another is rarely free. Budget time for export, mapping, import, and
                    validation.
                  </li>
                  <li>
                    <span className="font-bold">Contract lock-in</span> &mdash; Annual contracts
                    save money but reduce flexibility. A 12-month commitment on a tool you stop
                    using in month 3 is wasted spend.
                  </li>
                </ul>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section aria-label="Need Help Optimizing Your Martech Stack?" className="px-6 lg:px-12 py-20 border-t-2 border-neutral-200">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight">
              Need Help Optimizing Your Martech Stack?
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-xl mx-auto">
              Our team audits marketing technology stacks, identifies redundancies, and recommends
              the right tools for your goals and budget.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className={`inline-block px-8 py-4 bg-black text-white text-base font-bold border-2 border-black transition-colors motion-reduce:transition-none hover:bg-white hover:text-black ${focusClasses}`}
              >
                Get a Free Consultation
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Martech Stack Planner"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Marketing Timeline Planner", href: "/resources/marketing-timeline-planner" },
          { title: "Marketing Trends 2025", href: "/resources/marketing-trends-2025" },
          { title: "Marketing Trends 2026", href: "/resources/marketing-trends-2026" },
          { title: "Meeting Agenda Builder", href: "/resources/meeting-agenda-builder" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
