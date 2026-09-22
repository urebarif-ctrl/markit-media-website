import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Social Media Marketing in Karachi — Markit Media",
  description:
    "Social media marketing services in Karachi. Instagram, Facebook, TikTok, and LinkedIn strategy, content creation, and paid campaigns for brands targeting Karachi’s digitally-active audience.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/karachi/social-media-marketing",
  },
  openGraph: {
    title: "Social Media Marketing in Karachi — Markit Media",
    description:
      "Social media marketing services in Karachi. Instagram, Facebook, TikTok, and LinkedIn strategy, content creation, and paid campaigns for brands targeting Karachi’s digitally-active audience.",
  },
};

const services = [
  {
    title: "Instagram Marketing",
    desc: "Reels, carousels, Stories, and shoppable posts tailored for Karachi audiences. Instagram is the primary discovery platform for fashion, food, and lifestyle brands in the city, and we build content systems that convert scrollers into customers.",
  },
  {
    title: "Facebook Advertising",
    desc: "Facebook remains Pakistan’s largest social platform by monthly active users. We run conversion-focused ad campaigns with detailed audience segmentation across Karachi’s diverse demographics, from DHA to North Nazimabad.",
  },
  {
    title: "TikTok Content & Ads",
    desc: "Short-form video dominates attention among Karachi’s under-35 population. We create TikTok-native content and run Spark Ads and in-feed campaigns that align with local trends, humour, and cultural moments.",
  },
  {
    title: "LinkedIn B2B Marketing",
    desc: "For Karachi-based B2B companies, exporters, and professional services, LinkedIn is the highest-value organic channel. We develop thought-leadership content, company page strategy, and sponsored campaigns that generate qualified leads.",
  },
  {
    title: "Content Creation & Calendars",
    desc: "Consistent publishing drives algorithmic reach. We build monthly content calendars covering platform-specific formats, local events, seasonal trends, and brand storytelling, then produce the visuals, copy, and video to fill them.",
  },
  {
    title: "Community Management & Engagement",
    desc: "Social growth in Karachi depends on responsiveness. We handle comment moderation, DM responses, review management, and proactive engagement so your brand stays active in conversations that matter to your audience.",
  },
];

const reasons = [
  {
    title: "Local audience insight",
    desc: "Karachi is Pakistan’s most digitally active city, with over 20 million residents spanning every income bracket and language group. We understand how content consumption patterns differ across neighbourhoods, age groups, and platforms within this market.",
  },
  {
    title: "Platform-specific strategies",
    desc: "What works on Instagram Reels does not work on LinkedIn. We build separate strategies for each platform rather than cross-posting the same asset everywhere. Each channel gets native formats, platform-appropriate copy, and posting schedules tuned to when Karachi audiences are online.",
  },
  {
    title: "Content that resonates locally",
    desc: "Karachi audiences respond to content that reflects their reality—Urdu-English code-switching, local cultural references, and visual styles that feel authentic rather than imported. We create content that earns engagement because it fits the feed, not because it interrupts it.",
  },
  {
    title: "Data-backed decisions",
    desc: "Every campaign is tracked against measurable KPIs: reach, engagement rate, click-through rate, cost per result, and follower growth. We report monthly and adjust strategy based on what the numbers show, not assumptions about what should work.",
  },
];

const steps = [
  {
    num: "01",
    title: "Social Audit & Benchmarking",
    desc: "We start by reviewing your current social presence, analysing competitor activity in Karachi, and benchmarking your metrics against industry averages. This surfaces gaps and opportunities before any content is produced.",
  },
  {
    num: "02",
    title: "Content Strategy & Calendar",
    desc: "Based on the audit, we define content pillars, platform priorities, posting frequency, and a monthly calendar. The strategy maps directly to your business goals—whether that’s foot traffic, online sales, lead generation, or brand awareness.",
  },
  {
    num: "03",
    title: "Production & Publishing",
    desc: "Our team handles copywriting, graphic design, video editing, and scheduling. Content is reviewed and approved before it goes live. We also manage paid amplification for high-priority posts and campaign launches.",
  },
  {
    num: "04",
    title: "Analytics & Iteration",
    desc: "At the end of each cycle, we pull performance data across every active platform, identify top-performing content, and refine the strategy. This continuous loop ensures month-over-month improvement rather than stagnation.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Markit Media",
  description:
    "Social media marketing agency in Karachi managing Instagram, Facebook, TikTok, and LinkedIn for brands targeting Karachi’s digitally-active audience.",
  areaServed: { "@type": "City", name: "Karachi" },
  url: "https://themarkitmedia.com/en/locations/karachi/social-media-marketing",
};

export default function KarachiSocialMediaMarketingPage() {
  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb
        items={[
          { label: "Locations", href: "/locations" },
          { label: "Karachi", href: "/locations/karachi" },
          { label: "Social Media Marketing" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Karachi &middot; Social Media" className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Karachi &middot; Social Media</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              Social Media Marketing in Karachi
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Karachi has the highest concentration of social media users in
              Pakistan. With a young, mobile-first population that spends hours
              daily on Instagram, Facebook, TikTok, and LinkedIn, the
              opportunity for brands to build real audiences on these platforms
              is massive&mdash;but only if the content and strategy match how
              people in this city actually use each channel.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media is a Karachi-based agency that manages social media
              for brands operating in this market. We handle strategy, content
              production, community management, and paid social so your
              accounts grow with intent, not just vanity metrics.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Discuss Your Social Strategy &rarr;
              </Link>
              <Link
                href="/services/social-media"
                className="inline-flex items-center gap-3 border-2 border-black text-black px-10 py-5 font-bold text-base hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                View Social Media Services
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* Services Grid */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Social media marketing services in Karachi"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Cover</SectionLabel>
            <SectionTitle>
              Social Media Services for Karachi Brands
            </SectionTitle>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Pakistan&apos;s social media landscape is evolving fast. Platform
              algorithms change, new formats emerge, and audience behaviours
              shift. We stay on top of what&apos;s working right now across each
              platform so your brand doesn&apos;t fall behind.
            </p>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {services.map((svc) => (
              <div
                key={svc.title}
                className="bg-white border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
              >
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black uppercase tracking-wide mb-2">
                  {svc.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  {svc.desc}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why Karachi Brands Choose Us */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why Karachi brands choose Markit Media for social media"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Karachi Brands Choose Us for Social Media
            </SectionTitle>
            <p className="text-lg text-gray-500 leading-relaxed mt-4">
              Running social media accounts is easy. Growing them in a way that
              actually supports business outcomes in a competitive city like
              Karachi requires a different level of attention. Here&apos;s what
              sets our approach apart.
            </p>
          </Animate>
          <ul className="mt-10 space-y-4">
            {reasons.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <li className="flex items-start gap-4 py-3 border-b border-gray-200">
                  <span className="w-8 h-8 bg-black text-white flex items-center justify-center flex-shrink-0 text-base font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <span className="text-base font-bold text-black">
                      {item.title}
                    </span>
                    <p className="text-base text-gray-500 leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </li>
              </Animate>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Our social media marketing process"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>How We Work</SectionLabel>
            <SectionTitle>From Audit to Growth</SectionTitle>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Every engagement starts with understanding where you are now and
              where you need to be. Our four-phase process keeps social media
              management structured, measurable, and aligned with your
              commercial goals.
            </p>
          </Animate>
          <Stagger
            stagger={80}
            animation="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
          >
            {steps.map((step) => (
              <div key={step.num} className="relative">
                <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-black/10 leading-none">
                  {step.num}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black uppercase tracking-wide mt-2 mb-2">
                  {step.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Related Services in Karachi */}
      <section className="px-6 lg:px-12 py-16" aria-label="Related services">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Related Services in Karachi</SectionLabel>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Social media works best when it&apos;s part of a broader digital
              strategy. Explore what else we do for Karachi-based brands.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/locations/karachi/branding"
                className="inline-flex items-center gap-2 border border-gray-200 px-6 py-3 text-base font-bold text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none"
              >
                Branding
              </Link>
              <Link
                href="/locations/karachi/ppc-ads"
                className="inline-flex items-center gap-2 border border-gray-200 px-6 py-3 text-base font-bold text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none"
              >
                PPC Ads
              </Link>
              <Link
                href="/locations/karachi"
                className="inline-flex items-center gap-2 border border-gray-200 px-6 py-3 text-base font-bold text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none"
              >
                All Karachi Services
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Build a Real Social Presence in Karachi?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Stop guessing what to post. Let&apos;s build a social media
              strategy rooted in data, local insight, and content that actually
              performs in this market.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
