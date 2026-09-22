"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Dimension {
  key: string;
  label: string;
  description: string;
}

interface ContentPiece {
  id: string;
  name: string;
  scores: Record<string, number>;
}

interface Weights {
  [key: string]: number;
}

type Tier = "Top Performer" | "Average" | "Underperformer" | "Needs Update";

interface TierInfo {
  label: Tier;
  range: [number, number];
  description: string;
  actions: string[];
}

interface StoredState {
  pieces: ContentPiece[];
  weights: Weights;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "markit-content-performance-scorecard";

const dimensions: Dimension[] = [
  {
    key: "traffic",
    label: "Traffic",
    description:
      "Volume and quality of visitors this content attracts through organic search, social, referral, and direct channels.",
  },
  {
    key: "engagement",
    label: "Engagement",
    description:
      "How users interact with the content: time on page, scroll depth, comments, and interaction signals.",
  },
  {
    key: "conversions",
    label: "Conversions",
    description:
      "How effectively the content drives desired actions: sign-ups, downloads, purchases, or lead captures.",
  },
  {
    key: "social",
    label: "Social Shares",
    description:
      "How often the content is shared across social platforms, indicating audience resonance and reach.",
  },
  {
    key: "backlinks",
    label: "Backlinks",
    description:
      "The number and quality of external sites linking to this content, signaling authority and trust.",
  },
  {
    key: "seo",
    label: "SEO Ranking",
    description:
      "How well the content ranks for target keywords in search engine results pages.",
  },
  {
    key: "freshness",
    label: "Freshness",
    description:
      "How current and up-to-date the content is, including recent updates, accurate data, and relevance.",
  },
  {
    key: "audience",
    label: "Audience Fit",
    description:
      "How well the content matches the target audience's needs, intent, and stage in the buyer journey.",
  },
];

const defaultWeights: Weights = Object.fromEntries(
  dimensions.map((d) => [d.key, 1])
);

const tiers: TierInfo[] = [
  {
    label: "Top Performer",
    range: [8, 10],
    description:
      "This content is a proven asset. It drives results across multiple dimensions and sets the standard for your library.",
    actions: [
      "Promote heavily across all channels",
      "Use as a template for future content",
      "Add internal links from lower-performing pages",
      "Repurpose into other formats (video, infographic, podcast)",
      "Update regularly to maintain its edge",
    ],
  },
  {
    label: "Average",
    range: [5, 7.99],
    description:
      "Solid content with room for improvement. A few targeted optimizations can push it into top-performer territory.",
    actions: [
      "Optimize headlines and meta descriptions for higher CTR",
      "Add stronger calls-to-action",
      "Improve internal linking to boost SEO",
      "Refresh outdated statistics or examples",
      "Test different content formats or angles",
    ],
  },
  {
    label: "Underperformer",
    range: [3, 4.99],
    description:
      "This content is not meeting expectations. It needs significant revisions or a different strategic approach.",
    actions: [
      "Audit for keyword targeting and search intent alignment",
      "Rewrite weak sections or restructure entirely",
      "Add original data, visuals, or expert insights",
      "Consolidate with similar content to avoid cannibalization",
      "Relaunch with a fresh promotion push after improvements",
    ],
  },
  {
    label: "Needs Update",
    range: [1, 2.99],
    description:
      "This content is dragging down your portfolio. Consider a complete overhaul, merger with stronger pieces, or retirement.",
    actions: [
      "Evaluate whether the topic still serves your audience",
      "Merge with higher-performing related content",
      "Redirect to a better-performing page if retiring",
      "Completely rewrite with new research and angles",
      "Remove from navigation and internal links if retiring",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function createEmptyPiece(name: string): ContentPiece {
  return {
    id: generateId(),
    name,
    scores: Object.fromEntries(dimensions.map((d) => [d.key, 5])),
  };
}

function getWeightedScore(piece: ContentPiece, weights: Weights): number {
  let totalWeight = 0;
  let weightedSum = 0;
  for (const dim of dimensions) {
    const w = weights[dim.key] ?? 1;
    weightedSum += (piece.scores[dim.key] ?? 0) * w;
    totalWeight += w;
  }
  if (totalWeight === 0) return 0;
  return weightedSum / totalWeight;
}

function getTier(score: number): TierInfo {
  for (const tier of tiers) {
    if (score >= tier.range[0] && score <= tier.range[1]) return tier;
  }
  return tiers[tiers.length - 1];
}

function getPortfolioDistribution(
  pieces: ContentPiece[],
  weights: Weights
): Record<Tier, number> {
  const dist: Record<Tier, number> = {
    "Top Performer": 0,
    Average: 0,
    Underperformer: 0,
    "Needs Update": 0,
  };
  for (const piece of pieces) {
    const score = getWeightedScore(piece, weights);
    const tier = getTier(score);
    dist[tier.label]++;
  }
  return dist;
}

/* ------------------------------------------------------------------ */
/*  Format results as plain text for export                            */
/* ------------------------------------------------------------------ */

function formatResultsText(pieces: ContentPiece[], weights: Weights): string {
  const lines: string[] = [];
  lines.push("CONTENT PERFORMANCE SCORECARD RESULTS");
  lines.push("=".repeat(55));
  lines.push("");

  lines.push("DIMENSION WEIGHTS");
  lines.push("-".repeat(30));
  for (const dim of dimensions) {
    lines.push(`  ${dim.label}: ${weights[dim.key]}x`);
  }
  lines.push("");

  for (const piece of pieces) {
    const score = getWeightedScore(piece, weights);
    const tier = getTier(score);
    lines.push(`CONTENT: ${piece.name}`);
    lines.push("-".repeat(40));
    lines.push(`  Overall Score: ${score.toFixed(2)} / 10`);
    lines.push(`  Tier: ${tier.label}`);
    lines.push("");
    lines.push("  Dimension Scores:");
    for (const dim of dimensions) {
      lines.push(`    ${dim.label}: ${piece.scores[dim.key]} / 10`);
    }
    lines.push("");
    lines.push("  Recommended Actions:");
    tier.actions.forEach((action, i) =>
      lines.push(`    ${i + 1}. ${action}`)
    );
    lines.push("");
  }

  if (pieces.length > 0) {
    const dist = getPortfolioDistribution(pieces, weights);
    lines.push("PORTFOLIO DISTRIBUTION");
    lines.push("-".repeat(30));
    for (const [label, count] of Object.entries(dist)) {
      const pct =
        pieces.length > 0 ? ((count / pieces.length) * 100).toFixed(0) : "0";
      lines.push(`  ${label}: ${count} (${pct}%)`);
    }
    lines.push("");
  }

  lines.push("Generated by Markit Media Content Performance Scorecard");
  lines.push(
    "https://themarkitmedia.com/resources/content-performance-scorecard"
  );

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function DownloadButton({
  text,
  filename,
}: {
  text: string;
  filename: string;
}) {
  const download = useCallback(() => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [text, filename]);

  return (
    <button
      onClick={download}
      aria-label="Download results as text file"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold bg-black text-white hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      Export as .txt
    </button>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard API unavailable */
    }
  }, [text]);

  return (
    <button
      onClick={copy}
      aria-label="Copy results to clipboard"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      {copied ? "Copied" : "Copy Results"}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Radar Chart                                                        */
/* ------------------------------------------------------------------ */

const CHART_COLORS = ["#000000", "#737373", "#a3a3a3"];

function RadarChart({
  pieces,
  weights,
}: {
  pieces: ContentPiece[];
  weights: Weights;
}) {
  const size = 400;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 130;
  const levels = 5;
  const displayed = pieces.slice(0, 3);
  const angleSlice = (2 * Math.PI) / dimensions.length;

  function polarToCartesian(
    angle: number,
    r: number
  ): { x: number; y: number } {
    return {
      x: cx + r * Math.cos(angle - Math.PI / 2),
      y: cy + r * Math.sin(angle - Math.PI / 2),
    };
  }

  const gridRings = Array.from({ length: levels }, (_, i) => {
    const r = (radius / levels) * (i + 1);
    const points = dimensions
      .map((_, j) => {
        const p = polarToCartesian(j * angleSlice, r);
        return `${p.x},${p.y}`;
      })
      .join(" ");
    return (
      <polygon
        key={i}
        points={points}
        fill="none"
        stroke="#e5e5e5"
        strokeWidth="1"
      />
    );
  });

  const axes = dimensions.map((_, i) => {
    const p = polarToCartesian(i * angleSlice, radius);
    return (
      <line
        key={i}
        x1={cx}
        y1={cy}
        x2={p.x}
        y2={p.y}
        stroke="#e5e5e5"
        strokeWidth="1"
      />
    );
  });

  const labels = dimensions.map((dim, i) => {
    const p = polarToCartesian(i * angleSlice, radius + 35);
    const words = dim.label.split(" ");
    return (
      <text
        key={i}
        x={p.x}
        y={p.y}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-black"
        style={{ fontSize: "16px", fontWeight: 700 }}
      >
        {words.map((word, wi) => (
          <tspan key={wi} x={p.x} dy={wi === 0 ? 0 : 18}>
            {word}
          </tspan>
        ))}
      </text>
    );
  });

  const dataPolygons = displayed.map((piece, pi) => {
    const dataPoints = dimensions.map((dim, i) => {
      const score = piece.scores[dim.key] ?? 0;
      const r = (score / 10) * radius;
      return polarToCartesian(i * angleSlice, r);
    });
    const path = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");
    const color = CHART_COLORS[pi % CHART_COLORS.length];

    return (
      <g key={piece.id}>
        <polygon
          points={path}
          fill={color}
          fillOpacity={0.08 + pi * 0.04}
          stroke={color}
          strokeWidth="2"
          strokeDasharray={pi === 0 ? "none" : pi === 1 ? "8 4" : "4 4"}
        />
        {dataPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill={color} />
        ))}
      </g>
    );
  });

  const legendY = size - 20;

  return (
    <svg
      viewBox={`0 0 ${size} ${size + 30}`}
      className="w-full max-w-[420px] mx-auto"
      role="img"
      aria-label={`Radar chart comparing content pieces: ${displayed.map((p) => p.name).join(", ")}`}
    >
      {gridRings}
      {axes}
      {dataPolygons}
      {labels}
      {/* Scale labels */}
      {Array.from({ length: levels }, (_, i) => {
        const val = ((i + 1) * 10) / levels;
        const p = polarToCartesian(0, ((i + 1) * radius) / levels);
        return (
          <text
            key={i}
            x={p.x + 8}
            y={p.y}
            className="fill-neutral-400"
            style={{ fontSize: "16px" }}
          >
            {val}
          </text>
        );
      })}
      {/* Legend */}
      {displayed.map((piece, pi) => {
        const color = CHART_COLORS[pi % CHART_COLORS.length];
        const xStart = 20 + pi * 140;
        return (
          <g key={piece.id}>
            <line
              x1={xStart}
              y1={legendY + 8}
              x2={xStart + 20}
              y2={legendY + 8}
              stroke={color}
              strokeWidth="3"
              strokeDasharray={
                pi === 0 ? "none" : pi === 1 ? "8 4" : "4 4"
              }
            />
            <text
              x={xStart + 26}
              y={legendY + 12}
              className="fill-black"
              style={{ fontSize: "16px", fontWeight: 600 }}
            >
              {piece.name.length > 14
                ? piece.name.slice(0, 14) + "..."
                : piece.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Portfolio Bar Chart                                                 */
/* ------------------------------------------------------------------ */

function PortfolioBar({
  pieces,
  weights,
}: {
  pieces: ContentPiece[];
  weights: Weights;
}) {
  const dist = getPortfolioDistribution(pieces, weights);
  const total = pieces.length;
  if (total === 0) return null;

  const bars: { label: Tier; count: number; pct: number }[] = (
    Object.keys(dist) as Tier[]
  ).map((label) => ({
    label,
    count: dist[label],
    pct: Math.round((dist[label] / total) * 100),
  }));

  return (
    <div className="space-y-3">
      {bars.map((bar) => (
        <div key={bar.label}>
          <div className="flex justify-between mb-1">
            <span className="text-base font-bold text-black">{bar.label}</span>
            <span className="text-base text-neutral-500">
              {bar.count} ({bar.pct}%)
            </span>
          </div>
          <div
            className="w-full bg-neutral-200 h-3"
            role="progressbar"
            aria-valuenow={bar.pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${bar.label}: ${bar.pct}%`}
          >
            <div
              className="bg-black h-3 transition-all motion-reduce:transition-none"
              style={{ width: `${bar.pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Slider Input                                                       */
/* ------------------------------------------------------------------ */

function SliderInput({
  label,
  value,
  onChange,
  min = 1,
  max = 10,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-4">
      <label className="text-base font-bold text-black min-w-[140px]">
        {label}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-2 bg-neutral-200 appearance-none cursor-pointer accent-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
        aria-label={`${label}: ${value} out of ${max}`}
      />
      <span className="text-base font-bold text-black min-w-[40px] text-center">
        {value}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function ContentPerformanceScorecardPage() {
  const [pieces, setPieces] = useState<ContentPiece[]>([]);
  const [weights, setWeights] = useState<Weights>({ ...defaultWeights });
  const [newName, setNewName] = useState("");
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [loaded, setLoaded] = useState(false);

  /* ---- localStorage persistence ---- */

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: StoredState = JSON.parse(raw);
        if (parsed.pieces && Array.isArray(parsed.pieces)) {
          setPieces(parsed.pieces);
          if (parsed.pieces.length > 0) {
            setActiveTab(parsed.pieces[0].id);
          }
        }
        if (parsed.weights) {
          setWeights(parsed.weights);
        }
      }
    } catch {
      /* ignore corrupt storage */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      const state: StoredState = { pieces, weights };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full or unavailable */
    }
  }, [pieces, weights, loaded]);

  /* ---- Handlers ---- */

  function handleAddPiece() {
    const trimmed = newName.trim();
    if (!trimmed) return;
    const piece = createEmptyPiece(trimmed);
    setPieces((prev) => [...prev, piece]);
    setActiveTab(piece.id);
    setNewName("");
    setShowResults(false);
  }

  function handleRemovePiece(id: string) {
    setPieces((prev) => {
      const next = prev.filter((p) => p.id !== id);
      if (activeTab === id) {
        setActiveTab(next.length > 0 ? next[0].id : null);
      }
      return next;
    });
    setShowResults(false);
  }

  function handleScoreChange(pieceId: string, dimKey: string, value: number) {
    setPieces((prev) =>
      prev.map((p) =>
        p.id === pieceId
          ? { ...p, scores: { ...p.scores, [dimKey]: value } }
          : p
      )
    );
  }

  function handleWeightChange(dimKey: string, value: number) {
    setWeights((prev) => ({ ...prev, [dimKey]: value }));
  }

  function handleReset() {
    setPieces([]);
    setWeights({ ...defaultWeights });
    setActiveTab(null);
    setShowResults(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleShowResults() {
    if (pieces.length > 0) {
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const activePiece = pieces.find((p) => p.id === activeTab) ?? null;
  const sortedPieces = [...pieces].sort(
    (a, b) => getWeightedScore(b, weights) - getWeightedScore(a, weights)
  );
  const plainText = formatResultsText(pieces, weights);

  return (
    <article className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Content Performance Scorecard",
          description:
            "Free interactive tool to score content across 8 dimensions, compare multiple pieces with radar charts, and get tier-based action recommendations.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Content Performance Scorecard" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Content Performance Scorecard
            </h1>
            <SectionDesc>
              Score your content across 8 key dimensions, compare multiple
              pieces side-by-side with radar charts, and get tier-based
              action recommendations to optimize your content portfolio.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {!showResults ? (
        <>
          {/* ---- Add Content Pieces ---- */}
          <section className="px-6 lg:px-12 py-8" aria-label="Add content">
            <div className="max-w-3xl mx-auto">
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold text-black mb-4">
                  Add Content Pieces
                </h2>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddPiece();
                    }}
                    placeholder="Enter content title or URL..."
                    className="flex-1 min-h-[44px] px-4 py-3 text-base border border-neutral-300 text-black placeholder:text-neutral-400 bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                    aria-label="Content piece name"
                  />
                  <button
                    onClick={handleAddPiece}
                    disabled={!newName.trim()}
                    className="min-w-[44px] min-h-[44px] px-6 py-3 text-base font-bold bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-300 disabled:text-neutral-500 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    Add
                  </button>
                </div>

                {pieces.length > 0 && (
                  <p className="text-base text-neutral-500 mt-3">
                    {pieces.length} content piece{pieces.length !== 1 && "s"}{" "}
                    added. Select one below to score it.
                  </p>
                )}
              </Animate>
            </div>
          </section>

          {/* ---- Content Piece Tabs ---- */}
          {pieces.length > 0 && (
            <section className="px-6 lg:px-12 pb-4" aria-label="Content tabs">
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-wrap gap-2">
                  {pieces.map((piece) => (
                    <div key={piece.id} className="flex items-stretch">
                      <button
                        onClick={() => setActiveTab(piece.id)}
                        className={`min-h-[44px] px-4 py-2 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                          activeTab === piece.id
                            ? "bg-black text-white"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                        }`}
                      >
                        {piece.name.length > 25
                          ? piece.name.slice(0, 25) + "..."
                          : piece.name}
                      </button>
                      <button
                        onClick={() => handleRemovePiece(piece.id)}
                        aria-label={`Remove ${piece.name}`}
                        className="min-w-[36px] min-h-[44px] px-2 text-base font-bold bg-neutral-200 text-neutral-600 hover:bg-neutral-800 hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ---- Score Active Piece ---- */}
          {activePiece && (
            <section
              className="px-6 lg:px-12 py-8"
              aria-label={`Score ${activePiece.name}`}
            >
              <div className="max-w-3xl mx-auto">
                <Animate animation="fade-up" key={activePiece.id}>
                  <div className="border border-neutral-200">
                    <div className="bg-black text-white px-6 py-5">
                      <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold">
                        Scoring: {activePiece.name}
                      </h2>
                      <p className="text-base text-neutral-400 mt-1">
                        Rate each dimension from 1 (lowest) to 10 (highest)
                      </p>
                    </div>
                    <div className="p-6 space-y-6">
                      {dimensions.map((dim) => (
                        <div key={dim.key}>
                          <SliderInput
                            label={dim.label}
                            value={activePiece.scores[dim.key] ?? 5}
                            onChange={(v) =>
                              handleScoreChange(activePiece.id, dim.key, v)
                            }
                          />
                          <p className="text-base text-neutral-500 mt-1 ml-[156px]">
                            {dim.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Animate>
              </div>
            </section>
          )}

          {/* ---- Customize Weights ---- */}
          <section
            className="px-6 lg:px-12 py-8"
            aria-label="Customize weights"
          >
            <div className="max-w-3xl mx-auto">
              <Animate animation="fade-up">
                <div className="border border-neutral-200">
                  <div className="bg-neutral-100 px-6 py-5">
                    <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold text-black">
                      Dimension Weights
                    </h2>
                    <p className="text-base text-neutral-500 mt-1">
                      Adjust weights to reflect what matters most for your
                      content strategy. Higher weight means more influence on
                      the overall score.
                    </p>
                  </div>
                  <div className="p-6 space-y-4">
                    {dimensions.map((dim) => (
                      <SliderInput
                        key={dim.key}
                        label={dim.label}
                        value={weights[dim.key] ?? 1}
                        onChange={(v) => handleWeightChange(dim.key, v)}
                        min={0}
                        max={5}
                      />
                    ))}
                    <button
                      onClick={() => setWeights({ ...defaultWeights })}
                      className="min-w-[44px] min-h-[44px] px-4 py-2 text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                    >
                      Reset to Equal Weights
                    </button>
                  </div>
                </div>
              </Animate>
            </div>
          </section>

          {/* ---- Submit ---- */}
          {pieces.length > 0 && (
            <section aria-label="Content section" className="px-6 lg:px-12 py-8">
              <div className="max-w-3xl mx-auto text-center">
                <button
                  onClick={handleShowResults}
                  className="min-w-[44px] min-h-[44px] px-10 py-4 text-base font-bold bg-black text-white hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  View Results &rarr;
                </button>
              </div>
            </section>
          )}
        </>
      ) : (
        <>
          {/* ---- Results Section ---- */}
          <section className="px-6 lg:px-12 py-8" aria-label="Results">
            <div className="max-w-4xl mx-auto">
              <Animate animation="fade-up">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight">
                    Results
                  </h2>
                  <button
                    onClick={() => setShowResults(false)}
                    className="min-w-[44px] min-h-[44px] px-4 py-2 text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    &larr; Edit Scores
                  </button>
                </div>
              </Animate>

              {/* ---- Ranked Table ---- */}
              <Animate animation="fade-up" delay={100}>
                <div className="border border-neutral-200 mb-8 overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-black text-white">
                        <th className="px-4 py-3 text-base font-bold">Rank</th>
                        <th className="px-4 py-3 text-base font-bold">
                          Content
                        </th>
                        <th className="px-4 py-3 text-base font-bold">
                          Score
                        </th>
                        <th className="px-4 py-3 text-base font-bold">Tier</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedPieces.map((piece, i) => {
                        const score = getWeightedScore(piece, weights);
                        const tier = getTier(score);
                        return (
                          <tr
                            key={piece.id}
                            className={
                              i % 2 === 0 ? "bg-white" : "bg-neutral-50"
                            }
                          >
                            <td className="px-4 py-3 text-base font-bold text-black">
                              {i + 1}
                            </td>
                            <td className="px-4 py-3 text-base text-black">
                              {piece.name}
                            </td>
                            <td className="px-4 py-3 text-base font-bold text-black">
                              {score.toFixed(2)}
                            </td>
                            <td className="px-4 py-3 text-base font-bold text-black">
                              {tier.label}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Animate>

              {/* ---- Radar Chart (top 3) ---- */}
              {pieces.length > 0 && (
                <Animate animation="fade-up" delay={200}>
                  <div className="border border-neutral-200 p-6 mb-8">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4 text-center">
                      Radar Comparison{" "}
                      {pieces.length > 3 ? "(Top 3)" : ""}
                    </h3>
                    <RadarChart
                      pieces={sortedPieces.slice(0, 3)}
                      weights={weights}
                    />
                  </div>
                </Animate>
              )}

              {/* ---- Per-piece Details ---- */}
              <Stagger stagger={100} className="space-y-6 mb-8">
                {sortedPieces.map((piece) => {
                  const score = getWeightedScore(piece, weights);
                  const tier = getTier(score);
                  return (
                    <div key={piece.id} className="border border-neutral-200">
                      <div className="bg-neutral-100 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                            {piece.name}
                          </h3>
                          <p className="text-base text-neutral-500 mt-1">
                            Weighted Score: {score.toFixed(2)} / 10 &mdash;{" "}
                            {tier.label}
                          </p>
                        </div>
                        <div className="px-4 py-2 bg-black text-white text-base font-bold">
                          {score.toFixed(1)}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          {dimensions.map((dim) => (
                            <div
                              key={dim.key}
                              className="text-center border border-neutral-100 p-3"
                            >
                              <p className="text-base text-neutral-500">
                                {dim.label}
                              </p>
                              <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
                                {piece.scores[dim.key]}
                              </p>
                            </div>
                          ))}
                        </div>
                        <p className="text-base text-neutral-600 mb-3">
                          {tier.description}
                        </p>
                        <h4 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-2">
                          Recommended Actions
                        </h4>
                        <ul className="space-y-2">
                          {tier.actions.map((action, ai) => (
                            <li
                              key={ai}
                              className="flex items-start gap-2 text-base text-neutral-600"
                            >
                              <span
                                className="mt-1 block w-2 h-2 bg-black flex-shrink-0"
                                aria-hidden="true"
                              />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </Stagger>

              {/* ---- Portfolio Distribution ---- */}
              {pieces.length > 1 && (
                <Animate animation="fade-up">
                  <div className="border border-neutral-200 p-6 mb-8">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                      Content Portfolio Distribution
                    </h3>
                    <PortfolioBar pieces={pieces} weights={weights} />
                  </div>
                </Animate>
              )}

              {/* ---- Export / Reset ---- */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <DownloadButton
                  text={plainText}
                  filename="content-performance-scorecard.txt"
                />
                <CopyButton text={plainText} />
                <button
                  onClick={handleReset}
                  className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border-2 border-black text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Start Over
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ---- Educational Section ---- */}
      <section aria-label="Learn" className="px-6 lg:px-12 py-20 border-t border-neutral-200">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Learn</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-3 mb-8">
              How to Measure Content Performance
            </h2>
          </Animate>

          <Stagger stagger={100} className="space-y-8">
            <div className="border border-neutral-200 p-6">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                Why Score Content Across Multiple Dimensions?
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed">
                A single metric like page views tells only part of the story.
                Content that drives high traffic but zero conversions is not
                performing well. By evaluating 8 dimensions simultaneously, you
                get a holistic view of each piece&apos;s contribution to your
                business goals. This multi-dimensional approach reveals hidden
                gems (high conversion, low traffic) and overrated content (high
                traffic, low engagement).
              </p>
            </div>

            <div className="border border-neutral-200 p-6">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                Understanding the 8 Dimensions
              </h3>
              <ul className="space-y-3">
                {dimensions.map((dim) => (
                  <li
                    key={dim.key}
                    className="text-base text-neutral-600 leading-relaxed"
                  >
                    <span className="font-bold text-black">{dim.label}:</span>{" "}
                    {dim.description}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-neutral-200 p-6">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                Using Custom Weights Effectively
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed">
                Not all dimensions matter equally for every business. An
                e-commerce site might weight Conversions at 5x while a media
                company prioritizes Traffic and Engagement. Adjust the weights
                to match your goals. If you are building brand awareness, weight
                Social Shares and Backlinks higher. If you are focused on
                lead generation, Conversions and Audience Fit should dominate.
              </p>
            </div>

            <div className="border border-neutral-200 p-6">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                Acting on Tier Classifications
              </h3>
              <div className="space-y-4">
                {tiers.map((tier) => (
                  <div key={tier.label}>
                    <p className="text-base text-black font-bold">
                      {tier.label} ({tier.range[0]}&ndash;{tier.range[1]})
                    </p>
                    <p className="text-base text-neutral-600">
                      {tier.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-neutral-200 p-6">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                Building a Content Review Cadence
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed">
                Score your content quarterly. Pull analytics data from Google
                Analytics, Search Console, and your social platforms to inform
                each dimension rating. Track scores over time to see whether
                your optimization efforts are working. A healthy content
                portfolio has at least 30% Top Performers, no more than 20%
                in the Needs Update tier, and a clear pipeline of Average
                content being optimized upward.
              </p>
            </div>
          </Stagger>
        </div>
      </section>

      {/* ---- Performance Tiers Reference ---- */}
      <section aria-label="Reference" className="px-6 lg:px-12 py-20 border-t border-neutral-200">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Reference</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-3 mb-8">
              Performance Tiers
            </h2>
          </Animate>

          <Stagger stagger={100} className="space-y-6">
            {tiers.map((tier) => (
              <div key={tier.label} className="border border-neutral-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="min-w-[80px] text-center px-3 py-2 bg-black text-white font-bold text-base">
                    {tier.range[0]}&ndash;{tier.range[1]}
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                      {tier.label}
                    </h3>
                    <p className="text-base text-neutral-600 mt-1">
                      {tier.description}
                    </p>
                    <ul className="mt-3 space-y-1">
                      {tier.actions.map((action, ai) => (
                        <li
                          key={ai}
                          className="flex items-start gap-2 text-base text-neutral-500"
                        >
                          <span
                            className="mt-1 block w-2 h-2 bg-black flex-shrink-0"
                            aria-hidden="true"
                          />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Related Tools ---- */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
            Related Tools
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/resources/content-audit-scorecard"
              className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Content Audit Scorecard
            </Link>
            <Link
              href="/resources/content-roi-calculator"
              className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Content ROI Calculator
            </Link>
            <Link
              href="/resources/content-gap-finder"
              className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Content Gap Finder
            </Link>
            <Link
              href="/resources/content-calendar"
              className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Content Calendar
            </Link>
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Maximize Your Content ROI?
            </h2>
            <p className="text-lg text-neutral-400 mt-4 mb-8">
              Our team can audit your content portfolio, identify high-impact
              opportunities, and build a data-driven optimization plan. Let us
              turn your scorecard into measurable results.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Content Performance Scorecard"
        services={[
          { title: "Content Marketing", desc: "Strategic content that drives traffic, engagement, and conversions.", href: "/services/content-marketing" },
          { title: "SEO", desc: "Content optimized for search engines and human readers alike.", href: "/services/seo" },
          { title: "Social Media Marketing", desc: "Distribute your content where your audience already is.", href: "/services/social-media-marketing" },
        ]}
        relatedTools={[
          { title: "Content Calendar", href: "/resources/content-calendar" },
          { title: "Content Gap Analyzer", href: "/resources/content-gap-analyzer" },
          { title: "Content Gap Finder", href: "/resources/content-gap-finder" },
          { title: "Content Pillar Planner", href: "/resources/content-pillar-planner" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
