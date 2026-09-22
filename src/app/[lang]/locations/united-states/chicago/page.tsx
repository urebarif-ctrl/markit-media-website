import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Chicago — Markit Media",
  description:
    "Performance marketing, SEO, PPC, and web development for businesses in Chicago. ROI-focused digital strategies for the Midwest's largest business hub.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/locations/united-states/chicago",
  },
  openGraph: {
    title: "Digital Marketing Agency in Chicago — Markit Media",
    description:
      "Performance marketing, SEO, PPC, and web development for businesses in Chicago. ROI-focused digital strategies for the Midwest's largest business hub.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Markit Media",
  description:
    "Digital marketing agency serving businesses in Chicago with performance marketing, SEO, PPC, web development, and branding.",
  areaServed: { "@type": "City", name: "Chicago" },
  url: "https://themarkitmedia.com/en/locations/united-states/chicago",
};

const services = [
  {
    title: "Performance Marketing",
    desc: "Google Ads and Meta Ads campaigns structured for Chicago’s B2B buyers. We target decision-makers across manufacturing, logistics, and professional services with conversion-focused funnels.",
  },
  {
    title: "SEO",
    desc: "Technical and local SEO strategies that rank your business in Chicago's competitive search landscape. From Loop offices to suburban industrial parks, we build visibility where your buyers search.",
  },
  {
    title: "Social Media Marketing",
    desc: "LinkedIn-first social strategies for Chicago's B2B market, paired with Meta and TikTok campaigns for consumer-facing brands competing across the Midwest.",
  },
  {
    title: "Website Development",
    desc: "Fast, conversion-optimized websites built on WordPress, Shopify, or Next.js. Designed for the practical expectations of Midwest buyers who value clarity over flash.",
  },
  {
    title: "Branding & Design",
    desc: "Brand identity systems that communicate reliability and expertise — the qualities Chicago's business community expects. Logos, guidelines, and visual systems built to last.",
  },
  {
    title: "Video Production",
    desc: "Product demos, facility walkthroughs, and short-form content for Chicago manufacturers and service providers. Edited and produced remotely with fast turnaround.",
  },
  {
    title: "Email Marketing",
    desc: "Nurture sequences and automated campaigns for long B2B sales cycles common in Chicago's industrial and professional services sectors.",
  },
  {
    title: "Content Marketing",
    desc: "Whitepapers, case studies, and blog content that positions your Chicago business as a sector authority. Written for buyers who do their research before picking up the phone.",
  },
  {
    title: "AI Solutions",
    desc: "AI-powered lead scoring, chatbots, and marketing automation tailored to Chicago's data-driven business culture. Practical tools, not hype.",
  },
];

const subPages = [
  {
    title: "Marketing Agency",
    href: "/locations/united-states/chicago/marketing-agency",
    desc: "Full-service digital marketing for Chicago businesses across every channel.",
  },
  {
    title: "PPC & Paid Ads",
    href: "/locations/united-states/chicago/ppc-ads",
    desc: "Google Ads, Meta Ads, and LinkedIn Ads management for Chicago companies.",
  },
  {
    title: "Website Development",
    href: "/locations/united-states/chicago/website-development",
    desc: "Custom websites and e-commerce builds for businesses in the Chicago area.",
  },
  {
    title: "SEO Services",
    href: "/locations/united-states/chicago/seo-services",
    desc: "Search engine optimization strategies for Chicago's competitive market.",
  },
];

const reasons = [
  {
    title: "ROI-first approach that matches Midwest values",
    desc: "Chicago businesses don't pay for vanity metrics. Every campaign we run is tied to measurable outcomes — leads generated, pipeline influenced, revenue attributed. That practical accountability is built into how we operate.",
  },
  {
    title: "B2B and manufacturing expertise",
    desc: "Chicago's economy runs on manufacturing, logistics, and professional services. We understand long sales cycles, complex buyer committees, and the type of content that moves industrial procurement decisions forward.",
  },
  {
    title: "Data-driven strategies for a competitive commercial market",
    desc: "With thousands of businesses competing for attention in the third-largest US metro, gut-feel marketing doesn't cut it. We use granular analytics, A/B testing, and attribution modeling to find what actually works in your specific vertical.",
  },
  {
    title: "Cost efficiency of a dedicated remote team",
    desc: "You get senior-level strategists and specialists without Chicago agency overhead. Our remote model means your budget goes toward execution and results, not office space on Michigan Avenue.",
  },
];

const faq = [
  {
    q: "How do you approach B2B marketing for Chicago businesses?",
    a: "We start with your sales cycle and buyer profile. For Chicago B2B companies, that typically means LinkedIn-heavy paid strategies, SEO content targeting commercial search intent, and email nurture sequences built for 3-to-6-month decision timelines. Everything maps back to pipeline metrics, not just clicks.",
  },
  {
    q: "Can you help manufacturers in Chicago with digital marketing?",
    a: "Yes. We work with manufacturing and industrial businesses on SEO for technical product searches, Google Ads campaigns targeting procurement professionals, and content marketing that builds authority with engineers and operations managers who research vendors online before making contact.",
  },
  {
    q: "How does your approach fit the Midwest market specifically?",
    a: "Midwest buyers value directness, reliability, and substance over hype. Our messaging and creative reflect that — clear value propositions, practical case studies, and straightforward calls to action. We avoid the flashy agency playbook that falls flat with pragmatic Midwest decision-makers.",
  },
  {
    q: "You're based remotely — how does that work for Chicago clients?",
    a: "We operate during US business hours and communicate through the same tools your team already uses: Slack, Zoom, email, and shared dashboards. You get dedicated account management, weekly reporting, and the same responsiveness you would expect from a local team — without the local agency price tag.",
  },
];

export default function ChicagoPage() {
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
          { label: "Chicago" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Chicago</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Digital Marketing Agency Serving Businesses in Chicago
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6">
              Chicago is the commercial engine of the Midwest — home to a dense
              concentration of B2B companies, manufacturers, logistics firms, and
              professional services organizations. Competing here requires
              marketing that speaks the language of practical ROI, not empty
              impressions.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4">
              Markit Media serves businesses in Chicago with performance marketing,
              SEO, web development, and full-stack digital strategy. We bring
              senior-level execution without the overhead of a downtown agency.
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
        aria-label="Services for Chicago businesses"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Offer</SectionLabel>
            <SectionTitle>Services for Businesses in Chicago</SectionTitle>
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

      {/* Sub-pages */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Chicago service pages"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Explore</SectionLabel>
            <SectionTitle>Chicago Service Pages</SectionTitle>
          </Animate>
          <Stagger
            stagger={80}
            animation="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          >
            {subPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="block bg-white border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none group"
              >
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black uppercase tracking-wide mb-2 group-hover:underline">
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

      {/* Why Markit Media */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why businesses in Chicago choose Markit Media"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Businesses in Chicago Choose Markit Media
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
              Ready to Grow Your Business in Chicago?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy that delivers measurable
              results in the Midwest&apos;s largest business hub.
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
