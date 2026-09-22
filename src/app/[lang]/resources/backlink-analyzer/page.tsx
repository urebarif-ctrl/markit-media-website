"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

type LinkType = "dofollow" | "nofollow" | "sponsored" | "ugc";
type SourceType = "blog" | "directory" | "news" | "forum" | "social" | "other";

interface Backlink {
  id: string;
  url: string;
  anchorText: string;
  da: number;
  linkType: LinkType;
  sourceType: SourceType;
  qualityScore: number;
}

const LINK_TYPES: LinkType[] = ["dofollow", "nofollow", "sponsored", "ugc"];
const SOURCE_TYPES: SourceType[] = ["blog", "directory", "news", "forum", "social", "other"];
const STORAGE_KEY = "markit-backlink-analyzer";

const LINK_TYPE_LABELS: Record<LinkType, string> = {
  dofollow: "Dofollow",
  nofollow: "Nofollow",
  sponsored: "Sponsored",
  ugc: "UGC",
};

const SOURCE_TYPE_LABELS: Record<SourceType, string> = {
  blog: "Blog",
  directory: "Directory",
  news: "News",
  forum: "Forum",
  social: "Social",
  other: "Other",
};

/* ------------------------------------------------------------------ */
/*  Quality Scoring                                                    */
/* ------------------------------------------------------------------ */

function calculateQualityScore(
  da: number,
  linkType: LinkType,
  anchorText: string,
  allAnchors: string[]
): number {
  /* DA component: 0-50 points */
  const daScore = (da / 100) * 50;

  /* Link type component: 0-30 points */
  const typeScores: Record<LinkType, number> = {
    dofollow: 30,
    nofollow: 15,
    sponsored: 10,
    ugc: 8,
  };
  const typeScore = typeScores[linkType];

  /* Anchor diversity component: 0-20 points */
  let diversityScore = 20;
  if (allAnchors.length > 1) {
    const trimmed = anchorText.trim().toLowerCase();
    const total = allAnchors.length;
    const sameCount = allAnchors.filter(
      (a) => a.trim().toLowerCase() === trimmed
    ).length;
    const ratio = sameCount / total;
    if (ratio > 0.5) diversityScore = 5;
    else if (ratio > 0.3) diversityScore = 10;
    else if (ratio > 0.15) diversityScore = 15;
    else diversityScore = 20;
  }

  return Math.round(daScore + typeScore + diversityScore);
}

function qualityLabel(score: number): { label: string; tier: "high" | "medium" | "low" | "toxic" } {
  if (score >= 70) return { label: "High", tier: "high" };
  if (score >= 45) return { label: "Medium", tier: "medium" };
  if (score >= 20) return { label: "Low", tier: "low" };
  return { label: "Toxic", tier: "toxic" };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BacklinkAnalyzerPage() {
  const [links, setLinks] = useState<Backlink[]>([]);
  const [loaded, setLoaded] = useState(false);

  /* Form state */
  const [url, setUrl] = useState("");
  const [anchorText, setAnchorText] = useState("");
  const [da, setDa] = useState(30);
  const [linkType, setLinkType] = useState<LinkType>("dofollow");
  const [sourceType, setSourceType] = useState<SourceType>("blog");
  const [formError, setFormError] = useState("");

  /* ---- localStorage persistence ---- */

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setLinks(parsed);
      }
    } catch {
      /* ignore corrupt data */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
    }
  }, [links, loaded]);

  /* ---- Recalculate quality scores whenever links change ---- */

  const scoredLinks = useMemo(() => {
    const allAnchors = links.map((l) => l.anchorText);
    return links.map((l) => ({
      ...l,
      qualityScore: calculateQualityScore(l.da, l.linkType, l.anchorText, allAnchors),
    }));
  }, [links]);

  /* ---- Add backlink ---- */

  const addLink = useCallback(() => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setFormError("URL is required.");
      return;
    }
    if (!anchorText.trim()) {
      setFormError("Anchor text is required.");
      return;
    }
    setFormError("");

    const newLink: Backlink = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      url: trimmedUrl,
      anchorText: anchorText.trim(),
      da: Math.max(0, Math.min(100, da)),
      linkType,
      sourceType,
      qualityScore: 0,
    };

    setLinks((prev) => [...prev, newLink]);
    setUrl("");
    setAnchorText("");
    setDa(30);
    setLinkType("dofollow");
    setSourceType("blog");
  }, [url, anchorText, da, linkType, sourceType]);

  const removeLink = useCallback((id: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setLinks([]);
  }, []);

  /* ---- Analytics ---- */

  const totalLinks = scoredLinks.length;
  const dofollowCount = scoredLinks.filter((l) => l.linkType === "dofollow").length;
  const dofollowRatio = totalLinks > 0 ? Math.round((dofollowCount / totalLinks) * 100) : 0;
  const avgDa = totalLinks > 0 ? Math.round(scoredLinks.reduce((s, l) => s + l.da, 0) / totalLinks) : 0;

  const qualityDist = useMemo(() => {
    const dist = { high: 0, medium: 0, low: 0, toxic: 0 };
    scoredLinks.forEach((l) => {
      dist[qualityLabel(l.qualityScore).tier]++;
    });
    return dist;
  }, [scoredLinks]);

  /* DA distribution buckets: 0-10, 11-20, ... 91-100 */
  const daBuckets = useMemo(() => {
    const buckets = Array(10).fill(0) as number[];
    scoredLinks.forEach((l) => {
      const idx = l.da === 100 ? 9 : Math.floor(l.da / 10);
      buckets[idx]++;
    });
    return buckets;
  }, [scoredLinks]);

  const maxBucket = Math.max(...daBuckets, 1);

  /* Link type distribution */
  const linkTypeDist = useMemo(() => {
    const dist: Record<LinkType, number> = { dofollow: 0, nofollow: 0, sponsored: 0, ugc: 0 };
    scoredLinks.forEach((l) => {
      dist[l.linkType]++;
    });
    return dist;
  }, [scoredLinks]);

  /* Anchor text analysis */
  const anchorAnalysis = useMemo(() => {
    const freq: Record<string, number> = {};
    scoredLinks.forEach((l) => {
      const key = l.anchorText.trim().toLowerCase();
      freq[key] = (freq[key] || 0) + 1;
    });
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    const uniqueAnchors = sorted.length;
    const overOptimized =
      totalLinks >= 3 && sorted.length > 0 && sorted[0][1] / totalLinks > 0.4;
    return { sorted, uniqueAnchors, overOptimized };
  }, [scoredLinks, totalLinks]);

  /* Recommendations */
  const recommendations = useMemo(() => {
    const recs: string[] = [];
    if (totalLinks === 0) return recs;

    if (dofollowRatio < 50)
      recs.push(
        "Your dofollow ratio is below 50%. Focus on acquiring more dofollow links from authoritative sources to strengthen your link equity."
      );
    if (dofollowRatio > 90)
      recs.push(
        "Your dofollow ratio is above 90%. A natural profile typically has a mix of dofollow and nofollow links. Consider diversifying."
      );
    if (avgDa < 25)
      recs.push(
        "Your average DA is low. Prioritize outreach to higher-authority domains through guest posting, digital PR, and thought leadership content."
      );
    if (qualityDist.toxic > 0)
      recs.push(
        `You have ${qualityDist.toxic} toxic-quality link${qualityDist.toxic > 1 ? "s" : ""}. Consider disavowing these through Google Search Console to protect your site.`
      );
    if (qualityDist.low > qualityDist.high)
      recs.push(
        "Low-quality links outnumber high-quality ones. Shift your strategy toward fewer but higher-authority link placements."
      );
    if (anchorAnalysis.overOptimized)
      recs.push(
        "Your anchor text distribution appears over-optimized. Diversify with branded, URL-based, and generic anchor texts to appear more natural."
      );
    if (anchorAnalysis.uniqueAnchors < totalLinks * 0.3 && totalLinks >= 5)
      recs.push(
        "Anchor text diversity is low. Use varied anchor texts including brand names, naked URLs, and natural phrases."
      );

    const sourceTypes = new Set(scoredLinks.map((l) => l.sourceType));
    if (sourceTypes.size < 3 && totalLinks >= 5)
      recs.push(
        "Your backlinks come from few source types. A healthy profile has links from blogs, news, directories, forums, and social platforms."
      );

    if (recs.length === 0)
      recs.push(
        "Your backlink profile looks healthy. Continue building diverse, high-quality links and monitor for any toxic additions."
      );

    return recs;
  }, [totalLinks, dofollowRatio, avgDa, qualityDist, anchorAnalysis, scoredLinks]);

  /* ---- Export ---- */

  const exportTxt = useCallback(() => {
    const lines: string[] = [
      "BACKLINK PROFILE ANALYSIS",
      `Generated: ${new Date().toLocaleDateString()}`,
      "",
      "--- SUMMARY ---",
      `Total Links: ${totalLinks}`,
      `Dofollow Ratio: ${dofollowRatio}%`,
      `Average DA: ${avgDa}`,
      `Quality Distribution: High ${qualityDist.high} | Medium ${qualityDist.medium} | Low ${qualityDist.low} | Toxic ${qualityDist.toxic}`,
      "",
      "--- BACKLINKS ---",
    ];

    scoredLinks.forEach((l, i) => {
      lines.push(
        `${i + 1}. ${l.url}`,
        `   Anchor: ${l.anchorText} | DA: ${l.da} | Type: ${LINK_TYPE_LABELS[l.linkType]} | Source: ${SOURCE_TYPE_LABELS[l.sourceType]} | Quality: ${l.qualityScore}/100 (${qualityLabel(l.qualityScore).label})`
      );
    });

    lines.push("", "--- ANCHOR TEXT FREQUENCY ---");
    anchorAnalysis.sorted.forEach(([text, count]) => {
      lines.push(`  "${text}" — ${count} occurrence${count > 1 ? "s" : ""} (${totalLinks > 0 ? Math.round((count / totalLinks) * 100) : 0}%)`);
    });

    lines.push("", "--- RECOMMENDATIONS ---");
    recommendations.forEach((r, i) => {
      lines.push(`${i + 1}. ${r}`);
    });

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "backlink-profile-analysis.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  }, [scoredLinks, totalLinks, dofollowRatio, avgDa, qualityDist, anchorAnalysis, recommendations]);

  /* ---- Pie chart helpers ---- */

  function pieSlice(
    cx: number,
    cy: number,
    r: number,
    startAngle: number,
    endAngle: number
  ): string {
    const rad = (deg: number) => (deg * Math.PI) / 180;
    const x1 = cx + r * Math.cos(rad(startAngle));
    const y1 = cy + r * Math.sin(rad(startAngle));
    const x2 = cx + r * Math.cos(rad(endAngle));
    const y2 = cy + r * Math.sin(rad(endAngle));
    const large = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
  }

  /* ---- Render ---- */

  const focusClasses = "focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";
  const inputClasses = `w-full border border-neutral-300 bg-white px-4 py-3 text-base text-black placeholder:text-neutral-400 ${focusClasses}`;
  const selectClasses = `w-full border border-neutral-300 bg-white px-4 py-3 text-base text-black ${focusClasses}`;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Backlink Profile Analyzer" },
        ]}
      />

      <article className="px-6 lg:px-12 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <Animate animation="fade-up">
            <header className="mb-14">
              <SectionLabel>Free SEO Tool</SectionLabel>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
                Backlink Profile Analyzer
              </h1>
              <SectionDesc>
                Add your backlinks, analyze their quality, and get actionable
                recommendations to strengthen your link profile. Everything runs
                in your browser — no data leaves your device.
              </SectionDesc>
            </header>
          </Animate>

          {/* ---- Add Backlink Form ---- */}
          <Animate animation="fade-up" delay={100}>
            <section className="border border-neutral-200 p-6 lg:p-8 mb-10">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-6">
                Add a Backlink
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-base font-medium text-black mb-1">
                    URL <span className="text-neutral-400">*</span>
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/page"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-black mb-1">
                    Anchor Text <span className="text-neutral-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={anchorText}
                    onChange={(e) => setAnchorText(e.target.value)}
                    placeholder="e.g. best SEO tools"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-black mb-1">
                    Domain Authority (DA) — {da}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={da}
                    onChange={(e) => setDa(Number(e.target.value))}
                    className={`w-full accent-black ${focusClasses}`}
                  />
                  <div className="flex justify-between text-base text-neutral-400 mt-1">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>
                <div>
                  <label className="block text-base font-medium text-black mb-1">
                    Link Type
                  </label>
                  <select
                    value={linkType}
                    onChange={(e) => setLinkType(e.target.value as LinkType)}
                    className={selectClasses}
                  >
                    {LINK_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {LINK_TYPE_LABELS[t]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-base font-medium text-black mb-1">
                    Source Type
                  </label>
                  <select
                    value={sourceType}
                    onChange={(e) => setSourceType(e.target.value as SourceType)}
                    className={selectClasses}
                  >
                    {SOURCE_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {SOURCE_TYPE_LABELS[t]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {formError && (
                <p className="text-base text-black font-medium mb-4" role="alert">
                  {formError}
                </p>
              )}
              <button
                onClick={addLink}
                className={`bg-black text-white px-8 py-4 text-base font-bold hover:bg-neutral-800 transition-colors ${focusClasses}`}
              >
                Add Backlink
              </button>
            </section>
          </Animate>

          {/* ---- Backlinks Table ---- */}
          {scoredLinks.length > 0 && (
            <Animate animation="fade-up" delay={150}>
              <section className="border border-neutral-200 p-6 lg:p-8 mb-10">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black">
                    Your Backlinks ({totalLinks})
                  </h2>
                  <button
                    onClick={clearAll}
                    className={`border-2 border-neutral-300 text-neutral-500 px-6 py-3 text-base font-bold hover:border-black hover:text-black transition-colors ${focusClasses}`}
                  >
                    Clear All
                  </button>
                </div>
                <div className="overflow-x-auto -mx-6 px-6">
                  <table className="w-full text-left text-base">
                    <thead>
                      <tr className="border-b-2 border-black">
                        <th className="py-3 pr-4 font-bold text-black">URL</th>
                        <th className="py-3 pr-4 font-bold text-black">Anchor</th>
                        <th className="py-3 pr-4 font-bold text-black">DA</th>
                        <th className="py-3 pr-4 font-bold text-black">Type</th>
                        <th className="py-3 pr-4 font-bold text-black">Source</th>
                        <th className="py-3 pr-4 font-bold text-black">Quality</th>
                        <th className="py-3 font-bold text-black">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {scoredLinks.map((l) => {
                        const q = qualityLabel(l.qualityScore);
                        return (
                          <tr key={l.id} className="border-b border-neutral-200">
                            <td className="py-3 pr-4 text-base text-neutral-700 max-w-[200px] truncate">
                              {l.url}
                            </td>
                            <td className="py-3 pr-4 text-base text-neutral-700 max-w-[140px] truncate">
                              {l.anchorText}
                            </td>
                            <td className="py-3 pr-4 text-base text-black font-medium">
                              {l.da}
                            </td>
                            <td className="py-3 pr-4 text-base text-neutral-700">
                              {LINK_TYPE_LABELS[l.linkType]}
                            </td>
                            <td className="py-3 pr-4 text-base text-neutral-700">
                              {SOURCE_TYPE_LABELS[l.sourceType]}
                            </td>
                            <td className="py-3 pr-4 text-base font-medium text-black">
                              {l.qualityScore}{" "}
                              <span className="text-neutral-400 font-normal">
                                ({q.label})
                              </span>
                            </td>
                            <td className="py-3">
                              <button
                                onClick={() => removeLink(l.id)}
                                aria-label={`Remove ${l.url}`}
                                className={`text-base text-neutral-400 hover:text-black transition-colors ${focusClasses}`}
                              >
                                &#10005;
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            </Animate>
          )}

          {/* ---- Profile Dashboard ---- */}
          {totalLinks > 0 && (
            <>
              <Animate animation="fade-up" delay={200}>
                <section className="border border-neutral-200 p-6 lg:p-8 mb-10">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-6">
                    Profile Dashboard
                  </h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="border border-neutral-200 p-5 text-center">
                      <div className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-black">
                        {totalLinks}
                      </div>
                      <div className="text-base text-neutral-500 mt-1">Total Links</div>
                    </div>
                    <div className="border border-neutral-200 p-5 text-center">
                      <div className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-black">
                        {dofollowRatio}%
                      </div>
                      <div className="text-base text-neutral-500 mt-1">Dofollow Ratio</div>
                    </div>
                    <div className="border border-neutral-200 p-5 text-center">
                      <div className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-black">
                        {avgDa}
                      </div>
                      <div className="text-base text-neutral-500 mt-1">Average DA</div>
                    </div>
                    <div className="border border-neutral-200 p-5 text-center">
                      <div className="text-base text-black font-medium">
                        <span className="block">H {qualityDist.high}</span>
                        <span className="block">M {qualityDist.medium}</span>
                        <span className="block">L {qualityDist.low}</span>
                        <span className="block">T {qualityDist.toxic}</span>
                      </div>
                      <div className="text-base text-neutral-500 mt-1">Quality Dist.</div>
                    </div>
                  </div>
                </section>
              </Animate>

              {/* ---- DA Distribution Bar Chart ---- */}
              <Animate animation="fade-up" delay={250}>
                <section className="border border-neutral-200 p-6 lg:p-8 mb-10">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-6">
                    DA Distribution
                  </h2>
                  <svg
                    viewBox="0 0 600 300"
                    className="w-full max-w-2xl mx-auto"
                    role="img"
                    aria-label="Domain Authority distribution bar chart"
                  >
                    {/* Y axis label */}
                    <text
                      x="10"
                      y="20"
                      fontSize="16"
                      fill="#737373"
                      className="text-base"
                    >
                      Links
                    </text>
                    {/* Bars */}
                    {daBuckets.map((count, i) => {
                      const barMaxH = 200;
                      const barW = 40;
                      const gap = 14;
                      const offsetX = 60;
                      const x = offsetX + i * (barW + gap);
                      const h = maxBucket > 0 ? (count / maxBucket) * barMaxH : 0;
                      const y = 240 - h;
                      const labelStart = i * 10;
                      const labelEnd = i === 9 ? 100 : (i + 1) * 10;
                      return (
                        <g key={i}>
                          <rect
                            x={x}
                            y={240 - barMaxH}
                            width={barW}
                            height={barMaxH}
                            fill="#f5f5f5"
                          />
                          <rect x={x} y={y} width={barW} height={h} fill="#000" />
                          {count > 0 && (
                            <text
                              x={x + barW / 2}
                              y={y - 6}
                              textAnchor="middle"
                              fontSize="16"
                              fill="#000"
                              className="text-base"
                            >
                              {count}
                            </text>
                          )}
                          <text
                            x={x + barW / 2}
                            y="268"
                            textAnchor="middle"
                            fontSize="16"
                            fill="#737373"
                            className="text-base"
                          >
                            {labelStart}-{labelEnd}
                          </text>
                        </g>
                      );
                    })}
                    {/* X axis label */}
                    <text
                      x="300"
                      y="295"
                      textAnchor="middle"
                      fontSize="16"
                      fill="#737373"
                      className="text-base"
                    >
                      Domain Authority Range
                    </text>
                    {/* Baseline */}
                    <line
                      x1="55"
                      y1="240"
                      x2="595"
                      y2="240"
                      stroke="#d4d4d4"
                      strokeWidth="1"
                    />
                  </svg>
                </section>
              </Animate>

              {/* ---- Link Type Pie Chart ---- */}
              <Animate animation="fade-up" delay={300}>
                <section className="border border-neutral-200 p-6 lg:p-8 mb-10">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-6">
                    Link Type Distribution
                  </h2>
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    <svg
                      viewBox="0 0 240 240"
                      className="w-60 h-60 flex-shrink-0"
                      role="img"
                      aria-label="Link type distribution pie chart"
                    >
                      {(() => {
                        const fills = ["#000000", "#525252", "#a3a3a3", "#d4d4d4"];
                        const entries = LINK_TYPES.map((t, i) => ({
                          type: t,
                          count: linkTypeDist[t],
                          fill: fills[i],
                        }));
                        const total = entries.reduce((s, e) => s + e.count, 0);
                        if (total === 0) return null;

                        let startAngle = -90;
                        return entries.map((entry) => {
                          if (entry.count === 0) return null;
                          const sweep = (entry.count / total) * 360;
                          /* Full circle case */
                          if (sweep >= 359.99) {
                            return (
                              <circle
                                key={entry.type}
                                cx="120"
                                cy="120"
                                r="100"
                                fill={entry.fill}
                              />
                            );
                          }
                          const endAngle = startAngle + sweep;
                          const path = pieSlice(120, 120, 100, startAngle, endAngle);
                          const el = (
                            <path key={entry.type} d={path} fill={entry.fill} />
                          );
                          startAngle = endAngle;
                          return el;
                        });
                      })()}
                    </svg>
                    <div className="flex flex-wrap gap-4">
                      {(() => {
                        const fills = ["#000000", "#525252", "#a3a3a3", "#d4d4d4"];
                        return LINK_TYPES.map((t, i) => (
                          <div key={t} className="flex items-center gap-2">
                            <span
                              className="inline-block w-4 h-4 flex-shrink-0"
                              style={{ backgroundColor: fills[i] }}
                            />
                            <span className="text-base text-neutral-700">
                              {LINK_TYPE_LABELS[t]}: {linkTypeDist[t]} (
                              {totalLinks > 0
                                ? Math.round((linkTypeDist[t] / totalLinks) * 100)
                                : 0}
                              %)
                            </span>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                </section>
              </Animate>

              {/* ---- Anchor Text Analysis ---- */}
              <Animate animation="fade-up" delay={350}>
                <section className="border border-neutral-200 p-6 lg:p-8 mb-10">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-6">
                    Anchor Text Analysis
                  </h2>
                  {anchorAnalysis.overOptimized && (
                    <div className="border-2 border-black bg-neutral-50 p-4 mb-6">
                      <p className="text-base text-black font-bold">
                        Over-optimization detected
                      </p>
                      <p className="text-base text-neutral-600 mt-1">
                        Your most common anchor text appears in more than 40% of
                        links. Search engines may view this as manipulative.
                        Diversify your anchor text strategy.
                      </p>
                    </div>
                  )}
                  <p className="text-base text-neutral-500 mb-4">
                    {anchorAnalysis.uniqueAnchors} unique anchor text
                    {anchorAnalysis.uniqueAnchors !== 1 ? "s" : ""} across{" "}
                    {totalLinks} link{totalLinks !== 1 ? "s" : ""}.
                  </p>
                  <div className="space-y-3">
                    {anchorAnalysis.sorted.slice(0, 15).map(([text, count]) => {
                      const pct =
                        totalLinks > 0 ? Math.round((count / totalLinks) * 100) : 0;
                      return (
                        <div key={text} className="flex items-center gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-base text-black truncate">
                                &ldquo;{text}&rdquo;
                              </span>
                              <span className="text-base text-neutral-500 ml-2 flex-shrink-0">
                                {count} ({pct}%)
                              </span>
                            </div>
                            <div className="w-full h-2 bg-neutral-100">
                              <div
                                className="h-2 bg-black"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </Animate>

              {/* ---- Recommendations ---- */}
              <Animate animation="fade-up" delay={400}>
                <section className="border border-neutral-200 p-6 lg:p-8 mb-10">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-6">
                    Quality Improvement Recommendations
                  </h2>
                  <ul className="space-y-4">
                    {recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-7 h-7 bg-black text-white text-base font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <span className="text-base text-neutral-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </Animate>

              {/* ---- Export ---- */}
              <Animate animation="fade-up" delay={450}>
                <div className="flex flex-wrap gap-4 mb-10">
                  <button
                    onClick={exportTxt}
                    className={`bg-black text-white px-8 py-4 text-base font-bold hover:bg-neutral-800 transition-colors ${focusClasses}`}
                  >
                    Export as .txt
                  </button>
                  <button
                    onClick={clearAll}
                    className={`border-2 border-neutral-300 text-neutral-500 px-8 py-4 text-base font-bold hover:border-black hover:text-black transition-colors ${focusClasses}`}
                  >
                    Start Over
                  </button>
                </div>
              </Animate>
            </>
          )}

          {/* ---- Educational Section ---- */}
          <Animate animation="fade-up" delay={500}>
            <section className="border border-neutral-200 p-6 lg:p-8 mb-10">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-6">
                Backlink Best Practices
              </h2>
              <div className="space-y-6 text-base text-neutral-700 leading-relaxed">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mb-2">
                    What makes a quality backlink?
                  </h3>
                  <p>
                    A quality backlink comes from a relevant, authoritative
                    website. High domain authority, topical relevance, and
                    editorial placement all contribute to link value. A single
                    link from a DA 70+ news site can be worth more than dozens
                    of low-quality directory links.
                  </p>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mb-2">
                    Dofollow vs. nofollow links
                  </h3>
                  <p>
                    Dofollow links pass link equity (sometimes called &ldquo;link
                    juice&rdquo;) to your site, directly influencing rankings.
                    Nofollow links tell search engines not to pass equity, but they
                    still drive referral traffic and brand visibility. A natural
                    profile has a healthy mix of both.
                  </p>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mb-2">
                    Anchor text diversity
                  </h3>
                  <p>
                    Over-optimized anchor text (using the same exact-match keyword
                    repeatedly) is a known ranking penalty trigger. Aim for a
                    natural mix: branded anchors, naked URLs, generic phrases
                    (&ldquo;click here&rdquo;, &ldquo;learn more&rdquo;), and
                    varied keyword-related phrases.
                  </p>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mb-2">
                    Toxic links and disavowing
                  </h3>
                  <p>
                    Links from spammy, irrelevant, or penalized domains can hurt
                    your rankings. Regularly audit your backlink profile and use
                    Google&rsquo;s Disavow Tool to distance your site from toxic
                    links. Focus on quality over quantity.
                  </p>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mb-2">
                    Building links sustainably
                  </h3>
                  <p>
                    The best link building strategies focus on creating genuinely
                    valuable content that others want to reference. Guest posting,
                    original research, digital PR, and thought leadership all earn
                    links naturally. Avoid link schemes, paid link farms, and
                    private blog networks.
                  </p>
                </div>
              </div>
            </section>
          </Animate>

          {/* ---- CTA ---- */}
          <Animate animation="fade-up" delay={550}>
            <section className="bg-black text-white p-8 lg:p-12 text-center">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold mb-4">
                Need Professional Link Building?
              </h2>
              <p className="text-lg text-neutral-300 mb-8 max-w-xl mx-auto">
                Our SEO team builds high-quality backlink profiles through
                strategic outreach, digital PR, and content marketing. Let us
                strengthen your domain authority.
              </p>
              <Link
                href="/contact"
                className={`inline-block bg-white text-black px-10 py-5 text-base font-bold hover:bg-neutral-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2`}
              >
                Get a Link Building Strategy &rarr;
              </Link>
            </section>
          </Animate>
        </div>
      
      <ToolCTA
        toolName="Backlink Analyzer"
        services={[
          { title: "SEO", desc: "Data-driven SEO strategies that drive organic traffic and revenue growth.", href: "/services/seo" },
          { title: "Content Marketing", desc: "Content that ranks, engages, and converts your target audience.", href: "/services/content-marketing" },
          { title: "Digital Marketing", desc: "Full-stack digital marketing strategy tailored to your business goals.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
          { title: "Ad Spend Calculator", href: "/resources/ad-spend-calculator" },
          { title: "Agency Comparison", href: "/resources/agency-comparison" },
          { title: "Agency Pricing Calculator", href: "/resources/agency-pricing-calculator" },
          { title: "Attribution Calculator", href: "/resources/attribution-calculator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
    </>
  );
}
