"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface SelectOption {
  label: string;
  value: string;
}

interface LeadMagnetIdea {
  title: string;
  format: string;
  difficulty: "Easy" | "Medium" | "Hard";
  conversionPotential: "High" | "Medium" | "Low";
  topics: string[];
  promotionChannels: string[];
}

type FunnelStage = "top" | "middle" | "bottom";

/* ------------------------------------------------------------------ */
/*  Industry options                                                   */
/* ------------------------------------------------------------------ */

const industries: SelectOption[] = [
  { label: "SaaS / Software", value: "saas" },
  { label: "E-commerce / Retail", value: "ecommerce" },
  { label: "Healthcare / Wellness", value: "healthcare" },
  { label: "Real Estate", value: "realestate" },
  { label: "Financial Services", value: "finance" },
  { label: "Education / E-learning", value: "education" },
  { label: "Marketing / Agency", value: "marketing" },
  { label: "Legal Services", value: "legal" },
  { label: "Construction / Home Services", value: "construction" },
  { label: "Fitness / Sports", value: "fitness" },
  { label: "Food / Restaurant", value: "food" },
  { label: "Travel / Hospitality", value: "travel" },
  { label: "Consulting / Coaching", value: "consulting" },
  { label: "Nonprofit / NGO", value: "nonprofit" },
];

const funnelStages: SelectOption[] = [
  { label: "Top of Funnel (Awareness)", value: "top" },
  { label: "Middle of Funnel (Consideration)", value: "middle" },
  { label: "Bottom of Funnel (Decision)", value: "bottom" },
];

const formatOptions: SelectOption[] = [
  { label: "Ebook / Guide", value: "ebook" },
  { label: "Checklist", value: "checklist" },
  { label: "Template", value: "template" },
  { label: "Calculator", value: "calculator" },
  { label: "Quiz", value: "quiz" },
  { label: "Webinar", value: "webinar" },
  { label: "Video Course", value: "videocourse" },
  { label: "Free Tool", value: "freetool" },
  { label: "Case Study Collection", value: "casestudy" },
  { label: "Swipe File", value: "swipefile" },
];

/* ------------------------------------------------------------------ */
/*  Idea generation engine                                             */
/* ------------------------------------------------------------------ */

interface IdeaTemplate {
  title: string;
  format: string;
  difficulty: "Easy" | "Medium" | "Hard";
  conversionPotential: "High" | "Medium" | "Low";
  topics: string[];
  promotionChannels: string[];
  funnelMatch: FunnelStage[];
  formatMatch: string[];
}

const ideaBank: Record<string, IdeaTemplate[]> = {
  saas: [
    { title: "The Ultimate SaaS Onboarding Checklist", format: "Checklist", difficulty: "Easy", conversionPotential: "High", topics: ["User onboarding flow", "Activation milestones", "Churn reduction tactics", "First-value metrics"], promotionChannels: ["LinkedIn Ads", "Blog SEO", "Product Hunt"], funnelMatch: ["top", "middle"], formatMatch: ["checklist", "ebook"] },
    { title: "SaaS Pricing Strategy Calculator", format: "Calculator", difficulty: "Hard", conversionPotential: "High", topics: ["Value-based pricing models", "Competitor benchmarking", "Feature-tier structure", "Annual vs monthly pricing"], promotionChannels: ["Google Ads", "LinkedIn", "SaaS communities"], funnelMatch: ["middle", "bottom"], formatMatch: ["calculator", "freetool"] },
    { title: "How to Reduce SaaS Churn: A Data-Driven Guide", format: "Ebook / Guide", difficulty: "Medium", conversionPotential: "Medium", topics: ["Churn analysis framework", "Customer health scoring", "Re-engagement sequences", "Exit survey templates"], promotionChannels: ["Content marketing", "Email nurture", "LinkedIn organic"], funnelMatch: ["top", "middle"], formatMatch: ["ebook", "casestudy"] },
    { title: "SaaS Metrics Dashboard Template", format: "Template", difficulty: "Medium", conversionPotential: "High", topics: ["MRR and ARR tracking", "CAC and LTV formulas", "Cohort analysis setup", "Investor-ready reporting"], promotionChannels: ["Twitter/X", "LinkedIn", "SaaS newsletters"], funnelMatch: ["middle"], formatMatch: ["template", "freetool"] },
    { title: "Which SaaS Growth Strategy Fits Your Stage?", format: "Quiz", difficulty: "Medium", conversionPotential: "High", topics: ["Product-led vs sales-led growth", "Market maturity assessment", "Resource allocation", "Channel prioritization"], promotionChannels: ["Social media", "Email", "Blog CTAs"], funnelMatch: ["top"], formatMatch: ["quiz"] },
    { title: "SaaS Sales Objection Handling Swipe File", format: "Swipe File", difficulty: "Easy", conversionPotential: "Medium", topics: ["Common objections by category", "Response frameworks", "Competitive positioning scripts", "Pricing negotiation phrases"], promotionChannels: ["LinkedIn", "Sales communities", "Email outreach"], funnelMatch: ["bottom"], formatMatch: ["swipefile", "template"] },
    { title: "Live Demo: Building Your First Integration in 30 Minutes", format: "Webinar", difficulty: "Medium", conversionPotential: "High", topics: ["API walkthrough", "Integration use cases", "Live coding demo", "Q&A session"], promotionChannels: ["Email list", "LinkedIn Events", "Partner co-promotion"], funnelMatch: ["middle", "bottom"], formatMatch: ["webinar", "videocourse"] },
    { title: "SaaS Customer Success Playbook", format: "Ebook / Guide", difficulty: "Hard", conversionPotential: "Medium", topics: ["Onboarding frameworks", "QBR templates", "Expansion revenue tactics", "Health score models"], promotionChannels: ["LinkedIn", "Industry conferences", "Partner channels"], funnelMatch: ["middle"], formatMatch: ["ebook", "casestudy"] },
  ],
  ecommerce: [
    { title: "Product Page Conversion Optimization Checklist", format: "Checklist", difficulty: "Easy", conversionPotential: "High", topics: ["Product photography standards", "Copywriting formulas", "Social proof placement", "Mobile UX essentials"], promotionChannels: ["Blog SEO", "Pinterest", "Email list"], funnelMatch: ["top", "middle"], formatMatch: ["checklist", "ebook"] },
    { title: "Profit Margin Calculator for E-commerce Products", format: "Calculator", difficulty: "Hard", conversionPotential: "High", topics: ["COGS breakdown", "Shipping cost modeling", "Discount impact analysis", "Break-even point"], promotionChannels: ["Google Ads", "E-commerce forums", "YouTube"], funnelMatch: ["middle", "bottom"], formatMatch: ["calculator", "freetool"] },
    { title: "Email Sequences That Drive Repeat Purchases", format: "Swipe File", difficulty: "Easy", conversionPotential: "High", topics: ["Welcome series templates", "Abandoned cart sequences", "Post-purchase follow-ups", "Win-back campaigns"], promotionChannels: ["Blog", "Social media", "Email pop-ups"], funnelMatch: ["middle", "bottom"], formatMatch: ["swipefile", "template"] },
    { title: "Holiday Marketing Calendar Template", format: "Template", difficulty: "Easy", conversionPotential: "Medium", topics: ["Key retail dates", "Campaign planning timeline", "Budget allocation framework", "Promotional strategy ideas"], promotionChannels: ["Pinterest", "Instagram", "Email list"], funnelMatch: ["top"], formatMatch: ["template", "checklist"] },
    { title: "What Kind of E-commerce Brand Are You?", format: "Quiz", difficulty: "Medium", conversionPotential: "High", topics: ["Brand archetype assessment", "Target audience alignment", "Messaging style guide", "Visual identity direction"], promotionChannels: ["Instagram Ads", "Facebook Groups", "Blog"], funnelMatch: ["top"], formatMatch: ["quiz"] },
    { title: "Scaling E-commerce from $10K to $100K/Month", format: "Video Course", difficulty: "Hard", conversionPotential: "Medium", topics: ["Paid ads scaling frameworks", "Inventory management", "Team hiring priorities", "Retention strategies"], promotionChannels: ["YouTube Ads", "Facebook Groups", "Influencer partnerships"], funnelMatch: ["middle"], formatMatch: ["videocourse", "webinar"] },
    { title: "Supplier Negotiation Scripts and Templates", format: "Template", difficulty: "Easy", conversionPotential: "Medium", topics: ["Initial outreach templates", "Price negotiation tactics", "MOQ reduction requests", "Quality agreement terms"], promotionChannels: ["LinkedIn", "E-commerce communities", "Blog SEO"], funnelMatch: ["middle", "bottom"], formatMatch: ["template", "swipefile"] },
    { title: "Case Studies: How 5 Brands Doubled Their AOV", format: "Case Study Collection", difficulty: "Medium", conversionPotential: "High", topics: ["Upselling strategies", "Bundle pricing examples", "Free shipping thresholds", "Loyalty program results"], promotionChannels: ["Email nurture", "Retargeting ads", "LinkedIn"], funnelMatch: ["bottom"], formatMatch: ["casestudy", "ebook"] },
  ],
  healthcare: [
    { title: "Patient Acquisition Cost Calculator", format: "Calculator", difficulty: "Hard", conversionPotential: "High", topics: ["Cost-per-lead by channel", "Patient lifetime value", "Insurance mix modeling", "Marketing ROI formulas"], promotionChannels: ["Google Ads", "Medical associations", "LinkedIn"], funnelMatch: ["middle", "bottom"], formatMatch: ["calculator", "freetool"] },
    { title: "HIPAA-Compliant Marketing Checklist", format: "Checklist", difficulty: "Easy", conversionPotential: "High", topics: ["Email marketing compliance", "Social media guidelines", "Patient testimonial rules", "Website privacy requirements"], promotionChannels: ["Blog SEO", "Healthcare newsletters", "LinkedIn"], funnelMatch: ["top", "middle"], formatMatch: ["checklist", "ebook"] },
    { title: "Patient Journey Mapping Template", format: "Template", difficulty: "Medium", conversionPotential: "Medium", topics: ["Touchpoint identification", "Communication timeline", "Follow-up protocols", "Satisfaction measurement"], promotionChannels: ["LinkedIn", "Medical conferences", "Email"], funnelMatch: ["middle"], formatMatch: ["template", "ebook"] },
    { title: "Wellness Program ROI Guide", format: "Ebook / Guide", difficulty: "Medium", conversionPotential: "Medium", topics: ["Program design framework", "Engagement metrics", "Outcome measurement", "Employer partnership models"], promotionChannels: ["LinkedIn Ads", "HR publications", "Webinars"], funnelMatch: ["top", "middle"], formatMatch: ["ebook", "casestudy"] },
    { title: "Which Digital Health Strategy Fits Your Practice?", format: "Quiz", difficulty: "Medium", conversionPotential: "High", topics: ["Practice size assessment", "Technology readiness", "Patient demographic alignment", "Budget considerations"], promotionChannels: ["Social media", "Medical blogs", "Email"], funnelMatch: ["top"], formatMatch: ["quiz"] },
    { title: "Telehealth Implementation Webinar Series", format: "Webinar", difficulty: "Hard", conversionPotential: "High", topics: ["Platform selection criteria", "Workflow integration", "Patient adoption strategies", "Billing and coding for virtual visits"], promotionChannels: ["Email list", "Medical associations", "LinkedIn Events"], funnelMatch: ["middle", "bottom"], formatMatch: ["webinar", "videocourse"] },
    { title: "Social Media Content Calendar for Healthcare", format: "Template", difficulty: "Easy", conversionPotential: "Medium", topics: ["Health awareness dates", "Patient education topics", "Compliance-safe post templates", "Engagement best practices"], promotionChannels: ["Instagram", "Facebook", "LinkedIn"], funnelMatch: ["top"], formatMatch: ["template", "swipefile"] },
    { title: "Healthcare Marketing Case Studies", format: "Case Study Collection", difficulty: "Medium", conversionPotential: "High", topics: ["Patient acquisition campaigns", "Brand awareness results", "Digital transformation outcomes", "Community engagement programs"], promotionChannels: ["LinkedIn", "Email nurture", "Conference presentations"], funnelMatch: ["bottom"], formatMatch: ["casestudy", "ebook"] },
  ],
  realestate: [
    { title: "Home Buyer Readiness Checklist", format: "Checklist", difficulty: "Easy", conversionPotential: "High", topics: ["Financial preparation steps", "Pre-approval process", "Neighborhood research guide", "Inspection essentials"], promotionChannels: ["Facebook Ads", "Google Ads", "Local SEO"], funnelMatch: ["top", "middle"], formatMatch: ["checklist", "ebook"] },
    { title: "Mortgage Affordability Calculator", format: "Calculator", difficulty: "Hard", conversionPotential: "High", topics: ["Income-to-debt ratios", "Down payment scenarios", "Monthly payment estimates", "Tax and insurance factors"], promotionChannels: ["Google Ads", "Zillow", "Blog SEO"], funnelMatch: ["middle", "bottom"], formatMatch: ["calculator", "freetool"] },
    { title: "Home Staging Guide: Room by Room", format: "Ebook / Guide", difficulty: "Medium", conversionPotential: "Medium", topics: ["Decluttering strategies", "Furniture arrangement tips", "Photography preparation", "Low-cost upgrades with high ROI"], promotionChannels: ["Pinterest", "Instagram", "Email list"], funnelMatch: ["top"], formatMatch: ["ebook", "checklist"] },
    { title: "Real Estate Email Drip Campaign Templates", format: "Template", difficulty: "Easy", conversionPotential: "High", topics: ["New lead welcome series", "Property alert sequences", "Seller nurture campaigns", "Past client re-engagement"], promotionChannels: ["Blog", "Facebook Groups", "Real estate forums"], funnelMatch: ["middle", "bottom"], formatMatch: ["template", "swipefile"] },
    { title: "What Type of Property Investor Are You?", format: "Quiz", difficulty: "Medium", conversionPotential: "High", topics: ["Risk tolerance assessment", "Investment strategy alignment", "Market readiness evaluation", "Capital allocation guidance"], promotionChannels: ["Facebook Ads", "Instagram", "Email pop-ups"], funnelMatch: ["top"], formatMatch: ["quiz"] },
    { title: "Local Market Analysis Webinar", format: "Webinar", difficulty: "Medium", conversionPotential: "High", topics: ["Current market trends", "Pricing analysis", "Inventory forecasts", "Buyer vs seller market indicators"], promotionChannels: ["Facebook Events", "Email list", "Local partnerships"], funnelMatch: ["middle", "bottom"], formatMatch: ["webinar", "videocourse"] },
    { title: "Property Comparison Spreadsheet Template", format: "Template", difficulty: "Easy", conversionPotential: "Medium", topics: ["Feature comparison matrix", "Cost analysis columns", "Neighborhood scoring", "Commute time tracker"], promotionChannels: ["Blog SEO", "Pinterest", "Real estate groups"], funnelMatch: ["middle"], formatMatch: ["template", "freetool"] },
    { title: "First-Time Investor Video Course", format: "Video Course", difficulty: "Hard", conversionPotential: "Medium", topics: ["Market analysis basics", "Financing options", "Property evaluation methods", "Rental income projections"], promotionChannels: ["YouTube Ads", "Facebook Groups", "Real estate podcasts"], funnelMatch: ["middle"], formatMatch: ["videocourse", "webinar"] },
  ],
  finance: [
    { title: "Financial Health Assessment Quiz", format: "Quiz", difficulty: "Medium", conversionPotential: "High", topics: ["Savings ratio analysis", "Debt management evaluation", "Insurance coverage gaps", "Retirement readiness score"], promotionChannels: ["Facebook Ads", "Google Ads", "Blog CTAs"], funnelMatch: ["top"], formatMatch: ["quiz", "calculator"] },
    { title: "Retirement Savings Calculator", format: "Calculator", difficulty: "Hard", conversionPotential: "High", topics: ["Compound interest projections", "Inflation adjustment", "Social Security estimates", "Withdrawal rate modeling"], promotionChannels: ["Google Ads", "Financial blogs", "Email"], funnelMatch: ["middle", "bottom"], formatMatch: ["calculator", "freetool"] },
    { title: "Tax Deduction Checklist for Small Businesses", format: "Checklist", difficulty: "Easy", conversionPotential: "High", topics: ["Common deduction categories", "Documentation requirements", "Quarterly filing reminders", "Home office deductions"], promotionChannels: ["Blog SEO", "LinkedIn", "Accounting forums"], funnelMatch: ["top", "middle"], formatMatch: ["checklist", "ebook"] },
    { title: "Investment Portfolio Template", format: "Template", difficulty: "Medium", conversionPotential: "Medium", topics: ["Asset allocation framework", "Risk assessment matrix", "Rebalancing schedule", "Performance tracking"], promotionChannels: ["LinkedIn", "Financial newsletters", "Email"], funnelMatch: ["middle"], formatMatch: ["template", "freetool"] },
    { title: "Financial Planning for Business Owners Guide", format: "Ebook / Guide", difficulty: "Medium", conversionPotential: "Medium", topics: ["Business vs personal finances", "Tax optimization strategies", "Exit planning basics", "Insurance requirements"], promotionChannels: ["LinkedIn Ads", "Google Ads", "Email nurture"], funnelMatch: ["top", "middle"], formatMatch: ["ebook", "casestudy"] },
    { title: "Client Onboarding Swipe File for Financial Advisors", format: "Swipe File", difficulty: "Easy", conversionPotential: "Medium", topics: ["Welcome email templates", "Intake questionnaires", "Compliance documents", "Meeting agenda templates"], promotionChannels: ["LinkedIn", "Industry associations", "Email"], funnelMatch: ["bottom"], formatMatch: ["swipefile", "template"] },
    { title: "Wealth Management Webinar: Building Your First Plan", format: "Webinar", difficulty: "Medium", conversionPotential: "High", topics: ["Goal-setting framework", "Risk profiling", "Investment basics", "Plan review schedule"], promotionChannels: ["Email list", "LinkedIn Events", "Facebook Ads"], funnelMatch: ["middle", "bottom"], formatMatch: ["webinar", "videocourse"] },
    { title: "Financial Services Case Studies Collection", format: "Case Study Collection", difficulty: "Medium", conversionPotential: "High", topics: ["Client success stories", "Strategy breakdowns", "ROI demonstrations", "Before/after portfolios"], promotionChannels: ["Email nurture", "LinkedIn", "Retargeting ads"], funnelMatch: ["bottom"], formatMatch: ["casestudy", "ebook"] },
  ],
  education: [
    { title: "Course Launch Checklist", format: "Checklist", difficulty: "Easy", conversionPotential: "High", topics: ["Content planning steps", "Platform selection criteria", "Pricing strategy framework", "Launch timeline"], promotionChannels: ["Blog SEO", "YouTube", "Email list"], funnelMatch: ["top", "middle"], formatMatch: ["checklist", "ebook"] },
    { title: "Student Engagement Strategy Template", format: "Template", difficulty: "Easy", conversionPotential: "Medium", topics: ["Gamification elements", "Community building tactics", "Feedback loop design", "Completion rate optimization"], promotionChannels: ["LinkedIn", "Education forums", "Email"], funnelMatch: ["middle"], formatMatch: ["template", "ebook"] },
    { title: "What Learning Format Works Best for You?", format: "Quiz", difficulty: "Medium", conversionPotential: "High", topics: ["Learning style assessment", "Schedule compatibility", "Budget alignment", "Goal mapping"], promotionChannels: ["Social media", "Blog CTAs", "Email pop-ups"], funnelMatch: ["top"], formatMatch: ["quiz"] },
    { title: "E-learning Revenue Calculator", format: "Calculator", difficulty: "Hard", conversionPotential: "High", topics: ["Pricing model comparison", "Student acquisition costs", "Lifetime value estimates", "Breakeven projections"], promotionChannels: ["Google Ads", "Education blogs", "LinkedIn"], funnelMatch: ["middle", "bottom"], formatMatch: ["calculator", "freetool"] },
    { title: "Complete Guide to Building an Online Course", format: "Ebook / Guide", difficulty: "Hard", conversionPotential: "Medium", topics: ["Curriculum design", "Video production basics", "Assessment creation", "Student support systems"], promotionChannels: ["YouTube", "Blog SEO", "Podcast appearances"], funnelMatch: ["top"], formatMatch: ["ebook", "videocourse"] },
    { title: "Email Templates for Student Recruitment", format: "Swipe File", difficulty: "Easy", conversionPotential: "Medium", topics: ["Application follow-ups", "Open house invitations", "Scholarship announcements", "Re-enrollment campaigns"], promotionChannels: ["Email", "LinkedIn", "Education portals"], funnelMatch: ["bottom"], formatMatch: ["swipefile", "template"] },
    { title: "Live Workshop: Creating Your First Mini-Course", format: "Webinar", difficulty: "Medium", conversionPotential: "High", topics: ["Niche selection", "Content outlining", "Recording setup", "Pricing and launch"], promotionChannels: ["Email list", "YouTube", "Social media"], funnelMatch: ["middle", "bottom"], formatMatch: ["webinar", "videocourse"] },
    { title: "E-learning Success Stories Collection", format: "Case Study Collection", difficulty: "Medium", conversionPotential: "High", topics: ["Revenue growth examples", "Student outcome data", "Platform comparison insights", "Marketing strategy results"], promotionChannels: ["Email nurture", "LinkedIn", "Blog"], funnelMatch: ["bottom"], formatMatch: ["casestudy", "ebook"] },
  ],
  marketing: [
    { title: "Client Proposal Template Pack", format: "Template", difficulty: "Easy", conversionPotential: "High", topics: ["Scope of work frameworks", "Pricing presentation layouts", "Case study integration", "Terms and conditions"], promotionChannels: ["LinkedIn", "Agency communities", "Blog SEO"], funnelMatch: ["middle", "bottom"], formatMatch: ["template", "swipefile"] },
    { title: "Ad Spend ROI Calculator", format: "Calculator", difficulty: "Hard", conversionPotential: "High", topics: ["ROAS modeling", "Attribution frameworks", "Budget allocation optimization", "Forecasting formulas"], promotionChannels: ["Google Ads", "LinkedIn", "Marketing blogs"], funnelMatch: ["middle", "bottom"], formatMatch: ["calculator", "freetool"] },
    { title: "Content Marketing Strategy Blueprint", format: "Ebook / Guide", difficulty: "Medium", conversionPotential: "Medium", topics: ["Audience research methods", "Content pillar development", "Distribution strategy", "Measurement framework"], promotionChannels: ["Blog SEO", "LinkedIn", "Email list"], funnelMatch: ["top", "middle"], formatMatch: ["ebook", "checklist"] },
    { title: "Social Media Audit Checklist", format: "Checklist", difficulty: "Easy", conversionPotential: "High", topics: ["Profile optimization points", "Content performance review", "Audience analysis steps", "Competitor benchmarking"], promotionChannels: ["Social media", "Blog", "Email pop-ups"], funnelMatch: ["top"], formatMatch: ["checklist", "ebook"] },
    { title: "What Marketing Channel Should You Focus On?", format: "Quiz", difficulty: "Medium", conversionPotential: "High", topics: ["Business model assessment", "Budget evaluation", "Audience behavior analysis", "Competitive landscape review"], promotionChannels: ["Facebook Ads", "Blog CTAs", "Email"], funnelMatch: ["top"], formatMatch: ["quiz"] },
    { title: "Ad Copy Swipe File: 100 Proven Headlines", format: "Swipe File", difficulty: "Easy", conversionPotential: "Medium", topics: ["Headlines by industry", "CTA variations", "Emotional triggers", "A/B testing frameworks"], promotionChannels: ["LinkedIn", "Twitter/X", "Marketing communities"], funnelMatch: ["middle"], formatMatch: ["swipefile", "template"] },
    { title: "Agency Growth Masterclass", format: "Video Course", difficulty: "Hard", conversionPotential: "Medium", topics: ["Service packaging", "Pricing strategies", "Client retention systems", "Hiring frameworks"], promotionChannels: ["YouTube Ads", "LinkedIn", "Agency podcasts"], funnelMatch: ["middle"], formatMatch: ["videocourse", "webinar"] },
    { title: "Marketing Campaign Case Study Collection", format: "Case Study Collection", difficulty: "Medium", conversionPotential: "High", topics: ["Campaign strategy breakdowns", "Budget and ROI data", "Channel performance analysis", "Key takeaways"], promotionChannels: ["Email nurture", "LinkedIn", "Retargeting"], funnelMatch: ["bottom"], formatMatch: ["casestudy", "ebook"] },
  ],
  legal: [
    { title: "Business Formation Checklist", format: "Checklist", difficulty: "Easy", conversionPotential: "High", topics: ["Entity type comparison", "Registration requirements", "Tax implications", "Compliance deadlines"], promotionChannels: ["Google Ads", "Blog SEO", "LinkedIn"], funnelMatch: ["top", "middle"], formatMatch: ["checklist", "ebook"] },
    { title: "Legal Fee Estimator", format: "Calculator", difficulty: "Hard", conversionPotential: "High", topics: ["Service type pricing", "Complexity factors", "Timeline estimates", "Payment plan options"], promotionChannels: ["Google Ads", "Legal directories", "Email"], funnelMatch: ["middle", "bottom"], formatMatch: ["calculator", "freetool"] },
    { title: "Contract Template Library", format: "Template", difficulty: "Medium", conversionPotential: "High", topics: ["NDA templates", "Service agreements", "Employment contracts", "Partnership documents"], promotionChannels: ["Blog SEO", "LinkedIn", "Legal forums"], funnelMatch: ["middle"], formatMatch: ["template", "swipefile"] },
    { title: "Small Business Legal Guide", format: "Ebook / Guide", difficulty: "Medium", conversionPotential: "Medium", topics: ["Common legal pitfalls", "Intellectual property basics", "Employment law overview", "Contract essentials"], promotionChannels: ["Blog SEO", "LinkedIn Ads", "Email nurture"], funnelMatch: ["top"], formatMatch: ["ebook", "casestudy"] },
    { title: "Do You Need a Lawyer? Assessment Quiz", format: "Quiz", difficulty: "Medium", conversionPotential: "High", topics: ["Situation assessment", "Risk evaluation", "DIY vs professional guidance", "Urgency indicators"], promotionChannels: ["Google Ads", "Social media", "Blog CTAs"], funnelMatch: ["top"], formatMatch: ["quiz"] },
    { title: "Legal Compliance Swipe File for Startups", format: "Swipe File", difficulty: "Easy", conversionPotential: "Medium", topics: ["Privacy policy templates", "Terms of service examples", "Cookie consent wording", "Data protection checklists"], promotionChannels: ["LinkedIn", "Startup communities", "Email"], funnelMatch: ["middle", "bottom"], formatMatch: ["swipefile", "template"] },
    { title: "Protecting Your Business: Live Legal Q&A", format: "Webinar", difficulty: "Medium", conversionPotential: "High", topics: ["Common legal questions", "Risk mitigation strategies", "Document preparation tips", "When to seek counsel"], promotionChannels: ["Email list", "LinkedIn Events", "Chamber of Commerce"], funnelMatch: ["middle", "bottom"], formatMatch: ["webinar", "videocourse"] },
    { title: "Legal Success Stories for Small Businesses", format: "Case Study Collection", difficulty: "Medium", conversionPotential: "High", topics: ["Dispute resolution examples", "Contract protection cases", "IP defense outcomes", "Compliance success stories"], promotionChannels: ["Email nurture", "LinkedIn", "Blog"], funnelMatch: ["bottom"], formatMatch: ["casestudy", "ebook"] },
  ],
  construction: [
    { title: "Project Estimation Template", format: "Template", difficulty: "Medium", conversionPotential: "High", topics: ["Material cost breakdowns", "Labor hour estimates", "Permit fee tracking", "Contingency budgeting"], promotionChannels: ["Google Ads", "Local SEO", "Industry forums"], funnelMatch: ["middle", "bottom"], formatMatch: ["template", "freetool"] },
    { title: "Home Renovation Cost Calculator", format: "Calculator", difficulty: "Hard", conversionPotential: "High", topics: ["Room-by-room estimates", "Material quality tiers", "Labor market rates", "Timeline projections"], promotionChannels: ["Google Ads", "Pinterest", "Local SEO"], funnelMatch: ["middle", "bottom"], formatMatch: ["calculator", "freetool"] },
    { title: "Home Maintenance Seasonal Checklist", format: "Checklist", difficulty: "Easy", conversionPotential: "High", topics: ["Spring/summer tasks", "Fall/winter preparation", "Emergency prevention", "Professional inspection timing"], promotionChannels: ["Local SEO", "Facebook", "Email list"], funnelMatch: ["top"], formatMatch: ["checklist", "ebook"] },
    { title: "Contractor Selection Guide", format: "Ebook / Guide", difficulty: "Medium", conversionPotential: "Medium", topics: ["License verification steps", "Reference check questions", "Contract red flags", "Payment schedule best practices"], promotionChannels: ["Blog SEO", "Google Ads", "Local directories"], funnelMatch: ["top", "middle"], formatMatch: ["ebook", "checklist"] },
    { title: "What Type of Renovation Fits Your Budget?", format: "Quiz", difficulty: "Medium", conversionPotential: "High", topics: ["Budget range assessment", "Project scope evaluation", "Timeline expectations", "DIY vs professional decisions"], promotionChannels: ["Facebook Ads", "Instagram", "Blog CTAs"], funnelMatch: ["top"], formatMatch: ["quiz"] },
    { title: "Before/After Project Showcase Webinar", format: "Webinar", difficulty: "Medium", conversionPotential: "High", topics: ["Project walkthroughs", "Budget breakdowns", "Timeline lessons learned", "Design trend highlights"], promotionChannels: ["Facebook Events", "Email list", "Instagram"], funnelMatch: ["middle", "bottom"], formatMatch: ["webinar", "videocourse"] },
    { title: "Client Communication Templates for Contractors", format: "Swipe File", difficulty: "Easy", conversionPotential: "Medium", topics: ["Quote follow-up emails", "Project update templates", "Change order notifications", "Review request messages"], promotionChannels: ["LinkedIn", "Industry groups", "Email"], funnelMatch: ["middle"], formatMatch: ["swipefile", "template"] },
    { title: "Home Improvement Case Studies", format: "Case Study Collection", difficulty: "Medium", conversionPotential: "High", topics: ["Project scope and budget", "Before/after documentation", "Client testimonials", "ROI on home value"], promotionChannels: ["Local SEO", "Facebook", "Email nurture"], funnelMatch: ["bottom"], formatMatch: ["casestudy", "ebook"] },
  ],
  fitness: [
    { title: "Personal Fitness Assessment Quiz", format: "Quiz", difficulty: "Medium", conversionPotential: "High", topics: ["Current fitness level", "Goal alignment", "Training style preference", "Schedule compatibility"], promotionChannels: ["Instagram Ads", "Facebook Ads", "Blog CTAs"], funnelMatch: ["top"], formatMatch: ["quiz"] },
    { title: "Workout Plan Template Library", format: "Template", difficulty: "Easy", conversionPotential: "High", topics: ["Beginner programs", "Strength training splits", "HIIT routines", "Recovery protocols"], promotionChannels: ["Instagram", "YouTube", "Email pop-ups"], funnelMatch: ["top", "middle"], formatMatch: ["template", "ebook"] },
    { title: "Macro Calculator for Nutrition Goals", format: "Calculator", difficulty: "Hard", conversionPotential: "High", topics: ["Caloric needs estimation", "Macro ratio recommendations", "Activity level adjustments", "Goal-based modifications"], promotionChannels: ["Google Ads", "Instagram", "Fitness forums"], funnelMatch: ["middle", "bottom"], formatMatch: ["calculator", "freetool"] },
    { title: "Gym Launch Marketing Checklist", format: "Checklist", difficulty: "Easy", conversionPotential: "Medium", topics: ["Pre-launch campaign steps", "Social media setup", "Referral program structure", "Grand opening planning"], promotionChannels: ["Local SEO", "Facebook Groups", "Email"], funnelMatch: ["top", "middle"], formatMatch: ["checklist", "ebook"] },
    { title: "30-Day Transformation Challenge Guide", format: "Ebook / Guide", difficulty: "Medium", conversionPotential: "High", topics: ["Program structure", "Daily workout plans", "Meal prep guides", "Progress tracking methods"], promotionChannels: ["Instagram Ads", "Facebook Groups", "YouTube"], funnelMatch: ["top"], formatMatch: ["ebook", "videocourse"] },
    { title: "Client Retention Swipe File for Fitness Businesses", format: "Swipe File", difficulty: "Easy", conversionPotential: "Medium", topics: ["Check-in message templates", "Re-engagement sequences", "Milestone celebration emails", "Referral request scripts"], promotionChannels: ["LinkedIn", "Fitness business groups", "Email"], funnelMatch: ["middle", "bottom"], formatMatch: ["swipefile", "template"] },
    { title: "Live Workshop: Building Your Online Fitness Program", format: "Webinar", difficulty: "Medium", conversionPotential: "High", topics: ["Platform selection", "Content creation workflow", "Pricing models", "Client onboarding"], promotionChannels: ["Instagram", "Email list", "YouTube"], funnelMatch: ["middle", "bottom"], formatMatch: ["webinar", "videocourse"] },
    { title: "Fitness Business Growth Case Studies", format: "Case Study Collection", difficulty: "Medium", conversionPotential: "High", topics: ["Revenue scaling examples", "Marketing campaign results", "Client transformation stories", "Retention strategy outcomes"], promotionChannels: ["Email nurture", "Instagram", "LinkedIn"], funnelMatch: ["bottom"], formatMatch: ["casestudy", "ebook"] },
  ],
  food: [
    { title: "Restaurant Opening Checklist", format: "Checklist", difficulty: "Easy", conversionPotential: "High", topics: ["License and permit requirements", "Equipment essentials", "Staffing timeline", "Marketing launch plan"], promotionChannels: ["Google Ads", "Local SEO", "Restaurant forums"], funnelMatch: ["top", "middle"], formatMatch: ["checklist", "ebook"] },
    { title: "Food Cost Calculator", format: "Calculator", difficulty: "Hard", conversionPotential: "High", topics: ["Ingredient cost tracking", "Menu pricing formulas", "Waste reduction metrics", "Profit margin targets"], promotionChannels: ["Google Ads", "Restaurant associations", "LinkedIn"], funnelMatch: ["middle", "bottom"], formatMatch: ["calculator", "freetool"] },
    { title: "Menu Engineering Guide", format: "Ebook / Guide", difficulty: "Medium", conversionPotential: "Medium", topics: ["Item profitability analysis", "Menu layout psychology", "Pricing strategies", "Seasonal menu planning"], promotionChannels: ["Blog SEO", "Instagram", "Email list"], funnelMatch: ["top", "middle"], formatMatch: ["ebook", "template"] },
    { title: "Social Media Content Calendar for Restaurants", format: "Template", difficulty: "Easy", conversionPotential: "Medium", topics: ["Daily post ideas", "Food photography tips", "Hashtag strategies", "User-generated content campaigns"], promotionChannels: ["Instagram", "Facebook", "Email"], funnelMatch: ["top"], formatMatch: ["template", "swipefile"] },
    { title: "What Type of Food Business Should You Start?", format: "Quiz", difficulty: "Medium", conversionPotential: "High", topics: ["Cuisine interest assessment", "Budget evaluation", "Location type analysis", "Service model fit"], promotionChannels: ["Facebook Ads", "Instagram", "Blog CTAs"], funnelMatch: ["top"], formatMatch: ["quiz"] },
    { title: "Online Ordering Setup Webinar for Restaurants", format: "Webinar", difficulty: "Medium", conversionPotential: "High", topics: ["Platform comparison", "Menu digitization", "Delivery logistics", "Customer experience optimization"], promotionChannels: ["Email list", "Facebook Events", "Restaurant associations"], funnelMatch: ["middle", "bottom"], formatMatch: ["webinar", "videocourse"] },
    { title: "Customer Review Response Templates", format: "Swipe File", difficulty: "Easy", conversionPotential: "Medium", topics: ["Positive review responses", "Negative review handling", "Follow-up invitation scripts", "Review solicitation messages"], promotionChannels: ["Blog", "Restaurant communities", "Email"], funnelMatch: ["middle"], formatMatch: ["swipefile", "template"] },
    { title: "Restaurant Marketing Success Stories", format: "Case Study Collection", difficulty: "Medium", conversionPotential: "High", topics: ["Social media campaigns", "Local marketing strategies", "Loyalty program results", "Event marketing outcomes"], promotionChannels: ["Email nurture", "Facebook", "Local partnerships"], funnelMatch: ["bottom"], formatMatch: ["casestudy", "ebook"] },
  ],
  travel: [
    { title: "Travel Planning Checklist Template", format: "Checklist", difficulty: "Easy", conversionPotential: "High", topics: ["Pre-trip preparation", "Packing essentials", "Documentation requirements", "Budget planning steps"], promotionChannels: ["Pinterest", "Instagram", "Blog SEO"], funnelMatch: ["top"], formatMatch: ["checklist", "template"] },
    { title: "Trip Budget Calculator", format: "Calculator", difficulty: "Hard", conversionPotential: "High", topics: ["Accommodation cost estimates", "Transportation budgeting", "Activity cost planning", "Currency conversion tools"], promotionChannels: ["Google Ads", "Travel blogs", "Pinterest"], funnelMatch: ["middle", "bottom"], formatMatch: ["calculator", "freetool"] },
    { title: "Destination Guide Template Pack", format: "Template", difficulty: "Medium", conversionPotential: "Medium", topics: ["Itinerary frameworks", "Local tips sections", "Budget breakdown tables", "Activity comparison charts"], promotionChannels: ["Pinterest", "Instagram", "Email list"], funnelMatch: ["top", "middle"], formatMatch: ["template", "ebook"] },
    { title: "What Kind of Traveler Are You?", format: "Quiz", difficulty: "Medium", conversionPotential: "High", topics: ["Travel style assessment", "Budget preference matching", "Activity level evaluation", "Accommodation type alignment"], promotionChannels: ["Instagram Ads", "Facebook Ads", "Blog CTAs"], funnelMatch: ["top"], formatMatch: ["quiz"] },
    { title: "Hospitality Marketing Strategy Guide", format: "Ebook / Guide", difficulty: "Medium", conversionPotential: "Medium", topics: ["Seasonal marketing calendar", "OTA vs direct booking strategy", "Review management", "Social media for hotels"], promotionChannels: ["LinkedIn", "Travel associations", "Email"], funnelMatch: ["top", "middle"], formatMatch: ["ebook", "casestudy"] },
    { title: "Guest Communication Email Templates", format: "Swipe File", difficulty: "Easy", conversionPotential: "Medium", topics: ["Booking confirmation templates", "Pre-arrival sequences", "Post-stay follow-ups", "Review request messages"], promotionChannels: ["LinkedIn", "Hospitality forums", "Email"], funnelMatch: ["middle", "bottom"], formatMatch: ["swipefile", "template"] },
    { title: "Revenue Management Webinar for Hotels", format: "Webinar", difficulty: "Hard", conversionPotential: "High", topics: ["Dynamic pricing strategies", "Occupancy optimization", "Channel management", "Competitive analysis tools"], promotionChannels: ["LinkedIn Events", "Email list", "Industry associations"], funnelMatch: ["middle", "bottom"], formatMatch: ["webinar", "videocourse"] },
    { title: "Hospitality Marketing Case Studies", format: "Case Study Collection", difficulty: "Medium", conversionPotential: "High", topics: ["Direct booking campaigns", "Social media strategies", "Guest experience improvements", "Revenue growth stories"], promotionChannels: ["Email nurture", "LinkedIn", "Industry publications"], funnelMatch: ["bottom"], formatMatch: ["casestudy", "ebook"] },
  ],
  consulting: [
    { title: "Consulting Proposal Template Pack", format: "Template", difficulty: "Easy", conversionPotential: "High", topics: ["Executive summary framework", "Scope and deliverables structure", "Pricing presentation", "Timeline visualization"], promotionChannels: ["LinkedIn", "Blog SEO", "Email list"], funnelMatch: ["middle", "bottom"], formatMatch: ["template", "swipefile"] },
    { title: "Consulting Rate Calculator", format: "Calculator", difficulty: "Hard", conversionPotential: "High", topics: ["Market rate benchmarking", "Value-based pricing models", "Overhead cost inclusion", "Project vs retainer comparison"], promotionChannels: ["LinkedIn Ads", "Google Ads", "Blog"], funnelMatch: ["middle", "bottom"], formatMatch: ["calculator", "freetool"] },
    { title: "Client Discovery Call Checklist", format: "Checklist", difficulty: "Easy", conversionPotential: "High", topics: ["Qualifying questions", "Pain point identification", "Budget assessment", "Decision timeline mapping"], promotionChannels: ["LinkedIn", "Blog SEO", "Email"], funnelMatch: ["top", "middle"], formatMatch: ["checklist", "ebook"] },
    { title: "How to Start a Consulting Business Guide", format: "Ebook / Guide", difficulty: "Medium", conversionPotential: "Medium", topics: ["Niche selection framework", "Service packaging", "Pipeline building", "Authority positioning"], promotionChannels: ["LinkedIn Ads", "Blog SEO", "Podcast appearances"], funnelMatch: ["top"], formatMatch: ["ebook", "videocourse"] },
    { title: "What Consulting Model Fits Your Expertise?", format: "Quiz", difficulty: "Medium", conversionPotential: "High", topics: ["Expertise assessment", "Work style evaluation", "Revenue model alignment", "Market opportunity mapping"], promotionChannels: ["LinkedIn", "Social media", "Blog CTAs"], funnelMatch: ["top"], formatMatch: ["quiz"] },
    { title: "Sales Script Collection for Consultants", format: "Swipe File", difficulty: "Easy", conversionPotential: "Medium", topics: ["Cold outreach templates", "Follow-up sequences", "Objection handling scripts", "Close and next-step phrases"], promotionChannels: ["LinkedIn", "Consulting communities", "Email"], funnelMatch: ["bottom"], formatMatch: ["swipefile", "template"] },
    { title: "Masterclass: Landing Your First 5 Clients", format: "Webinar", difficulty: "Medium", conversionPotential: "High", topics: ["Lead generation tactics", "Networking strategies", "Referral systems", "Online presence building"], promotionChannels: ["LinkedIn Events", "Email list", "YouTube"], funnelMatch: ["middle", "bottom"], formatMatch: ["webinar", "videocourse"] },
    { title: "Consulting Business Growth Case Studies", format: "Case Study Collection", difficulty: "Medium", conversionPotential: "High", topics: ["Client acquisition strategies", "Service scaling examples", "Revenue diversification", "Niche positioning outcomes"], promotionChannels: ["Email nurture", "LinkedIn", "Blog"], funnelMatch: ["bottom"], formatMatch: ["casestudy", "ebook"] },
  ],
  nonprofit: [
    { title: "Fundraising Campaign Checklist", format: "Checklist", difficulty: "Easy", conversionPotential: "High", topics: ["Campaign planning steps", "Donor segmentation", "Communication timeline", "Goal tracking methods"], promotionChannels: ["Email list", "Social media", "Partner organizations"], funnelMatch: ["top", "middle"], formatMatch: ["checklist", "ebook"] },
    { title: "Donation Impact Calculator", format: "Calculator", difficulty: "Hard", conversionPotential: "High", topics: ["Cost-per-impact modeling", "Donor level tiers", "Program outcome projections", "Transparency metrics"], promotionChannels: ["Google Ads (grants)", "Social media", "Email"], funnelMatch: ["middle", "bottom"], formatMatch: ["calculator", "freetool"] },
    { title: "Grant Writing Template Pack", format: "Template", difficulty: "Medium", conversionPotential: "High", topics: ["Narrative structure", "Budget justification format", "Logic model templates", "Cover letter examples"], promotionChannels: ["LinkedIn", "Nonprofit networks", "Email"], funnelMatch: ["middle"], formatMatch: ["template", "swipefile"] },
    { title: "Nonprofit Digital Marketing Guide", format: "Ebook / Guide", difficulty: "Medium", conversionPotential: "Medium", topics: ["Social media strategy", "Email fundraising tactics", "Google Ad Grants usage", "Content storytelling"], promotionChannels: ["Blog SEO", "LinkedIn", "Nonprofit conferences"], funnelMatch: ["top"], formatMatch: ["ebook", "checklist"] },
    { title: "Which Fundraising Strategy Fits Your Mission?", format: "Quiz", difficulty: "Medium", conversionPotential: "High", topics: ["Organization size assessment", "Donor base analysis", "Resource evaluation", "Channel preference matching"], promotionChannels: ["Social media", "Email", "Blog CTAs"], funnelMatch: ["top"], formatMatch: ["quiz"] },
    { title: "Donor Communication Swipe File", format: "Swipe File", difficulty: "Easy", conversionPotential: "Medium", topics: ["Thank-you letter templates", "Impact update emails", "Year-end appeal scripts", "Monthly newsletter outlines"], promotionChannels: ["Email", "Nonprofit communities", "LinkedIn"], funnelMatch: ["middle", "bottom"], formatMatch: ["swipefile", "template"] },
    { title: "Volunteer Management Best Practices Webinar", format: "Webinar", difficulty: "Medium", conversionPotential: "High", topics: ["Recruitment strategies", "Onboarding processes", "Retention programs", "Recognition systems"], promotionChannels: ["Email list", "LinkedIn Events", "Partner organizations"], funnelMatch: ["middle", "bottom"], formatMatch: ["webinar", "videocourse"] },
    { title: "Nonprofit Success Stories Collection", format: "Case Study Collection", difficulty: "Medium", conversionPotential: "High", topics: ["Campaign results", "Community impact data", "Fundraising innovation examples", "Partnership outcomes"], promotionChannels: ["Email nurture", "Social media", "Grant applications"], funnelMatch: ["bottom"], formatMatch: ["casestudy", "ebook"] },
  ],
};

/* ------------------------------------------------------------------ */
/*  Generate ideas based on selections                                 */
/* ------------------------------------------------------------------ */

function generateIdeas(
  industry: string,
  funnel: FunnelStage,
  formatPref: string
): LeadMagnetIdea[] {
  const bank = ideaBank[industry] || ideaBank.marketing;

  /* Score each idea by relevance to funnel + format */
  const scored = bank.map((idea) => {
    let score = 0;
    if (idea.funnelMatch.includes(funnel)) score += 3;
    if (idea.formatMatch.includes(formatPref)) score += 2;
    return { idea, score };
  });

  /* Sort by score descending, then take top 5-8 */
  scored.sort((a, b) => b.score - a.score);

  /* Always return between 5 and 8 ideas */
  const count = Math.min(Math.max(scored.length, 5), 8);
  const selected = scored.slice(0, count);

  return selected.map((s) => ({
    title: s.idea.title,
    format: s.idea.format,
    difficulty: s.idea.difficulty,
    conversionPotential: s.idea.conversionPotential,
    topics: s.idea.topics,
    promotionChannels: s.idea.promotionChannels,
  }));
}

/* ------------------------------------------------------------------ */
/*  Best practices data                                                */
/* ------------------------------------------------------------------ */

const bestPractices = [
  {
    heading: "Solve a Specific Problem",
    body: "The best lead magnets address one clear pain point. Avoid trying to cover everything. A focused checklist that solves an immediate need will outperform a generic ebook every time.",
  },
  {
    heading: "Deliver Quick Wins",
    body: "Your lead magnet should provide value within minutes of downloading. If someone has to read 50 pages before seeing a result, they are unlikely to engage with your follow-up offers.",
  },
  {
    heading: "Match Format to Audience",
    body: "Busy executives prefer checklists and templates they can use immediately. Beginners may want comprehensive guides. Choose the format that respects your audience's time and expertise level.",
  },
  {
    heading: "Design for Credibility",
    body: "Professional design signals quality. Use clean layouts, your brand colors, and consistent typography. A well-designed lead magnet builds trust before your sales team ever makes contact.",
  },
  {
    heading: "Optimize Your Landing Page",
    body: "Your lead magnet is only as good as the page that promotes it. Use a clear headline, bullet-point benefits, a visual preview, and a simple form. Fewer form fields typically mean higher conversion rates.",
  },
  {
    heading: "Follow Up Strategically",
    body: "The lead magnet is the start of a relationship, not the end. Plan a nurture email sequence that builds on the topic, provides additional value, and naturally transitions to your core offer.",
  },
];

/* ------------------------------------------------------------------ */
/*  Format results as plain text                                       */
/* ------------------------------------------------------------------ */

function formatResultsText(
  ideas: LeadMagnetIdea[],
  industry: string,
  funnel: string,
  format: string
): string {
  const lines: string[] = [];

  const industryLabel =
    industries.find((i) => i.value === industry)?.label ?? industry;
  const funnelLabel =
    funnelStages.find((f) => f.value === funnel)?.label ?? funnel;
  const formatLabel =
    formatOptions.find((f) => f.value === format)?.label ?? format;

  lines.push("LEAD MAGNET IDEAS");
  lines.push("=".repeat(50));
  lines.push("");
  lines.push(`Industry: ${industryLabel}`);
  lines.push(`Funnel Stage: ${funnelLabel}`);
  lines.push(`Format Preference: ${formatLabel}`);
  lines.push("");

  ideas.forEach((idea, i) => {
    lines.push(`${i + 1}. ${idea.title}`);
    lines.push(`   Format: ${idea.format}`);
    lines.push(`   Difficulty: ${idea.difficulty}`);
    lines.push(`   Conversion Potential: ${idea.conversionPotential}`);
    lines.push(`   Topics: ${idea.topics.join(", ")}`);
    lines.push(`   Promotion Channels: ${idea.promotionChannels.join(", ")}`);
    lines.push("");
  });

  lines.push("BEST PRACTICES");
  lines.push("-".repeat(30));
  bestPractices.forEach((bp) => {
    lines.push(`- ${bp.heading}: ${bp.body}`);
  });
  lines.push("");

  lines.push("Generated by Markit Media Lead Magnet Idea Generator");
  lines.push(
    "https://themarkitmedia.com/resources/lead-magnet-generator"
  );

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard API unavailable */
    }
  }, [text]);

  return (
    <button
      onClick={copy}
      aria-label="Copy results to clipboard"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Lead Magnet Idea Generator",
          description: "Free interactive tool that generates lead magnet ideas tailored to your industry, funnel stage, and preferred format.",
          url: "https://themarkitmedia.com/en/resources/lead-magnet-generator",
          applicationCategory: "Advertising Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      {copied ? "Copied" : "Copy Results"}
    </button>
  );
}

function DownloadButton({
  text,
  filename,
}: {
  text: string;
  filename: string;
}) {
  const download = useCallback(() => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [text, filename]);

  return (
    <button
      onClick={download}
      aria-label="Download results as text file"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold bg-black text-white hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      Download as Text
    </button>
  );
}

function DifficultyBadge({ level }: { level: "Easy" | "Medium" | "Hard" }) {
  const styles = {
    Easy: "bg-gray-100 text-black",
    Medium: "bg-gray-300 text-black",
    Hard: "bg-black text-white",
  };
  return (
    <span className={`px-3 py-1 text-base font-bold ${styles[level]}`}>
      {level}
    </span>
  );
}

function ConversionBadge({
  level,
}: {
  level: "High" | "Medium" | "Low";
}) {
  const styles = {
    High: "bg-black text-white",
    Medium: "bg-gray-300 text-black",
    Low: "bg-gray-100 text-black",
  };
  return (
    <span className={`px-3 py-1 text-base font-bold ${styles[level]}`}>
      {level}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Selector step component                                            */
/* ------------------------------------------------------------------ */

function SelectionStep({
  label,
  question,
  options,
  value,
  onChange,
}: {
  label: string;
  question: string;
  options: SelectOption[];
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="border border-gray-200 mb-8">
      <div className="bg-black text-white px-6 py-5">
        <p className="text-base font-bold uppercase tracking-[0.2em] mb-1">
          {label}
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold">
          {question}
        </h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`min-h-[44px] px-5 py-4 text-base text-left font-bold transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                value === opt.value
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-lg hover:-translate-y-1"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function LeadMagnetGeneratorPage() {
  const [industry, setIndustry] = useState("");
  const [funnel, setFunnel] = useState("");
  const [formatPref, setFormatPref] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const allSelected =
    industry !== "" && funnel !== "" && formatPref !== "";

  function handleGenerate() {
    if (allSelected) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleReset() {
    setIndustry("");
    setFunnel("");
    setFormatPref("");
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const ideas = submitted
    ? generateIdeas(industry, funnel as FunnelStage, formatPref)
    : [];
  const plainText = submitted
    ? formatResultsText(ideas, industry, funnel, formatPref)
    : "";

  return (
    <article className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Lead Magnet Idea Generator",
          description:
            "Free interactive tool that generates lead magnet ideas tailored to your industry, funnel stage, and preferred format.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Lead Magnet Generator" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Lead Magnet Idea Generator
            </h1>
            <SectionDesc>
              Select your industry, target funnel stage, and preferred format to
              get tailored lead magnet ideas you can create and promote to grow
              your email list and generate qualified leads.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {!submitted ? (
        <>
          {/* ---- Selection Steps ---- */}
          <section
            className="px-6 lg:px-12 py-8"
            aria-label="Lead magnet configuration"
          >
            <div className="max-w-3xl mx-auto">
              <Animate animation="fade-up">
                <SelectionStep
                  label="Step 1"
                  question="What industry are you in?"
                  options={industries}
                  value={industry}
                  onChange={setIndustry}
                />
              </Animate>

              <Animate animation="fade-up">
                <SelectionStep
                  label="Step 2"
                  question="What funnel stage are you targeting?"
                  options={funnelStages}
                  value={funnel}
                  onChange={setFunnel}
                />
              </Animate>

              <Animate animation="fade-up">
                <SelectionStep
                  label="Step 3"
                  question="What lead magnet format do you prefer?"
                  options={formatOptions}
                  value={formatPref}
                  onChange={setFormatPref}
                />
              </Animate>

              {/* Generate button */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleGenerate}
                  disabled={!allSelected}
                  className={`min-h-[44px] px-10 py-4 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                    allSelected
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Generate Lead Magnet Ideas
                </button>
              </div>

              {!allSelected && (
                <p className="text-base text-gray-400 text-center mt-4">
                  Complete all three selections above to generate your ideas
                </p>
              )}
            </div>
          </section>

          {/* ---- Best Practices (always visible) ---- */}
          <section aria-label="Lead Magnet Best Practices" className="px-6 lg:px-12 py-16 bg-gray-50">
            <div className="max-w-3xl mx-auto">
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-2">
                  Lead Magnet Best Practices
                </h2>
                <p className="text-base text-gray-500 mb-8">
                  Keep these principles in mind when creating your lead magnet.
                </p>
              </Animate>

              <Stagger stagger={100} className="space-y-6">
                {bestPractices.map((bp) => (
                  <div
                    key={bp.heading}
                    className="border border-gray-200 bg-white p-6"
                  >
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                      {bp.heading}
                    </h3>
                    <p className="text-base text-gray-600">{bp.body}</p>
                  </div>
                ))}
              </Stagger>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* ---- Results ---- */}
          <section
            className="px-6 lg:px-12 py-8"
            aria-label="Lead magnet ideas"
          >
            <div className="max-w-3xl mx-auto">
              {/* Selection summary */}
              <Animate animation="fade-up">
                <div className="border border-gray-200 p-6 mb-8">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                    Your Selections
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-base font-bold text-black mb-1">
                        Industry
                      </p>
                      <p className="text-base text-gray-600">
                        {industries.find((i) => i.value === industry)
                          ?.label ?? industry}
                      </p>
                    </div>
                    <div>
                      <p className="text-base font-bold text-black mb-1">
                        Funnel Stage
                      </p>
                      <p className="text-base text-gray-600">
                        {funnelStages.find((f) => f.value === funnel)
                          ?.label ?? funnel}
                      </p>
                    </div>
                    <div>
                      <p className="text-base font-bold text-black mb-1">
                        Format
                      </p>
                      <p className="text-base text-gray-600">
                        {formatOptions.find((f) => f.value === formatPref)
                          ?.label ?? formatPref}
                      </p>
                    </div>
                  </div>
                </div>
              </Animate>

              {/* Ideas heading */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                  Your Lead Magnet Ideas
                </h2>
              </Animate>

              {/* Idea cards */}
              <Stagger stagger={100} className="space-y-6 mb-12">
                {ideas.map((idea, i) => (
                  <div
                    key={idea.title}
                    className="border border-gray-200"
                  >
                    <div className="bg-black text-white px-6 py-4 flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <span className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold shrink-0">
                          {i + 1}.
                        </span>
                        <span className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold">
                          {idea.title}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 space-y-5">
                      {/* Badges row */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="px-3 py-1 text-base font-bold bg-gray-100 text-black">
                          {idea.format}
                        </span>
                        <DifficultyBadge level={idea.difficulty} />
                        <div className="flex items-center gap-2">
                          <span className="text-base text-gray-500">
                            Conversion:
                          </span>
                          <ConversionBadge
                            level={idea.conversionPotential}
                          />
                        </div>
                      </div>

                      {/* Topics */}
                      <div>
                        <p className="text-base font-bold text-black mb-2">
                          Key Topics to Include
                        </p>
                        <ul className="space-y-2">
                          {idea.topics.map((topic, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-3 text-base text-gray-600"
                            >
                              <span className="font-bold text-black min-w-[24px]">
                                {j + 1}.
                              </span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Promotion channels */}
                      <div>
                        <p className="text-base font-bold text-black mb-2">
                          Promotion Channels
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {idea.promotionChannels.map((ch) => (
                            <span
                              key={ch}
                              className="px-3 py-1 text-base border border-gray-200 text-gray-600"
                            >
                              {ch}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Stagger>

              {/* ---- Best Practices ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-2">
                  Lead Magnet Best Practices
                </h2>
                <p className="text-base text-gray-500 mb-6">
                  Keep these principles in mind when creating your lead magnet.
                </p>
              </Animate>

              <Stagger stagger={100} className="space-y-6 mb-12">
                {bestPractices.map((bp) => (
                  <div
                    key={bp.heading}
                    className="border border-gray-200 p-6"
                  >
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                      {bp.heading}
                    </h3>
                    <p className="text-base text-gray-600">{bp.body}</p>
                  </div>
                ))}
              </Stagger>

              {/* ---- Actions ---- */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <CopyButton text={plainText} />
                <DownloadButton
                  text={plainText}
                  filename="lead-magnet-ideas.txt"
                />
                <button
                  onClick={handleReset}
                  className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border-2 border-black text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Start Over
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ---- CTA ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Creating Your Lead Magnet?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team can design, write, and promote high-converting lead
              magnets that grow your pipeline. Let us turn these ideas into
              assets that generate qualified leads.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Lead Magnet Generator"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Launch Countdown", href: "/resources/launch-countdown" },
          { title: "Lead Scoring Calculator", href: "/resources/lead-scoring-calculator" },
          { title: "Keyword Density Checker", href: "/resources/keyword-density-checker" },
          { title: "Kpi Builder", href: "/resources/kpi-builder" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
