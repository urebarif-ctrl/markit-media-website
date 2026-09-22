import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Digital Marketing in Canada",
  description:
    "Full-stack digital marketing services for Canadian businesses. SEO, PPC, social media, web development, branding, and more.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/locations/canada",
  },
  openGraph: {
    title: "Digital Marketing in Canada",
    description: "Full-stack digital marketing services for Canadian businesses. SEO, PPC, social media, web development, branding, and more.",
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
    title: "Bilingual market",
    desc: "Canada operates in both English and French. Marketing campaigns that account for linguistic and cultural differences between provinces reach more of the market effectively.",
  },
  {
    title: "High digital adoption",
    desc: "Canadians are among the most connected populations globally. High internet and smartphone penetration mean strong potential across search, social, and e-commerce channels.",
  },
  {
    title: "Proximity to the US market",
    desc: "Many Canadian businesses serve both domestic and cross-border customers. Marketing strategies often need to work across both markets while respecting differences in currency, regulations, and consumer expectations.",
  },
  {
    title: "Regional diversity",
    desc: "Marketing in Toronto differs from marketing in Vancouver or Montreal. Local search behavior, competition levels, and audience preferences vary significantly by province and city.",
  },
];

const faq = [
  {
    q: "What digital marketing services do you offer in Canada?",
    a: "We provide the full range: performance marketing (Google Ads, Meta Ads, TikTok Ads), SEO, social media marketing, website development, branding, video production, email marketing, content marketing, and AI solutions.",
  },
  {
    q: "Do you support bilingual (English and French) campaigns?",
    a: "Yes. We can develop campaigns that work across both English and French-speaking audiences, ensuring your messaging is appropriate for each market segment.",
  },
  {
    q: "Can you help Canadian businesses that also target the US?",
    a: "Absolutely. Many of our Canadian clients serve cross-border audiences. We tailor campaigns to address differences in search behavior, ad platforms, and consumer expectations between the two markets.",
  },
];

export default function CanadaPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing in Canada",
    description:
      "Full-stack digital marketing services for Canadian businesses.",
    provider: {
      "@type": "Organization",
      name: "Markit Media",
      url: "https://themarkitmedia.com",
    },
    areaServed: {
      "@type": "Country",
      name: "Canada",
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
          { label: "Canada" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Animate animation="fade-up">
              <SectionLabel>Canada</SectionLabel>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
                Digital Marketing in Canada
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mt-6">
                Canada is a digitally mature market with a bilingual population and
                strong e-commerce growth. We help Canadian businesses build
                visibility, drive traffic, and convert customers across every
                digital channel.
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
            <img src="/images/locations/canada.svg" alt="Canada digital marketing" className="w-full aspect-[4/3] object-cover" />
          </Animate>
        </div>
      </section>

      {/* Services */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Services available in Canada"
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
        aria-label="Why the Canadian market"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Market Context</SectionLabel>
            <SectionTitle>What Makes the Canadian Market Unique</SectionTitle>
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
              Ready to Grow Your Business in Canada?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy tailored to the Canadian
              market.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
