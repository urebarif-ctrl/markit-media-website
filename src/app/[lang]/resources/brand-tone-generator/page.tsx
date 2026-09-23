"use client";

import { useState } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

const toneDimensions = [
  {
    name: "Formality",
    low: "Casual",
    high: "Formal",
    description: "How formally does your brand communicate?",
  },
  {
    name: "Energy",
    low: "Calm",
    high: "Energetic",
    description: "How much energy does your brand convey?",
  },
  {
    name: "Humour",
    low: "Serious",
    high: "Playful",
    description: "How much humour does your brand use?",
  },
  {
    name: "Authority",
    low: "Peer-level",
    high: "Expert",
    description: "How authoritative is your brand voice?",
  },
  {
    name: "Warmth",
    low: "Neutral",
    high: "Warm",
    description: "How emotionally warm is your communication?",
  },
];

const adjectiveBank = [
  "Professional", "Friendly", "Bold", "Approachable", "Innovative",
  "Trustworthy", "Confident", "Empathetic", "Direct", "Inspiring",
  "Witty", "Sophisticated", "Down-to-earth", "Authoritative", "Passionate",
  "Reliable", "Quirky", "Thoughtful", "Ambitious", "Transparent",
];

const audienceTypes = [
  "C-Suite / Executives", "Marketing Managers", "Small Business Owners",
  "Developers / Technical", "Consumers (Gen Z)", "Consumers (Millennials)",
  "Consumers (Gen X / Boomers)", "Students / Early Career", "Enterprise Buyers",
];

interface ToneProfile {
  brandName: string;
  dimensions: number[];
  adjectives: string[];
  audience: string;
  doExamples: string;
  dontExamples: string;
  tagline: string;
  missionVoice: string;
}

const initialProfile: ToneProfile = {
  brandName: "",
  dimensions: [3, 3, 2, 3, 3],
  adjectives: [],
  audience: "",
  doExamples: "",
  dontExamples: "",
  tagline: "",
  missionVoice: "",
};

function getToneSummary(dimensions: number[]): string {
  const labels = dimensions.map((val, i) => {
    const dim = toneDimensions[i];
    if (val <= 1) return dim.low.toLowerCase();
    if (val >= 4) return dim.high.toLowerCase();
    return "";
  }).filter(Boolean);

  if (labels.length === 0) return "balanced and moderate";
  return labels.join(", ");
}



export default function BrandToneGeneratorPage() {
  const [profile, setProfile] = useState<ToneProfile>(initialProfile);
  const [step, setStep] = useState(0);
  const [showGuide, setShowGuide] = useState(false);

  const updateDimension = (index: number, value: number) => {
    setProfile((p) => {
      const dims = [...p.dimensions];
      dims[index] = value;
      return { ...p, dimensions: dims };
    });
  };

  const toggleAdjective = (adj: string) => {
    setProfile((p) => ({
      ...p,
      adjectives: p.adjectives.includes(adj)
        ? p.adjectives.filter((a) => a !== adj)
        : p.adjectives.length < 5
          ? [...p.adjectives, adj]
          : p.adjectives,
    }));
  };

  const steps = [
    {
      title: "Brand Identity",
      subtitle: "Tell us about your brand",
      content: (
        <div className="space-y-5">
          <div>
            <label className="block text-base font-bold text-black mb-2">Brand Name</label>
            <input type="text" value={profile.brandName} onChange={(e) => setProfile((p) => ({ ...p, brandName: e.target.value }))} placeholder="Your brand or company name" className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black" />
          </div>
          <div>
            <label className="block text-base font-bold text-black mb-2">Primary Audience</label>
            <select value={profile.audience} onChange={(e) => setProfile((p) => ({ ...p, audience: e.target.value }))} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black bg-white">
              <option value="">Select primary audience</option>
              {audienceTypes.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-base font-bold text-black mb-2">Brand Tagline (optional)</label>
            <input type="text" value={profile.tagline} onChange={(e) => setProfile((p) => ({ ...p, tagline: e.target.value }))} placeholder="e.g. Think Different, Just Do It" className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black" />
          </div>
        </div>
      ),
    },
    {
      title: "Tone Dimensions",
      subtitle: "Position your brand on each spectrum",
      content: (
        <div className="space-y-8">
          {toneDimensions.map((dim, i) => (
            <div key={dim.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-bold text-black">{dim.name}</span>
                <span className="text-base text-gray-400">{dim.description}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-base text-gray-500 w-24 text-right">{dim.low}</span>
                <div className="flex-1 flex gap-1">
                  {[0, 1, 2, 3, 4].map((val) => (
                    <button
                      key={val}
                      onClick={() => updateDimension(i, val)}
                      className={`flex-1 h-10 border transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                        profile.dimensions[i] === val
                          ? "bg-black border-black"
                          : profile.dimensions[i] > val
                            ? "bg-gray-300 border-gray-300"
                            : "bg-gray-100 border-gray-200 hover:bg-gray-200"
                      }`}
                      aria-label={`${dim.name}: ${val + 1} of 5`}
                    />
                  ))}
                </div>
                <span className="text-base text-gray-500 w-24">{dim.high}</span>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Brand Adjectives",
      subtitle: "Select up to 5 words that describe your brand voice",
      content: (
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {adjectiveBank.map((adj) => (
              <button
                key={adj}
                onClick={() => toggleAdjective(adj)}
                className={`px-4 py-2 text-base font-medium border transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                  profile.adjectives.includes(adj)
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-300 hover:border-black"
                } ${!profile.adjectives.includes(adj) && profile.adjectives.length >= 5 ? "opacity-40 cursor-not-allowed" : ""}`}
                disabled={!profile.adjectives.includes(adj) && profile.adjectives.length >= 5}
              >
                {adj}
              </button>
            ))}
          </div>
          <p className="text-base text-gray-400">{profile.adjectives.length}/5 selected</p>
        </div>
      ),
    },
    {
      title: "Voice Examples",
      subtitle: "Define what your brand does and doesn't sound like",
      content: (
        <div className="space-y-5">
          <div>
            <label className="block text-base font-bold text-black mb-2">We DO sound like...</label>
            <textarea value={profile.doExamples} onChange={(e) => setProfile((p) => ({ ...p, doExamples: e.target.value }))} placeholder="e.g. &quot;Let's figure this out together.&quot; / &quot;Here's what the data shows.&quot; / &quot;Three steps to get started.&quot;" rows={4} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black resize-y" />
          </div>
          <div>
            <label className="block text-base font-bold text-black mb-2">We DON'T sound like...</label>
            <textarea value={profile.dontExamples} onChange={(e) => setProfile((p) => ({ ...p, dontExamples: e.target.value }))} placeholder="e.g. &quot;HURRY! LIMITED TIME OFFER!!!&quot; / &quot;As per the aforementioned documentation...&quot; / &quot;You need us to succeed.&quot;" rows={4} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black resize-y" />
          </div>
          <div>
            <label className="block text-base font-bold text-black mb-2">Brand Mission (in your voice)</label>
            <textarea value={profile.missionVoice} onChange={(e) => setProfile((p) => ({ ...p, missionVoice: e.target.value }))} placeholder="Write your brand mission statement in the tone you've defined above" rows={3} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black resize-y" />
          </div>
        </div>
      ),
    },
  ];

  const downloadGuide = () => {
    const lines = [
      `BRAND TONE OF VOICE GUIDE`,
      `==========================`,
      `Brand: ${profile.brandName || "Unnamed"}`,
      `Primary Audience: ${profile.audience || "Not specified"}`,
      profile.tagline ? `Tagline: ${profile.tagline}` : "",
      ``,
      `--- TONE DIMENSIONS ---`,
      ...toneDimensions.map((dim, i) => {
        const val = profile.dimensions[i];
        const position = val <= 1 ? dim.low : val >= 4 ? dim.high : "Balanced";
        return `${dim.name}: ${position} (${val + 1}/5)`;
      }),
      ``,
      `Overall tone: ${getToneSummary(profile.dimensions)}`,
      ``,
      `--- BRAND ADJECTIVES ---`,
      profile.adjectives.length > 0 ? profile.adjectives.join(", ") : "None selected",
      ``,
      `--- VOICE EXAMPLES ---`,
      `We DO sound like:`,
      profile.doExamples || "Not specified",
      ``,
      `We DON'T sound like:`,
      profile.dontExamples || "Not specified",
      ``,
      profile.missionVoice ? `--- MISSION (IN OUR VOICE) ---\n${profile.missionVoice}\n` : "",
      `--- Generated by Markit Media (themarkitmedia.com) ---`,
    ].filter((l) => l !== undefined);

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brand-tone-guide-${(profile.brandName || "brand").toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <article className="px-6 lg:px-12 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Brand Tone of Voice Generator",
          description: "How formally does your brand communicate?",
          url: "https://themarkitmedia.com/en/resources/brand-tone-generator",
          applicationCategory: "Branding Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Brand Tone of Voice Generator | Free Marketing Tool — Markit Media</title>
      <link rel="canonical" href="https://themarkitmedia.com/en/resources/brand-tone-generator" />
      <meta name="description" content="How formally does your brand communicate?" />
      <div className="max-w-4xl mx-auto">
        <nav aria-label="Breadcrumb" className="text-base text-gray-400 mb-8">
          <Link href="/resources" className="hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Resources</Link>
          <span className="mx-2">/</span>
          <span className="text-black">Brand Tone of Voice Generator</span>
        </nav>

        <header className="mb-12">
          <p className="text-base font-semibold tracking-widest uppercase text-gray-400 mb-3">Free Branding Tool</p>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
            Brand Tone of Voice Generator
          </h1>
          <p className="text-lg text-gray-500 mt-4 max-w-2xl">
            Define how your brand sounds. Map tone dimensions, select adjectives, write examples, and export a voice guide for your team.
          </p>
        </header>

        {!showGuide ? (
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              {steps.map((s, i) => (
                <button key={i} onClick={() => setStep(i)} className={`flex-1 h-2 transition-colors ${i <= step ? "bg-black" : "bg-gray-200"}`} aria-label={`Step ${i + 1}: ${s.title}`} />
              ))}
            </div>
            <div className="text-base text-gray-400">Step {step + 1} of {steps.length}</div>

            <section aria-label="Content section" className="border border-gray-200 p-6 lg:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-1">{steps[step].title}</h2>
              <p className="text-base text-gray-500 mb-6">{steps[step].subtitle}</p>
              {steps[step].content}
            </section>

            <div className="flex justify-between gap-4">
              <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="border border-gray-300 text-gray-700 px-6 py-3 text-base font-medium hover:border-black hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">&larr; Back</button>
              {step < steps.length - 1 ? (
                <button onClick={() => setStep((s) => s + 1)} className="bg-black text-white px-8 py-3 text-base font-bold hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Next &rarr;</button>
              ) : (
                <button onClick={() => setShowGuide(true)} className="bg-black text-white px-8 py-3 text-base font-bold hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Generate Voice Guide &rarr;</button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <section aria-label="Tone Spectrum" className="border border-gray-200 p-6 lg:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-black mb-6">
                {profile.brandName ? `${profile.brandName} Voice Guide` : "Your Voice Guide"}
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-base font-bold text-black uppercase tracking-wider mb-3">Tone Spectrum</h3>
                  <div className="space-y-4">
                    {toneDimensions.map((dim, i) => (
                      <div key={dim.name} className="flex items-center gap-3">
                        <span className="text-base text-gray-500 w-20 text-right">{dim.low}</span>
                        <div className="flex-1 flex gap-1">
                          {[0, 1, 2, 3, 4].map((val) => (
                            <div key={val} className={`flex-1 h-6 ${profile.dimensions[i] >= val ? "bg-black" : "bg-gray-100"}`} />
                          ))}
                        </div>
                        <span className="text-base text-gray-500 w-20">{dim.high}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-base text-gray-500 mt-3">Overall: <span className="text-black font-medium">{getToneSummary(profile.dimensions)}</span></p>
                </div>

                {profile.adjectives.length > 0 && (
                  <div>
                    <h3 className="text-base font-bold text-black uppercase tracking-wider mb-3">Brand Adjectives</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.adjectives.map((adj) => (
                        <span key={adj} className="bg-black text-white px-4 py-2 text-base font-medium">{adj}</span>
                      ))}
                    </div>
                  </div>
                )}

                {(profile.doExamples || profile.dontExamples) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {profile.doExamples && (
                      <div>
                        <h3 className="text-base font-bold text-green-700 mb-2">We DO sound like</h3>
                        <p className="text-base text-gray-700 whitespace-pre-wrap">{profile.doExamples}</p>
                      </div>
                    )}
                    {profile.dontExamples && (
                      <div>
                        <h3 className="text-base font-bold text-red-700 mb-2">We DON&apos;T sound like</h3>
                        <p className="text-base text-gray-700 whitespace-pre-wrap">{profile.dontExamples}</p>
                      </div>
                    )}
                  </div>
                )}

                {profile.missionVoice && (
                  <div>
                    <h3 className="text-base font-bold text-black uppercase tracking-wider mb-3">Mission (In Our Voice)</h3>
                    <blockquote className="border-l-4 border-black pl-4 text-lg text-gray-700 italic">{profile.missionVoice}</blockquote>
                  </div>
                )}
              </div>
            </section>

            <div className="flex flex-wrap gap-4">
              <button onClick={downloadGuide} className="bg-black text-white px-8 py-3 text-base font-bold hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Download Voice Guide (.txt)</button>
              <button onClick={() => { setShowGuide(false); setStep(0); }} className="border border-gray-300 text-gray-700 px-6 py-3 text-base font-medium hover:border-black hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Edit Voice Profile</button>
            </div>

            <section aria-label="Need Help Defining Your Brand?" className="bg-black text-white p-8 lg:p-12 text-center">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold mb-4">Need Help Defining Your Brand?</h2>
              <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">Our branding team creates comprehensive brand identities from voice and messaging to visual design systems.</p>
              <Link href="/contact" className="inline-block bg-white text-black px-10 py-5 text-base font-bold hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Start Your Brand Project &rarr;</Link>
            </section>
          </div>
        )}
      </div>
          
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
          name: "Brand Tone of Voice Generator",
          description: "Define your brand tone of voice with adjective mapping, do/don",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Brand Tone Generator"
        services={[
          { title: "Branding", desc: "Strategic brand identity that differentiates you in your market.", href: "/services/branding" },
          { title: "Website Development", desc: "Websites that bring your brand to life with exceptional UX.", href: "/services/website-development" },
          { title: "Digital Marketing", desc: "Amplify your brand across every digital touchpoint.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
          { title: "Brand Name Evaluator", href: "/resources/brand-name-evaluator" },
          { title: "Brand Name Generator", href: "/resources/brand-name-generator" },
          { title: "Brand Positioning", href: "/resources/brand-positioning" },
          { title: "Brand Voice Checker", href: "/resources/brand-voice-checker" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
