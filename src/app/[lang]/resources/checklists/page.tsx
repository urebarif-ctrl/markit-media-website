"use client";

import { useState } from "react";
import Link from "next/link";

interface ChecklistItem {
  label: string;
  tip: string;
}

interface ChecklistCategory {
  title: string;
  items: ChecklistItem[];
}

const checklists: Record<string, ChecklistCategory[]> = {
  "Website Launch": [
    {
      title: "Technical SEO",
      items: [
        { label: "XML sitemap submitted to Google Search Console", tip: "Generate via your CMS or a plugin and submit in GSC > Sitemaps." },
        { label: "Robots.txt configured correctly", tip: "Ensure it allows crawling of important pages and blocks admin, staging, and duplicate paths." },
        { label: "SSL certificate installed (HTTPS)", tip: "All pages should load over HTTPS. Check for mixed content warnings." },
        { label: "Page speed under 3 seconds on mobile", tip: "Test with Google PageSpeed Insights. Optimize images, enable compression, defer JS." },
        { label: "Mobile responsiveness tested", tip: "Use Chrome DevTools device mode to test on various screen sizes." },
        { label: "Canonical tags set on all pages", tip: "Prevents duplicate content issues. Each page should have a self-referencing canonical." },
        { label: "404 page designed with navigation", tip: "A custom 404 should help users find what they need, not dead-end them." },
        { label: "Structured data (JSON-LD) implemented", tip: "Add Organization, WebPage, and relevant schemas. Test with Google Rich Results Test." },
      ],
    },
    {
      title: "On-Page SEO",
      items: [
        { label: "Unique title tag on every page (under 60 chars)", tip: "Include primary keyword near the front. Make it compelling for clicks." },
        { label: "Meta descriptions written (under 160 chars)", tip: "Not a ranking factor, but affects CTR. Include a call to action." },
        { label: "Single H1 per page", tip: "The H1 should contain your primary keyword and describe the page topic." },
        { label: "Image alt text added to all images", tip: "Describe the image content. Include keywords naturally where relevant." },
        { label: "Internal links between related pages", tip: "Link from high-authority pages to important landing pages. Use descriptive anchor text." },
        { label: "URL structure clean and descriptive", tip: "Use hyphens, keep URLs short, include relevant keywords. Avoid parameters." },
      ],
    },
    {
      title: "Analytics & Tracking",
      items: [
        { label: "Google Analytics 4 installed", tip: "Use GTM for cleaner installation. Verify data is flowing in real-time reports." },
        { label: "Google Search Console verified", tip: "Submit your sitemap and check for crawl errors within the first week." },
        { label: "Conversion tracking set up", tip: "Track form submissions, phone calls, purchases, and other key actions." },
        { label: "UTM parameters documented", tip: "Create a naming convention for campaigns to keep analytics clean." },
        { label: "Cookie consent banner implemented", tip: "Required for GDPR/CCPA. Gate analytics on user consent." },
      ],
    },
  ],
  "SEO Monthly": [
    {
      title: "Content & Keywords",
      items: [
        { label: "Publish 2-4 new blog posts", tip: "Target long-tail keywords with clear search intent. Aim for 1500+ words." },
        { label: "Update 2-3 existing high-traffic posts", tip: "Refresh stats, add new sections, update dates. Google rewards fresh content." },
        { label: "Check keyword rankings for target terms", tip: "Use GSC Performance report or a rank tracking tool. Note trends." },
        { label: "Review Search Console for new keyword opportunities", tip: "Look at queries where you rank 8-20. Small improvements can move you to page 1." },
        { label: "Analyze competitor content gaps", tip: "Find topics competitors rank for that you don't cover yet." },
      ],
    },
    {
      title: "Technical Health",
      items: [
        { label: "Check for crawl errors in Search Console", tip: "Fix 404s, server errors, and redirect chains promptly." },
        { label: "Monitor Core Web Vitals", tip: "LCP under 2.5s, FID under 100ms, CLS under 0.1. Fix regressions immediately." },
        { label: "Check for broken links (internal and external)", tip: "Use Screaming Frog or a free broken link checker. Fix or redirect." },
        { label: "Review page speed for top 10 landing pages", tip: "Performance can degrade over time as new scripts and images are added." },
        { label: "Verify sitemap is up to date", tip: "New pages should appear automatically. Check that removed pages are gone." },
      ],
    },
    {
      title: "Off-Page & Authority",
      items: [
        { label: "Earn 2-5 new backlinks", tip: "Guest posts, digital PR, resource page outreach, or broken link building." },
        { label: "Monitor backlink profile for toxic links", tip: "Check GSC Links report. Disavow clearly spammy domains." },
        { label: "Update Google Business Profile", tip: "Add new photos, respond to reviews, post updates. Signals activity to Google." },
        { label: "Check and respond to new reviews", tip: "Respond to all reviews, positive and negative. Shows engagement." },
      ],
    },
  ],
  "Social Media": [
    {
      title: "Strategy & Planning",
      items: [
        { label: "Define monthly content themes", tip: "Align themes with business goals, seasonal trends, and audience interests." },
        { label: "Plan content calendar (4 weeks ahead)", tip: "Mix content types: educational, entertaining, promotional, user-generated." },
        { label: "Audit competitor social activity", tip: "Note what content gets engagement. Don't copy, but learn from patterns." },
        { label: "Review and update profile bios", tip: "Include current offers, updated links, and consistent branding." },
      ],
    },
    {
      title: "Content Creation",
      items: [
        { label: "Create 12-20 posts per platform per month", tip: "Quality over quantity. Every post should have a purpose." },
        { label: "Design platform-optimized visuals", tip: "Use correct dimensions for each platform. Brand consistently." },
        { label: "Write captions with clear CTAs", tip: "Tell people what to do: comment, share, click the link, save this post." },
        { label: "Plan 2-4 video/reel pieces", tip: "Short-form video gets the highest organic reach on most platforms." },
        { label: "Schedule posts using a management tool", tip: "Buffer, Hootsuite, or native schedulers. Post at optimal times." },
      ],
    },
    {
      title: "Engagement & Growth",
      items: [
        { label: "Respond to all comments within 24 hours", tip: "Engagement breeds engagement. The algorithm rewards active conversations." },
        { label: "Engage with 10-15 accounts in your niche daily", tip: "Leave thoughtful comments, not generic ones. Build real relationships." },
        { label: "Monitor brand mentions and tags", tip: "Repost user-generated content (with permission). Thank people who mention you." },
        { label: "Track follower growth and engagement rate", tip: "Engagement rate matters more than follower count. Aim for 2-5% on Instagram." },
      ],
    },
  ],
  "PPC Campaign": [
    {
      title: "Campaign Setup",
      items: [
        { label: "Define campaign objective and KPIs", tip: "Lead gen, sales, brand awareness? Set specific targets before launching." },
        { label: "Research and organize keyword lists", tip: "Group by intent. Separate branded, competitor, and generic terms." },
        { label: "Write 3-5 ad variations per ad group", tip: "Test different headlines, descriptions, and CTAs. Let data pick the winner." },
        { label: "Set up conversion tracking", tip: "Track the actual business outcome, not just clicks. Use offline conversion import if needed." },
        { label: "Configure negative keyword lists", tip: "Prevent wasted spend on irrelevant searches. Review search terms weekly." },
        { label: "Set appropriate bid strategy", tip: "Start with manual CPC to gather data, then move to automated bidding." },
      ],
    },
    {
      title: "Weekly Optimization",
      items: [
        { label: "Review search term report", tip: "Add converting terms as keywords. Add irrelevant terms as negatives." },
        { label: "Check quality scores", tip: "Improve ad relevance, landing page experience, and expected CTR for low scores." },
        { label: "Adjust bids based on performance", tip: "Increase bids on high-converting keywords. Decrease or pause underperformers." },
        { label: "Test new ad copy variations", tip: "Always have at least one test running. Small copy changes can significantly impact CTR." },
        { label: "Monitor budget pacing", tip: "Ensure you're not running out of budget early in the day or overspending." },
        { label: "Check competitor ad activity", tip: "Use Auction Insights to see who you're competing against and how." },
      ],
    },
    {
      title: "Monthly Review",
      items: [
        { label: "Analyze cost per acquisition trends", tip: "Is CPA trending up or down? Investigate sudden changes." },
        { label: "Review landing page performance", tip: "High CTR + low conversion = landing page problem. A/B test key elements." },
        { label: "Evaluate audience targeting", tip: "Review demographic and device performance. Exclude underperforming segments." },
        { label: "Document learnings and share with team", tip: "What worked, what didn't, what to test next. Build institutional knowledge." },
      ],
    },
  ],
};

export default function ChecklistsPage() {
  const tabs = Object.keys(checklists);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeCategories = checklists[activeTab];
  const totalItems = activeCategories.reduce((sum, c) => sum + c.items.length, 0);
  const checkedItems = activeCategories.reduce(
    (sum, c) => sum + c.items.filter((item) => checked[`${activeTab}-${item.label}`]).length,
    0
  );
  const progress = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  return (
    <article className="min-h-screen">
      <nav className="px-6 lg:px-12 pt-20" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-gray-400 max-w-7xl mx-auto">
          <li><Link href="/" className="hover:text-black transition-colors motion-reduce:transition-none">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/resources" className="hover:text-black transition-colors motion-reduce:transition-none">Resources</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-black font-medium">Checklists</li>
        </ol>
      </nav>

      <section className="px-6 lg:px-12 pt-16 pb-8">
        <div className="max-w-4xl mx-auto">
          <span className="text-base font-medium text-gray-400 uppercase tracking-[0.15em]">Interactive Tools</span>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
            Digital Marketing Checklists
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
            Actionable checklists for common marketing workflows. Check off items as you go and track your progress.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Checklist categories">
            {tabs.map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-100 h-3 overflow-hidden" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${progress}% complete`}>
              <div
                className="h-full bg-black transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-base font-bold text-black whitespace-nowrap">
              {checkedItems}/{totalItems} ({progress}%)
            </span>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-8" aria-label={`${activeTab} checklist`}>
        <div className="max-w-4xl mx-auto space-y-10">
          {activeCategories.map((category) => (
            <div key={category.title}>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">{category.title}</h2>
              <ul className="space-y-2">
                {category.items.map((item) => {
                  const key = `${activeTab}-${item.label}`;
                  const isChecked = checked[key] || false;
                  return (
                    <li key={item.label}>
                      <label className={`flex items-start gap-4 p-4 border cursor-pointer transition-all ${isChecked ? "bg-gray-50 border-gray-300" : "bg-white border-gray-200 hover:border-gray-300"}`}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggle(key)}
                          className="mt-1 w-5 h-5 accent-black flex-shrink-0"
                        />
                        <div className="flex-1">
                          <span className={`text-base font-medium block ${isChecked ? "line-through text-gray-400" : "text-black"}`}>
                            {item.label}
                          </span>
                          <span className="text-base text-gray-400 mt-1 block">{item.tip}</span>
                        </div>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
            Need Help Implementing This?
          </h2>
          <p className="text-lg text-gray-400 mt-4 mb-8">
            Our team can handle every item on this checklist for you. Let us take marketing off your plate.
          </p>
          <Link href="/get-a-quote" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none">
            Get a Free Quote &rarr;
          </Link>
        </div>
      </section>
    </article>
  );
}
