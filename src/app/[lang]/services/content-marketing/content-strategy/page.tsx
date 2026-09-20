import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Content Strategy Services",
  description:
    "Build a content strategy that aligns with business goals. Markit Media provides editorial planning, content audits, governance frameworks, and roadmaps to guide every piece of content you publish.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/content-marketing/content-strategy",
  },
  openGraph: {
    title: "Content Strategy Services",
    description: "Build a content strategy that aligns with business goals. Markit Media provides editorial planning, content audits, governance frameworks, and roadmaps ...",
  },
};

export default function ContentStrategyPage() {
  return (
    <SubServicePage
      parentTitle="Content Marketing"
      parentHref="/services/content-marketing"
      title="Content Strategy"
      description="A content strategy turns scattered publishing into a disciplined system that supports revenue. We audit what you have, identify gaps, and build a documented plan — editorial calendar, governance rules, and performance benchmarks — so every asset serves a measurable purpose."
      details={[
        "Content audit and gap analysis — inventory existing assets, score them for quality and relevance, and map gaps against your buyer journey so you know exactly what to create, update, or retire.",
        "Editorial calendar development — plan topics, formats, channels, and publish dates in a shared calendar that keeps writers, designers, and stakeholders aligned quarter by quarter.",
        "Content governance framework — define brand voice, approval workflows, style guidelines, and version-control rules so quality stays consistent as your team and output grow.",
        "Audience and persona research — identify who your content needs to reach, what questions they ask at each stage, and which formats they prefer, using search data and customer insights.",
        "Channel strategy and distribution planning — determine where each piece of content should live and how it gets promoted across owned, earned, and paid channels for maximum reach.",
        "Performance measurement framework — set KPIs, build dashboards, and establish a review cadence so you can tie content output to pipeline, traffic, and engagement metrics.",
      ]}
      benefits={[
        "Every piece of content tied to a clear business objective",
        "Reduced wasted effort on content that doesn't reach the right audience",
        "Consistent brand voice across all channels and formats",
        "Predictable publishing cadence that builds audience trust",
        "Data-driven decisions on what to create, update, or sunset",
        "Cross-team alignment on priorities, timelines, and responsibilities",
      ]}
      faq={[
        {
          q: "What is a content strategy and why does it matter?",
          a: "A content strategy is a documented plan that defines what content you create, who it's for, where it's published, and how you measure success. Without one, teams produce scattered content that doesn't contribute to business goals.",
        },
        {
          q: "How long does it take to build a content strategy?",
          a: "A foundational strategy — including audit, personas, editorial calendar, and governance guidelines — typically takes four to six weeks. The timeline depends on the volume of existing content and the number of stakeholders involved.",
        },
        {
          q: "Do we need a content strategy if we already publish regularly?",
          a: "Publishing regularly without a strategy often leads to duplicated topics, inconsistent messaging, and content that doesn't align with what your audience actually searches for. A strategy ensures every piece earns its place.",
        },
        {
          q: "How do you measure whether a content strategy is working?",
          a: "We establish KPIs at the outset — typically organic traffic, engagement rates, lead generation, and content-influenced revenue — then review performance against those benchmarks on a monthly or quarterly basis.",
        },
      ]}
    />
  );
}
