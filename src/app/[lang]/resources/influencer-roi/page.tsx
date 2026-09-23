"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

function fmt(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function fmtMoney(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtPercent(n: number) {
  return n.toFixed(2) + "%";
}

function fmtDollar(n: number) {
  return "$" + n.toFixed(2);
}

type InfluencerTier = "nano" | "micro" | "mid" | "macro" | "mega";
type Platform = "instagram" | "tiktok" | "youtube" | "twitter" | "linkedin";
type CampaignType = "sponsored" | "story" | "review" | "giveaway" | "ambassador";

const TIER_LABELS: Record<InfluencerTier, string> = {
  nano: "Nano (1K–10K)",
  micro: "Micro (10K–50K)",
  mid: "Mid-Tier (50K–500K)",
  macro: "Macro (500K–1M)",
  mega: "Mega (1M+)",
};

const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  twitter: "Twitter / X",
  linkedin: "LinkedIn",
};

const CAMPAIGN_LABELS: Record<CampaignType, string> = {
  sponsored: "Sponsored Post",
  story: "Story / Reel",
  review: "Product Review",
  giveaway: "Giveaway",
  ambassador: "Brand Ambassador",
};

// Typical reach per influencer by tier (followers reached per post)
const TIER_REACH: Record<InfluencerTier, number> = {
  nano: 3500,
  micro: 18000,
  mid: 120000,
  macro: 450000,
  mega: 1500000,
};

// Typical engagement rates by tier (industry estimates — nano tends highest, mega lowest)
const TIER_ENGAGEMENT: Record<InfluencerTier, number> = {
  nano: 5.0,
  micro: 3.5,
  mid: 2.0,
  macro: 1.2,
  mega: 0.8,
};

// Platform-specific multipliers for reach
const PLATFORM_REACH_MULT: Record<Platform, number> = {
  instagram: 1.0,
  tiktok: 1.4,
  youtube: 0.8,
  twitter: 0.6,
  linkedin: 0.5,
};

// Platform-specific engagement multiplier
const PLATFORM_ENG_MULT: Record<Platform, number> = {
  instagram: 1.0,
  tiktok: 1.5,
  youtube: 1.2,
  twitter: 0.5,
  linkedin: 0.7,
};

// CTR benchmarks by platform (typical industry estimates)
const PLATFORM_CTR: Record<Platform, number> = {
  instagram: 0.9,
  tiktok: 1.2,
  youtube: 1.5,
  twitter: 0.6,
  linkedin: 0.8,
};

// Conversion rate from click by platform (typical industry estimates)
const PLATFORM_CVR: Record<Platform, number> = {
  instagram: 2.3,
  tiktok: 1.8,
  youtube: 2.8,
  twitter: 1.2,
  linkedin: 2.5,
};

// Campaign type multiplier on engagement
const CAMPAIGN_MULT: Record<CampaignType, number> = {
  sponsored: 1.0,
  story: 1.2,
  review: 1.3,
  giveaway: 1.6,
  ambassador: 1.1,
};

const BENCHMARK_DATA: {
  tier: string;
  engRate: string;
  cpe: string;
  reach: string;
}[] = [
  { tier: "Nano (1K–10K)", engRate: "4–8%", cpe: "$0.10–$0.50", reach: "1K–5K" },
  { tier: "Micro (10K–50K)", engRate: "2.5–5%", cpe: "$0.30–$1.00", reach: "5K–25K" },
  { tier: "Mid-Tier (50K–500K)", engRate: "1.5–3%", cpe: "$0.50–$2.00", reach: "20K–200K" },
  { tier: "Macro (500K–1M)", engRate: "0.8–1.5%", cpe: "$1.00–$5.00", reach: "100K–500K" },
  { tier: "Mega (1M+)", engRate: "0.5–1.0%", cpe: "$2.00–$10.00", reach: "300K–1.5M" },
];

const TIPS = [
  {
    title: "Match tier to your goals",
    desc: "Nano and micro influencers typically deliver higher engagement rates and more authentic audience connections. Larger tiers maximize reach but often at lower engagement per follower.",
  },
  {
    title: "Prioritize audience relevance over size",
    desc: "An influencer with 10K highly-relevant followers in your niche will typically outperform one with 500K followers in a general category. Relevance drives conversion, not follower count alone.",
  },
  {
    title: "Negotiate performance-based terms",
    desc: "Where possible, structure deals with a base fee plus performance bonuses tied to clicks, signups, or sales. This aligns incentives and can improve ROI for both parties.",
  },
  {
    title: "Repurpose influencer content",
    desc: "Licensed influencer content can be used in paid ads, email campaigns, and on your website. This extends the value of each partnership well beyond the initial post.",
  },
  {
    title: "Track with unique links and codes",
    desc: "Give each influencer a unique UTM link and discount code. This makes it straightforward to attribute sales accurately and compare performance across creators.",
  },
  {
    title: "Build long-term relationships",
    desc: "Ongoing brand ambassadorships tend to outperform one-off posts. Repeated exposure builds trust with the influencer’s audience and typically improves conversion rates over time.",
  },
];

const CROSS_LINKS = [
  {
    href: "/resources/social-media-roi",
    label: "Social Media ROI Calculator",
    desc: "Measure the return on your overall social media investment.",
  },
  {
    href: "/resources/social-media-planner",
    label: "Social Media Planner",
    desc: "Plan and organize your social media content calendar.",
  },
  {
    href: "/resources/content-roi-calculator",
    label: "Content ROI Calculator",
    desc: "Calculate the return on your content marketing efforts.",
  },
];

export default function InfluencerRoiPage() {
  const [budget, setBudget] = useState(5000);
  const [numInfluencers, setNumInfluencers] = useState(5);
  const [tier, setTier] = useState<InfluencerTier>("micro");
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [campaignType, setCampaignType] = useState<CampaignType>("sponsored");
  const [productPrice, setProductPrice] = useState("50");

  const price = Math.max(0, parseFloat(productPrice) || 0);

  const results = useMemo(() => {
    const baseReach = TIER_REACH[tier];
    const platformMult = PLATFORM_REACH_MULT[platform];
    const reachPerInfluencer = Math.round(baseReach * platformMult);

    const baseEngRate = TIER_ENGAGEMENT[tier];
    const engMult = PLATFORM_ENG_MULT[platform] * CAMPAIGN_MULT[campaignType];
    const engagementRate = baseEngRate * engMult;

    const totalImpressions = reachPerInfluencer * numInfluencers;
    const totalEngagements = Math.round(totalImpressions * (engagementRate / 100));

    const ctr = PLATFORM_CTR[platform] / 100;
    const estimatedClicks = Math.round(totalImpressions * ctr);

    const cvr = PLATFORM_CVR[platform] / 100;
    const estimatedConversions = Math.round(estimatedClicks * cvr);

    const estimatedRevenue = estimatedConversions * price;
    const roiPercent = budget > 0 ? ((estimatedRevenue - budget) / budget) * 100 : 0;
    const cpe = totalEngagements > 0 ? budget / totalEngagements : 0;
    const cpa = estimatedConversions > 0 ? budget / estimatedConversions : 0;

    return {
      reachPerInfluencer,
      engagementRate,
      totalImpressions,
      totalEngagements,
      estimatedClicks,
      estimatedConversions,
      estimatedRevenue,
      roiPercent,
      cpe,
      cpa,
    };
  }, [budget, numInfluencers, tier, platform, campaignType, price]);

  const selectClass =
    "w-full px-4 py-3 border-2 border-gray-200 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus-visible:border-black transition-colors motion-reduce:transition-none min-h-[44px] appearance-none";

  const inputClass =
    "w-full px-4 py-3 border-2 border-gray-200 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus-visible:border-black transition-colors motion-reduce:transition-none min-h-[44px]";

  return (
    <article className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Influencer Marketing ROI Calculator",
          description: "Estimate the ROI of influencer marketing campaigns. Calculate projected reach, engagement, conversions, and return based on influencer tier, platform, and campaign type.",
          url: "https://themarkitmedia.com/en/resources/influencer-roi",
          applicationCategory: "Business Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Influencer Marketing ROI Calculator",
          description:
            "Estimate the ROI of influencer marketing campaigns. Calculate projected reach, engagement, conversions, and return based on influencer tier, platform, and campaign type.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: {
            "@type": "Organization",
            name: "Markit Media",
            url: "https://themarkitmedia.com",
          },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Influencer ROI Calculator" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Influencer Marketing ROI Calculator
            </h1>
            <SectionDesc>
              Estimate the return on your influencer marketing campaigns. Select
              your budget, influencer tier, platform, and campaign type to see
              projected reach, engagement, conversions, and ROI.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Calculator */}
      <section aria-label="Campaign Details" className="px-6 lg:px-12 pb-16">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-8">
              Campaign Details
            </h2>

            {/* Budget slider */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <label
                htmlFor="budget"
                className="block text-base font-bold text-black mb-1"
              >
                Campaign Budget
              </label>
              <p className="text-base text-gray-500 mb-3">
                Total budget for influencer partnerships
              </p>
              <div className="flex items-center gap-4">
                <input
                  id="budget"
                  type="range"
                  min={500}
                  max={50000}
                  step={500}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="flex-1 accent-black h-2 min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                />
                <span className="w-28 text-base font-bold text-black text-right shrink-0">
                  {fmtMoney(budget)}
                </span>
              </div>
              <div className="flex justify-between text-base text-gray-400 mt-1">
                <span>$500</span>
                <span>$50,000</span>
              </div>
            </div>

            {/* Number of influencers slider */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <label
                htmlFor="num-influencers"
                className="block text-base font-bold text-black mb-1"
              >
                Number of Influencers
              </label>
              <p className="text-base text-gray-500 mb-3">
                How many influencers you plan to work with
              </p>
              <div className="flex items-center gap-4">
                <input
                  id="num-influencers"
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={numInfluencers}
                  onChange={(e) => setNumInfluencers(Number(e.target.value))}
                  className="flex-1 accent-black h-2 min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                />
                <span className="w-12 text-base font-bold text-black text-right shrink-0">
                  {numInfluencers}
                </span>
              </div>
              <div className="flex justify-between text-base text-gray-400 mt-1">
                <span>1</span>
                <span>20</span>
              </div>
            </div>

            {/* Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-200">
              <div>
                <label
                  htmlFor="tier"
                  className="block text-base font-bold text-black mb-1"
                >
                  Influencer Tier
                </label>
                <p className="text-base text-gray-500 mb-3">
                  Follower count range
                </p>
                <select
                  id="tier"
                  value={tier}
                  onChange={(e) => setTier(e.target.value as InfluencerTier)}
                  className={selectClass}
                >
                  {(Object.keys(TIER_LABELS) as InfluencerTier[]).map((t) => (
                    <option key={t} value={t}>
                      {TIER_LABELS[t]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="platform"
                  className="block text-base font-bold text-black mb-1"
                >
                  Platform
                </label>
                <p className="text-base text-gray-500 mb-3">
                  Primary social platform
                </p>
                <select
                  id="platform"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as Platform)}
                  className={selectClass}
                >
                  {(Object.keys(PLATFORM_LABELS) as Platform[]).map((p) => (
                    <option key={p} value={p}>
                      {PLATFORM_LABELS[p]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="campaign-type"
                  className="block text-base font-bold text-black mb-1"
                >
                  Campaign Type
                </label>
                <p className="text-base text-gray-500 mb-3">
                  Content format
                </p>
                <select
                  id="campaign-type"
                  value={campaignType}
                  onChange={(e) => setCampaignType(e.target.value as CampaignType)}
                  className={selectClass}
                >
                  {(Object.keys(CAMPAIGN_LABELS) as CampaignType[]).map((c) => (
                    <option key={c} value={c}>
                      {CAMPAIGN_LABELS[c]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product price */}
            <div className="mb-8">
              <label
                htmlFor="product-price"
                className="block text-base font-bold text-black mb-1"
              >
                Average Product Price ($)
              </label>
              <p className="text-base text-gray-500 mb-3">
                Used to estimate conversion revenue
              </p>
              <input
                id="product-price"
                type="number"
                min={0}
                step={1}
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className={`${inputClass} max-w-xs`}
              />
            </div>
          </Animate>

          {/* Results */}
          <Animate animation="fade-up">
            <div className="mt-12 space-y-8">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                Projected Results
              </h2>

              {/* Primary metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    label: "Estimated Revenue",
                    value: fmtMoney(results.estimatedRevenue),
                    sub: `${fmt(results.estimatedConversions)} conversions at ${fmtMoney(price)} avg`,
                  },
                  {
                    label: "ROI",
                    value: results.roiPercent >= 0 ? "+" + fmtPercent(results.roiPercent) : fmtPercent(results.roiPercent),
                    sub: results.roiPercent >= 0 ? "Positive return" : "Negative return",
                  },
                  {
                    label: "Total Impressions",
                    value: fmt(results.totalImpressions),
                    sub: `${fmt(results.reachPerInfluencer)} reach per influencer`,
                  },
                ].map((m) => (
                  <div key={m.label} className="p-6 border-2 border-black text-center">
                    <div className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-black">
                      {m.value}
                    </div>
                    <div className="text-base font-bold text-black mt-1">{m.label}</div>
                    <div className="text-base text-gray-400 mt-1">{m.sub}</div>
                  </div>
                ))}
              </div>

              {/* Secondary metrics */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: "Engagement Rate", value: fmtPercent(results.engagementRate) },
                  { label: "Total Engagements", value: fmt(results.totalEngagements) },
                  { label: "Estimated Clicks", value: fmt(results.estimatedClicks) },
                  { label: "Estimated Conversions", value: fmt(results.estimatedConversions) },
                  { label: "Cost Per Engagement", value: fmtDollar(results.cpe) },
                  { label: "Cost Per Acquisition", value: fmtDollar(results.cpa) },
                ].map((m) => (
                  <div key={m.label} className="p-5 border border-gray-200 text-center">
                    <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                      {m.value}
                    </div>
                    <div className="text-base text-gray-500 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="p-6 bg-gray-50 border border-gray-200">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                  Campaign Breakdown
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-base">
                  <div>
                    <span className="text-gray-400">Budget:</span>{" "}
                    <span className="font-bold text-black">{fmtMoney(budget)}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Per influencer:</span>{" "}
                    <span className="font-bold text-black">
                      {fmtMoney(numInfluencers > 0 ? budget / numInfluencers : 0)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Influencers:</span>{" "}
                    <span className="font-bold text-black">{numInfluencers}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Tier:</span>{" "}
                    <span className="font-bold text-black">{TIER_LABELS[tier]}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Platform:</span>{" "}
                    <span className="font-bold text-black">{PLATFORM_LABELS[platform]}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Campaign type:</span>{" "}
                    <span className="font-bold text-black">{CAMPAIGN_LABELS[campaignType]}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 border-l-4 border-black bg-gray-50">
                <p className="text-base text-gray-600 leading-relaxed">
                  <strong>Note:</strong> These projections are typical industry
                  estimates based on aggregated campaign data. Actual results
                  depend on influencer audience quality, content relevance,
                  product-market fit, and campaign execution. Use these numbers
                  as directional guidance for planning.
                </p>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* Benchmarks by Tier */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Influencer tier benchmarks">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
              Benchmarks by Influencer Tier
            </h2>
            <p className="text-base text-gray-500 mb-8">
              Typical performance ranges across influencer tiers. These are
              industry estimates and vary by niche, platform, and content quality.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-base">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="text-left py-3 pr-4 font-bold text-black">
                      Influencer Tier
                    </th>
                    <th className="text-right py-3 px-4 font-bold text-black">
                      Engagement Rate
                    </th>
                    <th className="text-right py-3 px-4 font-bold text-black">
                      Cost Per Engagement
                    </th>
                    <th className="text-right py-3 pl-4 font-bold text-black">
                      Typical Reach
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {BENCHMARK_DATA.map((b) => (
                    <tr key={b.tier} className="border-b border-gray-200">
                      <td className="py-3 pr-4 font-bold text-black">{b.tier}</td>
                      <td className="py-3 px-4 text-right text-gray-600">{b.engRate}</td>
                      <td className="py-3 px-4 text-right text-gray-600">{b.cpe}</td>
                      <td className="py-3 pl-4 text-right text-gray-600">{b.reach}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-base text-gray-400 mt-4">
              Source: aggregated industry reports. Ranges represent typical
              performance and will differ by vertical.
            </p>
          </Animate>
        </div>
      </section>

      {/* Tips */}
      <section className="px-6 lg:px-12 py-20" aria-label="Tips for maximizing ROI">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-8">
              Tips for Maximizing Influencer ROI
            </h2>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TIPS.map((tip) => (
              <div key={tip.title} className="p-5 border border-gray-200">
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black mb-2">
                  {tip.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Cross-links */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-8">
              Related Tools
            </h2>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CROSS_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block p-6 border border-gray-200 bg-white hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
              >
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black mb-2">
                  {link.label}
                </h3>
                <p className="text-base text-gray-500">{link.desc}</p>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Launch an Influencer Campaign?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team helps brands find the right influencers, negotiate
              partnerships, and build campaigns that deliver measurable results.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
            >
              Talk to Our Team &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Influencer Roi"
        services={[
          { title: "Digital Marketing", desc: "Data-driven strategy with transparent reporting and insights.", href: "/services/digital-marketing" },
          { title: "Performance Marketing", desc: "Campaign optimization based on real performance data.", href: "/services/performance-marketing" },
          { title: "SEO", desc: "SEO analytics that show exactly what drives organic growth.", href: "/services/seo" },
        ]}
        relatedTools={[
          { title: "Kpi Builder", href: "/resources/kpi-builder" },
          { title: "Kpi Dashboard", href: "/resources/kpi-dashboard" },
          { title: "Google Ads Estimator", href: "/resources/google-ads-estimator" },
          { title: "Hashtag Generator", href: "/resources/hashtag-generator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
