import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Social Media Analytics Services",
  description:
    "Comprehensive social media analytics including performance tracking, custom reporting, audience insights, and competitor benchmarking. Markit Media turns social data into actionable decisions.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/social-media/social-analytics",
  },
};

export default function SocialAnalyticsPage() {
  return (
    <SubServicePage
      parentTitle="Social Media"
      parentHref="/services/social-media"
      title="Social Media Analytics"
      description="You cannot improve what you do not measure. We provide in-depth social media analytics that go beyond surface-level metrics to reveal what is actually driving results, where your audience is growing, and how your performance compares to competitors."
      details={[
        "Performance tracking and dashboards — set up and maintain real-time dashboards that track key metrics including reach, engagement, follower growth, click-through rates, and conversion attribution across all active platforms.",
        "Custom reporting — deliver structured monthly and quarterly reports that translate raw data into clear insights, highlight trends, and provide specific recommendations for optimizing your content and strategy.",
        "Audience insights and segmentation — analyze your follower demographics, behaviors, and growth patterns to understand who your audience is, when they are most active, and what content resonates most with different segments.",
        "Content performance analysis — evaluate which post types, topics, formats, and publishing times generate the strongest results so your content strategy is informed by data rather than assumptions.",
        "Competitor benchmarking — monitor competitor social media activity, growth rates, engagement levels, and content strategies to contextualize your performance and identify opportunities they are missing.",
        "Attribution and ROI measurement — connect social media activity to downstream business outcomes such as website traffic, lead generation, and sales using tracking links, UTM parameters, and platform conversion tools.",
        "Trend identification — surface emerging patterns in your data including seasonal trends, audience shifts, and content format performance changes so your strategy stays ahead of the curve.",
      ]}
      benefits={[
        "Clear visibility into what is working and what needs to change",
        "Data-driven decisions that replace guesswork in content planning",
        "Audience intelligence that sharpens targeting and messaging",
        "Competitive context that shows how you stack up in your market",
        "Attribution that connects social activity to real business outcomes",
        "Regular reporting that keeps your team aligned and accountable",
      ]}
      faq={[
        {
          q: "What metrics do you track?",
          a: "We track reach, impressions, engagement rate, follower growth, click-through rate, website traffic from social, conversions, and audience demographics. The specific KPIs we prioritize depend on your business goals — we set these during the strategy phase.",
        },
        {
          q: "How often do you deliver reports?",
          a: "Most clients receive monthly performance reports with a deeper quarterly strategy review. You also have access to real-time dashboards for day-to-day monitoring. We adjust reporting frequency based on your needs and campaign activity.",
        },
        {
          q: "What tools do you use for social media analytics?",
          a: "We use a combination of native platform analytics, third-party tools for cross-platform reporting and competitor monitoring, and web analytics platforms for attribution tracking. The specific toolset depends on your platforms, integrations, and reporting requirements.",
        },
        {
          q: "Can you help us understand why our engagement is declining?",
          a: "Yes. We conduct a diagnostic analysis that examines content performance trends, audience behavior changes, posting frequency, algorithm shifts, and competitor activity. We then identify the specific factors contributing to the decline and recommend targeted fixes.",
        },
      ]}
    />
  );
}
