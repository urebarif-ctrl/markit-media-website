import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description: "Specialized digital marketing for 20+ industries, including exterior cleaning, home services, e-commerce, healthcare, real estate, restaurants, B2B, and more.",
  alternates: { canonical: "https://themarkitmedia.com/en/industries" },
  openGraph: {
    title: "Industries We Serve",
    description:
      "Specialized digital marketing for 20+ industries including e-commerce, healthcare, real estate, SaaS, and more.",
  },
};

const industries = [
  { title: "Home Services", desc: "HVAC, plumbing, roofing, landscaping, and home improvement businesses. We help local service providers generate qualified leads and build trust in their communities.", href: "/industries/home-services", image: "/images/industries/home-services.svg" },
  { title: "Exterior Cleaning", desc: "Window cleaning, pressure washing, soft washing, roof cleaning, gutter cleaning, and commercial exterior services. Local SEO, paid media, conversion-focused websites, and follow-up systems built around booked jobs.", href: "/industries/exterior-cleaning", image: "/images/industries/exterior-cleaning.svg" },
  { title: "Rehab & Recovery", desc: "Policy-aware growth for addiction treatment, behavioral health, recovery, and rehabilitation organizations — SEO, qualified enquiries, admissions journeys, and compliant acquisition.", href: "/industries/rehab-recovery", image: "/images/industries/healthcare.svg" },
  { title: "Personal Branding & CEOs", desc: "Executive positioning, LinkedIn strategy, thought leadership, content systems, PR support, and digital presence for founders, CEOs, consultants, and senior leaders.", href: "/industries/personal-branding", image: "/images/industries/professional-services.svg" },
  { title: "Food Ingredients E-commerce", desc: "B2B and DTC growth for ingredient suppliers, specialty food brands, wholesalers, and online ingredient stores — Shopify, search, paid media, product content, samples, and retention.", href: "/industries/food-ingredients-ecommerce", image: "/images/industries/ecommerce.svg" },
  { title: "E-commerce", desc: "Online stores, DTC brands, and marketplace sellers. From product feed optimization to conversion rate optimization, we drive profitable online sales.", href: "/industries/ecommerce", image: "/images/industries/ecommerce.svg" },
  { title: "Healthcare", desc: "Medical practices, dental clinics, wellness brands, and health tech. HIPAA-aware marketing that builds patient trust and drives appointments.", href: "/industries/healthcare", image: "/images/industries/healthcare.svg" },
  { title: "Real Estate", desc: "Developers, brokers, property managers, and real estate agencies. High-intent lead generation and brand building in competitive local markets.", href: "/industries/real-estate", image: "/images/industries/real-estate.svg" },
  { title: "Restaurants", desc: "Restaurants, cafes, food delivery, and hospitality brands. Local SEO, social media, and reputation management that fill tables.", href: "/industries/restaurants", image: "/images/industries/restaurant.svg" },
  { title: "Fashion", desc: "Fashion brands, apparel companies, and luxury retail. Visual storytelling, influencer partnerships, and conversion-focused e-commerce marketing.", href: "/industries/fashion", image: "/images/industries/fashion.svg" },
  { title: "B2B", desc: "SaaS, professional services, manufacturing, and enterprise companies. Long-cycle lead nurturing, thought leadership, and account-based marketing.", href: "/industries/b2b", image: "/images/industries/b2b.svg" },
  { title: "EV Chargers", desc: "EV charging networks, clean energy, and sustainability brands. Market positioning and demand generation in a rapidly growing sector.", href: "/industries/ev-chargers", image: "/images/industries/ev-chargers.svg" },
  { title: "Education", desc: "Schools, universities, online courses, and EdTech companies. Enrollment marketing, brand positioning, and student acquisition across digital channels.", href: "/industries/education", image: "/images/industries/education.svg" },
  { title: "Legal", desc: "Law firms, solo practitioners, and legal services. Ethical digital marketing that builds trust, generates qualified leads, and differentiates your practice.", href: "/industries/legal", image: "/images/industries/legal.svg" },
  { title: "SaaS", desc: "Software companies and tech startups. Demand generation, product-led growth, content marketing, and full-funnel paid acquisition for recurring revenue businesses.", href: "/industries/saas", image: "/images/industries/saas.svg" },
  { title: "Financial Services", desc: "Banks, fintech, insurance, accounting, and wealth management. Compliant digital marketing that builds trust and generates qualified financial leads.", href: "/industries/finance", image: "/images/industries/finance.svg" },
  { title: "Hospitality & Hotels", desc: "Hotels, resorts, vacation rentals, and travel brands. Direct booking strategies, reputation management, and seasonal marketing that fills rooms year-round.", href: "/industries/hospitality", image: "/images/industries/hospitality.svg" },
  { title: "Fitness & Wellness", desc: "Gyms, studios, wellness centers, and fitness brands. Membership acquisition, retention marketing, and local visibility to grow your community.", href: "/industries/fitness", image: "/images/industries/fitness.svg" },
  { title: "Automotive", desc: "Dealerships, auto services, parts retailers, and car brands. Inventory-based advertising, local search dominance, and lead generation that drives test drives.", href: "/industries/automotive", image: "/images/industries/automotive.svg" },
  { title: "Nonprofits & NGOs", desc: "Charities, foundations, and advocacy organizations. Donor acquisition, Google Ad Grants management, and impact-driven storytelling on a limited budget.", href: "/industries/nonprofits", image: "/images/industries/nonprofits.svg" },
  { title: "Construction & Home Building", desc: "Contractors, home builders, remodelers, and construction companies. Local SEO, PPC, reputation management, and project showcases that generate qualified leads.", href: "/industries/construction", image: "/images/industries/construction.svg" },
  { title: "Travel & Tourism", desc: "Travel agencies, tour operators, destinations, and tourism brands. Social media marketing, SEO, video production, and email campaigns that drive bookings.", href: "/industries/travel", image: "/images/industries/travel.svg" },
  { title: "Professional Services", desc: "Law firms, accounting practices, consulting firms, and professional service providers. SEO, content marketing, LinkedIn marketing, and PPC to build authority and generate leads.", href: "/industries/professional-services", image: "/images/industries/professional-services.svg" },
  { title: "Manufacturing & Industrial", desc: "Manufacturers, industrial suppliers, and B2B companies. SEO, content marketing, LinkedIn advertising, video production, and trade show marketing to reach engineers and buyers.", href: "/industries/manufacturing", image: "/images/industries/manufacturing.svg" },
];

const industryFaqItems = [
  { q: "Do you specialize in specific industries or work with any business?", a: "We have deep experience in 20+ industries, from healthcare and real estate to SaaS and e-commerce. Our teams understand the unique buyer journeys, compliance requirements, and competitive dynamics of each sector we serve." },
  { q: "How does industry specialization improve marketing results?", a: "Industry expertise means faster ramp-up times, proven channel strategies, and relevant benchmarks. We already know what messaging resonates with your audience, which platforms perform best, and what compliance rules apply — so your campaigns start strong instead of requiring months of trial and error." },
  { q: "Can you handle industries with strict compliance requirements?", a: "Yes. We work with healthcare, legal, financial services, and other regulated industries regularly. We build campaigns that meet industry-specific advertising guidelines, privacy regulations, and ethical standards." },
  { q: "What if my industry is not listed on this page?", a: "The industries listed here represent our deepest areas of expertise, but we work with businesses across many sectors. Contact us to discuss your specific needs — our core digital marketing skills transfer well across industries." },
];

export default function IndustriesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Industries Served by Markit Media",
    description: "Specialized digital marketing for 20 industries: home services, e-commerce, healthcare, real estate, restaurants, fashion, B2B, and more.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: industryFaqItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <article>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Industries" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-12" aria-label="Industries we serve">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Industries</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing Built for Your Industry
            </h1>
            <SectionDesc>
              Cookie-cutter strategies don&apos;t work. Every industry has unique buyer journeys, compliance needs, and competitive dynamics. We bring deep expertise and tailored strategies to each sector we serve.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Industries">
        <div className="max-w-7xl mx-auto">
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industries.map((ind) => (
              <Link key={ind.href} href={ind.href} className="group bg-white border border-gray-200 hover:border-black/30 hover:shadow-lg transition-all duration-300 motion-reduce:transition-none overflow-hidden focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={ind.image}
                    alt={`${ind.title} marketing`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 motion-reduce:transition-none"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-2">{ind.title}</h2>
                  <p className="text-base text-gray-500 leading-relaxed">{ind.desc}</p>
                </div>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Why industry specialization matters">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Approach</SectionLabel>
            <SectionTitle>Why Industry Specialization Matters</SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { title: "Faster Ramp-Up", desc: "We already know your industry's landscape, terminology, and buyer behavior. No time wasted learning the basics." },
              { title: "Proven Playbooks", desc: "Strategies refined through experience with similar businesses. We know what works and what to avoid." },
              { title: "Relevant Benchmarks", desc: "We measure your performance against real industry standards, not generic marketing averages." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">{item.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-white" aria-label="FAQ">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Industry Marketing Questions</SectionTitle>
          </Animate>
          <div className="mt-10">
            {industryFaqItems.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <details className="group border-b border-gray-200">
                  <summary className="flex justify-between items-center py-5 cursor-pointer text-base font-bold text-black list-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                    {item.q}
                    <span className="text-xl text-gray-500 group-open:rotate-45 transition-transform motion-reduce:transition-none flex-shrink-0 ml-4" aria-hidden="true">+</span>
                  </summary>
                  <div className="pb-5 text-base text-gray-500 leading-relaxed">{item.a}</div>
                </details>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Explore more">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3">
              {[
                { label: "All Services", href: "/services" },
                { label: "Case Studies", href: "/case-studies" },
                { label: "Locations", href: "/locations" },
                { label: "Our Process", href: "/process" },
                { label: "Service Finder Quiz", href: "/services/finder" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="border border-gray-200 px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  {link.label}
                </Link>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center" aria-label="Get started">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Don&apos;t See Your Industry?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              We work with businesses across many sectors. Contact us to discuss your specific needs.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Get in Touch &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
