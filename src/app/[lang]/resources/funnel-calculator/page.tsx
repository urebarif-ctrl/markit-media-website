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
  return n.toFixed(1) + "%";
}

interface FunnelStage {
  id: string;
  label: string;
  description: string;
  defaultRate: number;
}

const FUNNEL_STAGES: FunnelStage[] = [
  {
    id: "visitors",
    label: "Visitors",
    description: "Monthly website visitors",
    defaultRate: 100,
  },
  {
    id: "leads",
    label: "Leads",
    description: "Visitors who submit a form or sign up",
    defaultRate: 3,
  },
  {
    id: "mqls",
    label: "Marketing Qualified Leads",
    description: "Leads who meet your marketing criteria",
    defaultRate: 40,
  },
  {
    id: "sqls",
    label: "Sales Qualified Leads",
    description: "MQLs accepted by your sales team",
    defaultRate: 50,
  },
  {
    id: "opportunities",
    label: "Opportunities",
    description: "SQLs in your active pipeline",
    defaultRate: 60,
  },
  {
    id: "customers",
    label: "Customers",
    description: "Closed deals",
    defaultRate: 25,
  },
];

const BENCHMARKS: { stage: string; low: string; avg: string; high: string }[] =
  [
    {
      stage: "Visitor to Lead",
      low: "1-2%",
      avg: "2-5%",
      high: "5-10%",
    },
    {
      stage: "Lead to MQL",
      low: "20-30%",
      avg: "30-45%",
      high: "45-60%",
    },
    {
      stage: "MQL to SQL",
      low: "30-40%",
      avg: "40-55%",
      high: "55-70%",
    },
    {
      stage: "SQL to Opportunity",
      low: "40-50%",
      avg: "50-65%",
      high: "65-80%",
    },
    {
      stage: "Opportunity to Customer",
      low: "15-20%",
      avg: "20-30%",
      high: "30-40%",
    },
  ];



export default function FunnelCalculatorPage() {
  const [visitors, setVisitors] = useState(10000);
  const [rates, setRates] = useState<Record<string, number>>({
    leads: 3,
    mqls: 40,
    sqls: 50,
    opportunities: 60,
    customers: 25,
  });
  const [dealValue, setDealValue] = useState(5000);
  const [marketingSpend, setMarketingSpend] = useState(0);

  const updateRate = (id: string, value: number) => {
    setRates((prev) => ({ ...prev, [id]: value }));
  };

  const funnelData = useMemo(() => {
    const stages: {
      id: string;
      label: string;
      count: number;
      rate: number;
      dropOff: number;
      dropOffPercent: number;
      widthPercent: number;
    }[] = [];

    let current = visitors;
    stages.push({
      id: "visitors",
      label: "Visitors",
      count: current,
      rate: 100,
      dropOff: 0,
      dropOffPercent: 0,
      widthPercent: 100,
    });

    const stageKeys = ["leads", "mqls", "sqls", "opportunities", "customers"];
    const stageLabels = [
      "Leads",
      "Marketing Qualified Leads",
      "Sales Qualified Leads",
      "Opportunities",
      "Customers",
    ];

    for (let i = 0; i < stageKeys.length; i++) {
      const rate = rates[stageKeys[i]];
      const prev = current;
      current = Math.round(current * (rate / 100));
      const dropOff = prev - current;
      const dropOffPercent = prev > 0 ? (dropOff / prev) * 100 : 0;
      const widthPercent = visitors > 0 ? (current / visitors) * 100 : 0;

      stages.push({
        id: stageKeys[i],
        label: stageLabels[i],
        count: current,
        rate,
        dropOff,
        dropOffPercent,
        widthPercent: Math.max(widthPercent, 2),
      });
    }

    return stages;
  }, [visitors, rates]);

  const customers = funnelData[funnelData.length - 1].count;
  const monthlyRevenue = customers * dealValue;
  const revenuePerVisitor = visitors > 0 ? monthlyRevenue / visitors : 0;
  const cpa =
    marketingSpend > 0 && customers > 0 ? marketingSpend / customers : 0;

  const biggestDropOff = useMemo(() => {
    let maxDrop = 0;
    let maxStage = "";
    let maxFromLabel = "";
    for (let i = 1; i < funnelData.length; i++) {
      if (funnelData[i].dropOff > maxDrop) {
        maxDrop = funnelData[i].dropOff;
        maxStage = funnelData[i].label;
        maxFromLabel = funnelData[i - 1].label;
      }
    }
    return { stage: maxStage, fromStage: maxFromLabel, dropOff: maxDrop };
  }, [funnelData]);

  const whatIfScenarios = useMemo(() => {
    const stageKeys = ["leads", "mqls", "sqls", "opportunities", "customers"];
    const stageLabels = [
      "Leads",
      "Marketing Qualified Leads",
      "Sales Qualified Leads",
      "Opportunities",
      "Customers",
    ];

    return stageKeys
      .map((key, idx) => {
        const boostedRates = { ...rates };
        const currentRate = boostedRates[key];
        const boostedRate = Math.min(currentRate * 1.1, 100);
        boostedRates[key] = boostedRate;

        let current = visitors;
        for (const sk of stageKeys) {
          current = Math.round(current * (boostedRates[sk] / 100));
        }
        const newRevenue = current * dealValue;
        const revenueGain = newRevenue - monthlyRevenue;

        return {
          stage: stageLabels[idx],
          currentRate,
          boostedRate,
          newCustomers: current,
          revenueGain,
        };
      })
      .sort((a, b) => b.revenueGain - a.revenueGain);
  }, [visitors, rates, dealValue, monthlyRevenue]);

  const funnelSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Marketing Funnel Calculator",
    description:
      "Calculate your marketing funnel metrics, identify drop-off points, and discover where to focus for maximum revenue impact.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: "Markit Media",
      url: "https://themarkitmedia.com",
    },
  };

  return (
    <article className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Digital Marketing",
          description: "Monthly website visitors",
          url: "https://themarkitmedia.com/en/resources/funnel-calculator",
          applicationCategory: "Business Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Marketing Funnel Calculator | Free Marketing Tool — Markit Media</title>
      <link rel="canonical" href="https://themarkitmedia.com/en/resources/funnel-calculator" />
      <meta name="description" content="Monthly website visitors" />
      
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
<JsonLd data={funnelSchema} />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Funnel Calculator" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing Funnel Calculator
            </h1>
            <SectionDesc>
              Input your traffic and conversion metrics at each funnel stage to
              see exactly where you are losing the most potential revenue — and
              what to fix first.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Inputs */}
      <section aria-label="Your Funnel Metrics" className="px-6 lg:px-12 pb-16">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-8">
              Your Funnel Metrics
            </h2>

            {/* Visitors input */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <label
                htmlFor="visitors"
                className="block text-base font-bold text-black mb-1"
              >
                Monthly Website Visitors
              </label>
              <p className="text-base text-gray-500 mb-3">
                {FUNNEL_STAGES[0].description}
              </p>
              <input
                id="visitors"
                type="number"
                min={0}
                step={100}
                value={visitors}
                onChange={(e) => setVisitors(Math.max(0, Number(e.target.value)))}
                className="w-full max-w-xs px-4 py-3 border-2 border-gray-200 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus-visible:border-black transition-colors motion-reduce:transition-none"
              />
            </div>

            {/* Conversion rate inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-200">
              {FUNNEL_STAGES.slice(1).map((stage) => (
                <div key={stage.id}>
                  <label
                    htmlFor={stage.id}
                    className="block text-base font-bold text-black mb-1"
                  >
                    {stage.label} Rate (%)
                  </label>
                  <p className="text-base text-gray-500 mb-3">
                    {stage.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <input
                      id={stage.id}
                      type="range"
                      min={1}
                      max={100}
                      step={1}
                      value={rates[stage.id]}
                      onChange={(e) =>
                        updateRate(stage.id, Number(e.target.value))
                      }
                      className="flex-1 accent-black h-2 min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                    />
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={rates[stage.id]}
                      onChange={(e) =>
                        updateRate(
                          stage.id,
                          Math.max(1, Math.min(100, Number(e.target.value)))
                        )
                      }
                      aria-label={`${stage.label} rate value`}
                      className="w-20 px-3 py-3 border-2 border-gray-200 text-base text-black text-center focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus-visible:border-black transition-colors motion-reduce:transition-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Deal value and spend */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="deal-value"
                  className="block text-base font-bold text-black mb-1"
                >
                  Average Deal Value ($)
                </label>
                <p className="text-base text-gray-500 mb-3">
                  Revenue per closed deal
                </p>
                <input
                  id="deal-value"
                  type="number"
                  min={0}
                  step={100}
                  value={dealValue}
                  onChange={(e) =>
                    setDealValue(Math.max(0, Number(e.target.value)))
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus-visible:border-black transition-colors motion-reduce:transition-none"
                />
              </div>
              <div>
                <label
                  htmlFor="marketing-spend"
                  className="block text-base font-bold text-black mb-1"
                >
                  Monthly Marketing Spend ($)
                </label>
                <p className="text-base text-gray-500 mb-3">
                  Optional — used to calculate cost per acquisition
                </p>
                <input
                  id="marketing-spend"
                  type="number"
                  min={0}
                  step={100}
                  value={marketingSpend}
                  onChange={(e) =>
                    setMarketingSpend(Math.max(0, Number(e.target.value)))
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus-visible:border-black transition-colors motion-reduce:transition-none"
                />
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* Visual Funnel */}
      <section aria-label="Your Funnel" className="px-6 lg:px-12 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-8">
              Your Funnel
            </h2>

            <div className="space-y-1">
              {funnelData.map((stage, idx) => (
                <div key={stage.id}>
                  {idx > 0 && (
                    <div className="flex items-center gap-3 py-2 pl-4">
                      <span
                        className="text-base text-gray-500"
                        aria-label={`${fmtPercent(stage.dropOffPercent)} drop-off between ${funnelData[idx - 1].label} and ${stage.label}`}
                      >
                        {fmtPercent(stage.dropOffPercent)} drop-off ({fmt(stage.dropOff)} lost)
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <div className="w-40 lg:w-56 shrink-0 text-right">
                      <span className="text-base font-bold text-black">
                        {stage.label}
                      </span>
                    </div>
                    <div className="flex-1 relative">
                      <div
                        className="bg-black h-12 flex items-center transition-all duration-500 motion-reduce:transition-none"
                        style={{ width: `${stage.widthPercent}%` }}
                        role="img"
                        aria-label={`${stage.label}: ${fmt(stage.count)} (${fmtPercent(stage.widthPercent)} of visitors)`}
                      >
                        <span className="text-white text-base font-bold px-4 whitespace-nowrap">
                          {fmt(stage.count)}
                        </span>
                      </div>
                    </div>
                    {idx > 0 && (
                      <div className="w-16 shrink-0 text-base text-gray-500">
                        {fmtPercent(stage.rate)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* Results Panel */}
      <section aria-label="Results" className="px-6 lg:px-12 py-16">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-8">
              Results
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="p-6 border-2 border-black">
                <div className="text-base text-gray-500 mb-2">
                  Projected Monthly Revenue
                </div>
                <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  {fmtMoney(monthlyRevenue)}
                </div>
              </div>
              <div className="p-6 border-2 border-black">
                <div className="text-base text-gray-500 mb-2">
                  Revenue Per Visitor
                </div>
                <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  {fmtMoney(revenuePerVisitor)}
                </div>
              </div>
              <div className="p-6 border-2 border-black">
                <div className="text-base text-gray-500 mb-2">
                  New Customers / Month
                </div>
                <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  {fmt(customers)}
                </div>
              </div>
              <div className="p-6 border-2 border-black">
                <div className="text-base text-gray-500 mb-2">
                  {marketingSpend > 0
                    ? "Cost Per Acquisition"
                    : "CPA (enter spend above)"}
                </div>
                <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                  {marketingSpend > 0 && customers > 0 ? fmtMoney(cpa) : "---"}
                </div>
              </div>
            </div>

            {/* Biggest drop-off callout */}
            {biggestDropOff.dropOff > 0 && (
              <div className="p-6 border-l-4 border-black bg-gray-50 mb-8">
                <p className="text-base text-black font-bold mb-1">
                  Biggest Drop-off: {biggestDropOff.fromStage} to{" "}
                  {biggestDropOff.stage}
                </p>
                <p className="text-base text-gray-600">
                  You are losing {fmt(biggestDropOff.dropOff)} people at this
                  stage. Improving this conversion rate will have the largest
                  impact on your bottom line.
                </p>
              </div>
            )}
          </Animate>
        </div>
      </section>

      {/* What If Scenarios */}
      <section aria-label="What If Scenarios" className="px-6 lg:px-12 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
              What If Scenarios
            </h2>
            <p className="text-base text-gray-500 mb-8">
              See the revenue impact of improving each stage conversion rate by
              10%. Ranked by highest impact first.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-base">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="text-left py-3 pr-4 font-bold text-black">
                      Stage
                    </th>
                    <th className="text-right py-3 px-4 font-bold text-black">
                      Current Rate
                    </th>
                    <th className="text-right py-3 px-4 font-bold text-black">
                      +10% Rate
                    </th>
                    <th className="text-right py-3 px-4 font-bold text-black">
                      New Customers
                    </th>
                    <th className="text-right py-3 pl-4 font-bold text-black">
                      Revenue Gain / Month
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {whatIfScenarios.map((scenario, idx) => (
                    <tr
                      key={scenario.stage}
                      className={`border-b border-gray-200 ${idx === 0 ? "bg-black text-white" : ""}`}
                    >
                      <td
                        className={`py-4 pr-4 font-bold ${idx === 0 ? "text-white" : "text-black"}`}
                      >
                        {idx === 0 && (
                          <span className="text-base font-bold mr-2">
                            #1
                          </span>
                        )}
                        {scenario.stage}
                      </td>
                      <td
                        className={`py-4 px-4 text-right ${idx === 0 ? "text-gray-300" : "text-gray-600"}`}
                      >
                        {fmtPercent(scenario.currentRate)}
                      </td>
                      <td
                        className={`py-4 px-4 text-right ${idx === 0 ? "text-gray-300" : "text-gray-600"}`}
                      >
                        {fmtPercent(scenario.boostedRate)}
                      </td>
                      <td
                        className={`py-4 px-4 text-right ${idx === 0 ? "text-white" : "text-black"}`}
                      >
                        {fmt(scenario.newCustomers)}
                      </td>
                      <td
                        className={`py-4 pl-4 text-right font-bold ${idx === 0 ? "text-white" : "text-black"}`}
                      >
                        +{fmtMoney(scenario.revenueGain)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Animate>
        </div>
      </section>

      {/* Educational Section */}
      <section aria-label="Understanding Your Marketing Funnel" className="px-6 lg:px-12 py-16">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight mb-4">
              Understanding Your Marketing Funnel
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-3xl">
              A marketing funnel maps the journey from first website visit to
              closed deal. Each stage represents a qualification step — and each
              transition is where potential revenue gets left on the table.
              Knowing your numbers at every stage tells you exactly where to
              invest.
            </p>
          </Animate>

          <Stagger stagger={100} animation="fade-up" className="space-y-6 mb-12">
            <div className="p-6 border border-gray-200">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                Visitors to Leads
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                This is your website conversion rate. It measures how well your
                site turns anonymous traffic into known contacts. Improvements
                here come from better landing pages, clearer calls-to-action,
                and compelling lead magnets.
              </p>
            </div>
            <div className="p-6 border border-gray-200">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                Leads to MQLs
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Not every lead is worth pursuing. Marketing Qualified Leads are
                those who match your ideal customer profile and show genuine
                intent. Lead scoring, content nurturing, and proper targeting
                improve this rate.
              </p>
            </div>
            <div className="p-6 border border-gray-200">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                MQLs to SQLs
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                The handoff from marketing to sales. When this rate is low, it
                usually means marketing and sales disagree on what a qualified
                lead looks like. Alignment meetings, shared definitions, and SLA
                agreements fix this.
              </p>
            </div>
            <div className="p-6 border border-gray-200">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                SQLs to Opportunities
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                This measures how many qualified leads enter an active sales
                conversation. Low rates here often indicate timing issues,
                budget mismatches, or insufficient discovery during initial
                outreach.
              </p>
            </div>
            <div className="p-6 border border-gray-200">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                Opportunities to Customers
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Your close rate. This is where deal execution matters — proposal
                quality, follow-up cadence, objection handling, and competitive
                positioning all play a role. Even small improvements here have a
                direct impact on revenue.
              </p>
            </div>
          </Stagger>

          <Animate animation="fade-up">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-6">
              Industry Benchmarks
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-base">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="text-left py-3 pr-4 font-bold text-black">
                      Conversion Stage
                    </th>
                    <th className="text-right py-3 px-4 font-bold text-black">
                      Below Average
                    </th>
                    <th className="text-right py-3 px-4 font-bold text-black">
                      Average
                    </th>
                    <th className="text-right py-3 pl-4 font-bold text-black">
                      Above Average
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {BENCHMARKS.map((b) => (
                    <tr key={b.stage} className="border-b border-gray-200">
                      <td className="py-3 pr-4 font-bold text-black">
                        {b.stage}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-500">
                        {b.low}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-600">
                        {b.avg}
                      </td>
                      <td className="py-3 pl-4 text-right text-black font-bold">
                        {b.high}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-base text-gray-400 mt-4">
              Benchmarks vary by industry. B2B SaaS and professional services
              tend to have higher lead-to-MQL rates; e-commerce and consumer
              businesses tend to have higher visitor-to-lead rates.
            </p>
          </Animate>
        </div>
      </section>

      {/* CTA Section */}
      <section aria-label="Fix the Leaks in Your Funnel" className="px-6 lg:px-12 py-20 bg-black text-white">
        <div className="max-w-3xl mx-auto text-center">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Fix the Leaks in Your Funnel
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-10 leading-relaxed">
              We help businesses identify their biggest funnel bottlenecks and
              implement strategies that move the needle — from top-of-funnel
              traffic to closed deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
              >
                Get a Free Funnel Audit &rarr;
              </Link>
              <Link
                href="/services/digital-marketing"
                className="inline-flex items-center justify-center gap-3 border-2 border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
              >
                Our Marketing Services
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Funnel Calculator"
        services={[
          { title: "Digital Marketing", desc: "Data-driven strategy with transparent reporting and insights.", href: "/services/digital-marketing" },
          { title: "Performance Marketing", desc: "Campaign optimization based on real performance data.", href: "/services/performance-marketing" },
          { title: "SEO", desc: "SEO analytics that show exactly what drives organic growth.", href: "/services/seo" },
        ]}
        relatedTools={[
          { title: "Funnel Visualizer", href: "/resources/funnel-visualizer" },
          { title: "Email Sequence Planner", href: "/resources/email-sequence-planner" },
          { title: "Email Subject Ab Tester", href: "/resources/email-subject-ab-tester" },
          { title: "Email Subject Tester", href: "/resources/email-subject-tester" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
