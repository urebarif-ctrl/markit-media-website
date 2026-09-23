"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

type ContentType = "blog-post" | "video" | "podcast" | "webinar" | "whitepaper";

interface Platform {
  id: string;
  label: string;
}

interface Derivative {
  id: string;
  format: string;
  platform: string;
  platformId: string;
  estimatedMinutes: number;
  adaptations: string[];
  sourceTypes: ContentType[];
}

interface KeyPoint {
  id: string;
  text: string;
}

const contentTypes: { id: ContentType; label: string; sizeLabel: string; sizeUnit: string }[] = [
  { id: "blog-post", label: "Blog Post", sizeLabel: "Word count", sizeUnit: "words" },
  { id: "video", label: "Video", sizeLabel: "Duration", sizeUnit: "minutes" },
  { id: "podcast", label: "Podcast Episode", sizeLabel: "Duration", sizeUnit: "minutes" },
  { id: "webinar", label: "Webinar", sizeLabel: "Duration", sizeUnit: "minutes" },
  { id: "whitepaper", label: "Whitepaper", sizeLabel: "Word count", sizeUnit: "words" },
];

const platforms: Platform[] = [
  { id: "linkedin", label: "LinkedIn" },
  { id: "instagram", label: "Instagram" },
  { id: "twitter", label: "Twitter/X" },
  { id: "youtube", label: "YouTube" },
  { id: "tiktok", label: "TikTok" },
  { id: "email", label: "Email" },
  { id: "blog", label: "Blog" },
  { id: "pinterest", label: "Pinterest" },
];

/* ------------------------------------------------------------------ */
/*  Derivative definitions by platform                                 */
/* ------------------------------------------------------------------ */

const derivativeTemplates: Derivative[] = [
  // LinkedIn
  { id: "li-text", format: "Text Post (key takeaway)", platform: "LinkedIn", platformId: "linkedin", estimatedMinutes: 15, adaptations: ["Extract a single insight or statistic", "Write in first-person professional tone", "Add a question or CTA at the end"], sourceTypes: ["blog-post", "video", "podcast", "webinar", "whitepaper"] },
  { id: "li-carousel", format: "Carousel / Document Post", platform: "LinkedIn", platformId: "linkedin", estimatedMinutes: 45, adaptations: ["Break content into 8–10 slide-sized points", "Design each slide with one idea", "Start with a hook slide, end with a CTA"], sourceTypes: ["blog-post", "webinar", "whitepaper"] },
  { id: "li-article", format: "LinkedIn Article", platform: "LinkedIn", platformId: "linkedin", estimatedMinutes: 30, adaptations: ["Adapt to LinkedIn's native article format", "Add professional context and commentary", "Link back to the original source"], sourceTypes: ["blog-post", "whitepaper"] },
  { id: "li-poll", format: "Poll (audience engagement)", platform: "LinkedIn", platformId: "linkedin", estimatedMinutes: 10, adaptations: ["Turn a key question into a poll format", "Keep options to 3–4 concise choices", "Follow up with results commentary"], sourceTypes: ["blog-post", "video", "podcast", "webinar", "whitepaper"] },
  // Instagram
  { id: "ig-carousel", format: "Carousel Post (tips/steps)", platform: "Instagram", platformId: "instagram", estimatedMinutes: 40, adaptations: ["Design visually engaging slides", "Limit text to key phrases per slide", "Use brand colors and consistent layout"], sourceTypes: ["blog-post", "video", "webinar", "whitepaper"] },
  { id: "ig-reel", format: "Reel (30–60 sec summary)", platform: "Instagram", platformId: "instagram", estimatedMinutes: 60, adaptations: ["Script a concise summary under 60 seconds", "Add captions for accessibility", "Use trending audio if appropriate"], sourceTypes: ["video", "podcast", "webinar"] },
  { id: "ig-story", format: "Story Series (multi-frame)", platform: "Instagram", platformId: "instagram", estimatedMinutes: 25, adaptations: ["Break into 4–6 story frames", "Add interactive elements (polls, questions)", "Include swipe-up or link sticker"], sourceTypes: ["blog-post", "video", "podcast", "webinar", "whitepaper"] },
  { id: "ig-infographic", format: "Infographic Post", platform: "Instagram", platformId: "instagram", estimatedMinutes: 50, adaptations: ["Distill data or process into a single visual", "Optimize for square or portrait format", "Keep text minimal and legible on mobile"], sourceTypes: ["blog-post", "whitepaper"] },
  // Twitter/X
  { id: "tw-thread", format: "Thread (5–10 tweets)", platform: "Twitter/X", platformId: "twitter", estimatedMinutes: 20, adaptations: ["Break content into tweet-sized insights", "Number each tweet for readability", "Start with a strong hook tweet"], sourceTypes: ["blog-post", "video", "podcast", "webinar", "whitepaper"] },
  { id: "tw-quote", format: "Quote Card / Key Stat", platform: "Twitter/X", platformId: "twitter", estimatedMinutes: 10, adaptations: ["Pull the most shareable quote or stat", "Design a simple branded image", "Keep tweet copy under 200 characters"], sourceTypes: ["blog-post", "podcast", "webinar", "whitepaper"] },
  { id: "tw-clip", format: "Short Video Clip", platform: "Twitter/X", platformId: "twitter", estimatedMinutes: 30, adaptations: ["Extract a 30–45 second highlight", "Add captions for silent viewing", "Optimize thumbnail for the feed"], sourceTypes: ["video", "podcast", "webinar"] },
  // YouTube
  { id: "yt-full", format: "Full-Length Video", platform: "YouTube", platformId: "youtube", estimatedMinutes: 120, adaptations: ["Script and record a video version of the content", "Add intro, B-roll, and branded elements", "Optimize title, description, and tags for search"], sourceTypes: ["blog-post", "whitepaper"] },
  { id: "yt-short", format: "YouTube Short (under 60 sec)", platform: "YouTube", platformId: "youtube", estimatedMinutes: 30, adaptations: ["Extract one key moment or tip", "Shoot or edit in vertical format", "Add on-screen text and hook in first 3 seconds"], sourceTypes: ["video", "podcast", "webinar"] },
  { id: "yt-clip-highlight", format: "Highlight Clip (2–5 min)", platform: "YouTube", platformId: "youtube", estimatedMinutes: 25, adaptations: ["Select the most valuable segment", "Add intro context and outro CTA", "Write a standalone title and description"], sourceTypes: ["video", "podcast", "webinar"] },
  // TikTok
  { id: "tt-tip", format: "Quick Tip Video (15–60 sec)", platform: "TikTok", platformId: "tiktok", estimatedMinutes: 30, adaptations: ["Script one actionable tip from the content", "Use on-screen text and fast pacing", "Start with a hook in the first 2 seconds"], sourceTypes: ["blog-post", "video", "podcast", "webinar", "whitepaper"] },
  { id: "tt-explain", format: "Explainer / Breakdown", platform: "TikTok", platformId: "tiktok", estimatedMinutes: 40, adaptations: ["Simplify the topic for a general audience", "Use a conversational, direct-to-camera style", "Keep under 3 minutes for best engagement"], sourceTypes: ["blog-post", "whitepaper"] },
  { id: "tt-clip", format: "Repurposed Clip", platform: "TikTok", platformId: "tiktok", estimatedMinutes: 20, adaptations: ["Clip the most engaging 30–60 seconds", "Reformat to vertical 9:16 if needed", "Add trending sounds or text overlays"], sourceTypes: ["video", "podcast", "webinar"] },
  // Email
  { id: "em-newsletter", format: "Newsletter Feature", platform: "Email", platformId: "email", estimatedMinutes: 25, adaptations: ["Summarize key takeaways in 150–200 words", "Add a compelling subject line", "Link to the full content piece"], sourceTypes: ["blog-post", "video", "podcast", "webinar", "whitepaper"] },
  { id: "em-drip", format: "Drip Sequence Email", platform: "Email", platformId: "email", estimatedMinutes: 40, adaptations: ["Break content into a 3–5 email series", "Each email focuses on one key point", "Include progressive CTAs leading to conversion"], sourceTypes: ["blog-post", "webinar", "whitepaper"] },
  { id: "em-digest", format: "Content Digest / Roundup", platform: "Email", platformId: "email", estimatedMinutes: 15, adaptations: ["Include as one item in a curated digest", "Write a 2–3 sentence summary", "Pair with related content for context"], sourceTypes: ["blog-post", "video", "podcast", "webinar", "whitepaper"] },
  // Blog
  { id: "bl-summary", format: "Blog Recap / Summary Post", platform: "Blog", platformId: "blog", estimatedMinutes: 30, adaptations: ["Write a summary post with key highlights", "Embed the original media (video, audio) if applicable", "Add SEO-optimized headings and internal links"], sourceTypes: ["video", "podcast", "webinar"] },
  { id: "bl-listicle", format: "Listicle (Top Takeaways)", platform: "Blog", platformId: "blog", estimatedMinutes: 35, adaptations: ["Reformat main points as a numbered list", "Add brief commentary to each point", "Optimize for a different target keyword"], sourceTypes: ["blog-post", "webinar", "whitepaper"] },
  { id: "bl-transcript", format: "Full Transcript Post", platform: "Blog", platformId: "blog", estimatedMinutes: 20, adaptations: ["Clean up and format the transcript", "Add headings, timestamps, and speaker labels", "Include an introduction and conclusion"], sourceTypes: ["video", "podcast", "webinar"] },
  // Pinterest
  { id: "pi-infographic", format: "Infographic Pin", platform: "Pinterest", platformId: "pinterest", estimatedMinutes: 45, adaptations: ["Design a tall (2:3 ratio) infographic", "Include data points, steps, or a process flow", "Add clear branding and a URL overlay"], sourceTypes: ["blog-post", "whitepaper"] },
  { id: "pi-checklist", format: "Checklist Pin", platform: "Pinterest", platformId: "pinterest", estimatedMinutes: 30, adaptations: ["Convert action items into a visual checklist", "Use a clean, readable layout", "Link to the full resource"], sourceTypes: ["blog-post", "webinar", "whitepaper"] },
  { id: "pi-quote", format: "Quote / Stat Pin", platform: "Pinterest", platformId: "pinterest", estimatedMinutes: 15, adaptations: ["Select a compelling quote or statistic", "Design a branded pin-sized graphic", "Add the source URL in the description"], sourceTypes: ["blog-post", "podcast", "webinar", "whitepaper"] },
];

/* ------------------------------------------------------------------ */
/*  Helper: generate ID                                                */
/* ------------------------------------------------------------------ */

let idCounter = 0;
function uid(): string {
  idCounter += 1;
  return `kp-${idCounter}-${Date.now()}`;
}

/* ------------------------------------------------------------------ */
/*  Component: Content Tree SVG                                        */
/* ------------------------------------------------------------------ */

function ContentTree({ originalLabel, derivatives }: { originalLabel: string; derivatives: Derivative[] }) {
  const grouped: Record<string, Derivative[]> = {};
  for (const d of derivatives) {
    if (!grouped[d.platform]) grouped[d.platform] = [];
    grouped[d.platform].push(d);
  }
  const platformKeys = Object.keys(grouped);
  const platformCount = platformKeys.length;

  if (platformCount === 0) return null;

  const platformSpacing = 180;
  const itemHeight = 28;
  const platformHeaderHeight = 36;
  const platformPaddingTop = 16;
  const platformPaddingBottom = 12;

  const totalWidth = Math.max(800, platformCount * platformSpacing + 60);

  // Calculate max items in any platform to determine height
  const maxItems = Math.max(...platformKeys.map((k) => grouped[k].length));
  const platformBlockHeight = platformHeaderHeight + platformPaddingTop + maxItems * itemHeight + platformPaddingBottom;

  const rootY = 40;
  const rootX = totalWidth / 2;
  const platformY = 120;
  const totalHeight = platformY + platformBlockHeight + 30;

  const platformStartX = (totalWidth - (platformCount - 1) * platformSpacing) / 2;

  return (
    <div className="w-full overflow-x-auto -mx-6 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Content Repurposing Planner",
          description: "Plan how to repurpose one piece of content into multiple formats across platforms.",
          url: "https://themarkitmedia.com/en/resources/content-repurposing",
          applicationCategory: "Content Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Content Repurposing Planner | Free Marketing Tool — Markit Media</title>
      <meta name="description" content="Plan how to repurpose one piece of content into multiple formats across platforms." />
      <svg
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        className="w-full min-w-[700px]"
        role="img"
        aria-label={`Content tree showing ${originalLabel} branching into ${platformCount} platforms with ${derivatives.length} total derivatives`}
      >
        {/* Root node */}
        <rect x={rootX - 100} y={rootY - 18} width={200} height={36} rx={4} fill="#000" />
        <text x={rootX} y={rootY + 1} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700" fontFamily="var(--font-display), sans-serif">
          {originalLabel.length > 22 ? originalLabel.slice(0, 22) + "…" : originalLabel}
        </text>

        {platformKeys.map((platformName, i) => {
          const items = grouped[platformName];
          const px = platformStartX + i * platformSpacing;
          const py = platformY;
          const blockWidth = 160;
          const blockHeight = platformHeaderHeight + platformPaddingTop + items.length * itemHeight + platformPaddingBottom;

          return (
            <g key={platformName}>
              {/* Line from root to platform */}
              <line x1={rootX} y1={rootY + 18} x2={px} y2={py} stroke="#000" strokeWidth="1.5" strokeDasharray="4 3" />

              {/* Platform block */}
              <rect x={px - blockWidth / 2} y={py} width={blockWidth} height={blockHeight} rx={4} fill="#fff" stroke="#000" strokeWidth="1.5" />
              <rect x={px - blockWidth / 2} y={py} width={blockWidth} height={platformHeaderHeight} rx={4} fill="#000" />
              <rect x={px - blockWidth / 2} y={py + platformHeaderHeight - 4} width={blockWidth} height={4} fill="#000" />
              <text x={px} y={py + platformHeaderHeight / 2 + 4} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700" fontFamily="var(--font-display), sans-serif">
                {platformName}
              </text>

              {/* Items */}
              {items.map((item, j) => {
                const iy = py + platformHeaderHeight + platformPaddingTop + j * itemHeight;
                const label = item.format.length > 20 ? item.format.slice(0, 20) + "…" : item.format;
                return (
                  <g key={item.id}>
                    <circle cx={px - blockWidth / 2 + 14} cy={iy + 4} r={3} fill="#000" />
                    <text x={px - blockWidth / 2 + 24} y={iy + 8} fill="#000" fontSize="10" fontFamily="Inter, sans-serif">
                      {label}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component: Metrics Summary                                         */
/* ------------------------------------------------------------------ */

function MetricsSummary({ derivatives, originalMinutes }: { derivatives: Derivative[]; originalMinutes: number }) {
  const totalDerivatives = derivatives.length;
  const totalMinutes = derivatives.reduce((sum, d) => sum + d.estimatedMinutes, 0);
  const totalHours = totalMinutes / 60;
  const multiplicationFactor = totalDerivatives + 1; // original + derivatives

  // Time to create each piece from scratch (rough estimate: 3x the repurposing time)
  const fromScratchMinutes = derivatives.reduce((sum, d) => sum + d.estimatedMinutes * 3, 0) + originalMinutes;
  const savedMinutes = fromScratchMinutes - (originalMinutes + totalMinutes);
  const savedHours = savedMinutes / 60;
  const savingsPercentage = fromScratchMinutes > 0 ? Math.round((savedMinutes / fromScratchMinutes) * 100) : 0;

  const platformCount = new Set(derivatives.map((d) => d.platform)).size;

  const metrics = [
    { label: "Total Content Pieces", value: String(multiplicationFactor), sub: `1 original + ${totalDerivatives} derivatives` },
    { label: "Multiplication Factor", value: `${multiplicationFactor}x`, sub: "pieces from one original" },
    { label: "Repurposing Time", value: totalHours < 1 ? `${totalMinutes} min` : `${totalHours.toFixed(1)} hrs`, sub: "estimated total creation time" },
    { label: "Time Saved vs. From Scratch", value: savedHours < 1 ? `${Math.round(savedMinutes)} min` : `${savedHours.toFixed(1)} hrs`, sub: `${savingsPercentage}% more efficient` },
    { label: "Platforms Covered", value: String(platformCount), sub: "channels in your distribution" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {metrics.map((m) => (
        <div key={m.label} className="bg-white border border-gray-200 p-4 text-center">
          <p className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-extrabold text-black">{m.value}</p>
          <p className="text-base font-bold text-black mt-1">{m.label}</p>
          <p className="text-base text-neutral-500 mt-0.5">{m.sub}</p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component: Time Savings Bar Chart                                  */
/* ------------------------------------------------------------------ */

function TimeSavingsChart({ derivatives, originalMinutes }: { derivatives: Derivative[]; originalMinutes: number }) {
  const totalRepurposeMinutes = derivatives.reduce((sum, d) => sum + d.estimatedMinutes, 0);
  const fromScratchMinutes = derivatives.reduce((sum, d) => sum + d.estimatedMinutes * 3, 0) + originalMinutes;
  const repurposeTotal = originalMinutes + totalRepurposeMinutes;

  const maxVal = Math.max(fromScratchMinutes, repurposeTotal, 1);
  const barWidth = 400;
  const chartHeight = 100;

  const scratchBarW = (fromScratchMinutes / maxVal) * barWidth;
  const repurposeBarW = (repurposeTotal / maxVal) * barWidth;

  function formatTime(min: number): string {
    if (min < 60) return `${Math.round(min)} min`;
    return `${(min / 60).toFixed(1)} hrs`;
  }

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${barWidth + 180} ${chartHeight}`} className="w-full max-w-[600px]" role="img" aria-label="Bar chart comparing time to create all content from scratch versus repurposing">
        {/* From scratch */}
        <text x={0} y={25} fill="#000" fontSize="12" fontWeight="600" fontFamily="Inter, sans-serif">From Scratch</text>
        <rect x={110} y={12} width={scratchBarW} height={22} fill="#000" rx={2} />
        <text x={110 + scratchBarW + 8} y={27} fill="#000" fontSize="11" fontFamily="Inter, sans-serif">{formatTime(fromScratchMinutes)}</text>

        {/* Repurposing */}
        <text x={0} y={65} fill="#000" fontSize="12" fontWeight="600" fontFamily="Inter, sans-serif">Repurposing</text>
        <rect x={110} y={52} width={repurposeBarW} height={22} fill="#999" rx={2} />
        <text x={110 + repurposeBarW + 8} y={67} fill="#000" fontSize="11" fontFamily="Inter, sans-serif">{formatTime(repurposeTotal)}</text>

        {/* Savings label */}
        <text x={110} y={92} fill="#555" fontSize="11" fontFamily="Inter, sans-serif">
          {formatTime(fromScratchMinutes - repurposeTotal)} saved ({Math.round(((fromScratchMinutes - repurposeTotal) / fromScratchMinutes) * 100)}% more efficient)
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */



export default function ContentRepurposingPage() {
  const [contentType, setContentType] = useState<ContentType>("blog-post");
  const [topic, setTopic] = useState("");
  const [contentSize, setContentSize] = useState("");
  const [keyPoints, setKeyPoints] = useState<KeyPoint[]>([{ id: uid(), text: "" }]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [generatedDerivatives, setGeneratedDerivatives] = useState<Derivative[]>([]);

  const currentType = contentTypes.find((t) => t.id === contentType)!;

  const addKeyPoint = useCallback(() => {
    setKeyPoints((prev) => [...prev, { id: uid(), text: "" }]);
  }, []);

  const removeKeyPoint = useCallback((id: string) => {
    setKeyPoints((prev) => (prev.length > 1 ? prev.filter((p) => p.id !== id) : prev));
  }, []);

  const updateKeyPoint = useCallback((id: string, text: string) => {
    setKeyPoints((prev) => prev.map((p) => (p.id === id ? { ...p, text } : p)));
  }, []);

  const togglePlatform = useCallback((platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((p) => p !== platformId) : [...prev, platformId]
    );
  }, []);

  const generatePlan = useCallback(() => {
    const results = derivativeTemplates.filter(
      (d) => selectedPlatforms.includes(d.platformId) && d.sourceTypes.includes(contentType)
    );
    setGeneratedDerivatives(results);
    setShowResults(true);
  }, [selectedPlatforms, contentType]);

  const resetForm = useCallback(() => {
    setContentType("blog-post");
    setTopic("");
    setContentSize("");
    setKeyPoints([{ id: uid(), text: "" }]);
    setSelectedPlatforms([]);
    setShowResults(false);
    setGeneratedDerivatives([]);
  }, []);

  const isFormValid = topic.trim().length > 0 && contentSize.trim().length > 0 && selectedPlatforms.length > 0;

  const originalMinutes = (() => {
    const size = parseInt(contentSize, 10) || 0;
    if (contentType === "blog-post") return Math.max(60, Math.round(size / 15)); // ~15 words/min to write
    if (contentType === "whitepaper") return Math.max(120, Math.round(size / 10));
    // For video/podcast/webinar, the creation time is roughly 3x the duration
    return Math.max(30, size * 3);
  })();

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Content Repurposing Planner",
    description: "Plan how to repurpose one piece of content into multiple formats across platforms.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  // Group derivatives by platform for display
  const groupedDerivatives: Record<string, Derivative[]> = {};
  for (const d of generatedDerivatives) {
    if (!groupedDerivatives[d.platform]) groupedDerivatives[d.platform] = [];
    groupedDerivatives[d.platform].push(d);
  }

  return (
    <article>
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/content-calendar" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Content Calendar</Link>
                <Link href="/resources/content-brief-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Content Brief Generator</Link>
                <Link href="/resources/content-roi-calculator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Content ROI Calculator</Link>
                <Link href="/resources/content-gap-finder" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Content Gap Finder</Link>
          </div>
        </div>
      </section>
<JsonLd data={schema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "Content Repurposing Planner" }]} />

      {/* Header */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Content Repurposing Planner
            </h1>
            <SectionDesc>
              Turn one piece of content into many. Enter details about your original content, select your target
              platforms, and get a complete repurposing plan with formats, timelines, and a visual content tree.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {!showResults ? (
        /* ------------------------------------------------------------ */
        /*  Input Form                                                    */
        /* ------------------------------------------------------------ */
        <section aria-label="Step 1: Original Content Details" className="px-6 lg:px-12 pb-16">
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Step 1: Content Type */}
            <Animate animation="fade-up">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-1">
                  Step 1: Original Content Details
                </h2>
                <p className="text-base text-gray-500 mb-6">
                  Tell us about the content piece you want to repurpose.
                </p>

                <label className="block text-base font-bold text-black mb-2">Content Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
                  {contentTypes.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setContentType(t.id)}
                      className={`border-2 px-4 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                        contentType === t.id
                          ? "border-black bg-black text-white"
                          : "border-gray-200 bg-white text-black hover:border-black"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                <label htmlFor="topic" className="block text-base font-bold text-black mb-2">
                  Topic / Title
                </label>
                <input
                  id="topic"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., 10 Ways to Improve Website Conversion Rates"
                  className="w-full border-2 border-gray-200 px-4 py-3 text-base text-black placeholder:text-gray-400 focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none mb-6"
                />

                <label htmlFor="content-size" className="block text-base font-bold text-black mb-2">
                  {currentType.sizeLabel} ({currentType.sizeUnit})
                </label>
                <input
                  id="content-size"
                  type="number"
                  min="1"
                  value={contentSize}
                  onChange={(e) => setContentSize(e.target.value)}
                  placeholder={currentType.sizeUnit === "words" ? "e.g., 2000" : "e.g., 45"}
                  className="w-full max-w-xs border-2 border-gray-200 px-4 py-3 text-base text-black placeholder:text-gray-400 focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none mb-6"
                />

                <div>
                  <label className="block text-base font-bold text-black mb-2">
                    Key Points (optional)
                  </label>
                  <p className="text-base text-neutral-500 mb-3">
                    Add the main takeaways or sections from your content. These help tailor the repurposing plan.
                  </p>
                  <div className="space-y-3">
                    {keyPoints.map((kp, i) => (
                      <div key={kp.id} className="flex gap-2">
                        <input
                          type="text"
                          value={kp.text}
                          onChange={(e) => updateKeyPoint(kp.id, e.target.value)}
                          placeholder={`Key point ${i + 1}`}
                          className="flex-1 border-2 border-gray-200 px-4 py-3 text-base text-black placeholder:text-gray-400 focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none"
                        />
                        {keyPoints.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeKeyPoint(kp.id)}
                            className="border-2 border-gray-200 px-3 py-3 text-base text-gray-500 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                            aria-label={`Remove key point ${i + 1}`}
                          >
                            &times;
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {keyPoints.length < 10 && (
                    <button
                      type="button"
                      onClick={addKeyPoint}
                      className="mt-3 text-base font-bold text-black hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                    >
                      + Add another point
                    </button>
                  )}
                </div>
              </div>
            </Animate>

            {/* Step 2: Target Platforms */}
            <Animate animation="fade-up" delay={100}>
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-1">
                  Step 2: Select Target Platforms
                </h2>
                <p className="text-base text-gray-500 mb-6">
                  Choose the platforms where you want to distribute repurposed content.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {platforms.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => togglePlatform(p.id)}
                      className={`border-2 px-4 py-4 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                        selectedPlatforms.includes(p.id)
                          ? "border-black bg-black text-white"
                          : "border-gray-200 bg-white text-black hover:border-black"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {selectedPlatforms.length > 0 && (
                  <p className="text-base text-gray-500 mt-3">
                    {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? "s" : ""} selected
                  </p>
                )}
              </div>
            </Animate>

            {/* Generate Button */}
            <Animate animation="fade-up" delay={200}>
              <button
                type="button"
                onClick={generatePlan}
                disabled={!isFormValid}
                className={`w-full sm:w-auto px-10 py-5 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                  isFormValid
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Generate Repurposing Plan &rarr;
              </button>
              {!isFormValid && (
                <p className="text-base text-neutral-500 mt-2">
                  Please fill in the topic, {currentType.sizeLabel.toLowerCase()}, and select at least one platform.
                </p>
              )}
            </Animate>
          </div>
        </section>
      ) : (
        /* ------------------------------------------------------------ */
        /*  Results                                                       */
        /* ------------------------------------------------------------ */
        <section aria-label="Content section" className="px-6 lg:px-12 pb-16">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Back / Reset */}
            <Animate animation="fade-up">
              <button
                type="button"
                onClick={resetForm}
                className="text-base font-bold text-black hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                &larr; Start Over
              </button>
            </Animate>

            {/* Summary */}
            <Animate animation="fade-up" delay={50}>
              <div className="bg-white border border-gray-200 p-6 sm:p-8">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-2">
                  Repurposing Plan for: {topic}
                </h2>
                <p className="text-base text-gray-500">
                  Original: {currentType.label} &middot; {contentSize} {currentType.sizeUnit} &middot;{" "}
                  {keyPoints.filter((kp) => kp.text.trim()).length} key point{keyPoints.filter((kp) => kp.text.trim()).length !== 1 ? "s" : ""}
                </p>
              </div>
            </Animate>

            {/* Metrics */}
            <Animate animation="fade-up" delay={100}>
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                  Content Multiplication Metrics
                </h2>
                <MetricsSummary derivatives={generatedDerivatives} originalMinutes={originalMinutes} />
              </div>
            </Animate>

            {/* Time Savings Chart */}
            <Animate animation="fade-up" delay={150}>
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                  Time Savings Comparison
                </h2>
                <div className="bg-white border border-gray-200 p-6">
                  <TimeSavingsChart derivatives={generatedDerivatives} originalMinutes={originalMinutes} />
                </div>
              </div>
            </Animate>

            {/* Content Tree */}
            <Animate animation="fade-up" delay={200}>
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                  Content Tree
                </h2>
                <div className="bg-white border border-gray-200 p-6">
                  <ContentTree
                    originalLabel={topic}
                    derivatives={generatedDerivatives}
                  />
                </div>
              </div>
            </Animate>

            {/* Derivatives by Platform */}
            <Animate animation="fade-up" delay={250}>
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-6">
                  Derivative Content Plan
                </h2>
                <div className="space-y-8">
                  {Object.keys(groupedDerivatives).map((platformName) => {
                    const items = groupedDerivatives[platformName];
                    return (
                      <div key={platformName}>
                        <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black uppercase tracking-wide mb-3 pb-2 border-b border-gray-200">
                          {platformName}
                        </h3>
                        <div className="space-y-4">
                          {items.map((d) => (
                            <div key={d.id} className="bg-white border border-gray-200 p-5">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                <h4 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                                  {d.format}
                                </h4>
                                <span className="inline-flex items-center bg-gray-100 px-3 py-1 text-base font-bold text-black whitespace-nowrap">
                                  ~{d.estimatedMinutes < 60
                                    ? `${d.estimatedMinutes} min`
                                    : `${(d.estimatedMinutes / 60).toFixed(1)} hrs`}
                                </span>
                              </div>
                              <p className="text-base font-bold text-black mb-2">Key Adaptations:</p>
                              <ul className="space-y-1">
                                {d.adaptations.map((a, i) => (
                                  <li key={i} className="flex items-start gap-2 text-base text-gray-600">
                                    <span className="text-black mt-1.5 flex-shrink-0 w-1.5 h-1.5 bg-black rounded-full" aria-hidden="true" />
                                    {a}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Animate>

            {/* Key Points Mapping (if provided) */}
            {keyPoints.some((kp) => kp.text.trim()) && (
              <Animate animation="fade-up" delay={300}>
                <div>
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                    Key Points Distribution
                  </h2>
                  <p className="text-base text-gray-500 mb-4">
                    Each key point from your original content can anchor one or more derivative pieces.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-base">
                      <thead>
                        <tr className="bg-black text-white">
                          <th className="text-left px-4 py-3 font-bold">Key Point</th>
                          <th className="text-left px-4 py-3 font-bold">Suggested Derivatives</th>
                        </tr>
                      </thead>
                      <tbody>
                        {keyPoints
                          .filter((kp) => kp.text.trim())
                          .map((kp, i) => {
                            // Rotate through derivatives to distribute key points
                            const assignedDerivatives = generatedDerivatives.filter(
                              (_, di) => di % keyPoints.filter((k) => k.text.trim()).length === i
                            );
                            return (
                              <tr key={kp.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <td className="px-4 py-3 border-b border-gray-200 font-medium text-black align-top">
                                  {kp.text}
                                </td>
                                <td className="px-4 py-3 border-b border-gray-200 text-gray-600">
                                  {assignedDerivatives.length > 0
                                    ? assignedDerivatives.map((d) => `${d.format} (${d.platform})`).join(", ")
                                    : "Can be woven into any derivative piece"}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Animate>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Executing Your Content Strategy?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our content team can repurpose, produce, and distribute your content across every channel. Let us turn
              your best ideas into a full content engine.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Talk to Our Content Team &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Content Repurposing"
        services={[
          { title: "Content Marketing", desc: "Strategic content that drives traffic, engagement, and conversions.", href: "/services/content-marketing" },
          { title: "SEO", desc: "Content optimized for search engines and human readers alike.", href: "/services/seo" },
          { title: "Social Media Marketing", desc: "Distribute your content where your audience already is.", href: "/services/social-media-marketing" },
        ]}
        relatedTools={[
          { title: "Content Gap Finder", href: "/resources/content-gap-finder" },
          { title: "Content Performance Scorecard", href: "/resources/content-performance-scorecard" },
          { title: "Content Pillar Planner", href: "/resources/content-pillar-planner" },
          { title: "Content Roi Calculator", href: "/resources/content-roi-calculator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
