"use client";

import { useState } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";

const sources = ["google", "facebook", "instagram", "linkedin", "twitter", "tiktok", "email", "newsletter", "youtube", "reddit", "bing", "pinterest"];
const mediums = ["cpc", "cpm", "social", "email", "organic", "referral", "display", "video", "affiliate", "banner", "retargeting", "native"];

export default function UtmBuilderPage() {
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);

  const params = new URLSearchParams();
  if (source) params.set("utm_source", source);
  if (medium) params.set("utm_medium", medium);
  if (campaign) params.set("utm_campaign", campaign);
  if (term) params.set("utm_term", term);
  if (content) params.set("utm_content", content);

  const paramString = params.toString();
  const hasRequired = url && source && medium && campaign;
  const generatedUrl = hasRequired
    ? `${url.includes("?") ? url + "&" : url + "?"}${paramString}`
    : "";

  function handleCopy() {
    if (generatedUrl) {
      navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <article>
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              UTM Link Builder
            </h1>
            <SectionDesc>
              Generate UTM-tagged URLs for your marketing campaigns. Track exactly which channels, campaigns, and creatives drive results in Google Analytics.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <Animate animation="fade-up">
            <div>
              <label htmlFor="url" className="block text-base font-bold text-black mb-2">
                Website URL <span className="text-gray-400 font-normal">(required)</span>
              </label>
              <input
                id="url"
                type="url"
                placeholder="https://yourwebsite.com/landing-page"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none"
              />
            </div>
          </Animate>

          <Animate animation="fade-up" delay={60}>
            <div>
              <label htmlFor="source" className="block text-base font-bold text-black mb-2">
                Campaign Source <span className="text-gray-400 font-normal">(required)</span>
              </label>
              <input
                id="source"
                type="text"
                placeholder="e.g., google, facebook, newsletter"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                list="source-suggestions"
                className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none"
              />
              <datalist id="source-suggestions">
                {sources.map((s) => <option key={s} value={s} />)}
              </datalist>
              <p className="text-base text-gray-400 mt-1">The platform or site sending traffic (e.g., google, facebook, newsletter)</p>
            </div>
          </Animate>

          <Animate animation="fade-up" delay={120}>
            <div>
              <label htmlFor="medium" className="block text-base font-bold text-black mb-2">
                Campaign Medium <span className="text-gray-400 font-normal">(required)</span>
              </label>
              <input
                id="medium"
                type="text"
                placeholder="e.g., cpc, email, social"
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                list="medium-suggestions"
                className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none"
              />
              <datalist id="medium-suggestions">
                {mediums.map((m) => <option key={m} value={m} />)}
              </datalist>
              <p className="text-base text-gray-400 mt-1">The marketing channel type (e.g., cpc, email, social, display)</p>
            </div>
          </Animate>

          <Animate animation="fade-up" delay={180}>
            <div>
              <label htmlFor="campaign" className="block text-base font-bold text-black mb-2">
                Campaign Name <span className="text-gray-400 font-normal">(required)</span>
              </label>
              <input
                id="campaign"
                type="text"
                placeholder="e.g., spring-sale, brand-awareness-q3"
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none"
              />
              <p className="text-base text-gray-400 mt-1">A name for your campaign (e.g., spring-sale, product-launch-2026)</p>
            </div>
          </Animate>

          <Animate animation="fade-up" delay={240}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="term" className="block text-base font-bold text-black mb-2">
                  Campaign Term <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  id="term"
                  type="text"
                  placeholder="e.g., running+shoes"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none"
                />
                <p className="text-base text-gray-400 mt-1">Paid search keyword</p>
              </div>
              <div>
                <label htmlFor="content" className="block text-base font-bold text-black mb-2">
                  Campaign Content <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  id="content"
                  type="text"
                  placeholder="e.g., banner-v2, blue-cta"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none"
                />
                <p className="text-base text-gray-400 mt-1">Differentiate ad or link variants</p>
              </div>
            </div>
          </Animate>

          {hasRequired && (
            <Animate animation="fade-up">
              <div className="border border-gray-200 overflow-hidden">
                <div className="bg-black text-white p-4">
                  <p className="text-base font-bold">Your UTM-Tagged URL</p>
                </div>
                <div className="p-4">
                  <div className="bg-gray-50 p-4 text-base text-gray-600 break-all font-mono">{generatedUrl}</div>
                  <button
                    onClick={handleCopy}
                    className="mt-3 bg-black text-white px-6 py-3 text-base font-bold hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    {copied ? "Copied!" : "Copy URL"}
                  </button>
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
              UTM Parameter Guide
            </h2>
            <Stagger stagger={60} animation="fade-up" className="space-y-6">
              {[
                { param: "utm_source", desc: "Identifies where the traffic comes from. Use the platform name: google, facebook, newsletter, etc.", example: "utm_source=google" },
                { param: "utm_medium", desc: "Identifies the marketing channel type. Standard values: cpc (paid search), email, social, organic, display, referral.", example: "utm_medium=cpc" },
                { param: "utm_campaign", desc: "The specific campaign name. Use lowercase, hyphens instead of spaces. Be descriptive but concise.", example: "utm_campaign=spring-sale-2026" },
                { param: "utm_term", desc: "Used for paid search to identify the keyword that triggered the ad. Most useful for Google Ads manual tagging.", example: "utm_term=running+shoes" },
                { param: "utm_content", desc: "Differentiates similar content or links within the same campaign. Use for A/B testing ad variations.", example: "utm_content=hero-banner-v2" },
              ].map((item) => (
                <div key={item.param} className="bg-white border border-gray-200 p-6">
                  <h3 className="font-bold text-black text-base mb-1 font-mono">{item.param}</h3>
                  <p className="text-base text-gray-500 leading-relaxed mb-2">{item.desc}</p>
                  <code className="text-base text-gray-400 bg-gray-50 px-2 py-1">{item.example}</code>
                </div>
              ))}
            </Stagger>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              UTM Best Practices
            </h2>
            <div className="space-y-4 text-base text-gray-500 leading-relaxed">
              <div className="border-l-4 border-black pl-4">
                <p className="font-bold text-black">Use consistent naming conventions</p>
                <p>Always use lowercase. Use hyphens instead of spaces. Create a naming document your team follows to keep data clean in analytics.</p>
              </div>
              <div className="border-l-4 border-black pl-4">
                <p className="font-bold text-black">Do not use UTMs for internal links</p>
                <p>UTM parameters are for tracking external traffic sources. Using them on internal links will break your session data and overwrite the original source.</p>
              </div>
              <div className="border-l-4 border-black pl-4">
                <p className="font-bold text-black">Track UTM-tagged URLs in a spreadsheet</p>
                <p>Maintain a central document of all your UTM-tagged URLs. This prevents duplicate or conflicting parameters across campaigns.</p>
              </div>
              <div className="border-l-4 border-black pl-4">
                <p className="font-bold text-black">Use URL shorteners for social sharing</p>
                <p>Long UTM-tagged URLs look cluttered on social media. Use a URL shortener to keep links clean while preserving tracking data.</p>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help With Campaign Tracking?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our analytics team can set up comprehensive tracking, attribution models, and reporting dashboards for your marketing campaigns.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Get Analytics Help &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
