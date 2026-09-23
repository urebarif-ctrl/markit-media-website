"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

interface FormData {
  targetAudience: string;
  marketCategory: string;
  keyDifferentiator: string;
  brandPromise: string;
  proofPoints: string;
  competitiveAlternative: string;
  brandPersonality: string;
  toneOfVoice: string;
}

const emptyForm: FormData = {
  targetAudience: "",
  marketCategory: "",
  keyDifferentiator: "",
  brandPromise: "",
  proofPoints: "",
  competitiveAlternative: "",
  brandPersonality: "",
  toneOfVoice: "",
};

const personalityOptions = [
  "Professional",
  "Friendly",
  "Bold",
  "Innovative",
  "Trustworthy",
  "Playful",
  "Sophisticated",
  "Approachable",
];

const toneOptions = [
  "Formal",
  "Conversational",
  "Authoritative",
  "Inspirational",
  "Educational",
  "Witty",
];

const consistencyAreas = [
  { area: "Website", description: "Ensure your homepage, about page, and landing pages reflect the positioning statement and brand personality." },
  { area: "Social Media", description: "Align profile bios, post captions, and visual style with your defined tone of voice and brand promise." },
  { area: "Email Marketing", description: "Apply your brand voice to subject lines, body copy, and email templates consistently." },
  { area: "Sales Collateral", description: "Update pitch decks, proposals, and one-pagers to feature your positioning statement and proof points." },
  { area: "Advertising", description: "Ensure ad copy, creatives, and landing pages echo your key differentiator and brand personality." },
  { area: "Customer Support", description: "Train support teams to communicate in your defined tone and reinforce your brand promise." },
  { area: "Hiring & Internal", description: "Reflect your brand personality in job postings, onboarding materials, and internal communications." },
  { area: "Packaging & Product", description: "Align product naming, packaging copy, and in-app messaging with your positioning framework." },
];

const howToSteps = [
  { title: "Define Your Audience", description: "Be as specific as possible about who you serve. A narrow audience lets you craft a sharper, more compelling position." },
  { title: "Identify Your Differentiator", description: "Focus on what genuinely sets you apart. If a competitor can say the same thing, it is not a differentiator." },
  { title: "Back It With Proof", description: "Your positioning is only as strong as the evidence behind it. Use data, testimonials, case studies, or certifications." },
  { title: "Apply It Everywhere", description: "A positioning statement only works when it is consistently reflected across every customer touchpoint." },
];

/* ------------------------------------------------------------------ */
/*  Utility functions                                                  */
/* ------------------------------------------------------------------ */

function buildPositioningStatement(data: FormData): string {
  return `For ${data.targetAudience} who need ${data.brandPromise}, ${data.marketCategory} is the choice that ${data.keyDifferentiator}, unlike ${data.competitiveAlternative}, because ${data.proofPoints.split("\n")[0].trim()}.`;
}

function generateHeadlines(data: FormData): string[] {
  return [
    `${data.keyDifferentiator} — Built for ${data.targetAudience}`,
    `The ${data.marketCategory} That ${data.brandPromise}`,
    `Why ${data.targetAudience} Choose Us Over ${data.competitiveAlternative}`,
  ];
}

function generateElevatorPitches(data: FormData): string[] {
  return [
    `We help ${data.targetAudience} by delivering ${data.brandPromise}. Unlike ${data.competitiveAlternative}, we ${data.keyDifferentiator}.`,
    `In the ${data.marketCategory} space, we stand out because we ${data.keyDifferentiator}. Our ${data.targetAudience} trust us because ${data.proofPoints.split("\n")[0].trim()}.`,
    `Most ${data.marketCategory} options fall short for ${data.targetAudience}. We built something different — one that ${data.keyDifferentiator} and delivers on ${data.brandPromise}, every time.`,
  ];
}

function formatOutputText(data: FormData): string {
  const lines: string[] = [];
  const statement = buildPositioningStatement(data);
  const headlines = generateHeadlines(data);
  const pitches = generateElevatorPitches(data);

  lines.push("BRAND POSITIONING CANVAS");
  lines.push("=".repeat(50));
  lines.push("");

  lines.push("POSITIONING STATEMENT");
  lines.push("-".repeat(30));
  lines.push(statement);
  lines.push("");

  lines.push("BRAND IDENTITY");
  lines.push("-".repeat(30));
  lines.push(`Target Audience: ${data.targetAudience}`);
  lines.push(`Market Category: ${data.marketCategory}`);
  lines.push(`Key Differentiator: ${data.keyDifferentiator}`);
  lines.push(`Brand Promise: ${data.brandPromise}`);
  lines.push(`Proof Points: ${data.proofPoints}`);
  lines.push(`Competitive Alternative: ${data.competitiveAlternative}`);
  lines.push(`Brand Personality: ${data.brandPersonality}`);
  lines.push(`Tone of Voice: ${data.toneOfVoice}`);
  lines.push("");

  lines.push("HEADLINE DIRECTIONS");
  lines.push("-".repeat(30));
  headlines.forEach((h, i) => lines.push(`${i + 1}. ${h}`));
  lines.push("");

  lines.push("ELEVATOR PITCHES");
  lines.push("-".repeat(30));
  pitches.forEach((p, i) => {
    lines.push(`${i + 1}. ${p}`);
    lines.push("");
  });

  lines.push("CONSISTENCY CHECKLIST");
  lines.push("-".repeat(30));
  consistencyAreas.forEach((c) => {
    lines.push(`[ ] ${c.area}: ${c.description}`);
  });

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function TextInput({
  id,
  label,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Brand Positioning Canvas",
          description: "Ensure your homepage, about page, and landing pages reflect the positioning statement and brand personality.",
          url: "https://themarkitmedia.com/en/resources/brand-positioning",
          applicationCategory: "Branding Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Brand Positioning Canvas | Free Marketing Tool — Markit Media</title>
      <meta name="description" content="Ensure your homepage, about page, and landing pages reflect the positioning statement and brand personality." />
      <label htmlFor={id} className="block text-base font-bold text-black mb-2">
        {label}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-200 text-base bg-white text-black min-h-[44px] focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
      />
    </div>
  );
}

function TextAreaInput({
  id,
  label,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-base font-bold text-black mb-2">
        {label}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full px-4 py-3 border border-gray-200 text-base bg-white text-black min-h-[44px] resize-y focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
      />
    </div>
  );
}

function SelectInput({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id: string;
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-base font-bold text-black mb-2">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-200 text-base bg-white text-black min-h-[44px] appearance-none focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
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
      aria-label="Copy positioning canvas to clipboard"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      {copied ? "Copied" : "Copy to Clipboard"}
    </button>
  );
}

function DownloadButton({ text, filename }: { text: string; filename: string }) {
  const download = useCallback(() => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [text, filename]);

  return (
    <button
      onClick={download}
      aria-label="Download positioning canvas as text file"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      Download as Text
    </button>
  );
}

function PositioningStatement({ statement }: { statement: string }) {
  return (
    <div className="border border-gray-200 p-6">
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-4">
        Your Positioning Statement
      </h2>
      <blockquote className="text-lg text-black leading-relaxed border-l-4 border-black pl-6 italic">
        {statement}
      </blockquote>
    </div>
  );
}

function BrandIdentityCard({ data }: { data: FormData }) {
  const fields = [
    { label: "Target Audience", value: data.targetAudience },
    { label: "Market Category", value: data.marketCategory },
    { label: "Key Differentiator", value: data.keyDifferentiator },
    { label: "Brand Promise", value: data.brandPromise },
    { label: "Proof Points", value: data.proofPoints },
    { label: "Competitive Alternative", value: data.competitiveAlternative },
    { label: "Brand Personality", value: data.brandPersonality },
    { label: "Tone of Voice", value: data.toneOfVoice },
  ];

  return (
    <div className="border border-gray-200">
      <div className="bg-black text-white px-6 py-4">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
          Brand Identity Card
        </h3>
      </div>
      <div className="divide-y divide-gray-200">
        {fields.map((field) => (
          <div key={field.label} className="px-6 py-4 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
            <span className="text-base font-bold text-black">{field.label}</span>
            <span className="text-base text-gray-700 whitespace-pre-line">{field.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagingFramework({ data }: { data: FormData }) {
  const headlines = generateHeadlines(data);
  const pitches = generateElevatorPitches(data);

  return (
    <div className="space-y-8">
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
        Messaging Framework
      </h2>

      <div className="border border-gray-200 p-6">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
          Headline Directions
        </h3>
        <div className="space-y-3">
          {headlines.map((headline, i) => (
            <div key={i} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
              <span className="font-bold text-black min-w-[24px] text-base">{i + 1}.</span>
              <span className="text-base text-gray-700">{headline}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-gray-200 p-6">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
          Elevator Pitch Variations
        </h3>
        <div className="space-y-4">
          {pitches.map((pitch, i) => (
            <div key={i} className="flex items-start gap-3 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
              <span className="font-bold text-black min-w-[24px] text-base">{i + 1}.</span>
              <p className="text-base text-gray-700 leading-relaxed">{pitch}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ConsistencyChecklist() {
  return (
    <div className="border border-gray-200">
      <div className="bg-black text-white px-6 py-4">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
          Consistency Checklist
        </h3>
      </div>
      <div className="p-6">
        <p className="text-base text-gray-500 mb-4">
          Align your brand positioning across these eight touchpoints to build a
          coherent brand experience.
        </p>
        <div className="space-y-4">
          {consistencyAreas.map((item, i) => (
            <div key={i} className="flex items-start gap-3 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
              <span className="inline-flex items-center justify-center min-w-[28px] h-7 bg-black text-white text-base font-bold">
                {i + 1}
              </span>
              <div>
                <p className="text-base font-bold text-black">{item.area}</p>
                <p className="text-base text-gray-500 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */



export default function BrandPositioningPage() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [result, setResult] = useState<FormData | null>(null);

  function updateField(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const allFilled =
    form.targetAudience.trim() !== "" &&
    form.marketCategory.trim() !== "" &&
    form.keyDifferentiator.trim() !== "" &&
    form.brandPromise.trim() !== "" &&
    form.proofPoints.trim() !== "" &&
    form.competitiveAlternative.trim() !== "" &&
    form.brandPersonality !== "" &&
    form.toneOfVoice !== "";

  function handleGenerate() {
    if (!allFilled) return;
    setResult({ ...form });
  }

  function handleReset() {
    setForm(emptyForm);
    setResult(null);
  }

  const hasInput = Object.values(form).some((v) => v.trim() !== "");
  const plainText = result ? formatOutputText(result) : "";

  return (
    <article className="min-h-screen">
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/brand-name-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Name Generator</Link>
                <Link href="/resources/brand-name-evaluator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Name Evaluator</Link>
                <Link href="/resources/brand-voice-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Voice Generator</Link>
                <Link href="/resources/brand-voice-checker" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Voice Checker</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Brand Positioning Canvas",
          description:
            "Free brand positioning tool. Define your target audience, differentiator, and brand promise to generate a positioning statement, messaging framework, and consistency checklist.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Brand Positioning Canvas" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Brand Positioning Canvas
            </h1>
            <SectionDesc>
              Define your brand positioning across key dimensions and generate a
              positioning statement, messaging framework, and consistency
              checklist you can use across every customer touchpoint.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Form ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="border border-gray-200 p-6 space-y-6">
              <TextInput
                id="target-audience"
                label="Target Audience"
                placeholder="Who is your ideal customer? (e.g., B2B SaaS founders with 10-50 employees)"
                value={form.targetAudience}
                onChange={(v) => updateField("targetAudience", v)}
              />

              <TextInput
                id="market-category"
                label="Market Category"
                placeholder="What market or category do you compete in? (e.g., project management software)"
                value={form.marketCategory}
                onChange={(v) => updateField("marketCategory", v)}
              />

              <TextInput
                id="key-differentiator"
                label="Key Differentiator"
                placeholder="What makes you uniquely different? (e.g., combines CRM and PM in one tool)"
                value={form.keyDifferentiator}
                onChange={(v) => updateField("keyDifferentiator", v)}
              />

              <TextInput
                id="brand-promise"
                label="Brand Promise"
                placeholder="What do you promise to deliver? (e.g., save 10 hours per week on admin)"
                value={form.brandPromise}
                onChange={(v) => updateField("brandPromise", v)}
              />

              <TextAreaInput
                id="proof-points"
                label="Proof Points"
                placeholder="What evidence supports your promise? (e.g., 500+ customers, 4.8 star rating, 30% efficiency gain in case studies)"
                value={form.proofPoints}
                onChange={(v) => updateField("proofPoints", v)}
              />

              <TextInput
                id="competitive-alternative"
                label="Competitive Alternative"
                placeholder="What would customers use if you didn't exist? (e.g., Asana + HubSpot combo)"
                value={form.competitiveAlternative}
                onChange={(v) => updateField("competitiveAlternative", v)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <SelectInput
                  id="brand-personality"
                  label="Brand Personality"
                  options={personalityOptions}
                  value={form.brandPersonality}
                  onChange={(v) => updateField("brandPersonality", v)}
                />

                <SelectInput
                  id="tone-of-voice"
                  label="Tone of Voice"
                  options={toneOptions}
                  value={form.toneOfVoice}
                  onChange={(v) => updateField("toneOfVoice", v)}
                />
              </div>
            </div>
          </Animate>

          {/* Generate / Reset */}
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3 mt-8">
              <button
                onClick={handleGenerate}
                disabled={!allFilled}
                className="bg-black text-white px-8 py-4 min-h-[44px] text-base font-bold hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Generate Positioning
              </button>
              {hasInput && (
                <button
                  onClick={handleReset}
                  className="px-8 py-4 min-h-[44px] text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Reset
                </button>
              )}
              {!allFilled && (
                <p className="text-base text-gray-400 self-center">
                  Fill in all fields to generate your brand positioning.
                </p>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Results ---- */}
      {result && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-16">
          <div className="max-w-3xl mx-auto space-y-12">
            {/* Positioning statement */}
            <Animate animation="fade-up">
              <PositioningStatement statement={buildPositioningStatement(result)} />
            </Animate>

            {/* Brand identity card */}
            <Animate animation="fade-up">
              <BrandIdentityCard data={result} />
            </Animate>

            {/* Messaging framework */}
            <Animate animation="fade-up">
              <MessagingFramework data={result} />
            </Animate>

            {/* Consistency checklist */}
            <Animate animation="fade-up">
              <ConsistencyChecklist />
            </Animate>

            {/* Export actions */}
            <div className="flex flex-wrap gap-3">
              <CopyButton text={plainText} />
              <DownloadButton text={plainText} filename="brand-positioning-canvas.txt" />
            </div>
          </div>
        </section>
      )}

      {/* ---- How to Use ---- */}
      <section aria-label="How to Use This Canvas" className="px-6 lg:px-12 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-8">
              How to Use This Canvas
            </h2>
          </Animate>
          <Stagger stagger={100} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {howToSteps.map((step, i) => (
              <div key={i} className="border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <span className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-gray-300">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                      {step.title}
                    </h3>
                    <p className="text-base text-gray-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Bottom CTA ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Get Professional Brand Strategy
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              This canvas is a starting point. Our team develops comprehensive
              brand positioning strategies backed by market research, competitive
              analysis, and audience insights to help you stand out in your
              market.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Work With Our Brand Team &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Brand Positioning"
        services={[
          { title: "Branding", desc: "Strategic brand identity that differentiates you in your market.", href: "/services/branding" },
          { title: "Website Development", desc: "Websites that bring your brand to life with exceptional UX.", href: "/services/website-development" },
          { title: "Digital Marketing", desc: "Amplify your brand across every digital touchpoint.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
          { title: "Brand Guidelines Checklist", href: "/resources/brand-guidelines-checklist" },
          { title: "Brand Name Evaluator", href: "/resources/brand-name-evaluator" },
          { title: "Brand Name Generator", href: "/resources/brand-name-generator" },
          { title: "Brand Tone Generator", href: "/resources/brand-tone-generator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
