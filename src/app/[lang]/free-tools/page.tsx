import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "150+ Free Marketing Tools — Calculators, Audits, Generators & Planners",
  description: "Free interactive marketing tools: ROI calculators, SEO audits, content generators, budget planners, competitor analysis, and more. No signup required.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools" },
  openGraph: {
    title: "150+ Free Marketing Tools",
    description: "Interactive calculators, audit scorecards, generators, and planners — all free, no signup required.",
  },
};

const categories = [
  {
    title: "SEO & Technical",
    tools: [
      { name: "SEO Audit Score", desc: "40-factor site health check", href: "/resources/seo-audit-score" },
      { name: "SEO Checklist", desc: "20-point interactive audit", href: "/resources/seo-checklist" },
      { name: "SEO Content Optimizer", desc: "Keyword, readability & heading analysis", href: "/resources/seo-content-optimizer" },
      { name: "SEO Gap Finder", desc: "Find untapped ranking opportunities", href: "/resources/seo-gap-finder" },
      { name: "Backlink Analyzer", desc: "Profile quality & anchor diversity", href: "/resources/backlink-analyzer" },
      { name: "Keyword Density Checker", desc: "Content keyword frequency analysis", href: "/resources/keyword-density-checker" },
      { name: "Schema Generator", desc: "JSON-LD structured data for 6 types", href: "/resources/schema-generator" },
      { name: "Meta Description Generator", desc: "Write & optimize meta tags", href: "/resources/meta-description-generator" },
      { name: "OG Preview", desc: "Social share link preview tool", href: "/resources/og-preview" },
      { name: "Readability Checker", desc: "Flesch score & grade-level analysis", href: "/resources/readability-checker" },
      { name: "SEO vs PPC Guide", desc: "Channel comparison guide", href: "/resources/seo-vs-ppc" },
    ],
  },
  {
    title: "Content & Copywriting",
    tools: [
      { name: "Headline Analyzer", desc: "Score titles, ads & subject lines", href: "/resources/headline-analyzer" },
      { name: "Headline Split Tester", desc: "8 proven formula variations", href: "/resources/headline-split-tester" },
      { name: "Content Brief Generator", desc: "5-step writer brief wizard", href: "/resources/content-brief-generator" },
      { name: "SEO Content Brief", desc: "Full outline with keywords", href: "/resources/content-brief" },
      { name: "Content Calendar", desc: "Weekly grid by industry", href: "/resources/content-calendar" },
      { name: "Content Pillar Planner", desc: "Hub-and-spoke topic clusters", href: "/resources/content-pillar-planner" },
      { name: "Content Gap Analyzer", desc: "Buyer journey content audit", href: "/resources/content-gap-analyzer" },
      { name: "Content Gap Finder", desc: "Heatmap content analysis", href: "/resources/content-gap-finder" },
      { name: "Content Repurposing Planner", desc: "Turn 1 piece into many", href: "/resources/content-repurposing" },
      { name: "Content ROI Calculator", desc: "Month-by-month projections", href: "/resources/content-roi-calculator" },
      { name: "Content Audit Scorecard", desc: "30-criteria maturity assessment", href: "/resources/content-audit-scorecard" },
      { name: "Content Performance Scorecard", desc: "8-dimension radar scoring", href: "/resources/content-performance-scorecard" },
      { name: "Ad Copy Generator", desc: "Google, Facebook, LinkedIn copy", href: "/resources/ad-copy-generator" },
      { name: "Ad Copy Analyzer", desc: "Score copy across 5 platforms", href: "/resources/ad-copy-analyzer" },
      { name: "CTA Generator", desc: "Button & headline copy maker", href: "/resources/cta-generator" },
      { name: "Lead Magnet Generator", desc: "High-converting lead magnet ideas", href: "/resources/lead-magnet-generator" },
    ],
  },
  {
    title: "Social Media",
    tools: [
      { name: "Social Media Planner", desc: "Custom posting schedule by platform", href: "/resources/social-media-planner" },
      { name: "Social Calendar", desc: "4-week content calendar", href: "/resources/social-calendar" },
      { name: "Social Media Calendar Template", desc: "Monthly calendar with scheduling", href: "/resources/social-media-calendar-template" },
      { name: "Social Post Generator", desc: "Platform-specific templates", href: "/resources/social-post-generator" },
      { name: "Social Content Rater", desc: "Rate posts against best practices", href: "/resources/social-content-rater" },
      { name: "Social Media Audit", desc: "25-point presence grader", href: "/resources/social-media-audit" },
      { name: "Social Media ROI", desc: "Calculate social media returns", href: "/resources/social-media-roi" },
      { name: "Social Media Bio Generator", desc: "Optimized bios for 5 platforms", href: "/resources/social-media-bio-generator" },
      { name: "Social Proof Guide", desc: "Social proof strategy builder", href: "/resources/social-proof-guide" },
      { name: "Hashtag Generator", desc: "30 hashtags per niche", href: "/resources/hashtag-generator" },
      { name: "Image Size Guide", desc: "Dimensions for all platforms", href: "/resources/image-size-guide" },
    ],
  },
  {
    title: "Email Marketing",
    tools: [
      { name: "Email Campaign Planner", desc: "Complete sequence builder", href: "/resources/email-campaign-planner" },
      { name: "Email Sequence Planner", desc: "Welcome, nurture & cart flows", href: "/resources/email-sequence-planner" },
      { name: "Email Subject Line Tester", desc: "Spam risk & engagement score", href: "/resources/email-subject-tester" },
      { name: "Email Subject A/B Tester", desc: "Side-by-side comparison", href: "/resources/email-subject-ab-tester" },
      { name: "Email ROI Calculator", desc: "List revenue projections", href: "/resources/email-roi-calculator" },
      { name: "Email Health Checker", desc: "25-factor audit", href: "/resources/email-health-checker" },
      { name: "Email Deliverability Checker", desc: "Authentication & list hygiene", href: "/resources/email-deliverability" },
      { name: "Email Warm-Up Planner", desc: "Day-by-day volume schedule", href: "/resources/email-warmup-planner" },
    ],
  },
  {
    title: "PPC & Advertising",
    tools: [
      { name: "Google Ads Estimator", desc: "CPC, clicks & conversions by industry", href: "/resources/google-ads-estimator" },
      { name: "Ad Budget Pacing", desc: "Track spend rate across campaigns", href: "/resources/ad-budget-pacing" },
      { name: "Ad Spend Calculator", desc: "CPA, ROAS & efficiency metrics", href: "/resources/ad-spend-calculator" },
      { name: "PPC Audit Checklist", desc: "37-point Google Ads audit", href: "/resources/ppc-audit-checklist" },
      { name: "A/B Test Calculator", desc: "Sample size & duration", href: "/resources/ab-test-calculator" },
      { name: "A/B Test Ideas", desc: "350+ prioritized test ideas", href: "/resources/ab-test-ideas" },
      { name: "Influencer ROI Calculator", desc: "Campaign ROI projections", href: "/resources/influencer-roi" },
    ],
  },
  {
    title: "Analytics & Reporting",
    tools: [
      { name: "ROI Calculator", desc: "Marketing investment returns", href: "/resources/roi-calculator" },
      { name: "ROI Dashboard", desc: "Multi-channel performance comparison", href: "/resources/roi-dashboard" },
      { name: "ROI Forecaster", desc: "Scenario modeling over 3-24 months", href: "/resources/roi-forecaster" },
      { name: "KPI Dashboard Builder", desc: "Channel-specific benchmarks", href: "/resources/kpi-dashboard" },
      { name: "KPI Builder", desc: "30+ metrics library", href: "/resources/kpi-builder" },
      { name: "Marketing KPI Tracker", desc: "12-month tracking with sparklines", href: "/resources/marketing-kpi-tracker" },
      { name: "Marketing Metrics Benchmark", desc: "50 metrics across 7 categories", href: "/resources/marketing-metrics-benchmark" },
      { name: "Marketing ROI Report", desc: "Professional report generator", href: "/resources/marketing-roi-report" },
      { name: "Attribution Calculator", desc: "4 attribution models compared", href: "/resources/attribution-calculator" },
      { name: "Client Reporting Dashboard", desc: "8-channel client reports", href: "/resources/client-reporting-dashboard" },
      { name: "Stakeholder Report Generator", desc: "Executive & board reports", href: "/resources/stakeholder-report" },
      { name: "Campaign Tracker", desc: "Status, budgets & performance", href: "/resources/campaign-tracker" },
      { name: "Marketing Expense Tracker", desc: "Spend by channel & month", href: "/resources/marketing-expense-tracker" },
      { name: "Experiment Tracker", desc: "ICE scoring & learnings library", href: "/resources/experiment-tracker" },
      { name: "Campaign Debrief", desc: "Post-mortem with A-F grading", href: "/resources/campaign-debrief" },
      { name: "Funnel Calculator", desc: "Revenue loss by stage", href: "/resources/funnel-calculator" },
      { name: "Funnel Visualizer", desc: "Conversion rates & drop-off", href: "/resources/funnel-visualizer" },
      { name: "Conversion Funnel Simulator", desc: "What-if scenario modeling", href: "/resources/conversion-funnel-simulator" },
    ],
  },
  {
    title: "Branding & Design",
    tools: [
      { name: "Brand Voice Generator", desc: "Complete voice guide with do/don'ts", href: "/resources/brand-voice-generator" },
      { name: "Brand Voice Checker", desc: "Content consistency scoring", href: "/resources/brand-voice-checker" },
      { name: "Brand Tone Generator", desc: "Tone spectrum & adjective mapping", href: "/resources/brand-tone-generator" },
      { name: "Brand Name Generator", desc: "Creative name combinations", href: "/resources/brand-name-generator" },
      { name: "Brand Name Evaluator", desc: "Score names across 8 criteria", href: "/resources/brand-name-evaluator" },
      { name: "Brand Positioning Canvas", desc: "8-dimension positioning statement", href: "/resources/brand-positioning" },
      { name: "Brand Consistency Checker", desc: "Touchpoint consistency scoring", href: "/resources/brand-consistency-checker" },
      { name: "Brand Guidelines Checklist", desc: "40-item completeness check", href: "/resources/brand-guidelines-checklist" },
      { name: "Color Palette Generator", desc: "5 palette types with WCAG", href: "/resources/color-palette-generator" },
      { name: "Contrast Checker", desc: "WCAG AA & AAA compliance", href: "/resources/contrast-checker" },
    ],
  },
  {
    title: "Website & CRO",
    tools: [
      { name: "Website Grader", desc: "8-question performance score", href: "/resources/website-grader" },
      { name: "Website Audit Checklist", desc: "25-point site audit", href: "/resources/website-audit" },
      { name: "Website Readiness Scorecard", desc: "Mobile, speed, SEO, security", href: "/resources/website-readiness-scorecard" },
      { name: "Website Heuristic Evaluator", desc: "Nielsen's 10 usability heuristics", href: "/resources/website-heuristic-evaluator" },
      { name: "Website Launch Checklist", desc: "50-item pre-launch check", href: "/resources/website-launch-checklist" },
      { name: "Launch Countdown", desc: "44-item checklist with timer", href: "/resources/launch-countdown" },
      { name: "Landing Page Grader", desc: "20-point conversion grader", href: "/resources/landing-page-grader" },
      { name: "CRO Audit", desc: "20-point conversion audit", href: "/resources/cro-audit" },
      { name: "Conversion Checklist", desc: "30-item readiness check", href: "/resources/conversion-checklist" },
      { name: "Speed Test", desc: "8-point speed assessment", href: "/resources/speed-test" },
      { name: "Redesign Planner", desc: "Structured redesign roadmap", href: "/resources/redesign-planner" },
      { name: "Migration Checklist", desc: "30-point migration planner", href: "/resources/migration-checklist" },
      { name: "Tech Stack Advisor", desc: "Platform & hosting recommendations", href: "/resources/tech-stack-advisor" },
      { name: "Pricing Page Optimizer", desc: "32-point pricing page audit", href: "/resources/pricing-optimizer" },
      { name: "Pricing Page Analyzer", desc: "20 conversion checkpoints", href: "/resources/pricing-page-analyzer" },
      { name: "Web Platform Guide", desc: "WordPress vs Shopify vs Next.js", href: "/resources/web-platform-guide" },
    ],
  },
  {
    title: "Strategy & Planning",
    tools: [
      { name: "Budget Calculator", desc: "Channel allocation by budget", href: "/resources/budget-calculator" },
      { name: "Budget Allocator", desc: "Data-driven budget templates", href: "/resources/budget-allocator" },
      { name: "Marketing Budget Planner", desc: "Detailed budget breakdown", href: "/resources/marketing-budget-planner" },
      { name: "Marketing Calendar", desc: "12-month campaign calendar", href: "/resources/marketing-calendar" },
      { name: "Marketing Timeline Planner", desc: "Gantt-style campaign planner", href: "/resources/marketing-timeline-planner" },
      { name: "Marketing Maturity Assessment", desc: "24-question 6-dimension quiz", href: "/resources/marketing-maturity" },
      { name: "Marketing Goal Setter", desc: "SMART goal framework", href: "/resources/marketing-goal-setter" },
      { name: "Marketing Audit Scorecard", desc: "40-question 8-category audit", href: "/resources/marketing-audit-scorecard" },
      { name: "OKR Planner", desc: "Objectives & key results tracking", href: "/resources/okr-planner" },
      { name: "SWOT Analysis", desc: "Interactive SWOT with recommendations", href: "/resources/swot-analysis" },
      { name: "Channel Selector", desc: "7-question channel quiz", href: "/resources/channel-selector" },
      { name: "Channel Recommender", desc: "Ranked channel recommendations", href: "/resources/channel-recommender" },
      { name: "Channel Mix Modeller", desc: "Budget allocation with ROI projection", href: "/resources/channel-mix-modeller" },
      { name: "Marketing Proposal Generator", desc: "5-step professional proposals", href: "/resources/marketing-proposal-generator" },
      { name: "Scope of Work Generator", desc: "8 project types", href: "/resources/scope-of-work-generator" },
      { name: "Marketing RFP Template", desc: "9-section RFP builder", href: "/resources/marketing-rfp-template" },
      { name: "Risk Assessment Matrix", desc: "5×5 likelihood-impact heatmap", href: "/resources/risk-assessment" },
      { name: "Sprint Planner", desc: "2-week agile marketing sprints", href: "/resources/sprint-planner" },
      { name: "Quarterly Review Template", desc: "5-section review generator", href: "/resources/quarterly-review" },
      { name: "Team Capacity Planner", desc: "Workload & utilization bars", href: "/resources/team-capacity-planner" },
      { name: "Meeting Agenda Builder", desc: "7 meeting templates", href: "/resources/meeting-agenda-builder" },
      { name: "Campaign Naming Convention", desc: "Clean naming for ads & UTMs", href: "/resources/campaign-naming-convention" },
      { name: "Campaign Naming Generator", desc: "8 platform templates", href: "/resources/campaign-naming-generator" },
      { name: "Campaign Brief Builder", desc: "Structured campaign brief", href: "/resources/campaign-brief-builder" },
      { name: "Service Finder Quiz", desc: "Personalized recommendations", href: "/services/finder" },
    ],
  },
  {
    title: "Competitive Analysis",
    tools: [
      { name: "Competitor Analysis", desc: "6-competitor landscape map", href: "/resources/competitor-analysis" },
      { name: "Competitor Benchmarking", desc: "6-dimension radar chart", href: "/resources/competitor-benchmarking" },
      { name: "Competitor Matrix", desc: "10-dimension visual comparison", href: "/resources/competitor-matrix" },
      { name: "Competitor Pricing Tracker", desc: "Pricing & feature tracker", href: "/resources/competitor-pricing-tracker" },
      { name: "Competitor Ad Spy", desc: "Multi-platform ad tracker", href: "/resources/competitor-ad-spy" },
      { name: "Competitive Gap Analyzer", desc: "10-dimension gap analysis", href: "/resources/competitive-gap" },
      { name: "Competitive Intel Dashboard", desc: "5-competitor threat scoring", href: "/resources/competitive-intel-dashboard" },
      { name: "Competitive SWOT", desc: "Side-by-side SWOT comparison", href: "/resources/competitive-swot" },
      { name: "Competitive SWOT Analyzer", desc: "Multi-competitor strategic insights", href: "/resources/competitive-swot-analyzer" },
      { name: "Agency Comparison Guide", desc: "Evaluating agencies", href: "/resources/agency-comparison" },
      { name: "Agency Pricing Calculator", desc: "Hourly, retainer & project models", href: "/resources/agency-pricing-calculator" },
      { name: "Pricing Calculator", desc: "Marketing cost estimates", href: "/resources/pricing-calculator" },
      { name: "Vendor Evaluation Scorecard", desc: "8-category vendor comparison", href: "/resources/vendor-evaluation" },
    ],
  },
  {
    title: "Customer & Lead Generation",
    tools: [
      { name: "Persona Builder", desc: "Detailed buyer personas", href: "/resources/persona-builder" },
      { name: "Persona Workshop", desc: "Guided persona exercises", href: "/resources/persona-workshop" },
      { name: "Buyer Persona Quiz", desc: "8-question persona builder", href: "/resources/buyer-persona-quiz" },
      { name: "Audience Targeting Worksheet", desc: "Ideal customer profile builder", href: "/resources/audience-targeting-worksheet" },
      { name: "Customer Journey Builder", desc: "5-stage touchpoint mapper", href: "/resources/customer-journey-builder" },
      { name: "Customer Journey Mapper", desc: "Emotion curve visualization", href: "/resources/customer-journey-mapper" },
      { name: "Customer Feedback Survey", desc: "NPS, CSAT & CES templates", href: "/resources/customer-feedback-survey" },
      { name: "Lead Scoring Calculator", desc: "8-criteria scoring model", href: "/resources/lead-scoring-calculator" },
      { name: "CLV Calculator", desc: "Customer lifetime value", href: "/resources/clv-calculator" },
      { name: "Retention Calculator", desc: "Churn rate & cohort analysis", href: "/resources/retention-calculator" },
    ],
  },
  {
    title: "Marketing Technology",
    tools: [
      { name: "Marketing Stack Audit", desc: "30-tool technology audit", href: "/resources/marketing-stack-audit" },
      { name: "Martech Stack Planner", desc: "8-category stack planner", href: "/resources/martech-stack-planner" },
      { name: "SLA Tracker", desc: "Service level compliance tracking", href: "/resources/sla-tracker" },
      { name: "Client Onboarding Checklist", desc: "5-phase onboarding generator", href: "/resources/client-onboarding-checklist" },
      { name: "UTM Builder", desc: "Campaign tracking links", href: "/resources/utm-builder" },
    ],
  },
  {
    title: "Guides & Benchmarks",
    tools: [
      { name: "Marketing Trends 2026", desc: "10 key shifts this year", href: "/resources/marketing-trends-2026" },
      { name: "Marketing Trends 2025", desc: "AI, privacy, video & more", href: "/resources/marketing-trends-2025" },
      { name: "Marketing Statistics 2026", desc: "35+ updated benchmarks", href: "/resources/marketing-statistics-2026" },
      { name: "Marketing Statistics 2025", desc: "45+ data points", href: "/resources/marketing-statistics" },
      { name: "Startup Marketing Guide", desc: "Marketing from zero", href: "/resources/startup-marketing-guide" },
      { name: "Small Business Guide", desc: "Channel priorities & budgets", href: "/resources/small-business-guide" },
      { name: "Checklists", desc: "SEO, PPC, social & launch", href: "/resources/checklists" },
    ],
  },
];

const totalTools = categories.reduce((sum, cat) => sum + cat.tools.length, 0);

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

      <section className="px-6 lg:px-12 pt-24 pb-12">
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
      <section className="px-6 lg:px-12 pb-8">
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
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-2">{cat.title}</h2>
              <p className="text-base text-gray-400 mb-8">{cat.tools.length} tools</p>
            </Animate>
            <Stagger stagger={30} animation="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cat.tools.map((tool) => (
                <Link key={tool.href} href={tool.href} className="group bg-white border border-gray-200 hover:border-black/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 motion-reduce:transition-none p-5 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black group-hover:underline mb-1">{tool.name}</h3>
                  <p className="text-base text-gray-500 leading-relaxed">{tool.desc}</p>
                </Link>
              ))}
            </Stagger>
          </div>
        </section>
      ))}

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Putting These Insights to Work?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team can turn the data from these tools into a growth strategy tailored to your business.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
