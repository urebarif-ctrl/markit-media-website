"use client";

import { useState } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Industry =
  | "Legal"
  | "Healthcare"
  | "E-commerce"
  | "SaaS"
  | "Real Estate"
  | "Education"
  | "Finance"
  | "Travel"
  | "Automotive"
  | "Home Services"
  | "Restaurants"
  | "Fitness"
  | "B2B Services"
  | "Retail"
  | "Technology";

type Location = "US" | "Canada" | "UK" | "UAE" | "Australia" | "Saudi Arabia" | "Other";

type Goal = "Sales" | "Leads" | "Website Traffic" | "Brand Awareness";

interface IndustryData {
  cpcLow: number;
  cpcHigh: number;
  ctr: number;          // percent
  conversionRate: number; // percent
}

const industryData: Record<Industry, IndustryData> = {
  Legal:          { cpcLow: 3.00, cpcHigh: 8.00, ctr: 3.5, conversionRate: 2.5 },
  Healthcare:     { cpcLow: 2.00, cpcHigh: 5.50, ctr: 3.2, conversionRate: 3.0 },
  "E-commerce":   { cpcLow: 0.50, cpcHigh: 2.00, ctr: 4.5, conversionRate: 3.5 },
  SaaS:           { cpcLow: 2.00, cpcHigh: 6.00, ctr: 3.0, conversionRate: 2.8 },
  "Real Estate":  { cpcLow: 1.50, cpcHigh: 4.50, ctr: 3.8, conversionRate: 2.5 },
  Education:      { cpcLow: 1.00, cpcHigh: 3.50, ctr: 4.0, conversionRate: 3.5 },
  Finance:        { cpcLow: 3.00, cpcHigh: 7.00, ctr: 3.0, conversionRate: 2.2 },
  Travel:         { cpcLow: 0.80, cpcHigh: 2.50, ctr: 4.2, conversionRate: 3.8 },
  Automotive:     { cpcLow: 1.50, cpcHigh: 4.00, ctr: 3.6, conversionRate: 3.0 },
  "Home Services":{ cpcLow: 2.00, cpcHigh: 6.00, ctr: 3.8, conversionRate: 4.0 },
  Restaurants:    { cpcLow: 0.50, cpcHigh: 1.80, ctr: 5.0, conversionRate: 4.5 },
  Fitness:        { cpcLow: 1.00, cpcHigh: 3.00, ctr: 4.0, conversionRate: 3.8 },
  "B2B Services": { cpcLow: 2.50, cpcHigh: 6.50, ctr: 2.8, conversionRate: 2.5 },
  Retail:         { cpcLow: 0.60, cpcHigh: 2.00, ctr: 4.8, conversionRate: 3.2 },
  Technology:     { cpcLow: 2.00, cpcHigh: 5.00, ctr: 3.2, conversionRate: 2.8 },
};

const industries: Industry[] = Object.keys(industryData) as Industry[];

const locations: Location[] = ["US", "Canada", "UK", "UAE", "Australia", "Saudi Arabia", "Other"];

const goals: Goal[] = ["Sales", "Leads", "Website Traffic", "Brand Awareness"];

const locationMultiplier: Record<Location, number> = {
  US: 1.0,
  Canada: 0.9,
  UK: 0.95,
  UAE: 0.85,
  Australia: 0.92,
  "Saudi Arabia": 0.80,
  Other: 0.75,
};

const goalConversionMultiplier: Record<Goal, number> = {
  Sales: 0.9,
  Leads: 1.1,
  "Website Traffic": 0.7,
  "Brand Awareness": 0.5,
};

/* ------------------------------------------------------------------ */
/*  Benchmark table data (10 industries)                              */
/* ------------------------------------------------------------------ */

const benchmarkIndustries: Industry[] = [
  "Legal", "E-commerce", "SaaS", "Real Estate", "Healthcare",
  "Finance", "Travel", "Home Services", "Retail", "Technology",
];

/* ------------------------------------------------------------------ */
/*  Tips                                                               */
/* ------------------------------------------------------------------ */

const tips = [
  {
    title: "Use Negative Keywords",
    desc: "Regularly add negative keywords to prevent your ads from showing for irrelevant searches. This reduces wasted spend and improves your click-through rate.",
  },
  {
    title: "Optimize Landing Pages",
    desc: "Send traffic to dedicated, fast-loading landing pages that match your ad copy. A strong landing page can double your conversion rate.",
  },
  {
    title: "Test Ad Copy Relentlessly",
    desc: "Run A/B tests on headlines, descriptions, and calls to action. Small copy changes can produce significant improvements in CTR and conversions.",
  },
  {
    title: "Leverage Smart Bidding",
    desc: "Use Google's automated bid strategies like Target CPA or Target ROAS once you have enough conversion data. They optimize bids in real time.",
  },
  {
    title: "Track Every Conversion",
    desc: "Set up conversion tracking for calls, forms, purchases, and chat interactions. Without accurate data, you cannot optimize effectively.",
  },
];

/* ------------------------------------------------------------------ */
/*  Formatters                                                         */
/* ------------------------------------------------------------------ */

function fmtMoney(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);
}

function fmtMoneyWhole(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtNumber(n: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */



export default function GoogleAdsEstimatorPage() {
  const [industry, setIndustry] = useState<Industry>("E-commerce");
  const [location, setLocation] = useState<Location>("US");
  const [budget, setBudget] = useState(3000);
  const [goal, setGoal] = useState<Goal>("Leads");

  /* --- Calculations --- */
  const data = industryData[industry];
  const locMult = locationMultiplier[location];
  const goalMult = goalConversionMultiplier[goal];

  const adjustedCpcLow = data.cpcLow * locMult;
  const adjustedCpcHigh = data.cpcHigh * locMult;
  const avgCpc = (adjustedCpcLow + adjustedCpcHigh) / 2;

  const estClicksLow = Math.round(budget / adjustedCpcHigh);
  const estClicksHigh = Math.round(budget / adjustedCpcLow);

  const effectiveConvRate = data.conversionRate * goalMult;
  const estConversionsLow = Math.round(estClicksLow * (effectiveConvRate / 100));
  const estConversionsHigh = Math.round(estClicksHigh * (effectiveConvRate / 100));
  const avgConversions = (estConversionsLow + estConversionsHigh) / 2;

  const costPerConversionLow = estConversionsHigh > 0 ? budget / estConversionsHigh : 0;
  const costPerConversionHigh = estConversionsLow > 0 ? budget / estConversionsLow : 0;

  const dailyBudget = budget / 30.4;

  /* --- Shared styles --- */
  const selectClass =
    "w-full px-4 py-3 border border-gray-200 bg-white text-base text-black appearance-none focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none min-h-[44px]";

  return (
    <article className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Google Ads Budget Estimator",
          description: "Estimate your Google Ads performance based on industry, location, budget, and campaign goal. See projected CPC, clicks, conversions, and cost per conversion.",
          url: "https://themarkitmedia.com/en/resources/google-ads-estimator",
          applicationCategory: "Advertising Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Google Ads Budget Estimator | Free Marketing Tool — Markit Media</title>
      <link rel="canonical" href="https://themarkitmedia.com/en/resources/google-ads-estimator" />
      <meta name="description" content="Estimate your Google Ads performance based on industry, location, budget, and campaign goal. See projected CPC, clicks, conversions, and cost per conversion." />
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/ad-copy-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Ad Copy Generator</Link>
                <Link href="/resources/ad-copy-analyzer" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Ad Copy Analyzer</Link>
                <Link href="/resources/ad-spend-calculator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Ad Spend Calculator</Link>
                <Link href="/resources/ad-budget-pacing" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Ad Budget Pacing</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Google Ads Budget Estimator",
          description:
            "Estimate your Google Ads performance based on industry, location, budget, and campaign goal. See projected CPC, clicks, conversions, and cost per conversion.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Google Ads Estimator" },
        ]}
      />

      {/* --- Hero --- */}
      <section aria-label="Interactive Tools" className="px-6 lg:px-12 pt-16 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Interactive Tools</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Google Ads Budget Estimator
            </h1>
            <SectionDesc>
              Estimate how far your Google Ads budget can go. Select your industry, target
              location, budget, and campaign goal to see projected clicks, conversions, and
              cost benchmarks.
            </SectionDesc>
            <p className="text-base text-gray-400 mt-3">
              Note: Estimates use industry averages and may vary based on competition,
              seasonality, ad quality, and targeting.
            </p>
          </Animate>
        </div>
      </section>

      {/* --- Calculator --- */}
      <section aria-label="Your Campaign Settings" className="px-6 lg:px-12 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Inputs */}
          <Animate animation="fade-up" delay={100}>
            <div className="space-y-8">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                Your Campaign Settings
              </h2>

              {/* Industry */}
              <div>
                <label htmlFor="industry" className="block text-base font-bold text-black mb-2">
                  Industry
                </label>
                <select
                  id="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value as Industry)}
                  className={selectClass}
                >
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-base font-bold text-black mb-2">
                  Target Location
                </label>
                <select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value as Location)}
                  className={selectClass}
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div>
                <label htmlFor="budget" className="block text-base font-bold text-black mb-2">
                  Monthly Budget
                </label>
                <div className="flex items-center gap-4">
                  <input
                    id="budget"
                    type="range"
                    min={500}
                    max={50000}
                    step={250}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="flex-1 accent-black h-2 min-h-[44px]"
                  />
                  <span className="text-base font-bold text-black w-28 text-right">
                    {fmtMoneyWhole(budget)}
                  </span>
                </div>
                <div className="flex justify-between text-base text-gray-400 mt-1">
                  <span>$500</span>
                  <span>$50,000</span>
                </div>
              </div>

              {/* Campaign Goal */}
              <fieldset>
                <legend className="block text-base font-bold text-black mb-3">
                  Campaign Goal
                </legend>
                <div className="flex flex-wrap gap-2">
                  {goals.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGoal(g)}
                      className={`px-5 py-3 text-base font-bold transition-colors motion-reduce:transition-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
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
          </Animate>

          {/* Results */}
          <Animate animation="fade-up" delay={200}>
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                What Your Budget Gets You
              </h2>
              <div className="bg-gray-50 border border-gray-200 p-8 space-y-0">
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                  <span className="text-base text-gray-600">Estimated CPC</span>
                  <span className="text-base font-bold text-black">
                    {fmtMoney(adjustedCpcLow)} &ndash; {fmtMoney(adjustedCpcHigh)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                  <span className="text-base text-gray-600">Estimated Monthly Clicks</span>
                  <span className="text-base font-bold text-black">
                    {fmtNumber(estClicksLow)} &ndash; {fmtNumber(estClicksHigh)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                  <span className="text-base text-gray-600">Estimated Conversions</span>
                  <span className="text-base font-bold text-black">
                    {fmtNumber(estConversionsLow)} &ndash; {fmtNumber(estConversionsHigh)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                  <span className="text-base text-gray-600">Cost per Conversion</span>
                  <span className="text-base font-bold text-black">
                    {costPerConversionLow > 0 ? fmtMoney(costPerConversionLow) : "N/A"} &ndash;{" "}
                    {costPerConversionHigh > 0 ? fmtMoney(costPerConversionHigh) : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-4 bg-black text-white px-6 -mx-8 -mb-8">
                  <span className="text-base font-bold">Recommended Daily Budget</span>
                  <span className="text-2xl font-extrabold">{fmtMoney(dailyBudget)}</span>
                </div>
              </div>

              <div className="mt-6 bg-gray-50 border border-gray-200 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">
                  Quick Summary
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  With a <strong className="text-black">{fmtMoneyWhole(budget)}/mo</strong> budget
                  in <strong className="text-black">{industry}</strong> targeting{" "}
                  <strong className="text-black">{location}</strong>, you can expect roughly{" "}
                  <strong className="text-black">{fmtNumber(Math.round((estClicksLow + estClicksHigh) / 2))} clicks</strong> and{" "}
                  <strong className="text-black">
                    {fmtNumber(Math.round(avgConversions))} conversions
                  </strong>{" "}
                  per month at an average CPC of{" "}
                  <strong className="text-black">{fmtMoney(avgCpc)}</strong>.
                </p>
              </div>

              <p className="text-base text-gray-400 mt-4 leading-relaxed">
                These projections assume average ad quality and competition levels. Actual
                performance depends on targeting, ad copy, landing page quality, and bid
                strategy.
              </p>
            </div>
          </Animate>
        </div>
      </section>

      {/* --- Benchmarks --- */}
      <section aria-label="Benchmarks" className="px-6 lg:px-12 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Benchmarks</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight">
              Benchmarks by Industry
            </h2>
            <SectionDesc>
              Average Google Ads performance metrics across major industries. Use these as a
              baseline when planning your campaigns.
            </SectionDesc>
          </Animate>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="py-4 pr-6 text-base font-extrabold text-black font-[family-name:var(--font-display)]">
                    Industry
                  </th>
                  <th className="py-4 pr-6 text-base font-extrabold text-black font-[family-name:var(--font-display)]">
                    Avg. CPC
                  </th>
                  <th className="py-4 pr-6 text-base font-extrabold text-black font-[family-name:var(--font-display)]">
                    Avg. CTR
                  </th>
                  <th className="py-4 text-base font-extrabold text-black font-[family-name:var(--font-display)]">
                    Avg. Conv. Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {benchmarkIndustries.map((ind) => {
                  const d = industryData[ind];
                  const avgCpcVal = (d.cpcLow + d.cpcHigh) / 2;
                  return (
                    <tr key={ind} className="border-b border-gray-200">
                      <td className="py-4 pr-6 text-base font-bold text-black">{ind}</td>
                      <td className="py-4 pr-6 text-base text-gray-600">{fmtMoney(avgCpcVal)}</td>
                      <td className="py-4 pr-6 text-base text-gray-600">{d.ctr}%</td>
                      <td className="py-4 text-base text-gray-600">{d.conversionRate}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- Tips --- */}
      <section aria-label="Expert Advice" className="px-6 lg:px-12 py-16">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Expert Advice</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight">
              5 Tips for Maximizing Google Ads ROI
            </h2>
          </Animate>

          <Stagger stagger={100} animation="fade-up" className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, i) => (
              <div
                key={tip.title}
                className="border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
              >
                <span className="text-base font-bold text-gray-400 mb-2 block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-2">
                  {tip.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* --- CTA --- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Launch a High-Performing Campaign?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              These estimates are a starting point. Let our Google Ads specialists build a
              custom strategy tailored to your business, audience, and growth targets.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Google Ads Estimator"
        services={[
          { title: "Performance Marketing", desc: "Google Ads, Meta Ads, and PPC campaigns that maximize ROAS.", href: "/services/performance-marketing" },
          { title: "Digital Marketing", desc: "Integrated strategy across all channels for measurable growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Complement paid with organic — reduce dependency on ad spend over time.", href: "/services/seo" },
        ]}
        relatedTools={[
          { title: "Email Subject Tester", href: "/resources/email-subject-tester" },
          { title: "Email Warmup Planner", href: "/resources/email-warmup-planner" },
          { title: "Experiment Tracker", href: "/resources/experiment-tracker" },
          { title: "Funnel Calculator", href: "/resources/funnel-calculator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
