"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ─── Types ─── */
type BusinessSize = "startup" | "small" | "medium" | "enterprise";
type EngagementType = "retainer" | "project" | "performance";
type Urgency = "standard" | "priority";

interface ServiceOption {
  id: string;
  label: string;
  description: string;
}

interface PriceRange {
  low: number;
  high: number;
}

/* ─── Data ─── */
const businessSizeLabels: Record<BusinessSize, string> = {
  startup: "Startup",
  small: "Small Business",
  medium: "Medium Business",
  enterprise: "Enterprise",
};

const engagementLabels: Record<EngagementType, string> = {
  retainer: "Monthly Retainer",
  project: "Project-Based",
  performance: "Performance-Based",
};

const urgencyLabels: Record<Urgency, string> = {
  standard: "Standard Timeline",
  priority: "Priority (Expedited)",
};

const services: ServiceOption[] = [
  { id: "seo", label: "SEO", description: "Search engine optimization and organic growth" },
  { id: "ppc", label: "PPC Advertising", description: "Pay-per-click campaigns across platforms" },
  { id: "social", label: "Social Media", description: "Organic and paid social media management" },
  { id: "email", label: "Email Marketing", description: "Email campaigns, automation, and nurture sequences" },
  { id: "content", label: "Content Marketing", description: "Blog posts, articles, and content strategy" },
  { id: "webdev", label: "Web Development", description: "Website design, development, and maintenance" },
  { id: "branding", label: "Branding", description: "Brand identity, messaging, and creative assets" },
  { id: "video", label: "Video Production", description: "Video content creation and editing" },
];

/* Typical industry ranges per service per business size (monthly) */
const serviceRanges: Record<string, Record<BusinessSize, PriceRange>> = {
  seo: {
    startup: { low: 500, high: 1500 },
    small: { low: 1000, high: 3000 },
    medium: { low: 2500, high: 7500 },
    enterprise: { low: 5000, high: 15000 },
  },
  ppc: {
    startup: { low: 500, high: 2000 },
    small: { low: 1500, high: 5000 },
    medium: { low: 3000, high: 10000 },
    enterprise: { low: 7500, high: 25000 },
  },
  social: {
    startup: { low: 400, high: 1200 },
    small: { low: 1000, high: 3000 },
    medium: { low: 2000, high: 6000 },
    enterprise: { low: 4000, high: 12000 },
  },
  email: {
    startup: { low: 300, high: 800 },
    small: { low: 500, high: 2000 },
    medium: { low: 1500, high: 4000 },
    enterprise: { low: 3000, high: 8000 },
  },
  content: {
    startup: { low: 500, high: 1500 },
    small: { low: 1000, high: 3500 },
    medium: { low: 2500, high: 7000 },
    enterprise: { low: 5000, high: 15000 },
  },
  webdev: {
    startup: { low: 1000, high: 3000 },
    small: { low: 2000, high: 7500 },
    medium: { low: 5000, high: 15000 },
    enterprise: { low: 10000, high: 40000 },
  },
  branding: {
    startup: { low: 500, high: 2000 },
    small: { low: 1500, high: 5000 },
    medium: { low: 3000, high: 10000 },
    enterprise: { low: 7500, high: 25000 },
  },
  video: {
    startup: { low: 500, high: 2000 },
    small: { low: 1500, high: 5000 },
    medium: { low: 3000, high: 10000 },
    enterprise: { low: 5000, high: 20000 },
  },
};

/* Deliverables per service */
const serviceDeliverables: Record<string, Record<BusinessSize, string[]>> = {
  seo: {
    startup: ["Technical SEO audit", "5-10 target keywords", "Monthly reporting"],
    small: ["Full technical audit", "15-25 target keywords", "On-page optimization", "Monthly reporting"],
    medium: ["Comprehensive audit", "30-50 keywords", "On-page + off-page SEO", "Link building", "Bi-weekly reporting"],
    enterprise: ["Enterprise-level audit", "100+ keywords", "Full SEO program", "Dedicated strategist", "Weekly reporting"],
  },
  ppc: {
    startup: ["1-2 campaign setups", "Ad copywriting", "Monthly optimization"],
    small: ["3-5 campaigns", "A/B testing", "Bid management", "Bi-weekly optimization"],
    medium: ["5-10 campaigns", "Multi-platform ads", "Advanced bidding", "Weekly optimization"],
    enterprise: ["Full-funnel campaigns", "Multi-platform strategy", "Custom audiences", "Daily optimization"],
  },
  social: {
    startup: ["2-3 platforms", "8-12 posts/month", "Community monitoring"],
    small: ["3-4 platforms", "12-20 posts/month", "Community management", "Monthly analytics"],
    medium: ["4-5 platforms", "20-30 posts/month", "Paid social", "Influencer outreach"],
    enterprise: ["All major platforms", "Daily posting", "Full paid social", "Influencer programs", "Crisis management"],
  },
  email: {
    startup: ["List setup", "2-4 campaigns/month", "Basic automation"],
    small: ["List segmentation", "4-8 campaigns/month", "Nurture sequences", "A/B testing"],
    medium: ["Advanced segmentation", "8-12 campaigns/month", "Multi-step automation", "Personalization"],
    enterprise: ["Full CRM integration", "Unlimited campaigns", "Advanced automation", "Dynamic content"],
  },
  content: {
    startup: ["2-4 blog posts/month", "Content calendar", "Basic keyword research"],
    small: ["4-8 blog posts/month", "Content strategy", "SEO-optimized content", "Social repurposing"],
    medium: ["8-12 pieces/month", "Full content strategy", "Long-form guides", "Case studies"],
    enterprise: ["12+ pieces/month", "Multi-format content", "Thought leadership", "Research reports"],
  },
  webdev: {
    startup: ["Template-based site", "Mobile responsive", "Basic SEO setup", "Contact forms"],
    small: ["Custom design", "CMS integration", "Speed optimization", "Analytics setup"],
    medium: ["Full custom build", "Advanced functionality", "CRM integration", "Ongoing maintenance"],
    enterprise: ["Enterprise platform", "Custom integrations", "Multi-site management", "24/7 support"],
  },
  branding: {
    startup: ["Logo design", "Color palette", "Basic brand guidelines"],
    small: ["Full logo suite", "Brand guidelines", "Business collateral", "Social templates"],
    medium: ["Complete brand identity", "Brand messaging", "Marketing templates", "Brand training"],
    enterprise: ["Enterprise brand system", "Multi-brand architecture", "Global guidelines", "Brand governance"],
  },
  video: {
    startup: ["1-2 videos/month", "Basic editing", "Social-ready formats"],
    small: ["2-4 videos/month", "Professional editing", "Motion graphics", "Platform optimization"],
    medium: ["4-6 videos/month", "Scripting + storyboarding", "Advanced editing", "Multi-format delivery"],
    enterprise: ["8+ videos/month", "Full production", "Animation", "Episodic series", "Distribution strategy"],
  },
};

const engagementMultipliers: Record<EngagementType, { low: number; high: number }> = {
  retainer: { low: 1.0, high: 1.0 },
  project: { low: 1.1, high: 1.3 },
  performance: { low: 0.8, high: 1.5 },
};

const urgencyMultipliers: Record<Urgency, { low: number; high: number }> = {
  standard: { low: 1.0, high: 1.0 },
  priority: { low: 1.2, high: 1.5 },
};

const engagementRecommendations: Record<EngagementType, string> = {
  retainer: "Monthly retainers typically offer the best value for ongoing marketing needs, with consistent execution and optimization over time.",
  project: "Project-based pricing works well for one-time initiatives like website launches, brand refreshes, or campaign sprints with defined deliverables.",
  performance: "Performance-based models tie costs to results. The base investment may be lower, but total cost scales with success metrics.",
};

const pricingFactors = [
  {
    title: "Industry Complexity",
    description: "Highly regulated or competitive industries (finance, healthcare, legal) typically require more specialized expertise and compliance oversight, affecting overall investment.",
  },
  {
    title: "Geographic Targeting",
    description: "Local campaigns cost less than national or international efforts. Multi-market strategies require additional research, localization, and platform management.",
  },
  {
    title: "Current Digital Presence",
    description: "Starting from scratch requires more upfront investment than optimizing existing assets. A strong foundation reduces the initial setup costs.",
  },
  {
    title: "Goals and Timelines",
    description: "Aggressive growth targets or compressed timelines require more resources. Realistic pacing allows for more cost-effective, sustainable strategies.",
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

function getRecommendedEngagement(
  selectedServices: string[],
  businessSize: BusinessSize
): string {
  if (selectedServices.length >= 4 || businessSize === "enterprise" || businessSize === "medium") {
    return "Monthly retainer for consistent multi-channel execution";
  }
  if (selectedServices.length === 1 && (businessSize === "startup" || businessSize === "small")) {
    return "Project-based engagement to test with a focused scope";
  }
  return "Monthly retainer for steady, compounding results";
}

/* ─── Component ─── */
export default function PricingCalculatorPage() {
  const [businessSize, setBusinessSize] = useState<BusinessSize>("small");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [engagement, setEngagement] = useState<EngagementType>("retainer");
  const [urgency, setUrgency] = useState<Urgency>("standard");

  const toggleService = useCallback((serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((s) => s !== serviceId) : [...prev, serviceId]
    );
  }, []);

  /* Calculate totals */
  const serviceBreakdown = selectedServices.map((id) => {
    const range = serviceRanges[id]?.[businessSize] ?? { low: 0, high: 0 };
    const engMul = engagementMultipliers[engagement];
    const urgMul = urgencyMultipliers[urgency];
    return {
      id,
      label: services.find((s) => s.id === id)?.label ?? id,
      low: Math.round(range.low * engMul.low * urgMul.low),
      high: Math.round(range.high * engMul.high * urgMul.high),
    };
  });

  const totalLow = serviceBreakdown.reduce((sum, s) => sum + s.low, 0);
  const totalHigh = serviceBreakdown.reduce((sum, s) => sum + s.high, 0);

  const allDeliverables = selectedServices.flatMap(
    (id) => serviceDeliverables[id]?.[businessSize] ?? []
  );

  const hasSelections = selectedServices.length > 0;

  return (
    <article className="min-h-screen bg-white">
      {/* JSON-LD */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Pricing Calculator",
          description:
            "Estimate typical industry pricing for digital marketing services based on business size, services needed, and engagement model.",
          url: "https://themarkitmedia.com/en/resources/pricing-calculator",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "USD",
            lowPrice: "300",
            highPrice: "40000",
            offerCount: services.length,
          },
        }}
      />

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Pricing Calculator" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Interactive Tools" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Interactive Tools</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing Pricing Calculator
            </h1>
            <SectionDesc>
              Get a ballpark estimate of typical industry pricing for digital marketing services.
              Select your business size, choose the services you need, and see what companies
              in your category typically invest.
            </SectionDesc>
            <p className="text-base text-gray-500 mt-3">
              These are industry estimates based on publicly available benchmarks, not Markit Media pricing.
              Contact us for a custom quote tailored to your specific needs.
            </p>
          </Animate>
        </div>
      </section>

      {/* Calculator */}
      <section aria-label="Business Size" className="px-6 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Inputs - Left Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Business Size */}
            <Animate animation="fade-up">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                  Business Size
                </h2>
                <div className="space-y-2">
                  {(Object.entries(businessSizeLabels) as [BusinessSize, string][]).map(
                    ([value, label]) => (
                      <label
                        key={value}
                        className={`flex items-center gap-3 min-h-[44px] px-4 py-3 border cursor-pointer transition-all duration-300 motion-reduce:transition-none ${
                          businessSize === value
                            ? "border-black bg-black text-white"
                            : "border-gray-200 bg-white text-black hover:border-gray-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="businessSize"
                          value={value}
                          checked={businessSize === value}
                          onChange={() => setBusinessSize(value)}
                          className="sr-only"
                        />
                        <span className="text-base font-medium">{label}</span>
                      </label>
                    )
                  )}
                </div>
              </div>
            </Animate>

            {/* Services */}
            <Animate animation="fade-up" delay={100}>
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                  Services Needed
                </h2>
                <p className="text-base text-gray-500 mb-3">Select all that apply.</p>
                <div className="space-y-2">
                  {services.map((service) => {
                    const isSelected = selectedServices.includes(service.id);
                    return (
                      <label
                        key={service.id}
                        className={`flex items-start gap-3 min-h-[44px] px-4 py-3 border cursor-pointer transition-all duration-300 motion-reduce:transition-none ${
                          isSelected
                            ? "border-black bg-black text-white"
                            : "border-gray-200 bg-white text-black hover:border-gray-400"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleService(service.id)}
                          className="sr-only"
                          aria-label={service.label}
                        />
                        <div className="flex-1">
                          <span className="text-base font-medium block">{service.label}</span>
                          <span
                            className={`text-base block mt-0.5 ${
                              isSelected ? "text-gray-300" : "text-gray-500"
                            }`}
                          >
                            {service.description}
                          </span>
                        </div>
                        <span
                          className={`w-5 h-5 flex-shrink-0 border-2 mt-0.5 flex items-center justify-center transition-colors duration-200 motion-reduce:transition-none ${
                            isSelected ? "border-white bg-white" : "border-gray-300 bg-white"
                          }`}
                          aria-hidden="true"
                        >
                          {isSelected && (
                            <svg
                              className="w-3 h-3 text-black"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </Animate>

            {/* Engagement Type */}
            <Animate animation="fade-up" delay={200}>
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                  Engagement Type
                </h2>
                <div className="space-y-2">
                  {(Object.entries(engagementLabels) as [EngagementType, string][]).map(
                    ([value, label]) => (
                      <label
                        key={value}
                        className={`flex items-center gap-3 min-h-[44px] px-4 py-3 border cursor-pointer transition-all duration-300 motion-reduce:transition-none ${
                          engagement === value
                            ? "border-black bg-black text-white"
                            : "border-gray-200 bg-white text-black hover:border-gray-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="engagement"
                          value={value}
                          checked={engagement === value}
                          onChange={() => setEngagement(value)}
                          className="sr-only"
                        />
                        <span className="text-base font-medium">{label}</span>
                      </label>
                    )
                  )}
                </div>
              </div>
            </Animate>

            {/* Urgency */}
            <Animate animation="fade-up" delay={300}>
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                  Urgency
                </h2>
                <div className="space-y-2">
                  {(Object.entries(urgencyLabels) as [Urgency, string][]).map(
                    ([value, label]) => (
                      <label
                        key={value}
                        className={`flex items-center gap-3 min-h-[44px] px-4 py-3 border cursor-pointer transition-all duration-300 motion-reduce:transition-none ${
                          urgency === value
                            ? "border-black bg-black text-white"
                            : "border-gray-200 bg-white text-black hover:border-gray-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="urgency"
                          value={value}
                          checked={urgency === value}
                          onChange={() => setUrgency(value)}
                          className="sr-only"
                        />
                        <span className="text-base font-medium">{label}</span>
                      </label>
                    )
                  )}
                </div>
              </div>
            </Animate>
          </div>

          {/* Results - Right Column */}
          <div className="lg:col-span-3 space-y-10">
            {!hasSelections ? (
              <Animate animation="fade-in">
                <div className="border-2 border-dashed border-gray-200 p-12 text-center">
                  <p className="text-lg text-gray-400 font-medium">
                    Select at least one service to see your estimate
                  </p>
                  <p className="text-base text-gray-400 mt-2">
                    Choose from the services on the left to get started.
                  </p>
                </div>
              </Animate>
            ) : (
              <>
                {/* Total Estimate */}
                <Animate animation="fade-up">
                  <div className="border-2 border-black p-8">
                    <SectionLabel>Estimated Monthly Investment</SectionLabel>
                    <p className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight mt-2">
                      {formatCurrency(totalLow)} &ndash; {formatCurrency(totalHigh)}
                      <span className="text-base font-medium text-gray-500 ml-2">/month</span>
                    </p>
                    <p className="text-base text-gray-500 mt-3">
                      Typical industry range for {businessSizeLabels[businessSize].toLowerCase()} companies
                      with {selectedServices.length} service{selectedServices.length !== 1 ? "s" : ""}.
                      {urgency === "priority" && " Priority timeline adds 20-50% to typical rates."}
                    </p>
                  </div>
                </Animate>

                {/* Per-Service Breakdown */}
                <Animate animation="fade-up" delay={100}>
                  <div>
                    <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                      Per-Service Cost Breakdown
                    </h2>
                    <div className="border border-gray-200">
                      <div className="grid grid-cols-3 gap-4 px-4 py-3 bg-black text-white">
                        <span className="text-base font-bold">Service</span>
                        <span className="text-base font-bold text-right">Low Estimate</span>
                        <span className="text-base font-bold text-right">High Estimate</span>
                      </div>
                      {serviceBreakdown.map((service, i) => (
                        <div
                          key={service.id}
                          className={`grid grid-cols-3 gap-4 px-4 py-3 ${
                            i % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                        >
                          <span className="text-base font-medium text-black">{service.label}</span>
                          <span className="text-base text-gray-600 text-right">
                            {formatCurrency(service.low)}
                          </span>
                          <span className="text-base text-gray-600 text-right">
                            {formatCurrency(service.high)}
                          </span>
                        </div>
                      ))}
                      <div className="grid grid-cols-3 gap-4 px-4 py-3 border-t-2 border-black bg-gray-50">
                        <span className="text-base font-extrabold text-black">Total</span>
                        <span className="text-base font-extrabold text-black text-right">
                          {formatCurrency(totalLow)}
                        </span>
                        <span className="text-base font-extrabold text-black text-right">
                          {formatCurrency(totalHigh)}
                        </span>
                      </div>
                    </div>
                    <p className="text-base text-gray-500 mt-2">
                      * Ranges reflect typical industry pricing. Actual costs depend on scope, provider, and market.
                    </p>
                  </div>
                </Animate>

                {/* Recommended Engagement */}
                <Animate animation="fade-up" delay={200}>
                  <div className="border border-gray-200 p-6">
                    <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
                      Recommended Engagement Model
                    </h2>
                    <p className="text-base font-bold text-black mb-2">
                      {getRecommendedEngagement(selectedServices, businessSize)}
                    </p>
                    <p className="text-base text-gray-500 leading-relaxed">
                      {engagementRecommendations[engagement]}
                    </p>
                  </div>
                </Animate>

                {/* What This Budget Gets You */}
                <Animate animation="fade-up" delay={300}>
                  <div>
                    <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                      What This Budget Typically Gets You
                    </h2>
                    <p className="text-base text-gray-500 mb-4">
                      Based on industry standards for {businessSizeLabels[businessSize].toLowerCase()}-level engagements,
                      here is what is generally included at this investment level:
                    </p>
                    <div className="space-y-6">
                      {selectedServices.map((id) => {
                        const service = services.find((s) => s.id === id);
                        const deliverables = serviceDeliverables[id]?.[businessSize] ?? [];
                        return (
                          <div key={id} className="border border-gray-200 p-5">
                            <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                              {service?.label}
                            </h3>
                            <ul className="space-y-2">
                              {deliverables.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-base text-gray-600">
                                  <span className="w-1.5 h-1.5 bg-black flex-shrink-0 mt-2" aria-hidden="true" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Animate>

                {/* Disclaimer */}
                <Animate animation="fade-in" delay={400}>
                  <div className="border-l-4 border-black pl-5 py-3">
                    <p className="text-base text-gray-600 leading-relaxed">
                      <strong className="text-black">Important:</strong> These are industry estimates based on
                      publicly available data and typical market rates. They do not represent Markit Media
                      pricing or guarantees. Actual costs vary significantly based on your specific goals,
                      industry, competition, and provider.{" "}
                      <Link
                        href="/get-a-quote"
                        className="text-black font-bold underline underline-offset-4 hover:text-gray-600 transition-colors duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                      >
                        Contact us for a custom quote
                      </Link>
                      .
                    </p>
                  </div>
                </Animate>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Factors That Affect Pricing */}
      <section aria-label="Good to Know" className="px-6 lg:px-12 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <Animate animation="fade-up">
            <div className="text-center mb-12">
              <SectionLabel>Good to Know</SectionLabel>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-3">
                Factors That Affect Pricing
              </h2>
              <div className="flex justify-center mt-4">
                <SectionDesc>
                  No two businesses are alike. These variables can shift the investment
                  required for effective marketing in either direction.
                </SectionDesc>
              </div>
            </div>
          </Animate>
          <Stagger stagger={120} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pricingFactors.map((factor) => (
              <div
                key={factor.title}
                className="bg-white border border-gray-200 p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  {factor.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">{factor.description}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      
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

      {/* CTA */}
      <section aria-label="Next Step" className="px-6 lg:px-12 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <Animate animation="fade-up">
            <SectionLabel>Next Step</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-3">
              Ready for a Custom Quote?
            </h2>
            <SectionDesc>
              These estimates give you a starting point. For pricing tailored to your business,
              goals, and timeline, get in touch with our team.
            </SectionDesc>
            <div className="mt-8">
              <Link
                href="/get-a-quote"
                className="inline-flex items-center justify-center min-h-[44px] px-8 py-4 bg-black text-white text-base font-bold tracking-wide hover:bg-gray-800 transition-colors duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Get a Custom Quote
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    
      
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

      {/* CTA */}
      <section aria-label="Need Expert Help?" className="bg-black text-white px-6 lg:px-12 py-16 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold mb-4">Need Expert Help?</h2>
        <p className="text-base text-neutral-300 mb-8 max-w-2xl mx-auto">Our team can help you implement these insights and drive measurable results for your business.</p>
        <Link href="/contact" className="inline-block bg-white text-black font-bold px-8 py-3 text-base hover:bg-neutral-200 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Get in Touch</Link>
      </section>
    
      <ToolCTA
        toolName="Pricing Calculator"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Persona Builder", href: "/resources/persona-builder" },
          { title: "Persona Workshop", href: "/resources/persona-workshop" },
          { title: "Pricing Optimizer", href: "/resources/pricing-optimizer" },
          { title: "Pricing Page Analyzer", href: "/resources/pricing-page-analyzer" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
