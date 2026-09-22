import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import {
  ShoppingCart,
  Search,
  MousePointerClick,
  Mail,
  Share2,
  BarChart3,
  PenTool,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing for E-Commerce",
  description:
    "E-commerce marketing services including SEO, PPC, shopping ads, email marketing, social media, conversion rate optimization, and content marketing.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/industries/ecommerce",
  },
  openGraph: {
    title: "Digital Marketing for E-Commerce",
    description: "E-commerce marketing services including SEO, PPC, shopping ads, email marketing, social media, conversion rate optimization, and content marketing.",
  },
};

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Search,
    title: "SEO",
    desc: "Optimize product pages, category structures, and technical foundations so your store ranks for the terms shoppers actually search.",
  },
  {
    icon: MousePointerClick,
    title: "PPC / Shopping Ads",
    desc: "Google Shopping, search ads, and remarketing campaigns designed to drive qualified traffic and maximize return on ad spend.",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    desc: "Automated flows for abandoned carts, post-purchase sequences, and promotional campaigns that bring customers back.",
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    desc: "Build brand awareness and drive traffic through organic and paid social strategies on the platforms where your audience shops.",
  },
  {
    icon: BarChart3,
    title: "Conversion Rate Optimization",
    desc: "Data-driven improvements to your product pages, checkout flow, and site experience to turn more visitors into buyers.",
  },
  {
    icon: PenTool,
    title: "Content Marketing",
    desc: "Product descriptions, buying guides, and blog content that educates shoppers and supports organic search growth.",
  },
];

const challenges = [
  {
    title: "Abandoned carts",
    desc: "A significant portion of online shoppers add items to their cart and leave without purchasing. Recovering even a fraction of those sales can meaningfully impact revenue.",
  },
  {
    title: "Rising ad costs",
    desc: "Cost-per-click on major ad platforms continues to increase. Staying profitable requires smarter targeting, better creative, and ongoing optimization.",
  },
  {
    title: "Competing with marketplaces",
    desc: "Amazon, Walmart, and other large marketplaces dominate product search. Your own store needs a distinct value proposition and strong organic visibility to compete.",
  },
  {
    title: "Customer acquisition cost",
    desc: "Acquiring a new customer is expensive. Balancing paid acquisition with retention strategies and organic channels is critical for sustainable growth.",
  },
  {
    title: "Maintaining margins while scaling",
    desc: "Scaling ad spend does not always scale profit at the same rate. Marketing strategy needs to protect margins as you grow, not just chase top-line revenue.",
  },
];

const faq = [
  {
    q: "What marketing channels drive the most sales for e-commerce?",
    a: "It depends on the product and audience, but SEO, Google Shopping ads, and email marketing are consistently among the highest-performing channels for online stores. SEO builds long-term organic traffic, shopping ads capture high-intent searches, and email marketing re-engages existing customers at a low cost per conversion.",
  },
  {
    q: "How do you reduce abandoned cart rates?",
    a: "We implement automated email and SMS recovery sequences triggered when a shopper leaves items in their cart. We also analyze the checkout flow for friction points — unexpected costs, complex forms, limited payment options — and recommend changes to improve completion rates.",
  },
  {
    q: "How do you measure e-commerce marketing success?",
    a: "We track revenue, return on ad spend, cost per acquisition, average order value, customer lifetime value, and conversion rate. These metrics are reported regularly so you can see exactly how each marketing channel contributes to growth.",
  },
  {
    q: "Can you help with both Shopify and custom e-commerce platforms?",
    a: "Yes. Our marketing strategies are platform-agnostic. Whether you run your store on Shopify, WooCommerce, Magento, BigCommerce, or a custom build, we tailor our approach to fit your technical setup.",
  },
  {
    q: "How long does it take to see results from e-commerce SEO?",
    a: "Paid channels like Google Shopping can drive traffic immediately. SEO is a longer-term investment — expect to see meaningful ranking improvements within three to six months, with traffic and revenue growing steadily as your organic presence strengthens.",
  },
];

export default function EcommercePage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing for E-Commerce",
    description:
      "E-commerce marketing services including SEO, PPC, shopping ads, email marketing, social media, conversion rate optimization, and content marketing.",
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
          { label: "E-Commerce" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Page header" className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
          <Animate animation="fade-up">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-6">
              <ShoppingCart size={28} strokeWidth={2} aria-hidden="true" />
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
              Digital Marketing for E-Commerce
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6">
              Online stores need more than traffic &mdash; they need the right
              traffic, at the right cost, converting at the right rate. We help
              e-commerce brands grow revenue through SEO, paid advertising,
              email, and conversion optimization.
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
            <img loading="lazy" src="/images/industries/ecommerce.svg" alt="Ecommerce marketing services" className="w-full aspect-[4/3] object-cover" />
          </Animate>
        </div>
      </section>

      {/* Services */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Services"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Offer</SectionLabel>
            <SectionTitle>Marketing Services for E-Commerce</SectionTitle>
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
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center mb-4">
                  <svc.icon size={20} strokeWidth={2} aria-hidden="true" />
                </div>
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

      {/* Challenges */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Industry challenges"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Industry Challenges</SectionLabel>
            <SectionTitle>Common Pain Points</SectionTitle>
            <SectionDesc>
              E-commerce brands face intense competition and rising costs. Here
              are the challenges we help you navigate.
            </SectionDesc>
          </Animate>
          <ul className="mt-10 space-y-4">
            {challenges.map((c, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <li className="flex items-start gap-4 py-3 border-b border-gray-200">
                  <span className="w-8 h-8 bg-black text-white flex items-center justify-center flex-shrink-0 text-base font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <span className="text-base font-bold text-black">
                      {c.title}
                    </span>
                    <p className="text-base text-gray-500 leading-relaxed mt-1">
                      {c.desc}
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
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Grow Your E-Commerce Business?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy that drives more traffic,
              higher conversions, and better margins for your online store.
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
