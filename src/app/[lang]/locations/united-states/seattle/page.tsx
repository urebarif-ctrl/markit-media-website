import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Seattle — Markit Media",
  description:
    "Performance marketing, SEO, PPC, and web development for businesses in Seattle. Growth strategies built for tech companies, cloud computing, e-commerce, and the Pacific Northwest market.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/seattle",
  },
  openGraph: {
    title: "Digital Marketing Agency in Seattle — Markit Media",
    description:
      "Performance marketing, SEO, PPC, and web development for businesses in Seattle. Growth strategies built for tech companies, cloud computing, e-commerce, and the Pacific Northwest market.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Markit Media",
  description:
    "Digital marketing agency serving businesses in Seattle with performance marketing, SEO, PPC, web development, and growth strategies for tech, cloud computing, e-commerce, and aerospace sectors.",
  areaServed: { "@type": "City", name: "Seattle" },
  url: "https://themarkitmedia.com/en/locations/united-states/seattle",
};

const services = [
  {
    title: "Performance Marketing",
    desc: "Google Ads and Meta Ads campaigns built for Seattle’s tech, e-commerce, and cloud computing sectors. We structure campaigns for the conversion patterns that matter in the Pacific Northwest — enterprise demo requests, SaaS trial signups, and e-commerce revenue, not just click volume.",
  },
  {
    title: "SEO",
    desc: "Technical SEO, programmatic content, and authority-building strategies for a market where you compete against some of the largest technology companies in the world for search visibility. We target the specific, high-intent queries that drive qualified pipeline in Seattle’s competitive verticals.",
  },
  {
    title: "Social Media Marketing",
    desc: "LinkedIn-driven B2B campaigns for enterprise software and cloud companies alongside Meta and TikTok strategies for e-commerce, gaming, and consumer brands. Seattle’s audience is technically sharp and values authenticity — creative needs to be direct, useful, and free of empty hype.",
  },
  {
    title: "Website Development",
    desc: "Fast, conversion-optimized sites on Next.js, WordPress, and headless CMS architectures built for Seattle’s tech-forward user base. Performance, accessibility, and modern architecture are baseline expectations in a market where your customers build software for a living.",
  },
  {
    title: "Branding & Design",
    desc: "Brand identity systems for Seattle tech companies scaling from startup to enterprise, e-commerce brands differentiating in crowded markets, and aerospace firms positioning for new contracts. We build visual identities that communicate innovation without sacrificing clarity.",
  },
  {
    title: "Video Production",
    desc: "Product demos, platform walkthroughs, customer stories, and short-form social content for Seattle’s tech and e-commerce companies. From AWS re:Invent-ready presentations to TikTok product launches, we produce video assets engineered for each stage of the buyer journey.",
  },
  {
    title: "Email Marketing",
    desc: "Lifecycle email sequences, product-led growth nurtures, and re-engagement campaigns built for SaaS and e-commerce metrics. We optimize for the KPIs Seattle companies track — activation rates, free-to-paid conversion, repeat purchase rates, and customer lifetime value.",
  },
  {
    title: "Content Marketing",
    desc: "Technical blog posts, comparison pages, developer documentation marketing, and gated assets built for Seattle’s engineering-influenced buyers. We write for the technical decision-maker who reads source code before reading a sales deck.",
  },
  {
    title: "AI Solutions",
    desc: "AI-powered lead scoring, predictive analytics, and automated qualification workflows that help Seattle businesses scale marketing operations efficiently. We integrate with existing tech stacks — CRM, marketing automation, data warehouses — rather than requiring a rip-and-replace.",
  },
];

const reasons = [
  {
    title: "Built for Seattle’s tech-driven economy",
    desc: "Seattle’s market is shaped by companies that build cloud infrastructure, run global e-commerce operations, and develop enterprise software. We understand the marketing dynamics of selling to technical buyers, competing in developer ecosystems, and positioning products in markets where the competition includes some of the world’s most resourced companies.",
  },
  {
    title: "Strategy for technically sophisticated audiences",
    desc: "Seattle’s buyer base includes engineers, product managers, and technical executives who see through generic marketing. We build campaigns with precise messaging, developer-friendly content, and channel strategies that respect the research-heavy buying process typical of Pacific Northwest tech companies.",
  },
  {
    title: "Cost efficiency over Seattle agency overhead",
    desc: "Seattle agency retainers reflect South Lake Union office leases and the salary expectations of one of the highest cost-of-living metros in the country. As a remote team, we deliver the same quality of strategic execution at a cost structure that puts more of your budget into media spend, content, and growth experiments.",
  },
  {
    title: "Data-driven execution matching Pacific Northwest standards",
    desc: "Seattle companies are built on data. They expect marketing partners who quantify everything, run controlled experiments, and make decisions based on evidence. We provide granular reporting tied to business outcomes, structured testing frameworks, and optimization cadences that match the analytical rigor Seattle teams operate with.",
  },
];

const faq = [
  {
    q: "How do you approach marketing for tech companies in Seattle?",
    a: "We start with your product, buyer persona, and sales motion. Enterprise software companies selling to CTOs need different strategies than consumer e-commerce brands or developer tools with self-serve adoption. For most Seattle tech companies, we build a channel mix that includes paid search for high-intent keywords, LinkedIn for account-based targeting, content marketing for developer and technical audiences, and email nurture sequences mapped to the buying cycle.",
  },
  {
    q: "What growth strategies work for e-commerce companies in the Seattle area?",
    a: "Seattle e-commerce companies benefit from a combination of performance marketing, SEO for product and category terms, and lifecycle email that drives repeat purchases. We focus on revenue metrics — ROAS, customer acquisition cost, and lifetime value — rather than traffic or impressions. For companies in crowded categories, we layer in competitive positioning work and brand-building campaigns that create differentiation beyond price.",
  },
  {
    q: "How do you help Seattle businesses compete against major tech companies for visibility?",
    a: "Competing for branded and category keywords against companies with massive marketing budgets requires a focused approach. We identify specific long-tail terms, niche audiences, and content gaps that large competitors overlook. In paid channels, we use granular targeting, strong negative keyword strategies, and differentiated creative to compete on relevance rather than budget. In organic search, depth and specificity outperform broad authority when targeting technical buyers.",
  },
  {
    q: "How does a remote team effectively serve businesses in Seattle?",
    a: "We maintain working-hour overlap with Pacific Time and use the same collaboration tools Seattle teams rely on — Slack, Loom, Notion, Google Meet, and GitHub for technical projects. Real-time reporting dashboards, regular strategy sessions, and async documentation keep projects running smoothly. Remote delivery eliminates the overhead of a Seattle office while keeping communication and turnaround identical to a local agency.",
  },
];

const subPages = [
  {
    title: "Marketing Agency",
    href: "/locations/united-states/seattle/marketing-agency",
    desc: "Full-service marketing strategy for Seattle tech, e-commerce, and cloud computing companies.",
  },
  {
    title: "PPC & Paid Ads",
    href: "/locations/united-states/seattle/ppc-ads",
    desc: "Google Ads and Meta Ads management for Seattle’s competitive tech verticals.",
  },
  {
    title: "Website Development",
    href: "/locations/united-states/seattle/website-development",
    desc: "Custom web development for tech and e-commerce companies in Seattle.",
  },
  {
    title: "SEO Services",
    href: "/locations/united-states/seattle/seo-services",
    desc: "Search engine optimization for competitive Seattle and Pacific Northwest keywords.",
  },
];

export default function SeattlePage() {
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
          { label: "Seattle" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Seattle</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Digital Marketing Agency Serving Businesses in Seattle
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-3xl">
              Seattle is a global technology hub where cloud computing,
              e-commerce, enterprise software, and gaming companies operate at
              massive scale. The city&apos;s buyers are technically
              sophisticated, data-driven, and accustomed to world-class digital
              experiences. Marketing that lacks precision and substance gets
              filtered out immediately.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-3xl">
              Markit Media serves businesses in Seattle with performance
              marketing, SEO, PPC, web development, and growth strategy built
              specifically for the Pacific Northwest&apos;s tech-driven,
              high-expectation market.
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
        aria-label="Services for businesses in Seattle"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Offer</SectionLabel>
            <SectionTitle>Services for the Seattle Market</SectionTitle>
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
        aria-label="Why businesses in Seattle choose Markit Media"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Businesses in Seattle Choose Markit Media
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

      {/* Sub-pages */}
      <section className="px-6 lg:px-12 py-20" aria-label="Seattle service pages">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Explore</SectionLabel>
            <SectionTitle>Seattle Service Pages</SectionTitle>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {subPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="bg-white border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none block"
              >
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black uppercase tracking-wide mb-2">
                  {page.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  {page.desc}
                </p>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Grow Your Business in Seattle?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a growth strategy designed for the Pacific
              Northwest&apos;s most competitive tech market.
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
