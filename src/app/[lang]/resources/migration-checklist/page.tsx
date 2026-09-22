"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

interface CheckItem {
  id: string;
  text: string;
}

interface Phase {
  title: string;
  items: CheckItem[];
}

const phases: Phase[] = [
  {
    title: "Pre-Migration Planning",
    items: [
      { id: "p1", text: "Audit and document all current URLs and their page types" },
      { id: "p2", text: "Record current search rankings, traffic, and top-performing pages" },
      { id: "p3", text: "Create a full backup of files, database, and media assets" },
      { id: "p4", text: "Set up a staging environment to test the new site before launch" },
      { id: "p5", text: "Build a complete 301 redirect map from old URLs to new URLs" },
      { id: "p6", text: "Notify stakeholders of the migration timeline and expected downtime" },
    ],
  },
  {
    title: "Technical Setup",
    items: [
      { id: "t1", text: "Configure new hosting environment and verify server requirements" },
      { id: "t2", text: "Install and verify SSL certificate on the new domain or server" },
      { id: "t3", text: "Plan DNS changes and set a low TTL value before the switch" },
      { id: "t4", text: "Implement all server-side 301 redirects from the redirect map" },
      { id: "t5", text: "Set up canonical tags on all pages to prevent duplicate content" },
      { id: "t6", text: "Configure robots.txt to allow indexing on production only" },
    ],
  },
  {
    title: "Content Migration",
    items: [
      { id: "c1", text: "Transfer all pages, posts, and custom content types" },
      { id: "c2", text: "Verify all images, videos, and downloadable files are accessible" },
      { id: "c3", text: "Check and fix all internal links to use the new URL structure" },
      { id: "c4", text: "Update external links and ensure outbound links still work" },
      { id: "c5", text: "Migrate all title tags, meta descriptions, and Open Graph tags" },
      { id: "c6", text: "Transfer structured data markup (schema.org) to the new site" },
    ],
  },
  {
    title: "Testing",
    items: [
      { id: "q1", text: "Test every redirect and confirm correct destination pages" },
      { id: "q2", text: "Run a full site crawl to check for broken links and 404 errors" },
      { id: "q3", text: "Verify mobile responsiveness on multiple devices and screen sizes" },
      { id: "q4", text: "Run a page speed audit and optimize Core Web Vitals" },
      { id: "q5", text: "Test all forms, checkout flows, and interactive functionality" },
      { id: "q6", text: "Perform cross-browser testing on Chrome, Safari, Firefox, and Edge" },
    ],
  },
  {
    title: "Post-Launch",
    items: [
      { id: "l1", text: "Submit the new XML sitemap to Google Search Console" },
      { id: "l2", text: "Monitor 404 errors daily for the first two weeks after launch" },
      { id: "l3", text: "Verify Google Analytics and all tracking scripts are firing correctly" },
      { id: "l4", text: "Check Search Console for crawl errors, indexing issues, and coverage" },
      { id: "l5", text: "Monitor keyword rankings daily and compare to pre-migration baseline" },
      { id: "l6", text: "Get stakeholder sign-off and document any remaining action items" },
    ],
  },
];

const commonMistakes = [
  {
    title: "Skipping the redirect map",
    desc: "Failing to create comprehensive 301 redirects is the number one cause of lost rankings after migration. Every old URL needs a destination.",
  },
  {
    title: "Launching without a staging test",
    desc: "Going live without thorough testing on a staging environment leads to broken pages, missing content, and emergency fixes under pressure.",
  },
  {
    title: "Ignoring internal links",
    desc: "Updating the URL structure but leaving old internal links in your content creates chains of redirects and broken user journeys.",
  },
  {
    title: "Forgetting analytics and tracking",
    desc: "Losing days or weeks of analytics data because tracking codes were not migrated means you cannot measure the impact of the migration.",
  },
  {
    title: "Not monitoring after launch",
    desc: "Assuming the migration is done at launch is a mistake. The first two weeks require daily monitoring of 404s, rankings, and crawl errors.",
  },
];

export default function MigrationChecklistPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalItems = useMemo(
    () => phases.reduce((sum, p) => sum + p.items.length, 0),
    []
  );
  const checkedCount = checked.size;
  const overallPct =
    totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Website Migration Checklist",
    description:
      "An interactive 30-point checklist to ensure a smooth website migration without losing SEO rankings or breaking functionality.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <article>
      <JsonLd data={webAppSchema} />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Migration Checklist" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Website Migration Checklist
            </h1>
            <SectionDesc>
              A 30-point interactive checklist organized into 5 phases. Check
              off each item as you complete it to track your migration progress
              in real time.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Overall Progress */}
      <section className="px-6 lg:px-12 pb-6">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="sticky top-20 z-10 bg-white py-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-bold text-black">
                  {checkedCount}/{totalItems} complete
                </span>
                <span className="text-base font-bold text-black">
                  {overallPct}%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-black transition-all duration-300 motion-reduce:transition-none"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
              {checkedCount > 0 && checkedCount < totalItems && (
                <p className="text-base text-gray-500 mt-2">
                  {totalItems - checkedCount} items remaining
                </p>
              )}
              {checkedCount === totalItems && (
                <p className="text-base text-black font-bold mt-2">
                  Migration checklist complete. You are ready to launch.
                </p>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* Phases */}
      <section className="px-6 lg:px-12 pb-20" aria-label="Checklist phases">
        <div className="max-w-3xl mx-auto space-y-12">
          {phases.map((phase, phaseIndex) => {
            const phaseChecked = phase.items.filter((i) =>
              checked.has(i.id)
            ).length;
            const phasePct =
              phase.items.length > 0
                ? Math.round((phaseChecked / phase.items.length) * 100)
                : 0;

            return (
              <Animate key={phase.title} animation="fade-up">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                      Phase {phaseIndex + 1}: {phase.title}
                    </h2>
                    <span className="text-base text-gray-400">
                      {phaseChecked}/{phase.items.length}
                    </span>
                  </div>

                  {/* Phase progress bar */}
                  <div className="w-full h-2 bg-gray-100 overflow-hidden mb-4">
                    <div
                      className="h-full bg-black transition-all duration-300 motion-reduce:transition-none"
                      style={{ width: `${phasePct}%` }}
                    />
                  </div>

                  <div className="space-y-0">
                    {phase.items.map((item) => (
                      <label
                        key={item.id}
                        className="flex items-start gap-3 p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors motion-reduce:transition-none min-h-[44px]"
                      >
                        <input
                          type="checkbox"
                          checked={checked.has(item.id)}
                          onChange={() => toggleItem(item.id)}
                          className="mt-1 w-5 h-5 flex-shrink-0 accent-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
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

      {/* Common Migration Mistakes */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Common mistakes">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Avoid These Pitfalls</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-3">
              Common Migration Mistakes
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 mb-10">
              Even experienced teams make these errors. Review them before you
              start your migration.
            </p>
          </Animate>

          <Stagger stagger={100} animation="fade-up" className="space-y-6">
            {commonMistakes.map((mistake) => (
              <div
                key={mistake.title}
                className="bg-white border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                  {mistake.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  {mistake.desc}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Black CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help With Your Website Migration?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team handles end-to-end website migrations, from planning
              redirects to monitoring post-launch performance, so you do not lose
              rankings or traffic.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
            >
              Talk to Our Team &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Migration Checklist"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Martech Stack Planner", href: "/resources/martech-stack-planner" },
          { title: "Meeting Agenda Builder", href: "/resources/meeting-agenda-builder" },
          { title: "Meta Description Generator", href: "/resources/meta-description-generator" },
          { title: "Og Preview", href: "/resources/og-preview" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
