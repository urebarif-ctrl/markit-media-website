"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

function fmt(n: number) { return n.toLocaleString("en-US", { maximumFractionDigits: 0 }); }
function fmtMoney(n: number) { return "$" + fmt(n); }

export default function ContentRoiCalculatorPage() {
  const [articlesPerMonth, setArticlesPerMonth] = useState(4);
  const [costPerArticle, setCostPerArticle] = useState(500);
  const [monthlyTraffic, setMonthlyTraffic] = useState(500);
  const [trafficGrowth, setTrafficGrowth] = useState(15);
  const [conversionRate, setConversionRate] = useState(2);
  const [leadValue, setLeadValue] = useState(100);
  const [months, setMonths] = useState(12);
  const [calculated, setCalculated] = useState(false);

  const handleCalculate = useCallback(() => setCalculated(true), []);

  const monthlyCost = articlesPerMonth * costPerArticle;
  const totalCost = monthlyCost * months;

  const monthlyData: { month: number; traffic: number; leads: number; revenue: number; cumRevenue: number }[] = [];
  let cumulativeTraffic = 0;
  let cumulativeLeads = 0;
  let cumulativeRevenue = 0;
  let currentTraffic = monthlyTraffic;
  for (let m = 1; m <= months; m++) {
    currentTraffic = m === 1 ? monthlyTraffic : currentTraffic * (1 + trafficGrowth / 100);
    const leads = currentTraffic * (conversionRate / 100);
    const revenue = leads * leadValue;
    cumulativeTraffic += currentTraffic;
    cumulativeLeads += leads;
    cumulativeRevenue += revenue;
    monthlyData.push({ month: m, traffic: Math.round(currentTraffic), leads: Math.round(leads), revenue, cumRevenue: cumulativeRevenue });
  }
  const roi = totalCost > 0 ? ((cumulativeRevenue - totalCost) / totalCost) * 100 : 0;
  const breakEvenMonth = monthlyData.findIndex((d) => d.cumRevenue >= monthlyCost * (monthlyData.indexOf(d) + 1));

  return (
    <article>
      <nav className="px-6 lg:px-12 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/resources" className="hover:text-black transition-colors">Resources</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">Content Marketing ROI Calculator</li>
        </ol>
      </nav>
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Content Marketing ROI Calculator
            </h1>
            <SectionDesc>
              Estimate the long-term value of your content marketing investment. Content compounds over time — this calculator shows you how.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-20">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="articles" className="block text-base font-bold text-black mb-1">Articles Per Month</label>
                <input id="articles" type="number" value={articlesPerMonth} onChange={(e) => setArticlesPerMonth(Math.max(1, Number(e.target.value)))} className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus-visible:border-black transition-colors motion-reduce:transition-none" />
              </div>
              <div>
                <label htmlFor="cost" className="block text-base font-bold text-black mb-1">Cost Per Article ($)</label>
                <input id="cost" type="number" value={costPerArticle} onChange={(e) => setCostPerArticle(Math.max(0, Number(e.target.value)))} className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus-visible:border-black transition-colors motion-reduce:transition-none" />
              </div>
              <div>
                <label htmlFor="traffic" className="block text-base font-bold text-black mb-1">Monthly Organic Traffic (starting)</label>
                <input id="traffic" type="number" value={monthlyTraffic} onChange={(e) => setMonthlyTraffic(Math.max(0, Number(e.target.value)))} className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus-visible:border-black transition-colors motion-reduce:transition-none" />
              </div>
              <div>
                <label htmlFor="growth" className="block text-base font-bold text-black mb-1">Monthly Traffic Growth (%)</label>
                <input id="growth" type="number" step="1" value={trafficGrowth} onChange={(e) => setTrafficGrowth(Math.max(0, Number(e.target.value)))} className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus-visible:border-black transition-colors motion-reduce:transition-none" />
                <p className="text-base text-gray-400 mt-1">Typical: 10-20% month-over-month</p>
              </div>
              <div>
                <label htmlFor="conv" className="block text-base font-bold text-black mb-1">Traffic-to-Lead Rate (%)</label>
                <input id="conv" type="number" step="0.1" value={conversionRate} onChange={(e) => setConversionRate(Math.max(0, Number(e.target.value)))} className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus-visible:border-black transition-colors motion-reduce:transition-none" />
              </div>
              <div>
                <label htmlFor="lv" className="block text-base font-bold text-black mb-1">Average Lead Value ($)</label>
                <input id="lv" type="number" value={leadValue} onChange={(e) => setLeadValue(Math.max(0, Number(e.target.value)))} className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus-visible:border-black transition-colors motion-reduce:transition-none" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="months" className="block text-base font-bold text-black mb-1">Time Period (months)</label>
                <input id="months" type="number" value={months} min={3} max={36} onChange={(e) => setMonths(Math.max(3, Math.min(36, Number(e.target.value))))} className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus-visible:border-black transition-colors motion-reduce:transition-none" />
              </div>
            </div>

            <button onClick={handleCalculate} className="mt-8 bg-black text-white px-10 py-4 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              Calculate ROI
            </button>
          </Animate>

          {calculated && (
            <Animate animation="fade-up">
              <div className="mt-12 space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Total Investment", value: fmtMoney(totalCost) },
                    { label: "Projected Revenue", value: fmtMoney(cumulativeRevenue) },
                    { label: "Total Leads", value: fmt(Math.round(cumulativeLeads)) },
                    { label: "ROI", value: fmt(roi) + "%" },
                  ].map((m) => (
                    <div key={m.label} className="p-5 border-2 border-black text-center">
                      <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">{m.value}</div>
                      <div className="text-base text-gray-500 mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>

                {breakEvenMonth >= 0 && (
                  <div className="p-5 border-l-4 border-black bg-gray-50">
                    <p className="text-base text-gray-600"><strong>Break-even point:</strong> Month {breakEvenMonth + 1}</p>
                  </div>
                )}

                <div className="p-6 bg-gray-50 border border-gray-200 overflow-x-auto">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Month-by-Month Projection</h2>
                  <table className="w-full text-base">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 pr-4 font-bold text-black">Month</th>
                        <th className="text-right py-2 px-4 font-bold text-black">Traffic</th>
                        <th className="text-right py-2 px-4 font-bold text-black">Leads</th>
                        <th className="text-right py-2 px-4 font-bold text-black">Revenue</th>
                        <th className="text-right py-2 pl-4 font-bold text-black">Cumulative</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyData.map((d) => (
                        <tr key={d.month} className="border-b border-gray-100">
                          <td className="py-2 pr-4 text-gray-700">{d.month}</td>
                          <td className="py-2 px-4 text-right text-gray-600">{fmt(d.traffic)}</td>
                          <td className="py-2 px-4 text-right text-gray-600">{fmt(d.leads)}</td>
                          <td className="py-2 px-4 text-right text-gray-600">{fmtMoney(d.revenue)}</td>
                          <td className="py-2 pl-4 text-right font-bold text-black">{fmtMoney(d.cumRevenue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-5 border-l-4 border-black bg-gray-50">
                  <p className="text-base text-gray-600 leading-relaxed">
                    <strong>Note:</strong> Content marketing ROI compounds over time as articles rank and accumulate traffic. Early months typically show negative ROI, while later months show exponential returns as your content library grows.
                  </p>
                </div>
              </div>
            </Animate>
          )}
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Invest in Content That Compounds?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our content marketing team creates SEO-optimized content that ranks and converts. Strategy, writing, and optimization — all under one roof.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Talk to a Content Strategist &rarr;
            </Link>
          </Animate>
        </div>
      </section>
          
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/content-calendar" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Content Calendar</Link>
                <Link href="/resources/content-brief-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Content Brief Generator</Link>
                <Link href="/resources/content-gap-finder" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Content Gap Finder</Link>
                <Link href="/resources/content-pillar-planner" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Content Pillar Planner</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Content ROI Calculator — Measure Your Content Marketing Returns",
          description: "Use our free content ROI calculator to project your content marketing returns over time. Factor in traffic growth, conversion rates, and production costs to see real ROI.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Content Roi Calculator"
        services={[
          { title: "Content Marketing", desc: "Strategic content that drives traffic, engagement, and conversions.", href: "/services/content-marketing" },
          { title: "SEO", desc: "Content optimized for search engines and human readers alike.", href: "/services/seo" },
          { title: "Social Media Marketing", desc: "Distribute your content where your audience already is.", href: "/services/social-media-marketing" },
        ]}
        relatedTools={[
          { title: "Content Performance Scorecard", href: "/resources/content-performance-scorecard" },
          { title: "Content Pillar Planner", href: "/resources/content-pillar-planner" },
          { title: "Content Repurposing", href: "/resources/content-repurposing" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
