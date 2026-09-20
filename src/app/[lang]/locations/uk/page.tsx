import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Digital Marketing in UK",
  description:
    "Full-stack digital marketing services for businesses in the United Kingdom. SEO, PPC, social media, web development, branding, and more.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/locations/uk",
  },
  openGraph: {
    title: "Digital Marketing in UK",
    description: "Full-stack digital marketing services for businesses in the United Kingdom. SEO, PPC, social media, web development, branding, and more.",
  },
};

const services = [
  {
    title: "Performance Marketing",
    desc: "Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads, and PPC campaign management built to drive measurable conversions.",
  },
  {
    title: "SEO",
    desc: "Technical SEO, local SEO, content SEO, link building, and keyword research to strengthen your organic search presence.",
  },
  {
    title: "Social Media Marketing",
    desc: "Strategy, content creation, community management, and paid social campaigns across every major platform.",
  },
  {
    title: "Website Development",
    desc: "WordPress, Shopify, Next.js, custom web applications, landing pages, and e-commerce builds.",
  },
  {
    title: "Branding & Design",
    desc: "Brand strategy, logo design, visual identity systems, brand guidelines, and packaging design.",
  },
  {
    title: "Video Production",
    desc: "Commercial production, editing, motion graphics, short-form content, and animation.",
  },
  {
    title: "Email Marketing",
    desc: "Campaign design, automation sequences, list management, A/B testing, and deliverability optimization.",
  },
  {
    title: "Content Marketing",
    desc: "Content strategy, copywriting, blog writing, whitepapers, case studies, and SEO content production.",
  },
  {
    title: "AI Solutions",
    desc: "AI chatbots, marketing automation, AI consulting, predictive analytics, and workflow optimization.",
  },
];

const highlights = [
  {
    title: "Mature digital economy",
    desc: "The UK has one of the most developed digital economies in Europe. Online advertising, e-commerce, and digital services are deeply integrated into consumer behavior.",
  },
  {
    title: "Strong regulatory environment",
    desc: "UK data protection and advertising standards are strict. Marketing campaigns need to comply with GDPR, ASA guidelines, and other regulations that shape how businesses can reach their audience.",
  },
  {
    title: "Concentrated urban markets",
    desc: "London, Manchester, Birmingham, Edinburgh, and other major cities are dense hubs of commercial activity. Local SEO and geo-targeted advertising are important tools for reaching customers in these markets.",
  },
  {
    title: "Competitive search landscape",
    desc: "UK search results are highly competitive across most industries. Ranking well requires a sustained commitment to technical SEO, quality content, and authoritative link building.",
  },
];

const faq = [
  {
    q: "What digital marketing services do you offer in the UK?",
    a: "We provide the full range: performance marketing (Google Ads, Meta Ads, TikTok Ads), SEO, social media marketing, website development, branding, video production, email marketing, content marketing, and AI solutions.",
  },
  {
    q: "Do you understand UK advertising regulations?",
    a: "Yes. We are familiar with UK-specific requirements including GDPR compliance, ASA advertising standards, and cookie consent regulations. All campaigns are built with these frameworks in mind.",
  },
  {
    q: "Can you target specific UK regions or cities?",
    a: "Absolutely. Whether you need to focus on London, target the North of England, or reach customers across Scotland and Wales, we build geo-targeted strategies that match your commercial footprint.",
  },
  {
    q: "Do you work with UK-based e-commerce businesses?",
    a: "Yes. We work with e-commerce businesses across the UK, covering everything from product feed optimization and shopping ads to SEO and email marketing to drive online sales.",
  },
];

export default function UKPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing in UK",
    description:
      "Full-stack digital marketing services for businesses in the United Kingdom.",
    provider: {
      "@type": "Organization",
      name: "Markit Media",
      url: "https://themarkitmedia.com",
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
  };

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
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "United Kingdom" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Animate animation="fade-up">
              <SectionLabel>United Kingdom</SectionLabel>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
                Digital Marketing in the UK
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mt-6">
                The UK is one of the most competitive and regulated digital
                markets in Europe. We help UK businesses grow through data-driven
                strategy, multi-channel execution, and campaigns built for
                compliance and performance.
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
          <Animate animation="fade-in" delay={200}>
            <img src="/images/locations/uk.svg" alt="Uk digital marketing" className="w-full aspect-[4/3] object-cover" />
          </Animate>
        </div>
      </section>

      {/* Services */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Services available in the UK"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Offer</SectionLabel>
            <SectionTitle>Services Available in This Market</SectionTitle>
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

      {/* Why This Market */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why the UK market"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Market Context</SectionLabel>
            <SectionTitle>What Makes the UK Market Unique</SectionTitle>
          </Animate>
          <ul className="mt-10 space-y-4">
            {highlights.map((item, i) => (
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
              Ready to Grow Your Business in the UK?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy tailored to the British
              market.
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
