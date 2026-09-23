"use client";

import { useState } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

interface AudienceProfile {
  name: string;
  ageRange: string;
  gender: string;
  location: string;
  income: string;
  education: string;
  occupation: string;
  interests: string;
  values: string;
  lifestyle: string;
  painPoints: string;
  goals: string;
  objections: string;
  channels: string[];
  buyingTriggers: string;
  decisionFactors: string;
}

const emptyProfile: AudienceProfile = {
  name: "",
  ageRange: "",
  gender: "",
  location: "",
  income: "",
  education: "",
  occupation: "",
  interests: "",
  values: "",
  lifestyle: "",
  painPoints: "",
  goals: "",
  objections: "",
  channels: [],
  buyingTriggers: "",
  decisionFactors: "",
};

const channelOptions = [
  "Google Search", "Instagram", "Facebook", "LinkedIn", "TikTok", "YouTube",
  "Email", "Twitter/X", "Podcasts", "Industry Events", "Referrals", "Direct Mail",
];

const ageRanges = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"];
const incomeRanges = ["Under $30k", "$30k-$50k", "$50k-$75k", "$75k-$100k", "$100k-$150k", "$150k+"];
const educationOptions = ["High School", "Some College", "Bachelor's Degree", "Master's Degree", "Doctorate", "Trade/Vocational"];



export default function AudienceTargetingWorksheetPage() {
  const [profile, setProfile] = useState<AudienceProfile>(emptyProfile);
  const [step, setStep] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const update = (field: keyof AudienceProfile, value: string | string[]) =>
    setProfile((p) => ({ ...p, [field]: value }));

  const toggleChannel = (ch: string) =>
    setProfile((p) => ({
      ...p,
      channels: p.channels.includes(ch)
        ? p.channels.filter((c) => c !== ch)
        : [...p.channels, ch],
    }));

  const steps = [
    {
      title: "Demographics",
      subtitle: "Who is your ideal customer?",
      fields: (
        <div className="space-y-5">
          <div>
            <label className="block text-base font-bold text-black mb-2">Persona Name</label>
            <input type="text" value={profile.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Marketing Manager Maria" className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-base font-bold text-black mb-2">Age Range</label>
              <select value={profile.ageRange} onChange={(e) => update("ageRange", e.target.value)} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black bg-white">
                <option value="">Select</option>
                {ageRanges.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-base font-bold text-black mb-2">Gender</label>
              <select value={profile.gender} onChange={(e) => update("gender", e.target.value)} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black bg-white">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="All Genders">All Genders</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-base font-bold text-black mb-2">Location</label>
            <input type="text" value={profile.location} onChange={(e) => update("location", e.target.value)} placeholder="e.g. Urban areas, United States, UK" className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-base font-bold text-black mb-2">Income Level</label>
              <select value={profile.income} onChange={(e) => update("income", e.target.value)} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black bg-white">
                <option value="">Select</option>
                {incomeRanges.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-base font-bold text-black mb-2">Education</label>
              <select value={profile.education} onChange={(e) => update("education", e.target.value)} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black bg-white">
                <option value="">Select</option>
                {educationOptions.map((ed) => <option key={ed} value={ed}>{ed}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-base font-bold text-black mb-2">Occupation / Job Title</label>
            <input type="text" value={profile.occupation} onChange={(e) => update("occupation", e.target.value)} placeholder="e.g. Marketing Director, Small Business Owner" className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black" />
          </div>
        </div>
      ),
    },
    {
      title: "Psychographics",
      subtitle: "What drives them?",
      fields: (
        <div className="space-y-5">
          <div>
            <label className="block text-base font-bold text-black mb-2">Interests and Hobbies</label>
            <textarea value={profile.interests} onChange={(e) => update("interests", e.target.value)} placeholder="e.g. Technology, fitness, entrepreneurship, travel" rows={3} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black resize-y" />
          </div>
          <div>
            <label className="block text-base font-bold text-black mb-2">Core Values</label>
            <textarea value={profile.values} onChange={(e) => update("values", e.target.value)} placeholder="e.g. Efficiency, innovation, work-life balance, sustainability" rows={3} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black resize-y" />
          </div>
          <div>
            <label className="block text-base font-bold text-black mb-2">Lifestyle Description</label>
            <textarea value={profile.lifestyle} onChange={(e) => update("lifestyle", e.target.value)} placeholder="e.g. Busy professional, early adopter, health-conscious, budget-minded" rows={3} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black resize-y" />
          </div>
        </div>
      ),
    },
    {
      title: "Pain Points and Goals",
      subtitle: "What problems do they need solved?",
      fields: (
        <div className="space-y-5">
          <div>
            <label className="block text-base font-bold text-black mb-2">Top Pain Points</label>
            <textarea value={profile.painPoints} onChange={(e) => update("painPoints", e.target.value)} placeholder="List 3-5 frustrations or challenges they face" rows={4} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black resize-y" />
          </div>
          <div>
            <label className="block text-base font-bold text-black mb-2">Goals and Aspirations</label>
            <textarea value={profile.goals} onChange={(e) => update("goals", e.target.value)} placeholder="What outcomes are they working toward?" rows={4} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black resize-y" />
          </div>
          <div>
            <label className="block text-base font-bold text-black mb-2">Common Objections</label>
            <textarea value={profile.objections} onChange={(e) => update("objections", e.target.value)} placeholder="What stops them from buying? e.g. Price, trust, complexity" rows={3} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black resize-y" />
          </div>
        </div>
      ),
    },
    {
      title: "Channels and Buying Behaviour",
      subtitle: "How do they find and evaluate solutions?",
      fields: (
        <div className="space-y-5">
          <div>
            <label className="block text-base font-bold text-black mb-2">Preferred Channels</label>
            <div className="flex flex-wrap gap-2">
              {channelOptions.map((ch) => (
                <button key={ch} onClick={() => toggleChannel(ch)} className={`px-4 py-2 text-base font-medium border transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${profile.channels.includes(ch) ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300 hover:border-black"}`}>{ch}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-base font-bold text-black mb-2">Buying Triggers</label>
            <textarea value={profile.buyingTriggers} onChange={(e) => update("buyingTriggers", e.target.value)} placeholder="What events or moments trigger a purchase decision? e.g. Quarter-end budget, product launch, competitive pressure" rows={3} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black resize-y" />
          </div>
          <div>
            <label className="block text-base font-bold text-black mb-2">Key Decision Factors</label>
            <textarea value={profile.decisionFactors} onChange={(e) => update("decisionFactors", e.target.value)} placeholder="What matters most when choosing a provider? e.g. Price, reputation, case studies, speed" rows={3} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black resize-y" />
          </div>
        </div>
      ),
    },
  ];

  const downloadBrief = () => {
    const lines = [
      `AUDIENCE TARGETING BRIEF`,
      `========================`,
      ``,
      `Persona: ${profile.name || "Unnamed"}`,
      ``,
      `--- DEMOGRAPHICS ---`,
      `Age: ${profile.ageRange || "Not specified"}`,
      `Gender: ${profile.gender || "Not specified"}`,
      `Location: ${profile.location || "Not specified"}`,
      `Income: ${profile.income || "Not specified"}`,
      `Education: ${profile.education || "Not specified"}`,
      `Occupation: ${profile.occupation || "Not specified"}`,
      ``,
      `--- PSYCHOGRAPHICS ---`,
      `Interests: ${profile.interests || "Not specified"}`,
      `Values: ${profile.values || "Not specified"}`,
      `Lifestyle: ${profile.lifestyle || "Not specified"}`,
      ``,
      `--- PAIN POINTS & GOALS ---`,
      `Pain Points: ${profile.painPoints || "Not specified"}`,
      `Goals: ${profile.goals || "Not specified"}`,
      `Objections: ${profile.objections || "Not specified"}`,
      ``,
      `--- CHANNELS & BUYING BEHAVIOUR ---`,
      `Preferred Channels: ${profile.channels.length > 0 ? profile.channels.join(", ") : "Not specified"}`,
      `Buying Triggers: ${profile.buyingTriggers || "Not specified"}`,
      `Decision Factors: ${profile.decisionFactors || "Not specified"}`,
      ``,
      `--- Generated by Markit Media (themarkitmedia.com) ---`,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audience-brief-${(profile.name || "persona").toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filledFields = [
    profile.name, profile.ageRange, profile.gender, profile.location,
    profile.interests, profile.painPoints, profile.goals,
  ].filter(Boolean).length;
  const completeness = Math.round((filledFields / 7) * 100);

  return (
    <article className="px-6 lg:px-12 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Audience Targeting Worksheet",
          description: "Define your ideal customer with this interactive worksheet. Map demographics, psychographics, pain points, and preferred channels, then export your targeting brief.",
          url: "https://themarkitmedia.com/en/resources/audience-targeting-worksheet",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Audience Targeting Worksheet | Free Marketing Tool — Markit Media</title>
      <meta name="description" content="Define your ideal customer with this interactive worksheet. Map demographics, psychographics, pain points, and preferred channels, then export your targeting..." />
      <div className="max-w-4xl mx-auto">
        <nav aria-label="Breadcrumb" className="text-base text-gray-400 mb-8">
          <Link href="/resources" className="hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Resources</Link>
          <span className="mx-2">/</span>
          <span className="text-black">Audience Targeting Worksheet</span>
        </nav>

        <header className="mb-12">
          <p className="text-base font-semibold tracking-widest uppercase text-gray-400 mb-3">Free Planning Tool</p>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
            Audience Targeting Worksheet
          </h1>
          <p className="text-lg text-gray-500 mt-4 max-w-2xl">
            Build a detailed profile of your ideal customer. Fill in each section and export a targeting brief for your team or agency.
          </p>
        </header>

        {!showSummary ? (
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
              {steps[step].fields}
            </section>

            <div className="flex justify-between gap-4">
              <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="border border-gray-300 text-gray-700 px-6 py-3 text-base font-medium hover:border-black hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                &larr; Back
              </button>
              {step < steps.length - 1 ? (
                <button onClick={() => setStep((s) => s + 1)} className="bg-black text-white px-8 py-3 text-base font-bold hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  Next &rarr;
                </button>
              ) : (
                <button onClick={() => setShowSummary(true)} className="bg-black text-white px-8 py-3 text-base font-bold hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  View Summary &rarr;
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <section aria-label="Demographics" className="border border-gray-200 p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-black">
                  {profile.name || "Your Audience Profile"}
                </h2>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-black">{completeness}%</div>
                  <div className="text-base text-gray-400">Complete</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-base font-bold text-black mb-3 uppercase tracking-wider">Demographics</h3>
                  <div className="space-y-2 text-base">
                    {profile.ageRange && <p><span className="text-gray-500">Age:</span> {profile.ageRange}</p>}
                    {profile.gender && <p><span className="text-gray-500">Gender:</span> {profile.gender}</p>}
                    {profile.location && <p><span className="text-gray-500">Location:</span> {profile.location}</p>}
                    {profile.income && <p><span className="text-gray-500">Income:</span> {profile.income}</p>}
                    {profile.education && <p><span className="text-gray-500">Education:</span> {profile.education}</p>}
                    {profile.occupation && <p><span className="text-gray-500">Occupation:</span> {profile.occupation}</p>}
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-black mb-3 uppercase tracking-wider">Psychographics</h3>
                  <div className="space-y-2 text-base">
                    {profile.interests && <p><span className="text-gray-500">Interests:</span> {profile.interests}</p>}
                    {profile.values && <p><span className="text-gray-500">Values:</span> {profile.values}</p>}
                    {profile.lifestyle && <p><span className="text-gray-500">Lifestyle:</span> {profile.lifestyle}</p>}
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-black mb-3 uppercase tracking-wider">Pain Points and Goals</h3>
                  <div className="space-y-2 text-base">
                    {profile.painPoints && <p><span className="text-gray-500">Pain Points:</span> {profile.painPoints}</p>}
                    {profile.goals && <p><span className="text-gray-500">Goals:</span> {profile.goals}</p>}
                    {profile.objections && <p><span className="text-gray-500">Objections:</span> {profile.objections}</p>}
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-black mb-3 uppercase tracking-wider">Channels and Buying</h3>
                  <div className="space-y-2 text-base">
                    {profile.channels.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {profile.channels.map((ch) => (
                          <span key={ch} className="bg-gray-100 text-black px-2 py-1 text-base">{ch}</span>
                        ))}
                      </div>
                    )}
                    {profile.buyingTriggers && <p><span className="text-gray-500">Triggers:</span> {profile.buyingTriggers}</p>}
                    {profile.decisionFactors && <p><span className="text-gray-500">Decision Factors:</span> {profile.decisionFactors}</p>}
                  </div>
                </div>
              </div>
            </section>

            <div className="flex flex-wrap gap-4">
              <button onClick={downloadBrief} className="bg-black text-white px-8 py-3 text-base font-bold hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                Download Brief (.txt)
              </button>
              <button onClick={() => setShowSummary(false)} className="border border-gray-300 text-gray-700 px-6 py-3 text-base font-medium hover:border-black hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                Edit Worksheet
              </button>
              <button onClick={() => { setProfile(emptyProfile); setStep(0); setShowSummary(false); }} className="border border-gray-300 text-gray-700 px-6 py-3 text-base font-medium hover:border-black hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                Start Over
              </button>
            </div>

            <section aria-label="Need Help Reaching Your Audience?" className="bg-black text-white p-8 lg:p-12 text-center">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold mb-4">Need Help Reaching Your Audience?</h2>
              <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">Our team builds targeted campaigns that connect your brand with the right people on the right channels.</p>
              <Link href="/contact" className="inline-block bg-white text-black px-10 py-5 text-base font-bold hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                Start Your Campaign &rarr;
              </Link>
            </section>
          </div>
        )}
      </div>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Audience Targeting Worksheet",
          description: "Define your ideal customer with this interactive worksheet. Map demographics, psychographics, pain points, and preferred channels, then export your targeting brief.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Audience Targeting Worksheet"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Agency Comparison", href: "/resources/agency-comparison" },
          { title: "Agency Pricing Calculator", href: "/resources/agency-pricing-calculator" },
          { title: "Ad Copy Generator", href: "/resources/ad-copy-generator" },
          { title: "Ad Spend Calculator", href: "/resources/ad-spend-calculator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
