import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Resources — Digital Marketing Guides & Tools",
  description: "Free digital marketing resources: blog articles, glossary, checklists, and guides to help you grow your business online.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources" },
  openGraph: {
    title: "Free Marketing Resources",
    description:
      "Blog articles, glossary, checklists, ROI calculator, and guides to help you grow your business online.",
  },
};

const resources = [
  {
    title: "Blog",
    desc: "Expert insights on SEO, advertising, social media, branding, web development, and digital marketing strategy.",
    href: "/blog",
    count: "660+ articles",
  },
  {
    title: "FAQ",
    desc: "Answers to the most common questions about our services, process, pricing, and what it's like to work with us.",
    href: "/faq",
    count: "50 questions",
  },
  {
    title: "Glossary",
    desc: "A comprehensive reference for key digital marketing terms, acronyms, and concepts.",
    href: "/glossary",
    count: "175 terms",
  },
  {
    title: "Checklists",
    desc: "Interactive checklists for website launches, monthly SEO, social media management, and PPC campaigns.",
    href: "/resources/checklists",
    count: "4 checklists",
  },
  {
    title: "ROI Calculator",
    desc: "Estimate the potential return on your digital marketing investment with our interactive calculator.",
    href: "/resources/roi-calculator",
    count: "Interactive tool",
  },
  {
    title: "A/B Test Calculator",
    desc: "Calculate the sample size and duration needed for statistically significant A/B tests. Enter your traffic and conversion rates for instant results.",
    href: "/resources/ab-test-calculator",
    count: "Interactive tool",
  },
  {
    title: "Service Finder",
    desc: "Answer a few questions and get personalized service recommendations for your business goals.",
    href: "/services/finder",
    count: "Interactive quiz",
  },
  {
    title: "SEO vs PPC Guide",
    desc: "A detailed comparison of SEO and PPC to help you decide which channel is right for your business.",
    href: "/resources/seo-vs-ppc",
    count: "Comparison guide",
  },
  {
    title: "Web Platform Guide",
    desc: "Compare WordPress, Shopify, and Next.js across cost, speed, SEO, and customization to pick the right platform.",
    href: "/resources/web-platform-guide",
    count: "Comparison guide",
  },
  {
    title: "Budget Calculator",
    desc: "Enter your monthly budget, business type, and goal to get a recommended channel allocation across SEO, PPC, social, and more.",
    href: "/resources/budget-calculator",
    count: "Interactive tool",
  },
  {
    title: "Website Grader",
    desc: "Answer 8 questions about your website and get an instant performance grade with a breakdown of strengths and weaknesses.",
    href: "/resources/website-grader",
    count: "Interactive quiz",
  },
  {
    title: "SEO Health Check",
    desc: "An interactive 20-point checklist to evaluate your website's SEO health. Instant scoring and actionable tips for each item.",
    href: "/resources/seo-checklist",
    count: "20-point audit",
  },
  {
    title: "Headline Analyzer",
    desc: "Test your blog titles, ad headlines, and email subject lines. Get instant feedback on word choice, length, and emotional impact.",
    href: "/resources/headline-analyzer",
    count: "Interactive tool",
  },
  {
    title: "Social Share Preview",
    desc: "Preview how your links look on Facebook, Twitter/X, and LinkedIn. Optimize your Open Graph tags for maximum engagement.",
    href: "/resources/og-preview",
    count: "Interactive tool",
  },
  {
    title: "Meta Description Generator",
    desc: "Write and optimize meta descriptions for your web pages. Use templates or write your own, then check length and quality instantly.",
    href: "/resources/meta-description-generator",
    count: "Interactive tool",
  },
  {
    title: "Social Media Planner",
    desc: "Select your platforms and get a customized posting schedule with content types, frequencies, best times, and tips.",
    href: "/resources/social-media-planner",
    count: "6 platforms",
  },
  {
    title: "Content ROI Calculator",
    desc: "Estimate the long-term value of content marketing. See month-by-month projections of traffic, leads, and revenue as content compounds.",
    href: "/resources/content-roi-calculator",
    count: "Interactive tool",
  },
  {
    title: "PPC Audit Checklist",
    desc: "A 37-point checklist to evaluate your Google Ads account. Check off items to see your account health score with grades.",
    href: "/resources/ppc-audit-checklist",
    count: "37-point audit",
  },
  {
    title: "Email ROI Calculator",
    desc: "Estimate the revenue potential of your email marketing program. Enter your list size, rates, and costs for projected returns.",
    href: "/resources/email-roi-calculator",
    count: "Interactive tool",
  },
  {
    title: "Startup Marketing Guide",
    desc: "A practical guide to building a marketing engine from zero. Phases, budget tiers, channel priorities, and common mistakes to avoid.",
    href: "/resources/startup-marketing-guide",
    count: "Complete guide",
  },
  {
    title: "Choosing an Agency",
    desc: "A practical guide to evaluating digital marketing agencies. Red flags, questions to ask, and what to expect from a good partnership.",
    href: "/resources/agency-comparison",
    count: "Complete guide",
  },
  {
    title: "Marketing Trends 2026",
    desc: "The 10 most important shifts in digital marketing this year. Agentic AI, first-party data, video commerce, SGE, brand building — with actionable takeaways.",
    href: "/resources/marketing-trends-2026",
    count: "10 trends",
  },
  {
    title: "Marketing Trends 2025",
    desc: "The 10 most important shifts in digital marketing for 2025. AI, privacy, video, zero-click search, and more — with actionable takeaways.",
    href: "/resources/marketing-trends-2025",
    count: "10 trends",
  },
  {
    title: "Marketing Statistics 2026",
    desc: "Updated industry benchmarks across SEO, paid ads, social media, email, content marketing, e-commerce, and AI adoption to inform your 2026 strategy.",
    href: "/resources/marketing-statistics-2026",
    count: "35+ data points",
  },
  {
    title: "Marketing Statistics 2025",
    desc: "Essential digital marketing statistics across SEO, PPC, social media, email, content marketing, and e-commerce to inform your strategy.",
    href: "/resources/marketing-statistics",
    count: "45+ data points",
  },
  {
    title: "Brand Name Generator",
    desc: "Get instant brand name ideas for your business. Enter a keyword, choose a naming style, and generate creative combinations.",
    href: "/resources/brand-name-generator",
    count: "Interactive tool",
  },
  {
    title: "Ad Copy Generator",
    desc: "Generate ad copy for Google, Facebook, LinkedIn, and email. Choose your platform, tone, and inputs to get instant copy variations with character counts.",
    href: "/resources/ad-copy-generator",
    count: "4 platforms",
  },
  {
    title: "Email Subject Line Tester",
    desc: "Test your email subject lines for deliverability, spam risk, and engagement. Get an instant score with detailed feedback on each factor.",
    href: "/resources/email-subject-tester",
    count: "Interactive tool",
  },
  {
    title: "Keyword Density Checker",
    desc: "Analyze your content for keyword frequency and density. Paste your text and get instant SEO insights with density percentages and recommendations.",
    href: "/resources/keyword-density-checker",
    count: "Interactive tool",
  },
  {
    title: "Competitor Analysis",
    desc: "Map out your competitive landscape with this interactive worksheet. Compare up to 6 competitors across strategy, channels, and positioning.",
    href: "/resources/competitor-analysis",
    count: "Interactive worksheet",
  },
  {
    title: "Marketing Budget Planner",
    desc: "Get a detailed channel allocation based on your budget size, business stage, and primary goal. Visual breakdown with spending amounts and rationale.",
    href: "/resources/marketing-budget-planner",
    count: "Interactive planner",
  },
  {
    title: "Website Speed Assessment",
    desc: "Answer 8 questions about your website infrastructure and get an instant speed score with prioritized recommendations.",
    href: "/resources/speed-test",
    count: "8-point assessment",
  },
  {
    title: "UTM Link Builder",
    desc: "Generate UTM-tagged URLs for your marketing campaigns. Track which channels, campaigns, and creatives drive results in Google Analytics.",
    href: "/resources/utm-builder",
    count: "Interactive tool",
  },
  {
    title: "Color Contrast Checker",
    desc: "Check if your text and background colors meet WCAG accessibility standards. Live preview with AA and AAA compliance results.",
    href: "/resources/contrast-checker",
    count: "Interactive tool",
  },
  {
    title: "Image Size Guide",
    desc: "Complete reference for image dimensions across Facebook, Instagram, LinkedIn, X, YouTube, Google Ads, and website SEO.",
    href: "/resources/image-size-guide",
    count: "7 platforms",
  },
  {
    title: "Readability Checker",
    desc: "Analyze your content's readability with Flesch Reading Ease scoring. Get grade-level interpretation, word stats, and tips for improving clarity.",
    href: "/resources/readability-checker",
    count: "Interactive tool",
  },
  {
    title: "CTA Copy Generator",
    desc: "Generate call-to-action copy for buttons, headlines, and subheadlines. Choose your business type, goal, and tone for instant CTA variations.",
    href: "/resources/cta-generator",
    count: "Interactive tool",
  },
  {
    title: "Website Audit Checklist",
    desc: "Answer 25 questions across 5 categories and get an instant website audit score with priority recommendations.",
    href: "/resources/website-audit",
    count: "25-point audit",
  },
  {
    title: "Marketing Funnel Calculator",
    desc: "Input your traffic and conversion metrics at each funnel stage to find where you're losing the most revenue.",
    href: "/resources/funnel-calculator",
    count: "Interactive tool",
  },
  {
    title: "Email Campaign Planner",
    desc: "Select your campaign type, audience, and list size to get a complete email sequence with subject line templates, timing, and benchmarks.",
    href: "/resources/email-campaign-planner",
    count: "6 campaign types",
  },
  {
    title: "Landing Page Grader",
    desc: "Answer 20 questions about your landing page and get an instant grade with priority recommendations and quick wins.",
    href: "/resources/landing-page-grader",
    count: "20-point grader",
  },
  {
    title: "Schema Markup Generator",
    desc: "Generate JSON-LD structured data for your website. Support for LocalBusiness, Organization, Product, FAQPage, Article, and BreadcrumbList schemas.",
    href: "/resources/schema-generator",
    count: "6 schema types",
  },
  {
    title: "Hashtag Generator",
    desc: "Generate optimized hashtags for Instagram, TikTok, LinkedIn, Twitter/X, and YouTube. 30 hashtags per niche across high-reach, medium, and low-competition tiers.",
    href: "/resources/hashtag-generator",
    count: "15 niches",
  },
  {
    title: "Buyer Persona Builder",
    desc: "Build detailed buyer personas with demographics, psychographics, buying behavior, and brand preferences. Export as text for your marketing team.",
    href: "/resources/persona-builder",
    count: "Interactive tool",
  },
  {
    title: "Content Calendar",
    desc: "Generate a customized content calendar by industry, frequency, and channels. Weekly grid with topic suggestions and content pillars.",
    href: "/resources/content-calendar",
    count: "15 industries",
  },
  {
    title: "Color Palette Generator",
    desc: "Generate brand color palettes with complementary, analogous, triadic, and monochromatic schemes. WCAG contrast ratios included.",
    href: "/resources/color-palette-generator",
    count: "5 palette types",
  },
  {
    title: "Social Media ROI Calculator",
    desc: "Calculate the return on investment of your social media marketing. Enter your spend, engagement, and conversion data for instant ROI analysis.",
    href: "/resources/social-media-roi",
    count: "Interactive tool",
  },
  {
    title: "SWOT Analysis",
    desc: "Build a complete SWOT analysis with strengths, weaknesses, opportunities, and threats. Get strategy recommendations based on your inputs.",
    href: "/resources/swot-analysis",
    count: "Interactive tool",
  },
  {
    title: "Brand Voice Generator",
    desc: "Define your brand voice with personality traits, tone, and audience. Get a complete voice guide with do's and don'ts, sample copy, and a word bank.",
    href: "/resources/brand-voice-generator",
    count: "Interactive tool",
  },
  {
    title: "Customer Lifetime Value Calculator",
    desc: "Calculate the lifetime value of your customers. Enter order value, purchase frequency, and margins to find your CLV, CLV:CAC ratio, and payback period.",
    href: "/resources/clv-calculator",
    count: "Interactive tool",
  },
  {
    title: "Google Ads Budget Estimator",
    desc: "Estimate your Google Ads CPC, clicks, and conversions by industry and location. See what your budget gets you with industry benchmarks.",
    href: "/resources/google-ads-estimator",
    count: "15 industries",
  },
  {
    title: "Website Migration Checklist",
    desc: "A 30-point interactive checklist for website migrations. Five phases from planning to post-launch with progress tracking.",
    href: "/resources/migration-checklist",
    count: "30-point checklist",
  },
  {
    title: "Social Media Audit",
    desc: "Grade your social media presence with a 25-point checklist across profile, content, engagement, analytics, and growth. Get actionable recommendations.",
    href: "/resources/social-media-audit",
    count: "25-point audit",
  },
  {
    title: "Marketing Pricing Calculator",
    desc: "Estimate marketing costs by business size, services needed, and engagement type. Per-service breakdown with industry benchmarks.",
    href: "/resources/pricing-calculator",
    count: "Interactive tool",
  },
  {
    title: "CRO Audit Checklist",
    desc: "A 20-point conversion rate optimization audit across technical performance, above-the-fold design, copy, and forms/CTAs. Instant grading with priority fixes.",
    href: "/resources/cro-audit",
    count: "20-point audit",
  },
  {
    title: "Email Deliverability Checker",
    desc: "Assess your email deliverability health across authentication, list hygiene, content quality, and sending practices. Priority action plan included.",
    href: "/resources/email-deliverability",
    count: "20-point checklist",
  },
  {
    title: "Influencer ROI Calculator",
    desc: "Estimate the ROI of influencer marketing campaigns. Set budget, tier, platform, and campaign type for reach, engagement, and revenue projections.",
    href: "/resources/influencer-roi",
    count: "Interactive tool",
  },
  {
    title: "Marketing Maturity Assessment",
    desc: "24-question assessment across 6 dimensions: strategy, data, content, channels, technology, and team. Get your maturity level with a tailored growth roadmap.",
    href: "/resources/marketing-maturity",
    count: "24-question quiz",
  },
  {
    title: "Competitive Gap Analyzer",
    desc: "Rate yourself and your top competitor across 10 marketing dimensions. Get a visual gap analysis with priority action plan and quick wins.",
    href: "/resources/competitive-gap",
    count: "Interactive worksheet",
  },
  {
    title: "SEO Content Brief Generator",
    desc: "Generate a complete SEO content brief with suggested title, heading structure, content outline, internal linking recommendations, and SEO checklist.",
    href: "/resources/content-brief",
    count: "Interactive tool",
  },
  {
    title: "Social Proof Strategy Builder",
    desc: "Develop your social proof strategy by business type. Get a social proof score, priority types to develop, placement recommendations, and a 90-day plan.",
    href: "/resources/social-proof-guide",
    count: "Interactive guide",
  },
  {
    title: "Marketing KPI Dashboard Builder",
    desc: "Define the right KPIs for your marketing dashboard based on business goals, active channels, budget, and stage. Channel-specific benchmarks included.",
    href: "/resources/kpi-dashboard",
    count: "Interactive tool",
  },
  {
    title: "Brand Positioning Canvas",
    desc: "Define your brand positioning across 8 dimensions and generate a positioning statement, messaging framework, and consistency checklist.",
    href: "/resources/brand-positioning",
    count: "Interactive tool",
  },
  {
    title: "Marketing Channel Selector",
    desc: "Take a 7-question quiz to get personalized marketing channel recommendations with budget allocation, timeline, and a quick-start roadmap.",
    href: "/resources/channel-selector",
    count: "Interactive quiz",
  },
  {
    title: "Website Conversion Checklist",
    desc: "Score your website's conversion readiness across 30 items in 5 categories. Get a letter grade, priority improvements, and category recommendations.",
    href: "/resources/conversion-checklist",
    count: "Interactive checklist",
  },
  {
    title: "Buyer Persona Quiz",
    desc: "Take an 8-question quiz to build a detailed buyer persona with communication strategy, objection handling guide, and content strategy map.",
    href: "/resources/buyer-persona-quiz",
    count: "Interactive quiz",
  },
  {
    title: "Content Gap Analyzer",
    desc: "Evaluate your content across buyer journey stages. Get a maturity score, funnel visualization, priority gaps, and a 3-month content calendar.",
    href: "/resources/content-gap-analyzer",
    count: "Interactive worksheet",
  },
  {
    title: "Ad Spend Efficiency Calculator",
    desc: "Evaluate your ad spend efficiency with CPA, ROAS, and industry benchmarks. Get optimization suggestions and budget reallocation recommendations.",
    href: "/resources/ad-spend-calculator",
    count: "Interactive calculator",
  },
  {
    title: "Email Sequence Planner",
    desc: "Plan email marketing sequences for welcome series, nurture flows, cart abandonment, and more. Get subject line templates, timing recommendations, and best practices.",
    href: "/resources/email-sequence-planner",
    count: "Interactive planner",
  },
  {
    title: "Website Tech Stack Advisor",
    desc: "Find the right technology stack for your website or web app. Answer questions about your project and get platform, hosting, and tool recommendations.",
    href: "/resources/tech-stack-advisor",
    count: "Interactive advisor",
  },
  {
    title: "Competitive SWOT Matrix",
    desc: "Build a side-by-side SWOT comparison of your company against competitors. Identify competitive advantages, vulnerabilities, and strategic opportunities.",
    href: "/resources/competitive-swot",
    count: "Interactive tool",
  },
  {
    title: "Social Media Calendar",
    desc: "Generate a 4-week social media content calendar with post ideas, content types, hashtags, and best posting times tailored to your industry and platforms.",
    href: "/resources/social-calendar",
    count: "4-week planner",
  },
  {
    title: "Marketing Funnel Visualizer",
    desc: "Build and analyze your marketing funnel. Enter stage data to see conversion rates, drop-off points, and optimization recommendations for your weakest stage.",
    href: "/resources/funnel-visualizer",
    count: "Interactive tool",
  },
  {
    title: "Website Launch Checklist",
    desc: "A 44-item pre-launch checklist with countdown timer. Track progress across content, SEO, design, technical, legal, and marketing categories.",
    href: "/resources/launch-countdown",
    count: "44-item checklist",
  },
  {
    title: "Lead Magnet Idea Generator",
    desc: "Generate high-converting lead magnet ideas tailored to your industry, funnel stage, and preferred format with promotion strategies.",
    href: "/resources/lead-magnet-generator",
    count: "Interactive tool",
  },
  {
    title: "Pricing Page Optimizer",
    desc: "Audit your pricing page across 32 conversion factors — structure, trust signals, CTAs, objection handling, UX, and psychology.",
    href: "/resources/pricing-optimizer",
    count: "32-point audit",
  },
  {
    title: "Email Marketing Health Checker",
    desc: "Audit your email marketing across 25 factors — list hygiene, content quality, sending practices, engagement, and compliance.",
    href: "/resources/email-health-checker",
    count: "25-point audit",
  },
  {
    title: "Competitor Analysis Matrix",
    desc: "Rate your company and up to 4 competitors across 10 dimensions. Visualize with radar chart, get gap analysis and strategic recommendations.",
    href: "/resources/competitor-matrix",
    count: "Interactive tool",
  },
  {
    title: "A/B Test Ideas Generator",
    desc: "Generate prioritized A/B test ideas for any page type. ICE scoring, sample size estimates, hypothesis templates, and implementation guidance.",
    href: "/resources/ab-test-ideas",
    count: "350+ test ideas",
  },
  {
    title: "Content Audit Scorecard",
    desc: "Evaluate your content across 30 criteria in 6 categories. Get maturity level, radar chart, quick wins, and prioritized recommendations.",
    href: "/resources/content-audit-scorecard",
    count: "30-point audit",
  },
  {
    title: "Website Redesign Planner",
    desc: "Plan your website redesign with structured assessment, goal setting, scope definition, and a phased improvement roadmap.",
    href: "/resources/redesign-planner",
    count: "Interactive planner",
  },
  {
    title: "SEO Content Gap Finder",
    desc: "Identify content gaps in your SEO strategy by analyzing topic coverage against competitors and search intent to find untapped ranking opportunities.",
    href: "/resources/seo-gap-finder",
    count: "Gap analysis",
  },
  {
    title: "Marketing ROI Dashboard",
    desc: "Compare marketing channel performance side by side. Enter spend and revenue for up to 8 channels to see ROI, cost per lead, charts, and budget optimization suggestions.",
    href: "/resources/roi-dashboard",
    count: "Interactive dashboard",
  },
  {
    title: "Brand Consistency Checker",
    desc: "Rate your brand consistency across up to 5 touchpoints and 6 dimensions. Get an overall score, radar chart, bar chart, and prioritized recommendations.",
    href: "/resources/brand-consistency-checker",
    count: "Interactive tool",
  },
  {
    title: "Customer Journey Mapper",
    desc: "Map your customer experience across 5 stages with touchpoints, emotions, pain points, and opportunities. Visualize the journey with an emotion curve and get recommendations.",
    href: "/resources/customer-journey-mapper",
    count: "Interactive tool",
  },
  {
    title: "Content Repurposing Planner",
    desc: "Turn one piece of content into many. Get a visual repurposing plan with derivative formats, timelines, content tree, and multiplication metrics for any platform mix.",
    href: "/resources/content-repurposing",
    count: "Interactive planner",
  },
  {
    title: "Channel Recommender",
    desc: "Enter your business details, goals, and budget to get a ranked list of recommended marketing channels with match scores, ROI estimates, and key tactics.",
    href: "/resources/channel-recommender",
    count: "Interactive tool",
  },
  {
    title: "SEO Audit Score",
    desc: "Check 40 SEO factors across technical, on-page, content, off-page, and UX categories. Get your site health score and prioritized recommendations.",
    href: "/resources/seo-audit-score",
    count: "40 checkpoints",
  },
  {
    title: "Social Post Generator",
    desc: "Generate platform-specific post templates for LinkedIn, Instagram, Twitter/X, Facebook, and TikTok from your topic and key message.",
    href: "/resources/social-post-generator",
    count: "5 platforms",
  },
  {
    title: "Marketing Calendar",
    desc: "Generate a 12-month marketing calendar tailored to your industry with campaign themes, key dates, channel recommendations, and budget allocation.",
    href: "/resources/marketing-calendar",
    count: "12 months",
  },
  {
    title: "Website Readiness Scorecard",
    desc: "Assess your website across mobile experience, page speed, SEO, security, and accessibility with weighted scoring and prioritised recommendations.",
    href: "/resources/website-readiness-scorecard",
    count: "40 checkpoints",
  },
  {
    title: "Email Subject Line A/B Tester",
    desc: "Compare two email subject lines side-by-side with scoring on length, power words, personalisation, urgency, and clarity.",
    href: "/resources/email-subject-ab-tester",
    count: "5 criteria",
  },
  {
    title: "Audience Targeting Worksheet",
    desc: "Build a detailed ideal customer profile with demographics, psychographics, pain points, and channel preferences, then export a targeting brief.",
    href: "/resources/audience-targeting-worksheet",
    count: "4-step worksheet",
  },
  {
    title: "Competitor Ad Spy Worksheet",
    desc: "Document and analyse competitor advertising across platforms. Track messaging, offers, CTAs, and creative strategies with exportable analysis.",
    href: "/resources/competitor-ad-spy",
    count: "Multi-ad tracker",
  },
  {
    title: "Marketing Goal Setter",
    desc: "Set SMART marketing goals with measurable targets, deadlines, strategies, and milestones. Track multiple goals and export your plan.",
    href: "/resources/marketing-goal-setter",
    count: "SMART framework",
  },
  {
    title: "Brand Tone of Voice Generator",
    desc: "Define your brand voice with tone spectrum mapping, adjective selection, do/don't examples, and exportable voice guide for your team.",
    href: "/resources/brand-tone-generator",
    count: "4-step generator",
  },
  {
    title: "Campaign Naming Convention",
    desc: "Generate consistent campaign naming conventions for ads, email, and UTM parameters. Keep your marketing data clean and organised.",
    href: "/resources/campaign-naming-convention",
    count: "Name builder",
  },
  {
    title: "Marketing Stack Audit",
    desc: "Audit your marketing technology stack across analytics, CRM, email, ads, social, and content tools. Identify gaps and optimisation opportunities.",
    href: "/resources/marketing-stack-audit",
    count: "30 tools assessed",
  },
  {
    title: "Pricing Page Analyser",
    desc: "Check your pricing page against 20 conversion best practices across clarity, persuasion, trust, and UX dimensions.",
    href: "/resources/pricing-page-analyzer",
    count: "20 checkpoints",
  },
  {
    title: "Social Media Bio Generator",
    desc: "Generate optimised bios for LinkedIn, Instagram, Twitter/X, TikTok, and Facebook with tone, keywords, and CTAs.",
    href: "/resources/social-media-bio-generator",
    count: "5 platforms",
  },
  {
    title: "Content Brief Generator",
    desc: "Create detailed content briefs for writers with audience, keywords, outline, tone, word count, and competitive references.",
    href: "/resources/content-brief-generator",
    count: "5-step wizard",
  },
  {
    title: "Marketing Expense Tracker",
    desc: "Track marketing spend by channel, campaign, and month with budget monitoring, charts, and CSV export.",
    href: "/resources/marketing-expense-tracker",
    count: "13 channels",
  },
  {
    title: "Lead Scoring Calculator",
    desc: "Build a lead scoring model with demographic, firmographic, and behavioural criteria. Test with real leads and define thresholds.",
    href: "/resources/lead-scoring-calculator",
    count: "8 criteria",
  },
  {
    title: "Marketing Timeline Planner",
    desc: "Plan campaigns with milestones, channel assignments, owners, status tracking, and a visual Gantt-style timeline view.",
    href: "/resources/marketing-timeline-planner",
    count: "10 channels",
  },
  {
    title: "Ad Copy Analyser",
    desc: "Score ad copy against best practices for headlines, descriptions, CTAs, and emotional triggers across 5 platforms.",
    href: "/resources/ad-copy-analyzer",
    count: "5 platforms",
  },
  {
    title: "Small Business Guide",
    desc: "A practical guide to digital marketing for small businesses — which channels to prioritize, budget guidance, and common mistakes to avoid.",
    href: "/resources/small-business-guide",
    count: "Complete guide",
  },
  {
    title: "How We Measure Results",
    desc: "Our KPI framework, reporting cadence, and the analytics platforms we use to track and optimize performance.",
    href: "/results",
    count: "Framework",
  },
  {
    title: "Our Process",
    desc: "Learn how we take you from strategy to results with our proven 5-step marketing process.",
    href: "/process",
    count: "5 steps",
  },
  {
    title: "Why Markit Media",
    desc: "See how we compare to typical agencies and learn about our operating principles.",
    href: "/why-markit-media",
    count: "Comparison guide",
  },
];

export default function ResourcesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Markit Media Resources",
    description: "Free digital marketing resources, guides, and tools.",
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Resources" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Resources</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Learn, Plan, and Grow
            </h1>
            <SectionDesc>
              Free resources to help you understand digital marketing and make better decisions for your business.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Available resources">
        <div className="max-w-7xl mx-auto">
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((r) => (
              <Link key={r.href} href={r.href} className="group bg-white border border-gray-200 hover:border-black/30 transition-all motion-reduce:transition-none p-8 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <span className="text-base font-medium text-gray-400 mb-2 block">{r.count}</span>
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-3">{r.title}</h2>
                <p className="text-base text-gray-500 leading-relaxed">{r.desc}</p>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Put This Knowledge to Work?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let our team turn these insights into a strategy that drives real results for your business.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none">
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
