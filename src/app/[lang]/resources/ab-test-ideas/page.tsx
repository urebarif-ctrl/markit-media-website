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

type PageType =
  | "landing-page"
  | "product-page"
  | "checkout"
  | "homepage"
  | "pricing-page"
  | "blog"
  | "email";

type ConversionGoal =
  | "signups"
  | "purchases"
  | "engagement"
  | "clicks"
  | "downloads";

interface TestIdea {
  name: string;
  hypothesis: string;
  control: string;
  variant: string;
  expectedImpact: "High" | "Medium" | "Low";
  difficulty: "Easy" | "Medium" | "Hard";
  impact: number;
  confidence: number;
  ease: number;
  metrics: string[];
}

/* ------------------------------------------------------------------ */
/*  Options                                                            */
/* ------------------------------------------------------------------ */

const pageTypes: { value: PageType; label: string }[] = [
  { value: "landing-page", label: "Landing Page" },
  { value: "product-page", label: "Product Page" },
  { value: "checkout", label: "Checkout" },
  { value: "homepage", label: "Homepage" },
  { value: "pricing-page", label: "Pricing Page" },
  { value: "blog", label: "Blog" },
  { value: "email", label: "Email" },
];

const conversionGoals: { value: ConversionGoal; label: string }[] = [
  { value: "signups", label: "Signups" },
  { value: "purchases", label: "Purchases" },
  { value: "engagement", label: "Engagement" },
  { value: "clicks", label: "Clicks" },
  { value: "downloads", label: "Downloads" },
];

/* ------------------------------------------------------------------ */
/*  Sample size helper                                                 */
/* ------------------------------------------------------------------ */

function estimateSampleSize(
  baselineRate: number,
  expectedLiftPct: number
): number {
  const zAlpha = 1.96; // 95% confidence
  const zBeta = 0.84; // 80% power
  const p1 = baselineRate;
  const lift = expectedLiftPct / 100;
  const p2 = p1 * (1 + lift);
  const delta = p2 - p1;
  if (delta === 0 || p1 <= 0 || p1 >= 1) return 0;
  const numerator =
    Math.pow(zAlpha + zBeta, 2) * (p1 * (1 - p1) + p2 * (1 - p2));
  const denominator = Math.pow(delta, 2);
  return Math.ceil(numerator / denominator) * 2; // total for both variations
}

/* ------------------------------------------------------------------ */
/*  ICE score compute                                                  */
/* ------------------------------------------------------------------ */

function iceScore(impact: number, confidence: number, ease: number): number {
  return Math.round(((impact + confidence + ease) / 3) * 10) / 10;
}

/* ------------------------------------------------------------------ */
/*  Test ideas database                                                */
/* ------------------------------------------------------------------ */

const testIdeasDB: Record<PageType, Record<ConversionGoal, TestIdea[]>> = {
  "landing-page": {
    signups: [
      { name: "Headline clarity rewrite", hypothesis: "A headline that directly states the value proposition will increase signup rate because visitors understand the offer faster", control: "Current headline with branding focus", variant: "Benefit-driven headline stating the core outcome", expectedImpact: "High", difficulty: "Easy", impact: 8, confidence: 8, ease: 9, metrics: ["Signup rate", "Bounce rate", "Time on page"] },
      { name: "Single-field signup form", hypothesis: "Reducing the signup form to email-only will lower friction and increase completions", control: "Multi-field form (name, email, company)", variant: "Single email field with progressive profiling after signup", expectedImpact: "High", difficulty: "Easy", impact: 9, confidence: 9, ease: 8, metrics: ["Form completion rate", "Signup rate", "Lead quality score"] },
      { name: "Above-fold CTA placement", hypothesis: "Moving the primary CTA button above the fold will increase visibility and signups", control: "CTA button below introductory paragraph", variant: "CTA button immediately visible without scrolling", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 8, ease: 9, metrics: ["CTA click rate", "Signup rate", "Scroll depth"] },
      { name: "Social proof positioning", hypothesis: "Placing client logos or user count near the CTA will increase trust and conversions", control: "Social proof in a separate section lower on the page", variant: "Client logos or user count directly adjacent to the signup CTA", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 7, ease: 9, metrics: ["Signup rate", "CTA click rate", "Time to convert"] },
      { name: "CTA button copy", hypothesis: "Action-specific button text will outperform generic text because it sets clear expectations", control: "Button text: Submit or Sign Up", variant: "Button text: Get Started Free or Start My Trial", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 8, ease: 10, metrics: ["CTA click rate", "Signup rate"] },
      { name: "Hero image vs. no image", hypothesis: "Removing a decorative hero image and replacing with a benefit list will focus attention on the value proposition", control: "Large hero image or illustration", variant: "Benefit-focused bullet list with clear CTA", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 6, ease: 7, metrics: ["Signup rate", "Bounce rate", "Page load time"] },
      { name: "Trust badge placement", hypothesis: "Adding security and privacy badges near the form will reduce signup hesitation", control: "No trust indicators near the form", variant: "Security badge and privacy statement directly below the form", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 9, metrics: ["Signup rate", "Form abandonment rate"] },
      { name: "Page length reduction", hypothesis: "A shorter landing page with less content will reduce cognitive load and increase signups", control: "Long-form page with multiple sections", variant: "Concise page with headline, three benefits, and CTA", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 6, ease: 7, metrics: ["Signup rate", "Bounce rate", "Scroll depth", "Time on page"] },
      { name: "Directional cue toward CTA", hypothesis: "A visual cue pointing toward the CTA button will draw attention and increase clicks", control: "No directional indicators", variant: "Arrow or visual element guiding the eye toward the CTA", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 6, ease: 9, metrics: ["CTA click rate", "Signup rate"] },
      { name: "Exit-intent signup prompt", hypothesis: "Showing a signup prompt when the visitor is about to leave will capture otherwise-lost signups", control: "No exit-intent mechanism", variant: "Lightweight overlay with signup offer on exit intent", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 7, ease: 6, metrics: ["Exit-intent conversion rate", "Overall signup rate", "Bounce rate"] },
    ],
    purchases: [
      { name: "Urgency messaging", hypothesis: "Adding time-limited language near the CTA will create urgency and increase purchase rate", control: "No urgency indicators on the page", variant: "Limited-time offer banner or countdown language near CTA", expectedImpact: "High", difficulty: "Easy", impact: 8, confidence: 7, ease: 9, metrics: ["Purchase rate", "CTA click rate", "Revenue per visitor"] },
      { name: "Price anchoring", hypothesis: "Showing the full price crossed out next to the current price will increase perceived value", control: "Current price displayed alone", variant: "Original price struck through with current price highlighted", expectedImpact: "High", difficulty: "Easy", impact: 8, confidence: 8, ease: 9, metrics: ["Purchase rate", "Average order value", "Revenue per visitor"] },
      { name: "Guarantee badge", hypothesis: "A money-back guarantee badge near the purchase button will reduce purchase anxiety", control: "No guarantee mentioned near the CTA", variant: "Money-back guarantee badge directly next to the buy button", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 8, ease: 9, metrics: ["Purchase rate", "Refund rate", "CTA click rate"] },
      { name: "Benefit-focused subheadline", hypothesis: "A subheadline emphasizing the key benefit will reinforce the purchase decision", control: "No subheadline or feature-focused subheadline", variant: "Outcome-focused subheadline directly below the main headline", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 7, ease: 9, metrics: ["Purchase rate", "Bounce rate", "Time on page"] },
      { name: "Video vs. static content", hypothesis: "A short product demo video will increase engagement and purchases more than static images", control: "Static product images and text descriptions", variant: "60-90 second product demo video above the fold", expectedImpact: "High", difficulty: "Hard", impact: 8, confidence: 6, ease: 4, metrics: ["Purchase rate", "Video play rate", "Time on page", "Bounce rate"] },
      { name: "Payment method icons", hypothesis: "Displaying accepted payment method icons will increase buyer confidence", control: "No visible payment method indicators", variant: "Payment method icons (Visa, MC, PayPal, etc.) near the CTA", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 7, ease: 10, metrics: ["Purchase rate", "Cart initiation rate"] },
      { name: "Single CTA vs. multiple CTAs", hypothesis: "Reducing to one clear CTA will focus attention and increase conversions", control: "Multiple CTA buttons with different actions", variant: "Single primary CTA with clear action", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 7, ease: 8, metrics: ["CTA click rate", "Purchase rate", "Bounce rate"] },
      { name: "Testimonial placement near CTA", hypothesis: "A short testimonial quote placed near the buy button will provide last-moment reassurance", control: "Testimonials in a separate section", variant: "One strong testimonial quote directly above the purchase CTA", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 9, metrics: ["Purchase rate", "CTA click rate"] },
      { name: "Free shipping threshold callout", hypothesis: "Highlighting a free shipping threshold will increase average order value and purchase rate", control: "No shipping information on the landing page", variant: "Prominent free shipping threshold callout near the CTA", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 7, ease: 8, metrics: ["Purchase rate", "Average order value", "Revenue per visitor"] },
      { name: "Simplified page navigation", hypothesis: "Removing top navigation on the landing page will reduce exit paths and keep focus on purchase", control: "Full site navigation header", variant: "Minimal header with no navigation links", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 6, ease: 7, metrics: ["Purchase rate", "Bounce rate", "Exit rate"] },
    ],
    engagement: [
      { name: "Interactive content block", hypothesis: "Adding an interactive element (quiz, calculator) will increase time on page and engagement", control: "Static text and images only", variant: "Embedded interactive element relevant to the page topic", expectedImpact: "High", difficulty: "Hard", impact: 8, confidence: 7, ease: 4, metrics: ["Time on page", "Interaction rate", "Scroll depth", "Return visits"] },
      { name: "Content layout restructure", hypothesis: "Breaking content into scannable sections with clear headings will improve engagement metrics", control: "Long paragraphs with minimal visual hierarchy", variant: "Short sections with bold headings, bullet points, and whitespace", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 8, ease: 8, metrics: ["Scroll depth", "Time on page", "Bounce rate"] },
      { name: "Inline related content links", hypothesis: "Contextual links to related content within the body text will increase pages per session", control: "Related content links only at the bottom of the page", variant: "Relevant internal links embedded naturally within body paragraphs", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 9, metrics: ["Pages per session", "Time on site", "Bounce rate"] },
      { name: "Sticky progress bar", hypothesis: "A reading progress bar will encourage visitors to read more of the page content", control: "No progress indicator", variant: "Subtle sticky progress bar at the top showing scroll progress", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 6, ease: 9, metrics: ["Scroll depth", "Time on page", "Completion rate"] },
      { name: "Content expand/collapse", hypothesis: "Collapsible FAQ or detail sections will let visitors engage with content that interests them", control: "All content displayed in full", variant: "Expandable sections that visitors can open on demand", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 7, ease: 7, metrics: ["Interaction rate", "Scroll depth", "Time on page"] },
      { name: "Anchor navigation menu", hypothesis: "An in-page navigation menu will help visitors find relevant sections and increase engagement", control: "No in-page navigation aids", variant: "Sticky sidebar or top anchored links to page sections", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 7, ease: 7, metrics: ["Scroll depth", "Time on page", "Section view rate"] },
      { name: "Visual content integration", hypothesis: "Adding relevant charts or diagrams will increase comprehension and time on page", control: "Text-only content sections", variant: "Key data points presented as simple visual charts or diagrams", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 7, ease: 6, metrics: ["Time on page", "Scroll depth", "Engagement rate"] },
      { name: "Share buttons placement", hypothesis: "Prominent share buttons will increase social shares and referral traffic", control: "No share buttons or share buttons at the bottom only", variant: "Floating share buttons visible throughout the page", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 6, ease: 8, metrics: ["Share rate", "Referral traffic", "Pages per session"] },
      { name: "Personalized content blocks", hypothesis: "Showing content relevant to the referral source will increase engagement", control: "Same content for all traffic sources", variant: "Dynamic headline or section tailored to traffic source (search, social, email)", expectedImpact: "High", difficulty: "Hard", impact: 8, confidence: 6, ease: 4, metrics: ["Time on page", "Bounce rate", "Conversion rate by source"] },
      { name: "Micro-animations on scroll", hypothesis: "Subtle animations triggered on scroll will increase visual interest and scroll depth", control: "Static page with no animation", variant: "Gentle fade-in animations as sections enter the viewport", expectedImpact: "Low", difficulty: "Medium", impact: 5, confidence: 6, ease: 7, metrics: ["Scroll depth", "Time on page", "Bounce rate"] },
    ],
    clicks: [
      { name: "CTA color contrast", hypothesis: "A high-contrast CTA button will draw more attention and increase click rate", control: "CTA button with moderate contrast against background", variant: "CTA button with maximum contrast (e.g., black button on white background)", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 8, ease: 10, metrics: ["CTA click rate", "Conversion rate"] },
      { name: "CTA size increase", hypothesis: "A larger CTA button will be easier to notice and tap, increasing click rate", control: "Standard-sized CTA button", variant: "Larger CTA button with more padding and bigger text", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 8, ease: 10, metrics: ["CTA click rate", "Mobile tap rate"] },
      { name: "Button text specificity", hypothesis: "Specific action text will outperform vague text because it communicates the next step", control: "Generic button text (Learn More, Click Here)", variant: "Specific button text (See Pricing, Read the Case Study)", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 8, ease: 10, metrics: ["CTA click rate", "Downstream conversion"] },
      { name: "Reduce competing links", hypothesis: "Fewer links on the page will channel more clicks toward the primary CTA", control: "Multiple navigation links and secondary CTAs", variant: "Reduced navigation with one clear primary CTA", expectedImpact: "High", difficulty: "Medium", impact: 8, confidence: 7, ease: 7, metrics: ["Primary CTA click rate", "Exit rate", "Bounce rate"] },
      { name: "CTA button repetition", hypothesis: "Placing the CTA button at multiple points on the page will catch visitors at different scroll depths", control: "Single CTA placement", variant: "CTA button repeated after key content sections", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 7, ease: 8, metrics: ["Overall CTA click rate", "Click rate by page section"] },
      { name: "Whitespace around CTA", hypothesis: "More whitespace around the CTA will make it stand out and increase clicks", control: "CTA surrounded by dense content", variant: "CTA with generous whitespace separating it from surrounding content", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 9, metrics: ["CTA click rate", "Visual attention (heatmap)"] },
      { name: "Sticky CTA bar", hypothesis: "A sticky bar with the CTA always visible will increase click rate regardless of scroll position", control: "Fixed CTA in the page body", variant: "Sticky bottom bar with CTA button that follows the user", expectedImpact: "High", difficulty: "Medium", impact: 8, confidence: 7, ease: 6, metrics: ["CTA click rate", "Conversion rate", "Mobile usability"] },
      { name: "Arrow or icon in CTA", hypothesis: "Adding a directional icon to the CTA button will create visual momentum and increase clicks", control: "Text-only CTA button", variant: "CTA button with a right-arrow icon after the text", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 7, ease: 10, metrics: ["CTA click rate"] },
      { name: "Above-fold content density", hypothesis: "Less content above the fold will make the CTA more prominent and increase clicks", control: "Dense above-fold layout with multiple elements", variant: "Clean above-fold with headline, one sentence, and CTA only", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 7, ease: 7, metrics: ["CTA click rate", "Bounce rate", "Scroll initiation rate"] },
      { name: "Hover state enhancement", hypothesis: "A more pronounced hover effect on the CTA will signal interactivity and encourage clicks", control: "Subtle or no hover state change", variant: "Clear hover animation (color shift, slight scale, shadow)", expectedImpact: "Low", difficulty: "Easy", impact: 4, confidence: 6, ease: 10, metrics: ["CTA click rate", "Desktop engagement rate"] },
    ],
    downloads: [
      { name: "Content preview before download", hypothesis: "Showing a preview of the downloadable content will increase download conversions", control: "Download CTA with title and description only", variant: "Partial content preview (first page, key stats) visible before download", expectedImpact: "High", difficulty: "Medium", impact: 8, confidence: 8, ease: 7, metrics: ["Download rate", "Form completion rate"] },
      { name: "Reduced form fields", hypothesis: "Fewer fields in the download form will reduce friction and increase completions", control: "Form with 4+ fields (name, email, company, phone)", variant: "Form with 1-2 fields (email only, or email + first name)", expectedImpact: "High", difficulty: "Easy", impact: 9, confidence: 9, ease: 9, metrics: ["Form completion rate", "Download rate", "Lead quality"] },
      { name: "Download button copy", hypothesis: "Specific download button text mentioning the asset type will set expectations and increase clicks", control: "Generic download button text (Download Now, Submit)", variant: "Asset-specific button text (Get the Free Guide, Download the Template)", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 8, ease: 10, metrics: ["Download rate", "CTA click rate"] },
      { name: "Social proof near download form", hypothesis: "Showing the number of downloads near the form will create bandwagon effect", control: "No social proof near the download form", variant: "Download count or user quotes near the form", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Download rate", "Form completion rate"] },
      { name: "Inline download vs. landing page", hypothesis: "An inline download form on the current page will convert better than linking to a separate landing page", control: "Link to a separate download landing page", variant: "Inline expandable form on the same page", expectedImpact: "High", difficulty: "Medium", impact: 8, confidence: 7, ease: 6, metrics: ["Download rate", "Drop-off rate", "Page exit rate"] },
      { name: "File format options", hypothesis: "Offering multiple file format choices will appeal to more visitors and increase downloads", control: "Single format download option", variant: "Format selector (PDF, spreadsheet, slides) before download", expectedImpact: "Low", difficulty: "Medium", impact: 5, confidence: 6, ease: 7, metrics: ["Download rate", "Format preference distribution"] },
      { name: "Immediate access vs. email delivery", hypothesis: "Providing an immediate download link will increase completions compared to email delivery", control: "Resource delivered via email after form submission", variant: "Instant download link shown immediately after form submission", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 7, ease: 6, metrics: ["Download completion rate", "Email open rate", "Lead quality"] },
      { name: "Download CTA placement", hypothesis: "Placing the download CTA after presenting the key benefit will increase motivation to download", control: "Download CTA at the top of the page before any context", variant: "Download CTA placed after a brief benefit summary", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 9, metrics: ["Download rate", "Scroll depth to CTA"] },
      { name: "Privacy assurance near form", hypothesis: "A privacy note near the form will reduce hesitation about sharing email", control: "No privacy messaging near the form", variant: "Short privacy statement (We will not share your email) below the form", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 9, metrics: ["Form completion rate", "Download rate"] },
      { name: "Gated vs. ungated split", hypothesis: "Ungating part of the content and gating the full version will build trust and increase downloads", control: "Fully gated content behind a form", variant: "Executive summary visible freely with full download behind form", expectedImpact: "High", difficulty: "Medium", impact: 8, confidence: 7, ease: 6, metrics: ["Download rate", "Content engagement", "Lead quality"] },
    ],
  },
  "product-page": {
    signups: [
      { name: "Free trial CTA prominence", hypothesis: "Making the free trial CTA the most visually prominent element will increase trial signups", control: "Trial CTA competes with other page elements", variant: "Oversized trial CTA with contrast color and supporting copy", expectedImpact: "High", difficulty: "Easy", impact: 8, confidence: 8, ease: 9, metrics: ["Trial signup rate", "CTA click rate"] },
      { name: "Feature vs. benefit framing", hypothesis: "Reframing features as user benefits will resonate more and increase signups", control: "Feature list with technical descriptions", variant: "Benefit-driven descriptions showing the user outcome for each feature", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 8, ease: 8, metrics: ["Signup rate", "Time on page", "Scroll depth"] },
      { name: "Comparison table addition", hypothesis: "A comparison table against alternatives will help decision-making and increase conversions", control: "No direct comparison with competitors or alternatives", variant: "Simple comparison table showing key differentiators", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 7, ease: 6, metrics: ["Signup rate", "Time on page", "Bounce rate"] },
      { name: "Demo video placement", hypothesis: "A product demo video near the top of the page will increase understanding and signups", control: "No video or video buried below the fold", variant: "Short demo video prominently placed in the hero section", expectedImpact: "High", difficulty: "Medium", impact: 8, confidence: 7, ease: 6, metrics: ["Signup rate", "Video play rate", "Time on page"] },
      { name: "Sticky signup bar", hypothesis: "A persistent signup bar will keep the CTA accessible as users scroll through features", control: "Signup CTA only at top and bottom of page", variant: "Sticky top or bottom bar with signup CTA visible at all times", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 7, ease: 7, metrics: ["Signup rate", "CTA visibility", "CTA click rate"] },
      { name: "Use case segmentation", hypothesis: "Letting users select their use case to see relevant features will increase signup intent", control: "One-size-fits-all feature presentation", variant: "Use case tabs or selector that filters features by relevance", expectedImpact: "Medium", difficulty: "Hard", impact: 7, confidence: 6, ease: 4, metrics: ["Signup rate", "Interaction rate", "Time on page"] },
      { name: "Reduce page length", hypothesis: "A more focused product page will reduce overwhelm and increase signup rate", control: "Comprehensive page with every feature detailed", variant: "Focused page with top 5 features and clear signup CTA", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 7, ease: 7, metrics: ["Signup rate", "Bounce rate", "Scroll completion rate"] },
      { name: "Trust indicators addition", hypothesis: "Adding trust signals near signup will reduce hesitation for new visitors", control: "No trust indicators on the product page", variant: "Security badges, uptime stats, or integration logos near the CTA", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Signup rate", "CTA click rate"] },
      { name: "Pricing transparency", hypothesis: "Showing pricing early on the product page will filter in qualified leads and increase signup quality", control: "No pricing information, requires contact to learn pricing", variant: "Starting price or price range displayed on the product page", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 6, ease: 9, metrics: ["Signup rate", "Lead quality", "Sales cycle length"] },
      { name: "Onboarding preview", hypothesis: "Showing what happens after signup (onboarding steps) will reduce uncertainty and increase conversions", control: "No information about what happens after signup", variant: "Short 3-step onboarding preview near the CTA", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Signup rate", "Onboarding completion rate"] },
    ],
    purchases: [
      { name: "Product image gallery improvement", hypothesis: "More and higher-quality product images will increase purchase confidence", control: "1-2 product images", variant: "5+ images showing different angles, contexts, and details", expectedImpact: "High", difficulty: "Medium", impact: 8, confidence: 8, ease: 6, metrics: ["Purchase rate", "Add-to-cart rate", "Image engagement"] },
      { name: "Size/spec selector clarity", hypothesis: "Clearer size or specification selectors will reduce confusion and increase purchases", control: "Small dropdown or unclear option labels", variant: "Visual selector with clear labels and availability indicators", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 8, ease: 7, metrics: ["Purchase rate", "Return rate", "Support tickets"] },
      { name: "Shipping information visibility", hypothesis: "Showing shipping cost and timeline upfront will reduce checkout abandonment", control: "Shipping info only revealed at checkout", variant: "Estimated shipping cost and delivery time on the product page", expectedImpact: "High", difficulty: "Easy", impact: 8, confidence: 8, ease: 8, metrics: ["Purchase rate", "Cart abandonment rate", "Checkout completion"] },
      { name: "Review summary placement", hypothesis: "A review summary at the top of the page will build immediate trust", control: "Reviews only in a section at the bottom of the page", variant: "Star rating and review count prominently near the product title", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 8, ease: 9, metrics: ["Purchase rate", "Review section engagement", "Time to purchase"] },
      { name: "Buy button duplication", hypothesis: "An additional buy button after the product description will catch users ready to purchase after reading", control: "Single buy button above the product description", variant: "Buy button both above and below the description section", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 9, metrics: ["Purchase rate", "Add-to-cart rate"] },
      { name: "Cross-sell recommendations", hypothesis: "Showing complementary products will increase average order value", control: "No product recommendations on the page", variant: "Frequently bought together section below the product details", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 7, ease: 6, metrics: ["Average order value", "Items per order", "Revenue per visitor"] },
      { name: "Stock availability indicator", hypothesis: "Showing limited stock availability will create urgency and increase purchases", control: "No stock level information", variant: "Stock level indicator showing limited availability", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Purchase rate", "Time to purchase", "Add-to-cart rate"] },
      { name: "Return policy prominence", hypothesis: "Making the return policy clearly visible will reduce purchase anxiety", control: "Return policy linked in the footer", variant: "Return policy summary displayed on the product page near buy button", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 9, metrics: ["Purchase rate", "Return rate", "CTA click rate"] },
      { name: "Product description format", hypothesis: "Scannable bullet-point descriptions will communicate value faster than paragraphs", control: "Paragraph-format product description", variant: "Bullet-point format with bold benefit labels", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 9, metrics: ["Purchase rate", "Time on page", "Scroll depth"] },
      { name: "Price display format", hypothesis: "Monthly price breakdown will make higher-priced items seem more accessible", control: "Full price displayed as a single number", variant: "Price shown as monthly installment (as low as $X/mo)", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 6, ease: 8, metrics: ["Purchase rate", "Revenue per visitor", "Cart initiation rate"] },
    ],
    engagement: [
      { name: "Tabbed content sections", hypothesis: "Organizing product info into tabs will reduce page length and let users find what matters to them", control: "All information displayed in a single long page", variant: "Tabbed sections (Overview, Specs, Reviews, FAQ)", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 7, ease: 7, metrics: ["Tab interaction rate", "Time on page", "Bounce rate"] },
      { name: "Image zoom functionality", hypothesis: "Enabling image zoom on product photos will increase engagement and time on page", control: "Static product images without zoom", variant: "Hover-to-zoom or click-to-expand image functionality", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 7, ease: 7, metrics: ["Image interaction rate", "Time on page", "Purchase rate"] },
      { name: "Q&A section addition", hypothesis: "A visible Q&A section will answer pre-purchase questions and increase engagement", control: "No Q&A section on the product page", variant: "FAQ or Q&A section with common questions and answers", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 7, ease: 6, metrics: ["Q&A interaction rate", "Time on page", "Support ticket volume"] },
      { name: "Video content integration", hypothesis: "Product videos will increase engagement and help visitors understand the product", control: "Images and text only", variant: "Short product video (how it works, unboxing, or use case)", expectedImpact: "High", difficulty: "Hard", impact: 8, confidence: 7, ease: 4, metrics: ["Video play rate", "Time on page", "Purchase rate"] },
      { name: "Related products carousel", hypothesis: "A related products section will increase browsing and pages per session", control: "No related products shown", variant: "Horizontally scrollable related products section", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 7, ease: 6, metrics: ["Pages per session", "Click-through to other products", "Time on site"] },
      { name: "Product comparison feature", hypothesis: "Allowing visitors to compare products side-by-side will increase engagement and decision confidence", control: "No comparison functionality", variant: "Compare button that lets visitors add products to a comparison view", expectedImpact: "Medium", difficulty: "Hard", impact: 7, confidence: 6, ease: 4, metrics: ["Comparison usage rate", "Time on site", "Purchase rate"] },
      { name: "Progressive disclosure of details", hypothesis: "Showing essential info first with expandable details will reduce overwhelm", control: "All product details visible at once", variant: "Key info visible with expandable sections for specs, materials, care", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Expand interaction rate", "Scroll depth", "Time on page"] },
      { name: "User-generated photo gallery", hypothesis: "Showing customer photos alongside product images will increase authenticity and engagement", control: "Only professional product photos", variant: "Customer photo section integrated into the image gallery", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 6, ease: 5, metrics: ["Image gallery interaction", "Time on page", "Purchase rate"] },
      { name: "Feature highlight animations", hypothesis: "Subtle animations highlighting key features on scroll will increase attention to product benefits", control: "Static feature descriptions", variant: "Gentle animations that highlight each feature as user scrolls to it", expectedImpact: "Low", difficulty: "Medium", impact: 5, confidence: 6, ease: 7, metrics: ["Scroll depth", "Time on page", "Feature section visibility"] },
      { name: "Breadcrumb and category navigation", hypothesis: "Clear breadcrumbs and category links will encourage browsing and increase pages per session", control: "Minimal or no breadcrumb navigation", variant: "Full breadcrumb trail with clickable category links", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 7, ease: 9, metrics: ["Pages per session", "Category page visits", "Time on site"] },
    ],
    clicks: [
      { name: "CTA button visual weight", hypothesis: "A visually heavier CTA button (larger, bolder) will attract more clicks on the product page", control: "Standard CTA button matching page design", variant: "Oversized, high-contrast CTA with bold text", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 8, ease: 9, metrics: ["CTA click rate", "Add-to-cart rate"] },
      { name: "Add to cart vs. buy now", hypothesis: "A direct Buy Now button will increase click rate for impulse-purchase products", control: "Add to Cart button only", variant: "Both Add to Cart and Buy Now buttons", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 7, ease: 8, metrics: ["CTA click rate", "Purchase rate", "Cart page visits"] },
      { name: "Product benefit callouts", hypothesis: "Visual benefit callouts above the CTA will motivate more clicks", control: "CTA button with no supporting benefit text", variant: "2-3 key benefit icons or text lines directly above the CTA", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["CTA click rate", "Purchase rate"] },
      { name: "Variant selector simplification", hypothesis: "Simplifying variant selection will reduce friction before the CTA click", control: "Complex dropdown menus for variants", variant: "Visual swatches or buttons for variant selection", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 7, ease: 6, metrics: ["CTA click rate", "Variant selection rate", "Purchase rate"] },
      { name: "Mobile CTA positioning", hypothesis: "A thumb-friendly CTA position on mobile will increase mobile click rate", control: "CTA placed in standard position (may require scrolling on mobile)", variant: "Sticky bottom CTA bar on mobile devices only", expectedImpact: "High", difficulty: "Medium", impact: 8, confidence: 7, ease: 6, metrics: ["Mobile CTA click rate", "Mobile purchase rate"] },
      { name: "Micro-copy below CTA", hypothesis: "Adding reassuring micro-copy below the CTA will reduce hesitation", control: "CTA button with no supporting text below", variant: "Micro-copy below CTA (Free shipping, No commitment, Cancel anytime)", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 9, metrics: ["CTA click rate", "Purchase rate"] },
      { name: "Image click-through to gallery", hypothesis: "Making images clickable to a full gallery will increase engagement clicks", control: "Non-interactive product images", variant: "Clickable images that open a full-screen gallery view", expectedImpact: "Low", difficulty: "Medium", impact: 5, confidence: 7, ease: 7, metrics: ["Image click rate", "Gallery view rate", "Time on page"] },
      { name: "Category filter refinement", hypothesis: "Better category filters will help users find products faster and click more", control: "Basic category filters", variant: "Enhanced filters with visual indicators and result counts", expectedImpact: "Medium", difficulty: "Hard", impact: 7, confidence: 6, ease: 4, metrics: ["Filter usage rate", "Product click rate", "Pages per session"] },
      { name: "Quick view functionality", hypothesis: "A quick view option will let users evaluate products without leaving the listing page", control: "Must click into full product page to see details", variant: "Quick view modal with key info and add-to-cart", expectedImpact: "Medium", difficulty: "Hard", impact: 7, confidence: 6, ease: 4, metrics: ["Quick view usage", "Add-to-cart rate", "Pages per session"] },
      { name: "Recently viewed products", hypothesis: "A recently viewed section will re-engage visitors with products they showed interest in", control: "No recently viewed section", variant: "Recently viewed products bar at the bottom of product pages", expectedImpact: "Low", difficulty: "Medium", impact: 5, confidence: 7, ease: 6, metrics: ["Click rate on recently viewed", "Return visit rate", "Purchase rate"] },
    ],
    downloads: [
      { name: "Spec sheet download CTA", hypothesis: "A prominent spec sheet download button will increase downloads for technical buyers", control: "Spec information only in page text", variant: "Downloadable spec sheet PDF with clear CTA button", expectedImpact: "High", difficulty: "Medium", impact: 8, confidence: 8, ease: 7, metrics: ["Download rate", "Lead capture rate"] },
      { name: "Product guide offer", hypothesis: "Offering a buying guide download will capture leads while providing value", control: "No downloadable resource on the product page", variant: "Buying guide download with email capture form", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 7, ease: 6, metrics: ["Download rate", "Lead capture rate", "Email engagement"] },
      { name: "Download placement test", hypothesis: "Placing the download CTA after key product benefits will increase download motivation", control: "Download CTA in sidebar or bottom of page", variant: "Download CTA placed between benefit sections where interest peaks", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Download rate", "CTA click rate"] },
      { name: "Comparison chart download", hypothesis: "A downloadable comparison chart will appeal to buyers in the evaluation stage", control: "No downloadable comparison content", variant: "Download button for product comparison PDF or spreadsheet", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 6, ease: 6, metrics: ["Download rate", "Lead quality", "Sales pipeline progression"] },
      { name: "Case study link", hypothesis: "Offering a case study download on the product page will increase downloads and build trust", control: "Case studies only on a separate page", variant: "Relevant case study download CTA on the product page", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Download rate", "Time on site", "Lead quality"] },
      { name: "Gated video vs. gated PDF", hypothesis: "Testing whether visitors prefer video or PDF content will optimize download conversions", control: "PDF download as the default content format", variant: "Video recording option alongside or instead of PDF", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 5, ease: 5, metrics: ["Download rate by format", "Engagement rate", "Lead quality"] },
      { name: "Exit intent download offer", hypothesis: "An exit-intent download offer will capture leads from visitors about to leave", control: "No exit-intent mechanism on the product page", variant: "Exit-intent popup offering a relevant downloadable resource", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 6, ease: 6, metrics: ["Exit-intent trigger rate", "Download rate", "Lead capture rate"] },
      { name: "Content teaser expansion", hypothesis: "Showing a preview of the downloadable content will increase download intent", control: "Title and description only for the download", variant: "Embedded preview showing the first section or key statistics", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 7, ease: 6, metrics: ["Download rate", "Preview engagement rate"] },
      { name: "One-click download for returning visitors", hypothesis: "Removing the form for recognized returning visitors will increase repeat downloads", control: "Full form required for every download", variant: "One-click download for visitors who previously submitted the form", expectedImpact: "Medium", difficulty: "Hard", impact: 7, confidence: 7, ease: 4, metrics: ["Returning visitor download rate", "Repeat engagement"] },
      { name: "Resource bundle offer", hypothesis: "Offering a bundle of related resources will increase perceived value and downloads", control: "Single resource download", variant: "Resource bundle (guide + template + checklist) as one download", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 6, ease: 6, metrics: ["Download rate", "Perceived value rating", "Lead quality"] },
    ],
  },
  checkout: {
    signups: [
      { name: "Guest checkout to account upsell", hypothesis: "Offering account creation after purchase (not before) will increase both purchases and signups", control: "Account creation required before checkout", variant: "Guest checkout with post-purchase account creation prompt", expectedImpact: "High", difficulty: "Medium", impact: 9, confidence: 8, ease: 6, metrics: ["Checkout completion rate", "Account creation rate", "Cart abandonment rate"] },
      { name: "Signup value proposition", hypothesis: "Explaining the benefits of creating an account will increase signup rate during checkout", control: "Simple create account checkbox with no explanation", variant: "Benefit list (order tracking, faster checkout, exclusive offers) next to signup option", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 7, ease: 9, metrics: ["Account creation rate", "Checkout completion rate"] },
      { name: "Social login option", hypothesis: "Adding social login will reduce signup friction during checkout", control: "Email and password only for account creation", variant: "Social login buttons (Google, Apple) as account creation options", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 7, ease: 6, metrics: ["Account creation rate", "Checkout completion rate", "Login method distribution"] },
      { name: "Progressive account creation", hypothesis: "Creating the account automatically from checkout info (with opt-in) will increase signups", control: "Separate account creation form after checkout", variant: "Auto-create account with opt-in checkbox using checkout email and name", expectedImpact: "High", difficulty: "Medium", impact: 8, confidence: 7, ease: 6, metrics: ["Account creation rate", "Checkout completion rate", "Repeat purchase rate"] },
      { name: "Loyalty program opt-in", hypothesis: "A loyalty program opt-in during checkout will motivate account creation", control: "No loyalty program mention during checkout", variant: "Loyalty program benefits highlighted with one-click opt-in at checkout", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 6, ease: 6, metrics: ["Loyalty signup rate", "Account creation rate", "Repeat purchase rate"] },
      { name: "Password field removal", hypothesis: "Removing the password field during signup (use magic link instead) will reduce friction", control: "Password creation required during checkout signup", variant: "Email-only signup with magic link for future logins", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 7, ease: 6, metrics: ["Account creation rate", "Checkout completion rate", "Login success rate"] },
      { name: "Wishlist prompt for guest users", hypothesis: "Prompting guest users to save their wishlist by creating an account will increase signups", control: "No wishlist functionality for guest users", variant: "Wishlist feature with account creation prompt to save items", expectedImpact: "Low", difficulty: "Hard", impact: 5, confidence: 5, ease: 4, metrics: ["Account creation rate", "Wishlist save rate", "Return visit rate"] },
      { name: "Checkout step indicator", hypothesis: "Showing checkout progress will reduce uncertainty and improve both completion and signup rates", control: "No visible progress indicator during checkout", variant: "Clear step indicator showing current position and remaining steps", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Checkout completion rate", "Account creation rate", "Step drop-off rate"] },
      { name: "Email validation feedback", hypothesis: "Real-time email validation will reduce errors and increase successful signups during checkout", control: "Email validated only on form submission", variant: "Real-time email format validation with helpful error messages", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 8, ease: 8, metrics: ["Form error rate", "Account creation rate", "Checkout completion rate"] },
      { name: "Inline vs. modal signup", hypothesis: "Inline signup within the checkout flow will feel less disruptive than a modal popup", control: "Modal popup for account creation during checkout", variant: "Inline signup section embedded in the checkout form", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 7, ease: 6, metrics: ["Account creation rate", "Checkout completion rate", "Drop-off rate"] },
    ],
    purchases: [
      { name: "Single-page checkout", hypothesis: "Consolidating checkout steps into one page will reduce abandonment and increase purchases", control: "Multi-step checkout process (3+ pages)", variant: "Single-page checkout with all fields visible", expectedImpact: "High", difficulty: "Hard", impact: 9, confidence: 8, ease: 4, metrics: ["Checkout completion rate", "Cart abandonment rate", "Time to purchase"] },
      { name: "Express checkout option", hypothesis: "One-click express checkout for returning customers will increase purchase completion", control: "Full checkout form required every time", variant: "Express checkout with saved payment and shipping info", expectedImpact: "High", difficulty: "Hard", impact: 9, confidence: 8, ease: 4, metrics: ["Checkout completion rate", "Repeat purchase rate", "Time to purchase"] },
      { name: "Trust badges at payment step", hypothesis: "Security badges near the payment form will increase buyer confidence at the critical moment", control: "No trust indicators at the payment step", variant: "SSL badge, payment security icons, and guarantee near payment fields", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 8, ease: 9, metrics: ["Checkout completion rate", "Payment step drop-off rate"] },
      { name: "Order summary visibility", hypothesis: "A persistent order summary will reassure buyers about what they are purchasing", control: "Order summary only on a separate step or collapsed", variant: "Always-visible order summary sidebar with item details and total", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 7, ease: 7, metrics: ["Checkout completion rate", "Cart modification rate"] },
      { name: "Free shipping threshold indicator", hypothesis: "Showing how close the order is to free shipping will increase average order value", control: "No free shipping threshold indicator", variant: "Progress bar showing distance to free shipping threshold", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 7, ease: 8, metrics: ["Average order value", "Add-on item rate", "Checkout completion rate"] },
      { name: "Payment method variety", hypothesis: "Adding more payment methods will reduce payment-related abandonment", control: "Credit card only", variant: "Credit card, PayPal, Apple Pay, Google Pay, and buy-now-pay-later", expectedImpact: "High", difficulty: "Hard", impact: 8, confidence: 7, ease: 3, metrics: ["Checkout completion rate", "Payment method distribution", "Cart abandonment rate"] },
      { name: "Autofill optimization", hypothesis: "Optimizing form fields for browser autofill will speed up checkout and increase completions", control: "Form fields with non-standard naming and autocomplete attributes", variant: "Properly named fields with correct autocomplete attributes", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 8, ease: 9, metrics: ["Checkout completion rate", "Time to complete checkout", "Error rate"] },
      { name: "Coupon field visibility", hypothesis: "Hiding the coupon field by default will reduce visitors leaving to search for codes", control: "Prominent coupon field visible during checkout", variant: "Collapsed coupon field behind a small link (Have a coupon code?)", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 7, ease: 9, metrics: ["Checkout completion rate", "Coupon usage rate", "Exit rate at checkout"] },
      { name: "Error message improvement", hypothesis: "Clear, specific error messages will help users fix issues and complete checkout", control: "Generic error messages (Invalid field, Please try again)", variant: "Specific, actionable error messages with visual indicators on the exact field", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 8, ease: 8, metrics: ["Form error recovery rate", "Checkout completion rate", "Support contact rate"] },
      { name: "Mobile keyboard optimization", hypothesis: "Showing the correct mobile keyboard for each field will speed up mobile checkout", control: "Default text keyboard for all fields", variant: "Numeric keyboard for phone/zip, email keyboard for email, etc.", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 8, ease: 9, metrics: ["Mobile checkout completion rate", "Time to complete on mobile", "Error rate on mobile"] },
    ],
    engagement: [
      { name: "Post-purchase recommendation", hypothesis: "Showing relevant product recommendations after purchase will increase re-engagement", control: "Generic thank-you page with no recommendations", variant: "Personalized product recommendations on the confirmation page", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 7, ease: 6, metrics: ["Post-purchase click rate", "Repeat purchase rate", "Time to second purchase"] },
      { name: "Order tracking integration", hypothesis: "Embedded order tracking will keep customers engaged with your site instead of the carrier site", control: "Link to external carrier tracking page", variant: "In-site order tracking page with status updates", expectedImpact: "Medium", difficulty: "Hard", impact: 6, confidence: 6, ease: 4, metrics: ["Tracking page visits", "Return visit rate", "Customer satisfaction"] },
      { name: "Social sharing prompt", hypothesis: "A social sharing prompt after purchase will increase word-of-mouth engagement", control: "No social sharing option after checkout", variant: "Share your purchase prompt with pre-filled social media posts", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 5, ease: 8, metrics: ["Share rate", "Referral traffic", "Social mentions"] },
      { name: "Review request timing", hypothesis: "Asking for a review on the confirmation page (for repeat customers) will increase review submission", control: "Review request sent only via email days later", variant: "Inline review prompt on confirmation page for returning customers", expectedImpact: "Low", difficulty: "Medium", impact: 5, confidence: 6, ease: 6, metrics: ["Review submission rate", "Review quality", "Response time"] },
      { name: "Confirmation page content", hypothesis: "Adding helpful next-step content to the confirmation page will increase engagement", control: "Minimal confirmation page with order number only", variant: "Confirmation page with how-to guides, setup tips, or community links", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Confirmation page engagement", "Help resource click rate", "Support ticket rate"] },
      { name: "Newsletter opt-in at confirmation", hypothesis: "A newsletter opt-in on the confirmation page will capture engaged buyers", control: "No newsletter opt-in during or after checkout", variant: "Newsletter signup with exclusive customer content offer on confirmation page", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Newsletter signup rate", "Email engagement rate", "Repeat purchase rate"] },
      { name: "Checkout progress celebration", hypothesis: "Micro-interactions celebrating checkout completion will create a positive brand memory", control: "Standard confirmation message", variant: "Subtle animation or celebratory micro-interaction on order completion", expectedImpact: "Low", difficulty: "Easy", impact: 4, confidence: 5, ease: 8, metrics: ["Customer satisfaction", "Brand recall", "Repeat visit rate"] },
      { name: "Account activity dashboard", hypothesis: "Showing new customers their account activity summary will encourage account engagement", control: "Static confirmation with no account overview", variant: "Mini account dashboard showing order history, saved items, and recommendations", expectedImpact: "Medium", difficulty: "Hard", impact: 6, confidence: 5, ease: 4, metrics: ["Account page visits", "Feature adoption rate", "Repeat purchase rate"] },
      { name: "Delivery preference interaction", hypothesis: "Letting customers set delivery preferences will increase engagement and satisfaction", control: "Standard delivery with no customization", variant: "Delivery preference selector (leave at door, specific time, etc.)", expectedImpact: "Low", difficulty: "Medium", impact: 5, confidence: 6, ease: 6, metrics: ["Preference completion rate", "Delivery satisfaction", "Repeat purchase rate"] },
      { name: "Referral program prompt", hypothesis: "Introducing a referral program at checkout will leverage purchase momentum", control: "No referral program mention during checkout", variant: "Referral program offer on the confirmation page with easy sharing", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 6, ease: 5, metrics: ["Referral signup rate", "Referral conversion rate", "Customer acquisition cost"] },
    ],
    clicks: [
      { name: "Continue button styling", hypothesis: "A more prominent continue/next button will reduce confusion about how to proceed", control: "Standard styled button matching the page theme", variant: "High-contrast oversized button with clear action text", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 8, ease: 10, metrics: ["Step completion rate", "Click-through rate between steps"] },
      { name: "Breadcrumb step navigation", hypothesis: "Clickable step breadcrumbs will let users navigate back without losing data", control: "Back button only or no step navigation", variant: "Clickable breadcrumb steps showing checkout progress", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 7, ease: 6, metrics: ["Step navigation usage", "Checkout completion rate", "Form data retention"] },
      { name: "Edit order link placement", hypothesis: "A clearly visible edit link will prevent users from abandoning to make changes", control: "No easy way to edit cart from checkout", variant: "Inline edit links next to each item in the order summary", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 7, ease: 7, metrics: ["Edit click rate", "Cart abandonment rate", "Checkout completion rate"] },
      { name: "Shipping method selector format", hypothesis: "Visual radio buttons with delivery estimates will increase shipping selection click rate", control: "Dropdown menu for shipping method selection", variant: "Visual radio cards showing method, price, and estimated delivery date", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Shipping selection rate", "Checkout completion rate", "Preferred shipping distribution"] },
      { name: "Apply button for coupon codes", hypothesis: "An inline apply button next to the coupon field will increase coupon usage", control: "Coupon applied on form submission with no separate button", variant: "Inline Apply button with immediate feedback on code validity", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 7, ease: 9, metrics: ["Coupon apply rate", "Coupon success rate", "Checkout completion rate"] },
      { name: "Help link accessibility", hypothesis: "Contextual help links at each checkout step will reduce support contacts and increase completion", control: "Single help link in the header or footer", variant: "Contextual help icons next to complex fields (CVV, billing address format)", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 7, ease: 8, metrics: ["Help click rate", "Checkout completion rate", "Support contact rate"] },
      { name: "Payment method tab selection", hypothesis: "Tab-style payment method selection will be more intuitive than radio buttons", control: "Radio button list of payment methods", variant: "Visual tabs or cards for each payment method", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 6, ease: 6, metrics: ["Payment method click rate", "Checkout completion rate"] },
      { name: "Save for later button", hypothesis: "A save-for-later option will reduce abandonment and increase return visits", control: "No save or wishlist option during checkout", variant: "Save for later button next to each item in cart", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 6, ease: 5, metrics: ["Save-for-later click rate", "Return visit rate", "Subsequent purchase rate"] },
      { name: "Address autocomplete", hypothesis: "Address autocomplete will speed up form completion and increase checkout clicks", control: "Manual address entry with multiple fields", variant: "Address autocomplete with single search field expanding to full address", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 7, ease: 6, metrics: ["Address completion rate", "Checkout completion rate", "Time to complete address"] },
      { name: "Mobile CTA thumb zone", hypothesis: "Placing the primary CTA in the thumb zone on mobile will increase mobile click rate", control: "CTA at the bottom of the form requiring scroll", variant: "Sticky CTA button fixed in the thumb zone on mobile", expectedImpact: "High", difficulty: "Medium", impact: 8, confidence: 7, ease: 6, metrics: ["Mobile CTA click rate", "Mobile checkout completion rate"] },
    ],
    downloads: [
      { name: "Digital receipt format", hypothesis: "Offering a downloadable PDF receipt will increase customer satisfaction and reduce support requests", control: "On-screen confirmation with emailed receipt only", variant: "Downloadable PDF receipt button on confirmation page", expectedImpact: "Low", difficulty: "Medium", impact: 5, confidence: 7, ease: 7, metrics: ["Download rate", "Support ticket rate", "Customer satisfaction"] },
      { name: "Invoice download option", hypothesis: "A printable invoice download will serve B2B buyers who need documentation", control: "No invoice download option", variant: "Download invoice button on the order confirmation page", expectedImpact: "Low", difficulty: "Medium", impact: 5, confidence: 7, ease: 6, metrics: ["Download rate", "B2B purchase rate", "Repeat purchase rate"] },
      { name: "Product manual download", hypothesis: "Offering product manuals or guides after purchase will improve the unboxing experience", control: "No product documentation offered post-purchase", variant: "Downloadable product manual or quick-start guide on confirmation page", expectedImpact: "Low", difficulty: "Easy", impact: 4, confidence: 6, ease: 8, metrics: ["Download rate", "Support ticket rate", "Customer satisfaction"] },
      { name: "Warranty registration download", hypothesis: "A downloadable warranty registration form will increase warranty signup rates", control: "Warranty registration only via a separate web form", variant: "Downloadable warranty certificate with registration link on confirmation", expectedImpact: "Low", difficulty: "Medium", impact: 4, confidence: 5, ease: 6, metrics: ["Warranty registration rate", "Download rate", "Customer retention"] },
      { name: "Order summary export", hypothesis: "An exportable order summary will help buyers with expense tracking and increase satisfaction", control: "Order details viewable on screen only", variant: "Export to CSV or PDF button for the order summary", expectedImpact: "Low", difficulty: "Medium", impact: 4, confidence: 6, ease: 6, metrics: ["Export rate", "Customer satisfaction", "Repeat purchase rate"] },
      { name: "Gift receipt option", hypothesis: "A downloadable gift receipt will appeal to gift buyers and increase purchases", control: "No gift receipt option", variant: "Gift receipt download option (without price) during checkout", expectedImpact: "Low", difficulty: "Medium", impact: 5, confidence: 5, ease: 6, metrics: ["Gift receipt download rate", "Gift purchase rate", "Customer satisfaction"] },
      { name: "Packing slip download", hypothesis: "A packing slip download will help buyers verify their order before arrival", control: "No packing slip provided to customers", variant: "Downloadable packing slip on confirmation and order status pages", expectedImpact: "Low", difficulty: "Easy", impact: 4, confidence: 6, ease: 8, metrics: ["Download rate", "Order verification rate", "Support ticket rate"] },
      { name: "Bonus content unlock", hypothesis: "Offering exclusive bonus content downloads after purchase will increase perceived value", control: "Standard confirmation page with no bonuses", variant: "Exclusive downloadable content (guide, template, resource) unlocked after purchase", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 6, ease: 5, metrics: ["Download rate", "Customer satisfaction", "Repeat purchase rate"] },
      { name: "Receipt format preference", hypothesis: "Letting customers choose their receipt format will improve satisfaction", control: "Single receipt format (email only)", variant: "Format selector: email, PDF download, or both", expectedImpact: "Low", difficulty: "Medium", impact: 4, confidence: 5, ease: 6, metrics: ["Format selection rate", "Customer satisfaction", "Support requests"] },
      { name: "Tax document download", hypothesis: "Offering tax-related documents will serve business buyers and increase B2B satisfaction", control: "No tax documentation available for download", variant: "Tax invoice or receipt download with proper business formatting", expectedImpact: "Low", difficulty: "Medium", impact: 5, confidence: 6, ease: 5, metrics: ["Download rate", "B2B customer satisfaction", "Repeat purchase rate"] },
    ],
  },
  homepage: {
    signups: [
      { name: "Hero CTA clarity", hypothesis: "A single, clear CTA in the hero will outperform multiple competing actions", control: "Hero section with 2-3 different CTAs", variant: "Single primary CTA with specific action text", expectedImpact: "High", difficulty: "Easy", impact: 8, confidence: 8, ease: 9, metrics: ["CTA click rate", "Signup rate", "Bounce rate"] },
      { name: "Value proposition headline", hypothesis: "A headline focused on the visitor outcome will increase signup intent", control: "Company-centric headline about the brand", variant: "Visitor-centric headline stating the key benefit or outcome", expectedImpact: "High", difficulty: "Easy", impact: 8, confidence: 8, ease: 9, metrics: ["Signup rate", "Bounce rate", "Time on page"] },
      { name: "Above-fold form placement", hypothesis: "Placing a signup form directly in the hero will increase conversions from first-time visitors", control: "Hero with CTA button linking to a signup page", variant: "Inline email capture form directly in the hero section", expectedImpact: "High", difficulty: "Easy", impact: 8, confidence: 7, ease: 8, metrics: ["Signup rate", "Form completion rate", "Bounce rate"] },
      { name: "Social proof in hero", hypothesis: "Adding client logos or user count in the hero will build immediate trust", control: "Hero section with no social proof elements", variant: "Client logos, user count, or rating displayed below the hero headline", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 7, ease: 9, metrics: ["Signup rate", "CTA click rate", "Trust survey results"] },
      { name: "Homepage length test", hypothesis: "A shorter homepage will reduce distraction and focus visitors on signing up", control: "Long homepage with multiple content sections", variant: "Concise homepage: hero, key benefits, social proof, CTA", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 6, ease: 7, metrics: ["Signup rate", "Bounce rate", "Scroll depth"] },
      { name: "Navigation simplification", hypothesis: "Fewer navigation items will focus visitors toward the primary conversion path", control: "Navigation with 7+ menu items", variant: "Simplified navigation with 4-5 essential items plus primary CTA", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["CTA click rate", "Signup rate", "Navigation click distribution"] },
      { name: "Benefit section reorder", hypothesis: "Leading with the most compelling benefit will increase signup rate", control: "Benefits listed in arbitrary or feature-first order", variant: "Benefits ordered by customer research priority (most compelling first)", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 6, ease: 9, metrics: ["Signup rate", "Scroll depth", "CTA click rate"] },
      { name: "Exit-intent offer", hypothesis: "A signup incentive shown on exit intent will capture leaving visitors", control: "No exit-intent mechanism", variant: "Exit-intent overlay with incentive (discount, free resource, trial extension)", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 7, ease: 6, metrics: ["Exit-intent conversion rate", "Overall signup rate"] },
      { name: "Chatbot or assistant prompt", hypothesis: "A welcome chatbot will guide confused visitors toward signup", control: "No chatbot or assistant on the homepage", variant: "Subtle chatbot prompt offering to help visitors find what they need", expectedImpact: "Low", difficulty: "Hard", impact: 5, confidence: 5, ease: 4, metrics: ["Chat engagement rate", "Signup rate from chat", "Bounce rate"] },
      { name: "Testimonial format test", hypothesis: "Video testimonials will build more trust than text testimonials for signups", control: "Text-only testimonials with attribution", variant: "Short video testimonial clips with text summary", expectedImpact: "Medium", difficulty: "Hard", impact: 7, confidence: 6, ease: 4, metrics: ["Signup rate", "Testimonial engagement rate", "Time on page"] },
    ],
    purchases: [
      { name: "Featured product placement", hypothesis: "Showcasing top products in the hero will drive more purchase intent from the homepage", control: "Generic hero with brand messaging only", variant: "Hero featuring top products with direct purchase links", expectedImpact: "High", difficulty: "Medium", impact: 8, confidence: 7, ease: 7, metrics: ["Product page visits from homepage", "Purchase rate", "Revenue per visit"] },
      { name: "Category navigation prominence", hypothesis: "More prominent category navigation will help visitors find products faster", control: "Categories accessible through a menu dropdown", variant: "Visual category tiles or cards displayed on the homepage", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 7, ease: 6, metrics: ["Category page visits", "Purchase rate", "Pages per session"] },
      { name: "Promotional banner effectiveness", hypothesis: "A clear promotional banner with a direct shop link will increase purchase-driven traffic", control: "No promotional banner or a static informational banner", variant: "Dynamic promotional banner with current offer and direct shop CTA", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 7, ease: 8, metrics: ["Banner click rate", "Purchase rate", "Revenue per visit"] },
      { name: "Bestseller section", hypothesis: "A bestseller section will help undecided visitors by surfacing popular choices", control: "No bestseller or popular items section on homepage", variant: "Bestseller section with top products, ratings, and quick add-to-cart", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 7, ease: 6, metrics: ["Product click rate", "Add-to-cart rate", "Purchase rate"] },
      { name: "Search bar prominence", hypothesis: "A more prominent search bar will help visitors find products and increase purchases", control: "Small or hidden search functionality", variant: "Large, prominent search bar with placeholder suggestions", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Search usage rate", "Search-to-purchase rate", "Pages per session"] },
      { name: "New arrivals section", hypothesis: "Highlighting new arrivals will create freshness and encourage return visits and purchases", control: "No new arrivals section on the homepage", variant: "New arrivals section with recent additions and dates", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 6, ease: 8, metrics: ["New arrivals click rate", "Purchase rate", "Return visit rate"] },
      { name: "Homepage personalization", hypothesis: "Personalized product recommendations based on browse history will increase purchases", control: "Same homepage content for all visitors", variant: "Personalized product section based on past browse behavior", expectedImpact: "High", difficulty: "Hard", impact: 8, confidence: 6, ease: 3, metrics: ["Product click rate", "Purchase rate", "Revenue per visit"] },
      { name: "Trust and shipping information", hypothesis: "Prominent shipping and return policy info on the homepage will increase purchase confidence", control: "Shipping info only in the footer or a separate page", variant: "Trust bar with free shipping, easy returns, and secure checkout messaging", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 9, metrics: ["Purchase rate", "Bounce rate", "Cart initiation rate"] },
      { name: "Price display on homepage products", hypothesis: "Showing prices on homepage product cards will set expectations and attract price-conscious buyers", control: "Product cards without price information", variant: "Product cards with price displayed (or starting at price)", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Product click rate", "Purchase rate", "Bounce rate"] },
      { name: "Seasonal content rotation", hypothesis: "Seasonally relevant hero content will resonate more and drive more purchases", control: "Static evergreen hero content year-round", variant: "Seasonally updated hero content tied to current buying patterns", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 6, ease: 6, metrics: ["Hero CTA click rate", "Purchase rate", "Revenue per visit"] },
    ],
    engagement: [
      { name: "Content hub link in hero", hypothesis: "A secondary link to valuable content will increase homepage engagement for non-purchase visitors", control: "Hero focused only on product/signup CTA", variant: "Secondary link to blog, guides, or resources alongside the primary CTA", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 9, metrics: ["Content section click rate", "Pages per session", "Time on site"] },
      { name: "Interactive element in hero", hypothesis: "An interactive element (search, quiz, calculator) will increase engagement from the first screen", control: "Static hero with text and image/CTA", variant: "Interactive element embedded in the hero section", expectedImpact: "High", difficulty: "Hard", impact: 8, confidence: 6, ease: 4, metrics: ["Interaction rate", "Time on site", "Bounce rate", "Pages per session"] },
      { name: "Recent blog posts section", hypothesis: "Featuring recent blog content on the homepage will increase content consumption", control: "No blog content on the homepage", variant: "Recent blog posts section with thumbnails and excerpts", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Blog click rate", "Pages per session", "Time on site"] },
      { name: "Video background vs. static", hypothesis: "A subtle video background in the hero will increase visual interest and engagement", control: "Static image or solid color hero background", variant: "Subtle looping video background (with performance optimization)", expectedImpact: "Low", difficulty: "Medium", impact: 5, confidence: 5, ease: 6, metrics: ["Time on page", "Bounce rate", "CTA click rate"] },
      { name: "Scroll indicator addition", hypothesis: "A scroll indicator will encourage visitors to explore content below the fold", control: "No scroll indicator or prompt", variant: "Subtle animated scroll indicator at the bottom of the hero", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 6, ease: 9, metrics: ["Scroll initiation rate", "Scroll depth", "Pages per session"] },
      { name: "Footer content expansion", hypothesis: "A richer footer with navigation and content will increase site exploration", control: "Minimal footer with copyright and basic links", variant: "Expanded footer with navigation, popular pages, newsletter signup, and social links", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 6, ease: 8, metrics: ["Footer click rate", "Pages per session", "Newsletter signup rate"] },
      { name: "Announcement bar", hypothesis: "A top announcement bar will communicate new content and drive engagement", control: "No announcement bar on the homepage", variant: "Dismissible announcement bar with current news or offers", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 6, ease: 8, metrics: ["Announcement click rate", "Engagement with linked content", "Dismiss rate"] },
      { name: "How it works section", hypothesis: "A clear how-it-works section will increase understanding and engagement for new visitors", control: "No explanatory content for new visitors", variant: "3-step how-it-works section with icons and brief descriptions", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Section view rate", "CTA click rate after section", "Signup rate"] },
      { name: "Mobile content prioritization", hypothesis: "Reordering content for mobile will improve engagement on smaller screens", control: "Same content order on mobile as desktop", variant: "Mobile-optimized content order prioritizing key sections and CTA", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 6, ease: 6, metrics: ["Mobile engagement rate", "Mobile bounce rate", "Mobile conversion rate"] },
      { name: "Load time optimization test", hypothesis: "Faster homepage load time will reduce bounce rate and increase engagement", control: "Current homepage with all assets", variant: "Optimized homepage with lazy loading, reduced image sizes, and deferred scripts", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 7, ease: 5, metrics: ["Page load time", "Bounce rate", "Pages per session", "Core Web Vitals"] },
    ],
    clicks: [
      { name: "Hero CTA button design", hypothesis: "A more prominent hero CTA button will increase the primary click rate", control: "Standard button matching the page design", variant: "Oversized button with animation or high contrast", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 8, ease: 9, metrics: ["Hero CTA click rate", "Signup/purchase rate"] },
      { name: "Navigation item order", hypothesis: "Reordering navigation items by visitor priority will increase clicks on key pages", control: "Navigation ordered by internal logic or alphabetically", variant: "Navigation ordered by visitor traffic data (most visited first)", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 9, metrics: ["Navigation click distribution", "Pages per session", "Target page visits"] },
      { name: "Card-based layout", hypothesis: "Card-based content sections will be more clickable than text-heavy sections", control: "Text-heavy homepage sections with inline links", variant: "Card-based layout with visual elements and clear click targets", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 7, ease: 6, metrics: ["Section click rate", "Pages per session"] },
      { name: "CTA repetition strategy", hypothesis: "Placing the primary CTA at multiple scroll points will catch visitors at different decision moments", control: "CTA only in the hero and bottom of page", variant: "CTA repeated after every 2-3 content sections", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Overall CTA click rate", "CTA click rate by position"] },
      { name: "Image link area expansion", hypothesis: "Making entire cards clickable (not just text links) will increase click rate", control: "Only text links are clickable within content cards", variant: "Entire card is a clickable link with hover state", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 8, ease: 8, metrics: ["Card click rate", "Pages per session"] },
      { name: "Mega menu vs. simple dropdown", hypothesis: "A mega menu with visual categories will increase navigation click rate", control: "Simple dropdown text navigation menu", variant: "Mega menu with images, descriptions, and grouped categories", expectedImpact: "Medium", difficulty: "Hard", impact: 7, confidence: 6, ease: 4, metrics: ["Navigation click rate", "Category page visits", "Pages per session"] },
      { name: "Floating action button", hypothesis: "A floating action button for the primary CTA will increase click accessibility", control: "CTA only in fixed positions on the page", variant: "Floating action button that follows scroll (contact, signup, or chat)", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 6, ease: 8, metrics: ["FAB click rate", "Conversion rate", "Mobile click rate"] },
      { name: "Content teaser with read more", hypothesis: "Teaser text with read more links will drive more clicks to internal pages", control: "Full content displayed on the homepage", variant: "Truncated teasers with prominent read more links to full pages", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Read more click rate", "Pages per session", "Content page visits"] },
      { name: "Icon-based navigation aids", hypothesis: "Icons paired with navigation labels will increase visual recognition and click rate", control: "Text-only navigation labels", variant: "Icons paired with each navigation label", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 6, ease: 8, metrics: ["Navigation click rate", "Navigation hover rate"] },
      { name: "Above-fold density reduction", hypothesis: "Less content above the fold will make the primary CTA more prominent", control: "Dense above-fold with multiple elements competing for attention", variant: "Clean above-fold: headline, one sentence, single CTA", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 7, ease: 8, metrics: ["Hero CTA click rate", "Bounce rate"] },
    ],
    downloads: [
      { name: "Lead magnet in hero", hypothesis: "A lead magnet offer in the hero section will generate downloads from high-intent visitors", control: "Hero focused on product or brand messaging", variant: "Hero with lead magnet offer (free guide, template, toolkit)", expectedImpact: "High", difficulty: "Easy", impact: 8, confidence: 7, ease: 8, metrics: ["Download rate", "Lead capture rate", "Email list growth"] },
      { name: "Resource section on homepage", hypothesis: "A dedicated resources section will increase content downloads from the homepage", control: "No resources section on the homepage", variant: "Featured resources section with 2-3 downloadable assets", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Resource click rate", "Download rate", "Lead capture rate"] },
      { name: "Popup vs. inline download offer", hypothesis: "An inline download offer will feel less intrusive and convert better than a popup", control: "Timed popup with download offer", variant: "Inline download offer section naturally placed within content flow", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Download rate", "Popup dismiss rate vs. inline engagement"] },
      { name: "Content upgrade bar", hypothesis: "A sticky bar promoting a content download will increase visibility and downloads", control: "Download offer only within the page content", variant: "Subtle sticky bar at top or bottom promoting a key downloadable resource", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 6, ease: 8, metrics: ["Bar click rate", "Download rate", "Bar dismiss rate"] },
      { name: "Annual report or industry data", hypothesis: "Offering an annual report or industry data download will position the brand as a thought leader", control: "No industry research or data content on the homepage", variant: "Prominent download CTA for industry report or data compilation", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 5, ease: 6, metrics: ["Download rate", "Lead quality", "Content sharing rate"] },
      { name: "Multiple download formats", hypothesis: "Offering the same resource in different formats will appeal to different preferences", control: "Single format download option", variant: "Format selector (PDF, audio, video summary) for the key resource", expectedImpact: "Low", difficulty: "Medium", impact: 5, confidence: 5, ease: 5, metrics: ["Overall download rate", "Format preference distribution"] },
      { name: "Download social proof", hypothesis: "Showing download count or user ratings for resources will increase download rate", control: "Download CTA with no social indicators", variant: "Download count or rating shown alongside the resource CTA", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 6, ease: 8, metrics: ["Download rate", "CTA click rate"] },
      { name: "Newsletter as download gateway", hypothesis: "Positioning newsletter signup as a gateway to exclusive downloads will increase both signups and downloads", control: "Separate newsletter and download CTAs", variant: "Newsletter signup that unlocks a resource library or exclusive download", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 6, ease: 5, metrics: ["Newsletter signup rate", "Download rate", "Email engagement"] },
      { name: "Exit-intent download offer", hypothesis: "An exit-intent download offer will capture leaving visitors as leads", control: "No exit-intent mechanism on the homepage", variant: "Exit-intent overlay with high-value downloadable resource offer", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 6, ease: 6, metrics: ["Exit-intent trigger rate", "Download rate", "Lead capture rate"] },
      { name: "Seasonal content download", hypothesis: "A seasonally relevant download will feel timely and increase conversion", control: "Evergreen download offer year-round", variant: "Seasonally updated download offer (quarterly report, holiday guide, year-end toolkit)", expectedImpact: "Low", difficulty: "Medium", impact: 5, confidence: 5, ease: 5, metrics: ["Download rate", "Content relevance score", "Lead quality"] },
    ],
  },
  "pricing-page": {
    signups: [
      { name: "Recommended plan highlight", hypothesis: "Visually highlighting the recommended plan will guide decision-making and increase signups", control: "All plans styled equally with no recommendation", variant: "One plan visually highlighted as Most Popular or Recommended", expectedImpact: "High", difficulty: "Easy", impact: 8, confidence: 9, ease: 9, metrics: ["Plan selection rate", "Signup rate", "Revenue per signup"] },
      { name: "Plan count reduction", hypothesis: "Fewer plan options will reduce decision paralysis and increase signups", control: "4+ pricing plans", variant: "3 plans maximum (starter, professional, enterprise)", expectedImpact: "High", difficulty: "Medium", impact: 8, confidence: 8, ease: 7, metrics: ["Signup rate", "Time on pricing page", "Bounce rate"] },
      { name: "Annual vs. monthly toggle", hypothesis: "Defaulting to annual pricing with a clear savings callout will increase signup value", control: "Monthly pricing shown by default", variant: "Annual pricing shown by default with savings percentage highlighted", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 8, ease: 8, metrics: ["Annual vs. monthly signup ratio", "Average revenue per signup", "Signup rate"] },
      { name: "Feature comparison table", hypothesis: "A clear feature comparison table will help visitors choose a plan and increase signups", control: "Features listed separately under each plan", variant: "Full comparison table showing all plans side by side with checkmarks", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 7, ease: 7, metrics: ["Signup rate", "Time on page", "Plan distribution"] },
      { name: "FAQ section below pricing", hypothesis: "Answering common pricing questions will reduce objections and increase signup conversions", control: "No FAQ on the pricing page", variant: "5-8 FAQ items addressing common pricing concerns below the pricing cards", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 9, metrics: ["Signup rate", "FAQ interaction rate", "Support contact rate"] },
      { name: "Free trial emphasis", hypothesis: "Emphasizing the free trial in the CTA will reduce signup hesitation", control: "CTA says Get Started or Choose Plan", variant: "CTA says Start Free Trial or Try Free for X Days", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 8, ease: 10, metrics: ["Signup rate", "Trial-to-paid conversion rate"] },
      { name: "Custom plan option", hypothesis: "A contact us for custom pricing option will capture enterprise leads that would otherwise bounce", control: "Only fixed pricing plans, no custom option", variant: "Enterprise or custom plan card with Contact Us CTA", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Enterprise lead capture rate", "Overall signup rate", "Revenue per customer"] },
      { name: "Money-back guarantee", hypothesis: "A money-back guarantee will reduce perceived risk and increase paid plan signups", control: "No guarantee mentioned on the pricing page", variant: "Money-back guarantee badge prominently displayed near pricing CTAs", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 9, metrics: ["Paid signup rate", "Refund rate", "Revenue per visitor"] },
      { name: "Calculator or ROI tool", hypothesis: "An interactive tool showing potential ROI will justify the price and increase signups", control: "Static pricing with no ROI context", variant: "Interactive ROI calculator showing value relative to price", expectedImpact: "High", difficulty: "Hard", impact: 8, confidence: 6, ease: 3, metrics: ["Calculator interaction rate", "Signup rate", "Plan selection distribution"] },
      { name: "Social proof on pricing page", hypothesis: "Customer logos or count on the pricing page will build trust at the decision moment", control: "No social proof on the pricing page", variant: "Client logos, user count, or testimonial near pricing tables", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 9, metrics: ["Signup rate", "Pricing page bounce rate"] },
    ],
    purchases: [
      { name: "Per-seat vs. flat pricing display", hypothesis: "Showing per-seat pricing will feel more accessible for small teams", control: "Flat monthly or annual pricing only", variant: "Per-seat pricing clearly displayed with team size calculator", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 6, ease: 6, metrics: ["Purchase rate", "Average deal size", "Plan selection distribution"] },
      { name: "Checkout flow from pricing page", hypothesis: "Reducing steps between pricing page and payment will increase purchase completion", control: "Pricing CTA links to signup page, then checkout", variant: "Pricing CTA opens inline checkout or direct-to-payment flow", expectedImpact: "High", difficulty: "Hard", impact: 8, confidence: 7, ease: 4, metrics: ["Purchase rate", "Drop-off between pricing and payment", "Time to purchase"] },
      { name: "Add-on upsell on pricing page", hypothesis: "Showing relevant add-ons alongside plans will increase average order value", control: "No add-ons shown on the pricing page", variant: "Optional add-ons (support, integrations, extra features) below pricing cards", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 6, ease: 6, metrics: ["Add-on attachment rate", "Average order value", "Revenue per customer"] },
      { name: "Pricing page layout (cards vs. table)", hypothesis: "Card-based pricing layout will be more scannable than a feature table for purchase decisions", control: "Feature comparison table as the primary pricing layout", variant: "Clean pricing cards with top features and a detailed comparison below", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 6, ease: 6, metrics: ["Purchase rate", "Time on page", "Plan selection clarity"] },
      { name: "Discount for annual commitment", hypothesis: "A clearly displayed discount for annual billing will increase annual plan purchases", control: "Annual and monthly prices shown without savings emphasis", variant: "Annual price with prominent savings badge (Save 20%) and monthly equivalent", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 8, ease: 9, metrics: ["Annual plan purchase rate", "Revenue per customer", "LTV"] },
      { name: "Limited-time pricing offer", hypothesis: "A time-limited introductory price will create urgency for purchase decisions", control: "Standard pricing with no time constraint", variant: "Introductory pricing with clear end date or countdown", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 6, ease: 8, metrics: ["Purchase rate", "Time to purchase", "Revenue per visitor"] },
      { name: "Payment options display", hypothesis: "Showing accepted payment methods on the pricing page will reduce purchase hesitation", control: "No payment method information until checkout", variant: "Accepted payment method icons displayed below pricing CTAs", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 7, ease: 10, metrics: ["Purchase rate", "Pricing page exit rate"] },
      { name: "Competitor pricing comparison", hypothesis: "Showing cost comparison against alternatives will strengthen the value proposition", control: "Standalone pricing with no competitor context", variant: "Subtle comparison showing savings vs. typical alternative costs", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 5, ease: 6, metrics: ["Purchase rate", "Plan selection distribution", "Pricing page engagement"] },
      { name: "Customer story near pricing", hypothesis: "A brief customer success story near the pricing section will justify the purchase", control: "No customer stories on the pricing page", variant: "One brief customer outcome story with a measurable result near pricing", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Purchase rate", "Pricing page scroll depth"] },
      { name: "Interactive plan builder", hypothesis: "An interactive plan builder will increase engagement and purchase conversion on the pricing page", control: "Static plan cards with fixed features", variant: "Interactive builder where users toggle features and see dynamic pricing", expectedImpact: "High", difficulty: "Hard", impact: 8, confidence: 5, ease: 3, metrics: ["Interaction rate", "Purchase rate", "Average plan value"] },
    ],
    engagement: [
      { name: "Feature deep-dive links", hypothesis: "Links to detailed feature pages from the pricing table will increase exploration and understanding", control: "Feature names without links or explanations", variant: "Feature names linked to detailed feature pages or inline tooltips", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Feature link click rate", "Pages per session", "Signup rate"] },
      { name: "Pricing page chat widget", hypothesis: "A chat widget specifically for pricing questions will capture high-intent visitors", control: "No chat option on the pricing page", variant: "Targeted chat prompt (Have pricing questions?) on the pricing page", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 6, ease: 6, metrics: ["Chat engagement rate", "Chat-to-signup rate", "Pricing page bounce rate"] },
      { name: "Feature comparison toggle", hypothesis: "A toggle to show all vs. different features only will improve comparison clarity", control: "Full feature list in the comparison table", variant: "Toggle to show all features or only differences between plans", expectedImpact: "Low", difficulty: "Medium", impact: 5, confidence: 6, ease: 6, metrics: ["Toggle usage rate", "Time on page", "Signup rate"] },
      { name: "Pricing FAQ expansion", hypothesis: "More comprehensive FAQs will address more objections and reduce friction", control: "Brief or no FAQ section", variant: "Comprehensive FAQ with 10+ questions covering objections, comparisons, and process", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 6, ease: 8, metrics: ["FAQ interaction rate", "Pricing page time", "Support contact reduction"] },
      { name: "Plan recommendation quiz", hypothesis: "A short quiz to recommend the best plan will increase engagement and reduce confusion", control: "Visitors must self-select from plan options", variant: "2-3 question quiz that recommends the best plan for the visitor", expectedImpact: "Medium", difficulty: "Hard", impact: 7, confidence: 6, ease: 4, metrics: ["Quiz completion rate", "Signup rate", "Plan match satisfaction"] },
      { name: "Use case examples per plan", hypothesis: "Showing typical use cases for each plan will help visitors self-identify the right tier", control: "Plans described only by features and price", variant: "Each plan includes a typical customer profile or use case example", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Plan selection confidence", "Support questions about plans", "Signup rate"] },
      { name: "Testimonial per plan tier", hypothesis: "Plan-specific testimonials will help visitors identify with the right plan", control: "Generic testimonials not tied to specific plans", variant: "Testimonial from a customer of each plan tier placed under each card", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 6, ease: 8, metrics: ["Plan selection rate", "Testimonial engagement", "Signup rate"] },
      { name: "Pricing transparency details", hypothesis: "More transparent pricing (what is included, no hidden fees messaging) will increase trust and engagement", control: "Basic pricing without detailed breakdown", variant: "Detailed what is included list with no hidden fees messaging", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Time on pricing page", "Signup rate", "Support ticket rate"] },
      { name: "Feature tooltip explanations", hypothesis: "Tooltips explaining each feature will help visitors understand value without leaving the page", control: "Feature names with no explanation", variant: "Hover or click tooltips with brief feature descriptions", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 7, ease: 8, metrics: ["Tooltip interaction rate", "Time on page", "Signup rate"] },
      { name: "Pricing page speed optimization", hypothesis: "Faster pricing page load time will reduce abandonment, especially on mobile", control: "Current pricing page with all assets and scripts", variant: "Optimized pricing page with minimal assets and fast rendering", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 7, ease: 5, metrics: ["Page load time", "Bounce rate", "Signup rate", "Mobile engagement"] },
    ],
    clicks: [
      { name: "CTA button text per plan", hypothesis: "Plan-specific CTA text will outperform identical CTAs across all plans", control: "Same CTA text on all plan cards (Get Started)", variant: "Tailored CTA text per plan (Try Starter, Go Professional, Contact Sales)", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 10, metrics: ["CTA click rate per plan", "Plan selection distribution"] },
      { name: "Pricing card hover effect", hypothesis: "A hover effect on pricing cards will signal interactivity and increase clicks", control: "Static pricing cards with no hover state", variant: "Subtle hover effect (border, shadow, or scale) on pricing cards", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 7, ease: 10, metrics: ["Card click rate", "CTA click rate"] },
      { name: "Annual/monthly toggle design", hypothesis: "A more prominent toggle will increase interaction and discovery of annual savings", control: "Small text toggle or tabs for billing period", variant: "Prominent switch toggle with savings callout", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 9, metrics: ["Toggle interaction rate", "Annual plan selection rate"] },
      { name: "Plan detail expand/collapse", hypothesis: "An expand/collapse for full feature list will keep cards clean while providing detail on demand", control: "All features listed in each card making cards very tall", variant: "Top features shown with See all features expandable link", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Expand click rate", "CTA click rate", "Plan comparison engagement"] },
      { name: "Mobile pricing layout", hypothesis: "A swipeable card layout on mobile will improve plan browsing and click rates", control: "Stacked pricing cards on mobile requiring scroll", variant: "Horizontally swipeable pricing cards on mobile", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 6, ease: 5, metrics: ["Mobile CTA click rate", "Mobile swipe rate", "Mobile signup rate"] },
      { name: "Sticky pricing header", hypothesis: "A sticky header with plan names and CTAs will keep options accessible while scrolling the comparison table", control: "Static plan headers that scroll out of view", variant: "Sticky header row with plan names and CTA buttons", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 7, ease: 6, metrics: ["CTA click rate while in comparison table", "Comparison table engagement"] },
      { name: "Contact sales button placement", hypothesis: "A more visible Contact Sales button for enterprise will capture more high-value clicks", control: "Contact Sales link in small text or footer", variant: "Prominent Contact Sales card equal in visual weight to plan cards", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Enterprise lead click rate", "Sales contact rate", "Enterprise revenue"] },
      { name: "Feature checkmark style", hypothesis: "Larger, clearer checkmarks in the comparison table will improve scannability and engagement", control: "Small or low-contrast checkmarks", variant: "Bold, high-contrast checkmarks with clear included/not-included states", expectedImpact: "Low", difficulty: "Easy", impact: 4, confidence: 7, ease: 10, metrics: ["Comparison table scroll depth", "CTA click rate"] },
      { name: "Anchor link from hero to pricing", hypothesis: "A direct link from the hero to the pricing cards will increase the rate of reaching pricing", control: "Visitors must scroll to find pricing cards", variant: "See Pricing button in the hero that smooth-scrolls to the pricing section", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 9, metrics: ["Pricing section view rate", "CTA click rate"] },
      { name: "Plan badge or label", hypothesis: "Labels like Most Popular or Best Value will draw attention and increase clicks on specific plans", control: "No labels or badges on pricing cards", variant: "Prominent badge on the recommended plan (Most Popular, Best Value)", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 8, ease: 10, metrics: ["Badged plan click rate", "Overall CTA click rate"] },
    ],
    downloads: [
      { name: "Pricing comparison PDF", hypothesis: "A downloadable pricing comparison PDF will serve stakeholders who need to share internally", control: "Pricing information only available on the web page", variant: "Download pricing comparison PDF button on the pricing page", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 7, ease: 6, metrics: ["Download rate", "Enterprise lead quality", "Sales cycle length"] },
      { name: "Feature list export", hypothesis: "An exportable feature list will help buyers compare your product in buying committees", control: "Feature comparison only viewable on the page", variant: "Export feature comparison as CSV or PDF button", expectedImpact: "Low", difficulty: "Medium", impact: 5, confidence: 6, ease: 6, metrics: ["Export rate", "Enterprise lead quality"] },
      { name: "ROI calculator results download", hypothesis: "A downloadable ROI summary will help champions present the case internally", control: "ROI calculator results shown on screen only", variant: "Download ROI summary as PDF button after calculator completion", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 6, ease: 5, metrics: ["Download rate after calculator use", "Enterprise conversion rate"] },
      { name: "Product brochure download", hypothesis: "A product brochure with pricing will serve traditional buyers who prefer offline evaluation", control: "No downloadable product overview on pricing page", variant: "Product brochure with pricing and features available for download", expectedImpact: "Low", difficulty: "Medium", impact: 5, confidence: 5, ease: 6, metrics: ["Download rate", "Lead capture rate", "Sales inquiries"] },
      { name: "Case study at pricing page", hypothesis: "A case study download on the pricing page will help justify the cost with real results", control: "No case study content on the pricing page", variant: "Relevant case study download CTA near pricing cards", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 6, ease: 8, metrics: ["Download rate", "Signup rate", "Lead quality"] },
      { name: "Service agreement preview", hypothesis: "Making the service agreement available for download will build trust and speed up purchasing", control: "Service agreement only available after signup or upon request", variant: "Service agreement preview download available on the pricing page", expectedImpact: "Low", difficulty: "Easy", impact: 4, confidence: 6, ease: 8, metrics: ["Download rate", "Enterprise signup rate", "Sales cycle length"] },
      { name: "Implementation guide download", hypothesis: "An implementation guide will reduce onboarding concerns that block purchase decisions", control: "No implementation information on the pricing page", variant: "Downloadable implementation or onboarding guide near pricing cards", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 6, ease: 6, metrics: ["Download rate", "Signup rate", "Onboarding satisfaction"] },
      { name: "Security whitepaper", hypothesis: "A security whitepaper download will address enterprise security concerns at the decision point", control: "Security information only on a separate page", variant: "Security whitepaper download CTA on the pricing page for enterprise tier", expectedImpact: "Low", difficulty: "Medium", impact: 5, confidence: 5, ease: 5, metrics: ["Download rate", "Enterprise lead quality", "Security-related support questions"] },
      { name: "Migration guide offer", hypothesis: "A migration guide will reduce switching concerns for prospects considering a move from competitors", control: "No migration or switching content on the pricing page", variant: "Switching/migration guide download for visitors comparing alternatives", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 5, ease: 5, metrics: ["Download rate", "Competitor-sourced lead conversion", "Sales cycle length"] },
      { name: "Custom quote request form", hypothesis: "A custom quote request form for enterprise will capture more enterprise leads than a generic contact form", control: "Generic Contact Us link for enterprise pricing", variant: "Dedicated Get a Custom Quote form with business-specific fields", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 6, ease: 6, metrics: ["Quote request rate", "Enterprise lead quality", "Sales response time"] },
    ],
  },
  blog: {
    signups: [
      { name: "Inline newsletter form", hypothesis: "A newsletter signup form within the blog content will capture readers at peak engagement", control: "Newsletter signup only in the sidebar or footer", variant: "Inline newsletter form placed after the first major section of the post", expectedImpact: "High", difficulty: "Easy", impact: 8, confidence: 8, ease: 8, metrics: ["Newsletter signup rate", "Form completion rate"] },
      { name: "Content upgrade offer", hypothesis: "A content upgrade (related downloadable resource) will increase signup rate for blog readers", control: "No content upgrade or lead magnet tied to the post", variant: "Content upgrade offer (checklist, template, expanded version) relevant to the post topic", expectedImpact: "High", difficulty: "Medium", impact: 8, confidence: 7, ease: 6, metrics: ["Signup rate", "Download rate", "Lead quality"] },
      { name: "Author bio CTA", hypothesis: "A CTA in the author bio section will capture readers who finish the article", control: "Author bio with no CTA or signup link", variant: "Author bio with a CTA to subscribe or follow for more content", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 6, ease: 9, metrics: ["Author CTA click rate", "Signup rate"] },
      { name: "Sidebar vs. no sidebar", hypothesis: "Removing the sidebar will focus reading and drive more attention to inline signup forms", control: "Blog with sidebar containing navigation and signup", variant: "Full-width blog with no sidebar, inline CTAs only", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 6, ease: 6, metrics: ["Signup rate", "Read depth", "Time on page"] },
      { name: "End-of-post CTA design", hypothesis: "A visually distinct end-of-post CTA will capture readers who finish the article", control: "Small text CTA or no CTA after the content", variant: "Visually prominent CTA box with signup form after the conclusion", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 7, ease: 8, metrics: ["End-of-post CTA click rate", "Signup rate", "Read completion rate"] },
      { name: "Scroll-triggered signup slide-in", hypothesis: "A slide-in form triggered at 60% scroll depth will catch engaged readers", control: "No scroll-triggered elements", variant: "Subtle slide-in signup prompt appearing at 60% scroll depth", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 7, ease: 6, metrics: ["Slide-in conversion rate", "Overall signup rate", "Bounce rate impact"] },
      { name: "Social proof in signup CTA", hypothesis: "Adding subscriber count or frequency to the signup CTA will increase conversions", control: "Plain subscribe to our newsletter CTA", variant: "CTA with context (Join X readers or Weekly insights for marketers)", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 9, metrics: ["Signup rate", "CTA click rate"] },
      { name: "Gate premium content", hypothesis: "Gating the second half of a long-form post will capture signups from invested readers", control: "Full content accessible without signup", variant: "First half visible, remainder unlocked with email signup", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 5, ease: 6, metrics: ["Signup rate", "Content completion rate", "SEO impact"] },
      { name: "Header banner for newsletter", hypothesis: "A top banner promoting the newsletter will increase visibility and signups", control: "No newsletter mention in the header area", variant: "Slim banner below the header promoting newsletter with subscribe link", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 6, ease: 9, metrics: ["Banner click rate", "Signup rate", "Banner dismiss rate"] },
      { name: "Multiple CTA formats test", hypothesis: "Testing different CTA formats in different positions will identify the most effective combination", control: "Single CTA format used throughout the blog", variant: "Mix of inline text CTA, visual banner CTA, and end-of-post card CTA", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 6, ease: 6, metrics: ["CTA click rate by format", "Overall signup rate", "CTA fatigue indicators"] },
    ],
    purchases: [
      { name: "Product mention in content", hypothesis: "Natural product mentions within relevant blog content will drive purchase consideration", control: "Blog content with no product references", variant: "Contextual product mention with link where naturally relevant to the topic", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Product link click rate", "Blog-to-purchase rate", "Revenue attribution"] },
      { name: "Related product sidebar", hypothesis: "A sidebar showing products related to the blog topic will increase purchase intent", control: "No product references on the blog page", variant: "Sidebar widget with 2-3 related products or services", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 6, ease: 6, metrics: ["Product widget click rate", "Blog-to-purchase conversion"] },
      { name: "Bottom-of-post product recommendation", hypothesis: "Product recommendations after valuable content will leverage established trust", control: "No product mention after the blog post", variant: "Related product/service recommendation with CTA after the conclusion", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Recommendation click rate", "Purchase rate from blog visitors"] },
      { name: "Case study integration", hypothesis: "Embedding case study results within blog content will demonstrate product value and drive purchases", control: "Blog content with no case study evidence", variant: "Brief case study reference with results and product/service link", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 6, ease: 8, metrics: ["Case study link click rate", "Blog-to-purchase conversion"] },
      { name: "Promotional banner in blog header", hypothesis: "A promotional banner above blog posts will expose readers to current offers", control: "No promotional messaging in the blog", variant: "Slim promotional banner with current offer above blog post content", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 6, ease: 8, metrics: ["Banner click rate", "Purchase rate from blog visitors"] },
      { name: "Blog-exclusive offer", hypothesis: "A blog-exclusive discount or offer will motivate readers to purchase", control: "Standard product/service pages with no blog-exclusive incentives", variant: "Blog-exclusive offer code or link mentioned in relevant posts", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 6, ease: 7, metrics: ["Offer redemption rate", "Blog-to-purchase conversion", "Revenue attribution"] },
      { name: "Comparison post product link", hypothesis: "Direct product links in comparison or review posts will drive more qualified purchases", control: "Comparison content with no direct purchase paths", variant: "Clear CTA and product link for each option in comparison content", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 7, ease: 8, metrics: ["Product link click rate", "Purchase rate", "Revenue from comparison posts"] },
      { name: "How-to post with product integration", hypothesis: "How-to posts that naturally integrate the product as a solution tool will drive purchases", control: "How-to posts that are product-agnostic", variant: "How-to posts where the product is naturally used as the solution tool", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 6, ease: 6, metrics: ["Product page visits from blog", "Blog-to-purchase conversion"] },
      { name: "Testimonial widget on blog", hypothesis: "Showing customer testimonials on the blog will reinforce trust and drive purchase consideration", control: "No testimonials on the blog", variant: "Rotating testimonial widget or quote in the sidebar or footer of blog posts", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 5, ease: 8, metrics: ["Testimonial engagement", "Blog-to-purchase conversion"] },
      { name: "Persistent product CTA bar", hypothesis: "A persistent bottom bar promoting the core product will capture readers at any scroll position", control: "Product CTAs only within the blog content", variant: "Sticky bottom bar with product CTA visible throughout the reading experience", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 6, ease: 8, metrics: ["Bar click rate", "Blog-to-purchase conversion", "Reading experience impact"] },
    ],
    engagement: [
      { name: "Table of contents", hypothesis: "A table of contents at the top of long posts will help readers navigate and increase engagement", control: "No table of contents or navigation aids", variant: "Clickable table of contents for posts over 1500 words", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 8, ease: 8, metrics: ["TOC click rate", "Scroll depth", "Time on page"] },
      { name: "Reading time estimate", hypothesis: "Showing estimated reading time will set expectations and reduce bounce rate for long posts", control: "No reading time indication", variant: "Reading time estimate shown at the top of each post", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 7, ease: 10, metrics: ["Bounce rate", "Read completion rate", "Time on page"] },
      { name: "Related posts section", hypothesis: "Related post recommendations will increase content consumption and pages per session", control: "No related posts or generic recent posts list", variant: "Algorithmically or manually curated related posts with thumbnails", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 7, ease: 6, metrics: ["Related post click rate", "Pages per session", "Time on site"] },
      { name: "Content format variation", hypothesis: "Adding visual elements (pull quotes, callout boxes, images) will improve engagement in text-heavy posts", control: "Text-only blog posts with minimal formatting", variant: "Posts enhanced with pull quotes, callout boxes, and relevant images", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 7, metrics: ["Scroll depth", "Time on page", "Bounce rate"] },
      { name: "Comment section addition", hypothesis: "Enabling comments will create community engagement and increase return visits", control: "No comment section on blog posts", variant: "Moderated comment section at the bottom of posts", expectedImpact: "Low", difficulty: "Medium", impact: 5, confidence: 5, ease: 5, metrics: ["Comment submission rate", "Return visit rate", "Time on page"] },
      { name: "Share button positioning", hypothesis: "Floating share buttons will increase social sharing of blog content", control: "Share buttons only at the top or bottom of the post", variant: "Floating share buttons that follow the reader alongside the content", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 6, ease: 8, metrics: ["Share rate", "Referral traffic", "Social engagement"] },
      { name: "Post category navigation", hypothesis: "Clear category navigation will help readers find more relevant content", control: "Minimal or no category navigation on blog posts", variant: "Prominent category tag or breadcrumb with link to category archive", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Category page visits", "Pages per session", "Return visit rate"] },
      { name: "Key takeaways summary", hypothesis: "A key takeaways box at the top or bottom will increase perceived value and sharing", control: "No summary or takeaways section", variant: "Key takeaways box highlighting 3-5 main points", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Share rate", "Bookmark rate", "Return visit rate"] },
      { name: "Progressive content loading", hypothesis: "Loading content progressively will improve perceived performance and engagement on mobile", control: "Full post loaded at once", variant: "Progressive loading with smooth content appearance on scroll", expectedImpact: "Low", difficulty: "Medium", impact: 5, confidence: 5, ease: 6, metrics: ["Mobile bounce rate", "Mobile scroll depth", "Page load time"] },
      { name: "Author follow/subscribe", hypothesis: "An author follow option will build author loyalty and increase return readership", control: "No author-specific follow mechanism", variant: "Follow this author button that subscribes to their posts specifically", expectedImpact: "Low", difficulty: "Hard", impact: 5, confidence: 5, ease: 3, metrics: ["Author follow rate", "Author-specific return visits", "Email engagement"] },
    ],
    clicks: [
      { name: "Internal link density", hypothesis: "More internal links within post content will increase clicks to other pages", control: "Minimal internal linking (1-2 links per post)", variant: "Strategic internal linking (4-6 contextual links per post)", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 8, ease: 8, metrics: ["Internal link click rate", "Pages per session", "Bounce rate"] },
      { name: "CTA button vs. text link", hypothesis: "A styled CTA button will receive more clicks than a text hyperlink for key actions", control: "Text hyperlinks for all in-content CTAs", variant: "Styled button CTAs for primary actions, text links for secondary", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 8, ease: 9, metrics: ["CTA click rate", "Conversion rate"] },
      { name: "Featured image click behavior", hypothesis: "Making the featured image clickable (to full article from listing) will increase click rate", control: "Only title is clickable in blog listing", variant: "Both title and image are clickable links to the full article", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 8, ease: 9, metrics: ["Article click rate from listing", "Image click rate"] },
      { name: "Next post navigation", hypothesis: "Previous/next post navigation at the bottom will increase sequential reading and clicks", control: "No post navigation at the end of articles", variant: "Previous and next post links with titles at the bottom of each post", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 9, metrics: ["Next post click rate", "Pages per session"] },
      { name: "Excerpt length in listing", hypothesis: "Shorter excerpts in the blog listing will create more curiosity and increase click-through rate", control: "Long excerpts (100+ words) in blog listing", variant: "Short excerpts (30-50 words) that create curiosity", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 9, metrics: ["Listing click-through rate", "Bounce rate on post pages"] },
      { name: "Category page layout", hypothesis: "A grid layout for category pages will surface more posts and increase clicks", control: "List layout showing posts sequentially", variant: "Grid layout showing more posts per screen with thumbnails", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 6, ease: 7, metrics: ["Post click rate on category pages", "Pages per session"] },
      { name: "Highlight key statistics", hypothesis: "Pull quotes highlighting key statistics will increase engagement and clicks on source links", control: "Statistics embedded in body text", variant: "Key statistics pulled out as visually highlighted elements with source links", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 6, ease: 8, metrics: ["Stat element engagement", "Source link click rate", "Scroll depth"] },
      { name: "Clickable tag cloud", hypothesis: "Showing relevant tags on posts will encourage topic exploration and increase clicks", control: "No visible tags on blog posts", variant: "Relevant tags displayed below the post with clickable links to tag archives", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 6, ease: 8, metrics: ["Tag click rate", "Pages per session", "Topic exploration depth"] },
      { name: "Blog search functionality", hypothesis: "A prominent search bar will help visitors find specific content and increase engagement clicks", control: "No search or search buried in the footer", variant: "Prominent search bar on the blog listing and post pages", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 6, ease: 6, metrics: ["Search usage rate", "Search-to-page click rate", "Pages per session"] },
      { name: "Post thumbnail quality", hypothesis: "Higher-quality, more descriptive thumbnails will increase click-through rates from the listing", control: "Generic stock photo thumbnails", variant: "Custom or topic-specific thumbnails with visual cues about the content", expectedImpact: "Medium", difficulty: "Medium", impact: 6, confidence: 6, ease: 5, metrics: ["Listing click-through rate", "Time on page after click"] },
    ],
    downloads: [
      { name: "In-post downloadable checklist", hypothesis: "A downloadable checklist related to the blog topic will increase downloads and lead capture", control: "No downloadable content within blog posts", variant: "Relevant downloadable checklist or worksheet linked within the content", expectedImpact: "High", difficulty: "Easy", impact: 8, confidence: 8, ease: 8, metrics: ["Download rate", "Lead capture rate", "Content relevance score"] },
      { name: "Content upgrade banner", hypothesis: "A visual banner for content upgrades will get more attention than text links", control: "Text link to downloadable content", variant: "Visual banner or card with preview image and download CTA", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 7, ease: 8, metrics: ["Download rate", "Banner click rate", "Lead quality"] },
      { name: "End-of-post resource offer", hypothesis: "A resource offer after the conclusion will capture readers who found the content valuable", control: "No resource offer at the end of posts", variant: "Related resource download CTA after the post conclusion", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Download rate", "Read completion rate", "Lead quality"] },
      { name: "Pop-up vs. inline download form", hypothesis: "An inline download form will feel less disruptive and convert better than a pop-up", control: "Pop-up or modal download form", variant: "Inline download form embedded naturally in the content flow", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Download rate", "Form abandonment rate", "User experience satisfaction"] },
      { name: "Blog post as downloadable PDF", hypothesis: "Offering the blog post itself as a downloadable PDF will capture leads from invested readers", control: "Blog content only available on the web page", variant: "Download this article as PDF button with email capture", expectedImpact: "Low", difficulty: "Medium", impact: 5, confidence: 6, ease: 6, metrics: ["Download rate", "Lead capture rate"] },
      { name: "Resource library promotion", hypothesis: "Promoting a resource library from the blog will drive downloads of multiple assets", control: "Individual download offers per post only", variant: "Resource library link or section promoting multiple related downloads", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 6, ease: 8, metrics: ["Library page visits", "Multi-resource download rate", "Lead capture rate"] },
      { name: "Slide deck download", hypothesis: "A slide deck version of the blog content will appeal to professionals who want to share key points", control: "Blog content in text format only", variant: "Downloadable slide deck summarizing the key points of the post", expectedImpact: "Low", difficulty: "Hard", impact: 5, confidence: 5, ease: 3, metrics: ["Download rate", "Slide deck share rate", "Lead quality"] },
      { name: "Template download offer", hypothesis: "A template related to the how-to content will be highly valuable and increase downloads", control: "Instructional content without a ready-to-use template", variant: "Downloadable template or framework that applies the post concepts", expectedImpact: "High", difficulty: "Medium", impact: 8, confidence: 7, ease: 5, metrics: ["Download rate", "Template usage rate", "Lead quality"] },
      { name: "Data report download", hypothesis: "Original data or research findings as a download will attract high-quality leads", control: "Research findings presented only in the blog text", variant: "Full research report or data set available for download", expectedImpact: "Medium", difficulty: "Hard", impact: 7, confidence: 6, ease: 4, metrics: ["Download rate", "Lead quality", "Content sharing rate"] },
      { name: "Audio version download", hypothesis: "An audio version of the blog post will appeal to listeners and increase engagement downloads", control: "Text-only content", variant: "Downloadable audio version (podcast-style) of the blog post", expectedImpact: "Low", difficulty: "Hard", impact: 5, confidence: 4, ease: 3, metrics: ["Audio download rate", "Audio listen completion rate", "Subscriber growth"] },
    ],
  },
  email: {
    signups: [
      { name: "Subject line personalization", hypothesis: "Personalized subject lines with the recipient name or company will increase open rates and signups", control: "Generic subject line without personalization", variant: "Subject line with recipient name or company included", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 8, ease: 9, metrics: ["Open rate", "Click-through rate", "Signup rate"] },
      { name: "Single CTA focus", hypothesis: "Emails with a single CTA will drive more signup clicks than emails with multiple CTAs", control: "Email with 3+ different CTAs and links", variant: "Email with one clear, prominent CTA button", expectedImpact: "High", difficulty: "Easy", impact: 8, confidence: 8, ease: 9, metrics: ["Click-through rate", "Signup rate", "CTA click rate"] },
      { name: "CTA button vs. text link", hypothesis: "A styled CTA button will receive more clicks than a text hyperlink in the email body", control: "Text hyperlink for the primary action", variant: "Styled HTML button for the primary action", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 8, ease: 9, metrics: ["CTA click rate", "Signup rate"] },
      { name: "Email length reduction", hypothesis: "Shorter emails will be read more completely and drive more signup clicks", control: "Long-form email with 500+ words", variant: "Concise email under 200 words with clear value proposition and CTA", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 7, ease: 9, metrics: ["Click-through rate", "Signup rate", "Read rate"] },
      { name: "Preheader text optimization", hypothesis: "An optimized preheader that complements the subject line will increase open rates", control: "Default or missing preheader text", variant: "Custom preheader text that adds context and creates curiosity", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 8, ease: 10, metrics: ["Open rate", "Click-through rate"] },
      { name: "Send time optimization", hypothesis: "Sending at the optimal time for the audience will increase open and click rates", control: "Emails sent at a fixed time for all recipients", variant: "Send time personalized based on past engagement data or timezone", expectedImpact: "Medium", difficulty: "Medium", impact: 7, confidence: 7, ease: 6, metrics: ["Open rate", "Click-through rate", "Signup rate"] },
      { name: "Social proof in email", hypothesis: "Including a social proof element will increase trust and signup rate from the email", control: "Email without any social proof", variant: "Brief social proof element (user count, company logos, or a one-line testimonial)", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Click-through rate", "Signup rate", "Landing page bounce rate"] },
      { name: "Urgency in subject line", hypothesis: "Adding urgency or scarcity language to the subject line will increase open rate", control: "Standard subject line without urgency", variant: "Subject line with time-limited or scarcity language", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 10, metrics: ["Open rate", "Click-through rate", "Unsubscribe rate"] },
      { name: "Plain text vs. HTML", hypothesis: "Plain text emails will feel more personal and increase reply and signup rates for B2B audiences", control: "Designed HTML email with images and branding", variant: "Plain text email that feels like a personal message", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 6, ease: 9, metrics: ["Open rate", "Reply rate", "Click-through rate", "Signup rate"] },
      { name: "From name testing", hypothesis: "Emails from a person name will get higher open rates than from a company name", control: "From name is the company or brand name", variant: "From name is a person at the company (first name + company)", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 10, metrics: ["Open rate", "Click-through rate", "Reply rate"] },
    ],
    purchases: [
      { name: "Abandoned cart email timing", hypothesis: "Sending the first abandoned cart email within 1 hour will recover more purchases than later emails", control: "Abandoned cart email sent 24 hours after abandonment", variant: "Abandoned cart email sent within 1 hour of abandonment", expectedImpact: "High", difficulty: "Easy", impact: 9, confidence: 8, ease: 8, metrics: ["Cart recovery rate", "Revenue recovered", "Purchase completion rate"] },
      { name: "Product image in email", hypothesis: "Including product images in purchase-driving emails will increase visual appeal and purchase rate", control: "Text-only product descriptions in email", variant: "High-quality product images with descriptions and buy links", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 8, ease: 8, metrics: ["Click-through rate", "Purchase rate", "Revenue per email"] },
      { name: "Discount incentive offer", hypothesis: "A discount code in the email will increase the purchase conversion rate", control: "Email promoting products at full price", variant: "Email with a limited-time discount code for the promoted products", expectedImpact: "High", difficulty: "Easy", impact: 8, confidence: 7, ease: 8, metrics: ["Purchase rate", "Revenue per email", "Coupon redemption rate", "Margin impact"] },
      { name: "Email sequence length", hypothesis: "A 3-email nurture sequence will convert more purchases than a single promotional email", control: "Single promotional email", variant: "3-email sequence (value content, social proof, offer)", expectedImpact: "High", difficulty: "Medium", impact: 8, confidence: 7, ease: 5, metrics: ["Sequence completion rate", "Purchase rate", "Revenue per sequence"] },
      { name: "Product recommendation personalization", hypothesis: "Personalized product recommendations based on browse history will increase purchase rate", control: "Generic product recommendations for all recipients", variant: "Personalized recommendations based on browsing or purchase history", expectedImpact: "High", difficulty: "Hard", impact: 9, confidence: 7, ease: 4, metrics: ["Click-through rate", "Purchase rate", "Revenue per email", "Average order value"] },
      { name: "Scarcity messaging", hypothesis: "Low stock or limited availability messaging will create urgency for purchase emails", control: "Standard product promotion without scarcity", variant: "Low stock indicators or limited availability messaging for featured products", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 7, ease: 8, metrics: ["Click-through rate", "Purchase rate", "Revenue per email"] },
      { name: "Free shipping threshold", hypothesis: "Highlighting a free shipping threshold in email will increase purchase rate and average order value", control: "No shipping information in promotional emails", variant: "Free shipping threshold callout with progress indicator or qualifying amount", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 7, ease: 8, metrics: ["Purchase rate", "Average order value", "Revenue per email"] },
      { name: "Review highlights in email", hypothesis: "Including top customer reviews in product emails will build trust and increase purchases", control: "Product emails without review content", variant: "1-2 top customer reviews or ratings included below product descriptions", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Click-through rate", "Purchase rate", "Landing page bounce rate"] },
      { name: "Post-purchase cross-sell timing", hypothesis: "Cross-sell emails sent 3-5 days after purchase will convert better than same-day emails", control: "Cross-sell email sent immediately after purchase confirmation", variant: "Cross-sell email sent 3-5 days after purchase delivery", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Cross-sell purchase rate", "Revenue per email", "Unsubscribe rate"] },
      { name: "Email-exclusive pricing", hypothesis: "Email-exclusive pricing will make subscribers feel valued and increase purchase rate", control: "Same pricing available everywhere", variant: "Email-exclusive pricing or early access to sales for subscribers", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 7, ease: 7, metrics: ["Purchase rate", "Revenue per email", "Email list growth rate"] },
    ],
    engagement: [
      { name: "Subject line length", hypothesis: "Shorter subject lines (under 40 characters) will increase open rates on mobile devices", control: "Long subject lines (50+ characters)", variant: "Short subject lines (under 40 characters) focused on curiosity or benefit", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 10, metrics: ["Open rate", "Mobile open rate", "Click-through rate"] },
      { name: "Interactive email elements", hypothesis: "Interactive elements (polls, quizzes, countdown timers) will increase email engagement", control: "Static email content with text and images only", variant: "Interactive element (poll, quiz, or countdown timer) embedded in email", expectedImpact: "Medium", difficulty: "Hard", impact: 7, confidence: 6, ease: 4, metrics: ["Interaction rate", "Click-through rate", "Time spent in email"] },
      { name: "Content curation email", hypothesis: "A curated content roundup email will drive more engagement than single-topic emails", control: "Single-topic promotional or content email", variant: "Curated roundup with 3-5 content pieces and brief summaries", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Click-through rate", "Total clicks per email", "Unsubscribe rate"] },
      { name: "Email frequency", hypothesis: "Adjusting email frequency to match engagement level will optimize open rates", control: "Same email frequency for all subscribers", variant: "Frequency adjusted based on engagement (more for active, less for inactive)", expectedImpact: "Medium", difficulty: "Hard", impact: 7, confidence: 7, ease: 4, metrics: ["Open rate", "Click-through rate", "Unsubscribe rate", "List health"] },
      { name: "Emoji in subject line", hypothesis: "A single relevant emoji in the subject line will increase visual standout and open rate", control: "Subject line with no emoji", variant: "Subject line with one relevant emoji at the beginning or end", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 6, ease: 10, metrics: ["Open rate", "Click-through rate"] },
      { name: "GIF vs. static image", hypothesis: "An animated GIF will draw more attention than a static image in the email body", control: "Static product or hero image", variant: "Animated GIF showing product in use or key benefit", expectedImpact: "Low", difficulty: "Medium", impact: 5, confidence: 6, ease: 7, metrics: ["Click-through rate", "Image engagement", "Email render time"] },
      { name: "Content segmentation", hypothesis: "Segmented content based on subscriber interests will increase relevance and engagement", control: "Same email content sent to the entire list", variant: "Content personalized or segmented by subscriber interest or behavior", expectedImpact: "High", difficulty: "Hard", impact: 8, confidence: 7, ease: 3, metrics: ["Open rate", "Click-through rate", "Unsubscribe rate", "Revenue per email"] },
      { name: "Re-engagement email copy", hypothesis: "A direct re-engagement email will recover inactive subscribers better than continuing standard sends", control: "Standard emails to inactive subscribers", variant: "Dedicated re-engagement email with miss you messaging and special offer", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Re-engagement rate", "Open rate for inactive segment", "List cleanup rate"] },
      { name: "Email footer optimization", hypothesis: "A useful email footer with quick links will increase secondary clicks and engagement", control: "Minimal footer with unsubscribe only", variant: "Enhanced footer with popular links, social profiles, and quick navigation", expectedImpact: "Low", difficulty: "Easy", impact: 4, confidence: 6, ease: 9, metrics: ["Footer click rate", "Social profile visits", "Secondary page visits"] },
      { name: "Welcome email sequence", hypothesis: "A multi-email welcome sequence will build stronger engagement than a single welcome email", control: "Single welcome email after signup", variant: "3-5 email welcome sequence introducing value, features, and next steps", expectedImpact: "High", difficulty: "Medium", impact: 8, confidence: 8, ease: 5, metrics: ["Welcome sequence open rate", "Click-through rate", "30-day engagement rate"] },
    ],
    clicks: [
      { name: "CTA button size and color", hypothesis: "A larger, higher-contrast CTA button will receive more clicks in emails", control: "Standard-sized CTA button", variant: "Larger CTA button with maximum contrast against email background", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 8, ease: 10, metrics: ["CTA click rate", "Click-to-open rate"] },
      { name: "CTA placement in email", hypothesis: "Placing the CTA above the fold (visible without scrolling) will increase click rate", control: "CTA placed below the main content (requires scrolling)", variant: "CTA placed immediately visible without scrolling, with a second CTA at the bottom", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 8, ease: 9, metrics: ["CTA click rate", "Click-to-open rate"] },
      { name: "CTA copy specificity", hypothesis: "Specific CTA copy will outperform generic text because it sets clear expectations", control: "Generic CTA (Learn More, Click Here)", variant: "Specific CTA (See the Case Study, Get My Free Audit, Start Building)", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 8, ease: 10, metrics: ["CTA click rate", "Landing page engagement"] },
      { name: "Multiple CTA buttons", hypothesis: "Repeating the CTA button at multiple points will catch readers at different scroll depths", control: "Single CTA button in the email", variant: "Same CTA button repeated 2-3 times throughout the email", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 9, metrics: ["Total CTA click rate", "Click-to-open rate"] },
      { name: "Image as clickable link", hypothesis: "Making the hero image a clickable link will increase total click rate", control: "Hero image not linked", variant: "Hero image linked to the same destination as the CTA", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 10, metrics: ["Image click rate", "Total click rate"] },
      { name: "Bullet point formatting", hypothesis: "Bullet points highlighting benefits will increase readability and click-through rate", control: "Paragraph-format email body", variant: "Key benefits in bullet points followed by CTA", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 9, metrics: ["Click-through rate", "Read depth", "CTA click rate"] },
      { name: "PS line with link", hypothesis: "A PS line at the end of the email with a link will capture additional clicks from thorough readers", control: "Email ends after the main CTA", variant: "PS line with an alternative value proposition and link", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 7, ease: 10, metrics: ["PS link click rate", "Total click rate"] },
      { name: "Social proof near CTA", hypothesis: "A brief social proof element just above the CTA will increase confidence and clicks", control: "CTA with no supporting social proof", variant: "One-line social proof (trusted by X companies or X% saw results) above CTA", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 9, metrics: ["CTA click rate", "Landing page engagement"] },
      { name: "Text link in header", hypothesis: "A linked text line at the very top (before the hero) will capture quick-scanning readers", control: "Email starts with hero image or greeting", variant: "Short linked text at the top of the email previewing the CTA action", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 6, ease: 10, metrics: ["Header link click rate", "Total click rate"] },
      { name: "Mobile email optimization", hypothesis: "Mobile-optimized email layout will increase click rate on mobile devices", control: "Desktop-first email design viewed on mobile", variant: "Responsive design with large touch-friendly CTA and single-column layout", expectedImpact: "High", difficulty: "Medium", impact: 8, confidence: 8, ease: 6, metrics: ["Mobile click rate", "Mobile click-to-open rate", "Desktop vs. mobile performance"] },
    ],
    downloads: [
      { name: "Lead magnet delivery email", hypothesis: "A well-designed delivery email with the download will increase actual download completion", control: "Plain confirmation email with download link", variant: "Designed delivery email with preview, clear download button, and next steps", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 8, ease: 8, metrics: ["Download completion rate", "Email open rate", "Next step click rate"] },
      { name: "Content teaser before download", hypothesis: "Previewing key findings in the email will increase anticipation and download rate", control: "Email with title and download link only", variant: "Email with 2-3 key findings teased plus download button for the full resource", expectedImpact: "Medium", difficulty: "Easy", impact: 7, confidence: 7, ease: 8, metrics: ["Download rate", "Email engagement", "Content completion rate"] },
      { name: "Download reminder sequence", hypothesis: "A reminder email for non-downloaders will increase total download completion rate", control: "Single download delivery email with no follow-up", variant: "Reminder email 2-3 days later for those who have not downloaded", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 7, ease: 8, metrics: ["Download completion rate", "Reminder email open rate", "Unsubscribe rate"] },
      { name: "Related resource recommendation", hypothesis: "Recommending related resources after download will increase multi-asset engagement", control: "No follow-up after the initial download delivery", variant: "Follow-up email with 2-3 related resources based on the downloaded content", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 6, ease: 8, metrics: ["Follow-up click rate", "Multi-download rate", "Engagement depth"] },
      { name: "Direct attachment vs. download link", hypothesis: "Attaching the file directly will increase consumption for smaller files", control: "Download link in the email body", variant: "File attached directly to the email (for PDFs under 5MB)", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 6, ease: 8, metrics: ["File access rate", "Email deliverability", "Engagement with content"] },
      { name: "Download CTA design", hypothesis: "A prominent download button will increase click rate compared to a text link", control: "Text hyperlink for the download", variant: "Large, styled download button with file type and size indicators", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 8, ease: 9, metrics: ["Download click rate", "Download completion rate"] },
      { name: "Multi-format download option", hypothesis: "Offering the download in multiple formats will increase overall download rate", control: "Single format download link (PDF only)", variant: "Multiple format options (PDF, EPUB, audio summary) in the email", expectedImpact: "Low", difficulty: "Medium", impact: 5, confidence: 5, ease: 6, metrics: ["Download rate by format", "Total download rate", "Format preference"] },
      { name: "Exclusive content for subscribers", hypothesis: "Labeling content as subscriber-exclusive will increase perceived value and downloads", control: "Download available to anyone, promoted to subscribers", variant: "Content labeled as subscriber-exclusive with exclusive badge", expectedImpact: "Medium", difficulty: "Easy", impact: 6, confidence: 6, ease: 9, metrics: ["Download rate", "Subscriber retention", "Perceived value score"] },
      { name: "Social proof for downloads", hypothesis: "Showing download count in the email will increase download rate through social proof", control: "Download CTA without social proof", variant: "Download count or subscriber testimonial about the resource near the CTA", expectedImpact: "Low", difficulty: "Easy", impact: 5, confidence: 6, ease: 9, metrics: ["Download rate", "CTA click rate"] },
      { name: "Post-download survey", hypothesis: "A brief post-download survey will increase engagement and provide content optimization data", control: "No follow-up after download", variant: "Brief 2-question survey email sent after download asking about usefulness and interests", expectedImpact: "Low", difficulty: "Easy", impact: 4, confidence: 6, ease: 8, metrics: ["Survey response rate", "Content satisfaction score", "Subsequent engagement"] },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Impact/difficulty label helpers                                    */
/* ------------------------------------------------------------------ */

const impactColors: Record<string, string> = {
  High: "bg-black text-white",
  Medium: "bg-gray-200 text-black",
  Low: "border border-gray-300 text-black",
};

const difficultyLabels: Record<string, string> = {
  Easy: "bg-white text-black border border-gray-300",
  Medium: "bg-gray-200 text-black",
  Hard: "bg-black text-white",
};

/* ------------------------------------------------------------------ */
/*  Copy-to-clipboard button                                           */
/* ------------------------------------------------------------------ */

function CopyButton({ text, label }: { text: string; label?: string }) {
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
      aria-label="Copy to clipboard"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-300 text-black hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "A/B Test Ideas Generator",
          description: "Free A/B test ideas generator. Select your page type and conversion goal to get a prioritized list of test ideas with hypotheses, ICE scores, and sample size recommendations.",
          url: "https://themarkitmedia.com/en/resources/ab-test-ideas",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      {copied ? "Copied" : label || "Copy to Clipboard"}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Download-as-text button                                            */
/* ------------------------------------------------------------------ */

function DownloadButton({ text, filename }: { text: string; filename: string }) {
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
      aria-label="Download as text file"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold bg-black text-white hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      Download as Text
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Test idea card                                                     */
/* ------------------------------------------------------------------ */

function TestIdeaCard({ idea, rank }: { idea: TestIdea; rank: number }) {
  const score = iceScore(idea.impact, idea.confidence, idea.ease);

  return (
    <div className="border border-gray-200 p-6 lg:p-8">
      {/* Header row */}
      <div className="flex flex-wrap items-start gap-4 mb-4">
        <span className="text-base font-bold text-white bg-black w-8 h-8 inline-flex items-center justify-center shrink-0">
          {rank}
        </span>
        <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black flex-1 min-w-0">
          {idea.name}
        </h3>
        <span className="text-base font-extrabold text-black whitespace-nowrap">
          ICE: {score}
        </span>
      </div>

      {/* Hypothesis */}
      <p className="text-base text-gray-600 leading-relaxed mb-6">
        <strong className="text-black">Hypothesis:</strong> {idea.hypothesis}
      </p>

      {/* Control vs Variant */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4">
          <p className="text-base font-bold text-black mb-1">Control</p>
          <p className="text-base text-gray-600">{idea.control}</p>
        </div>
        <div className="bg-gray-50 p-4 border-l-4 border-black">
          <p className="text-base font-bold text-black mb-1">Variant</p>
          <p className="text-base text-gray-600">{idea.variant}</p>
        </div>
      </div>

      {/* Tags row */}
      <div className="flex flex-wrap gap-3 mb-4">
        <span className={`inline-flex items-center px-3 py-1 text-base font-bold ${impactColors[idea.expectedImpact]}`}>
          {idea.expectedImpact} Impact
        </span>
        <span className={`inline-flex items-center px-3 py-1 text-base font-bold ${difficultyLabels[idea.difficulty]}`}>
          {idea.difficulty}
        </span>
      </div>

      {/* ICE breakdown */}
      <div className="flex flex-wrap gap-6 mb-4 text-base text-gray-600">
        <span>
          Impact: <strong className="text-black">{idea.impact}</strong>/10
        </span>
        <span>
          Confidence: <strong className="text-black">{idea.confidence}</strong>/10
        </span>
        <span>
          Ease: <strong className="text-black">{idea.ease}</strong>/10
        </span>
      </div>

      {/* Metrics */}
      <div>
        <p className="text-base font-bold text-black mb-2">Metrics to Track</p>
        <div className="flex flex-wrap gap-2">
          {idea.metrics.map((m) => (
            <span
              key={m}
              className="inline-flex items-center px-3 py-1 text-base border border-gray-200 text-gray-600"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function ABTestIdeasPage() {
  const [pageType, setPageType] = useState<PageType>("landing-page");
  const [goal, setGoal] = useState<ConversionGoal>("signups");
  const [dailyTraffic, setDailyTraffic] = useState("");
  const [conversionRate, setConversionRate] = useState("");
  const [results, setResults] = useState<TestIdea[] | null>(null);

  const generate = () => {
    const ideas = [...testIdeasDB[pageType][goal]];
    ideas.sort(
      (a, b) =>
        iceScore(b.impact, b.confidence, b.ease) -
        iceScore(a.impact, a.confidence, a.ease)
    );
    setResults(ideas.slice(0, 10));
  };

  const reset = () => {
    setPageType("landing-page");
    setGoal("signups");
    setDailyTraffic("");
    setConversionRate("");
    setResults(null);
  };

  /* Build export text */
  const buildExportText = useCallback(() => {
    if (!results) return "";

    const traffic = parseInt(dailyTraffic, 10);
    const cr = parseFloat(conversionRate) / 100;
    const selectedPageLabel =
      pageTypes.find((p) => p.value === pageType)?.label || pageType;
    const selectedGoalLabel =
      conversionGoals.find((g) => g.value === goal)?.label || goal;

    let text = `A/B TEST IDEAS\n`;
    text += `==============\n\n`;
    text += `Page Type: ${selectedPageLabel}\n`;
    text += `Conversion Goal: ${selectedGoalLabel}\n`;
    if (dailyTraffic) text += `Daily Traffic: ${traffic.toLocaleString()}\n`;
    if (conversionRate) text += `Conversion Rate: ${conversionRate}%\n`;
    text += `\n`;

    results.forEach((idea, i) => {
      const score = iceScore(idea.impact, idea.confidence, idea.ease);
      text += `${i + 1}. ${idea.name} (ICE: ${score})\n`;
      text += `   Hypothesis: ${idea.hypothesis}\n`;
      text += `   Control: ${idea.control}\n`;
      text += `   Variant: ${idea.variant}\n`;
      text += `   Expected Impact: ${idea.expectedImpact} | Difficulty: ${idea.difficulty}\n`;
      text += `   ICE Breakdown: Impact ${idea.impact}/10, Confidence ${idea.confidence}/10, Ease ${idea.ease}/10\n`;
      text += `   Metrics: ${idea.metrics.join(", ")}\n`;

      if (dailyTraffic && conversionRate && !isNaN(traffic) && !isNaN(cr) && cr > 0 && cr < 1 && traffic > 0) {
        const liftMap: Record<string, number> = { High: 20, Medium: 10, Low: 5 };
        const expectedLift = liftMap[idea.expectedImpact] || 10;
        const sampleSize = estimateSampleSize(cr, expectedLift);
        const days = sampleSize > 0 ? Math.ceil(sampleSize / traffic) : 0;
        text += `   Sample Size: ~${sampleSize.toLocaleString()} visitors | Est. Duration: ~${days} days\n`;
      }

      text += `\n`;
    });

    text += `---\nGenerated by Markit Media A/B Test Ideas Generator\nhttps://themarkitmedia.com/resources/ab-test-ideas\n`;
    return text;
  }, [results, pageType, goal, dailyTraffic, conversionRate]);

  /* Sample size for individual idea */
  const getSampleInfo = (idea: TestIdea) => {
    const traffic = parseInt(dailyTraffic, 10);
    const cr = parseFloat(conversionRate) / 100;
    if (!dailyTraffic || !conversionRate || isNaN(traffic) || isNaN(cr) || cr <= 0 || cr >= 1 || traffic <= 0)
      return null;
    const liftMap: Record<string, number> = { High: 20, Medium: 10, Low: 5 };
    const expectedLift = liftMap[idea.expectedImpact] || 10;
    const sampleSize = estimateSampleSize(cr, expectedLift);
    const days = sampleSize > 0 ? Math.ceil(sampleSize / traffic) : 0;
    return { sampleSize, days };
  };

  return (
    <article className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "A/B Test Ideas Generator",
          description:
            "Free A/B test ideas generator. Select your page type and conversion goal to get a prioritized list of test ideas with hypotheses, ICE scores, and sample size recommendations.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "A/B Test Ideas Generator" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              A/B Test Ideas Generator
            </h1>
            <SectionDesc>
              Select your page type and conversion goal to get a prioritized
              list of A/B test ideas. Each idea includes a hypothesis, control
              vs. variant description, ICE score, and metrics to track.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Inputs ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Page Type */}
          <Animate animation="fade-up">
            <div>
              <label
                htmlFor="page-type"
                className="block text-base font-bold text-black mb-2"
              >
                Page Type
              </label>
              <select
                id="page-type"
                value={pageType}
                onChange={(e) => {
                  setPageType(e.target.value as PageType);
                  setResults(null);
                }}
                className="w-full px-4 py-3 border border-gray-200 text-base bg-white text-black appearance-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                {pageTypes.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </Animate>

          {/* Conversion Goal */}
          <Animate animation="fade-up" delay={40}>
            <div>
              <label
                htmlFor="conversion-goal"
                className="block text-base font-bold text-black mb-2"
              >
                Conversion Goal
              </label>
              <select
                id="conversion-goal"
                value={goal}
                onChange={(e) => {
                  setGoal(e.target.value as ConversionGoal);
                  setResults(null);
                }}
                className="w-full px-4 py-3 border border-gray-200 text-base bg-white text-black appearance-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                {conversionGoals.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
          </Animate>

          {/* Daily Traffic (optional) */}
          <Animate animation="fade-up" delay={80}>
            <div>
              <label
                htmlFor="daily-traffic"
                className="block text-base font-bold text-black mb-2"
              >
                Daily Traffic{" "}
                <span className="font-normal text-gray-500">(optional)</span>
              </label>
              <input
                id="daily-traffic"
                type="number"
                min="1"
                step="1"
                value={dailyTraffic}
                onChange={(e) => setDailyTraffic(e.target.value)}
                placeholder="e.g. 5000"
                className="w-full border border-gray-200 px-4 py-3 text-base text-black bg-white min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 motion-reduce:transition-none"
              />
              <p className="text-base text-gray-400 mt-1">
                Enter your daily page traffic to get sample size and duration
                estimates for each test.
              </p>
            </div>
          </Animate>

          {/* Current Conversion Rate (optional) */}
          <Animate animation="fade-up" delay={120}>
            <div>
              <label
                htmlFor="conversion-rate"
                className="block text-base font-bold text-black mb-2"
              >
                Current Conversion Rate (%){" "}
                <span className="font-normal text-gray-500">(optional)</span>
              </label>
              <input
                id="conversion-rate"
                type="number"
                min="0.01"
                max="99"
                step="0.01"
                value={conversionRate}
                onChange={(e) => setConversionRate(e.target.value)}
                placeholder="e.g. 3.5"
                className="w-full border border-gray-200 px-4 py-3 text-base text-black bg-white min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 motion-reduce:transition-none"
              />
              <p className="text-base text-gray-400 mt-1">
                Used alongside daily traffic to estimate sample size requirements
                per test.
              </p>
            </div>
          </Animate>

          {/* Buttons */}
          <Animate animation="fade-up" delay={160}>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                type="button"
                onClick={generate}
                className="bg-black text-white px-10 py-4 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none min-h-[44px] min-w-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Generate Test Ideas
              </button>
              <button
                type="button"
                onClick={reset}
                className="border border-gray-300 text-black px-8 py-4 font-bold text-base hover:border-black transition-colors motion-reduce:transition-none min-h-[44px] min-w-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Reset
              </button>
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Results ---- */}
      {results && (
        <section aria-label="Your A/B Test Ideas" className="px-6 lg:px-12 py-12">
          <div className="max-w-4xl mx-auto">
            <Animate animation="fade-up">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
                  Your A/B Test Ideas
                </h2>
                <div className="flex flex-wrap gap-3">
                  <CopyButton text={buildExportText()} />
                  <DownloadButton
                    text={buildExportText()}
                    filename={`ab-test-ideas-${pageType}-${goal}.txt`}
                  />
                </div>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={60}>
              <div className="flex flex-wrap gap-3 mb-8 text-base">
                <span className="bg-black text-white px-4 py-2 font-bold">
                  {pageTypes.find((p) => p.value === pageType)?.label}
                </span>
                <span className="border border-black text-black px-4 py-2 font-bold">
                  {conversionGoals.find((g) => g.value === goal)?.label}
                </span>
                {dailyTraffic && (
                  <span className="border border-gray-300 text-black px-4 py-2">
                    {parseInt(dailyTraffic, 10).toLocaleString()} daily visitors
                  </span>
                )}
                {conversionRate && (
                  <span className="border border-gray-300 text-black px-4 py-2">
                    {conversionRate}% conversion rate
                  </span>
                )}
              </div>
            </Animate>

            <Stagger stagger={80} animation="fade-up" className="space-y-6">
              {results.map((idea, i) => {
                const sampleInfo = getSampleInfo(idea);
                return (
                  <div key={`${idea.name}-${i}`}>
                    <TestIdeaCard idea={idea} rank={i + 1} />
                    {sampleInfo && (
                      <div className="bg-gray-50 border border-t-0 border-gray-200 px-6 lg:px-8 py-4 flex flex-wrap gap-6 text-base">
                        <span className="text-gray-600">
                          Sample size:{" "}
                          <strong className="text-black">
                            ~{sampleInfo.sampleSize.toLocaleString()} visitors
                          </strong>
                        </span>
                        <span className="text-gray-600">
                          Estimated duration:{" "}
                          <strong className="text-black">
                            ~{sampleInfo.days} day
                            {sampleInfo.days !== 1 ? "s" : ""}
                          </strong>
                        </span>
                        <span className="text-gray-400">
                          (95% confidence, 80% power)
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </Stagger>

            <Animate animation="fade-up" delay={200}>
              <p className="text-base text-gray-400 mt-8 leading-relaxed">
                Sample size estimates use a two-proportion z-test with 95%
                confidence and 80% statistical power. Expected lift is estimated
                at 20% for high-impact tests, 10% for medium, and 5% for low.
                Actual requirements may vary based on your baseline metrics and
                traffic patterns.
              </p>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- How to Use Section ---- */}
      <section aria-label="How to Prioritize Your A/B Tests" className="px-6 lg:px-12 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight mb-8">
              How to Prioritize Your A/B Tests
            </h2>
          </Animate>

          <div className="space-y-12">
            <Animate animation="fade-up" delay={100}>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  Understanding ICE Scores
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  The ICE framework scores each test idea on three dimensions:
                  Impact (how much the test could move your target metric),
                  Confidence (how certain you are in the hypothesis based on
                  evidence), and Ease (how simple it is to implement). Each
                  dimension is rated 1-10, and the ICE score is the average of
                  all three. Higher scores indicate tests that deliver more
                  value relative to the effort required.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={200}>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  Start with High-ICE, Low-Difficulty Tests
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Begin with tests that have both a high ICE score and low
                  implementation difficulty. These quick wins build momentum
                  and generate learnings that inform more complex experiments
                  later. A headline test or CTA copy change can often be
                  deployed within hours and may yield meaningful lift.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={300}>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  Run One Test at a Time per Page
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Overlapping tests on the same page can interfere with each
                  other and produce unreliable results. Run a single test per
                  page or user flow at a time. Once a test reaches statistical
                  significance and you have implemented the winner, move to the
                  next highest-priority test on your backlog.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={400}>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  Document Everything
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Use the copy or download feature to save your test ideas.
                  For each test you run, record the hypothesis, start and end
                  dates, sample size, results, and decision. A testing archive
                  prevents you from repeating failed experiments and builds
                  institutional knowledge about what works for your audience.
                </p>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Running A/B Tests That Drive Real Results?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team designs, implements, and analyzes conversion experiments
              so you can make data-driven decisions with confidence.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Ab Test Ideas"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Ab Test Calculator", href: "/resources/ab-test-calculator" },
          { title: "Ad Budget Pacing", href: "/resources/ad-budget-pacing" },
          { title: "Ad Copy Analyzer", href: "/resources/ad-copy-analyzer" },
          { title: "Ad Copy Generator", href: "/resources/ad-copy-generator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
