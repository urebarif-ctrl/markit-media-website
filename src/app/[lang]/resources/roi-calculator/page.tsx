"use client";

import { useState } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";



export default function ROICalculatorPage() {
  const [monthlyBudget, setMonthlyBudget] = useState(5000);
  const [avgDealValue, setAvgDealValue] = useState(2000);
  const [currentLeadsPerMonth, setCurrentLeadsPerMonth] = useState(20);
  const [closeRate, setCloseRate] = useState(20);

  const projectedLeadIncrease = 0.4;
  const projectedNewLeads = Math.round(currentLeadsPerMonth * (1 + projectedLeadIncrease));
  const additionalLeads = projectedNewLeads - currentLeadsPerMonth;
  const additionalDeals = Math.round(additionalLeads * (closeRate / 100));
  const additionalRevenue = additionalDeals * avgDealValue;
  const annualAdditionalRevenue = additionalRevenue * 12;
  const annualInvestment = monthlyBudget * 12;
  const roi = annualInvestment > 0 ? Math.round(((annualAdditionalRevenue - annualInvestment) / annualInvestment) * 100) : 0;

  const formatCurrency = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  return (
    <article className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing ROI Calculator",
          description: "Calculate your marketing ROI by projecting lead increases and revenue from your investment with this free calculator. Make data-driven budget decisions.",
          url: "https://themarkitmedia.com/en/resources/roi-calculator",
          applicationCategory: "Business Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Marketing ROI Calculator | Free Marketing Tool — Markit Media</title>
      <link rel="canonical" href="https://themarkitmedia.com/en/resources/roi-calculator" />
      <meta name="description" content="Calculate your marketing ROI by projecting lead increases and revenue from your investment with this free calculator. Make data-driven budget decisions." />
      <nav className="px-6 lg:px-12 pt-20" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-gray-400 max-w-7xl mx-auto">
          <li><Link href="/" className="hover:text-black transition-colors motion-reduce:transition-none">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/resources" className="hover:text-black transition-colors motion-reduce:transition-none">Resources</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-black font-medium">ROI Calculator</li>
        </ol>
      </nav>

      <section aria-label="Marketing ROI Calculator" className="px-6 lg:px-12 pt-16 pb-8">
        <div className="max-w-4xl mx-auto">
          <span className="text-base font-medium text-gray-400 uppercase tracking-[0.15em]">Interactive Tools</span>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
            Marketing ROI Calculator
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
            Estimate the potential return on your digital marketing investment.
            Adjust the inputs below to see projected results based on industry benchmarks.
          </p>
          <p className="text-base text-gray-400 mt-2">
            Note: These are estimates based on typical improvements. Actual results vary by industry, competition, and execution.
          </p>
        </div>
      </section>

      <section aria-label="Your Numbers" className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Inputs */}
          <div className="space-y-8">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">Your Numbers</h2>

            <div>
              <label htmlFor="budget" className="block text-base font-bold text-black mb-2">
                Monthly Marketing Budget
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="budget"
                  type="range"
                  min={1000}
                  max={50000}
                  step={500}
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                  className="flex-1 accent-black h-2"
                />
                <span className="text-base font-bold text-black w-24 text-right">{formatCurrency(monthlyBudget)}</span>
              </div>
            </div>

            <div>
              <label htmlFor="dealValue" className="block text-base font-bold text-black mb-2">
                Average Deal/Order Value
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="dealValue"
                  type="range"
                  min={100}
                  max={50000}
                  step={100}
                  value={avgDealValue}
                  onChange={(e) => setAvgDealValue(Number(e.target.value))}
                  className="flex-1 accent-black h-2"
                />
                <span className="text-base font-bold text-black w-24 text-right">{formatCurrency(avgDealValue)}</span>
              </div>
            </div>

            <div>
              <label htmlFor="leads" className="block text-base font-bold text-black mb-2">
                Current Leads per Month
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="leads"
                  type="range"
                  min={5}
                  max={500}
                  step={5}
                  value={currentLeadsPerMonth}
                  onChange={(e) => setCurrentLeadsPerMonth(Number(e.target.value))}
                  className="flex-1 accent-black h-2"
                />
                <span className="text-base font-bold text-black w-24 text-right">{currentLeadsPerMonth}</span>
              </div>
            </div>

            <div>
              <label htmlFor="closeRate" className="block text-base font-bold text-black mb-2">
                Close Rate (%)
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="closeRate"
                  type="range"
                  min={5}
                  max={80}
                  step={5}
                  value={closeRate}
                  onChange={(e) => setCloseRate(Number(e.target.value))}
                  className="flex-1 accent-black h-2"
                />
                <span className="text-base font-bold text-black w-24 text-right">{closeRate}%</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">Projected Results</h2>
            <div className="bg-gray-50 border border-gray-200 p-8 space-y-6">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-base text-gray-600">Projected monthly leads</span>
                <span className="text-base font-bold text-black">{projectedNewLeads} (+{additionalLeads})</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-base text-gray-600">Additional deals/month</span>
                <span className="text-base font-bold text-black">{additionalDeals}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-base text-gray-600">Additional revenue/month</span>
                <span className="text-base font-bold text-black">{formatCurrency(additionalRevenue)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-base text-gray-600">Annual additional revenue</span>
                <span className="text-lg font-extrabold text-black">{formatCurrency(annualAdditionalRevenue)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-base text-gray-600">Annual investment</span>
                <span className="text-base font-bold text-gray-500">{formatCurrency(annualInvestment)}</span>
              </div>
              <div className="flex justify-between items-center py-4 bg-black text-white px-6 -mx-8 -mb-8">
                <span className="text-base font-bold">Estimated ROI</span>
                <span className="text-2xl font-extrabold">{roi}%</span>
              </div>
            </div>

            <p className="text-base text-gray-400 mt-4 leading-relaxed">
              Based on a conservative 40% lead increase from optimized digital marketing.
              Actual results depend on industry, competition, website quality, and sales process.
            </p>

            <div className="mt-8">
              <Link href="/get-a-quote" className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none w-full justify-center focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                Get a Custom Projection &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing ROI Calculator — Project Your Revenue Growth",
          description: "Calculate your marketing ROI by projecting lead increases and revenue from your investment with this free calculator. Make data-driven budget decisions.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <ToolCTA
        toolName="ROI Calculator"
        services={[
          { title: "Performance Marketing", desc: "Google Ads, Meta Ads, and PPC campaigns that maximize your return on ad spend.", href: "/services/performance-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic growth over time.", href: "/services/seo" },
          { title: "Digital Marketing", desc: "Full-stack marketing strategy, analytics, and optimization to hit your revenue targets.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
          { title: "ROI Dashboard", href: "/resources/roi-dashboard" },
          { title: "ROI Forecaster", href: "/resources/roi-forecaster" },
          { title: "Marketing ROI Report", href: "/resources/marketing-roi-report" },
          { title: "Budget Calculator", href: "/resources/budget-calculator" },
        ]}
        relatedBlog={[
          { title: "How to Calculate Marketing ROI", href: "/blog" },
          { title: "PPC vs SEO: Where to Invest", href: "/blog" },
          { title: "Budget Allocation Best Practices", href: "/blog" },
        ]}
      />
    </article>
  );
}
