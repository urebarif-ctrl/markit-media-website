"use client";

import { useState, useEffect, useCallback, useId, useRef } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

const TEMPLATES = [
  "Executive Summary",
  "Board Deck",
  "Team Status",
  "Client Report",
] as const;

type TemplateName = (typeof TEMPLATES)[number];

const SECTION_KEYS = [
  "overview",
  "budgetVsSpend",
  "channelPerformance",
  "campaignResults",
  "nextPeriodGoals",
  "risksBlockers",
] as const;

type SectionKey = (typeof SECTION_KEYS)[number];

const SECTION_LABELS: Record<SectionKey, string> = {
  overview: "Overview",
  budgetVsSpend: "Budget vs Spend",
  channelPerformance: "Channel Performance",
  campaignResults: "Campaign Results",
  nextPeriodGoals: "Next Period Goals",
  risksBlockers: "Risks & Blockers",
};

const TEMPLATE_DEFAULTS: Record<TemplateName, SectionKey[]> = {
  "Executive Summary": [
    "overview",
    "budgetVsSpend",
    "channelPerformance",
    "campaignResults",
  ],
  "Board Deck": [
    "overview",
    "budgetVsSpend",
    "channelPerformance",
    "risksBlockers",
  ],
  "Team Status": [
    "overview",
    "campaignResults",
    "nextPeriodGoals",
    "risksBlockers",
  ],
  "Client Report": [
    "overview",
    "budgetVsSpend",
    "channelPerformance",
    "campaignResults",
    "nextPeriodGoals",
    "risksBlockers",
  ],
};

interface KpiCard {
  id: string;
  label: string;
  value: string;
  note: string;
}

interface SectionData {
  key: SectionKey;
  content: string;
}

interface ReportState {
  template: TemplateName;
  title: string;
  preparedBy: string;
  preparedFor: string;
  periodStart: string;
  periodEnd: string;
  sections: SectionData[];
  kpis: KpiCard[];
}

const STORAGE_KEY = "markit-stakeholder-report";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

function emptyKpi(): KpiCard {
  return { id: uid(), label: "", value: "", note: "" };
}

function defaultState(template: TemplateName = "Executive Summary"): ReportState {
  return {
    template,
    title: "",
    preparedBy: "",
    preparedFor: "",
    periodStart: "",
    periodEnd: "",
    sections: TEMPLATE_DEFAULTS[template].map((key) => ({
      key,
      content: "",
    })),
    kpis: [emptyKpi(), emptyKpi(), emptyKpi()],
  };
}

/** Build an executive summary paragraph from whatever data is present. */
function buildExecSummary(report: ReportState): string {
  const parts: string[] = [];

  const filledSections = report.sections.filter((s) => s.content.trim());
  const filledKpis = report.kpis.filter((k) => k.label.trim() && k.value.trim());

  if (report.periodStart && report.periodEnd) {
    parts.push(
      `This ${report.template.toLowerCase()} covers the period from ${report.periodStart} to ${report.periodEnd}.`,
    );
  }

  if (report.preparedFor) {
    parts.push(`Report prepared for ${report.preparedFor}.`);
  }

  if (filledSections.length > 0) {
    const sectionNames = filledSections
      .map((s) => SECTION_LABELS[s.key])
      .join(", ");
    parts.push(
      `The report includes ${filledSections.length} section${filledSections.length > 1 ? "s" : ""}: ${sectionNames}.`,
    );
  }

  if (filledKpis.length > 0) {
    const highlights = filledKpis
      .slice(0, 3)
      .map((k) => `${k.label}: ${k.value}`)
      .join("; ");
    parts.push(`Key highlights include ${highlights}.`);
  }

  const overviewSection = report.sections.find(
    (s) => s.key === "overview" && s.content.trim(),
  );
  if (overviewSection) {
    const firstSentence = overviewSection.content.split(/[.!?]/)[0]?.trim();
    if (firstSentence && firstSentence.length > 10) {
      parts.push(firstSentence + ".");
    }
  }

  if (parts.length === 0) {
    return "Fill in sections and KPIs above to auto-generate an executive summary.";
  }

  return parts.join(" ");
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function StakeholderReportPage() {
  const formId = useId();
  const [report, setReport] = useState<ReportState>(() => defaultState());
  const [preview, setPreview] = useState(false);
  const [saved, setSaved] = useState(false);
  const dragItem = useRef<number | null>(null);
  const dragOver = useRef<number | null>(null);

  /* Load from localStorage on mount */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setReport(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  /* ---- updaters ---- */

  const set = useCallback(
    <K extends keyof ReportState>(key: K, value: ReportState[K]) =>
      setReport((prev) => ({ ...prev, [key]: value })),
    [],
  );

  const applyTemplate = useCallback((template: TemplateName) => {
    setReport((prev) => ({
      ...prev,
      template,
      sections: TEMPLATE_DEFAULTS[template].map((key) => {
        const existing = prev.sections.find((s) => s.key === key);
        return existing ?? { key, content: "" };
      }),
    }));
  }, []);

  const updateSectionContent = useCallback(
    (idx: number, content: string) => {
      setReport((prev) => {
        const sections = [...prev.sections];
        sections[idx] = { ...sections[idx], content };
        return { ...prev, sections };
      });
    },
    [],
  );

  const addSection = useCallback(() => {
    setReport((prev) => {
      const used = new Set(prev.sections.map((s) => s.key));
      const next = SECTION_KEYS.find((k) => !used.has(k));
      if (!next) return prev;
      return {
        ...prev,
        sections: [...prev.sections, { key: next, content: "" }],
      };
    });
  }, []);

  const removeSection = useCallback((idx: number) => {
    setReport((prev) => {
      if (prev.sections.length <= 1) return prev;
      return {
        ...prev,
        sections: prev.sections.filter((_, i) => i !== idx),
      };
    });
  }, []);

  const changeSectionType = useCallback(
    (idx: number, newKey: SectionKey) => {
      setReport((prev) => {
        const sections = [...prev.sections];
        sections[idx] = { ...sections[idx], key: newKey };
        return { ...prev, sections };
      });
    },
    [],
  );

  /* ---- drag to reorder ---- */

  const handleDragStart = useCallback((idx: number) => {
    dragItem.current = idx;
  }, []);

  const handleDragEnter = useCallback((idx: number) => {
    dragOver.current = idx;
  }, []);

  const handleDragEnd = useCallback(() => {
    if (dragItem.current === null || dragOver.current === null) return;
    if (dragItem.current === dragOver.current) {
      dragItem.current = null;
      dragOver.current = null;
      return;
    }
    setReport((prev) => {
      const sections = [...prev.sections];
      const dragged = sections.splice(dragItem.current!, 1)[0];
      sections.splice(dragOver.current!, 0, dragged);
      return { ...prev, sections };
    });
    dragItem.current = null;
    dragOver.current = null;
  }, []);

  /* ---- KPI updaters ---- */

  const updateKpi = useCallback(
    (id: string, field: keyof KpiCard, value: string) => {
      setReport((prev) => ({
        ...prev,
        kpis: prev.kpis.map((k) =>
          k.id === id ? { ...k, [field]: value } : k,
        ),
      }));
    },
    [],
  );

  const addKpi = useCallback(() => {
    setReport((prev) => {
      if (prev.kpis.length >= 6) return prev;
      return { ...prev, kpis: [...prev.kpis, emptyKpi()] };
    });
  }, []);

  const removeKpi = useCallback((id: string) => {
    setReport((prev) => {
      const list = prev.kpis.filter((k) => k.id !== id);
      return { ...prev, kpis: list.length ? list : [emptyKpi()] };
    });
  }, []);

  /* ---- derived ---- */

  const execSummary = buildExecSummary(report);

  /* ---- save / export ---- */

  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(report));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      /* quota exceeded */
    }
  };

  const handleExport = () => {
    const lines: string[] = [];
    const ln = (s = "") => lines.push(s);
    const hr = () => ln("=".repeat(60));

    hr();
    ln(report.title || "Marketing Stakeholder Report");
    hr();
    ln(`Template: ${report.template}`);
    ln(`Prepared for: ${report.preparedFor || "-"}`);
    ln(`Prepared by: ${report.preparedBy || "-"}`);
    ln(
      `Period: ${report.periodStart || "?"} to ${report.periodEnd || "?"}`,
    );
    ln();

    ln("EXECUTIVE SUMMARY");
    ln("-".repeat(40));
    ln(execSummary);
    ln();

    const filledKpis = report.kpis.filter(
      (k) => k.label.trim() && k.value.trim(),
    );
    if (filledKpis.length > 0) {
      ln("KEY METRICS");
      ln("-".repeat(40));
      filledKpis.forEach((k) => {
        ln(`  ${k.label}: ${k.value}${k.note ? ` (${k.note})` : ""}`);
      });
      ln();
    }

    report.sections.forEach((section) => {
      ln(SECTION_LABELS[section.key].toUpperCase());
      ln("-".repeat(40));
      ln(section.content.trim() || "(no content entered)");
      ln();
    });

    hr();
    ln(
      "Generated with Marketing Stakeholder Report Generator | Markit Media",
    );
    hr();

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(report.title || "stakeholder-report").replace(/\s+/g, "-").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ---- style constants ---- */

  const inputCls =
    "w-full border border-neutral-300 bg-white text-black px-4 py-3 text-base min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 motion-reduce:transition-none";
  const selectCls =
    "w-full border border-neutral-300 bg-white text-black px-4 py-3 text-base min-h-[44px] appearance-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 motion-reduce:transition-none";
  const textareaCls =
    "w-full border border-neutral-300 bg-white text-black px-4 py-3 text-base min-h-[120px] resize-y focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 motion-reduce:transition-none";
  const btnPrimary =
    "bg-black text-white px-8 py-4 font-bold text-base min-h-[44px] hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:bg-neutral-300 disabled:cursor-not-allowed";
  const btnSecondary =
    "border border-black text-black bg-white px-8 py-4 font-bold text-base min-h-[44px] hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";
  const btnDanger =
    "border border-neutral-300 text-neutral-600 bg-white px-3 py-2 text-base min-h-[44px] hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";

  /* ================================================================ */
  /*  Preview Mode                                                     */
  /* ================================================================ */

  if (preview) {
    const filledKpis = report.kpis.filter(
      (k) => k.label.trim() && k.value.trim(),
    );

    return (
      <article className="min-h-screen bg-white">
        <Breadcrumb
          items={[
            { label: "Resources", href: "/resources" },
            {
              label: "Stakeholder Report Generator",
              href: "/resources/stakeholder-report",
            },
            { label: "Preview" },
          ]}
        />

        {/* Print-ready styling */}
        <style>{`
          @media print {
            nav, .no-print { display: none !important; }
            article { padding: 0 !important; }
            section { break-inside: avoid; }
          }
        `}</style>

        <section aria-label="Content section" className="px-6 lg:px-12 pt-16 pb-12">
          <div className="max-w-4xl mx-auto">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Marketing Stakeholder Report Generator",
            description: "Build executive, board, team, and client reports with drag-to-reorder sections and KPI highlights",
            url: "https://themarkitmedia.com/en/resources/stakeholder-report",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            provider: {
              "@type": "Organization",
              name: "Markit Media",
              url: "https://themarkitmedia.com",
            },
          }),
        }}
      />
            <div className="flex items-center justify-between flex-wrap gap-4 mb-10 no-print">
              <button
                type="button"
                onClick={() => setPreview(false)}
                className={btnSecondary}
              >
                &larr; Back to Editor
              </button>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className={btnSecondary}
                >
                  Print
                </button>
                <button
                  type="button"
                  onClick={handleExport}
                  className={btnPrimary}
                >
                  Export as .txt
                </button>
              </div>
            </div>

            {/* Header */}
            <div className="border-b-2 border-black pb-6 mb-8">
              <div className="text-base font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">
                {report.template}
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold text-black tracking-tight leading-[1.1]">
                {report.title || "Marketing Stakeholder Report"}
              </h2>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-base text-neutral-600">
                {report.preparedFor && (
                  <span>
                    <strong>For:</strong> {report.preparedFor}
                  </span>
                )}
                <span>
                  <strong>Period:</strong> {report.periodStart || "?"}{" "}
                  &mdash; {report.periodEnd || "?"}
                </span>
                {report.preparedBy && (
                  <span>
                    <strong>By:</strong> {report.preparedBy}
                  </span>
                )}
              </div>
            </div>

            {/* Executive Summary */}
            <div className="mb-10">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                Executive Summary
              </h2>
              <p className="text-base text-neutral-700 leading-relaxed">
                {execSummary}
              </p>
            </div>

            {/* KPI Cards */}
            {filledKpis.length > 0 && (
              <div className="mb-10">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                  Key Metrics
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filledKpis.map((kpi) => (
                    <div
                      key={kpi.id}
                      className="bg-neutral-50 border border-neutral-200 p-4"
                    >
                      <div className="text-base text-neutral-500 mb-1">
                        {kpi.label}
                      </div>
                      <div className="text-lg font-bold text-black">
                        {kpi.value}
                      </div>
                      {kpi.note && (
                        <div className="text-base text-neutral-500 mt-1">
                          {kpi.note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sections */}
            {report.sections.map((section) => (
              <div key={section.key} className="mb-10">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                  {SECTION_LABELS[section.key]}
                </h2>
                <div className="text-base text-neutral-700 leading-relaxed whitespace-pre-wrap">
                  {section.content.trim() || (
                    <span className="text-neutral-400">
                      (no content entered)
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Footer */}
            <div className="border-t border-neutral-200 pt-6 mt-12 text-base text-neutral-500">
              Generated with Marketing Stakeholder Report Generator &mdash;
              Markit Media
            </div>
          </div>
        </section>

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Marketing Stakeholder Report Generator",
            description:
              "Generate professional marketing reports tailored to different stakeholders. Choose templates, configure sections, and export print-ready reports.",
            applicationCategory: "MarketingApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }}
        />
      </article>
    );
  }

  /* ================================================================ */
  /*  Editor Mode                                                      */
  /* ================================================================ */

  const usedSections = new Set(report.sections.map((s) => s.key));
  const availableSections = SECTION_KEYS.filter((k) => !usedSections.has(k));

  return (
    <article className="min-h-screen">
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Stakeholder Report Generator" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Interactive Tools" className="px-6 lg:px-12 pt-16 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Interactive Tools</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing Stakeholder Report Generator
            </h1>
            <SectionDesc>
              Build professional marketing reports tailored to any audience.
              Select a template, configure sections, enter your data, and
              export a polished report ready for stakeholders.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Template Selection */}
      <section aria-label="1. Choose a Template" className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up" delay={100}>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              1. Choose a Template
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TEMPLATES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => applyTemplate(t)}
                  className={`text-left border p-6 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                    report.template === t
                      ? "border-black bg-black text-white"
                      : "border-neutral-300 bg-white text-black hover:bg-neutral-50"
                  }`}
                >
                  <div className="text-base font-bold mb-2">{t}</div>
                  <div
                    className={`text-base leading-relaxed ${
                      report.template === t
                        ? "text-neutral-300"
                        : "text-neutral-500"
                    }`}
                  >
                    {t === "Executive Summary" &&
                      "High-level performance overview for C-suite. Focuses on budget, channels, and results."}
                    {t === "Board Deck" &&
                      "Strategic view for board members. Budget allocation, channel mix, and risk factors."}
                    {t === "Team Status" &&
                      "Internal update for marketing teams. Campaign progress, goals, and blockers."}
                    {t === "Client Report" &&
                      "Comprehensive report covering all sections. Full transparency for client stakeholders."}
                  </div>
                </button>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* Report Setup */}
      <section aria-label="2. Report Details" className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up" delay={100}>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              2. Report Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor={`${formId}-title`}
                  className="block text-base font-bold text-black mb-2"
                >
                  Report Title
                </label>
                <input
                  id={`${formId}-title`}
                  type="text"
                  value={report.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="e.g. Q3 Marketing Performance Report"
                  className={inputCls}
                />
              </div>
              <div>
                <label
                  htmlFor={`${formId}-for`}
                  className="block text-base font-bold text-black mb-2"
                >
                  Prepared For
                </label>
                <input
                  id={`${formId}-for`}
                  type="text"
                  value={report.preparedFor}
                  onChange={(e) => set("preparedFor", e.target.value)}
                  placeholder="e.g. Board of Directors"
                  className={inputCls}
                />
              </div>
              <div>
                <label
                  htmlFor={`${formId}-by`}
                  className="block text-base font-bold text-black mb-2"
                >
                  Prepared By
                </label>
                <input
                  id={`${formId}-by`}
                  type="text"
                  value={report.preparedBy}
                  onChange={(e) => set("preparedBy", e.target.value)}
                  placeholder="e.g. Marketing Team"
                  className={inputCls}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`${formId}-start`}
                    className="block text-base font-bold text-black mb-2"
                  >
                    Period Start
                  </label>
                  <input
                    id={`${formId}-start`}
                    type="date"
                    value={report.periodStart}
                    onChange={(e) => set("periodStart", e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`${formId}-end`}
                    className="block text-base font-bold text-black mb-2"
                  >
                    Period End
                  </label>
                  <input
                    id={`${formId}-end`}
                    type="date"
                    value={report.periodEnd}
                    onChange={(e) => set("periodEnd", e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* KPI Highlight Cards */}
      <section aria-label="3. Key Metrics (/6)" className="px-6 lg:px-12 py-8 bg-neutral-50">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                3. Key Metrics ({report.kpis.length}/6)
              </h2>
              <button
                type="button"
                onClick={addKpi}
                disabled={report.kpis.length >= 6}
                className={btnPrimary}
              >
                + Add Metric
              </button>
            </div>
            <p className="text-base text-neutral-600 mb-6">
              Highlight up to 6 key performance indicators that matter most to
              your stakeholders.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {report.kpis.map((kpi, idx) => (
                <div
                  key={kpi.id}
                  className="bg-white border border-neutral-200 p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base font-bold text-black">
                      Metric {idx + 1}
                    </span>
                    {report.kpis.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeKpi(kpi.id)}
                        className={btnDanger}
                        aria-label={`Remove metric ${idx + 1}`}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label
                        htmlFor={`${formId}-kpi-label-${kpi.id}`}
                        className="block text-base font-bold text-black mb-1"
                      >
                        Label
                      </label>
                      <input
                        id={`${formId}-kpi-label-${kpi.id}`}
                        type="text"
                        value={kpi.label}
                        onChange={(e) =>
                          updateKpi(kpi.id, "label", e.target.value)
                        }
                        placeholder="e.g. Revenue Growth"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`${formId}-kpi-value-${kpi.id}`}
                        className="block text-base font-bold text-black mb-1"
                      >
                        Value
                      </label>
                      <input
                        id={`${formId}-kpi-value-${kpi.id}`}
                        type="text"
                        value={kpi.value}
                        onChange={(e) =>
                          updateKpi(kpi.id, "value", e.target.value)
                        }
                        placeholder="e.g. +32%"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`${formId}-kpi-note-${kpi.id}`}
                        className="block text-base font-bold text-black mb-1"
                      >
                        Note (optional)
                      </label>
                      <input
                        id={`${formId}-kpi-note-${kpi.id}`}
                        type="text"
                        value={kpi.note}
                        onChange={(e) =>
                          updateKpi(kpi.id, "note", e.target.value)
                        }
                        placeholder="e.g. vs. prior quarter"
                        className={inputCls}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* Configurable Sections */}
      <section aria-label="4. Report Sections" className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
              4. Report Sections
            </h2>
            <button
              type="button"
              onClick={addSection}
              disabled={availableSections.length === 0}
              className={btnPrimary}
            >
              + Add Section
            </button>
          </div>
          <p className="text-base text-neutral-600 mb-6">
            Drag sections to reorder. Each section maps to a block in your
            final report.
          </p>

          <div className="space-y-6">
            {report.sections.map((section, idx) => (
              <Animate key={section.key + idx} animation="fade-up">
                <div
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragEnter={() => handleDragEnter(idx)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  className="border border-neutral-200 bg-white p-6 cursor-grab active:cursor-grabbing"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-4 flex-1 min-w-[200px]">
                      {/* Drag handle */}
                      <span
                        className="text-neutral-400 text-lg select-none"
                        aria-hidden="true"
                      >
                        &#x2630;
                      </span>
                      <div className="flex-1">
                        <label
                          htmlFor={`${formId}-sec-type-${idx}`}
                          className="block text-base font-bold text-black mb-2"
                        >
                          Section Type
                        </label>
                        <select
                          id={`${formId}-sec-type-${idx}`}
                          value={section.key}
                          onChange={(e) =>
                            changeSectionType(
                              idx,
                              e.target.value as SectionKey,
                            )
                          }
                          className={selectCls}
                        >
                          <option value={section.key}>
                            {SECTION_LABELS[section.key]}
                          </option>
                          {availableSections.map((k) => (
                            <option key={k} value={k}>
                              {SECTION_LABELS[k]}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {report.sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSection(idx)}
                        className={btnDanger}
                        aria-label={`Remove ${SECTION_LABELS[section.key]} section`}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`${formId}-sec-content-${idx}`}
                      className="block text-base font-bold text-black mb-2"
                    >
                      {SECTION_LABELS[section.key]} Content
                    </label>
                    <textarea
                      id={`${formId}-sec-content-${idx}`}
                      value={section.content}
                      onChange={(e) =>
                        updateSectionContent(idx, e.target.value)
                      }
                      placeholder={`Enter ${SECTION_LABELS[section.key].toLowerCase()} details...`}
                      className={textareaCls}
                      rows={5}
                    />
                  </div>

                  {/* Inline preview */}
                  {section.content.trim() && (
                    <div className="mt-4 border-t border-neutral-200 pt-4">
                      <div className="text-base font-bold text-neutral-500 mb-2">
                        Preview
                      </div>
                      <div className="text-base text-neutral-700 leading-relaxed whitespace-pre-wrap bg-neutral-50 p-4 border border-neutral-100">
                        {section.content}
                      </div>
                    </div>
                  )}
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Auto-generated Executive Summary */}
      <section aria-label="Executive Summary (Auto-Generated)" className="px-6 lg:px-12 py-8 bg-neutral-50">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
              Executive Summary (Auto-Generated)
            </h2>
            <div className="border border-neutral-200 bg-white p-6">
              <p className="text-base text-neutral-700 leading-relaxed">
                {execSummary}
              </p>
            </div>
          </Animate>
        </div>
      </section>

      {/* Actions */}
      <section aria-label="Content section" className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-4 items-center">
            <button
              type="button"
              onClick={() => setPreview(true)}
              className={btnPrimary}
            >
              Preview Report
            </button>
            <button
              type="button"
              onClick={handleSave}
              className={btnSecondary}
            >
              {saved ? "Saved!" : "Save to Browser"}
            </button>
            <button
              type="button"
              onClick={handleExport}
              className={btnSecondary}
            >
              Export as .txt
            </button>
            <button
              type="button"
              onClick={() => {
                if (
                  window.confirm(
                    "Reset the entire report? This cannot be undone.",
                  )
                ) {
                  setReport(defaultState());
                  localStorage.removeItem(STORAGE_KEY);
                }
              }}
              className={btnDanger}
            >
              Reset All
            </button>
          </div>
        </div>
      </section>

      {/* Educational Section */}
      <section aria-label="Stakeholder Reporting Best Practices" className="px-6 lg:px-12 py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              Stakeholder Reporting Best Practices
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-black text-base mb-2">
                  Tailor the report to the audience
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Executives need a one-page summary with financials and
                  strategic takeaways. Teams need campaign-level detail and
                  action items. Clients want proof of value and clear next
                  steps. One template does not fit all stakeholders, so
                  choose the format that matches who will read it.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black text-base mb-2">
                  Lead with the metrics that matter
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Limit your KPI section to the six indicators most relevant
                  to the reader. Board members care about revenue and market
                  share. Campaign managers care about conversion rates and
                  cost per acquisition. Curate the numbers so every metric
                  earns its place.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black text-base mb-2">
                  Always include context and comparison
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  A standalone number is meaningless. Compare against
                  targets, prior periods, or industry benchmarks in the
                  notes field of each KPI. Stakeholders need to understand
                  whether a result is good, bad, or on track, not just what
                  the number is.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black text-base mb-2">
                  Structure sections for easy scanning
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Use clear headings and keep each section focused on a
                  single topic. Decision-makers often skim rather than read,
                  so the report should make its key points visible at a
                  glance. Drag sections into an order that tells a logical
                  story.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black text-base mb-2">
                  Surface risks and blockers early
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Never bury problems at the end of a report. Stakeholders
                  appreciate transparency. A dedicated risks section shows
                  you have identified potential issues and are managing them
                  proactively, which builds trust over time.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black text-base mb-2">
                  Close with clear next-period goals
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Every report should point forward. Outline specific,
                  measurable goals for the coming period so stakeholders
                  know what to expect. This turns a backward-looking report
                  into a forward-looking plan and ensures alignment before
                  the next cycle.
                </p>
              </div>
            </div>
          </Animate>
        </div>
      </section>
      {/* Related Tools */}
      <section aria-label="Related Tools" className="px-6 lg:px-12 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/kpi-dashboard" className="border border-gray-200 bg-white px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors">KPI Dashboard</Link>
                <Link href="/resources/marketing-roi-report" className="border border-gray-200 bg-white px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors">Marketing ROI Report</Link>
                <Link href="/resources/client-reporting-dashboard" className="border border-gray-200 bg-white px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors">Client Reporting Dashboard</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Need help building stakeholder reports that drive action?" className="px-6 lg:px-12 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-4">
              Need help building stakeholder reports that drive action?
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              Our team creates custom reporting frameworks, automated
              dashboards, and strategic presentations that keep every
              stakeholder informed and aligned. Let us handle the reporting
              so you can focus on execution.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-neutral-800 transition-colors motion-reduce:transition-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Get in Touch &rarr;
            </Link>
          </Animate>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Stakeholder Report Generator",
          description:
            "Generate professional marketing reports tailored to different stakeholders. Choose templates, configure sections, and export print-ready reports.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        }}
      />
    
      <ToolCTA
        toolName="Stakeholder Report"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Sprint Planner", href: "/resources/sprint-planner" },
          { title: "Startup Marketing Guide", href: "/resources/startup-marketing-guide" },
          { title: "Team Capacity Planner", href: "/resources/team-capacity-planner" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
