"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { JsonLd } from "@/components/json-ld";

/* ------------------------------------------------------------------ */
/*  Stop words — 80+ common English words excluded from analysis       */
/* ------------------------------------------------------------------ */
const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "nor", "so", "yet",
  "is", "am", "are", "was", "were", "be", "been", "being",
  "to", "in", "of", "for", "on", "at", "by", "with", "from",
  "as", "into", "about", "between", "through", "during", "before",
  "after", "above", "below", "up", "down", "out", "off", "over",
  "under", "then", "than", "that", "this", "these", "those",
  "it", "its", "he", "she", "they", "them", "his", "her", "their",
  "we", "us", "our", "my", "your", "you", "i", "me",
  "not", "no", "do", "does", "did", "has", "have", "had",
  "will", "would", "shall", "should", "can", "could", "may", "might",
  "if", "which", "who", "whom", "what", "when", "where", "how", "why",
  "all", "each", "every", "both", "few", "more", "most", "some", "any",
  "such", "very", "just", "also", "only", "own", "same", "other",
  "because", "while", "although", "even", "here", "there",
]);

/* ------------------------------------------------------------------ */
/*  Analysis helpers                                                   */
/* ------------------------------------------------------------------ */
interface WordEntry {
  word: string;
  count: number;
  density: number;
}

interface AnalysisResult {
  totalWords: number;
  uniqueWords: number;
  topWords: WordEntry[];
  targetResult: WordEntry | null;
}

function analyzeText(text: string, targetKeyword: string): AnalysisResult {
  const raw = text
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 0);

  const totalWords = raw.length;

  // Frequency map (all words)
  const freqAll = new Map<string, number>();
  for (const w of raw) {
    freqAll.set(w, (freqAll.get(w) || 0) + 1);
  }
  const uniqueWords = freqAll.size;

  // Frequency map excluding stop words
  const freq = new Map<string, number>();
  for (const w of raw) {
    if (!STOP_WORDS.has(w) && w.length > 1) {
      freq.set(w, (freq.get(w) || 0) + 1);
    }
  }

  const sorted = Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  const topWords: WordEntry[] = sorted.map(([word, count]) => ({
    word,
    count,
    density: totalWords > 0 ? (count / totalWords) * 100 : 0,
  }));

  // Target keyword lookup (may be multi-word phrase)
  let targetResult: WordEntry | null = null;
  const kw = targetKeyword.trim().toLowerCase();
  if (kw.length > 0 && totalWords > 0) {
    const lowerText = text.toLowerCase();
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const matches = lowerText.match(new RegExp(`\\b${escaped}\\b`, "g"));
    const kwCount = matches ? matches.length : 0;
    targetResult = {
      word: kw,
      count: kwCount,
      density: (kwCount / totalWords) * 100,
    };
  }

  return { totalWords, uniqueWords, topWords, targetResult };
}

function densityLabel(density: number): { text: string; tone: "good" | "warning" | "danger" } {
  if (density === 0) return { text: "Not found", tone: "danger" };
  if (density < 1) return { text: "Low density — consider using this keyword more", tone: "warning" };
  if (density <= 3) return { text: "Ideal range (1-3 %)", tone: "good" };
  return { text: "Over-optimized — risk of keyword stuffing", tone: "danger" };
}

/* ------------------------------------------------------------------ */
/*  Bar component (inline SVG-free, pure CSS)                          */
/* ------------------------------------------------------------------ */
function DensityBar({ entry, maxDensity }: { entry: WordEntry; maxDensity: number }) {
  const pct = maxDensity > 0 ? (entry.density / maxDensity) * 100 : 0;
  return (
    <div className="flex items-center gap-4">
      <span className="w-28 truncate text-base font-bold text-black flex-shrink-0">{entry.word}</span>
      <div className="flex-1 h-6 bg-gray-100 relative">
        <div
          className="h-full bg-black transition-all duration-500 motion-reduce:transition-none"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-12 text-right text-base tabular-nums text-gray-600 flex-shrink-0">{entry.count}</span>
      <span className="w-20 text-right text-base tabular-nums text-gray-500 flex-shrink-0">
        {entry.density.toFixed(2)}%
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function KeywordDensityCheckerPage() {
  const [text, setText] = useState("");
  const [targetKeyword, setTargetKeyword] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = useCallback(() => {
    if (text.trim().split(/\s+/).filter(Boolean).length < 1) return;
    setResult(analyzeText(text, targetKeyword));
  }, [text, targetKeyword]);

  const maxDensity = useMemo(() => {
    if (!result || result.topWords.length === 0) return 1;
    return result.topWords[0].density;
  }, [result]);

  return (
    <article>
      <nav className="px-6 lg:px-12 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><a href="/" className="hover:text-black transition-colors">Home</a></li>
          <li aria-hidden="true">/</li>
          <li><a href="/resources" className="hover:text-black transition-colors">Resources</a></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">Keyword Density Checker</li>
        </ol>
      </nav>
      {/* ---- Hero ---- */}
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Keyword Density Checker
            </h1>
            <SectionDesc>
              Paste your content and get instant SEO insights. See which words appear most often, check density percentages, and stay within the ideal 1-3&nbsp;% range.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Tool ---- */}
      <section className="px-6 lg:px-12 pb-20">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="space-y-6">
              {/* Text area */}
              <div>
                <label htmlFor="kd-text" className="block text-base font-bold text-black mb-2">
                  Paste your text
                </label>
                <textarea
                  id="kd-text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your blog post, landing page copy, or any content here..."
                  rows={10}
                  className="w-full px-5 py-4 border-2 border-gray-200 text-base text-black placeholder:text-gray-400 resize-y focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus-visible:border-black transition-colors motion-reduce:transition-none"
                  aria-describedby="kd-hint"
                />
                <p id="kd-hint" className="text-base text-gray-400 mt-1">
                  {text.trim().length === 0
                    ? "Enter at least a few words to analyze."
                    : `${text.trim().split(/\s+/).filter(Boolean).length} words entered`}
                </p>
              </div>

              {/* Target keyword */}
              <div>
                <label htmlFor="kd-target" className="block text-base font-bold text-black mb-2">
                  Check a specific keyword or phrase (optional)
                </label>
                <input
                  id="kd-target"
                  type="text"
                  value={targetKeyword}
                  onChange={(e) => setTargetKeyword(e.target.value)}
                  placeholder='e.g., "digital marketing"'
                  className="w-full px-5 py-4 border-2 border-gray-200 text-base text-black placeholder:text-gray-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus-visible:border-black transition-colors motion-reduce:transition-none"
                />
              </div>

              <button
                onClick={handleAnalyze}
                disabled={text.trim().split(/\s+/).filter(Boolean).length < 1}
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
                {/* Stats row */}
                <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200">
                  {[
                    { label: "Total Words", value: result.totalWords.toLocaleString() },
                    { label: "Unique Words", value: result.uniqueWords.toLocaleString() },
                  ].map((s) => (
                    <div key={s.label} className="bg-white p-6 text-center">
                      <div className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-black">
                        {s.value}
                      </div>
                      <div className="text-base text-gray-500 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Target keyword result */}
                {result.targetResult && (
                  <div className="border-2 border-black p-6">
                    <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                      Keyword: &ldquo;{result.targetResult.word}&rdquo;
                    </h2>
                    <div className="grid grid-cols-2 gap-6 mb-4">
                      <div>
                        <span className="text-base text-gray-500">Occurrences</span>
                        <div className="text-2xl font-extrabold text-black">{result.targetResult.count}</div>
                      </div>
                      <div>
                        <span className="text-base text-gray-500">Density</span>
                        <div className="text-2xl font-extrabold text-black">{result.targetResult.density.toFixed(2)}%</div>
                      </div>
                    </div>
                    {(() => {
                      const lbl = densityLabel(result.targetResult.density);
                      return (
                        <div
                          className={`p-4 border text-base ${
                            lbl.tone === "good"
                              ? "border-black/20 bg-gray-50 text-black"
                              : lbl.tone === "warning"
                              ? "border-gray-300 bg-white text-gray-600"
                              : "border-gray-400 bg-gray-100 text-gray-700"
                          }`}
                        >
                          {lbl.text}
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Top 20 bar chart */}
                {result.topWords.length > 0 && (
                  <div>
                    <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-1">
                      Top {result.topWords.length} Keywords
                    </h2>
                    <p className="text-base text-gray-400 mb-4">
                      Common stop words excluded. Showing word, count, and density&nbsp;%.
                    </p>

                    {/* Legend row */}
                    <div className="flex items-center gap-4 mb-2 text-base font-bold text-gray-500">
                      <span className="w-28 flex-shrink-0">Word</span>
                      <span className="flex-1">Density</span>
                      <span className="w-12 text-right flex-shrink-0">Count</span>
                      <span className="w-20 text-right flex-shrink-0">%</span>
                    </div>

                    <div className="space-y-2">
                      {result.topWords.map((entry) => (
                        <DensityBar key={entry.word} entry={entry} maxDensity={maxDensity} />
                      ))}
                    </div>
                  </div>
                )}

                {result.topWords.length === 0 && (
                  <p className="text-base text-gray-500">No meaningful keywords found after excluding stop words.</p>
                )}
              </div>
            </Animate>
          )}
        </div>
      </section>

      {/* ---- SEO Guidance ---- */}
      <section className="px-6 lg:px-12 py-16 bg-gray-50" aria-label="SEO guidance">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
              What Is Keyword Density and Why It Matters
            </h2>
            <p className="text-base text-gray-500 leading-relaxed mb-8">
              Keyword density is the percentage of times a keyword appears in your text relative to the total word count.
              Search engines use it as one signal to understand what a page is about, but going too high can trigger penalties.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 border border-gray-200">
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black mb-2">
                  Under 1&nbsp;%
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  Your keyword may not appear enough for search engines to associate the page with that topic. Consider adding natural mentions.
                </p>
              </div>
              <div className="bg-white p-6 border-2 border-black">
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black mb-2">
                  1 - 3&nbsp;% (Ideal)
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  The sweet spot. Your keyword is present enough to signal relevance without sounding forced or repetitive.
                </p>
              </div>
              <div className="bg-white p-6 border border-gray-200">
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black mb-2">
                  Over 3&nbsp;%
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  Risk of keyword stuffing. Search engines may penalize your page, and readers will notice the repetition. Rewrite for variety.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white border border-gray-200">
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black mb-3">
                Tips for Natural Keyword Usage
              </h3>
              <ul className="space-y-2 text-base text-gray-500">
                <li>Use synonyms and related terms instead of repeating the same phrase</li>
                <li>Place your primary keyword in the title, first paragraph, and one subheading</li>
                <li>Write for readers first — search engines reward content that keeps people engaged</li>
                <li>Check density after editing, not during writing, so you don&apos;t interrupt your flow</li>
                <li>Long-form content (1,500+ words) naturally dilutes density — adjust expectations accordingly</li>
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
              Need Help With Your SEO Strategy?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Keyword density is one piece of the puzzle. Let our team build an SEO strategy that drives rankings, traffic, and revenue.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/services/seo"
                className="min-h-[44px] min-w-[44px] inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Our SEO Services &rarr;
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
                <Link href="/resources/seo-content-optimizer" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">SEO Content Optimizer</Link>
                <Link href="/resources/seo-audit-score" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">SEO Audit Score</Link>
                <Link href="/resources/seo-gap-finder" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">SEO Gap Finder</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Keyword Density Checker — Analyze Word Frequency & Content Length",
          description: "Free keyword density checker that analyzes keyword density, word frequency, and content length to keep your SEO on point.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    </article>
  );
}
