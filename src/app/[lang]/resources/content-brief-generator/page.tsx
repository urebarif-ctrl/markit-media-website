"use client";

import { useState } from "react";

const CONTENT_TYPES = [
  "Blog Post",
  "Landing Page",
  "Case Study",
  "Whitepaper",
  "Email",
  "Social Media Post",
  "Video Script",
  "Infographic",
] as const;

const TONE_OPTIONS = [
  "Professional",
  "Conversational",
  "Authoritative",
  "Friendly",
  "Persuasive",
  "Educational",
] as const;

const FUNNEL_STAGES = [
  "Top of Funnel (Awareness)",
  "Middle of Funnel (Consideration)",
  "Bottom of Funnel (Decision)",
  "Post-Purchase (Retention)",
] as const;

interface OutlineItem {
  id: string;
  heading: string;
  notes: string;
}

interface Brief {
  title: string;
  contentType: string;
  targetAudience: string;
  funnelStage: string;
  primaryKeyword: string;
  secondaryKeywords: string;
  tone: string;
  wordCount: number;
  objective: string;
  competitorUrls: string;
  outline: OutlineItem[];
  cta: string;
  internalLinks: string;
  additionalNotes: string;
}

const EMPTY_BRIEF: Brief = {
  title: "",
  contentType: "Blog Post",
  targetAudience: "",
  funnelStage: "Top of Funnel (Awareness)",
  primaryKeyword: "",
  secondaryKeywords: "",
  tone: "Professional",
  wordCount: 1500,
  objective: "",
  competitorUrls: "",
  outline: [
    { id: "1", heading: "Introduction", notes: "" },
    { id: "2", heading: "", notes: "" },
    { id: "3", heading: "", notes: "" },
    { id: "4", heading: "Conclusion", notes: "" },
  ],
  cta: "",
  internalLinks: "",
  additionalNotes: "",
};

let nextId = 10;

export default function ContentBriefGeneratorPage() {
  const [brief, setBrief] = useState<Brief>({ ...EMPTY_BRIEF });
  const [step, setStep] = useState(0);
  const [exported, setExported] = useState(false);
  const [saved, setSaved] = useState<Brief[]>([]);

  const steps = [
    "Content Details",
    "Audience & Keywords",
    "Outline",
    "Final Details",
    "Review",
  ];

  const set = <K extends keyof Brief>(k: K, v: Brief[K]) =>
    setBrief((p) => ({ ...p, [k]: v }));

  function addOutlineItem() {
    set("outline", [
      ...brief.outline,
      { id: String(nextId++), heading: "", notes: "" },
    ]);
  }

  function removeOutlineItem(id: string) {
    set(
      "outline",
      brief.outline.filter((o) => o.id !== id)
    );
  }

  function updateOutlineItem(id: string, field: "heading" | "notes", val: string) {
    set(
      "outline",
      brief.outline.map((o) => (o.id === id ? { ...o, [field]: val } : o))
    );
  }

  function completenessScore(): number {
    let score = 0;
    if (brief.title) score += 15;
    if (brief.targetAudience) score += 15;
    if (brief.primaryKeyword) score += 15;
    if (brief.objective) score += 10;
    if (brief.outline.some((o) => o.heading)) score += 15;
    if (brief.cta) score += 10;
    if (brief.tone) score += 5;
    if (brief.wordCount > 0) score += 5;
    if (brief.secondaryKeywords) score += 5;
    if (brief.competitorUrls) score += 5;
    return score;
  }

  function handleExport() {
    const lines = [
      "CONTENT BRIEF",
      "=".repeat(60),
      `Generated with Markit Media Content Brief Generator`,
      "",
      `Title: ${brief.title || "(Untitled)"}`,
      `Content Type: ${brief.contentType}`,
      `Target Audience: ${brief.targetAudience}`,
      `Funnel Stage: ${brief.funnelStage}`,
      `Tone: ${brief.tone}`,
      `Word Count Target: ${brief.wordCount}`,
      "",
      "KEYWORDS",
      "-".repeat(30),
      `Primary: ${brief.primaryKeyword}`,
      `Secondary: ${brief.secondaryKeywords}`,
      "",
      "OBJECTIVE",
      "-".repeat(30),
      brief.objective,
      "",
      "OUTLINE",
      "-".repeat(30),
      ...brief.outline
        .filter((o) => o.heading)
        .map(
          (o, i) =>
            `${i + 1}. ${o.heading}${o.notes ? `\n   Notes: ${o.notes}` : ""}`
        ),
      "",
      "CALL TO ACTION",
      "-".repeat(30),
      brief.cta,
      "",
      "INTERNAL LINKS TO INCLUDE",
      "-".repeat(30),
      brief.internalLinks || "(none specified)",
      "",
      "COMPETITOR REFERENCES",
      "-".repeat(30),
      brief.competitorUrls || "(none specified)",
      "",
      "ADDITIONAL NOTES",
      "-".repeat(30),
      brief.additionalNotes || "(none)",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `content-brief-${brief.title ? brief.title.toLowerCase().replace(/\s+/g, "-").slice(0, 30) : "untitled"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  }

  function handleSave() {
    setSaved((prev) => [{ ...brief }, ...prev.slice(0, 9)]);
  }

  function handleReset() {
    setBrief({ ...EMPTY_BRIEF });
    setStep(0);
  }

  const score = completenessScore();

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
          Content Brief Generator
        </h1>
        <p className="text-lg text-neutral-600 mb-8">
          Create detailed briefs for writers with audience, keywords, outline,
          tone, and competitive references.
        </p>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((s, i) => (
              <button
                key={s}
                onClick={() => setStep(i)}
                className={`text-base font-medium transition-colors ${
                  step === i
                    ? "text-black underline underline-offset-4"
                    : "text-neutral-400 hover:text-black"
                }`}
              >
                <span className="hidden sm:inline">{s}</span>
                <span className="sm:hidden">{i + 1}</span>
              </button>
            ))}
          </div>
          <div className="h-2 w-full rounded-full bg-neutral-100">
            <div
              className="h-2 rounded-full bg-black transition-all"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Completeness badge */}
        <div className="mb-6 flex items-center gap-3">
          <span className="text-base font-semibold">Brief completeness:</span>
          <div className="h-3 flex-1 max-w-xs rounded-full bg-neutral-100">
            <div
              className="h-3 rounded-full bg-black transition-all"
              style={{ width: `${score}%` }}
            />
          </div>
          <span className="text-base font-bold">{score}%</span>
        </div>

        {/* Step 0: Content Details */}
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <label className="block text-base font-semibold mb-1">
                Content Title
              </label>
              <input
                type="text"
                value={brief.title}
                onChange={(e) => set("title", e.target.value)}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus:border-black focus:outline-none"
                placeholder="e.g. Complete Guide to Email Marketing Automation"
              />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">
                Content Type
              </label>
              <div className="flex flex-wrap gap-2">
                {CONTENT_TYPES.map((ct) => (
                  <button
                    key={ct}
                    onClick={() => set("contentType", ct)}
                    className={`rounded-md border px-4 py-2 text-base font-medium transition-colors ${
                      brief.contentType === ct
                        ? "border-black bg-black text-white"
                        : "border-neutral-300 hover:border-black"
                    }`}
                  >
                    {ct}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">
                Objective
              </label>
              <textarea
                value={brief.objective}
                onChange={(e) => set("objective", e.target.value)}
                rows={3}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus:border-black focus:outline-none"
                placeholder="What should this content achieve? e.g. Drive demo signups from mid-funnel prospects"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-base font-semibold mb-1">
                  Tone
                </label>
                <select
                  value={brief.tone}
                  onChange={(e) => set("tone", e.target.value)}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus:border-black focus:outline-none"
                >
                  {TONE_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-base font-semibold mb-1">
                  Word Count Target
                </label>
                <input
                  type="number"
                  value={brief.wordCount}
                  onChange={(e) =>
                    set("wordCount", parseInt(e.target.value) || 0)
                  }
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus:border-black focus:outline-none"
                  min={100}
                  step={100}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Audience & Keywords */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block text-base font-semibold mb-1">
                Target Audience
              </label>
              <textarea
                value={brief.targetAudience}
                onChange={(e) => set("targetAudience", e.target.value)}
                rows={3}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus:border-black focus:outline-none"
                placeholder="Describe your ideal reader: role, company size, pain points, knowledge level"
              />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">
                Funnel Stage
              </label>
              <div className="flex flex-wrap gap-2">
                {FUNNEL_STAGES.map((fs) => (
                  <button
                    key={fs}
                    onClick={() => set("funnelStage", fs)}
                    className={`rounded-md border px-4 py-2 text-base font-medium transition-colors ${
                      brief.funnelStage === fs
                        ? "border-black bg-black text-white"
                        : "border-neutral-300 hover:border-black"
                    }`}
                  >
                    {fs}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">
                Primary Keyword
              </label>
              <input
                type="text"
                value={brief.primaryKeyword}
                onChange={(e) => set("primaryKeyword", e.target.value)}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus:border-black focus:outline-none"
                placeholder="Main keyword to target"
              />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">
                Secondary Keywords{" "}
                <span className="font-normal text-neutral-500">
                  (comma-separated)
                </span>
              </label>
              <input
                type="text"
                value={brief.secondaryKeywords}
                onChange={(e) => set("secondaryKeywords", e.target.value)}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus:border-black focus:outline-none"
                placeholder="related keyword 1, related keyword 2"
              />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">
                Competitor / Reference URLs
              </label>
              <textarea
                value={brief.competitorUrls}
                onChange={(e) => set("competitorUrls", e.target.value)}
                rows={3}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus:border-black focus:outline-none"
                placeholder="URLs of competing content to beat or reference (one per line)"
              />
            </div>
          </div>
        )}

        {/* Step 2: Outline */}
        {step === 2 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Content Outline</h2>
              <button
                onClick={addOutlineItem}
                className="rounded-md border border-black px-4 py-2 text-base font-medium hover:bg-black hover:text-white transition-colors"
              >
                + Add Section
              </button>
            </div>
            <div className="space-y-4">
              {brief.outline.map((item, idx) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-neutral-200 p-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white text-base font-bold">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={item.heading}
                      onChange={(e) =>
                        updateOutlineItem(item.id, "heading", e.target.value)
                      }
                      className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-base font-semibold focus:border-black focus:outline-none"
                      placeholder="Section heading"
                    />
                    {brief.outline.length > 2 && (
                      <button
                        onClick={() => removeOutlineItem(item.id)}
                        className="text-neutral-400 hover:text-black text-base"
                        aria-label="Remove section"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <textarea
                    value={item.notes}
                    onChange={(e) =>
                      updateOutlineItem(item.id, "notes", e.target.value)
                    }
                    rows={2}
                    className="w-full rounded-md border border-neutral-200 px-3 py-2 text-base focus:border-black focus:outline-none"
                    placeholder="Notes for the writer: key points, data to include, angle"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Final Details */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <label className="block text-base font-semibold mb-1">
                Call to Action
              </label>
              <input
                type="text"
                value={brief.cta}
                onChange={(e) => set("cta", e.target.value)}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus:border-black focus:outline-none"
                placeholder="What action should the reader take? e.g. Book a demo, Download the guide"
              />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">
                Internal Links to Include
              </label>
              <textarea
                value={brief.internalLinks}
                onChange={(e) => set("internalLinks", e.target.value)}
                rows={3}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus:border-black focus:outline-none"
                placeholder="URLs or page names to link within the content (one per line)"
              />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">
                Additional Notes
              </label>
              <textarea
                value={brief.additionalNotes}
                onChange={(e) => set("additionalNotes", e.target.value)}
                rows={4}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus:border-black focus:outline-none"
                placeholder="Any other instructions, brand guidelines, or context for the writer"
              />
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="rounded-lg border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-6">Brief Summary</h2>
            <dl className="space-y-4">
              {[
                ["Title", brief.title],
                ["Type", brief.contentType],
                ["Tone", brief.tone],
                ["Word Count", String(brief.wordCount)],
                ["Target Audience", brief.targetAudience],
                ["Funnel Stage", brief.funnelStage],
                ["Primary Keyword", brief.primaryKeyword],
                ["Secondary Keywords", brief.secondaryKeywords],
                ["Objective", brief.objective],
                ["CTA", brief.cta],
              ].map(
                ([label, val]) =>
                  val && (
                    <div key={label}>
                      <dt className="text-base font-semibold text-neutral-500">
                        {label}
                      </dt>
                      <dd className="text-base mt-0.5">{val}</dd>
                    </div>
                  )
              )}
            </dl>

            {brief.outline.some((o) => o.heading) && (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-3">Outline</h3>
                <ol className="list-decimal list-inside space-y-2">
                  {brief.outline
                    .filter((o) => o.heading)
                    .map((o) => (
                      <li key={o.id} className="text-base">
                        <span className="font-semibold">{o.heading}</span>
                        {o.notes && (
                          <span className="text-neutral-500">
                            {" "}
                            — {o.notes}
                          </span>
                        )}
                      </li>
                    ))}
                </ol>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={handleExport}
                className="rounded-md bg-black px-6 py-2 text-base font-semibold text-white hover:bg-neutral-800 transition-colors"
              >
                {exported ? "Downloaded!" : "Export Brief (.txt)"}
              </button>
              <button
                onClick={handleSave}
                className="rounded-md border border-black px-6 py-2 text-base font-semibold hover:bg-black hover:text-white transition-colors"
              >
                Save to Session
              </button>
              <button
                onClick={handleReset}
                className="rounded-md border border-neutral-300 px-6 py-2 text-base font-semibold hover:border-black transition-colors"
              >
                Start New Brief
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="rounded-md border border-neutral-300 px-6 py-2 text-base font-medium hover:border-black transition-colors disabled:opacity-30"
          >
            Previous
          </button>
          <button
            onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            disabled={step === steps.length - 1}
            className="rounded-md bg-black px-6 py-2 text-base font-medium text-white hover:bg-neutral-800 transition-colors disabled:opacity-30"
          >
            Next
          </button>
        </div>

        {/* Saved briefs */}
        {saved.length > 0 && (
          <div className="mt-12 rounded-lg border border-neutral-200 p-6">
            <h2 className="text-xl font-bold mb-4">Saved Briefs</h2>
            <div className="space-y-3">
              {saved.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-md bg-neutral-50 p-4"
                >
                  <div>
                    <p className="text-base font-semibold">
                      {s.title || "(Untitled)"}
                    </p>
                    <p className="text-base text-neutral-500">
                      {s.contentType} · {s.wordCount} words · {s.tone}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setBrief({ ...s });
                      setStep(4);
                    }}
                    className="rounded-md border border-black px-3 py-1 text-base hover:bg-black hover:text-white transition-colors"
                  >
                    Load
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
