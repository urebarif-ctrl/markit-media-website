"use client";
import Link from "next/link";

import { useState } from "react";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

interface AnalysisResult {
  headline: { score: number; feedback: string[] };
  description: { score: number; feedback: string[] };
  cta: { score: number; feedback: string[] };
  emotion: { score: number; feedback: string[] };
  overall: number;
  grade: string;
}

const POWER_WORDS = [
  "free",
  "new",
  "proven",
  "guaranteed",
  "exclusive",
  "limited",
  "instant",
  "discover",
  "secret",
  "save",
  "boost",
  "unlock",
  "transform",
  "ultimate",
  "essential",
  "breakthrough",
  "revolutionary",
  "premium",
  "fast",
  "easy",
];

const URGENCY_WORDS = [
  "now",
  "today",
  "limited",
  "hurry",
  "last chance",
  "expires",
  "deadline",
  "only",
  "before",
  "ending",
  "act fast",
  "don't miss",
  "while",
  "final",
  "running out",
];

const EMOTIONAL_TRIGGERS = [
  "fear",
  "trust",
  "surprise",
  "curiosity",
  "desire",
  "belonging",
  "pride",
  "hope",
  "relief",
  "excitement",
];

const CTA_WORDS = [
  "get",
  "start",
  "try",
  "buy",
  "shop",
  "book",
  "claim",
  "download",
  "sign up",
  "join",
  "learn",
  "discover",
  "see",
  "explore",
  "request",
  "schedule",
  "call",
  "order",
  "subscribe",
  "reserve",
];

function analyseAd(
  headline: string,
  description: string,
  cta: string,
  platform: string
): AnalysisResult {
  const hl = headline.toLowerCase();
  const desc = description.toLowerCase();
  const ctaLower = cta.toLowerCase();

  // Headline analysis
  const headlineScore: { score: number; feedback: string[] } = {
    score: 0,
    feedback: [],
  };
  const hlLen = headline.length;
  if (hlLen > 0 && hlLen <= 30) {
    headlineScore.score += 25;
    headlineScore.feedback.push("Good headline length (under 30 chars).");
  } else if (hlLen > 30 && hlLen <= 60) {
    headlineScore.score += 15;
    headlineScore.feedback.push(
      "Headline is moderate length. Consider shortening for more impact."
    );
  } else if (hlLen > 60) {
    headlineScore.score += 5;
    headlineScore.feedback.push(
      "Headline is too long. It may get truncated on most platforms."
    );
  }
  const hlPower = POWER_WORDS.filter((w) => hl.includes(w));
  if (hlPower.length > 0) {
    headlineScore.score += 25;
    headlineScore.feedback.push(
      `Contains power words: ${hlPower.join(", ")}.`
    );
  } else {
    headlineScore.feedback.push(
      "No power words detected. Consider adding words like: free, proven, exclusive, instant."
    );
  }
  if (/\d/.test(headline)) {
    headlineScore.score += 15;
    headlineScore.feedback.push(
      "Contains numbers, which increase click-through rates."
    );
  }
  if (headline.includes("?")) {
    headlineScore.score += 10;
    headlineScore.feedback.push(
      "Question format engages curiosity."
    );
  }
  if (headline[0] === headline[0]?.toUpperCase()) {
    headlineScore.score += 5;
    headlineScore.feedback.push("Starts with a capital letter.");
  }
  headlineScore.score = Math.min(headlineScore.score, 100);

  // Description analysis
  const descScore: { score: number; feedback: string[] } = {
    score: 0,
    feedback: [],
  };
  const descLen = description.length;
  const platformLimits: Record<string, number> = {
    google: 90,
    meta: 125,
    linkedin: 150,
    twitter: 280,
    tiktok: 100,
  };
  const limit = platformLimits[platform] || 125;
  if (descLen > 0 && descLen <= limit) {
    descScore.score += 25;
    descScore.feedback.push(
      `Good description length for ${platform} (within ${limit} char limit).`
    );
  } else if (descLen > limit) {
    descScore.score += 10;
    descScore.feedback.push(
      `Description exceeds recommended ${limit} chars for ${platform}.`
    );
  }
  const descUrgency = URGENCY_WORDS.filter((w) => desc.includes(w));
  if (descUrgency.length > 0) {
    descScore.score += 25;
    descScore.feedback.push(
      `Contains urgency words: ${descUrgency.join(", ")}.`
    );
  } else {
    descScore.feedback.push(
      "No urgency words found. Consider: limited, today, now, last chance."
    );
  }
  if (desc.includes("you") || desc.includes("your")) {
    descScore.score += 20;
    descScore.feedback.push(
      "Uses second person (you/your), which creates personal connection."
    );
  } else {
    descScore.feedback.push(
      "Consider using \"you\" or \"your\" to speak directly to the reader."
    );
  }
  const descBenefits = /save|earn|get|gain|improve|increase|reduce|grow/.test(
    desc
  );
  if (descBenefits) {
    descScore.score += 15;
    descScore.feedback.push(
      "Mentions a benefit or outcome, which is more compelling than features alone."
    );
  }
  descScore.score = Math.min(descScore.score, 100);

  // CTA analysis
  const ctaScore: { score: number; feedback: string[] } = {
    score: 0,
    feedback: [],
  };
  if (cta.length > 0) {
    const ctaAction = CTA_WORDS.filter((w) => ctaLower.includes(w));
    if (ctaAction.length > 0) {
      ctaScore.score += 40;
      ctaScore.feedback.push(
        `Strong action verb: ${ctaAction[0]}.`
      );
    } else {
      ctaScore.score += 10;
      ctaScore.feedback.push(
        "CTA lacks a clear action verb. Use: Get, Start, Try, Book, Claim."
      );
    }
    if (cta.length <= 25) {
      ctaScore.score += 25;
      ctaScore.feedback.push("CTA is concise (under 25 chars).");
    } else {
      ctaScore.score += 10;
      ctaScore.feedback.push(
        "CTA may be too long. Keep it to 2-5 words."
      );
    }
    if (/free|no cost|risk.free/i.test(cta)) {
      ctaScore.score += 20;
      ctaScore.feedback.push(
        "Mentions free/no-cost, reducing friction."
      );
    }
    if (/now|today/i.test(cta)) {
      ctaScore.score += 15;
      ctaScore.feedback.push("Creates urgency with time-sensitive language.");
    }
  } else {
    ctaScore.feedback.push(
      "No CTA provided. Every ad needs a clear call to action."
    );
  }
  ctaScore.score = Math.min(ctaScore.score, 100);

  // Emotional trigger analysis
  const emotionScore: { score: number; feedback: string[] } = {
    score: 0,
    feedback: [],
  };
  const fullText = `${hl} ${desc} ${ctaLower}`;
  const detectedEmotions: string[] = [];
  if (/miss|lose|risk|don't|without/.test(fullText))
    detectedEmotions.push("fear of missing out");
  if (/proven|trusted|rated|review|recommend/.test(fullText))
    detectedEmotions.push("trust/social proof");
  if (/secret|surprising|unexpected|shocking|reveal/.test(fullText))
    detectedEmotions.push("curiosity");
  if (/dream|imagine|picture|envision|achieve/.test(fullText))
    detectedEmotions.push("aspiration");
  if (/exclusive|member|insider|vip|elite/.test(fullText))
    detectedEmotions.push("belonging/exclusivity");
  if (/easy|simple|quick|effortless/.test(fullText))
    detectedEmotions.push("convenience/relief");

  if (detectedEmotions.length >= 2) {
    emotionScore.score = 100;
    emotionScore.feedback.push(
      `Strong emotional appeal: ${detectedEmotions.join(", ")}.`
    );
  } else if (detectedEmotions.length === 1) {
    emotionScore.score = 60;
    emotionScore.feedback.push(
      `One emotional trigger detected: ${detectedEmotions[0]}. Adding another would strengthen the ad.`
    );
  } else {
    emotionScore.score = 20;
    emotionScore.feedback.push(
      "No clear emotional triggers found. Consider adding FOMO, social proof, curiosity, or aspiration."
    );
  }

  const overall = Math.round(
    headlineScore.score * 0.3 +
      descScore.score * 0.3 +
      ctaScore.score * 0.25 +
      emotionScore.score * 0.15
  );

  let grade = "F";
  if (overall >= 90) grade = "A";
  else if (overall >= 75) grade = "B";
  else if (overall >= 60) grade = "C";
  else if (overall >= 40) grade = "D";

  return {
    headline: headlineScore,
    description: descScore,
    cta: ctaScore,
    emotion: emotionScore,
    overall,
    grade,
  };
}

const PLATFORMS = ["google", "meta", "linkedin", "twitter", "tiktok"] as const;



export default function AdCopyAnalyzerPage() {
  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");
  const [cta, setCta] = useState("");
  const [platform, setPlatform] = useState("google");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<
    { headline: string; platform: string; score: number; grade: string }[]
  >([]);

  function handleAnalyse() {
    if (!headline && !description) return;
    const r = analyseAd(headline, description, cta, platform);
    setResult(r);
    setHistory((prev) => [
      { headline, platform, score: r.overall, grade: r.grade },
      ...prev.slice(0, 9),
    ]);
  }

  function handleReset() {
    setHeadline("");
    setDescription("");
    setCta("");
    setResult(null);
  }

  const categories = result
    ? [
        { label: "Headline", data: result.headline, weight: "30%" },
        { label: "Description", data: result.description, weight: "30%" },
        { label: "Call to Action", data: result.cta, weight: "25%" },
        { label: "Emotional Triggers", data: result.emotion, weight: "15%" },
      ]
    : [];

  return (
    <main className="min-h-screen bg-white text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Ad Copy Analyser",
          description: "Analyse your ad copy against best practices for headlines, descriptions, CTAs, and emotional triggers. Get a score and specific improvement suggestions.",
          url: "https://themarkitmedia.com/en/resources/ad-copy-analyzer",
          applicationCategory: "Advertising Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Ad Copy Analyser | Free Marketing Tool — Markit Media</title>
      <link rel="canonical" href="https://themarkitmedia.com/en/resources/ad-copy-analyzer" />
      <meta name="description" content="Analyse your ad copy against best practices for headlines, descriptions, CTAs, and emotional triggers. Get a score and specific improvement suggestions." />
      <nav className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/resources" className="hover:text-black transition-colors">Resources</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">Ad Copy Analyser</li>
        </ol>
      </nav>
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
          Ad Copy Analyser
        </h1>
        <p className="text-lg text-neutral-600 mb-10">
          Score your ad copy against best practices for headlines,
          descriptions, CTAs, and emotional triggers.
        </p>

        {/* Platform */}
        <div className="mb-6">
          <label className="block text-base font-semibold mb-2">
            Platform
          </label>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`rounded-md border px-4 py-2 text-base font-medium capitalize transition-colors ${
                  platform === p
                    ? "border-black bg-black text-white"
                    : "border-neutral-300 hover:border-black"
                }`}
              >
                {p === "meta" ? "Meta / Facebook" : p === "twitter" ? "Twitter / X" : p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Input fields */}
        <div className="space-y-5 mb-8">
          <div>
            <label className="block text-base font-semibold mb-1">
              Headline
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              placeholder="Your ad headline"
            />
            <p className="text-base text-neutral-400 mt-1">
              {headline.length} characters
            </p>
          </div>
          <div>
            <label className="block text-base font-semibold mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              placeholder="Your ad description / body text"
            />
            <p className="text-base text-neutral-400 mt-1">
              {description.length} characters
            </p>
          </div>
          <div>
            <label className="block text-base font-semibold mb-1">
              Call to Action
            </label>
            <input
              type="text"
              value={cta}
              onChange={(e) => setCta(e.target.value)}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              placeholder="e.g. Get Started Free, Book Now, Learn More"
            />
          </div>
        </div>

        <div className="flex gap-3 mb-8">
          <button
            onClick={handleAnalyse}
            className="rounded-md bg-black px-6 py-3 text-lg font-semibold text-white hover:bg-neutral-800 transition-colors"
          >
            Analyse Ad Copy
          </button>
          {result && (
            <button
              onClick={handleReset}
              className="rounded-md border border-neutral-300 px-6 py-3 text-lg font-medium hover:border-black transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Overall score */}
            <div className="rounded-lg border-2 border-black p-6 flex items-center justify-between">
              <div>
                <p className="text-base text-neutral-500">Overall Score</p>
                <p className="text-4xl font-bold">{result.overall}/100</p>
              </div>
              <span
                className={`flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold ${
                  result.overall >= 75
                    ? "bg-black text-white"
                    : result.overall >= 50
                      ? "bg-neutral-600 text-white"
                      : "bg-neutral-200 text-black"
                }`}
              >
                {result.grade}
              </span>
            </div>

            {/* Category breakdown */}
            {categories.map((cat) => (
              <div
                key={cat.label}
                className="rounded-lg border border-neutral-200 p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold">{cat.label}</h2>
                  <div className="flex items-center gap-3">
                    <span className="text-base text-neutral-400">
                      Weight: {cat.weight}
                    </span>
                    <span className="text-lg font-bold">
                      {cat.data.score}/100
                    </span>
                  </div>
                </div>
                <div className="h-3 w-full rounded-full bg-neutral-100 mb-4">
                  <div
                    className="h-3 rounded-full bg-black transition-all"
                    style={{ width: `${cat.data.score}%` }}
                  />
                </div>
                <ul className="space-y-2">
                  {cat.data.feedback.map((f, i) => (
                    <li
                      key={i}
                      className="text-base text-neutral-600 flex items-start gap-2"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Quick tips */}
            <div className="rounded-lg bg-neutral-50 p-5">
              <h2 className="text-lg font-bold mb-3">Quick Improvement Tips</h2>
              <ul className="space-y-2 text-base">
                {result.headline.score < 50 && (
                  <li>Add a power word or number to your headline for more impact.</li>
                )}
                {result.description.score < 50 && (
                  <li>Use &ldquo;you/your&rdquo; and mention a specific benefit in your description.</li>
                )}
                {result.cta.score < 50 && (
                  <li>Strengthen your CTA with a clear action verb and reduce friction (e.g., &ldquo;free&rdquo;).</li>
                )}
                {result.emotion.score < 50 && (
                  <li>Add an emotional trigger: FOMO, social proof, curiosity, or exclusivity.</li>
                )}
                {result.overall >= 75 && (
                  <li>Strong ad copy. Test it against a variant to find even better performance.</li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div className="mt-10 rounded-lg border border-neutral-200 p-5">
            <h2 className="text-xl font-bold mb-4">Analysis History</h2>
            <div className="space-y-3">
              {history.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-md bg-neutral-50 p-3"
                >
                  <div>
                    <p className="text-base font-semibold">
                      {h.headline || "(No headline)"}
                    </p>
                    <p className="text-base text-neutral-500 capitalize">
                      {h.platform}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold">{h.score}/100</span>
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-base font-bold ${
                        h.score >= 75
                          ? "bg-black text-white"
                          : h.score >= 50
                            ? "bg-neutral-600 text-white"
                            : "bg-neutral-200 text-black"
                      }`}
                    >
                      {h.grade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Ad Copy Analyser",
          description: "Analyse your ad copy against best practices for headlines, descriptions, CTAs, and emotional triggers. Get a score and specific improvement suggestions.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/ad-copy-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Ad Copy Generator</Link>
                <Link href="/resources/ad-spend-calculator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Ad Spend Calculator</Link>
                <Link href="/resources/ad-budget-pacing" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Ad Budget Pacing</Link>
                <Link href="/resources/google-ads-estimator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Google Ads Estimator</Link>
          </div>
        </div>
      </section>
    
      <ToolCTA
        toolName="Ad Copy Analyzer"
        services={[
          { title: "Performance Marketing", desc: "Google Ads, Meta Ads, and PPC campaigns that maximize ROAS.", href: "/services/performance-marketing" },
          { title: "Digital Marketing", desc: "Integrated strategy across all channels for measurable growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Complement paid with organic — reduce dependency on ad spend over time.", href: "/services/seo" },
        ]}
        relatedTools={[
          { title: "Campaign Debrief", href: "/resources/campaign-debrief" },
          { title: "Competitor Pricing Tracker", href: "/resources/competitor-pricing-tracker" },
          { title: "Content Brief Generator", href: "/resources/content-brief-generator" },
          { title: "Customer Journey Builder", href: "/resources/customer-journey-builder" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </main>
  );
}
