import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Armchair,
  Camera,
  Mail,
  MousePointerClick,
  PanelsTopLeft,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

const LEGACY_URL =
  "https://themarkitmedia.com/home-decor-interior-design-online-digital-marketing-agency";

export const metadata: Metadata = {
  title: "Home Decor & Interior Design Online Digital Marketing Agency",
  description:
    "Digital marketing for interior designers, home decor stores, furniture brands and renovation firms. SEO, social media, paid ads, websites, email and lead generation.",
  alternates: { canonical: LEGACY_URL },
  openGraph: {
    title: "Home Decor & Interior Design Online Digital Marketing Agency",
    description:
      "Marketing for interior designers, home decor brands, furniture businesses and renovation firms across search, social, paid media, web and email.",
    url: LEGACY_URL,
    type: "website",
  },
};

const services: { icon: LucideIcon; title: string; desc: string; href: string }[] = [
  {
    icon: Camera,
    title: "Social Content That Sells the Aesthetic",
    desc: "Creative direction, reels, carousels and campaign content designed around rooms, products, materials, palettes and finished spaces.",
    href: "/services/social-media",
  },
  {
    icon: Sparkles,
    title: "Instagram and Pinterest Strategy",
    desc: "Content planning for highly visual discovery channels, with an emphasis on saves, shares, product discovery, enquiries and showroom or consultation intent.",
    href: "/services/social-media",
  },
  {
    icon: PanelsTopLeft,
    title: "Websites, Lookbooks and Digital Showrooms",
    desc: "Fast, visual websites that present portfolios, collections, mood boards, projects and products while making the next step clear for visitors.",
    href: "/services/website-development",
  },
  {
    icon: Search,
    title: "SEO for Interior and Home Brands",
    desc: "Search strategies built around services, styles, products, locations and the questions homeowners ask while researching a project or purchase.",
    href: "/services/seo",
  },
  {
    icon: MousePointerClick,
    title: "Google, Meta and Pinterest Ads",
    desc: "Paid campaigns for consultation enquiries, store traffic, e-commerce sales, launches and retargeting, supported by relevant creative and landing pages.",
    href: "/services/performance-marketing",
  },
  {
    icon: Mail,
    title: "Email Marketing and Seasonal Campaigns",
    desc: "Campaigns for launches, collections, seasonal promotions, inspiration content, abandoned interest and customer reactivation.",
    href: "/services/email-marketing",
  },
  {
    icon: Users,
    title: "Influencer and Creator Collaborations",
    desc: "Creator partnerships that place products and spaces into real lifestyle contexts and generate reusable content for organic and paid campaigns.",
    href: "/services/public-relations",
  },
  {
    icon: Armchair,
    title: "Consultation and Lead Generation Funnels",
    desc: "Landing pages and conversion paths designed to turn inspiration into booked consultations, showroom visits, quote requests or product sales.",
    href: "/services/digital-marketing",
  },
];

const audiences = [
  "Interior design studios",
  "Home decor stores",
  "Furniture brands",
  "Kitchen and wardrobe businesses",
  "Lighting and accessories brands",
  "Architects and design practices",
  "Renovation and remodeling firms",
  "Home furnishing e-commerce stores",
];

const process = [
  {
    title: "Define the visual buying journey",
    desc: "We map how your audience discovers ideas, compares styles, saves inspiration and eventually books, visits or buys.",
  },
  {
    title: "Build channel roles",
    desc: "Search captures intent, social creates discovery, paid media accelerates reach, and your website turns interest into action.",
  },
  {
    title: "Create around real customer questions",
    desc: "Content is organized around spaces, styles, materials, budgets, locations, products and project outcomes rather than generic marketing filler.",
  },
  {
    title: "Measure the business action",
    desc: "We focus reporting on enquiries, booked consultations, qualified leads, store visits, product sales and other actions that matter to the business.",
  },
];

const faq = [
  {
    q: "What marketing channels work best for interior designers?",
    a: "Search, Instagram, Pinterest and a strong portfolio website are usually the core channels. The exact mix depends on whether the goal is consultation leads, project enquiries, showroom traffic or product sales.",
  },
  {
    q: "Can you market both interior design services and home decor products?",
    a: "Yes. Service businesses need enquiry and consultation funnels, while product brands need merchandising, e-commerce and retention. The strategy changes based on the business model and customer journey.",
  },
  {
    q: "Do you provide SEO for local interior designers?",
    a: "Yes. Local SEO can include service pages, location relevance, Google Business Profile support, portfolio content, technical SEO and search focused content built around the services people are actively looking for.",
  },
  {
    q: "Can you run Meta and Google Ads for furniture and decor brands?",
    a: "Yes. Campaigns can be structured around lead generation, product sales, launches, seasonal demand, remarketing and location based showroom activity.",
  },
  {
    q: "Can you improve our website as part of the marketing work?",
    a: "Yes. We can improve landing pages, portfolio presentation, mobile experience, speed, lead capture and e-commerce journeys so traffic has a stronger path to conversion.",
  },
];

export default function InteriorDesignMarketingPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Home Decor & Interior Design Online Digital Marketing",
    url: LEGACY_URL,
    description:
      "Digital marketing services for interior designers, home decor stores, furniture brands, architects and renovation firms.",
    provider: {
      "@type": "Organization",
      name: "Markit Media",
      url: "https://themarkitmedia.com",
    },
    areaServed: [
      "United States",
      "Canada",
      "United Arab Emirates",
      "United Kingdom",
      "Australia",
      "Saudi Arabia",
    ],
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
          { label: "Industries", href: "/industries" },
          { label: "Home Decor & Interior Design" },
        ]}
      />

      <section className="px-6 lg:px-12 pt-24 pb-16 overflow-hidden" aria-label="Page header">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_.95fr] gap-12 lg:gap-16 items-center">
          <div>
            <Animate animation="fade-up">
              <SectionLabel>Home Decor & Interior Design Marketing</SectionLabel>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.35rem,5.7vw,4.8rem)] font-extrabold tracking-tight leading-[1.03] mt-3">
                Where Aesthetic Meets Algorithm
              </h1>
              <p className="text-lg md:text-xl text-gray-500 leading-relaxed mt-6 max-w-2xl">
                We help interior designers, home decor stores, furniture brands and renovation businesses turn visual inspiration into search visibility, qualified enquiries, showroom traffic and online sales.
              </p>
            </Animate>

            <Animate animation="fade-up" delay={150}>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="/get-a-quote" className="bg-black text-white px-7 py-4 font-bold hover:bg-gray-800 transition-colors">
                  Discuss Your Growth Plan
                </Link>
                <Link href="/services/digital-marketing" className="border border-gray-300 px-7 py-4 font-bold hover:border-black transition-colors">
                  Explore Digital Marketing
                </Link>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={220}>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm font-semibold text-gray-500">
                <span>Interior studios</span>
                <span>Furniture</span>
                <span>Home decor</span>
                <span>Renovation</span>
                <span>E-commerce</span>
              </div>
            </Animate>
          </div>

          <Animate animation="fade-in" delay={120}>
            <div className="relative min-h-[420px] md:min-h-[500px] bg-[#ece8e1] overflow-hidden">
              <div className="absolute inset-5 md:inset-8 grid grid-cols-2 grid-rows-2 gap-4">
                <div className="bg-[#c8b39f] rounded-[38%_10%_10%_10%] p-6 flex items-end">
                  <span className="text-sm font-bold text-black/70">Visual storytelling</span>
                </div>
                <div className="bg-[#20201e] text-white p-6 flex flex-col justify-between">
                  <Armchair size={34} />
                  <span className="font-extrabold text-xl">Spaces that inspire action</span>
                </div>
                <div className="bg-white p-6 flex flex-col justify-between border border-black/5">
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">Search</span>
                  <div>
                    <div className="text-3xl font-extrabold">Intent</div>
                    <p className="text-sm text-gray-500 mt-1">Be present when customers start researching.</p>
                  </div>
                </div>
                <div className="bg-[#a88b73] rounded-[10%_10%_38%_10%] p-6 flex items-end justify-end">
                  <Sparkles size={34} className="text-white" />
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Marketing services">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>How We Help</SectionLabel>
            <SectionTitle>Marketing Built for Visual Buying Journeys</SectionTitle>
            <SectionDesc>
              People rarely buy a room, product or design service after one interaction. We connect discovery, inspiration, research and conversion across the channels that shape the decision.
            </SectionDesc>
          </Animate>

          <Stagger stagger={55} animation="fade-up" className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.title} href={service.href} className="group bg-white border border-gray-200 p-6 hover:border-black hover:shadow-lg transition-all">
                  <div className="w-11 h-11 bg-black text-white flex items-center justify-center mb-5">
                    <Icon size={21} />
                  </div>
                  <h2 className="text-base font-extrabold leading-snug">{service.title}</h2>
                  <p className="text-sm text-gray-500 leading-relaxed mt-3">{service.desc}</p>
                  <span className="inline-block mt-5 text-sm font-bold group-hover:underline">Explore service →</span>
                </Link>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="Businesses we work with">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
          <Animate animation="fade-up">
            <SectionLabel>Who This Is For</SectionLabel>
            <SectionTitle>Built for Businesses That Sell Style, Space and Transformation</SectionTitle>
            <SectionDesc>
              The strategy changes depending on whether your customer books a consultation, visits a showroom, requests a quote or buys directly online.
            </SectionDesc>
          </Animate>

          <Stagger stagger={45} animation="fade-up" className="grid sm:grid-cols-2 gap-3">
            {audiences.map((item) => (
              <div key={item} className="border border-gray-200 p-5 font-bold bg-white">
                {item}
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white" aria-label="Our approach">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Approach</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-tight mt-3 max-w-3xl">
              Beautiful marketing is useful only when it moves the customer forward.
            </h2>
          </Animate>
          <Stagger stagger={65} animation="fade-up" className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {process.map((item, index) => (
              <div key={item.title} className="border border-white/15 p-6">
                <div className="text-sm font-bold text-white/40">{String(index + 1).padStart(2, "0")}</div>
                <h3 className="text-lg font-extrabold mt-8">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed mt-3">{item.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="SEO continuity">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Search Strategy</SectionLabel>
            <SectionTitle>Built Around How Interior Customers Search and Decide</SectionTitle>
            <SectionDesc>
              People search by room, style, product, service, location and project need. We build content and campaigns around those real decision paths so your brand can be discovered earlier and convert interest more effectively.
            </SectionDesc>
          </Animate>
          <div className="grid md:grid-cols-3 gap-4 mt-10">
            {[
              ["Interior design SEO", "Search visibility for service, style and location based queries."],
              ["Home decor paid media", "Campaigns built around products, launches, collections and remarketing."],
              ["Design lead generation", "Conversion paths for consultations, quotes, showrooms and project enquiries."],
            ].map(([title, desc]) => (
              <div key={title} className="bg-white border border-gray-200 p-6">
                <h3 className="font-extrabold">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mt-2">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="FAQ">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Home Decor and Interior Design Marketing Questions</SectionTitle>
          </Animate>
          <div className="mt-10">
            {faq.map((item, index) => (
              <Animate key={item.q} animation="fade-up" delay={index * 45}>
                <details className="group border-b border-gray-200">
                  <summary className="flex justify-between gap-6 items-center py-5 cursor-pointer list-none font-bold">
                    {item.q}
                    <span className="text-xl text-gray-400 group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
                  </summary>
                  <p className="pb-5 text-gray-500 leading-relaxed">{item.a}</p>
                </details>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-[#ece8e1]" aria-label="Call to action">
        <div className="max-w-4xl mx-auto text-center">
          <Animate animation="fade-up">
            <SectionLabel>Let&apos;s Build Demand</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight mt-3">
              Turn inspiration into enquiries, visits and sales.
            </h2>
            <p className="text-lg text-gray-600 mt-5 max-w-2xl mx-auto">
              Tell us whether you are growing a design studio, product brand, showroom or e-commerce business and we will recommend the right channel mix.
            </p>
            <Link href="/get-a-quote" className="inline-flex mt-8 bg-black text-white px-8 py-4 font-bold hover:bg-gray-800 transition-colors">
              Request a Marketing Plan →
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
