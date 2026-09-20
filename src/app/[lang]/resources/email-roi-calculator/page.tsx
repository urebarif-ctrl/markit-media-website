"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";

function fmt(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function fmtMoney(n: number) {
  return "$" + fmt(n);
}

export default function EmailRoiCalculatorPage() {
  const [listSize, setListSize] = useState(5000);
  const [emailsPerMonth, setEmailsPerMonth] = useState(8);
  const [openRate, setOpenRate] = useState(21);
  const [clickRate, setClickRate] = useState(2.6);
  const [conversionRate, setConversionRate] = useState(3);
  const [avgOrderValue, setAvgOrderValue] = useState(75);
  const [monthlyCost, setMonthlyCost] = useState(500);
  const [calculated, setCalculated] = useState(false);

  const handleCalculate = useCallback(() => {
    setCalculated(true);
  }, []);

  const totalSends = listSize * emailsPerMonth;
  const totalOpens = totalSends * (openRate / 100);
  const totalClicks = totalSends * (clickRate / 100);
  const totalConversions = totalClicks * (conversionRate / 100);
  const monthlyRevenue = totalConversions * avgOrderValue;
  const annualRevenue = monthlyRevenue * 12;
  const annualCost = monthlyCost * 12;
  const annualProfit = annualRevenue - annualCost;
  const roi = annualCost > 0 ? ((annualRevenue - annualCost) / annualCost) * 100 : 0;

  return (
    <article>
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Email Marketing ROI Calculator
            </h1>
            <SectionDesc>
              Estimate the revenue potential of your email marketing program. Enter your metrics to see projected returns.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-20">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="list-size" className="block text-base font-bold text-black mb-1">Email List Size</label>
                <input id="list-size" type="number" value={listSize} onChange={(e) => setListSize(Math.max(0, Number(e.target.value)))} className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus:border-black transition-colors" />
              </div>
              <div>
                <label htmlFor="emails-month" className="block text-base font-bold text-black mb-1">Emails Per Month</label>
                <input id="emails-month" type="number" value={emailsPerMonth} onChange={(e) => setEmailsPerMonth(Math.max(1, Number(e.target.value)))} className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus:border-black transition-colors" />
              </div>
              <div>
                <label htmlFor="open-rate" className="block text-base font-bold text-black mb-1">Open Rate (%)</label>
                <input id="open-rate" type="number" step="0.1" value={openRate} onChange={(e) => setOpenRate(Math.max(0, Number(e.target.value)))} className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus:border-black transition-colors" />
                <p className="text-base text-gray-400 mt-1">Industry avg: 21.3%</p>
              </div>
              <div>
                <label htmlFor="click-rate" className="block text-base font-bold text-black mb-1">Click-Through Rate (%)</label>
                <input id="click-rate" type="number" step="0.1" value={clickRate} onChange={(e) => setClickRate(Math.max(0, Number(e.target.value)))} className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus:border-black transition-colors" />
                <p className="text-base text-gray-400 mt-1">Industry avg: 2.6%</p>
              </div>
              <div>
                <label htmlFor="conv-rate" className="block text-base font-bold text-black mb-1">Conversion Rate (%)</label>
                <input id="conv-rate" type="number" step="0.1" value={conversionRate} onChange={(e) => setConversionRate(Math.max(0, Number(e.target.value)))} className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus:border-black transition-colors" />
                <p className="text-base text-gray-400 mt-1">From clicks to purchase/signup</p>
              </div>
              <div>
                <label htmlFor="avg-order" className="block text-base font-bold text-black mb-1">Avg Order Value ($)</label>
                <input id="avg-order" type="number" value={avgOrderValue} onChange={(e) => setAvgOrderValue(Math.max(0, Number(e.target.value)))} className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus:border-black transition-colors" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="monthly-cost" className="block text-base font-bold text-black mb-1">Monthly Email Marketing Cost ($)</label>
                <input id="monthly-cost" type="number" value={monthlyCost} onChange={(e) => setMonthlyCost(Math.max(0, Number(e.target.value)))} className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus:border-black transition-colors" />
                <p className="text-base text-gray-400 mt-1">Platform fees + management costs</p>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="mt-8 bg-black text-white px-10 py-4 font-bold text-base hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Calculate ROI
            </button>
          </Animate>

          {calculated && (
            <Animate animation="fade-up">
              <div className="mt-12 space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Monthly Revenue", value: fmtMoney(monthlyRevenue) },
                    { label: "Annual Revenue", value: fmtMoney(annualRevenue) },
                    { label: "Annual Profit", value: fmtMoney(annualProfit) },
                    { label: "ROI", value: fmt(roi) + "%" },
                  ].map((m) => (
                    <div key={m.label} className="p-5 border-2 border-black text-center">
                      <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">{m.value}</div>
                      <div className="text-base text-gray-500 mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-gray-50 border border-gray-200">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Monthly Breakdown</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-base">
                    <div><span className="text-gray-400">Total sends:</span> <span className="font-bold text-black">{fmt(totalSends)}</span></div>
                    <div><span className="text-gray-400">Opens:</span> <span className="font-bold text-black">{fmt(totalOpens)}</span></div>
                    <div><span className="text-gray-400">Clicks:</span> <span className="font-bold text-black">{fmt(totalClicks)}</span></div>
                    <div><span className="text-gray-400">Conversions:</span> <span className="font-bold text-black">{fmt(totalConversions)}</span></div>
                    <div><span className="text-gray-400">Revenue/email:</span> <span className="font-bold text-black">{fmtMoney(totalSends > 0 ? monthlyRevenue / totalSends : 0)}</span></div>
                    <div><span className="text-gray-400">Cost/conversion:</span> <span className="font-bold text-black">{fmtMoney(totalConversions > 0 ? monthlyCost / totalConversions : 0)}</span></div>
                  </div>
                </div>

                <div className="p-5 border-l-4 border-black bg-gray-50">
                  <p className="text-base text-gray-600 leading-relaxed">
                    <strong>Note:</strong> These projections are estimates based on the inputs you provided. Actual results vary based on list quality, email content, timing, audience engagement, and industry benchmarks. Use these numbers as directional guidance for budget planning.
                  </p>
                </div>
              </div>
            </Animate>
          )}
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Benchmarks">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-8">
              Email Marketing Benchmarks by Industry
            </h2>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { industry: "E-commerce", open: "15.7%", click: "2.0%", note: "High volume, product-focused" },
              { industry: "B2B / SaaS", open: "21.5%", click: "2.6%", note: "Educational, longer sales cycles" },
              { industry: "Healthcare", open: "23.4%", click: "3.0%", note: "High trust, appointment-driven" },
              { industry: "Real Estate", open: "19.2%", click: "1.8%", note: "Listing alerts, market updates" },
              { industry: "Restaurants", open: "20.3%", click: "1.3%", note: "Promotions, loyalty programs" },
              { industry: "Professional Services", open: "22.1%", click: "2.8%", note: "Newsletters, thought leadership" },
            ].map((b) => (
              <div key={b.industry} className="bg-white p-5 border border-gray-200">
                <h3 className="text-base font-bold text-black mb-2">{b.industry}</h3>
                <div className="flex gap-4 text-base">
                  <div><span className="text-gray-400">Open:</span> <span className="font-bold">{b.open}</span></div>
                  <div><span className="text-gray-400">CTR:</span> <span className="font-bold">{b.click}</span></div>
                </div>
                <p className="text-base text-gray-400 mt-1">{b.note}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Want to Maximize Your Email Marketing ROI?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our email marketing team builds high-performing campaigns, automation flows, and segmentation strategies.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Talk to an Email Expert &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
