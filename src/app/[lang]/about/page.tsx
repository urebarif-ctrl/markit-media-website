import type { Metadata } from "next";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import Link from "next/link";
import {
  Target,
  Lightbulb,
  Users,
  Globe,
  Zap,
  Shield,
  MapPin,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Markit Media is a full-stack digital marketing agency serving clients across 6 countries. Learn about our approach, values, and the team behind the work.",
  alternates: { canonical: "https://themarkitmedia.com/en/about" },
  openGraph: {
    title: "About Markit Media",
    description:
      "Meet the full-stack digital marketing agency serving clients across 6 countries. Our approach, values, and team.",
  },
};

const values = [
  {
    icon: Target,
    title: "Results Over Activity",
    desc: "We measure success by business outcomes, not busywork. Every campaign is built around metrics that matter to your bottom line.",
  },
  {
    icon: Shield,
    title: "Transparency by Default",
    desc: "Clear reporting, honest assessments, and no hidden fees. You always know where your budget goes and what it delivers.",
  },
  {
    icon: Lightbulb,
    title: "Own the Outcome",
    desc: "We take full accountability for what we deliver. Your success is our success — no finger-pointing, no excuses.",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    desc: "Digital marketing changes fast. We invest in staying ahead so your campaigns always use the most effective strategies available.",
  },
  {
    icon: Users,
    title: "Direct Access",
    desc: "You work with senior marketers who execute your campaigns, not junior account managers passing messages along.",
  },
  {
    icon: Zap,
    title: "Agile Execution",
    desc: "Fast iteration, real-time optimization, and responsive communication. No bureaucracy slowing things down.",
  },
];

const locations = [
  { country: "United States", code: "US" },
  { country: "Canada", code: "CA" },
  { country: "United Arab Emirates", code: "AE" },
  { country: "United Kingdom", code: "GB" },
  { country: "Australia", code: "AU" },
  { country: "Saudi Arabia", code: "SA" },
];

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Markit Media",
    description:
      "Full-stack digital marketing agency serving clients across 6 countries.",
    mainEntity: {
      "@type": "Organization",
      name: "Markit Media",
      email: "ciao@themarkitmedia.com",
      url: "https://themarkitmedia.com",
    },
  };

  return (
    <article>
      <JsonLd data={aboutSchema} />
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Animate animation="fade-up">
            <div>
              <SectionLabel>About Us</SectionLabel>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
                Full-Stack Marketing for Businesses That Want to Grow
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mt-6">
                Markit Media is a digital marketing agency built around one
                idea: your marketing should drive measurable business growth. We
                combine strategic thinking with hands-on execution across every
                digital channel, so you get a true partner, not just a vendor.
              </p>
              <p className="text-lg text-gray-500 leading-relaxed mt-4">
                We work with businesses across the USA, Canada, UAE, UK,
                Australia, and Saudi Arabia. Our team brings deep expertise in
                performance marketing, SEO, website development, branding, and
                creative production.
              </p>
            </div>
          </Animate>
          <Animate animation="fade-in" delay={200}>
            <img
              src="/images/about/team.svg"
              alt="The Markit Media team collaborating"
              className="w-full aspect-[4/3] object-cover"
            />
          </Animate>
        </div>
      </section>

      {/* Our Values */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Our values"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Values</SectionLabel>
            <SectionTitle>What Drives Us</SectionTitle>
          </Animate>
          <Stagger
            stagger={80}
            animation="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          >
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="bg-white p-8 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
                >
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-5">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black uppercase tracking-wide mb-3">
                    {v.title}
                  </h3>
                  <p className="text-base text-gray-500 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* How We Think */}
      <section
        className="px-6 lg:px-12 py-20 bg-black text-white"
        aria-label="Our approach"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Approach</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight mt-3">
              How We Think About Marketing
            </h2>
          </Animate>
          <Stagger
            stagger={80}
            animation="fade-up"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          >
            <div className="border border-white/10 p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none hover:border-white/30">
              <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-white uppercase tracking-wide mb-4">
                Strategy Before Tactics
              </h3>
              <p className="text-base text-gray-400 leading-relaxed">
                We never jump into execution without understanding your business
                first. Every campaign starts with research, audience analysis,
                and a clear plan with defined success metrics.
              </p>
            </div>
            <div className="border border-white/10 p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none hover:border-white/30">
              <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-white uppercase tracking-wide mb-4">
                Channels That Work Together
              </h3>
              <p className="text-base text-gray-400 leading-relaxed">
                SEO feeds content marketing. Content fuels social media. Social
                builds remarketing audiences. Paid amplifies organic winners. We
                build integrated systems, not isolated campaigns.
              </p>
            </div>
            <div className="border border-white/10 p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none hover:border-white/30">
              <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-white uppercase tracking-wide mb-4">
                Measure Everything
              </h3>
              <p className="text-base text-gray-400 leading-relaxed">
                If we cannot measure it, we do not do it. Every dollar of
                marketing spend is tracked from click to conversion to revenue.
                Our reporting ties marketing activity to business outcomes.
              </p>
            </div>
          </Stagger>
        </div>
      </section>

      {/* Global Presence */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Global presence"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Global Presence</SectionLabel>
            <SectionTitle>Where We Operate</SectionTitle>
            <SectionDesc>
              We serve clients across six countries, bringing local market
              knowledge and global strategic perspective to every engagement.
            </SectionDesc>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12"
          >
            {locations.map((loc) => (
              <div
                key={loc.code}
                className="bg-white border border-gray-200 p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
              >
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center mx-auto mb-4">
                  <MapPin size={22} aria-hidden="true" />
                </div>
                <p className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                  {loc.country}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Technology Stack */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Technology and platforms"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Technology</SectionLabel>
            <SectionTitle>Platforms We Work With</SectionTitle>
            <SectionDesc>
              We build on industry-standard platforms and tools to deliver
              results you can measure and scale.
            </SectionDesc>
          </Animate>
          <Stagger
            stagger={40}
            animation="fade-up"
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-12"
          >
            {[
              "Google Ads",
              "Meta Ads",
              "Google Analytics",
              "Search Console",
              "SEMrush",
              "Ahrefs",
              "HubSpot",
              "Mailchimp",
              "WordPress",
              "Shopify",
              "Next.js",
              "Figma",
              "Looker Studio",
              "Klaviyo",
              "TikTok Ads",
              "LinkedIn Ads",
              "Adobe Suite",
              "Premiere Pro",
            ].map((platform) => (
              <div
                key={platform}
                className="bg-white border border-gray-200 p-4 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
              >
                <span className="text-base font-medium text-gray-600">
                  {platform}
                </span>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Learn More / Internal Links */}
      <section
        className="px-6 lg:px-12 py-16"
        aria-label="Learn more about us"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Go Deeper</SectionLabel>
            <SectionTitle>Learn More About How We Work</SectionTitle>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10"
          >
            <Link
              href="/approach"
              className="group bg-white border border-gray-200 hover:border-black/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none p-8 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-3">
                Our Approach
              </h3>
              <p className="text-base text-gray-500 leading-relaxed">
                Discover the strategic framework behind every campaign we run.
              </p>
              <span className="inline-flex items-center gap-2 text-base font-bold text-black mt-4 group-hover:gap-3 transition-all duration-300 motion-reduce:transition-none">
                Learn more <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
            <Link
              href="/process"
              className="group bg-white border border-gray-200 hover:border-black/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none p-8 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-3">
                Our Process
              </h3>
              <p className="text-base text-gray-500 leading-relaxed">
                See the 5-step process we use to take you from strategy to
                measurable results.
              </p>
              <span className="inline-flex items-center gap-2 text-base font-bold text-black mt-4 group-hover:gap-3 transition-all duration-300 motion-reduce:transition-none">
                Learn more <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
            <Link
              href="/why-markit-media"
              className="group bg-white border border-gray-200 hover:border-black/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none p-8 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-3">
                Why Markit Media
              </h3>
              <p className="text-base text-gray-500 leading-relaxed">
                See how we compare to typical agencies across key dimensions.
              </p>
              <span className="inline-flex items-center gap-2 text-base font-bold text-black mt-4 group-hover:gap-3 transition-all duration-300 motion-reduce:transition-none">
                Learn more <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
            <Link
              href="/services"
              className="group bg-white border border-gray-200 hover:border-black/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none p-8 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-3">
                Our Services
              </h3>
              <p className="text-base text-gray-500 leading-relaxed">
                Explore the full range of digital marketing services we offer.
              </p>
              <span className="inline-flex items-center gap-2 text-base font-bold text-black mt-4 group-hover:gap-3 transition-all duration-300 motion-reduce:transition-none">
                Learn more <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Work Together?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s discuss how we can help grow your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Get in Touch <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/careers"
                className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Join Our Team
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    </article>
  );
}
