"use client";

import { useState } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

function hexToRgb(hex: string): [number, number, number] | null {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return null;
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return [r, g, b];
}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r / 255, g / 255, b / 255].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1: string, hex2: string): number | null {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return null;
  const l1 = relativeLuminance(...rgb1);
  const l2 = relativeLuminance(...rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export default function ContrastCheckerPage() {
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#ffffff");

  const ratio = contrastRatio(fg, bg);
  const ratioDisplay = ratio ? ratio.toFixed(2) : "—";

  const aaLargePass = ratio !== null && ratio >= 3;
  const aaNormalPass = ratio !== null && ratio >= 4.5;
  const aaaLargePass = ratio !== null && ratio >= 4.5;
  const aaaNormalPass = ratio !== null && ratio >= 7;

  const fgValid = hexToRgb(fg) !== null;
  const bgValid = hexToRgb(bg) !== null;

  return (
    <article>
      <nav className="px-6 lg:px-12 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/resources" className="hover:text-black transition-colors">Resources</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">Color Contrast Checker</li>
        </ol>
      </nav>
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Color Contrast Checker
            </h1>
            <SectionDesc>
              Check if your text and background color combinations meet WCAG accessibility standards. Ensure your website is readable for all users.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="fg-color" className="block text-base font-bold text-black mb-2">Text Color</label>
                <div className="flex items-center gap-3">
                  <input
                    id="fg-color"
                    type="color"
                    value={fgValid ? fg : "#000000"}
                    onChange={(e) => setFg(e.target.value)}
                    className="w-12 h-12 border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={fg}
                    onChange={(e) => setFg(e.target.value)}
                    placeholder="#000000"
                    className="flex-1 border border-gray-300 px-4 py-3 text-base font-mono focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="bg-color" className="block text-base font-bold text-black mb-2">Background Color</label>
                <div className="flex items-center gap-3">
                  <input
                    id="bg-color"
                    type="color"
                    value={bgValid ? bg : "#ffffff"}
                    onChange={(e) => setBg(e.target.value)}
                    className="w-12 h-12 border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={bg}
                    onChange={(e) => setBg(e.target.value)}
                    placeholder="#ffffff"
                    className="flex-1 border border-gray-300 px-4 py-3 text-base font-mono focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => { const t = fg; setFg(bg); setBg(t); }}
              className="mb-8 border border-gray-200 px-4 py-2 text-base font-medium text-black hover:bg-gray-50 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Swap Colors
            </button>
          </Animate>

          {fgValid && bgValid && (
            <Animate animation="fade-up">
              <div
                className="p-8 mb-8 border border-gray-200"
                style={{ backgroundColor: bg, color: fg }}
              >
                <p className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  Preview: Large Text (24px+)
                </p>
                <p className="text-base">
                  Preview: Normal text (16px). This is how your text and background combination looks at standard body text size. Make sure it is easy to read.
                </p>
              </div>

              <div className="border border-gray-200 overflow-hidden mb-8">
                <div className="bg-black text-white p-6 text-center">
                  <p className="text-base text-gray-400">Contrast Ratio</p>
                  <p className="font-[family-name:var(--font-display)] text-5xl font-extrabold">{ratioDisplay}:1</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
                  {[
                    { label: "AA Large", pass: aaLargePass, req: "3:1" },
                    { label: "AA Normal", pass: aaNormalPass, req: "4.5:1" },
                    { label: "AAA Large", pass: aaaLargePass, req: "4.5:1" },
                    { label: "AAA Normal", pass: aaaNormalPass, req: "7:1" },
                  ].map((item) => (
                    <div key={item.label} className="p-4 text-center">
                      <div className={`text-2xl font-bold mb-1 ${item.pass ? "text-black" : "text-gray-300"}`}>
                        {item.pass ? "Pass" : "Fail"}
                      </div>
                      <p className="text-base font-bold text-black">{item.label}</p>
                      <p className="text-base text-gray-400">Min {item.req}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Animate>
          )}
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              Understanding WCAG Contrast Requirements
            </h2>
            <div className="space-y-6 text-base text-gray-500 leading-relaxed">
              <div>
                <h3 className="font-bold text-black mb-2">WCAG AA (Minimum)</h3>
                <p>Normal text (under 18pt or 14pt bold) needs at least 4.5:1 contrast ratio. Large text (18pt+ or 14pt+ bold) needs at least 3:1. This is the standard most businesses should meet.</p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">WCAG AAA (Enhanced)</h3>
                <p>Normal text needs at least 7:1 contrast ratio. Large text needs at least 4.5:1. This is the highest standard and recommended for body text on content-heavy pages.</p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Why Contrast Matters</h3>
                <p>Good color contrast ensures your content is readable by people with visual impairments, color blindness, and users in challenging lighting conditions. It also improves readability for all users and is increasingly a legal requirement.</p>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need an Accessibility Audit?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our web development team can audit your website for WCAG compliance and implement fixes to ensure accessibility for all users.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Get an Accessibility Audit &rarr;
            </Link>
          </Animate>
        </div>
      </section>
          
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/website-grader" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Website Grader</Link>
                <Link href="/resources/website-audit" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Website Audit</Link>
                <Link href="/resources/speed-test" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Speed Test</Link>
                <Link href="/resources/landing-page-grader" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Landing Page Grader</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Color Contrast Checker — Verify WCAG Accessibility",
          description: "Use our free color contrast checker to verify your text and background colors meet WCAG accessibility standards. Check AA and AAA compliance for normal and large text.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Contrast Checker"
        services={[
          { title: "Website Development", desc: "Fast, accessible websites built for conversion and growth.", href: "/services/website-development" },
          { title: "SEO", desc: "Technical SEO baked in from day one for maximum visibility.", href: "/services/seo" },
          { title: "Digital Marketing", desc: "Drive the right traffic to your optimized digital experience.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
          { title: "Conversion Checklist", href: "/resources/conversion-checklist" },
          { title: "Conversion Funnel Simulator", href: "/resources/conversion-funnel-simulator" },
          { title: "Cro Audit", href: "/resources/cro-audit" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
