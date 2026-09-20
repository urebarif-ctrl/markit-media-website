"use client";

import { useState } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel } from "@/components/section";

interface CheckItem {
  id: string;
  label: string;
  category: string;
  tip: string;
}

const checks: CheckItem[] = [
  { id: "ssl", label: "Website uses HTTPS", category: "Technical", tip: "Install an SSL certificate. Most hosting providers offer free SSL via Let's Encrypt." },
  { id: "mobile", label: "Website is mobile-responsive", category: "Technical", tip: "Test your site with Google's Mobile-Friendly Test tool and fix any issues." },
  { id: "speed", label: "Page loads in under 3 seconds", category: "Technical", tip: "Compress images, enable caching, minimize JavaScript, and use a CDN." },
  { id: "sitemap", label: "XML sitemap submitted to Google Search Console", category: "Technical", tip: "Generate a sitemap and submit it in Google Search Console under Sitemaps." },
  { id: "robots", label: "Robots.txt file is configured correctly", category: "Technical", tip: "Check that your robots.txt is not blocking important pages. Test in Search Console." },
  { id: "gsc", label: "Google Search Console is set up and verified", category: "Technical", tip: "Verify your site in Search Console to monitor indexing and search performance." },
  { id: "ga4", label: "Google Analytics 4 is installed", category: "Analytics", tip: "Install GA4 with proper event tracking to measure user behavior and conversions." },
  { id: "goals", label: "Conversion goals are configured in analytics", category: "Analytics", tip: "Set up key events for form submissions, purchases, phone calls, and other conversions." },
  { id: "title", label: "Every page has a unique title tag (under 60 characters)", category: "On-Page", tip: "Write descriptive, keyword-relevant titles for each page. Keep them under 60 characters." },
  { id: "meta", label: "Every page has a unique meta description", category: "On-Page", tip: "Write compelling meta descriptions (150-160 characters) for each page." },
  { id: "h1", label: "Every page has exactly one H1 tag", category: "On-Page", tip: "Each page should have a single H1 that clearly describes the page content." },
  { id: "hierarchy", label: "Heading tags follow a logical hierarchy (H1 > H2 > H3)", category: "On-Page", tip: "Use headings to structure content logically. Don't skip levels." },
  { id: "alt", label: "All images have descriptive alt text", category: "On-Page", tip: "Add alt text that describes the image content for accessibility and SEO." },
  { id: "internal", label: "Pages are connected with internal links", category: "On-Page", tip: "Link related pages together to help users and search engines navigate your site." },
  { id: "gbp", label: "Google Business Profile is claimed and optimized", category: "Local", tip: "Add complete info, photos, posts, and respond to reviews on your Google Business Profile." },
  { id: "nap", label: "NAP (Name, Address, Phone) is consistent across the web", category: "Local", tip: "Ensure your business name, address, and phone are identical everywhere they appear online." },
  { id: "schema", label: "Structured data (schema markup) is implemented", category: "Technical", tip: "Add Organization, LocalBusiness, or relevant schema markup. Test with Google's Rich Results Test." },
  { id: "404", label: "No broken links or 404 errors on the site", category: "Technical", tip: "Use a tool like Screaming Frog or Ahrefs to find and fix broken links." },
  { id: "content", label: "Key pages have 500+ words of useful content", category: "Content", tip: "Write comprehensive, helpful content for your most important pages." },
  { id: "blog", label: "Blog is active with regular content", category: "Content", tip: "Publish quality content regularly — even monthly is better than nothing." },
];

const categories = [...new Set(checks.map((c) => c.category))];

export default function SEOChecklistPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [showTips, setShowTips] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    const next = new Set(checked);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setChecked(next);
  };

  const toggleTip = (id: string) => {
    const next = new Set(showTips);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setShowTips(next);
  };

  const score = Math.round((checked.size / checks.length) * 100);
  const getGrade = () => {
    if (score >= 90) return { grade: "A", color: "text-black", msg: "Excellent SEO foundation." };
    if (score >= 75) return { grade: "B", color: "text-black", msg: "Good foundation with room to improve." };
    if (score >= 50) return { grade: "C", color: "text-gray-600", msg: "Several important areas need attention." };
    if (score >= 25) return { grade: "D", color: "text-gray-500", msg: "Significant SEO work needed." };
    return { grade: "F", color: "text-gray-400", msg: "Major SEO gaps — start with the basics." };
  };

  const { grade, color, msg } = getGrade();

  return (
    <article>
      <nav className="px-6 lg:px-12 pt-20 pb-4" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-gray-400">
          <li><Link href="/" className="hover:text-black transition-colors motion-reduce:transition-none">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/resources" className="hover:text-black transition-colors motion-reduce:transition-none">Resources</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-black font-medium">SEO Health Check</li>
        </ol>
      </nav>

      <section className="px-6 lg:px-12 pt-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Interactive Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              SEO Health Check
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-4">
              Check off each item that applies to your website. Your score updates in real time.
            </p>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-8" aria-label="Score">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black text-white p-8 flex items-center gap-8">
            <div className="text-center flex-shrink-0">
              <div className={`font-[family-name:var(--font-display)] text-5xl font-extrabold ${score >= 50 ? "text-white" : "text-gray-400"}`}>{grade}</div>
              <div className="text-base text-gray-400 mt-1">{score}%</div>
            </div>
            <div>
              <div className="text-base font-bold">{msg}</div>
              <div className="text-base text-gray-400 mt-1">{checked.size} of {checks.length} items completed</div>
            </div>
            <div className="flex-1">
              <div className="w-full bg-white/20 h-3">
                <div className="bg-white h-3 transition-all duration-300" style={{ width: `${score}%` }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-8" aria-label="Checklist">
        <div className="max-w-4xl mx-auto">
          {categories.map((cat) => (
            <div key={cat} className="mb-8">
              <h2 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black uppercase tracking-wide mb-4 pb-2 border-b border-gray-200">
                {cat}
              </h2>
              <div className="space-y-2">
                {checks.filter((c) => c.category === cat).map((item) => (
                  <div key={item.id} className="border border-gray-200 bg-white">
                    <div className="flex items-center gap-4 p-4">
                      <button
                        onClick={() => toggle(item.id)}
                        className={`w-6 h-6 border-2 flex items-center justify-center flex-shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                          checked.has(item.id) ? "bg-black border-black text-white" : "border-gray-300"
                        }`}
                        aria-label={`Mark "${item.label}" as ${checked.has(item.id) ? "incomplete" : "complete"}`}
                      >
                        {checked.has(item.id) && <span className="text-base">&#10003;</span>}
                      </button>
                      <span className={`text-base ${checked.has(item.id) ? "text-gray-400 line-through" : "text-black"} flex-1`}>
                        {item.label}
                      </span>
                      <button
                        onClick={() => toggleTip(item.id)}
                        className="text-base text-gray-400 hover:text-black transition-colors px-2 py-1 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        aria-label={`${showTips.has(item.id) ? "Hide" : "Show"} tip for "${item.label}"`}
                      >
                        {showTips.has(item.id) ? "−" : "?"}
                      </button>
                    </div>
                    {showTips.has(item.id) && (
                      <div className="px-4 pb-4 pl-14 text-base text-gray-500 leading-relaxed">
                        {item.tip}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
            Need Help Fixing These?
          </h2>
          <p className="text-lg text-gray-400 mt-4 mb-8">
            Our SEO team can audit your site, fix technical issues, and build a strategy to improve your search rankings.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none">
              Get a Free SEO Audit &rarr;
            </Link>
            <Link href="/services/seo" className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none">
              SEO Services
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
