import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Digital Marketing for Startups — A Practical Guide",
  description: "A practical digital marketing guide for startups. How to prioritize channels, allocate budget, build brand awareness, and generate leads on a limited budget.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/startup-marketing-guide" },
};

const phases = [
  {
    phase: "Phase 1: Foundation (Month 1-2)",
    items: [
      { title: "Define your ICP (Ideal Customer Profile)", desc: "Be specific about who you are selling to. Industry, company size, role, pain points, and buying triggers. Everything else flows from this." },
      { title: "Build a conversion-ready website", desc: "You need a fast, mobile-optimized site with clear messaging, one primary CTA, and basic analytics tracking (GA4, Google Tag Manager) before spending on traffic." },
      { title: "Set up foundational analytics", desc: "Install GA4, Google Search Console, and conversion tracking. You cannot optimize what you cannot measure. Track form submissions, signups, or purchases from day one." },
      { title: "Claim your online presence", desc: "Google Business Profile, LinkedIn company page, and relevant directories. These are free and compound over time." },
    ],
  },
  {
    phase: "Phase 2: Traction (Month 2-4)",
    items: [
      { title: "Start content marketing", desc: "Create 2-4 high-quality articles per month targeting keywords your ICP searches for. Focus on bottom-of-funnel content first: comparisons, how-to guides, and buyer-intent queries." },
      { title: "Launch one paid channel", desc: "Do not spread budget across 5 platforms. Pick the one channel where your ICP spends time (Google Search for high-intent queries, LinkedIn for B2B, Meta for B2C) and learn it deeply." },
      { title: "Build an email list from day one", desc: "Gate a valuable resource (template, checklist, report) and collect emails. Email is the only channel you own completely." },
      { title: "Get on social media — but focused", desc: "Pick 1-2 platforms. Post consistently. Engage genuinely with your target audience. Do not automate everything." },
    ],
  },
  {
    phase: "Phase 3: Scale (Month 4-8)",
    items: [
      { title: "Double down on what works", desc: "By now you have data. Look at which channels drive actual revenue (not just traffic). Increase investment in winning channels." },
      { title: "Add SEO as a long-term engine", desc: "SEO compounds. Start investing in technical optimization, link building, and content clusters around your core topics." },
      { title: "Launch retargeting", desc: "Most visitors do not convert on their first visit. Retarget website visitors across Google Display and social to stay top of mind." },
      { title: "Build partnerships and integrations", desc: "Co-marketing with complementary products, guest posting on industry publications, and directory listings build authority and referral traffic." },
    ],
  },
  {
    phase: "Phase 4: Optimize (Month 8-12)",
    items: [
      { title: "Optimize conversion rates", desc: "A/B test landing pages, forms, and CTAs. Improving conversion rate from 2% to 3% is equivalent to increasing traffic by 50% — and it is free." },
      { title: "Expand to new channels", desc: "Once your primary channels are profitable, test new ones: YouTube, TikTok, podcasting, affiliate programs, or PR." },
      { title: "Automate repetitive tasks", desc: "Set up email sequences, social scheduling, lead scoring, and reporting dashboards so your team can focus on strategy." },
      { title: "Build brand awareness campaigns", desc: "Invest in brand-building that does not have immediate conversion goals. Sponsored content, events, and thought leadership compound over time." },
    ],
  },
];

const budgetTiers = [
  {
    range: "Under $2K/month",
    focus: "DIY + selective outsourcing",
    channels: "Content marketing, organic social, email, basic SEO",
    expectation: "Slow, steady growth. Results in 6-12 months.",
  },
  {
    range: "$2K-$5K/month",
    focus: "One channel done well + content",
    channels: "Focused paid (Google or Meta), content marketing, email",
    expectation: "Leads within 30-60 days from paid. SEO results in 4-6 months.",
  },
  {
    range: "$5K-$15K/month",
    focus: "Multi-channel with agency support",
    channels: "Paid + SEO + content + email + social",
    expectation: "Meaningful traction in 60-90 days. Compounding growth by month 6.",
  },
  {
    range: "$15K+/month",
    focus: "Full-stack execution",
    channels: "All channels + brand building + creative production",
    expectation: "Aggressive growth. Multiple lead sources from month 2.",
  },
];

const mistakes = [
  { title: "Trying everything at once", fix: "Pick 2-3 channels max and execute well before expanding." },
  { title: "No tracking setup", fix: "Install analytics before spending a dollar on marketing." },
  { title: "Optimizing for vanity metrics", fix: "Track leads and revenue, not likes and impressions." },
  { title: "Expecting instant SEO results", fix: "SEO takes 4-6 months minimum. Pair it with paid for immediate results." },
  { title: "Ignoring email marketing", fix: "Email has the highest ROI of any channel. Start collecting emails immediately." },
  { title: "Copying enterprise strategies", fix: "What works for a company spending $1M/month will not work at $5K/month." },
];

export default function StartupMarketingGuidePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Digital Marketing for Startups — A Practical Guide",
    description: "How to build a marketing engine for your startup from zero.",
    publisher: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "Startup Marketing Guide" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Guide</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Digital Marketing for Startups
            </h1>
            <SectionDesc>
              A practical, no-fluff guide to building a marketing engine from zero. Prioritize the right channels, allocate budget wisely, and avoid the mistakes that burn through cash.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {phases.map((p, pi) => (
        <section key={pi} className={`px-6 lg:px-12 py-16 ${pi % 2 === 1 ? "bg-gray-50" : ""}`}>
          <div className="max-w-4xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-8">{p.phase}</h2>
            </Animate>
            <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {p.items.map((item) => (
                <div key={item.title} className="bg-white border border-gray-200 p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black mb-2">{item.title}</h3>
                  <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </Stagger>
          </div>
        </section>
      ))}

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Budget guide">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Budget Guide</SectionLabel>
            <SectionTitle>What to Expect at Each Budget Level</SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {budgetTiers.map((tier) => (
              <div key={tier.range} className="bg-white p-6 border border-gray-200">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-1">{tier.range}</h3>
                <p className="text-base font-bold text-gray-400 mb-3">{tier.focus}</p>
                <p className="text-base text-gray-500 leading-relaxed mb-2"><strong>Channels:</strong> {tier.channels}</p>
                <p className="text-base text-gray-500 leading-relaxed"><strong>Expect:</strong> {tier.expectation}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="Common mistakes">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Mistakes to Avoid</SectionLabel>
            <SectionTitle>6 Startup Marketing Mistakes</SectionTitle>
          </Animate>
          <div className="mt-10 space-y-4">
            {mistakes.map((m, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <div className="flex items-start gap-4 p-4 border border-gray-200">
                  <span className="w-8 h-8 bg-black text-white flex items-center justify-center flex-shrink-0 text-base font-bold">{i + 1}</span>
                  <div>
                    <p className="text-base font-bold text-black">{m.title}</p>
                    <p className="text-base text-gray-500 leading-relaxed mt-1">{m.fix}</p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need a Marketing Partner for Your Startup?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              We work with startups at every stage. Flexible engagements, no long-term lock-ins, and strategies built for growth.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Let&apos;s Talk &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
