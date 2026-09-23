"use client";
import Link from "next/link";

import { useState } from "react";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

const PLATFORMS = ["Instagram", "LinkedIn", "Twitter / X", "TikTok", "Facebook"] as const;

interface ContentCheck {
  id: string;
  label: string;
  category: string;
  weight: number;
  platforms: string[];
}

const CHECKS: ContentCheck[] = [
  { id: "hook", label: "Strong opening hook (first line grabs attention)", category: "Copy", weight: 15, platforms: ["Instagram", "LinkedIn", "Twitter / X", "TikTok", "Facebook"] },
  { id: "value", label: "Provides clear value to the audience", category: "Copy", weight: 15, platforms: ["Instagram", "LinkedIn", "Twitter / X", "TikTok", "Facebook"] },
  { id: "cta", label: "Includes a call to action", category: "Copy", weight: 10, platforms: ["Instagram", "LinkedIn", "Twitter / X", "TikTok", "Facebook"] },
  { id: "length", label: "Appropriate length for the platform", category: "Copy", weight: 5, platforms: ["Instagram", "LinkedIn", "Twitter / X", "TikTok", "Facebook"] },
  { id: "tone", label: "Tone matches the platform culture", category: "Copy", weight: 5, platforms: ["Instagram", "LinkedIn", "Twitter / X", "TikTok", "Facebook"] },
  { id: "visual_quality", label: "High-quality visual (sharp, well-lit, branded)", category: "Visual", weight: 10, platforms: ["Instagram", "TikTok", "Facebook"] },
  { id: "format", label: "Correct format/ratio for the platform", category: "Visual", weight: 5, platforms: ["Instagram", "TikTok", "Facebook"] },
  { id: "text_overlay", label: "Text overlays are readable and minimal", category: "Visual", weight: 5, platforms: ["Instagram", "TikTok", "Facebook"] },
  { id: "branding", label: "Brand elements present (colours, logo, fonts)", category: "Visual", weight: 5, platforms: ["Instagram", "LinkedIn", "TikTok", "Facebook"] },
  { id: "hashtags", label: "Strategic hashtags (not spammy, relevant)", category: "Discovery", weight: 5, platforms: ["Instagram", "LinkedIn", "TikTok"] },
  { id: "keyword", label: "Contains relevant keywords", category: "Discovery", weight: 5, platforms: ["Instagram", "LinkedIn", "Twitter / X", "TikTok"] },
  { id: "trending", label: "Leverages a current trend or topic", category: "Discovery", weight: 5, platforms: ["Instagram", "TikTok", "Twitter / X"] },
  { id: "engagement_prompt", label: "Encourages comments/saves/shares", category: "Engagement", weight: 5, platforms: ["Instagram", "LinkedIn", "Facebook", "TikTok"] },
  { id: "conversation", label: "Asks a question or invites discussion", category: "Engagement", weight: 5, platforms: ["LinkedIn", "Twitter / X", "Facebook"] },
];



export default function SocialContentRaterPage() {
  const [platform, setPlatform] = useState("Instagram");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [description, setDescription] = useState("");
  const [history, setHistory] = useState<{ platform: string; score: number; grade: string }[]>([]);

  const applicableChecks = CHECKS.filter((c) => c.platforms.includes(platform));
  const maxScore = applicableChecks.reduce((s, c) => s + c.weight, 0);
  const currentScore = applicableChecks
    .filter((c) => checked[c.id])
    .reduce((s, c) => s + c.weight, 0);
  const pct = maxScore > 0 ? Math.round((currentScore / maxScore) * 100) : 0;

  let grade = "F";
  if (pct >= 90) grade = "A";
  else if (pct >= 75) grade = "B";
  else if (pct >= 60) grade = "C";
  else if (pct >= 40) grade = "D";

  function handleToggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleReset() {
    setChecked({});
    setDescription("");
  }

  function handleSave() {
    setHistory((prev) => [
      { platform, score: pct, grade },
      ...prev.slice(0, 19),
    ]);
  }

  const categories = [...new Set(applicableChecks.map((c) => c.category))];

  const categoryScores = categories.map((cat) => {
    const catChecks = applicableChecks.filter((c) => c.category === cat);
    const catMax = catChecks.reduce((s, c) => s + c.weight, 0);
    const catCurrent = catChecks
      .filter((c) => checked[c.id])
      .reduce((s, c) => s + c.weight, 0);
    return {
      category: cat,
      pct: catMax > 0 ? Math.round((catCurrent / catMax) * 100) : 0,
    };
  });

  const missing = applicableChecks.filter((c) => !checked[c.id]);

  return (
    <main className="min-h-screen bg-white text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Social Media Content Rater",
          description: "Rate your social media content against best practices for each platform. Get scores on visuals, copy, hashtags, timing, and engagement potential.",
          url: "https://themarkitmedia.com/en/resources/social-content-rater",
          applicationCategory: "Social Media Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Social Media Content Rater | Free Marketing Tool — Markit Media</title>
      <link rel="canonical" href="https://themarkitmedia.com/en/resources/social-content-rater" />
      <meta name="description" content="Rate your social media content against best practices for each platform. Get scores on visuals, copy, hashtags, timing, and engagement potential." />
      <nav className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/resources" className="hover:text-black transition-colors">Resources</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">Social Media Content Rater</li>
        </ol>
      </nav>
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
          Social Media Content Rater
        </h1>
        <p className="text-lg text-neutral-600 mb-10">
          Rate your content against best practices for each platform. Get a
          score and improvement suggestions.
        </p>

        {/* Platform */}
        <div className="mb-6">
          <label className="block text-base font-semibold mb-2">Platform</label>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => (
              <button
                key={p}
                onClick={() => {
                  setPlatform(p);
                  setChecked({});
                }}
                className={`rounded-md border px-4 py-2 text-base font-medium transition-colors ${
                  platform === p
                    ? "border-black bg-black text-white"
                    : "border-neutral-300 hover:border-black"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-base font-semibold mb-1">
            Content Description (optional)
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
            placeholder="Brief description of the post you're rating"
          />
        </div>

        {/* Score display */}
        <div className="mb-8 rounded-lg border-2 border-black p-6 flex items-center justify-between">
          <div>
            <p className="text-base text-neutral-500">{platform} Content Score</p>
            <p className="text-4xl font-bold">{pct}/100</p>
          </div>
          <span
            className={`flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold ${
              pct >= 75
                ? "bg-black text-white"
                : pct >= 50
                  ? "bg-neutral-600 text-white"
                  : "bg-neutral-200 text-black"
            }`}
          >
            {grade}
          </span>
        </div>

        {/* Category breakdown */}
        <div className="mb-6 space-y-2">
          {categoryScores.map((cs) => (
            <div key={cs.category} className="flex items-center gap-3">
              <span className="w-24 text-base font-medium">{cs.category}</span>
              <div className="h-3 flex-1 rounded-full bg-neutral-100">
                <div
                  className="h-3 rounded-full bg-black transition-all"
                  style={{ width: `${cs.pct}%` }}
                />
              </div>
              <span className="w-12 text-right text-base font-semibold">{cs.pct}%</span>
            </div>
          ))}
        </div>

        {/* Checklist */}
        <div className="mb-8 space-y-6">
          {categories.map((cat) => (
            <div key={cat}>
              <h2 className="text-lg font-bold mb-3">{cat}</h2>
              <div className="space-y-2">
                {applicableChecks
                  .filter((c) => c.category === cat)
                  .map((check) => (
                    <label
                      key={check.id}
                      className={`flex items-center gap-3 rounded-md border p-3 cursor-pointer transition-colors ${
                        checked[check.id]
                          ? "border-black bg-black/5"
                          : "border-neutral-200 hover:border-neutral-400"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={!!checked[check.id]}
                        onChange={() => handleToggle(check.id)}
                        className="h-5 w-5 accent-black"
                      />
                      <span className="flex-1 text-base">{check.label}</span>
                      <span className="text-base text-neutral-400">
                        +{check.weight}pts
                      </span>
                    </label>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Improvement suggestions */}
        {missing.length > 0 && pct < 100 && (
          <div className="mb-8 rounded-lg bg-neutral-50 p-5">
            <h2 className="text-lg font-bold mb-3">Improvements to Make</h2>
            <ul className="space-y-2">
              {missing.slice(0, 5).map((m) => (
                <li key={m.id} className="text-base flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0" />
                  {m.label} (+{m.weight}pts)
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="rounded-md bg-black px-6 py-2 text-base font-semibold text-white hover:bg-neutral-800 transition-colors"
          >
            Save Score
          </button>
          <button
            onClick={handleReset}
            className="rounded-md border border-neutral-300 px-6 py-2 text-base font-medium hover:border-black transition-colors"
          >
            Reset
          </button>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-10 rounded-lg border border-neutral-200 p-5">
            <h2 className="text-xl font-bold mb-4">Rating History</h2>
            <div className="space-y-2">
              {history.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-md bg-neutral-50 p-3"
                >
                  <span className="text-base font-medium">{h.platform}</span>
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
          name: "Social Media Content Rater",
          description: "Rate your social media content against best practices for each platform. Get scores on visuals, copy, hashtags, timing, and engagement potential.",
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
                <Link href="/resources/social-media-planner" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Social Media Planner</Link>
                <Link href="/resources/social-media-roi" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Social Media ROI</Link>
                <Link href="/resources/social-media-audit" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Social Media Audit</Link>
                <Link href="/resources/social-calendar" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Social Calendar</Link>
          </div>
        </div>
      </section>
    
      <ToolCTA
        toolName="Social Content Rater"
        services={[
          { title: "Social Media Marketing", desc: "Strategy, content, and community management across all platforms.", href: "/services/social-media-marketing" },
          { title: "Content Marketing", desc: "Engaging content that builds brand authority and drives engagement.", href: "/services/content-marketing" },
          { title: "Digital Marketing", desc: "Integrated digital strategy connecting social to business results.", href: "/services/digital-marketing" },
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
