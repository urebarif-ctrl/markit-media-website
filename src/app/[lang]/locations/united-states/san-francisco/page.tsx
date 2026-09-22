import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in San Francisco — Markit Media",
  description:
    "Performance marketing, SEO, PPC, and web development for businesses in San Francisco. Growth strategies built for SaaS, startups, and tech companies in the Bay Area.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/san-francisco",
  },
  openGraph: {
    title: "Digital Marketing Agency in San Francisco — Markit Media",
    description:
      "Performance marketing, SEO, PPC, and web development for businesses in San Francisco. Growth strategies built for SaaS, startups, and tech companies in the Bay Area.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Markit Media",
  description:
    "Digital marketing agency serving businesses in San Francisco with performance marketing, SEO, PPC, web development, and SaaS growth strategies.",
  areaServed: { "@type": "City", name: "San Francisco" },
  url: "https://themarkitmedia.com/en/locations/united-states/san-francisco",
};

const services = [
  {
    title: "Performance Marketing",
    desc: "Google Ads and Meta Ads campaigns engineered for San Francisco's SaaS and B2B landscape, where qualified demo requests and trial signups matter more than raw click volume. We build conversion-focused funnels that account for long sales cycles and high customer acquisition costs typical of Bay Area tech companies.",
  },
  {
    title: "SEO",
    desc: "Technical SEO, programmatic content, and authority-building strategies for a market where you compete against well-funded startups and established tech giants for the same high-intent search terms. We target the bottom-of-funnel queries that drive pipeline, not just traffic.",
  },
  {
    title: "Social Media Marketing",
    desc: "LinkedIn-heavy paid and organic strategies for B2B companies alongside Meta and TikTok campaigns for consumer brands. San Francisco's audience skews tech-savvy and ad-aware, so creative needs to be sharp, authentic, and backed by a clear value proposition.",
  },
  {
    title: "Website Development",
    desc: "Fast, conversion-optimized sites on Next.js, WordPress, and headless CMS architectures built to meet the expectations of San Francisco's technically sophisticated users. Performance benchmarks, Core Web Vitals, and clean UX are baseline requirements in this market.",
  },
  {
    title: "Branding & Design",
    desc: "Brand identity systems for startups scaling beyond seed stage and established companies refreshing their market position. We build visual identities that communicate credibility in a city where every competitor has invested heavily in design.",
  },
  {
    title: "Video Production",
    desc: "Product demos, explainer videos, customer testimonials, and short-form social content tailored for SaaS and tech audiences. San Francisco buyers expect polished video assets at every stage of the funnel, from awareness ads to sales enablement.",
  },
  {
    title: "Email Marketing",
    desc: "Lifecycle email sequences, product-led growth nurtures, and re-engagement campaigns built for SaaS metrics. We optimize for activation rates, trial-to-paid conversion, and expansion revenue — the KPIs that matter to Bay Area subscription businesses.",
  },
  {
    title: "Content Marketing",
    desc: "Thought leadership, technical blog posts, comparison pages, and gated assets built to generate qualified leads in competitive B2B categories. We write for the informed San Francisco buyer who researches thoroughly before booking a demo.",
  },
  {
    title: "AI Solutions",
    desc: "AI-powered lead scoring, chatbot qualification flows, and predictive analytics dashboards that give San Francisco businesses a measurable efficiency advantage. We integrate with existing CRM and marketing automation stacks rather than requiring a full platform overhaul.",
  },
];

const reasons = [
  {
    title: "SaaS and startup growth marketing expertise",
    desc: "San Francisco's economy runs on recurring revenue. We understand the metrics that matter to venture-backed and bootstrapped SaaS companies alike — CAC payback, LTV-to-CAC ratios, activation funnels, and expansion MRR. Strategy is built around your unit economics, not generic awareness campaigns.",
  },
  {
    title: "Sophisticated strategy for a digitally mature audience",
    desc: "Bay Area consumers and B2B buyers are among the most digitally literate in the world. Basic retargeting and generic ad copy underperform here. We build multi-touch attribution models, layered audience segments, and creative strategies designed for an audience that recognizes and ignores lazy marketing.",
  },
  {
    title: "Cost efficiency over San Francisco agency overhead",
    desc: "San Francisco agency retainers reflect SOMA office rents and six-figure account manager salaries. As a remote team, we deliver the same caliber of strategic thinking and execution at a cost structure that lets you put more budget into actual media spend and growth experiments.",
  },
  {
    title: "Data-driven approach matching Bay Area expectations",
    desc: "San Francisco companies expect their marketing partners to speak in data, not vague impressions. We provide granular reporting tied to revenue impact, run structured experiments with statistical significance, and make optimization decisions based on evidence rather than intuition.",
  },
];

const faq = [
  {
    q: "How do you approach marketing for SaaS companies in San Francisco?",
    a: "We start with your unit economics — CAC targets, average contract value, sales cycle length, and current conversion rates at each funnel stage. From there we build channel strategies that map to specific pipeline goals. For most Bay Area SaaS companies, that means a combination of paid search for high-intent keywords, LinkedIn for account-based targeting, and content marketing to capture research-phase traffic. Everything ties back to qualified pipeline, not vanity metrics.",
  },
  {
    q: "What growth strategies work for startups in the Bay Area?",
    a: "It depends on the stage. Pre-product-market-fit startups need rapid experimentation across channels to find what converts. Post-PMF companies need scalable acquisition channels with predictable unit economics. We run structured growth sprints — typically two-week cycles — testing messaging, audiences, and channels, then double down on what produces qualified leads or signups at an acceptable cost.",
  },
  {
    q: "How do you help businesses compete in San Francisco's saturated digital market?",
    a: "Saturation means generic approaches fail. We identify positioning gaps your competitors have overlooked, target long-tail and mid-funnel keywords they are ignoring, and build creative assets that differentiate on specificity rather than volume. In paid channels, we use granular negative keyword strategies and audience exclusions to avoid bidding wars on broad terms where incumbents have budget advantages.",
  },
  {
    q: "How does a remote team effectively serve San Francisco tech companies?",
    a: "We maintain working-hour overlap with Pacific Time and use the same collaboration tools — Slack, Loom, Notion, Google Meet — that San Francisco teams already rely on. Reporting dashboards update in real time, and strategy calls happen on a cadence you set. Remote delivery eliminates the overhead markup of a Bay Area office while keeping communication and turnaround identical to an in-house team.",
  },
];

export default function SanFranciscoPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <article>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "United States", href: "/locations/united-states" },
          { label: "San Francisco" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>San Francisco</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Digital Marketing Agency Serving Businesses in San Francisco
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-3xl">
              San Francisco sits at the center of the world&apos;s largest
              technology ecosystem. SaaS companies, venture-backed startups, and
              established tech firms all compete for the same digitally
              sophisticated audience — an audience that demands precision
              targeting, clean design, and messaging that respects their
              intelligence. Generic marketing does not survive here.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-3xl">
              Markit Media serves businesses in San Francisco with performance
              marketing, SEO, PPC, web development, and growth strategy built
              specifically for the Bay Area&apos;s high-expectation, high-competition
              market.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Get a Free Consultation &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* Services */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Services for businesses in San Francisco"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Offer</SectionLabel>
            <SectionTitle>Services for the San Francisco Market</SectionTitle>
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

      {/* Why Markit Media */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why businesses in San Francisco choose Markit Media"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Businesses in San Francisco Choose Markit Media
            </SectionTitle>
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

      {/* FAQ */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="FAQ">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Common Questions</SectionTitle>
          </Animate>
          <div className="mt-10">
            {faq.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <details className="group border-b border-gray-200">
                  <summary className="flex justify-between items-center py-5 cursor-pointer text-base font-bold text-black list-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                    {item.q}
                    <span
                      className="text-xl text-gray-500 group-open:rotate-45 transition-transform motion-reduce:transition-none flex-shrink-0 ml-4"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <div className="pb-5 text-base text-gray-500 leading-relaxed">
                    {item.a}
                  </div>
                </details>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Grow Your Business in San Francisco?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a growth strategy designed for the Bay
              Area&apos;s most competitive market.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
