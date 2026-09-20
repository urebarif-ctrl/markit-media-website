import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Why Markit Media — What Makes Us Different",
  description: "Learn what sets Markit Media apart: senior talent, full-stack execution, transparent reporting, and data-driven marketing across 7 countries.",
  alternates: { canonical: "https://themarkitmedia.com/en/why-markit-media" },
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
  { title: "Global Perspective", desc: "We've run campaigns across 7 countries. We understand how markets differ and tailor strategies accordingly." },
];

export default function WhyMarkitMediaPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Why Markit Media",
    description: "What makes Markit Media different from typical digital marketing agencies.",
  };

  return (
    <article>
      <JsonLd data={schema} />
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
              <div key={c.category} className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-b border-gray-200">
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
              <div key={v.title} className="bg-gray-50 p-8 border border-gray-200">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">{v.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </Stagger>
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
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors">
              Get Started &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
