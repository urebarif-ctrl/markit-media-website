import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Locations — Markets We Serve",
  description: "Markit Media serves clients across the USA, Canada, UAE, UK, Australia, and Saudi Arabia with full-stack digital marketing services.",
  alternates: { canonical: "https://themarkitmedia.com/en/locations" },
};

const locations = [
  {
    country: "United States",
    flag: "🇺🇸",
    description: "Full-stack digital marketing for US businesses, from startups to enterprise. We help American companies compete online with performance marketing, SEO, and brand building.",
    highlights: ["Google Ads management", "Local SEO for multi-location", "Enterprise content marketing"],
    href: "/locations/united-states",
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    description: "Digital marketing and web development for Canadian businesses. We understand the bilingual landscape and unique market dynamics of the Canadian market.",
    highlights: ["Bilingual campaigns (EN/FR)", "E-commerce growth", "Social media management"],
    href: "/locations/canada",
  },
  {
    country: "United Arab Emirates",
    flag: "🇦🇪",
    description: "Performance marketing, SEO, and branding for UAE businesses. From Dubai to Abu Dhabi, we help brands grow in one of the world's most dynamic markets.",
    highlights: ["Arabic + English campaigns", "Luxury brand marketing", "Real estate lead generation"],
    href: "/locations/uae",
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    description: "Digital marketing tailored for the UK market. We help British businesses build visibility and drive qualified leads across every digital channel.",
    highlights: ["PPC and paid social", "Technical SEO", "Branding and design"],
    href: "/locations/uk",
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    description: "Data-driven digital marketing for Australian businesses. From Sydney to Melbourne, we deliver campaigns that perform in the competitive APAC market.",
    highlights: ["Search marketing", "Social media strategy", "Website development"],
    href: "/locations/australia",
  },
  {
    country: "Saudi Arabia",
    flag: "🇸🇦",
    description: "Digital marketing and e-commerce services for the growing Saudi market. We help brands navigate the KSA digital landscape aligned with Vision 2030.",
    highlights: ["Arabic content marketing", "E-commerce optimization", "Social media for KSA audiences"],
    href: "/locations/saudi-arabia",
  },
];

export default function LocationsPage() {
  const locationsSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Markit Media",
    areaServed: locations.map((l) => ({
      "@type": "Country",
      name: l.country,
    })),
  };

  return (
    <article>
      <JsonLd data={locationsSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Locations" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Global Reach</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing That Works in Your Market
            </h1>
            <SectionDesc>
              Digital marketing isn&apos;t one-size-fits-all. Every market has unique audience behaviors, platform preferences, and competitive dynamics. We tailor our strategies to where your customers are.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Our markets">
        <div className="max-w-7xl mx-auto">
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <Link key={loc.href} href={loc.href} className="group bg-white border border-gray-200 hover:border-black/30 hover:shadow-lg transition-all duration-300 motion-reduce:transition-none overflow-hidden focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <div className="aspect-[3/1] bg-gray-50 overflow-hidden">
                  <img src={`/images/locations/${loc.href.split('/').pop()}.svg`} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8">
                <div className="text-4xl mb-4" aria-hidden="true">{loc.flag}</div>
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-3">
                  {loc.country}
                </h2>
                <p className="text-base text-gray-500 leading-relaxed mb-4">{loc.description}</p>
                <ul className="space-y-1">
                  {loc.highlights.map((h) => (
                    <li key={h} className="text-base text-gray-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-black rounded-full flex-shrink-0" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
                </div>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Why global clients choose us">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Us</SectionLabel>
            <SectionTitle>Why Global Clients Choose Markit Media</SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { title: "Cross-Market Experience", desc: "We understand how digital marketing differs between markets. What works in the US may not work in the UAE, and we plan accordingly." },
              { title: "Multi-Language Capability", desc: "We create campaigns in English, Arabic, and Urdu, with native-speaking specialists who understand cultural nuance." },
              { title: "Single Point of Contact", desc: "One team manages all your markets. No fragmented vendor relationships, no conflicting strategies." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">{item.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Grow in Your Market?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Contact us for a consultation tailored to your region and goals.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none">
              Get Started &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
