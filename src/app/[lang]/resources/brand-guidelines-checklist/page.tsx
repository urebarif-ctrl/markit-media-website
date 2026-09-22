"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

type Priority = "Essential" | "Recommended" | "Nice to Have";

interface ChecklistItem {
  id: string;
  label: string;
  category: string;
  priority: Priority;
}

interface ItemState {
  checked: boolean;
  notes: string;
}

const STORAGE_KEY = "markit-brand-guidelines-checklist";

const CATEGORIES = [
  "Logo",
  "Color Palette",
  "Typography",
  "Imagery & Photography",
  "Brand Voice & Tone",
  "Digital Standards",
  "Application Guidelines",
] as const;

type Category = (typeof CATEGORIES)[number];

const CHECKLIST_ITEMS: ChecklistItem[] = [
  /* Logo (6) */
  { id: "logo-primary", label: "Primary logo defined with usage rules", category: "Logo", priority: "Essential" },
  { id: "logo-secondary", label: "Secondary or alternate logo versions documented", category: "Logo", priority: "Essential" },
  { id: "logo-min-size", label: "Minimum size requirements specified", category: "Logo", priority: "Essential" },
  { id: "logo-clear-space", label: "Clear space rules around logo defined", category: "Logo", priority: "Essential" },
  { id: "logo-color-versions", label: "Color, black, white, and transparent versions provided", category: "Logo", priority: "Recommended" },
  { id: "logo-donts", label: "Logo usage restrictions and common mistakes documented", category: "Logo", priority: "Recommended" },

  /* Color Palette (6) */
  { id: "color-primary", label: "Primary brand colors with hex, RGB, and CMYK values", category: "Color Palette", priority: "Essential" },
  { id: "color-secondary", label: "Secondary color palette defined", category: "Color Palette", priority: "Essential" },
  { id: "color-accent", label: "Accent colors for highlights and CTAs", category: "Color Palette", priority: "Recommended" },
  { id: "color-ratios", label: "Color usage ratios and proportions specified", category: "Color Palette", priority: "Recommended" },
  { id: "color-accessible", label: "Accessible color combinations documented (WCAG AA)", category: "Color Palette", priority: "Essential" },
  { id: "color-gradients", label: "Gradient usage rules and specifications", category: "Color Palette", priority: "Nice to Have" },

  /* Typography (6) */
  { id: "type-primary", label: "Primary typeface selected with license details", category: "Typography", priority: "Essential" },
  { id: "type-secondary", label: "Secondary typeface for body or accent use", category: "Typography", priority: "Essential" },
  { id: "type-scale", label: "Font size scale and hierarchy defined", category: "Typography", priority: "Essential" },
  { id: "type-spacing", label: "Line height and letter spacing specifications", category: "Typography", priority: "Recommended" },
  { id: "type-headings", label: "Heading hierarchy with styles for H1 through H6", category: "Typography", priority: "Recommended" },
  { id: "type-web", label: "Web font specifications and fallback stacks", category: "Typography", priority: "Recommended" },

  /* Imagery & Photography (5) */
  { id: "img-style", label: "Photography style guidelines documented", category: "Imagery & Photography", priority: "Essential" },
  { id: "img-treatment", label: "Image treatment, filters, and overlays defined", category: "Imagery & Photography", priority: "Recommended" },
  { id: "img-illustration", label: "Illustration style and usage rules", category: "Imagery & Photography", priority: "Recommended" },
  { id: "img-icons", label: "Icon set style and library specified", category: "Imagery & Photography", priority: "Recommended" },
  { id: "img-stock", label: "Stock photo selection criteria and approved sources", category: "Imagery & Photography", priority: "Nice to Have" },

  /* Brand Voice & Tone (6) */
  { id: "voice-personality", label: "Brand personality traits defined (3 to 5 adjectives)", category: "Brand Voice & Tone", priority: "Essential" },
  { id: "voice-tone", label: "Tone of voice guide with situational examples", category: "Brand Voice & Tone", priority: "Essential" },
  { id: "voice-dos-donts", label: "Writing dos and don'ts with examples", category: "Brand Voice & Tone", priority: "Essential" },
  { id: "voice-vocab", label: "Preferred vocabulary and terminology glossary", category: "Brand Voice & Tone", priority: "Recommended" },
  { id: "voice-samples", label: "Sample copy for common use cases", category: "Brand Voice & Tone", priority: "Recommended" },
  { id: "voice-social", label: "Social media voice and platform-specific guidelines", category: "Brand Voice & Tone", priority: "Nice to Have" },

  /* Digital Standards (6) */
  { id: "digital-email", label: "Email template standards and layout rules", category: "Digital Standards", priority: "Recommended" },
  { id: "digital-social", label: "Social media templates and sizing guides", category: "Digital Standards", priority: "Recommended" },
  { id: "digital-ui", label: "Website UI components and interaction patterns", category: "Digital Standards", priority: "Essential" },
  { id: "digital-favicon", label: "Favicon, app icons, and touch icon specifications", category: "Digital Standards", priority: "Essential" },
  { id: "digital-responsive", label: "Responsive behavior and breakpoint guidelines", category: "Digital Standards", priority: "Recommended" },
  { id: "digital-motion", label: "Animation and motion design guidelines", category: "Digital Standards", priority: "Nice to Have" },

  /* Application Guidelines (5) */
  { id: "app-cards", label: "Business card design and specifications", category: "Application Guidelines", priority: "Recommended" },
  { id: "app-letterhead", label: "Letterhead and stationery templates", category: "Application Guidelines", priority: "Recommended" },
  { id: "app-presentations", label: "Presentation template with slide masters", category: "Application Guidelines", priority: "Recommended" },
  { id: "app-signage", label: "Signage specifications and placement rules", category: "Application Guidelines", priority: "Nice to Have" },
  { id: "app-packaging", label: "Packaging and merchandise brand application", category: "Application Guidelines", priority: "Nice to Have" },
];

function getItemsByCategory(category: string): ChecklistItem[] {
  return CHECKLIST_ITEMS.filter((item) => item.category === category);
}

function createDefaultState(): Record<string, ItemState> {
  const state: Record<string, ItemState> = {};
  for (const item of CHECKLIST_ITEMS) {
    state[item.id] = { checked: false, notes: "" };
  }
  return state;
}

function getGrade(percentage: number): { grade: string; label: string } {
  if (percentage >= 90) return { grade: "A", label: "Comprehensive" };
  if (percentage >= 75) return { grade: "B", label: "Strong" };
  if (percentage >= 60) return { grade: "C", label: "Developing" };
  if (percentage >= 40) return { grade: "D", label: "Incomplete" };
  return { grade: "F", label: "Just Getting Started" };
}

const PRIORITY_ORDER: Record<Priority, number> = {
  Essential: 0,
  Recommended: 1,
  "Nice to Have": 2,
};

/* ------------------------------------------------------------------ */
/*  Category Progress Bar                                              */
/* ------------------------------------------------------------------ */

function CategoryProgress({
  category,
  items,
  state,
}: {
  category: string;
  items: ChecklistItem[];
  state: Record<string, ItemState>;
}) {
  const done = items.filter((i) => state[i.id]?.checked).length;
  const total = items.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="mb-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-base font-medium text-black">{category}</span>
        <span className="text-base text-neutral-500">
          {done}/{total} ({pct}%)
        </span>
      </div>
      <div
        className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${category} progress: ${pct}%`}
      >
        <div
          className="h-full bg-black rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Priority Badge                                                     */
/* ------------------------------------------------------------------ */

function PriorityBadge({ priority }: { priority: Priority }) {
  const styles: Record<Priority, string> = {
    Essential: "bg-black text-white",
    Recommended: "bg-neutral-200 text-black",
    "Nice to Have": "bg-neutral-100 text-neutral-600",
  };

  return (
    <span
      className={`inline-block px-2.5 py-0.5 text-base font-medium rounded ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function BrandGuidelinesChecklistPage() {
  const [itemState, setItemState] = useState<Record<string, ItemState>>(createDefaultState);
  const [loaded, setLoaded] = useState(false);
  const [expandedNotes, setExpandedNotes] = useState<Set<string>>(new Set());
  const [filterPriority, setFilterPriority] = useState<Priority | "All">("All");

  /* ---- localStorage persistence ---- */

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed === "object" && parsed !== null) {
          setItemState((prev) => {
            const merged = { ...prev };
            for (const key of Object.keys(merged)) {
              if (parsed[key]) {
                merged[key] = {
                  checked: !!parsed[key].checked,
                  notes: typeof parsed[key].notes === "string" ? parsed[key].notes : "",
                };
              }
            }
            return merged;
          });
        }
      }
    } catch {
      /* ignore corrupt data */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itemState));
    }
  }, [itemState, loaded]);

  /* ---- Handlers ---- */

  const toggleCheck = useCallback((id: string) => {
    setItemState((prev) => ({
      ...prev,
      [id]: { ...prev[id], checked: !prev[id].checked },
    }));
  }, []);

  const updateNotes = useCallback((id: string, notes: string) => {
    setItemState((prev) => ({
      ...prev,
      [id]: { ...prev[id], notes },
    }));
  }, []);

  const toggleNotesExpanded = useCallback((id: string) => {
    setExpandedNotes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setItemState(createDefaultState());
    setExpandedNotes(new Set());
  }, []);

  /* ---- Computed values ---- */

  const totalChecked = useMemo(
    () => CHECKLIST_ITEMS.filter((i) => itemState[i.id]?.checked).length,
    [itemState]
  );

  const totalItems = CHECKLIST_ITEMS.length;
  const overallPct = Math.round((totalChecked / totalItems) * 100);
  const { grade, label: gradeLabel } = getGrade(overallPct);

  const essentialItems = useMemo(
    () => CHECKLIST_ITEMS.filter((i) => i.priority === "Essential"),
    []
  );
  const essentialChecked = useMemo(
    () => essentialItems.filter((i) => itemState[i.id]?.checked).length,
    [itemState, essentialItems]
  );
  const essentialPct = Math.round((essentialChecked / essentialItems.length) * 100);

  /* ---- Missing essentials action plan ---- */

  const missingEssentials = useMemo(
    () => essentialItems.filter((i) => !itemState[i.id]?.checked),
    [itemState, essentialItems]
  );

  const actionPlanByCategory = useMemo(() => {
    const map: Record<string, ChecklistItem[]> = {};
    for (const item of missingEssentials) {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    }
    return map;
  }, [missingEssentials]);

  /* ---- Export as .txt ---- */

  const exportTxt = useCallback(() => {
    const lines: string[] = [];
    lines.push("BRAND GUIDELINES CHECKLIST");
    lines.push("=".repeat(50));
    lines.push(`Overall: ${totalChecked}/${totalItems} (${overallPct}%) — Grade: ${grade} (${gradeLabel})`);
    lines.push(`Essentials: ${essentialChecked}/${essentialItems.length} (${essentialPct}%)`);
    lines.push("");

    for (const cat of CATEGORIES) {
      const items = getItemsByCategory(cat);
      const done = items.filter((i) => itemState[i.id]?.checked).length;
      lines.push(`--- ${cat.toUpperCase()} (${done}/${items.length}) ---`);
      for (const item of items) {
        const mark = itemState[item.id]?.checked ? "[x]" : "[ ]";
        lines.push(`  ${mark} [${item.priority}] ${item.label}`);
        const notes = itemState[item.id]?.notes;
        if (notes) {
          lines.push(`      Notes: ${notes}`);
        }
      }
      lines.push("");
    }

    if (missingEssentials.length > 0) {
      lines.push("--- ACTION PLAN: MISSING ESSENTIALS ---");
      for (const cat of Object.keys(actionPlanByCategory)) {
        lines.push(`  ${cat}:`);
        for (const item of actionPlanByCategory[cat]) {
          lines.push(`    - ${item.label}`);
        }
      }
      lines.push("");
    }

    lines.push("Generated by Markit Media — themarkitmedia.com");

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "brand-guidelines-checklist.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [
    itemState,
    totalChecked,
    totalItems,
    overallPct,
    grade,
    gradeLabel,
    essentialChecked,
    essentialItems,
    essentialPct,
    missingEssentials,
    actionPlanByCategory,
  ]);

  /* ---- Filter logic ---- */

  const filteredCategories = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const items = getItemsByCategory(cat);
      const filtered =
        filterPriority === "All"
          ? items
          : items.filter((i) => i.priority === filterPriority);
      return { category: cat, items: filtered, allItems: items };
    }).filter((c) => c.items.length > 0);
  }, [filterPriority]);

  /* ---- JSON-LD ---- */

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Brand Guidelines Checklist",
    description:
      "40-item interactive checklist to ensure your brand guidelines document covers logo, color, typography, imagery, voice, and digital standards.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <article>
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/brand-name-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Name Generator</Link>
                <Link href="/resources/brand-name-evaluator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Name Evaluator</Link>
                <Link href="/resources/brand-voice-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Voice Generator</Link>
                <Link href="/resources/brand-voice-checker" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Voice Checker</Link>
          </div>
        </div>
      </section>
<JsonLd data={jsonLd} />
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Brand Guidelines Checklist" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Interactive Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Interactive Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Brand Guidelines Checklist
            </h1>
            <SectionDesc>
              Audit your brand guidelines document against 40 essential items across
              7 categories. Check off completed items, add notes, track your
              progress, and export an action plan for anything missing.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Score Overview ---- */}
      <section className="px-6 lg:px-12 pb-10" aria-label="Score overview">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up" delay={100}>
            <div className="border border-neutral-200 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Overall score */}
                <div className="flex-shrink-0 text-center sm:text-left">
                  <div className="font-[family-name:var(--font-display)] text-5xl font-extrabold text-black">
                    {grade}
                  </div>
                  <div className="text-base text-neutral-500 mt-1">{gradeLabel}</div>
                </div>

                <div className="flex-1 w-full">
                  {/* Overall bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-base font-semibold text-black">
                        Overall Completeness
                      </span>
                      <span className="text-base font-bold text-black">
                        {totalChecked}/{totalItems} ({overallPct}%)
                      </span>
                    </div>
                    <div
                      className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden"
                      role="progressbar"
                      aria-valuenow={overallPct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`Overall completeness: ${overallPct}%`}
                    >
                      <div
                        className="h-full bg-black rounded-full transition-all duration-500"
                        style={{ width: `${overallPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Essentials bar */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-base text-neutral-600">
                        Essentials Only
                      </span>
                      <span className="text-base font-medium text-neutral-600">
                        {essentialChecked}/{essentialItems.length} ({essentialPct}%)
                      </span>
                    </div>
                    <div
                      className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden"
                      role="progressbar"
                      aria-valuenow={essentialPct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`Essential items completeness: ${essentialPct}%`}
                    >
                      <div
                        className="h-full bg-neutral-500 rounded-full transition-all duration-500"
                        style={{ width: `${essentialPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={exportTxt}
                  className="px-5 py-2.5 bg-black text-white text-base font-semibold hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Export as .txt
                </button>
                <button
                  type="button"
                  onClick={resetAll}
                  className="px-5 py-2.5 border border-neutral-300 text-base font-semibold text-black hover:bg-neutral-50 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Reset All
                </button>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Category Progress Overview ---- */}
      <section className="px-6 lg:px-12 pb-10" aria-label="Category progress">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up" delay={150}>
            <div className="border border-neutral-200 p-6 sm:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-5">
                Progress by Category
              </h2>
              <div className="space-y-4">
                {CATEGORIES.map((cat) => {
                  const items = getItemsByCategory(cat);
                  return (
                    <CategoryProgress
                      key={cat}
                      category={cat}
                      items={items}
                      state={itemState}
                    />
                  );
                })}
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Priority Filter ---- */}
      <section className="px-6 lg:px-12 pb-6" aria-label="Filter by priority">
        <div className="max-w-4xl mx-auto">
          <fieldset>
            <legend className="text-base font-semibold text-black mb-3">
              Filter by priority
            </legend>
            <div className="flex flex-wrap gap-2">
              {(["All", "Essential", "Recommended", "Nice to Have"] as const).map(
                (opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFilterPriority(opt)}
                    className={`px-4 py-2 text-base font-medium border transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      filterPriority === opt
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-neutral-300 hover:bg-neutral-50"
                    }`}
                  >
                    {opt}
                  </button>
                )
              )}
            </div>
          </fieldset>
        </div>
      </section>

      {/* ---- Checklist Categories ---- */}
      {filteredCategories.map(({ category, items, allItems }, catIdx) => (
        <section
          key={category}
          className="px-6 lg:px-12 pb-10"
          aria-label={`${category} checklist`}
        >
          <div className="max-w-4xl mx-auto">
            <Animate animation="fade-up" delay={200 + catIdx * 50}>
              <div className="border border-neutral-200">
                <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-black">
                      {category}
                    </h2>
                    <span className="text-base text-neutral-500">
                      {allItems.filter((i) => itemState[i.id]?.checked).length}/
                      {allItems.length} complete
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-neutral-100">
                  {items.map((item) => {
                    const st = itemState[item.id];
                    const notesOpen = expandedNotes.has(item.id);

                    return (
                      <div key={item.id} className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="pt-0.5">
                            <input
                              type="checkbox"
                              id={item.id}
                              checked={st?.checked ?? false}
                              onChange={() => toggleCheck(item.id)}
                              className="w-5 h-5 rounded border-neutral-300 text-black accent-black cursor-pointer focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 flex-wrap">
                              <label
                                htmlFor={item.id}
                                className={`text-base cursor-pointer leading-relaxed ${
                                  st?.checked
                                    ? "line-through text-neutral-400"
                                    : "text-black"
                                }`}
                              >
                                {item.label}
                              </label>
                              <PriorityBadge priority={item.priority} />
                            </div>

                            {/* Notes toggle */}
                            <button
                              type="button"
                              onClick={() => toggleNotesExpanded(item.id)}
                              className="text-base text-neutral-500 hover:text-black mt-1.5 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                              aria-expanded={notesOpen}
                              aria-controls={`notes-${item.id}`}
                            >
                              {notesOpen ? "Hide notes" : st?.notes ? "Edit notes" : "Add notes"}
                            </button>

                            {notesOpen && (
                              <div className="mt-2" id={`notes-${item.id}`}>
                                <label
                                  htmlFor={`notes-input-${item.id}`}
                                  className="sr-only"
                                >
                                  Notes for {item.label}
                                </label>
                                <textarea
                                  id={`notes-input-${item.id}`}
                                  value={st?.notes ?? ""}
                                  onChange={(e) =>
                                    updateNotes(item.id, e.target.value)
                                  }
                                  placeholder="Add your notes here..."
                                  rows={2}
                                  className="w-full px-3 py-2 text-base border border-neutral-300 bg-white text-black placeholder:text-neutral-400 resize-y focus:outline-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Animate>
          </div>
        </section>
      ))}

      {/* ---- Action Plan for Missing Essentials ---- */}
      {missingEssentials.length > 0 && (
        <section className="px-6 lg:px-12 pb-10" aria-label="Action plan">
          <div className="max-w-4xl mx-auto">
            <Animate animation="fade-up">
              <div className="border-2 border-black p-6 sm:p-8">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-2">
                  Action Plan: Missing Essentials
                </h2>
                <p className="text-base text-neutral-600 mb-6">
                  {missingEssentials.length} essential{" "}
                  {missingEssentials.length === 1 ? "item needs" : "items need"}{" "}
                  attention. Address these first to build a solid brand foundation.
                </p>

                <div className="space-y-5">
                  {Object.entries(actionPlanByCategory)
                    .sort(
                      ([, a], [, b]) => b.length - a.length
                    )
                    .map(([cat, items]) => (
                      <div key={cat}>
                        <h3 className="text-base font-bold text-black mb-2">
                          {cat}
                        </h3>
                        <ul className="space-y-1.5">
                          {items
                            .sort(
                              (a, b) =>
                                PRIORITY_ORDER[a.priority] -
                                PRIORITY_ORDER[b.priority]
                            )
                            .map((item) => (
                              <li
                                key={item.id}
                                className="flex items-start gap-2 text-base text-neutral-700"
                              >
                                <span
                                  className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0"
                                  aria-hidden="true"
                                />
                                {item.label}
                              </li>
                            ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- All Essentials Complete Message ---- */}
      {missingEssentials.length === 0 && totalChecked > 0 && (
        <section className="px-6 lg:px-12 pb-10" aria-label="Essentials complete">
          <div className="max-w-4xl mx-auto">
            <Animate animation="fade-up">
              <div className="border-2 border-black bg-black text-white p-6 sm:p-8">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-bold mb-2">
                  All Essential Items Complete
                </h2>
                <p className="text-base text-neutral-300">
                  Your brand guidelines cover all the fundamentals. Continue
                  working through the Recommended and Nice to Have items to create
                  a truly comprehensive brand document.
                </p>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Educational Section ---- */}
      <section className="px-6 lg:px-12 py-16 bg-neutral-50" aria-label="About brand guidelines">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black tracking-tight leading-tight mb-6">
              Why Brand Guidelines Matter
            </h2>

            <div className="space-y-6 text-base text-neutral-700 leading-relaxed">
              <p>
                Brand guidelines are the single source of truth for how your brand
                looks, sounds, and behaves across every touchpoint. Without them,
                inconsistency creeps in — different logo treatments on social media,
                mismatched colors in presentations, conflicting tones in email
                campaigns. Each inconsistency erodes the trust and recognition you
                have built.
              </p>

              <p>
                Research from Lucidpress shows that consistent brand presentation
                across platforms can increase revenue by up to 23%. Guidelines
                protect that consistency by giving every team member, vendor, and
                partner clear rules to follow, regardless of the medium or channel.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 my-8">
                <div className="border border-neutral-200 bg-white p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mb-3">
                    What Good Guidelines Include
                  </h3>
                  <ul className="space-y-2 text-base text-neutral-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" aria-hidden="true" />
                      Logo variations with sizing and spacing rules
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" aria-hidden="true" />
                      Full color system with accessibility testing
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" aria-hidden="true" />
                      Typography scale with web and print specs
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" aria-hidden="true" />
                      Voice and tone with real-world examples
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" aria-hidden="true" />
                      Templates for every recurring brand touchpoint
                    </li>
                  </ul>
                </div>

                <div className="border border-neutral-200 bg-white p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mb-3">
                    Common Mistakes to Avoid
                  </h3>
                  <ul className="space-y-2 text-base text-neutral-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" aria-hidden="true" />
                      Creating guidelines no one can find or access
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" aria-hidden="true" />
                      Skipping digital standards and responsive rules
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" aria-hidden="true" />
                      Ignoring voice and tone in favor of visuals only
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" aria-hidden="true" />
                      Not updating guidelines as the brand evolves
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" aria-hidden="true" />
                      Missing accessibility requirements in color specs
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                A complete brand guidelines document does not need to be hundreds of
                pages. Start with the essentials highlighted in this checklist, then
                expand into recommended items as your brand matures. The key is to
                document decisions clearly and make the guidelines easy for your team
                to reference.
              </p>
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="px-6 lg:px-12 py-16" aria-label="Get help with your brand">
        <div className="max-w-4xl mx-auto text-center">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black tracking-tight leading-tight mb-4">
              Need Help Building Your Brand Guidelines?
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto mb-8">
              Our team creates comprehensive brand guidelines documents that cover
              every item on this checklist and more. From logo systems to voice
              frameworks, we build the foundation your brand needs to stay consistent
              at scale.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 bg-black text-white text-base font-semibold hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Get in Touch
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Brand Guidelines Checklist"
        services={[
          { title: "Branding", desc: "Strategic brand identity that differentiates you in your market.", href: "/services/branding" },
          { title: "Website Development", desc: "Websites that bring your brand to life with exceptional UX.", href: "/services/website-development" },
          { title: "Digital Marketing", desc: "Amplify your brand across every digital touchpoint.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
          { title: "Brand Consistency Checker", href: "/resources/brand-consistency-checker" },
          { title: "Brand Name Evaluator", href: "/resources/brand-name-evaluator" },
          { title: "Brand Name Generator", href: "/resources/brand-name-generator" },
          { title: "Brand Positioning", href: "/resources/brand-positioning" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
