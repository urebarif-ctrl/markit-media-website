import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Miami — Markit Media",
  description:
    "Performance marketing, SEO, PPC, and web development for businesses in Miami. Bilingual digital strategies for South Florida's tourism, real estate, and Latin American trade markets.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/miami",
  },
  openGraph: {
    title: "Digital Marketing Agency in Miami — Markit Media",
    description:
      "Performance marketing, SEO, PPC, and web development for businesses in Miami. Bilingual digital strategies for South Florida's tourism, real estate, and Latin American trade markets.",
  },
};

const services = [
  {
    title: "Performance Marketing",
    desc: "Google Ads, Meta Ads, and programmatic campaigns structured for Miami's bilingual audience segments — targeting English and Spanish speakers across tourism, hospitality, and luxury verticals with separate creative and bidding strategies.",
  },
  {
    title: "SEO",
    desc: "Technical optimization, bilingual keyword research, and content strategy built for the search patterns unique to South Florida — where local queries span two languages and competition for real estate, dining, and travel terms is fierce.",
  },
  {
    title: "Social Media Marketing",
    desc: "Platform strategy across Instagram, TikTok, Facebook, and LinkedIn tailored to Miami's visually driven, culturally diverse audience. Content calendars that reflect both the English-speaking and Latin American communities your brand needs to reach.",
  },
  {
    title: "Website Development",
    desc: "WordPress, Shopify, and Next.js builds with bilingual architecture, fast load times for mobile-heavy South Florida traffic, and conversion funnels designed for markets where purchase decisions happen across languages.",
  },
  {
    title: "Branding & Design",
    desc: "Visual identity systems, logo design, and brand guidelines that resonate in a city where aesthetics set the bar. From luxury real estate to nightlife and hospitality, Miami brands need design that matches the market's visual expectations.",
  },
  {
    title: "Video Production",
    desc: "Short-form video for social, promotional content for tourism operators, and branded video campaigns. Miami's lifestyle-driven economy rewards brands that invest in high-quality motion content across Reels, TikTok, and YouTube.",
  },
  {
    title: "Email Marketing",
    desc: "Lifecycle email sequences, promotional campaigns, and automated flows for Miami's seasonal tourism peaks. Bilingual email programs that segment by language preference and buying behavior to maximize engagement and repeat revenue.",
  },
  {
    title: "Content Marketing",
    desc: "Blog content, landing pages, and long-form assets written for the topics Miami businesses need to own — from neighborhood guides and travel content to financial services and international trade resources targeting LATAM audiences.",
  },
  {
    title: "AI Solutions",
    desc: "Chatbot deployments, AI-powered lead qualification, and marketing automation workflows that handle bilingual customer interactions at scale — reducing response times for the high-volume inquiries Miami tourism and real estate businesses generate.",
  },
];

const reasons = [
  {
    title: "Bilingual marketing expertise",
    desc: "Over 70% of Miami-Dade County residents speak Spanish at home. Effective marketing here requires more than translation — it requires culturally adapted messaging, separate creative strategies, and audience segmentation that treats English and Spanish campaigns as distinct efforts with their own performance benchmarks.",
  },
  {
    title: "Tourism and hospitality digital strategy",
    desc: "Miami welcomes over 26 million visitors annually. We build campaigns that capture travel-intent search traffic, run geo-targeted ads to visitors already in South Florida, and create content strategies that convert seasonal tourists into year-round customers for hospitality, dining, and entertainment brands.",
  },
  {
    title: "Real estate marketing in South Florida",
    desc: "Miami's real estate market draws domestic and international buyers competing for luxury condos, waterfront properties, and commercial developments. We run PPC campaigns targeting high-net-worth buyer keywords, build IDX-integrated websites, and execute retargeting sequences that keep listings in front of qualified prospects across both hemispheres.",
  },
  {
    title: "Latin American market gateway",
    desc: "Miami is the primary business hub connecting the United States to Latin America. We help companies position their digital presence to reach LATAM audiences — whether that means Spanish-language Google Ads targeting buyers in Colombia and Brazil, or LinkedIn campaigns aimed at decision-makers across Central and South America.",
  },
];

const faqs = [
  {
    question: "Do you run bilingual marketing campaigns for Miami businesses?",
    answer:
      "Yes. We build separate English and Spanish campaigns with independent creative, keyword sets, and performance tracking. This is not translation — each language version is researched and written for its specific audience, with culturally appropriate messaging and distinct bidding strategies to maximize ROI in both markets.",
  },
  {
    question: "How do you approach tourism marketing for Miami businesses?",
    answer:
      "We target travel-intent keywords and audience segments at each stage of the visitor journey — from trip planning searches to in-destination queries. This includes Google Ads campaigns timed to seasonal peaks, geo-targeted social ads reaching visitors currently in South Florida, and content strategies that rank for the terms tourists actually search when choosing restaurants, hotels, and experiences.",
  },
  {
    question:
      "What does your real estate digital strategy look like in the Miami market?",
    answer:
      "We combine high-intent PPC campaigns on Google and Meta with SEO content targeting neighborhood-specific and property-type keywords. For Miami real estate, this also means international buyer targeting — running ads in Spanish and Portuguese to reach qualified prospects in Latin America, and building landing pages that address the specific concerns of foreign buyers navigating the South Florida market.",
  },
  {
    question:
      "Can you help Miami businesses reach Latin American audiences?",
    answer:
      "Absolutely. Miami's geographic and cultural position makes it the natural base for marketing to LATAM markets. We run Spanish-language paid campaigns on Google, Meta, and LinkedIn targeting specific countries in Central and South America, build multilingual landing pages, and develop content strategies that establish your brand as a credible presence across the region.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Markit Media",
  description:
    "Digital marketing agency serving businesses in Miami with performance marketing, SEO, PPC, web development, and bilingual marketing strategies.",
  areaServed: { "@type": "City", name: "Miami" },
  url: "https://themarkitmedia.com/en/locations/united-states/miami",
};

const subPages = [
  {
    title: "Marketing Agency",
    href: "/locations/united-states/miami/marketing-agency",
    desc: "Full-service marketing strategy and execution for Miami businesses across hospitality, real estate, and LATAM-facing industries.",
  },
  {
    title: "PPC & Paid Ads",
    href: "/locations/united-states/miami/ppc-ads",
    desc: "Google Ads and Meta Ads management built for Miami's bilingual, tourism-driven market.",
  },
  {
    title: "Website Development",
    href: "/locations/united-states/miami/website-development",
    desc: "Custom web development for businesses serving the Miami metro and international audiences.",
  },
  {
    title: "SEO Services",
    href: "/locations/united-states/miami/seo-services",
    desc: "Search engine optimization for competitive Miami keywords in English and Spanish.",
  },
];

export default function MiamiPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
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
          { label: "Miami" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Miami" className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Miami</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              Digital Marketing Agency Serving Businesses in Miami
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Miami sits at the crossroads of the U.S. and Latin American
              economies — a bilingual, tourism-driven market where real estate,
              hospitality, and international trade define the business
              landscape. We help Miami businesses capture demand across both
              languages, both hemispheres, and every digital channel that
              matters in South Florida.
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

      {/* Services Grid */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Digital marketing services for Miami"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Services</SectionLabel>
            <SectionTitle>
              Digital Marketing Services for Miami Businesses
            </SectionTitle>
            <p className="text-base text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Every service is adapted to the realities of the South Florida
              market — bilingual audiences, seasonal tourism cycles, and a
              competitive landscape shaped by international capital and
              cultural diversity.
            </p>
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
        aria-label="Why businesses in Miami choose Markit Media"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Businesses in Miami Choose Markit Media
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
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Frequently asked questions about marketing in Miami"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>
              Common Questions About Marketing in Miami
            </SectionTitle>
          </Animate>
          <div className="mt-10 space-y-4">
            {faqs.map((faq, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <details className="group border border-gray-200 bg-white">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-base font-bold text-black">
                    {faq.question}
                    <span className="ml-4 flex-shrink-0 text-xl leading-none transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-4">
                    <p className="text-base text-gray-500 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-pages */}
      <section className="px-6 lg:px-12 py-20" aria-label="Miami service pages">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Explore</SectionLabel>
            <SectionTitle>Miami Service Pages</SectionTitle>
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
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Grow Your Business in Miami?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s discuss how bilingual, data-driven marketing can
              help your brand compete in South Florida&apos;s most dynamic
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
