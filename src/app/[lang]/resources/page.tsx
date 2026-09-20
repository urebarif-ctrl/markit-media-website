import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Resources — Digital Marketing Guides & Tools",
  description: "Free digital marketing resources: blog articles, glossary, checklists, and guides to help you grow your business online.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources" },
};

const resources = [
  {
    title: "Blog",
    desc: "Expert insights on SEO, advertising, social media, branding, web development, and digital marketing strategy.",
    href: "/blog",
    count: "500+ articles",
  },
  {
    title: "FAQ",
    desc: "Answers to the most common questions about our services, process, pricing, and what it's like to work with us.",
    href: "/faq",
    count: "42 questions",
  },
  {
    title: "Glossary",
    desc: "A comprehensive reference for key digital marketing terms, acronyms, and concepts.",
    href: "/glossary",
    count: "150 terms",
  },
  {
    title: "Checklists",
    desc: "Interactive checklists for website launches, monthly SEO, social media management, and PPC campaigns.",
    href: "/resources/checklists",
    count: "4 checklists",
  },
  {
    title: "ROI Calculator",
    desc: "Estimate the potential return on your digital marketing investment with our interactive calculator.",
    href: "/resources/roi-calculator",
    count: "Interactive tool",
  },
  {
    title: "Service Finder",
    desc: "Answer a few questions and get personalized service recommendations for your business goals.",
    href: "/services/finder",
    count: "Interactive quiz",
  },
  {
    title: "SEO vs PPC Guide",
    desc: "A detailed comparison of SEO and PPC to help you decide which channel is right for your business.",
    href: "/resources/seo-vs-ppc",
    count: "Comparison guide",
  },
  {
    title: "Web Platform Guide",
    desc: "Compare WordPress, Shopify, and Next.js across cost, speed, SEO, and customization to pick the right platform.",
    href: "/resources/web-platform-guide",
    count: "Comparison guide",
  },
  {
    title: "Budget Calculator",
    desc: "Enter your monthly budget, business type, and goal to get a recommended channel allocation across SEO, PPC, social, and more.",
    href: "/resources/budget-calculator",
    count: "Interactive tool",
  },
  {
    title: "Website Grader",
    desc: "Answer 8 questions about your website and get an instant performance grade with a breakdown of strengths and weaknesses.",
    href: "/resources/website-grader",
    count: "Interactive quiz",
  },
  {
    title: "SEO Health Check",
    desc: "An interactive 20-point checklist to evaluate your website's SEO health. Instant scoring and actionable tips for each item.",
    href: "/resources/seo-checklist",
    count: "20-point audit",
  },
  {
    title: "Headline Analyzer",
    desc: "Test your blog titles, ad headlines, and email subject lines. Get instant feedback on word choice, length, and emotional impact.",
    href: "/resources/headline-analyzer",
    count: "Interactive tool",
  },
  {
    title: "Social Share Preview",
    desc: "Preview how your links look on Facebook, Twitter/X, and LinkedIn. Optimize your Open Graph tags for maximum engagement.",
    href: "/resources/og-preview",
    count: "Interactive tool",
  },
  {
    title: "Meta Description Generator",
    desc: "Write and optimize meta descriptions for your web pages. Use templates or write your own, then check length and quality instantly.",
    href: "/resources/meta-description-generator",
    count: "Interactive tool",
  },
  {
    title: "Social Media Planner",
    desc: "Select your platforms and get a customized posting schedule with content types, frequencies, best times, and tips.",
    href: "/resources/social-media-planner",
    count: "6 platforms",
  },
  {
    title: "Content ROI Calculator",
    desc: "Estimate the long-term value of content marketing. See month-by-month projections of traffic, leads, and revenue as content compounds.",
    href: "/resources/content-roi-calculator",
    count: "Interactive tool",
  },
  {
    title: "PPC Audit Checklist",
    desc: "A 37-point checklist to evaluate your Google Ads account. Check off items to see your account health score with grades.",
    href: "/resources/ppc-audit-checklist",
    count: "37-point audit",
  },
  {
    title: "Email ROI Calculator",
    desc: "Estimate the revenue potential of your email marketing program. Enter your list size, rates, and costs for projected returns.",
    href: "/resources/email-roi-calculator",
    count: "Interactive tool",
  },
  {
    title: "Startup Marketing Guide",
    desc: "A practical guide to building a marketing engine from zero. Phases, budget tiers, channel priorities, and common mistakes to avoid.",
    href: "/resources/startup-marketing-guide",
    count: "Complete guide",
  },
  {
    title: "Choosing an Agency",
    desc: "A practical guide to evaluating digital marketing agencies. Red flags, questions to ask, and what to expect from a good partnership.",
    href: "/resources/agency-comparison",
    count: "Complete guide",
  },
  {
    title: "Marketing Trends 2026",
    desc: "The 10 most important shifts in digital marketing this year. Agentic AI, first-party data, video commerce, SGE, brand building — with actionable takeaways.",
    href: "/resources/marketing-trends-2026",
    count: "10 trends",
  },
  {
    title: "Marketing Trends 2025",
    desc: "The 10 most important shifts in digital marketing for 2025. AI, privacy, video, zero-click search, and more — with actionable takeaways.",
    href: "/resources/marketing-trends-2025",
    count: "10 trends",
  },
  {
    title: "Marketing Statistics 2026",
    desc: "Updated industry benchmarks across SEO, paid ads, social media, email, content marketing, e-commerce, and AI adoption to inform your 2026 strategy.",
    href: "/resources/marketing-statistics-2026",
    count: "35+ data points",
  },
  {
    title: "Marketing Statistics 2025",
    desc: "Essential digital marketing statistics across SEO, PPC, social media, email, content marketing, and e-commerce to inform your strategy.",
    href: "/resources/marketing-statistics",
    count: "45+ data points",
  },
  {
    title: "Brand Name Generator",
    desc: "Get instant brand name ideas for your business. Enter a keyword, choose a naming style, and generate creative combinations.",
    href: "/resources/brand-name-generator",
    count: "Interactive tool",
  },
  {
    title: "Ad Copy Generator",
    desc: "Generate ad copy for Google, Facebook, LinkedIn, and email. Choose your platform, tone, and inputs to get instant copy variations with character counts.",
    href: "/resources/ad-copy-generator",
    count: "4 platforms",
  },
  {
    title: "Email Subject Line Tester",
    desc: "Test your email subject lines for deliverability, spam risk, and engagement. Get an instant score with detailed feedback on each factor.",
    href: "/resources/email-subject-tester",
    count: "Interactive tool",
  },
  {
    title: "Competitor Analysis",
    desc: "Map out your competitive landscape with this interactive worksheet. Compare up to 6 competitors across strategy, channels, and positioning.",
    href: "/resources/competitor-analysis",
    count: "Interactive worksheet",
  },
  {
    title: "Marketing Budget Planner",
    desc: "Get a detailed channel allocation based on your budget size, business stage, and primary goal. Visual breakdown with spending amounts and rationale.",
    href: "/resources/marketing-budget-planner",
    count: "Interactive planner",
  },
  {
    title: "Website Speed Assessment",
    desc: "Answer 8 questions about your website infrastructure and get an instant speed score with prioritized recommendations.",
    href: "/resources/speed-test",
    count: "8-point assessment",
  },
  {
    title: "Small Business Guide",
    desc: "A practical guide to digital marketing for small businesses — which channels to prioritize, budget guidance, and common mistakes to avoid.",
    href: "/resources/small-business-guide",
    count: "Complete guide",
  },
  {
    title: "How We Measure Results",
    desc: "Our KPI framework, reporting cadence, and the analytics platforms we use to track and optimize performance.",
    href: "/results",
    count: "Framework",
  },
  {
    title: "Our Process",
    desc: "Learn how we take you from strategy to results with our proven 5-step marketing process.",
    href: "/process",
    count: "5 steps",
  },
  {
    title: "Why Markit Media",
    desc: "See how we compare to typical agencies and learn about our operating principles.",
    href: "/why-markit-media",
    count: "Comparison guide",
  },
];

export default function ResourcesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Markit Media Resources",
    description: "Free digital marketing resources, guides, and tools.",
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Resources" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Resources</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Learn, Plan, and Grow
            </h1>
            <SectionDesc>
              Free resources to help you understand digital marketing and make better decisions for your business.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Available resources">
        <div className="max-w-7xl mx-auto">
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((r) => (
              <Link key={r.href} href={r.href} className="group bg-white border border-gray-200 hover:border-black/30 transition-all p-8 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <span className="text-base font-medium text-gray-400 mb-2 block">{r.count}</span>
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mb-3">{r.title}</h2>
                <p className="text-base text-gray-500 leading-relaxed">{r.desc}</p>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Put This Knowledge to Work?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let our team turn these insights into a strategy that drives real results for your business.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors">
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
