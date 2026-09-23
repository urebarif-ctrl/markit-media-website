"use client";

import { useState } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

const INDUSTRY_BENCHMARKS: Record<string, { avgCpa: number; avgRoas: number }> = {
  "E-commerce": { avgCpa: 45, avgRoas: 4.0 },
  "B2B SaaS": { avgCpa: 120, avgRoas: 3.0 },
  "Healthcare": { avgCpa: 78, avgRoas: 3.5 },
  "Professional Services": { avgCpa: 95, avgRoas: 3.2 },
  "Real Estate": { avgCpa: 110, avgRoas: 2.8 },
  "Education": { avgCpa: 65, avgRoas: 3.8 },
  "Finance": { avgCpa: 85, avgRoas: 3.5 },
  "Other": { avgCpa: 80, avgRoas: 3.0 },
};

const TARGET_ROAS_OPTIONS = [2, 3, 4, 5, 8, 10];

const PLATFORM_OPTIONS = [
  "Google Ads",
  "Meta Ads",
  "LinkedIn Ads",
  "TikTok Ads",
  "Multiple Platforms",
];

const INDUSTRY_OPTIONS = Object.keys(INDUSTRY_BENCHMARKS);



export default function AdSpendCalculatorPage() {
  const [monthlySpend, setMonthlySpend] = useState("");
  const [monthlyConversions, setMonthlyConversions] = useState("");
  const [avgOrderValue, setAvgOrderValue] = useState("");
  const [targetRoas, setTargetRoas] = useState(3);
  const [currentPlatform, setCurrentPlatform] = useState("Google Ads");
  const [industry, setIndustry] = useState("E-commerce");
  const [calculated, setCalculated] = useState(false);

  const spend = Number(monthlySpend) || 0;
  const conversions = Number(monthlyConversions) || 0;
  const orderValue = Number(avgOrderValue) || 0;

  const cpa = conversions > 0 ? spend / conversions : 0;
  const revenuePerConversion = orderValue;
  const monthlyRevenue = conversions * orderValue;
  const currentRoas = spend > 0 ? monthlyRevenue / spend : 0;
  const profit = monthlyRevenue - spend;

  const benchmark = INDUSTRY_BENCHMARKS[industry];
  const efficiencyScore =
    currentRoas > 0 && targetRoas > 0
      ? Math.min(Math.round((currentRoas / targetRoas) * 100), 150)
      : 0;

  const roasDiff = currentRoas - targetRoas;
  const isBelowTarget = roasDiff < 0;

  const conversionsNeededForTarget =
    spend > 0 && orderValue > 0 ? Math.ceil((spend * targetRoas) / orderValue) : 0;
  const spendNeededForTarget =
    currentRoas > 0 ? Math.round(monthlyRevenue / targetRoas) : 0;

  const cpaReduction20 = cpa * 0.2;
  const monthlySavingsFrom20CpaReduction =
    conversions > 0 ? Math.round(cpaReduction20 * conversions) : 0;

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);

  const handleCalculate = () => {
    if (spend > 0 && conversions > 0 && orderValue > 0) {
      setCalculated(true);
    }
  };

  const handleReset = () => {
    setMonthlySpend("");
    setMonthlyConversions("");
    setAvgOrderValue("");
    setTargetRoas(3);
    setCurrentPlatform("Google Ads");
    setIndustry("E-commerce");
    setCalculated(false);
  };

  const inputClasses =
    "w-full border border-gray-300 bg-white text-black px-4 py-3 text-base min-h-[44px] focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none";

  const selectClasses =
    "w-full border border-gray-300 bg-white text-black px-4 py-3 text-base min-h-[44px] appearance-none focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none";

  return (
    <article className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Ad Spend Efficiency Calculator",
          description: "Use our free ad spend calculator to analyze your advertising efficiency across platforms. Calculate CPA, ROAS, and identify where your budget delivers the best returns.",
          url: "https://themarkitmedia.com/en/resources/ad-spend-calculator",
          applicationCategory: "Business Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Ad Spend Efficiency Calculator | Free Marketing Tool — Markit Media</title>
      <link rel="canonical" href="https://themarkitmedia.com/en/resources/ad-spend-calculator" />
      <meta name="description" content="Use our free ad spend calculator to analyze your advertising efficiency across platforms. Calculate CPA, ROAS, and identify where your budget delivers the be..." />
      <nav className="px-6 lg:px-12 pt-20" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-gray-400 max-w-7xl mx-auto">
          <li>
            <Link
              href="/"
              className="hover:text-black transition-colors motion-reduce:transition-none"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/resources"
              className="hover:text-black transition-colors motion-reduce:transition-none"
            >
              Resources
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-black font-medium">Ad Spend Calculator</li>
        </ol>
      </nav>

      <section aria-label="Ad Spend Efficiency Calculator" className="px-6 lg:px-12 pt-16 pb-8">
        <div className="max-w-4xl mx-auto">
          <span className="text-base font-medium text-gray-400 uppercase tracking-[0.15em]">
            Interactive Tools
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
            Ad Spend Efficiency Calculator
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
            Evaluate your current ad spend efficiency and identify optimization
            opportunities. Enter your numbers below to get a full breakdown of
            your performance against industry benchmarks.
          </p>
          <p className="text-base text-gray-400 mt-2">
            Note: Benchmarks are approximate industry averages. Actual
            performance varies by targeting, creative quality, and market
            conditions.
          </p>
        </div>
      </section>

      <section aria-label="Your Ad Spend Details" className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Inputs */}
          <div className="space-y-6">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
              Your Ad Spend Details
            </h2>

            <div>
              <label
                htmlFor="monthlySpend"
                className="block text-base font-bold text-black mb-2"
              >
                Monthly Ad Spend ($)
              </label>
              <input
                id="monthlySpend"
                type="number"
                min={0}
                placeholder="e.g. 5000"
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(e.target.value)}
                className={inputClasses}
              />
            </div>

            <div>
              <label
                htmlFor="monthlyConversions"
                className="block text-base font-bold text-black mb-2"
              >
                Monthly Conversions
              </label>
              <input
                id="monthlyConversions"
                type="number"
                min={0}
                placeholder="e.g. 100"
                value={monthlyConversions}
                onChange={(e) => setMonthlyConversions(e.target.value)}
                className={inputClasses}
              />
            </div>

            <div>
              <label
                htmlFor="avgOrderValue"
                className="block text-base font-bold text-black mb-2"
              >
                Average Order Value ($)
              </label>
              <input
                id="avgOrderValue"
                type="number"
                min={0}
                placeholder="e.g. 150"
                value={avgOrderValue}
                onChange={(e) => setAvgOrderValue(e.target.value)}
                className={inputClasses}
              />
            </div>

            <div>
              <label
                htmlFor="targetRoas"
                className="block text-base font-bold text-black mb-2"
              >
                Target ROAS
              </label>
              <select
                id="targetRoas"
                value={targetRoas}
                onChange={(e) => setTargetRoas(Number(e.target.value))}
                className={selectClasses}
              >
                {TARGET_ROAS_OPTIONS.map((val) => (
                  <option key={val} value={val}>
                    {val}x
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="currentPlatform"
                className="block text-base font-bold text-black mb-2"
              >
                Current Platform
              </label>
              <select
                id="currentPlatform"
                value={currentPlatform}
                onChange={(e) => setCurrentPlatform(e.target.value)}
                className={selectClasses}
              >
                {PLATFORM_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="industry"
                className="block text-base font-bold text-black mb-2"
              >
                Industry
              </label>
              <select
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className={selectClasses}
              >
                {INDUSTRY_OPTIONS.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={handleCalculate}
                disabled={spend <= 0 || conversions <= 0 || orderValue <= 0}
                className="flex-1 bg-black text-white px-8 py-4 font-bold text-base min-h-[44px] hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Calculate
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-4 font-bold text-base min-h-[44px] border border-black text-black bg-white hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results */}
          <div>
            {!calculated ? (
              <div className="flex items-center justify-center h-full min-h-[300px] border border-gray-200 bg-gray-50">
                <p className="text-base text-gray-400 text-center px-8">
                  Enter your ad spend details and click Calculate to see your
                  efficiency analysis.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Current Metrics Dashboard */}
                <div>
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                    Current Metrics
                  </h2>
                  <div className="bg-gray-50 border border-gray-200 p-6 space-y-0">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-base text-gray-600">
                        Cost Per Conversion (CPA)
                      </span>
                      <span className="text-base font-bold text-black">
                        {formatCurrency(cpa)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-base text-gray-600">
                        Revenue Per Conversion
                      </span>
                      <span className="text-base font-bold text-black">
                        {formatCurrency(revenuePerConversion)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-base text-gray-600">
                        Current ROAS
                      </span>
                      <span className="text-base font-bold text-black">
                        {currentRoas.toFixed(2)}x
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-base text-gray-600">
                        Monthly Revenue from Ads
                      </span>
                      <span className="text-base font-bold text-black">
                        {formatCurrency(monthlyRevenue)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-base text-gray-600">
                        Profit (Revenue - Ad Spend)
                      </span>
                      <span
                        className={`text-lg font-extrabold ${profit >= 0 ? "text-black" : "text-black"}`}
                      >
                        {formatCurrency(profit)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Efficiency Analysis */}
                <div>
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                    Efficiency Analysis
                  </h2>
                  <div className="bg-gray-50 border border-gray-200 p-6 space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-base text-gray-600">
                          Your ROAS vs Target
                        </span>
                        <span className="text-base font-bold text-black">
                          {currentRoas.toFixed(2)}x / {targetRoas}x
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 h-3">
                        <div
                          className="bg-black h-3 transition-all motion-reduce:transition-none"
                          style={{
                            width: `${Math.min((currentRoas / targetRoas) * 100, 100)}%`,
                          }}
                        />
                      </div>
                      <p className="text-base text-gray-500 mt-1">
                        {isBelowTarget
                          ? `${Math.abs(roasDiff).toFixed(2)}x below your target`
                          : `${roasDiff.toFixed(2)}x above your target`}
                      </p>
                    </div>

                    <div className="flex justify-between items-center py-3 border-t border-gray-200">
                      <span className="text-base text-gray-600">
                        Industry Avg ROAS ({industry})
                      </span>
                      <span className="text-base font-bold text-black">
                        {benchmark.avgRoas.toFixed(1)}x
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-t border-gray-200">
                      <span className="text-base text-gray-600">
                        Industry Avg CPA ({industry})
                      </span>
                      <span className="text-base font-bold text-black">
                        {formatCurrency(benchmark.avgCpa)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-4 bg-black text-white px-6 -mx-6 -mb-6">
                      <span className="text-base font-bold">
                        Efficiency Score
                      </span>
                      <span className="text-2xl font-extrabold">
                        {efficiencyScore}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Optimization Opportunities */}
                <div>
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                    Optimization Opportunities
                  </h2>
                  <div className="bg-gray-50 border border-gray-200 p-6 space-y-4">
                    {isBelowTarget && (
                      <div className="space-y-3">
                        <p className="text-base font-bold text-black">
                          Your ROAS is below target. Consider these actions:
                        </p>
                        <ul className="space-y-2 text-base text-gray-600 list-none">
                          <li className="pl-4 border-l-2 border-black">
                            Reduce your CPA by refining audience targeting and
                            improving ad relevance scores
                          </li>
                          <li className="pl-4 border-l-2 border-black">
                            Increase average conversion value through upsells,
                            bundles, or pricing adjustments
                          </li>
                          <li className="pl-4 border-l-2 border-black">
                            Review targeting criteria and eliminate
                            low-performing segments or placements
                          </li>
                        </ul>
                      </div>
                    )}

                    {!isBelowTarget && (
                      <p className="text-base text-gray-600">
                        Your ROAS exceeds your target. Consider scaling your
                        budget to capture more conversions while maintaining
                        efficiency.
                      </p>
                    )}

                    <div className="border-t border-gray-200 pt-4 space-y-3">
                      <p className="text-base font-bold text-black">
                        Budget Reallocation
                      </p>
                      <p className="text-base text-gray-600">
                        To hit your {targetRoas}x ROAS target, you would need to
                        either increase conversions to{" "}
                        <span className="font-bold text-black">
                          {conversionsNeededForTarget.toLocaleString()}
                        </span>{" "}
                        or reduce spend to{" "}
                        <span className="font-bold text-black">
                          {formatCurrency(spendNeededForTarget)}
                        </span>
                        .
                      </p>
                    </div>

                    <div className="border-t border-gray-200 pt-4 space-y-3">
                      <p className="text-base font-bold text-black">
                        Projected Improvements
                      </p>
                      <p className="text-base text-gray-600">
                        A 20% CPA reduction would save{" "}
                        <span className="font-bold text-black">
                          {formatCurrency(monthlySavingsFrom20CpaReduction)}
                        </span>
                        /month while maintaining the same conversion volume.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Benchmark Table */}
                <div>
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                    Industry Benchmarks
                  </h2>
                  <div className="border border-gray-200 overflow-x-auto">
                    <table className="w-full text-base">
                      <thead>
                        <tr className="bg-black text-white">
                          <th className="text-left px-4 py-3 font-bold">
                            Industry
                          </th>
                          <th className="text-right px-4 py-3 font-bold">
                            Avg CPA
                          </th>
                          <th className="text-right px-4 py-3 font-bold">
                            Avg ROAS
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {INDUSTRY_OPTIONS.map((ind) => {
                          const b = INDUSTRY_BENCHMARKS[ind];
                          const isSelected = ind === industry;
                          return (
                            <tr
                              key={ind}
                              className={
                                isSelected
                                  ? "bg-gray-100 font-bold"
                                  : "border-t border-gray-200"
                              }
                            >
                              <td className="px-4 py-3 text-black">
                                {ind}
                                {isSelected && (
                                  <span className="ml-2 text-neutral-500 font-normal text-base">
                                    (your industry)
                                  </span>
                                )}
                              </td>
                              <td className="text-right px-4 py-3 text-black">
                                {formatCurrency(b.avgCpa)}
                              </td>
                              <td className="text-right px-4 py-3 text-black">
                                {b.avgRoas.toFixed(1)}x
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/ad-copy-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Ad Copy Generator</Link>
                <Link href="/resources/ad-copy-analyzer" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Ad Copy Analyzer</Link>
                <Link href="/resources/ad-budget-pacing" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Ad Budget Pacing</Link>
                <Link href="/resources/google-ads-estimator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Google Ads Estimator</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
                <div>
                  <Link
                    href="/get-a-quote"
                    className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none w-full justify-center min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    Get a Custom Ad Spend Analysis &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section aria-label="How We Optimize Ad Spend" className="px-6 lg:px-12 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
            How We Optimize Ad Spend
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Smarter Targeting",
                desc: "Data-driven audience segmentation and bid strategies that put your budget where it converts.",
                href: "/services/performance-marketing",
              },
              {
                title: "Conversion Rate Optimization",
                desc: "Landing page improvements and A/B testing that turn more clicks into paying customers.",
                href: "/services/website-development",
              },
              {
                title: "Full-Funnel Attribution",
                desc: "Clear reporting on what drives revenue so you can double down on what works.",
                href: "/services/seo",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-white border border-gray-200 hover:border-black/30 transition-all motion-reduce:transition-none p-6 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black group-hover:underline mb-2">
                  {item.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Ad Spend Calculator — Analyze CPA & ROAS Efficiency",
          description: "Use our free ad spend calculator to analyze your advertising efficiency across platforms. Calculate CPA, ROAS, and identify where your budget delivers the best returns.",
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
                <Link href="/resources/ad-copy-analyzer" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Ad Copy Analyzer</Link>
                <Link href="/resources/ad-budget-pacing" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Ad Budget Pacing</Link>
                <Link href="/resources/google-ads-estimator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Google Ads Estimator</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Need Expert Help?" className="bg-black text-white px-6 lg:px-12 py-16 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold mb-4">Need Expert Help?</h2>
        <p className="text-base text-neutral-300 mb-8 max-w-2xl mx-auto">Our team can help you implement these insights and drive measurable results for your business.</p>
        <Link href="/contact" className="inline-block bg-white text-black font-bold px-8 py-3 text-base hover:bg-neutral-200 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Get in Touch</Link>
      </section>
    
      <ToolCTA
        toolName="Ad Spend Calculator"
        services={[
          { title: "Performance Marketing", desc: "Google Ads, Meta Ads, and PPC campaigns that maximize ROAS.", href: "/services/performance-marketing" },
          { title: "Digital Marketing", desc: "Integrated strategy across all channels for measurable growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Complement paid with organic — reduce dependency on ad spend over time.", href: "/services/seo" },
        ]}
        relatedTools={[
          { title: "Ad Budget Pacing", href: "/resources/ad-budget-pacing" },
          { title: "Ad Copy Analyzer", href: "/resources/ad-copy-analyzer" },
          { title: "Ad Copy Generator", href: "/resources/ad-copy-generator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
