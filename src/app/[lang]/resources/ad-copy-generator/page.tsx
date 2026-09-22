"use client";

import { useState } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

type Platform = "google" | "facebook" | "linkedin" | "email";

const platformLimits: Record<Platform, { headline: number; desc: number; headlineCount: number; descCount: number; label: string }> = {
  google: { headline: 30, desc: 90, headlineCount: 3, descCount: 2, label: "Google Ads" },
  facebook: { headline: 40, desc: 125, headlineCount: 1, descCount: 1, label: "Facebook/Instagram Ads" },
  linkedin: { headline: 70, desc: 150, headlineCount: 1, descCount: 1, label: "LinkedIn Ads" },
  email: { headline: 60, desc: 140, headlineCount: 1, descCount: 1, label: "Email Subject Lines" },
};

const toneOptions = ["Professional", "Friendly", "Urgent", "Benefit-Led", "Question-Based"];

const templates: Record<Platform, Record<string, { headlines: string[]; descriptions: string[] }>> = {
  google: {
    Professional: {
      headlines: [
        "{Product} — Trusted by Thousands",
        "Expert {Product} Services",
        "Get a Free {Product} Quote",
      ],
      descriptions: [
        "Looking for {product}? Our team delivers results. {benefit}. Get started today.",
        "{Benefit}. Join thousands who trust our {product} services. Request your free consultation now.",
      ],
    },
    Friendly: {
      headlines: [
        "Need Help With {Product}?",
        "{Product} Made Easy",
        "Your {Product} Partner",
      ],
      descriptions: [
        "We make {product} simple. {benefit}. See why our clients love working with us.",
        "Ready to improve your {product}? {Benefit}. Let us show you how — it starts with a conversation.",
      ],
    },
    Urgent: {
      headlines: [
        "Limited Time: {Product} Offer",
        "Don't Miss Out on {Product}",
        "Act Now — {Product} Deals",
      ],
      descriptions: [
        "Time-sensitive offer on {product}. {Benefit}. Contact us today before this opportunity ends.",
        "Businesses are switching to our {product}. {Benefit}. Don't get left behind — get your quote now.",
      ],
    },
    "Benefit-Led": {
      headlines: [
        "{Benefit} With {Product}",
        "Grow Your Business With {Product}",
        "{Benefit} — Guaranteed",
      ],
      descriptions: [
        "{Benefit} when you choose our {product} services. Proven results for businesses like yours.",
        "Want to {benefit}? Our {product} solutions deliver. See real results from real clients.",
      ],
    },
    "Question-Based": {
      headlines: [
        "Need Better {Product}?",
        "Is Your {Product} Working?",
        "Want {Benefit}?",
      ],
      descriptions: [
        "Not getting results from your {product}? We can help. {Benefit}. Free consultation available.",
        "What if you could {benefit}? Our {product} experts make it happen. Talk to us today.",
      ],
    },
  },
  facebook: {
    Professional: {
      headlines: ["Expert {Product} for Growing Businesses"],
      descriptions: ["Our {product} services help businesses {benefit}. Trusted by companies that demand results. Start with a free strategy session."],
    },
    Friendly: {
      headlines: ["Your {Product} Journey Starts Here"],
      descriptions: ["We help businesses like yours {benefit} with {product} that actually works. Ready to see what is possible? Let us chat."],
    },
    Urgent: {
      headlines: ["Limited Spots: {Product} Consultation"],
      descriptions: ["We are accepting new {product} clients this month. {Benefit} before your competitors do. Book your free consultation today."],
    },
    "Benefit-Led": {
      headlines: ["{Benefit} With Our {Product} Services"],
      descriptions: ["{Benefit} is possible with the right {product} strategy. Our clients see real, measurable improvements. See if you qualify."],
    },
    "Question-Based": {
      headlines: ["Struggling With Your {Product}?"],
      descriptions: ["If your {product} is not delivering, something needs to change. We help businesses {benefit}. Free audit available — no strings attached."],
    },
  },
  linkedin: {
    Professional: {
      headlines: ["Enterprise-Grade {Product} for Results-Driven Teams"],
      descriptions: ["Our {product} solutions help B2B companies {benefit}. Backed by data, built for growth. Schedule a strategy call with our senior team to discuss your goals."],
    },
    Friendly: {
      headlines: ["Let Us Help You {Benefit} With {Product}"],
      descriptions: ["Great {product} does not have to be complicated. We partner with ambitious companies to {benefit}. Connect with us to start a conversation about your needs."],
    },
    Urgent: {
      headlines: ["Q4 Is Here — Is Your {Product} Strategy Ready?"],
      descriptions: ["The businesses winning in {product} planned ahead. {Benefit} with a strategy built for your specific industry. Limited availability for new clients this quarter."],
    },
    "Benefit-Led": {
      headlines: ["{Benefit}: The Power of Strategic {Product}"],
      descriptions: ["{Benefit} is what separates market leaders from the rest. Our {product} approach is built on real data and proven frameworks. See how we can help your business grow."],
    },
    "Question-Based": {
      headlines: ["Is Your {Product} Investment Paying Off?"],
      descriptions: ["Most companies underinvest in {product} — or invest in the wrong places. We help you {benefit} with a strategy that actually moves the needle. Free assessment available."],
    },
  },
  email: {
    Professional: {
      headlines: ["Your {Product} Strategy for Next Quarter"],
      descriptions: ["We have put together a custom {product} roadmap to help your business {benefit}. Inside: specific recommendations based on your industry and goals."],
    },
    Friendly: {
      headlines: ["Quick question about your {product}..."],
      descriptions: ["Hi! I noticed your business could {benefit} with a few {product} adjustments. Would you be open to a quick 15-minute call to discuss some ideas?"],
    },
    Urgent: {
      headlines: ["[Time-Sensitive] Your {product} opportunity"],
      descriptions: ["We are reaching out because we identified an opportunity for your business to {benefit}. This window is brief — here is what we recommend and why timing matters."],
    },
    "Benefit-Led": {
      headlines: ["How to {benefit} with {product}"],
      descriptions: ["Companies in your industry are using {product} to {benefit}. We have helped similar businesses achieve real results. Here is how you can do the same."],
    },
    "Question-Based": {
      headlines: ["Are you leaving {product} results on the table?"],
      descriptions: ["Most businesses we talk to are only capturing a fraction of what {product} can deliver. We can show you exactly where the gaps are — and how to {benefit}."],
    },
  },
};

export default function AdCopyGeneratorPage() {
  const [platform, setPlatform] = useState<Platform>("google");
  const [tone, setTone] = useState("Professional");
  const [product, setProduct] = useState("");
  const [benefit, setBenefit] = useState("");
  const [generated, setGenerated] = useState<{ headlines: string[]; descriptions: string[] } | null>(null);

  const generate = () => {
    const t = templates[platform][tone];
    if (!t) return;
    const prod = product.trim() || "your product";
    const ben = benefit.trim() || "grow your business";
    const capProd = prod.charAt(0).toUpperCase() + prod.slice(1);
    const capBen = ben.charAt(0).toUpperCase() + ben.slice(1);

    const headlines = t.headlines.map((h) =>
      h.replace(/\{Product\}/g, capProd).replace(/\{product\}/g, prod).replace(/\{Benefit\}/g, capBen).replace(/\{benefit\}/g, ben)
    );
    const descriptions = t.descriptions.map((d) =>
      d.replace(/\{Product\}/g, capProd).replace(/\{product\}/g, prod).replace(/\{Benefit\}/g, capBen).replace(/\{benefit\}/g, ben)
    );
    setGenerated({ headlines, descriptions });
  };

  const limits = platformLimits[platform];

  return (
    <article>
      <nav className="px-6 lg:px-12 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/resources" className="hover:text-black transition-colors">Resources</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">Ad Copy Generator</li>
        </ol>
      </nav>
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Ad Copy Generator
            </h1>
            <SectionDesc>
              Generate ad copy for Google, Facebook, LinkedIn, and email campaigns. Choose your platform, tone, and enter your details.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section aria-label="Content section" className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <Animate animation="fade-up">
            <div>
              <p className="text-base font-bold text-black mb-3">Platform</p>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(platformLimits) as Platform[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => { setPlatform(p); setGenerated(null); }}
                    className={`px-5 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      platform === p
                        ? "bg-black text-white"
                        : "border border-gray-200 text-gray-600 hover:border-black"
                    }`}
                  >
                    {platformLimits[p].label}
                  </button>
                ))}
              </div>
            </div>
          </Animate>

          <Animate animation="fade-up" delay={40}>
            <div>
              <p className="text-base font-bold text-black mb-3">Tone</p>
              <div className="flex flex-wrap gap-2">
                {toneOptions.map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTone(t); setGenerated(null); }}
                    className={`px-5 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      tone === t
                        ? "bg-black text-white"
                        : "border border-gray-200 text-gray-600 hover:border-black"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </Animate>

          <Animate animation="fade-up" delay={80}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="product" className="block text-base font-bold text-black mb-2">
                  Product / Service
                </label>
                <input
                  id="product"
                  type="text"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="e.g. SEO services, web design, HVAC"
                  className="w-full px-4 py-3 border border-gray-200 text-base focus-visible:border-black focus-visible:outline-none"
                />
              </div>
              <div>
                <label htmlFor="benefit" className="block text-base font-bold text-black mb-2">
                  Key Benefit
                </label>
                <input
                  id="benefit"
                  type="text"
                  value={benefit}
                  onChange={(e) => setBenefit(e.target.value)}
                  placeholder="e.g. increase leads by 50%, save time"
                  className="w-full px-4 py-3 border border-gray-200 text-base focus-visible:border-black focus-visible:outline-none"
                />
              </div>
            </div>
          </Animate>

          <Animate animation="fade-up" delay={120}>
            <button
              onClick={generate}
              className="bg-black text-white px-8 py-4 text-base font-bold hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Generate Ad Copy
            </button>
          </Animate>
        </div>
      </section>

      {generated && (
        <section aria-label="Headlines (max characters)" className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <div className="border border-gray-200 overflow-hidden">
                <div className="bg-black text-white p-4">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                    {limits.label} — {tone} Copy
                  </h2>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="font-bold text-black mb-3">
                      Headlines (max {limits.headline} characters)
                    </h3>
                    <div className="space-y-3">
                      {generated.headlines.map((h, i) => {
                        const over = h.length > limits.headline;
                        return (
                          <div key={i} className="p-4 bg-gray-50 border border-gray-200">
                            <p className="text-base text-black font-bold">{h}</p>
                            <p className={`text-base mt-1 ${over ? "text-red-600 font-bold" : "text-gray-400"}`}>
                              {h.length}/{limits.headline} characters {over && "— too long, shorten it"}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-black mb-3">
                      Descriptions (max {limits.desc} characters)
                    </h3>
                    <div className="space-y-3">
                      {generated.descriptions.map((d, i) => {
                        const over = d.length > limits.desc;
                        return (
                          <div key={i} className="p-4 bg-gray-50 border border-gray-200">
                            <p className="text-base text-gray-600 leading-relaxed">{d}</p>
                            <p className={`text-base mt-2 ${over ? "text-red-600 font-bold" : "text-gray-400"}`}>
                              {d.length}/{limits.desc} characters {over && "— too long, shorten it"}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </Animate>
          </div>
        </section>
      )}

      <section aria-label="Lead with the benefit" className="px-6 lg:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              Ad Copy Best Practices
            </h2>
            <div className="space-y-6 text-base text-gray-500 leading-relaxed">
              <div>
                <h3 className="font-bold text-black mb-2">Lead with the benefit</h3>
                <p>Users scroll past features. Start with what they gain: more leads, lower costs, faster results. The benefit hooks attention; the features close the deal.</p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Include a clear call to action</h3>
                <p>Tell people exactly what to do next. &quot;Get a free quote,&quot; &quot;Start your trial,&quot; or &quot;Book a call&quot; outperform vague CTAs like &quot;Learn more.&quot;</p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Match the platform tone</h3>
                <p>Google Ads copy should be direct and keyword-rich. Facebook can be more conversational. LinkedIn should be professional but not stiff. Match the platform culture.</p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Test multiple variations</h3>
                <p>Never run a single ad. Test different headlines, descriptions, and CTAs. Small changes in wording can produce significant differences in click-through and conversion rates.</p>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Expert Ad Copywriting?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our copywriting team creates high-converting ad copy for Google, Meta, LinkedIn, and more — tested and optimized for your audience.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Get Professional Ad Copy &rarr;
            </Link>
          </Animate>
        </div>
      </section>
          
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/ad-copy-analyzer" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Ad Copy Analyzer</Link>
                <Link href="/resources/ad-spend-calculator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Ad Spend Calculator</Link>
                <Link href="/resources/ad-budget-pacing" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Ad Budget Pacing</Link>
                <Link href="/resources/google-ads-estimator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Google Ads Estimator</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Ad Copy Generator — Create High-Converting Ad Text",
          description: "Use our free ad copy generator to create compelling ad templates for Google Ads, Facebook, LinkedIn, and email campaigns. Get platform-optimized copy in seconds.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Ad Copy Generator"
        services={[
          { title: "Performance Marketing", desc: "Google Ads, Meta Ads, and PPC campaigns that maximize ROAS.", href: "/services/performance-marketing" },
          { title: "Digital Marketing", desc: "Integrated strategy across all channels for measurable growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Complement paid with organic — reduce dependency on ad spend over time.", href: "/services/seo" },
        ]}
        relatedTools={[
          { title: "Ad Budget Pacing", href: "/resources/ad-budget-pacing" },
          { title: "Ad Copy Analyzer", href: "/resources/ad-copy-analyzer" },
          { title: "Ad Spend Calculator", href: "/resources/ad-spend-calculator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
