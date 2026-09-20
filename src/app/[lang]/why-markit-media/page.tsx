import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Why Markit Media — What Makes Us Different",
  description: "Learn what sets Markit Media apart: senior talent, full-stack execution, transparent reporting, and data-driven marketing across 6 countries.",
  alternates: { canonical: "https://themarkitmedia.com/en/why-markit-media" },
  openGraph: {
    title: "Why Choose Markit Media",
    description: "Senior talent, full-stack execution, transparent reporting, and data-driven marketing across 6 countries.",
  },
};

const comparisons = [
  {
    category: "Your Team",
    typical: "Junior account managers who relay messages between you and the team doing the work.",
    markit: "Senior specialists who execute your campaigns directly. No middlemen, no learning on your budget.",
  },
  {
    category: "Service Scope",
    typical: "Specialists in one or two channels. You need multiple vendors for full coverage.",
    markit: "Full-stack execution across SEO, paid ads, social, web dev, branding, video, and more. One team, one strategy.",
  },
  {
    category: "Reporting",
    typical: "Monthly PDFs with vanity metrics. Hard to tell what's actually driving results.",
    markit: "Transparent dashboards with real-time data. Reports focus on revenue impact, not impressions.",
  },
  {
    category: "Strategy",
    typical: "Cookie-cutter packages applied across clients. Same playbook, different logo.",
    markit: "Custom strategies built from discovery. Your business model, audience, and goals shape every decision.",
  },
  {
    category: "Communication",
    typical: "Emails go into a queue. Weekly check-ins feel scripted. Decisions take days.",
    markit: "Direct access to your team. Fast responses. Agile decision-making that keeps campaigns moving.",
  },
  {
    category: "Contracts",
    typical: "Long-term lock-ins with early termination fees. Difficult to scale up or down.",
    markit: "Flexible engagements that scale with your needs. We earn your business month by month.",
  },
];

const values = [
  { title: "Outcomes Over Activity", desc: "We measure success by business impact, not busywork. Every campaign is tied to KPIs that matter to your bottom line." },
  { title: "Radical Transparency", desc: "You see everything we see. No black boxes, no inflated metrics. Honest reporting and honest assessments." },
  { title: "Speed Without Sacrifice", desc: "We move fast but don't cut corners. Agile processes mean faster execution without compromising quality." },
  { title: "Global Perspective", desc: "We run campaigns across 6 countries. We understand how markets differ and tailor strategies accordingly." },
];

const whoWeAreNotItems = [
  { title: "We Are Not a Content Mill", desc: "We do not churn out low-quality blog posts for SEO volume. Every piece of content has a strategic purpose and meets editorial standards." },
  { title: "We Are Not a Reseller", desc: "Everything is executed in-house by our team. We do not white-label third-party work or outsource deliverables without your knowledge." },
  { title: "We Are Not a Vendor", desc: "We do not just take orders and execute. We challenge assumptions, recommend against things that will not work, and proactively identify opportunities." },
  { title: "We Are Not a One-Size-Fits-All Shop", desc: "We do not sell prepackaged tiers. Your strategy is built from your goals, market, and competitive reality." },
];

const processSteps = [
  { num: "01", title: "Discovery", desc: "We learn your business, audit your current marketing, and analyze your competitive landscape." },
  { num: "02", title: "Strategy", desc: "We develop a data-driven plan with clear KPIs, channel selection, and budget allocation." },
  { num: "03", title: "Execution", desc: "Our team builds and launches campaigns with creative production and technical implementation." },
  { num: "04", title: "Optimization", desc: "Continuous A/B testing, budget optimization, and creative refinement based on live data." },
  { num: "05", title: "Reporting", desc: "Transparent dashboards and regular reports focused on revenue metrics, not vanity numbers." },
];

const faqItems = [
  { q: "How is Markit Media different from a freelancer?", a: "A freelancer typically covers one discipline. We provide an integrated team across strategy, creative, development, and media buying — all coordinated under a single account lead. You get agency depth with freelancer-level access." },
  { q: "Do you specialize in a specific industry?", a: "We work across 20+ industries. Our approach is to deeply understand each client's market during discovery. This cross-industry perspective often surfaces competitive advantages that industry-only agencies miss." },
  { q: "What size companies do you work with?", a: "From funded startups to mid-market businesses to enterprise divisions. Our engagement models flex to match your scale and stage — from project-based work to full-service retainers." },
  { q: "How do you ensure brand consistency across channels?", a: "Every engagement starts with a brand and messaging framework. This document governs tone, visuals, and positioning across all channels so your audience gets a consistent experience whether they find you via search, social, or paid ads." },
  { q: "Can I start with one service and expand later?", a: "Absolutely. Many clients start with one channel, see results, and expand from there. Our full-stack capability means you do not need to find another agency when you are ready to scale." },
];

export default function WhyMarkitMediaPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Why Markit Media",
    description: "What makes Markit Media different from typical digital marketing agencies.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <article>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Why Markit Media" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Us</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing That Actually Works
            </h1>
            <SectionDesc>
              Most agencies sell packages. We build partnerships. Here is what working with Markit Media looks like compared to the typical agency experience.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-gray-50" aria-label="Comparison">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <div className="hidden md:grid grid-cols-3 gap-6 mb-8 pb-4 border-b border-gray-300">
              <div className="text-base font-bold text-black uppercase tracking-wide">&nbsp;</div>
              <div className="text-base font-bold text-gray-400 uppercase tracking-wide">Typical Agency</div>
              <div className="text-base font-bold text-black uppercase tracking-wide">Markit Media</div>
            </div>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="space-y-0">
            {comparisons.map((c) => (
              <div key={c.category} className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-b border-gray-200 hover:bg-white transition-colors duration-300 motion-reduce:transition-none px-4 -mx-4">
                <div className="font-[family-name:var(--font-display)] text-base font-extrabold text-black">{c.category}</div>
                <div className="text-base text-gray-400 leading-relaxed">
                  <span className="md:hidden text-base font-bold text-gray-400 uppercase tracking-wide block mb-1">Typical Agency</span>
                  {c.typical}
                </div>
                <div className="text-base text-gray-700 leading-relaxed">
                  <span className="md:hidden text-base font-bold text-black uppercase tracking-wide block mb-1">Markit Media</span>
                  {c.markit}
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="Our values">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Stand For</SectionLabel>
            <SectionTitle>Our Operating Principles</SectionTitle>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {values.map((v) => (
              <div key={v.title} className="bg-gray-50 p-8 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">{v.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Who we are not">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Straight Talk</SectionLabel>
            <SectionTitle>Who We Are Not</SectionTitle>
            <SectionDesc>
              Understanding what we do not do is just as important as understanding what we do. Here are some common agency patterns we intentionally avoid.
            </SectionDesc>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="space-y-0 mt-12">
            {whoWeAreNotItems.map((item, i) => (
              <div key={item.title} className="flex gap-6 py-8 border-b border-gray-200">
                <span className="w-8 h-8 bg-black text-white flex items-center justify-center flex-shrink-0 text-base font-bold">{i + 1}</span>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-2">{item.title}</h3>
                  <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="Our process overview">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>How It Works</SectionLabel>
            <SectionTitle>From Strategy to Results in 5 Steps</SectionTitle>
            <SectionDesc>
              Every engagement follows a structured process designed to deliver measurable outcomes.
            </SectionDesc>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-12">
            {processSteps.map((step) => (
              <div key={step.num} className="text-center p-6 border border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 motion-reduce:transition-none">
                <span className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-black/10 block mb-2">{step.num}</span>
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-2">{step.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </Stagger>
          <Animate animation="fade-up">
            <div className="text-center mt-8">
              <Link href="/process" className="inline-flex items-center gap-2 text-base font-bold text-black underline underline-offset-4 hover:no-underline transition-all motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                See the full process in detail &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Frequently asked questions">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Questions About Choosing an Agency</SectionTitle>
          </Animate>
          <div className="mt-10">
            {faqItems.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <details className="group border-b border-gray-200">
                  <summary className="flex justify-between items-center py-5 cursor-pointer text-base font-bold text-black list-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                    {item.q}
                    <span className="text-xl text-gray-500 group-open:rotate-45 transition-transform motion-reduce:transition-none flex-shrink-0 ml-4" aria-hidden="true">+</span>
                  </summary>
                  <div className="pb-5 text-base text-gray-500 leading-relaxed">{item.a}</div>
                </details>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16" aria-label="Cross links">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Our Services", desc: "Full-stack digital marketing across 13 disciplines.", href: "/services" },
                { title: "Case Studies", desc: "Real results from real campaigns across multiple industries.", href: "/case-studies" },
                { title: "Our Approach", desc: "The frameworks and methodologies behind our strategy.", href: "/approach" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="group border border-gray-200 bg-white p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black group-hover:underline mb-2">{link.title}</h3>
                  <p className="text-base text-gray-500 leading-relaxed">{link.desc}</p>
                </Link>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              See the Difference for Yourself
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Schedule a free consultation. No pitch decks, no pressure — just a conversation about what could work for your business.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none">
              Get Started &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
