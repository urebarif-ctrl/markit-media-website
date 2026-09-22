"use client";

import { useState } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

type BusinessType = "B2B" | "B2C" | "E-commerce" | "Local";
type PrimaryGoal = "Brand Awareness" | "Lead Gen" | "Sales" | "Retention";

interface ChannelAllocation {
  label: string;
  pct: number;
}

const allocations: Record<BusinessType, Record<PrimaryGoal, ChannelAllocation[]>> = {
  B2B: {
    "Brand Awareness": [
      { label: "SEO", pct: 20 },
      { label: "PPC", pct: 15 },
      { label: "Social Media", pct: 25 },
      { label: "Content", pct: 25 },
      { label: "Email", pct: 10 },
      { label: "Video", pct: 5 },
    ],
    "Lead Gen": [
      { label: "SEO", pct: 25 },
      { label: "PPC", pct: 25 },
      { label: "Social Media", pct: 10 },
      { label: "Content", pct: 20 },
      { label: "Email", pct: 15 },
      { label: "Video", pct: 5 },
    ],
    Sales: [
      { label: "SEO", pct: 20 },
      { label: "PPC", pct: 30 },
      { label: "Social Media", pct: 10 },
      { label: "Content", pct: 15 },
      { label: "Email", pct: 20 },
      { label: "Video", pct: 5 },
    ],
    Retention: [
      { label: "SEO", pct: 10 },
      { label: "PPC", pct: 5 },
      { label: "Social Media", pct: 20 },
      { label: "Content", pct: 25 },
      { label: "Email", pct: 30 },
      { label: "Video", pct: 10 },
    ],
  },
  B2C: {
    "Brand Awareness": [
      { label: "SEO", pct: 15 },
      { label: "PPC", pct: 15 },
      { label: "Social Media", pct: 30 },
      { label: "Content", pct: 15 },
      { label: "Email", pct: 10 },
      { label: "Video", pct: 15 },
    ],
    "Lead Gen": [
      { label: "SEO", pct: 20 },
      { label: "PPC", pct: 25 },
      { label: "Social Media", pct: 20 },
      { label: "Content", pct: 15 },
      { label: "Email", pct: 15 },
      { label: "Video", pct: 5 },
    ],
    Sales: [
      { label: "SEO", pct: 15 },
      { label: "PPC", pct: 30 },
      { label: "Social Media", pct: 20 },
      { label: "Content", pct: 10 },
      { label: "Email", pct: 15 },
      { label: "Video", pct: 10 },
    ],
    Retention: [
      { label: "SEO", pct: 10 },
      { label: "PPC", pct: 5 },
      { label: "Social Media", pct: 25 },
      { label: "Content", pct: 20 },
      { label: "Email", pct: 30 },
      { label: "Video", pct: 10 },
    ],
  },
  "E-commerce": {
    "Brand Awareness": [
      { label: "SEO", pct: 20 },
      { label: "PPC", pct: 20 },
      { label: "Social Media", pct: 25 },
      { label: "Content", pct: 10 },
      { label: "Email", pct: 10 },
      { label: "Video", pct: 15 },
    ],
    "Lead Gen": [
      { label: "SEO", pct: 25 },
      { label: "PPC", pct: 25 },
      { label: "Social Media", pct: 15 },
      { label: "Content", pct: 15 },
      { label: "Email", pct: 15 },
      { label: "Video", pct: 5 },
    ],
    Sales: [
      { label: "SEO", pct: 15 },
      { label: "PPC", pct: 35 },
      { label: "Social Media", pct: 15 },
      { label: "Content", pct: 5 },
      { label: "Email", pct: 20 },
      { label: "Video", pct: 10 },
    ],
    Retention: [
      { label: "SEO", pct: 10 },
      { label: "PPC", pct: 10 },
      { label: "Social Media", pct: 20 },
      { label: "Content", pct: 15 },
      { label: "Email", pct: 35 },
      { label: "Video", pct: 10 },
    ],
  },
  Local: {
    "Brand Awareness": [
      { label: "SEO", pct: 25 },
      { label: "PPC", pct: 20 },
      { label: "Social Media", pct: 25 },
      { label: "Content", pct: 15 },
      { label: "Email", pct: 10 },
      { label: "Video", pct: 5 },
    ],
    "Lead Gen": [
      { label: "SEO", pct: 30 },
      { label: "PPC", pct: 25 },
      { label: "Social Media", pct: 15 },
      { label: "Content", pct: 15 },
      { label: "Email", pct: 10 },
      { label: "Video", pct: 5 },
    ],
    Sales: [
      { label: "SEO", pct: 25 },
      { label: "PPC", pct: 30 },
      { label: "Social Media", pct: 15 },
      { label: "Content", pct: 10 },
      { label: "Email", pct: 15 },
      { label: "Video", pct: 5 },
    ],
    Retention: [
      { label: "SEO", pct: 15 },
      { label: "PPC", pct: 5 },
      { label: "Social Media", pct: 25 },
      { label: "Content", pct: 15 },
      { label: "Email", pct: 30 },
      { label: "Video", pct: 10 },
    ],
  },
};

const businessTypes: BusinessType[] = ["B2B", "B2C", "E-commerce", "Local"];
const goals: PrimaryGoal[] = ["Brand Awareness", "Lead Gen", "Sales", "Retention"];

export default function BudgetCalculatorPage() {
  const [budget, setBudget] = useState(5000);
  const [businessType, setBusinessType] = useState<BusinessType>("B2B");
  const [goal, setGoal] = useState<PrimaryGoal>("Lead Gen");

  const channels = allocations[businessType][goal];

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  const maxPct = Math.max(...channels.map((c) => c.pct));

  return (
    <article className="min-h-screen">
      <nav className="px-6 lg:px-12 pt-20" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-gray-400 max-w-7xl mx-auto">
          <li><Link href="/" className="hover:text-black transition-colors motion-reduce:transition-none">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/resources" className="hover:text-black transition-colors motion-reduce:transition-none">Resources</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-black font-medium">Budget Calculator</li>
        </ol>
      </nav>

      <section className="px-6 lg:px-12 pt-16 pb-8">
        <div className="max-w-4xl mx-auto">
          <span className="text-base font-medium text-gray-400 uppercase tracking-[0.15em]">Interactive Tools</span>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
            Marketing Budget Calculator
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
            Enter your monthly budget, business type, and primary goal to get a recommended allocation
            across six key marketing channels.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Inputs */}
          <div className="space-y-8">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">Your Inputs</h2>

            <div>
              <label htmlFor="budget" className="block text-base font-bold text-black mb-2">
                Total Monthly Budget
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="budget"
                  type="range"
                  min={1000}
                  max={50000}
                  step={500}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="flex-1 accent-black h-2"
                />
                <span className="text-base font-bold text-black w-24 text-right">{formatCurrency(budget)}</span>
              </div>
              <div className="flex justify-between text-base text-gray-400 mt-1">
                <span>$1,000</span>
                <span>$50,000</span>
              </div>
            </div>

            <fieldset>
              <legend className="block text-base font-bold text-black mb-3">Business Type</legend>
              <div className="flex flex-wrap gap-2">
                {businessTypes.map((bt) => (
                  <button
                    key={bt}
                    type="button"
                    onClick={() => setBusinessType(bt)}
                    className={`px-5 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      businessType === bt
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    aria-pressed={businessType === bt}
                  >
                    {bt}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="block text-base font-bold text-black mb-3">Primary Goal</legend>
              <div className="flex flex-wrap gap-2">
                {goals.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGoal(g)}
                    className={`px-5 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      goal === g
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    aria-pressed={goal === g}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          {/* Results */}
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">Recommended Allocation</h2>
            <div className="bg-gray-50 border border-gray-200 p-8 space-y-6">
              {channels.map((channel) => {
                const amount = Math.round(budget * (channel.pct / 100));
                const barWidth = maxPct > 0 ? (channel.pct / maxPct) * 100 : 0;
                return (
                  <div key={channel.label}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-base font-bold text-black">{channel.label}</span>
                      <span className="text-base text-gray-600">
                        {channel.pct}% &middot; {formatCurrency(amount)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 h-4" role="meter" aria-label={`${channel.label}: ${channel.pct}%`} aria-valuenow={channel.pct} aria-valuemin={0} aria-valuemax={100}>
                      <div
                        className="h-full bg-black transition-all motion-reduce:transition-none duration-300"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })}

              <div className="flex justify-between items-center pt-4 border-t border-gray-300">
                <span className="text-base font-bold text-black">Total</span>
                <span className="text-lg font-extrabold text-black">{formatCurrency(budget)}/mo</span>
              </div>
            </div>

            <p className="text-base text-gray-400 mt-4 leading-relaxed">
              These are general recommendations. Your actual allocation should be based on a custom strategy
              tailored to your industry, competition, and current marketing maturity.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">What Each Channel Covers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "SEO", desc: "Organic search visibility, technical optimization, content strategy, and link building for long-term traffic growth." },
              { title: "PPC", desc: "Google Ads, Bing Ads, and paid search campaigns for immediate visibility and measurable lead generation." },
              { title: "Social Media", desc: "Organic posting, community management, and paid social campaigns across platforms like Meta and LinkedIn." },
              { title: "Content", desc: "Blog posts, guides, case studies, and thought leadership that educate your audience and support SEO." },
              { title: "Email", desc: "Newsletter campaigns, drip sequences, segmentation, and automation to nurture leads and retain customers." },
              { title: "Video", desc: "Short-form reels, product demos, testimonials, and motion graphics for engagement across channels." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-2">{item.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
            Want a Custom Strategy?
          </h2>
          <p className="text-lg text-gray-400 mt-4 mb-8">
            This calculator gives you a starting point. Let our team build a detailed media plan based on
            your specific business, audience, and growth targets.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
            Get a Custom Strategy &rarr;
          </Link>
        </div>
      </section>
          
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/marketing-budget-planner" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Budget Planner</Link>
                <Link href="/resources/budget-allocator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Budget Allocator</Link>
                <Link href="/resources/marketing-expense-tracker" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Expense Tracker</Link>
                <Link href="/resources/pricing-calculator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Pricing Calculator</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Budget Calculator — Plan Your Ad Spend",
          description: "Use our free marketing budget calculator to get recommended budget allocations across SEO, PPC, social media, content, email, and video based on your business type and goals.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Budget Calculator"
        services={[
          { title: "Digital Marketing", desc: "Data-driven strategy with transparent reporting and insights.", href: "/services/digital-marketing" },
          { title: "Performance Marketing", desc: "Campaign optimization based on real performance data.", href: "/services/performance-marketing" },
          { title: "SEO", desc: "SEO analytics that show exactly what drives organic growth.", href: "/services/seo" },
        ]}
        relatedTools={[
          { title: "Budget Allocator", href: "/resources/budget-allocator" },
          { title: "Brand Positioning", href: "/resources/brand-positioning" },
          { title: "Brand Tone Generator", href: "/resources/brand-tone-generator" },
          { title: "Brand Voice Checker", href: "/resources/brand-voice-checker" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
