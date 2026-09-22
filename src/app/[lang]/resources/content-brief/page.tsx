"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types & Options                                                    */
/* ------------------------------------------------------------------ */

type ContentType = "blog-post" | "landing-page" | "product-page" | "service-page" | "pillar-page";
type SearchIntent = "informational" | "commercial" | "navigational" | "transactional";
type WordCount = "500-800" | "800-1500" | "1500-2500" | "2500-4000" | "4000+";
type Competition = "low" | "medium" | "high" | "very-high";

const contentTypes: { id: ContentType; label: string }[] = [
  { id: "blog-post", label: "Blog Post" },
  { id: "landing-page", label: "Landing Page" },
  { id: "product-page", label: "Product Page" },
  { id: "service-page", label: "Service Page" },
  { id: "pillar-page", label: "Pillar Page" },
];

const searchIntents: { id: SearchIntent; label: string }[] = [
  { id: "informational", label: "Informational" },
  { id: "commercial", label: "Commercial" },
  { id: "navigational", label: "Navigational" },
  { id: "transactional", label: "Transactional" },
];

const wordCounts: { id: WordCount; label: string }[] = [
  { id: "500-800", label: "500-800" },
  { id: "800-1500", label: "800-1500" },
  { id: "1500-2500", label: "1500-2500" },
  { id: "2500-4000", label: "2500-4000" },
  { id: "4000+", label: "4000+" },
];

const competitions: { id: Competition; label: string }[] = [
  { id: "low", label: "Low" },
  { id: "medium", label: "Medium" },
  { id: "high", label: "High" },
  { id: "very-high", label: "Very High" },
];

/* ------------------------------------------------------------------ */
/*  Brief Generation Logic                                             */
/* ------------------------------------------------------------------ */

interface GeneratedBrief {
  suggestedTitle: string;
  metaTitle: string;
  metaDescription: string;
  headings: { tag: "H1" | "H2" | "H3"; text: string }[];
  contentOutline: { section: string; description: string }[];
  internalLinks: string[];
  seoChecklist: string[];
  estimatedTime: string;
}

const powerWords: Record<ContentType, string[]> = {
  "blog-post": ["Complete Guide to", "How to Master", "Everything You Need to Know About", "The Definitive Guide to"],
  "landing-page": ["Get Results With", "Transform Your Business With", "The Smarter Way to", "Unlock the Power of"],
  "product-page": ["Why Professionals Choose", "The Solution for", "Built for", "Designed to Deliver"],
  "service-page": ["Professional", "Expert", "Results-Driven", "Trusted"],
  "pillar-page": ["The Ultimate Resource for", "The Complete Framework for", "Everything About", "A to Z of"],
};

function capitalize(str: string): string {
  return str
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max - 3) + "...";
}

function buildHeadings(
  keyword: string,
  contentType: ContentType,
  intent: SearchIntent,
): { tag: "H1" | "H2" | "H3"; text: string }[] {
  const kw = capitalize(keyword);
  const headings: { tag: "H1" | "H2" | "H3"; text: string }[] = [];

  // H1
  const prefixes = powerWords[contentType];
  headings.push({ tag: "H1", text: `${prefixes[0]} ${kw}` });

  // H2s and H3s vary by content type and intent
  if (contentType === "blog-post") {
    headings.push({ tag: "H2", text: `What Is ${kw}?` });
    headings.push({ tag: "H3", text: `Key Definitions and Concepts` });
    headings.push({ tag: "H2", text: `Why ${kw} Matters` });
    headings.push({ tag: "H3", text: `Impact on Business Growth` });
    if (intent === "informational" || intent === "commercial") {
      headings.push({ tag: "H2", text: `How to Get Started With ${kw}` });
      headings.push({ tag: "H3", text: `Step-by-Step Process` });
      headings.push({ tag: "H3", text: `Tools and Resources` });
    }
    headings.push({ tag: "H2", text: `Best Practices for ${kw}` });
    headings.push({ tag: "H2", text: `Common Mistakes to Avoid` });
    headings.push({ tag: "H2", text: `Frequently Asked Questions` });
  } else if (contentType === "landing-page") {
    headings.push({ tag: "H2", text: `Why Choose Our ${kw} Solution` });
    headings.push({ tag: "H3", text: `Key Features` });
    headings.push({ tag: "H3", text: `How It Works` });
    headings.push({ tag: "H2", text: `Who Benefits From ${kw}` });
    headings.push({ tag: "H2", text: `What You Get` });
    headings.push({ tag: "H3", text: `Deliverables and Outcomes` });
    headings.push({ tag: "H2", text: `Ready to Get Started?` });
  } else if (contentType === "product-page") {
    headings.push({ tag: "H2", text: `${kw} Features` });
    headings.push({ tag: "H3", text: `Core Capabilities` });
    headings.push({ tag: "H3", text: `Technical Specifications` });
    headings.push({ tag: "H2", text: `How ${kw} Works` });
    headings.push({ tag: "H2", text: `Pricing and Plans` });
    headings.push({ tag: "H2", text: `Who Is ${kw} For?` });
    headings.push({ tag: "H2", text: `Getting Started` });
  } else if (contentType === "service-page") {
    headings.push({ tag: "H2", text: `Our ${kw} Services` });
    headings.push({ tag: "H3", text: `What Is Included` });
    headings.push({ tag: "H3", text: `Our Approach` });
    headings.push({ tag: "H2", text: `Why Businesses Choose Our ${kw}` });
    headings.push({ tag: "H2", text: `Our Process` });
    headings.push({ tag: "H3", text: `Discovery and Strategy` });
    headings.push({ tag: "H3", text: `Execution and Reporting` });
    headings.push({ tag: "H2", text: `Industries We Serve` });
    headings.push({ tag: "H2", text: `Frequently Asked Questions` });
  } else {
    // pillar-page
    headings.push({ tag: "H2", text: `What Is ${kw}?` });
    headings.push({ tag: "H3", text: `Definition and Core Concepts` });
    headings.push({ tag: "H2", text: `The History of ${kw}` });
    headings.push({ tag: "H2", text: `Types of ${kw}` });
    headings.push({ tag: "H3", text: `Category Breakdown` });
    headings.push({ tag: "H2", text: `How to Implement ${kw}` });
    headings.push({ tag: "H3", text: `Strategy and Planning` });
    headings.push({ tag: "H3", text: `Execution Steps` });
    headings.push({ tag: "H2", text: `${kw} Tools and Resources` });
    headings.push({ tag: "H2", text: `Future of ${kw}` });
  }

  return headings;
}

function buildOutline(
  keyword: string,
  contentType: ContentType,
  intent: SearchIntent,
  audience: string,
): { section: string; description: string }[] {
  const kw = capitalize(keyword);
  const aud = audience.trim() || "your target audience";

  const outlines: Record<SearchIntent, { section: string; description: string }[]> = {
    informational: [
      { section: "Introduction", description: `Define ${kw} and explain why ${aud} should care about this topic. Hook the reader with a specific problem this content solves.` },
      { section: "Background and Context", description: `Provide the foundational knowledge ${aud} needs. Cover key terminology and set expectations for what the piece will cover.` },
      { section: "Core Concepts", description: `Break down the main ideas around ${kw}. Use examples, analogies, or comparisons to make complex ideas accessible.` },
      { section: "Practical Application", description: `Show ${aud} how to apply what they have learned. Include actionable steps, frameworks, or templates.` },
      { section: "Common Pitfalls", description: `Address mistakes or misconceptions related to ${kw}. Help readers avoid wasted time or resources.` },
      { section: "Conclusion and Next Steps", description: `Summarize key takeaways and give readers a clear next action. Link to related resources.` },
    ],
    commercial: [
      { section: "Introduction", description: `Address the buying decision ${aud} is facing around ${kw}. Acknowledge the challenge of choosing the right solution.` },
      { section: "What to Look For", description: `Outline the criteria ${aud} should evaluate when comparing ${kw} options. Be specific about features, pricing models, and outcomes.` },
      { section: "Comparison Framework", description: `Provide an objective framework for evaluating ${kw} solutions. Focus on what matters most to ${aud}.` },
      { section: "Use Cases", description: `Describe specific scenarios where ${kw} delivers results. Match use cases to ${aud} needs.` },
      { section: "Decision Guide", description: `Help ${aud} make a confident decision. Address remaining objections and provide a clear recommendation path.` },
      { section: "Call to Action", description: `Direct ${aud} to the next step, whether that is requesting a demo, starting a trial, or contacting the team.` },
    ],
    navigational: [
      { section: "Overview", description: `Provide a clear, concise overview of ${kw} for ${aud} looking for specific information or resources.` },
      { section: "Quick Access Guide", description: `Direct users to the most relevant sections or pages. Prioritize the information ${aud} is most likely searching for.` },
      { section: "Key Features", description: `Highlight the primary features or sections related to ${kw}. Keep descriptions scannable and link-rich.` },
      { section: "Resources and Links", description: `Curate the most useful resources, documentation, or tools for ${aud}. Organize by use case or experience level.` },
      { section: "Support and Contact", description: `Provide clear paths to get help or more information about ${kw}.` },
    ],
    transactional: [
      { section: "Value Proposition", description: `Lead with the primary benefit of ${kw} for ${aud}. Make the value clear in the first two sentences.` },
      { section: "What You Get", description: `Detail exactly what ${aud} receives. Be specific about deliverables, timelines, and outcomes.` },
      { section: "How It Works", description: `Explain the process from purchase or signup to results. Remove uncertainty for ${aud}.` },
      { section: "Social Proof", description: `Include relevant proof points. Focus on outcomes that resonate with ${aud}.` },
      { section: "Pricing and Options", description: `Present pricing or packages clearly. Help ${aud} choose the right option for their needs.` },
      { section: "Final CTA", description: `Create urgency and remove final objections. Make the conversion action obvious and easy.` },
    ],
  };

  // Adjust for content type
  const base = outlines[intent];
  if (contentType === "pillar-page") {
    base.push({
      section: "Related Topics Hub",
      description: `Link to all cluster content related to ${kw}. Organize subtopics in a logical hierarchy for ${aud}.`,
    });
  }

  return base;
}

function buildInternalLinks(contentType: ContentType): string[] {
  const links: Record<ContentType, string[]> = {
    "blog-post": [
      "Link to 2-3 related blog posts covering subtopics or related keywords",
      "Link to a relevant service or product page to capture commercial intent",
      "Link to a pillar page or resource hub if one exists for this topic cluster",
      "Include a contextual link to your contact or consultation page",
    ],
    "landing-page": [
      "Link to detailed service pages for each feature mentioned",
      "Link to case studies or portfolio items as social proof",
      "Link to a pricing page or comparison page if applicable",
      "Include a footer link to relevant blog content for users not ready to convert",
    ],
    "product-page": [
      "Link to comparison pages or alternatives content",
      "Link to documentation, guides, or knowledge base articles",
      "Cross-link to complementary products or add-ons",
      "Link to customer stories or use-case pages",
    ],
    "service-page": [
      "Link to industry-specific landing pages if available",
      "Link to related services that complement this offering",
      "Link to relevant case studies showing results for this service",
      "Include links to educational blog posts that build trust",
      "Link to your process or methodology page",
    ],
    "pillar-page": [
      "Link to every cluster content piece within this topic",
      "Include jump links or a table of contents linking to each section",
      "Link to related pillar pages covering adjacent topics",
      "Link to tools, calculators, or interactive resources on your site",
      "Add contextual links to service or product pages where relevant",
    ],
  };

  return links[contentType];
}

function buildSeoChecklist(
  keyword: string,
  wordCountRange: WordCount,
  competition: Competition,
): string[] {
  const kw = keyword.trim() || "target keyword";
  const items: string[] = [
    `Include "${kw}" in the H1, meta title, and first 100 words of the body`,
    `Use the keyword naturally 3-5 times throughout the content (avoid stuffing)`,
    `Add 2-4 variations or long-tail versions of "${kw}" as H2 or H3 headings`,
    `Write a meta description under 155 characters that includes the keyword and a call to action`,
    `Add alt text with the keyword to at least one image`,
    `Include internal links to 3 or more relevant pages on your site`,
    `Add at least one external link to a high-authority source`,
    `Ensure the URL slug contains the primary keyword`,
  ];

  if (competition === "high" || competition === "very-high") {
    items.push(`Add a FAQ section with schema markup to improve SERP visibility`);
    items.push(`Include original data, quotes, or unique insights competitors do not cover`);
  }

  if (wordCountRange === "2500-4000" || wordCountRange === "4000+") {
    items.push(`Add a table of contents with jump links for scannability`);
  }

  return items;
}

function estimateWriteTime(wordCountRange: WordCount, competition: Competition): string {
  const baseTimes: Record<WordCount, [number, number]> = {
    "500-800": [1, 2],
    "800-1500": [2, 4],
    "1500-2500": [4, 6],
    "2500-4000": [6, 10],
    "4000+": [10, 16],
  };

  const [low, high] = baseTimes[wordCountRange];
  const multiplier = competition === "very-high" ? 1.5 : competition === "high" ? 1.25 : 1;
  const adjLow = Math.round(low * multiplier);
  const adjHigh = Math.round(high * multiplier);

  return `${adjLow}-${adjHigh} hours (including research, writing, and editing)`;
}

function generateBrief(
  keyword: string,
  contentType: ContentType,
  audience: string,
  intent: SearchIntent,
  wordCountRange: WordCount,
  competition: Competition,
): GeneratedBrief {
  const kw = keyword.trim() || "your keyword";
  const capKw = capitalize(kw);
  const prefixes = powerWords[contentType];

  const suggestedTitle = `${prefixes[0]} ${capKw}`;
  const metaTitle = truncate(`${capKw} - ${prefixes[1].replace("Your Business With", "Results")}`, 60);
  const metaDescription = truncate(
    `Learn about ${kw} and how it can help ${audience.trim() || "your business"}. ${contentType === "blog-post" ? "A practical guide with actionable steps." : "See what we offer and get started today."}`,
    155,
  );

  const headings = buildHeadings(kw, contentType, intent);
  const contentOutline = buildOutline(kw, contentType, intent, audience);
  const internalLinks = buildInternalLinks(contentType);
  const seoChecklist = buildSeoChecklist(kw, wordCountRange, competition);
  const estimatedTime = estimateWriteTime(wordCountRange, competition);

  return {
    suggestedTitle,
    metaTitle,
    metaDescription,
    headings,
    contentOutline,
    internalLinks,
    seoChecklist,
    estimatedTime,
  };
}

/* ------------------------------------------------------------------ */
/*  Reusable UI Helpers                                                */
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
      aria-label="Copy brief to clipboard"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      {copied ? "Copied" : "Copy to Clipboard"}
    </button>
  );
}

function ToggleGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="text-base font-bold text-black mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`min-h-[44px] px-5 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
              value === opt.id
                ? "bg-black text-white"
                : "border border-gray-200 text-gray-600 hover:border-black"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Format brief as text                                               */
/* ------------------------------------------------------------------ */

function briefToText(brief: GeneratedBrief, inputs: { keyword: string; contentType: string; audience: string; intent: string; wordCount: string; competition: string }): string {
  const lines: string[] = [];
  lines.push("SEO CONTENT BRIEF");
  lines.push("=================");
  lines.push("");
  lines.push(`Keyword: ${inputs.keyword}`);
  lines.push(`Content Type: ${inputs.contentType}`);
  lines.push(`Target Audience: ${inputs.audience}`);
  lines.push(`Search Intent: ${inputs.intent}`);
  lines.push(`Word Count: ${inputs.wordCount}`);
  lines.push(`Competition: ${inputs.competition}`);
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push(`SUGGESTED TITLE: ${brief.suggestedTitle}`);
  lines.push(`META TITLE: ${brief.metaTitle}`);
  lines.push(`META DESCRIPTION: ${brief.metaDescription}`);
  lines.push("");
  lines.push("HEADING STRUCTURE:");
  brief.headings.forEach((h) => {
    const indent = h.tag === "H2" ? "  " : h.tag === "H3" ? "    " : "";
    lines.push(`${indent}${h.tag}: ${h.text}`);
  });
  lines.push("");
  lines.push("CONTENT OUTLINE:");
  brief.contentOutline.forEach((s, i) => {
    lines.push(`${i + 1}. ${s.section}`);
    lines.push(`   ${s.description}`);
  });
  lines.push("");
  lines.push("INTERNAL LINKING RECOMMENDATIONS:");
  brief.internalLinks.forEach((l) => {
    lines.push(`- ${l}`);
  });
  lines.push("");
  lines.push("SEO CHECKLIST:");
  brief.seoChecklist.forEach((item) => {
    lines.push(`[ ] ${item}`);
  });
  lines.push("");
  lines.push(`ESTIMATED TIME: ${brief.estimatedTime}`);
  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function ContentBriefPage() {
  const [keyword, setKeyword] = useState("");
  const [contentType, setContentType] = useState<ContentType>("blog-post");
  const [audience, setAudience] = useState("");
  const [intent, setIntent] = useState<SearchIntent>("informational");
  const [wordCount, setWordCount] = useState<WordCount>("1500-2500");
  const [competition, setCompetition] = useState<Competition>("medium");
  const [brief, setBrief] = useState<GeneratedBrief | null>(null);

  const canGenerate = keyword.trim().length > 0;

  const handleGenerate = () => {
    if (!canGenerate) return;
    setBrief(generateBrief(keyword, contentType, audience, intent, wordCount, competition));
  };

  const handleReset = () => {
    setKeyword("");
    setContentType("blog-post");
    setAudience("");
    setIntent("informational");
    setWordCount("1500-2500");
    setCompetition("medium");
    setBrief(null);
  };

  const briefText = brief
    ? briefToText(brief, {
        keyword: keyword.trim(),
        contentType: contentTypes.find((c) => c.id === contentType)?.label ?? contentType,
        audience: audience.trim() || "General",
        intent: searchIntents.find((i) => i.id === intent)?.label ?? intent,
        wordCount,
        competition: competitions.find((c) => c.id === competition)?.label ?? competition,
      })
    : "";

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "SEO Content Brief Generator",
          description:
            "Create SEO-optimized content briefs for blog posts, landing pages, service pages, and more. Get heading structures, content outlines, and SEO checklists.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Content Brief Generator" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              SEO Content Brief Generator
            </h1>
            <SectionDesc>
              Build a structured content brief for your next piece of content. Enter your target keyword and preferences to get a heading structure, content outline, and SEO checklist.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Inputs ---- */}
      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <Animate animation="fade-up">
            <div>
              <label htmlFor="keyword" className="block text-base font-bold text-black mb-2">
                Target Keyword
              </label>
              <input
                id="keyword"
                type="text"
                value={keyword}
                onChange={(e) => { setKeyword(e.target.value); setBrief(null); }}
                placeholder="e.g. content marketing strategy"
                className="w-full min-h-[44px] px-4 py-3 border border-gray-200 text-base focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
              />
            </div>
          </Animate>

          <Animate animation="fade-up" delay={40}>
            <ToggleGroup
              label="Content Type"
              options={contentTypes}
              value={contentType}
              onChange={(v) => { setContentType(v); setBrief(null); }}
            />
          </Animate>

          <Animate animation="fade-up" delay={80}>
            <div>
              <label htmlFor="audience" className="block text-base font-bold text-black mb-2">
                Target Audience
              </label>
              <input
                id="audience"
                type="text"
                value={audience}
                onChange={(e) => { setAudience(e.target.value); setBrief(null); }}
                placeholder="e.g. Marketing managers at B2B SaaS companies"
                className="w-full min-h-[44px] px-4 py-3 border border-gray-200 text-base focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
              />
            </div>
          </Animate>

          <Animate animation="fade-up" delay={120}>
            <ToggleGroup
              label="Search Intent"
              options={searchIntents}
              value={intent}
              onChange={(v) => { setIntent(v); setBrief(null); }}
            />
          </Animate>

          <Animate animation="fade-up" delay={160}>
            <ToggleGroup
              label="Target Word Count"
              options={wordCounts}
              value={wordCount}
              onChange={(v) => { setWordCount(v); setBrief(null); }}
            />
          </Animate>

          <Animate animation="fade-up" delay={200}>
            <ToggleGroup
              label="Competition Level"
              options={competitions}
              value={competition}
              onChange={(v) => { setCompetition(v); setBrief(null); }}
            />
          </Animate>

          <Animate animation="fade-up" delay={240}>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className={`min-h-[44px] px-8 py-4 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                  canGenerate
                    ? "bg-black text-white hover:bg-gray-900"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Generate Content Brief
              </button>
              {brief && (
                <button
                  onClick={handleReset}
                  className="min-h-[44px] px-8 py-4 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Reset
                </button>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Generated Brief ---- */}
      {brief && (
        <section className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <div className="border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="bg-black text-white p-6 flex flex-wrap items-center justify-between gap-4">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                    Content Brief: {capitalize(keyword.trim())}
                  </h2>
                  <CopyButton text={briefText} />
                </div>

                <div className="p-6 space-y-8">
                  {/* Suggested Title */}
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-2">
                      Suggested Title
                    </h3>
                    <p className="text-base text-gray-600 p-4 bg-gray-50 border border-gray-200">
                      {brief.suggestedTitle}
                    </p>
                  </div>

                  {/* Meta Title */}
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-2">
                      Meta Title Template
                    </h3>
                    <div className="p-4 bg-gray-50 border border-gray-200">
                      <p className="text-base text-gray-600">{brief.metaTitle}</p>
                      <p className={`text-base mt-2 ${brief.metaTitle.length > 60 ? "text-red-600 font-bold" : "text-gray-400"}`}>
                        {brief.metaTitle.length}/60 characters
                      </p>
                    </div>
                  </div>

                  {/* Meta Description */}
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-2">
                      Meta Description Template
                    </h3>
                    <div className="p-4 bg-gray-50 border border-gray-200">
                      <p className="text-base text-gray-600">{brief.metaDescription}</p>
                      <p className={`text-base mt-2 ${brief.metaDescription.length > 155 ? "text-red-600 font-bold" : "text-gray-400"}`}>
                        {brief.metaDescription.length}/155 characters
                      </p>
                    </div>
                  </div>

                  {/* Heading Structure */}
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">
                      Recommended Heading Structure
                    </h3>
                    <div className="space-y-2">
                      {brief.headings.map((h, i) => (
                        <div
                          key={i}
                          className={`p-3 border border-gray-200 flex items-center gap-3 ${
                            h.tag === "H1" ? "bg-black text-white" : h.tag === "H2" ? "bg-gray-50 ml-4" : "bg-white ml-8"
                          }`}
                        >
                          <span className={`text-base font-bold ${h.tag === "H1" ? "text-gray-300" : "text-gray-400"}`}>
                            {h.tag}
                          </span>
                          <span className={`text-base ${h.tag === "H1" ? "font-bold" : ""}`}>
                            {h.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content Outline */}
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">
                      Content Outline
                    </h3>
                    <div className="space-y-4">
                      {brief.contentOutline.map((s, i) => (
                        <div key={i} className="p-4 bg-gray-50 border border-gray-200">
                          <p className="text-base font-bold text-black">
                            {i + 1}. {s.section}
                          </p>
                          <p className="text-base text-gray-500 mt-1 leading-relaxed">
                            {s.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Internal Linking */}
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">
                      Internal Linking Recommendations
                    </h3>
                    <ul className="space-y-2">
                      {brief.internalLinks.map((link, i) => (
                        <li key={i} className="flex items-start gap-3 text-base text-gray-600">
                          <span className="text-black font-bold mt-0.5">&rarr;</span>
                          <span>{link}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* SEO Checklist */}
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">
                      SEO Checklist
                    </h3>
                    <div className="space-y-2">
                      {brief.seoChecklist.map((item, i) => (
                        <label
                          key={i}
                          className="flex items-start gap-3 p-3 border border-gray-200 hover:border-gray-300 transition-colors motion-reduce:transition-none cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="mt-1 w-5 h-5 accent-black flex-shrink-0"
                          />
                          <span className="text-base text-gray-600">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Estimated Time */}
                  <div className="p-4 bg-gray-50 border border-gray-200">
                    <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-1">
                      Estimated Time to Write
                    </h3>
                    <p className="text-base text-gray-600">{brief.estimatedTime}</p>
                  </div>
                </div>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Tips Section ---- */}
      <section className="px-6 lg:px-12 py-16 border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-8">
              Tips for Effective Content Briefs
            </h2>
          </Animate>
          <Stagger stagger={80} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-gray-200">
              <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-2">
                Start with search intent
              </h3>
              <p className="text-base text-gray-500 leading-relaxed">
                Match your content structure to what searchers actually want. Informational queries need depth and clarity. Transactional queries need social proof and clear calls to action. Getting intent wrong means your content will not rank, regardless of quality.
              </p>
            </div>
            <div className="p-6 border border-gray-200">
              <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-2">
                Build around headings first
              </h3>
              <p className="text-base text-gray-500 leading-relaxed">
                Your heading structure is the skeleton of your content. Get the H2s right before you write a single paragraph. Each heading should target a subtopic or question your audience is asking. This keeps the writing focused and improves scannability.
              </p>
            </div>
            <div className="p-6 border border-gray-200">
              <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-2">
                Define your audience precisely
              </h3>
              <p className="text-base text-gray-500 leading-relaxed">
                &quot;Business owners&quot; is too broad. &quot;Marketing managers at B2B SaaS companies with 50-200 employees&quot; is actionable. A specific audience shapes your tone, examples, depth of explanation, and the problems you address in the content.
              </p>
            </div>
            <div className="p-6 border border-gray-200">
              <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-2">
                Plan internal links early
              </h3>
              <p className="text-base text-gray-500 leading-relaxed">
                Decide which pages you will link to before you write. Internal links pass authority, guide users deeper into your site, and signal to search engines which pages matter most. Retrofitting links is less effective than building them into the brief.
              </p>
            </div>
          </Stagger>
        </div>
      </section>

      {/* ---- Bottom CTA ---- */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help With Content Strategy?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              A brief is the starting point. Our team plans, writes, and optimizes content that ranks and converts for your target audience.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get in Touch &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Content Brief"
        services={[
          { title: "Content Marketing", desc: "Strategic content that drives traffic, engagement, and conversions.", href: "/services/content-marketing" },
          { title: "SEO", desc: "Content optimized for search engines and human readers alike.", href: "/services/seo" },
          { title: "Social Media Marketing", desc: "Distribute your content where your audience already is.", href: "/services/social-media-marketing" },
        ]}
        relatedTools={[
          { title: "Content Audit Scorecard", href: "/resources/content-audit-scorecard" },
          { title: "Content Brief Generator", href: "/resources/content-brief-generator" },
          { title: "Content Calendar", href: "/resources/content-calendar" },
          { title: "Content Gap Analyzer", href: "/resources/content-gap-analyzer" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
