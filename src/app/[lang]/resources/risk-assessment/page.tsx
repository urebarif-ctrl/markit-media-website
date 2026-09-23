"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { ToolCTA } from "@/components/tool-cta";
import { JsonLd } from "@/components/json-ld";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Category = "Brand" | "Regulatory" | "Budget" | "Technology" | "Market" | "Team" | "Channel";

interface MarketingRisk {
  id: string;
  name: string;
  description: string;
  category: Category;
  likelihood: number;
  impact: number;
  score: number;
  mitigation: string;
}

type SortField = "score" | "likelihood" | "impact" | "name";
type SortDir = "asc" | "desc";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "markit-risk-assessment-v1";

const categories: Category[] = [
  "Brand",
  "Regulatory",
  "Budget",
  "Technology",
  "Market",
  "Team",
  "Channel",
];

const categoryStyles: Record<Category, { bg: string; text: string; border: string }> = {
  Brand:      { bg: "bg-black",       text: "text-white",    border: "border-black" },
  Regulatory: { bg: "bg-neutral-800", text: "text-white",    border: "border-neutral-800" },
  Budget:     { bg: "bg-neutral-600", text: "text-white",    border: "border-neutral-600" },
  Technology: { bg: "bg-neutral-500", text: "text-white",    border: "border-neutral-500" },
  Market:     { bg: "bg-neutral-400", text: "text-black",    border: "border-neutral-400" },
  Team:       { bg: "bg-neutral-300", text: "text-black",    border: "border-neutral-300" },
  Channel:    { bg: "bg-neutral-200", text: "text-black",    border: "border-neutral-200" },
};

const likelihoodLabels = ["", "Rare", "Unlikely", "Possible", "Likely", "Almost Certain"];
const impactLabels = ["", "Negligible", "Minor", "Moderate", "Major", "Catastrophic"];

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

/* ------------------------------------------------------------------ */
/*  Default template risks                                             */
/* ------------------------------------------------------------------ */

function defaultRisks(): MarketingRisk[] {
  const templates: Omit<MarketingRisk, "id" | "score">[] = [
    {
      name: "Marketing Risk Assessment Matrix",
      description: "Unfavorable media coverage or viral social media backlash damages brand perception.",
      category: "Brand",
      likelihood: 3,
      impact: 4,
      mitigation: "Maintain a crisis communications plan with pre-approved response templates and a designated spokesperson.",
    },
    {
      name: "Data privacy regulation change",
      description: "New privacy laws restrict data collection methods used for targeting and personalization.",
      category: "Regulatory",
      likelihood: 4,
      impact: 4,
      mitigation: "Invest in first-party data collection and ensure all campaigns comply with the strictest applicable regulation.",
    },
    {
      name: "Budget cut mid-campaign",
      description: "Leadership reduces marketing budget during an active campaign cycle.",
      category: "Budget",
      likelihood: 3,
      impact: 3,
      mitigation: "Build campaigns in phases so spend can be scaled down without wasting work already completed.",
    },
    {
      name: "Ad platform algorithm change",
      description: "Major algorithm update on Google or Meta reduces paid ad performance overnight.",
      category: "Technology",
      likelihood: 4,
      impact: 3,
      mitigation: "Diversify across at least three paid channels and keep organic content investment consistent.",
    },
    {
      name: "Key competitor price war",
      description: "A major competitor slashes prices, forcing reactive positioning adjustments.",
      category: "Market",
      likelihood: 3,
      impact: 4,
      mitigation: "Differentiate on value rather than price; prepare messaging that emphasizes quality, service, and outcomes.",
    },
    {
      name: "Critical team member departure",
      description: "A specialist with institutional knowledge leaves with little notice.",
      category: "Team",
      likelihood: 3,
      impact: 3,
      mitigation: "Document all processes and playbooks; cross-train at least one backup for every critical role.",
    },
    {
      name: "Social media account suspension",
      description: "A primary social account is suspended or hacked, disrupting audience reach.",
      category: "Channel",
      likelihood: 2,
      impact: 4,
      mitigation: "Enable two-factor authentication, maintain admin redundancy, and build an owned email list as a fallback.",
    },
    {
      name: "Market downturn reduces demand",
      description: "Macroeconomic slowdown shrinks the addressable market and lowers conversion rates.",
      category: "Market",
      likelihood: 3,
      impact: 5,
      mitigation: "Maintain a flexible budget allocation model that shifts spend toward retention and loyalty during downturns.",
    },
    {
      name: "Influencer partnership controversy",
      description: "A brand ambassador is involved in a public controversy that reflects poorly on the brand.",
      category: "Brand",
      likelihood: 2,
      impact: 3,
      mitigation: "Include morality clauses in influencer contracts and vet partners thoroughly before engagement.",
    },
    {
      name: "Website or CMS outage",
      description: "A prolonged website outage during a major campaign launch prevents conversions.",
      category: "Technology",
      likelihood: 2,
      impact: 5,
      mitigation: "Use a CDN, implement uptime monitoring with alerts, and maintain a rollback plan for deployments.",
    },
  ];

  return templates.map((t) => ({
    ...t,
    id: uid(),
    score: t.likelihood * t.impact,
  }));
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function riskLevel(score: number): string {
  if (score >= 16) return "Critical";
  if (score >= 10) return "High";
  if (score >= 5) return "Medium";
  return "Low";
}

function cellShade(likelihood: number, impact: number): string {
  const s = likelihood * impact;
  if (s >= 16) return "#000";
  if (s >= 10) return "#525252";
  if (s >= 5) return "#a3a3a3";
  return "#e5e5e5";
}

function cellTextColor(likelihood: number, impact: number): string {
  const s = likelihood * impact;
  return s >= 10 ? "#fff" : "#000";
}

function formatExportText(risks: MarketingRisk[]): string {
  const lines: string[] = [];
  lines.push("MARKETING RISK ASSESSMENT MATRIX");
  lines.push("=".repeat(50));
  lines.push(`Generated: ${new Date().toLocaleDateString()}`);
  lines.push(`Total Risks: ${risks.length}`);
  const critical = risks.filter((r) => r.score >= 16).length;
  lines.push(`Critical Risks: ${critical}`);
  const avg = risks.length > 0 ? (risks.reduce((s, r) => s + r.score, 0) / risks.length).toFixed(1) : "0";
  lines.push(`Average Score: ${avg}`);
  lines.push("");

  const sorted = [...risks].sort((a, b) => b.score - a.score);
  for (const r of sorted) {
    lines.push("-".repeat(50));
    lines.push(`Risk: ${r.name}`);
    lines.push(`Category: ${r.category}`);
    lines.push(`Description: ${r.description}`);
    lines.push(`Likelihood: ${r.likelihood}/5 (${likelihoodLabels[r.likelihood]})`);
    lines.push(`Impact: ${r.impact}/5 (${impactLabels[r.impact]})`);
    lines.push(`Risk Score: ${r.score} (${riskLevel(r.score)})`);
    lines.push(`Mitigation: ${r.mitigation || "(none)"}`);
    lines.push("");
  }

  lines.push("=".repeat(50));
  lines.push("RISK LEVEL KEY");
  lines.push("  Critical: 16-25");
  lines.push("  High: 10-15");
  lines.push("  Medium: 5-9");
  lines.push("  Low: 1-4");

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  SVG Risk Matrix                                                    */
/* ------------------------------------------------------------------ */

function RiskMatrix({ risks }: { risks: MarketingRisk[] }) {
  const size = 340;
  const pad = 60;
  const cellSize = (size - pad) / 5;

  /* Build a map of likelihood,impact -> list of risks */
  const map = new Map<string, MarketingRisk[]>();
  for (const r of risks) {
    const key = `${r.likelihood},${r.impact}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(r);
  }

  return (
    <svg
      viewBox={`0 0 ${size + 20} ${size + 20}`}
      className="w-full max-w-[480px] mx-auto"
      role="img"
      aria-label="5 by 5 risk assessment matrix heatmap"
    >
      {/* Y-axis label */}
      <text
        x={12}
        y={size / 2 + 10}
        textAnchor="middle"
        transform={`rotate(-90, 12, ${size / 2 + 10})`}
        className="fill-black"
        style={{ fontSize: "16px", fontWeight: 700 }}
      >
        Likelihood
      </text>

      {/* X-axis label */}
      <text
        x={pad + (size - pad) / 2}
        y={size + 18}
        textAnchor="middle"
        className="fill-black"
        style={{ fontSize: "16px", fontWeight: 700 }}
      >
        Impact
      </text>

      {/* Grid cells */}
      {Array.from({ length: 5 }, (_, li) =>
        Array.from({ length: 5 }, (_, ii) => {
          const likelihood = 5 - li;
          const impact = ii + 1;
          const x = pad + ii * cellSize;
          const y = li * cellSize;
          const fill = cellShade(likelihood, impact);
          const textFill = cellTextColor(likelihood, impact);
          const cellRisks = map.get(`${likelihood},${impact}`) || [];

          return (
            <g key={`${li}-${ii}`}>
              <rect
                x={x}
                y={y}
                width={cellSize}
                height={cellSize}
                fill={fill}
                stroke="#fff"
                strokeWidth={2}
              />
              {/* Show count if risks exist in this cell */}
              {cellRisks.length > 0 && (
                <text
                  x={x + cellSize / 2}
                  y={y + cellSize / 2 + 6}
                  textAnchor="middle"
                  fill={textFill}
                  style={{ fontSize: "16px", fontWeight: 700 }}
                >
                  {cellRisks.length}
                </text>
              )}
            </g>
          );
        })
      )}

      {/* Y-axis tick labels (likelihood 1-5) */}
      {Array.from({ length: 5 }, (_, i) => {
        const likelihood = 5 - i;
        return (
          <text
            key={`y-${i}`}
            x={pad - 8}
            y={i * cellSize + cellSize / 2 + 5}
            textAnchor="end"
            className="fill-neutral-700"
            style={{ fontSize: "16px" }}
          >
            {likelihood}
          </text>
        );
      })}

      {/* X-axis tick labels (impact 1-5) */}
      {Array.from({ length: 5 }, (_, i) => (
        <text
          key={`x-${i}`}
          x={pad + i * cellSize + cellSize / 2}
          y={5 * cellSize + 18}
          textAnchor="middle"
          className="fill-neutral-700"
          style={{ fontSize: "16px" }}
        >
          {i + 1}
        </text>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */



export default function RiskAssessmentPage() {
  const [risks, setRisks] = useState<MarketingRisk[]>([]);
  const [loaded, setLoaded] = useState(false);

  /* Form state */
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("Brand");
  const [likelihood, setLikelihood] = useState(3);
  const [impact, setImpact] = useState(3);
  const [mitigation, setMitigation] = useState("");

  /* Filters and sorting */
  const [filterCategory, setFilterCategory] = useState<Category | "All">("All");
  const [sortField, setSortField] = useState<SortField>("score");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  /* Editing */
  const [editingId, setEditingId] = useState<string | null>(null);

  /* ---- Load from localStorage ---- */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as MarketingRisk[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRisks(parsed);
          setLoaded(true);
          return;
        }
      }
    } catch {
      /* ignore */
    }
    setRisks(defaultRisks());
    setLoaded(true);
  }, []);

  /* ---- Save to localStorage ---- */
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(risks));
      } catch {
        /* quota exceeded — ignore */
      }
    }
  }, [risks, loaded]);

  /* ---- Actions ---- */
  const addRisk = useCallback(() => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const newRisk: MarketingRisk = {
      id: uid(),
      name: trimmedName,
      description: description.trim(),
      category,
      likelihood,
      impact,
      score: likelihood * impact,
      mitigation: mitigation.trim(),
    };

    if (editingId) {
      setRisks((prev) => prev.map((r) => (r.id === editingId ? { ...newRisk, id: editingId } : r)));
      setEditingId(null);
    } else {
      setRisks((prev) => [...prev, newRisk]);
    }

    setName("");
    setDescription("");
    setCategory("Brand");
    setLikelihood(3);
    setImpact(3);
    setMitigation("");
  }, [name, description, category, likelihood, impact, mitigation, editingId]);

  const editRisk = useCallback((risk: MarketingRisk) => {
    setEditingId(risk.id);
    setName(risk.name);
    setDescription(risk.description);
    setCategory(risk.category);
    setLikelihood(risk.likelihood);
    setImpact(risk.impact);
    setMitigation(risk.mitigation);
  }, []);

  const removeRisk = useCallback((id: string) => {
    setRisks((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const resetToTemplate = useCallback(() => {
    setRisks(defaultRisks());
  }, []);

  const exportTxt = useCallback(() => {
    const text = formatExportText(risks);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "risk-assessment.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [risks]);

  /* ---- Computed values ---- */
  const filtered =
    filterCategory === "All" ? risks : risks.filter((r) => r.category === filterCategory);

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortField === "name") {
      cmp = a.name.localeCompare(b.name);
    } else {
      cmp = a[sortField] - b[sortField];
    }
    return sortDir === "desc" ? -cmp : cmp;
  });

  const totalRisks = risks.length;
  const criticalCount = risks.filter((r) => r.score >= 16).length;
  const highCount = risks.filter((r) => r.score >= 10 && r.score < 16).length;
  const avgScore = totalRisks > 0 ? (risks.reduce((s, r) => s + r.score, 0) / totalRisks).toFixed(1) : "0";
  const topFive = [...risks].sort((a, b) => b.score - a.score).slice(0, 5);

  /* ---- Focus style ---- */
  const focusRing = "focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";

  if (!loaded) return null;

  return (
    <article className="min-h-screen bg-white text-black">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Risk Assessment Matrix",
          description: "Identify, score, and mitigate marketing risks with a visual heat map, category breakdown, and exportable risk register.",
          url: "https://themarkitmedia.com/en/resources/risk-assessment",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }}
      />
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Risk Assessment Matrix" },
        ]}
      />

      {/* ---- Hero ---- */}
      <header className="px-6 lg:px-12 pt-32 pb-16 max-w-7xl mx-auto">
        <Animate animation="fade-up">
          <SectionLabel>Free Marketing Tool</SectionLabel>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight leading-tight text-black mt-2">
            Marketing Risk Assessment Matrix
          </h1>
          <SectionDesc>
            Identify, score, and visualize marketing risks on an interactive 5x5
            matrix. Prioritize threats by likelihood and impact, assign mitigation
            strategies, and export your assessment.
          </SectionDesc>
        </Animate>
      </header>

      {/* ---- Dashboard Summary ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-12 max-w-7xl mx-auto">
        <Animate animation="fade-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Marketing Risk Assessment Matrix",
            description: "Map marketing risks on a 5x5 likelihood vs impact matrix with SVG heatmap and mitigation strategies",
            url: "https://themarkitmedia.com/en/resources/risk-assessment",
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
      <title>Marketing Risk Assessment Matrix | Free Marketing Tool — Markit Media</title>
      <link rel="canonical" href="https://themarkitmedia.com/en/resources/risk-assessment" />
      <meta name="description" content="Unfavorable media coverage or viral social media backlash damages brand perception." />
            {[
              { label: "Total Risks", value: totalRisks },
              { label: "Critical", value: criticalCount },
              { label: "High", value: highCount },
              { label: "Avg Score", value: avgScore },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border border-neutral-200 p-6 text-center"
              >
                <p className="text-base text-neutral-500 mb-1">{stat.label}</p>
                <p className="font-[family-name:var(--font-display)] text-3xl font-extrabold">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </Animate>
      </section>

      {/* ---- Risk Matrix Visualization ---- */}
      <section aria-label="Risk Heatmap" className="px-6 lg:px-12 pb-12 max-w-7xl mx-auto">
        <Animate animation="fade-up">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight mb-6">
            Risk Heatmap
          </h2>
          <div className="border border-neutral-200 p-6">
            <RiskMatrix risks={risks} />
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
              {[
                { label: "Low (1-4)", color: "#e5e5e5", textColor: "#000" },
                { label: "Medium (5-9)", color: "#a3a3a3", textColor: "#000" },
                { label: "High (10-15)", color: "#525252", textColor: "#fff" },
                { label: "Critical (16-25)", color: "#000", textColor: "#fff" },
              ].map((item) => (
                <span key={item.label} className="flex items-center gap-2 text-base">
                  <span
                    className="inline-block w-5 h-5 border border-neutral-300"
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  />
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </Animate>
      </section>

      {/* ---- Add / Edit Risk Form ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-12 max-w-7xl mx-auto">
        <Animate animation="fade-up">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight mb-6">
            {editingId ? "Edit Risk" : "Add a Risk"}
          </h2>
          <div className="border border-neutral-200 p-6 space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="risk-name" className="block text-base font-bold mb-1">
                Risk Name <span className="text-neutral-400">*</span>
              </label>
              <input
                id="risk-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Negative brand coverage"
                className={`w-full border border-neutral-300 px-4 py-3 text-base ${focusRing}`}
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="risk-desc" className="block text-base font-bold mb-1">
                Description
              </label>
              <textarea
                id="risk-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the risk scenario"
                rows={2}
                className={`w-full border border-neutral-300 px-4 py-3 text-base resize-y ${focusRing}`}
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="risk-category" className="block text-base font-bold mb-1">
                Category
              </label>
              <select
                id="risk-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className={`w-full border border-neutral-300 px-4 py-3 text-base bg-white ${focusRing}`}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Likelihood + Impact side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="risk-likelihood" className="block text-base font-bold mb-1">
                  Likelihood ({likelihood}/5 &mdash; {likelihoodLabels[likelihood]})
                </label>
                <input
                  id="risk-likelihood"
                  type="range"
                  min={1}
                  max={5}
                  value={likelihood}
                  onChange={(e) => setLikelihood(Number(e.target.value))}
                  className={`w-full accent-black ${focusRing}`}
                />
                <div className="flex justify-between text-base text-neutral-500 mt-1">
                  <span>1 Rare</span>
                  <span>5 Almost Certain</span>
                </div>
              </div>
              <div>
                <label htmlFor="risk-impact" className="block text-base font-bold mb-1">
                  Impact ({impact}/5 &mdash; {impactLabels[impact]})
                </label>
                <input
                  id="risk-impact"
                  type="range"
                  min={1}
                  max={5}
                  value={impact}
                  onChange={(e) => setImpact(Number(e.target.value))}
                  className={`w-full accent-black ${focusRing}`}
                />
                <div className="flex justify-between text-base text-neutral-500 mt-1">
                  <span>1 Negligible</span>
                  <span>5 Catastrophic</span>
                </div>
              </div>
            </div>

            {/* Auto-calculated score display */}
            <div className="border border-neutral-200 bg-neutral-50 px-4 py-3">
              <p className="text-base">
                <span className="font-bold">Calculated Risk Score:</span>{" "}
                {likelihood * impact} ({riskLevel(likelihood * impact)})
              </p>
            </div>

            {/* Mitigation */}
            <div>
              <label htmlFor="risk-mitigation" className="block text-base font-bold mb-1">
                Mitigation Strategy
              </label>
              <textarea
                id="risk-mitigation"
                value={mitigation}
                onChange={(e) => setMitigation(e.target.value)}
                placeholder="How will you reduce or respond to this risk?"
                rows={2}
                className={`w-full border border-neutral-300 px-4 py-3 text-base resize-y ${focusRing}`}
              />
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={addRisk}
                disabled={!name.trim()}
                className={`px-8 py-3 min-h-[44px] text-base font-bold bg-black text-white hover:bg-neutral-800 transition-colors motion-reduce:transition-none disabled:bg-neutral-300 disabled:cursor-not-allowed ${focusRing}`}
              >
                {editingId ? "Update Risk" : "Add Risk"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setName("");
                    setDescription("");
                    setCategory("Brand");
                    setLikelihood(3);
                    setImpact(3);
                    setMitigation("");
                  }}
                  className={`px-8 py-3 min-h-[44px] text-base font-bold border border-neutral-300 hover:bg-neutral-100 transition-colors motion-reduce:transition-none ${focusRing}`}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </Animate>
      </section>

      {/* ---- Top 5 Risks ---- */}
      {topFive.length > 0 && (
        <section aria-label="Top 5 Risks by Score" className="px-6 lg:px-12 pb-12 max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight mb-6">
              Top 5 Risks by Score
            </h2>
            <div className="space-y-3">
              {topFive.map((risk, idx) => (
                <div
                  key={risk.id}
                  className="flex items-center gap-4 border border-neutral-200 px-5 py-4"
                >
                  <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-neutral-300 w-8 shrink-0">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold truncate">{risk.name}</p>
                    <p className="text-base text-neutral-500">
                      {risk.category} &middot; {likelihoodLabels[risk.likelihood]} likelihood &middot;{" "}
                      {impactLabels[risk.impact]} impact
                    </p>
                  </div>
                  <span className="font-[family-name:var(--font-display)] text-xl font-extrabold shrink-0">
                    {risk.score}
                  </span>
                </div>
              ))}
            </div>
          </Animate>
        </section>
      )}

      {/* ---- Filter / Sort Controls + Risk List ---- */}
      <section aria-label="All Risks ()" className="px-6 lg:px-12 pb-12 max-w-7xl mx-auto">
        <Animate animation="fade-up">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight mb-6">
            All Risks ({risks.length})
          </h2>

          {/* Controls row */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div>
              <label htmlFor="filter-cat" className="block text-base font-bold mb-1">
                Filter by Category
              </label>
              <select
                id="filter-cat"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as Category | "All")}
                className={`border border-neutral-300 px-4 py-3 text-base bg-white ${focusRing}`}
              >
                <option value="All">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sort-field" className="block text-base font-bold mb-1">
                Sort by
              </label>
              <select
                id="sort-field"
                value={sortField}
                onChange={(e) => setSortField(e.target.value as SortField)}
                className={`border border-neutral-300 px-4 py-3 text-base bg-white ${focusRing}`}
              >
                <option value="score">Score</option>
                <option value="likelihood">Likelihood</option>
                <option value="impact">Impact</option>
                <option value="name">Name</option>
              </select>
            </div>
            <div>
              <label htmlFor="sort-dir" className="block text-base font-bold mb-1">
                Direction
              </label>
              <select
                id="sort-dir"
                value={sortDir}
                onChange={(e) => setSortDir(e.target.value as SortDir)}
                className={`border border-neutral-300 px-4 py-3 text-base bg-white ${focusRing}`}
              >
                <option value="desc">Highest First</option>
                <option value="asc">Lowest First</option>
              </select>
            </div>
          </div>

          {/* Action bar */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              type="button"
              onClick={exportTxt}
              disabled={risks.length === 0}
              className={`px-6 py-3 min-h-[44px] text-base font-bold border border-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none disabled:border-neutral-300 disabled:text-neutral-400 disabled:hover:bg-transparent disabled:cursor-not-allowed ${focusRing}`}
            >
              Export as .txt
            </button>
            <button
              type="button"
              onClick={resetToTemplate}
              className={`px-6 py-3 min-h-[44px] text-base font-bold border border-neutral-300 hover:bg-neutral-100 transition-colors motion-reduce:transition-none ${focusRing}`}
            >
              Reset to Template
            </button>
          </div>

          {/* Risk cards */}
          {sorted.length === 0 ? (
            <p className="text-base text-neutral-500 py-8 text-center border border-neutral-200">
              No risks found. Add one above or reset to the template.
            </p>
          ) : (
            <Stagger stagger={60} animation="fade-up" className="space-y-4">
              {sorted.map((risk) => {
                const style = categoryStyles[risk.category];
                return (
                  <div key={risk.id} className="border border-neutral-200">
                    <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-neutral-100">
                      <span
                        className={`inline-block px-3 py-1 text-base font-bold ${style.bg} ${style.text}`}
                      >
                        {risk.category}
                      </span>
                      <span className="text-base font-bold flex-1 min-w-0 truncate">
                        {risk.name}
                      </span>
                      <span className="text-base font-bold whitespace-nowrap">
                        Score: {risk.score} ({riskLevel(risk.score)})
                      </span>
                    </div>
                    <div className="px-5 py-4 space-y-3">
                      {risk.description && (
                        <p className="text-base text-neutral-600">{risk.description}</p>
                      )}
                      <div className="flex flex-wrap gap-6 text-base">
                        <span>
                          <span className="font-bold">Likelihood:</span> {risk.likelihood}/5 (
                          {likelihoodLabels[risk.likelihood]})
                        </span>
                        <span>
                          <span className="font-bold">Impact:</span> {risk.impact}/5 (
                          {impactLabels[risk.impact]})
                        </span>
                      </div>
                      {risk.mitigation && (
                        <div>
                          <p className="text-base font-bold mb-1">Mitigation Strategy</p>
                          <p className="text-base text-neutral-600">{risk.mitigation}</p>
                        </div>
                      )}
                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => editRisk(risk)}
                          className={`px-5 py-2 min-h-[44px] text-base font-bold border border-neutral-300 hover:bg-neutral-100 transition-colors motion-reduce:transition-none ${focusRing}`}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => removeRisk(risk.id)}
                          aria-label={`Remove "${risk.name}"`}
                          className={`px-5 py-2 min-h-[44px] text-base font-bold border border-neutral-300 hover:bg-neutral-100 transition-colors motion-reduce:transition-none ${focusRing}`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Stagger>
          )}
        </Animate>
      </section>

      {/* ---- Category Legend ---- */}
      <section aria-label="Risk Categories" className="px-6 lg:px-12 pb-12 max-w-7xl mx-auto">
        <Animate animation="fade-up">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight mb-6">
            Risk Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const style = categoryStyles[cat];
              const count = risks.filter((r) => r.category === cat).length;
              return (
                <div key={cat} className={`border ${style.border} p-5`}>
                  <span
                    className={`inline-block px-3 py-1 text-base font-bold ${style.bg} ${style.text} mb-3`}
                  >
                    {cat}
                  </span>
                  <p className="text-base text-neutral-600">
                    {count} {count === 1 ? "risk" : "risks"} identified
                  </p>
                </div>
              );
            })}
          </div>
        </Animate>
      </section>

      {/* ---- Educational Section ---- */}
      <section aria-label="Learn" className="px-6 lg:px-12 py-16 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Learn</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight leading-tight mb-8">
              Risk Management in Marketing
            </h2>
          </Animate>

          <div className="grid md:grid-cols-2 gap-8">
            <Animate animation="fade-up" delay={100}>
              <div className="space-y-6">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-2">
                    What is a Risk Assessment Matrix?
                  </h3>
                  <p className="text-base text-neutral-600 leading-relaxed">
                    A risk assessment matrix is a visual tool that plots risks on two
                    axes: likelihood (how probable the event is) and impact (how
                    damaging it would be). The resulting grid makes it simple to see
                    which risks need immediate attention and which can be monitored
                    over time.
                  </p>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-2">
                    Why Marketing Teams Need One
                  </h3>
                  <p className="text-base text-neutral-600 leading-relaxed">
                    Marketing operates in a fast-moving environment where algorithm
                    changes, regulatory shifts, and reputational events can derail
                    campaigns overnight. A risk matrix turns vague concerns into scored,
                    prioritized items with documented response plans, so your team
                    reacts faster when something goes wrong.
                  </p>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-2">
                    How to Use This Tool
                  </h3>
                  <p className="text-base text-neutral-600 leading-relaxed">
                    Start with the pre-loaded template of ten common marketing risks.
                    Adjust the likelihood and impact scores to match your situation, add
                    mitigation strategies, and remove any risks that do not apply. Then
                    add risks specific to your business. The heatmap updates
                    automatically so you can see the overall risk profile at a glance.
                  </p>
                </div>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={200}>
              <div className="space-y-6">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-2">
                    Scoring Methodology
                  </h3>
                  <p className="text-base text-neutral-600 leading-relaxed">
                    Each risk is scored by multiplying likelihood (1&ndash;5) by impact
                    (1&ndash;5). Scores range from 1 to 25.{" "}
                    <strong>Critical (16&ndash;25)</strong> risks require immediate
                    action. <strong>High (10&ndash;15)</strong> risks need a documented
                    mitigation plan. <strong>Medium (5&ndash;9)</strong> risks should be
                    monitored regularly. <strong>Low (1&ndash;4)</strong> risks can be
                    accepted or reviewed quarterly.
                  </p>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-2">
                    Writing Effective Mitigations
                  </h3>
                  <p className="text-base text-neutral-600 leading-relaxed">
                    A good mitigation strategy is specific and actionable. Instead of
                    &ldquo;monitor the situation,&rdquo; write &ldquo;set up weekly
                    Google Alerts for brand mentions and assign a team member to
                    review.&rdquo; Include who is responsible, what triggers the
                    response, and what the fallback plan is.
                  </p>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-2">
                    Review Cadence
                  </h3>
                  <p className="text-base text-neutral-600 leading-relaxed">
                    Risk profiles change. Schedule a monthly review for critical and
                    high risks, and a quarterly review for the full matrix. After any
                    significant campaign launch, market event, or organizational change,
                    revisit the assessment to keep it current and actionable.
                  </p>
                </div>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section aria-label="Related Tools" className="px-6 lg:px-12 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/swot-analysis" className="border border-gray-200 bg-white px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors">SWOT Analysis</Link>
                <Link href="/resources/competitive-swot-analyzer" className="border border-gray-200 bg-white px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors">Competitive SWOT Analyzer</Link>
                <Link href="/resources/marketing-audit-scorecard" className="border border-gray-200 bg-white px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors">Marketing Audit Scorecard</Link>
          </div>
        </div>
      </section>

      {/* ---- Bottom CTA ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Reduce Risk, Increase Results
            </h2>
            <p className="text-lg text-neutral-400 mt-4 mb-8">
              A documented risk assessment is the foundation of confident marketing.
              Let our team help you build a strategy that anticipates threats, protects
              your budget, and keeps campaigns on track.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className={`inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2`}
              >
                Get in Touch &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Risk Assessment"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Redesign Planner", href: "/resources/redesign-planner" },
          { title: "Retention Calculator", href: "/resources/retention-calculator" },
          { title: "Pricing Page Analyzer", href: "/resources/pricing-page-analyzer" },
          { title: "Quarterly Review", href: "/resources/quarterly-review" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
