import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing",
  description: "Digital marketing consulting: analytics setup, CRM consulting, online reputation management, fractional CMO, and marketing strategy. Build a data-driven marketing operation.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/digital-marketing" },
  openGraph: {
    title: "Digital Marketing",
    description: "Digital marketing consulting: analytics setup, CRM consulting, online reputation management, fractional CMO, and marketing strategy. Build a data-driven...",
  },
};

export default function DigitalMarketingPage() {
  return (
    <ServicePage
      icon={BarChart3}
      heroImage="/images/services/digital-marketing.jpg"
      blogCategory="Digital Marketing"
      title="Digital Marketing"
      description="Build a data-driven marketing operation. We provide analytics setup, CRM consulting, online reputation management, fractional CMO services, and comprehensive marketing strategy."
      longDescription="Digital marketing success requires the right strategy, systems, and measurement in place. Our consulting team helps you set up analytics infrastructure, implement and optimize CRM systems, manage your online reputation, and develop marketing strategies that align with your business goals. For businesses that need senior marketing leadership without a full-time hire, our fractional CMO service provides executive-level guidance."
      subServices={[
        { title: "Analytics Setup", desc: "Google Analytics, conversion tracking, dashboards, and attribution modeling.", href: "/services/digital-marketing/analytics-setup" },
        { title: "CRM Consulting", desc: "CRM selection, implementation, workflow automation, and sales pipeline optimization.", href: "/services/digital-marketing/crm-consulting" },
        { title: "ORM", desc: "Online reputation monitoring, review management, and brand sentiment analysis.", href: "/services/digital-marketing/orm" },
        { title: "Fractional CMO", desc: "Senior marketing leadership on a part-time basis to guide your strategy and team.", href: "/services/digital-marketing/fractional-cmo" },
        { title: "Marketing Strategy", desc: "Comprehensive marketing plans with channel selection, budgeting, and KPI frameworks.", href: "/services/digital-marketing/marketing-strategy" },
      ]}
      benefits={[
        "Clear visibility into marketing performance through proper analytics",
        "Streamlined sales processes with CRM optimization",
        "Proactive online reputation management and review monitoring",
        "Senior marketing leadership without a full-time executive hire",
        "Data-informed strategy that allocates budget to the highest-performing channels",
      ]}
      faq={[
        { q: "What does a fractional CMO do?", a: "A fractional CMO provides senior marketing leadership on a part-time basis. They develop strategy, manage vendor relationships, guide your marketing team, and report on performance, giving you executive-level expertise without the full-time cost." },
        { q: "What analytics tools do you set up?", a: "We implement Google Analytics 4, Google Tag Manager, conversion tracking pixels, custom dashboards, and attribution models. We also integrate analytics with your CRM and advertising platforms." },
        { q: "What is online reputation management?", a: "ORM involves monitoring brand mentions, managing reviews on Google and industry platforms, responding to feedback, and implementing strategies to build and maintain a positive online presence." },
        { q: "Which CRM platforms do you work with?", a: "We work with HubSpot, Salesforce, Pipedrive, Zoho, and other CRM platforms. We help you choose the right one and set it up for your sales and marketing workflows." },
        { q: "How do you develop a marketing strategy?", a: "We start with your business goals, analyze your market and competitors, audit your current marketing, then build a plan with channel recommendations, budgets, timelines, and KPIs." },
      ]}
      relatedServices={[
        { title: "Performance Marketing", href: "/services/performance-marketing" },
        { title: "SEO", href: "/services/seo" },
        { title: "AI Solutions", href: "/services/ai" },
      ]}
    />
  );
}
