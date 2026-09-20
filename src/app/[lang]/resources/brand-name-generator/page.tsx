"use client";

import { useState } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";

const prefixes = [
  "Nova", "Apex", "Velo", "Prism", "Zenith", "Flux", "Aura", "Nexus", "Orbit", "Echo",
  "Pulse", "Forge", "Atlas", "Ember", "Crest", "Drift", "Haven", "Lumen", "Onyx", "Spark",
  "Vertex", "Beacon", "Clarity", "Edge", "Horizon", "Ignite", "Kinetic", "Mosaic", "Nimble", "Optic",
];

const suffixes = [
  "Labs", "Studio", "Works", "Co", "Hub", "HQ", "Group", "Digital", "Media", "Agency",
  "Creative", "Solutions", "Collective", "Partners", "Ventures", "Global", "Pro", "Base", "Craft", "Logic",
  "Forge", "Flow", "Rise", "Core", "Wave", "Shift", "Sync", "Point", "Spot", "Verse",
];

const descriptors = [
  "Bold", "Swift", "True", "Pure", "Prime", "First", "Blue", "Red", "Gold", "Silver",
  "North", "South", "Peak", "River", "Stone", "Iron", "Cloud", "Sky", "Sun", "Moon",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Style = "modern" | "professional" | "creative" | "tech" | "luxury";

const styleConfig: Record<Style, { prefixPool: number[]; suffixPool: number[]; patterns: string[] }> = {
  modern: {
    prefixPool: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    suffixPool: [0, 1, 2, 3, 4, 5, 10, 11, 12, 21],
    patterns: ["prefix+suffix", "descriptor+prefix", "prefix+keyword"],
  },
  professional: {
    prefixPool: [7, 12, 14, 17, 21, 22, 23, 24, 25],
    suffixPool: [3, 6, 8, 11, 12, 13, 14, 15],
    patterns: ["prefix+suffix", "keyword+suffix", "descriptor+prefix"],
  },
  creative: {
    prefixPool: [6, 9, 10, 11, 13, 15, 16, 18, 19, 27],
    suffixPool: [1, 2, 10, 11, 12, 18, 19, 22, 23, 29],
    patterns: ["prefix+suffix", "prefix+keyword", "descriptor+prefix"],
  },
  tech: {
    prefixPool: [1, 2, 5, 7, 8, 20, 25, 26, 28, 29],
    suffixPool: [0, 3, 4, 5, 7, 16, 19, 24, 25, 26],
    patterns: ["prefix+suffix", "keyword+suffix", "prefix+keyword"],
  },
  luxury: {
    prefixPool: [3, 4, 6, 13, 14, 17, 18, 21, 22, 24],
    suffixPool: [1, 6, 10, 11, 12, 13, 14, 15, 18, 29],
    patterns: ["prefix+suffix", "descriptor+prefix", "prefix+keyword"],
  },
};

export default function BrandNameGeneratorPage() {
  const [keyword, setKeyword] = useState("");
  const [style, setStyle] = useState<Style>("modern");
  const [results, setResults] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);

  const generate = () => {
    const config = styleConfig[style];
    const names: string[] = [];
    const usedPrefixes = shuffle(config.prefixPool);
    const usedSuffixes = shuffle(config.suffixPool);
    const usedDescriptors = shuffle([...Array(descriptors.length).keys()]);
    const kw = keyword.trim();
    const capKw = kw ? kw.charAt(0).toUpperCase() + kw.slice(1).toLowerCase() : "";

    for (let i = 0; i < 12; i++) {
      const pattern = config.patterns[i % config.patterns.length];
      const p = prefixes[usedPrefixes[i % usedPrefixes.length]];
      const s = suffixes[usedSuffixes[i % usedSuffixes.length]];
      const d = descriptors[usedDescriptors[i % usedDescriptors.length]];

      if (pattern === "prefix+suffix") {
        names.push(`${p} ${s}`);
      } else if (pattern === "descriptor+prefix") {
        names.push(`${d} ${p}`);
      } else if (pattern === "prefix+keyword" && capKw) {
        names.push(`${p} ${capKw}`);
      } else if (pattern === "keyword+suffix" && capKw) {
        names.push(`${capKw} ${s}`);
      } else {
        names.push(`${d} ${p} ${s}`);
      }
    }

    if (capKw) {
      const extraSuffix = suffixes[usedSuffixes[0]];
      const extraPrefix = prefixes[usedPrefixes[0]];
      names.push(`${capKw} ${extraSuffix}`);
      names.push(`${extraPrefix}${capKw}`);
    }

    setResults(shuffle(names));
  };

  const toggleSave = (name: string) => {
    setSaved((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const styles: { key: Style; label: string }[] = [
    { key: "modern", label: "Modern" },
    { key: "professional", label: "Professional" },
    { key: "creative", label: "Creative" },
    { key: "tech", label: "Tech" },
    { key: "luxury", label: "Luxury" },
  ];

  return (
    <article>
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Brand Name Generator
            </h1>
            <SectionDesc>
              Get instant brand name ideas for your business. Enter a keyword, choose a style, and generate creative name combinations.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <Animate animation="fade-up">
            <div>
              <label htmlFor="keyword" className="block text-base font-bold text-black mb-2">
                Keyword (optional)
              </label>
              <input
                id="keyword"
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. design, health, tech, food"
                className="w-full px-4 py-3 border border-gray-200 text-base focus:border-black focus:outline-none transition-colors motion-reduce:transition-none"
              />
              <p className="text-base text-gray-400 mt-1">
                Add a word related to your industry or niche for more relevant suggestions.
              </p>
            </div>
          </Animate>

          <Animate animation="fade-up" delay={60}>
            <div>
              <p className="text-base font-bold text-black mb-3">Style</p>
              <div className="flex flex-wrap gap-2">
                {styles.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setStyle(s.key)}
                    className={`px-5 py-3 text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      style === s.key
                        ? "bg-black text-white"
                        : "border border-gray-200 text-gray-600 hover:border-black"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </Animate>

          <Animate animation="fade-up" delay={120}>
            <button
              onClick={generate}
              className="bg-black text-white px-8 py-4 text-base font-bold hover:bg-gray-900 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Generate Names
            </button>
          </Animate>
        </div>
      </section>

      {results.length > 0 && (
        <section className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                Generated Names
              </h2>
              <p className="text-base text-gray-400 mb-6">
                Click a name to save it to your shortlist. Generate again for new combinations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results.map((name, i) => (
                  <button
                    key={`${name}-${i}`}
                    onClick={() => toggleSave(name)}
                    className={`text-left px-5 py-4 text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      saved.includes(name)
                        ? "bg-black text-white"
                        : "border border-gray-200 text-black hover:border-black"
                    }`}
                  >
                    {name}
                    {saved.includes(name) && (
                      <span className="ml-2 text-gray-400 text-base font-normal">saved</span>
                    )}
                  </button>
                ))}
              </div>
            </Animate>
          </div>
        </section>
      )}

      {saved.length > 0 && (
        <section className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <div className="p-6 bg-gray-50 border border-gray-200">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">
                  Your Shortlist ({saved.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {saved.map((name) => (
                    <span
                      key={name}
                      className="px-4 py-2 bg-black text-white text-base font-bold"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </Animate>
          </div>
        </section>
      )}

      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              Tips for Choosing a Brand Name
            </h2>
            <div className="space-y-6 text-base text-gray-500 leading-relaxed">
              <div>
                <h3 className="font-bold text-black mb-2">Keep it short and memorable</h3>
                <p>The best brand names are easy to say, spell, and remember. Aim for 1-3 words and avoid complex combinations.</p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Check domain availability</h3>
                <p>Before falling in love with a name, check if the .com domain is available. Also check social media handles for consistency.</p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Consider your audience</h3>
                <p>Your name should resonate with your target market. A tech startup and a luxury spa need very different naming approaches.</p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Test it out loud</h3>
                <p>Say the name in a sentence. Can people easily understand it on the phone? Does it sound professional in a meeting?</p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Search for trademark conflicts</h3>
                <p>Check trademark databases to make sure your name does not conflict with existing businesses in your industry.</p>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Professional Branding?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              From naming to logo design to full brand identity, our creative team builds brands that stand out.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Start Your Branding Project &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
