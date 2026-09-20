import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Our Work",
  description: "See how Markit Media helps businesses grow through digital marketing, website development, branding, and creative production across 6 countries.",
  alternates: { canonical: "https://themarkitmedia.com/en/work" },
};

const capabilities = [
  { title: "Performance Marketing", desc: "ROI-focused campaigns across Google, Meta, TikTok, and LinkedIn.", image: "/images/work/performance-marketing.svg", href: "/services/performance-marketing" },
  { title: "SEO & Content", desc: "Organic growth through technical SEO, content strategy, and link building.", image: "/images/work/seo-content.svg", href: "/services/seo" },
  { title: "Website Development", desc: "High-performance websites on WordPress, Shopify, and Next.js.", image: "/images/work/website-development.svg", href: "/services/website-development" },
  { title: "Branding & Design", desc: "Brand strategy, visual identity, and design systems that differentiate.", image: "/images/work/branding-design.svg", href: "/services/branding" },
  { title: "Video Production", desc: "Commercials, motion graphics, reels, and animation.", image: "/images/work/video-production.svg", href: "/services/video-production" },
  { title: "Social Media", desc: "Strategy, content creation, community management, and analytics.", image: "/images/work/social-media.svg", href: "/services/social-media" },
];

const approach = [
  { step: "01", title: "Discovery", desc: "We learn your business, goals, audience, and competitive landscape before making any recommendations." },
  { step: "02", title: "Strategy", desc: "We build a custom plan with clear KPIs, channel selection, and budget allocation tied to your objectives." },
  { step: "03", title: "Execution", desc: "Our specialists execute across every channel — no handoffs to junior teams, no outsourcing to freelancers." },
  { step: "04", title: "Optimization", desc: "We monitor performance daily and optimize continuously. What works gets scaled; what doesn't gets cut." },
  { step: "05", title: "Reporting", desc: "Transparent dashboards and regular reports show exactly where your budget goes and what it produces." },
];

export default function WorkPage() {
  const workSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Markit Media Work",
    description: "Portfolio of digital marketing work by Markit Media.",
  };

  return (
    <article>
      <JsonLd data={workSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Work" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-20">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Work</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Results That Speak for Themselves
            </h1>
            <SectionDesc>
              We help businesses across 6 countries grow through strategic digital marketing, compelling creative, and data-driven execution.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Capabilities">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Capabilities</SectionLabel>
            <SectionTitle>What We Deliver</SectionTitle>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {capabilities.map((cap) => (
              <Link key={cap.title} href={cap.href} className="group bg-white border border-gray-200 hover:border-black/30 hover:shadow-lg transition-all duration-300 motion-reduce:transition-none overflow-hidden focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={cap.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black uppercase tracking-wide group-hover:underline mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-base text-gray-500 leading-relaxed">{cap.desc}</p>
                </div>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="Our approach">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Approach</SectionLabel>
            <SectionTitle>How We Work</SectionTitle>
            <SectionDesc>
              Every engagement starts with understanding your business. We follow a proven process that connects strategy to execution and measures results at every step.
            </SectionDesc>
          </Animate>
          <div className="mt-12 space-y-0">
            {approach.map((item, i) => (
              <Animate key={item.step} animation="fade-up" delay={i * 80}>
                <div className="flex gap-8 py-8 border-b border-gray-200">
                  <div className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-black/10 w-16 flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-2">{item.title}</h3>
                    <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="What we look for">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Good Fit</SectionLabel>
            <SectionTitle>The Kind of Clients We Work Best With</SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {[
              { title: "Growth-Minded", desc: "You're looking to scale, not just maintain. We build strategies for businesses that want to grow." },
              { title: "Long-Term Thinkers", desc: "The best results come from sustained effort. We work best with clients who value partnerships over projects." },
              { title: "Data-Comfortable", desc: "You appreciate data-driven decisions and want to see how your marketing investment performs." },
              { title: "Ready to Execute", desc: "You have a product or service that works. You need marketing that puts it in front of the right people." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">{item.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-24 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Let&apos;s Build Something Great
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Contact us for a free consultation and let&apos;s discuss your next project.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors">
              Start a Project &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
