"use client";
import Link from "next/link";

import { useState } from "react";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

const FORMULAS = [
  { id: "how-to", label: "How To", template: "How to {benefit} {qualifier}" },
  { id: "number", label: "Number List", template: "{number} {adjective} Ways to {benefit}" },
  { id: "question", label: "Question", template: "{question} Here's {answer}" },
  { id: "negative", label: "Negative Angle", template: "{number} {topic} Mistakes That {consequence}" },
  { id: "comparison", label: "Comparison", template: "{option_a} vs {option_b}: Which {metric} Better?" },
  { id: "urgency", label: "Urgency", template: "Don't {action} Until You {condition}" },
  { id: "authority", label: "Authority", template: "The {adjective} Guide to {topic} [{year}]" },
  { id: "benefit", label: "Benefit-First", template: "Get {benefit} Without {pain_point}" },
] as const;

interface HeadlineVariant {
  id: string;
  text: string;
  formula: string;
  score: number;
  feedback: string[];
}

let nextId = 1;

function scoreHeadline(text: string): { score: number; feedback: string[] } {
  let score = 0;
  const feedback: string[] = [];
  const lower = text.toLowerCase();

  // Length
  if (text.length >= 40 && text.length <= 65) {
    score += 20;
    feedback.push("Ideal length for search and social (40-65 chars).");
  } else if (text.length < 40) {
    score += 10;
    feedback.push("Could be longer. Aim for 40-65 characters.");
  } else {
    score += 5;
    feedback.push("May get truncated. Consider shortening to under 65 characters.");
  }

  // Numbers
  if (/\d/.test(text)) {
    score += 15;
    feedback.push("Contains a number, which boosts click-through rates.");
  }

  // Power words
  const powerWords = ["proven", "ultimate", "essential", "complete", "best", "top", "expert", "free", "secret", "exclusive", "new", "simple", "fast", "easy"];
  const found = powerWords.filter((w) => lower.includes(w));
  if (found.length > 0) {
    score += 15;
    feedback.push(`Power words: ${found.join(", ")}.`);
  }

  // Emotional words
  const emotionalWords = ["amazing", "shocking", "surprising", "incredible", "unbelievable", "mind-blowing", "stunning", "powerful", "brilliant"];
  const emotions = emotionalWords.filter((w) => lower.includes(w));
  if (emotions.length > 0) {
    score += 10;
    feedback.push(`Emotional trigger: ${emotions.join(", ")}.`);
  }

  // Question
  if (text.includes("?")) {
    score += 10;
    feedback.push("Question format creates curiosity.");
  }

  // Brackets/parentheses
  if (/[\[\(]/.test(text)) {
    score += 10;
    feedback.push("Brackets/parentheses boost CTR by adding context.");
  }

  // Starts with capital
  if (text[0] === text[0]?.toUpperCase()) {
    score += 5;
  }

  // Year
  if (/202[4-9]|203\d/.test(text)) {
    score += 10;
    feedback.push("Contains a year, signalling freshness.");
  }

  // Colon or dash (indicating structure)
  if (/[:—–-]/.test(text)) {
    score += 5;
    feedback.push("Structured format with separator.");
  }

  return { score: Math.min(score, 100), feedback };
}



export default function HeadlineSplitTesterPage() {
  const [variants, setVariants] = useState<HeadlineVariant[]>([]);
  const [input, setInput] = useState("");
  const [selectedFormula, setSelectedFormula] = useState("");
  const [topic, setTopic] = useState("");
  const [copied, setCopied] = useState("");

  function addVariant() {
    if (!input.trim()) return;
    const { score, feedback } = scoreHeadline(input);
    setVariants((prev) => [
      ...prev,
      { id: String(nextId++), text: input, formula: selectedFormula || "Custom", score, feedback },
    ]);
    setInput("");
  }

  function removeVariant(id: string) {
    setVariants((prev) => prev.filter((v) => v.id !== id));
  }

  function generateFromFormula(formula: typeof FORMULAS[number]) {
    const t = topic || "marketing";
    const templates: Record<string, string> = {
      "how-to": `How to Improve Your ${t.charAt(0).toUpperCase() + t.slice(1)} in 30 Days`,
      number: `7 Proven Ways to Boost Your ${t.charAt(0).toUpperCase() + t.slice(1)}`,
      question: `Is Your ${t.charAt(0).toUpperCase() + t.slice(1)} Strategy Working? Here's How to Tell`,
      negative: `5 ${t.charAt(0).toUpperCase() + t.slice(1)} Mistakes That Cost You Customers`,
      comparison: `Organic vs Paid ${t.charAt(0).toUpperCase() + t.slice(1)}: Which Delivers Better ROI?`,
      urgency: `Don't Launch Your Next Campaign Until You Read This ${t.charAt(0).toUpperCase() + t.slice(1)} Guide`,
      authority: `The Complete Guide to ${t.charAt(0).toUpperCase() + t.slice(1)} [2026]`,
      benefit: `Get More ${t.charAt(0).toUpperCase() + t.slice(1)} Results Without Increasing Your Budget`,
    };
    setInput(templates[formula.id] || formula.template);
    setSelectedFormula(formula.label);
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 2000);
  }

  function handleExport() {
    const sorted = [...variants].sort((a, b) => b.score - a.score);
    const lines = [
      "HEADLINE SPLIT TEST PLAN",
      "=".repeat(50),
      `Generated with Markit Media`,
      topic ? `Topic: ${topic}` : "",
      "",
      "VARIANTS (ranked by score)",
      "-".repeat(40),
      ...sorted.map(
        (v, i) =>
          `${i + 1}. "${v.text}"\n   Score: ${v.score}/100 | Formula: ${v.formula}\n   ${v.feedback.join(" ")}\n`
      ),
      "",
      "TEST RECOMMENDATION",
      "-".repeat(40),
      sorted.length >= 2
        ? `Test "${sorted[0].text}" against "${sorted[1].text}" first.`
        : "Add at least 2 variants to create a meaningful test.",
    ].filter(Boolean);
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "headline-split-test.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  const sorted = [...variants].sort((a, b) => b.score - a.score);
  const winner = sorted[0];

  return (
    <main className="min-h-screen bg-white text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Headline Split Test Generator",
          description: "Generate headline variations for A/B testing using proven formulas. Score each variant and export test plans for blogs, ads, and emails.",
          url: "https://themarkitmedia.com/en/resources/headline-split-tester",
          applicationCategory: "Advertising Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Headline Split Test Generator | Free Marketing Tool — Markit Media</title>
      <meta name="description" content="Generate headline variations for A/B testing using proven formulas. Score each variant and export test plans for blogs, ads, and emails." />
      <nav className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/resources" className="hover:text-black transition-colors">Resources</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">Headline Split Test Generator</li>
        </ol>
      </nav>
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
          Headline Split Test Generator
        </h1>
        <p className="text-lg text-neutral-600 mb-10">
          Generate headline variations using proven formulas, score them, and
          create A/B test plans.
        </p>

        {/* Topic */}
        <div className="mb-6">
          <label className="block text-base font-semibold mb-1">
            Topic / Keyword (for formula generation)
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="max-w-md rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
            placeholder="e.g. email marketing, SEO, social media"
          />
        </div>

        {/* Formulas */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-3">Headline Formulas</h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {FORMULAS.map((f) => (
              <button
                key={f.id}
                onClick={() => generateFromFormula(f)}
                className="rounded-md border border-neutral-300 px-4 py-3 text-left hover:border-black transition-colors"
              >
                <p className="text-base font-semibold">{f.label}</p>
                <p className="text-base text-neutral-500 truncate">
                  {f.template}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="mb-8 rounded-lg border border-neutral-200 p-5">
          <h2 className="text-lg font-bold mb-3">Add Headline Variant</h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addVariant()}
              className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              placeholder="Type or click a formula above to generate"
            />
            <button
              onClick={addVariant}
              className="rounded-md bg-black px-6 py-2 text-base font-semibold text-white hover:bg-neutral-800 transition-colors"
            >
              Add
            </button>
          </div>
          <p className="text-base text-neutral-400 mt-1">
            {input.length} characters
            {input.length > 0 &&
              (input.length <= 65
                ? " — within optimal range"
                : " — may be truncated")}
          </p>
        </div>

        {/* Variants */}
        {variants.length > 0 && (
          <>
            {/* Winner */}
            {variants.length >= 2 && winner && (
              <div className="mb-6 rounded-lg border-2 border-black p-5 flex items-center justify-between">
                <div>
                  <p className="text-base text-neutral-500">
                    Top Scoring Variant
                  </p>
                  <p className="text-lg font-bold">&ldquo;{winner.text}&rdquo;</p>
                </div>
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white text-xl font-bold">
                  {winner.score}
                </span>
              </div>
            )}

            <div className="mb-8 space-y-4">
              {sorted.map((v, idx) => (
                <div
                  key={v.id}
                  className={`rounded-lg border p-5 ${idx === 0 && variants.length >= 2 ? "border-black" : "border-neutral-200"}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-base font-semibold">&ldquo;{v.text}&rdquo;</p>
                      <p className="text-base text-neutral-500">
                        {v.formula} · {v.text.length} chars
                      </p>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <span className="text-lg font-bold">{v.score}/100</span>
                      <button
                        onClick={() => handleCopy(v.text)}
                        className="rounded border border-neutral-300 px-3 py-1 text-base hover:border-black transition-colors"
                      >
                        {copied === v.text ? "Copied!" : "Copy"}
                      </button>
                      <button
                        onClick={() => removeVariant(v.id)}
                        className="text-neutral-400 hover:text-black text-base"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-neutral-100 mb-3">
                    <div
                      className="h-2 rounded-full bg-black transition-all"
                      style={{ width: `${v.score}%` }}
                    />
                  </div>
                  <ul className="space-y-1">
                    {v.feedback.map((f, i) => (
                      <li key={i} className="text-base text-neutral-600 flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <button
              onClick={handleExport}
              className="rounded-md bg-black px-6 py-2 text-base font-semibold text-white hover:bg-neutral-800 transition-colors"
            >
              Export Test Plan (.txt)
            </button>
          </>
        )}

        {variants.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-neutral-200 p-12 text-center">
            <p className="text-lg text-neutral-500">
              Click a formula above to generate a headline, or type your own.
              Add at least 2 variants to compare scores and create a test plan.
            </p>
          </div>
        )}
      </div>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Headline Split Test Generator",
          description: "Generate headline variations for A/B testing using proven formulas. Score each variant and export test plans for blogs, ads, and emails.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Headline Split Tester"
        services={[
          { title: "Content Marketing", desc: "Strategic content that drives traffic, engagement, and conversions.", href: "/services/content-marketing" },
          { title: "SEO", desc: "Content optimized for search engines and human readers alike.", href: "/services/seo" },
          { title: "Social Media Marketing", desc: "Distribute your content where your audience already is.", href: "/services/social-media-marketing" },
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
