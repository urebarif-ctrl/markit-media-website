"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";

const platformOptions = ["Google Ads", "Meta Ads", "LinkedIn Ads", "TikTok Ads", "Email", "Organic Social", "Display / Programmatic"];
const objectiveOptions = ["Awareness", "Traffic", "Leads", "Conversions", "Retargeting", "Engagement", "Brand"];
const audienceOptions = ["Broad", "Lookalike", "Retargeting", "Custom", "Interest", "Keyword", "Demographic"];
const geoOptions = ["US", "UK", "CA", "AU", "AE", "SA", "Global", "EMEA", "APAC", "LATAM"];
const separatorOptions = [
  { label: "Underscore (_)", value: "_" },
  { label: "Hyphen (-)", value: "-" },
  { label: "Pipe (|)", value: "|" },
];

export default function CampaignNamingConventionPage() {
  const [platform, setPlatform] = useState("");
  const [objective, setObjective] = useState("");
  const [audience, setAudience] = useState("");
  const [geo, setGeo] = useState("");
  const [productService, setProductService] = useState("");
  const [creativeVariant, setCreativeVariant] = useState("");
  const [dateFormat, setDateFormat] = useState("YYYYMM");
  const [separator, setSeparator] = useState("_");
  const [copied, setCopied] = useState(false);

  const now = new Date();
  const dateStr = dateFormat === "YYYYMM"
    ? `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`
    : dateFormat === "YYYYQ"
      ? `${now.getFullYear()}Q${Math.ceil((now.getMonth() + 1) / 3)}`
      : `${now.getFullYear()}`;

  const parts = useMemo(() => {
    const segments: string[] = [];
    if (platform) segments.push(platform.replace(/\s+/g, "").replace(/\//g, ""));
    if (objective) segments.push(objective);
    if (audience) segments.push(audience);
    if (geo) segments.push(geo);
    if (productService) segments.push(productService.replace(/\s+/g, separator === "_" ? "-" : "_"));
    if (creativeVariant) segments.push(creativeVariant.replace(/\s+/g, separator === "_" ? "-" : "_"));
    segments.push(dateStr);
    return segments;
  }, [platform, objective, audience, geo, productService, creativeVariant, dateStr, separator]);

  const campaignName = parts.join(separator);

  const utmExample = useMemo(() => {
    const src = platform ? platform.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-") : "source";
    const med = objective === "Awareness" || objective === "Brand" ? "display" : objective === "Leads" || objective === "Conversions" ? "cpc" : "social";
    return `utm_source=${src}&utm_medium=${med}&utm_campaign=${encodeURIComponent(campaignName.toLowerCase())}`;
  }, [platform, objective, campaignName]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="px-6 lg:px-12 py-16">
      <div className="max-w-4xl mx-auto">
        <nav aria-label="Breadcrumb" className="text-base text-gray-400 mb-8">
          <Link href="/resources" className="hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Resources</Link>
          <span className="mx-2">/</span>
          <span className="text-black">Campaign Naming Convention</span>
        </nav>

        <header className="mb-12">
          <p className="text-base font-semibold tracking-widest uppercase text-gray-400 mb-3">Free Organisation Tool</p>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
            Campaign Naming Convention Generator
          </h1>
          <p className="text-lg text-gray-500 mt-4 max-w-2xl">
            Generate consistent, structured campaign names for any platform. Keep your marketing data clean, searchable, and easy to report on.
          </p>
        </header>

        <div className="space-y-8">
          <section className="border border-gray-200 p-6 lg:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-base font-bold text-black mb-2">Platform</label>
                <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black bg-white">
                  <option value="">Select platform</option>
                  {platformOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-base font-bold text-black mb-2">Objective</label>
                <select value={objective} onChange={(e) => setObjective(e.target.value)} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black bg-white">
                  <option value="">Select objective</option>
                  {objectiveOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-base font-bold text-black mb-2">Audience Type</label>
                <select value={audience} onChange={(e) => setAudience(e.target.value)} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black bg-white">
                  <option value="">Select audience</option>
                  {audienceOptions.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-base font-bold text-black mb-2">Geography</label>
                <select value={geo} onChange={(e) => setGeo(e.target.value)} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black bg-white">
                  <option value="">Select geography</option>
                  {geoOptions.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-base font-bold text-black mb-2">Product / Service</label>
                <input type="text" value={productService} onChange={(e) => setProductService(e.target.value)} placeholder="e.g. SEO, WebDesign, MetaAds" className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black" />
              </div>
              <div>
                <label className="block text-base font-bold text-black mb-2">Creative / Variant (optional)</label>
                <input type="text" value={creativeVariant} onChange={(e) => setCreativeVariant(e.target.value)} placeholder="e.g. v1, VideoA, Testimonial" className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-base font-bold text-black mb-2">Date Format</label>
                <select value={dateFormat} onChange={(e) => setDateFormat(e.target.value)} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black bg-white">
                  <option value="YYYYMM">YYYYMM (e.g. 202609)</option>
                  <option value="YYYYQ">YYYYQ (e.g. 2026Q3)</option>
                  <option value="YYYY">YYYY (e.g. 2026)</option>
                </select>
              </div>
              <div>
                <label className="block text-base font-bold text-black mb-2">Separator</label>
                <select value={separator} onChange={(e) => setSeparator(e.target.value)} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black bg-white">
                  {separatorOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
            </div>
          </section>

          <section className="border border-gray-200 p-6 lg:p-8">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-4">Generated Campaign Name</h2>
            <div className="bg-gray-50 p-4 mb-4 flex items-center justify-between gap-4">
              <code className="text-base text-black font-mono break-all">{campaignName || "Select options above"}</code>
              {campaignName && (
                <button onClick={() => copyToClipboard(campaignName)} className="shrink-0 bg-black text-white px-4 py-2 text-base font-medium hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  {copied ? "Copied" : "Copy"}
                </button>
              )}
            </div>

            <h3 className="text-base font-bold text-black mt-6 mb-2">UTM Parameters</h3>
            <div className="bg-gray-50 p-4 flex items-center justify-between gap-4">
              <code className="text-base text-gray-700 font-mono break-all text-[14px]">{utmExample}</code>
              <button onClick={() => copyToClipboard(utmExample)} className="shrink-0 border border-gray-300 text-gray-700 px-4 py-2 text-base font-medium hover:border-black hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                Copy
              </button>
            </div>

            <h3 className="text-base font-bold text-black mt-6 mb-2">Naming Structure</h3>
            <div className="flex flex-wrap gap-1 text-base">
              {["Platform", "Objective", "Audience", "Geo", "Product", "Creative", "Date"].map((segment, i) => (
                <span key={segment}>
                  <span className="bg-black text-white px-2 py-1 font-medium">{segment}</span>
                  {i < 6 && <span className="text-gray-400 mx-1">{separator}</span>}
                </span>
              ))}
            </div>
          </section>

          <section className="border border-gray-200 p-6 lg:p-8">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-4">Why Naming Conventions Matter</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-base">
              <div>
                <h3 className="font-bold text-black mb-2">Clean Reporting</h3>
                <p className="text-gray-600">Consistent names make it easy to filter, group, and analyse campaign performance across platforms.</p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Team Alignment</h3>
                <p className="text-gray-600">Everyone uses the same structure, reducing confusion and making it easy to find campaigns.</p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Scalability</h3>
                <p className="text-gray-600">As your campaigns grow, structured naming prevents the chaos that comes with ad-hoc names.</p>
              </div>
            </div>
          </section>

          <section className="bg-black text-white p-8 lg:p-12 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold mb-4">Need Campaign Management Help?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">Our team manages campaigns across every major platform with disciplined naming, tracking, and reporting.</p>
            <Link href="/contact" className="inline-block bg-white text-black px-10 py-5 text-base font-bold hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Get Campaign Support &rarr;</Link>
          </section>
        </div>
      </div>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Campaign Naming Convention Generator",
          description: "Generate consistent campaign naming conventions for Google Ads, Meta Ads, email, and UTM parameters. Keep your marketing data clean and organised.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    </article>
  );
}
