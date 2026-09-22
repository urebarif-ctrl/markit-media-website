import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Technology Stack — Platforms & Tools We Use",
  description: "Explore the platforms, tools, and technologies Markit Media uses to plan, execute, and measure digital marketing campaigns.",
  alternates: { canonical: "https://themarkitmedia.com/en/technology" },
  openGraph: {
    title: "Our Technology Stack",
    description: "The platforms and tools we use to plan, execute, and measure digital marketing campaigns.",
  },
};

const categories = [
  {
    name: "Advertising Platforms",
    desc: "Where we run and manage paid campaigns.",
    tools: [
      { name: "Google Ads", what: "Search, display, YouTube, shopping, and performance max campaigns." },
      { name: "Meta Ads", what: "Facebook and Instagram advertising across the full funnel." },
      { name: "TikTok Ads", what: "Short-form video advertising for brand awareness and conversions." },
      { name: "LinkedIn Ads", what: "B2B lead generation through sponsored content and InMail." },
      { name: "Microsoft Ads", what: "Bing search advertising and audience network campaigns." },
      { name: "Amazon Ads", what: "Sponsored products, brands, and display for e-commerce." },
    ],
  },
  {
    name: "SEO & Research",
    desc: "Tools for keyword research, technical audits, and competitive analysis.",
    tools: [
      { name: "SEMrush", what: "Keyword research, rank tracking, site audits, and competitive intelligence." },
      { name: "Ahrefs", what: "Backlink analysis, content research, and keyword explorer." },
      { name: "Google Search Console", what: "Index coverage, core web vitals, and search performance monitoring." },
      { name: "Screaming Frog", what: "Technical SEO crawling and site architecture audits." },
      { name: "Moz", what: "Domain authority tracking, local SEO, and link analysis." },
      { name: "Surfer SEO", what: "Content optimization and on-page SEO recommendations." },
    ],
  },
  {
    name: "Analytics & Tracking",
    desc: "How we measure performance and attribute conversions.",
    tools: [
      { name: "Google Analytics 4", what: "Web and app analytics, event tracking, and conversion measurement." },
      { name: "Google Tag Manager", what: "Tag deployment, event tracking, and conversion tracking setup." },
      { name: "Looker Studio", what: "Custom dashboards and automated performance reporting." },
      { name: "Hotjar", what: "Heatmaps, session recordings, and user behavior analytics." },
      { name: "Microsoft Clarity", what: "Free heatmaps and session replays for UX analysis." },
      { name: "Google Optimize", what: "A/B testing and multivariate experiments." },
    ],
  },
  {
    name: "Web Development",
    desc: "Platforms and frameworks we build on.",
    tools: [
      { name: "Next.js", what: "React-based framework for high-performance custom web applications." },
      { name: "WordPress", what: "Content management system for blogs, business sites, and portals." },
      { name: "Shopify", what: "E-commerce platform for online stores and product management." },
      { name: "Tailwind CSS", what: "Utility-first CSS framework for rapid, consistent UI development." },
      { name: "TypeScript", what: "Type-safe JavaScript for maintainable, reliable codebases." },
      { name: "Vercel", what: "Deployment and hosting for high-performance web applications." },
    ],
  },
  {
    name: "Email & CRM",
    desc: "Platforms for email marketing, automation, and customer management.",
    tools: [
      { name: "HubSpot", what: "CRM, marketing automation, email marketing, and sales pipeline." },
      { name: "Mailchimp", what: "Email campaigns, audience segmentation, and marketing automation." },
      { name: "Klaviyo", what: "E-commerce email and SMS marketing with advanced segmentation." },
      { name: "ActiveCampaign", what: "Email automation, CRM, and lead scoring." },
      { name: "ConvertKit", what: "Email marketing for creators and content-driven businesses." },
      { name: "Salesforce", what: "Enterprise CRM and marketing cloud integration." },
    ],
  },
  {
    name: "Social Media Management",
    desc: "Tools for scheduling, publishing, and managing social channels.",
    tools: [
      { name: "Meta Business Suite", what: "Facebook and Instagram content management and insights." },
      { name: "Hootsuite", what: "Multi-platform scheduling, monitoring, and analytics." },
      { name: "Buffer", what: "Social media scheduling and analytics across platforms." },
      { name: "Sprout Social", what: "Social listening, publishing, and engagement management." },
      { name: "Later", what: "Visual content planning and Instagram-first scheduling." },
      { name: "Canva", what: "Design templates for social graphics, presentations, and brand assets." },
    ],
  },
  {
    name: "Creative & Design",
    desc: "Tools for design, video, and creative production.",
    tools: [
      { name: "Figma", what: "UI/UX design, prototyping, and collaborative design systems." },
      { name: "Adobe Creative Suite", what: "Photoshop, Illustrator, InDesign for professional design work." },
      { name: "Adobe Premiere Pro", what: "Professional video editing and post-production." },
      { name: "After Effects", what: "Motion graphics, animation, and visual effects." },
      { name: "DaVinci Resolve", what: "Color grading, video editing, and audio post-production." },
      { name: "Lottie", what: "Lightweight animations for web and mobile applications." },
    ],
  },
  {
    name: "Project Management",
    desc: "How we organize, track, and deliver work.",
    tools: [
      { name: "Asana", what: "Project management, task tracking, and team workflows." },
      { name: "Slack", what: "Team communication, client channels, and integrations." },
      { name: "Google Workspace", what: "Docs, Sheets, Slides, and Drive for collaboration." },
      { name: "Notion", what: "Documentation, wikis, and knowledge management." },
      { name: "Loom", what: "Video messaging for async updates and screen recordings." },
      { name: "GitHub", what: "Version control and code collaboration for development projects." },
    ],
  },
];

const techFaqItems = [
  { q: "What CMS platforms do you work with?", a: "We work primarily with WordPress and Shopify, and we also build headless CMS setups using platforms like Sanity or WordPress as a back end paired with a modern front-end framework. The right choice depends on how your team manages content, what integrations you need, and how much design flexibility you want." },
  { q: "Do you build custom solutions or use existing platforms?", a: "Both. For many businesses, a well-configured platform like WordPress or Shopify is the most practical and cost-effective starting point. When requirements go beyond what a platform handles cleanly — complex workflows, unique user experiences, or deep integrations — we build custom applications using frameworks like Next.js. We always recommend the approach that delivers the best outcome for your budget." },
  { q: "How do you ensure website performance?", a: "Performance is part of our process from day one, not an afterthought. We optimize images, minimize third-party scripts, choose modern hosting infrastructure, and test across devices and real network conditions. After launch, we monitor Core Web Vitals and address any regressions as they appear." },
  { q: "What analytics and tracking tools do you use?", a: "We typically set up Google Analytics 4 and Google Tag Manager as a baseline. Depending on the project, we layer in tools like Hotjar or Microsoft Clarity for behavior analysis, Looker Studio for custom reporting dashboards, and platform-specific conversion tracking for ad campaigns. Everything is configured to respect user privacy and comply with relevant regulations." },
  { q: "How do you handle website security?", a: "We follow established security practices: SSL certificates, regular software updates, strong access controls, and secure hosting environments. For WordPress sites, we harden the installation and use reputable security plugins. For custom applications, we follow OWASP guidelines and test thoroughly before launch. Automated backups are standard so recovery is straightforward if anything goes wrong." },
];

export default function TechnologyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Technology Stack — Markit Media",
    description: "Platforms, tools, and technologies used by Markit Media.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: techFaqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <article>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Technology" }]} />

      <section aria-label="Technology" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Technology</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              The Tools Behind the Results
            </h1>
            <SectionDesc>
              We use industry-leading platforms for every stage of digital marketing — from research and planning to execution, tracking, and reporting. Here is our stack.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {categories.map((cat, ci) => (
        <section
          key={cat.name}
          className={`px-6 lg:px-12 py-16 ${ci % 2 === 0 ? "bg-gray-50" : ""}`}
          aria-label={cat.name}
        >
          <div className="max-w-7xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">{cat.name}</h2>
              <p className="text-base text-gray-500 mt-2 mb-8">{cat.desc}</p>
            </Animate>
            <Stagger stagger={50} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.tools.map((tool) => (
                <div key={tool.name} className="bg-white border border-gray-200 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 motion-reduce:transition-none">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black mb-2">{tool.name}</h3>
                  <p className="text-base text-gray-500 leading-relaxed">{tool.what}</p>
                </div>
              ))}
            </Stagger>
          </div>
        </section>
      ))}

      <section className="px-6 lg:px-12 py-16" aria-label="Our approach to technology">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Philosophy</SectionLabel>
            <SectionTitle>How We Choose Tools</SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {[
              { title: "Best Tool for the Job", desc: "We are platform-agnostic. We recommend tools based on your needs, not our vendor partnerships or preferences." },
              { title: "Integration First", desc: "Every tool in our stack connects to the others. Data flows between platforms so nothing gets siloed." },
              { title: "Your Data, Your Access", desc: "We set up accounts in your name. You own your data, your dashboards, and your platform accounts." },
              { title: "Training Included", desc: "We do not just use tools for you — we train your team to understand the dashboards, reports, and data we deliver." },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 p-8 border border-gray-200 hover:shadow-md transition-shadow duration-300 motion-reduce:transition-none">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">{item.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-gray-50" aria-label="Technology selection philosophy">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Principles</SectionLabel>
            <SectionTitle>Our Technology Selection Philosophy</SectionTitle>
            <SectionDesc>
              Every technology decision we make is guided by four core principles that keep your project on the right track.
            </SectionDesc>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {[
              {
                title: "Right Tool for the Job",
                desc: "We do not force one stack on every project. Your business goals, audience, and growth plans determine the technology — not our habits or vendor partnerships.",
              },
              {
                title: "Performance First",
                desc: "Speed and reliability drive our choices. Every framework, plugin, and integration is evaluated for its impact on load times, uptime, and real-world user experience.",
              },
              {
                title: "Scalable by Design",
                desc: "We build solutions that grow with your business. Whether you are launching with ten pages or ten thousand products, the architecture is ready for what comes next.",
              },
              {
                title: "Future-Proof",
                desc: "We invest in technologies backed by strong ecosystems and active community support. That means fewer costly migrations and longer-lasting value from every build.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">{item.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16" aria-label="Frequently asked questions">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Common Questions About Our Technology</SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="mt-12 space-y-4">
            {techFaqItems.map((item) => (
              <details key={item.q} className="group border border-gray-200 bg-white">
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-base font-bold text-black font-[family-name:var(--font-display)] hover:bg-gray-50 transition-colors duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  {item.q}
                  <span className="ml-4 text-gray-400 group-open:rotate-45 transition-transform duration-300 motion-reduce:transition-none" aria-hidden="true">+</span>
                </summary>
                <div className="px-6 pb-6 text-base text-gray-500 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-gray-50" aria-label="Explore related pages">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Explore</SectionLabel>
            <SectionTitle>Where to Go Next</SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: "Website Development",
                desc: "See how we plan, design, and build websites that perform — from single-page sites to complex e-commerce stores.",
                href: "/services/website-development",
              },
              {
                title: "Our Process",
                desc: "Learn how we take a project from discovery through launch and ongoing support, step by step.",
                href: "/process",
              },
              {
                title: "Get in Touch",
                desc: "Have a project in mind or questions about our approach? Start a conversation with our team.",
                href: "/contact",
              },
            ].map((card) => (
              <Link key={card.href} href={card.href} className="block bg-white border border-gray-200 p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">{card.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{card.desc}</p>
                <span className="inline-block mt-4 text-base font-bold text-black" aria-hidden="true">&rarr;</span>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Related pages">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Capabilities", href: "/capabilities" },
                { label: "Services", href: "/services" },
                { label: "How We Measure Results", href: "/results" },
                { label: "Our Process", href: "/process" },
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
              Questions About Our Stack?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              We are happy to walk you through our tools and how they map to your goals.
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
