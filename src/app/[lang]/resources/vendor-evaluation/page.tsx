"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Criterion {
  id: string;
  label: string;
  description: string;
}

interface Category {
  id: string;
  label: string;
  criteria: Criterion[];
}

interface VendorScore {
  score: number;
  note: string;
}

interface Vendor {
  name: string;
  scores: Record<string, VendorScore>;
}

interface SavedState {
  vendors: Vendor[];
  weights: Record<string, number>;
  activeTab: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "markit-vendor-evaluation-v1";

const CATEGORIES: Category[] = [
  {
    id: "capabilities",
    label: "Capabilities",
    criteria: [
      { id: "cap-breadth", label: "Service Breadth", description: "Range of services offered relative to your needs" },
      { id: "cap-depth", label: "Service Depth", description: "Level of expertise and sophistication in core services" },
      { id: "cap-specialization", label: "Specialization Fit", description: "Alignment with your specific industry or channel needs" },
      { id: "cap-scalability", label: "Scalability", description: "Ability to grow with your business and handle increased scope" },
    ],
  },
  {
    id: "experience",
    label: "Experience",
    criteria: [
      { id: "exp-industry", label: "Industry Experience", description: "Track record working with businesses in your sector" },
      { id: "exp-casestudies", label: "Case Studies", description: "Quality and relevance of documented client results" },
      { id: "exp-references", label: "Client References", description: "Willingness to provide and quality of client references" },
      { id: "exp-tenure", label: "Years in Business", description: "Longevity and stability of the agency or vendor" },
    ],
  },
  {
    id: "team",
    label: "Team Quality",
    criteria: [
      { id: "team-senior", label: "Senior Talent", description: "Experience level of people who will work on your account" },
      { id: "team-dedicated", label: "Dedicated Resources", description: "Whether you get named, dedicated team members" },
      { id: "team-retention", label: "Staff Retention", description: "Team stability and low turnover indicators" },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    criteria: [
      { id: "price-value", label: "Value for Money", description: "Overall cost relative to the quality of deliverables" },
      { id: "price-transparency", label: "Pricing Transparency", description: "Clarity of pricing structure with no hidden fees" },
      { id: "price-flexibility", label: "Contract Flexibility", description: "Ability to adjust scope, pause, or exit without penalty" },
    ],
  },
  {
    id: "communication",
    label: "Communication",
    criteria: [
      { id: "comm-responsiveness", label: "Responsiveness", description: "Speed and consistency of responses to your inquiries" },
      { id: "comm-proactive", label: "Proactive Updates", description: "Frequency and quality of unsolicited status updates" },
      { id: "comm-clarity", label: "Clarity", description: "How well they explain complex topics and set expectations" },
      { id: "comm-cadence", label: "Meeting Cadence", description: "Regularity and usefulness of scheduled check-ins" },
    ],
  },
  {
    id: "technology",
    label: "Technology",
    criteria: [
      { id: "tech-stack", label: "Tool Stack", description: "Quality and relevance of their marketing technology tools" },
      { id: "tech-integration", label: "Integration Ability", description: "Ability to connect with your existing systems and platforms" },
      { id: "tech-innovation", label: "Innovation", description: "Adoption of emerging tools and forward-looking approaches" },
    ],
  },
  {
    id: "reporting",
    label: "Reporting",
    criteria: [
      { id: "rep-frequency", label: "Report Frequency", description: "How often you receive performance updates" },
      { id: "rep-depth", label: "Report Depth", description: "Level of insight and actionable recommendations in reports" },
      { id: "rep-dashboards", label: "Live Dashboards", description: "Access to real-time or self-service performance data" },
      { id: "rep-kpis", label: "KPI Relevance", description: "Whether reported metrics tie to your actual business goals" },
    ],
  },
  {
    id: "culture",
    label: "Cultural Fit",
    criteria: [
      { id: "cult-values", label: "Values Alignment", description: "Shared approach to work, ethics, and business philosophy" },
      { id: "cult-collaboration", label: "Collaboration Style", description: "How well their working style meshes with your team" },
      { id: "cult-adaptability", label: "Adaptability", description: "Willingness to adjust processes to fit your preferences" },
    ],
  },
];

const ALL_CRITERIA = CATEGORIES.flatMap((cat) => cat.criteria);
const CATEGORY_COUNT = CATEGORIES.length;

const DEFAULT_WEIGHTS: Record<string, number> = {
  capabilities: 15,
  experience: 15,
  team: 12,
  pricing: 15,
  communication: 12,
  technology: 10,
  reporting: 10,
  culture: 11,
};

function createEmptyVendor(name: string): Vendor {
  const scores: Record<string, VendorScore> = {};
  for (const c of ALL_CRITERIA) {
    scores[c.id] = { score: 0, note: "" };
  }
  return { name, scores };
}

const SERIES_STYLES = [
  { strokeWidth: 2.5, dash: "", fillOpacity: 0.12 },
  { strokeWidth: 1.8, dash: "8,4", fillOpacity: 0.06 },
  { strokeWidth: 1.8, dash: "3,3", fillOpacity: 0.04 },
  { strokeWidth: 1.8, dash: "12,3,3,3", fillOpacity: 0.03 },
  { strokeWidth: 1.8, dash: "2,6", fillOpacity: 0.02 },
];

const BEST_PRACTICES = [
  {
    title: "Define Your Needs First",
    body: "Before evaluating vendors, document your specific goals, budget range, timeline, and must-have capabilities. A clear brief leads to better comparisons.",
  },
  {
    title: "Score Independently Before Discussing",
    body: "Have each stakeholder complete their scorecard separately before comparing notes. Group discussions first tend to anchor on the loudest voice.",
  },
  {
    title: "Weight What Matters Most",
    body: "Not every category deserves equal weight. If pricing is your biggest constraint, give it more weight. If you need deep expertise, weight experience higher.",
  },
  {
    title: "Check References Thoroughly",
    body: "Ask for references from clients similar to your business in size and industry. Ask about communication quality, not just results.",
  },
  {
    title: "Watch for Red Flags",
    body: "Guaranteed results, reluctance to share who works on your account, opaque pricing, and long lock-in contracts are common warning signs.",
  },
  {
    title: "Consider the Long Term",
    body: "The cheapest option today may cost more over time through poor results, high turnover, or hidden fees. Evaluate total cost of partnership, not just monthly retainer.",
  },
];

/* ------------------------------------------------------------------ */
/*  Radar chart geometry                                               */
/* ------------------------------------------------------------------ */

const RADAR_CX = 220;
const RADAR_CY = 220;
const RADAR_R = 160;
const LABEL_R = RADAR_R + 30;

function polarToXY(angleDeg: number, radius: number): [number, number] {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return [RADAR_CX + radius * Math.cos(rad), RADAR_CY + radius * Math.sin(rad)];
}

function axisAngle(index: number): number {
  return (360 / CATEGORY_COUNT) * index;
}

function scoresToPolygonPoints(scores: number[], maxScore: number): string {
  return scores
    .map((s, i) => {
      const r = (Math.max(s, 0) / maxScore) * RADAR_R;
      const [x, y] = polarToXY(axisAngle(i), r);
      return `${x},${y}`;
    })
    .join(" ");
}

function gridPolygonPoints(level: number, maxLevel: number): string {
  const r = (level / maxLevel) * RADAR_R;
  return Array.from({ length: CATEGORY_COUNT }, (_, i) => {
    const [x, y] = polarToXY(axisAngle(i), r);
    return `${x},${y}`;
  }).join(" ");
}

function labelAnchor(index: number): "middle" | "start" | "end" {
  const angle = axisAngle(index);
  if (angle < 10 || angle > 350) return "middle";
  if (Math.abs(angle - 180) < 10) return "middle";
  if (angle > 0 && angle < 180) return "start";
  return "end";
}

function labelDY(index: number): string {
  const angle = axisAngle(index);
  if (angle < 10 || angle > 350) return "-0.5em";
  if (Math.abs(angle - 180) < 10) return "1.2em";
  return "0.35em";
}

/* ------------------------------------------------------------------ */
/*  Computation helpers                                                */
/* ------------------------------------------------------------------ */

function computeCategoryScore(vendor: Vendor, category: Category): number {
  const criteriaScores = category.criteria.map((c) => vendor.scores[c.id]?.score ?? 0);
  const scored = criteriaScores.filter((s) => s > 0);
  if (scored.length === 0) return 0;
  return scored.reduce((a, b) => a + b, 0) / scored.length;
}

function computeWeightedTotal(
  vendor: Vendor,
  weights: Record<string, number>
): number {
  let total = 0;
  let totalWeight = 0;
  for (const cat of CATEGORIES) {
    const catScore = computeCategoryScore(vendor, cat);
    const w = weights[cat.id] ?? 0;
    total += catScore * (w / 100);
    if (catScore > 0) totalWeight += w;
  }
  if (totalWeight === 0) return 0;
  return (total / (totalWeight / 100)) * (totalWeight / 100);
}

function identifyStrengths(vendor: Vendor): { category: string; score: number }[] {
  return CATEGORIES.map((cat) => ({
    category: cat.label,
    score: computeCategoryScore(vendor, cat),
  }))
    .filter((c) => c.score >= 7)
    .sort((a, b) => b.score - a.score);
}

function identifyWeaknesses(vendor: Vendor): { category: string; score: number }[] {
  return CATEGORIES.map((cat) => ({
    category: cat.label,
    score: computeCategoryScore(vendor, cat),
  }))
    .filter((c) => c.score > 0 && c.score < 5)
    .sort((a, b) => a.score - b.score);
}

function generateRecommendation(
  vendors: Vendor[],
  weights: Record<string, number>
): { winner: Vendor | null; reasoning: string; scores: { name: string; score: number }[] } {
  const scored = vendors
    .filter((v) => v.name.trim() !== "")
    .map((v) => ({
      name: v.name,
      score: computeWeightedTotal(v, weights),
      vendor: v,
    }))
    .filter((v) => v.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return { winner: null, reasoning: "No vendors have been scored yet.", scores: [] };
  }

  const best = scored[0];
  const strengths = identifyStrengths(best.vendor);
  const weaknesses = identifyWeaknesses(best.vendor);

  let reasoning = `${best.name} leads with a weighted score of ${best.score.toFixed(2)} out of 10.`;
  if (strengths.length > 0) {
    reasoning += ` Strongest in ${strengths.map((s) => s.category).join(", ")}.`;
  }
  if (weaknesses.length > 0) {
    reasoning += ` Potential concerns in ${weaknesses.map((w) => w.category).join(", ")}.`;
  }
  if (scored.length > 1) {
    const gap = best.score - scored[1].score;
    if (gap < 0.5) {
      reasoning += ` However, the margin over ${scored[1].name} is narrow (${gap.toFixed(2)} points), so weigh qualitative factors carefully.`;
    }
  }

  return {
    winner: best.vendor,
    reasoning,
    scores: scored.map((s) => ({ name: s.name, score: s.score })),
  };
}

/* ------------------------------------------------------------------ */
/*  Export as text                                                      */
/* ------------------------------------------------------------------ */

function formatExportText(vendors: Vendor[], weights: Record<string, number>): string {
  const lines: string[] = [];
  const named = vendors.filter((v) => v.name.trim() !== "");

  lines.push("MARKETING VENDOR EVALUATION SCORECARD");
  lines.push("=".repeat(50));
  lines.push(`Generated: ${new Date().toLocaleDateString()}`);
  lines.push("");

  lines.push("CATEGORY WEIGHTS");
  lines.push("-".repeat(30));
  for (const cat of CATEGORIES) {
    lines.push(`  ${cat.label}: ${weights[cat.id]}%`);
  }
  lines.push("");

  for (const vendor of named) {
    lines.push(`VENDOR: ${vendor.name}`);
    lines.push("-".repeat(30));
    const overall = computeWeightedTotal(vendor, weights);
    lines.push(`  Overall Weighted Score: ${overall.toFixed(2)}/10`);
    lines.push("");

    for (const cat of CATEGORIES) {
      const catScore = computeCategoryScore(vendor, cat);
      lines.push(`  ${cat.label} (Weight: ${weights[cat.id]}%) — Avg: ${catScore.toFixed(1)}/10`);
      for (const crit of cat.criteria) {
        const s = vendor.scores[crit.id];
        const scoreTxt = s && s.score > 0 ? `${s.score}/10` : "Not scored";
        const noteTxt = s && s.note ? ` — ${s.note}` : "";
        lines.push(`    ${crit.label}: ${scoreTxt}${noteTxt}`);
      }
      lines.push("");
    }

    const strengths = identifyStrengths(vendor);
    if (strengths.length > 0) {
      lines.push("  Strengths:");
      strengths.forEach((s) => lines.push(`    + ${s.category} (${s.score.toFixed(1)}/10)`));
    }
    const weaknesses = identifyWeaknesses(vendor);
    if (weaknesses.length > 0) {
      lines.push("  Weaknesses:");
      weaknesses.forEach((w) => lines.push(`    - ${w.category} (${w.score.toFixed(1)}/10)`));
    }
    lines.push("");
    lines.push("=".repeat(50));
    lines.push("");
  }

  const rec = generateRecommendation(vendors, weights);
  if (rec.winner) {
    lines.push("RECOMMENDATION");
    lines.push("-".repeat(30));
    lines.push(`  ${rec.reasoning}`);
    lines.push("");
    lines.push("  Ranking:");
    rec.scores.forEach((s, i) => {
      lines.push(`    ${i + 1}. ${s.name}: ${s.score.toFixed(2)}/10`);
    });
  }

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function RadarChart({
  vendorData,
}: {
  vendorData: { name: string; categoryScores: number[] }[];
}) {
  const maxScore = 10;
  const gridLevels = [2, 4, 6, 8, 10];

  return (
    <div className="w-full max-w-lg mx-auto">
      <svg
        viewBox="0 0 440 440"
        className="w-full h-auto"
        role="img"
        aria-label={`Radar chart comparing ${vendorData.map((v) => v.name).join(", ")} across ${CATEGORY_COUNT} categories`}
      >
        {/* Grid rings */}
        {gridLevels.map((level) => (
          <polygon
            key={level}
            points={gridPolygonPoints(level, maxScore)}
            fill="none"
            stroke="#e5e5e5"
            strokeWidth={level === maxScore ? 1.5 : 0.75}
          />
        ))}

        {/* Axis lines */}
        {CATEGORIES.map((_, i) => {
          const [x, y] = polarToXY(axisAngle(i), RADAR_R);
          return (
            <line
              key={i}
              x1={RADAR_CX}
              y1={RADAR_CY}
              x2={x}
              y2={y}
              stroke="#e5e5e5"
              strokeWidth={0.75}
            />
          );
        })}

        {/* Scale labels on first axis */}
        {gridLevels.map((level) => {
          const [x, y] = polarToXY(0, (level / maxScore) * RADAR_R);
          return (
            <text
              key={level}
              x={x + 4}
              y={y}
              className="text-base fill-neutral-400"
              textAnchor="start"
              dominantBaseline="middle"
            >
              {level}
            </text>
          );
        })}

        {/* Data polygons */}
        {vendorData.map((vendor, vi) => {
          const style = SERIES_STYLES[vi] || SERIES_STYLES[0];
          const points = scoresToPolygonPoints(vendor.categoryScores, maxScore);
          return (
            <g key={vi}>
              <polygon
                points={points}
                fill="#000"
                fillOpacity={style.fillOpacity}
                stroke="#000"
                strokeWidth={style.strokeWidth}
                strokeDasharray={style.dash || undefined}
                strokeLinejoin="round"
              />
            </g>
          );
        })}

        {/* Axis labels */}
        {CATEGORIES.map((cat, i) => {
          const [x, y] = polarToXY(axisAngle(i), LABEL_R);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor={labelAnchor(i)}
              dy={labelDY(i)}
              className="text-base fill-black font-bold"
            >
              {cat.label}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mt-4">
        {vendorData.map((vendor, vi) => {
          const style = SERIES_STYLES[vi] || SERIES_STYLES[0];
          return (
            <div key={vi} className="flex items-center gap-2">
              <svg width="24" height="12" aria-hidden="true">
                <line
                  x1="0"
                  y1="6"
                  x2="24"
                  y2="6"
                  stroke="#000"
                  strokeWidth={style.strokeWidth}
                  strokeDasharray={style.dash || undefined}
                />
              </svg>
              <span className="text-base text-black font-bold">{vendor.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScoreInput({
  value,
  onChange,
  criterionId,
  vendorName,
}: {
  value: number;
  onChange: (v: number) => void;
  criterionId: string;
  vendorName: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="range"
        min={0}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 accent-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
        aria-label={`Score for ${criterionId} — ${vendorName}`}
      />
      <span className="text-base font-bold text-black min-w-[2rem] text-center tabular-nums">
        {value > 0 ? value : "—"}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function VendorEvaluationPage() {
  const [vendors, setVendors] = useState<Vendor[]>(() => [
    createEmptyVendor("Vendor A"),
    createEmptyVendor("Vendor B"),
  ]);
  const [weights, setWeights] = useState<Record<string, number>>({ ...DEFAULT_WEIGHTS });
  const [activeTab, setActiveTab] = useState<string>("scoring");
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeVendorIndex, setActiveVendorIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  /* Load from localStorage */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: SavedState = JSON.parse(raw);
        if (saved.vendors && saved.vendors.length > 0) {
          setVendors(saved.vendors);
        }
        if (saved.weights) {
          setWeights(saved.weights);
        }
        if (saved.activeTab) {
          setActiveTab(saved.activeTab);
        }
      }
    } catch {
      /* ignore parse errors */
    }
    setLoaded(true);
  }, []);

  /* Save to localStorage on change */
  useEffect(() => {
    if (!loaded) return;
    try {
      const state: SavedState = { vendors, weights, activeTab };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore quota errors */
    }
  }, [vendors, weights, activeTab, loaded]);

  /* Vendor management */
  const addVendor = useCallback(() => {
    if (vendors.length >= 5) return;
    setVendors((prev) => [...prev, createEmptyVendor(`Vendor ${String.fromCharCode(65 + prev.length)}`)]);
  }, [vendors.length]);

  const removeVendor = useCallback(
    (index: number) => {
      if (vendors.length <= 2) return;
      setVendors((prev) => prev.filter((_, i) => i !== index));
      if (activeVendorIndex >= vendors.length - 1) {
        setActiveVendorIndex(Math.max(0, vendors.length - 2));
      }
    },
    [vendors.length, activeVendorIndex]
  );

  const updateVendorName = useCallback((index: number, name: string) => {
    setVendors((prev) => prev.map((v, i) => (i === index ? { ...v, name } : v)));
  }, []);

  const updateScore = useCallback((vendorIndex: number, criterionId: string, score: number) => {
    setVendors((prev) =>
      prev.map((v, i) =>
        i === vendorIndex
          ? { ...v, scores: { ...v.scores, [criterionId]: { ...v.scores[criterionId], score } } }
          : v
      )
    );
  }, []);

  const updateNote = useCallback((vendorIndex: number, criterionId: string, note: string) => {
    setVendors((prev) =>
      prev.map((v, i) =>
        i === vendorIndex
          ? { ...v, scores: { ...v.scores, [criterionId]: { ...v.scores[criterionId], note } } }
          : v
      )
    );
  }, []);

  const updateWeight = useCallback((categoryId: string, value: number) => {
    setWeights((prev) => ({ ...prev, [categoryId]: value }));
  }, []);

  const totalWeight = useMemo(() => Object.values(weights).reduce((a, b) => a + b, 0), [weights]);

  /* Radar chart data */
  const radarData = useMemo(() => {
    return vendors
      .filter((v) => v.name.trim() !== "")
      .map((v) => ({
        name: v.name,
        categoryScores: CATEGORIES.map((cat) => computeCategoryScore(v, cat)),
      }));
  }, [vendors]);

  /* Recommendation */
  const recommendation = useMemo(() => generateRecommendation(vendors, weights), [vendors, weights]);

  /* Export */
  const handleExport = useCallback(() => {
    const text = formatExportText(vendors, weights);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vendor-evaluation-scorecard.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [vendors, weights]);

  /* Reset */
  const handleReset = useCallback(() => {
    setVendors([createEmptyVendor("Vendor A"), createEmptyVendor("Vendor B")]);
    setWeights({ ...DEFAULT_WEIGHTS });
    setActiveTab("scoring");
    setActiveCategoryIndex(0);
    setActiveVendorIndex(0);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Marketing Vendor Evaluation Scorecard",
    description:
      "Evaluate and compare up to 5 marketing vendors side by side across 8 weighted categories with radar chart visualization.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: {
      "@type": "Organization",
      name: "Markit Media",
      url: "https://themarkitmedia.com",
    },
  };

  const tabs = [
    { id: "scoring", label: "Scoring" },
    { id: "weights", label: "Weights" },
    { id: "results", label: "Results" },
    { id: "matrix", label: "Decision Matrix" },
  ];

  if (!loaded) return null;

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Vendor Evaluation Scorecard" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing Vendor Evaluation Scorecard
            </h1>
            <SectionDesc>
              Compare up to 5 marketing vendors or agencies side by side across 8 weighted categories.
              Score each on detailed criteria, visualize results with a radar chart, and get a
              data-driven recommendation for your decision.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Vendor name inputs */}
      <section className="px-6 lg:px-12 pb-8" aria-label="Vendor names">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <div className="border border-neutral-200 p-6 lg:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                Vendors Being Evaluated
              </h2>
              <div className="space-y-3">
                {vendors.map((vendor, vi) => (
                  <div key={vi} className="flex items-center gap-3">
                    <label className="text-base font-bold text-neutral-500 min-w-[1.5rem]">
                      {vi + 1}.
                    </label>
                    <input
                      type="text"
                      value={vendor.name}
                      onChange={(e) => updateVendorName(vi, e.target.value)}
                      placeholder={`Vendor ${vi + 1} name`}
                      className="flex-1 border border-neutral-300 px-4 py-2 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                    />
                    {vendors.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeVendor(vi)}
                        className="text-base text-neutral-500 hover:text-black px-3 py-2 border border-neutral-300 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        aria-label={`Remove ${vendor.name}`}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {vendors.length < 5 && (
                <button
                  type="button"
                  onClick={addVendor}
                  className="mt-4 text-base font-bold text-black border border-black px-6 py-2 hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  + Add Vendor
                </button>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* Tab navigation */}
      <section className="px-6 lg:px-12 pb-4">
        <div className="max-w-5xl mx-auto">
          <nav aria-label="Tool sections" className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                  activeTab === tab.id
                    ? "bg-black text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
                aria-current={activeTab === tab.id ? "page" : undefined}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Tab content */}
      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto">
          {/* ---- SCORING TAB ---- */}
          {activeTab === "scoring" && (
            <div>
              {/* Category selector */}
              <div className="flex flex-wrap gap-2 mb-6">
                {CATEGORIES.map((cat, ci) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategoryIndex(ci)}
                    className={`px-4 py-2 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      activeCategoryIndex === ci
                        ? "bg-black text-white"
                        : "border border-neutral-300 text-neutral-600 hover:border-black hover:text-black"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Vendor selector for mobile */}
              <div className="flex flex-wrap gap-2 mb-6 lg:hidden">
                {vendors.map((v, vi) => (
                  <button
                    key={vi}
                    type="button"
                    onClick={() => setActiveVendorIndex(vi)}
                    className={`px-4 py-2 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      activeVendorIndex === vi
                        ? "bg-black text-white"
                        : "border border-neutral-300 text-neutral-600 hover:border-black hover:text-black"
                    }`}
                  >
                    {v.name || `Vendor ${vi + 1}`}
                  </button>
                ))}
              </div>

              {/* Scoring grid */}
              {(() => {
                const cat = CATEGORIES[activeCategoryIndex];
                return (
                  <div className="border border-neutral-200">
                    <div className="bg-black text-white px-6 py-4">
                      <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                        {cat.label}
                      </h2>
                      <p className="text-base text-neutral-300 mt-1">
                        Weight: {weights[cat.id]}% — Score each criterion from 1 (poor) to 10 (excellent)
                      </p>
                    </div>
                    <div className="p-6 space-y-6">
                      {cat.criteria.map((crit) => (
                        <div key={crit.id} className="border-b border-neutral-100 pb-6 last:border-b-0 last:pb-0">
                          <div className="mb-2">
                            <h3 className="text-base font-bold text-black">{crit.label}</h3>
                            <p className="text-base text-neutral-500">{crit.description}</p>
                          </div>

                          {/* Desktop: all vendors side by side */}
                          <div className="hidden lg:grid gap-4" style={{ gridTemplateColumns: `repeat(${vendors.length}, 1fr)` }}>
                            {vendors.map((vendor, vi) => (
                              <div key={vi}>
                                <p className="text-base font-bold text-neutral-600 mb-1">
                                  {vendor.name || `Vendor ${vi + 1}`}
                                </p>
                                <ScoreInput
                                  value={vendor.scores[crit.id]?.score ?? 0}
                                  onChange={(score) => updateScore(vi, crit.id, score)}
                                  criterionId={crit.label}
                                  vendorName={vendor.name}
                                />
                                <textarea
                                  value={vendor.scores[crit.id]?.note ?? ""}
                                  onChange={(e) => updateNote(vi, crit.id, e.target.value)}
                                  placeholder="Notes..."
                                  rows={2}
                                  className="mt-2 w-full border border-neutral-200 px-3 py-2 text-base text-black bg-white resize-y focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                                />
                              </div>
                            ))}
                          </div>

                          {/* Mobile: one vendor at a time */}
                          <div className="lg:hidden">
                            {(() => {
                              const vendor = vendors[activeVendorIndex];
                              return (
                                <div>
                                  <p className="text-base font-bold text-neutral-600 mb-1">
                                    {vendor.name || `Vendor ${activeVendorIndex + 1}`}
                                  </p>
                                  <ScoreInput
                                    value={vendor.scores[crit.id]?.score ?? 0}
                                    onChange={(score) => updateScore(activeVendorIndex, crit.id, score)}
                                    criterionId={crit.label}
                                    vendorName={vendor.name}
                                  />
                                  <textarea
                                    value={vendor.scores[crit.id]?.note ?? ""}
                                    onChange={(e) => updateNote(activeVendorIndex, crit.id, e.target.value)}
                                    placeholder="Notes..."
                                    rows={2}
                                    className="mt-2 w-full border border-neutral-200 px-3 py-2 text-base text-black bg-white resize-y focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                                  />
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ---- WEIGHTS TAB ---- */}
          {activeTab === "weights" && (
            <div className="border border-neutral-200">
              <div className="bg-black text-white px-6 py-4">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                  Category Weights
                </h2>
                <p className="text-base text-neutral-300 mt-1">
                  Adjust how much each category influences the overall score. Weights must total 100%.
                </p>
              </div>
              <div className="p-6 space-y-4">
                {CATEGORIES.map((cat) => (
                  <div key={cat.id} className="flex items-center gap-4">
                    <label
                      htmlFor={`weight-${cat.id}`}
                      className="text-base font-bold text-black min-w-[140px]"
                    >
                      {cat.label}
                    </label>
                    <input
                      id={`weight-${cat.id}`}
                      type="range"
                      min={0}
                      max={50}
                      step={1}
                      value={weights[cat.id]}
                      onChange={(e) => updateWeight(cat.id, Number(e.target.value))}
                      className="flex-1 accent-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                    />
                    <span className="text-base font-bold text-black min-w-[3rem] text-right tabular-nums">
                      {weights[cat.id]}%
                    </span>
                  </div>
                ))}
                <div className="border-t border-neutral-200 pt-4 mt-4 flex items-center justify-between">
                  <span className="text-base font-bold text-black">Total</span>
                  <span
                    className={`text-base font-bold tabular-nums ${
                      totalWeight === 100 ? "text-black" : "text-neutral-500"
                    }`}
                  >
                    {totalWeight}%{" "}
                    {totalWeight !== 100 && (
                      <span className="text-neutral-500 font-normal">(should be 100%)</span>
                    )}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setWeights({ ...DEFAULT_WEIGHTS })}
                  className="text-base font-bold text-neutral-600 border border-neutral-300 px-4 py-2 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Reset to Defaults
                </button>
              </div>
            </div>
          )}

          {/* ---- RESULTS TAB ---- */}
          {activeTab === "results" && (
            <div className="space-y-12">
              {/* Radar chart */}
              {radarData.length > 0 && radarData.some((v) => v.categoryScores.some((s) => s > 0)) && (
                <Animate animation="fade-up">
                  <div className="border border-neutral-200 p-6 lg:p-8">
                    <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                      Radar Comparison
                    </h2>
                    <RadarChart vendorData={radarData} />
                  </div>
                </Animate>
              )}

              {/* Scorecard table */}
              <Animate animation="fade-up">
                <div className="border border-neutral-200">
                  <div className="bg-black text-white px-6 py-4">
                    <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                      Scorecard Breakdown
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-base">
                      <thead>
                        <tr className="border-b border-neutral-200">
                          <th className="text-left px-4 py-3 font-bold text-black">Category</th>
                          <th className="text-right px-4 py-3 font-bold text-neutral-500">Weight</th>
                          {vendors.filter((v) => v.name.trim()).map((vendor, vi) => (
                            <th key={vi} className="text-right px-4 py-3 font-bold text-black">
                              {vendor.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {CATEGORIES.map((cat) => (
                          <tr key={cat.id} className="border-b border-neutral-100">
                            <td className="px-4 py-3 font-bold text-black">{cat.label}</td>
                            <td className="px-4 py-3 text-right text-neutral-500 tabular-nums">{weights[cat.id]}%</td>
                            {vendors.filter((v) => v.name.trim()).map((vendor, vi) => {
                              const score = computeCategoryScore(vendor, cat);
                              return (
                                <td key={vi} className="px-4 py-3 text-right tabular-nums font-bold text-black">
                                  {score > 0 ? score.toFixed(1) : "—"}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                        <tr className="border-t-2 border-black">
                          <td className="px-4 py-3 font-extrabold text-black">Weighted Total</td>
                          <td className="px-4 py-3 text-right text-neutral-500 tabular-nums">{totalWeight}%</td>
                          {vendors.filter((v) => v.name.trim()).map((vendor, vi) => {
                            const total = computeWeightedTotal(vendor, weights);
                            return (
                              <td key={vi} className="px-4 py-3 text-right tabular-nums font-extrabold text-black">
                                {total > 0 ? total.toFixed(2) : "—"}
                              </td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Animate>

              {/* Strengths and Weaknesses per vendor */}
              {vendors
                .filter((v) => v.name.trim())
                .map((vendor, vi) => {
                  const strengths = identifyStrengths(vendor);
                  const weaknesses = identifyWeaknesses(vendor);
                  if (strengths.length === 0 && weaknesses.length === 0) return null;
                  return (
                    <Animate key={vi} animation="fade-up">
                      <div className="border border-neutral-200">
                        <div className="bg-black text-white px-6 py-4">
                          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                            {vendor.name} — Strengths and Weaknesses
                          </h2>
                        </div>
                        <div className="p-6 grid md:grid-cols-2 gap-6">
                          {strengths.length > 0 && (
                            <div>
                              <h3 className="text-base font-bold text-black mb-3">Strengths</h3>
                              <div className="space-y-2">
                                {strengths.map((s) => (
                                  <div
                                    key={s.category}
                                    className="flex justify-between items-center border-b border-neutral-100 pb-2"
                                  >
                                    <span className="text-base text-neutral-700">{s.category}</span>
                                    <span className="text-base font-bold text-black">{s.score.toFixed(1)}/10</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {weaknesses.length > 0 && (
                            <div>
                              <h3 className="text-base font-bold text-black mb-3">Weaknesses</h3>
                              <div className="space-y-2">
                                {weaknesses.map((w) => (
                                  <div
                                    key={w.category}
                                    className="flex justify-between items-center border-b border-neutral-100 pb-2"
                                  >
                                    <span className="text-base text-neutral-700">{w.category}</span>
                                    <span className="text-base font-bold text-black">{w.score.toFixed(1)}/10</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Animate>
                  );
                })}

              {/* Winner recommendation */}
              {recommendation.winner && (
                <Animate animation="fade-up">
                  <div className="border-2 border-black p-6 lg:p-8">
                    <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                      Recommendation
                    </h2>
                    <p className="text-base text-neutral-700 leading-relaxed">{recommendation.reasoning}</p>
                    <div className="mt-6 space-y-3">
                      {recommendation.scores.map((s, i) => {
                        const pct = (s.score / 10) * 100;
                        return (
                          <div key={i} className="flex items-center gap-4">
                            <span className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,2vw,1.5rem)] font-extrabold text-neutral-300 min-w-[2rem]">
                              {i + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline justify-between mb-1">
                                <span className={`text-base font-bold truncate ${i === 0 ? "text-black" : "text-neutral-600"}`}>
                                  {s.name}
                                </span>
                                <span className="text-base font-bold text-black ml-3 flex-shrink-0 tabular-nums">
                                  {s.score.toFixed(2)}/10
                                </span>
                              </div>
                              <div className="w-full bg-neutral-100 h-4">
                                <div
                                  className={`h-4 transition-all duration-500 motion-reduce:transition-none ${i === 0 ? "bg-black" : "bg-neutral-400"}`}
                                  style={{ width: `${pct}%` }}
                                  role="presentation"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Animate>
              )}
            </div>
          )}

          {/* ---- DECISION MATRIX TAB ---- */}
          {activeTab === "matrix" && (
            <Animate animation="fade-up">
              <div className="border border-neutral-200">
                <div className="bg-black text-white px-6 py-4">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                    Decision Matrix
                  </h2>
                  <p className="text-base text-neutral-300 mt-1">
                    Every criterion scored, weighted by category, with per-vendor totals.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-base">
                    <thead>
                      <tr className="border-b border-neutral-200">
                        <th className="text-left px-4 py-3 font-bold text-black">Category / Criterion</th>
                        <th className="text-right px-4 py-3 font-bold text-neutral-500">Weight</th>
                        {vendors.filter((v) => v.name.trim()).map((vendor, vi) => (
                          <th key={vi} className="text-right px-4 py-3 font-bold text-black min-w-[100px]">
                            {vendor.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {CATEGORIES.map((cat) => (
                        <>
                          <tr key={`${cat.id}-header`} className="bg-neutral-50 border-b border-neutral-200">
                            <td className="px-4 py-3 font-extrabold text-black">{cat.label}</td>
                            <td className="px-4 py-3 text-right font-bold text-neutral-500 tabular-nums">
                              {weights[cat.id]}%
                            </td>
                            {vendors.filter((v) => v.name.trim()).map((vendor, vi) => {
                              const catScore = computeCategoryScore(vendor, cat);
                              return (
                                <td key={vi} className="px-4 py-3 text-right font-bold text-black tabular-nums">
                                  {catScore > 0 ? catScore.toFixed(1) : "—"}
                                </td>
                              );
                            })}
                          </tr>
                          {cat.criteria.map((crit) => (
                            <tr key={crit.id} className="border-b border-neutral-100">
                              <td className="px-4 py-2 pl-8 text-neutral-600">{crit.label}</td>
                              <td className="px-4 py-2 text-right text-neutral-400">—</td>
                              {vendors.filter((v) => v.name.trim()).map((vendor, vi) => {
                                const s = vendor.scores[crit.id];
                                return (
                                  <td key={vi} className="px-4 py-2 text-right tabular-nums text-neutral-700">
                                    {s && s.score > 0 ? s.score : "—"}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </>
                      ))}
                      <tr className="border-t-2 border-black">
                        <td className="px-4 py-3 font-extrabold text-black">Weighted Total</td>
                        <td className="px-4 py-3 text-right font-bold text-neutral-500 tabular-nums">{totalWeight}%</td>
                        {vendors.filter((v) => v.name.trim()).map((vendor, vi) => {
                          const total = computeWeightedTotal(vendor, weights);
                          return (
                            <td key={vi} className="px-4 py-3 text-right font-extrabold text-black tabular-nums">
                              {total > 0 ? total.toFixed(2) : "—"}
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Animate>
          )}
        </div>
      </section>

      {/* Action buttons */}
      <section className="px-6 lg:px-12 pb-12">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleExport}
            className="bg-black text-white px-6 py-3 text-base font-bold hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
          >
            Export as .txt
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="border border-neutral-300 text-neutral-600 px-6 py-3 text-base font-bold hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
          >
            Reset Scorecard
          </button>
        </div>
      </section>

      {/* Best practices */}
      <section className="px-6 lg:px-12 py-16 bg-neutral-50" aria-label="Vendor selection best practices">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Best Practices</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight">
              Vendor Selection Best Practices
            </h2>
            <SectionDesc>
              A structured evaluation process leads to better partnerships. Keep these principles in mind.
            </SectionDesc>
          </Animate>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {BEST_PRACTICES.map((bp, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <div className="border border-neutral-200 bg-white p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                    {bp.title}
                  </h3>
                  <p className="text-base text-neutral-600 leading-relaxed">{bp.body}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <Animate animation="fade-up">
            <SectionLabel>Next Step</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-3">
              Need Help Choosing the Right Marketing Partner?
            </h2>
            <p className="text-lg text-neutral-500 leading-relaxed mt-4 max-w-2xl mx-auto">
              We help businesses evaluate their marketing needs and build strategies that deliver measurable results.
              Let us show you what a transparent, results-focused partnership looks like.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-block bg-black text-white px-8 py-4 text-base font-bold hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Get in Touch
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Vendor Evaluation"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Team Capacity Planner", href: "/resources/team-capacity-planner" },
          { title: "Tech Stack Advisor", href: "/resources/tech-stack-advisor" },
          { title: "Utm Builder", href: "/resources/utm-builder" },
          { title: "Web Platform Guide", href: "/resources/web-platform-guide" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
