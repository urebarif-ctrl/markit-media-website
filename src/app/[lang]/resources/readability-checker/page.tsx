"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Abbreviation patterns to ignore during sentence splitting          */
/* ------------------------------------------------------------------ */
const ABBREVIATIONS = /\b(?:Mr|Mrs|Ms|Dr|Prof|Sr|Jr|St|Ave|Blvd|Inc|Corp|Ltd|Co|U\.S|U\.K|U\.N|e\.g|i\.e|vs|etc|approx|dept|govt|assn|Bros|Gen|Rep|Sen|Gov|Sgt|Cpl|Pvt|Cmdr|Adm|Capt|Lt|Col|Maj)\./gi;

/* ------------------------------------------------------------------ */
/*  Syllable counting                                                  */
/* ------------------------------------------------------------------ */
function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length === 0) return 0;
  if (w.length <= 2) return 1;

  // Count vowel groups (a, e, i, o, u, y)
  const vowelGroups = w.match(/[aeiouy]+/g);
  let count = vowelGroups ? vowelGroups.length : 0;

  // Subtract 1 for silent e at end
  if (w.endsWith("e") && !w.endsWith("le")) {
    count -= 1;
  }

  // Words ending in "le" after a consonant: add 1
  if (/[^aeiouy]le$/.test(w)) {
    count += 1;
  }

  // Minimum 1 syllable per word
  return Math.max(1, count);
}

/* ------------------------------------------------------------------ */
/*  Sentence splitting                                                 */
/* ------------------------------------------------------------------ */
function countSentences(text: string): number {
  // Replace known abbreviations with placeholder (no period)
  let cleaned = text.replace(ABBREVIATIONS, (match) =>
    match.replace(/\./g, "․")
  );

  // Split on sentence-ending punctuation
  const sentences = cleaned
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return Math.max(1, sentences.length);
}

/* ------------------------------------------------------------------ */
/*  Analysis types and logic                                           */
/* ------------------------------------------------------------------ */
interface ReadabilityResult {
  fleschScore: number;
  grade: string;
  gradeDesc: string;
  wordCount: number;
  sentenceCount: number;
  syllableCount: number;
  avgWordsPerSentence: number;
  avgSyllablesPerWord: number;
  readingTimeMinutes: number;
}

function getGradeInfo(score: number): { grade: string; desc: string } {
  if (score >= 90) return { grade: "Very Easy", desc: "5th grade level" };
  if (score >= 80) return { grade: "Easy", desc: "6th grade level" };
  if (score >= 70) return { grade: "Fairly Easy", desc: "7th grade level" };
  if (score >= 60) return { grade: "Standard", desc: "8th-9th grade level" };
  if (score >= 50) return { grade: "Fairly Difficult", desc: "10th-12th grade level" };
  if (score >= 30) return { grade: "Difficult", desc: "College level" };
  return { grade: "Very Difficult", desc: "Graduate level" };
}

function analyzeReadability(text: string): ReadabilityResult {
  const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
  const wordCount = words.length;
  const sentenceCount = countSentences(text);

  let syllableCount = 0;
  for (const word of words) {
    syllableCount += countSyllables(word);
  }

  const avgWordsPerSentence = wordCount / sentenceCount;
  const avgSyllablesPerWord = wordCount > 0 ? syllableCount / wordCount : 0;

  // Flesch Reading Ease formula
  const fleschScore = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord
      )
    )
  );

  const { grade, desc } = getGradeInfo(fleschScore);

  // Reading time: 238 words per minute average
  const readingTimeMinutes = Math.max(1, Math.round(wordCount / 238));

  return {
    fleschScore,
    grade,
    gradeDesc: desc,
    wordCount,
    sentenceCount,
    syllableCount,
    avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
    avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 100) / 100,
    readingTimeMinutes,
  };
}

/* ------------------------------------------------------------------ */
/*  Score color helper (black/white/gray only)                         */
/* ------------------------------------------------------------------ */
function scoreStyle(score: number): { bg: string; text: string; border: string } {
  if (score >= 70) return { bg: "bg-gray-100", text: "text-black", border: "border-black" };
  if (score >= 50) return { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-400" };
  return { bg: "bg-white", text: "text-black", border: "border-black" };
}

/* ------------------------------------------------------------------ */
/*  Ideal scores for content types                                     */
/* ------------------------------------------------------------------ */
const CONTENT_TYPES = [
  {
    type: "Blog Posts",
    range: "60-70",
    desc: "Standard readability keeps readers engaged through longer articles. Use short paragraphs and subheadings.",
  },
  {
    type: "Landing Pages",
    range: "70-80",
    desc: "Easier readability drives higher conversions. Keep sentences short, use bullet points, and lead with benefits.",
  },
  {
    type: "Social Media",
    range: "80+",
    desc: "Very easy readability matches how people scan feeds. Use simple words, short phrases, and conversational tone.",
  },
  {
    type: "Email Campaigns",
    range: "65-75",
    desc: "Readable enough for quick scanning while allowing persuasive detail. Front-load key info above the fold.",
  },
  {
    type: "Technical Content",
    range: "40-60",
    desc: "Specialized audiences expect domain terminology. Focus on sentence structure over word simplification.",
  },
  {
    type: "Ad Copy",
    range: "80+",
    desc: "Maximum clarity in minimal space. Every syllable counts when character limits are tight.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function ReadabilityCheckerPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ReadabilityResult | null>(null);

  const handleAnalyze = useCallback(() => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    if (words.length < 5) return;
    setResult(analyzeReadability(text));
  }, [text]);

  const wordCount = text.trim().length === 0
    ? 0
    : text.trim().split(/\s+/).filter(Boolean).length;

  return (
    <article>
      <nav className="px-6 lg:px-12 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><a href="/" className="hover:text-black transition-colors">Home</a></li>
          <li aria-hidden="true">/</li>
          <li><a href="/resources" className="hover:text-black transition-colors">Resources</a></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">Readability Score Checker</li>
        </ol>
      </nav>
      {/* ---- Hero ---- */}
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Readability Score Checker
            </h1>
            <SectionDesc>
              Paste your marketing copy, blog post, or landing page text and get
              an instant Flesch Reading Ease score. Find out if your content is
              accessible to your target audience.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Tool ---- */}
      <section className="px-6 lg:px-12 pb-20">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="space-y-4">
              <label
                htmlFor="readability-input"
                className="block text-base font-bold text-black"
              >
                Paste your text
              </label>
              <textarea
                id="readability-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your blog post, landing page copy, email, or any marketing content here..."
                rows={10}
                className="w-full px-5 py-4 border-2 border-gray-200 text-base text-black placeholder:text-gray-400 resize-y focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus-visible:border-black transition-colors motion-reduce:transition-none"
                aria-describedby="readability-hint"
              />
              <p id="readability-hint" className="text-base text-gray-400">
                {wordCount === 0
                  ? "Enter at least 5 words to analyze."
                  : `${wordCount} word${wordCount === 1 ? "" : "s"} entered`}
              </p>
              <button
                onClick={handleAnalyze}
                disabled={wordCount < 5}
                className="min-h-[44px] min-w-[44px] bg-black text-white px-8 py-4 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Analyze
              </button>
            </div>
          </Animate>

          {/* ---- Results ---- */}
          {result && (
            <Animate animation="fade-up">
              <div className="mt-12 space-y-10">
                {/* Score display */}
                <div
                  className={`flex items-center gap-8 p-8 border-2 ${
                    scoreStyle(result.fleschScore).border
                  } ${scoreStyle(result.fleschScore).bg}`}
                >
                  <div className="text-center flex-shrink-0">
                    <div
                      className={`text-5xl font-extrabold font-[family-name:var(--font-display)] ${
                        scoreStyle(result.fleschScore).text
                      }`}
                    >
                      {result.fleschScore}
                    </div>
                    <div className="text-base font-bold mt-1 text-gray-700">
                      {result.grade}
                    </div>
                    <div className="text-base text-gray-500 mt-0.5">
                      {result.gradeDesc}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="w-full h-3 bg-gray-200 overflow-hidden">
                      <div
                        className="h-full bg-black transition-all duration-500 motion-reduce:transition-none"
                        style={{ width: `${result.fleschScore}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-base text-gray-400">
                      <span>Difficult</span>
                      <span>Easy</span>
                    </div>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
                  {[
                    {
                      label: "Words",
                      value: result.wordCount.toLocaleString(),
                    },
                    {
                      label: "Sentences",
                      value: result.sentenceCount.toLocaleString(),
                    },
                    {
                      label: "Syllables",
                      value: result.syllableCount.toLocaleString(),
                    },
                    {
                      label: "Avg Words / Sentence",
                      value: result.avgWordsPerSentence.toString(),
                    },
                    {
                      label: "Avg Syllables / Word",
                      value: result.avgSyllablesPerWord.toFixed(2),
                    },
                    {
                      label: "Reading Time",
                      value: `${result.readingTimeMinutes} min`,
                    },
                  ].map((s) => (
                    <div key={s.label} className="bg-white p-6 text-center">
                      <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                        {s.value}
                      </div>
                      <div className="text-base text-gray-500 mt-1">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Score interpretation */}
                <div className="border border-gray-200 p-6">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                    Score Breakdown
                  </h2>
                  <div className="space-y-3">
                    {[
                      { min: 90, max: 100, label: "Very Easy", desc: "5th grade" },
                      { min: 80, max: 89, label: "Easy", desc: "6th grade" },
                      { min: 70, max: 79, label: "Fairly Easy", desc: "7th grade" },
                      { min: 60, max: 69, label: "Standard", desc: "8th-9th grade" },
                      { min: 50, max: 59, label: "Fairly Difficult", desc: "10th-12th grade" },
                      { min: 30, max: 49, label: "Difficult", desc: "College" },
                      { min: 0, max: 29, label: "Very Difficult", desc: "Graduate" },
                    ].map((tier) => {
                      const isActive =
                        result.fleschScore >= tier.min &&
                        result.fleschScore <= tier.max;
                      return (
                        <div
                          key={tier.label}
                          className={`flex items-center gap-4 p-3 border ${
                            isActive
                              ? "border-black bg-black text-white"
                              : "border-gray-200 bg-white text-gray-600"
                          }`}
                        >
                          <span className="w-20 text-base font-bold flex-shrink-0 tabular-nums">
                            {tier.min}-{tier.max}
                          </span>
                          <span className="flex-1 text-base font-bold">
                            {tier.label}
                          </span>
                          <span
                            className={`text-base ${
                              isActive ? "text-gray-300" : "text-gray-400"
                            }`}
                          >
                            {tier.desc}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Animate>
          )}
        </div>
      </section>

      {/* ---- Why Readability Matters ---- */}
      <section
        className="px-6 lg:px-12 py-16 bg-gray-50"
        aria-label="Why readability matters"
      >
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
              Why Readability Matters for Marketing Content
            </h2>
            <p className="text-base text-gray-500 leading-relaxed mb-6">
              Readability directly impacts engagement, conversions, and SEO.
              Content that matches your audience&apos;s reading level keeps them on
              the page longer, reduces bounce rates, and makes your call to action
              easier to act on.
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-white p-6 border border-gray-200">
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black mb-2">
                  Higher Engagement
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  The average American reads at an 8th grade level. Content
                  written above your audience&apos;s level gets skimmed or
                  abandoned. Matching readability to your readers keeps them
                  engaged from headline to CTA.
                </p>
              </div>
              <div className="bg-white p-6 border border-gray-200">
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black mb-2">
                  Better SEO Performance
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  Search engines factor user behavior signals like time on page
                  and bounce rate into rankings. Readable content earns longer
                  visits, more shares, and higher rankings over time.
                </p>
              </div>
              <div className="bg-white p-6 border border-gray-200">
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black mb-2">
                  Increased Conversions
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  Clear, simple language removes friction between your reader and
                  your desired action. Landing pages with higher readability
                  scores consistently outperform complex alternatives in A/B
                  tests.
                </p>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Ideal Scores by Content Type ---- */}
      <section
        className="px-6 lg:px-12 py-16"
        aria-label="Ideal scores by content type"
      >
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
              Ideal Readability Scores by Content Type
            </h2>
            <p className="text-base text-gray-500 leading-relaxed mb-6">
              Different content types call for different readability levels.
              Use these targets as guidelines when writing and editing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CONTENT_TYPES.map((item) => (
                <div
                  key={item.type}
                  className="bg-white p-6 border border-gray-200"
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                      {item.type}
                    </h3>
                    <span className="text-base font-bold text-black tabular-nums">
                      {item.range}
                    </span>
                  </div>
                  <p className="text-base text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Tips ---- */}
      <section
        className="px-6 lg:px-12 py-16 bg-gray-50"
        aria-label="Improvement tips"
      >
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
              How to Improve Your Readability Score
            </h2>
            <div className="bg-white p-6 border border-gray-200">
              <ul className="space-y-3 text-base text-gray-500">
                <li>
                  Shorten sentences to 15-20 words. Break long compound
                  sentences into two.
                </li>
                <li>
                  Replace multi-syllable words with simpler alternatives
                  (&ldquo;use&rdquo; instead of &ldquo;utilize&rdquo;,
                  &ldquo;help&rdquo; instead of &ldquo;facilitate&rdquo;).
                </li>
                <li>
                  Use active voice. &ldquo;We built the campaign&rdquo; reads
                  easier than &ldquo;The campaign was built by us.&rdquo;
                </li>
                <li>
                  Add subheadings every 2-3 paragraphs to create visual
                  breathing room.
                </li>
                <li>
                  Use bullet points and numbered lists to break up dense
                  information.
                </li>
                <li>
                  Write one idea per paragraph. Multiple ideas per paragraph
                  increase cognitive load.
                </li>
                <li>
                  Read your content aloud. If you stumble, your readers will
                  too.
                </li>
              </ul>
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help With Your Content Strategy?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Readability is one piece of the puzzle. Let our team create
              content that is clear, persuasive, and built to convert.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/services/content-marketing"
                className="min-h-[44px] min-w-[44px] inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Content Marketing Services &rarr;
              </Link>
              <Link
                href="/contact"
                className="min-h-[44px] min-w-[44px] inline-flex items-center gap-3 border border-white text-white px-10 py-5 font-bold text-base hover:bg-white/10 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Get a Free Consultation &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>
          
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/seo-checklist" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">SEO Checklist</Link>
                <Link href="/resources/keyword-density-checker" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Keyword Density Checker</Link>
                <Link href="/resources/seo-content-optimizer" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">SEO Content Optimizer</Link>
                <Link href="/resources/seo-audit-score" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">SEO Audit Score</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Readability Checker — Score Your Content for Clarity",
          description: "Analyze your content readability using Flesch-Kincaid, Gunning Fog, and other scoring methods with this free tool. Write content your audience actually reads and understands.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Readability Checker"
        services={[
          { title: "Website Development", desc: "Fast, accessible websites built for conversion and growth.", href: "/services/website-development" },
          { title: "SEO", desc: "Technical SEO baked in from day one for maximum visibility.", href: "/services/seo" },
          { title: "Digital Marketing", desc: "Drive the right traffic to your optimized digital experience.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
          { title: "Ppc Audit Checklist", href: "/resources/ppc-audit-checklist" },
          { title: "Pricing Calculator", href: "/resources/pricing-calculator" },
          { title: "Pricing Optimizer", href: "/resources/pricing-optimizer" },
          { title: "Pricing Page Analyzer", href: "/resources/pricing-page-analyzer" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
