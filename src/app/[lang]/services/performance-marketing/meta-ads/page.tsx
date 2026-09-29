import type { Metadata } from "next";
import Link from "next/link";
import { SubServicePage } from "@/components/sub-service-page";
import { QuoteForm } from "@/components/quote-form";
import { SectionLabel, SectionTitle } from "@/components/section";

export const metadata: Metadata = {
  title: "Meta Ads (Facebook & Instagram)",
  description:
    "Meta Ads management for Facebook and Instagram. Precision audience targeting, creative testing, catalog ads, lead generation forms, and retargeting to grow your business.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/services/performance-marketing/meta-ads",
  },
  openGraph: {
    title: "Meta Ads (Facebook & Instagram)",
    description: "Meta Ads management for Facebook and Instagram. Precision audience targeting, creative testing, catalog ads, lead generation forms, and retargeting to g...",
  },
};

const process = [
  {
    step: "01",
    title: "Business and account audit",
    text: "We start with the offer, customer journey, margins, previous campaign data, creative, landing pages and tracking. The goal is to understand what Meta Ads should actually achieve for the business before we build campaigns.",
  },
  {
    step: "02",
    title: "Measurement setup",
    text: "We verify the Meta Pixel, Conversions API, events, UTMs and analytics so the account is optimizing toward meaningful actions rather than surface level activity.",
  },
  {
    step: "03",
    title: "Campaign architecture",
    text: "We structure prospecting, retargeting and conversion activity around the objective, buying cycle and available data instead of copying the same setup across every account.",
  },
  {
    step: "04",
    title: "Creative testing",
    text: "Hooks, formats, copy, video, static creative, carousels and offers are tested systematically. We use performance data to decide what deserves another iteration.",
  },
  {
    step: "05",
    title: "Optimization",
    text: "We review cost, conversion quality, frequency, placements, audience signals and creative performance, then move budget toward what is producing stronger business outcomes.",
  },
  {
    step: "06",
    title: "Scaling and reporting",
    text: "Budgets are scaled with control. Reporting connects platform metrics to leads, sales, bookings or other commercial outcomes so decisions are not based on clicks alone.",
  },
];

const framework = [
  {
    title: "Attract",
    text: "Reach relevant new audiences with clear positioning, platform native creative and a campaign objective matched to the business goal.",
  },
  {
    title: "Consider",
    text: "Build warm audiences from video viewers, social engagement and website activity, then answer the questions that stop prospects from moving forward.",
  },
  {
    title: "Convert",
    text: "Use lead, messaging, sales or website conversion campaigns to make the next action simple and measurable.",
  },
  {
    title: "Retain",
    text: "Reconnect with past visitors, leads and customers using first party audiences, CRM data and sequential messaging where appropriate.",
  },
];

const caseStudies = [
  {
    eyebrow: "Healthcare Performance Marketing",
    title: "Performance Marketing for Healthcare Client",
    text: "A multi channel paid advertising approach using Google Ads and Meta Ads to support patient acquisition.",
    href: "/case-studies",
  },
  {
    eyebrow: "B2B Full Stack Marketing",
    title: "Paid Media Inside a Wider Lead Generation System",
    text: "See how paid media fits alongside SEO and content when the objective is qualified B2B lead generation rather than isolated campaign metrics.",
    href: "/case-studies",
  },
  {
    eyebrow: "Creative Execution",
    title: "Social Media Creative Portfolio",
    text: "Explore design work that shows the visual execution behind social campaigns, brand communication and paid creative testing.",
    href: "/work/social-media-designs",
  },
];

const resources = [
  {
    title: "Meta Ads Creative Testing: A Framework for Consistent Winners",
    href: "/blog/meta-ads-creative-testing-framework-consistent-winners",
    text: "A practical framework for testing hooks, formats, copy and creative fatigue.",
  },
  {
    title: "Facebook Ads for Local Businesses: A Step-by-Step Setup Guide",
    href: "/blog/facebook-ads-local-businesses-step-by-step-setup",
    text: "How local businesses can think about objectives, geographic targeting and campaign setup.",
  },
  {
    title: "How to Scale Facebook Ads Without Killing Performance",
    href: "/blog/how-to-scale-facebook-ads-without-killing-performance-updated",
    text: "Why controlled scaling, measurement and landing page alignment matter when budgets increase.",
  },
  {
    title: "Retargeting Strategy: Bringing Visitors Back to Convert",
    href: "/blog/retargeting-strategy-bringing-visitors-back-convert",
    text: "Audience segmentation, lookback windows, creative rotation and sequential retargeting.",
  },
];

const industries = [
  { title: "Home Services", href: "/industries/home-services" },
  { title: "E-commerce", href: "/industries/ecommerce" },
  { title: "Healthcare", href: "/industries/healthcare" },
  { title: "Real Estate", href: "/industries/real-estate" },
  { title: "Restaurants", href: "/industries/restaurants" },
  { title: "Professional Services", href: "/industries/professional-services" },
];

export default function MetaAdsPage() {
  return (
    <SubServicePage
      parentTitle="Performance Marketing"
      parentHref="/services/performance-marketing"
      title="Meta Ads (Facebook & Instagram)"
      description="Tap into the combined audience of Facebook and Instagram with campaigns built for measurable results. From awareness to conversion, we build full-funnel Meta advertising strategies with precision targeting, creative testing, and data-driven optimization to drive qualified leads and sales."
      details={[
        "Advanced audience targeting using interest-based, behavioral, lookalike, and custom audiences built from your first-party data to reach the right people at the right time.",
        "Systematic creative testing with structured A/B and multivariate tests across ad copy, imagery, video, and format variations to identify top-performing combinations.",
        "Catalog and dynamic product ads for ecommerce businesses, automatically showcasing relevant products to users based on their browsing and purchase behavior.",
        "Lead generation form campaigns with pre-filled contact information, custom questions, and CRM integrations to capture qualified leads directly within the platform.",
        "Retargeting campaigns across Facebook and Instagram that re-engage website visitors, app users, and video viewers with personalized messaging at each funnel stage.",
      ]}
      benefits={[
        "Access to a combined audience across Facebook and Instagram in a single platform",
        "Precision targeting based on demographics, interests, behaviors, and first-party data",
        "Creative optimization through structured testing that improves results over time",
        "Full-funnel campaign structures from awareness to conversion",
        "Native lead generation forms that reduce friction and increase submission rates",
        "Detailed reporting on cost per lead, cost per purchase, and return on ad spend",
      ]}
      faq={[
        {
          q: "Which is better for my business, Facebook or Instagram ads?",
          a: "Both platforms are managed through Meta Ads Manager, and campaigns can run across both simultaneously. We allocate budget based on where your audience is most active and where performance data shows the strongest results.",
        },
        {
          q: "What types of creative work best on Meta?",
          a: "Performance varies by industry and audience. We test short-form video, user-generated content styles, static creative, carousels, offers and other formats to identify what performs best for your specific customer and objective.",
        },
        {
          q: "How does audience targeting work?",
          a: "We combine Meta audience signals with first-party data, website activity, customer lists, engagement audiences and lookalikes where appropriate. Targeting is only one part of performance, so creative and conversion signals are treated as equally important inputs.",
        },
        {
          q: "Can you run catalog ads for my online store?",
          a: "Yes. We can configure product catalog activity and dynamic product campaigns for suitable ecommerce setups, then use browsing and purchase behavior to improve relevance.",
        },
        {
          q: "How do you measure Meta Ads performance?",
          a: "We track metrics such as cost per result, conversion rate and return on ad spend when revenue data is available. We also verify the Meta Pixel, Conversions API and analytics so reporting can connect platform activity with meaningful business outcomes.",
        },
        {
          q: "Do you manage both Facebook Ads and Instagram Ads?",
          a: "Yes. Meta Ads Manager controls advertising across Facebook and Instagram. Placement and budget decisions are based on the campaign objective, creative format and performance data.",
        },
        {
          q: "Can Markit Media take over an existing Meta Ads account?",
          a: "Yes. We can audit the existing account, identify tracking, structure, creative and budget issues, then prioritize changes without rebuilding elements that are already working.",
        },
        {
          q: "Do you set up Meta Pixel and Conversions API?",
          a: "Yes. Measurement is part of campaign planning. The exact implementation depends on your website, ecommerce platform, CRM and conversion events.",
        },
        {
          q: "How quickly can Meta Ads generate results?",
          a: "Campaigns can begin generating traffic, leads or sales shortly after launch, but stable optimization takes data and testing. We set expectations around the objective, budget, sales cycle and conversion volume rather than promising an arbitrary timeline.",
        },
        {
          q: "How much should I spend on Meta Ads?",
          a: "There is no universal budget. A useful starting budget depends on your market, objective, average customer value, expected conversion rate and how much data the campaign needs to learn. We can recommend a test budget after reviewing the business and current account.",
        },
      ]}
      relatedServices={[
        {
          title: "Retargeting",
          href: "/services/performance-marketing/retargeting",
          desc: "Reconnect with warm audiences across the customer journey.",
        },
        {
          title: "Performance Marketing",
          href: "/services/performance-marketing",
          desc: "See how Meta fits alongside Google Ads and other paid channels.",
        },
        {
          title: "Social Media Marketing",
          href: "/services/social-media",
          desc: "Connect paid creative with the wider social content system.",
        },
      ]}
    >
      <section className="px-6 lg:px-12 py-16 border-y border-gray-100 bg-white" aria-label="Meta advertising platforms and campaign system">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
            <div>
              <SectionLabel>Facebook + Instagram + Meta</SectionLabel>
              <SectionTitle>One advertising system. Multiple ways to reach and convert.</SectionTitle>
              <p className="text-lg text-gray-500 leading-relaxed mt-5 max-w-2xl">
                We manage campaigns across Facebook and Instagram through Meta Ads Manager, connecting creative, audiences, placements and conversion data into one measurable acquisition system.
              </p>
              <div className="flex flex-wrap gap-3 mt-7">
                {[
                  ["Meta", "∞"],
                  ["Facebook", "f"],
                  ["Instagram", "◎"],
                  ["Reels", "▶"],
                  ["Messenger", "✦"],
                ].map(([name, icon]) => (
                  <div key={name} className="inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-white px-4 py-2.5 shadow-sm">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white text-lg font-black">{icon}</span>
                    <span className="text-sm font-bold">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-black text-white p-6 sm:p-8 shadow-2xl overflow-hidden relative">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/10" />
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/10" />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">Campaign system</p>
                    <h3 className="text-2xl font-extrabold mt-2">From attention to revenue</h3>
                  </div>
                  <div className="text-4xl font-black">∞</div>
                </div>
                <div className="grid grid-cols-4 gap-2 mt-8">
                  {[
                    ["01", "Creative"],
                    ["02", "Audience"],
                    ["03", "Conversion"],
                    ["04", "Learning"],
                  ].map(([n, label], index) => (
                    <div key={label} className="relative">
                      <div className="rounded-xl border border-white/15 bg-white/[0.06] p-3 min-h-24">
                        <span className="text-[10px] text-gray-500 font-bold">{n}</span>
                        <p className="text-xs sm:text-sm font-bold mt-5">{label}</p>
                      </div>
                      {index < 3 && <span className="absolute -right-2.5 top-1/2 z-10 text-gray-500">→</span>}
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-xl bg-white text-black p-4 flex items-center justify-between gap-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 font-bold">Optimization loop</p>
                    <p className="font-extrabold mt-1">Test → Learn → Improve → Scale</p>
                  </div>
                  <div className="h-12 w-12 shrink-0 rounded-full border-4 border-black border-l-gray-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Meta Ads funnel and performance metrics">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionLabel>Full Funnel Advertising</SectionLabel>
              <SectionTitle>We do not treat every audience like they are ready to buy.</SectionTitle>
              <p className="text-gray-500 leading-relaxed mt-5 max-w-xl">
                The message, creative and campaign objective should change as people move from discovery to consideration and conversion. Retargeting then reconnects with people who showed intent but did not act.
              </p>
              <div className="mt-9 space-y-3">
                {[
                  ["Awareness", "Cold audiences · Video · Reels · Discovery", "100%"],
                  ["Consideration", "Engagers · Visitors · Product viewers", "82%"],
                  ["Conversion", "Leads · Purchases · Messages · Bookings", "64%"],
                  ["Retargeting", "High-intent users · CRM · Past customers", "46%"],
                ].map(([title, text, width]) => (
                  <div key={title} className="rounded-xl bg-white border border-gray-200 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-extrabold">{title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{text}</p>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full mt-4 overflow-hidden">
                      <div className="h-full bg-black rounded-full" style={{ width }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionLabel>What We Watch</SectionLabel>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight mt-3">Metrics connected to business outcomes</h2>
              <div className="grid grid-cols-2 gap-3 mt-8">
                {[
                  ["CPA / CPL", "Acquisition efficiency"],
                  ["ROAS", "Revenue efficiency"],
                  ["CTR", "Creative response"],
                  ["CVR", "Conversion quality"],
                  ["Frequency", "Audience saturation"],
                  ["AOV / LTV", "Customer economics"],
                ].map(([metric, label], index) => (
                  <div key={metric} className="rounded-2xl bg-white border border-gray-200 p-5">
                    <div className="flex h-16 items-end gap-1 mb-4" aria-hidden="true">
                      {[35, 52, 44, 68, 58, 82, 72].map((height, bar) => (
                        <span key={bar} className="flex-1 bg-black/90 rounded-t-sm" style={{ height: `${Math.max(14, height - index * 2)}%` }} />
                      ))}
                    </div>
                    <p className="text-xl font-black">{metric}</p>
                    <p className="text-xs text-gray-500 mt-1">{label}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mt-4">
                Visual bars are illustrative. Client reporting uses actual account, analytics and CRM data where available.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="Meta Ads creative formats">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Creative That Fits the Feed</SectionLabel>
          <SectionTitle>Different formats for different moments</SectionTitle>
          <p className="text-lg text-gray-500 leading-relaxed mt-5 max-w-3xl">
            Meta performance increasingly depends on the quality and variety of creative inputs. We plan testing around the offer and customer, then produce or adapt assets for the placements that matter.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {[
              ["9:16", "Reels & Stories", "Short-form vertical creative built around fast hooks, demonstrations and clear next actions."],
              ["1:1", "Static Ads", "Focused visual concepts for offers, benefits, proof, products and lead generation."],
              ["▦", "Carousels", "Multi-card storytelling for products, features, steps, comparisons and catalog activity."],
              ["UGC", "Native-style Video", "Creator-style concepts and less polished formats designed to feel natural in the feed."],
            ].map(([visual, title, text]) => (
              <div key={title} className="group rounded-2xl border border-gray-200 overflow-hidden bg-white hover:shadow-xl transition-shadow">
                <div className="aspect-[4/3] bg-black flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-5 rounded-xl border border-white/15" />
                  <span className="relative text-white text-4xl font-black tracking-tight">{visual}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold text-lg">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mt-2">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="How Markit Media manages Meta Ads">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>How We Work</SectionLabel>
          <SectionTitle>How We Actually Run Meta Ads</SectionTitle>
          <p className="text-lg text-gray-500 leading-relaxed mt-5 max-w-3xl">
            A Meta Ads service should be more than campaign setup. We build the account around the offer, conversion path, creative system and measurement needed to make useful decisions over time.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {process.map((item) => (
              <div key={item.step} className="border border-gray-200 p-6 bg-white">
                <span className="text-xs font-bold tracking-[0.18em] text-gray-400">{item.step}</span>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold mt-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mt-3">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white" aria-label="Meta Ads funnel framework">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Our Framework</SectionLabel>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-tight mt-3">
            From first impression to measurable action
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mt-5 max-w-3xl">
            Campaign structure changes by business, but the customer journey still matters. We use the funnel to decide what each campaign should do and what signal should define success.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {framework.map((item, index) => (
              <div key={item.title} className="border border-white/20 p-6">
                <span className="text-xs font-bold text-gray-500">0{index + 1}</span>
                <h3 className="text-xl font-extrabold mt-3">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mt-3">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="Request a Meta Ads review">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          <div className="pt-2">
            <SectionLabel>Request a Quote</SectionLabel>
            <SectionTitle>Want us to review your Meta Ads?</SectionTitle>
            <p className="text-lg text-gray-500 leading-relaxed mt-5">
              Tell us what you are advertising, what is already running and where you are stuck. If you already have an ad account, include the current objective, monthly spend or the result you want to improve.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mt-7">
              {["New campaign setup", "Existing account audit", "Lead generation", "E-commerce sales", "Retargeting", "Creative testing"].map((item) => (
                <div key={item} className="border border-gray-200 px-4 py-3 text-sm font-semibold">{item}</div>
              ))}
            </div>
          </div>
          <QuoteForm
            service="Meta Ads (Facebook & Instagram)"
            title="Request a Meta Ads Review"
            buttonText="Request Review"
            messagePlaceholder="Business, website, current ad spend and what you want Meta Ads to achieve..."
          />
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Meta Ads case studies">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Relevant Proof</SectionLabel>
          <SectionTitle>Case Studies and Creative Work</SectionTitle>
          <p className="text-lg text-gray-500 leading-relaxed mt-5 max-w-3xl">
            The strongest campaign discussion starts with context. These examples show how paid media and creative execution fit into wider acquisition work.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {caseStudies.map((item) => (
              <Link key={item.title} href={item.href} className="group bg-white border border-gray-200 p-6 hover:border-black hover:shadow-lg transition-all">
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-gray-400">{item.eyebrow}</span>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold mt-3 group-hover:underline">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mt-3">{item.text}</p>
                <span className="inline-block mt-5 text-sm font-bold">Explore the work →</span>
              </Link>
            ))}
          </div>
          <Link href="/case-studies" className="inline-flex mt-8 font-bold underline underline-offset-4 hover:no-underline">
            Browse all case studies →
          </Link>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="Meta Ads measurement and tracking">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <SectionLabel>Measurement</SectionLabel>
            <SectionTitle>Advertising is only as useful as the tracking behind it</SectionTitle>
            <p className="text-lg text-gray-500 leading-relaxed mt-5">
              Meta can optimize only toward the signals it receives. Before scaling, we want the account to distinguish between activity that looks good inside Ads Manager and activity that matters to the business.
            </p>
            <Link href="/services/analytics-reporting" className="inline-flex mt-7 font-bold underline underline-offset-4 hover:no-underline">
              Explore analytics and reporting →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              ["Meta Pixel", "Browser event tracking for key website actions."],
              ["Conversions API", "Server side conversion signals where the setup supports it."],
              ["GA4 and GTM", "Cross channel measurement and controlled event implementation."],
              ["CRM attribution", "Connect lead quality, opportunities and closed business back to acquisition data where possible."],
              ["UTM governance", "Consistent campaign parameters for cleaner reporting."],
              ["Offline outcomes", "Use downstream lead or sales data when platform conversions alone are not enough."],
            ].map(([title, text]) => (
              <div key={title} className="bg-gray-50 p-5">
                <h3 className="font-extrabold">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mt-2">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Meta Ads educational resources">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Learn Before You Spend</SectionLabel>
          <SectionTitle>Meta Ads Guides From Our Blog</SectionTitle>
          <p className="text-lg text-gray-500 leading-relaxed mt-5 max-w-3xl">
            If you are still evaluating how Meta Ads should fit into your marketing, these guides explain the parts that most often affect performance.
          </p>
          <div className="grid md:grid-cols-2 gap-5 mt-10">
            {resources.map((item) => (
              <Link key={item.href} href={item.href} className="group bg-white border border-gray-200 p-6 hover:border-black transition-colors">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold group-hover:underline">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mt-3">{item.text}</p>
                <span className="inline-block mt-5 text-sm font-bold">Read the guide →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="Industries for Meta Ads">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Industry Context</SectionLabel>
          <SectionTitle>Meta Ads changes with the business model</SectionTitle>
          <p className="text-lg text-gray-500 leading-relaxed mt-5 max-w-3xl">
            A local service lead campaign should not be structured like an ecommerce acquisition program. Explore the industries where our wider marketing work gives us additional context around the customer journey.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-9">
            {industries.map((item) => (
              <Link key={item.href} href={item.href} className="border border-gray-200 p-5 font-bold hover:border-black hover:bg-gray-50 transition-colors">
                {item.title} →
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SubServicePage>
  );
}
