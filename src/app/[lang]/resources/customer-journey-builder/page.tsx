"use client";
import Link from "next/link";

import { useState } from "react";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

const STAGES = [
  { id: "awareness", label: "Awareness", desc: "Customer discovers a need or your brand" },
  { id: "consideration", label: "Consideration", desc: "Customer researches and evaluates options" },
  { id: "decision", label: "Decision", desc: "Customer chooses and purchases" },
  { id: "retention", label: "Retention", desc: "Customer uses product and stays engaged" },
  { id: "advocacy", label: "Advocacy", desc: "Customer recommends to others" },
] as const;

const EMOTIONS = ["Excited", "Curious", "Confused", "Frustrated", "Satisfied", "Delighted", "Anxious", "Neutral"] as const;

interface Touchpoint {
  id: string;
  stage: string;
  channel: string;
  action: string;
  emotion: string;
  painPoint: string;
  opportunity: string;
}

let nextId = 1;



export default function CustomerJourneyBuilderPage() {
  const [touchpoints, setTouchpoints] = useState<Touchpoint[]>([]);
  const [form, setForm] = useState({
    stage: "awareness",
    channel: "",
    action: "",
    emotion: "Neutral",
    painPoint: "",
    opportunity: "",
  });
  const [personaName, setPersonaName] = useState("");
  const [view, setView] = useState<"map" | "list">("map");

  function addTouchpoint() {
    if (!form.channel || !form.action) return;
    setTouchpoints((prev) => [
      ...prev,
      { id: String(nextId++), ...form },
    ]);
    setForm((f) => ({ ...f, channel: "", action: "", painPoint: "", opportunity: "" }));
  }

  function removeTouchpoint(id: string) {
    setTouchpoints((prev) => prev.filter((t) => t.id !== id));
  }

  function getTouchpointsByStage(stageId: string) {
    return touchpoints.filter((t) => t.stage === stageId);
  }

  function handleExport() {
    const lines = [
      "CUSTOMER JOURNEY MAP",
      "=".repeat(50),
      personaName ? `Persona: ${personaName}` : "",
      `Generated with Markit Media`,
      "",
      ...STAGES.map((stage) => {
        const tps = getTouchpointsByStage(stage.id);
        if (tps.length === 0) return `## ${stage.label}\n(No touchpoints mapped)\n`;
        return [
          `## ${stage.label}`,
          ...tps.map(
            (t, i) =>
              `${i + 1}. ${t.channel}: ${t.action}\n   Emotion: ${t.emotion}${t.painPoint ? `\n   Pain Point: ${t.painPoint}` : ""}${t.opportunity ? `\n   Opportunity: ${t.opportunity}` : ""}`
          ),
          "",
        ].join("\n");
      }),
    ].filter(Boolean);
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customer-journey-map.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  const emotionToBar = (emotion: string): number => {
    const map: Record<string, number> = {
      Delighted: 100, Excited: 90, Satisfied: 75, Curious: 65,
      Neutral: 50, Confused: 35, Anxious: 25, Frustrated: 10,
    };
    return map[emotion] ?? 50;
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Customer Journey Map Builder",
          description: "Map your customer journey across awareness, consideration, decision, and retention stages with touchpoints, emotions, and opportunities.",
          url: "https://themarkitmedia.com/en/resources/customer-journey-builder",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Customer Journey Map Builder | Free Marketing Tool — Markit Media</title>
      <link rel="canonical" href="https://themarkitmedia.com/en/resources/customer-journey-builder" />
      <meta name="description" content="Map your customer journey across awareness, consideration, decision, and retention stages with touchpoints, emotions, and opportunities." />
      <nav className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/resources" className="hover:text-black transition-colors">Resources</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">Customer Journey Map Builder</li>
        </ol>
      </nav>
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
          Customer Journey Map Builder
        </h1>
        <p className="text-lg text-neutral-600 mb-10">
          Map touchpoints across the customer journey with emotions, pain
          points, and opportunities.
        </p>

        {/* Persona */}
        <div className="mb-6">
          <label className="block text-base font-semibold mb-1">
            Persona Name (optional)
          </label>
          <input
            type="text"
            value={personaName}
            onChange={(e) => setPersonaName(e.target.value)}
            className="max-w-md rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
            placeholder="e.g. Marketing Manager Maria"
          />
        </div>

        {/* Add touchpoint */}
        <div className="mb-8 rounded-lg border border-neutral-200 p-5">
          <h2 className="text-lg font-bold mb-4">Add Touchpoint</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-base font-semibold mb-1">Stage</label>
              <select
                value={form.stage}
                onChange={(e) => setForm((f) => ({ ...f, stage: e.target.value }))}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              >
                {STAGES.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">Channel</label>
              <input
                type="text"
                value={form.channel}
                onChange={(e) => setForm((f) => ({ ...f, channel: e.target.value }))}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
                placeholder="e.g. Google Search, Email, Social"
              />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">Customer Action</label>
              <input
                type="text"
                value={form.action}
                onChange={(e) => setForm((f) => ({ ...f, action: e.target.value }))}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
                placeholder="e.g. Searches for solutions"
              />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">Emotion</label>
              <select
                value={form.emotion}
                onChange={(e) => setForm((f) => ({ ...f, emotion: e.target.value }))}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              >
                {EMOTIONS.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">Pain Point</label>
              <input
                type="text"
                value={form.painPoint}
                onChange={(e) => setForm((f) => ({ ...f, painPoint: e.target.value }))}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
                placeholder="What frustrates them here?"
              />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">Opportunity</label>
              <input
                type="text"
                value={form.opportunity}
                onChange={(e) => setForm((f) => ({ ...f, opportunity: e.target.value }))}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
                placeholder="How can you improve this?"
              />
            </div>
          </div>
          <button
            onClick={addTouchpoint}
            className="mt-4 rounded-md bg-black px-6 py-2 text-base font-semibold text-white hover:bg-neutral-800 transition-colors"
          >
            Add Touchpoint
          </button>
        </div>

        {/* View toggle */}
        {touchpoints.length > 0 && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-base text-neutral-500">
              {touchpoints.length} touchpoint{touchpoints.length !== 1 ? "s" : ""} mapped
            </p>
            <div className="flex gap-2">
              {(["map", "list"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`rounded-md border px-4 py-2 text-base font-medium transition-colors ${
                    view === v
                      ? "border-black bg-black text-white"
                      : "border-neutral-300 hover:border-black"
                  }`}
                >
                  {v === "map" ? "Journey Map" : "List View"}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Journey Map View */}
        {touchpoints.length > 0 && view === "map" && (
          <div className="mb-8 space-y-6">
            {STAGES.map((stage) => {
              const tps = getTouchpointsByStage(stage.id);
              return (
                <div key={stage.id} className="rounded-lg border border-neutral-200 overflow-hidden">
                  <div className="bg-black text-white px-5 py-3">
                    <h2 className="text-lg font-bold">{stage.label}</h2>
                    <p className="text-base text-neutral-300">{stage.desc}</p>
                  </div>
                  <div className="p-5">
                    {tps.length === 0 ? (
                      <p className="text-base text-neutral-400 italic">No touchpoints yet</p>
                    ) : (
                      <div className="space-y-4">
                        {tps.map((tp) => (
                          <div key={tp.id} className="flex gap-4 items-start">
                            <div className="flex-1 rounded-md bg-neutral-50 p-4">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-base font-semibold">{tp.channel}</p>
                                <span className="text-base text-neutral-500">{tp.emotion}</span>
                              </div>
                              <p className="text-base mb-2">{tp.action}</p>
                              {/* Emotion bar */}
                              <div className="h-2 w-full rounded-full bg-neutral-200 mb-2">
                                <div
                                  className="h-2 rounded-full bg-black transition-all"
                                  style={{ width: `${emotionToBar(tp.emotion)}%` }}
                                />
                              </div>
                              <div className="flex gap-4 text-base">
                                {tp.painPoint && (
                                  <span className="text-neutral-500">
                                    Pain: {tp.painPoint}
                                  </span>
                                )}
                                {tp.opportunity && (
                                  <span className="text-neutral-600">
                                    Opportunity: {tp.opportunity}
                                  </span>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => removeTouchpoint(tp.id)}
                              className="text-neutral-400 hover:text-black text-base mt-4"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* List View */}
        {touchpoints.length > 0 && view === "list" && (
          <div className="mb-8 overflow-x-auto">
            <table className="w-full text-base">
              <thead>
                <tr className="border-b-2 border-black text-left">
                  <th className="pb-2 pr-4 font-semibold">Stage</th>
                  <th className="pb-2 pr-4 font-semibold">Channel</th>
                  <th className="pb-2 pr-4 font-semibold">Action</th>
                  <th className="pb-2 pr-4 font-semibold">Emotion</th>
                  <th className="pb-2 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {touchpoints.map((tp) => (
                  <tr key={tp.id} className="border-b border-neutral-100">
                    <td className="py-2 pr-4 capitalize">{tp.stage}</td>
                    <td className="py-2 pr-4">{tp.channel}</td>
                    <td className="py-2 pr-4">{tp.action}</td>
                    <td className="py-2 pr-4">{tp.emotion}</td>
                    <td className="py-2">
                      <button
                        onClick={() => removeTouchpoint(tp.id)}
                        className="text-neutral-400 hover:text-black"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Export */}
        {touchpoints.length > 0 && (
          <button
            onClick={handleExport}
            className="rounded-md bg-black px-6 py-2 text-base font-semibold text-white hover:bg-neutral-800 transition-colors"
          >
            Export Journey Map (.txt)
          </button>
        )}

        {touchpoints.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-neutral-200 p-12 text-center">
            <p className="text-lg text-neutral-500">
              Start by adding touchpoints for each stage of your customer
              journey. Map the channels, emotions, and opportunities at each
              step.
            </p>
          </div>
        )}
      </div>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Customer Journey Map Builder",
          description: "Map your customer journey across awareness, consideration, decision, and retention stages with touchpoints, emotions, and opportunities.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Customer Journey Builder"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Ad Copy Analyzer", href: "/resources/ad-copy-analyzer" },
          { title: "Campaign Debrief", href: "/resources/campaign-debrief" },
          { title: "Competitor Pricing Tracker", href: "/resources/competitor-pricing-tracker" },
          { title: "Content Brief Generator", href: "/resources/content-brief-generator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </main>
  );
}
