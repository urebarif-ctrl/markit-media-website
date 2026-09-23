"use client";

import { useState, useCallback, useEffect, useId } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

interface VoiceAttribute {
  name: string;
  opposite: string;
  exampleDo: string;
  exampleDont: string;
}

const VOICE_ATTRIBUTES: VoiceAttribute[] = [
  { name: "Professional", opposite: "Sloppy", exampleDo: "Our solutions deliver measurable outcomes.", exampleDont: "We kinda do stuff that works." },
  { name: "Friendly", opposite: "Cold", exampleDo: "We are glad you are here.", exampleDont: "Proceed to the next section." },
  { name: "Authoritative", opposite: "Uncertain", exampleDo: "The data confirms this approach works.", exampleDont: "This might possibly be a good idea." },
  { name: "Casual", opposite: "Stiff", exampleDo: "Let us walk you through it.", exampleDont: "Herein we shall describe the methodology." },
  { name: "Witty", opposite: "Dry", exampleDo: "Marketing without data is just guessing with a bigger budget.", exampleDont: "Data is important for marketing decisions." },
  { name: "Inspirational", opposite: "Defeatist", exampleDo: "Your brand can reach every corner of your market.", exampleDont: "It is difficult to compete in this market." },
  { name: "Technical", opposite: "Vague", exampleDo: "Implement lazy loading to reduce LCP by 40%.", exampleDont: "Make the site faster somehow." },
  { name: "Empathetic", opposite: "Dismissive", exampleDo: "We understand the pressure of tight deadlines.", exampleDont: "Deadlines are part of business." },
  { name: "Bold", opposite: "Timid", exampleDo: "We will double your pipeline in 90 days.", exampleDont: "We hope to potentially improve things." },
  { name: "Playful", opposite: "Serious", exampleDo: "Your competitors will wonder what happened.", exampleDont: "The competitive landscape may shift." },
  { name: "Sophisticated", opposite: "Crude", exampleDo: "A refined approach to customer acquisition.", exampleDont: "We grab customers for you." },
  { name: "Conversational", opposite: "Formal", exampleDo: "Here is the deal.", exampleDont: "We hereby present the following information." },
  { name: "Educational", opposite: "Condescending", exampleDo: "CPC means cost per click, the amount you pay each time someone clicks your ad.", exampleDont: "You probably do not know what CPC means." },
  { name: "Urgent", opposite: "Passive", exampleDo: "Act now before your competitors do.", exampleDont: "Whenever you get around to it." },
  { name: "Calming", opposite: "Alarming", exampleDo: "Step by step, we will get you there.", exampleDont: "If you do not do this immediately, everything fails." },
  { name: "Direct", opposite: "Evasive", exampleDo: "This service costs $2,000 per month.", exampleDont: "Pricing depends on many factors." },
  { name: "Storytelling", opposite: "Dry", exampleDo: "When Sarah launched her agency, she had zero clients and one laptop.", exampleDont: "Agency startup requires initial client acquisition." },
  { name: "Data-Driven", opposite: "Anecdotal", exampleDo: "Brands using this strategy saw 73% more conversions.", exampleDont: "Lots of brands seem to like this approach." },
  { name: "Provocative", opposite: "Safe", exampleDo: "Most marketing agencies are wasting your budget.", exampleDont: "Some agencies may not fully optimize spend." },
  { name: "Minimalist", opposite: "Verbose", exampleDo: "Less noise. More results.", exampleDont: "In the grand scheme of things, when considering all possibilities, results matter." },
];

const MIN_ATTRIBUTES = 3;
const MAX_ATTRIBUTES = 5;

const STORAGE_KEY_PROFILE = "markit-voice-profile";
const STORAGE_KEY_HISTORY = "markit-voice-history";

interface SavedProfile {
  selectedAttributes: string[];
  savedAt: string;
}

interface HistoryEntry {
  id: string;
  contentPreview: string;
  overallScore: number;
  grade: string;
  avgWordsPerSentence: number;
  checkedAt: string;
  attributeScores: Record<string, number>;
}

interface ContentAnalysis {
  avgWordsPerSentence: number;
  simpleWordPct: number;
  firstPersonCount: number;
  thirdPersonCount: number;
  questionCount: number;
  passiveCount: number;
  totalSentences: number;
  totalWords: number;
}

/* ------------------------------------------------------------------ */
/*  Utility functions                                                  */
/* ------------------------------------------------------------------ */

function analyzeContent(text: string): ContentAnalysis {
  if (!text.trim()) {
    return { avgWordsPerSentence: 0, simpleWordPct: 0, firstPersonCount: 0, thirdPersonCount: 0, questionCount: 0, passiveCount: 0, totalSentences: 0, totalWords: 0 };
  }

  // Sentence splitting: split on . ! ? followed by space or end of string
  const sentences = text
    .split(/[.!?]+(?:\s|$)/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const totalSentences = Math.max(sentences.length, 1);

  // Word splitting
  const words = text
    .split(/\s+/)
    .filter((w) => w.length > 0);
  const totalWords = words.length;

  const avgWordsPerSentence = totalWords / totalSentences;

  // Simple word percentage: words with <= 2 syllables (approximation)
  const simpleWords = words.filter((w) => countSyllables(w) <= 2).length;
  const simpleWordPct = totalWords > 0 ? (simpleWords / totalWords) * 100 : 0;

  // First person: I, we, me, us, my, our, mine, ours
  const firstPersonRegex = /\b(i|we|me|us|my|our|mine|ours)\b/gi;
  const firstPersonMatches = text.match(firstPersonRegex);
  const firstPersonCount = firstPersonMatches ? firstPersonMatches.length : 0;

  // Third person: he, she, it, they, the company, the brand, the team
  const thirdPersonRegex = /\b(he|she|it|they|the company|the brand|the team|the firm)\b/gi;
  const thirdPersonMatches = text.match(thirdPersonRegex);
  const thirdPersonCount = thirdPersonMatches ? thirdPersonMatches.length : 0;

  // Question count
  const questionMatches = text.match(/\?/g);
  const questionCount = questionMatches ? questionMatches.length : 0;

  // Passive voice indicators: was, were, been, being
  const passiveRegex = /\b(was|were|been|being)\b/gi;
  const passiveMatches = text.match(passiveRegex);
  const passiveCount = passiveMatches ? passiveMatches.length : 0;

  return { avgWordsPerSentence, simpleWordPct, firstPersonCount, thirdPersonCount, questionCount, passiveCount, totalSentences, totalWords };
}

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 3) return 1;
  let count = 0;
  const vowels = "aeiouy";
  let prevVowel = false;
  for (let i = 0; i < w.length; i++) {
    const isVowel = vowels.includes(w[i]);
    if (isVowel && !prevVowel) count++;
    prevVowel = isVowel;
  }
  // Silent e
  if (w.endsWith("e") && count > 1) count--;
  return Math.max(count, 1);
}

function getOverallScore(attributeScores: Record<string, number>, selectedCount: number): number {
  const total = Object.values(attributeScores).reduce((sum, v) => sum + v, 0);
  const max = selectedCount * 5;
  return max > 0 ? Math.round((total / max) * 100) : 0;
}

function getGrade(pct: number): string {
  if (pct >= 90) return "A";
  if (pct >= 80) return "B";
  if (pct >= 70) return "C";
  if (pct >= 60) return "D";
  return "F";
}

function getGradeDescription(grade: string): string {
  switch (grade) {
    case "A": return "Excellent voice consistency. Your content closely matches your defined brand voice.";
    case "B": return "Strong consistency with minor deviations. A few attributes could be strengthened.";
    case "C": return "Moderate consistency. Several voice attributes are not coming through clearly.";
    case "D": return "Weak consistency. Your content does not reflect most of your brand voice attributes.";
    default: return "Major voice inconsistency. The content needs significant revision to match your brand voice.";
  }
}

function getSuggestions(attributeScores: Record<string, number>): string[] {
  const suggestions: string[] = [];
  for (const [name, score] of Object.entries(attributeScores)) {
    if (score <= 2) {
      const attr = VOICE_ATTRIBUTES.find((a) => a.name === name);
      if (attr) {
        suggestions.push(`Your "${attr.name}" voice is weak (${score}/5). Avoid sounding ${attr.opposite.toLowerCase()}. Try phrases like: "${attr.exampleDo}"`);
      }
    }
  }
  return suggestions;
}

function formatExportText(
  selectedAttributes: string[],
  attributeScores: Record<string, number>,
  analysis: ContentAnalysis,
  contentText: string,
): string {
  const lines: string[] = [];
  const overall = getOverallScore(attributeScores, selectedAttributes.length);
  const grade = getGrade(overall);

  lines.push("BRAND VOICE CONSISTENCY REPORT");
  lines.push("=".repeat(50));
  lines.push("");

  lines.push("VOICE PROFILE");
  lines.push("-".repeat(30));
  for (const name of selectedAttributes) {
    const attr = VOICE_ATTRIBUTES.find((a) => a.name === name);
    if (attr) {
      lines.push(`  We are ${attr.name}. We are NOT ${attr.opposite}.`);
      lines.push(`    Do: "${attr.exampleDo}"`);
      lines.push(`    Don't: "${attr.exampleDont}"`);
    }
  }
  lines.push("");

  lines.push("CONSISTENCY SCORES");
  lines.push("-".repeat(30));
  lines.push(`Overall Score: ${overall}% (Grade: ${grade})`);
  lines.push(`Assessment: ${getGradeDescription(grade)}`);
  lines.push("");
  for (const name of selectedAttributes) {
    const score = attributeScores[name] ?? 0;
    lines.push(`  ${name}: ${score}/5`);
  }
  lines.push("");

  lines.push("CONTENT METRICS");
  lines.push("-".repeat(30));
  lines.push(`  Total words: ${analysis.totalWords}`);
  lines.push(`  Total sentences: ${analysis.totalSentences}`);
  lines.push(`  Average words per sentence: ${analysis.avgWordsPerSentence.toFixed(1)}`);
  lines.push(`  Simple word percentage: ${analysis.simpleWordPct.toFixed(1)}%`);
  lines.push(`  First person usage: ${analysis.firstPersonCount} occurrences`);
  lines.push(`  Third person usage: ${analysis.thirdPersonCount} occurrences`);
  lines.push(`  Questions: ${analysis.questionCount}`);
  lines.push(`  Passive voice indicators: ${analysis.passiveCount}`);
  lines.push("");

  const suggestions = getSuggestions(attributeScores);
  if (suggestions.length > 0) {
    lines.push("SUGGESTIONS");
    lines.push("-".repeat(30));
    suggestions.forEach((s, i) => {
      lines.push(`  ${i + 1}. ${s}`);
    });
    lines.push("");
  }

  lines.push("EVALUATED CONTENT");
  lines.push("-".repeat(30));
  lines.push(contentText);
  lines.push("");
  lines.push(`Generated by Markit Media Brand Voice Checker`);
  lines.push(`Date: ${new Date().toLocaleDateString()}`);

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function AttributeChip({
  attr,
  selected,
  disabled,
  onToggle,
}: {
  attr: VoiceAttribute;
  selected: boolean;
  disabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled && !selected}
      aria-pressed={selected}
      aria-label={`${attr.name} voice attribute`}
      className={`min-h-[44px] px-5 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
        selected
          ? "bg-black text-white"
          : disabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-black border border-gray-200 hover:bg-gray-100"
      }`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Brand Voice Consistency Checker",
          description: "Select 3 to 5 voice attributes that describe how your brand communicates. Review the Do and Do Not examples for each.",
          url: "https://themarkitmedia.com/en/resources/brand-voice-checker",
          applicationCategory: "Branding Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Brand Voice Consistency Checker | Free Marketing Tool — Markit Media</title>
      <link rel="canonical" href="https://themarkitmedia.com/en/resources/brand-voice-checker" />
      <meta name="description" content="Select 3 to 5 voice attributes that describe how your brand communicates. Review the Do and Do Not examples for each." />
      {attr.name}
    </button>
  );
}

function AttributeDetail({ attr }: { attr: VoiceAttribute }) {
  return (
    <div className="border border-gray-200 p-6">
      <p className="text-base font-bold text-black mb-2">
        We are {attr.name}.
      </p>
      <p className="text-base text-gray-500 mb-4">
        We are NOT {attr.opposite}.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border border-gray-200 p-4">
          <p className="text-base font-bold text-black mb-1">Do</p>
          <p className="text-base text-gray-700 leading-relaxed">
            &ldquo;{attr.exampleDo}&rdquo;
          </p>
        </div>
        <div className="border border-gray-200 p-4">
          <p className="text-base font-bold text-black mb-1">Do Not</p>
          <p className="text-base text-gray-700 leading-relaxed">
            &ldquo;{attr.exampleDont}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

function ToneRatingRow({
  attributeName,
  value,
  onChange,
}: {
  attributeName: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const groupId = useId();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4">
      <label id={`${groupId}-label`} className="text-base font-bold text-black flex-1">
        {attributeName}
      </label>
      <fieldset className="flex gap-0 border border-gray-200" aria-labelledby={`${groupId}-label`}>
        <legend className="sr-only">Tone match score for {attributeName}</legend>
        {[1, 2, 3, 4, 5].map((n) => {
          const isSelected = value === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              aria-label={`${n} out of 5`}
              aria-pressed={isSelected}
              className={`min-h-[44px] min-w-[44px] px-3 py-2 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                isSelected
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              } ${n > 1 ? "border-l border-gray-200" : ""}`}
            >
              {n}
            </button>
          );
        })}
      </fieldset>
    </div>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="border border-gray-200 p-4">
      <p className="text-base text-gray-500 mb-1">{label}</p>
      <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
        {value}
      </p>
      {detail && <p className="text-base text-gray-500 mt-1">{detail}</p>}
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
      aria-label="Copy report to clipboard"
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
      aria-label="Download report as text file"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      Export as .txt
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Steps guide                                                        */
/* ------------------------------------------------------------------ */

const howToSteps = [
  { title: "Define Your Voice", description: "Select 3 to 5 voice attributes that describe how your brand communicates. Review the Do and Do Not examples for each." },
  { title: "Paste Your Content", description: "Enter the content you want to evaluate. It can be a blog post, email, landing page copy, social media post, or any brand communication." },
  { title: "Rate Tone Match", description: "For each voice attribute, rate how well your content reflects that quality on a scale of 1 (weak) to 5 (strong). Be honest." },
  { title: "Review and Improve", description: "Check your overall score, review suggestions for low-scoring attributes, and revise your content. Save your voice profile to reuse it." },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */



export default function BrandVoiceCheckerPage() {
  const textareaId = useId();

  /* -- State -- */
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [step, setStep] = useState<1 | 2>(1);
  const [contentText, setContentText] = useState("");
  const [attributeScores, setAttributeScores] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [profileLoaded, setProfileLoaded] = useState(false);

  /* -- Load saved profile and history from localStorage -- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (raw) {
        const saved: SavedProfile = JSON.parse(raw);
        if (saved.selectedAttributes && saved.selectedAttributes.length >= MIN_ATTRIBUTES) {
          setSelectedNames(saved.selectedAttributes);
          setProfileLoaded(true);
        }
      }
    } catch {
      /* ignore */
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (raw) {
        setHistory(JSON.parse(raw));
      }
    } catch {
      /* ignore */
    }
  }, []);

  /* -- Derived -- */
  const selectedAttrs = selectedNames
    .map((name) => VOICE_ATTRIBUTES.find((a) => a.name === name))
    .filter(Boolean) as VoiceAttribute[];

  const canProceedToStep2 = selectedNames.length >= MIN_ATTRIBUTES && selectedNames.length <= MAX_ATTRIBUTES;
  const allRated = canProceedToStep2 && selectedNames.every((name) => attributeScores[name] >= 1);
  const hasContent = contentText.trim().length > 0;

  const analysis = analyzeContent(contentText);
  const overallPct = getOverallScore(attributeScores, selectedNames.length);
  const grade = getGrade(overallPct);
  const suggestions = getSuggestions(attributeScores);

  const exportText = showResults
    ? formatExportText(selectedNames, attributeScores, analysis, contentText)
    : "";

  /* -- Handlers -- */
  function toggleAttribute(name: string) {
    setSelectedNames((prev) => {
      if (prev.includes(name)) {
        return prev.filter((n) => n !== name);
      }
      if (prev.length >= MAX_ATTRIBUTES) return prev;
      return [...prev, name];
    });
  }

  function handleProceedToStep2() {
    if (!canProceedToStep2) return;
    setStep(2);
    // Initialize attribute scores
    const initial: Record<string, number> = {};
    for (const name of selectedNames) {
      initial[name] = attributeScores[name] || 0;
    }
    setAttributeScores(initial);
    setShowResults(false);
  }

  function handleEvaluate() {
    if (!allRated || !hasContent) return;
    setShowResults(true);

    // Save to history
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      contentPreview: contentText.slice(0, 80) + (contentText.length > 80 ? "..." : ""),
      overallScore: overallPct,
      grade,
      avgWordsPerSentence: analysis.avgWordsPerSentence,
      checkedAt: new Date().toISOString(),
      attributeScores: { ...attributeScores },
    };
    setHistory((prev) => {
      const updated = [entry, ...prev].slice(0, 20);
      try {
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
      } catch {
        /* ignore */
      }
      return updated;
    });
  }

  function handleSaveProfile() {
    const profile: SavedProfile = {
      selectedAttributes: selectedNames,
      savedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
      setProfileLoaded(true);
    } catch {
      /* ignore */
    }
  }

  function handleClearProfile() {
    try {
      localStorage.removeItem(STORAGE_KEY_PROFILE);
    } catch {
      /* ignore */
    }
    setProfileLoaded(false);
  }

  function handleStartOver() {
    setStep(1);
    setContentText("");
    setAttributeScores({});
    setShowResults(false);
  }

  function handleClearHistory() {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY_HISTORY);
    } catch {
      /* ignore */
    }
  }

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
                <Link href="/resources/brand-tone-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Tone Generator</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Brand Voice Consistency Checker",
          description:
            "Free brand voice consistency tool. Define your voice attributes, paste content, and evaluate how well it matches your brand guidelines.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Brand Voice Checker" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Brand Voice Consistency Checker
            </h1>
            <SectionDesc>
              Define your brand voice attributes, paste your content, and
              evaluate how consistently it reflects your brand personality.
              Get a consistency score, automated content metrics, and
              actionable suggestions to tighten your voice.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Step Indicator ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex gap-0">
              <div
                className={`flex-1 px-6 py-4 text-base font-bold text-center border border-gray-200 ${
                  step === 1 ? "bg-black text-white" : "bg-white text-gray-400"
                }`}
              >
                Step 1: Define Brand Voice
              </div>
              <div
                className={`flex-1 px-6 py-4 text-base font-bold text-center border border-gray-200 border-l-0 ${
                  step === 2 ? "bg-black text-white" : "bg-white text-gray-400"
                }`}
              >
                Step 2: Evaluate Content
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  STEP 1: Define Brand Voice                                      */}
      {/* ================================================================ */}
      {step === 1 && (
        <section aria-label="Select Your Voice Attributes" className="px-6 lg:px-12 pb-12">
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Attribute selector */}
            <Animate animation="fade-up">
              <div className="border border-gray-200 p-6">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                  Select Your Voice Attributes
                </h2>
                <p className="text-base text-gray-500 mb-6">
                  Choose {MIN_ATTRIBUTES} to {MAX_ATTRIBUTES} attributes that define how your brand speaks.
                  {selectedNames.length > 0 && (
                    <span className="font-bold text-black">
                      {" "}{selectedNames.length} of {MAX_ATTRIBUTES} selected.
                    </span>
                  )}
                </p>
                <div className="flex flex-wrap gap-3" role="group" aria-label="Voice attributes">
                  {VOICE_ATTRIBUTES.map((attr) => (
                    <AttributeChip
                      key={attr.name}
                      attr={attr}
                      selected={selectedNames.includes(attr.name)}
                      disabled={selectedNames.length >= MAX_ATTRIBUTES}
                      onToggle={() => toggleAttribute(attr.name)}
                    />
                  ))}
                </div>
              </div>
            </Animate>

            {/* Selected attribute details */}
            {selectedAttrs.length > 0 && (
              <Animate animation="fade-up">
                <div className="space-y-4">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                    Your Brand Voice Definition
                  </h2>
                  {selectedAttrs.map((attr) => (
                    <AttributeDetail key={attr.name} attr={attr} />
                  ))}
                </div>
              </Animate>
            )}

            {/* Actions */}
            <Animate animation="fade-up">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleProceedToStep2}
                  disabled={!canProceedToStep2}
                  className="bg-black text-white px-8 py-4 min-h-[44px] text-base font-bold hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Continue to Evaluation
                </button>
                {canProceedToStep2 && (
                  <button
                    onClick={handleSaveProfile}
                    className="px-8 py-4 min-h-[44px] text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    {profileLoaded ? "Update Saved Profile" : "Save Voice Profile"}
                  </button>
                )}
                {profileLoaded && (
                  <button
                    onClick={handleClearProfile}
                    className="px-8 py-4 min-h-[44px] text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    Clear Saved Profile
                  </button>
                )}
                {!canProceedToStep2 && (
                  <p className="text-base text-gray-400 self-center">
                    Select {MIN_ATTRIBUTES} to {MAX_ATTRIBUTES} attributes to continue.
                  </p>
                )}
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/*  STEP 2: Evaluate Content                                        */}
      {/* ================================================================ */}
      {step === 2 && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Back button */}
            <Animate animation="fade-up">
              <button
                onClick={() => { setStep(1); setShowResults(false); }}
                className="px-5 py-3 min-h-[44px] text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                &larr; Back to Voice Definition
              </button>
            </Animate>

            {/* Selected voice summary */}
            <Animate animation="fade-up">
              <div className="border border-gray-200 p-6">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  Your Voice Profile
                </h2>
                <div className="flex flex-wrap gap-2">
                  {selectedAttrs.map((attr) => (
                    <span
                      key={attr.name}
                      className="bg-black text-white px-4 py-2 text-base font-bold"
                    >
                      {attr.name}
                    </span>
                  ))}
                </div>
              </div>
            </Animate>

            {/* Content textarea */}
            <Animate animation="fade-up">
              <div className="border border-gray-200 p-6">
                <label
                  htmlFor={textareaId}
                  className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black block mb-3"
                >
                  Paste Your Content
                </label>
                <p className="text-base text-gray-500 mb-4">
                  Enter the text you want to evaluate against your brand voice. Blog posts, emails, ad copy, social posts, or any brand communication.
                </p>
                <textarea
                  id={textareaId}
                  value={contentText}
                  onChange={(e) => {
                    setContentText(e.target.value);
                    setShowResults(false);
                  }}
                  rows={8}
                  placeholder="Paste your content here..."
                  className="w-full border border-gray-200 p-4 text-base text-black placeholder:text-gray-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 resize-y"
                />
                {hasContent && (
                  <p className="text-base text-gray-500 mt-2">
                    {analysis.totalWords} words, {analysis.totalSentences} sentences
                  </p>
                )}
              </div>
            </Animate>

            {/* Automated content metrics */}
            {hasContent && (
              <Animate animation="fade-up">
                <div className="border border-gray-200 p-6">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                    Automated Content Metrics
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <MetricCard
                      label="Avg. Words per Sentence"
                      value={analysis.avgWordsPerSentence.toFixed(1)}
                      detail={
                        analysis.avgWordsPerSentence <= 15
                          ? "Short and punchy"
                          : analysis.avgWordsPerSentence <= 20
                            ? "Moderate length"
                            : "Consider shorter sentences"
                      }
                    />
                    <MetricCard
                      label="Simple Word %"
                      value={`${analysis.simpleWordPct.toFixed(0)}%`}
                      detail={
                        analysis.simpleWordPct >= 80
                          ? "Very readable"
                          : analysis.simpleWordPct >= 60
                            ? "Moderately readable"
                            : "May be hard to read"
                      }
                    />
                    <MetricCard
                      label="First Person Usage"
                      value={String(analysis.firstPersonCount)}
                      detail="I, we, me, us, my, our"
                    />
                    <MetricCard
                      label="Third Person Usage"
                      value={String(analysis.thirdPersonCount)}
                      detail="He, she, it, they, the company"
                    />
                    <MetricCard
                      label="Questions Asked"
                      value={String(analysis.questionCount)}
                      detail={
                        analysis.questionCount > 0
                          ? "Engages the reader"
                          : "No direct questions found"
                      }
                    />
                    <MetricCard
                      label="Passive Voice Indicators"
                      value={String(analysis.passiveCount)}
                      detail={
                        analysis.passiveCount <= 2
                          ? "Mostly active voice"
                          : "Consider more active phrasing"
                      }
                    />
                  </div>
                </div>
              </Animate>
            )}

            {/* Tone match scoring */}
            {hasContent && (
              <Animate animation="fade-up">
                <div className="border border-gray-200">
                  <div className="bg-black text-white px-6 py-4">
                    <span className="font-[family-name:var(--font-display)] text-base font-extrabold">
                      Tone Match Scores (1 = Weak, 5 = Strong)
                    </span>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {selectedNames.map((name) => (
                      <ToneRatingRow
                        key={name}
                        attributeName={name}
                        value={attributeScores[name] || 0}
                        onChange={(v) => {
                          setAttributeScores((prev) => ({ ...prev, [name]: v }));
                          setShowResults(false);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </Animate>
            )}

            {/* Evaluate button */}
            {hasContent && (
              <Animate animation="fade-up">
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleEvaluate}
                    disabled={!allRated || !hasContent}
                    className="bg-black text-white px-8 py-4 min-h-[44px] text-base font-bold hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Evaluate Consistency
                  </button>
                  {!allRated && (
                    <p className="text-base text-gray-400 self-center">
                      Rate all voice attributes to see results.
                    </p>
                  )}
                </div>
              </Animate>
            )}

            {/* ---- Results ---- */}
            {showResults && (
              <div className="space-y-10">
                {/* Overall score */}
                <Animate animation="fade-up">
                  <div className="border border-gray-200 p-6">
                    <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                      Overall Voice Consistency
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                        <p className="text-base text-gray-500 mb-1">Score</p>
                        <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
                          {overallPct}%
                        </p>
                      </div>
                      <div>
                        <p className="text-base text-gray-500 mb-1">Grade</p>
                        <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
                          {grade}
                        </p>
                      </div>
                      <div>
                        <p className="text-base text-gray-500 mb-1">Assessment</p>
                        <p className="text-base text-gray-700 leading-relaxed">{getGradeDescription(grade)}</p>
                      </div>
                    </div>
                  </div>
                </Animate>

                {/* Per-attribute breakdown */}
                <Animate animation="fade-up">
                  <div className="border border-gray-200 p-6">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                      Attribute Breakdown
                    </h3>
                    <div className="space-y-5" role="img" aria-label="Bar chart showing tone match per attribute">
                      {selectedNames.map((name) => {
                        const score = attributeScores[name] || 0;
                        const pct = (score / 5) * 100;
                        return (
                          <div key={name}>
                            <div className="flex justify-between mb-2">
                              <span className="text-base font-bold text-black">{name}</span>
                              <span className="text-base text-gray-500">{score}/5</span>
                            </div>
                            <div className="w-full bg-gray-100 h-8">
                              <div
                                className="bg-black h-8 transition-all duration-500 motion-reduce:transition-none"
                                style={{ width: `${pct}%` }}
                                role="presentation"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Animate>

                {/* Suggestions */}
                {suggestions.length > 0 && (
                  <Animate animation="fade-up">
                    <div className="space-y-4">
                      <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
                        Suggestions for Improvement
                      </h3>
                      <p className="text-base text-gray-500">
                        These attributes scored 2 or below. Revise your content to better reflect them.
                      </p>
                      {suggestions.map((suggestion, i) => (
                        <div key={i} className="border border-gray-200">
                          <div className="bg-black text-white px-6 py-4">
                            <p className="font-[family-name:var(--font-display)] text-base font-extrabold">
                              Suggestion {i + 1}
                            </p>
                          </div>
                          <div className="p-6">
                            <p className="text-base text-gray-700 leading-relaxed">{suggestion}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Animate>
                )}

                {/* Export actions */}
                <Animate animation="fade-up">
                  <div className="flex flex-wrap gap-3">
                    <DownloadButton text={exportText} filename="brand-voice-report.txt" />
                    <CopyButton text={exportText} />
                    <button
                      onClick={handleStartOver}
                      className="px-8 py-4 min-h-[44px] text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                    >
                      Start Over
                    </button>
                  </div>
                </Animate>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ---- History ---- */}
      {history.length > 0 && (
        <section aria-label="Evaluation History" className="px-6 lg:px-12 py-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <Animate animation="fade-up">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
                  Evaluation History
                </h2>
                <button
                  onClick={handleClearHistory}
                  className="px-5 py-3 min-h-[44px] text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Clear History
                </button>
              </div>
            </Animate>
            <Stagger stagger={80} className="space-y-4">
              {history.map((entry) => (
                <div key={entry.id} className="border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4">
                    <div className="flex-1">
                      <p className="text-base font-bold text-black mb-1">{entry.contentPreview}</p>
                      <p className="text-base text-gray-500">
                        {new Date(entry.checkedAt).toLocaleDateString()} &middot;{" "}
                        {entry.avgWordsPerSentence.toFixed(1)} avg words/sentence
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-base text-gray-500">{entry.overallScore}%</span>
                      <span className="bg-black text-white px-4 py-2 text-base font-bold min-w-[44px] text-center">
                        {entry.grade}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* ---- How to Use ---- */}
      <section aria-label="How to Use This Tool" className="px-6 lg:px-12 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-8">
              How to Use This Tool
            </h2>
          </Animate>
          <Stagger stagger={100} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {howToSteps.map((s, i) => (
              <div key={i} className="border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <span className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-gray-300">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                      {s.title}
                    </h3>
                    <p className="text-base text-gray-500 leading-relaxed">
                      {s.description}
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
              Need Help Defining Your Brand Voice?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              A self-assessment is a starting point. Our team develops
              comprehensive brand voice guides backed by audience research,
              competitor analysis, and messaging frameworks that keep every
              piece of content on brand.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Work With Our Branding Team &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Brand Voice Checker"
        services={[
          { title: "Branding", desc: "Strategic brand identity that differentiates you in your market.", href: "/services/branding" },
          { title: "Website Development", desc: "Websites that bring your brand to life with exceptional UX.", href: "/services/website-development" },
          { title: "Digital Marketing", desc: "Amplify your brand across every digital touchpoint.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
          { title: "Brand Name Generator", href: "/resources/brand-name-generator" },
          { title: "Brand Positioning", href: "/resources/brand-positioning" },
          { title: "Brand Tone Generator", href: "/resources/brand-tone-generator" },
          { title: "Brand Voice Generator", href: "/resources/brand-voice-generator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
