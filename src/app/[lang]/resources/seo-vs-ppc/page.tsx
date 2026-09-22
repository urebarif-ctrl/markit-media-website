import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

export const metadata: Metadata = {
  title: "SEO vs PPC: Which Is Right for Your Business?",
  description: "A detailed comparison of SEO and PPC marketing. Understand the costs, timelines, pros, and cons of each channel to make the right investment for your business.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/seo-vs-ppc" },
};

const comparison = [
  { dimension: "Time to Results", seo: "3-6 months for meaningful organic traffic growth", ppc: "Immediate traffic once campaigns are live" },
  { dimension: "Cost Structure", seo: "Monthly retainer for ongoing optimization; no per-click costs", ppc: "Pay per click; costs scale with traffic volume" },
  { dimension: "Long-Term Value", seo: "Compounds over time; rankings persist after investment", ppc: "Traffic stops when budget stops" },
  { dimension: "Targeting", seo: "Keyword-based; reaches users at various funnel stages", ppc: "Precise demographic, geographic, and behavioral targeting" },
  { dimension: "Click-Through Rate", seo: "Generally higher CTR for top organic positions", ppc: "Lower CTR, but above-fold placement guaranteed" },
  { dimension: "Trust Factor", seo: "Users trust organic results more than ads", ppc: "Ad labels can reduce trust, but visibility is instant" },
  { dimension: "Scalability", seo: "Scales with content and authority over time", ppc: "Scales immediately by increasing budget" },
  { dimension: "Data & Testing", seo: "Slower feedback loops; harder to A/B test", ppc: "Rapid testing of messaging, landing pages, and audiences" },
];

const whenToUseSEO = [
  "You are building for the long term and can invest 3-6 months before seeing significant returns",
  "Your target audience actively searches for your products or services",
  "You want to reduce customer acquisition costs over time",
  "Your competitors already rank well and you need to close the gap",
  "You want to build brand authority and thought leadership",
];

const whenToUsePPC = [
  "You need leads or sales quickly and cannot wait for organic growth",
  "You are launching a new product or entering a new market",
  "You have a defined budget and need predictable, measurable results",
  "You want to test messaging and positioning before committing to a long-term strategy",
  "Your industry has high commercial intent keywords that convert well",
];

export default function SEOvsPPCPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Should I invest in SEO or PPC?",
        acceptedAnswer: { "@type": "Answer", text: "It depends on your timeline and budget. SEO builds long-term value with compounding returns over 3-6 months. PPC delivers immediate traffic but stops when you stop paying. Most businesses benefit from a combination of both." },
      },
      {
        "@type": "Question",
        name: "Is SEO cheaper than PPC?",
        acceptedAnswer: { "@type": "Answer", text: "SEO typically has a higher upfront cost but lower long-term cost per acquisition because organic traffic is free. PPC costs scale with clicks. Over time, SEO usually delivers a lower cost per lead." },
      },
      {
        "@type": "Question",
        name: "Can you do SEO and PPC at the same time?",
        acceptedAnswer: { "@type": "Answer", text: "Yes, and it is often the best approach. PPC provides immediate traffic and data while SEO builds long-term organic presence. PPC data can also inform SEO keyword strategy." },
      },
    ],
  };

  return (
    <article>
      <JsonLd data={faqSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "SEO vs PPC" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Comparison Guide</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              SEO vs PPC: Which Is Right for Your Business?
            </h1>
            <SectionDesc>
              Both SEO and PPC can drive qualified traffic to your website. The right choice depends on your timeline,
              budget, industry, and goals. Here is an honest comparison to help you decide.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Side-by-side comparison">
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <Animate animation="fade-up">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left text-base font-bold text-black p-4 border-b-2 border-black w-1/4">&nbsp;</th>
                  <th className="text-left text-base font-bold text-black p-4 border-b-2 border-black w-[37.5%]">SEO</th>
                  <th className="text-left text-base font-bold text-black p-4 border-b-2 border-black w-[37.5%]">PPC</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.dimension} className="border-b border-gray-200">
                    <td className="p-4 text-base font-bold text-black align-top">{row.dimension}</td>
                    <td className="p-4 text-base text-gray-600 leading-relaxed align-top">{row.seo}</td>
                    <td className="p-4 text-base text-gray-600 leading-relaxed align-top">{row.ppc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-gray-50" aria-label="When to use each">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <Animate animation="fade-up">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">When to Focus on SEO</h2>
              <ul className="space-y-4">
                {whenToUseSEO.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-black text-white flex items-center justify-center flex-shrink-0 text-base font-bold mt-0.5">{i + 1}</span>
                    <span className="text-base text-gray-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/services/seo" className="inline-flex items-center gap-2 mt-6 text-base font-bold text-black hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                Explore Our SEO Services &rarr;
              </Link>
            </div>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">When to Focus on PPC</h2>
              <ul className="space-y-4">
                {whenToUsePPC.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-black text-white flex items-center justify-center flex-shrink-0 text-base font-bold mt-0.5">{i + 1}</span>
                    <span className="text-base text-gray-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/services/performance-marketing" className="inline-flex items-center gap-2 mt-6 text-base font-bold text-black hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                Explore Our PPC Services &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16" aria-label="Best of both worlds">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">The Best Approach: Use Both</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-4">
              For most businesses, the best results come from running SEO and PPC together. PPC delivers immediate traffic and lead flow while SEO builds long-term organic presence. Over time, as organic rankings improve, you can reallocate PPC budget to new opportunities rather than defending existing positions.
            </p>
            <p className="text-base text-gray-600 leading-relaxed mb-4">
              PPC data also directly improves SEO strategy. The keywords that convert well in paid campaigns are the ones worth targeting organically. The ad copy that drives the highest click-through rates informs the meta descriptions and page titles you write for organic pages.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              This integrated approach — using paid to learn fast and organic to scale efficiently — is how we work with most of our clients at Markit Media.
            </p>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Not Sure Which Channel to Start With?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              We will analyze your business and recommend the right mix of SEO and PPC based on your goals, budget, and timeline.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                Get a Free Assessment &rarr;
              </Link>
              <Link href="/services/finder" className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                Take the Service Finder Quiz
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Seo Vs Ppc"
        services={[
          { title: "SEO", desc: "Data-driven SEO strategies that drive organic traffic and revenue growth.", href: "/services/seo" },
          { title: "Content Marketing", desc: "Content that ranks, engages, and converts your target audience.", href: "/services/content-marketing" },
          { title: "Digital Marketing", desc: "Full-stack digital marketing strategy tailored to your business goals.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
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
