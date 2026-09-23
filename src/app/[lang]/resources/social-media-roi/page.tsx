"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

function fmt(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function fmtMoney(n: number) {
  return "$" + fmt(n);
}

function fmtPercent(n: number) {
  return n.toFixed(1) + "%";
}

function fmtRatio(n: number) {
  return "$" + n.toFixed(2);
}

export default function SocialMediaRoiPage() {
  const [monthlySpend, setMonthlySpend] = useState("2000");
  const [followerGrowth, setFollowerGrowth] = useState("500");
  const [engagementRate, setEngagementRate] = useState("3.5");
  const [websiteClicks, setWebsiteClicks] = useState("1200");
  const [conversionRate, setConversionRate] = useState("2.5");
  const [avgOrderValue, setAvgOrderValue] = useState("75");
  const [hoursPerMonth, setHoursPerMonth] = useState("40");
  const [hourlyRate, setHourlyRate] = useState("50");
  const [calculated, setCalculated] = useState(false);

  const handleCalculate = useCallback(() => {
    setCalculated(true);
  }, []);

  const spend = Math.max(0, parseFloat(monthlySpend) || 0);
  const followers = Math.max(0, parseFloat(followerGrowth) || 0);
  const clicks = Math.max(0, parseFloat(websiteClicks) || 0);
  const convRate = Math.max(0, parseFloat(conversionRate) || 0) / 100;
  const orderVal = Math.max(0, parseFloat(avgOrderValue) || 0);
  const hours = Math.max(0, parseFloat(hoursPerMonth) || 0);
  const rate = Math.max(0, parseFloat(hourlyRate) || 0);

  const laborCost = hours * rate;
  const totalInvestment = spend + laborCost;
  const conversions = clicks * convRate;
  const revenue = conversions * orderVal;
  const roi = totalInvestment > 0 ? ((revenue - totalInvestment) / totalInvestment) * 100 : 0;
  const costPerFollower = followers > 0 ? totalInvestment / followers : 0;
  const costPerClick = clicks > 0 ? totalInvestment / clicks : 0;
  const costPerConversion = conversions > 0 ? totalInvestment / conversions : 0;
  const revenuePerDollar = totalInvestment > 0 ? revenue / totalInvestment : 0;

  const inputClass =
    "w-full px-4 py-3 border border-gray-200 text-base text-black focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none min-h-[44px]";

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Social Media ROI Calculator",
          description: "Calculate the return on your social media marketing investment. Measure cost per follower, cost per click, revenue per dollar spent, and overall ROI.",
          url: "https://themarkitmedia.com/en/resources/social-media-roi",
          applicationCategory: "Business Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/social-media-planner" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Social Media Planner</Link>
                <Link href="/resources/social-media-audit" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Social Media Audit</Link>
                <Link href="/resources/social-calendar" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Social Calendar</Link>
                <Link href="/resources/social-post-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Social Post Generator</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Social Media ROI Calculator",
          description:
            "Calculate the return on your social media marketing investment. Measure cost per follower, cost per click, revenue per dollar spent, and overall ROI.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Social Media ROI Calculator" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Social Media ROI Calculator
            </h1>
            <SectionDesc>
              Measure the return on your social media investment. Enter your spend, engagement metrics, and conversion data to see whether your social efforts are paying off.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Calculator */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-20">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="monthly-spend" className="block text-base font-bold text-black mb-1">
                  Monthly Social Media Spend ($)
                </label>
                <input
                  id="monthly-spend"
                  type="number"
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(e.target.value)}
                  className={inputClass}
                />
                <p className="text-base text-gray-400 mt-1">Ad spend, tools, subscriptions</p>
              </div>
              <div>
                <label htmlFor="follower-growth" className="block text-base font-bold text-black mb-1">
                  Monthly Follower Growth
                </label>
                <input
                  id="follower-growth"
                  type="number"
                  value={followerGrowth}
                  onChange={(e) => setFollowerGrowth(e.target.value)}
                  className={inputClass}
                />
                <p className="text-base text-gray-400 mt-1">Net new followers per month</p>
              </div>
              <div>
                <label htmlFor="engagement-rate" className="block text-base font-bold text-black mb-1">
                  Average Engagement Rate (%)
                </label>
                <input
                  id="engagement-rate"
                  type="number"
                  step="0.1"
                  value={engagementRate}
                  onChange={(e) => setEngagementRate(e.target.value)}
                  className={inputClass}
                />
                <p className="text-base text-gray-400 mt-1">Likes, comments, shares / reach</p>
              </div>
              <div>
                <label htmlFor="website-clicks" className="block text-base font-bold text-black mb-1">
                  Monthly Website Clicks from Social
                </label>
                <input
                  id="website-clicks"
                  type="number"
                  value={websiteClicks}
                  onChange={(e) => setWebsiteClicks(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="conversion-rate" className="block text-base font-bold text-black mb-1">
                  Conversion Rate from Social Traffic (%)
                </label>
                <input
                  id="conversion-rate"
                  type="number"
                  step="0.1"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(e.target.value)}
                  className={inputClass}
                />
                <p className="text-base text-gray-400 mt-1">Visitors who take a desired action</p>
              </div>
              <div>
                <label htmlFor="avg-order-value" className="block text-base font-bold text-black mb-1">
                  Average Order / Lead Value ($)
                </label>
                <input
                  id="avg-order-value"
                  type="number"
                  value={avgOrderValue}
                  onChange={(e) => setAvgOrderValue(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="hours-per-month" className="block text-base font-bold text-black mb-1">
                  Hours Spent on Social Per Month
                </label>
                <input
                  id="hours-per-month"
                  type="number"
                  value={hoursPerMonth}
                  onChange={(e) => setHoursPerMonth(e.target.value)}
                  className={inputClass}
                />
                <p className="text-base text-gray-400 mt-1">Content creation, engagement, analytics</p>
              </div>
              <div>
                <label htmlFor="hourly-rate" className="block text-base font-bold text-black mb-1">
                  Hourly Rate for Team Time ($)
                </label>
                <input
                  id="hourly-rate"
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className={inputClass}
                />
                <p className="text-base text-gray-400 mt-1">Fully loaded cost per hour</p>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="mt-8 bg-black text-white px-10 py-4 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
            >
              Calculate ROI
            </button>
          </Animate>

          {calculated && (
            <Animate animation="fade-up">
              <div className="mt-12 space-y-8">
                {/* Primary metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      label: "Total Investment",
                      value: fmtMoney(totalInvestment),
                      sub: `${fmtMoney(spend)} spend + ${fmtMoney(laborCost)} labor`,
                    },
                    {
                      label: "Revenue from Social",
                      value: fmtMoney(revenue),
                      sub: `${fmt(conversions)} conversions`,
                    },
                    {
                      label: "ROI",
                      value: fmtPercent(roi),
                      sub: roi >= 0 ? "Positive return" : "Negative return",
                    },
                  ].map((m) => (
                    <div key={m.label} className="p-6 border-2 border-black text-center">
                      <div className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-black">
                        {m.value}
                      </div>
                      <div className="text-base font-bold text-black mt-1">{m.label}</div>
                      <div className="text-base text-gray-400 mt-1">{m.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Secondary metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Cost Per Follower", value: fmtRatio(costPerFollower) },
                    { label: "Cost Per Click", value: fmtRatio(costPerClick) },
                    { label: "Cost Per Conversion", value: fmtRatio(costPerConversion) },
                    { label: "Revenue Per $1 Spent", value: fmtRatio(revenuePerDollar) },
                  ].map((m) => (
                    <div key={m.label} className="p-5 border border-gray-200 text-center">
                      <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                        {m.value}
                      </div>
                      <div className="text-base text-gray-500 mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Investment breakdown */}
                <div className="p-6 bg-gray-50 border border-gray-200">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                    Monthly Breakdown
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-base">
                    <div>
                      <span className="text-gray-400">Ad spend:</span>{" "}
                      <span className="font-bold text-black">{fmtMoney(spend)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Labor cost:</span>{" "}
                      <span className="font-bold text-black">{fmtMoney(laborCost)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Total investment:</span>{" "}
                      <span className="font-bold text-black">{fmtMoney(totalInvestment)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Website clicks:</span>{" "}
                      <span className="font-bold text-black">{fmt(clicks)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Conversions:</span>{" "}
                      <span className="font-bold text-black">{fmt(conversions)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Revenue:</span>{" "}
                      <span className="font-bold text-black">{fmtMoney(revenue)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 border-l-4 border-black bg-gray-50">
                  <p className="text-base text-gray-600 leading-relaxed">
                    <strong>Note:</strong> These projections are estimates based on the inputs you provided. Actual social media ROI depends on content quality, audience targeting, platform algorithms, and industry dynamics. Use these numbers as directional guidance for budget planning.
                  </p>
                </div>
              </div>
            </Animate>
          )}
        </div>
      </section>

      {/* Benchmarks */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Platform benchmarks">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
              Typical Social Media ROI by Platform
            </h2>
            <p className="text-base text-gray-500 mb-8">
              Industry benchmarks vary widely. These ranges represent typical performance for businesses actively investing in each platform.
            </p>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                platform: "Facebook / Meta",
                avgROI: "250-350%",
                engRate: "0.06-0.15%",
                note: "Largest audience, strong ad targeting, good for B2C and local businesses",
              },
              {
                platform: "Instagram",
                avgROI: "200-300%",
                engRate: "0.50-1.0%",
                note: "Visual-first, strong for e-commerce, lifestyle brands, and influencer partnerships",
              },
              {
                platform: "LinkedIn",
                avgROI: "150-250%",
                engRate: "0.35-0.50%",
                note: "B2B lead generation, thought leadership, higher cost per lead but higher deal values",
              },
              {
                platform: "TikTok",
                avgROI: "100-300%",
                engRate: "2.0-6.0%",
                note: "Highest organic reach, younger demographics, fast-growing ad platform",
              },
              {
                platform: "X (Twitter)",
                avgROI: "100-200%",
                engRate: "0.03-0.05%",
                note: "Real-time engagement, best for news, tech, and customer service",
              },
              {
                platform: "YouTube",
                avgROI: "200-400%",
                engRate: "1.5-3.0%",
                note: "Long-form content, strong search presence, high production cost but long shelf life",
              },
            ].map((b) => (
              <div key={b.platform} className="bg-white p-5 border border-gray-200">
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black mb-2">
                  {b.platform}
                </h3>
                <div className="flex gap-4 text-base">
                  <div>
                    <span className="text-gray-400">ROI:</span>{" "}
                    <span className="font-bold">{b.avgROI}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Eng:</span>{" "}
                    <span className="font-bold">{b.engRate}</span>
                  </div>
                </div>
                <p className="text-base text-gray-400 mt-1">{b.note}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Tips */}
      <section className="px-6 lg:px-12 py-20" aria-label="Improvement tips">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-8">
              How to Improve Your Social Media ROI
            </h2>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Focus on fewer platforms",
                desc: "Spreading effort across every network dilutes results. Pick 2-3 platforms where your audience actually is and go deep rather than wide.",
              },
              {
                title: "Track conversions, not vanity metrics",
                desc: "Follower count and likes feel good but do not pay bills. Set up UTM parameters and conversion tracking to tie social activity directly to revenue.",
              },
              {
                title: "Repurpose high-performing content",
                desc: "When a post performs well, turn it into a carousel, video, blog post, or email. One idea can generate results across multiple formats and channels.",
              },
              {
                title: "Invest in paid amplification strategically",
                desc: "Boost posts that already have organic traction. Paid spend on proven content consistently outperforms cold ad creative.",
              },
              {
                title: "Reduce labor costs with batching",
                desc: "Create content in batches rather than daily. A single content day per week reduces context-switching and lowers the effective hourly cost of social management.",
              },
              {
                title: "Optimize your conversion funnel",
                desc: "A 1% improvement in your social landing page conversion rate has the same revenue impact as a 40% increase in traffic. Fix the funnel before buying more reach.",
              },
              {
                title: "Use social proof in your content",
                desc: "Customer testimonials, case studies, and user-generated content consistently outperform branded promotional posts for both engagement and conversions.",
              },
              {
                title: "Audit and cut underperforming spend",
                desc: "Review platform and campaign performance monthly. Reallocate budget from channels delivering below-average ROI to those outperforming.",
              },
            ].map((tip) => (
              <div key={tip.title} className="p-5 border border-gray-200">
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black mb-2">
                  {tip.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Want Better Returns from Social Media?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our social media team builds data-driven strategies that turn followers into customers and engagement into revenue.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
            >
              Talk to a Social Media Strategist &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Social Media Roi"
        services={[
          { title: "Social Media Marketing", desc: "Strategy, content, and community management across all platforms.", href: "/services/social-media-marketing" },
          { title: "Content Marketing", desc: "Engaging content that builds brand authority and drives engagement.", href: "/services/content-marketing" },
          { title: "Digital Marketing", desc: "Integrated digital strategy connecting social to business results.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
          { title: "Social Media Bio Generator", href: "/resources/social-media-bio-generator" },
          { title: "Social Media Calendar Template", href: "/resources/social-media-calendar-template" },
          { title: "Social Media Planner", href: "/resources/social-media-planner" },
          { title: "Social Post Generator", href: "/resources/social-post-generator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
