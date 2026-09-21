"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { JsonLd } from "@/components/json-ld";

const sections = [
  {
    title: "Account Structure",
    items: [
      { id: "as1", text: "Campaign naming convention is consistent and descriptive" },
      { id: "as2", text: "Ad groups are tightly themed (15-20 keywords max per group)" },
      { id: "as3", text: "Campaigns are organized by match type, location, or intent level" },
      { id: "as4", text: "No duplicate keywords across campaigns/ad groups" },
      { id: "as5", text: "Budget is allocated based on campaign performance, not evenly split" },
    ],
  },
  {
    title: "Keyword Management",
    items: [
      { id: "km1", text: "Negative keyword lists are set up and maintained regularly" },
      { id: "km2", text: "Search terms report is reviewed weekly for irrelevant queries" },
      { id: "km3", text: "No broad match keywords running without Smart Bidding" },
      { id: "km4", text: "Low-performing keywords are paused or removed" },
      { id: "km5", text: "Keyword match types align with campaign goals" },
    ],
  },
  {
    title: "Ad Copy & Creative",
    items: [
      { id: "ac1", text: "Each ad group has at least 3 responsive search ads" },
      { id: "ac2", text: "Ad headlines include the target keyword" },
      { id: "ac3", text: "Each ad has a clear call-to-action" },
      { id: "ac4", text: "Ad extensions are set up: sitelinks, callouts, structured snippets" },
      { id: "ac5", text: "Pinned headlines are used intentionally, not excessively" },
      { id: "ac6", text: "Ad copy aligns with the landing page content" },
    ],
  },
  {
    title: "Landing Pages",
    items: [
      { id: "lp1", text: "Landing page loads in under 3 seconds on mobile" },
      { id: "lp2", text: "Headline matches the ad copy and search intent" },
      { id: "lp3", text: "Clear, single primary CTA above the fold" },
      { id: "lp4", text: "Mobile experience is tested on real devices" },
      { id: "lp5", text: "Form fields are minimal (name, email, phone max)" },
      { id: "lp6", text: "Trust signals are present (reviews, logos, security badges)" },
    ],
  },
  {
    title: "Conversion Tracking",
    items: [
      { id: "ct1", text: "Conversion actions are set up and firing correctly" },
      { id: "ct2", text: "Primary vs. secondary conversions are properly classified" },
      { id: "ct3", text: "Conversion values are assigned where applicable" },
      { id: "ct4", text: "Enhanced conversions are enabled for better attribution" },
      { id: "ct5", text: "Google Ads conversion data matches analytics data" },
    ],
  },
  {
    title: "Bidding & Budget",
    items: [
      { id: "bb1", text: "Bid strategy aligns with campaign objective" },
      { id: "bb2", text: "Campaigns with enough conversion data use Smart Bidding" },
      { id: "bb3", text: "Target CPA or ROAS targets are realistic based on history" },
      { id: "bb4", text: "Budget is not limiting campaigns that are performing well" },
      { id: "bb5", text: "Shared budgets are not causing one campaign to starve another" },
    ],
  },
  {
    title: "Targeting & Settings",
    items: [
      { id: "ts1", text: "Location targeting is set to 'Presence' not 'Presence or interest'" },
      { id: "ts2", text: "Ad schedule is set based on performance data" },
      { id: "ts3", text: "Device bid adjustments reflect performance differences" },
      { id: "ts4", text: "Audience segments are applied for observation or targeting" },
      { id: "ts5", text: "Remarketing lists are set up and being used" },
    ],
  },
];

export default function PpcAuditChecklistPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalItems = useMemo(() => sections.reduce((sum, s) => sum + s.items.length, 0), []);
  const checkedCount = checked.size;
  const pct = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  let grade: string;
  if (pct >= 90) grade = "Excellent — Your PPC account is well-optimized";
  else if (pct >= 70) grade = "Good — A few areas need attention";
  else if (pct >= 50) grade = "Fair — Several optimization opportunities exist";
  else grade = "Needs Work — Significant improvements available";

  return (
    <article>
      <nav className="px-6 lg:px-12 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><a href="/" className="hover:text-black transition-colors">Home</a></li>
          <li aria-hidden="true">/</li>
          <li><a href="/resources" className="hover:text-black transition-colors">Resources</a></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">PPC Audit Checklist</li>
        </ol>
      </nav>
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              PPC Audit Checklist
            </h1>
            <SectionDesc>
              A 37-point checklist to evaluate your Google Ads account. Check off each item to see your account health score.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-6">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="sticky top-20 z-10 bg-white py-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-bold text-black">{checkedCount}/{totalItems} items checked</span>
                <span className="text-base font-bold text-black">{pct}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 overflow-hidden">
                <div className="h-full bg-black transition-all motion-reduce:transition-none duration-300" style={{ width: `${pct}%` }} />
              </div>
              {checkedCount > 0 && (
                <p className="text-base text-gray-500 mt-2">{grade}</p>
              )}
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-20">
        <div className="max-w-3xl mx-auto space-y-10">
          {sections.map((section) => {
            const sectionChecked = section.items.filter((i) => checked.has(i.id)).length;
            return (
              <Animate key={section.title} animation="fade-up">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                      {section.title}
                    </h2>
                    <span className="text-base text-gray-400">{sectionChecked}/{section.items.length}</span>
                  </div>
                  <div className="space-y-0">
                    {section.items.map((item) => (
                      <label
                        key={item.id}
                        className="flex items-start gap-3 p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors motion-reduce:transition-none"
                      >
                        <input
                          type="checkbox"
                          checked={checked.has(item.id)}
                          onChange={() => toggleItem(item.id)}
                          className="mt-1 w-5 h-5 flex-shrink-0 accent-black"
                        />
                        <span className={`text-base leading-relaxed ${checked.has(item.id) ? "text-gray-400 line-through" : "text-gray-700"}`}>
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

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Want a Professional PPC Audit?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our PPC specialists will audit your Google Ads account in detail and identify specific opportunities to reduce waste and improve performance.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Request a Free PPC Audit &rarr;
            </Link>
          </Animate>
        </div>
      </section>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "PPC Audit Checklist — Find Wasted Ad Spend Fast",
          description: "Audit your PPC campaigns with this free checklist covering account structure, keywords, ad copy, bidding strategy, and conversion tracking. Stop wasting budget today.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    </article>
  );
}
