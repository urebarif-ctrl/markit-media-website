import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "SEO Services in Seattle — Markit Media",
  description:
    "SEO agency for Seattle businesses. Technical SEO, local SEO, and content strategy for cloud technology, aerospace, clean energy, gaming, and Pacific Northwest enterprises.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/seattle/seo-services",
  },
  openGraph: {
    title: "SEO Services in Seattle — Markit Media",
    description:
      "SEO agency for Seattle businesses. Technical SEO, local SEO, and content strategy for cloud technology, aerospace, clean energy, gaming, and Pacific Northwest enterprises.",
  },
};

const serviceItems = [
  {
    title: "Technical SEO",
    desc: "Site architecture audits, Core Web Vitals optimization, crawlability fixes, and structured data implementation — built for Seattle’s tech-forward businesses where site performance directly impacts rankings and the technically literate audience notices when things are slow.",
  },
  {
    title: "Local SEO",
    desc: "Google Business Profile optimization, local citation building, and geo-targeted content strategy for Seattle businesses that depend on visibility across the metro — from downtown Seattle and Capitol Hill to Bellevue, Redmond, and the broader Eastside.",
  },
  {
    title: "Content Strategy & Production",
    desc: "Keyword research, topic clustering, and long-form content production designed to capture organic demand in Seattle’s competitive industries — cloud services, aerospace, biotech, and professional services — where authoritative content drives qualified traffic.",
  },
  {
    title: "On-Page Optimization",
    desc: "Title tags, meta descriptions, heading structure, internal linking, and content refinement across your existing pages — extracting more organic traffic from content you already have before investing in new production.",
  },
  {
    title: "Link Building & Digital PR",
    desc: "Earned backlinks through original research, data-driven content, and strategic outreach to Pacific Northwest publications, industry outlets, and technology media — building domain authority that compounds organic visibility over time.",
  },
  {
    title: "SEO Analytics & Reporting",
    desc: "Monthly reporting on keyword rankings, organic traffic, conversion rates, and revenue attribution — structured so Seattle businesses can see exactly how organic search contributes to pipeline and make informed decisions about where to invest next.",
  },
];

const reasons = [
  {
    title: "Built for Seattle’s digitally competitive landscape",
    desc: "Seattle is one of the most digitally competitive markets in the country. Tech companies, SaaS vendors, and well-funded startups all invest heavily in organic search. Ranking here requires technical precision, high-quality content, and a sustained strategy — not shortcuts that work in less competitive metros.",
  },
  {
    title: "Technical SEO expertise for tech-forward businesses",
    desc: "Seattle’s businesses operate on modern tech stacks — headless CMS platforms, single-page applications, and complex site architectures. We bring the technical SEO expertise required to ensure these sites are crawlable, indexable, and optimized for the way search engines actually process modern web applications.",
  },
  {
    title: "Local and national SEO under one strategy",
    desc: "Many Seattle businesses need both local visibility across the Puget Sound region and national or international organic reach. We build SEO strategies that serve both goals without diluting either — optimizing for local intent while building topical authority that ranks nationally.",
  },
  {
    title: "Results measured in traffic that converts",
    desc: "We track organic traffic through to lead generation and revenue, not just keyword positions. Seattle businesses expect data-driven accountability, and we structure SEO reporting to show the business impact of every ranking improvement.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "SEO Audit & Competitive Analysis",
    desc: "We conduct a comprehensive technical audit of your site and analyze your organic competitors in the Seattle market — identifying gaps in site structure, content coverage, and backlink profile that represent the highest-impact opportunities.",
  },
  {
    step: "02",
    title: "Strategy & Keyword Mapping",
    desc: "We build a prioritized SEO roadmap with keyword targets mapped to pages, content gaps identified, and technical fixes sequenced by impact — designed around the specific competitive dynamics of your industry in the Seattle metro.",
  },
  {
    step: "03",
    title: "Execution & Content Production",
    desc: "Our team implements technical fixes, optimizes existing pages, and produces new content targeting high-value keywords — all coordinated under a single strategy that builds topical authority in your Seattle market vertical.",
  },
  {
    step: "04",
    title: "Monitoring & Iteration",
    desc: "We track rankings, traffic, and conversions continuously — adjusting strategy based on algorithm updates, competitor movements, and performance data to maintain and expand organic visibility in Seattle’s evolving search landscape.",
  },
];

export default function SeattleSeoServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "SEO agency for Seattle businesses. Technical SEO, local SEO, and content strategy for cloud technology, aerospace, clean energy, and Pacific Northwest enterprises.",
    areaServed: { "@type": "City", name: "Seattle" },
    url: "https://themarkitmedia.com/en/locations/united-states/seattle/seo-services",
  };

  return (
    <article>
      <JsonLd data={schema} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How long does SEO take to show results in a competitive market like Seattle?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "In Seattle's competitive landscape, most businesses begin seeing meaningful improvements in organic traffic and keyword rankings within three to six months. The timeline depends on your starting position, the competitiveness of your target keywords, and the strength of your existing domain authority. Technical fixes and on-page optimization can produce quicker wins, while content-driven authority building compounds over a longer horizon.",
                },
              },
              {
                "@type": "Question",
                name: "Do you offer local SEO for Seattle businesses?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Our local SEO services include Google Business Profile optimization, local citation building, geo-targeted content strategy, and review management. We optimize for visibility across the Seattle metro — including downtown, Capitol Hill, South Lake Union, Bellevue, Redmond, and the broader Eastside — so your business appears when local customers search for your services.",
                },
              },
              {
                "@type": "Question",
                name: "How is SEO for Seattle tech companies different from other industries?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Seattle tech companies often run on modern web stacks — headless CMS platforms, single-page applications, and complex JavaScript frameworks — that create unique crawlability and indexing challenges. Their audiences are also highly technical and expect authoritative, in-depth content. SEO for this segment requires both deep technical expertise and the ability to produce content that meets the knowledge standards of engineers, developers, and technical decision-makers.",
                },
              },
              {
                "@type": "Question",
                name: "Can SEO and PPC work together for Seattle businesses?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, and they should. PPC captures immediate demand while SEO builds long-term organic visibility. Running both together allows Seattle businesses to dominate search results for high-value keywords, use PPC data to inform SEO content priorities, and reduce overall cost per acquisition as organic rankings mature and paid spend can be reallocated to new opportunities.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "United States", href: "/locations/united-states" },
          { label: "Seattle", href: "/locations/united-states/seattle" },
          { label: "SEO Services" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Seattle" className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Seattle</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              SEO Services for Seattle Businesses
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Seattle is one of the most digitally competitive cities in the
              United States &mdash; home to major tech companies, well-funded
              startups, and established enterprises that all invest heavily
              in organic search. Ranking here requires more than basic
              optimization. It demands technical precision, high-quality
              content, and a sustained strategy built for a market where
              your competitors employ some of the best engineers and
              marketers in the country.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media delivers technical SEO, local SEO, and content
              strategy for Seattle businesses &mdash; built to drive organic
              traffic that converts into pipeline and revenue.
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
        aria-label="SEO services for Seattle businesses"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>SEO Services for Seattle</SectionTitle>
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

      {/* Why Markit Media */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why Seattle businesses choose Markit Media for SEO"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Seattle Businesses Choose Markit Media for SEO
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
        aria-label="Our SEO process"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Process</SectionLabel>
            <SectionTitle>How We Run SEO for Seattle Clients</SectionTitle>
          </Animate>
          <div className="mt-12 space-y-8">
            {processSteps.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 80}>
                <div className="flex items-start gap-6">
                  <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black flex-shrink-0 w-12">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black">
                      {item.title}
                    </h3>
                    <p className="text-base text-gray-500 leading-relaxed mt-2">
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
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Related services"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Explore More</SectionLabel>
            <SectionTitle>Related Services</SectionTitle>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          >
            <Link
              href="/locations/united-states/seattle/marketing-agency"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Marketing Agency
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Full-service marketing strategy and execution for Seattle.
              </p>
            </Link>
            <Link
              href="/locations/united-states/seattle/ppc-ads"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                PPC Ads
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Paid media campaigns built for measurable ROI in Seattle.
              </p>
            </Link>
            <Link
              href="/locations/united-states/seattle/website-development"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Website Development
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Fast, conversion-focused websites for Seattle businesses.
              </p>
            </Link>
            <Link
              href="/services/branding"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Branding
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Visual identity and brand strategy for competitive markets.
              </p>
            </Link>
          </Stagger>
          <Animate animation="fade-up" delay={200}>
            <div className="mt-8">
              <Link
                href="/locations/united-states/seattle"
                className="text-base font-bold text-black underline underline-offset-4 hover:text-gray-600 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                View all Seattle services &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* FAQ */}
      <section aria-label="Frequently Asked Questions" className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">How long does SEO take to show results in a competitive market like Seattle?</h3>
              <p className="text-base text-neutral-600">In Seattle&apos;s competitive landscape, most businesses begin seeing meaningful improvements in organic traffic and keyword rankings within three to six months. The timeline depends on your starting position, the competitiveness of your target keywords, and the strength of your existing domain authority. Technical fixes and on-page optimization can produce quicker wins, while content-driven authority building compounds over a longer horizon.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Do you offer local SEO for Seattle businesses?</h3>
              <p className="text-base text-neutral-600">Yes. Our local SEO services include Google Business Profile optimization, local citation building, geo-targeted content strategy, and review management. We optimize for visibility across the Seattle metro &mdash; including downtown, Capitol Hill, South Lake Union, Bellevue, Redmond, and the broader Eastside &mdash; so your business appears when local customers search for your services.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">How is SEO for Seattle tech companies different from other industries?</h3>
              <p className="text-base text-neutral-600">Seattle tech companies often run on modern web stacks &mdash; headless CMS platforms, single-page applications, and complex JavaScript frameworks &mdash; that create unique crawlability and indexing challenges. Their audiences are also highly technical and expect authoritative, in-depth content. SEO for this segment requires both deep technical expertise and the ability to produce content that meets the knowledge standards of engineers, developers, and technical decision-makers.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Can SEO and PPC work together for Seattle businesses?</h3>
              <p className="text-base text-neutral-600">Yes, and they should. PPC captures immediate demand while SEO builds long-term organic visibility. Running both together allows Seattle businesses to dominate search results for high-value keywords, use PPC data to inform SEO content priorities, and reduce overall cost per acquisition as organic rankings mature and paid spend can be reallocated to new opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Rank in Seattle?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build an SEO strategy that drives organic traffic and
              revenue in the Pacific Northwest&apos;s most competitive search
              landscape.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
