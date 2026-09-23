"use client";

import { useState } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

const industries = [
  "E-Commerce / Retail", "SaaS / Technology", "Healthcare", "Real Estate",
  "Professional Services", "Restaurants / Food", "Education", "Finance",
  "Travel / Hospitality", "Construction", "Fitness / Wellness", "Other",
];

const channels = ["SEO", "Google Ads", "Meta Ads", "Email", "Social Media", "Content", "Video", "Events"];

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const keyDates: Record<string, { month: number; name: string }[]> = {
  "E-Commerce / Retail": [
    { month: 1, name: "New Year Sales" }, { month: 2, name: "Valentine's Day" },
    { month: 4, name: "Easter / Spring Sale" }, { month: 5, name: "Mother's Day" },
    { month: 6, name: "Father's Day / Summer Kickoff" }, { month: 8, name: "Back to School" },
    { month: 10, name: "Halloween" }, { month: 11, name: "Black Friday / Cyber Monday" },
    { month: 12, name: "Holiday Season / Year-End" },
  ],
  default: [
    { month: 1, name: "New Year / Goal Setting" }, { month: 3, name: "Q1 Review" },
    { month: 6, name: "Mid-Year Review" }, { month: 9, name: "Q3 Push" },
    { month: 11, name: "Budget Planning" }, { month: 12, name: "Year-End Wrap" },
  ],
};

const themes: Record<number, string> = {
  0: "New Beginnings, Planning, Goal Setting",
  1: "Relationship Building, Love Your Customers",
  2: "Spring Refresh, Q1 Results Review",
  3: "Growth Campaigns, Spring Promotions",
  4: "Awareness Campaigns, Appreciation",
  5: "Mid-Year Check-In, Summer Strategies",
  6: "Summer Engagement, Seasonal Content",
  7: "Back-to-Business, Preparation",
  8: "Fall Push, Q3 Performance Review",
  9: "Spooky Season, Pre-Holiday Prep",
  10: "Peak Season, Major Promotions",
  11: "Holiday Campaigns, Year-End Review",
};

const budgetSplit: Record<number, number> = {
  0: 7, 1: 7, 2: 8, 3: 8, 4: 8, 5: 8, 6: 7, 7: 8, 8: 9, 9: 9, 10: 12, 11: 9,
};

export default function MarketingCalendarPage() {
  const [industry, setIndustry] = useState("");
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["SEO", "Google Ads", "Email", "Social Media"]);
  const [startMonth, setStartMonth] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const toggleChannel = (ch: string) => setSelectedChannels((p) => p.includes(ch) ? p.filter((x) => x !== ch) : [...p, ch]);

  const dates = keyDates[industry] || keyDates.default;

  const calendarMonths = Array.from({ length: 12 }, (_, i) => {
    const mi = (startMonth + i) % 12;
    const ds = dates.filter((d) => d.month === mi + 1);
    return {
      index: mi,
      name: monthNames[mi],
      theme: themes[mi],
      keyDates: ds,
      budget: budgetSplit[mi],
      channels: selectedChannels.map((ch) => {
        const actions: Record<string, string> = {
          SEO: "Publish optimized content, update existing pages",
          "Google Ads": "Run search and display campaigns",
          "Meta Ads": "Launch targeted social ad campaigns",
          Email: "Send newsletter, nurture sequences",
          "Social Media": "Post organic content, engage community",
          Content: "Publish blog posts, resources, guides",
          Video: "Create and distribute video content",
          Events: "Plan or attend industry events, webinars",
        };
        return { name: ch, action: actions[ch] || "Execute channel strategy" };
      }),
    };
  });

  const downloadCSV = () => {
    const rows = [["Month", "Theme", "Key Dates", "Budget %", "Channels", "Activities"]];
    for (const m of calendarMonths) {
      rows.push([
        m.name,
        m.theme,
        m.keyDates.map((d) => d.name).join("; ") || "None",
        `${m.budget}%`,
        m.channels.map((c) => c.name).join("; "),
        m.channels.map((c) => `${c.name}: ${c.action}`).join("; "),
      ]);
    }
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "marketing-calendar.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <article className="px-6 lg:px-12 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Calendar Generator",
          description: "Generate a 12-month marketing calendar tailored to your industry with campaign themes, key dates, channel recommendations, and budget allocation guidance.",
          url: "https://themarkitmedia.com/en/resources/marketing-calendar",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <div className="max-w-5xl mx-auto">
        <nav aria-label="Breadcrumb" className="text-base text-gray-400 mb-8">
          <Link href="/resources" className="hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Resources</Link>
          <span className="mx-2">/</span>
          <span className="text-black">Marketing Calendar</span>
        </nav>

        <header className="mb-12">
          <p className="text-base font-semibold tracking-widest uppercase text-gray-400 mb-3">Free Planning Tool</p>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
            Marketing Calendar Generator
          </h1>
          <p className="text-lg text-gray-500 mt-4 max-w-2xl">Generate a 12-month marketing calendar tailored to your industry with campaign themes, key dates, and budget allocation.</p>
        </header>

        {!showCalendar ? (
          <div className="space-y-8">
            <section aria-label="Content section" className="border border-gray-200 p-6 lg:p-8 space-y-6">
              <div>
                <label className="block text-base font-bold text-black mb-2">Industry</label>
                <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black bg-white">
                  <option value="">Select your industry</option>
                  {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-base font-bold text-black mb-2">Fiscal Year Starts</label>
                <select value={startMonth} onChange={(e) => setStartMonth(Number(e.target.value))} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black bg-white">
                  {monthNames.map((m, i) => <option key={i} value={i}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-base font-bold text-black mb-2">Marketing Channels</label>
                <div className="flex flex-wrap gap-2">
                  {channels.map((ch) => (
                    <button key={ch} onClick={() => toggleChannel(ch)} className={`px-4 py-2 text-base font-medium border transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${selectedChannels.includes(ch) ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300 hover:border-black"}`}>{ch}</button>
                  ))}
                </div>
              </div>
              <button onClick={() => setShowCalendar(true)} disabled={!industry || !selectedChannels.length} className="bg-black text-white px-8 py-4 text-base font-bold hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Generate Calendar &rarr;</button>
            </section>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                <button onClick={() => setViewMode("grid")} className={`px-4 py-2 text-base font-medium border transition-colors ${viewMode === "grid" ? "bg-black text-white border-black" : "border-gray-300 text-gray-700 hover:border-black"}`}>Grid</button>
                <button onClick={() => setViewMode("list")} className={`px-4 py-2 text-base font-medium border transition-colors ${viewMode === "list" ? "bg-black text-white border-black" : "border-gray-300 text-gray-700 hover:border-black"}`}>List</button>
              </div>
              <div className="flex gap-3">
                <button onClick={downloadCSV} className="border border-gray-300 text-gray-700 px-4 py-2 text-base font-medium hover:border-black hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Download CSV</button>
                <button onClick={() => setShowCalendar(false)} className="border border-gray-300 text-gray-700 px-4 py-2 text-base font-medium hover:border-black hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Edit Settings</button>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {calendarMonths.map((m) => (
                  <div key={m.index} className="border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-black">{m.name}</h2>
                      <span className="text-base text-gray-400">{m.budget}% budget</span>
                    </div>
                    <p className="text-base text-gray-500 mb-3">{m.theme}</p>
                    {m.keyDates.length > 0 && (
                      <div className="mb-3">
                        {m.keyDates.map((d) => (
                          <span key={d.name} className="inline-block bg-gray-100 text-neutral-700 text-base px-2 py-1 mr-1 mb-1">{d.name}</span>
                        ))}
                      </div>
                    )}
                    <div className="space-y-1">
                      {m.channels.map((ch) => (
                        <div key={ch.name} className="text-base text-gray-600">
                          <span className="font-medium text-black">{ch.name}:</span> {ch.action}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {calendarMonths.map((m) => (
                  <div key={m.index} className="border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black">{m.name}</h2>
                      <span className="bg-black text-white px-3 py-1 text-base font-bold">{m.budget}%</span>
                    </div>
                    <p className="text-base text-gray-500 mb-3">Theme: {m.theme}</p>
                    {m.keyDates.length > 0 && <p className="text-base text-gray-700 mb-3">Key dates: {m.keyDates.map((d) => d.name).join(", ")}</p>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {m.channels.map((ch) => (
                        <div key={ch.name} className="text-base text-gray-600"><span className="font-medium text-black">{ch.name}:</span> {ch.action}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <section aria-label="Need Help Executing Your Marketing Plan?" className="bg-black text-white p-8 lg:p-12 text-center">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold mb-4">Need Help Executing Your Marketing Plan?</h2>
              <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">Our team builds and executes marketing strategies from planning to results.</p>
              <Link href="/contact" className="inline-block bg-white text-black px-10 py-5 text-base font-bold hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Start Your Strategy &rarr;</Link>
            </section>
          </div>
        )}
      </div>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Calendar Generator",
          description: "Generate a 12-month marketing calendar tailored to your industry with campaign themes, key dates, channel recommendations, and budget allocation guidance.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Marketing Calendar"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Lead Scoring Calculator", href: "/resources/lead-scoring-calculator" },
          { title: "Marketing Expense Tracker", href: "/resources/marketing-expense-tracker" },
          { title: "Launch Countdown", href: "/resources/launch-countdown" },
          { title: "Lead Magnet Generator", href: "/resources/lead-magnet-generator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
