import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Tools & Platforms — Technology We Use",
  description: "The platforms, tools, and technology stack we use to deliver data-driven marketing results. Google, Meta, HubSpot, Shopify, WordPress, and more.",
  alternates: { canonical: "https://themarkitmedia.com/en/tools" },
  openGraph: {
    title: "Tools & Platforms We Use",
    description: "Google, Meta, HubSpot, Shopify, WordPress, and more — the tools behind our results.",
  },
};

const categories = [
  {
    title: "Advertising Platforms",
    tools: [
      { name: "Google Ads", desc: "Search, display, shopping, and YouTube campaigns." },
      { name: "Meta Ads", desc: "Facebook and Instagram advertising at scale." },
      { name: "LinkedIn Ads", desc: "B2B targeting by industry, job title, and company." },
      { name: "TikTok Ads", desc: "Short-form video advertising for younger demographics." },
      { name: "Microsoft Ads", desc: "Bing search advertising for incremental reach." },
    ],
  },
  {
    title: "Analytics & Tracking",
    tools: [
      { name: "Google Analytics 4", desc: "Event-based tracking, attribution modeling, and audience insights." },
      { name: "Google Search Console", desc: "Search performance, indexing, and technical SEO monitoring." },
      { name: "Google Tag Manager", desc: "Centralized tag management for tracking and pixels." },
      { name: "Hotjar", desc: "Heatmaps, session recordings, and user behavior analysis." },
      { name: "Looker Studio", desc: "Custom dashboards and automated reporting." },
    ],
  },
  {
    title: "SEO & Content",
    tools: [
      { name: "Semrush", desc: "Keyword research, competitor analysis, and rank tracking." },
      { name: "Ahrefs", desc: "Backlink analysis, content gap research, and site audits." },
      { name: "Screaming Frog", desc: "Technical SEO crawling and site structure analysis." },
      { name: "Surfer SEO", desc: "On-page optimization and content scoring." },
      { name: "Google Trends", desc: "Search demand trends and seasonal planning." },
    ],
  },
  {
    title: "Web Development",
    tools: [
      { name: "Next.js", desc: "React framework for fast, SEO-friendly web applications." },
      { name: "WordPress", desc: "Content management for blogs, corporate sites, and portfolios." },
      { name: "Shopify", desc: "E-commerce platform for online stores and retail." },
      { name: "Vercel", desc: "Hosting and deployment with edge network performance." },
      { name: "Figma", desc: "Design, prototyping, and design system management." },
    ],
  },
  {
    title: "Email & CRM",
    tools: [
      { name: "HubSpot", desc: "CRM, marketing automation, and lead management." },
      { name: "Mailchimp", desc: "Email campaigns, automations, and audience segmentation." },
      { name: "Klaviyo", desc: "E-commerce email and SMS marketing automation." },
      { name: "ActiveCampaign", desc: "Advanced automation workflows and CRM integration." },
    ],
  },
  {
    title: "Social Media",
    tools: [
      { name: "Meta Business Suite", desc: "Facebook and Instagram content management and analytics." },
      { name: "Hootsuite", desc: "Multi-platform scheduling, monitoring, and reporting." },
      { name: "Canva", desc: "Visual content creation for social media and marketing." },
      { name: "CapCut", desc: "Short-form video editing for Reels, TikTok, and Shorts." },
    ],
  },
  {
    title: "AI & Automation",
    tools: [
      { name: "ChatGPT / Claude", desc: "Content ideation, research assistance, and workflow automation." },
      { name: "Zapier", desc: "Workflow automation connecting 5000+ apps and services." },
      { name: "Make (Integromat)", desc: "Complex multi-step automation scenarios." },
    ],
  },
];

const toolsFaqItems = [
  { q: "Do you use these tools on every client account?", a: "No. We select tools based on your specific needs, budget, and goals. A local service business needs different tools than a national e-commerce brand. We recommend what fits your situation, not the most expensive option." },
  { q: "Will I have access to the platforms and data?", a: "Yes. We set up accounts in your name whenever possible. You own your data, your ad accounts, and your analytics. If we ever part ways, you keep everything." },
  { q: "Do you charge extra for the tools you use?", a: "Our service fees cover our team's time and expertise. Platform costs like ad spend or software subscriptions are separate and transparent. We will never mark up third-party tool costs." },
  { q: "How do you stay current with new marketing tools?", a: "Our team continuously evaluates new platforms and tools. We test them on internal projects before recommending them to clients. We only adopt tools that solve a real problem better than existing options." },
];

export default function ToolsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Tools & Platforms",
    description: "Technology stack and tools used by Markit Media for digital marketing.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: toolsFaqItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <article>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Tools & Platforms" }]} />

      <section aria-label="Technology" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Technology</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Tools &amp; Platforms We Use
            </h1>
            <SectionDesc>
              We use industry-leading tools to research, execute, and measure every campaign.
              The right technology stack makes the difference between guessing and knowing.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {categories.map((cat, ci) => (
        <section key={cat.title} className={`px-6 lg:px-12 py-12 ${ci % 2 === 1 ? "bg-gray-50" : ""}`} aria-label={cat.title}>
          <div className="max-w-7xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">{cat.title}</h2>
            </Animate>
            <Stagger stagger={40} animation="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1">
              {cat.tools.map((tool) => (
                <div key={tool.name} className="flex items-start gap-3 py-3 border-b border-gray-100">
                  <span className="mt-1.5 w-2 h-2 bg-black rounded-full flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">{tool.name}</h3>
                    <p className="text-base text-gray-500 leading-relaxed">{tool.desc}</p>
                  </div>
                </div>
              ))}
            </Stagger>
          </div>
        </section>
      ))}

      <section aria-label="Tools Are Just Tools" className="px-6 lg:px-12 py-16">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="bg-gray-50 border border-gray-200 p-8 lg:p-12">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">Tools Are Just Tools</h2>
              <p className="text-base text-gray-500 leading-relaxed mb-4">
                Every agency has access to the same platforms. What separates good results from great results is strategy, execution, and the expertise to read the data correctly.
              </p>
              <p className="text-base text-gray-500 leading-relaxed">
                We pick tools based on what works for your business — not what has the best referral program.
                Our recommendations are always driven by your goals and budget.
              </p>
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="FAQ">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Tools &amp; Platform Questions</SectionTitle>
          </Animate>
          <div className="mt-10">
            {toolsFaqItems.map((item, i) => (
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

      <section className="px-6 lg:px-12 py-16 bg-gray-50" aria-label="Free marketing tools">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Resources</SectionLabel>
            <SectionTitle>Try Our Free Marketing Tools</SectionTitle>
            <SectionDesc>
              We have built over 155 free interactive tools to help marketers plan, analyze, and optimize campaigns.
            </SectionDesc>
          </Animate>
          <Stagger stagger={40} animation="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {[
              { title: "ROI Calculator", href: "/resources/roi-calculator" },
              { title: "SEO Checklist", href: "/resources/seo-checklist" },
              { title: "Website Grader", href: "/resources/website-grader" },
              { title: "Budget Calculator", href: "/resources/budget-calculator" },
              { title: "A/B Test Calculator", href: "/resources/ab-test-calculator" },
              { title: "Headline Analyzer", href: "/resources/headline-analyzer" },
              { title: "UTM Builder", href: "/resources/utm-builder" },
              { title: "Persona Builder", href: "/resources/persona-builder" },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="bg-white border border-gray-200 px-6 py-4 text-base font-bold text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 text-center">
                {t.title}
              </Link>
            ))}
          </Stagger>
          <div className="mt-6 text-center">
            <Link href="/free-tools" className="inline-flex items-center gap-2 text-base font-bold text-black underline hover:no-underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              View All 155+ Free Tools &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Explore more">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3">
              {[
                { label: "All Services", href: "/services" },
                { label: "Technology Stack", href: "/technology" },
                { label: "Capabilities", href: "/capabilities" },
                { label: "Our Process", href: "/process" },
                { label: "Free Marketing Tools", href: "/resources" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="border border-gray-200 px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  {link.label}
                </Link>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Let Us Put These Tools to Work for You
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              We handle the technology so you can focus on running your business.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Start a Conversation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
