"use client";

import { useState } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";

type BusinessStage = "startup" | "growth" | "established" | "enterprise";
type Goal = "awareness" | "leads" | "sales" | "retention";

const stageLabels: Record<BusinessStage, string> = {
  startup: "Startup (0-2 years)",
  growth: "Growth (2-5 years)",
  established: "Established (5+ years)",
  enterprise: "Enterprise",
};

const goalLabels: Record<Goal, string> = {
  awareness: "Brand Awareness",
  leads: "Lead Generation",
  sales: "Direct Sales / Revenue",
  retention: "Customer Retention",
};

interface Allocation {
  channel: string;
  percentage: number;
  reason: string;
}

function getAllocation(budget: number, stage: BusinessStage, goal: Goal): Allocation[] {
  const base: Record<string, number> = {
    "SEO & Content": 0,
    "Google Ads (Search)": 0,
    "Social Media Ads": 0,
    "Social Media (Organic)": 0,
    "Email Marketing": 0,
    "Website & CRO": 0,
    "Branding & Creative": 0,
    "Video Production": 0,
    "Analytics & Tools": 0,
  };

  if (goal === "awareness") {
    base["Social Media Ads"] = 25;
    base["SEO & Content"] = 20;
    base["Video Production"] = 15;
    base["Social Media (Organic)"] = 15;
    base["Branding & Creative"] = 10;
    base["Google Ads (Search)"] = 5;
    base["Website & CRO"] = 5;
    base["Analytics & Tools"] = 5;
  } else if (goal === "leads") {
    base["Google Ads (Search)"] = 30;
    base["SEO & Content"] = 25;
    base["Social Media Ads"] = 15;
    base["Email Marketing"] = 10;
    base["Website & CRO"] = 10;
    base["Analytics & Tools"] = 5;
    base["Social Media (Organic)"] = 5;
  } else if (goal === "sales") {
    base["Google Ads (Search)"] = 35;
    base["Social Media Ads"] = 20;
    base["SEO & Content"] = 15;
    base["Email Marketing"] = 10;
    base["Website & CRO"] = 10;
    base["Analytics & Tools"] = 5;
    base["Social Media (Organic)"] = 5;
  } else {
    base["Email Marketing"] = 30;
    base["Social Media (Organic)"] = 20;
    base["SEO & Content"] = 15;
    base["Website & CRO"] = 15;
    base["Analytics & Tools"] = 10;
    base["Social Media Ads"] = 5;
    base["Branding & Creative"] = 5;
  }

  if (stage === "startup") {
    base["SEO & Content"] += 5;
    base["Branding & Creative"] += 5;
    base["Video Production"] = Math.max(0, (base["Video Production"] || 0) - 5);
    base["Analytics & Tools"] = Math.max(0, (base["Analytics & Tools"] || 0) - 5);
  } else if (stage === "enterprise") {
    base["Analytics & Tools"] += 5;
    base["Branding & Creative"] += 3;
    base["SEO & Content"] = Math.max(0, base["SEO & Content"] - 8);
  }

  const reasons: Record<string, string> = {
    "SEO & Content": "Long-term organic growth. Compounds over time and reduces cost per lead.",
    "Google Ads (Search)": "Immediate visibility for high-intent searches. Fastest path to qualified leads.",
    "Social Media Ads": "Targeted reach for awareness and retargeting. Best for visual products and services.",
    "Social Media (Organic)": "Community building and brand presence. Supports paid efforts with credibility.",
    "Email Marketing": "Highest ROI channel. Nurture leads and retain customers at low cost.",
    "Website & CRO": "Maximize conversions from all traffic sources. Small improvements have big impact.",
    "Branding & Creative": "Visual consistency and professional perception. Supports all other channels.",
    "Video Production": "Engaging content for social, ads, and website. Highest engagement format.",
    "Analytics & Tools": "Measurement infrastructure. You cannot optimize what you cannot measure.",
  };

  return Object.entries(base)
    .filter(([, pct]) => pct > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([channel, percentage]) => ({
      channel,
      percentage,
      reason: reasons[channel] || "",
    }));
}

export default function MarketingBudgetPlannerPage() {
  const [budget, setBudget] = useState(5000);
  const [stage, setStage] = useState<BusinessStage>("growth");
  const [goal, setGoal] = useState<Goal>("leads");
  const [showPlan, setShowPlan] = useState(false);

  const allocations = getAllocation(budget, stage, goal);

  return (
    <article>
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing Budget Planner
            </h1>
            <SectionDesc>
              Get a recommended channel allocation based on your budget, business stage, and primary marketing goal.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <Animate animation="fade-up">
            <div>
              <label htmlFor="budget" className="block text-base font-bold text-black mb-2">
                Monthly Marketing Budget
              </label>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-black">${budget.toLocaleString()}</span>
                <span className="text-base text-gray-400">/month</span>
              </div>
              <input
                id="budget"
                type="range"
                min={1000}
                max={50000}
                step={500}
                value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value))}
                className="w-full mt-2 accent-black"
              />
              <div className="flex justify-between text-base text-gray-400 mt-1">
                <span>$1,000</span>
                <span>$50,000</span>
              </div>
            </div>
          </Animate>

          <Animate animation="fade-up" delay={60}>
            <div>
              <p className="text-base font-bold text-black mb-3">Business Stage</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {(Object.keys(stageLabels) as BusinessStage[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStage(s)}
                    className={`px-4 py-3 text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      stage === s
                        ? "bg-black text-white"
                        : "border border-gray-200 text-gray-600 hover:border-black"
                    }`}
                  >
                    {stageLabels[s]}
                  </button>
                ))}
              </div>
            </div>
          </Animate>

          <Animate animation="fade-up" delay={120}>
            <div>
              <p className="text-base font-bold text-black mb-3">Primary Goal</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {(Object.keys(goalLabels) as Goal[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGoal(g)}
                    className={`px-4 py-3 text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      goal === g
                        ? "bg-black text-white"
                        : "border border-gray-200 text-gray-600 hover:border-black"
                    }`}
                  >
                    {goalLabels[g]}
                  </button>
                ))}
              </div>
            </div>
          </Animate>

          <Animate animation="fade-up" delay={180}>
            <button
              onClick={() => setShowPlan(true)}
              className="bg-black text-white px-8 py-4 text-base font-bold hover:bg-gray-900 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Generate Budget Plan
            </button>
          </Animate>
        </div>
      </section>

      {showPlan && (
        <section className="px-6 lg:px-12 pb-16">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <div className="border border-gray-200 overflow-hidden">
                <div className="bg-black text-white p-6">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                    Recommended Budget Allocation
                  </h2>
                  <p className="text-gray-400 text-base mt-1">
                    ${budget.toLocaleString()}/month &middot; {stageLabels[stage]} &middot; {goalLabels[goal]}
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  {allocations.map((a) => {
                    const amount = Math.round((budget * a.percentage) / 100);
                    return (
                      <div key={a.channel}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-base font-bold text-black">{a.channel}</span>
                          <span className="text-base font-bold text-black">
                            ${amount.toLocaleString()} <span className="text-gray-400 font-normal">({a.percentage}%)</span>
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 h-3 mb-2">
                          <div
                            className="bg-black h-3 transition-all"
                            style={{ width: `${a.percentage}%` }}
                          />
                        </div>
                        <p className="text-base text-gray-500">{a.reason}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <h3 className="font-bold text-black mb-2">Important Notes</h3>
                  <ul className="space-y-2 text-base text-gray-500">
                    <li>This is a starting framework, not a final plan. Your specific industry, competition, and existing assets will affect the optimal allocation.</li>
                    <li>Budget allocation should shift over time as you learn what works. Review and adjust quarterly.</li>
                    <li>These percentages cover agency/management fees and ad spend combined. Separate tracking of each is recommended.</li>
                  </ul>
                </div>
              </div>
            </Animate>
          </div>
        </section>
      )}

      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              Budget Planning Tips
            </h2>
            <div className="space-y-6 text-base text-gray-500 leading-relaxed">
              <div>
                <h3 className="font-bold text-black mb-2">Start with your goals, not a number</h3>
                <p>Your budget should follow your strategy, not the other way around. Define what success looks like first, then work backward to determine the investment needed.</p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Balance short-term and long-term</h3>
                <p>Paid advertising delivers fast results. SEO and content marketing compound over time. A healthy budget includes both: paid for immediate pipeline, organic for sustainable growth.</p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Account for testing</h3>
                <p>Reserve 10-15% of your budget for experimentation. Testing new channels, audiences, and creative approaches is how you find breakout opportunities.</p>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Planning Your Marketing Budget?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our strategy team will analyze your business, goals, and market to build a custom budget plan that maximizes your ROI.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Get a Custom Budget Plan &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
