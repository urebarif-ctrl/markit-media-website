"use client";

import { useState } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

interface Competitor {
  name: string;
  website: string;
  strengths: string;
  weaknesses: string;
  pricing: string;
  audience: string;
  channels: string[];
}

const channelOptions = [
  "SEO / Organic Search",
  "Google Ads",
  "Facebook / Instagram Ads",
  "LinkedIn",
  "TikTok",
  "YouTube",
  "Email Marketing",
  "Content Marketing",
  "Influencer Marketing",
  "PR / Media",
  "Referral / Word of Mouth",
  "Events / Trade Shows",
];

const emptyCompetitor: Competitor = {
  name: "",
  website: "",
  strengths: "",
  weaknesses: "",
  pricing: "",
  audience: "",
  channels: [],
};

export default function CompetitorAnalysisPage() {
  const [competitors, setCompetitors] = useState<Competitor[]>([
    { ...emptyCompetitor },
    { ...emptyCompetitor },
    { ...emptyCompetitor },
  ]);

  const updateCompetitor = (index: number, field: keyof Competitor, value: string | string[]) => {
    setCompetitors((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const toggleChannel = (index: number, channel: string) => {
    setCompetitors((prev) => {
      const next = [...prev];
      const channels = next[index].channels.includes(channel)
        ? next[index].channels.filter((c) => c !== channel)
        : [...next[index].channels, channel];
      next[index] = { ...next[index], channels };
      return next;
    });
  };

  const addCompetitor = () => {
    if (competitors.length < 6) {
      setCompetitors((prev) => [...prev, { ...emptyCompetitor }]);
    }
  };

  const filled = competitors.filter((c) => c.name.trim());
  const allChannels = [...new Set(filled.flatMap((c) => c.channels))];

  return (
    <article>
      <nav className="px-6 lg:px-12 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/resources" className="hover:text-black transition-colors">Resources</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">Competitor Analysis Worksheet</li>
        </ol>
      </nav>
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Competitor Analysis Worksheet
            </h1>
            <SectionDesc>
              Map out your competitive landscape. Fill in details for up to 6 competitors and see patterns in their strategy.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section aria-label="Competitor details" className="px-6 lg:px-12 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {competitors.map((comp, i) => (
            <Animate key={i} animation="fade-up" delay={i * 60}>
              <div className="border border-gray-200 overflow-hidden">
                <div className="bg-black text-white p-4">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                    Competitor {i + 1}{comp.name ? `: ${comp.name}` : ""}
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-base font-bold text-black mb-1">Company Name</label>
                      <input
                        type="text"
                        value={comp.name}
                        onChange={(e) => updateCompetitor(i, "name", e.target.value)}
                        placeholder="Competitor name"
                        className="w-full px-4 py-3 border border-gray-200 text-base focus-visible:border-black focus-visible:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-base font-bold text-black mb-1">Website</label>
                      <input
                        type="text"
                        value={comp.website}
                        onChange={(e) => updateCompetitor(i, "website", e.target.value)}
                        placeholder="competitor.com"
                        className="w-full px-4 py-3 border border-gray-200 text-base focus-visible:border-black focus-visible:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-base font-bold text-black mb-1">Strengths</label>
                      <textarea
                        value={comp.strengths}
                        onChange={(e) => updateCompetitor(i, "strengths", e.target.value)}
                        placeholder="What do they do well?"
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 text-base focus-visible:border-black focus-visible:outline-none resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-base font-bold text-black mb-1">Weaknesses</label>
                      <textarea
                        value={comp.weaknesses}
                        onChange={(e) => updateCompetitor(i, "weaknesses", e.target.value)}
                        placeholder="Where do they fall short?"
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 text-base focus-visible:border-black focus-visible:outline-none resize-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-base font-bold text-black mb-1">Pricing / Positioning</label>
                      <input
                        type="text"
                        value={comp.pricing}
                        onChange={(e) => updateCompetitor(i, "pricing", e.target.value)}
                        placeholder="e.g. Premium, Mid-range, Budget"
                        className="w-full px-4 py-3 border border-gray-200 text-base focus-visible:border-black focus-visible:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-base font-bold text-black mb-1">Target Audience</label>
                      <input
                        type="text"
                        value={comp.audience}
                        onChange={(e) => updateCompetitor(i, "audience", e.target.value)}
                        placeholder="e.g. Small businesses, Enterprise, B2C"
                        className="w-full px-4 py-3 border border-gray-200 text-base focus-visible:border-black focus-visible:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-base font-bold text-black mb-2">Marketing Channels Used</p>
                    <div className="flex flex-wrap gap-2">
                      {channelOptions.map((ch) => (
                        <button
                          key={ch}
                          onClick={() => toggleChannel(i, ch)}
                          className={`px-3 py-2 text-base transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                            comp.channels.includes(ch)
                              ? "bg-black text-white"
                              : "border border-gray-200 text-gray-500 hover:border-black"
                          }`}
                        >
                          {ch}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Animate>
          ))}

          {competitors.length < 6 && (
            <Animate animation="fade-up">
              <button
                onClick={addCompetitor}
                className="w-full py-4 border-2 border-dashed border-gray-300 text-base font-bold text-gray-400 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                + Add Competitor ({competitors.length}/6)
              </button>
            </Animate>
          )}
        </div>
      </section>

      {filled.length >= 2 && (
        <section aria-label="Competitive Landscape Summary" className="px-6 lg:px-12 pb-16">
          <div className="max-w-4xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                Competitive Landscape Summary
              </h2>

              <div className="overflow-x-auto mb-8">
                <table className="w-full text-base border-collapse">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="text-left p-3 font-bold">Competitor</th>
                      <th className="text-left p-3 font-bold">Positioning</th>
                      <th className="text-left p-3 font-bold">Target Audience</th>
                      <th className="text-center p-3 font-bold">Channels</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filled.map((c, i) => (
                      <tr key={i} className="border-b border-gray-200">
                        <td className="p-3 font-bold text-black">{c.name}</td>
                        <td className="p-3 text-gray-600">{c.pricing || "—"}</td>
                        <td className="p-3 text-gray-600">{c.audience || "—"}</td>
                        <td className="p-3 text-center text-gray-600">{c.channels.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {allChannels.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-bold text-black mb-3">Channel Overlap</h3>
                  <div className="space-y-2">
                    {allChannels.map((ch) => {
                      const count = filled.filter((c) => c.channels.includes(ch)).length;
                      const pct = Math.round((count / filled.length) * 100);
                      return (
                        <div key={ch}>
                          <div className="flex justify-between text-base mb-1">
                            <span className="text-gray-600">{ch}</span>
                            <span className="font-bold text-black">{count}/{filled.length} competitors</span>
                          </div>
                          <div className="w-full bg-gray-100 h-2">
                            <div className="bg-black h-2 transition-all motion-reduce:transition-none" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="p-6 bg-gray-50 border border-gray-200">
                <h3 className="font-bold text-black mb-3">Opportunities to Explore</h3>
                <ul className="space-y-2 text-base text-gray-500 leading-relaxed">
                  {allChannels.length > 0 && channelOptions
                    .filter((ch) => !allChannels.includes(ch))
                    .slice(0, 3)
                    .map((ch) => (
                      <li key={ch}>
                        <strong className="text-black">{ch}</strong> — None of your listed competitors are active here. This could be an opportunity to differentiate.
                      </li>
                    ))
                  }
                  {filled.some((c) => c.weaknesses) && (
                    <li>
                      <strong className="text-black">Competitor weaknesses:</strong> Address the gaps your competitors leave open — turn their weaknesses into your positioning strengths.
                    </li>
                  )}
                  <li>
                    <strong className="text-black">Regular updates:</strong> Revisit this analysis quarterly. Competitors evolve their strategy, and staying aware gives you a strategic advantage.
                  </li>
                </ul>
              </div>
            </Animate>
          </div>
        </section>
      )}

      <section aria-label="1. Identify your real competitors" className="px-6 lg:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              How to Do a Competitor Analysis
            </h2>
            <div className="space-y-6 text-base text-gray-500 leading-relaxed">
              <div>
                <h3 className="font-bold text-black mb-2">1. Identify your real competitors</h3>
                <p>Start with the businesses that compete for the same customers and keywords. Include both direct competitors (same product/service) and indirect ones (different approach, same audience).</p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">2. Analyze their online presence</h3>
                <p>Look at their website, social profiles, content strategy, and advertising. Use tools like Semrush or Ahrefs to see their organic keywords and backlink profiles.</p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">3. Map their strengths and weaknesses</h3>
                <p>What do they do well? Where do they fall short? Read their reviews, check their content quality, and look at how they position themselves in the market.</p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">4. Find gaps and opportunities</h3>
                <p>The most valuable insight from a competitive analysis is what your competitors are NOT doing. Unserved channels, audiences, or content topics are your biggest opportunities.</p>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Want a Professional Competitive Analysis?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our strategy team provides in-depth competitive research with actionable recommendations for your marketing plan.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Get a Competitive Analysis &rarr;
            </Link>
          </Animate>
        </div>
      </section>
          
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/competitor-benchmarking" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Competitor Benchmarking</Link>
                <Link href="/resources/competitor-matrix" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Competitor Matrix</Link>
                <Link href="/resources/competitor-pricing-tracker" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Competitor Pricing</Link>
                <Link href="/resources/competitive-gap" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Competitive Gap</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Competitor Analysis Framework — Map Your Market Landscape",
          description: "Use our free competitor analysis framework to systematically evaluate your competition. Map their channels, positioning, and strategies to find your competitive advantage.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Competitor Analysis"
        services={[
          { title: "Digital Marketing", desc: "Competitive intelligence turned into actionable growth strategy.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Outrank competitors with data-backed SEO strategies.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Win market share with smarter paid media campaigns.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Competitive Swot", href: "/resources/competitive-swot" },
          { title: "Competitive Swot Analyzer", href: "/resources/competitive-swot-analyzer" },
          { title: "Competitor Ad Spy", href: "/resources/competitor-ad-spy" },
          { title: "Competitor Benchmarking", href: "/resources/competitor-benchmarking" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
