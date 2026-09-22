"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Priority = "Critical" | "Important" | "Nice to Have";

interface ChecklistItem {
  id: string;
  text: string;
  priority: Priority;
}

interface ChecklistCategory {
  title: string;
  items: ChecklistItem[];
}

/* ------------------------------------------------------------------ */
/*  Data — 50 items across 8 categories                                */
/* ------------------------------------------------------------------ */

const categories: ChecklistCategory[] = [
  {
    title: "Content",
    items: [
      { id: "c1", text: "All pages proofread for spelling and grammar", priority: "Critical" },
      { id: "c2", text: "Images optimized for web (correct format and dimensions)", priority: "Critical" },
      { id: "c3", text: "Alt text added to every image", priority: "Important" },
      { id: "c4", text: "Custom 404 error page created", priority: "Important" },
      { id: "c5", text: "Contact information correct across all pages", priority: "Critical" },
      { id: "c6", text: "All CTAs working and linking to correct destinations", priority: "Critical" },
      { id: "c7", text: "Content formatting consistent (fonts, spacing, lists)", priority: "Important" },
    ],
  },
  {
    title: "SEO",
    items: [
      { id: "s1", text: "Unique meta title set for every page (under 60 characters)", priority: "Critical" },
      { id: "s2", text: "Meta descriptions written for every page (150-160 characters)", priority: "Critical" },
      { id: "s3", text: "XML sitemap generated and accessible", priority: "Critical" },
      { id: "s4", text: "Robots.txt configured and not blocking important pages", priority: "Critical" },
      { id: "s5", text: "Canonical URLs set to prevent duplicate content", priority: "Important" },
      { id: "s6", text: "Heading hierarchy correct (single H1, logical H2-H6 order)", priority: "Important" },
      { id: "s7", text: "Structured data (schema markup) added for key page types", priority: "Nice to Have" },
    ],
  },
  {
    title: "Performance",
    items: [
      { id: "p1", text: "Page speed tested on mobile and desktop (target under 3 seconds)", priority: "Critical" },
      { id: "p2", text: "All images compressed without visible quality loss", priority: "Critical" },
      { id: "p3", text: "Lazy loading enabled for below-the-fold images", priority: "Important" },
      { id: "p4", text: "CSS and JavaScript minified for production", priority: "Important" },
      { id: "p5", text: "CDN configured for static assets", priority: "Nice to Have" },
      { id: "p6", text: "Caching headers set for static resources", priority: "Important" },
    ],
  },
  {
    title: "Security",
    items: [
      { id: "sec1", text: "SSL certificate installed and valid", priority: "Critical" },
      { id: "sec2", text: "All HTTP requests redirect to HTTPS", priority: "Critical" },
      { id: "sec3", text: "Form validation in place (client-side and server-side)", priority: "Critical" },
      { id: "sec4", text: "Security headers configured (CSP, X-Frame-Options, HSTS)", priority: "Important" },
      { id: "sec5", text: "Backup system configured and tested", priority: "Important" },
      { id: "sec6", text: "Login and admin pages secured with strong authentication", priority: "Critical" },
    ],
  },
  {
    title: "Design & UX",
    items: [
      { id: "d1", text: "Mobile responsiveness tested on real devices", priority: "Critical" },
      { id: "d2", text: "Cross-browser testing completed (Chrome, Firefox, Safari, Edge)", priority: "Critical" },
      { id: "d3", text: "Print stylesheet added for key pages", priority: "Nice to Have" },
      { id: "d4", text: "Favicon and touch icons set for all platforms", priority: "Important" },
      { id: "d5", text: "Loading states added for async content", priority: "Important" },
      { id: "d6", text: "Error states designed for forms and failed requests", priority: "Important" },
      { id: "d7", text: "Accessibility tested (keyboard navigation, screen reader, contrast)", priority: "Critical" },
    ],
  },
  {
    title: "Analytics & Tracking",
    items: [
      { id: "a1", text: "Google Analytics 4 installed and receiving data", priority: "Critical" },
      { id: "a2", text: "Conversion tracking configured for key actions", priority: "Critical" },
      { id: "a3", text: "Heatmap or session recording tool installed", priority: "Nice to Have" },
      { id: "a4", text: "Google Search Console connected and sitemap submitted", priority: "Critical" },
      { id: "a5", text: "Social media tracking pixels added (Meta, LinkedIn, etc.)", priority: "Important" },
      { id: "a6", text: "UTM parameter conventions defined for campaign links", priority: "Important" },
    ],
  },
  {
    title: "Legal",
    items: [
      { id: "l1", text: "Privacy policy published and linked in footer", priority: "Critical" },
      { id: "l2", text: "Terms of service published and linked in footer", priority: "Critical" },
      { id: "l3", text: "Cookie consent banner implemented and functional", priority: "Critical" },
      { id: "l4", text: "GDPR compliance verified (data collection, storage, deletion)", priority: "Important" },
      { id: "l5", text: "Copyright notices display the current year", priority: "Nice to Have" },
    ],
  },
  {
    title: "Launch Day",
    items: [
      { id: "ld1", text: "DNS records configured and propagated", priority: "Critical" },
      { id: "ld2", text: "Redirects set for all old URLs to new equivalents", priority: "Critical" },
      { id: "ld3", text: "CDN cache flushed to serve fresh content", priority: "Important" },
      { id: "ld4", text: "Monitoring and uptime alerts configured", priority: "Important" },
      { id: "ld5", text: "Social media announcement prepared and scheduled", priority: "Nice to Have" },
      { id: "ld6", text: "All stakeholders notified of launch time and plan", priority: "Important" },
    ],
  },
];

const TOTAL_ITEMS = categories.reduce((sum, cat) => sum + cat.items.length, 0);
const ALL_ITEMS = categories.flatMap((cat) => cat.items);
const CRITICAL_ITEMS = ALL_ITEMS.filter((item) => item.priority === "Critical");
const STORAGE_KEY = "markit-website-launch-checklist";

/* ------------------------------------------------------------------ */
/*  Persistence helpers                                                */
/* ------------------------------------------------------------------ */

interface SavedState {
  checked: string[];
  notes: Record<string, string>;
}

function loadState(): SavedState {
  if (typeof window === "undefined") return { checked: [], notes: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { checked: [], notes: {} };
    const parsed = JSON.parse(raw) as SavedState;
    return {
      checked: Array.isArray(parsed.checked) ? parsed.checked : [],
      notes: parsed.notes && typeof parsed.notes === "object" ? parsed.notes : {},
    };
  } catch {
    return { checked: [], notes: {} };
  }
}

function saveState(checked: Set<string>, notes: Record<string, string>) {
  try {
    const data: SavedState = { checked: [...checked], notes };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* storage full or unavailable — fail silently */
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function WebsiteLaunchChecklistPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [hydrated, setHydrated] = useState(false);
  const [expandedNotes, setExpandedNotes] = useState<Set<string>>(new Set());

  /* Load from localStorage after mount */
  useEffect(() => {
    const saved = loadState();
    setChecked(new Set(saved.checked));
    setNotes(saved.notes);
    setHydrated(true);
  }, []);

  /* Save on every change (after hydration) */
  useEffect(() => {
    if (!hydrated) return;
    saveState(checked, notes);
  }, [checked, notes, hydrated]);

  /* ---- Handlers ---- */

  const toggleItem = useCallback((id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const updateNote = useCallback((id: string, value: string) => {
    setNotes((prev) => {
      if (!value && !prev[id]) return prev;
      const next = { ...prev };
      if (value) next[id] = value;
      else delete next[id];
      return next;
    });
  }, []);

  const toggleNoteField = useCallback((id: string) => {
    setExpandedNotes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    setChecked(new Set());
    setNotes({});
    setExpandedNotes(new Set());
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* fail silently */
    }
  }, []);

  /* ---- Computed values ---- */

  const checkedCount = checked.size;
  const overallPct = TOTAL_ITEMS > 0 ? Math.round((checkedCount / TOTAL_ITEMS) * 100) : 0;

  const criticalPassed = useMemo(
    () => CRITICAL_ITEMS.filter((item) => checked.has(item.id)),
    [checked],
  );
  const criticalBlocked = useMemo(
    () => CRITICAL_ITEMS.filter((item) => !checked.has(item.id)),
    [checked],
  );
  const isGoReady = criticalBlocked.length === 0 && checkedCount > 0;

  const categoryScores = useMemo(() => {
    return categories.map((cat) => {
      const catChecked = cat.items.filter((item) => checked.has(item.id)).length;
      const catTotal = cat.items.length;
      return {
        title: cat.title,
        checked: catChecked,
        total: catTotal,
        pct: Math.round((catChecked / catTotal) * 100),
      };
    });
  }, [checked]);

  /* ---- Export as .txt ---- */

  const handleExport = useCallback(() => {
    const lines: string[] = [];
    lines.push("WEBSITE LAUNCH CHECKLIST");
    lines.push(`Generated: ${new Date().toLocaleDateString()}`);
    lines.push(`Overall: ${checkedCount}/${TOTAL_ITEMS} (${overallPct}%)`);
    lines.push(`Status: ${isGoReady ? "GO — All critical items passed" : "NO-GO — Critical items incomplete"}`);
    lines.push("");

    for (const cat of categories) {
      const score = categoryScores.find((cs) => cs.title === cat.title);
      lines.push(`--- ${cat.title.toUpperCase()} (${score?.checked}/${score?.total}) ---`);
      for (const item of cat.items) {
        const mark = checked.has(item.id) ? "[x]" : "[ ]";
        lines.push(`${mark} [${item.priority}] ${item.text}`);
        if (notes[item.id]) {
          lines.push(`    Note: ${notes[item.id]}`);
        }
      }
      lines.push("");
    }

    if (criticalBlocked.length > 0) {
      lines.push("--- BLOCKERS (Critical items not yet completed) ---");
      for (const item of criticalBlocked) {
        lines.push(`  - ${item.text}`);
      }
      lines.push("");
    }

    lines.push("---");
    lines.push("Generated by Markit Media — themarkitmedia.com/resources/website-launch-checklist");

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "website-launch-checklist.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [checked, notes, checkedCount, overallPct, isGoReady, categoryScores, criticalBlocked]);

  /* ---- Priority styling helper ---- */

  function priorityStyle(p: Priority): string {
    switch (p) {
      case "Critical":
        return "bg-black text-white";
      case "Important":
        return "bg-neutral-200 text-black";
      case "Nice to Have":
        return "bg-neutral-100 text-neutral-600";
    }
  }

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <article className="min-h-screen">
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/website-grader" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Website Grader</Link>
                <Link href="/resources/website-audit" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Website Audit</Link>
                <Link href="/resources/speed-test" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Speed Test</Link>
                <Link href="/resources/landing-page-grader" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Landing Page Grader</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Website Launch Checklist",
          description:
            "A 50-item interactive checklist covering content, SEO, performance, security, design, analytics, legal, and launch-day tasks for launching a website.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Website Launch Checklist" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Website Launch Checklist
            </h1>
            <SectionDesc>
              50 items across 8 categories to make sure nothing slips through
              the cracks before your website goes live. Check off each item,
              add notes, and track your readiness in real time. Your progress
              is saved automatically.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Sticky overall progress + go/no-go */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-6">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="sticky top-20 z-10 bg-white py-4 border-b border-neutral-200">
              {/* Top row: counts + percentage */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-bold text-black">
                  {checkedCount}/{TOTAL_ITEMS} items completed
                </span>
                <span className="text-base font-bold text-black">
                  {overallPct}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-neutral-100 overflow-hidden">
                <div
                  className="h-full bg-black transition-all duration-300 motion-reduce:transition-none"
                  style={{ width: `${overallPct}%` }}
                />
              </div>

              {/* Go / No-Go indicator */}
              <div className="flex items-center justify-between mt-2">
                <p className="text-base text-neutral-500">
                  Critical: {criticalPassed.length}/{CRITICAL_ITEMS.length} passed
                </p>
                {checkedCount > 0 && (
                  <span
                    className={`text-base font-bold px-3 py-1 ${
                      isGoReady
                        ? "bg-black text-white"
                        : "bg-neutral-200 text-black"
                    }`}
                  >
                    {isGoReady ? "GO" : "NO-GO"}
                  </span>
                )}
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* Action bar: Export + Reset */}
      {hydrated && checkedCount > 0 && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-6">
          <div className="max-w-3xl mx-auto flex flex-wrap gap-3">
            <button
              onClick={handleExport}
              className="text-base font-bold text-black px-5 py-3 border border-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Export as .txt
            </button>
            <button
              onClick={handleReset}
              className="text-base font-bold text-neutral-500 px-5 py-3 border border-neutral-300 hover:border-black hover:text-black transition-colors motion-reduce:transition-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Reset All
            </button>
          </div>
        </section>
      )}

      {/* Category checklists */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto space-y-12">
          {categories.map((cat, catIndex) => {
            const score = categoryScores[catIndex];
            return (
              <Animate key={cat.title} animation="fade-up">
                <div>
                  {/* Category header + progress */}
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                      {cat.title}
                    </h2>
                    <span className="text-base text-neutral-500 font-bold">
                      {score.checked}/{score.total}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 overflow-hidden mb-4">
                    <div
                      className="h-full bg-black transition-all duration-300 motion-reduce:transition-none"
                      style={{ width: `${score.pct}%` }}
                    />
                  </div>

                  {/* Items */}
                  <div className="space-y-0 border border-neutral-200">
                    {cat.items.map((item) => (
                      <div
                        key={item.id}
                        className="border-b border-neutral-100 last:border-b-0"
                      >
                        <div className="flex items-start gap-3 p-4">
                          {/* Checkbox */}
                          <label className="flex items-start gap-3 flex-1 cursor-pointer min-h-[44px]">
                            <input
                              type="checkbox"
                              checked={checked.has(item.id)}
                              onChange={() => toggleItem(item.id)}
                              className="mt-1 w-5 h-5 flex-shrink-0 accent-black cursor-pointer focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                              aria-label={item.text}
                            />
                            <span
                              className={`text-base leading-relaxed ${
                                checked.has(item.id)
                                  ? "text-neutral-400 line-through"
                                  : "text-black"
                              }`}
                            >
                              {item.text}
                            </span>
                          </label>

                          {/* Priority badge */}
                          <span
                            className={`text-base font-bold px-2 py-0.5 flex-shrink-0 whitespace-nowrap ${priorityStyle(
                              item.priority,
                            )}`}
                          >
                            {item.priority}
                          </span>

                          {/* Notes toggle */}
                          <button
                            onClick={() => toggleNoteField(item.id)}
                            className="text-base text-neutral-400 hover:text-black transition-colors motion-reduce:transition-none px-2 py-1 flex-shrink-0 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                            aria-label={`${expandedNotes.has(item.id) ? "Hide" : "Add"} note for "${item.text}"`}
                          >
                            {expandedNotes.has(item.id) ? "−" : "+"}
                          </button>
                        </div>

                        {/* Note field */}
                        {expandedNotes.has(item.id) && (
                          <div className="px-4 pb-4 pl-12">
                            <label className="block">
                              <span className="sr-only">
                                Note for {item.text}
                              </span>
                              <input
                                type="text"
                                value={notes[item.id] || ""}
                                onChange={(e) =>
                                  updateNote(item.id, e.target.value)
                                }
                                placeholder="Add a note..."
                                className="w-full text-base border border-neutral-300 px-3 py-2 text-black placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Animate>
            );
          })}
        </div>
      </section>

      {/* Critical items blocker list */}
      {hydrated && criticalBlocked.length > 0 && checkedCount > 0 && (
        <section aria-label="Blockers" className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <div className="border-l-4 border-black pl-6">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-2">
                  Blockers
                </h2>
                <p className="text-base text-neutral-500 mb-4">
                  These critical items must be completed before launch. All{" "}
                  {CRITICAL_ITEMS.length} critical items need to pass for a GO
                  status.
                </p>
                <ul className="space-y-2">
                  {criticalBlocked.map((item) => {
                    const cat = categories.find((c) =>
                      c.items.some((i) => i.id === item.id),
                    );
                    return (
                      <li
                        key={item.id}
                        className="flex items-start gap-3 text-base text-black"
                      >
                        <span className="text-neutral-400 flex-shrink-0 mt-0.5">
                          &mdash;
                        </span>
                        <span>
                          {item.text}
                          {cat && (
                            <span className="text-neutral-400 ml-2">
                              ({cat.title})
                            </span>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* GO confirmation */}
      {hydrated && isGoReady && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <div className="bg-black text-white p-8 text-center">
                <p className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold tracking-tight">
                  All Critical Items Passed
                </p>
                <p className="text-base text-neutral-400 mt-2">
                  Your website is ready to launch. {overallPct}% of all items
                  are complete.
                </p>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* Educational section */}
      <section aria-label="Website Launch Best Practices" className="px-6 lg:px-12 py-16 bg-neutral-50">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black tracking-tight mb-6">
              Website Launch Best Practices
            </h2>
          </Animate>

          <Animate animation="fade-up">
            <div className="space-y-8">
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                  Start early, not the day before
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Begin working through this checklist at least two weeks
                  before your target launch date. Some items, like DNS
                  propagation and search engine indexing, take time that cannot
                  be compressed. Front-loading the content and SEO categories
                  gives you a buffer for unexpected issues.
                </p>
              </div>

              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                  Focus on critical items first
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Not every checklist item carries equal weight. Critical items
                  are launch blockers: launching without SSL, broken forms, or
                  missing analytics means you are flying blind or actively
                  losing trust. Work through every Critical item before moving
                  to Important and Nice to Have tasks.
                </p>
              </div>

              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                  Test on real devices, not just emulators
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Browser developer tools simulate mobile layouts, but they
                  cannot replicate touch behavior, real network conditions, or
                  the experience of reading your site on a 5-inch screen.
                  Test on at least one iOS device and one Android device
                  before launch.
                </p>
              </div>

              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                  Set up monitoring before you announce
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Configure uptime monitoring, error alerting, and analytics
                  before you share the launch on social media or send the
                  announcement email. If something breaks during a traffic
                  spike, you need to know immediately rather than hearing about
                  it from customers.
                </p>
              </div>

              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                  Keep a rollback plan ready
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Even with thorough preparation, things can go wrong. Make
                  sure you have a working backup of the previous site, know
                  how to revert DNS changes, and have documented the steps
                  to roll back. A 10-minute rollback is far better than hours
                  of downtime while you debug a production issue.
                </p>
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
              Need Help Launching Your Website?
            </h2>
            <p className="text-lg text-neutral-400 mt-4 mb-8">
              Our team handles every item on this checklist so you can focus on
              your business. From design and development to SEO and analytics,
              we launch websites that perform from day one.
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
        toolName="Website Launch Checklist"
        services={[
          { title: "Website Development", desc: "Fast, accessible websites built for conversion and growth.", href: "/services/website-development" },
          { title: "SEO", desc: "Technical SEO baked in from day one for maximum visibility.", href: "/services/seo" },
          { title: "Digital Marketing", desc: "Drive the right traffic to your optimized digital experience.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
          { title: "Website Audit", href: "/resources/website-audit" },
          { title: "Website Grader", href: "/resources/website-grader" },
          { title: "Website Heuristic Evaluator", href: "/resources/website-heuristic-evaluator" },
          { title: "Website Readiness Scorecard", href: "/resources/website-readiness-scorecard" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
