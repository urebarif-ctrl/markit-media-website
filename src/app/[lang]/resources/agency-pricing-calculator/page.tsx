"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ─── Types ─── */
type PricingModel = "hourly" | "retainer" | "project";
type RetainerTier = "basic" | "standard" | "premium";
type ProjectComplexity = "simple" | "moderate" | "complex";

interface TeamMember {
  role: string;
  label: string;
  rate: number;
  count: number;
}

interface RetainerAddOn {
  id: string;
  label: string;
  monthlyCost: number;
  enabled: boolean;
}

interface SavedEstimate {
  model: PricingModel;
  timestamp: number;
  minPrice: number;
  maxPrice: number;
  details: string;
}

/* ─── Data ─── */
const STORAGE_KEY = "agency-pricing-calculator-v1";

const defaultTeam: TeamMember[] = [
  { role: "strategist", label: "Strategist", rate: 150, count: 0 },
  { role: "designer", label: "Designer", rate: 125, count: 0 },
  { role: "developer", label: "Developer", rate: 140, count: 0 },
  { role: "copywriter", label: "Copywriter", rate: 100, count: 0 },
  { role: "pm", label: "Project Manager", rate: 120, count: 0 },
];

const retainerTierConfig: Record<
  RetainerTier,
  { label: string; hours: number; deliverables: string[]; basePrice: number }
> = {
  basic: {
    label: "Basic",
    hours: 20,
    deliverables: [
      "Monthly strategy call",
      "Basic analytics report",
      "Up to 4 content pieces",
      "Email support",
    ],
    basePrice: 2500,
  },
  standard: {
    label: "Standard",
    hours: 40,
    deliverables: [
      "Bi-weekly strategy calls",
      "Detailed analytics dashboard",
      "Up to 8 content pieces",
      "Social media management",
      "Monthly performance review",
      "Priority email and chat support",
    ],
    basePrice: 5000,
  },
  premium: {
    label: "Premium",
    hours: 80,
    deliverables: [
      "Weekly strategy calls",
      "Real-time analytics dashboard",
      "Unlimited content pieces",
      "Full social media management",
      "Paid ad management",
      "Weekly performance reviews",
      "Dedicated account manager",
      "24/7 support access",
    ],
    basePrice: 10000,
  },
};

const defaultAddOns: RetainerAddOn[] = [
  { id: "seo", label: "SEO Optimization", monthlyCost: 1500, enabled: false },
  { id: "ppc", label: "PPC Campaign Management", monthlyCost: 2000, enabled: false },
  { id: "video", label: "Video Production (2/month)", monthlyCost: 3000, enabled: false },
  { id: "email", label: "Email Marketing Automation", monthlyCost: 1200, enabled: false },
  { id: "crm", label: "CRM Integration and Management", monthlyCost: 800, enabled: false },
  { id: "brand", label: "Brand Strategy Consulting", monthlyCost: 1800, enabled: false },
];

const industryBenchmarks = [
  {
    industry: "Technology / SaaS",
    hourlyRange: "$150 - $300",
    retainerRange: "$5,000 - $25,000",
    projectRange: "$10,000 - $150,000",
  },
  {
    industry: "Healthcare",
    hourlyRange: "$125 - $275",
    retainerRange: "$4,000 - $20,000",
    projectRange: "$8,000 - $100,000",
  },
  {
    industry: "E-commerce / Retail",
    hourlyRange: "$100 - $250",
    retainerRange: "$3,000 - $15,000",
    projectRange: "$5,000 - $75,000",
  },
  {
    industry: "Financial Services",
    hourlyRange: "$175 - $350",
    retainerRange: "$7,500 - $30,000",
    projectRange: "$15,000 - $200,000",
  },
  {
    industry: "Real Estate",
    hourlyRange: "$100 - $200",
    retainerRange: "$2,500 - $12,000",
    projectRange: "$5,000 - $50,000",
  },
  {
    industry: "Professional Services",
    hourlyRange: "$125 - $250",
    retainerRange: "$3,500 - $18,000",
    projectRange: "$7,500 - $80,000",
  },
];

const pricingStrategyContent = [
  {
    title: "Cost-Plus Pricing",
    description:
      "Start with your costs (salaries, overhead, tools) and add a profit margin. This is the most straightforward approach and ensures you cover expenses while maintaining profitability. Typical agency margins range from 20% to 50%.",
  },
  {
    title: "Value-Based Pricing",
    description:
      "Price based on the value you deliver to clients rather than your costs. If your work generates $100,000 in revenue for a client, charging $15,000 reflects the value, not just the hours. This approach works best when you can clearly measure outcomes.",
  },
  {
    title: "Market-Rate Pricing",
    description:
      "Research what competitors charge for similar services and position your pricing accordingly. This keeps you competitive but requires regular market analysis. You can price above, at, or below market depending on your positioning.",
  },
  {
    title: "Tiered Pricing Strategy",
    description:
      "Offer multiple pricing tiers (good, better, best) to capture different budget levels. The middle tier typically converts best. Tiered pricing also anchors clients to higher-value options while maintaining an accessible entry point.",
  },
  {
    title: "Retainer vs. Project Trade-offs",
    description:
      "Retainers provide predictable revenue and deeper client relationships but require consistent delivery. Project-based work can command higher per-hour rates but creates revenue gaps between engagements. Most agencies target 60-70% retainer revenue.",
  },
  {
    title: "When to Raise Prices",
    description:
      "Raise prices when utilization exceeds 80%, when you consistently deliver results above expectations, when demand outpaces capacity, or annually to account for inflation. Grandfather existing clients with 90-day notice and a smaller increase.",
  },
];

/* ─── Helpers ─── */
function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

/* ─── Component ─── */


export default function AgencyPricingCalculatorPage() {
  /* Model selection */
  const [activeModel, setActiveModel] = useState<PricingModel>("hourly");

  /* Hourly model state */
  const [team, setTeam] = useState<TeamMember[]>(defaultTeam);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [overheadMultiplier, setOverheadMultiplier] = useState(1.5);
  const [profitMargin, setProfitMargin] = useState(25);

  /* Retainer model state */
  const [retainerTier, setRetainerTier] = useState<RetainerTier>("standard");
  const [retainerHours, setRetainerHours] = useState(40);
  const [addOns, setAddOns] = useState<RetainerAddOn[]>(defaultAddOns);

  /* Project model state */
  const [pagesCount, setPagesCount] = useState(10);
  const [featuresCount, setFeaturesCount] = useState(5);
  const [complexity, setComplexity] = useState<ProjectComplexity>("moderate");
  const [timelineWeeks, setTimelineWeeks] = useState(8);
  const [revisionRounds, setRevisionRounds] = useState(3);

  /* Saved estimates */
  const [savedEstimates, setSavedEstimates] = useState<SavedEstimate[]>([]);

  /* Load saved estimates on mount */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedEstimates(JSON.parse(stored));
      }
    } catch {
      /* localStorage unavailable */
    }
  }, []);

  /* ─── Hourly Calculations ─── */
  const updateTeamMember = useCallback(
    (role: string, field: "rate" | "count", value: number) => {
      setTeam((prev) =>
        prev.map((m) => (m.role === role ? { ...m, [field]: value } : m))
      );
    },
    []
  );

  const blendedRate =
    team.reduce((sum, m) => sum + m.rate * m.count, 0) /
    (team.reduce((sum, m) => sum + m.count, 0) || 1);

  const weeklyLabourCost = team.reduce((sum, m) => sum + m.rate * m.count * hoursPerWeek, 0);
  const weeklyWithOverhead = weeklyLabourCost * overheadMultiplier;
  const weeklyWithProfit = weeklyWithOverhead * (1 + profitMargin / 100);
  const monthlyHourly = weeklyWithProfit * 4.33;
  const hourlyMin = Math.round(monthlyHourly * 0.85);
  const hourlyMax = Math.round(monthlyHourly * 1.15);

  /* ─── Retainer Calculations ─── */
  const toggleAddOn = useCallback((id: string) => {
    setAddOns((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  }, []);

  const tierConfig = retainerTierConfig[retainerTier];
  const hourAdjustment = retainerHours / tierConfig.hours;
  const retainerBase = Math.round(tierConfig.basePrice * hourAdjustment);
  const addOnTotal = addOns
    .filter((a) => a.enabled)
    .reduce((sum, a) => sum + a.monthlyCost, 0);
  const retainerTotal = retainerBase + addOnTotal;
  const retainerMin = Math.round(retainerTotal * 0.9);
  const retainerMax = Math.round(retainerTotal * 1.1);

  /* ─── Project Calculations ─── */
  const complexityMultiplier: Record<ProjectComplexity, number> = {
    simple: 1.0,
    moderate: 1.5,
    complex: 2.5,
  };

  const basePerPage = 800;
  const basePerFeature = 2000;
  const revisionCostPerRound = 500;
  const timelinePressure = timelineWeeks < 6 ? 1.3 : timelineWeeks < 10 ? 1.0 : 0.9;

  const projectRaw =
    (pagesCount * basePerPage + featuresCount * basePerFeature) *
    complexityMultiplier[complexity] *
    timelinePressure +
    revisionRounds * revisionCostPerRound * pagesCount * 0.1;
  const projectMin = Math.round(projectRaw * 0.85);
  const projectMax = Math.round(projectRaw * 1.2);

  /* ─── Active model summary ─── */
  const getActivePricing = (): { min: number; max: number; label: string } => {
    switch (activeModel) {
      case "hourly":
        return { min: hourlyMin, max: hourlyMax, label: "Estimated Monthly (Hourly Model)" };
      case "retainer":
        return { min: retainerMin, max: retainerMax, label: "Estimated Monthly Retainer" };
      case "project":
        return { min: projectMin, max: projectMax, label: "Estimated Project Total" };
    }
  };

  const activePricing = getActivePricing();

  /* ─── Export as .txt ─── */
  const exportAsTxt = useCallback(() => {
    const lines: string[] = [
      "Agency Pricing Calculator - Estimate",
      "Generated by Markit Media (themarkitmedia.com)",
      `Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
      "",
      `Pricing Model: ${activeModel === "hourly" ? "Hourly Rate" : activeModel === "retainer" ? "Monthly Retainer" : "Project-Based"}`,
      `Estimated Range: ${formatCurrency(activePricing.min)} - ${formatCurrency(activePricing.max)}`,
      "",
    ];

    if (activeModel === "hourly") {
      lines.push("--- Team Composition ---");
      team.forEach((m) => {
        if (m.count > 0) {
          lines.push(`  ${m.label}: ${m.count} @ ${formatCurrency(m.rate)}/hr`);
        }
      });
      lines.push(`  Hours/Week: ${hoursPerWeek}`);
      lines.push(`  Overhead Multiplier: ${overheadMultiplier}x`);
      lines.push(`  Profit Margin: ${profitMargin}%`);
      lines.push(`  Blended Rate: ${formatCurrency(Math.round(blendedRate))}/hr`);
    } else if (activeModel === "retainer") {
      lines.push("--- Retainer Details ---");
      lines.push(`  Tier: ${tierConfig.label}`);
      lines.push(`  Monthly Hours: ${retainerHours}`);
      lines.push(`  Base Price: ${formatCurrency(retainerBase)}`);
      const enabledAddOns = addOns.filter((a) => a.enabled);
      if (enabledAddOns.length > 0) {
        lines.push("  Add-Ons:");
        enabledAddOns.forEach((a) => {
          lines.push(`    - ${a.label}: ${formatCurrency(a.monthlyCost)}/mo`);
        });
      }
    } else {
      lines.push("--- Project Details ---");
      lines.push(`  Pages/Screens: ${pagesCount}`);
      lines.push(`  Features: ${featuresCount}`);
      lines.push(`  Complexity: ${complexity}`);
      lines.push(`  Timeline: ${timelineWeeks} weeks`);
      lines.push(`  Revision Rounds: ${revisionRounds}`);
    }

    lines.push("");
    lines.push("--- Disclaimer ---");
    lines.push(
      "These are estimates based on industry averages. Actual pricing varies by provider, scope, and market."
    );

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `agency-pricing-estimate-${activeModel}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [
    activeModel,
    activePricing,
    team,
    hoursPerWeek,
    overheadMultiplier,
    profitMargin,
    blendedRate,
    tierConfig,
    retainerHours,
    retainerBase,
    addOns,
    pagesCount,
    featuresCount,
    complexity,
    timelineWeeks,
    revisionRounds,
  ]);

  /* ─── Save to localStorage ─── */
  const saveEstimate = useCallback(() => {
    const estimate: SavedEstimate = {
      model: activeModel,
      timestamp: Date.now(),
      minPrice: activePricing.min,
      maxPrice: activePricing.max,
      details:
        activeModel === "hourly"
          ? `${team.filter((m) => m.count > 0).length} roles, ${hoursPerWeek}h/wk, ${profitMargin}% margin`
          : activeModel === "retainer"
            ? `${tierConfig.label} tier, ${retainerHours}h/mo, ${addOns.filter((a) => a.enabled).length} add-ons`
            : `${pagesCount} pages, ${featuresCount} features, ${complexity}, ${timelineWeeks}wk`,
    };
    const updated = [estimate, ...savedEstimates].slice(0, 10);
    setSavedEstimates(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      /* localStorage full or unavailable */
    }
  }, [
    activeModel,
    activePricing,
    team,
    hoursPerWeek,
    profitMargin,
    tierConfig,
    retainerHours,
    addOns,
    pagesCount,
    featuresCount,
    complexity,
    timelineWeeks,
    savedEstimates,
  ]);

  const clearSaved = useCallback(() => {
    setSavedEstimates([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
  }, []);

  /* ─── Shared Styles ─── */
  const focusClasses = "focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";
  const inputClasses = `w-full border border-neutral-300 bg-white text-black px-4 py-3 text-base ${focusClasses} transition-colors duration-200 motion-reduce:transition-none hover:border-neutral-400`;
  const labelClasses = "block text-base font-bold text-black mb-2";

  const modelLabels: Record<PricingModel, string> = {
    hourly: "Hourly Rate",
    retainer: "Monthly Retainer",
    project: "Project-Based",
  };

  return (
    <article className="min-h-screen bg-white">
      {/* JSON-LD */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Agency Pricing Calculator",
          description:
            "Calculate agency service pricing across hourly, retainer, and project-based models with industry benchmarks.",
          url: "https://themarkitmedia.com/en/resources/agency-pricing-calculator",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        }}
      />

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Agency Pricing Calculator" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Page header" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Agency Pricing Calculator",
            description: "Model hourly, retainer, and project-based pricing with team composition, overhead, and profit margins",
            url: "https://themarkitmedia.com/en/resources/agency-pricing-calculator",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            provider: {
              "@type": "Organization",
              name: "Markit Media",
              url: "https://themarkitmedia.com",
            },
          }),
        }}
      />
      <title>Agency Pricing Calculator | Free Marketing Tool — Markit Media</title>
      <link rel="canonical" href="https://themarkitmedia.com/en/resources/agency-pricing-calculator" />
      <meta name="description" content="Start with your costs (salaries, overhead, tools) and add a profit margin. This is the most straightforward approach and ensures you cover expenses while mai..." />
          <Animate animation="fade-up">
            <SectionLabel>Interactive Tools</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Agency Pricing Calculator
            </h1>
            <SectionDesc>
              Estimate agency service pricing using three common models: hourly rate,
              monthly retainer, and project-based. Adjust inputs, compare industry
              benchmarks, and export your estimate.
            </SectionDesc>
            <p className="text-base text-neutral-500 mt-3">
              These are industry estimates for planning purposes, not Markit Media pricing.
              Contact us for a custom quote tailored to your needs.
            </p>
          </Animate>
        </div>
      </section>

      {/* Model Selector */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-8">
        <div className="max-w-6xl mx-auto">
          <Animate animation="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(Object.entries(modelLabels) as [PricingModel, string][]).map(
                ([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setActiveModel(value)}
                    className={`min-h-[44px] px-6 py-4 text-base font-bold border-2 transition-all duration-300 motion-reduce:transition-none cursor-pointer ${focusClasses} ${
                      activeModel === value
                        ? "border-black bg-black text-white"
                        : "border-neutral-200 bg-white text-black hover:border-neutral-400"
                    }`}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* Calculator Body */}
      <section aria-label="Team Composition" className="px-6 lg:px-12 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Inputs */}
          <div className="lg:col-span-3 space-y-10">
            {/* ─── HOURLY MODEL ─── */}
            {activeModel === "hourly" && (
              <Animate animation="fade-up">
                <div className="space-y-8">
                  <div>
                    <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                      Team Composition
                    </h2>
                    <div className="space-y-4">
                      {team.map((member) => (
                        <div
                          key={member.role}
                          className="border border-neutral-200 p-5"
                        >
                          <p className="text-base font-bold text-black mb-3">
                            {member.label}
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor={`rate-${member.role}`}
                                className={labelClasses}
                              >
                                Hourly Rate ($)
                              </label>
                              <input
                                id={`rate-${member.role}`}
                                type="number"
                                min={0}
                                max={500}
                                value={member.rate}
                                onChange={(e) =>
                                  updateTeamMember(
                                    member.role,
                                    "rate",
                                    clamp(Number(e.target.value) || 0, 0, 500)
                                  )
                                }
                                className={inputClasses}
                              />
                            </div>
                            <div>
                              <label
                                htmlFor={`count-${member.role}`}
                                className={labelClasses}
                              >
                                Headcount
                              </label>
                              <input
                                id={`count-${member.role}`}
                                type="number"
                                min={0}
                                max={20}
                                value={member.count}
                                onChange={(e) =>
                                  updateTeamMember(
                                    member.role,
                                    "count",
                                    clamp(Number(e.target.value) || 0, 0, 20)
                                  )
                                }
                                className={inputClasses}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="hours-per-week" className={labelClasses}>
                      Hours per Week (per person)
                    </label>
                    <input
                      id="hours-per-week"
                      type="number"
                      min={1}
                      max={60}
                      value={hoursPerWeek}
                      onChange={(e) =>
                        setHoursPerWeek(clamp(Number(e.target.value) || 1, 1, 60))
                      }
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="overhead" className={labelClasses}>
                      Overhead Multiplier
                    </label>
                    <p className="text-base text-neutral-500 mb-2">
                      Covers rent, tools, insurance, admin costs. Industry standard is 1.3x - 2.0x.
                    </p>
                    <input
                      id="overhead"
                      type="range"
                      min={1.0}
                      max={3.0}
                      step={0.1}
                      value={overheadMultiplier}
                      onChange={(e) => setOverheadMultiplier(Number(e.target.value))}
                      className={`w-full accent-black ${focusClasses}`}
                    />
                    <p className="text-base font-bold text-black mt-1">
                      {overheadMultiplier.toFixed(1)}x
                    </p>
                  </div>

                  <div>
                    <label htmlFor="profit-margin" className={labelClasses}>
                      Profit Margin (%)
                    </label>
                    <p className="text-base text-neutral-500 mb-2">
                      Typical agency profit margins range from 15% to 50%.
                    </p>
                    <input
                      id="profit-margin"
                      type="range"
                      min={0}
                      max={60}
                      step={5}
                      value={profitMargin}
                      onChange={(e) => setProfitMargin(Number(e.target.value))}
                      className={`w-full accent-black ${focusClasses}`}
                    />
                    <p className="text-base font-bold text-black mt-1">
                      {profitMargin}%
                    </p>
                  </div>
                </div>
              </Animate>
            )}

            {/* ─── RETAINER MODEL ─── */}
            {activeModel === "retainer" && (
              <Animate animation="fade-up">
                <div className="space-y-8">
                  <div>
                    <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                      Service Tier
                    </h2>
                    <div className="space-y-3">
                      {(
                        Object.entries(retainerTierConfig) as [
                          RetainerTier,
                          (typeof retainerTierConfig)[RetainerTier],
                        ][]
                      ).map(([key, config]) => {
                        const isSelected = retainerTier === key;
                        return (
                          <label
                            key={key}
                            className={`block border-2 p-5 cursor-pointer transition-all duration-300 motion-reduce:transition-none ${
                              isSelected
                                ? "border-black bg-black text-white"
                                : "border-neutral-200 bg-white text-black hover:border-neutral-400"
                            }`}
                          >
                            <input
                              type="radio"
                              name="retainerTier"
                              value={key}
                              checked={isSelected}
                              onChange={() => {
                                setRetainerTier(key);
                                setRetainerHours(config.hours);
                              }}
                              className="sr-only"
                            />
                            <span className="flex items-center justify-between">
                              <span className="text-base font-bold">
                                {config.label}
                              </span>
                              <span className="text-base font-bold">
                                {formatCurrency(config.basePrice)}/mo
                              </span>
                            </span>
                            <span
                              className={`text-base block mt-1 ${
                                isSelected ? "text-neutral-300" : "text-neutral-500"
                              }`}
                            >
                              {config.hours} hours/month included
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="retainer-hours" className={labelClasses}>
                      Monthly Hours
                    </label>
                    <p className="text-base text-neutral-500 mb-2">
                      Adjust hours above or below the tier default to see how pricing scales.
                    </p>
                    <input
                      id="retainer-hours"
                      type="number"
                      min={5}
                      max={200}
                      value={retainerHours}
                      onChange={(e) =>
                        setRetainerHours(clamp(Number(e.target.value) || 5, 5, 200))
                      }
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-2">
                      Included Deliverables
                    </h2>
                    <p className="text-base text-neutral-500 mb-4">
                      Standard deliverables for the {tierConfig.label} tier:
                    </p>
                    <ul className="space-y-2">
                      {tierConfig.deliverables.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-base text-neutral-600"
                        >
                          <span
                            className="w-1.5 h-1.5 bg-black flex-shrink-0 mt-2"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                      Customizable Add-Ons
                    </h2>
                    <div className="space-y-2">
                      {addOns.map((addOn) => (
                        <label
                          key={addOn.id}
                          className={`flex items-center justify-between min-h-[44px] px-4 py-3 border cursor-pointer transition-all duration-300 motion-reduce:transition-none ${
                            addOn.enabled
                              ? "border-black bg-black text-white"
                              : "border-neutral-200 bg-white text-black hover:border-neutral-400"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={addOn.enabled}
                            onChange={() => toggleAddOn(addOn.id)}
                            className="sr-only"
                            aria-label={addOn.label}
                          />
                          <span className="text-base font-medium">
                            {addOn.label}
                          </span>
                          <span className="text-base font-bold">
                            +{formatCurrency(addOn.monthlyCost)}/mo
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </Animate>
            )}

            {/* ─── PROJECT MODEL ─── */}
            {activeModel === "project" && (
              <Animate animation="fade-up">
                <div className="space-y-8">
                  <div>
                    <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                      Project Scope
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="pages-count" className={labelClasses}>
                          Pages / Screens
                        </label>
                        <input
                          id="pages-count"
                          type="number"
                          min={1}
                          max={100}
                          value={pagesCount}
                          onChange={(e) =>
                            setPagesCount(
                              clamp(Number(e.target.value) || 1, 1, 100)
                            )
                          }
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label htmlFor="features-count" className={labelClasses}>
                          Custom Features
                        </label>
                        <input
                          id="features-count"
                          type="number"
                          min={0}
                          max={50}
                          value={featuresCount}
                          onChange={(e) =>
                            setFeaturesCount(
                              clamp(Number(e.target.value) || 0, 0, 50)
                            )
                          }
                          className={inputClasses}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                      Complexity
                    </h2>
                    <div className="space-y-2">
                      {(
                        [
                          ["simple", "Simple", "Standard layouts, minimal custom logic, content-focused"],
                          ["moderate", "Moderate", "Custom components, integrations, interactive elements"],
                          ["complex", "Complex", "Advanced functionality, APIs, custom backends, animations"],
                        ] as [ProjectComplexity, string, string][]
                      ).map(([value, label, desc]) => (
                        <label
                          key={value}
                          className={`block min-h-[44px] px-4 py-3 border cursor-pointer transition-all duration-300 motion-reduce:transition-none ${
                            complexity === value
                              ? "border-black bg-black text-white"
                              : "border-neutral-200 bg-white text-black hover:border-neutral-400"
                          }`}
                        >
                          <input
                            type="radio"
                            name="complexity"
                            value={value}
                            checked={complexity === value}
                            onChange={() => setComplexity(value)}
                            className="sr-only"
                          />
                          <span className="text-base font-bold block">
                            {label}
                          </span>
                          <span
                            className={`text-base block mt-0.5 ${
                              complexity === value
                                ? "text-neutral-300"
                                : "text-neutral-500"
                            }`}
                          >
                            {desc}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="timeline-weeks" className={labelClasses}>
                      Timeline (weeks)
                    </label>
                    <p className="text-base text-neutral-500 mb-2">
                      Shorter timelines (under 6 weeks) add a rush premium. Longer timelines may reduce cost.
                    </p>
                    <input
                      id="timeline-weeks"
                      type="number"
                      min={2}
                      max={52}
                      value={timelineWeeks}
                      onChange={(e) =>
                        setTimelineWeeks(
                          clamp(Number(e.target.value) || 2, 2, 52)
                        )
                      }
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="revision-rounds" className={labelClasses}>
                      Revision Rounds
                    </label>
                    <p className="text-base text-neutral-500 mb-2">
                      Standard projects include 2-3 rounds. Additional rounds add cost.
                    </p>
                    <input
                      id="revision-rounds"
                      type="number"
                      min={1}
                      max={10}
                      value={revisionRounds}
                      onChange={(e) =>
                        setRevisionRounds(
                          clamp(Number(e.target.value) || 1, 1, 10)
                        )
                      }
                      className={inputClasses}
                    />
                  </div>
                </div>
              </Animate>
            )}
          </div>

          {/* Results Sidebar */}
          <div className="lg:col-span-2 space-y-8">
            {/* Price Summary */}
            <Animate animation="fade-up">
              <div className="border-2 border-black p-8 sticky top-24">
                <SectionLabel>{activePricing.label}</SectionLabel>
                <p className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight mt-2">
                  {formatCurrency(activePricing.min)} &ndash;{" "}
                  {formatCurrency(activePricing.max)}
                </p>

                {activeModel === "hourly" && (
                  <div className="mt-4 space-y-2">
                    <p className="text-base text-neutral-500">
                      Blended hourly rate:{" "}
                      <span className="font-bold text-black">
                        {formatCurrency(Math.round(blendedRate))}/hr
                      </span>
                    </p>
                    <p className="text-base text-neutral-500">
                      Team size:{" "}
                      <span className="font-bold text-black">
                        {team.reduce((s, m) => s + m.count, 0)} people
                      </span>
                    </p>
                  </div>
                )}

                {activeModel === "retainer" && (
                  <div className="mt-4 space-y-2">
                    <p className="text-base text-neutral-500">
                      Tier:{" "}
                      <span className="font-bold text-black">
                        {tierConfig.label}
                      </span>
                    </p>
                    <p className="text-base text-neutral-500">
                      Hours:{" "}
                      <span className="font-bold text-black">
                        {retainerHours}/mo
                      </span>
                    </p>
                    {addOns.filter((a) => a.enabled).length > 0 && (
                      <p className="text-base text-neutral-500">
                        Add-ons:{" "}
                        <span className="font-bold text-black">
                          {formatCurrency(addOnTotal)}/mo
                        </span>
                      </p>
                    )}
                  </div>
                )}

                {activeModel === "project" && (
                  <div className="mt-4 space-y-2">
                    <p className="text-base text-neutral-500">
                      Scope:{" "}
                      <span className="font-bold text-black">
                        {pagesCount} pages, {featuresCount} features
                      </span>
                    </p>
                    <p className="text-base text-neutral-500">
                      Complexity:{" "}
                      <span className="font-bold text-black capitalize">
                        {complexity}
                      </span>
                    </p>
                    <p className="text-base text-neutral-500">
                      Timeline:{" "}
                      <span className="font-bold text-black">
                        {timelineWeeks} weeks
                      </span>
                    </p>
                  </div>
                )}

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={saveEstimate}
                    className={`min-h-[44px] px-6 py-3 bg-black text-white text-base font-bold transition-colors duration-300 motion-reduce:transition-none hover:bg-neutral-800 cursor-pointer ${focusClasses}`}
                  >
                    Save Estimate
                  </button>
                  <button
                    type="button"
                    onClick={exportAsTxt}
                    className={`min-h-[44px] px-6 py-3 border-2 border-black text-black text-base font-bold transition-colors duration-300 motion-reduce:transition-none hover:bg-black hover:text-white cursor-pointer ${focusClasses}`}
                  >
                    Export as .txt
                  </button>
                </div>
              </div>
            </Animate>

            {/* Saved Estimates */}
            {savedEstimates.length > 0 && (
              <Animate animation="fade-in">
                <div className="border border-neutral-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                      Saved Estimates
                    </h2>
                    <button
                      type="button"
                      onClick={clearSaved}
                      className={`text-base text-neutral-500 hover:text-black transition-colors duration-200 motion-reduce:transition-none cursor-pointer ${focusClasses}`}
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {savedEstimates.map((est, i) => (
                      <div
                        key={`${est.timestamp}-${i}`}
                        className="border border-neutral-200 p-4"
                      >
                        <p className="text-base font-bold text-black">
                          {formatCurrency(est.minPrice)} &ndash;{" "}
                          {formatCurrency(est.maxPrice)}
                        </p>
                        <p className="text-base text-neutral-500 mt-1">
                          {modelLabels[est.model]} &middot; {est.details}
                        </p>
                        <p className="text-base text-neutral-400 mt-1">
                          {new Date(est.timestamp).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Animate>
            )}
          </div>
        </div>
      </section>

      {/* Industry Benchmarks */}
      <section aria-label="Benchmarks" className="px-6 lg:px-12 py-20 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <Animate animation="fade-up">
            <div className="text-center mb-12">
              <SectionLabel>Benchmarks</SectionLabel>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-3">
                Industry Pricing Benchmarks
              </h2>
              <div className="flex justify-center mt-4">
                <SectionDesc>
                  Typical agency pricing ranges across six industries. Use these benchmarks
                  to validate your estimates and understand market positioning.
                </SectionDesc>
              </div>
            </div>
          </Animate>

          <Animate animation="fade-up" delay={100}>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="text-left text-base font-bold px-5 py-4">
                      Industry
                    </th>
                    <th className="text-left text-base font-bold px-5 py-4">
                      Hourly Rate
                    </th>
                    <th className="text-left text-base font-bold px-5 py-4">
                      Monthly Retainer
                    </th>
                    <th className="text-left text-base font-bold px-5 py-4">
                      Project Range
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {industryBenchmarks.map((row, i) => (
                    <tr
                      key={row.industry}
                      className={i % 2 === 0 ? "bg-white" : "bg-neutral-50"}
                    >
                      <td className="text-base font-bold text-black px-5 py-4">
                        {row.industry}
                      </td>
                      <td className="text-base text-neutral-600 px-5 py-4">
                        {row.hourlyRange}
                      </td>
                      <td className="text-base text-neutral-600 px-5 py-4">
                        {row.retainerRange}
                      </td>
                      <td className="text-base text-neutral-600 px-5 py-4">
                        {row.projectRange}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-base text-neutral-500 mt-4">
              Source: Aggregated from industry surveys and publicly available agency pricing data (2024-2025).
              Ranges reflect U.S. market averages.
            </p>
          </Animate>
        </div>
      </section>

      {/* Pricing Strategy Education */}
      <section aria-label="Strategy Guide" className="px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <Animate animation="fade-up">
            <div className="text-center mb-12">
              <SectionLabel>Strategy Guide</SectionLabel>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-3">
                Agency Pricing Strategy
              </h2>
              <div className="flex justify-center mt-4">
                <SectionDesc>
                  Understanding the principles behind agency pricing helps you set
                  rates that are competitive, sustainable, and aligned with the value
                  you deliver.
                </SectionDesc>
              </div>
            </div>
          </Animate>
          <Stagger
            stagger={120}
            animation="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {pricingStrategyContent.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-neutral-200 p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  {item.title}
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>
      {/* Related Tools */}
      <section aria-label="Related Tools" className="px-6 lg:px-12 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/pricing-calculator" className="border border-gray-200 bg-white px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors">Pricing Calculator</Link>
                <Link href="/resources/budget-calculator" className="border border-gray-200 bg-white px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors">Budget Calculator</Link>
                <Link href="/resources/marketing-proposal-generator" className="border border-gray-200 bg-white px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors">Marketing Proposal Generator</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Call to action" className="bg-black text-white px-6 lg:px-12 py-16 text-center">
        <Animate animation="fade-up">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold mb-4">
            Need Help Setting Your Agency Pricing?
          </h2>
          <p className="text-base text-neutral-300 mb-8 max-w-2xl mx-auto">
            Our team can help you build a pricing strategy that reflects your value,
            covers your costs, and wins the right clients.
          </p>
          <Link
            href="/contact"
            className={`inline-block bg-white text-black font-bold px-8 py-3 text-base hover:bg-neutral-200 transition-colors duration-300 motion-reduce:transition-none ${focusClasses}`}
          >
            Get in Touch
          </Link>
        </Animate>
      </section>
    
      <ToolCTA
        toolName="Agency Pricing Calculator"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Agency Comparison", href: "/resources/agency-comparison" },
          { title: "Audience Targeting Worksheet", href: "/resources/audience-targeting-worksheet" },
          { title: "Ad Budget Pacing", href: "/resources/ad-budget-pacing" },
          { title: "Ad Copy Analyzer", href: "/resources/ad-copy-analyzer" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
