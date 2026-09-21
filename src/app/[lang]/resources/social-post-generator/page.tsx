"use client";

import { useState } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";

type Tone = "professional" | "casual" | "humorous" | "inspirational" | "educational";
type Platform = "linkedin" | "instagram" | "twitter" | "facebook" | "tiktok";

const tones: { value: Tone; label: string }[] = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "humorous", label: "Humorous" },
  { value: "inspirational", label: "Inspirational" },
  { value: "educational", label: "Educational" },
];

const platforms: { value: Platform; label: string; maxChars: number }[] = [
  { value: "linkedin", label: "LinkedIn", maxChars: 3000 },
  { value: "instagram", label: "Instagram", maxChars: 2200 },
  { value: "twitter", label: "Twitter / X", maxChars: 280 },
  { value: "facebook", label: "Facebook", maxChars: 2000 },
  { value: "tiktok", label: "TikTok", maxChars: 2200 },
];

function generatePost(topic: string, message: string, tone: Tone, platform: Platform): string {
  const t = topic.trim();
  const m = message.trim();
  const hooks: Record<Tone, string[]> = {
    professional: [`Here is what most people get wrong about ${t}.`, `${t} is changing fast. Here is what matters.`],
    casual: [`Let's talk about ${t} for a sec.`, `Real talk about ${t}.`],
    humorous: [`Nobody asked, but here are my thoughts on ${t}.`, `Hot take on ${t} incoming.`],
    inspirational: [`${t} taught me something I did not expect.`, `If ${t} feels overwhelming, read this.`],
    educational: [`Let me break down ${t} in simple terms.`, `3 things you need to know about ${t}.`],
  };
  const hook = hooks[tone][Math.floor(Math.random() * hooks[tone].length)];

  if (platform === "linkedin") {
    return `${hook}\n\n${m}\n\nHere is my take:\n\n1. Start with the fundamentals\n2. Test before you scale\n3. Measure what matters\n\nThe companies that get ${t} right build systems, not one-off campaigns.\n\nWhat is your experience with ${t}?\n\n#${t.replace(/\s+/g, "")} #Marketing #Strategy`;
  }
  if (platform === "instagram") {
    return `${hook}\n\n${m}\n\nThe key is consistency and measurement. Every brand that succeeds starts small, tests relentlessly, and doubles down on what works.\n\nSave this post for later.\n\n.\n.\n.\n#${t.replace(/\s+/g, "")} #MarketingTips #DigitalMarketing #BusinessGrowth`;
  }
  if (platform === "twitter") {
    const short = `${hook}\n\n${m.slice(0, 180)}\n\n#${t.replace(/\s+/g, "").slice(0, 20)}`;
    return short.length > 280 ? short.slice(0, 277) + "..." : short;
  }
  if (platform === "facebook") {
    return `${hook}\n\n${m}\n\nThe brands that succeed with ${t} commit to the process, not just the idea.\n\nWhat do you think? Drop a comment below.`;
  }
  if (platform === "tiktok") {
    return `wait... you're NOT doing this with ${t}??\n\n${m}\n\nmost people overcomplicate this. the real secret? just start.\n\nfollow for more marketing tips\n\n#${t.replace(/\s+/g, "").toLowerCase()} #marketingtips #fyp`;
  }
  return m;
}

export default function SocialPostGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(["linkedin", "instagram"]);
  const [posts, setPosts] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const togglePlatform = (p: Platform) => setSelectedPlatforms((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);

  const generate = () => {
    const r: Record<string, string> = {};
    for (const p of selectedPlatforms) r[p] = generatePost(topic, message, tone, p);
    setPosts(r);
  };

  const copy = (p: string) => {
    navigator.clipboard.writeText(posts[p] || "");
    setCopied(p);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <article className="px-6 lg:px-12 py-16">
      <div className="max-w-4xl mx-auto">
        <nav aria-label="Breadcrumb" className="text-base text-gray-400 mb-8">
          <Link href="/resources" className="hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Resources</Link>
          <span className="mx-2">/</span>
          <span className="text-black">Social Post Generator</span>
        </nav>

        <header className="mb-12">
          <p className="text-base font-semibold tracking-widest uppercase text-gray-400 mb-3">Free Social Tool</p>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
            Social Media Post Generator
          </h1>
          <p className="text-lg text-gray-500 mt-4 max-w-2xl">Enter your topic and key message, select your platforms, and get ready-to-use post templates optimized for each channel.</p>
        </header>

        <div className="space-y-8">
          <section className="border border-gray-200 p-6 lg:p-8 space-y-6">
            <div>
              <label className="block text-base font-bold text-black mb-2">Topic / Subject</label>
              <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g., SEO strategy, email marketing" className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black transition-colors" />
            </div>
            <div>
              <label className="block text-base font-bold text-black mb-2">Key Message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="The main point you want to communicate..." className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black transition-colors resize-y" />
            </div>
            <div>
              <label className="block text-base font-bold text-black mb-2">Tone</label>
              <div className="flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button key={t.value} onClick={() => setTone(t.value)} className={`px-4 py-2 text-base font-medium border transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${tone === t.value ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300 hover:border-black"}`}>{t.label}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-base font-bold text-black mb-2">Platforms</label>
              <div className="flex flex-wrap gap-2">
                {platforms.map((p) => (
                  <button key={p.value} onClick={() => togglePlatform(p.value)} className={`px-4 py-2 text-base font-medium border transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${selectedPlatforms.includes(p.value) ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300 hover:border-black"}`}>{p.label}</button>
                ))}
              </div>
            </div>
            <button onClick={generate} disabled={!topic.trim() || !message.trim() || !selectedPlatforms.length} className="bg-black text-white px-8 py-4 text-base font-bold hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Generate Posts &rarr;</button>
          </section>

          {Object.keys(posts).length > 0 && (
            <section className="space-y-6">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black">Generated Posts</h2>
              {selectedPlatforms.map((p) => {
                const post = posts[p];
                if (!post) return null;
                const info = platforms.find((pl) => pl.value === p)!;
                return (
                  <div key={p} className="border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black">{info.label}</h3>
                      <span className={`text-base ${post.length > info.maxChars ? "text-red-600 font-bold" : "text-gray-400"}`}>{post.length} / {info.maxChars}</span>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-4 mb-4 whitespace-pre-wrap text-base text-gray-800 leading-relaxed">{post}</div>
                    <button onClick={() => copy(p)} className="border border-gray-300 text-gray-700 px-4 py-2 text-base font-medium hover:border-black hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">{copied === p ? "Copied!" : "Copy to Clipboard"}</button>
                  </div>
                );
              })}
            </section>
          )}

          <section className="bg-black text-white p-8 lg:p-12 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold mb-4">Need a Full Social Media Strategy?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">From content calendars to community management, our team handles social media end to end.</p>
            <Link href="/contact" className="inline-block bg-white text-black px-10 py-5 text-base font-bold hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Get Social Media Help &rarr;</Link>
          </section>
        </div>
      </div>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Social Media Post Generator",
          description: "Generate platform-specific social media posts for LinkedIn, Instagram, Twitter/X, Facebook, and TikTok. Enter your topic and get ready-to-use templates.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    </article>
  );
}
