"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const PLATFORMS = [
  "Google",
  "Meta",
  "LinkedIn",
  "TikTok",
  "Pinterest",
  "Twitter/X",
  "Programmatic",
  "Email",
] as const;

const CAMPAIGN_TYPES = [
  "Brand",
  "Prospecting",
  "Retargeting",
  "Lookalike",
  "Conquest",
  "Seasonal",
  "Launch",
  "Evergreen",
] as const;

const OBJECTIVES = [
  "Awareness",
  "Traffic",
  "Engagement",
  "Leads",
  "Sales",
  "AppInstalls",
] as const;

const AUDIENCES = [
  "Cold",
  "Warm",
  "Hot",
  "Lookalike",
  "Custom",
  "Broad",
] as const;

const GEO_PRESETS = [
  "US",
  "UK",
  "CA",
  "AU",
  "AE",
  "SA",
  "PK",
  "IN",
  "DE",
  "FR",
  "Global",
  "EMEA",
  "APAC",
  "LATAM",
  "MENA",
] as const;

const DATE_FORMATS = [
  { label: "YYYY-MM (e.g. 2026-09)", value: "YYYY-MM" },
  { label: "YYYYMMDD (e.g. 20260921)", value: "YYYYMMDD" },
  { label: "Q1-2026 (e.g. Q3-2026)", value: "Q-YYYY" },
  { label: "YYYYMM (e.g. 202609)", value: "YYYYMM" },
  { label: "YYYY (e.g. 2026)", value: "YYYY" },
] as const;

const SEPARATORS = [
  { label: "Underscore ( _ )", char: "_" },
  { label: "Hyphen ( - )", char: "-" },
  { label: "Pipe ( | )", char: "|" },
  { label: "Period ( . )", char: "." },
] as const;

const SEGMENT_KEYS = [
  "platform",
  "type",
  "objective",
  "audience",
  "geo",
  "date",
  "custom",
] as const;

type SegmentKey = (typeof SEGMENT_KEYS)[number];

const SEGMENT_LABELS: Record<SegmentKey, string> = {
  platform: "Platform",
  type: "Campaign Type",
  objective: "Objective",
  audience: "Audience",
  geo: "Geography",
  date: "Date",
  custom: "Custom",
};

interface HistoryEntry {
  id: number;
  name: string;
  copiedAt?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Platform templates                                                 */
/* ------------------------------------------------------------------ */

interface TemplateValues {
  platform: string;
  campaignType: string;
  objective: string;
  audience: string;
  geo: string;
  dateFormat: string;
  separator: string;
  segmentOrder: SegmentKey[];
}

const PLATFORM_TEMPLATES: Record<string, TemplateValues> = {
  "Google Ads": {
    platform: "Google",
    campaignType: "Prospecting",
    objective: "Leads",
    audience: "Broad",
    geo: "US",
    dateFormat: "YYYY-MM",
    separator: "_",
    segmentOrder: ["platform", "type", "objective", "audience", "geo", "date", "custom"],
  },
  "Meta Ads": {
    platform: "Meta",
    campaignType: "Retargeting",
    objective: "Sales",
    audience: "Warm",
    geo: "US",
    dateFormat: "YYYYMMDD",
    separator: "_",
    segmentOrder: ["platform", "objective", "audience", "type", "geo", "date", "custom"],
  },
  "LinkedIn Ads": {
    platform: "LinkedIn",
    campaignType: "Brand",
    objective: "Awareness",
    audience: "Cold",
    geo: "Global",
    dateFormat: "Q-YYYY",
    separator: "-",
    segmentOrder: ["platform", "type", "objective", "geo", "audience", "date", "custom"],
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatDate(fmt: string): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const q = Math.ceil((now.getMonth() + 1) / 3);

  switch (fmt) {
    case "YYYY-MM":
      return `${y}-${m}`;
    case "YYYYMMDD":
      return `${y}${m}${d}`;
    case "Q-YYYY":
      return `Q${q}-${y}`;
    case "YYYYMM":
      return `${y}${m}`;
    case "YYYY":
      return `${y}`;
    default:
      return `${y}-${m}`;
  }
}

function sanitise(text: string, sep: string): string {
  return text
    .trim()
    .replace(/\s+/g, sep === "_" ? "-" : "_")
    .replace(/[^a-zA-Z0-9_\-.|]/g, "");
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CampaignNamingGeneratorPage() {
  /* --- Form state --- */
  const [platform, setPlatform] = useState("");
  const [campaignType, setCampaignType] = useState("");
  const [objective, setObjective] = useState("");
  const [audience, setAudience] = useState("");
  const [geo, setGeo] = useState("");
  const [geoCustom, setGeoCustom] = useState("");
  const [dateFormat, setDateFormat] = useState("YYYY-MM");
  const [customSegment, setCustomSegment] = useState("");
  const [separator, setSeparator] = useState("_");
  const [segmentOrder, setSegmentOrder] = useState<SegmentKey[]>([...SEGMENT_KEYS]);

  /* --- Batch --- */
  const [batchGeos, setBatchGeos] = useState("");
  const [batchAudiences, setBatchAudiences] = useState<string[]>([]);

  /* --- History --- */
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const nextId = useRef(1);

  /* --- UI --- */
  const [copiedMain, setCopiedMain] = useState(false);
  const [copiedHistoryId, setCopiedHistoryId] = useState<number | null>(null);

  /* --- Derived values --- */
  const resolvedGeo = geoCustom || geo;
  const dateStr = formatDate(dateFormat);

  const segmentValues: Record<SegmentKey, string> = useMemo(
    () => ({
      platform: platform,
      type: campaignType,
      objective: objective,
      audience: audience,
      geo: resolvedGeo,
      date: dateStr,
      custom: customSegment ? sanitise(customSegment, separator) : "",
    }),
    [platform, campaignType, objective, audience, resolvedGeo, dateStr, customSegment, separator],
  );

  const buildName = useCallback(
    (overrides: Partial<Record<SegmentKey, string>> = {}) => {
      const merged = { ...segmentValues, ...overrides };
      const parts = segmentOrder
        .map((key) => merged[key])
        .filter(Boolean);
      return parts.join(separator);
    },
    [segmentValues, segmentOrder, separator],
  );

  const generatedName = buildName();

  /* --- Pattern display --- */
  const patternDisplay = segmentOrder
    .map((key) => `[${SEGMENT_LABELS[key]}]`)
    .join(separator);

  /* --- Batch generation --- */
  const batchNames: string[] = useMemo(() => {
    const geos = batchGeos
      .split(",")
      .map((g) => g.trim())
      .filter(Boolean);
    const auds = batchAudiences.length > 0 ? batchAudiences : [audience || ""];

    if (geos.length === 0 && auds.length <= 1) return [];

    const names: string[] = [];
    const geoList = geos.length > 0 ? geos : [resolvedGeo || ""];
    for (const g of geoList) {
      for (const a of auds) {
        const name = buildName({ geo: g, audience: a });
        if (name && !names.includes(name)) names.push(name);
      }
    }
    return names;
  }, [batchGeos, batchAudiences, audience, resolvedGeo, buildName]);

  /* --- Actions --- */
  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    setCopiedMain(true);
    setTimeout(() => setCopiedMain(false), 2000);
  }

  function handleCopyHistory(entry: HistoryEntry) {
    navigator.clipboard.writeText(entry.name);
    setCopiedHistoryId(entry.id);
    setTimeout(() => setCopiedHistoryId(null), 2000);
  }

  function addToHistory(name: string) {
    if (!name) return;
    setHistory((prev) => {
      if (prev.some((h) => h.name === name)) return prev;
      return [{ id: nextId.current++, name }, ...prev];
    });
  }

  function addAllBatchToHistory() {
    setHistory((prev) => {
      const existing = new Set(prev.map((h) => h.name));
      const newEntries: HistoryEntry[] = batchNames
        .filter((n) => !existing.has(n))
        .map((n) => ({ id: nextId.current++, name: n }));
      return [...newEntries, ...prev];
    });
  }

  function clearHistory() {
    setHistory([]);
  }

  function applyTemplate(templateName: string) {
    const t = PLATFORM_TEMPLATES[templateName];
    if (!t) return;
    setPlatform(t.platform);
    setCampaignType(t.campaignType);
    setObjective(t.objective);
    setAudience(t.audience);
    setGeo(t.geo);
    setGeoCustom("");
    setDateFormat(t.dateFormat);
    setSeparator(t.separator);
    setSegmentOrder([...t.segmentOrder]);
  }

  function moveSegment(index: number, direction: "up" | "down") {
    const newOrder = [...segmentOrder];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= newOrder.length) return;
    [newOrder[index], newOrder[target]] = [newOrder[target], newOrder[index]];
    setSegmentOrder(newOrder);
  }

  function setSegmentPosition(key: SegmentKey, newIndex: number) {
    const currentOrder = [...segmentOrder];
    const currentIndex = currentOrder.indexOf(key);
    if (currentIndex === -1 || currentIndex === newIndex) return;
    currentOrder.splice(currentIndex, 1);
    currentOrder.splice(newIndex, 0, key);
    setSegmentOrder(currentOrder);
  }

  function handleExportGuide() {
    const lines: string[] = [];
    lines.push("=== Campaign Naming Convention Guide ===");
    lines.push("");
    lines.push(`Pattern: ${patternDisplay}`);
    lines.push(`Separator: "${separator}"`);
    lines.push("");
    lines.push("--- Segment Definitions ---");
    lines.push("");
    segmentOrder.forEach((key, i) => {
      lines.push(`${i + 1}. ${SEGMENT_LABELS[key]}`);
      switch (key) {
        case "platform":
          lines.push(`   Options: ${PLATFORMS.join(", ")}`);
          break;
        case "type":
          lines.push(`   Options: ${CAMPAIGN_TYPES.join(", ")}`);
          break;
        case "objective":
          lines.push(`   Options: ${OBJECTIVES.join(", ")}`);
          break;
        case "audience":
          lines.push(`   Options: ${AUDIENCES.join(", ")}`);
          break;
        case "geo":
          lines.push(`   Common values: ${GEO_PRESETS.join(", ")}`);
          lines.push("   Also accepts custom country/region codes");
          break;
        case "date":
          lines.push(`   Format: ${dateFormat}`);
          break;
        case "custom":
          lines.push("   Free text segment for campaign-specific identifiers");
          break;
      }
      lines.push("");
    });
    lines.push("--- Examples ---");
    lines.push("");
    if (generatedName) {
      lines.push(`Current: ${generatedName}`);
    }
    // Generate a few example names
    const exPlatforms = ["Google", "Meta", "LinkedIn"];
    const exTypes = ["Prospecting", "Retargeting", "Brand"];
    const exObj = ["Leads", "Sales", "Awareness"];
    for (let i = 0; i < 3; i++) {
      const ex = buildName({
        platform: exPlatforms[i],
        type: exTypes[i],
        objective: exObj[i],
        audience: i === 0 ? "Broad" : i === 1 ? "Warm" : "Cold",
        geo: i === 0 ? "US" : i === 1 ? "UK" : "Global",
      });
      lines.push(`Example ${i + 1}: ${ex}`);
    }
    lines.push("");
    lines.push("--- History ---");
    lines.push("");
    if (history.length === 0) {
      lines.push("(no names generated yet)");
    } else {
      history.forEach((h, i) => {
        lines.push(`${i + 1}. ${h.name}`);
      });
    }
    lines.push("");
    lines.push(`Generated by Markit Media Campaign Naming Convention Generator`);
    lines.push(`Date: ${new Date().toISOString().split("T")[0]}`);

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "campaign-naming-guide.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  function toggleBatchAudience(aud: string) {
    setBatchAudiences((prev) =>
      prev.includes(aud) ? prev.filter((a) => a !== aud) : [...prev, aud],
    );
  }

  /* --- Shared CSS classes --- */
  const selectClass =
    "w-full border border-gray-300 px-4 py-3 text-base focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none bg-white";
  const inputClass =
    "w-full border border-gray-300 px-4 py-3 text-base focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none";
  const btnPrimary =
    "bg-black text-white px-6 py-3 text-base font-bold hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";
  const btnSecondary =
    "border border-gray-300 text-black px-6 py-3 text-base font-bold hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";

  return (
    <article>
      {/* -------------------------------------------------------- Header */}
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <nav aria-label="Breadcrumb" className="text-base text-gray-400 mb-8">
              <Link
                href="/resources"
                className="hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Resources
              </Link>
              <span className="mx-2">/</span>
              <span className="text-black">Campaign Naming Generator</span>
            </nav>

            <p className="text-base font-semibold tracking-widest uppercase text-gray-400 mb-3">
              Free Tool
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
              Campaign Naming Convention Generator
            </h1>
            <p className="text-lg text-gray-500 mt-4 max-w-2xl">
              Build consistent, structured campaign names for Google Ads, Meta, LinkedIn, and every other platform. Keep your ad accounts clean, searchable, and easy to report on.
            </p>
          </Animate>
        </div>
      </section>

      {/* ------------------------------------------ Platform templates */}
      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
              Quick-Start Templates
            </h2>
            <p className="text-base text-gray-500 mb-4">
              Load a pre-built naming convention for a specific platform, then customise it.
            </p>
            <div className="flex flex-wrap gap-3">
              {Object.keys(PLATFORM_TEMPLATES).map((name) => (
                <button
                  key={name}
                  onClick={() => applyTemplate(name)}
                  className={btnSecondary}
                >
                  {name}
                </button>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* ------------------------------------------------ Convention builder */}
      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="border border-gray-200 p-6 lg:p-8 space-y-6">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                Build Your Convention
              </h2>

              {/* Row 1: Platform + Campaign Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="cng-platform" className="block text-base font-bold text-black mb-2">
                    Platform
                  </label>
                  <select
                    id="cng-platform"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select platform</option>
                    {PLATFORMS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="cng-type" className="block text-base font-bold text-black mb-2">
                    Campaign Type
                  </label>
                  <select
                    id="cng-type"
                    value={campaignType}
                    onChange={(e) => setCampaignType(e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select type</option>
                    {CAMPAIGN_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Objective + Audience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="cng-objective" className="block text-base font-bold text-black mb-2">
                    Objective
                  </label>
                  <select
                    id="cng-objective"
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select objective</option>
                    {OBJECTIVES.map((o) => (
                      <option key={o} value={o}>
                        {o === "AppInstalls" ? "App Installs" : o}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="cng-audience" className="block text-base font-bold text-black mb-2">
                    Audience
                  </label>
                  <select
                    id="cng-audience"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select audience</option>
                    {AUDIENCES.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Geography + Date format */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="cng-geo" className="block text-base font-bold text-black mb-2">
                    Geography
                  </label>
                  <select
                    id="cng-geo"
                    value={geo}
                    onChange={(e) => {
                      setGeo(e.target.value);
                      if (e.target.value) setGeoCustom("");
                    }}
                    className={selectClass}
                  >
                    <option value="">Select region</option>
                    {GEO_PRESETS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="cng-geo-custom" className="sr-only">
                    Custom geography code
                  </label>
                  <input
                    id="cng-geo-custom"
                    type="text"
                    placeholder="Or type a custom code (e.g. DACH, SEA)"
                    value={geoCustom}
                    onChange={(e) => {
                      setGeoCustom(e.target.value);
                      if (e.target.value) setGeo("");
                    }}
                    className={`${inputClass} mt-2`}
                  />
                </div>
                <div>
                  <label htmlFor="cng-date" className="block text-base font-bold text-black mb-2">
                    Date Format
                  </label>
                  <select
                    id="cng-date"
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                    className={selectClass}
                  >
                    {DATE_FORMATS.map((df) => (
                      <option key={df.value} value={df.value}>
                        {df.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Custom segment + Separator */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="cng-custom" className="block text-base font-bold text-black mb-2">
                    Custom Segment <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    id="cng-custom"
                    type="text"
                    placeholder="e.g. ProductLaunch, SummerSale, V2"
                    value={customSegment}
                    onChange={(e) => setCustomSegment(e.target.value)}
                    className={inputClass}
                  />
                  <p className="text-base text-gray-400 mt-1">
                    Free text for campaign-specific identifiers
                  </p>
                </div>
                <div>
                  <label htmlFor="cng-separator" className="block text-base font-bold text-black mb-2">
                    Separator
                  </label>
                  <select
                    id="cng-separator"
                    value={separator}
                    onChange={(e) => setSeparator(e.target.value)}
                    className={selectClass}
                  >
                    {SEPARATORS.map((s) => (
                      <option key={s.char} value={s.char}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ------------------------------------------------ Segment order */}
      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="border border-gray-200 p-6 lg:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-2">
                Segment Order
              </h2>
              <p className="text-base text-gray-500 mb-4">
                Reorder segments to match your team&apos;s convention. Use the arrows or set a position number.
              </p>

              <div className="space-y-3">
                {segmentOrder.map((key, index) => (
                  <div
                    key={key}
                    className="flex items-center gap-3 border border-gray-200 px-4 py-3 bg-white"
                  >
                    <span className="text-base font-bold text-gray-400 w-6 text-center">
                      {index + 1}
                    </span>

                    <span className="text-base font-bold text-black flex-1">
                      {SEGMENT_LABELS[key]}
                    </span>

                    <span className="text-base text-gray-400 font-mono">
                      {segmentValues[key] || "--"}
                    </span>

                    <label htmlFor={`cng-pos-${key}`} className="sr-only">
                      Position for {SEGMENT_LABELS[key]}
                    </label>
                    <select
                      id={`cng-pos-${key}`}
                      value={index}
                      onChange={(e) => setSegmentPosition(key, Number(e.target.value))}
                      className="border border-gray-300 px-2 py-1 text-base focus-visible:border-black focus-visible:outline-none bg-white"
                    >
                      {segmentOrder.map((_, i) => (
                        <option key={i} value={i}>
                          {i + 1}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => moveSegment(index, "up")}
                      disabled={index === 0}
                      aria-label={`Move ${SEGMENT_LABELS[key]} up`}
                      className="border border-gray-300 px-2 py-1 text-base font-bold hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                    >
                      &uarr;
                    </button>
                    <button
                      onClick={() => moveSegment(index, "down")}
                      disabled={index === segmentOrder.length - 1}
                      aria-label={`Move ${SEGMENT_LABELS[key]} down`}
                      className="border border-gray-300 px-2 py-1 text-base font-bold hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                    >
                      &darr;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* --------------------------------------------- Naming rules display */}
      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="border border-gray-200 p-6 lg:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                Naming Pattern
              </h2>
              <div className="flex flex-wrap gap-1 text-base mb-4">
                {segmentOrder.map((key, i) => (
                  <span key={key}>
                    <span className="bg-black text-white px-2 py-1 font-medium inline-block">
                      {SEGMENT_LABELS[key]}
                    </span>
                    {i < segmentOrder.length - 1 && (
                      <span className="text-gray-400 mx-1 font-mono">{separator}</span>
                    )}
                  </span>
                ))}
              </div>
              <p className="text-base text-gray-400 font-mono break-all">{patternDisplay}</p>
            </div>
          </Animate>
        </div>
      </section>

      {/* -------------------------------------------------- Live preview */}
      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="border border-gray-200 overflow-hidden">
              <div className="bg-black text-white p-4 flex items-center justify-between">
                <h2 className="text-base font-bold">Live Preview</h2>
              </div>
              <div className="p-6">
                <div className="bg-gray-50 p-4 mb-4">
                  <code className="text-base text-black font-mono break-all block">
                    {generatedName || "Select options above to build a name"}
                  </code>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleCopy(generatedName)}
                    disabled={!generatedName}
                    className={`${btnPrimary} disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    {copiedMain ? "Copied!" : "Copy to Clipboard"}
                  </button>
                  <button
                    onClick={() => addToHistory(generatedName)}
                    disabled={!generatedName}
                    className={`${btnSecondary} disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    Save to History
                  </button>
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ----------------------------------------------- Batch generation */}
      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="border border-gray-200 p-6 lg:p-8 space-y-6">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-2">
                  Batch Generate
                </h2>
                <p className="text-base text-gray-500">
                  Generate multiple campaign name variations at once. Enter comma-separated geographies and select multiple audiences.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="cng-batch-geos" className="block text-base font-bold text-black mb-2">
                    Geographies <span className="text-gray-400 font-normal">(comma-separated)</span>
                  </label>
                  <input
                    id="cng-batch-geos"
                    type="text"
                    placeholder="e.g. US, UK, CA, AU"
                    value={batchGeos}
                    onChange={(e) => setBatchGeos(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <fieldset>
                  <legend className="block text-base font-bold text-black mb-2">
                    Audiences <span className="text-gray-400 font-normal">(select multiple)</span>
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {AUDIENCES.map((a) => (
                      <label
                        key={a}
                        className={`cursor-pointer border px-3 py-2 text-base font-medium transition-colors motion-reduce:transition-none ${
                          batchAudiences.includes(a)
                            ? "bg-black text-white border-black"
                            : "bg-white text-black border-gray-300 hover:border-black"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={batchAudiences.includes(a)}
                          onChange={() => toggleBatchAudience(a)}
                          className="sr-only"
                        />
                        {a}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              {batchNames.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-base font-bold text-black">
                      {batchNames.length} variation{batchNames.length !== 1 ? "s" : ""} generated
                    </p>
                    <button onClick={addAllBatchToHistory} className={btnSecondary}>
                      Save All to History
                    </button>
                  </div>
                  <div className="border border-gray-200 divide-y divide-gray-200 max-h-64 overflow-y-auto">
                    {batchNames.map((name, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-4 px-4 py-3"
                      >
                        <code className="text-base text-black font-mono break-all">{name}</code>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(name);
                          }}
                          className="shrink-0 border border-gray-300 text-black px-3 py-1 text-base font-medium hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        >
                          Copy
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* --------------------------------------------------- History */}
      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="border border-gray-200 p-6 lg:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                  History
                </h2>
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-base text-gray-400 hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <p className="text-base text-gray-400">
                  No names saved yet. Generate a name and click &ldquo;Save to History&rdquo; to start building your list.
                </p>
              ) : (
                <div className="border border-gray-200 divide-y divide-gray-200 max-h-72 overflow-y-auto">
                  {history.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between gap-4 px-4 py-3"
                    >
                      <code className="text-base text-black font-mono break-all">{entry.name}</code>
                      <button
                        onClick={() => handleCopyHistory(entry)}
                        className="shrink-0 border border-gray-300 text-black px-3 py-1 text-base font-medium hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                      >
                        {copiedHistoryId === entry.id ? "Copied" : "Copy"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* ------------------------------------------------- Export */}
      <section className="px-6 lg:px-12 pb-16">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="border border-gray-200 p-6 lg:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-2">
                Export Convention Guide
              </h2>
              <p className="text-base text-gray-500 mb-4">
                Download your naming convention as a .txt file. Includes the pattern, segment definitions, examples, and your history.
              </p>
              <button onClick={handleExportGuide} className={btnPrimary}>
                Download Convention Guide (.txt)
              </button>
            </div>
          </Animate>
        </div>
      </section>

      {/* --------------------------------------------------- CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Organising Your Campaigns?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team manages campaigns across every major platform with disciplined naming, tracking, and reporting built in from day one.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get Campaign Support &rarr;
            </Link>
          </Animate>
        </div>
      </section>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Campaign Naming Convention Generator",
          description: "Generate consistent campaign naming conventions for Google Ads, Meta Ads, LinkedIn, and more. Keep your ad accounts organised.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Campaign Naming Generator"
        services={[
          { title: "Performance Marketing", desc: "Google Ads, Meta Ads, and PPC campaigns that maximize ROAS.", href: "/services/performance-marketing" },
          { title: "Digital Marketing", desc: "Integrated strategy across all channels for measurable growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Complement paid with organic — reduce dependency on ad spend over time.", href: "/services/seo" },
        ]}
        relatedTools={[
          { title: "Campaign Brief Builder", href: "/resources/campaign-brief-builder" },
          { title: "Campaign Debrief", href: "/resources/campaign-debrief" },
          { title: "Campaign Naming Convention", href: "/resources/campaign-naming-convention" },
          { title: "Campaign Tracker", href: "/resources/campaign-tracker" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
