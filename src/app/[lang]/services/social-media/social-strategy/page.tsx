import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Social Media Strategy Services",
  description:
    "Data-driven social media strategy covering platform analysis, audience research, content calendars, and KPI frameworks. Markit Media builds strategies that align social efforts with business goals.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/social-media/social-strategy",
  },
};

export default function SocialStrategyPage() {
  return (
    <SubServicePage
      parentTitle="Social Media"
      parentHref="/services/social-media"
      title="Social Media Strategy"
      description="A strong social media presence starts with a clear strategy. We develop data-driven social media plans that align your content, platforms, and goals so every post serves a purpose and moves your business forward."
      details={[
        "Platform analysis and selection — evaluate which social platforms your target audience actually uses, how they engage on each one, and where your brand can generate the most meaningful traction.",
        "Audience research and persona development — define your ideal audience segments using demographic data, behavioral patterns, and competitive intelligence to ensure your messaging resonates with the right people.",
        "Content calendar planning — build structured, repeatable content calendars that balance promotional posts, educational content, engagement-driven formats, and timely topics across all active platforms.",
        "KPI framework and goal setting — establish measurable objectives tied to real business outcomes such as reach, engagement rate, website traffic, lead generation, and conversion attribution.",
        "Competitive landscape review — analyze what your competitors are doing on social media, identify gaps in their approach, and find opportunities to differentiate your brand voice and content mix.",
        "Channel-specific playbooks — create detailed guidelines for each platform covering posting frequency, content formats, hashtag strategy, optimal posting times, and audience engagement tactics.",
      ]}
      benefits={[
        "A clear roadmap that connects daily social activity to business objectives",
        "Platform-specific strategies tailored to how each audience behaves",
        "Structured content calendars that eliminate guesswork and last-minute scrambling",
        "Measurable KPIs so you always know what is working and what needs adjustment",
        "Competitive intelligence that reveals opportunities others are missing",
        "A consistent, documented approach your team can execute and scale",
      ]}
      faq={[
        {
          q: "How do you decide which platforms we should be on?",
          a: "We analyze where your target audience spends their time, what content formats perform best in your industry, and how your competitors are positioned. Not every brand needs to be on every platform — we recommend the channels where your specific audience is most active and engaged.",
        },
        {
          q: "How far in advance do you plan content?",
          a: "We typically build content calendars 30 days in advance with a broader quarterly editorial plan. This gives enough structure to stay consistent while leaving room to respond to trends, current events, and real-time engagement opportunities.",
        },
        {
          q: "What KPIs do you track for social media?",
          a: "We set KPIs based on your business goals. Common metrics include reach, engagement rate, follower growth, website clicks, lead form submissions, and conversion attribution. We focus on metrics that tie back to revenue, not vanity numbers.",
        },
        {
          q: "How often should a social media strategy be updated?",
          a: "We recommend a full strategy review every quarter, with monthly performance check-ins to make tactical adjustments. Platform algorithms and audience behaviors change frequently, so ongoing refinement is essential to maintaining results.",
        },
      ]}
    />
  );
}
