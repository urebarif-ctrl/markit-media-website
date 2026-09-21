"use client";

import { useState } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";

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
      <nav className="px-6 lg:px-12 pt-20" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-gray-400 max-w-7xl mx-auto">
          <li><Link href="/" className="hover:text-black transition-colors motion-reduce:transition-none">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/resources" className="hover:text-black transition-colors motion-reduce:transition-none">Resources</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-black font-medium">ROI Calculator</li>
        </ol>
      </nav>

      <section className="px-6 lg:px-12 pt-16 pb-8">
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

      <section className="px-6 lg:px-12 py-8">
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
              <Link href="/get-a-quote" className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none w-full justify-center">
                Get a Custom Projection &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">How We Drive These Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "More Qualified Traffic", desc: "SEO and paid campaigns bring people who are actively looking for what you offer.", href: "/services/seo" },
              { title: "Better Conversion Rates", desc: "Optimized landing pages and messaging turn more visitors into leads and customers.", href: "/services/website-development" },
              { title: "Lower Cost Per Acquisition", desc: "Continuous optimization reduces wasted spend and improves campaign efficiency.", href: "/services/performance-marketing" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="group bg-white border border-gray-200 hover:border-black/30 transition-all motion-reduce:transition-none p-6 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black group-hover:underline mb-2">{item.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
              </Link>
            ))}
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
    
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/roi-dashboard" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">ROI Dashboard</Link>
                <Link href="/resources/roi-forecaster" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">ROI Forecaster</Link>
                <Link href="/resources/marketing-roi-report" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Marketing ROI Report</Link>
                <Link href="/resources/kpi-builder" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">KPI Builder</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white px-6 lg:px-12 py-16 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold mb-4">Need Expert Help?</h2>
        <p className="text-base text-neutral-300 mb-8 max-w-2xl mx-auto">Our team can help you implement these insights and drive measurable results for your business.</p>
        <a href="/contact" className="inline-block bg-white text-black font-bold px-8 py-3 text-base hover:bg-neutral-200 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Get in Touch</a>
      </section>
    </article>
  );
}
