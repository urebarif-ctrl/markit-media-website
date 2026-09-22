"use client";

import { useState } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

function truncate(str: string, max: number) {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

export default function OgPreviewPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [siteName, setSiteName] = useState("");

  const displayUrl = url || "yourwebsite.com";
  const displayTitle = title || "Your Page Title";
  const displayDesc = description || "Your page description will appear here. Write something compelling that makes people want to click.";
  const displaySite = siteName || "Your Site";

  return (
    <article>
      <nav className="px-6 lg:px-12 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/resources" className="hover:text-black transition-colors">Resources</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">Social Share Preview</li>
        </ol>
      </nav>
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Social Share Preview
            </h1>
            <SectionDesc>
              Preview how your links will look when shared on Facebook, Twitter/X, and LinkedIn. Optimize your Open Graph tags for maximum engagement.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="space-y-4">
              <div>
                <label htmlFor="og-title" className="block text-base font-bold text-black mb-1">
                  og:title
                </label>
                <input
                  id="og-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Your Page Title"
                  maxLength={120}
                  className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black placeholder:text-gray-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus-visible:border-black transition-colors motion-reduce:transition-none"
                />
                <p className="text-base text-gray-400 mt-1">{title.length}/70 characters {title.length > 70 ? "(may be truncated)" : ""}</p>
              </div>
              <div>
                <label htmlFor="og-desc" className="block text-base font-bold text-black mb-1">
                  og:description
                </label>
                <textarea
                  id="og-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A brief description of your page content..."
                  rows={3}
                  maxLength={300}
                  className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black placeholder:text-gray-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus-visible:border-black transition-colors motion-reduce:transition-none resize-none"
                />
                <p className="text-base text-gray-400 mt-1">{description.length}/200 characters {description.length > 200 ? "(will be truncated)" : ""}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="og-url" className="block text-base font-bold text-black mb-1">
                    URL
                  </label>
                  <input
                    id="og-url"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="yourwebsite.com/page"
                    className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black placeholder:text-gray-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus-visible:border-black transition-colors motion-reduce:transition-none"
                  />
                </div>
                <div>
                  <label htmlFor="og-site" className="block text-base font-bold text-black mb-1">
                    Site Name
                  </label>
                  <input
                    id="og-site"
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    placeholder="Your Site Name"
                    className="w-full px-4 py-3 border-2 border-gray-200 text-base text-black placeholder:text-gray-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus-visible:border-black transition-colors motion-reduce:transition-none"
                  />
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-20">
        <div className="max-w-3xl mx-auto space-y-10">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-6">
              Live Preview
            </h2>

            <div className="space-y-8">
              {/* Facebook Preview */}
              <div>
                <h3 className="text-base font-bold text-gray-400 uppercase tracking-wide mb-3">Facebook</h3>
                <div className="border border-gray-200 overflow-hidden max-w-lg">
                  <div className="aspect-[1.91/1] bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-300 text-base">1200 × 630 image</span>
                  </div>
                  <div className="p-3 bg-gray-50">
                    <p className="text-base text-gray-500 uppercase tracking-wide" style={{ fontSize: "12px" }}>
                      {displayUrl.replace(/^https?:\/\//, "").split("/")[0]}
                    </p>
                    <p className="text-base font-bold text-black mt-1 leading-tight">
                      {truncate(displayTitle, 65)}
                    </p>
                    <p className="text-base text-gray-500 mt-1 leading-snug" style={{ fontSize: "14px" }}>
                      {truncate(displayDesc, 155)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Twitter Preview */}
              <div>
                <h3 className="text-base font-bold text-gray-400 uppercase tracking-wide mb-3">Twitter / X</h3>
                <div className="border border-gray-200 overflow-hidden max-w-lg" style={{ borderRadius: "16px" }}>
                  <div className="aspect-[2/1] bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-300 text-base">1200 × 600 image</span>
                  </div>
                  <div className="p-3">
                    <p className="text-base font-bold text-black leading-tight">
                      {truncate(displayTitle, 70)}
                    </p>
                    <p className="text-base text-gray-500 mt-1 leading-snug" style={{ fontSize: "14px" }}>
                      {truncate(displayDesc, 125)}
                    </p>
                    <p className="text-base text-gray-400 mt-1 flex items-center gap-1" style={{ fontSize: "13px" }}>
                      <span aria-hidden="true">🔗</span> {displayUrl.replace(/^https?:\/\//, "").split("/")[0]}
                    </p>
                  </div>
                </div>
              </div>

              {/* LinkedIn Preview */}
              <div>
                <h3 className="text-base font-bold text-gray-400 uppercase tracking-wide mb-3">LinkedIn</h3>
                <div className="border border-gray-200 overflow-hidden max-w-lg">
                  <div className="aspect-[1.91/1] bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-300 text-base">1200 × 628 image</span>
                  </div>
                  <div className="p-3 bg-white">
                    <p className="text-base font-bold text-black leading-tight">
                      {truncate(displayTitle, 60)}
                    </p>
                    <p className="text-base text-gray-400 mt-1" style={{ fontSize: "13px" }}>
                      {displayUrl.replace(/^https?:\/\//, "").split("/")[0]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Animate>

          <Animate animation="fade-up">
            <div className="p-6 bg-gray-50 border border-gray-200">
              <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">
                Required OG Tags
              </h3>
              <pre className="text-base text-gray-600 overflow-x-auto whitespace-pre-wrap leading-relaxed">
{`<meta property="og:title" content="${title || "Your Title"}" />
<meta property="og:description" content="${truncate(description || "Your description", 200)}" />
<meta property="og:url" content="${url || "https://yoursite.com/page"}" />
<meta property="og:site_name" content="${siteName || "Your Site"}" />
<meta property="og:image" content="https://yoursite.com/og-image.jpg" />
<meta property="og:type" content="website" />`}
              </pre>
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Image guidelines">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-8">
              OG Image Size Guidelines
            </h2>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { platform: "Facebook", size: "1200 × 630px", ratio: "1.91:1", note: "Minimum 600 × 315px. Images under 600px display as small links." },
              { platform: "Twitter / X", size: "1200 × 600px", ratio: "2:1", note: "Use twitter:card = summary_large_image for the full-width preview." },
              { platform: "LinkedIn", size: "1200 × 628px", ratio: "1.91:1", note: "Images must be at least 200px wide. Recommended max file size: 5MB." },
            ].map((p) => (
              <div key={p.platform} className="bg-white p-6 border border-gray-200">
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black mb-2">{p.platform}</h3>
                <p className="text-lg font-bold text-black">{p.size}</p>
                <p className="text-base text-gray-400 mb-2">Ratio: {p.ratio}</p>
                <p className="text-base text-gray-500 leading-relaxed">{p.note}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help With Social Media Marketing?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              OG tags are just the start. Let our team build a social media strategy that drives real engagement.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Talk to a Social Media Expert &rarr;
            </Link>
          </Animate>
        </div>
      </section>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Open Graph Preview Tool — See How Your Links Look When Shared",
          description: "Preview how your links appear on Facebook, Twitter/X, and LinkedIn before sharing. Free tool to optimize Open Graph tags and maximize social media engagement.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Og Preview"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Meeting Agenda Builder", href: "/resources/meeting-agenda-builder" },
          { title: "Meta Description Generator", href: "/resources/meta-description-generator" },
          { title: "Migration Checklist", href: "/resources/migration-checklist" },
          { title: "Okr Planner", href: "/resources/okr-planner" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
