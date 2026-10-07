import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { FreeToolIcon, FreeToolMiniIcon } from "@/components/free-tool-icon";

export const metadata: Metadata = {
  title: "155+ Free Marketing Tools — Calculators, Audits, Generators & Planners",
  description: "Free interactive marketing tools: ROI calculators, SEO audits, content generators, budget planners, competitor analysis, and more. No signup required.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools" },
  openGraph: {
    title: "155+ Free Marketing Tools",
    description: "Interactive calculators, audit scorecards, generators, and planners — all free, no signup required.",
    images: [{ url: "https://themarkitmedia.com/api/free-tool-thumbnail?title=155%2B%20Free%20Marketing%20Tools", width: 1200, height: 630, alt: "155+ Free Marketing Tools by Markit Media — calculators, audits, generators and planners" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "155+ Free Marketing Tools",
    description: "Interactive calculators, audit scorecards, generators, and planners — all free, no signup required.",
    images: ["https://themarkitmedia.com/api/free-tool-thumbnail?title=155%2B%20Free%20Marketing%20Tools"],
  },
};

const categories = [
  {
    title: "SEO & Technical",
    tools: [
      { name: "Free SEO Audit Score", desc: "40-factor site health check", href: "/free-tools/free-seo-audit-score" },
      { name: "Free SEO Checklist", desc: "20-point interactive audit", href: "/free-tools/free-seo-checklist" },
      { name: "Free SEO Content Optimizer", desc: "Keyword, readability & heading analysis", href: "/free-tools/free-seo-content-optimizer" },
      { name: "Free SEO Gap Finder", desc: "Find untapped ranking opportunities", href: "/free-tools/free-seo-gap-finder" },
      { name: "Free Backlink Analyzer", desc: "Profile quality & anchor diversity", href: "/free-tools/free-backlink-analyzer" },
      { name: "Free Keyword Density Checker", desc: "Content keyword frequency analysis", href: "/free-tools/free-keyword-density-checker" },
      { name: "Free Schema Generator", desc: "JSON-LD structured data for 6 types", href: "/free-tools/free-schema-generator" },
      { name: "Free Meta Description Generator", desc: "Write & optimize meta tags", href: "/free-tools/free-meta-description-generator" },
      { name: "Free OG Preview", desc: "Social share link preview tool", href: "/free-tools/free-og-preview" },
      { name: "Free Readability Checker", desc: "Flesch score & grade-level analysis", href: "/free-tools/free-readability-checker" },
      { name: "Free SEO vs PPC Guide", desc: "Channel comparison guide", href: "/free-tools/free-seo-vs-ppc" },
    ],
  },
  {
    title: "Content & Copywriting",
    tools: [
      { name: "Free Headline Analyzer", desc: "Score titles, ads & subject lines", href: "/free-tools/free-headline-analyzer" },
      { name: "Free Headline Split Tester", desc: "8 proven formula variations", href: "/free-tools/free-headline-split-tester" },
      { name: "Free Content Brief Generator", desc: "5-step writer brief wizard", href: "/free-tools/free-content-brief-generator" },
      { name: "Free SEO Content Brief", desc: "Full outline with keywords", href: "/free-tools/free-content-brief" },
      { name: "Free Content Calendar", desc: "Weekly grid by industry", href: "/free-tools/free-content-calendar" },
      { name: "Free Content Pillar Planner", desc: "Hub-and-spoke topic clusters", href: "/free-tools/free-content-pillar-planner" },
      { name: "Free Content Gap Analyzer", desc: "Buyer journey content audit", href: "/free-tools/free-content-gap-analyzer" },
      { name: "Free Content Gap Finder", desc: "Heatmap content analysis", href: "/free-tools/free-content-gap-finder" },
      { name: "Free Content Repurposing Planner", desc: "Turn 1 piece into many", href: "/free-tools/free-content-repurposing" },
      { name: "Free Content ROI Calculator", desc: "Month-by-month projections", href: "/free-tools/free-content-roi-calculator" },
      { name: "Free Content Audit Scorecard", desc: "30-criteria maturity assessment", href: "/free-tools/free-content-audit-scorecard" },
      { name: "Free Content Performance Scorecard", desc: "8-dimension radar scoring", href: "/free-tools/free-content-performance-scorecard" },
      { name: "Free Ad Copy Generator", desc: "Google, Facebook, LinkedIn copy", href: "/free-tools/free-ad-copy-generator" },
      { name: "Free Ad Copy Analyzer", desc: "Score copy across 5 platforms", href: "/free-tools/free-ad-copy-analyzer" },
      { name: "Free CTA Generator", desc: "Button & headline copy maker", href: "/free-tools/free-cta-generator" },
      { name: "Free Lead Magnet Generator", desc: "High-converting lead magnet ideas", href: "/free-tools/free-lead-magnet-generator" },
    ],
  },
  {
    title: "Social Media",
    tools: [
      { name: "Free Social Media Planner", desc: "Custom posting schedule by platform", href: "/free-tools/free-social-media-planner" },
      { name: "Free Social Calendar", desc: "4-week content calendar", href: "/free-tools/free-social-calendar" },
      { name: "Free Social Media Calendar Template", desc: "Monthly calendar with scheduling", href: "/free-tools/free-social-media-calendar-template" },
      { name: "Free Social Post Generator", desc: "Platform-specific templates", href: "/free-tools/free-social-post-generator" },
      { name: "Free Social Content Rater", desc: "Rate posts against best practices", href: "/free-tools/free-social-content-rater" },
      { name: "Free Social Media Audit", desc: "25-point presence grader", href: "/free-tools/free-social-media-audit" },
      { name: "Free Social Media ROI", desc: "Calculate social media returns", href: "/free-tools/free-social-media-roi" },
      { name: "Free Social Media Bio Generator", desc: "Optimized bios for 5 platforms", href: "/free-tools/free-social-media-bio-generator" },
      { name: "Free Social Proof Guide", desc: "Social proof strategy builder", href: "/free-tools/free-social-proof-guide" },
      { name: "Free Hashtag Generator", desc: "30 hashtags per niche", href: "/free-tools/free-hashtag-generator" },
      { name: "Free Image Size Guide", desc: "Dimensions for all platforms", href: "/free-tools/free-image-size-guide" },
    ],
  },
  {
    title: "Email Marketing",
    tools: [
      { name: "Free Email Campaign Planner", desc: "Complete sequence builder", href: "/free-tools/free-email-campaign-planner" },
      { name: "Free Email Sequence Planner", desc: "Welcome, nurture & cart flows", href: "/free-tools/free-email-sequence-planner" },
      { name: "Free Email Subject Line Tester", desc: "Spam risk & engagement score", href: "/free-tools/free-email-subject-tester" },
      { name: "Free Email Subject A/B Tester", desc: "Side-by-side comparison", href: "/free-tools/free-email-subject-ab-tester" },
      { name: "Free Email ROI Calculator", desc: "List revenue projections", href: "/free-tools/free-email-roi-calculator" },
      { name: "Free Email Health Checker", desc: "25-factor audit", href: "/free-tools/free-email-health-checker" },
      { name: "Free Email Deliverability Checker", desc: "Authentication & list hygiene", href: "/free-tools/free-email-deliverability" },
      { name: "Free Email Warm-Up Planner", desc: "Day-by-day volume schedule", href: "/free-tools/free-email-warmup-planner" },
    ],
  },
  {
    title: "PPC & Advertising",
    tools: [
      { name: "Free Google Ads Estimator", desc: "CPC, clicks & conversions by industry", href: "/free-tools/free-google-ads-estimator" },
      { name: "Free Ad Budget Pacing", desc: "Track spend rate across campaigns", href: "/free-tools/free-ad-budget-pacing" },
      { name: "Free Ad Spend Calculator", desc: "CPA, ROAS & efficiency metrics", href: "/free-tools/free-ad-spend-calculator" },
      { name: "Free PPC Audit Checklist", desc: "37-point Google Ads audit", href: "/free-tools/free-ppc-audit-checklist" },
      { name: "Free A/B Test Calculator", desc: "Sample size & duration", href: "/free-tools/free-ab-test-calculator" },
      { name: "Free A/B Test Ideas", desc: "350+ prioritized test ideas", href: "/free-tools/free-ab-test-ideas" },
      { name: "Free Influencer ROI Calculator", desc: "Campaign ROI projections", href: "/free-tools/free-influencer-roi" },
    ],
  },
  {
    title: "Analytics & Reporting",
    tools: [
      { name: "Free ROI Calculator", desc: "Marketing investment returns", href: "/free-tools/free-roi-calculator" },
      { name: "Free ROI Dashboard", desc: "Multi-channel performance comparison", href: "/free-tools/free-roi-dashboard" },
      { name: "Free ROI Forecaster", desc: "Scenario modeling over 3-24 months", href: "/free-tools/free-roi-forecaster" },
      { name: "Free KPI Dashboard Builder", desc: "Channel-specific benchmarks", href: "/free-tools/free-kpi-dashboard" },
      { name: "Free KPI Builder", desc: "30+ metrics library", href: "/free-tools/free-kpi-builder" },
      { name: "Free Marketing KPI Tracker", desc: "12-month tracking with sparklines", href: "/free-tools/free-marketing-kpi-tracker" },
      { name: "Free Marketing Metrics Benchmark", desc: "50 metrics across 7 categories", href: "/free-tools/free-marketing-metrics-benchmark" },
      { name: "Free Marketing ROI Report", desc: "Professional report generator", href: "/free-tools/free-marketing-roi-report" },
      { name: "Free Attribution Calculator", desc: "4 attribution models compared", href: "/free-tools/free-attribution-calculator" },
      { name: "Free Client Reporting Dashboard", desc: "8-channel client reports", href: "/free-tools/free-client-reporting-dashboard" },
      { name: "Free Stakeholder Report Generator", desc: "Executive & board reports", href: "/free-tools/free-stakeholder-report" },
      { name: "Free Campaign Tracker", desc: "Status, budgets & performance", href: "/free-tools/free-campaign-tracker" },
      { name: "Free Marketing Expense Tracker", desc: "Spend by channel & month", href: "/free-tools/free-marketing-expense-tracker" },
      { name: "Free Experiment Tracker", desc: "ICE scoring & learnings library", href: "/free-tools/free-experiment-tracker" },
      { name: "Free Campaign Debrief", desc: "Post-mortem with A-F grading", href: "/free-tools/free-campaign-debrief" },
      { name: "Free Funnel Calculator", desc: "Revenue loss by stage", href: "/free-tools/free-funnel-calculator" },
      { name: "Free Funnel Visualizer", desc: "Conversion rates & drop-off", href: "/free-tools/free-funnel-visualizer" },
      { name: "Free Conversion Funnel Simulator", desc: "What-if scenario modeling", href: "/free-tools/free-conversion-funnel-simulator" },
    ],
  },
  {
    title: "Branding & Design",
    tools: [
      { name: "Free Brand Voice Generator", desc: "Complete voice guide with do/don'ts", href: "/free-tools/free-brand-voice-generator" },
      { name: "Free Brand Voice Checker", desc: "Content consistency scoring", href: "/free-tools/free-brand-voice-checker" },
      { name: "Free Brand Tone Generator", desc: "Tone spectrum & adjective mapping", href: "/free-tools/free-brand-tone-generator" },
      { name: "Free Brand Name Generator", desc: "Creative name combinations", href: "/free-tools/free-brand-name-generator" },
      { name: "Free Brand Name Evaluator", desc: "Score names across 8 criteria", href: "/free-tools/free-brand-name-evaluator" },
      { name: "Free Brand Positioning Canvas", desc: "8-dimension positioning statement", href: "/free-tools/free-brand-positioning" },
      { name: "Free Brand Consistency Checker", desc: "Touchpoint consistency scoring", href: "/free-tools/free-brand-consistency-checker" },
      { name: "Free Brand Guidelines Checklist", desc: "40-item completeness check", href: "/free-tools/free-brand-guidelines-checklist" },
      { name: "Free Color Palette Generator", desc: "5 palette types with WCAG", href: "/free-tools/free-color-palette-generator" },
      { name: "Free Contrast Checker", desc: "WCAG AA & AAA compliance", href: "/free-tools/free-contrast-checker" },
    ],
  },
  {
    title: "Website & CRO",
    tools: [
      { name: "Free Website Grader", desc: "8-question performance score", href: "/free-tools/free-website-grader" },
      { name: "Free Website Audit Checklist", desc: "25-point site audit", href: "/free-tools/free-website-audit" },
      { name: "Free Website Readiness Scorecard", desc: "Mobile, speed, SEO, security", href: "/free-tools/free-website-readiness-scorecard" },
      { name: "Free Website Heuristic Evaluator", desc: "Nielsen's 10 usability heuristics", href: "/free-tools/free-website-heuristic-evaluator" },
      { name: "Free Website Launch Checklist", desc: "50-item pre-launch check", href: "/free-tools/free-website-launch-checklist" },
      { name: "Free Launch Countdown", desc: "44-item checklist with timer", href: "/free-tools/free-launch-countdown" },
      { name: "Free Landing Page Grader", desc: "20-point conversion grader", href: "/free-tools/free-landing-page-grader" },
      { name: "Free CRO Audit", desc: "20-point conversion audit", href: "/free-tools/free-cro-audit" },
      { name: "Free Conversion Checklist", desc: "30-item readiness check", href: "/free-tools/free-conversion-checklist" },
      { name: "Free Speed Test", desc: "8-point speed assessment", href: "/free-tools/free-speed-test" },
      { name: "Free Redesign Planner", desc: "Structured redesign roadmap", href: "/free-tools/free-redesign-planner" },
      { name: "Free Migration Checklist", desc: "30-point migration planner", href: "/free-tools/free-migration-checklist" },
      { name: "Free Tech Stack Advisor", desc: "Platform & hosting recommendations", href: "/free-tools/free-tech-stack-advisor" },
      { name: "Free Pricing Page Optimizer", desc: "32-point pricing page audit", href: "/free-tools/free-pricing-optimizer" },
      { name: "Free Pricing Page Analyzer", desc: "20 conversion checkpoints", href: "/free-tools/free-pricing-page-analyzer" },
      { name: "Free Web Platform Guide", desc: "WordPress vs Shopify vs Next.js", href: "/free-tools/free-web-platform-guide" },
    ],
  },
  {
    title: "Strategy & Planning",
    tools: [
      { name: "Free Budget Calculator", desc: "Channel allocation by budget", href: "/free-tools/free-budget-calculator" },
      { name: "Free Budget Allocator", desc: "Data-driven budget templates", href: "/free-tools/free-budget-allocator" },
      { name: "Free Marketing Budget Planner", desc: "Detailed budget breakdown", href: "/free-tools/free-marketing-budget-planner" },
      { name: "Free Marketing Calendar", desc: "12-month campaign calendar", href: "/free-tools/free-marketing-calendar" },
      { name: "Free Marketing Timeline Planner", desc: "Gantt-style campaign planner", href: "/free-tools/free-marketing-timeline-planner" },
      { name: "Free Marketing Maturity Assessment", desc: "24-question 6-dimension quiz", href: "/free-tools/free-marketing-maturity" },
      { name: "Free Marketing Goal Setter", desc: "SMART goal framework", href: "/free-tools/free-marketing-goal-setter" },
      { name: "Free Marketing Audit Scorecard", desc: "40-question 8-category audit", href: "/free-tools/free-marketing-audit-scorecard" },
      { name: "Free OKR Planner", desc: "Objectives & key results tracking", href: "/free-tools/free-okr-planner" },
      { name: "Free SWOT Analysis", desc: "Interactive SWOT with recommendations", href: "/free-tools/free-swot-analysis" },
      { name: "Free Channel Selector", desc: "7-question channel quiz", href: "/free-tools/free-channel-selector" },
      { name: "Free Channel Recommender", desc: "Ranked channel recommendations", href: "/free-tools/free-channel-recommender" },
      { name: "Free Channel Mix Modeller", desc: "Budget allocation with ROI projection", href: "/free-tools/free-channel-mix-modeller" },
      { name: "Free Marketing Proposal Generator", desc: "5-step professional proposals", href: "/free-tools/free-marketing-proposal-generator" },
      { name: "Free Scope of Work Generator", desc: "8 project types", href: "/free-tools/free-scope-of-work-generator" },
      { name: "Free Marketing RFP Template", desc: "9-section RFP builder", href: "/free-tools/free-marketing-rfp-template" },
      { name: "Free Risk Assessment Matrix", desc: "5×5 likelihood-impact heatmap", href: "/free-tools/free-risk-assessment" },
      { name: "Free Sprint Planner", desc: "2-week agile marketing sprints", href: "/free-tools/free-sprint-planner" },
      { name: "Free Quarterly Review Template", desc: "5-section review generator", href: "/free-tools/free-quarterly-review" },
      { name: "Free Team Capacity Planner", desc: "Workload & utilization bars", href: "/free-tools/free-team-capacity-planner" },
      { name: "Free Meeting Agenda Builder", desc: "7 meeting templates", href: "/free-tools/free-meeting-agenda-builder" },
      { name: "Free Campaign Naming Convention", desc: "Clean naming for ads & UTMs", href: "/free-tools/free-campaign-naming-convention" },
      { name: "Free Campaign Naming Generator", desc: "8 platform templates", href: "/free-tools/free-campaign-naming-generator" },
      { name: "Free Campaign Brief Builder", desc: "Structured campaign brief", href: "/free-tools/free-campaign-brief-builder" },
      { name: "Free Service Finder Quiz", desc: "Personalized recommendations", href: "/services/finder" },
    ],
  },
  {
    title: "Competitive Analysis",
    tools: [
      { name: "Free Competitor Analysis", desc: "6-competitor landscape map", href: "/free-tools/free-competitor-analysis" },
      { name: "Free Competitor Benchmarking", desc: "6-dimension radar chart", href: "/free-tools/free-competitor-benchmarking" },
      { name: "Free Competitor Matrix", desc: "10-dimension visual comparison", href: "/free-tools/free-competitor-matrix" },
      { name: "Free Competitor Pricing Tracker", desc: "Pricing & feature tracker", href: "/free-tools/free-competitor-pricing-tracker" },
      { name: "Free Competitor Ad Spy", desc: "Multi-platform ad tracker", href: "/free-tools/free-competitor-ad-spy" },
      { name: "Free Competitive Gap Analyzer", desc: "10-dimension gap analysis", href: "/free-tools/free-competitive-gap" },
      { name: "Free Competitive Intel Dashboard", desc: "5-competitor threat scoring", href: "/free-tools/free-competitive-intel-dashboard" },
      { name: "Free Competitive SWOT", desc: "Side-by-side SWOT comparison", href: "/free-tools/free-competitive-swot" },
      { name: "Free Competitive SWOT Analyzer", desc: "Multi-competitor strategic insights", href: "/free-tools/free-competitive-swot-analyzer" },
      { name: "Free Agency Comparison Guide", desc: "Evaluating agencies", href: "/free-tools/free-agency-comparison" },
      { name: "Free Agency Pricing Calculator", desc: "Hourly, retainer & project models", href: "/free-tools/free-agency-pricing-calculator" },
      { name: "Free Pricing Calculator", desc: "Marketing cost estimates", href: "/free-tools/free-pricing-calculator" },
      { name: "Free Vendor Evaluation Scorecard", desc: "8-category vendor comparison", href: "/free-tools/free-vendor-evaluation" },
    ],
  },
  {
    title: "Customer & Lead Generation",
    tools: [
      { name: "Free Persona Builder", desc: "Detailed buyer personas", href: "/free-tools/free-persona-builder" },
      { name: "Free Persona Workshop", desc: "Guided persona exercises", href: "/free-tools/free-persona-workshop" },
      { name: "Free Buyer Persona Quiz", desc: "8-question persona builder", href: "/free-tools/free-buyer-persona-quiz" },
      { name: "Free Audience Targeting Worksheet", desc: "Ideal customer profile builder", href: "/free-tools/free-audience-targeting-worksheet" },
      { name: "Free Customer Journey Builder", desc: "5-stage touchpoint mapper", href: "/free-tools/free-customer-journey-builder" },
      { name: "Free Customer Journey Mapper", desc: "Emotion curve visualization", href: "/free-tools/free-customer-journey-mapper" },
      { name: "Free Customer Feedback Survey", desc: "NPS, CSAT & CES templates", href: "/free-tools/free-customer-feedback-survey" },
      { name: "Free Lead Scoring Calculator", desc: "8-criteria scoring model", href: "/free-tools/free-lead-scoring-calculator" },
      { name: "Free CLV Calculator", desc: "Customer lifetime value", href: "/free-tools/free-clv-calculator" },
      { name: "Free Retention Calculator", desc: "Churn rate & cohort analysis", href: "/free-tools/free-retention-calculator" },
    ],
  },
  {
    title: "Marketing Technology",
    tools: [
      { name: "Free Marketing Stack Audit", desc: "30-tool technology audit", href: "/free-tools/free-marketing-stack-audit" },
      { name: "Free Martech Stack Planner", desc: "8-category stack planner", href: "/free-tools/free-martech-stack-planner" },
      { name: "Free SLA Tracker", desc: "Service level compliance tracking", href: "/free-tools/free-sla-tracker" },
      { name: "Free Client Onboarding Checklist", desc: "5-phase onboarding generator", href: "/free-tools/free-client-onboarding-checklist" },
      { name: "Free UTM Builder", desc: "Campaign tracking links", href: "/free-tools/free-utm-builder" },
    ],
  },
  {
    title: "Guides & Benchmarks",
    tools: [
      { name: "Free Marketing Trends 2026", desc: "10 key shifts this year", href: "/free-tools/free-marketing-trends-2026" },
      { name: "Free Marketing Trends 2025", desc: "AI, privacy, video & more", href: "/free-tools/free-marketing-trends-2025" },
      { name: "Free Marketing Statistics 2026", desc: "35+ updated benchmarks", href: "/free-tools/free-marketing-statistics-2026" },
      { name: "Free Marketing Statistics 2025", desc: "45+ data points", href: "/free-tools/free-marketing-statistics" },
      { name: "Free Startup Marketing Guide", desc: "Marketing from zero", href: "/free-tools/free-startup-marketing-guide" },
      { name: "Free Small Business Guide", desc: "Channel priorities & budgets", href: "/free-tools/free-small-business-guide" },
      { name: "Free Checklists", desc: "SEO, PPC, social & launch", href: "/free-tools/free-checklists" },
    ],
  },
];

const totalTools = categories.reduce((sum, cat) => sum + cat.tools.length, 0);

// Unified dynamic thumbnail deployment: blog, case studies, and free tools.
export default function FreeToolsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Marketing Tools",
    description: `${totalTools}+ free interactive marketing tools — calculators, audits, generators, and planners.`,
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Free Tools" }]} />

      <section aria-label="Free Resources" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Resources</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              {totalTools}+ Free Marketing Tools
            </h1>
            <SectionDesc>
              Interactive calculators, audit scorecards, content generators, and strategic planners.
              No signup required — use any tool instantly.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Quick nav */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-8">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <a key={cat.title} href={`#${cat.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="border border-gray-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  {cat.title} ({cat.tools.length})
                </a>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {categories.map((cat, ci) => (
        <section key={cat.title} id={cat.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className={`px-6 lg:px-12 py-12 ${ci % 2 === 1 ? "bg-gray-50" : ""}`} aria-label={cat.title}>
          <div className="max-w-7xl mx-auto">
            <Animate animation="fade-up">
              <div className="flex items-center gap-3 mb-2"><FreeToolIcon category={cat.title} /><h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">{cat.title}</h2></div>
              <p className="text-base text-gray-400 mb-8">{cat.tools.length} tools</p>
            </Animate>
            <Stagger stagger={30} animation="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cat.tools.map((tool) => (
                <Link key={tool.href} href={tool.href} className="group bg-white border border-gray-200 hover:border-black/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 motion-reduce:transition-none p-5 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  <div className="flex items-start gap-3"><span className="mt-0.5 text-gray-500 group-hover:text-black"><FreeToolMiniIcon name={tool.name} /></span><div><h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black group-hover:underline mb-1">{tool.name}</h3><p className="text-base text-gray-500 leading-relaxed">{tool.desc}</p></div></div>
                </Link>
              ))}
            </Stagger>
          </div>
        </section>
      ))}

      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Putting These Insights to Work?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team can turn the data from these tools into a growth strategy tailored to your business.
            </p>
            <Link href="/en/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
