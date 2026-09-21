"use client";

import { useState } from "react";
import { JsonLd } from "@/components/json-ld";

const PLATFORMS = [
  { id: "linkedin", name: "LinkedIn", maxLength: 2000, label: "Professional headline + summary" },
  { id: "instagram", name: "Instagram", maxLength: 150, label: "Bio (150 chars)" },
  { id: "twitter", name: "Twitter / X", maxLength: 160, label: "Bio (160 chars)" },
  { id: "tiktok", name: "TikTok", maxLength: 80, label: "Bio (80 chars)" },
  { id: "facebook", name: "Facebook", maxLength: 255, label: "About / intro" },
] as const;

const TONES = ["Professional", "Casual", "Witty", "Bold", "Inspirational", "Minimalist"] as const;

const POWER_WORDS: Record<string, string[]> = {
  Professional: ["Expert", "Specialist", "Strategist", "Leader", "Consultant", "Advisor"],
  Casual: ["Lover", "Enthusiast", "Geek", "Explorer", "Creator", "Builder"],
  Witty: ["Connoisseur", "Whisperer", "Wrangler", "Ninja", "Jedi", "Alchemist"],
  Bold: ["Disruptor", "Pioneer", "Maverick", "Visionary", "Trailblazer", "Revolutionary"],
  Inspirational: ["Champion", "Advocate", "Changemaker", "Catalyst", "Ambassador", "Mentor"],
  Minimalist: ["Design", "Build", "Ship", "Create", "Solve", "Lead"],
};

const CTA_TEMPLATES = [
  "Link below for {topic}",
  "DM me about {topic}",
  "Let's connect on {topic}",
  "Check out my {topic}",
  "{topic} tips daily",
  "Helping you with {topic}",
  "Book a free call ↓",
  "New {topic} content weekly",
];

interface BioConfig {
  name: string;
  role: string;
  industry: string;
  keywords: string;
  tone: string;
  cta: string;
  platform: string;
  emoji: boolean;
}

function generateBio(config: BioConfig): string {
  const { name, role, industry, keywords, tone, cta, platform, emoji } = config;
  const keywordList = keywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
  const platformData = PLATFORMS.find((p) => p.id === platform);
  const maxLen = platformData?.maxLength ?? 160;

  const words = POWER_WORDS[tone] || POWER_WORDS.Professional;
  const word = words[Math.floor(Math.random() * words.length)];

  let parts: string[] = [];

  if (platform === "linkedin") {
    const headline = role
      ? `${role}${industry ? ` | ${industry}` : ""}`
      : `${industry} ${word}`;
    const summary = [
      role ? `${role} focused on ${industry || "delivering results"}.` : "",
      keywordList.length > 0
        ? `Specialising in ${keywordList.slice(0, 3).join(", ")}.`
        : "",
      cta || "",
    ]
      .filter(Boolean)
      .join(" ");
    parts = [headline, "", summary];
  } else if (platform === "instagram" || platform === "tiktok") {
    if (role) parts.push(emoji ? `✨ ${role}` : role);
    if (industry) parts.push(emoji ? `📍 ${industry}` : industry);
    if (keywordList[0])
      parts.push(emoji ? `🎯 ${keywordList[0]}` : keywordList[0]);
    if (cta) parts.push(emoji ? `👇 ${cta}` : cta);
  } else if (platform === "twitter") {
    const items = [role, industry, ...keywordList.slice(0, 2)].filter(Boolean);
    if (tone === "Minimalist") {
      parts = [items.join(". ") + ".", cta].filter(Boolean);
    } else {
      parts = [
        items.join(emoji ? " • " : " | "),
        cta ? (emoji ? `🔗 ${cta}` : cta) : "",
      ].filter(Boolean);
    }
  } else {
    parts = [
      name ? `${name}` : "",
      role ? `${word} in ${role}` : "",
      industry ? `Working in ${industry}` : "",
      keywordList.length > 0
        ? `Focused on ${keywordList.join(", ")}`
        : "",
      cta || "",
    ].filter(Boolean);
  }

  let bio = parts.join("\n").trim();
  if (bio.length > maxLen) {
    bio = bio.slice(0, maxLen - 3) + "...";
  }
  return bio;
}

export default function SocialMediaBioGeneratorPage() {
  const [config, setConfig] = useState<BioConfig>({
    name: "",
    role: "",
    industry: "",
    keywords: "",
    tone: "Professional",
    cta: "",
    platform: "linkedin",
    emoji: true,
  });
  const [generated, setGenerated] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<{ platform: string; bio: string }[]>(
    []
  );

  const activePlatform = PLATFORMS.find((p) => p.id === config.platform);

  function handleGenerate() {
    const bio = generateBio(config);
    setGenerated(bio);
    setCopied(false);
    setHistory((prev) => [
      { platform: config.platform, bio },
      ...prev.slice(0, 9),
    ]);
  }

  function handleCopy() {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleExport() {
    const lines = history.map(
      (h) =>
        `[${PLATFORMS.find((p) => p.id === h.platform)?.name || h.platform}]\n${h.bio}\n`
    );
    const blob = new Blob(
      [
        `Social Media Bios — Generated with Markit Media\n${"=".repeat(50)}\n\n${lines.join("\n")}`,
      ],
      { type: "text/plain" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "social-media-bios.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  const set = (field: keyof BioConfig, val: string | boolean) =>
    setConfig((p) => ({ ...p, [field]: val }));

  return (
    <main className="min-h-screen bg-white text-black">
      <nav className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><a href="/" className="hover:text-black transition-colors">Home</a></li>
          <li aria-hidden="true">/</li>
          <li><a href="/resources" className="hover:text-black transition-colors">Resources</a></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">Social Media Bio Generator</li>
        </ol>
      </nav>
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
          Social Media Bio Generator
        </h1>
        <p className="text-lg text-neutral-600 mb-10">
          Create optimised bios for every platform with the right tone, keywords,
          and call to action.
        </p>

        {/* Platform selector */}
        <div className="mb-8">
          <label className="block text-base font-semibold mb-3">
            Platform
          </label>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                onClick={() => set("platform", p.id)}
                className={`rounded-md border px-4 py-2 text-base font-medium transition-colors ${
                  config.platform === p.id
                    ? "border-black bg-black text-white"
                    : "border-neutral-300 bg-white text-black hover:border-black"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
          {activePlatform && (
            <p className="mt-2 text-base text-neutral-500">
              {activePlatform.label} — max {activePlatform.maxLength} characters
            </p>
          )}
        </div>

        {/* Form */}
        <div className="grid gap-5 sm:grid-cols-2 mb-8">
          <div>
            <label className="block text-base font-semibold mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={config.name}
              onChange={(e) => set("name", e.target.value)}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              placeholder="Jane Smith"
            />
          </div>
          <div>
            <label className="block text-base font-semibold mb-1">
              Role / Title
            </label>
            <input
              type="text"
              value={config.role}
              onChange={(e) => set("role", e.target.value)}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              placeholder="Marketing Director"
            />
          </div>
          <div>
            <label className="block text-base font-semibold mb-1">
              Industry
            </label>
            <input
              type="text"
              value={config.industry}
              onChange={(e) => set("industry", e.target.value)}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              placeholder="SaaS / E-Commerce / Healthcare"
            />
          </div>
          <div>
            <label className="block text-base font-semibold mb-1">
              Keywords{" "}
              <span className="font-normal text-neutral-500">
                (comma-separated)
              </span>
            </label>
            <input
              type="text"
              value={config.keywords}
              onChange={(e) => set("keywords", e.target.value)}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              placeholder="SEO, growth, analytics"
            />
          </div>
        </div>

        {/* Tone selector */}
        <div className="mb-6">
          <label className="block text-base font-semibold mb-3">Tone</label>
          <div className="flex flex-wrap gap-2">
            {TONES.map((t) => (
              <button
                key={t}
                onClick={() => set("tone", t)}
                className={`rounded-md border px-4 py-2 text-base font-medium transition-colors ${
                  config.tone === t
                    ? "border-black bg-black text-white"
                    : "border-neutral-300 bg-white text-black hover:border-black"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mb-6">
          <label className="block text-base font-semibold mb-2">
            Call to Action
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {CTA_TEMPLATES.map((tpl) => (
              <button
                key={tpl}
                onClick={() =>
                  set(
                    "cta",
                    tpl.replace(
                      "{topic}",
                      config.keywords.split(",")[0]?.trim() || "marketing"
                    )
                  )
                }
                className="rounded border border-neutral-200 px-3 py-1.5 text-base hover:border-black transition-colors"
              >
                {tpl.replace("{topic}", "…")}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={config.cta}
            onChange={(e) => set("cta", e.target.value)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
            placeholder="Custom CTA or pick one above"
          />
        </div>

        {/* Emoji toggle */}
        <div className="mb-8 flex items-center gap-3">
          <button
            onClick={() => set("emoji", !config.emoji)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              config.emoji ? "bg-black" : "bg-neutral-300"
            }`}
            role="switch"
            aria-checked={config.emoji}
          >
            <span
              className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                config.emoji ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-base">Include emojis</span>
        </div>

        {/* Generate */}
        <button
          onClick={handleGenerate}
          className="w-full rounded-lg bg-black px-6 py-3 text-lg font-semibold text-white hover:bg-neutral-800 transition-colors mb-8"
        >
          Generate Bio
        </button>

        {/* Result */}
        {generated && (
          <div className="mb-10 rounded-lg border-2 border-black p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold">
                Your {activePlatform?.name} Bio
              </h2>
              <span className="text-base text-neutral-500">
                {generated.length} / {activePlatform?.maxLength} chars
              </span>
            </div>
            <pre className="whitespace-pre-wrap text-base leading-relaxed bg-neutral-50 rounded-md p-4 mb-4 font-sans">
              {generated}
            </pre>
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="rounded-md border border-black px-4 py-2 text-base font-medium hover:bg-black hover:text-white transition-colors"
              >
                {copied ? "Copied!" : "Copy to Clipboard"}
              </button>
              <button
                onClick={handleGenerate}
                className="rounded-md border border-neutral-300 px-4 py-2 text-base font-medium hover:border-black transition-colors"
              >
                Regenerate
              </button>
            </div>
          </div>
        )}

        {/* Power words */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-3">
            Power Words for &ldquo;{config.tone}&rdquo; Tone
          </h2>
          <div className="flex flex-wrap gap-2">
            {(POWER_WORDS[config.tone] || []).map((w) => (
              <span
                key={w}
                className="rounded-full border border-neutral-300 px-3 py-1 text-base"
              >
                {w}
              </span>
            ))}
          </div>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Generated Bios</h2>
              <button
                onClick={handleExport}
                className="rounded-md border border-black px-4 py-2 text-base font-medium hover:bg-black hover:text-white transition-colors"
              >
                Export All (.txt)
              </button>
            </div>
            <div className="space-y-4">
              {history.map((h, i) => (
                <div key={i} className="rounded-md bg-neutral-50 p-4">
                  <p className="text-base font-semibold mb-1">
                    {PLATFORMS.find((p) => p.id === h.platform)?.name}
                  </p>
                  <pre className="whitespace-pre-wrap text-base font-sans text-neutral-700">
                    {h.bio}
                  </pre>
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
          name: "Social Media Bio Generator",
          description: "Generate optimised social media bios for LinkedIn, Instagram, Twitter/X, TikTok, and Facebook with character limits, keywords, and CTAs.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      {/* CTA */}
      <section className="bg-black text-white px-6 lg:px-12 py-16 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold mb-4">Need Expert Help?</h2>
        <p className="text-base text-neutral-300 mb-8 max-w-2xl mx-auto">Our team can help you implement these insights and drive measurable results for your business.</p>
        <a href="/contact" className="inline-block bg-white text-black font-bold px-8 py-3 text-base hover:bg-neutral-200 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Get in Touch</a>
      </section>
    </main>
  );
}
