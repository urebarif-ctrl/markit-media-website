"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

const TEMPLATES = [
  {
    label: "Blog Post",
    template: "Learn {topic} with our {adjective} guide. Discover {benefit} and {outcome}. Read now.",
    fields: ["topic", "adjective", "benefit", "outcome"],
  },
  {
    label: "Service Page",
    template: "{company} offers {service} for {audience}. {benefit}. Get a free consultation today.",
    fields: ["company", "service", "audience", "benefit"],
  },
  {
    label: "Product Page",
    template: "Shop {product} — {feature}. {benefit}. Free shipping on orders over {threshold}.",
    fields: ["product", "feature", "benefit", "threshold"],
  },
  {
    label: "Local Business",
    template: "{business} in {location} — {service}. {years}+ years serving {area}. Call today for a free {offer}.",
    fields: ["business", "location", "service", "years", "area", "offer"],
  },
  {
    label: "How-To Guide",
    template: "How to {action} in {timeframe}. Step-by-step guide covering {topics}. {benefit}.",
    fields: ["action", "timeframe", "topics", "benefit"],
  },
];

function analyzeDescription(text: string) {
  const len = text.length;
  const issues: { type: "good" | "warning" | "tip"; text: string }[] = [];

  if (len >= 120 && len <= 160) {
    issues.push({ type: "good", text: `${len} characters — within the ideal 120-160 character range.` });
  } else if (len < 120 && len > 0) {
    issues.push({ type: "warning", text: `${len} characters — too short. Aim for 120-160 characters to maximize SERP real estate.` });
  } else if (len > 160) {
    issues.push({ type: "warning", text: `${len} characters — Google typically truncates at ~160 characters. ${len - 160} chars may be cut.` });
  }

  if (/[.!]$/.test(text.trim())) {
    issues.push({ type: "good", text: "Ends with punctuation — looks complete in search results." });
  } else if (text.trim().length > 0) {
    issues.push({ type: "tip", text: "Consider ending with a period or call-to-action for a polished appearance." });
  }

  const cta = /\b(learn|discover|get|find|read|shop|try|start|call|contact|book|download|sign up)\b/i;
  if (cta.test(text)) {
    issues.push({ type: "good", text: "Contains a call-to-action word that encourages clicks." });
  } else {
    issues.push({ type: "tip", text: "Add a CTA like 'Learn more', 'Get started', or 'Read now' to improve CTR." });
  }

  if (/\b\d+\b/.test(text)) {
    issues.push({ type: "good", text: "Includes numbers — specificity increases click-through rates." });
  }

  const words = text.split(/\s+/).filter(Boolean);
  const uniqueWords = new Set(words.map((w) => w.toLowerCase()));
  if (words.length > 5 && uniqueWords.size < words.length * 0.6) {
    issues.push({ type: "warning", text: "Repetitive wording detected. Vary your language for better engagement." });
  }

  return issues;
}

export default function MetaDescriptionGeneratorPage() {
  const [mode, setMode] = useState<"write" | "template">("write");
  const [description, setDescription] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [analysis, setAnalysis] = useState<ReturnType<typeof analyzeDescription>>([]);

  const handleAnalyze = useCallback(() => {
    if (description.trim().length > 0) {
      setAnalysis(analyzeDescription(description));
    }
  }, [description]);

  const handleGenerate = useCallback(() => {
    const tmpl = TEMPLATES[selectedTemplate];
    let result = tmpl.template;
    for (const field of tmpl.fields) {
      const val = fieldValues[field] || `[${field}]`;
      result = result.replace(`{${field}}`, val);
    }
    setDescription(result);
    setAnalysis(analyzeDescription(result));
    setMode("write");
  }, [selectedTemplate, fieldValues]);

  return (
    <article>
      <nav className="px-6 lg:px-12 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/resources" className="hover:text-black transition-colors">Resources</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">Meta Description Generator</li>
        </ol>
      </nav>
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Meta Description Generator
            </h1>
            <SectionDesc>
              Write and optimize meta descriptions for your web pages. Use our templates or write your own, then check length and quality.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section aria-label="Content section" className="px-6 lg:px-12 pb-20">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex gap-2 mb-8">
              <button
                onClick={() => setMode("write")}
                className={`px-6 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                  mode === "write" ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Write Your Own
              </button>
              <button
                onClick={() => setMode("template")}
                className={`px-6 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                  mode === "template" ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Use a Template
              </button>
            </div>

            {mode === "write" ? (
              <div className="space-y-4">
                <label htmlFor="meta-input" className="block text-base font-bold text-black">
                  Your meta description
                </label>
                <textarea
                  id="meta-input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter your meta description here..."
                  rows={4}
                  maxLength={300}
                  className="w-full px-5 py-4 border-2 border-gray-200 text-base text-black placeholder:text-gray-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus-visible:border-black transition-colors motion-reduce:transition-none resize-none"
                />
                <div className="flex justify-between items-center">
                  <p className={`text-base ${description.length > 160 ? "text-gray-800 font-bold" : "text-gray-400"}`}>
                    {description.length}/160 characters
                    {description.length > 160 && ` (${description.length - 160} over limit)`}
                  </p>
                  <button
                    onClick={handleAnalyze}
                    disabled={description.trim().length === 0}
                    className="bg-black text-white px-8 py-3 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    Analyze
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-base font-bold text-black mb-3">Choose a template</label>
                  <div className="flex flex-wrap gap-2">
                    {TEMPLATES.map((t, i) => (
                      <button
                        key={t.label}
                        onClick={() => { setSelectedTemplate(i); setFieldValues({}); }}
                        className={`px-4 py-2 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                          selectedTemplate === i ? "bg-black text-white" : "border border-gray-200 text-gray-600 hover:border-black"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 text-base text-gray-500">
                  {TEMPLATES[selectedTemplate].template}
                </div>

                <div className="space-y-3">
                  {TEMPLATES[selectedTemplate].fields.map((field) => (
                    <div key={field}>
                      <label htmlFor={`field-${field}`} className="block text-base font-bold text-black mb-1 capitalize">
                        {field.replace(/_/g, " ")}
                      </label>
                      <input
                        id={`field-${field}`}
                        type="text"
                        value={fieldValues[field] || ""}
                        onChange={(e) => setFieldValues({ ...fieldValues, [field]: e.target.value })}
                        placeholder={`Enter ${field}...`}
                        className="w-full px-4 py-3 border border-gray-200 text-base text-black placeholder:text-gray-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleGenerate}
                  className="bg-black text-white px-8 py-3 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Generate &amp; Analyze
                </button>
              </div>
            )}
          </Animate>

          {analysis.length > 0 && (
            <Animate animation="fade-up">
              <div className="mt-10 space-y-6">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                  Analysis Results
                </h2>

                <div className="p-6 border-2 border-black">
                  <h3 className="text-base font-bold text-gray-400 uppercase tracking-wide mb-3">Preview in Search Results</h3>
                  <div className="space-y-1">
                    <p className="text-lg text-blue-700 font-bold truncate">Your Page Title — Your Brand Name</p>
                    <p className="text-base text-green-700 truncate">https://yoursite.com/your-page</p>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {description.length > 160 ? description.slice(0, 157) + "..." : description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {analysis.map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 p-4 border ${
                        item.type === "good" ? "border-black/20 bg-gray-50" : item.type === "warning" ? "border-gray-300" : "border-gray-200"
                      }`}
                    >
                      <span
                        className={`flex-shrink-0 w-6 h-6 flex items-center justify-center text-base font-bold ${
                          item.type === "good" ? "bg-black text-white" : item.type === "warning" ? "bg-gray-200 text-gray-600" : "bg-gray-100 text-gray-500"
                        }`}
                        aria-hidden="true"
                      >
                        {item.type === "good" ? "+" : item.type === "warning" ? "!" : "i"}
                      </span>
                      <p className="text-base text-gray-600 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Animate>
          )}
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Best practices">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-8">
              Meta Description Best Practices
            </h2>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "120-160 Characters", desc: "Stay within this range to maximize SERP visibility. Too short wastes space; too long gets truncated." },
              { title: "Unique Per Page", desc: "Every page should have a distinct meta description. Duplicate descriptions confuse search engines and users." },
              { title: "Include Target Keyword", desc: "Google bolds matching keywords in search results, making your listing stand out visually." },
              { title: "Add a Call to Action", desc: "Phrases like 'Learn more', 'Get started', or 'Shop now' encourage clicks from search results." },
              { title: "Match Search Intent", desc: "Your description should align with what the searcher expects to find on the page." },
              { title: "Avoid Duplicating Title", desc: "Your meta description should complement the title tag, not repeat it word for word." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 border border-gray-200">
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black mb-2">{item.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Want Us to Handle Your SEO?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Meta descriptions are one piece of the SEO puzzle. Let our team optimize your entire search presence.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Talk to an SEO Expert &rarr;
            </Link>
          </Animate>
        </div>
      </section>
          
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/seo-checklist" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">SEO Checklist</Link>
                <Link href="/resources/keyword-density-checker" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Keyword Density Checker</Link>
                <Link href="/resources/seo-content-optimizer" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">SEO Content Optimizer</Link>
                <Link href="/resources/seo-audit-score" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">SEO Audit Score</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Meta Description Generator — Write Click-Worthy SEO Descriptions",
          description: "Generate optimized meta descriptions for blog posts, service pages, and product pages with this free template-based tool. Improve CTR and search visibility instantly.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Meta Description Generator"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Marketing Trends 2026", href: "/resources/marketing-trends-2026" },
          { title: "Martech Stack Planner", href: "/resources/martech-stack-planner" },
          { title: "Meeting Agenda Builder", href: "/resources/meeting-agenda-builder" },
          { title: "Migration Checklist", href: "/resources/migration-checklist" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
