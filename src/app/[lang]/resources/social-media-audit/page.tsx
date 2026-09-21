"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

interface ChecklistItem {
  id: string;
  text: string;
}

interface Category {
  title: string;
  items: ChecklistItem[];
}

const categories: Category[] = [
  {
    title: "Profile Optimization",
    items: [
      { id: "po1", text: "Bio/about section is complete, keyword-rich, and clearly states what you do" },
      { id: "po2", text: "Profile photo and cover image are high-quality and on-brand" },
      { id: "po3", text: "Contact information (email, phone, address) is accurate on all platforms" },
      { id: "po4", text: "Link in bio points to a current, relevant landing page or link hub" },
      { id: "po5", text: "Username/handle is consistent across all social media platforms" },
    ],
  },
  {
    title: "Content Strategy",
    items: [
      { id: "cs1", text: "Posting frequency is consistent and matches platform best practices" },
      { id: "cs2", text: "Content pillars (3-5 core topics) are defined and documented" },
      { id: "cs3", text: "A content calendar is maintained and followed each month" },
      { id: "cs4", text: "Visual style (colors, fonts, imagery) is consistent across all posts" },
      { id: "cs5", text: "Brand voice and tone are consistent across all platforms and posts" },
    ],
  },
  {
    title: "Engagement",
    items: [
      { id: "en1", text: "Comments and DMs are responded to within 24 hours" },
      { id: "en2", text: "Community management guidelines are documented and followed" },
      { id: "en3", text: "User-generated content (UGC) strategy is in place and actively encouraged" },
      { id: "en4", text: "Hashtag strategy is researched, documented, and updated regularly" },
      { id: "en5", text: "Competitor activity is monitored at least monthly for insights" },
    ],
  },
  {
    title: "Analytics",
    items: [
      { id: "an1", text: "Clear, measurable social media goals are defined and documented" },
      { id: "an2", text: "Tracking is set up (UTM parameters, pixel, conversion events)" },
      { id: "an3", text: "Monthly performance reports are generated and reviewed" },
      { id: "an4", text: "Audience demographics are reviewed quarterly and inform strategy" },
      { id: "an5", text: "Top-performing content is identified and used to guide future posts" },
    ],
  },
  {
    title: "Growth",
    items: [
      { id: "gr1", text: "Follower growth rate is tracked monthly with benchmarks set" },
      { id: "gr2", text: "Collaboration strategy (influencers, partners, guests) is defined" },
      { id: "gr3", text: "Paid amplification is used strategically for top content" },
      { id: "gr4", text: "Cross-promotion between platforms and channels is active" },
      { id: "gr5", text: "Trending formats and platform features are adopted regularly" },
    ],
  },
];

const actionItemsByCategory: Record<string, string[]> = {
  "Profile Optimization": [
    "Rewrite your bio on every platform to include your primary keyword and a clear value proposition",
    "Update profile and cover images to match your current brand guidelines",
    "Audit all contact info across platforms and correct any inconsistencies",
    "Set up a link-in-bio tool to direct followers to your most important pages",
  ],
  "Content Strategy": [
    "Define 3-5 content pillars that align with your business goals and audience interests",
    "Create a 30-day content calendar with post types, topics, and publish dates",
    "Build a visual template kit to maintain consistent branding across posts",
    "Document your brand voice guidelines and share them with anyone who creates content",
  ],
  Engagement: [
    "Set up notifications so you can respond to comments and DMs within a few hours",
    "Create a UGC campaign or branded hashtag to encourage customer-created content",
    "Research and build a hashtag bank of 30-50 relevant hashtags organized by topic",
    "Schedule a monthly competitor review to identify content gaps and opportunities",
  ],
  Analytics: [
    "Define 2-3 SMART goals for each platform tied to business outcomes",
    "Set up UTM parameters for every link you share on social media",
    "Build a monthly reporting template that tracks your most important metrics",
    "Review audience demographics this week and note any shifts from last quarter",
  ],
  Growth: [
    "Calculate your monthly follower growth rate and set a realistic 90-day target",
    "Identify 5 potential collaboration partners and reach out this month",
    "Allocate a small budget to boost your top-performing post each week",
    "Pick one new platform feature or trending format to test this month",
  ],
};

function getGradeInfo(pct: number): { letter: string; label: string } {
  if (pct >= 90) return { letter: "A", label: "Excellent" };
  if (pct >= 70) return { letter: "B", label: "Good" };
  if (pct >= 50) return { letter: "C", label: "Fair" };
  return { letter: "D", label: "Needs Work" };
}

export default function SocialMediaAuditPage() {
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
    () => categories.reduce((sum, cat) => sum + cat.items.length, 0),
    []
  );

  const checkedCount = checked.size;
  const overallPct = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;
  const overallGrade = getGradeInfo(overallPct);

  const categoryScores = useMemo(() => {
    return categories.map((cat) => {
      const catChecked = cat.items.filter((item) => checked.has(item.id)).length;
      const catPct = Math.round((catChecked / cat.items.length) * 100);
      return { title: cat.title, checked: catChecked, total: cat.items.length, pct: catPct };
    });
  }, [checked]);

  const lowestCategory = useMemo(() => {
    if (checkedCount === 0) return null;
    let lowest = categoryScores[0];
    for (const score of categoryScores) {
      if (score.pct < lowest.pct) lowest = score;
    }
    return lowest;
  }, [categoryScores, checkedCount]);

  const actionItems = lowestCategory ? actionItemsByCategory[lowestCategory.title] : null;

  return (
    <article>
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/social-media-planner" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Social Media Planner</Link>
                <Link href="/resources/social-media-roi" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Social Media ROI</Link>
                <Link href="/resources/social-calendar" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Social Calendar</Link>
                <Link href="/resources/social-post-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Social Post Generator</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Social Media Audit Checklist",
          description:
            "A free 25-item interactive checklist to audit your social media presence across profile optimization, content strategy, engagement, analytics, and growth.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Social Media Audit" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Social Media Audit Checklist
            </h1>
            <SectionDesc>
              Check off each item that applies to your social media presence. Your score updates in real time across 5 categories with 25 total checkpoints.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Sticky Score Bar */}
      <section className="px-6 lg:px-12 pb-6">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="sticky top-20 z-10 bg-white py-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-bold text-black">
                  {checkedCount}/{totalItems} items checked
                </span>
                <span className="text-base font-bold text-black">{overallPct}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-black transition-all duration-300 motion-reduce:transition-none"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
              {checkedCount > 0 && (
                <div className="flex items-center gap-3 mt-2">
                  <span className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                    Grade: {overallGrade.letter}
                  </span>
                  <span className="text-base text-gray-500">{overallGrade.label}</span>
                </div>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* Checklist Categories */}
      <section className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto space-y-10">
          {categories.map((cat, catIdx) => {
            const score = categoryScores[catIdx];
            const catGrade = getGradeInfo(score.pct);
            return (
              <Animate key={cat.title} animation="fade-up">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                      {cat.title}
                    </h2>
                    <span className="text-base text-gray-400">
                      {score.checked}/{score.total}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 overflow-hidden mb-4">
                    <div
                      className="h-full bg-black transition-all duration-300 motion-reduce:transition-none"
                      style={{ width: `${score.pct}%` }}
                    />
                  </div>
                  {score.checked > 0 && (
                    <p className="text-base text-gray-500 mb-3">
                      {catGrade.letter} ({score.pct}%)
                    </p>
                  )}
                  <div className="space-y-0">
                    {cat.items.map((item) => (
                      <label
                        key={item.id}
                        className="flex items-start gap-3 p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors motion-reduce:transition-none min-h-[44px]"
                      >
                        <input
                          type="checkbox"
                          checked={checked.has(item.id)}
                          onChange={() => toggleItem(item.id)}
                          className="mt-1 w-5 h-5 flex-shrink-0 accent-black"
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

      {/* What to Do Next */}
      {actionItems && lowestCategory && (
        <section className="px-6 lg:px-12 pb-20">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black tracking-tight mb-2">
                What to Do Next
              </h2>
              <p className="text-base text-gray-500 mb-6">
                Your lowest-scoring category is{" "}
                <span className="font-bold text-black">{lowestCategory.title}</span> at{" "}
                {lowestCategory.pct}%. Focus here first:
              </p>
            </Animate>
            <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {actionItems.map((action) => (
                <div
                  key={action}
                  className="p-5 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
                >
                  <p className="text-base text-gray-700 leading-relaxed">{action}</p>
                </div>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Want a Professional Social Media Audit?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our social media team will audit your accounts in detail and build a data-driven strategy to improve your presence, engagement, and growth.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
            >
              Get a Free Social Media Audit &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
