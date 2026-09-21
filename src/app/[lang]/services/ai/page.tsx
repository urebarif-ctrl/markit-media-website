import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { Bot } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Solutions",
  description: "AI-powered marketing solutions: chatbots, marketing automation, AI consulting, and predictive analytics. Leverage artificial intelligence to scale your marketing.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/ai" },
  openGraph: {
    title: "AI Solutions",
    description: "AI-powered marketing solutions: chatbots, marketing automation, AI consulting, and predictive analytics. Leverage artificial intelligence to scale your ...",
  },
};

export default function AiPage() {
  return (
    <ServicePage
      icon={Bot}
      heroImage="/images/services/ai.jpg"
      blogCategory="AI"
      title="AI Solutions"
      description="Leverage artificial intelligence to scale your marketing. We build AI chatbots, implement marketing automation, provide AI consulting, and deploy predictive analytics to help you work smarter."
      longDescription="AI is transforming how businesses approach marketing and customer engagement. Our AI solutions team helps you identify high-impact opportunities for automation and intelligence, then builds and deploys the systems to capture them. From customer-facing chatbots to predictive analytics and marketing automation workflows, we bring practical AI to your business operations."
      subServices={[
        { title: "AI Chatbots", desc: "Custom chatbots for customer support, lead qualification, and appointment booking.", href: "/services/ai/chatbots" },
        { title: "Marketing Automation", desc: "Automated workflows for email sequences, lead nurturing, and campaign triggers.", href: "/services/ai/marketing-automation" },
        { title: "AI Consulting", desc: "Strategic guidance on where and how to apply AI across your marketing operations.", href: "/services/ai/consulting" },
        { title: "Predictive Analytics", desc: "Data models that forecast customer behavior, churn risk, and campaign performance.", href: "/services/ai/predictive-analytics" },
      ]}
      benefits={[
        "Automate repetitive marketing tasks to free up your team",
        "Respond to leads and customers around the clock with chatbots",
        "Make data-driven decisions with predictive analytics",
        "Improve campaign performance through intelligent optimization",
        "Scale personalization across channels without scaling headcount",
      ]}
      faq={[
        { q: "What kind of AI chatbots do you build?", a: "We build customer support bots, lead qualification bots, appointment scheduling bots, and FAQ bots. They can be deployed on your website, WhatsApp, Facebook Messenger, and other channels." },
        { q: "Do I need a large dataset to use AI?", a: "Not always. Some AI tools work out of the box with minimal data, while predictive analytics models perform better with more historical data. We assess your data readiness during the consulting phase." },
        { q: "How do you integrate AI with our existing tools?", a: "We integrate with popular CRMs, email platforms, and marketing tools through APIs and native integrations. We work with your existing tech stack wherever possible." },
        { q: "Is AI marketing automation different from regular automation?", a: "AI-powered automation goes beyond rule-based triggers. It can adapt to user behavior in real time, optimize send times, personalize content, and improve over time through learning." },
        { q: "What is the ROI of AI solutions?", a: "ROI depends on the application. Chatbots reduce support costs and capture leads 24/7. Automation saves manual hours. Predictive analytics improves targeting and reduces wasted spend." },
      ]}
      industries={[
        { title: "SaaS", href: "/industries/saas" },
        { title: "E-Commerce", href: "/industries/ecommerce" },
        { title: "Finance", href: "/industries/finance" },
        { title: "Healthcare", href: "/industries/healthcare" },
        { title: "B2B", href: "/industries/b2b" },
      ]}
      relatedServices={[
        { title: "Digital Marketing", href: "/services/digital-marketing" },
        { title: "Email Marketing", href: "/services/email-marketing" },
        { title: "Performance Marketing", href: "/services/performance-marketing" },
      ]}
      tools={[
        { title: "Marketing Audit Scorecard", desc: "Evaluate your marketing across 8 categories.", href: "/resources/marketing-audit-scorecard" },
        { title: "Channel Recommender", desc: "Find the best channels for your business.", href: "/resources/channel-recommender" },
        { title: "Tech Stack Advisor", desc: "Get recommendations for your marketing tech stack.", href: "/resources/tech-stack-advisor" },
      ]}
    />
  );
}
