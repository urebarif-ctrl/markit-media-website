import type { Metadata } from "next";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import Link from "next/link";
import { Target, Lightbulb, Users, Globe, Zap, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Markit Media is a full-stack digital marketing agency serving clients across 7 countries. Learn about our approach, values, and the team behind the work.",
  alternates: { canonical: "https://themarkitmedia.com/en/about" },
};

const values = [
  { icon: Target, title: "Results-Driven", desc: "Every campaign is built around measurable outcomes. We optimize for what matters to your bottom line." },
  { icon: Lightbulb, title: "Strategic Thinking", desc: "We start with strategy, not tactics. Understanding your business comes before any execution." },
  { icon: Users, title: "Direct Access", desc: "You work with senior marketers who execute your campaigns, not junior account managers." },
  { icon: Globe, title: "Global Reach", desc: "We serve clients across the USA, Canada, UAE, UK, Australia, and Saudi Arabia." },
  { icon: Zap, title: "Agile Execution", desc: "Fast iteration, real-time optimization, and responsive communication. No bureaucracy." },
  { icon: Shield, title: "Transparency", desc: "Clear reporting, honest assessments, and no hidden fees. You always know where your budget goes." },
];

const timeline = [
  { year: "Founded", desc: "Markit Media launched as a full-stack digital marketing agency, serving clients across multiple markets." },
  { year: "Growth", desc: "Expanded services to include AI solutions, advanced analytics, and video production capabilities." },
  { year: "Global", desc: "Grew to serve clients across 7 countries with a distributed team of specialists." },
  { year: "Today", desc: "A trusted partner for businesses looking to scale their digital presence with data-driven marketing." },
];

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Markit Media",
    description: "Full-stack digital marketing agency serving 7 countries.",
    mainEntity: {
      "@type": "Organization",
      name: "Markit Media",
      email: "ciao@themarkitmedia.com",
      url: "https://themarkitmedia.com",
      foundingDate: "2019",
      numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 50 },
    },
  };

  return (
    <article>
      <JsonLd data={aboutSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />

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
                Markit Media is a digital marketing agency built around one idea: your marketing should drive measurable business growth. We combine strategic thinking with hands-on execution across every digital channel, so you get a true partner, not just a vendor.
              </p>
              <p className="text-lg text-gray-500 leading-relaxed mt-4">
                We work with businesses across the USA, Canada, UAE, UK, Australia, and Saudi Arabia. Our team brings deep expertise in performance marketing, SEO, website development, branding, and creative production.
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

      {/* Values */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Our values">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Values</SectionLabel>
            <SectionTitle>What Drives Us</SectionTitle>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-white p-8 border border-gray-200">
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-5">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black uppercase tracking-wide mb-3">{v.title}</h3>
                  <p className="text-base text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 lg:px-12 py-20" aria-label="Our journey">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Journey</SectionLabel>
            <SectionTitle>Building for the Long Run</SectionTitle>
          </Animate>
          <div className="mt-12 space-y-0">
            {timeline.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 100}>
                <div className="flex gap-8 py-8 border-b border-gray-200">
                  <div className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black w-24 flex-shrink-0">{item.year}</div>
                  <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* How We Think */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white" aria-label="Our approach">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Approach</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight mt-3">
              How We Think About Marketing
            </h2>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="border border-white/10 p-8">
              <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-white uppercase tracking-wide mb-4">
                Strategy Before Tactics
              </h3>
              <p className="text-base text-gray-400 leading-relaxed">
                We never jump into execution without understanding your business first. Every campaign starts with research, audience analysis, and a clear plan with defined success metrics.
              </p>
            </div>
            <div className="border border-white/10 p-8">
              <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-white uppercase tracking-wide mb-4">
                Channels That Work Together
              </h3>
              <p className="text-base text-gray-400 leading-relaxed">
                SEO feeds content marketing. Content fuels social media. Social builds remarketing audiences. Paid amplifies organic winners. We build integrated systems, not isolated campaigns.
              </p>
            </div>
            <div className="border border-white/10 p-8">
              <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-white uppercase tracking-wide mb-4">
                Measure Everything
              </h3>
              <p className="text-base text-gray-400 leading-relaxed">
                If we cannot measure it, we do not do it. Every dollar of marketing spend is tracked from click to conversion to revenue. Our reporting ties marketing activity to business outcomes.
              </p>
            </div>
          </Stagger>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Technology and platforms">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Technology</SectionLabel>
            <SectionTitle>Platforms We Work With</SectionTitle>
            <SectionDesc>
              We build on industry-standard platforms and tools to deliver results you can measure and scale.
            </SectionDesc>
          </Animate>
          <Stagger stagger={40} animation="fade-up" className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-12">
            {[
              "Google Ads", "Meta Ads", "Google Analytics", "Search Console",
              "SEMrush", "Ahrefs", "HubSpot", "Mailchimp",
              "WordPress", "Shopify", "Next.js", "Figma",
              "Looker Studio", "Klaviyo", "TikTok Ads", "LinkedIn Ads",
              "Adobe Suite", "Premiere Pro",
            ].map((platform) => (
              <div key={platform} className="bg-white border border-gray-200 p-4 text-center">
                <span className="text-base font-medium text-gray-600">{platform}</span>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Learn More */}
      <section className="px-6 lg:px-12 py-16" aria-label="Learn more about us">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Go Deeper</SectionLabel>
            <SectionTitle>Learn More About How We Work</SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <Link href="/process" className="group bg-white border border-gray-200 hover:border-black/30 transition-all p-8 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-3">Our Process</h3>
              <p className="text-base text-gray-500 leading-relaxed">See the 5-step process we use to take you from strategy to measurable results.</p>
            </Link>
            <Link href="/why-markit-media" className="group bg-white border border-gray-200 hover:border-black/30 transition-all p-8 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-3">Why Markit Media</h3>
              <p className="text-base text-gray-500 leading-relaxed">See how we compare to typical agencies across 6 key dimensions.</p>
            </Link>
            <Link href="/tools" className="group bg-white border border-gray-200 hover:border-black/30 transition-all p-8 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-3">Tools &amp; Platforms</h3>
              <p className="text-base text-gray-500 leading-relaxed">Explore the technology stack we use to research, execute, and measure campaigns.</p>
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
              <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors">
                Get in Touch &rarr;
              </Link>
              <Link href="/get-a-quote" className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors">
                Get a Quote
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    </article>
  );
}
