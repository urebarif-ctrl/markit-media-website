"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { JsonLd } from "@/components/json-ld";

const POWER_WORDS = [
  "free", "new", "proven", "secret", "ultimate", "exclusive", "guaranteed",
  "instant", "powerful", "complete", "essential", "easy", "simple", "fast",
  "best", "top", "amazing", "incredible", "remarkable", "revolutionary",
  "breakthrough", "discover", "unlock", "master", "boost", "transform",
  "skyrocket", "dominate", "crush", "explode", "supercharge", "maximize",
  "insider", "hack", "trick", "mistake", "warning", "urgent", "limited",
  "save", "stop", "avoid", "never", "always", "exactly", "step-by-step",
];

const EMOTIONAL_WORDS = [
  "love", "hate", "fear", "joy", "surprise", "anger", "trust", "disgust",
  "happy", "sad", "excited", "worried", "frustrated", "thrilled", "anxious",
  "confident", "overwhelmed", "inspired", "terrified", "delighted",
  "shocking", "heartbreaking", "hilarious", "devastating", "beautiful",
  "ugly", "brilliant", "stupid", "genius", "crazy", "obsessed", "addicted",
];

const WEAK_WORDS = [
  "very", "really", "quite", "somewhat", "rather", "things", "stuff",
  "nice", "good", "great", "awesome", "interesting", "important",
  "basically", "actually", "literally", "honestly", "just",
];

function analyzeHeadline(headline: string) {
  const words = headline.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const charCount = headline.trim().length;
  const lowerWords = words.map((w) => w.toLowerCase().replace(/[^a-z'-]/g, ""));

  let score = 50;
  const feedback: { type: "good" | "warning" | "tip"; text: string }[] = [];

  // Word count scoring
  if (wordCount >= 6 && wordCount <= 12) {
    score += 10;
    feedback.push({ type: "good", text: `Good length: ${wordCount} words. Headlines with 6-12 words tend to perform best.` });
  } else if (wordCount < 6) {
    score -= 5;
    feedback.push({ type: "warning", text: `Short headline (${wordCount} words). Consider adding more detail for clarity.` });
  } else if (wordCount > 15) {
    score -= 10;
    feedback.push({ type: "warning", text: `Long headline (${wordCount} words). Try trimming to under 12 words for better impact.` });
  } else {
    feedback.push({ type: "tip", text: `${wordCount} words — acceptable, but 6-12 words is the sweet spot.` });
  }

  // Character count
  if (charCount <= 60) {
    score += 5;
    feedback.push({ type: "good", text: `${charCount} characters fits within search engine title tag limits (60 chars).` });
  } else if (charCount <= 70) {
    feedback.push({ type: "tip", text: `${charCount} characters — may get truncated in some search results. Aim for under 60.` });
  } else {
    score -= 5;
    feedback.push({ type: "warning", text: `${charCount} characters — will likely be truncated in search results.` });
  }

  // Power words
  const foundPower = lowerWords.filter((w) => POWER_WORDS.includes(w));
  if (foundPower.length > 0) {
    score += Math.min(foundPower.length * 5, 15);
    feedback.push({ type: "good", text: `Contains power word${foundPower.length > 1 ? "s" : ""}: ${foundPower.join(", ")}` });
  } else {
    score -= 5;
    feedback.push({ type: "tip", text: "No power words detected. Try adding words like 'proven', 'essential', or 'complete'." });
  }

  // Emotional words
  const foundEmotional = lowerWords.filter((w) => EMOTIONAL_WORDS.includes(w));
  if (foundEmotional.length > 0) {
    score += Math.min(foundEmotional.length * 5, 10);
    feedback.push({ type: "good", text: `Emotional trigger: ${foundEmotional.join(", ")}` });
  }

  // Weak words
  const foundWeak = lowerWords.filter((w) => WEAK_WORDS.includes(w));
  if (foundWeak.length > 0) {
    score -= foundWeak.length * 3;
    feedback.push({ type: "warning", text: `Weak words detected: ${foundWeak.join(", ")}. Replace with stronger alternatives.` });
  }

  // Numbers
  if (/\d/.test(headline)) {
    score += 8;
    feedback.push({ type: "good", text: "Contains a number. Headlines with numbers get higher click-through rates." });
  } else {
    feedback.push({ type: "tip", text: "Consider adding a number (e.g., '7 Ways...', '2025 Guide')." });
  }

  // Question
  if (headline.trim().endsWith("?")) {
    score += 5;
    feedback.push({ type: "good", text: "Question format can increase engagement by creating curiosity." });
  }

  // Starts with How/Why/What
  const firstWord = lowerWords[0] || "";
  if (["how", "why", "what", "when", "where", "which"].includes(firstWord)) {
    score += 5;
    feedback.push({ type: "good", text: `Starts with "${words[0]}" — informational headlines perform well in search.` });
  }

  // Colon or dash (subheadline pattern)
  if (/[:—––—]/.test(headline)) {
    score += 3;
    feedback.push({ type: "good", text: "Uses a separator pattern (colon or dash), which adds structure." });
  }

  // ALL CAPS detection
  const allCapsWords = words.filter((w) => w.length > 2 && w === w.toUpperCase() && /[A-Z]/.test(w));
  if (allCapsWords.length > 1) {
    score -= 5;
    feedback.push({ type: "warning", text: "Multiple ALL CAPS words can feel aggressive. Use sparingly." });
  }

  // Capitalization check (title case)
  const titleCaseWords = words.filter((w) => w.length > 3 && /^[A-Z]/.test(w));
  if (titleCaseWords.length >= wordCount * 0.6) {
    score += 3;
    feedback.push({ type: "good", text: "Uses title case — professional and readable." });
  }

  score = Math.max(0, Math.min(100, score));

  let grade: string;
  let gradeColor: string;
  if (score >= 80) { grade = "Excellent"; gradeColor = "text-black"; }
  else if (score >= 60) { grade = "Good"; gradeColor = "text-gray-700"; }
  else if (score >= 40) { grade = "Average"; gradeColor = "text-gray-500"; }
  else { grade = "Needs Work"; gradeColor = "text-gray-400"; }

  return { score, grade, gradeColor, feedback, wordCount, charCount };
}

export default function HeadlineAnalyzerPage() {
  const [headline, setHeadline] = useState("");
  const [result, setResult] = useState<ReturnType<typeof analyzeHeadline> | null>(null);

  const handleAnalyze = useCallback(() => {
    if (headline.trim().length < 3) return;
    setResult(analyzeHeadline(headline));
  }, [headline]);

  return (
    <article>
      <nav className="px-6 lg:px-12 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><a href="/" className="hover:text-black transition-colors">Home</a></li>
          <li aria-hidden="true">/</li>
          <li><a href="/resources" className="hover:text-black transition-colors">Resources</a></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">Headline Analyzer</li>
        </ol>
      </nav>
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Headline Analyzer
            </h1>
            <SectionDesc>
              Test your blog titles, ad headlines, and email subject lines. Get instant feedback on word choice, length, and emotional impact.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-20">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="space-y-4">
              <label htmlFor="headline-input" className="block text-base font-bold text-black">
                Enter your headline
              </label>
              <input
                id="headline-input"
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                placeholder="e.g., 7 Proven SEO Strategies to Double Your Traffic in 2025"
                className="w-full px-5 py-4 border-2 border-gray-200 text-base text-black placeholder:text-gray-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus-visible:border-black transition-colors motion-reduce:transition-none"
                maxLength={200}
                aria-describedby="headline-hint"
              />
              <p id="headline-hint" className="text-base text-gray-400">
                {headline.length}/200 characters
              </p>
              <button
                onClick={handleAnalyze}
                disabled={headline.trim().length < 3}
                className="bg-black text-white px-8 py-4 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Analyze Headline
              </button>
            </div>
          </Animate>

          {result && (
            <Animate animation="fade-up">
              <div className="mt-12 space-y-8">
                <div className="flex items-center gap-8 p-8 border-2 border-black">
                  <div className="text-center flex-shrink-0">
                    <div className="text-5xl font-extrabold font-[family-name:var(--font-display)] text-black">
                      {result.score}
                    </div>
                    <div className={`text-base font-bold mt-1 ${result.gradeColor}`}>
                      {result.grade}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="w-full h-3 bg-gray-100 overflow-hidden">
                      <div
                        className="h-full bg-black transition-all motion-reduce:transition-none duration-500"
                        style={{ width: `${result.score}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-base text-gray-400">
                      <span>{result.wordCount} words</span>
                      <span>{result.charCount} characters</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                    Analysis
                  </h2>
                  {result.feedback.map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 p-4 border ${
                        item.type === "good"
                          ? "border-black/20 bg-gray-50"
                          : item.type === "warning"
                          ? "border-gray-300 bg-white"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <span
                        className={`flex-shrink-0 w-6 h-6 flex items-center justify-center text-base font-bold ${
                          item.type === "good"
                            ? "bg-black text-white"
                            : item.type === "warning"
                            ? "bg-gray-200 text-gray-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                        aria-hidden="true"
                      >
                        {item.type === "good" ? "+" : item.type === "warning" ? "!" : "i"}
                      </span>
                      <p className="text-base text-gray-600 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-gray-50 border border-gray-200">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">
                    Quick Tips for Better Headlines
                  </h3>
                  <ul className="space-y-2 text-base text-gray-500">
                    <li>Use numbers for specificity (e.g., &quot;7 Ways&quot; instead of &quot;Ways&quot;)</li>
                    <li>Include a power word to create urgency or curiosity</li>
                    <li>Keep it under 60 characters for search engine visibility</li>
                    <li>Test question formats vs. statement formats</li>
                    <li>Front-load the most important keywords</li>
                  </ul>
                </div>
              </div>
            </Animate>
          )}
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="How it works">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
              How the Headline Analyzer Works
            </h2>
            <p className="text-base text-gray-500 leading-relaxed mb-6">
              Our analyzer evaluates your headline across multiple dimensions that research shows correlate with higher engagement:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Word Count", desc: "Headlines between 6-12 words tend to get the highest click-through rates across search and social." },
                { title: "Character Length", desc: "Under 60 characters ensures your full headline appears in Google search results without truncation." },
                { title: "Power Words", desc: "Words like 'proven', 'essential', and 'complete' trigger curiosity and action in readers." },
                { title: "Emotional Impact", desc: "Headlines with emotional words create stronger connections and higher sharing rates." },
                { title: "Number Usage", desc: "Headlines with numbers (e.g., '7 Tips') consistently outperform those without in A/B tests." },
                { title: "Structure", desc: "Question formats, how-to patterns, and colon separators help readers quickly understand value." },
              ].map((item) => (
                <div key={item.title} className="bg-white p-6 border border-gray-200">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black mb-2">{item.title}</h3>
                  <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help With Your Content Strategy?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Headlines are just the beginning. Let our team build a content strategy that drives traffic and conversions.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Headline Analyzer — Score Power Words, Emotion & SEO Impact",
          description: "Free headline analyzer that scores your headlines for power words, emotional impact, and SEO effectiveness so every title pulls readers in.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    </article>
  );
}
