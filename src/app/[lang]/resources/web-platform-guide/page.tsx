import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "WordPress vs Shopify vs Next.js: Which Platform Is Right for You?",
  description: "A comprehensive comparison of WordPress, Shopify, and Next.js to help you choose the right web platform for your business based on cost, speed, SEO, and scalability.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/web-platform-guide" },
};

const comparison = [
  {
    dimension: "Best For",
    wordpress: "Content-heavy sites, blogs, portfolios, small to mid-size businesses",
    shopify: "Online stores and product-based businesses of any size",
    nextjs: "High-performance apps, custom platforms, and enterprise-scale sites",
  },
  {
    dimension: "Cost Range",
    wordpress: "$0-50/mo hosting + $0-200 for themes/plugins. Agency builds: $3K-15K",
    shopify: "$39-399/mo subscription + transaction fees. Agency builds: $5K-25K",
    nextjs: "$0-20/mo hosting (Vercel). Agency builds: $10K-50K+",
  },
  {
    dimension: "SEO",
    wordpress: "Strong with plugins like Yoast. Requires some configuration",
    shopify: "Decent out of the box but limited URL and structure control",
    nextjs: "Excellent. Full control over metadata, structured data, and rendering",
  },
  {
    dimension: "Speed",
    wordpress: "Moderate. Depends heavily on hosting, theme, and plugins",
    shopify: "Good. Managed infrastructure handles caching automatically",
    nextjs: "Excellent. Static generation, edge rendering, and automatic optimization",
  },
  {
    dimension: "Customization",
    wordpress: "High via 60,000+ plugins. Limited by theme architecture for complex features",
    shopify: "Moderate. App ecosystem is large but core platform has guardrails",
    nextjs: "Unlimited. Full code access means anything is possible",
  },
  {
    dimension: "Maintenance",
    wordpress: "Regular updates needed for core, themes, and plugins. Security patches required",
    shopify: "Minimal. Shopify handles hosting, security, and updates",
    nextjs: "Low to moderate. No CMS updates, but requires developer for changes",
  },
  {
    dimension: "E-commerce",
    wordpress: "WooCommerce plugin adds full store functionality. Free but complex at scale",
    shopify: "Built-in. Payment processing, inventory, shipping all included",
    nextjs: "Headless commerce via Shopify, Saleor, or custom. Maximum flexibility",
  },
  {
    dimension: "Learning Curve",
    wordpress: "Low. Visual editor and admin panel are intuitive for non-developers",
    shopify: "Low. Designed for business owners to manage without developers",
    nextjs: "High. Requires React and JavaScript knowledge. Developer-dependent",
  },
];

const whenWordPress = [
  "You need a content-rich website with a blog, landing pages, and frequent updates",
  "Your team needs to edit pages without developer involvement",
  "You want the largest ecosystem of themes, plugins, and third-party integrations",
  "Your budget is limited and you need a cost-effective solution to launch quickly",
  "You plan to scale gradually and want a platform that grows with your needs",
];

const whenShopify = [
  "Your primary business model is selling physical or digital products online",
  "You want built-in payment processing, shipping, and inventory management",
  "You prefer a managed platform that handles security, hosting, and updates for you",
  "You need to launch a store quickly without hiring a development team",
  "You want access to a large app marketplace for extending functionality",
];

const whenNextjs = [
  "Performance and page speed are critical to your business outcomes",
  "You need a highly customized user experience that no template can provide",
  "You are building a web application with complex interactivity, not just a brochure site",
  "Your traffic volume demands edge rendering, static generation, or incremental regeneration",
  "You want a future-proof architecture that separates your frontend from your content backend",
];

export default function WebPlatformGuidePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which platform is best for SEO?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Next.js offers the most SEO control with full access to metadata, structured data, and rendering strategies. WordPress is a close second with strong SEO plugins like Yoast. Shopify provides decent SEO out of the box but limits URL structure and some technical optimizations.",
        },
      },
      {
        "@type": "Question",
        name: "Can I switch platforms later?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, but migration has costs. Moving from WordPress to Next.js or Shopify requires rebuilding templates and redirecting URLs. The best approach is choosing the right platform from the start based on your 2-3 year business goals.",
        },
      },
      {
        "@type": "Question",
        name: "Is Next.js overkill for a small business?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For a simple brochure site or blog, WordPress or Shopify is usually more cost-effective. Next.js makes sense when you need custom functionality, maximum performance, or plan to scale significantly. It requires developer involvement for content changes unless paired with a headless CMS.",
        },
      },
      {
        "@type": "Question",
        name: "How much does it cost to build a website on each platform?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "WordPress sites typically cost $3,000-15,000 for agency builds with $0-50/month hosting. Shopify stores range from $5,000-25,000 with $39-399/month subscriptions. Next.js projects run $10,000-50,000+ for custom development with $0-20/month hosting on platforms like Vercel.",
        },
      },
    ],
  };

  return (
    <article>
      <JsonLd data={faqSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "Web Platform Guide" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Comparison Guide</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              WordPress vs Shopify vs Next.js: Which Platform Is Right for You?
            </h1>
            <SectionDesc>
              Choosing the right web platform is one of the most important decisions for your business.
              This guide compares WordPress, Shopify, and Next.js across the dimensions that matter most
              so you can make an informed choice.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Platform comparison table">
        <div className="max-w-6xl mx-auto overflow-x-auto">
          <Animate animation="fade-up">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left text-base font-bold text-black p-4 border-b-2 border-black w-[16%]">&nbsp;</th>
                  <th className="text-left text-base font-bold text-black p-4 border-b-2 border-black w-[28%]">WordPress</th>
                  <th className="text-left text-base font-bold text-black p-4 border-b-2 border-black w-[28%]">Shopify</th>
                  <th className="text-left text-base font-bold text-black p-4 border-b-2 border-black w-[28%]">Next.js</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.dimension} className="border-b border-gray-200">
                    <td className="p-4 text-base font-bold text-black align-top">{row.dimension}</td>
                    <td className="p-4 text-base text-gray-600 leading-relaxed align-top">{row.wordpress}</td>
                    <td className="p-4 text-base text-gray-600 leading-relaxed align-top">{row.shopify}</td>
                    <td className="p-4 text-base text-gray-600 leading-relaxed align-top">{row.nextjs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-gray-50" aria-label="When to choose each platform">
        <div className="max-w-6xl mx-auto">
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">When to Choose WordPress</h2>
              <ul className="space-y-4">
                {whenWordPress.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-black text-white flex items-center justify-center flex-shrink-0 text-base font-bold mt-0.5">{i + 1}</span>
                    <span className="text-base text-gray-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/services/website-development/wordpress" className="inline-flex items-center gap-2 mt-6 text-base font-bold text-black hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                Our WordPress Services &rarr;
              </Link>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">When to Choose Shopify</h2>
              <ul className="space-y-4">
                {whenShopify.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-black text-white flex items-center justify-center flex-shrink-0 text-base font-bold mt-0.5">{i + 1}</span>
                    <span className="text-base text-gray-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/services/website-development/shopify" className="inline-flex items-center gap-2 mt-6 text-base font-bold text-black hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                Our Shopify Services &rarr;
              </Link>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">When to Choose Next.js</h2>
              <ul className="space-y-4">
                {whenNextjs.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-black text-white flex items-center justify-center flex-shrink-0 text-base font-bold mt-0.5">{i + 1}</span>
                    <span className="text-base text-gray-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/services/website-development/nextjs" className="inline-flex items-center gap-2 mt-6 text-base font-bold text-black hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                Our Next.js Services &rarr;
              </Link>
            </div>
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16" aria-label="Cross-link to web development">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">Still Not Sure? We Can Help.</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-4">
              The right platform depends on your specific business goals, budget, timeline, and technical requirements.
              There is no one-size-fits-all answer. We have built hundreds of websites across all three platforms and
              can recommend the best fit based on where your business is today and where you want it to go.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              Our{" "}
              <Link href="/services/website-development" className="font-bold text-black underline hover:no-underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                website development services
              </Link>{" "}
              cover WordPress, Shopify, Next.js, and custom web applications. We handle everything from strategy
              and design to development and ongoing support.
            </p>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Deciding?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Tell us about your project and we will recommend the right platform, scope, and timeline for your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none">
                Get a Free Consultation &rarr;
              </Link>
              <Link href="/services/website-development" className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none">
                Explore Web Development
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    </article>
  );
}
