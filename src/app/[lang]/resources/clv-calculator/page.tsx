"use client";

import { useState, useCallback } from "react";
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
  return "$" + fmt(n);
}

function fmtRatio(n: number) {
  return n.toFixed(1) + ":1";
}

function fmtMonths(n: number) {
  if (!isFinite(n) || n <= 0) return "N/A";
  return n.toFixed(1) + " mo";
}



export default function ClvCalculatorPage() {
  const [avgOrderValue, setAvgOrderValue] = useState("120");
  const [purchaseFrequency, setPurchaseFrequency] = useState("4");
  const [customerLifespan, setCustomerLifespan] = useState("5");
  const [acquisitionCost, setAcquisitionCost] = useState("150");
  const [grossMargin, setGrossMargin] = useState("60");
  const [calculated, setCalculated] = useState(false);

  const handleCalculate = useCallback(() => {
    setCalculated(true);
  }, []);

  const handleReset = useCallback(() => {
    setAvgOrderValue("120");
    setPurchaseFrequency("4");
    setCustomerLifespan("5");
    setAcquisitionCost("150");
    setGrossMargin("60");
    setCalculated(false);
  }, []);

  const aov = Math.max(0, parseFloat(avgOrderValue) || 0);
  const freq = Math.max(0, parseFloat(purchaseFrequency) || 0);
  const lifespan = Math.max(0, parseFloat(customerLifespan) || 0);
  const cac = Math.max(0, parseFloat(acquisitionCost) || 0);
  const margin = Math.max(0, Math.min(100, parseFloat(grossMargin) || 0)) / 100;

  const clv = aov * freq * lifespan * margin;
  const netClv = clv - cac;
  const clvCacRatio = cac > 0 ? clv / cac : 0;
  const paybackPeriod = freq > 0 && aov > 0 && margin > 0 ? cac / (aov * freq * margin / 12) : 0;
  const monthlyRevenue = freq > 0 ? (aov * freq) / 12 : 0;

  const isValid = aov > 0 && freq > 0 && lifespan > 0 && margin > 0;

  const inputClass =
    "w-full px-4 py-3 border border-gray-200 text-base text-black focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none min-h-[44px]";

  const benchmarks = [
    {
      ratio: "1:1",
      label: "Break Even",
      description:
        "You are recovering your acquisition cost but making no profit. Growth at this ratio is unsustainable long-term.",
    },
    {
      ratio: "2:1",
      label: "Below Average",
      description:
        "You are earning twice what you spend to acquire a customer. Profitable, but leaves little room for error or reinvestment.",
    },
    {
      ratio: "3:1",
      label: "Healthy",
      description:
        "The standard benchmark for most businesses. For every dollar spent on acquisition, you earn three back over the customer lifetime.",
    },
    {
      ratio: "5:1+",
      label: "Strong",
      description:
        "Excellent unit economics. You have room to invest more aggressively in acquisition while maintaining strong margins.",
    },
  ];

  const tips = [
    {
      title: "Increase Average Order Value",
      description:
        "Introduce upsells, cross-sells, and product bundles at checkout. Offer free shipping thresholds slightly above your current average to nudge customers toward larger orders.",
    },
    {
      title: "Improve Purchase Frequency",
      description:
        "Use email sequences, subscription models, and timely reorder reminders to bring customers back more often. The more frequently they buy, the higher their lifetime value.",
    },
    {
      title: "Reduce Customer Churn",
      description:
        "Proactive customer support, onboarding sequences, and regular check-ins keep customers engaged. A 5% reduction in churn can increase profits by 25-95%.",
    },
    {
      title: "Launch a Loyalty Program",
      description:
        "Points, tiered rewards, and exclusive perks give customers a reason to keep choosing you over competitors. Loyalty program members typically spend 12-18% more annually.",
    },
    {
      title: "Lower Acquisition Cost",
      description:
        "Optimize your paid campaigns, invest in organic channels like SEO and content marketing, and build referral programs. Every dollar saved on acquisition goes straight to your net CLV.",
    },
    {
      title: "Improve Gross Margins",
      description:
        "Negotiate better supplier terms, reduce operational waste, and consider premium pricing strategies. Higher margins amplify every other CLV improvement you make.",
    },
  ];

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Customer Lifetime Value Calculator",
          description: "You are recovering your acquisition cost but making no profit. Growth at this ratio is unsustainable long-term.",
          url: "https://themarkitmedia.com/en/resources/clv-calculator",
          applicationCategory: "Business Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Customer Lifetime Value Calculator | Free Marketing Tool — Markit Media</title>
      <link rel="canonical" href="https://themarkitmedia.com/en/resources/clv-calculator" />
      <meta name="description" content="You are recovering your acquisition cost but making no profit. Growth at this ratio is unsustainable long-term." />
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/marketing-budget-planner" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Budget Planner</Link>
                <Link href="/resources/budget-calculator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Budget Calculator</Link>
                <Link href="/resources/budget-allocator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Budget Allocator</Link>
                <Link href="/resources/marketing-expense-tracker" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Expense Tracker</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Customer Lifetime Value Calculator",
          description:
            "Calculate customer lifetime value (CLV), CLV:CAC ratio, payback period, and net CLV. Free tool for data-driven marketing decisions.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "CLV Calculator" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Customer Lifetime Value Calculator
            </h1>
            <SectionDesc>
              Understand how much each customer is worth over their entire
              relationship with your business. Use CLV to make smarter decisions
              about acquisition spend, retention investment, and growth strategy.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Calculator */}
      <section aria-label="Your Numbers" className="px-6 lg:px-12 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Inputs */}
          <Animate animation="fade-up" delay={100}>
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                Your Numbers
              </h2>

              <div>
                <label
                  htmlFor="avg-order-value"
                  className="block text-base font-bold text-black mb-1"
                >
                  Average Order Value ($)
                </label>
                <input
                  id="avg-order-value"
                  type="number"
                  min="0"
                  step="1"
                  value={avgOrderValue}
                  onChange={(e) => {
                    setAvgOrderValue(e.target.value);
                    setCalculated(false);
                  }}
                  className={inputClass}
                />
                <p className="text-base text-gray-400 mt-1">
                  Average amount spent per transaction
                </p>
              </div>

              <div>
                <label
                  htmlFor="purchase-frequency"
                  className="block text-base font-bold text-black mb-1"
                >
                  Purchase Frequency (per year)
                </label>
                <input
                  id="purchase-frequency"
                  type="number"
                  min="0"
                  step="0.1"
                  value={purchaseFrequency}
                  onChange={(e) => {
                    setPurchaseFrequency(e.target.value);
                    setCalculated(false);
                  }}
                  className={inputClass}
                />
                <p className="text-base text-gray-400 mt-1">
                  How many times a customer buys per year
                </p>
              </div>

              <div>
                <label
                  htmlFor="customer-lifespan"
                  className="block text-base font-bold text-black mb-1"
                >
                  Customer Lifespan (years)
                </label>
                <input
                  id="customer-lifespan"
                  type="number"
                  min="0"
                  step="0.5"
                  value={customerLifespan}
                  onChange={(e) => {
                    setCustomerLifespan(e.target.value);
                    setCalculated(false);
                  }}
                  className={inputClass}
                />
                <p className="text-base text-gray-400 mt-1">
                  Average years a customer stays active
                </p>
              </div>

              <div>
                <label
                  htmlFor="acquisition-cost"
                  className="block text-base font-bold text-black mb-1"
                >
                  Customer Acquisition Cost ($)
                </label>
                <input
                  id="acquisition-cost"
                  type="number"
                  min="0"
                  step="1"
                  value={acquisitionCost}
                  onChange={(e) => {
                    setAcquisitionCost(e.target.value);
                    setCalculated(false);
                  }}
                  className={inputClass}
                />
                <p className="text-base text-gray-400 mt-1">
                  Total cost to acquire one customer (CAC)
                </p>
              </div>

              <div>
                <label
                  htmlFor="gross-margin"
                  className="block text-base font-bold text-black mb-1"
                >
                  Gross Margin (%)
                </label>
                <input
                  id="gross-margin"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={grossMargin}
                  onChange={(e) => {
                    setGrossMargin(e.target.value);
                    setCalculated(false);
                  }}
                  className={inputClass}
                />
                <p className="text-base text-gray-400 mt-1">
                  Percentage of revenue retained after cost of goods
                </p>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleCalculate}
                  disabled={!isValid}
                  className="bg-black text-white px-10 py-4 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none disabled:bg-gray-300 disabled:cursor-not-allowed min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Calculate CLV
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="border border-gray-300 text-black px-8 py-4 font-bold text-base hover:border-black transition-colors motion-reduce:transition-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Reset
                </button>
              </div>
            </div>
          </Animate>

          {/* Results */}
          <Animate animation="fade-up" delay={200}>
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                Results
              </h2>

              {calculated && isValid ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 border-2 border-black text-center">
                      <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                        {fmtMoney(clv)}
                      </div>
                      <div className="text-base text-gray-500 mt-1">
                        Customer Lifetime Value
                      </div>
                    </div>
                    <div className="p-5 border-2 border-black text-center">
                      <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                        {fmtMoney(netClv)}
                      </div>
                      <div className="text-base text-gray-500 mt-1">
                        Net CLV (minus CAC)
                      </div>
                    </div>
                    <div className="p-5 border-2 border-black text-center">
                      <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                        {clvCacRatio > 0 ? fmtRatio(clvCacRatio) : "N/A"}
                      </div>
                      <div className="text-base text-gray-500 mt-1">
                        CLV:CAC Ratio
                      </div>
                    </div>
                    <div className="p-5 border-2 border-black text-center">
                      <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                        {fmtMonths(paybackPeriod)}
                      </div>
                      <div className="text-base text-gray-500 mt-1">
                        Payback Period
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 p-8 space-y-0">
                    <div className="flex justify-between items-center py-4 border-b border-gray-200">
                      <span className="text-base text-gray-600">
                        Average Order Value
                      </span>
                      <span className="text-base font-bold text-black">
                        {fmtMoney(aov)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-gray-200">
                      <span className="text-base text-gray-600">
                        Annual Revenue per Customer
                      </span>
                      <span className="text-base font-bold text-black">
                        {fmtMoney(aov * freq)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-gray-200">
                      <span className="text-base text-gray-600">
                        Monthly Revenue per Customer
                      </span>
                      <span className="text-base font-bold text-black">
                        {fmtMoney(monthlyRevenue)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-gray-200">
                      <span className="text-base text-gray-600">
                        Gross Margin Applied
                      </span>
                      <span className="text-base font-bold text-black">
                        {(margin * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-gray-200">
                      <span className="text-base text-gray-600">
                        Customer Acquisition Cost
                      </span>
                      <span className="text-base font-bold text-black">
                        {fmtMoney(cac)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-4 bg-black text-white px-6 -mx-8 -mb-8">
                      <span className="text-base font-bold">
                        Customer Lifetime Value
                      </span>
                      <span className="text-2xl font-extrabold">
                        {fmtMoney(clv)}
                      </span>
                    </div>
                  </div>

                  <p className="text-base text-gray-400 leading-relaxed">
                    CLV = Average Order Value x Purchase Frequency x Customer
                    Lifespan x Gross Margin. Your net CLV of{" "}
                    <strong className="text-black">{fmtMoney(netClv)}</strong>{" "}
                    accounts for the cost of acquiring each customer.
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 p-8 flex items-center justify-center min-h-[300px]">
                  <p className="text-base text-gray-400 text-center">
                    Enter your customer metrics and click Calculate CLV to see
                    results.
                  </p>
                </div>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* CLV:CAC Benchmarks */}
      <section aria-label="Benchmarks" className="px-6 lg:px-12 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Benchmarks</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight mb-4">
              CLV:CAC Ratio Guide
            </h2>
            <SectionDesc>
              Your CLV:CAC ratio tells you how efficiently you turn acquisition
              spend into long-term customer value. Here is how to read your
              number.
            </SectionDesc>
          </Animate>

          <Stagger stagger={100} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {benchmarks.map((b) => (
              <div
                key={b.ratio}
                className="bg-white border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                    {b.ratio}
                  </span>
                  <span className="text-base font-bold text-gray-500">
                    {b.label}
                  </span>
                </div>
                <p className="text-base text-gray-600 leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Tips Section */}
      <section aria-label="Strategy" className="px-6 lg:px-12 py-16">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Strategy</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight mb-4">
              6 Ways to Increase Customer Lifetime Value
            </h2>
            <SectionDesc>
              Small improvements across these levers compound into significantly
              higher CLV. Focus on the areas where you have the most room to
              grow.
            </SectionDesc>
          </Animate>

          <Stagger stagger={100} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {tips.map((tip, i) => (
              <div
                key={tip.title}
                className="border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
              >
                <div className="flex items-start gap-4">
                  <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Maximize Your Customer Lifetime Value?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team builds retention strategies, loyalty programs, and
              conversion funnels that turn one-time buyers into long-term
              customers. Let us help you grow the metrics that matter.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Clv Calculator"
        services={[
          { title: "Digital Marketing", desc: "Data-driven strategy with transparent reporting and insights.", href: "/services/digital-marketing" },
          { title: "Performance Marketing", desc: "Campaign optimization based on real performance data.", href: "/services/performance-marketing" },
          { title: "SEO", desc: "SEO analytics that show exactly what drives organic growth.", href: "/services/seo" },
        ]}
        relatedTools={[
          { title: "Client Reporting Dashboard", href: "/resources/client-reporting-dashboard" },
          { title: "Competitive Intel Dashboard", href: "/resources/competitive-intel-dashboard" },
          { title: "Channel Mix Modeller", href: "/resources/channel-mix-modeller" },
          { title: "Channel Recommender", href: "/resources/channel-recommender" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
