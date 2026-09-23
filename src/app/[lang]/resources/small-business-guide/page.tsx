import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

export const metadata: Metadata = {
  title: "Digital Marketing for Small Business — Complete Guide",
  description: "A comprehensive guide to digital marketing for small businesses. Learn which channels to prioritize, how to allocate your budget, and when to hire an agency.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/small-business-guide" },
};

const channels = [
  {
    title: "Google Business Profile",
    priority: "Essential",
    cost: "Free",
    timeline: "Immediate",
    desc: "Claim and optimize your Google Business Profile. This is the single highest-ROI action for local businesses. Add photos, respond to reviews, and keep your hours updated.",
  },
  {
    title: "SEO",
    priority: "High",
    cost: "$500-$3,000/mo",
    timeline: "3-6 months",
    desc: "Organic search drives the most consistent, cost-effective traffic over time. Focus on local SEO first if you serve a geographic area, then expand to broader keywords.",
  },
  {
    title: "Google Ads",
    priority: "High",
    cost: "$1,000-$5,000/mo",
    timeline: "1-2 weeks",
    desc: "Search ads put you in front of people actively looking for what you sell. Start with your highest-intent keywords and expand as you learn which ones convert.",
  },
  {
    title: "Social Media",
    priority: "Medium",
    cost: "$500-$2,000/mo",
    timeline: "2-4 weeks",
    desc: "Pick one or two platforms where your audience actually spends time. Consistency matters more than frequency. Focus on quality content over posting volume.",
  },
  {
    title: "Email Marketing",
    priority: "High",
    cost: "$100-$500/mo",
    timeline: "1-2 weeks",
    desc: "Email remains one of the highest-ROI marketing channels. Start collecting emails from day one and build automated sequences for welcome, nurture, and re-engagement.",
  },
  {
    title: "Content Marketing",
    priority: "Medium",
    cost: "$500-$2,000/mo",
    timeline: "3-6 months",
    desc: "Blog posts, guides, and resources build authority and drive organic traffic. Write for your customers' actual questions, not just keywords.",
  },
];

const mistakes = [
  "Trying to be on every platform at once instead of mastering one or two",
  "Spending on ads before your website is ready to convert visitors",
  "Ignoring Google Business Profile and local SEO",
  "Measuring vanity metrics (followers, likes) instead of leads and revenue",
  "Not tracking where your leads and customers actually come from",
  "Changing strategy every few weeks instead of giving campaigns time to work",
  "Hiring based on price alone instead of expertise and track record",
  "Not having a clear call-to-action on every page of your website",
];

const budgetTiers = [
  {
    range: "$1,000 - $2,500/mo",
    label: "Starter",
    focus: "Google Business Profile + Local SEO + Google Ads (search only). Focus your budget on people already searching for what you offer.",
  },
  {
    range: "$2,500 - $5,000/mo",
    label: "Growth",
    focus: "Add social media management, email marketing, and content creation. Build a multi-channel presence while maintaining strong search performance.",
  },
  {
    range: "$5,000 - $15,000/mo",
    label: "Scale",
    focus: "Full-channel execution with dedicated strategy. Add retargeting, video content, advanced analytics, and conversion optimization.",
  },
];

export default function SmallBusinessGuidePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Digital Marketing for Small Business — Complete Guide",
    description: "A comprehensive guide to digital marketing for small businesses.",
    publisher: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Digital Marketing for Small Business",
          description: "A comprehensive guide to digital marketing for small businesses. Learn which channels to prioritize, how to allocate your budget, and when to hire an agency.",
          url: "https://themarkitmedia.com/en/resources/small-business-guide",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <JsonLd data={schema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "Small Business Guide" }]} />

      <section aria-label="Guide" className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Guide</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Digital Marketing for Small Business
            </h1>
            <SectionDesc>
              A practical guide to marketing your small business online. No jargon, no fluff — just the channels, strategies, and budget guidance that actually work for small businesses.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Marketing channels">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Channels</SectionLabel>
            <SectionTitle>Where to Focus First</SectionTitle>
            <SectionDesc>
              Not every channel is worth your time and money right away. Here is how to prioritize based on impact and cost.
            </SectionDesc>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {channels.map((ch) => (
              <div key={ch.title} className="bg-white border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black">{ch.title}</h3>
                  <span className={`text-base font-bold uppercase tracking-wide px-2 py-1 ${ch.priority === "Essential" ? "bg-black text-white" : ch.priority === "High" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-600"}`}>
                    {ch.priority}
                  </span>
                </div>
                <p className="text-base text-gray-500 leading-relaxed mb-4">{ch.desc}</p>
                <div className="flex gap-4 text-base text-gray-400">
                  <span>{ch.cost}</span>
                  <span>&middot;</span>
                  <span>{ch.timeline}</span>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="Budget guidance">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Budget</SectionLabel>
            <SectionTitle>How Much Should You Spend?</SectionTitle>
            <SectionDesc>
              General budget ranges based on business stage and goals. These are starting points — actual budgets depend on your industry, competition, and growth targets.
            </SectionDesc>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="space-y-0 mt-12">
            {budgetTiers.map((tier, i) => (
              <div key={tier.label} className="flex gap-8 py-8 border-b border-gray-200">
                <div className="flex-shrink-0 w-32">
                  <div className="font-[family-name:var(--font-display)] text-base font-extrabold text-black">{tier.label}</div>
                  <div className="text-base text-gray-400 mt-1">{tier.range}</div>
                </div>
                <p className="text-base text-gray-500 leading-relaxed">{tier.focus}</p>
              </div>
            ))}
          </Stagger>
          <Animate animation="fade-up">
            <div className="mt-8 text-center">
              <Link href="/resources/budget-calculator" className="inline-flex items-center gap-2 text-base font-bold text-black hover:underline">
                Try Our Budget Calculator &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Common mistakes">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Mistakes</SectionLabel>
            <SectionTitle>Common Small Business Marketing Mistakes</SectionTitle>
          </Animate>
          <Stagger stagger={50} animation="fade-up" className="mt-10 space-y-4">
            {mistakes.map((m, i) => (
              <div key={i} className="flex items-start gap-4 py-3">
                <span className="w-8 h-8 bg-black text-white flex items-center justify-center flex-shrink-0 text-base font-bold">{i + 1}</span>
                <p className="text-base text-gray-600 leading-relaxed">{m}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16" aria-label="When to hire an agency">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Agency vs DIY</SectionLabel>
            <SectionTitle>When Should You Hire an Agency?</SectionTitle>
          </Animate>
          <Animate animation="fade-up">
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">DIY Makes Sense When:</h3>
                <ul className="space-y-2">
                  {["You are just starting and have more time than budget", "Your marketing needs are simple and local", "You enjoy learning new tools and platforms", "Your competitive landscape is not intense"].map((item) => (
                    <li key={item} className="text-base text-gray-500 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-black rounded-full flex-shrink-0 mt-2" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-gray-200 p-6 bg-black text-white">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold mb-3">Hire an Agency When:</h3>
                <ul className="space-y-2">
                  {["You need results faster than you can learn", "Your marketing budget exceeds $2,000/month", "You are in a competitive industry or market", "You need multiple channels managed simultaneously"].map((item) => (
                    <li key={item} className="text-base text-gray-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0 mt-2" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Getting Started?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              We help small businesses build marketing systems that actually work. No long-term contracts required.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                Get a Free Consultation &rarr;
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                View Pricing
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Small Business Guide"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Sla Tracker", href: "/resources/sla-tracker" },
          { title: "Seo Checklist", href: "/resources/seo-checklist" },
          { title: "Seo Content Optimizer", href: "/resources/seo-content-optimizer" },
          { title: "Seo Gap Finder", href: "/resources/seo-gap-finder" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
