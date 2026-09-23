"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

interface AuditItem {
  id: string;
  text: string;
  fix: string;
}

interface AuditCategory {
  title: string;
  items: AuditItem[];
}

const categories: AuditCategory[] = [
  {
    title: "Page Load & Technical",
    items: [
      {
        id: "pt1",
        text: "Site is fully responsive on mobile, tablet, and desktop",
        fix: "Test your site on multiple screen sizes and fix layout issues that cause horizontal scrolling or overlapping elements.",
      },
      {
        id: "pt2",
        text: "Pages load in under 3 seconds on mobile connections",
        fix: "Compress images, enable lazy loading, minify CSS/JS, and use a CDN to reduce load times.",
      },
      {
        id: "pt3",
        text: "SSL certificate is installed and all pages serve over HTTPS",
        fix: "Install an SSL certificate and set up 301 redirects from HTTP to HTTPS for every page.",
      },
      {
        id: "pt4",
        text: "URLs are clean, descriptive, and follow a logical structure",
        fix: "Rewrite URLs to use lowercase, hyphens, and descriptive slugs instead of query strings or IDs.",
      },
      {
        id: "pt5",
        text: "No broken links or 404 errors on key conversion pages",
        fix: "Run a site crawl to find broken links and either fix the destination URLs or set up redirects.",
      },
    ],
  },
  {
    title: "Above-the-Fold",
    items: [
      {
        id: "af1",
        text: "Headline clearly communicates what you offer and for whom",
        fix: "Rewrite your headline to state the specific outcome or benefit a visitor gets, not just your company name.",
      },
      {
        id: "af2",
        text: "Primary call-to-action is visible without scrolling",
        fix: "Place your most important CTA button above the fold where visitors can see it immediately on landing.",
      },
      {
        id: "af3",
        text: "Value proposition is immediately understandable within 5 seconds",
        fix: "Add a subheadline that explains how your product or service solves the visitor's specific problem.",
      },
      {
        id: "af4",
        text: "Trust signals are present (logos, certifications, ratings)",
        fix: "Add partner logos, certification badges, or aggregate review ratings near your headline or CTA area.",
      },
      {
        id: "af5",
        text: "Design looks professional and consistent with your brand",
        fix: "Ensure fonts, colors, and spacing are consistent. Remove stock-looking imagery and low-quality graphics.",
      },
    ],
  },
  {
    title: "Content & Copy",
    items: [
      {
        id: "cc1",
        text: "Headlines focus on benefits rather than features",
        fix: "Reframe feature-focused headlines to describe the outcome or benefit the customer experiences.",
      },
      {
        id: "cc2",
        text: "Content is scannable with short paragraphs, bullets, and subheadings",
        fix: "Break long paragraphs into 2-3 sentences max. Add subheadings every 2-3 sections and use bullet lists for key points.",
      },
      {
        id: "cc3",
        text: "Social proof is present (testimonials, case studies, reviews)",
        fix: "Add real customer testimonials with names and context, or link to detailed case studies showing measurable results.",
      },
      {
        id: "cc4",
        text: "Urgency or scarcity elements encourage action where appropriate",
        fix: "Add genuine time-limited offers, limited availability notices, or seasonal promotions where they apply honestly.",
      },
      {
        id: "cc5",
        text: "Pricing or next steps are clearly presented without confusion",
        fix: "Make pricing visible and straightforward. If pricing varies, provide a range or a clear path to get a quote.",
      },
    ],
  },
  {
    title: "Forms & CTAs",
    items: [
      {
        id: "fc1",
        text: "Forms ask only for essential information (minimal fields)",
        fix: "Remove any form field that is not strictly necessary for the initial conversion. Collect extra info later.",
      },
      {
        id: "fc2",
        text: "CTA buttons use high-contrast styling that stands out from the page",
        fix: "Make CTA buttons visually distinct with strong contrast against the background. Increase size if needed.",
      },
      {
        id: "fc3",
        text: "Each page has a single, clear primary action for the visitor",
        fix: "Identify the one action you want visitors to take on each page and remove or de-emphasize competing CTAs.",
      },
      {
        id: "fc4",
        text: "Multi-step forms show progress indicators",
        fix: "Add a step counter or progress bar so users know where they are and how many steps remain.",
      },
      {
        id: "fc5",
        text: "Form validation shows clear, inline error messages",
        fix: "Replace generic error alerts with specific inline messages next to the field that needs correction.",
      },
    ],
  },
];

function getLetterGrade(pct: number): { letter: string; label: string } {
  if (pct >= 90) return { letter: "A", label: "Excellent" };
  if (pct >= 80) return { letter: "B", label: "Good" };
  if (pct >= 60) return { letter: "C", label: "Average" };
  if (pct >= 40) return { letter: "D", label: "Below Average" };
  return { letter: "F", label: "Needs Significant Work" };
}



export default function CroAuditPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggleItem = useCallback((id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const totalItems = useMemo(
    () => categories.reduce((sum, cat) => sum + cat.items.length, 0),
    []
  );

  const checkedCount = checked.size;
  const overallPct = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;
  const grade = getLetterGrade(overallPct);

  const categoryScores = useMemo(() => {
    return categories.map((cat) => {
      const catChecked = cat.items.filter((item) => checked.has(item.id)).length;
      const catPct = Math.round((catChecked / cat.items.length) * 100);
      return {
        title: cat.title,
        checked: catChecked,
        total: cat.items.length,
        pct: catPct,
        grade: getLetterGrade(catPct),
      };
    });
  }, [checked]);

  const weakestCategory = useMemo(() => {
    let weakest = categoryScores[0];
    for (const cs of categoryScores) {
      if (cs.pct < weakest.pct) weakest = cs;
    }
    return weakest;
  }, [categoryScores]);

  const priorityFixes = useMemo(() => {
    const weakCat = categories.find((c) => c.title === weakestCategory.title);
    if (!weakCat) return [];
    return weakCat.items
      .filter((item) => !checked.has(item.id))
      .map((item) => ({ text: item.text, fix: item.fix }));
  }, [checked, weakestCategory]);

  const handleReset = useCallback(() => {
    setChecked(new Set());
  }, []);

  return (
    <article className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Conversion Rate Optimization Audit",
          description: "A 20-point conversion rate optimization audit checklist. Evaluate your website across page speed, above-the-fold design, content, and CTAs to identify conversion-killing issues.",
          url: "https://themarkitmedia.com/en/resources/cro-audit",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Conversion Rate Optimization Audit | Free Marketing Tool — Markit Media</title>
      <meta name="description" content="A 20-point conversion rate optimization audit checklist. Evaluate your website across page speed, above-the-fold design, content, and CTAs to identify conver..." />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "CRO Audit Tool",
          description:
            "A 20-point conversion rate optimization audit checklist. Evaluate your website across page speed, above-the-fold design, content, and CTAs to identify conversion-killing issues.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "CRO Audit" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Conversion Rate Optimization Audit
            </h1>
            <SectionDesc>
              A 20-point checklist to evaluate how well your website converts
              visitors into leads and customers. Check off each item to see your
              scores by category, overall grade, and top priority fixes.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Sticky progress bar */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-6">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="sticky top-20 z-10 bg-white py-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-bold text-black">
                  {checkedCount}/{totalItems} items checked
                </span>
                <span className="text-base font-bold text-black">
                  {overallPct}%
                  {checkedCount > 0 && (
                    <span className="ml-2">
                      Grade: {grade.letter}
                    </span>
                  )}
                </span>
              </div>
              <div className="w-full h-3 bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-black transition-all duration-300 motion-reduce:transition-none"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
              {checkedCount > 0 && (
                <p className="text-base text-gray-500 mt-2">{grade.label}</p>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* Category checklists */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto space-y-12">
          {categories.map((cat, catIndex) => {
            const score = categoryScores[catIndex];
            return (
              <Animate key={cat.title} animation="fade-up">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                      {cat.title}
                    </h2>
                    <span className="text-base text-gray-400">
                      {score.checked}/{score.total}
                      {score.checked > 0 && (
                        <span className="ml-2 font-bold text-black">
                          {score.grade.letter}
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 overflow-hidden mb-4">
                    <div
                      className="h-full bg-black transition-all duration-300 motion-reduce:transition-none"
                      style={{ width: `${score.pct}%` }}
                    />
                  </div>
                  <div className="space-y-0">
                    {cat.items.map((item) => (
                      <label
                        key={item.id}
                        className="flex items-start gap-3 p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors motion-reduce:transition-none min-h-[44px] focus-within:outline-2 focus-within:outline-black focus-within:outline-offset-2"
                      >
                        <input
                          type="checkbox"
                          checked={checked.has(item.id)}
                          onChange={() => toggleItem(item.id)}
                          className="mt-1 w-5 h-5 flex-shrink-0 accent-black cursor-pointer focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        />
                        <span
                          className={`text-base leading-relaxed ${
                            checked.has(item.id)
                              ? "text-gray-400 line-through"
                              : "text-gray-700"
                          }`}
                        >
                          {item.text}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </Animate>
            );
          })}
        </div>
      </section>

      {/* Score summary cards */}
      {checkedCount > 0 && (
        <section aria-label="Score Breakdown" className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                Score Breakdown
              </h2>
            </Animate>
            <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryScores.map((cs) => (
                <div
                  key={cs.title}
                  className="border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                      {cs.title}
                    </h3>
                    <span className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
                      {cs.grade.letter}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 overflow-hidden mb-2">
                    <div
                      className="h-full bg-black transition-all duration-300 motion-reduce:transition-none"
                      style={{ width: `${cs.pct}%` }}
                    />
                  </div>
                  <p className="text-base text-gray-500">
                    {cs.checked} of {cs.total} items checked ({cs.pct}%)
                  </p>
                </div>
              ))}

              {/* Overall grade card */}
              <div className="md:col-span-2 border-2 border-black p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-bold text-gray-500 uppercase tracking-wide mb-1">
                      Overall Grade
                    </p>
                    <p className="text-base text-gray-500">
                      {checkedCount} of {totalItems} items checked ({overallPct}%)
                    </p>
                  </div>
                  <div className="text-center">
                    <span className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
                      {grade.letter}
                    </span>
                    <p className="text-base text-gray-500">{grade.label}</p>
                  </div>
                </div>
              </div>
            </Stagger>
          </div>
        </section>
      )}

      {/* Priority fixes */}
      {checkedCount > 0 && priorityFixes.length > 0 && (
        <section aria-label="Top Priority Fixes" className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <div className="border-l-4 border-black pl-6">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-2">
                  Top Priority Fixes
                </h2>
                <p className="text-base text-gray-500 mb-6">
                  Your weakest category is <strong className="text-black">{weakestCategory.title}</strong> ({weakestCategory.pct}%).
                  Focus on these items first for the highest conversion impact.
                </p>
                <div className="space-y-6">
                  {priorityFixes.map((fix, i) => (
                    <div key={i}>
                      <p className="text-base font-bold text-black mb-1">
                        {i + 1}. {fix.text}
                      </p>
                      <p className="text-base text-gray-500 leading-relaxed">
                        {fix.fix}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* Reset button */}
      {checkedCount > 0 && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <button
                onClick={handleReset}
                className="text-base font-bold text-gray-500 hover:text-black transition-colors motion-reduce:transition-none min-h-[44px] px-4 py-2 border border-gray-200 hover:border-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Reset Audit
              </button>
            </Animate>
          </div>
        </section>
      )}

      {/* CTA */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Want a Professional CRO Audit?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team will analyze your website in depth, identify specific
              conversion bottlenecks, and provide a prioritized action plan to
              increase your leads and revenue.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
            >
              Request a Free CRO Audit &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Cro Audit"
        services={[
          { title: "Website Development", desc: "Fast, accessible websites built for conversion and growth.", href: "/services/website-development" },
          { title: "SEO", desc: "Technical SEO baked in from day one for maximum visibility.", href: "/services/seo" },
          { title: "Digital Marketing", desc: "Drive the right traffic to your optimized digital experience.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
          { title: "Contrast Checker", href: "/resources/contrast-checker" },
          { title: "Conversion Checklist", href: "/resources/conversion-checklist" },
          { title: "Conversion Funnel Simulator", href: "/resources/conversion-funnel-simulator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
