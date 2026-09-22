import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Marketing Agency in Miami — Markit Media",
  description:
    "Full-service marketing agency for businesses in Miami. Bilingual campaign execution, hospitality marketing, real estate lead generation, and LATAM audience strategies for South Florida's tourism-driven market.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/miami/marketing-agency",
  },
  openGraph: {
    title: "Marketing Agency in Miami — Markit Media",
    description:
      "Full-service marketing agency for businesses in Miami. Bilingual campaigns, hospitality marketing, real estate lead gen, and LATAM audience strategies.",
  },
};

const serviceItems = [
  {
    title: "Marketing Strategy",
    desc: "Market positioning, channel selection, and campaign planning built for Miami's bilingual consumer base. We develop strategies that account for English and Spanish audience segments, seasonal tourism cycles, and the competitive dynamics of South Florida's key industries.",
  },
  {
    title: "Paid Media Management",
    desc: "Google Ads, Meta Ads, and programmatic campaigns structured for Miami's dual-language market. Separate ad sets for English and Spanish audiences, geo-targeting for tourist-heavy areas like South Beach and Brickell, and budget pacing aligned to seasonal demand peaks.",
  },
  {
    title: "Search Engine Optimization",
    desc: "Technical SEO, bilingual keyword research, and content strategy designed for the search patterns unique to Miami-Dade County — where local queries happen in two languages and competition for real estate, dining, and hospitality terms is among the highest in the U.S.",
  },
  {
    title: "Social Media Marketing",
    desc: "Platform strategy across Instagram, TikTok, Facebook, and LinkedIn for Miami's visually driven, culturally diverse audience. Content calendars that speak to both English and Spanish-speaking communities with creative that reflects the city's lifestyle-forward identity.",
  },
  {
    title: "Web Design & Development",
    desc: "WordPress, Shopify, and Next.js builds with bilingual architecture, mobile-first performance for South Florida's smartphone-heavy traffic, and conversion funnels designed for markets where buyers research and purchase across two languages.",
  },
  {
    title: "Analytics & Reporting",
    desc: "Tracking, attribution, and reporting that segments performance by language, geography, and season. We set up dashboards that show which campaigns drive revenue from local residents versus tourists, and how bilingual audiences convert differently across channels.",
  },
];

const reasons = [
  {
    title: "Bilingual campaign execution",
    desc: "Over 70% of Miami-Dade County residents speak Spanish at home. We build English and Spanish campaigns as separate efforts — each with its own keyword research, creative direction, and performance benchmarks — because translation is not a marketing strategy.",
  },
  {
    title: "Tourism and hospitality marketing",
    desc: "Miami welcomes over 26 million visitors annually. We structure campaigns to capture travel-intent search traffic, run geo-targeted ads to visitors already in South Florida, and build content strategies that convert seasonal tourists into repeat customers for hospitality, dining, and entertainment businesses.",
  },
  {
    title: "Real estate lead generation",
    desc: "Miami's real estate market attracts domestic and international buyers competing for luxury condos, waterfront properties, and commercial developments. We run high-intent PPC campaigns, build IDX-integrated websites, and execute retargeting sequences that keep listings visible to qualified prospects.",
  },
  {
    title: "Latin American market gateway",
    desc: "Miami is the primary business hub connecting the U.S. to Latin America. We help companies reach LATAM audiences through Spanish-language paid media, LinkedIn campaigns targeting regional decision-makers, and content strategies that establish credibility across Central and South American markets.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Market Analysis",
    desc: "We audit your current marketing, competitive landscape, and audience data. For Miami businesses, this includes analyzing bilingual search behavior, seasonal traffic patterns, and which channels your competitors are winning on in the South Florida market.",
  },
  {
    step: "02",
    title: "Strategy & Channel Planning",
    desc: "Based on the audit, we build a channel-by-channel roadmap with clear priorities, timelines, and KPIs. Every recommendation addresses the specific realities of marketing in Miami — language segmentation, tourism seasonality, and the competitive pressure of a market shaped by international capital.",
  },
  {
    step: "03",
    title: "Execution & Optimization",
    desc: "Campaigns launch across your selected channels with bilingual creative, proper audience segmentation, and tracking in place from day one. We optimize weekly based on performance data — adjusting spend, creative, and targeting as the market responds.",
  },
  {
    step: "04",
    title: "Reporting & Iteration",
    desc: "Monthly reports cover what moved, what didn't, and what we're changing next. Performance is broken out by language, channel, and campaign type so you can see exactly where your marketing dollars are generating returns in the Miami market.",
  },
];

const faqs = [
  {
    q: "Do you build bilingual marketing campaigns for Miami businesses?",
    a: "Yes. We run English and Spanish campaigns as separate efforts, each with its own keyword research, creative direction, and messaging — not a single campaign translated after the fact.",
  },
  {
    q: "Do you work with hospitality and tourism brands in Miami?",
    a: "Yes. We build campaigns that capture travel-intent search traffic, target visitors already in South Florida, and turn seasonal tourists into repeat customers for hotels, restaurants, and entertainment businesses.",
  },
  {
    q: "Can you market luxury real estate and South Beach lifestyle brands?",
    a: "Yes. We run PPC campaigns for high-intent buyers, build IDX-integrated websites, and develop retargeting sequences for the long consideration cycles typical of luxury condo and waterfront property sales, along with brand strategy for South Beach lifestyle businesses.",
  },
  {
    q: "Can you help my business use Miami as a gateway to Latin America?",
    a: "Yes. Miami is the primary U.S. hub for Latin American trade. We build Spanish-language paid media, LinkedIn campaigns targeting regional decision-makers, and content strategies aimed at establishing credibility across Central and South American markets.",
  },
];

export default function MiamiMarketingAgencyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "Full-service marketing agency serving businesses in Miami. Bilingual campaign execution, paid media, SEO, social media, web development, and LATAM audience strategies.",
    areaServed: { "@type": "City", name: "Miami" },
    url: "https://themarkitmedia.com/en/locations/united-states/miami/marketing-agency",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
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
          {
            label: "Miami",
            href: "/locations/united-states/miami",
          },
          { label: "Marketing Agency" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Miami</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              Marketing Agency Serving Businesses in Miami
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Miami is a bilingual, tourism-driven market where hospitality,
              real estate, and international trade shape the business
              landscape. Marketing here requires more than a standard
              playbook — it requires campaigns that work in two languages,
              adapt to seasonal demand, and reach audiences on both sides of
              the hemisphere.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              We help Miami businesses build marketing programs that match the
              complexity of the South Florida market — from bilingual paid
              media and SEO to content strategies that position your brand as
              the go-to choice for local residents, seasonal visitors, and
              Latin American buyers alike.
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

      {/* Service Details */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Marketing services for Miami"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>
              Full-Service Marketing for the Miami Market
            </SectionTitle>
            <p className="text-base text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Every engagement is adapted to the realities of South Florida —
              bilingual audiences, seasonal tourism peaks, and a competitive
              landscape shaped by international capital and cultural diversity.
              Each service runs independently or as part of an integrated
              program.
            </p>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {serviceItems.map((svc) => (
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

      {/* Why Miami Businesses Choose Markit Media */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why Miami businesses choose Markit Media"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Miami Businesses Choose Markit Media for Marketing
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

      {/* Process */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Our process"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Process</SectionLabel>
            <SectionTitle>
              How We Work with Miami Businesses
            </SectionTitle>
          </Animate>
          <div className="mt-10 space-y-8">
            {processSteps.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 80}>
                <div className="flex items-start gap-5">
                  <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black flex-shrink-0 w-12">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black">
                      {item.title}
                    </h3>
                    <p className="text-base text-gray-500 leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="px-6 lg:px-12 py-20" aria-label="Related services">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Explore More</SectionLabel>
            <SectionTitle>Related Services</SectionTitle>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10"
          >
            <Link
              href="/services/performance-marketing"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <span className="text-base font-bold text-black">
                Performance Marketing
              </span>
              <p className="text-base text-gray-500 mt-1">
                Paid campaigns across Google, Meta, and more.
              </p>
            </Link>
            <Link
              href="/services/seo"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <span className="text-base font-bold text-black">SEO</span>
              <p className="text-base text-gray-500 mt-1">
                Organic search strategy and execution.
              </p>
            </Link>
            <Link
              href="/services/social-media"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <span className="text-base font-bold text-black">
                Social Media
              </span>
              <p className="text-base text-gray-500 mt-1">
                Content, community, and paid social campaigns.
              </p>
            </Link>
            <Link
              href="/services/branding"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <span className="text-base font-bold text-black">Branding</span>
              <p className="text-base text-gray-500 mt-1">
                Identity, design systems, and brand strategy.
              </p>
            </Link>
          </Stagger>
          <Animate animation="fade-up" delay={300}>
            <div className="mt-6">
              <Link
                href="/locations/united-states/miami"
                className="text-base font-bold text-black underline underline-offset-4 hover:text-gray-600 transition-colors"
              >
                View all Miami services &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-12 py-20" aria-label="Frequently asked questions">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Frequently Asked Questions About Marketing in Miami</SectionTitle>
          </Animate>
          <div className="mt-10 space-y-6">
            {faqs.map((faq, i) => (
              <Animate key={i} animation="fade-up" delay={i * 60}>
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black">{faq.q}</h3>
                  <p className="text-base text-gray-500 leading-relaxed mt-2">{faq.a}</p>
                </div>
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
              Ready to Compete in Miami?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s discuss how bilingual, data-driven marketing can help
              your brand win in South Florida&apos;s most competitive market.
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
