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

export default function ToolsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Tools & Platforms",
    description: "Technology stack and tools used by Markit Media for digital marketing.",
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Tools & Platforms" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-12">
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
            <Stagger stagger={40} animation="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.tools.map((tool) => (
                <div key={tool.name} className="bg-white border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-2">{tool.name}</h3>
                  <p className="text-base text-gray-500 leading-relaxed">{tool.desc}</p>
                </div>
              ))}
            </Stagger>
          </div>
        </section>
      ))}

      <section className="px-6 lg:px-12 py-16">
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

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Let Us Put These Tools to Work for You
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              We handle the technology so you can focus on running your business.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none">
              Start a Conversation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
