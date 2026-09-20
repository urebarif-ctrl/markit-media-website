import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How We Measure Results",
  description: "Learn how Markit Media measures, reports, and optimizes marketing performance. Our transparent reporting framework keeps you informed at every step.",
  alternates: { canonical: "https://themarkitmedia.com/en/results" },
};

const kpiCategories = [
  {
    title: "Revenue Metrics",
    metrics: ["Return on Ad Spend (ROAS)", "Cost Per Acquisition (CPA)", "Customer Lifetime Value (LTV)", "Revenue Growth Rate"],
    desc: "The numbers that tie marketing directly to your bottom line.",
  },
  {
    title: "Traffic & Visibility",
    metrics: ["Organic Search Traffic", "Keyword Rankings", "Domain Authority Growth", "Click-Through Rate"],
    desc: "How effectively your brand shows up where your audience is searching.",
  },
  {
    title: "Engagement & Conversion",
    metrics: ["Conversion Rate", "Lead Quality Score", "Bounce Rate", "Time on Site"],
    desc: "How well your marketing turns visitors into customers.",
  },
  {
    title: "Channel Performance",
    metrics: ["Cost Per Click (CPC)", "Impression Share", "Social Engagement Rate", "Email Open & Click Rates"],
    desc: "How each marketing channel performs against benchmarks.",
  },
];

const reportingCadence = [
  { freq: "Weekly", desc: "Quick performance snapshots highlighting wins, issues, and immediate optimization opportunities.", type: "Operational" },
  { freq: "Monthly", desc: "Comprehensive reports with full KPI analysis, budget tracking, and strategic recommendations for the next period.", type: "Strategic" },
  { freq: "Quarterly", desc: "Deep-dive business reviews covering ROI analysis, market trends, competitive positioning, and strategy refinement.", type: "Executive" },
];

export default function ResultsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "How We Measure Results — Markit Media",
    description: "Our transparent reporting framework for measuring marketing performance.",
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Results" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Results</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              How We Measure Results
            </h1>
            <SectionDesc>
              Marketing without measurement is guesswork. Every campaign we run is tied to clear KPIs, tracked in real time, and reported transparently. Here is how we ensure your marketing investment delivers measurable returns.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="What we measure">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>KPI Framework</SectionLabel>
            <SectionTitle>What We Measure</SectionTitle>
            <SectionDesc>
              We track the metrics that actually matter to your business, not vanity numbers that look good in a report but do not impact revenue.
            </SectionDesc>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {kpiCategories.map((cat) => (
              <div key={cat.title} className="bg-white border border-gray-200 p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black uppercase tracking-wide mb-2">{cat.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed mb-4">{cat.desc}</p>
                <ul className="space-y-2">
                  {cat.metrics.map((m) => (
                    <li key={m} className="text-base text-gray-600 flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-black rounded-full flex-shrink-0" aria-hidden="true" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="Reporting cadence">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Reporting</SectionLabel>
            <SectionTitle>How We Report</SectionTitle>
            <SectionDesc>
              Transparent, actionable reporting at three levels of detail. You always know what is working, what is not, and what we recommend next.
            </SectionDesc>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {reportingCadence.map((r) => (
              <div key={r.freq} className="border border-gray-200 p-8 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 motion-reduce:transition-none">
                <div className="text-base font-bold text-gray-400 uppercase tracking-wide mb-1">{r.type}</div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">{r.freq}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Our reporting principles">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Principles</SectionLabel>
            <SectionTitle>Our Reporting Philosophy</SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="space-y-0 mt-12">
            {[
              { title: "Revenue Over Vanity", desc: "We prioritize metrics that connect to your revenue. Impressions and followers are tracked, but never confused with business outcomes." },
              { title: "Full Transparency", desc: "You see exactly what we see. No cherry-picked data, no hidden underperformance. Honest reporting builds trust and better strategy." },
              { title: "Actionable Insights", desc: "Every report includes specific recommendations. Data without action is just noise." },
              { title: "Continuous Optimization", desc: "Reporting is not a retrospective exercise. We use real-time data to optimize campaigns continuously, not just at reporting intervals." },
            ].map((item, i) => (
              <div key={item.title} className="flex gap-8 py-8 border-b border-gray-200">
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

      <section className="px-6 lg:px-12 py-16" aria-label="Tools we use for reporting">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Tools</SectionLabel>
            <SectionTitle>Platforms We Report Through</SectionTitle>
            <SectionDesc>
              We work with industry-standard analytics and reporting platforms to ensure accuracy and accessibility.
            </SectionDesc>
          </Animate>
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3 mt-8">
              {["Google Analytics 4", "Google Ads", "Meta Ads Manager", "Google Search Console", "Looker Studio", "SEMrush", "Ahrefs", "HubSpot", "Mailchimp", "Shopify Analytics"].map((tool) => (
                <span key={tool} className="px-4 py-2 bg-gray-100 text-base font-medium text-gray-600">{tool}</span>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="What sets our reporting apart">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Differentiators</SectionLabel>
            <SectionTitle>What Sets Our Reporting Apart</SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {[
              { title: "Attribution Clarity", desc: "We go beyond last-click attribution. Multi-touch models show you the real impact of each channel so budget decisions are based on complete data." },
              { title: "Business Language", desc: "Reports are written for business owners, not analysts. Jargon is translated into plain language with clear implications for your bottom line." },
              { title: "Forward-Looking Recommendations", desc: "Every report ends with specific next steps. We do not just tell you what happened — we tell you what to do about it and why." },
              { title: "Real-Time Access", desc: "You do not wait for the monthly report to know how things are going. Dashboards are always live and accessible to your team." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 p-8 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 motion-reduce:transition-none">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">{item.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16" aria-label="Cross links">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Our Process", desc: "See the full 5-step framework from discovery to reporting.", href: "/process" },
                { title: "Case Studies", desc: "Real campaigns with real results across multiple industries.", href: "/case-studies" },
                { title: "ROI Calculator", desc: "Estimate the potential return on your marketing investment.", href: "/resources/roi-calculator" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="group border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
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
              Ready for Marketing That&apos;s Measurable?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s discuss your goals and build a strategy with clear KPIs from day one.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors">
                Get a Free Consultation &rarr;
              </Link>
              <Link href="/process" className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors">
                See Our Process
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    </article>
  );
}
