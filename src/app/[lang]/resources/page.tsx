import type { Metadata } from "next";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Free Tools & Resources | Digital Marketing Guides",
  description: "Explore free marketing tools, calculators, audits, checklists, guides and digital marketing resources from Markit Media. No signup required for interactive tools.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
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
    count: "4,000+ articles",
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
    count: "300 terms",
  },
  {
    title: "Checklists",
    desc: "Interactive checklists for website launches, monthly SEO, social media management, and PPC campaigns.",
    href: "/free-tools/free-checklists",
    count: "4 checklists",
  },
  {
    title: "ROI Calculator",
    desc: "Estimate the potential return on your digital marketing investment with our interactive calculator.",
    href: "/free-tools/free-roi-calculator",
    count: "Interactive tool",
  },
  {
    title: "A/B Test Calculator",
    desc: "Calculate the sample size and duration needed for statistically significant A/B tests. Enter your traffic and conversion rates for instant results.",
    href: "/free-tools/free-ab-test-calculator",
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
    href: "/free-tools/free-seo-vs-ppc",
    count: "Comparison guide",
  },
  {
    title: "Web Platform Guide",
    desc: "Compare WordPress, Shopify, and Next.js across cost, speed, SEO, and customization to pick the right platform.",
    href: "/free-tools/free-web-platform-guide",
    count: "Comparison guide",
  },
  {
    title: "Budget Calculator",
    desc: "Enter your monthly budget, business type, and goal to get a recommended channel allocation across SEO, PPC, social, and more.",
    href: "/free-tools/free-budget-calculator",
    count: "Interactive tool",
  },
  {
    title: "Website Grader",
    desc: "Answer 8 questions about your website and get an instant performance grade with a breakdown of strengths and weaknesses.",
    href: "/free-tools/free-website-grader",
    count: "Interactive quiz",
  },
  {
    title: "SEO Health Check",
    desc: "An interactive 20-point checklist to evaluate your website's SEO health. Instant scoring and actionable tips for each item.",
    href: "/free-tools/free-seo-checklist",
    count: "20-point audit",
  },
  {
    title: "Headline Analyzer",
    desc: "Test your blog titles, ad headlines, and email subject lines. Get instant feedback on word choice, length, and emotional impact.",
    href: "/free-tools/free-headline-analyzer",
    count: "Interactive tool",
  },
  {
    title: "Social Share Preview",
    desc: "Preview how your links look on Facebook, Twitter/X, and LinkedIn. Optimize your Open Graph tags for maximum engagement.",
    href: "/free-tools/free-og-preview",
    count: "Interactive tool",
  },
  {
    title: "Meta Description Generator",
    desc: "Write and optimize meta descriptions for your web pages. Use templates or write your own, then check length and quality instantly.",
    href: "/free-tools/free-meta-description-generator",
    count: "Interactive tool",
  },
  {
    title: "Social Media Planner",
    desc: "Select your platforms and get a customized posting schedule with content types, frequencies, best times, and tips.",
    href: "/free-tools/free-social-media-planner",
    count: "6 platforms",
  },
  {
    title: "Content ROI Calculator",
    desc: "Estimate the long-term value of content marketing. See month-by-month projections of traffic, leads, and revenue as content compounds.",
    href: "/free-tools/free-content-roi-calculator",
    count: "Interactive tool",
  },
  {
    title: "PPC Audit Checklist",
    desc: "A 37-point checklist to evaluate your Google Ads account. Check off items to see your account health score with grades.",
    href: "/free-tools/free-ppc-audit-checklist",
    count: "37-point audit",
  },
  {
    title: "Email ROI Calculator",
    desc: "Estimate the revenue potential of your email marketing program. Enter your list size, rates, and costs for projected returns.",
    href: "/free-tools/free-email-roi-calculator",
    count: "Interactive tool",
  },
  {
    title: "Startup Marketing Guide",
    desc: "A practical guide to building a marketing engine from zero. Phases, budget tiers, channel priorities, and common mistakes to avoid.",
    href: "/free-tools/free-startup-marketing-guide",
    count: "Complete guide",
  },
  {
    title: "Choosing an Agency",
    desc: "A practical guide to evaluating digital marketing agencies. Red flags, questions to ask, and what to expect from a good partnership.",
    href: "/free-tools/free-agency-comparison",
    count: "Complete guide",
  },
  {
    title: "Marketing Trends 2026",
    desc: "The 10 most important shifts in digital marketing this year. Agentic AI, first-party data, video commerce, SGE, brand building — with actionable takeaways.",
    href: "/free-tools/free-marketing-trends-2026",
    count: "10 trends",
  },
  {
    title: "Marketing Trends 2025",
    desc: "The 10 most important shifts in digital marketing for 2025. AI, privacy, video, zero-click search, and more — with actionable takeaways.",
    href: "/free-tools/free-marketing-trends-2025",
    count: "10 trends",
  },
  {
    title: "Marketing Statistics 2026",
    desc: "Updated industry benchmarks across SEO, paid ads, social media, email, content marketing, e-commerce, and AI adoption to inform your 2026 strategy.",
    href: "/free-tools/free-marketing-statistics-2026",
    count: "35+ data points",
  },
  {
    title: "Marketing Statistics 2025",
    desc: "Essential digital marketing statistics across SEO, PPC, social media, email, content marketing, and e-commerce to inform your strategy.",
    href: "/free-tools/free-marketing-statistics",
    count: "45+ data points",
  },
  {
    title: "Brand Name Generator",
    desc: "Get instant brand name ideas for your business. Enter a keyword, choose a naming style, and generate creative combinations.",
    href: "/free-tools/free-brand-name-generator",
    count: "Interactive tool",
  },
  {
    title: "Ad Copy Generator",
    desc: "Generate ad copy for Google, Facebook, LinkedIn, and email. Choose your platform, tone, and inputs to get instant copy variations with character counts.",
    href: "/free-tools/free-ad-copy-generator",
    count: "4 platforms",
  },
  {
    title: "Email Subject Line Tester",
    desc: "Test your email subject lines for deliverability, spam risk, and engagement. Get an instant score with detailed feedback on each factor.",
    href: "/free-tools/free-email-subject-tester",
    count: "Interactive tool",
  },
  {
    title: "Keyword Density Checker",
    desc: "Analyze your content for keyword frequency and density. Paste your text and get instant SEO insights with density percentages and recommendations.",
    href: "/free-tools/free-keyword-density-checker",
    count: "Interactive tool",
  },
  {
    title: "Competitor Analysis",
    desc: "Map out your competitive landscape with this interactive worksheet. Compare up to 6 competitors across strategy, channels, and positioning.",
    href: "/free-tools/free-competitor-analysis",
    count: "Interactive worksheet",
  },
  {
    title: "Marketing Budget Planner",
    desc: "Get a detailed channel allocation based on your budget size, business stage, and primary goal. Visual breakdown with spending amounts and rationale.",
    href: "/free-tools/free-marketing-budget-planner",
    count: "Interactive planner",
  },
  {
    title: "Website Speed Assessment",
    desc: "Answer 8 questions about your website infrastructure and get an instant speed score with prioritized recommendations.",
    href: "/free-tools/free-speed-test",
    count: "8-point assessment",
  },
  {
    title: "UTM Link Builder",
    desc: "Generate UTM-tagged URLs for your marketing campaigns. Track which channels, campaigns, and creatives drive results in Google Analytics.",
    href: "/free-tools/free-utm-builder",
    count: "Interactive tool",
  },
  {
    title: "Color Contrast Checker",
    desc: "Check if your text and background colors meet WCAG accessibility standards. Live preview with AA and AAA compliance results.",
    href: "/free-tools/free-contrast-checker",
    count: "Interactive tool",
  },
  {
    title: "Image Size Guide",
    desc: "Complete reference for image dimensions across Facebook, Instagram, LinkedIn, X, YouTube, Google Ads, and website SEO.",
    href: "/free-tools/free-image-size-guide",
    count: "7 platforms",
  },
  {
    title: "Readability Checker",
    desc: "Analyze your content's readability with Flesch Reading Ease scoring. Get grade-level interpretation, word stats, and tips for improving clarity.",
    href: "/free-tools/free-readability-checker",
    count: "Interactive tool",
  },
  {
    title: "CTA Copy Generator",
    desc: "Generate call-to-action copy for buttons, headlines, and subheadlines. Choose your business type, goal, and tone for instant CTA variations.",
    href: "/free-tools/free-cta-generator",
    count: "Interactive tool",
  },
  {
    title: "Website Audit Checklist",
    desc: "Answer 25 questions across 5 categories and get an instant website audit score with priority recommendations.",
    href: "/free-tools/free-website-audit",
    count: "25-point audit",
  },
  {
    title: "Marketing Funnel Calculator",
    desc: "Input your traffic and conversion metrics at each funnel stage to find where you're losing the most revenue.",
    href: "/free-tools/free-funnel-calculator",
    count: "Interactive tool",
  },
  {
    title: "Email Campaign Planner",
    desc: "Select your campaign type, audience, and list size to get a complete email sequence with subject line templates, timing, and benchmarks.",
    href: "/free-tools/free-email-campaign-planner",
    count: "6 campaign types",
  },
  {
    title: "Landing Page Grader",
    desc: "Answer 20 questions about your landing page and get an instant grade with priority recommendations and quick wins.",
    href: "/free-tools/free-landing-page-grader",
    count: "20-point grader",
  },
  {
    title: "Schema Markup Generator",
    desc: "Generate JSON-LD structured data for your website. Support for LocalBusiness, Organization, Product, FAQPage, Article, and BreadcrumbList schemas.",
    href: "/free-tools/free-schema-generator",
    count: "6 schema types",
  },
  {
    title: "Hashtag Generator",
    desc: "Generate optimized hashtags for Instagram, TikTok, LinkedIn, Twitter/X, and YouTube. 30 hashtags per niche across high-reach, medium, and low-competition tiers.",
    href: "/free-tools/free-hashtag-generator",
    count: "15 niches",
  },
  {
    title: "Buyer Persona Builder",
    desc: "Build detailed buyer personas with demographics, psychographics, buying behavior, and brand preferences. Export as text for your marketing team.",
    href: "/free-tools/free-persona-builder",
    count: "Interactive tool",
  },
  {
    title: "Content Calendar",
    desc: "Generate a customized content calendar by industry, frequency, and channels. Weekly grid with topic suggestions and content pillars.",
    href: "/free-tools/free-content-calendar",
    count: "15 industries",
  },
  {
    title: "Color Palette Generator",
    desc: "Generate brand color palettes with complementary, analogous, triadic, and monochromatic schemes. WCAG contrast ratios included.",
    href: "/free-tools/free-color-palette-generator",
    count: "5 palette types",
  },
  {
    title: "Social Media ROI Calculator",
    desc: "Calculate the return on investment of your social media marketing. Enter your spend, engagement, and conversion data for instant ROI analysis.",
    href: "/free-tools/free-social-media-roi",
    count: "Interactive tool",
  },
  {
    title: "SWOT Analysis",
    desc: "Build a complete SWOT analysis with strengths, weaknesses, opportunities, and threats. Get strategy recommendations based on your inputs.",
    href: "/free-tools/free-swot-analysis",
    count: "Interactive tool",
  },
  {
    title: "Brand Voice Generator",
    desc: "Define your brand voice with personality traits, tone, and audience. Get a complete voice guide with do's and don'ts, sample copy, and a word bank.",
    href: "/free-tools/free-brand-voice-generator",
    count: "Interactive tool",
  },
  {
    title: "Customer Lifetime Value Calculator",
    desc: "Calculate the lifetime value of your customers. Enter order value, purchase frequency, and margins to find your CLV, CLV:CAC ratio, and payback period.",
    href: "/free-tools/free-clv-calculator",
    count: "Interactive tool",
  },
  {
    title: "Google Ads Budget Estimator",
    desc: "Estimate your Google Ads CPC, clicks, and conversions by industry and location. See what your budget gets you with industry benchmarks.",
    href: "/free-tools/free-google-ads-estimator",
    count: "15 industries",
  },
  {
    title: "Website Migration Checklist",
    desc: "A 30-point interactive checklist for website migrations. Five phases from planning to post-launch with progress tracking.",
    href: "/free-tools/free-migration-checklist",
    count: "30-point checklist",
  },
  {
    title: "Social Media Audit",
    desc: "Grade your social media presence with a 25-point checklist across profile, content, engagement, analytics, and growth. Get actionable recommendations.",
    href: "/free-tools/free-social-media-audit",
    count: "25-point audit",
  },
  {
    title: "Marketing Pricing Calculator",
    desc: "Estimate marketing costs by business size, services needed, and engagement type. Per-service breakdown with industry benchmarks.",
    href: "/free-tools/free-pricing-calculator",
    count: "Interactive tool",
  },
  {
    title: "CRO Audit Checklist",
    desc: "A 20-point conversion rate optimization audit across technical performance, above-the-fold design, copy, and forms/CTAs. Instant grading with priority fixes.",
    href: "/free-tools/free-cro-audit",
    count: "20-point audit",
  },
  {
    title: "Email Deliverability Checker",
    desc: "Assess your email deliverability health across authentication, list hygiene, content quality, and sending practices. Priority action plan included.",
    href: "/free-tools/free-email-deliverability",
    count: "20-point checklist",
  },
  {
    title: "Influencer ROI Calculator",
    desc: "Estimate the ROI of influencer marketing campaigns. Set budget, tier, platform, and campaign type for reach, engagement, and revenue projections.",
    href: "/free-tools/free-influencer-roi",
    count: "Interactive tool",
  },
  {
    title: "Marketing Maturity Assessment",
    desc: "24-question assessment across 6 dimensions: strategy, data, content, channels, technology, and team. Get your maturity level with a tailored growth roadmap.",
    href: "/free-tools/free-marketing-maturity",
    count: "24-question quiz",
  },
  {
    title: "Competitive Gap Analyzer",
    desc: "Rate yourself and your top competitor across 10 marketing dimensions. Get a visual gap analysis with priority action plan and quick wins.",
    href: "/free-tools/free-competitive-gap",
    count: "Interactive worksheet",
  },
  {
    title: "SEO Content Brief Generator",
    desc: "Generate a complete SEO content brief with suggested title, heading structure, content outline, internal linking recommendations, and SEO checklist.",
    href: "/free-tools/free-content-brief",
    count: "Interactive tool",
  },
  {
    title: "Social Proof Strategy Builder",
    desc: "Develop your social proof strategy by business type. Get a social proof score, priority types to develop, placement recommendations, and a 90-day plan.",
    href: "/free-tools/free-social-proof-guide",
    count: "Interactive guide",
  },
  {
    title: "Marketing KPI Dashboard Builder",
    desc: "Define the right KPIs for your marketing dashboard based on business goals, active channels, budget, and stage. Channel-specific benchmarks included.",
    href: "/free-tools/free-kpi-dashboard",
    count: "Interactive tool",
  },
  {
    title: "Brand Positioning Canvas",
    desc: "Define your brand positioning across 8 dimensions and generate a positioning statement, messaging framework, and consistency checklist.",
    href: "/free-tools/free-brand-positioning",
    count: "Interactive tool",
  },
  {
    title: "Marketing Channel Selector",
    desc: "Take a 7-question quiz to get personalized marketing channel recommendations with budget allocation, timeline, and a quick-start roadmap.",
    href: "/free-tools/free-channel-selector",
    count: "Interactive quiz",
  },
  {
    title: "Website Conversion Checklist",
    desc: "Score your website's conversion readiness across 30 items in 5 categories. Get a letter grade, priority improvements, and category recommendations.",
    href: "/free-tools/free-conversion-checklist",
    count: "Interactive checklist",
  },
  {
    title: "Buyer Persona Quiz",
    desc: "Take an 8-question quiz to build a detailed buyer persona with communication strategy, objection handling guide, and content strategy map.",
    href: "/free-tools/free-buyer-persona-quiz",
    count: "Interactive quiz",
  },
  {
    title: "Content Gap Analyzer",
    desc: "Evaluate your content across buyer journey stages. Get a maturity score, funnel visualization, priority gaps, and a 3-month content calendar.",
    href: "/free-tools/free-content-gap-analyzer",
    count: "Interactive worksheet",
  },
  {
    title: "Ad Spend Efficiency Calculator",
    desc: "Evaluate your ad spend efficiency with CPA, ROAS, and industry benchmarks. Get optimization suggestions and budget reallocation recommendations.",
    href: "/free-tools/free-ad-spend-calculator",
    count: "Interactive calculator",
  },
  {
    title: "Email Sequence Planner",
    desc: "Plan email marketing sequences for welcome series, nurture flows, cart abandonment, and more. Get subject line templates, timing recommendations, and best practices.",
    href: "/free-tools/free-email-sequence-planner",
    count: "Interactive planner",
  },
  {
    title: "Website Tech Stack Advisor",
    desc: "Find the right technology stack for your website or web app. Answer questions about your project and get platform, hosting, and tool recommendations.",
    href: "/free-tools/free-tech-stack-advisor",
    count: "Interactive advisor",
  },
  {
    title: "Competitive SWOT Matrix",
    desc: "Build a side-by-side SWOT comparison of your company against competitors. Identify competitive advantages, vulnerabilities, and strategic opportunities.",
    href: "/free-tools/free-competitive-swot",
    count: "Interactive tool",
  },
  {
    title: "Social Media Calendar",
    desc: "Generate a 4-week social media content calendar with post ideas, content types, hashtags, and best posting times tailored to your industry and platforms.",
    href: "/free-tools/free-social-calendar",
    count: "4-week planner",
  },
  {
    title: "Marketing Funnel Visualizer",
    desc: "Build and analyze your marketing funnel. Enter stage data to see conversion rates, drop-off points, and optimization recommendations for your weakest stage.",
    href: "/free-tools/free-funnel-visualizer",
    count: "Interactive tool",
  },
  {
    title: "Website Launch Checklist",
    desc: "A 44-item pre-launch checklist with countdown timer. Track progress across content, SEO, design, technical, legal, and marketing categories.",
    href: "/free-tools/free-launch-countdown",
    count: "44-item checklist",
  },
  {
    title: "Lead Magnet Idea Generator",
    desc: "Generate high-converting lead magnet ideas tailored to your industry, funnel stage, and preferred format with promotion strategies.",
    href: "/free-tools/free-lead-magnet-generator",
    count: "Interactive tool",
  },
  {
    title: "Pricing Page Optimizer",
    desc: "Audit your pricing page across 32 conversion factors — structure, trust signals, CTAs, objection handling, UX, and psychology.",
    href: "/free-tools/free-pricing-optimizer",
    count: "32-point audit",
  },
  {
    title: "Email Marketing Health Checker",
    desc: "Audit your email marketing across 25 factors — list hygiene, content quality, sending practices, engagement, and compliance.",
    href: "/free-tools/free-email-health-checker",
    count: "25-point audit",
  },
  {
    title: "Competitor Analysis Matrix",
    desc: "Rate your company and up to 4 competitors across 10 dimensions. Visualize with radar chart, get gap analysis and strategic recommendations.",
    href: "/free-tools/free-competitor-matrix",
    count: "Interactive tool",
  },
  {
    title: "A/B Test Ideas Generator",
    desc: "Generate prioritized A/B test ideas for any page type. ICE scoring, sample size estimates, hypothesis templates, and implementation guidance.",
    href: "/free-tools/free-ab-test-ideas",
    count: "350+ test ideas",
  },
  {
    title: "Content Audit Scorecard",
    desc: "Evaluate your content across 30 criteria in 6 categories. Get maturity level, radar chart, quick wins, and prioritized recommendations.",
    href: "/free-tools/free-content-audit-scorecard",
    count: "30-point audit",
  },
  {
    title: "Website Redesign Planner",
    desc: "Plan your website redesign with structured assessment, goal setting, scope definition, and a phased improvement roadmap.",
    href: "/free-tools/free-redesign-planner",
    count: "Interactive planner",
  },
  {
    title: "SEO Content Gap Finder",
    desc: "Identify content gaps in your SEO strategy by analyzing topic coverage against competitors and search intent to find untapped ranking opportunities.",
    href: "/free-tools/free-seo-gap-finder",
    count: "Gap analysis",
  },
  {
    title: "Marketing ROI Dashboard",
    desc: "Compare marketing channel performance side by side. Enter spend and revenue for up to 8 channels to see ROI, cost per lead, charts, and budget optimization suggestions.",
    href: "/free-tools/free-roi-dashboard",
    count: "Interactive dashboard",
  },
  {
    title: "Brand Consistency Checker",
    desc: "Rate your brand consistency across up to 5 touchpoints and 6 dimensions. Get an overall score, radar chart, bar chart, and prioritized recommendations.",
    href: "/free-tools/free-brand-consistency-checker",
    count: "Interactive tool",
  },
  {
    title: "Customer Journey Mapper",
    desc: "Map your customer experience across 5 stages with touchpoints, emotions, pain points, and opportunities. Visualize the journey with an emotion curve and get recommendations.",
    href: "/free-tools/free-customer-journey-mapper",
    count: "Interactive tool",
  },
  {
    title: "Content Repurposing Planner",
    desc: "Turn one piece of content into many. Get a visual repurposing plan with derivative formats, timelines, content tree, and multiplication metrics for any platform mix.",
    href: "/free-tools/free-content-repurposing",
    count: "Interactive planner",
  },
  {
    title: "Channel Recommender",
    desc: "Enter your business details, goals, and budget to get a ranked list of recommended marketing channels with match scores, ROI estimates, and key tactics.",
    href: "/free-tools/free-channel-recommender",
    count: "Interactive tool",
  },
  {
    title: "SEO Audit Score",
    desc: "Check 40 SEO factors across technical, on-page, content, off-page, and UX categories. Get your site health score and prioritized recommendations.",
    href: "/free-tools/free-seo-audit-score",
    count: "40 checkpoints",
  },
  {
    title: "Social Post Generator",
    desc: "Generate platform-specific post templates for LinkedIn, Instagram, Twitter/X, Facebook, and TikTok from your topic and key message.",
    href: "/free-tools/free-social-post-generator",
    count: "5 platforms",
  },
  {
    title: "Marketing Calendar",
    desc: "Generate a 12-month marketing calendar tailored to your industry with campaign themes, key dates, channel recommendations, and budget allocation.",
    href: "/free-tools/free-marketing-calendar",
    count: "12 months",
  },
  {
    title: "Website Readiness Scorecard",
    desc: "Assess your website across mobile experience, page speed, SEO, security, and accessibility with weighted scoring and prioritised recommendations.",
    href: "/free-tools/free-website-readiness-scorecard",
    count: "40 checkpoints",
  },
  {
    title: "Email Subject Line A/B Tester",
    desc: "Compare two email subject lines side-by-side with scoring on length, power words, personalisation, urgency, and clarity.",
    href: "/free-tools/free-email-subject-ab-tester",
    count: "5 criteria",
  },
  {
    title: "Audience Targeting Worksheet",
    desc: "Build a detailed ideal customer profile with demographics, psychographics, pain points, and channel preferences, then export a targeting brief.",
    href: "/free-tools/free-audience-targeting-worksheet",
    count: "4-step worksheet",
  },
  {
    title: "Competitor Ad Spy Worksheet",
    desc: "Document and analyse competitor advertising across platforms. Track messaging, offers, CTAs, and creative strategies with exportable analysis.",
    href: "/free-tools/free-competitor-ad-spy",
    count: "Multi-ad tracker",
  },
  {
    title: "Marketing Goal Setter",
    desc: "Set SMART marketing goals with measurable targets, deadlines, strategies, and milestones. Track multiple goals and export your plan.",
    href: "/free-tools/free-marketing-goal-setter",
    count: "SMART framework",
  },
  {
    title: "Brand Tone of Voice Generator",
    desc: "Define your brand voice with tone spectrum mapping, adjective selection, do/don't examples, and exportable voice guide for your team.",
    href: "/free-tools/free-brand-tone-generator",
    count: "4-step generator",
  },
  {
    title: "Campaign Naming Convention",
    desc: "Generate consistent campaign naming conventions for ads, email, and UTM parameters. Keep your marketing data clean and organised.",
    href: "/free-tools/free-campaign-naming-convention",
    count: "Name builder",
  },
  {
    title: "Marketing Stack Audit",
    desc: "Audit your marketing technology stack across analytics, CRM, email, ads, social, and content tools. Identify gaps and optimisation opportunities.",
    href: "/free-tools/free-marketing-stack-audit",
    count: "30 tools assessed",
  },
  {
    title: "Pricing Page Analyser",
    desc: "Check your pricing page against 20 conversion best practices across clarity, persuasion, trust, and UX dimensions.",
    href: "/free-tools/free-pricing-page-analyzer",
    count: "20 checkpoints",
  },
  {
    title: "Social Media Bio Generator",
    desc: "Generate optimised bios for LinkedIn, Instagram, Twitter/X, TikTok, and Facebook with tone, keywords, and CTAs.",
    href: "/free-tools/free-social-media-bio-generator",
    count: "5 platforms",
  },
  {
    title: "Content Brief Generator",
    desc: "Create detailed content briefs for writers with audience, keywords, outline, tone, word count, and competitive references.",
    href: "/free-tools/free-content-brief-generator",
    count: "5-step wizard",
  },
  {
    title: "Marketing Expense Tracker",
    desc: "Track marketing spend by channel, campaign, and month with budget monitoring, charts, and CSV export.",
    href: "/free-tools/free-marketing-expense-tracker",
    count: "13 channels",
  },
  {
    title: "Lead Scoring Calculator",
    desc: "Build a lead scoring model with demographic, firmographic, and behavioural criteria. Test with real leads and define thresholds.",
    href: "/free-tools/free-lead-scoring-calculator",
    count: "8 criteria",
  },
  {
    title: "Marketing Timeline Planner",
    desc: "Plan campaigns with milestones, channel assignments, owners, status tracking, and a visual Gantt-style timeline view.",
    href: "/free-tools/free-marketing-timeline-planner",
    count: "10 channels",
  },
  {
    title: "Ad Copy Analyser",
    desc: "Score ad copy against best practices for headlines, descriptions, CTAs, and emotional triggers across 5 platforms.",
    href: "/free-tools/free-ad-copy-analyzer",
    count: "5 platforms",
  },
  {
    title: "Customer Journey Map Builder",
    desc: "Map touchpoints across 5 journey stages with channels, emotions, pain points, and opportunities. Visual map and list views.",
    href: "/free-tools/free-customer-journey-builder",
    count: "5 stages",
  },
  {
    title: "Marketing ROI Forecaster",
    desc: "Forecast ROI by channel with budget, CPC, conversion rate, and average order value. Compare scenarios over 3-24 months.",
    href: "/free-tools/free-roi-forecaster",
    count: "7 channels",
  },
  {
    title: "Headline Split Test Generator",
    desc: "Generate headline variations using 8 proven formulas, score each variant, and create A/B test plans.",
    href: "/free-tools/free-headline-split-tester",
    count: "8 formulas",
  },
  {
    title: "KPI Dashboard Builder",
    desc: "Build a custom marketing KPI dashboard from a library of 30+ metrics across 6 functions. Set targets, track status, and export reports.",
    href: "/free-tools/free-kpi-builder",
    count: "30+ metrics",
  },
  {
    title: "Competitor Pricing Tracker",
    desc: "Track competitor pricing, features, and positioning across plans and tiers. Market overview with price range analysis.",
    href: "/free-tools/free-competitor-pricing-tracker",
    count: "Unlimited tiers",
  },
  {
    title: "Social Content Rater",
    desc: "Rate social media content against platform-specific best practices. Get scores on copy, visuals, discovery, and engagement.",
    href: "/free-tools/free-social-content-rater",
    count: "5 platforms",
  },
  {
    title: "Marketing Proposal Generator",
    desc: "Generate professional marketing proposals with client info, scope, deliverables, timeline, and pricing in a guided 5-step wizard.",
    href: "/free-tools/free-marketing-proposal-generator",
    count: "5-step wizard",
  },
  {
    title: "Brand Name Evaluator",
    desc: "Score brand names across 8 criteria including memorability, pronounceability, uniqueness, and domain potential. Compare multiple names side by side.",
    href: "/free-tools/free-brand-name-evaluator",
    count: "8 criteria",
  },
  {
    title: "Email Warm-Up Planner",
    desc: "Plan your email domain warm-up schedule with day-by-day volume targets, phase breakdowns, and provider-specific tips for better deliverability.",
    href: "/free-tools/free-email-warmup-planner",
    count: "Day-by-day plan",
  },
  {
    title: "Channel Mix Modeller",
    desc: "Model your marketing channel mix allocation with budget sliders, projected ROI, scenario comparison, and SVG pie chart breakdown.",
    href: "/free-tools/free-channel-mix-modeller",
    count: "10 channels",
  },
  {
    title: "Content Pillar Planner",
    desc: "Plan content pillar strategy with topic clusters, hub-and-spoke visual maps, publishing queue, and completion tracking.",
    href: "/free-tools/free-content-pillar-planner",
    count: "Pillar + clusters",
  },
  {
    title: "Client Onboarding Checklist",
    desc: "Generate a tailored marketing client onboarding checklist by service type. Five phases from discovery to launch prep.",
    href: "/free-tools/free-client-onboarding-checklist",
    count: "5 phases",
  },
  {
    title: "Marketing Audit Scorecard",
    desc: "Score your marketing across 8 categories with 40 questions. Get grades, priority recommendations, and benchmark comparisons.",
    href: "/free-tools/free-marketing-audit-scorecard",
    count: "40 questions",
  },
  {
    title: "Social Media Calendar Template",
    desc: "Plan social content with an interactive monthly calendar. Schedule posts by platform, set weekly themes, and track posting stats.",
    href: "/free-tools/free-social-media-calendar-template",
    count: "Calendar view",
  },
  {
    title: "Campaign Naming Generator",
    desc: "Generate consistent campaign naming conventions for Google Ads, Meta, LinkedIn, and more. Customisable segments and platform templates.",
    href: "/free-tools/free-campaign-naming-generator",
    count: "8 platforms",
  },
  {
    title: "Conversion Funnel Simulator",
    desc: "Simulate your marketing funnel with custom stages, conversion rates, and revenue projections. Identify bottlenecks and test what-if scenarios.",
    href: "/free-tools/free-conversion-funnel-simulator",
    count: "6 stages",
  },
  {
    title: "Brand Voice Consistency Checker",
    desc: "Define your brand voice attributes and evaluate content for consistency. Automatic readability and tone analysis with scoring.",
    href: "/free-tools/free-brand-voice-checker",
    count: "20 attributes",
  },
  {
    title: "Marketing Meeting Agenda Builder",
    desc: "Build structured marketing meeting agendas from 7 professional templates. Weekly standups, monthly reviews, and client calls.",
    href: "/free-tools/free-meeting-agenda-builder",
    count: "7 templates",
  },
  {
    title: "Marketing RFP Template Builder",
    desc: "Build professional RFPs for marketing engagements. Cover scope, requirements, evaluation criteria, budget, and timeline in a structured template.",
    href: "/free-tools/free-marketing-rfp-template",
    count: "9 sections",
  },
  {
    title: "Website Heuristic Evaluator",
    desc: "Evaluate your website against Nielsen's 10 usability heuristics. Score each principle, identify issues, and get improvement recommendations.",
    href: "/free-tools/free-website-heuristic-evaluator",
    count: "10 heuristics",
  },
  {
    title: "Ad Budget Pacing Calculator",
    desc: "Track advertising budget pacing across campaigns. Monitor spend rate, forecast end-of-month spend, and identify over or under-pacing campaigns.",
    href: "/free-tools/free-ad-budget-pacing",
    count: "Multi-campaign",
  },
  {
    title: "Competitive SWOT Analyzer",
    desc: "Perform structured SWOT analysis across multiple competitors. Compare strengths, weaknesses, and generate strategic insights.",
    href: "/free-tools/free-competitive-swot-analyzer",
    count: "Up to 5 competitors",
  },
  {
    title: "Marketing ROI Report Generator",
    desc: "Generate professional marketing ROI reports. Input channel spend and revenue data for comprehensive performance analysis.",
    href: "/free-tools/free-marketing-roi-report",
    count: "Multi-channel",
  },
  {
    title: "Customer Feedback Survey Builder",
    desc: "Build customer feedback surveys from proven templates. NPS, CSAT, CES, post-purchase, and website feedback surveys.",
    href: "/free-tools/free-customer-feedback-survey",
    count: "6 templates",
  },
  {
    title: "Marketing Persona Workshop",
    desc: "Build detailed marketing personas with guided exercises. Define demographics, psychographics, goals, and buying behavior.",
    href: "/free-tools/free-persona-workshop",
    count: "5 personas",
  },
  {
    title: "Content Gap Finder",
    desc: "Map your existing content against the buyer journey. Identify gaps and get recommendations for each stage and content type.",
    href: "/free-tools/free-content-gap-finder",
    count: "Heatmap analysis",
  },
  {
    title: "SEO Content Optimizer",
    desc: "Analyze your content for SEO. Check keyword usage, readability, heading structure, meta tags, and internal linking.",
    href: "/free-tools/free-seo-content-optimizer",
    count: "8 categories",
  },
  {
    title: "Client Reporting Dashboard",
    desc: "Build professional marketing reports for clients. Add channels, track KPIs, generate executive summaries, and export ready-to-present reports.",
    href: "/free-tools/free-client-reporting-dashboard",
    count: "8 channels",
  },
  {
    title: "Marketing Campaign Tracker",
    desc: "Track and manage all your marketing campaigns in one place. Monitor status, budgets, performance, deadlines, and campaign health.",
    href: "/free-tools/free-campaign-tracker",
    count: "Dashboard + charts",
  },
  {
    title: "Competitor Benchmarking Dashboard",
    desc: "Benchmark your business against competitors across 6 key dimensions. Visualize gaps with radar charts and identify advantages.",
    href: "/free-tools/free-competitor-benchmarking",
    count: "6 dimensions",
  },
  {
    title: "Marketing KPI Tracker",
    desc: "Track your marketing KPIs over time. Set targets, record monthly actuals, visualize trends with sparkline charts, and identify areas needing attention.",
    href: "/free-tools/free-marketing-kpi-tracker",
    count: "12-month tracking",
  },
  {
    title: "Marketing Budget Allocator",
    desc: "Allocate your marketing budget across channels using data-driven templates. Compare strategies and optimize for your business goals.",
    href: "/free-tools/free-budget-allocator",
    count: "10 channels",
  },
  {
    title: "Scope of Work Generator",
    desc: "Generate professional scopes of work for marketing projects. Define deliverables, timelines, milestones, budget, and terms.",
    href: "/free-tools/free-scope-of-work-generator",
    count: "8 project types",
  },
  {
    title: "Marketing Metrics Benchmark",
    desc: "Compare your marketing metrics against industry benchmarks. 50 metrics across 7 categories with status indicators and optimization tips.",
    href: "/free-tools/free-marketing-metrics-benchmark",
    count: "50 metrics",
  },
  {
    title: "Brand Guidelines Checklist",
    desc: "Ensure your brand guidelines are complete. 40-item checklist across 7 categories with priority levels and action plan generation.",
    href: "/free-tools/free-brand-guidelines-checklist",
    count: "40 items",
  },
  {
    title: "Website Launch Checklist",
    desc: "Pre-launch checklist covering content, SEO, performance, security, UX, analytics, legal, and launch day. GO/NO-GO indicator included.",
    href: "/free-tools/free-website-launch-checklist",
    count: "50 items",
  },
  {
    title: "Backlink Profile Analyzer",
    desc: "Analyze your backlink profile quality. Track DA distribution, anchor text diversity, link types, and get improvement recommendations.",
    href: "/free-tools/free-backlink-analyzer",
    count: "Full analysis",
  },
  {
    title: "Customer Retention Calculator",
    desc: "Calculate retention rate, churn rate, and lifetime value. Track monthly cohorts, compare industry benchmarks, and model improvement scenarios.",
    href: "/free-tools/free-retention-calculator",
    count: "8 industries",
  },
  {
    title: "Marketing Experiment Tracker",
    desc: "Plan and track marketing experiments with ICE scoring, hypothesis tracking, win/loss analysis, Gantt timeline, and learnings library.",
    href: "/free-tools/free-experiment-tracker",
    count: "Full tracker",
  },
  {
    title: "Marketing Attribution Calculator",
    desc: "Compare Last Touch, First Touch, Linear, and Time Decay attribution models side by side. ROI per channel, what-if scenario planning.",
    href: "/free-tools/free-attribution-calculator",
    count: "4 models",
  },
  {
    title: "Content Performance Scorecard",
    desc: "Score content across 8 dimensions with customizable weights. Radar chart comparison, performance tiers, and action recommendations.",
    href: "/free-tools/free-content-performance-scorecard",
    count: "8 dimensions",
  },
  {
    title: "Vendor Evaluation Scorecard",
    desc: "Compare up to 5 vendors across 8 categories with weighted scoring. Radar chart, decision matrix, winner recommendation.",
    href: "/free-tools/free-vendor-evaluation",
    count: "8 categories",
  },
  {
    title: "Agency Pricing Calculator",
    desc: "Model hourly, retainer, and project-based pricing with team composition, overhead multipliers, and profit margins. Industry benchmarks included.",
    href: "/free-tools/free-agency-pricing-calculator",
    count: "3 models",
  },
  {
    title: "Stakeholder Report Generator",
    desc: "Build executive, board, team, and client reports with drag-to-reorder sections, KPI highlight cards, and print-ready preview.",
    href: "/free-tools/free-stakeholder-report",
    count: "4 templates",
  },
  {
    title: "Risk Assessment Matrix",
    desc: "Map marketing risks on a 5×5 likelihood-vs-impact matrix with SVG heatmap, mitigation strategies, and category filtering.",
    href: "/free-tools/free-risk-assessment",
    count: "5×5 matrix",
  },
  {
    title: "OKR Planner",
    desc: "Plan and track marketing objectives with key results, auto-calculated progress, visual bars, and pre-loaded templates for brand, lead gen, and retention.",
    href: "/free-tools/free-okr-planner",
    count: "5 objectives",
  },
  {
    title: "Team Capacity Planner",
    desc: "Plan team workload across roles and projects. Per-role utilization bars, over-allocation alerts, and cost tracking for up to 10 team members.",
    href: "/free-tools/free-team-capacity-planner",
    count: "10 members",
  },
  {
    title: "Campaign Debrief Generator",
    desc: "Run structured post-mortems with planned vs actual metrics, variance analysis, A-F grading, lessons learned, and auto-generated summaries.",
    href: "/free-tools/free-campaign-debrief",
    count: "8 metrics",
  },
  {
    title: "Sprint Planner",
    desc: "Plan 2-week marketing sprints with tasks, effort points, kanban board, burndown tracking, and agile marketing best practices.",
    href: "/free-tools/free-sprint-planner",
    count: "20 tasks",
  },
  {
    title: "Quarterly Review Template",
    desc: "Build quarterly marketing reviews with channel performance, goal progress, budget review, year-over-year comparison, and print-ready export.",
    href: "/free-tools/free-quarterly-review",
    count: "5 sections",
  },
  {
    title: "Martech Stack Planner",
    desc: "Plan your marketing technology stack across 8 categories. Cost tracking, integration matrix, duplicate detection, and star ratings.",
    href: "/free-tools/free-martech-stack-planner",
    count: "8 categories",
  },
  {
    title: "SLA Tracker",
    desc: "Track service level agreements with compliance rates, monthly trends, category filtering, and pre-loaded agency-client SLA templates.",
    href: "/free-tools/free-sla-tracker",
    count: "15 SLAs",
  },
  {
    title: "Competitive Intel Dashboard",
    desc: "Track up to 5 competitors across 6 dimensions with threat scores, gap analysis, strength/weakness summary, and side-by-side comparison.",
    href: "/free-tools/free-competitive-intel-dashboard",
    count: "6 dimensions",
  },
  {
    title: "Small Business Guide",
    desc: "A practical guide to digital marketing for small businesses — which channels to prioritize, budget guidance, and common mistakes to avoid.",
    href: "/free-tools/free-small-business-guide",
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

export default async function ResourcesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang || "en";
  const l = (path: string) => path.startsWith(`/${locale}`) ? path : `/${locale}${path}`;

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

      <section className="px-6 lg:px-12 pt-24 pb-12" aria-label="Free marketing resources">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((r) => (
              <Link key={r.href} href={r.href} className="group bg-white border border-gray-200 hover:border-black/30 transition-all motion-reduce:transition-none p-8 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <span className="text-base font-medium text-gray-400 mb-2 block">{r.count}</span>
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-3">{r.title}</h2>
                <p className="text-base text-gray-500 leading-relaxed">{r.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center" aria-label="Get in touch">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Put This Knowledge to Work?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let our team turn these insights into a strategy that drives real results for your business.
            </p>
            <Link href={l("/contact")} className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
